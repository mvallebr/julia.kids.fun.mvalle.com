const STORAGE_KEY = 'mundo-da-julia.preferences.v1';

export const DEFAULT_PREFERENCES = Object.freeze({
  name: '',
  language: 'pt',
  theme: 'auto',
  accent: 'gold',
});

const LANGUAGES = new Set(['pt', 'en', 'es']);
const THEMES = new Set(['auto', 'day', 'sunset', 'night']);
const ACCENTS = new Set(['gold', 'mint', 'pink', 'blue']);

function valid(value, allowed, fallback) {
  return allowed.has(value) ? value : fallback;
}

function normalizeName(value) {
  if (typeof value !== 'string') return DEFAULT_PREFERENCES.name;
  return value.trim().replace(/\s+/g, ' ').slice(0, 32);
}

export function normalizePreferences(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    name: normalizeName(source.name),
    language: valid(source.language, LANGUAGES, DEFAULT_PREFERENCES.language),
    theme: valid(source.theme, THEMES, DEFAULT_PREFERENCES.theme),
    accent: valid(source.accent, ACCENTS, DEFAULT_PREFERENCES.accent),
  };
}

export function loadPreferences(storage = window.localStorage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return normalizePreferences(raw ? JSON.parse(raw) : DEFAULT_PREFERENCES);
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(preferences, storage = window.localStorage) {
  const normalized = normalizePreferences(preferences);
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Preferências continuam válidas nesta sessão mesmo se o storage estiver bloqueado.
  }
  return normalized;
}

export function themeFor(preferences, hour = new Date().getHours()) {
  if (preferences.theme !== 'auto') return preferences.theme;
  if (hour >= 6 && hour < 16) return 'day';
  if (hour >= 16 && hour < 20) return 'sunset';
  return 'night';
}

export function applyPreferences(preferences, root = document.documentElement, body = document.body) {
  const normalized = normalizePreferences(preferences);
  root.lang = normalized.language === 'pt' ? 'pt-BR' : normalized.language;
  root.dataset.accent = normalized.accent;
  body.dataset.theme = themeFor(normalized);
  return normalized;
}

export { STORAGE_KEY };
