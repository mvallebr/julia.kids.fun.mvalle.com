// QA visual por captura de tela — item 4.6 do ROADMAP.md.
//
// Por que isto existe: o teste de fumaça de boot prova que as 5 zonas constroem
// sem lançar, e mesmo assim `world.js` pode renderizar uma imagem errada. Foi
// assim que os itens 4.1-4.4 apareceram: ninguém leu o bug, ele foi visto.
//
// O que NÃO funciona (aprendi na marra): `google-chrome --screenshot` puro
// dispara no evento `load`, e o boot do RPG só termina depois de baixar ~25 MB
// de GLB. A primeira tentativa capturou a tela de loading em 100%, sem a cena.
// Por isso aqui a espera é em TEMPO REAL e só a captura vem depois.
//
// uso:
//   node tools/qa-visual.mjs                       # todas as zonas
//   node tools/qa-visual.mjs --zone woods          # uma zona
//   node tools/qa-visual.mjs --zone woods --at 0,10
//   node tools/qa-visual.mjs --keep                # deixa o Chrome vivo
//
// Sai: um PNG por zona em qa-out/ e o relatório no stdout (JSON).

import { spawn, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const GAME = resolve(HERE, '..');

const ZONES = ['school', 'woods', 'highstreet', 'academy', 'classroom'];
// quanto tempo real esperar o boot. A escola é a mais pesada (fachada + campo +
// copas); 55 s bastaram com SwiftShader, que é bem mais lento que a GPU real.
const BOOT_WAIT_MS = Number(process.env.QA_BOOT_WAIT_MS || 55_000);
// acima disso, o boot é considerado travado e isso vira erro, não screenshot em branco
const BOOT_TIMEOUT_MS = BOOT_WAIT_MS + 45_000;

const argv = process.argv.slice(2);
const arg = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : (argv[i + 1] ?? true);
};
const has = (name) => argv.includes(`--${name}`);

const only = arg('zone');
const at = String(arg('at', '')).split(',').map(Number);
const outDir = resolve(GAME, String(arg('out', 'qa-out')));
const base = String(arg('base', 'http://localhost:8123'));
const keep = has('keep');
const zones = only && only !== true ? [only] : ZONES;

const chromeBin = process.env.QA_CHROME || 'google-chrome';
const profile = `/tmp/qa-visual-profile-${process.pid}`;
const cdpPort = 9000 + (process.pid % 900);

// ── servidor: o QA precisa de HTTP porque fetch() de .glb é bloqueado em file://
function baseIsUp() {
  try {
    execSync(`curl -s -o /dev/null -m 3 -f "${base}/rpg_welling/"`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

let server = null;
if (!baseIsUp()) {
  console.error(`\n✗ ${base} não responde. Suba o servidor antes:\n    ./jogar.sh\n    (ou python3 -m http.server 8123 a partir da raiz do repo)\n`);
  process.exit(1);
}

function die(msg, code = 1) {
  console.error(`\n✗ ${msg}\n`);
  server?.kill();
  if (!keep) rmSync(profile, { recursive: true, force: true });
  process.exit(code);
}

// ── Chrome headless ─────────────────────────────────────────────────────────
const chrome = spawn(
  chromeBin,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu-sandbox',
    // SwiftShader: renderiza WebGL sem GPU. Devagar, mas roda em máquina sem
    // GPU e em container — o QA não pode depender de hardware da pessoa.
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
    '--mute-audio',
    '--no-first-run',
    '--disable-extensions',
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${cdpPort}`,
    '--window-size=1280,800',
    'about:blank',
  ],
  { stdio: 'ignore', detached: true },
);
chrome.unref();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdpTarget() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${cdpPort}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page;
    } catch { /* ainda subindo */ }
    await sleep(500);
  }
  die('Chrome não expôs a porta CDP a tempo');
}

class Session {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.logs = []; }

  static async open(wsUrl) {
    const ws = new WebSocket(wsUrl);
    const s = new Session(ws);
    ws.addEventListener('message', (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id && s.pending.has(m.id)) {
        const { resolve: res, reject } = s.pending.get(m.id);
        s.pending.delete(m.id);
        m.error ? reject(new Error(JSON.stringify(m.error))) : res(m.result);
        return;
      }
      if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) {
        s.logs.push(`[${m.params.type}] ` + m.params.args.map((a) => a.value ?? a.description ?? '?').join(' '));
      }
      if (m.method === 'Runtime.exceptionThrown') {
        s.logs.push('[exception] ' + (m.params.exceptionDetails?.text ?? '?'));
      }
    });
    await new Promise((res, rej) => {
      ws.addEventListener('open', res, { once: true });
      ws.addEventListener('error', () => rej(new Error('falha no WebSocket do CDP')), { once: true });
    });
    await s.send('Runtime.enable');
    await s.send('Page.enable');
    return s;
  }

  send(method, params = {}) {
    return new Promise((res, rej) => {
      const mid = ++this.id;
      this.pending.set(mid, { resolve: res, reject: rej });
      this.ws.send(JSON.stringify({ id: mid, method, params }));
    });
  }

  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) {
      // `text` sozinho devolve só "Uncaught" — a mensagem de verdade está em
      // exception.description (com o stack) ou em exception.value
      const d = r.exceptionDetails;
      const detail = d.exception?.description || d.exception?.value || d.text || 'erro desconhecido';
      return { error: String(detail).split('\n').slice(0, 3).join(' | ') };
    }
    return r.result.value;
  }

  async shot(file) {
    const { data } = await this.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(file, Buffer.from(data, 'base64'));
  }
}

// ── espera do boot ──────────────────────────────────────────────────────────
async function waitForBoot(s) {
  const deadline = Date.now() + BOOT_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const ready = await s.eval(
      'Boolean(window.__rpgWelling && window.__rpgWelling.debug && window.__rpgWelling.debug().zone)',
    );
    if (ready === true) return true;
    await sleep(2000);
  }
  return false;
}

// diagnóstico: o que a câmera está vendo de onde a jogadora está
const DIAG = `(() => {
  const R = window.__rpgWelling;
  const d = R.debug();
  return {
    zone: d.zone,
    player: R.position(),
    camera: d.cameraPos(),
    camFov: d.camFov(),
    fadedCount: d.fadedCount(),
    fadedNames: d.fadedNames(),
    camHit: d.camHit(),
    colliders: d.colliders,
    occluders: d.occluders,
  };
})()`;

// O que a câmera está vendo de onde a jogadora está. Interseção do segmento
// câmera→jogadora com a caixa envolvente de cada mesh: é o número que responde
// "por que estou vendo a personagem através da sebe?".
// Não usa THREE — o three.js é bundlado e não está no escopo global da página,
// então o teste é feito na caixa já computada pela própria cena.
const BETWEEN = `(() => {
 try {
  const R = window.__rpgWelling;
  const d = R.debug();
  // scene() mora DENTRO de debug(), não no topo do handle — R.scene é
  // undefined e a chamada estoura. (position/setPos/state/debug/interact/kids
  // são as únicas do topo.)
  const scene = d.scene();
  if (!scene) return null;
  const cam = d.cameraPos();
  const pl = R.position();
  if (!cam || !pl) return { error: 'câmera ou jogadora ainda sem posição' };

  // caixa do próprio jogador: não conta como oclusão
  const hits = [];
  scene.updateMatrixWorld(true);
  scene.traverse((o) => {
    if (!o.isMesh || !o.visible || !o.geometry) return;
    // InstancedMesh tem caixa própria (inclui as instâncias); Mesh usa a geometria
    let bb;
    if (o.isInstancedMesh) { o.computeBoundingBox(); bb = o.boundingBox; }
    else {
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      bb = o.geometry.boundingBox;
    }
    if (!bb) return;

    // AABB do mundo: os 8 cantos pela matriz do objeto, multiplicada à mão
    // (o three.js é bundlado, não há Vector3 disponível na página)
    const e = o.matrixWorld.elements; // column-major
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (let i = 0; i < 8; i++) {
      const x = (i & 1) ? bb.max.x : bb.min.x;
      const y = (i & 2) ? bb.max.y : bb.min.y;
      const z = (i & 4) ? bb.max.z : bb.min.z;
      const wx = e[0] * x + e[4] * y + e[8] * z + e[12];
      const wy = e[1] * x + e[5] * y + e[9] * z + e[13];
      const wz = e[2] * x + e[6] * y + e[10] * z + e[14];
      if (wx < minX) minX = wx; if (wx > maxX) maxX = wx;
      if (wy < minY) minY = wy; if (wy > maxY) maxY = wy;
      if (wz < minZ) minZ = wz; if (wz > maxZ) maxZ = wz;
    }
    if (![minX, minY, minZ, maxX, maxY, maxZ].every(Number.isFinite)) return;
    // slabe (segment vs AABB) no eixo da câmera→jogadora
    const lo = [Math.min(cam[0], pl[0]), Math.min(cam[1], 1.4), Math.min(cam[2], pl[1])];
    const hi = [Math.max(cam[0], pl[0]), Math.max(cam[1], 1.4), Math.max(cam[2], pl[1])];
    const mn = [minX, minY, minZ], mx = [maxX, maxY, maxZ];
    let overlap = true;
    for (let a = 0; a < 3; a++) {
      if (hi[a] < mn[a] || lo[a] > mx[a]) { overlap = false; break; }
    }
    if (overlap) {
      hits.push({
        name: o.name || o.type,
        instanced: Boolean(o.isInstancedMesh),
        count: o.isInstancedMesh ? o.count : 1,
        size: [maxX - minX, maxY - minY, maxZ - minZ].map((n) => +n.toFixed(1)),
        centerZ: +((minZ + maxZ) / 2).toFixed(1),
      });
    }
  });

  // o que está entre a câmera e a jogadora, do mais perto da câmera pro mais longe
  hits.sort((a, b) => Math.abs(a.centerZ - cam[2]) - Math.abs(b.centerZ - cam[2]));
  return { camera: cam, player: pl, betweenCount: hits.length, between: hits.slice(0, 12) };
 } catch (err) { return { error: String(err && err.message || err) }; }
})()`;

// Malhas TRANSLÚCIDAS que não vêm do fader de oclusão. É o diagnóstico do
// item 4.3 do roadmap — o "plano fantasma" que cobre um terço da tela na
// escola e reaparece em frente ao quadro-negro da sala de aula. Se a
// translucidez está no material de origem (opacity baixo, depthWrite off) e
// não em `userData.occlusionFade`, o fader é inocente: é material mal
// configurado, e o conserto é em world.js, não no fader.
const GHOSTS = `(() => {
 try {
  const R = window.__rpgWelling;
  const scene = R.debug().scene();
  if (!scene) return null;
  const out = [];
  const e0 = scene.matrixWorld.elements;
  scene.updateMatrixWorld(true);
  scene.traverse((o) => {
    if (!o.isMesh || !o.visible || !o.material) return;
    if (o.userData && o.userData.occlusionFade) return; // fantasma do fader: esperado
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      if (!m || !m.transparent) continue;
      if ((m.opacity ?? 1) >= 0.999) continue; // transparente e opaco = normal
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      const bb = o.geometry.boundingBox;
      const el = o.matrixWorld.elements;
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      for (let i = 0; i < 8; i++) {
        const x = (i & 1) ? bb.max.x : bb.min.x;
        const y = (i & 2) ? bb.max.y : bb.min.y;
        const z = (i & 4) ? bb.max.z : bb.min.z;
        const wx = el[0] * x + el[4] * y + el[8] * z + el[12];
        const wy = el[1] * x + el[5] * y + el[9] * z + el[13];
        const wz = el[2] * x + el[6] * y + el[10] * z + el[14];
        if (wx < minX) minX = wx; if (wx > maxX) maxX = wx;
        if (wy < minY) minY = wy; if (wy > maxY) maxY = wy;
        if (wz < minZ) minZ = wz; if (wz > maxZ) maxZ = wz;
      }
      if (![minX, minY, minZ, maxX, maxY, maxZ].every(Number.isFinite)) continue;
      out.push({
        mesh: o.name || o.type,
        mat: m.name || m.type,
        opacity: +(m.opacity ?? 1).toFixed(3),
        depthWrite: m.depthWrite,
        blending: m.blending,
        hasMap: Boolean(m.map),
        instanced: Boolean(o.isInstancedMesh),
        size: [maxX - minX, maxY - minY, maxZ - minZ].map((n) => +n.toFixed(1)),
        center: [+((minX + maxX) / 2).toFixed(1), +((minY + maxY) / 2).toFixed(1), +((minZ + maxZ) / 2).toFixed(1)],
        // área projetada: plano grande e fino é exatamente o "fantasma de tela"
        footprint: +((maxX - minX) * (maxY - minY)).toFixed(0),
      });
      break; // uma entrada por material já basta para o diagnóstico
    }
  });
  out.sort((a, b) => b.footprint - a.footprint);
  return { count: out.length, biggest: out.slice(0, 10) };
 } catch (err) { return { error: String(err && err.message || err) }; }
})()`;

// Quais malhas cobrem a parte de cima e a de baixo do quadro. É o
// diagnóstico do 4.2 (faixa preta no topo da escola, vazio pálido embaixo) e
// da sala de aula (fundo escuro nos 25% de baixo): o `between` não acha nada
// disso, porque essas faixas estão ACIMA e ABAIXO do segmento câmera→menina.
//
// A projeção usa um Vector3 emprestado de algum objeto da cena e os métodos
// reais do three (applyMatrix4/project), então continua sem depender de THREE
// estar no escopo global. NDC vai de -1 (baixo/esquerda) a +1 (topo/direita).
const SCREEN = `(() => {
 try {
  const R = window.__rpgWelling;
  const scene = R.debug().scene();
  if (!scene) return null;
  // a câmera não é filha da cena no three.js; o handle de QA a expõe
  const cam = R.debug().camera();
  if (!cam) return { error: 'handle de QA sem camera()' };
  cam.updateMatrixWorld(true);
  const probe = cam.position.clone(); // Vector3 de verdade, emprestado
  scene.updateMatrixWorld(true);

  const top = [], bottom = [];
  scene.traverse((o) => {
    if (!o.isMesh || !o.visible) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    const bb = o.geometry.boundingBox;
    if (!bb) return;
    let minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity, behind = 0;
    for (let i = 0; i < 8; i++) {
      probe.set((i & 1) ? bb.max.x : bb.min.x, (i & 2) ? bb.max.y : bb.min.y, (i & 4) ? bb.max.z : bb.min.z)
        .applyMatrix4(o.matrixWorld).project(cam);
      // w <= 0 significa ponto ATRÁS do plano near: não projeta, ignora
      if (!Number.isFinite(probe.x) || !Number.isFinite(probe.y)) { behind = 1; break; }
      if (probe.y < minY) minY = probe.y;
      if (probe.y > maxY) maxY = probe.y;
      if (probe.x < minX) minX = probe.x;
      if (probe.x > maxX) maxX = probe.x;
    }
    if (behind) return;
    if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
    const rad = o.geometry.boundingSphere?.radius ?? 0;
    const mat0 = Array.isArray(o.material) ? o.material[0] : o.material;
    const rec = {
      mesh: o.name || o.type,
      geo: o.geometry.type,
      mat: mat0?.name || mat0?.type || '?',
      color: '#' + (mat0?.color?.getHexString?.() ?? '??'),
      opacity: mat0?.opacity ?? 1,
      transparent: Boolean(mat0?.transparent),
      radius: +rad.toFixed(1),
      // tamanho aparente: o que o fader chama de "grande demais" (céu/foto de
      // fundo) e o que é estrutura de verdade
      fundo: rad > 30,
      ndcX: [+minX.toFixed(2), +maxX.toFixed(2)],
      ndcY: [+minY.toFixed(2), +maxY.toFixed(2)],
    };
    // cobre a faixa de cima do quadro (ndcY > 0.75) ou a de baixo (< -0.6)
    if (maxY > 0.75 && minX < 0.9 && maxX > -0.9) top.push(rec);
    if (minY < -0.6 && minX < 0.9 && maxX > -0.9) bottom.push(rec);
  });
  // fundo (céu, foto panorâmica) vem primeiro: são eles que enchem a faixa
  top.sort((a, b) => (b.fundo - a.fundo) || (b.ndcY[1] - a.ndcY[1]));
  bottom.sort((a, b) => (b.fundo - a.fundo) || (a.ndcY[0] - b.ndcY[0]));
  return { topBand: top.slice(0, 10), bottomBand: bottom.slice(0, 10) };
 } catch (err) { return { error: String(err && err.message || err) }; }
})()`;

// "O que está NESTE pixel?" — raycast da câmera por um ponto em NDC e devolve
// a malha mais próxima. O SCREEN diz quais malhas COBREM a faixa, mas não qual
// está NA FRENTE dela; foi o que deixou o 4.2 em aberto (a silhueta mudou de
// cor e a faixa preta continuou, ou seja, não era ela).
//
// O unproject é o método real do Vector3 do three, com um Vector3 emprestado de
// algum objeto da cena, então continua sem depender de THREE global. O teste de
// interseção é slabe contra a caixa envolvente no mundo — aproximado, mas
// suficiente para dizer QUAL malha é.
const PICK = `(() => {
 try {
  const R = window.__rpgWelling;
  const scene = R.debug().scene();
  const cam = R.debug().camera();
  if (!scene || !cam) return { error: 'sem cena ou câmera' };
  cam.updateMatrixWorld(true);
  scene.updateMatrixWorld(true);
  const probe = cam.position.clone();
  const camPos = { x: cam.position.x, y: cam.position.y, z: cam.position.z };

  // pontos em NDC: topo (0, 0.95), meio da faixa escura (0, 0.80), e embaixo
  const POINTS = [[0, 0.95], [0, 0.80], [-0.5, 0.88], [0.5, 0.88], [0, -0.85]];
  const boxes = [];
  scene.traverse((o) => {
    if (!o.isMesh || !o.visible) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    const bb = o.geometry.boundingBox;
    if (!bb) return;
    const el = o.matrixWorld.elements;
    let mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < 8; i++) {
      const x = (i & 1) ? bb.max.x : bb.min.x;
      const y = (i & 2) ? bb.max.y : bb.min.y;
      const z = (i & 4) ? bb.max.z : bb.min.z;
      const w = [
        el[0] * x + el[4] * y + el[8] * z + el[12],
        el[1] * x + el[5] * y + el[9] * z + el[13],
        el[2] * x + el[6] * y + el[10] * z + el[14],
      ];
      for (let a = 0; a < 3; a++) { if (w[a] < mn[a]) mn[a] = w[a]; if (w[a] > mx[a]) mx[a] = w[a]; }
    }
    if (![...mn, ...mx].every(Number.isFinite)) return;
    // A câmera fica DENTRO da cúpula do céu e de outros Involucros huge: eles
    // dariam t = 0 em toda mira e esconderiam o que está de fato na frente.
    // Malha que contém a câmera é cenário envolvente, não alvo.
    const camInside = camPos.x >= mn[0] && camPos.x <= mx[0]
      && camPos.y >= mn[1] && camPos.y <= mx[1]
      && camPos.z >= mn[2] && camPos.z <= mx[2];
    if (camInside) return;
    const m0 = Array.isArray(o.material) ? o.material[0] : o.material;
    boxes.push({ o, mn, mx, mat: m0 });
  });

  const out = {};
  for (const [px, py] of POINTS) {
    probe.set(px, py, 0.5).unproject(cam);
    const dx = probe.x - camPos.x, dy = probe.y - camPos.y, dz = probe.z - camPos.z;
    const len = Math.hypot(dx, dy, dz) || 1;
    const d = [dx / len, dy / len, dz / len];
    const org = camPos;
    let best = null;
    for (const { o, mn, mx, mat } of boxes) {
      let t0 = 0, t1 = Infinity, hitAxis = true;
      for (let a = 0; a < 3; a++) {
        if (Math.abs(d[a]) < 1e-9) {
          if (org[a] < mn[a] || org[a] > mx[a]) { hitAxis = false; break; }
          continue;
        }
        let ta = (mn[a] - org[a]) / d[a];
        let tb = (mx[a] - org[a]) / d[a];
        if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; }
        if (ta > t0) t0 = ta;
        if (tb < t1) t1 = tb;
        if (t0 > t1) { hitAxis = false; break; }
      }
      if (!hitAxis || t1 < 0) continue;
      const t = t0 > 0 ? t0 : 0;
      if (!best || t < best.t) {
        best = {
          t: +t.toFixed(1),
          mesh: o.name || o.type,
          geo: o.geometry.type,
          color: '#' + (mat?.color?.getHexString?.() ?? '??'),
          hasMap: Boolean(mat?.map),
          opacity: mat?.opacity ?? 1,
          transparent: Boolean(mat?.transparent),
          instanced: Boolean(o.isInstancedMesh),
        };
      }
    }
    out['ndc_' + px + '_' + py] = best || { nenhum: true };
  }
  return out;
 } catch (err) { return { error: String(err && err.message || err) }; }
})()`;

// ── main ────────────────────────────────────────────────────────────────────
mkdirSync(outDir, { recursive: true });
const target = await cdpTarget();
const s = await Session.open(target.webSocketDebuggerUrl);

const report = [];
let failures = 0;

for (const zone of zones) {
  const url = `${base}/rpg_welling/?zone=${zone}${at.length === 2 ? `&at=${at[0]},${at[1]}` : ''}`;
  s.logs.length = 0;

  await s.send('Page.navigate', { url });
  const booted = await waitForBoot(s);
  // folga depois do handle existir: a primeira cena ainda pode estar compilando shader
  await sleep(4000);

  if (at.length === 2) {
    const [, , dx, dz] = at;
    await s.eval(`window.__rpgWelling.setPos(${dx}, ${dz})`);
    // Pouco tempo de acomodação DE PROPÓSITO: a IA de missão retoma o
    // caminho e tira a personagem do lugar (com 3 s ela já tinha cruzado a
    // saída da zona). A câmera é lerpada, então dá para ler a posição real
    // depois — o diag abaixo denuncia se o teleport pegou.
    await sleep(Number(arg('settle', 1200)));
  }

  const file = join(outDir, `${zone}.png`);
  await s.shot(file);
  const diag = booted ? await s.eval(DIAG) : { error: 'boot não completou' };
  const between = booted ? await s.eval(BETWEEN) : null;
  const ghosts = booted ? await s.eval(GHOSTS) : null;
  const screen = booted ? await s.eval(SCREEN) : null;
  const pick = booted ? await s.eval(PICK) : null;

  const entry = { zone, booted, url, png: file, diag, between, ghosts, screen, pick, console: s.logs.slice(0, 10) };
  report.push(entry);
  if (!booted) failures += 1;
  process.stdout.write(`  ${booted ? '✓' : '✗'} ${zone.padEnd(11)} ${file}\n`);
}

// O relatório vai para um arquivo, não só para o stdout. Com as 5 zonas e os
// diagnósticos de tela o JSON passa de 60 KB, e canalizar tudo aquilo por pipe
// para um parser é frágil: basta o pipe truncar um pedaço e o `JSON.parse`
// estoura no consumidor, com a mensagem de erro apontando para o parser e não
// para o QA. Arquivo é a fonte; o stdout é só o resumo.
const reportFile = resolve(outDir, 'report.json');
writeFileSync(reportFile, JSON.stringify({ base, waitedMs: BOOT_WAIT_MS, report }, null, 2));
console.log('\n' + report.map((e) => `  ${e.booted ? '✓' : '✗'} ${String(e.diag?.zone || e.zone).padEnd(11)} faded=${String(e.diag?.fadedCount ?? '?').padEnd(3)} console=${e.console.length}`).join('\n'));
console.log(`\nrelatório completo: ${reportFile}`);

s.ws.close();
if (!keep) {
  try { process.kill(-chrome.pid); } catch { /* já morreu */ }
  rmSync(profile, { recursive: true, force: true });
} else {
  console.error(`\nChrome mantido vivo (--keep), profile em ${profile}, porta ${cdpPort}.`);
}

process.exit(failures ? 1 : 0);
