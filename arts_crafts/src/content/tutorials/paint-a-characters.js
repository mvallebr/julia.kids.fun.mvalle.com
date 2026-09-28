// Caçadora de Demônios, Gato Astronauta, Chapéu de Bruxa e Peixe-Palhaço.
//
// Terceira leva de tutorials pintados, e a mais instructive: o limite da
// técnica apareceu aqui. Ver docs/LESSONS.md, regras 15 e 16.
//
// ESTA LEIÇÃO ENSINA ALGO, E O ENSINO ESTÁ NA TINTA. O peixe e o gato
// astronauta não são só "pinte bonito": cada passo pinta uma parte do bicho e
// o texto conta para que ela serve. Peixe: a cauda empurra, a barriga clara é
// a parte de baixo, o olho é grande para ver no escuro, a bolha é ar. Gato
// astronauta: o capacete existe porque no espaço não há ar, a viseira deixa
// ver, a mochila é onde fica o ar, aquele planeta é Marte. A criança aprende a
// figura pintando a figura.
//
// O que NÃO entrou, e por quê, está nas regras 15 e 16: sistema solar,
// anatomia da planta e anatomia da abelha falharam no medidor em 12 de 12
// candidatos. Diagramas espalhados, com muitas peças pequenas, não fecham —
// figura grande e centrada fecha, espalhado não.
//
// As quatro figuras são personagens ORIGINAIS. São as ideias que a Julia
// gosta — bruxa, heroína guerreira, gato no espaço, peixe — e não as marcas
// que motivaram o pedido, que são registro de terceiros.
//
// Os nomes dos passos daqui batem com os arquivos que tools/derive-frames.py
// gerou a partir do desenho, e as caixas de região estão nos specs.

export default [
  {
    id: 't39',
    slug: 'paint-a-demon-hunter',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-demon-hunter/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-demon-hunter/hunter-template.svg',
    framePattern: 'assets/tutorials/paint-a-demon-hunter/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-rosto' },
      { veil: 'none', image: '04-espada' },
      { veil: 'none', image: '05-botas' },
      { veil: 'none', image: '06-roupa' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Caçadora de Demônios',
        description: 'Uma heroína de espada e estrela, pintada por você.',
        steps: [
          { instruction: 'Imprima o molde no papel A4.', tip: 'O desenho já vem com o contorno de cada parte. É por isso que a tinta fica no lugar.' },
          { instruction: 'Escolha as cores e ponha os potes do lado.', tip: 'Cores fortes dão cara de herói.' },
          { instruction: 'Pinte o rosto e o cabelo.', tip: 'O cabelo dela é só lápis: pinta por cima e o traço continua aparecendo.' },
          { instruction: 'Pinte a espada de cinza.', tip: 'Aço é prateado. Uma cor clara com um traço de sombra parece metal.' },
          { instruction: 'Pinte as botas de castanho.', tip: 'Botas são de couro. Marrom escuro fica mais bonito que preto chapado.' },
          { instruction: 'Pinte a roupa e a estrela.', tip: 'A estrela é de ouro: é o que ela segura na mão, e é a parte mais importante.' },
          { instruction: 'Assine e deixa secar.', tip: 'Um nome na arte mostra que ela é sua.' },
        ],
      },
      en: {
        title: 'Demon Hunter',
        description: 'The heroine with the sword and the star, painted by you.',
        steps: [
          { instruction: 'Print the template on A4 paper.', tip: 'The drawing already has the edge of every part. That is why the paint stays where you put it.' },
          { instruction: 'Choose your colours and set the pots beside you.', tip: 'Bright colours make a hero look like a hero.' },
          { instruction: 'Paint the face and the hair.', tip: 'Her hair is only pencil: paint straight over it and the line still shows.' },
          { instruction: 'Paint the sword grey.', tip: 'Steel is silvery. A light colour with one shadow line looks like metal.' },
          { instruction: 'Paint the boots brown.', tip: 'Boots are leather. Dark brown looks better than flat black.' },
          { instruction: 'Paint the clothes and the star.', tip: 'The star is gold: it is what she holds in her hand, and it is the most important part.' },
          { instruction: 'Sign it and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Cazadora de Demonios',
        description: 'Una heroína con espada y estrella, pintada por ti.',
        steps: [
          { instruction: 'Imprime la plantilla en papel A4.', tip: 'El dibujo ya trae el borde de cada parte. Por eso la pintura se queda donde la pones.' },
          { instruction: 'Elige los colores y pon los botes a tu lado.', tip: 'Los colores fuertes le dan cara de héroe.' },
          { instruction: 'Pinta la cara y el pelo.', tip: 'Su pelo es solo lápiz: pinta por encima y el trazo se sigue viendo.' },
          { instruction: 'Pinta la espada de gris.', tip: 'El acero es plateado. Un color claro con una línea de sombra parece metal.' },
          { instruction: 'Pinta las botas de marrón.', tip: 'Las botas son de cuero. El marrón oscuro queda mejor que el negro plano.' },
          { instruction: 'Pinta la ropa y la estrella.', tip: 'La estrella es de oro: es lo que ella lleva en la mano, y es la parte más importante.' },
          { instruction: 'Firma y deja secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
  {
    id: 't40',
    slug: 'paint-a-cat-astronaut',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-cat-astronaut/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-cat-astronaut/astronaut-template.svg',
    framePattern: 'assets/tutorials/paint-a-cat-astronaut/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-planeta' },
      { veil: 'none', image: '04-traje' },
      { veil: 'none', image: '05-botas' },
      { veil: 'none', image: '06-casco' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Gato Astronauta',
        description: 'Um gato no espaço, pintando e aprendendo por que cada peça existe.',
        steps: [
          { instruction: 'Imprima o molde no papel A4.', tip: 'O desenho já vem com o contorno de cada parte. É por isso que a tinta fica no lugar.' },
          { instruction: 'Escolha as cores e ponha os potes do lado.', tip: 'Cores de espaço: azul escuro, prateado e um laranja para destacar.' },
          { instruction: 'Pinte o planeta de laranja.', tip: 'Isto é Marte. Os asteroides são pedrinhas de rocha e ferro girando no espaço.' },
          { instruction: 'Pinte o traje de prateado.', tip: 'Dentro do traje tem ar. É o traje que segura o ar para o gato respirar.' },
          { instruction: 'Pinte as botas e a mochila.', tip: 'A mochila é onde fica o ar. Sem ela o gato não consegue voltar.' },
          { instruction: 'Pinte o capacete e a viseira.', tip: 'O capacete existe porque no espaço não tem ar nenhum, e a viseira é o vidro que deixa ver.' },
          { instruction: 'Assine o seu gato e deixa ele secar.', tip: 'Um nome na arte mostra que ela é sua.' },
        ],
      },
      en: {
        title: 'Cat Astronaut',
        description: 'A cat in space, painting and learning why each piece is there.',
        steps: [
          { instruction: 'Print the template on A4 paper.', tip: 'The drawing already has the edge of every part. That is why the paint stays where you put it.' },
          { instruction: 'Choose your colours and set the pots beside you.', tip: 'Space colours: dark blue, silver and one orange for a highlight.' },
          { instruction: 'Paint the planet orange.', tip: 'That is Mars. Asteroids are little rocks of stone and iron spinning in space.' },
          { instruction: 'Paint the suit silver.', tip: 'There is air inside the suit. The suit is what holds the air so the cat can breathe.' },
          { instruction: 'Paint the boots and the backpack.', tip: 'The backpack is where the air lives. Without it the cat cannot get back.' },
          { instruction: 'Paint the helmet and the visor.', tip: 'The helmet is there because space has no air at all, and the visor is the glass that lets you see.' },
          { instruction: 'Sign your cat and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Gato Astronauta',
        description: 'Un gato en el espacio, pintando y aprendiendo por qué existe cada pieza.',
        steps: [
          { instruction: 'Imprime la plantilla en papel A4.', tip: 'El dibujo ya trae el borde de cada parte. Por eso la pintura se queda donde la pones.' },
          { instruction: 'Elige los colores y pon los botes a tu lado.', tip: 'Colores del espacio: azul oscuro, plateado y un naranja para destacar.' },
          { instruction: 'Pinta el planeta de naranja.', tip: 'Eso es Marte. Los asteroides son piedritas de roca y hierro girando en el espacio.' },
          { instruction: 'Pinta el traje de plateado.', tip: 'Dentro del traje hay aire. El traje es lo que guarda el aire para que el gato respire.' },
          { instruction: 'Pinta las botas y la mochila.', tip: 'La mochila es donde vive el aire. Sin ella el gato no puede volver.' },
          { instruction: 'Pinta el casco y la visera.', tip: 'El casco existe porque en el espacio no hay aire, y la visera es el vidrio que deja ver.' },
          { instruction: 'Firma tu gato y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
  {
    id: 't41',
    slug: 'paint-a-witch-hat',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 20,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-witch-hat/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-witch-hat/witch-template.svg',
    framePattern: 'assets/tutorials/paint-a-witch-hat/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-fita' },
      { veil: 'none', image: '04-fivela' },
      { veil: 'none', image: '05-aba' },
      { veil: 'none', image: '06-cone' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Chapéu de Bruxa',
        description: 'O chapéu de bruxa, pintado do começo ao fim.',
        steps: [
          { instruction: 'Imprima o molde do chapéu no papel A4.', tip: 'Um chapéu de bruxa tem três peças: o cone, a aba e a fita. Vamos pintar uma de cada vez.' },
          { instruction: 'Escolha a cor do chapéu e ponha os potes do lado.', tip: 'Roxo é o clássico, mas verde, azul e vermelho também ficam lindos.' },
          { instruction: 'Pinte a fita em volta do chapéu.', tip: 'A fita é a parte mais bonitinha. Deixe a cor dela diferente da do chapéu.' },
          { instruction: 'Pinte a fivela.', tip: 'A fivela é o detalhe que faz parecer um chapéu de verdade e não um cone.' },
          { instruction: 'Pinte a aba de baixo.', tip: 'A aba é grande e baixa. Se você pintar a aba primeiro, a tinta respinga no meio.' },
          { instruction: 'Pinte o cone, em cima.', tip: 'O cone é a última parte porque é a que mais aparece. Uma cor só, bem lisa.' },
          { instruction: 'Assine o seu chapéu e deixa ele secar.', tip: 'Um nome na arte mostra que ele é seu.' },
        ],
      },
      en: {
        title: 'Witch Hat',
        description: 'The witch hat, painted from start to finish.',
        steps: [
          { instruction: 'Print the hat template on A4 paper.', tip: 'A witch hat has three pieces: the cone, the brim and the band. We will paint one at a time.' },
          { instruction: 'Choose the hat colour and set the pots beside you.', tip: 'Purple is the classic, but green, blue and red look lovely too.' },
          { instruction: 'Paint the band around the hat.', tip: 'The band is the prettiest part. Give it a different colour from the hat.' },
          { instruction: 'Paint the buckle.', tip: 'The buckle is the detail that makes it look like a real hat and not a cone.' },
          { instruction: 'Paint the brim at the bottom.', tip: 'The brim is big and low. If you paint it first the paint splashes into the middle.' },
          { instruction: 'Paint the cone on top.', tip: 'The cone is the last part because it is the one you see most. One colour, painted smooth.' },
          { instruction: 'Sign your hat and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Sombrero de Bruja',
        description: 'El sombrero de bruja, pintado de principio a fin.',
        steps: [
          { instruction: 'Imprime la plantilla del sombrero en papel A4.', tip: 'Un sombrero de bruja tiene tres piezas: el cono, el ala y la cinta. Vamos a pintar una a una.' },
          { instruction: 'Elige el color del sombrero y pon los botes a tu lado.', tip: 'El morado es el clásico, pero verde, azul y rojo quedan precioso.' },
          { instruction: 'Pinta la cinta alrededor del sombrero.', tip: 'La cinta es la parte más bonita. Dale un color distinto al del sombrero.' },
          { instruction: 'Pinta la hebilla.', tip: 'La hebilla es el detalle que hace que parezca un sombrero de verdad y no un cono.' },
          { instruction: 'Pinta el ala de abajo.', tip: 'El ala es grande y baja. Si la pintas primero la pintura salpica al centro.' },
          { instruction: 'Pinta el cono, arriba.', tip: 'El cono es la última parte porque es la que más se ve. Un solo color, bien liso.' },
          { instruction: 'Firma tu sombrero y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
  {
    id: 't42',
    slug: 'paint-a-clownfish',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-clownfish/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-clownfish/fish-template.svg',
    framePattern: 'assets/tutorials/paint-a-clownfish/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-corpo' },
      { veil: 'none', image: '04-barriga' },
      { veil: 'none', image: '05-nadadeiras' },
      { veil: 'none', image: '06-olho' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Peixe-Palhaço',
        description: 'Um peixe-palhaço, pintando e aprendendo para que serve cada parte.',
        steps: [
          { instruction: 'Imprima o molde do peixe no papel A4.', tip: 'O desenho já vem com o contorno de cada parte. É por isso que a tinta fica no lugar.' },
          { instruction: 'Escolha as cores e ponha os potes do lado.', tip: 'Laranja com listras brancas é o peixe-palhaço. Listras é o nome que damos a cada linha.' },
          { instruction: 'Pinte o corpo de laranja.', tip: 'O peixe-palhaço vive no mar, entre os corais. Ele não é de água doce.' },
          { instruction: 'Pinte a barriga de creme.', tip: 'A barriga é a parte de baixo, e é clara de propósito: por baixo vem a luz da água.' },
          { instruction: 'Pinte as nadadeiras e a cauda.', tip: 'A cauda é o que empurra o peixe para a frente. As nadadeiras de cima e de baixo seguram o equilíbrio.' },
          { instruction: 'Pinte o olho e a bolha.', tip: 'O olho grande é para ver no escuro do fundo do mar. A bolha é ar que sobe para a superfície.' },
          { instruction: 'Assine o seu peixe e deixa ele secar.', tip: 'Um nome na arte mostra que ele é seu.' },
        ],
      },
      en: {
        title: 'Clownfish',
        description: 'A clownfish, painting and learning what each part is for.',
        steps: [
          { instruction: 'Print the fish template on A4 paper.', tip: 'The drawing already has the edge of every part. That is why the paint stays where you put it.' },
          { instruction: 'Choose your colours and set the pots beside you.', tip: 'Orange with white stripes is the clownfish. Stripes is the name we give to each line.' },
          { instruction: 'Paint the body orange.', tip: 'The clownfish lives in the sea, among the coral. It is not a freshwater fish.' },
          { instruction: 'Paint the belly cream.', tip: 'The belly is the underside, and it is pale on purpose: light comes down from above in the water.' },
          { instruction: 'Paint the fins and the tail.', tip: 'The tail is what pushes the fish forward. The top and bottom fins keep it steady.' },
          { instruction: 'Paint the eye and the bubble.', tip: 'The big eye is for seeing in the dark down there. The bubble is air rising to the surface.' },
          { instruction: 'Sign your fish and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Pez Payaso',
        description: 'Un pez payaso, pintando y aprendiendo para qué sirve cada parte.',
        steps: [
          { instruction: 'Imprime la plantilla del pez en papel A4.', tip: 'El dibujo ya trae el borde de cada parte. Por eso la pintura se queda donde la pones.' },
          { instruction: 'Elige los colores y pon los botes a tu lado.', tip: 'Naranja con rayas blancas es el pez payaso. Rayas es el nombre que le damos a cada línea.' },
          { instruction: 'Pinta el cuerpo de naranja.', tip: 'El pez payaso vive en el mar, entre los corales. No es de agua dulce.' },
          { instruction: 'Pinta la barriga de crema.', tip: 'La barriga es la parte de abajo, y es clara a propósito: desde arriba baja la luz del agua.' },
          { instruction: 'Pinta las aletas y la cola.', tip: 'La cola es lo que empuja el pez hacia delante. Las aletas de arriba y de abajo lo mantienen firme.' },
          { instruction: 'Pinta el ojo y la burbuja.', tip: 'El ojo grande es para ver en la oscuridad del fondo del mar. La burbuja es aire que sube a la superficie.' },
          { instruction: 'Firma tu pez y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
];
