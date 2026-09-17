// Music Adventures — estado por jogadora (estrelas por nível, microfone).

export const STORAGE_KEY = 'mundo-da-julia.musicadventures.v1';

export function emptyState() {
  return {
    version: 1,
    stars: { listen: {}, sing: {} }, // activity → level → 1..3
    micGranted: false,
    sound: true,
  };
}

export function normalizeState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const state = emptyState();
  const stars = source.stars && typeof source.stars === 'object' ? source.stars : {};
  for (const activity of ['listen', 'sing']) {
    const entries = stars[activity] && typeof stars[activity] === 'object' ? stars[activity] : {};
    for (const [level, value] of Object.entries(entries)) {
      const parsed = Math.max(0, Math.min(3, Math.floor(value) || 0));
      if (parsed > 0) state.stars[activity][Math.floor(Number(level))] = parsed;
    }
  }
  state.micGranted = Boolean(source.micGranted);
  state.sound = source.sound !== false;
  return state;
}

function profileKey(name) {
  return String(name || '').trim().toLowerCase().slice(0, 32);
}

export function loadState(storage, player) {
  const key = profileKey(player);
  if (!key) return normalizeState();
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    return normalizeState(all[key]);
  } catch {
    return normalizeState();
  }
}

export function saveState(storage, player, state) {
  const key = profileKey(player);
  if (!key) return state;
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    all[key] = normalizeState(state);
    storage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // armazenamento bloqueado: segue em sessão
  }
  return state;
}

// Grava as estrelas do nível, mantendo o melhor resultado.
export function recordStars(state, activity, level, earned) {
  if (!state.stars[activity]) state.stars[activity] = {};
  const previous = state.stars[activity][level] || 0;
  state.stars[activity][level] = Math.max(previous, earned);
  return state.stars[activity][level];
}
