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

// Uma arte só para as quatro estações.
//
// Havia quatro imagens e elas eram QUATRO VILAS diferentes: 6/6/5/5 construções,
// quatro câmeras e quatro traçados de trilha. Com uma `DEST_LAYOUT` única e
// fixa por cima, o rótulo caía sobre prédios que mudavam de lugar e de
// identidade conforme a estação. Pedir ao gerador a mesma vila quatro vezes não
// resolve — é a lição nº 21 e nº 24 do docs/LESSONS.md: o modelo redesenha a
// cena, e o que não está no prompt não sobrevive.
//
// A estação deixou de ser arte e virou VESTUÁRIO: a mesma imagem, com
// tonalidade, véu e clima por cima. Agora a coerência é estrutural — as casas
// não podem se mover entre estações porque é o mesmo arquivo de pixels.
export const MAP_ART = 'assets/map/village.webp';

// Proporção da arte (1280x720). O `coverRect` usa estes dois números, então
// medir a arte em pixels e escrever em porcentagem é exato.
export const MAP_ART_SIZE = { w: 1280, h: 720 };

// Paleta de cada estação. A cor ainda pinta o chão procedural que fica ATRÁS
// da arte, e o `filter` veste a arte por cima.
export const SEASON_PALETTE = {
  spring: { sky: '#dff1ff', horizon: '#eaf7e4', ground: '#a9d98a', path: '#f2e3c6', accent: '#f7b7cf' },
  summer: { sky: '#bfe6ff', horizon: '#e8f7d8', ground: '#8fd06a', path: '#f0dfb8', accent: '#ffd166' },
  autumn: { sky: '#fde4c4', horizon: '#f6e2c3', ground: '#d9a04a', path: '#e8cfa6', accent: '#e2703a' },
  winter: { sky: '#dbe8f5', horizon: '#f2f6fb', ground: '#e8eef5', path: '#dfe7f0', accent: '#a9c4e0' },
};

// O vestuário. `filter` age na arte; `veil` é a cor que cobre tudo por cima;
// `weather` escolhe o fenômeno que cai; `snow` cobre os telhados.
//
// É aqui que a estação virou dado e não imagem: trocar de estação não pode
// mexer em um pixel de casa.
export const SEASON_DRESSING = {
  spring: { filter: 'saturate(1.06) brightness(1.02)', veil: 'rgba(255,214,235,.08)', weather: 'petals', snow: 0 },
  // O verão não tem partícula: eram dezoito bolas amarelas boiando no céu, e
  // nenhum desenho de criança levasse isso. O calor vem do verde e da luz.
  summer: { filter: 'saturate(1.2) contrast(1.05) brightness(1.06)', veil: 'rgba(255,206,92,.10)', weather: 'none', snow: 0 },
  // O outono lavava o céu de verde: o véu laranja sobre o ciano da arte dá
  // teal, e o hue-rotate do filtro girava o céu junto. Agora o filtro só
  // esquenta e o véu é âmbar claro — a cor da estação vem das copas.
  autumn: { filter: 'saturate(1.06) brightness(1.02)', veil: 'rgba(255,196,120,.07)', weather: 'leaves', snow: 0 },
  // O inverno lavava a vila inteira e o chão virava NEBLINA: um retângulo
  // branco chato por cima apaga o desenho do gramado e o resultado lê como
  // haze, não como neve. Agora o branco vem de uma RAMPA aplicada aos pixels
  // do chão, que preserva sombra e caminho, e o véu é quase nulo para não
  // embaçar. A cor da estação está no remapeamento, não numa película.
  winter: { filter: 'saturate(.85) brightness(1.03)', veil: 'rgba(219,233,247,.05)', weather: 'snow', snow: 1 },
};

// A rampa do CHÃO existe, mas o INVERNO não a usa.
//
// Duas tentativas, e as duas falharam do mesmo jeito: um retângulo branco por
// cima, e depois uma rampa até o branco. Nenhuma deu inverno. A ilha é vista
// de longe e flutua num mar ciano; com qualquer coisa clara em cima dela, deixa
// de ser chão e vira NUVEM — que foi exatamente o que a criança viu na primeira
// versão ("parece neblina", "era melhor verde"). Pior: a máscara do chão cobre
// as CASAS também, então elas viram parte da camada pálida e a vila fica
// fantasma.
//
// O inverno é feito com as três coisas que funcionam à distância: copa gelada,
// neve no telhado e neve caindo. O gramado fica verde — e uma criança reconhece
// um inverno muito melhor do que reconhece uma nuvem.
export const GROUND_RAMP = {
  spring: null,
  summer: null,
  autumn: null,
  winter: null,
};

// Onde cada construção ESTÁ na arte, medido por pixel na imagem, e onde o
// rótulo fica para não cobrir a casa que ele nomeia.
//
// Medido, não chutado (lição nº 12). `at` é a casa: o círculo de seleção cai
// nela. `label` é a caixa do nome, longe da casa e do vizinho. A linha entre
// as duas sai por `leaderPoints`, senão o rótulo parece flutuar solto.
export const DEST_LAYOUT = {
  'art-studio': { at: [465, 530], label: [255, 645] },
  'craft-workshop': { at: [505, 210], label: [300, 120] },
  'spin-art-lab': { at: [650, 420], label: [720, 615] },
  '2d-studio': { at: [870, 285], label: [1105, 190] },
  '3d-studio': { at: [735, 200], label: [640, 72] },
  'creative-challenges': { at: [385, 300], label: [195, 245] },
};

// Copas das árvores e telhados, medidos por pixel na arte.
//
// É aqui que mora a estação. Um filtro de tela inteira não muda estação: ele
// lava a vila inteira e a imagem continua sendo a mesma foto. O que muda de
// verdade é a COPA (floresta, folha, neve) e o TELHADO (neve), e são esses dois
// conjuntos que a arte de estação veste. A casa fica exatamente igual nas quatro
// — que é o que a criança precisa ver para reconhecer a mesma vila.
// Medidos por cor e por zoom, não a olho. O raio é o da COPA, não o da mancha:
// com o raio grande a copa transbordava no gramado e o inverno punha ali um
// disco branco — que é pior que a árvore meio repintada, porque branco não
// existe em lugar nenhum da cena.
export const MAP_CANOPIES = [
  [229, 408, 58], [976, 266, 68], [942, 369, 48], [313, 269, 34], [619, 220, 42],
];

// Só os telhados que têm dono: a cúpula de tesoura, o telhado de ardósia com o
// raio, o telhado terracota e o telhado de bolhas cor-de-rosa.
export const MAP_ROOFS = [
  [510, 240, 85, 78], [735, 190, 78, 56], [367, 312, 82, 48], [880, 277, 70, 52],
];

// A orla da ilha, lida ponto a ponto sobre a arte e conferida desenhando por
// cima. A elipse que existia antes manchava o mar, o céu e o lago; o
// preenchimento por inundação também não serve, porque no topo desta arte o
// CÉU tem o mesmo ciano do MAR — a cor não separa um do outro e a inundação
// vazava da ilha para o céu. Aqui a forma da ilha não é recuperável por cor:
// tem de ser medida.
export const MAP_GROUND = [
  [330, 268], [450, 250], [580, 246], [700, 250], [820, 262], [930, 282], [1015, 315],
  [1085, 390], [1110, 470], [1095, 545], [1050, 600], [960, 648], [830, 678], [660, 694],
  [500, 688], [370, 662], [280, 618], [212, 556], [172, 480], [166, 410], [200, 336], [262, 292],
];

// A cor que o chão vira em cada estação NÃO vem de uma lavagem: vem da rampa
// acima, que remapeia o pixel em vez de cobri-lo. O que havia antes — um
// retângulo branco a 40% — era neblina, e foi removido.

// Foliagem por estação. Uma rampa de DUAS CORES sobre o brilho da copa: a
// copa vira exatamente a cor da estação e continua tendo o desenho e o volume
// que tinha. `null` na primavera porque a arte JÁ É a primavera — as
// cerejeiras em flor são a estação da imagem, e repintá-las seria apagá-la.
export const FOLIAGE = {
  spring: null,
  summer: { r: '0.05 0.34 0.78', g: '0.16 0.60 0.92', b: '0.10 0.26 0.50' },
  autumn: { r: '0.30 0.82 0.99', g: '0.11 0.36 0.74', b: '0.05 0.11 0.32' },
  // Geada, não branco. Com a copa quase branca, qualquer excesso do círculo
  // aparecia como um disco branco no gramado — e branco puro não existe em
  // lugar nenhum da cena. A rampa cinza-azulada some no verde e ainda lê como
  // inverno.
  winter: { r: '0.56 0.74 0.90', g: '0.62 0.79 0.93', b: '0.70 0.86 0.97' },
};

// Neve no telhado. Zero nas três estações sem neve: o valor é uma opacidade,
// não um filtro, então zero não custa nada na tela.
export const ROOF_SNOW = { spring: 0, summer: 0, autumn: 0, winter: 0.68 };

// Onde a arte realmente aparece dentro da caixa do mapa.
//
// O `object-fit: cover` recorta, e quanto recorta depende da proporção da
// caixa — que muda entre celular e desktop. Medido: com a caixa em 16/10 e a
// arte em 16/9 o corte era de 50px de cada lado, e uma âncora no x=1280 caía
// em 105.6% da largura, ou seja fora da tela. Por isso a âncora vive numa
// camada do tamanho EXATO da arte: `left`/`top` negativos compensam o corte e
// a porcentagem dentro dela é a porcentagem da arte, sempre.
export function coverRect(boxWidth, boxHeight, artWidth = MAP_ART_SIZE.w, artHeight = MAP_ART_SIZE.h) {
  if (!(boxWidth > 0) || !(boxHeight > 0)) return { left: 0, top: 0, width: 0, height: 0 };
  const scale = Math.max(boxWidth / artWidth, boxHeight / artHeight);
  const width = artWidth * scale;
  const height = artHeight * scale;
  return { left: (boxWidth - width) / 2, top: (boxHeight - height) / 2, width, height };
}

// Mesmo problema com o TEXTO: a caixa de nome tem largura própria, que o
// navegador só conhece depois de medir. A linha nasce na BORDa da caixa, não
// no meio, para nunca sair por baixo do próprio rótulo.
export function leaderPoints(from, to) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy);
  // Alvo em cima do centro não tem direção. Uma linha de comprimento zero é o
  // resultado honesto; o que não pode é virar NaN e sumir em silêncio.
  if (!length) return { x1: from[0], y1: from[1], x2: to[0], y2: to[1] };
  const ux = dx / length;
  const uy = dy / length;
  const halfWidth = (from[2] || 0) / 2;
  const halfHeight = (from[3] || 0) / 2;
  // Distância até a borda: a menor das duas projeções, para sair pela lateral
  // mais próxima em vez de atravessar o rótulo.
  //
  // A divisão por componente que vale ZERO é infinito — que é o que o eixo
  // que não aponta para o alvo tem de contribuir. Escrever `x || Infinity`
  // aqui invertia isso: `0 || Infinity` dá Infinity, e dividir por ele dá 0,
  // e a linha nascia no centro do rótulo em vez da borda. O teste pegou.
  const acrossWidth = ux === 0 ? Infinity : halfWidth / Math.abs(ux);
  const acrossHeight = uy === 0 ? Infinity : halfHeight / Math.abs(uy);
  const edge = Math.min(acrossWidth, acrossHeight);
  return {
    x1: from[0] + ux * edge,
    y1: from[1] + uy * edge,
    x2: to[0],
    y2: to[1],
  };
}

// Clima: o mesmo número de partículas em toda estação, para o desenho não
// "pular" quando a criança troca de estação. A semente vem do índice — nada de
// `Math.random`, que mudaria a cada render e gastaria quadro à toa.
export const WEATHER_COUNT = 18;

export function weatherParticles(season, index) {
  const dressing = SEASON_DRESSING[season] || SEASON_DRESSING.spring;
  const kind = dressing.weather;
  // Números primos grandes em sequência: dispersos sem vazar para fora.
  const a = ((index * 2654435761) % 1000) / 1000;
  const b = ((index * 40503 + 7919) % 997) / 997;
  const c = ((index * 2246822519) % 1000) / 1000;
  const size = 2 + a * 4;
  // Os raios são pequenos de propósito: no espaço da arte um raio grande vira
  // um disco do tamanho de uma bola de neve de jardim, e a folha de outono
  // vira uma mancha laranja do tamanho de um telhado.
  if (kind === 'snow') return { cx: a * 100, cy: b * 100, r: size * 0.16, kind, drift: (c - 0.5) * 6 };
  if (kind === 'leaves') return { cx: a * 100, cy: b * 100, r: size * 0.22, kind, drift: (c - 0.5) * 10 };
  return { cx: a * 100, cy: b * 100, r: size * 0.2, kind: 'petals', drift: (c - 0.5) * 8 };
}

// Estação sem partícula nenhuma: o renderWeather não desenha nada e nem cria
// elemento. Existia um 'sun' aqui, e ele rendia dezoito bolas amarelas no céu.
export function hasWeather(season) {
  const dressing = SEASON_DRESSING[season] || SEASON_DRESSING.spring;
  return dressing.weather !== 'none';
}

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
