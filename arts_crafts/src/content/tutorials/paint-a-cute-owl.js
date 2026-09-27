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
    // Cada passo tem uma imagem PROPRIA. Sem mascara, sem regiao, sem
    // recorte: o app so troca o arquivo. A sequencia e coerente porque sao
    // o mesmo desenho com partes acesas em ordem.
    framePattern: 'assets/tutorials/paint-a-cute-owl/step-%s.webp',
    materials: ['material.template', 'material.paint', 'material.brush', 'material.water', 'material.pen'],
    steps: [
      { veil: 'none', image: '01-contorno', printable: true },
      { veil: 'none', image: '02-cores', swatches: true },
      { veil: 'none', image: '03-orelhas' },
      { veil: 'none', image: '04-corpo' },
      { veil: 'none', image: '05-olhos' },
      { veil: 'none', image: '06-penas' },
      { veil: 'none', image: '07-assinado' },
    ],
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
