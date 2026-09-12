import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ADVENTURE_TASKS,
  buildSnapshot,
  completeMilestone,
  completeTask,
  emptyAdventureState,
  ensureActive,
  loadAdventure,
  migrateIfNeeded,
  normalizeAdventureState,
  pendingMilestone,
  progressFor,
  recordCounter,
  saveAdventure,
  taskById,
  segmentCountFor,
} from './engine.js';

const features = [
  { properties: { i: 'BRA', c: 'América do Sul' } },
  { properties: { i: 'ARG', c: 'América do Sul' } },
  { properties: { i: 'FRA', c: 'Europa' } },
  { properties: { i: 'JPN', c: 'Ásia' } },
];

const snapshot = (visitedCountries = [], counters = { audio: [], wiki: [] }, visitedPlaces = []) =>
  buildSnapshot({ visitedCountries, visitedPlaces }, features, counters);

test('segmentação da barra segue a spec (10→2, 15→3, 18→3, 20→4)', () => {
  assert.equal(segmentCountFor(10), 2);
  assert.equal(segmentCountFor(15), 3);
  assert.equal(segmentCountFor(18), 3);
  assert.equal(segmentCountFor(20), 4);
  assert.equal(segmentCountFor(25), 5);
  assert.equal(segmentCountFor(13), 1);
});

test('a fila começa com exatamente 3 tarefas ativas', () => {
  const active = ensureActive(emptyAdventureState());
  assert.equal(active.length, 3);
  assert.deepEqual(active, ['countries-10', 'countries-15', 'audio-5']);
});

test('completar uma tarefa insere a próxima no mesmo slot', () => {
  const state = normalizeAdventureState({ active: ['countries-10', 'countries-15', 'audio-5'] });
  const result = completeTask(state, 'countries-10');
  assert.equal(result.slot, 0);
  assert.deepEqual(state.active, ['countries-20', 'countries-15', 'audio-5']);
});

test('conclusão fora de ordem funciona', () => {
  const state = normalizeAdventureState({ active: ['countries-10', 'countries-15', 'audio-5'] });
  completeTask(state, 'audio-5');
  assert.equal(state.active[2], 'countries-20');
  assert.deepEqual(state.completed, ['audio-5']);
});

test('tarefa não é concluída duas vezes (spec §42)', () => {
  const state = normalizeAdventureState({});
  assert.ok(completeTask(state, 'countries-10'));
  assert.equal(completeTask(state, 'countries-10'), null);
  assert.equal(state.completed.filter((id) => id === 'countries-10').length, 1);
});

test('contadores contam apenas valores únicos (spec §32)', () => {
  const state = emptyAdventureState();
  assert.ok(recordCounter(state, 'audio', 'BRA'));
  assert.equal(recordCounter(state, 'audio', 'BRA'), false);
  assert.equal(state.counters.audio.length, 1);
});

test('tarefa final usa o total real de países do jogo', () => {
  const snap = snapshot(['BRA', 'ARG', 'FRA', 'JPN']);
  const world = progressFor(taskById('countries-all'), snap);
  assert.equal(world.current, 4);
  assert.equal(world.target, 4);
  assert.equal(world.ratio, 1);
});

test('migração conclui em silêncio objetivos já alcançados (spec §27)', () => {
  const visited = ['BRA', 'ARG', 'FRA', 'JPN', 'USA', 'MEX', 'ESP', 'ITA', 'DEU', 'GBR', 'PRT', 'CHL', 'PER'];
  const state = emptyAdventureState();
  migrateIfNeeded(state, snapshot(visited));
  assert.ok(state.completed.includes('countries-10'));
  assert.ok(!state.completed.includes('countries-15'));
  assert.ok(state.rewards['countries-10'].migrated);
  assert.ok(state.migrated);
  assert.ok(!state.active.includes('countries-10'));
  assert.deepEqual(state.active, ['countries-15', 'audio-5', 'countries-20']);
});

test('marcos disparam uma única vez nas quantidades esperadas', () => {
  const state = normalizeAdventureState({});
  for (const task of ADVENTURE_TASKS.slice(0, 10)) completeTask(state, task.id);
  assert.equal(pendingMilestone(state), 10);
  completeMilestone(state, 10);
  assert.equal(pendingMilestone(state), null);
  for (const task of ADVENTURE_TASKS.slice(10, 20)) completeTask(state, task.id);
  assert.equal(pendingMilestone(state), 20);
});

test('persistência é por explorador e sobrevive a recarregamentos (spec §26)', () => {
  const backing = new Map();
  const storage = {
    getItem: (key) => backing.get(key) ?? null,
    setItem: (key, value) => backing.set(key, value),
  };
  const maria = loadAdventure(storage, 'Maria');
  completeTask(maria, 'countries-10');
  saveAdventure(storage, 'Maria', maria);
  const reloaded = loadAdventure(storage, 'Maria');
  assert.ok(reloaded.completed.includes('countries-10'));
  const bob = loadAdventure(storage, 'Bob');
  assert.equal(bob.completed.length, 0);
});

test('completar a última tarefa marca a World Adventure (spec §20)', () => {
  const state = normalizeAdventureState({ active: ['countries-all'] });
  const result = completeTask(state, 'countries-all');
  assert.ok(result);
  assert.ok(state.worldCompleted);
  assert.ok(state.completed.includes('countries-all'));
  assert.equal(result.reward.certificate, true);
});
