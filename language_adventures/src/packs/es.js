// Language Adventures — pack do ESPANHOL (segundo idioma-alvo).
import { buildActivities } from './builder.js';

const g = (pt, en, es) => ({ pt, en, es });

const s1vocab = [
  { target: 'Hola', gloss: g('olá', 'hello', 'hola') },
  { target: 'Adiós', gloss: g('tchau', 'goodbye', 'adiós') },
  { target: 'Gracias', gloss: g('obrigado', 'thank you', 'gracias') },
  { target: 'Sí', gloss: g('sim', 'yes', 'sí') },
  { target: 'No', gloss: g('não', 'no', 'no') },
  { target: 'Por favor', gloss: g('por favor', 'please', 'por favor') },
  { target: 'Buenos días', gloss: g('bom dia', 'good morning', 'buenos días') },
  { target: 'Yo', gloss: g('eu', 'me / I', 'yo') },
];

const s2vocab = [
  { target: 'rojo', gloss: g('vermelho', 'red', 'rojo') },
  { target: 'amarillo', gloss: g('amarelo', 'yellow', 'amarillo') },
  { target: 'azul', gloss: g('azul', 'blue', 'azul') },
  { target: 'verde', gloss: g('verde', 'green', 'verde') },
  { target: 'una manzana', gloss: g('uma maçã', 'an apple', 'una manzana') },
  { target: 'pan', gloss: g('pão', 'bread', 'pan') },
  { target: 'agua', gloss: g('água', 'water', 'agua') },
  { target: 'un pastel', gloss: g('um bolo', 'a cake', 'un pastel') },
];

const s3vocab = [
  { target: 'un gato', gloss: g('um gato', 'a cat', 'un gato') },
  { target: 'un perro', gloss: g('um cachorro', 'a dog', 'un perro') },
  { target: 'Me llamo…', gloss: g('meu nome é…', 'my name is…', 'me llamo…') },
  { target: 'Tengo siete años', gloss: g('eu tenho sete anos', 'I am seven years old', 'tengo siete años') },
  { target: 'un amigo / una amiga', gloss: g('um amigo / uma amiga', 'a friend', 'un amigo / una amiga') },
  { target: 'la casa', gloss: g('a casa', 'the house', 'la casa') },
  { target: 'juego', gloss: g('eu brinco', 'I play', 'juego') },
  { target: 'hasta pronto', gloss: g('até logo', 'see you soon', 'hasta pronto') },
];

const blanks = {
  s3: [
    {
      prompt: 'Me ___ Julia.',
      speak: 'Me llamo Julia',
      options: [
        { text: 'llamo', correct: true },
        { text: 'como', correct: false },
        { text: 'rojo', correct: false },
      ],
    },
    {
      prompt: '___ siete años.',
      speak: 'Tengo siete años',
      options: [
        { text: 'Tengo', correct: true },
        { text: 'Soy', correct: false },
        { text: 'Voy', correct: false },
      ],
    },
  ],
};

const stories = {
  s1: {
    title: { pt: 'Mateo chega à padaria', en: 'Mateo arrives at the bakery', es: 'Mateo llega a la panadería' },
    lines: [
      { pt: 'Mateo entra na padaria com a sua irmã.', en: 'Mateo walks into the bakery with his sister.', es: 'Mateo entra en la panadería con su hermana.' },
      { pt: 'O padeiro acena e diz: **¡Hola, Buenos días!**', en: 'The baker waves and says: **¡Hola, Buenos días!**', es: 'El panadero saluda y dice: **¡Hola, Buenos días!**' },
      { pt: 'Mateo responde **¡Hola!** bem alto, com um sorriso.', en: 'Mateo answers **¡Hola!** loudly, with a big smile.', es: 'Mateo responde **¡Hola!** muy fuerte, con una gran sonrisa.' },
    ],
    word: {
      target: 'Hola',
      gloss: g('olá', 'hello', 'hola'),
      phrase: '¡Hola, buenos días!',
    },
  },
  s2: {
    title: { pt: 'As frutas do mercado', en: 'The market fruits', es: 'Las frutas del mercado' },
    lines: [
      { pt: 'No mercado, Mateo vê morangos **rojos** — bem vermelhos.', en: 'At the market, Mateo sees **rojo** strawberries — really red.', es: 'En el mercado, Mateo ve fresas **rojas** — bien rojas.' },
      { pt: 'Ele vê também bananas **amarillas**, amarelas como o sol.', en: 'He also sees **amarillo** bananas — yellow like the sun.', es: 'También ve plátanos **amarillos**, amarillos como el sol.' },
      { pt: 'Ele escolhe **una manzana** grande para levar.', en: 'He picks a big **una manzana** to take home.', es: 'Elige **una manzana** grande para llevar.' },
    ],
    word: {
      target: 'una manzana',
      gloss: g('uma maçã', 'an apple', 'una manzana'),
      phrase: 'Una manzana, por favor.',
    },
  },
  s3: {
    title: { pt: 'O cachorro do parque', en: 'The park dog', es: 'El perro del parque' },
    lines: [
      { pt: 'No parque, Mateo vê **un perro** — um cachorro enorme e feliz.', en: 'At the park, Mateo sees **un perro** — a huge, happy dog.', es: 'En el parque, Mateo ve **un perro** — un perro enorme y feliz.' },
      { pt: 'Ele corre com o cachorro até a **casa** do seu amigo.', en: 'He runs with the dog to his friend\'s **casa** — house.', es: 'Corre con el perro hasta la **casa** de su amigo.' },
      { pt: 'Depois diz **¡hasta pronto!** e volta para brincar.', en: 'Then he says **¡hasta pronto!** and goes back to play.', es: 'Luego dice **¡hasta pronto!** y vuelve a jugar.' },
    ],
    word: {
      target: 'un perro',
      gloss: g('um cachorro', 'a dog', 'un perro'),
      phrase: 'Hola, perro!',
    },
  },
};

export const PACK = {
  id: 'es',
  name: 'Español',
  flag: '🇪🇸',
  locale: 'es-ES',
  sample: '¡Hola!',
  sections: [
    {
      id: 's1',
      color: '#ff5e7e',
      difficulty: 'easy',
      name: { pt: 'Primeiros passos', en: 'First steps', es: 'Primeros pasos' },
      lessons: [
        { id: 's1-l1', kind: 'story', ...stories.s1 },
        { id: 's1-l2', kind: 'lesson', difficulty: 'easy', title: { pt: 'Saudações', en: 'Greetings', es: 'Saludos' }, activities: buildActivities(s1vocab.slice(0, 5), 'easy') },
        { id: 's1-l3', kind: 'lesson', difficulty: 'easy', title: { pt: 'Sim e não', en: 'Yes and no', es: 'Sí y no' }, activities: buildActivities(s1vocab.slice(2, 6), 'easy') },
        { id: 's1-l4', kind: 'pronunciation', title: { pt: 'Falar Hola', en: 'Say Hola', es: 'Decir Hola' }, items: [
          { phrase: '¡Hola!', gloss: g('olá', 'hello', 'hola') },
          { phrase: '¡Gracias!', gloss: g('obrigado', 'thank you', 'gracias') },
          { phrase: '¡Adiós!', gloss: g('tchau', 'goodbye', 'adiós') },
        ] },
        { id: 's1-l5', kind: 'challenge', difficulty: 'easy', title: { pt: 'Desafio: cumprimentar', en: 'Challenge: greetings', es: 'Desafío: saludos' }, activities: buildActivities(s1vocab, 'medium') },
      ],
    },
    {
      id: 's2',
      color: '#ff9a3d',
      difficulty: 'medium',
      name: { pt: 'Cores e sabores', en: 'Colors and flavors', es: 'Colores y sabores' },
      lessons: [
        { id: 's2-l1', kind: 'story', ...stories.s2 },
        { id: 's2-l2', kind: 'lesson', difficulty: 'medium', title: { pt: 'Cores', en: 'Colors', es: 'Colores' }, activities: buildActivities(s2vocab.slice(0, 4), 'medium') },
        { id: 's2-l3', kind: 'lesson', difficulty: 'medium', title: { pt: 'Comidas', en: 'Foods', es: 'Comidas' }, activities: buildActivities(s2vocab.slice(4, 8), 'medium') },
        { id: 's2-l4', kind: 'pronunciation', title: { pt: 'Falar as cores', en: 'Say the colors', es: 'Decir los colores' }, items: [
          { phrase: 'rojo', gloss: g('vermelho', 'red', 'rojo') },
          { phrase: 'amarillo', gloss: g('amarelo', 'yellow', 'amarillo') },
          { phrase: 'azul', gloss: g('azul', 'blue', 'azul') },
        ] },
        { id: 's2-l5', kind: 'challenge', difficulty: 'medium', title: { pt: 'Desafio do mercado', en: 'Market challenge', es: 'Desafío del mercado' }, activities: buildActivities(s2vocab, 'medium') },
      ],
    },
    {
      id: 's3',
      color: '#ffd166',
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
          { phrase: 'Me llamo Mateo', gloss: g('meu nome é Mateo', 'my name is Mateo', 'me llamo Mateo') },
          { phrase: '¡Hasta pronto!', gloss: g('até logo', 'see you soon', 'hasta pronto') },
        ] },
        { id: 's3-l5', kind: 'challenge', difficulty: 'hard', title: { pt: 'Grande desafio', en: 'Big challenge', es: 'Gran desafío' }, activities: [
          ...buildActivities(s3vocab, 'hard'),
          ...blanks.s3.map((b) => ({ kind: 'complete', prompt: b.prompt, speak: b.speak, options: b.options })),
        ] },
      ],
    },
  ],
};
