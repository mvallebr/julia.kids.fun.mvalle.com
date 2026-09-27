// 2D design é a seção que já nasce ligada a uma grade: a criança desenha
// dentro de um quadrado com linhas certinhas. Por isso a caixa do objeto é o
// próprio desenho pronto (o distintivo, o painel de padrão, a grade do bicho),
// e não a folha inteira.
//
// A diferença com o resto da biblioteca: aqui a região não é "parte do
// objeto", é "parte do desenho dentro do objeto". O símbolo fica no 'centre',
// o nome no 'bottom', a borda dá a volta toda e usa 'all'.

export default [
  {
    id: 't31',
    slug: 'design-a-personal-badge',
    category: '2d-design',
    difficulty: 1,
    estimatedMinutes: 20,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/design-a-personal-badge/base.webp',
    printable: 'assets/tutorials/design-a-personal-badge/badge-shapes.svg',
    objectBox: { x: 0.20, y: 0.15, w: 0.60, h: 0.64 },
    materials: ['material.paper', 'material.crayons', 'material.pencils'],
    steps: [
      { veil: 'full', printable: true },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'bottom' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Distintivo Pessoal',
        description: 'Um distintivo com o seu nome, feito de formas bem simples.',
        steps: [
          { instruction: 'Escolha uma forma para o seu distintivo.', tip: 'Círculo, estrela ou coração: os três cabem no papel.' },
          { instruction: 'Escolha duas cores principais.', tip: 'Uma cor forte e uma cor mais calma.' },
          { instruction: 'Desenhe um símbolo no meio.', tip: 'Um símbolo só, bem grande, fica melhor que muitos pequenos.' },
          { instruction: 'Escreva suas iniciais no distintivo.', tip: 'São duas letras: a primeira e a última do seu nome.' },
          { instruction: 'Passe uma borda em volta do distintivo.', tip: 'A borda pode ser uma linha grossa ou uma fileira de pontinhos.' },
          { instruction: 'Faça uma segunda versão com outras cores.', tip: 'Mude só as cores e veja qual das duas fica melhor.' },
          { instruction: 'Escolha a versão de que você mais gosta.', tip: 'A sua escolha está certa, mesmo se for diferente da dos outros.' },
        ],
      },
      en: {
        title: 'My Own Badge',
        description: 'A badge with your name on it, made from very simple shapes.',
        steps: [
          { instruction: 'Choose a shape for your badge.', tip: 'Circle, star or heart: all three fit on the paper.' },
          { instruction: 'Pick two main colours.', tip: 'One strong colour and one calmer colour.' },
          { instruction: 'Draw one simple symbol in the middle.', tip: 'One big symbol looks better than lots of small ones.' },
          { instruction: 'Write your initials on the badge.', tip: 'Two letters: the first and the last of your name.' },
          { instruction: 'Add a border around the badge.', tip: 'The border can be a thick line or a row of little dots.' },
          { instruction: 'Make a second version with other colours.', tip: 'Change only the colours and see which one looks better.' },
          { instruction: 'Choose the version you like best.', tip: 'Your choice is the right one, even if it is different from everyone else.' },
        ],
      },
      es: {
        title: 'Mi Insignia Personal',
        description: 'Una insignia con tu nombre, hecha con formas muy sencillas.',
        steps: [
          { instruction: 'Elige una forma para tu insignia.', tip: 'Círculo, estrella o corazón: los tres caben en el papel.' },
          { instruction: 'Escoge dos colores principales.', tip: 'Un color fuerte y otro más tranquilo.' },
          { instruction: 'Dibuja un símbolo sencillo en el centro.', tip: 'Un solo símbolo grande queda mejor que muchos pequeños.' },
          { instruction: 'Escribe tus iniciales en la insignia.', tip: 'Son dos letras: la primera y la última de tu nombre.' },
          { instruction: 'Pasa un borde alrededor de la insignia.', tip: 'El borde puede ser una línea gruesa o una fila de puntitos.' },
          { instruction: 'Haz una segunda versión con otros colores.', tip: 'Cambia solo los colores y mira cuál queda mejor.' },
          { instruction: 'Elige la versión que más te guste.', tip: 'Tu elección está bien, aunque sea distinta de la de los demás.' },
        ],
      },
    },
  },
  {
    id: 't32',
    slug: 'make-a-repeating-pattern',
    category: '2d-design',
    difficulty: 2,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/make-a-repeating-pattern/base.webp',
    printable: 'assets/tutorials/make-a-repeating-pattern/pattern-grid.svg',
    // O objeto é o painel de padrão inteiro, não o blocinho: o blocinho é
    // pequeno demais para ser uma região útil e é justamente a repetição dele
    // que forma a obra.
    objectBox: { x: 0.14, y: 0.16, w: 0.72, h: 0.68 },
    materials: ['material.paper', 'material.crayons', 'material.pencils'],
    steps: [
      { veil: 'full' },
      { veil: 'full', printable: true },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'bottom' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Desenho que se Repete',
        description: 'Um blocinho copiado muitas vezes, até virar papel de presente.',
        steps: [
          { instruction: 'Escolha três formas pequenas.', tip: 'Círculo, triângulo e quadrado são fáceis de copiar.' },
          { instruction: 'Coloque as três formas em um quadradinho.', tip: 'Esse quadradinho é o seu bloco: é ele que vai se repetir.' },
          { instruction: 'Copie o bloco para a direita.', tip: 'Copie sempre o mesmo bloco, sempre na mesma ordem.' },
          { instruction: 'Copie outra fileira para baixo.', tip: 'Uma fileira embaixo da outra, bem certinha.' },
          { instruction: 'Mude a cor de uma das formas.', tip: 'Mudar uma cor só já deixa o desenho mais bonito.' },
          { instruction: 'Veja onde o desenho se repete.', tip: 'A parte que se repete é o padrão; o resto é variação.' },
          { instruction: 'Use o desenho como papel de presente.', tip: 'Embrulhe um presente e faça o padrão com ainda mais linhas.' },
        ],
      },
      en: {
        title: 'Repeating Pattern',
        description: 'One small block copied again and again until it becomes wrapping paper.',
        steps: [
          { instruction: 'Pick three small shapes.', tip: 'A circle, a triangle and a square are easy to copy.' },
          { instruction: 'Put the three shapes in one small box.', tip: 'That little box is your block: it is the part that repeats.' },
          { instruction: 'Copy the block to the right.', tip: 'Always copy the same block, in the same order.' },
          { instruction: 'Copy another row below.', tip: 'One row under the other, just the same.' },
          { instruction: 'Change the colour of one shape.', tip: 'Changing a single colour already makes it prettier.' },
          { instruction: 'Look at where the drawing repeats.', tip: 'The part that repeats is the pattern; the rest is variation.' },
          { instruction: 'Use the drawing as wrapping paper.', tip: 'Wrap a present and make the pattern with even more rows.' },
        ],
      },
      es: {
        title: 'Dibujo que se Repite',
        description: 'Un bloque copiado muchas veces hasta convertirse en papel de regalo.',
        steps: [
          { instruction: 'Elige tres formas pequeñas.', tip: 'Círculo, triángulo y cuadrado son fáciles de copiar.' },
          { instruction: 'Pon las tres formas en un cuadradito.', tip: 'Ese cuadradito es tu bloque: es lo que se va a repetir.' },
          { instruction: 'Copia el bloque hacia la derecha.', tip: 'Copia siempre el mismo bloque y en el mismo orden.' },
          { instruction: 'Copia otra fila hacia abajo.', tip: 'Una fila debajo de la otra, bien alineada.' },
          { instruction: 'Cambia el color de una de las formas.', tip: 'Cambiar un solo color ya lo deja más bonito.' },
          { instruction: 'Mira dónde se repite el dibujo.', tip: 'La parte que se repite es el patrón; lo demás es variación.' },
          { instruction: 'Usa el dibujo como papel de regalo.', tip: 'Envuelve un regalo y haz el patrón con todavía más filas.' },
        ],
      },
    },
  },
  {
    id: 't33',
    slug: 'pixel-art-creature',
    category: '2d-design',
    difficulty: 2,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/pixel-art-creature/base.webp',
    printable: 'assets/tutorials/pixel-art-creature/grid-16x16.svg',
    // A grade é 16x16 e o bicho sai mais alto do que largo, então a caixa é
    // estreita de propósito: é a silhueta do bicho que tem que caber, não a
    // folha inteira.
    objectBox: { x: 0.24, y: 0.14, w: 0.52, h: 0.64 },
    materials: ['material.paper', 'material.pencils', 'material.crayons'],
    steps: [
      { veil: 'full', printable: true },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'bottom' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Bicho de Pixel',
        description: 'Um bicho inventado, feito de quadradinhos dentro de uma grade.',
        steps: [
          { instruction: 'Comece com uma grade de 16 por 16 quadradinhos.', tip: 'Cada quadradinho é um bloco, e o seu bicho sai deles.' },
          { instruction: 'Desenhe o corpo com blocos cheios.', tip: 'Preencha o meio da grade com quadradinhos inteiros.' },
          { instruction: 'Faça dois olhos iguais.', tip: 'Os dois na mesma altura e com o mesmo tamanho.' },
          { instruction: 'Acrescente patas, asas ou orelhas.', tip: 'Patas embaixo, asas dos lados, orelhas em cima: escolha uma.' },
          { instruction: 'Pinte a cor principal do corpo.', tip: 'Uma cor grande e chapada deixa o desenho mais fácil de ler.' },
          { instruction: 'Esclareça alguns quadradinhos para dar brilho.', tip: 'Dois ou três quadradinhos claros parecem olhos brilhando.' },
          { instruction: 'Dê um nome ao seu bicho.', tip: 'Um nome engraçado combina com um bicho inventado.' },
        ],
      },
      en: {
        title: 'Pixel-Art Creature',
        description: 'An invented creature made of little squares inside a grid.',
        steps: [
          { instruction: 'Start with a 16 by 16 grid of squares.', tip: 'Every little square is a block, and your creature is made of them.' },
          { instruction: 'Draw the body with solid blocks.', tip: 'Fill the middle of the grid with whole squares.' },
          { instruction: 'Add two eyes of the same size.', tip: 'Both eyes on the same line and with the same size.' },
          { instruction: 'Add legs, wings or ears.', tip: 'Legs at the bottom, wings at the sides, ears on top: choose one.' },
          { instruction: 'Colour in the main body colour.', tip: 'One big flat colour makes the drawing easier to read.' },
          { instruction: 'Lighten a few squares for shine.', tip: 'Two or three light squares look like shining eyes.' },
          { instruction: 'Give your creature a name.', tip: 'A funny name suits a creature you invented.' },
        ],
      },
      es: {
        title: 'Criatura de Píxeles',
        description: 'Una criatura inventada, hecha de cuadraditos dentro de una cuadrícula.',
        steps: [
          { instruction: 'Empieza con una cuadrícula de 16 por 16 cuadraditos.', tip: 'Cada cuadradito es un bloque, y tu criatura sale de ellos.' },
          { instruction: 'Dibuja el cuerpo con bloques llenos.', tip: 'Rellena el centro de la cuadrícula con cuadraditos enteros.' },
          { instruction: 'Haz dos ojos iguales.', tip: 'Los dos en la misma línea y del mismo tamaño.' },
          { instruction: 'Añade patas, alas u orejas.', tip: 'Patas abajo, alas a los lados, orejas arriba: elige una.' },
          { instruction: 'Pinta el color principal del cuerpo.', tip: 'Un color grande y plano deja el dibujo más fácil de leer.' },
          { instruction: 'Aclara algunos cuadraditos para que brillen.', tip: 'Dos o tres cuadraditos claros parecen ojos que brillan.' },
          { instruction: 'Ponle un nombre a tu criatura.', tip: 'Un nombre divertido combina con una criatura inventada.' },
        ],
      },
    },
  },
];
