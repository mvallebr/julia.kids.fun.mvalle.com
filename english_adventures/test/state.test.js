import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEY,
  addCollectible,
  completeStory,
  completeWorld,
  discoverFriend,
  emptyState,
  firstIncompleteWorld,
  isWorldUnlocked,
  loadState,
  normalizeState,
  QUEST_POOL,
  questProgress,
  questMetricValue,
  recordSkill,
  refreshQuests,
  saveState,
} from '../src/state.js';
import {
  FRIENDS,
  WORLD_NODES,
  WORLD_ORDER,
  PATHS,
  encountersFor,
} from '../src/story.js';

const memoryStorage = () => {
  const backing = new Map();
  return {
    getItem: (key) => (backing.has(key) ? backing.get(key) : null),
    setItem: (key, value) => backing.set(key, value),
  };
};

test('normalização defensiva: lixo vira estado válido', () => {
  const state = normalizeState({ character: 'dragão', friends: ['poppy', 42, 'poppy'], solved: { x: null } });
  assert.equal(state.character, '');
  assert.deepEqual(state.friends, ['poppy']);
  assert.equal(normalizeState(null).storyId, 'story-1');
});

test('estado guarda rastreamento de habilidades (adaptativo)', () => {
  const state = emptyState();
  recordSkill(state, 'synonyms', true);
  recordSkill(state, 'synonyms', false);
  recordSkill(state, 'synonyms', false);
  assert.deepEqual(state.skills.synonyms, { c: 1, w: 2 });
  const reloaded = normalizeState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(reloaded.skills.synonyms, { c: 1, w: 2 });
});

test('persistência é por jogadora e sobrevive a recarregamentos', () => {
  const storage = memoryStorage();
  const julia = loadState(storage, 'Julia');
  julia.character = 'girl';
  saveState(storage, 'Julia', julia);
  const reloaded = loadState(storage, 'Julia');
  assert.equal(reloaded.character, 'girl');
  assert.equal(loadState(storage, 'Bob').character, '');
});

test('desbloqueio de mundos segue a ordem dos 15 mundos', () => {
  const state = emptyState();
  assert.ok(isWorldUnlocked(state, WORLD_ORDER[0], WORLD_ORDER));
  assert.ok(!isWorldUnlocked(state, WORLD_ORDER[1], WORLD_ORDER));
  completeWorld(state, WORLD_ORDER[0]);
  assert.ok(isWorldUnlocked(state, WORLD_ORDER[1], WORLD_ORDER));
  assert.equal(firstIncompleteWorld(state, WORLD_ORDER), WORLD_ORDER[1]);
});

test('há 15 mundos na progressão Easy → Very Very Hard', () => {
  assert.equal(WORLD_ORDER.length, 15);
});

test('cada mundo tem exatamente 5 encontros', () => {
  for (const worldId of WORLD_ORDER) {
    const ids = encountersFor(worldId).map((encounter) => encounter.id);
    assert.equal(ids.length, 5, `5 encontros em ${worldId}`);
    assert.equal(new Set(ids).size, 5, `ids únicos em ${worldId}`);
  }
});

test('o desafio especial rotativa entre mundos (keys/stones/match)', () => {
  const specials = WORLD_ORDER.map((worldId) => encountersFor(worldId).find((e) => e.slot === 'special'));
  assert.deepEqual(specials.map((s) => s.widget), ['keys', 'stones', 'match', 'keys', 'stones', 'match', 'keys', 'stones', 'match', 'keys', 'stones', 'match', 'keys', 'stones', 'match']);
});

test('todo mundo tem passagem de leitura, amigo e final', () => {
  for (const worldId of WORLD_ORDER) {
    const nodes = WORLD_NODES[worldId];
    assert.ok(nodes.some((node) => node.type === 'passage'), `passagem em ${worldId}`);
    assert.ok(nodes.some((node) => node.type === 'friend'), `amigo em ${worldId}`);
    assert.equal(nodes[nodes.length - 1].type, 'finale', `final em ${worldId}`);
    assert.equal(nodes.filter((node) => node.type === 'reward').length, 4, `4 presentes em ${worldId}`);
  }
});

test('todo mundo tem caminho pintado mapeado', () => {
  for (const worldId of WORLD_ORDER) {
    const path = PATHS[worldId];
    assert.ok(path.length >= 5, `waypoints em ${worldId}`);
    const dx = Math.abs(path[path.length - 1][0] - path[0][0]);
    const dy = Math.abs(path[path.length - 1][1] - path[0][1]);
    assert.ok(dx + dy >= 25, `${worldId} tem deslocamento`);
  }
});

test('cada mundo tem uma amiga moradora única', () => {
  for (const worldId of WORLD_ORDER) {
    const residents = Object.values(FRIENDS).filter((friend) => friend.world === worldId);
    assert.equal(residents.length, 1, `um amigo para ${worldId}`);
  }
});

test('pool de missões é genérico e funcional', () => {
  const state = emptyState();
  for (let index = 0; index < 5; index += 1) {
    state.solved[`enc-${index}`] = { attempts: 1, at: 0 };
  }
  const quest = QUEST_POOL.find((candidate) => candidate.id === 'solve-5');
  assert.equal(questMetricValue(state, quest.metric), 5);
  assert.ok(questProgress(state, quest).complete);
});

test('chave de storage é namespaced do English Adventures', () => {
  assert.equal(STORAGE_KEY, 'mundo-da-julia.english.v1');
});
