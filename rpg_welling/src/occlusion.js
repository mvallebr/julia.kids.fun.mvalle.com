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
// teto de esmaecimentos NOVOS por frame: clonar material custa, e mais de 8
// fantasmas simultâneos já seria uma sala inteira transparente de qualquer jeito
export const FADE_MAX_MESHES = 8;
// hits mais perto que isto estão praticamente colados na jogadora (o raycast
// "encontra" a parede por dentro/atrás): não são fade, são caso "blocked"
export const FADE_MIN_HIT_DISTANCE = 0.35;

// Fábrica do fader. `raycast(origem, direçãoUnitária, alcance)` devolve hits
// no formato do three ([{ distance, object }, ...] ordenados por distance);
// `now()` devolve milissegundos; ambos são injetados para os testes.
export function createOcclusionFader({
  raycast,
  now,
  targetOpacity = FADE_TARGET_OPACITY,
  hysteresisMs = FADE_HYSTERESIS_MS,
  maxMeshes = FADE_MAX_MESHES,
  minHitDistance = FADE_MIN_HIT_DISTANCE,
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
  // `enabled = false` CONGELA o estado (nada novo esmaece, nada volta):
  // é o modo do close no globo, quando o raycast cabeça→câmera não é o que
  // manda no enquadramento daquele frame — e restaurar no meio do close
  // faria paredes pipocarem de volta na frente da câmera.
  function update({ head, desired, enabled = true } = {}) {
    const dx = desired.x - head.x;
    const dy = desired.y - head.y;
    const dz = desired.z - head.z;
    const len = Math.hypot(dx, dy, dz);
    if (!enabled || len < 1e-4) return { blocked: false, firstHit: null };

    const dir = { x: dx / len, y: dy / len, z: dz / len }; // VETOR UNITÁRIO
    const hits = raycast(head, dir, len);
    const firstHit = hits.length > 0 ? hits[0] : null;
    const ts = now();
    const keep = new Set();
    let newFades = 0;
    let blocked = false;
    for (const hit of hits) {
      // colado na menina (≤ 0.35 m): a cabeça está dentro/em cima da geometria
      // (spawn em quina) — é o único caso que ainda manda a câmera para a
      // cabeça; hits no alcance ou além (o far do raycast já corta, mas por
      // garantia) não estão ENTRE a cabeça e a câmera: nenhum dos dois vira fade
      if (hit.distance <= minHitDistance) { blocked = true; continue; }
      if (hit.distance >= len) continue;
      const mesh = hit.object;
      if (keep.has(mesh)) continue; // mesmo mesh de novo (faces duplas batem 2×)
      keep.add(mesh);
      const record = faded.get(mesh);
      if (record) {
        record.lastSeen = ts; // segue hitado: zera o prazo da histerese
        continue;
      }
      if (newFades >= maxMeshes) continue; // teto de clones por frame
      newFades += 1;
      fadeMesh(mesh, ts);
    }
    // quem parou de ser hitado volta ao normal SÓ depois da histerese sem hit
    for (const [mesh, record] of faded) {
      if (!keep.has(mesh) && ts - record.lastSeen >= hysteresisMs) restoreMesh(mesh);
    }
    return { blocked, firstHit };
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
