// Seção B da spec: Paper & Card (T07 a T12).
//
// Um arquivo por categoria, `export default [ ... ]` — a biblioteca cresce por
// arquivo, sem ninguém mexer na lista de imports.
//
// O véu só pode clarear (regra do `contentProblems`): nenhum passo volta para
// 'full' depois de um 'active'. Por isso os passos 'active' formam um bloco
// só, no fim da lista, e o último passo é sempre 'none'. Nenhum passo é
// 'active' sem `region`, e dois 'active' seguidos nunca usam a mesma região.
//
// Sobre as regiões: `regionsOf()` preferiria as seis regiões DERIVADAS da
// `objectBox`, mas o teste de "região de tutorial cabe dentro da imagem" lê
// `tutorial.regions` direto, e um tutorial sem esse objeto passa vergonha. Por
// isso cada tutorial aqui traz `regions` e `focus` escritos — E são a mesma
// coisa que `derivedRegions`/`derivedFocus` devolveriam para a caixa ao lado.
//
// As caixas ainda são CHUTE: o objeto ocupa 60–80% da imagem, centralizado.
// Quando a imagem existir, meça a caixa por pixel e corrija `objectBox`,
// `regions` e `focus` juntos — `regions` tem prioridade em `regionsOf`, então
// mexer só na caixa não muda nada na tela.
//
// Materiais são CHAVES do dicionário de interface, não texto. A cola de papel,
// a tesoura e o papelão entram pelas chaves mais próximas que já existem; o
// texto do passo nunca depende do nome exato do material.
//
// Adulto no passo = cortar muito, cortar papelão grosso ou usar uma peça
// pequena e metálica. T07 (todas as peças do castelo), T08 (pregos de papel) e
// T12 (uns vinte riscos no cartão) marcam isso; T09, T10 e T11 são só papel.

const castleBox = { x: 0.16, y: 0.18, w: 0.68, h: 0.68 };
const puppetBox = { x: 0.26, y: 0.12, w: 0.48, h: 0.76 };
const foxBox = { x: 0.26, y: 0.20, w: 0.48, h: 0.58 };
const cardBox = { x: 0.10, y: 0.24, w: 0.80, h: 0.52 };
const bouquetBox = { x: 0.24, y: 0.10, w: 0.52, h: 0.80 };
const weaveBox = { x: 0.20, y: 0.14, w: 0.60, h: 0.72 };

export default [
  // --- T07 ---------------------------------------------------------------
  {
    id: 't07',
    slug: 'build-a-paper-castle',
    category: 'paper-card',
    difficulty: 2,
    estimatedMinutes: 40,
    requiresPrinting: true,
    requiresAdultHelp: true,
    baseImage: 'assets/tutorials/build-a-paper-castle/base.webp',
    printable: 'assets/tutorials/build-a-paper-castle/castle-pieces.svg',
    materials: ['material.template', 'material.cardboard', 'material.scissors', 'material.glue', 'material.pen'],
    objectBox: castleBox,
    steps: [
      { veil: 'full', printable: true },
      { veil: 'full', swatches: true },
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'bottom' },
      { veil: 'active', region: 'top' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Castelo de Papel',
        description: 'Peças de papelão que viram um castelo com torres, muro e bandeiras.',
        steps: [
          { instruction: 'Imprima as peças do castelo.', tip: 'Sem impressora? Desenhe as peças no papelão e recorte em volta do desenho.' },
          { instruction: 'Pinte as paredes e as torres com caneta.', tip: 'Uma cor só nas torres deixa o desenho mais fácil de ler.' },
          { instruction: 'Corte em volta dos contornos grossos.', tip: 'Corte devagar, com a tesoura fechada, virando o papel a cada corte.', safety: 'Um adulto ajuda a cortar o papelão grosso e segura a peça para você.' },
          { instruction: 'Dobre as abas nas linhas marcadas.', tip: 'Passe o dedo por cima de cada dobra para ela ficar firme.' },
          { instruction: 'Cole as torres com as abas escondidas dentro.', tip: 'Só um pinguinho de cola em cada aba, senão a cola escorre e o papel mole.' },
          { instruction: 'Junte os muros e o portão na base.', tip: 'Encoste as peças e olhe de lado: o muro tem que ficar em pé sozinho.' },
          { instruction: 'Enfie bandeirinhas no alto das torres.', tip: 'Um triângulo de papel numa tira fina já vira bandeira.' },
          { instruction: 'Coloque o castelo pronto em cima da base.', tip: 'Ponha-o no meio da base, bem em pé, para ele não tombar.' },
        ],
      },
      en: {
        title: 'Paper Castle',
        description: 'Card pieces that turn into a castle with towers, a wall and flags.',
        steps: [
          { instruction: 'Print the castle pieces.', tip: 'No printer? Draw the pieces on card and cut around the drawing.' },
          { instruction: 'Colour the walls and the towers with pens.', tip: 'One colour on the towers makes the drawing easier to read.' },
          { instruction: 'Cut along the thick outlines.', tip: 'Cut slowly with the scissors closed, turning the card as you go.', safety: 'An adult helps cut the thick card and holds the piece still for you.' },
          { instruction: 'Fold the tabs on the marked lines.', tip: 'Run a finger over each fold so it stays firm.' },
          { instruction: 'Glue the towers on with the tabs hidden inside.', tip: 'A tiny drop of glue on each tab, or the glue runs and the paper goes soggy.' },
          { instruction: 'Join the walls and the gate at the base.', tip: 'Press the pieces together and look from the side: the wall should stand up on its own.' },
          { instruction: 'Add flags on top of the towers.', tip: 'A paper triangle on a thin strip already makes a flag.' },
          { instruction: 'Place the finished castle on its base.', tip: 'Stand it in the middle of the base so it does not wobble.' },
        ],
      },
      es: {
        title: 'Castillo de Papel',
        description: 'Piezas de cartón que se convierten en un castillo con torres, muro y banderas.',
        steps: [
          { instruction: 'Imprime las piezas del castillo.', tip: '¿No tienes impresora? Dibuja las piezas en el cartón y recorta por el dibujo.' },
          { instruction: 'Colorea los muros y las torres con rotuladores.', tip: 'Un solo color en las torres hace que el dibujo se lea mejor.' },
          { instruction: 'Recorta por los contornos gruesos.', tip: 'Corta despacio, con las tijeras cerradas, y gira el cartón a cada corte.', safety: 'Un adulto ayuda a cortar el cartón grueso y sujeta la pieza por ti.' },
          { instruction: 'Dobla las pestañas por las líneas marcadas.', tip: 'Pasa el dedo por cada doblez para que quede firme.' },
          { instruction: 'Pega las torres con las pestañas escondidas dentro.', tip: 'Una gotita de cola en cada pestaña, o la cola se corre y el papel se ablanda.' },
          { instruction: 'Une los muros y la puerta en la base.', tip: 'Junta las piezas y míralas de lado: el muro tiene que quedarse de pie solo.' },
          { instruction: 'Pon banderas arriba de las torres.', tip: 'Un triángulo de papel en una tira fina ya es una bandera.' },
          { instruction: 'Coloca el castillo terminado en su base.', tip: 'Ponlo en el centro de la base, bien de pie, para que no se tambalee.' },
        ],
      },
    },
  },

  // --- T08 ---------------------------------------------------------------
  {
    id: 't08',
    slug: 'make-an-owl-paper-puppet',
    category: 'paper-card',
    difficulty: 1,
    estimatedMinutes: 25,
    requiresPrinting: true,
    requiresAdultHelp: true,
    baseImage: 'assets/tutorials/make-an-owl-paper-puppet/base.webp',
    printable: 'assets/tutorials/make-an-owl-paper-puppet/owl-pieces.svg',
    materials: ['material.template', 'material.cardboard', 'material.scissors', 'material.glue', 'material.crayons'],
    objectBox: puppetBox,
    steps: [
      { veil: 'full', printable: true },
      { veil: 'full', swatches: true },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'left' },
      { veil: 'active', region: 'bottom' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Coruja de Papel Que Mexe',
        description: 'Peças de papelão que viram uma coruja que bate as asas.',
        steps: [
          { instruction: 'Imprima as peças da coruja.', tip: 'O corpo, as duas asas e os olhos saem em folhas separadas.' },
          { instruction: 'Pinte cada peça com giz de cor.', tip: 'Deixe o corpo mais claro que as asas, assim você distingue as peças.' },
          { instruction: 'Corte o corpo, as asas e os dois olhos.', tip: 'Corte em volta do desenho, devagar, virando o papel aos poucos.', safety: 'Peça a um adulto para ajudar a cortar o papelão.' },
          { instruction: 'Cole os dois olhos bem no meio da face.', tip: 'Se um olho ficar torto, tire e cole de novo antes de a cola secar.' },
          { instruction: 'Prenda as asas dos dois lados com um prego de papel.', tip: 'O prego atravessa o corpo e a asa, e fica firme quando você abre as duas pontas.', safety: 'Peça a um adulto para colocar os pregos de papel e abrir bem as duas pontas.' },
          { instruction: 'Cole o bico e os dois pés.', tip: 'Os pés são dois triângulos pequenos, com as pontas para baixo.' },
          { instruction: 'Segure a coruja pelo prego e faça as asas baterem.', tip: 'Balance o braço para cima e para baixo e a coruja voa com você.' },
        ],
      },
      en: {
        title: 'Owl Paper Puppet',
        description: 'Card pieces that turn into an owl that flaps its wings.',
        steps: [
          { instruction: 'Print the owl pieces.', tip: 'The body, the two wings and the eyes come on separate sheets.' },
          { instruction: 'Colour each piece with crayons.', tip: 'Keep the body lighter than the wings, so the pieces stay easy to tell apart.' },
          { instruction: 'Cut out the body, the wings and the two eyes.', tip: 'Cut around the drawing, slowly, turning the card as you go.', safety: 'Ask an adult to help you cut the card.' },
          { instruction: 'Glue the two eyes right in the middle of the face.', tip: 'If an eye looks crooked, peel it off and glue it again before the glue dries.' },
          { instruction: 'Fasten the wings on both sides with a paper fastener.', tip: 'The fastener goes through the body and the wing, and it holds when you spread the two arms open.', safety: 'Ask an adult to push the paper fasteners in, then spread the two arms wide.' },
          { instruction: 'Glue on the beak and the two feet.', tip: 'The feet are two little triangles, with the points facing down.' },
          { instruction: 'Hold the owl by the fastener and flap the wings.', tip: 'Move your arm up and down and the owl flies along with you.' },
        ],
      },
      es: {
        title: 'Búho de Papel que Se Mueve',
        description: 'Piezas de cartón que se convierten en un búho que bate las alas.',
        steps: [
          { instruction: 'Imprime las piezas del búho.', tip: 'El cuerpo, las dos alas y los ojos salen en hojas separadas.' },
          { instruction: 'Colorea cada pieza con los lápices de cera.', tip: 'Deja el cuerpo más claro que las alas, así distingues las piezas.' },
          { instruction: 'Recorta el cuerpo, las alas y los dos ojos.', tip: 'Recorta por el dibujo, despacio, y gira el cartón poco a poco.', safety: 'Pide a un adulto que te ayude a recortar el cartón.' },
          { instruction: 'Pega los dos ojos justo en el centro de la cara.', tip: 'Si un ojo queda torcido, quítalo y pégalo otra vez antes de que seque el pegamento.' },
          { instruction: 'Sujeta las alas a los lados con un separador de papel.', tip: 'El separador pasa por el cuerpo y por el ala, y queda firme cuando abres las dos patitas.', safety: 'Pide a un adulto que ponga los separadores y que abra bien las dos patitas.' },
          { instruction: 'Pega el pico y los dos pies.', tip: 'Los pies son dos triángulos pequeños, con las puntas hacia abajo.' },
          { instruction: 'Sujeta el búho por el separador y bate las alas.', tip: 'Mueve el brazo arriba y abajo y el búho vuela contigo.' },
        ],
      },
    },
  },

  // --- T09 ---------------------------------------------------------------
  {
    id: 't09',
    slug: 'fold-an-origami-fox-face',
    category: 'paper-card',
    difficulty: 1,
    estimatedMinutes: 10,
    baseImage: 'assets/tutorials/fold-an-origami-fox-face/base.webp',
    materials: ['material.paper', 'material.pen'],
    objectBox: foxBox,
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'all' },
      { veil: 'active', region: 'centre' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Rosto de Raposa de Dobradura',
        description: 'Um quadrado de papel que vira um rosto de raposa só com dobras.',
        steps: [
          { instruction: 'Comece com um quadrado, com um canto virado para você.', tip: 'Ponha o papel no meio da mesa para ele não escorregar.' },
          { instruction: 'Dobre um canto no canto oposto, formando um triângulo.', tip: 'A dobra precisa passar bem pelo meio do papel.' },
          { instruction: 'Vire o triângulo com a ponta para cima.', tip: 'A borda mais comprida fica na mesa, embaixo.' },
          { instruction: 'Dobre os dois cantos de baixo para cima e faça as orelhas.', tip: 'Os dois cantos dobrados precisam ficar iguais, para a raposa não ficar torta.' },
          { instruction: 'Vire a figura do outro lado e alise as dobras.', tip: 'Passe a mão por cima das orelhas para os vincos ficarem marcados.' },
          { instruction: 'Desenhe os dois olhos e o nariz com a caneta.', tip: 'O nariz é um triângulo pequeno, com a ponta para baixo.' },
          { instruction: 'Faça mais raposas em outros tamanhos.', tip: 'Folha maior dá raposa maior. Guarde a família toda na mesma mesa.' },
        ],
      },
      en: {
        title: 'Origami Fox Face',
        description: 'One square of paper folded into a fox face with a few folds.',
        steps: [
          { instruction: 'Start with a square, with one corner facing you.', tip: 'Put the paper in the middle of the table so it does not slip.' },
          { instruction: 'Fold one corner onto the opposite corner to make a triangle.', tip: 'The fold has to go right through the middle of the paper.' },
          { instruction: 'Turn the triangle so the point is up.', tip: 'The long edge stays on the table, at the bottom.' },
          { instruction: 'Fold the two lower corners up to make the ears.', tip: 'Both folded corners have to match, or the fox looks crooked.' },
          { instruction: 'Turn the figure over and press the folds flat.', tip: 'Run your hand over the ears so the creases stay sharp.' },
          { instruction: 'Draw the two eyes and the nose with the pen.', tip: 'The nose is a small triangle, with the point facing down.' },
          { instruction: 'Make more foxes in other sizes.', tip: 'A bigger sheet makes a bigger fox. Keep the whole family on the same table.' },
        ],
      },
      es: {
        title: 'Cara de Zorro de Origami',
        description: 'Un cuadrado de papel que se dobla y se convierte en la cara de un zorro.',
        steps: [
          { instruction: 'Empieza con un cuadrado, con una esquina hacia ti.', tip: 'Pon el papel en el medio de la mesa para que no se deslice.' },
          { instruction: 'Dobla una esquina contra la esquina opuesta y haz un triángulo.', tip: 'El doblez tiene que pasar justo por el centro del papel.' },
          { instruction: 'Gira el triángulo con la punta hacia arriba.', tip: 'El lado largo se queda en la mesa, abajo.' },
          { instruction: 'Dobla las dos esquinas de abajo hacia arriba y haz las orejas.', tip: 'Las dos esquinas dobladas tienen que quedar iguales, si no el zorro sale torcido.' },
          { instruction: 'Gira la figura del revés y pasa la mano por los pliegues.', tip: 'Pasa la mano por las orejas para que los dobleces queden marcados.' },
          { instruction: 'Dibuja los dos ojos y la nariz con el lapicero.', tip: 'La nariz es un triángulo pequeño, con la punta hacia abajo.' },
          { instruction: 'Haz más zorros de otros tamaños.', tip: 'Con una hoja más grande sale un zorro más grande. Guarda a la familia en la misma mesa.' },
        ],
      },
    },
  },

  // --- T10 ---------------------------------------------------------------
  {
    id: 't10',
    slug: 'make-a-pop-up-celebration-card',
    category: 'paper-card',
    difficulty: 2,
    estimatedMinutes: 25,
    baseImage: 'assets/tutorials/make-a-pop-up-celebration-card/base.webp',
    materials: ['material.cardboard', 'material.paper', 'material.scissors', 'material.glue', 'material.pen'],
    objectBox: cardBox,
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'bottom' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Cartão de Festa que Abre em Três D',
        description: 'Um cartão de papel que abre e a figura pula para fora da página.',
        steps: [
          { instruction: 'Dobre o cartão ao meio e marque bem a dobra.', tip: 'Essa dobra é a espinha do cartão, então ela precisa ficar reta.' },
          { instruction: 'Corte dois riscos reto, um do lado do outro, no meio do cartão.', tip: 'Os dois riscos ficam paralelos, com um dedo de espaço entre eles.' },
          { instruction: 'Empurre a lingueta entre os dois riscos para dentro.', tip: 'Dobrar a lingueta para o outro lado é o que a faz saltar quando o cartão abre.' },
          { instruction: 'Cole uma figura colorida na lingueta.', tip: 'A figura precisa ser mais baixa que a lingueta, senão ela não dobra.' },
          { instruction: 'Faça uma segunda camada: outra lingueta e outra figura.', tip: 'A segunda figura sobe mais alto que a primeira e fica atrás dela.' },
          { instruction: 'Decore o fundo do cartão com estrelinhas e rabiscos.', tip: 'Desenhe só na parte de baixo, longe da lingueta, para não rasgar o papel.' },
          { instruction: 'Abra o cartão e escreva um recado.', tip: 'Escreva por dentro, com letra grande, para o recado caber na linha toda.' },
        ],
      },
      en: {
        title: 'Pop-Up Celebration Card',
        description: 'A paper card that opens and the shape jumps out of the page.',
        steps: [
          { instruction: 'Fold the card in half and crease it well.', tip: 'This fold is the spine of the card, so keep it straight.' },
          { instruction: 'Cut two straight lines side by side in the middle of the card.', tip: 'Keep the two lines parallel, with a finger of space between them.' },
          { instruction: 'Push the tab between the two cuts inward.', tip: 'Bending the tab the other way is what makes it pop up when the card opens.' },
          { instruction: 'Glue a coloured shape onto the tab.', tip: 'The shape has to be shorter than the tab, or the tab will not fold.' },
          { instruction: 'Add a second layer: one more tab and one more shape.', tip: 'The second shape stands taller than the first and sits behind it.' },
          { instruction: 'Draw stars and squiggles on the background.', tip: 'Keep the drawing on the lower part, away from the tab, so the paper does not tear.' },
          { instruction: 'Open the card and write your message.', tip: 'Write inside, in big letters, so the message fits on the line.' },
        ],
      },
      es: {
        title: 'Tarjeta de Fiesta que Se Abre',
        description: 'Una tarjeta de papel que se abre y la figura salta fuera de la página.',
        steps: [
          { instruction: 'Dobla la tarjeta por la mitad y marca bien el pliegue.', tip: 'Ese pliegue es la espalda de la tarjeta, así que tiene que quedar recto.' },
          { instruction: 'Recorta dos líneas rectas, una junto a otra, en el centro de la tarjeta.', tip: 'Las dos líneas quedan paralelas, con un dedo de espacio entre ellas.' },
          { instruction: 'Empuja la pestaña entre los dos cortes hacia dentro.', tip: 'Doblar la pestaña hacia el otro lado es lo que la hace saltar al abrir.' },
          { instruction: 'Pega una figura de color en la pestaña.', tip: 'La figura tiene que ser más baja que la pestaña, si no no se dobla.' },
          { instruction: 'Añade una segunda capa: otra pestaña y otra figura.', tip: 'La segunda figura sube más alto que la primera y queda detrás.' },
          { instruction: 'Dibuja estrellas y garabatos en el fondo.', tip: 'Dibuja solo en la parte de abajo, lejos de la pestaña, para no romper el papel.' },
          { instruction: 'Abre la tarjeta y escribe un mensaje.', tip: 'Escríbelo por dentro, con letras grandes, para que el mensaje quepa en la línea.' },
        ],
      },
    },
  },

  // --- T11 ---------------------------------------------------------------
  {
    id: 't11',
    slug: 'paper-flower-bouquet',
    category: 'paper-card',
    difficulty: 1,
    estimatedMinutes: 25,
    baseImage: 'assets/tutorials/paper-flower-bouquet/base.webp',
    materials: ['material.paper', 'material.scissors', 'material.glue'],
    objectBox: bouquetBox,
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
        title: 'Buquê de Flores de Papel',
        description: 'Flores de papel montadas num buquê para presentear alguém.',
        steps: [
          { instruction: 'Corte pétalas de papel em forma de gota.', tip: 'Quatro pétalas iguais já dão uma flor bem bonita.' },
          { instruction: 'Encaixe as pétalas em círculo, com a ponta para fora.', tip: 'A ponta larga fica no centro e a ponta fina aponta para fora.' },
          { instruction: 'Cole um círculo pequeno no meio da flor.', tip: 'Um botão ou uma moeda de papel serve de miolo e fica firme.' },
          { instruction: 'Enrole uma tira de papel para fazer o caule.', tip: 'Enrole a partir de uma ponta e cole só o final, sem encher de cola.' },
          { instruction: 'Cole duas folhas, uma de cada lado do caule.', tip: 'Uma folha mais alta e outra mais baixa deixa o caule com jeito de planta.' },
          { instruction: 'Faça mais duas flores com formatos diferentes.', tip: 'Mude só o desenho da pétala e o miolo; o caule continua o mesmo.' },
          { instruction: 'Junte as flores e amarre o buquê com uma tira de papel.', tip: 'Segure as flores com as pontas para cima e amarre bem no meio dos caules.' },
        ],
      },
      en: {
        title: 'Paper Flower Bouquet',
        description: 'Paper flowers made into a bouquet to give away.',
        steps: [
          { instruction: 'Cut paper petals shaped like drops.', tip: 'Four matching petals already make a very pretty flower.' },
          { instruction: 'Arrange the petals in a circle, with the tips pointing out.', tip: 'The wide end goes in the middle and the thin point faces out.' },
          { instruction: 'Glue a small circle in the middle of the flower.', tip: 'A button or a paper coin makes a middle that holds well.' },
          { instruction: 'Roll a paper strip to make the stem.', tip: 'Roll from one end and glue only the tip, not the whole length.' },
          { instruction: 'Glue two leaves, one on each side of the stem.', tip: 'One leaf higher and one lower makes the stem look like a real plant.' },
          { instruction: 'Make two more flowers in different styles.', tip: 'Change only the petal shape and the middle; the stem stays the same.' },
          { instruction: 'Gather the flowers and tie the bouquet with a strip of paper.', tip: 'Hold the flowers point up and tie tightly in the middle of the stems.' },
        ],
      },
      es: {
        title: 'Ramo de Flores de Papel',
        description: 'Flores de papel montadas en un ramo para regalar.',
        steps: [
          { instruction: 'Recorta pétalas de papel con forma de gota.', tip: 'Cuatro pétalas iguales ya hacen una flor muy bonita.' },
          { instruction: 'Coloca las pétalas en círculo, con la punta hacia fuera.', tip: 'La parte ancha va al centro y la punta fina mira hacia fuera.' },
          { instruction: 'Pega un círculo pequeño en el centro de la flor.', tip: 'Un botón o una moneda de papel hace un centro que aguanta.' },
          { instruction: 'Enrolla una tira de papel para hacer el tallo.', tip: 'Enrolla desde un extremo y pega solo la punta, no todo el rollo.' },
          { instruction: 'Pega dos hojas, una a cada lado del tallo.', tip: 'Una hoja más alta y otra más baja hace que el tallo parezca una planta.' },
          { instruction: 'Haz dos flores más con formas diferentes.', tip: 'Cambia solo la forma del pétalo y el centro; el tallo sigue igual.' },
          { instruction: 'Junta las flores y ata el ramo con una tira de papel.', tip: 'Sujeta las flores con las puntas hacia arriba y ata fuerte en el medio de los tallos.' },
        ],
      },
    },
  },

  // --- T12 ---------------------------------------------------------------
  {
    id: 't12',
    slug: 'paper-weaving-rainbow',
    category: 'paper-card',
    difficulty: 2,
    estimatedMinutes: 30,
    requiresAdultHelp: true,
    baseImage: 'assets/tutorials/paper-weaving-rainbow/base.webp',
    materials: ['material.cardboard', 'material.paper', 'material.scissors', 'material.glue'],
    objectBox: weaveBox,
    steps: [
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'full' },
      { veil: 'active', region: 'top' },
      { veil: 'active', region: 'centre' },
      { veil: 'active', region: 'all' },
      { veil: 'none' },
    ],
    copy: {
      pt: {
        title: 'Arco-íris de Papel Trançado',
        description: 'Fitas de papel coloridas que atravessam um cartão e viram um arco-íris.',
        steps: [
          { instruction: 'Dobre a folha em três dobras iguais e abra de novo.', tip: 'As dobras marcam onde vão ficar os riscos, todos com o mesmo espaço.' },
          { instruction: 'Corte uns vinte riscos retos no meio da folha.', tip: 'Conte os riscos um a um, para eles saírem todos iguais.', safety: 'Peça a um adulto para ajudar a cortar o cartão.' },
          { instruction: 'Abra bem a folha e segure pelas bordas.', tip: 'Se um risco fechar, abra com o dedo, de leve, para não rasgar.' },
          { instruction: 'Passe a primeira fita por cima e por baixo dos riscos.', tip: 'Comece por um canto, para a fita não soltar quando você virar a folha.' },
          { instruction: 'Passe a fita seguinte no contrário, por baixo primeiro.', tip: 'Cada fita segue um caminho diferente da anterior, como um tabuleiro de xadrez.' },
          { instruction: 'Preencha a folha toda, do vermelho ao roxo.', tip: 'Uma cor por faixa, sempre na mesma ordem, faz o arco-íris.' },
          { instruction: 'Corte as sobras e cole as pontas por trás.', tip: 'A cola segura melhor se você passar no verso da folha.' },
        ],
      },
      en: {
        title: 'Paper Weaving Rainbow',
        description: 'Coloured paper strips woven through card to make a rainbow.',
        steps: [
          { instruction: 'Fold the sheet into three equal folds and open it again.', tip: 'The folds mark where the slots go, all the same distance apart.' },
          { instruction: 'Cut about twenty straight slots across the middle of the sheet.', tip: 'Count the slots as you cut, so they all come out the same.', safety: 'Ask an adult to help you cut the card.' },
          { instruction: 'Open the sheet flat and hold it by the edges.', tip: 'If a slot closes up, open it gently with a finger so the card does not tear.' },
          { instruction: 'Weave the first strip over and under the slots.', tip: 'Start at one corner, so the strip does not slip loose when you turn the sheet.' },
          { instruction: 'Weave the next strip the other way, under first.', tip: 'Each strip takes a different path from the one before, like a chess board.' },
          { instruction: 'Fill the whole page, from red to purple.', tip: 'One colour per band, always in the same order, makes the rainbow.' },
          { instruction: 'Trim the extra bits and glue the ends on the back.', tip: 'Glue sticks better if you spread it on the back of the sheet.' },
        ],
      },
      es: {
        title: 'Arcoíris de Papel Trenzado',
        description: 'Tiras de papel de colores que se entrelazan en un cartón y forman un arcoíris.',
        steps: [
          { instruction: 'Dobla la hoja en tres pliegues iguales y vuelve a abrirla.', tip: 'Los pliegues marcan dónde van los cortes, todos con el mismo espacio.' },
          { instruction: 'Recorta unos veinte cortes rectos en el centro de la hoja.', tip: 'Cuenta los cortes al recortarlos, para que todos salgan iguales.', safety: 'Pide a un adulto que te ayude a recortar el cartón.' },
          { instruction: 'Abre bien la hoja y sujétala por los bordes.', tip: 'Si un corte se cierra, ábrelo despacio con un dedo para no romper el cartón.' },
          { instruction: 'Pasa la primera tira por encima y por debajo de los cortes.', tip: 'Empieza por una esquina, para que la tira no se suelte al girar la hoja.' },
          { instruction: 'Pasa la siguiente tira al revés, por debajo primero.', tip: 'Cada tira lleva un camino distinto de la anterior, como un tablero de ajedrez.' },
          { instruction: 'Llena toda la hoja, del rojo al morado.', tip: 'Un color por franja, siempre en el mismo orden, hace el arcoíris.' },
          { instruction: 'Recorta los sobrantes y pega los extremos por detrás.', tip: 'El pegamento agarra mejor si lo pones en el reverso de la hoja.' },
        ],
      },
    },
  },
];
