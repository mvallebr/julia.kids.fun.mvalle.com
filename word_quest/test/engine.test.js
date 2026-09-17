import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  STORAGE_KEY,
  emptyState,
  normalizeState,
  loadState,
  saveState,
  LADDER,
  stakeFor,
  isMilestone,
  secureMilestone,
  failQuestion,
  awardGold,
  useLifeline,
  fiftyFifty,
  touchWord,
  wordCorrect,
  wordWrong,
  dueWords,
  recordSkill,
} from '../src/state.js';
import { CHAPTERS } from '../src/chapters.js';
import { nextQuestion } from '../src/questions.js';

const memoryStorage = () => {
  const backing = new Map();
  return {
    getItem: (key) => (backing.has(key) ? backing.get(key) : null),
    setItem: (key, value) => backing.set(key, value),
  };
};

test('normalização defensiva: lixo vira estado válido', () => {
  const state = normalizeState({ chapter: 99, gold: -5, lifelines: { fifty: 99 } });
  assert.equal(state.chapter, 6);
  assert.equal(state.gold, 0);
  assert.equal(state.lifelines.fifty, 9);
  assert.equal(normalizeState(null).chapter, 0);
});

test('persistência é por jogadora e sobrevive a recarregamentos (spec §46)', () => {
  const storage = memoryStorage();
  const julia = loadState(storage, 'Julia');
  julia.gold = 1234;
  julia.chapterDone.push('whispering-forest');
  saveState(storage, 'Julia', julia);
  const reloaded = loadState(storage, 'Julia');
  assert.equal(reloaded.gold, 1234);
  assert.ok(reloaded.chapterDone.includes('whispering-forest'));
  assert.equal(loadState(storage, 'Bob').gold, 0);
});

test('escada de ouro: stake cresce com o índice da questão', () => {
  assert.equal(stakeFor(0), 100);
  assert.equal(stakeFor(3), 1000);
  assert.equal(stakeFor(12), 1000000);
  assert.equal(stakeFor(99), 1000000);
  assert.equal(LADDER.length, 13);
});

test('marcos garantem o ouro nos índices certos', () => {
  assert.deepEqual([3, 9, 12].every((index) => isMilestone(index)), true);
  const state = emptyState();
  state.gold = 1700; // 100+200+500+1000... parcial
  secureMilestone(state);
  assert.equal(state.secured, 1700);
  failQuestion(state);
  assert.equal(state.gold, 1700, 'erro não apaga o ouro garantido');
});

test('errar sem marco cai para o ouro seguro', () => {
  const state = emptyState();
  awardGold(state, 300);
  state.secured = 100;
  failQuestion(state);
  assert.equal(state.gold, 100);
});

test('50/50 nunca remove a resposta correta', () => {
  const options = [
    { text: 'Huge', correct: true },
    { text: 'Tiny', correct: false },
    { text: 'Narrow', correct: false },
    { text: 'Quiet', correct: false },
  ];
  for (let seed = 0; seed < 50; seed += 1) {
    const remaining = fiftyFifty(options).filter((option) => !option.hidden);
    assert.equal(remaining.length, 2);
    assert.ok(remaining.some((option) => option.correct), 'correta sempre presente');
  }
});

test('ferramentas são consumidas uma vez', () => {
  const state = emptyState();
  assert.ok(useLifeline(state, 'clue'));
  assert.equal(useLifeline(state, 'clue'), false);
  assert.equal(state.lifelines.clue, 0);
});

test('domínio de palavra: acerto sobe um degrau, erro desce', () => {
  const state = emptyState();
  touchWord(state, 'reluctant', { def: 'unwilling', example: 'A reluctant smile.' });
  assert.equal(state.journal.reluctant.status, 'new');
  wordCorrect(state, 'reluctant');
  assert.equal(state.journal.reluctant.status, 'seen');
  wordCorrect(state, 'reluctant');
  wordCorrect(state, 'reluctant');
  assert.equal(state.journal.reluctant.status, 'strong');
  wordWrong(state, 'reluctant');
  assert.equal(state.journal.reluctant.status, 'learning');
});

test('touchWord registra descoberta apenas na primeira vez', () => {
  const state = emptyState();
  assert.equal(touchWord(state, 'sceptical', { def: 'doubtful' }), true);
  assert.equal(touchWord(state, 'sceptical', { def: 'doubtful' }), false);
  assert.equal(state.runStats.discovered, 1);
  assert.equal(state.journal.sceptical.seen, 2);
});

test('repetição espaçada prioriza palavras em aprendizado', () => {
  const state = emptyState();
  touchWord(state, 'fresh', {});
  for (let i = 0; i < 4; i += 1) wordCorrect(state, 'fresh'); // mastered
  state.journal.fresh.lastAt = Date.now() - 2 * 86400000; // dominada há muito tempo
  touchWord(state, 'shaky', {});
  wordWrong(state, 'shaky'); // learning
  const due = dueWords(state);
  assert.equal(due[0].word, 'shaky', 'palavra em aprendizado vem primeiro');
});

test('recordSkill acumula acertos e erros por família', () => {
  const state = emptyState();
  recordSkill(state, 'synonyms', true);
  recordSkill(state, 'synonyms', false);
  assert.deepEqual(state.skills.synonyms, { c: 1, w: 1 });
});

test('capítulos: 7 capítulos, 30 questões na jornada completa', () => {
  assert.equal(CHAPTERS.length, 7);
  const counts = CHAPTERS.map((chapter) => chapter.questions);
  assert.deepEqual(counts, [3, 3, 5, 3, 7, 3, 6]);
  assert.equal(CHAPTERS[CHAPTERS.length - 1].id, 'castle');
  assert.equal(CHAPTERS.reduce((sum, chapter) => sum + chapter.questions, 0), 30);
});

test('capítulos com documento de compreensão têm respostas válidas', () => {
  for (const chapter of CHAPTERS) {
    if (!chapter.doc) continue;
    assert.ok(chapter.doc.text.length > 200, `${chapter.doc.title} tem texto substancial`);
    assert.equal(chapter.doc.questions.length >= 5, true);
    for (const question of chapter.doc.questions) {
      assert.equal(new Set(question.o).size, question.o.length, 'opções distintas');
      assert.ok(question.a >= 0 && question.a < question.o.length, 'índice correto');
      assert.ok(question.why.length > 10, 'explicação presente');
    }
  }
});
