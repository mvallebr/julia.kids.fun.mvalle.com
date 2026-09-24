// Este stub simula o Canvas e os poucos objetos do navegador usados pelos
// construtores de zonas do three.js. Ele valida a RIGOR DE CHAMADA —
// argumentos que o navegador rejeitaria — e não o resultado do desenho.
//
// Limitações deliberadas: os métodos de desenho são no-ops; putImageData nunca
// persiste; measureText sempre devolve 10; getContext ignora o tipo solicitado;
// classList.contains sempre devolve false; e eventos DOM/Window não são
// disparados pelo stub. A única exceção é a simulação assíncrona de load/error
// de IMG, necessária para que o TextureLoader exercite seu caminho de sucesso.
// O validador de cores é deliberadamente um subconjunto estreito de CSS:
// aceita #rgb, #rrggbb, rgb/rgba e hsl/hsla com vírgulas, mas não é um parser
// completo e não aceita todas as formas modernas (como rgb() com espaços).

const installedGlobals = new Map();
const gradientStops = [];

const CSS_NUMBER = String.raw`(?:[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?%?)`;
const CSS_PERCENT = String.raw`[+-]?(?:\d+(?:\.\d*)?|\.\d+)%`;
const CSS_ALPHA = String.raw`(?:${CSS_NUMBER}|(?:\d+(?:\.\d*)?|\.\d+))`;
const CSS_RGB = new RegExp(String.raw`^rgba?\(\s*${CSS_NUMBER}(?:\s*,\s*${CSS_NUMBER}){2}(?:\s*,\s*${CSS_ALPHA})?\s*\)$`, 'i');
const CSS_HSL = new RegExp(String.raw`^hsla?\(\s*[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:deg|grad|rad|turn)?\s*,\s*${CSS_PERCENT}\s*,\s*${CSS_PERCENT}(?:\s*,\s*${CSS_ALPHA})?\s*\)$`, 'i');
const CSS_HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

function isValidCssColor(color) {
  if (typeof color !== 'string') return false;
  const normalized = color.trim();
  return CSS_HEX.test(normalized) || CSS_RGB.test(normalized) || CSS_HSL.test(normalized);
}

class CanvasGradient {
  constructor(kind, canvas) {
    this.kind = kind;
    this.canvas = canvas;
    this.stops = [];
  }

  addColorStop(offset, color) {
    const numericOffset = Number(offset);
    if (!Number.isFinite(numericOffset) || numericOffset < 0 || numericOffset > 1) {
      throw new TypeError(`The offset '${String(offset)}' is outside the range [0,1]`);
    }
    if (!isValidCssColor(color)) {
      throw new TypeError(`The color '${String(color)}' could not be parsed as a color`);
    }
    this.stops.push({ offset: numericOffset, color });
    gradientStops.push({ gradient: this, offset: numericOffset, color });
  }
}

class CanvasPattern {
  constructor(image, repetition) {
    this.image = image;
    this.repetition = repetition;
  }
}

function makeImageData(width, height, data = null) {
  const normalizedWidth = Math.max(0, Math.floor(Number(width) || 0));
  const normalizedHeight = Math.max(0, Math.floor(Number(height) || 0));
  const expectedLength = normalizedWidth * normalizedHeight * 4;
  const pixels = data && data.length >= expectedLength
    ? new Uint8ClampedArray(data.buffer ? data.subarray(0, expectedLength) : data.slice(0, expectedLength))
    : new Uint8ClampedArray(expectedLength);
  return { data: pixels, width: normalizedWidth, height: normalizedHeight };
}

function makeContext(canvas) {
  const context = {
    canvas,
    fillStyle: '#000000',
    strokeStyle: '#000000',
    lineWidth: 1,
    font: '10px sans-serif',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, 0)',
    lineCap: 'butt',
    lineJoin: 'miter',
    filter: 'none',
    imageSmoothingEnabled: true,
    miterLimit: 10,
    fillRect() {},
    clearRect() {},
    beginPath() {},
    arc() {},
    ellipse() {},
    moveTo() {},
    lineTo() {},
    quadraticCurveTo() {},
    bezierCurveTo() {},
    closePath() {},
    roundRect() {},
    fill() {},
    stroke() {},
    save() {},
    restore() {},
    translate() {},
    rotate() {},
    scale() {},
    setTransform() {},
    transform() {},
    drawImage() {},
    putImageData() {},
    getImageData() { return makeImageData(canvas.width, canvas.height); },
    measureText() { return { width: 10 }; },
    createLinearGradient() { return new CanvasGradient('linear', canvas); },
    createRadialGradient() { return new CanvasGradient('radial', canvas); },
    createPattern(image, repetition) { return new CanvasPattern(image, repetition); },
    createImageData(width, height) { return makeImageData(width, height); },
    fillText() {},
    strokeText() {},
  };
  return context;
}

function makeElement(tagName) {
  const listeners = new Map();
  const element = {
    tagName: String(tagName).toUpperCase(),
    style: {},
    dataset: {},
    children: [],
    width: 0,
    height: 0,
    appendChild(child) { this.children.push(child); return child; },
    removeChild(child) { this.children = this.children.filter((item) => item !== child); },
    setAttribute(name, value) { this[name] = String(value); },
    getAttribute(name) { return this[name] == null ? null : String(this[name]); },
    removeAttribute(name) { delete this[name]; },
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
    },
    removeEventListener(type, callback) { listeners.get(type)?.delete(callback); },
    dispatchEvent(event) {
      for (const callback of listeners.get(event?.type) || []) callback.call(this, event);
      return true;
    },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  };
  if (element.tagName === 'CANVAS') {
    let context;
    element.getContext = () => (context ||= makeContext(element));
    element.toDataURL = () => 'data:image/png;base64,';
  } else if (element.tagName === 'IMG') {
    Object.defineProperty(element, 'src', {
      configurable: true,
      enumerable: true,
      get() { return this._src || ''; },
      set(value) {
        this._src = String(value);
        this.complete = false;
        setTimeout(() => {
          this.complete = true;
          this.dispatchEvent({ type: 'load' });
        }, 0);
      },
    });
    element.width = 1600;
    element.height = 900;
    element.naturalWidth = 1600;
    element.naturalHeight = 900;
    element.complete = false;
  }
  return element;
}

function makeWindow() {
  const listeners = new Map();
  return {
    innerWidth: 1024,
    innerHeight: 768,
    devicePixelRatio: 1,
    addEventListener(type, callback) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(callback);
    },
    removeEventListener(type, callback) { listeners.get(type)?.delete(callback); },
    dispatchEvent() { return true; },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
  };
}

export function getGradientStops() {
  return gradientStops.map(({ gradient, offset, color }) => ({ gradient, offset, color }));
}

export function installDomStub() {
  if (installedGlobals.size) return;
  const window = makeWindow();
  const document = {
    createElement: makeElement,
    createElementNS: (_namespace, name) => makeElement(name),
    getElementById: () => null,
    querySelectorAll: () => [],
    addEventListener() {},
    removeEventListener() {},
  };
  const storage = new Map();
  const localStorage = {
    getItem(key) { return storage.has(String(key)) ? storage.get(String(key)) : null; },
    setItem(key, value) { storage.set(String(key), String(value)); },
    removeItem(key) { storage.delete(String(key)); },
    clear() { storage.clear(); },
  };
  const navigator = { userAgent: 'node-dom-stub', language: 'en-US', languages: ['en-US'] };
  const location = { href: 'http://localhost/', protocol: 'http:', search: '', pathname: '/' };
  const matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  const requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 0);
  const cancelAnimationFrame = (id) => clearTimeout(id);
  const AudioContext = class AudioContextStub {
    constructor() { this.destination = {}; this.currentTime = 0; }
    createGain() { return { gain: { value: 1 }, connect() {}, disconnect() {} }; }
    createBufferSource() { return { connect() {}, start() {}, stop() {} }; }
    resume() {}
    suspend() {}
    close() { return Promise.resolve(); }
  };
  const globals = {
    document,
    window,
    navigator,
    performance: globalThis.performance || { now: () => Date.now() },
    requestAnimationFrame,
    cancelAnimationFrame,
    Image: class ImageStub {
      constructor() { return makeElement('img'); }
    },
    self: window,
    location,
    matchMedia,
    localStorage,
    AudioContext,
    webkitAudioContext: AudioContext,
  };
  if (!globalThis.crypto) {
    globals.crypto = { randomUUID: () => '00000000-0000-4000-8000-000000000000' };
  }
  for (const [name, value] of Object.entries(globals)) {
    installedGlobals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  }
  gradientStops.length = 0;
}

export function removeDomStub() {
  for (const [name, descriptor] of installedGlobals) {
    if (descriptor) {
      Object.defineProperty(globalThis, name, descriptor);
    } else {
      delete globalThis[name];
    }
  }
  installedGlobals.clear();
  gradientStops.length = 0;
}
