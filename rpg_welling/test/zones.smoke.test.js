// Esta suíte constrói cada zona com um Canvas mínimo para encontrar regressões
// que derrubariam a criação da cena inteira no navegador, sem abrir o jogo.

import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { installDomStub, removeDomStub, getGradientStops } from './helpers/dom-stub.js';

let world;
let originalRandomDescriptor;
let woodsPhotoPlaceholder;
let woodsPhotoAfterLoad;

const ZONE_BUILDERS = [
  ['school', 'buildSchool'],
  ['highstreet', 'buildHighStreet'],
  ['academy', 'buildAcademy'],
  ['classroom', 'buildClassroom'],
  ['woods', 'buildWoods'],
];
const KNOWN_ZONE_NAMES = new Set(ZONE_BUILDERS.map(([name]) => name));
const PLAYER_RADIUS = 0.35;
const builtZones = new Map();
const builtScenes = new Map();

const EXPECTED_COLLIDERS = {
  school: {
    minimum: 20,
    bounds: [
      { minX: -7.75, maxX: -7.45, minZ: -13.4, maxZ: -10.6 },
      { minX: -10.25, maxX: -8.95, minZ: -12.95, maxZ: -11.45 },
      { minX: -1.775, maxX: -1.325, minZ: -8.05, maxZ: -6.35 },
    ],
  },
  highstreet: {
    minimum: 12,
    bounds: [
      // terraço oeste: fachada da padaria do Crumb (o "bloqueador representativo"
      // da antiga BAKERY, agora fachada contínua da High Street real)
      { minX: -6.8, maxX: -4.0, minZ: -9.5, maxZ: -4.0 },
      // terraço leste: bookshop, com o BECO da academia (5.9, -3) livre depois
      { minX: 4.0, maxX: 6.8, minZ: -14, maxZ: -3.6 },
      // caixa de correio real da Royal Mail em frente ao Post Office
      { minX: -3.62, maxX: -2.98, minZ: 0.98, maxZ: 1.62 },
      // banco com a página escondida (clueBench) continua bloqueando
      { minX: -3.2, maxX: -2.6, minZ: 4.15, maxZ: 5.85 },
    ],
  },
  academy: {
    minimum: 6,
    bounds: [
      { minX: -5, maxX: 5, minZ: -14, maxZ: -10 },
      { minX: 2.6, maxX: 5.4, minZ: -11.4, maxZ: -8.6 },
      { minX: -4.95, maxX: -4.05, minZ: -4.45, maxZ: -3.55 },
    ],
  },
  classroom: {
    minimum: 8,
    bounds: [
      { minX: -6, maxX: 6, minZ: -9.1, maxZ: -8.5 },
      { minX: 5.5, maxX: 6.1, minZ: -9, maxZ: 9 },
      { minX: -4.5, maxX: -2.3, minZ: -7.3, maxZ: -6.3 },
    ],
  },
  woods: {
    minimum: 10,
    bounds: [
      { minX: -5.4, maxX: 5.4, minZ: -1.3, maxZ: 1.3 },
      { minX: -1.7, maxX: 1.7, minZ: -19.5, maxZ: -18.5 },
      { minX: 9.45, maxX: 11.55, minZ: 17.7, maxZ: 19.3 },
      { minX: -11.8, maxX: -9.2, minZ: 0.7, maxZ: 3.3 },
      { minX: -10.9, maxX: -2.1, minZ: 24.7, maxZ: 30.3 },
    ],
  },
};

function pointIsWithin(point, bounds) {
  return point[0] >= bounds.minX && point[0] <= bounds.maxX
    && point[1] >= bounds.minZ && point[1] <= bounds.maxZ;
}

// Esta é uma cópia deliberada do predicado de colisão de produção em main.js:
// o círculo do jogador contra o ponto mais próximo de cada AABB deve continuar
// sincronizado com aquele código.
function circleHitsCollider(point, collider) {
  const nearestX = Math.max(collider.minX, Math.min(point[0], collider.maxX));
  const nearestZ = Math.max(collider.minZ, Math.min(point[1], collider.maxZ));
  const dx = point[0] - nearestX;
  const dz = point[1] - nearestZ;
  return dx * dx + dz * dz < PLAYER_RADIUS * PLAYER_RADIUS;
}

function invokeZoneUpdate(zone, expectedName, dt, time) {
  try {
    zone.update(dt, time);
  } catch (error) {
    assert.fail(`${expectedName} update(${dt}, ${time}) lançou: ${error?.message || error}`);
  }
}

function assertValidColor(color, label) {
  const validNumber = typeof color === 'number'
    && Number.isInteger(color)
    && color >= 0
    && color <= 0xffffff;
  const validString = typeof color === 'string'
    && /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(color);
  assert.ok(validNumber || validString, `${label} deve ser uma cor válida`);
}

function assertZoneShape(zone, expectedName) {
  assert.ok(zone, `${expectedName} deve retornar uma zona`);
  assert.equal(zone.name, expectedName, 'a zona deve manter o nome esperado');
  assert.ok(zone.bounds && typeof zone.bounds === 'object');
  assert.ok(Number.isFinite(zone.bounds.minX) && Number.isFinite(zone.bounds.maxX));
  assert.ok(Number.isFinite(zone.bounds.minZ) && Number.isFinite(zone.bounds.maxZ));
  assert.ok(zone.bounds.minX < zone.bounds.maxX, 'bounds.minX deve ser menor que maxX');
  assert.ok(zone.bounds.minZ < zone.bounds.maxZ, 'bounds.minZ deve ser menor que maxZ');

  assert.ok(Array.isArray(zone.fog) && zone.fog.length === 3, 'fog deve ter três valores');
  assert.ok(zone.fog.every(Number.isFinite), 'fog deve conter números finitos');
  assert.ok(zone.fog[1] > 0 && zone.fog[2] > zone.fog[1], 'fog deve ter near e far positivos e ordenados');
  assertValidColor(zone.fog[0], 'fog[0]');
  assertValidColor(zone.background, 'background');

  assert.ok(Array.isArray(zone.hemi) && zone.hemi.length >= 3, 'hemi deve ter três valores');
  assert.ok(zone.hemi.every(Number.isFinite), 'hemi deve conter números finitos');
  assert.ok(zone.hemi[2] > 0, 'hemi[2] deve ser uma intensidade positiva');
  assert.ok(zone.sun && typeof zone.sun === 'object', 'sun deve ser um objeto');
  assertValidColor(zone.sun.color, 'sun.color');
  assert.ok(Number.isFinite(zone.sun.intensity) && zone.sun.intensity > 0, 'sun.intensity deve ser positiva e finita');
  assert.ok(Array.isArray(zone.sun.pos) && zone.sun.pos.length === 3, 'sun.pos deve ter três valores');
  assert.ok(zone.sun.pos.every(Number.isFinite), 'sun.pos deve conter números finitos');
  assert.equal(typeof zone.update, 'function', 'a zona deve expor update(dt, t)');

  const colliderExpectation = EXPECTED_COLLIDERS[expectedName];
  assert.ok(colliderExpectation, `deve haver expectativa de colliders para ${expectedName}`);
  assert.ok(Array.isArray(zone.colliders) && zone.colliders.length >= colliderExpectation.minimum,
    `${expectedName} deve registrar pelo menos ${colliderExpectation.minimum} colliders`);
  for (const collider of zone.colliders) {
    assert.ok(collider && typeof collider === 'object', 'cada collider deve ser um objeto');
    for (const key of ['minX', 'maxX', 'minZ', 'maxZ']) {
      assert.ok(Number.isFinite(collider[key]), `collider.${key} deve ser finito`);
    }
    assert.ok(collider.minX < collider.maxX, 'collider.minX deve ser menor que maxX');
    assert.ok(collider.minZ < collider.maxZ, 'collider.minZ deve ser menor que maxZ');
  }

  for (const expectedBounds of colliderExpectation.bounds) {
    assert.ok(zone.colliders.some((collider) => (
      Math.abs(collider.minX - expectedBounds.minX) < 1e-9
      && Math.abs(collider.maxX - expectedBounds.maxX) < 1e-9
      && Math.abs(collider.minZ - expectedBounds.minZ) < 1e-9
      && Math.abs(collider.maxZ - expectedBounds.maxZ) < 1e-9
    )), `${expectedName} deve manter um bloqueador representativo em ${JSON.stringify(expectedBounds)}`);
  }

  assert.ok(Array.isArray(zone.interactables) && zone.interactables.length > 0, 'interactables deve ser um array não vazio');
  for (const interactable of zone.interactables) {
    assert.ok(interactable && typeof interactable === 'object', 'cada interactable deve ser um objeto');
    assert.ok(typeof interactable.id === 'string' && interactable.id.trim(), 'interactable.id deve ser texto não vazio');
    assert.ok(Number.isFinite(interactable.x) && Number.isFinite(interactable.z), 'interactable.x/z devem ser finitos');
    assert.ok(Number.isFinite(interactable.radius) && interactable.radius > 0, 'interactable.radius deve ser positivo e finito');
  }

  assert.ok(Array.isArray(zone.spawn) && zone.spawn.length === 2, 'spawn deve ter coordenadas [x, z]');
  assert.ok(zone.spawn.every(Number.isFinite), 'spawn deve conter números finitos');
  assert.ok(pointIsWithin(zone.spawn, zone.bounds), 'spawn deve estar dentro dos bounds');
  const spawnInCollider = zone.colliders.some((collider) => circleHitsCollider(zone.spawn, collider));
  assert.equal(spawnInCollider, false, 'spawn não pode atingir um collider pelo raio do jogador');

  assert.ok(Array.isArray(zone.exits) && zone.exits.length > 0, 'cada zona deve ter uma saída');
  for (const exit of zone.exits) {
    assert.ok(KNOWN_ZONE_NAMES.has(exit.target), `alvo de saída desconhecido: ${exit.target}`);
    assert.notEqual(exit.target, expectedName, 'uma saída não pode apontar para a própria zona');
    assert.ok(Number.isFinite(exit.x) && Number.isFinite(exit.z), 'saída deve ter coordenadas finitas');
    assert.ok(Number.isFinite(exit.radius) && exit.radius > 0, 'raio da saída deve ser positivo e finito');
    // O raio da saída é um limiar de acionamento, não uma região onde o
    // jogador precisa caber; o pedaço além dos bounds é inalcançável por
    // design, pois o movimento é limitado pelos bounds da zona.
    assert.ok(pointIsWithin([exit.x, exit.z], zone.bounds),
      'o centro da saída deve estar dentro dos bounds da zona de origem');
    assert.equal(zone.colliders.some((collider) => circleHitsCollider([exit.x, exit.z], collider)), false,
      'o centro da saída não pode atingir um collider da zona de origem');

    const targetZone = builtZones.get(exit.target);
    assert.ok(targetZone, `a zona de destino ${exit.target} deve estar disponível`);
    assert.ok(Array.isArray(exit.spawn) && exit.spawn.length === 2, 'spawn de saída deve ter [x, z]');
    assert.ok(exit.spawn.every(Number.isFinite), 'spawn de saída deve ser finito');
    assert.ok(pointIsWithin(exit.spawn, targetZone.bounds), 'spawn de saída deve estar dentro dos bounds do destino');
    assert.equal(targetZone.colliders.some((collider) => circleHitsCollider(exit.spawn, collider)), false,
      'spawn de saída não pode atingir um collider do destino');
  }
}

before(async () => {
  installDomStub();
  originalRandomDescriptor = Object.getOwnPropertyDescriptor(Math, 'random');
  let randomState = 0x51f15e;
  Math.random = () => {
    randomState = (randomState * 1664525 + 1013904223) >>> 0;
    return randomState / 0x100000000;
  };
  world = await import('../src/world.js');

  for (const [expectedName, exportName] of ZONE_BUILDERS) {
    const scene = new THREE.Scene();
    const built = world[exportName](scene);
    builtZones.set(expectedName, built);
    builtScenes.set(expectedName, scene);
    if (expectedName === 'woods') {
      woodsPhotoPlaceholder = built.photoBand.material.map;
      // O load falso da IMG agenda o callback do TextureLoader neste macrotask.
      await new Promise((resolve) => setTimeout(resolve, 0));
      woodsPhotoAfterLoad = built.photoBand.material.map;
    }
  }
});

after(() => {
  removeDomStub();
  if (originalRandomDescriptor) {
    Object.defineProperty(Math, 'random', originalRandomDescriptor);
  } else {
    delete Math.random;
  }
});

for (const [expectedName] of ZONE_BUILDERS) {
  test(`${expectedName} monta sem lançar e publica metadados jogáveis`, () => {
    const scene = builtScenes.get(expectedName);
    const built = builtZones.get(expectedName);
    assert.ok(scene, `${expectedName} deve ter sido construído no before`);
    assert.ok(built, `${expectedName} deve retornar uma zona`);
    // Os helpers internos (addCollider e glowSprite) escrevem no objeto em
    // scene.userData.zone durante a construção; devolver outro objeto dividiria
    // silenciosamente o estado de registro da cena.
    assert.strictEqual(built, scene.userData.zone, 'o retorno e scene.userData.zone devem ser o mesmo objeto');
    invokeZoneUpdate(built, expectedName, 0, 0);
    invokeZoneUpdate(built, expectedName, 0.25, 1.25);
    assertZoneShape(built, expectedName);
  });
}

const SKY_FOG_COLORS = {
  school: '#8fc9e8',
  highstreet: '#7ab8d8',
  academy: '#10132e',
  woods: '#87b7a0',
};

test('cada céu real converte a névoa da zona para CSS', () => {
  for (const [zoneName, expectedFogColor] of Object.entries(SKY_FOG_COLORS)) {
    const zone = builtZones.get(zoneName);
    const skyTexture = zone.skyDome?.material?.map;
    assert.ok(skyTexture?.image, `${zoneName} deve expor a textura do skyDome`);
    const skyStops = getGradientStops().filter(({ gradient }) => gradient.canvas === skyTexture.image);
    assert.ok(skyStops.length > 0, `${zoneName} deve registrar o gradiente da textura do céu`);
    assert.ok(skyStops.some(({ offset, color }) => offset === 0.62 && color === expectedFogColor),
      `${zoneName}: a parada inferior do céu deve converter a névoa para CSS`);
    assert.ok(skyStops.some(({ offset, color }) => offset === 1 && color === expectedFogColor),
      `${zoneName}: a base do céu deve usar a cor CSS da névoa`);
  }
});

test('o stub rejeita cores e offsets que o navegador não aceita', () => {
  const canvas = globalThis.document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 256);

  // Esta parte testa o contrato do próprio stub, não cssColor de produção.
  assert.throws(() => gradient.addColorStop(0, 0x8fc9e8), TypeError);
  assert.throws(() => gradient.addColorStop(0, 'banana'), TypeError);
  assert.throws(() => gradient.addColorStop(Number.NaN, '#ffffff'), TypeError);
  assert.throws(() => gradient.addColorStop(-0.01, '#ffffff'), TypeError);
  assert.throws(() => gradient.addColorStop(1.01, '#ffffff'), TypeError);
  assert.doesNotThrow(() => gradient.addColorStop(0, '#8fc9e8'));
  assert.doesNotThrow(() => gradient.addColorStop(1, 'rgba(135, 183, 160, 0)'));
});

test('woods executa o caminho assíncrono de composição da foto', () => {
  const woods = builtZones.get('woods');
  assert.ok(woodsPhotoPlaceholder, 'woods deve criar a textura de placeholder');
  assert.ok(woodsPhotoAfterLoad && woodsPhotoAfterLoad !== woodsPhotoPlaceholder,
    'o load assíncrono deve substituir a textura do placeholder');
  assert.strictEqual(woods.photoBand.material.map, woodsPhotoAfterLoad);
});

// ── árvores do pack x áreas de jogo da escola ────────────────────────────────
// Rodada 3 do bug medido em produção (debug().scene()): o pack de árvores tem
// as 6 primitivas com a GEOMETRIA fora do PIVÔ (bbox local x −2.41..2.59,
// z −2.64..−1.13; pivô ≈ origem — medido por derivação: pivô = centro
// geométrico + (−0.09, +1.89)). Centralizar a geometria deixava o PÉ da
// árvore 4,25–5,94m fora do ponto declarado: a fila sul (z −40/−40.4)
// renderizava em z −34.1..−35.8, no meio do campo, e as laterais (x ±14) em
// x −10.3/+17.7 — a oeste DENTRO da sebe. O conserto centraliza os PIVÔS
// (SCHOOL_TREE_INSTANCE_OPTIONS.mode 'pivot') e escolhe rotY por fileira para
// a geometria pender PARA FORA. Este teste é estático: computa o AABB do
// conjunto {pivô} ∪ {geometria} de cada instância (mesma matemática da
// produção, via schoolTreeFootprintBounds) contra as áreas proibidas.
const SCHOOL_FORBIDDEN_AREAS = [
  {
    // campo: pitch 22×8 em z −32.5 → x −11..11, z −36.5..−28.5; gols em z
    // −36.3/−28.7. Expandido 1m para todo lado: a borda norte (−27.7) já
    // cobre a pista de terra (z −28.2) e a margem junto ao bloco sul.
    label: 'campo de pênaltis +1m',
    minX: -12, maxX: 12, minZ: -37.3, maxZ: -27.7,
  },
  {
    // quadra MUGA: piso 4×14 em (9.6, −14) → x 7.6..11.6, z −21..−7; a
    // margem vai até a sebe leste (x 11.8). Sem colisor (railing é visual):
    // é exatamente onde a criança fica para o quiz do Welling FC.
    label: 'quadra MUGA',
    minX: 7.6, maxX: 11.8, minZ: -21, maxZ: -7,
  },
  {
    // horta oeste: solo 3,4×8,4 em (−9.6, −9.4) → x −11.3..−7.9,
    // z −13.6..−5.2, estufa e espantalho (−11, −10) dentro; margem até a
    // sebe oeste (−11.8). Conservador em altura: vale para copa também.
    label: 'horta/estufa',
    minX: -11.8, maxX: -7.9, minZ: -13.6, maxZ: -5.2,
  },
];

function boxesIntersect(a, b) {
  return a.minX <= b.maxX && a.maxX >= b.minX
    && a.minZ <= b.maxZ && a.maxZ >= b.minZ;
}

test('escola publica o layout determinístico das 21 árvores do pack', () => {
  const school = builtZones.get('school');
  const trees = school.schoolTrees;
  assert.ok(Array.isArray(trees), 'a zona school deve expor schoolTrees');
  // 2 do gramado da frente + 11 da fila sul + 2×4 laterais: tocar nesse
  // número é sinal de que o layout mudou — revalidar as áreas proibidas.
  assert.equal(trees.length, 21, 'esperadas 21 instâncias de árvore na escola');
  for (const tree of trees) {
    for (const key of ['x', 'z', 'rotY', 'scale']) {
      assert.ok(Number.isFinite(tree[key]), `instância de árvore deve ter ${key} finito`);
    }
    // rotação determinística em múltiplos de 90°: 0/π espalham o pack no
    // eixo x (fila sul), ±π/2 o deitam no eixo z (laterais). O espalhamento
    // precisa ser previsível para a garantia estática valer em toda execução
    assert.ok(Math.abs(tree.rotY % (Math.PI / 2)) < 1e-9,
      `rotY deve ser múltiplo de π/2 (foi ${tree.rotY}) — aleatoriedade aqui reabre o bug original`);
  }
});

test('nenhuma árvore do pack invade campo, quadra MUGA ou horta', () => {
  // O conserto tem dois interruptores: compensação ligada E modo pivô. O
  // modo 'geometry' (estado ao ar na rodada 2) desloca o pé por
  // R(rotY)·S·(pivô − centro geométrico) e o teste abaixo volta a falhar —
  // exatamente nas 6 árvores da fila sul que a QA mediu em z −34.1..−35.8.
  assert.equal(world.SCHOOL_TREE_INSTANCE_OPTIONS?.center, true,
    'SCHOOL_TREE_INSTANCE_OPTIONS.center deve estar ligado (compensação do pack)');
  assert.equal(world.SCHOOL_TREE_INSTANCE_OPTIONS?.mode, 'pivot',
    'SCHOOL_TREE_INSTANCE_OPTIONS.mode deve ser "pivot" (pé no ponto declarado)');
  const school = builtZones.get('school');
  const offenders = [];
  for (const tree of school.schoolTrees) {
    const box = world.schoolTreeFootprintBounds(tree);
    for (const area of SCHOOL_FORBIDDEN_AREAS) {
      if (boxesIntersect(box, area)) {
        offenders.push(
          `${area.label}: (${tree.x}, ${tree.z}) rotY ${tree.rotY.toFixed(2)} escala ${tree.scale.toFixed(2)} `
          + `ocupada até x [${box.minX.toFixed(2)}, ${box.maxX.toFixed(2)}] z [${box.minZ.toFixed(2)}, ${box.maxZ.toFixed(2)}]`,
        );
      }
    }
  }
  assert.deepEqual(offenders, [],
    `árvores (pé + geometria) dentro de área proibida:\n${offenders.join('\n')}`);
});

test('a fila sul renderiza com o pé atrás da sebe e a copa mais atrás ainda', () => {
  const south = builtZones.get('school').schoolTrees.filter((t) => t.z < -35);
  assert.equal(south.length, 11, 'esperadas 11 árvores na fila sul');
  for (const tree of south) {
    assert.equal(tree.rotY, 0,
      'fila sul exige rotY 0: com π o pendurico da geometria vira PARA O CAMPO');
    assert.ok(tree.z <= -38.5,
      `pé da árvore deve ficar em z ≤ −38.5 (foi ${tree.z})`);
    // com rotY 0 a geometria ocupa z ∈ [z − 2.64·escala, z − 1.13·escala]:
    // nunca se aproxima mais que 1.13·escala do pé (≥ 2.54m de folga da sebe)
    assert.ok(tree.z - 1.13 * tree.scale <= -36.9,
      `copa da árvore em (${tree.x}, ${tree.z}) invade a linha da sebe`);
  }
});

test('o modelo do teste reproduz o que produção renderiza (pivô no ponto)', () => {
  // Guarda contra drift entre schoolTreeFootprintBounds e o instancing real:
  // no modo pivô o pé fica EXATAMENTE no ponto declarado e a geometria pende
  // pelos cantos do bbox congelado (assimétrico!), girado por rotY.
  const bb = world.TREE_PACK_BBOX;
  const near = (a, b) => Math.abs(a - b) < 1e-9;
  const flat = world.schoolTreeFootprintBounds({ x: 5, z: -7, rotY: 0, scale: 2 });
  assert.ok(near(flat.minX, 5 + bb.minX * 2) && near(flat.maxX, 5 + bb.maxX * 2),
    'AABB X com rotY 0 = bbox × escala em torno do pivô no ponto');
  assert.ok(near(flat.minZ, -7 + bb.minZ * 2), 'copa pende para o −z local');
  assert.ok(near(flat.maxZ, -7), 'o PÉ (pivô) é o limite norte do AABB');
  const quarter = world.schoolTreeFootprintBounds({ x: 0, z: 0, rotY: Math.PI / 2, scale: 1 });
  // rotY +90°: o −z local (geometria) vira −x no mundo; o PIVÔ (0,0) também
  // entra no AABB e, aqui, é ele o limite leste/norte da ocupação
  assert.ok(near(quarter.minX, bb.minZ) && near(quarter.maxX, 0),
    'rotY 90° deita o pendurico no eixo x, com o pé como borda leste');
  assert.ok(near(quarter.minZ, -bb.maxX) && near(quarter.maxZ, -bb.minX),
    'rotY 90° troca a extensão x do pack para o eixo z');
  // e no modo geometry o próprio modelo reproduz o bug medido pela QA:
  // pé da fila sul (rotY 0) sai +1.885·escala para o campo
  const dz = world.TREE_PACK_PIVOT.z - (bb.maxZ + bb.minZ) / 2;
  const broken = world.schoolTreeFootprintBounds({ x: 0, z: -40, rotY: 0, scale: 3.15 });
  if (world.SCHOOL_TREE_INSTANCE_OPTIONS.mode !== 'pivot') {
    assert.ok(near(broken.maxZ, -40 + dz * 3.15),
      'modo geometry deve deslocar o pé +1.885·escala (medido: z −34.1)');
  } else {
    assert.ok(near(broken.maxZ, -40),
      'modo pivot mantém o pé no ponto declarado');
  }
});
