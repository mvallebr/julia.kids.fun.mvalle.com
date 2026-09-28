// A coruja é a lição que abre a biblioteca, e a única com regiões escritas à
// mão: é a mais bem repartida (orelhas, corpo, asas, olhos) e a que mostra por
// que cada passo precisa acrescentar algo visível na tela.
//
// O corpo NÃO é uma elipse só. Uma elipse engoliria os olhos, e aí o passo
// "faça os olhos" viraria a mesma tela duas vezes. Por isso o corpo são faixas
// que contornam o vão dos olhos, mais as duas asas e os pés.
//
// As coordenadas foram medidas numa grade de 5% sobre o base.webp que é
// SERVIDO — a imagem que a criança vê, e não um recorte ampliado. A primeira
// medição foi feita sobre um recorte 2x e errou as orelhas em 7% para a
// direita: o anel cortava a orelha ao meio. Medir na imagem final, sempre.

export default [
  {
    id: 't01',
    slug: 'paint-a-cute-owl',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    // A capa do card e o quadro pronto, o mesmo que a crianca ve no fim.
    baseImage: 'assets/tutorials/paint-a-cute-owl/step-07-assinado.webp',
    printable: 'assets/tutorials/paint-a-cute-owl/owl-template.svg',
    // Cada passo tem uma imagem PROPRIA, e todas sao o MESMO desenho a lapis
    // sendo pintado - nao sete artes diferentes. A sequencia e coerente porque
    // as sete sao o mesmo desenho com regioes acesas em ordem, e cada regiao
    // e a area que o proprio lapis fechou, entao a tinta nunca vaza do formato.
    // Os ids batem com as regioes que existem no desenho: nao ha passo
    // "orelhas" porque o tufo faz parte de uma unica regiao com a cabeca, e
    // dois quadros identicos seguidos seriam piores do que nao ter o passo.
    framePattern: 'assets/tutorials/paint-a-cute-owl/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-bico' },
      { veil: 'none', image: '04-corpo' },
      { veil: 'none', image: '05-asas' },
      { veil: 'none', image: '06-rosto' },
      { veil: 'none', image: '07-assinado' },
    ],
    copy: {
      pt: {
        title: 'Corujinha Pintada',
        description: 'Uma corujinha de papel, pintada por você do começo ao fim.',
        steps: [
          { instruction: 'Imprima o molde da corujinha no papel A4.', tip: 'O molde vem com o contorno de dentro também: penas, asas, bico e patas. É por isso que dá para pintar.' },
          { instruction: 'Escolha três cores e coloque os potes do lado.', tip: 'Uma cor clara, uma escura e uma de destaque deixa tudo mais bonito.' },
          { instruction: 'Pinte o bico e as patas de laranja.', tip: 'Detalhes pequenos primeiro. Sai melhor do que começar pela parte grande.' },
          { instruction: 'Pinte o corpo todo de marrom.', tip: 'Cada pena é um tracinho. Siga o desenho e ela aparece sozinha.' },
          { instruction: 'Pinte as asas num marrom mais escuro.', tip: 'A asa mais escova faz a coruja parecer com volume.' },
          { instruction: 'Pinte o rosto e o peito de creme.', tip: 'Deixe o branco dos olhos e a pupila preta por último, no fim.' },
          { instruction: 'Assine a sua coruja e deixa ela secar.', tip: 'Um nome na arte mostra que ela é sua.' },
        ],
      },
      en: {
        title: 'Cute Painted Owl',
        description: 'A paper owl, painted by you from start to finish.',
        steps: [
          { instruction: 'Print the owl template on A4 paper.', tip: 'The template has the inside lines too: feathers, wings, beak and feet. That is what makes it paintable.' },
          { instruction: 'Choose three colours and set the pots beside you.', tip: 'One light colour, one dark colour and one highlight looks the best.' },
          { instruction: 'Paint the beak and the feet orange.', tip: 'Small details first. It comes out better than starting with the big part.' },
          { instruction: 'Paint the whole body brown.', tip: 'Every feather is a little line. Follow the drawing and they show up on their own.' },
          { instruction: 'Paint the wings a darker brown.', tip: 'The darker wing is what makes the owl look like it has depth.' },
          { instruction: 'Paint the face and the chest cream.', tip: 'Save the white of the eyes and the black pupils for the very end.' },
          { instruction: 'Sign your owl and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Búho Pintado',
        description: 'Un búho de papel, pintado por ti de principio a fin.',
        steps: [
          { instruction: 'Imprime la plantilla del búho en papel A4.', tip: 'La plantilla trae también las líneas de dentro: plumas, alas, pico y patas. Por eso se puede pintar.' },
          { instruction: 'Elige tres colores y pon los botes a tu lado.', tip: 'Un color claro, uno oscuro y uno de luz queda lo mejor.' },
          { instruction: 'Pinta el pico y las patas de naranja.', tip: 'Primero los detalles pequeños. Queda mejor que empezar por la parte grande.' },
          { instruction: 'Pinta todo el cuerpo de marrón.', tip: 'Cada pluma es un trazo. Sigue el dibujo y aparecerán solas.' },
          { instruction: 'Pinta las alas de un marrón más oscuro.', tip: 'El ala más oscura es lo que hace que el búho tenga volumen.' },
          { instruction: 'Pinta la cara y el pecho de crema.', tip: 'Deja el blanco de los ojos y la pupila negra para el final.' },
          { instruction: 'Firma tu búho y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
];
