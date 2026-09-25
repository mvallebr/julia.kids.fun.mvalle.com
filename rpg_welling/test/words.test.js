// Testes do painel de vocabulário dos lugares.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GLOSSES } from '../src/content.js';
import { installDomStub } from './helpers/dom-stub.js';
import {
  DEFAULT_STRINGS,
  WORDS_SPOTS,
  createWords,
  createWordsState,
  glossTranslation,
  revealWord,
  revealedWords,
  resolveText,
  spotById,
} from '../src/games/words.js';

function descendants(element) {
  return element.children.flatMap((child) => [child, ...descendants(child)]);
}

function byClass(element, className) {
  return descendants(element).find((child) => String(child.className || '').split(' ').includes(className));
}

function buttons(root) {
  return descendants(root).filter((element) => element.tagName === 'BUTTON');
}

test('spotById encontra as cinco zonas e devolve null para id desconhecido', () => {
  assert.deepEqual(WORDS_SPOTS.map((spot) => spot.id), ['school', 'woods', 'highstreet', 'classroom', 'academy']);
  for (const spot of WORDS_SPOTS) assert.equal(spotById(spot.id), spot);
  assert.equal(spotById('unknown'), null);
  assert.equal(spotById(undefined), null);
});

test('todas as palavras têm glosa, três idiomas e emoji', () => {
  for (const spot of WORDS_SPOTS) {
    assert.equal(spot.words.length, 4, spot.id);
    for (const language of ['pt', 'en', 'es']) {
      assert.equal(typeof spot.title[language], 'string');
      assert.ok(spot.title[language].length > 0);
    }
    for (const word of spot.words) {
      assert.ok(Object.hasOwn(GLOSSES, word.key), `${spot.id}/${word.key} precisa existir em GLOSSES`);
      assert.equal(typeof word.emoji, 'string');
      assert.ok(word.emoji.length > 0);
      assert.ok(glossTranslation(word.key, 'pt').length > 0);
      assert.ok(glossTranslation(word.key, 'en').length > 0);
      assert.ok(glossTranslation(word.key, 'es').length > 0);
    }
  }
});

test('a lógica pura abre cada palavra uma vez e mantém a ordem do spot', () => {
  const state = createWordsState(spotById('school'));
  assert.deepEqual(revealedWords(state), []);
  assert.equal(revealWord(state, 'run'), true);
  assert.equal(revealWord(state, 'run'), false);
  assert.equal(revealWord(state, 'not-in-spot'), false);
  assert.equal(revealWord(state, 'jump'), true);
  assert.deepEqual(revealedWords(state), ['run', 'jump']);
  assert.throws(() => revealWord({}, 'run'), TypeError);
  const school = spotById('school');
  assert.throws(() => createWordsState({ ...school, words: school.words.slice(0, 3) }), TypeError);
  assert.throws(() => createWordsState({ ...school, words: [...school.words, school.words[0]] }), TypeError);
  assert.throws(() => createWordsState({
    ...school,
    words: [
      { key: 'invented', emoji: '❓' },
      ...school.words.slice(0, 3),
    ],
  }), TypeError);
  assert.throws(() => createWordsState({
    ...school,
    words: [{ key: '', emoji: '❓' }, ...school.words.slice(0, 3)],
  }), TypeError);
  assert.throws(() => createWordsState({
    ...school,
    words: [null, ...school.words.slice(0, 3)],
  }), TypeError);
});

test('a resolução de textos e traduções funciona nos três idiomas', () => {
  for (const language of ['pt', 'en', 'es']) {
    assert.equal(DEFAULT_STRINGS.save[language], resolveText(undefined, 'save', language));
    assert.equal('Custom', resolveText({ save: { [language]: 'Custom' } }, 'save', language));
  }
  assert.equal(resolveText({ es: { save: 'Guardar' } }, 'save', 'es'), 'Guardar');
  assert.equal(resolveText({ save: { es: '' } }, 'save', 'en'), DEFAULT_STRINGS.save.en);
  assert.equal(glossTranslation('book', 'pt'), 'livro');
  assert.equal(glossTranslation('book', 'es'), 'páginas unidas dentro de una portada');
});

test('o painel renderiza teclado, a11y e esconde a audição sem voz', () => {
  installDomStub();
  const container = document.createElement('div');
  const game = createWords({ container, lang: 'pt', spot: spotById('classroom'), reduceMotion: true });
  const root = container.children[0];
  const feedback = byClass(root, 'rpg-words-feedback');
  const list = byClass(root, 'rpg-words-list');
  const words = buttons(root).filter((button) => button.className.includes('rpg-words-word'));
  const listens = buttons(root).filter((button) => button.className.includes('rpg-words-listen'));

  assert.equal(root.getAttribute('role'), 'group');
  assert.ok(root.getAttribute('aria-label').length > 0);
  assert.equal(feedback.getAttribute('role'), 'status');
  assert.equal(feedback.getAttribute('aria-live'), 'polite');
  assert.equal(list.getAttribute('role'), 'list');
  assert.equal(words.length, 4);
  assert.equal(root.className.includes('rpg-words-calm'), true);
  assert.ok(buttons(root).every((button) => button.style.minWidth === '44px' && button.style.minHeight === '44px'));
  assert.ok(listens.every((button) => button.hidden && button.disabled));
  assert.ok(descendants(root).filter((element) => element.className?.includes('rpg-words-english'))
    .every((element) => element.getAttribute('lang') === 'en' && element.textContent.length > 0));
  assert.ok(descendants(root).filter((element) => element.className?.includes('rpg-words-translation'))
    .every((element) => element.getAttribute('lang') === 'pt' && element.hidden && element.textContent.length > 0));

  game.destroy();
  assert.equal(container.children.length, 0);
});

test('onDone recebe somente as palavras abertas pela criança, na ordem do spot', () => {
  installDomStub();
  const container = document.createElement('div');
  const reports = [];
  const game = createWords({
    container,
    lang: 'es',
    spot: spotById('school'),
    reduceMotion: true,
    onDone: (report) => reports.push(report),
  });
  const root = container.children[0];
  const words = buttons(root).filter((button) => button.className.includes('rpg-words-word'));
  const save = byClass(root, 'rpg-words-save');
  assert.equal(save.disabled, true);

  words[2].dispatchEvent({ type: 'click' });
  words[0].dispatchEvent({ type: 'click' });
  words[2].dispatchEvent({ type: 'click' });
  assert.deepEqual(game.getState().words, ['swing', 'jump']);
  assert.deepEqual(reports, []);
  assert.equal(save.disabled, false);
  assert.equal(words[0].getAttribute('aria-expanded'), 'true');
  assert.equal(words[1].getAttribute('aria-expanded'), 'false');
  assert.equal(byClass(root, 'rpg-words-feedback-word').getAttribute('lang'), 'en');
  assert.equal(byClass(root, 'rpg-words-feedback-translation').getAttribute('lang'), 'es');

  save.dispatchEvent({ type: 'click' });
  save.dispatchEvent({ type: 'click' });
  assert.deepEqual(reports, [{ words: ['swing', 'jump'] }]);
  assert.equal(game.getState().done, true);
  assert.ok(words.every((button) => button.disabled));
  game.destroy();
});

test('onDone sem retorno mantém sucesso e zero/false informa que nada foi salvo', () => {
  installDomStub();
  const cases = [
    { language: 'pt', result: undefined, message: DEFAULT_STRINGS.saved.pt },
    { language: 'en', result: 2, message: DEFAULT_STRINGS.saved.en },
    { language: 'en', result: 0, message: DEFAULT_STRINGS.noneSaved.en },
    { language: 'es', result: false, message: DEFAULT_STRINGS.noneSaved.es },
  ];

  for (const scenario of cases) {
    const container = document.createElement('div');
    let reports = 0;
    const game = createWords({
      container,
      lang: scenario.language,
      spot: spotById('classroom'),
      reduceMotion: true,
      onDone: () => {
        reports += 1;
        return scenario.result;
      },
    });
    const root = container.children[0];
    const word = buttons(root).find((button) => button.className.includes('rpg-words-word'));
    const save = byClass(root, 'rpg-words-save');

    word.dispatchEvent({ type: 'click' });
    save.dispatchEvent({ type: 'click' });
    save.dispatchEvent({ type: 'click' });

    assert.equal(byClass(root, 'rpg-words-feedback').textContent, scenario.message, scenario.language);
    assert.equal(reports, 1, scenario.language);
    assert.equal(save.disabled, true, scenario.language);
    assert.equal(game.getState().done, true, scenario.language);
    game.destroy();
  }
});

test('onDone que lança mostra erro, não propaga e permite fechar', () => {
  installDomStub();

  for (const language of ['pt', 'en', 'es']) {
    const container = document.createElement('div');
    let closed = 0;
    const game = createWords({
      container,
      lang: language,
      spot: spotById('academy'),
      reduceMotion: true,
      onDone: () => { throw new Error('falha de persistência do host'); },
      onClose: () => { closed += 1; },
    });
    const root = container.children[0];
    const word = buttons(root).find((button) => button.className.includes('rpg-words-word'));
    const save = byClass(root, 'rpg-words-save');
    const close = byClass(root, 'rpg-words-close');

    word.dispatchEvent({ type: 'click' });
    assert.doesNotThrow(() => save.dispatchEvent({ type: 'click' }), language);
    assert.equal(byClass(root, 'rpg-words-feedback').textContent, DEFAULT_STRINGS.saveError[language], language);
    assert.equal(save.disabled, true, language);
    assert.equal(close.disabled, false, language);
    assert.equal(game.getState().done, true, language);

    assert.doesNotThrow(() => close.dispatchEvent({ type: 'click' }), language);
    assert.equal(closed, 1, language);
    game.destroy();
  }
});

test('a audição en-GB usa a voz compatível e desaparece quando não há voz', () => {
  installDomStub();
  const spoken = [];
  let cancelled = 0;
  const voiceListeners = new Set();
  const speech = {
    getVoices: () => [{ lang: 'en-GB' }],
    speak: (utterance) => spoken.push(utterance),
    cancel: () => { cancelled += 1; },
    addEventListener: (type, listener) => { if (type === 'voiceschanged') voiceListeners.add(listener); },
    removeEventListener: (type, listener) => { if (type === 'voiceschanged') voiceListeners.delete(listener); },
  };
  const container = document.createElement('div');
  const game = createWords({ container, lang: 'en', spot: spotById('woods'), speech, reduceMotion: true });
  const root = container.children[0];
  const listen = byClass(root, 'rpg-words-listen');
  assert.equal(listen.hidden, false);
  assert.equal(listen.disabled, false);
  listen.dispatchEvent({ type: 'click' });
  assert.equal(spoken.length, 1);
  assert.equal(spoken[0].text, 'woods');
  assert.equal(spoken[0].lang, 'en-GB');
  assert.equal(spoken[0].voice.lang, 'en-GB');
  assert.equal(voiceListeners.size, 1);

  speech.getVoices = () => [];
  for (const listener of voiceListeners) listener();
  assert.equal(listen.hidden, true);
  assert.equal(listen.disabled, true);

  game.destroy();
  assert.equal(cancelled, 2);
  assert.equal(voiceListeners.size, 0);
  listen.dispatchEvent({ type: 'click' });
  assert.equal(spoken.length, 1);
});

test('destroy remove listeners, impede callbacks e limpa o DOM', () => {
  installDomStub();
  const container = document.createElement('div');
  const reports = [];
  let closed = 0;
  const game = createWords({
    container,
    lang: 'pt',
    spot: spotById('academy'),
    reduceMotion: true,
    onDone: (report) => reports.push(report),
    onClose: () => { closed += 1; },
  });
  const root = container.children[0];
  const word = buttons(root).find((button) => button.className.includes('rpg-words-word'));
  const save = byClass(root, 'rpg-words-save');
  const close = byClass(root, 'rpg-words-close');
  const before = game.getState();

  game.destroy();
  word.dispatchEvent({ type: 'click' });
  save.dispatchEvent({ type: 'click' });
  close.dispatchEvent({ type: 'click' });
  assert.deepEqual(game.getState(), before);
  assert.deepEqual(reports, []);
  assert.equal(closed, 0);
  assert.equal(container.children.length, 0);
  game.destroy();
});

test('createWords retorna null para entradas inválidas sem criar DOM ou tocar em speech', () => {
  installDomStub();
  const container = document.createElement('div');
  const originalCreateElement = document.createElement;
  const listeners = new Set();
  let added = 0;
  let removed = 0;
  let created = 0;
  const speech = {
    addEventListener: (type, listener) => {
      added += 1;
      if (type === 'voiceschanged') listeners.add(listener);
    },
    removeEventListener: (type, listener) => {
      removed += 1;
      if (type === 'voiceschanged') listeners.delete(listener);
    },
  };
  document.createElement = (tagName) => {
    created += 1;
    return originalCreateElement(tagName);
  };

  try {
    assert.equal(createWords(), null);
    assert.equal(createWords({ container, speech }), null);
    assert.equal(createWords({ container: {}, speech }), null);
    assert.equal(createWords({ container, spot: null, speech }), null);
    assert.equal(createWords({ container, spot: spotById('desconhecido'), speech }), null);
    const school = spotById('school');
    assert.equal(createWords({ container, spot: { ...school }, speech }), null);
    assert.equal(createWords({ container, spot: { ...school, words: school.words.slice(0, 3) }, speech }), null);
    assert.equal(container.children.length, 0);
    assert.equal(created, 0);
    assert.equal(added, 0);
    assert.equal(removed, 0);
    assert.equal(listeners.size, 0);
  } finally {
    document.createElement = originalCreateElement;
  }
});

test('strings parciais usam o idioma ativo sem deixar textos vazios', () => {
  installDomStub();
  const spot = spotById('classroom');
  const portugueseContainer = document.createElement('div');
  const portugueseStrings = createWords({
    container: portugueseContainer,
    lang: 'en',
    spot,
    strings: { pt: { save: 'Salvar', close: 'Fechar' } },
    reduceMotion: true,
  });
  const portugueseRoot = portugueseContainer.children[0];

  assert.equal(byClass(portugueseRoot, 'rpg-words-save').textContent, DEFAULT_STRINGS.save.en);
  assert.equal(byClass(portugueseRoot, 'rpg-words-close').textContent, DEFAULT_STRINGS.close.en);
  assert.ok(byClass(portugueseRoot, 'rpg-words-title').textContent.length > 0);
  assert.ok(byClass(portugueseRoot, 'rpg-words-instructions').textContent.length > 0);
  portugueseStrings.destroy();

  const spanishContainer = document.createElement('div');
  const spanishStrings = createWords({
    container: spanishContainer,
    lang: 'en',
    spot,
    strings: { es: { save: 'Guardar', close: 'Cerrar' } },
    reduceMotion: true,
  });
  const spanishRoot = spanishContainer.children[0];

  assert.equal(byClass(spanishRoot, 'rpg-words-save').textContent, DEFAULT_STRINGS.save.en);
  assert.equal(byClass(spanishRoot, 'rpg-words-close').textContent, DEFAULT_STRINGS.close.en);
  assert.ok(byClass(spanishRoot, 'rpg-words-title').textContent.length > 0);
  assert.ok(byClass(spanishRoot, 'rpg-words-instructions').textContent.length > 0);
  spanishStrings.destroy();
});

test('salvar e fechar são seguros sem onDone e onClose', () => {
  installDomStub();
  const container = document.createElement('div');
  const game = createWords({ container, spot: spotById('school'), reduceMotion: true });
  const root = container.children[0];
  const save = byClass(root, 'rpg-words-save');
  const close = byClass(root, 'rpg-words-close');

  save.dispatchEvent({ type: 'click' });
  assert.equal(game.getState().done, true);
  close.dispatchEvent({ type: 'click' });
  assert.equal(container.children.length, 0);
});

test('duas instâncias do mesmo spot isolam estado e usam IDs de tradução distintos', () => {
  installDomStub();
  const spot = spotById('school');
  const firstContainer = document.createElement('div');
  const secondContainer = document.createElement('div');
  const first = createWords({ container: firstContainer, spot, reduceMotion: true });
  const second = createWords({ container: secondContainer, spot, reduceMotion: true });
  const firstRoot = firstContainer.children[0];
  const secondRoot = secondContainer.children[0];
  const firstWords = buttons(firstRoot).filter((button) => button.className.includes('rpg-words-word'));
  const secondWords = buttons(secondRoot).filter((button) => button.className.includes('rpg-words-word'));
  const translations = [...descendants(firstRoot), ...descendants(secondRoot)]
    .filter((element) => element.className?.includes('rpg-words-translation'));

  firstWords[0].dispatchEvent({ type: 'click' });
  secondWords[1].dispatchEvent({ type: 'click' });
  byClass(firstRoot, 'rpg-words-save').dispatchEvent({ type: 'click' });

  assert.deepEqual(first.getState().words, ['swing']);
  assert.equal(first.getState().done, true);
  assert.deepEqual(second.getState().words, ['run']);
  assert.equal(second.getState().done, false);
  assert.equal(byClass(secondRoot, 'rpg-words-save').disabled, false);
  assert.equal(new Set(translations.map((translation) => translation.id)).size, 8);
  assert.equal(firstWords[0].getAttribute('aria-describedby'), translations[0].id);
  assert.equal(secondWords[1].getAttribute('aria-describedby'), translations[5].id);
  first.destroy();
  second.destroy();
});

test('todas as 20 palavras têm glosa direta não vazia em pt, en e es', () => {
  const words = WORDS_SPOTS.flatMap((spot) => spot.words);
  assert.equal(words.length, 20);
  assert.equal(new Set(words.map((word) => word.key)).size, 20);

  for (const word of words) {
    for (const language of ['pt', 'en', 'es']) {
      const gloss = GLOSSES[word.key][language];
      assert.equal(typeof gloss, 'string', `${word.key}.${language}`);
      assert.ok(gloss.trim().length > 0, `${word.key}.${language}`);
    }
  }
});

test('speech que lança ao registrar voz é revertido e não impede o painel real', () => {
  installDomStub();
  const registeredListeners = new Set();
  let addCalls = 0;
  let removeCalls = 0;
  const brokenSpeech = {
    getVoices: () => [],
    speak: () => {},
    addEventListener: (type, listener) => {
      addCalls += 1;
      registeredListeners.add(listener);
      throw new Error('falha ao registrar voz');
    },
    removeEventListener: (type, listener) => {
      removeCalls += 1;
      registeredListeners.delete(listener);
    },
  };
  const rejectedContainer = document.createElement('div');
  let rejected = null;

  assert.doesNotThrow(() => {
    rejected = createWords({
      container: rejectedContainer,
      spot: spotById('school'),
      speech: brokenSpeech,
      reduceMotion: true,
    });
  });
  assert.equal(rejected, null);
  assert.equal(rejectedContainer.children.length, 0);
  assert.equal(addCalls, 1);
  assert.equal(removeCalls, 1);
  assert.equal(registeredListeners.size, 0);

  const workingListeners = new Set();
  const workingSpeech = {
    getVoices: () => [],
    speak: () => {},
    addEventListener: (type, listener) => workingListeners.add(listener),
    removeEventListener: (type, listener) => workingListeners.delete(listener),
  };
  const workingContainer = document.createElement('div');
  const working = createWords({
    container: workingContainer,
    spot: spotById('school'),
    speech: workingSpeech,
    reduceMotion: true,
  });
  assert.ok(working);
  assert.equal(workingContainer.children.length, 1);
  assert.equal(workingListeners.size, 1);
  working.destroy();
  assert.equal(workingContainer.children.length, 0);
  assert.equal(workingListeners.size, 0);
});

test('rollback inativo sobrevive a add e removeEventListener lançadores', () => {
  installDomStub();
  const originalCreateElement = document.createElement;
  const createdElements = [];
  const registeredListeners = new Set();
  let getVoicesCalls = 0;
  let removeCalls = 0;
  let completedReports = 0;
  let closedReports = 0;
  const speech = {
    getVoices: () => {
      getVoicesCalls += 1;
      return [{ lang: 'en-GB' }];
    },
    speak: () => {},
    addEventListener: (type, listener) => {
      registeredListeners.add(listener);
      throw new Error('falha ao adicionar voz');
    },
    removeEventListener: () => {
      removeCalls += 1;
      throw new Error('falha ao remover voz');
    },
  };
  const container = document.createElement('div');
  document.createElement = (tagName) => {
    const element = originalCreateElement(tagName);
    createdElements.push(element);
    return element;
  };
  let rejected = null;

  try {
    assert.doesNotThrow(() => {
      rejected = createWords({
        container,
        spot: spotById('school'),
        speech,
        reduceMotion: true,
        onDone: () => { completedReports += 1; },
        onClose: () => { closedReports += 1; },
      });
    });
  } finally {
    document.createElement = originalCreateElement;
  }

  assert.equal(rejected, null);
  assert.equal(container.children.length, 0);
  assert.equal(removeCalls, 1);
  assert.equal(registeredListeners.size, 1);
  const word = createdElements.find((element) => element.className?.includes('rpg-words-word'));
  const translation = createdElements.find((element) => element.className?.includes('rpg-words-translation'));
  const save = createdElements.find((element) => element.className?.includes('rpg-words-save'));
  const close = createdElements.find((element) => element.className?.includes('rpg-words-close'));

  for (const listener of registeredListeners) listener();
  word.dispatchEvent({ type: 'click' });
  save.dispatchEvent({ type: 'click' });
  close.dispatchEvent({ type: 'click' });

  assert.equal(getVoicesCalls, 0);
  assert.equal(translation.hidden, true);
  assert.equal(word.getAttribute('aria-expanded'), 'false');
  assert.equal(completedReports, 0);
  assert.equal(closedReports, 0);
  assert.equal(container.children.length, 0);
});

test('destroy tolera speech sem removeEventListener e cancel que lança', () => {
  installDomStub();
  let cancelCalls = 0;
  const speech = {
    getVoices: () => [{ lang: 'en-GB' }],
    speak: () => {},
    cancel: () => {
      cancelCalls += 1;
      if (cancelCalls > 1) throw new Error('falha ao cancelar');
    },
    addEventListener: () => {},
  };
  const container = document.createElement('div');
  const game = createWords({ container, spot: spotById('woods'), speech, reduceMotion: true });
  const root = container.children[0];
  byClass(root, 'rpg-words-listen').dispatchEvent({ type: 'click' });

  assert.equal(cancelCalls, 1);
  assert.doesNotThrow(() => game.destroy());
  assert.equal(cancelCalls, 2);
  assert.equal(container.children.length, 0);
});

test('o título da academia usa o nome canônico Owlburt nos três idiomas', () => {
  const academy = spotById('academy');
  for (const language of ['pt', 'en', 'es']) {
    assert.ok(academy.title[language].includes('Owlburt'), `${language}: ${academy.title[language]}`);
    assert.ok(!academy.title[language].includes('Rivall'), `${language}: ${academy.title[language]}`);
  }
});
