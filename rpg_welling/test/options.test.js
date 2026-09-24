// Testes da tela de opções (roadmap 3.5): normalizeSettings, TEXT_SCALES e
// renderOptionsPanel (radiogroup, switch, callbacks onChange, trilíngue).
//
// Stub de DOM mínimo no espírito de test/a11y.test.js: o helpers/dom-stub.js
// é voltado ao Canvas do three.js (classList.contains fixo em false, sem
// árvore navegável), então aqui o fake espelha EXATAMENTE a superfície que o
// options.js usa — document.createElement, appendChild, setAttribute,
// addEventListener/emit, style, textContent e focus.

import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSettings, renderOptionsPanel, TEXT_SCALES } from '../src/options.js';

let lastFocused = null;

function makeElement(tag) {
  const listeners = new Map();
  const attributes = {};
  const element = {
    tagName: String(tag).toUpperCase(),
    children: [],
    parentNode: null,
    attributes,
    dataset: {},
    style: {},
    className: '',
    textContent: '',
    type: '',
    tabIndex: 0,
    setAttribute(name, value) {
      attributes[name] = String(value);
      if (name === 'id') element.id = String(value);
    },
    getAttribute(name) {
      return name in attributes ? attributes[name] : null;
    },
    removeAttribute(name) {
      delete attributes[name];
    },
    appendChild(child) {
      child.parentNode = element;
      element.children.push(child);
      return child;
    },
    remove() {
      if (!element.parentNode) return;
      const index = element.parentNode.children.indexOf(element);
      if (index >= 0) element.parentNode.children.splice(index, 1);
      element.parentNode = null;
    },
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    removeEventListener(type, handler) {
      listeners.get(type)?.delete(handler);
    },
    emit(type, event = {}) {
      for (const handler of [...(listeners.get(type) || [])]) {
        handler({ preventDefault() {}, stopPropagation() {}, ...event });
      }
    },
    focus() {
      lastFocused = element;
    },
  };
  return element;
}

// options.js só toca `document` dentro de renderOptionsPanel, então instalar
// o fake antes dos testes basta; node --test roda cada arquivo em processo
// próprio, não há risco de vazar para outros módulos de teste.
Object.defineProperty(globalThis, 'document', {
  configurable: true,
  writable: true,
  value: { createElement: (tag) => makeElement(tag) },
});

function walk(node, out = []) {
  for (const child of node.children) {
    out.push(child);
    walk(child, out);
  }
  return out;
}

function findByRole(rootElement, role) {
  return walk(rootElement).filter((node) => node.attributes.role === role);
}

function findAll(rootElement, className) {
  return walk(rootElement).filter((node) => node.className === className);
}

function makePanel() {
  return makeElement('div');
}

test('TEXT_SCALES expõe a ordem canônica dos níveis, congelada', () => {
  assert.deepEqual([...TEXT_SCALES], ['normal', 'large', 'xlarge']);
  assert.equal(Object.isFrozen(TEXT_SCALES), true);
});

test('normalizeSettings devolve os defaults para ausência e lixo de topo', () => {
  const expected = { textScale: 'normal', ambience: true };
  assert.deepEqual(normalizeSettings(), expected);
  assert.deepEqual(normalizeSettings(undefined), expected);
  assert.deepEqual(normalizeSettings(null), expected);
  assert.deepEqual(normalizeSettings('lixeira'), expected);
  assert.deepEqual(normalizeSettings(42), expected);
  assert.deepEqual(normalizeSettings(['large']), expected);
  assert.deepEqual(normalizeSettings(() => {}), expected);
});

test('normalizeSettings preserva valores válidos', () => {
  assert.deepEqual(normalizeSettings({ textScale: 'large', ambience: false }), { textScale: 'large', ambience: false });
  assert.deepEqual(normalizeSettings({ textScale: 'xlarge' }), { textScale: 'xlarge', ambience: true });
  assert.deepEqual(normalizeSettings({ ambience: false }), { textScale: 'normal', ambience: false });
  for (const scale of TEXT_SCALES) {
    assert.equal(normalizeSettings({ textScale: scale }).textScale, scale);
  }
});

test('normalizeSettings descarta valores fora do enum e tipos errados por campo', () => {
  const expected = { textScale: 'normal', ambience: true };
  assert.deepEqual(normalizeSettings({ textScale: 'HUGE' }), expected);
  assert.deepEqual(normalizeSettings({ textScale: 'giant' }), expected);
  assert.deepEqual(normalizeSettings({ textScale: 3 }), expected);
  assert.deepEqual(normalizeSettings({ textScale: null, ambience: null }), expected);
  assert.deepEqual(normalizeSettings({ ambience: 0 }), expected); // só booleano é confiável
  assert.deepEqual(normalizeSettings({ ambience: 'false' }), expected);
  assert.deepEqual(normalizeSettings({ ambience: 1 }), expected);
});

test('normalizeSettings aceita qualquer lixo sem lançar', () => {
  const garbage = [NaN, 0, -1, '', 'true', true && 'x', Symbol?.for?.('x'), {}, [], new Date(), 2 ** 53];
  assert.doesNotThrow(() => {
    for (const item of garbage) normalizeSettings(item);
    normalizeSettings({ textScale: Symbol?.for?.('y'), ambience: [] });
  });
});

test('normalizeSettings é round-trip estável para lixo e para valores válidos', () => {
  const inputs = [
    null,
    7,
    'grande',
    { textScale: 'big', ambience: 1 },
    { textScale: 'large', ambience: false },
    { textScale: 'xlarge', ambience: true },
  ];
  for (const input of inputs) {
    const once = normalizeSettings(input);
    assert.deepEqual(normalizeSettings(once), once, `round-trip falhou para ${JSON.stringify(input) ?? String(input)}`);
  }
});

test('renderOptionsPanel exige um container de verdade', () => {
  assert.throws(() => renderOptionsPanel({ container: null }), TypeError);
  assert.throws(() => renderOptionsPanel({ container: 'não sou elemento' }), TypeError);
  assert.throws(() => renderOptionsPanel({}), TypeError);
});

test('render desenha radiogroup com 3 rádios na ordem de TEXT_SCALES e o switch', () => {
  const panel = makePanel();
  renderOptionsPanel({ container: panel, settings: { textScale: 'large', ambience: false }, lang: 'pt' });

  const groups = findByRole(panel, 'radiogroup');
  assert.equal(groups.length, 1);
  const radios = findByRole(panel, 'radio');
  assert.deepEqual(radios.map((radio) => radio.dataset.scale), ['normal', 'large', 'xlarge']);
  assert.equal(radios.every((radio) => radio.type === 'button'), true);

  // marcado = large: aria-checked e roving tabindex acompanham
  assert.deepEqual(radios.map((radio) => radio.attributes['aria-checked']), ['false', 'true', 'false']);
  assert.deepEqual(radios.map((radio) => radio.tabIndex), [-1, 0, -1]);

  const switches = findByRole(panel, 'switch');
  assert.equal(switches.length, 1);
  assert.equal(switches[0].attributes['aria-checked'], 'false');

  // rótulos amigáveis + preview de tamanho no próprio botão (nada de A/AA/AAA)
  const labels = radios.map((radio) => radio.children[1].textContent);
  assert.deepEqual(labels, ['Normal', 'Grande', 'Gigante']);
  const previews = radios.map((radio) => radio.children[0].textContent);
  assert.deepEqual(previews, ['Aa', 'Aa', 'Aa']);

  // alvos de toque ≥48px garantidos inline
  assert.equal(radios.every((radio) => radio.style.minHeight === '48px' && radio.style.minWidth === '48px'), true);
  assert.equal(switches[0].style.minHeight, '48px');

  // radiogroup rotulado pelo heading da seção
  const heading = walk(panel).find((node) => node.id === 'rpg-options-text-heading');
  assert.equal(groups[0].attributes['aria-labelledby'], heading.id);
});

test('clicar num rádio chama onChange com o partial certo e move o aria-checked', () => {
  const panel = makePanel();
  const changes = [];
  renderOptionsPanel({
    container: panel,
    settings: { textScale: 'normal', ambience: true },
    lang: 'pt',
    onChange: (partial) => changes.push(partial),
  });
  const radios = findByRole(panel, 'radio');

  radios[2].emit('click');
  assert.deepEqual(changes, [{ textScale: 'xlarge' }]);
  assert.deepEqual(radios.map((radio) => radio.attributes['aria-checked']), ['false', 'false', 'true']);
  assert.deepEqual(radios.map((radio) => radio.tabIndex), [-1, -1, 0]);

  changes.length = 0;
  radios[2].emit('click'); // clicar no já marcado não é mudança
  assert.deepEqual(changes, []);
});

test('setas do teclado navegam o radiogroup, com wrap nas duas pontas', () => {
  const panel = makePanel();
  const changes = [];
  renderOptionsPanel({
    container: panel,
    settings: { textScale: 'large', ambience: true },
    lang: 'pt',
    onChange: (partial) => changes.push(partial),
  });
  const radios = findByRole(panel, 'radio');
  changes.length = 0;

  radios[1].emit('keydown', { key: 'ArrowRight' });
  assert.deepEqual(changes, [{ textScale: 'xlarge' }]);
  assert.equal(lastFocused, radios[2]);
  assert.deepEqual(radios.map((radio) => radio.attributes['aria-checked']), ['false', 'false', 'true']);

  radios[2].emit('keydown', { key: 'ArrowDown' }); // wrap: depois do último vem o primeiro
  assert.deepEqual(changes, [{ textScale: 'xlarge' }, { textScale: 'normal' }]);
  assert.equal(lastFocused, radios[0]);

  radios[0].emit('keydown', { key: 'ArrowLeft' }); // wrap: antes do primeiro vem o último
  assert.deepEqual(changes, [{ textScale: 'xlarge' }, { textScale: 'normal' }, { textScale: 'xlarge' }]);
  assert.equal(lastFocused, radios[2]);

  radios[2].emit('keydown', { key: 'ArrowUp' });
  assert.equal(radios[1].attributes['aria-checked'], 'true');

  radios[1].emit('keydown', { key: 'End' });
  assert.equal(radios[2].attributes['aria-checked'], 'true');
  radios[2].emit('keydown', { key: 'Home' });
  assert.equal(radios[0].attributes['aria-checked'], 'true');
});

test('espaço seleciona o rádio focado (o jogo cancela o clique nativo de espaço)', () => {
  const panel = makePanel();
  const changes = [];
  renderOptionsPanel({
    container: panel,
    settings: { textScale: 'xlarge', ambience: true },
    lang: 'pt',
    onChange: (partial) => changes.push(partial),
  });
  const radios = findByRole(panel, 'radio');
  radios[0].emit('keydown', { key: ' ' });
  assert.deepEqual(changes, [{ textScale: 'normal' }]);
  assert.equal(radios[0].attributes['aria-checked'], 'true');
});

test('o switch alterna pelo clique e pelo espaço, um evento por interação', () => {
  const panel = makePanel();
  const changes = [];
  renderOptionsPanel({
    container: panel,
    settings: { textScale: 'normal', ambience: false },
    lang: 'pt',
    onChange: (partial) => changes.push(partial),
  });
  const switchButton = findByRole(panel, 'switch')[0];

  switchButton.emit('click');
  assert.deepEqual(changes, [{ ambience: true }]);
  assert.equal(switchButton.attributes['aria-checked'], 'true');

  switchButton.emit('keydown', { key: ' ' });
  assert.deepEqual(changes, [{ ambience: true }, { ambience: false }]);
  assert.equal(switchButton.attributes['aria-checked'], 'false');

  switchButton.emit('keydown', { key: ' ' });
  assert.deepEqual(changes, [{ ambience: true }, { ambience: false }, { ambience: true }]);
});

test('todo texto do painel é trilíngue e nunca vazio nos três idiomas', () => {
  for (const language of ['pt', 'en', 'es']) {
    const panel = makePanel();
    renderOptionsPanel({ container: panel, settings: {}, lang: language });
    const title = walk(panel).find((node) => node.className === 'rpg-options-title');
    const headings = findAll(panel, 'rpg-options-heading');
    const hints = findAll(panel, 'rpg-options-hint');
    const radioLabels = findByRole(panel, 'radio').map((radio) => radio.children[1].textContent);
    const switchState = findAll(panel, 'rpg-opt-switch-state')[0].textContent;

    assert.ok(title.textContent.length > 0, `título vazio em ${language}`);
    assert.equal(headings.length, 2);
    assert.equal(hints.length, 2);
    for (const heading of headings) assert.ok(heading.textContent.length > 0, `heading vazio em ${language}`);
    for (const hint of hints) assert.ok(hint.textContent.length > 0, `dica vazia em ${language}`);
    for (const label of radioLabels) assert.ok(label.length > 0, `rótulo de rádio vazio em ${language}`);
    assert.ok(switchState.length > 0, `estado do switch vazio em ${language}`);
  }

  const en = makePanel();
  renderOptionsPanel({ container: en, settings: { ambience: true }, lang: 'en' });
  assert.equal(walk(en).find((node) => node.className === 'rpg-options-title').textContent, '⚙️ Options');
  assert.equal(findAll(en, 'rpg-opt-switch-state')[0].textContent, '🔊 On');

  const es = makePanel();
  renderOptionsPanel({ container: es, settings: { ambience: false }, lang: 'es' });
  assert.equal(findAll(es, 'rpg-opt-switch-state')[0].textContent, '🔇 Apagado');
});

test('strings sobrescreve os textos default (string solta ou { pt, en, es })', () => {
  const panel = makePanel();
  renderOptionsPanel({
    container: panel,
    settings: {},
    lang: 'pt',
    strings: { optionsTitle: 'Meu painel', textLarge: { en: 'Big' }, ambience: '' },
  });
  assert.equal(walk(panel).find((node) => node.className === 'rpg-options-title').textContent, 'Meu painel');
  // override { en: 'Big' } com lang pt cai no fallback en; override vazio ('')
  // NÃO apaga o texto: volta o default embutido
  const radioLabels = findByRole(panel, 'radio').map((radio) => radio.children[1].textContent);
  assert.deepEqual(radioLabels, ['Normal', 'Big', 'Gigante']);
  const headings = findAll(panel, 'rpg-options-heading').map((node) => node.textContent);
  assert.deepEqual(headings, ['Tamanho do texto', 'Sons do ambiente']);
});

test('idioma inválido cai em pt e settings de lixo caem nos defaults', () => {
  const panel = makePanel();
  renderOptionsPanel({ container: panel, settings: 'lixo', lang: 'fr' });
  assert.equal(walk(panel).find((node) => node.className === 'rpg-options-title').textContent, '⚙️ Opções');
  assert.equal(findByRole(panel, 'radio')[0].attributes['aria-checked'], 'true');
  assert.equal(findByRole(panel, 'switch')[0].attributes['aria-checked'], 'true');
});

test('update() sincroniza os controles sem disparar onChange', () => {
  const panel = makePanel();
  const changes = [];
  const api = renderOptionsPanel({
    container: panel,
    settings: { textScale: 'normal', ambience: true },
    lang: 'pt',
    onChange: (partial) => changes.push(partial),
  });
  api.update({ textScale: 'xlarge', ambience: false, lixo: 'ignorado' });
  assert.deepEqual(changes, []);
  const radios = findByRole(panel, 'radio');
  assert.deepEqual(radios.map((radio) => radio.attributes['aria-checked']), ['false', 'false', 'true']);
  assert.deepEqual(radios.map((radio) => radio.tabIndex), [-1, -1, 0]);
  assert.equal(findByRole(panel, 'switch')[0].attributes['aria-checked'], 'false');
});

test('destroy() remove o corpo e render de novo no mesmo container não empilha', () => {
  const panel = makePanel();
  const first = renderOptionsPanel({ container: panel, settings: {}, lang: 'pt' });
  assert.equal(findAll(panel, 'rpg-options').length, 1);

  first.destroy();
  assert.equal(findAll(panel, 'rpg-options').length, 0);
  assert.equal(panel.children.includes(first.wrapper), false);

  const changes = [];
  renderOptionsPanel({ container: panel, settings: { textScale: 'large' }, lang: 'pt', onChange: (p) => changes.push(p) });
  assert.equal(findAll(panel, 'rpg-options').length, 1, 'render repetido duplicou o corpo');

  findByRole(panel, 'radio')[2].emit('click'); // large já está marcado: clicar em xlarge prova que é o corpo novo que responde
  assert.deepEqual(changes, [{ textScale: 'xlarge' }]); // listeners do corpo antigo não vazam
});

test('onChange é opcional: interagir sem callback não lança', () => {
  const panel = makePanel();
  renderOptionsPanel({ container: panel, settings: {}, lang: 'pt' });
  assert.doesNotThrow(() => {
    findByRole(panel, 'radio')[1].emit('click');
    findByRole(panel, 'switch')[0].emit('click');
    findByRole(panel, 'radio')[0].emit('keydown', { key: 'ArrowRight' });
  });
});
