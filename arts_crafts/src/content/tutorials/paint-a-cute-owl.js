// A coruja é a lição que abre a biblioteca, e a única com regiões escritas à
// mão: é a mais bem repartida (orelhas, corpo, asas, olhos) e a que mostra por
// que cada passo precisa acrescentar algo visível na tela.
//
// O corpo NÃO é uma elipse só. Uma elipse engoliria os olhos, e aí o passo
// "faça os olhos" viraria a mesma tela duas vezes. Por isso o corpo são faixas
// que contornam o vão dos olhos, mais as duas asas e os pés. As coordenadas
// foram medidas numa grade de 2% sobre a imagem, conferidas com sobreposição.

export default [
  {
    id: 't01',
    slug: 'paint-a-cute-owl',
    category: 'drawing-painting',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    baseImage: 'assets/tutorials/paint-a-cute-owl/base.webp',
    printable: 'assets/tutorials/paint-a-cute-owl/owl-template.svg',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'full', printable: true },
      { veil: 'full', swatches: true },
      { veil: 'active', region: 'ears' },
      { veil: 'active', region: 'body' },
      { veil: 'active', region: 'eyes' },
      { veil: 'active', region: 'body', pattern: 'feathers' },
      { veil: 'none' },
    ],
    regions: {
      ears: [
        { kind: 'polygon', points: [[0.404, 0.258], [0.502, 0.300], [0.396, 0.334], [0.472, 0.322]] },
        { kind: 'polygon', points: [[0.626, 0.258], [0.542, 0.300], [0.634, 0.334], [0.558, 0.322]] },
      ],
      body: [
        { kind: 'rect', x: 0.352, y: 0.263, w: 0.300, h: 0.066 },
        { kind: 'rect', x: 0.352, y: 0.329, w: 0.030, h: 0.398 },
        { kind: 'rect', x: 0.506, y: 0.329, w: 0.032, h: 0.398 },
        { kind: 'rect', x: 0.620, y: 0.329, w: 0.032, h: 0.398 },
        { kind: 'rect', x: 0.352, y: 0.479, w: 0.300, h: 0.248 },
        { kind: 'ellipse', cx: 0.310, cy: 0.535, rx: 0.075, ry: 0.112 },
        { kind: 'ellipse', cx: 0.700, cy: 0.545, rx: 0.075, ry: 0.112 },
        { kind: 'rect', x: 0.416, y: 0.698, w: 0.164, h: 0.078 },
      ],
      eyes: [
        { kind: 'ellipse', cx: 0.446, cy: 0.402, rx: 0.066, ry: 0.076 },
        { kind: 'ellipse', cx: 0.560, cy: 0.396, rx: 0.064, ry: 0.075 },
        { kind: 'polygon', points: [[0.476, 0.452], [0.522, 0.452], [0.499, 0.504]] },
      ],
    },
    focus: {
      ears: { kind: 'rect', x: 0.392, y: 0.250, w: 0.246, h: 0.090 },
      body: { kind: 'rect', x: 0.345, y: 0.256, w: 0.318, h: 0.478 },
      eyes: { kind: 'rect', x: 0.376, y: 0.318, w: 0.256, h: 0.154 },
    },
    copy: {
      pt: {
        title: 'Corujinha Pintada',
        description: 'Uma corujinha de papel, pintada por você do começo ao fim.',
        steps: [
          { instruction: 'Imprima ou passe o contorno da coruja no papel.', tip: 'Sem impressora? Desenhe uma coruja simples numa folha e copie o formato.' },
          { instruction: 'Escolha três cores e coloque os potes do lado.', tip: 'Uma cor clara, uma escura e uma de destaque deixa tudo mais bonito.' },
          { instruction: 'Pinte as orelhas primeiro.', tip: 'Orelhas primeiro, porque são o que mais aparece de longe.' },
          { instruction: 'Pinte o corpo e as asas.', tip: 'Comece pela cor clara e deixe a escura para o final.' },
          { instruction: 'Faça os dois olhos grandes e a pupila preta.', tip: 'Dois círculos grandes fazem a coruja parecer simpática.' },
          { instruction: 'Pense em penas: pontinhos e arquinhos pequenos.', tip: 'Repita o mesmo desenho em vários lugares, como um padrão.' },
          { instruction: 'Assine a sua coruja e deixa ela secar.', tip: 'Um nome na arte mostra que ela é sua.' },
        ],
      },
      en: {
        title: 'Cute Painted Owl',
        description: 'A paper owl, painted by you from start to finish.',
        steps: [
          { instruction: 'Print or trace the owl onto your paper.', tip: 'No printer? Draw a simple owl on a sheet and copy the shape.' },
          { instruction: 'Choose three colours and set the pots beside you.', tip: 'One light colour, one dark colour and one highlight looks the best.' },
          { instruction: 'Paint the ears first.', tip: 'Ears first, because they are what you see from far away.' },
          { instruction: 'Paint the body and the wings.', tip: 'Start with the light colour and save the dark one for last.' },
          { instruction: 'Add the two big eyes and the black pupils.', tip: 'Two big round circles make an owl look friendly.' },
          { instruction: 'Think feathers: little dots and small arches.', tip: 'Repeat the same shape in several places, like a pattern.' },
          { instruction: 'Sign your owl and let it dry.', tip: 'A name on your art shows it is yours.' },
        ],
      },
      es: {
        title: 'Búho Pintado',
        description: 'Un búho de papel, pintado por ti de principio a fin.',
        steps: [
          { instruction: 'Imprime o contorno del búho, o calca en tu papel.', tip: '¿No tienes impresora? Dibuja un búho sencillo en una hoja y copia la forma.' },
          { instruction: 'Elige tres colores y pon los botes a tu lado.', tip: 'Un color claro, uno oscuro y uno de luz queda lo mejor.' },
          { instruction: 'Pinta primero las orejas.', tip: 'Las orejas primero, porque son lo que se ve de lejos.' },
          { instruction: 'Pinta el cuerpo y las alas.', tip: 'Empieza por el color claro y guarda el oscuro para el final.' },
          { instruction: 'Haz los dos ojos grandes y las pupilas negras.', tip: 'Dos círculos grandes hacen que el búho parezca simpático.' },
          { instruction: 'Piensa en plumas: puntitos y arquitos pequeños.', tip: 'Repite la misma forma en varios sitios, como un patrón.' },
          { instruction: 'Firma tu búho y déjalo secar.', tip: 'Un nombre en tu arte muestra que es tuyo.' },
        ],
      },
    },
  },
];
