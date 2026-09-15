// Maths Adventures — boot da aplicação.
// Encaixa no ecossistema do site: recebe nome/idioma do launcher (query param,
// igual ao atlas), persiste por jogadora em localStorage (spec §25/§36).

import { applyLauncherParams, loadPreferences } from './prefs.js';
import {
  loadState, saveState, refreshQuests, questMetricValue, QUEST_POOL,
} from './state.js';
import { setMuted, sounds } from './audio.js';
import { el, clearContainer } from './ui.js';
import { uiText } from './i18n.js';
import { ensureStyles } from './styles.js';
import { openTitleScreen } from './screens/title.js';
import { openMapScreen } from './screens/map.js';
import { openWorldScreen } from './screens/world.js';
import { openFriendsGallery } from './screens/friends.js';
import { openPalaceFinale } from './screens/finale.js';
import { WORLDS, WORLD_ORDER, nextWorld } from './story.js';

const root = document.getElementById('app');

const preferences = applyLauncherParams(loadPreferences());
const language = preferences.language;
document.documentElement.dataset.maLang = language;
document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';

let playerName = preferences.name || 'explorer';
let state = loadState(localStorage, playerName);
setMuted(!state.sound);
refreshQuests(state);
saveState(localStorage, playerName, state);

// Mutação centralizada: componentes pedem o draft e persistimos aqui.
let currentScreen = null;
function setState(mutate) {
  mutate(state);
  state = saveState(localStorage, playerName, state);
}

function swapScreen(open) {
  currentScreen?.destroy?.();
  clearContainer(root);
  currentScreen = open();
}

// ── Missões visíveis (spec §17): chips no HUD com progresso ──────────────────
function questChip(questId) {
  const definition = QUEST_POOL.find((quest) => quest.id === questId);
  if (!definition) return null;
  const label = () => {
    if (definition.metric === 'solved') return uiText(language, 'questSolved', { n: definition.target });
    if (definition.metric === 'friends') return uiText(language, 'questMeet', { n: definition.target });
    if (definition.metric === 'presents') return uiText(language, 'questPresents', { n: definition.target });
    if (definition.metric.startsWith('collect:')) {
      const worldId = definition.metric.slice(8);
      const name = WORLDS[worldId]?.collectible.name;
      return uiText(language, 'questCollect', { n: definition.target, item: name ? name[language] || name.pt : '' });
    }
    return questId;
  };
  const current = Math.min(questMetricValue(state, definition.metric), definition.target);
  const chip = el('div', `ma-quest${current >= definition.target ? ' done' : ''}`);
  chip.innerHTML = `<span class="ma-quest-icon">${definition.icon}</span><span class="ma-quest-label">${label()}</span><span class="ma-quest-count">${current}/${definition.target}</span>`;
  return chip;
}

function renderQuests(hud) {
  refreshQuests(state);
  const wrap = el('div', 'ma-quests');
  for (const questId of state.quests.active.slice(0, 3)) {
    const chip = questChip(questId);
    if (chip) wrap.appendChild(chip);
  }
  hud.appendChild(wrap);
}

// ── Navegação entre telas ────────────────────────────────────────────────────
function firstOpenWorld() {
  for (const worldId of WORLD_ORDER) {
    if (state.worldStatus[worldId] !== 'completed') return worldId;
  }
  return WORLD_ORDER[0];
}

function openTitle() {
  swapScreen(() => openTitleScreen(root, {
    getState: () => state,
    setState,
    language,
    onPlay: () => {
      if (!state.character) {
        openTitle();
        return;
      }
      if (state.worldId) openWorld(state.worldId);
      else openMap();
    },
    onExit: exitToLauncher,
  }));
}

function openWorld(worldId) {
  swapScreen(() => openWorldScreen(root, {
    worldId,
    player: playerName,
    getState: () => state,
    setState,
    language,
    renderQuests,
    onExit: openMap,
    onExitToMenu: exitToLauncher,
    onFriend: () => {},
    onComplete: () => {
      const next = nextWorld(worldId);
      if (next) {
        // Checkpoint do próximo mundo começa zerado.
        setState((draft) => {
          draft.worldId = next;
          draft.nodeIndex = 0;
        });
        openWorld(next);
      } else {
        openPalace();
      }
    },
  }));
}

function openMap() {
  swapScreen(() => openMapScreen(root, {
    getState: () => state,
    language,
    onEnterWorld: openWorld,
    onOpenFriends: openFriends,
    onOpenPalace: openPalace,
    onExit: exitToLauncher,
  }));
}

// Galeria abre como overlay por cima do mapa (o mapa continua embaixo).
function openFriends() {
  const gallery = openFriendsGallery(root, {
    getState: () => state,
    language,
    onClose: () => gallery.destroy(),
  });
}

function openPalace() {
  swapScreen(() => openPalaceFinale(root, {
    getState: () => state,
    setState,
    language,
    onFinish: () => {
      setState((draft) => {
        draft.storyCompleted = true;
        draft.worldId = '';
        draft.nodeIndex = 0;
      });
      openMap();
    },
  }));
}

function exitToLauncher() {
  window.location.href = '../index.html';
}

// Primeiro gesto destrava o AudioContext (política de autoplay).
document.addEventListener('pointerdown', () => sounds.tap(), { once: true });

ensureStyles();
openTitle();

// Gancho de depuração pelo console (padrão do atlas).
window.__mathsDebug = {
  state: () => state,
  completeWorld: (worldId) => {
    setState((draft) => {
      draft.worldStatus[worldId] = 'completed';
    });
  },
  goto: (screenId, arg) => {
    if (screenId === 'map') openMap();
    if (screenId === 'world') openWorld(arg || WORLD_ORDER[0]);
    if (screenId === 'palace') openPalace();
    if (screenId === 'title') openTitle();
  },
  get player() {
    return playerName;
  },
  set player(value) {
    playerName = value;
    state = loadState(localStorage, playerName);
  },
};
