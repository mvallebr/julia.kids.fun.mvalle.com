// Tela de mundo: a cena viva (fundo rico + caminho dourado + personagem que
// anda) e o runner de nós da história (caminhada guiada → fala → exploração →
// desafio → recompensa → final do mundo). Spec §9/§22/§32.

import { el, burst, burstAt, confetti, toast, typewriter, clearContainer } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { asset, preload, WORLD_STICKER } from '../assets.js';
import { WORLDS, WORLD_CONTEXT, EXPLORE_SECRETS, FRIENDS, nodesFor } from '../story.js';
import { generateChallenge } from '../generators.js';
import { seededRandom } from '../rng.js';
import {
  seedFor, recordSolve, discoverFriend, addCollectible, grantPresent, openPresent,
  completeWorld, refreshQuests, saveState,
} from '../state.js';
import { showEncounter } from '../widgets/encounters.js';
import { openPresentFlow } from '../widgets/present.js';

// Gera o desafio estável do encontro (semente por jogador+id, spec §25).
function challengeFor(encounter, world, player) {
  const next = seededRandom(seedFor(player, encounter.id));
  const tier = world.tier;
  let challenge = generateChallenge(encounter.template, tier, next, {
    item: WORLD_CONTEXT[world.id]?.item,
    currency: WORLD_CONTEXT[world.id]?.currency,
    ...(encounter.fixed || {}),
  });
  // Widgets com alternativas precisam de templates que as produzam; chaves e
  // encruzilhada precisam de expressão pura (sem "?"), tipo "4 + 3".
  const needsExpression = encounter.widget === 'pathChoice' || encounter.widget === 'keys';
  const needsChoices = needsExpression || encounter.widget === 'matching';
  if (needsChoices && (!challenge.choices || (needsExpression && challenge.display.includes('?')))) {
    const fallback = tier <= 2 ? 'addWithin' : tier <= 4 ? 'mulFacts' : tier <= 6 ? 'divFacts' : 'mixedOps';
    challenge = generateChallenge(fallback, tier, next, {
      item: WORLD_CONTEXT[world.id]?.item,
      currency: WORLD_CONTEXT[world.id]?.currency,
      ...(encounter.fixed || {}),
    });
  }
  // Encruzilhada: mostra o alvo (resposta) e duas placas de expressão.
  if (encounter.widget === 'pathChoice') {
    challenge.context = challenge.context || {};
    const wrong = challenge.choices.map(Number).find((value) => value !== Number(challenge.answer));
    challenge.context.expressions = [
      { value: Number(challenge.answer), label: challenge.display },
      { value: wrong, label: deriveExpression(wrong, next) },
    ];
  }
  return challenge;
}

// Expressão simples cujo valor é o dado (placa errada da encruzilhada).
function deriveExpression(value, next) {
  if (value % 2 === 0 && value / 2 >= 2 && value / 2 <= 20) {
    const half = value / 2;
    return half === 1 ? `1 + ${value - 1}` : `${half} × 2`;
  }
  if (value > 10) {
    const a = 10 + Math.floor(next() * Math.max(1, value - 12));
    return `${a} + ${value - a}`;
  }
  return `0 + ${value}`;
}

export function openWorldScreen(root, context) {
  const { worldId, player, getState, setState, language, onExit, onComplete, onFriend } = context;
  const world = WORLDS[worldId];
  const nodes = nodesFor(worldId);
  const state = getState();

  const screen = el('div', 'ma-world-screen');
  const bg = el('div', 'ma-world-bg');
  bg.style.backgroundImage = `url('${asset(world.asset)}')`;
  screen.appendChild(bg);

  // Camada do caminho dourado: fita brilhante + partículas (assinatura, spec §6).
  const pathLayer = el('div', 'ma-path');
  pathLayer.innerHTML = `
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path d="M -2 24 C 20 26, 30 18, 50 20 S 85 24, 102 16" fill="none" stroke="url(#ma-gold)" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>
      <path d="M -2 24 C 20 26, 30 18, 50 20 S 85 24, 102 16" fill="none" stroke="#fff8dc" stroke-width=".7" stroke-dasharray="1.5 2.5" stroke-linecap="round" opacity=".8" class="ma-path-dash"/>
      <defs>
        <linearGradient id="ma-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ffe27a"/>
          <stop offset=".5" stop-color="#ffd166"/>
          <stop offset="1" stop-color="#ffb347"/>
        </linearGradient>
      </defs>
    </svg>`;
  for (let index = 0; index < 7; index += 1) {
    const dot = el('span', 'ma-path-spark');
    dot.style.left = `${8 + index * 13 + Math.random() * 6}%`;
    dot.style.top = `${58 + Math.random() * 26}%`;
    dot.style.animationDelay = `${Math.random() * 2.4}s`;
    pathLayer.appendChild(dot);
  }
  screen.appendChild(pathLayer);

  // Personagem.
  const character = el('div', `ma-character ${state.character || 'girl'}`);
  const sprite = el('img', 'ma-sprite');
  sprite.src = asset(`sprite-${state.character || 'girl'}`);
  sprite.alt = '';
  character.appendChild(sprite);
  screen.appendChild(character);

  // Amigo do mundo: fica visível em sua parada.
  const friend = FRIENDS[Object.keys(FRIENDS).find((id) => FRIENDS[id].world === worldId)];
  const friendSprite = friend.id === 'maria'
    ? asset('sprite-maria')
    : null;
  const friendNode = el('div', 'ma-world-friend hidden');
  if (friendSprite) {
    const image = el('img');
    image.src = friendSprite;
    image.alt = lang(friend.name, language);
    friendNode.appendChild(image);
  } else {
    const image = el('img', 'ma-world-friend-portrait');
    image.src = asset(friend.asset);
    image.alt = lang(friend.name, language);
    friendNode.appendChild(image);
  }
  screen.appendChild(friendNode);

  // HUD: voltar, missões, colecionáveis, som.
  const hud = el('div', 'ma-hud');
  const backButton = el('button', 'ma-hud-chip ma-back', '🗺️');
  backButton.type = 'button';
  backButton.title = uiText(language, 'backToMap');
  backButton.addEventListener('click', () => {
    sounds.tap();
    onExit();
  });
  hud.appendChild(backButton);
  const collectChip = el('div', 'ma-hud-chip ma-collect', `${world.collectible.emoji} ${state.collectibles[worldId] || 0}`);
  hud.appendChild(collectChip);
  const soundChip = el('button', 'ma-hud-chip ma-sound', state.sound ? '🔊' : '🔇');
  soundChip.type = 'button';
  soundChip.title = uiText(language, 'muteTitle');
  soundChip.addEventListener('click', () => {
    const next = !getState().sound;
    setState((draft) => { draft.sound = next; });
    soundChip.textContent = next ? '🔊' : '🔇';
    sounds.tap();
  });
  hud.appendChild(soundChip);
  screen.appendChild(hud);
  context.renderQuests?.(hud);

  // Dica suave de exploração/continuar.
  const banner = el('div', 'ma-banner hidden');
  screen.appendChild(banner);
  const stage = el('div', 'ma-stage');
  screen.appendChild(stage);
  root.appendChild(screen);

  // Checkpoint é por mundo: entrando num mundo diferente, começa do início.
  let nodeIndex = state.worldId === worldId
    ? Math.min(state.nodeIndex || 0, nodes.length - 1)
    : 0;
  let position = 0.06; // fração horizontal na cena
  let walking = false;
  let destroyed = false;
  const timers = [];

  const later = (fn, delay) => timers.push(setTimeout(fn, delay));

  function persist() {
    setState((draft) => {
      draft.worldId = worldId;
      draft.nodeIndex = nodeIndex;
      draft.worldStatus = draft.worldStatus || {};
      if (draft.worldStatus[worldId] !== 'completed') draft.worldStatus[worldId] = 'in-progress';
    });
  }

  function moveCharacterTo(fraction, done) {
    walking = true;
    banner.classList.add('hidden');
    const startX = position;
    const distance = Math.abs(fraction - startX);
    const duration = Math.max(900, distance * 9000);
    const startedAt = performance.now();
    character.classList.add('walking');
    const step = (now) => {
      if (destroyed) return;
      const progress = Math.min(1, (now - startedAt) / duration);
      position = startX + (fraction - startX) * progress;
      character.style.left = `${6 + position * 86}%`;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        walking = false;
        character.classList.remove('walking');
        if (done) done();
      }
    };
    requestAnimationFrame(step);
  }

  function placeCharacter() {
    character.style.left = `${6 + position * 86}%`;
  }
  placeCharacter();

  function showBanner(text, sticky = false) {
    banner.textContent = text;
    banner.classList.remove('hidden');
    if (!sticky) later(() => banner.classList.add('hidden'), 2600);
  }

  function showDialogue(speakerId, lines, done) {
    const isFriend = speakerId !== 'narrator';
    const speaker = isFriend ? FRIENDS[speakerId] : null;
    const box = el('div', 'ma-dialogue');
    const portrait = el('div', 'ma-dialogue-portrait');
    if (speaker) {
      const image = el('img');
      image.src = speaker.id === 'maria' ? asset('sprite-maria') : asset(speaker.asset);
      image.alt = lang(speaker.name, language);
      portrait.appendChild(image);
    } else {
      portrait.textContent = '✨';
      portrait.classList.add('narrator');
    }
    const body = el('div', 'ma-dialogue-body');
    const name = el('div', 'ma-dialogue-name', speaker ? lang(speaker.name, language) : '📖');
    const text = el('div', 'ma-dialogue-text');
    const advance = el('div', 'ma-dialogue-advance', uiText(language, 'tapToContinue'));
    body.appendChild(name);
    body.appendChild(text);
    body.appendChild(advance);
    box.appendChild(portrait);
    box.appendChild(body);
    stage.appendChild(box);

    let lineIndex = 0;
    let skipTyping = null;
    const showLine = () => {
      const line = lang(lines[lineIndex], language);
      skipTyping = typewriter(text, line, 16);
    };
    const onAdvance = () => {
      sounds.tap();
      if (skipTyping && !skipTyping.finished) {
        skipTyping.finish();
        return;
      }
      lineIndex += 1;
      if (lineIndex < lines.length) showLine();
      else {
        box.remove();
        stage.removeEventListener('click', handler);
        if (done) done();
      }
    };
    const handler = () => onAdvance();
    stage.addEventListener('click', handler);
    showLine();
  }

  function showReward(presentId, hintKind) {
    const current = getState();
    const contents = [];
    // Primeiro presente do mundo traz o sticker do mundo; demais, colecionáveis.
    const stickerId = `world-sticker-${worldId}`;
    if (!current.stickers[stickerId] && hintKind !== 'none') {
      contents.push({ kind: 'sticker', id: stickerId, assetId: WORLD_STICKER[worldId], name: world.collectible.name });
    } else {
      contents.push({ kind: 'collectible', id: `${presentId}-c`, emoji: world.collectible.emoji, name: { pt: `+2 ${world.collectible.name.pt}`, en: `+2 ${world.collectible.name.en}` } });
    }
    setState((draft) => {
      grantPresent(draft, presentId);
      openPresent(draft, presentId);
      for (const content of contents) {
        if (content.kind === 'sticker') draft.stickers[content.id] = Date.now();
        if (content.kind === 'collectible') addCollectible(draft, worldId, 2);
      }
      refreshQuests(draft);
    });
    collectChip.textContent = `${world.collectible.emoji} ${getState().collectibles[worldId] || 0}`;
    sounds.fanfare();
    openPresentFlow(stage, language, contents, () => advance());
  }

  function runExplore(node) {
    const secrets = EXPLORE_SECRETS[worldId] || [];
    const totalSpots = (node.collectibles || 2) + (node.secrets || 1);
    let found = 0;
    stage.classList.add('exploring');
    showBanner(`🔍 ${uiText(language, 'walkHint')}`, true);
    const continueButton = el('button', 'ma-continue ma-explore-continue', uiText(language, 'continuePath'));
    continueButton.type = 'button';
    continueButton.addEventListener('click', () => {
      sounds.tap();
      cleanup();
      advance();
    });
    stage.appendChild(continueButton);
    const spots = [];
    for (let index = 0; index < totalSpots; index += 1) {
      const isCollectible = index % 2 === 0;
      const spot = el('button', `ma-spot ${isCollectible ? 'collect' : 'secret'}`);
      spot.type = 'button';
      spot.style.left = `${12 + ((index * 37) % 74)}%`;
      spot.style.top = `${40 + ((index * 23) % 34)}%`;
      spot.innerHTML = isCollectible
        ? `<span class="ma-spot-icon">${world.collectible.emoji}</span>`
        : '<span class="ma-spot-icon">✨</span>';
      spot.addEventListener('click', () => {
        if (spot.disabled) return;
        spot.disabled = true;
        spot.classList.add('found');
        const rect = spot.getBoundingClientRect();
        burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        found += 1;
        if (isCollectible) {
          setState((draft) => {
            addCollectible(draft, worldId, 1);
            refreshQuests(draft);
          });
          collectChip.textContent = `${world.collectible.emoji} ${getState().collectibles[worldId] || 0}`;
          sounds.open();
          showBanner(`${uiText(language, 'collectTapped')}: ${world.collectible.emoji} +1`);
        } else {
          sounds.path();
          const secret = secrets[(index + found) % secrets.length] || secrets[0];
          if (secret) showBanner(secret[language] || secret.pt, true);
        }
        if (found >= totalSpots) {
          later(() => { continueButton.classList.add('glow'); }, 600);
        }
      });
      spots.push(spot);
      stage.appendChild(spot);
    }
    function cleanup() {
      stage.classList.remove('exploring');
      spots.forEach((spot) => spot.remove());
      continueButton.remove();
      banner.classList.add('hidden');
    }
  }

  function runEncounter(node) {
    const challenge = challengeFor(node, world, player);
    showBanner('🧮 ✨');
    const overlay = showEncounter(stage, world, node, challenge, language, () => {
      overlay.remove();
      const attempts = 1; // widgets contam tentativas internamente; checkpoint simples
      setState((draft) => {
        recordSolve(draft, node.id, { attempts });
        refreshQuests(draft);
      });
      advance();
    });
  }

  function runFriend(node) {
    setState((draft) => {
      if (discoverFriend(draft, node.id)) refreshQuests(draft);
    });
    const isNew = getState().friends.includes(node.id);
    friendNode.classList.remove('hidden');
    friendNode.style.left = `${6 + (position + 0.08) * 86}%`;
    sounds.badge();
    burstAt(friendNode, 20);
    if (isNew) onFriend?.(node.id);
    advance();
  }

  function runFinale() {
    const { badges } = completeWorldDraft();
    friendNode.classList.remove('hidden');
    friendNode.style.left = '70%';
    confetti(120, 2400);
    sounds.mega();
    const card = el('div', 'ma-world-complete');
    card.appendChild(el('div', 'ma-world-complete-title', `🏆 ${uiText(language, 'worldComplete')}`));
    card.appendChild(el('div', 'ma-world-complete-name', `${world.emoji} ${lang(world.title, language)}`));
    const stats = el('div', 'ma-world-complete-stats');
    stats.appendChild(el('span', null, `${uiText(language, 'scoring')}: ${Object.keys(getState().solved).filter((id) => id.startsWith(worldId)).length}`));
    stats.appendChild(el('span', null, `${world.collectible.emoji} ${getState().collectibles[worldId] || 0}`));
    stats.appendChild(el('span', null, `🤝 ${lang(friend.name, language)}`));
    card.appendChild(stats);
    if (badges.length) {
      const badgeLine = el('div', 'ma-world-complete-badge', `🏅 ${uiText(language, 'rewardBadge')}`);
      card.appendChild(badgeLine);
    }
    const button = el('button', 'ma-continue', uiText(language, 'nextWorld'));
    button.type = 'button';
    button.addEventListener('click', () => {
      sounds.tap();
      onComplete();
    });
    card.appendChild(button);
    stage.appendChild(card);
    button.focus();
  }

  function completeWorldDraft() {
    let result = null;
    setState((draft) => {
      result = completeWorld(draft, worldId);
      refreshQuests(draft);
    });
    return result || { badges: [] };
  }

  function advance() {
    if (destroyed) return;
    nodeIndex += 1;
    persist();
    runCurrent();
  }

  function runCurrent() {
    if (destroyed) return;
    const node = nodes[nodeIndex];
    if (!node) return;
    switch (node.type) {
      case 'walk':
        moveCharacterTo(node.to, () => advance());
        break;
      case 'arrive':
        showBanner({ gate: `🚪 ${lang(world.title, language)}`, friend: '👋', clearing: '🔍', grove: '🔍', crossing: '🛤️', shop: '🏪', bridge: '🌉', chest: '🧰', 'gate-exit': '🎉' }[node.place] || '✨');
        later(() => advance(), 900);
        break;
      case 'dialogue':
        showDialogue(node.speaker, node.lines, () => advance());
        break;
      case 'explore':
        runExplore(node);
        break;
      case 'encounter':
        runEncounter(node);
        break;
      case 'friend':
        runFriend(node);
        break;
      case 'reward':
        showReward(node.id, node.hint);
        break;
      case 'finale':
        runFinale();
        break;
      default:
        advance();
    }
  }

  // Precarrega o fundo antes de entrar em cena (spec §29).
  preload([world.asset]).then(() => {
    if (destroyed) return;
    // Retomada: pula nós já resolvidos até o próximo ponto de decisão.
    runCurrent();
  });

  return {
    destroy() {
      destroyed = true;
      timers.forEach(clearTimeout);
      screen.remove();
    },
  };
}
