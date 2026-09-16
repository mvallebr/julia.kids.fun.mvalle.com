// Estado do English Adventures — por jogadora, isolado dos outros apps (spec §3/§25/§36).
// Persistido em localStorage como mapa profileKey -> estado, igual ao engine
// de aventuras do atlas. Normalização defensiva: save antigo/corrompido vira
// estado válido, nunca tela quebrada.

import { hashSeed } from './rng.js';

export const STORAGE_KEY = 'mundo-da-julia.english.v1';
export const STATE_VERSION = 1;

export function emptyState() {
  return {
    version: STATE_VERSION,
    character: '', // 'girl' | 'boy'
    storyId: 'story-1',
    worldId: '', // mundo atual
    nodeIndex: 0, // posição dentro do mundo (checkpoint de cena)
    worldStatus: {}, // { worldId: 'in-progress' | 'completed' }
    solved: {}, // { encounterId: { attempts, at } }
    friends: [], // ids descobertos
    stickers: {}, // { stickerId: at }
    badges: {}, // { badgeId: at }
    collectibles: {}, // { worldId: quantidade }
    presents: {}, // { presentId: { opened, at } }
    quests: { active: [], completed: [], counters: {} },
    skills: {}, // rastreamento adaptativo por habilidade
    storyCompleted: false,
    celebrationViewed: false,
    sound: true,
  };
}

const CLAMP_INT = (value) => (Number.isFinite(value) && value > 0 ? Math.floor(value) : 0);

function cleanIdMap(source) {
  const result = {};
  if (!source || typeof source !== 'object') return result;
  for (const [key, value] of Object.entries(source)) {
    if (typeof key === 'string' && key) result[key] = value;
  }
  return result;
}

export function normalizeState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const state = emptyState();
  state.character = source.character === 'boy' ? 'boy' : source.character === 'girl' ? 'girl' : '';
  state.storyId = typeof source.storyId === 'string' && source.storyId ? source.storyId : state.storyId;
  state.worldId = typeof source.worldId === 'string' ? source.worldId : '';
  state.nodeIndex = CLAMP_INT(source.nodeIndex);
  state.worldStatus = cleanIdMap(source.worldStatus);
  for (const [key, status] of Object.entries(state.worldStatus)) {
    if (status !== 'completed' && status !== 'in-progress') state.worldStatus[key] = 'in-progress';
  }
  state.solved = cleanIdMap(source.solved);
  for (const [key, record] of Object.entries(state.solved)) {
    state.solved[key] = {
      attempts: Math.max(1, CLAMP_INT(record?.attempts) || 1),
      at: CLAMP_INT(record?.at),
    };
  }
  state.friends = [...new Set((Array.isArray(source.friends) ? source.friends : []).filter((id) => typeof id === 'string' && id))];
  state.stickers = cleanIdMap(source.stickers);
  state.badges = cleanIdMap(source.badges);
  state.collectibles = cleanIdMap(source.collectibles);
  for (const [key, count] of Object.entries(state.collectibles)) state.collectibles[key] = CLAMP_INT(count);
  state.presents = cleanIdMap(source.presents);
  for (const [key, present] of Object.entries(state.presents)) {
    state.presents[key] = { opened: Boolean(present?.opened), at: CLAMP_INT(present?.at) };
  }
  state.skills = cleanIdMap(source.skills);
  for (const [key, record] of Object.entries(state.skills)) {
    state.skills[key] = {
      c: Math.max(0, Math.floor(record?.c || 0)),
      w: Math.max(0, Math.floor(record?.w || 0)),
    };
  }
  const quests = source.quests && typeof source.quests === 'object' ? source.quests : {};
  state.quests = {
    active: (Array.isArray(quests.active) ? quests.active : []).filter((id) => typeof id === 'string' && id).slice(0, 3),
    completed: (Array.isArray(quests.completed) ? quests.completed : []).filter((id) => typeof id === 'string' && id),
    counters: cleanIdMap(quests.counters),
  };
  for (const [key, count] of Object.entries(state.quests.counters)) state.quests.counters[key] = CLAMP_INT(count);
  state.storyCompleted = Boolean(source.storyCompleted);
  state.celebrationViewed = Boolean(source.celebrationViewed);
  state.sound = source.sound !== false;
  return state;
}

function readAll(storage) {
  try {
    return JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

export function profileKey(name) {
  return String(name || '').trim().toLowerCase().slice(0, 32);
}

export function loadState(storage, player) {
  const key = profileKey(player);
  if (!key) return normalizeState();
  return normalizeState(readAll(storage)[key]);
}

export function saveState(storage, player, state) {
  const key = profileKey(player);
  if (!key) return state;
  const all = readAll(storage);
  all[key] = normalizeState(state);
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Armazenamento bloqueado: a sessão continua (mesma postura do atlas).
  }
  return state;
}

// Semente estável por jogadora + encontro: recarregar não troca a pergunta (spec §25).
export function seedFor(player, encounterId) {
  return seededString(`${profileKey(player)}:${encounterId}`);
}

function seededString(text) {
  return String(hashSeed(text));
}

// ── Progressão ───────────────────────────────────────────────────────────────
// Desbloqueio: mundo 0 sempre; mundo n requer mundo n-1 completo (chamador
// informa a ordem; aqui só checamos status gravado).

export function isWorldUnlocked(state, worldId, worldOrder) {
  const index = worldOrder.indexOf(worldId);
  if (index <= 0) return index === 0;
  return state.worldStatus[worldOrder[index - 1]] === 'completed';
}

export function firstIncompleteWorld(state, worldOrder) {
  for (const worldId of worldOrder) {
    if (state.worldStatus[worldId] !== 'completed') return worldId;
  }
  return null;
}

export function recordSolve(state, encounterId, { attempts = 1, at = Date.now() } = {}) {
  if (state.solved[encounterId]) return false; // recompensa/progresso só uma vez (spec §41)
  state.solved[encounterId] = { attempts: Math.max(1, attempts), at };
  return true;
}

export function discoverFriend(state, friendId, { at = Date.now() } = {}) {
  if (state.friends.includes(friendId)) return false;
  state.friends.push(friendId);
  if (!state.stickers[`friend-${friendId}`]) state.stickers[`friend-${friendId}`] = at;
  return true;
}

export function earnSticker(state, stickerId, { at = Date.now() } = {}) {
  if (state.stickers[stickerId]) return false;
  state.stickers[stickerId] = at;
  return true;
}

export function earnBadge(state, badgeId, { at = Date.now() } = {}) {
  if (state.badges[badgeId]) return false;
  state.badges[badgeId] = at;
  return true;
}

export function addCollectible(state, worldId, amount = 1) {
  state.collectibles[worldId] = (state.collectibles[worldId] || 0) + amount;
  return state.collectibles[worldId];
}

export function grantPresent(state, presentId, { at = Date.now() } = {}) {
  if (state.presents[presentId]) return false;
  state.presents[presentId] = { opened: false, at };
  return true;
}

export function openPresent(state, presentId, { at = Date.now() } = {}) {
  const present = state.presents[presentId];
  if (!present || present.opened) return false;
  present.opened = true;
  present.at = at;
  return true;
}

export function completeWorld(state, worldId, { at = Date.now() } = {}) {
  const alreadyDone = state.worldStatus[worldId] === 'completed';
  state.worldStatus[worldId] = 'completed';
  const earned = [];
  if (earnBadge(state, `world-${worldId}`, { at })) earned.push(`world-${worldId}`);
  return { alreadyDone, badges: earned };
}

export function completeStory(state, { at = Date.now() } = {}) {
  const wasDone = state.storyCompleted;
  state.storyCompleted = true;
  const earned = [];
  if (earnBadge(state, 'story-1-hero', { at })) earned.push('story-1-hero');
  return { alreadyDone: wasDone, badges: earned };
}

export function recordSkill(state, skill, correct) {
  if (!skill) return;
  const record = state.skills[skill] || { c: 0, w: 0 };
  if (correct) record.c += 1;
  else record.w += 1;
  state.skills[skill] = record;
}

export function solvedCount(state) {
  return Object.keys(state.solved).length;
}

// ── Missões (spec §17): até 3 ativas, pool em ordem, troca automática ────────
// Cada definição: { id, icon, label, target, metric } — progresso derivado do
// estado (puro, testável). metric: solved | friends | presents | collect:<world>

export const QUEST_POOL = [
  { id: 'solve-5', icon: '📚', metric: 'solved', target: 5 },
  { id: 'friend-2', icon: '🤝', metric: 'friends', target: 2 },
  { id: 'presents-2', icon: '🎁', metric: 'presents', target: 2 },
  { id: 'solve-15', icon: '📚', metric: 'solved', target: 15 },
  { id: 'collect-meadow-5', icon: '🌼', metric: 'collect:meadow', target: 5 },
  { id: 'friend-4', icon: '🤝', metric: 'friends', target: 4 },
  { id: 'solve-30', icon: '📚', metric: 'solved', target: 30 },
  { id: 'presents-5', icon: '🎁', metric: 'presents', target: 5 },
  { id: 'friend-6', icon: '🤝', metric: 'friends', target: 6 },
  { id: 'solve-50', icon: '📚', metric: 'solved', target: 50 },
  { id: 'friend-8', icon: '🤝', metric: 'friends', target: 8 },
  { id: 'solve-75', icon: '📚', metric: 'solved', target: 75 },
  { id: 'friend-10', icon: '🤝', metric: 'friends', target: 10 },
  { id: 'solve-100', icon: '📚', metric: 'solved', target: 100 },
];

export function questMetricValue(state, metric) {
  if (metric === 'solved') return solvedCount(state);
  if (metric === 'friends') return state.friends.length;
  if (metric === 'presents') return Object.values(state.presents).filter((present) => present.opened).length;
  if (metric.startsWith('collect:')) return state.collectibles[metric.slice(8)] || 0;
  return 0;
}

export function questProgress(state, quest) {
  const current = Math.min(questMetricValue(state, quest.metric), quest.target);
  return { current, target: quest.target, complete: current >= quest.target };
}

export function refreshQuests(state) {
  let replaced = false;
  for (const quest of [...state.quests.active]) {
    const definition = QUEST_POOL.find((candidate) => candidate.id === quest);
    if (definition && questProgress(state, definition).complete) {
      state.quests.active = state.quests.active.filter((id) => id !== quest);
      if (!state.quests.completed.includes(quest)) state.quests.completed.push(quest);
      replaced = true;
    }
  }
  for (const quest of QUEST_POOL) {
    if (state.quests.active.length >= 3) break;
    if (state.quests.completed.includes(quest.id) || state.quests.active.includes(quest.id)) continue;
    // Não re-oferece missão cuja métrica já passou do alvo (evita "missão morta").
    if (questMetricValue(state, quest.metric) >= quest.target) {
      state.quests.completed.push(quest.id);
      continue;
    }
    state.quests.active.push(quest.id);
  }
  return replaced;
}

export { QUEST_POOL as questPool };
