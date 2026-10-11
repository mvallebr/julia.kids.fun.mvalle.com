// Arts & Crafts Adventures — ponto de entrada.
//
// Roteamento por hash (`#/t/pint-uma-corujinha/2`), porque o app é uma página só
// servida do GitHub Pages: hash sobrevive a F5 e a link direto sem servidor de
// rota. O que a spec pede de link direto (§29) é deep link, e hash entrega.

import { CSS } from './styles.js';
import { DICTIONARIES, translate } from './i18n.js';
import {
  CATEGORIES, DESTINATIONS, SEASONS, SEASON_PALETTE, SEASON_DRESSING, DEST_LAYOUT,
  MAP_ART, MAP_ART_SIZE, MAP_CANOPIES, MAP_ROOFS, MAP_GROUND, FOLIAGE, GROUND_RAMP, ROOF_SNOW,
  HOME_ART, FEATURED_ID, TUTORIALS, LIVE_TUTORIALS, QUICK_MINUTES,
  LANGUAGES, WEATHER_COUNT, weatherParticles, coverRect, leaderPoints,
  isQuick, assetUrl, regionsOf, focusOf, tutorialById, tutorialBySlug, contentProblems,
} from './content/index.js';
import {
  readPlayerContext, readSeason, writeSeason, readProgressFor, writeProgressFor,
  readCompleted, readLastTutorial, readCreations, writeCreation, readSoundOn, writeSoundOn,
} from './state.js';
import { createSpinArt, paintRecord } from './games/spin-art.js';
import { decodeRecord, resolveDabs } from './games/spin-art-geometry.js';

// As strings do jogo, por idioma. Ficam fora do dicionário geral porque são um
// bloco só do jogo: traduzir o jogo é mexer num lugar, e não folhear o arquivo
// inteiro atrás de `spin.`.
const SPIN_STRINGS = Object.fromEntries(
  LANGUAGES.map((language) => [language, Object.fromEntries(
    Object.keys(DICTIONARIES.pt).filter((key) => key.startsWith('spin.'))
      .map((key) => [key, DICTIONARIES[language][key]]),
  )]),
);

const context = readPlayerContext();
const dictionary = DICTIONARIES[context.language];
const t = (key, values) => translate(dictionary, key, values);

// O texto de um tutorial vem do próprio tutorial, no idioma da jogadora. Se um
// idioma faltar, cai no português em vez de mostrar a chave na tela.
const DEFAULT_COPY = 'pt';
const copyOf = (tutorial) => tutorial.copy[context.language] || tutorial.copy[DEFAULT_COPY] || { steps: [] };
const titleOf = (tutorial) => copyOf(tutorial).title || '';
const stepText = (tutorial, index) => copyOf(tutorial).steps[index] || {};

const root = document.getElementById('app');

// A arte do mapa troca junto com o bundle, mas o NOME do arquivo não muda.
// Sem a versão na URL, quem já tinha `village.webp` em cache continua vendo a
// arte antiga com os marcadores da vila errada em cima — que é o defeito que
// esta arte veio resolver. A versão é a mesma do `?v=` do bundle, então os
// dois artefatos trocam juntos.
const bundleTag = document.querySelector('script[src*="lib/bundle.js"]');
const bundleVersion = new URL(bundleTag?.src || location.href, document.baseURI).searchParams.get('v') || '';

// O CSS entra pelo bundle em vez de um arquivo a parte: um artefato para
// versionar, e nenhum pedido extra antes da primeira pintura.
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);
document.documentElement.lang = { pt: 'pt-BR', en: 'en', es: 'es' }[context.language];

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else if (value !== null && value !== undefined) node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function topbar() {
  const back = el('button', { class: 'icon-btn', type: 'button', 'aria-label': t('nav.back'), onclick: () => { location.hash = '#/'; } }, [t('nav.back')]);
  return el('header', { class: 'topbar' }, [
    back,
    el('div', { class: 'identity' }, [
      el('span', { class: 'avatar', 'aria-hidden': 'true', text: context.avatar }),
      el('span', { class: 'greet', text: context.name ? t('app.hello', { name: context.name }) : t('app.title') }),
    ]),
    el('span', { class: 'spacer' }),
  ]);
}

/* ------------------------------------------------------------------ home --- */

function renderHome() {
  const card = (kind, emoji, titleKey, subKey, hash) => el('button', {
    class: `card-btn ${kind}`, type: 'button', onclick: () => { location.hash = hash; },
  }, [
    el('span', { class: 'emoji', 'aria-hidden': 'true', text: emoji }),
    el('span', { class: 'title', text: t(titleKey) }),
    el('span', { class: 'sub', text: t(subKey) }),
  ]);

  const last = readLastTutorial();
  const resume = last ? tutorialById(LIVE_TUTORIALS, last) : null;
  const progress = resume ? readProgressFor(resume.id) : null;

  return [
    topbar(),
    el('img', { class: 'hero', src: assetUrl(HOME_ART), alt: '', width: '1280', height: '720' }),
    el('h1', { text: t('app.title') }),
    el('p', { class: 'sub', text: t('tutorials.count', { count: LIVE_TUTORIALS.length }) }),
    resume && progress && !progress.completed
      ? el('button', {
          class: 'btn', type: 'button', onclick: () => { location.hash = `#/t/${resume.slug}/${progress.stepIndex}`; },
        }, [`${t('tutorials.continue')} — ${titleOf(resume)} (${progress.stepIndex + 1}/${resume.steps.length})`])
      : null,
    el('div', { class: 'cards' }, [
      card('tutorials', '🎨', 'home.tutorials', 'home.tutorialsSub', '#/tutorials'),
      card('games', '🗺️', 'home.games', 'home.gamesSub', '#/games'),
      card('gallery', '🖼️', 'home.gallery', 'home.gallerySub', '#/gallery'),
    ]),
  ].filter(Boolean);
}

/* ------------------------------------------------------------- tutorials --- */

const filters = { search: '', category: null, printable: false, quick: false };

function visibleTutorials() {
  const needle = filters.search.trim().toLowerCase();
  return LIVE_TUTORIALS.filter((tutorial) => {
    if (filters.category && tutorial.category !== filters.category) return false;
    if (filters.printable && !tutorial.requiresPrinting) return false;
    if (filters.quick && !isQuick(tutorial)) return false;
    if (!needle) return true;
    const title = titleOf(tutorial).toLowerCase();
    const description = (copyOf(tutorial).description || '').toLowerCase();
    return title.includes(needle) || description.includes(needle);
  });
}

function tutorialCard(tutorial) {
  const progress = readProgressFor(tutorial.id);
  const done = readCompleted().includes(tutorial.id);
  return el('button', {
    class: 'tut-card', type: 'button',
    'aria-label': titleOf(tutorial),
    onclick: () => { location.hash = `#/t/${tutorial.slug}/${progress?.completed ? 0 : (progress?.stepIndex || 0)}`; },
  }, [
    el('img', { src: assetUrl(tutorial.baseImage), alt: '', loading: 'lazy', width: '480', height: '360' }),
    el('div', { class: 'body' }, [
      el('span', { class: 'name', text: titleOf(tutorial) }),
      el('span', { class: 'meta' }, [
        el('span', { class: 'badge', text: t(`difficulty.${tutorial.difficulty}`) }),
        el('span', { class: 'badge', text: t('tutorial.time', { minutes: tutorial.estimatedMinutes }) }),
        tutorial.requiresPrinting ? el('span', { class: 'badge print', text: t('tutorials.printable') }) : null,
        done ? el('span', { class: 'badge done', text: t('tutorials.completed') }) : null,
      ]),
    ]),
  ]);
}

function renderTutorials() {
  const search = el('input', {
    class: 'search', type: 'search', value: filters.search,
    placeholder: t('tutorials.search'), 'aria-label': t('tutorials.search'),
    oninput: (event) => { filters.search = event.target.value; rerender(); },
  });

  const chip = (label, onClick, active) => el('button', {
    class: 'chip', type: 'button', 'aria-pressed': String(active), onclick: onClick,
  }, [label]);

  // Categoria sem nenhum tutorial publicado não vira chip: seria um botão que
  // só leva à tela de "nada encontrado".
  const liveCategories = new Set(LIVE_TUTORIALS.map((tutorial) => tutorial.category));
  const categoryChips = [chip(t('tutorials.all'), () => { filters.category = null; rerender(); }, !filters.category)];
  for (const category of CATEGORIES) {
    if (!liveCategories.has(category)) continue;
    categoryChips.push(chip(t(`category.${category}`), () => { filters.category = category; rerender(); }, filters.category === category));
  }
  categoryChips.push(chip(t('tutorials.printable'), () => { filters.printable = !filters.printable; rerender(); }, filters.printable));
  categoryChips.push(chip(t('tutorials.quick'), () => { filters.quick = !filters.quick; rerender(); }, filters.quick));

  const list = visibleTutorials();
  const featured = filters.search || filters.category || filters.printable || filters.quick ? null : tutorialById(LIVE_TUTORIALS, FEATURED_ID);

  return [
    topbar(),
    el('h1', { text: t('tutorials.heading') }),
    el('div', { class: 'filters' }, [search, el('div', { class: 'chips' }, categoryChips)]),
    featured
      ? el('div', {}, [
          el('h2', { class: 'section-label', text: t('tutorials.featured') }),
          el('div', { class: 'tut-grid' }, [tutorialCard(featured)]),
        ])
      : null,
    el('h2', { class: 'section-label', text: t(list.length === 1 ? 'tutorials.countOne' : 'tutorials.count', { count: list.length }) }),
    list.length
      ? el('div', { class: 'tut-grid' }, list.map(tutorialCard))
      : el('p', { class: 'empty', text: t('tutorials.empty') }),
  ].filter(Boolean);
}

/* ---------------------------------------------------------- tutorial view --- */

function shapeBox(shape) {
  if (shape.kind === 'ellipse') {
    return { left: (shape.cx - shape.rx) * 100, top: (shape.cy - shape.ry) * 100, width: shape.rx * 200, height: shape.ry * 200, round: true };
  }
  if (shape.kind === 'rect') {
    return { left: shape.x * 100, top: shape.y * 100, width: shape.w * 100, height: shape.h * 100, round: false };
  }
  const xs = shape.points.map((point) => point[0]);
  const ys = shape.points.map((point) => point[1]);
  const left = Math.min(...xs); const right = Math.max(...xs);
  const top = Math.min(...ys); const bottom = Math.max(...ys);
  return { left: left * 100, top: top * 100, width: (right - left) * 100, height: (bottom - top) * 100, round: false };
}

// O véu é UM elemento só, com as regiões furadas por máscara SVG. Cada região
// com seu próprio box-shadow gigante taparia as outras — a coruja tem duas
// orelhas, e uma taparia a segunda.
const SVG_NS = 'http://www.w3.org/2000/svg';

function veilElement(tutorial, step, maskId) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'veil');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');

  const defs = document.createElementNS(SVG_NS, 'defs');
  const mask = document.createElementNS(SVG_NS, 'mask');
  mask.setAttribute('id', maskId);
  const full = document.createElementNS(SVG_NS, 'rect');
  full.setAttribute('width', '100');
  full.setAttribute('height', '100');
  full.setAttribute('fill', '#fff');
  mask.appendChild(full);

  for (const shape of regionsOf(tutorial)[step.region] || []) {
    const node = document.createElementNS(SVG_NS, shape.kind);
    if (shape.kind === 'ellipse') {
      node.setAttribute('cx', shape.cx * 100);
      node.setAttribute('cy', shape.cy * 100);
      node.setAttribute('rx', shape.rx * 100);
      node.setAttribute('ry', shape.ry * 100);
    } else if (shape.kind === 'rect') {
      node.setAttribute('x', shape.x * 100);
      node.setAttribute('y', shape.y * 100);
      node.setAttribute('width', shape.w * 100);
      node.setAttribute('height', shape.h * 100);
    } else {
      node.setAttribute('points', shape.points.map((point) => `${point[0] * 100},${point[1] * 100}`).join(' '));
    }
    node.setAttribute('fill', '#000');
    mask.appendChild(node);
  }
  defs.appendChild(mask);
  svg.appendChild(defs);

  const sheet = document.createElementNS(SVG_NS, 'rect');
  sheet.setAttribute('width', '100');
  sheet.setAttribute('height', '100');
  sheet.setAttribute('fill', 'var(--veil)');
  sheet.setAttribute('mask', `url(#${maskId})`);
  svg.appendChild(sheet);
  return svg;
}

function stepImage(tutorial, step) {
  // Passo com imagem própria: quadro completo daquele estágio, sem véu. Serve
  // quando a pintura ou a montagem muda a imagem inteira entre passos.
  if (step.image) {
    if (tutorial.framePattern) return tutorial.framePattern.replace('%s', step.image);
    return step.image;
  }
  return tutorial.baseImage;
}

function stageFor(tutorial, step) {
  const stage = el('div', { class: 'stage' }, [
    el('img', { class: 'art', src: assetUrl(stepImage(tutorial, step)), alt: '', width: '1200', height: '900' }),
  ]);

  if (step.image) return stage;

  if (step.veil === 'full') {
    // Sem imagem de rascunho separada: a própria arte serve de contorno, apagada.
    stage.querySelector('.art').style.filter = 'grayscale(1) brightness(1.45) contrast(.55)';
    return stage;
  }
  if (step.veil === 'active') {
    stage.appendChild(veilElement(tutorial, step, 'veil-mask'));
    const focus = focusOf(tutorial)?.[step.region];
    if (focus) {
      const box = shapeBox(focus);
      stage.appendChild(el('div', {
        class: `hole${box.round ? ' circle' : ''}`,
        style: `left:${box.left}%;top:${box.top}%;width:${box.width}%;height:${box.height}%`,
      }));
    }
  }
  return stage;
}

function printTemplate(url) {
  const frame = el('iframe', { src: url, style: 'position:fixed;right:0;bottom:0;width:0;height:0;border:0' });
  document.body.appendChild(frame);
  frame.addEventListener('load', () => {
    try {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch {
      window.open(url, '_blank');
    }
    setTimeout(() => frame.remove(), 1000);
  }, { once: true });
}

function renderTutorial(slug, stepIndex) {
  const tutorial = tutorialBySlug(LIVE_TUTORIALS, slug);
  if (!tutorial) return renderTutorials();

  const total = tutorial.steps.length;
  const index = Math.min(Math.max(Number.isInteger(stepIndex) ? stepIndex : 0, 0), total - 1);
  const step = tutorial.steps[index];
  const text = stepText(tutorial, index);
  const isLast = index === total - 1;

  writeProgressFor(tutorial.id, index, isLast);

  const dots = el('div', { class: 'dots', 'aria-hidden': 'true' },
    tutorial.steps.map((_, position) => el('i', { class: position < index ? 'done' : (position === index ? 'on' : '') })));

  const side = el('div', { class: 'side' }, [
    el('p', { class: 'step-count', text: t('step.of', { n: index + 1, total }) }),
    dots,
    el('div', { class: 'panel' }, [el('p', { class: 'instruction', text: text.instruction })]),
    step.swatches
      ? el('div', { class: 'panel' }, [
          el('h3', { text: t('step.swatches') }),
          el('div', { class: 'swatches' }, [el('span'), el('span'), el('span')]),
        ])
      : null,
    text.tip ? el('div', { class: 'panel tip' }, [el('h3', { text: t('tutorial.tip') }), el('p', { text: text.tip })]) : null,
    text.safety ? el('div', { class: 'panel safety' }, [el('h3', { text: t('tutorial.safety') }), el('p', { text: text.safety })]) : null,
    el('div', { class: 'panel' }, [
      el('h3', { text: t('tutorial.materials') }),
      el('ul', {}, tutorial.materials.map((key) => el('li', { text: t(key) }))),
    ]),
  ].filter(Boolean));

  const go = (position) => { location.hash = `#/t/${tutorial.slug}/${position}`; };

  return [
    topbar(),
    el('h1', { text: titleOf(tutorial) }),
    el('div', { class: 'viewer' }, [stageFor(tutorial, step), side]),
    el('div', { class: 'nav-row' }, [
      el('button', { class: 'btn', type: 'button', disabled: index === 0 ? '' : null, onclick: () => go(index - 1) }, [t('step.prev')]),
      step.printable && tutorial.printable
        ? el('button', { class: 'btn print', type: 'button', onclick: () => printTemplate(assetUrl(tutorial.printable)) }, [`🖨️ ${t('step.print')}`])
        : null,
      el('button', {
        class: 'btn primary', type: 'button',
        onclick: () => { if (isLast) location.hash = `#/done/${tutorial.slug}`; else go(index + 1); },
      }, [isLast ? `🎉 ${t('step.finish')}` : t('step.next')]),
    ].filter(Boolean)),
  ];
}

function renderCelebration(slug) {
  const tutorial = tutorialBySlug(LIVE_TUTORIALS, slug);
  const lastIndex = tutorial ? tutorial.steps.length - 1 : -1;
  return [
    topbar(),
    el('h1', { text: t('celebrate.title', { name: context.name || '' }) }),
    tutorial && lastIndex >= 0
      ? el('div', { class: 'viewer' }, [
          el('div', { class: 'stage' }, [el('img', { class: 'art', src: assetUrl(tutorial.baseImage), alt: '', width: '1152', height: '864' })]),
          el('div', { class: 'side' }, [
            el('div', { class: 'panel' }, [
              el('p', { class: 'instruction', text: stepText(tutorial, lastIndex).instruction }),
            ]),
          ]),
        ])
      : null,
    el('div', { class: 'nav-row' }, [
      el('button', {
        class: 'btn', type: 'button',
        onclick: () => { location.hash = `#/t/${slug}/0`; },
      }, [t('celebrate.again')]),
      el('button', { class: 'btn primary', type: 'button', onclick: () => { location.hash = '#/tutorials'; } }, [t('celebrate.back')]),
    ]),
  ].filter(Boolean);
}

/* ----------------------------------------------------------------- games --- */

// O mapa é a MESMA arte nas quatro estações; só o vestuário muda. É por isso
// que a âncora pode ser medida uma vez na arte e valer para sempre: não há
// segunda imagem para a casa ter fugido.
function renderWeather(season, dressing) {
  // Estação sem clima não cria elemento nenhum: um <svg> vazio ainda ocupa
  // um nó, um seletor e uma camada de composição à toa.
  if (dressing.weather === 'none') return null;
  const svg = document.createElementNS(SVG_NS, 'svg');
  // A classed não é decoração: é o que seleciona a COR da partícula. Sem ela
  // nenhuma regra `.weather.<estação> .flake` casa e todo floco sai com o
  // preto padrão do SVG — que foi o que aconteceu quando o atributo sumiu.
  svg.setAttribute('class', `weather ${dressing.weather}`);
  // O clima vive no espaço da ARTE, e não num quadrado 0 0 100 100. Com
  // preserveAspectRatio `none`, um viewBox quadrado estica a largura e a
  // altura em taxas diferentes, e o círculo de neve saía elipse, o dobro de
  // largura. Como a arte e a caixa são 16/9, o espaço da arte escala por igual
  // nos dois eixos e a partícula continua redonda.
  svg.setAttribute('viewBox', `0 0 ${MAP_ART_SIZE.w} ${MAP_ART_SIZE.h}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');

  for (let index = 0; index < WEATHER_COUNT; index += 1) {
    const particle = weatherParticles(season, index);
    const node = document.createElementNS(SVG_NS, 'circle');
    // Posição e raio saem da unidade de porcentagem para pixel de arte.
    node.setAttribute('cx', (particle.cx / 100 * MAP_ART_SIZE.w).toFixed(1));
    node.setAttribute('cy', (particle.cy / 100 * MAP_ART_SIZE.h).toFixed(1));
    node.setAttribute('r', (particle.r / 100 * MAP_ART_SIZE.w).toFixed(1));
    node.setAttribute('class', 'flake');
    node.style.setProperty('--drift', `${particle.drift || 0}px`);
    node.style.setProperty('--delay', `${(-index * 0.63).toFixed(2)}s`);
    node.style.setProperty('--dur', `${(5.5 + (index % 5) * 1.3).toFixed(2)}s`);
    svg.appendChild(node);
  }
  return svg;
}

// A arte de estação é uma CÓPIA da mesma imagem, filtrada e recortada por
// máscara — não um adesivo desenhado por cima. A diferença aparece na beira:
// com um retângulo de cor colado na copa, a cerejeira ganha um halo e morre o
// desenho da folha; com o filtro aplicado aos pixels que já estavam lá, o
// volume, a luz e a sombra continuam intactos (lição nº 22, a emenda).
function renderSeasonArt(artHref, season) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'season-art');
  svg.setAttribute('viewBox', `0 0 ${MAP_ART_SIZE.w} ${MAP_ART_SIZE.h}`);
  svg.setAttribute('aria-hidden', 'true');

  const defs = document.createElementNS(SVG_NS, 'defs');

  // Uma borda que some. A elipse cheia deixava um disco de borda dura: no
  // outono, um círculo laranja assentado no grama ao lado da árvore; no inverno,
  // um disco claro no céu. A máscara é pintada com um gradiente radial — branco
  // no meio, preto na ponta — então a repintagem entra e sai junto com a
  // silhueta, em vez de mostrar onde ela termina.
  const feather = document.createElementNS(SVG_NS, 'radialGradient');
  feather.setAttribute('id', 'feather');
  // A borda macia só no último terço: com a curva espalhada por metade do raio a
  // copa saía fofa, com um halo que comia o contorno da folha. Perto do fim, a
  // repintagem segue a silhueta da copa e some nela.
  for (const [offset, colour] of [['0', '#fff'], ['0.72', '#fff'], ['1', '#000']]) {
    const stop = document.createElementNS(SVG_NS, 'stop');
    stop.setAttribute('offset', offset);
    stop.setAttribute('stop-color', colour);
    feather.appendChild(stop);
  }
  defs.appendChild(feather);

  const maskOf = (id, shapes) => {
    const mask = document.createElementNS(SVG_NS, 'mask');
    mask.setAttribute('id', id);
    for (const [cx, cy, rx, ry] of shapes) {
      const node = document.createElementNS(SVG_NS, 'ellipse');
      node.setAttribute('cx', cx);
      node.setAttribute('cy', cy);
      node.setAttribute('rx', rx);
      node.setAttribute('ry', ry);
      // Em máscara SVG vale o BRILHO, e o preto — padrão sem este atributo —
      // esconde. O gradiente é o que dá a borda macia.
      node.setAttribute('fill', 'url(#feather)');
      mask.appendChild(node);
    }
    return mask;
  };

  // O chão não é elipse: é a orla da ilha, um polígono de pontos medidos.
  // Aqui NÃO entra o gradiente macio das copas: ele é radial e a ilha não é
  // um disco, então o gradiente apagaria o meio do chão e deixaria a borda do
  // polígono dura. O polígono JÁ é a borda do chão, e seguir a orla da arte
  // com dois ou três pixels de diferença não aparece na tela.
  const groundMask = document.createElementNS(SVG_NS, 'mask');
  groundMask.setAttribute('id', 'mask-ground');
  const groundShape = document.createElementNS(SVG_NS, 'polygon');
  groundShape.setAttribute('points', MAP_GROUND.map(([x, y]) => `${x},${y}`).join(' '));
  groundShape.setAttribute('fill', '#fff');
  groundMask.appendChild(groundShape);
  defs.appendChild(groundMask);

  defs.appendChild(maskOf('mask-canopy', MAP_CANOPIES.map(([x, y, r]) => [x, y, r, r])));
  defs.appendChild(maskOf('mask-roof', MAP_ROOFS));


  // Rampa de duas cores: primeiro o brilho, depois cada canal remapeado para a
  // cor da estação. `color-interpolation-filters` em sRGB é obrigatório — no
  // padrão (linearRGB) a mesma tabela sai outra cor, e o verão apareceria azul.
  //
  // O mesmo filtro serve para a copa e para o chão: a diferença é só a máscara
  // e a tabela. Fazer dois filtros quase iguais seria o caminho curto para os
  // dois divergirem na segunda edição.
  const addRampFilter = (id, ramp) => {
    const filter = document.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    const grey = document.createElementNS(SVG_NS, 'feColorMatrix');
    grey.setAttribute('type', 'saturate');
    grey.setAttribute('values', '0');
    filter.appendChild(grey);

    const transfer = document.createElementNS(SVG_NS, 'feComponentTransfer');
    for (const [channel, values] of Object.entries(ramp)) {
      const fn = document.createElementNS(SVG_NS, `feFunc${channel.toUpperCase()}`);
      fn.setAttribute('type', 'table');
      fn.setAttribute('tableValues', values);
      transfer.appendChild(fn);
    }
    filter.appendChild(transfer);
    defs.appendChild(filter);
  };

  // Uma cópia da arte, filtrada pela rampa e recortada pela máscara. O traço
  // continua sendo o que estava lá embaixo — que é o que separa neve de véu.
  const remapped = (href, maskId, filterId) => {
    const image = document.createElementNS(SVG_NS, 'image');
    image.setAttribute('href', href);
    image.setAttribute('x', '0');
    image.setAttribute('y', '0');
    image.setAttribute('width', String(MAP_ART_SIZE.w));
    image.setAttribute('height', String(MAP_ART_SIZE.h));
    image.setAttribute('preserveAspectRatio', 'none');
    image.setAttribute('mask', `url(#${maskId})`);
    image.setAttribute('filter', `url(#${filterId})`);
    return image;
  };

  const ramp = FOLIAGE[season];
  if (ramp) addRampFilter('filter-foliage', ramp);

  const groundRamp = GROUND_RAMP[season];
  if (groundRamp) addRampFilter('filter-ground', groundRamp);

  svg.appendChild(defs);

  // Camada 1: a copa repintada com os pixels reais da copa.
  if (ramp) svg.appendChild(remapped(artHref, 'mask-canopy', 'filter-foliage'));

  // Camada 2: a neve do chão. É a MESMA técnica da copa — o filtro remapeia os
  // pixels que já estavam no chão, e a máscara é a orla da ilha. Pôr um
  // retângulo branco por cima (o que dava neblina) apagava o desenho do gramado.
  if (groundRamp) {
    svg.appendChild(remapped(artHref, 'mask-ground', 'filter-ground'));
  }

  // Camada 3: a capa de neve no telhado, por cima do chão.
  if (ROOF_SNOW[season]) {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', String(MAP_ART_SIZE.w));
    rect.setAttribute('height', String(MAP_ART_SIZE.h));
    rect.setAttribute('fill', '#fff');
    rect.setAttribute('mask', 'url(#mask-roof)');
    rect.setAttribute('opacity', String(ROOF_SNOW[season]));
    svg.appendChild(rect);
  }

  return svg;
}

function renderGames() {
  const season = readSeason();
  const palette = SEASON_PALETTE[season] || SEASON_PALETTE.spring;
  const dressing = SEASON_DRESSING[season] || SEASON_DRESSING.spring;

  const map = el('div', {
    class: 'map',
    style: `--map-sky:${palette.sky};--map-horizon:${palette.horizon};--map-ground:${palette.ground};--map-path:${palette.path};--map-accent:${palette.accent};--map-veil:${dressing.veil};--map-snow:${dressing.snow}`,
  });

  const artHref = assetUrl(bundleVersion ? `${MAP_ART}?v=${bundleVersion}` : MAP_ART);
  const ground = el('img', { class: 'ground', src: artHref, alt: '', width: '1280', height: '720' });
  // Sem `error` que remova a arte: ela é a vila inteira e os destinos apontam
  // para construções dentro dela. Se faltar, o usuário tem de ver o buraco.
  ground.style.filter = dressing.filter;
  map.appendChild(ground);

  // A arte de estação entra logo depois, no MESMO lugar e com o MESMO `cover`,
  // para que a copa repintada caia exatamente sobre a copa que está embaixo.
  map.appendChild(renderSeasonArt(artHref, season));

  // Camada do tamanho EXATO da arte, com o corte do `cover` compensado. Tudo
  // que se posiciona por porcentagem vive aqui dentro, e assim a porcentagem é
  // sempre a da arte — na tela de 360px como na de 940px.
  const layer = el('div', { class: 'map-layer' });
  map.appendChild(layer);

  // O que o `layout()` tem de medir a cada mudança de tamanho: cada linha e a
  // caixa de nome que ela liga. Declarado aqui porque o `layout()` é chamado
  // depois do laço.
  const labels = [];

  // As linhas de ligação e a névea dos telhados vão num SVG só: um elemento
  // por rótulo taparia os outros, e o `cover` do céu precisa vir por cima de
  // tudo, não atrás de cada casa.
  const overlay = document.createElementNS(SVG_NS, 'svg');
  overlay.setAttribute('class', 'map-overlay');
  overlay.setAttribute('viewBox', `0 0 ${MAP_ART_SIZE.w} ${MAP_ART_SIZE.h}`);
  overlay.setAttribute('aria-hidden', 'true');
  layer.appendChild(overlay);

  const dests = el('div', { class: 'dests' });
  layer.appendChild(dests);

  for (const id of DESTINATIONS) {
    const place = DEST_LAYOUT[id];
    if (!place) continue;
    const [x, y] = place.at;
    const [lx, ly] = place.label;

    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('class', 'leader');
    line.dataset.dest = id;
    overlay.appendChild(line);

    // O botão e o rótulo são IRMÃOS, e os dois se posicionam contra a camada da
    // arte. Se o rótulo fosse filho do botão, a porcentagem dele resolveria
    // contra os 74px do botão em vez de contra a vila — e foi o que aconteceu:
    // as linhas nasciam a y=52 quando o rótulo está a y=660 na arte.
    //
    // O rótulo é pointer-events:none, então sair de dentro do botão não custa
    // nada para o clique nem para o teclado: o alvo continua sendo a casa.
    const pin = el('button', {
      class: 'dest', type: 'button',
      style: `left:${(x / MAP_ART_SIZE.w * 100).toFixed(3)}%;top:${(y / MAP_ART_SIZE.h * 100).toFixed(3)}%`,
      'aria-label': t(`dest.${id}`),
      onclick: () => openComingSoon(id),
    });
    const label = el('span', {
      class: 'dest-label',
      style: `left:${(lx / MAP_ART_SIZE.w * 100).toFixed(3)}%;top:${(ly / MAP_ART_SIZE.h * 100).toFixed(3)}%`,
    }, [t(`dest.${id}`)]);

    // O par casa/linha/rótulo acende junto. Com o rótulo irmão do botão, o
    // seletor `+` não pega mais, e uma regra por id em CSS seriam seis linhas
    // de estilo que o conteúdo passaria a ditar. Acender em JS é uma classed, e
    // o destino continua sendo dono do visual dele.
    const light = (on) => {
      pin.classList.toggle('lit', on);
      line.classList.toggle('lit', on);
      label.classList.toggle('lit', on);
    };
    pin.addEventListener('pointerenter', () => light(true));
    pin.addEventListener('pointerleave', () => light(false));
    pin.addEventListener('focus', () => light(true));
    pin.addEventListener('blur', () => light(false));

    dests.appendChild(pin);
    dests.appendChild(label);

    // A caixa de nome só tem largura depois que o navegador a mede. A medição
    // acontece no mesmo `layout()` que posiciona a camada, e não num
    // `requestAnimationFrame`: aba em segundo plano deixa o rAF sem disparar e
    // as seis linhas ficavam com atributo vazio — invisíveis, sem erro nenhum.
    // O registro fica na lista para o layout() percorrer.
    labels.push({ line, label, to: [x, y] });
  }

  const layout = () => {
    const box = map.getBoundingClientRect();
    if (!box.width) return;
    const rect = coverRect(box.width, box.height);
    layer.style.left = `${rect.left}px`;
    layer.style.top = `${rect.top}px`;
    layer.style.width = `${rect.width}px`;
    layer.style.height = `${rect.height}px`;

    // Escala da arte dentro da camada: converte pixel medido do rótulo no
    // espaço da arte, que é o mesmo espaço do viewBox do <line>.
    const scale = rect.width / MAP_ART_SIZE.w;
    for (const entry of labels) {
      const centre = [
        entry.label.offsetLeft + entry.label.offsetWidth / 2,
        entry.label.offsetTop + entry.label.offsetHeight / 2,
      ];
      const edge = leaderPoints(
        [centre[0] / scale, centre[1] / scale, entry.label.offsetWidth / scale, entry.label.offsetHeight / scale],
        entry.to,
      );
      entry.line.setAttribute('x1', edge.x1.toFixed(1));
      entry.line.setAttribute('y1', edge.y1.toFixed(1));
      entry.line.setAttribute('x2', edge.x2.toFixed(1));
      entry.line.setAttribute('y2', edge.y2.toFixed(1));
    }
  };

  // A capa de neve do telhado foi substituída pela máscara do `season-art`;
  // o que fica aqui é só o clima, e ele pode não existir.
  const weather = renderWeather(season, dressing);
  if (weather) layer.appendChild(weather);

  const seasons = el('div', { class: 'seasons' }, SEASONS.map((id) => el('button', {
    class: 'chip', type: 'button', 'aria-pressed': String(id === season),
    onclick: () => { writeSeason(id); rerender(); },
  }, [t(`season.${id}`)])));

  // Redimensionar reposiciona a camada e refaz as linhas: sem isto, girar o
  // celular deixa as âncoras onde a janela anterior as deixou.
  if (typeof ResizeObserver === 'function') {
    const observer = new ResizeObserver(layout);
    observer.observe(map);
    map.addEventListener('detach-map', () => observer.disconnect(), { once: true });
  } else {
    window.addEventListener('resize', layout);
  }
  layout();

  return [
    topbar(),
    el('h1', { text: t('games.heading') }),
    el('p', { class: 'sub', text: t('games.pick') }),
    seasons,
    map,
    // No celular a vila fica com 187px de altura: seis nomes deitado em volta
    // das casas saíam da borda ("...ive Challenges") e dois deles se sobrepunham.
    // A lista assume o papel do rótulo quando a tela é estreita, e some na
    // tela larga, onde o mapa tem espaço de sobra. Um destino, um caminho.
    el('div', { class: 'dest-list' }, DESTINATIONS.map((id) => el('button', {
      class: 'dest-item', type: 'button',
      onclick: () => openComingSoon(id),
    }, [t(`dest.${id}`)]))),
  ];
}

function openComingSoon(destination) {
  // O primeiro destino que virou jogo de verdade. Os outros continuam no modal
  // "em breve" — e é o certo: um modal que promete é melhor do que um botão
  // que não faz nada.
  if (destination === 'spin-art-lab') {
    location.hash = '#/g/spin-art';
    return;
  }

  const close = () => { backdrop.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = (event) => { if (event.key === 'Escape') close(); };

  const sheet = el('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true' }, [
    el('h2', { text: t('games.comingTitle', { name: t(`dest.${destination}`) }) }),
    el('p', { text: t(`dest.${destination}.soon`) }),
    el('div', { class: 'actions' }, [
      el('button', { class: 'btn', type: 'button', onclick: close }, [t('games.backToMap')]),
      el('button', {
        class: 'btn primary', type: 'button',
        onclick: () => { close(); filters.category = null; location.hash = '#/tutorials'; },
      }, [t('games.tryTutorials', { topic: t(`dest.${destination}.topic`) })]),
    ]),
  ]);

  const backdrop = el('div', { class: 'backdrop', onclick: (event) => { if (event.target === backdrop) close(); } }, [sheet]);
  document.body.appendChild(backdrop);
  document.addEventListener('keydown', onKey);
  sheet.querySelector('button').focus();
}

/* --------------------------------------------------------------- gallery --- */

// A galeria era a tela vazia que prometia "quando os jogos criativos chegarem".
// O que chega é a LISTA DE TRAÇOS de cada criação — não a imagem — e cada
// miniatura é redesenhada na hora que a galeria abre, a partir da receita.
function renderGallery() {
  const creations = readCreations();

  if (!creations.length) {
    return [
      topbar(),
      el('h1', { text: t('gallery.heading') }),
      el('div', { class: 'empty' }, [
        el('p', { style: 'font-size:44px;margin:0 0 6px', 'aria-hidden': 'true', text: '🖼️' }),
        el('h2', { text: t('gallery.emptyTitle') }),
        el('p', { text: t('spin.empty') }),
        el('button', {
          class: 'btn primary', type: 'button',
          onclick: () => { location.hash = '#/g/spin-art'; },
        }, [t('spin.heading')]),
      ]),
    ];
  }

  const grid = el('div', { class: 'gallery-grid' }, creations.map((creation) => {
    const canvas = el('canvas', { class: 'gallery-thumb', width: '320', height: '320', 'aria-hidden': 'true' });
    const parsed = decodeRecord(creation.record);
    if (parsed) {
      paintRecord(canvas, resolveDabs(parsed).map((dab) => ({ ...dab, symmetry: creation.symmetry })), creation.paper);
    }
    return el('figure', { class: 'gallery-item' }, [
      canvas,
      el('figcaption', {}, [
        el('span', { text: t('spin.dabs', { count: parsed?.dabs.length ?? 0 }) }),
      ]),
    ]);
  }));

  return [
    topbar(),
    el('h1', { text: t('gallery.heading') }),
    el('p', { class: 'sub', text: t('gallery.count', { count: creations.length }) }),
    grid,
    el('div', { class: 'nav-row' }, [
      el('button', {
        class: 'btn primary', type: 'button',
        onclick: () => { location.hash = '#/g/spin-art'; },
      }, [t('spin.heading')]),
    ]),
  ];
}

/* ----------------------------------------------------------------- router -- */

function currentRoute() {
  const raw = (location.hash || '#/').replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) return { name: 'home' };
  if (parts[0] === 'tutorials') return { name: 'tutorials' };
  if (parts[0] === 'games') return { name: 'games' };
  if (parts[0] === 'gallery') return { name: 'gallery' };
  if (parts[0] === 'g' && parts[1]) return { name: 'game', id: parts[1] };
  if (parts[0] === 't' && parts[1]) return { name: 'tutorial', slug: parts[1], step: Number.parseInt(parts[2] || '0', 10) };
  if (parts[0] === 'done' && parts[1]) return { name: 'done', slug: parts[1] };
  return { name: 'home' };
}

// O jogo tem vida própria — laço de animação, áudio e ponteiros. Ele precisa
// ser destruído ANTES da próxima tela, senão o `requestAnimationFrame` continua
// carimbando tinta num canvas que ninguém vê, e o som continua zunindo depois
// de a criança sair.
let spinArt = null;

function closeGame() {
  if (spinArt) {
    spinArt.destroy();
    spinArt = null;
  }
}

function renderGame(id) {
  if (id !== 'spin-art') return renderGames();
  const mount = el('div', { class: 'game-mount' });
  const head = [
    topbar(),
    el('h1', { text: t('spin.heading') }),
    el('p', { class: 'sub', text: t('spin.hint') }),
  ];
  return [...head, mount];
}

function renderGameMounted(mount, id) {
  if (id !== 'spin-art') return;
  spinArt = createSpinArt({
    container: mount,
    lang: context.language,
    soundOn: readSoundOn(),
    strings: SPIN_STRINGS[context.language] || SPIN_STRINGS.pt,
    onSoundToggle: (on) => writeSoundOn(on),
    onSave: (record) => {
      writeCreation({
        id: `spin-${Date.now().toString(36)}`,
        record,
        paper: spinArt?.getState().paper,
        symmetry: spinArt?.getState().symmetry,
      });
    },
  });
}

function rerender() {
  const route = currentRoute();
  const problems = contentProblems(TUTORIALS);
  if (problems.length) console.warn('artsCrafts: conteúdo inválido', problems);
  closeGame();
  const view = {
    home: renderHome,
    tutorials: renderTutorials,
    tutorial: () => renderTutorial(route.slug, Number.isNaN(route.step) ? 0 : route.step),
    done: () => renderCelebration(route.slug),
    games: renderGames,
    gallery: renderGallery,
    game: () => renderGame(route.id),
  }[route.name] || renderHome;
  const nodes = view();
  root.replaceChildren(...nodes);
  if (route.name === 'game') {
    const mount = root.querySelector('.game-mount');
    if (mount) renderGameMounted(mount, route.id);
  }
  document.title = `${t('app.title')} — ${t('app.title')}`;
}

window.addEventListener('hashchange', rerender);
rerender();

// Superfície mínima para QA automatizado no navegador (o RPG expõe a dele do
// mesmo jeito, e o roadmap exige que a QA seja um comando e não um ritual).
globalThis.__artsCrafts = {
  context,
  route: currentRoute,
  render: rerender,
  tutorials: () => LIVE_TUTORIALS,
  regionsOf: (tutorialId) => { const item = tutorialById(TUTORIALS, tutorialId); return item ? regionsOf(item) : null; },
  setFilter(next) { Object.assign(filters, next); rerender(); },
  spin: () => (spinArt ? spinArt.getState() : null),
  goToStep(slug, step) { location.hash = `#/t/${slug}/${step}`; },
  QUICK_MINUTES,
};
