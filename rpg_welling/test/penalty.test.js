// Testes do minigame Pênaltis do Welling FC.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installDomStub } from './helpers/dom-stub.js';
import {
  DEFAULT_KICKS,
  DEFAULT_STRINGS,
  FOOTBALL_WORDS,
  ZONES,
  applyKick,
  createGameState,
  createPenalty,
  isGameComplete,
  keeperDive,
  nextWord,
  resolveKick,
  resolveText,
  starsFor,
} from '../src/games/penalty.js';

function lcg(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

test('keeperDive sempre devolve uma das três zonas e é determinístico com LCG', () => {
  assert.deepEqual(ZONES, ['left', 'center', 'right']);
  const first = keeperDive(lcg(7));
  const second = keeperDive(lcg(7));
  assert.equal(first, second);
  assert.ok(ZONES.includes(first));
  for (const seed of [1, 2, 3, 4, 5, 99]) {
    assert.ok(ZONES.includes(keeperDive(lcg(seed))));
  }
});

test('resolveKick: zona diferente é gol e a mesma zona é defesa', () => {
  assert.deepEqual(resolveKick({ aim: 'left', dive: 'right' }), { goal: true });
  assert.deepEqual(resolveKick({ aim: 'center', dive: 'center' }), { goal: false });
  assert.throws(() => resolveKick({ aim: 'up', dive: 'left' }), TypeError);
  assert.throws(() => resolveKick({ aim: 'left', dive: 'nowhere' }), TypeError);
});

test('applyKick completa exatamente kicks cobranças e conta os gols', () => {
  const state = createGameState({ kicks: 5, rng: lcg(4) });
  // Uma cópia do LCG compara cada resultado com resolveKick.
  const predictionRng = lcg(4);
  const expectedDives = Array.from({ length: 5 }, () => keeperDive(predictionRng));
  const rng = lcg(4);
  assert.equal(state.index, 0);
  for (const aim of ['left', 'left', 'left', 'left', 'left']) {
    const before = state.index;
    const dive = expectedDives[before];
    const result = applyKick(state, aim, rng);
    assert.equal(result.dive, dive);
    assert.equal(result.goal, resolveKick({ aim, dive }).goal);
    assert.equal(state.index, before + 1);
    assert.equal(isGameComplete(state), before === 4);
  }
  assert.equal(state.index, 5);
  assert.equal(state.aims.length, 5);
  assert.equal(state.dives.length, 5);
  assert.equal(state.words.length, 5);
  assert.equal(state.goals, state.aims.filter((aim, index) => aim !== state.dives[index]).length);
  assert.ok(expectedDives.length === 5);
});

test('starsFor nunca devolve zero: 0, 2, 3 e 5', () => {
  assert.equal(starsFor(0), 1);
  assert.equal(starsFor(2), 2);
  assert.equal(starsFor(3), 3);
  assert.equal(starsFor(5), 3);
});

test('nextWord cicla as seis palavras sem repetir antes do fim', () => {
  const state = createGameState({ kicks: 7, rng: lcg(1) });
  const seen = [];
  for (let index = 0; index < 7; index += 1) {
    const word = nextWord(state);
    assert.equal(word, FOOTBALL_WORDS[index % FOOTBALL_WORDS.length]);
    seen.push(word);
    state.words.push(word);
  }
  assert.deepEqual(seen.slice(0, 6), FOOTBALL_WORDS);
  assert.equal(seen[6], FOOTBALL_WORDS[0]);
});

test('createGameState aceita kicks customizado e rejeita valores inválidos', () => {
  const state = createGameState({ kicks: 3, rng: lcg(2) });
  assert.equal(state.kicks, 3);
  assert.equal(state.index, 0);
  assert.equal(state.goals, 0);
  assert.deepEqual(state.aims, []);
  assert.deepEqual(state.dives, []);
  assert.deepEqual(state.words, []);
  assert.equal(state.done, false);
  assert.equal(state.stars, 1);
  assert.throws(() => createGameState({ kicks: 0 }), TypeError);
  assert.throws(() => createGameState({ kicks: 1.5 }), TypeError);
  assert.throws(() => createGameState({ rng: 'not a function' }), TypeError);
});

test('entradas inválidas são rejeitadas com TypeError', () => {
  assert.throws(() => createPenalty(), TypeError);
  assert.throws(() => createPenalty({ container: {} }), TypeError);
  const state = createGameState({ kicks: 2, rng: lcg(3) });
  assert.throws(() => resolveKick({ aim: 'diagonal', dive: 'left' }), TypeError);
  assert.throws(() => resolveKick({ aim: 'left', dive: 'diagonal' }), TypeError);
  assert.throws(() => applyKick(state, 'diagonal', () => 0), TypeError);
  assert.throws(() => applyKick(state, 'left', 'not an rng'), TypeError);
});

test('smoke de render: monta, aceita chute, avança e chama onDone ao final', () => {
  installDomStub();
  const container = document.createElement('div');
  const reports = [];
  const game = createPenalty({
    container,
    lang: 'pt',
    kicks: 2,
    rng: () => 0,
    timing: { feedbackMs: 0 },
    reduceMotion: true,
    onDone: (report) => reports.push(report),
  });
  const root = container.children[0];
  const zones = root.children.find((child) => child.className === 'rpg-penalty-zones');
  const feedback = root.children.find((child) => child.className === 'rpg-penalty-feedback');
  const confetti = root.children.find((child) => child.className === 'rpg-penalty-confetti');
  assert.equal(feedback.getAttribute('role'), 'status');
  assert.equal(feedback.getAttribute('aria-live'), 'polite');
  assert.equal(zones.children.length, 3);
  assert.ok(zones.children.every((button) => button.tagName === 'BUTTON' && button.type === 'button'));
  assert.ok(zones.children.every((button) => button.style.minHeight === '48px'));
  assert.deepEqual(zones.children.map((button) => button.getAttribute('aria-pressed')), ['false', 'true', 'false']);
  assert.equal(root.className.includes('rpg-penalty-calm'), true);
  assert.equal(confetti.children.length, 0);
  assert.equal(game.state().index, 0);
  assert.equal(game.kick('right').dive, 'left');
  assert.equal(game.state().index, 1);
  assert.equal(game.state().goals, 1);
  assert.equal(confetti.children.length, 0);
  game.kick('left');
  assert.equal(reports.length, 1);
  assert.deepEqual(reports[0], { goals: 1, kicks: 2, stars: 1, words: ['goal', 'kick'] });
  assert.equal(game.state().done, true);
  game.destroy();
  assert.equal(container.children.length, 0);
  assert.equal(game.kick('center'), null);
});

test('troca de idioma altera textos e tradução da palavra; teclado escolhe a zona', () => {
  installDomStub();
  for (const [lang, expectedTitle, expectedTranslation] of [
    ['pt', '⚽ Pênaltis do Welling FC', 'gol'],
    ['en', '⚽ Welling FC Penalties', 'goal'],
    ['es', '⚽ Penaltis del Welling FC', 'gol'],
  ]) {
    const container = document.createElement('div');
    const game = createPenalty({ container, lang, kicks: 1, rng: () => 0, reduceMotion: true });
    const root = container.children[0];
    assert.equal(root.children[0].textContent, expectedTitle);
    game.kick('right');
    const word = root.children.find((child) => child.className === 'rpg-penalty-word');
    const wordText = word.children.map((child) => child.textContent).join('');
    assert.match(wordText, new RegExp(expectedTranslation));
    assert.match(wordText, /goal/);
    assert.equal(word.children.find((child) => child.className === 'rpg-penalty-word-english').getAttribute('lang'), 'en');
    assert.equal(word.children.find((child) => child.className === 'rpg-penalty-word-translation').getAttribute('lang'), lang);
    game.destroy();
  }

  const container = document.createElement('div');
  const game = createPenalty({ container, kicks: 1, rng: () => 0, reduceMotion: true });
  const root = container.children[0];
  // O stub não propaga keydown para os filhos; este caso cobre somente o handler da raiz.
  root.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
  root.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  assert.equal(game.state().aims[0], 'right');
  game.destroy();
});

test('sequência determinística de uma partida não tem sorteio escondido', () => {
  const state = createGameState({ kicks: 5, rng: lcg(19) });
  const aims = ['left', 'center', 'right', 'center', 'left'];
  const predictionRng = lcg(19);
  const predictions = aims.map((aim) => resolveKick({ aim, dive: keeperDive(predictionRng) }).goal);
  const actualRng = lcg(19);
  const actual = aims.map((aim) => applyKick(state, aim, actualRng).goal);
  assert.deepEqual(actual, predictions);
  assert.equal(state.done, true);
  assert.equal(state.words.length, 5);
});

test('textos padrão têm título, três idiomas e palavras siempre em inglês', () => {
  for (const language of ['pt', 'en', 'es']) {
    for (const key of ['title', 'score', 'choose', 'goal', 'save', 'playAgain']) {
      const value = DEFAULT_STRINGS[key]?.[language];
      assert.equal(typeof value, 'string');
      assert.ok(value.length > 0);
    }
    for (const word of FOOTBALL_WORDS) {
      assert.equal(typeof DEFAULT_STRINGS.wordTranslations[word].en, 'string');
      assert.ok(DEFAULT_STRINGS.wordTranslations[word][language].length > 0);
    }
  }
  assert.equal(DEFAULT_KICKS, 5);
});

test('traduções es do chute estão corretas e overrides incompletos não ficam vazios', () => {
  assert.equal(DEFAULT_STRINGS.wordTranslations.kick.es, 'tiro');
  assert.equal(resolveText({ title: { es: 'Título' } }, 'title', 'en'), DEFAULT_STRINGS.title.en);
  // pt continua sendo um fallback válido quando o idioma ativo não foi enviado.
  assert.equal(resolveText({ title: { pt: 'Título PT' } }, 'title', 'es'), 'Título PT');
  for (const invalid of ['', 42, {}]) {
    assert.equal(resolveText({ title: { es: invalid, pt: 'Válido em PT' } }, 'title', 'es'), 'Válido em PT');
  }
  installDomStub();
  for (const invalid of ['', 42, {}]) {
    const container = document.createElement('div');
    const game = createPenalty({
      container,
      lang: 'es',
      kicks: 2,
      rng: () => 0,
      reduceMotion: true,
      strings: { words: { kick: { es: invalid, pt: 'Chute PT' } } },
    });
    game.kick('right');
    game.kick('left');
    const word = container.children[0].children.find((child) => child.className === 'rpg-penalty-word');
    const translation = word.children.find((child) => child.className === 'rpg-penalty-word-translation');
    assert.equal(translation.textContent, 'Chute PT');
    game.destroy();
  }
  assert.equal(resolveText({ title: { es: 'Título' } }, 'title', 'en').length > 0, true);
});

test('keeperDive e a construção rejeitam resultados RNG fora de [0, 1) sem mutar', () => {
  installDomStub();
  for (const value of [NaN, Infinity, -0.1, 2]) {
    assert.throws(() => keeperDive(() => value), (error) => {
      assert.ok(error instanceof TypeError || error instanceof RangeError);
      assert.match(error.message, /rng must return/);
      return true;
    });
    assert.throws(() => createGameState({ rng: () => value }), /rng must return/);
    const container = document.createElement('div');
    assert.throws(() => createPenalty({ container, rng: () => value }), /rng must return/);
    assert.equal(container.children.length, 0);

    const state = createGameState({ kicks: 2, rng: () => 0.5 });
    const before = { ...state, aims: [...state.aims], dives: [...state.dives], words: [...state.words] };
    assert.throws(() => applyKick(state, 'left', () => value));
    assert.deepEqual(state, before);
  }
  assert.equal(keeperDive(() => 0), 'left');
  assert.equal(keeperDive(() => 0.9999999999999999), 'right');
});

test('createGameState e applyKick rejeitam kicks inválidos', () => {
  assert.throws(() => createGameState({ kicks: -1 }), TypeError);
  assert.throws(() => createGameState({ kicks: NaN }), TypeError);
  for (const kicks of [-1, NaN]) {
    const state = createGameState({ kicks: 2, rng: () => 0 });
    state.kicks = kicks;
    const before = { ...state, aims: [...state.aims], dives: [...state.dives], words: [...state.words] };
    assert.throws(() => applyKick(state, 'left', () => 0), (error) => {
      assert.match(error.message, /kicks/);
      return true;
    });
    assert.deepEqual(state, before);
  }
});

test('applyKick valida estado adulterado antes de mutar', () => {
  const state = createGameState({ kicks: 2, rng: () => 0.5 });
  applyKick(state, 'center', () => 0.5);
  const before = { ...state, aims: [...state.aims], dives: [...state.dives], words: [...state.words] };
  state.index = NaN;
  assert.throws(() => applyKick(state, 'left', () => 0), /index/);
  assert.equal(Number.isNaN(state.index), true);
  assert.equal(state.aims.length, 1);
  assert.equal(state.dives.length, 1);
  assert.equal(state.words.length, 1);
  assert.equal(state.goals, before.goals);

  state.index = 1;
  state.goals = 1;
  const beforeGoals = { ...state, aims: [...state.aims], dives: [...state.dives], words: [...state.words] };
  assert.throws(() => applyKick(state, 'left', () => 0), /goals/);
  assert.deepEqual(state, beforeGoals);
});

test('applyKick rejeita uma cobrança depois do fim sem mutar', () => {
  const state = createGameState({ kicks: 1, rng: () => 0 });
  applyKick(state, 'right', () => 0);
  const before = { ...state, aims: [...state.aims], dives: [...state.dives], words: [...state.words] };
  assert.throws(() => applyKick(state, 'left', () => 0), /after the match is complete/);
  assert.deepEqual(state, before);
});

test('applyKick cobre os principais estados adulterados sem mutação parcial', () => {
  const makeState = () => {
    const state = createGameState({ kicks: 2, rng: () => 0.5 });
    applyKick(state, 'center', () => 0.5);
    return state;
  };
  const cases = [
    ['done incoerente', (state) => { state.done = true; }, /done/],
    ['comprimento de array', (state) => { state.aims.pop(); }, /aims, dives/],
    ['zona inválida', (state) => { state.aims[0] = 'up'; }, /aims/],
    ['palavra desconhecida', (state) => { state.words[0] = 'unknown'; }, /words/],
    ['ciclo de palavras quebrado', (state) => { state.words[0] = 'kick'; }, /nextWord/],
    ['array congelado', (state) => { Object.freeze(state.words); }, /mutable/],
  ];
  for (const [name, corrupt, expectedError] of cases) {
    const state = makeState();
    corrupt(state);
    const before = { ...state, aims: [...state.aims], dives: [...state.dives], words: [...state.words] };
    assert.throws(() => applyKick(state, 'left', () => 0), expectedError, name);
    assert.deepEqual(state, before, name);
  }
});

test('os três botões de zona usam o handler real e onDone dispara uma vez', () => {
  installDomStub();
  const container = document.createElement('div');
  const reports = [];
  const game = createPenalty({
    container,
    kicks: 3,
    rng: () => 0,
    reduceMotion: true,
    onDone: (report) => reports.push(report),
  });
  const root = container.children[0];
  const zones = root.children.find((child) => child.className === 'rpg-penalty-zones');
  const kickLabel = root.children.find((child) => child.className === 'rpg-penalty-kick-label');
  for (const zone of ZONES) {
    const button = zones.children.find((child) => child.dataset.zone === zone);
    button.dispatchEvent({ type: 'click' });
  }
  assert.deepEqual(game.state().aims, ZONES);
  assert.equal(reports.length, 1);
  assert.equal(zones.hidden, true);
  assert.equal(zones.style.display, 'none');
  assert.equal(kickLabel.hidden, true);
  assert.equal(kickLabel.style.display, 'none');
  assert.ok(zones.children.every((button) => button.disabled));
  for (const zone of ZONES) {
    const button = zones.children.find((child) => child.dataset.zone === zone);
    button.dispatchEvent({ type: 'click' });
  }
  assert.equal(reports.length, 1);
  const final = root.children.find((child) => child.className === 'rpg-penalty-final');
  const restart = final.children.find((child) => child.className.includes('rpg-penalty-restart'));
  restart.dispatchEvent({ type: 'click' });
  assert.equal(game.state().index, 0);
  assert.equal(reports.length, 1);
  assert.equal(zones.hidden, false);
  assert.equal(zones.style.display, '');
  assert.equal(kickLabel.hidden, false);
  assert.equal(kickLabel.style.display, '');
  assert.ok(zones.children.every((button) => !button.disabled));
  zones.children[0].dispatchEvent({ type: 'click' });
  assert.equal(game.state().index, 1);
  assert.equal(reports.length, 1);
  game.destroy();
});

test('destroy cancela o timer e elimina listeners no meio da partida', () => {
  installDomStub();
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const pending = new Map();
  let nextTimer = 0;
  globalThis.setTimeout = (callback) => {
    const id = ++nextTimer;
    pending.set(id, callback);
    return id;
  };
  globalThis.clearTimeout = (id) => pending.delete(id);
  try {
    const container = document.createElement('div');
    const game = createPenalty({
      container,
      kicks: 3,
      rng: () => 0,
      reduceMotion: false,
      timing: { feedbackMs: 1000 },
    });
    const root = container.children[0];
    const zones = root.children.find((child) => child.className === 'rpg-penalty-zones');
    const confetti = root.children.find((child) => child.className === 'rpg-penalty-confetti');
    zones.children[0].dispatchEvent({ type: 'click' });
    assert.equal(pending.size, 1);
    assert.equal(root.className.includes('rpg-penalty-calm'), false);
    assert.equal(confetti.children.length, 10);
    const before = game.state();
    game.destroy();
    assert.equal(pending.size, 0);
    assert.equal(container.children.length, 0);
    zones.children[0].dispatchEvent({ type: 'click' });
    root.dispatchEvent({ type: 'keydown', key: 'Enter' });
    assert.deepEqual(game.state(), before);
  } finally {
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
});
