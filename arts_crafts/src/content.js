// Conteúdo dos tutorials e a identidade do mundo criativo.
//
// As regiões são coordenadas normalizadas (0..1) sobre a imagem base. A arte de
// um tutorial é UMA imagem só (o objeto pronto); cada passo mostra essa mesma
// imagem com um véu de papel que tem um buraco na região daquele passo. É por
// isso que a mesma coruja aparece idêntica nos sete passos: são os mesmos pixels.
//
// A leitura do véu é invertida em relação a quem nunca viu a foto: quanto mais
// tarde o passo, menos véu. `veil: 'full'` deixa só o fantasma do contorno,
// `'active'` mostra o que está pronto e escurece o resto, `'none'` mostra tudo.

export const CATEGORIES = [
  'drawing-painting',
  'paper-card',
  'recycled',
  'clay-model-making',
  'textile-yarn',
  'spin-art',
  '2d-design',
  '3d-modelling',
  'creative-challenge',
];

export const DESTINATIONS = [
  'art-studio',
  'craft-workshop',
  'spin-art-lab',
  '2d-studio',
  '3d-studio',
  'creative-challenges',
];

export const SEASONS = ['spring', 'summer', 'autumn', 'winter'];

// "Rápido" é o filtro de crafts curtos da §8. Definição única, para o conteúdo
// e para a interface concordarem sem ninguém repetir o número.
export const QUICK_MINUTES = 15;

export const FEATURED_ID = 't01';

// Paleta de cada estação. Enquanto a arte do mapa não existe, o chão é pintado
// com estas cores — e quando a arte chegar, ela cobre o procedural sem que
// ninguém precise trocar a tela. A estação continua sendo visível e muda mesmo
// sem a foto: o botão não vira enfeite.
export const SEASON_PALETTE = {
  spring: { sky: '#dff1ff', horizon: '#eaf7e4', ground: '#a9d98a', path: '#f2e3c6', accent: '#f7b7cf' },
  summer: { sky: '#bfe6ff', horizon: '#e8f7d8', ground: '#8fd06a', path: '#f0dfb8', accent: '#ffd166' },
  autumn: { sky: '#fde4c4', horizon: '#f6e2c3', ground: '#d9a04a', path: '#e8cfa6', accent: '#e2703a' },
  winter: { sky: '#dbe8f5', horizon: '#f2f6fb', ground: '#e8eef5', path: '#dfe7f0', accent: '#a9c4e0' },
};

const owlBase = 'assets/tutorials/paint-a-cute-owl/base.webp';

export const TUTORIALS = [
  {
    id: 't01',
    slug: 'paint-a-cute-owl',
    titleKey: 't01.title',
    descriptionKey: 't01.description',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    baseImage: owlBase,
    printable: 'assets/tutorials/paint-a-cute-owl/owl-template.svg',
    // Medidas numa grade de 2% sobre a imagem, conferidas com sobreposição.
    //
    // As orelhas são assimétricas de propósito: a esquerda aponta para a
    // esquerda, a direita para a direita, como na arte.
    //
    // O corpo NÃO é uma elipse só. Uma elipse engoliria os olhos, e aí o passo
    // "faça os olhos" não acrescentaria nada à tela — a criança veria o mesmo
    // quadro duas vezes. Por isso o corpo são faixas que contornam o vão dos
    // olhos, mais as duas asas e os pés. A regra do tutorial é a mesma: cada
    // passo tem que acrescentar algo visível.
    regions: {
      ears: [
        { kind: 'polygon', points: [[0.404, 0.258], [0.502, 0.300], [0.396, 0.334], [0.472, 0.322]] },
        { kind: 'polygon', points: [[0.626, 0.258], [0.542, 0.300], [0.634, 0.334], [0.558, 0.322]] },
      ],
      body: [
        { kind: 'rect', x: 0.352, y: 0.263, w: 0.300, h: 0.066 },
        { kind: 'rect', x: 0.352, y: 0.329, w: 0.030, h: 0.398 },
        { kind: 'rect', x: 0.506, y: 0.329, w: 0.032, h: 0.398 },
        { kind: 'rect', x: 0.620, y: 0.329, w: 0.032, h: 0.398 },
        { kind: 'rect', x: 0.352, y: 0.479, w: 0.300, h: 0.248 },
        { kind: 'ellipse', cx: 0.310, cy: 0.535, rx: 0.075, ry: 0.112 },
        { kind: 'ellipse', cx: 0.700, cy: 0.545, rx: 0.075, ry: 0.112 },
        { kind: 'rect', x: 0.416, y: 0.698, w: 0.164, h: 0.078 },
      ],
      eyes: [
        { kind: 'ellipse', cx: 0.446, cy: 0.402, rx: 0.066, ry: 0.076 },
        { kind: 'ellipse', cx: 0.560, cy: 0.396, rx: 0.064, ry: 0.075 },
        { kind: 'polygon', points: [[0.476, 0.452], [0.522, 0.452], [0.499, 0.504]] },
      ],
    },
    // O que pulsa é o foco, uma forma só por região. A região pode ter muitas
    // formas para entalhar o véu certo; oito caixas piscando de uma vez parecem
    // defeito, e não convite a pintar.
    focus: {
      ears: { kind: 'rect', x: 0.392, y: 0.250, w: 0.246, h: 0.090 },
      body: { kind: 'rect', x: 0.345, y: 0.256, w: 0.318, h: 0.478 },
      eyes: { kind: 'rect', x: 0.376, y: 0.318, w: 0.256, h: 0.154 },
    },
    steps: [
      { id: 's1', instructionKey: 't01.s1', tipKey: 't01.s1.tip', region: null, veil: 'full', printable: true },
      { id: 's2', instructionKey: 't01.s2', tipKey: 't01.s2.tip', region: null, veil: 'full', swatches: ['material.paint', 'material.paint', 'material.paint'] },
      { id: 's3', instructionKey: 't01.s3', tipKey: 't01.s3.tip', region: 'ears', veil: 'active' },
      { id: 's4', instructionKey: 't01.s4', tipKey: 't01.s4.tip', region: 'body', veil: 'active' },
      { id: 's5', instructionKey: 't01.s5', tipKey: 't01.s5.tip', region: 'eyes', veil: 'active' },
      { id: 's6', instructionKey: 't01.s6', tipKey: 't01.s6.tip', region: 'body', veil: 'active', pattern: 'feathers' },
      { id: 's7', instructionKey: 't01.s7', tipKey: 't01.s7.tip', region: null, veil: 'none', signature: true },
    ],
  },
];

export function tutorialById(id) {
  return TUTORIALS.find((tutorial) => tutorial.id === id) || null;
}

export function tutorialBySlug(slug) {
  return TUTORIALS.find((tutorial) => tutorial.slug === slug) || null;
}

export function isQuick(tutorial) {
  return tutorial.estimatedMinutes <= QUICK_MINUTES;
}

// Caminho relativo ao index.html do app. Sem barra inicial: o mesmo bundle roda
// de file:// e de /arts_crafts/ sem reescrever nada.
export function assetUrl(relative) {
  return new URL(relative, document.baseURI).href;
}

// Validação de conteúdo usada pelos testes e por qualquer build futuro: todo
// passo aponta para uma região que existe, e todo tutorial tem imagem.
export function contentProblems() {
  const problems = [];
  for (const tutorial of TUTORIALS) {
    if (!tutorial.baseImage) problems.push(`${tutorial.id}: sem imagem base`);
    if (!tutorial.steps?.length) problems.push(`${tutorial.id}: sem passos`);
    for (const [index, step] of (tutorial.steps || []).entries()) {
      if (step.region && !tutorial.regions?.[step.region]) {
        problems.push(`${tutorial.id}.${step.id}: região "${step.region}" não existe`);
      }
      if (step.veil === 'active' && !step.region) {
        problems.push(`${tutorial.id}.${step.id}: véu ativo sem região`);
      }
      if (step.veil === 'active' && !tutorial.focus?.[step.region]) {
        problems.push(`${tutorial.id}.${step.id}: véu ativo sem foco`);
      }
      if (index > 0 && tutorial.steps[index - 1].veil === 'full' && step.veil === 'active' && !step.region) {
        problems.push(`${tutorial.id}.${step.id}: véu sem região`);
      }
    }
  }
  return problems;
}
