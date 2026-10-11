// Geometria e receita do Spin Art Lab.
//
// Este arquivo não toca no DOM de propósito: o que decide o desenho é a
// geometria, e geometria se testa sem navegador. A tela do jogo vive no
// spin-art.js e consome estas funções.
//
// O desenho é procedural e o que se guarda é a LISTA de traços, nunca a imagem.
// Cada traço é um "pingo" carimbado num quadro, num raio e num ângulo. Guardar a
// lista em vez do PNG vale porque o desenho é reprodutível: uma criação de dez
// segundos são ~600 pingos, e a lista disso é da ordem de 12 KB contra 300 KB
// de PNG. Cabe no localStorage sem IndexedDB, e a lista pode ser mandada para
// outra pessoa, que recria o desenho idêntico.
//
// O ângulo gravado é o DELTA entre um pingo e o anterior, nunca o tempo. É o
// que torna a receita independente da taxa de quadros: a mesma lista desenha o
// mesmo desenho numa tela de 30 Hz e numa de 144 Hz.

export const TAU = Math.PI * 2;

// O tamanho do pingo por cor. A folha é 1000x1000 e o raio útil vai até ~470.
export const SPIN_SIZE = 1000;

// O pingente fica no raio `base`; cada modo move o raio ou o ângulo dele.
// `follow` é o modo do dedo: o raio é a distância do ponteiro ao centro, e é o
// único em que a criança controla a mão direto — os outros o dispensam, e o
// desenho sai sozinho enquanto ela segura.
export const SPIN_MODES = ['follow', 'fixed', 'wobble', 'spiral', 'orbit', 'flicker', 'twin'];

export const SPIN_SYMMETRIES = [1, 2, 3, 4, 6, 8, 12];

// Onde o pingente está, para um modo, num instante do gesto.
//
// `phase` é o tempo em segundos desde que o dedo entrou no papel; é o que faz
// a espiral andar e a coroa ondular. `base` é o RAIO QUE O DEDO ESCOLHEU — e é
// sempre esse, em todos os modos.
//
// Isso já foi feito ao contrário, com um raio fixo e o dedo ignorado, para
// "proteger" a criança que encostasse perto do centro. O resultado foi o oposto
// do pretendido: o traço nascia a 10% do raio, ou seja no MEIO da folha, e a
// criança reclamou "estou clicando aqui e ele pinta lá". Agora o modo trabalha
// EM TORNO de onde o dedo encostou, e o modo é o que dá a variação.
export function dropFor(mode, phase, base, finger) {
  switch (mode) {
    case 'follow':
      return { r: finger, extra: 0 };
    case 'wobble':
      // Ondula em torno do dedo: nem some, nem some da borda.
      return { r: base * (0.78 + 0.22 * (0.5 + 0.5 * Math.sin(phase * 3.4))), extra: 0 };
    case 'spiral': {
      // Varre em torno do raio escolhido, do centro dele para fora. A volta
      // completa leva ~7 s, bem mais devagar que o giro do disco: com o raio
      // correndo junto com o giro o desenho vira uma roda de raios, e não uma
      // espiral.
      const travel = (phase * 0.14) % 1;
      return { r: base * (0.45 + 0.55 * travel), extra: 0 };
    }
    case 'orbit':
      return { r: base, extra: (phase * 150) % 360 };
    case 'flicker': {
      // Passeio aleatório determinístico pelo instante: um desenho novo a cada
      // quadro, mas SEM Math.random, senão a receita não reproduz.
      const seed = Math.sin(phase * 12.9898) * 43758.5453;
      const jitter = (seed - Math.floor(seed) - 0.5) * 0.2;
      return { r: base * (1 + jitter), extra: 0 };
    }
    case 'twin':
      // Dois raios de uma vez não cabem em um pingo só; o chamador pinta nos
      // dois. Aqui é o raio maior, e o menor é a segunda gota.
      return { r: base, extra: 0, twin: base * 0.62 };
    case 'fixed':
    default:
      return { r: base, extra: 0 };
  }
}

// Os ângulos das cópias de simetria. Com 6, um rabisco vira mandala de seis
// pontas; é o que transforma "desenhar" em "fazer uma coisa linda".
export function symmetryAngles(symmetry) {
  const n = Math.max(1, Math.round(symmetry));
  const out = [];
  for (let k = 0; k < n; k += 1) out.push((k / n) * 360);
  return out;
}

// --- a receita ------------------------------------------------------------

// Um registro é { dabs: [..], marks: [..] } com dabs em quádruplas
// [delta de ângulo, raio, cor, fluxo] e `extra` opcional em quíntuplas
// [delta, raio, cor, fluxo, ângulo extra]. Guardamos o extra só quando é
// diferente de zero, que é o caso de um modo só — assim a lista comum fica
// enxuta.
export function encodeRecord(record) {
  const dabs = [];
  for (const dab of record.dabs) {
    const base = [round(dab.da), round(dab.r), dab.c, round(dab.f)];
    if (dab.extra) base.push(round(dab.extra));
    dabs.push(base);
  }
  return JSON.stringify({ v: 1, m: record.marks, d: dabs });
}

export function decodeRecord(text) {
  if (typeof text !== 'string' || !text) return null;
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (!parsed || parsed.v !== 1 || !Array.isArray(parsed.d)) return null;
  const dabs = [];
  for (const entry of parsed.d) {
    if (!Array.isArray(entry) || entry.length < 4) return null;
    const dab = { da: Number(entry[0]), r: Number(entry[1]), c: Number(entry[2]), f: Number(entry[3]) };
    if (entry.length > 4) dab.extra = Number(entry[4]);
    if (![dab.da, dab.r, dab.c, dab.f].every(Number.isFinite)) return null;
    dabs.push(dab);
  }
  const marks = Array.isArray(parsed.m) ? parsed.m.filter((n) => Number.isInteger(n) && n >= 0) : [];
  return { dabs, marks };
}

// A receita volta a uma lista de pingos com ângulo ABSOLUTO, que é o que a
// tela desenha. É determinístico: mesmo registro, mesmo desenho, em qualquer
// máquina e qualquer taxa de quadros.
export function resolveDabs(record) {
  const out = [];
  let angle = 0;
  for (const dab of record.dabs) {
    angle += dab.da;
    out.push({ angle, r: dab.r, c: dab.c, f: dab.f, extra: dab.extra || 0 });
  }
  return out;
}

// Onde o pingo cai na folha, com a simetria aplicada. Coordenadas normalizadas
// para meia folha: x e y em -1..1, com o centro no zero.
export function dabPoints(angleDeg, rNorm, symmetry, extraDeg = 0) {
  const points = [];
  const a = (angleDeg + extraDeg) * Math.PI / 180;
  for (const offset of symmetryAngles(symmetry)) {
    const theta = a + offset * Math.PI / 180;
    points.push({ x: Math.cos(theta) * rNorm, y: Math.sin(theta) * rNorm });
  }
  return points;
}

// Quanto da folha o desenho cobre, em porcentagem da área útil. O desafio
// "cobre metade" lê isto, e é também o que impede um desenho de uma linha de
// contar como criação.
export function coverage(record, discRadius = 1) {
  let sum = 0;
  for (const dab of record.dabs) sum += dab.f * dab.f;
  return Math.min(1, (sum * Math.PI) / (Math.PI * discRadius * discRadius));
}

function round(value) {
  return Math.round(value * 100) / 100;
}
