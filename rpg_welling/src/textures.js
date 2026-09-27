// RPG Welling — texturas pintadas em canvas, materiais e primitivas de cena.
//
// Extraído do world.js na rodada 4 (roadmap 0.3, "quebrar world.js e main.js
// em módulos"). Este é o pedaço mais seguro de tirar: não guarda NENHUM
// estado, não conhece zona, cena ou jogadora — as primitivas recebem `parent` e
// `zone` como parâmetro. As dependências são só o three.js e o document.
//
// O que ficou de fora de propósito: skyDome/skyGlow/photoBand (dependem da
// zona para a cor da névoa) e lightShaft/glowSprite (guardam textura em
// memória no próprio módulo). Esses vêm numa próxima fatia, com o rollout
// conferido por captura de tela de cada zona.
//
// A rede de segurança é o teste de fumaça de boot: ele constrói as 5 zonas
// com um stub de DOM que valida os argumentos passados ao canvas, então
// qualquer import quebrado ou textura sem arg canvas aparece como falha de
// teste, não como tela preta.

import * as THREE from 'three';

// Cache de materiais por cor: o mundo chama mat() milhares de vezes com
// poucos valores, e material novo a cada chamada era o que segurava a contagem
// de draw calls. Morava no world.js porque mat() vivia lá; veio junto na
// extração, senão o cache some e o jogo paga material duplicado.
const matCache = new Map();

export function mat(color) {
  if (!matCache.has(color)) matCache.set(color, new THREE.MeshLambertMaterial({ color }));
  return matCache.get(color);
}
export function glowMat(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
}

// cor CSS a partir de qualquer cor do three.js: as zonas guardam a névoa como
// número hexadecimal (0x8fc9e8) e `addColorStop` só aceita string CSS. Sem esta
// conversão, passar a cor direto quebrava a promise que monta o céu — e a zona
// inteira ficava sem carregar (jogo preso na tela de personagem).
export function cssColor(color, fallback = '#ffffff') {
  if (typeof color === 'string') return color;
  if (typeof color === 'number') return `#${color.toString(16).padStart(6, '0')}`;
  if (color && typeof color.getHexString === 'function') return `#${color.getHexString()}`;
  return fallback;
}

export function canvasTexture(w, h, draw) {
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
export function pbrFrom({ texture, canvas }, repeat, normalScale = 1.0, roughnessRange = [0.65, 1.0]) {
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

export function box(parent, w, h, d, color, x, y, z, { collider, rotY = 0, cast = true, receive = true } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotY;
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  parent.add(mesh);
  if (collider) addCollider(parent, x, z, w, d);
  return mesh;
}

// ATENÇÃO — esta é a pegadinha do arquivo: aqui `w` e `d` são o TAMANHO
// inteiro e a função divide por dois. Três zonas (highstreet, classroom e
// outra) definem um `addCollider` LOCAL whose parameters are named `hw, hd`
// and are HALF-extents. As duas convenções convivem no mesmo arquivo e já
// custaram dois bugs: o collider do café ficou com metade da largura do prédio,
// e o valor do teste da caixa de correio saiu pela metade. Ao chamar, confira
// qual dos dois está em escopo.
export function addCollider(parent, x, z, w, d) {
  const list = parent.userData.zone?.colliders;
  if (list) list.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
}

export function wall(parent, x1, z1, x2, z2, height = 2.2, material = null) {
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

export function plant(parent, x, z, tuftTex) {
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
export function spritePlane(texture, size) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshLambertMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false })
  );
  mesh.castShadow = false;
  return mesh;
}

// brilho aditivo pulsante (árvore dourada, janelas, vaga-lumes…)
export function glowSprite(parent, zone, color, size, x, y, z, { opacity = 0.5, amp = 0.18, speed = 2.2 } = {}) {
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
export function brickTexture() {
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

// ── High Street: superfícies que eram uma cor só (rodada 8) ───────────────────
// A calçada e a pista usavam a mesma textura de pedra pintada com uma cor por
// cima, e as vitrines eram `mat(cor)` chapada. De longe a rua lia como blocos
// de cor chapada. Estas três devolvem ESTRUTURA sem sair do registro: base
// chapada + granulado + variação por peça, o mesmo truque do tijolo e da
// pedra. A paleta é a da rua já medida em captura (areia quente #a18c62,
// asfalto quente escuro #51422d, sombra navy) — a textura é mais clara que o
// resultado na tela porque a luz da zona é quente e sombreada.

// Calçada: lajes retangulares com junta e tons variados por laje. A junta é o
// que dá escala — sem ela o chão não tem com que o olho medir a distância.
export function pavementTexture() {
  return canvasWithRaw(512, 512, (ctx) => {
    ctx.fillStyle = '#a89066'; // a junta, na mesma familia da laje — contraste alto
    // aqui vira azulejo de banheiro, e a calçada precisa ler como calçada
    ctx.fillRect(0, 0, 512, 512);
    const sw = 128, sh = 64; // 4 colunas x 8 fileiras
    for (let row = 0; row < 8; row += 1) {
      const offset = (row % 2) * sw / 2;
      for (let col = -1; col < 5; col += 1) {
        const tone = 178 + Math.random() * 30;
        ctx.fillStyle = `rgb(${tone | 0}, ${tone * 0.88 | 0}, ${tone * 0.66 | 0})`;
        ctx.fillRect(col * sw + offset + 4, row * sh + 4, sw - 8, sh - 8);
      }
    }
    // granulado fino por cima, para as lajes não ficarem injetadas
    for (let i = 0; i < 2600; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(90, 76, 52, .13)' : 'rgba(228, 214, 184, .13)';
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }
  });
}

// Asfalto: agregado escuro e neutro, com faixas de desgaste mais claras no
// meio da faixa de rolamento — é o que dá a sensação de rua usada.
export function asphaltTexture() {
  return canvasWithRaw(512, 512, (ctx) => {
    // A base é o valor final, não um ponto de partida tingido: a primeira
    // versão usou #4c463c COM uma tinta 0x9a9aa8 por cima e a pista saiu quase
    // preta; a segunda usou #7a7264 sem tinta e a pista ficou da mesma cor da
    // calçada, perdendo o contraste que faz uma rua ler como rua. A terceira
    // acertou o valor (#5f5748) mas errou o MATIZ: a zona tem sol quente
    // (0xffe2b0 a 1,8), e um tom quente já no albedo vira terra batida na tela
    // — a pista inteira lia como chão de terra, não como rua. Asphalt é
    // NEUTRO com leve viés frio; é a luz quente da zona que o deixa amarelado
    // na captura, e é esse amarelado que está certo.
    ctx.fillStyle = '#4c4d52';
    ctx.fillRect(0, 0, 512, 512);
    // desgaste: duas faixas verticais mais claras (as rodas)
    for (const x of [96, 320]) {
      const wear = ctx.createLinearGradient(x, 0, x + 96, 0);
      wear.addColorStop(0, 'rgba(128, 129, 134, 0)');
      wear.addColorStop(0.5, 'rgba(128, 129, 134, .16)');
      wear.addColorStop(1, 'rgba(128, 129, 134, 0)');
      ctx.fillStyle = wear;
      ctx.fillRect(x, 0, 96, 512);
    }
    // agregado: cinza com espalhamento aleatório entre os três canais. Com o
    // tom fixo quente (r > g > b) o cimento lia como poeira, mesmo em cima de
    // uma base correta.
    for (let i = 0; i < 5200; i += 1) {
      const tone = 70 + Math.random() * 100;
      const j = (Math.random() - 0.5) * 14;   // desvio de cinza, não de matiz
      ctx.fillStyle = `rgba(${tone + j | 0}, ${tone | 0}, ${tone - j * 0.4 | 0}, .3)`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 2, 1 + Math.random() * 2);
    }
  });
}

// Vidro de vitrine: navy escuro com um reflexo diagonal. A vitrine da High
// Street é o que a menina olha, então é o vidro que mais merece atenção — e
// chapado ele lia como retângulo branco colado na parede.
export function glassPaneTexture() {
  return canvasWithRaw(256, 256, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, '#3d6a86');
    g.addColorStop(0.55, '#22465e');
    g.addColorStop(1, '#152c3e');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    // reflexo: duas bandas diagonais claras, a segunda mais fraca
    for (const [x0, alpha, width] of [[-60, 0.3, 42], [70, 0.16, 26]]) {
      ctx.save();
      ctx.translate(x0, 0);
      ctx.rotate(0.42);
      ctx.fillStyle = `rgba(226, 240, 248, ${alpha})`;
      ctx.fillRect(0, -80, width, 420);
      ctx.restore();
    }
  });
}

export function plasterTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#efe3c8';
    ctx.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 3000; i += 1) {
      ctx.fillStyle = `rgba(${180 + Math.random() * 60 | 0}, ${165 + Math.random() * 55 | 0}, ${120 + Math.random() * 40 | 0}, .12)`;
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  });
}

export function planksTexture() {
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

export function tilesTexture() {
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

export function carpetTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#8e3b46';
    ctx.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 4000; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(60, 20, 26, .18)' : 'rgba(220, 150, 150, .1)';
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
  });
}

export function grassTexture() {
  return canvasWithRaw(1024, 1024, (ctx) => {
    ctx.fillStyle = '#3c7a40';
    ctx.fillRect(0, 0, 1024, 1024);
    for (let i = 0; i < 9000; i += 1) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(30, 70, 32, .25)' : 'rgba(120, 190, 100, .16)';
      ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 3, 3 + Math.random() * 4);
    }
  });
}

export function dirtTexture() {
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

export function tuftTexture() {
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

export function ivyTexture() {
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

// Flores de campina: as Oxleas Meadows são reserva natural local conhecida
// pelas flores silvestres, e é por isso que o café real fica num PRADO e não
// dentro da mata fechada. A mesma palha e as mesmas folhas do tufo, com as
// cores de flor por cima — a diferença entre "chão de bosque" e "campina" é
// essa camada, e sem ela a clareira do café lia como falta de mata.
export function wildflowerTexture() {
  return canvasTexture(128, 128, (ctx) => {
    ctx.clearRect(0, 0, 128, 128);
    for (let i = 0; i < 8; i += 1) {
      const x = 18 + Math.random() * 92;
      const top = 16 + Math.random() * 26;
      const lean = (Math.random() - 0.5) * 26;
      ctx.strokeStyle = Math.random() > 0.5 ? '#4d8f45' : '#67a851';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, 124);
      ctx.quadraticCurveTo(x + lean, 70, x + lean * 1.6, top);
      ctx.stroke();
      // corola: 5 pétalas em torno de um miolo escuro. Pétalas em leque fixo
      // (5 arcos) leem como flor; um círculo chapado lê como botão.
      const cor = ['#e8dc52', '#e0709a', '#dfe6f2', '#e0a33a'][(Math.random() * 4) | 0];
      for (let p = 0; p < 5; p += 1) {
        const ang = (p / 5) * Math.PI * 2 + Math.random() * 0.3;
        ctx.fillStyle = cor;
        ctx.beginPath();
        ctx.ellipse(
          x + lean * 1.6 + Math.cos(ang) * 4.2,
          top + Math.sin(ang) * 4.2,
          3.6, 2.6, ang, 0, 7,
        );
        ctx.fill();
      }
      ctx.fillStyle = '#8a6a1e';
      ctx.beginPath();
      ctx.arc(x + lean * 1.6, top, 2.1, 0, 7);
      ctx.fill();
    }
  });
}

export function paperTexture() {
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

export function stoneTexture() {
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
export function faceTexture({ blink = false, mustache = false, glasses = false } = {}) {
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

export let faceCache = null;
export function faces() {
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

export function facePlane(parent, texture, size) {
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(size, 24),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true })
  );
  mesh.position.z = size * 1.18;
  parent.add(mesh);
  return mesh;
}
