// API unificada de questões do English Adventures.
// questionFor(worldId, encounterId, slot, tier, player, skills) → desafio
// { kind, prompt, display?, options[{letter,text,correct}], multi?, explanation,
//   skill, passage? }
// A escolha da habilidade é adaptativa: prioriza as habilidades com mais
// erros registrados (spec "adaptive learning"), sem mudar a aparência do jogo.

import {
  synonymsQuestion, antonymsQuestion, analogyQuestion, oddOneOutQuestion,
  contextQuestion, spellingQuestion, linePuzzleQuestion, deductionQuestion,
} from './verbal.js';
import { SYNONYMS } from './data.js';
import { spagQuestion } from './spag.js';
import { PASSAGES } from './passages.js';
import { seededRandom, shuffled } from '../rng.js';

// gens por "família" de habilidade
const GENERATORS = {
  synonyms: synonymsQuestion,
  antonyms: antonymsQuestion,
  analogies: analogyQuestion,
  'word relationships': oddOneOutQuestion,
  'vocabulary in context': contextQuestion,
  spelling: spellingQuestion,
  grammar: spagQuestion,
  punctuation: spagQuestion,
  'sentence structure': spagQuestion,
  'verbal logic': (tier, rng) => (rng() < 0.5 ? linePuzzleQuestion(tier, rng) : deductionQuestion(tier, rng)),
  retrieval: null, // compreensão vem do banco de passagens
  inference: null,
  'language effects': null,
  'authorial intent': null,
  'sentence structure': spagQuestion,
};

const SKILL_KEYS = Object.keys(GENERATORS);

// escolhe a habilidade mais fraca (menor acerto) entre as candidatas
export function weakestSkill(skills = {}, candidates) {
  const pool = candidates && candidates.length ? candidates : SKILL_KEYS.filter((key) => GENERATORS[key]);
  let worst = pool[0];
  let worstRate = Infinity;
  for (const key of pool) {
    const record = skills[key] || { c: 0, w: 0 };
    const total = record.c + record.w;
    const rate = total === 0 ? 0.5 + Math.random() * 0 : (record.c + 0.5) / (total + 1);
    void rate;
    const score = total === 0 ? 0.45 : (record.c + 0.4) / (total + 0.8);
    if (score < worstRate) {
      worstRate = score;
      worst = key;
    }
  }
  return worst;
}

// rotação dos 5 desafios de cada mundo (espelha o Maths, com conteúdo verbal)
export function encounterPlan(worldIndex) {
  const special = [['keys', 'spelling'], ['stones', 'verbal logic'], ['match', 'synonyms']][worldIndex % 3];
  return [
    { slot: 'help', kind: 'choice', skill: worldIndex % 2 === 0 ? 'synonyms' : 'vocabulary in context' },
    { slot: 'fork', kind: 'fork', skill: worldIndex % 3 === 0 ? 'antonyms' : 'analogies' },
    { slot: 'shop', kind: 'choice', skill: 'vocabulary in context' },
    { slot: 'bridge', kind: 'choice', skill: worldIndex % 2 === 0 ? 'grammar' : 'punctuation' },
    { slot: 'special', kind: special[0], skill: special[1] },
    { slot: 'passage', kind: 'passage', skill: 'comprehension' },
  ];
}

// passagem do mundo (uma por mundo, na ordem)
export function passageFor(worldIndex) {
  return PASSAGES[worldIndex % PASSAGES.length];
}

// gera o desafio de um encontro, semeado por jogador + id (estável ao recarregar)
export function buildChallenge({ worldId, worldIndex, encounterId, slot, kind, skill, tier, player, skills }) {
  const rng = seededRandom(`${player}:${worldId}:${encounterId}:${slot}`);
  const family = skill && GENERATORS[skill] ? skill : weakestSkill(skills, Object.keys(GENERATORS));
  let gen = GENERATORS[family];
  if (Array.isArray(gen)) gen = gen[Math.floor(rng() * gen.length)];
  const question = gen(tier, rng);
  question.kind = kind === 'fork' ? 'fork' : question.kind === 'choice' && kind === 'choice' ? 'choice' : question.kind;
  question.slot = slot;
  question.worldId = worldId;
  question.encounterId = encounterId;
  return question;
}

// embaralha as opções mantendo as corretas identificadas (para o widget A–E)
export function lettered(challenge) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  return challenge.options.map((option, index) => ({ ...option, letter: letters[index] }));
}

// ── ordenar palavras para formar a frase (widget 'stones') ──
import { SPAG_PAIRS } from './spag.js';
export function sentenceOrderQuestion(tier, rng) {
  const bandSize = 3;
  const near = SPAG_PAIRS.filter((pair) => Math.abs(pair.tier - tier) <= bandSize);
  const list = near.length ? near : SPAG_PAIRS;
  const pair = list[Math.floor(rng() * list.length)];
  const words = pair.correct.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
  if (words.length > 9) words.length = 9;
  const scrambled = words.join(' ');
  return {
    skill: 'sentence structure', tier, kind: 'order', source: 'generated',
    prompt: 'Tap the words in the right order to rebuild the sentence.',
    display: null,
    order: words,
    options: [], // sem alternativas: é ordenação
    explanation: `"${pair.correct}"`,
  };
}

// ── pares palavra ↔ sinônimo (widget 'match') ──
export function matchPairsQuestion(tier, rng) {
  const bandSize = 3;
  const near = SYNONYMS.filter((entry) => Math.abs(entry.tier - tier) <= bandSize);
  const list = near.length ? near : SYNONYMS;
  const picks = [];
  const used = new Set();
  let guard = 200;
  while (picks.length < 3 && guard > 0) {
    guard -= 1;
    const entry = list[Math.floor(rng() * list.length)];
    if (used.has(entry.w)) continue;
    used.add(entry.w);
    picks.push({ left: entry.w, right: entry.s[Math.floor(rng() * entry.s.length)] });
  }
  return {
    skill: 'synonyms', tier, kind: 'match', source: 'generated',
    prompt: 'Tap a word, then tap its synonym.',
    display: null,
    pairs: picks,
    options: [],
    explanation: picks.map((p) => `${p.left} = ${p.right}`).join(' · '),
  };
}

export { shuffled };
