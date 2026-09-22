// Testes do vocabulário com repetição espaçada (src/vocab.js).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  registerWord,
  dueWords,
  answerCorrect,
  answerWrong,
  buildQuiz,
  normalizeWords,
  practiceOrder,
} from '../src/vocab.js';

const DAY = 24 * 60 * 60 * 1000;

test('registerWord cria entrada com due em 1 dia', () => {
  const words = {};
  registerWord(words, 'broom', { pt: 'broom = vassoura' });
  assert.equal(Object.keys(words).length, 1);
  assert.equal(words.broom.pt, 'broom = vassoura');
  assert.equal(words.broom.streak, 0);
  assert.ok(words.broom.due > Date.now());
  assert.ok(words.broom.due <= Date.now() + DAY);
});

test('registerWord não duplica nem passa do limite', () => {
  const words = {};
  registerWord(words, 'owl', { pt: 'owl = coruja' });
  registerWord(words, 'owl', { pt: 'outra definição' });
  assert.equal(Object.keys(words).length, 1);
  assert.equal(words.owl.pt, 'owl = coruja');
  for (let i = 0; i < 70; i += 1) registerWord(words, `w${i}`, { pt: `w${i}` });
  assert.ok(Object.keys(words).length <= 60);
});

test('dueWords só retorna vencidas, mais antigas primeiro', () => {
  const words = {
    antiga: { pt: 'a', streak: 1, due: 1000 },
    futura: { pt: 'b', streak: 0, due: Date.now() + DAY },
    media: { pt: 'c', streak: 0, due: 2000 },
  };
  const due = dueWords(words);
  assert.deepEqual(due.map(([w]) => w), ['antiga', 'media']);
});

test('answerCorrect dobra o intervalo a cada acerto (cap 30 dias)', () => {
  const words = { owl: { pt: 'x', streak: 0, due: 0 } };
  const t0 = 1_000_000;
  answerCorrect(words, 'owl', t0);
  assert.equal(words.owl.streak, 1);
  assert.equal(words.owl.due, t0 + 2 * DAY);
  answerCorrect(words, 'owl', t0);
  assert.equal(words.owl.streak, 2);
  assert.equal(words.owl.due, t0 + 4 * DAY);
  for (let i = 0; i < 10; i += 1) answerCorrect(words, 'owl', t0);
  assert.ok(words.owl.due <= t0 + 30 * DAY + 1);
});

test('answerWrong reseta streak e agenda revisão em 10 minutos', () => {
  const words = { owl: { pt: 'x', streak: 5, due: 0 } };
  const t0 = 2_000_000;
  answerWrong(words, 'owl', t0);
  assert.equal(words.owl.streak, 0);
  assert.equal(words.owl.due, t0 + 10 * 60 * 1000);
});

test('buildQuiz traz 3 opções com exatamente 1 correta', () => {
  const words = {
    owl: { pt: 'owl = coruja', streak: 0, due: 0 },
    bat: { pt: 'bat = morcego', streak: 0, due: 0 },
    cat: { pt: 'cat = gato', streak: 0, due: 0 },
  };
  const quiz = buildQuiz(words, 'owl');
  assert.equal(quiz.word, 'owl');
  assert.equal(quiz.options.length, 3);
  assert.equal(quiz.options.filter((o) => o.correct).length, 1);
});

test('normalizeWords descarta entradas malformadas', () => {
  const out = normalizeWords({
    boa: { pt: 'boa = ok', streak: 2, due: 5 },
    ruim: 'não é objeto',
    sempt: { streak: 1, due: 2 },
  });
  assert.deepEqual(Object.keys(out), ['boa']);
  assert.equal(out.boa.streak, 2);
});

test('buildQuiz com pool <3 usa distratores no idioma pedido (não inglês fixo)', () => {
  const words = { owl: { pt: 'owl = coruja', streak: 0, due: 0 } };
  const pt = buildQuiz(words, 'owl', 'pt');
  assert.equal(pt.options.length, 3);
  assert.equal(pt.options.filter((o) => o.correct).length, 1);
  const wrong = pt.options.filter((o) => !o.correct).map((o) => o.text);
  for (const text of wrong) assert.ok(/[a-záéíóúãõç]/i.test(text) && text !== 'owl = coruja');
  assert.ok(wrong.every((t) => t.includes(' '))); // opções falsas em pt, não "a tall wall"
  const es = buildQuiz(words, 'owl', 'es');
  const esWrong = es.options.filter((o) => !o.correct);
  assert.equal(esWrong.length, 2);
  assert.ok(esWrong.every((o) => o.text.includes(' ')) && !esWrong.some((o) => o.text.includes(' = ')));
});

test('buildQuiz nunca repete opções nem oferece o texto correto como errada', () => {
  const words = {
    owl: { pt: 'owl = coruja', streak: 0, due: 0 },
    bat: { pt: 'bat = morcego', streak: 0, due: 0 },
    cat: { pt: 'cat = gato', streak: 0, due: 0 },
  };
  for (let i = 0; i < 20; i += 1) {
    const quiz = buildQuiz(words, 'owl');
    const texts = quiz.options.map((o) => o.text);
    assert.equal(new Set(texts).size, 3, `opções repetidas: ${texts}`);
    assert.equal(quiz.options.filter((o) => o.correct).length, 1);
  }
});

test('practiceOrder prioriza vencidas e depois o streak mais baixo', () => {
  const now = 1_000_000;
  const words = {
    futuraForte: { pt: 'a', streak: 5, due: now + 10_000 },
    vencidaNova: { pt: 'b', streak: 4, due: now - 100 },
    vencidaVelha: { pt: 'c', streak: 9, due: now - 5_000 },
    futuraFraca: { pt: 'd', streak: 0, due: now + 9_000 },
  };
  assert.deepEqual(practiceOrder(words, now), ['vencidaVelha', 'vencidaNova', 'futuraFraca', 'futuraForte']);
});
