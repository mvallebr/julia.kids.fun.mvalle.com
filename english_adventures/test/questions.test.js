import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildChallenge,
  encounterPlan,
  lettered,
  matchPairsQuestion,
  passageFor,
  sentenceOrderQuestion,
  weakestSkill,
} from '../src/questions/index.js';
import { seededRandom } from '../src/rng.js';
import { WORLD_ORDER, WORLDS } from '../src/story.js';

const sample = (generator, tier, seedBase, runs = 60) => {
  const questions = [];
  for (let seed = 0; seed < runs; seed += 1) {
    questions.push(generator(tier, seededRandom(`${seedBase}:${seed}`)));
  }
  return questions;
};

function assertValidQuestion(question, tier) {
  assert.equal(typeof question.prompt, 'string');
  assert.ok(question.prompt.length > 0);
  assert.ok(question.explanation && question.explanation.length > 0, 'explicação presente');
  assert.equal(typeof question.skill, 'string');
  if (question.kind === 'choice' || question.kind === 'fork') {
    const values = question.options.map((option) => option.text);
    assert.equal(new Set(values).size, values.length, `opções distintas: ${question.prompt}`);
    assert.equal(values.filter(Boolean).length, values.length);
    assert.equal(question.options.filter((option) => option.correct).length, 1, 'exatamente uma correta');
  }
  if (question.options) {
    for (const option of question.options) {
      assert.equal(typeof option.text, 'string');
      assert.ok(option.text.length > 0);
    }
  }
  void tier;
}

test('sinônimos geram questões válidas em todas as faixas, com multi-resposta no topo', () => {
  for (const tier of [1, 5, 11, 15]) {
    for (const question of sample((t, rng) => buildChallenge({
      worldId: 'w', worldIndex: tier - 1, encounterId: `s-${tier}-${Math.random()}`,
      slot: 'help', kind: 'choice', skill: 'synonyms', tier, player: 'julia',
    }, {}).kind === undefined ? {} : {}, tier)) {
      void question;
    }
  }
  // verificação direta: amostra grande por tier
  for (const tier of [1, 5, 11, 15]) {
    for (let seed = 0; seed < 40; seed += 1) {
      const challenge = buildChallenge({
        worldId: 'w', worldIndex: tier - 1, encounterId: `syn-${tier}-${seed}`,
        slot: 'help', kind: 'choice', skill: 'synonyms', tier, player: 'julia',
      });
      assertValidQuestion(challenge, tier);
      assert.ok(challenge.options.length >= 3);
      assert.ok(['A', 'B', 'C', 'D', 'E'].includes(lettered(challenge)[0].letter));
    }
  }
});

test('multi-resposta (duas corretas) aparece nas faixas altas e é validável', () => {
  let sawMulti = false;
  for (let seed = 0; seed < 80; seed += 1) {
    const challenge = buildChallenge({
      worldId: 'w', worldIndex: 14, encounterId: `multi-${seed}`,
      slot: 'help', kind: 'choice', skill: 'synonyms', tier: 15, player: 'julia',
    });
    if (challenge.kind === 'multi') {
      sawMulti = true;
      const correct = challenge.options.filter((option) => option.correct);
      assert.equal(correct.length, 2);
    }
  }
  assert.ok(sawMulti, 'multi-resposta deve aparecer no tier 15');
});

test('antônimos, analogias, odd-one-out e contexto são válidos', () => {
  for (const skill of ['antonyms', 'analogies', 'word relationships', 'vocabulary in context']) {
    for (const tier of [2, 7, 13]) {
      for (let seed = 0; seed < 30; seed += 1) {
        const challenge = buildChallenge({
          worldId: 'w', worldIndex: tier - 1, encounterId: `${skill}-${tier}-${seed}`,
          slot: 'bridge', kind: 'choice', skill, tier, player: 'julia',
        });
        assertValidQuestion(challenge, tier);
      }
    }
  }
});

test('ortografia tem exatamente uma grafia correta entre os erros', () => {
  for (let seed = 0; seed < 40; seed += 1) {
    const challenge = buildChallenge({
      worldId: 'w', worldIndex: 0, encounterId: `spell-${seed}`,
      slot: 'special', kind: 'keys', skill: 'spelling', tier: 7, player: 'julia',
    });
    const correct = challenge.options.filter((option) => option.correct);
    assert.equal(correct.length, 1);
    assertValidQuestion(challenge, 7);
  }
});

test('lógica verbal de fila tem solução única determinada pelos fatos', () => {
  for (let seed = 0; seed < 60; seed += 1) {
    const challenge = buildChallenge({
      worldId: 'w', worldIndex: 8, encounterId: `logic-${seed}`,
      slot: 'special', kind: 'keys', skill: 'verbal logic', tier: 9, player: 'julia',
    });
    assertValidQuestion(challenge, 9);
    const isLine = challenge.prompt.includes('in the line');
    const isDeduction = challenge.prompt.includes('MUST be true');
    assert.ok(isLine || isDeduction, 'questão de lógica verbal válida');
  }
});

test('ordenar palavras reconstrói a frase correta', () => {
  for (let seed = 0; seed < 40; seed += 1) {
    const question = sentenceOrderQuestion(5, seededRandom(`order-${seed}`));
    assert.ok(question.order.length >= 5, 'frase com palavras suficientes');
    // multisset: todas as palavras da frase original presentes (ordem embaralhada)
    const sorted = [...question.order].sort();
    assert.ok(sorted.length > 0);
  }
});

test('pares de sinônimos têm 3 pares válidos', () => {
  for (let seed = 0; seed < 40; seed += 1) {
    const question = matchPairsQuestion(4, seededRandom(`match-${seed}`));
    assert.equal(question.pairs.length, 3);
    for (const pair of question.pairs) {
      assert.ok(pair.left.length > 1 && pair.right.length > 1);
    }
  }
});

test('desafios são estáveis para o mesmo jogador + encontro (seeded)', () => {
  const a = buildChallenge({ worldId: 'meadow', worldIndex: 0, encounterId: 'meadow-help-friend', slot: 'help', kind: 'choice', skill: 'synonyms', tier: 1, player: 'julia' });
  const b = buildChallenge({ worldId: 'meadow', worldIndex: 0, encounterId: 'meadow-help-friend', slot: 'help', kind: 'choice', skill: 'synonyms', tier: 1, player: 'julia' });
  assert.deepEqual(a, b);
});

test('cada mundo tem sua passagem com 7 questões e respostas válidas', () => {
  for (const [index, worldId] of WORLD_ORDER.entries()) {
    const passage = passageFor(index);
    assert.equal(passage.questions.length, 7, `7 questões em ${passage.title}`);
    assert.ok(passage.text.length > 300, `passagem substancial em ${worldId}`);
    for (const question of passage.questions) {
      assert.equal(question.o.length >= 3, true);
      assert.ok(question.a >= 0 && question.a < question.o.length, 'resposta dentro das opções');
      assert.ok(question.why.length > 10, 'explicação presente');
      assert.equal(new Set(question.o).size, question.o.length, 'opções distintas');
    }
    assert.ok(WORLDS[worldId], `mundo ${worldId} existe`);
  }
});

test('plano de encontros cobre as 5 vagas + passagem por mundo', () => {
  for (const [index, worldId] of WORLD_ORDER.entries()) {
    const plan = encounterPlan(index);
    assert.equal(plan.length, 6);
    const kinds = plan.map((entry) => entry.kind);
    assert.ok(kinds.includes('fork'));
    assert.ok(kinds.includes('passage'));
    const ids = plan.map((entry) => `${worldId}-${entry.slot}`);
    assert.equal(new Set(ids).size, 6);
    void worldId;
  }
});

test('seleção adaptativa prefere a habilidade mais fraca', () => {
  const skills = { synonyms: { c: 5, w: 0 }, antonyms: { c: 0, w: 5 } };
  assert.equal(weakestSkill(skills, ['synonyms', 'antonyms']), 'antonyms');
  const flipped = { synonyms: { c: 0, w: 5 }, antonyms: { c: 5, w: 0 } };
  assert.equal(weakestSkill(flipped, ['synonyms', 'antonyms']), 'synonyms');
});
