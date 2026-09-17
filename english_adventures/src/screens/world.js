// Tela de mundo do English Adventures: a cena viva (fundo pintado + caminho
// mapeado + herói animado) e o runner de nós (caminhada → fala → amigo →
// desafio de inglês → passagem de leitura → recompensa → final).

import { el, burst, burstAt, confetti, toast, typewriter } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { asset, preload, WORLD_STICKER } from '../assets.js';
import { WORLDS, WORLD_ORDER, FRIENDS, PATHS, EXPLORE_SECRETS, nodesFor } from '../story.js';
import { buildChallenge, passageFor } from '../questions/index.js';
import {
  recordSolve, recordSkill, discoverFriend, addCollectible, grantPresent, openPresent,
  completeWorld, refreshQuests, saveState,
} from '../state.js';
import { showQuiz } from '../widgets/quiz.js';
import { showPassageSet } from '../widgets/passage.js';
import { openPresentFlow } from '../widgets/present.js';

const WALK_FRAMES = { girl: 4, boy: 4 };
// Both character sprite sheets natively face RIGHT, so artFacing=+1 means
// walking-right shows them unflipped (forward); walking-left flips them so
// they keep facing the direction of travel instead of moonwalking.
const ART_FACING = { girl: 1, boy: 1 };
const FRIEND_T = 0.3;

export function openWorldScreen(root, context) {
  const { worldId, player, getState, setState, language, renderQuests, onExit, onComplete, onFriend, onExitToMenu } = context;
  const world = WORLDS[worldId];
  const nodes = nodesFor(worldId);
  const state = getState();

  const screen = el('div', 'ma-world-screen');
  const scene = el('div', 'ma-scene');
  const bg = el('div', 'ma-world-bg');
  bg.style.backgroundImage = `url('${asset(world.asset)}')`;
  scene.appendChild(bg);

  // faíscas ambientes
  for (let index = 0; index < 6; index += 1) {
    const dot = el('span', 'ma-path-spark');
    dot.style.left = `${8 + index * 15 + Math.random() * 6}%`;
    dot.style.top = `${62 + Math.random() * 24}%`;
    dot.style.animationDelay = `${Math.random() * 2.4}s`;
    scene.appendChild(dot);
  }

  // ── caminho pintado mapeado em waypoints ──
  const path = PATHS[worldId];
  const pathLengths = [];
  let totalLength = 0;
  for (let index = 0; index < path.length - 1; index += 1) {
    const dx = path[index + 1][0] - path[index][0];
    const dy = (path[index + 1][1] - path[index][1]) * 1.6;
    const length = Math.sqrt(dx * dx + dy * dy);
    pathLengths.push(length);
    totalLength += length;
  }
  function pointAt(t) {
    const clamped = Math.max(0, Math.min(1, t));
    let target = clamped * totalLength;
    let index = 0;
    while (index < pathLengths.length - 1 && target > pathLengths[index]) {
      target -= pathLengths[index];
      index += 1;
    }
    const f = pathLengths[index] ? Math.min(1, target / pathLengths[index]) : 0;
    const [ax, ay] = path[index];
    const [bx, by] = path[index + 1];
    const x = ax + (bx - ax) * f;
    const y = ay + (by - ay) * f;
    const s = Math.max(0.42, Math.min(1.15, 0.45 + ((y - 42) / 58) * 0.68));
    return { x, y, s };
  }

  const heroName = state.character || 'girl';
  const artFacing = ART_FACING[heroName] ?? 1;
  const frameCount = WALK_FRAMES[heroName] || 5;
  const walkFrames = Array.from({ length: frameCount }, (_, index) => asset(`walk-${heroName}-${index + 1}`));
  const idleSrc = walkFrames[0];

  const character = el('div', 'ma-character');
  const sprite = el('img', 'ma-sprite');
  sprite.src = idleSrc;
  sprite.alt = '';
  character.appendChild(sprite);
  scene.appendChild(character);
  const shadow = el('div', 'ma-char-shadow');
  scene.appendChild(shadow);

  // ── amigo morador (aparece só na interação) ──
  const friend = FRIENDS[Object.keys(FRIENDS).find((id) => FRIENDS[id].world === worldId)];
  const friendPoint = pointAt(FRIEND_T);
  const friendNode = el('div', 'ma-world-friend hidden');
  const friendImage = el('img');
  friendImage.src = friend.id === 'maria' ? asset('sprite-maria') : asset(`friend-scene-${friend.id}`);
  friendImage.alt = lang(friend.name, language);
  friendNode.appendChild(friendImage);
  const friendTag = el('div', 'ma-friend-tag', lang(friend.name, language));
  friendNode.appendChild(friendTag);
  friendNode.style.left = `${friendPoint.x + 3.5}%`;
  friendNode.style.top = `${friendPoint.y}%`;
  friendNode.style.width = `${Math.round(104 * friendPoint.s)}px`;
  friendNode.style.zIndex = String(Math.round(friendPoint.y));
  scene.appendChild(friendNode);

  // ── HUD ──
  const hud = el('div', 'ma-hud');
  const backButton = el('button', 'ma-hud-chip ma-back', '🗺️');
  backButton.type = 'button';
  backButton.title = uiText(language, 'backToMap');
  backButton.addEventListener('click', () => {
    sounds.tap();
    onExit();
  });
  hud.appendChild(backButton);
  if (typeof onExitToMenu === 'function') {
    const homeButton = el('button', 'ma-hud-chip ma-home', '🏠');
    homeButton.type = 'button';
    homeButton.title = uiText(language, 'exitToLauncher');
    homeButton.addEventListener('click', () => {
      sounds.tap();
      onExitToMenu();
    });
    hud.appendChild(homeButton);
  }
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

  const banner = el('div', 'ma-banner hidden');
  screen.appendChild(banner);
  const stage = el('div', 'ma-stage');
  screen.appendChild(stage);
  screen.appendChild(scene);
  root.appendChild(screen);

  // checkpoint por mundo
  let nodeIndex = state.worldId === worldId
    ? Math.min(state.nodeIndex || 0, nodes.length - 1)
    : 0;
  let destroyed = false;
  const timers = [];
  const later = (fn, delay) => timers.push(setTimeout(fn, delay));

  // posição inicial do herói: fim do último trecho caminhado antes do checkpoint
  let heroT = 0.02;
  for (let i = Math.min(nodeIndex, nodes.length) - 1; i >= 0; i -= 1) {
    if (nodes[i].type === 'walk') {
      heroT = Math.max(0.02, Math.min(1, nodes[i].to));
      break;
    }
  }
  let facing = artFacing;
  let walkTimer = null;

  function placeHero(point) {
    character.style.left = `${point.x}%`;
    character.style.top = `${point.y}%`;
    character.style.width = `${Math.round(118 * point.s)}px`;
    character.style.transform = `translate(-50%, -100%) scaleX(${facing})`;
    character.style.zIndex = String(Math.round(point.y));
    shadow.style.left = `${point.x}%`;
    shadow.style.top = `${point.y}%`;
    shadow.style.width = `${Math.round(96 * point.s)}px`;
    shadow.style.height = `${Math.round(18 * point.s)}px`;
    shadow.style.opacity = String(0.28 * point.s + 0.08);
  }
  placeHero(pointAt(heroT));

  function moveCharacterTo(t, done, opts = {}) {
    const bannerEl = banner;
    bannerEl.classList.add('hidden');
    const from = heroT;
    const distance = Math.abs(t - from);
    const duration = Math.max(1400, distance * 17000);
    const startedAt = performance.now();
    character.classList.add('walking');
    facing = (t >= from ? 1 : -1) * artFacing;
    let frame = 0;
    clearInterval(walkTimer);
    walkTimer = setInterval(() => {
      frame = (frame + 1) % walkFrames.length;
      sprite.src = walkFrames[frame];
    }, 130);
    const step = (now) => {
      if (destroyed) return;
      const progress = Math.min(1, (now - startedAt) / duration);
      heroT = from + (t - from) * progress;
      placeHero(pointAt(heroT));
      if (opts.fade) {
        character.style.opacity = String(progress < 0.55 ? 1 : Math.max(0, 1 - (progress - 0.55) / 0.45));
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        clearInterval(walkTimer);
        sprite.src = idleSrc;
        character.classList.remove('walking');
        if (done) done();
      }
    };
    requestAnimationFrame(step);
  }

  function persist() {
    setState((draft) => {
      draft.worldId = worldId;
      draft.nodeIndex = nodeIndex;
      draft.worldStatus = draft.worldStatus || {};
      if (draft.worldStatus[worldId] !== 'completed') draft.worldStatus[worldId] = 'in-progress';
    });
  }

  function showBanner(text, sticky = false) {
    banner.textContent = text;
    banner.classList.remove('hidden');
    if (!sticky) later(() => banner.classList.add('hidden'), 2600);
  }

  function showFriend() {
    friendNode.classList.remove('hidden');
    friendTag.classList.add('show');
  }
  function hideFriend() {
    friendNode.classList.add('hidden');
    friendTag.classList.remove('show');
  }

  function showDialogue(speakerId, lines, done) {
    const speaker = speakerId !== 'narrator' ? FRIENDS[speakerId] : null;
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
    let typer = null;
    const showLine = () => {
      typer = typewriter(text, lang(lines[lineIndex], language), 16);
    };
    const handler = () => {
      if (typer && !typer.finished) {
        typer.finish();
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
    stage.addEventListener('click', handler);
    showLine();
  }

  function showReward(presentId) {
    const current = getState();
    const contents = [];
    const stickerId = `world-sticker-${worldId}`;
    if (!current.stickers[stickerId]) {
      contents.push({ kind: 'sticker', id: stickerId, assetId: WORLD_STICKER[worldId], name: world.collectible.name });
    } else {
      contents.push({ kind: 'collectible', id: `${presentId}-c`, emoji: world.collectible.emoji, name: { en: `+2 ${world.collectible.name.en}` } });
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
      spot.style.top = `${38 + ((index * 23) % 30)}%`;
      spot.innerHTML = `<span class="ma-spot-icon">${isCollectible ? world.collectible.emoji : '✨'}</span>`;
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
          if (secret) showBanner(secret[language] || secret.en, true);
        }
        if (found >= totalSpots) {
          later(() => continueButton.classList.add('glow'), 600);
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
    const challenge = buildChallenge({
      worldId,
      worldIndex: WORLD_ORDER.indexOf(worldId),
      encounterId: node.id,
      slot: node.slot,
      kind: node.widget,
      skill: node.skill,
      tier: world.tier,
      player,
      skills: getState().skills,
    });
    showQuiz(stage, challenge, language, {
      onSolved: () => {
        setState((draft) => {
          recordSolve(draft, node.id, { attempts: 1 });
          recordSkill(draft, challenge.skill, true);
          refreshQuests(draft);
        });
        advance();
      },
      onWrong: () => {
        setState((draft) => recordSkill(draft, challenge.skill, false));
      },
    });
  }

  function runPassage(node) {
    const passage = passageFor(WORLD_ORDER.indexOf(worldId));
    showPassageSet(stage, passage, language, () => {
      setState((draft) => {
        recordSolve(draft, node.id, { attempts: 1 });
        refreshQuests(draft);
      });
      advance();
    });
  }

  function runFriend(node) {
    showFriend();
    setState((draft) => {
      if (discoverFriend(draft, node.id)) refreshQuests(draft);
    });
    sounds.badge();
    burstAt(friendNode, 20);
    if (getState().friends.includes(node.id)) onFriend?.(node.id);
    advance();
  }

  function runFinale() {
    const { badges } = completeWorldDraft();
    hideFriend();
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
      card.appendChild(el('div', 'ma-world-complete-badge', `🏅 ${uiText(language, 'rewardBadge')}`));
    }
    const button = el('button', 'ma-continue', uiText(language, 'nextWorld'));
    button.type = 'button';
    button.addEventListener('click', () => {
      sounds.tap();
      onComplete();
    });
    card.appendChild(button);
    const laterButton = el('button', 'ma-secondary', uiText(language, 'continueLater'));
    laterButton.type = 'button';
    laterButton.addEventListener('click', () => {
      sounds.tap();
      onExitToMenu?.();
    });
    card.appendChild(laterButton);
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
        hideFriend();
        moveCharacterTo(node.to, () => advance(), { fade: Boolean(node.fade) });
        break;
      case 'arrive':
        showBanner({
          gate: `🚪 ${lang(world.title, language)}`, friend: '👋', clearing: '🔍', crossing: '🛤️',
          shop: '🏪', bridge: '🌉', stones: '🪨', 'gate-exit': '🎉',
        }[node.place] || '✨');
        later(() => advance(), 900);
        break;
      case 'dialogue':
        if (node.bye) showFriend();
        showDialogue(node.speaker, node.lines, () => {
          if (node.bye) hideFriend();
          advance();
        });
        break;
      case 'explore':
        hideFriend();
        runExplore(node);
        break;
      case 'encounter':
        runEncounter(node);
        break;
      case 'passage':
        runPassage(node);
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

  preload([world.asset]).then(() => {
    if (destroyed) return;
    runCurrent();
  });

  return {
    destroy() {
      destroyed = true;
      timers.forEach(clearTimeout);
      clearInterval(walkTimer);
      screen.remove();
    },
  };
}
