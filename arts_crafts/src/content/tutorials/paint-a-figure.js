// Balão Colorido e Gato Pintado.
//
// As duas lições ao lado da Corujinha Pintada: Tutorials de verdade em que a
// criança pinta um molde impresso, e por isso precisam de quadros próprios em
// vez do véu das outras.
//
// Por que estes dois e não outros: a técnica de pintar por inundação — a tinta
// entra pelo contorno, e o que a tinta cerca é a área a pintar — só é honesta
// quando a criança está pintando de verdade. A vela do véu só escurece e
// clareia; ela não sabe mostrar um corpo ficando marrom. Num tutorial de
// montagem (foguete, labirinto, origame) o véu está certo e a inundação seria
// mentira. Aqui a criança pinta, então a inundação é a única que ensina.
//
// Os dois estão no MESMO desenho a lápis do início ao fim, e a folha impressa
// é esse desenho. Os ids dos passos batem com os nomes de arquivo de
// tools/derive-frames.py, e o texto de cada passo foi escrito DEPOIS de ver
// as regiões que o desenho de fato tem — foi assim que o passo "orelhas" da
// coruja foi embora, porque o tufo não é uma região.
//
// Ver docs/LESSONS.md e tools/derive-frames.py.

export default [
  {
    id: 't37',
    slug: 'paint-a-hot-air-balloon',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-hot-air-balloon/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-hot-air-balloon/balloon-template.svg',
    framePattern: 'assets/tutorials/paint-a-hot-air-balloon/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-cesta' },
      { veil: 'none', image: '04-cabos' },
      { veil: 'none', image: '05-pontas' },
      { veil: 'none', image: '06-paineis' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Balão Colorido',
        description: 'Um balão de ar quente pintado por você, painel por painel.',
        steps: [
          { instruction: 'Imprima o molde do balão no papel A4.', tip: 'O desenho já vem com o contorno de cada painel. É por isso que a tinta não escorre para o vizinho.' },
          { instruction: 'Escolha as cores e ponha os potes do lado.', tip: 'Um arco-íris dá muito menos trabalho do que pensar cor por cor.' },
          { instruction: 'Pinte a cesta de castanho.', tip: 'Comece por baixo, pela parte que fica mais perto de você.' },
          { instruction: 'Pinte os cabos e a argola.', tip: 'Cabos fininhos são mais fáceis com o pincel fino.' },
          { instruction: 'Pinte os dois painéis de fora, vermelhos.', tip: 'Os dois lados iguais deixa o balão bonito e simétrico.' },
          { instruction: 'Pinte o resto dos painéis, cada um de uma cor.', tip: 'Amarelo, verde, laranja… vá indo do meio para fora.' },
          { instruction: 'Assine o seu balão e deixa ele secar.', tip: 'Um nome na arte mostra que ela é sua.' },
        ],
      },
      en: {
        title: 'Colourful Balloon',
        description: 'A hot air balloon painted by you, panel by panel.',
        steps: [
          { instruction: 'Print the balloon template on A4 paper.', tip: 'The drawing already has the edge of every panel. That is why the paint does not run into its neighbour.' },
          { instruction: 'Choose your colours and set the pots beside you.', tip: 'A rainbow is much less work than picking each colour on its own.' },
          { instruction: 'Paint the basket brown.', tip: 'Start at the bottom, with the part closest to you.' },
          { instruction: 'Paint the ropes and the ring.', tip: 'Thin ropes are easier with the thin brush.' },
          { instruction: 'Paint the two outer panels red.', tip: 'The same colour on both sides makes it look neat and symmetrical.' },
          { instruction: 'Paint the rest of the panels, one colour each.', tip: 'Yellow, green, orange… go from the middle outwards.' },
          { instruction: 'Sign your balloon and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Globo Colorido',
        description: 'Un globo aerostático pintado por ti, panel a panel.',
        steps: [
          { instruction: 'Imprime la plantilla del globo en papel A4.', tip: 'El dibujo ya trae el borde de cada panel. Por eso la pintura no se escurre hacia el vecino.' },
          { instruction: 'Elige los colores y pon los botes a tu lado.', tip: 'Un arcoíris da mucho menos trabajo que pensar color por color.' },
          { instruction: 'Pinta la cesta de marrón.', tip: 'Empieza por abajo, por la parte que queda más cerca de ti.' },
          { instruction: 'Pinta los cabos y el aro.', tip: 'Los cabos finitos son más fáciles con el pincel fino.' },
          { instruction: 'Pinta los dos paneles de fuera, rojos.', tip: 'El mismo color a los dos lados deja el globo lindo y simétrico.' },
          { instruction: 'Pinta el resto de los paneles, cada uno de un color.', tip: 'Amarillo, verde, naranja… ve del centro hacia fuera.' },
          { instruction: 'Firma tu globo y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
  {
    id: 't38',
    slug: 'paint-a-cute-cat',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-cute-cat/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-cute-cat/cat-template.svg',
    framePattern: 'assets/tutorials/paint-a-cute-cat/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-corpo' },
      { veil: 'none', image: '04-cabeca' },
      { veil: 'none', image: '05-orelhas' },
      { veil: 'none', image: '06-patas' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Gato Pintado',
        description: 'Um gato de pelúcia pintado por você, do focinho ao rabo.',
        steps: [
          { instruction: 'Imprima o molde do gato no papel A4.', tip: 'O desenho já vem com as listras. Elas são de lápis, então continuam aparecendo depois de pintar.' },
          { instruction: 'Escolha as cores e ponha os potes do lado.', tip: 'Laranja com as patas claras fica parecendo um gato de verdade.' },
          { instruction: 'Pinte o corpo de laranja.', tip: 'As listras do dorso já estão desenhadas: pinte por cima delas.' },
          { instruction: 'Pinte a cabeça da mesma cor.', tip: 'A cabeça é uma parte só. Pinte sem medo de passar por cima do traço.' },
          { instruction: 'Pinte a parte de dentro das orelhas de rosa.', tip: 'O rosa é o que deixa o gato com cara de gato de verdade.' },
          { instruction: 'Pinte as patas de creme e o rabo de laranja.', tip: 'O rabo tem listras que dividem ele em pedaços: pinte tudo junto, que sai igual.' },
          { instruction: 'Assine o seu gato e deixa ele secar.', tip: 'Um nome na arte mostra que ela é sua.' },
        ],
      },
      en: {
        title: 'Painted Cat',
        description: 'A plush cat painted by you, from nose to tail.',
        steps: [
          { instruction: 'Print the cat template on A4 paper.', tip: 'The stripes are already drawn. They are pencil, so they still show after you paint.' },
          { instruction: 'Choose your colours and set the pots beside you.', tip: 'Orange with pale paws looks like a real cat.' },
          { instruction: 'Paint the body orange.', tip: 'The stripes on the back are already there: paint straight over them.' },
          { instruction: 'Paint the head the same colour.', tip: 'The head is one single part. Paint away, even over the line.' },
          { instruction: 'Paint the inside of the ears pink.', tip: 'The pink is what makes it look like a proper cat.' },
          { instruction: 'Paint the paws cream and the tail orange.', tip: 'The stripes cut the tail into pieces: paint them all together and it comes out even.' },
          { instruction: 'Sign your cat and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Gato Pintado',
        description: 'Un gato de peluche pintado por ti, del hocico a la cola.',
        steps: [
          { instruction: 'Imprime la plantilla del gato en papel A4.', tip: 'El dibujo ya trae las rayas. Son de lápiz, así que se siguen viendo después de pintar.' },
          { instruction: 'Elige los colores y pon los botes a tu lado.', tip: 'Naranja con las patas claras parece un gato de verdad.' },
          { instruction: 'Pinta el cuerpo de naranja.', tip: 'Las rayas de la espalda ya están dibujadas: pinta por encima.' },
          { instruction: 'Pinta la cabeza del mismo color.', tip: 'La cabeza es una sola parte. Pinta sin miedo de pasar por encima del trazo.' },
          { instruction: 'Pinta la parte de dentro de las orejas de rosa.', tip: 'El rosa es lo que le da cara de gato de verdad.' },
          { instruction: 'Pinta las patas de crema y la cola de naranja.', tip: 'Las rayas dividen la cola en trozos: píntalos juntos y queda parejo.' },
          { instruction: 'Firma tu gato y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
];
