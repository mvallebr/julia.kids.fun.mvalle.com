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
