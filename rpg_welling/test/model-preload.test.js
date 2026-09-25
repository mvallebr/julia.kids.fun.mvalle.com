// Contrato do payload 3D: o núcleo é compartilhado e cada zona carrega apenas
// seus NPCs e props. Os testes leem o código-fonte para não importar three.js.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const worldSource = readFileSync(fileURLToPath(new URL('../src/world.js', import.meta.url)), 'utf8');
const mainSource = readFileSync(fileURLToPath(new URL('../src/main.js', import.meta.url)), 'utf8');
const contentSource = readFileSync(fileURLToPath(new URL('../src/content.js', import.meta.url)), 'utf8');

const CACHE_START = 'export function createGlbCache';
const CACHE_END = 'function loadGlbOnce';
const LOADER_START = 'export const MODEL_FILES =';
const CORE_FILES_START = 'export const CORE_MODEL_FILES =';
const LOADER_END = '// Helper: retorna';

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function collectStrings(value) {
  if (typeof value === 'string') return [value];
  return Object.values(value).flatMap(collectStrings);
}

function extractLoaderBlock() {
  const start = worldSource.indexOf(LOADER_START);
  const end = worldSource.indexOf(LOADER_END, start);
  assert.notEqual(start, -1, 'world.js deve exportar o conjunto de modelos do núcleo');
  assert.notEqual(end, -1, 'world.js deve manter o helper glbSource depois do loader');
  return worldSource.slice(start, end);
}

function createLoaderHarness(load = defaultLoad) {
  const glbScenes = new Map();
  const calls = [];
  const warnings = [];
  const context = {
    glbScenes,
    loadGlb: (filename) => {
      calls.push(filename);
      return load(filename);
    },
    console: { warn: (...args) => warnings.push(args) },
  };
  const executableBlock = extractLoaderBlock().replace(/\bexport /g, '');
  vm.runInNewContext(`${executableBlock}
globalThis.__loaderApi = {
  MODEL_FILES,
  CORE_MODEL_FILES,
  ZONE_MODEL_FILES,
  ALL_MODEL_FILES,
  preloadCoreModels,
  preloadZoneModels,
};`, context);
  return { api: context.__loaderApi, glbScenes, calls, warnings };
}

function createNpcsHarness() {
  const start = contentSource.indexOf('export const NPCS = {');
  const end = contentSource.indexOf('\n};', start);
  assert.notEqual(start, -1, 'content.js deve exportar o catálogo de NPCs');
  assert.notEqual(end, -1, 'content.js deve fechar o catálogo de NPCs');
  const source = contentSource.slice(start, end + 3).replace('export const NPCS =', 'globalThis.NPCS =');
  const context = {};
  vm.runInNewContext(source, context);
  return context.NPCS;
}

function createCacheHarness(loadOne) {
  const start = worldSource.indexOf(CACHE_START);
  const end = worldSource.indexOf(CACHE_END, start);
  assert.notEqual(start, -1, 'world.js deve exportar a fábrica pura do cache de GLB');
  assert.notEqual(end, -1, 'world.js deve isolar a fábrica antes da requisição real');
  const source = worldSource.slice(start, end).replace(/\bexport /g, '');
  const context = { loadOne };
  vm.runInNewContext(`${source}\nglobalThis.createGlbCache = createGlbCache;`, context);
  return context.createGlbCache(loadOne);
}

function defaultLoad(filename) {
  return Promise.resolve({ scene: filename, animations: [] });
}

function createModelProgressHarness() {
  const start = worldSource.indexOf('export function onModelProgress');
  const end = worldSource.indexOf('THREE.DefaultLoadingManager.onProgress', start);
  assert.notEqual(start, -1, 'world.js deve expor o registro de progresso');
  assert.notEqual(end, -1, 'o LoadingManager deve consumir o callback registrado');
  const context = {};
  const source = worldSource.slice(start, end).replace(/\bexport /g, '');
  vm.runInNewContext(`let modelProgressCb = null;\n${source}\nglobalThis.onModelProgress = onModelProgress;`, context);
  return context.onModelProgress;
}

function createBootProgressHarness() {
  const start = mainSource.indexOf('let bootProgressPct = 0;');
  const end = mainSource.indexOf('onModelProgress(setBootProgress);', start);
  assert.notEqual(start, -1, 'main.js deve guardar o progresso ja exibido no boot');
  assert.notEqual(end, -1, 'main.js deve registrar setBootProgress no LoadingManager');
  const fill = { style: {} };
  const label = { textContent: '' };
  const context = {
    $: (id) => (id === 'bootFill' ? fill : id === 'bootPct' ? label : null),
  };
  const source = mainSource.slice(start, end);
  vm.runInNewContext(`${source}\nglobalThis.setBootProgress = setBootProgress;`, context);
  return { setBootProgress: context.setBootProgress, fill, label };
}

function createGotoZoneHarness() {
  const start = mainSource.indexOf('async function gotoZone');
  const end = mainSource.indexOf('\nasync function openGate', start);
  assert.notEqual(start, -1, 'main.js deve conter gotoZone');
  assert.notEqual(end, -1, 'gotoZone deve estar antes de openGate');
  const failure = new Error('falha simulada na cena');
  const elements = [];
  const veilNode = { append: () => {}, remove: () => {} };
  const previousModelProgress = () => {};
  let currentModelProgress = previousModelProgress;
  let removedVeils = 0;
  let saveCalls = 0;
  const state = { zone: 'school', flags: {}, position: ['4', '5'] };
  const context = {
    root: { querySelector: () => veilNode },
    language: 'pt',
    uiText: (_language, key) => key,
    localStorage: {},
    el: (tag, className, text) => {
      const node = {
        tag,
        className,
        textContent: text ?? '',
        style: {},
        children: [],
        attributes: {},
        setAttribute(name, value) { this.attributes[name] = value; },
        append(...children) { this.children.push(...children); },
      };
      elements.push(node);
      return node;
    },
    fade: () => ({
      cover: () => Promise.resolve(),
      remove: () => { removedVeils += 1; },
    }),
    onModelProgress: (callback) => {
      const previous = currentModelProgress;
      currentModelProgress = callback;
      return previous;
    },
    preloadZoneModels: () => {
      currentModelProgress(0.5);
      return Promise.resolve();
    },
    sounds: { door() {} },
    buildScene: () => { throw failure; },
    playerObj: null,
    armExitsAt() {},
    saveState: () => { saveCalls += 1; },
    updateHUD() {},
    checkAchievements() {},
    hidePrompt() {},
    getModelProgress: () => currentModelProgress,
    getRemovedVeils: () => removedVeils,
    getSaveCalls: () => saveCalls,
    getState: () => state,
    getElements: () => elements,
  };
  const source = mainSource.slice(start, end);
  try {
    vm.runInNewContext(`let overlayCount = 0;
${source}
globalThis.__gotoZone = gotoZone;
globalThis.__getOverlayCount = () => overlayCount;`, context);
  } catch (error) {
    const missingGlobal = error instanceof ReferenceError && /^(\w+) is not defined$/.exec(error.message)?.[1];
    if (missingGlobal) {
      throw new Error(`gotoZone harness: global ausente no contexto: ${missingGlobal}`, { cause: error });
    }
    throw error;
  }
  return {
    gotoZone: context.__gotoZone,
    ...context,
    failure,
    previousModelProgress,
  };
}

test('o catalogo explicito e a fonte unica dos nomes GLB', () => {
  const start = worldSource.indexOf('export const MODEL_FILES =');
  const end = worldSource.indexOf(CORE_FILES_START, start);
  assert.notEqual(start, -1, 'world.js deve exportar o catalogo semantico de GLBs');
  assert.notEqual(end, -1, 'o catalogo deve alimentar diretamente os conjuntos de preloading');
  const catalogSource = worldSource.slice(start, end).replace(/\bexport /g, '');
  const context = {};
  vm.runInNewContext(`${catalogSource}\nglobalThis.MODEL_FILES = MODEL_FILES;`, context);
  assert.deepEqual(plain(context.MODEL_FILES), {
    core: {
      ivy: 'ivy-rigged.glb',
      oakley: 'oakley-rigged.glb',
      owl: 'owl.glb',
      npc: 'npc.glb',
      animatedKid: 'kid-animated.glb',
    },
    adults: {
      finch: 'finch-rigged.glb',
      page: 'page-rigged.glb',
      baker: 'crumb-rigged.glb',
      raven: 'raven-rigged.glb',
      willow: 'willow-rigged.glb',
    },
    props: {
      books: 'books.glb',
      trees: 'trees.glb',
      bush: 'bush.glb',
      chest: 'chest.glb',
    },
  });
  assert.equal(Object.getPrototypeOf(context.MODEL_FILES.core), null);
  assert.equal(Object.getPrototypeOf(context.MODEL_FILES.adults), null);
  assert.equal(Object.getPrototypeOf(context.MODEL_FILES.props), null);
  assert.deepEqual(
    Object.keys(plain(context.MODEL_FILES.adults)).sort(),
    Object.keys(createNpcsHarness()).sort(),
  );
});

test('registrar progresso devolve o callback anterior para restauracao', () => {
  const onModelProgress = createModelProgressHarness();
  const first = () => {};
  const second = () => {};
  assert.strictEqual(onModelProgress(first), null);
  assert.strictEqual(onModelProgress(second), first);
  assert.strictEqual(onModelProgress(null), second);
});

test('cada zona declara somente os NPCs e props usados nela', () => {
  const { api } = createLoaderHarness();
  assert.deepEqual(plain(api.CORE_MODEL_FILES), [
    'ivy-rigged.glb',
    'oakley-rigged.glb',
    'owl.glb',
    'npc.glb',
    'kid-animated.glb',
  ]);
  assert.deepEqual(plain(api.ZONE_MODEL_FILES), {
    school: ['finch-rigged.glb', 'page-rigged.glb', 'books.glb', 'trees.glb'],
    highstreet: ['crumb-rigged.glb'],
    academy: ['raven-rigged.glb'],
    classroom: ['willow-rigged.glb'],
    woods: ['trees.glb', 'bush.glb', 'chest.glb'],
  });
});

test('uma zona desconhecida conclui sem solicitar modelos', async () => {
  const { api, calls, glbScenes } = createLoaderHarness();
  await api.preloadZoneModels('zona-desconhecida');
  assert.deepEqual(calls, []);
  assert.equal(glbScenes.size, 0);
});

test('nomes de zona herdados e tipos inválidos concluem sem carregar', async () => {
  const { api, calls, glbScenes } = createLoaderHarness();
  for (const zoneName of ['constructor', 'toString', '__proto__', null, 42, {}]) {
    const pending = api.preloadZoneModels(zoneName);
    assert.equal(typeof pending?.then, 'function');
    await pending;
  }
  assert.deepEqual(calls, []);
  assert.equal(glbScenes.size, 0);
});

test('o cache devolve a mesma promessa e faz uma única requisição por arquivo', async () => {
  let requests = 0;
  const cachedLoad = createCacheHarness(() => {
    requests += 1;
    return defaultLoad('arquivo.glb');
  });
  const first = cachedLoad('adulto.glb');
  const second = cachedLoad('adulto.glb');
  assert.strictEqual(first, second);
  assert.equal(requests, 1);
  const result = await first;
  assert.equal(result.scene, 'arquivo.glb');
  assert.equal(await second, result);
});

test('promessa rejeitada continua memorizada sem nova requisição', async () => {
  const failure = new Error('falha de rede');
  let requests = 0;
  const cachedLoad = createCacheHarness(() => {
    requests += 1;
    return Promise.reject(failure);
  });
  const first = cachedLoad('adulto.glb');
  const second = cachedLoad('adulto.glb');
  assert.strictEqual(first, second);
  await assert.rejects(first, failure);
  await assert.rejects(second, failure);
  assert.equal(requests, 1);
});

test('preloads repetidos reutilizam o cache real sem nova requisição', async () => {
  let requests = 0;
  const cachedLoad = createCacheHarness(() => {
    requests += 1;
    return defaultLoad('asset.glb');
  });
  const { api, glbScenes } = createLoaderHarness(cachedLoad);
  await api.preloadZoneModels('school');
  await api.preloadZoneModels('school');
  assert.equal(glbScenes.size, 4);
  assert.equal(requests, 4);
});

test('a lista completa exclui kid.glb', () => {
  const { api } = createLoaderHarness();
  assert.equal(api.ALL_MODEL_FILES.includes('kid.glb'), false);
  assert.equal(api.CORE_MODEL_FILES.includes('kid.glb'), false);
  assert.ok(Object.values(plain(api.ZONE_MODEL_FILES)).flat().every((filename) => filename !== 'kid.glb'));
});

test('toda falha de arquivo é isolada e gera aviso', async () => {
  const { api, warnings } = createLoaderHarness((filename) => (
    filename === 'owl.glb'
      ? Promise.reject(new Error('falha simulada'))
      : defaultLoad(filename)
  ));
  await api.preloadCoreModels();
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0][0], 'preloadCoreModels: falha ao carregar owl.glb');
});

test('o codigo fora do catalogo nao embute nomes GLB, inclusive em template strings', () => {
  const catalogStart = worldSource.indexOf(LOADER_START);
  const catalogEnd = worldSource.indexOf(CORE_FILES_START, catalogStart);
  const outsideCatalog = [
    worldSource.slice(0, catalogStart),
    worldSource.slice(catalogEnd),
    mainSource,
  ].join('\n');
  assert.doesNotMatch(
    outsideCatalog,
    /\.glb\b/,
    'todo nome real deve vir de MODEL_FILES, inclusive de template strings',
  );

  const sourceCalls = [...outsideCatalog.matchAll(/\bglbSource\(([^)]*)\)/g)]
    .map((match) => match[1])
    .filter((argument) => argument !== 'filename');
  assert.ok(sourceCalls.length > 0, 'deve haver consumo real dos bundles GLB');
  for (const argument of sourceCalls) {
    assert.match(argument, /^MODEL_FILES\./);
  }

  const sourceCallText = sourceCalls.join('\n');
  for (const path of [
    'core.ivy',
    'core.oakley',
    'core.owl',
    'core.npc',
    'core.animatedKid',
    'props.books',
    'props.trees',
    'props.bush',
    'props.chest',
  ]) {
    assert.ok(sourceCallText.includes(`MODEL_FILES.${path}`), `glbSource deve consumir MODEL_FILES.${path}`);
  }
  assert.ok(
    sourceCallText.includes('MODEL_FILES.adults[face]'),
    'makeAdult deve consumir o mapa de modelos dedicados',
  );
});

test('a lista completa corresponde ao catalogo sem duplicatas', () => {
  const { api } = createLoaderHarness();
  const catalog = plain(api.MODEL_FILES);
  const catalogFiles = collectStrings(catalog).sort();
  const allFiles = plain(api.ALL_MODEL_FILES);
  assert.deepEqual(allFiles.slice().sort(), catalogFiles);
  assert.equal(new Set(allFiles).size, allFiles.length);
});

test('nucleo e listas de zona nao disputam o mesmo arquivo', () => {
  const { api } = createLoaderHarness();
  const core = plain(api.CORE_MODEL_FILES);
  const zones = plain(api.ZONE_MODEL_FILES);
  const zoneFiles = new Set(Object.values(zones).flat());
  assert.deepEqual(core.filter((filename) => zoneFiles.has(filename)), []);
  for (const [zoneName, files] of Object.entries(zones)) {
    assert.equal(new Set(files).size, files.length, `${zoneName} não pode repetir arquivo no mesmo preload`);
  }
});

test('a barra do boot nunca recua', () => {
  const { setBootProgress, fill, label } = createBootProgressHarness();
  setBootProgress(1);
  setBootProgress(0.56);
  setBootProgress(0.75);
  assert.equal(fill.style.width, '100%');
  assert.equal(label.textContent, '100%');
});

test('a transição mostra progresso e sempre limpa a cortina e o callback', async () => {
  const harness = createGotoZoneHarness();
  await assert.rejects(harness.gotoZone('highstreet'), harness.failure);
  assert.equal(harness.getRemovedVeils(), 1);
  assert.equal(harness.__getOverlayCount(), 0);
  assert.strictEqual(harness.getModelProgress(), harness.previousModelProgress);
  assert.deepEqual(harness.getState().zone, 'school');
  assert.equal(harness.getSaveCalls(), 0);
  assert.ok(harness.getElements().some((node) => node.style.width === '50%'));
  assert.ok(harness.getElements().some((node) => String(node.textContent).includes('loadingZone')));
  assert.ok(harness.getElements().some((node) => String(node.textContent).includes('50%')));
});
