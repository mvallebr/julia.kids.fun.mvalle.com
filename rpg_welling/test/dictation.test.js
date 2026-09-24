// RPG Welling — testes do Ditado de campo (roadmap 2.3).
// Cobre: normalização, regra do 1 deslize, política de tentativas, dicas,
// trilinguismo das frases, palavras contra GLOSSES e o render com o stub de DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installDomStub } from './helpers/dom-stub.js';
import {
  normalizeAnswer,
  checkAnswer,
  createAttempts,
  hintFor,
  MAX_ATTEMPTS,
  createDictation,
  DICTATION_PHRASES,
  DICTATION_FLAGS,
} from '../src/games/dictation.js';
import { GLOSSES } from '../src/content.js';

// O render só usa createElement/appendChild/addEventListener — o stub basta e
// evita qualquer navegador nesta suíte. Instalado no topo: a lógica pura ignora
// os globais, então os testes de lógica também seguem verdes.
installDomStub();

// ── normalização ─────────────────────────────────────────────────────────────

test('normalizeAnswer: caixa, espaços, apóstrofo tipográfico e pontuação', () => {
  assert.equal(normalizeAnswer('The Owl   IS Wise.'), 'the owl is wise');
  assert.equal(normalizeAnswer("it's John's"), "it's john's");
  assert.equal(normalizeAnswer('it’s John’s'), "it's john's"); // apóstrofo tipográfico
  assert.equal(normalizeAnswer('quiet!!!'), 'quiet'); // pontuação final
  assert.equal(normalizeAnswer('quiet?'), 'quiet');
  assert.equal(normalizeAnswer('quiet,'), 'quiet'); // vírgula final
  assert.equal(normalizeAnswer('well,  the\towl\n'), 'well the owl'); // vírgula interna + espaços mistos
  assert.equal(normalizeAnswer('  "The woods"  '), 'the woods'); // aspas saem
  assert.equal(normalizeAnswer('well-known'), 'well known'); // hífen vira espaço
  assert.equal(normalizeAnswer(''), '');
  assert.equal(normalizeAnswer(null), '');
  assert.equal(normalizeAnswer(42), '');
});

// ── checkAnswer: exata, 1 deslize, 2 deslizes, palavra única ────────────────

test('checkAnswer: idêntica após normalizar é ok (caixa/pontuação tanto faz)', () => {
  assert.deepEqual(checkAnswer('the woods are quiet', 'The woods are quiet.'), { ok: true, close: false });
  assert.deepEqual(checkAnswer('I WRITE A LETTER!', 'I write a letter.'), { ok: true, close: false });
  assert.deepEqual(checkAnswer('  the   castle is TALL ', 'The castle is tall.'), { ok: true, close: false });
});

test('checkAnswer: exatamente 1 deslize em 1 palavra é "close" (gentil)', () => {
  // troca de 1 letra
  assert.deepEqual(checkAnswer('The owl is wixe.', 'The owl is wise.'), { ok: false, close: true });
  // letra a mais
  assert.deepEqual(checkAnswer('I write a letters.', 'I write a letter.'), { ok: false, close: true });
  // letra a menos
  assert.deepEqual(checkAnswer('I writ a letter.', 'I write a letter.'), { ok: false, close: true });
  // letras vizinhas invertidas (o clássico do teclado/dislexia — Damerau/OSA)
  assert.deepEqual(checkAnswer('the woods are quite', 'The woods are quiet.'), { ok: false, close: true });
});

test('checkAnswer: 2 deslizes (ou 1 deslize em 2 palavras) não é "close"', () => {
  assert.deepEqual(checkAnswer('The owl is wixet.', 'The owl is wise.'), { ok: false, close: false });
  assert.deepEqual(checkAnswer('Tha owl is wixe.', 'The owl is wise.'), { ok: false, close: false });
  assert.deepEqual(checkAnswer('quitz', 'quiet'), { ok: false, close: false }); // 2 trocas na palavra única
});

test('checkAnswer: palavra única segue a mesma regra do 1 deslize', () => {
  assert.deepEqual(checkAnswer('Quiet.', 'quiet'), { ok: true, close: false });
  assert.deepEqual(checkAnswer('quirt', 'quiet'), { ok: false, close: true });
  assert.deepEqual(checkAnswer('quite', 'quiet'), { ok: false, close: true }); // transposta
  assert.deepEqual(checkAnswer('quizz', 'quiet'), { ok: false, close: false });
});

test('checkAnswer: diferença de palavras e campo vazio nunca são "close"', () => {
  assert.deepEqual(checkAnswer('the woods quiet', 'The woods are quiet.'), { ok: false, close: false });
  assert.deepEqual(checkAnswer('the woods are very quiet', 'The woods are quiet.'), { ok: false, close: false });
  assert.deepEqual(checkAnswer('', 'quiet'), { ok: false, close: false }); // não enviou nada ≠ quase acertou
  assert.deepEqual(checkAnswer('   ', 'quiet'), { ok: false, close: false });
});

// ── política de tentativas ──────────────────────────────────────────────────

test('MAX_ATTEMPTS é 3 (política da rodada)', () => {
  assert.equal(MAX_ATTEMPTS, 3);
});

test('tentativas: 1ª falha só "quase", 2ª libera dica, 3ª revela com helped', () => {
  const tracker = createAttempts();
  assert.equal(tracker.left, 3);

  const first = tracker.record(false);
  assert.deepEqual(first, { done: false, helped: false, attempts: 1, hint: false, reveal: false, correct: false });
  assert.equal(tracker.left, 2);

  const second = tracker.record(false);
  assert.equal(second.hint, true); // após a 2ª falha vem a dica
  assert.equal(second.done, false);
  assert.equal(tracker.left, 1);

  const third = tracker.record(false);
  assert.equal(third.done, true);
  assert.equal(third.helped, true); // aprender > punir
  assert.equal(third.reveal, true);
  assert.equal(third.attempts, 3);
  assert.equal(tracker.left, 0);
  assert.equal(tracker.settled, true);
});

test('tentativas: acertar em qualquer tentativa encerra com helped false', () => {
  const perfect = createAttempts();
  const straight = perfect.record(true);
  assert.deepEqual(straight, { done: true, helped: false, attempts: 1, hint: false, reveal: false, correct: true });

  const fighter = createAttempts();
  fighter.record(false);
  fighter.record(false);
  const late = fighter.record(true); // acertou na 3ª, sem ajuda → helped false
  assert.equal(late.done, true);
  assert.equal(late.helped, false);
  assert.equal(late.attempts, 3);
});

test('tentativas: depois de encerrado, record é idempotente', () => {
  const tracker = createAttempts();
  tracker.record(true);
  const again = tracker.record(false);
  assert.equal(again.helped, false);
  assert.equal(again.attempts, 1);
});

// ── dica (primeira letra de cada palavra) ───────────────────────────────────

test('hintFor devolve a primeira letra de cada palavra em caixa alta', () => {
  assert.equal(hintFor('The woods are quiet.'), 'T · W · A · Q');
  assert.equal(hintFor('quiet'), 'Q'); // frase de 1 palavra
  assert.equal(hintFor('it’s a letter'), 'I · A · L'); // apóstrofo não atrapalha
});

// ── conteúdo: frases trilíngues e ligadas ao mundo ──────────────────────────

test('DICTATION_PHRASES: 3 frases curtas, trilíngues, ids únicos e journal válido', () => {
  assert.equal(DICTATION_PHRASES.length, 3);
  const ids = new Set();
  for (const phrase of DICTATION_PHRASES) {
    assert.ok(phrase.id, 'frase sem id');
    ids.add(phrase.id);
    for (const lang of ['en', 'pt', 'es']) {
      assert.equal(typeof phrase[lang], 'string');
      assert.ok(phrase[lang].trim(), `frase ${phrase.id} sem texto em ${lang}`);
    }
    const wordCount = normalizeAnswer(phrase.en).split(' ').length;
    assert.ok(wordCount >= 3 && wordCount <= 5, `frase ${phrase.id} com ${wordCount} palavras (alvo: 3-5)`);
    assert.ok(GLOSSES[phrase.journal], `palavra de diário "${phrase.journal}" não existe em GLOSSES`);
  }
  assert.equal(ids.size, 3, 'ids de frases devem ser únicos');

  // mapa de flags cobre todas as frases, sem colisão
  assert.deepEqual(Object.keys(DICTATION_FLAGS).sort(), [...ids].sort());
  assert.equal(new Set(Object.values(DICTATION_FLAGS)).size, 3);
});

test('palavras de conteúdo das frases existem em GLOSSES (≥4 letras)', () => {
  // O corte em 4 letras separa conteúdo de função: sobram de fora só artigos e
  // "are/i/a", que não são conteúdo ensinável — os que faltarem viram falha
  // aqui, para ninguém enfiar palavra fora do Diário sem querer.
  for (const phrase of DICTATION_PHRASES) {
    const missing = normalizeAnswer(phrase.en)
      .split(' ')
      .filter((word) => word.length >= 4 && !GLOSSES[word]);
    assert.deepEqual(missing, [], `frase ${phrase.id} tem palavras fora do GLOSSES: ${missing.join(', ')}`);
  }
});

// ── render (com stub de DOM) ────────────────────────────────────────────────

function mount(phrase, options = {}) {
  const container = document.createElement('div');
  const ui = createDictation({
    container,
    phrase,
    lang: 'pt',
    ...options,
  });
  return { container, ui };
}

test('render: prompt na língua de apoio, campo com atributos de teclado e aria-live', () => {
  const { ui } = mount(DICTATION_PHRASES[0]);
  assert.equal(ui.root.tagName, 'SECTION');
  // sentido em português (a resposta é o inglês — nunca aparece na tela)
  const prompt = ui.root.children[1];
  assert.equal(prompt.textContent, 'A mata é quieta.');
  assert.equal(ui.input.getAttribute('autocomplete'), 'off');
  assert.equal(ui.input.getAttribute('autocapitalize'), 'none');
  assert.equal(ui.input.getAttribute('enterkeyhint'), 'done');
  assert.equal(ui.feedback.getAttribute('aria-live'), 'polite');
  // label amarrada ao campo (leitor de tela e toque no rótulo focam o input)
  const label = ui.root.children[3];
  assert.equal(label.textContent, 'Digite a frase em inglês:');
  assert.equal(label.getAttribute('for'), ui.input.id);
  // 3 estrelas de tentativa, sem a palavra "erro" em lugar nenhum
  assert.equal(ui.root.children[2].textContent, '⭐⭐⭐');
});

test('render: lang es mostra o sentido em espanhol; strings sobrescrevem textos', () => {
  const es = mount(DICTATION_PHRASES[1], { lang: 'es' });
  assert.equal(es.ui.root.children[1].textContent, 'Escribo una carta.');

  const custom = mount(DICTATION_PHRASES[0], { strings: { title: 'Título da Julia' } });
  assert.equal(custom.ui.root.getAttribute('aria-label'), 'Título da Julia');
});

test('render: Enter com a frase certa dispara onSubmit + onDone(helped false, 1 tentativa)', () => {
  const attempts = [];
  const { ui } = mount(DICTATION_PHRASES[0], {
    onSubmit: (info) => attempts.push(info),
    onDone: (result) => attempts.push(result),
  });
  ui.input.value = 'the woods are quiet';
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });

  assert.equal(attempts.length, 2);
  assert.equal(attempts[0].result.ok, true);
  assert.equal(attempts[0].phraseId, 'dictWoods');
  assert.deepEqual(attempts[1], { phraseId: 'dictWoods', helped: false, attempts: 1 });
  // encerrado: campo e botão saem de circulação
  assert.equal(ui.input.disabled, true);
  assert.equal(ui.root.children[2].textContent, '🎉');
});

test('render: fluxo de falhas — quase, dica após a 2ª, revelação após a 3ª', () => {
  let done = null;
  const { ui } = mount(DICTATION_PHRASES[0], { onDone: (result) => { done = result; } });
  const checkButton = ui.root.children[7].children[0];
  const feedback = () => ui.feedback.textContent;

  // 1ª falha (passou pertinho: transposição) → "muito perto", dica ainda escondida
  ui.input.value = 'the woods are quite';
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  assert.equal(done, null);
  assert.ok(feedback().includes('letrinha'));
  assert.equal(ui.hintButton.hidden, true);
  assert.equal(ui.root.children[2].textContent, '⭐⭐'); // 1ª falha gasta 1 estrela
  assert.equal(ui.root.children[2].getAttribute('aria-label'), 'Estrelas de tentativa: 2');

  // 2ª falha → botão de dica aparece; clicar mostra as iniciais sem gastar estrela
  ui.input.value = 'the woods are loud';
  checkButton.dispatchEvent({ type: 'click' });
  assert.equal(ui.hintButton.hidden, false);
  assert.equal(ui.root.children[2].textContent, '⭐'); // sobra 1 estrela
  ui.hintButton.dispatchEvent({ type: 'click' });
  assert.ok(feedback().includes('T · W · A · Q'));
  assert.equal(ui.root.children[2].textContent, '⭐'); // dica não custa estrela

  // 3ª falha → revela a frase, conclui com helped true
  ui.input.value = 'the woods are loud';
  checkButton.dispatchEvent({ type: 'click' });
  assert.deepEqual(done, { phraseId: 'dictWoods', helped: true, attempts: 3 });
  assert.equal(ui.revealButton.hidden, false);
  const revealBox = ui.root.children[6];
  assert.equal(revealBox.hidden, false);
  assert.ok(revealBox.textContent.includes('The woods are quiet.'));
});

test('render: após revelação, digitar certo rende elogio sem disparar onDone de novo', () => {
  let doneCount = 0;
  let submits = 0;
  const { ui } = mount(DICTATION_PHRASES[0], {
    onDone: () => { doneCount += 1; },
    onSubmit: () => { submits += 1; },
  });
  const checkButton = ui.root.children[7].children[0];

  ui.input.value = 'nope nope nope nope';
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  ui.input.value = 'nope nope nope nope';
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  ui.input.value = 'nope nope nope nope';
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  assert.equal(doneCount, 1);

  // copiou a frase revelada e mandou ver: festa, mas onDone não repete
  ui.input.value = 'The woods are quiet.';
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  assert.equal(doneCount, 1);
  assert.equal(submits, 4); // onSubmit acompanha todas as tentativas
  assert.ok(ui.feedback.textContent.includes('Você escreveu em inglês'));
});

test('destroy: remove listeners, tira a seção do container e ignora submits', () => {
  let submits = 0;
  const { container, ui } = mount(DICTATION_PHRASES[2], { onSubmit: () => { submits += 1; } });
  assert.equal(container.children.length, 1);

  ui.destroy();
  assert.equal(container.children.length, 0);
  ui.input.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault() {} });
  assert.equal(submits, 0);
  ui.destroy(); // segunda chamada é inofensiva
  assert.equal(container.children.length, 0);
});

test('createDictation valida argumentos obrigatórios', () => {
  assert.throws(() => createDictation({ phrase: DICTATION_PHRASES[0] }), TypeError);
  assert.throws(() => createDictation({ container: document.createElement('div'), phrase: {} }), TypeError);
});
