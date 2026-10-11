// Spin Art Lab — a tela do jogo.
//
// A folha gira. Enquanto o dedo está na folha, o pincel pinga tinta. O que faz
// a imagem é a distância do pingente ao centro, e é por isso que os modos de
// cursor importam mais do que a cor.
//
// O arquivo da geometria (`spin-art-geometry.js`) decide o desenho e é testado
// sem navegador; aqui só há tela, entrada e som. O que se guarda ao final é a
// lista de traços, nunca a imagem — por isso dá para salvar em `localStorage`
// sem IndexedDB e mandar a criação para outra pessoa.

import {
  SPIN_SIZE, SPIN_MODES, SPIN_SYMMETRIES,
  dropFor, dabPoints, resolveDabs, encodeRecord,
} from './spin-art-geometry.js';

const HALF = SPIN_SIZE / 2;
const DEG = Math.PI / 180;

// O papel. Todos desenhados por código: crumple, kraft, listras, bolinhas,
// quadriculado e estrelas são geometria, e a lição nº 23 do docs/LESSONS.md é
// "o que a régua resolve, a régua resolve". Nenhum arquivo de imagem entra aqui,
// então trocar de papel não pesa no repositório e não quebra em cache.
export const SPIN_PAPERS = ['crumple', 'kraft', 'stripes', 'dots', 'grid', 'stars'];

// Cores de tinta. Vivas e poucas: a criança escolhe rápido e a lista de traços
// guarda o índice, não o hex — trocar a paleta depois não estraga o que foi salvo.
const INKS = [
  '#e8195f', '#f7a325', '#f2d024', '#3aa655',
  '#22a5c4', '#2f56c9', '#7b4fc9', '#e2679b',
];
const INKS_INK = '#2b2540';

function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'style') node.setAttribute('style', value);
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else if (value !== null && value !== undefined) node.setAttribute(key, value);
  }
  for (const child of [].concat(children)) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

// --- o som ---------------------------------------------------------------
//
// Três sons e nenhum arquivo: um zunido que segue a velocidade do giro, um
// "plip" curto a cada gota e um acorde no fim. O contexto só pode nascer depois
// de um clique — é a regra de autoplay do navegador, e sem isso o jogo sai
// mudo na primeira visita, que é o jeito mais garantido de uma criança achar
// que o jogo está quebrado.
function createVoice() {
  let ctx = null;
  let whirr = null;

  const ensure = () => {
    if (ctx) return ctx;
    const Ctx = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
    return ctx;
  };

  const start = (speed) => {
    const audio = ensure();
    if (!audio) return;
    if (audio.state === 'suspended') audio.resume();
    if (whirr) return;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    gain.gain.value = 0;
    osc.type = 'triangle';
    osc.frequency.value = 60 + speed * 12;
    osc.connect(filter).connect(gain).connect(audio.destination);
    osc.start();
    whirr = { osc, gain };
  };

  const spin = (speed) => {
    if (!ctx || !whirr) return;
    whirr.osc.frequency.value = 60 + speed * 12;
    whirr.gain.gain.value = speed > 0 ? Math.min(0.05, speed * 0.02) : 0;
  };

  const stop = () => {
    if (!whirr) return;
    const { osc, gain } = whirr;
    whirr = null;
    const audio = ctx;
    gain.gain.setTargetAtTime(0, audio.currentTime, 0.05);
    osc.stop(audio.currentTime + 0.4);
  };

  // O plip é limitado: a cada quadro viraria um zumbido. É a gota que soa, e a
  // gota é o que a criança controla, então ela precisa de variação de tom.
  let lastPlip = 0;
  const plip = (pitch = 0) => {
    const audio = ensure();
    if (!audio) return;
    const now = audio.currentTime;
    if (now - lastPlip < 0.055) return;
    lastPlip = now;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = 'sine';
    osc.frequency.value = 520 + pitch * 180;
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    osc.connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  };

  const ding = () => {
    const audio = ensure();
    if (!audio) return;
    const now = audio.currentTime;
    [660, 880, 1320].forEach((freq, index) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const at = now + index * 0.07;
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(0.08, at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.5);
      osc.connect(gain).connect(audio.destination);
      osc.start(at);
      osc.stop(at + 0.55);
    });
  };

  return { start, spin, stop, plip, ding, destroy() { stop(); if (ctx) ctx.close(); ctx = null; } };
}

// --- o papel -------------------------------------------------------------

export function paintPaper(ctx, paper) {
  ctx.save();
  ctx.clearRect(0, 0, SPIN_SIZE, SPIN_SIZE);
  ctx.fillStyle = '#fbf8f2';
  ctx.fillRect(0, 0, SPIN_SIZE, SPIN_SIZE);

  if (paper === 'kraft') {
    ctx.fillStyle = '#c9a97a';
    ctx.fillRect(0, 0, SPIN_SIZE, SPIN_SIZE);
    speckle(ctx, '#a8875b', 2600, 1.6);
    speckle(ctx, '#e0c79c', 1800, 1.4);
  } else if (paper === 'stripes') {
    const bands = ['#cfe3c0', '#d9cde8', '#f0d9a8', '#c3dcea', '#f2c6d2', '#f7f0cf'];
    const height = SPIN_SIZE / bands.length;
    bands.forEach((colour, i) => {
      ctx.fillStyle = colour;
      ctx.fillRect(0, i * height, SPIN_SIZE, height);
    });
  } else if (paper === 'dots') {
    dot(ctx, 210, 190, 46, '#8fbf6a');
    dot(ctx, 430, 300, 62, '#e2679b');
    dot(ctx, 700, 180, 38, '#5ab6d6');
    dot(ctx, 810, 470, 70, '#e8a13c');
    dot(ctx, 300, 640, 54, '#6f8fd0');
    dot(ctx, 620, 730, 44, '#9ac25c');
    dot(ctx, 150, 430, 30, '#c88fd0');
    dot(ctx, 520, 480, 26, '#d96a8a');
    dot(ctx, 250, 900, 36, '#63bfa0');
    dot(ctx, 760, 880, 32, '#e0b13c');
  } else if (paper === 'grid') {
    ctx.strokeStyle = '#b9d3e6';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 20; i += 1) {
      const p = i * (SPIN_SIZE / 20);
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, SPIN_SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(SPIN_SIZE, p); ctx.stroke();
    }
  } else if (paper === 'stars') {
    const colours = ['#e8195f', '#f2d024', '#3aa655', '#22a5c4', '#7b4fc9', '#e8a13c'];
    for (let i = 0; i < 46; i += 1) {
      const x = (i * 173 + 61) % SPIN_SIZE;
      const y = (i * 271 + 137) % SPIN_SIZE;
      star(ctx, x, y, 26 + (i % 4) * 7, colours[i % colours.length]);
    }
  } else if (paper === 'crumple') {
    // O vinco: faixas largas com sombra e luz, tortas, como papel amassado.
    for (let i = 0; i < 14; i += 1) {
      const y = (i * 71 + 23) % SPIN_SIZE;
      ctx.save();
      ctx.translate(0, y);
      ctx.rotate((i % 3 - 1) * 0.05);
      ctx.fillStyle = 'rgba(0,0,0,.045)';
      ctx.fillRect(0, 0, SPIN_SIZE, 16);
      ctx.fillStyle = 'rgba(255,255,255,.75)';
      ctx.fillRect(0, 16, SPIN_SIZE, 10);
      ctx.restore();
    }
  }

  // O miolo do prato: um disco levemente mais claro, e o furo central. O
  // desenho da criança vive dentro dele.
  ctx.beginPath();
  ctx.arc(HALF, HALF, HALF * 0.94, 0, Math.PI * 2);
  ctx.fillStyle = paper === 'kraft' ? 'rgba(255,255,255,.10)' : 'rgba(255,255,255,.30)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(HALF, HALF, 16, 0, Math.PI * 2);
  ctx.fillStyle = INKS_INK;
  ctx.fill();
  ctx.restore();
}

// Desenha uma receita pronta num canvas de qualquer tamanho. É o que a galeria
// usa para a miniatura, e é a MESMA função que o jogo usa para o desfazer —
// duas implementações do desenho divergem na primeira edição, e a miniatura
// mostraria uma coisa enquanto o jogo faz outra.
export function paintRecord(canvas, record, paper, options = {}) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.scale(size / SPIN_SIZE, size / SPIN_SIZE);
  paintPaper(ctx, paper);
  const alpha = options.alpha ?? 0.42;
  for (const dab of record) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = INKS[dab.c % INKS.length];
    for (const point of dabPoints(dab.angle, dab.r, dab.symmetry ?? 1, dab.extra)) {
      ctx.beginPath();
      ctx.arc(HALF + point.x * HALF, HALF + point.y * HALF, dab.f * HALF * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  ctx.restore();
}

function speckle(ctx, colour, count, size) {
  ctx.fillStyle = colour;
  for (let i = 0; i < count; i += 1) {
    const x = (i * 137 + 29) % SPIN_SIZE;
    const y = (i * 229 + 71) % SPIN_SIZE;
    ctx.fillRect(x, y, size, size);
  }
}

function dot(ctx, x, y, r, colour) {
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, r * 0.62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function star(ctx, x, y, r, colour) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = colour;
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? r : r * 0.44;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const px = Math.cos(a) * radius;
    const py = Math.sin(a) * radius;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// --- a fábrica -----------------------------------------------------------

export function createSpinArt({ container, lang = 'pt', strings, onSave, onSoundToggle, soundOn = true }) {
  if (!container || typeof container.appendChild !== 'function') {
    throw new TypeError('createSpinArt requires a container element');
  }
  const t = (key) => strings?.[key] ?? key;

  const state = {
    paper: 'crumple',
    ink: 0,
    mode: 'spiral',
    // A simetria começa em 1, e não em 6.
    //
    // Com 6, um clique pintava seis lugares ao mesmo tempo e a criança via cinco
    // marcas que não tinha pedido — e leu isso como "eu clico aqui e pinta
    // lá". O código estava certo (medido: raio do clique 0,711, raio gravado
    // 0,711) e ainda assim o jogo parecia quebrado, porque o PADRÃO mentia.
    //
    // A regra que vale: o primeiro toque tem que honrar o primeiro toque. A
    // simetria continua lá, e continua sendo a melhor ideia do jogo — mas é uma
    // escolha, não uma surpresa de fábrica.
    symmetry: 1,
    // Metade do que era. A 1.0 o prato dava uma volta a cada 2,4 s e o traço
    // saía rápido demais para a criança acompanhar com o olho — ela via a
    // linha correndo, não o desenho crescendo. A 0.5 são ~4,8 s por volta, que
    // é o ritmo de um prato girando na mão de uma criança.
    speed: 0.5,
    direction: 1,
    // O pincel. Finito de propósito: com 0.06 a criança encavala três espiras de
    // vez e o desenho vira um disco chapado, sem anel nenhum. O que faz a
    // espiral ser espiral é o VAZIO entre as voltas: 0.032 dá anéis separados,
    // que é o desenho que a criança reconhece de um prato de verdade.
    flow: 0.032,
    angle: 0,
    painting: false,
    paused: false,
    // Onde o cursor está, em ângulo e raio, relativo ao centro da folha. É
    // isto que faz o cursor SER o pincel: o raio dele escolhe o anel e o
    // ângulo escolhe por onde o traço começa.
    pointerAngle: 0,
    phase: 0,
    dabs: [],
    marks: [],
    sound: soundOn,
  };

  const voice = createVoice();
  let frame = 0;
  let lastTime = 0;
  let disposed = false;

  // fundo e tinta em dois canvases: o papel é caro de desenhar (listras, malha,
  // estrelas) e não pode ser refeito a cada quadro.
  const base = document.createElement('canvas');
  base.width = SPIN_SIZE;
  base.height = SPIN_SIZE;
  const ink = document.createElement('canvas');
  ink.width = SPIN_SIZE;
  ink.height = SPIN_SIZE;
  const bctx = base.getContext('2d');
  const ictx = ink.getContext('2d');

  const sheet = el('canvas', { class: 'spin-sheet', width: String(SPIN_SIZE), height: String(SPIN_SIZE) });
  const ctx = sheet.getContext('2d');

  // --- desenho -----------------------------------------------------------

  function redraw() {
    ctx.clearRect(0, 0, SPIN_SIZE, SPIN_SIZE);
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(ink, 0, 0);
  }

  function repaintBase() {
    paintPaper(bctx, state.paper);
    redraw();
  }

  function clearInk() {
    ictx.clearRect(0, 0, SPIN_SIZE, SPIN_SIZE);
    state.dabs = [];
    state.marks = [];
    redraw();
  }

  // Um pingo: um círculo semitransparente, repetido a cada quadro. É a
  // sobreposição que engrossa a linha e dá a densidade de tinta do spin art.
  function stamp(angleDeg, rNorm, flow, inkIndex, symmetry, extraDeg = 0) {
    const colour = INKS[inkIndex % INKS.length];
    ictx.save();
    ictx.globalAlpha = 0.42;
    ictx.fillStyle = colour;
    for (const point of dabPoints(angleDeg, rNorm, symmetry, extraDeg)) {
      ictx.beginPath();
      ictx.arc(HALF + point.x * HALF, HALF + point.y * HALF, flow * HALF * 0.5, 0, Math.PI * 2);
      ictx.fill();
    }
    ictx.restore();
  }

  function tick(now) {
    if (disposed) return;
    const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0;
    lastTime = now;
// Uma volta a cada ~2,4 s na velocidade 1. É o ritmo que importa: mais
    // devagar e a espiral não fecha enquanto a criança espera, e o desenho
    // parece um garrancho parado. Mais rápido e o traço vira um borrão.
    // Com a folha parada, o giro é zero e a criança pinta um ponto exato.
    const omega = state.paused ? 0 : state.speed * state.direction * 2.6;
    state.angle += omega * dt;

    // A FOLHA GIRA DE VERDADE, e o CURSOR é o pincel.
    //
    // Duas correções na mesma direção, porque as duas vêm do mesmo mal
    // entendido. Primeiro, o giro vivia só no ângulo do pincel e a folha nunca
    // se mexia na tela: uma folha sem tinta parecia uma foto parada. Agora o
    // papel gira por transform, e a tinta é carimbada no referencial DO PAPEL.
    //
    // Segundo, e mais importante: com o pincel parado no mundo o cursor só
    // decidia SE havia traço, nunca ONDE. A criança apontava e a tinta saía em
    // outro lugar — que é o oposto de usar o cursor. Agora o cursor é o pincel:
    // o ângulo dele escolhe por onde o traço começa, e a tinta nasce embaixo
    // dele. O carimbo vai para `cursorAngle - ângulo do papel` porque o papel
    // gira de `+ângulo` e o pincel precisa ficar parado no mundo.
    // Tudo em GRAUS, sempre. `state.angle` mora em radianos porque é o que o
    // `Math.sin`/`Math.cos` do laço quer, e `pointerAngle` vem de um `atan2`
    // convertido em graus. A conta do cursor misturava os dois: ângulo do cursor
    // em graus MENOS giro em radianos. A compensação saía errada por um fator
    // de ~57 e a tinta caía quase oposta ao cursor, que era exatamente a
    // reclamação — "clico aqui e pinta lá".
    //
    // A conversão acontece uma vez, aqui. Abaixo do laço, ângulo é grau.
    const spinDeg = state.angle * 180 / Math.PI;
    sheet.style.transform = `rotate(${(spinDeg % 360).toFixed(2)}deg)`;
    if (brush) placeBrush();

    if (state.painting) {
      state.phase += dt;
      const drop = dropFor(state.mode, state.phase, pointerBase, pointerBase);
      // O pino é carimbado no quadro do PAPEL, com o giro descontado. O papel
      // gira de `+spinDeg` na tela, então `papel + giro = mundo` volta a ser o
      // ângulo em que o ponteiro está.
      const cursorAngle = state.pointerAngle - spinDeg;
      stamp(cursorAngle, drop.r, state.flow, state.ink, state.symmetry, drop.extra);
      // O delta gravado é a diferença entre dois ângulos de cursor, e NADA MAIS.
      // Antes era `-avanço + deriva`, e a deriva JÁ CONTAVA o avanço — o giro
      // entrava duas vezes e a galeria redesenhava o traço ao dobro da
      // velocidade. Um ângulo, uma subtração.
      const drift = cursorAngle - lastCursorAngle;
      lastCursorAngle = cursorAngle;
      state.dabs.push({ da: drift, r: drop.r, c: state.ink, f: state.flow, extra: drop.extra });
      if (drop.twin) {
        stamp(cursorAngle, drop.twin, state.flow * 0.8, state.ink, state.symmetry, drop.extra);
        state.dabs.push({ da: 0, r: drop.twin, c: state.ink, f: state.flow * 0.8, extra: drop.extra });
      }
      voice.plip(drop.r * 3);
    }

    voice.spin(Math.abs(omega));
    redraw();
    frame = requestAnimationFrame(tick);
  }

  // --- o pincel na tela ------------------------------------------------
  //
  // O pincel é visível, e cada modo tem a SUA forma: um anel para o fixo, uma
  // onda para o ondulante, uma espiral para o espiral. Não é enfeite — sem ele a
  // criança não tem como saber o que o modo vai fazer antes de fazer, e o modo
  // vira um botão às cegas.
  //
  // O pincel fica FORA do canvas que gira: ele é a mão, e a mão não gira com o
  // papel. Por isso é irmão da folha, e não filho.
  const BRUSH_SHAPE = {
    fixed: 'ring',
    follow: 'cross',
    wobble: 'wave',
    spiral: 'spiral',
    orbit: 'orbit',
    flicker: 'flicker',
    twin: 'twin',
  };

  const brush = el('div', { class: 'brush ring', 'aria-hidden': 'true' });

  function placeBrush() {
    if (!brushIsOverSheet) return;
    const rect = wrap.getBoundingClientRect();
    const half = Math.max(sheet.offsetWidth, sheet.offsetHeight) / 2;
    const x = (pointerX - (rect.left + rect.width / 2)) / half;
    const y = (pointerY - (rect.top + rect.height / 2)) / half;
    brush.style.left = `${50 + x * 50}%`;
    brush.style.top = `${50 + y * 50}%`;
  }

  // --- ponteiro --------------------------------------------------------

  let pointerBase = 0.58;
  let pointerX = 0;
  let pointerY = 0;
  let brushIsOverSheet = false;
  let lastCursorAngle = 0;

  // A distância do dedo ao centro, imune à rotação.
    //
    // Não dá para usar `getBoundingClientRect` para a MEIA-LARGURA: com a folha
    // girada, o rect é a caixa ALINHADA AOS EIXOS de um quadrado rodado, que é
    // √2 vezes maior a 45°. A distância ao centro é o que se quer, e rotação em
    // torno do centro preserva distância — então o centro sai do rect e o raio
    // sai do `offsetWidth`, que é o tamanho sem transformação.
    function polarAt(event) {
      const rect = sheet.getBoundingClientRect();
      const half = Math.max(sheet.offsetWidth, sheet.offsetHeight) / 2;
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      return {
        r: Math.min(1, Math.hypot(dx, dy) / half),
        a: Math.atan2(dy, dx),
        x: event.clientX,
        y: event.clientY,
      };
    }

    // O raio é SEMPRE onde o dedo encostou, em todos os modos. Isto já foi feito
    // ao contrário — raio fixo, dedo ignorado, para "proteger" quem encostasse
    // perto do centro — e deu o oposto do pretendido: o traço nascia no meio da
    // folha e a criança reclamou que "clica aqui e pinta lá".
    //
    // O piso de 0.1 existe só para o toque exatamente no miolo não virar um
    // pingo de um pixel. É pequeno de propósito: quem quiser pintar no centro
    // pinta no centro.
    const MIN_RADIUS = 0.1;

    function onDown(event) {
      if (event.button !== undefined && event.button !== 0) return;
      sheet.setPointerCapture?.(event.pointerId);
      state.painting = true;
      state.phase = 0;
      const at = polarAt(event);
      pointerBase = Math.max(MIN_RADIUS, at.r);
      state.pointerAngle = at.a / DEG;
      // A primeira gota nasce exatamente sob o cursor: sem esta linha o traço
      // começaria no ângulo que o disco tinha ao toque, e a criança veria tinta
      // nascendo longe da mão.
      //
      // Em GRAUS, igual ao laço. Este número é a mesma unidade do `cursorAngle`
      // do laço; se um dos dois fosse radiano, a diferença viraria um salto
      // enorme no primeiro quadro e o traço começaria em outro lugar.
      lastCursorAngle = state.pointerAngle - state.angle * 180 / Math.PI;
      pointerX = at.x;
      pointerY = at.y;
      brushIsOverSheet = true;
      brush.classList.add('painting');
      placeBrush();
      state.marks.push(state.dabs.length);
      if (state.sound) voice.start(state.speed * state.direction);
      event.preventDefault();
    }

    function onUp(event) {
      if (!state.painting) return;
      state.painting = false;
      brush.classList.remove('painting');
      if (state.sound) voice.stop();
      sheet.releasePointerCapture?.(event.pointerId);
    }

    // O cursor é o pincel: ele muda de raio e de ângulo, e o traço segue. Antes
    // ele só decidia se havia linha, e agora decide também ONDE ela está.
    function onMove(event) {
      const at = polarAt(event);
      pointerX = at.x;
      pointerY = at.y;
      brushIsOverSheet = true;
      if (state.painting) {
        pointerBase = Math.max(MIN_RADIUS, at.r);
        state.pointerAngle = at.a / DEG;
      }
      placeBrush();
    }

    function onLeave() {
      brushIsOverSheet = false;
    }

    sheet.addEventListener('pointerdown', onDown);
    sheet.addEventListener('pointermove', onMove);
    sheet.addEventListener('pointerleave', onLeave);
    sheet.addEventListener('pointerup', onUp);
    sheet.addEventListener('pointercancel', onUp);

  // --- desfazer ----------------------------------------------------------

  // Desfazer é por GESTO, não por pingo: um pingo é invisível para quem está
  // desenhando, e desfazer 4 dos últimos 600 não ajuda ninguém.
  function undo() {
    if (!state.marks.length) return;
    state.marks.pop();
    const keep = state.marks.length ? state.marks[state.marks.length - 1] : 0;
    state.dabs.length = keep;
    replayInk();
  }

  function replayInk() {
    ictx.clearRect(0, 0, SPIN_SIZE, SPIN_SIZE);
    let angle = 0;
    for (const dab of resolveDabs({ dabs: state.dabs })) {
      angle = dab.angle;
      stamp(angle, dab.r, dab.f, dab.c, state.symmetry, dab.extra);
    }
    redraw();
  }

  // --- barra -------------------------------------------------------------

  function button(label, onClick, opts = {}) {
    return el('button', {
      class: `spin-btn${opts.on ? ' on' : ''}${opts.wide ? ' wide' : ''}`,
      type: 'button',
      'aria-pressed': opts.pressed === undefined ? null : String(opts.pressed),
      onclick: onClick,
    }, [label]);
  }

  function paperRow() {
    return el('div', { class: 'spin-row' }, SPIN_PAPERS.map((paper) => el('button', {
      class: `spin-paper${state.paper === paper ? ' on' : ''}`,
      type: 'button',
      'aria-label': t(`spin.paper.${paper}`),
      'aria-pressed': String(state.paper === paper),
      onclick: () => { state.paper = paper; repaintBase(); refresh(); },
    }, [paperSwatch(paper)])));
  }

  function paperSwatch(paper) {
    const c = document.createElement('canvas');
    c.width = 96; c.height = 96;
    c.className = 'swatch-canvas';
    const sctx = c.getContext('2d');
    sctx.save();
    sctx.scale(96 / SPIN_SIZE, 96 / SPIN_SIZE);
    paintPaper(sctx, paper);
    sctx.restore();
    return c;
  }

  function inkRow() {
    return el('div', { class: 'spin-row inks' }, INKS.map((colour, index) => el('button', {
      class: `spin-ink${state.ink === index ? ' on' : ''}`,
      type: 'button',
      style: `--ink:${colour}`,
      'aria-label': `${t('spin.ink')} ${index + 1}`,
      'aria-pressed': String(state.ink === index),
      onclick: () => { state.ink = index; refresh(); },
    })));
  }

  function modeRow() {
    return el('div', { class: 'spin-row' }, SPIN_MODES.map((mode) => button(t(`spin.mode.${mode}`), () => {
      state.mode = mode;
      // O pincel muda de forma com o modo: a criança vê o que vai acontecer
      // antes de acontecer.
      brush.className = `brush ${BRUSH_SHAPE[mode] || 'ring'}`;
      refresh();
    }, { on: state.mode === mode, pressed: state.mode === mode })));
  }

  function symmetryRow() {
    return el('div', { class: 'spin-row' }, SPIN_SYMMETRIES.map((n) => button(`×${n}`, () => {
      state.symmetry = n;
      replayInk();
      refresh();
    }, { on: state.symmetry === n, pressed: state.symmetry === n })));
  }

  function toolsRow() {
    return el('div', { class: 'spin-row' }, [
      button(state.paused ? t('spin.resume') : t('spin.pause'), () => {
        state.paused = !state.paused;
        if (state.paused && state.sound) voice.stop();
        refresh();
      }, { on: state.paused }),
      button(t('spin.undo'), undo),
      button(t('spin.reverse'), () => { state.direction *= -1; refresh(); }, { on: state.direction < 0 }),
      button(t('spin.clear'), clearInk),
      button(state.sound ? t('spin.soundOn') : t('spin.soundOff'), () => {
        state.sound = !state.sound;
        if (!state.sound) voice.stop();
        onSoundToggle?.(state.sound);
        refresh();
      }, { on: state.sound }),
      button(t('spin.save'), () => {
        const text = encodeRecord({ dabs: state.dabs, marks: state.marks });
        voice.ding();
        onSave?.(text);
      }, { wide: true }),
    ]);
  }

  // O número ao lado do controle precisa andar com o controle.
    //
    // Ele era escrito UMA vez, quando a linha da barra era montada, e nunca mais:
    // a criança mexia no cursor e o número ficava parado no valor antigo — que
    // é pior do que não ter número, porque passa a mentir. Aqui o texto é
    // atualizado no mesmo evento que muda o estado, e a linha NÃO é remontada
    // (remontar a cada `input` destruiria o arrasto do cursor no meio do gesto).
    const speedReadout = el('span', { class: 'spin-speed-value', text: state.speed.toFixed(1) });

    function speedRow() {
      return el('div', { class: 'spin-row' }, [
        el('label', { class: 'spin-label' }, [t('spin.speed')]),
        el('input', {
          class: 'spin-speed', type: 'range', min: '0.2', max: '3', step: '0.1',
          value: String(state.speed),
          'aria-label': t('spin.speed'),
          oninput: (event) => {
            const next = Number(event.target.value);
            if (!Number.isFinite(next) || next <= 0) return;
            state.speed = next;
            speedReadout.textContent = next.toFixed(1);
          },
        }),
        speedReadout,
      ]);
    }

  const bar = el('div', { class: 'spin-bar' });
  const canvasWrap = el('div', { class: 'spin-wrap' }, [sheet, brush]);
  const root = el('div', { class: 'spin-game' }, [
    el('div', { class: 'spin-stage' }, [canvasWrap]),
    bar,
  ]);
  const wrap = canvasWrap;

  function refresh() {
    bar.replaceChildren(
      paperRow(),
      inkRow(),
      modeRow(),
      symmetryRow(),
      speedRow(),
      toolsRow(),
    );
  }

  container.appendChild(root);

  repaintBase();
  refresh();
  frame = requestAnimationFrame(tick);

  function destroy() {
    disposed = true;
    cancelAnimationFrame(frame);
    voice.destroy();
    sheet.removeEventListener('pointerdown', onDown);
    sheet.removeEventListener('pointermove', onMove);
    sheet.removeEventListener('pointerup', onUp);
    sheet.removeEventListener('pointercancel', onUp);
    root.remove();
  }

  return {
    destroy,
    getState() {
      return {
        dabs: state.dabs.length,
        paper: state.paper,
        mode: state.mode,
        symmetry: state.symmetry,
        speed: state.speed,
        paused: state.paused,
        // O raio e o ângulo que o jogo ENTENDEU do ponteiro. Sem isto na QA,
        // um desvio de tinta só pode ser deduzido por pixel — e a dedução erra,
        // porque o canvas é o referencial do papel e o clique é o do mundo.
        pointerRadius: pointerBase,
        pointerAngle: state.pointerAngle,
        // Os raios gravados na receita. Afirmar "pinta onde clico" sem conseguir ler
        // o que foi gravado é acreditar numa captura de tela: o pixel medido depende
        // do referencial (papel ou mundo) e da rotação, e erra fácil.
        lastRadii: state.dabs.slice(-6).map((dab) => dab.r),
      };
    },
    getRecord() {
      return encodeRecord({ dabs: state.dabs, marks: state.marks });
    },
    preview(record) {
      const parsed = record && record.dabs ? record : null;
      if (!parsed) return;
      state.dabs = parsed.dabs.map((dab) => ({ ...dab }));
      state.marks = parsed.marks ? [...parsed.marks] : [];
      replayInk();
    },
  };
}
