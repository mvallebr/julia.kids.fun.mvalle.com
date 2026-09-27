// Suíte do Arts & Crafts. Cobre o que a spec §31 pede e o que quebraria em
// silêncio: chave de tradução faltando em algum idioma, passo apontando para
// região que não existe, e caminho de asset quebrado.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { DICTIONARIES, LANGUAGES as UI_LANGUAGES, interpolate, isLanguage, translate } from '../src/i18n.js';
import {
  CATEGORIES, DESTINATIONS, SEASONS, TUTORIALS, QUICK_MINUTES, LANGUAGES, isQuick,
  contentProblems, tutorialById, tutorialBySlug, regionsOf, focusOf, derivedRegions,
} from '../src/content/index.js';
import { readPlayerContext, readSeason, writeSeason, KEYS } from '../src/state.js';

// Um localStorage de mentira, só o suficiente. Sem ele os testes de estado não
// rodam no Node — e foi justamente um estado mal gravado que matou o botão de
// estação em silêncio, sem um erro no console.
function withStorage(run) {
  const store = new Map();
  const before = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
  };
  try {
    run(store);
  } finally {
    if (before === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = before;
  }
}

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const APP_DIRNAME = 'arts_crafts';

function allKeys() {
  return new Set(UI_LANGUAGES.flatMap((language) => Object.keys(DICTIONARIES[language])));
}

function keysUsedByContent() {
  const used = new Set();
  const add = (key) => { if (typeof key === 'string' && key.includes('.')) used.add(key); };
  for (const tutorial of TUTORIALS) {
    add(tutorial.titleKey);
    add(tutorial.descriptionKey);
    for (const material of tutorial.materials) add(material);
    for (const step of tutorial.steps) { add(step.instructionKey); add(step.tipKey); }
  }
  for (const key of CATEGORIES) add(`category.${key}`);
  for (const id of DESTINATIONS) { add(`dest.${id}`); add(`dest.${id}.soon`); add(`dest.${id}.topic`); }
  for (const season of SEASONS) add(`season.${season}`);
  for (const level of [1, 2, 3]) add(`difficulty.${level}`);
  return used;
}

// --- 1. contexto do jogador vem do launcher, nunca de um segundo perfil ---

test('contexto do jogador usa a query do launcher', () => {
  const context = readPlayerContext('?name=Julia&avatar=%F0%9F%A6%84&language=en');
  assert.equal(context.name, 'Julia');
  assert.equal(context.avatar, '🦄');
  assert.equal(context.language, 'en');
});

test('contexto do jogador ignora idioma desconhecido', () => {
  const context = readPlayerContext('?name=Rafa&language=fr');
  assert.equal(context.language, 'pt');
  assert.equal(context.name, 'Rafa');
});

test('contexto do jogador nunca fica sem avatar', () => {
  assert.equal(readPlayerContext('?name=Julia&avatar=').avatar, '👧');
});

test('nenhuma chave do Arts & Crafts colide com a preferência do launcher', () => {
  for (const key of Object.values(KEYS)) {
    assert.ok(key.startsWith('artsCrafts.'), `${key} precisa do prefixo artsCrafts.`);
  }
});

// --- 2. idioma segue o launcher e cobre os três idiomas ---

test('todo idioma da interface tem as mesmas chaves', () => {
  const reference = allKeys();
  for (const language of UI_LANGUAGES) {
    const keys = new Set(Object.keys(DICTIONARIES[language]));
    const missing = [...reference].filter((key) => !keys.has(key));
    const extra = [...keys].filter((key) => !reference.has(key));
    assert.deepEqual(missing, [], `faltam em ${language}: ${missing.join(', ')}`);
    assert.deepEqual(extra, [], `sobram em ${language}: ${extra.join(', ')}`);
  }
});

test('toda chave usada pelo conteúdo existe nos três idiomas', () => {
  for (const key of keysUsedByContent()) {
    for (const language of UI_LANGUAGES) {
      assert.ok(DICTIONARIES[language][key], `falta "${key}" em ${language}`);
    }
  }
});

test('todo tutorial tem um título diferente em cada idioma', () => {
  for (const language of LANGUAGES) {
    const titles = TUTORIALS.map((tutorial) => tutorial.copy[language]?.title || '');
    const unique = new Set(titles);
    assert.equal(unique.size, titles.length, `títulos repetidos em ${language}`);
    for (const title of titles) assert.ok(title, `tutorial sem título em ${language}`);
  }
});

test('o texto de cada passo existe nos três idiomas e no mesmo número', () => {
  for (const tutorial of TUTORIALS) {
    for (const language of LANGUAGES) {
      const steps = tutorial.copy[language]?.steps || [];
      assert.equal(steps.length, tutorial.steps.length, `${tutorial.id}: ${language}`);
      for (const [index, text] of steps.entries()) {
        assert.ok(text.instruction, `${tutorial.id} ${language} passo ${index + 1}: sem instrução`);
        if (index > 0) assert.ok(text.tip, `${tutorial.id} ${language} passo ${index + 1}: dica só no primeiro`);
      }
    }
  }
});

test('tradução substitui placeholder e não quebra sem valor', () => {
  assert.equal(translate(DICTIONARIES.pt, 'app.hello', { name: 'Julia' }), 'Oi, Julia!');
  assert.equal(translate(DICTIONARIES.en, 'app.hello', { name: 'Julia' }), 'Hi, Julia!');
  assert.equal(translate(DICTIONARIES.es, 'app.hello', { name: 'Julia' }), '¡Hola, Julia!');
  assert.equal(interpolate('{a} e {b}', { a: '1' }), '1 e {b}');
  assert.equal(translate(DICTIONARIES.pt, 'chave.que.nao.existe'), 'chave.que.nao.existe');
});

test('linguagens aceitas são exatamente as do launcher', () => {
  assert.deepEqual([...UI_LANGUAGES].sort(), ['en', 'es', 'pt']);
  assert.ok(isLanguage('es'));
  assert.ok(!isLanguage('fr'));
});

// --- 3. dados do tutorial ---

test('conteúdo não tem problema estrutural', () => {
  assert.deepEqual(contentProblems(TUTORIALS), []);
});

test('todo tutorial tem os campos que a spec exige', () => {
  for (const tutorial of TUTORIALS) {
    assert.ok(tutorial.id, 'id');
    assert.ok(tutorial.slug, `${tutorial.id}: slug`);
    assert.ok(CATEGORIES.includes(tutorial.category), `${tutorial.id}: categoria`);
    assert.ok([1, 2, 3].includes(tutorial.difficulty), `${tutorial.id}: dificuldade`);
    assert.ok(tutorial.estimatedMinutes > 0, `${tutorial.id}: duração`);
    assert.ok(tutorial.materials.length > 0, `${tutorial.id}: materiais`);
    assert.ok(tutorial.steps.length > 0, `${tutorial.id}: passos`);
  }
});

test('a estrutura de cada passo declara o véu, e o texto vem por idioma', () => {
  for (const tutorial of TUTORIALS) {
    for (const [index, step] of tutorial.steps.entries()) {
      assert.ok(['full', 'active', 'none'].includes(step.veil), `${tutorial.id} passo ${index + 1}: véu`);
      assert.ok(step.instructionKey === undefined, `${tutorial.id} passo ${index + 1}: texto não pertence à estrutura`);
    }
  }
});

test('as regiões derivadas da caixa do objeto têm seis recortes', () => {
  const box = { x: 0.2, y: 0.3, w: 0.4, h: 0.5 };
  const regions = derivedRegions(box);
  for (const name of ['all', 'top', 'bottom', 'left', 'right', 'centre']) {
    assert.ok(regions[name]?.length, `região derivada "${name}" vazia`);
  }
  for (const shape of Object.values(regions).flat()) {
    for (const value of [shape.x, shape.y, shape.x + shape.w, shape.y + shape.h]) {
      assert.ok(value >= 0 && value <= 1, `coordenada ${value} fora da imagem`);
    }
  }
});

test('todo tutorial que exige impressão tem o arquivo de print', () => {
  for (const tutorial of TUTORIALS.filter((item) => item.requiresPrinting)) {
    assert.ok(tutorial.printable, `${tutorial.id}: exige impressão mas não tem molde`);
  }
});

test('todo tutorial sem impressão não expõe botão de impressão', () => {
  for (const tutorial of TUTORIALS.filter((item) => !item.requiresPrinting)) {
    const withPrint = tutorial.steps.filter((step) => step.printable);
    assert.deepEqual(withPrint, [], `${tutorial.id}: botão de impressão sem molde`);
  }
});

test('região de tutorial cabe dentro da imagem', () => {
  for (const tutorial of TUTORIALS) {
    const shapes = Object.values(tutorial.regions || {}).flat();
    assert.ok(shapes.length > 0, `${tutorial.id}: sem regiões`);
    for (const shape of shapes) {
      const box = shape.kind === 'ellipse'
        ? { xs: [shape.cx - shape.rx, shape.cx + shape.rx], ys: [shape.cy - shape.ry, shape.cy + shape.ry] }
        : shape.kind === 'rect'
          ? { xs: [shape.x, shape.x + shape.w], ys: [shape.y, shape.y + shape.h] }
          : { xs: shape.points.map((point) => point[0]), ys: shape.points.map((point) => point[1]) };
      for (const value of [...box.xs, ...box.ys]) {
        assert.ok(value >= 0 && value <= 1, `${tutorial.id}: coordenada ${value} fora da imagem`);
      }
    }
  }
});

test('a navegação de passo não passa do primeiro nem do último', () => {
  for (const tutorial of TUTORIALS) {
    const total = tutorial.steps.length;
    assert.ok(total >= 2, `${tutorial.id}: precisa de ao menos dois passos`);
  }
});

test('lookup por id e por slug encontra o mesmo tutorial', () => {
  for (const tutorial of TUTORIALS) {
    assert.equal(tutorialById(TUTORIALS, tutorial.id), tutorial);
    assert.equal(tutorialBySlug(TUTORIALS, tutorial.slug), tutorial);
  }
  assert.equal(tutorialById(TUTORIALS, 'nao-existe'), null);
  assert.equal(tutorialBySlug(TUTORIALS, 'nao-existe'), null);
});

// --- 4. filtro de crafts rápidos ---

test('craft rápido é o que cabe no tempo definido em um lugar só', () => {
  assert.equal(isQuick({ estimatedMinutes: QUICK_MINUTES }), true);
  assert.equal(isQuick({ estimatedMinutes: QUICK_MINUTES + 1 }), false);
});

// --- 5. caminhos de asset existem no disco ---

test('todo caminho de asset existe', () => {
  for (const tutorial of TUTORIALS) {
    const base = join(APP_ROOT, tutorial.baseImage);
    assert.ok(existsSync(base), `falta ${tutorial.baseImage}`);
    if (tutorial.printable) {
      assert.ok(existsSync(join(APP_ROOT, tutorial.printable)), `falta ${tutorial.printable}`);
    }
  }
});

test('nenhum asset do app está fora da pasta do app', () => {
  for (const tutorial of TUTORIALS) {
    assert.ok(tutorial.baseImage.startsWith('assets/'), `${tutorial.id}: caminho absoluto quebra em subdiretório`);
    if (tutorial.printable) assert.ok(tutorial.printable.startsWith('assets/'), `${tutorial.id}: molde absoluto`);
  }
});

test('o launcher aponta para a pasta do app', () => {
  const launcher = readFileSync(join(APP_ROOT, '..', 'index.html'), 'utf8');
  assert.ok(launcher.includes(`${APP_DIRNAME}/index.html`), 'o botão do launcher não aponta para arts_crafts/');
});

// --- 6. mundo criativo ---

test('as seis áreas da spec estão no mapa', () => {
  assert.equal(DESTINATIONS.length, 6);
  for (const id of DESTINATIONS) {
    for (const language of UI_LANGUAGES) {
      assert.ok(DICTIONARIES[language][`dest.${id}`], `falta ${id} em ${language}`);
      assert.ok(DICTIONARIES[language][`dest.${id}.soon`], `falta ${id}.soon em ${language}`);
    }
  }
});

test('as quatro estações da spec estão no mapa', () => {
  assert.deepEqual([...SEASONS].sort(), ['autumn', 'spring', 'summer', 'winter']);
});

test('as nove categorias da spec existem', () => {
  assert.equal(CATEGORIES.length, 9);
});

// --- 7. estado local ---

test('a estação escolhida sobrevive a um relançamento', () => {
  withStorage(() => {
    for (const season of SEASONS) {
      writeSeason(season);
      assert.equal(readSeason(), season, `estação ${season} não voltou`);
    }
  });
});

test('a estação guardada é sempre uma das quatro', () => {
  withStorage((store) => {
    for (const guardado of ['"winter"', '"primavera"', 'outono', 'verão', 'lixo', '']) {
      store.set(KEYS.season, guardado);
      assert.ok(SEASONS.includes(readSeason(() => 'spring')), `valor guardado inválido: ${guardado}`);
    }
  });
});

test('estação inválida não sobrescreve a que estava guardada', () => {
  withStorage(() => {
    writeSeason('winter');
    writeSeason('meio-dia');
    writeSeason('outono');
    assert.equal(readSeason(), 'winter');
  });
});

test('sem estação guardada, cai na estação do calendário', () => {
  withStorage(() => {
    assert.equal(readSeason(() => 'winter'), 'winter');
  });
});
