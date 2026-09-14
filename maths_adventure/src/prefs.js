// Preferências compartilhadas do site (mesma chave do atlas/launcher).
// O launcher manda nome/idioma/avatar por query param; respeitamos e salvamos.

export const PREFERENCES_KEY = 'mundo-da-julia.preferences.v1';
const LANGUAGES = new Set(['pt', 'en']);

export function loadPreferences(storage = window.localStorage) {
  try {
    const raw = JSON.parse(storage.getItem(PREFERENCES_KEY) || '{}') || {};
    return {
      name: typeof raw.name === 'string' ? raw.name.trim().slice(0, 32) : '',
      language: LANGUAGES.has(raw.language) ? raw.language : 'pt',
      avatar: typeof raw.avatar === 'string' ? raw.avatar.slice(0, 16) : '',
    };
  } catch {
    return { name: '', language: 'pt', avatar: '' };
  }
}

export function applyLauncherParams(preferences, params = new URLSearchParams(window.location.search)) {
  if (params.get('from') !== 'launcher') return preferences;
  const next = { ...preferences };
  const name = (params.get('name') || '').trim().slice(0, 32);
  const language = params.get('language') || '';
  const avatar = (params.get('avatar') || '').slice(0, 16);
  if (name) next.name = name;
  if (LANGUAGES.has(language)) next.language = language;
  if (avatar) next.avatar = avatar;
  try {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
  } catch {
    // Storage bloqueado: seguimos com os valores em memória.
  }
  return next;
}
