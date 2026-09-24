// RPG Welling — conteúdo da história: NPCs, conversas, desafios embutidos e
// painéis de abertura (spec Parte A/B). Textos curtos, trilíngues, sempre
// educativos sem parecer prova (spec §42).

export const NPCS = {
  finch: { name: { pt: 'Sr. Finch', en: 'Mr Finch', es: 'Sr. Finch' }, emoji: '🧹', color: 0x7a5230 },
  page: { name: { pt: 'Sra. Page', en: 'Ms Page', es: 'Sra. Page' }, emoji: '📚', color: 0x8a4a6e },
  baker: { name: { pt: 'Sr. Crumb', en: 'Mr Crumb', es: 'Sr. Crumb' }, emoji: '🥐', color: 0xb56a4a },
  raven: { name: { pt: 'Prof. Raven', en: 'Prof. Raven', es: 'Prof. Raven' }, emoji: '🗡️', color: 0x5a7a9e },
  willow: { name: { pt: 'Prof. Willow', en: 'Prof. Willow', es: 'Prof. Willow' }, emoji: '🌿', color: 0x4a6a5a },
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
    { gloss: 'map' },
  ],
  finchAfter: [
    { who: 'finch', text: {
      pt: 'Já acharam muitas coisas por aqui? Os livros guardam segredos — é só procurar bem!',
      en: 'Found lots of things around here yet? Books keep secrets — just look carefully!',
      es: '¿Ya encontraron muchas cosas por aquí? ¡Los libros guardan secretos, solo miren bien!',
    } },
    { gloss: 'broom' },
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
    { gloss: 'library' },
  ],
  pageAfter: [
    { who: 'page', text: {
      pt: 'Esta biblioteca é antiga. Dizem que tem passagem concealed… quer dizer, escondida. Quem procura, acha!',
      en: 'This library is old. They say it has a concealed passage… that is, a hidden one. Seek and you shall find!',
      es: 'Esta biblioteca es antigua. Dicen que tiene un pasaje concealed… o sea, escondido. ¡Quien busca, encuentra!',
    } },
    { gloss: 'concealed' },
    { who: 'page', text: {
      pt: 'E uma coisa eu aprendo com as corujas todos os dias: elas trust em quem escuta com calma. Trust — confie!',
      en: 'And one thing the owls teach me every day: they trust those who listen patiently. Trust!',
      es: 'Y algo que las búhos me enseñan cada día: ellos confían en quien escucha con calma. ¡Trust, confía!',
    } },
    { gloss: 'trust' },
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
  bookshop: {
    pt: 'A vitrine da bookshop empilha histórias em inglês — a de cima se chama "The Golden Tree". Alguém deixou um marcador brilhando…',
    en: 'The bookshop window stacks English stories — the top one is called "The Golden Tree". Someone left a shiny bookmark…',
    es: 'El escaparate de la librería apila cuentos en inglés — el de arriba se llama "The Golden Tree". Alguien dejó un marcapáginas brillando…',
  },
  postOffice: {
    pt: 'Caixa de correio verde: uma carta sem endereço, só o desenho de uma árvore dourada. O carimbo diz "Candy Castle".',
    en: 'A green post box: a letter with no address, just a drawing of a golden tree. The stamp says "Candy Castle".',
    es: 'Un buzón verde: una carta sin dirección, solo el dibujo de un árbol dorada. El sello dice "Candy Castle".',
  },
  teaRoom: {
    pt: 'O cheiro de chá e bolo sai da porta aberta. Na quadro: "Today\'s special — cinnamon tea with honey".',
    en: 'The smell of tea and cake drifts through the open door. On the board: "Today\'s special — cinnamon tea with honey".',
    es: 'El olor a té y pastel entra por la puerta abierta. En el cartel: "Today\'s special — cinnamon tea with honey".',
  },
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
  // ── novas áreas (escola ampliada + Oxleas) ───────────────────────────────
  playground: {
    pt: 'O parquinho tem balanço, escorregador e um caixote de areia. As marcas na areia parecem letras: "O.L.A.D.A"… e um guarda-chuva roxo encostado na cerca!',
    en: 'The playground has swings, a slide and a sandpit. The marks in the sand spell "O.L.A.D.A"… and a purple umbrella leans on the fence!',
    es: 'El parque tiene columpios, un tobogán y un arenero. Las marcas en la arena dicen "O.L.A.D.A"… ¡y un paraguas morado apoyado en la valla!',
  },
  garden: {
    pt: 'A horta da escola: couveiros, uma estufa de vidro e um espantalho que parece greeting todo mundo. Cheira a terra molhada!',
    en: 'The school garden: vegetable beds, a glass greenhouse and a scarecrow that seems to say hello. It smells of wet earth!',
    es: 'El huerto de la escuela: bancales, un invernadero de cristal y un espantajo que parece saludar. ¡Huele a tierra mojada!',
  },
  sports: {
    pt: 'A quadra tem linhas brancas, dois gols e um placar: "WELLING FC — Home Games".',
    en: 'The court has white lines, two goals and a scoreboard: "WELLING FC — Home Games".',
    es: 'La cancha tiene líneas blancas, dos porterías y un marcador: "WELLING FC — Home Games".',
  },
  field: {
    pt: 'O campo dos fundos é enorme — dá pra jogar de tudo. As linhas do gol estão gastas de tantinhas partidas.',
    en: 'The back pitch is huge — you could play anything here. The goal lines are worn from all the games.',
    es: 'El campo de atrás es enorme — aquí se puede jugar de todo. Las líneas de la portería están gastas de tantos partidos.',
  },
  cafe: {
    pt: 'OXLEAS WOOD CAFÉ — o café de verdade fica no prado, no topo da colina! Há mesas com guarda-sóis e um quadro: "Today: cake + forest views".',
    en: 'OXLEAS WOOD CAFÉ — the real café sits in the meadow on top of the hill! There are tables with parasols and a board: "Today: cake + forest views".',
    es: 'OXLEAS WOOD CAFÉ — ¡el café de verdad está en el prado, en lo alto de la colina! Hay mesas con sombrillas y un cartel: "Today: cake + forest views".',
  },
  severndroog: {
    pt: 'Uma ruína de pedra no meio de Castle Wood: o castelo de Severndroog, com o tearoom lá em cima e uma vista que vale a subida.',
    en: 'A stone ruin in the middle of Castle Wood: Severndroog Castle, with its tearoom up top and a view worth the climb.',
    es: 'Una ruina de piedra en medio de Castle Wood: el castillo de Severndroog, con el tearoom arriba y una vista que vale la subida.',
  },
  pond: {
    pt: 'Um lago de patos e juncos. Cuidado: em Oxleas NUNCA teve rio — o rio Cray passa longe daqui. O que corre depois da chuva é o leito do riacho, e seca.',
    en: 'A pond with ducks and reeds. Careful: Oxleas NEVER had a river — the Cray flows far from here. What runs after rain is the seasonal stream bed, and it dries up.',
    es: 'Un estanque con patos y juncos. Ojo: ¡Oxleas NUNCA tuvo un río! El Cray pasa muy lejos. Lo que corre tras la lluvia es el lecho del arroyo estacional, y se seca.',
  },
  greenChain: {
    pt: 'Placa verde: "GREEN CHAIN WALK →" e uma seta para o "CAPITAL RING". Caminhos de verdade, como os de Welling!',
    en: 'Green sign: "GREEN CHAIN WALK →" and an arrow for the "CAPITAL RING". Real paths, like Welling’s!',
    es: 'Cartel verde: "GREEN CHAIN WALK →" y una flecha al "CAPITAL RING". ¡Senderos de verdad, como los de Welling!',
  },
  outdoorGym: {
    pt: 'Uma academia ao ar livre no meio das árvores: barras, paralelas e o famous wall bar. Só falta a placa "WATCH YOUR STEP!".',
    en: 'An outdoor gym among the trees: bars, parallel bars and the famous wall bar. Only the "WATCH YOUR STEP!" sign is missing.',
    es: 'Un gimnasio al aire libre entre los árboles: barras, paralelas y el famoso wall bar. Solo falta el cartel "¡MIRA EL PASO!".',
  },
  orderDone: {
    pt: 'O chá das cinco está pronto, queridas. A coruja comeu o último biscoito, mas guardou as migalhas pra vocês.',
    en: 'Five-o’clock tea is ready, dears. The owl ate the last biscuit, but saved you the crumbs.',
    es: 'El té de las cinco está listo, queridos. El búho se comió la última galleta, pero guardó las migas para ustedes.',
  },
};

// Páginas de história escondidas (spec §44: recompensas de descoberta).
export const CLUES = {
  benchPoster: {
    pt: 'Cartaz rasgado preso no banco da rua: "…e o Castelo de Açúcar trocava estrelas por perguntas bem respondidas."',
    en: 'A torn poster pinned to the street bench: "…and the Candy Castle traded stars for well-answered questions."',
    es: 'Un cartel rasgado en el banco de la calle: "…y el Castillo de Azúcar cambiaba estrellas por preguntas bien respondidas."',
  },
  chalkNote: {
    pt: 'Bilhete embaixo da janela da sala: "…a Prof. Willow guardava um giz que escrevia sozinho — sumiu na noite dourada."',
    en: 'A note under the classroom window: "…Prof. Willow kept a chalk that wrote by itself — it vanished on golden night."',
    es: 'Una nota bajo la ventana del salón: "…la Prof. Willow guardaba un giz que escribía solo — desapareció en la noche dorada."',
  },
  duelScroll: {
    pt: 'Pergaminho caído no pátio da academia: "…o duelo só começa quando as duas corujas cantam juntas."',
    en: 'A scroll dropped in the academy yard: "…the duel only begins when both owls sing together."',
    es: 'Un pergamino en el patio de la academia: "…el duelo solo empieza cuando las dos búhos cantan juntas."',
  },
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
  timetable: {
    pt: 'Tabela de jogos pregada na cerca da quadra: "Tuesday — PE: year 4 v year 5. Wednesday — Library club. Friday — Choir." Oüllá, o coro é na sexta!',
    en: 'A games timetable nailed to the court fence: "Tuesday — PE: year 4 v year 5. Wednesday — Library club. Friday — Choir." Look — choir is on Friday!',
    es: 'Un horario de deportes clavado en la valla: "Martes — Ed. física: 4º vs 5º. Miércoles — Club de lectura. Viernes — Coro." ¡Mira, el coro es el viernes!',
  },
};

// ── aventura secundária: o guarda-chuva da Sra. Page ─────────────────────────
export const UMBRELLA_ASK = [
  { who: 'page', text: {
    pt: 'Que bom ver vocês, queridas! Ai, que vergonha: perdi meu guarda-chuva roxo no playground da escola. Ontem caiu uma chuva fina e eu… enfim, vi um brilho rosa na areia perto do balanço.',
    en: 'Lovely to see you, dears! How embarrassing: I lost my purple umbrella at the school playground. It drizzled yesterday and I… anyway, I saw a pink glint in the sand near the swings.',
    es: '¡Qué gusto verlos, queridos! Qué vergüenza: perdí mi paraguas morado en el parque de la escuela. Ayer lloviznaba y yo… en fin, vi un brillo rosa en la arena cerca del columpio.',
  } },
  { gloss: 'umbrella' },
];
export const UMBRELLA_FOUND = [
  { who: 'owl', text: {
    pt: 'Achei! Um guarda-chuva roxo, dobrado, todo emaranhado na terra. Deve ter caído do muro do pátio ontem. Vamos levar pra Sra. Page!',
    en: 'Found it! A purple umbrella, folded and all tangled in the dirt. It must have blown off the yard wall yesterday. Let’s take it back to Ms Page!',
    es: '¡Encontrado! Un paraguas morado, plegado y enredado en la tierra. Seguro que se voló del muro del patio ayer. ¡Volvemos con la Sra. Page!',
  } },
  { gloss: 'umbrella' },
];
export const UMBRELLA_DONE = [
  { who: 'page', text: {
    pt: 'Meu guarda-chuva! Vocês são um verdadeiro tesouro! Agora meu chá das cinco está garantido, chove ou faça sol. As palavras "umbrella" e "grateful" entraram no diário de vocês!',
    en: 'My umbrella! You are a real treasure! Now my five-o’clock tea is weather-proof. The words "umbrella" and "grateful" went into your journal!',
    es: '¡Mi paraguas! ¡Son un verdadero tesoro! Ahora mi té de las cinco está a salvo. ¡Las palabras "umbrella" y "grateful" entraron en tu diario!',
  } },
  { gloss: 'umbrella' },
];

// Peças do mapa: id → como a criança as ganha (para o diário).
export const PIECE_NAMES = {
  finch: { pt: 'do zelador', en: 'from the caretaker', es: 'del conserje' },
  page: { pt: 'da bibliotecária', en: 'from the librarian', es: 'de la bibliotecaria' },
  shelf: { pt: 'da estante', en: 'from the shelf', es: 'del estante' },
  trolley: { pt: 'do carrinho de livros', en: 'from the book trolley', es: 'del carrito de libros' },
};

// Glosas ✨ mostradas como brindes de vocabulário (spec §9) — cada uma vira
// carta no Diário de Palavras com revisão espaçada (src/vocab.js).
export const GLOSSES = {
  story: { pt: 'story = história, conto', en: 'story = a tale', es: 'story = cuento' },
  letter: { pt: 'letter = carta', en: 'letter = a letter in the post', es: 'letter = carta' },
  tea: { pt: 'tea = chá', en: 'tea = a warm drink', es: 'tea = té' },
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
  broom: {
    pt: 'broom = vassoura',
    en: 'broom = vassoura',
    es: 'broom = escoba',
  },
  ancient: {
    pt: 'ancient = antiquado, muito antigo',
    en: 'ancient = very old',
    es: 'ancient = muy antiguo',
  },
  woods: {
    pt: 'woods = mata, bosque',
    en: 'woods = forest',
    es: 'woods = bosque',
  },
  trust: {
    pt: 'trust = confiar',
    en: 'trust = to believe in someone',
    es: 'trust = confiar',
  },
  warm: {
    pt: 'warm = quentinho, morno',
    en: 'warm = a little hot',
    es: 'warm = calentito',
  },
  kind: {
    pt: 'kind = gentil, bondade',
    en: 'kind = nice, generous',
    es: 'kind = amable',
  },
  fetch: {
    pt: 'fetch = buscar e trazer',
    en: 'fetch = go get and bring back',
    es: 'fetch = buscar y traer',
  },
  treasure: {
    pt: 'treasure = tesouro',
    en: 'treasure = valuable things',
    es: 'treasure = tesoro',
  },
  sparkle: {
    pt: 'sparkle = brilhar, cintilar',
    en: 'sparkle = shine with little lights',
    es: 'sparkle = destellar',
  },
  secret: {
    pt: 'secret = segredo',
    en: 'secret = something hidden',
    es: 'secret = secreto',
  },
  spell: {
    pt: 'spell = feitiço',
    en: 'spell = magic words',
    es: 'spell = hechizo',
  },
  practice: {
    pt: 'practice = praticar',
    en: 'practice = do it many times to learn',
    es: 'practice = practicar',
  },
  golden: {
    pt: 'golden = dourado, da cor do ouro',
    en: 'golden = gold colored',
    es: 'golden = dorado',
  },
  curious: {
    pt: 'curious = curioso, quer saber tudo',
    en: 'curious = wanting to know things',
    es: 'curious = curioso',
  },
  roots: {
    pt: 'roots = raízes',
    en: 'roots = the part of a plant under the ground',
    es: 'roots = raíces',
  },
  map: {
    pt: 'map = mapa',
    en: 'map = a drawing that shows the way',
    es: 'map = mapa',
  },
  library: {
    pt: 'library = biblioteca',
    en: 'library = a place full of books',
    es: 'library = biblioteca',
  },
  gate: {
    pt: 'gate = portão, portão grande',
    en: 'gate = a big door in a fence',
    es: 'gate = portón',
  },
  umbrella: {
    pt: 'umbrella = guarda-chuva',
    en: 'umbrella = a thing that keeps the rain off you',
    es: 'umbrella = paraguas',
  },
  grateful: {
    pt: 'grateful = grateful, thankful',
    en: 'grateful = thankful for what someone did',
    es: 'grateful = agradecido',
  },
  meadow: {
    pt: 'meadow = prado, campo aberto',
    en: 'meadow = an open field of grass',
    es: 'meadow = pradera',
  },
  hill: {
    pt: 'hill = colina, morro',
    en: 'hill = high ground, not a mountain',
    es: 'hill = colina',
  },
  castle: {
    pt: 'castle = castelo',
    en: 'castle = an old home with towers',
    es: 'castle = castillo',
  },
  pond: {
    pt: 'pond = lago pequeno, poça',
    en: 'pond = a small still lake',
    es: 'pond = estanque',
  },
  greenhouse: {
    pt: 'greenhouse = estufa de vidro',
    en: 'greenhouse = a glass house for plants',
    es: 'greenhouse = invernadero',
  },
  swing: {
    pt: 'swing = balanço',
    en: 'swing = a seat that goes back and forth',
    es: 'swing = columpio',
  },
  pitch: {
    pt: 'pitch = campo de futebol, gramado',
    en: 'pitch = a field where a team plays',
    es: 'pitch = cancha de fútbol',
  },
  path: {
    pt: 'path = caminho, trilha',
    en: 'path = a way to walk',
    es: 'path = sendero',
  },
  climb: {
    pt: 'climb = subir, escalar',
    en: 'climb = to go up',
    es: 'climb = subir',
  },
};
