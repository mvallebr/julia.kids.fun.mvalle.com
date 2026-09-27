// Spin art é a única seção em que a arte "aparece sozinha": a criança pinga
// tinta e o prato giratório faz o resto. Por isso a caixa do objeto é o
// próprio disco de papel, e ela é medida com proporção de círculo (numa
// imagem 4:3 a largura normalizada é 3/4 da altura) — se a caixa for
// retangular, o véu 'active' recorta um quadrado em vez de uma faixa de anel.
//
// Nenhum passo aqui é 'active' numa região que não seja do disco: o spin art
// é radial, não tem "lado esquerdo" nem "lado direito" que signifique
// alguma coisa. As regiões usadas são 'centre' (a cor que entra pelo meio) e
// 'all' (o giro que abre tudo). Os passos que são pausa — secar, comparar —
// ficam em 'full', que é a leitura certa: enquanto a criança espera, o
// desenho ainda não é o objeto final.

export default [
  {
    id: 't27',
    slug: 'first-spin-art-painting',
    category: 'spin-art',
    difficulty: 1,
    estimatedMinutes: 15,
    requiresAdultHelp: true,
    baseImage: 'assets/tutorials/first-spin-art-painting/base.webp',
    objectBox: { x: 0.20, y: 0.27, w: 0.60, h: 0.45 },
    materials: ['material.cardboard', 'material.paper', 'material.paint'],
    steps: [
      { veil: 'full' },
      { veil: 'full', swatches: true },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'centre' },
      { veil: 'full' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Primeiro Spin Art',
        description: 'Uma pintura redonda feita girando, com a tinta se abrindo sozinha.',
        steps: [
          { instruction: 'Coloque o papel no meio do prato que gira.', tip: 'O papel fica parado; quem gira é o prato.' },
          { instruction: 'Escolha três cores e abra os potes.', tip: 'Duas cores bem diferentes, como azul e amarelo.' },
          { instruction: 'Pingue três gotas de tinta bem no centro.', tip: 'Deixe cair do mesmo jeito, sempre no meio, e pare.' },
          { instruction: 'Gire o prato bem devagar.', tip: 'Devagar no começo, para a tinta não voar para fora.', safety: 'Peça a um adulto para ligar o spinner e para segurar o prato enquanto ele gira.' },
          { instruction: 'Pingue mais uma cor no meio.', tip: 'Escolha uma cor que apareça bem por cima das outras.' },
          { instruction: 'Gire de novo, um pouco mais rápido.', tip: 'Mais velocidade puxa a tinta e abre linhas compridas.' },
          { instruction: 'Ponha o desenho de pé e deixe secar.', tip: 'Tinta molhada escorre; de pé ela seca no lugar.' },
        ],
      },
      en: {
        title: 'First Spin-Art Painting',
        description: 'A round painting made by spinning, with the paint opening up by itself.',
        steps: [
          { instruction: 'Put the paper in the middle of the spinning plate.', tip: 'The paper stays still; it is the plate that turns.' },
          { instruction: 'Choose three colours and open the pots.', tip: 'Two colours that are very different, like blue and yellow.' },
          { instruction: 'Drop three paint drops right in the centre.', tip: 'Let them fall the same way, always in the middle, then stop.' },
          { instruction: 'Turn the plate very slowly.', tip: 'Slow at the start, so the paint does not fly off.', safety: 'Ask an adult to plug in the spinner and to hold the plate while it turns.' },
          { instruction: 'Drop one more colour in the middle.', tip: 'Pick a colour that shows clearly on top of the others.' },
          { instruction: 'Turn it again, a little faster.', tip: 'A bit more speed pulls the paint and opens long lines.' },
          { instruction: 'Stand the picture up and let it dry.', tip: 'Wet paint runs downhill; standing up keeps it where it is.' },
        ],
      },
      es: {
        title: 'Primer Spin Art',
        description: 'Una pintura redonda hecha girando, con la pintura abriéndose sola.',
        steps: [
          { instruction: 'Pon el papel en el centro del plato que gira.', tip: 'El papel se queda quieto; gira el plato.' },
          { instruction: 'Elige tres colores y abre los botes.', tip: 'Dos colores muy distintos, como azul y amarillo.' },
          { instruction: 'Pon tres gotas de pintura justo en el centro.', tip: 'Déjalas caer igual siempre en el centro, y para.' },
          { instruction: 'Gira el plato muy despacio.', tip: 'Despacio al principio, para que la pintura no salga volando.', safety: 'Pide a un adulto que enchufe el girador y que sujete el plato mientras gira.' },
          { instruction: 'Pon un color más en el centro.', tip: 'Elige un color que se vea bien por encima de los otros.' },
          { instruction: 'Gira otra vez, un poco más rápido.', tip: 'Un poco más de velocidad tira de la pintura y abre líneas largas.' },
          { instruction: 'Pon el dibujo de pie y déjalo secar.', tip: 'La pintura mojada escurre; de pie se seca en su sitio.' },
        ],
      },
    },
  },
  {
    id: 't28',
    slug: 'rainbow-rings-spin-art',
    category: 'spin-art',
    difficulty: 1,
    estimatedMinutes: 15,
    requiresAdultHelp: true,
    baseImage: 'assets/tutorials/rainbow-rings-spin-art/base.webp',
    objectBox: { x: 0.20, y: 0.27, w: 0.60, h: 0.45 },
    materials: ['material.cardboard', 'material.paper', 'material.paint'],
    steps: [
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Anéis de Arco-Íris',
        description: 'Cores pingadas no papel que viram anéis redondos quando o prato gira.',
        steps: [
          { instruction: 'Ponha uma gota grande bem no centro do papel.', tip: 'Bem no centro, porque é dali que o anel nasce.' },
          { instruction: 'Ponha a segunda cor um pouco mais para fora.', tip: 'Deixe um dedo de espaço entre uma cor e outra.' },
          { instruction: 'Ponha a terceira cor bem perto da beira.', tip: 'A cor da beira é a que mais aparece no anel de fora.' },
          { instruction: 'Gire o prato numa velocidade só.', tip: 'Velocidade igual mantém os anéis redondos.', safety: 'Peça a um adulto para ligar o spinner e para segurar o prato enquanto ele gira.' },
          { instruction: 'Olhe para os anéis e conte as cores.', tip: 'O anel do meio é o menor, e o de fora é o maior.' },
          { instruction: 'Pingue uma cor bem diferente no meio.', tip: 'Essa cor se abre no centro e destaca das outras.' },
          { instruction: 'Gire mais uma vez e deixe secar.', tip: 'A última cor entra por cima e vira o miolo do desenho.' },
        ],
      },
      en: {
        title: 'Rainbow Rings',
        description: 'Drops of paint on the paper that turn into round rings when the plate spins.',
        steps: [
          { instruction: 'Put one big drop right in the centre of the paper.', tip: 'Right in the centre, because that is where the ring grows from.' },
          { instruction: 'Put the second colour a little further out.', tip: 'Leave a finger of space between one colour and the next.' },
          { instruction: 'Put the third colour close to the edge.', tip: 'The colour near the edge is the one you see most on the outer ring.' },
          { instruction: 'Turn the plate at one steady speed.', tip: 'The same speed keeps the rings round.', safety: 'Ask an adult to plug in the spinner and to hold the plate while it turns.' },
          { instruction: 'Look at the rings and count the colours.', tip: 'The middle ring is the smallest and the outer one is the biggest.' },
          { instruction: 'Drop a very different colour in the middle.', tip: 'This colour opens in the centre and stands out from the rest.' },
          { instruction: 'Spin once more and let it dry.', tip: 'The last colour lands on top and becomes the heart of the picture.' },
        ],
      },
      es: {
        title: 'Anillos de Arcoíris',
        description: 'Gotas de pintura en el papel que se vuelven anillos redondos cuando gira el plato.',
        steps: [
          { instruction: 'Pon una gota grande justo en el centro del papel.', tip: 'Justo en el centro, porque el anillo nace de ahí.' },
          { instruction: 'Pon el segundo color un poco más hacia fuera.', tip: 'Deja un dedo de espacio entre un color y otro.' },
          { instruction: 'Pon el tercer color bien cerca del borde.', tip: 'El color del borde es el que más se ve en el anillo de fuera.' },
          { instruction: 'Gira el plato a una sola velocidad.', tip: 'La misma velocidad mantiene los anillos redondos.', safety: 'Pide a un adulto que enchufe el girador y que sujete el plato mientras gira.' },
          { instruction: 'Mira los anillos y cuenta los colores.', tip: 'El anillo del medio es el más pequeño y el de fuera el más grande.' },
          { instruction: 'Pon un color muy distinto en el centro.', tip: 'Ese color se abre en el centro y destaca del resto.' },
          { instruction: 'Gira otra vez y déjalo secar.', tip: 'El último color entra encima y se vuelve el corazón del dibujo.' },
        ],
      },
    },
  },
  {
    id: 't29',
    slug: 'spin-art-planet',
    category: 'spin-art',
    difficulty: 2,
    estimatedMinutes: 25,
    requiresAdultHelp: true,
    baseImage: 'assets/tutorials/spin-art-planet/base.webp',
    // O objeto final é o planeta com o anel, colado no papel escuro: a caixa
    // cobre a composição toda, e o anel é achatado, então a altura é menor
    // que a largura de um círculo cheio.
    objectBox: { x: 0.14, y: 0.20, w: 0.72, h: 0.56 },
    materials: ['material.cardboard', 'material.paper', 'material.paint', 'material.glue', 'material.pen'],
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Planeta de Spin Art',
        description: 'Um planeta feito de tinta girada, com estrelas e um anel em volta.',
        steps: [
          { instruction: 'Faça um círculo de spin art azul e roxo.', tip: 'Duas cores frias juntas parecem o céu do espaço.' },
          { instruction: 'Deixe esse círculo secar bem.', tip: 'Molhado, o papel rasga na hora que você for pegar ele.' },
          { instruction: 'Faça estrelas brancas bem pequenas.', tip: 'A ponta do pincel faz uma estrela redonda e pequena.' },
          { instruction: 'Corte o contorno do círculo.', tip: 'Uma linha contínua e devagar deixa o redondo.', safety: 'Peça a um adulto para segurar o papel e cortar as partes grossas.' },
          { instruction: 'Cole o círculo no papel escuro.', tip: 'O escuro em volta faz as estrelas brilharem mais.' },
          { instruction: 'Desenhe um anel em volta do planeta.', tip: 'O anel passa por trás e pela frente: uma parte fica escondida.' },
          { instruction: 'Escreva o nome do seu planeta.', tip: 'Um nome de uma ou duas palavras fica melhor que uma frase.' },
        ],
      },
      en: {
        title: 'Spin-Art Planet',
        description: 'A planet made of spun paint, with stars and a ring around it.',
        steps: [
          { instruction: 'Make a blue and purple spin-art circle.', tip: 'Two cool colours together look like space sky.' },
          { instruction: 'Let that circle dry completely.', tip: 'While it is wet, the paper tears when you pick it up.' },
          { instruction: 'Make tiny white stars.', tip: 'The tip of the brush makes a small round star.' },
          { instruction: 'Cut around the circle.', tip: 'One slow, unbroken line keeps the circle round.', safety: 'Ask an adult to hold the paper and to cut the thick parts.' },
          { instruction: 'Glue the circle onto the dark paper.', tip: 'The dark around it makes the stars shine more.' },
          { instruction: 'Draw a ring around the planet.', tip: 'The ring goes behind and in front: one part is hidden.' },
          { instruction: 'Write the name of your planet.', tip: 'A name of one or two words looks better than a whole sentence.' },
        ],
      },
      es: {
        title: 'Planeta de Spin Art',
        description: 'Un planeta hecho de pintura girada, con estrellas y un anillo alrededor.',
        steps: [
          { instruction: 'Haz un círculo de spin art azul y morado.', tip: 'Dos colores fríos juntos parecen el cielo del espacio.' },
          { instruction: 'Deja secar del todo ese círculo.', tip: 'Húmedo, el papel se rasga en cuanto lo coges.' },
          { instruction: 'Haz estrellas blancas muy pequeñas.', tip: 'La punta del pincel hace una estrella redonda y pequeña.' },
          { instruction: 'Corta el contorno del círculo.', tip: 'Una línea continua y despacio deja el círculo redondo.', safety: 'Pide a un adulto que sujete el papel y corte las partes gruesas.' },
          { instruction: 'Pega el círculo en el papel oscuro.', tip: 'El oscuro de alrededor hace que las estrellas brillen más.' },
          { instruction: 'Dibuja un anillo alrededor del planeta.', tip: 'El anillo pasa por detrás y por delante: una parte queda tapada.' },
          { instruction: 'Escribe el nombre de tu planeta.', tip: 'Un nombre de una o dos palabras queda mejor que una frase entera.' },
        ],
      },
    },
  },
  {
    id: 't30',
    slug: 'two-stage-spin-art-flower',
    category: 'spin-art',
    difficulty: 2,
    estimatedMinutes: 20,
    baseImage: 'assets/tutorials/two-stage-spin-art-flower/base.webp',
    // Aqui o objeto é o disco inteiro: a base girada é a parte mais larga da
    // obra, e a flor nasce em cima dela. Por isso 'all' entra no passo das
    // pétalas — é o passo em que o desenho inteiro muda de cara.
    objectBox: { x: 0.17, y: 0.24, w: 0.66, h: 0.50 },
    materials: ['material.cardboard', 'material.paint', 'material.pen'],
    steps: [
      { veil: 'full', swatches: true },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'bottom' },
      { veil: 'full' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Flor de Duas Etapas',
        description: 'Uma base colorida girada e, por cima dela, uma flor desenhada.',
        steps: [
          { instruction: 'Faça uma base de spin art bem colorida.', tip: 'Use cores bem diferentes: a base fica mais viva.' },
          { instruction: 'Deixe a base secar.', tip: 'A tinta seca antes de você desenhar por cima.' },
          { instruction: 'Desenhe o miolo da flor no centro.', tip: 'Um miolo redondo e cheio fica mais bonito que um vazado.' },
          { instruction: 'Use as marcas do spin art como pétalas.', tip: 'As linhas que ficaram do giro são as pétalas: é só seguir elas.' },
          { instruction: 'Desenhe o caule descendo do miolo.', tip: 'Uma linha curva parece mais viva do que uma reta.' },
          { instruction: 'Desenhe as folhas no caule.', tip: 'Duas folhas, uma de cada lado, já deixam a flor bonita.' },
          { instruction: 'Decore o fundo em volta da flor.', tip: 'Uns pontinhos ou estrelinhas no fundo completam a cena.' },
        ],
      },
      en: {
        title: 'Two-Stage Spin-Art Flower',
        description: 'A colourful spun base with a flower drawn on top of it.',
        steps: [
          { instruction: 'Make a bright spin-art base.', tip: 'Use colours that are very different: the base comes alive.' },
          { instruction: 'Let the base dry.', tip: 'The paint has to dry before you draw on top of it.' },
          { instruction: 'Draw the flower centre in the middle.', tip: 'A round, full centre looks better than an empty one.' },
          { instruction: 'Use the spin marks as petals.', tip: 'The lines left by the spin are the petals: just follow them.' },
          { instruction: 'Draw the stem down from the centre.', tip: 'A curved line looks more alive than a straight one.' },
          { instruction: 'Draw the leaves on the stem.', tip: 'Two leaves, one on each side, already make the flower pretty.' },
          { instruction: 'Decorate the background around the flower.', tip: 'A few dots or little stars finish the picture.' },
        ],
      },
      es: {
        title: 'Flor de Dos Etapas',
        description: 'Una base colorida girada y, encima de ella, una flor dibujada.',
        steps: [
          { instruction: 'Haz una base de spin art muy colorida.', tip: 'Usa colores muy distintos: la base queda más viva.' },
          { instruction: 'Deja secar la base.', tip: 'La pintura tiene que secar antes de dibujar encima.' },
          { instruction: 'Dibuja el corazón de la flor en el centro.', tip: 'Un corazón redondo y lleno queda mejor que uno vacío.' },
          { instruction: 'Usa las marcas del spin art como pétalos.', tip: 'Las líneas que dejó el giro son los pétalos: solo síguelas.' },
          { instruction: 'Dibuja el tallo desde el centro hacia abajo.', tip: 'Una línea curva parece más viva que una recta.' },
          { instruction: 'Dibuja las hojas en el tallo.', tip: 'Dos hojas, una de cada lado, ya dejan la flor bonita.' },
          { instruction: 'Decora el fondo alrededor de la flor.', tip: 'Unos puntitos o estrellitas en el fondo terminan el cuadro.' },
        ],
      },
    },
  },
];
