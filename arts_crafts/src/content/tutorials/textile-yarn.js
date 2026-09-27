// Lã e tecidos: T23 a T26.
//
// Mesma regra da massa: nada de coordenadas escritas. A caixa do objeto
// (`objectBox`) gera as seis regiões e cada passo só escolhe o nome — 'top' para
// o nó no alto, 'bottom' para a parte de baixo, 'centre' para a cara do
// bichinho, 'all' quando o trabalho é no objeto inteiro.
//
// Aqui o objeto muda de escala ao longo do tutorial: a pulseira começa como um
// nó com três fios pendurados e só vira arco no fim. Por isso o primeiro passo
// e o penúltimo quase sempre são 'full' (só o contorno fantasma) e o trabalho
// que a criança realmente vê acontecendo é sempre 'active'.
//
// Os `objectBox` abaixo são ESTIMATIVAS a olho; a arte final recalcula a caixa
// por pixel. O formato e o objeto cabendo dentro de 0..1 é que não muda.

export default [
  {
    id: 't23',
    slug: 'easy-friendship-bracelet',
    category: 'textile-yarn',
    difficulty: 2,
    estimatedMinutes: 30,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/easy-friendship-bracelet/base.webp',
    objectBox: { x: 0.18, y: 0.20, w: 0.64, h: 0.60 },
    materials: ['material.yarn', 'material.string'],
    steps: [
      { veil: 'full', swatches: true },
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'bottom' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Pulseira de Amizade',
        description: 'Uma pulseira de três cores, trançada com a mão, para presentear alguém.',
        steps: [
          { instruction: 'Escolha três cores de linha.', tip: 'Duas cores claras e uma escura ficam mais bonitas juntas.' },
          { instruction: 'Corte três pedaços do mesmo tamanho.', tip: 'Corte os três juntos, um em cima do outro, para saírem iguais.' },
          { instruction: 'Amarre as três pontas com um nó.', tip: 'Puxe o nó bem apertado: é ele que segura a pulseira toda.' },
          { instruction: 'Prenda o nó na mesa com um pedaço de fita.', tip: 'Fita ou cordão: o que importa é o nó não se mexer enquanto você trança.' },
          { instruction: 'Aprenda o trançado simples: a da esquerda por cima, a da direita por baixo.', tip: 'Repita sempre o mesmo movimento, devagar, e a trança aparece sozinha.' },
          { instruction: 'Continue até a pulseira chegar no seu pulso.', tip: 'Pare quando der duas voltas no pulso e sobrar um rabinho.' },
          {
            instruction: 'Dê o nó do fim.',
            tip: 'Esconda o rabinho dentro da trança para o nó não aparecer.',
            safety: 'O nó do fim fica muito apertado: peça ajuda a um adulto.',
          },
        ],
      },
      en: {
        title: 'Easy Friendship Bracelet',
        description: 'A three-colour bracelet, braided by hand, made to give to somebody you like.',
        steps: [
          { instruction: 'Choose three colours of thread.', tip: 'Two light colours and one dark colour look good together.' },
          { instruction: 'Cut three pieces of the same length.', tip: 'Cut all three at once, one on top of the other, so they match.' },
          { instruction: 'Tie the three ends together in a knot.', tip: 'Pull the knot really tight; it holds the whole bracelet.' },
          { instruction: 'Tape the knot down to the table.', tip: 'Tape or string, it does not matter: the knot just must not move while you braid.' },
          { instruction: 'Learn the simple braid: the left thread over, the right thread under.', tip: 'Keep doing the same move, slowly, and the braid appears by itself.' },
          { instruction: 'Keep going until the bracelet reaches your wrist.', tip: 'Stop when it goes round your wrist twice and a little tail is left.' },
          {
            instruction: 'Tie the knot at the end.',
            tip: 'Hide the loose end inside the braid so the knot does not show.',
            safety: 'The last knot is very tight: ask an adult to help you.',
          },
        ],
      },
      es: {
        title: 'Pulsera de Amistad',
        description: 'Una pulsera de tres colores, trenzada a mano, para regalar a alguien que te gusta.',
        steps: [
          { instruction: 'Elige tres colores de hilo.', tip: 'Dos colores claros y uno oscuro quedan bien juntos.' },
          { instruction: 'Corta tres trozos del mismo tamaño.', tip: 'Corta los tres juntos, uno encima del otro, para que sean iguales.' },
          { instruction: 'Amarra las tres puntas con un nudo.', tip: 'Tira bien del nudo: él sostiene toda la pulsera.' },
          { instruction: 'Pega el nudo a la mesa con cinta.', tip: 'Cinta o cordón, da igual: lo importante es que el nudo no se mueva mientras trenzas.' },
          { instruction: 'Aprende la trenza simple: el de la izquierda por encima, el de la derecha por debajo.', tip: 'Repite siempre el mismo movimiento, despacio, y la trenza sale sola.' },
          { instruction: 'Sigue hasta que la pulsera llegue a tu muñeca.', tip: 'Para cuando dé dos vueltas en la muñeca y quede un rabito.' },
          {
            instruction: 'Haz el nudo del final.',
            tip: 'Esconde el rabito dentro de la trenza para que el nudo no se vea.',
            safety: 'El nudo final queda muy apretado: pide ayuda a un adulto.',
          },
        ],
      },
    },
  },
  {
    id: 't24',
    slug: 'yarn-tassel-creature',
    category: 'textile-yarn',
    difficulty: 1,
    estimatedMinutes: 20,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/yarn-tassel-creature/base.webp',
    objectBox: { x: 0.26, y: 0.12, w: 0.48, h: 0.74 },
    materials: ['material.yarn', 'material.paper', 'material.scissors', 'material.glue'],
    steps: [
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'bottom' },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'full' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Bichinho de La',
        description: 'Um bichinho de la com juba, olhos de papel e um nome que só ele tem.',
        steps: [
          { instruction: 'Enrole a lã em volta de um cartão.', tip: 'Quanto mais voltas de lã, mais cheia fica a juba.' },
          { instruction: 'Amarre bem a parte de cima.', tip: 'Faça dois nós: o primeiro frouxo, o segundo bem apertado.' },
          { instruction: 'Corte as voltas de baixo.', tip: 'Deixe a lã de cima inteira e corte só as pontas soltas.' },
          { instruction: 'Apare o penteado do bichinho.', tip: 'Corte em linha reta para todas as pontas ficarem iguais.' },
          { instruction: 'Cole dois olhos de papel.', tip: 'Olhos um pouquinho grandes deixam o bichinho mais simpático.' },
          { instruction: 'Cole as orelhas, as asas ou as patinhas.', tip: 'Escolha só uma coisa para o bichinho ter.' },
          { instruction: 'Dê um nome e um jeito ao seu bichinho.', tip: 'Pense numa coisa engraçada que ele faz: isso é a personalidade dele.' },
        ],
      },
      en: {
        title: 'Yarn Tassel Creature',
        description: 'A furry creature made of yarn, with paper eyes and a name nobody else uses.',
        steps: [
          { instruction: 'Wrap the yarn around a card.', tip: 'The more wraps you make, the fluffier the mane gets.' },
          { instruction: 'Tie the top tightly.', tip: 'Make two knots: the first one loose, the second one tight.' },
          { instruction: 'Cut the loops at the bottom.', tip: 'Keep the yarn on top whole and only cut the loose ends.' },
          { instruction: 'Trim the creature’s fringe.', tip: 'Cut in a straight line so every end is the same length.' },
          { instruction: 'Glue on two paper eyes.', tip: 'Eyes a little too big make your creature friendlier.' },
          { instruction: 'Glue on the ears, the wings or the feet.', tip: 'Pick just one thing for your creature to have.' },
          { instruction: 'Give your creature a name and a personality.', tip: 'Think of one funny thing it does: that is its personality.' },
        ],
      },
      es: {
        title: 'Bichito de Lana',
        description: 'Un bichito de lana con melena, ojos de papel y un nombre que solo él usa.',
        steps: [
          { instruction: 'Enrolla la lana en una tarjeta.', tip: 'Cuantas más vueltas des, más lanosa queda la melena.' },
          { instruction: 'Amarra bien la parte de arriba.', tip: 'Haz dos nudos: el primero suelto y el segundo bien apretado.' },
          { instruction: 'Corta las vueltas de abajo.', tip: 'Deja la lana de arriba entera y corta solo las puntas sueltas.' },
          { instruction: 'Recorta el flequillo del bichito.', tip: 'Corta en línea recta para que todas las puntas sean iguales.' },
          { instruction: 'Pega dos ojos de papel.', tip: 'Los ojos un poco grandes hacen que el bichito sea más simpático.' },
          { instruction: 'Pega las orejas, las alas o las patitas.', tip: 'Elige solo una cosa para tu bichito.' },
          { instruction: 'Ponle un nombre y un carácter a tu bichito.', tip: 'Piensa en una cosa divertida que hace: eso es su carácter.' },
        ],
      },
    },
  },
  {
    id: 't25',
    slug: 'pom-pom-animal',
    category: 'textile-yarn',
    difficulty: 2,
    estimatedMinutes: 30,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/pom-pom-animal/base.webp',
    objectBox: { x: 0.20, y: 0.18, w: 0.60, h: 0.62 },
    materials: ['material.yarn', 'material.paper', 'material.scissors', 'material.glue'],
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'bottom' },
      { veil: 'full' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Bicho de Pompons',
        description: 'Um bicho de pompons com orelhas de papel, olhos, patas e uma casinha só dele.',
        steps: [
          { instruction: 'Escolha um animal para fazer.', tip: 'Coelho, cachorro, gatinho e passarinho são os mais fáceis de montar.' },
          { instruction: 'Escolha a cor do pompom do corpo.', tip: 'Corpo claro com orelha escura fica lindo.' },
          { instruction: 'Corte as orelhas no papel.', tip: 'O bicho fica mais bonito com as duas orelhas do mesmo tamanho.' },
          { instruction: 'Cole os olhos e o focinho.', tip: 'Botão, pedaço de papel ou um desenho: qualquer um serve de focinho.' },
          { instruction: 'Cole as patinhas ou as asas.', tip: 'Quatro patinhas fazem o bicho andar; duas asas fazem ele voar.' },
          { instruction: 'Cole uma cauda.', tip: 'Cauda felpuda fica mais fofa do que cauda lisa.' },
          {
            instruction: 'Monte uma casinha de papel para o seu bicho.',
            tip: 'Dobre uma caixa de papel e escreva o nome do bicho nela.',
            safety: 'As peças pequenas e soltas ficam longe de crianças pequenas.',
          },
        ],
      },
      en: {
        title: 'Pom-Pom Animal',
        description: 'A pom-pom animal with paper ears, eyes, feet and a little home of its own.',
        steps: [
          { instruction: 'Choose an animal.', tip: 'Rabbit, puppy, kitten and bird are the easiest ones to build.' },
          { instruction: 'Pick the colour of the pom-pom body.', tip: 'A light body with dark ears looks lovely.' },
          { instruction: 'Cut the ears out of paper.', tip: 'The animal looks neater with both ears the same size.' },
          { instruction: 'Glue on the eyes and the nose.', tip: 'A button, a bit of paper or a drawing all work as a nose.' },
          { instruction: 'Glue on the feet or the wings.', tip: 'Four feet make it walk; two wings make it fly.' },
          { instruction: 'Glue on a tail.', tip: 'A fluffy tail looks cuter than a flat one.' },
          {
            instruction: 'Build a little paper home for your animal.',
            tip: 'Fold a paper box and write your animal’s name on it.',
            safety: 'Keep the small loose pieces away from little children.',
          },
        ],
      },
      es: {
        title: 'Animal de Pompones',
        description: 'Un animal de pompones con orejas de papel, ojos, patas y una casita solo suya.',
        steps: [
          { instruction: 'Elige un animal.', tip: 'Conejo, perro, gatito y pájaro son los más fáciles de montar.' },
          { instruction: 'Elige el color del pompón del cuerpo.', tip: 'Un cuerpo claro con orejas oscuras queda precioso.' },
          { instruction: 'Recorta las orejas en el papel.', tip: 'El animal queda más bonito con las dos orejas del mismo tamaño.' },
          { instruction: 'Pega los ojos y el hocico.', tip: 'Botón, trozo de papel o un dibujo: cualquiera sirve de hocico.' },
          { instruction: 'Pega las patitas o las alas.', tip: 'Cuatro patitas lo hacen andar; dos alas lo hacen volar.' },
          { instruction: 'Pega una cola.', tip: 'Una cola peluda queda más mona que una cola lisa.' },
          {
            instruction: 'Crea una casita de papel para tu animal.',
            tip: 'Dobla una caja de papel y escribe el nombre de tu animal.',
            safety: 'Mantén las piezas pequeñas y sueltas lejos de los niños pequeños.',
          },
        ],
      },
    },
  },
  {
    id: 't26',
    slug: 'paper-bead-bracelet',
    category: 'textile-yarn',
    difficulty: 2,
    estimatedMinutes: 35,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/paper-bead-bracelet/base.webp',
    objectBox: { x: 0.18, y: 0.22, w: 0.64, h: 0.56 },
    materials: ['material.paper', 'material.glue', 'material.pencils', 'material.string'],
    steps: [
      { veil: 'full' },
      { veil: 'active', region: 'left' },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Pulseira de Contas de Papel',
        description: 'Contas de papel coloridas enroladas num canudo e enfiadas num elástico.',
        steps: [
          { instruction: 'Corte triângulos compridos de papel.', tip: 'Papel grosso dá contas mais gordinhas.' },
          {
            instruction: 'Comece a enrolar o triângulo pela ponta larga.',
            tip: 'Enrole devagar e sempre no mesmo sentido.',
            safety: 'O canudo tem a ponta cortada: peça um a um adulto.',
          },
          { instruction: 'Passe um pouco de cola no papel.', tip: 'A cola só no começo: no fim a conta já se segura sozinha.' },
          { instruction: 'Termine a conta e tire do canudo.', tip: 'A conta está pronta quando o papel some todo dentro dela.' },
          { instruction: 'Faça contas de cores diferentes.', tip: 'Repita sempre a mesma ordem de cores ao longo da pulseira.' },
          { instruction: 'Enfie as contas no elástico.', tip: 'Comece pelo buraco mais largo da conta: ela entra muito mais fácil.' },
          {
            instruction: 'Dê o nó final.',
            tip: 'Duas voltas no pulso deixam a pulseira no tamanho certo.',
            safety: 'O nó fica muito apertado: peça ajuda a um adulto para fazê-lo.',
          },
        ],
      },
      en: {
        title: 'Paper-Bead Bracelet',
        description: 'Beads of coloured paper rolled on a straw and threaded onto an elastic band.',
        steps: [
          { instruction: 'Cut long thin triangles of paper.', tip: 'Thicker paper makes fatter beads.' },
          {
            instruction: 'Start rolling the triangle at its wide end.',
            tip: 'Roll slowly and always in the same direction.',
            safety: 'The rolling tool has a sharp end: ask an adult for one.',
          },
          { instruction: 'Add a little glue to the paper.', tip: 'Glue only at the start; the end of the bead holds itself.' },
          { instruction: 'Finish the bead and slide it off.', tip: 'The bead is ready when the paper has disappeared inside it.' },
          { instruction: 'Make beads in different colours.', tip: 'Repeat the same order of colours along the bracelet.' },
          { instruction: 'Thread the beads onto the elastic.', tip: 'Start with the widest hole of the bead; it goes on much easier.' },
          {
            instruction: 'Tie the knot at the end.',
            tip: 'Two rounds around the wrist make the bracelet fit just right.',
            safety: 'The knot is very tight: ask an adult to help you tie it.',
          },
        ],
      },
      es: {
        title: 'Pulsera de Cuentas de Papel',
        description: 'Cuentas de papel de colores enrolladas en un tubito y metidas en una goma elástica.',
        steps: [
          { instruction: 'Recorta triángulos largos de papel.', tip: 'El papel grueso hace cuentas más gorditas.' },
          {
            instruction: 'Empieza a enrollar el triángulo por la punta ancha.',
            tip: 'Enrolla despacio y siempre en el mismo sentido.',
            safety: 'El tubito tiene la punta cortada: pídele uno a un adulto.',
          },
          { instruction: 'Pon un poco de pegamento en el papel.', tip: 'El pegamento solo al principio: al final la cuenta ya se sujeta sola.' },
          { instruction: 'Termina la cuenta y quítala del tubito.', tip: 'La cuenta está lista cuando el papel desaparece dentro de ella.' },
          { instruction: 'Haz cuentas de colores diferentes.', tip: 'Repite siempre el mismo orden de colores a lo largo de la pulsera.' },
          { instruction: 'Mete las cuentas en la goma elástica.', tip: 'Empieza por el agujero más ancho de la cuenta: entra mucho más fácil.' },
          {
            instruction: 'Haz el nudo del final.',
            tip: 'Dos vueltas en la muñeca dejan la pulsera con la medida justa.',
            safety: 'El nudo queda muy apretado: pide ayuda a un adulto para hacerlo.',
          },
        ],
      },
    },
  },
];
