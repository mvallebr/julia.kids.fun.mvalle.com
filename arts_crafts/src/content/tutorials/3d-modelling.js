// 3D modelling é a única seção em que a criança não está pintando nada: ela
// está vendo a forma aparecer na tela. Isso muda a VOZ do texto.
//
// Nas outras seções o imperative é o certo ("pinte as orelhas"), porque a mão
// da criança é quem faz. Aqui a imagem já mostra o resultado pronto, então o
// passo descreve o que está na tela — "a esfera foi duplicada duas vezes",
// "duas esferas viraram os botões". Ensinar a modelar é mostrar a sequência de
// decisões, não a mão de ninguém.
//
// O véu só clareia, então os três primeiros passos (uma esfera, duplicar,
// mudar de tamanho) ainda não formam boneco nenhum: eles mostram o contorno
// fantasma. O boneco de verdade aparece a partir do empilhamento.
//
// Os materiais são só o caderno de rascunho: o modelo em si é feito na tela.
//
// RASCUNHOS: os tutoriais marcados `draft: true` abaixo ficam fora da
// biblioteca publicada (ver `LIVE_TUTORIALS` em ../index.js). Eles ainda
// mostram so a foto do objeto pronto, e tutorial sem quadro proprio nao vai
// ao ar. Tirar a marca devolve o tutorial.


export default [
  {
    id: 't34',
    slug: 'build-a-3d-snowman',
    category: '3d-modelling',
    difficulty: 1,
    estimatedMinutes: 20,
    baseImage: 'assets/tutorials/build-a-3d-snowman/base.webp',
    materials: ['material.paper', 'material.pencils'],
    framePattern: 'assets/tutorials/build-a-3d-snowman/step-%s.webp',
    materials: ['material.paper', 'material.pencils'],
    steps: [
      { veil: 'none', image: '01-esfera' },
      { veil: 'none', image: '02-duplicar' },
      { veil: 'none', image: '03-tamanhos' },
      { veil: 'none', image: '04-empilhar' },
      { veil: 'none', image: '05-olhos' },
      { veil: 'none', image: '06-bico' },
      { veil: 'none', image: '07-chapeu' },
    ],
    copy: {
      pt: {
        title: 'Boneco de Neve 3D',
        description: 'Um boneco de neve montado só com esferas e um cone.',
        steps: [
          { instruction: 'Uma esfera sozinha ficou no meio da tela.', tip: 'Toda forma 3D começa com uma esfera: é a mais fácil de mexer.' },
          { instruction: 'A esfera foi duplicada duas vezes.', tip: 'Duplicar faz cópias iguais, e cada cópia pode mudar depois.' },
          { instruction: 'As esferas mudaram de tamanho: uma grande, uma média e uma pequena.', tip: 'Escala é o tamanho da forma. Mudar o tamanho muda o desenho na tela.' },
          { instruction: 'As esferas foram empilhadas, uma em cima da outra.', tip: 'Para empilhar, mude a altura de cada forma até elas se encontrarem.' },
          { instruction: 'Duas esferas pequenas viraram os olhos e três viraram os botões.', tip: 'Repetir a mesma forma pequena deixa os detalhes todos iguais.' },
          { instruction: 'Um cone laranja virou o nariz.', tip: 'O cone é a forma mais simples para bicos e pontas.' },
          { instruction: 'Um chapéu simples entrou no topo da cabeça.', tip: 'A última forma costuma ser a menor, e ela sempre sobe para o alto.' },
        ],
      },
      en: {
        title: '3D Snowman from Shapes',
        description: 'A snowman assembled only from spheres and one cone.',
        steps: [
          { instruction: 'One sphere sat by itself in the middle of the screen.', tip: 'Every 3D shape starts as a sphere: it is the easiest one to move.' },
          { instruction: 'The sphere was duplicated twice.', tip: 'Duplicating makes identical copies, and each copy can change later.' },
          { instruction: 'The spheres changed size: one big, one medium, one small.', tip: 'Scale is the size of a shape. Change the size and the picture changes.' },
          { instruction: 'The spheres were stacked, one on top of another.', tip: 'To stack them, change the height of each shape until they meet.' },
          { instruction: 'Two small spheres became the eyes and three became the buttons.', tip: 'Repeating the same small shape keeps all the details looking the same.' },
          { instruction: 'An orange cone became the nose.', tip: 'A cone is the simplest shape for a beak or a point.' },
          { instruction: 'A simple hat went on top of the head.', tip: 'The last shape is usually the smallest one, and it always goes high.' },
        ],
      },
      es: {
        title: 'Muñeco de Nieve 3D',
        description: 'Un muñeco de nieve montado solo con esferas y un cono.',
        steps: [
          { instruction: 'Una esfera sola quedó en el centro de la pantalla.', tip: 'Toda forma 3D empieza con una esfera: es la más fácil de mover.' },
          { instruction: 'La esfera se duplicó dos veces.', tip: 'Duplicar hace copias iguales, y cada copia puede cambiar después.' },
          { instruction: 'Las esferas cambiaron de tamaño: una grande, una mediana y una pequeña.', tip: 'La escala es el tamaño de la forma. Cambia el tamaño y cambia el dibujo.' },
          { instruction: 'Las esferas se apilaron, una encima de otra.', tip: 'Para apilarlas, cambia la altura de cada forma hasta que se encuentren.' },
          { instruction: 'Dos esferas pequeñas se volvieron los ojos y tres los botones.', tip: 'Repetir la misma forma pequeña hace que todos los detalles sean iguales.' },
          { instruction: 'Un cono naranja se volvió el pico.', tip: 'El cono es la forma más sencilla para un pico o una punta.' },
          { instruction: 'Un sombrero sencillo se puso en lo alto de la cabeza.', tip: 'La última forma suele ser la más pequeña, y siempre sube.' },
        ],
      },
    },
  },
  {
    id: 't35',
    slug: 'build-a-simple-3d-owl',
    category: '3d-modelling',
    difficulty: 2,
    estimatedMinutes: 30,
    baseImage: 'assets/tutorials/build-a-simple-3d-owl/base.webp',
    materials: ['material.paper', 'material.pencils'],
    framePattern: 'assets/tutorials/build-a-simple-3d-owl/step-%s.webp',
    materials: ['material.paper', 'material.pencils'],
    steps: [
      { veil: 'none', image: '01-corpo' },
      { veil: 'none', image: '02-olhos' },
      { veil: 'none', image: '03-bico' },
      { veil: 'none', image: '04-asas' },
      { veil: 'none', image: '05-pes' },
      { veil: 'none', image: '06-espelhar' },
      { veil: 'none', image: '07-cores' },
    ],
    copy: {
      pt: {
        title: 'Coruja 3D Simples',
        description: 'Uma coruja montada com poucas formas, como no computador.',
        steps: [
          { instruction: 'Uma esfera achatada virou o corpo da coruja.', tip: 'Achatar é alargar de um lado e encurtar do outro.' },
          { instruction: 'Duas esferas grandes entraram como os olhos.', tip: 'Olhos grandes e redondos fazem um bicho parecer simpático.' },
          { instruction: 'Um cone pequeno ficou no lugar do bico.', tip: 'O bico é pequeno e fica bem no meio, entre os dois olhos.' },
          { instruction: 'Duas formas achatadas viraram as asas.', tip: 'Asas são formas achatadas que ficam dos dois lados do corpo.' },
          { instruction: 'Duas forminhas pequenas viraram os pés.', tip: 'Detalhes pequenos entram embaixo, onde o corpo encontra o chão.' },
          { instruction: 'As partes iguais foram duplicadas e espelhadas.', tip: 'Espelhar copia um lado para o outro, e os dois ficam iguais.' },
          { instruction: 'Cada parte da coruja ganhou a sua cor.', tip: 'Uma cor por parte deixa o modelo muito mais fácil de ler.' },
        ],
      },
      en: {
        title: 'Simple 3D Owl',
        description: 'An owl put together from a few shapes, just like on a computer.',
        steps: [
          { instruction: 'A squashed sphere became the owl body.', tip: 'Squashing means making a shape wide on one side and short on the other.' },
          { instruction: 'Two big spheres went in as the eyes.', tip: 'Big round eyes make an animal look friendly.' },
          { instruction: 'A small cone sat in the middle as the beak.', tip: 'The beak is small and goes right between the two eyes.' },
          { instruction: 'Two flat shapes became the wings.', tip: 'Wings are flat shapes that sit on both sides of the body.' },
          { instruction: 'Two tiny shapes became the feet.', tip: 'Small details go at the bottom, where the body meets the ground.' },
          { instruction: 'The matching parts were duplicated and mirrored.', tip: 'Mirroring copies one side onto the other so both look the same.' },
          { instruction: 'Every part of the owl got its own colour.', tip: 'One colour per part makes the model much easier to read.' },
        ],
      },
      es: {
        title: 'Búho 3D Sencillo',
        description: 'Un búho montado con pocas formas, como en el ordenador.',
        steps: [
          { instruction: 'Una esfera achatada se volvió el cuerpo del búho.', tip: 'Achatar es ensanchar por un lado y acortar por el otro.' },
          { instruction: 'Dos esferas grandes entraron como los ojos.', tip: 'Los ojos grandes y redondos hacen que un animal parezca simpático.' },
          { instruction: 'Un cono pequeño quedó en el medio como el pico.', tip: 'El pico es pequeño y va justo entre los dos ojos.' },
          { instruction: 'Dos formas planas se volvieron las alas.', tip: 'Las alas son formas planas que van a los dos lados del cuerpo.' },
          { instruction: 'Dos formas pequeñitas se volvieron los pies.', tip: 'Los detalles pequeños van abajo, donde el cuerpo toca el suelo.' },
          { instruction: 'Las partes iguales se duplicaron y se reflejaron.', tip: 'Reflejar copia un lado al otro, y así los dos quedan iguales.' },
          { instruction: 'Cada parte del búho recibió su propio color.', tip: 'Un color por parte hace que el modelo se lea mucho mejor.' },
        ],
      },
    },
  },
  {
    id: 't36',
    slug: 'build-a-3d-rocket',
    category: '3d-modelling',
    difficulty: 2,
    estimatedMinutes: 30,
    baseImage: 'assets/tutorials/build-a-3d-rocket/base.webp',
    materials: ['material.paper', 'material.pencils'],
    framePattern: 'assets/tutorials/build-a-3d-rocket/step-%s.webp',
    materials: ['material.paper', 'material.pencils'],
    steps: [
      { veil: 'none', image: '01-cilindro' },
      { veil: 'none', image: '02-cone' },
      { veil: 'none', image: '03-aletas' },
      { veil: 'none', image: '04-janelas' },
      { veil: 'none', image: '05-motor' },
      { veil: 'none', image: '06-cores' },
      { veil: 'none', image: '07-plataforma' },
    ],
    copy: {
      pt: {
        title: 'Foguete 3D',
        description: 'Um foguete com cilindro, cone e três aletas.',
        steps: [
          { instruction: 'Um cilindro ficou de pé no meio da tela.', tip: 'O cilindro é a forma do corpo de um foguete.' },
          { instruction: 'Um cone entrou em cima do cilindro.', tip: 'O cone dá a ponta do foguete e aponta para o céu.' },
          { instruction: 'Três aletas foram colocadas na parte de baixo.', tip: 'Aletas em volta seguram o foguete enquanto ele sobe.' },
          { instruction: 'A janela foi duplicada uma ao lado da outra.', tip: 'Duplicar em fila deixa todas as janelas do mesmo tamanho.' },
          { instruction: 'Uma forma no fundo virou o motor.', tip: 'O motor fica embaixo, apontando para baixo.' },
          { instruction: 'O foguete ganhou cores: corpo, ponta e janela.', tip: 'Cores diferentes deixam cada parte mais fácil de ver.' },
          { instruction: 'O foguete ficou parado sobre uma plataforma de lançamento.', tip: 'Pousar o modelo numa base mostra que ele é um objeto do espaço.' },
        ],
      },
      en: {
        title: '3D Rocket',
        description: 'A rocket with a cylinder, a cone and three fins.',
        steps: [
          { instruction: 'A cylinder stood up in the middle of the screen.', tip: 'The cylinder is the body shape of a rocket.' },
          { instruction: 'A cone was added on top of the cylinder.', tip: 'The cone gives the rocket its point and aims it at the sky.' },
          { instruction: 'Three fins were added at the bottom.', tip: 'Fins all around hold the rocket steady while it goes up.' },
          { instruction: 'The window was duplicated again and again.', tip: 'Duplicating in a row keeps every window the same size.' },
          { instruction: 'A shape at the back became the engine.', tip: 'The engine sits at the bottom, pointing down.' },
          { instruction: 'The rocket got its colours: body, tip and window.', tip: 'Different colours make each part easier to see.' },
          { instruction: 'The rocket was posed above a simple launch pad.', tip: 'Resting the model on a base shows that it is an object from space.' },
        ],
      },
      es: {
        title: 'Cohete 3D',
        description: 'Un cohete con cilindro, cono y tres aletas.',
        steps: [
          { instruction: 'Un cilindro se puso de pie en el centro de la pantalla.', tip: 'El cilindro es la forma del cuerpo de un cohete.' },
          { instruction: 'Un cono se añadió encima del cilindro.', tip: 'El cono da la punta del cohete y lo apunta al cielo.' },
          { instruction: 'Se añadieron tres aletas en la parte de abajo.', tip: 'Las aletas alrededor sujetan el cohete mientras sube.' },
          { instruction: 'La ventana se duplicó una al lado de la otra.', tip: 'Duplicar en fila deja todas las ventanas del mismo tamaño.' },
          { instruction: 'Una forma en la parte de atrás se volvió el motor.', tip: 'El motor va abajo, apuntando hacia el suelo.' },
          { instruction: 'El cohete recibió sus colores: cuerpo, punta y ventana.', tip: 'Colores distintos dejan cada parte más fácil de ver.' },
          { instruction: 'El cohete quedó colocado sobre una plataforma de lanzamiento.', tip: 'Poner el modelo sobre una base muestra que es un objeto del espacio.' },
        ],
      },
    },
  },
];
