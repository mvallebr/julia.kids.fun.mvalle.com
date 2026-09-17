// Banco de questões do The Word Quest.
// Reaproveita os pools lexicais validados do English Adventures (mesma
// jogadora, mesmo objetivo Bexley) e adiciona a seleção com repetição
// espaçada por palavra (spec §17/§18/§37).

import { seededRandom, shuffled } from './rng.js';
import {
  SYNONYMS, ANTONYMS, ANALOGIES, ODD_ONE_OUT, CONTEXT_GAPS, SPELLINGS,
} from './questions/data.js';
import { dueWords } from './state.js';

export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function rngFor(seed) {
  return seededRandom(seed);
}

function shuffle(rng, list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function bandTier(chapterIndex) {
  // 7 capítulos → faixas: easy, easy, medium, medium, hard, very hard, vv hard
  const map = [1, 2, 4, 5, 7, 11, 14];
  return map[chapterIndex] ?? 1;
}

function optionList(rng, correctTexts, wrongTexts) {
  return shuffle(rng, [
    ...correctTexts.map((text) => ({ text, correct: true })),
    ...wrongTexts.map((text) => ({ text, correct: false })),
  ]);
}

// ── geradores por família ────────────────────────────────────────────────────
function synonymsQuestion(tier, rng) {
  const near = SYNONYMS.filter((entry) => Math.abs(entry.tier - tier) <= 3);
  const list = near.length ? near : SYNONYMS;
  const entry = list[Math.floor(rng() * list.length)];
  const correct = entry.s[Math.floor(rng() * entry.s.length)];
  const wrong = shuffle(rng, entry.d).slice(0, 3);
  return {
    skill: 'synonyms',
    targetWords: [entry.w],
    prompt: `Which word is closest in meaning to “${entry.w}”?`,
    display: entry.w,
    options: optionList(rng, [correct], wrong),
    explanation: `“${correct}” means the same as “${entry.w}”.`,
    hint: `Think of another way to say “${entry.w}”.`,
    journal: { word: entry.w, def: `= ${entry.s.slice(0, 2).join(', ')}`, example: `A ${entry.w} moment.` },
  };
}

function antonymsQuestion(tier, rng) {
  const near = ANTONYMS.filter((entry) => Math.abs(entry.tier - tier) <= 3);
  const list = near.length ? near : ANTONYMS;
  const entry = list[Math.floor(rng() * list.length)];
  const correct = entry.s[Math.floor(rng() * entry.s.length)];
  const wrong = shuffle(rng, entry.d).slice(0, 3);
  return {
    skill: 'antonyms',
    targetWords: [entry.w],
    prompt: `Which word is the OPPOSITE of “${entry.w}”?`,
    display: entry.w,
    options: optionList(rng, [correct], wrong),
    explanation: `The opposite of “${entry.w}” is “${correct}”.`,
    hint: `Think of the exact opposite of “${entry.w}”.`,
    journal: { word: entry.w, def: `≠ ${entry.s.slice(0, 2).join(', ')}`, example: '' },
  };
}

function analogyQuestion(tier, rng) {
  const near = ANALOGIES.filter((entry) => Math.abs(entry.tier - tier) <= 4);
  const list = near.length ? near : ANALOGIES;
  const entry = list[Math.floor(rng() * list.length)];
  const wrong = shuffle(rng, ANALOGIES.filter((candidate) => candidate !== entry).map((candidate) => candidate.d)).slice(0, 3);
  return {
    skill: 'analogies',
    targetWords: [],
    prompt: `“${entry.a}” is to “${entry.b}” as “${entry.c}” is to ___?`,
    display: `${entry.a} → ${entry.b}`,
    options: optionList(rng, [entry.d], wrong),
    explanation: `The same relationship: ${entry.a} goes with ${entry.b}, so ${entry.c} goes with ${entry.d}.`,
    hint: 'Say the pair out loud: “a goes with b…”',
  };
}

function oddOneOutQuestion(tier, rng) {
  const near = ODD_ONE_OUT.filter((entry) => Math.abs(entry.tier - tier) <= 4);
  const list = near.length ? near : ODD_ONE_OUT;
  const entry = list[Math.floor(rng() * list.length)];
  return {
    skill: 'word relationships',
    targetWords: [],
    prompt: 'Which word does NOT belong with the others?',
    display: shuffle(rng, entry.members).join('  ·  '),
    options: optionList(rng, [entry.odd], entry.members.filter((member) => member !== entry.odd)),
    explanation: `The others all belong to “${entry.cat}”; “${entry.odd}” does not.`,
    hint: `Three of them share the group “${entry.cat}”.`,
  };
}

function contextQuestion(tier, rng) {
  const near = CONTEXT_GAPS.filter((entry) => Math.abs(entry.tier - tier) <= 3);
  const list = near.length ? near : CONTEXT_GAPS;
  const entry = list[Math.floor(rng() * list.length)];
  return {
    skill: 'vocabulary_context',
    targetWords: [entry.answer],
    prompt: 'Choose the word that best completes the sentence.',
    display: `${entry.before} ______ ${entry.after}`,
    options: optionList(rng, [entry.answer], entry.d),
    explanation: `“${entry.answer}” fits the sentence; the other options do not make sense there.`,
    hint: 'Read the whole sentence and imagine it happening.',
    journal: { word: entry.answer, def: 'fits this sentence', example: `${entry.before} … ${entry.after}` },
  };
}

function spellingQuestion(tier, rng) {
  const near = SPELLINGS.filter((entry) => Math.abs(entry.tier - tier) <= 3);
  const list = near.length ? near : SPELLINGS;
  const entry = list[Math.floor(rng() * list.length)];
  return {
    skill: 'spelling',
    targetWords: [entry.correct],
    prompt: 'Choose the correct spelling.',
    display: '🖌️ Spelling check',
    options: optionList(rng, [entry.correct], entry.wrong),
    explanation: `“${entry.correct}” is the correct British spelling.`,
    hint: 'Say the word slowly, syllable by syllable.',
    journal: { word: entry.correct, def: 'correct spelling', example: '' },
  };
}

// ── seleção com repetição espaçada (spec §37) ────────────────────────────────
// 1. se houver palavras "vencidas" no journal, 1 a cada 3 questões volta para
//    uma delas, num formato diferente do original;
// 2. caso contrário, sorteia uma família com viés para as habilidades fracas.
export function nextQuestion({ chapterIndex, questionSeed, state, avoidPrompt = '' }) {
  const tier = bandTier(chapterIndex);
  const rng = seededRandom(`${playerSeed(state)}:q:${chapterIndex}:${questionSeed}`);

  // 1) reforço de palavra vencida (1 em cada 3, se houver candidata)
  const due = dueWords(state);
  const reinforcementCandidate = due.length && questionSeed % 3 === 2 ? due[0] : null;
  if (reinforcementCandidate) {
    const word = reinforcementCandidate.word;
    const entry = state.journal[word];
    // formato diferente conforme o que a palavra precisa
    if (entry.w > entry.c) return antonymsQuestion(tier, rng);
    return synonymsQuestion(tier, rng);
  }

  // 2) família com viés adaptativo
  const family = weakestFamily(state.skills, rng);
  const question = GENERATORS[family](tier, rng);
  if (avoidPrompt && question.prompt === avoidPrompt) {
    return GENERATORS[(family + 1) % GENERATORS.length](tier, rng);
  }
  return question;
}

function playerSeed(state) {
  return `wq:${state.character}:${state.chapter}`;
}

const GENERATORS = {
  synonyms: synonymsQuestion,
  antonyms: antonymsQuestion,
  analogies: analogyQuestion,
  'word relationships': oddOneOutQuestion,
  'vocabulary context': contextQuestion,
  spelling: spellingQuestion,
};

function weakestFamily(skills = {}, rng) {
  const families = Object.keys(GENERATORS);
  let worst = families[Math.floor(rng() * families.length)];
  let worstScore = Infinity;
  for (const family of families) {
    const record = skills[family] || { c: 0, w: 0 };
    const total = record.c + record.w;
    const score = total === 0 ? 0.5 : (record.c + 0.4) / (total + 0.8);
    if (score < worstScore) {
      worstScore = score;
      worst = family;
    }
  }
  return worst;
}

// 50/50 nunca remove a correta (reexport do state para conveniência)
export { fiftyFifty } from './state.js';
