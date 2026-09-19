// RPG Welling — conteúdo da história: NPCs, conversas, desafios embutidos e
// painéis de abertura (spec Parte A/B). Textos curtos, trilíngues, sempre
// educativos sem parecer prova (spec §42).

export const NPCS = {
  finch: { name: { pt: 'Sr. Finch', en: 'Mr Finch', es: 'Sr. Finch' }, emoji: '🧹', color: 0x7a5230 },
  page: { name: { pt: 'Sra. Page', en: 'Ms Page', es: 'Sra. Page' }, emoji: '📚', color: 0x8a4a6e },
};

// Painéis do livro de abertura (imagens de conceito do jogo).
export const STORY_PANELS = [
  {
    image: 'assets/panel-gate.jpg',
    text: {
      pt: 'Segundo dia de aula. Ivy e Oakley cruzam os portões da escola — e desta vez as corujas vêm junto!',
      en: 'Second day of school. Ivy and Oakley walk through the school gates — and this time the owls come too!',
      es: 'Segundo día de clase. ¡Ivy y Oakley cruzan las puertas de la escuela y esta vez los búhos vienen también!',
    },
  },
  {
    image: 'assets/panel-sign.jpg',
    text: {
      pt: 'De repente, Pip e Marlow se empoleiram e piaram: na placa de vidro, uma árvore dourada está brilhando.',
      en: 'Suddenly, Pip and Marlow perch and hoot: on the glass sign, a golden tree is glowing.',
      es: 'De repente, Pip y Marlow se posan y graznan: en el letrero de vidrio, un árbol dorado brilla.',
    },
  },
  {
    image: 'assets/panel-street.jpg',
    text: {
      pt: 'Depois da aula, na rua de Welling, a mesma árvore dourada aparece na vitrine de uma loja antiga…',
      en: 'After school, on the Welling high street, the same golden tree appears in an old shop window…',
      es: 'Después de clase, en la calle de Welling, el mismo árbol dorado aparece en el escaparate de una tienda antigua…',
    },
  },
  {
    image: 'assets/panel-pillar.jpg',
    text: {
      pt: 'Marlow pousa no pilar do portão e puxa um pergaminho enrolado. É o começo de um mapa!',
      en: 'Marlow lands on the gate pillar and tugs a rolled parchment. It is the start of a map!',
      es: 'Marlow se posa en el pilar del portón y tira de un pergamino enrollado. ¡Es el comienzo de un mapa!',
    },
  },
  {
    image: 'assets/panel-woods.jpg',
    text: {
      pt: 'As corujas voam na frente, até a mata de Oxleas. Entre as árvores, um caminho escondido espera…',
      en: 'The owls fly ahead, all the way to Oxleas Woods. Among the trees, a hidden path waits…',
      es: 'Los búhos vuelan adelante, hasta el bosque de Oxleas. Entre los árboles, un sendero escondido espera…',
    },
  },
];

// Conversas: arrays de nós. Linha = { who, text }. Desafio = { choice: {...} }.
export const CONVERSATIONS = {
  finch: [
    { who: 'finch', text: {
      pt: 'Bom dia! Sou o Sr. Finch, o zelador. Esta escola é muito peculiar, sabem?',
      en: 'Morning! I\'m Mr Finch, the caretaker. This school is quite peculiar, you know?',
      es: '¡Buenos días! Soy el Sr. Finch, el conserje. Esta escuela es muy peculiar, ¿saben?',
    } },
    { gloss: 'peculiar' },
    { choice: {
      challengeId: 'vocabFinch',
      prompt: {
        pt: '"Peculiar" quer dizer…',
        en: '"Peculiar" means…',
        es: '"Peculiar" significa…',
      },
      options: [
        { id: 'loud', label: { pt: 'barulhenta', en: 'loud', es: 'ruidosa' } },
        { id: 'strange', label: { pt: 'diferente, esquisita', en: 'strange, unusual', es: 'extraña, rara' }, correct: true },
        { id: 'tall', label: { pt: 'muito alta', en: 'very tall', es: 'muy alta' } },
      ],
      success: {
        pt: 'Isso! Tão peculiar que, varrendo o salão, achei isto enrolado num cantinho: uma parte de um mapa antigo!',
        en: 'Right! So peculiar that, sweeping the hall, I found this tucked in a corner: a piece of an old map!',
        es: '¡Eso! Tan peculiar que, barriendo el salón, encontré esto en un rincón: ¡una parte de un mapa antiguo!',
      },
      fail: {
        pt: 'Quase! Peculiar é coisa esquisita, diferente. Pense de novo…',
        en: 'Almost! Peculiar means strange, unusual. Think again…',
        es: '¡Casi! Peculiar es algo extraño, raro. Piensen otra vez…',
      },
    } },
  ],
  finchAfter: [
    { who: 'finch', text: {
      pt: 'Já acharam muitas coisas por aqui? Os livros guardam segredos — é só procurar bem!',
      en: 'Found lots of things around here yet? Books keep secrets — just look carefully!',
      es: '¿Ya encontraron muchas cosas por aquí? ¡Los libros guardan secretos, solo miren bien!',
    } },
  ],
  page: [
    { who: 'page', text: {
      pt: 'Bem-vindos à biblioteca! A Sra. Page, à disposição. Ontem alguém devolveu um livro velho… com isto dentro.',
      en: 'Welcome to the library! Ms Page, at your service. Yesterday someone returned an old book… with this inside.',
      es: 'Bienvenidos a la biblioteca. La Sra. Page, a su servicio. Ayer alguien devolvió un libro viejo… con esto adentro.',
    } },
    { who: 'page', text: {
      pt: 'Havia uma carta junto. Escutem com atenção: "Saí antes do último sinal porque ouvi asas sobre o pátio…"',
      en: 'There was a letter with it. Listen carefully: "I left before the final bell because I heard wings above the courtyard…"',
      es: 'Había una carta junto. Escuchen con atención: "Salí antes de la última campana porque oí alas sobre el patio…"',
    } },
    { choice: {
      challengeId: 'compPage',
      prompt: {
        pt: 'Onde a pessoa ouviu asas?',
        en: 'Where did the person hear wings?',
        es: '¿Dónde oyó alas la persona?',
      },
      options: [
        { id: 'courtyard', label: { pt: 'no pátio', en: 'in the courtyard', es: 'en el patio' }, correct: true },
        { id: 'library', label: { pt: 'na biblioteca', en: 'in the library', es: 'en la biblioteca' } },
        { id: 'busstop', label: { pt: 'no ponto de ônibus', en: 'at the bus stop', es: 'en la parada del autobús' } },
      ],
      success: {
        pt: 'Exato — a carta responde sozinha quando lemos com calma. Fique com esta parte do mapa. Volto ao pátio… digo, ao trabalho!',
        en: 'Exactly — the letter answers itself when we read calmly. Take this map piece. Back to the courtyard… I mean, to work!',
        es: 'Exacto: la carta responde sola cuando leemos con calma. Quedense con esta parte del mapa. ¡Al patio… digo, al trabajo!',
      },
      fail: {
        pt: 'Releiam a frase da carta: "ouvi asas sobre…" Qual era o lugar?',
        en: 'Read the letter\'s sentence again: "I heard wings above…" Which place was it?',
        es: 'Relean la frase de la carta: "oí alas sobre…" ¿Cuál era el lugar?',
      },
    } },
  ],
  pageAfter: [
    { who: 'page', text: {
      pt: 'Esta biblioteca é antiga. Dizem que tem passagem concealed… quer dizer, escondida. Quem procura, acha!',
      en: 'This library is old. They say it has a concealed passage… that is, a hidden one. Seek and you shall find!',
      es: 'Esta biblioteca es antigua. Dicen que tiene un pasaje concealed… o sea, escondido. ¡Quien busca, encuentra!',
    } },
    { gloss: 'concealed' },
  ],
  assemble: [
    { choice: {
      challengeId: 'fractionMap',
      prompt: {
        pt: 'As 4 partes juntas fazem 1 mapa inteiro. Uma parte sozinha é que fração do mapa?',
        en: 'The 4 pieces together make 1 whole map. One piece alone is what fraction of the map?',
        es: 'Las 4 partes juntas hacen 1 mapa entero. Una parte sola es qué fracción del mapa?',
      },
      options: [
        { id: 'half', label: { pt: '1/2 (metade)', en: '1/2 (a half)', es: '1/2 (la mitad)' } },
        { id: 'third', label: { pt: '1/3 (um terço)', en: '1/3 (a third)', es: '1/3 (un tercio)' } },
        { id: 'quarter', label: { pt: '1/4 (um quarto)', en: '1/4 (a quarter)', es: '1/4 (un cuarto)' }, correct: true },
      ],
      success: {
        pt: 'Um quarto de 4 partes! As bordas se encaixam… e o mapa inteiro brilha: uma trilha até os bosques de Oxleas!',
        en: 'A quarter, of four pieces! The edges fit… and the whole map glows: a trail into Oxleas Woods!',
        es: '¡Un cuarto, de 4 partes! ¡Los bordes encajan… y el mapa entero brilla: un sendero hacia el bosque de Oxleas!',
      },
      fail: {
        pt: 'Conte as partes: se 4 fazem o inteiro, cada uma vale…?',
        en: 'Count the pieces: if 4 make the whole, each one is worth…?',
        es: 'Cuenta las partes: si 4 hacen el entero, ¿cada una vale…?',
      },
    } },
  ],
  gate: [
    { who: 'owl', text: {
      pt: 'A árvore do mapa combina com a árvore do portão. Toque no portão para abrir!',
      en: 'The tree on the map matches the tree on the gate. Tap the gate to open it!',
      es: 'El árbol del mapa coincide con el árbol de la puerta. ¡Toca la puerta para abrirla!',
    } },
  ],
};

// Cenografia: olhar objetos não conta ponto, mas alimenta o mundo.
export const FLAVOR = {
  board: {
    pt: 'Mural: "Clube de Xadrez quinta-feira" · "Fotos da excursão à padaria" · e um rabisco antigo de… uma árvore dourada?',
    en: 'Notice board: "Chess Club Thursday" · "Bakery trip photos" · and an old doodle of… a golden tree?',
    es: 'Mural: "Club de Ajedrez el jueves" · "Fotos del paseo a la panadería" · ¿y un garabato antiguo de… un árbol dorado?',
  },
  signTree: {
    pt: 'A árvore dourada no vidro pulsa devagar, como se respirasse. As corujas adoram ela.',
    en: 'The golden tree on the glass pulses slowly, as if breathing. The owls love it.',
    es: 'El árbol dorado del vidrio late despacio, como si respirara. A los búhos le encanta.',
  },
  marker: {
    pt: 'Pedra antiga com a árvore entalhada. Do outro lado, letras pequenas: "Quem lê o mapa, vê o caminho."',
    en: 'Old stone with the tree carved in. On the back, small letters: "Who reads the map sees the way."',
    es: 'Piedra antigua con el árbol tallado. Del otro lado, letras pequeñas: "Quien lee el mapa ve el camino."',
  },
};

// Páginas de história escondidas (spec §44: recompensas de descoberta).
export const CLUES = {
  libraryTable: {
    pt: 'Página rasgada de um livro de histórias: "…e o Castelo de Açúcar dava frutas a quem provava legumes primeiro."',
    en: 'A torn page from a storybook: "…and the Candy Castle gave fruit to anyone who tasted vegetables first."',
    es: 'Página rasgada de un cuento: "…y el Castillo de Azúcar daba frutas a quien probaba verduras primero."',
  },
  oak: {
    pt: 'Página presa no carvalho: "O portão só abre para quem entende o mundo — nunca para quem tem pressa."',
    en: 'A page stuck on the oak: "The gate only opens for those who understand the world — never for those in a hurry."',
    es: 'Página pegada al roble: "La puerta solo se abre para quien entiende el mundo, nunca para quien tiene prisa."',
  },
};

// Peças do mapa: id → como a criança as ganha (para o diário).
export const PIECE_NAMES = {
  finch: { pt: 'do zelador', en: 'from the caretaker', es: 'del conserje' },
  page: { pt: 'da bibliotecária', en: 'from the librarian', es: 'de la bibliotecaria' },
  shelf: { pt: 'da estante', en: 'from the shelf', es: 'del estante' },
  trolley: { pt: 'do carrinho de livros', en: 'from the book trolley', es: 'del carrito de libros' },
};

// Glosas ✨ mostradas como brindes de vocabulário (spec §9).
export const GLOSSES = {
  peculiar: {
    pt: 'peculiar = esquisito, diferente das outras',
    en: 'peculiar = strange, unusual',
    es: 'peculiar = extraño, poco común',
  },
  concealed: {
    pt: 'concealed = escondido',
    en: 'concealed = hidden',
    es: 'concealed = escondido',
  },
};
