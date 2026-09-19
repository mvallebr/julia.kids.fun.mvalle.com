// RPG Welling — cenas 3D (three.js), low-poly procedural, sem downloads de
// modelos (spec Partes E/F: estilizado, leve, zona por vez).

import * as THREE from 'three';

// ── helpers ──────────────────────────────────────────────────────────────────
const matCache = new Map();
function mat(color) {
  if (!matCache.has(color)) matCache.set(color, new THREE.MeshLambertMaterial({ color }));
  return matCache.get(color);
}
function glowMat(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
}

function box(parent, w, h, d, color, x, y, z, { collider, rotY = 0 } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  parent.add(mesh);
  if (collider) addCollider(parent, x, z, w, d, rotY);
  return mesh;
}

function addCollider(parent, x, z, w, d, rotY = 0) {
  // AABB aproximada (paredes sempre alinhadas aos eixos neste jogo)
  const list = parent.userData.zone?.colliders;
  if (list) list.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
}

function wall(parent, x1, z1, x2, z2, height = 2.2, color = 0xe8dcc3) {
  const w = Math.abs(x2 - x1) || 0.3;
  const d = Math.abs(z2 - z1) || 0.3;
  const x = (x1 + x2) / 2;
  const z = (z1 + z2) / 2;
  box(parent, w, height, d, color, x, height / 2, z, { collider: true });
  // rodapé
  box(parent, w + 0.06, 0.35, d + 0.06, 0x8a6a48, x, 0.175, z);
}

function floor(parent, w, d, color, x, z) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat(color));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0, z);
  parent.add(mesh);
}

function plant(parent, x, z) {
  box(parent, 0.5, 0.45, 0.5, 0xa5502e, x, 0.225, z, { collider: true });
  const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), mat(0x3f7d3a));
  foliage.position.set(x, 0.85, z);
  foliage.scale.y = 1.15;
  parent.add(foliage);
}

// Árvore dourada (símbolo do jogo) — disco + tronco + copa, para paredes/pedras.
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

// Etiqueta numérica (pedras do riacho) — sprite de canvas.
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

// ── personagens (irmãos, NPCs, corujas) ──────────────────────────────────────
export function makeKid(characterId) {
  const g = new THREE.Group();
  const parts = {};
  const skin = mat(0xf2c9a0);
  const uniform = mat(0x2c3560);

  parts.body = new THREE.Group();
  g.add(parts.body);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.42, 4, 10), uniform);
  torso.position.y = 0.78;
  parts.body.add(torso);
  if (characterId === 'ivy') {
    const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.34, 12, 1, true), mat(0x232a52));
    skirt.position.y = 0.56;
    parts.body.add(skirt);
  }
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 12), skin);
  head.position.y = 1.28;
  parts.body.add(head);
  const hairColor = characterId === 'ivy' ? 0x6b4226 : 0x4e3018;
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 12), mat(hairColor));
  hair.position.set(0, 1.33, -0.03);
  hair.scale.set(1, 0.92, 1);
  parts.body.add(hair);
  if (characterId === 'ivy') {
    const ponytail = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), mat(hairColor));
    ponytail.position.set(0, 1.3, -0.26);
    ponytail.scale.set(0.8, 1.4, 0.8);
    parts.body.add(ponytail);
  }
  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.4, 0.18), mat(0x5b3d24));
  backpack.position.set(0, 0.86, -0.28);
  parts.body.add(backpack);
  const emblem = makeTreeEmblem(0.07);
  emblem.position.set(0, 0.92, -0.38);
  emblem.rotation.y = Math.PI;
  parts.body.add(emblem);

  parts.legs = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.3, 4, 8), mat(0x333a5e));
    leg.position.set(side * 0.13, 0.28, 0);
    g.add(leg);
    parts.legs.push(leg);
  }
  parts.arms = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.32, 4, 8), uniform);
    arm.position.set(side * 0.32, 0.85, 0);
    parts.body.add(arm);
    parts.arms.push(arm);
  }
  g.userData.animate = (t, speed) => {
    const swing = Math.sin(t * 9) * Math.min(1, speed) * 0.55;
    parts.legs[0].rotation.x = swing;
    parts.legs[1].rotation.x = -swing;
    parts.arms[0].rotation.x = -swing * 0.8;
    parts.arms[1].rotation.x = swing * 0.8;
    parts.body.position.y = Math.abs(Math.sin(t * 9)) * 0.045 * Math.min(1, speed);
    parts.body.rotation.z = Math.sin(t * 9) * 0.03 * Math.min(1, speed);
  };
  return g;
}

export function makeOwl(variant = 0) {
  const g = new THREE.Group();
  const bodyColor = variant === 0 ? 0xd9c9a8 : 0x8a7156;
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), mat(bodyColor));
  body.scale.set(1, 1.15, 0.92);
  g.add(body);
  const face = new THREE.Mesh(new THREE.CircleGeometry(0.11, 16), mat(0xf4ecd8));
  face.position.set(0, 0.05, 0.155);
  g.add(face);
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), mat(0x1c1420));
    eye.position.set(side * 0.05, 0.07, 0.17);
    g.add(eye);
  }
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 6), mat(0xe08a2d));
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.015, 0.19);
  g.add(beak);
  const wings = [];
  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), mat(bodyColor));
    wing.scale.set(0.28, 0.9, 1);
    wing.position.set(side * 0.16, 0, 0);
    g.add(wing);
    wings.push(wing);
  }
  g.userData.animate = (t, flying) => {
    const flap = Math.sin(t * (flying ? 14 : 2.2)) * (flying ? 0.9 : 0.12);
    wings[0].rotation.z = flap;
    wings[1].rotation.z = -flap;
    body.rotation.z = Math.sin(t * (flying ? 7 : 1.8)) * (flying ? 0.15 : 0.05);
  };
  return g;
}

export function makeAdult(dress) {
  const g = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.62, 4, 10), mat(dress));
  torso.position.y = 1.05;
  g.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 12), mat(0xf2c9a0));
  head.position.y = 1.66;
  g.add(head);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 12), mat(0xd8d3cc));
  hair.position.set(0, 1.73, -0.03);
  hair.scale.set(1, 0.9, 1);
  g.add(hair);
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.42, 4, 8), mat(0x3a3a42));
    leg.position.set(side * 0.15, 0.32, 0);
    g.add(leg);
  }
  return g;
}

// sombra falsa (blob) — barata ebonita, sem shadow maps
export function blobShadow(parent, radius = 0.42) {
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(radius, 20),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.24, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  parent.add(shadow);
  return shadow;
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
    sun: { color: 0xffe6b3, intensity: 1.95, pos: [8, 14, 6] },
    background: 0x241f38,
    fog: [0x241f38, 34, 90],
    npcSpots: { finch: [-4.3, 0.8], page: [-4.8, -25.1] },
  };
  scene.userData.zone = zone;
  const addInteract = (id, x, z, radius = 1.6) => zone.interactables.push({ id, x, z, radius });

  floor(scene, 14.4, 10.4, 0xb98d5f, 0, -1);        // salão
  floor(scene, 4.2, 10.4, 0xc9a06a, 0, -11);        // corredor
  floor(scene, 16.4, 12.4, 0x7a4a56, 0, -22);       // biblioteca (carpete)
  box(scene, 14.4, 0.06, 10.4, 0xa87c50, 0, 0.01, -1); // tapete do salão
  const rug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 28), mat(0x9e3f52));
  rug.rotation.x = -Math.PI / 2; rug.position.set(0.5, 0.02, -21.5);
  scene.add(rug);

  // paredes (com vãos de portas)
  wall(scene, -7, 4, -1, 4); wall(scene, 1, 4, 7, 4);            // fachada sul
  wall(scene, -7, -6, -7, 4); wall(scene, 7, -6, 7, 4);          // laterais do salão
  wall(scene, -7, -6, -1.8, -6); wall(scene, 1.8, -6, 7, -6);    // boca do corredor
  wall(scene, -1.8, -16, -1.8, -6); wall(scene, 1.8, -16, 1.8, -6); // corredor
  wall(scene, -8, -16, -1.8, -16); wall(scene, 1.8, -16, 8, -16);   // entrada da biblioteca
  wall(scene, -8, -28, -8, -16); wall(scene, 8, -28, 8, -16);
  wall(scene, -8, -28, 8, -28);

  // portas duplas de entrada (decoração no vão sul)
  box(scene, 1.9, 2.1, 0.14, 0x4e3520, 0, 1.05, 4.05);
  const doorEmblem = makeTreeEmblem(0.34);
  doorEmblem.position.set(0, 2.35, 4.16);
  scene.add(doorEmblem);

  // janelas brilhantes no salão (lado leste) e corredor
  for (const z of [-3.4, -0.6, 2.2]) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.4), glowMat(0xffe9b8, 0.9));
    pane.position.set(6.82, 1.7, z);
    pane.rotation.y = -Math.PI / 2;
    scene.add(pane);
  }
  for (const z of [-8.5, -11.5, -14.5]) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.2), glowMat(0xffe9b8, 0.85));
    pane.position.set(1.68, 1.7, z);
    pane.rotation.y = -Math.PI / 2;
    scene.add(pane);
  }

  // mural de avisos
  box(scene, 0.12, 1.5, 2.4, 0x6b4a2a, 6.85, 1.6, 0.2);
  box(scene, 0.05, 1.2, 2.1, 0xc9a86a, 6.76, 1.6, 0.2);
  addInteract('board', 5.9, 0.2, 1.7);

  // Sr. Finch: carrinho de limpeza + vassoura
  box(scene, 0.9, 0.65, 0.6, 0x5a6a72, -5.6, 0.42, -0.6, { collider: true });
  box(scene, 0.9, 0.08, 0.6, 0x3d4a50, -5.6, 0.8, -0.6);
  const broom = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 6), mat(0x8a5a2a));
  broom.position.set(-5.0, 0.75, -1.3);
  broom.rotation.z = 0.35;
  scene.add(broom);

  // porta de heras com árvore dourada (oeste do salão)
  box(scene, 0.18, 2.1, 1.7, 0x2f5d33, -6.9, 1.05, -2.2);
  const ivyEmblem = makeTreeEmblem(0.4);
  ivyEmblem.position.set(-6.78, 1.35, -2.2);
  ivyEmblem.rotation.y = Math.PI / 2;
  scene.add(ivyEmblem);
  const ivyGlow = new THREE.PointLight(0xf5c542, 6, 5);
  ivyGlow.position.set(-6.2, 1.6, -2.2);
  scene.add(ivyGlow);
  addInteract('ivyDoor', -5.9, -2.2, 1.7);

  plant(scene, -6.2, 3.1); plant(scene, 6.2, -5.2);
  box(scene, 1.6, 0.42, 0.55, 0x7a5a34, 4.6, 0.21, -3.2, { collider: true }); // banco

  // corredor: armários + placa de vidro com a árvore + carrinho de livros
  for (const z of [-7.2, -9.2, -11.2, -13.2, -15]) {
    box(scene, 0.45, 1.9, 1.7, 0x2c3560, -1.55, 0.95, z, { collider: true });
  }
  const signPane = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.5), glowMat(0x3d5a80, 0.55));
  signPane.position.set(1.7, 1.6, -8.5);
  signPane.rotation.y = -Math.PI / 2;
  scene.add(signPane);
  const signTree = makeTreeEmblem(0.34);
  signTree.position.set(1.62, 1.6, -8.5);
  signTree.rotation.y = -Math.PI / 2;
  scene.add(signTree);
  const signGlow = new THREE.PointLight(0xf5c542, 5, 4.5);
  signGlow.position.set(1.1, 1.6, -8.5);
  scene.add(signGlow);
  addInteract('signTree', 0.9, -8.5, 1.4);

  box(scene, 1.1, 0.7, 0.55, 0x7a4a2a, -0.9, 0.45, -12.5, { collider: true }); // carrinho
  box(scene, 1.0, 0.3, 0.45, 0xc0392b, -0.9, 0.95, -12.5);
  addInteract('pieceTrolley', -0.6, -11.9, 1.5);

  // biblioteca: estantes nas paredes + ilhas
  const shelfWall = (x, z, w, d) => {
    box(scene, w, 2.3, d, 0x5d3f26, x, 1.15, z, { collider: true });
    const levels = [0.55, 1.2, 1.85];
    const colors = [0xb0413e, 0x3e6cb0, 0x3e9a5f, 0xc98a2d, 0x7a4ecf];
    let seed = Math.abs(Math.round(x * 7 + z * 13));
    for (const level of levels) {
      const books = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.1, w - 0.3), 0.42, Math.max(0.1, d - 0.3)), mat(colors[seed % colors.length]));
      books.position.set(x, level, z);
      scene.add(books);
      seed += 1;
    }
  };
  shelfWall(-3.2, -27.55, 4.4, 0.7, 0); shelfWall(3.2, -27.55, 4.4, 0.7, 0); // norte
  shelfWall(-7.55, -21.5, 0.7, 7.4, 0); shelfWall(7.55, -21.5, 0.7, 7.4, 0); // laterais
  shelfWall(2.9, -19.6, 2.6, 0.8, 0); shelfWall(-3.4, -23.4, 2.6, 0.8, 0);   // ilhas

  // peça brilhando na estante leste (concealed!)
  const glint = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.38), glowMat(0xfff3b0));
  glint.position.set(7.12, 1.25, -22.5);
  glint.rotation.y = -Math.PI / 2;
  scene.add(glint);
  zone.glint = glint;
  addInteract('pieceShelf', 6.6, -22.5, 1.6);

  // mesa de leitura + pista embaixo
  box(scene, 3.2, 0.5, 1.5, 0x6b4a2a, 0.5, 0.5, -21.5, { collider: true });
  for (const [cx, cz] of [[-0.8, -20.4], [1.8, -20.4], [-0.8, -22.6], [1.8, -22.6]]) {
    box(scene, 0.4, 0.45, 0.4, 0x8a5a34, cx, 0.22, cz);
  }
  addInteract('clueTable', 0.5, -21.5, 2.1);

  // mesa da Sra. Page + globo
  box(scene, 1.9, 0.75, 0.9, 0x5d3f26, -5.5, 0.375, -26.4, { collider: true });
  const globe = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), mat(0x3e6cb0));
  globe.position.set(-6.0, 0.98, -26.3);
  scene.add(globe);
  const globeStand = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 0.18, 8), mat(0x8a5a2a));
  globeStand.position.set(-6.0, 0.84, -26.3);
  scene.add(globeStand);

  addInteract('page', -4.8, -25.1, 1.9);
  addInteract('finch', -4.3, 0.8, 1.9);

  zone.update = (dt, t) => {
    if (zone.glint) zone.glint.material.opacity = 0.55 + 0.45 * Math.sin(t * 3.2);
    if (ivyEmblem) ivyEmblem.scale.setScalar(1 + 0.04 * Math.sin(t * 2.4));
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

  floor(scene, 44, 60, 0x2f6a36, 0, 4);
  floor(scene, 4.4, 46, 0x8a6a42, 0, 4); // trilha de terra

  // árvores (corredor livre |x| < 4.5, fundo exagerado longe)
  const tree = (x, z, scale = 1, collider = true) => {
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * scale, 0.34 * scale, 2.4 * scale, 7), mat(0x5d4326));
    trunk.position.y = 1.2 * scale;
    g.add(trunk);
    for (const [oy, r, c] of [[2.6, 1.15, 0x2e6b34], [3.4, 0.9, 0x3a7d3e], [4.0, 0.62, 0x4a9148]]) {
      const crown = new THREE.Mesh(new THREE.SphereGeometry(r * scale, 9, 8), mat(c));
      crown.position.y = oy * scale;
      g.add(crown);
    }
    g.position.set(x, 0, z);
    scene.add(g);
    if (collider) addCollider(scene, x, z, 0.8 * scale, 0.8 * scale);
  };
  for (const [x, z, s] of [
    [-4.4, 22, 1.2], [4.6, 18.5, 1.1], [-4.7, 14, 1.3], [4.5, 9.5, 1.2], [-4.3, 5.5, 1.1],
    [4.8, 3.2, 1.25], [-4.6, -2.5, 1.2], [5.0, -6.5, 1.1], [-4.5, -10.5, 1.2], [4.5, -13.5, 1.15],
    [-10, 20, 1.8], [9.5, 12, 2.0], [-9.5, 2, 1.9], [10, -4, 2.2], [-10.5, -12, 2.0], [8.5, -16, 1.8],
  ]) tree(x, z, s, Math.abs(x) < 6);

  // riacho + pedras numeradas (padrão 2,4,6,? — ordem embaralhada na travessia)
  const stream = new THREE.Mesh(new THREE.PlaneGeometry(44, 2.6), glowMat(0x3f7fb8, 0.92));
  stream.rotation.x = -Math.PI / 2;
  stream.position.set(0, 0.03, 0);
  scene.add(stream);
  const sparkles = [];
  for (let i = 0; i < 8; i += 1) {
    const spark = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.05), glowMat(0xbfe3ff, 0.8));
    spark.rotation.x = -Math.PI / 2;
    spark.position.set(-6 + i * 1.7, 0.06, (i % 3 - 1) * 0.6);
    scene.add(spark);
    sparkles.push(spark);
  }
  const streamCollider = { minX: -5.4, maxX: 5.4, minZ: -1.3, maxZ: 1.3 };
  zone.colliders.push(streamCollider);
  zone.streamCollider = streamCollider;

  const stoneNumbers = [8, 2, 6, 4]; // embaralhadas: pensar, não seguir em linha
  zone.stones = [];
  stoneNumbers.forEach((number, i) => {
    const x = -2.4 + i * 1.6;
    const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.7, 0.3, 9), mat(0x9a938a));
    stone.position.set(x, 0.15, 0);
    scene.add(stone);
    const label = makeLabelSprite(String(number));
    label.position.set(x, 1.05, 0);
    scene.add(label);
    zone.stones.push({ number, x, mesh: stone, label });
    addInteract(`stone${number}`, x, 0, 1.9);
  });

  // marco de pedra com a árvore
  box(scene, 0.9, 1.5, 0.4, 0x8d8a80, 3.1, 0.75, -8.2, { collider: true });
  const markerEmblem = makeTreeEmblem(0.34);
  markerEmblem.position.set(3.1, 1.0, -7.97);
  scene.add(markerEmblem);
  addInteract('marker', 2.4, -8, 1.6);

  // carvalho velho com página presa
  tree(4.1, -5.4, 1.6, false);
  const page = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), glowMat(0xfff3b0));
  page.position.set(3.55, 1.4, -5.1);
  page.rotation.y = -0.5;
  scene.add(page);
  zone.glint = page;
  addInteract('clueOak', 3.3, -5.4, 1.5);

  // portão secreto (precisa do mapa montado)
  box(scene, 0.7, 3.2, 0.7, 0x77705f, -1.7, 1.6, -16, { collider: true });
  box(scene, 0.7, 3.2, 0.7, 0x77705f, 1.7, 1.6, -16, { collider: true });
  box(scene, 4.1, 0.6, 0.8, 0x77705f, 0, 3.4, -16); // arco por cima: sem collider (2D)
  const leftDoor = box(scene, 1.55, 2.3, 0.16, 0x4e3b1e, -0.79, 1.15, -16);
  const rightDoor = box(scene, 1.55, 2.3, 0.16, 0x4e3b1e, 0.79, 1.15, -16);
  for (const [x] of [[-0.55], [0.55]]) {
    const emblem = makeTreeEmblem(0.3);
    emblem.position.set(x, 1.55, -15.9);
    scene.add(emblem);
  }
  const gateGlow = new THREE.PointLight(0xf5c542, 5, 6);
  gateGlow.position.set(0, 1.8, -15);
  scene.add(gateGlow);
  zone.gateDoors = [leftDoor, rightDoor];
  const gateCollider = { minX: -1.7, maxX: 1.7, minZ: -16.5, maxZ: -15.5 };
  zone.colliders.push(gateCollider);
  zone.gateCollider = gateCollider;
  addInteract('gate', 0, -14.5, 1.8);

  // feixes de luz + vaga-lumes
  for (const [x, z, tilt] of [[-2.5, 12, 0.22], [2.2, 5, -0.18], [-1.8, -6, 0.15]]) {
    const shaft = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 11, 14, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xfff3c4, transparent: true, opacity: 0.09, side: THREE.DoubleSide, depthWrite: false })
    );
    shaft.position.set(x, 5.5, z);
    shaft.rotation.z = tilt;
    scene.add(shaft);
  }
  const fireflyCount = 42;
  const positions = new Float32Array(fireflyCount * 3);
  for (let i = 0; i < fireflyCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = 0.6 + Math.random() * 2.6;
    positions[i * 3 + 2] = 24 - Math.random() * 40;
  }
  const fireflyGeometry = new THREE.BufferGeometry();
  fireflyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const fireflyMaterial = new THREE.PointsMaterial({ color: 0xffe08a, size: 0.13, transparent: true, opacity: 0.85 });
  const fireflies = new THREE.Points(fireflyGeometry, fireflyMaterial);
  scene.add(fireflies);

  zone.update = (dt, t) => {
    if (zone.glint) zone.glint.material.opacity = 0.55 + 0.45 * Math.sin(t * 3);
    fireflies.rotation.y = t * 0.04;
    fireflyMaterial.opacity = 0.55 + 0.3 * Math.sin(t * 2.1);
    for (let i = 0; i < sparkles.length; i += 1) {
      sparkles[i].position.y = 0.06 + 0.03 * Math.sin(t * 2 + i);
    }
  };
  return zone;
}
