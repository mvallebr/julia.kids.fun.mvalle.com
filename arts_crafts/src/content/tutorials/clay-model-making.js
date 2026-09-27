// Massa e modelagem: T19 a T22.
//
// Nenhuma região escrita à mão aqui. A caixa do objeto (`objectBox`) gera as
// seis regiões, então estes quatro tutoriais só escolhem QUAL nome da região cada
// ato do trabalho pede: 'top' para a parte de cima, 'bottom' para a de baixo,
// 'centre' para o meio, 'left' para um lado, 'all' quando o ato muda a silhueta
// inteira (acrescentar braços, cortar estrelas).
//
// O ritmo do véu é o mesmo nos quatro: o objeto ainda não existe no começo
// (véu 'full' = só o contorno fantasma), os três atos que moldam uma parte
// diferente ficam com o furo 'active', e o último passo é sempre 'none'. Com
// isso a criança vê a arte ganhar forma à frente dos olhos.
//
// Os `objectBox` abaixo são ESTIMATIVAS a olho. A arte final recalcula a caixa
// por pixel e troca estes quatro números: o formato e o fato de o objeto caber
// dentro de 0..1 é que não podem mudar.

export default [
  {
    id: 't19',
    slug: 'air-dry-clay-monster',
    category: 'clay-model-making',
    difficulty: 1,
    estimatedMinutes: 30,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/air-dry-clay-monster/base.webp',
    objectBox: { x: 0.22, y: 0.14, w: 0.56, h: 0.72 },
    materials: ['material.clay', 'material.pencils', 'material.paint'],
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Monstro de Massa',
        description: 'Um monstro de massa de modelar, com olhos, chifres, texturas e um nome só dele.',
        steps: [
          { instruction: 'Role uma bola grande de massa com as duas mãos.', tip: 'Role sempre no mesmo sentido para a bola ficar redonda.' },
          { instruction: 'Aperte ou estique a bola para dar o corpo que você quer.', tip: 'Um monstro mais alto se sustenta melhor do que um achatado.' },
          { instruction: 'Enfie dois olhos grandes e bolondos.', tip: 'Aperte com o polegar até aparecer um buraquinho redondo.' },
          { instruction: 'Modele os braços, as pernas e os chifres.', tip: 'Cada pedacinho gruda sozinho: encoste e aperte, sem cola.' },
          { instruction: 'Marque texturas com o dedo e com a ponta do lápis.', tip: 'Listras, bolinhas e furos pequenos deixam a massa com cara de monstro.' },
          { instruction: 'Deixe o monstro secar em lugar aberto.', tip: 'Essa massa seca sozinha: o forno não é preciso.' },
          { instruction: 'Pinte o monstro e dê um nome a ele.', tip: 'Comece pelas partes pequenas e guarde a cor grande para o final.' },
        ],
      },
      en: {
        title: 'Air-Dry Clay Monster',
        description: 'A monster made of air-dry clay, with eyes, horns, textures and a name of its own.',
        steps: [
          { instruction: 'Roll one big ball of clay with both hands.', tip: 'Always roll the same way and the ball comes out round.' },
          { instruction: 'Squash or stretch the ball into the body you want.', tip: 'A taller monster stands up better than a flat one.' },
          { instruction: 'Press in two big funny eyes.', tip: 'Push with your thumb until a small round hole shows.' },
          { instruction: 'Shape the arms, the legs and the horns.', tip: 'Every little piece sticks on its own: press it on, no glue needed.' },
          { instruction: 'Press simple textures with a finger and the tip of a pencil.', tip: 'Stripes, dots and tiny holes all make the monster look great.' },
          { instruction: 'Let the monster dry in the open air.', tip: 'This clay hardens on its own: you never need the oven.' },
          { instruction: 'Paint the monster and give it a name.', tip: 'Start with the small parts and save the big colour for last.' },
        ],
      },
      es: {
        title: 'Monstruo de Arcilla',
        description: 'Un monstruo de arcilla de secado al aire, con ojos, cuernos, texturas y un nombre solo suyo.',
        steps: [
          { instruction: 'Bola una bola grande de arcilla con las dos manos.', tip: 'Rola siempre en el mismo sentido y la bola sale redonda.' },
          { instruction: 'Aplasta o estira la bola para darle el cuerpo que quieras.', tip: 'Un monstruo alto se sostiene mejor que uno plano.' },
          { instruction: 'Hunde dos ojos grandes y saltones.', tip: 'Aprieta con el pulgar hasta que salga un agujero redondo.' },
          { instruction: 'Modela los brazos, las patas y los cuernos.', tip: 'Cada piececita se pega sola: apóyala y aprieta, sin pegamento.' },
          { instruction: 'Marca texturas con el dedo y con la punta del lapicero.', tip: 'Las rayas, los puntos y los agujeritos le dan cara de monstruo.' },
          { instruction: 'Deja secar el monstruo al aire libre.', tip: 'Esta arcilla se endurece sola: no hace falta el horno.' },
          { instruction: 'Pinta el monstruo y ponle un nombre.', tip: 'Empieza por las partes pequeñas y deja el color grande para el final.' },
        ],
      },
    },
  },
  {
    id: 't20',
    slug: 'clay-pinch-pot',
    category: 'clay-model-making',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/clay-pinch-pot/base.webp',
    objectBox: { x: 0.26, y: 0.18, w: 0.48, h: 0.62 },
    materials: ['material.clay', 'material.water'],
    steps: [
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Vaso de Massinha',
        description: 'Um vasinho de massa apertado com o dedinho, que vira porta-copos ou pote de lápis.',
        steps: [
          { instruction: 'Role uma bola lisa de massa.', tip: 'Role sempre no mesmo sentido: bola redonda é mais fácil de abrir.' },
          { instruction: 'Enfie o polegar no meio da bola.', tip: 'Gire a massa enquanto aperta, para o buraco sair redondo.' },
          { instruction: 'Aperte as laterais com os dedos, de baixo para cima.', tip: 'Aperte devagar: massa apertada depressa racha.' },
          { instruction: 'Passe o dedo de leve para fechar as rachaduras.', tip: 'Uma gota de água no dedo faz a massa fechar direitinho.' },
          { instruction: 'Abra e feche a boca do vaso para acertar a borda.', tip: 'A borda fica bonita quando é reta e igualada todo o redor.' },
          { instruction: 'Marque a massa com um carimbo.', tip: 'Um botão, uma tampinha ou uma moeda deixa uma marca limpa.' },
          { instruction: 'Deixe secar e pinte o seu vaso.', tip: 'A massa seca fica mais clara: pinte depois disso.' },
        ],
      },
      en: {
        title: 'Clay Pinch Pot',
        description: 'A little pot pinched out of clay with your thumbs, ready to hold pencils or nothing at all.',
        steps: [
          { instruction: 'Roll a smooth ball of clay.', tip: 'Always roll the same way: a round ball is easier to open.' },
          { instruction: 'Push one thumb into the centre of the ball.', tip: 'Turn the clay as you press, so the hole comes out round.' },
          { instruction: 'Pinch the sides with your fingers, from the bottom up.', tip: 'Pinch slowly: clay squeezed fast cracks.' },
          { instruction: 'Run a finger gently over it to close the cracks.', tip: 'A drop of water on your finger makes the clay close up.' },
          { instruction: 'Open and press the mouth of the pot to shape the rim.', tip: 'The rim looks nice when it is even all the way round.' },
          { instruction: 'Press a stamp into the clay.', tip: 'A button, a bottle cap or a coin leaves a clean mark.' },
          { instruction: 'Let it dry and paint your pot.', tip: 'Clay turns lighter as it dries: paint it after that.' },
        ],
      },
      es: {
        title: 'Vaso de Arcilla',
        description: 'Un vasito hecho a pellizcos con el dedo, para guardar lápices o nada en absoluto.',
        steps: [
          { instruction: 'Bola una bola lisa de arcilla.', tip: 'Rola siempre en el mismo sentido: una bola redonda se abre mejor.' },
          { instruction: 'Mete el pulgar en el centro de la bola.', tip: 'Gira la arcilla mientras aprietas, así el hueco sale redondo.' },
          { instruction: 'Aprieta los lados con los dedos, de abajo arriba.', tip: 'Aprieta despacio: la arcilla apretada de prisa se agrieta.' },
          { instruction: 'Pasa el dedo suave para cerrar las grietas.', tip: 'Con una gota de agua en el dedo la arcilla cierra mejor.' },
          { instruction: 'Abre y aprieta la boca del vaso para darle forma al borde.', tip: 'El borde queda bonito cuando es recto e igual por todo el lado.' },
          { instruction: 'Marca la arcilla con un sello.', tip: 'Un botón, una tapa o una moneda deja una marca limpia.' },
          { instruction: 'Deja secar y pinta tu vaso.', tip: 'La arcilla seca se aclara: píntala después de eso.' },
        ],
      },
    },
  },
  {
    id: 't21',
    slug: 'tiny-clay-owl',
    category: 'clay-model-making',
    difficulty: 2,
    estimatedMinutes: 30,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/tiny-clay-owl/base.webp',
    objectBox: { x: 0.22, y: 0.16, w: 0.56, h: 0.66 },
    materials: ['material.clay', 'material.pencils', 'material.paint'],
    steps: [
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Corujinha de Massa',
        description: 'Uma corujinha de massa, com orelhinhas, olhos apertados, bico, penas e pintinha.',
        steps: [
          { instruction: 'Modele um corpo em forma de oval.', tip: 'Gire a massa entre dois dedos para ela ficar lisa.' },
          { instruction: 'Aperte duas orelhinhas pontudas no alto.', tip: 'Aperte as duas juntas para as orelhas ficarem iguais.' },
          { instruction: 'Aperte dois círculos no meio para fazer os olhos.', tip: 'A ponta do lápis faz os olhos mais redondinhos.' },
          { instruction: 'Coloque um bico pequeno entre os olhos.', tip: 'Um pedacinho de massa com a ponta fina faz o bico.' },
          { instruction: 'Marque as penas com pontinhos e arcos.', tip: 'Repita o mesmo desenho em vários lugares, como um padrão.' },
          { instruction: 'Aperte dois pezinhos embaixo do corpo.', tip: 'Dois pedacinhos iguais de massa viram dois pés iguaizinhos.' },
          { instruction: 'Deixe secar e pinte a coruja.', tip: 'Use a ponta mais grossa do pincel para os olhos e o bico.' },
        ],
      },
      en: {
        title: 'Tiny Clay Owl',
        description: 'A little owl in clay, with tiny ears, pressed eyes, a beak, feathers and paint.',
        steps: [
          { instruction: 'Shape an oval body.', tip: 'Roll the clay between two fingers to make it smooth.' },
          { instruction: 'Pinch two tiny ears at the top.', tip: 'Pinch both at the same time so the ears match.' },
          { instruction: 'Press two circles in the middle for the eyes.', tip: 'The tip of a pencil makes the roundest eyes.' },
          { instruction: 'Add a small beak between the eyes.', tip: 'A little piece of clay with a pointy end makes the beak.' },
          { instruction: 'Press the feathers with little dots and arches.', tip: 'Repeat the same shape in several places, like a pattern.' },
          { instruction: 'Press two little feet under the body.', tip: 'Two equal pieces of clay make two matching feet.' },
          { instruction: 'Let it dry and paint the owl.', tip: 'Use the fattest brush tip for the eyes and the beak.' },
        ],
      },
      es: {
        title: 'Búho de Arcilla',
        description: 'Un búhito de arcilla con orejas pequeñitas, ojos hundidos, pico, plumas y pintura.',
        steps: [
          { instruction: 'Modela un cuerpo con forma de óvalo.', tip: 'Gira la arcilla entre dos dedos para que quede lisa.' },
          { instruction: 'Aprieta dos orejas pequeñitas en la parte de arriba.', tip: 'Aprieta las dos a la vez para que las orejas sean iguales.' },
          { instruction: 'Presiona dos círculos en el centro para hacer los ojos.', tip: 'La punta del lapicero hace los ojos más redondos.' },
          { instruction: 'Pon un pico pequeño entre los ojos.', tip: 'Un trocito de arcilla con la punta fina hace el pico.' },
          { instruction: 'Marca las plumas con puntitos y arcos.', tip: 'Repite la misma forma en varios sitios, como un patrón.' },
          { instruction: 'Presiona dos patitas debajo del cuerpo.', tip: 'Dos trocitos iguales de arcilla hacen dos patas iguales.' },
          { instruction: 'Deja secar y pinta el búho.', tip: 'Usa la punta más gruesa del pincel para los ojos y el pico.' },
        ],
      },
    },
  },
  {
    id: 't22',
    slug: 'salt-dough-stars',
    category: 'clay-model-making',
    difficulty: 2,
    estimatedMinutes: 30,
    requiresPrinting: false,
    baseImage: 'assets/tutorials/salt-dough-stars/base.webp',
    objectBox: { x: 0.16, y: 0.16, w: 0.68, h: 0.68 },
    materials: ['material.clay', 'material.water', 'material.scissors', 'material.paint', 'material.string'],
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'centre' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Estrelas de Massa Salgada',
        description: 'Estrelas de farinha e sal para pendurar na parede, na janela ou na árvore de Natal.',
        steps: [
          {
            instruction: 'Misture a massa com um adulto.',
            tip: 'A massa é só farinha, sal e água, e fica pronta quando não gruda no dedo.',
            safety: 'Peça a um adulto para misturar a massa com você.',
          },
          { instruction: 'Abra a massa com uma garrafa até ficar bem fina.', tip: 'Aperte a garrafa com as duas mãos e gire a massa por baixo.' },
          { instruction: 'Corte estrelas com o cortador.', tip: 'Sem cortador? Desenhe uma estrela no papel e corte em volta com a tesoura.' },
          { instruction: 'Faça um buraquinho no alto de cada estrela.', tip: 'O furo fica perto da borda, mas não em cima da ponta.' },
          {
            instruction: 'Peça a um adulto para levar as estrelas ao forno.',
            tip: 'Deixe as estrelas esfriarem de verdade antes de pegar nelas.',
            safety: 'O forno é quente: só um adulto liga, coloca e tira as estrelas.',
          },
          { instruction: 'Pinte as estrelas quando estiverem frias.', tip: 'Pincel fino nas pontas e pincel grosso no meio.' },
          { instruction: 'Passe o cordão e pendure as estrelas.', tip: 'Cordão fino passa pelo buraquinho sem rasgar a estrela.' },
        ],
      },
      en: {
        title: 'Salt-Dough Star Decorations',
        description: 'Stars made of flour, salt and water, ready to hang on the wall, the window or the tree.',
        steps: [
          {
            instruction: 'Mix the dough with an adult.',
            tip: 'The dough is only flour, salt and water, and it is ready when it stops sticking to your fingers.',
            safety: 'Ask an adult to mix the dough with you.',
          },
          { instruction: 'Roll the dough flat with a bottle.', tip: 'Press the bottle down with both hands and turn the dough under it.' },
          { instruction: 'Cut out stars with a cutter.', tip: 'No cutter? Draw a star on the paper and cut around it with scissors.' },
          { instruction: 'Push a small hole at the top of each star.', tip: 'Keep the hole near the edge, but not right on the point.' },
          {
            instruction: 'Ask an adult to put the stars in the oven.',
            tip: 'Let the stars go completely cool before you touch them.',
            safety: 'The oven is hot: only an adult turns it on and takes the stars out.',
          },
          { instruction: 'Paint the stars when they are cool.', tip: 'A thin brush on the points and a fat brush in the middle.' },
          { instruction: 'Thread the string and hang the stars.', tip: 'Thin string goes through the hole without tearing the star.' },
        ],
      },
      es: {
        title: 'Estrellas de Masa Salada',
        description: 'Estrellas de harina, sal y agua para colgar en la pared, la ventana o el árbol.',
        steps: [
          {
            instruction: 'Mezcla la masa con un adulto.',
            tip: 'La masa es solo harina, sal y agua, y está lista cuando deja de pegarse a los dedos.',
            safety: 'Pide a un adulto que mezcle la masa contigo.',
          },
          { instruction: 'Estira la masa con una botella hasta que quede fina.', tip: 'Aprieta la botella con las dos manos y gira la masa por debajo.' },
          { instruction: 'Recorta estrellas con un molde.', tip: '¿No tienes molde? Dibuja una estrella en el papel y recórtala con la tijera.' },
          { instruction: 'Haz un agujero pequeño arriba de cada estrella.', tip: 'Pon el agujero cerca del borde, pero no justo en la punta.' },
          {
            instruction: 'Pide a un adulto que meta las estrellas en el horno.',
            tip: 'Deja que las estrellas se enfríen de verdad antes de tocarlas.',
            safety: 'El horno está caliente: solo un adulto lo enciende y saca las estrellas.',
          },
          { instruction: 'Pinta las estrellas cuando estén frías.', tip: 'Pincel fino en las puntas y pincel gordo en el centro.' },
          { instruction: 'Pasa el cordón y cuelga las estrellas.', tip: 'El cordón fino pasa por el agujero sin romper la estrella.' },
        ],
      },
    },
  },
];
