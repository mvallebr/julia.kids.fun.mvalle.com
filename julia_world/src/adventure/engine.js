import { ADVENTURE_TASKS, taskById, rewardForTask, taskOrder } from './tasks.js';
import { continentProgress, profileKey } from '../progress.js';

export const ADVENTURE_STORAGE_KEY = 'mundo-atlas.adventure.v1';
export const MILESTONES = [10, 20];
export const ACTIVE_SLOT_COUNT = 3;

export function emptyAdventureState() {
  return {
    completed: [],
    active: [],
    rewards: {},
    counters: { audio: [], wiki: [] },
    milestones: [],
    worldCompleted: false,
    finalCelebrated: false,
    migrated: false,
  };
}

function uniqueStrings(value) {
  return [...new Set(Array.isArray(value) ? value.filter((item) => typeof item === 'string' && item) : [])];
}

export function normalizeAdventureState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const state = emptyAdventureState();
  state.completed = uniqueStrings(source.completed).filter((id) => taskById(id));
  state.active = uniqueStrings(source.active)
    .filter((id) => taskById(id) && !state.completed.includes(id))
    .slice(0, ACTIVE_SLOT_COUNT);
  state.counters.audio = uniqueStrings(source.counters?.audio);
  state.counters.wiki = uniqueStrings(source.counters?.wiki);
  state.milestones = uniqueStrings(source.milestones).map(Number).filter(Number.isFinite);
  state.worldCompleted = Boolean(source.worldCompleted);
  state.finalCelebrated = Boolean(source.finalCelebrated);
  state.migrated = Boolean(source.migrated);
  if (source.rewards && typeof source.rewards === 'object') {
    for (const [id, reward] of Object.entries(source.rewards)) {
      if (taskById(id) && reward && typeof reward === 'object') state.rewards[id] = reward;
    }
  }
  state.active = ensureActive(state);
  return state;
}

export function loadAdventure(storage, player) {
  const key = profileKey(player);
  if (!key) return null;
  try {
    const all = JSON.parse(storage.getItem(ADVENTURE_STORAGE_KEY) || '{}');
    return normalizeAdventureState(all[key]);
  } catch {
    return emptyAdventureState();
  }
}

export function saveAdventure(storage, player, state) {
  const key = profileKey(player);
  if (!key) return state;
  let all = {};
  try {
    all = JSON.parse(storage.getItem(ADVENTURE_STORAGE_KEY) || '{}') || {};
  } catch {
    all = {};
  }
  all[key] = normalizeAdventureState(state);
  try {
    storage.setItem(ADVENTURE_STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Segue em sessão mesmo se o armazenamento estiver bloqueado.
  }
  return state;
}

export function recordCounter(state, kind, value) {
  if (!value || !state.counters[kind] || state.counters[kind].includes(value)) return false;
  state.counters[kind].push(value);
  return true;
}

// Instantâneo do progresso real do explorador; tarefas são calculadas a partir
// dele para respeitar progresso anterior (spec §6/§27).
export function buildSnapshot(profile, features, counters) {
  const continents = continentProgress(profile, features);
  const countriesTotal = continents.reduce((sum, c) => sum + c.total, 0);
  return {
    countries: new Set(profile?.visitedCountries || []).size,
    places: new Set(profile?.visitedPlaces || []).size,
    audio: (counters?.audio || []).length,
    wiki: (counters?.wiki || []).length,
    continentsVisited: continents.filter((c) => c.visited > 0).length,
    continents: Object.fromEntries(continents.map((c) => [c.id, { visited: c.visited, total: c.total }])),
    countriesTotal,
  };
}

export function progressFor(task, snapshot) {
  let current = 0;
  let target = task.target;
  switch (task.category) {
    case 'country':
      current = snapshot.countries;
      if (target == null) target = snapshot.countriesTotal;
      break;
    case 'audio':
      current = snapshot.audio;
      break;
    case 'place':
      current = snapshot.places;
      break;
    case 'wikipedia':
      current = snapshot.wiki;
      break;
    case 'mixed':
      current = snapshot.continentsVisited;
      break;
    case 'continent': {
      const continent = snapshot.continents[task.continentId] || { visited: 0, total: 0 };
      current = continent.visited;
      target = continent.total;
      break;
    }
    default:
      break;
  }
  return { current, target: target || 0, ratio: target ? Math.min(1, current / target) : 0 };
}

export function isTaskComplete(task, snapshot) {
  const { current, target } = progressFor(task, snapshot);
  return target > 0 && current >= target;
}

export function ensureActive(state) {
  const completed = new Set(state.completed);
  const active = (state.active || []).filter((id) => !completed.has(id));
  for (const task of ADVENTURE_TASKS) {
    if (active.length >= ACTIVE_SLOT_COUNT) break;
    if (completed.has(task.id) || active.includes(task.id)) continue;
    active.push(task.id);
  }
  return active;
}

// Conclui a tarefa exatamente uma vez (spec §42); persistir fica a cargo do caller.
export function completeTask(state, taskId) {
  if (state.completed.includes(taskId)) return null;
  const task = taskById(taskId);
  if (!task) return null;
  const slot = state.active.indexOf(taskId);
  state.completed.push(taskId);
  const completed = new Set(state.completed);
  const next = ADVENTURE_TASKS.find((candidate) => !completed.has(candidate.id) && !state.active.includes(candidate.id));
  if (slot >= 0) {
    if (next) state.active[slot] = next.id;
    else state.active.splice(slot, 1);
  }
  state.active = ensureActive(state);
  const reward = { ...rewardForTask(task, taskOrder(task)), at: Date.now() };
  state.rewards[taskId] = reward;
  if (task.target == null) state.worldCompleted = true;
  return { task, reward, completedCount: state.completed.length, slot };
}

export function pendingMilestone(state) {
  return MILESTONES.find((count) => state.completed.length >= count && !state.milestones.includes(count)) || null;
}

export function completeMilestone(state, count) {
  if (!state.milestones.includes(count)) state.milestones.push(count);
}

// Migração (spec §27): progresso anterior marca tarefas menores como concluídas
// em silêncio, sem celebrações retroativas.
export function migrateIfNeeded(state, snapshot) {
  if (state.migrated) return false;
  let changed = false;
  for (const task of ADVENTURE_TASKS) {
    if (state.completed.includes(task.id)) continue;
    if (!isTaskComplete(task, snapshot)) continue;
    state.completed.push(task.id);
    state.rewards[task.id] = { certificate: true, stickers: 0, migrated: true, at: Date.now() };
    changed = true;
  }
  state.active = ensureActive(state);
  state.migrated = true;
  return changed;
}

export { ADVENTURE_TASKS, taskById, taskTitle, segmentCountFor } from './tasks.js';
