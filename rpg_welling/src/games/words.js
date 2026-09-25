// RPG Welling — painel de vocabulário dos lugares (roadmap 2.4).
// A seleção de palavras e as traduções são puras; o DOM fica isolado nesta
// fábrica para que main.js só precise abrir o modal e registrar o relatório.

import { shouldReduceMotion } from '../a11y.js';
import { GLOSSES } from '../content.js';

const LANGUAGES = ['pt', 'en', 'es'];
let nextWordsInstanceId = 0;

function translation(title, language) {
  return title?.[language] || title?.pt || title?.en || '';
}

function wordEntry(key, emoji) {
  return Object.freeze({ key, emoji });
}

// Cada spot representa uma zona jogável. As chaves são fechadas de propósito:
// createWords só aceita palavras que já existem no diário (GLOSSES).
export const WORDS_SPOTS = Object.freeze([
  Object.freeze({
    id: 'school',
    title: Object.freeze({
      pt: 'Parquinho e horta da escola',
      en: 'School playground and garden',
      es: 'Parque y huerto de la escuela',
    }),
    emoji: '🏫',
    words: Object.freeze([
      wordEntry('swing', '🛝'),
      wordEntry('run', '🏃'),
      wordEntry('jump', '🦘'),
      wordEntry('greenhouse', '🪴'),
    ]),
  }),
  Object.freeze({
    id: 'woods',
    title: Object.freeze({
      pt: 'Margens de Oxleas Wood',
      en: 'The edge of Oxleas Wood',
      es: 'El borde de Oxleas Wood',
    }),
    emoji: '🌳',
    words: Object.freeze([
      wordEntry('woods', '🌲'),
      wordEntry('meadow', '🌾'),
      wordEntry('path', '🥾'),
      wordEntry('pond', '🦆'),
    ]),
  }),
  Object.freeze({
    id: 'highstreet',
    title: Object.freeze({
      pt: 'High Street de Welling',
      en: 'Welling High Street',
      es: 'High Street de Welling',
    }),
    emoji: '🏙️',
    words: Object.freeze([
      wordEntry('shop', '🏪'),
      wordEntry('market', '🧺'),
      wordEntry('bakery', '🥖'),
      wordEntry('bus', '🚌'),
    ]),
  }),
  Object.freeze({
    id: 'classroom',
    title: Object.freeze({
      pt: 'Mesa da sala de aula',
      en: 'Classroom desk',
      es: 'Mesa del salón de clases',
    }),
    emoji: '✏️',
    words: Object.freeze([
      wordEntry('teacher', '🧑‍🏫'),
      wordEntry('student', '🧒'),
      wordEntry('class', '🧑‍🤝‍🧑'),
      wordEntry('read', '📖'),
    ]),
  }),
  Object.freeze({
    id: 'academy',
    title: Object.freeze({
      pt: 'Varanda da Academia Owlburt',
      en: 'Owlburt Academy porch',
      es: 'Porche de Owlburt Academy',
    }),
    emoji: '🪄',
    words: Object.freeze([
      wordEntry('tower', '🗼'),
      wordEntry('wizard', '🧙'),
      wordEntry('magic', '✨'),
      wordEntry('hero', '🦸'),
    ]),
  }),
]);

const SPOTS_BY_ID = new Map(WORDS_SPOTS.map((spot) => [spot.id, spot]));

export function spotById(id) {
  return SPOTS_BY_ID.get(id) || null;
}

export const DEFAULT_STRINGS = {
  panelTitle: {
    pt: 'Palavras: {place}',
    en: 'Words: {place}',
    es: 'Palabras: {place}',
  },
  instructions: {
    pt: 'Toque em uma palavra para abrir a tradução.',
    en: 'Tap a word to open its translation.',
    es: 'Toca una palabra para abrir su traducción.',
  },
  listen: {
    pt: 'Ouvir',
    en: 'Listen',
    es: 'Escuchar',
  },
  close: {
    pt: 'Fechar',
    en: 'Close',
    es: 'Cerrar',
  },
  save: {
    pt: 'Guardar no diário',
    en: 'Save in the journal',
    es: 'Guardar en el diario',
  },
  saved: {
    pt: 'Palavras guardadas no diário!',
    en: 'Words saved in the journal!',
    es: '¡Palabras guardadas en el diario!',
  },
  noneSaved: {
    pt: 'Nada novo para guardar agora. Tente outra palavra!',
    en: 'Nothing new to save yet. Try another word!',
    es: 'Nada nuevo que guardar todavía. ¡Prueba otra palabra!',
  },
  saveError: {
    pt: 'Não consegui guardar agora. Tenta de novo!',
    en: "I couldn't save just now. Try again!",
    es: '¡No pude guardar ahora. ¡Inténtalo de nuevo!',
  },
  openedBefore: {
    pt: 'Você abriu',
    en: 'You opened',
    es: 'Abriste',
  },
  openedAfter: {
    pt: ': {translation}.',
    en: ': {translation}.',
    es: ': {translation}.',
  },
};

function languageOrDefault(language) {
  return LANGUAGES.includes(language) ? language : 'pt';
}

function formatText(template, values) {
  return Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    String(template ?? ''),
  );
}

// Aceita tanto { title: { es: ... } } quanto { es: { title: ... } }, como os
// outros minigames. Um override incompleto nunca deixa a interface vazia.
export function resolveText(strings, key, language = 'pt') {
  const active = languageOrDefault(language);
  const supplied = strings?.[active] && typeof strings[active] === 'object' ? strings[active] : strings;
  const override = supplied?.[key];
  if (typeof override === 'string' && override) return override;
  if (override && typeof override === 'object') {
    const picked = override[active] || override.pt || override.en || override.es;
    if (typeof picked === 'string' && picked) return picked;
  }
  const fallback = DEFAULT_STRINGS[key];
  if (typeof fallback === 'string' && fallback) return fallback;
  return fallback?.[active] || fallback?.pt || fallback?.en || fallback?.es || '';
}

// GLOSSES guarda uma-definition por idioma. O painel mostra só a definição,
// porque a palavra inglesa já aparece em destaque no cartão.
export function glossTranslation(key, language = 'pt') {
  const active = languageOrDefault(language);
  const value = GLOSSES[key]?.[active] || GLOSSES[key]?.pt || GLOSSES[key]?.en || '';
  const separator = value.indexOf('=');
  return separator >= 0 ? value.slice(separator + 1).trim() : value;
}

function validWord(word) {
  return Boolean(
    word
    && typeof word === 'object'
    && typeof word.key === 'string'
    && word.key.trim()
    && Object.hasOwn(GLOSSES, word.key)
    && typeof word.emoji === 'string'
    && word.emoji,
  );
}

function spotValidationError(spot) {
  if (!spot || typeof spot !== 'object') return new TypeError('createWords requires a spot object');
  if (!WORDS_SPOTS.includes(spot)) {
    return new TypeError('createWords requires a spot from WORDS_SPOTS');
  }
  for (const language of LANGUAGES) {
    if (typeof translation(spot.title, language) !== 'string' || !translation(spot.title, language)) {
      return new TypeError(`createWords requires spot.title.${language}`);
    }
  }
  if (typeof spot.emoji !== 'string' || !spot.emoji) {
    return new TypeError('createWords requires spot.emoji');
  }
  if (!Array.isArray(spot.words) || spot.words.length !== 4) {
    return new RangeError('createWords requires exactly 4 words per spot');
  }
  const keys = new Set();
  for (const word of spot.words) {
    if (!validWord(word)) {
      return new TypeError('createWords requires every word to have a non-empty GLOSSES key and an emoji');
    }
    if (keys.has(word.key)) return new RangeError('createWords cannot repeat a word in a spot');
    keys.add(word.key);
  }
  return null;
}

function assertSpot(spot) {
  const error = spotValidationError(spot);
  if (error) throw error;
  return spot;
}

export function createWordsState(spot) {
  assertSpot(spot);
  return { spot, revealed: [] };
}

export function revealWord(state, key) {
  if (!state || !state.spot || !Array.isArray(state.revealed)) {
    throw new TypeError('revealWord requires a state created by createWordsState');
  }
  if (!state.spot.words.some((word) => word.key === key)) return false;
  if (state.revealed.includes(key)) return false;
  state.revealed.push(key);
  return true;
}

export function revealedWords(state) {
  if (!state?.spot?.words || !Array.isArray(state.revealed)) return [];
  return state.spot.words.map((word) => word.key).filter((key) => state.revealed.includes(key));
}

function hasSpeechMethod(speech, method) {
  try {
    return typeof speech?.[method] === 'function';
  } catch {
    return false;
  }
}

function voicesFrom(speech) {
  if (!hasSpeechMethod(speech, 'speak') || !hasSpeechMethod(speech, 'getVoices')) return [];
  try {
    const voices = speech.getVoices();
    return Array.isArray(voices) ? voices : [];
  } catch {
    return [];
  }
}

function voiceLanguage(voice) {
  return String(voice?.lang || '').replace('_', '-').toLowerCase();
}

function englishVoice(speech) {
  const voices = voicesFrom(speech);
  return voices.find((voice) => voiceLanguage(voice) === 'en-gb')
    || voices.find((voice) => voiceLanguage(voice).startsWith('en'))
    || null;
}

function setButtonSize(button) {
  button.style.minWidth = '44px';
  button.style.minHeight = '44px';
}

// Entradas estruturalmente inválidas retornam null antes de criar DOM ou listeners.
export function createWords({
  container,
  lang: language = 'pt',
  spot,
  strings,
  onDone,
  onClose,
  reduceMotion,
  speech = globalThis.speechSynthesis,
} = {}) {
  if (!container || typeof container.appendChild !== 'function' || typeof container.removeChild !== 'function') {
    return null;
  }
  if (spotValidationError(spot)) return null;
  const listeningForVoices = hasSpeechMethod(speech, 'addEventListener');
  const canRemoveVoiceListener = hasSpeechMethod(speech, 'removeEventListener');
  const instanceId = nextWordsInstanceId;
  nextWordsInstanceId += 1;
  const activeLanguage = languageOrDefault(language);
  const state = createWordsState(spot);
  const calm = reduceMotion ?? shouldReduceMotion();
  const text = (key) => resolveText(strings, key, activeLanguage);
  const wordText = (key) => glossTranslation(key, activeLanguage);
  let destroyed = false;
  let completed = false;
  let speechStarted = false;

  const root = document.createElement('section');
  root.className = `rpg-words-root${calm ? ' rpg-words-calm' : ''}`;
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', formatText(text('panelTitle'), { place: translation(spot.title, activeLanguage) }));

  const heading = document.createElement('h3');
  heading.className = 'rpg-words-title';
  heading.setAttribute('lang', activeLanguage);
  heading.textContent = `${spot.emoji} ${formatText(text('panelTitle'), { place: translation(spot.title, activeLanguage) })}`;

  const instructions = document.createElement('p');
  instructions.className = 'rpg-words-instructions';
  instructions.setAttribute('lang', activeLanguage);
  instructions.textContent = text('instructions');

  const list = document.createElement('div');
  list.className = 'rpg-words-list';
  list.setAttribute('role', 'list');

  const feedback = document.createElement('p');
  feedback.className = 'rpg-words-feedback';
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  feedback.setAttribute('lang', activeLanguage);

  const actions = document.createElement('div');
  actions.className = 'rpg-words-actions';

  const save = document.createElement('button');
  save.type = 'button';
  save.className = 'rpg-button rpg-words-save';
  save.textContent = text('save');
  save.setAttribute('aria-label', text('save'));
  save.disabled = true;
  setButtonSize(save);

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'rpg-button rpg-words-close';
  close.disabled = false;
  close.textContent = text('close');
  close.setAttribute('aria-label', text('close'));
  setButtonSize(close);

  const cards = [];

  function clearFeedback() {
    while (feedback.children.length) feedback.removeChild(feedback.children[0]);
  }

  function setOpenedFeedback(key) {
    clearFeedback();
    const prefix = document.createElement('span');
    prefix.textContent = `${text('openedBefore')} `;
    const word = document.createElement('span');
    word.className = 'rpg-words-feedback-word';
    word.setAttribute('lang', 'en');
    word.textContent = key;
    const meaning = document.createElement('span');
    meaning.className = 'rpg-words-feedback-translation';
    meaning.setAttribute('lang', activeLanguage);
    meaning.textContent = formatText(text('openedAfter'), { translation: wordText(key) });
    feedback.appendChild(prefix);
    feedback.appendChild(word);
    feedback.appendChild(meaning);
  }

  function reveal(card) {
    if (destroyed || completed || !card) return false;
    const changed = revealWord(state, card.key);
    card.translation.hidden = false;
    card.button.setAttribute('aria-expanded', 'true');
    card.button.setAttribute('aria-describedby', card.translationId);
    card.root.classList.add('rpg-words-revealed');
    setOpenedFeedback(card.key);
    save.disabled = revealedWords(state).length === 0;
    return changed;
  }

  function voiceAvailable() {
    return Boolean(englishVoice(speech));
  }

  function updateVoiceButtons() {
    const available = voiceAvailable();
    for (const card of cards) {
      card.listen.hidden = !available;
      card.listen.disabled = !available;
    }
  }

  function speak(key) {
    if (destroyed || completed || !voiceAvailable()) return false;
    const utteranceType = globalThis.SpeechSynthesisUtterance;
    const utterance = typeof utteranceType === 'function' ? new utteranceType(key) : { text: key };
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    const voice = englishVoice(speech);
    if (voice) utterance.voice = voice;
    try {
      speech.cancel?.();
      speech.speak(utterance);
      speechStarted = true;
      return true;
    } catch {
      return false;
    }
  }

  for (const [index, word] of spot.words.entries()) {
    const cardRoot = document.createElement('article');
    cardRoot.className = 'rpg-words-card';
    cardRoot.setAttribute('role', 'listitem');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rpg-button rpg-words-word';
    button.dataset.word = word.key;
    button.setAttribute('aria-expanded', 'false');
    setButtonSize(button);

    const emoji = document.createElement('span');
    emoji.className = 'rpg-words-emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = word.emoji;

    const english = document.createElement('span');
    english.className = 'rpg-words-english';
    english.setAttribute('lang', 'en');
    english.textContent = word.key;

    const translationId = `rpg-words-translation-${spot.id}-${instanceId}-${index}`;
    const meaning = document.createElement('p');
    meaning.className = 'rpg-words-translation';
    meaning.id = translationId;
    meaning.setAttribute('lang', activeLanguage);
    meaning.textContent = wordText(word.key);
    meaning.hidden = true;

    const listen = document.createElement('button');
    listen.type = 'button';
    listen.className = 'rpg-button rpg-words-listen';
    listen.textContent = text('listen');
    listen.setAttribute('aria-label', `${text('listen')}: ${word.key}`);
    setButtonSize(listen);

    button.appendChild(emoji);
    button.appendChild(english);
    cardRoot.appendChild(button);
    cardRoot.appendChild(meaning);
    cardRoot.appendChild(listen);
    list.appendChild(cardRoot);

    const revealHandler = () => reveal({ key: word.key, root: cardRoot, button, translation: meaning, translationId });
    const speakHandler = () => speak(word.key);
    button.addEventListener('click', revealHandler);
    listen.addEventListener('click', speakHandler);
    cards.push({ key: word.key, root: cardRoot, button, translation: meaning, translationId, listen, revealHandler, speakHandler });
  }

  function complete() {
    if (destroyed || completed) return;
    completed = true;
    for (const card of cards) {
      card.button.disabled = true;
      card.listen.disabled = true;
    }
    save.disabled = true;
    clearFeedback();
    let saved;
    try {
      saved = typeof onDone === 'function' ? onDone({ words: revealedWords(state) }) : undefined;
    } catch {
      // A falha pertence ao host; a criança recebe recuperação pelo fechamento.
      feedback.textContent = text('saveError');
      return;
    }
    feedback.textContent = text(saved === 0 || saved === false ? 'noneSaved' : 'saved');
  }

  function closePanel() {
    if (destroyed) return;
    if (typeof onClose === 'function') {
      onClose();
      return;
    }
    destroy();
  }

  const saveHandler = () => complete();
  const closeHandler = () => closePanel();
  save.addEventListener('click', saveHandler);
  close.addEventListener('click', closeHandler);

  function detachDomListeners() {
    for (const card of cards) {
      card.button.removeEventListener('click', card.revealHandler);
      card.listen.removeEventListener('click', card.speakHandler);
    }
    save.removeEventListener('click', saveHandler);
    close.removeEventListener('click', closeHandler);
  }

  const voicesChanged = () => {
    if (!destroyed) updateVoiceButtons();
  };
  if (listeningForVoices) {
    try {
      speech.addEventListener('voiceschanged', voicesChanged);
    } catch {
      destroyed = true;
      if (canRemoveVoiceListener) {
        try {
          speech.removeEventListener('voiceschanged', voicesChanged);
        } catch {
          // Um speech que também falha ao limpar não impede a recusa do painel.
        }
      }
      detachDomListeners();
      try {
        container.removeChild(root);
      } catch {
        // A raiz ainda não foi inserida; removê-la é apenas uma etapa defensiva.
      }
      return null;
    }
  }

  actions.appendChild(save);
  actions.appendChild(close);
  root.appendChild(heading);
  root.appendChild(instructions);
  root.appendChild(list);
  root.appendChild(feedback);
  root.appendChild(actions);
  container.appendChild(root);
  updateVoiceButtons();
  cards[0]?.button.focus?.();

  function getState() {
    return { spot: state.spot, words: revealedWords(state), done: completed };
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    detachDomListeners();
    if (listeningForVoices && canRemoveVoiceListener) {
      try {
        speech.removeEventListener('voiceschanged', voicesChanged);
      } catch {
        // Uma falha ao remover o listener não impede a remoção do painel.
      }
    }
    if (speechStarted) {
      try {
        speech?.cancel?.();
      } catch {
        // Uma falha ao cancelar não deve impedir a remoção do painel.
      }
    }
    try {
      container.removeChild(root);
    } catch {
      // O host pode ter removido o modal inteiro antes de destroy().
    }
  }

  return { destroy, getState, reveal: (key) => reveal(cards.find((card) => card.key === key)) };
}
