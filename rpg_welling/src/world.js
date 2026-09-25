// RPG Welling — cenas 3D (three.js), estilizadas com clima das artes de
// conceito: luz dourada, sombras, texturas pintadas (canvas) e brilhos
// aditivos. Low-poly intencional: leve para tablet (spec Partes E/F).

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

// ── cache de modelos GLB (carregados sob demanda) ─────────────────────────────
const gltfLoader = new GLTFLoader();
const glbScenes = new Map(); // filename → {scene, animations} (preenchido pelos preloads)
const ASSETS = './assets/';

// progresso global do carregamento: o GLTFLoader usa o LoadingManager padrão
// do three.js, então todos os GLB (e texturas) contam no mesmo contador
let modelProgressCb = null;
export function onModelProgress(cb) {
  const previous = modelProgressCb;
  modelProgressCb = cb;
  return previous;
}
THREE.DefaultLoadingManager.onProgress = (_url, loaded, total) => {
  if (total) modelProgressCb?.(loaded / total);
};
THREE.DefaultLoadingManager.onLoad = () => modelProgressCb?.(1);

// A promessa entra no cache antes de qualquer segundo pedido, inclusive quando
// a requisição falha: o resultado continua unívoco durante toda a sessão.
export function createGlbCache(loadOne) {
  const promises = new Map();
  return function cachedLoad(filename) {
    if (!promises.has(filename)) {
      let resolvePromise;
      let rejectPromise;
      const promise = new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
      });
      promises.set(filename, promise);
      try {
        resolvePromise(loadOne(filename));
      } catch (error) {
        rejectPromise(error);
      }
    }
    return promises.get(filename);
  };
}

function loadGlbOnce(filename) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      ASSETS + filename,
      (gltf) => resolve({ scene: gltf.scene, animations: gltf.animations || [] }),
      undefined,
      (err) => reject(err),
    );
  });
}

export const loadGlb = createGlbCache(loadGlbOnce);

// Este catálogo é a única fonte dos nomes GLB: consumo e preloading precisam
// permanecer sincronizados sem repetir literais em funções diferentes.
export const MODEL_FILES = Object.freeze({
  core: Object.freeze(Object.assign(Object.create(null), {
    ivy: 'ivy-rigged.glb',
    oakley: 'oakley-rigged.glb',
    owl: 'owl.glb',
    npc: 'npc.glb',
    animatedKid: 'kid-animated.glb',
  })),
  adults: Object.freeze(Object.assign(Object.create(null), {
    finch: 'finch-rigged.glb',
    page: 'page-rigged.glb',
    baker: 'crumb-rigged.glb',
    raven: 'raven-rigged.glb',
    willow: 'willow-rigged.glb',
  })),
  props: Object.freeze(Object.assign(Object.create(null), {
    books: 'books.glb',
    trees: 'trees.glb',
    bush: 'bush.glb',
    chest: 'chest.glb',
  })),
});

// O núcleo aparece em toda zona; NPCs e props são carregados só na entrada da
// zona para não bloquear o primeiro quadro com o mapa inteiro.
export const CORE_MODEL_FILES = Object.freeze(Object.values(MODEL_FILES.core));

export const ZONE_MODEL_FILES = Object.freeze(Object.assign(Object.create(null), {
  school: [MODEL_FILES.adults.finch, MODEL_FILES.adults.page, MODEL_FILES.props.books, MODEL_FILES.props.trees],
  highstreet: [MODEL_FILES.adults.baker],
  academy: [MODEL_FILES.adults.raven],
  classroom: [MODEL_FILES.adults.willow],
  woods: [MODEL_FILES.props.trees, MODEL_FILES.props.bush, MODEL_FILES.props.chest],
}));

export const ALL_MODEL_FILES = Object.freeze([
  ...new Set([...CORE_MODEL_FILES, ...Object.values(ZONE_MODEL_FILES).flat()]),
]);

// Após o await, glbScenes fica disponível para a instanciação síncrona. Como
// loadGlb memoriza a promessa, repetir o preload não repete o download.
async function preloadFiles(files, source) {
  const results = await Promise.allSettled(files.map(loadGlb));
  files.forEach((file, i) => {
    const result = results[i];
    if (result.status === 'fulfilled') glbScenes.set(file, result.value);
    else console.warn(`${source}: falha ao carregar ${file}`, result.reason);
  });
}

export function preloadCoreModels() {
  return preloadFiles(CORE_MODEL_FILES, 'preloadCoreModels');
}

export function preloadZoneModels(zoneName) {
  const files = typeof zoneName === 'string'
    && Object.prototype.hasOwnProperty.call(ZONE_MODEL_FILES, zoneName)
    ? ZONE_MODEL_FILES[zoneName]
    : [];
  return preloadFiles(files, 'preloadZoneModels');
}

// Helper: retorna o bundle {scene, animations} do GLB cacheado, ou null se preload falhou.
function glbSource(filename) {
  return glbScenes.get(filename) || null;
}

// ── instanciação (roadmap 3.2) ───────────────────────────────────────────────
// Clonar o mesmo GLB N vezes custa N draw calls POR primitiva (o pack de
// árvores tem 6 primitivas — ~70 clones passavam de 400 draw calls só de
// mata). Um InstancedMesh por primitiva desenha todas as cópias em 1 draw
// call cada, com a matriz EXATA que cada clone tinha: instância = T·R·S da
// cópia aplicado ANTES da matriz que o mesh já tinha dentro do GLB.
// Referência do padrão no arquivo: buildFacadeWindows.
function instantiateGlb(scene, src, instances) {
  if (!src || !instances.length) return null;
  src.scene.updateMatrixWorld(true);
  const parts = [];
  let simple = true;
  src.scene.traverse((node) => {
    if (!node.isMesh) return;
    // skinned/morph precisam de mais que uma matriz por instância: fora do
    // alcance desta troca, o chamador mantém o caminho de clone individual
    if (node.isSkinnedMesh || (node.morphTargetInfluences?.length || 0) > 0) simple = false;
    parts.push({ geometry: node.geometry, material: node.material, base: node.matrixWorld.clone() });
  });
  if (!simple || !parts.length) return null;
  const tmp = new THREE.Object3D();
  return parts.map(({ geometry, material, base }) => {
    const mesh = new THREE.InstancedMesh(geometry, material, instances.length);
    instances.forEach(({ x, y, z, rotY, scale }, i) => {
      tmp.position.set(x, y, z);
      tmp.rotation.set(0, rotY, 0);
      tmp.scale.setScalar(scale);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix.clone().multiply(base));
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // sem isto a bounding sphere só cobriria a geometria-base e as instâncias
    // sumiriam do frustum quando a ORIGEM saísse da tela
    mesh.computeBoundingSphere();
    scene.add(mesh);
    return mesh;
  });
}

// Fallback do instancing: se o GLB não é instanciável (skinned/morph), devolve
// o caminho antigo de clone por cópia — árvore invisível com colisor órfão é
// pior que alguns draw calls extras. Mesmo contrato do instantiateGlb.
function cloneGlbCopies(scene, src, instances, { cast = true, receive = true } = {}) {
  if (!src) return [];
  return instances.map(({ x, y, z, rotY, scale }) => {
    const copy = src.scene.clone(true);
    copy.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = cast;
        node.receiveShadow = receive;
      }
    });
    copy.position.set(x, y, z);
    copy.rotation.y = rotY;
    copy.scale.setScalar(scale);
    scene.add(copy);
    return copy;
  });
}

// Instancia quando o GLB é instanciável; senão cai no clone por cópia. Um só
// ponto de decisão para todos os chamadores (árvores, arbustos).
function addGlbCopies(scene, src, instances) {
  if (!src || !instances.length) return null;
  const instanced = instantiateGlb(scene, src, instances);
  if (instanced) return instanced;
  return cloneGlbCopies(scene, src, instances);
}

// InstancedMesh a partir de uma lista de {position, scale} — mesmo padrão do
// buildFacadeWindows (matriz via Object3D temporário). Flags de sombra explícitos:
// cada chamada repassa EXATAMENTE os flags que os meshes individuais tinham.
function buildInstanced(scene, geometry, material, items, { cast = true, receive = true } = {}) {  const mesh = new THREE.InstancedMesh(geometry, material, items.length);
  const tmp = new THREE.Object3D();
  items.forEach(({ position, scale }, i) => {
    tmp.position.copy(position);
    tmp.rotation.set(0, 0, 0);
    tmp.scale.copy(scale);
    tmp.updateMatrix();
    mesh.setMatrixAt(i, tmp.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  mesh.computeBoundingSphere();
  scene.add(mesh);
  return mesh;
}

// ── descarte profundo dos recursos da zona anterior (roadmap 3.3) ────────────
// disposeScene (main.js) já libera geometry e material.map da cena antiga, mas
// NEM o material em si, NEM as outras maps (normal/roughness/emissive/…), NEM
// materiais em array, NEM os buffers de instância do InstancedMesh — e vaza a
// cada troca de zona. O conserto canônico mora no main.js (arquivo de outra
// rodada), então world.js lembra o que a última zona construiu e libera o
// resto no build seguinte. Materiais/texturas compartilhados com caches
// persistentes (mat(), glowSprite.texture, GLBs em glbScenes) são dispostos
// UMA vez via Set e voltam à GPU sozinhos no próximo uso — o jogo já depende
// desse comportamento: a geometry dos clones de GLB já é disposta e reenviada
// a cada troca de zona pelo próprio disposeScene.
const MATERIAL_MAP_SLOTS = [
  'map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap',
  'alphaMap', 'lightMap', 'specularMap', 'envMap', 'bumpMap', 'displacementMap',
  'matcap', 'gradientMap',
];
let previousZoneResources = null; // { materials: Set, instanced: [] } do build anterior

function disposeTolerant(resource) {
  try {
    resource.dispose();
  } catch {
    // dispose duplo/parcial não pode derrubar o build da zona nova
  }
}

function disposeZoneResources(resources) {
  if (!resources) return;
  const textures = new Set(); // a mesma textura pode ocupar 2 slots (makeKid liga emissiveMap = map)
  for (const material of resources.materials) {
    for (const slot of MATERIAL_MAP_SLOTS) {
      const texture = material[slot];
      if (texture?.isTexture && !textures.has(texture)) textures.add(texture);
    }
  }
  for (const texture of textures) disposeTolerant(texture);
  for (const material of resources.materials) disposeTolerant(material);
  // InstancedMesh.dispose libera instanceMatrix/instanceColor na GPU sem
  // tocar na geometry/material (esses ficam com o disposeScene de main.js)
  for (const instanced of resources.instanced) disposeTolerant(instanced);
}

// Chamado no FIM de cada builder: libera o que sobrou da zona anterior e
// captura os recursos desta. Tem que ser no fim (e não depois do dispose de
// main.js) porque scene.clear() destaca os filhos — depois deles não dá mais
// para descobrir quais materiais a cena usava.
function stashZoneResources(scene) {
  disposeZoneResources(previousZoneResources);
  const resources = { materials: new Set(), instanced: [] };
  scene.traverse((node) => {
    if (node.isInstancedMesh) resources.instanced.push(node);
    if (!node.material) return;
    if (Array.isArray(node.material)) node.material.forEach((m) => m && resources.materials.add(m));
    else resources.materials.add(node.material);
  });
  previousZoneResources = resources;
}

// ── helpers básicos ──────────────────────────────────────────────────────────
const matCache = new Map();
function mat(color) {
  if (!matCache.has(color)) matCache.set(color, new THREE.MeshLambertMaterial({ color }));
  return matCache.get(color);
}
function glowMat(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
}

// cor CSS a partir de qualquer cor do three.js: as zonas guardam a névoa como
// número hexadecimal (0x8fc9e8) e `addColorStop` só aceita string CSS. Sem esta
// conversão, passar a cor direto quebrava a promise que monta o céu — e a zona
// inteira ficava sem carregar (jogo preso na tela de personagem).
function cssColor(color, fallback = '#ffffff') {
  if (typeof color === 'string') return color;
  if (typeof color === 'number') return `#${color.toString(16).padStart(6, '0')}`;
  if (color && typeof color.getHexString === 'function') return `#${color.getHexString()}`;
  return fallback;
}

function canvasTexture(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  draw(canvas.getContext('2d'), w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// mesma coisa, mas devolve o canvas junto (precisamos dele para gerar normal/rough)
function canvasWithRaw(w, h, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  draw(canvas.getContext('2d'), w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, canvas };
}

// normal map derivado do canal de luminância do canvas de origem (Sobel simples)
function normalMapFrom(canvas, strength = 1.6) {
  const w = canvas.width, h = canvas.height;
  const src = canvas.getContext('2d').getImageData(0, 0, w, h).data;
  const out = document.createElement('canvas');
  out.width = w; out.height = h;
  const octx = out.getContext('2d');
  const data = octx.createImageData(w, h);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const xl = (x - 1 + w) % w;
      const xr = (x + 1) % w;
      const yu = (y - 1 + h) % h;
      const yd = (y + 1) % h;
      const hl = src[(y * w + xl) * 4] / 255;
      const hr = src[(y * w + xr) * 4] / 255;
      const hu = src[(yu * w + x) * 4] / 255;
      const hd = src[(yd * w + x) * 4] / 255;
      const dx = (hr - hl) * strength;
      const dy = (hd - hu) * strength;
      const nz = 1 / Math.sqrt(dx * dx + dy * dy + 1);
      const nx = -dx * nz;
      const ny = -dy * nz;
      const i = (y * w + x) * 4;
      data.data[i] = (nx * 0.5 + 0.5) * 255 | 0;
      data.data[i + 1] = (ny * 0.5 + 0.5) * 255 | 0;
      data.data[i + 2] = (nz * 0.5 + 0.5) * 255 | 0;
      data.data[i + 3] = 255;
    }
  }
  octx.putImageData(data, 0, 0);
  const tex = new THREE.CanvasTexture(out);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// material PBR pronto: albedo + normal + roughness, com tiling configurável
function pbrFrom({ texture, canvas }, repeat, normalScale = 1.0, roughnessRange = [0.65, 1.0]) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  if (repeat) texture.repeat.set(repeat[0], repeat[1]);
  const normal = normalMapFrom(canvas, 1.4);
  if (repeat) normal.repeat.set(repeat[0], repeat[1]);
  const rough = roughnessMapFrom(canvas, roughnessRange[0], roughnessRange[1]);
  if (repeat) rough.repeat.set(repeat[0], repeat[1]);
  return new THREE.MeshStandardMaterial({
    map: texture,
    normalMap: normal,
    normalScale: new THREE.Vector2(normalScale, normalScale),
    roughnessMap: rough,
    metalness: 0,
  });
}

// mapa de rugosidade: luminância do albedo mapeada para [lo, hi]
function roughnessMapFrom(canvas, lo = 0.65, hi = 1.0) {
  const w = canvas.width, h = canvas.height;
  const src = canvas.getContext('2d').getImageData(0, 0, w, h).data;
  const out = document.createElement('canvas');
  out.width = w; out.height = h;
  const octx = out.getContext('2d');
  const data = octx.createImageData(w, h);
  for (let i = 0; i < w * h; i += 1) {
    const r = src[i * 4] / 255;
    const g = src[i * 4 + 1] / 255;
    const b = src[i * 4 + 2] / 255;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const v = (lo + (1 - lum) * (hi - lo)) * 255 | 0;
    data.data[i * 4] = data.data[i * 4 + 1] = data.data[i * 4 + 2] = v;
    data.data[i * 4 + 3] = 255;
  }
  octx.putImageData(data, 0, 0);
  const tex = new THREE.CanvasTexture(out);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function box(parent, w, h, d, color, x, y, z, { collider, rotY = 0, cast = true, receive = true } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  if (collider) addCollider(parent, x, z, w, d);
  return mesh;
}

function addCollider(parent, x, z, w, d) {
  const list = parent.userData.zone?.colliders;
  if (list) list.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
}

function wall(parent, x1, z1, x2, z2, height = 2.2, material = null) {
  const w = Math.abs(x2 - x1) || 0.3;
  const d = Math.abs(z2 - z1) || 0.3;
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, height, d), material || mat(0xe8dcc3));
  mesh.position.set(x, height / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  addCollider(parent, x, z, w, d);
  // rodapé de madeira
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.32, d + 0.06), mat(0x6b4a2e));
  skirt.position.set(x, 0.16, z);
  parent.add(skirt);
}

function plant(parent, x, z, tuftTex) {
  box(parent, 0.5, 0.45, 0.5, 0xa5502e, x, 0.225, z, { collider: true });
  const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), mat(0x3f7d3a));
  foliage.position.set(x, 0.9, z);
  foliage.scale.y = 1.2;
  foliage.castShadow = true;
  parent.add(foliage);
  for (let i = 0; i < 5; i += 1) {
    const leaf = spritePlane(tuftTex, 0.34);
    leaf.position.set(x + (Math.random() - 0.5) * 0.5, 1.15 + Math.random() * 0.25, z + (Math.random() - 0.5) * 0.5);
    leaf.rotation.y = Math.random() * Math.PI;
    parent.add(leaf);
  }
}

// plano vertical com textura transparente (folhagem, tufos, heras)
function spritePlane(texture, size) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshLambertMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false })
  );
  mesh.castShadow = false;
  return mesh;
}

// brilho aditivo pulsante (árvore dourada, janelas, vaga-lumes…)
function glowSprite(parent, zone, color, size, x, y, z, { opacity = 0.5, amp = 0.18, speed = 2.2 } = {}) {
  if (!glowSprite.texture) {
    glowSprite.texture = canvasTexture(128, 128, (ctx) => {
      const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.4, 'rgba(255,255,255,.45)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
    });
  }
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowSprite.texture, color, transparent: true, opacity,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  sprite.position.set(x, y, z);
  sprite.scale.set(size, size, 1);
  parent.add(sprite);
  (zone.pulses ||= []).push({ obj: sprite.material, base: opacity, amp, speed, phase: Math.random() * 6 });
  return sprite;
}

// ── texturas pintadas ────────────────────────────────────────────────────────
function brickTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#cbb9a4';
    ctx.fillRect(0, 0, 1024, 1024);
    const bw = 128, bh = 64;
    for (let row = 0; row < 16; row += 1) {
      const offset = (row % 2) * bw / 2;
      for (let col = -1; col < 9; col += 1) {
        const tone = 165 + Math.random() * 40;
        ctx.fillStyle = `rgb(${tone + 25}, ${tone * 0.62}, ${tone * 0.45})`;
        ctx.fillRect(col * bw + offset + 3, row * bh + 3, bw - 6, bh - 6);
      }
    }
  });
}

function plasterTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#efe3c8';
    ctx.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 3000; i += 1) {
      ctx.fillStyle = `rgba(${180 + Math.random() * 60 | 0}, ${165 + Math.random() * 55 | 0}, ${120 + Math.random() * 40 | 0}, .12)`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  });
}

function planksTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    for (let col = 0; col < 16; col += 1) {
      const tone = 150 + Math.random() * 30;
      ctx.fillStyle = `rgb(${tone + 30}, ${tone * 0.82}, ${tone * 0.52})`;
      ctx.fillRect(col * 64, 0, 64, 1024);
      // grão: traços finos e aleatórios (não linhas horizontais paralelas)
      for (let g = 0; g < 9; g += 1) {
        ctx.strokeStyle = `rgba(90, 58, 28, ${0.08 + Math.random() * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        const sx = col * 64 + 4 + Math.random() * 56;
        const sy = Math.random() * 1024;
        ctx.moveTo(sx, sy);
        ctx.bezierCurveTo(
          sx + (Math.random() - 0.5) * 18, sy + 80 + Math.random() * 200,
          sx + (Math.random() - 0.5) * 18, sy + 160 + Math.random() * 200,
          sx + (Math.random() - 0.5) * 12, sy + 240 + Math.random() * 600
        );
        ctx.stroke();
      }
      // junta entre tábuas: traço mais escuro e estreito
      ctx.fillStyle = 'rgba(40, 26, 14, .8)';
      ctx.fillRect(col * 64 + 62, 0, 2, 1024);
    }
  });
}

function tilesTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    for (let row = 0; row < 8; row += 1) {
      for (let col = 0; col < 8; col += 1) {
        const dark = (row + col) % 2 === 0;
        ctx.fillStyle = dark ? '#9a6a48' : '#d9c49a';
        ctx.fillRect(col * 128, row * 128, 128, 128);
        ctx.fillStyle = 'rgba(0,0,0,.08)';
        for (let n = 0; n < 28; n += 1) ctx.fillRect(col * 128 + Math.random() * 128, row * 128 + Math.random() * 128, 3, 3);
      }
    }
  });
}

function carpetTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#8e3b46';
    ctx.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 4000; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(60, 20, 26, .18)' : 'rgba(220, 150, 150, .1)';
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  });
}

function grassTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#3c7a40';
    ctx.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 9000; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30, 70, 32, .25)' : 'rgba(120, 190, 100, .16)';
      ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 3, 3 + Math.random() * 4);
    }
  });
}

function dirtTexture() {
  return canvasWithRaw(512, 512, (ctx) => {
    ctx.fillStyle = '#8a6a42';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 2000; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 50, 28, .3)' : 'rgba(190, 160, 110, .25)';
      const r = 2 + Math.random() * 6;
      ctx.beginPath();
      ctx.arc(Math.random() * 512, Math.random() * 512, r, 0, 7);
      ctx.fill();
    }
    // bordas com alpha suave (a trilha se funde na grama)
    ctx.globalCompositeOperation = 'destination-out';
    const left = ctx.createLinearGradient(0, 0, 120, 0);
    left.addColorStop(0, 'rgba(0,0,0,1)'); left.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = left; ctx.fillRect(0, 0, 120, 512);
    const right = ctx.createLinearGradient(512, 0, 392, 0);
    right.addColorStop(0, 'rgba(0,0,0,1)'); right.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = right; ctx.fillRect(392, 0, 120, 512);
  });
}

function tuftTexture() {
  return canvasTexture(128, 128, (ctx) => {
    ctx.clearRect(0, 0, 128, 128);
    for (let i = 0; i < 9; i += 1) {
      const x = 20 + Math.random() * 88;
      const top = 14 + Math.random() * 30;
      const lean = (Math.random() - 0.5) * 30;
      ctx.strokeStyle = Math.random() > 0.5 ? '#4d8f45' : '#67a851';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, 124);
      ctx.quadraticCurveTo(x + lean, 70, x + lean * 1.6, top);
      ctx.stroke();
    }
  });
}

function ivyTexture() {
  return canvasTexture(128, 128, (ctx) => {
    ctx.clearRect(0, 0, 128, 128);
    ctx.strokeStyle = '#3f6b34';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(10, 120);
    ctx.bezierCurveTo(40, 90, 60, 60, 100, 14);
    ctx.stroke();
    for (let i = 0; i < 9; i += 1) {
      const x = 18 + Math.random() * 96;
      const y = 20 + Math.random() * 96;
      const r = 10 + Math.random() * 9;
      ctx.fillStyle = Math.random() > 0.5 ? '#4d8f45' : '#3c7a40';
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * 0.72, Math.random() * 3, 0, 7);
      ctx.fill();
      ctx.fillStyle = 'rgba(200, 240, 160, .25)';
      ctx.beginPath();
      ctx.ellipse(x - r * 0.25, y - r * 0.25, r * 0.4, r * 0.28, 0, 0, 7);
      ctx.fill();
    }
  });
}

function paperTexture() {
  return canvasTexture(128, 160, (ctx) => {
    ctx.fillStyle = '#fdf6e4';
    ctx.fillRect(0, 0, 128, 160);
    ctx.strokeStyle = '#b9ad92';
    ctx.lineWidth = 4;
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.moveTo(16, 30 + i * 18);
      ctx.lineTo(112 - Math.random() * 30, 30 + i * 18);
      ctx.stroke();
    }
    ctx.fillStyle = '#d4506a';
    ctx.beginPath();
    ctx.arc(64, 14, 8, 0, 7);
    ctx.fill();
  });
}

function stoneTexture() {
  return canvasWithRaw(512, 512, (ctx) => {
    ctx.fillStyle = '#8d8a80';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 2000; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(50, 48, 44, .2)' : 'rgba(200, 198, 188, .2)';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
    }
  });
}

// ── personagens ──────────────────────────────────────────────────────────────
function faceTexture({ blink = false, mustache = false, glasses = false } = {}) {
  return canvasTexture(256, 256, (ctx) => {
    ctx.clearRect(0, 0, 256, 256);
    const eye = (x) => {
      if (blink) {
        ctx.strokeStyle = '#3a2a20';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(x, 116, 17, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        return;
      }
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(x, 114, 20, 25, 0, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#5a3a22';
      ctx.beginPath();
      ctx.arc(x, 119, 11.5, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#241812';
      ctx.beginPath();
      ctx.arc(x, 120, 6.5, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x - 4, 112, 3.4, 0, 7);
      ctx.fill();
    };
    eye(86); eye(170);
    ctx.strokeStyle = '#a4552f';
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(128, 164, 27, 0.18 * Math.PI, 0.82 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = 'rgba(242, 130, 110, .38)';
    ctx.beginPath();
    ctx.ellipse(56, 156, 17, 11, 0, 0, 7);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(200, 156, 17, 11, 0, 0, 7);
    ctx.fill();
    if (mustache) {
      ctx.strokeStyle = '#d8d3cc';
      ctx.lineWidth = 13;
      ctx.beginPath();
      ctx.arc(128, 152, 26, 0.25 * Math.PI, 0.75 * Math.PI);
      ctx.stroke();
    }
    if (glasses) {
      ctx.strokeStyle = '#3d4a50';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(86, 114, 34, 0, 7);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(170, 114, 34, 0, 7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(120, 112);
      ctx.lineTo(136, 112);
      ctx.stroke();
    }
  });
}

let faceCache = null;
function faces() {
  if (!faceCache) {
    faceCache = {
      open: faceTexture(),
      blink: faceTexture({ blink: true }),
      mustache: faceTexture({ mustache: true }),
      glasses: faceTexture({ glasses: true }),
    };
  }
  return faceCache;
}

function facePlane(parent, texture, size) {
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(size, 24),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true })
  );
  mesh.position.z = size * 1.18;
  parent.add(mesh);
  return mesh;
}

export function makeKid(characterId) {
  // ── 1ª escolha: modelo IA dedicado (oakley tem o próprio), senão Ivy tintada ──
  const dedicated = characterId === 'oakley' ? glbSource(MODEL_FILES.core.oakley) : null;
  const ai = dedicated || glbSource(MODEL_FILES.core.ivy);
  if (ai && ai.animations && ai.animations.length) {
    const g = new THREE.Group();
    // skinned mesh NÃO pode usar .clone() comum: os clones compartilham o
    // esqueleto e o 2º personagem colapsa. SkeletonUtils.clone rebinda tudo.
    const kid = SkeletonUtils.clone(ai.scene);
      kid.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
          // lift de luz: capa preta engole a luz quente da cena; usar o próprio
          // mapa de cor como emissive devolve legibilidade sem lavar o look
          const mats = Array.isArray(c.material) ? c.material : [c.material];
          for (const m of mats) {
            if (m && m.map && m.emissive) {
              m.emissiveMap = m.map;
              m.emissive = new THREE.Color(0x6a6a6a);
              m.emissiveIntensity = 0.9;
              m.toneMapped = true;
            }
          }
        }
      });
    // malhas IA normalizadas pra 1.2m no rig; kid do jogo tem ~1.42m
    kid.scale.setScalar(1.18);
    // diferenciar Oakley quando usa o modelo da Ivy (tint azulado na capa/tie)
    if (characterId === 'oakley' && !dedicated) {
      kid.traverse((c) => {
        if (c.isMesh && c.material) {
          const mats = Array.isArray(c.material) ? c.material : [c.material];
          for (const m of mats) {
            if (m.color) m.color.offsetHSL(0.55, 0.1, 0.05);
          }
        }
      });
    }
    g.add(kid);
    const mixer = new THREE.AnimationMixer(kid);
    const findClip = (re, fallbackRe) =>
      ai.animations.find((a) => re.test(a.name)) ||
      (fallbackRe ? ai.animations.find((a) => fallbackRe.test(a.name)) : null);
    const idleClip = findClip(/^idle$/i, /idle/i);
    const walkClip = findClip(/^walk$/i, /walk/i);
    const runClip = findClip(/^run$/i, /run/i);
    let idleAction = null, walkAction = null, runAction = null, currentAction = null;
    if (idleClip) {
      idleAction = mixer.clipAction(idleClip);
      idleAction.play();
      currentAction = idleAction;
    }
    if (walkClip) {
      walkAction = mixer.clipAction(walkClip);
      walkAction.play();
      walkAction.enabled = false;
      walkAction.setEffectiveWeight(0);
    }
    if (runClip) {
      runAction = mixer.clipAction(runClip);
      runAction.play();
      runAction.enabled = false;
      runAction.setEffectiveWeight(0);
    }
    let lastT = 0;
    g.userData.animate = (t, speed) => {
      const dt = Math.max(0, Math.min(0.1, t - lastT));
      lastT = t;
      if (idleAction && walkAction) {
        const moving = speed > 0.5;
        const running = speed > 1.5 && runAction;
        const target = running ? runAction : (moving ? walkAction : idleAction);
        if (currentAction !== target) {
          target.enabled = true;
          target.setEffectiveTimeScale(1);
          target.fadeIn(0.15);
          if (currentAction) currentAction.fadeOut(0.15);
          currentAction = target;
        }
      }
      mixer.update(dt);
    };
    return g;
  }

  // ── 2ª escolha: chibi rigged do Sketchfab ──────────────────────────────────
  const src = glbSource(MODEL_FILES.core.animatedKid);
  if (src && src.animations && src.animations.length) {
    const g = new THREE.Group();
    const kid = src.scene.clone(true);
    kid.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
    // diferenciar ivy (padrão) de oakley: tingir o boné de azul
    if (characterId === 'oakley') {
      kid.traverse((c) => {
        if (c.isMesh && /cap/i.test(c.name || '') && c.material) {
          const mats = Array.isArray(c.material) ? c.material : [c.material];
          for (const m of mats) {
            if (m.color) m.color.set(0x3d5a9e);
          }
        }
      });
    }
    g.add(kid);

    // AnimationMixer: idle ↔ walk com fade suave
    const mixer = new THREE.AnimationMixer(kid);
    const findClip = (re, fallbackRe) =>
      src.animations.find((a) => re.test(a.name)) ||
      (fallbackRe ? src.animations.find((a) => fallbackRe.test(a.name)) : null);
    const idleClip = findClip(/rig\|idle/i, /idle/i);
    const walkClip = findClip(/rig\|walk(?!ing)/i, /walk/i);
    let idleAction = null;
    let walkAction = null;
    let currentAction = null;
    if (idleClip) {
      idleAction = mixer.clipAction(idleClip);
      idleAction.play();
      currentAction = idleAction;
    }
    if (walkClip) {
      walkAction = mixer.clipAction(walkClip);
      walkAction.play();
      walkAction.enabled = false;
      walkAction.setEffectiveWeight(0);
    }
    let lastT = 0;
    g.userData.animate = (t, speed) => {
      if (!mixer) return;
      const dt = Math.max(0, Math.min(0.1, t - lastT));
      lastT = t;
      if (idleAction && walkAction) {
        const moving = speed > 0.5;
        // fade cruzado idle ↔ walk
        const target = moving ? walkAction : idleAction;
        const other = moving ? idleAction : walkAction;
        if (currentAction !== target) {
          target.enabled = true;
          target.setEffectiveTimeScale(1);
          target.fadeIn(0.18);
          other.fadeOut(0.18);
          currentAction = target;
        }
      }
      mixer.update(dt);
    };
    return g;
  }

  // ── fallback procedural (se o modelo animado falhou) ───────────────────────
  const g = new THREE.Group();
  const parts = {};
  const skin = mat(0xf6cfa4);
  const uniform = mat(0x2c3560);
  const hairColor = characterId === 'ivy' ? 0x6b4226 : 0x4e3018;

  parts.body = new THREE.Group();
  g.add(parts.body);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 0.4, 4, 12), uniform);
  torso.position.y = 0.78;
  torso.castShadow = true;
  parts.body.add(torso);
  if (characterId === 'ivy') {
    const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.36, 14, 1, true), mat(0x232a52));
    skirt.position.y = 0.55;
    skirt.castShadow = true;
    parts.body.add(skirt);
  } else {
    const hem = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.1, 12), mat(0x232a52));
    hem.position.y = 0.56;
    parts.body.add(hem);
  }
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.16, 0.06, 12), mat(0xf2ede0));
  collar.position.y = 1.02;
  parts.body.add(collar);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.245, 18, 14), skin);
  head.position.y = 1.3;
  head.castShadow = true;
  parts.body.add(head);
  parts.face = facePlane(head, faces().open, 0.2);
  parts.face.position.set(0, -0.01, 0.208);

  // cabelo: casquete + volume + franja / rabo de cavalo
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.27, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), mat(hairColor));
  hair.position.set(0, 1.31, -0.015);
  hair.rotation.x = -0.22;
  hair.castShadow = true;
  parts.body.add(hair);
  const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 10), mat(hairColor));
  hairBack.position.set(0, 1.22, -0.12);
  hairBack.scale.set(1, 1.1, 0.9);
  parts.body.add(hairBack);
  if (characterId === 'ivy') {
    parts.ponytail = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.3, 4, 8), mat(hairColor));
    parts.ponytail.position.set(0, 1.06, -0.3);
    parts.ponytail.rotation.x = 0.35;
    parts.ponytail.castShadow = true;
    parts.body.add(parts.ponytail);
    const scrunchie = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.03, 8, 14), mat(0xd4506a));
    scrunchie.position.set(0, 1.24, -0.27);
    scrunchie.rotation.x = Math.PI / 2.4;
    parts.body.add(scrunchie);
  } else {
    const fringe = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), mat(hairColor));
    fringe.position.set(0, 1.42, 0.14);
    fringe.scale.set(1.5, 0.55, 0.7);
    parts.body.add(fringe);
  }

  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.17), mat(0x5b3d24));
  backpack.position.set(0, 0.85, -0.28);
  backpack.castShadow = true;
  parts.body.add(backpack);
  for (const side of [-1, 1]) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.02), mat(0x4a3018));
    strap.position.set(side * 0.12, 0.9, 0.24);
    parts.body.add(strap);
  }
  const emblem = makeTreeEmblem(0.075);
  emblem.position.set(0, 0.9, -0.375);
  emblem.rotation.y = Math.PI;
  parts.body.add(emblem);

  parts.legs = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.26, 4, 10), mat(characterId === 'ivy' ? 0xf6f2ec : 0x333a5e));
    leg.position.set(side * 0.12, 0.27, 0);
    leg.castShadow = true;
    g.add(leg);
    parts.legs.push(leg);
    const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 8), mat(0x2a2118));
    shoe.position.set(side * 0.12, 0.05, 0.03);
    shoe.scale.set(1, 0.6, 1.35);
    g.add(shoe);
    parts.legs.push(shoe);
  }
  parts.arms = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.3, 4, 10), uniform);
    arm.position.set(side * 0.31, 0.85, 0);
    arm.castShadow = true;
    parts.body.add(arm);
    parts.arms.push(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), skin);
    hand.position.set(side * 0.31, 0.64, 0);
    parts.body.add(hand);
  }

  g.userData.animate = (t, speed) => {
    const moving = Math.min(1, speed);
    const swing = Math.sin(t * 9) * moving * 0.55;
    parts.legs[0].rotation.x = swing;
    parts.legs[1].rotation.x = -swing;
    parts.arms[0].rotation.x = -swing * 0.8;
    parts.arms[1].rotation.x = swing * 0.8;
    parts.body.position.y = Math.abs(Math.sin(t * 9)) * 0.05 * moving;
    parts.body.rotation.z = Math.sin(t * 9) * 0.03 * moving;
    if (parts.ponytail) parts.ponytail.rotation.z = Math.sin(t * 3) * 0.12;
    // piscadinha a cada ~3,5 s
    const blinking = ((t + 1.7) % 3.4) < 0.14;
    const wanted = blinking ? faces().blink : faces().open;
    if (parts.face.material.map !== wanted) {
      parts.face.material.map = wanted;
      parts.face.material.needsUpdate = true;
    }
  };
  return g;
}

function owlFaceTexture(variant = 0) {
  return canvasTexture(256, 256, (ctx) => {
    ctx.clearRect(0, 0, 256, 256);
    const disc = variant === 0 ? '#f4ecd8' : '#d9cbb2';
    for (const x of [82, 174]) {
      ctx.fillStyle = disc;
      ctx.beginPath();
      ctx.ellipse(x, 128, 58, 66, 0, 0, 7);
      ctx.fill();
    }
    for (const x of [82, 174]) {
      ctx.fillStyle = '#e8a83d';
      ctx.beginPath();
      ctx.arc(x, 124, 26, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#241812';
      ctx.beginPath();
      ctx.arc(x, 124, 17, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x - 6, 116, 6, 0, 7);
      ctx.fill();
    }
    ctx.fillStyle = '#241812';
    ctx.beginPath();
    ctx.ellipse(128, 178, 12, 8, 0, 0, 7);
    ctx.fill();
  });
}

export function makeOwl(variant = 0) {
  // Preferir GLB (qualidade stylized PBR). Fallback procedural se preload falhou.
  const src = glbSource(MODEL_FILES.core.owl);
  if (src) {
    const g = new THREE.Group();
    // clone recursivo: cada owl precisa de sua própria instância (Object3D não pode ter 2 parents)
    const owl = src.scene.clone(true);
    owl.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
    // GLB tem ~0.40m de largura; procedural usava ~0.34m. Escala 0.85 pra ficar próximo.
    owl.scale.setScalar(0.85);
    g.add(owl);
    // animação simples de flutuar (não temos asas separadas no GLB)
    g.userData.animate = (t, flying) => {
      const baseY = flying ? 1.6 : 1.62;
      g.position.y = baseY + Math.sin(t * (flying ? 6 : 2.4)) * (flying ? 0.18 : 0.04);
      g.rotation.z = Math.sin(t * (flying ? 4 : 1.5)) * (flying ? 0.18 : 0.04);
      g.rotation.y = Math.sin(t * 1.2) * 0.08;
    };
    return g;
  }
  // ── fallback procedural (igual ao original, se GLB falhou) ──────────────────
  const g = new THREE.Group();
  const bodyColor = variant === 0 ? 0xd9c9a8 : 0x8a7156;
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 12), mat(bodyColor));
  body.scale.set(1, 1.12, 0.9);
  body.castShadow = true;
  g.add(body);
  const face = facePlane(g, owlFaceTexture(variant), 0.2);
  face.position.set(0, 0.06, 0.1);
  for (const side of [-1, 1]) {
    const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.11, 6), mat(bodyColor));
    tuft.position.set(side * 0.09, 0.22, 0.02);
    tuft.rotation.z = -side * 0.5;
    g.add(tuft);
  }
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.032, 0.07, 6), mat(0xe8942d));
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.02, 0.21);
  g.add(beak);
  const wings = [];
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), mat(bodyColor));
    wing.scale.set(0.26, 0.95, 1);
    wing.position.set(side * 0.16, -0.01, 0);
    wing.castShadow = true;
    g.add(wing);
    wings.push(wing);
  }
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 6), mat(bodyColor));
  tail.position.set(0, -0.14, -0.1);
  tail.rotation.x = -2.5;
  g.add(tail);
  g.userData.animate = (t, flying) => {
    const flap = Math.sin(t * (flying ? 14 : 2.2)) * (flying ? 0.9 : 0.12);
    wings[0].rotation.z = flap;
    wings[1].rotation.z = -flap;
    body.rotation.z = Math.sin(t * (flying ? 7 : 1.8)) * (flying ? 0.15 : 0.05);
    face.position.y = 0.06 + Math.sin(t * 2.4) * 0.006;
  };
  return g;
}

export function makeAdult(dress, face = 'mustache') {
  // ── 1ª escolha: modelo IA dedicado do NPC (id → arquivo) ──────────────────
  const dedicated = glbSource(MODEL_FILES.adults[face] || '__none__');
  if (dedicated) {
    const g = new THREE.Group();
    const npc = SkeletonUtils.clone(dedicated.scene);
    npc.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
        const mats = Array.isArray(c.material) ? c.material : [c.material];
        for (const m of mats) {
          if (m && m.map && m.emissive) {
            m.emissiveMap = m.map;
            m.emissive = new THREE.Color(0x6a6a6a);
            m.emissiveIntensity = 0.9;
          }
        }
      }
    });
    g.add(npc);
    // NPCs ficam parados: toca só o idle em loop
    const mixer = new THREE.AnimationMixer(npc);
    const idleClip = dedicated.animations.find((a) => /idle/i.test(a.name));
    if (idleClip) {
      mixer.clipAction(idleClip).play();
    }
    let lastT = 0;
    g.userData.animate = (t) => {
      const dt = Math.max(0, Math.min(0.1, t - lastT));
      lastT = t;
      mixer.update(dt);
    };
    return g;
  }
  // ── 2ª escolha: Business Man genérico do Sketchfab ─────────────────────────
  const src = glbSource(MODEL_FILES.core.npc);
  if (src) {
    const g = new THREE.Group();
    const npc = src.scene.clone(true);
    npc.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
    // o modelo NPC guarda a altura no -Z (medido: z entre -1.68 e 0, braços no X).
    // rotation.x = +PI/2 mapeia -Z → +Y: levanta exato do chão, sem offset.
    npc.rotation.x = Math.PI / 2;
    g.add(npc);
    return g;
  }
  // ── fallback procedural (igual ao original) ────────────────────────────────
  const g = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.62, 4, 12), mat(dress));
  torso.position.y = 1.05;
  torso.castShadow = true;
  g.add(torso);
  const apron = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.05), mat(0xc9b48a));
  apron.position.set(0, 0.95, 0.3);
  g.add(apron);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 14), mat(0xf2c9a0));
  head.position.y = 1.66;
  head.castShadow = true;
  g.add(head);
  const adultFace = facePlane(head, faces()[face] || faces().mustache, 0.2);
  adultFace.position.set(0, -0.01, 0.208);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12), mat(0xd8d3cc));
  hair.position.set(0, 1.73, -0.03);
  hair.scale.set(1, 0.9, 1);
  g.add(hair);
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.42, 4, 10), mat(0x3a3a42));
    leg.position.set(side * 0.15, 0.32, 0);
    leg.castShadow = true;
    g.add(leg);
  }
  return g;
}

// sombra de contato suave (acompanha as sombras reais)
export function blobShadow(parent) {
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.4, 20),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.14, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  parent.add(shadow);
  return shadow;
}

// ── árvore dourada (símbolo do jogo) ─────────────────────────────────────────
export function makeTreeEmblem(size = 1) {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(size, 32), glowMat(0x8a5a10));
  g.add(disc);
  const inner = new THREE.Mesh(new THREE.CircleGeometry(size * 0.86, 32), glowMat(0xf5c542));
  inner.position.z = 0.001;
  g.add(inner);
  const gold = glowMat(0x7a4a08);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.05, size * 0.08, size * 0.62, 6), gold);
  trunk.position.y = -size * 0.24;
  trunk.position.z = 0.002;
  g.add(trunk);
  for (const [angle, len] of [[0.5, 0.5], [-0.5, 0.5], [0, 0.62]]) {
    const branch = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.03, size * 0.045, size * len, 5), gold);
    branch.position.set(Math.sin(angle) * size * len * 0.5, size * (0.18 + Math.cos(angle) * len * 0.4), 0.002);
    branch.rotation.z = -angle;
    g.add(branch);
  }
  for (const [lx, ly, r] of [[-0.34, 0.32, 0.2], [0.34, 0.32, 0.2], [0, 0.5, 0.24], [-0.16, 0.14, 0.15], [0.16, 0.14, 0.15]]) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(size * r, 8, 6), glowMat(0xffde7a));
    leaf.position.set(size * lx, size * ly, 0.003);
    g.add(leaf);
  }
  return g;
}

// textura equiretangular do globo da biblioteca: oceanos, continentes em
// blobs estilizados e MALTA marcada (a amiga maltesa da Julia merece).
// Malta: lon 14.4°E, lat 35.9°N → u=0.539, v=0.30 no mapa equiretangular.
function makeEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2a5a9a'; // oceano
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#4a8a4a'; // continentes
  const blob = (u, v, w, h) => {
    ctx.beginPath();
    ctx.ellipse(u * 512, v * 256, w, h, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  // América do Norte / Groenlândia / América do Sul / Europa / África / Ásia / Austrália
  blob(0.18, 0.26, 62, 34);
  blob(0.34, 0.09, 22, 13);
  blob(0.30, 0.58, 26, 40);
  blob(0.50, 0.22, 24, 14);
  blob(0.52, 0.50, 30, 38);
  blob(0.70, 0.28, 58, 30);
  blob(0.83, 0.62, 22, 14);
  ctx.fillStyle = '#c9a75a'; // desertos (Saara e interior da Austrália)
  blob(0.53, 0.42, 20, 10);
  blob(0.84, 0.60, 12, 7);
  ctx.fillStyle = '#f2ede0'; // calotas polares
  ctx.fillRect(0, 0, 512, 10);
  ctx.fillRect(0, 248, 512, 8);
  // MALTA: ponto vermelho + anel dourado (só dela tem destaque no globo)
  ctx.fillStyle = '#d02a2a';
  ctx.beginPath(); ctx.arc(0.539 * 512, 0.30 * 256, 2.6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#f2c14e'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(0.539 * 512, 0.30 * 256, 5.2, 0, Math.PI * 2); ctx.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// placa de fachada larga (High Street de verdade: Post Office, Costa, pub…)
// — o badge quadradinho do makeLabelSprite não serve para o nameplate das
// lojas. Cores SEMPRE string (regra cssColor: canvas rejeita número).
function fasciaSign(text, { w = 2.6, h = 0.46, bg = '#1c2a52', fg = '#fff6dd' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 512, 96);
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 6; ctx.strokeRect(6, 6, 500, 84);
  ctx.fillStyle = fg;
  ctx.font = 'bold 52px "Trebuchet MS", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 52, 484); // 4º arg encolhe a fonte se não couber
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: texture }));
}

function makeLabelSprite(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(24, 20, 44, 0.9)';
  ctx.beginPath(); ctx.roundRect(10, 10, 108, 108, 26); ctx.fill();
  ctx.strokeStyle = '#f5c542'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.roundRect(10, 10, 108, 108, 26); ctx.stroke();
  ctx.fillStyle = '#fff6dd';
  ctx.font = 'bold 62px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 70);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.scale.set(0.62, 0.62, 1);
  return sprite;
}

// estante de biblioteca com livros instanciados (espinhas coloridas)
// face: 's' | 'n' | 'e' | 'w' | 'ns' — de que lado as espinhas aparecem
function shelfWithBooks(scene, x, z, w, d, face = 's') {
  box(scene, w, 2.3, d, 0x5d3f26, x, 1.15, z, { collider: true });
  const levels = [0.55, 1.2, 1.85];
  const palette = [0xb0413e, 0x3e6cb0, 0x3e9a5f, 0xc98a2d, 0x7a4ecf, 0xd4506a, 0x4ecdc4];
  const alongX = w > d;
  const length = alongX ? w : d;
  const sides = face === 'ns' ? ['s', 'n'] : [face];
  for (const side of sides) {
    // espinhas "na frente" da estante, do lado visível do cômodo
    const shift = alongX
      ? { x: 0, z: (side === 's' ? 1 : -1) * (d / 2 + 0.02) }
      : { x: (side === 'e' ? 1 : -1) * (w / 2 + 0.02), z: 0 };
    const depth = Math.min(0.42, (alongX ? d : w) - 0.2);
    for (const level of levels) {
      const count = Math.max(6, Math.round(length / 0.16));
      const book = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial(), count);
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < count; i += 1) {
        const thick = 0.09 + Math.random() * 0.08;
        const tall = 0.34 + Math.random() * 0.14;
        matrix.makeScale(alongX ? thick : depth, tall, alongX ? depth : thick);
        const along = -(length / 2 - 0.1) + (i + 0.5) * (length - 0.2) / count;
        matrix.setPosition(alongX ? x + along : x + shift.x, level - 0.18 + tall / 2, alongX ? z + shift.z : z + along);
        book.setMatrixAt(i, matrix);
        book.setColorAt(i, new THREE.Color(palette[(Math.random() * palette.length) | 0]));
      }
      book.castShadow = true;
      scene.add(book);
    }
  }
}

function updatePulses(zone, t) {
  for (const pulse of zone.pulses || []) {
    pulse.obj.opacity = pulse.base + pulse.amp * Math.sin(t * pulse.speed + pulse.phase);
  }
}

function lightShaft(parent, x, y, z, { radius = 1.5, height = 11, tilt = 0.2, opacity = 0.1, color = 0xffe2a8 } = {}) {
  const shaft = new THREE.Mesh(
    new THREE.ConeGeometry(radius, height, 14, 1, true),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
  );
  shaft.position.set(x, y, z);
  shaft.rotation.z = tilt;
  parent.add(shaft);
  return shaft;
}

// ── cenários de fundo: céu, nuvens, colinas, silhuetas de cidade ────────────
// Cúpula de céu pintada (gradiente vertical) + nuvens macias + silhuetas ao
// fundo. Tudo bem além dos limites jogáveis: dá profundidade sem colisão.
function skyDome(scene, zone, { top, horizon, glow = '#ffe6b0', stars = false, hills = 'green' } = {}) {
  const tex = canvasTexture(32, 256, (ctx, w, h) => {
    // A UV da esfera vai de 1 no zênite a 0.5 no horizonte (e 0 na base), e o
    // topo do canvas é o zênite. Com as paradas em 0.78/0.92 o horizonte caía
    // fora da faixa visível: o céu inteiro ficava azul chapado e as cores
    // claras só apareciam DEPOIS da borda do terreno, como uma faixa pálida
    // cortando o chão — a "quebra" no horizonte.
    const g = ctx.createLinearGradient(0, 0, 0, h);
    // abaixo da linha do horizonte a cúpula assume a névoa da zona: o terreno
    // é um plano finito, e sem isso aparecia um anel pálido na borda dele
    const below = cssColor(zone?.fog?.[0], horizon);
    g.addColorStop(0, top);
    g.addColorStop(0.3, top);
    g.addColorStop(0.44, horizon);
    g.addColorStop(0.49, glow);
    g.addColorStop(0.53, horizon);
    g.addColorStop(0.62, below);
    g.addColorStop(1, below);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    if (stars) {
      for (let i = 0; i < 90; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h * 0.42;
        ctx.fillStyle = `rgba(255,255,235,${0.35 + Math.random() * 0.6})`;
        ctx.fillRect(x, y, 1.4, 1.4);
      }
    }
  });
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(170, 24, 16),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false, depthWrite: false })
  );
  scene.add(dome);
  zone.skyDome = dome;

  // nuvens:.esferas achatadas brancas, drifting devagar no update da zona
  const clouds = [];
  const cloudMat = new THREE.MeshLambertMaterial({ color: 0xfffaf0, transparent: true, opacity: 0.92, fog: false, depthWrite: false });
  for (let i = 0; i < 7; i += 1) {
    const cloud = new THREE.Group();
    const lobes = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < lobes; j += 1) {
      const lobe = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), cloudMat);
      lobe.position.set((j - lobes / 2) * 1.6, Math.random() * 0.5, Math.random() * 0.8);
      lobe.scale.set(1.7, 0.7, 1.1);
      cloud.add(lobe);
    }
    const angle = Math.random() * Math.PI * 2;
    const radius = 70 + Math.random() * 45;
    const s = 3.5 + Math.random() * 3.5;
    cloud.scale.setScalar(s);
    cloud.position.set(Math.cos(angle) * radius, 26 + Math.random() * 16, Math.sin(angle) * radius);
    scene.add(cloud);
    clouds.push(cloud);
  }

  // silhuetas ao fundo: colinas suaves ou skyline de casinhas
  const city = hills === 'city';
  if (hills === 'none') {
    zone.clouds = clouds;
    return zone;
  }
  const silhouette = new THREE.MeshBasicMaterial({ color: city ? 0x46586f : 0x3f6048, fog: false, depthWrite: false, transparent: true, opacity: 0.95 });
  const skyline = new THREE.Group();
  for (let i = 0; i < 26; i += 1) {
    const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.1;
    const radius = 95 + Math.random() * 30;
    const h = city ? 8 + Math.random() * 16 : 10 + Math.random() * 18;
    let piece;
    if (city) {
      piece = new THREE.Mesh(new THREE.BoxGeometry(8 + Math.random() * 10, h, 8), silhouette);
      if (Math.random() > 0.6) {
        const roof = new THREE.Mesh(new THREE.ConeGeometry(6, 5, 4), silhouette);
        roof.position.y = h / 2 + 2.5;
        roof.rotation.y = Math.PI / 4;
        piece.add(roof);
      }
    } else {
      piece = new THREE.Mesh(new THREE.SphereGeometry(12 + Math.random() * 10, 10, 7), silhouette);
      piece.scale.y = 0.5 + Math.random() * 0.4;
    }
    piece.position.set(Math.cos(angle) * radius, h / 2 - 2, Math.sin(angle) * radius);
    piece.lookAt(0, piece.position.y, 0);
    skyline.add(piece);
  }
  scene.add(skyline);
  zone.clouds = clouds;
  return zone;
}

// ── fundo realista: faixa panorâmica com foto de verdade ─────────────────────
// A silhueta low-poly é bonita de perto, mas no horizonte fica cartunesca demais.
// Aqui a mata real do Oxleas vira uma faixa cilíndrica em volta da fase: as
// pontas desbotam no céu e na névoa da zona, então a foto "nasce" do cenário
// em vez de parecer um cartaz colado atrás das árvores.
function photoBand(scene, zone, {
  url, radius = 125, height = 55, centerY = 10, crop = [0.08, 0.88],
  sky = '207, 230, 216', haze = '135, 183, 160',
} = {}) {
  const placeholder = canvasTexture(16, 128, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, `rgba(${sky}, 0)`);
    g.addColorStop(0.3, 'rgba(93, 126, 86, 0.92)');
    g.addColorStop(0.62, 'rgba(70, 100, 64, 1)');
    g.addColorStop(1, `rgba(${haze}, 1)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  const material = new THREE.MeshBasicMaterial({
    map: placeholder, side: THREE.BackSide, transparent: true, fog: false, depthWrite: false,
  });
  const band = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 48, 1, true), material);
  band.position.y = centerY;
  band.renderOrder = -1;
  scene.add(band);
  zone.photoBand = band;

  new THREE.TextureLoader().load(url, (texture) => {
    const image = texture.image;
    const top = Math.round(image.height * crop[0]);
    const bottom = Math.round(image.height * crop[1]);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = bottom - top;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, top, image.width, bottom - top, 0, 0, image.width, bottom - top);
    // um véu verde-acinzentado baixo tira o excesso de saturação da foto: o
    // resultado fica "realista" sem brigar com o low-poly da fase
    ctx.fillStyle = 'rgba(112, 142, 112, 0.16)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // névoa: dissolve o topo no céu e a base no chão.
    // O topo tem que sumir em TRANSPARENTE (como no placeholder), não ser
    // pintado de céu: opaco ele virava uma laje pálida de uns 19m de altura
    // no horizonte, e como a sky dome é azul chapado, a borda superior da
    // laje aparecia como uma emenda reta no meio do céu.
    const skyFade = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.44);
    skyFade.addColorStop(0, 'rgba(0, 0, 0, 1)');
    skyFade.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = skyFade;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.44);
    ctx.globalCompositeOperation = 'source-over';
    const groundFade = ctx.createLinearGradient(0, canvas.height, 0, canvas.height * 0.58);
    groundFade.addColorStop(0, `rgba(${haze}, 1)`);
    groundFade.addColorStop(1, `rgba(${haze}, 0)`);
    ctx.fillStyle = groundFade;
    ctx.fillRect(0, canvas.height * 0.58, canvas.width, canvas.height * 0.42);
    const ready = new THREE.CanvasTexture(canvas);
    ready.colorSpace = THREE.SRGBColorSpace;
    material.map = ready;
    material.needsUpdate = true;
    texture.dispose();
  }, undefined, () => {
    // sem rede/offline: fica o gradiente, que já parece uma linha de mata
  });
  return zone;
}

// sol/lua visível no céu (glow aditivo distante, casa com o DirectionalLight)
function skyGlow(scene, zone, color, x, y, z, size = 14) {
  const glow = glowSprite(scene, zone, color, size, x, y, z, { opacity: 0.55, amp: 0.05, speed: 0.6 });
  glow.material.fog = false;
  return glow;
}

// ── barreiras visuais de borda: a "cerca" que fecha o horizonte do jogável ───
// A colisão já trava em zone.bounds; isto é a moldura visual (sebe/cerca/
// treeline), pra nunca parecer que o chão acabou no nada.
function hedgeRow(scene, x1, z1, x2, z2, { height = 0.9, color = 0x2e6b34, spacing = 1.1 } = {}) {
  const length = Math.hypot(x2 - x1, z2 - z1);
  const steps = Math.max(1, Math.round(length / spacing));
  const blobs = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const x = x1 + (x2 - x1) * t;
    const z = z1 + (z2 - z1) * t;
    // mesmas bolinhas de sempre (posição, achatamento y=1.15): só viraram
    // instâncias de UM draw call em vez de um mesh por esfera
    blobs.push({ position: new THREE.Vector3(x, height * 0.55, z), scale: new THREE.Vector3(1, 1.15, 1) });
  }
  // flags de sombra idênticos ao mesh antigo: projetava, não recebia
  buildInstanced(scene, new THREE.SphereGeometry(height * 0.62, 8, 7), mat(color), blobs, { cast: true, receive: false });
}

// Portão de um vão de parede: dois postes, verga e placa com o nome da área.
// Só visual (o vão é que deixa passar) — serve para a criança enxergar por
// onde sair, em vez de bater numa parede sem pista.
function schoolGate(scene, x, z1, z2, label, side = 1) {
  for (const z of [z1, z2]) box(scene, 0.34, 2.5, 0.34, 0xe8dcc3, x, 1.25, z);
  box(scene, 0.3, 0.26, Math.abs(z2 - z1) + 0.34, 0xd8c9a8, x, 2.6, (z1 + z2) / 2);
  const sign = makeLabelSprite(label);
  sign.position.set(x + side * 0.25, 2.95, (z1 + z2) / 2);
  sign.scale.set(1.7, 0.42, 1);
  scene.add(sign);
  glowSprite(scene, scene.userData.zone, 0xffe9b8, 1.1, x + side * 0.3, 2.6, (z1 + z2) / 2, { opacity: 0.22, amp: 0.07, speed: 1.2 });
}

function railing(parent, x1, z1, x2, z2, { height = 0.9, color = 0x2f3a44 } = {}) {
  const length = Math.hypot(x2 - x1, z2 - z1);
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  const horizontal = Math.abs(x2 - x1) > Math.abs(z2 - z1);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(horizontal ? length : 0.08, 0.08, horizontal ? 0.08 : length), mat(color));
  bar.position.set(x, height, z);
  parent.add(bar);
  const lower = bar.clone();
  lower.position.y = height * 0.5;
  parent.add(lower);
  const posts = Math.max(2, Math.round(length / 1.6));
  for (let i = 0; i <= posts; i += 1) {
    const t = i / posts;
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.09, height, 0.09), mat(color));
    post.position.set(x1 + (x2 - x1) * t, height / 2, z1 + (z2 - z1) * t);
    post.castShadow = true;
    parent.add(post);
  }
}

// poste de sinalização de trilha (Green Chain Walk / Capital Ring na vida real)
function signpost(parent, x, z, rotY = 0) {
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.7, 8), mat(0x6b4a2e));
  post.position.set(x, 0.85, z);
  post.castShadow = true;
  parent.add(post);
  for (const [i, angle] of [[0, 0.35], [1, Math.PI - 0.4]].entries()) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.14, 0.05), mat(0x4a7a3a));
    arm.position.set(x + Math.cos(angle) * 0.38, 1.5 - i * 0.28, z);
    arm.rotation.y = angle + rotY;
    parent.add(arm);
  }
  return post;
}

// ── casca do bloco de ensino ─────────────────────────────────────────────────
// A escola real (Leigh Stationers' Primary Academy, Eastcote Road) é UM bloco
// longo e baixo: ~74 × 25 m no OpenStreetMap, sem alas e sem torre, com o
// Oxleas Wood encostado no terreno. Aqui o prédio já é jogável por dentro
// (salão, corredor, biblioteca), então a casca é só fachada: começa acima da
// linha do teto, não ganha colisor e não projeta sombra — os quatro vãos dos
// portões continuam abertos e o interior não escurece.
const FACADE_FRAME = 0xf2f0e6;
const FACADE_GLASS = 0x86aec2;
const FACADE_ROOF = 0x474c54;
const UPPER_Y0 = 2.36;
const UPPER_Y1 = 4.3;

// parede do andar de cima, centrada na mesma linha da parede de baixo
function upperWall(scene, x1, z1, x2, z2, material, y0 = UPPER_Y0, y1 = UPPER_Y1) {
  const w = (Math.abs(x2 - x1) || 0.3) + 0.28;
  const d = (Math.abs(z2 - z1) || 0.3) + 0.28;
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, y1 - y0, d), material);
  m.position.set((x1 + x2) / 2, (y0 + y1) / 2, (z1 + z2) / 2);
  m.castShadow = false;
  m.receiveShadow = true;
  scene.add(m);
}

// platibanda de tijolo no contorno do telhado
function roofEdge(scene, x1, z1, x2, z2, y, material, t = 0.3, h = 0.42) {
  const spans = [
    [(x1 + x2) / 2, z1, x2 - x1 + t, t],
    [(x1 + x2) / 2, z2, x2 - x1 + t, t],
    [x1, (z1 + z2) / 2, t, z2 - z1 - t],
    [x2, (z1 + z2) / 2, t, z2 - z1 - t],
  ];
  for (const [x, z, w, d] of spans) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y + h / 2, z);
    m.castShadow = false;
    m.receiveShadow = true;
    scene.add(m);
  }
}

// laje + telhado + platibanda de um trecho do bloco
function shellSection(scene, segments, [x1, z1, x2, z2], material, { storey = true } = {}) {
  for (const [ax1, az1, ax2, az2] of segments) upperWall(scene, ax1, az1, ax2, az2, material);
  const w = x2 - x1 + 0.58;
  const d = z2 - z1 + 0.58;
  const cx = (x1 + x2) / 2;
  const cz = (z1 + z2) / 2;
  // laje do teto do andar de baixo: fecha a casca por baixo
  const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, d), mat(FACADE_ROOF));
  slab.position.set(cx, 2.28, cz);
  slab.castShadow = false;
  scene.add(slab);
  if (!storey) return;
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w, 0.18, d), mat(FACADE_ROOF));
  roof.position.set(cx, UPPER_Y1 + 0.09, cz);
  roof.castShadow = false;
  roof.receiveShadow = true;
  scene.add(roof);
  roofEdge(scene, x1 - 0.29, z1 - 0.29, x2 + 0.29, z2 + 0.29, UPPER_Y1 + 0.18, material);
}

// Grade de janelas: moldura branca, vidro e montante central, tudo em
// InstancedMesh — são ~90 janelas e cabem em três draw calls.
function buildFacadeWindows(scene, windows) {
  const frames = [];
  const panes = [];
  const tmp = new THREE.Object3D();
  const push = (list, x, y, z, w, h, d) => {
    tmp.position.set(x, y, z);
    tmp.scale.set(w, h, d);
    tmp.updateMatrix();
    list.push(tmp.matrix.clone());
  };
  for (const win of windows) {
    const { face, fixed, along, y, width = 1.05, height = 1.2 } = win;
    const thinX = face === 'e' || face === 'w';
    const sign = face === 'e' || face === 's' ? 1 : -1;
    push(frames, thinX ? fixed + 0.045 * sign : along, y, thinX ? along : fixed + 0.045 * sign,
      thinX ? 0.1 : width + 0.22, height + 0.22, thinX ? width + 0.22 : 0.1);
    push(panes, thinX ? fixed + 0.1 * sign : along, y, thinX ? along : fixed + 0.1 * sign,
      thinX ? 0.1 : width, height, thinX ? width : 0.1);
    push(frames, thinX ? fixed + 0.13 * sign : along, y, thinX ? along : fixed + 0.13 * sign,
      thinX ? 0.12 : 0.07, height, thinX ? 0.07 : 0.12);
  }
  const make = (list, color) => {
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mat(color), list.length);
    list.forEach((matrix, i) => mesh.setMatrixAt(i, matrix));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    scene.add(mesh);
  };
  make(frames, FACADE_FRAME);
  make(panes, FACADE_GLASS);
}

// Placa com o nome oficial. O letreiro físico não está confirmado em fonte,
// mas o nome é oficial e o prédio precisa se identificar.
function schoolPlaque(text, { width = 3.6, height = 0.66, bg = '#1f3a5f', fg = '#fdf7e6' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  ctx.beginPath(); ctx.roundRect(8, 8, 1008, 144, 18); ctx.fill();
  ctx.strokeStyle = '#f5c542'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.roundRect(8, 8, 1008, 144, 18); ctx.stroke();
  ctx.fillStyle = fg;
  ctx.font = 'bold 60px sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 512, 86, 960);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture }));
  return mesh;
}

// Árvore barata (tronco + copa) para adensar a mata de fundo: o GLB é
// bonito mas caro, e aqui a copa só precisa fechar o horizonte.
// Com `sink`, em vez de criar 3 meshes por chamada a função só registra as
// transformações — todas lineares em `scale` — e o chamador instancia cada
// peça UMA vez (15 árvores deixam de ser 45 draw calls). As geometrias
// canônicas (escala 1) com o `scale` na matriz dão exatamente a mesma malha.
function woodCanopy(scene, x, z, scale = 1.8, sink = null) {
  if (sink) {
    sink.trunk.push({ position: new THREE.Vector3(x, scale, z), scale: new THREE.Vector3(scale, scale, scale) });
    sink.crowns[0].push({ position: new THREE.Vector3(x, 2.5 * scale, z), scale: new THREE.Vector3(scale, 0.85 * scale, scale) });
    sink.crowns[1].push({ position: new THREE.Vector3(x + 0.5 * scale, 3.2 * scale, z + 0.3 * scale), scale: new THREE.Vector3(scale, 0.85 * scale, scale) });
    return;
  }
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12 * scale, 0.2 * scale, 2 * scale, 6), mat(0x4a3626));
  trunk.position.set(x, scale, z);
  scene.add(trunk);
  for (const [dy, r, dx, dz, tone] of [
    [2.5, 1.15, 0, 0, 0x2f5d33],
    [3.2, 0.82, 0.5 * scale, 0.3 * scale, 0x3a6b3c],
  ]) {
    const crown = new THREE.Mesh(new THREE.SphereGeometry(r * scale, 8, 7), mat(tone));
    crown.position.set(x + dx, dy * scale, z + dz);
    crown.scale.y = 0.85;
    scene.add(crown);
  }
}

// ── Zona 1: escola ───────────────────────────────────────────────────────────
export function buildSchool(scene) {
  const zone = {
    name: 'school',
    spawn: [0, 0.6],
    // escola 5x maior: o corredor central continua, agora cercado de
    // pátio, parquinho, horta, quadra e campo — e o chão cobre tudo (nada de
    // "cair pra fora do mundo" nos quintais laterais, que antes eram vazios).
    bounds: { minX: -12, maxX: 12, minZ: -37, maxZ: 3.2 },
    colliders: [],
    interactables: [],
    hemi: [0xfff2d9, 0x6b5a44, 1.15],
    sun: { color: 0xffe0a8, intensity: 1.95, pos: [8, 14, 6] },
    background: 0x8fc9e8,
    fog: [0x8fc9e8, 46, 150],
    npcSpots: { finch: [-4.3, 0.8], page: [-4.8, -25.1] },
    // mundo semi-aberto: sair pelo portão da frente leva à High Street
    exits: [
      { x: 0, z: 3.0, radius: 1.7, target: 'highstreet', spawn: [0, -14.6] },
      { x: -5.9, z: -12, radius: 1.6, target: 'classroom', spawn: [0, 6.5] },
    ],
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });
  skyDome(scene, zone, { top: '#4a8fd4', horizon: '#bfe3f2', glow: '#ffe9c0', hills: 'city' });
  skyGlow(scene, zone, 0xfff0c0, -40, 34, 60, 18);

  const plaster = pbrFrom(plasterTexture(), [3, 2]);
  const brick = pbrFrom(brickTexture(), [2, 0.7], 1.2);

  // gramado base: cobre TODOS os limites (inclusive os quintais laterais e o
  // campo) — antes havia buracos sem chão ao redor do corredor.
  const lawnTexRaw = grassTexture();
  lawnTexRaw.texture.wrapS = lawnTexRaw.texture.wrapT = THREE.RepeatWrapping;
  lawnTexRaw.texture.repeat.set(8, 12);
  const lawn = new THREE.Mesh(new THREE.PlaneGeometry(26, 42), pbrFrom(lawnTexRaw, [8, 12], 1.3, [0.75, 1.0]));
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.set(0, -0.01, -16.5);
  lawn.receiveShadow = true;
  scene.add(lawn);
  // piso de cimento do pátio da frente
  const yard = new THREE.Mesh(new THREE.PlaneGeometry(15, 9), pbrFrom(stoneTexture(), [5, 3], 1.2, [0.7, 1.0]));
  yard.rotation.x = -Math.PI / 2;
  yard.position.set(0, 0, -0.5);
  yard.receiveShadow = true;
  scene.add(yard);

  const hallFloor = new THREE.Mesh(new THREE.PlaneGeometry(14.4, 10.4), pbrFrom(planksTexture(), [4, 3], 0.45, [0.55, 0.95]));
  hallFloor.rotation.x = -Math.PI / 2;
  hallFloor.position.set(0, 0, -1);
  hallFloor.receiveShadow = true;
  scene.add(hallFloor);
  const corridorFloor = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 10.4), pbrFrom(tilesTexture(), [1.4, 3.4], 1.0, [0.5, 0.9]));
  corridorFloor.rotation.x = -Math.PI / 2;
  corridorFloor.position.set(0, 0.001, -11);
  corridorFloor.receiveShadow = true;
  scene.add(corridorFloor);
  const libraryFloor = new THREE.Mesh(new THREE.PlaneGeometry(16.4, 12.4), pbrFrom(carpetTexture(), [5, 4], 0.4, [0.7, 1.0]));
  libraryFloor.rotation.x = -Math.PI / 2;
  libraryFloor.position.set(0, 0.001, -22);
  libraryFloor.receiveShadow = true;
  scene.add(libraryFloor);
  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 32), mat(0x9e3f52));
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0.5, 0.02, -21.5);
  rug.receiveShadow = true;
  scene.add(rug);
  const rugBorder = new THREE.Mesh(new THREE.RingGeometry(2.35, 2.6, 32), mat(0xc9a86a));
  rugBorder.rotation.x = -Math.PI / 2;
  rugBorder.position.set(0.5, 0.022, -21.5);
  scene.add(rugBorder);

  // paredes (vãos de portas preservados)
  //
  // Os vãos são o que liga o prédio aos quintais. Sem eles a escola 5× maior
  // ficava selada: a única porta de verdade (a da frente, em z=4) está fora
  // dos limites da fase (maxZ=3.2), então parquinho, horta, quadra e campo
  // ficavam inalcançáveis. Cada vão tem um portão com placa indicando a área,
  // e o do corredor em z −12.8..−11.2 fica em linha reta com a porta da sala
  // de aula (dentro dele) e com a quadra (do lado de fora).
  wall(scene, -7, 4, -1, 4, 2.2, brick); wall(scene, 1, 4, 7, 4, 2.2, brick);
  wall(scene, -7, -6, -7, 0.2, 2.2, plaster); wall(scene, -7, 2.4, -7, 4, 2.2, plaster);
  wall(scene, 7, -6, 7, 0.2, 2.2, plaster); wall(scene, 7, 2.4, 7, 4, 2.2, plaster);
  wall(scene, -7, -6, -1.8, -6, 2.2, plaster); wall(scene, 1.8, -6, 7, -6, 2.2, plaster);
  wall(scene, -1.8, -16, -1.8, -12.8, 2.2, plaster); wall(scene, -1.8, -11.2, -1.8, -6, 2.2, plaster);
  wall(scene, 1.8, -16, 1.8, -12.8, 2.2, plaster); wall(scene, 1.8, -11.2, 1.8, -6, 2.2, plaster);
  wall(scene, -8, -16, -1.8, -16, 2.2, plaster); wall(scene, 1.8, -16, 8, -16, 2.2, plaster);
  wall(scene, -8, -28, -8, -16, 2.2, plaster); wall(scene, 8, -28, 8, -16, 2.2, plaster);
  wall(scene, -8, -28, 8, -28, 2.2, plaster);
  schoolGate(scene, -7, 0.2, 2.4, 'GARDEN', -1);
  schoolGate(scene, 7, 0.2, 2.4, 'PLAYGROUND', 1);
  schoolGate(scene, -1.8, -12.8, -11.2, 'CLASSROOM', -1);
  schoolGate(scene, 1.8, -12.8, -11.2, 'SPORTS', 1);

  // ── casca do bloco: dois pavimentos, telhado chapado, janelas em grade ────
  // No prédio real não há alas nem torre: um bloco só, comprido. Aqui as três
  // partes jogáveis (salão, corredor, biblioteca) ganham a mesma casca, com
  // os vãos dos portões repetidos no andar de cima — de dentro do pátio o
  // jogo passa a ler "uma escola", e não três caixinhas coladas.
  shellSection(scene, [
    [-7, -6, 7, -6], [7, -6, 7, 0], [7, 2.4, 7, 4],
    [-7, -6, -7, 0], [-7, 2.4, -7, 4], [-7, 4, 7, 4],
  ], [-7, -6, 7, 4], plaster);
  shellSection(scene, [
    [1.8, -16, 1.8, -13.1], [1.8, -10.9, 1.8, -6],
    [-1.8, -16, -1.8, -13.1], [-1.8, -10.9, -1.8, -6],
    [-1.8, -16, 1.8, -16], [-1.8, -6, 1.8, -6],
  ], [-1.8, -16, 1.8, -6], plaster);
  shellSection(scene, [
    [-8, -28, 8, -28], [8, -28, 8, -16], [-8, -28, -8, -16], [-8, -16, 8, -16],
  ], [-8, -28, 8, -16], plaster);
  // anexo da sala de aula: bloco baixo de serviço, só telhado
  shellSection(scene, [
    [-7.6, -13.4, -7.6, -10.6], [-7.6, -13.4, -4.3, -13.4],
    [-4.3, -13.4, -4.3, -12.8], [-4.3, -11.2, -4.3, -10.6], [-7.6, -10.6, -4.3, -10.6],
  ], [-7.6, -13.4, -4.3, -10.6], plaster, { storey: false });

  // janelas: duas fileiras (pavimento térreo y=1.3, cima y=3.33), ritmo
  // regular, pulando portões, hera, gol e a porta do anexo
  const windows = [];
  const rows = (face, fixed, ground, upper) => {
    for (const p of ground) windows.push({ face, fixed, along: p, y: 1.3 });
    for (const p of upper) windows.push({ face, fixed, along: p, y: 3.33 });
  };
  rows('e', 7.29, [-5.2, -3, -0.8, 3.3], [-5.2, -3, -0.8, 3.3]);            // salão, lado do parquinho
  rows('w', -7.29, [-4.8, 3.3], [-5.2, -3, -0.8, 3.3]);                   // salão, lado da horta (a hera ocupa o meio)
  rows('e', 2.09, [-15.4, -13.6, -10.6, -8.8, -7], [-15.4, -13.6, -10.4, -8.2, -6.6]);
  rows('w', -2.09, [-15.4, -13.6, -10.6, -8.8, -7], [-15.4, -13.6, -10.4, -8.2, -6.6]);
  rows('e', 8.29, [-27, -24.8, -22.6, -20.4, -18.2, -16.8], [-27, -24.8, -22.6, -20.4, -18.2, -16.8]);
  rows('w', -8.29, [-27, -24.8, -22.6, -20.4, -18.2, -16.8], [-27, -24.8, -22.6, -20.4, -18.2, -16.8]);
  rows('n', -28.29, [-6.6, -4.4, -2.2, 2.2, 4.4, 6.6], [-6.6, -4.4, -2.2, 0, 2.2, 4.4, 6.6]);
  rows('s', -15.71, [2.8, 5, 7.2], [2.8, 5, 7.2]);                       // testeira da biblioteca, olhada do pátio
  rows('s', -15.71, [-2.8, -5, -7.2], [-2.8, -5, -7.2]);
  rows('w', -7.75, [-12], [-12]);                                          // anexo
  rows('s', -10.45, [-5.95], [-5.95]);
  buildFacadeWindows(scene, windows);

  // letreiro do escola no segundo pavimento: é a fachada que a criança vê do
  // parquinho e da horta (a da frente só existe de dentro do salão)
  const plaqueEast = schoolPlaque("LEIGH STATIONERS' PRIMARY ACADEMY", { width: 4.2 });
  plaqueEast.position.set(7.33, 3.9, -2.7);
  plaqueEast.rotation.y = Math.PI / 2;
  scene.add(plaqueEast);
  const plaqueWest = schoolPlaque("LEIGH STATIONERS' PRIMARY", { width: 3.4 });
  plaqueWest.position.set(-7.33, 3.9, -3);
  plaqueWest.rotation.y = -Math.PI / 2;
  scene.add(plaqueWest);

  // detalhes de telhado: casa do elevador e duas caixas de ventilação
  box(scene, 2.2, 1.3, 2.2, plaster, 4.6, 5.05, -22, { cast: false });
  box(scene, 2.4, 0.16, 2.4, mat(FACADE_ROOF), 4.6, 5.78, -22, { cast: false });
  for (const vx of [-4.4, 2.2]) {
    box(scene, 0.7, 0.5, 0.7, mat(FACADE_ROOF), vx, 4.73, -1, { cast: false });
  }

  // entrada: porta em arco de madeira + emblema brilhando
  box(scene, 1.9, 2.1, 0.14, 0x4e3520, 0, 1.05, 4.05);
  const archTrim = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.14, 20, 1, false, 0, Math.PI), mat(0x4e3520));
  archTrim.rotation.set(Math.PI / 2, 0, 0);
  archTrim.position.set(0, 2.1, 4.05);
  scene.add(archTrim);
  const doorEmblem = makeTreeEmblem(0.3);
  doorEmblem.position.set(0, 2.1, 4.16);
  scene.add(doorEmblem);
  glowSprite(scene, zone, 0xffd166, 1.3, 0, 2.1, 4.3, { opacity: 0.35, amp: 0.12 });

  // letreiro de dentro do salão: quem chega da High Street olha para a parede
  // da frente e vê o nome oficial da escola e a placa da rua (Eastcote Road)
  const plaqueHall = schoolPlaque("LEIGH STATIONERS' PRIMARY ACADEMY", { width: 3.4 });
  plaqueHall.position.set(-3.3, 1.5, 3.92);
  plaqueHall.rotation.y = Math.PI;
  scene.add(plaqueHall);
  const streetPlate = schoolPlaque('EASTCOTE ROAD', { width: 1.7, height: 0.42, bg: '#2b2b2b' });
  streetPlate.position.set(3.1, 1.55, 3.92);
  streetPlate.rotation.y = Math.PI;
  scene.add(streetPlate);

  // janelas do salão com moldura, brilho e feixe de luz
  for (const z of [-3.4, -0.6, 2.2]) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.4), glowMat(0xffe9b8, 0.95));
    pane.position.set(6.82, 1.5, z);
    pane.rotation.y = -Math.PI / 2;
    scene.add(pane);
    for (const mx of [-0.5, 0, 0.5]) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 0.06), mat(0xefe3c8));
      bar.position.set(6.78, 1.5, z + mx);
      scene.add(bar);
    }
    glowSprite(scene, zone, 0xffd88a, 2.2, 6.2, 1.5, z, { opacity: 0.28, amp: 0.08, speed: 1.4 });
    lightShaft(scene, 5.4, 1.4, z, { radius: 1.1, height: 4.4, tilt: -0.9, opacity: 0.09 });
  }
  for (const z of [-8.5, -11.5, -14.5]) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.2), glowMat(0xffe9b8, 0.9));
    pane.position.set(1.68, 1.5, z);
    pane.rotation.y = -Math.PI / 2;
    scene.add(pane);
    glowSprite(scene, zone, 0xffd88a, 1.7, 1.2, 1.5, z, { opacity: 0.24, amp: 0.08, speed: 1.6 });
    lightShaft(scene, -0.2, 1.4, z, { radius: 0.9, height: 4, tilt: -1.1, opacity: 0.08 });
  }

  // mural de avisos com papéis
  box(scene, 0.12, 1.5, 2.4, 0x6b4a2a, 6.85, 1.6, 0.2);
  box(scene, 0.05, 1.2, 2.1, 0xc9a86a, 6.76, 1.6, 0.2);
  for (const [pz, rot] of [[-0.5, 0.08], [0.2, -0.05], [0.9, 0.06]]) {
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.42), new THREE.MeshLambertMaterial({ map: paperTexture() }));
    paper.position.set(6.72, 1.62, pz);
    paper.rotation.y = -Math.PI / 2 + rot;
    scene.add(paper);
  }
  addInteract('board', 5.9, 0.2, 1.7);

  // Sr. Finch: carrinho + vassoura
  box(scene, 0.9, 0.65, 0.6, 0x5a6a72, -5.6, 0.42, -0.6, { collider: true });
  box(scene, 0.9, 0.08, 0.6, 0x3d4a50, -5.6, 0.8, -0.6);
  const broom = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 6), mat(0x8a5a2a));
  broom.position.set(-5.0, 0.75, -1.3);
  broom.rotation.z = 0.35;
  broom.castShadow = true;
  scene.add(broom);

  // porta de heras (parede de tijolo + heras + árvore dourada brilhando)
  const brickPatch = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.6, 2.6), brick);
  brickPatch.position.set(-6.9, 1.3, -2.2);
  scene.add(brickPatch);
  box(scene, 0.18, 2.1, 1.7, 0x2f5d33, -6.88, 1.05, -2.2);
  const ivyEmblem = makeTreeEmblem(0.38);
  ivyEmblem.position.set(-6.76, 1.3, -2.2);
  ivyEmblem.rotation.y = Math.PI / 2;
  scene.add(ivyEmblem);
  const ivyTex = ivyTexture();
  for (let i = 0; i < 14; i += 1) {
    const ivy = spritePlane(ivyTex, 0.4 + Math.random() * 0.25);
    ivy.position.set(-6.72 + Math.random() * 0.1, 0.5 + Math.random() * 1.8, -2.2 + (Math.random() - 0.5) * 1.9);
    ivy.rotation.y = Math.PI / 2 + (Math.random() - 0.5) * 0.4;
    scene.add(ivy);
  }
  const ivyGlow = new THREE.PointLight(0xf5c542, 7, 5.5);
  ivyGlow.position.set(-6.1, 1.5, -2.2);
  scene.add(ivyGlow);
  glowSprite(scene, zone, 0xffd166, 1.7, -6.5, 1.35, -2.2, { opacity: 0.4, amp: 0.15 });
  addInteract('ivyDoor', -5.9, -2.2, 1.7);

  plant(scene, -6.2, 3.1, tuftTexture());
  plant(scene, 6.2, -5.2, tuftTexture());
  box(scene, 1.6, 0.42, 0.55, 0x7a5a34, 4.6, 0.21, -3.2, { collider: true });

  // corredor: armários com respiros, placa da árvore, carrinho de livros.
  // os armários NÃO podem cobrir o vão do portão oeste (z −12.8..−11.2): com a
  // fileira inteira eles tapavam a calçada e a rota da sala de aula
  for (const z of [-7.2, -9.2, -15]) {
    box(scene, 0.45, 1.9, 1.7, 0x2c3560, -1.55, 0.95, z, { collider: true });
    const vents = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 1.1), mat(0x1d2445));
    vents.position.set(-1.31, 1.25, z);
    scene.add(vents);
    const handle = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), mat(0xf5c542));
    handle.position.set(-1.29, 1.0, z - 0.55);
    scene.add(handle);
  }
  const signPane = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.5), glowMat(0x3d5a80, 0.55));
  signPane.position.set(1.7, 1.5, -8.5);
  signPane.rotation.y = -Math.PI / 2;
  scene.add(signPane);
  const signTree = makeTreeEmblem(0.34);
  signTree.position.set(1.62, 1.5, -8.5);
  signTree.rotation.y = -Math.PI / 2;
  scene.add(signTree);
  const signGlow = new THREE.PointLight(0xf5c542, 6, 5);
  signGlow.position.set(1.0, 1.5, -8.5);
  scene.add(signGlow);
  glowSprite(scene, zone, 0xffd166, 1.5, 1.35, 1.5, -8.5, { opacity: 0.4, amp: 0.14 });
  addInteract('signTree', 0.9, -8.5, 1.4);

  // o carrinho mora na biblioteca: no corredor ele tapava a boca do portão
  // oeste (z≈-12,5) e a saída para a biblioteca (z≈-15)
  box(scene, 1.1, 0.7, 0.55, 0x7a4a2a, -5.4, 0.45, -19.3, { collider: true });
  box(scene, 1.0, 0.3, 0.45, 0xc0392b, -5.4, 0.95, -19.3);
  box(scene, 0.16, 0.24, 0.3, 0x3e6cb0, -5.6, 1.25, -19.3);
  addInteract('pieceTrolley', -4.8, -18.8, 1.5);

  // biblioteca: estantes com espinhas de livros
  shelfWithBooks(scene, -3.2, -27.55, 4.4, 0.7, 's');
  shelfWithBooks(scene, 3.2, -27.55, 4.4, 0.7, 's');
  shelfWithBooks(scene, -7.55, -21.5, 0.7, 7.4, 'e');
  shelfWithBooks(scene, 7.55, -21.5, 0.7, 7.4, 'w');
  shelfWithBooks(scene, 2.9, -19.6, 2.6, 0.8, 'ns');
  shelfWithBooks(scene, -3.4, -23.4, 2.6, 0.8, 'ns');

  // peça do mapa brilhando na estante leste (concealed!)
  const glint = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.38), glowMat(0xfff3b0));
  glint.position.set(7.12, 1.25, -22.5);
  glint.rotation.y = -Math.PI / 2;
  scene.add(glint);
  zone.glint = glint;
  glowSprite(scene, zone, 0xfff3b0, 0.9, 7.0, 1.25, -22.5, { opacity: 0.5, amp: 0.25, speed: 3 });
  addInteract('pieceShelf', 6.6, -22.5, 1.6);

  // mesa de leitura + livro aberto + pista embaixo
  box(scene, 3.2, 0.5, 1.5, 0x6b4a2a, 0.5, 0.5, -21.5, { collider: true });
  const openBook = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.36), mat(0xf2ede0));
  openBook.position.set(0.2, 0.79, -21.4);
  openBook.rotation.y = 0.3;
  scene.add(openBook);
  for (const [cx, cz] of [[-0.8, -20.4], [1.8, -20.4], [-0.8, -22.6], [1.8, -22.6]]) {
    box(scene, 0.4, 0.45, 0.4, 0x8a5a34, cx, 0.22, cz);
  }
  // abajures quentes
  for (const [lx, lz] of [[-0.9, -22.2], [1.9, -20.8]]) {
    const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.24, 8), mat(0x8a5a2a));
    stand.position.set(lx, 0.62, lz);
    scene.add(stand);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.16, 10), glowMat(0xffd88a));
    shade.position.set(lx, 0.8, lz);
    scene.add(shade);
    const lamp = new THREE.PointLight(0xffc36a, 3.5, 3.5);
    lamp.position.set(lx, 0.85, lz);
    scene.add(lamp);
    glowSprite(scene, zone, 0xffc36a, 0.8, lx, 0.85, lz, { opacity: 0.3, amp: 0.06, speed: 1.2 });
  }
  addInteract('clueTable', 0.5, -21.5, 2.1);

  // quest da encomenda: começo com a Sra. Page e pena azul no carvalho
  addInteract('orderStart', -5.5, -26.4, 1.8);
  addInteract('orderFeather', 3.3, -5.6, 1.5);

  // pilhas de livros reais (Antique Book Set, CC-BY) na mesa e pelo chão da biblioteca
  const bookSrc = glbSource(MODEL_FILES.props.books);
  if (bookSrc) {
    for (const [bx, by, bz, ry, s] of [
      [2.7, 0.78, -21.6, 0.4, 1.0],
      [3.6, 0.78, -21.3, 2.2, 0.8],
      [0.9, 0.045, -20.2, 1.1, 0.9],
      [-2.4, 0.045, -20.8, 0.2, 0.7],
      [6.9, 0.045, -24.0, 2.8, 1.0],
    ]) {
      const stack = bookSrc.scene.clone(true);
      stack.traverse((c) => {
        if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; }
      });
      stack.position.set(bx, by, bz);
      stack.rotation.y = ry;
      stack.scale.setScalar(s * 1.6);
      scene.add(stack);
    }
  }

  // mesa da Sra. Page + globo
  box(scene, 1.9, 0.75, 0.9, 0x5d3f26, -5.5, 0.375, -26.4, { collider: true });
  // globo da biblioteca que GIRA — com Malta pinada (pedido da amiga maltesa
  // da Julia): textura de planeta, bandeirola maltesa e etiqueta na ilha.
  // Fica no canto oeste, FORA da linha de visão da Sra. Page (que o tapava).
  const globeGroup = new THREE.Group();
  globeGroup.position.set(-6.9, 1.1, -22.8);
  const globe = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 18), new THREE.MeshLambertMaterial({ map: makeEarthTexture() }));
  globe.castShadow = true;
  globeGroup.add(globe);
  {
    // Malta: lon 14.4E, lat 35.9N sobre a esfera (raio 0.24) + bandeirola
    const phi = 0.539 * Math.PI * 2;
    const theta = ((90 - 35.9) / 180) * Math.PI;
    const dir = new THREE.Vector3(
      -Math.cos(phi) * Math.sin(theta),
      Math.cos(theta),
      Math.sin(phi) * Math.sin(theta)
    ).normalize();
    const pin = new THREE.Group();
    pin.position.copy(dir).multiplyScalar(0.24);
    pin.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.14, 6), mat(0x3a2a20));
    stick.position.y = 0.07;
    pin.add(stick);
    const flagWhite = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.045, 0.004), mat(0xf2ede0));
    flagWhite.position.set(0.015, 0.135, 0);
    pin.add(flagWhite);
    const flagRed = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.045, 0.004), mat(0xcf3b3b));
    flagRed.position.set(0.044, 0.135, 0);
    pin.add(flagRed);
    globeGroup.add(pin);
    const label = makeLabelSprite('MALTA');
    label.scale.set(0.44, 0.44, 1);
    label.position.copy(dir).multiplyScalar(0.24).add(new THREE.Vector3(0, 0.14, 0)); // baixinha: não corta no quadro do close
    globeGroup.add(label);
  }
  globeGroup.rotation.y = 0.87; // Malta começa virada para quem chega da biblioteca
  scene.add(globeGroup);
  zone.globe = globeGroup; // gira devagar no update da zona
  const globeColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.62, 8), mat(0x8a5a2a));
  globeColumn.position.set(-6.9, 0.47, -22.8);
  globeColumn.castShadow = true;
  scene.add(globeColumn);
  const globeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.08, 12), mat(0x5d3f26));
  globeBase.position.set(-6.9, 0.06, -22.8);
  globeBase.castShadow = true;
  scene.add(globeBase);

  // cartas da Memória da Biblioteca: par de cartas douradas deitadas na mesa
  // de leitura, com brilho suave — âncora do minigame (src/games/memory.js)
  for (const [cardX, cardZ, rot] of [[-2.3, -20.8, 0.5], [-2.55, -20.75, -0.4]]) {
    const card = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.42), glowMat(0xffd166));
    card.position.set(cardX, 0.56, cardZ);
    card.rotation.y = rot;
    card.castShadow = true;
    scene.add(card);
  }
  glowSprite(scene, zone, 0xffd166, 0.7, -2.4, 0.62, -20.8, { opacity: 0.32, amp: 0.08, speed: 1.4 });
  addInteract('memoryLibrary', -2.4, -20.8, 1.6);

  addInteract('page', -4.8, -25.1, 1.9);
  addInteract('finch', -4.3, 0.8, 1.9);
  // o globo da biblioteca virou ponto de visita (Malta nele!)
  addInteract('globe', -6.3, -23.6, 1.3);

  // ── expansão: as novas áreas da escola (tudo sobre o gramado base) ──────
  // Árvores do GLB viram instâncias (cada clone eram 6 draw calls — o pack
  // tem 6 primitivas); posições, rotação aleatória por árvore, escala ×1,5 e
  // colliders exatamente como no caminho de clone.
  const schoolTreeSrc = glbSource(MODEL_FILES.props.trees);
  const schoolTreeInstances = [];
  const schoolTree = (x, z, scale = 1.2, collider = true) => {
    if (!schoolTreeSrc) return;
    schoolTreeInstances.push({ x, y: 0, z, rotY: Math.random() * Math.PI * 2, scale: scale * 1.5 });
    if (collider) addCollider(scene, x, z, 0.7 * scale, 0.7 * scale);
  };

  // anexo da sala de aula (a porta que leva à zona classroom)
  wall(scene, -7.6, -13.4, -7.6, -10.6, 2.2, brick);
  wall(scene, -7.6, -13.4, -4.3, -13.4, 2.2, plaster);
  wall(scene, -7.6, -10.6, -4.3, -10.6, 2.2, plaster);
  wall(scene, -4.3, -13.4, -4.3, -12.8, 2.2, plaster);
  wall(scene, -4.3, -11.2, -4.3, -10.6, 2.2, plaster);
  box(scene, 0.14, 0.6, 1.6, plaster, -4.3, 1.9, -12); // verga da porta
  const annexSign = makeLabelSprite('CLASSROOM');
  annexSign.position.set(-4.35, 1.75, -12);
  annexSign.rotation.y = Math.PI / 2;
  annexSign.scale.set(1.5, 0.38, 1);
  scene.add(annexSign);

  // gramado da frente (oeste): árvores, bancos, canteiros
  schoolTree(-9.4, 0.8, 1.4);
  schoolTree(-10.6, -1.8, 1.0);
  for (const [bx, bz] of [[-8.2, 2.2], [-10.9, 1.6]]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 1.7), mat(0x6b4a2a));
    bench.position.set(bx, 0.21, bz);
    bench.castShadow = true;
    scene.add(bench);
    addCollider(scene, bx, bz, 0.3, 0.9);
  }
  for (const [px, pz] of [[-7.9, 0.4], [-7.9, -1.4], [-11.4, -0.4]]) plant(scene, px, pz, tuftTexture());

  // parquinho (leste da frente): escorregador, balanço duplo e caixote de areia
  const rubber = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 6.6), mat(0xc0603f));
  rubber.rotation.x = -Math.PI / 2;
  rubber.position.set(9.6, 0.01, -0.6);
  rubber.receiveShadow = true;
  scene.add(rubber);
  railing(scene, 7.5, -3.9, 11.7, -3.9, { height: 0.8 });
  railing(scene, 11.7, -3.9, 11.7, 2.7, { height: 0.8 });
  railing(scene, 7.5, 2.7, 11.7, 2.7, { height: 0.8 });
  // escorregador
  const slideTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), mat(0x3f7d6a));
  slideTop.position.set(8.5, 0.9, 0.8);
  slideTop.castShadow = true;
  scene.add(slideTop);
  addCollider(scene, 8.5, 0.8, 0.5, 0.5);
  const slideRamp = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 2.4), mat(0xf2c14e));
  slideRamp.position.set(8.5, 0.55, -0.9);
  slideRamp.rotation.x = 0.5;
  slideRamp.castShadow = true;
  scene.add(slideRamp);
  // balanço duplo
  for (const fx of [10.4, 11.2]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.8, 0.1), mat(0x2f3a44));
    leg.position.set(fx, 0.9, -1.6);
    leg.rotation.z = fx < 11 ? -0.22 : 0.22;
    leg.castShadow = true;
    scene.add(leg);
  }
  const swingBar = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.08), mat(0x2f3a44));
  swingBar.position.set(10.8, 1.75, -1.6);
  scene.add(swingBar);
  for (const sx of [10.55, 11.05]) {
    const rope = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.1, 0.03), mat(0xe8dcc3));
    rope.position.set(sx, 1.2, -1.6);
    scene.add(rope);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.24), mat(0xc0392b));
    seat.position.set(sx, 0.62, -1.6);
    scene.add(seat);
  }
  addCollider(scene, 10.8, -1.6, 0.8, 0.3);
  // caixote de areia
  box(scene, 2.0, 0.25, 1.6, 0x6b4a2e, 9.3, 0.12, -3.0, { collider: true });
  const sand = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.4), mat(0xe8d9a0));
  sand.position.set(9.3, 0.27, -3.0);
  scene.add(sand);
  // guarda-chuva perdido da Sra. Page (aventura)
  const umbrella = new THREE.Group();
  const umbrellaShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8), mat(0x3a2a1a));
  umbrellaShaft.position.y = 0.4;
  umbrella.add(umbrellaShaft);
  const umbrellaCanopy = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.4, 8), mat(0x8e3f6b));
  umbrellaCanopy.position.y = 0.85;
  umbrella.add(umbrellaCanopy);
  umbrella.position.set(11.3, 0, 2.0);
  umbrella.rotation.z = 0.5;
  scene.add(umbrella);
  glowSprite(scene, zone, 0xff9de2, 1.0, 11.3, 0.7, 2.0, { opacity: 0.4, amp: 0.18, speed: 2.4 });
  addInteract('umbrellaSpot', 11.0, 2.0, 1.5);
  addInteract('playground', 9.4, -1.2, 2.0);
  addInteract('wordsSchool', 10.6, 0.6, 1.5);
  // A criança fala a palavra em inglês neste ponto ao lado do parquinho.
  addInteract('listenSchool', 8.0, -4.8, 1.5);

  // ── horta (oeste, meio): estufa de vidro + canteiros elevados ─────────────
  const soil = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 8.4), mat(0x6b4a2e));
  soil.rotation.x = -Math.PI / 2;
  soil.position.set(-9.6, 0.012, -9.4);
  soil.receiveShadow = true;
  scene.add(soil);
  // estufa
  const greenhouseBase = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.9, 3.0), mat(0x9e8a6a));
  greenhouseBase.position.set(-9.6, 0.45, -12.2);
  greenhouseBase.castShadow = true;
  scene.add(greenhouseBase);
  addCollider(scene, -9.6, -12.2, 1.3, 1.5);
  const greenhouseGlass = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.3, 2.9),
    new THREE.MeshPhongMaterial({ color: 0xcfe8d8, transparent: true, opacity: 0.32, shininess: 90 })
  );
  greenhouseGlass.position.set(-9.6, 1.55, -12.2);
  scene.add(greenhouseGlass);
  for (const [gx, gz] of [[-10.8, -13.6], [-8.4, -13.6], [-10.8, -10.8], [-8.4, -10.8]]) {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), mat(0x4a7a3a));
    frame.position.set(gx, 1.05, gz);
    scene.add(frame);
  }
  glowSprite(scene, zone, 0xbfffd0, 1.6, -9.6, 1.5, -12.2, { opacity: 0.22, amp: 0.06, speed: 1.2 });
  // canteiros com legumes
  for (const [bx, bz] of [[-9.6, -7.4], [-9.6, -5.4]]) {
    box(scene, 2.4, 0.35, 1.4, 0x8a5a34, bx, 0.18, bz, { collider: true });
    for (let r = 0; r < 2; r += 1) {
      for (let c = 0; c < 3; c += 1) {
        const veg = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 7), mat(r === 0 ? 0x4a9148 : 0xc0603f));
        veg.position.set(bx - 0.7 + c * 0.7, 0.42, bz - 0.3 + r * 0.6);
        veg.scale.y = 0.8;
        scene.add(veg);
      }
    }
  }
  const wateringCan = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.17, 0.3, 10), mat(0x3f6cb0));
  wateringCan.position.set(-8.6, 0.15, -8.6);
  scene.add(wateringCan);
  // espantalho
  const scarecrowPost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.5, 8), mat(0x6b4a2e));
  scarecrowPost.position.set(-11.0, 0.75, -10.0);
  scene.add(scarecrowPost);
  const scarecrowHead = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8), mat(0xe8d9a0));
  scarecrowHead.position.set(-11.0, 1.6, -10.0);
  scarecrowHead.castShadow = true;
  scene.add(scarecrowHead);
  const scarecrowHat = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.3, 8), mat(0xb56a4a));
  scarecrowHat.position.set(-11.0, 1.9, -10.0);
  scene.add(scarecrowHat);
  addInteract('garden', -9.4, -8.6, 2.0);

  // ── quadra esportiva (leste, fundos): MUGA com gols + tabela de jogos ────
  const court = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 14), mat(0x3f6c8a));
  court.rotation.x = -Math.PI / 2;
  court.position.set(9.6, 0.012, -14);
  court.receiveShadow = true;
  scene.add(court);
  for (const lz of [-14, -20, -8]) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(3.8, 0.08), mat(0xf2ede0));
    line.rotation.x = -Math.PI / 2;
    line.position.set(9.6, 0.025, lz);
    scene.add(line);
  }
  const centerLine = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 13.6), mat(0xf2ede0));
  centerLine.rotation.x = -Math.PI / 2;
  centerLine.position.set(9.6, 0.025, -14);
  scene.add(centerLine);
  for (const gz of [-19.6, -8.4]) {
    const goal = new THREE.Group();
    for (const gx of [-0.6, 0.6]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), mat(0xf2ede0));
      post.position.set(gx, 0.55, 0);
      goal.add(post);
    }
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.08, 0.08), mat(0xf2ede0));
    bar.position.set(0, 1.1, 0);
    goal.add(bar);
    goal.position.set(9.6, 0, gz);
    scene.add(goal);
  }
  // tabela de jogos presa na cerca (página escondida)
  const timetable = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.9, 1.3), mat(0x4a3a2a));
  timetable.position.set(11.5, 1.1, -18.4);
  timetable.castShadow = true;
  scene.add(timetable);
  glowSprite(scene, zone, 0xfff3b0, 0.8, 11.3, 1.3, -18.4, { opacity: 0.4, amp: 0.2, speed: 2.4 });
  addInteract('clueTimetable', 11.2, -18.4, 1.4);
  addInteract('sports', 9.6, -14, 2.2);
  railing(scene, 7.5, -21.2, 11.7, -21.2, { height: 1.1 });
  railing(scene, 7.5, -21.2, 7.5, -6.8, { height: 1.1 });
  railing(scene, 11.7, -21.2, 11.7, -6.8, { height: 1.1 });
  railing(scene, 7.5, -6.8, 11.7, -6.8, { height: 1.1 });

  // ── campo de futebol (atrás da biblioteca, o "fundo" da escola) ──────────
  const pitch = new THREE.Mesh(new THREE.PlaneGeometry(22, 8), mat(0x3f7d3a));
  pitch.rotation.x = -Math.PI / 2;
  pitch.position.set(0, 0.008, -32.5);
  pitch.receiveShadow = true;
  scene.add(pitch);
  const circle = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.55, 32), mat(0xf2ede0));
  circle.rotation.x = -Math.PI / 2;
  circle.position.set(0, 0.02, -32.5);
  scene.add(circle);
  for (const gz of [-36.3, -28.7]) {
    const goal = new THREE.Group();
    for (const gx of [-0.9, 0.9]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.3, 0.1), mat(0xf2ede0));
      post.position.set(gx, 0.65, 0);
      goal.add(post);
    }
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.1, 0.1), mat(0xf2ede0));
    bar.position.set(0, 1.3, 0);
    goal.add(bar);
    goal.position.set(0, 0, gz);
    scene.add(goal);
  }
  const track = new THREE.Mesh(new THREE.PlaneGeometry(24, 1.6), pbrFrom(dirtTexture(), [8, 1], 1.0, [0.75, 1.0]));
  track.rotation.x = -Math.PI / 2;
  track.position.set(0, 0.006, -28.2);
  scene.add(track);
  for (const bx of [-8, 8]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 1.7), mat(0x6b4a2a));
    bench.position.set(bx, 0.21, -28.6);
    bench.castShadow = true;
    scene.add(bench);
    addCollider(scene, bx, -28.6, 0.3, 0.9);
  }
  addInteract('field', 0, -32.5, 2.4);
  // ── Oxleas Wood fechando o terreno ───────────────────────────────────────
  // Na escola real a mata encosta no terreno — no OpenStreetMap a escola e
  // Oxleas Wood compartilham a divisa — e são essas árvores do fundo que a
  // Julia reconhece nas fotos. Aqui: fileira de árvores do GLB na beira do
  // campo, copa mais barata atrás da sebe e laterais fechando o gramado.
  // Todas sem colisor: quem fecha o gramado é a sebe.
  for (let i = 0; i < 11; i += 1) schoolTree(-11 + i * 2.2, -36.3 - (i % 2) * 0.4, 1.5 + (i % 3) * 0.3, false);
  // copas baratas do horizonte: as 3 peças de sempre (sem sombra, como antes),
  // agora 1 InstancedMesh por peça em vez de 3 meshes por árvore
  const canopySink = { trunk: [], crowns: [[], []] };
  for (let i = 0; i < 9; i += 1) woodCanopy(scene, -11 + i * 2.7, -37.2, 1.9 + (i % 3) * 0.4, canopySink);
  for (let i = 0; i < 5; i += 1) {
    schoolTree(-11.6, -2 - i * 8, 1.3, false);
    schoolTree(11.6, -2 - i * 8, 1.3, false);
  }
  for (const [cx, cz] of [[-12.1, -3], [12.1, -3], [-12.1, -19], [12.1, -19], [-12.1, -35], [12.1, -35]]) {
    woodCanopy(scene, cx, cz, 1.7, canopySink);
  }
  addGlbCopies(scene, schoolTreeSrc, schoolTreeInstances);
  buildInstanced(scene, new THREE.CylinderGeometry(0.12, 0.2, 2, 6), mat(0x4a3626), canopySink.trunk, { cast: false, receive: false });
  buildInstanced(scene, new THREE.SphereGeometry(1.15, 8, 7), mat(0x2f5d33), canopySink.crowns[0], { cast: false, receive: false });
  buildInstanced(scene, new THREE.SphereGeometry(0.82, 8, 7), mat(0x3a6b3c), canopySink.crowns[1], { cast: false, receive: false });

  // barreiras de borda: sebes fecham o gramado (nada de "fora do mundo")
  hedgeRow(scene, -11.8, 3.0, -11.8, -36.8, { height: 1.0 });
  hedgeRow(scene, 11.8, 3.0, 11.8, -36.8, { height: 1.0 });
  hedgeRow(scene, -11.8, -36.9, 11.8, -36.9, { height: 1.1 });
  hedgeRow(scene, -11.8, 3.0, -2.2, 3.0, { height: 0.8 });
  hedgeRow(scene, 2.2, 3.0, 11.8, 3.0, { height: 0.8 });

  zone.update = (dt, t) => {
    updatePulses(zone, t);
    if (zone.glint) zone.glint.material.opacity = 0.55 + 0.45 * Math.sin(t * 3.2);
    ivyEmblem.scale.setScalar(1 + 0.04 * Math.sin(t * 2.4));
    for (const cloud of zone.clouds) cloud.position.x += dt * 0.35; // nuvens derivam
    if (zone.globe) zone.globe.rotation.y += dt * 0.18; // globo da biblioteca gira (Malta inclusive)
  };
  stashZoneResources(scene); // roadmap 3.3: lembra os recursos p/ liberar na próxima troca
  return zone;
}

// ── Zona 2: trilha na mata (Oxleas) ──────────────────────────────────────────
export function buildHighStreet(scene) {
  const zone = {
    name: 'highstreet',
    spawn: [0, 12.4],
    bounds: { minX: -7, maxX: 7, minZ: -16, maxZ: 16 },
    colliders: [],
    interactables: [],
    hemi: [0xfff2d9, 0x5a5a6e, 1.2],
    sun: { color: 0xffe2b0, intensity: 1.8, pos: [6, 15, 8] },
    background: 0x7ab8d8,
    fog: [0x7ab8d8, 40, 130],
    npcSpots: { baker: [2.2, -6] },
    // saídas: sul → woods, norte → school (mundo semi-aberto, anda-e-entra)
    exits: [
      { x: 0, z: 15.4, radius: 1.6, target: 'woods', spawn: [0, -14], flag: 'gateOpen' },
      { x: 0, z: -15.4, radius: 1.6, target: 'school', spawn: [0, 1.2] },
      // z=-3 fica no vão entre as fileiras de lojas: em z=0.2 o centro da saída
      // encostava na fachada da TEA ROOM (começa em z=0.3) e a personagem
      // aparecia dentro da parede ao chegar da academia
      { x: 5.9, z: -3.0, radius: 1.5, target: 'academy', spawn: [0, 10.5] },
    ],
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });
  skyDome(scene, zone, { top: '#3f86c9', horizon: '#cfe3ee', glow: '#ffe9c0', hills: 'city' });
  skyGlow(scene, zone, 0xfff0c0, 55, 38, 40, 16);

  // calçada cobre TODA a rua (antes havia buracos sem chão nas laterais —
  // dava pra "cair pra fora do mundo" andando ao lado das lojas)
  const pavementTexRaw = stoneTexture();
  pavementTexRaw.texture.wrapS = pavementTexRaw.texture.wrapT = THREE.RepeatWrapping;
  pavementTexRaw.texture.repeat.set(5, 12);
  const pavement = new THREE.Mesh(new THREE.PlaneGeometry(15, 34), pbrFrom(pavementTexRaw, [5, 12], 1.5, [0.7, 1.0]));
  pavement.rotation.x = -Math.PI / 2;
  pavement.position.set(0, -0.01, 0);
  pavement.receiveShadow = true;
  scene.add(pavement);
  // canteiros floridos — reposicionados para a calçada livre entre a pista e
  // as fachadas contínuas (as antigas ficavam DENTRO dos prédios novos)
  const planterSpots = [[-3.7, -13.4], [-3.7, 9.2], [-3.7, 12.9], [3.7, -13.2], [3.7, 12.6], [-3.7, -15.1]];
  for (const [px, pz] of planterSpots) {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 1.4), mat(0x8a5a34));
    planter.position.set(px, 0.22, pz);
    planter.castShadow = true;
    scene.add(planter);
    for (let f = 0; f < 3; f += 1) {
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 7), mat([0xc0392b, 0xf2c14e, 0xb8d8ff][f % 3]));
      flower.position.set(px, 0.55, pz - 0.45 + f * 0.45);
      scene.add(flower);
    }
  }

  // pista de asfalto (mais escura que a calçada de pedra — contraste de via)
  const roadTexRaw = stoneTexture();
  roadTexRaw.texture.wrapS = roadTexRaw.texture.wrapT = THREE.RepeatWrapping;
  roadTexRaw.texture.repeat.set(4, 12);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 36), pbrFrom(roadTexRaw, [4, 12], 1.5, [0.7, 1.0]));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, 0);
  road.material.color.set(0x9a9aa8); // tinta asfalto sobre a textura de pedra
  road.receiveShadow = true;
  scene.add(road);

  const addCollider = (x, z, hw, hd) => zone.colliders.push({ minX: x - hw, maxX: x + hw, minZ: z - hd, maxZ: z + hd });

  // ── a High Street de verdade (Welling, Kent) ────────────────────────────────
  // Ruas comerciais inglesas são TERRAÇOS contínuos de fachadas coladas — não
  // caixas soltas. Lugares reais da Bellegrove Rd/High St homenageados:
  // Post Office (nº 40), Costa Coffee (nº 124), a biblioteca cívica, o pub
  // Rose and Crown (na foto de 1906) e a estação de 1895.
  // side: +1 fachada olha para leste (lado leste da rua), −1 para o oeste.
  function shopFront({ x, z, w, h = 5.3, d = 2.8, body = 0xc9b18a, sign, signBg, signFg = '#fff6dd', side = 1, awning = null, doorZ = z }) {
    const cx = x + side * (d / 2);
    const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(d, h, w), mat(body));
    bodyMesh.position.set(cx, h / 2, z);
    bodyMesh.castShadow = true;
    scene.add(bodyMesh);
    addCollider(cx, z, d / 2, w / 2);
    // parapeito/cornija no topo
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(d + 0.12, 0.28, w + 0.12), mat(0xefe6d4));
    cornice.position.set(cx, h + 0.1, z);
    scene.add(cornice);
    // faixa da placa + vitrine + porta, todos na face da fachada.
    // face "para fora" (rumo à rua): subtrair side — somar enfiava a placa
    // 3 cm PARA DENTRO do prédio e ela ficava invisível atrás da parede
    const face = x - side * 0.04;
    const fascia = fasciaSign(sign, { w: Math.min(w * 0.92, 3.4), bg: signBg, fg: signFg });
    fascia.position.set(face, 3.32, z);
    // plane "olha" para +z: o lado leste (side 1) precisa da face para -x e
    // vice-versa — de outro modo a placa fica de frente para a própria parede
    fascia.rotation.y = side === 1 ? -Math.PI / 2 : Math.PI / 2;
    scene.add(fascia);
    const winW = Math.min(w * 0.62, 3.1);
    const window_ = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.5, winW), mat(0x27374e));
    window_.position.set(face, 1.85, z + (doorZ - z) * 0.5 + (side === 1 ? -0.4 : 0.4));
    scene.add(window_);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.95, 0.72), mat(0x3a2a20));
    door.position.set(face, 0.98, doorZ);
    scene.add(door);
    if (awning) {
      const aw = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, w * 0.66), mat(awning));
      aw.position.set(x + side * 0.5, 2.72, z);
      aw.rotation.z = -side * 0.17;
      aw.castShadow = true;
      scene.add(aw);
    }
    // janelas do andar de cima (vida na fachada sem custo: caixinhas escuras)
    const upWins = Math.max(1, Math.floor(w / 2.1));
    for (let i = 0; i < upWins; i += 1) {
      const uw = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.8, 0.62), mat(0x27374e));
      uw.position.set(face, h - 1.15, z - w / 2 + (i + 0.5) * (w / upWins));
      scene.add(uw);
    }
  }

  // ── lado oeste (indo para o Welling Corner) ──
  shopFront({ x: -4.0, z: -11.75, w: 4.5, h: 5.8, body: 0xc9b18a, sign: 'WELLING LIBRARY', signBg: '#1f4e79', side: -1 });
  shopFront({ x: -4.0, z: -6.75, w: 5.5, h: 5.0, body: 0xb56a4a, sign: "CRUMB'S BAKERY", signBg: '#7a3d1f', signFg: '#ffe2b0', side: -1, awning: 0xf2c14e, doorZ: -5.4 });
  shopFront({ x: -4.0, z: -1.25, w: 5.5, h: 5.4, body: 0x8a4a3a, sign: 'WELLING POST OFFICE', signBg: '#7a1f2b', side: -1, doorZ: -0.4 });
  shopFront({ x: -4.0, z: 4.25, w: 5.5, h: 6.2, body: 0xe8d9b0, sign: 'THE ROSE AND CROWN', signBg: '#1f5a33', signFg: '#f2c14e', side: -1, doorZ: 3.6 });

  // ── lado leste — com o BECO da academia (5.9, -3) entre os dois terraços ──
  shopFront({ x: 4.0, z: -8.8, w: 10.4, h: 5.4, body: 0x5a7a9e, sign: 'BOOKSHOP', signBg: '#2a4a6e', side: 1, doorZ: -5.6 });
  shopFront({ x: 4.0, z: -0.05, w: 4.9, h: 4.8, body: 0x9e5a7a, sign: 'TEA ROOM', signBg: '#5a2a44', side: 1, awning: 0xc9d8e8, doorZ: -0.4 });
  shopFront({ x: 4.0, z: 5.25, w: 5.5, h: 5.0, body: 0x7a2a30, sign: 'COSTA COFFEE', signBg: '#3a0d12', side: 1, awning: 0x8a2a30, doorZ: 5.2 });
  // estação de 1895 (Bexleyheath line): corpo mais alto, copa e relógio
  shopFront({ x: 4.0, z: 11, w: 6, h: 6.4, body: 0x2a4a70, sign: 'WELLING STATION', signBg: '#12325a', side: 1, doorZ: 11 });
  {
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 4.6), mat(0x1c2a52));
    canopy.position.set(3.6, 3.1, 11);
    canopy.rotation.z = 0.1;
    canopy.castShadow = true;
    scene.add(canopy);
    for (const [px, pz] of [[3.2, 9.2], [3.2, 12.8]]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.1, 6), mat(0x1c2a52));
      pole.position.set(px, 1.55, pz);
      scene.add(pole);
    }
    const clock = new THREE.Mesh(new THREE.CircleGeometry(0.34, 20), mat(0xfff2d9));
    clock.position.set(3.97, 4.6, 11);
    clock.rotation.y = -Math.PI / 2;
    scene.add(clock);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.05, 8, 20), mat(0x1c2a52));
    rim.position.copy(clock.position);
    rim.rotation.y = Math.PI / 2;
    scene.add(rim);
  }

  // pub com placa pendurada (o Rose and Crown da foto de 1906)
  {
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.06, 0.06), mat(0x3a2a20));
    bracket.position.set(-3.6, 3.0, 4.25);
    scene.add(bracket);
    const board = fasciaSign('ROSE & CROWN', { w: 1.15, h: 0.55, bg: '#1f5a33', fg: '#f2c14e' });
    board.material.side = THREE.DoubleSide;
    board.position.set(-3.25, 2.55, 4.25);
    board.rotation.y = Math.PI / 2;
    scene.add(board);
    for (const bz of [3.6, 4.9]) {
      const basket = new THREE.Mesh(new THREE.SphereGeometry(0.17, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(0x4a3626));
      basket.rotation.x = Math.PI;
      basket.position.set(-3.85, 2.62, bz);
      scene.add(basket);
      for (let f = 0; f < 3; f += 1) {
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), mat([0xc0392b, 0xf2c14e, 0xe86a9a][f]));
        fl.position.set(-3.85 + (f - 1) * 0.12, 2.56, bz + (f - 1) * 0.1);
        scene.add(fl);
      }
    }
  }

  // ── mobiliário de rua real ──
  // caixa de correio real (Royal Mail) em frente ao Post Office
  {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 1.15, 12), mat(0xb3202a));
    pillar.position.set(-3.3, 0.57, 1.3);
    pillar.castShadow = true;
    scene.add(pillar);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xb3202a));
    cap.position.set(-3.3, 1.14, 1.3);
    scene.add(cap);
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.05, 0.05), mat(0x1a1a22));
    slot.position.set(-3.04, 0.92, 1.3);
    scene.add(slot);
    addCollider(-3.3, 1.3, 0.32, 0.32);
  }
  // cabine telefônica vermelha (K6) em frente ao Costa
  {
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.55, 0.8), mat(0xb3202a));
    base.position.set(3.4, 0.28, 7.1);
    base.castShadow = true;
    scene.add(base);
    // faixa de vidro SOBRESSALENTE da caixa vermelha (a K6 é uma lanterna)
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.35, 0.86), mat(0x9fc5e8));
    glass.position.set(3.4, 1.22, 7.1);
    scene.add(glass);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.14, 0.88), mat(0xf2ede0));
    band.position.set(3.4, 1.98, 7.1);
    scene.add(band);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.4, 0.86), mat(0xb3202a));
    top.position.set(3.4, 2.25, 7.1);
    scene.add(top);
    addCollider(3.4, 7.1, 0.48, 0.48);
  }
  // postes de mão do Welling Corner (HIGH ST / BELLEGROVE RD / STATION RD)
  {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 2.5, 8), mat(0xf2ede0));
    post.position.set(-2.6, 1.25, 9.8);
    post.castShadow = true;
    scene.add(post);
    const arms = [['HIGH ST', 0.5, 2.25], ['BELLEGROVE RD', -1.1, 2.0], ['STATION RD', 2.3, 1.75]];
    for (const [label, ry, ay] of arms) {
      const arm = fasciaSign(label, { w: 0.95, h: 0.2, bg: '#1f4e79', fg: '#fff6dd' });
      arm.material.side = THREE.DoubleSide;
      arm.position.set(-2.6 + Math.sin(ry) * 0.48, ay, 9.8 + Math.cos(ry) * 0.48);
      arm.rotation.y = ry + Math.PI / 2;
      scene.add(arm);
    }
    addCollider(-2.6, 9.8, 0.14, 0.14);
  }
  // placa de chegada quem vem da escola (saída sul)
  {
    const board = fasciaSign('WELCOME TO WELLING', { w: 2.4, h: 0.5, bg: '#1f5a33', fg: '#fff6dd' });
    board.material.side = THREE.DoubleSide; // quem chega pelo norte lê o verso (placa de rua real)
    board.position.set(2.7, 1.55, -15.0);
    board.rotation.y = Math.PI;
    scene.add(board);
    for (const px of [1.75, 3.65]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 6), mat(0x8a8a92));
      post.position.set(px, 0.55, -15.0);
      scene.add(post);
    }
    addCollider(2.7, -15.0, 0.2, 0.15);
  }
  // faixa de pedestres (zebra) + Belisha beacons no sul da rua
  {
    const stripeMat = mat(0xf2ede0);
    for (let i = 0; i < 5; i += 1) {
      const stripe = new THREE.Mesh(new THREE.PlaneGeometry(8.4, 0.55), stripeMat);
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.006, -13.1 + i * 0.95);
      stripe.receiveShadow = true;
      scene.add(stripe);
    }
    for (const [bx, bz] of [[3.8, -13.4], [-3.8, -10.6]]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.5, 8), mat(0xf2ede0));
      pole.position.set(bx, 1.25, bz);
      scene.add(pole);
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.5, 8), mat(0x1a1a22));
      band.position.set(bx, 1.55, bz);
      scene.add(band);
      // laranja SÓLIDO: o material de brilho ficava creme e não lia como Belisha
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat(0xff8c1a));
      globe.position.set(bx, 2.62, bz);
      scene.add(globe);
      addCollider(bx, bz, 0.1, 0.1);
    }
  }
  // faixa central tracejada
  for (let z = -12; z <= 13.5; z += 3.2) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 1.3), mat(0xd9d4c8));
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(0, 0.005, z);
    scene.add(dash);
  }
  // postes de luz quentes (padrão de rua conservada)
  for (const [lx, lz] of [[-3.4, 8], [3.4, 8], [-3.4, -2], [3.4, -2], [-3.4, -12], [3.4, -12]]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 3.4, 8), mat(0x2a2a34));
    pole.position.set(lx, 1.7, lz);
    pole.castShadow = true;
    scene.add(pole);
    const lampHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), glowMat(0xffd88a));
    lampHead.position.set(lx, 3.5, lz);
    scene.add(lampHead);
    const lampLight = new THREE.PointLight(0xffc36a, 4, 6);
    lampLight.position.set(lx, 3.4, lz);
    scene.add(lampLight);
    addCollider(lx, lz, 0.15, 0.15);
  }
  // cestos de flores nos postes (padrão de rua inglesa)
  for (const [bx, bz] of [[-3.4, -2], [3.4, -2], [-3.4, 8]]) {
    const basket = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(0x4a3626));
    basket.rotation.x = Math.PI;
    basket.position.set(bx, 3.0, bz);
    scene.add(basket);
    for (let f = 0; f < 3; f += 1) {
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), mat([0xc0392b, 0xf2c14e, 0xe86a9a][f]));
      fl.position.set(bx + (f - 1) * 0.1, 2.94, bz + (f - 1) * 0.08);
      scene.add(fl);
    }
  }
  // latinha de lixo perto dos bancos (par de sempre)
  for (const [bx, bz] of [[3.4, 6.6], [-3.4, -8.6]]) {
    const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.17, 0.72, 10), mat(0x2e4a34));
    bin.position.set(bx, 0.36, bz);
    bin.castShadow = true;
    scene.add(bin);
    addCollider(bx, bz, 0.22, 0.22);
  }

  // bancos
  for (const [bx, bz, ry] of [[-2.9, 5, Math.PI / 2], [2.9, -4, -Math.PI / 2]]) {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 1.6), mat(0x6b4a2a));
    bench.position.set(bx, 0.21, bz);
    bench.rotation.y = ry;
    bench.castShadow = true;
    scene.add(bench);
    addCollider(bx, bz, 0.3, 0.85);
  }

  // padaria: balcão da padeira + cheirinho de canela (quest)
  const bakeryCounter = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 0.7), mat(0x8a5a34));
  bakeryCounter.position.set(-2.2, 0.45, -5.9);
  scene.add(bakeryCounter);
  addInteract('orderBun', -2.2, -5.2, 1.6);
  addInteract('wordsHighStreet', 1.8, -4.0, 1.4);

  // ponto de conversa do padeiro
  addInteract('baker', 2.2, -6, 1.7);

  // lojas da rua viram ponto de vocabulário (story / letter / tea)
  addInteract('bookshop', 4.3, -5.6, 1.4);
  addInteract('postOffice', -4.1, -0.4, 1.4);
  addInteract('teaRoom', 4.1, -0.4, 1.4);
  // página escondida no banco da esquerda
  addInteract('clueBench', -2.9, 4.3, 1.2);
  glowSprite(scene, zone, 0xfff3b0, 0.8, -2.9, 1.0, 5, { opacity: 0.4, amp: 0.2, speed: 2.4 });

  zone.update = (dt, t) => {
    updatePulses(zone, t);
    for (const cloud of zone.clouds) cloud.position.x += dt * 0.35;
  };
  stashZoneResources(scene); // roadmap 3.3: lembra os recursos p/ liberar na próxima troca
  return zone;
}

export function buildAcademy(scene) {
  const zone = {
    name: 'academy',
    spawn: [0, 9.5],
    bounds: { minX: -6, maxX: 6, minZ: -14, maxZ: 12 },
    colliders: [],
    interactables: [],
    hemi: [0xd9e8ff, 0x2a2a50, 1.1],
    sun: { color: 0xc9d8ff, intensity: 1.5, pos: [-6, 14, 6] },
    background: 0x10132e,
    fog: [0x10132e, 30, 110],
    npcSpots: { raven: [0, -8] },
    exits: [
      { x: 0, z: 11.4, radius: 1.6, target: 'highstreet', spawn: [5.9, -3.0] },
    ],
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });
  skyDome(scene, zone, { top: '#0b0e26', horizon: '#3a3a6e', glow: '#8a7ab8', stars: true, hills: 'city' });
  skyGlow(scene, zone, 0xf2f0ff, -45, 40, 55, 13); // lua
  hedgeRow(scene, -5.9, 11.8, 5.9, 11.8, { height: 0.8, color: 0x274a2e, spacing: 1.4 });
  hedgeRow(scene, -5.9, -13.8, -5.9, 11.8, { height: 0.8, color: 0x274a2e, spacing: 1.4 });
  hedgeRow(scene, 5.9, -13.8, 5.9, 11.8, { height: 0.8, color: 0x274a2e, spacing: 1.4 });
  const addCollider = (x, z, hw, hd) => zone.colliders.push({ minX: x - hw, maxX: x + hw, minZ: z - hd, maxZ: z + hd });

  // pátio de pedra azulada
  const floorTexRaw = stoneTexture();
  floorTexRaw.texture.wrapS = floorTexRaw.texture.wrapT = THREE.RepeatWrapping;
  floorTexRaw.texture.repeat.set(4, 6);
  const courtyard = new THREE.Mesh(new THREE.PlaneGeometry(13, 28), pbrFrom(floorTexRaw, [4, 6], 1.5, [0.7, 1.0]));
  courtyard.rotation.x = -Math.PI / 2;
  courtyard.receiveShadow = true;
  scene.add(courtyard);

  // prédio da academia rivall (tons azul-aço com detalhes dourados)
  const building = new THREE.Mesh(new THREE.BoxGeometry(10, 7, 4), mat(0x3d5a80));
  building.position.set(0, 3.5, -12);
  building.castShadow = true;
  scene.add(building);
  addCollider(0, -12, 5, 2);
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 9, 10), mat(0x2f4468));
  tower.position.set(4, 4.5, -10);
  tower.castShadow = true;
  scene.add(tower);
  addCollider(4, -10, 1.4, 1.4);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2, 10), mat(0x8a2f2f));
  roof.position.set(4, 10, -10);
  scene.add(roof);
  const emblem = makeTreeEmblem(0.9);
  emblem.position.set(0, 4.6, -9.95);
  scene.add(emblem);

  // colunas do pátio
  for (const [px, pz] of [[-4.5, -4], [4.5, -4], [-4.5, 1], [4.5, 1]]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 3.6, 10), mat(0x8fa3c0));
    col.position.set(px, 1.8, pz);
    col.castShadow = true;
    scene.add(col);
    addCollider(px, pz, 0.45, 0.45);
  }

  // círculo de duelo no centro (onde o feitiço acontece)
  const duelRing = new THREE.Mesh(new THREE.RingGeometry(1.6, 1.9, 40), glowMat(0x9ecbff, 0.7));
  duelRing.rotation.x = -Math.PI / 2;
  duelRing.position.set(0, 0.04, -8);
  scene.add(duelRing);
  zone.duelRing = duelRing;
  addInteract('duel', 0, -8, 2.2);
  glowSprite(scene, zone, 0x9ecbff, 0.9, 0, 0.4, -8, { opacity: 0.25, amp: 0.12, speed: 1.6 });

  // ponto de conversa da rival Miss Raven
  addInteract('raven', 0, -7, 1.7);

  // página escondida junto à torre
  addInteract('clueScroll', 4.2, -8.6, 1.3);
  addInteract('wordsAcademy', -4.0, -9.4, 1.4);
  glowSprite(scene, zone, 0xfff3b0, 0.8, 4.2, 1.0, -8.6, { opacity: 0.4, amp: 0.2, speed: 2.4 });

  zone.update = (dt, t) => {
    updatePulses(zone, t);
    for (const cloud of zone.clouds) cloud.position.x += dt * 0.2;
    if (zone.duelRing) zone.duelRing.material.opacity = 0.55 + 0.3 * Math.sin(t * 2.4);
  };
  stashZoneResources(scene); // roadmap 3.3: lembra os recursos p/ liberar na próxima troca
  return zone;
}

export function buildClassroom(scene) {
  const zone = {
    name: 'classroom',
    spawn: [0, 6],
    bounds: { minX: -5.5, maxX: 5.5, minZ: -8.5, maxZ: 8.5 },
    colliders: [],
    interactables: [],
    hemi: [0xfff6e0, 0x4a3a2a, 1.2],
    sun: { color: 0xffe8c0, intensity: 1.4, pos: [4, 10, 6] },
    background: 0x2a2430,
    fog: [0x2a2430, 14, 40],
    npcSpots: { willow: [-2.2, -6.6] },
    exits: [
      { x: 0, z: 7.9, radius: 1.5, target: 'school', spawn: [0, -24.5] },
    ],
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });
  const addCollider = (x, z, hw, hd) => zone.colliders.push({ minX: x - hw, maxX: x + hw, minZ: z - hd, maxZ: z + hd });

  // piso de madeira + tapete
  const floorTexRaw = planksTexture();
  floorTexRaw.texture.wrapS = floorTexRaw.texture.wrapT = THREE.RepeatWrapping;
  floorTexRaw.texture.repeat.set(4, 4);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 18), pbrFrom(floorTexRaw, [4, 4], 1.2, [0.75, 1.0]));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // paredes do cômodo
  const wallMat = mat(0xc9b896);
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(12, 5, 0.4), wallMat);
  backWall.position.set(0, 2.5, -8.8);
  scene.add(backWall);
  addCollider(0, -8.8, 6, 0.3);
  for (const side of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5, 18), wallMat);
    wall.position.set(side * 5.8, 2.5, 0);
    scene.add(wall);
    addCollider(side * 5.8, 0, 0.3, 9);
  }

  // janela alta com luz dourada
  for (const wx of [-3, 3]) {
    const window = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.2), glowMat(0xfff0c0));
    window.position.set(wx, 2.9, -8.58);
    scene.add(window);
    const shaft = new THREE.Mesh(
      new THREE.ConeGeometry(1.4, 5.5, 4, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.08, depthWrite: false })
    );
    shaft.position.set(wx, 1.2, -6);
    shaft.rotation.z = Math.PI;
    scene.add(shaft);
  }

  // lousa verde com moldura de madeira + giz
  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(5, 2.2, 0.12), mat(0x6b4a2a));
  boardFrame.position.set(0, 2.3, -8.55);
  scene.add(boardFrame);
  const blackboard = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 1.8), mat(0x2e4a3a));
  blackboard.position.set(0, 2.3, -8.47);
  scene.add(blackboard);
  const chalk = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.08), glowMat(0xf2ede0));
  chalk.position.set(-0.3, 2.6, -8.45);
  scene.add(chalk);
  addInteract('blackboard', 0, -7.2, 2.0);
  addInteract('wordsClassroom', -3.4, -5.0, 1.4);

  // mesa da professora + giz
  const teacherDesk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.85, 0.9), mat(0x6b4a2a));
  teacherDesk.position.set(-3.4, 0.425, -6.8);
  teacherDesk.castShadow = true;
  scene.add(teacherDesk);
  addCollider(-3.4, -6.8, 1.1, 0.5);

  // mesas dos alunos (2 colunas × 3 fileiras)
  for (const row of [2, 0, -2]) {
    for (const col of [-1.7, 1.7]) {
      const desk = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.72, 0.75), mat(0x8a5a34));
      desk.position.set(col, 0.36, row);
      desk.castShadow = true;
      scene.add(desk);
      addCollider(col, row, 0.6, 0.42);
    }
  }

  // ponto de conversa da professora Willow
  addInteract('willow', -2.2, -5.6, 1.7);

  // página escondida na verga da janela direita
  addInteract('clueChalk', 3, -7.5, 1.2);
  glowSprite(scene, zone, 0xfff3b0, 0.8, 3, 2.2, -8.4, { opacity: 0.4, amp: 0.2, speed: 2.4 });

  zone.update = () => {};
  stashZoneResources(scene); // roadmap 3.3: lembra os recursos p/ liberar na próxima troca
  return zone;
}

export function buildWoods(scene) {
  const zone = {
    name: 'woods',
    spawn: [0, 32],
    // Oxleas 3,6x maior em área: prado do café, Castle Wood (Severndroog),
    // lago do lado sul, academia ao ar livre e a trilha do Green Chain.
    bounds: { minX: -15, maxX: 15, minZ: -21, maxZ: 34 },
    colliders: [],
    interactables: [],
    // norte da mata desemboca na High Street
    exits: [
      // r pequeno e atrás do gatilho do final (z=-19): atravessar o portão
      // primeiro mostra o fim do capítulo; só depois a saída vira High Street
      { x: 0, z: -20.4, radius: 1.0, target: 'highstreet', spawn: [0, 14.6] },
    ],
    hemi: [0xcfe8c8, 0x24401f, 1.0],
    sun: { color: 0xffd98a, intensity: 1.75, pos: [-7, 16, -4] },
    background: 0x87b7a0,
    fog: [0x87b7a0, 34, 130],
    npcSpots: {},
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });
  skyDome(scene, zone, { top: '#5b9fd0', horizon: '#cfe6d8', glow: '#ffe9c0', hills: 'none' });
  photoBand(scene, zone, { url: 'assets/oxleas-backdrop.jpg' }); // mata real no horizonte

  const grassTexRaw = grassTexture();
  grassTexRaw.texture.wrapS = grassTexRaw.texture.wrapT = THREE.RepeatWrapping;
  grassTexRaw.texture.repeat.set(14, 16);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 100), pbrFrom(grassTexRaw, [14, 16], 1.4, [0.75, 1.0]));
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, 6);
  ground.receiveShadow = true;
  scene.add(ground);
  const dirtTexRaw = dirtTexture();
  dirtTexRaw.texture.wrapS = dirtTexRaw.texture.wrapT = THREE.RepeatWrapping;
  dirtTexRaw.texture.repeat.set(1, 9);
  const dirtMaterial = pbrFrom(dirtTexRaw, [1, 9], 1.0, [0.75, 1.0]);
  dirtMaterial.transparent = true;
  const path = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 56), dirtMaterial);
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, 0.005, 6);
  path.receiveShadow = true;
  scene.add(path);

  const tuftTex = tuftTexture();
  const ivyTex = ivyTexture();
  for (let i = 0; i < 90; i += 1) {
    const side = Math.random() > 0.5 ? 1 : -1;
    const x = side * (2.6 + Math.random() * 5.5);
    const z = 34 - Math.random() * 54;
    const tuft = spritePlane(tuftTex, 0.42 + Math.random() * 0.3);
    tuft.position.set(x, 0.18, z);
    tuft.rotation.y = Math.random() * Math.PI;
    scene.add(tuft);
  }
  // cogumelos perto do marco
  for (const [mx, mz] of [[2.0, -7.4], [2.6, -7.0], [1.7, -6.8]]) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.14, 8), mat(0xf2ede0));
    stem.position.set(mx, 0.07, mz);
    scene.add(stem);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xc0392b));
    cap.position.set(mx, 0.13, mz);
    scene.add(cap);
  }
  // quest da encomenda: menta fresca junto aos cogumelos
  addInteract('orderMint', 2.1, -6.4, 1.5);

  // árvores (corredor livre |x| < 4.5; fundo maior longe)
  // tenta GLB pack; se preloadModels não rodou, fallback procedural.
  // Com pack, as 28 cópias viram instâncias (cada clone eram 6 draw calls);
  // rotação/escala/colisores idênticos ao caminho de clone.
  const treeSrc = glbSource(MODEL_FILES.props.trees);
  const treeInstances = [];
  const tree = (x, z, scale = 1, collider = true) => {
    if (treeSrc) {
      treeInstances.push({ x, y: 0, z, rotY: Math.random() * Math.PI * 2, scale: scale * 1.5 });
      if (collider) addCollider(scene, x, z, 0.8 * scale, 0.8 * scale);
      return;
    }
    const group = new THREE.Group();
    {
      // ── fallback procedural ─────────────────────────────────────────────────
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * scale, 0.36 * scale, 2.4 * scale, 8), mat(0x5d4326));
      trunk.position.y = 1.2 * scale;
      trunk.castShadow = true;
      group.add(trunk);
      const greens = [0x2e6b34, 0x3a7d3e, 0x4a9148];
      for (const [oy, r, c] of [[2.5, 1.2, greens[0]], [3.3, 0.95, greens[1]], [3.95, 0.62, greens[2]]]) {
        const crown = new THREE.Mesh(new THREE.SphereGeometry(r * scale, 10, 9), mat(c));
        crown.position.set((Math.random() - 0.5) * 0.5 * scale, oy * scale, (Math.random() - 0.5) * 0.5 * scale);
        crown.castShadow = true;
        group.add(crown);
      }
    }
    group.position.set(x, 0, z);
    scene.add(group);
    if (collider) addCollider(scene, x, z, 0.8 * scale, 0.8 * scale);
    return group;
  };
  for (const [x, z, s] of [
    [-4.4, 30, 1.2], [4.6, 27, 1.1], [-4.7, 22, 1.3], [4.5, 17, 1.2], [-4.3, 12, 1.1],
    [4.8, 8, 1.25], [-4.6, 2, 1.2], [5.0, -3.5, 1.1], [-4.5, -9, 1.2], [4.5, -14.5, 1.15],
    [-4.4, -18, 1.1], [4.7, -18.5, 1.15],
    [-10, 30, 1.8], [9.5, 26, 2.0], [-9.5, 18, 1.9], [10, 8, 2.2], [-10.5, 4, 2.0], [8.5, -9, 1.8],
    [-12.5, 30, 2.1], [12.5, 24, 2.0], [-13, 14, 2.2], [13, 6, 2.0], [-13, -2, 2.1], [12.5, -10, 2.2],
    [-8, 24, 1.6], [7.5, 20, 1.5], [-6, -13, 1.5], [6.5, -17, 1.5],
  ]) tree(x, z, s, Math.abs(x) < 6);
  addGlbCopies(scene, treeSrc, treeInstances);

  // riacho + pedras numeradas (padrão 2, 4, 6, ? — embaralhado)
  const stream = new THREE.Mesh(new THREE.PlaneGeometry(44, 2.6), glowMat(0x4f8fc8, 0.9));
  stream.rotation.x = -Math.PI / 2;
  stream.position.set(0, 0.03, 0);
  scene.add(stream);
  for (const [fx, fz] of [[0, 1.28], [0, -1.28]]) {
    const foam = new THREE.Mesh(new THREE.PlaneGeometry(44, 0.1), glowMat(0xdff0ff, 0.5));
    foam.rotation.x = -Math.PI / 2;
    foam.position.set(fx, 0.045, fz);
    scene.add(foam);
  }
  const sparkles = [];
  for (let i = 0; i < 10; i += 1) {
    const spark = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.05), glowMat(0xbfe3ff, 0.85));
    spark.rotation.x = -Math.PI / 2;
    spark.position.set(-7 + i * 1.5, 0.06, (i % 3 - 1) * 0.6);
    scene.add(spark);
    sparkles.push(spark);
  }
  const streamCollider = { minX: -5.4, maxX: 5.4, minZ: -1.3, maxZ: 1.3 };
  zone.colliders.push(streamCollider);
  zone.streamCollider = streamCollider;

  const stoneNumbers = [8, 2, 6, 4];
  zone.stones = [];
  stoneNumbers.forEach((number, i) => {
    const x = -2.4 + i * 1.6;
    const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.3, 10), mat(0x9a938a));
    stone.position.set(x, 0.15, 0);
    stone.castShadow = true;
    stone.receiveShadow = true;
    scene.add(stone);
    const moss = new THREE.Mesh(new THREE.CircleGeometry(0.5, 10), mat(0x4d8f45));
    moss.rotation.x = -Math.PI / 2;
    moss.position.set(x, 0.301, 0);
    scene.add(moss);
    const label = makeLabelSprite(String(number));
    label.position.set(x, 1.05, 0);
    scene.add(label);
    zone.stones.push({ number, x, mesh: stone, label });
    addInteract(`stone${number}`, x, 0, 1.9);
  });

  // marco de pedra com a árvore + heras
  // arbustos reais (Stylized Bush, CC-BY) ao longo do caminho da mata:
  // mesmas 15 cópias de sempre, agora 1 InstancedMesh por primitiva do GLB
  const bushSrc = glbSource(MODEL_FILES.props.bush);
  if (bushSrc) {
    const bushInstances = [];
    for (const [bx, bz, s] of [
      [2.6, 29.5, 1.0], [-2.7, 25.0, 0.8], [2.8, 20.5, 1.1], [-2.6, 16.0, 0.9],
      [2.7, 11.5, 1.0], [-2.8, 6.5, 0.8], [2.6, 0.5, 1.0], [-2.7, -4.0, 0.9],
      [2.5, -9.0, 1.1], [3.0, -13.5, 0.7], [-3.0, -16.0, 1.0], [-2.6, 22.5, 0.9],
      [2.7, 15.0, 0.8], [3.0, 32.0, 0.9], [-3.0, -18.5, 0.8],
    ]) {
      bushInstances.push({ x: bx, y: 0, z: bz, rotY: Math.random() * Math.PI * 2, scale: s * 0.9 });
    }
    addGlbCopies(scene, bushSrc, bushInstances);
  }

  // baú do tesouro escondido (Stylized Treasure Chest, CC-BY) atrás do marco
  const chestSrc = glbSource(MODEL_FILES.props.chest);
  if (chestSrc) {
    const chest = chestSrc.scene.clone(true);
    chest.traverse((c) => {
      if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; }
    });
    chest.position.set(4.1, 0, -9.4);
    chest.rotation.y = -0.9;
    chest.scale.setScalar(1.35);
    scene.add(chest);
    // brilho dourado sutil indicando que ali tem coisa
    glowSprite(scene, zone, 0xffd166, 0.7, 4.1, 0.45, -9.4, { opacity: 0.35, amp: 0.15, speed: 2 });
    addInteract('chest', 4.1, -9.4, 1.6);
  }

  const markerMaterial = pbrFrom(stoneTexture(), [1, 1], 1.6, [0.7, 1.0]);
  const marker = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.5, 0.4), markerMaterial);
  marker.position.set(3.1, 0.75, -8.2);
  marker.castShadow = true;
  scene.add(marker);
  addCollider(scene, 3.1, -8.2, 0.9, 0.4);
  const markerEmblem = makeTreeEmblem(0.34);
  markerEmblem.position.set(3.1, 1.0, -7.97);
  scene.add(markerEmblem);
  for (let i = 0; i < 7; i += 1) {
    const ivy = spritePlane(ivyTex, 0.3);
    ivy.position.set(3.1 + (Math.random() - 0.5) * 0.8, 0.35 + Math.random() * 1.1, -8.0 + (Math.random() - 0.5) * 0.15);
    scene.add(ivy);
  }
  glowSprite(scene, zone, 0xffd166, 0.9, 3.1, 1.0, -7.9, { opacity: 0.3, amp: 0.12 });
  addInteract('marker', 2.4, -8, 1.6);

  // carvalho velho com página presa
  tree(4.1, -5.4, 1.6, false);
  const page = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), glowMat(0xfff3b0));
  page.position.set(3.55, 1.4, -5.1);
  page.rotation.y = -0.5;
  scene.add(page);
  zone.glint = page;
  glowSprite(scene, zone, 0xfff3b0, 0.8, 3.55, 1.4, -5.0, { opacity: 0.45, amp: 0.22, speed: 3 });
  addInteract('clueOak', 3.3, -5.4, 1.5);

  // portão secreto: pilares de pedra, heras, árvore dourada brilhando
  const gateMaterial = pbrFrom(stoneTexture(), [1, 2], 1.6, [0.7, 1.0]);
  for (const px of [-1.7, 1.7]) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 3.2, 0.7), gateMaterial);
    pillar.position.set(px, 1.6, -19);
    pillar.castShadow = true;
    scene.add(pillar);
    addCollider(scene, px, -19, 0.7, 0.7);
    for (let i = 0; i < 5; i += 1) {
      const ivy = spritePlane(ivyTex, 0.38);
      ivy.position.set(px + (Math.random() - 0.5) * 0.55, 0.5 + Math.random() * 2.2, -18.62);
      scene.add(ivy);
    }
  }
  const arch = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.6, 0.8), gateMaterial);
  arch.position.set(0, 3.4, -19);
  arch.castShadow = true;
  scene.add(arch);
  const leftDoor = box(scene, 1.55, 2.3, 0.16, 0x4e3b1e, -0.79, 1.15, -19);
  const rightDoor = box(scene, 1.55, 2.3, 0.16, 0x4e3b1e, 0.79, 1.15, -19);
  for (const gx of [-0.55, 0.55]) {
    const emblem = makeTreeEmblem(0.3);
    emblem.position.set(gx, 1.5, -18.9);
    scene.add(emblem);
  }
  const gateGlow = new THREE.PointLight(0xf5c542, 7, 7);
  gateGlow.position.set(0, 1.8, -18);
  scene.add(gateGlow);
  glowSprite(scene, zone, 0xffd166, 3.2, 0, 1.7, -18.7, { opacity: 0.35, amp: 0.12 });
  zone.gateDoors = [leftDoor, rightDoor];
  const gateCollider = { minX: -1.7, maxX: 1.7, minZ: -19.5, maxZ: -18.5 };
  zone.colliders.push(gateCollider);
  zone.gateCollider = gateCollider;
  addInteract('gate', 0, -17.5, 1.8);

  // feixes de luz + poeira dourada + vaga-lumes
  for (const [x, z, tilt] of [[-2.5, 12, 0.22], [2.2, 5, -0.18], [-1.8, -6, 0.15]]) {
    lightShaft(scene, x, 4.6, z, { radius: 0.85, height: 9, tilt, opacity: 0.055 });
  }
  if (!glowSprite.texture) glowSprite(scene, zone, 0x000000, 0.01, 0, -50, 0, { opacity: 0 }); // garante textura de brilho
  const dustCount = 60;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i += 1) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 9;
    dustPositions[i * 3 + 1] = 0.4 + Math.random() * 4.5;
    dustPositions[i * 3 + 2] = 34 - Math.random() * 54;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMaterial = new THREE.PointsMaterial({
    color: 0xffe8b0, size: 0.09, transparent: true, opacity: 0.5,
    map: glowSprite.texture, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  scene.add(dust);

  const fireflyCount = 40;
  const positions = new Float32Array(fireflyCount * 3);
  for (let i = 0; i < fireflyCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = 0.6 + Math.random() * 2.6;
    positions[i * 3 + 2] = 34 - Math.random() * 54;
  }
  const fireflyGeometry = new THREE.BufferGeometry();
  fireflyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const fireflyMaterial = new THREE.PointsMaterial({
    color: 0xffe08a, size: 0.3, transparent: true, opacity: 0.9,
    map: glowSprite.texture, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const fireflies = new THREE.Points(fireflyGeometry, fireflyMaterial);
  scene.add(fireflies);

  // ── marcos reais de Oxleas ───────────────────────────────────────────────
  // (tudo que existe de verdade no Oxleas Wood e arredores: o café no prado
  //  no topo da colina, o castelo de Severndroog em Castle Wood, o lago do
  //  lado sul — NÃO há rio nenhum por aqui — e as trilhas do Green Chain)

  // trilha de terra extra: prado do café (leste) e lago (oeste)
  const spur = (x, z, w, d, ry = 0) => {
    const m = pbrFrom(dirtTexture(), [2, 2], 1.0, [0.75, 1.0]);
    m.transparent = true;
    const spurPath = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m);
    spurPath.rotation.x = -Math.PI / 2;
    spurPath.rotation.z = ry;
    spurPath.position.set(x, 0.004, z);
    spurPath.receiveShadow = true;
    scene.add(spurPath);
  };
  spur(4.5, 15, 3, 12, 0.35);
  spur(-4.5, 27, 3, 8, -0.3);
  spur(-5.5, 3, 3, 10, -0.5);

  // ── Oxleas Wood Café (real: fica no Oxleas Meadows, no topo da colina) ───
  const cafeHut = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 3.2), mat(0x8a5a34));
  cafeHut.position.set(10.5, 1.3, 18.5);
  cafeHut.castShadow = true;
  scene.add(cafeHut);
  addCollider(scene, 10.5, 18.5, 2.1, 1.6);
  const cafeRoof = new THREE.Mesh(new THREE.ConeGeometry(3.4, 1.6, 4), mat(0x4a6a3a));
  cafeRoof.position.set(10.5, 3.4, 18.5);
  cafeRoof.rotation.y = Math.PI / 4;
  cafeRoof.castShadow = true;
  scene.add(cafeRoof);
  const cafeAwning = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.1, 1.6), mat(0xc0392b));
  cafeAwning.position.set(10.5, 2.4, 16.4);
  cafeAwning.rotation.x = 0.2;
  scene.add(cafeAwning);
  const cafeSign = makeLabelSprite('OXLEAS WOOD CAFÉ');
  cafeSign.position.set(10.5, 2.9, 16.2);
  cafeSign.scale.set(2.6, 0.62, 1);
  scene.add(cafeSign);
  const cafeLamp = new THREE.PointLight(0xffc36a, 4.5, 7);
  cafeLamp.position.set(10.5, 2.2, 16.8);
  scene.add(cafeLamp);
  glowSprite(scene, zone, 0xffc36a, 2.2, 10.5, 2.2, 16.6, { opacity: 0.3, amp: 0.08, speed: 1.2 });
  // mesas de terraço com guarda-sóis (o café de verdade tem vários)
  for (const [tx, tz] of [[8.2, 15.4], [11.4, 14.6], [9.2, 13.2]]) {
    const table = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 12), mat(0xf2ede0));
    table.position.set(tx, 0.5, tz);
    table.castShadow = true;
    scene.add(table);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8), mat(0x6b4a2a));
    leg.position.set(tx, 0.25, tz);
    scene.add(leg);
    const parasol = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.4, 8), mat(0xf2c14e));
    parasol.position.set(tx, 1.5, tz);
    parasol.castShadow = true;
    scene.add(parasol);
    addCollider(scene, tx, tz, 0.5, 0.5);
  }
  addInteract('woodCafe', 8.6, 16.4, 2.2);

  // ── Severndroog Castle (real: folia do século XV em Castle Wood, com tearoom
  //    e plataforma de vista). Aqui: uma ruína de pedra com mirante. ───────
  const castle = new THREE.Group();
  const castleBase = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 4.2, 12), pbrFrom(stoneTexture(), [3, 2], 1.5, [0.7, 1.0]));
  castleBase.position.y = 2.1;
  castleBase.castShadow = true;
  castle.add(castleBase);
  const castleTop = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 1.4, 12), pbrFrom(stoneTexture(), [3, 1], 1.5, [0.7, 1.0]));
  castleTop.position.y = 4.9;
  castle.add(castleTop);
  // ameias
  for (let i = 0; i < 10; i += 1) {
    const a = (i / 10) * Math.PI * 2;
    const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.5), mat(0x9a938a));
    merlon.position.set(Math.cos(a) * 2.1, 5.9, Math.sin(a) * 2.1);
    merlon.castShadow = true;
    castle.add(merlon);
  }
  // vão do tearoom
  const tearoom = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.8, 0.3), mat(0x3a2f26));
  tearoom.position.set(0, 1.2, 2.35);
  castle.add(tearoom);
  // escadaria até o mirante
  for (let i = 0; i < 4; i += 1) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 0.5), mat(0x9a938a));
    step.position.set(0, 0.2 + i * 0.35, 3.4 - i * 0.5);
    castle.add(step);
  }
  castle.position.set(-10.5, 0, 2);
  scene.add(castle);
  addCollider(scene, -10.5, 2, 2.6, 2.6);
  const castleSign = makeLabelSprite('SEVERNDROOG CASTLE');
  castleSign.position.set(-10.5, 6.6, 2);
  castleSign.scale.set(2.8, 0.6, 1);
  scene.add(castleSign);
  glowSprite(scene, zone, 0xbfe3ff, 2.0, -10.5, 3.0, 2, { opacity: 0.18, amp: 0.06, speed: 1.0 });
  addInteract('severndroog', -10.2, 4.6, 2.4);

  // ── o lago (real: o Oxleas tem um pond no lado sul; NÃO tem rio) ─────────
  const pondWater = new THREE.Mesh(new THREE.CircleGeometry(3.4, 28), glowMat(0x4f8fc8, 0.85));
  pondWater.rotation.x = -Math.PI / 2;
  pondWater.scale.set(1.25, 1, 0.8);
  pondWater.position.set(-6.5, 0.03, 27.5);
  scene.add(pondWater);
  for (let i = 0; i < 18; i += 1) {
    const a = (i / 18) * Math.PI * 2;
    const reed = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.5 + Math.random() * 0.4, 6), mat(0x4a7a3a));
    reed.position.set(-6.5 + Math.cos(a) * 4.3, 0.3, 27.5 + Math.sin(a) * 2.8);
    scene.add(reed);
  }
  // patos no lago
  for (const [dx, dz] of [[-7.2, 27.0], [-5.9, 28.2]]) {
    const duck = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat(0xf2ede0));
    duck.scale.set(1.3, 0.8, 1);
    duck.position.set(dx, 0.1, dz);
    duck.castShadow = true;
    scene.add(duck);
    const duckHead = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 7), mat(0xf2ede0));
    duckHead.position.set(dx + 0.16, 0.2, dz);
    scene.add(duckHead);
    const duckBill = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 6), mat(0xf2a93b));
    duckBill.rotation.z = -Math.PI / 2;
    duckBill.position.set(dx + 0.26, 0.2, dz);
    scene.add(duckBill);
  }
  const pondBench = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 1.7), mat(0x6b4a2a));
  pondBench.position.set(-10.2, 0.21, 27.5);
  pondBench.castShadow = true;
  scene.add(pondBench);
  addCollider(scene, -10.2, 27.5, 0.3, 0.9);
  zone.pondCollider = { minX: -10.9, maxX: -2.1, minZ: 24.7, maxZ: 30.3 };
  zone.colliders.push(zone.pondCollider);
  addInteract('pond', -8.6, 26.2, 2.2);
  addInteract('wordsWoods', -1.4, 27.5, 1.4);

  // ── Green Chain Walk / Capital Ring: postes de trilha ao longo do caminho ─
  signpost(scene, 3.6, 12);
  const chainSign = makeLabelSprite('GREEN CHAIN WALK');
  chainSign.position.set(3.6, 1.85, 11.7);
  chainSign.scale.set(1.7, 0.4, 1);
  scene.add(chainSign);
  addInteract('greenChain', 3.2, 11, 2.0);
  for (const [sx, sz, ry] of [[-3.6, 20, 0.6], [3.6, -6, 2.4], [-3.6, -12, 0.2], [3.6, 28, 1.1]]) {
    signpost(scene, sx, sz, ry);
  }

  // ── academia ao ar livre (existe no Oxleas: barras, paralelas, wall bar) ──
  const gymFloor = new THREE.Mesh(new THREE.PlaneGeometry(6, 8), mat(0x8a5a34));
  gymFloor.rotation.x = -Math.PI / 2;
  gymFloor.position.set(10, 0.014, -3);
  gymFloor.receiveShadow = true;
  scene.add(gymFloor);
  for (let i = 0; i < 4; i += 1) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8), mat(0x2f3a44));
    bar.rotation.z = Math.PI / 2;
    bar.position.set(10, 0.6 + i * 0.35, -5.5);
    bar.castShadow = true;
    scene.add(bar);
    for (const side of [-0.55, 0.55]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6 + i * 0.35, 0.08), mat(0x2f3a44));
      leg.position.set(10 + side, (0.6 + i * 0.35) / 2, -5.5);
      scene.add(leg);
    }
  }
  for (const px of [8.6, 11.4]) {
    for (let i = 0; i < 3; i += 1) {
      const parallel = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.2), mat(0x2f3a44));
      parallel.position.set(px, 0.5 + i * 0.3, -1.5);
      parallel.castShadow = true;
      scene.add(parallel);
    }
  }
  addInteract('outdoorGym', 10, -3, 2.2);

  // treeline densa fechando o horizonte (modelos de árvore de verdade, sem
  // colisor: são cenário, o limite de jogo é zone.bounds)
  for (let i = 0; i < 12; i += 1) {
    tree(-14 + (i % 6) * 5.6, -20.5 - (i % 2) * 0.8, 1.6 + (i % 3) * 0.3, false);
  }
  for (let i = 0; i < 12; i += 1) {
    tree(-14 + (i % 6) * 5.6, 33.5 + (i % 2) * 0.8, 1.6 + (i % 3) * 0.3, false);
  }
  for (let i = 0; i < 8; i += 1) tree(-14.6, -18 + i * 6.5, 1.5 + (i % 3) * 0.3, false);
  for (let i = 0; i < 8; i += 1) tree(14.6, -18 + i * 6.5, 1.5 + (i % 2) * 0.3, false);
  hedgeRow(scene, -14.8, 33.8, 14.8, 33.8, { height: 1.2 });
  hedgeRow(scene, -14.8, -20.8, 14.8, -20.8, { height: 1.2 });
  hedgeRow(scene, -14.8, -20.5, -14.8, 33.5, { height: 1.2 });
  hedgeRow(scene, 14.8, -20.5, 14.8, 33.5, { height: 1.2 });

  zone.update = (dt, t) => {
    updatePulses(zone, t);
    if (zone.glint) zone.glint.material.opacity = 0.55 + 0.45 * Math.sin(t * 3);
    for (const cloud of zone.clouds) cloud.position.x += dt * 0.35;
    fireflies.rotation.y = t * 0.04;
    fireflyMaterial.opacity = 0.6 + 0.3 * Math.sin(t * 2.1);
    dust.rotation.y = -t * 0.015;
    for (let i = 0; i < sparkles.length; i += 1) {
      sparkles[i].position.y = 0.06 + 0.03 * Math.sin(t * 2 + i);
    }
  };
  stashZoneResources(scene); // roadmap 3.3: lembra os recursos p/ liberar na próxima troca
  return zone;
}
