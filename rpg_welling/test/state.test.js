// RPG Welling — testes do save por jogadora (spec §37, sem contas online).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyState, normalizeState, loadState, saveState, STORAGE_KEY, MAP_PIECES } from '../src/state.js';

function fakeStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

test('normalizeState limpa lixo sem quebrar (defesa contra save corrompido)', () => {
  const dirty = normalizeState({
    character: 'dragão', zone: 'castelo', position: ['x', Infinity],
    mapPieces: ['finch', 'finch', 'hacker'], flags: { mapAssembled: 'sim', __proto__: {} },
    clues: [42, { a: 1 }, 'oak'], challenges: { vocabFinch: 'yes' }, sound: 0,
  });
  assert.equal(dirty.character, '');
  assert.equal(dirty.zone, 'school');
  assert.deepEqual(dirty.position, [0, 0]);
  assert.deepEqual(dirty.mapPieces, ['finch']); // sem duplicatas, ordem canônica
  assert.deepEqual(dirty.flags, { mapAssembled: true });
  assert.deepEqual(dirty.clues, ['oak']);
  assert.deepEqual(dirty.challenges, { vocabFinch: true });
  assert.equal(dirty.sound, false);
});

test('save vem vazio e sadio quando não há nada salvo', () => {
  const storage = fakeStorage();
  assert.deepEqual(loadState(storage, 'julia'), emptyState());
  assert.deepEqual(loadState(storage, ''), emptyState());
  storage.setItem(STORAGE_KEY, 'não-json{{{');
  assert.deepEqual(loadState(storage, 'julia'), emptyState());
});

test('cada jogadora tem seu próprio progresso isolado', () => {
  const storage = fakeStorage();
  const julia = normalizeState({ character: 'ivy', mapPieces: ['finch', 'page'] });
  const alex = normalizeState({ character: 'oakley', mapPieces: [] });
  saveState(storage, 'Julia', julia);
  saveState(storage, '  julia ', { character: 'ivy', mapPieces: MAP_PIECES, flags: { mapAssembled: true } });
  saveState(storage, 'Alex', alex);

  const reloaded = loadState(storage, 'julia'); // chave ignora caixa/espaços
  assert.deepEqual(reloaded.mapPieces, MAP_PIECES);
  assert.equal(reloaded.flags.mapAssembled, true);

  const alexReloaded = loadState(storage, 'Alex');
  assert.deepEqual(alexReloaded.mapPieces, []);
  assert.equal(alexReloaded.character, 'oakley');
});

test('saveState só grava estado normalizado', () => {
  const storage = fakeStorage();
  saveState(storage, 'julia', { character: 'ivy', zone: 'woods', position: [999, -999], mapPieces: MAP_PIECES });
  const raw = JSON.parse(storage.getItem(STORAGE_KEY)).julia;
  assert.deepEqual(raw.position, [60, -60]); // clampado aos limites
  assert.deepEqual(raw.mapPieces, MAP_PIECES);
});
