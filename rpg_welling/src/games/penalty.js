// Pênaltis do Welling FC — minigame de futebol para aprender palavras em inglês.
// A lógica de partida é pura e determinística; esta módulo não conhece main.js
// nem three.js. O host cria o container do modal e chama createPenalty().

import { shouldReduceMotion } from '../a11y.js';

export const ZONES = ['left', 'center', 'right'];
export const DEFAULT_KICKS = 5;
export const FOOTBALL_WORDS = ['goal', 'kick', 'ball', 'save', 'penalty', 'pitch'];

const LANGUAGES = ['pt', 'en', 'es'];
const DEFAULT_TIMING = { feedbackMs: 900 };

// Textos da interface. As traduções das palavras de futebol também moram aqui:
// a palavra aprendida continua sempre em inglês, enquanto a tradução segue o
// idioma escolhido para a interface.
export const DEFAULT_STRINGS = {
  title: {
    pt: '⚽ Pênaltis do Welling FC',
    en: '⚽ Welling FC Penalties',
    es: '⚽ Penaltis del Welling FC',
  },
  score: {
    pt: 'Gols: {goals}/{kicks}',
    en: 'Goals: {goals}/{kicks}',
    es: 'Goles: {goals}/{kicks}',
  },
  kick: {
    pt: 'Cobrança {current} de {kicks}',
    en: 'Kick {current} of {kicks}',
    es: 'Tiro {current} de {kicks}',
  },
  choose: {
    pt: 'Onde você vai chutar?',
    en: 'Where will you kick?',
    es: '¿Dónde vas a chutar?',
  },
  left: { pt: 'Esquerda', en: 'Left', es: 'Izquierda' },
  center: { pt: 'Centro', en: 'Center', es: 'Centro' },
  right: { pt: 'Direita', en: 'Right', es: 'Derecha' },
  goal: { pt: '⚽ GOOOL!', en: '⚽ GOOOOL!', es: '⚽ ¡GOOOOL!' },
  save: { pt: '🧤 Defendeu!', en: '🧤 Saved!', es: '🧤 ¡Paró!' },
  word: { pt: 'Palavra: {english} = {translation}', en: 'Word: {english} = {translation}', es: 'Palabra: {english} = {translation}' },
  final: { pt: 'Fim da partida!', en: 'Match finished!', es: '¡Fin del partido!' },
  encouragement: { pt: 'Você jogou muito bem!', en: 'You played very well!', es: '¡Jugaste muy bien!' },
  stars: { pt: 'Estrelas: {n}', en: 'Stars: {n}', es: 'Estrellas: {n}' },
  playAgain: { pt: 'Jogar de novo', en: 'Play again', es: 'Jugar otra vez' },
  words: { pt: 'Palavras: {list}', en: 'Words: {list}', es: 'Palabras: {list}' },
  goalBallAria: { pt: 'Gols marcados: {n}', en: 'Goals scored: {n}', es: 'Goles marcados: {n}' },
  saveBallAria: { pt: 'Defesas: {n}', en: 'Saves: {n}', es: 'Paradas: {n}' },
  pendingBallAria: { pt: 'Cobrança {n}', en: 'Kick {n}', es: 'Tiro {n}' },
  wordTranslations: {
    goal: { pt: 'gol', en: 'goal', es: 'gol' },
    kick: { pt: 'chute', en: 'kick', es: 'tiro' },
    ball: { pt: 'bola', en: 'ball', es: 'pelota' },
    save: { pt: 'defesa', en: 'save', es: 'parada' },
    penalty: { pt: 'pênalti', en: 'penalty', es: 'penalti' },
    pitch: { pt: 'campo', en: 'pitch', es: 'campo' },
  },
};

function languageOrDefault(language) {
  return LANGUAGES.includes(language) ? language : 'pt';
}

function isZone(value) {
  return ZONES.includes(value);
}

function assertZone(value, label) {
  if (!isZone(value)) {
    throw new TypeError(`${label} must be one of: ${ZONES.join(', ')}`);
  }
}

function assertState(state) {
  if (!state || !Array.isArray(state.aims) || !Array.isArray(state.dives) || !Array.isArray(state.words)) {
    throw new TypeError('applyKick requires a state created by createGameState');
  }
  if (!Number.isInteger(state.kicks) || state.kicks < 1) {
    throw new RangeError('applyKick requires kicks to be an integer >= 1');
  }
  if (!Number.isInteger(state.index) || state.index < 0 || state.index > state.kicks) {
    throw new RangeError('applyKick requires index to be an integer between 0 and kicks');
  }
  if (!Number.isInteger(state.goals) || state.goals < 0 || state.goals > state.index) {
    throw new RangeError('applyKick requires goals to be an integer between 0 and index');
  }
  if (typeof state.done !== 'boolean' || state.done !== (state.index === state.kicks)) {
    throw new RangeError('applyKick requires done to match whether index reached kicks');
  }
  if (state.aims.length !== state.index || state.dives.length !== state.index || state.words.length !== state.index) {
    throw new RangeError('applyKick requires aims, dives, and words to match index');
  }
  for (const [name, values] of [['aims', state.aims], ['dives', state.dives]]) {
    if (!values.every(isZone)) throw new TypeError(`applyKick requires ${name} to contain valid zones`);
  }
  if (!state.words.every((word) => FOOTBALL_WORDS.includes(word))) {
    throw new TypeError('applyKick requires words to contain valid football words');
  }
  if (!state.words.every((word, index) => word === FOOTBALL_WORDS[index % FOOTBALL_WORDS.length])) {
    throw new RangeError('applyKick requires words to follow the nextWord cycle');
  }
  if (Object.isFrozen(state)
    || [state.aims, state.dives, state.words].some((values) => Object.isFrozen(values) || Object.isSealed(values))) {
    throw new TypeError('applyKick requires mutable state arrays');
  }
  const expectedGoals = state.aims.reduce((count, value, index) => count + Number(value !== state.dives[index]), 0);
  if (state.goals !== expectedGoals) {
    throw new RangeError('applyKick requires goals to match aims and dives');
  }
}

function format(template, vars) {
  return Object.entries(vars).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    String(template ?? ''),
  );
}

function resolveTranslation(value, active, fallback) {
  if (typeof value === 'string' && value) return value;
  if (value && typeof value === 'object') {
    for (const language of [active, 'pt', 'en']) {
      const override = value[language];
      if (typeof override === 'string' && override) return override;
    }
  }
  if (typeof fallback === 'string' && fallback) return fallback;
  for (const language of [active, 'pt', 'en']) {
    if (typeof fallback?.[language] === 'string' && fallback[language]) return fallback[language];
  }
  return '';
}

// Aceita o formato de memory.js (chave -> {pt,en,es}) e também um override de
// texto fixo. A última opção, útil para o host, é strings[lang].
export function resolveText(strings, key, language = 'pt') {
  const active = languageOrDefault(language);
  const supplied = strings?.[active] && typeof strings[active] === 'object' ? strings[active] : strings;
  return resolveTranslation(supplied?.[key], active, DEFAULT_STRINGS[key]);
}

function wordTranslation(strings, word, language) {
  const active = languageOrDefault(language);
  const supplied = strings?.[active] && typeof strings[active] === 'object' ? strings[active] : strings;
  const override = supplied?.words?.[word] ?? supplied?.wordTranslations?.[word];
  return resolveTranslation(override, active, DEFAULT_STRINGS.wordTranslations[word]);
}

function normalizeRng(rng) {
  if (typeof rng !== 'function') throw new TypeError('rng must be a function');
  return rng;
}

function assertRngValue(value) {
  if (!Number.isFinite(value)) throw new TypeError('rng must return a finite number');
  if (value < 0 || value >= 1) throw new RangeError('rng must return a number in [0, 1)');
  return value;
}

function sampleRng(rng) {
  normalizeRng(rng);
  return assertRngValue(rng());
}

// A primeira amostra fica em cache para não mudar a sequência entregue ao jogo.
function validatedRng(rng) {
  let pending = sampleRng(rng);
  return () => {
    if (pending !== undefined) {
      const value = pending;
      pending = undefined;
      return value;
    }
    return assertRngValue(rng());
  };
}

export function keeperDive(rng = Math.random) {
  normalizeRng(rng);
  const value = assertRngValue(rng());
  // O clamp cobre arredondamento de ponto flutuante no limite superior.
  const index = Math.min(ZONES.length - 1, Math.floor(value * ZONES.length));
  return ZONES[index];
}

export function resolveKick({ aim, dive } = {}) {
  assertZone(aim, 'aim');
  assertZone(dive, 'dive');
  return { goal: aim !== dive };
}

export function createGameState({ kicks = DEFAULT_KICKS, rng = Math.random } = {}) {
  if (!Number.isInteger(kicks) || kicks < 1) throw new TypeError('kicks must be an integer >= 1');
  sampleRng(rng);
  return {
    kicks,
    index: 0,
    goals: 0,
    aims: [],
    dives: [],
    words: [],
    done: false,
    stars: 1,
  };
}

export function isGameComplete(state) {
  return Boolean(state?.done) || Number(state?.index) >= Number(state?.kicks);
}

export function starsFor(goals) {
  if (Number(goals) >= 3) return 3;
  if (Number(goals) === 2) return 2;
  return 1;
}

// O estado só guarda as palavras já usadas. Assim a função é pura, e a posição
// no ciclo é sempre o tamanho da lista, inclusive quando a partida é reiniciada.
export function nextWord(state) {
  if (!state || !Array.isArray(state.words)) throw new TypeError('nextWord requires a state created by createGameState');
  return FOOTBALL_WORDS[state.words.length % FOOTBALL_WORDS.length];
}

export function applyKick(state, aim, rng = Math.random) {
  assertState(state);
  assertZone(aim, 'aim');
  if (state.done || state.index >= state.kicks) throw new TypeError('cannot apply a kick after the match is complete');
  const dive = keeperDive(rng);
  const result = resolveKick({ aim, dive });
  const word = nextWord(state);
  state.aims.push(aim);
  state.dives.push(dive);
  state.words.push(word);
  state.index += 1;
  if (result.goal) state.goals += 1;
  if (state.index >= state.kicks) state.done = true;
  state.stars = starsFor(state.goals);
  return { ...result, aim, dive, word };
}

export function createPenalty({
  container,
  lang = 'pt',
  strings,
  onDone,
  rng = Math.random,
  kicks = DEFAULT_KICKS,
  timing,
  reduceMotion,
} = {}) {
  if (!container || typeof container.appendChild !== 'function') {
    throw new TypeError('createPenalty requires a container element');
  }
  const gameRng = validatedRng(rng);
  const language = languageOrDefault(lang);
  const pace = { ...DEFAULT_TIMING, ...(timing || {}) };
  const calm = reduceMotion ?? shouldReduceMotion();
  let state = createGameState({ kicks, rng: gameRng });
  let selected = 'center';
  let destroyed = false;
  let completionTimer = null;

  const text = (key) => resolveText(strings, key, language);
  const wordsText = (word) => wordTranslation(strings, word, language);

  const root = document.createElement('section');
  root.className = `rpg-penalty-root${calm ? ' rpg-penalty-calm' : ''}`;
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', text('title'));

  const title = document.createElement('h3');
  title.className = 'rpg-penalty-title';
  const score = document.createElement('p');
  score.className = 'rpg-penalty-score';
  const progress = document.createElement('p');
  progress.className = 'rpg-penalty-progress';
  progress.setAttribute('aria-label', text('score'));
  const kickLabel = document.createElement('p');
  kickLabel.className = 'rpg-penalty-kick-label';
  const prompt = document.createElement('p');
  prompt.className = 'rpg-penalty-prompt';
  const feedback = document.createElement('p');
  feedback.className = 'rpg-penalty-feedback';
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  const word = document.createElement('p');
  word.className = 'rpg-penalty-word';
  word.setAttribute('lang', language);
  const zones = document.createElement('div');
  zones.className = 'rpg-penalty-zones';
  zones.setAttribute('role', 'group');
  const final = document.createElement('div');
  final.className = 'rpg-penalty-final';
  final.hidden = true;
  const finalScore = document.createElement('p');
  finalScore.className = 'rpg-penalty-final-score';
  const finalStars = document.createElement('p');
  finalStars.className = 'rpg-penalty-stars';
  const encouragement = document.createElement('p');
  encouragement.className = 'rpg-penalty-encouragement';
  const words = document.createElement('p');
  words.className = 'rpg-penalty-words';
  const restart = document.createElement('button');
  restart.type = 'button';
  restart.className = 'rpg-button rpg-penalty-restart';
  restart.textContent = text('playAgain');
  restart.setAttribute('aria-label', text('playAgain'));
  const confetti = document.createElement('div');
  confetti.className = 'rpg-penalty-confetti';
  confetti.setAttribute('aria-hidden', 'true');

  const zoneButtons = new Map();
  for (const zone of ZONES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'rpg-button rpg-penalty-zone';
    button.dataset.zone = zone;
    button.style.minWidth = '48px';
    button.style.minHeight = '48px';
    button.setAttribute('aria-label', text(zone));
    button.textContent = text(zone);
    const handler = () => kick(zone);
    button.addEventListener('click', handler);
    zones.appendChild(button);
    zoneButtons.set(zone, { button, handler });
  }

  const restartHandler = () => restartGame();
  restart.addEventListener('click', restartHandler);
  final.appendChild(finalScore);
  final.appendChild(finalStars);
  final.appendChild(encouragement);
  final.appendChild(words);
  final.appendChild(restart);
  root.appendChild(title);
  root.appendChild(score);
  root.appendChild(progress);
  root.appendChild(kickLabel);
  root.appendChild(prompt);
  root.appendChild(feedback);
  root.appendChild(word);
  root.appendChild(zones);
  root.appendChild(final);
  root.appendChild(confetti);
  container.appendChild(root);

  const onKeyDown = (event) => {
    if (destroyed || isGameComplete(state)) return;
    const key = event?.key;
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      event?.preventDefault?.();
      const direction = key === 'ArrowLeft' ? -1 : 1;
      const index = ZONES.indexOf(selected);
      selected = ZONES[(index + direction + ZONES.length) % ZONES.length];
      updateSelection();
    } else if (key === 'Enter' || key === ' ') {
      event?.preventDefault?.();
      kick(selected);
    }
  };
  root.addEventListener('keydown', onKeyDown);

  function updateSelection() {
    for (const [zone, { button }] of zoneButtons) {
      button.classList.toggle('rpg-penalty-selected', zone === selected);
      button.setAttribute('aria-pressed', zone === selected ? 'true' : 'false');
    }
  }

  function clearConfetti() {
    while (confetti.children.length) confetti.removeChild(confetti.children[0]);
  }

  function showConfetti() {
    clearConfetti();
    // A classe é o gancho visual para o CSS do host. Em movimento reduzido a
    // raiz fica estática e o confete é removido imediatamente.
    if (calm) return;
    for (let index = 0; index < 10; index += 1) {
      const piece = document.createElement('span');
      piece.className = 'rpg-penalty-confetti-piece';
      piece.setAttribute('aria-hidden', 'true');
      piece.textContent = index % 2 ? '●' : '✦';
      piece.style.setProperty?.(`--i`, String(index));
      confetti.appendChild(piece);
    }
    if (completionTimer) clearTimeout(completionTimer);
    completionTimer = setTimeout(clearConfetti, Math.max(0, pace.feedbackMs));
  }

  function renderProgress() {
    while (progress.children.length) progress.removeChild(progress.children[0]);
    for (let index = 0; index < state.kicks; index += 1) {
      const icon = document.createElement('span');
      icon.className = 'rpg-penalty-ball';
      icon.textContent = '⚽';
      icon.dataset.kick = String(index + 1);
      const resultIndex = index;
      if (resultIndex < state.index) {
        const goal = state.aims[resultIndex] !== state.dives[resultIndex];
        icon.textContent = goal ? '⚽✅' : '⚽🧤';
        icon.classList.add(goal ? 'rpg-penalty-goal' : 'rpg-penalty-save');
        icon.setAttribute('aria-label', format(goal ? text('goalBallAria') : text('saveBallAria'), { n: resultIndex + 1 }));
      } else {
        icon.setAttribute('aria-label', format(text('pendingBallAria'), { n: index + 1 }));
      }
      progress.appendChild(icon);
    }
  }

  function renderWord() {
    while (word.children.length) word.removeChild(word.children[0]);
    if (!state.words.length) return;
    const last = state.words[state.words.length - 1];
    const template = String(text('word'));
    const englishMarker = '{english}';
    const translationMarker = '{translation}';
    const englishIndex = template.indexOf(englishMarker);
    const afterEnglish = englishIndex >= 0 ? template.slice(englishIndex + englishMarker.length) : '';
    const translationIndex = afterEnglish.indexOf(translationMarker);
    const before = englishIndex >= 0 ? template.slice(0, englishIndex) : template;
    const between = translationIndex >= 0 ? afterEnglish.slice(0, translationIndex) : (englishIndex >= 0 ? ' = ' : '');
    const after = translationIndex >= 0 ? afterEnglish.slice(translationIndex + translationMarker.length) : '';
    const label = document.createElement('span');
    label.className = 'rpg-penalty-word-label';
    label.textContent = before;
    const english = document.createElement('span');
    english.className = 'rpg-penalty-word-english';
    english.setAttribute('lang', 'en');
    english.textContent = last;
    const separator = document.createElement('span');
    separator.className = 'rpg-penalty-word-separator';
    separator.textContent = between;
    const translation = document.createElement('span');
    translation.className = 'rpg-penalty-word-translation';
    translation.setAttribute('lang', language);
    translation.textContent = wordsText(last);
    const suffix = document.createElement('span');
    suffix.className = 'rpg-penalty-word-suffix';
    suffix.textContent = after;
    word.appendChild(label);
    word.appendChild(english);
    word.appendChild(separator);
    word.appendChild(translation);
    word.appendChild(suffix);
  }

  function render() {
    title.textContent = text('title');
    score.textContent = format(text('score'), { goals: state.goals, kicks: state.kicks });
    kickLabel.textContent = format(text('kick'), { current: Math.min(state.index + 1, state.kicks), kicks: state.kicks });
    prompt.textContent = isGameComplete(state) ? '' : text('choose');
    renderProgress();
    renderWord();
    const finished = isGameComplete(state);
    final.hidden = !finished;
    zones.hidden = finished;
    zones.style.display = finished ? 'none' : '';
    kickLabel.hidden = finished;
    kickLabel.style.display = finished ? 'none' : '';
    for (const { button } of zoneButtons.values()) button.disabled = finished;
    if (finished) {
      finalScore.textContent = format(text('score'), { goals: state.goals, kicks: state.kicks });
      finalStars.textContent = format(text('stars'), { n: state.stars });
      encouragement.textContent = text('encouragement');
      const list = state.words.map((item) => `${item} = ${wordsText(item)}`).join(', ');
      words.textContent = format(text('words'), { list });
    }
    updateSelection();
  }

  function celebrate(result) {
    feedback.textContent = result.goal ? text('goal') : text('save');
    root.classList.toggle('rpg-penalty-celebrate', result.goal);
    showConfetti();
  }

  function kick(aim) {
    if (destroyed || isGameComplete(state)) return null;
    const result = applyKick(state, aim, gameRng);
    render();
    celebrate(result);
    if (isGameComplete(state)) {
      const report = { goals: state.goals, kicks: state.kicks, stars: state.stars, words: [...state.words] };
      if (typeof onDone === 'function') onDone(report);
    }
    selected = 'center';
    updateSelection();
    return result;
  }

  function restartGame() {
    if (destroyed) return;
    if (completionTimer) {
      clearTimeout(completionTimer);
      completionTimer = null;
    }
    state = createGameState({ kicks, rng: gameRng });
    selected = 'center';
    feedback.textContent = '';
    root.classList.remove('rpg-penalty-celebrate');
    clearConfetti();
    render();
  }

  function stateSnapshot() {
    return {
      kicks: state.kicks,
      index: state.index,
      goals: state.goals,
      aims: [...state.aims],
      dives: [...state.dives],
      words: [...state.words],
      done: state.done,
      stars: state.stars,
    };
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    if (completionTimer) clearTimeout(completionTimer);
    completionTimer = null;
    for (const { button, handler } of zoneButtons.values()) button.removeEventListener('click', handler);
    restart.removeEventListener('click', restartHandler);
    root.removeEventListener('keydown', onKeyDown);
    try {
      container.removeChild(root);
    } catch {
      // O host pode ter removido o modal inteiro antes de destroy().
    }
  }

  render();
  return { destroy, state: stateSnapshot, kick };
}
