// RPG Welling — save local por jogadora (spec §37, sem contas online).

export const STORAGE_KEY = 'mundo-da-julia.rpgwelling.v1';

export const CHARACTERS = [
  { id: 'ivy', emoji: '👧', owl: 'Pip' },
  { id: 'oakley', emoji: '🧒', owl: 'Marlow' },
];

export const MAP_PIECES = ['finch', 'page', 'shelf', 'trolley'];
export const ZONES = ['school', 'woods'];

export function emptyState() {
  return {
    version: 1,
    character: '', // 'ivy' | 'oakley'
    zone: 'school',
    position: null, // [x, z] dentro da zona
    mapPieces: [], // ids das 4 partes do mapa
    flags: {}, // marcos da história (introSeen, mapAssembled, gateOpen…)
    clues: [], // páginas de historia encontradas
    challenges: {}, // challengeId → true quando resolvido
    sound: true,
  };
}

export function normalizeState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const state = emptyState();
  state.character = CHARACTERS.some((c) => c.id === source.character) ? source.character : '';
  state.zone = ZONES.includes(source.zone) ? source.zone : 'school';
  if (Array.isArray(source.position) && source.position.length === 2) {
    const [x, z] = source.position.map((n) => (Number.isFinite(n) ? Math.max(-60, Math.min(60, n)) : 0));
    state.position = [x, z];
  }
  state.mapPieces = (Array.isArray(source.mapPieces) ? source.mapPieces : [])
    .filter((id) => MAP_PIECES.includes(id));
  state.mapPieces = MAP_PIECES.filter((id) => state.mapPieces.includes(id)); // ordem canônica, sem duplicatas
  if (source.flags && typeof source.flags === 'object') {
    for (const [key, flag] of Object.entries(source.flags)) {
      if (typeof key === 'string' && key.length <= 40) state.flags[key] = Boolean(flag);
    }
  }
  state.clues = (Array.isArray(source.clues) ? source.clues : [])
    .filter((id) => typeof id === 'string' && id.length <= 40).slice(0, 50);
  if (source.challenges && typeof source.challenges === 'object') {
    for (const [id, done] of Object.entries(source.challenges)) {
      if (typeof id === 'string' && id.length <= 40) state.challenges[id] = Boolean(done);
    }
  }
  state.sound = source.sound !== false && source.sound !== 0;
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
  if (!key) return;
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    all[key] = normalizeState(state);
    storage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {}
}
