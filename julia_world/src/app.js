// App 3D — atlas infantil do mundo
import Globe from 'globe.gl';
import { applyPreferences, loadPreferences, savePreferences, themeFor } from './preferences.js';
import { LANG_META, text } from './i18n.js';
import {
  ensurePlayer,
  loadProgress,
  placeKey,
  profileKey,
  rankingFor,
  saveProgress,
  stickerStats,
  visitCountry,
  visitPlace,
} from './progress.js';
const BRAND_NAME = 'Julia';

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
const launcherParams = new URLSearchParams(window.location.search);
const launcherConfig = launcherParams.get('from') === 'launcher'
  ? {
      name: launcherParams.get('name') || '',
      country: launcherParams.get('country') || '',
      language: launcherParams.get('language') || '',
    }
  : null;
let preferences = applyPreferences(loadPreferences());
if (launcherConfig) {
  preferences = applyPreferences(savePreferences({
    ...preferences,
    name: launcherConfig.name || preferences.name,
    country: launcherConfig.country || preferences.country,
    language: launcherConfig.language || preferences.language,
  }));
}
let progress = loadProgress();
let language = preferences.language;
let childName = preferences.name;
const localize = (f) => f.properties.nm?.[language] || f.properties.n;
const factsFor = (f) => language === 'pt' ? f.properties.f : (f.properties.t?.[language] || f.properties.g?.[language] || f.properties.f);
const REGION_NAMES = {
  'África': { en: 'Africa', es: 'África' }, 'Antártida': { en: 'Antarctica', es: 'Antártida' },
  'Ásia': { en: 'Asia', es: 'Asia' }, 'Europa': { en: 'Europe', es: 'Europa' },
  'América do Norte': { en: 'North America', es: 'Norteamérica' },
  'América do Sul': { en: 'South America', es: 'Sudamérica' }, Oceania: { en: 'Oceania', es: 'Oceanía' },
  'América Central': { en: 'Central America', es: 'Centroamérica' }, Caribe: { en: 'Caribbean', es: 'Caribe' },
};
const regionFor = (value) => REGION_NAMES[value]?.[language] || value;
const localizedChip = (f) => regionFor(chipText(f));
const SPACE_COLOR = 'rgba(0,0,0,0)';

const EARTH = window.__EARTH__ || { features: [] };
const $ = (id) => document.getElementById(id);
const globeEl = $('globe');
const tooltip = $('tooltip');
const tipName = $('tipName');
const tipEmoji = $('tipEmoji');
const tipCont = $('tipCont');
const tipFacts = $('tipFacts');
const card = $('card');
const hint = $('hint');
const intro = $('intro');
const rankingPanel = $('rankingPanel');
const rankingTitle = $('rankingTitle');
const rankingToggle = $('rankingToggle');
const rankingContent = $('rankingContent');
const rankingCurrent = $('rankingCurrent');
const switchPlayer = $('switchPlayer');
const badgesTitle = $('badgesTitle');
const badgeList = $('badgeList');
const continentProgressEl = $('continentProgress');
const continentProgressTitle = $('continentProgressTitle');
const leaderboardTitle = $('leaderboardTitle');
const rankingList = $('rankingList');
const stickersTitle = $('stickersTitle');
const stickerSummary = $('stickerSummary');
const stickerCollection = $('stickerCollection');
const introBtn = $('introBtn');
const childNameInput = $('childNameInput');
const introNameLabel = $('introNameLabel');
const btnHome = $('btnHome');
const btnSpin = $('btnSpin');
const btnMenu = $('btnMenu');
const cardLabel = $('cardLabel');

// ── Paleta por continente (pastel, alegre, contraste com o espaço) ──────────
const CONT_COLOR = {
  África: '#ffab5e',
  'América do Norte': '#59d9cf',
  'América do Sul': '#8fdc6a',
  Ásia: '#ff94bb',
  Europa: '#b9a4f5',
  Oceania: '#63c9ff',
  Antártida: '#e6f2ff',
};
const FALLBACK_COLOR = '#c3cede';
const stickerEmoji = ['🎟️', '🌟', '🗺️', '🧭', '✨', '🚀'];
const HOVER_COLOR = '#ffe14d';

const contColor = (f) => CONT_COLOR[f.properties.c] || FALLBACK_COLOR;
// para a América Central e o Caribe, mostrar a região em vez do continente (mais claro p/ criança)
const chipText = (f) => {
  const { c, s } = f.properties;
  if (c === 'América do Norte' && s && (s === 'América Central' || s === 'Caribe')) return s;
  return c;
};
const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `rgb(${r},${g},${b})`;
};
function continentLabel(continent) {
  return text(language, continent.labelKey);
}

function ensureCurrentPlayer() {
  if (!childName) return null;
  const before = progress.players.length;
  const profile = ensurePlayer(progress, childName);
  if (progress.players.length !== before) saveProgress(progress);
  return profile;
}
function visitedStickerDetails(profile) {
  const visited = new Set(profile?.visitedPlaces || []);
  const seen = new Set();
  const stickers = [];
  for (const feature of EARTH.features) {
    const countryId = countryIdFor(feature);
    for (const place of feature.properties.l || []) {
      const key = placeKey(countryId, place);
      if (!key || !visited.has(key) || seen.has(key)) continue;
      seen.add(key);
      const title = place.w || place.n;
      stickers.push({
        name: place.n,
        url: `https://pt.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      });
    }
  }
  return stickers;
}

function renderStickerAlbum(profile, stats) {
  stickerSummary.textContent = text(language, 'stickerSummary', {
    total: stats.total,
    places: stats.places,
    bonus: stats.bonus,
  });
  stickerCollection.innerHTML = '';
  for (const [index, sticker] of visitedStickerDetails(profile).entries()) {
    const link = document.createElement('a');
    link.className = 'sticker-card';
    link.href = sticker.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = text(language, 'stickerOpen', { place: sticker.name });
    const icon = document.createElement('span');
    icon.className = 'sticker-icon';
    icon.textContent = stickerEmoji[index % stickerEmoji.length];
    const label = document.createElement('span');
    label.className = 'sticker-name';
    label.textContent = sticker.name;
    link.append(icon, label);
    stickerCollection.appendChild(link);
  }
  for (let index = 0; index < stats.bonus; index += 1) {
    const bonus = document.createElement('span');
    bonus.className = 'sticker-card sticker-bonus';
    bonus.title = text(language, 'stickerBonus');
    const icon = document.createElement('span');
    icon.className = 'sticker-icon';
    icon.textContent = '🎁';
    const label = document.createElement('span');
    label.className = 'sticker-name';
    label.textContent = text(language, 'stickerBonus');
    bonus.append(icon, label);
    stickerCollection.appendChild(bonus);
  }
  if (!stickerCollection.childElementCount) {
    const empty = document.createElement('p');
    empty.className = 'ranking-empty';
    empty.textContent = text(language, 'stickerEmpty');
    stickerCollection.appendChild(empty);
  }
}


function renderProgressUI() {
  const ranking = rankingFor(progress, EARTH.features);
  const current = childName
    ? ranking.find((entry) => profileKey(entry.name) === profileKey(childName))
    : null;
  const profile = current
    ? progress.players.find((candidate) => profileKey(candidate.name) === profileKey(current.name))
    : null;
  const currentStickers = current?.stickers || stickerStats(profile);
  const currentRank = current ? ranking.indexOf(current) + 1 : 0;
  const collapsed = rankingPanel.classList.contains('collapsed');
  rankingTitle.textContent = text(language, 'ranking');
  rankingToggle.textContent = collapsed ? '⌄' : '⌃';
  rankingToggle.setAttribute('aria-expanded', String(!collapsed));
  rankingToggle.setAttribute('aria-label', text(language, collapsed ? 'rankingOpen' : 'rankingClose'));
  rankingContent.setAttribute('aria-hidden', String(collapsed));
  switchPlayer.textContent = text(language, 'switchPlayer');
  continentProgressTitle.textContent = text(language, 'continentProgress');
  leaderboardTitle.textContent = text(language, 'leaderboard');
  badgesTitle.textContent = text(language, 'badges');
  stickersTitle.textContent = text(language, 'stickersTitle');

  rankingCurrent.innerHTML = '';
  if (current) {
    rankingCurrent.innerHTML = `<strong>${escapeHtml(current.name)} · #${currentRank}</strong><span>${text(language, 'score', { points: current.score })} · ${text(language, 'placesVisited', { count: current.places })}</span>`;
  } else {
    rankingCurrent.textContent = text(language, 'noRanking');
  }

  badgeList.innerHTML = '';
  if (!current?.badges.length) {
    const empty = document.createElement('p');
    empty.className = 'ranking-empty';
    empty.textContent = text(language, 'noBadges');
    badgeList.appendChild(empty);
  } else {
    current.badges.forEach((badge) => {
      const item = document.createElement('span');
      item.className = 'earned-badge';
      const label = badge.type === 'continent'
        ? text(language, badge.labelKey, { continent: text(language, badge.continentLabelKey) })
        : text(language, badge.labelKey);
      item.title = label;
      item.innerHTML = `<span>${badge.icon}</span><span>${label}</span>`;
      badgeList.appendChild(item);
    });
  }
  renderStickerAlbum(profile, currentStickers);

  continentProgressEl.innerHTML = '';
  if (current) {
    current.continents.forEach((continent) => {
      const row = document.createElement('div');
      row.className = `continent-row${continent.complete ? ' complete' : ''}`;
      const top = document.createElement('div');
      top.className = 'continent-row-top';
      const label = document.createElement('span');
      label.textContent = `${continent.icon} ${continentLabel(continent)}`;
      const count = document.createElement('span');
      count.textContent = text(language, 'countriesVisited', { visited: continent.visited, total: continent.total });
      top.append(label, count);
      const countryTrack = document.createElement('div');
      countryTrack.className = 'progress-track';
      const countryFill = document.createElement('div');
      countryFill.className = 'progress-fill';
      countryFill.style.width = `${continent.total ? (continent.visited / continent.total) * 100 : 0}%`;
      countryTrack.appendChild(countryFill);
      const places = document.createElement('div');
      places.className = 'continent-row-places';
      places.textContent = `📍 ${text(language, 'placesProgress', { visited: continent.placesVisited, total: continent.placesTotal })}`;
      const placesTrack = document.createElement('div');
      placesTrack.className = 'progress-track places-track';
      const placesFill = document.createElement('div');
      placesFill.className = 'progress-fill';
      placesFill.style.width = `${continent.placesTotal ? (continent.placesVisited / continent.placesTotal) * 100 : 0}%`;
      placesTrack.appendChild(placesFill);
      row.append(top, countryTrack, places, placesTrack);
      continentProgressEl.appendChild(row);
    });
  } else {
    const empty = document.createElement('p');
    empty.className = 'ranking-empty';
    empty.textContent = text(language, 'noRanking');
    continentProgressEl.appendChild(empty);
  }

  rankingList.innerHTML = '';
  if (!ranking.length) {
    const empty = document.createElement('li');
    empty.className = 'ranking-empty';
    empty.textContent = text(language, 'noRanking');
    rankingList.appendChild(empty);
  } else {
    ranking.forEach((entry, index) => {
      const item = document.createElement('li');
      item.className = `ranking-item${profileKey(entry.name) === profileKey(childName) ? ' current' : ''}`;
      const rank = document.createElement('span');
      rank.className = 'ranking-rank';
      rank.textContent = `#${index + 1}`;
      const name = document.createElement('span');
      name.className = 'ranking-name';
      name.textContent = entry.name;
      const points = document.createElement('span');
      points.className = 'ranking-points';
      points.textContent = text(language, 'score', { points: entry.score });
      item.append(rank, name, points);
      rankingList.appendChild(item);
    });
  }
}

function countryIdFor(feature) {
  return feature.properties.i ?? feature.properties.n;
}

function recordCountryVisit(feature) {
  if (!childName) return;
  ensureCurrentPlayer();
  if (visitCountry(progress, childName, countryIdFor(feature))) saveProgress(progress);
  renderProgressUI();
}

function recordPlaceVisit(feature, place) {
  if (!childName) return;
  ensureCurrentPlayer();
  if (visitPlace(progress, childName, countryIdFor(feature), place)) saveProgress(progress);
  renderProgressUI();
}

let hoverId = null;

const mk = () => Globe()(globeEl)
  .backgroundColor(SPACE_COLOR)
  .atmosphereColor('#9fd8ff')
  .atmosphereAltitude(0.24)
  .polygonsData(EARTH.features)
  .polygonCapColor((f) => (f.properties.i === hoverId ? HOVER_COLOR : contColor(f)))
  .polygonSideColor((f) => (f.properties.i === hoverId ? shade(HOVER_COLOR, -60) : shade(contColor(f), -55)))
  .polygonStrokeColor(() => 'rgba(255,255,255,0.75)')
  .polygonAltitude((f) => (f.properties.i === hoverId ? 0.05 : 0.014))
  .polygonsTransitionDuration(180);

const world = mk();
const earthMaterial = world.globeMaterial();
earthMaterial.color.set('#176db0');
earthMaterial.emissive.set('#02182c');
earthMaterial.emissiveIntensity = 0.16;
earthMaterial.shininess = 18;
window.__world = world; // gancho de teste/debug

// recarrega a camada de polígonos p/ aplicar hover/altitude (barato: 177 países)
const refreshPolygons = () => world.polygonsData([...world.polygonsData()]);

const ctl = world.controls();
ctl.autoRotate = false; // liga após o "Começar"
ctl.autoRotateSpeed = 0.5;
ctl.minDistance = 120;
ctl.maxDistance = 420;
ctl.enableDamping = true;
ctl.dampingFactor = 0.12;
ctl.enablePan = false;

let rotStarted = false;
const updateSpinButton = () => {
  btnSpin.textContent = ctl.autoRotate ? text(language, 'stopSpin') : text(language, 'spin');
};
const startSpin = () => {
  ctl.autoRotate = true;
  btnSpin.classList.add('on');
  updateSpinButton();
};
const stopSpin = () => {
  ctl.autoRotate = false;
  btnSpin.classList.remove('on');
  updateSpinButton();
};
startSpin();
btnSpin.addEventListener('click', () => (ctl.autoRotate ? stopSpin() : startSpin()));
btnHome.addEventListener('click', () => {
  stopSpin();
  world.pointOfView({ lat: -10, lng: -45, altitude: 2.6 }, 900);
});
btnMenu.addEventListener('click', () => {
  stopSpeaking();
  location.href = '../';
});
// quando a criança arrasta o globo, para o giro automático
globeEl.addEventListener('pointerdown', () => {
  if (rotStarted) stopSpin();
  rotStarted = true;
});

// ── Mouse: posição p/ tooltip + hover nos países ─────────────────────────────
let mx = 0, my = 0;
window.addEventListener('pointermove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (!tooltip.classList.contains('hidden')) placeTooltip();
});

let pinned = false;
let pinnedId = null;
world
  .onPolygonHover((f) => {
    hoverId = f ? f.properties.i : null;
    globeEl.classList.toggle('over-country', !!f);
    refreshPolygons();
    if (pinned) {
      if (f && f.properties.i !== pinnedId) showTooltip(f);
      else hideTooltip();
    } else if (f) showTooltip(f);
    else hideTooltip();
  })
  .onPolygonClick((f) => {
    stopSpin();
    pinCard(f);
    pinnedId = f.properties.i;
    hideTooltip();
  })
  .onGlobeClick(() => {
    hideTooltip();
    if (pinned) closeCard();
  });

// ── Tooltip ──────────────────────────────────────────────────────────────────
const FACTS_DOT = ['🟠', '🟢', '🟣', '🔵', '🟡', '🟤'];

function showTooltip(f) {
  const p = f.properties;
  tipEmoji.textContent = p.e;
  tipName.textContent = localize(f);
  tipCont.textContent = localizedChip(f);
  tipCont.style.background = contColor(f);
  tipCont.style.color = '#24304e';
  tipFacts.innerHTML = '';
  factsFor(f).forEach((fact, i) => {
    const li = document.createElement('li');
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.textContent = FACTS_DOT[i % FACTS_DOT.length];
    li.append(dot, fact);
    tipFacts.appendChild(li);
  });
  tooltip.classList.remove('hidden');
  hint.classList.add('seen');
  placeTooltip();
}

function hideTooltip() {
  tooltip.classList.add('hidden');
}

function placeTooltip() {
  const pad = 16;
  const r = tooltip.getBoundingClientRect();
  let x = mx + 18;
  let y = my + 18;
  if (x + r.width > innerWidth - pad) x = mx - r.width - 18;
  if (y + r.height > innerHeight - pad) y = my - r.height - 18;
  tooltip.style.left = `${Math.max(pad, x)}px`;
  tooltip.style.top = `${Math.max(pad, y)}px`;
}

const cardBody = $('cardBody');
const cardClose = $('cardClose');
const cardSpeak = $('cardSpeak');
const speakStop = $('speakStop');
const placeModal = $('placeModal');
const placeModalClose = $('placeModalClose');
const placeModalImage = $('placeModalImage');
const placeModalFallback = $('placeModalFallback');
const placeModalTitle = $('placeModalTitle');
const placeModalText = $('placeModalText');
const placeModalLink = $('placeModalLink');

const placePhotoCache = new Map();
let placeGeneration = 0;

const numPt = (x) => {
  if (x == null) return null;
  if (language !== 'pt') {
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : 'es-ES', { notation: 'compact', maximumFractionDigits: 1 }).format(x);
  }
  if (x >= 1e9) return `${(x / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} bilhões`;
  if (x >= 1e6) return `${(x / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} milhões`;
  if (x >= 1e3) return `${(x / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`;
  return x.toLocaleString('pt-BR');
};

let current = null;

const placeEmoji = ['🏙️', '🌆', '🌴', '🏛️', '🌊', '⛰️', '🌉'];

function getPlaceSummary(place) {
  const title = place.w || place.n;
  if (placePhotoCache.has(title)) return placePhotoCache.get(title);
  const promise = fetch(
    `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
  )
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
  placePhotoCache.set(title, promise);
  return promise;
}

function makePlaceTile(feature, place, index, generation) {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'place-card';
  tile.title = `Ver ${place.n}`;

  const imageBox = document.createElement('span');
  imageBox.className = 'place-image';
  imageBox.style.setProperty('--place-color', ['#ffb86b', '#70d6ff', '#c7a6ff', '#ff9fbd'][index % 4]);
  const fallback = document.createElement('span');
  fallback.className = 'place-fallback';
  fallback.textContent = placeEmoji[index % placeEmoji.length];
  imageBox.appendChild(fallback);
  const image = document.createElement('img');
  image.alt = '';
  image.hidden = true;
  imageBox.appendChild(image);

  const label = document.createElement('span');
  label.className = 'place-name';
  label.textContent = place.n;
  tile.append(imageBox, label);
  tile.addEventListener('click', async () => {
    recordPlaceVisit(feature, place);
    const summary = await getPlaceSummary(place);
    if (summary) showPlaceModal(place, summary);
  });

  getPlaceSummary(place).then((summary) => {
    if (!summary || generation !== placeGeneration) return;
    const source = summary.thumbnail?.source;
    if (!source) return;
    image.onload = () => {
      image.hidden = false;
      fallback.hidden = true;
      imageBox.classList.add('has-photo');
    };
    image.onerror = () => {
      image.hidden = true;
      fallback.hidden = false;
    };
    image.src = source;
  });
  return tile;
}
function renderPlaces(f) {
  const places = f.properties.l || [];
  if (!places.length) return;
  const title = document.createElement('h3');
  title.textContent = text(language, 'places');
  cardBody.appendChild(title);
  const grid = document.createElement('div');
  grid.className = 'places-grid';
  const generation = placeGeneration;
  places.forEach((place, index) => grid.appendChild(makePlaceTile(f, place, index, generation)));
  cardBody.appendChild(grid);
}

function showPlaceModal(place, summary) {
  placeModalTitle.textContent = summary.title || place.n;
  placeModalText.textContent = summary.extract
    ? summary.extract.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ')
    : text(language, 'modalFallback', { place: place.n });
  const source = summary.originalimage?.source || summary.thumbnail?.source;
  placeModalImage.hidden = !source;
  placeModalFallback.hidden = !!source;
  if (source) placeModalImage.src = source;
  placeModalLink.href = `https://pt.wikipedia.org/wiki/${encodeURIComponent(summary.title || place.w || place.n)}`;
  placeModal.classList.remove('hidden');
}

function closePlaceModal() {
  placeModal.classList.add('hidden');
  placeModalImage.removeAttribute('src');
}

placeModalClose.addEventListener('click', closePlaceModal);
placeModal.addEventListener('click', (event) => {
  if (event.target === placeModal) closePlaceModal();
});
function pinCard(f) {
  recordCountryVisit(f);
  current = f;
  placeGeneration++;
  const p = f.properties;
  const facts = factsFor(f);
  const rows = [];
  if (p.cap) rows.push(['🏙️', text(language, 'capital'), p.cap]);
  if (p.pop != null && p.pop > 0) {
    const pop = numPt(p.pop);
    const value = language === 'pt'
      ? (p.pop >= 1e6 ? `cerca de ${pop} de pessoas` : `cerca de ${pop} pessoas`)
      : language === 'en' ? `about ${pop} people` : `aproximadamente ${pop} personas`;
    rows.push(['👨‍👩‍👧‍👦', text(language, 'population'), value]);
  }
  if (p.area) rows.push(['🗺️', text(language, 'size'), `${p.area.toLocaleString(language === 'pt' ? 'pt-BR' : language)} km²`]);
  if (p.s && p.s !== chipText(f)) rows.push(['📍', text(language, 'region'), regionFor(p.s)]);

  cardBody.innerHTML = '';
  const head = document.createElement('div');
  head.className = 'card-head';
  head.style.setProperty('--cc', contColor(f));
  const flag = document.createElement('span');
  flag.className = 'card-flag';
  flag.textContent = p.e;
  const title = document.createElement('div');
  const name = document.createElement('h2');
  name.textContent = localize(f);
  const cont = document.createElement('span');
  cont.className = 'chip';
  cont.textContent = localizedChip(f);
  title.append(name, cont);
  head.append(flag, title);
  cardBody.appendChild(head);

  if (rows.length) {
    const ul = document.createElement('ul');
    ul.className = 'card-rows';
    for (const [ic, k, v] of rows) {
      const li = document.createElement('li');
      li.innerHTML = `<span class="ri">${ic}</span><span><b>${k}:</b> ${v}</span>`;
      ul.appendChild(li);
    }
    cardBody.appendChild(ul);
  }

  const sec = document.createElement('h3');
  sec.textContent = text(language, 'curiosities');
  cardBody.appendChild(sec);
  const ol = document.createElement('ol');
  ol.className = 'card-facts';
  facts.forEach((fact) => {
    const li = document.createElement('li');
    li.textContent = fact;
    ol.appendChild(li);
  });
  cardBody.appendChild(ol);
  renderPlaces(f);
  card.classList.remove('hidden');
  pinned = true;
  hint.classList.add('seen');
  confetti(f);
}

function closeCard() {
  stopSpeaking();
  card.classList.add('hidden');
  pinned = false;
  pinnedId = null;
}

cardClose.addEventListener('click', closeCard);
cardSpeak.addEventListener('click', () => {
  if (!current) return;
  speak(countrySpeech(current));
});

// ── Fala (offline: usa voz do sistema) ───────────────────────────────────────
let ptVoice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  const ptBR = vs.filter((v) => /^pt(-|_)?BR/i.test(v.lang));
  ptVoice =
    ptBR.find((v) => /google/i.test(v.name)) ||
    ptBR.find((v) => /natural|neural|microsoft/i.test(v.name)) ||
    ptBR[0] ||
    vs.find((v) => v.lang.startsWith('pt')) ||
    null;
}
if ('speechSynthesis' in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}
function countrySpeech(f) {
  const p = f.properties;
  const facts = factsFor(f);
  const capital = p.cap;
  const strip = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const capitalAlreadyMentioned = capital && facts.some((fact) => strip(fact).includes(strip(capital)));
  const cap = capital && !capitalAlreadyMentioned
    ? (language === 'en' ? ` The capital is ${capital}.` : language === 'es' ? ` La capital es ${capital}.` : ` A capital é ${capital}.`)
    : '';
  return `${localize(f)}! ${facts.join(' ')}${cap}`;
}

function setSpeakingUi(on) {
  speakStop.hidden = !on;
}

let speakToken = 0;
function stopSpeaking() {
  if (!('speechSynthesis' in window)) return;
  speakToken++;
  speechSynthesis.cancel();
  setSpeakingUi(false);
}

function speak(textToSay) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  pickVoice();
  const utterance = new SpeechSynthesisUtterance(textToSay);
  utterance.lang = LANG_META[language].locale;
  utterance.rate = 1.1;
  utterance.pitch = 1.0;
  if (ptVoice) utterance.voice = ptVoice;
  const token = ++speakToken;
  const done = () => {
    if (token === speakToken) setSpeakingUi(false);
  };
  utterance.onstart = () => {
    if (token === speakToken) setSpeakingUi(true);
  };
  utterance.onend = done;
  utterance.onerror = done;
  speechSynthesis.speak(utterance);
}
speakStop.addEventListener('click', stopSpeaking);
if (!('speechSynthesis' in window)) cardSpeak.style.display = 'none';

// ── Confete ao clicar num país ───────────────────────────────────────────────
const CONF_COLORS = ['#ffd166', '#ff6b9d', '#4ecdc4', '#a8e05f', '#6ca6ff', '#ffab5e'];
function confetti() {
  const layer = document.createElement('div');
  layer.className = 'confetti';
  document.body.appendChild(layer);
  for (let i = 0; i < 22; i++) {
    const c = document.createElement('span');
    const ang = (Math.PI * 2 * i) / 22 + Math.random() * 0.6;
    const dist = 70 + Math.random() * 130;
    c.style.cssText = `left:${innerWidth / 2}px;top:${innerHeight / 2}px;background:${CONF_COLORS[i % CONF_COLORS.length]};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 40}px;--rot:${(Math.random() - 0.5) * 540}deg;animation-duration:${700 + Math.random() * 500}ms`;
    layer.appendChild(c);
  }
  setTimeout(() => layer.remove(), 1600);
}

// ── Fundo estrelado ──────────────────────────────────────────────────────────
function stars() {
  const layer = $('stars');
  const n = Math.min(120, Math.floor((innerWidth * innerHeight) / 16000));
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    const sz = 1 + Math.random() * 2.2;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${sz}px;height:${sz}px;animation-delay:${Math.random() * 4}s;animation-duration:${2.5 + Math.random() * 3}s;opacity:${0.25 + Math.random() * 0.7}`;
    frag.appendChild(s);
  }

  layer.appendChild(frag);
}
const themeLabelKey = (theme) => ({
  auto: 'themeAuto', day: 'themeDay', sunset: 'themeSunset', night: 'themeNight',
}[theme] || 'themeAuto');
function updateTheme() {
  const active = themeFor(preferences);
  applyPreferences(preferences);
  document.body.dataset.theme = active;
  world.backgroundColor(SPACE_COLOR);
}
function updateIntroCopy() {
  const hasName = Boolean(childName);
  const safeBrand = escapeHtml(BRAND_NAME);
  $('introTitle').textContent = hasName
    ? text(language, 'introTitle', { name: childName })
    : text(language, 'namePrompt');
  $('introText').innerHTML = hasName
    ? text(language, 'introText', { brand: safeBrand })
    : text(language, 'nameText');
  introBtn.disabled = !hasName;
}
function updateInterface() {
  ensureCurrentPlayer();
  const title = text(language, 'worldTitle', { brand: BRAND_NAME });
  document.title = `${title} 🌍`;
  $('appTitle').textContent = title;
  $('subtitle').textContent = text(language, 'subtitle');
  $('hintText').textContent = text(language, 'hint');
  btnHome.textContent = text(language, 'home');
  btnHome.title = text(language, 'homeTitle');
  btnMenu.textContent = text(language, 'menu');
  btnMenu.title = text(language, 'menuTitle');
  btnSpin.title = text(language, 'spinTitle');
  cardClose.title = text(language, 'close');
  placeModalClose.title = text(language, 'close');
  updateSpinButton();
  cardLabel.textContent = text(language, 'sheet');
  cardSpeak.textContent = text(language, 'speak');
  speakStop.textContent = text(language, 'stop');
  updateIntroCopy();
  introNameLabel.textContent = text(language, 'nameLabel');
  childNameInput.placeholder = text(language, 'namePlaceholder');
  childNameInput.setAttribute('aria-label', text(language, 'nameLabel'));
  childNameInput.value = childName;
  introNameLabel.hidden = false;
  childNameInput.hidden = false;
  introBtn.textContent = text(language, 'introButton');
  $('introLanguageTitle').textContent = text(language, 'introLanguage');
  placeModal.setAttribute('aria-label', text(language, 'modalLabel'));
  placeModalLink.textContent = text(language, 'wiki');
  placeModalLink.setAttribute('aria-label', text(language, 'wiki'));
  for (const button of document.querySelectorAll('[data-language]')) {
    const selected = button.dataset.language === language;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  }
  updateTheme();
  if (current && !card.classList.contains('hidden')) pinCard(current);
  renderProgressUI();
}

function setPreferences(changes) {
  preferences = savePreferences({ ...preferences, name: childName, ...changes });
  childName = preferences.name;
  language = preferences.language;
  updateInterface();
}

rankingToggle.addEventListener('click', () => {
  rankingPanel.classList.toggle('collapsed');
  renderProgressUI();
});
switchPlayer.addEventListener('click', () => {
  intro.classList.remove('hidden');
  childNameInput.focus();
  childNameInput.select();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePlaceModal();
});
for (const button of document.querySelectorAll('[data-language]')) {
  button.addEventListener('click', () => setPreferences({ language: button.dataset.language }));
}
setInterval(() => {
  if (preferences.theme === 'auto') updateTheme();
}, 60000);

function countryCenter(feature) {
  const points = [];
  const collect = (value) => {
    if (!Array.isArray(value)) return;
    if (typeof value[0] === 'number' && typeof value[1] === 'number') {
      points.push({ lat: value[1], lng: value[0] });
      return;
    }
    value.forEach(collect);
  };
  collect(feature?.geometry?.coordinates);
  if (!points.length) return null;
  return points.reduce((center, point) => ({
    lat: center.lat + point.lat / points.length,
    lng: center.lng + point.lng / points.length,
  }), { lat: 0, lng: 0 });
}

function enterFromLauncher() {
  if (!launcherConfig || !childName) return;
  intro.classList.add('hidden');
  const feature = EARTH.features.find((candidate) => candidate.properties.i === preferences.country);
  const center = countryCenter(feature);
  if (center) world.pointOfView({ ...center, altitude: 2.2 }, 1200);
  startSpin();
}

// ── Título / introdução ──────────────────────────────────────────────────────
updateInterface();
enterFromLauncher();

childNameInput.addEventListener('input', () => {
  childName = childNameInput.value.trim().replace(/\s+/g, ' ');
  updateIntroCopy();
});
introBtn.addEventListener('click', () => {
  childName = childNameInput.value.trim().replace(/\s+/g, ' ');
  if (!childName) {
    childNameInput.focus();
    return;
  }
  setPreferences({ name: childName });
  intro.classList.add('hidden');
  world.pointOfView({ lat: -10, lng: -38, altitude: 2.45 }, 1700);
  startSpin();
});

// ── Tamanho ──────────────────────────────────────────────────────────────────
function resize() {
  world.width(innerWidth).height(innerHeight);
}
window.addEventListener('resize', resize);
resize();
stars();

// erro amigável se WebGL falhar
try {
  world.pointOfView({ lat: -8, lng: -35, altitude: 2.35 }, 0);
} catch (err) {
  console.error(err);
  const d = document.createElement('div');
  d.className = 'fatal';
  d.textContent = 'Ops! Seu navegador não conseguiu abrir o 3D. 😢 Tente o Chrome ou o Edge.';
  document.body.appendChild(d);
}
