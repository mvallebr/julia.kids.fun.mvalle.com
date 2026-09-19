// RPG Welling — motor do jogo: cena 3D, controles, diálogos e missões.
// Slice vertical do spec §38: escola → biblioteca → pista → trilha na mata.

import * as THREE from 'three';
import { uiText, lang } from './i18n.js';
import { ensureAudio, setMuted, sounds } from './audio.js';
import { loadState, saveState, CHARACTERS, MAP_PIECES } from './state.js';
import { currentObjective, hintKey, checkStone, canAssembleMap, pieceCount } from './quest.js';
import { buildSchool, buildWoods, makeKid, makeOwl, makeAdult, blobShadow } from './world.js';
import { NPCS, CONVERSATIONS, STORY_PANELS, FLAVOR, CLUES, GLOSSES, PIECE_NAMES } from './content.js';
import { el, toast, confetti, storybook, fade } from './ui.js';

// ── parâmetros da lançadora ───────────────────────────────────────────────────
const params = new URLSearchParams(location.search);
const player = (params.get('name') || 'Exploradora').trim().slice(0, 32);
const language = ['pt', 'en', 'es'].includes(params.get('language')) ? params.get('language') : 'pt';
// QA: ?zone=woods pula direto para a mata sem poluir o save real
const warp = ['woods', 'school'].includes(params.get('zone')) ? params.get('zone') : null;

let state = loadState(localStorage, player);
if (warp) {
  state = { ...state, character: state.character || 'ivy', zone: warp, flags: { ...state.flags, introSeen: true, mapAssembled: true } };
}

const $ = (id) => document.getElementById(id);
const root = $('rpg');

// ── rótulos dos botões de interação (trilíngues) ─────────────────────────────
const PROMPTS = {
  finch: { pt: '🗣️ Falar com o Sr. Finch', en: '🗣️ Talk to Mr Finch', es: '🗣️ Hablar con el Sr. Finch' },
  page: { pt: '🗣️ Falar com a Sra. Page', en: '🗣️ Talk to Ms Page', es: '🗣️ Hablar con la Sra. Page' },
  board: { pt: '🔍 Olhar o mural', en: '🔍 Look at the board', es: '🔍 Mirar el mural' },
  signTree: { pt: '🔍 Olhar a árvore dourada', en: '🔍 Look at the golden tree', es: '🔍 Mirar el árbol dorado' },
  pieceShelf: { pt: '🔍 Procurar na estante', en: '🔍 Search the shelf', es: '🔍 Buscar en el estante' },
  pieceTrolley: { pt: '🔍 Procurar no carrinho', en: '🔍 Search the trolley', es: '🔍 Buscar en el carrito' },
  clueTable: { pt: '🔍 Olhar embaixo da mesa', en: '🔍 Look under the table', es: '🔍 Mirar bajo la mesa' },
  clueOak: { pt: '🔍 Olhar o carvalho', en: '🔍 Look at the oak', es: '🔍 Mirar el roble' },
  ivyDoor: { pt: '🌳 Porta de heras', en: '🌳 Ivy door', es: '🌳 Puerta de hiedra' },
  marker: { pt: '🔍 Ler a pedra antiga', en: '🔍 Read the old stone', es: '🔍 Leer la piedra antigua' },
  gate: { pt: '🚪 Portão secreto', en: '🚪 Secret gate', es: '🚪 Puerta secreta' },
};

const OBJECTIVE_KEYS = {
  talk: 'objTalk', find: 'objFind', assemble: 'objAssemble', toWoods: 'objToWoods',
  cross: 'objCross', gate: 'objGate', done: 'objDone',
};

// ── three.js: base ────────────────────────────────────────────────────────────
let renderer, scene, camera, clock;
let zone = null;
let playerObj = null, owlObj = null, companionObj = null, companionOwl = null;
const npcs = {};
let ring = null;
let overlayCount = 0; // >0 = menus/diálogos abertos, movimento travado
let ended = false;

function initThree() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  root.prepend(renderer.domElement);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
  clock = new THREE.Clock();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function disposeScene() {
  if (!scene) return;
  scene.traverse((node) => {
    if (node.geometry) node.geometry.dispose();
    if (node.material?.map) node.material.map.dispose();
  });
  scene.clear();
  scene = null;
}

function buildScene(zoneName) {
  disposeScene();
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x241f38);
  scene.userData.zone = { colliders: [] };
  zone = zoneName === 'woods' ? buildWoods(scene) : buildSchool(scene);
  scene.background = new THREE.Color(zone.background);
  scene.fog = new THREE.Fog(zone.fog[0], zone.fog[1], zone.fog[2]);
  const hemi = new THREE.HemisphereLight(zone.hemi[0], zone.hemi[1], zone.hemi[2]);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(zone.sun.color, zone.sun.intensity);
  sun.position.set(...zone.sun.pos);
  scene.add(sun);

  // jogadora + coruja fiel + irmã/irmão acompanhante (spec §2/§16)
  const savedPosition = state.zone === zoneName && Array.isArray(state.position) ? state.position : null;
  playerObj = makeKid(state.character || 'ivy');
  blobShadow(playerObj);
  playerObj.position.set(savedPosition?.[0] ?? zone.spawn[0], 0, savedPosition?.[1] ?? zone.spawn[1]);
  scene.add(playerObj);

  const owlVariant = state.character === 'oakley' ? 1 : 0;
  owlObj = makeOwl(owlVariant);
  scene.add(owlObj);

  const otherCharacter = state.character === 'ivy' ? 'oakley' : 'ivy';
  companionObj = makeKid(otherCharacter);
  blobShadow(companionObj);
  companionObj.position.set(playerObj.position.x - 0.9, 0, playerObj.position.z + 0.4);
  scene.add(companionObj);
  companionOwl = makeOwl(otherCharacter === 'oakley' ? 1 : 0);
  companionObj.add(companionOwl);
  companionOwl.position.set(0.24, 1.62, -0.08);

  // NPCs (só na escola neste slice)
  for (const id of Object.keys(NPCS)) {
    const spot = zone.npcSpots?.[id];
    if (!spot) continue;
    const adult = makeAdult(NPCS[id].color);
    blobShadow(adult, 0.5);
    adult.position.set(spot[0], 0, spot[1]);
    adult.rotation.y = id === 'finch' ? Math.PI / 2 : 0.95;
    scene.add(adult);
    npcs[id] = adult;
  }

  // anel de destaque da interação mais próxima
  ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.66, 0.055, 8, 32),
    new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.9 })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.visible = false;
  scene.add(ring);

  camera.position.set(playerObj.position.x, 7.5, playerObj.position.z + 8.5);
  camera.lookAt(playerObj.position.x, 0.6, playerObj.position.z);

  // restaura na mata o que a história já abriu (riacho atravessado, portão aberto)
  if (zoneName === 'woods') {
    if (state.flags.stonesCrossed) {
      const streamIndex = zone.colliders.indexOf(zone.streamCollider);
      if (streamIndex >= 0) zone.colliders.splice(streamIndex, 1);
    }
    if (state.flags.gateOpen && zone.gateCollider) {
      const gateIndex = zone.colliders.indexOf(zone.gateCollider);
      if (gateIndex >= 0) zone.colliders.splice(gateIndex, 1);
      const [leftDoor, rightDoor] = zone.gateDoors;
      leftDoor.rotation.y = -1.9; leftDoor.position.x = -1.69;
      rightDoor.rotation.y = 1.9; rightDoor.position.x = 1.69;
    }
  }
}

// ── entrada: teclado + joystick de toque ─────────────────────────────────────
const keys = new Set();
window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') advanceDialog?.();
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault();
  keys.add(event.key.toLowerCase());
  if (event.key.toLowerCase() === 'e') tryInteract();
});
window.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));

const joystick = { active: false, x: 0, y: 0, id: null };
const joyBase = $('joy'), joyKnob = $('joyKnob');
function setKnob(dx, dy) {
  joyKnob.style.transform = `translate(${dx}px, ${dy}px)`;
}
joyBase.addEventListener('pointerdown', (event) => {
  joystick.active = true;
  joystick.id = event.pointerId;
  joyBase.setPointerCapture(event.pointerId);
});
joyBase.addEventListener('pointermove', (event) => {
  if (!joystick.active || event.pointerId !== joystick.id) return;
  const rect = joyBase.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  let dx = event.clientX - cx;
  let dy = event.clientY - cy;
  const max = rect.width / 2;
  const len = Math.hypot(dx, dy);
  if (len > max) { dx = (dx / len) * max; dy = (dy / len) * max; }
  setKnob(dx, dy);
  joystick.x = dx / max;
  joystick.y = dy / max;
});
function releaseJoystick(event) {
  if (event.pointerId !== joystick.id) return;
  joystick.active = false;
  joystick.x = 0; joystick.y = 0;
  setKnob(0, 0);
}
joyBase.addEventListener('pointerup', releaseJoystick);
joyBase.addEventListener('pointercancel', releaseJoystick);

function inputVector() {
  let x = joystick.x;
  let y = joystick.y;
  if (keys.has('w') || keys.has('arrowup')) y -= 1;
  if (keys.has('s') || keys.has('arrowdown')) y += 1;
  if (keys.has('a') || keys.has('arrowleft')) x -= 1;
  if (keys.has('d') || keys.has('arrowright')) x += 1;
  const len = Math.hypot(x, y);
  if (len > 1) { x /= len; y /= len; }
  return [x, y];
}

// ── colisão simples (círculo vs AABBs, resolvida por eixo) ──────────────────
const PLAYER_RADIUS = 0.35;
function circleHits(x, z, box) {
  const nx = Math.max(box.minX, Math.min(x, box.maxX));
  const nz = Math.max(box.minZ, Math.min(z, box.maxZ));
  const dx = x - nx;
  const dz = z - nz;
  return dx * dx + dz * dz < PLAYER_RADIUS * PLAYER_RADIUS;
}
function moveWithCollision(fromX, fromZ, dx, dz) {
  // cancela o movimento do eixo que colide (desliza bem nos cantos)
  let x = fromX + dx;
  if (zone.colliders.some((box) => circleHits(x, fromZ, box))) x = fromX;
  let z = fromZ + dz;
  if (zone.colliders.some((box) => circleHits(x, z, box))) z = fromZ;
  x = Math.max(zone.bounds.minX, Math.min(x, zone.bounds.maxX));
  z = Math.max(zone.bounds.minZ, Math.min(z, zone.bounds.maxZ));
  return [x, z];
}

// ── diálogo (linhas, glosas ✨ e desafios de escolha) ────────────────────────
let advanceDialog = null;
const dialog = $('dialog'), dialogName = $('dialogName'), dialogText = $('dialogText'),
  dialogVoice = $('dialogVoice'), dialogButtons = $('dialogButtons');

function openDialog() {
  if (!dialog.classList.contains('hidden')) return;
  dialog.classList.remove('hidden');
  overlayCount += 1;
  hidePrompt();
}
function closeDialog() {
  if (dialog.classList.contains('hidden')) return;
  dialog.classList.add('hidden');
  overlayCount = Math.max(0, overlayCount - 1);
}

// ✕ aborta a conversa no meio (ninguém fica preso num desafio, spec §43)
let currentAbort = null;
let dialogAborted = false;
$('dialogClose').addEventListener('click', () => {
  if (dialog.classList.contains('hidden')) return;
  sounds.tap();
  dialogAborted = true;
  const abort = currentAbort;
  closeDialog();
  abort?.();
});

function speakEnglish(text) {
  if (!state.sound || !text || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-GB';
  utter.rate = 0.92;
  const voices = synth.getVoices();
  const voice = voices.find((v) => v.lang.replace('_', '-') === 'en-GB') || voices.find((v) => v.lang.startsWith('en'));
  if (voice) utter.voice = voice;
  synth.speak(utter);
}

function speakerLabel(who) {
  if (who === 'owl') return `🦉 ${CHARACTERS.find((c) => c.id === (state.character || 'ivy'))?.owl || 'Pip'}`;
  return `${NPCS[who]?.emoji || ''} ${lang(NPCS[who]?.name, language)}`;
}

function sayLine(who, text) {
  return new Promise((resolve) => {
    currentAbort = resolve;
    dialogName.textContent = speakerLabel(who);
    dialogText.textContent = lang(text, language);
    dialogVoice.classList.remove('hidden');
    dialogVoice.onclick = () => speakEnglish(text.en);
    dialogButtons.replaceChildren();
    const button = el('button', 'rpg-button primary', uiText(language, 'continueLabel'));
    button.type = 'button';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      sounds.tap();
      resolve();
    });
    dialogButtons.appendChild(button);
    advanceDialog = () => button.click();
  });
}

function showGloss(word) {
  const gloss = GLOSSES[word];
  if (gloss) toast(root, `✨ ${lang(gloss, language)}`, { duration: 3400 });
}

function askChoice(node) {
  return new Promise((resolve) => {
    currentAbort = () => resolve(false);
    dialogName.textContent = `🎯 ${lang(node.prompt, language)}`;
    dialogText.textContent = '';
    dialogVoice.classList.add('hidden');
    dialogVoice.onclick = () => speakEnglish(node.prompt.en);
    function renderOptions() {
      dialogButtons.replaceChildren();
      for (const option of node.options) {
        const button = el('button', 'rpg-choice', lang(option.label, language));
        button.type = 'button';
        button.addEventListener('click', async () => {
          if (option.correct) {
            sounds.correct();
            await sayLine('owl', node.success);
            resolve(true);
          } else {
            sounds.wrong();
            dialogText.textContent = lang(node.fail, language);
            renderOptions();
          }
        });
        dialogButtons.appendChild(button);
      }
    }
    renderOptions();
    advanceDialog = null;
  });
}

async function runConversation(nodes) {
  dialogAborted = false;
  openDialog();
  for (const node of nodes) {
    if (node.choice) {
      const solved = await askChoice(node.choice);
      if (solved) markChallenge(node.choice.challengeId);
    } else if (node.gloss) {
      showGloss(node.gloss);
    } else {
      await sayLine(node.who, node.text);
    }
    if (dialogAborted) break;
  }
  closeDialog();
  advanceDialog = null;
  currentAbort = null;
}

function markChallenge(id) {
  if (!id || state.challenges[id]) return;
  state.challenges[id] = true;
  saveState(localStorage, player, state);
}

// ── HUD ──────────────────────────────────────────────────────────────────────
function updateHUD() {
  const objective = currentObjective(state);
  $('questChip').textContent = `📜 ${uiText(language, OBJECTIVE_KEYS[objective.id], { count: objective.progress ?? 0 })}`;
  $('soundButton').textContent = state.sound ? '🔊' : '🔇';
}

function toggleJournal() {
  const panel = $('journal');
  if (panel.classList.contains('hidden')) {
    const list = $('journalPieces');
    list.replaceChildren();
    for (const piece of MAP_PIECES) {
      const owned = state.mapPieces.includes(piece);
      list.appendChild(el('li', undefined, `${owned ? '✅' : '⬜'} ${lang(PIECE_NAMES[piece], language)}`));
    }
    $('journalObjective').textContent = $('questChip').textContent;
    panel.classList.remove('hidden');
  } else {
    panel.classList.add('hidden');
  }
}
$('questChip').addEventListener('click', toggleJournal);
$('journalClose').addEventListener('click', toggleJournal);

$('homeButton').addEventListener('click', () => { location.href = '../index.html'; });
$('soundButton').addEventListener('click', () => {
  state.sound = !state.sound;
  setMuted(!state.sound);
  saveState(localStorage, player, state);
  updateHUD();
  sounds.tap();
});
$('hintButton').addEventListener('click', () => {
  sounds.hoot();
  toast(root, uiText(language, hintKey(state)), { duration: 4600 });
});

// ── interações ───────────────────────────────────────────────────────────────
const promptButton = $('prompt');
let nearestInteractable = null;

function hidePrompt() {
  promptButton.classList.add('hidden');
}
function showPrompt(label) {
  promptButton.textContent = label;
  promptButton.classList.remove('hidden');
}
promptButton.addEventListener('click', () => tryInteract());

function tryInteract() {
  if (nearestInteractable && overlayCount === 0) interact(nearestInteractable.id);
}

async function collectPiece(id) {
  if (state.mapPieces.includes(id)) {
    toast(root, uiText(language, 'toastAlready'));
    return;
  }
  state.mapPieces.push(id);
  saveState(localStorage, player, state);
  sounds.pickup();
  confetti(root, 40);
  toast(root, uiText(language, 'toastPiece', { count: pieceCount(state) }));
  if (canAssembleMap(state)) setTimeout(() => { sounds.magic(); toast(root, `🌳 ${uiText(language, 'objAssemble')}`, { duration: 3600 }); }, 500);
  updateHUD();
}

async function addClue(id) {
  if (state.clues.includes(id)) {
    toast(root, uiText(language, 'toastAlready'));
    return;
  }
  state.clues.push(id);
  saveState(localStorage, player, state);
  sounds.pickup();
  toast(root, uiText(language, 'toastClue'));
  await runConversation([{ who: 'owl', text: CLUES[id] }]);
}

async function gotoZone(zoneName) {
  overlayCount += 1;
  hidePrompt();
  const veil = fade(root);
  await veil.cover();
  sounds.door();
  buildScene(zoneName);
  state.zone = zoneName;
  state.position = null;
  saveState(localStorage, player, state);
  veil.remove();
  updateHUD();
  overlayCount -= 1;
}

async function openGate() {
  state.flags.gateOpen = true;
  saveState(localStorage, player, state);
  const index = zone.colliders.indexOf(zone.gateCollider);
  if (index >= 0) zone.colliders.splice(index, 1);
  sounds.door();
  sounds.magic();
  const [leftDoor, rightDoor] = zone.gateDoors;
  const start = performance.now();
  function swing(now) {
    const t = Math.min(1, (now - start) / 900);
    leftDoor.rotation.y = -t * 1.9;
    rightDoor.rotation.y = t * 1.9;
    leftDoor.position.x = -0.79 - t * 0.9;
    rightDoor.position.x = 0.79 + t * 0.9;
    if (t < 1) requestAnimationFrame(swing);
  }
  requestAnimationFrame(swing);
  updateHUD();
}

function showEnding() {
  if (ended) return;
  ended = true;
  overlayCount += 1;
  hidePrompt();
  sounds.fanfare();
  const overlay = el('div', 'rpg-ending');
  overlay.append(
    el('div', 'rpg-ending-castle', '🏰'),
    el('h2', 'rpg-ending-title', uiText(language, 'theEnd')),
    el('p', 'rpg-ending-text', uiText(language, 'endCard')),
    el('div', 'rpg-ending-badge', uiText(language, 'badgeEarned'))
  );
  const button = el('button', 'rpg-button primary', uiText(language, 'playAgain'));
  button.type = 'button';
  button.addEventListener('click', () => { location.href = '../index.html'; });
  overlay.appendChild(button);
  root.appendChild(overlay);
  confetti(root, 120, 2400);
}

async function interact(id) {
  if (id === 'finch' || id === 'page') {
    const solvedKey = id === 'finch' ? 'vocabFinch' : 'compPage';
    const firstTime = !state.challenges[solvedKey];
    await runConversation(firstTime ? CONVERSATIONS[id] : CONVERSATIONS[`${id}After`]);
    if (firstTime) {
      const piece = id === 'finch' ? 'finch' : 'page';
      state.flags[`${id}Met`] = true;
      await collectPiece(piece);
      saveState(localStorage, player, state);
      updateHUD();
    }
    return;
  }
  if (id === 'board') return void runConversation([{ who: 'owl', text: FLAVOR.board }]);
  if (id === 'signTree') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.signTree }]); }
  if (id === 'marker') return void runConversation([{ who: 'owl', text: FLAVOR.marker }]);
  if (id === 'pieceShelf') return void collectPiece('shelf');
  if (id === 'pieceTrolley') return void collectPiece('trolley');
  if (id === 'clueTable') return void addClue('libraryTable');
  if (id === 'clueOak') return void addClue('oak');
  if (id === 'ivyDoor') {
    if (!canAssembleMap(state)) {
      sounds.hoot();
      return void runConversation([{ who: 'owl', text: { pt: `Ainda faltam partes do mapa! Temos ${pieceCount(state)} de 4.`, en: `We still need map pieces! We have ${pieceCount(state)} of 4.`, es: `¡Todavía faltan partes del mapa! Tenemos ${pieceCount(state)} de 4.` } }]);
    }
    if (!state.flags.mapAssembled) {
      await runConversation(CONVERSATIONS.assemble);
      if (state.challenges.fractionMap) {
        state.flags.mapAssembled = true;
        saveState(localStorage, player, state);
        sounds.magic();
        confetti(root, 80);
        await gotoZone('woods');
      }
      return;
    }
    return void gotoZone('woods');
  }
  if (id.startsWith('stone')) {
    const number = Number(id.replace('stone', ''));
    const stone = zone.stones.find((s) => s.number === number);
    if (state.flags.stonesCrossed) return;
    if (checkStone(number)) {
      sounds.magic();
      state.flags.stonesCrossed = true;
      saveState(localStorage, player, state);
      const colliderIndex = zone.colliders.indexOf(zone.streamCollider);
      if (colliderIndex >= 0) zone.colliders.splice(colliderIndex, 1);
      // pulinho até a outra margem
      const veil = fade(root);
      await veil.cover();
      playerObj.position.z = -2.6;
      companionObj.position.z = -2.0;
      state.position = [playerObj.position.x, playerObj.position.z];
      veil.remove();
      updateHUD();
      toast(root, `✨ ${lang({ pt: 'Pedra certa! Atravessaram o riacho.', en: 'Right stone! You crossed the stream.', es: '¡Piedra correcta! Cruzaron el arroyo.' }, language)}`);
    } else {
      sounds.wrong();
      const start = performance.now();
      const baseX = stone.mesh.rotation.x;
      function wobble(now) {
        const t = (now - start) / 600;
        stone.mesh.rotation.x = baseX + Math.sin(t * 14) * 0.12 * Math.max(0, 1 - t);
        if (t < 1) requestAnimationFrame(wobble); else stone.mesh.rotation.x = baseX;
      }
      requestAnimationFrame(wobble);
      toast(root, uiText(language, 'hintCross'), { duration: 3200 });
    }
    return;
  }
  if (id === 'gate') {
    if (!state.flags.gateOpen) await openGate();
    return;
  }
}

// ── seleção de personagem (spec §2: um irmão controla, o outro acompanha) ────
function chooseCharacter() {
  return new Promise((resolve) => {
    const overlay = el('div', 'rpg-select');
    overlay.appendChild(el('h2', 'rpg-select-title', uiText(language, 'chooseCharacter')));
    const row = el('div', 'rpg-select-row');
    overlay.appendChild(row);
    for (const character of CHARACTERS) {
      const card = el('button', 'rpg-select-card');
      card.type = 'button';
      card.append(
        el('div', 'rpg-select-emoji', character.emoji),
        el('div', 'rpg-select-name', character.id === 'ivy' ? 'Ivy' : 'Oakley'),
        el('p', 'rpg-select-desc', uiText(language, character.id === 'ivy' ? 'characterIvy' : 'characterOakley'))
      );
      card.addEventListener('click', () => {
        sounds.tap();
        overlay.remove();
        overlayCount -= 1;
        resolve(character.id);
      });
      row.appendChild(card);
    }
    root.appendChild(overlay);
    overlayCount += 1;
  });
}

// ── loop principal ───────────────────────────────────────────────────────────
const cameraOffset = new THREE.Vector3(0, 8.6, 7.2);
const lookTarget = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;

  const [inputX, inputY] = overlayCount > 0 ? [0, 0] : inputVector();
  const speed = 3.8;
  const dx = inputX * speed * dt;
  const dz = inputY * speed * dt;
  const moving = Math.abs(inputX) + Math.abs(inputY) > 0.05;

  if (playerObj) {
    const [nx, nz] = moveWithCollision(playerObj.position.x, playerObj.position.z, dx, dz);
    const walked = Math.hypot(nx - playerObj.position.x, nz - playerObj.position.z);
    playerObj.position.set(nx, 0, nz);
    if (moving && walked > 0.0005) {
      const targetAngle = Math.atan2(inputX, inputY);
      let delta = targetAngle - playerObj.rotation.y;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      playerObj.rotation.y += delta * Math.min(1, dt * 12);
    }
    playerObj.userData.animate?.(t, moving ? 1 : 0);

    // coruja fiel orbita a cabeça da jogadora
    const owlAngle = t * 1.5;
    owlObj.position.set(
      playerObj.position.x + Math.cos(owlAngle) * 0.85,
      1.85 + Math.sin(t * 2.2) * 0.1,
      playerObj.position.z + Math.sin(owlAngle) * 0.85
    );
    owlObj.rotation.y = -owlAngle + Math.PI / 2;
    owlObj.userData.animate?.(t, moving);

    // irmã/irmão acompanha por perto (spec §2)
    const distanceToPlayer = companionObj.position.distanceTo(playerObj.position);
    if (distanceToPlayer > 1.05) {
      const direction = playerObj.position.clone().sub(companionObj.position).normalize();
      const step = Math.min(distanceToPlayer - 0.95, 4.6 * dt);
      companionObj.position.addScaledVector(direction, step);
      companionObj.rotation.y = Math.atan2(direction.x, direction.z);
      companionObj.userData.animate?.(t, 1);
    } else {
      companionObj.userData.animate?.(t, 0);
    }
    companionOwl.userData.animate?.(t, distanceToPlayer > 2);

    camera.position.lerp(new THREE.Vector3().copy(playerObj.position).add(cameraOffset), 1 - Math.exp(-dt * 5));
    lookTarget.set(playerObj.position.x, 0.6, playerObj.position.z);
    camera.lookAt(lookTarget);
  }

  // interação mais próxima → botão + anel brilhante
  nearestInteractable = null;
  if (overlayCount === 0 && playerObj) {
    let best = Infinity;
    for (const candidate of zone.interactables) {
      if (candidate.id.startsWith('stone') && state.flags.stonesCrossed) continue;
      const dist = Math.hypot(candidate.x - playerObj.position.x, candidate.z - playerObj.position.z);
      if (dist <= candidate.radius && dist < best) {
        best = dist;
        nearestInteractable = candidate;
      }
    }
  }
  if (nearestInteractable) {
    const labels = { ...PROMPTS };
    let label = labels[nearestInteractable.id];
    if (nearestInteractable.id.startsWith('stone')) {
      const number = Number(nearestInteractable.id.replace('stone', ''));
      label = { pt: `🪨 Pisar na pedra ${number}`, en: `🪨 Step on stone ${number}`, es: `🪨 Pisar la piedra ${number}` };
    }
    showPrompt(lang(label, language));
    ring.visible = true;
    ring.position.set(nearestInteractable.x, 0.06, nearestInteractable.z);
    ring.scale.setScalar(1 + 0.08 * Math.sin(t * 4));
  } else {
    hidePrompt();
    ring.visible = false;
  }

  zone?.update?.(dt, t);

  // final: atravessar o portão aberto (spec fase 4 gancho)
  if (zone?.name === 'woods' && state.flags.gateOpen && !ended && playerObj.position.z < -16.6) {
    showEnding();
  }

  renderer.render(scene, camera);
}

// ── boot ─────────────────────────────────────────────────────────────────────
async function boot() {
  try {
    initThree();
  } catch (error) {
    $('fatal').textContent = uiText(language, 'webglFail');
    $('fatal').classList.add('show');
    return;
  }
  setMuted(!state.sound);
  ensureAudio();
  window.addEventListener('pointerdown', () => ensureAudio(), { once: true });
  updateHUD();

  if (!state.character) state.character = await chooseCharacter();
  saveState(localStorage, player, state);

  buildScene(state.zone);
  animate();

  if (!state.flags.introSeen && !warp) {
    await new Promise((resolve) => {
      storybook(root, STORY_PANELS.map((panel) => ({ ...panel, text: lang(panel.text, language) })), {
        next: uiText(language, 'next'),
        skip: uiText(language, 'skip'),
        done: uiText(language, 'start'),
        onDone: resolve,
      });
    });
    state.flags.introSeen = true;
    saveState(localStorage, player, state);
  }

  // autosave leve da posição
  if (!warp) {
    window.setInterval(() => {
      if (playerObj && overlayCount === 0) {
        state.position = [playerObj.position.x, playerObj.position.z];
        saveState(localStorage, player, state);
      }
    }, 4000);
  }
  window.addEventListener('beforeunload', () => {
    if (playerObj && !warp) {
      state.position = [playerObj.position.x, playerObj.position.z];
      saveState(localStorage, player, state);
    }
  });
}

// handle mínimo de QA/playtest (não é usado pela jogadora)
window.__rpgWelling = {
  position: () => (playerObj ? [playerObj.position.x, playerObj.position.z] : null),
  setPos: (x, z) => { if (playerObj) playerObj.position.set(x, 0, z); },
  state: () => state,
  interact: (id) => interact(id),
};

boot();
