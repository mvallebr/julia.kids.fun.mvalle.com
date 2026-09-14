import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEY,
  addCollectible,
  completeStory,
  completeWorld,
  discoverFriend,
  earnBadge,
  earnSticker,
  emptyState,
  firstIncompleteWorld,
  grantPresent,
  isWorldUnlocked,
  loadState,
  normalizeState,
  openPresent,
  questProgress,
  QUEST_POOL,
  recordSolve,
  refreshQuests,
  saveState,
  solvedCount,
  seedFor,
} from '../src/state.js';
import { FRIENDS, WORLD_NODES, WORLD_ORDER, encountersFor } from '../src/story.js';

const memoryStorage = () => {
  const backing = new Map();
  return {
    getItem: (key) => (backing.has(key) ? backing.get(key) : null),
    setItem: (key, value) => backing.set(key, value),
  };
};

test('normalização defensiva: lixo vira estado válido', () => {
  const state = normalizeState({ character: 'dragão', friends: ['maria', 42, 'maria'], solved: { x: null } });
  assert.equal(state.character, '');
  assert.deepEqual(state.friends, ['maria']);
  assert.equal(state.solved.x.attempts, 1);
  assert.equal(state.version, 1);
  assert.equal(normalizeState(null).storyId, 'story-1');
});

test('persistência é por jogadora e sobrevive a recarregamentos (spec §25)', () => {
  const storage = memoryStorage();
  const julia = loadState(storage, 'Julia');
  julia.character = 'girl';
  recordSolve(julia, 'forest-1');
  saveState(storage, 'Julia', julia);
  const reloaded = loadState(storage, 'Julia');
  assert.equal(reloaded.character, 'girl');
  assert.ok(reloaded.solved['forest-1']);
  assert.equal(loadState(storage, 'Bob').character, '');
});

test('encontro só é resolvido uma vez; tentativas ficam registradas (spec §41)', () => {
  const state = emptyState();
  assert.ok(recordSolve(state, 'forest-fork-1', { attempts: 3 }));
  assert.equal(recordSolve(state, 'forest-fork-1'), false);
  assert.equal(state.solved['forest-forest-fork-1'], undefined);
  assert.equal(state.solved['forest-fork-1'].attempts, 3);
});

test('semente de encontro é estável por jogadora e muda entre encontros (spec §25)', () => {
  assert.equal(seedFor('Julia', 'forest-1'), seedFor('julia ', 'FOREST-1'.toLowerCase()));
  assert.notEqual(seedFor('Julia', 'forest-1'), seedFor('Maria', 'forest-1'));
  assert.notEqual(seedFor('Julia', 'forest-1'), seedFor('Julia', 'forest-2'));
});

test('desbloqueio de mundos segue a ordem (spec §5)', () => {
  const state = emptyState();
  assert.ok(isWorldUnlocked(state, 'forest', WORLD_ORDER));
  assert.ok(!isWorldUnlocked(state, 'candy', WORLD_ORDER));
  completeWorld(state, 'forest');
  assert.ok(isWorldUnlocked(state, 'candy', WORLD_ORDER));
  assert.ok(!isWorldUnlocked(state, 'clouds', WORLD_ORDER));
  assert.equal(firstIncompleteWorld(state, WORLD_ORDER), 'candy');
});

test('completar mundo concede badge uma única vez', () => {
  const state = emptyState();
  const first = completeWorld(state, 'forest');
  const second = completeWorld(state, 'forest');
  assert.equal(first.badges.length, 1);
  assert.ok(second.alreadyDone);
  assert.equal(second.badges.length, 0);
  assert.equal(Object.keys(state.badges).length, 1);
});

test('amigos: descoberta única, sticker automático, 10 amigos na história (spec §15)', () => {
  const state = emptyState();
  assert.ok(discoverFriend(state, 'maria'));
  assert.equal(discoverFriend(state, 'maria'), false);
  assert.ok(state.stickers['friend-maria']);
  assert.equal(Object.keys(FRIENDS).length, WORLD_ORDER.length);
  for (const worldId of WORLD_ORDER) {
    assert.ok(Object.values(FRIENDS).some((friend) => friend.world === worldId), `amigo para ${worldId}`);
  }
});

test('presentes: concede, abre uma vez', () => {
  const state = emptyState();
  assert.ok(grantPresent(state, 'forest-present-1'));
  assert.equal(grantPresent(state, 'forest-present-1'), false);
  assert.ok(openPresent(state, 'forest-present-1'));
  assert.equal(openPresent(state, 'forest-present-1'), false);
});

test('colecionáveis somam por mundo', () => {
  const state = emptyState();
  addCollectible(state, 'forest');
  addCollectible(state, 'forest', 2);
  assert.equal(state.collectibles.forest, 3);
});

test('história completa dá badge de herói uma vez', () => {
  const state = emptyState();
  assert.equal(completeStory(state).badges.length, 1);
  assert.equal(completeStory(state).badges.length, 0);
  assert.ok(state.storyCompleted);
});

test('missões: 3 ativas, completam e são substituídas na ordem (spec §17)', () => {
  const state = emptyState();
  refreshQuests(state);
  assert.equal(state.quests.active.length, 3);
  assert.deepEqual(state.quests.active, ['solve-5', 'friend-2', 'presents-2']);
  // Resolve 5 desafios → missão 1 completa e é substituída por 'friend-4'... não:
  // 'collect-forest-5' vem antes no pool.
  for (let index = 0; index < 5; index += 1) recordSolve(state, `enc-${index}`);
  assert.ok(refreshQuests(state));
  assert.ok(state.quests.completed.includes('solve-5'));
  assert.ok(!state.quests.active.includes('solve-5'));
  assert.equal(state.quests.active.length, 3);
});

test('missão cuja métrica já passou não fica presa ativa', () => {
  const state = emptyState();
  for (let index = 0; index < 10; index += 1) recordSolve(state, `enc-${index}`);
  discoverFriend(state, 'maria');
  grantPresent(state, 'p1');
  openPresent(state, 'p1');
  refreshQuests(state);
  for (const questId of state.quests.active) {
    const definition = QUEST_POOL.find((quest) => quest.id === questId);
    const progress = questProgress(state, definition);
    assert.ok(progress.current < progress.target, `${questId} deve ter progresso real`);
  }
});

test('cada mundo tem exatamente 10 encontros (spec §5)', () => {
  for (const worldId of WORLD_ORDER) {
    assert.equal(encountersFor(worldId).length, 10, `10 encontros em ${worldId}`);
    const ids = encountersFor(worldId).map((encounter) => encounter.id);
    assert.equal(new Set(ids).size, 10, `ids únicos em ${worldId}`);
  }
  const total = WORLD_ORDER.reduce((sum, worldId) => sum + encountersFor(worldId).length, 0);
  assert.equal(total, 100);
});

test(' sequência de nós do mundo é coerente (amigos, presentes, final)', () => {
  for (const worldId of WORLD_ORDER) {
    const nodes = WORLD_NODES[worldId];
    assert.ok(nodes.some((node) => node.type === 'friend'));
    assert.equal(nodes.filter((node) => node.type === 'reward').length, 3);
    assert.equal(nodes[nodes.length - 1].type, 'finale');
    assert.ok(nodes.some((node) => node.type === 'explore'));
  }
});

test('chave de storage é namespaced fora da geografia (spec §36)', () => {
  assert.equal(STORAGE_KEY, 'mundo-da-julia.maths.v1');
});

test('badges e stickers nunca duplicam', () => {
  const state = emptyState();
  assert.ok(earnSticker(state, 's1'));
  assert.equal(earnSticker(state, 's1'), false);
  assert.ok(earnBadge(state, 'b1'));
  assert.equal(earnBadge(state, 'b1'), false);
  assert.equal(solvedCount(state), 0);
});
