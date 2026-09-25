// RPG Welling — motor do jogo: cena 3D, controles, diálogos e missões.
// Slice vertical do spec §38: escola → biblioteca → pista → trilha na mata.

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { uiText, lang } from './i18n.js';
import { ensureAudio, setMuted, setAmbienceEnabled, setZoneAmbience, footstep, sounds } from './audio.js';
import { loadState, saveState, bumpGeneration, recordHistory, historyWeek, studyStreak, dayKey, CHARACTERS, MAP_PIECES } from './state.js';
import { currentObjective, hintKey, checkStone, canAssembleMap, pieceCount, medalTier, MEDAL_EMOJI, secondaryObjectives } from './quest.js';
import { buildSchool, buildWoods, buildHighStreet, buildAcademy, buildClassroom, makeKid, makeOwl, makeAdult, blobShadow, preloadCoreModels, preloadZoneModels, onModelProgress } from './world.js';
import { NPCS, CONVERSATIONS, STORY_PANELS, FLAVOR, CLUES, GLOSSES, PIECE_NAMES, UMBRELLA_ASK, UMBRELLA_FOUND, UMBRELLA_DONE } from './content.js';
import { registerWord, dueWords, answerCorrect, answerWrong, buildQuiz, practiceOrder, MAX_REVIEW_PER_SESSION } from './vocab.js';
import { ACHIEVEMENTS, achievementById, evaluateAchievements } from './achievements.js';
import { trapFocus, openModalStack, shouldReduceMotion } from './a11y.js';
import { normalizeSettings, renderOptionsPanel } from './options.js';
import { CHAPTER2, chapterProgress, nextQuest, nextStep, isQuestComplete } from './chapters.js';
import { createMemoryGame } from './games/memory.js';
import { createDictation, DICTATION_PHRASES, DICTATION_FLAGS } from './games/dictation.js';
import { createPenalty } from './games/penalty.js';
import { createWords, spotById } from './games/words.js';
import { createListen, getListenTarget } from './games/listen.js';
import { el, toast, confetti, storybook, fade } from './ui.js';
import { buildNavGrid, findPathToNearest, canStand, nearestStandPoint } from './pathfind.js';
import { cameraFit, cameraDistance } from './camera.js';
import { createOcclusionFader } from './occlusion.js';

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
  memoryLibrary: { pt: '🃏 Jogar a Memória da Biblioteca', en: '🃏 Play Library Memory', es: '🃏 Jugar a la Memoria de la Biblioteca' },
  globe: { pt: '🌍 Ver o globo', en: '🌍 Look at the globe', es: '🌍 Mirar el globo' },
  clueBench: { pt: '🔍 Olhar o cartaz no banco', en: '🔍 Look at the poster on the bench', es: '🔍 Mirar el cartel del banco' },
  clueChalk: { pt: '🔍 Olhar a janela', en: '🔍 Look at the window', es: '🔍 Mirar la ventana' },
  clueScroll: { pt: '🔍 Ler o pergaminho', en: '🔍 Read the scroll', es: '🔍 Leer el pergamino' },
  baker: { pt: '🗣️ Falar com o padeiro', en: '🗣️ Talk to the baker', es: '🗣️ Hablar con el panadero' },
  playground: { pt: '🛝 Olhar o parquinho', en: '🛝 Look at the playground', es: '🛝 Mirar el parque infantil' },
  umbrellaSpot: { pt: '☂️ Pegar o guarda-chuva roxo', en: '☂️ Pick up the purple umbrella', es: '☂️ Recoger el paraguas morado' },
  garden: { pt: '🥕 Visitar a horta', en: '🥕 Visit the garden', es: '🥕 Visitar la huerto' },
  sports: { pt: '🏀 Quiz do Welling FC', en: '🏀 Welling FC quiz', es: '🏀 Quiz del Welling FC' },
  clueTimetable: { pt: '🔍 Ler o tabela de jogos', en: '🔍 Read the games timetable', es: '🔍 Leer la tabla de juegos' },
  field: { pt: '⚽ Chutar os pênaltis', en: '⚽ Kick the penalties', es: '⚽ Chutar los penaltis' },
  wordsSchool: { pt: '📚 Palavras do parquinho e da horta', en: '📚 Playground and garden words', es: '📚 Palabras del parque y del huerto' },
  wordsWoods: { pt: '📚 Palavras da beira da mata', en: '📚 Words by the wood edge', es: '📚 Palabras del borde del bosque' },
  wordsHighStreet: { pt: '📚 Palavras da High Street', en: '📚 High Street words', es: '📚 Palabras de High Street' },
  wordsClassroom: { pt: '📚 Palavras da sala de aula', en: '📚 Classroom words', es: '📚 Palabras del salón de clases' },
  wordsAcademy: { pt: '📚 Palavras da varanda da academia', en: '📚 Academy veranda words', es: '📚 Palabras del pórtico de la academia' },
  listenSchool: { pt: '🎧 Ouvir e repetir', en: '🎧 Listen and repeat', es: '🎧 Escuchar y repetir' },
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
  school: { pt: '🏫 Academia Leigh Stationers', en: "🏫 Leigh Stationers' Primary Academy", es: '🏫 Academia Leigh Stationers' },
  woods: { pt: '🌳 Oxleas Woods', en: '🌳 Oxleas Woods', es: '🌳 Bosque de Oxleas' },
  highstreet: { pt: '🏪 High Street', en: '🏪 High Street', es: '🏪 High Street' },
  academy: { pt: '🏰 Academia Owlburt', en: '🏰 Owlburt Academy', es: '🏰 Academia Owlburt' },
  classroom: { pt: '🪑 Sala de Aula', en: '🪑 Classroom', es: '🪑 Salón de Clases' },
};

// Quem pede menos movimento no sistema operacional continua jogando igual:
// só os enfeites (órbita da coruja, pulso do anel de destino, animação dos
// modelos) são desligados. O laço de animação e a simulação continuam.
const reduceMotion = shouldReduceMotion();

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
window.__BUNDLE_V = 't'; // marcador de versão pra debug de cache

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
  // occlusores da câmera: malhas reais da zona (paredes, telhados, móveis
  // grandes). Colliders 2D não conhecem telhado — decidir o que bloqueia a
  // câmera só por eles enfiava a câmera dentro do beiral.
  // Só ESTRUTURA (parede, telhado, prédio, estante grande) entra na lista:
  // hoje ela não corta mais o braço da câmera — vira fantasma esmaecido
  // (src/occlusion.js) — mas o critério continua: malha pequena e InstancedMesh
  // (vegetação, árvores, arbustos) ficam de fora, senão o campo de futebol e o
  // jardim inteiro piscavam a cada passinho da menina.
  occluders = [];
  scene.traverse((node) => {
    if (!node.isMesh || !node.visible || node.isInstancedMesh) return;
    if (node.geometry) {
      if (!node.geometry.boundingSphere) node.geometry.computeBoundingSphere();
      if ((node.geometry.boundingSphere?.radius ?? 0) < CAM_OCCLUDER_MIN_RADIUS) return;
    }
    occluders.push(node);
  });
  // a cena é nova: a antiga inteira foi descartada, então não existe mais o
  // que restaurar — o fader só pode esquecer os meshes da zona anterior
  fader.reset();
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
  stopWalking(); // troca de zona: destino antigo não faz sentido

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

  // grade de navegação por último: riacho atravessado e portão aberto já
  // tiraram os colliders, então o A* enxerga o caminho novo
  navGrid = buildNavGrid(zone, { radius: PLAYER_RADIUS });
}

// ── entrada: teclado (WASD/setas) — no toque, quem manda é o tap-to-move ────
const keys = new Set();

// Escape fecha o painel que estiver no topo, SEMPRE pela função de fechar que
// já existia. Fechar pelo stack sozinho devolveria o foco mas deixaria a
// sessão de quiz com overlayCount pendente — o jogo ficaria travado sem
// nenhuma tela visível.
const MODAL_CLOSERS = new Map([
  ['restartBackdrop', () => closeRestart()],
  ['creditsBackdrop', () => closeCredits()],
  ['wordsBackdrop', () => closeWords()],
  ['reportBackdrop', () => closeReport()],
  ['quizBackdrop', () => closeQuiz()],
  ['optionsBackdrop', () => closeOptions()],
  ['gameBackdrop', () => closeGame()],
]);

function closeTopModal() {
  const top = openModalStack.top();
  if (!top) return false;
  for (const [backdropId, close] of MODAL_CLOSERS) {
    const backdrop = $(backdropId);
    if (!backdrop) continue;
    const panel = backdrop.querySelector('.rpg-panel') || backdrop;
    if (panel === top) {
      close();
      return true;
    }
  }
  return false;
}

window.addEventListener('keydown', (event) => {
  // Espaço/Enter num <button> já ativam o botão: roubar o default deixava os
  // botões de zoom (e qualquer outro) impossíveis de acionar pelo teclado, e
  // chamar advanceDialog junto acionava as duas coisas de uma vez.
  const onControl = event.target instanceof HTMLElement
    && !!event.target.closest('button, a, input, select, textarea, [role="button"]');
  if ((event.key === 'Enter' || event.key === ' ') && !onControl) advanceDialog?.();
  if (event.key === 'Escape') {
    if (closeTopModal()) return;
    if (quizSession) { closeQuiz(); return; }
    stopWalking(); // cancela a rota na hora
  }
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) && !onControl) event.preventDefault();
  if (event.key === ' ' && !onControl) event.preventDefault();
  if (event.key === '+' || event.key === '=') zoomBy(1 / 1.12);
  if (event.key === '-' || event.key === '_') zoomBy(1.12);
  // com um controle focado, as letras/setas pertencem AO CONTROLE: segurar
  // "w" com o foco no botão de zoom fazia a menina andar sozinha
  if (!onControl) keys.add(event.key.toLowerCase());
  if (!onControl && event.key.toLowerCase() === 'e') tryInteract();
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
// O destino vira uma rota (A* sobre os obstáculos da zona): a julia contorna
// a cerca, passa por trás do prédio e chega — em vez de empurrar e desistir.
let moveTarget = null; // {x, z} destino final do toque; null = parada
let navPath = []; // waypoints [{x,z}] até o destino
let navIndex = 0;
let navGrid = null; // grade de navegação da zona atual
let targetStuck = 0; // segundos sem progresso a caminho do destino (parede)
let repathTries = 0; // quantas vezes já recalculamos a rota preso
let lastGoal = null; // último destino tentado (diagnóstico)
const raycaster = new THREE.Raycaster();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const ndc = new THREE.Vector2();
const groundHit = new THREE.Vector3();

function stopWalking() {
  moveTarget = null;
  navPath = [];
  navIndex = 0;
  targetStuck = 0;
}

// recalcula a rota do ponto atual até o destino; null = não há caminho.
// Se o destino estiver fechado, tenta o ponto alcançável mais próximo dele.
function routeTo(target) {
  if (!navGrid || !playerObj) return null;
  const here = { x: playerObj.position.x, z: playerObj.position.z };
  const path = findPathToNearest(navGrid, here, target);
  if (!path || !path.length) return null;
  // rota que termina onde ela já está = não há por onde ir (cercada de cerca)
  const last = path[path.length - 1];
  if (Math.hypot(last.x - here.x, last.z - here.z) < 0.3) return null;
  return path;
}

function tapToMove(clientX, clientY) {
  if (!playerObj || !camera || overlayCount > 0) return;
  ndc.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  if (!raycaster.ray.intersectPlane(groundPlane, groundHit)) return;
  const dx = groundHit.x - playerObj.position.x;
  const dz = groundHit.z - playerObj.position.z;
  const dist = Math.hypot(dx, dz);
  if (dist < 0.25) { stopWalking(); return; } // toque nela mesma
  if (dist > 26) { // alcance limitado: mesmo com rota, não atravessa a fase
    groundHit.x = playerObj.position.x + (dx / dist) * 26;
    groundHit.z = playerObj.position.z + (dz / dist) * 26;
  }
  // chão distantemente fora da fase: encosta no limite em vez de dizer que
  // não achou caminho (o aviso fica só para destinos mesmo bloqueados)
  const goal = {
    x: THREE.MathUtils.clamp(groundHit.x, zone.bounds.minX + PLAYER_RADIUS, zone.bounds.maxX - PLAYER_RADIUS),
    z: THREE.MathUtils.clamp(groundHit.z, zone.bounds.minZ + PLAYER_RADIUS, zone.bounds.maxZ - PLAYER_RADIUS),
  };
  const path = routeTo(goal);
  lastGoal = goal;
  if (!path) {
    // sem rota (destino fechado): fica onde está, com um aviso curto
    stopWalking();
    sounds.wrong();
    toast(root, uiText(language, 'noPath'), { duration: 2200 });
    return;
  }
  // destino dentro de um objeto grande: chega no ponto livre mais próximo em
  // vez de andar até a parede e ficar tentando chegar no meio do prédio
  const arrival = path[path.length - 1];
  moveTarget = canStand(navGrid, goal.x, goal.z) ? goal : { x: arrival.x, z: arrival.z };
  navPath = path;
  navIndex = path.length > 1 ? 1 : 0;
  targetStuck = 0;
  repathTries = 0;
  sounds.tap();
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
// botões ＋/－ do HUD e teclas +/-: o zoom por pinça é frágil no celular
// (dedo gordo, dois dedos que viram arraste) e dentro do prédio a câmera já
// encosta no teto — sem um caminho explícito, "não dá pra dar zoom".
function zoomBy(factor) {
  camZoom = clampZoom(camZoom * factor);
  sounds.tap();
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

// ── Conquistas ───────────────────────────────────────────────────────────────
// evaluateAchievements devolve só o que ainda NÃO está em state.achievements,
// então a gravação é idempotente: chamar checkAchievements() em todos os pontos
// de progresso é seguro e é o que evita 18 toasts no boot de uma jogadora que
// volta com o save antigo.
const TIER_EMOJI = { bronze: '🥉', silver: '🥈', gold: '🥇' };
let achievementQueue = Promise.resolve();

function checkAchievements({ silent = false } = {}) {
  const fresh = evaluateAchievements(state.achievements, state);
  if (fresh.length === 0) return;
  for (const id of fresh) {
    if (!state.achievements.includes(id)) state.achievements.push(id);
  }
  saveState(localStorage, player, state);
  if (silent) return;

  // Uma por vez e enfileiradas: toast empilhado no mesmo frame cobriria a tela
  // inteira e a criança não leria nenhum.
  achievementQueue = achievementQueue.then(async () => {
    for (const id of fresh) {
      const item = achievementById(id);
      if (!item) continue;
      const emoji = TIER_EMOJI[item.tier] || '🏅';
      toast(root, `${emoji} ${lang(item.text, language)}`, { duration: 3600 });
      sounds.hoot();
      // sequencial de propósito: o próximo toast espera o anterior sair
      await new Promise((resolve) => setTimeout(resolve, 3900));
    }
  });
}

// Junta as conquistas ganhas ao relatório: é o único lugar onde a criança e os
// pais veem o conjunto, então a lista tem de ser legível e honesta — só o que
// state.achievements realmente contém, nunca o que poderia ter sido ganho.
function renderAchievements() {
  const list = $('achievementsList');
  if (!list) return;
  const earned = new Set(state.achievements || []);
  if (earned.size === 0) {
    list.innerHTML = `<p class="rpg-words-empty">${uiText(language, 'achievementsEmpty')}</p>`;
    return;
  }
  const order = ACHIEVEMENTS.filter((item) => earned.has(item.id));
  list.innerHTML = order.map((item) => {
    const emoji = TIER_EMOJI[item.tier] || '🏅';
    return `<li class="achievement-row"><span class="achievement-emoji">${emoji}</span><span class="achievement-text"><strong>${lang(item.text, language)}</strong><small>${lang(item.hint, language)}</small></span></li>`;
  }).join('');
}

// rastreio pro relatório dos pais: palavra nova, acerto e erro do dia
function registerWordTracked(word, gloss) {
  const isNew = !state.words[word];
  const stored = registerWord(state.words, word, gloss);
  // o diário tem teto; sem isto a criança acharia que a palavra foi guardada
  // e a perderia na próxima ida à escola
  if (!stored && isNew) {
    toast(root, lang({
      pt: 'O teu diário está cheio. Guarda esta palavra para depois!',
      en: 'Your journal is full. Keep this word for later!',
      es: 'Tu diario está lleno. Guarda esta palabra para después.',
    }, language), { duration: 4200 });
  }
  if (isNew && state.words[word]) recordHistory(state, 'added');
  checkAchievements();
  return stored;
}
function markRight(word) { answerCorrect(state.words, word); recordHistory(state, 'right'); checkAchievements(); }
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
  // o badge é um <span> dentro do botão: sem o aria-label, quem usa leitor de
  // tela ouve "Dica da coruja" e nunca o número que o badge mostra na tela
  refreshDynamicAria();
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
  const queue = practiceOrder(state.words).filter((w) => dueSet.has(w)).slice(0, MAX_REVIEW_PER_SESSION);

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
    openModal('quizBackdrop');
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
  checkAchievements();
}

// ── HUD ──────────────────────────────────────────────────────────────────────
function updateHUD() {
  const objective = currentObjective(state);
  let chip = `📜 ${uiText(language, OBJECTIVE_KEYS[objective.id], { count: objective.progress ?? 0 })}`;
  // Capítulo 2 ativo assume o chip: fragmentos reunidos + missão atual
  if (state.flags.ch2Started && !state.flags.ch2Done) {
    const quest = nextQuest(CHAPTER2, state.flags);
    const progress = chapterProgress(CHAPTER2, state.flags);
    chip = quest
      ? `⭐ ${progress.fragments}/4 — ${lang(quest.title, language)}`
      : `⭐ ${uiText(language, 'ch2GoTower')}`;
  }
  $('questChip').textContent = chip;
  // fragmentos do cap. 2: cobre também passos observados (duelWon) que não
  // têm gancho próprio; idempotente pelo challenge do reward
  maybeChapter2Fragment();
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
    // Capítulo 2 em andamento entra nas segundas quests do diário
    if (state.flags.ch2Started && !state.flags.ch2Done) {
      const progress = chapterProgress(CHAPTER2, state.flags);
      const line = progress.endingReady
        ? `▫️ ⭐ ${uiText(language, 'ch2GoTower')}`
        : `▫️ ⭐ ${progress.fragments}/4 — ${lang(CHAPTER2.title, language)}`;
      secList.appendChild(el('li', undefined, line));
    }
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

// ── Foco dos painéis modais ───────────────────────────────────────────────────
// Só os painéis estáticos são modais de verdade. O diálogo da coruja NÃO
// entra aqui: ele é um overlay do jogo que o jogador atravessa com Enter, e
// prendê-lo devolveria o foco e quebraria o avanço da conversa.
function openModal(backdropId) {
  const backdrop = $(backdropId);
  if (!backdrop) return;
  const panel = backdrop.querySelector('.rpg-panel') || backdrop;
  if (openModalStack.top() === panel) return;
  // o botão que abriu é o foco atual; trapFocus devolve o foco a ele no close
  const opener = document.activeElement;
  const release = trapFocus(panel, { activeElement: opener, fallbackFocusTarget: panel });
  openModalStack.push(panel, { release, opener });
  panel.focus?.();
}

function closeModal(backdropId) {
  const backdrop = $(backdropId);
  if (!backdrop) return;
  const panel = backdrop.querySelector('.rpg-panel') || backdrop;
  // o registro sai da pilha e o release devolve o foco — os dois caminhos
  // passam por aqui, inclusive o clique no fundo e o botão "depois"
  openModalStack.close(panel);
}

// reiniciar (apaga o save desta jogadora e volta à escolha de personagem)
function openRestart() {
  $('restartBackdrop').classList.remove('hidden');
  openModal('restartBackdrop');
  const focusable = $('restartCancel');
  setTimeout(() => focusable.focus(), 0);
}
function closeRestart() {
  $('restartBackdrop').classList.add('hidden');
  closeModal('restartBackdrop');
}
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
  openModal('creditsBackdrop');
}
function closeCredits() {
  $('creditsBackdrop').classList.add('hidden');
  closeModal('creditsBackdrop');
}
// ── Opções (tamanho do texto, sons de ambiente) ───────────────────────────────
function applyTextScale(settings) {
  root.dataset.textScale = settings.textScale;
  document.body.dataset.textScale = settings.textScale;
}
// o painel é desenhado uma vez no boot; depois, update() sincroniza com o estado
let optionsPanel = null;
function renderOptions() {
  const body = document.querySelector('#optionsBackdrop .rpg-panel');
  if (!body) return;
  optionsPanel = renderOptionsPanel({
    container: body,
    settings: normalizeSettings(state.settings),
    lang: language,
    onChange: (partial) => {
      // Espaço num rádio já marcado reemite o mesmo valor: guardar sem mudança
      // seria um save de localStorage a cada Espaço, de graça
      if (partial.textScale !== undefined && partial.textScale === state.settings?.textScale) return;
      if (partial.ambience !== undefined && partial.ambience === state.settings?.ambience) return;
      state.settings = normalizeSettings({ ...state.settings, ...partial });
      saveState(localStorage, player, state);
      if (partial.textScale !== undefined) applyTextScale(state.settings);
      if (partial.ambience !== undefined) setAmbienceEnabled(state.settings.ambience);
    },
  });
}
function openOptions() {
  optionsPanel?.update?.(normalizeSettings(state.settings));
  $('optionsBackdrop').classList.remove('hidden');
  openModal('optionsBackdrop');
}
function closeOptions() {
  $('optionsBackdrop').classList.add('hidden');
  closeModal('optionsBackdrop');
}
function openWords() {
  renderWordsList();
  $('wordsBackdrop').classList.remove('hidden');
  openModal('wordsBackdrop');
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
  else if (id === 'optionsButton') openOptions();
  else if (id === 'optionsClose') closeOptions();
  else if (id === 'gameClose') closeGame();
  else if (id === 'zoomIn') zoomBy(1 / 1.22); // ＋ = aproxima (menor distância)
  else if (id === 'zoomOut') zoomBy(1.22);
  else if (e.target.id === 'restartBackdrop') closeRestart();
  else if (e.target.id === 'creditsBackdrop') closeCredits();
  else if (e.target.id === 'wordsBackdrop') closeWords();
  else if (e.target.id === 'quizBackdrop') closeQuiz();
  else if (e.target.id === 'reportBackdrop') closeReport();
  else if (e.target.id === 'optionsBackdrop') closeOptions();
  else if (e.target.id === 'gameBackdrop') closeGame();
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
  renderAchievements();
  $('reportBackdrop').classList.remove('hidden');
  openModal('reportBackdrop');
}
function closeReport() {
  $('reportBackdrop').classList.add('hidden');
  closeModal('reportBackdrop');
}
function closeWords() {
  $('wordsBackdrop').classList.add('hidden');
  closeModal('wordsBackdrop');
}
function closeQuiz() {
  abortQuizSession(); // cancela sessão ativa e devolve o overlayCount
  closeModal('quizBackdrop');
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
    openModal('quizBackdrop');
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
        checkAchievements();
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
  refreshDynamicAria();
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
  checkAchievements();
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
  // evaluate antes da conversa: se a última pista fecha a caça, a conquista
  // entra no save mesmo que a criança pule a fala da coruja
  checkAchievements();
  await runConversation([{ who: 'owl', text: CLUES[id] }]);
}

async function gotoZone(zoneName, spawnOverride = null) {
  overlayCount += 1;
  hidePrompt();
  const veil = fade(root);
  // O painel é filho da cortina para que a criança veja progresso mesmo com o jogo oculto.
  const zoneProgress = el('div');
  zoneProgress.setAttribute('role', 'status');
  zoneProgress.setAttribute('aria-live', 'polite');
  zoneProgress.style.cssText = 'position:absolute;inset:0;z-index:71;display:grid;place-items:center;background:#06040f;color:#fff;font:600 18px sans-serif;';
  const zoneProgressLabel = el('p', '', `${uiText(language, 'loadingZone')} 0%`);
  zoneProgressLabel.style.cssText = 'margin:0 0 14px;text-align:center;';
  zoneProgressLabel.lang = language;
  const zoneProgressTrack = el('div');
  zoneProgressTrack.style.cssText = 'width:min(320px,70vw);height:12px;border-radius:999px;background:rgba(255,255,255,.18);overflow:hidden;';
  const zoneProgressFill = el('div');
  zoneProgressFill.style.cssText = 'height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#ffd166,#f0a63a);transition:width .2s;';
  zoneProgressTrack.append(zoneProgressFill);
  zoneProgress.append(zoneProgressLabel, zoneProgressTrack);
  (root.querySelector('.rpg-fade') || root).append(zoneProgress);

  const setZoneProgress = (ratio) => {
    const safeRatio = Number.isFinite(ratio) ? Math.max(0, Math.min(1, ratio)) : 0;
    const pct = Math.round(safeRatio * 100);
    zoneProgressFill.style.width = `${pct}%`;
    zoneProgressLabel.textContent = `${uiText(language, 'loadingZone')} ${pct}%`;
  };
  let previousModelProgress = null;
  try {
    previousModelProgress = onModelProgress(setZoneProgress);
    await veil.cover();
    await preloadZoneModels(zoneName);
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
    updateHUD();
    checkAchievements();
  } finally {
    onModelProgress(previousModelProgress);
    veil.remove();
    overlayCount = Math.max(0, overlayCount - 1);
  }
}

async function openGate() {
  state.flags.gateOpen = true;
  saveState(localStorage, player, state);
  const index = zone.colliders.indexOf(zone.gateCollider);
  if (index >= 0) zone.colliders.splice(index, 1);
  navGrid = buildNavGrid(zone, { radius: PLAYER_RADIUS }); // rota nova agora passa pelo portão
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
  checkAchievements();
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

// ── Capítulo 2 ("A Torre de Severndroog"): runner da tabela em chapters.js ────
// A lenda é contada pela Willow no 1º encontro após o fim do capítulo 1 e, na
// mesma visita, ela já entrega a oferta da própria missão (giver == willow).
// Os outros givers (page, baker, raven) falam a oferta da missão deles no
// 1º passo 'talk' pendente; o resto do progresso vem de flags que sistemas
// donos gravam (duelo, lousa, memória, ditados). Tudo idempotente por flag.
async function maybeChapter2(npcId) {
  if (!state.flags.endingSeen || state.flags.ch2Done) return false;
  if (npcId === 'willow' && !state.flags.ch2Started) {
    await runConversation(CHAPTER2.intro);
    state.flags.ch2Started = true;
    // a missão da própria Willow começa na sequência: a lenda JÁ foi contada
    const quest = CHAPTER2.quests.find((q) => q.giver === npcId && !isQuestComplete(q, state.flags));
    const step = quest ? nextStep(quest, state.flags) : null;
    if (step?.type === 'talk') {
      await runConversation(quest.offer);
      state.flags[step.flag] = true;
    }
    saveState(localStorage, player, state);
    sounds.magic();
    confetti(root, 60);
    updateHUD();
    const hint = nextStep(quest || CHAPTER2.quests[0], state.flags);
    if (hint) toast(root, `⭐ ${lang(hint.hint, language)}`, { duration: 5200 });
    return true;
  }
  if (!state.flags.ch2Started) return false;
  const quest = CHAPTER2.quests.find((q) => q.giver === npcId && !isQuestComplete(q, state.flags));
  const step = quest ? nextStep(quest, state.flags) : null;
  if (!step || step.type !== 'talk') return false;
  await runConversation(quest.offer);
  state.flags[step.flag] = true;
  saveState(localStorage, player, state);
  updateHUD();
  const hint = nextStep(quest, state.flags);
  if (hint) toast(root, `⭐ ${lang(hint.hint, language)}`, { duration: 5200 });
  return true;
}

// fim do capítulo 2: com as 4 missões fechadas, a torre entrega a estrela
async function maybeChapter2Ending() {
  if (!state.flags.ch2Started || state.flags.ch2Done) return false;
  if (!chapterProgress(CHAPTER2, state.flags).endingReady) return false;
  state.flags.ch2Done = true;
  saveState(localStorage, player, state);
  await runConversation(CHAPTER2.ending.lines);
  sounds.fanfare();
  confetti(root, 140);
  checkAchievements();
  updateHUD();
  return true;
}

// recompensa do fragmento: palavras da tabela + challenge ch2Star<n>. Chamado
// DEPOIS de gravar a flag do passo — o progresso nunca depende do reward.
function grantChapter2Reward(questId) {
  const quest = CHAPTER2.quests.find((q) => q.id === questId);
  if (!quest) return;
  for (const word of quest.reward.words) registerWordTracked(word, GLOSSES[word]);
  state.challenges[quest.reward.challenge] = true;
  saveState(localStorage, player, state);
  updateHUD();
  checkAchievements();
  toast(root, `⭐ ${uiText(language, 'ch2Fragment')} (${chapterProgress(CHAPTER2, state.flags).fragments}/4)`, { duration: 4600 });
}

// Depois de gravar QUALQUER flag de passo do cap. 2 (lousa, memória, ditado,
// duelo), entrega o fragmento da missão que acabou de fechar. Idempotente:
// o challenge do reward marca que a estrela já foi entregue. Chamar de
// updateHUD é o que cobre passos observados (duelWon) sem gancho próprio.
function maybeChapter2Fragment() {
  if (!state.flags.ch2Started || state.flags.ch2Done) return;
  const quest = CHAPTER2.quests.find((q) => isQuestComplete(q, state.flags) && !state.challenges[q.reward.challenge]);
  if (quest) grantChapter2Reward(quest.id);
}

// ── Minigames em modal (memória da biblioteca, ditados do mundo) ──────────────
// Um único modal genérico (#gameBackdrop): o módulo do jogo desenha o próprio
// título dentro de #gameBody; fechar destrói o jogo (timers/listeners).
let memoryGame = null;
let dictationUi = null;
let penaltyGame = null;
let wordsGame = null;
let listenGame = null;

// A fábrica local mantém o construtor fora do fluxo do jogo: navegadores
// expõem o Recognition com nomes diferentes e, sem suporte, devolvemos null
// para o módulo oferecer a digitação.
function createListenRecognizer() {
  const Recognition = globalThis.SpeechRecognition || globalThis.webkitSpeechRecognition;
  if (typeof Recognition !== 'function') return null;
  try {
    return new Recognition();
  } catch {
    return null;
  }
}

// O módulo aceita uma fonte injetável; esta função deixa a escolha do alvo
// concentrada neste fluxo sem espalhar chamadas de Math.random pelo mundo.
function listenRandom() {
  return Math.random();
}

// vocabulário do cenário: as âncoras do mundo (addInteract em world.js) têm o
// id words<Zona>; o painel em si é o spot homônimo em games/words.js
const WORDS_SPOT_BY_INTERACTION = Object.freeze({
  wordsSchool: 'school',
  wordsWoods: 'woods',
  wordsHighStreet: 'highstreet',
  wordsClassroom: 'classroom',
  wordsAcademy: 'academy',
});

function openGameModal() {
  $('gameBackdrop').classList.remove('hidden');
  openModal('gameBackdrop');
}

function closeGame() {
  $('gameBackdrop').classList.add('hidden');
  closeModal('gameBackdrop');
  if (memoryGame) { memoryGame.destroy(); memoryGame = null; }
  if (dictationUi) { dictationUi.destroy(); dictationUi = null; }
  if (penaltyGame) { penaltyGame.destroy(); penaltyGame = null; }
  if (wordsGame) { wordsGame.destroy(); wordsGame = null; }
  if (listenGame) { listenGame.destroy(); listenGame = null; }
  $('gameBody').replaceChildren();
}

// memória da biblioteca: palavras do diário da Julia em cartas emoji
const MEMORY_ITEMS = [
  { emoji: '📖', en: 'book', pt: 'livro', es: 'libro' },
  { emoji: '✏️', en: 'pencil', pt: 'lápis', es: 'lápiz' },
  { emoji: '🎒', en: 'bag', pt: 'mochila', es: 'mochila' },
  { emoji: '⭐', en: 'star', pt: 'estrela', es: 'estrella' },
  { emoji: '🌳', en: 'tree', pt: 'árvore', es: 'árbol' },
  { emoji: '🦉', en: 'owl', pt: 'coruja', es: 'búho' },
];

function openMemoryLibrary() {
  closeGame();
  openGameModal();
  memoryGame = createMemoryGame({
    container: $('gameBody'),
    items: MEMORY_ITEMS,
    lang: language,
    onWin: ({ words }) => {
      state.flags.memoryDone = true;
      // recompensa: até 3 palavras das cartas entram no diário (se novas)
      for (const item of words.slice(0, 3)) {
        if (!state.words[item.en]) registerWordTracked(item.en, GLOSSES[item.en]);
      }
      saveState(localStorage, player, state);
      sounds.magic();
      confetti(root, 90);
      checkAchievements();
      updateHUD();
    },
  });
}

// ditados escondidos: interactable → frase (DICTATION_FLAGS traduz frase→flag)
const DICTATION_SPOTS = { greenChain: 'dictWoods', postOffice: 'dictLetter', severndroog: 'dictCastle' };

// devolve true se abriu o ditado (o chamador NÃO roda o FLAVOR do ponto)
function tryDictation(spotId) {
  const phrase = DICTATION_PHRASES.find((p) => p.id === DICTATION_SPOTS[spotId]);
  if (!phrase) return false;
  if (state.flags[DICTATION_FLAGS[phrase.id]]) return false;
  closeGame();
  openGameModal();
  dictationUi = createDictation({
    container: $('gameBody'),
    phrase,
    lang: language,
    onDone: ({ phraseId }) => {
      state.flags[DICTATION_FLAGS[phraseId]] = true;
      registerWordTracked(phrase.journal, GLOSSES[phrase.journal]);
      saveState(localStorage, player, state);
      sounds.magic();
      confetti(root, 70);
      checkAchievements();
      updateHUD();
      // o ditado da torre é o passo final do capítulo 2: emendar direto no fim
      setTimeout(() => {
        closeGame();
        if (spotId === 'severndroog') void interact('severndroog');
      }, 1500);
    },
  });
  return true;
}

async function interact(id) {
  if (id === 'finch' || id === 'page') {
    // Capítulo 2: a Sra. Page oferece "O Segredo da Biblioteca" antes do fluxo dela
    if (id === 'page' && (await maybeChapter2(id))) return;
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
        // via registerWordTracked: o guarda-chuva também conta pro histórico e
        // pode fechar um limiar de palavras — um registerWord cru perderia os dois
        registerWordTracked('umbrella', GLOSSES.umbrella);
        registerWordTracked('grateful', GLOSSES.grateful);
        saveState(localStorage, player, state);
        sounds.magic();
        confetti(root, 80);
        updateHUD();
        checkAchievements();
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
    // Palavras de sala de aula, todas com glossário trilíngue real: a lição
    // antigo usava definições improvisadas que ficavam só em português dentro
    // de um diário que a criança pode ler em inglês ou espanhol.
    const LESSON = [
      { en: 'teacher', emoji: '🧑‍🏫', pt: 'quem ensina' },
      { en: 'student', emoji: '🧒', pt: 'estudante' },
      { en: 'class', emoji: '👫', pt: 'turma' },
      { en: 'book', emoji: '📖', pt: 'livro' },
      { en: 'pencil', emoji: '✏️', pt: 'lápis' },
      { en: 'bag', emoji: '🎒', pt: 'mochila' },
      { en: 'read', emoji: '👀', pt: 'ler' },
      { en: 'write', emoji: '✍️', pt: 'escrever' },
      { en: 'question', emoji: '❓', pt: 'pergunta' },
      { en: 'child', emoji: '🧒', pt: 'criança' },
      { en: 'tree', emoji: '🌳', pt: 'árvore' },
      { en: 'star', emoji: '⭐', pt: 'estrela' },
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
        // Capítulo 2, fragmento 1: a lição completa rende a estrela da lousa
        if (state.flags.ch2Started && !state.flags.ch2Q1Board) {
          state.flags.ch2Q1Board = true;
          maybeChapter2Fragment();
        }
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
          if (!state.words[lesson.en]) registerWordTracked(lesson.en, GLOSSES[lesson.en]);
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
      openModal('quizBackdrop');
    };
    return void nextLesson();
  }
  if (id === 'willow') {
    // Capítulo 2: lenda da torre + oferta da missão da lousa
    if (await maybeChapter2(id)) return;
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
    // Capítulo 2: "A Carta sem Endereço" começa no Sr. Crumb
    if (await maybeChapter2(id)) return;
    return void runConversation([
      { who: 'baker', text: { pt: 'Bem-vindas à padaria da High Street! O pão de canela sai quentinho às cinco.', en: 'Welcome to the High Street bakery! The cinnamon buns come out warm at five.', es: '¡Bienvenidas a la panadería de High Street! El pan de canela sale calentito a las cinco.' } },
      { gloss: 'warm' },
    ]);
  }
  if (id === 'raven') {
    // Capítulo 2: "O Duelo da Estrela" começa na Prof. Raven
    if (await maybeChapter2(id)) return;
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
  if (id === 'postOffice') {
    // ditado escondido do correio (capítulo 2, fragmento 3; jogável sempre)
    if (tryDictation(id)) return;
    sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.postOffice }, { gloss: 'letter' }]);
  }
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
  // nesta peça a criança fala a palavra em inglês; a âncora fica no mesmo
  // pátio do parquinho, sem criar outro painel de vocabulário na escola.
  if (id === 'listenSchool') {
    // state.zone já vem normalizado para um dos ids de LISTEN_SPOTS (school,
    // woods, highstreet, classroom ou academy), então a âncora da escola nunca
    // fica sem alvo.
    const listenTarget = getListenTarget(state.zone, language, listenRandom);
    if (!listenTarget) {
      sounds.hoot();
      return void runConversation([{ who: 'owl', text: FLAVOR.playground }]);
    }
    sounds.hoot();
    closeGame();
    openGameModal();
    listenGame = createListen({
      container: $('gameBody'),
      lang: language,
      target: listenTarget,
      speech: globalThis.speechSynthesis,
      createRecognizer: createListenRecognizer,
      onDone: ({ passed, stars }) => {
        const word = listenTarget.word;
        if (passed) markRight(word); else markWrong(word);
        if (passed) {
          // A palavra da peça tem glosa no próprio módulo; o diário precisa da
          // entrada correspondente em GLOSSES. Onde ela existe, a palavra entra
          // no diário; o acerto também conta no histórico de estudo.
          const gloss = GLOSSES[word];
          if (gloss) registerWordTracked(word, gloss);
        }
        saveState(localStorage, player, state);
        if (passed) {
          sounds.magic();
          confetti(root, 20 + stars * 20);
        } else {
          sounds.wrong();
        }
        // markRight, markWrong e registerWordTracked já avaliaram conquistas;
        // aqui é só a festa e a atualização da HUD.
        updateHUD();
      },
      onClose: closeGame,
      reduceMotion,
    });
    if (!listenGame) closeGame();
    return;
  }
  // vocabulário do cenário: tocar no parquinho, na beira da mata, na rua, na
  // mesa da sala ou na varanda da academia abre um painel com 4 palavras
  // daquele lugar. A criança revela a tradução, ouve a palavra e guarda no
  // diário só o que ela realmente tocou.
  const wordsSpotId = WORDS_SPOT_BY_INTERACTION[id];
  const wordsSpot = wordsSpotId ? spotById(wordsSpotId) : null;
  if (wordsSpotId && wordsSpot) {
    closeGame();
    openGameModal();
    wordsGame = createWords({
      container: $('gameBody'),
      lang: language,
      spot: wordsSpot,
      speech: globalThis.speechSynthesis,
      onDone: ({ words }) => {
        // Uma palavra sem glosa não entra no diário (registerWordTracked
        // ignoraria) e não conta como descoberta: só o que foi mesmo salvo
        // recebe som e confete. O número volta para o painel, que só anuncia
        // "guardado" quando houve gravação de verdade.
        let saved = 0;
        for (const word of words) {
          if (GLOSSES[word] && !state.words[word] && registerWordTracked(word, GLOSSES[word])) saved += 1;
        }
        saveState(localStorage, player, state);
        if (saved > 0) {
          // registerWordTracked já avança as conquistas; aqui é só a festa.
          sounds.magic();
          confetti(root, 30 + saved * 8);
        }
        updateHUD();
        return saved;
      },
      onClose: closeGame,
    });
    // Spot ou container recusado: nada foi montado, então fecha o modal em vez
    // de deixar um painel vazio na frente da cena.
    if (!wordsGame) closeGame();
    return;
  }
  // campo de futebol dos fundos: era só uma conversa da coruja — a menina
  // chegava, pedia pra jogar e não tinha NADA pra jogar. Agora é o minigame
  // de pênaltis (5 cobranças, 3 zonas, palavra de futebol a cada gol/defesa).
  if (id === 'field') {
    sounds.hoot();
    await runConversation([{ who: 'owl', text: FLAVOR.field }, { gloss: 'pitch' }]);
    if (dialogAborted) return;
    closeGame();
    openGameModal();
    penaltyGame = createPenalty({
      container: $('gameBody'),
      lang: language,
      onDone: ({ goals, words }) => {
        state.flags.penaltyPlayed = true;
        for (const word of words.slice(0, 3)) {
          if (!state.words[word]) registerWordTracked(word, GLOSSES[word]);
        }
        saveState(localStorage, player, state);
        sounds.magic();
        confetti(root, 60 + goals * 12);
        checkAchievements();
        updateHUD();
      },
    });
    return;
  }
  if (id === 'woodCafe') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.cafe }, { gloss: 'meadow' }, { gloss: 'hill' }]); }
  if (id === 'severndroog') {
    // Capítulo 2: 1º a última frase do ditado; com os 4 fragmentos, o fim
    if (tryDictation(id)) return;
    if (await maybeChapter2Ending()) return;
    sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.severndroog }, { gloss: 'castle' }]);
  }
  if (id === 'pond') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.pond }, { gloss: 'pond' }]); }
  if (id === 'greenChain') {
    // ditado da placa do Green Chain (capítulo 2, fragmento 4; jogável sempre)
    if (tryDictation(id)) return;
    sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.greenChain }, { gloss: 'path' }]);
  }
  if (id === 'outdoorGym') { sounds.hoot(); return void runConversation([{ who: 'owl', text: FLAVOR.outdoorGym }, { gloss: 'climb' }]); }
  // memória da biblioteca (capítulo 2, fragmento 2; jogável sempre)
  if (id === 'memoryLibrary') return void openMemoryLibrary();
  // o globo da biblioteca: Malta tem lugar garantido no mapa
  if (id === 'globe') {
    sounds.hoot();
    globeFocus = true;
    return void runConversation([
      { who: 'owl', text: {
        pt: 'Está vendo a ilhinha com o anel dourado? Essa é MALTA — no meio do Mediterrâneo, entre a Europa e a África! Ela está no nosso globo para sempre. 🇲🇹',
        en: 'See the little island with the golden ring? That is MALTA — right in the middle of the Mediterranean, between Europe and Africa! It is on our globe forever. 🇲🇹',
        es: '¿Ves la isleta con el anillo dorado? ¡Esa es MALTA — en medio del Mediterráneo, entre Europa y África! Está en nuestro globo para siempre. 🇲🇹',
      } },
      { who: 'owl', text: {
        pt: 'Quem procura, acha: o mundo é grande, mas cabe inteirinho num globo. Um dia a gente visita Malta, quem sabe?',
        en: 'Seek and you shall find: the world is huge, but it all fits on a globe. Maybe one day we will visit Malta!',
        es: 'El que busca, encuentra: el mundo es enorme, pero cabe entero en un globo. ¡Quizá un día visitemos Malta!',
      } },
    ]).then(() => { globeFocus = false; });
  }
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
      registerWordTracked('pitch', GLOSSES.pitch);
      confetti(root, 50);
      updateHUD();
      checkAchievements();
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
      navGrid = buildNavGrid(zone, { radius: PLAYER_RADIUS }); // riacho sem collider: dá para voltar pelo leito
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
// câmera orbital: arraste na tela gira (camYaw), inclina (camPitch — arrastar
// pra cima abaixa a câmera e mostra os rostos) e pinça/scroll dá zoom
// (camZoom). CAM_R é a distância base.
let camYaw = 0;
let camZoom = 1;
let camPitch = 0.55; // rad; arraste vertical ajusta — baixo = vê os rostos
const CAM_R = 11.2; // distância base da câmera (× camZoom)
const CAM_PITCH_MIN = 0.22; // ~13°: quase atrás da jogadora
// ~72°: o ângulo "de cima, olhando o mapa" do RPG. Antes era 1.05 (~60°) porque
// inclinar forte encostava a câmera no teto indoor; com o fade de paredes isso
// acabou e a visão de mapa pode ser inclinada de verdade.
const CAM_PITCH_MAX = 1.25;
// zoom REAL nos dois extremos agora que o fade garante que a câmera chega lá:
// 0.14 × fit ~1.96 do celular em pé bate no piso do produto (CAM_DIST_PRODUCT_MIN)
// → ~3 m de perto (o close que a Julia já gosta, sem colar na nuca); 1.8 no
// desktop (fit = 1) → ~20 m de visão RPG de longe, e no celular o teto do
// produto (2.6) entrega até ~29 m.
const CAM_ZOOM_MIN = 0.14;
const CAM_ZOOM_MAX = 1.8;
const lookTarget = new THREE.Vector3();

// ── o que está entre a jogadora e a câmera é ESMAECIDO, não corta mais ───────
// Raycast contra as malhas reais da zona (occluders, montado no buildScene):
// colliders 2D não conhecem telhado/beiral, então o raio é contra a geometria
// de verdade. Antes, o primeiro hit puxava a câmera para ~1.6 m da nuca — e
// indoor era o tempo todo, então o zoom-out nunca funcionava dentro da escola.
// Agora a câmera vai SEMPRE à posição desejada e o fader deixa translúcido o
// que estiver na frente (src/occlusion.js): visão de RPG de longe sem parede
// ou mesa bloqueando a tela.
const CAM_OCCLUDER_MIN_RADIUS = 1.6; // só malha grande (estrutura) vira fantasma
let globeFocus = false; // diálogo do globo aberto → câmera faz close no planeta
const cameraRay = new THREE.Raycaster();
let occluders = [];
let lastCamHit = null; // debug: o que o raio encontrou por último (QA usa)
const fader = createOcclusionFader({
  // Raycaster único e `far` por chamada para não varrer além da câmera (o
  // fader chama 5× por frame: cone central + 4 paralelos). `occluders` é let:
  // os closures leem sempre a lista da zona atual.
  raycast: (origin, direction, far) => {
    cameraRay.set(origin, direction);
    cameraRay.far = far;
    return cameraRay.intersectObjects(occluders, false);
  },
  now: () => performance.now(),
  occluders: () => occluders,
});

// Relatório do que a câmera bateu, montado só quando o QA chama camHit():
// formatar strings e arrays dentro do animate custava caro justamente no
// caso indoor, que fica clipado por vários frames seguidos.
function describeCamHit(hit) {
  if (!hit) return null;
  const object = hit.object;
  if (object.geometry && !object.geometry.boundingSphere) object.geometry.computeBoundingSphere();
  let instPos = null;
  if (hit.instanceId != null && object.getMatrixAt) {
    // getMatrixAt escreve no argumento e NÃO devolve a matriz (three.js):
    // encadear o retorno quebrava o animate inteiro.
    const matrix = new THREE.Matrix4();
    object.getMatrixAt(hit.instanceId, matrix);
    instPos = new THREE.Vector3().setFromMatrixPosition(matrix).toArray().map((n) => +n.toFixed(2));
  }
  return {
    d: +hit.distance.toFixed(2),
    name: object.name || '(sem nome)',
    geo: object.geometry?.type,
    mat: object.material?.type,
    at: hit.point.toArray().map((n) => +n.toFixed(2)),
    obj: object.getWorldPosition(new THREE.Vector3()).toArray().map((n) => +n.toFixed(2)),
    scale: object.scale.toArray().map((n) => +n.toFixed(2)),
    inst: hit.instanceId ?? null,
    parent: object.parent?.name || '(sem pai)',
    type: object.type,
    bsphere: +(object.geometry?.boundingSphere?.radius ?? 0).toFixed(2),
    instPos,
  };
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, clock.getDelta());
  const t = clock.elapsedTime;

  // movimento: teclado (relativo à câmera) OU destino do toque (click-to-move)
  if (overlayCount > 0 && moveTarget) stopWalking(); // diálogo/menu aberto: desiste do destino
  const [inputX, inputY] = overlayCount > 0 ? [0, 0] : inputVector();
  const keyboard = Math.hypot(inputX, inputY) > 0.05;
  let dx = 0;
  let dz = 0;
  let running = false;
  let moving = keyboard;
  if (keyboard) {
    stopWalking(); // teclado assume o controle
    // relativo à câmera: "cima" anda pra longe dela em qualquer rotação
    // (rotação do vetor de input por -camYaw; o sinal aqui é o que faz
    // "cima" apontar pro horizonte — invertido, virava em direção à câmera a 90°)
    const cy = Math.cos(camYaw);
    const sy = Math.sin(camYaw);
    running = Math.hypot(inputX, inputY) > 0.92; // teclas no máximo
    const speed = 3.8 * (running ? 1.55 : 1);
    dx = (inputX * cy + inputY * sy) * speed * dt;
    dz = (-inputX * sy + inputY * cy) * speed * dt;
  } else if (moveTarget && playerObj && navPath.length) {
    // alvo do frame = waypoint atual; quando chega perto, passa ao próximo
    let waypoint = navPath[navIndex] || moveTarget;
    let toGoal = Math.hypot(moveTarget.x - playerObj.position.x, moveTarget.z - playerObj.position.z);
    if (Math.hypot(waypoint.x - playerObj.position.x, waypoint.z - playerObj.position.z) < 0.35) {
      if (navIndex < navPath.length - 1) { navIndex += 1; waypoint = navPath[navIndex]; }
      else { stopWalking(); waypoint = null; }
    }
    if (waypoint) {
      running = toGoal > 3; // longe = corre, chegando perto = caminha
      const speed = 3.8 * (running ? 1.55 : 1);
      const tx = waypoint.x - playerObj.position.x;
      const tz = waypoint.z - playerObj.position.z;
      const dist = Math.max(0.0001, Math.hypot(tx, tz));
      const step = Math.min(dist, speed * dt);
      dx = (tx / dist) * step;
      dz = (tz / dist) * step;
      moving = true;
    }
  }

  if (playerObj) {
    let [nx, nz] = moveWithCollision(playerObj.position.x, playerObj.position.z, dx, dz);
    let walked = Math.hypot(nx - playerObj.position.x, nz - playerObj.position.z);

    // desvio local: batendo de frente, tenta contornar em ±35° e ±70° antes de
    // qualquer outra coisa (rede de segurança do A*, para quinas apertadas)
    if (moveTarget && walked < 0.001 && (dx || dz)) {
      const angle = Math.atan2(dx, dz);
      for (const turn of [0.6, -0.6, 1.2, -1.2, 2.1, -2.1]) {
        const ax = Math.sin(angle + turn);
        const az = Math.cos(angle + turn);
        const [tx2, tz2] = moveWithCollision(playerObj.position.x, playerObj.position.z, ax * 0.06, az * 0.06);
        if (Math.hypot(tx2 - playerObj.position.x, tz2 - playerObj.position.z) > 0.001) {
          nx = tx2;
          nz = tz2;
          walked = Math.hypot(nx - playerObj.position.x, nz - playerObj.position.z);
          break;
        }
      }
    }
    // preso dentro de um objeto (empurrada, bounce de saída): sai pro ponto livre mais próximo
    if (navGrid && !canStand(navGrid, playerObj.position.x, playerObj.position.z)) {
      const free = nearestStandPoint(navGrid, playerObj.position.x, playerObj.position.z);
      if (free) {
        nx = free.x;
        nz = free.z;
        walked = Math.hypot(nx - playerObj.position.x, nz - playerObj.position.z);
      }
    }
    playerObj.position.set(nx, 0, nz);

    if (moveTarget) {
      if (walked < 0.001) {
        targetStuck += dt;
        // 0,6s sem progresso: tenta uma rota nova a partir daqui. Se nem assim
        // der (cercado de verdade), desiste com aviso em vez de congelar.
        if (targetStuck > 0.6) {
          repathTries += 1;
          const path = repathTries <= 2 ? routeTo(moveTarget) : null;
          if (path) {
            navPath = path;
            navIndex = path.length > 1 ? 1 : 0;
            targetStuck = 0;
          } else {
            stopWalking();
            sounds.wrong();
            toast(root, uiText(language, 'noPath'), { duration: 2200 });
          }
        }
      } else {
        targetStuck = 0;
      }
      // chegou no destino final: some com o anel
      if (moveTarget && Math.hypot(moveTarget.x - playerObj.position.x, moveTarget.z - playerObj.position.z) < 0.25) stopWalking();
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
    // Movimento reduzido: o laçoanimate() NÃO pode parar — ele carrega o
    // movimento, o click-to-move, a câmera, a detecção de saída, o
    // showEnding() e o composer.render(). Só o enfeite é desligado.
    const animSpeed = reduceMotion ? 0 : (moving ? (running ? 2 : 1) : 0);
    playerObj.userData.animate?.(t, animSpeed);

    // coruja fiel orbita a cabeça da jogadora — enfeite puro
    const owlAngle = reduceMotion ? 0.6 : t * 1.5;
    owlObj.position.set(
      playerObj.position.x + Math.cos(owlAngle) * 0.85,
      1.85 + (reduceMotion ? 0 : Math.sin(t * 2.2) * 0.1),
      playerObj.position.z + Math.sin(owlAngle) * 0.85
    );
    owlObj.rotation.y = -owlAngle + Math.PI / 2;
    owlObj.userData.animate?.(t, reduceMotion ? 0 : (moving ? 1 : 0));

    // irmã/irmão acompanha por perto (spec §2) — corre se estiver muito longe
    const distanceToPlayer = companionObj.position.distanceTo(playerObj.position);
    if (distanceToPlayer > 1.05) {
      const direction = playerObj.position.clone().sub(companionObj.position).normalize();
      const companionRunning = distanceToPlayer > 3;
      const step = Math.min(distanceToPlayer - 0.95, (companionRunning ? 7 : 4.6) * dt);
      companionObj.position.addScaledVector(direction, step);
      companionObj.rotation.y = Math.atan2(direction.x, direction.z);
      companionObj.userData.animate?.(t, reduceMotion ? 0 : (companionRunning ? 2 : 1));
    } else {
      companionObj.userData.animate?.(t, 0);
    }
    companionOwl.userData.animate?.(t, reduceMotion ? 0 : (distanceToPlayer > 2));

    // NPCs IA: atualiza o AnimationMixer (idle) de cada um
    for (const id of Object.keys(npcs)) {
      npcs[id]?.userData.animate?.(t, 0);
    }

    // câmera orbital esférica: yaw (arraste horizontal), pitch (arraste
    // vertical — baixo = mais perto do chão, vê os rostos) e zoom (pinça/scroll,
    // botões +/− do HUD). CAM_R é a distância base, multiplicada pelo zoom e
    // pelo ajuste de enquadramento da tela estreita.
    const fit = cameraFit(camera.aspect);
    const dist = cameraDistance(CAM_R, fit, camZoom);
    const horiz = dist * Math.cos(camPitch);
    const off = new THREE.Vector3(
      Math.sin(camYaw) * horiz,
      dist * Math.sin(camPitch),
      Math.cos(camYaw) * horiz
    );
    const desiredCam = new THREE.Vector3().copy(playerObj.position).add(off);
    const head = new THREE.Vector3(playerObj.position.x, 0.6, playerObj.position.z);
    // corte de camada (diorama de cima): pitch de brincar (0.55) NÃO corta
    // teto nenhum — sem raio-x surpresa em ângulo baixo; só quando a criança
    // inclina para baixo de verdade (~52°) ou afasta além de ~20 m é que a
    // camada entre ela e a câmera sobe como fantasma (o fade de raio só, com
    // o telhado cobrindo o mapa, era a "fresta de raio-x" que o QA fotografou)
    const layerCut = camPitch >= 0.9 || dist >= 20;
    // o fade roda TODO frame (é ele que decide o que é fantasma); no close do
    // globo fica desligado, porque o raycast cabeça→câmera não é o que manda
    // no enquadramento ali — e esmaecer/restaurar naquele frame era mentira
    const occlusion = fader.update({ head, desired: desiredCam, enabled: !(globeFocus && zone.globe), layerCut });
    lastCamHit = occlusion.firstHit; // relatório formatado só em camHit(), sob demanda
    if (globeFocus && zone.globe) {
      // close no planeta enquanto a coruja fala de Malta
      const g = zone.globe.position;
      camera.position.lerp(new THREE.Vector3(g.x + 0.7, g.y + 0.26, g.z + 0.8), 1 - Math.exp(-dt * 3.5));
    } else if (occlusion.blocked) {
      // único resto do corte: cabeça dentro/em cima da geometria (spawn em
      // quina) — a câmera encosta na menina, a única posição que com certeza
      // não atravessa nada. Sai de lá sozinha no frame em que a geometria
      // deixar de estar colada nela.
      camera.position.copy(head);
    } else {
      // o desired de VOLTA já vem ajustado pelo anti-embebimento (encurtado
      // quando a ponta ia estacionar dentro de laje/telhadura). Objeto {x,y,z}
      // simples serve: o lerp do three só lê x/y/z.
      camera.position.lerp(occlusion.desired, 1 - Math.exp(-dt * 5));
    }
    // FOV fixo em 50 (o da criação da câmera): com o fade não existe mais
    // "braço cortado", então nada aperta o campo de visão para disfarçar.
    if (globeFocus && zone.globe) {
      const g = zone.globe.position;
      lookTarget.set(g.x, g.y + 0.04, g.z);
    } else {
      lookTarget.set(playerObj.position.x, 0.6, playerObj.position.z);
    }
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
    clickMarker.scale.setScalar(reduceMotion ? 1 : 1 + 0.15 * Math.sin(t * 6));
  }
  }

  // os botões de zoom saem da frente de diálogo/modal (no celular o painel
  // ocupa a tela toda e os botões ficariam por cima do texto)
  const zoomUi = $('camZoom');
  const zoomHidden = overlayCount > 0 || openModalStack.isOpen();
  if (zoomUi && zoomUi.classList.contains('hidden') !== zoomHidden) {
    zoomUi.classList.toggle('hidden', zoomHidden);
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
  // Rótulos acessíveis são um canal separado: o texto visível de um botão de
  // ícone é o próprio emoji, então quem usa leitor de tela depende inteiramente
  // do aria-label — deixá-lo em português fixo silenciaria en/es.
  for (const node of document.querySelectorAll('[data-i18n-aria]')) {
    node.setAttribute('aria-label', uiText(language, node.dataset.i18nAria, ariaVars(node)));
  }
  // <html lang> governa pronúncia do leitor de tela e o corretor ortográfico;
  // sem isso a página inteira seria anunciada como português nos outros idiomas.
  document.documentElement.lang = language;
}

// Variáveis dos rótulos acessíveis. O HTML declara valores padrão em
// data-i18n-vars (JSON); aqui eles são atualizados com o estado real, porque
// idioma atual e revisões pendentes só existem em tempo de execução.
function ariaVars(node) {
  let vars = {};
  try {
    vars = JSON.parse(node.dataset.i18nVars || '{}') || {};
  } catch {
    vars = {};
  }
  if (node.id === 'langButton') vars.lang = language.toUpperCase();
  if (node.id === 'hintButton') vars.n = dueWords(state.words).length;
  return vars;
}

// O som é o único controle com chave dependente do estado (ligado/desligado),
// então ele não cabe no passe genérico de data-i18n-aria.
function refreshDynamicAria() {
  const sound = $('soundButton');
  if (sound) {
    sound.setAttribute('aria-pressed', String(Boolean(state.sound)));
    sound.setAttribute('aria-label', uiText(language, state.sound ? 'soundOn' : 'soundOff'));
  }
  for (const node of document.querySelectorAll('[data-i18n-aria]')) {
    if (node.id === 'langButton' || node.id === 'hintButton') {
      node.setAttribute('aria-label', uiText(language, node.dataset.i18nAria, ariaVars(node)));
    }
  }
}

// barra da tela de carregamento (0–100% dos GLB)
let bootProgressPct = 0;
function setBootProgress(ratio) {
  const nextPct = Math.round(Math.max(0, Math.min(1, ratio)) * 100);
  const pct = Math.max(bootProgressPct, nextPct);
  bootProgressPct = pct;
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
  // preferências da tela de opções: escala de texto no root do jogo E no body
  // (os painéis modais são irmãos de #rpg, então o dataset precisa estar nos dois)
  applyTextScale(normalizeSettings(state.settings));
  setAmbienceEnabled(state.settings?.ambience !== false);
  renderOptions();
  applyStaticI18n();
  refreshDynamicAria();
  ensureAudio();
  window.addEventListener('pointerdown', () => ensureAudio(), { once: true });
  updateHUD();

  // O núcleo de GLBs baixa EM PARALELO com a escolha de personagem (22,8MB);
  // a tela de carregamento fica em z-40, atrás do select (z-60), e some quando acaba
  const corePreload = preloadCoreModels();
  if (!state.character) state.character = await chooseCharacter();
  saveState(localStorage, player, state);

  // backfill silencioso: quem jogou antes das conquistas precisa receber o que
  // já ganhou, senão a lista ficaria vazia para sempre. Silencioso porque 18
  // toasts de uma vez cobririam a tela na abertura.
  checkAchievements({ silent: true });

  try {
    await Promise.all([corePreload, preloadZoneModels(state.zone)]);
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
    overlayCount += 1;
    await new Promise((resolve) => {
      storybook(root, STORY_PANELS.map((panel) => ({ ...panel, text: lang(panel.text, language) })), {
        next: uiText(language, 'next'),
        skip: uiText(language, 'skip'),
        done: uiText(language, 'start'),
        onDone: resolve,
      });
    });
    overlayCount = Math.max(0, overlayCount - 1);
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
    path: navPath.map((p) => [+p.x.toFixed(2), +p.z.toFixed(2)]),
    pathIndex: navIndex,
    cooldown: Math.max(0, (exitAllowedAt - performance.now()) / 1000),
    gateOpen: Boolean(state.flags.gateOpen),
    exits: zone?.exits,
    lastGoal: lastGoal && { x: +lastGoal.x.toFixed(2), z: +lastGoal.z.toFixed(2) },
    colliders: zone?.colliders?.length,
    // QA de conectividade: com as caixas em mãos dá para remontar a grade do
    // A* no navegador e inundar a partir do spawn, sem instrumentar o jogo.
    colliderBoxes: () => zone?.colliders?.map((c) => [+c.minX.toFixed(2), +c.minZ.toFixed(2), +c.maxX.toFixed(2), +c.maxZ.toFixed(2)]),
    cameraPos: () => camera.position.toArray().map((n) => +n.toFixed(2)),
    camHit: () => describeCamHit(lastCamHit),
    camFov: () => +camera.fov.toFixed(2),
    occluders: () => occluders.length,
    // QA do fade: quantos meshes estão de fantasma agora (e quais) — é o que
    // responde "por que estou vendo através da parede?" num playtest
    fadedCount: () => fader.fadedCount(),
    fadedNames: () => fader.fadedNames(),
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
