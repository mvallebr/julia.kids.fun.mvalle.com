import { text } from '../i18n.js';
import { CONTINENTS } from '../progress.js';

// Regras de segmentação aprovadas pela Julia (spec §5):
// 10 → 2×5 (vermelho→verde), 15 → 3×5, 18 → 3×6, 20 → 4×5 (vermelho→laranja→amarelo→verde).
export function segmentCountFor(target) {
  if (!Number.isFinite(target) || target <= 0) return 1;
  for (const count of [4, 3, 2]) {
    if (target % count === 0) return count;
  }
  return target % 5 === 0 && target >= 25 ? 5 : 1;
}

const SEGMENT_COLORS = {
  1: ['#ff5a5a', '#ffb347', '#ffd166', '#7ad97a'],
  2: ['#ff5a5a', '#7ad97a'],
  3: ['#ff5a5a', '#ffd166', '#7ad97a'],
  4: ['#ff5a5a', '#ffb347', '#ffd166', '#7ad97a'],
  5: ['#ff5a5a', '#ffb347', '#ffd166', '#a8e05f', '#7ad97a'],
};

export function segmentColorsFor(count) {
  return SEGMENT_COLORS[count] || SEGMENT_COLORS[1];
}

export const ADVENTURE_TASKS = Object.freeze([
  { id: 'countries-10', category: 'country', icon: '🌍', target: 10 },
  { id: 'countries-15', category: 'country', icon: '🌍', target: 15 },
  { id: 'audio-5', category: 'audio', icon: '🔊', target: 5 },
  { id: 'countries-20', category: 'country', icon: '🌍', target: 20 },
  { id: 'places-5', category: 'place', icon: '📸', target: 5 },
  { id: 'wiki-3', category: 'wikipedia', icon: '📚', target: 3 },
  { id: 'continents-3', category: 'mixed', icon: '🧭', target: 3 },
  { id: 'audio-10', category: 'audio', icon: '🔊', target: 10 },
  { id: 'countries-30', category: 'country', icon: '🌍', target: 30 },
  { id: 'places-10', category: 'place', icon: '📸', target: 10 },
  { id: 'south-america', category: 'continent', icon: '🌎', continentId: 'south-america' },
  { id: 'wiki-5', category: 'wikipedia', icon: '📚', target: 5 },
  { id: 'countries-40', category: 'country', icon: '🌍', target: 40 },
  { id: 'audio-15', category: 'audio', icon: '🔊', target: 15 },
  { id: 'continents-5', category: 'mixed', icon: '🧭', target: 5 },
  { id: 'places-15', category: 'place', icon: '📸', target: 15 },
  { id: 'countries-50', category: 'country', icon: '🌍', target: 50 },
  { id: 'europe', category: 'continent', icon: '🌍', continentId: 'europe' },
  { id: 'audio-25', category: 'audio', icon: '🔊', target: 25 },
  { id: 'africa', category: 'continent', icon: '🌍', continentId: 'africa' },
  { id: 'countries-75', category: 'country', icon: '🌍', target: 75 },
  { id: 'asia', category: 'continent', icon: '🌏', continentId: 'asia' },
  { id: 'countries-100', category: 'country', icon: '🌍', target: 100 },
  { id: 'north-america', category: 'continent', icon: '🌎', continentId: 'north-america' },
  { id: 'audio-40', category: 'audio', icon: '🔊', target: 40 },
  { id: 'oceania', category: 'continent', icon: '🌊', continentId: 'oceania' },
  { id: 'wiki-10', category: 'wikipedia', icon: '📚', target: 10 },
  { id: 'antarctica', category: 'continent', icon: '🧊', continentId: 'antarctica' },
  { id: 'countries-all', category: 'country', icon: '🏆', target: null },
]);

export function taskById(id) {
  return ADVENTURE_TASKS.find((task) => task.id === id) || null;
}

const TITLE_KEYS = {
  country: 'advTaskCountries',
  audio: 'advTaskAudio',
  place: 'advTaskPlaces',
  wikipedia: 'advTaskWiki',
  mixed: 'advTaskContinents',
};

export function taskTitle(language, task) {
  if (task.category === 'continent') {
    const continent = CONTINENTS.find((candidate) => candidate.id === task.continentId);
    return text(language, 'advTaskContinentComplete', {
      continent: text(language, continent ? continent.labelKey : task.continentId),
    });
  }
  if (task.target == null) return text(language, 'advTaskWorld');
  return text(language, TITLE_KEYS[task.category] || 'advTaskCountries', { target: task.target });
}

// Recompensas crescem com a posição na sequência (spec §17): certificado sempre,
// stickers crescentes; marcos ganham badge especial por cima (engine resolve).
export function rewardForTask(task, order) {
  return {
    certificate: true,
    stickers: Math.min(3, 1 + Math.floor(order / 9)),
    badges: task.category === 'continent' ? 1 : 0,
  };
}

export function taskOrder(task) {
  return ADVENTURE_TASKS.indexOf(task);
}
