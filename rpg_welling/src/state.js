// RPG Welling — save local por jogadora (spec §37, sem contas online).
import { normalizeWords } from './vocab.js';

export const STORAGE_KEY = 'mundo-da-julia.rpgwelling.v1';
export const GEN_KEY = 'mundo-da-julia.rpgwelling.gen';

// Geração do slot de save: o restart incrementa a geração, então abas
// antigas abertas (com estado velho em memória) continuam escrevendo no
// slot anterior — inofensivo — em vez de ressuscitarem o save apagado.
export function slotKey() {
  try {
    const gen = localStorage.getItem(GEN_KEY);
    // sem geração definida usa a chave base (compat com saves existentes);
    // após o primeiro restart, a geração muda e abas velhas ficam no slot antigo
    return gen ? `${STORAGE_KEY}.g${gen}` : STORAGE_KEY;
  } catch {
    return STORAGE_KEY;
  }
}

export function bumpGeneration() {
  try {
    const gen = Number(localStorage.getItem(GEN_KEY) || '1') + 1;
    localStorage.setItem(GEN_KEY, String(gen));
  } catch {}
}

export const CHARACTERS = [
  { id: 'ivy', emoji: '👧', owl: 'Pip' },
  { id: 'oakley', emoji: '🧒', owl: 'Marlow' },
];

export const MAP_PIECES = ['finch', 'page', 'shelf', 'trolley'];
export const ZONES = ['school', 'woods', 'highstreet', 'academy', 'classroom'];

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
    words: {}, // vocabulário aprendido (vocab.js, repetição espaçada)
    sound: true,
    language: '', // idioma escolhido no HUD ('' = seguir o launcher/URL)
    history: {}, // 'YYYY-MM-DD' → { added, right, wrong } — dias de estudo p/ relatório
    duelWins: 0, // total de duelos vencidos (conta medalhas da Academia)
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
  state.language = ['pt', 'en', 'es'].includes(source.language) ? source.language : '';
  state.duelWins = Number.isFinite(source.duelWins) ? Math.max(0, Math.min(999, Math.floor(source.duelWins))) : 0;
  if (source.history && typeof source.history === 'object') {
    const int0 = (n) => (Number.isFinite(n) ? Math.max(0, Math.min(1e6, Math.floor(n))) : 0);
    for (const [day, entry] of Object.entries(source.history)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !entry || typeof entry !== 'object') continue;
      state.history[day] = { added: int0(entry.added), right: int0(entry.right), wrong: int0(entry.wrong) };
    }
    // corta nos 60 dias mais recentes (ordem lexicográfica = cronológica)
    const keys = Object.keys(state.history).sort().slice(-60);
    state.history = Object.fromEntries(keys.map((k) => [k, state.history[k]]));
  }
  state.words = normalizeWords(source.words);
  return state;
}

function profileKey(name) {
  return String(name || '').trim().toLowerCase().slice(0, 32);
}

// data local no padrão YYYY-MM-DD (toISOString é UTC e mudaria "hoje" perto da meia-noite)
export function dayKey(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// registra um evento do dia: 'added' (palavra nova), 'right' ou 'wrong'
export function recordHistory(state, field, amount = 1) {
  const day = dayKey(new Date());
  const entry = state.history[day] || (state.history[day] = { added: 0, right: 0, wrong: 0 });
  entry[field] = (entry[field] || 0) + amount;
}

// soma dos últimos `days` dias (inclusive hoje) → { added, right, wrong, active }
export function historyWeek(history, now = new Date(), days = 7) {
  const sum = { added: 0, right: 0, wrong: 0, active: 0 };
  for (let i = 0; i < days; i += 1) {
    const entry = history?.[dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - i))];
    if (!entry) continue;
    sum.added += entry.added || 0;
    sum.right += entry.right || 0;
    sum.wrong += entry.wrong || 0;
    sum.active += 1;
  }
  return sum;
}

// dias consecutivos de estudo terminando hoje (ou ontem, se hoje ainda não jogou)
export function studyStreak(history, now = new Date()) {
  let streak = 0;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; ; i += 1) {
    const entry = history?.[dayKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i))];
    if (entry) { streak += 1; continue; }
    if (i === 0) continue; // hoje ainda sem registro não quebra a sequência
    break;
  }
  return streak;
}

export function loadState(storage, player) {
  const key = profileKey(player);
  if (!key) return normalizeState();
  try {
    const all = JSON.parse(storage.getItem(slotKey()) || '{}') || {};
    return normalizeState(all[key]);
  } catch {
    return normalizeState();
  }
}

export function saveState(storage, player, state) {
  const key = profileKey(player);
  if (!key) return;
  try {
    const all = JSON.parse(storage.getItem(slotKey()) || '{}') || {};
    all[key] = normalizeState(state);
    storage.setItem(slotKey(), JSON.stringify(all));
  } catch {}
}
