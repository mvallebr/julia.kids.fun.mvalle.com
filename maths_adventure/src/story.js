// História 1 — dados do jogo (spec §4/§5/§30).
// Adicionar a História 2 depois deve significar adicionar dados, não reescrever
// o engine. Cada mundo é uma sequência de nós:
//   walk      — caminhada guiada pelo caminho dourado (to = posição 0..1)
//   arrive    — muda o ponto de interesse da cena (label p/ explorar)
//   dialogue  — fala de personagem (speaker, lines)
//   explore   — parada livre com hotspots e coleccionáveis
//   encounter — desafio de matemática (template + widget)
//   friend    — descoberta de amigo
//   reward    — presente a abrir
//   finale    — cartão de mundo completo

export const WORLD_ORDER = [
  'forest', 'candy', 'clouds', 'crystals', 'golden',
  'ocean', 'lostcity', 'clockwork', 'winter', 'stars',
];

export const WORLDS = {
  forest: {
    id: 'forest',
    emoji: '🍄',
    title: { pt: 'Floresta Encantada', en: 'Enchanted Forest' },
    tier: 1,
    asset: 'bg-forest',
    collectible: { id: 'mushroom', emoji: '🍄', name: { pt: 'cogumelos da lua', en: 'moon mushrooms' } },
    palette: { deep: '#0d2b1e', glow: '#ffd166' },
    templates: ['counting', 'addWithin', 'subWithin', 'missingAddend', 'compareGroups'],
  },
  candy: {
    id: 'candy',
    emoji: '🍭',
    title: { pt: 'Terra dos Doces', en: 'Candy Land' },
    tier: 2,
    asset: 'bg-candy',
    collectible: { id: 'lollipop', emoji: '🍭', name: { pt: 'pirulitos brilhantes', en: 'shiny lollipops' } },
    palette: { deep: '#3d1030', glow: '#ff9fbd' },
    templates: ['addWithin', 'subWithin', 'missingAddend', 'completeSequence', 'compareGroups'],
  },
  clouds: {
    id: 'clouds',
    emoji: '☁️',
    title: { pt: 'Reino das Nuvens', en: 'Cloud Kingdom' },
    tier: 3,
    asset: 'bg-clouds',
    collectible: { id: 'cloudball', emoji: '🎐', name: { pt: 'flocos de nuvem', en: 'cloud puffs' } },
    palette: { deep: '#1c2f5e', glow: '#bfe0ff' },
    templates: ['mulFacts', 'addWithin', 'selectEquivalent', 'completeSequence', 'subWithin'],
  },
  crystals: {
    id: 'crystals',
    emoji: '💎',
    title: { pt: 'Cavernas de Cristal', en: 'Crystal Caves' },
    tier: 4,
    asset: 'bg-crystals',
    collectible: { id: 'crystal', emoji: '💎', name: { pt: 'cristais cantantes', en: 'singing crystals' } },
    palette: { deep: '#241041', glow: '#c7a6ff' },
    templates: ['mulFacts', 'selectEquivalent', 'missingAddend', 'completeSequence', 'divFacts'],
  },
  golden: {
    id: 'golden',
    emoji: '👑',
    title: { pt: 'Reino Dourado', en: 'Golden Kingdom' },
    tier: 5,
    asset: 'bg-golden',
    collectible: { id: 'suncoin', emoji: '🪙', name: { pt: 'moedas de sol', en: 'sun coins' } },
    palette: { deep: '#3a2400', glow: '#ffd166' },
    templates: ['divFacts', 'shareItems', 'mulFacts', 'selectEquivalent', 'mixedOps'],
  },
  ocean: {
    id: 'ocean',
    emoji: '🌊',
    title: { pt: 'Reino do Oceano', en: 'Ocean Kingdom' },
    tier: 6,
    asset: 'bg-ocean',
    collectible: { id: 'pearl', emoji: '🫧', name: { pt: 'pérolas cantoras', en: 'singing pearls' } },
    palette: { deep: '#062c44', glow: '#7fd8ff' },
    templates: ['mixedOps', 'divFacts', 'shareItems', 'mulFacts', 'priceTimesQuantity'],
  },
  lostcity: {
    id: 'lostcity',
    emoji: '🏛️',
    title: { pt: 'Cidade Perdida', en: 'Lost City' },
    tier: 7,
    asset: 'bg-lostcity',
    collectible: { id: 'token', emoji: '🔮', name: { pt: 'tokens antigos', en: 'ancient tokens' } },
    palette: { deep: '#2b2113', glow: '#ffcf70' },
    templates: ['priceTimesQuantity', 'totalCostMultiItem', 'calculateChange', 'mixedOps', 'divFacts'],
  },
  clockwork: {
    id: 'clockwork',
    emoji: '⚙️',
    title: { pt: 'Vila dos Engenhos', en: 'Clockwork Village' },
    tier: 8,
    asset: 'bg-clockwork',
    collectible: { id: 'gear', emoji: '⚙️', name: { pt: 'engrenagens douradas', en: 'golden gears' } },
    palette: { deep: '#26202b', glow: '#ffb36b' },
    templates: ['twoStepProblem', 'completeSequence', 'totalCostMultiItem', 'calculateChange', 'mixedOps'],
  },
  winter: {
    id: 'winter',
    emoji: '❄️',
    title: { pt: 'País da Neve', en: 'Winter Wonderland' },
    tier: 9,
    asset: 'bg-winter',
    collectible: { id: 'snowflake', emoji: '❄️', name: { pt: 'flocos de gelo', en: 'ice snowflakes' } },
    palette: { deep: '#173250', glow: '#cfe9ff' },
    templates: ['fractionOfQuantity', 'fractionEquivalence', 'shareItems', 'twoStepProblem', 'mixedOps'],
  },
  stars: {
    id: 'stars',
    emoji: '⭐',
    title: { pt: 'Reino das Estrelas', en: 'Star Kingdom' },
    tier: 10,
    asset: 'bg-stars',
    collectible: { id: 'star', emoji: '⭐', name: { pt: 'estrelinhas cadentes', en: 'falling stars' } },
    palette: { deep: '#0b0f3a', glow: '#ffe27a' },
    templates: ['bigAddSub', 'twoStepProblem', 'fractionEquivalence', 'mixedOps', 'completeSequence'],
  },
};

// ── Amigos (spec §15/§16): um por mundo; Maria é a primeira ──────────────────
export const FRIENDS = {
  maria: {
    id: 'maria',
    emoji: '🐬',
    name: { pt: 'Maria', en: 'Maria' },
    world: 'forest',
    asset: 'friend-maria',
    intro: {
      pt: 'Oi! Eu sou a Maria! Uma golfinha brilhante que voa pela floresta. Adoro cogumelos!',
      en: "Hi! I'm Maria! A sparkly dolphin who flies through the forest. I love mushrooms!",
    },
  },
  bumble: {
    id: 'bumble',
    emoji: '🐝',
    name: { pt: 'Zuninzinho', en: 'Bumble' },
    world: 'candy',
    asset: 'friend-bumble',
    intro: {
      pt: 'Bzzzz! Sou o Zuninzinho, a abelha açucarada! Faço mel que parece caramelo.',
      en: 'Bzzzz! I am Bumble, the sugar bee! I make honey that tastes like caramel.',
    },
  },
  zephyr: {
    id: 'zephyr',
    emoji: '🦅',
    name: { pt: 'Zéfiro', en: 'Zephyr' },
    world: 'clouds',
    asset: 'friend-zephyr',
    intro: {
      pt: 'Olá! Sou o Zéfiro, o ventinho curioso do Reino das Nuvens!',
      en: 'Hello! I am Zephyr, the curious breeze of the Cloud Kingdom!',
    },
  },
  glim: {
    id: 'glim',
    emoji: '🦇',
    name: { pt: 'Lumizinha', en: 'Glim' },
    world: 'crystals',
    asset: 'friend-glim',
    intro: {
      pt: 'Eek! Sou a Lumizinha, a borboleta de cristal que ilumina as cavernas!',
      en: 'Eek! I am Glim, the crystal butterfly who lights up the caves!',
    },
  },
  sunny: {
    id: 'sunny',
    emoji: '🦁',
    name: { pt: 'Solann', en: 'Sunny' },
    world: 'golden',
    asset: 'friend-sunny',
    intro: {
      pt: 'Saudações! Sou Solann, o leãozinho dourado, guardião das moedas de sol!',
      en: 'Greetings! I am Sunny, the golden lion cub, keeper of the sun coins!',
    },
  },
  bubble: {
    id: 'bubble',
    emoji: '🐢',
    name: { pt: 'Bolhinha', en: 'Bubble' },
    world: 'ocean',
    asset: 'friend-bubble',
    intro: {
      pt: 'Glub glub! Sou a Bolhinha, a tartaruga que canta com as pérolas!',
      en: 'Glub glub! I am Bubble, the turtle who sings with the pearls!',
    },
  },
  kaya: {
    id: 'kaya',
    emoji: '🦊',
    name: { pt: 'Kaya', en: 'Kaya' },
    world: 'lostcity',
    asset: 'friend-kaya',
    intro: {
      pt: 'Psst! Sou a Kaya, a raposa aventureira que guarda os segredos da cidade perdida!',
      en: 'Psst! I am Kaya, the explorer fox who keeps the Lost City secrets!',
    },
  },
  cog: {
    id: 'cog',
    emoji: '🦔',
    name: { pt: 'Parafuso', en: 'Cog' },
    world: 'clockwork',
    asset: 'friend-cog',
    intro: {
      pt: 'Cliques e claques! Sou o Parafuso, o ouriço inventor da Vila dos Engenhos!',
      en: 'Click clack! I am Cog, the inventor hedgehog of Clockwork Village!',
    },
  },
  flurry: {
    id: 'flurry',
    emoji: '🐧',
    name: { pt: 'Flocão', en: 'Flurry' },
    world: 'winter',
    asset: 'friend-flurry',
    intro: {
      pt: 'Brrr! Olá! Sou o Flocão, o pinguim que desenha flocos de neve!',
      en: 'Brrr! Hi! I am Flurry, the penguin who draws snowflakes!',
    },
  },
  twinkle: {
    id: 'twinkle',
    emoji: '🦄',
    name: { pt: 'Cintila', en: 'Twinkle' },
    world: 'stars',
    asset: 'friend-twinkle',
    intro: {
      pt: 'Oi, aventureiro! Sou a Cintila, a unicórnio feita de poeira de estrelas!',
      en: 'Hi, adventurer! I am Twinkle, a unicorn made of stardust!',
    },
  },
};

export const FRIENDS_BY_WORLD = Object.fromEntries(Object.values(FRIENDS).map((friend) => [friend.world, friend]));

// ── Contexto de desafios por mundo (itens/moedas diegéticos, spec §10/§18) ───
const ITEM = (emoji, pt, en) => ({ emoji, pt, en });
const CURRENCY = (emoji, pt, en) => ({ emoji, pt, en });

export const WORLD_CONTEXT = {
  forest: {
    item: ITEM('🍄', 'cogumelos', 'mushrooms'),
    currency: CURRENCY('🍃', 'folhas', 'leaves'),
  },
  candy: {
    item: ITEM('🍬', 'balas', 'candies'),
    currency: CURRENCY('🪙', 'docinhos', 'sweet coins'),
  },
  clouds: {
    item: ITEM('🎐', 'sinos de vento', 'wind chimes'),
    currency: CURRENCY('☁️', 'flocos de nuvem', 'cloud puffs'),
  },
  crystals: {
    item: ITEM('💎', 'cristais', 'crystals'),
    currency: CURRENCY('💠', 'lasquinhas', 'shards'),
  },
  golden: {
    item: ITEM('🍑', 'pêssegos dourados', 'golden peaches'),
    currency: CURRENCY('🪙', 'moedas de sol', 'sun coins'),
  },
  ocean: {
    item: ITEM('🐚', 'conchinhas', 'seashells'),
    currency: CURRENCY('🫧', 'bolhas', 'bubbles'),
  },
  lostcity: {
    item: ITEM('🏺', 'vasos antigos', 'ancient vases'),
    currency: CURRENCY('🔮', 'tokens', 'tokens'),
  },
  clockwork: {
    item: ITEM('⚙️', 'engrenagens', 'gears'),
    currency: CURRENCY('🔩', 'parafusos', 'bolts'),
  },
  winter: {
    item: ITEM('❄️', 'flocos', 'snowflakes'),
    currency: CURRENCY('🧊', 'cubinhos de gelo', 'ice cubes'),
  },
  stars: {
    item: ITEM('⭐', 'estrelinhas', 'little stars'),
    currency: CURRENCY('🌟', 'poeiras de estrela', 'stardust'),
  },
};

// ── Sequência de nós de cada mundo ───────────────────────────────────────────
// 10 encontros por mundo (spec §5), alternando formatos (spec §10/§22).

// Fala de chegada por mundo (gênero gramatical correto em pt).
export const WORLD_ARRIVE = {
  forest: { pt: '🍄 Você chegou à Floresta Encantada! O caminho dourado brilha à frente.', en: '🍄 You arrived at the Enchanted Forest! The golden path glows ahead.' },
  candy: { pt: '🍭 Você chegou à Terra dos Doces! Tudo aqui é comestível e cintilante.', en: '🍭 You arrived at Candy Land! Everything here is sparkly and delicious.' },
  clouds: { pt: '☁️ Você chegou ao Reino das Nuvens! Olhe só esses castelos no céu!', en: '☁️ You arrived at the Cloud Kingdom! Look at those castles in the sky!' },
  crystals: { pt: '💎 Você chegou às Cavernas de Cristal! Elas cantam quando alguém chega perto.', en: '💎 You arrived at the Crystal Caves! They sing when someone comes near.' },
  golden: { pt: '👑 Você chegou ao Reino Dourado! Tudo aqui brilha como o sol.', en: '👑 You arrived at the Golden Kingdom! Everything shines like the sun.' },
  ocean: { pt: '🌊 Você chegou ao Reino do Oceano! Respire fundo e glub glub!', en: '🌊 You arrived at the Ocean Kingdom! Take a deep breath and glub glub!' },
  lostcity: { pt: '🏛️ Você chegou à Cidade Perdida! Segredos antigos dormem por aqui.', en: '🏛️ You arrived at the Lost City! Ancient secrets sleep around here.' },
  clockwork: { pt: '⚙️ Você chegou à Vila dos Engenhos! Que barulhinho gostoso de engrenagens.', en: '⚙️ You arrived at Clockwork Village! What a cozy clatter of gears.' },
  winter: { pt: '❄️ Você chegou ao País da Neve! Que friozinho gostoso!', en: '❄️ You arrived at the Winter Wonderland! What a cozy chill!' },
  stars: { pt: '⭐ Você chegou ao Reino das Estrelas! Quase lá — o palácio já dá pra ver!', en: '⭐ You arrived at the Star Kingdom! Almost there — the palace is in sight!' },
};

function worldNodes(worldId) {
  const friend = FRIENDS_BY_WORLD[worldId];
  const nodes = [];
  // Chegada: caminhada curta + fala de boas-vindas do mundo.
  nodes.push({ type: 'walk', to: 0.12 }, { type: 'arrive', place: 'gate' });
  nodes.push({
    type: 'dialogue',
    speaker: 'narrator',
    lines: [WORLD_ARRIVE[worldId]],
  });

  // Amigo no início do mundo (Maria logo na primeira parada, spec §16/§32).
  nodes.push({ type: 'walk', to: 0.28 }, { type: 'arrive', place: 'friend' });
  nodes.push({ type: 'friend', id: friend.id });
  nodes.push({
    type: 'dialogue',
    speaker: friend.id,
    lines: [friend.intro],
  });

  // Encontro 1: pedido de ajuda do amigo (multiplicação contextual ou contagem).
  nodes.push({
    type: 'encounter',
    id: `${worldId}-help-friend`,
    widget: 'numeric',
    template: worldId === 'forest' ? 'priceTimesQuantity' : 'priceTimesQuantity',
    fixed: worldId === 'forest'
      ? { price: 3, quantity: 5, item: WORLD_CONTEXT.forest.item, currency: WORLD_CONTEXT.forest.currency }
      : undefined,
  });
  nodes.push({
    type: 'dialogue',
    speaker: friend.id,
    lines: [{
      pt: 'Você conseguiu! Obrigada, obrigada! 🎉',
      en: 'You did it! Thank you, thank you! 🎉',
    }],
  });
  nodes.push({ type: 'reward', id: `${worldId}-present-1`, hint: 'friend' });

  // Parada de exploração livre (spec §9.2/§35).
  nodes.push({ type: 'explore', place: 'clearing', collectibles: 2, secrets: 2 });

  // Encontros 2–4 variados.
  nodes.push({ type: 'walk', to: 0.46 }, { type: 'arrive', place: 'crossing' });
  nodes.push({ type: 'encounter', id: `${worldId}-fork-1`, widget: 'pathChoice', template: WORLDS[worldId].templates[0] });
  nodes.push({ type: 'encounter', id: `${worldId}-door-1`, widget: 'numeric', template: WORLDS[worldId].templates[1] });
  nodes.push({ type: 'walk', to: 0.6 }, { type: 'arrive', place: 'shop' });
  nodes.push({ type: 'encounter', id: `${worldId}-shop-1`, widget: 'shop', template: 'priceTimesQuantity' });
  nodes.push({ type: 'encounter', id: `${worldId}-keys-1`, widget: 'keys', template: WORLDS[worldId].templates[3] });
  nodes.push({ type: 'reward', id: `${worldId}-present-2`, hint: 'path' });

  // Segunda exploração + quatro encontros variados (10 no total por mundo).
  nodes.push({ type: 'explore', place: 'grove', collectibles: 2, secrets: 1 });
  nodes.push({ type: 'walk', to: 0.7 }, { type: 'arrive', place: 'chest' });
  nodes.push({ type: 'encounter', id: `${worldId}-chest-1`, widget: 'numeric', template: WORLDS[worldId].templates[1] });
  nodes.push({ type: 'walk', to: 0.78 }, { type: 'arrive', place: 'bridge' });
  nodes.push({ type: 'encounter', id: `${worldId}-fork-2`, widget: 'pathChoice', template: WORLDS[worldId].templates[2] });
  nodes.push({ type: 'encounter', id: `${worldId}-bridge-1`, widget: 'choice', template: WORLDS[worldId].templates[4] });
  nodes.push({ type: 'encounter', id: `${worldId}-order-1`, widget: 'ordering', template: 'completeSequence' });
  nodes.push({ type: 'encounter', id: `${worldId}-match-1`, widget: 'matching', template: WORLDS[worldId].templates[0] });
  nodes.push({ type: 'reward', id: `${worldId}-present-3`, hint: 'path' });

  // Final do mundo: último trecho + festa de conclusão (spec §23).
  nodes.push({ type: 'walk', to: 0.95 }, { type: 'arrive', place: 'gate-exit' });
  nodes.push({
    type: 'dialogue',
    speaker: friend.id,
    lines: [{
      pt: 'Você resolveu todos os desafios! Vou te acompanhar até a comemoração!',
      en: 'You solved every challenge! I will come with you to the celebration!',
    }],
  });
  nodes.push({ type: 'finale' });
  return nodes;
}

export const WORLD_NODES = Object.fromEntries(WORLD_ORDER.map((worldId) => [worldId, worldNodes(worldId)]));

export function nodesFor(worldId) {
  return WORLD_NODES[worldId] || [];
}

// Total de encontros por mundo (usado na UI e nos testes).
export function encountersFor(worldId) {
  return nodesFor(worldId).filter((node) => node.type === 'encounter');
}

export const STORY_1 = {
  id: 'story-1',
  title: { pt: 'História 1 — O Caminho Dourado', en: 'Story 1 — The Golden Path' },
  finale: {
    asset: 'bg-palace',
    title: { pt: 'Palácio Dourado', en: 'Golden Palace' },
  },
};

// Próximo mundo na ordem (null se é o último → Golden Palace).
export function nextWorld(worldId) {
  const index = WORLD_ORDER.indexOf(worldId);
  if (index < 0 || index >= WORLD_ORDER.length - 1) return null;
  return WORLD_ORDER[index + 1];
}

// Descobertas de exploração (spec §9.2/§35): pequenas surpresas sem matemática.
export const EXPLORE_SECRETS = {
  forest: [
    { pt: 'Um vagalume pousou na sua mão! Ele pisca "obrigado" e voa embora.', en: 'A firefly landed on your hand! It blinks "thank you" and flies away.' },
    { pt: 'Uma porta minúscula no tronco da árvore… alguém bem pequeno mora aqui!', en: 'A tiny door on the tree trunk… someone very small lives here!' },
    { pt: 'As flores cantam quando o vento passa. Que floresta musical!', en: 'The flowers sing when the wind blows. What a musical forest!' },
  ],
  candy: [
    { pt: 'Você provou uma gota de chuva de caramelo. Docinha!', en: 'You tasted a caramel raindrop. Sweet!' },
    { pt: 'Um ursinho de gengibre acena de dentro da janela.', en: 'A little gingerbread bear waves from the window.' },
    { pt: 'Os pianos de bolo tocam uma música quando você passa.', en: 'The cake pianos play a tune as you walk by.' },
  ],
  clouds: [
    { pt: 'Você apertou uma nuvem. Ela fez "poof" e riu!', en: 'You squeezed a cloud. It went "poof" and laughed!' },
    { pt: 'Um balão de ar quente passa bem pertinho. Todos acenam!', en: 'A hot air balloon floats close by. Everyone waves!' },
    { pt: 'O arco-íris faz uma ponte só para você.', en: 'The rainbow makes a bridge just for you.' },
  ],
  crystals: [
    { pt: 'Você tocou um cristal e ele tocou uma notinha musical!', en: 'You touched a crystal and it played a musical note!' },
    { pt: 'Um morceguinho de cristal dorme enrolado como um donut.', en: 'A little crystal bat sleeps curled up like a donut.' },
    { pt: 'As paredes da caverna brilham como um céu de estrelas.', en: 'The cave walls sparkle like a starry sky.' },
  ],
  golden: [
    { pt: 'Uma moeda de sol gira no ar e cai na sua mão. Sorte dourada!', en: 'A sun coin spins in the air and lands in your hand. Golden luck!' },
    { pt: 'Os girassóis se viram para acompanhar seu caminho.', en: 'The sunflowers turn to follow your walk.' },
    { pt: 'Uma bandeira tremula dizendo "bem-vindo" em dourado!', en: 'A banner waves saying "welcome" in gold!' },
  ],
  ocean: [
    { pt: 'Um card de peixinhos forma um coração e nada em volta de você!', en: 'A school of fish forms a heart and swims around you!' },
    { pt: 'Você achou uma conchinha que sussurra segredos do mar.', en: 'You found a seashell that whispers sea secrets.' },
    { pt: 'Uma tartaruguinha dá carona por alguns metros. Glub!', en: 'A little turtle gives you a short ride. Glub!' },
  ],
  lostcity: [
    { pt: 'Uma runa antiga brilha quando você chega perto. Ela diz "ola"!', en: 'An ancient rune glows as you come near. It says "hello"!' },
    { pt: 'Um papagaio colorido repete a risada de você.', en: 'A colorful parrot copies your laugh.' },
    { pt: 'Você achou um mosaico antigo escondido na mata.', en: 'You found an ancient mosaic hidden in the jungle.' },
  ],
  clockwork: [
    { pt: 'Um robozinho de brinquedo dança uma valsa para você.', en: 'A little toy robot dances a waltz for you.' },
    { pt: 'A chaminé solta fumaça em forma de corações.', en: 'The chimney puffs smoke shaped like hearts.' },
    { pt: 'Você deu corda num passarinho mecânico. Ele canta!', en: 'You wound up a mechanical bird. It sings!' },
  ],
  winter: [
    { pt: 'Você pegou um floco de neve. Ele tem desenho de estrelinha!', en: 'You caught a snowflake. It has a tiny star pattern!' },
    { pt: 'Um boneco de neve acena com a cenoura. Snif, que fofo.', en: 'A snowman waves with his carrot. Aww, how cute.' },
    { pt: 'As luzes do norte dançam só para você.', en: 'The northern lights dance just for you.' },
  ],
  stars: [
    { pt: 'Você fez um pedido numa estrela cadente. Guardado num segredo!', en: 'You made a wish on a shooting star. Kept as a secret!' },
    { pt: 'Uma luazinha dorminhoca boceja e vira para o outro lado.', en: 'A sleepy little moon yawns and turns over.' },
    { pt: 'O chão de estrelas toca passinhos musicais onde você pisa.', en: 'The starry floor plays little notes where you step.' },
  ],
};
