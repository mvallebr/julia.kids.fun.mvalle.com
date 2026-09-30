// Desenho e pintura: T02 a T06.
//
// Nenhuma região escrita à mão aqui. A caixa do objeto (`objectBox`) gera as seis
// regiões, então estes cinco tutoriais só escolhem QUAL nome da região cada ato
// do trabalho pede: 'top' para a parte de cima, 'bottom' para a de baixo,
// 'centre' para o meio, 'left' para um lado, 'all' quando o ato mexe na arte
// inteira (soltar as estrelas, abrir o papel e ver a cópia espelhada).
//
// O ritmo do véu é o mesmo nos cinco e segue a regra de que o véu só pode
// clarear: os três primeiros passos são 'full' (só o contorno fantasma, porque
// a arte ainda não existe), os três seguintes são 'active' com três regiões
// DIFERENTES (a parte que o ato daquela hora mexe), e o último é sempre 'none'.
// Três 'active' e nunca duas vezes a mesma região seguidas: é o que impede a
// tela de repetir duas vezes seguidas.
//
// Os `objectBox` abaixo são ESTIMATIVAS a olho. A arte final recalcula a caixa
// por pixel e troca estes cinco números: o formato e o fato de o objeto caber
// dentro de 0..1 é que não podem mudar.
//
// RASCUNHOS: os tutoriais marcados `draft: true` abaixo ficam fora da
// biblioteca publicada (ver `LIVE_TUTORIALS` em ../index.js). Eles ainda
// mostram so a foto do objeto pronto, e tutorial sem quadro proprio nao vai
// ao ar. Tirar a marca devolve o tutorial.


export default [
  {
    id: 't02',
    // Fora da biblioteca por enquanto: o quadro único não mostra a construção.
    draft: true,
    slug: 'watercolour-galaxy',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 20,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/watercolour-galaxy/base.webp',
    objectBox: { x: 0.06, y: 0.08, w: 0.88, h: 0.84 },
    materials: ['material.paper', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'full' },
      { veil: 'full', swatches: true },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'top' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Galáxia de Aguarela',
        description: 'Manchas de cor que se misturam na água e viram um céu cheio de estrelas.',
        steps: [
          { instruction: 'Molhe a folha toda com um pincel bem molhado.', tip: 'Só um pouco de água: papel molhado demais rasga.' },
          { instruction: 'Pinte manchas de azul e roxo no papel.', tip: 'Manchas grandes ficam mais bonitas que muitas pequenas.' },
          { instruction: 'Misture as cores enquanto a tinta ainda estiver molhada.', tip: 'Leve o pincel de uma cor para a outra bem devagar.' },
          { instruction: 'Pinte uma borda mais escura em volta da mancha.', tip: 'Essa borda escura aparece sozinha na beira da água.' },
          { instruction: 'Jogue gotinhas brancas pelo papel.', tip: 'Molhe a ponta do pincel na tinta branca e bata o pincel na sua mão.' },
          { instruction: 'Pinte uma estrela grande ou uma lua.', tip: 'Uma forma só, bem grande, brilha mais que várias pequenas.' },
          { instruction: 'Deixe secar e mostre a sua galáxia.', tip: 'A tinta fica mais bonita quando seca de verdade.' },
        ],
      },
      en: {
        title: 'Watercolour Galaxy',
        description: 'Patches of colour that blend in the water and turn into a sky full of stars.',
        steps: [
          { instruction: 'Wet the whole sheet with a very wet brush.', tip: 'Just a little water: a sheet that is too wet tears.' },
          { instruction: 'Paint patches of blue and purple on the paper.', tip: 'Big patches look nicer than lots of small ones.' },
          { instruction: 'Blend the colours while the paint is still wet.', tip: 'Take the brush from one colour to the other very slowly.' },
          { instruction: 'Paint a darker edge around the patch.', tip: 'That dark edge shows up by itself at the rim of the water.' },
          { instruction: 'Flick tiny white dots over the paper.', tip: 'Dip the brush tip in white paint and tap the brush on your hand.' },
          { instruction: 'Paint one big star or a moon.', tip: 'One big shape shines more than lots of small ones.' },
          { instruction: 'Let it dry and show your galaxy.', tip: 'The paint looks better once it is really dry.' },
        ],
      },
      es: {
        title: 'Galaxia de Acuarela',
        description: 'Manchas de color que se mezclan en el agua y se vuelven un cielo lleno de estrellas.',
        steps: [
          { instruction: 'Moja toda la hoja con un pincel bien mojado.', tip: 'Solo un poco de agua: una hoja demasiado mojada se rompe.' },
          { instruction: 'Pinta manchas de azul y morado en el papel.', tip: 'Las manchas grandes quedan mejor que muchas pequeñas.' },
          { instruction: 'Mezcla los colores mientras la pintura siga mojada.', tip: 'Lleva el pincel de un color al otro muy despacio.' },
          { instruction: 'Pinta un borde más oscuro alrededor de la mancha.', tip: 'Ese borde oscuro sale solo en el borde del agua.' },
          { instruction: 'Salpica gotitas blancas por el papel.', tip: 'Moja la punta del pincel en pintura blanca y golpéalo contra la mano.' },
          { instruction: 'Pinta una estrella grande o una luna.', tip: 'Una sola forma, bien grande, brilla más que muchas pequeñas.' },
          { instruction: 'Deja secar y enseña tu galaxia.', tip: 'La pintura queda más bonita cuando está bien seca.' },
        ],
      },
    },
  },
  {
    id: 't03',
    // Fora da biblioteca por enquanto: o quadro único não mostra a construção.
    draft: true,
    slug: 'symmetry-butterfly',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 15,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/symmetry-butterfly/base.webp',
    printable: 'assets/tutorials/symmetry-butterfly/butterfly-template.svg',
    objectBox: { x: 0.14, y: 0.16, w: 0.72, h: 0.68 },
    materials: ['material.paper', 'material.paint', 'material.pencils'],
    steps: [
      { veil: 'full', printable: true },
      { veil: 'full' },
      { veil: 'full', swatches: true },
      { veil: 'active', region: 'left' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'centre' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Borboleta Simétrica',
        description: 'Pinte uma metade, dobre o papel e a borboleta se copia sozinha do outro lado.',
        steps: [
          { instruction: 'Imprima o molde da borboleta e dobre ao meio.', tip: 'A dobra tem que passar bem pelo meio da folha.' },
          { instruction: 'Abra o papel e ache a linha do meio.', tip: 'Essa linha é a sua guia: tudo sai igual dos dois lados.' },
          { instruction: 'Pinte só a metade esquerda, com a tinta.', tip: 'Comece na linha do meio e vá pintando para fora.' },
          { instruction: 'Feche o papel e pressione de leve.', tip: 'Passe a mão por cima com cuidado, sem apertar forte.' },
          { instruction: 'Abra o papel e veja a surpresa.', tip: 'O que você pintou de um lado apareceu do outro, espelhado.' },
          { instruction: 'Desenhe o corpo da borboleta bem no meio.', tip: 'Um corpo fininho e uma cabeça redonda, em cima da dobra.' },
          { instruction: 'Faça as antenas e alguns detalhezinhos.', tip: 'Antenas curvadas para fora parecem mais bonitas que retas.' },
        ],
      },
      en: {
        title: 'Symmetry Butterfly',
        description: 'Paint one half, fold the paper, and the butterfly copies itself on the other side.',
        steps: [
          { instruction: 'Print the butterfly template and fold it in half.', tip: 'The fold has to go right through the middle of the sheet.' },
          { instruction: 'Open the paper and find the middle line.', tip: 'That line is your guide: everything comes out the same on both sides.' },
          { instruction: 'Paint only the left half, with the paint.', tip: 'Start on the middle line and keep going outwards.' },
          { instruction: 'Fold the paper back and press gently.', tip: 'Rub your hand over the top, careful not to press too hard.' },
          { instruction: 'Open the paper and see the surprise.', tip: 'What you painted on one side shows up on the other, backwards.' },
          { instruction: 'Draw the butterfly body right down the middle.', tip: 'A thin body and a round head, sitting on the fold.' },
          { instruction: 'Add the antennae and a few tiny details.', tip: 'Antennae that curve outwards look nicer than straight ones.' },
        ],
      },
      es: {
        title: 'Mariposa Simétrica',
        description: 'Pinta una mitad, dobla el papel y la mariposa se copia sola al otro lado.',
        steps: [
          { instruction: 'Imprime la plantilla de la mariposa y dóblala por la mitad.', tip: 'El doblez tiene que pasar justo por el centro de la hoja.' },
          { instruction: 'Abre el papel y busca la línea del medio.', tip: 'Esa línea es tu guía: todo sale igual en los dos lados.' },
          { instruction: 'Pinta solo la mitad izquierda, con la pintura.', tip: 'Empieza en la línea del medio y ve pintando hacia fuera.' },
          { instruction: 'Cierra el papel y presiona suavemente.', tip: 'Pasa la mano por encima con cuidado, sin apretar mucho.' },
          { instruction: 'Abre el papel y mira la sorpresa.', tip: 'Lo que pintaste en un lado aparece en el otro, del revés.' },
          { instruction: 'Dibuja el cuerpo de la mariposa justo en el centro.', tip: 'Un cuerpo fino y una cabeza redonda, encima del doblez.' },
          { instruction: 'Añade las antenas y unos detallitos.', tip: 'Las antenas curvas hacia fuera quedan mejor que las rectas.' },
        ],
      },
    },
  },
  {
    id: 't04',
    // Fora da biblioteca por enquanto: o quadro único não mostra a construção.
    draft: true,
    slug: 'sunset-silhouette',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/sunset-silhouette/base.webp',
    objectBox: { x: 0.06, y: 0.08, w: 0.88, h: 0.84 },
    materials: ['material.paper', 'material.paint', 'material.pen'],
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'bottom' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Pôr do Sol em Silhueta',
        description: 'Um céu de cores quentes e um chão todo preto, cheio de árvores e bichinhos.',
        steps: [
          { instruction: 'Pinte uma faixa amarela na parte de baixo do papel.', tip: 'Faça a faixa bem reta, de um lado ao outro.' },
          { instruction: 'Pinte laranja em cima da faixa amarela.', tip: 'Aperte o pincel de leve e deixe a tinta correr para cima.' },
          { instruction: 'Pinte vermelho ou rosa perto do topo do papel.', tip: 'A cor fica mais forte em cima, onde o céu é mais escuro.' },
          { instruction: 'Deixe o fundo secar antes de continuar.', tip: 'Se a tinta ainda estiver molhada, as cores se misturam.' },
          { instruction: 'Pinte o chão todo de preto.', tip: 'Uma linha reta por cima deixa o chão bem definido.' },
          { instruction: 'Faça as árvores, as casinhas e os bichinhos no escuro.', tip: 'Qualquer forma preta vira parte da paisagem.' },
          { instruction: 'Pinte um solzinho ou uma lua e assine a sua arte.', tip: 'Uma forma clara pequena brilha mais sobre o céu escuro.' },
        ],
      },
      en: {
        title: 'Sunset Silhouette',
        description: 'A sky of warm colours over a ground painted black, full of trees and little animals.',
        steps: [
          { instruction: 'Paint a yellow strip along the bottom of the paper.', tip: 'Keep the strip straight, from one side to the other.' },
          { instruction: 'Paint orange above the yellow strip.', tip: 'Press the brush lightly and let the paint run upwards.' },
          { instruction: 'Paint red or pink near the top of the paper.', tip: 'The colour gets stronger up top, where the sky is darkest.' },
          { instruction: 'Let the background dry before you go on.', tip: 'If the paint is still wet, the colours run into each other.' },
          { instruction: 'Paint the whole ground black.', tip: 'A straight line along the top keeps the ground neat.' },
          { instruction: 'Add the trees, the little houses and the animals in the dark.', tip: 'Any black shape becomes part of the view.' },
          { instruction: 'Paint a small sun or a moon and sign your work.', tip: 'A small light shape shines more against a dark sky.' },
        ],
      },
      es: {
        title: 'Puesta de Sol en Silueta',
        description: 'Un cielo de colores cálidos sobre un suelo pintado de negro, lleno de árboles y animalitos.',
        steps: [
          { instruction: 'Pinta una franja amarilla en la parte de abajo del papel.', tip: 'Haz la franja bien recta, de un lado al otro.' },
          { instruction: 'Pinta naranja encima de la franja amarilla.', tip: 'Aprieta el pincel sin fuerza y deja que la pintura suba.' },
          { instruction: 'Pinta rojo o rosa cerca de la parte de arriba del papel.', tip: 'El color se hace más fuerte arriba, donde el cielo es más oscuro.' },
          { instruction: 'Deja secar el fondo antes de seguir.', tip: 'Si la pintura sigue mojada, los colores se mezclan.' },
          { instruction: 'Pinta todo el suelo de negro.', tip: 'Una línea recta por arriba deja el suelo bien limpio.' },
          { instruction: 'Añade los árboles, las casitas y los animalitos en la parte oscura.', tip: 'Cualquier forma negra se vuelve parte del paisaje.' },
          { instruction: 'Pinta un sol pequeño o una luna y firma tu cuadro.', tip: 'Una forma clara pequeña brilla más sobre el cielo oscuro.' },
        ],
      },
    },
  },
  {
    id: 't05',
    // Fora da biblioteca por enquanto: o quadro único não mostra a construção.
    draft: true,
    slug: 'fingerprint-flower-garden',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 15,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/fingerprint-flower-garden/base.webp',
    objectBox: { x: 0.10, y: 0.10, w: 0.80, h: 0.80 },
    materials: ['material.paint', 'material.paper', 'material.pen'],
    steps: [
      { veil: 'full' },
      { veil: 'full', swatches: true },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Jardim de Flores de Digitais',
        description: 'Um jardim inteiro pintado com a ponta dos dedos, cada marca com uma cor.',
        steps: [
          { instruction: 'Desenhe hastes simples saindo do chão.', tip: 'Uma linha reta com uma curva no topo já é uma haste.' },
          { instruction: 'Faça uma flor com a ponta do dedo.', tip: 'Molhe o dedo na tinta, toque o papel e levante devagar.' },
          { instruction: 'Experimente flores com duas cores.', tip: 'Pinte só metade do dedo e a flor sai com duas cores.' },
          { instruction: 'Desenhe as folhas nas hastes.', tip: 'Uma folha com um risco no meio parece mais verdinha.' },
          { instruction: 'Faça abelhas e borboletas com as pontas dos dedos.', tip: 'Duas marcas lado a lado viram asas lindas.' },
          { instruction: 'Preencha os espaços que sobraram vazios.', tip: 'Uma cor diferente em cada canto deixa o jardim bem cheio.' },
          { instruction: 'Escreva seu nome e a data de hoje.', tip: 'A data conta a idade do seu jardim.' },
        ],
      },
      en: {
        title: 'Fingerprint Flower Garden',
        description: 'A whole garden painted with the tip of your fingers, every print in its own colour.',
        steps: [
          { instruction: 'Draw simple stems coming up from the ground.', tip: 'A straight line with a curve on top already makes a stem.' },
          { instruction: 'Make one flower with the tip of your finger.', tip: 'Dip the finger in the paint, touch the paper and lift slowly.' },
          { instruction: 'Try flowers with two colours.', tip: 'Paint only half the finger and the flower comes out in two colours.' },
          { instruction: 'Draw the leaves on the stems.', tip: 'A leaf with a line down the middle looks greener.' },
          { instruction: 'Make bees and butterflies with your fingertips.', tip: 'Two prints side by side turn into lovely wings.' },
          { instruction: 'Fill in the spaces that are still empty.', tip: 'A different colour in every corner fills the whole garden.' },
          { instruction: "Write your name and today's date.", tip: 'The date tells how old your garden is.' },
        ],
      },
      es: {
        title: 'Jardín de Flores con Huellas',
        description: 'Un jardín entero pintado con la punta de los dedos, cada huella con su color.',
        steps: [
          { instruction: 'Dibuja tallos sencillos que suben desde el suelo.', tip: 'Una línea recta con una curva arriba ya es un tallo.' },
          { instruction: 'Haz una flor con la punta del dedo.', tip: 'Moja el dedo en la pintura, toca el papel y levántalo despacio.' },
          { instruction: 'Prueba flores con dos colores.', tip: 'Pinta solo medio dedo y la flor sale con dos colores.' },
          { instruction: 'Dibuja las hojas en los tallos.', tip: 'Una hoja con un rayo en el medio parece más verde.' },
          { instruction: 'Haz abejas y mariposas con las yemas de los dedos.', tip: 'Dos marcas una al lado de la otra se vuelven alas bonitas.' },
          { instruction: 'Rellena los espacios que queden vacíos.', tip: 'Un color distinto en cada rincón llena todo el jardín.' },
          { instruction: 'Escribe tu nombre y la fecha de hoy.', tip: 'La fecha dice la edad de tu jardín.' },
        ],
      },
    },
  },
  {
    id: 't06',
    // Fora da biblioteca por enquanto: o quadro único não mostra a construção.
    draft: true,
    slug: 'create-a-comic-character',
    category: 'drawing-painting',
    difficulty: 2,
    estimatedMinutes: 30,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/create-a-comic-character/base.webp',
    objectBox: { x: 0.20, y: 0.08, w: 0.60, h: 0.84 },
    materials: ['material.paper', 'material.pencils', 'material.crayons'],
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'bottom' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'top' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Crie um Personagem de Gibi',
        description: 'Da cabeça à roupa, um personagem seu com rosto, poder e uma cena para viver.',
        steps: [
          { instruction: 'Escolha uma forma simples para a cabeça.', tip: 'Círculo, quadrado ou oval: tanto faz, o que importa é o personagem.' },
          { instruction: 'Desenhe dois olhos e uma boca.', tip: 'Olhos redondos e uma boca grande deixam o personagem simpático.' },
          { instruction: 'Escolha um penteado.', tip: 'Cabelo reto, cacheado ou espetado: os três funcionam bem.' },
          { instruction: 'Desenhe a roupa do personagem.', tip: 'Uma camiseta e umas calças já dão um personagem inteiro.' },
          { instruction: 'Dê um objeto especial para o seu personagem.', tip: 'Uma espada, um chapéu ou um poder: escolha um só e mostre na cena.' },
          { instruction: 'Desenhe três caras: feliz, bravo e surpreso.', tip: 'Mude só a boca e as sobrancelhas; o resto fica igual.' },
          { instruction: 'Desenhe uma cena curtinha com o seu personagem.', tip: 'Uma bolha de fala deixa claro o que ele está dizendo.' },
        ],
      },
      en: {
        title: 'Create a Comic Character',
        description: 'From head to outfit, your own character with a face, a power and a scene to live in.',
        steps: [
          { instruction: 'Pick a simple shape for the head.', tip: 'Circle, square or oval: it does not matter, the character is what counts.' },
          { instruction: 'Draw two eyes and a mouth.', tip: 'Round eyes and a big mouth make a character friendly.' },
          { instruction: 'Choose a hairstyle.', tip: 'Straight, curly or spiky hair: all three work.' },
          { instruction: 'Draw the character outfit.', tip: 'A t-shirt and some trousers already make a whole character.' },
          { instruction: 'Give your character one special object.', tip: 'A sword, a hat or a power: pick just one and show it in the scene.' },
          { instruction: 'Draw three faces: happy, angry and surprised.', tip: 'Change only the mouth and the eyebrows; the rest stays the same.' },
          { instruction: 'Draw a short scene with your character in it.', tip: 'A speech bubble makes it clear what they are saying.' },
        ],
      },
      es: {
        title: 'Crea un Personaje de Cómic',
        description: 'De la cabeza a la ropa, tu propio personaje con cara, un poder y una escena donde vivir.',
        steps: [
          { instruction: 'Elige una forma sencilla para la cabeza.', tip: 'Círculo, cuadrado u óvalo: da igual, lo que importa es el personaje.' },
          { instruction: 'Dibuja dos ojos y una boca.', tip: 'Los ojos redondos y una boca grande hacen que el personaje sea simpático.' },
          { instruction: 'Elige un peinado.', tip: 'Liso, rizado o de puntas: los tres sirven.' },
          { instruction: 'Dibuja la ropa del personaje.', tip: 'Una camiseta y unos pantalones ya hacen un personaje entero.' },
          { instruction: 'Dale un objeto especial a tu personaje.', tip: 'Una espada, un sombrero o un poder: elige solo uno y enséñalo en la escena.' },
          { instruction: 'Dibuja tres caras: feliz, enfadada y sorprendida.', tip: 'Cambia solo la boca y las cejas; lo demás se queda igual.' },
          { instruction: 'Dibuja una escena corta con tu personaje dentro.', tip: 'Un bocadillo deja claro lo que está diciendo.' },
        ],
      },
    },
  },
];
