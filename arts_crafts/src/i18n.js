// Dicionário de texto do Arts & Crafts. Toda string visível ao jogador passa por
// aqui (spec §22): nenhum texto assado em arte, nenhum idioma fixo no código.
// Chaves planas com ponto — o teste de conteúdo confere que toda chave usada
// existe nos três idiomas.

export const LANGUAGES = ['pt', 'en', 'es'];

const PT = {
  'app.title': 'Arts & Crafts Adventures',
  'app.hello': 'Oi, {name}!',

  'home.tutorials': 'Tutorials',
  'home.tutorialsSub': 'Faça algo incrível, uma imagem de cada vez.',
  'home.games': 'Jogos',
  'home.gamesSub': 'Explore o mundo criativo.',
  'home.gallery': 'Galeria',
  'home.gallerySub': 'Suas criações moram aqui.',

  'nav.back': 'Voltar',
  'nav.home': 'Início',

  'tutorials.heading': 'Tutorials',
  'tutorials.search': 'Procurar tutorial…',
  'tutorials.all': 'Tudo',
  'tutorials.printable': 'Para imprimir',
  'tutorials.quick': 'Rápidos',
  'tutorials.featured': 'Comece por aqui',
  'tutorials.continue': 'Continuar de onde parou',
  'tutorials.empty': 'Nenhum tutorial com esse filtro.',
  'tutorials.count': '{count} tutoriais',
  'tutorials.countOne': '{count} tutorial',
  'tutorials.completed': 'Concluído',
  'tutorials.progress': '{done} de {total} passos',

  'category.drawing-painting': 'Desenho e Pintura',
  'category.paper-card': 'Papel e Cartão',
  'category.recycled': 'Sucata',
  'category.clay-model-making': 'Massa e Modelagem',
  'category.textile-yarn': 'Lã e Têxtil',
  'category.spin-art': 'Spin Art',
  'category.2d-design': 'Design 2D',
  'category.3d-modelling': 'Modelagem 3D',
  'category.creative-challenge': 'Desafios Criativos',

  'difficulty.1': 'Fácil',
  'difficulty.2': 'Médio',
  'difficulty.3': 'Desafio',

  'tutorial.materials': 'O que você precisa',
  'tutorial.tip': 'Dica',
  'tutorial.safety': 'Com um adulto',
  'tutorial.time': '{minutes} min',

  'step.of': 'Passo {n} de {total}',
  'step.prev': 'Anterior',
  'step.next': 'Próximo',
  'step.print': 'Imprimir o molde',
  'step.finish': 'Terminei!',
  'step.swatches': 'Suas três cores',

  'celebrate.title': 'Você conseguiu, {name}!',
  'celebrate.again': 'Ver de novo',
  'celebrate.back': 'Voltar aos tutorials',

  'gallery.heading': 'Galeria',
  'gallery.emptyTitle': 'Sua galeria está esperando as suas criações!',
  'gallery.emptyText': 'Quando os jogos criativos chegarem, seus desenhos, modelos e animações vão morar aqui, neste aparelho.',
  'gallery.explore': 'Explorar tutorials',

  'games.heading': 'Jogos',
  'games.season': 'Estação',
  'games.pick': 'Escolha um lugar para jogar.',
  'games.comingTitle': '{name} está chegando!',
  'games.backToMap': 'Voltar ao mapa',
  'games.tryTutorials': 'Ver tutorials de {topic}',

  'season.spring': 'Primavera',
  'season.summer': 'Verão',
  'season.autumn': 'Outono',
  'season.winter': 'Inverno',

  'dest.art-studio': 'Art Studio',
  'dest.craft-workshop': 'Craft Workshop',
  'dest.spin-art-lab': 'Spin Art Lab',
  'dest.2d-studio': '2D Studio',
  'dest.3d-studio': '3D Studio',
  'dest.creative-challenges': 'Creative Challenges',

  'dest.art-studio.soon': 'Em breve você vai poder pintar do seu jeito no Ateliê de Arte.',
  'dest.art-studio.topic': 'desenho e pintura',
  'dest.craft-workshop.soon': 'Em breve você vai montar coisas de papel, sucata e lã naOficina de Artesanato.',
  'dest.craft-workshop.topic': 'papel e sucata',
  'dest.spin-art-lab.soon': 'Em breve o Laboratório de Spin Art vai girar as suas tintas em desenhos de redemoinho.',
  'dest.spin-art-lab.topic': 'spin art',
  'dest.2d-studio.soon': 'Em breve o Estúdio 2D vai ter formas, grades e camadas para você desenhar na tela.',
  'dest.2d-studio.topic': 'design 2D',
  'dest.3d-studio.soon': 'Em breve você vai construir com cubos, esferas e todas as formas mais engraçadas.',
  'dest.3d-studio.topic': 'modelagem 3D',
  'dest.creative-challenges.soon': 'Em breve chegou o baú dos Desafios Criativos, com surpresas para você escolher.',
  'dest.creative-challenges.topic': 'desafios criativos',

  't01.title': 'Corujinha Pintada',
  't01.description': 'Uma corujinha de papel, pintada por você do começo ao fim.',
  't01.s1': 'Imprima ou passe o contorno da coruja no papel.',
  't01.s1.tip': 'Se não tiver impressora, desenhe a coruja numa folha e copie o formato.',
  't01.s2': 'Escolha três cores e coloque os potes do lado.',
  't01.s2.tip': 'Uma cor clara, uma escura e uma de destaque deixa tudo mais bonito.',
  't01.s3': 'Pinte as orelhas primeiro.',
  't01.s3.tip': 'Orelhas primeiro porque são as partes que mais aparece de longe.',
  't01.s4': 'Pinte o corpo e as asas.',
  't01.s4.tip': 'Comece pela cor clara e deixe a escura para o final.',
  't01.s5': 'Faça os dois olhos grandes e a pupila preta.',
  't01.s5.tip': 'Dois círculos grandes fazem a coruja parecer simpática.',
  't01.s6': 'Pense em penas: pontinhos e arquinhos pequenos.',
  't01.s6.tip': 'Repita o mesmo desenho em vários lugares, como um padrão.',
  't01.s7': 'Assine a sua coruja e deixa ela secar.',
  't01.s7.tip': 'Um nome na arte mostra que ela é sua.',

  'material.template': 'molde da coruja (ou papel comum)',
  'material.paint': 'tinta lavável',
  'material.brush': 'pincel',
  'material.water': 'água',
  'material.pen': 'caneta preta',
};

const EN = {
  'app.title': 'Arts & Crafts Adventures',
  'app.hello': 'Hi, {name}!',

  'home.tutorials': 'Tutorials',
  'home.tutorialsSub': 'Make something amazing, one picture at a time.',
  'home.games': 'Games',
  'home.gamesSub': 'Explore the creative world.',
  'home.gallery': 'Gallery',
  'home.gallerySub': 'Your creations live here.',

  'nav.back': 'Back',
  'nav.home': 'Home',

  'tutorials.heading': 'Tutorials',
  'tutorials.search': 'Search tutorials…',
  'tutorials.all': 'All',
  'tutorials.printable': 'Printable',
  'tutorials.quick': 'Quick',
  'tutorials.featured': 'Start here',
  'tutorials.continue': 'Pick up where you left off',
  'tutorials.empty': 'No tutorial with that filter.',
  'tutorials.count': '{count} tutorials',
  'tutorials.countOne': '{count} tutorial',
  'tutorials.completed': 'Done',
  'tutorials.progress': '{done} of {total} steps',

  'category.drawing-painting': 'Drawing & Painting',
  'category.paper-card': 'Paper & Card',
  'category.recycled': 'Recycled Crafts',
  'category.clay-model-making': 'Clay & Model Making',
  'category.textile-yarn': 'Yarn & Textile',
  'category.spin-art': 'Spin Art',
  'category.2d-design': '2D Design',
  'category.3d-modelling': '3D Modelling',
  'category.creative-challenge': 'Creative Challenges',

  'difficulty.1': 'Easy',
  'difficulty.2': 'Medium',
  'difficulty.3': 'Challenge',

  'tutorial.materials': 'What you need',
  'tutorial.tip': 'Tip',
  'tutorial.safety': 'With an adult',
  'tutorial.time': '{minutes} min',

  'step.of': 'Step {n} of {total}',
  'step.prev': 'Previous',
  'step.next': 'Next',
  'step.print': 'Print the template',
  'step.finish': 'I finished!',
  'step.swatches': 'Your three colours',

  'celebrate.title': 'You made it, {name}!',
  'celebrate.again': 'See it again',
  'celebrate.back': 'Back to tutorials',

  'gallery.heading': 'Gallery',
  'gallery.emptyTitle': 'Your gallery is waiting for your creations!',
  'gallery.emptyText': 'When the creative games arrive, your pictures, models and animations can live here on this device.',
  'gallery.explore': 'Explore tutorials',

  'games.heading': 'Games',
  'games.season': 'Season',
  'games.pick': 'Choose a place to play.',
  'games.comingTitle': '{name} is coming next!',
  'games.backToMap': 'Back to map',
  'games.tryTutorials': 'Try {topic} tutorials',

  'season.spring': 'Spring',
  'season.summer': 'Summer',
  'season.autumn': 'Autumn',
  'season.winter': 'Winter',

  'dest.art-studio': 'Art Studio',
  'dest.craft-workshop': 'Craft Workshop',
  'dest.spin-art-lab': 'Spin Art Lab',
  'dest.2d-studio': '2D Studio',
  'dest.3d-studio': '3D Studio',
  'dest.creative-challenges': 'Creative Challenges',

  'dest.art-studio.soon': 'Soon you will be able to paint your own way in the Art Studio.',
  'dest.art-studio.topic': 'drawing and painting',
  'dest.craft-workshop.soon': 'Soon you will build paper, recycled and yarn things in the Craft Workshop.',
  'dest.craft-workshop.topic': 'paper and recycled',
  'dest.spin-art-lab.soon': 'Soon the Spin Art Lab will spin your paints into swirl drawings.',
  'dest.spin-art-lab.topic': 'spin art',
  'dest.2d-studio.soon': 'Soon the 2D Studio will have shapes, grids and layers to draw on screen.',
  'dest.2d-studio.topic': '2D design',
  'dest.3d-studio.soon': 'Soon you will build with cubes, spheres and all kinds of funny shapes.',
  'dest.3d-studio.topic': '3D modelling',
  'dest.creative-challenges.soon': 'Soon the Creative Challenges chest arrives, with surprises for you to pick.',
  'dest.creative-challenges.topic': 'creative challenges',

  't01.title': 'Cute Painted Owl',
  't01.description': 'A paper owl, painted by you from start to finish.',
  't01.s1': 'Print or trace the owl onto your paper.',
  't01.s1.tip': 'No printer? Draw a simple owl on a sheet and copy the shape.',
  't01.s2': 'Choose three colours and set the pots beside you.',
  't01.s2.tip': 'One light colour, one dark colour and one highlight looks the best.',
  't01.s3': 'Paint the ears first.',
  't01.s3.tip': 'Ears first, because they are what you see from far away.',
  't01.s4': 'Paint the body and the wings.',
  't01.s4.tip': 'Start with the light colour and save the dark one for last.',
  't01.s5': 'Add the two big eyes and the black pupils.',
  't01.s5.tip': 'Two big round circles make an owl look friendly.',
  't01.s6': 'Think feathers: little dots and small arches.',
  't01.s6.tip': 'Repeat the same shape in several places, like a pattern.',
  't01.s7': 'Sign your owl and let it dry.',
  't01.s7.tip': 'A name on your art shows it is yours.',

  'material.template': 'owl template (or plain paper)',
  'material.paint': 'washable paint',
  'material.brush': 'paintbrush',
  'material.water': 'water',
  'material.pen': 'black pen',
};

const ES = {
  'app.title': 'Arts & Crafts Adventures',
  'app.hello': '¡Hola, {name}!',

  'home.tutorials': 'Tutoriales',
  'home.tutorialsSub': 'Crea algo increíble, un dibujo cada vez.',
  'home.games': 'Juegos',
  'home.gamesSub': 'Explora el mundo creativo.',
  'home.gallery': 'Galería',
  'home.gallerySub': 'Tus creaciones viven aquí.',

  'nav.back': 'Volver',
  'nav.home': 'Inicio',

  'tutorials.heading': 'Tutoriales',
  'tutorials.search': 'Buscar tutoriales…',
  'tutorials.all': 'Todo',
  'tutorials.printable': 'Para imprimir',
  'tutorials.quick': 'Rápidos',
  'tutorials.featured': 'Empieza por aquí',
  'tutorials.continue': 'Continúa donde lo dejaste',
  'tutorials.empty': 'Ningún tutorial con ese filtro.',
  'tutorials.count': '{count} tutoriales',
  'tutorials.countOne': '{count} tutorial',
  'tutorials.completed': 'Hecho',
  'tutorials.progress': '{done} de {total} pasos',

  'category.drawing-painting': 'Dibujo y Pintura',
  'category.paper-card': 'Papel y Cartón',
  'category.recycled': 'Manualidades Recicladas',
  'category.clay-model-making': 'Arcilla y Modelado',
  'category.textile-yarn': 'Lana y Textil',
  'category.spin-art': 'Spin Art',
  'category.2d-design': 'Diseño 2D',
  'category.3d-modelling': 'Modelado 3D',
  'category.creative-challenge': 'Retos Creativos',

  'difficulty.1': 'Fácil',
  'difficulty.2': 'Medio',
  'difficulty.3': 'Reto',

  'tutorial.materials': 'Lo que necesitas',
  'tutorial.tip': 'Consejo',
  'tutorial.safety': 'Con un adulto',
  'tutorial.time': '{minutes} min',

  'step.of': 'Paso {n} de {total}',
  'step.prev': 'Anterior',
  'step.next': 'Siguiente',
  'step.print': 'Imprimir la plantilla',
  'step.finish': '¡Terminé!',
  'step.swatches': 'Tus tres colores',

  'celebrate.title': '¡Lo lograste, {name}!',
  'celebrate.again': 'Verlo otra vez',
  'celebrate.back': 'Volver a los tutoriales',

  'gallery.heading': 'Galería',
  'gallery.emptyTitle': '¡Tu galería espera tus creaciones!',
  'gallery.emptyText': 'Cuando lleguen los juegos creativos, tus dibujos, modelos y animaciones vivirán aquí, en este dispositivo.',
  'gallery.explore': 'Explorar tutoriales',

  'games.heading': 'Juegos',
  'games.season': 'Estación',
  'games.pick': 'Elige un lugar para jugar.',
  'games.comingTitle': '¡{name} viene pronto!',
  'games.backToMap': 'Volver al mapa',
  'games.tryTutorials': 'Ver tutoriales de {topic}',

  'season.spring': 'Primavera',
  'season.summer': 'Verano',
  'season.autumn': 'Otoño',
  'season.winter': 'Invierno',

  'dest.art-studio': 'Art Studio',
  'dest.craft-workshop': 'Craft Workshop',
  'dest.spin-art-lab': 'Spin Art Lab',
  'dest.2d-studio': '2D Studio',
  'dest.3d-studio': '3D Studio',
  'dest.creative-challenges': 'Creative Challenges',

  'dest.art-studio.soon': 'Pronto podrás pintar a tu manera en el Art Studio.',
  'dest.art-studio.topic': 'dibujo y pintura',
  'dest.craft-workshop.soon': 'Pronto construirás cosas de papel, recicladas y lana en el Craft Workshop.',
  'dest.craft-workshop.topic': 'papel y recicladas',
  'dest.spin-art-lab.soon': 'Pronto el Spin Art Lab girará tus pinturas en dibujos de remolino.',
  'dest.spin-art-lab.topic': 'spin art',
  'dest.2d-studio.soon': 'Pronto el 2D Studio tendrá formas, cuadrículas y capas para dibujar en pantalla.',
  'dest.2d-studio.topic': 'diseño 2D',
  'dest.3d-studio.soon': 'Pronto construirás con cubos, esferas y todas las formas más divertidas.',
  'dest.3d-studio.topic': 'modelado 3D',
  'dest.creative-challenges.soon': 'Pronto llega el cofre de los Retos Creativos, con sorpresas para elegir.',
  'dest.creative-challenges.topic': 'retos creativos',

  't01.title': 'Búho Pintado',
  't01.description': 'Un búho de papel, pintado por ti de principio a fin.',
  't01.s1': 'Imprime o calca el contorno del búho en tu papel.',
  't01.s1.tip': '¿No tienes impresora? Dibuja un búho sencillo en una hoja y copia la forma.',
  't01.s2': 'Elige tres colores y pon los botes a tu lado.',
  't01.s2.tip': 'Un color claro, uno oscuro y uno de luz queda lo mejor.',
  't01.s3': 'Pinta primero las orejas.',
  't01.s3.tip': 'Las orejas primero, porque son lo que se ve de lejos.',
  't01.s4': 'Pinta el cuerpo y las alas.',
  't01.s4.tip': 'Empieza por el color claro y guarda el oscuro para el final.',
  't01.s5': 'Haz los dos ojos grandes y las pupilas negras.',
  't01.s5.tip': 'Dos círculos grandes hacen que el búho parezca simpático.',
  't01.s6': 'Piensa en plumas: puntitos y arquitos pequeños.',
  't01.s6.tip': 'Repite la misma forma en varios sitios, como un patrón.',
  't01.s7': 'Firma tu búho y déjalo secar.',
  't01.s7.tip': 'Un nombre en tu arte muestra que es tuyo.',

  'material.template': 'plantilla del búho (o papel normal)',
  'material.paint': 'pintura lavable',
  'material.brush': 'pincel',
  'material.water': 'agua',
  'material.pen': 'rotulador negro',
};

export const DICTIONARIES = { pt: PT, en: EN, es: ES };

export const DEFAULT_LANGUAGE = 'pt';

export function isLanguage(value) {
  return LANGUAGES.includes(value);
}

// Troca {chave} por valor. Texto sem placeholder fica como está.
export function interpolate(template, values) {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (whole, key) => (key in values ? String(values[key]) : whole));
}

export function translate(dictionary, key, values) {
  const found = dictionary[key];
  if (found === undefined) return key;
  return interpolate(found, values);
}
