// Arts & Crafts Adventures — ponto de entrada.
//
// Roteamento por hash (`#/t/pint-uma-corujinha/2`), porque o app é uma página só
// servida do GitHub Pages: hash sobrevive a F5 e a link direto sem servidor de
// rota. O que a spec pede de link direto (§29) é deep link, e hash entrega.

import { CSS } from './styles.js';
import { DICTIONARIES, translate } from './i18n.js';
import {
  CATEGORIES, DESTINATIONS, SEASONS, SEASON_PALETTE, DEST_LAYOUT, SEASON_BACKDROP,
  HOME_ART, FEATURED_ID, TUTORIALS, QUICK_MINUTES,
  LANGUAGES, isQuick, assetUrl, regionsOf, focusOf, tutorialById, tutorialBySlug, contentProblems,
} from './content/index.js';
import {
  readPlayerContext, readSeason, writeSeason, readProgressFor, writeProgressFor,
  readCompleted, readLastTutorial,
} from './state.js';

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
  const resume = last ? tutorialById(TUTORIALS, last) : null;
  const progress = resume ? readProgressFor(resume.id) : null;

  return [
    topbar(),
    el('img', { class: 'hero', src: assetUrl(HOME_ART), alt: '', width: '1280', height: '720' }),
    el('h1', { text: t('app.title') }),
    el('p', { class: 'sub', text: t('tutorials.count', { count: TUTORIALS.length }) }),
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
  return TUTORIALS.filter((tutorial) => {
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

  const categoryChips = [chip(t('tutorials.all'), () => { filters.category = null; rerender(); }, !filters.category)];
  for (const category of CATEGORIES) {
    categoryChips.push(chip(t(`category.${category}`), () => { filters.category = category; rerender(); }, filters.category === category));
  }
  categoryChips.push(chip(t('tutorials.printable'), () => { filters.printable = !filters.printable; rerender(); }, filters.printable));
  categoryChips.push(chip(t('tutorials.quick'), () => { filters.quick = !filters.quick; rerender(); }, filters.quick));

  const list = visibleTutorials();
  const featured = filters.search || filters.category || filters.printable || filters.quick ? null : tutorialById(TUTORIALS, FEATURED_ID);

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

function stageFor(tutorial, step) {
  const stage = el('div', { class: 'stage' }, [
    el('img', { class: 'art', src: assetUrl(tutorial.baseImage), alt: '', width: '1152', height: '864' }),
  ]);

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
  const tutorial = tutorialBySlug(TUTORIALS, slug);
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
  const tutorial = tutorialBySlug(TUTORIALS, slug);
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

function renderGames() {
  const season = readSeason();
  const palette = SEASON_PALETTE[season] || SEASON_PALETTE.spring;
  const backdrop = SEASON_BACKDROP[season];

  const map = el('div', { class: 'map', style: `--map-sky:${palette.sky};--map-horizon:${palette.horizon};--map-ground:${palette.ground};--map-path:${palette.path};--map-accent:${palette.accent}` });

  // A arte do mapa entra por cima do chão pintado. Enquanto o arquivo não
  // existe, o `error` leva a imagem embora e sobra o procedural — e a estação
  // continua mudando, porque quem muda é a paleta, não a foto.
  const ground = el('img', { class: 'ground', src: assetUrl(backdrop), alt: '' });
  ground.addEventListener('error', () => ground.remove(), { once: true });
  map.appendChild(ground);

  const dests = el('div', { class: 'dests' }, DESTINATIONS.map((id) => {
    const layout = DEST_LAYOUT[id];
    return el('button', {
      class: 'dest', type: 'button',
      style: `left:${layout.x}%;top:${layout.y}%`,
      onclick: () => openComingSoon(id),
    }, [t(`dest.${id}`)]);
  }));
  map.appendChild(dests);

  const seasons = el('div', { class: 'seasons' }, SEASONS.map((id) => el('button', {
    class: 'chip', type: 'button', 'aria-pressed': String(id === season),
    onclick: () => { writeSeason(id); rerender(); },
  }, [t(`season.${id}`)])));

  return [
    topbar(),
    el('h1', { text: t('games.heading') }),
    el('p', { class: 'sub', text: t('games.pick') }),
    seasons,
    map,
  ];
}

function openComingSoon(destination) {
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

function renderGallery() {
  return [
    topbar(),
    el('h1', { text: t('gallery.heading') }),
    el('div', { class: 'empty' }, [
      el('p', { style: 'font-size:44px;margin:0 0 6px', 'aria-hidden': 'true', text: '🖼️' }),
      el('h2', { text: t('gallery.emptyTitle') }),
      el('p', { text: t('gallery.emptyText') }),
      el('button', { class: 'btn primary', type: 'button', onclick: () => { location.hash = '#/tutorials'; } }, [t('gallery.explore')]),
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
  if (parts[0] === 't' && parts[1]) return { name: 'tutorial', slug: parts[1], step: Number.parseInt(parts[2] || '0', 10) };
  if (parts[0] === 'done' && parts[1]) return { name: 'done', slug: parts[1] };
  return { name: 'home' };
}

function rerender() {
  const route = currentRoute();
  const problems = contentProblems(TUTORIALS);
  if (problems.length) console.warn('artsCrafts: conteúdo inválido', problems);
  const view = {
    home: renderHome,
    tutorials: renderTutorials,
    tutorial: () => renderTutorial(route.slug, Number.isNaN(route.step) ? 0 : route.step),
    done: () => renderCelebration(route.slug),
    games: renderGames,
    gallery: renderGallery,
  }[route.name] || renderHome;
  root.replaceChildren(...view());
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
  tutorials: () => TUTORIALS,
  regionsOf: (tutorialId) => { const item = tutorialById(TUTORIALS, tutorialId); return item ? regionsOf(item) : null; },
  setFilter(next) { Object.assign(filters, next); rerender(); },
  goToStep(slug, step) { location.hash = `#/t/${slug}/${step}`; },
  QUICK_MINUTES,
};
