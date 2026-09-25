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
      en: 'The owls fly ahead, all the way to Oxleas Wood. Among the trees, a hidden path waits…',
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
    { who: 'finch', text: {
      pt: 'A vassoura acordou uma fita brilhante no cabo. Vou tocar cada palavra da escola que encontrei nela.',
      en: 'The broom woke a shiny strip on its handle. I will touch each school word I found there.',
      es: 'La escoba despertó una cinta secreta en el mango. Voy a tocar cada palabra de la escuela que encontré allí.',
    } },
    { gloss: 'teacher' },
    { gloss: 'student' },
    { gloss: 'class' },
    { gloss: 'book' },
    { gloss: 'pencil' },
    { gloss: 'bag' },
    { gloss: 'read' },
    { gloss: 'write' },
    { gloss: 'question' },
    { gloss: 'child' },
    { gloss: 'room' },
    { gloss: 'gate' },
    { gloss: 'curious' },
    { gloss: 'roots' },
    { gloss: 'tree' },
    { gloss: 'leaf' },
    { gloss: 'rock' },
    { gloss: 'star' },
  ],
  finchAfter: [
    { who: 'finch', text: {
      pt: 'Já acharam muitas coisas por aqui? Os livros guardam segredos — é só procurar bem!',
      en: 'Found lots of things around here yet? Books keep secrets — just look carefully!',
      es: '¿Ya encontraron muchas cosas por aquí? ¡Los libros guardan secretos, solo miren bien!',
    } },
    { gloss: 'broom' },
    { who: 'finch', text: {
      pt: 'No armário de achados e perdidos havia um retrato de família, uma chave de casa, um crachá de quarto, bonecos do corpo e roupas para guardar. Vamos aprender os nomes juntos!',
      en: 'In the lost-and-found cupboard were a family photo, a house key, a room tag, body puppets and clothes to put away. Let us learn their names together!',
      es: 'En el armario de objetos perdidos había una foto de familia, una llave de casa, una etiqueta de cuarto, muñecos del cuerpo y ropa para guardar. ¡Aprendamos sus nombres juntos!',
    } },
    { gloss: 'mother' },
    { gloss: 'father' },
    { gloss: 'sister' },
    { gloss: 'brother' },
    { gloss: 'house' },
    { gloss: 'bed' },
    { gloss: 'head' },
    { gloss: 'hair' },
    { gloss: 'eye' },
    { gloss: 'ear' },
    { gloss: 'nose' },
    { gloss: 'mouth' },
    { gloss: 'hand' },
    { gloss: 'foot' },
    { gloss: 'shoulder' },
    { gloss: 'knee' },
    { gloss: 'arm' },
    { gloss: 'face' },
    { gloss: 'hat' },
    { gloss: 'trousers' },
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
    { who: 'page', text: {
      pt: 'O livro velho abriu páginas que viraram paisagem. A biblioteca brotou palavras do tamanho das árvores enquanto os pássaros acordavam!',
      en: 'The old book opened pages that became landscapes. Words grew as big as trees while the birds woke!',
      es: 'El libro viejo abrió páginas que se convirtieron en paisajes. ¡Las palabras crecieron como árboles mientras despertaban los pájaros!',
    } },
    { gloss: 'story' },
    { gloss: 'letter' },
    { gloss: 'tea' },
    { gloss: 'ancient' },
    { gloss: 'woods' },
    { gloss: 'warm' },
    { gloss: 'kind' },
    { gloss: 'secret' },
    { gloss: 'practice' },
    { gloss: 'golden' },
    { gloss: 'grateful' },
    { gloss: 'meadow' },
    { gloss: 'hill' },
    { gloss: 'castle' },
    { gloss: 'pond' },
    { gloss: 'greenhouse' },
    { gloss: 'swing' },
    { gloss: 'pitch' },
    { gloss: 'path' },
    { gloss: 'climb' },
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
    { who: 'page', text: {
      pt: 'Na última página, um mapa de uma cidade ganhou vida: um museu, um parque, um piquenique com maçã e pão e um cofre brilhando. A etiqueta mandava buscar no carrinho de livros!',
      en: 'On the last page, a town map came alive: a museum, a park, a picnic with an apple and bread, and a shining treasure chest. Its label said to look in the book trolley!',
      es: 'En la última página, un mapa de una ciudad cobran vida: ¡un museo, un parque, un pícnic con manzana y pan y un cofre brillante! Su etiqueta decía que miráramos en el carrito de libros.',
    } },
    { gloss: 'fetch' },
    { gloss: 'treasure' },
    { gloss: 'sparkle' },
    { gloss: 'magic' },
    { gloss: 'spell' },
    { gloss: 'bookmark' },
    { gloss: 'paper' },
    { gloss: 'ink' },
    { gloss: 'quiet' },
    { gloss: 'borrow' },
    { gloss: 'return' },
    { gloss: 'answer' },
    { gloss: 'chapter' },
    { gloss: 'title' },
    { gloss: 'apple' },
    { gloss: 'bread' },
    { gloss: 'museum' },
    { gloss: 'park' },
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
        pt: 'Um quarto de 4 partes! As bordas se encaixam… e o mapa inteiro brilha: uma trilha até a mata de Oxleas!',
        en: 'A quarter, of four pieces! The edges fit… and the whole map glows: a trail into Oxleas Wood!',
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
    es: 'Un buzón verde: una carta sin dirección, solo el dibujo de un árbol dorado. El sello dice "Candy Castle".',
  },
  teaRoom: {
    pt: 'O cheiro de chá e bolo sai da porta aberta. No quadro: "Today\'s special — cinnamon tea with honey".',
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
  clueTable: {
    pt: 'Na mesa da biblioteca, uma página rasgada guarda a ponta de um mapa. Ao lado, uma maçã e um pão formam o lanche das corujas estudiosas!',
    en: 'On the library table, a torn page holds the tip of a map. Beside it, an apple and some bread make a snack for the study-minded owls!',
    es: 'En la mesa de la biblioteca, una página rasgada guarda el borde de un mapa. ¡Al lado, una manzana y pan forman la merienda de los búhos estudiosos!',
  },
  clueOak: {
    pt: 'No carvalho, a página está presa entre raízes fortes. A casca é rugosa e fria, e uma folha dourada ainda brilha ali!',
    en: 'On the oak, the page is caught between strong roots. The bark feels rough and cool, and one golden leaf still glows there!',
    es: 'En el roble, la página está atrapada entre raíces fuertes. ¡La corteza es rugosa y fría, y una hoja dorada todavía brilla allí!',
  },
  // ── novas áreas (escola ampliada + Oxleas) ───────────────────────────────
  playground: {
    pt: 'O parquinho tem balanço, escorregador e um caixote de areia. As marcas na areia parecem letras: "O.L.A.D.A"… e um guarda-chuva roxo encostado na cerca!',
    en: 'The playground has swings, a slide and a sandpit. The marks in the sand spell "O.L.A.D.A"… and a purple umbrella leans on the fence!',
    es: 'El parque tiene columpios, un tobogán y un arenero. Las marcas en la arena dicen "O.L.A.D.A"… ¡y un paraguas morado apoyado en la valla!',
  },
  garden: {
    pt: 'A horta da escola: couveiros, uma estufa de vidro e um espantalho que parece cumprimentar todo mundo. Cheira a terra molhada!',
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
    pt: 'Uma antiga casa de campo de pedra, feita para parecer um castelo, espera no meio de Oxleas Wood. A vista lá de cima vale a subida!',
    en: 'An old stone country house built to look like a castle waits in the middle of Oxleas Wood. The view from the top is worth the climb!',
    es: 'Una antigua casa de campo de piedra, construida para parecer un castillo, espera en medio de Oxleas Wood. ¡La vista desde arriba vale la subida!',
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
    es: 'Un pergamino en el patio de la academia: "…el duelo solo empieza cuando los dos búhos cantan juntos."',
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
    pt: 'Tabela de jogos pregada na cerca da quadra: "Tuesday — PE: year 4 v year 5. Wednesday — Library club. Friday — Choir." Olha, o coro é na sexta!',
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
  { who: 'owl', text: {
    pt: 'O brilho rosa vinha de um barbante mágico preso ao guarda-chuva: ele sabia dizer o clima de Welling!',
    en: 'The pink glint came from magic string tied to the umbrella: it knew Welling’s weather!',
    es: 'El brillo rosa venía de un hilo mágico atado al paraguas: ¡conocía el clima de Welling!',
  } },
  { gloss: 'rain' },
  { gloss: 'wet' },
  { gloss: 'wind' },
];
export const UMBRELLA_FOUND = [
  { who: 'owl', text: {
    pt: 'Achei! Um guarda-chuva roxo, dobrado, todo emaranhado na terra. Deve ter caído do muro do pátio ontem. Vamos levar pra Sra. Page!',
    en: 'Found it! A purple umbrella, folded and all tangled in the dirt. It must have blown off the yard wall yesterday. Let’s take it back to Ms Page!',
    es: '¡Encontrado! Un paraguas morado, plegado y enredado en la tierra. Seguro que se voló del muro del patio ayer. ¡Volvemos con la Sra. Page!',
  } },
  { gloss: 'umbrella' },
  { who: 'owl', text: {
    pt: 'Agora o barbante mostra o céu azul e três exemplos de cor. A Sra. Page vai adorar!',
    en: 'Now the string shows the blue sky and three colours. Ms Page will love it!',
    es: '¡Ahora el hilo muestra el cielo azul y tres colores! ¡A la Sra. Page le va a encantar!',
  } },
  { gloss: 'sunny' },
  { gloss: 'cloudy' },
  { gloss: 'weather' },
];
export const UMBRELLA_DONE = [
  { who: 'page', text: {
    pt: 'Meu guarda-chuva! Vocês são um verdadeiro tesouro! Agora meu chá das cinco está garantido, chove ou faça sol. As palavras "umbrella" e "grateful" entraram no diário de vocês!',
    en: 'My umbrella! You are a real treasure! Now my five-o’clock tea is weather-proof. The words "umbrella" and "grateful" went into your journal!',
    es: '¡Mi paraguas! ¡Son un verdadero tesoro! Ahora mi té de las cinco está a salvo. ¡Las palabras "umbrella" y "grateful" entraron en tu diario!',
  } },
  { gloss: 'umbrella' },
  { who: 'owl', text: {
    pt: 'A Sra. Page amarrou três cores ao barbante: o azul do céu, o vermelho das maçãs e o amarelo do sol. O guarda-chuva agora é um pequeno quadro do mundo!',
    en: 'Ms Page tied three colours to the string: the blue of the sky, the red of apples and the yellow of the sun. Now the umbrella is a little picture of the world!',
    es: '¡La Sra. Page ató tres colores al hilo: el azul del cielo, el rojo de las manzanas y el amarillo del sol. ¡Ahora el paraguas es un pequeño cuadro del mundo!',
  } },
  { gloss: 'blue' },
  { gloss: 'red' },
  { gloss: 'yellow' },
];

// Peças do mapa: id → como a criança as ganha (para o diário).
export const PIECE_NAMES = {
  finch: { pt: 'do zelador', en: 'from the caretaker', es: 'del conserje' },
  page: { pt: 'da bibliotecária', en: 'from the librarian', es: 'de la bibliotecaria' },
  shelf: { pt: 'da estante', en: 'from the shelf', es: 'del estante' },
  trolley: { pt: 'do carrinho de livros', en: 'from the book trolley', es: 'del carrito de libros' },
};

// Glosas ✨ mostradas como brindes de vocabulário (spec §9) — cada uma vira
// carta no Diário de Palavras com revisão espaçada (src/vocab.js). As palavras
// são agrupadas por casa/família, escola, comida, corpo, roupas, cores/números,
// leitura, natureza, clima, transporte, cidade, sentimentos, verbos, adjetivos
// e magia/história. Toda entrada é { pt, en, es }, com a palavra em inglês como chave.
export const GLOSSES = {
  story: { pt: 'story = história, conto', en: 'story = words that tell events', es: 'story = cuento' },
  letter: { pt: 'letter = carta', en: 'letter = a written message sent to someone', es: 'letter = mensaje escrito enviado a alguien' },
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
    en: 'broom = a brush for sweeping the floor',
    es: 'broom = escoba',
  },
  ancient: {
    pt: 'ancient = muito antigo',
    en: 'ancient = very, very old',
    es: 'ancient = muy antiguo',
  },
  woods: {
    pt: 'woods = mata, bosque',
    en: 'woods = forest',
    es: 'woods = bosque',
  },
  trust: {
    pt: 'trust = confiar',
    en: 'trust = believe someone will be kind and honest',
    es: 'trust = creer que alguien será amable y honesto',
  },
  warm: {
    pt: 'warm = morno, quentinho',
    en: 'warm = pleasantly hot, not painfully hot',
    es: 'warm = templado, calentito',
  },
  kind: {
    pt: 'kind = gentil e bondoso',
    en: 'kind = nice and caring',
    es: 'kind = amable y bondadoso',
  },
  fetch: {
    pt: 'fetch = buscar e trazer',
    en: 'fetch = go get and bring back',
    es: 'fetch = buscar y traer',
  },
  treasure: {
    pt: 'treasure = tesouro',
    en: 'treasure = special things worth finding',
    es: 'treasure = cosas especiales que vale la pena encontrar',
  },
  sparkle: {
    pt: 'sparkle = brilhar, cintilar',
    en: 'sparkle = shine with little lights',
    es: 'sparkle = destellar',
  },
  secret: {
    pt: 'secret = segredo',
    en: 'secret = something kept hidden',
    es: 'secret = algo que se mantiene escondido',
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
    pt: 'curious = curioso',
    en: 'curious = wanting to know or learn more',
    es: 'curious = que quiere saber o aprender más',
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
    pt: 'gate = portão',
    en: 'gate = a door in a fence',
    es: 'gate = portón',
  },
  umbrella: {
    pt: 'umbrella = guarda-chuva',
    en: 'umbrella = a thing that keeps the rain off you',
    es: 'umbrella = paraguas',
  },
  grateful: {
    pt: 'grateful = agradecido',
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
    en: 'hill = ground that rises above the land around it',
    es: 'hill = terreno que sube sobre el suelo alrededor',
  },
  castle: {
    pt: 'castle = castelo',
    en: 'castle = an old home with towers',
    es: 'castle = castillo',
  },
  pond: {
    pt: 'pond = lago pequeno',
    en: 'pond = a small lake with still water',
    es: 'pond = lago pequeño de agua quieta',
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
  // Futebol: palavras que o minigame de pênaltis ensina no campo dos fundos
  goal: {
    pt: 'goal = gol; também meta',
    en: 'goal = a point scored in football; also a target',
    es: 'goal = un punto marcado en fútbol; también meta',
  },
  kick: {
    pt: 'kick = chutar',
    en: 'kick = to hit the ball with your foot',
    es: 'kick = patear el balón con el pie',
  },
  ball: {
    pt: 'ball = bola',
    en: 'ball = the round thing you play with',
    es: 'ball = la pelota redonda',
  },
  save: {
    pt: 'save = defesa (o goleiro segura a bola)',
    en: 'save = when the goalkeeper stops the ball',
    es: 'save = cuando el portero para el balón',
  },
  penalty: {
    pt: 'penalty = pênalti',
    en: 'penalty = a kick given after a foul',
    es: 'penalty = un tiro tras una falta',
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

  // Casa e família
  mother: { pt: 'mother = mãe', en: 'mother = your parent who is a woman', es: 'mother = tu progenitora' },
  father: { pt: 'father = pai', en: 'father = your parent who is a man', es: 'father = tu progenitor' },
  sister: { pt: 'sister = irmã', en: 'sister = a girl in your family', es: 'sister = una niña de tu familia' },
  brother: { pt: 'brother = irmão', en: 'brother = a boy in your family', es: 'brother = un niño de tu familia' },
  house: { pt: 'house = casa', en: 'house = a home for people', es: 'house = casa' },
  key: { pt: 'key = chave', en: 'key = a small object that opens a lock', es: 'key = llave' },
  room: { pt: 'room = quarto', en: 'room = a space inside a building', es: 'room = espacio dentro de un edificio' },
  bed: { pt: 'bed = cama', en: 'bed = where a person sleeps', es: 'bed = cama' },
  child: { pt: 'child = criança', en: 'child = a boy or girl who is not grown up', es: 'child = una persona joven que todavía no es adulta' },

  // Escola
  teacher: { pt: 'teacher = quem ensina', en: 'teacher = a person who helps others learn', es: 'teacher = la persona que ayuda a otros a aprender' },
  student: { pt: 'student = estudante', en: 'student = a person who learns at school', es: 'student = quien aprende en la escuela' },
  class: { pt: 'class = turma', en: 'class = a group of pupils who learn together', es: 'class = grupo de alumnos que aprenden juntos' },
  pen: { pt: 'pen = caneta', en: 'pen = a tool for writing with ink', es: 'pen = bolígrafo' },
  desk: { pt: 'desk = carteira', en: 'desk = a table for writing or studying', es: 'desk = escritorio' },
  song: { pt: 'song = canção', en: 'song = music with words', es: 'song = canción' },
  bell: { pt: 'bell = sino', en: 'bell = a metal object that rings', es: 'bell = campana' },
  book: { pt: 'book = livro', en: 'book = pages joined inside a cover', es: 'book = páginas unidas dentro de una portada' },
  pencil: { pt: 'pencil = lápis', en: 'pencil = a tool for writing or drawing', es: 'pencil = herramienta para escribir o dibujar' },
  bag: { pt: 'bag = sacola ou mochila', en: 'bag = a container used to carry things', es: 'bag = recipiente para llevar cosas' },
  read: { pt: 'read = ler', en: 'read = look at words and learn what they mean', es: 'read = mirar las palabras y entenderlas' },
  write: { pt: 'write = escrever', en: 'write = make words or letters on a page', es: 'write = hacer palabras o letras en una página' },
  question: { pt: 'question = pergunta', en: 'question = words that ask for an answer', es: 'question = palabras que piden una respuesta' },

  // Comida e bebida
  apple: { pt: 'apple = maçã', en: 'apple = a round fruit that can be red or green', es: 'apple = manzana' },
  bread: { pt: 'bread = pão', en: 'bread = a baked food made from flour', es: 'bread = pan' },
  cake: { pt: 'cake = bolo', en: 'cake = a sweet baked food', es: 'cake = pastel' },
  cheese: { pt: 'cheese = queijo', en: 'cheese = a yellow food made from milk', es: 'cheese = queso' },
  milk: { pt: 'milk = leite', en: 'milk = a white drink from a cow', es: 'milk = leche' },
  egg: { pt: 'egg = ovo', en: 'egg = an oval that a bird lays', es: 'egg = huevo' },
  rice: { pt: 'rice = arroz', en: 'rice = small white grains that people eat', es: 'rice = arroz' },

  // Corpo
  head: { pt: 'head = cabeça', en: 'head = the top of the body', es: 'head = cabeza' },
  hair: { pt: 'hair = cabelo', en: 'hair = the threads on top of the head', es: 'hair = cabello' },
  eye: { pt: 'eye = olho', en: 'eye = the organ that lets us see', es: 'eye = ojo' },
  ear: { pt: 'ear = orelha', en: 'ear = the organ that lets us hear', es: 'ear = oreja' },
  nose: { pt: 'nose = nariz', en: 'nose = the part of the face used to smell', es: 'nose = nariz' },
  mouth: { pt: 'mouth = boca', en: 'mouth = the opening used for eating and talking', es: 'mouth = abertura para comer y hablar' },
  hand: { pt: 'hand = mão', en: 'hand = the end of the arm that holds things', es: 'hand = extremo del brazo que sostiene cosas' },
  foot: { pt: 'foot = pé', en: 'foot = the end of the leg that touches the ground', es: 'foot = extremo de la pierna que toca el suelo' },
  shoulder: { pt: 'shoulder = ombro', en: 'shoulder = the upper part of the arm', es: 'shoulder = hombro' },
  knee: { pt: 'knee = joelho', en: 'knee = the bend in the middle of a leg', es: 'knee = la curva en medio de la pierna' },
  arm: { pt: 'arm = braço', en: 'arm = the part between the shoulder and hand', es: 'arm = la parte entre el hombro y la mano' },
  face: { pt: 'face = rosto', en: 'face = the front of the head, with the eyes and mouth', es: 'face = parte frontal de la cabeza, con ojos y boca' },

  // Roupas
  hat: { pt: 'hat = chapéu', en: 'hat = something worn on the head', es: 'hat = sombrero' },
  shirt: { pt: 'shirt = camisa', en: 'shirt = a light top worn on the upper body', es: 'shirt = prenda ligera para la parte de arriba del cuerpo' },
  trousers: { pt: 'trousers = calça', en: 'trousers = clothes worn separately on each leg', es: 'trousers = pantalón' },
  dress: { pt: 'dress = vestido', en: 'dress = one piece of clothing with a skirt', es: 'dress = prenda de una pieza con falda' },
  shoes: { pt: 'shoes = sapatos', en: 'shoes = a pair worn on the feet', es: 'shoes = par para los pies' },
  socks: { pt: 'socks = meias', en: 'socks = soft clothes worn inside shoes', es: 'socks = prendas suaves que se llevan dentro de los zapatos' },
  coat: { pt: 'coat = casaco', en: 'coat = a warm piece of clothing', es: 'coat = abrigo' },

  // Cores e números
  red: { pt: 'red = vermelho', en: 'red = the color of blood or a tomato', es: 'red = rojo' },
  blue: { pt: 'blue = azul', en: 'blue = the color of a clear sky', es: 'blue = azul' },
  green: { pt: 'green = verde', en: 'green = the color of leaves', es: 'green = verde' },
  yellow: { pt: 'yellow = amarelo', en: 'yellow = the color of the sun', es: 'yellow = amarillo' },
  black: { pt: 'black = preto', en: 'black = the color of very dark night', es: 'black = negro' },
  white: { pt: 'white = branco', en: 'white = the color of fresh snow', es: 'white = blanco' },
  one: { pt: 'one = um', en: 'one = the number 1', es: 'one = uno' },
  two: { pt: 'two = dois', en: 'two = the number 2', es: 'two = dos' },

  // Objetos de leitura
  bookmark: { pt: 'bookmark = marcador de página', en: 'bookmark = a strip that marks the page where you stopped', es: 'bookmark = cinta que marca la página donde paraste' },
  paper: { pt: 'paper = papel', en: 'paper = a thin sheet used for writing or drawing', es: 'paper = hoja fina para escribir o dibujar' },
  chapter: { pt: 'chapter = capítulo', en: 'chapter = one main part of a book', es: 'chapter = una de las partes principales de un libro' },
  title: { pt: 'title = título', en: 'title = the name at the top of a book', es: 'title = nombre que aparece arriba de un libro' },
  quiet: { pt: 'quiet = silencioso ou calmo', en: 'quiet = making very little sound', es: 'quiet = que hace muy poco ruido' },
  answer: { pt: 'answer = resposta', en: 'answer = what you say after a question', es: 'answer = lo que dices después de una pregunta' },
  ink: { pt: 'ink = tinta', en: 'ink = coloured liquid used in a pen', es: 'ink = líquido de color que se usa en un bolígrafo' },
  borrow: { pt: 'borrow = pegar emprestado', en: 'borrow = take something and give it back later', es: 'borrow = tomar algo y devolverlo después' },

  // Natureza e Oxleas Wood
  flower: { pt: 'flower = flor', en: 'flower = the colorful part of many plants', es: 'flower = flor' },
  tree: { pt: 'tree = árvore', en: 'tree = a tall plant with a trunk', es: 'tree = árbol' },
  leaf: { pt: 'leaf = folha', en: 'leaf = a green part of a plant', es: 'leaf = hoja' },
  duck: { pt: 'duck = pato', en: 'duck = a water bird with a wide bill', es: 'duck = pato' },
  bird: { pt: 'bird = pássaro', en: 'bird = an animal that can fly', es: 'bird = pájaro' },
  nest: { pt: 'nest = ninho', en: 'nest = a home made by a bird for its eggs', es: 'nest = nido' },
  grass: { pt: 'grass = grama', en: 'grass = short green plants on the ground', es: 'grass = pasto' },
  stream: { pt: 'stream = riacho', en: 'stream = a small water channel that can dry up', es: 'stream = cauce pequeño de agua que puede secarse' },
  rock: { pt: 'rock = pedra', en: 'rock = hard material from the ground', es: 'rock = roca' },
  star: { pt: 'star = estrela', en: 'star = a bright point seen in the night sky', es: 'star = estrella' },

  // Clima e estações
  rain: { pt: 'rain = chuva', en: 'rain = water that falls from clouds', es: 'rain = lluvia' },
  wet: { pt: 'wet = molhado', en: 'wet = covered or filled with water', es: 'wet = cubierto o lleno de agua' },
  wind: { pt: 'wind = vento', en: 'wind = moving air', es: 'wind = viento' },
  sunny: { pt: 'sunny = ensolarado', en: 'sunny = bright with sunshine', es: 'sunny = soleado' },
  cloudy: { pt: 'cloudy = nublado', en: 'cloudy = covered with clouds', es: 'cloudy = nublado' },
  weather: { pt: 'weather = tempo', en: 'weather = the sun, rain, wind, and clouds', es: 'weather = clima' },
  sun: { pt: 'sun = sol', en: 'sun = the star that gives us light and warmth', es: 'sun = sol' },
  moon: { pt: 'moon = lua', en: 'moon = the object seen in the night sky', es: 'moon = luna' },
  cloud: { pt: 'cloud = nuvem', en: 'cloud = a mass of water in the sky', es: 'cloud = nube' },

  // Transportes
  bus: { pt: 'bus = ônibus', en: 'bus = a big vehicle for many people', es: 'bus = autobús' },
  car: { pt: 'car = carro', en: 'car = a vehicle with four wheels', es: 'car = carro' },
  bike: { pt: 'bike = bicicleta', en: 'bike = a vehicle with two wheels that people pedal', es: 'bike = bicicleta' },
  train: { pt: 'train = trem', en: 'train = vehicles joined together on rails', es: 'train = tren' },
  boat: { pt: 'boat = barco', en: 'boat = a vehicle that travels on water', es: 'boat = barco' },
  plane: { pt: 'plane = avião', en: 'plane = a vehicle that flies', es: 'plane = avión' },
  truck: { pt: 'truck = caminhão', en: 'truck = a large vehicle for carrying heavy things', es: 'truck = camión' },
  taxi: { pt: 'taxi = táxi', en: 'taxi = a car that takes people somewhere for money', es: 'taxi = taxi' },

  // Cidade e lojas
  shop: { pt: 'shop = loja', en: 'shop = a place where people buy things', es: 'shop = tienda' },
  market: { pt: 'market = mercado', en: 'market = a place with many small shops or stalls', es: 'market = mercado' },
  bakery: { pt: 'bakery = padaria', en: 'bakery = a place that makes and sells bread', es: 'bakery = panadería' },
  restaurant: { pt: 'restaurant = restaurante', en: 'restaurant = a place where people eat a meal', es: 'restaurant = restaurante' },
  hospital: { pt: 'hospital = hospital', en: 'hospital = a place where sick people get help', es: 'hospital = hospital' },
  museum: { pt: 'museum = museu', en: 'museum = a place where people see interesting things', es: 'museum = museo' },
  park: { pt: 'park = parque', en: 'park = an outdoor place with grass and trees', es: 'park = parque' },

  // Sentimentos
  happy: { pt: 'happy = feliz', en: 'happy = feeling glad and smiling', es: 'happy = sentirse alegre y sonreír' },
  sad: { pt: 'sad = triste', en: 'sad = feeling unhappy and wanting to cry', es: 'sad = sentirse infeliz y querer llorar' },
  angry: { pt: 'angry = com raiva', en: 'angry = feeling very upset and cross', es: 'angry = sentirse muy molesto y enfadado' },
  tired: { pt: 'tired = cansado', en: 'tired = needing sleep or a rest', es: 'tired = necesitar dormir o descansar' },
  scared: { pt: 'scared = com medo', en: 'scared = afraid that something may hurt you', es: 'scared = temer que algo pueda hacerte daño' },
  hungry: { pt: 'hungry = com fome', en: 'hungry = your body needs food', es: 'hungry = necesitar comida' },
  excited: { pt: 'excited = animado', en: 'excited = so happy you cannot wait!', es: 'excited = ¡tan feliz que no puedes esperar!' },
  brave: { pt: 'brave = corajoso', en: 'brave = facing something scary and not running away', es: 'brave = afrontar algo que da miedo y no salir corriendo' },

  // Verbos de movimento e ação
  run: { pt: 'run = correr', en: 'run = move fast on foot', es: 'run = correr' },
  return: { pt: 'return = devolver ou voltar', en: 'return = bring or go back', es: 'return = llevar o volver' },
  walk: { pt: 'walk = andar a pé', en: 'walk = move by putting one foot in front of the other', es: 'walk = moverse poniendo un pie delante del otro' },
  jump: { pt: 'jump = pular', en: 'jump = push off the ground and go up', es: 'jump = saltar' },
  stop: { pt: 'stop = parar', en: 'stop = do not move any more', es: 'stop = dejar de moverse' },
  go: { pt: 'go = ir', en: 'go = move towards another place', es: 'go = moverse hacia otro lugar' },
  come: { pt: 'come = vir', en: 'come = move towards where you are', es: 'come = moverse hacia donde estás' },
  move: { pt: 'move = se mexer', en: 'move = change place or position', es: 'move = cambiar de lugar o posición' },

  // Adjetivos úteis
  big: { pt: 'big = grande', en: 'big = taller or wider than something else', es: 'big = más alto o ancho que otra cosa' },
  small: { pt: 'small = pequeno', en: 'small = shorter or narrower than something else', es: 'small = más bajo o estrecho que otra cosa' },
  tall: { pt: 'tall = alto', en: 'tall = higher than usual from the ground', es: 'tall = más alto de lo normal desde el suelo' },
  long: { pt: 'long = comprido', en: 'long = more than a short distance from end to end', es: 'long = más que una distancia corta de un extremo a otro' },
  fast: { pt: 'fast = rápido', en: 'fast = moving quickly', es: 'fast = rápido' },
  slow: { pt: 'slow = lento', en: 'slow = moving slowly', es: 'slow = lento' },
  clean: { pt: 'clean = limpo', en: 'clean = free of dirt', es: 'clean = limpio' },
  new: { pt: 'new = novo', en: 'new = made recently', es: 'new = nuevo' },

  // Magia e histórias
  dragon: { pt: 'dragon = dragão', en: 'dragon = a large magical creature that flies', es: 'dragon = dragón' },
  wizard: { pt: 'wizard = feiticeiro', en: 'wizard = a person who uses magic', es: 'wizard = mago' },
  crown: { pt: 'crown = coroa', en: 'crown = a special headpiece for a king or queen', es: 'crown = corona' },
  wand: { pt: 'wand = varinha', en: 'wand = a small stick used to do magic', es: 'wand = varita' },
  hero: { pt: 'hero = herói', en: 'hero = a brave person who helps others', es: 'hero = héroe' },
  magic: { pt: 'magic = magia', en: 'magic = a special power that seems impossible', es: 'magic = poder especial que parece impossível' },

  // Capítulo 2 — A Torre de Severndroog (roadmap 1.3): glosas usadas pelas
  // falas de src/chapters.js. SOMENTE ADIÇÃO: as entradas acima são chave de
  // save no Diário de Palavras e nunca podem ser renomeadas ou alteradas.
  tower: { pt: 'tower = torre', en: 'tower = a tall building that rises into the sky', es: 'tower = torre' },
  legend: { pt: 'legend = lenda', en: 'legend = an old story that people keep telling', es: 'legend = leyenda' },
  fragment: { pt: 'fragment = pedaço, fragmento', en: 'fragment = a small piece that broke off something', es: 'fragment = fragmento' },
  whole: { pt: 'whole = inteiro, completo', en: 'whole = complete, with nothing missing', es: 'whole = entero, completo' },
};
