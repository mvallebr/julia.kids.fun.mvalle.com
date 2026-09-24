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
  quests: [
    {
      id: 'ch2q1Board',
      title: { pt: 'A Lousa da Lenda', en: 'The Legend on the Blackboard', es: 'La Leyenda en la Pizarra' },
      giver: 'willow',
      zone: 'classroom',
      offer: [
        { who: 'willow', text: {
          pt: 'A lousa acordou com palavras novas hoje! Meu giz dourado passou por aqui à noite — façam a lição e o primeiro fragmento é de vocês.',
          en: 'The blackboard woke up with new words today! My golden chalk passed by at night — do the lesson and the first fragment is yours.',
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
  ],

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
