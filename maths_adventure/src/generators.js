// Geradores de desafios de matemática (spec §19/§31).
// Cada template é uma função pura: (next, tier) -> desafio, sempre com resposta
// válida, distratores distintos e dicas progressivas. Nada de conta impossível.

import { intBetween, pickOne, shuffled } from './rng.js';

// Desafio gerado:
// {
//   template, tier,
//   display: '3 × 9'            — expressão (locale-safe, spec §45)
//   answer: número canônico
//   choices: [números]          — quando o widget usa alternativas (uma correta)
//   prompt: { pt, en }          — enunciado contextual (opcional p/ expressões puras)
//   hints: [{ pt, en }, …]      — dicas progressivas (contextual → estratégia)
//   context: {…}                — dados para a cena (itens, preços…)
// }

export const TEMPLATES = {
  counting: { min: 1, max: 2 },
  addWithin: { min: 1, max: 3 },
  subWithin: { min: 1, max: 3 },
  missingAddend: { min: 2, max: 4 },
  compareGroups: { min: 1, max: 2 },
  mulFacts: { min: 3, max: 5 },
  selectEquivalent: { min: 3, max: 6 },
  divFacts: { min: 5, max: 6 },
  shareItems: { min: 5, max: 7 },
  mixedOps: { min: 6, max: 10 },
  priceTimesQuantity: { min: 1, max: 8 },
  totalCostMultiItem: { min: 7, max: 10 },
  calculateChange: { min: 7, max: 9 },
  completeSequence: { min: 2, max: 10 },
  twoStepProblem: { min: 8, max: 10 },
  fractionOfQuantity: { min: 9, max: 9 },
  fractionEquivalence: { min: 9, max: 10 },
  bigAddSub: { min: 10, max: 10 },
};

export function templatesForTier(tier) {
  return Object.keys(TEMPLATES).filter((id) => {
    const range = TEMPLATES[id];
    return tier >= range.min && tier <= range.max;
  });
}

function finishChallenge(template, tier, challenge) {
  return { template, tier, hints: [], ...challenge };
}

// Alternativas numéricas: resposta + distratores plausíveis, todos distintos.
function numericChoices(next, answer, count = 3) {
  const values = new Set([answer]);
  const deltas = [1, -1, 2, -2, 10, -10, 5, -5];
  let guard = 40;
  while (values.size < count && guard > 0) {
    guard -= 1;
    const candidate = answer + pickOne(next, deltas) + (next() < 0.25 ? intBetween(next, 1, 3) : 0);
    if (candidate >= 0 && !values.has(candidate)) values.add(candidate);
  }
  return [...values];
}

// ── Tier 1–2: contagem, soma e subtração ─────────────────────────────────────
function counting(next, tier, context = {}) {
  const max = tier === 1 ? 10 : 20;
  const count = intBetween(next, 3, max);
  const item = context.item || { pt: 'cogumelos', en: 'mushrooms' };
  return finishChallenge('counting', tier, {
    display: String(count),
    answer: count,
    prompt: {
      pt: `Quantos ${item.pt} você vê?`,
      en: `How many ${item.en} do you see?`,
    },
    hints: [
      { pt: 'Toque em cada um enquanto conta!', en: 'Tap each one as you count!' },
      { pt: 'Conte devagar, um por um.', en: 'Count slowly, one by one.' },
    ],
    context: { itemCount: count, item },
  });
}

function addWithin(next, tier) {
  const limit = tier === 1 ? 10 : tier === 2 ? 20 : 100;
  const a = intBetween(next, 2, Math.floor(limit / 2));
  const b = intBetween(next, 1, limit - a);
  return finishChallenge('addWithin', tier, {
    display: `${a} + ${b}`,
    answer: a + b,
    choices: numericChoices(next, a + b),
    hints: [
      { pt: `Comece no ${a} e conte ${b} mais.`, en: `Start at ${a} and count on ${b} more.` },
      { pt: `Junte os dois grupos e conte tudo.`, en: `Put both groups together and count them all.` },
    ],
  });
}

function subWithin(next, tier) {
  const limit = tier === 1 ? 10 : tier === 2 ? 20 : 100;
  const a = intBetween(next, Math.floor(limit / 2), limit);
  const b = intBetween(next, 1, a - 1);
  return finishChallenge('subWithin', tier, {
    display: `${a} − ${b}`,
    answer: a - b,
    choices: numericChoices(next, a - b),
    hints: [
      { pt: `Comece no ${a} e volte ${b}.`, en: `Start at ${a} and count back ${b}.` },
      { pt: `Pense: quanto falta de ${b} até ${a}?`, en: `Think: how far is it from ${b} up to ${a}?` },
    ],
  });
}

function missingAddend(next, tier) {
  const limit = tier <= 2 ? 20 : 50;
  const total = intBetween(next, 5, limit);
  const a = intBetween(next, 1, total - 1);
  return finishChallenge('missingAddend', tier, {
    display: `${a} + ? = ${total}`,
    answer: total - a,
    choices: numericChoices(next, total - a),
    prompt: {
      pt: `Qual número falta?`,
      en: `Which number is missing?`,
    },
    hints: [
      { pt: `De ${a}, quanto falta para chegar em ${total}?`, en: `From ${a}, how much more makes ${total}?` },
      { pt: `Tente ${total} − ${a}.`, en: `Try ${total} − ${a}.` },
    ],
  });
}

function compareGroups(next, tier) {
  const base = tier === 1 ? 6 : 12;
  let a = intBetween(next, 2, base);
  let b = intBetween(next, 2, base);
  while (a === b) b = intBetween(next, 2, base);
  const bigger = Math.max(a, b);
  return finishChallenge('compareGroups', tier, {
    display: `${a} ⚖ ${b}`,
    answer: bigger,
    choices: [a, b],
    prompt: {
      pt: `Qual grupo tem mais?`,
      en: `Which group has more?`,
    },
    context: { groupA: a, groupB: b },
    hints: [
      { pt: 'Conte cada grupo com calma.', en: 'Count each group carefully.' },
      { pt: 'O número maior é o grupo com mais.', en: 'The bigger number is the group with more.' },
    ],
  });
}

// ── Tier 3–5: multiplicação e divisão ────────────────────────────────────────
function mulRanges(tier) {
  if (tier === 3) return { factors: [2, 5, 10], maxOther: 10 };
  if (tier === 4) return { factors: [2, 3, 4, 5, 6, 10], maxOther: 10 };
  return { factors: [2, 3, 4, 5, 6, 7, 8, 9, 10], maxOther: 10 };
}

function mulFacts(next, tier, context = {}) {
  const { factors, maxOther } = mulRanges(tier);
  const a = context.quantity || pickOne(next, factors);
  const b = intBetween(next, 2, maxOther);
  return finishChallenge('mulFacts', tier, {
    display: `${a} × ${b}`,
    answer: a * b,
    choices: numericChoices(next, a * b),
    hints: [
      { pt: `Pule de ${a} em ${a}: ${a}, ${a * 2}, ${a * 3}… até ${b} pulos.`, en: `Skip-count by ${a}: ${a}, ${a * 2}, ${a * 3}… up to ${b} jumps.` },
      { pt: `${a} × ${b} é como somar ${a} um total de ${b} vezes.`, en: `${a} × ${b} is like adding ${a} together ${b} times.` },
    ],
  });
}

function selectEquivalent(next, tier) {
  const a = intBetween(next, 2, 9);
  const b = intBetween(next, 2, 9);
  const answer = a * b;
  // Expressões diferentes com o mesmo valor: (a×b) vs alternativas erradas.
  const wrong = new Set(); // valores errados, todos distintos entre si e da resposta
  const candidates = [];
  for (let c = 2; c <= 10; c += 1) {
    for (let d = 2; d <= 10; d += 1) {
      if (c * d !== answer) candidates.push([c, d]);
    }
  }
  let guard = 30;
  while (wrong.size < 2 && guard > 0) {
    guard -= 1;
    const [c, d] = pickOne(next, candidates);
    // Perto do valor certo para forçar cálculo de verdade.
    if (c * d !== answer && Math.abs(c * d - answer) <= 6) wrong.add(c * d);
  }
  while (wrong.size < 2) {
    const c = intBetween(next, 2, 9);
    const d = intBetween(next, 2, 9);
    if (c * d !== answer) wrong.add(c * d);
  }
  return finishChallenge('selectEquivalent', tier, {
    display: `${a} × ${b}`,
    answer: answer,
    choices: shuffled(next, [answer, ...wrong]),
    context: { equivalentOf: `${a} × ${b}`, wrongValues: [...wrong] },
    prompt: {
      pt: `Qual expressão dá o mesmo valor?`,
      en: `Which expression has the same value?`,
    },
    hints: [
      { pt: `Calcule ${a} × ${b} primeiro.`, en: `Work out ${a} × ${b} first.` },
      { pt: `Depois calcule cada escolha e compare.`, en: `Then work out each option and compare.` },
    ],
  });
}

function divFacts(next, tier) {
  const b = intBetween(next, 2, tier === 5 ? 5 : 10);
  const answer = intBetween(next, 2, 10);
  const a = b * answer;
  return finishChallenge('divFacts', tier, {
    display: `${a} ÷ ${b}`,
    answer,
    choices: numericChoices(next, answer),
    hints: [
      { pt: `Pense: ${b} vezes quanto dá ${a}?`, en: `Think: ${b} times what makes ${a}?` },
      { pt: `É o contrário de ${b} × ? = ${a}.`, en: `It's the reverse of ${b} × ? = ${a}.` },
    ],
  });
}

function shareItems(next, tier, context = {}) {
  const friends = intBetween(next, 2, tier >= 6 ? 6 : 4);
  const each = intBetween(next, 2, 9);
  const total = friends * each;
  const item = context.item || { pt: 'figuras', en: 'pictures' };
  return finishChallenge('shareItems', tier, {
    display: `${total} ÷ ${friends}`,
    answer: each,
    choices: numericChoices(next, each),
    prompt: {
      pt: `Divida ${total} ${item.pt} igualmente entre ${friends} amigos. Quantos cada um recebe?`,
      en: `Share ${total} ${item.en} equally between ${friends} friends. How many does each one get?`,
    },
    context: { total, friends, item },
    hints: [
      { pt: `Distribua de ${friends} em ${friends}.`, en: `Deal them out ${friends} at a time.` },
      { pt: `Pense: ${friends} × ? = ${total}.`, en: `Think: ${friends} × ? = ${total}.` },
    ],
  });
}

function mixedOps(next, tier) {
  const style = pickOne(next, ['addMul', 'subMul', 'addDiv']);
  if (style === 'addMul') {
    const a = intBetween(next, 2, 6);
    const b = intBetween(next, 2, 6);
    const c = intBetween(next, 1, 12);
    return finishChallenge('mixedOps', tier, {
      display: `${a} × ${b} + ${c}`,
      answer: a * b + c,
      choices: numericChoices(next, a * b + c),
      hints: [
        { pt: `Primeiro ${a} × ${b}, depois some ${c}.`, en: `First ${a} × ${b}, then add ${c}.` },
        { pt: `Multiplicação vem antes da soma.`, en: `Multiplication comes before addition.` },
      ],
    });
  }
  if (style === 'subMul') {
    const a = intBetween(next, 2, 6);
    const b = intBetween(next, 2, 6);
    const c = intBetween(next, a * b + 1, a * b + 12);
    return finishChallenge('mixedOps', tier, {
      display: `${c} − ${a} × ${b}`,
      answer: c - a * b,
      choices: numericChoices(next, c - a * b),
      hints: [
        { pt: `Primeiro ${a} × ${b}, depois subtraia de ${c}.`, en: `First ${a} × ${b}, then subtract it from ${c}.` },
      ],
    });
  }
  const b = intBetween(next, 2, 6);
  const answer = intBetween(next, 2, 8);
  const a = b * answer;
  const c = intBetween(next, 1, 10);
  return finishChallenge('mixedOps', tier, {
    display: `${a} ÷ ${b} + ${c}`,
    answer: answer + c,
    choices: numericChoices(next, answer + c),
    hints: [
      { pt: `Primeiro ${a} ÷ ${b}, depois some ${c}.`, en: `First ${a} ÷ ${b}, then add ${c}.` },
    ],
  });
}

// ── Dinheiro / trocas (spec §10.3/§10.4) ─────────────────────────────────────
function priceTimesQuantity(next, tier, context = {}) {
  const high = tier >= 7 ? 9 : 5;
  const price = context.price || intBetween(next, 2, high);
  const quantity = context.quantity || intBetween(next, 2, 9);
  const item = context.item || { pt: 'itens', en: 'items' };
  const unit = context.currency || { pt: 'moedas', en: 'coins' };
  return finishChallenge('priceTimesQuantity', tier, {
    display: `${price} × ${quantity}`,
    answer: price * quantity,
    choices: numericChoices(next, price * quantity),
    prompt: {
      pt: `${quantity} ${item.pt} custam ${price} ${unit.pt} cada um. Qual é o total?`,
      en: `${quantity} ${item.en} cost ${price} ${unit.en} each. What is the total?`,
    },
    context: { price, quantity, item, currency: unit },
    hints: [
      { pt: `Dica: cada um custa ${price}, e são ${quantity}.`, en: `Hint: each one costs ${price}, and there are ${quantity}.` },
      { pt: `Multiplique ${price} × ${quantity}.`, en: `Multiply ${price} × ${quantity}.` },
    ],
  });
}

function totalCostMultiItem(next, tier, context = {}) {
  const catalog = context.catalog || [
    { emoji: '🍄', name: { pt: 'cogumelos', en: 'mushrooms' }, price: intBetween(next, 2, 6) },
    { emoji: '🍒', name: { pt: 'cerezas', en: 'cherries' }, price: intBetween(next, 2, 6) },
    { emoji: '🌻', name: { pt: 'flores', en: 'flowers' }, price: intBetween(next, 2, 6) },
  ];
  const first = catalog[0];
  const second = catalog[1 + Math.floor(next() * (catalog.length - 1))];
  const qtyA = intBetween(next, 2, 5);
  const qtyB = intBetween(next, 2, 5);
  const unit = context.currency || { pt: 'moedas', en: 'coins' };
  const total = first.price * qtyA + second.price * qtyB;
  return finishChallenge('totalCostMultiItem', tier, {
    display: `${first.price}×${qtyA} + ${second.price}×${qtyB}`,
    answer: total,
    choices: numericChoices(next, total),
    prompt: {
      pt: `${qtyA} ${first.name.pt} e ${qtyB} ${second.name.pt}: qual é o total?`,
      en: `${qtyA} ${first.name.en} and ${qtyB} ${second.name.en}: what is the total?`,
    },
    context: { items: [{ ...first, qty: qtyA }, { ...second, qty: qtyB }], currency: unit },
    hints: [
      { pt: `Calcule cada compra separadamente e depois junte.`, en: `Work out each purchase separately, then add.` },
      { pt: `${first.price} × ${qtyA} = ${first.price * qtyA}; ${second.price} × ${qtyB} = ${second.price * qtyB}.`, en: `${first.price} × ${qtyA} = ${first.price * qtyA}; ${second.price} × ${qtyB} = ${second.price * qtyB}.` },
    ],
  });
}

function calculateChange(next, tier, context = {}) {
  const price = context.price || intBetween(next, 3, tier >= 8 ? 40 : 20);
  const paid = Math.ceil((price + 1) / 5) * 5 + (next() < 0.5 ? 0 : intBetween(next, 0, 4) * 5);
  // Troco nunca negativo e sempre ≥ 1 (spec §31).
  const safePaid = paid <= price ? price + 5 : paid;
  const unit = context.currency || { pt: 'moedas', en: 'coins' };
  return finishChallenge('calculateChange', tier, {
    display: `${safePaid} − ${price}`,
    answer: safePaid - price,
    choices: numericChoices(next, safePaid - price),
    prompt: {
      pt: `Você pagou ${safePaid} ${unit.pt} e gastou ${price}. Qual é o troco?`,
      en: `You paid ${safePaid} ${unit.en} and spent ${price}. How much change?`,
    },
    context: { price, paid: safePaid, currency: unit },
    hints: [
      { pt: `Troco é o que sobra: ${safePaid} − ${price}.`, en: `Change is what's left: ${safePaid} − ${price}.` },
      { pt: `Conte de ${price} até ${safePaid}.`, en: `Count up from ${price} to ${safePaid}.` },
    ],
  });
}

// ── Padrões e problemas de duas etapas ───────────────────────────────────────
function completeSequence(next, tier, context = {}) {
  const style = pickOne(next, ['step', 'double']);
  if (style === 'double' && tier >= 4) {
    const start = intBetween(next, 1, 4);
    const seq = [start, start * 2, start * 4, start * 8];
    return finishChallenge('completeSequence', tier, {
      display: `${seq.join(', ')}, ?`,
      answer: start * 16,
      choices: numericChoices(next, start * 16),
      prompt: { pt: 'Qual número continua a sequência?', en: 'Which number comes next?' },
      context: { sequence: seq },
      hints: [
        { pt: 'Olhe o que acontece de um número para o outro.', en: 'Look at what happens from one number to the next.' },
        { pt: 'Cada número é o dobro do anterior!', en: 'Each number is double the one before!' },
      ],
    });
  }
  const step = context.step || intBetween(next, tier >= 5 ? 3 : 2, tier >= 5 ? 9 : 5);
  const start = intBetween(next, 1, 12);
  const seq = [start, start + step, start + step * 2, start + step * 3];
  return finishChallenge('completeSequence', tier, {
    display: `${seq.join(', ')}, ?`,
    answer: start + step * 4,
    choices: numericChoices(next, start + step * 4),
    prompt: { pt: 'Qual número continua a sequência?', en: 'Which number comes next?' },
    context: { sequence: seq, step },
    hints: [
      { pt: `A sequência pula de ${step} em ${step}.`, en: `The sequence jumps by ${step} each time.` },
      { pt: `Some ${step} ao último número.`, en: `Add ${step} to the last number.` },
    ],
  });
}

function twoStepProblem(next, tier, context = {}) {
  // "Havia N, chegaram grupos de A; depois B foram embora" etc.
  const a = intBetween(next, 2, 6);
  const groups = intBetween(next, 2, 5);
  const start = intBetween(next, 3, 12);
  const gone = intBetween(next, 1, 9);
  const answer = start + a * groups - gone;
  const item = context.item || { pt: 'bolhas', en: 'bubbles' };
  return finishChallenge('twoStepProblem', tier, {
    display: `${start} + ${a}×${groups} − ${gone}`,
    answer,
    choices: numericChoices(next, answer),
    prompt: {
      pt: `Havia ${start} ${item.pt}. Chegaram ${groups} grupos de ${a}. Depois ${gone} foram embora. Quantos ficaram?`,
      en: `There were ${start} ${item.en}. ${groups} groups of ${a} arrived. Then ${gone} left. How many stayed?`,
    },
    context: { start, groups, each: a, gone, item },
    hints: [
      { pt: `Primeiro descubra quantos chegaram: ${a} × ${groups}.`, en: `First find how many arrived: ${a} × ${groups}.` },
      { pt: `Some os que chegaram e tire os que foram embora.`, en: `Add the arrivals, then take away the ones that left.` },
    ],
  });
}

// ── Frações (spec §19.7) ─────────────────────────────────────────────────────
const FRACTION_NAMES = {
  2: { pt: 'metade', en: 'half' },
  3: { pt: 'terça parte', en: 'third' },
  4: { pt: 'quarta parte', en: 'quarter' },
};

function fractionOfQuantity(next, tier, context = {}) {
  const divisor = pickOne(next, [2, 3, 4]);
  const each = intBetween(next, 2, 9);
  const total = divisor * each;
  const item = context.item || { pt: 'pães', en: 'loaves' };
  return finishChallenge('fractionOfQuantity', tier, {
    display: `1/${divisor} × ${total}`,
    answer: each,
    choices: numericChoices(next, each),
    prompt: {
      pt: `Qual é a ${FRACTION_NAMES[divisor].pt} de ${total} ${item.pt}?`,
      en: `What is one ${FRACTION_NAMES[divisor].en} of ${total} ${item.en}?`,
    },
    context: { total, divisor, item },
    hints: [
      { pt: `Divida os ${total} em ${divisor} grupos iguais.`, en: `Split the ${total} into ${divisor} equal groups.` },
      { pt: `${total} ÷ ${divisor} = ?`, en: `${total} ÷ ${divisor} = ?` },
    ],
  });
}

function fractionEquivalence(next, tier) {
  const pairs = [
    { a: 1, b: 2, equivalent: { num: 2, den: 4 } },
    { a: 1, b: 2, equivalent: { num: 3, den: 6 } },
    { a: 2, b: 4, equivalent: { num: 1, den: 2 } },
    { a: 1, b: 3, equivalent: { num: 2, den: 6 } },
    { a: 2, b: 8, equivalent: { num: 1, den: 4 } },
    { a: 1, b: 4, equivalent: { num: 2, den: 8 } },
  ];
  const chosen = pickOne(next, pairs);
  return finishChallenge('fractionEquivalence', tier, {
    display: `${chosen.a}/${chosen.b} = ?/${chosen.equivalent.den}`,
    answer: chosen.equivalent.num,
    choices: numericChoices(next, chosen.equivalent.num),
    prompt: { pt: 'Qual número completa a fração igual?', en: 'Which number makes the fractions equal?' },
    hints: [
      { pt: 'Desenhe uma pizza dividida nos dois jeitos!', en: 'Draw a pizza sliced both ways!' },
      { pt: `${chosen.a}/${chosen.b} é o mesmo que ${chosen.equivalent.num}/${chosen.equivalent.den}.`, en: `${chosen.a}/${chosen.b} is the same as ${chosen.equivalent.num}/${chosen.equivalent.den}.` },
    ],
  });
}

function bigAddSub(next, tier) {
  const style = pickOne(next, ['add', 'sub']);
  if (style === 'add') {
    const a = intBetween(next, 110, 690);
    const b = intBetween(next, 110, 890 - (a > 500 ? 400 : 0));
    return finishChallenge('bigAddSub', tier, {
      display: `${a} + ${b}`,
      answer: a + b,
      choices: numericChoices(next, a + b, 3),
      hints: [
        { pt: 'Some as centenas, depois as dezenas e as unidades.', en: 'Add the hundreds, then the tens, then the ones.' },
      ],
    });
  }
  const a = intBetween(next, 300, 950);
  const b = intBetween(next, 110, a - 100);
  return finishChallenge('bigAddSub', tier, {
    display: `${a} − ${b}`,
    answer: a - b,
    choices: numericChoices(next, a - b, 3),
    hints: [
      { pt: 'Subtraia as centenas primeiro, depois o resto.', en: 'Subtract the hundreds first, then the rest.' },
    ],
  });
}

const GENERATORS = {
  counting,
  addWithin,
  subWithin,
  missingAddend,
  compareGroups,
  mulFacts,
  selectEquivalent,
  divFacts,
  shareItems,
  mixedOps,
  priceTimesQuantity,
  totalCostMultiItem,
  calculateChange,
  completeSequence,
  twoStepProblem,
  fractionOfQuantity,
  fractionEquivalence,
  bigAddSub,
};

// Gera um desafio completo para o template no tier, usando o rng dado.
export function generateChallenge(templateId, tier, next, context = {}) {
  const generator = GENERATORS[templateId];
  if (!generator) throw new Error(`Template desconhecido: ${templateId}`);
  const challenge = generator(next, tier, context);
  if (challenge.choices) {
    // Garantia final (spec §31): respostas únicas, uma correta, contendo a resposta.
    const unique = [...new Set(challenge.choices.map(Number))];
    if (!unique.includes(Number(challenge.answer))) unique.push(Number(challenge.answer));
    challenge.choices = shuffled(next, unique);
  }
  return challenge;
}

export { GENERATORS };
