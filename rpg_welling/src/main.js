// RPG Welling — motor do jogo: cena 3D, controles, diálogos e missões.
// Slice vertical do spec §38: escola → biblioteca → pista → trilha na mata.

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { uiText, lang } from './i18n.js';
import { ensureAudio, setMuted, setZoneAmbience, footstep, sounds } from './audio.js';
import { loadState, saveState, bumpGeneration, recordHistory, historyWeek, studyStreak, dayKey, CHARACTERS, MAP_PIECES } from './state.js';
import { currentObjective, hintKey, checkStone, canAssembleMap, pieceCount, medalTier, MEDAL_EMOJI, secondaryObjectives } from './quest.js';
import { buildSchool, buildWoods, buildHighStreet, buildAcademy, buildClassroom, makeKid, makeOwl, makeAdult, blobShadow, preloadModels, onModelProgress } from './world.js';
import { NPCS, CONVERSATIONS, STORY_PANELS, FLAVOR, CLUES, GLOSSES, PIECE_NAMES, UMBRELLA_ASK, UMBRELLA_FOUND, UMBRELLA_DONE } from './content.js';
import { registerWord, dueWords, answerCorrect, answerWrong, buildQuiz, practiceOrder } from './vocab.js';
import { el, toast, confetti, storybook, fade } from './ui.js';

// ── parâmetros da lançadora ───────────────────────────────────────────────────
const params = new URLSearchParams(location.search);
const player = (params.get('name') || 'Exploradora').trim().slice(0, 32);
// QA: ?zone=woods pula direto para a mata sem poluir o save real
const warp = ['woods', 'school', 'highstreet', 'academy', 'classroom'].includes(params.get('zone')) ? params.get('zone') : null;

let state = loadState(localStorage, player);
// idioma: escolha no HUD (persistida por jogadora) > param do launcher > pt
const paramLanguage = ['pt', 'en', 'es'].includes(params.get('language')) ? params.get('language') : null;
const language = ['pt', 'en', 'es'].includes(state.language) ? state.language : (paramLanguage || 'pt');
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
  chest: { pt: '🎁 Abrir o baú', en: '🎁 Open the chest', es: '🎁 Abrir el cofre' },
  blackboard: { pt: '🧮 Aula na lousa', en: '🧮 Blackboard lesson', es: '🧮 Lección en la pizarra' },
  willow: { pt: '🗣️ Falar com a Prof. Willow', en: '🗣️ Talk to Prof. Willow', es: '🗣️ Hablar con la Prof. Willow' },
  orderStart: { pt: '🍵 Falar com a Sra. Page (encomenda)', en: '🍵 Talk to Ms Page (errand)', es: '🍵 Hablar con la Sra. Page (encargo)' },
  orderMint: { pt: '🌿 Colher menta fresca', en: '🌿 Pick fresh mint', es: '🌿 Recoger menta fresca' },
  orderBun: { pt: '🥐 Pegar o pão de canela', en: '🥐 Get the cinnamon bun', es: '🥐 Tomar el pan de canela' },
  orderFeather: { pt: '🪶 Pegar a pena azul', en: '🪶 Get the blue feather', es: '🪶 Tomar la pluma azul' },
  bookshop: { pt: '📚 Olhar a vitrine da bookshop', en: '📚 Look at the bookshop window', es: '📚 Mirar el escaparate' },
  postOffice: { pt: '✉️ Ver o correio', en: '✉️ Check the post box', es: '✉️ Mirar el buzón' },
  teaRoom: { pt: '🍵 Ouvir o tea room', en: '🍵 Listen at the tea room', es: '🍵 Escuchar la sala de té' },
  clueBench: { pt: '🔍 Olhar o cartaz no banco', en: '🔍 Look at the poster on the bench', es: '🔍 Mirar el cartel del banco' },
  clueChalk: { pt: '🔍 Olhar a janela', en: '🔍 Look at the window', es: '🔍 Mirar la ventana' },
  clueScroll: { pt: '🔍 Ler o pergaminho', en: '🔍 Read the scroll', es: '🔍 Leer el pergamino' },
  baker: { pt: '🗣️ Falar com o padeiro', en: '🗣️ Talk to the baker', es: '🗣️ Hablar con el panadero' },
  playground: { pt: '🛝 Olhar o parquinho', en: '🛝 Look at the playground', es: '🛝 Mirar el parque infantil' },
  umbrellaSpot: { pt: '☂️ Pegar o guarda-chuva roxo', en: '☂️ Pick up the purple umbrella', es: '☂️ Recoger el paraguas morado' },
  garden: { pt: '🥕 Visitar a horta', en: '🥕 Visit the garden', es: '🥕 Visitar la huerto' },
  sports: { pt: '⚽ Jogar no campo de Welling FC', en: '⚽ Play on the Welling FC pitch', es: '⚽ Jugar en la cancha de Welling FC' },
  clueTimetable: { pt: '🔍 Ler o tabela de jogos', en: '🔍 Read the games timetable', es: '🔍 Leer la tabla de juegos' },
  field: { pt: '⚽ Olhar o campo grande', en: '⚽ Look at the big field', es: '⚽ Mirar el campo grande' },
  woodCafe: { pt: '☕ Café no alto da colina', en: '☕ Café on top of the hill', es: '☕ Café en la colina' },
  severndroog: { pt: '🏰 Visitar o castelo de Severe', en: '🏰 Visit Severndroog Castle', es: '🏰 Visitar el castillo de Severe' },
  pond: { pt: '🦆 Ver o lago e os patinhos', en: '🦆 See the pond and the ducks', es: '🦆 Ver el estanque y los patos' },
  greenChain: { pt: '🛤️ Achar a trilha do Green Chain Walk', en: '🛤️ Find the Green Chain Walk', es: '🛤️ Encontrar el sendero Green Chain' },
  outdoorGym: { pt: '💪 Aquecer na academia ao ar livre', en: '💪 Warm up at the outdoor gym', es: '💪 Calentar en el gimnasio exterior' },
  raven: { pt: '⚔️ Desafiar a Prof. Raven', en: '⚔️ Challenge Prof. Raven', es: '⚔️ Desafiar a la Prof. Raven' },
  duel: { pt: '⚔️ Entrar no duelo de feitiços', en: '⚔️ Enter the spell duel', es: '⚔️ Entrar al duelo de hechizos' },
};

const OBJECTIVE_KEYS = {
  talk: 'objTalk', find: 'objFind', assemble: 'objAssemble', toWoods: 'objToWoods',
  cross: 'objCross', gate: 'objGate', done: 'objDone',
};

// nomes das zonas exibidos ao entrar (toast flutuante)
const ZONE_NAMES = {
  school: { pt: '🏫 Escola Welling', en: '🏫 Welling School', es: '🏫 Escuela Welling' },
  woods: { pt: '🌳 Oxleas Woods', en: '🌳 Oxleas Woods', es: '🌳 Bosque de Oxleas' },
  highstreet: { pt: '🏪 High Street', en: '🏪 High Street', es: '🏪 High Street' },
  academy: { pt: '🏰 Academia Owlburt', en: '🏰 Owlburt Academy', es: '🏰 Academia Owlburt' },
  classroom: { pt: '🪑 Sala de Aula', en: '🪑 Classroom', es: '🪑 Salón de Clases' },
};

// ── three.js: base ────────────────────────────────────────────────────────────
let renderer, scene, camera, clock, composer;
let zone = null;
let playerObj = null, owlObj = null, companionObj = null, companionOwl = null;
const npcs = {};
let ring = null;
let clickMarker = null; // anel verde do destino do toque (click-to-move)
let overlayCount = 0; // >0 = menus/diálogos abertos, movimento travado
let ended = false;
let restarting = false; // confirmRestart: bloqueia autosave/beforeunload até o reload
let stepTimer = 0; // cadência dos passos sincronizada com o walk cycle
let exitAllowedAt = 0; // instante (performance.now) em que as saídas voltam a valer — relógio
// real de verdade: com dt clampado a 0.05, tablet/fps baixo esticava cooldown de 2.5s
// para vários segundos reais (reproduzido a 5fps no headless: 17s)
let exitHintAt = 0; // anti-spam do aviso de saída bloqueada (independe do teleport)
// saídas disparam só na ENTRADA no raio (`key` = target:x:z). Sem isso, chegar
// numa zona cujo spawn cai dentro do raio da saída de volta teleportava a
// criança sozinha depois do cooldown (school→highstreet→school, woods→...).
let exitInside = new Set();

// Marca como "já dentro" as saídas que contêm o ponto de chegada. Sem isso a
// primeira checagem dispararia a saída que trouxe a jogadora (o bounce
// escola→rua→escola), porque buildScene roda antes do spawnOverride.
function armExitsAt(x, z) {
  exitInside = new Set();
  for (const exit of zone?.exits || []) {
    if (Math.hypot(exit.x - x, exit.z - z) <= exit.radius) exitInside.add(`${exit.target}:${exit.x}:${exit.z}`);
  }
}
window.__BUNDLE_V = 'n'; // marcador de versão pra debug de cache

function initThree() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  root.prepend(renderer.domElement);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
  clock = new THREE.Clock();
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
  });
  setupCameraControls(renderer.domElement);
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
  zone = zoneName === 'woods'
    ? buildWoods(scene)
    : zoneName === 'highstreet' ? buildHighStreet(scene)
    : zoneName === 'academy' ? buildAcademy(scene)
    : zoneName === 'classroom' ? buildClassroom(scene)
    : buildSchool(scene);
  if (ZONE_NAMES[zoneName]) {
    setTimeout(() => toast(root, lang(ZONE_NAMES[zoneName], language), { duration: 2600 }), 600);
  }
  scene.background = new THREE.Color(zone.background);
  scene.fog = new THREE.Fog(zone.fog[0], zone.fog[1], zone.fog[2]);
  setZoneAmbience(zoneName);

  // composer de pós-processamento (bloom + SMAA): só cria uma vez, atualiza
  // a cena renderizada após rebuilds (a cena nova sobrescreve o scene do RenderPass).
  if (!composer) {
    composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.4, 0.55, 0.86);
    composer.addPass(bloom);
    const smaa = new SMAAPass(window.innerWidth * Math.min(window.devicePixelRatio || 1, 2), window.innerHeight * Math.min(window.devicePixelRatio || 1, 2));
    composer.addPass(smaa);
    composer.addPass(new OutputPass());
  }
  const renderPass = composer.passes[0];
  renderPass.scene = scene;
  renderPass.camera = camera;

  const hemi = new THREE.HemisphereLight(zone.hemi[0], zone.hemi[1], zone.hemi[2]);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(zone.sun.color, zone.sun.intensity);
  sun.position.set(...zone.sun.pos);
  sun.castShadow = true;
  // 1024 é o sweet spot: 2048 dobra o custo de sombra e derruba o FPS em
  // celular/headless sem ganho visível neste nível de detalhe.
  sun.shadow.mapSize.set(1024, 1024);
  // câmera de sombra acompanha o tamanho da zona: fases maiores continuam
  // having shadows, em vez de sombras cortadas no meio do pátio/campo
  const shadowSpan = Math.max(13, Math.min(30, (zone.bounds.maxX - zone.bounds.minX) / 2 + 4));
  sun.shadow.camera.left = -shadowSpan;
  sun.shadow.camera.right = shadowSpan;
  sun.shadow.camera.top = shadowSpan;
  sun.shadow.camera.bottom = -shadowSpan;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 120;
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  scene.add(sun.target);
  scene.userData.sun = sun;

  // jogadora + coruja fiel + irmã/irmão acompanhante (spec §2/§16)
  const savedPosition = state.zone === zoneName && Array.isArray(state.position) ? state.position : null;
  playerObj = makeKid(state.character || 'ivy');
  blobShadow(playerObj);
  playerObj.position.set(savedPosition?.[0] ?? zone.spawn[0], 0, savedPosition?.[1] ?? zone.spawn[1]);
  scene.add(playerObj);
  armExitsAt(playerObj.position.x, playerObj.position.z);

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

  // NPCs (por zona, via npcSpots) — limpa referências da zona anterior
  for (const id of Object.keys(npcs)) delete npcs[id];
  for (const id of Object.keys(NPCS)) {
    const spot = zone.npcSpots?.[id];
    if (!spot) continue;
    const adult = makeAdult(NPCS[id].color, id);
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

  // marcador do destino do toque (click-to-move)
  clickMarker = new THREE.Mesh(
    new THREE.RingGeometry(0.3, 0.45, 28),
    new THREE.MeshBasicMaterial({ color: 0x7ee8a2, transparent: true, opacity: 0.95 })
  );
  clickMarker.rotation.x = -Math.PI / 2;
  clickMarker.visible = false;
  scene.add(clickMarker);
  moveTarget = null; // troca de zona: destino antigo não faz sentido

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

// ── entrada: teclado (WASD/setas) — no toque, quem manda é o tap-to-move ────
const keys = new Set();
window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') advanceDialog?.();
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault();
  keys.add(event.key.toLowerCase());
  if (event.key.toLowerCase() === 'e') tryInteract();
});
window.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));

function inputVector() {
  let x = 0;
  let y = 0;
  if (keys.has('w') || keys.has('arrowup')) y -= 1;
  if (keys.has('s') || keys.has('arrowdown')) y += 1;
  if (keys.has('a') || keys.has('arrowleft')) x -= 1;
  if (keys.has('d') || keys.has('arrowright')) x += 1;
  const len = Math.hypot(x, y);
  if (len > 1) { x /= len; y /= len; }
  return [x, y];
}

// ── click-to-move: toque/clique curto no chão anda até o ponto ───────────────
// Arrastar continua girando a câmera; só o toque "parado" (até ~9px) move.
let moveTarget = null; // {x, z} destino do toque; null = parada
let targetStuck = 0; // segundos sem progresso a caminho do destino (parede)
const raycaster = new THREE.Raycaster();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const ndc = new THREE.Vector2();
const groundHit = new THREE.Vector3();
function tapToMove(clientX, clientY) {
  if (!playerObj || !camera || overlayCount > 0) return;
  ndc.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  if (!raycaster.ray.intersectPlane(groundPlane, groundHit)) return;
  const dx = groundHit.x - playerObj.position.x;
  const dz = groundHit.z - playerObj.position.z;
  const dist = Math.hypot(dx, dz);
  if (dist < 0.25) { moveTarget = null; return; } // toque nela mesma
  if (dist > 26) { // alcance limitado: o caminho é em linha reta
    groundHit.x = playerObj.position.x + (dx / dist) * 26;
    groundHit.z = playerObj.position.z + (dz / dist) * 26;
  }
  moveTarget = { x: groundHit.x, z: groundHit.z };
  targetStuck = 0;
}

// ── câmera orbital: arraste na tela gira, scroll/pinça dá zoom ───────────────
// Funciona igual em desktop e touch: Pointer Events unificam mouse e dedos,
// e a pinça mede distância 2D real entre os dois dedos (não só horizontal).
const camDrag = { yawId: null, lastX: 0, lastY: 0 };
const camPointers = new Map(); // pointerId → {x, y}
let pinchDist = 0;
function clampZoom(z) {
  return Math.max(CAM_ZOOM_MIN, Math.min(CAM_ZOOM_MAX, z));
}
window.addEventListener('wheel', (e) => {
  camZoom = clampZoom(camZoom * (1 + e.deltaY * 0.0009));
}, { passive: true });

function setupCameraControls(canvas) {
  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'grab';
  // right-click no desktop é arraste de câmera também, não menu de contexto
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  // iOS Safari: bloqueia o zoom de página por pinça por cima do jogo
  document.addEventListener('gesturestart', (e) => e.preventDefault());

  const setPointer = (e) => camPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  const pinchGap = () => {
    const [a, b] = [...camPointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const tap = { id: null, x: 0, y: 0, valid: false };
  canvas.addEventListener('pointerdown', (e) => {
    setPointer(e);
    canvas.style.cursor = 'grabbing';
    if (camPointers.size === 1) {
      camDrag.yawId = e.pointerId;
      camDrag.lastX = e.clientX;
      camDrag.lastY = e.clientY;
      // toque que não virar arraste = andar até o ponto (click-to-move)
      tap.id = e.pointerId;
      tap.x = e.clientX;
      tap.y = e.clientY;
      tap.valid = true;
    } else {
      tap.valid = false; // segundo dedo = pinça, não toque
      if (camPointers.size === 2) {
        pinchDist = pinchGap();
        camDrag.yawId = null; // dois dedos = pinch, não girar
      }
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!camPointers.has(e.pointerId)) return;
    setPointer(e);
    if (camPointers.size === 2) {
      const gap = pinchGap();
      if (pinchDist > 0) camZoom = clampZoom(camZoom * (gap / pinchDist));
      pinchDist = gap;
    } else if (e.pointerId === camDrag.yawId) {
      if (tap.valid && e.pointerId === tap.id
        && Math.hypot(e.clientX - tap.x, e.clientY - tap.y) > 9) tap.valid = false;
      camYaw -= (e.clientX - camDrag.lastX) * 0.006;
      camPitch = Math.max(CAM_PITCH_MIN, Math.min(CAM_PITCH_MAX, camPitch + (e.clientY - camDrag.lastY) * 0.004));
      camDrag.lastX = e.clientX;
      camDrag.lastY = e.clientY;
    }
  });
  const endPointer = (e) => {
    camPointers.delete(e.pointerId);
    if (tap.valid && e.pointerId === tap.id) {
      tap.valid = false;
      tapToMove(tap.x, tap.y);
    }
    if (camPointers.size === 0) canvas.style.cursor = 'grab';
    if (e.pointerId === camDrag.yawId) camDrag.yawId = null;
    if (camPointers.size < 2) pinchDist = 0;
    const remaining = [...camPointers.keys()];
    if (remaining.length === 1) {
      camDrag.yawId = remaining[0];
      const p = camPointers.get(remaining[0]);
      camDrag.lastX = p.x; camDrag.lastY = p.y;
    }
  };
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
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

// rastreio pro relatório dos pais: palavra nova, acerto e erro do dia
function registerWordTracked(word, gloss) {
  const isNew = !state.words[word];
  registerWord(state.words, word, gloss);
  if (isNew && state.words[word]) recordHistory(state, 'added');
}
function markRight(word) { answerCorrect(state.words, word); recordHistory(state, 'right'); }
function markWrong(word) { answerWrong(state.words, word); recordHistory(state, 'wrong'); }

function showGloss(word) {
  const gloss = GLOSSES[word];
  if (gloss) {
    toast(root, `✨ ${lang(gloss, language)}`, { duration: 3400 });
    registerWordTracked(word, gloss);
    saveState(localStorage, player, state);
    updateReviewBadge();
  }
}

// ── Diário de palavras + quiz de revisão (repetição espaçada) ──────────────────
function updateReviewBadge() {
  const badge = $('reviewBadge');
  if (!badge) return;
  const due = dueWords(state.words);
  badge.classList.toggle('hidden', due.length === 0);
  badge.textContent = String(due.length);
}

function renderWordsList() {
  const list = $('wordsList');
  if (!list) return;
  const entries = Object.entries(state.words).sort((a, b) => a[0].localeCompare(b[0]));
  if (entries.length === 0) {
    list.innerHTML = `<p class="rpg-words-empty">${uiText(language, 'wordsEmpty')}</p>`;
    return;
  }
  const now = Date.now();
  const due = w => w.due <= now
    ? `<span class="word-due">${uiText(language, 'wordsReviewMark')}</span>`
    : '<span class="word-ok">✓</span>';
  list.innerHTML = entries.map(([word, w]) => {
    return `<div class="word-row"><span class="word-en">${word}</span><span>${w.pt}</span><span class="word-stars">${'⭐'.repeat(Math.min(w.streak || 0, 5))}</span>${due(w)}</div>`;
  }).join('');
}

// ── sessões de quiz (revisão da coruja, duelo, lousa) ──────────────────────────
// overlayCount é incrementado por sessão e devolvido no fim OU no cancelamento
// (✕ / Depois / clique fora), com token pra invalidar callbacks pendentes — sem
// isso, fechar no meio da lousa/duelo travava o movimento pra sempre.
let quizSession = null;
let quizSessionCounter = 0;
let quizWord = ''; // palavra atual do quiz aberto — o 🔊 repete a fala (modo escuta)
function beginQuizSession(kind) {
  if (quizSession) return null;
  quizSession = { token: ++quizSessionCounter, kind };
  overlayCount += 1;
  return quizSession.token;
}
function liveToken(token) {
  return quizSession && quizSession.token === token ? token : null;
}
function endQuizSession(token) {
  if (!quizSession || quizSession.token !== token) return;
  quizSession = null;
  overlayCount = Math.max(0, overlayCount - 1);
  $('quizBackdrop').classList.add('hidden');
}
function abortQuizSession() {
  if (!quizSession) return;
  quizSession.token += 1000; // invalida callbacks agendados
  quizSession = null;
  overlayCount = Math.max(0, overlayCount - 1);
  $('quizBackdrop').classList.add('hidden');
}

function openQuiz() {
  const due = dueWords(state.words);
  if (due.length === 0 || quizSession) return;
  const token = beginQuizSession('review');
  if (token === null) return;
  // prática na ordem das fracas: vencidas mais atrasadas primeiro, depois streak baixo
  const dueSet = new Set(dueWords(state.words).map(([w]) => w));
  const queue = practiceOrder(state.words).filter((w) => dueSet.has(w));

  const nextQuestion = () => {
    if (liveToken(token) === null) return; // sessão cancelada
    if (queue.length === 0) {
      endQuizSession(token);
      updateReviewBadge();
      return;
    }
    const quiz = buildQuiz(state.words, queue.shift(), language);
    if (!quiz) return nextQuestion();
    // modo escuta: o prompt esconde a palavra e a coruja fala — traduzir pelo ouvido
    quizWord = quiz.word;
    $('quizPrompt').textContent = uiText(language, 'quizListen');
    speakEnglish(quiz.word);
    const optionsEl = $('quizOptions');
    optionsEl.innerHTML = '';
    $('quizFeedback').textContent = '';
    for (const option of quiz.options) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = option.text;
      btn.addEventListener('click', () => {
        if (liveToken(token) === null) return;
        if (option.correct) {
          markRight(quiz.word);
          btn.classList.add('correct');
          $('quizFeedback').textContent = uiText(language, 'reviewRight');
          sounds.star();
        } else {
          markWrong(quiz.word);
          btn.classList.add('wrong');
          $('quizFeedback').textContent = uiText(language, 'reviewWrong', { word: quiz.word });
          sounds.wrong();
        }
        saveState(localStorage, player, state);
        updateReviewBadge();
        setTimeout(nextQuestion, 1100);
      });
      optionsEl.appendChild(btn);
    }
    $('quizBackdrop').classList.remove('hidden');
  };
  nextQuestion();
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
  const langButton = $('langButton');
  if (langButton) langButton.textContent = `🌐 ${language.toUpperCase()}`;
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
    // segundas quests ativas (encomenda / duelo / baú de hoje)
    const seconds = secondaryObjectives(state, {
      wordCount: Object.keys(state.words).length,
      today: dayKey(new Date()),
    });
    const secList = $('journalSecondary');
    secList.replaceChildren();
    for (const sec of seconds) {
      secList.appendChild(el('li', undefined, `▫️ ${uiText(language, sec.key, { n: sec.progress, total: sec.total })}`));
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

// reiniciar (apaga o save desta jogadora e volta à escolha de personagem)
function openRestart() {
  const overlay = $('restartBackdrop');
  overlay.classList.remove('hidden');
  const focusable = $('restartCancel');
  setTimeout(() => focusable.focus(), 0);
}
function closeRestart() { $('restartBackdrop').classList.add('hidden'); }
function confirmRestart() {
  // Abas antigas abertas podem ressuscitar o save apagado via autosave
  // (visto acontecer). Incrementar a geração do slot faz as abas velhas
  // escreverem no slot anterior — a nova leitura já nasce vazia.
  restarting = true;
  try {
    bumpGeneration();
  } catch {}
  location.reload();
}
// ── Créditos (atribuições CC-BY dos modelos 3D) ────────────────────────────────
function openCredits() {
  $('creditsBackdrop').classList.remove('hidden');
}
function closeCredits() {
  $('creditsBackdrop').classList.add('hidden');
}
function openWords() {
  renderWordsList();
  $('wordsBackdrop').classList.remove('hidden');
}
// Delegação de eventos: os botões dos modais podem ter seus nós substituídos
// no DOM (observado com o modal de restart pós-fim de aventura), e listeners
// ligados direto no elemento viram órfãs — o clique não faz nada. Delegando
// no document, o handler sobrevive a qualquer mutação.
document.addEventListener('click', (e) => {
  const id = e.target.closest?.('button')?.id;
  if (id === 'restartConfirm') confirmRestart();
  else if (id === 'restartCancel' || id === 'restartBackdrop' && e.target === e.currentTarget) closeRestart();
  else if (id === 'restartButton') openRestart();
  else if (id === 'creditsClose' || id === 'creditsOk') closeCredits();
  else if (id === 'creditsButton') openCredits();
  else if (id === 'wordsButton') openWords();
  else if (id === 'wordsClose' || id === 'wordsClose2') closeWords();
  else if (id === 'quizClose' || id === 'quizClose2') closeQuiz();
  else if (id === 'reportButton') openReport();
  else if (id === 'reportClose' || id === 'reportClose2') closeReport();
  else if (e.target.id === 'restartBackdrop') closeRestart();
  else if (e.target.id === 'creditsBackdrop') closeCredits();
  else if (e.target.id === 'wordsBackdrop') closeWords();
  else if (e.target.id === 'quizBackdrop') closeQuiz();
  else if (e.target.id === 'reportBackdrop') closeReport();
});
// ── Relatório de progresso (pra pais e responsáveis) ───────────────────────────
function openReport() {
  const total = Object.keys(state.words).length;
  const mastered = Object.values(state.words).filter((w) => (w.streak || 0) >= 3).length;
  const due = dueWords(state.words).length;
  const ALL_ZONES = ['school', 'woods', 'highstreet', 'academy', 'classroom'];
  const visited = ALL_ZONES.filter((z) => z === 'school' || state.flags[`visited_${z}`]).length;
  const week = historyWeek(state.history);
  const streak = studyStreak(state.history);
  const t = (key, vars) => uiText(language, key, vars);
  const value = (val) => `<span style="margin-left:auto;font-weight:700;color:#ffd166">${val}</span>`;
  const row = (label, val) => `<div class="word-row"><span>${label}</span>${val === undefined ? '' : value(val)}</div>`;
  const rows = [
    row(t('repWords'), String(total)),
    row(t('repMastered'), String(mastered)),
    row(t('repDue'), String(due)),
    row(t('repClues', { n: state.clues.length, total: Object.keys(CLUES).length })),
    row(t('repPieces', { n: pieceCount(state) })),
    row(t('repChallenges'), String(Object.values(state.challenges).filter(Boolean).length)),
    row(t('repDuelWins', { n: state.duelWins, medal: MEDAL_EMOJI[medalTier(state.duelWins)] })),
    row(t('repChapter'), state.flags.endingSeen ? t('repYes') : t('repNo')),
    row(t('repZones', { n: visited, total: ALL_ZONES.length })),
    row(t('repWeek', { added: week.added, right: week.right, answers: week.right + week.wrong })),
    row(t('repStreak', { n: streak })),
  ];
  $('reportBody').innerHTML = rows.join('')
    + `<p style="font-size:11.5px;color:rgba(255,255,255,.55);margin:10px 0 0">${t('repMasterHint')}</p>`;
  $('reportBackdrop').classList.remove('hidden');
}
function closeReport() {
  $('reportBackdrop').classList.add('hidden');
}
function closeWords() {
  $('wordsBackdrop').classList.add('hidden');
}
function closeQuiz() {
  abortQuizSession(); // cancela sessão ativa e devolve o overlayCount
}

// ── Duelo de Feitiços vs Prof. Raven (melhor de 3, usando o diário) ────────────
function runDuel() {
  if (quizSession) return;
  // duelo sortea as 3 mais fracas do diário (vencidas/streak baixo primeiro)
  const learned = practiceOrder(state.words);
  const picked = learned.slice(0, 3);
  const token = beginQuizSession('duel');
  if (token === null) return;
  let score = 0;
  let idx = 0;

  const nextRound = () => {
    if (liveToken(token) === null) return;
    if (idx >= picked.length) return endDuel();
    const quiz = buildQuiz(state.words, picked[idx], language);
    if (!quiz) return endDuel();
    idx += 1;
    $('quizPrompt').textContent = `⚡ ${quiz.word}?`;
    quizWord = quiz.word;
    speakEnglish(quiz.word);
    const optionsEl = $('quizOptions');
    optionsEl.innerHTML = '';
    $('quizFeedback').textContent = uiText(language, 'duelRound', { n: idx, m: picked.length, score });
    for (const option of quiz.options) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = option.text;
      btn.addEventListener('click', () => {
        if (liveToken(token) === null) return;
        if (option.correct) {
          markRight(quiz.word);
          score += 1;
          btn.classList.add('correct');
          $('quizFeedback').textContent = uiText(language, 'duelRight');
          sounds.magic();
        } else {
          markWrong(quiz.word);
          btn.classList.add('wrong');
          $('quizFeedback').textContent = uiText(language, 'duelWrong', { word: quiz.word });
          sounds.wrong();
        }
        saveState(localStorage, player, state);
        updateReviewBadge();
        setTimeout(nextRound, 1100);
      });
      optionsEl.appendChild(btn);
    }
    $('quizBackdrop').classList.remove('hidden');
  };

  const endDuel = () => {
    endQuizSession(token);
    const won = score >= 2;
    const finish = () => {
      if (won) {
        const before = medalTier(state.duelWins);
        state.flags.duelWon = true;
        state.duelWins += 1;
        saveState(localStorage, player, state);
        updateHUD();
        sounds.fanfare();
        confetti(root, 140);
        const tier = medalTier(state.duelWins);
        if (tier > before) {
          toast(root, uiText(language, 'medalEarned', { medal: MEDAL_EMOJI[tier] }), { duration: 4600 });
        }
      }
    };
    if (won) {
      runConversation([
        { who: 'raven', text: { pt: `Impressionante! ${score} de 3 — vocês venceram o duelo! A Academia Owlburt reconhece seu vocabulário. 🏅`, en: `Impressive! ${score} of 3 — you won the duel! Owlburt Academy recognizes your vocabulary. 🏅`, es: `¡Impresionante! ${score} de 3 — ¡ganaron el duelo! La Academia Owlburt reconoce su vocabulario. 🏅` } },
        { gloss: 'spell' },
      ]).then(finish);
    } else {
      runConversation([
        { who: 'raven', text: { pt: `${score} de 3… a vitória é minha hoje. Estudem com a coruja e voltem — adoro uma revanche!`, en: `${score} of 3… victory is mine today. Study with the owl and come back — I love a rematch!`, es: `${score} de 3… la victoria es mía hoy. ¡Estudien con el búho y vuelvan — me encanta una revancha!` } },
      ]).then(finish);
    }
  };

  nextRound();
}
if ($('creditsBackdrop')) {
  $('creditsBackdrop').addEventListener('click', (e) => { if (e.target === $('creditsBackdrop')) closeCredits(); });
}
// a coruja vira revisão quando há palavras vencidas (capture: roda antes da
// dica normal e bloqueia o toast pra não misturar os dois)
$('hintButton')?.addEventListener('click', (e) => {
  if (dueWords(state.words).length > 0) {
    e.stopImmediatePropagation();
    openQuiz();
  }
}, { capture: true });

$('soundButton').addEventListener('click', () => {
  state.sound = !state.sound;
  setMuted(!state.sound);
  saveState(localStorage, player, state);
  updateHUD();
  sounds.tap();
});
// 🔊 do quiz repete a palavra falada (funciona em qualquer uma das 3 sessões)
$('quizVoice').addEventListener('click', () => {
  if (quizWord && !($('quizBackdrop').classList.contains('hidden'))) speakEnglish(quizWord);
});
// 🌐 cicla pt → en → es e recarrega: o boot inteiro se renderiza no idioma novo
$('langButton').addEventListener('click', () => {
  const cycle = { pt: 'en', en: 'es', es: 'pt' };
  state.language = cycle[language] || 'en';
  saveState(localStorage, player, state);
  location.reload();
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

async function gotoZone(zoneName, spawnOverride = null) {
  overlayCount += 1;
  hidePrompt();
  const veil = fade(root);
  await veil.cover();
  sounds.door();
  buildScene(zoneName);
  if (spawnOverride && playerObj) {
    playerObj.position.set(spawnOverride[0], 0, spawnOverride[1]);
    armExitsAt(spawnOverride[0], spawnOverride[1]);
  }
  state.zone = zoneName;
  state.flags[`visited_${zoneName}`] = true;
  state.position = spawnOverride ? [spawnOverride[0], spawnOverride[1]] : null;
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
  state.flags.endingSeen = true; // mostra uma vez só; depois o portão vira saída normal
  saveState(localStorage, player, state);
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
  // continuar: fecha o card e segue pela saída até a High Street
  const keepGoing = el('button', 'rpg-button primary', `🏰 ${uiText(language, 'keepExploring')}`);
  keepGoing.type = 'button';
  keepGoing.addEventListener('click', () => {
    overlay.remove();
    ended = false;
    overlayCount = Math.max(0, overlayCount - 1);
    // recua pra fora do raio da saída: "continuar" dá o controle de volta,
    // não teleporta sozinho pra High Street no mesmo clique
    if (zone?.name === 'woods' && playerObj && playerObj.position.z < -18.6) {
      playerObj.position.z = -18.6;
      if (companionObj) companionObj.position.z = -18.2;
    }
    updateHUD();
  });
  const playAgain = el('button', 'rpg-button ghost', uiText(language, 'playAgain'));
  playAgain.type = 'button';
  playAgain.addEventListener('click', () => { location.href = '../index.html'; });
  const restart = el('button', 'rpg-button ghost', `🔄 ${uiText(language, 'restart')}`);
  restart.type = 'button';
  restart.addEventListener('click', confirmRestart);
  const buttons = el('div', 'rpg-ending-buttons');
  buttons.append(keepGoing, playAgain, restart);
  overlay.append(buttons);
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
    // aventura lateral da Sra. Page: guarda-chuva (só depois do mapa montado,
    // senão a conversa principal fica logofollowed pela oferta e polui o ritmo)
    if (id === 'page' && state.flags.mapAssembled) {
      if (state.flags.umbrellaFound && !state.flags.umbrellaDone) {
        await runConversation(UMBRELLA_DONE);
        state.flags.umbrellaDone = true;
        registerWord(state.words, 'umbrella', GLOSSES.umbrella);
        registerWord(state.words, 'grateful', GLOSSES.grateful);
        saveState(localStorage, player, state);
        sounds.magic();
        confetti(root, 80);
        updateHUD();
      } else if (!state.flags.umbrellaAsked && !state.flags.umbrellaDone) {
        await runConversation(UMBRELLA_ASK);
        state.flags.umbrellaAsked = true;
        saveState(localStorage, player, state);
        updateHUD();
        toast(root, uiText(language, 'objUmbrella'), { duration: 4200 });
      }
    }
    return;
  }
  if (id === 'board') return void runConversation([{ who: 'owl', text: FLAVOR.board }]);
  // ── lousa da sala de aula: lição emoji → palavra em inglês ─────────────────
  if (id === 'blackboard') {
    const LESSON = [
      { en: 'owl', emoji: '🦉', pt: 'coruja' },
      { en: 'book', emoji: '📖', pt: 'livro' },
      { en: 'cat', emoji: '🐱', pt: 'gato' },
      { en: 'star', emoji: '⭐', pt: 'estrela' },
      { en: 'broom', emoji: '🧹', pt: 'vassoura' },
      { en: 'moon', emoji: '🌙', pt: 'lua' },
    ];
    const token = beginQuizSession('lesson');
    if (token === null) return;
    // prioriza o que ainda não viu e o que tem streak baixo — aula ataca o fraco
    const ranked = LESSON
      .map((l, i) => ({ l, i, streak: state.words[l.en]?.streak ?? -1 }))
      .sort((a, b) => a.streak - b.streak || a.i - b.i);
    const lessons = ranked.slice(0, 3).map((r) => r.l);
    let round = 0;
    const nextLesson = () => {
      if (liveToken(token) === null) return;
      if (round >= lessons.length) {
        endQuizSession(token);
        saveState(localStorage, player, state);
        updateReviewBadge();
        sounds.magic();
        return void runConversation([{ who: 'willow', text: { pt: 'Excelente aula! Essas palavras já estão no seu diário — a coruja vai cobrar depois, hein!', en: 'Excellent class! Those words are in your journal now — the owl will quiz you later!', es: '¡Excelente clase! Esas palabras ya están en tu diario — ¡el búho te va a preguntar después!' } }]);
      }
      const lesson = lessons[round];
      round += 1;
      const wrongs = LESSON.filter((l) => l.en !== lesson.en).sort(() => Math.random() - 0.5).slice(0, 2).map((l) => l.en);
      const options = [lesson.en, ...wrongs].sort(() => Math.random() - 0.5);
      $('quizPrompt').textContent = `${lesson.emoji} = ?`;
      quizWord = lesson.en;
      speakEnglish(lesson.en);
      $('quizFeedback').textContent = uiText(language, 'lessonProgress', { n: round, m: lessons.length });
      const optionsEl = $('quizOptions');
      optionsEl.innerHTML = '';
      for (const opt of options) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          if (liveToken(token) === null) return;
          if (!state.words[lesson.en]) registerWordTracked(lesson.en, { pt: `${lesson.en} = ${lesson.pt}`, en: lesson.en, es: lesson.en });
          if (opt === lesson.en) {
            markRight(lesson.en);
            btn.classList.add('correct');
            $('quizFeedback').textContent = `✨ ${lesson.en} = ${lesson.pt}!`;
            sounds.star();
          } else {
            markWrong(lesson.en);
            btn.classList.add('wrong');
            $('quizFeedback').textContent = `🐣 ${lesson.emoji} = ${lesson.en}`;
            sounds.wrong();
          }
          setTimeout(nextLesson, 1000);
        });
        optionsEl.appendChild(btn);
      }
      $('quizBackdrop').classList.remove('hidden');
    };
    return void nextLesson();
  }
  if (id === 'willow') {
    return void runConversation([
      { who: 'willow', text: { pt: 'Bem-vindos à minha sala! A lousa está cheia de palavras novas — toque nela e vamos praticar!', en: 'Welcome to my classroom! The blackboard is full of new words — touch it and let\'s practice!', es: '¡Bienvenidos a mi sala! La pizarra está llena de palabras nuevas — ¡tóquenla y practiquemos!' } },
      { gloss: 'practice' },
    ]);
  }
  if (id === 'chest') {
    const today = new Date().toDateString();
    if (state.flags.chestDay === today) {
      sounds.hoot();
      return void runConversation([{ who: 'owl', text: { pt: 'O baú está dormindo. Volte amanhã — tesouros precisam de descanso!', en: 'The chest is sleeping. Come back tomorrow — treasure needs rest!', es: 'El cofre está durmiendo. ¡Vuelve mañana — el tesoro necesita descanso!' } }]);
    }
    state.flags.chestOpened = true;
    state.flags.chestDay = today;
    // recompensa diária: 3 palavras bônus entram no diário
    registerWordTracked('treasure', GLOSSES.treasure);
    registerWordTracked('sparkle', GLOSSES.sparkle);
    registerWordTracked('secret', GLOSSES.secret);
    saveState(localStorage, player, state);
    updateReviewBadge();
    sounds.magic();
    confetti(root, 140);
    return void runConversation([
      { who: 'owl', text: { pt: 'Um tesouro! Moedas douradas, uma pena brilhante e… palavras mágicas novas no seu diário! ✨', en: 'A treasure! Golden coins, a shiny feather and… new magic words for your journal! ✨', es: '¡Un tesoro! Monedas doradas, una pluma brillante y… ¡palabras mágicas nuevas para tu diario! ✨' } },
      { gloss: 'treasure' },
      { gloss: 'sparkle' },
      { gloss: 'secret' },
    ]);
  }
  if (id === 'baker') {
    return void runConversation([
      { who: 'baker', text: { pt: 'Bem-vindas à padaria da High Street! O pão de canela sai quentinho às cinco.', en: 'Welcome to the High Street bakery! The cinnamon buns come out warm at five.', es: '¡Bienvenidas a la panadería de High Street! El pan de canela sale calentito a las cinco.' } },
      { gloss: 'warm' },
    ]);
  }
  if (id === 'raven') {
    const learned = Object.keys(state.words).length;
    if (learned < 3) {
      return void runConversation([{ who: 'raven', text: { pt: 'Sou a Prof. Raven, da Academia Owlburt. Duelo de feitiços? Primeiro aprendam 3 palavras com a coruja. Voltem quando o diário estiver cheio!', en: 'I am Prof. Raven, from Owlburt Academy. A spell duel? First learn 3 words with the owl. Come back when your journal is full!', es: 'Soy la Prof. Raven, de la Academia Owlburt. ¿Un duelo de hechizos? Primero aprendan 3 palabras con el búho. ¡Vuelvan cuando el diario esté lleno!' } }]);
    }
    return void runConversation([
      { who: 'raven', text: { pt: 'Então vocês querem o Duelo de Feitiços? Três perguntas, duas certas pra vencer. preparem-se!', en: 'So you want the Spell Duel? Three questions, two right to win. Get ready!', es: '¿Quieren el Duelo de Hechizos? Tres preguntas, dos aciertos para ganar. ¡Prepárense!' } },
    ]).then(() => runDuel());
  }
  if (id === 'signTree') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.signTree }, { gloss: 'golden' }]); }
  // o anel da arena também é gatilho do duelo (mesmo caminho da Prof. Raven)
  if (id === 'duel') return void interact('raven');
  if (id === 'marker') return void runConversation([{ who: 'owl', text: FLAVOR.marker }, { gloss: 'ancient' }]);
  if (id === 'pieceShelf') return void collectPiece('shelf');
  if (id === 'pieceTrolley') return void collectPiece('trolley');
  if (id === 'clueTable') { addClue('libraryTable'); return void runConversation([{ who: 'owl', text: FLAVOR.clueTable }, { gloss: 'curious' }]); }
  if (id === 'clueOak') { addClue('oak'); return void runConversation([{ who: 'owl', text: FLAVOR.clueOak }, { gloss: 'roots' }]); }
  // páginas escondidas novas (addClue já mostra CLUES[id])
  if (id === 'clueBench') return void addClue('benchPoster');
  if (id === 'clueChalk') return void addClue('chalkNote');
  if (id === 'clueScroll') return void addClue('duelScroll');
  // lojas da High Street: cenatura + glosa (story / letter / tea)
  if (id === 'bookshop') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.bookshop }, { gloss: 'story' }]); }
  if (id === 'postOffice') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.postOffice }, { gloss: 'letter' }]); }
  if (id === 'teaRoom') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.teaRoom }, { gloss: 'tea' }]); }
  // ── quest multi-zona: A Encomenda da Sra. Page ────────────────────────────
  if (id === 'orderStart') {
    if (state.flags.orderDone) return void runConversation([{ who: 'page', text: FLAVOR.orderDone }]);
    if (state.flags.orderStarted) {
      const got = ['orderMint', 'orderBun', 'orderFeather'].filter((f) => state.flags[f]);
      if (got.length === 3) {
        state.flags.orderDone = true;
        saveState(localStorage, player, state);
        sounds.magic();
        confetti(root, 100);
        return void runConversation([
          { who: 'page', text: { pt: 'Menta, pão de canela e uma pena azul — chá perfeito! Obrigada, queridas. You are so kind!', en: 'Mint, a cinnamon bun and a blue feather — perfect tea! Thank you, dears. You are so kind!', es: '¡Menta, pan de canela y una pluma azul — té perfecto! Gracias, queridos. You are so kind!' } },
          { gloss: 'kind' },
        ]);
      }
      const falta = ['orderMint', 'orderBun', 'orderFeather'].filter((f) => !state.flags[f]);
      const nomes = { orderMint: { pt: 'menta na mata', en: 'mint in the woods', es: 'menta en el bosque' }, orderBun: { pt: 'pão de canela na padaria', en: 'a cinnamon bun at the bakery', es: 'pan de canela en la panadería' }, orderFeather: { pt: 'a pena azul perto do carvalho', en: 'the blue feather by the oak', es: 'la pluma azul junto al roble' } };
      return void runConversation([{ who: 'page', text: { pt: `Ainda falta: ${falta.map((f) => nomes[f].pt).join(', ')}.`, en: `Still missing: ${falta.map((f) => nomes[f].en).join(', ')}.`, es: `Todavía falta: ${falta.map((f) => nomes[f].es).join(', ')}.` } }]);
    }
    state.flags.orderStarted = true;
    saveState(localStorage, player, state);
    return void runConversation([
      { who: 'page', text: { pt: 'Minhas queridas, meu chá das cinco precisa de três coisinhas: menta fresca na mata, um pão de canela da padaria da High Street e uma pena azul do carvalho. Podem trazer?', en: 'My dears, my five-o-clock tea needs three little things: fresh mint in the woods, a cinnamon bun from the High Street bakery and a blue feather from the oak. Could you fetch them?', es: 'Mis queridos, mi té de las cinco necesita tres cositas: menta fresca en el bosque, un pan de canela de la panadería de High Street y una pluma azul del roble. ¿Traen?' } },
      { gloss: 'fetch' },
    ]);
  }
  for (const [flagId, pt, en, es] of [
    ['orderMint', 'menta fresca!', 'fresh mint!', '¡menta fresca!'],
    ['orderBun', 'pão de canela quentinho!', 'a warm cinnamon bun!', '¡pan de canela calentito!'],
    ['orderFeather', 'uma pena azul brilhante!', 'a shiny blue feather!', '¡una pluma azul brillante!'],
  ]) {
    if (id === flagId) {
      if (state.flags[flagId]) return;
      state.flags[flagId] = true;
      saveState(localStorage, player, state);
      sounds.pickup();
      confetti(root, 40);
      const count = ['orderMint', 'orderBun', 'orderFeather'].filter((f) => state.flags[f]).length;
      return void runConversation([{ who: 'owl', text: { pt: `Achamos: ${pt} — ${count} de 3!`, en: `We found: ${en} — ${count} of 3!`, es: `¡Encontramos: ${es} — 3 de 3!` } }]);
    }
  }
  // ── aventura do guarda-chuva: playground → volta pra Sra. Page ──────────────
  if (id === 'umbrellaSpot') {
    if (!state.flags.umbrellaAsked) {
      return void runConversation([{ who: 'owl', text: { pt: 'Isso não é nosso… um guarda-chuva roxo da Sra. Page. Mas ela está na escola — leve de volta!', en: 'This is not ours… it is Ms Page’s purple umbrella. But she is at school — take it back to her!', es: 'Esto no es nuestro… es el paraguas morado de la Sra. Page. ¡Devuélveselo!' } }, { gloss: 'umbrella' }]);
    }
    if (state.flags.umbrellaDone) {
      return void runConversation([{ who: 'owl', text: { pt: 'A Sra. Page já guardou o guarda-chuva. Chuva pode vir! ☂️', en: 'Ms Page already put the umbrella away. Rain can come! ☂️', es: '¡La Sra. Page ya guardó el paraguas! ¡Puede llover! ☂️' } }]);
    }
    sounds.pickup();
    confetti(root, 50);
    return void runConversation(UMBRELLA_FOUND).then(() => {
      state.flags.umbrellaFound = true;
      saveState(localStorage, player, state);
      toast(root, uiText(language, 'objUmbrella'), { duration: 4200 });
    });
  }
  // ── school e woods ampliados: Flavor + glosses das novas áreas ──────────────
  if (id === 'playground') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.playground }, { gloss: 'swing' }]); }
  if (id === 'garden') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.garden }, { gloss: 'greenhouse' }]); }
  if (id === 'field') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.field }, { gloss: 'pitch' }]); }
  if (id === 'woodCafe') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.cafe }, { gloss: 'meadow' }, { gloss: 'hill' }]); }
  if (id === 'severndroog') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.severndroog }, { gloss: 'castle' }]); }
  if (id === 'pond') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.pond }, { gloss: 'pond' }]); }
  if (id === 'greenChain') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.greenChain }, { gloss: 'path' }]); }
  if (id === 'outdoorGym') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.outdoorGym }, { gloss: 'climb' }]); }
  if (id === 'clueTimetable') return void addClue('timetable');
  // ── quadra da escola: desafio rápido de choice (uma jogada) ───────────────
  if (id === 'sports') {
    if (state.challenges.sportsChoice) {
      return void runConversation([{ who: 'owl', text: FLAVOR.sports }]);
    }
    const ok = await askChoice({
      prompt: { pt: 'Welling FC joga contra quem no sábado?', en: 'Who does Welling FC play on Saturday?', es: '¿Contra quién juega Welling FC el sábado?' },
      options: [
        { label: { pt: 'Welling United', en: 'Welling United', es: 'Welling United' } },
        { label: { pt: 'Manor Park Rangers', en: 'Manor Park Rangers', es: 'Manor Park Rangers' }, correct: true },
        { label: { pt: 'The Moon', en: 'The Moon', es: 'La Luna' } },
      ],
      success: { pt: 'Isso! Welling FC 2 × 1 Manor Park Rangers. E o chá de domingo fica por nossa conta!', en: 'That’s right! Welling FC 2–1 Manor Park Rangers. And Sunday tea is on us!', es: '¡Correcto! Welling FC 2–1 Manor Park Rangers. ¡Y el té del domingo corre por nuestra cuenta!' },
      fail: { pt: 'Quase! O adversário é o Manor Park Rangers. De novo:', en: 'Almost! The opponents are Manor Park Rangers. Again:', es: '¡Casi! Los rivales son Manor Park Rangers. Otra vez:' },
    });
    if (ok) {
      state.challenges.sportsChoice = true;
      saveState(localStorage, player, state);
      sounds.magic();
      registerWord(state.words, 'pitch', GLOSSES.pitch);
      confetti(root, 50);
      updateHUD();
    }
    return;
  }
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
      toast(root, `✨ ${lang({ pt: 'Pedra certa! Atravessaram o leito do riacho.', en: 'Right stone! You crossed the stream bed.', es: '¡Piedra correcta! Cruzaron el lecho del arroyo.' }, language)}`);
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
    else runConversation([{ who: 'owl', text: { pt: 'O portão está aberto. A High Street fica do outro lado — e a Academia Owlburt logo depois…', en: 'The gate is open. The High Street is just outside — and Owlburt Academy right after…', es: 'El portón está abierto. La High Street queda afuera — y la Academia Owlburt justo después…' } }, { gloss: 'gate' }]);
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
// câmera orbital: arraste na tela gira (camYaw), inclina (camPitch —
// arrastar pra cima abaixa a câmera e mostra os rostos) e pinça/scroll
// dá zoom (camZoom). CAM_R é a distância base.
let camYaw = 0;
let camZoom = 1;
let camPitch = 0.55; // rad; arraste vertical ajusta — baixo = vê os rostos
const CAM_R = 11.2; // distância base da câmera (× camZoom)
const CAM_PITCH_MIN = 0.22; // ~13°: quase atrás da jogadora
const CAM_PITCH_MAX = 1.15; // ~66°: visão de cima
const CAM_ZOOM_MIN = 0.55;
const CAM_ZOOM_MAX = 2.2;
const lookTarget = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;

  // movimento: teclado (relativo à câmera) OU destino do toque (click-to-move)
  if (overlayCount > 0) moveTarget = null; // diálogo/menu aberto: desiste do destino
  const [inputX, inputY] = overlayCount > 0 ? [0, 0] : inputVector();
  const keyboard = Math.hypot(inputX, inputY) > 0.05;
  let dx = 0;
  let dz = 0;
  let running = false;
  let moving = keyboard;
  if (keyboard) {
    moveTarget = null; // teclado assume o controle
    // relativo à câmera: "cima" anda pra longe dela em qualquer rotação
    // (rotação do vetor de input por -camYaw; o sinal aqui é o que faz
    // "cima" apontar pro horizonte — invertido, virava em direção à câmera a 90°)
    const cy = Math.cos(camYaw);
    const sy = Math.sin(camYaw);
    running = Math.hypot(inputX, inputY) > 0.92; // teclas no máximo
    const speed = 3.8 * (running ? 1.55 : 1);
    dx = (inputX * cy + inputY * sy) * speed * dt;
    dz = (-inputX * sy + inputY * cy) * speed * dt;
  } else if (moveTarget && playerObj) {
    const tox = moveTarget.x - playerObj.position.x;
    const toz = moveTarget.z - playerObj.position.z;
    const dist = Math.hypot(tox, toz);
    if (dist < 0.16) {
      moveTarget = null; // chegou
    } else {
      running = dist > 3; // longe = corre, chegando perto = caminha
      const speed = 3.8 * (running ? 1.55 : 1);
      const step = Math.min(dist, speed * dt);
      dx = (tox / dist) * step;
      dz = (toz / dist) * step;
      moving = true;
    }
  }

  if (playerObj) {
    const [nx, nz] = moveWithCollision(playerObj.position.x, playerObj.position.z, dx, dz);
    const walked = Math.hypot(nx - playerObj.position.x, nz - playerObj.position.z);
    playerObj.position.set(nx, 0, nz);
    if (moveTarget) {
      // sem progresso por 0,6s = parede no caminho → desiste do destino
      if (walked < 0.001) {
        targetStuck += dt;
        if (targetStuck > 0.6) { moveTarget = null; targetStuck = 0; }
      } else {
        targetStuck = 0;
      }
    }
    // passos sincronizados com o walk cycle (~0.4s por passo)
    stepTimer -= dt;
    if (moving && walked > 0.0005 && stepTimer <= 0) {
      footstep(zone?.name || 'school');
      stepTimer = running ? 0.28 : 0.4;
    }
    if (moving && walked > 0.0005) {
      // personagem olha na direção em que realmente anda (relativa à câmera)
      const targetAngle = Math.atan2(dx, dz);
      let delta = targetAngle - playerObj.rotation.y;
      while (delta > Math.PI) delta -= Math.PI * 2;
      while (delta < -Math.PI) delta += Math.PI * 2;
      playerObj.rotation.y += delta * Math.min(1, dt * 12);
    }
    playerObj.userData.animate?.(t, moving ? (running ? 2 : 1) : 0);

    // coruja fiel orbita a cabeça da jogadora
    const owlAngle = t * 1.5;
    owlObj.position.set(
      playerObj.position.x + Math.cos(owlAngle) * 0.85,
      1.85 + Math.sin(t * 2.2) * 0.1,
      playerObj.position.z + Math.sin(owlAngle) * 0.85
    );
    owlObj.rotation.y = -owlAngle + Math.PI / 2;
    owlObj.userData.animate?.(t, moving);

    // irmã/irmão acompanha por perto (spec §2) — corre se estiver muito longe
    const distanceToPlayer = companionObj.position.distanceTo(playerObj.position);
    if (distanceToPlayer > 1.05) {
      const direction = playerObj.position.clone().sub(companionObj.position).normalize();
      const companionRunning = distanceToPlayer > 3;
      const step = Math.min(distanceToPlayer - 0.95, (companionRunning ? 7 : 4.6) * dt);
      companionObj.position.addScaledVector(direction, step);
      companionObj.rotation.y = Math.atan2(direction.x, direction.z);
      companionObj.userData.animate?.(t, companionRunning ? 2 : 1);
    } else {
      companionObj.userData.animate?.(t, 0);
    }
    companionOwl.userData.animate?.(t, distanceToPlayer > 2);

    // NPCs IA: atualiza o AnimationMixer (idle) de cada um
    for (const id of Object.keys(npcs)) {
      npcs[id]?.userData.animate?.(t, 0);
    }

    // câmera orbital esférica: yaw (arraste horizontal), pitch (arraste
    // vertical — baixo = mais perto do chão, vê os rostos) e zoom (pinça/scroll)
    const dist = CAM_R * camZoom;
    const horiz = dist * Math.cos(camPitch);
    const off = new THREE.Vector3(
      Math.sin(camYaw) * horiz,
      dist * Math.sin(camPitch),
      Math.cos(camYaw) * horiz
    );
    camera.position.lerp(new THREE.Vector3().copy(playerObj.position).add(off), 1 - Math.exp(-dt * 5));
    lookTarget.set(playerObj.position.x, 0.6, playerObj.position.z);
    camera.lookAt(lookTarget);

    // sol acompanha a jogadora para sombras estáveis (câmera de sombra relativa)
    const sunLight = scene.userData.sun;
    if (sunLight) {
      sunLight.position.set(
        playerObj.position.x + zone.sun.pos[0] * 0.5,
        zone.sun.pos[1] * 0.75,
        playerObj.position.z + zone.sun.pos[2] * 0.5
      );
      sunLight.target.position.set(playerObj.position.x, 0, playerObj.position.z);
    }
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
    // final do capítulo: atravessar o portão aberto — ANTES das saídas de
    // zona, senão o teleport pra High Street (raio até z=-20.4) roubava o
    // avanço e o fim nunca aparecia (bug confirmado em jogada real).
    if (zone?.name === 'woods' && state.flags.gateOpen && !state.flags.endingSeen && playerObj.position.z < -19.0) {
      showEnding(); // overlayCount vira >0 → saídas abaixo ficam de fora neste frame
    }
    // mundo semi-aberto: saídas de zona são pisáveis; logo após uma transição
    // ficam mudas por 2.5s (tempo real, não medição por dt)
    if (overlayCount === 0 && performance.now() >= exitAllowedAt) {
      for (const exit of zone.exits || []) {
        const dist = Math.hypot(exit.x - playerObj.position.x, exit.z - playerObj.position.z);
        const key = `${exit.target}:${exit.x}:${exit.z}`;
        if (dist > exit.radius) { exitInside.delete(key); continue; }
        // saída condicional (ex.: mata só pelo portão, quando aberto): avisa só
        // quando encosta, e sem segurar o cooldown das saídas livres
        if (exit.flag && !state.flags[exit.flag]) {
          if (performance.now() - exitHintAt > 4000) {
            exitHintAt = performance.now();
            toast(root, lang({
              pt: '🔒 O portão secreto ainda está fechado — procure outro caminho!',
              en: '🔒 The secret gate is still closed — find another way!',
              es: '🔒 La puerta secreta sigue cerrada — ¡busquen otro camino!',
            }, language), { duration: 3200 });
          }
          continue;
        }
        if (exitInside.has(key)) continue; // já estava dentro ao chegar na zona
        exitInside.add(key);
        exitAllowedAt = performance.now() + 2500;
        void gotoZone(exit.target, exit.spawn);
        break;
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

  // marcador do destino do toque (pulsa enquanto existe destino)
  if (clickMarker) {
    clickMarker.visible = Boolean(moveTarget);
    if (moveTarget) {
      clickMarker.position.set(moveTarget.x, 0.05, moveTarget.z);
      clickMarker.scale.setScalar(1 + 0.15 * Math.sin(t * 6));
    }
  }

  zone?.update?.(dt, t);

  composer.render();
}

// ── boot ─────────────────────────────────────────────────────────────────────
// aplica i18n nos textos estáticos do HTML (marcados com data-i18n);
// innerHTML porque creditsIntro embute o link do Sketchfab
function applyStaticI18n() {
  for (const node of document.querySelectorAll('[data-i18n]')) {
    node.innerHTML = uiText(language, node.dataset.i18n);
  }
}

// barra da tela de carregamento (0–100% dos GLB)
function setBootProgress(ratio) {
  const pct = Math.round(Math.max(0, Math.min(1, ratio)) * 100);
  const fill = $('bootFill');
  const label = $('bootPct');
  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `${pct}%`;
}
onModelProgress(setBootProgress);

function hideBootScreen() {
  const boot = $('boot');
  if (!boot) return;
  boot.classList.add('done');
  setTimeout(() => boot.remove(), 600);
}

async function boot() {
  try {
    initThree();
  } catch (error) {
    $('fatal').textContent = uiText(language, 'webglFail');
    $('fatal').classList.add('show');
    return;
  }
  setMuted(!state.sound);
  applyStaticI18n();
  ensureAudio();
  window.addEventListener('pointerdown', () => ensureAudio(), { once: true });
  updateHUD();

  // GLBs baixam EM PARALELO com a escolha de personagem (33MB); a tela de
  // carregamento fica em z-40, atrás do select (z-60), e some quando acaba
  const preload = preloadModels();
  if (!state.character) state.character = await chooseCharacter();
  saveState(localStorage, player, state);

  try {
    await preload;
  } catch (error) {
    console.warn('Falha ao carregar modelos 3D externos; usando fallback procedural.', error);
    if (location.protocol === 'file:') {
      toast(root, '⚠️ Abra pelo jogar.sh — o navegador bloqueia os modelos 3D no modo arquivo.', 6000);
    }
  }
  hideBootScreen();

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
      if (playerObj && overlayCount === 0 && !restarting) {
        state.position = [playerObj.position.x, playerObj.position.z];
        saveState(localStorage, player, state);
      }
    }, 4000);
  }
  window.addEventListener('beforeunload', () => {
    if (playerObj && !warp && !restarting) {
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
  debug: () => ({
    zone: zone?.name,
    overlay: overlayCount,
    moveTarget,
    cooldown: Math.max(0, (exitAllowedAt - performance.now()) / 1000),
    gateOpen: Boolean(state.flags.gateOpen),
    exits: zone?.exits,
  }),
  interact: (id) => interact(id),
  kids: () => [playerObj, companionObj].map((o) => o && ({
    pos: o.position.toArray().map((n) => +n.toFixed(2)),
    visible: o.visible,
    scale: o.scale.toArray(),
    children: o.children.map((c) => c.type),
  })),
};

boot();
