import test from 'node:test';
import assert from 'node:assert/strict';
import { openModalStack, shouldReduceMotion, trapFocus } from '../src/a11y.js';

function makeDocument() {
  const listeners = new Map();
  return {
    activeElement: null,
    addEventListener(type, handler) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(handler);
    },
    removeEventListener(type, handler) {
      listeners.get(type)?.delete(handler);
    },
    emit(type, event = {}) {
      for (const handler of listeners.get(type) || []) handler(event);
    },
    listenerCount(type) {
      return listeners.get(type)?.size || 0;
    },
  };
}

function makeFocusable(document, properties = {}) {
  return {
    isConnected: true,
    offsetParent: {},
    focus() { document.activeElement = this; },
    ...properties,
  };
}

function makeTrap(document, children, options = {}) {
  const container = {
    ownerDocument: document,
    isConnected: true,
    offsetParent: {},
    children: new Set(children),
    addEventListener() {},
    removeEventListener() {},
    contains(element) { return element === container || this.children.has(element); },
    getAttribute() { return null; },
    setAttribute() {},
    removeAttribute() {},
    focus() { document.activeElement = container; },
    ...options.container,
  };
  for (const child of children) container.children.add(child);
  return container;
}

test('openModalStack pushes, reports the top dialog, and closes in LIFO order', () => {
  while (openModalStack.isOpen()) openModalStack.closeTop();
  const first = { name: 'first' };
  const second = { name: 'second' };

  assert.equal(openModalStack.isOpen(), false);
  assert.equal(openModalStack.top(), null);
  assert.equal(openModalStack.push(first), first);
  assert.equal(openModalStack.push(second), second);
  assert.equal(openModalStack.top(), second);
  assert.equal(openModalStack.isOpen(), true);
  assert.equal(openModalStack.closeTop(), second);
  assert.equal(openModalStack.top(), first);
  assert.equal(openModalStack.closeTop(), first);
  assert.equal(openModalStack.isOpen(), false);
  assert.equal(openModalStack.closeTop(), null);
});

test('shouldReduceMotion follows window.matchMedia and is safe without matchMedia', () => {
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const setWindow = (value) => Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value,
  });

  try {
    setWindow(undefined);
    assert.equal(shouldReduceMotion(), false);
    setWindow({ matchMedia: undefined });
    assert.equal(shouldReduceMotion(), false);
    setWindow({ matchMedia: (query) => ({ matches: query === '(prefers-reduced-motion: reduce)' }) });
    assert.equal(shouldReduceMotion(), true);
    setWindow({ matchMedia: () => ({ matches: false }) });
    assert.equal(shouldReduceMotion(), false);
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
    else delete globalThis.window;
  }
});

test('trapFocus smoke-tests wrapping and restoring focus with a small fake DOM', () => {
  const document = makeDocument();
  const first = makeFocusable(document);
  const last = makeFocusable(document);
  const previous = makeFocusable(document);
  const container = makeTrap(document, [first, last]);
  document.activeElement = previous;
  const release = trapFocus(container, {
    activeElement: previous,
    getFocusableElements: () => [first, last],
  });

  document.activeElement = last;
  document.emit('keydown', { key: 'Tab', preventDefault() { this.prevented = true; } });
  assert.equal(document.activeElement, first);

  document.activeElement = first;
  document.emit('keydown', { key: 'Tab', shiftKey: true, preventDefault() {} });
  assert.equal(document.activeElement, last);

  release();
  assert.equal(document.activeElement, previous);
  assert.equal(document.listenerCount('keydown'), 0);
  assert.equal(document.listenerCount('focusin'), 0);
});

test('trapFocus focuses a container that has no focusable children', () => {
  const document = makeDocument();
  const container = makeTrap(document, []);

  const release = trapFocus(container, { getFocusableElements: () => [] });
  assert.equal(document.activeElement, container);
  document.emit('keydown', { key: 'Tab', preventDefault() {} });
  assert.equal(document.activeElement, container);
  release();
});

test('trapFocus requeries controls after the focused option is removed', () => {
  const document = makeDocument();
  const first = makeFocusable(document);
  const last = makeFocusable(document);
  const previous = makeFocusable(document);
  let controls = [first, last];
  const container = makeTrap(document, [first, last]);
  document.activeElement = previous;
  const release = trapFocus(container, {
    activeElement: previous,
    getFocusableElements: () => controls,
  });

  document.activeElement = last;
  container.children.delete(last);
  controls = [first];
  document.emit('keydown', { key: 'Tab', preventDefault() { this.prevented = true; } });
  assert.equal(document.activeElement, first);
  release();
});

test('trapFocus excludes hidden and disabled candidates', () => {
  const document = makeDocument();
  const hidden = makeFocusable(document, { hidden: true });
  const disabled = makeFocusable(document, { disabled: true });
  const visible = makeFocusable(document);
  const previous = makeFocusable(document);
  const container = makeTrap(document, [hidden, disabled, visible]);
  const release = trapFocus(container, {
    activeElement: previous,
    getFocusableElements: () => [hidden, disabled, visible],
  });

  document.activeElement = visible;
  document.emit('keydown', { key: 'Tab', preventDefault() {} });
  assert.equal(document.activeElement, visible);
  release();
});

test('trapFocus redirects focus leaving the panel according to Tab direction', () => {
  const document = makeDocument();
  const outside = makeFocusable(document);
  const first = makeFocusable(document);
  const last = makeFocusable(document);
  const previous = makeFocusable(document);
  const container = makeTrap(document, [first, last]);
  const release = trapFocus(container, {
    activeElement: previous,
    getFocusableElements: () => [first, last],
  });

  document.activeElement = first;
  document.emit('keydown', { key: 'Tab', shiftKey: true, preventDefault() {} });
  document.activeElement = outside;
  document.emit('focusin', { target: outside });
  assert.equal(document.activeElement, last);

  document.activeElement = last;
  document.emit('keydown', { key: 'Tab', preventDefault() {} });
  document.activeElement = outside;
  document.emit('focusin', { target: outside });
  assert.equal(document.activeElement, first);
  release();
});

test('trapFocus falls back when the original opener is disconnected', () => {
  const document = makeDocument();
  const previous = makeFocusable(document, { isConnected: false });
  const fallback = makeFocusable(document);
  const first = makeFocusable(document);
  const container = makeTrap(document, [first]);
  const release = trapFocus(container, {
    activeElement: previous,
    fallbackFocusTarget: fallback,
    getFocusableElements: () => [first],
  });

  release();
  assert.equal(document.activeElement, fallback);
});

test('openModalStack rejects duplicates and closes the requested record', () => {
  while (openModalStack.isOpen()) openModalStack.closeTop();
  const first = { name: 'first' };
  const second = { name: 'second' };
  const third = { name: 'third' };
  let firstReleased = 0;
  let thirdReleased = 0;

  assert.equal(openModalStack.push(first, { release: () => { firstReleased += 1; } }), first);
  assert.equal(openModalStack.push(first), null);
  assert.equal(openModalStack.push(second), second);
  assert.equal(openModalStack.push(third, { release: () => { thirdReleased += 1; } }), third);
  assert.equal(openModalStack.size(), 3);

  assert.equal(openModalStack.close(first), first);
  assert.equal(firstReleased, 1);
  assert.equal(openModalStack.top(), third);
  assert.equal(openModalStack.closeTop(), third);
  assert.equal(thirdReleased, 1);
  assert.equal(openModalStack.closeTop(), second);
  assert.equal(openModalStack.closeTop(), null);
  assert.equal(openModalStack.isEmpty(), true);
});
