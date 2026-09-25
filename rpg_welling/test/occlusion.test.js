// Testes do fader de oclusão (src/occlusion.js): o que está entre a jogadora
// e a câmera é esmaecido em vez de cortar o braço da câmera. O módulo é puro —
// raycast e relógio chegam injetados — então tudo aqui roda com meshes e
// materiais fake, determinístico, sem three.js nem sleeps.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createOcclusionFader,
  FADE_MAX_MESHES,
  FADE_MIN_HIT_DISTANCE,
  FADE_TARGET_OPACITY,
} from '../src/occlusion.js';

// material fake com clone/dispose contáveis (os dois existem no THREE.Material)
function makeMaterial(name = 'mat', props = {}) {
  const mat = {
    name,
    transparent: false,
    opacity: 1,
    depthWrite: true,
    clonesMade: 0,
    disposed: 0,
    clone() {
      mat.clonesMade += 1;
      // clone do three COPIA as propriedades no instante da clonagem
      return makeMaterial(`${name}::clone`, {
        transparent: mat.transparent,
        opacity: mat.opacity,
        depthWrite: mat.depthWrite,
      });
    },
    dispose() { mat.disposed += 1; },
  };
  return Object.assign(mat, props);
}

function makeMesh(name, material, extra = {}) {
  return Object.assign({ name, material, castShadow: true, userData: {} }, extra);
}

function hit(mesh, distance) { return { distance, object: mesh }; }

// occluder fake com boundingSphere (local) e matrixWorld de TRANSLAÇÃO
// (column-major, igual three): o centro em coords de mundo sai de
// center + translation, que é o caso dos prédios da zona (sem rotação/escala
// exótica no teste). `at` é a posição do centro da esfera no mundo.
function makeOccluder(name, { radius = 5, center = { x: 0, y: 0, z: 0 }, at = { x: 0, y: 0, z: 0 } } = {}) {
  return {
    name,
    material: makeMaterial(name),
    castShadow: true,
    userData: {},
    geometry: { boundingSphere: { radius, center } },
    matrixWorld: { elements: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, at.x, at.y, at.z, 1] },
  };
}

// Cabeça no centro e câmera desejada a 10 m no +z: hits válidos (viram fade)
// têm distance em (FADE_MIN_HIT_DISTANCE, 10).
const HEAD = { x: 0, y: 0.6, z: 0 };
const DESIRED = { x: 0, y: 0.6, z: 10 };

// fader com raycast/relógio/lista de occluders controlados: frame(hits, tempo,
// extras) roda um update
function setup({ occluders: initialOccluders = [], ...opts } = {}) {
  let currentHits = [];
  let currentOccluders = initialOccluders;
  let t = 0;
  const raycasts = [];
  const fader = createOcclusionFader({
    raycast: (origin, dir, far) => {
      raycasts.push({ origin: { ...origin }, dir: { ...dir }, far });
      return currentHits;
    },
    now: () => t,
    occluders: () => currentOccluders,
    ...opts,
  });
  return {
    fader,
    raycasts,
    setOccluders: (list) => { currentOccluders = list; },
    frame(hits, time, extra = {}) {
      if (hits) currentHits = hits;
      if (time != null) t = time;
      return fader.update({ head: HEAD, desired: DESIRED, ...extra });
    },
  };
}

test('primeiro hit: material clonado UMA vez, flags de fantasma aplicadas, original guardado', () => {
  const { fader, raycasts, frame } = setup();
  const original = makeMaterial('parede');
  const wall = makeMesh('parede', original);
  const theHit = hit(wall, 5);

  const result = frame([theHit], 0);

  // cone de 5 raios (central + 4 paralelos): todos partem com direção UNITÁRIA
  // e alcance = distância até a posição desejada da câmera
  assert.equal(raycasts.length, 5, 'central + 4 paralelos');
  for (const call of raycasts) {
    assert.deepEqual(call.dir, { x: 0, y: 0, z: 1 });
    assert.equal(call.far, 10);
  }
  assert.deepEqual(raycasts[0].origin, HEAD, 'o primeiro raio parte da cabeça');

  const clone = wall.material;
  assert.notEqual(clone, original, 'o mesh passou a usar um clone');
  assert.equal(original.clonesMade, 1, 'clone único');
  assert.equal(clone.transparent, true);
  assert.equal(clone.opacity, FADE_TARGET_OPACITY);
  assert.equal(clone.depthWrite, false);
  assert.equal(wall.castShadow, false, 'fantasma não projeta sombra');
  // o original fica intacto e guardado no userData
  assert.equal(original.opacity, 1);
  assert.equal(original.transparent, false);
  assert.equal(wall.userData.occlusionFade.original, original);
  assert.equal(fader.fadedCount(), 1);
  assert.deepEqual(fader.fadedNames(), ['parede']);
  assert.equal(result.firstHit, theHit, 'QA recebe o primeiro hit cru');
  assert.equal(result.blocked, false);
});

test('mesh hitado de novo no frame seguinte: reusa o clone, não clona de novo', () => {
  const { fader, frame } = setup();
  const original = makeMaterial('telhado');
  const roof = makeMesh('telhado', original);

  frame([hit(roof, 5)], 0);
  const firstClone = roof.material;

  frame([hit(roof, 5.1)], 16);
  assert.equal(roof.material, firstClone, 'mesma instância de clone');
  assert.equal(original.clonesMade, 1);
  assert.equal(fader.fadedCount(), 1);
});

test('histerese: só restaura depois do prazo sem hit; aí devolve original, flags e dispose 1×', () => {
  const { fader, frame } = setup();
  const original = makeMaterial('estante');
  const shelf = makeMesh('estante', original);

  frame([hit(shelf, 4)], 0);
  const clone = shelf.material;

  // 100 ms sem hit: ainda dentro da histerese, continua fantasma
  frame([], 100);
  assert.equal(shelf.material, clone);
  assert.equal(fader.fadedCount(), 1);

  // 249 ms: um milissegundo antes do prazo, ainda continua
  frame([], 249);
  assert.equal(shelf.material, clone);

  // 300 ms sem hit: passou da histerese → volta ao normal
  frame([], 300);
  assert.equal(shelf.material, original, 'material original recolocado');
  assert.equal(shelf.castShadow, true, 'sombra devolvida');
  assert.equal(original.clonesMade, 1);
  assert.equal(clone.disposed, 1, 'clone destruído exatamente uma vez');
  assert.equal(fader.fadedCount(), 0);
  assert.equal(shelf.userData.occlusionFade, undefined);
});

test('material em ARRAY: todos os itens são clonados e restaurados', () => {
  const { fader, frame } = setup();
  const a = makeMaterial('corpo');
  const b = makeMaterial('detalhe');
  const table = makeMesh('mesa', [a, b]);

  frame([hit(table, 6)], 0);
  assert.equal(table.material.length, 2);
  const [cloneA, cloneB] = table.material;
  assert.notEqual(cloneA, a);
  assert.notEqual(cloneB, b);
  assert.equal(a.clonesMade, 1);
  assert.equal(b.clonesMade, 1);
  for (const clone of table.material) {
    assert.equal(clone.opacity, FADE_TARGET_OPACITY);
    assert.equal(clone.transparent, true);
    assert.equal(clone.depthWrite, false);
  }

  frame([], 999);
  assert.equal(table.material.length, 2);
  assert.equal(table.material[0], a);
  assert.equal(table.material[1], b);
  assert.equal(table.castShadow, true);
  assert.equal(cloneA.disposed, 1);
  assert.equal(cloneB.disposed, 1);
  assert.equal(fader.fadedCount(), 0);
});

test('filtros do raio: hit colado e hit além da câmera são ignorados; cap de meshes por frame', () => {
  const { fader, frame } = setup();

  // hit colado (< FADE_MIN_HIT_DISTANCE): geometria grudada na menina → caso
  // blocked, e o hit cru segue para o QA mesmo assim
  const glued = makeMesh('colada', makeMaterial());
  const gluedHit = hit(glued, FADE_MIN_HIT_DISTANCE - 0.15);
  const blockedResult = frame([gluedHit], 0);
  assert.equal(blockedResult.blocked, true);
  assert.equal(blockedResult.firstHit, gluedHit);
  assert.equal(glued.material.clonesMade, 0);
  assert.equal(fader.fadedCount(), 0);

  // hit na EXATA posição da câmera (10 m) e além (12 m): não estão entre a
  // cabeça e a câmera, nenhum vira fantasma
  const atCam = makeMesh('noAlvo', makeMaterial());
  const beyond = makeMesh('alem', makeMaterial());
  frame([hit(atCam, 10), hit(beyond, 12)], 0);
  assert.equal(atCam.material.clonesMade, 0);
  assert.equal(beyond.material.clonesMade, 0);
  assert.equal(fader.fadedCount(), 0);

  // 13 hits válidos e distintos (todos entre 0.35 e 10): só FADE_MAX_MESHES
  // viram fantasmas NO FRAME — o cap limita clones, não a correção
  const many = [];
  for (let i = 0; i < 13; i += 1) many.push(hit(makeMesh(`m${i}`, makeMaterial()), 1 + i * 0.5));
  frame(many, 0);
  assert.equal(fader.fadedCount(), FADE_MAX_MESHES);
  assert.equal(many[FADE_MAX_MESHES].object.material.clonesMade, 0, 'o 13º fica para o frame seguinte');

  // mesmo mesh 2× no frame (faces duplas): fade único
  const dup = makeMesh('dupla', makeMaterial());
  const dupOriginal = dup.material; // após o fade, dup.material passa a ser o clone
  frame([hit(dup, 3), hit(dup, 3.5)], 0);
  assert.equal(dupOriginal.clonesMade, 1);
  assert.equal(dup.material.transparent, true, 'virou fantasma mesmo assim');
});

test('reset() limpa o mapa sem tocar nos meshes (rebuild de zona descarta a cena)', () => {
  const { fader, frame } = setup();
  const original = makeMaterial('porta');
  const door = makeMesh('porta', original);

  frame([hit(door, 4)], 0);
  const orphanClone = door.material;
  assert.equal(fader.fadedCount(), 1);

  fader.reset();
  assert.equal(fader.fadedCount(), 0);
  // SEM restauração de propósito: o mesh pertence à cena antiga, já descartada
  assert.equal(door.material, orphanClone);
  assert.equal(orphanClone.disposed, 0, 'reset não disposa nada');
  assert.equal(door.castShadow, false, 'flags do mesh antigo intocadas');
});

test('enabled = false congela: não esmaece nada novo e não restaura o que já estava', () => {
  // escolha documentada: CONGELAR (nem fade novo, nem restauração). É o modo do
  // close no globo, quando o raycast cabeça→câmera não manda no enquadramento —
  // restaurar ali faria paredes pipocarem de volta na frente da câmera.
  let t = 0;
  let currentHits = [];
  const fader = createOcclusionFader({
    raycast: () => currentHits,
    now: () => t,
  });
  const original = makeMaterial('muro');
  const wall = makeMesh('muro', original);
  currentHits = [hit(wall, 5)];
  fader.update({ head: HEAD, desired: DESIRED, enabled: true });
  const clone = wall.material;

  // desliga: hits novos no raio nem chegam ao raycast...
  currentHits = [hit(makeMesh('nova', makeMaterial()), 5)];
  const frozen = fader.update({ head: HEAD, desired: DESIRED, enabled: false });
  assert.equal(frozen.blocked, false);
  assert.equal(frozen.firstHit, null);
  assert.equal(fader.fadedCount(), 1, 'só o muro antigo segue esmaecido');

  // ...e o tempo passa da histerese sem restaurar: nada muda enquanto desligado
  t = 10000;
  fader.update({ head: HEAD, desired: DESIRED, enabled: false });
  assert.equal(wall.material, clone);
  assert.equal(fader.fadedCount(), 1);
});

test('mesh mínimo (sem userData, sem castShadow) não explode', () => {
  const { fader, frame } = setup();
  const minimal = { name: 'nu', material: makeMaterial('nu') };
  assert.equal(minimal.userData, undefined);
  assert.equal(minimal.castShadow, undefined);

  frame([hit(minimal, 3)], 0);
  assert.equal(minimal.material.transparent, true);
  assert.equal(minimal.material.opacity, FADE_TARGET_OPACITY);
  assert.equal(minimal.castShadow, false);
  assert.ok(minimal.userData.occlusionFade, 'userData criado na hora');

  frame([], 999);
  assert.equal(minimal.material.name, 'nu', 'material original devolvido');
  assert.equal(fader.fadedCount(), 0);
});

// ── rodada 2: corte de camada (diorama visto de cima) ────────────────────────

test('layerCut ativo: teto alto dentro do raio da câmera esmaece; chão, além-da-câmera e backdrop não', () => {
  const { fader, setOccluders, frame } = setup();
  // teto: centro 6.4 m acima da cabeça, 5 m à frente — dentro dos 12 m
  // (10 m de câmera + 2 m de folga) → esmaece
  const roof = makeOccluder('teto', { radius: 6, at: { x: 0, y: 7, z: 5 } });
  // chão: centro ABAIXO de cabeça+1.8 → não (mesmo estando na zona da câmera)
  const floor = makeOccluder('piso', { radius: 6, at: { x: 0, y: 0.5, z: 5 } });
  // além da câmera: 15 m à frente > 12 m de limite horizontal → não
  const beyond = makeOccluder('predioDeTras', { radius: 6, at: { x: 0, y: 7, z: 15 } });
  // backdrop/horizonte: alto e perto, mas raio 125 > 30 → NUNCA esmaece
  const backdrop = makeOccluder('ceu', { radius: 125, at: { x: 0, y: 8, z: 5 } });
  // dentro do teto de raio: 20 m esmaece
  const bigShed = makeOccluder('galpao', { radius: 20, at: { x: 3, y: 7, z: 6 } });
  setOccluders([roof, floor, beyond, backdrop, bigShed]);

  frame([], 0, { layerCut: true });

  assert.equal(roof.material.transparent, true, 'teto virou fantasma');
  assert.equal(roof.material.opacity, FADE_TARGET_OPACITY);
  assert.equal(roof.castShadow, false);
  assert.equal(floor.material.clonesMade, 0, 'chão intacto');
  assert.equal(beyond.material.clonesMade, 0, 'prédio além da câmera intacto');
  assert.equal(backdrop.material.clonesMade, 0, 'céu/backdrop intocado');
  assert.equal(bigShed.material.transparent, true, 'raio 20 m esmaece');
  assert.equal(fader.fadedCount(), 2);
});

test('layerCut inativo (pitch baixo, zoom curto): nada da camada esmaece, só o raio', () => {
  const { fader, setOccluders, frame } = setup();
  const roof = makeOccluder('teto', { radius: 6, at: { x: 0, y: 7, z: 5 } });
  const wall = makeMesh('parede', makeMaterial('parede'));
  setOccluders([roof]);

  const result = frame([hit(wall, 5)], 0, { layerCut: false });

  assert.equal(roof.material.clonesMade, 0, 'corte de camada desligado');
  assert.equal(wall.material.transparent, true, 'raio continua normal');
  assert.equal(fader.fadedCount(), 1);
  assert.equal(result.blocked, false);
});

test('prioridade do teto: com maxFadedTotal estourado, a camada espera e o raio passa', () => {
  const { fader, setOccluders, frame } = setup({ maxFadedTotal: 1 });
  const wall = makeMesh('parede', makeMaterial('parede'));
  const roof = makeOccluder('teto', { radius: 6, at: { x: 0, y: 7, z: 5 } });

  // frame 1: só o raio, sem camada → parede ocupa o único slot do teto
  frame([hit(wall, 5)], 0, { layerCut: false });
  assert.equal(fader.fadedCount(), 1);

  // frame 2: camada ligada, mas o teto total já estourou → teto NÃO esmaece
  setOccluders([roof]);
  frame([], 16, { layerCut: true });
  assert.equal(roof.material.clonesMade, 0, 'camada respeita o teto total');
  assert.equal(fader.fadedCount(), 1);

  // frame 3: o MESMO teto vira hit de RAY → prioridade: esmaece mesmo no teto
  frame([hit(roof, 5)], 32, { layerCut: true });
  assert.equal(roof.material.transparent, true, 'raio vence o teto total');
  assert.equal(fader.fadedCount(), 2);
});

test('guarda de raio no RAIO também: mesh de boundingSphere > 30 m nunca vira fantasma', () => {
  const { fader, frame } = setup();
  const sky = makeOccluder('ceu', { radius: 125, at: { x: 0, y: 8, z: 5 } });
  const wall = makeMesh('parede', makeMaterial('parede'));

  frame([hit(sky, 9), hit(wall, 5)], 0);

  assert.equal(sky.material.clonesMade, 0, 'horizonte de Oxleas intocado');
  assert.equal(wall.material.transparent, true);
  assert.equal(fader.fadedCount(), 1, 'só a parede');
});

test('histerese vale para mesh da camada: renova com layerCut e restaura sem ele', () => {
  const { fader, setOccluders, frame } = setup();
  const roof = makeOccluder('teto', { radius: 6, at: { x: 0, y: 7, z: 5 } });
  setOccluders([roof]);

  frame([], 0, { layerCut: true });
  const clone = roof.material;
  assert.equal(roof.material.transparent, true);

  // t=100 ainda de camada ligada: renovado (zera o prazo)
  frame([], 100, { layerCut: true });
  assert.equal(roof.material, clone);

  // t=200 pitch voltou ao normal (layerCut false): 100 ms desde a renovação,
  // ainda dentro da histerese → continua fantasma
  frame([], 200, { layerCut: false });
  assert.equal(roof.material, clone);

  // t=400: 300 ms sem ser "kept" → restaura igual a um mesh do raio
  frame([], 400, { layerCut: false });
  assert.equal(roof.material.name, 'teto', 'material original devolvido');
  assert.equal(roof.castShadow, true);
  assert.equal(clone.disposed, 1);
  assert.equal(fader.fadedCount(), 0);
});

// ── rodada 2 emenda: cone de 5 raios + anti-embebimento ──────────────────────

test('cone de 5 raios: offsets de 1,2 m perpendiculares à direção e união sem duplicar', () => {
  const seen = [];
  const centralWall = makeMesh('parede', makeMaterial('parede'));
  const sideRoof = makeMesh('telhadoLado', makeMaterial('telhadoLado'));
  const centralOriginal = centralWall.material; // após o fade, .material vira o clone
  const sideOriginal = sideRoof.material;
  const centralHit = hit(centralWall, 5);
  const sideHit = hit(sideRoof, 6);
  let t = 0;
  const fader = createOcclusionFader({
    // só o raio central acha a parede; um dos paralelos (o de +x) acha o telhado
    raycast: (origin) => {
      seen.push({ ...origin });
      const off = Math.abs(origin.x - HEAD.x) + Math.abs(origin.y - HEAD.y) + Math.abs(origin.z - HEAD.z);
      if (off < 1e-9) return [centralHit];
      if (origin.x > 1) return [sideHit];
      return [];
    },
    now: () => t,
  });

  const result = fader.update({ head: HEAD, desired: DESIRED });

  assert.equal(seen.length, 5, 'central + 4 paralelos');
  for (const origin of seen) {
    const offset = Math.hypot(origin.x - HEAD.x, origin.y - HEAD.y, origin.z - HEAD.z);
    assert.ok(offset === 0 || Math.abs(offset - 1.2) < 1e-9, `offset 0 ou 1,2 m: ${offset}`);
    assert.equal(origin.z, HEAD.z, 'direção (0,0,1) → offsets só em x/y');
  }
  // união dos 5 raios: cada mesh clonado UMA vez, mesmo aparecendo em raios diferentes
  assert.equal(centralOriginal.clonesMade, 1);
  assert.equal(sideOriginal.clonesMade, 1);
  assert.equal(centralWall.material.transparent, true, 'parede do raio central vira fantasma');
  assert.equal(sideRoof.material.transparent, true, 'telhado achado só pelo paralelo também');
  assert.equal(fader.fadedCount(), 2);
  assert.equal(result.blocked, false);
  assert.equal(result.firstHit, centralHit, 'QA recebe o hit mais próximo da união');
});

test('anti-embebimento: ponta a 0,2 m da laje encurta o desired; a 2 m fica intocado', () => {
  const { fader, frame } = setup();
  const shell = makeMesh('laje', makeMaterial('laje'));
  const wall = makeMesh('parede', makeMaterial('parede'));

  // hit a 9.8 m com câmera a 10 m: 0,2 m da ponta (< 0,6) → câmera ia embutir
  const result = frame([hit(shell, 9.8), hit(wall, 5)], 0);
  assert.equal(result.blocked, false);
  assert.ok(Math.abs(result.desired.x - 0) < 1e-9);
  assert.ok(Math.abs(result.desired.y - 0.6) < 1e-9);
  assert.ok(Math.abs(result.desired.z - 9.2) < 1e-9, 'desired puxado para hit − 0,6');
  // kept recomputados com o raio curto: a laje na ponta deixou de ser "entre"
  assert.equal(shell.material.clonesMade, 0);
  assert.equal(wall.material.transparent, true, 'o que ficou entre continua esmaecendo');

  // hit a 8 m (2 m da ponta, folga > 0,6): desired devolvido intocado
  const far = makeMesh('longe', makeMaterial('longe'));
  const okResult = frame([hit(far, 8)], 16);
  assert.ok(Math.abs(okResult.desired.z - 10) < 1e-9, 'desired sem encurtar');
  assert.equal(far.material.transparent, true);
});

test('blocked vence o anti-embebimento: cabeça dentro de geometria devolve desired = cabeça', () => {
  const { fader, frame } = setup();
  const glued = makeMesh('colada', makeMaterial());
  const shell = makeMesh('laje', makeMaterial('laje'));

  // a laje a 9.9 m dispararia o encurte; mas o hit colado na CABEÇA manda mais
  const result = frame([hit(glued, 0.2), hit(shell, 9.9)], 0);
  assert.equal(result.blocked, true);
  assert.deepEqual(result.desired, { x: HEAD.x, y: HEAD.y, z: HEAD.z });
});
