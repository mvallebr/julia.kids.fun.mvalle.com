// Language Adventures — pack do FRANCÊS (primeiro idioma-alvo, spec §3/§16).
import { buildActivities } from './builder.js';

const g = (pt, en, es) => ({ pt, en, es });

// ── vocabulário por seção ────────────────────────────────────────────────────
const s1vocab = [
  { target: 'Bonjour', gloss: g('olá (bom dia)', 'hello / good morning', 'hola (buenos días)') },
  { target: 'Salut', gloss: g('oi', 'hi', 'hola') },
  { target: 'Au revoir', gloss: g('tchau', 'goodbye', 'adiós') },
  { target: 'Merci', gloss: g('obrigado', 'thank you', 'gracias') },
  { target: 'Oui', gloss: g('sim', 'yes', 'sí') },
  { target: 'Non', gloss: g('não', 'no', 'no') },
  { target: 'S\'il te plaît', gloss: g('por favor', 'please', 'por favor') },
  { target: 'Moi', gloss: g('eu', 'me / I', 'yo') },
];

const s2vocab = [
  { target: 'rouge', gloss: g('vermelho', 'red', 'rojo') },
  { target: 'jaune', gloss: g('amarelo', 'yellow', 'amarillo') },
  { target: 'bleu', gloss: g('azul', 'blue', 'azul') },
  { target: 'vert', gloss: g('verde', 'green', 'verde') },
  { target: 'une pomme', gloss: g('uma maçã', 'an apple', 'una manzana') },
  { target: 'du pain', gloss: g('pão', 'bread', 'pan') },
  { target: 'de l\'eau', gloss: g('água', 'water', 'agua') },
  { target: 'un gâteau', gloss: g('um bolo', 'a cake', 'un pastel') },
];

const s3vocab = [
  { target: 'un chat', gloss: g('um gato', 'a cat', 'un gato') },
  { target: 'un chien', gloss: g('um cachorro', 'a dog', 'un perro') },
  { target: 'Je m\'appelle…', gloss: g('meu nome é…', 'my name is…', 'me llamo…') },
  { target: 'J\'ai sept ans', gloss: g('eu tenho sete anos', 'I am seven years old', 'tengo siete años') },
  { target: 'une ami(e)', gloss: g('um amigo / uma amiga', 'a friend', 'un amigo / una amiga') },
  { target: 'la maison', gloss: g('a casa', 'the house', 'la casa') },
  { target: 'je joue', gloss: g('eu brinco', 'I play', 'juego') },
  { target: 'à bientôt', gloss: g('até logo', 'see you soon', 'hasta pronto') },
];

// ── frases com lacuna (atividade "complete") ────────────────────────────────
const blanks = {
  s3: [
    {
      prompt: 'Je m\'___ Julia.',
      speak: 'Je m\'appelle Julia',
      options: [
        { text: 'appelle', correct: true },
        { text: 'mange', correct: false },
        { text: 'rouge', correct: false },
      ],
    },
    {
      prompt: 'J\'___ sept ans.',
      speak: 'J\'ai sept ans',
      options: [
        { text: 'ai', correct: true },
        { text: 'suis', correct: false },
        { text: 'va', correct: false },
      ],
    },
  ],
};

// ── histórias (idioma base + 1 palavra nova, spec §7) ───────────────────────
const stories = {
  s1: {
    title: { pt: 'Sofia chega ao mercado', en: 'Sofia arrives at the market', es: 'Sofía llega al mercado' },
    lines: [
      { pt: 'Sofia chega à feirinha com a sua mochila amarela.', en: 'Sofia arrives at the little market with her yellow backpack.', es: 'Sofía llega a la feria con su mochila amarilla.' },
      { pt: 'O vendedor sorri e diz: **Bonjour !**', en: 'The shopkeeper smiles and says: **Bonjour !**', es: 'El vendedor sonríe y dice: **Bonjour !**' },
      { pt: 'Sofia responde **Bonjour !** também — que palavra simpática.', en: 'Sofia answers **Bonjour !** too — such a friendly word.', es: 'Sofía también responde **Bonjour !** — qué palabra tan amable.' },
    ],
    word: {
      target: 'Bonjour',
      gloss: g('olá (bom dia)', 'hello / good morning', 'hola (buenos días)'),
      phrase: 'Bonjour !',
    },
  },
  s2: {
    title: { pt: 'A fruteira colorida', en: 'The colorful fruit stand', es: 'El puesto de frutas colorido' },
    lines: [
      { pt: 'No mercado, Sofia vê maçãs **rouges** — vermelhas como tomate!', en: 'At the market, Sofia sees **rouge** apples — red like tomatoes!', es: 'En el mercado, Sofía ve manzanas **rouges** — ¡rojas como tomates!' },
      { pt: 'Ela também vê limões **jaunes**, amarelos e brilhantes.', en: 'She also sees **jaune** lemons — bright yellow.', es: 'También ve limones **jaunes**, amarillos y brillantes.' },
      { pt: 'Ela compra **une pomme** para o lanche.', en: 'She buys **une pomme** for a snack.', es: 'Compra **une pomme** para la merienda.' },
    ],
    word: {
      target: 'une pomme',
      gloss: g('uma maçã', 'an apple', 'una manzana'),
      phrase: 'Une pomme, s\'il vous plaît !',
    },
  },
  s3: {
    title: { pt: 'O amigo de fourrure', en: 'The furry friend', es: 'El amigo peludo' },
    lines: [
      { pt: 'No caminho para casa, Sofia encontra um gatinho: **un chat !**', en: 'On the way home, Sofia meets a kitten: **un chat !**', es: 'De camino a casa, Sofía se encuentra con un gatito: **un chat !**' },
      { pt: 'O gatinho mia e anda com ela até a **maison** — a casa dela.', en: 'The kitten meows and walks with her to her **maison** — her house.', es: 'El gatito maúlla y la acompaña hasta su **maison** — su casa.' },
      { pt: 'Ela diz **À bientôt !** — até logo, amigo.', en: 'She says **À bientôt !** — see you soon, friend.', es: 'Dice **À bientôt !** — hasta pronto, amigo.' },
    ],
    word: {
      target: 'un chat',
      gloss: g('um gato', 'a cat', 'un gato'),
      phrase: 'Salut, un chat !',
    },
  },
};

// ── montagem das seções (spec §4/§5/§6/§22) ────────────────────────────────
export const PACK = {
  id: 'fr',
  name: 'Français',
  flag: '🇫🇷',
  locale: 'fr-FR',
  sample: 'Bonjour !',
  sections: [
    {
      id: 's1',
      color: '#ff5e7e', // vermelho (spec §5)
      difficulty: 'easy',
      name: { pt: 'Primeiros passos', en: 'First steps', es: 'Primeros pasos' },
      lessons: [
        { id: 's1-l1', kind: 'story', ...stories.s1 },
        { id: 's1-l2', kind: 'lesson', difficulty: 'easy', title: { pt: 'Saudações', en: 'Greetings', es: 'Saludos' }, activities: buildActivities(s1vocab.slice(0, 5), 'easy') },
        { id: 's1-l3', kind: 'lesson', difficulty: 'easy', title: { pt: 'Sim e não', en: 'Yes and no', es: 'Sí y no' }, activities: buildActivities(s1vocab.slice(2, 6), 'easy') },
        { id: 's1-l4', kind: 'pronunciation', title: { pt: 'Falar Bonjour', en: 'Say Bonjour', es: 'Decir Bonjour' }, items: [
          { phrase: 'Bonjour !', gloss: g('olá (bom dia)', 'hello / good morning', 'hola (buenos días)') },
          { phrase: 'Salut !', gloss: g('oi', 'hi', 'hola') },
          { phrase: 'Merci !', gloss: g('obrigado', 'thank you', 'gracias') },
        ] },
        { id: 's1-l5', kind: 'challenge', difficulty: 'easy', title: { pt: 'Desafio: cumprimentar', en: 'Challenge: greetings', es: 'Desafío: saludos' }, activities: buildActivities(s1vocab, 'medium') },
      ],
    },
    {
      id: 's2',
      color: '#ff9a3d', // laranja
      difficulty: 'medium',
      name: { pt: 'Cores e sabores', en: 'Colors and flavors', es: 'Colores y sabores' },
      lessons: [
        { id: 's2-l1', kind: 'story', ...stories.s2 },
        { id: 's2-l2', kind: 'lesson', difficulty: 'medium', title: { pt: 'Cores', en: 'Colors', es: 'Colores' }, activities: buildActivities(s2vocab.slice(0, 4), 'medium') },
        { id: 's2-l3', kind: 'lesson', difficulty: 'medium', title: { pt: 'Comidas', en: 'Foods', es: 'Comidas' }, activities: buildActivities(s2vocab.slice(4, 8), 'medium') },
        { id: 's2-l4', kind: 'pronunciation', title: { pt: 'Falar as cores', en: 'Say the colors', es: 'Decir los colores' }, items: [
          { phrase: 'rouge', gloss: g('vermelho', 'red', 'rojo') },
          { phrase: 'jaune', gloss: g('amarelo', 'yellow', 'amarillo') },
          { phrase: 'bleu', gloss: g('azul', 'blue', 'azul') },
        ] },
        { id: 's2-l5', kind: 'challenge', difficulty: 'medium', title: { pt: 'Desafio do mercado', en: 'Market challenge', es: 'Desafío del mercado' }, activities: buildActivities(s2vocab, 'medium') },
      ],
    },
    {
      id: 's3',
      color: '#ffd166', // amarelo
      difficulty: 'hard',
      name: { pt: 'Dia a dia', en: 'Every day', es: 'Día a día' },
      lessons: [
        { id: 's3-l1', kind: 'story', ...stories.s3 },
        { id: 's3-l2', kind: 'lesson', difficulty: 'hard', title: { pt: 'Animais', en: 'Animals', es: 'Animales' }, activities: buildActivities(s3vocab.slice(0, 4), 'hard') },
        { id: 's3-l3', kind: 'lesson', difficulty: 'hard', title: { pt: 'Frases', en: 'Phrases', es: 'Frases' }, activities: [
          ...buildActivities(s3vocab.slice(2, 6), 'hard'),
          ...blanks.s3.map((b) => ({ kind: 'complete', prompt: b.prompt, speak: b.speak, options: b.options })),
        ] },
        { id: 's3-l4', kind: 'pronunciation', title: { pt: 'Falar de você', en: 'Talk about you', es: 'Hablar de ti' }, items: [
          { phrase: 'Je m\'appelle Julia', gloss: g('meu nome é Julia', 'my name is Julia', 'me llamo Julia') },
          { phrase: 'À bientôt !', gloss: g('até logo', 'see you soon', 'hasta pronto') },
        ] },
        { id: 's3-l5', kind: 'challenge', difficulty: 'hard', title: { pt: 'Grande desafio', en: 'Big challenge', es: 'Gran desafío' }, activities: [
          ...buildActivities(s3vocab, 'hard'),
          ...blanks.s3.map((b) => ({ kind: 'complete', prompt: b.prompt, speak: b.speak, options: b.options })),
        ] },
      ],
    },
  ],
};
