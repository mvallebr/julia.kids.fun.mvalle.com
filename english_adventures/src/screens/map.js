// Mapa do reino (spec §24): golden path linking the 15 worlds to the Grand Academy
// Dourado; mundos completos brilham, futuros ficam trancados.

import { el, clearContainer, confetti } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { WORLDS, WORLD_ORDER, FRIENDS } from '../story.js';
import { isWorldUnlocked, solvedCount } from '../state.js';
import { preload } from '../assets.js';

const NODE_POSITIONS = [
  { x: 7, y: 78 }, { x: 14, y: 60 }, { x: 21, y: 76 }, { x: 28, y: 56 },
  { x: 35, y: 74 }, { x: 42, y: 52 }, { x: 49, y: 72 }, { x: 56, y: 48 },
  { x: 63, y: 68 }, { x: 70, y: 44 }, { x: 77, y: 64 }, { x: 84, y: 40 },
  { x: 90, y: 60 }, { x: 96, y: 38 }, { x: 92, y: 20 },
];
const PALACE_POSITION = { x: 94, y: 12 };

// Caminho serpenteante pelos nós (coordenadas % do mapa).
function pathFor(nodes) {
  const points = nodes.map((node) => `${node.x},${node.y}`);
  return `M ${points.join(' L ')}`;
}

export function openMapScreen(root, context) {
  const { getState, language, onEnterWorld, onOpenFriends, onOpenPalace, onExit } = context;
  const state = getState();
  const screen = el('div', 'ma-map-screen');
  const sky = el('div', 'ma-map-sky');
  screen.appendChild(sky);

  const title = el('h1', 'ma-map-title', `🗺️ ${uiText(language, 'map')}`);
  screen.appendChild(title);

  const map = el('div', 'ma-map');
  // Caminho dourado contínuo até o palácio (spec §6).
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.classList.add('ma-map-path');
  const allPoints = [...NODE_POSITIONS, PALACE_POSITION];
  const completedIndex = WORLD_ORDER.reduce((last, worldId, index) => (state.worldStatus[worldId] === 'completed' ? index : last), -1);
  const drawPath = (upto, className) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathFor(allPoints.slice(0, upto + 1)));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'url(#ma-map-gold)');
    path.setAttribute('stroke-width', '2.2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-dasharray', '3 2.2');
    path.classList.add(className);
    svg.appendChild(path);
  };
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `
    <linearGradient id="ma-map-gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffe27a"/>
      <stop offset=".6" stop-color="#ffd166"/>
      <stop offset="1" stop-color="#fff3c4"/>
    </linearGradient>`;
  svg.appendChild(defs);
  drawPath(allPoints.length - 1, 'ma-map-path-ghost');
  if (completedIndex >= 0) drawPath(completedIndex + 1, 'ma-map-path-lit');
  map.appendChild(svg);

  // The Grand Academy at the top.
  const palaceReady = completedIndex >= WORLD_ORDER.length - 1;
  const palace = el('button', `ma-map-palace${palaceReady ? ' ready' : ''}`, '🏰');
  palace.type = 'button';
  palace.title = 'The Grand Academy';
  palace.style.left = `${PALACE_POSITION.x}%`;
  palace.style.top = `${PALACE_POSITION.y}%`;
  palace.addEventListener('click', () => {
    if (!palaceReady) {
      toast(uiText(language, 'locked'), 'retry');
      return;
    }
    sounds.fanfare();
    onOpenPalace();
  });
  map.appendChild(palace);

  WORLD_ORDER.forEach((worldId, index) => {
    const world = WORLDS[worldId];
    const status = state.worldStatus[worldId];
    const unlocked = isWorldUnlocked(state, worldId, WORLD_ORDER);
    const node = NODE_POSITIONS[index];
    const button = el('button', 'ma-map-node');
    button.type = 'button';
    button.style.left = `${node.x}%`;
    button.style.top = `${node.y}%`;
    const classes = ['ma-map-node'];
    if (status === 'completed') classes.push('done');
    else if (unlocked) classes.push('current');
    else classes.push('locked');
    button.className = classes.join(' ');
    button.appendChild(el('span', 'ma-map-node-emoji', unlocked ? world.emoji : '🔒'));
    button.appendChild(el('span', 'ma-map-node-name', lang(world.title, language)));
    button.appendChild(el('span', 'ma-map-node-status', status === 'completed'
      ? `✓ ${uiText(language, 'completed')}`
      : unlocked ? `▶ ${uiText(language, 'play')}` : uiText(language, 'locked')));
    button.addEventListener('click', () => {
      if (!unlocked) {
        toast(uiText(language, 'locked'), 'retry');
        return;
      }
      sounds.tap();
      onEnterWorld(worldId);
    });
    map.appendChild(button);
  });

  screen.appendChild(map);

  // Rodapé: amigos + voltar + progresso.
  const footer = el('div', 'ma-map-footer');
  const stats = el('div', 'ma-map-stats', `🧮 ${solvedCount(state)} · 🤝 ${state.friends.length}/10 · 🎟️ ${Object.keys(state.stickers).length} · 🏅 ${Object.keys(state.badges).length}`);
  footer.appendChild(stats);
  const friendsButton = el('button', 'ma-map-friends', `🤝 ${uiText(language, 'friends')}`);
  friendsButton.type = 'button';
  friendsButton.addEventListener('click', () => {
    sounds.tap();
    onOpenFriends();
  });
  footer.appendChild(friendsButton);
  const backButton = el('button', 'ma-map-back', uiText(language, 'exitToLauncher'));
  backButton.type = 'button';
  backButton.addEventListener('click', () => {
    sounds.tap();
    onExit();
  });
  footer.appendChild(backButton);
  screen.appendChild(footer);

  root.appendChild(screen);
  if (palaceReady) confetti(60, 1600);
  preload(WORLD_ORDER.map((id) => WORLDS[id].asset));
  return {
    destroy() {
      screen.remove();
    },
  };
}

export { FRIENDS };
