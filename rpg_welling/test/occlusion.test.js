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

// Cabeça no centro e câmera desejada a 10 m no +z: hits válidos (viram fade)
// têm distance em (FADE_MIN_HIT_DISTANCE, 10).
const HEAD = { x: 0, y: 0.6, z: 0 };
const DESIRED = { x: 0, y: 0.6, z: 10 };

// fader com raycast/relógio controlados: frame(hits, tempo) roda um update
function setup(opts = {}) {
  let currentHits = [];
  let t = 0;
  const raycasts = [];
  const fader = createOcclusionFader({
    raycast: (origin, dir, far) => {
      raycasts.push({ origin: { ...origin }, dir: { ...dir }, far });
      return currentHits;
    },
    now: () => t,
    ...opts,
  });
  return {
    fader,
    raycasts,
    frame(hits, time) {
      if (hits) currentHits = hits;
      if (time != null) t = time;
      return fader.update({ head: HEAD, desired: DESIRED });
    },
  };
}

test('primeiro hit: material clonado UMA vez, flags de fantasma aplicadas, original guardado', () => {
  const { fader, raycasts, frame } = setup();
  const original = makeMaterial('parede');
  const wall = makeMesh('parede', original);
  const theHit = hit(wall, 5);

  const result = frame([theHit], 0);

  // o raycast recebe a cabeça como origem, direção UNITÁRIA e alcance = a
  // distância até a posição desejada da câmera
  assert.equal(raycasts.length, 1);
  assert.deepEqual(raycasts[0].origin, HEAD);
  assert.deepEqual(raycasts[0].dir, { x: 0, y: 0, z: 1 });
  assert.equal(raycasts[0].far, 10);

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

  // 11 hits válidos e distintos (todos entre 0.35 e 10): só FADE_MAX_MESHES
  // viram fantasmas NO FRAME — o cap limita clones, não a correção
  const many = [];
  for (let i = 0; i < 11; i += 1) many.push(hit(makeMesh(`m${i}`, makeMaterial()), 1 + i * 0.5));
  frame(many, 0);
  assert.equal(fader.fadedCount(), FADE_MAX_MESHES);
  assert.equal(many[FADE_MAX_MESHES].object.material.clonesMade, 0, 'o 9º fica para o frame seguinte');

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
