// RPG Welling — céu, fundo e feixes de luz.
//
// Segunda fatia do roadmap 0.3. Sai junto com src/textures.js porque é o
// outro pedaço de world.js que não segura estado de jogo: o que precisa da
// zona (a cor da névoa, a lista de pulsos) chega por parâmetro, e o que é
// cacheado (a textura do feixe, a do brilho) mora no próprio módulo.
//
// Por que este bloco era o candidato mais difícil da fatia 1: a inspeção
// ingênua diria que era igual aos geradores de textura, mas skyDome e
// photoBand leem zone.fog e montam nuvem e skyline. Eles continuam aqui como
// funções puras que recebem a zona — só deixaram de dividir módulo com os
// 3.300 linhas de construção de cena.
//
// A rede segue sendo dupla: o teste de fumaça constrói as 5 zonas (cada uma
// chama skyDome, e a mata chama photoBand), e a captura de tela confere que o
// céu e a foto panorâmica continuam no lugar — import quebrado aqui aparece
// como falha de teste, e material errado só como imagem errada.

import * as THREE from 'three';
import { canvasTexture, cssColor, glowSprite } from './textures.js';

// Feixe de luz que entra pela janela.
//
// O que o fazia parecer um "plano fantasma" de aresta dura (item 4.3 do
// roadmap, visto na escola E na sala de aula) era a combinação de três
// decisões que interagem mal: ConeGeometry ABERTO (sem tampa), DoubleSide e
// AdditiveBlending. Com as duas faces somando, cada pixel da SILHUETA é
// desenhado duas vezes — as faces ficam quase de perfil e se sobrepõem na tela
// —, e a aresta do triângulo acende como um vinco claro. Não era o fader de
// oclusão: o material já nascia translúcido no build.
//
// O conserto é uma face só (BackSide = parede interna do cone, que é o
// truque padrão para volume) e queda de opacidade ao longo da altura, para o
// feixe nascer na janela e se dissipar antes de encostar no chão. Sem a
// gradiente o cone ficaria um triângulo chapado, só que mais fraco.
export function lightShaft(parent, x, y, z, { radius = 1.5, height = 11, tilt = 0.2, opacity = 0.1, color = 0xffe2a8 } = {}) {
  if (!lightShaft.texture) {
    // alphaMap: branco = opaco, preto = invisível. O canvas tem flipY ligado,
    // então a linha 0 (topo) cai em v=1, que é o TOPO do cone, na janela.
    lightShaft.texture = canvasTexture(8, 128, (ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(255,255,255,0.95)'); // na janela: quase opaco
      g.addColorStop(0.45, 'rgba(255,255,255,0.28)');
      g.addColorStop(1, 'rgba(255,255,255,0)');    // no chão: some
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
  }
  const shaft = new THREE.Mesh(
    new THREE.ConeGeometry(radius, height, 14, 1, true),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      alphaMap: lightShaft.texture,
    })
  );
  shaft.position.set(x, y, z);
  shaft.rotation.z = tilt;
  parent.add(shaft);
  return shaft;
}

// ── cenários de fundo: céu, nuvens, colinas, silhuetas de cidade ────────────
// Cúpula de céu pintada (gradiente vertical) + nuvens macias + silhuetas ao
// fundo. Tudo bem além dos limites jogáveis: dá profundidade sem colisão.
export function skyDome(scene, zone, { top, horizon, glow = '#ffe6b0', stars = false, hills = 'green', silhouette: silhouetteColor } = {}) {
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
  // silhueta no topo do quadro, numa zona CLARA e de dia, com a câmera alta do
  // diorama enquadrando a linha, o mesmo cinza-azulado vira uma barra preta
  // chapada (item 4.2 do roadmap, diagnosticado com o SCREEN do qa-visual). A
  // correção menos invasiva é deixar a zona passar uma cor mais alta e mais
  // próxima do horizonte dela, para a linha virar paisagem em vez de tarja —
  // sem mexer no pitch padrão nem no tamanho do terreno, que são as outras
  // duas saídas.
  const silhouette = new THREE.MeshBasicMaterial({
    color: silhouetteColor ?? (city ? 0x46586f : 0x3f6048),
    fog: false, depthWrite: false, transparent: true, opacity: 0.95,
  });
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
export function photoBand(scene, zone, {
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
export function skyGlow(scene, zone, color, x, y, z, size = 14) {
  const glow = glowSprite(scene, zone, color, size, x, y, z, { opacity: 0.55, amp: 0.05, speed: 0.6 });
  glow.material.fog = false;
  return glow;
}
