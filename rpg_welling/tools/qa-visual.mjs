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

  const entry = { zone, booted, url, png: file, diag, between, console: s.logs.slice(0, 10) };
  report.push(entry);
  if (!booted) failures += 1;
  process.stdout.write(`  ${booted ? '✓' : '✗'} ${zone.padEnd(11)} ${file}\n`);
}

console.log('\n' + JSON.stringify({ base, waitedMs: BOOT_WAIT_MS, report }, null, 2));

s.ws.close();
if (!keep) {
  try { process.kill(-chrome.pid); } catch { /* já morreu */ }
  rmSync(profile, { recursive: true, force: true });
} else {
  console.error(`\nChrome mantido vivo (--keep), profile em ${profile}, porta ${cdpPort}.`);
}

process.exit(failures ? 1 : 0);
