// Esmaecimento do que está entre a jogadora e a câmera, em vez de cortar o
// braço da câmera. Antes, qualquer parede/móvel no caminho puxava a câmera
// para ~1.6 m da nuca (e indoor era o tempo todo: dentro da escola o
// zoom-out nunca funcionava). Hoje a câmera vai SEMPRE à posição desejada e
// o que estiver na frente vira um "fantasma" translúcido — que é exatamente
// a visão de RPG de longe que a Julia pediu, sem obstáculo bloqueando a tela.
//
// O módulo é PURO de propósito: raycast, relógio e materiais chegam injetados,
// então o comportamento (clonagem, histerese, restauração) é testável com
// objetos fake, sem three.js nem navegador. Nada aqui conhece THREE.

// opacidade do fantasma: baixo o bastante para enxergar a menina através da
// parede, alto o bastante para a parede não desaparecer por completo
export const FADE_TARGET_OPACITY = 0.16;
// histerese: um mesh só volta ao normal depois deste tempo SEM ser hitado.
// Sem isso, a borda de uma parede entrando e saindo do raio do raycast a cada
// frame fazia o mesh piscar (faded → opaco → faded) a cada passinho.
export const FADE_HYSTERESIS_MS = 250;
// teto de esmaecimentos NOVOS por frame (união do cone): clonar material custa,
// e um enquadramento que precisa de mais de 12 fantasmas de raio é uma sala
// inteira transparente de qualquer jeito
export const FADE_MAX_MESHES = 12;
// cone de raios: o central + 4 paralelos deslocados ±1.2 m no plano
// perpendicular. Um raio único só abre uma fresta "raio-x" no telhado (QA da
// quadra: só 2 meshes sumiam e a laje seguia opaca); a união dos 5 cobre a
// largura do que a câmera realmente enquadra.
export const FADE_RAY_CONE_RADIUS = 1.2;
// anti-embebimento: se o hit mais PRÓXIMO da ponta da câmera estiver a menos
// de isto dela, a câmera seria embutida na laje/telhadura (QA: câmera a 0.24 m
// da casca de cima do prédio) — o desired encurta para hit − margem
export const FADE_EMBED_MARGIN = 0.6;
// hits mais perto que isto estão praticamente colados na jogadora (o raycast
// "encontra" a parede por dentro/atrás): não são fade, são caso "blocked"
export const FADE_MIN_HIT_DISTANCE = 0.35;
// guarda de raio: mesh com boundingSphere maior que isto NUNCA esmaece —
// céu/skydome, photoBand e backdrop (~125 m) podem aparecer no caminho do raio
// ou da camada em ângulos raros, e o horizonte de Oxleas não pode sumir
export const FADE_MAX_MESH_RADIUS = 30;
// corte de camada (diorama de cima): só sobe para fantasma quem tem centro
// mais de 1.8 m acima da cabeça da jogadora (teto/telhado andam; chão e móveis
// ficam, mesmo que a esfera grande deles atravesse a altura)
export const FADE_LAYER_CUT_MIN_HEIGHT = 1.8;
// ...e só a camada ENTRE a jogadora e a câmera: folga de 2 m além da distância
// horizontal da câmera (o prédio de trás e o resto do mapa continuam opacos)
export const FADE_LAYER_SLACK_M = 2;
// teto total de fantasmas (raio + camada). Se estourar, a CAMADA espera e os
// hits do raio passam: parede na frente da menina importa mais que telhado.
// 28 = contagem analítica da escola no pior enquadramento (salão 11 + corredor
// 11 + anexo 5 + placas 2 = 29 candidatos, teto logo abaixo) — com 24 o anexo
// e as placas ficavam sólidos vistos de cima, diorama pela metade.
export const FADE_MAX_FADED_TOTAL = 28;

// Base ortonormal perpendicular a `dir` (unitário): u e v, para deslocar os
// raios paralelos do cone. O auxiliar do produto vetorial é o eixo mundial
// MENOS alinhado à direção — assim o cross nunca degenera (dir colinear com
// o auxiliar daria vetor zero).
function perpendiculars(dir) {
  const ax = Math.abs(dir.x);
  const ay = Math.abs(dir.y);
  const az = Math.abs(dir.z);
  let hx = 0;
  let hy = 0;
  let hz = 0;
  if (ax <= ay && ax <= az) hx = 1;
  else if (ay <= az) hy = 1;
  else hz = 1;
  let ux = dir.y * hz - dir.z * hy;
  let uy = dir.z * hx - dir.x * hz;
  let uz = dir.x * hy - dir.y * hx;
  const ul = Math.hypot(ux, uy, uz) || 1;
  ux /= ul;
  uy /= ul;
  uz /= ul;
  // v = dir × u já sai unitário (dir ⊥ u, ambos unitários)
  return {
    u: { x: ux, y: uy, z: uz },
    v: { x: dir.y * uz - dir.z * uy, y: dir.z * ux - dir.x * uz, z: dir.x * uy - dir.y * ux },
  };
}

// Fábrica do fader. `raycast(origem, direçãoUnitária, alcance)` devolve hits
// no formato do three ([{ distance, object }, ...] ordenados por distance);
// `now()` devolve milissegundos; `occluders()` devolve a lista atual de
// malhas oclusoras (para o corte de camada). Todos injetados para os testes.
export function createOcclusionFader({
  raycast,
  now,
  occluders = () => [],
  targetOpacity = FADE_TARGET_OPACITY,
  hysteresisMs = FADE_HYSTERESIS_MS,
  maxMeshes = FADE_MAX_MESHES,
  minHitDistance = FADE_MIN_HIT_DISTANCE,
  maxMeshRadius = FADE_MAX_MESH_RADIUS,
  layerCutMinHeight = FADE_LAYER_CUT_MIN_HEIGHT,
  layerSlack = FADE_LAYER_SLACK_M,
  maxFadedTotal = FADE_MAX_FADED_TOTAL,
  rayConeRadius = FADE_RAY_CONE_RADIUS,
  embedMargin = FADE_EMBED_MARGIN,
} = {}) {
  // mesh → registro do fade (o MESMO objeto fica espelhado em
  // mesh.userData.occlusionFade, para inspeção e para nunca clonar 2×)
  const faded = new Map();

  function userDataOf(mesh) {
    if (!mesh.userData || typeof mesh.userData !== 'object') mesh.userData = {};
    return mesh.userData;
  }

  // O material do hit é clonado ANTES de qualquer mutação: os GLBs clonados
  // com SkeletonUtils COMPARTILHAM material entre meshes, então mexer na
  // opacidade direto esmaecia todas as paredes iguais da zona de uma vez.
  function ghostClone(material) {
    const clone = material.clone();
    clone.transparent = true;
    clone.opacity = targetOpacity;
    clone.depthWrite = false; // fantasma não briga com o z-buffer do que está atrás
    return clone;
  }

  function disposeClone(clone) {
    if (clone && typeof clone.dispose === 'function') clone.dispose();
  }

  function fadeMesh(mesh, ts) {
    const many = Array.isArray(mesh.material);
    const original = many ? mesh.material.slice() : (mesh.material ?? null);
    const clone = !original ? null : many ? original.map(ghostClone) : ghostClone(original);
    if (clone) mesh.material = clone;
    const record = {
      original,
      clone,
      originalCastShadow: mesh.castShadow,
      lastSeen: ts,
    };
    userDataOf(mesh).occlusionFade = record;
    faded.set(mesh, record);
    // fantasma não pode projetar sombra sólida no chão
    mesh.castShadow = false;
  }

  function restoreMesh(mesh) {
    const record = faded.get(mesh);
    if (!record) return;
    if (record.original) mesh.material = record.original;
    mesh.castShadow = record.originalCastShadow;
    if (Array.isArray(record.clone)) record.clone.forEach(disposeClone);
    else disposeClone(record.clone);
    const store = userDataOf(mesh);
    if (store.occlusionFade === record) delete store.occlusionFade;
    faded.delete(mesh);
  }

  // Um frame do fader. `head`/`desired` são posições {x,y,z} (Vector3 serve).
  // Devolve `{ blocked, firstHit, desired }`: o `desired` de volta é a posição
  // ONDE A CÂMERA PODE ESTAR neste frame — igual à pedida, ou encurtada pelo
  // anti-embebimento (ou a própria cabeça, se blocked; quem chama decide).
  // `enabled = false` CONGELA o estado (nada novo esmaece, nada volta):
  // é o modo do close no globo, quando o raycast cabeça→câmera não é o que
  // manda no enquadramento daquele frame — e restaurar no meio do close
  // faria paredes pipocarem de volta na frente da câmera.
  // `layerCut = true` liga o corte de camada (diorama de cima): além dos raios,
  // esmaece TODO occluder com centro de boundingSphere alto o bastante, na
  // faixa horizontal entre a jogadora e a CÂMERA AJUSTADA do frame — é o que
  // abre a vista RPG de cima, em que os raios só abriam uma fresta.
  function update({ head, desired, enabled = true, layerCut = false } = {}) {
    const dx = desired.x - head.x;
    const dy = desired.y - head.y;
    const dz = desired.z - head.z;
    const len = Math.hypot(dx, dy, dz);
    if (!enabled || len < 1e-4) return { blocked: false, firstHit: null, desired };

    const dir = { x: dx / len, y: dy / len, z: dz / len }; // VETOR UNITÁRIO

    // cone de 5 raios: central (da CABEÇA) + 4 paralelos ±u/±v — deslocar só a
    // origem já desloca o destino também (mesma direção, mesmo far = len)
    const { u, v } = perpendiculars(dir);
    const allHits = [];
    let centralMin = Infinity; // menor hit do raio central (é o que mede a CABEÇA)
    const origins = [head];
    for (const axis of [u, v]) {
      origins.push(
        { x: head.x + rayConeRadius * axis.x, y: head.y + rayConeRadius * axis.y, z: head.z + rayConeRadius * axis.z },
        { x: head.x - rayConeRadius * axis.x, y: head.y - rayConeRadius * axis.y, z: head.z - rayConeRadius * axis.z },
      );
    }
    for (const origin of origins) {
      const hits = raycast(origin, dir, len);
      if (origin === head) {
        for (const hit of hits) {
          allHits.push(hit);
          if (hit.distance < centralMin) centralMin = hit.distance;
        }
      } else {
        for (const hit of hits) allHits.push(hit);
      }
    }
    allHits.sort((a, b) => a.distance - b.distance);
    const firstHit = allHits.length > 0 ? allHits[0] : null;

    // blocked (hit central colado na cabeça = cabeça dentro/em cima de
    // geometria) tem PRIORIDADE sobre o anti-embebimento. Hit colado de raio
    // PARALELO não bloqueia: ele raspa 1.2 m ao lado da cabeça, que não está
    // dentro de nada — bloquear ali resetaria a câmera à toa.
    const blocked = centralMin <= minHitDistance;

    // anti-embebimento: o hit mais PRÓXIMO da ponta da câmera ENTRE OS 5 RAIOS
    // (o mais conservador). Se está a menos de `embedMargin` da ponta, a câmera
    // estacionaria dentro da laje/telhadura: encurta o raio para hit − margem,
    // igual ao recorte antigo, mas só no pedaço perto da CÂMERA (o primeiro
    // hit, do lado da jogadora, nunca mandou na ponta).
    let effectiveLen = len;
    let camX = desired.x;
    let camY = desired.y;
    let camZ = desired.z;
    if (!blocked && allHits.length > 0) {
      const nearestTip = allHits[allHits.length - 1].distance;
      if (nearestTip > len - embedMargin) {
        const shortLen = nearestTip - embedMargin;
        // shortLen >= len só acontece com hit além da ponta (impossível num
        // raycaster com far = len; por garantia, ignora)
        if (shortLen > 1e-4 && shortLen < len) {
          effectiveLen = shortLen;
          camX = head.x + dir.x * shortLen;
          camY = head.y + dir.y * shortLen;
          camZ = head.z + dir.z * shortLen;
        }
      }
    }

    const ts = now();
    const keep = new Set();
    let newFades = 0;
    for (const hit of allHits) {
      // colado na menina (≤ 0.35 m, já virou blocked acima) e hits na ponta ou
      // além da CÂMERA AJUSTADA não estão "entre" a cabeça e a câmera: nenhum
      // vira fade (com o raio curto, a laje na ponta deixa de ser fantasma)
      if (hit.distance <= minHitDistance) continue;
      if (hit.distance >= effectiveLen) continue;
      const mesh = hit.object;
      if (keep.has(mesh)) continue; // mesmo mesh de novo (faces duplas / vários raios)
      keep.add(mesh);
      // guarda de raio vale no raio também: céu/backdrop no caminho em ângulo
      // raro nunca é fantasma (a boundingSphere já vem computada do buildScene)
      if ((mesh.geometry?.boundingSphere?.radius ?? 0) > maxMeshRadius) continue;
      const record = faded.get(mesh);
      if (record) {
        record.lastSeen = ts; // segue hitado: zera o prazo da histerese
        continue;
      }
      if (newFades >= maxMeshes) continue; // teto de clones por frame
      newFades += 1;
      fadeMesh(mesh, ts);
    }

    // corte de camada: varre os occluders da zona (barato — usa a boundingSphere
    // JÁ computada, sem raycast) e escolhe quem é "teto entre a menina e a
    // câmera". Entra na MESMA máquina de fade/histerese: é só "kept" a mais. A
    // referência é a câmera AJUSTADA do frame (depois do anti-embebimento).
    if (layerCut) {
      const horizLimit = Math.hypot(camX - head.x, camZ - head.z) + layerSlack;
      for (const mesh of occluders()) {
        if (keep.has(mesh)) continue;
        const sphere = mesh.geometry?.boundingSphere;
        const elements = mesh.matrixWorld?.elements;
        if (!sphere || !elements) continue; // sem esfera computada: só o raio pode pegar
        if (sphere.radius > maxMeshRadius) continue; // céu/backdrop: NUNCA
        const record = faded.get(mesh);
        if (!record && faded.size >= maxFadedTotal) continue; // teto total: a camada espera (o raio passa)
        // centro da esfera em coords de mundo: o center (local) transformado
        // direto pelos .elements da matrixWorld (column-major). É o mais barato:
        // getWorldPosition anda pela hierarquia de pais e escreve num Vector3,
        // decompose aloca quat+vector — aqui não aloca nada por frame.
        const c = sphere.center;
        const cx = elements[0] * c.x + elements[4] * c.y + elements[8] * c.z + elements[12];
        const cy = elements[1] * c.x + elements[5] * c.y + elements[9] * c.z + elements[13];
        const cz = elements[2] * c.x + elements[6] * c.y + elements[10] * c.z + elements[14];
        // (a) abaixo de cabeça+1.8 m é chão/móvel: fica opaco
        if (cy - head.y <= layerCutMinHeight) continue;
        // (b) além da câmera (+folga) é o prédio de trás: também fica
        if (Math.hypot(cx - head.x, cz - head.z) >= horizLimit) continue;
        keep.add(mesh); // segue "kept": a histerese do fim do frame zera
        if (record) {
          record.lastSeen = ts;
          continue;
        }
        fadeMesh(mesh, ts);
      }
    }

    // quem parou de ser hitado volta ao normal SÓ depois da histerese sem hit
    for (const [mesh, record] of faded) {
      if (!keep.has(mesh) && ts - record.lastSeen >= hysteresisMs) restoreMesh(mesh);
    }
    return {
      blocked,
      firstHit,
      desired: blocked
        ? { x: head.x, y: head.y, z: head.z }
        : { x: camX, y: camY, z: camZ },
    };
  }

  // Rebuild de zona: a cena antiga INTEIRA vai embora, então restaurar
  // tocaria em mesh já descartado (e mentiria flags para um objeto morto).
  // Limpa o mapa sem tocar em nada.
  function reset() {
    faded.clear();
  }

  return {
    update,
    reset,
    fadedCount: () => faded.size,
    fadedNames: () => [...faded.keys()].map((mesh) => mesh.name || '(sem nome)'),
  };
}
