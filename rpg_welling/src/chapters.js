// RPG Welling — Capítulo 2: "A Torre de Severndroog" (roadmap 1.3 + 1.1).
//
// Este módulo é DADO PURO de propósito: nada de DOM e nada de three. A
// história do capítulo 1 termina em showEnding() (main.js), que grava a flag
// `endingSeen`; o capítulo 2 entra aqui como tabela que um runner genérico em
// main.js consome — mesmo padrão de CONVERSATIONS/FLAVOR em content.js.
//
// Formato das falas: EXATAMENTE o que runConversation()/askChoice() em
// main.js já renderizam — fala = { who, text } com text trilíngue
// ({ pt, en, es }) e glosa = { gloss: '<palavra em inglês>' }. `who` é o id
// de NPCS (content.js: finch, page, baker, raven, willow) ou 'owl' (a coruja
// fiel, cujo rótulo vem de CHARACTERS em state.js). Assim o runner é só
// `runConversation(CHAPTER2.intro)` — nenhuma mudança no motor de diálogo.
//
// Esquema de missão por TABELA:
//   quest = {
//     id, title: {pt,en,es}, giver: '<npcId>', zone: '<zona principal>',
//     offer: [ linhas ] — faladas na 1ª visita ao giver com a quest pendente;
//                        jogá-las completa o 1º passo (type: 'talk').
//     steps: [ { id, type: 'talk'|'fetch'|'solve'|'play', zone,
//                npcId (talk) | target (demais), flag, hint: {pt,en,es} } ],
//     reward: { words: ['<palavra em inglês>'], challenge: '<id>' },
//   }
//   target para 'solve'/'play' é o id de interactable que JÁ EXISTE no mundo
//   (world.js/main.js) — nenhuma geometria nova é inventada aqui. A exceção
//   documentada é 'memoryLibrary' (ancoragem do minigame da biblioteca, que o
//   principal vai ligar; ver PEDIDO AO PRINCIPAL no relatório de integração).
//
// Flags: cada passo grava UMA flag em state.flags, então recomeçar no meio
// (ou refazer um passo) é idempotente — flag já true nunca quebra nada. Flags
// novas têm prefixo `ch2`. As únicas herdadas, canônicas de sistemas que já
// existem, são duelWon (main.js), memoryDone (games/memory.js) e
// dictation1/2/3 (games/dictation.js, DICTATION_FLAGS): o passo só OBSERVA a
// flag que o sistema dono grava.

export const CHAPTER2 = {
  id: 'chapter2',
  title: {
    pt: 'A Torre de Severndroog',
    en: 'The Severndroog Tower',
    es: 'La Torre de Severndroog',
  },
  // A oferta do capítulo só aparece depois do fim do capítulo 1 (portão da
  // mata atravessado), para quem está no meio do cap. 1 não receber spoiler.
  requiresFlag: 'endingSeen',
  // Gravada quando a jogadora ouve a lenda: a oferta não se repete a cada
  // visita da Prof. Willow, e é o interruptor que liga as quests na HUD.
  startFlag: 'ch2Started',

  // Lenda contada pela Prof. Willow na sala de aula (runner: runConversation
  // + gravar startFlag). Amarra o mundo real (a torre-folly de Oxleas) com as
  // pistas do cap. 1: o giz que escrevia sozinho (CLUES.chalkNote) e as
  // estrelas do Castelo de Açúcar (CLUES.benchPoster).
  intro: [
    { who: 'willow', text: {
      pt: 'Que bom que vocês voltaram! Já viram a torre no meio da mata, no alto da colina? É a Torre de Severndroog — uma casa de pedra antiga construída para parecer castelo.',
      en: 'How lovely that you are back! Have you seen the tower in the middle of the wood, on top of the hill? That is Severndroog Tower — an old stone house built to look like a castle.',
      es: '¡Qué gusto que volvieron! ¿Ya vieron la torre en medio del bosque, en lo alto de la colina? Es la Torre de Severndroog — una casa de piedra antigua construida para parecer castillo.',
    } },
    { gloss: 'tower' },
    { gloss: 'castle' },
    { who: 'willow', text: {
      pt: 'Ela guarda uma lenda: numa noite dourada, uma estrela caiu sobre Oxleas e se partiu em quatro fragmentos. Meu giz que escrevia sozinho sumiu nessa mesma noite…',
      en: 'It keeps a legend: on a golden night, a star fell over Oxleas and broke into four fragments. My chalk that wrote by itself vanished that very night…',
      es: 'Guarda una leyenda: en una noche dorada, una estrella cayó sobre Oxleas y se partió en cuatro fragmentos. Mi giz que escribía solo desapareció esa misma noche…',
    } },
    { gloss: 'legend' },
    { gloss: 'fragment' },
    { who: 'owl', text: {
      pt: 'Um fragmento por lugar! Se trouxermos os quatro de volta à torre, a estrela fica inteira e volta a brilhar!',
      en: 'One fragment per place! If we bring the four back to the tower, the star becomes whole and shines again!',
      es: '¡Un fragmento por lugar! Si traemos los cuatro de vuelta a la torre, ¡la estrella queda entera y vuelve a brillar!',
    } },
    { gloss: 'whole' },
  ],

  // Quatro missões, uma por desafio, uma por fragmento de estrela. A ordem do
  // array é só a sugerida; as quests são independentes e podem ser feitas em
  // qualquer ordem — o progresso vem das flags, nunca da sequência.
  // Recompensas roláveis (roadmap 1.1, o "rolável" de verdade).
  // O comentário longo fica em QUESTS, no fim do arquivo.
  get quests() {
    return QUESTS.map((quest) => ({
      ...quest,
      reward: { ...quest.reward, words: rollReward(quest.reward.challenge) },
    }));
  },

  // Fim do capítulo: com as 4 missões fechadas, voltar à torre dispara o
  // último ditado (dictation3 — a frase do "castelo" em games/dictation.js)
  // e, depois das linhas, o runner grava flag = ch2Done. O alvo 'severndroog'
  // já é interactable da zona woods (world.js) — nada novo no mundo.
  ending: {
    zone: 'woods',
    target: 'severndroog',
    flag: 'ch2Done',
    step: { id: 'ch2end1', type: 'play', zone: 'woods', target: 'severndroog', flag: 'dictation3',
      hint: { pt: 'Volte à torre de Severndroog e escreva a última frase.', en: 'Return to Severndroog Tower and write the last sentence.', es: 'Vuelve a la torre de Severndroog y escribe la última frase.' } },
    lines: [
      { who: 'owl', text: {
        pt: 'A última frase da torre! Os quatro fragmentos saem do diário e giram no ar…',
        en: 'The tower’s last sentence! The four fragments leap out of the journal and spin in the air…',
        es: '¡La última frase de la torre! Los cuatro fragmentos saltan del diario y giran en el aire…',
      } },
      { who: 'owl', text: {
        pt: 'A torre inteira acende como uma vela dourada — e a estrela volta ao topo, inteira e brilhando! 🌟',
        en: 'The whole tower lights up like a golden candle — and the star returns to the top, whole and shining! 🌟',
        es: '¡Toda la torre se enciende como una vela dorada — y la estrella vuelve a la punta, entera y brillando! 🌟',
      } },
      { gloss: 'star' },
      { who: 'willow', text: {
        pt: 'A estrela está inteira! E olhe: meu giz voltou — na lousa, ele escreveu sozinho: "Well done, explorers!"',
        en: 'The star is whole again! And look: my chalk is back — on the board it wrote by itself: "Well done, explorers!"',
        es: '¡La estrella está entera! Y mira: mi giz volvió — en la pizarra escribió solo: "Well done, explorers!"',
      } },
      { who: 'owl', text: {
        pt: 'Fim do capítulo dois! Mas na vitrine da bookshop chegou um livro novo: "The Candy Castle". As migalhas continuam…',
        en: 'End of chapter two! But a new book arrived in the bookshop window: "The Candy Castle". The crumbs continue…',
        es: '¡Fin del capítulo dos! Pero llegó un libro nuevo al escaparate de la librería: "The Candy Castle". Las migas continúan…',
      } },
    ],
  },
};

// ── helpers puros de progresso (o runner usa; os testes cobrem) ──────────────

// Todas as flags que o capítulo pode gravar/observar. O teste de consistência
// usa esta lista para provar unicidade e ausência de colisão com o cap. 1.
export function chapterFlags(chapter = CHAPTER2) {
  const flags = [chapter.startFlag];
  for (const quest of chapter.quests) {
    for (const step of quest.steps) flags.push(step.flag);
  }
  if (chapter.ending.step) flags.push(chapter.ending.step.flag);
  flags.push(chapter.ending.flag);
  return [...new Set(flags)];
}

// Missão completa quando TODAS as flags dos passos existem — nunca depende de
// ordem nem de estado em memória, só do save.
export function isQuestComplete(quest, flags = {}) {
  return quest.steps.every((step) => Boolean(flags[step.flag]));
}

export function questProgress(quest, flags = {}) {
  const done = quest.steps.filter((step) => Boolean(flags[step.flag])).length;
  return { done, total: quest.steps.length, complete: done === quest.steps.length };
}

// Próximo passo pendente (null = missão completa): alimenta a dica da coruja
// e a linha do diário sem que o runner conheça a tabela de coração.
export function nextStep(quest, flags = {}) {
  return quest.steps.find((step) => !flags[step.flag]) || null;
}

export function nextQuest(chapter = CHAPTER2, flags = {}) {
  return chapter.quests.find((quest) => !isQuestComplete(quest, flags)) || null;
}

// Resumo do capítulo: `fragments` = missões completas (uma por zona). O fim
// (`complete`) só fica true com a flag do ending gravada — fechar as 4
// missões deixa o capítulo EM `endingReady` (pronto para a torre), não feito.
export function chapterProgress(chapter = CHAPTER2, flags = {}) {
  const questsDone = chapter.quests.filter((quest) => isQuestComplete(quest, flags)).length;
  const allQuestsDone = questsDone === chapter.quests.length;
  return {
    questsDone,
    questsTotal: chapter.quests.length,
    fragments: questsDone,
    endingReady: allQuestsDone && !Boolean(flags[chapter.ending.flag]),
    complete: allQuestsDone && Boolean(flags[chapter.ending.flag]),
  };
}

// Lista para o runner genérico (capítulo 3+ usa o mesmo contrato).
export const CHAPTERS = [CHAPTER2];

export function chapterById(id) {
  return CHAPTERS.find((chapter) => chapter.id === id) || null;
}


// ── recompensas roláveis (roadmap 1.1) ───────────────────────────────────────
// A base do capítulo já era TABELA desde a rodada 2: os OBJETIVOS são fixos
// porque estão amarrados a conteúdo que existe no mundo — não dá para sortear
// "fale com a Sra. Page" num passo onde a Sra. Page não está.
//
// O que dá, e é o que importa para quem joga mais de uma vez, é a RECOMPENSA:
// cada fragmento de estrela premia 3 palavras, e antes eram sempre as mesmas
// 12. Refazer o capítulo entregava conteúdo idêntico.
//
// A escolha é por POOL temático, não sorteio sobre o glossário inteiro:
// misturar "dragon" com "socks" numa recompensa de biblioteca estraga o sentido
// do que a menina está aprendendo ali. As palavras originais de cada fragmento
// estão no seu pool, então se a semente der a lista antiga o jogo se comporta
// exatamente como antes.
//
// Determinístico de propósito: a semente mora no save, então a recompensa não
// muda entre recargas nem entre abas. Math.random() aqui daria palavra
// diferente a cada abertura do menu, e a menina ia achar que o jogo esqueceu
// o que premiou.
const REWARD_POOLS = Object.freeze({
  // Todo palavra aqui é validada contra GLOSSES pelo chapters.test.js — foi ele
  // que pegou a primeira versão, que tinha 'shelf', 'post', 'stamp', 'duel' e
  // companhia: palavras que eu supus existirem e não existiam. O vocabulário
  // disponível é o que é, e o pool se molda a ele.
  ch2Star1: Object.freeze(['star', 'castle', 'chapter', 'tower', 'ancient', 'peculiar', 'spell', 'wand', 'dragon', 'magic']),
  ch2Star2: Object.freeze(['quiet', 'borrow', 'story', 'letter', 'library', 'secret', 'book', 'read', 'bookmark', 'paper']),
  ch2Star3: Object.freeze(['letter', 'answer', 'bakery', 'bread', 'market', 'shop', 'bus', 'train', 'park', 'letter']),
  ch2Star4: Object.freeze(['spell', 'brave', 'magic', 'wizard', 'hero', 'warm', 'kind', 'grateful', 'excited', 'happy']),
});

let chapterSeed = 0;

// mulberry32: PRNG de 32 bits, 5 linhas em vez de uma dependência. Mesma
// semente, mesma sequência — que é o contrato inteiro aqui.
function seededRandom(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// hash estável de string para inteiro, para derivar uma semente por fragmento a
// partir da semente da partida. Sem isso os 4 fragmentos sairiam iguais.
function hashOf(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rollReward(challengeId, count = 3) {
  const pool = REWARD_POOLS[challengeId] || REWARD_POOLS_CH3[challengeId];
  if (!pool) return [];
  if (pool.length <= count) return pool.slice();
  const rand = seededRandom(hashOf(`${chapterSeed}:${challengeId}`));
  // Fisher-Yates parcial: embaralha e corta. Sort com rand() puro dá
  // embaralhamento torto, então nem chega a ser uniforme.
  const bag = pool.slice();
  for (let i = 0; i < count; i += 1) {
    const j = i + Math.floor(rand() * (bag.length - i));
    const tmp = bag[i]; bag[i] = bag[j]; bag[j] = tmp;
  }
  return bag.slice(0, count);
}

// Semente da partida. main.js chama uma vez no boot com o valor do save, ou
// sorteia um novo quando é a primeira vez.
export function setChapterSeed(seed) {
  chapterSeed = Number.isFinite(seed) ? seed >>> 0 : 0;
}

export function getChapterSeed() {
  return chapterSeed;
}

// Sorteia semente nova para "recomeçar o capítulo". Separado de propósito:
// quem chama está escolhendo refazer e precisa do valor de volta, não de um
// efeito colateral.
export function rollChapterSeed() {
  chapterSeed = (Math.floor(Math.random() * 0xffffffff)) >>> 0;
  return chapterSeed;
}

// A lista fixa de missões, com a RECOMPENSA original preservada. É a fonte;
// o getter de CHAPTER2.quests entrega a versão rolada.
const QUESTS = [
      {
        id: 'ch2q1Board',
        title: { pt: 'A Lousa da Lenda', en: 'The Legend on the Blackboard', es: 'La Leyenda en la Pizarra' },
        giver: 'willow',
        zone: 'classroom',
        offer: [
          { who: 'willow', text: {
            pt: 'A lousa acordou com palavras novas hoje! Meu giz dourado passou por aqui à noite. Ele faz isso quando eu tenho aula para preparar. Fazam a lição e o primeiro fragmento é de vocês.',
            en: 'The blackboard woke up with new words today! My golden chalk passed by at night. It does that when I have a lesson to prepare. Do the lesson and the first fragment is yours.',
            es: '¡La pizarra amaneció con palabras nuevas hoy! Mi giz dorado pasó por aquí en la noche — hagan la lección y el primer fragmento es de ustedes.',
          } },
          { gloss: 'practice' },
        ],
        steps: [
          { id: 'ch2q1s1', type: 'talk', zone: 'classroom', npcId: 'willow', flag: 'ch2Q1Legend',
            hint: { pt: 'Fale com a Prof. Willow na sala de aula.', en: 'Talk to Prof. Willow in the classroom.', es: 'Habla con la Prof. Willow en el salón de clases.' } },
          { id: 'ch2q1s2', type: 'solve', zone: 'classroom', target: 'blackboard', flag: 'ch2Q1Board',
            hint: { pt: 'Toque na lousa e complete a lição até o fim.', en: 'Tap the blackboard and finish the lesson.', es: 'Toca la pizarra y termina la lección.' } },
        ],
        // Palavras todas de GLOSSES (content.js); 'star' e 'castle' já são do
        // tema e 'chapter' celebra o capítulo. challenge vira entrada de
        // state.challenges via markChallenge (main.js) — 1 por fragmento.
        reward: { words: ['star', 'castle', 'chapter'], challenge: 'ch2Star1' },
      },
      {
        id: 'ch2q2Memory',
        title: { pt: 'O Segredo da Biblioteca', en: 'The Library Secret', es: 'El Secreto de la Biblioteca' },
        giver: 'page',
        zone: 'school',
        offer: [
          { who: 'page', text: {
            pt: 'Uma estrela? Que delícia! Este livro de historinhas tem páginas que brilham… um jogo da memória, meus queridos — as cartas lembram o céu daquela noite.',
            en: 'A star? How lovely! This storybook has pages that glow… a memory game, my dears — the cards remember the sky of that night.',
            es: '¿Una estrella? ¡Qué encanto! Este cuentito tiene páginas que brillan… un juego de memoria, queridos — las cartas recuerdan el cielo de aquella noche.',
          } },
          { gloss: 'story' },
        ],
        steps: [
          { id: 'ch2q2s1', type: 'talk', zone: 'school', npcId: 'page', flag: 'ch2Q2Page',
            hint: { pt: 'Fale com a Sra. Page na biblioteca da escola.', en: 'Talk to Ms Page in the school library.', es: 'Habla con la Sra. Page en la biblioteca de la escuela.' } },
          { id: 'ch2q2s2', type: 'play', zone: 'school', target: 'memoryLibrary', flag: 'memoryDone',
            hint: { pt: 'Jogue a Memória da Biblioteca e repita as sequências.', en: 'Play Library Memory and repeat the sequences.', es: 'Juega a la Memoria de la Biblioteca y repite las secuencias.' } },
        ],
        reward: { words: ['quiet', 'borrow', 'story'], challenge: 'ch2Star2' },
      },
      {
        id: 'ch2q3Letter',
        title: { pt: 'A Carta sem Endereço', en: 'The Letter with No Address', es: 'La Carta sin Dirección' },
        giver: 'baker',
        zone: 'highstreet',
        offer: [
          { who: 'baker', text: {
            pt: 'Fragmentos de estrela? Pois o correio recebeu uma carta sem endereço, com um selo dourado. Papel assim não se joga fora — leiam em inglês!',
            en: 'Star fragments? Well, the post box received a letter with no address and a golden stamp. Paper like that is never thrown away — read it in English!',
            es: '¿Fragmentos de estrella? Pues el buzón recibió una carta sin dirección y con sello dorado. ¡Papel así no se bota — léanlo en inglés!',
          } },
          { gloss: 'letter' },
        ],
        steps: [
          { id: 'ch2q3s1', type: 'talk', zone: 'highstreet', npcId: 'baker', flag: 'ch2Q3Baker',
            hint: { pt: 'Fale com o Sr. Crumb na padaria da High Street.', en: 'Talk to Mr Crumb at the High Street bakery.', es: 'Habla con el Sr. Crumb en la panadería de la High Street.' } },
          { id: 'ch2q3s2', type: 'play', zone: 'highstreet', target: 'postOffice', flag: 'dictation2',
            hint: { pt: 'Escreva em inglês a carta do selo dourado, no correio.', en: 'Write the golden-stamp letter in English at the post box.', es: 'Escribe en inglés la carta del sello dorado, en el buzón.' } },
        ],
        reward: { words: ['letter', 'answer', 'bakery'], challenge: 'ch2Star3' },
      },
      {
        id: 'ch2q4Duel',
        title: { pt: 'O Duelo da Estrela', en: 'The Star Duel', es: 'El Duelo de la Estrella' },
        giver: 'raven',
        zone: 'academy',
        offer: [
          { who: 'raven', text: {
            pt: 'A estrela caiu e vocês querem os fragmentos? Só bruxos de diário cheio! Vençam meu duelo de feitiços — e a mata contará o resto.',
            en: 'The star fell and you want its fragments? Only wizards with a full journal! Win my spell duel — and the woods will tell you the rest.',
            es: '¿La estrella cayó y quieren sus fragmentos? ¡Solo brujos de diario lleno! ¡Ganen mi duelo de hechizos — y el bosque les contará el resto!',
          } },
          { gloss: 'spell' },
        ],
        steps: [
          { id: 'ch2q4s1', type: 'talk', zone: 'academy', npcId: 'raven', flag: 'ch2Q4Raven',
            hint: { pt: 'Desafie a Prof. Raven na Academia Owlburt.', en: 'Challenge Prof. Raven at Owlburt Academy.', es: 'Desafía a la Prof. Raven en la Academia Owlburt.' } },
          { id: 'ch2q4s2', type: 'solve', zone: 'academy', target: 'duel', flag: 'duelWon',
            hint: { pt: 'Vença o duelo de feitiços: 3 palavras no diário, 2 acertos.', en: 'Win the spell duel: 3 words in the journal, 2 right answers.', es: 'Gana el duelo de hechizos: 3 palabras en el diario, 2 aciertos.' } },
          { id: 'ch2q4s3', type: 'play', zone: 'woods', target: 'greenChain', flag: 'dictation1',
            hint: { pt: 'Na placa do Green Chain, na mata, escreva a frase em inglês.', en: 'At the Green Chain sign in the woods, write the sentence in English.', es: 'En el cartel del Green Chain, en el bosque, escribe la frase en inglés.' } },
        ],
        reward: { words: ['spell', 'brave', 'magic'], challenge: 'ch2Star4' },
      },
];

// ── Capítulo 3: "O Jardim Secreto" (roadmap 1.3) ─────────────────────────────
// Mesmo esquema de tabela do capítulo 2, e de propósito: o runner em main.js é
// genérico desde a rodada 2, então um capítulo novo é DADO, não motor.
//
// A oferta sai da Prof. Willow depois de `ch2Done`: a estrela voltou ao topo da
// torre e desceu com o desenho de um jardim que ninguém sabia que existia
// atrás da escola. Quatro missões, uma por lugar, e o prêmio muda de forma —
// o capítulo 2 pagava fragmento de ESTRELA, este paga SEMENTE, porque o que a
// menina faz aqui é plantar coisa.
//
// Alvos: todos já são interactables que existem no mundo (world.js). Nenhuma
// geometria nova e nenhum minigame novo: `garden`, `teaRoom`, `outdoorGym` e
// `globe` já conversavam com a coruja, aqui viram objetivo. Flags com prefixo
// `ch3`; nenhuma herdada.
//
// Recompensa rolável como no capítulo 2 (roadmap 1.1), com pools de jardim.
const QUESTS_CH3 = [
  {
    id: 'ch3q1Greenhouse',
    title: { pt: 'A Porta da Horta', en: 'The Garden Door', es: 'La Puerta del Huerto' },
    giver: 'finch',
    zone: 'school',
    offer: [
      { who: 'finch', text: {
        pt: 'Eu cuido da horta há trinta anos e nunca vi essa porta. Se ha um jardim ai, alguem tem que plantar a primeira semente.',
        en: 'I have looked after the garden for thirty years and never seen that door. If there is a garden back there, somebody has to plant the first seed.',
        es: 'Llevo treinta anos cuidando el huerto y nunca vi esa puerta. Si hay un jardin ahi, alguien tiene que plantar la primera semilla.',
      } },
      { gloss: 'seed' },
    ],
    steps: [
      { id: 'ch3q1s1', type: 'talk', zone: 'school', npcId: 'finch', flag: 'ch3Q1Finch',
        hint: { pt: 'Fale com o Sr. Finch na escola.', en: 'Talk to Mr Finch at school.', es: 'Habla con el Sr. Finch en la escuela.' } },
      { id: 'ch3q1s2', type: 'play', zone: 'school', target: 'garden', flag: 'ch3Q1Garden',
        hint: { pt: 'Abra a porta da horta e plante a primeira semente.', en: 'Open the garden door and plant the first seed.', es: 'Abre la puerta del huerto y planta la primera semilla.' } },
    ],
    reward: { words: ['garden', 'greenhouse', 'seed', 'flower'], challenge: 'ch3Seed1' },
  },
  {
    id: 'ch3q2Rain',
    title: { pt: 'Chuva na Janela', en: 'Rain on the Window', es: 'Lluvia en la Ventana' },
    giver: 'baker',
    zone: 'highstreet',
    offer: [
      { who: 'baker', text: {
        pt: 'Choveu a noite toda e o meu cha ficou pronto sozinho. Dizem que quando chove assim, o jardim escondido aparece.',
        en: 'It rained all night and my tea got itself ready. They say that when it rains like that, the secret garden shows up.',
        es: 'Llovio toda la noche y mi te se preparo solo. Dicen que cuando llueve asi, aparece el jardin secreto.',
      } },
      { gloss: 'rain' },
    ],
    steps: [
      { id: 'ch3q2s1', type: 'talk', zone: 'highstreet', npcId: 'baker', flag: 'ch3Q2Baker',
        hint: { pt: 'Fale com o Sr. Crumb na padaria da High Street.', en: 'Talk to Mr Crumb at the High Street bakery.', es: 'Habla con el Sr. Crumb en la panaderia de High Street.' } },
      { id: 'ch3q2s2', type: 'solve', zone: 'highstreet', target: 'teaRoom', flag: 'ch3Q2Tea',
        hint: { pt: 'Prove o cha no tea room da High Street.', en: 'Taste the tea in the High Street tea room.', es: 'Prueba el te en el tea room de High Street.' } },
    ],
    reward: { words: ['rain', 'cloud', 'tea', 'pond'], challenge: 'ch3Seed2' },
  },
  {
    id: 'ch3q3Roots',
    title: { pt: 'As Raizes Antigas', en: 'The Old Roots', es: 'Las Raices Antiguas' },
    giver: 'page',
    zone: 'school',
    offer: [
      { who: 'page', text: {
        pt: 'Trouxe um livro da biblioteca sobre o jardim de uma escola de verdade. As raizes do carvalho batem bem mais fundo do que a gente pensa.',
        en: 'I brought a library book about a real school garden. The oak roots go much deeper than you would think.',
        es: 'Traje un libro de la biblioteca sobre el jardin de una escuela de verdad. Las raices del roble llegan mucho mas hondo de lo que uno cree.',
      } },
      { gloss: 'roots' },
    ],
    steps: [
      { id: 'ch3q3s1', type: 'talk', zone: 'school', npcId: 'page', flag: 'ch3Q3Page',
        hint: { pt: 'Fale com a Sra. Page na biblioteca.', en: 'Talk to Ms Page in the library.', es: 'Habla con la Sra. Page en la biblioteca.' } },
      { id: 'ch3q3s2', type: 'play', zone: 'woods', target: 'outdoorGym', flag: 'ch3Q3Gym',
        hint: { pt: 'Suba nas barras da academia ao ar livre, na mata.', en: 'Climb the bars at the outdoor gym in the woods.', es: 'Sube a los bars del gimnasio al aire libre, en el bosque.' } },
    ],
    reward: { words: ['roots', 'tree', 'leaf', 'climb'], challenge: 'ch3Seed3' },
  },
  {
    id: 'ch3q4Sun',
    title: { pt: 'O Sol sobre o Jardim', en: 'The Sun over the Garden', es: 'El Sol sobre el Jardin' },
    giver: 'willow',
    zone: 'classroom',
    offer: [
      { who: 'willow', text: {
        pt: 'O jardim so aparece para quem sabe para onde olhar. Vamos juntar tudo no globo da biblioteca e ver o sol passar.',
        en: 'The garden only shows itself to whoever knows where to look. Let us put it all together on the library globe and watch the sun go by.',
        es: 'El jardin solo se muestra a quien sabe donde mirar. Vamos a juntarlo todo en el globo de la biblioteca y ver pasar el sol.',
      } },
      { gloss: 'sun' },
    ],
    steps: [
      { id: 'ch3q4s1', type: 'talk', zone: 'classroom', npcId: 'willow', flag: 'ch3Q4Willow',
        hint: { pt: 'Fale com a Prof. Willow na sala de aula.', en: 'Talk to Prof. Willow in the classroom.', es: 'Habla con la Prof. Willow en el salon de clases.' } },
      { id: 'ch3q4s2', type: 'play', zone: 'school', target: 'globe', flag: 'ch3Q4Globe',
        hint: { pt: 'Gire o globo da biblioteca ate achar o jardim.', en: 'Turn the library globe until you find the garden.', es: 'Gira el globo de la biblioteca hasta encontrar el jardin.' } },
    ],
    reward: { words: ['sun', 'sunny', 'moon', 'star'], challenge: 'ch3Seed4' },
  },
];

// Pools do capítulo 3 (jardim). Mesma regra do capítulo 2: tudo tem que existir
// em GLOSSES, e o chapters.test.js confere palavra por palavra.
const REWARD_POOLS_CH3 = Object.freeze({
  ch3Seed1: Object.freeze(['garden', 'greenhouse', 'seed', 'flower', 'grass', 'sparkle', 'roots', 'leaf']),
  ch3Seed2: Object.freeze(['rain', 'cloud', 'cloudy', 'tea', 'duck', 'pond', 'stream', 'grass']),
  ch3Seed3: Object.freeze(['roots', 'tree', 'leaf', 'climb', 'hill', 'broom', 'green', 'grass']),
  ch3Seed4: Object.freeze(['sun', 'sunny', 'moon', 'star', 'golden', 'sparkle', 'light', 'bright']),
});

export const CHAPTER3 = {
  id: 'chapter3',
  title: {
    pt: 'O Jardim Secreto',
    en: 'The Secret Garden',
    es: 'El Jardin Secreto',
  },
  requiresFlag: 'ch2Done',
  startFlag: 'ch3Started',
  // o runner usa isto no texto do brinde, para nao repetir "fragmento de
  // estrela" num capítulo em que o prêmio é uma semente
  rewardNoun: { pt: 'semente', en: 'seed', es: 'semilla' },

  intro: [
    { who: 'willow', text: {
      pt: 'A estrela voltou ao alto da torre e desceu com o desenho de um jardim. Atrás da horta da escola, por uma porta que ninguem abria. Vamos la?',
      en: 'The star went back up the tower, and it came down carrying a drawing of a garden. Behind the school garden, through a door nobody ever opened. Shall we go?',
      es: 'La estrella volvio a lo alto de la torre y bajo con el dibujo de un jardin. Detras de la huerto de la escuela, por una puerta que nadie abria. Vamos?',
    } },
    { gloss: 'secret' },
    // Escolha de tom, nao de acerto. As duas respostas servem a historia: a
    // menina descobre o jardim do mesmo jeito, so que de um jeito ou do outro.
    // Quem joga escolhe COMO ela entra, e a coruja reage a escolha.
    { branch: {
      prompt: { pt: 'Antes de abrir a porta, o que você diz?',
        en: 'Before opening the door, what do you say?',
        es: 'Antes de abrir la puerta, ¿que dices?' },
      // NENHUM nome proprio nestas falas. `who: 'owl'` no rotulo e a coruja DA
      // jogadora (Pip na Ivy, Marlow no Oakley) — entao citar "Pip" numa fala
      // do Marlow saía como Pip, e o rotulo de opcao com "Pip" estaria errado
      // para quem joga de Oakley. A coruja fala de si mesma em terceira e nao
      // depende do personagem escolhido.
      options: [
        { id: 'brava', label: { pt: 'Vem, coruja!', en: 'Come on, little owl!', es: '¡Vamos, pajarita!' },
          then: [
            { who: 'owl', text: {
              pt: 'Eu disse sim, balancei as duas asas e caí da escada. Foi a coisa mais burra que eu já fiz. Eu vou portras, entao!',
              en: 'I said yes, flapped both wings and fell down the step. That is the silliest thing I have ever done. I will go after you, then!',
              es: 'Dije que si, aletee las dos alas y me caí del escalón. Es lo más tonto que he hecho. ¡Voy detrás, entonces!' } },
            { gloss: 'brave' },
          ] },
        { id: 'quieta', label: { pt: 'Devagar, corujinha.', en: 'Slowly, little owl.', es: 'Despacio, pajarita.' },
          then: [
            { who: 'owl', text: {
              pt: 'Devagar é mais esperto do que depressa, e isso é irritante porque eu sou a coruja. A porta range menos assim. Melhor.',
              en: 'Slowly is smarter than quickly, which is insulting because I am the owl. The door creaks less this way. Better.',
              es: 'Despacio es más listo que deprisa, y eso me molesta porque soy la lechuza. La puerta cruje menos así. Mejor.' } },
            { gloss: 'slow' },
          ] },
      ],
    } },
  ],

  get quests() {
    return QUESTS_CH3.map((quest) => ({
      ...quest,
      reward: { ...quest.reward, words: rollReward(quest.reward.challenge) },
    }));
  },

  // Fim do capitulo: com as 4 missoes fechadas, o jardim fica perto do lago da
  // mata — semente brota perto de agua, e e la que a menina planta de verdade.
  ending: {
    zone: 'woods',
    target: 'pond',
    flag: 'ch3Done',
    step: { id: 'ch3end1', type: 'play', zone: 'woods', target: 'pond', flag: 'ch3Planted',
      hint: { pt: 'Va ao lago da Oxleas Wood e plante as sementes na margem.', en: 'Go to the pond in Oxleas Wood and plant the seeds by the water.', es: 'Ve al estanque de Oxleas Wood y planta las semillas en la orilla.' } },
    lines: [
      { who: 'owl', text: {
        pt: 'Quatro sementes, quatro lugares e um jardim que nao estava no mapa. A Julia nao desenhou o jardim — e ela que o fez existir.',
        en: 'Four seeds, four places, and a garden that was not on the map. Julia did not draw the garden — she is the one who made it exist.',
        es: 'Cuatro semillas, cuatro lugares y un jardin que no estaba en el mapa. Julia no dibujo el jardin — ella es la que lo hizo existir.',
      } },
      { gloss: 'garden' },
      { who: 'willow', text: {
        pt: 'Volta la amanha. Semente e isso: a gente planta e a escolha e da planta.',
        en: 'Come back tomorrow. That is what a seed is: you plant it and the choosing is up to the seed.',
        es: 'Vuelve manana. Eso es una semilla: la plantas y elegir es de la semilla.',
      } },
    ],
  },
};
