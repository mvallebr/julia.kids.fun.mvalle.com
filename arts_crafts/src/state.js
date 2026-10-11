// Estado local do Arts & Crafts.
//
// Duas fontes, e só duas: a query que o launcher manda e a preferência que o
// launcher já guardou. Arts & Crafts não tem conta, não tem onboarding e nunca
// escreve no perfil do launcher (spec §4): as únicas chaves que criamos começam
// com `artsCrafts.`.

import { DEFAULT_LANGUAGE, isLanguage } from './i18n.js';
// Só a lista de estações, e direto do contrato: puxar a biblioteca inteira
// aqui criaria um ciclo quando o conteúdo importar o estado.
import { SEASONS } from './content/shared.js';

const LAUNCHER_PREFERENCES = 'mundo-da-julia.preferences.v1';
const PREFIX = 'artsCrafts.';

export const KEYS = {
  season: `${PREFIX}gameMapSeason`,
  progress: `${PREFIX}tutorialProgress`,
  completed: `${PREFIX}completedTutorials`,
  lastTutorial: `${PREFIX}lastTutorial`,
  creations: `${PREFIX}creations`,
  sound: `${PREFIX}soundOn`,
};

// Teto de criações guardadas. A lista de traços é pequena (da ordem de 12 KB por
// desenho), mas o `localStorage` é um todo de 5 MB para o site inteiro, e este
// app convive com outros do mesmo domínio. Esquecer a mais antiga é melhor do
// que a escrita falhar no meio de um "guardar" e a criança achar que perdeu o
// desenho.
export const MAX_CREATIONS = 24;

export function readCreations() {
  const list = readJSON(KEYS.creations, []);
  return Array.isArray(list) ? list.filter((item) => item && typeof item.record === 'string') : [];
}

// Devolve a lista nova já podada. Quem chama precisa usar o retorno: a gravação
// é aqui dentro, e devolver sem usar é o jeito mais fácil de perder a criação.
export function writeCreation(creation) {
  const list = readCreations();
  list.unshift({ ...creation, at: Date.now() });
  const kept = list.slice(0, MAX_CREATIONS);
  writeJSON(KEYS.creations, kept);
  return kept;
}

export function deleteCreation(id) {
  const kept = readCreations().filter((item) => item.id !== id);
  writeJSON(KEYS.creations, kept);
  return kept;
}

export function readSoundOn(fallback = true) {
  const value = readString(KEYS.sound);
  return value === null ? fallback : value === '1';
}

export function writeSoundOn(on) {
  writeString(KEYS.sound, on ? '1' : '0');
}

function readJSON(key, fallback) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    return raw ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privado ou cota cheia: a fase 1 perde estado, não quebra */
  }
}

function writeString(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* idem */
  }
}

function readString(key) {
  try {
    const value = localStorage.getItem(key);
    return typeof value === 'string' && value ? value : null;
  } catch {
    return null;
  }
}

// O launcher manda ?name=&avatar=&language=. Quando alguém abre o app direto,
// caímos no que o launcher já guardou — e nunca pedimos nada de novo.
export function readPlayerContext(search = globalThis.location?.search || '') {
  const params = new URLSearchParams(search);
  const saved = readJSON(LAUNCHER_PREFERENCES, {}) || {};

  const name = (params.get('name') || saved.name || '').toString().trim().replace(/\s+/g, ' ');
  const rawLanguage = params.get('language') || saved.language;
  const avatar = (params.get('avatar') || saved.avatar || '👧').toString();

  return {
    name: name || null,
    avatar: avatar || '👧',
    language: isLanguage(rawLanguage) ? rawLanguage : DEFAULT_LANGUAGE,
  };
}

function currentSeason() {
  const month = new Date().getMonth();
  if (month <= 1 || month === 11) return 'winter';
  if (month <= 4) return 'spring';
  if (month <= 7) return 'summer';
  return 'autumn';
}

// A estação é texto puro, não JSON. Ela já foi gravada como JSON numa versão
// anterior — daí as aspas toleradas na leitura: sem isso, o valor guardado
// ("\"inverno\"") nunca casava com a lista e o botão de estação morria calado
// depois do primeiro clique, sem erro nenhum no console.
export function readSeason(fallback = currentSeason) {
  const stored = readString(KEYS.season);
  if (!stored) return fallback();
  const value = stored.replace(/^"|"$/g, '');
  return SEASONS.includes(value) ? value : fallback();
}

export function writeSeason(season) {
  if (!SEASONS.includes(season)) return;
  writeString(KEYS.season, season);
}

export function readProgress() {
  const value = readJSON(KEYS.progress, {});
  return value && typeof value === 'object' ? value : {};
}

export function readProgressFor(tutorialId) {
  const entry = readProgress()[tutorialId];
  if (!entry || typeof entry !== 'object') return null;
  return {
    stepIndex: Number.isInteger(entry.stepIndex) && entry.stepIndex >= 0 ? entry.stepIndex : 0,
    completed: entry.completed === true,
    updatedAt: typeof entry.updatedAt === 'string' ? entry.updatedAt : null,
  };
}

export function writeProgressFor(tutorialId, stepIndex, completed) {
  const all = readProgress();
  all[tutorialId] = { stepIndex, completed: completed === true, updatedAt: new Date().toISOString() };
  writeJSON(KEYS.progress, all);
  writeJSON(KEYS.lastTutorial, tutorialId);
  if (completed) {
    const done = readJSON(KEYS.completed, []);
    writeJSON(KEYS.completed, Array.isArray(done) ? Array.from(new Set([...done, tutorialId])) : [tutorialId]);
  }
}

export function readCompleted() {
  const value = readJSON(KEYS.completed, []);
  return Array.isArray(value) ? value.filter((id) => typeof id === 'string') : [];
}

export function readLastTutorial() {
  return readJSON(KEYS.lastTutorial, null);
}
