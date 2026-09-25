// Testes do minigame de ouvir e repetir.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { installDomStub } from './helpers/dom-stub.js';
import { GLOSSES } from '../src/content.js';
import {
  DEFAULT_STRINGS,
  LISTEN_SPOTS,
  createListen,
  getListenTarget,
  levenshteinDistance,
  normalizeSpeech,
  resolveText,
  similarity,
  starsFromSimilarity,
} from '../src/games/listen.js';

// Nó de DocumentFragment (nodeType 11). O navegador entrega o mesmo tipo: os
// FILHOS do fragmento entram no elemento, o fragmento fica vazio e nunca vira
// filho de ninguém. O stub local reproduz isso, porque o stub compartilhado
// (test/helpers/dom-stub.js) é usado por outros minigames e não pode mudar.
const FRAGMENT_NODE = 11;
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

function isFragment(node) {
  return Boolean(node) && node.nodeType === FRAGMENT_NODE;
}

// Esvazia o fragmento e devolve os filhos que precisam entrar no elemento.
function drainFragment(fragment) {
  const drained = [...fragment.children];
  fragment.children.length = 0;
  return drained;
}

function expandNodes(nodes) {
  return nodes.flatMap((node) => (isFragment(node) ? drainFragment(node) : [node]));
}

function installModernDom() {
  installDomStub();
  if (document.createDocumentFragment) return;
  const originalCreateElement = document.createElement;
  document.createElement = (tagName) => {
    const element = originalCreateElement(tagName);
    // O DOM real marca elementos com nodeType 1; o stub compartilhado nao marca.
    // Sem isso nao da para provar que os textos sao filhos DIRETOS e nao netos.
    element.nodeType = ELEMENT_NODE;
    // O navegador insere os filhos do fragmento e esvazia o fragmento, tanto
    // em replaceChildren quanto em appendChild.
    element.appendChild = (node) => {
      for (const child of expandNodes([node])) element.children.push(child);
      return node;
    };
    element.replaceChildren = (...nodes) => {
      element.children = expandNodes(nodes);
      element.textContent = element.children.map((node) => node?.textContent || '').join('');
    };
    return element;
  };
  document.createTextNode = (value) => ({
    nodeType: TEXT_NODE,
    children: [],
    textContent: String(value),
  });
  document.createDocumentFragment = () => ({
    nodeType: FRAGMENT_NODE,
    children: [],
    get textContent() {
      return this.children.map((node) => node?.textContent || '').join('');
    },
    appendChild(node) {
      this.children.push(node);
      return node;
    },
  });
}

function descendants(element) {
  return element.children.flatMap((child) => [child, ...descendants(child)]);
}

function byClass(element, className) {
  return descendants(element).find((child) => String(child.className || '').split(' ').includes(className));
}

function recognitionResult(transcript) {
  return {
    results: [{
      0: { transcript, confidence: 0.9 },
      isFinal: true,
      length: 1,
    }],
    resultIndex: 0,
  };
}

function makeRecognizer(onStart, options = {}) {
  const listeners = new Map();
  return {
    lang: '',
    started: 0,
    stopped: 0,
    aborted: 0,
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    removeEventListener(type, handler) {
      const handlersForType = listeners.get(type);
      handlersForType?.delete(handler);
      if (handlersForType?.size === 0) listeners.delete(type);
    },
    start() {
      this.started += 1;
      if (onStart) onStart(this);
    },
    stop() { this.stopped += 1; },
    abort() {
      this.aborted += 1;
      if (options.emitOnAbort) {
        this.emit('error', { error: 'aborted' });
        this.emit('end');
      }
    },
    listener(type) { return [...(listeners.get(type) || [])][0]; },
    emit(type, event) {
      for (const handler of [...(listeners.get(type) || [])]) handler(event);
    },
    listeners,
  };
}

function gameWithRecognizers(recognizers, options = {}) {
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    reduceMotion: true,
    target: { word: 'sun', gloss: 'sol' },
    onDone: (result) => reports.push(result),
    createRecognizer: () => {
      const recognizer = makeRecognizer();
      recognizers.push(recognizer);
      return recognizer;
    },
    ...options,
  });
  return { container, reports, game };
}

// Jogo sem Recognition injetada: o minigame abre direto na digitação.
function typedGame(options = {}) {
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    reduceMotion: true,
    target: { word: 'sun', gloss: 'sol' },
    onDone: (result) => reports.push(result),
    ...options,
  });
  return { container, reports, game, root: container.children[0] };
}

function makeTimerHarness() {
  let nextId = 1;
  const timers = new Map();
  return {
    setTimeout(callback, delay) {
      const id = nextId;
      nextId += 1;
      timers.set(id, { callback, delay });
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
    runAll() {
      while (timers.size) {
        const pending = [...timers.values()];
        timers.clear();
        for (const timer of pending) timer.callback();
      }
    },
    get size() {
      return timers.size;
    },
  };
}

test('a tabela oferece alvos curtos e únicos para as cinco zonas e três idiomas', () => {
  assert.deepEqual(LISTEN_SPOTS.map((spot) => spot.id), ['school', 'woods', 'highstreet', 'classroom', 'academy']);
  const words = LISTEN_SPOTS.flatMap((spot) => spot.targets.map((target) => target.word));

  assert.equal(words.length, 20);
  assert.equal(new Set(words).size, words.length);
  for (const spot of LISTEN_SPOTS) {
    assert.equal(spot.targets.length, 4, spot.id);
    for (const target of spot.targets) {
      assert.ok(target.word.length >= 3 && target.word.length <= 6, target.word);
      for (const language of ['pt', 'en', 'es']) {
        assert.ok(target.gloss[language].length > 0, `${target.word}/${language}`);
      }
    }
  }
  for (const forbidden of ['swing', 'run', 'jump', 'greenhouse', 'woods', 'meadow', 'path', 'pond', 'shop', 'market', 'bakery', 'bus', 'teacher', 'student', 'class', 'read', 'tower', 'wizard', 'magic', 'hero']) {
    assert.equal(words.includes(forbidden), false, forbidden);
  }

  assert.deepEqual(getListenTarget('school', 'pt', () => 0), { word: 'sun', gloss: 'sol' });
  assert.deepEqual(getListenTarget('school', 'es', () => 0.99), { word: 'duck', gloss: 'pato' });
  assert.equal(getListenTarget('unknown', 'en', () => 0), null);
});

test('a normalização ignora caixa, acento e pontuação', () => {
  assert.equal(normalizeSpeech('  RÁPIDO, mundo!  '), 'rapido mundo');
  assert.equal(normalizeSpeech('JÁ, VOCÊ!'), 'ja voce');
  assert.equal(normalizeSpeech("I don't know"), 'i dont know');
  assert.equal(normalizeSpeech('I don’t know'), 'i dont know');
  assert.equal(normalizeSpeech("can't"), 'cant');
  assert.equal(normalizeSpeech('...'), '');
  assert.equal(normalizeSpeech(null), '');
});

test('a distância e a similaridade medida passam pelos casos de fala', () => {
  assert.equal(levenshteinDistance('cat', 'cat'), 0);
  assert.equal(levenshteinDistance('cat', 'cot'), 1);
  assert.equal(similarity('sun', 'SUN!'), 1);
  assert.equal(similarity('árvore', 'arvore!'), 1);
  assert.equal(similarity('bird', 'bard'), 0.75);
  assert.equal(similarity('sun', 'moon'), 0.25);
  assert.equal(similarity('swing', 'the word is swing'), 1);
  assert.equal(similarity('swing', 'I say the word is swing'), 0.85);
  assert.equal(similarity('swing', 'swingg'), 0.8333333333333334);
  assert.equal(similarity('swing', 'the swing'), 0.85);
  assert.equal(similarity('swing', "I don't know swing"), 0.2);
  assert.equal(similarity('swing', 'I don’t know swing'), 0.2);
  assert.equal(similarity('swing', "I can't swing"), 0.2);
  assert.equal(similarity('swing', "I won't swing"), 0.2);
  assert.equal(similarity('swing', "it doesn't swing"), 0.2);
  assert.equal(similarity('swing', "it isn't swing"), 0.2);
  assert.equal(similarity('swing', 'I do not know swing'), 0.2);
  assert.equal(similarity('swing', 'it is not swing'), 0.2);
  assert.equal(similarity('swing', 'not swing'), 0.2);
  assert.equal(similarity('swing', 'ninguem swing'), 0.2);
  assert.equal(similarity('swing', 'I am unsure swing'), 0.2);
  assert.equal(similarity('swing', 'nao e swing'), 0.2);
  assert.equal(similarity('swing', 'eu nao sei swing'), 0.2);
  assert.equal(similarity('swing', 'não sei swing'), 0.2);
  assert.equal(similarity('swing', 'não é swing'), 0.2);
  assert.equal(similarity('swing', 'no conozco swing'), 0.2);
  assert.equal(similarity('swing', 'no es swing'), 0.2);
  assert.equal(similarity('swing', 'no se swing'), 0.2);
  assert.equal(similarity('swing', 'the word is swinging'), 0.25);
  assert.equal(similarity('ball', 'the word is bell'), 0.1875);
  assert.equal(similarity('ball', ''), 0);
});

test('a similaridade vira quatro niveis claros de estrelas', () => {
  assert.equal(starsFromSimilarity(1), 3);
  assert.equal(starsFromSimilarity(0.89), 2);
  assert.equal(starsFromSimilarity(0.5), 1);
  assert.equal(starsFromSimilarity(0), 0);
  assert.equal(starsFromSimilarity(2), 3);
  assert.equal(starsFromSimilarity(-1), 0);
});

test('DEFAULT_STRINGS cobre todas as chaves usadas nos tres idiomas', () => {
  const source = readFileSync(new URL('../src/games/listen.js', import.meta.url), 'utf8');
  const usedKeys = [...source.matchAll(/(?:text|renderFeedback)\([^;]*\)/g)]
    .flatMap((match) => [...match[0].matchAll(/'([^']+)'/g)].map((literal) => literal[1]));
  const uniqueUsedKeys = [...new Set(usedKeys)];
  assert.deepEqual(Object.keys(DEFAULT_STRINGS).sort(), uniqueUsedKeys.sort());
  for (const key of uniqueUsedKeys) {
    for (const language of ['pt', 'en', 'es']) {
      assert.equal(typeof DEFAULT_STRINGS[key][language], 'string', `${key}/${language}`);
      assert.ok(DEFAULT_STRINGS[key][language].length > 0, `${key}/${language}`);
      assert.equal(DEFAULT_STRINGS[key][language], resolveText(undefined, key, language));
    }
  }
  assert.equal('Ouvir agora', resolveText({ listen: { pt: 'Ouvir agora' } }, 'listen', 'pt'));
  assert.equal(resolveText({ listen: { pt: '' } }, 'listen', 'en'), DEFAULT_STRINGS.listen.en);
});

test('createListen retorna null para entradas invalidas sem criar DOM', () => {
  installModernDom();
  const container = document.createElement('div');
  const originalCreateElement = document.createElement;
  let created = 0;
  document.createElement = (tagName) => {
    created += 1;
    return originalCreateElement(tagName);
  };

  try {
    assert.equal(createListen(), null);
    assert.equal(createListen({ container: {}, target: { word: 'sun', gloss: 'sol' } }), null);
    assert.equal(createListen({ container }), null);
    assert.equal(createListen({ container, target: null }), null);
    assert.equal(createListen({ container, target: { word: 'sun' } }), null);
    assert.equal(createListen({ container, target: { word: 'sun', gloss: '' } }), null);
    assert.equal(container.children.length, 0);
    assert.equal(created, 0);
  } finally {
    document.createElement = originalCreateElement;
  }
});

test('a mensagem final exibe a glosa traduzida e o resultado usa o contrato', () => {
  installModernDom();
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    lang: 'pt',
    target: { word: 'moon', gloss: 'lua' },
    reduceMotion: true,
    onDone: (result) => reports.push(result),
  });
  const root = container.children[0];
  const input = byClass(root, 'rpg-listen-input');
  const repeat = byClass(root, 'rpg-listen-repeat');

  input.value = 'one';
  repeat.dispatchEvent({ type: 'click' });
  input.value = 'two';
  repeat.dispatchEvent({ type: 'click' });
  input.value = 'three';
  repeat.dispatchEvent({ type: 'click' });

  assert.deepEqual(reports, [{ attempts: 3, best: 0.25, stars: 0, heard: 'one', passed: false }]);
  const feedback = byClass(root, 'rpg-listen-feedback');
  assert.equal(feedback.textContent, 'Vamos ver juntos: moon significa lua.');
  const englishWord = descendants(feedback).find((element) => element.getAttribute?.('lang') === 'en');
  assert.equal(englishWord.textContent, 'moon');
  assert.equal(game.getState().done, true);
  game.destroy();
});

test('a fala correta fecha uma vez e frases de instrucao recebem pontuacao maxima', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'swing', gloss: 'balanco' } });
  const root = container.children[0];
  const repeat = byClass(root, 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  assert.equal(recognizers[0].started, 1);
  assert.equal(repeat.getAttribute('aria-pressed'), 'true');
  recognizers[0].emit('result', recognitionResult('the word is swing'));
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(repeat.getAttribute('aria-pressed'), 'false');
  assert.deepEqual(reports, [{ attempts: 1, best: 1, stars: 3, heard: 'the word is swing', passed: true }]);
  assert.equal(game.getState().done, true);
  assert.equal(repeat.disabled, true);
  game.destroy();
});

test('tres tentativas com melhor resultado param no terceiro resultado', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'bird', gloss: 'passaro' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  for (const said of ['zzzz', 'yyyy', 'bard']) {
    repeat.dispatchEvent({ type: 'click' });
    recognizers.at(-1).emit('result', recognitionResult(said));
  }
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(recognizers.length, 3);
  assert.deepEqual(reports, [{ attempts: 3, best: 0.75, stars: 2, heard: 'bard', passed: true }]);
  assert.equal(game.getState().attempts, 3);
  assert.equal(repeat.disabled, true);
  game.destroy();
});

test('tres tentativas sem palavra terminam sem passar e ignoram o quarto envio', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports } = gameWithRecognizers(recognizers, { target: { word: 'tree', gloss: 'arvore' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  for (const said of ['xxxx', 'yyyy', 'zzzz']) {
    repeat.dispatchEvent({ type: 'click' });
    recognizers.at(-1).emit('result', recognitionResult(said));
  }
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(recognizers.length, 3);
  assert.deepEqual(reports, [{ attempts: 3, best: 0, stars: 0, heard: 'xxxx', passed: false }]);
});

test('resultado atrasado depois da limpeza nao conta uma segunda tentativa', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  const oldResult = recognizers[0].listener('result');
  recognizers[0].emit('result', recognitionResult('moon'));
  oldResult(recognitionResult('sun'));
  assert.equal(game.getState().attempts, 1);
  assert.equal(reports.length, 0);

  repeat.dispatchEvent({ type: 'click' });
  recognizers[1].emit('result', recognitionResult('sun'));
  assert.deepEqual(reports, [{ attempts: 2, best: 1, stars: 3, heard: 'sun', passed: true }]);
  game.destroy();
});

test('onerror atrasado depois do destroy nao conclui o jogo', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');
  repeat.dispatchEvent({ type: 'click' });
  const oldError = recognizers[0].listener('error');

  game.destroy();
  oldError({ error: 'not-allowed' });
  assert.deepEqual(reports, []);
  assert.equal(container.children.length, 0);
});

test('onend sem resultado consome uma tentativa e libera o proximo clique', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  recognizers[0].emit('end');
  assert.equal(game.getState().attempts, 1);
  assert.equal(repeat.disabled, false);
  assert.deepEqual(reports, []);
  game.destroy();
});

test('erros de microfone e permissao abrem digitacao sem gastar tentativa', () => {
  installModernDom();
  for (const reason of ['not-allowed', 'service-not-allowed', 'language-not-supported', 'audio-capture']) {
    const recognizers = [];
    const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'cake', gloss: 'bolo' } });
    const root = container.children[0];
    const repeat = byClass(root, 'rpg-listen-repeat');
    const input = byClass(root, 'rpg-listen-input');

    repeat.dispatchEvent({ type: 'click' });
    recognizers[0].emit('error', { error: reason });
    assert.equal(game.getState().attempts, 0, reason);
    assert.equal(input.hidden, false, reason);
    input.value = 'cake';
    repeat.dispatchEvent({ type: 'click' });
    assert.deepEqual(reports, [{ attempts: 1, best: 1, stars: 3, heard: 'cake', passed: true }], reason);
    game.destroy();
  }
});

test('erro recuperavel generico consome tentativa e mostra orientacao', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const root = container.children[0];
  const repeat = byClass(root, 'rpg-listen-repeat');
  const input = byClass(root, 'rpg-listen-input');

  repeat.dispatchEvent({ type: 'click' });
  recognizers[0].emit('error', { error: 'network' });
  assert.equal(game.getState().attempts, 1);
  assert.equal(reports.length, 0);
  assert.equal(repeat.disabled, false);
  assert.equal(input.hidden, true);
  assert.equal(byClass(root, 'rpg-listen-feedback').textContent, DEFAULT_STRINGS.notHeard.pt);
  game.destroy();
});

test('reconhecedor silencioso tem timeout e nao trava o minigame', () => {
  installModernDom();
  const timers = makeTimerHarness();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');
  repeat.dispatchEvent({ type: 'click' });
  assert.equal(timers.size, 1);
  timers.runAll();

  assert.equal(game.getState().attempts, 1);
  assert.equal(repeat.disabled, false);
  assert.equal(reports.length, 0);
  assert.equal(recognizers[0].stopped, 1);
  game.destroy();
});

test('o fallback por digitacao respeita o limite de tres tentativas', () => {
  installModernDom();
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    target: { word: 'moon', gloss: 'lua' },
    reduceMotion: true,
    onDone: (result) => reports.push(result),
  });
  const root = container.children[0];
  const input = byClass(root, 'rpg-listen-input');
  const repeat = byClass(root, 'rpg-listen-repeat');

  for (const value of ['one', 'two', 'three']) {
    input.value = value;
    repeat.dispatchEvent({ type: 'click' });
  }
  input.value = 'four';
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(reports.length, 1);
  assert.equal(reports[0].attempts, 3);
  assert.equal(game.getState().done, true);
  game.destroy();
});

test('onDone que lança não inutiliza o painel e só é chamado uma vez', () => {
  installModernDom();
  const container = document.createElement('div');
  let calls = 0;
  const game = createListen({
    container,
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
    onDone: () => { calls += 1; throw new Error('falha do hospedeiro'); },
  });
  const root = container.children[0];
  const input = byClass(root, 'rpg-listen-input');
  const repeat = byClass(root, 'rpg-listen-repeat');
  input.value = 'sun';
  assert.doesNotThrow(() => repeat.dispatchEvent({ type: 'click' }));
  assert.equal(calls, 1);
  assert.equal(byClass(root, 'rpg-listen-feedback').textContent, 'Muito bem! A palavra é sun.');
  assert.doesNotThrow(() => byClass(root, 'rpg-listen-close').dispatchEvent({ type: 'click' }));
  assert.equal(container.children.length, 0);
  game.destroy();
});

test('alvo e strings maliciosos ficam como texto e não criam elementos', () => {
  installModernDom();
  const container = document.createElement('div');
  const maliciousWord = '<img src=x onerror=boom>';
  const maliciousGloss = '<script>alert(1)</script>';
  const maliciousTitle = '<b>titulo</b><img src=y onerror=boom>';
  const maliciousSuccess = '<svg onload=boom>{word}</svg>';
  const game = createListen({
    container,
    lang: 'pt',
    target: { word: maliciousWord, gloss: maliciousGloss },
    strings: { panelTitle: maliciousTitle, listen: maliciousTitle, repeat: '<span> Repetir </span>', success: maliciousSuccess },
    reduceMotion: true,
  });
  const root = container.children[0];
  const all = descendants(root);

  assert.equal(byClass(root, 'rpg-listen-word').textContent, maliciousWord);
  assert.equal(byClass(root, 'rpg-listen-gloss').textContent, maliciousGloss);
  assert.equal(byClass(root, 'rpg-listen-title').textContent, maliciousTitle);
  assert.equal(byClass(root, 'rpg-listen-audio').getAttribute('aria-label'), maliciousTitle);
  assert.equal(byClass(root, 'rpg-listen-repeat').textContent, '<span> Repetir </span>');
  assert.equal(all.some((element) => ['IMG', 'SCRIPT', 'SPAN', 'B'].includes(element.tagName)), false);
  const input = byClass(root, 'rpg-listen-input');
  input.value = maliciousWord;
  byClass(root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  const feedback = byClass(root, 'rpg-listen-feedback');
  assert.equal(feedback.textContent, maliciousSuccess.replace('{word}', maliciousWord));
  assert.equal(descendants(feedback).some((element) => ['SVG', 'IMG', 'SCRIPT'].includes(element.tagName)), false);
  game.destroy();
});

test('a fala ouvida e marcada como ingles mesmo com a interface em portugues', () => {
  installModernDom();
  const recognizers = [];
  const { container, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const root = container.children[0];
  const repeat = byClass(root, 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  recognizers[0].emit('result', recognitionResult('moon'));
  const feedback = byClass(root, 'rpg-listen-feedback');
  assert.equal(feedback.textContent, 'Quase! Você disse moon. Tente mais uma vez.');
  // A constraint é "conteúdo em ingles = en". "moon" foi fala OVIDA em ingles,
  // então precisa de lang="en" para a tecnologia assistiva usar a fonetica
  // correta. Marcar como "pt" obrigava a leitura com fonetica portuguesa.
  const spoken = feedback.children.filter((child) => child.nodeType === 1);
  assert.equal(spoken.length, 1);
  assert.equal(spoken[0].getAttribute('lang'), 'en');
  assert.equal(spoken[0].textContent, 'moon');
  assert.equal(
    descendants(feedback).some((element) => element.getAttribute?.('lang') === 'pt' && element.textContent === 'moon'),
    false,
  );
  game.destroy();
});

test('o foco inicial observa a palavra focalizavel e o campo de digitacao', () => {
  installModernDom();
  const originalCreateElement = document.createElement;
  const focusCalls = [];
  document.createElement = (tagName) => {
    const element = originalCreateElement(tagName);
    element.focus = () => focusCalls.push(element.className || tagName);
    return element;
  };

  try {
    const recognizers = [];
    const voiceGame = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
    assert.equal(focusCalls.at(-1), 'rpg-listen-word');
    assert.equal(byClass(voiceGame.container.children[0], 'rpg-listen-word').tabIndex, -1);
    voiceGame.game.destroy();

    const typedContainer = document.createElement('div');
    const typedGame = createListen({
      container: typedContainer,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
    });
    assert.equal(focusCalls.at(-1), 'rpg-listen-input');
    typedGame.destroy();
  } finally {
    document.createElement = originalCreateElement;
  }
});

test('feedback tem papel de status e os controles de texto ficam no idioma ativo', () => {
  installModernDom();
  for (const language of ['pt', 'en', 'es']) {
    const container = document.createElement('div');
    const game = createListen({
      container,
      lang: language,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
    });
    const root = container.children[0];
    const feedback = byClass(root, 'rpg-listen-feedback');
    assert.equal(root.getAttribute('lang'), language);
    assert.equal(feedback.getAttribute('role'), 'status');
    assert.equal(feedback.getAttribute('aria-live'), 'polite');
    for (const className of ['rpg-listen-audio', 'rpg-listen-repeat', 'rpg-listen-close']) {
      assert.equal(byClass(root, className).getAttribute('lang'), language, className);
    }
    // O campo recebe a palavra inglesa, então o campo é ingles. A orientação
    // traduzida fica em um rótulo visível separado e associado ao campo.
    const input = byClass(root, 'rpg-listen-input');
    const label = byClass(root, 'rpg-listen-label');
    assert.equal(input.getAttribute('lang'), 'en', language);
    assert.equal(input.getAttribute('placeholder'), null, language);
    assert.equal(input.getAttribute('aria-label'), null, language);
    assert.equal(label.textContent, DEFAULT_STRINGS.typePlaceholder[language], language);
    assert.equal(label.getAttribute('lang'), language, language);
    assert.equal(label.getAttribute('for'), input.id, language);
    assert.equal(byClass(root, 'rpg-listen-audio').getAttribute('aria-label'), DEFAULT_STRINGS.listen[language]);
    game.destroy();
  }
});

test('sucesso, revelacao e tentativa marcam os tres idiomas', () => {
  installModernDom();
  for (const language of ['pt', 'en', 'es']) {
    const makeGame = () => {
      const container = document.createElement('div');
      const game = createListen({
        container,
        lang: language,
        target: { word: 'sun', gloss: 'sol' },
        reduceMotion: true,
      });
      return { container, game, root: container.children[0] };
    };

    const success = makeGame();
    const successInput = byClass(success.root, 'rpg-listen-input');
    successInput.value = 'sun';
    byClass(success.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
    const successNodes = descendants(byClass(success.root, 'rpg-listen-feedback'));
    assert.equal(successNodes.some((element) => element.getAttribute?.('lang') === 'en' && element.textContent === 'sun'), true);
    success.game.destroy();

    const reveal = makeGame();
    const revealInput = byClass(reveal.root, 'rpg-listen-input');
    for (const value of ['one', 'two', 'three']) {
      revealInput.value = value;
      byClass(reveal.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
    }
    const revealNodes = descendants(byClass(reveal.root, 'rpg-listen-feedback'));
    assert.equal(revealNodes.some((element) => element.getAttribute?.('lang') === 'en' && element.textContent === 'sun'), true);
    assert.equal(revealNodes.some((element) => element.getAttribute?.('lang') === language && element.textContent === 'sol'), true);
    reveal.game.destroy();

    const attempt = makeGame();
    const attemptInput = byClass(attempt.root, 'rpg-listen-input');
    attemptInput.value = 'moon';
    byClass(attempt.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
    const attemptNodes = descendants(byClass(attempt.root, 'rpg-listen-feedback'));
    // A fala ouvida é conteúdo inglês em qualquer interface: nunca carrega o
    // idioma ativo.
    assert.equal(attemptNodes.some((element) => element.getAttribute?.('lang') === 'en' && element.textContent === 'moon'), true);
    assert.equal(attemptNodes.some((element) => element.textContent === 'moon' && element.getAttribute?.('lang') !== 'en'), false);
    attempt.game.destroy();
  }
});

test('fallback aberto durante a sessao foca o campo de digitacao', () => {
  installModernDom();
  const originalCreateElement = document.createElement;
  const focusCalls = [];
  document.createElement = (tagName) => {
    const element = originalCreateElement(tagName);
    element.focus = () => focusCalls.push(element.className || tagName);
    return element;
  };

  try {
    const recognizers = [];
    const { container, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
    const root = container.children[0];
    const repeat = byClass(root, 'rpg-listen-repeat');
    repeat.dispatchEvent({ type: 'click' });
    assert.equal(focusCalls.at(-1), 'rpg-listen-word');
    recognizers[0].emit('error', { error: 'not-allowed' });
    assert.equal(focusCalls.at(-1), 'rpg-listen-input');
    assert.equal(byClass(root, 'rpg-listen-input').hidden, false);
    game.destroy();
  } finally {
    document.createElement = originalCreateElement;
  }
});

test('resultado e erro concorrentes contam somente o primeiro callback', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  const resultHandler = recognizers[0].listener('result');
  const errorHandler = recognizers[0].listener('error');
  resultHandler(recognitionResult('moon'));
  errorHandler({ error: 'network' });
  assert.equal(game.getState().attempts, 1);
  assert.equal(reports.length, 0);
  game.destroy();
});

test('temporizador e onend concorrentes não contam duas tentativas', () => {
  installModernDom();
  const timers = makeTimerHarness();
  const recognizers = [];
  const { container, game } = gameWithRecognizers(recognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  const endHandler = recognizers[0].listener('end');
  timers.runAll();
  endHandler();
  assert.equal(game.getState().attempts, 1);
  game.destroy();
});

test('temporizadores antigos ficam inativos apos destroy e finish', () => {
  installModernDom();
  const destroyedTimers = makeTimerHarness();
  const destroyedRecognizers = [];
  const destroyedGame = gameWithRecognizers(destroyedRecognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: destroyedTimers.setTimeout,
    clearTimeout: destroyedTimers.clearTimeout,
  });
  const destroyedRepeat = byClass(destroyedGame.container.children[0], 'rpg-listen-repeat');
  destroyedRepeat.dispatchEvent({ type: 'click' });
  destroyedGame.game.destroy();
  destroyedTimers.runAll();
  assert.equal(destroyedGame.game.getState().attempts, 0);

  const finishedTimers = makeTimerHarness();
  const finishedRecognizers = [];
  const finished = gameWithRecognizers(finishedRecognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: finishedTimers.setTimeout,
    clearTimeout: finishedTimers.clearTimeout,
  });
  const finishedRepeat = byClass(finished.container.children[0], 'rpg-listen-repeat');
  finishedRepeat.dispatchEvent({ type: 'click' });
  finishedRecognizers[0].emit('result', recognitionResult('sun'));
  finishedTimers.runAll();
  assert.equal(finished.reports.length, 1);
  assert.equal(finished.reports[0].attempts, 1);
  finished.game.destroy();
});

test('onend atrasado apos destroy nao consome tentativa', () => {
  installModernDom();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');
  repeat.dispatchEvent({ type: 'click' });
  const endHandler = recognizers[0].listener('end');
  game.destroy();
  endHandler();
  assert.equal(reports.length, 0);
  assert.equal(game.getState().attempts, 0);
});

test('a mesma recognizer pode ser reutilizada entre sessoes validas', () => {
  installModernDom();
  const recognizer = makeRecognizer();
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
    onDone: (result) => reports.push(result),
    createRecognizer: () => recognizer,
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  repeat.dispatchEvent({ type: 'click' });
  recognizer.emit('result', recognitionResult('moon'));
  repeat.dispatchEvent({ type: 'click' });
  recognizer.emit('result', recognitionResult('sun'));

  assert.equal(recognizer.started, 2);
  assert.deepEqual(reports, [{ attempts: 2, best: 1, stars: 3, heard: 'sun', passed: true }]);
  game.destroy();
});

test('recognizer com lang somente leitura abre fallback sem lançar', () => {
  installModernDom();
  const recognizer = makeRecognizer();
  Object.defineProperty(recognizer, 'lang', {
    configurable: true,
    get: () => 'en-GB',
    set: () => { throw new Error('lang congelado'); },
  });
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
    onDone: (result) => reports.push(result),
    createRecognizer: () => recognizer,
  });
  const root = container.children[0];
  const repeat = byClass(root, 'rpg-listen-repeat');
  assert.doesNotThrow(() => repeat.dispatchEvent({ type: 'click' }));
  assert.equal(byClass(root, 'rpg-listen-input').hidden, false);
  assert.equal(game.getState().attempts, 0);
  assert.equal(reports.length, 0);
  game.destroy();
});

test('start que lança e listeners defeituosos abrem fallback sem travar', () => {
  installModernDom();
  for (const defect of ['start', 'addEventListener', 'removeEventListener']) {
    const recognizer = makeRecognizer();
    if (defect === 'start') recognizer.start = () => { throw new Error('start falhou'); };
    if (defect === 'addEventListener') recognizer.addEventListener = () => { throw new Error('add falhou'); };
    if (defect === 'removeEventListener') recognizer.removeEventListener = () => { throw new Error('remove falhou'); };
    const container = document.createElement('div');
    const reports = [];
    const game = createListen({
      container,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
      onDone: (result) => reports.push(result),
      createRecognizer: () => recognizer,
    });
    const root = container.children[0];
    const repeat = byClass(root, 'rpg-listen-repeat');
    assert.doesNotThrow(() => repeat.dispatchEvent({ type: 'click' }), defect);
    assert.equal(byClass(root, 'rpg-listen-input').hidden, defect === 'removeEventListener', defect);
    assert.equal(game.getState().attempts, 0, defect);
    assert.equal(reports.length, 0, defect);
    assert.doesNotThrow(() => game.destroy(), defect);
  }
});

test('recognizer estruturalmente invalido abre digitacao', () => {
  installModernDom();
  for (const missing of ['addEventListener', 'removeEventListener']) {
    const recognizer = makeRecognizer();
    delete recognizer[missing];
    const container = document.createElement('div');
    const game = createListen({
      container,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
      createRecognizer: () => recognizer,
    });
    const root = container.children[0];
    assert.equal(byClass(root, 'rpg-listen-input').hidden, false, missing);
    game.destroy();
  }
});

test('listener voiceschanged defeituoso não impede criação ou destruição', () => {
  installModernDom();
  const voiceListeners = new Set();
  const speech = {
    getVoices: () => [],
    speak() {},
    cancel() {},
    addEventListener(type, listener) {
      if (type === 'voiceschanged') voiceListeners.add(listener);
      throw new Error('voiceschanged falhou');
    },
    removeEventListener() { throw new Error('remove voiceschanged falhou'); },
  };
  const container = document.createElement('div');
  let game;
  assert.doesNotThrow(() => {
    game = createListen({
      container,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
      speech,
    });
  });
  assert.equal(voiceListeners.size, 1);
  assert.doesNotThrow(() => game.destroy());
});

test('destroy antes do primeiro clique libera o recognizer reservado', () => {
  installModernDom();
  const recognizer = makeRecognizer();
  const container = document.createElement('div');
  const game = createListen({
    container,
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
    createRecognizer: () => recognizer,
  });
  game.destroy();
  assert.equal(recognizer.started, 0);
  assert.equal(recognizer.aborted, 0);
  assert.equal(container.children.length, 0);
});

test('onClose que lança nao prende o painel e não propaga a exceção', () => {
  installModernDom();
  const container = document.createElement('div');
  const game = createListen({
    container,
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
    onClose: () => { throw new Error('falha ao fechar'); },
  });
  const close = byClass(container.children[0], 'rpg-listen-close');
  assert.doesNotThrow(() => close.dispatchEvent({ type: 'click' }));
  assert.equal(container.children.length, 0);
  game.destroy();
});

test('destroy remove listeners, aborta o Recognition e impede novos resultados', () => {
  installModernDom();
  const container = document.createElement('div');
  const reports = [];
  const recognizer = makeRecognizer(null, { emitOnAbort: true });
  const game = createListen({
    container,
    target: { word: 'moon', gloss: 'lua' },
    reduceMotion: true,
    onDone: (result) => reports.push(result),
    createRecognizer: () => recognizer,
  });
  const root = container.children[0];
  const listen = byClass(root, 'rpg-listen-audio');
  const repeat = byClass(root, 'rpg-listen-repeat');
  const close = byClass(root, 'rpg-listen-close');

  repeat.dispatchEvent({ type: 'click' });
  const resultHandler = recognizer.listener('result');
  assert.equal(recognizer.started, 1);
  game.destroy();
  assert.equal(recognizer.stopped, 0);
  assert.equal(recognizer.aborted, 1);
  assert.equal(recognizer.listeners.size, 0);
  assert.equal(container.children.length, 0);
  resultHandler(recognitionResult('moon'));
  listen.dispatchEvent({ type: 'click' });
  repeat.dispatchEvent({ type: 'click' });
  close.dispatchEvent({ type: 'click' });
  assert.deepEqual(reports, []);
});

test('o botao Ouvir usa a voz inglesa', () => {
  installModernDom();
  const spoken = [];
  const voiceListeners = new Set();
  const speech = {
    getVoices: () => [{ lang: 'en-GB' }],
    speak: (utterance) => spoken.push(utterance),
    cancel() {},
    addEventListener(type, listener) { if (type === 'voiceschanged') voiceListeners.add(listener); },
    removeEventListener(type, listener) { if (type === 'voiceschanged') voiceListeners.delete(listener); },
  };
  const container = document.createElement('div');
  const game = createListen({
    container,
    lang: 'en',
    target: { word: 'hat', gloss: 'hat' },
    reduceMotion: true,
    speech,
  });
  const root = container.children[0];
  byClass(root, 'rpg-listen-audio').dispatchEvent({ type: 'click' });

  assert.equal(spoken.length, 1);
  assert.equal(spoken[0].text, 'hat');
  assert.equal(spoken[0].lang, 'en-GB');
  assert.equal(voiceListeners.size, 1);

  game.destroy();
  assert.equal(voiceListeners.size, 0);
  assert.equal(container.children.length, 0);
});

// ---------------------------------------------------------------------------
// Rodada 5 — regressão da regra de negação (rodada 4 reprovava criança que
// acertou por causa do sufixo "nt" e da palavra "do").
// ---------------------------------------------------------------------------

test('regressão: frases afirmativas com want, went, plant e do aprovam a criança', () => {
  // Estas seis frases davam 0,2 e zero estrelas na rodada 4. A constraint é que
  // a regra de negação seja por PALAVRA INTEIRA: nada de sufixo "nt", que pegava
  // want/went/plant, e "do" não é negação em inglês.
  const casos = [
    ['swing', 'I want swing'],
    ['swing', 'I went to swing'],
    ['swing', 'I do swing'],
    ['swing', 'can you do swing'],
    ['sun', 'want sun'],
    ['sun', 'plant sun'],
  ];
  for (const [alvo, fala] of casos) {
    const score = similarity(alvo, fala);
    assert.ok(score >= 0.6, `${fala} devia aprovar, veio ${score}`);
    assert.ok(starsFromSimilarity(score) >= 2, `${fala} devia dar 2 estrelas, veio ${starsFromSimilarity(score)}`);
  }
});

test('regressão: os positivos que já funcionavam continuam aprovados', () => {
  assert.equal(similarity('swing', 'swing'), 1);
  assert.equal(starsFromSimilarity(similarity('swing', 'swing')), 3);
  assert.equal(starsFromSimilarity(similarity('swing', 'swingg')), 2);
  assert.equal(starsFromSimilarity(similarity('swing', 'the swing')), 2);
  assert.equal(similarity('swing', 'the word is swing'), 1);
  assert.equal(starsFromSimilarity(similarity('swing', 'the word is swing')), 3);
  assert.equal(starsFromSimilarity(similarity('swing', 'I say the word is swing')), 2);
  // Uma palavra neutra antes do alvo continua aprovada quando não há nenhum
  // marcador de negação, dúvida, ausência ou incapacidade no enunciado.
  assert.ok(similarity('swing', 'I see a bird and the swing') >= 0.6);
  assert.ok(similarity('swing', 'swing') >= 0.6);
});

test('regressão: toda negação real continua reprovando com zero estrelas', () => {
  // A lista fecha o contrato do item 4 da rodada 5. Nenhuma entrada aqui pode
  // perder a reprovação quando o sufixo "nt" foi removido: as contrações sem
  // apóstrofo precisam estar escritas uma a uma.
  const casos = [
    "I don't know swing", 'I don’t know swing',
    "I can't swing", "I won't swing",
    "it doesn't swing", "it isn't swing",
    'I do not know swing', 'it is not swing',
    'not swing', 'no swing',
    'ninguem swing', 'I am unsure swing',
    'nao e swing', 'não é swing', 'eu nao sei swing',
    'no es swing', 'no se swing', 'no conozco swing',
  ];
  for (const fala of casos) {
    const score = similarity('swing', fala);
    assert.equal(score, 0.2, fala);
    assert.equal(starsFromSimilarity(score), 0, fala);
  }
});

test('regressão: contrações sem apóstrofo que só a lista inteira cobre', () => {
  // Cada item desta lista é uma contração que a normalização deixa sem
  // apóstrofo. Se alguém tirar uma da lista, este teste pega.
  for (const fala of [
    "I won't swing", "it doesn't swing", "it isn't swing", "they aren't swing",
    "they weren't swing", "it wasn't swing", "I shouldn't swing",
    "I wouldn't swing", "I couldn't swing", "I mightn't swing",
    "I mustn't swing", "I haven't swing", "I hadn't swing", "swing aint",
  ]) {
    assert.equal(similarity('swing', fala), 0.2, fala);
  }
});

test('regressão: a afirmação sem marcador continua aprovada', () => {
  for (const fala of [
    'I know the word swing',
  ]) {
    const score = similarity('swing', fala);
    assert.ok(score >= 0.6, `${fala} devia aprovar, veio ${score}`);
  }
});

test('regressão: a negação atravessa artigo, determinante e substantivo até o alvo', () => {
  // A regra da rodada 7 examina o enunciado inteiro. Estas frases mantêm a
  // reprovação, mas o alcance não depende mais de conectores nem de janela.
  for (const fala of [
    "I don't know the word swing", 'I do not know this word swing',
    'nao e a palavra swing', 'no es la palabra swing',
    'no tengo el swing', 'eu nao quero swing',
    'I do not want to swing', 'I have no idea about swing',
    'I am not sure swing', 'I cannot do swing', "I won't do swing",
  ]) {
    assert.equal(similarity('swing', fala), 0.2, fala);
  }
});

test('a regra de negação também vale dentro do minigame montado', () => {
  // Prova que a similaridade pura alimenta a pontuação do jogo: a frase
  // afirmativa fecha o minigame aprovado e a frase negada não dá estrela.
  installModernDom();
  const afirmativa = typedGame({ target: { word: 'swing', gloss: 'balanco' } });
  const afirmativaInput = byClass(afirmativa.root, 'rpg-listen-input');
  afirmativaInput.value = 'I do swing';
  byClass(afirmativa.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  assert.deepEqual(afirmativa.reports, [{ attempts: 1, best: 0.85, stars: 2, heard: 'I do swing', passed: true }]);
  afirmativa.game.destroy();

  const negada = typedGame({ target: { word: 'swing', gloss: 'balanco' } });
  const negadaInput = byClass(negada.root, 'rpg-listen-input');
  for (const fala of ["I don't know swing", 'I do not know swing', 'no swing']) {
    negadaInput.value = fala;
    byClass(negada.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  }
  assert.equal(negada.reports.length, 1);
  assert.equal(negada.reports[0].attempts, 3);
  assert.equal(negada.reports[0].stars, 0);
  assert.equal(negada.reports[0].passed, false);
  negada.game.destroy();
});

// ---------------------------------------------------------------------------
// Rodada 5 — idioma do conteúdo inglês (item 5 pede pelo menos um caso em
// espanhol, que a rodada 4 não cobria).
// ---------------------------------------------------------------------------

test('interface em espanhol marca a fala e a digitação em inglês e o painel em espanhol', () => {
  installModernDom();
  const recognizers = [];
  const { container, game } = gameWithRecognizers(recognizers, { lang: 'es', target: { word: 'sun', gloss: 'sol' } });
  const root = container.children[0];
  const input = byClass(root, 'rpg-listen-input');
  const repeat = byClass(root, 'rpg-listen-repeat');

  // O painel inteiro fica em espanhol.
  assert.equal(root.getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-title').getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-instructions').getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-gloss').getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-audio').getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-repeat').getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-close').getAttribute('lang'), 'es');
  assert.equal(byClass(root, 'rpg-listen-fallback-notice').getAttribute('lang'), 'es');
  // Os controles mantêm o nome acessível no idioma ativo; o campo de
  // digitação recebe esse nome pelo rótulo visível associado.
  assert.equal(byClass(root, 'rpg-listen-audio').getAttribute('aria-label'), DEFAULT_STRINGS.listen.es);
  assert.equal(byClass(root, 'rpg-listen-audio').textContent, DEFAULT_STRINGS.listen.es);
  assert.equal(byClass(root, 'rpg-listen-repeat').getAttribute('aria-label'), DEFAULT_STRINGS.repeat.es);
  assert.equal(byClass(root, 'rpg-listen-close').getAttribute('aria-label'), DEFAULT_STRINGS.close.es);
  const label = byClass(root, 'rpg-listen-label');
  assert.equal(input.getAttribute('aria-label'), null);
  assert.equal(label.getAttribute('for'), input.id);
  assert.equal(label.getAttribute('lang'), 'es');
  assert.equal(label.textContent, DEFAULT_STRINGS.typePlaceholder.es);
  // O campo recebe a palavra inglesa.
  assert.equal(input.getAttribute('lang'), 'en');

  // A fala ouvida é inglês mesmo com a interface em espanhol.
  repeat.dispatchEvent({ type: 'click' });
  recognizers[0].emit('result', recognitionResult('moon'));
  const feedback = byClass(root, 'rpg-listen-feedback');
  assert.equal(feedback.textContent, '¡Casi! Dijiste moon. Inténtalo una vez más.');
  const attemptSpans = feedback.children.filter((child) => child.nodeType === 1);
  assert.equal(attemptSpans.length, 1);
  assert.equal(attemptSpans[0].getAttribute('lang'), 'en');
  assert.equal(attemptSpans[0].textContent, 'moon');
  game.destroy();

  // A mensagem final traduzida fica em espanhol e a palavra alvo em inglês.
  const finalCase = typedGame({ lang: 'es', target: { word: 'sun', gloss: 'sol' } });
  const finalInput = byClass(finalCase.root, 'rpg-listen-input');
  for (const fala of ['uno', 'dos', 'tres']) {
    finalInput.value = fala;
    byClass(finalCase.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  }
  const finalFeedback = byClass(finalCase.root, 'rpg-listen-feedback');
  assert.equal(finalFeedback.textContent, 'Miremos juntos: sun significa sol.');
  const finalSpans = finalFeedback.children.filter((child) => child.nodeType === 1);
  assert.equal(finalSpans.length, 2);
  const wordSpan = finalSpans.find((span) => span.textContent === 'sun');
  const glossSpan = finalSpans.find((span) => span.textContent === 'sol');
  assert.equal(wordSpan.getAttribute('lang'), 'en');
  assert.equal(glossSpan.getAttribute('lang'), 'es');
  finalCase.game.destroy();
});

// ---------------------------------------------------------------------------
// Rodada 5 — fidelidade do DocumentFragment no stub local.
// ---------------------------------------------------------------------------

test('o feedback moderno esvazia o fragmento e deixa os textos como filhos diretos', () => {
  installModernDom();
  const fragments = [];
  const originalCreateFragment = document.createDocumentFragment;
  document.createDocumentFragment = () => {
    const fragment = originalCreateFragment();
    fragments.push(fragment);
    return fragment;
  };
  try {
    const recognizers = [];
    const { container, game } = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
    const root = container.children[0];
    byClass(root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
    recognizers[0].emit('result', recognitionResult('moon'));
    const feedback = byClass(root, 'rpg-listen-feedback');

    // O navegador esvazia o fragmento: replaceChildren insere os FILHOS dele.
    assert.ok(fragments.length >= 1, 'o feedback moderno deve usar DocumentFragment');
    assert.equal(fragments.every((fragment) => fragment.children.length === 0), true);
    // O fragmento nunca vira filho do elemento de feedback.
    assert.equal(feedback.children.some((child) => child.nodeType === 11), false);
    // Os textos são filhos DIRETOS, não netos através do fragmento.
    assert.deepEqual(feedback.children.map((child) => child.nodeType), [3, 1, 3]);
    const spoken = feedback.children[1];
    assert.equal(spoken.tagName, 'SPAN');
    assert.equal(spoken.getAttribute('lang'), 'en');
    assert.equal(spoken.textContent, 'moon');
    assert.equal(feedback.textContent, 'Quase! Você disse moon. Tente mais uma vez.');
    game.destroy();
  } finally {
    document.createDocumentFragment = originalCreateFragment;
  }
});

test('o stub local também esvazia o fragmento no appendChild', () => {
  installModernDom();
  const container = document.createElement('div');
  const fragment = document.createDocumentFragment();
  const first = document.createTextNode('um');
  const second = document.createTextNode('dois');
  fragment.appendChild(first);
  fragment.appendChild(second);
  container.appendChild(fragment);

  assert.equal(fragment.children.length, 0);
  assert.equal(container.children.includes(fragment), false);
  assert.deepEqual(container.children, [first, second]);
});

// ---------------------------------------------------------------------------
// Rodada 5 — contrato do par setTimeout/clearTimeout.
// ---------------------------------------------------------------------------

test('agendador síncrono cancela o id devolvido e não inicia o Recognition', () => {
  installModernDom();
  const recognizers = [];
  const cancelled = [];
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    reduceMotion: true,
    target: { word: 'sun', gloss: 'sol' },
    onDone: (result) => reports.push(result),
    createRecognizer: () => {
      const recognizer = makeRecognizer();
      recognizers.push(recognizer);
      return recognizer;
    },
    recognitionTimeout: 5,
    setTimeout: (callback) => {
      callback();
      return 'id-sincrono';
    },
    clearTimeout: (id) => { cancelled.push(id); },
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');
  repeat.dispatchEvent({ type: 'click' });

  // O callback rodou DENTRO da chamada de scheduleTimer, então a sessão já foi
  // invalidada e o id devolvido precisa ser cancelado na hora.
  assert.equal(recognizers.length, 1);
  assert.equal(recognizers[0].started, 0);
  assert.deepEqual(cancelled, ['id-sincrono']);
  assert.equal(game.getState().attempts, 1);
  assert.deepEqual(reports, []);
  assert.equal(repeat.disabled, false);
  assert.equal(repeat.getAttribute('aria-pressed'), 'false');
  game.destroy();
  assert.deepEqual(cancelled, ['id-sincrono']);
});

test('três agendadores síncronos fecham a sessão uma vez sem vazar temporizador', () => {
  installModernDom();
  const recognizers = [];
  const cancelled = [];
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    reduceMotion: true,
    target: { word: 'moon', gloss: 'lua' },
    onDone: (result) => reports.push(result),
    createRecognizer: () => {
      const recognizer = makeRecognizer();
      recognizers.push(recognizer);
      return recognizer;
    },
    recognitionTimeout: 5,
    setTimeout: (callback) => {
      callback();
      return 'id-sincrono';
    },
    clearTimeout: (id) => { cancelled.push(id); },
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  for (let tentativa = 1; tentativa <= 3; tentativa += 1) {
    repeat.dispatchEvent({ type: 'click' });
    assert.equal(game.getState().attempts, tentativa);
  }
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(reports.length, 1);
  assert.equal(reports[0].attempts, 3);
  assert.equal(reports[0].stars, 0);
  // Todo temporizador devolvido foi cancelado: um por tentativa, nenhum sobra.
  assert.deepEqual(cancelled, ['id-sincrono', 'id-sincrono', 'id-sincrono']);
  assert.equal(recognizers.every((recognizer) => recognizer.started === 0), true);
  game.destroy();
});

test('injetar só setTimeout não manda id do agendador injetado para o limpador global', () => {
  installModernDom();
  const realSetTimeout = globalThis.setTimeout;
  const realClearTimeout = globalThis.clearTimeout;
  const globalScheduled = [];
  const globalCleared = [];
  let injectedCalls = 0;

  // O par global é espionado para observar o que a implementação faz quando
  // recebe só um dos dois.
  globalThis.setTimeout = (callback, delay) => {
    globalScheduled.push({ callback, delay });
    return { origem: 'global' };
  };
  globalThis.clearTimeout = (id) => { globalCleared.push(id); };

  try {
    const recognizers = [];
    const { container, reports, game } = gameWithRecognizers(recognizers, {
      target: { word: 'sun', gloss: 'sol' },
      recognitionTimeout: 5,
      setTimeout: (callback, delay) => {
        injectedCalls += 1;
        return { origem: 'injetado', callback, delay };
      },
    });
    const repeat = byClass(container.children[0], 'rpg-listen-repeat');
    repeat.dispatchEvent({ type: 'click' });

    // Com um dos dois injetado, o par nativo é usado para os dois. O
    // agendador injetado não pode receber nada e o global não pode receber id
    // de outro agendador.
    assert.equal(injectedCalls, 0);
    assert.equal(globalScheduled.length, 1);
    assert.equal(globalScheduled[0].delay, 5);
    assert.equal(recognizers[0].started, 1);

    // O resultado limpa a sessão e o id do par global é devolvido ao global.
    recognizers[0].emit('result', recognitionResult('sun'));
    assert.deepEqual(reports, [{ attempts: 1, best: 1, stars: 3, heard: 'sun', passed: true }]);
    assert.deepEqual(globalCleared, [{ origem: 'global' }]);
    assert.equal(globalCleared.some((id) => id?.origem === 'injetado'), false);

    // O callback do agendador nativo, disparado depois, não conta tentativa.
    for (const pendente of globalScheduled) pendente.callback();
    assert.equal(game.getState().attempts, 1);
    game.destroy();
  } finally {
    globalThis.setTimeout = realSetTimeout;
    globalThis.clearTimeout = realClearTimeout;
  }
});

test('o par injetado completo continua sendo usado quando os dois vêm juntos', () => {
  installModernDom();
  const timers = makeTimerHarness();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');
  repeat.dispatchEvent({ type: 'click' });
  assert.equal(timers.size, 1);
  assert.equal(recognizers[0].started, 1);
  timers.runAll();
  assert.equal(game.getState().attempts, 1);
  assert.equal(timers.size, 0);
  assert.deepEqual(reports, []);
  game.destroy();
});

test('três tempos esgotados consecutivos fecham a sessão uma vez no caminho da fala', () => {
  installModernDom();
  const timers = makeTimerHarness();
  const recognizers = [];
  const { container, reports, game } = gameWithRecognizers(recognizers, {
    target: { word: 'moon', gloss: 'lua' },
    recognitionTimeout: 5,
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
  });
  const repeat = byClass(container.children[0], 'rpg-listen-repeat');

  for (let tentativa = 1; tentativa <= 3; tentativa += 1) {
    repeat.dispatchEvent({ type: 'click' });
    assert.equal(timers.size, 1, `tentativa ${tentativa} deve ter um temporizador`);
    timers.runAll();
    assert.equal(game.getState().attempts, tentativa);
  }
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(reports.length, 1);
  assert.equal(reports[0].attempts, 3);
  assert.equal(reports[0].stars, 0);
  assert.equal(reports[0].passed, false);
  // Nenhum temporizador sobreviveu: nem ao fim da sessão, nem ao destroy.
  assert.equal(timers.size, 0);
  game.destroy();
  assert.equal(timers.size, 0);
  assert.equal(reports.length, 1);
});

test('três tentativas digitadas fecham a sessão uma vez sem agendar temporizador', () => {
  installModernDom();
  const timers = makeTimerHarness();
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    reduceMotion: true,
    target: { word: 'moon', gloss: 'lua' },
    onDone: (result) => reports.push(result),
    setTimeout: timers.setTimeout,
    clearTimeout: timers.clearTimeout,
  });
  const root = container.children[0];
  const input = byClass(root, 'rpg-listen-input');
  const repeat = byClass(root, 'rpg-listen-repeat');

  for (const fala of ['one', 'two', 'three']) {
    input.value = fala;
    repeat.dispatchEvent({ type: 'click' });
    assert.equal(timers.size, 0, `digitar ${fala} não pode agendar temporizador`);
  }
  input.value = 'four';
  repeat.dispatchEvent({ type: 'click' });

  assert.equal(reports.length, 1);
  assert.equal(reports[0].attempts, 3);
  assert.equal(reports[0].stars, 0);
  assert.equal(timers.size, 0);
  game.destroy();
  assert.equal(reports.length, 1);
});

// ---------------------------------------------------------------------------
// Rodada 5 — cobertura extra pedida.
// ---------------------------------------------------------------------------

test('fechar no meio da sessão de fala roda onClose uma vez e não gera onDone', () => {
  installModernDom();
  const container = document.createElement('div');
  const reports = [];
  const recognizers = [];
  let closes = 0;
  let handle = null;
  const game = createListen({
    container,
    reduceMotion: true,
    target: { word: 'sun', gloss: 'sol' },
    onDone: (result) => reports.push(result),
    createRecognizer: () => {
      const recognizer = makeRecognizer();
      recognizers.push(recognizer);
      return recognizer;
    },
    onClose: () => {
      closes += 1;
      // O hospedeiro remove o painel ao ser avisado do fechamento.
      handle.destroy();
    },
  });
  handle = game;
  const root = container.children[0];
  const repeat = byClass(root, 'rpg-listen-repeat');
  const close = byClass(root, 'rpg-listen-close');

  repeat.dispatchEvent({ type: 'click' });
  assert.equal(recognizers[0].started, 1);
  const lateResult = recognizers[0].listener('result');
  const lateEnd = recognizers[0].listener('end');
  close.dispatchEvent({ type: 'click' });
  close.dispatchEvent({ type: 'click' });

  assert.equal(closes, 1);
  assert.equal(container.children.length, 0);
  assert.equal(recognizers[0].aborted, 1);
  lateResult(recognitionResult('sun'));
  lateEnd();
  assert.deepEqual(reports, []);
  assert.equal(game.getState().attempts, 0);
  assert.equal(game.getState().done, false);
});

test('voiceschanged real muda a disponibilidade do botão e os listeners saem no destroy', () => {
  installModernDom();
  const voiceListeners = new Set();
  let voices = [];
  const speech = {
    getVoices: () => voices,
    speak() {},
    cancel() {},
    addEventListener(type, listener) { if (type === 'voiceschanged') voiceListeners.add(listener); },
    removeEventListener(type, listener) { if (type === 'voiceschanged') voiceListeners.delete(listener); },
  };
  const container = document.createElement('div');
  const game = createListen({
    container,
    lang: 'pt',
    target: { word: 'hat', gloss: 'chapeu' },
    reduceMotion: true,
    speech,
  });
  const root = container.children[0];
  const audio = byClass(root, 'rpg-listen-audio');
  const fire = () => { for (const listener of [...voiceListeners]) listener({ type: 'voiceschanged' }); };

  assert.equal(voiceListeners.size, 1);
  assert.equal(audio.hidden, true);
  assert.equal(audio.disabled, true);

  voices = [{ lang: 'en-GB' }];
  fire();
  assert.equal(audio.hidden, false);
  assert.equal(audio.disabled, false);

  voices = [];
  fire();
  assert.equal(audio.hidden, true);
  assert.equal(audio.disabled, true);

  game.destroy();
  assert.equal(voiceListeners.size, 0);
  assert.equal(container.children.length, 0);
});

test('todo botão do painel tem type button e alvo mínimo de 44px', () => {
  installModernDom();
  const container = document.createElement('div');
  const game = createListen({
    container,
    lang: 'pt',
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
  });
  const root = container.children[0];
  const buttons = descendants(root).filter((element) => element.tagName === 'BUTTON');
  const esperados = ['rpg-listen-audio', 'rpg-listen-repeat', 'rpg-listen-close'];

  assert.equal(buttons.length, esperados.length);
  for (const className of esperados) {
    const button = byClass(root, className);
    assert.ok(button, `faltou o botão ${className}`);
    assert.equal(button.type, 'button', className);
    assert.equal(button.style.minWidth, '44px', className);
    assert.equal(button.style.minHeight, '44px', className);
  }
  game.destroy();
});

// ---------------------------------------------------------------------------
// Rodada 6 — regressões de negação, pausa, rótulo e limpeza.
// ---------------------------------------------------------------------------

test('rodada 6: as lacunas de negação real reprovam com zero estrelas', () => {
  const casos = [
    "I shan't swing", "I needn't swing", "I oughtn't swing", "I mayn't swing",
    "I daren't swing", 'nobody knows swing', 'no one knows swing',
    'none of us says swing', "I haven't heard swing", 'I did not hear swing',
    "I don't know how to swing", "I don't know the pronunciation of swing",
    "I don't know what swing means", 'no lo se swing', 'no lo conozco swing',
    'no lo quiero swing', 'no puedo hablar swing', 'nao consigo falar swing',
  ];

  for (const fala of casos) {
    const score = similarity('swing', fala);
    assert.equal(score, 0.2, fala);
    assert.equal(starsFromSimilarity(score), 0, fala);
  }
});

test('rodada 6: conectores de fala não criam falso negativo em frases afirmativas', () => {
  const casos = [
    'I hear swing', 'I heard swing', 'I know swing', 'I know how to swing',
    'I can say swing', 'posso falar swing', 'puedo hablar swing', 'I say swing',
  ];

  for (const fala of casos) {
    const score = similarity('swing', fala);
    assert.ok(score >= 0.6, `${fala} devia aprovar, veio ${score}`);
    assert.ok(starsFromSimilarity(score) >= 2, fala);
  }
});

test('rodada 6: negador inicial com pausa é marcador de discurso, mas a negação restante vale', () => {
  for (const fala of [
    'não, quero swing', 'nao, eu quero swing', 'no, quero swing',
    'no, quiero swing', 'no, I want swing',
  ]) {
    const score = similarity('swing', fala);
    assert.ok(score >= 0.6, `${fala} devia aprovar, veio ${score}`);
    assert.ok(starsFromSimilarity(score) >= 2, fala);
  }

  for (const fala of [
    'no swing', 'não e swing', 'não, eu não sei swing', 'no, I do not know swing',
  ]) {
    const score = similarity('swing', fala);
    assert.equal(score, 0.2, fala);
    assert.equal(starsFromSimilarity(score), 0, fala);
  }
});

test('rodada 6: o rótulo do campo é visível, traduzido, associado e tem identificador único', () => {
  installModernDom();
  const ids = [];
  for (const language of ['pt', 'en', 'es']) {
    const panel = typedGame({ lang: language, target: { word: 'sun', gloss: 'sol' } });
    const input = byClass(panel.root, 'rpg-listen-input');
    const label = byClass(panel.root, 'rpg-listen-label');

    assert.equal(label.textContent, DEFAULT_STRINGS.typePlaceholder[language], language);
    assert.equal(label.getAttribute('lang'), language, language);
    assert.equal(label.getAttribute('for'), input.id, language);
    assert.ok(input.id, language);
    assert.equal(input.getAttribute('lang'), 'en', language);
    assert.equal(input.getAttribute('placeholder'), null, language);
    assert.equal(input.getAttribute('aria-label'), null, language);
    assert.equal(label.hidden, input.hidden, language);
    ids.push(input.id);
    panel.game.destroy();
  }

  assert.equal(new Set(ids).size, ids.length);
});

test('rodada 6: rótulo e campo compartilham todos os estados de visibilidade do fallback', () => {
  installModernDom();
  const construction = typedGame();
  const constructionInput = byClass(construction.root, 'rpg-listen-input');
  const constructionLabel = byClass(construction.root, 'rpg-listen-label');
  assert.equal(constructionInput.hidden, false);
  assert.equal(constructionLabel.hidden, false);
  constructionInput.value = 'sun';
  byClass(construction.root, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  assert.equal(constructionInput.disabled, true);
  assert.equal(constructionLabel.hidden, constructionInput.hidden);
  assert.deepEqual(construction.reports, [{ attempts: 1, best: 1, stars: 3, heard: 'sun', passed: true }]);
  construction.game.destroy();

  const recognizers = [];
  const activated = gameWithRecognizers(recognizers, { target: { word: 'sun', gloss: 'sol' } });
  const activatedRoot = activated.container.children[0];
  const activatedInput = byClass(activatedRoot, 'rpg-listen-input');
  const activatedLabel = byClass(activatedRoot, 'rpg-listen-label');
  assert.equal(activatedInput.hidden, true);
  assert.equal(activatedLabel.hidden, true);
  byClass(activatedRoot, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  assert.equal(activatedInput.hidden, true);
  assert.equal(activatedLabel.hidden, true);
  recognizers[0].emit('error', { error: 'not-allowed' });
  assert.equal(activatedInput.hidden, false);
  assert.equal(activatedLabel.hidden, false);
  activated.game.destroy();

  const availableRecognizers = [];
  const voicePath = gameWithRecognizers(availableRecognizers, { target: { word: 'sun', gloss: 'sol' } });
  const voiceRoot = voicePath.container.children[0];
  const voiceInput = byClass(voiceRoot, 'rpg-listen-input');
  const voiceLabel = byClass(voiceRoot, 'rpg-listen-label');
  assert.equal(voiceInput.hidden, true);
  assert.equal(voiceLabel.hidden, true);
  byClass(voiceRoot, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  assert.equal(voiceInput.hidden, true);
  assert.equal(voiceLabel.hidden, true);
  availableRecognizers[0].emit('error', { error: 'network' });
  assert.equal(voiceInput.hidden, true);
  assert.equal(voiceLabel.hidden, true);
  voicePath.game.destroy();
});

test('rodada 6: clearTimeout que lança não interrompe a limpeza do destroy', () => {
  installModernDom();
  const timers = makeTimerHarness();
  const recognizer = makeRecognizer(null, { emitOnAbort: true });
  const voiceListeners = new Set();
  const speech = {
    getVoices: () => [{ lang: 'en-GB' }],
    speak() {},
    cancel() {},
    addEventListener(type, listener) { voiceListeners.add(listener); },
    removeEventListener(type, listener) { voiceListeners.delete(listener); },
  };
  const container = document.createElement('div');
  const reports = [];
  const game = createListen({
    container,
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
    speech,
    onDone: (result) => reports.push(result),
    createRecognizer: () => recognizer,
    recognitionTimeout: 5,
    setTimeout: timers.setTimeout,
    clearTimeout: () => { throw new Error('falha ao cancelar'); },
  });
  const root = container.children[0];
  const audio = byClass(root, 'rpg-listen-audio');
  const repeat = byClass(root, 'rpg-listen-repeat');
  const input = byClass(root, 'rpg-listen-input');
  const close = byClass(root, 'rpg-listen-close');
  audio.dispatchEvent({ type: 'click' });
  repeat.dispatchEvent({ type: 'click' });

  assert.doesNotThrow(() => game.destroy());
  assert.equal(container.children.length, 0);
  assert.equal(recognizer.aborted, 1);
  assert.equal(recognizer.listeners.size, 0);
  assert.equal(voiceListeners.size, 0);
  assert.deepEqual(reports, []);
  assert.doesNotThrow(() => {
    audio.dispatchEvent({ type: 'click' });
    repeat.dispatchEvent({ type: 'click' });
    input.dispatchEvent({ type: 'keydown', key: 'Enter' });
    close.dispatchEvent({ type: 'click' });
  });
  assert.equal(game.getState().attempts, 0);
  assert.deepEqual(reports, []);
});

test('rodada 6: eventos síncronos de result, error e end contam uma única tentativa', () => {
  installModernDom();
  const casos = [
    ['result', recognitionResult('sun'), 1],
    ['error', { error: 'network' }, 0],
    ['end', undefined, 0],
  ];

  for (const [tipo, evento, esperadoOnDone] of casos) {
    const recognizer = makeRecognizer(() => recognizer.emit(tipo, evento));
    const container = document.createElement('div');
    const reports = [];
    const game = createListen({
      container,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
      onDone: (result) => reports.push(result),
      createRecognizer: () => recognizer,
    });
    const repeat = byClass(container.children[0], 'rpg-listen-repeat');

    assert.doesNotThrow(() => repeat.dispatchEvent({ type: 'click' }), tipo);
    assert.equal(recognizer.started, 1, tipo);
    assert.equal(game.getState().attempts, 1, tipo);
    assert.equal(reports.length, esperadoOnDone, tipo);
    assert.equal(recognizer.listeners.size, 0, tipo);
    game.destroy();
  }
});

test('rodada 6: speech sem remoção e addEventListener que registra e lança não impedem o destroy', () => {
  installModernDom();
  for (const defeito of ['sem-remocao', 'registra-e-lanca']) {
    const voiceListeners = new Set();
    const speech = {
      getVoices: () => [],
      speak() {},
      cancel() {},
      addEventListener(type, listener) {
        voiceListeners.add(listener);
        if (defeito === 'registra-e-lanca') throw new Error('falha ao registrar');
      },
    };
    const container = document.createElement('div');
    const reports = [];
    const game = createListen({
      container,
      target: { word: 'sun', gloss: 'sol' },
      reduceMotion: true,
      speech,
      onDone: (result) => reports.push(result),
    });

    assert.equal(voiceListeners.size, 1, defeito);
    assert.doesNotThrow(() => game.destroy(), defeito);
    assert.equal(container.children.length, 0, defeito);
    assert.deepEqual(reports, [], defeito);
  }
});

test('rodada 6: a classe de movimento reduzido acompanha a preferência recebida', () => {
  installModernDom();
  for (const reduceMotion of [true, false]) {
    const panel = typedGame({ reduceMotion });
    const classes = String(panel.root.className || '').split(' ');
    assert.equal(classes.includes('rpg-listen-calm'), reduceMotion);
    panel.game.destroy();
  }
});

// ---------------------------------------------------------------------------
// Rodada 7 — a negação é avaliada no enunciado inteiro, sem janela.
// ---------------------------------------------------------------------------

test('rodada 7: os novos casos medidos reprovam com 0,2 e zero estrelas', () => {
  const casos = [
    'I am not going to swing',
    'I do not know the meaning of swing',
    'I am not able to swing',
    'nao consigo pronunciar swing',
    'ninguem diz swing',
    'nadie dice swing',
    'nunca digo swing',
    'sin poder hablar swing',
    'I do not know what to say about swing',
  ];

  for (const fala of casos) {
    const score = similarity('swing', fala);
    assert.equal(score, 0.2, fala);
    assert.equal(starsFromSimilarity(score), 0, fala);
  }
});

test('rodada 7: o alcance da regra independe da distância entre negador e alvo', () => {
  const casos = [
    'not swing',
    'not alpha beta gamma delta swing',
    'not alpha beta gamma delta epsilon zeta eta theta iota kappa swing',
  ];

  for (const fala of casos) {
    const score = similarity('swing', fala);
    assert.equal(score, 0.2, fala);
    assert.equal(starsFromSimilarity(score), 0, fala);
  }
});

test('rodada 7: a troca de produto reprova frases longas com marcador e preserva a frase afirmativa', () => {
  for (const fala of [
    'the bird is not red and the swing is blue',
    'I have never seen a swing',
    'I really do not know but the word is swing',
    'I do not know what swing means',
  ]) {
    const score = similarity('swing', fala);
    assert.equal(score, 0.2, fala);
    assert.equal(starsFromSimilarity(score), 0, fala);
  }

  const score = similarity('swing', 'I see a bird and the swing');
  assert.ok(score >= 0.6);
  assert.ok(starsFromSimilarity(score) >= 2);
});

test('rodada 7: a lista completa de positivos continua com pelo menos duas estrelas', () => {
  const casos = [
    ['swing', 'swing'],
    ['swing', 'swingg'],
    ['swing', 'the swing'],
    ['swing', 'the word is swing'],
    ['swing', 'I say the word is swing'],
    ['swing', 'I want swing'],
    ['swing', 'I went to swing'],
    ['swing', 'I do swing'],
    ['swing', 'can you do swing'],
    ['sun', 'want sun'],
    ['sun', 'plant sun'],
    ['swing', 'I hear swing'],
    ['swing', 'I heard swing'],
    ['swing', 'I know swing'],
    ['swing', 'I know how to swing'],
    ['swing', 'I can say swing'],
    ['swing', 'I say swing'],
    ['swing', 'posso falar swing'],
    ['swing', 'puedo hablar swing'],
    ['swing', 'I see a bird and the swing'],
  ];

  for (const [alvo, fala] of casos) {
    const score = similarity(alvo, fala);
    assert.ok(score >= 0.6, `${fala} devia aprovar, veio ${score}`);
    assert.ok(starsFromSimilarity(score) >= 2, `${fala} devia dar duas estrelas`);
  }
});

test('rodada 7: dois painéis vivos no mesmo documento têm rótulos distintos e são independentes', () => {
  installModernDom();
  const container = document.createElement('div');
  const reports = [];
  const primeiro = createListen({
    container,
    lang: 'pt',
    target: { word: 'sun', gloss: 'sol' },
    reduceMotion: true,
  });
  const segundo = createListen({
    container,
    lang: 'en',
    target: { word: 'moon', gloss: 'moon' },
    reduceMotion: true,
    onDone: (result) => reports.push(result),
  });
  const primeiroRoot = container.children[0];
  const segundoRoot = container.children[1];
  const primeiroInput = byClass(primeiroRoot, 'rpg-listen-input');
  const segundoInput = byClass(segundoRoot, 'rpg-listen-input');
  const primeiroLabel = byClass(primeiroRoot, 'rpg-listen-label');
  const segundoLabel = byClass(segundoRoot, 'rpg-listen-label');

  assert.notEqual(primeiroLabel.getAttribute('for'), segundoLabel.getAttribute('for'));
  assert.equal(primeiroInput.getAttribute('for'), null);
  assert.equal(segundoInput.getAttribute('for'), null);

  primeiro.destroy();
  assert.equal(container.children.length, 1);
  assert.equal(container.children[0], segundoRoot);

  segundoInput.value = 'moon';
  byClass(segundoRoot, 'rpg-listen-repeat').dispatchEvent({ type: 'click' });
  assert.deepEqual(reports, [{ attempts: 1, best: 1, stars: 3, heard: 'moon', passed: true }]);
  segundo.destroy();
  assert.equal(container.children.length, 0);
});

test('rodada 7: clearTimeout que lança não impede finish nem activateFallback', () => {
  installModernDom();

  const finishTimers = makeTimerHarness();
  const finishRecognizers = [];
  const finished = gameWithRecognizers(finishRecognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: finishTimers.setTimeout,
    clearTimeout: () => { throw new Error('falha ao cancelar no finish'); },
  });
  const finishRepeat = byClass(finished.container.children[0], 'rpg-listen-repeat');
  assert.doesNotThrow(() => finishRepeat.dispatchEvent({ type: 'click' }));
  assert.doesNotThrow(() => finishRecognizers[0].emit('result', recognitionResult('sun')));
  assert.deepEqual(finished.reports, [{ attempts: 1, best: 1, stars: 3, heard: 'sun', passed: true }]);
  finishTimers.runAll();
  assert.equal(finished.game.getState().attempts, 1);
  finished.game.destroy();

  const fallbackTimers = makeTimerHarness();
  const fallbackRecognizers = [];
  const fallback = gameWithRecognizers(fallbackRecognizers, {
    target: { word: 'sun', gloss: 'sol' },
    recognitionTimeout: 5,
    setTimeout: fallbackTimers.setTimeout,
    clearTimeout: () => { throw new Error('falha ao cancelar no fallback'); },
  });
  const fallbackRoot = fallback.container.children[0];
  const fallbackRepeat = byClass(fallbackRoot, 'rpg-listen-repeat');
  fallbackRepeat.dispatchEvent({ type: 'click' });
  assert.doesNotThrow(() => fallbackRecognizers[0].emit('error', { error: 'not-allowed' }));
  assert.equal(byClass(fallbackRoot, 'rpg-listen-input').hidden, false);
  assert.equal(byClass(fallbackRoot, 'rpg-listen-label').hidden, false);
  assert.equal(fallback.game.getState().attempts, 0);
  fallbackTimers.runAll();
  assert.equal(fallback.game.getState().attempts, 0);
  fallback.game.destroy();
});

test('rodada 7: texto malicioso no rótulo permanece texto e não cria elemento', () => {
  installModernDom();
  const maliciousLabel = '<img src=x onerror=boom>';
  const panel = typedGame({
    strings: { typePlaceholder: maliciousLabel },
  });
  const label = byClass(panel.root, 'rpg-listen-label');
  const input = byClass(panel.root, 'rpg-listen-input');

  assert.equal(label.textContent, maliciousLabel);
  assert.equal(label.getAttribute('for'), input.id);
  assert.equal(descendants(panel.root).some((element) => element.tagName === 'IMG'), false);
  panel.game.destroy();
});

// A integração só grava a palavra no diário se GLOSSES tiver a entrada. Sem
// este teste, apagar ou renomear uma das 20 glosas quebraria o diário, o resumo
// e o relatório sem nenhum teste ficar vermelho.
test('todas as palavras da peça têm glosa no diário, nos três idiomas', () => {
  const targets = LISTEN_SPOTS.flatMap((spot) => spot.targets);
  assert.equal(targets.length, 20);
  for (const target of targets) {
    assert.ok(Object.hasOwn(GLOSSES, target.word), `${target.word} precisa existir em GLOSSES`);
    for (const language of ['pt', 'en', 'es']) {
      assert.ok(
        String(GLOSSES[target.word]?.[language] ?? '').length > 0,
        `${target.word} precisa de glosa em ${language}`,
      );
    }
  }
});

