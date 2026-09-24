// RPG Welling — testes da busca de caminho (A* sobre os AABBs da zona).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildNavGrid, findPath, findPathToNearest, canStand, hasLineOfSight, nearestStandPoint, centerOf } from '../src/pathfind.js';

function box(minX, minZ, maxX, maxZ) {
  return { minX, maxX, minZ, maxZ };
}

function zone(colliders, bounds = { minX: -10, maxX: 10, minZ: -10, maxZ: 10 }) {
  return { bounds, colliders };
}

// dá para ir de A a B andando pela grade? (a linha pode ser diagonal, o que
// importa é que nenhum ponto do caminho fique dentro de um colisor)
function pathIsWalkable(grid, from, to) {
  const path = findPath(grid, from, to);
  if (!path) return false;
  let previous = from;
  for (const point of path) {
    const steps = Math.max(1, Math.ceil(Math.hypot(point.x - previous.x, point.z - previous.z) / 0.2));
    for (let i = 1; i <= steps; i += 1) {
      const t = i / steps;
      if (!canStand(grid, previous.x + (point.x - previous.x) * t, previous.z + (point.z - previous.z) * t)) return false;
    }
    previous = point;
  }
  return true;
}

test('caminho livre vai reto do início ao fim', () => {
  const grid = buildNavGrid(zone([]));
  const path = findPath(grid, { x: -8, z: 0 }, { x: 8, z: 0 });
  assert.ok(path, 'deve achar caminho');
  assert.equal(path.length, 2, 'sem obstáculos: um waypoint só (o destino)');
  assert.deepEqual(path.at(-1), { x: 8, z: 0 });
});

test('parede atravessada: o A* contorna em vez de devolver null', () => {
  // parede vertical no meio, com folga nas pontas
  const wall = box(-0.4, -6, 0.4, 6);
  const grid = buildNavGrid(zone([wall]));
  const from = { x: -6, z: 0 };
  const to = { x: 6, z: 0 };
  const path = findPath(grid, from, to);
  assert.ok(path, 'existe rota por cima ou por baixo da parede');
  assert.ok(path.length >= 2, 'rota precisa de waypoints para contornar');
  assert.ok(pathIsWalkable(grid, from, to), 'nenhum passo do caminho atravessa a parede');
  // o desvio precisa happening por fora da parede (z grande)
  assert.ok(Math.max(...path.map((p) => Math.abs(p.z))) > 6);
});

test('muro sem brecha: não há caminho e o destino é recusado', () => {
  const solid = box(-0.4, -10, 0.4, 10);
  const grid = buildNavGrid(zone([solid]));
  assert.equal(findPath(grid, { x: -6, z: 0 }, { x: 6, z: 0 }), null);
});

test('corredor estreito (uma célula) é atravessável', () => {
  // duas paredes deixando 1,2 m de passagem: cabe o jogador (0,7 m de diâmetro)
  const left = box(-6, -10, -0.6, 4);
  const right = box(0.6, -10, 6, 4);
  const grid = buildNavGrid(zone([left, right]), { cell: 0.3, radius: 0.35 });
  assert.ok(pathIsWalkable(grid, { x: 0, z: 8 }, { x: 0, z: -8 }), 'desce pelo corredor');
  // a rota precisa realmente entrar no corredor, não contornar por fora (z > 4)
  const path = findPath(grid, { x: 0, z: 8 }, { x: 0, z: -8 });
  assert.ok(path.every((p) => Math.abs(p.x) < 0.6), 'passa por dentro da fresta');
});

test('destino colado num objeto pequeno vai para o ponto livre mais próximo', () => {
  const post = box(2, 2, 3.2, 3.2);
  const grid = buildNavGrid(zone([post]));
  const inside = { x: 2.6, z: 2.6 };
  assert.equal(canStand(grid, inside.x, inside.z), false);
  const path = findPath(grid, { x: 0, z: 2.6 }, inside);
  assert.ok(path && path.length, 'mesmo caindo no objeto, chega perto dele');
  const last = path.at(-1);
  assert.equal(canStand(grid, last.x, last.z), true, 'o ponto final é pisável');
  assert.ok(Math.hypot(last.x - inside.x, last.z - inside.z) < 1.5, 'e fica colado no pedido');
});

test('clique bem no meio de um prédio grande é recusado (não há rota)', () => {
  const building = box(-6, -6, 6, 6);
  const grid = buildNavGrid(zone([building]));
  assert.equal(findPath(grid, { x: 0, z: 9 }, { x: 0, z: 0 }), null);
  // já na borda, funciona
  assert.ok(findPath(grid, { x: 0, z: 9 }, { x: 0, z: 6.4 }), 'perto da parede anda até ela');
});

test('jogadora dentro de um colisor ganha um ponto livre por perto', () => {
  const tree = box(-1, -1, 1, 1);
  const grid = buildNavGrid(zone([tree]));
  const escape = nearestStandPoint(grid, 0, 0);
  assert.ok(escape, 'precisa achar uma saída');
  assert.equal(canStand(grid, escape.x, escape.z), true);
  assert.ok(Math.hypot(escape.x, escape.z) < 2, 'e sem teleportar para longe');
});

test('linha de visão respeita os obstáculos', () => {
  const wall = box(-0.4, -6, 0.4, 6);
  const grid = buildNavGrid(zone([wall]));
  assert.equal(hasLineOfSight(grid, -6, 0, 6, 0), false, 'atravessar a parede não vale');
  assert.equal(hasLineOfSight(grid, -6, 8, 6, 8), true, 'por cima é livre');
});

test('rota longa respeita os limites da zona', () => {
  const grid = buildNavGrid(zone([], { minX: -4, maxX: 4, minZ: -20, maxZ: 2 }));
  const path = findPath(grid, { x: 0, z: 0 }, { x: 0, z: -19 });
  assert.ok(path, 'achou a rota');
  for (const point of path) {
    assert.ok(point.z >= -19.5 && point.z <= 1.5, `ponto ${point.z} dentro dos limites`);
  }
});

test('destino fora dos limites ainda devolve caminho válido', () => {
  const grid = buildNavGrid(zone([]));
  const path = findPath(grid, { x: 0, z: 0 }, { x: 99, z: 99 });
  assert.ok(path && path.length, 'não trava nem devolve lixo');
  assert.ok(canStand(grid, path.at(-1).x, path.at(-1).z), 'termina em chão pisável');
});

test('rota normal continua indo exatamente até o destino pedido', () => {
  const grid = buildNavGrid(zone([]));
  const path = findPathToNearest(grid, { x: -8, z: 0 }, { x: 8, z: 0 });
  assert.deepEqual(path.at(-1), { x: 8, z: 0 });
});

test('clique no meio de um objeto grande: chega até a borda dele', () => {
  // prédio de 4×4: o centro está a ~2,3 m de qualquer chão pisável, além do
  // snap de 1,8 m. Em vez de ficar parada com o aviso, ela anda até a parede
  const building = box(-2, -2, 2, 2);
  const grid = buildNavGrid(zone([building]));
  const from = { x: 0, z: 6 };
  const to = { x: 0, z: 0 };
  assert.equal(findPath(grid, from, to), null, 'sem rota direta para o centro');
  const path = findPathToNearest(grid, from, to);
  assert.ok(path && path.length, 'a aproximação é o plano B');
  const last = path.at(-1);
  assert.equal(canStand(grid, last.x, last.z), true, 'termina em chão pisável');
  assert.ok(last.z > 1.5 && last.z < 3, `para na borda do prédio (z=${last.z})`);
  assert.ok(Math.hypot(last.x - to.x, last.z - to.z) < 4, 'e o mais perto possível do pedido');
});

test('a aproximação nunca termina mais longe do pedido do que o início', () => {
  const cases = [
    { colliders: [box(-2, -2, 2, 2)], from: { x: 0, z: 6 }, to: { x: 0, z: 0 } },
    // cercada dentro de uma caixa: só dá para andar dentro dela
    {
      colliders: [
        box(-2, -2, 2, -1.6), box(-2, 1.6, 2, 2),
        box(-2, -2, -1.6, 2), box(1.6, -2, 2, 2),
      ],
      from: { x: 0, z: 0 }, to: { x: 8, z: 8 }, cell: 0.2,
    },
    { colliders: [], from: { x: -8, z: 0 }, to: { x: 40, z: 40 } },
  ];
  for (const { colliders, from, to, cell } of cases) {
    const grid = buildNavGrid(zone(colliders), { cell });
    const path = findPathToNearest(grid, from, to);
    if (!path || !path.length) continue;
    const last = path.at(-1);
    const before = Math.hypot(from.x - to.x, from.z - to.z);
    const after = Math.hypot(last.x - to.x, last.z - to.z);
    assert.ok(after <= before, `terminou a ${after.toFixed(2)} do pedido, começou a ${before.toFixed(2)}`);
  }
});


test('aproximação é o ponto pisável mais próximo do toque', () => {
  const building = box(-2, -2, 2, 2);
  const grid = buildNavGrid(zone([building]));
  const to = { x: 0, z: 0 };
  const path = findPathToNearest(grid, { x: 0, z: 6 }, to);
  const last = path.at(-1);
  // nenhum outro ponto pisável fica mais perto do centro do prédio
  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      if (grid.blocked[row * grid.cols + col]) continue;
      const p = centerOf(grid, col, row);
      assert.ok(
        Math.hypot(p.x - to.x, p.z - to.z) >= Math.hypot(last.x - to.x, last.z - to.z) - 1e-9,
        `ponto ${p.x},${p.z} não pode estar mais perto do pedido que ${last.x},${last.z}`,
      );
    }
  }
});

test('a aproximação fica dentro dos limites da zona', () => {
  const grid = buildNavGrid(zone([], { minX: -4, maxX: 4, minZ: -20, maxZ: 2 }));
  const path = findPathToNearest(grid, { x: 0, z: 0 }, { x: 40, z: -40 });
  assert.ok(path && path.length, 'sempre há para onde ir');
  for (const point of path) {
    assert.ok(point.x >= -3.5 && point.x <= 3.5, `x ${point.x} dentro`);
    assert.ok(point.z >= -19.5 && point.z <= 1.5, `z ${point.z} dentro`);
  }
});
