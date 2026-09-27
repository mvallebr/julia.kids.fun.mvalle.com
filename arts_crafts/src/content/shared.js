// Contrato compartilhado do conteúdo.
//
// Separação deliberada entre ESTRUTURA e TEXTO. A estrutura de um passo (que
// véu, qual região aparece, se tem botão de imprimir) não muda com o idioma —
// e por isso mora fora de `copy`. O texto mora em `copy[idioma].steps`, um array
// PARALELO com o mesmo número de passos. Se o texto viesse junto com a
// estrutura, traduzir significaria decidir de novo o que já está decidido, e as
// três traduções desandariam juntas na primeira edição.
//
// As categorias e o mundo criativo ficam aqui porque são dados do produto, não
// de um tutorial. Um tutorial por arquivo em ./tutorials/.

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

export const LANGUAGES = ['pt', 'en', 'es'];

// Paleta de cada estação. Enquanto a arte do mapa não existe, o chão é pintado
// com estas cores — e quando a arte chegar, ela cobre o procedural sem que
// ninguém precise trocar a tela. A estação continua visível e muda mesmo sem a
// foto: o botão não vira enfeite.
export const SEASON_PALETTE = {
  spring: { sky: '#dff1ff', horizon: '#eaf7e4', ground: '#a9d98a', path: '#f2e3c6', accent: '#f7b7cf' },
  summer: { sky: '#bfe6ff', horizon: '#e8f7d8', ground: '#8fd06a', path: '#f0dfb8', accent: '#ffd166' },
  autumn: { sky: '#fde4c4', horizon: '#f6e2c3', ground: '#d9a04a', path: '#e8cfa6', accent: '#e2703a' },
  winter: { sky: '#dbe8f5', horizon: '#f2f6fb', ground: '#e8eef5', path: '#dfe7f0', accent: '#a9c4e0' },
};

// Disposição dos seis destinos na tela. Deliberadamente UMA para as quatro
// estações, e não medida na arte de cada uma.
//
// A tentativa foi medir: o gerador muda a disposição da vila a cada chamada (as
// duas variantes de verão puseram os prédios em lugares completamente
// diferentes) e a imagem de primavera não tem nem cúpula para o 3D Studio. Medir
// por imagem é refazer sem parar, e o rótulo que importa é o da interface, não
// o prédio.
//
// A arte é cenário, os botões são interface. Hexágono com o centro livre, que é
// onde a trilha da arte passa, e folga horizontal para dois rótulos não se
// tocarem num celular estreito.
export const DEST_LAYOUT = {
  '3d-studio': { x: 25, y: 25 },
  'art-studio': { x: 55, y: 18 },
  'spin-art-lab': { x: 82, y: 32 },
  'creative-challenges': { x: 84, y: 68 },
  '2d-studio': { x: 50, y: 85 },
  'craft-workshop': { x: 16, y: 70 },
};

// Caminhos da arte do mapa. A primeira é a que existe; se o arquivo faltar, a
// tela cai no chão pintado acima — por isso a lista nunca fica vazia.
export const SEASON_BACKDROP = {
  spring: 'assets/map/spring.webp',
  summer: 'assets/map/summer.webp',
  autumn: 'assets/map/autumn.webp',
  winter: 'assets/map/winter.webp',
};

export const HOME_ART = 'assets/home/home.webp';

// Regiões derivadas da caixa do objeto, medida por pixel na imagem gerada.
// Evita 36 conjuntos de coordenadas escritos à mão: mede-se a caixa uma vez e o
// resto sai daqui. A coruja não usa estas — tem regiões afinadas à mão.
export function derivedRegions(box) {
  if (!box) return {};
  const { x, y, w, h } = box;
  return {
    all: [{ kind: 'rect', x, y, w, h }],
    top: [{ kind: 'rect', x, y, w, h: h * 0.5 }],
    bottom: [{ kind: 'rect', x, y: y + h * 0.5, w, h: h * 0.5 }],
    left: [{ kind: 'rect', x, y, w: w * 0.5, h }],
    right: [{ kind: 'rect', x: x + w * 0.5, y, w: w * 0.5, h }],
    centre: [{ kind: 'rect', x: x + w * 0.2, y: y + h * 0.2, w: w * 0.6, h: h * 0.6 }],
  };
}

// O foco é o mesmo mapa de seis nomes que as regiões: um passo 'active' diz
// QUAL região está em jogo, e o foco devolve o retângulo que pulsa. Devolver um
// retângulo só quebrava a biblioteca inteira derivada — `focus['top']` vinha
// undefined, o teste acusava "região top sem foco" e o furo não era desenhado.
export function derivedFocus(box) {
  const regions = derivedRegions(box);
  const byName = {};
  for (const [name, shapes] of Object.entries(regions)) {
    byName[name] = shapes[0] || null;
  }
  return byName;
}

export function regionsOf(tutorial) {
  return tutorial.regions || derivedRegions(tutorial.objectBox);
}

export function focusOf(tutorial) {
  return tutorial.focus || derivedFocus(tutorial.objectBox);
}

// Caminho relativo ao index.html do app. Sem barra inicial: o mesmo bundle roda
// de file:// e de /arts_crafts/ sem reescrever nada.
export function assetUrl(relative) {
  return new URL(relative, document.baseURI).href;
}

export function tutorialById(tutorials, id) {
  return tutorials.find((tutorial) => tutorial.id === id) || null;
}

export function tutorialBySlug(tutorials, slug) {
  return tutorials.find((tutorial) => tutorial.slug === slug) || null;
}

export function isQuick(tutorial) {
  return tutorial.estimatedMinutes <= QUICK_MINUTES;
}

// Regras que valem para todo tutorial da biblioteca. Os testes rodam isto sobre
// a lista inteira, então um tutorial novo com texto faltando em um idioma quebra
// o build em vez de aparecer traduzido pela metade na tela da criança.
export function contentProblems(tutorials) {
  const problems = [];
  const seenIds = new Set();
  const seenSlugs = new Set();

  for (const tutorial of tutorials) {
    if (seenIds.has(tutorial.id)) problems.push(`${tutorial.id}: id repetido`);
    if (seenSlugs.has(tutorial.slug)) problems.push(`${tutorial.slug}: slug repetido`);
    seenIds.add(tutorial.id);
    seenSlugs.add(tutorial.slug);

    if (!tutorial.baseImage) problems.push(`${tutorial.id}: sem imagem base`);
    if (!CATEGORIES.includes(tutorial.category)) problems.push(`${tutorial.id}: categoria "${tutorial.category}" não existe`);
    if (![1, 2, 3].includes(tutorial.difficulty)) problems.push(`${tutorial.id}: dificuldade inválida`);
    if (!(tutorial.estimatedMinutes > 0)) problems.push(`${tutorial.id}: duração inválida`);
    if (!tutorial.materials?.length) problems.push(`${tutorial.id}: sem materiais`);
    if (tutorial.requiresPrinting && !tutorial.printable) problems.push(`${tutorial.id}: exige impressão mas não tem molde`);

    const regions = regionsOf(tutorial);
    const focus = focusOf(tutorial);
    const steps = tutorial.steps || [];
    if (steps.length < 2) problems.push(`${tutorial.id}: precisa de ao menos dois passos`);

    // O véu só pode clarear. Voltar a esconder depois de mostrar é a criança
    // ver o objeto sumir da tela, que é pior do que nunca ter mostrado.
    const VEIL_WEIGHT = { full: 2, active: 1, none: 0 };
    let previous = Infinity;

    for (const [index, step] of steps.entries()) {
      const where = `${tutorial.id}.s${index + 1}`;
      if (!['full', 'active', 'none'].includes(step.veil)) problems.push(`${where}: véu "${step.veil}" inválido`);
      if (VEIL_WEIGHT[step.veil] > previous) {
        problems.push(`${where}: o véu escureceu depois de clarear (${previous} → ${step.veil})`);
      }
      previous = Math.min(previous, VEIL_WEIGHT[step.veil]);
      if (step.veil === 'active') {
        if (!step.region) problems.push(`${where}: véu ativo sem região`);
        else if (!regions[step.region]) problems.push(`${where}: região "${step.region}" não existe`);
        else if (!focus?.[step.region]) problems.push(`${where}: região "${step.region}" sem foco`);
      }
      if (step.printable && !tutorial.printable) problems.push(`${where}: botão de impressão sem molde`);
      if (step.image && !tutorial.framePattern) problems.push(`${where}: imagem sem framePattern`);
      if (step.image && step.veil !== 'none') problems.push(`${where}: quadro próprio não pode ter véu`);
      if (!step.image && step.veil === 'active' && !step.region) problems.push(`${where}: véu ativo sem região`);
      if (index === 0 && !step.image && step.veil !== 'full' && step.veil !== 'active') {
        problems.push(`${where}: o primeiro passo mostra o objeto pronto antes de começar`);
      }
    }

    for (const language of LANGUAGES) {
      const copy = tutorial.copy?.[language];
      if (!copy) { problems.push(`${tutorial.id}: sem texto em ${language}`); continue; }
      if (!copy.title) problems.push(`${tutorial.id}: sem título em ${language}`);
      if (!copy.description) problems.push(`${tutorial.id}: sem descrição em ${language}`);
      if (copy.steps?.length !== steps.length) {
        problems.push(`${tutorial.id}: ${language} tem ${copy.steps?.length ?? 0} passos e a estrutura tem ${steps.length}`);
      }
      for (const [index, text] of (copy.steps || []).entries()) {
        if (!text?.instruction) problems.push(`${tutorial.id}: ${language} sem instrução no passo ${index + 1}`);
      }
    }
  }

  return problems;
}
