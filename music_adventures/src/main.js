// Music Adventures — engine principal: título → hub de atividades →
// Detetive de Ouvir (treino de ouvido) e Cante a Canção (pitch matching).

import { el, clearContainer, confetti } from './ui.js';
import { sounds, setMuted, ensureAudio } from './audio.js';
import { stopMic } from './mic.js';
import { uiText } from './i18n.js';
import { asset, preload } from './assets.js';
import { ensureStyles } from './styles.js';
import { loadState, saveState, recordStars } from './state.js';
import { LISTEN_LEVELS, SING_LEVELS, SING_SONGS, nextLockedLevel, totalStars } from './notes.js';
import { openListenLevel } from './widgets/listen.js';
import { openSingLevel } from './widgets/sing.js';

const root = document.getElementById('mu');
const query = new URLSearchParams(location.search);
const launcherConfig = query.get('from') === 'launcher' ? query : null;

let player = (launcherConfig?.get('name') || '').trim() || 'musician';
let language = (launcherConfig?.get('language') || 'pt').slice(0, 2);
let state = loadState(localStorage, player);
setMuted(!state.sound);
let screen = null;

function setState(mutate) {
  mutate(state);
  saveState(localStorage, player, state);
}

function swap(render) {
  clearContainer(root);
  screen?.destroy?.();
  screen = render() || null;
}

function exitToLauncher() {
  stopMic();
  location.href = '../index.html';
}

// ── título ───────────────────────────────────────────────────────────────────
function renderTitle() {
  swap(() => {
    const screenEl = el('div', 'mu-screen');
    screenEl.style.backgroundImage = `url('${asset('bg-title')}')`;
    screenEl.style.backgroundPosition = 'center 35%';
    const panel = el('div', 'mu-panel');
    panel.style.top = '58%';
    const logo = el('div', 'mu-title', `🎵 ${uiText(language, 'title')}`);
    logo.style.fontSize = 'clamp(30px, 6vw, 46px)';
    panel.appendChild(logo);
    panel.appendChild(el('div', 'mu-status', uiText(language, 'tagline')));

    const hasRun = totalStars(state.stars) > 0;
    const play = el('button', 'mu-btn', hasRun ? uiText(language, 'continueJourney') : uiText(language, 'play'));
    play.type = 'button';
    play.addEventListener('click', () => { ensureAudio(); sounds.tap(); renderHub(); });
    panel.appendChild(play);

    const exit = el('button', 'mu-btn ghost', uiText(language, 'exitToLauncher'));
    exit.type = 'button';
    exit.style.marginLeft = '10px';
    exit.addEventListener('click', exitToLauncher);
    panel.appendChild(exit);

    screenEl.appendChild(panel);
    root.appendChild(screenEl);
    preload(['bg-hub', 'bg-listen', 'bg-sing']);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── hub de atividades ────────────────────────────────────────────────────────
function renderHub() {
  swap(() => {
    const screenEl = el('div', 'mu-screen');
    screenEl.style.backgroundImage = `url('${asset('bg-hub')}')`;
    screenEl.appendChild(el('div', 'mu-veil'));

    const hud = el('div', 'mu-hud');
    const exitChip = el('button', 'mu-chip clickable', '🏠');
    exitChip.type = 'button';
    exitChip.title = uiText(language, 'exitToLauncher');
    exitChip.addEventListener('click', exitToLauncher);
    hud.appendChild(exitChip);
    const total = totalStars(state.stars);
    hud.appendChild(el('div', 'mu-chip', `⭐ ${total}`));
    const soundChip = el('button', 'mu-chip clickable', state.sound ? '🔊' : '🔇');
    soundChip.type = 'button';
    soundChip.addEventListener('click', () => {
      const next = !state.sound;
      setState((draft) => { draft.sound = next; });
      setMuted(!next);
      soundChip.textContent = next ? '🔊' : '🔇';
      sounds.tap();
    });
    hud.appendChild(soundChip);
    screenEl.appendChild(hud);

    const panel = el('div', 'mu-panel');
    panel.style.top = '54%';
    panel.appendChild(el('div', 'mu-title', uiText(language, 'hubTitle')));
    panel.appendChild(el('div', 'mu-status', uiText(language, 'hubSubtitle')));

    const cards = el('div', 'mu-hub-cards');
    cards.appendChild(hubCard('listen', '🕵️', uiText(language, 'listen'), uiText(language, 'listenDesc'), LISTEN_LEVELS.length));
    cards.appendChild(hubCard('sing', '🎤', uiText(language, 'sing'), uiText(language, 'singDesc'), SING_LEVELS.length));
    panel.appendChild(cards);
    screenEl.appendChild(panel);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };

    function hubCard(activity, emoji, name, desc, levelCount) {
      const earned = Object.values(state.stars[activity] || {}).reduce((sum, value) => sum + value, 0);
      const card = el('button', 'mu-hub-card');
      card.type = 'button';
      card.appendChild(el('span', 'mu-hub-emoji', emoji));
      card.appendChild(el('span', 'mu-hub-name', name));
      card.appendChild(el('span', 'mu-hub-desc', desc));
      card.appendChild(el('span', 'mu-hub-stars', `⭐ ${earned}/${levelCount * 3}`));
      card.addEventListener('click', () => { sounds.tap(); renderLevels(activity); });
      return card;
    }
  });
}

// ── seletor de níveis ────────────────────────────────────────────────────────
function renderLevels(activity) {
  swap(() => {
    const levels = activity === 'listen' ? LISTEN_LEVELS : SING_LEVELS;
    const screenEl = el('div', 'mu-screen');
    screenEl.style.backgroundImage = `url('${asset(activity === 'listen' ? 'bg-listen' : 'bg-sing')}')`;
    screenEl.appendChild(el('div', 'mu-veil'));

    const hud = el('div', 'mu-hud');
    const backChip = el('button', 'mu-chip clickable', '⬅️');
    backChip.type = 'button';
    backChip.addEventListener('click', () => { sounds.tap(); renderHub(); });
    hud.appendChild(backChip);
    hud.appendChild(el('div', 'mu-chip', uiText(language, 'backToHub')));
    screenEl.appendChild(hud);

    const panel = el('div', 'mu-panel');
    panel.appendChild(el('div', 'mu-title', activity === 'listen' ? `🕵️ ${uiText(language, 'listen')}` : `🎤 ${uiText(language, 'sing')}`));

    const grid = el('div', 'mu-levels');
    const firstLocked = nextLockedLevel(levels, state.stars, activity);
    for (const entry of levels) {
      const stars = state.stars[activity]?.[entry.level] || 0;
      const unlocked = !firstLocked || entry.level <= firstLocked;
      const button = el('button', `mu-level-btn${stars ? ' done' : ''}${unlocked ? '' : ' locked'}`);
      button.type = 'button';
      button.appendChild(el('span', null, String(entry.level)));
      button.appendChild(el('span', 'stars', stars ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : unlocked ? '▶' : '🔒'));
      button.title = unlocked ? uiText(language, 'level', { n: entry.level }) : uiText(language, 'locked');
      button.addEventListener('click', () => {
        if (!unlocked) { sounds.wrong(); return; }
        sounds.tap();
        if (activity === 'listen') openListen(entry.level);
        else openSing(entry.level);
      });
      grid.appendChild(button);
    }
    panel.appendChild(grid);
    screenEl.appendChild(panel);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── atividades ───────────────────────────────────────────────────────────────
function openListen(level) {
  const config = LISTEN_LEVELS[Math.min(level, LISTEN_LEVELS.length) - 1];
  swap(() => openListenLevel(root, {
    level,
    config,
    language,
    onBack: () => renderLevels('listen'),
    onSave(stars) {
      recordStars(state, 'listen', level, stars);
      setState(() => {});
    },
    onFinish(stars, nextLevel) {
      if (nextLevel > LISTEN_LEVELS.length) { celebrateAllDone('listen'); return; }
      openListen(nextLevel); // próximo nível ou replay do mesmo (melodia nova)
    },
  }));
}

function openSing(level) {
  const entry = SING_LEVELS[Math.min(level, SING_LEVELS.length) - 1];
  const song = SING_SONGS.find((candidate) => candidate.id === entry.songId);
  swap(() => openSingLevel(root, {
    level,
    song,
    tempo: entry.tempo,
    language,
    micReady: state.micGranted,
    onBack: (target) => (target === 'listen' ? renderLevels('listen') : renderLevels('sing')),
    onMicGranted() {
      setState((draft) => { draft.micGranted = true; });
    },
    onSave(stars) {
      recordStars(state, 'sing', level, stars);
      setState(() => {});
    },
    onFinish(stars, nextLevel) {
      if (nextLevel > SING_LEVELS.length) { celebrateAllDone('sing'); return; }
      openSing(nextLevel);
    },
  }));
}

function celebrateAllDone(activity) {
  sounds.fanfare();
  confetti(160, 3200);
  renderLevels(activity);
}

// ── boot ─────────────────────────────────────────────────────────────────────
try {
  ensureStyles();
  renderTitle();
} catch (error) {
  const fatal = document.getElementById('fatal');
  if (fatal) {
    fatal.textContent = uiText(language, 'errorFatal');
    fatal.classList.add('show');
  }
  throw error;
}
