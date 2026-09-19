// RPG Welling — cenas 3D (three.js), estilizadas com clima das artes de
// conceito: luz dourada, sombras, texturas pintadas (canvas) e brilhos
// aditivos. Low-poly intencional: leve para tablet (spec Partes E/F).

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ── cache de modelos GLB (carregados sob demanda) ─────────────────────────────
const gltfLoader = new GLTFLoader();
const glbPromises = new Map(); // filename → Promise<{scene, animations}>
const glbScenes = new Map(); // filename → {scene, animations} (preenchido por preloadModels)
const ASSETS = './assets/';

export function loadGlb(filename) {
  if (!glbPromises.has(filename)) {
    glbPromises.set(filename, new Promise((resolve, reject) => {
      gltfLoader.load(
        ASSETS + filename,
        (gltf) => resolve({ scene: gltf.scene, animations: gltf.animations || [] }),
        undefined,
        (err) => reject(err),
      );
    }));
  }
  return glbPromises.get(filename);
}

// pre-carrega todos os modelos externos. Após await, glbScenes está populado e makeKid/makeOwl/etc podem usar síncrono.
export async function preloadModels() {
  const files = ['kid-animated.glb', 'owl.glb', 'npc.glb', 'trees.glb', 'kid.glb', 'chest.glb', 'books.glb', 'bush.glb'];
  const results = await Promise.allSettled(files.map(loadGlb));
  files.forEach((f, i) => {
    const r = results[i];
    if (r.status === 'fulfilled') glbScenes.set(f, r.value);
    else console.warn(`preloadModels: falha ao carregar ${f}`, r.reason);
  });
}

// Helper: retorna o bundle {scene, animations} do GLB cacheado, ou null se preload falhou.
function glbSource(filename) {
  return glbScenes.get(filename) || null;
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
  // ── GLB rigged com 18 animações (Mini Chibi Kid, CC-BY) ────────────────────
  const src = glbSource('kid-animated.glb');
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

  // ── fallback procedural (se kid-animated.glb falhou) ───────────────────────
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
  const src = glbSource('owl.glb');
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
  // Preferir GLB. Fallback procedural se preload falhou.
  const src = glbSource('npc.glb');
  if (src) {
    const g = new THREE.Group();
    const npc = src.scene.clone(true);
    npc.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
    // GLB do Sketchfab exportado pelo Blender manteve Z-up; converter pra Y-up
    npc.rotation.x = -Math.PI / 2;
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

// ── Zona 1: escola ───────────────────────────────────────────────────────────
export function buildSchool(scene) {
  const zone = {
    name: 'school',
    spawn: [0, 0.6],
    bounds: { minX: -6.5, maxX: 6.5, minZ: -27.4, maxZ: 2.9 },
    colliders: [],
    interactables: [],
    hemi: [0xfff2d9, 0x6b5a44, 1.15],
    sun: { color: 0xffe0a8, intensity: 1.95, pos: [8, 14, 6] },
    background: 0x241f38,
    fog: [0x241f38, 34, 90],
    npcSpots: { finch: [-4.3, 0.8], page: [-4.8, -25.1] },
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });

  const plaster = pbrFrom(plasterTexture(), [3, 2]);
  const brick = pbrFrom(brickTexture(), [2, 0.7], 1.2);

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
  wall(scene, -7, 4, -1, 4, 2.2, brick); wall(scene, 1, 4, 7, 4, 2.2, brick);
  wall(scene, -7, -6, -7, 4, 2.2, plaster); wall(scene, 7, -6, 7, 4, 2.2, plaster);
  wall(scene, -7, -6, -1.8, -6, 2.2, plaster); wall(scene, 1.8, -6, 7, -6, 2.2, plaster);
  wall(scene, -1.8, -16, -1.8, -6, 2.2, plaster); wall(scene, 1.8, -16, 1.8, -6, 2.2, plaster);
  wall(scene, -8, -16, -1.8, -16, 2.2, plaster); wall(scene, 1.8, -16, 8, -16, 2.2, plaster);
  wall(scene, -8, -28, -8, -16, 2.2, plaster); wall(scene, 8, -28, 8, -16, 2.2, plaster);
  wall(scene, -8, -28, 8, -28, 2.2, plaster);

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

  // corredor: armários com respiros, placa da árvore, carrinho de livros
  for (const z of [-7.2, -9.2, -11.2, -13.2, -15]) {
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

  box(scene, 1.1, 0.7, 0.55, 0x7a4a2a, -0.9, 0.45, -12.5, { collider: true });
  box(scene, 1.0, 0.3, 0.45, 0xc0392b, -0.9, 0.95, -12.5);
  box(scene, 0.16, 0.24, 0.3, 0x3e6cb0, -1.1, 1.25, -12.5);
  addInteract('pieceTrolley', -0.6, -11.9, 1.5);

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

  // mesa da Sra. Page + globo
  box(scene, 1.9, 0.75, 0.9, 0x5d3f26, -5.5, 0.375, -26.4, { collider: true });
  const globe = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 12), mat(0x3e6cb0));
  globe.position.set(-6.0, 0.98, -26.3);
  globe.castShadow = true;
  scene.add(globe);
  const globeStand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.18, 8), mat(0x8a5a2a));
  globeStand.position.set(-6.0, 0.84, -26.3);
  scene.add(globeStand);

  addInteract('page', -4.8, -25.1, 1.9);
  addInteract('finch', -4.3, 0.8, 1.9);

  zone.update = (dt, t) => {
    updatePulses(zone, t);
    if (zone.glint) zone.glint.material.opacity = 0.55 + 0.45 * Math.sin(t * 3.2);
    ivyEmblem.scale.setScalar(1 + 0.04 * Math.sin(t * 2.4));
  };
  return zone;
}

// ── Zona 2: trilha na mata (Oxleas) ──────────────────────────────────────────
export function buildWoods(scene) {
  const zone = {
    name: 'woods',
    spawn: [0, 25],
    bounds: { minX: -5.2, maxX: 5.2, minZ: -17.4, maxZ: 26.4 },
    colliders: [],
    interactables: [],
    hemi: [0xcfe8c8, 0x24401f, 1.0],
    sun: { color: 0xffd98a, intensity: 1.75, pos: [-7, 16, -4] },
    background: 0x1c3524,
    fog: [0x1c3524, 22, 75],
    npcSpots: {},
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });

  const grassTexRaw = grassTexture();
  grassTexRaw.texture.wrapS = grassTexRaw.texture.wrapT = THREE.RepeatWrapping;
  grassTexRaw.texture.repeat.set(10, 13);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(44, 60), pbrFrom(grassTexRaw, [10, 13], 1.4, [0.75, 1.0]));
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, 4);
  ground.receiveShadow = true;
  scene.add(ground);
  const dirtTexRaw = dirtTexture();
  dirtTexRaw.texture.wrapS = dirtTexRaw.texture.wrapT = THREE.RepeatWrapping;
  dirtTexRaw.texture.repeat.set(1, 7);
  const dirtMaterial = pbrFrom(dirtTexRaw, [1, 7], 1.0, [0.75, 1.0]);
  dirtMaterial.transparent = true;
  const path = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 46), dirtMaterial);
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, 0.005, 4);
  path.receiveShadow = true;
  scene.add(path);

  const tuftTex = tuftTexture();
  const ivyTex = ivyTexture();
  for (let i = 0; i < 46; i += 1) {
    const side = Math.random() > 0.5 ? 1 : -1;
    const x = side * (2.6 + Math.random() * 2.4);
    const z = 26 - Math.random() * 43;
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

  // árvores (corredor livre |x| < 4.5; fundo maior longe)
  // tenta GLB pack; se preloadModels não rodou, fallback procedural
  const treeSrc = glbSource('trees.glb');
  const tree = (x, z, scale = 1, collider = true) => {
    const group = new THREE.Group();
    if (treeSrc) {
      // clone recursivo; pack inteiro vira UMA "super tree" (todas as variações juntas).
      // Pra ter variedade entre árvores, aplicamos random rotation/scale por instância.
      const t = treeSrc.scene.clone(true);
      t.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      // Pack tem ~1.7m de altura (várias árvores sobrepostas). Aplicar scale 1.5x pra
      // floresta ficar densa (scale 1.0–2.2 conforme o parâmetro da função).
      t.scale.setScalar(scale * 1.5);
      // pequena rotação aleatória pra variedade (pack contém várias árvores sobrepostas)
      t.rotation.y = Math.random() * Math.PI * 2;
      group.add(t);
    } else {
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
    [-4.4, 22, 1.2], [4.6, 18.5, 1.1], [-4.7, 14, 1.3], [4.5, 9.5, 1.2], [-4.3, 5.5, 1.1],
    [4.8, 3.2, 1.25], [-4.6, -2.5, 1.2], [5.0, -6.5, 1.1], [-4.5, -10.5, 1.2], [4.5, -13.5, 1.15],
    [-10, 20, 1.8], [9.5, 12, 2.0], [-9.5, 2, 1.9], [10, -4, 2.2], [-10.5, -12, 2.0], [8.5, -16, 1.8],
  ]) tree(x, z, s, Math.abs(x) < 6);

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
    pillar.position.set(px, 1.6, -16);
    pillar.castShadow = true;
    scene.add(pillar);
    addCollider(scene, px, -16, 0.7, 0.7);
    for (let i = 0; i < 5; i += 1) {
      const ivy = spritePlane(ivyTex, 0.38);
      ivy.position.set(px + (Math.random() - 0.5) * 0.55, 0.5 + Math.random() * 2.2, -15.62);
      scene.add(ivy);
    }
  }
  const arch = new THREE.Mesh(new THREE.BoxGeometry(4.1, 0.6, 0.8), gateMaterial);
  arch.position.set(0, 3.4, -16);
  arch.castShadow = true;
  scene.add(arch);
  const leftDoor = box(scene, 1.55, 2.3, 0.16, 0x4e3b1e, -0.79, 1.15, -16);
  const rightDoor = box(scene, 1.55, 2.3, 0.16, 0x4e3b1e, 0.79, 1.15, -16);
  for (const gx of [-0.55, 0.55]) {
    const emblem = makeTreeEmblem(0.3);
    emblem.position.set(gx, 1.5, -15.9);
    scene.add(emblem);
  }
  const gateGlow = new THREE.PointLight(0xf5c542, 7, 7);
  gateGlow.position.set(0, 1.8, -15);
  scene.add(gateGlow);
  glowSprite(scene, zone, 0xffd166, 3.2, 0, 1.7, -15.7, { opacity: 0.35, amp: 0.12 });
  zone.gateDoors = [leftDoor, rightDoor];
  const gateCollider = { minX: -1.7, maxX: 1.7, minZ: -16.5, maxZ: -15.5 };
  zone.colliders.push(gateCollider);
  zone.gateCollider = gateCollider;
  addInteract('gate', 0, -14.5, 1.8);

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
    dustPositions[i * 3 + 2] = 24 - Math.random() * 40;
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
    positions[i * 3 + 2] = 24 - Math.random() * 40;
  }
  const fireflyGeometry = new THREE.BufferGeometry();
  fireflyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const fireflyMaterial = new THREE.PointsMaterial({
    color: 0xffe08a, size: 0.3, transparent: true, opacity: 0.9,
    map: glowSprite.texture, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const fireflies = new THREE.Points(fireflyGeometry, fireflyMaterial);
  scene.add(fireflies);

  zone.update = (dt, t) => {
    updatePulses(zone, t);
    if (zone.glint) zone.glint.material.opacity = 0.55 + 0.45 * Math.sin(t * 3);
    fireflies.rotation.y = t * 0.04;
    fireflyMaterial.opacity = 0.6 + 0.3 * Math.sin(t * 2.1);
    dust.rotation.y = -t * 0.015;
    for (let i = 0; i < sparkles.length; i += 1) {
      sparkles[i].position.y = 0.06 + 0.03 * Math.sin(t * 2 + i);
    }
  };
  return zone;
}
