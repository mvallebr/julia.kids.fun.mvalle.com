import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateChallenge, templatesForTier, TEMPLATES, GENERATORS } from '../src/generators.js';
import { seededRandom, intBetween, shuffled } from '../src/rng.js';

// Roda o gerador muitas vezes em várias sementes para caçar casos inválidos.
function sample(templateId, tier, context = {}, runs = 300) {
  const challenges = [];
  for (let seed = 0; seed < runs; seed += 1) {
    challenges.push(generateChallenge(templateId, tier, seededRandom(`${templateId}:${tier}:${seed}`), context));
  }
  return challenges;
}

function assertValidChallenge(challenge, templateId, tier) {
  assert.equal(challenge.template, templateId);
  assert.equal(challenge.tier, tier);
  assert.equal(typeof challenge.display, 'string');
  assert.ok(challenge.display.length > 0);
  assert.equal(typeof challenge.answer, 'number');
  assert.ok(Number.isFinite(challenge.answer));
  assert.ok(Array.isArray(challenge.hints) && challenge.hints.length >= 1);
  for (const hint of challenge.hints) {
    assert.ok(hint.pt && hint.en, `dica bilíngue em ${templateId}`);
  }
  if (challenge.choices) {
    const values = challenge.choices.map(Number);
    assert.equal(new Set(values).size, values.length, `distratores distintos em ${templateId}`);
    assert.ok(values.includes(challenge.answer), `resposta presente nas escolhas de ${templateId}`);
    // Exatamente uma correta (valores únicos garantem isso, resposta incluída).
    assert.equal(values.filter((value) => value === challenge.answer).length, 1);
    assert.ok(values.length >= 2, `pelo menos 2 alternativas em ${templateId}`);
  }
}

test('todos os templates geram desafios válidos em todos os tiers suportados', () => {
  for (const [templateId, range] of Object.entries(TEMPLATES)) {
    for (let tier = range.min; tier <= range.max; tier += 1) {
      for (const challenge of sample(templateId, tier, {}, 80)) {
        assertValidChallenge(challenge, templateId, tier);
      }
    }
  }
});

test('multiplicação e divisão ficam dentro dos limites do tier (spec §31)', () => {
  for (const challenge of sample('mulFacts', 3, {}, 200)) {
    const [a, b] = challenge.display.split(' × ').map(Number);
    assert.ok([2, 5, 10].includes(a) || [2, 5, 10].includes(b), `fato ×2/×5/×10 no tier 3: ${challenge.display}`);
    assert.ok(a * b <= 100);
  }
  for (const challenge of sample('divFacts', 5, {}, 200)) {
    const [a, b] = challenge.display.split(' ÷ ').map(Number);
    assert.equal(a % b, 0, `divisão exata: ${challenge.display}`);
    assert.ok(a % b === 0 && a / b === challenge.answer);
  }
});

test('troco nunca é negativo nem zero (spec §31)', () => {
  for (const challenge of sample('calculateChange', 7, {}, 300)) {
    assert.ok(challenge.answer > 0, `troco positivo: ${challenge.display}`);
    const [paid, price] = challenge.display.split(' − ').map(Number);
    assert.ok(paid > price);
    assert.equal(paid - price, challenge.answer);
  }
});

test('compartilhar itens sempre dá conta inteira', () => {
  for (const challenge of sample('shareItems', 5, {}, 300)) {
    const [total, friends] = challenge.display.split(' ÷ ').map(Number);
    assert.equal(total % friends, 0);
    assert.equal(total / friends, challenge.answer);
  }
});

test('frações usam quantidades divisíveis', () => {
  for (const challenge of sample('fractionOfQuantity', 9, {}, 300)) {
    const [, total] = challenge.display.split(' × ').map(Number);
    assert.ok(total > 0);
    const divisor = Number(challenge.display.match(/1\/(\d)/)[1]);
    assert.equal(total % divisor, 0, `${challenge.display} deve ser divisível`);
    assert.equal(total / divisor, challenge.answer);
  }
});

test('desafios são estáveis para a mesma semente (spec §25)', () => {
  const a = generateChallenge('mulFacts', 4, seededRandom('julia:forest-7'));
  const b = generateChallenge('mulFacts', 4, seededRandom('julia:forest-7'));
  assert.deepEqual(a, b);
  const c = generateChallenge('mulFacts', 4, seededRandom('julia:forest-8'));
  assert.notDeepEqual(a, c);
});

test('cada tier tem templates disponíveis e a faixa 1-10 é contínua', () => {
  for (let tier = 1; tier <= 10; tier += 1) {
    const templates = templatesForTier(tier);
    assert.ok(templates.length >= 3, `tier ${tier} tem ao menos 3 templates`);
  }
});

test('contextos de cena (item/moeda/quantidade) são respeitados', () => {
  const context = { price: 3, quantity: 5, item: { pt: 'cogumelos', en: 'mushrooms' } };
  const challenge = generateChallenge('priceTimesQuantity', 4, seededRandom('ctx'), context);
  assert.equal(challenge.answer, 15);
  assert.equal(challenge.display, '3 × 5');
});

test('soma/subtração simples ficam nos limites do tier', () => {
  for (const challenge of sample('addWithin', 1, {}, 200)) {
    const [a, b] = challenge.display.split(' + ').map(Number);
    assert.ok(a + b <= 10, `soma até 10 no tier 1: ${challenge.display}`);
  }
  for (const challenge of sample('subWithin', 3, {}, 200)) {
    const [a, b] = challenge.display.split(' − ').map(Number);
    assert.ok(a <= 100 && b < a);
  }
});

test('utilidades de rng são determinísticas', () => {
  const next = seededRandom('x');
  const values = [intBetween(next, 1, 5), intBetween(next, 1, 5), shuffled(next, [1, 2, 3])];
  const next2 = seededRandom('x');
  const values2 = [intBetween(next2, 1, 5), intBetween(next2, 1, 5), shuffled(next2, [1, 2, 3])];
  assert.deepEqual(values, values2);
});

test('todos os geradores conhecidos estão no mapa GENERATORS', () => {
  assert.equal(Object.keys(GENERATORS).length, Object.keys(TEMPLATES).length);
});
