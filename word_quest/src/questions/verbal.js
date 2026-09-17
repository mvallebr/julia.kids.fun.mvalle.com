// Geradores de questões de raciocínio verbal — estilo Quest/Bexley
// (múltipla escolha A–E, distratores plausíveis, explicação, multi-resposta
// quando sinalizado). Toda questão sai com: prompt, options (1..N correct),
// explanation, skill e band.

import { SYNONYMS, ANTONYMS, ANALOGIES, ODD_ONE_OUT, CONTEXT_GAPS, SPELLINGS } from './data.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function bandOf(tier) {
  if (tier <= 3) return 'easy';
  if (tier <= 6) return 'medium';
  if (tier <= 9) return 'hard';
  if (tier <= 12) return 'very hard';
  return 'very very hard';
}

// escolhe uma entrada do pool respeitando o tier (com folga de ±1 para
// garantir variedade mesmo em tiers com poucas entradas)
function pickEntry(pool, tier, rng) {
  const bandSize = tier <= 3 ? 3 : 3;
  const bandStart = tier - ((tier - 1) % bandSize) - (bandSize - 1);
  const candidates = pool.filter((entry) => entry.tier >= tier - 1 && entry.tier <= tier + 1);
  const list = candidates.length ? candidates : pool.filter((entry) => Math.abs(entry.tier - tier) <= bandSize);
  if (!list.length) return pool[Math.floor(rng() * pool.length)];
  void bandStart;
  void bandSize;
  return list[Math.floor(rng() * list.length)];
}

function shuffle(rng, list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// monta opções com letras A.., marca as corretas, devolve também o índice
function optionList(rng, correctTexts, wrongTexts) {
  const options = shuffle(rng, [
    ...correctTexts.map((text) => ({ text, correct: true })),
    ...wrongTexts.map((text) => ({ text, correct: false })),
  ]).map((option, index) => ({ ...option, letter: LETTERS[index] }));
  return options;
}

function baseQuestion(skill, tier) {
  const labels = {
    synonyms: 'Synonyms',
    antonyms: 'Antonyms',
    analogies: 'Analogy',
    'word relationships': 'Odd one out',
    'vocabulary context': 'In context',
    spelling: 'Spelling',
  };
  return { skill, skillLabel: labels[skill] || skill, tier, band: bandOf(tier), source: 'generated' };
}

// ── sinônimos ────────────────────────────────────────────────────────────────
// Nas faixas altas pode virar multi-resposta ("escolha DUAS palavras…"),
// mecânica presente no Bexley quando sinalizada.
export function synonymsQuestion(tier, rng) {
  const entry = pickEntry(SYNONYMS, tier, rng);
  const multi = tier >= 10 && entry.s.length >= 2 && rng() < 0.4;
  const correct = multi ? shuffle(rng, entry.s).slice(0, 2) : [entry.s[Math.floor(rng() * entry.s.length)]];
  const wrong = shuffle(rng, entry.d).slice(0, multi ? 3 : 2);
  const prompt = multi
    ? `Choose TWO words closest in meaning to "${entry.w}".`
    : `Choose the word closest in meaning to "${entry.w}".`;
  const correctTexts = correct;
  return {
    ...baseQuestion('synonyms', tier),
    kind: multi ? 'multi' : 'choice',
    prompt,
    display: entry.w,
    options: optionList(rng, correctTexts, wrong),
    explanation: `Synonyms of "${entry.w}" include ${entry.s.map((s) => `"${s}"`).join(', ')}.`,
  };
}

// ── antônimos ────────────────────────────────────────────────────────────────
export function antonymsQuestion(tier, rng) {
  const entry = pickEntry(ANTONYMS, tier, rng);
  const correct = [entry.s[Math.floor(rng() * entry.s.length)]];
  const wrong = shuffle(rng, entry.d).slice(0, 3);
  return {
    ...baseQuestion('antonyms', tier),
    kind: 'choice',
    prompt: `Choose the word with the OPPOSITE meaning to "${entry.w}".`,
    display: entry.w,
    options: optionList(rng, correct, wrong),
    explanation: `The opposite of "${entry.w}" is "${correct[0]}".`,
  };
}

// ── analogias ────────────────────────────────────────────────────────────────
export function analogyQuestion(tier, rng, all = ANALOGIES) {
  const entry = pickEntry(all, tier, rng);
  const others = all.filter((candidate) => candidate !== entry).map((candidate) => candidate.d);
  const wrong = shuffle(rng, others.filter((w) => w !== entry.d)).slice(0, 2);
  void wrong.length;
  return {
    ...baseQuestion('analogies', tier),
    kind: 'choice',
    prompt: `"${entry.a}" is to "${entry.b}" as "${entry.c}" is to ___?`,
    display: `${entry.a} : ${entry.b}`,
    options: optionList(rng, [entry.d], wrong.length ? wrong : ['stone', 'river']),
    explanation: `"${entry.a}" is a kind/part of ${entry.b === entry.d ? entry.d : entry.b} relationship: ${entry.a}→${entry.b}, so ${entry.c}→${entry.d}.`,
  };
}

// ── odd one out ──────────────────────────────────────────────────────────────
export function oddOneOutQuestion(tier, rng) {
  const entry = pickEntry(ODD_ONE_OUT, tier, rng);
  return {
    ...baseQuestion('word relationships', tier),
    kind: 'choice',
    prompt: 'Which word does NOT belong with the others?',
    display: shuffle(rng, entry.members).join(' · '),
    options: optionList(rng, [entry.odd], entry.members.filter((m) => m !== entry.odd)),
    explanation: `All the other words are connected with "${entry.cat}"; "${entry.odd}" is not.`,
  };
}

// ── lacuna de contexto ───────────────────────────────────────────────────────
export function contextQuestion(tier, rng) {
  const entry = pickEntry(CONTEXT_GAPS, tier, rng);
  return {
    ...baseQuestion('vocabulary in context', tier),
    kind: 'choice',
    prompt: 'Choose the word that best completes the sentence.',
    display: `${entry.before} ______ ${entry.after}`,
    options: optionList(rng, [entry.answer], entry.d),
    explanation: `"${entry.answer}" fits the meaning of the sentence; the other options do not.`,
  };
}

// ── ortografia (widget de chaves: a fechadura mostra o significado) ─────────
export function spellingQuestion(tier, rng) {
  const entry = pickEntry(SPELLINGS, tier, rng);
  return {
    ...baseQuestion('spelling', tier),
    kind: 'choice',
    widgetHint: 'keys',
    prompt: 'Which spelling is correct?',
    display: '?',
    lockLabel: 'correct spelling',
    options: optionList(rng, [entry.correct], entry.wrong),
    explanation: `"${entry.correct}" is the correct British spelling.`,
  };
}

// ── lógica verbal: fila ordenada (solução sempre única) ─────────────────────
const LOGIC_NAMES = ['Amara', 'Ben', 'Cleo', 'Dev', 'Elly', 'Finn', 'Gita', 'Hugo'];
const LOGIC_PLACES = ['dragon', 'owl', 'unicorn', 'fox', 'toad', 'raven', 'stag', 'mouse'];

export function linePuzzleQuestion(tier, rng) {
  const names = shuffle(rng, LOGIC_NAMES).slice(0, 4);
  const order = shuffle(rng, names);
  // fatos que determinam a fila: 1º, último, e a dupla do meio em ordem
  const facts = [
    `${order[0]} is first in the line.`,
    `${order[3]} is last in the line.`,
    `${order[2]} is standing somewhere between ${order[1]} and ${order[3]}.`,
  ];
  const askWho = order[Math.floor(rng() * 4)];
  const askLabel = ['first', 'second', 'third', 'last'][order.indexOf(askWho)];
  const wrong = names.filter((n) => n !== askWho);
  return {
    ...baseQuestion('verbal logic', tier),
    kind: 'choice',
    prompt: `Read the clues. Who is ${askLabel} in the line?\n${facts.map((f) => `• ${f}`).join('\n')}`,
    display: 'logic puzzle',
    options: optionList(rng, [askWho], wrong),
    explanation: `From the clues the order is ${order.join(' → ')}, so ${askWho} is ${askLabel}.`,
  };
}

// ── lógica verbal: dedução "o que tem de ser verdade" ────────────────────────
export function deductionQuestion(tier, rng) {
  const [childA, childB] = shuffle(rng, LOGIC_NAMES).slice(0, 2);
  const [petA, petB] = shuffle(rng, LOGIC_PLACES).slice(0, 2);
  const animalA = 'dragon';
  const animalB = 'owl';
  return {
    ...baseQuestion('verbal logic', tier),
    kind: 'choice',
    prompt: `Every child in Class 3 keeps either a ${animalA} or a ${animalB}. Every child who keeps a ${animalA} also keeps a ${petA}. ${childA} keeps a ${animalB}. ${childB} keeps a ${petB}. What MUST be true?`,
    display: 'deduction',
    options: optionList(
      rng,
      [`${childA} does not keep a ${petA}.`],
      [
        `${childA} keeps a ${animalA}.`,
        `${childB} keeps a ${animalA}.`,
        `Everyone keeps a ${petB}.`,
      ],
    ),
    explanation: `${childA} keeps a ${animalB}, and no child keeps both; only ${animalA}-keepers keep a ${petA}. So ${childA} cannot keep a ${petA}.`,
  };
}

export const LOGIC_GENERATORS = [linePuzzleQuestion, deductionQuestion];

export const ALL = {
  synonymsQuestion,
  antonymsQuestion,
  analogyQuestion,
  oddOneOutQuestion,
  contextQuestion,
  spellingQuestion,
  linePuzzleQuestion,
  deductionQuestion,
};
