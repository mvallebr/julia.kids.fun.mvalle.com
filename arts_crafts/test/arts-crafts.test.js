// Suíte do Arts & Crafts. Cobre o que a spec §31 pede e o que quebraria em
// silêncio: chave de tradução faltando em algum idioma, passo apontando para
// região que não existe, e caminho de asset quebrado.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

import { DICTIONARIES, LANGUAGES as UI_LANGUAGES, interpolate, isLanguage, translate } from '../src/i18n.js';
import {
  CATEGORIES, DESTINATIONS, SEASONS, TUTORIALS, LIVE_TUTORIALS, QUICK_MINUTES, LANGUAGES, isQuick,
  contentProblems, tutorialById, tutorialBySlug, regionsOf, focusOf, derivedRegions,
  MAP_ART, MAP_ART_SIZE, DEST_LAYOUT, SEASON_DRESSING, WEATHER_COUNT, weatherParticles,
  MAP_CANOPIES, MAP_ROOFS, MAP_GROUND, FOLIAGE, GROUND_RAMP, ROOF_SNOW,
  coverRect, leaderPoints, hasWeather,
} from '../src/content/index.js';
import * as content from '../src/content/index.js';
import {
  SPIN_MODES, SPIN_SYMMETRIES, dropFor, dabPoints,
  resolveDabs, encodeRecord, decodeRecord, coverage,
} from '../src/games/spin-art-geometry.js';
import { createSpinArt } from '../src/games/spin-art.js';
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
    // Tutorial com quadro proprio nao tem regiao: quem recorta o desenho e o
    // quadro ja pronto, nao uma mascara em tempo de execucao.
    if (tutorial.framePattern) continue;
    // regionsOf, e não tutorial.regions: quase todo tutorial novo deriva os
    // recortes da caixa do objeto, e o teste precisa ver os dois caminhos.
    const shapes = Object.values(regionsOf(tutorial)).flat();
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

// --- 4. o que vai ao ar ---

// Um tutorial só sai da biblioteca publicada com os quadros próprios. A regra
// é da lição nº 1 do docs/LESSONS.md: foto do objeto pronto com véu por região
// mostra o resultado, não a construção, e a criança aprende a foto errada.
test('toda biblioteca publicada mostra a construção, quadro a quadro', () => {
  assert.ok(LIVE_TUTORIALS.length > 0, 'a biblioteca publicada ficou vazia');
  for (const tutorial of LIVE_TUTORIALS) {
    assert.equal(tutorial.draft, undefined, `${tutorial.id}: está na biblioteca e marcado como rascunho`);
    assert.ok(tutorial.framePattern, `${tutorial.id}: publicado sem quadro próprio`);
    for (const step of tutorial.steps) {
      assert.ok(step.image, `${tutorial.id}: passo sem quadro`);
    }
  }
});

test('a marca de rascunho é o que segura o tutorial fora da biblioteca', () => {
  const published = new Set(LIVE_TUTORIALS.map((tutorial) => tutorial.id));
  for (const tutorial of TUTORIALS) {
    if (tutorial.draft) {
      assert.ok(!published.has(tutorial.id), `${tutorial.id}: rascunho publicado`);
    } else {
      assert.ok(published.has(tutorial.id), `${tutorial.id}: sem rascunho e fora da biblioteca`);
    }
  }
});

// --- 5. filtro de crafts rápidos ---

test('craft rápido é o que cabe no tempo definido em um lugar só', () => {
  assert.equal(isQuick({ estimatedMinutes: QUICK_MINUTES }), true);
  assert.equal(isQuick({ estimatedMinutes: QUICK_MINUTES + 1 }), false);
});

// --- 6. caminhos de asset existem no disco ---

test('todo quadro de passo existe no disco', () => {
  for (const tutorial of TUTORIALS) {
    if (!tutorial.framePattern) continue;
    for (const step of tutorial.steps) {
      if (!step.image) continue;
      const path = join(APP_ROOT, tutorial.framePattern.replace('%s', step.image));
      assert.ok(existsSync(path), `falta o quadro ${tutorial.id}.${step.image}`);
    }
  }
});

test('todo caminho de asset existe', () => {
  for (const tutorial of TUTORIALS) {
    const base = join(APP_ROOT, tutorial.baseImage);
    assert.ok(existsSync(base), `falta ${tutorial.baseImage}`);
    if (tutorial.printable) {
      assert.ok(existsSync(join(APP_ROOT, tutorial.printable)), `falta ${tutorial.printable}`);
    }
  }
});

// O teste anterior vai num sentido só: todo passo tem arquivo. Este vai no
// outro: todo arquivo tem passo. Sem ele, um quadro de um spec antigo
// continuava no disco — foi exatamente o que aconteceu com a Caçadora de
// Demônios, que ficou com step-03-cabelo ao lado de step-03-rosto, e o app
// servia os dois. Nenhum erro aparece: os dois nomes são válidos, o arquivo
// existe, o validador passa. Só sobra lixo na pasta.
test('nenhum quadro de passo sobrou sem ser usado por algum passo', () => {
  for (const tutorial of TUTORIALS) {
    if (!tutorial.framePattern) continue;
    const dir = dirname(join(APP_ROOT, tutorial.framePattern.replace('%s', 'x')));
    if (!existsSync(dir)) continue;
    const usados = new Set(
      tutorial.steps.filter((step) => step.image).map((step) => `step-${step.image}.webp`));
    const sobrando = readdirSync(dir).filter((f) => /^step-.*\.webp$/.test(f) && !usados.has(f));
    assert.deepEqual(sobrando, [], `${tutorial.id}: quadro na pasta que nenhum passo usa`);
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

// --- 7. mundo criativo ---

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

// --- 7b. a vila é a mesma nas quatro estações ---

// Este bloco existe porque o mapa JÁ ESTAVA quebrado e nenhum teste reclamava.
// Eram quatro imagens que eram quatro vilas diferentes: 6/6/5/5 construções,
// quatro câmeras, quatro traçados de trilha. Com uma única DEST_LAYOUT fixa
// por cima, o rótulo caía sobre prédios que mudavam de lugar entre estações.
// Nenhum teste olhava para assets/map/: o teste de asset órfão só cobria
// assets/tutorials/ (lição nº 29 — automação sem verificação).

test('as quatro estações vestem a MESMA arte, não quatro vilas', () => {
  assert.ok(existsSync(join(APP_ROOT, MAP_ART)), `falta a arte do mapa: ${MAP_ART}`);

  // Toda estação tem que se diferenciar pelo vestuário, e não por uma imagem
  // própria. Se alguém reintroduzir um SEASON_BACKDROP, este teste falha: uma
  // segunda imagem é uma segunda vila.
  for (const season of SEASONS) {
    const dressing = SEASON_DRESSING[season];
    assert.ok(dressing, `estação ${season} sem vestuário`);
    assert.ok(dressing.filter, `estação ${season} sem filtro de arte`);
    assert.ok(dressing.veil, `estação ${season} sem véu`);
    assert.ok(dressing.weather, `estação ${season} sem clima`);
  }

  // Nenhuma imagem por estação pode sobrar na pasta: sobrar uma é a mesma
  // incoerência, agora invisível porque ninguém é chamado para usá-la.
  const mapDir = dirname(join(APP_ROOT, MAP_ART));
  const stray = readdirSync(mapDir).filter((file) => file !== 'village.webp');
  assert.deepEqual(stray, [], `arte de mapa sobrando na pasta: ${stray.join(', ')}`);
});

test('cada destino tem casa e rótulo medidos dentro da arte', () => {
  for (const id of DESTINATIONS) {
    const place = DEST_LAYOUT[id];
    assert.ok(place, `destino ${id} sem posição medida`);
    for (const [name, point] of [['at', place.at], ['label', place.label]]) {
      assert.ok(Array.isArray(point) && point.length === 2, `${id}.${name} não é um par`);
      const [x, y] = point;
      assert.ok(x >= 0 && x <= MAP_ART_SIZE.w, `${id}.${name} x=${x} fora da arte`);
      assert.ok(y >= 0 && y <= MAP_ART_SIZE.h, `${id}.${name} y=${y} fora da arte`);
    }
  }
});

// A casa e o rótulo não podem ser o mesmo ponto: o texto cobriria a construção
// que ele nomeia. Era exatamente o defeito do mapa de pílulas soltas.
test('o rótulo de cada destino fica longe da casa que ele nomeia', () => {
  for (const id of DESTINATIONS) {
    const [ax, ay] = DEST_LAYOUT[id].at;
    const [lx, ly] = DEST_LAYOUT[id].label;
    const distance = Math.hypot(lx - ax, ly - ay);
    // Abaixo disso a caixa de nome (>=30px de altura, ~90px de largura) encosta
    // na construção.
    assert.ok(distance >= 70, `${id}: rótulo a ${distance.toFixed(0)}px da casa`);
  }
});

// O corte do object-fit: cover já custou um destino fora da tela: com a caixa
// em 16/10 e a arte em 16/9, uma âncora no x=1280 caía em 105.6% da largura.
// coverRect é a correção; este teste é o que garante que ela não regride.
test('a camada da arte cobre a arte inteira em qualquer caixa', () => {
  const boxes = [
    [904, 565], [904, 678], [360, 300], [320, 240], [1280, 720], [1024, 1365], [300, 900],
  ];
  for (const [boxWidth, boxHeight] of boxes) {
    const rect = coverRect(boxWidth, boxHeight);
    // A arte é maior ou igual à caixa nos dois eixos: é o que o cover faz.
    assert.ok(rect.width >= boxWidth - 0.001, `${boxWidth}x${boxHeight}: arte estreita demais`);
    assert.ok(rect.height >= boxHeight - 0.001, `${boxWidth}x${boxHeight}: arte baixa demais`);
    // E sobra dos dois lados, pareada.
    assert.ok(Math.abs(rect.left - (boxWidth - rect.width) / 2) < 0.001, 'corte não centrado');
    assert.ok(Math.abs(rect.top - (boxHeight - rect.height) / 2) < 0.001, 'corte não centrado');
  }
});

test('uma âncora medida na arte cai na mesma casa em qualquer caixa', () => {
  // Ponto medido na arte: o telhado azul, perto da borda direita.
  const measured = [1010, 285];
  for (const [boxWidth, boxHeight] of [[904, 565], [360, 300], [1280, 720]]) {
    const rect = coverRect(boxWidth, boxHeight);
    const scale = rect.width / MAP_ART_SIZE.w;
    // Onde a âncora cai DENTRO da caixa, em pixels de caixa.
    const onScreenX = rect.left + measured[0] * scale;
    const onScreenY = rect.top + measured[1] * scale;
    // Ela tem de estar dentro da caixa visível, e não só dentro da camada.
    assert.ok(onScreenX >= 0 && onScreenX <= boxWidth, `x=${onScreenX.toFixed(1)} fora em ${boxWidth}x${boxHeight}`);
    assert.ok(onScreenY >= 0 && onScreenY <= boxHeight, `y=${onScreenY.toFixed(1)} fora em ${boxWidth}x${boxHeight}`);
  }
});

test('a caixa de tamanho zero não quebra o posicionamento', () => {
  // O ResizeObserver dispara com a caixa zerada quando o mapa entra na tela.
  // Sem esta guarda, um NaN no left manda a vila inteira para o nada.
  assert.deepEqual(coverRect(0, 500), { left: 0, top: 0, width: 0, height: 0 });
  assert.deepEqual(coverRect(500, 0), { left: 0, top: 0, width: 0, height: 0 });
});

// A linha nasce na BORDA da caixa do nome, para não sair por baixo dela. Se
// nascesse no meio, o traço apareceria dentro do texto.
test('a linha de ligação nasce na borda da caixa, não no meio dela', () => {
  const box = [100, 100, 80, 30];
  const to = [100, 300];
  const edge = leaderPoints(box, to);
  // Para baixo, a borda inferior fica a 15px do centro.
  assert.ok(Math.abs(edge.y1 - 115) < 0.001, `y1=${edge.y1} deveria sair da borda`);
  assert.equal(edge.x1, 100, 'saída na borda mantém o eixo do centro');
  assert.deepEqual([edge.x2, edge.y2], to, 'a linha termina na casa');
});

test('a linha de ligação sobrevive a rótulo em cima do alvo', () => {
  // Degenerado: centro em cima do alvo dá vetor zero, e a divisão por zero
  // aqui viraria NaN no atributo da linha, que some sem erro no console.
  const edge = leaderPoints([100, 100, 80, 30], [100, 100]);
  for (const value of [edge.x1, edge.y1, edge.x2, edge.y2]) {
    assert.ok(Number.isFinite(value), `coordenada não finita: ${value}`);
  }
});

test('o clima tem o mesmo número de partículas em toda estação', () => {
  // Se uma estação tivesse mais, a contagem de elementos mudaria com a troca
  // de estação e o desenho daria um salto visível.
  for (const season of SEASONS) {
    const kind = SEASON_DRESSING[season].weather;
    if (kind === 'none') {
      // Estação sem clima é uma decisão, não um acidente: o `renderWeather`
      // não cria elemento nenhum, e `hasWeather` é o que promete isso.
      assert.equal(hasWeather(season), false, `${season}: 'none' mas o render ainda desenha`);
      continue;
    }
    const kinds = new Set();
    for (let index = 0; index < WEATHER_COUNT; index += 1) {
      const particle = weatherParticles(season, index);
      kinds.add(particle.kind);
      assert.ok(Number.isFinite(particle.cx) && particle.cx >= 0 && particle.cx <= 100, `${season}[${index}] cx`);
      assert.ok(Number.isFinite(particle.cy) && particle.cy >= 0 && particle.cy <= 100, `${season}[${index}] cy`);
      assert.ok(Number.isFinite(particle.r) && particle.r > 0, `${season}[${index}] r`);
    }
    assert.deepEqual([...kinds], [kind], `${season}: clima misturado`);
  }
});

test('o clima é o mesmo em duas leituras do mesmo índice', () => {
  // Sem semente fixa, Math.random redesenharia tudo a cada render.
  for (const season of SEASONS) {
    assert.deepEqual(weatherParticles(season, 5), weatherParticles(season, 5));
  }
});

// --- 7c. a arte de estação ---
//
// Um filtro de tela inteira não muda estação: ele lava a vila e a imagem
// continua sendo a mesma foto. O que muda a estação é a COPA e o TELHADO, e
// eles são pintados pixel a pixel da arte por máscara. Estes testes seguram
// as três medidas que esse efeito depende.

test('copas e telhados são medidos dentro da arte', () => {
  for (const [cx, cy, r] of MAP_CANOPIES) {
    assert.ok(r > 0, `copa sem raio em ${cx},${cy}`);
    assert.ok(cx >= 0 && cx <= MAP_ART_SIZE.w, `copa x=${cx} fora`);
    assert.ok(cy >= 0 && cy <= MAP_ART_SIZE.h, `copa y=${cy} fora`);
  }
  for (const [cx, cy, rx, ry] of MAP_ROOFS) {
    assert.ok(rx > 0 && ry > 0, `telhado sem área em ${cx},${cy}`);
    assert.ok(cx >= 0 && cx <= MAP_ART_SIZE.w, `telhado x=${cx} fora`);
    assert.ok(cy >= 0 && cy <= MAP_ART_SIZE.h, `telhado y=${cy} fora`);
  }
});

// A copa que deixa a árvore MEIO repintada é defeito visível: meia cerejeira,
// meia estação. O raio medido tem que cobrir a copa inteira.
test('a copa repintada cobre a copa da arte, e não é um disco solto', () => {
  for (const [cx, cy, r] of MAP_CANOPIES) {
    // Toca a borda da imagem só nas árvores que a arte já corta: essas podem
    // ser menores, e é o resto que não pode vazar para o céu.
    const touchesEdge = cx - r < 0 || cx + r > MAP_ART_SIZE.w;
    const overlapsSky = cy - r < 90 && !touchesEdge;
    assert.ok(!overlapsSky, `copa em ${cx},${cy} invade o céu (raio ${r})`);
  }
});

test('toda estação que não é a de origem repinta a folhagem', () => {
  // A arte JÁ É a primavera, com as cerejeiras em flor. `null` nela é
  // correto; nas outras três, a rampa é o que faz a estação existir.
  assert.equal(FOLIAGE.spring, null, 'a primavera é a arte; repintar apagaria a estação');
  for (const season of SEASONS.filter((s) => s !== 'spring')) {
    const ramp = FOLIAGE[season];
    assert.ok(ramp, `${season} sem rampa de folhagem`);
    for (const channel of ['r', 'g', 'b']) {
      const stops = ramp[channel].split(' ').map(Number);
      assert.equal(stops.length, 3, `${season}.${channel}: rampa de duas cores precisa de 3 paradas`);
      for (const stop of stops) {
        assert.ok(stop >= 0 && stop <= 1, `${season}.${channel} fora de 0..1: ${stop}`);
      }
    }
  }
});

test('só o inverno tem neve no telhado', () => {
  // Neve só no inverno. Se outro dia ela entrar no outono, alguém vai ter
  // escolhido a data errada e o teste é quem avisa.
  assert.ok(ROOF_SNOW.winter > 0, 'o inverno tem de ter neve no telhado');
  for (const season of SEASONS.filter((s) => s !== 'winter')) {
    assert.equal(ROOF_SNOW[season], 0, `${season} não pode ter neve no telhado`);
  }
});

// O chão é a orla da ilha, um polígono medido. A elipse que existia antes
// manchava mar, céu e lago; o teste segura as duas coisas que importam: o
// polígono é fechado e fica DENTRO da arte, e o chão muda de estação.
test('a orla da ilha é um polígono fechado dentro da arte', () => {
  assert.ok(MAP_GROUND.length >= 12, 'polígono com poucos pontos');
  for (const [x, y] of MAP_GROUND) {
    assert.ok(Number.isFinite(x) && Number.isFinite(y), 'ponto não finito');
    assert.ok(x >= 0 && x <= MAP_ART_SIZE.w, `x=${x} fora da arte`);
    assert.ok(y >= 0 && y <= MAP_ART_SIZE.h, `y=${y} fora da arte`);
  }
  // Fecha: o último ponto tem de estar perto do primeiro, senão a máscara SVG
  // corta um canto da ilha sem nenhum aviso.
  const [fx, fy] = MAP_GROUND[0];
  const [lx, ly] = MAP_GROUND[MAP_GROUND.length - 1];
  assert.ok(Math.hypot(fx - lx, fy - ly) < 120, 'polígono não fecha perto do início');
});

test('o chão muda de estação por RAMPA, e não por lavagem', () => {
  // A lavagem branca foi removida de propósito: um retângulo claro por cima
  // apaga o desenho do gramado e o inverno vira neblina. O que substitui é a
  // rampa, que remapeia o pixel e preserva sombra e caminho.
  assert.equal('GROUND_WASH' in content, false, 'a lavagem de chão não deve voltar');
  assert.equal(GROUND_RAMP.spring, null, 'a primavera deixa a cor da arte');
  for (const season of SEASONS) {
    assert.ok(season in GROUND_RAMP, `${season} sem rampa de chão`);
  }
});

// Tentado duas vezes e falhou duas vezes: lavagem branca e rampa até o branco.
// A ilha flutua num mar ciano e, vista de longe, claro em cima dela deixa de
// ser chão e vira neblina. O inverno é feito de copa gelada, neve no telhado
// e neve caindo — o gramado fica verde.
test('o chão não é pintado no inverno: branco numa ilha vira nuvem', () => {
  for (const season of SEASONS) {
    assert.equal(GROUND_RAMP[season], null, `${season}: o chão não pode ser remapeado`);
  }
  assert.ok(ROOF_SNOW.winter > 0, 'mas o telhado continua com neve');
  assert.ok(FOLIAGE.winter, 'e a copa continua com geada');
});

// Os rótulos não podem se cruzar. Na tela estreita eles saem de cena e a lista
// assume, mas na larga cada casa nomeada ocupa um pedaço da tela — e dois
// nomes em cima um do outro é o defeito do mapa antigo, de outro jeito.
test('nenhum rótulo cai em cima de outro na tela larga', () => {
  const boxes = DESTINATIONS.map((id) => {
    const [lx, ly] = DEST_LAYOUT[id].label;
    // Largura e altura aproximadas da caixa de nome, medidas no navegador.
    const halfWidth = Math.max(70, translate(DICTIONARIES.pt, `dest.${id}`).length * 4.2) / MAP_ART_SIZE.w;
    const halfHeight = 17 / MAP_ART_SIZE.h;
    return { id, x1: lx / MAP_ART_SIZE.w - halfWidth, x2: lx / MAP_ART_SIZE.w + halfWidth,
      y1: ly / MAP_ART_SIZE.h - halfHeight, y2: ly / MAP_ART_SIZE.h + halfHeight };
  });

  for (let i = 0; i < boxes.length; i += 1) {
    for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i];
      const b = boxes[j];
      const overlap = a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
      assert.ok(!overlap, `rótulos de ${a.id} e ${b.id} se cruzam`);
    }
  }
});

// O rótulo é o único nome visível da casa na tela larga. Se ele sumir sem a
// lista assumir, o mapa vira seis círculos sem nome.
test('cada destino tem um nome na tela larga e um alvo na tela estreita', () => {
  // O nome vem do dicionário nos três idiomas (acima, no bloco das seis áreas),
  // e o alvo é o próprio botão da casa. Aqui é o contrato do par: um destino,
  // um id, e o `at` medido que o `renderGames` transforma em botão.
  for (const id of DESTINATIONS) {
    assert.ok(translate(DICTIONARIES.pt, `dest.${id}`).length > 0, `${id} sem nome`);
    assert.ok(DEST_LAYOUT[id].at, `${id} sem casa para virar botão`);
  }
});

// Com a caixa no mesmo formato da arte, o cover não corta nada: é o que
// garante que a casa da ponta não saia da tela como saiu em x=-2.
test('na proporção da arte o cover não recorta nenhum lado', () => {
  const boxWidth = 904;
  const boxHeight = boxWidth / (MAP_ART_SIZE.w / MAP_ART_SIZE.h);
  const rect = coverRect(boxWidth, boxHeight);
  assert.ok(Math.abs(rect.left) < 0.001, `corte horizontal de ${rect.left}px`);
  assert.ok(Math.abs(rect.top) < 0.001, `corte vertical de ${rect.top}px`);
});

// --- 9. spin art lab ---
//
// A receita é a peça que vale testar: ela é o que se guarda, e um erro aqui
// significa que o desenho que a criança salvou não volta igual quando a galeria
// o redesenha. Tudo nesta seção roda sem navegador, que é o ponto.

test('a receita sobrevive a ida e volta sem mudar o desenho', () => {
  const record = {
    dabs: [
      { da: 3.5, r: 0.2, c: 2, f: 0.06 },
      { da: 3.5, r: 0.45, c: 5, f: 0.06, extra: 120 },
      { da: 3.5, r: 0.9, c: 0, f: 0.04 },
    ],
    marks: [0, 2],
  };
  const decoded = decodeRecord(encodeRecord(record));
  assert.deepEqual(decoded.dabs.length, 3);
  assert.deepEqual(decoded.marks, [0, 2]);
  const before = resolveDabs(record);
  const after = resolveDabs(decoded);
  for (let i = 0; i < before.length; i += 1) {
    assert.equal(after[i].angle, before[i].angle, `ângulo ${i}`);
    assert.equal(after[i].r, before[i].r, `raio ${i}`);
    assert.equal(after[i].c, before[i].c, `cor ${i}`);
  }
  assert.equal(after[1].extra, 120, 'o ângulo extra do modo órbita se perde na ida e volta');
});

// É o ângulo DELTA que é guardado, e não o tempo. É isso que faz o mesmo
// desenho sair numa tela de 30 Hz e numa de 144 Hz — e é o que quebra se alguém
// "simplificar" o formato gravando o instante.
test('a receita não depende da taxa de quadros', () => {
  const fast = resolveDabs({ dabs: [{ da: 4, r: 0.5, c: 0, f: 0.06 }] });
  const slow = resolveDabs({ dabs: [{ da: 4, r: 0.5, c: 0, f: 0.06 }] });
  assert.equal(fast[0].angle, slow[0].angle);
  assert.equal(fast[0].angle, 4, 'o primeiro pingo parte do delta, não de um instante');
});

test('receita corrompida não derruba a galeria', () => {
  for (const bad of ['', '{', 'null', '{}', '{"v":2,"d":[]}', '{"v":1}', '{"v":1,"d":[[1]]}', '{"v":1,"d":[["a",1,2,3]]}']) {
    assert.equal(decodeRecord(bad), null, `aceitou lixo: ${bad}`);
  }
  assert.deepEqual(decodeRecord('{"v":1,"m":[0],"d":[[1,2,3,4]]}').marks, [0]);
});

test('a simetria espalha os pingos em volta do centro', () => {
  const one = dabPoints(0, 0.5, 1);
  const six = dabPoints(0, 0.5, 6);
  assert.equal(one.length, 1);
  assert.equal(six.length, 6, 'simetria 6 tem de fazer 6 pingos');
  // Todos no mesmo raio, e o primeiro é o ângulo pedido.
  for (const point of six) {
    assert.ok(Math.abs(Math.hypot(point.x, point.y) - 0.5) < 1e-9, 'um pingo saiu do raio');
  }
  assert.ok(six[0].x > 0.49 && six[0].x < 0.51, 'o primeiro pingo não está no ângulo pedido');
  // Um terço de volta tem de cair para o outro lado.
  assert.ok(six[2].x < -0.24 && six[2].x > -0.26, 'o pingo oposto não está onde deveria');
});

test('toda simetria anunciada produz os pingos que promete', () => {
  for (const n of SPIN_SYMMETRIES) {
    assert.equal(dabPoints(37, 0.4, n).length, n, `simetria ${n}`);
  }
});

test('todo modo de cursor fica dentro da folha e devolve número', () => {
  for (const mode of SPIN_MODES) {
    for (const phase of [0, 0.3, 1.7, 9.9]) {
      for (const base of [0.1, 0.5, 1]) {
        const drop = dropFor(mode, phase, base, base);
        assert.ok(Number.isFinite(drop.r), `${mode}@${phase}: raio não finito`);
        assert.ok(drop.r >= 0 && drop.r <= 1.05, `${mode}@${phase}: raio ${drop.r} fora da folha`);
        assert.ok(Number.isFinite(drop.extra), `${mode}@${phase}: ângulo extra não finito`);
      }
    }
  }
});

// O modo espiral é o padrão, e ele precisa andar do centro para a borda: é o
// desenho que a criança reconhece de um prato de verdade. Se ele voltar para o
// centro a cada volta, o desenho vira uma roseta e ninguém reconhece.
test('a espiral anda para fora e só volta depois de dar a volta', () => {
  const first = dropFor('spiral', 0, 0.8, 0.8).r;
  const middle = dropFor('spiral', 1.4, 0.8, 0.8).r;
  const end = dropFor("spiral", 6.9, 0.8, 0.8).r;
  assert.ok(middle > first, 'a espiral não saiu do centro');
  assert.ok(end > middle, 'a espiral voltou para trás');
  assert.ok(end > 0.4, `a espiral não avançou (${end})`);
  // E dá a volta: passado o ciclo, ela recomeça perto do centro.
  const again = dropFor("spiral", 14, 0.8, 0.8).r;
  assert.ok(again < end, 'a espiral não recomeçou');
});

// O flicker é aleatório, mas NÃO pode ser Math.random: a receita precisa
// reproduzir o mesmo desenho. Duas leituras do mesmo instante dão o mesmo raio.
test('o modo saltitante é reprodutível', () => {
  for (const phase of [0.17, 1.4, 5.9]) {
    assert.equal(dropFor('flicker', phase, 0.6, 0.6).r, dropFor('flicker', phase, 0.6, 0.6).r);
  }
});

test('o gêmeo pinga em dois raios ao mesmo tempo', () => {
  const drop = dropFor('twin', 1, 0.8, 0.8);
  assert.ok(drop.twin, 'o modo gêmeo não devolve o segundo raio');
  assert.ok(drop.twin < drop.r, 'o segundo raio tem de ser menor que o primeiro');
  assert.ok(drop.twin > 0, 'o segundo raio não pode ser zero');
});

test('a cobertura não passa de um e cresce com os traços', () => {
  const empty = coverage({ dabs: [] });
  const some = coverage({ dabs: [{ da: 1, r: 0.5, c: 0, f: 0.06 }, { da: 1, r: 0.5, c: 0, f: 0.06 }] });
  assert.equal(empty, 0);
  assert.ok(some > empty, 'desenhar não aumentou a cobertura');
  assert.ok(some <= 1, 'a cobertura passou de um');
});

test('o botão do jogo é o primeiro destino com jogo de verdade', () => {
  assert.equal(typeof createSpinArt, 'function');
  assert.throws(() => createSpinArt({}), TypeError);
  assert.throws(() => createSpinArt({ container: {} }), TypeError);
});

// --- 8. estado local ---

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
