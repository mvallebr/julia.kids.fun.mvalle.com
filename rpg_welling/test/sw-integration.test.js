// Integração do service worker real: o arquivo é carregado por vm, com Cache
// API, fetch e importScripts simulados apenas em memória; nenhum servidor/porta.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const {
  APP_CACHE_PREFIX,
  META_CACHE_NAME,
  SHARED_CACHE_NAME,
  FALLBACK_CACHE_NAME,
} = require('../../sw-cache-name.js');
const swSource = readFileSync(fileURLToPath(new URL('../../sw.js', import.meta.url)), 'utf8');
const helperSource = readFileSync(fileURLToPath(new URL('../../sw-cache-name.js', import.meta.url)), 'utf8');
const ORIGIN = 'https://julia.kids.fun.mvalle.com';
const META_URL = `${ORIGIN}/__julia-kids-active-cache__`;
const OTHER_CACHE = 'julia-kids-runtime-outro-app-v1';
const OLD_CACHE = `${APP_CACHE_PREFIX}release-41`;
const NEW_CACHE = `${APP_CACHE_PREFIX}release-42`;
const THIRD_CACHE = `${APP_CACHE_PREFIX}release-43`;

class FakeHeaders {
  constructor(init = {}) {
    this.values = new Map();
    const entries = init instanceof FakeHeaders ? init.values : Object.entries(init);
    for (const [name, value] of entries) this.values.set(name.toLowerCase(), String(value));
  }

  get(name) {
    return this.values.get(name.toLowerCase()) || null;
  }
}

class FakeRequest {
  constructor(input, init = {}) {
    const source = typeof input === 'string' ? input : input.url;
    this.url = new URL(source, ORIGIN).toString();
    this.method = init.method || (typeof input === 'string' ? 'GET' : input.method) || 'GET';
    this.mode = init.mode || (typeof input === 'string' ? '' : input.mode) || '';
    this.destination = init.destination || (typeof input === 'string' ? '' : input.destination) || '';
  }
}

class FakeResponse {
  constructor(body = '', init = {}) {
    this.body = String(body);
    this.status = init.status === undefined ? 200 : init.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.type = init.type || 'basic';
    this.redirected = init.redirected === true;
    this.url = init.url || '';
    this.headers = init.headers instanceof FakeHeaders
      ? new FakeHeaders(init.headers)
      : new FakeHeaders(init.headers || {});
  }

  clone() {
    return new FakeResponse(this.body, {
      status: this.status,
      type: this.type,
      redirected: this.redirected,
      url: this.url,
      headers: this.headers,
    });
  }

  async text() {
    return this.body;
  }

  static error() {
    return new FakeResponse('', { status: 0, type: 'error' });
  }
}

function keyFor(request) {
  return typeof request === 'string' ? new URL(request, ORIGIN).toString() : request.url;
}

function samePath(left, right) {
  const a = new URL(left);
  const b = new URL(right);
  return a.origin === b.origin && a.pathname === b.pathname;
}

class MemoryCache {
  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  get entries() {
    if (!this.store.maps.has(this.name)) this.store.maps.set(this.name, new Map());
    return this.store.maps.get(this.name);
  }

  async put(request, response) {
    if (this.store.failPutNames.has(this.name)) throw new Error(`falha put ${this.name}`);
    this.entries.set(keyFor(request), response.clone());
  }

  async match(request, options = {}) {
    if (this.store.beforeMatch) await this.store.beforeMatch(this.name, request);
    const wanted = keyFor(request);
    if (!options.ignoreSearch && this.entries.has(wanted)) return this.entries.get(wanted).clone();
    for (const [key, response] of this.entries) {
      if (options.ignoreSearch && samePath(key, wanted)) return response.clone();
    }
    return undefined;
  }

  async keys() {
    return [...this.entries.keys()].map((url) => ({ url }));
  }

  async delete(request) {
    return this.entries.delete(keyFor(request));
  }
}

class MemoryCaches {
  constructor() {
    this.maps = new Map();
    this.failPutNames = new Set();
    this.beforeDelete = null;
    this.beforeOpen = null;
    this.beforeMatch = null;
    this.beforeHas = null;
  }

  seed(name, entries) {
    const cache = this.openSync(name);
    for (const [url, body, init = {}] of entries) {
      cache.entries.set(url, new FakeResponse(body, { url, ...init }).clone());
    }
  }

  openSync(name) {
    if (!this.maps.has(name)) this.maps.set(name, new Map());
    return new MemoryCache(this, name);
  }

  async open(name) {
    if (this.beforeOpen) await this.beforeOpen(name);
    return this.openSync(name);
  }

  async has(name) {
    if (this.beforeHas) await this.beforeHas(name);
    return this.maps.has(name);
  }

  async keys() {
    return [...this.maps.keys()];
  }

  async delete(name) {
    if (this.beforeDelete) await this.beforeDelete(name);
    return this.maps.delete(name);
  }
}

function htmlBody(version) {
  return `<!doctype html><script defer src="lib/bundle.js?v=${version}"></script>`;
}

function responseFor(url, version, overrides = {}) {
  return new FakeResponse(htmlBody(version), {
    url,
    headers: { 'content-type': 'text/html; charset=utf-8' },
    ...overrides,
  });
}

function seedRpg(store, cacheName, version, htmlUrl = `${ORIGIN}/rpg_welling/index.html`) {
  store.seed(cacheName, [
    [htmlUrl, htmlBody(version), { headers: { 'content-type': 'text/html' } }],
    [`${ORIGIN}/rpg_welling/lib/bundle.js?v=${version}`, `console.log('${version}');`, {
      headers: { 'content-type': 'application/javascript' },
    }],
  ]);
}

function seedMetadata(store, cacheName) {
  // Uma Response criada pelo construtor não tem URL; o Cache Storage usa a
  // chave do Request como fonte da verdade para Localizar o metadado.
  const metadataCache = store.openSync(META_CACHE_NAME);
  metadataCache.entries.set(
    META_URL,
    new FakeResponse(cacheName, { headers: { 'content-type': 'text/plain' } }).clone(),
  );
}

function createHarness({
  store = new MemoryCaches(),
  responses = {},
  failPutNames = [],
  beforeDelete = null,
  beforeOpen = null,
  beforeMatch = null,
  beforeHas = null,
} = {}) {
  const listeners = new Map();
  store.beforeDelete = beforeDelete;
  store.beforeOpen = beforeOpen;
  store.beforeMatch = beforeMatch;
  store.beforeHas = beforeHas;
  const self = {
    location: { origin: ORIGIN },
    addEventListener(type, listener) {
      const current = listeners.get(type) || [];
      current.push(listener);
      listeners.set(type, current);
    },
  };
  for (const name of failPutNames) store.failPutNames.add(name);

  const fetchRequest = async (request) => {
    const key = keyFor(request);
    const value = responses[key];
    if (typeof value === 'function') return value(request);
    if (value) return value;
    throw new Error(`offline: ${key}`);
  };
  const context = vm.createContext({
    self,
    caches: store,
    fetch: fetchRequest,
    importScripts: (path) => {
      assert.equal(path, './sw-cache-name.js');
      vm.runInContext(helperSource, context, { filename: 'sw-cache-name.js' });
    },
    URL,
    Request: FakeRequest,
    Response: FakeResponse,
    Headers: FakeHeaders,
    console,
  });
  vm.runInContext(swSource, context, { filename: 'sw.js' });
  assert.equal(typeof self.JuliaKidsSwCacheName, 'object');

  async function dispatch(type, extra = {}) {
    const pending = [];
    let response;
    const event = {
      ...extra,
      waitUntil(promise) {
        pending.push(Promise.resolve(promise));
      },
      respondWith(promise) {
        response = Promise.resolve(promise);
      },
    };
    for (const listener of listeners.get(type) || []) listener(event);
    await Promise.all(pending);
    if (type === 'fetch' && response === undefined) response = fetchRequest(event.request);
    return response;
  }

  return {
    store,
    self,
    dispatch,
    fetch(request) {
      return dispatch('fetch', { request });
    },
  };
}

test('integração 1: HTML do RPG com ?v= novo rotaciona sem apagar a reserva antiga', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  store.seed(OTHER_CACHE, [[`${ORIGIN}/maths_adventure/index.html`, 'maths']]);
  const response = responseFor(`${ORIGIN}/rpg_welling/index.html`, 'release-42');
  const harness = createHarness({ store, responses: { [response.url]: response } });

  const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, { mode: 'navigate' }));

  assert.equal(result, response);
  assert.equal((await store.has(NEW_CACHE)), true);
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(META_CACHE_NAME)), true);
  assert.equal((await store.has(OTHER_CACHE)), true);
  const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
  assert.equal(await metadata.text(), NEW_CACHE);
  const rotated = await store.open(NEW_CACHE);
  assert.ok(await rotated.match(`${ORIGIN}/rpg_welling/index.html`));
});

test('integração 1-A: metadado gravado por rotação é aceito após reinício', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const htmlUrl = `${ORIGIN}/rpg_welling/index.html`;
  const html42 = responseFor(htmlUrl, 'release-42');
  const js42Url = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js42 = new FakeResponse("console.log('release-42');", {
    url: js42Url,
    headers: { 'content-type': 'application/javascript' },
  });
  const firstWorker = createHarness({ store, responses: { [htmlUrl]: html42 } });

  await firstWorker.fetch(new FakeRequest(htmlUrl, { mode: 'navigate' }));
  const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
  assert.equal(metadata.url, '');
  assert.equal(await metadata.text(), NEW_CACHE);
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), true);

  const restarted = createHarness({ store, responses: { [js42Url]: js42 } });
  const duringRotation = await restarted.fetch(new FakeRequest(htmlUrl, { mode: 'navigate' }));
  assert.equal(await duringRotation.text(), htmlBody('release-41'));
  assert.equal((await store.has(OLD_CACHE)), true);
  const bundle = await restarted.fetch(new FakeRequest(js42Url, { destination: 'script' }));
  assert.equal(await bundle.text(), "console.log('release-42');");
  assert.equal((await store.has(OLD_CACHE)), false);
  assert.equal((await store.has(NEW_CACHE)), true);
});

test('integração 2: resposta JavaScript com URL final fora do RPG é devolvida intacta', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const jsUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=42`;
  const response = new FakeResponse("console.log('maths');", {
    url: `${ORIGIN}/maths_adventure/lib/bundle.js`,
    redirected: false,
    headers: { 'content-type': 'application/javascript' },
  });
  const harness = createHarness({ store, responses: { [jsUrl]: response } });
  const before = await store.keys();

  const result = await harness.fetch(new FakeRequest(jsUrl, { destination: 'script' }));

  assert.equal(result, response);
  assert.equal(await result.text(), "console.log('maths');");
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), false);
  assert.deepEqual(await store.keys(), before);
  const oldCache = await store.open(OLD_CACHE);
  assert.equal(await oldCache.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`) !== undefined, true);
  assert.equal(await oldCache.match(`${ORIGIN}/maths_adventure/lib/bundle.js`) !== undefined, false);
});

test('integração 3: resposta HTML redirecionada não substitui a cópia boa', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const response = responseFor(`${ORIGIN}/rpg_welling/index.html`, 'release-42', { redirected: true });
  const harness = createHarness({ store, responses: { [response.url]: response } });

  const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, { mode: 'navigate' }));

  assert.equal(await result.text(), htmlBody('release-41'));
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), false);
});

test('integração 4: metadado para cache inexistente cai na reconstrução comprovada', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, NEW_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const harness = createHarness({ store });

  const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, { mode: 'navigate' }));

  assert.equal(await result.text(), htmlBody('release-41'));
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), false);
});

test('integração 4-A: resposta de metadados inválida força reconstrução segura', async () => {
  for (const invalid of [
    { status: 206, type: 'basic', redirected: false, contentType: 'text/plain' },
    { status: 200, type: 'basic', redirected: true, contentType: 'text/plain' },
    { status: 200, type: 'opaque', redirected: false, contentType: 'text/plain' },
    { status: 200, type: 'basic', redirected: false, contentType: 'text/html' },
  ]) {
    const store = new MemoryCaches();
    seedRpg(store, OLD_CACHE, 'release-41');
    store.seed(NEW_CACHE, [[`${ORIGIN}/rpg_welling/index.html`, htmlBody('release-42'), {
      headers: { 'content-type': 'text/html' },
    }]]);
    store.seed(META_CACHE_NAME, [[META_URL, NEW_CACHE, {
      status: invalid.status,
      type: invalid.type,
      redirected: invalid.redirected,
      url: '',
      headers: { 'content-type': invalid.contentType },
    }]]);
    const harness = createHarness({ store });

    const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, {
      mode: 'navigate',
    }));

    assert.equal(await result.text(), htmlBody('release-41'));
    assert.equal((await store.has(OLD_CACHE)), true);
    assert.equal((await store.has(NEW_CACHE)), true);
  }

  const validStore = new MemoryCaches();
  seedRpg(validStore, OLD_CACHE, 'release-41');
  seedRpg(validStore, NEW_CACHE, 'release-42');
  validStore.seed(META_CACHE_NAME, [[META_URL, NEW_CACHE, {
    url: '',
    headers: { 'content-type': 'text/plain' },
  }]]);
  const validWorker = createHarness({ store: validStore });
  const valid = await validWorker.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, {
    mode: 'navigate',
  }));
  assert.equal(await valid.text(), htmlBody('release-42'));

  const store = new MemoryCaches();
  seedRpg(store, OLD_CACHE, 'release-41');
  store.seed(NEW_CACHE, [[`${ORIGIN}/rpg_welling/index.html`, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  const wrongKey = `${ORIGIN}/maths_adventure/__active-cache__`;
  const metadataCache = store.openSync(META_CACHE_NAME);
  metadataCache.entries.set(
    wrongKey,
    new FakeResponse(NEW_CACHE, { headers: { 'content-type': 'text/plain' } }).clone(),
  );
  const harness = createHarness({ store });
  const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, {
    mode: 'navigate',
  }));
  assert.equal(await result.text(), htmlBody('release-41'));
});

test('integração 5: reinício com metadados recupera HTML e JS do namespace versionado', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41', `${ORIGIN}/rpg_welling/?seed=1`);
  const harness = createHarness({ store });

  const html = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/?x=1`, { mode: 'navigate' }));
  const js = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`, {
    destination: 'script',
  }));

  assert.equal(await html.text(), htmlBody('release-41'));
  assert.equal(await js.text(), `console.log('release-41');`);
});

test('integração 6: falha ao gravar cache novo ou metadados não apaga o cache antigo', async () => {
  for (const falha of ['new-cache', 'metadata']) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const response = responseFor(`${ORIGIN}/rpg_welling/index.html`, 'release-42');
    const failPutNames = falha === 'new-cache' ? [NEW_CACHE] : [META_CACHE_NAME];
    const harness = createHarness({ store, responses: { [response.url]: response }, failPutNames });

    await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, { mode: 'navigate' }));

    assert.equal((await store.has(OLD_CACHE)), true, falha);
    const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
    assert.equal(await metadata.text(), OLD_CACHE, falha);
  }
});

test('integração 7: navegações concorrentes deixam um único ativo consistente', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  store.seed(OTHER_CACHE, [[`${ORIGIN}/maths_adventure/index.html`, 'maths']]);
  const responses = {
    [`${ORIGIN}/rpg_welling/index.html?first=1`]: responseFor(
      `${ORIGIN}/rpg_welling/index.html?first=1`,
      'release-42',
    ),
    [`${ORIGIN}/rpg_welling/index.html?second=1`]: responseFor(
      `${ORIGIN}/rpg_welling/index.html?second=1`,
      'release-43',
    ),
  };
  const harness = createHarness({ store, responses });

  await Promise.all([
    harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html?first=1`, { mode: 'navigate' })),
    harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html?second=1`, { mode: 'navigate' })),
  ]);

  assert.equal((await store.has(THIRD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), true);
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(OTHER_CACHE)), true);
  const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
  assert.equal(await metadata.text(), THIRD_CACHE);
  assert.equal((await store.has(await metadata.text())), true);
});

test('integração 9: HTML não-navegação redirecionado para fora não grava no RPG', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const requestUrl = `${ORIGIN}/rpg_welling/extra.html`;
  const response = new FakeResponse('<h1>Maths</h1>', {
    url: `${ORIGIN}/maths_adventure/extra.html`,
    redirected: true,
    headers: { 'content-type': 'text/html' },
  });
  const harness = createHarness({ store, responses: { [requestUrl]: response } });

  const result = await harness.fetch(new FakeRequest(requestUrl, { mode: 'cors' }));

  assert.equal(await result.text(), '<h1>Maths</h1>');
  const oldCache = await store.open(OLD_CACHE);
  assert.equal(await oldCache.match(requestUrl), undefined);
  assert.equal((await store.has(NEW_CACHE)), false);
  assert.equal(await oldCache.match(`${ORIGIN}/maths_adventure/extra.html`), undefined);
});

test('integração 10: estático redirecionado para fora não grava no RPG', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const requestUrl = `${ORIGIN}/rpg_welling/assets/scene.css`;
  const response = new FakeResponse('body { color: red; }', {
    url: `${ORIGIN}/maths_adventure/assets/scene.css`,
    redirected: true,
    headers: { 'content-type': 'text/css' },
  });
  const harness = createHarness({ store, responses: { [requestUrl]: response } });

  const result = await harness.fetch(new FakeRequest(requestUrl));

  assert.equal(await result.text(), 'body { color: red; }');
  const oldCache = await store.open(OLD_CACHE);
  assert.equal(await oldCache.match(requestUrl), undefined);
  assert.equal(await oldCache.match(`${ORIGIN}/maths_adventure/assets/scene.css`), undefined);
});

test('integração 11: replaceByPath rejeita redirect mesmo com URL final dentro do RPG', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const requestUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=42`;
  const response = new FakeResponse("console.log('redirect');", {
    url: `${ORIGIN}/rpg_welling/lib/outro-bundle.js?v=42`,
    redirected: true,
    headers: { 'content-type': 'application/javascript' },
  });
  const harness = createHarness({ store, responses: { [requestUrl]: response } });
  const before = await store.keys();

  const result = await harness.fetch(new FakeRequest(requestUrl, { destination: 'script' }));

  assert.equal(result, response);
  assert.equal(await result.text(), "console.log('redirect');");
  assert.deepEqual(await store.keys(), before);
  const oldCache = await store.open(OLD_CACHE);
  assert.equal(await oldCache.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`) !== undefined, true);
  assert.equal(await oldCache.match(requestUrl), undefined);
});

test('integração 12: fallback offline entrega HTML e bundle da mesma reserva completa', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const onlineHtml = responseFor(`${ORIGIN}/rpg_welling/index.html`, 'release-42');
  const online = createHarness({ store, responses: { [onlineHtml.url]: onlineHtml } });

  await online.fetch(new FakeRequest(onlineHtml.url, { mode: 'navigate' }));
  const offline = createHarness({ store });
  const html = await offline.fetch(new FakeRequest(
    `${ORIGIN}/rpg_welling/index.html?offline=1`,
    { mode: 'navigate' },
  ));
  const htmlText = await html.text();
  const version = htmlText.match(/lib\/bundle\.js\?v=([^"']+)/)[1];
  const js = await offline.fetch(new FakeRequest(
    `${ORIGIN}/rpg_welling/lib/bundle.js?v=${version}`,
    { destination: 'script' },
  ));

  assert.equal(htmlText, htmlBody('release-41'));
  assert.equal(version, 'release-41');
  assert.equal(await js.text(), `console.log('release-41');`);
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), true);
  const active = await store.open(NEW_CACHE);
  assert.equal(await active.match(`${ORIGIN}/rpg_welling/index.html`) !== undefined, true);
  assert.equal(await active.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`), undefined);
  const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
  assert.equal(await metadata.text(), NEW_CACHE);
});

test('integração 13: bundle válido completa a reserva e libera a limpeza pós-rotação', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  store.seed(OTHER_CACHE, [[`${ORIGIN}/maths_adventure/index.html`, 'maths']]);
  const html = responseFor(`${ORIGIN}/rpg_welling/index.html`, 'release-42');
  const jsUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js = new FakeResponse("console.log('release-42');", {
    url: jsUrl,
    headers: { 'content-type': 'application/javascript' },
  });
  const harness = createHarness({ store, responses: { [html.url]: html, [jsUrl]: js } });

  await harness.fetch(new FakeRequest(html.url, { mode: 'navigate' }));
  assert.equal((await store.has(OLD_CACHE)), true);
  const result = await harness.fetch(new FakeRequest(jsUrl, { destination: 'script' }));

  assert.equal(await result.text(), "console.log('release-42');");
  assert.equal((await store.has(NEW_CACHE)), true);
  assert.equal((await store.has(OLD_CACHE)), false);
  assert.equal((await store.has(OTHER_CACHE)), true);
});

test('integração 14: JS atrasado realmente concorrente não entra no cache ativo', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const html42 = responseFor(`${ORIGIN}/rpg_welling/index.html?deploy=42`, 'release-42');
  const html43 = responseFor(`${ORIGIN}/rpg_welling/index.html?deploy=43`, 'release-43');
  const js42Url = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js42 = new FakeResponse("console.log('release-42');", {
    url: js42Url,
    headers: { 'content-type': 'application/javascript' },
  });
  let releaseJs;
  const jsGate = new Promise((resolve) => { releaseJs = resolve; });
  const harness = createHarness({
    store,
    responses: {
      [html42.url]: html42,
      [html43.url]: html43,
      [js42Url]: async () => { await jsGate; return js42; },
    },
  });

  const stale = harness.fetch(new FakeRequest(js42Url, { destination: 'script' }));
  await Promise.resolve();
  await harness.fetch(new FakeRequest(html42.url, { mode: 'navigate' }));
  await harness.fetch(new FakeRequest(html43.url, { mode: 'navigate' }));
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), true);
  assert.equal((await store.has(THIRD_CACHE)), true);
  releaseJs();
  const result = await stale;

  assert.equal(result, js42);
  assert.equal(await result.text(), "console.log('release-42');");
  const old = await store.open(OLD_CACHE);
  const middle = await store.open(NEW_CACHE);
  const active = await store.open(THIRD_CACHE);
  assert.ok(await old.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`));
  assert.equal(await middle.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`), undefined);
  assert.equal(await active.match(js42Url), undefined);
  const activeHtml = await active.match(`${ORIGIN}/rpg_welling/index.html?deploy=43`);
  assert.ok(activeHtml);
  const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
  assert.equal(await metadata.text(), THIRD_CACHE);
});

test('integração 15: dependências compartilhadas sobrevivem à rotação e à limpeza', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const resources = [
    ['/manifest.webmanifest', '{"name":"RPG"}', 'application/manifest+json'],
    ['/julia_world/fonts/fonts.css', '@font-face{}', 'text/css'],
    ['/julia_world/fonts/fredoka-latin.woff2', 'fredoka', 'font/woff2'],
    ['/julia_world/fonts/luckiest-guy-latin.woff2', 'luckiest', 'font/woff2'],
  ];
  const responses = Object.fromEntries(resources.map(([path, body, type]) => {
    const url = `${ORIGIN}${path}`;
    return [url, new FakeResponse(body, {
      url,
      headers: { 'content-type': type },
    })];
  }));
  const html42 = responseFor(`${ORIGIN}/rpg_welling/index.html?deploy=42`, 'release-42');
  const js42Url = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  responses[html42.url] = html42;
  responses[js42Url] = new FakeResponse("console.log('release-42');", {
    url: js42Url,
    headers: { 'content-type': 'application/javascript' },
  });
  const harness = createHarness({ store, responses });

  for (const [path, body] of resources) {
    const result = await harness.fetch(new FakeRequest(`${ORIGIN}${path}`));
    assert.equal(await result.text(), body);
  }
  assert.equal((await store.has(SHARED_CACHE_NAME)), true);
  const shared = await store.open(SHARED_CACHE_NAME);
  for (const [path] of resources) {
    assert.ok(await shared.match(`${ORIGIN}${path}`), path);
  }
  const old = await store.open(OLD_CACHE);
  for (const [path] of resources) {
    assert.equal(await old.match(`${ORIGIN}${path}`), undefined, path);
  }

  await harness.fetch(new FakeRequest(html42.url, { mode: 'navigate' }));
  await harness.fetch(new FakeRequest(js42Url, { destination: 'script' }));
  assert.equal((await store.has(OLD_CACHE)), false);
  assert.equal((await store.has(SHARED_CACHE_NAME)), true);

  const offline = createHarness({ store });
  for (const [path, body] of resources) {
    const result = await offline.fetch(new FakeRequest(`${ORIGIN}${path}`));
    assert.equal(await result.text(), body, path);
  }
});

test('integração 16: launcher e outro jogo são network-only sem tocar no RPG', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const launcherUrl = `${ORIGIN}/`;
  const mathsUrl = `${ORIGIN}/maths_adventure/`;
  const before = await store.keys();
  const harness = createHarness({
    store,
    responses: {
      [launcherUrl]: new FakeResponse('launcher', { url: launcherUrl }),
      [mathsUrl]: new FakeResponse('maths', { url: mathsUrl }),
    },
  });

  const launcher = await harness.fetch(new FakeRequest(launcherUrl));
  const maths = await harness.fetch(new FakeRequest(mathsUrl));

  assert.equal(await launcher.text(), 'launcher');
  assert.equal(await maths.text(), 'maths');
  assert.deepEqual(await store.keys(), before);
  const active = await store.open(OLD_CACHE);
  assert.equal(await active.match(launcherUrl), undefined);
  assert.equal(await active.match(mathsUrl), undefined);
});

test('integração 17: respostas JavaScript inválidas não substituem a variante boa', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const cases = [
    new FakeResponse("console.log('mime');", {
      url: `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`,
      headers: { 'content-type': 'text/plain' },
    }),
    new FakeResponse("console.log('partial');", {
      url: `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-43`,
      status: 206,
      headers: { 'content-type': 'application/javascript' },
    }),
    new FakeResponse("console.log('opaque');", {
      url: `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-44`,
      type: 'opaque',
      headers: { 'content-type': 'application/javascript' },
    }),
  ];
  const responses = Object.fromEntries(cases.map((response) => [response.url, response]));
  const harness = createHarness({ store, responses });
  const before = await store.keys();

  for (const response of cases) {
    const result = await harness.fetch(new FakeRequest(response.url, { destination: 'script' }));
    assert.equal(result, response);
  }
  assert.deepEqual(await store.keys(), before);
  const oldCache = await store.open(OLD_CACHE);
  assert.equal(await oldCache.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`) !== undefined, true);
  for (const response of cases) assert.equal(await oldCache.match(response.url), undefined);
});

test('integração 17-A: MIME JavaScript com sufixo não substitui o bundle bom', async () => {
  for (const badType of ['application/javascript+json', 'application/javascript-patch']) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const bundleUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`;
    const bad = new FakeResponse("console.log('ruim');", {
      url: bundleUrl,
      headers: { 'content-type': badType },
    });
    const harness = createHarness({ store, responses: { [bundleUrl]: bad } });

    const result = await harness.fetch(new FakeRequest(bundleUrl, { destination: 'script' }));

    assert.equal(await result.text(), "console.log('release-41');");
    const cache = await store.open(OLD_CACHE);
    assert.equal((await cache.match(bundleUrl)).body, "console.log('release-41');");
  }
});

test('integração 18: MIME correto é cacheado e MIME inesperado não substitui cópia', async () => {
  const cases = [
    ['/rpg_welling/assets/scene.glb', 'model/gltf-binary', 'glb', false],
    ['/rpg_welling/assets/panel.png', 'image/png', 'png', false],
    ['/manifest.webmanifest', 'application/manifest+json', '{}', true],
    ['/julia_world/fonts/fonts.css', 'text/css', 'body{}', true],
    ['/julia_world/fonts/fredoka-latin.woff2', 'font/woff2', 'font', true],
  ];
  for (const [path, goodType, body, shared] of cases) {
    const goodUrl = `${ORIGIN}${path}`;
    const goodStore = new MemoryCaches();
    seedMetadata(goodStore, OLD_CACHE);
    seedRpg(goodStore, OLD_CACHE, 'release-41');
    const good = new FakeResponse(body, { url: goodUrl, headers: { 'content-type': `${goodType}; charset=binary` } });
    const goodHarness = createHarness({ store: goodStore, responses: { [goodUrl]: good } });
    const goodResult = await goodHarness.fetch(new FakeRequest(goodUrl));
    assert.equal(goodResult, good);
    const goodCache = await goodStore.open(shared ? SHARED_CACHE_NAME : OLD_CACHE);
    assert.ok(await goodCache.match(goodUrl), path);

    const badType = path.endsWith('.png') || path.endsWith('.woff2') ? 'text/plain' : 'text/html';
    const badStore = new MemoryCaches();
    seedMetadata(badStore, OLD_CACHE);
    seedRpg(badStore, OLD_CACHE, 'release-41');
    const bad = new FakeResponse('erro', { url: goodUrl, headers: { 'content-type': badType } });
    const badHarness = createHarness({ store: badStore, responses: { [goodUrl]: bad } });
    const badResult = await badHarness.fetch(new FakeRequest(goodUrl));
    assert.equal(badResult, bad);
    const badCache = await badStore.open(shared ? SHARED_CACHE_NAME : OLD_CACHE);
    assert.equal(await badCache.match(goodUrl), undefined, path);
  }
});

test('integração 19: resposta de bundle armazenada inválida não prova reserva nem cleanup', async () => {
  const cases = [
    { status: 206, type: 'application/javascript' },
    { redirected: true, type: 'application/javascript' },
    { type: 'text/plain' },
    { type: 'application/javascript+json' },
    { type: 'application/javascript-patch' },
  ];
  for (const invalid of cases) {
    const store = new MemoryCaches();
    seedMetadata(store, NEW_CACHE);
    const bundleUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
    store.seed(NEW_CACHE, [
      [`${ORIGIN}/rpg_welling/index.html`, htmlBody('release-42'), {
        headers: { 'content-type': 'text/html' },
      }],
      [bundleUrl, 'bundle', {
        status: invalid.status,
        redirected: invalid.redirected,
        headers: { 'content-type': invalid.type },
      }],
    ]);
    const harness = createHarness({ store });
    await harness.dispatch('activate');
    assert.equal((await store.has(NEW_CACHE)), true, JSON.stringify(invalid));
    const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, { mode: 'navigate' }));
    assert.equal(result.status, 0, JSON.stringify(invalid));
  }
});
test('integração 20: HTML divergente no cache não é servido offline', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const extraUrl = `${ORIGIN}/rpg_welling/extra.html`;
  store.seed(OLD_CACHE, [[extraUrl, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  const harness = createHarness({ store });

  const result = await harness.fetch(new FakeRequest(extraUrl, { mode: 'navigate' }));
  assert.equal(result.status, 0);
  const old = await store.open(OLD_CACHE);
  assert.equal(await old.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`), undefined);
  assert.equal(await old.match(extraUrl) !== undefined, true);
});

test('integração 20-A: segunda reserva completa fornece HTML coerente e bundle da mesma versão', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const extraUrl = `${ORIGIN}/rpg_welling/extra.html`;
  store.seed(OLD_CACHE, [[extraUrl, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  store.seed(NEW_CACHE, [
    [`${ORIGIN}/rpg_welling/index.html`, htmlBody('release-42'), {
      headers: { 'content-type': 'text/html' },
    }],
    [`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`, "console.log('release-42');", {
      headers: { 'content-type': 'application/javascript' },
    }],
    [extraUrl, htmlBody('release-42'), { headers: { 'content-type': 'text/html' } }],
  ]);
  const harness = createHarness({ store });

  const html = await harness.fetch(new FakeRequest(extraUrl, { mode: 'navigate' }));
  const js = await harness.fetch(new FakeRequest(
    `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`,
    { destination: 'script' },
  ));

  assert.equal(await html.text(), htmlBody('release-42'));
  assert.equal(await js.text(), "console.log('release-42');");
  assert.equal((await (await store.open(NEW_CACHE)).match(extraUrl)) !== undefined, true);
});

test('integração 20-B: segunda reserva sem o caminho não aceita HTML divergente antigo', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const extraUrl = `${ORIGIN}/rpg_welling/extra.html`;
  store.seed(OLD_CACHE, [[extraUrl, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  seedRpg(store, NEW_CACHE, 'release-42');
  const harness = createHarness({ store });

  const result = await harness.fetch(new FakeRequest(extraUrl, { mode: 'navigate' }));

  assert.equal(result.status, 0);
  assert.equal(await (await store.open(OLD_CACHE)).match(extraUrl) !== undefined, true);
});

test('integração 21: HTML não-navegação divergente não é gravado, mas o HTML próprio é servido', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const extraUrl = `${ORIGIN}/rpg_welling/extra.html`;
  const response42 = responseFor(extraUrl, 'release-42');
  const harness = createHarness({ store, responses: { [extraUrl]: response42 } });

  const result = await harness.fetch(new FakeRequest(extraUrl, { mode: 'cors' }));
  assert.equal(result, response42);
  const old = await store.open(OLD_CACHE);
  assert.equal(await old.match(extraUrl), undefined);

  const own = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, { mode: 'cors' }));
  assert.equal(await own.text(), htmlBody('release-41'));
});

test('integração 22: rotação incompleta com HTML coerente continua ativa após reinício', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, NEW_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const htmlUrl = `${ORIGIN}/rpg_welling/index.html`;
  store.seed(NEW_CACHE, [[htmlUrl, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  const jsUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js = new FakeResponse("console.log('release-42');", {
    url: jsUrl,
    headers: { 'content-type': 'application/javascript' },
  });
  const restarted = createHarness({ store, responses: { [jsUrl]: js } });

  const result = await restarted.fetch(new FakeRequest(jsUrl, { destination: 'script' }));
  assert.equal(await result.text(), "console.log('release-42');");
  const metadata = await (await store.open(META_CACHE_NAME)).match(META_URL);
  assert.equal(await metadata.text(), NEW_CACHE);
  assert.equal((await store.has(OLD_CACHE)), false);
  const active = await store.open(NEW_CACHE);
  assert.ok(await active.match(jsUrl));
});

test('integração 23: fallback fora da fila não recria cache removido durante limpeza', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const html42 = responseFor(`${ORIGIN}/rpg_welling/index.html?deploy=42`, 'release-42');
  const js42Url = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js42 = new FakeResponse("console.log('release-42');", {
    url: js42Url,
    headers: { 'content-type': 'application/javascript' },
  });
  let deleteStarted;
  const deleteStartedPromise = new Promise((resolve) => { deleteStarted = resolve; });
  let releaseDelete;
  const deleteGate = new Promise((resolve) => { releaseDelete = resolve; });
  const harness = createHarness({
    store,
    responses: { [html42.url]: html42, [js42Url]: js42 },
    beforeDelete: async (name) => {
      if (name === OLD_CACHE) {
        deleteStarted();
        await deleteGate;
      }
    },
  });

  const completing = harness.fetch(new FakeRequest(html42.url, { mode: 'navigate' }));
  await completing;
  const cleanup = harness.fetch(new FakeRequest(js42Url, { destination: 'script' }));
  await deleteStartedPromise;
  let fallbackSettled = false;
  const fallback = harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/extra.html`, { mode: 'navigate' }))
    .then((response) => {
      fallbackSettled = true;
      return response;
    });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(fallbackSettled, false);
  releaseDelete();
  await cleanup;
  const fallbackResponse = await fallback;
  assert.equal(fallbackResponse.status, 0);
  const keys = await store.keys();
  assert.equal(keys.includes(OLD_CACHE), false);
  assert.equal(keys.includes(NEW_CACHE), true);
});

test('integração 24: matriz JPEG/WASM e respostas estáticas 206/opaque', async () => {
  const cases = [
    ['/rpg_welling/assets/photo.jpg', 'image/jpeg', 'jpeg'],
    ['/rpg_welling/assets/module.wasm', 'application/wasm', 'wasm'],
  ];
  for (const [path, type, body] of cases) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const url = `${ORIGIN}${path}`;
    const good = new FakeResponse(body, { url, headers: { 'content-type': type } });
    const harness = createHarness({ store, responses: { [url]: good } });
    assert.equal(await harness.fetch(new FakeRequest(url)), good);
    assert.ok(await (await store.open(OLD_CACHE)).match(url));
  }
  for (const invalid of [
    { status: 206, type: 'model/gltf-binary' },
    { type: 'opaque', contentType: 'model/gltf-binary' },
  ]) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const path = '/rpg_welling/assets/scene.glb';
    const baseUrl = `${ORIGIN}${path}`;
    const queryUrl = `${baseUrl}?tentativa=1`;
    const good = new FakeResponse('glb', { url: baseUrl, headers: { 'content-type': 'model/gltf-binary' } });
    store.seed(OLD_CACHE, [[baseUrl, 'glb', { headers: { 'content-type': 'model/gltf-binary' } }]]);
    const bad = new FakeResponse('ruim', {
      url: queryUrl,
      status: invalid.status,
      type: invalid.type || 'basic',
      headers: { 'content-type': invalid.contentType || 'model/gltf-binary' },
    });
    const harness = createHarness({ store, responses: { [queryUrl]: bad } });
    const result = await harness.fetch(new FakeRequest(queryUrl));
    assert.equal(result, bad);
    const cache = await store.open(OLD_CACHE);
    assert.equal((await cache.match(baseUrl)).body, good.body);
    assert.equal(await cache.match(queryUrl), undefined);
  }
});

test('integração 24-A: negativos JPEG/WASM e redirect preservam cópia boa', async () => {
  const cases = [
    { path: '/rpg_welling/assets/photo.jpg', good: 'image/jpeg', bad: { contentType: 'text/plain' } },
    { path: '/rpg_welling/assets/module.wasm', good: 'application/wasm', bad: { contentType: 'text/plain' } },
    {
      path: '/rpg_welling/assets/scene.glb',
      good: 'model/gltf-binary',
      bad: { redirected: true, contentType: 'model/gltf-binary', url: `${ORIGIN}/maths_adventure/scene.glb` },
    },
    { path: '/rpg_welling/assets/photo.jpg', good: 'image/jpeg', bad: { status: 206, contentType: 'image/jpeg' } },
    { path: '/rpg_welling/assets/module.wasm', good: 'application/wasm', bad: { status: 206, contentType: 'application/wasm' } },
    { path: '/rpg_welling/assets/photo.jpg', good: 'image/jpeg', bad: { type: 'opaque', contentType: 'image/jpeg' } },
    { path: '/rpg_welling/assets/module.wasm', good: 'application/wasm', bad: { type: 'opaque', contentType: 'application/wasm' } },
  ];
  for (const { path, good: goodType, bad } of cases) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const baseUrl = `${ORIGIN}${path}`;
    const queryUrl = `${baseUrl}?tentativa=2`;
    const good = new FakeResponse('bom', {
      url: baseUrl,
      headers: { 'content-type': goodType },
    });
    store.seed(OLD_CACHE, [[baseUrl, 'bom', { headers: { 'content-type': goodType } }]]);
    const badResponse = new FakeResponse('ruim', {
      url: bad.url || queryUrl,
      status: bad.status,
      type: bad.type || 'basic',
      redirected: bad.redirected === true,
      headers: { 'content-type': bad.contentType },
    });
    const harness = createHarness({ store, responses: { [queryUrl]: badResponse } });

    const result = await harness.fetch(new FakeRequest(queryUrl));

    assert.equal(result, badResponse, `${path}: ${JSON.stringify(bad)}`);
    const cache = await store.open(OLD_CACHE);
    assert.equal((await cache.match(baseUrl)).body, good.body, `${path}: ${JSON.stringify(bad)}`);
    assert.equal(await cache.match(queryUrl), undefined, `${path}: ${JSON.stringify(bad)}`);
  }
});

test('integração 24-B: cacheFirst pendente não reabre o cache removido', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const html42 = responseFor(`${ORIGIN}/rpg_welling/index.html?deploy=42`, 'release-42');
  const js42Url = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js42 = new FakeResponse("console.log('release-42');", {
    url: js42Url,
    headers: { 'content-type': 'application/javascript' },
  });
  const cssUrl = `${ORIGIN}/rpg_welling/assets/pendente.css`;
  const css = new FakeResponse('body{}', {
    url: cssUrl,
    headers: { 'content-type': 'text/css' },
  });
  let openStarted;
  const openStartedPromise = new Promise((resolve) => { openStarted = resolve; });
  let releaseOpen;
  const openGate = new Promise((resolve) => { releaseOpen = resolve; });
  let networkStarted;
  const networkStartedPromise = new Promise((resolve) => { networkStarted = resolve; });
  let releaseNetwork;
  const networkGate = new Promise((resolve) => { releaseNetwork = resolve; });
  const harness = createHarness({
    store,
    responses: {
      [html42.url]: html42,
      [js42Url]: js42,
      [cssUrl]: async () => {
        networkStarted();
        await networkGate;
        return css;
      },
    },
    beforeOpen: async (name) => {
      if (name === OLD_CACHE) {
        openStarted();
        await openGate;
      }
    },
  });

  const pendingCacheFirst = harness.fetch(new FakeRequest(cssUrl));
  await openStartedPromise;
  releaseOpen();
  await harness.fetch(new FakeRequest(html42.url, { mode: 'navigate' }));
  await networkStartedPromise;
  const cleanup = harness.fetch(new FakeRequest(js42Url, { destination: 'script' }));
  await cleanup;
  releaseNetwork();
  await pendingCacheFirst;

  const keys = await store.keys();
  assert.equal(keys.includes(OLD_CACHE), false);
  assert.equal(keys.includes(NEW_CACHE), true);
});

test('integração 24-E: navegação HTML sem extensão rotaciona e fica disponível offline', async () => {
  const url = `${ORIGIN}/rpg_welling/capitulo/1`;
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const html42 = responseFor(url, 'release-42');
  const jsUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const js42 = new FakeResponse("console.log('release-42');", {
    url: jsUrl,
    headers: { 'content-type': 'application/javascript' },
  });
  const firstWorker = createHarness({
    store,
    responses: { [url]: html42, [jsUrl]: js42 },
  });

  const html = await firstWorker.fetch(new FakeRequest(url, { mode: 'navigate' }));
  assert.equal(html, html42);
  await firstWorker.fetch(new FakeRequest(jsUrl, { destination: 'script' }));
  const offlineWorker = createHarness({ store });
  const offline = await offlineWorker.fetch(new FakeRequest(url, { mode: 'navigate' }));
  assert.equal(await offline.text(), htmlBody('release-42'));
  assert.equal((await store.has(OLD_CACHE)), false);

  const wrongStore = new MemoryCaches();
  seedMetadata(wrongStore, OLD_CACHE);
  seedRpg(wrongStore, OLD_CACHE, 'release-41');
  const wrong = responseFor(url, 'release-42', {
    headers: { 'content-type': 'text/plain' },
  });
  const wrongWorker = createHarness({ store: wrongStore, responses: { [url]: wrong } });
  const wrongResult = await wrongWorker.fetch(new FakeRequest(url, { mode: 'navigate' }));
  assert.equal(wrongResult, wrong);
  assert.equal((await wrongStore.has(NEW_CACHE)), false);
  assert.equal((await (await wrongStore.open(OLD_CACHE)).match(url)), undefined);
});

test('integração 24-F: navegação para recurso tipado nunca aceita HTML', async () => {
  const paths = [
    '/rpg_welling/lib/bundle.js?v=release-99',
    '/rpg_welling/assets/scene.glb',
    '/rpg_welling/assets/scene.GLB',
    '/rpg_welling/assets/panel.png',
    '/rpg_welling/assets/photo.jpg',
    '/rpg_welling/assets/panel.css',
    '/rpg_welling/assets/module.wasm',
    '/rpg_welling/assets/module.wasm.map',
    '/rpg_welling/data/config.json',
    '/manifest.webmanifest',
    '/julia_world/fonts/fredoka-latin.woff2',
  ];
  for (const path of paths) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const url = `${ORIGIN}${path}`;
    const response = responseFor(url, 'release-99');
    const harness = createHarness({ store, responses: { [url]: response } });

    const result = await harness.fetch(new FakeRequest(url, { mode: 'navigate' }));

    assert.equal(result, response, path);
    assert.equal((await store.has(`${APP_CACHE_PREFIX}release-99`)), false, path);
    for (const cacheName of await store.keys()) {
      const cache = await store.open(cacheName);
      assert.equal(await cache.match(url), undefined, `${path}: ${cacheName}`);
    }
    const old = await store.open(OLD_CACHE);
    assert.equal(
      (await old.match(`${ORIGIN}/rpg_welling/lib/bundle.js?v=release-41`)).body,
      "console.log('release-41');",
      path,
    );
  }
});

test('integração 24-F-A: fetch não-navegação da raiz não aceita HTML', async () => {
  for (const path of ['/rpg_welling', '/rpg_welling/']) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const url = `${ORIGIN}${path}`;
    const response = responseFor(url, 'release-42');
    const harness = createHarness({ store, responses: { [url]: response } });

    const result = await harness.fetch(new FakeRequest(url));
    assert.equal(result, response, path);
    for (const cacheName of await store.keys()) {
      const cache = await store.open(cacheName);
      assert.equal(await cache.match(url), undefined, `${path}: ${cacheName}`);
    }
  }
});

test('integração 24-G: fallback valida respostas armazenadas não-HTML e usa reserva antiga', async () => {
  const cases = [
    {
      path: '/rpg_welling/lib/bundle.js?v=release-41',
      type: 'application/javascript',
      destination: 'script',
    },
    { path: '/rpg_welling/assets/scene.glb', type: 'model/gltf-binary' },
    { path: '/rpg_welling/assets/panel.css', type: 'text/css' },
    { path: '/rpg_welling/assets/panel.png', type: 'image/png' },
  ];
  const invalidResponses = [
    { status: 206, type: 'basic', contentType: null },
    { status: 200, type: 'basic', contentType: 'text/html' },
    { status: 200, type: 'opaque', contentType: null },
    { status: 0, type: 'error', contentType: null },
  ];
  for (const scenario of cases) {
    for (const invalid of invalidResponses) {
      const store = new MemoryCaches();
      seedMetadata(store, NEW_CACHE);
      seedRpg(store, NEW_CACHE, 'release-42');
      seedRpg(store, OLD_CACHE, 'release-41');
      const url = `${ORIGIN}${scenario.path}`;
      store.seed(OLD_CACHE, [[url, 'copia-antiga', {
        headers: { 'content-type': scenario.type },
      }]]);
      store.seed(NEW_CACHE, [[url, 'copia-invalida', {
        status: invalid.status,
        type: invalid.type,
        headers: { 'content-type': invalid.contentType || scenario.type },
      }]]);
      const harness = createHarness({ store });
      const result = await harness.fetch(new FakeRequest(url, {
        destination: scenario.destination,
      }));

      assert.equal(await result.text(), 'copia-antiga', `${scenario.path}: ${JSON.stringify(invalid)}`);
    }
  }
});

test('integração 24-G-A: entrada inválida não completa reserva nem autoriza limpeza', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, NEW_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  store.seed(NEW_CACHE, [[`${ORIGIN}/rpg_welling/index.html`, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  const jsUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  store.seed(NEW_CACHE, [[jsUrl, 'invalido', {
    status: 206,
    headers: { 'content-type': 'application/javascript' },
  }]]);
  const harness = createHarness({ store });

  const result = await harness.fetch(new FakeRequest(jsUrl, { destination: 'script' }));
  assert.equal(result.status, 0);
  assert.equal((await store.has(OLD_CACHE)), true);
  assert.equal((await store.has(NEW_CACHE)), true);
});

test('integração 24-G-B: entrada inválida compartilhada não é servida offline', async () => {
  for (const [path, type] of [
    ['/manifest.webmanifest', 'application/manifest+json'],
    ['/julia_world/fonts/fredoka-latin.woff2', 'font/woff2'],
  ]) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const url = `${ORIGIN}${path}`;
    store.seed(SHARED_CACHE_NAME, [[url, 'invalido', {
      status: 206,
      headers: { 'content-type': type },
    }]]);
    const harness = createHarness({ store });

    const result = await harness.fetch(new FakeRequest(url));
    assert.equal(result.status, 0, path);
  }
});

test('integração 24-H: falha do ativo e de candidato intermediário segue para reserva final', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, NEW_CACHE);
  store.seed(NEW_CACHE, [[`${ORIGIN}/rpg_welling/index.html`, htmlBody('release-42'), {
    headers: { 'content-type': 'text/html' },
  }]]);
  seedRpg(store, THIRD_CACHE, 'release-43');
  seedRpg(store, OLD_CACHE, 'release-41');
  const url = `${ORIGIN}/rpg_welling/assets/final.css`;
  store.seed(THIRD_CACHE, [[url, 'intermediario', {
    headers: { 'content-type': 'text/css' },
  }]]);
  store.seed(OLD_CACHE, [[url, 'final', {
    headers: { 'content-type': 'text/css' },
  }]]);
  let activeOpens = 0;
  let middleOpens = 0;
  const harness = createHarness({
    store,
    beforeOpen: async (name) => {
      if (name === NEW_CACHE && ++activeOpens === 3) throw new Error('Cache API indisponível');
      if (name === THIRD_CACHE && ++middleOpens === 3) throw new Error('Cache API indisponível');
    },
  });

  const result = await harness.fetch(new FakeRequest(url));
  assert.equal(await result.text(), 'final');
});

test('integração 24-D: caches.has rejeitando um candidato não impede a reconstrução seguinte', async () => {
  const store = new MemoryCaches();
  seedRpg(store, OLD_CACHE, 'release-41');
  seedRpg(store, NEW_CACHE, 'release-42');
  const jsUrl = `${ORIGIN}/rpg_welling/lib/bundle.js?v=release-42`;
  const harness = createHarness({
    store,
    beforeHas: async (name) => {
      if (name === OLD_CACHE) throw new Error('Cache API indisponível');
    },
  });

  const result = await harness.fetch(new FakeRequest(jsUrl, { destination: 'script' }));
  assert.equal(await result.text(), "console.log('release-42');");
});

test('integração 24-C: falha de Cache API no cacheFirst cai para a rede e não envenena a fila', async () => {
  const cases = [
    {
      label: 'ativo',
      url: `${ORIGIN}/rpg_welling/assets/ativo.css`,
      type: 'text/css',
      seed: (store) => seedRpg(store, OLD_CACHE, 'release-41'),
      beforeOpen: (store) => {
        let activeOpens = 0;
        return async (name) => {
          if (name === OLD_CACHE) {
            activeOpens += 1;
            if (activeOpens === 2) throw new Error('Cache API indisponível');
          }
        };
      },
    },
    {
      label: 'compartilhado',
      url: `${ORIGIN}/julia_world/fonts/luckiest-guy-latin.woff2`,
      type: 'font/woff2',
      seed: (store) => seedRpg(store, OLD_CACHE, 'release-41'),
      beforeOpen: () => {
        let sharedRejected = false;
        return async (name) => {
          if (name === SHARED_CACHE_NAME && !sharedRejected) {
            sharedRejected = true;
            throw new Error('Cache API indisponível');
          }
        };
      },
    },
  ];
  for (const scenario of cases) {
    const store = new MemoryCaches();
    scenario.seed(store);
    const network = new FakeResponse('bom', {
      url: scenario.url,
      headers: { 'content-type': scenario.type },
    });
    const harness = createHarness({
      store,
      responses: { [scenario.url]: network },
      beforeOpen: scenario.beforeOpen(store),
    });

    const first = await harness.fetch(new FakeRequest(scenario.url));
    assert.equal(first, network, scenario.label);
    const second = await harness.fetch(new FakeRequest(scenario.url));
    assert.equal(await second.text(), 'bom', scenario.label);
  }
});

test('integração 24-C-B: primeira abertura do cache ativo no cacheFirst cai para a rede', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OLD_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const url = `${ORIGIN}/rpg_welling/assets/primeira-abertura.css`;
  const network = new FakeResponse('bom', {
    url,
    headers: { 'content-type': 'text/css' },
  });
  let armed = false;
  let rejected = false;
  const harness = createHarness({
    store,
    responses: { [url]: network },
    beforeOpen: async (name) => {
      if (armed && name === OLD_CACHE && !rejected) {
        rejected = true;
        throw new Error('Cache API indisponível');
      }
    },
  });
  await harness.dispatch('activate');
  armed = true;

  const first = await harness.fetch(new FakeRequest(url));
  assert.equal(first, network);
  const second = await harness.fetch(new FakeRequest(url));
  assert.equal(await second.text(), 'bom');
});

test('integração 24-C-A: falha de match no cacheFirst cai para a rede e permite a próxima leitura', async () => {
  for (const shared of [false, true]) {
    const store = new MemoryCaches();
    seedRpg(store, OLD_CACHE, 'release-41');
    const url = shared
      ? `${ORIGIN}/julia_world/fonts/luckiest-guy-latin.woff2`
      : `${ORIGIN}/rpg_welling/assets/indisponivel.css`;
    const type = shared ? 'font/woff2' : 'text/css';
    const network = new FakeResponse('bom', { url, headers: { 'content-type': type } });
    let matches = 0;
    const harness = createHarness({
      store,
      responses: { [url]: network },
      beforeMatch: async (name) => {
        const rejectedMatch = shared ? 1 : 2;
        if (name === (shared ? SHARED_CACHE_NAME : OLD_CACHE) && ++matches === rejectedMatch) {
          throw new Error('Cache API indisponível');
        }
      },
    });

    const first = await harness.fetch(new FakeRequest(url));
    assert.equal(first, network, shared ? 'compartilhado' : 'ativo');
    const second = await harness.fetch(new FakeRequest(url));
    assert.equal(await second.text(), 'bom', shared ? 'compartilhado' : 'ativo');
  }
});

test('integração: metadado inválido continua usando reconstrução segura', async () => {
  const store = new MemoryCaches();
  seedMetadata(store, OTHER_CACHE);
  seedRpg(store, OLD_CACHE, 'release-41');
  const harness = createHarness({ store });

  const result = await harness.fetch(new FakeRequest(`${ORIGIN}/rpg_welling/index.html`, {
    mode: 'navigate',
  }));
  assert.equal(await result.text(), htmlBody('release-41'));
  assert.equal((await store.has(OLD_CACHE)), true);
});

test('integração 25: respostas 206/redirect/opaque não substituem dependência compartilhada', async () => {
  for (const invalid of [
    { status: 206, type: 'basic', redirected: false },
    { status: 200, type: 'basic', redirected: true },
    { status: 200, type: 'opaque', redirected: false },
  ]) {
    const store = new MemoryCaches();
    seedMetadata(store, OLD_CACHE);
    seedRpg(store, OLD_CACHE, 'release-41');
    const baseUrl = `${ORIGIN}/julia_world/fonts/fredoka-latin.woff2`;
    const queryUrl = `${baseUrl}?tentativa=1`;
    store.seed(SHARED_CACHE_NAME, [[baseUrl, 'bom', {
      headers: { 'content-type': 'font/woff2' },
    }]]);
    const bad = new FakeResponse('ruim', {
      url: queryUrl,
      status: invalid.status,
      type: invalid.type,
      redirected: invalid.redirected,
      headers: { 'content-type': 'font/woff2' },
    });
    const harness = createHarness({ store, responses: { [queryUrl]: bad } });
    const result = await harness.fetch(new FakeRequest(queryUrl));
    assert.equal(result, bad);
    const shared = await store.open(SHARED_CACHE_NAME);
    assert.equal((await shared.match(baseUrl)).body, 'bom');
    assert.equal(await shared.match(queryUrl), undefined);
  }
});

test('integração 8: install/activate são não destrutivos e estado ambíguo não limpa', async () => {
  const known = new MemoryCaches();
  seedMetadata(known, OLD_CACHE);
  seedRpg(known, OLD_CACHE, 'release-41');
  known.seed(`${APP_CACHE_PREFIX}release-40`, [[`${ORIGIN}/rpg_welling/index.html`, 'old']]);
  known.seed(OTHER_CACHE, [[`${ORIGIN}/maths_adventure/index.html`, 'maths']]);
  const knownHarness = createHarness({ store: known });
  const before = await known.keys();
  await knownHarness.dispatch('install');
  assert.deepEqual(await known.keys(), before);
  await knownHarness.dispatch('activate');
  assert.equal((await known.has(OLD_CACHE)), true);
  assert.equal((await known.has(META_CACHE_NAME)), true);
  assert.equal((await known.has(OTHER_CACHE)), true);
  assert.equal((await known.has(`${APP_CACHE_PREFIX}release-40`)), false);

  const ambiguous = new MemoryCaches();
  seedRpg(ambiguous, OLD_CACHE, 'release-41');
  seedRpg(ambiguous, NEW_CACHE, 'release-42');
  const ambiguousHarness = createHarness({ store: ambiguous });
  await ambiguousHarness.dispatch('install');
  await ambiguousHarness.dispatch('activate');
  assert.equal((await ambiguous.has(OLD_CACHE)), true);
  assert.equal((await ambiguous.has(NEW_CACHE)), true);
  assert.equal((await ambiguous.has(OTHER_CACHE)), false);
});
