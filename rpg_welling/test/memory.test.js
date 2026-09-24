// Testes do minigame de sequência/memória (roadmap 2.2).
// Lógica pura com rng injetado + smoke de render sobre o stub de DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_ROUNDS,
  DEFAULT_STRINGS,
  HINT_AFTER_MISTAKES,
  HINT_HIGHLIGHT_MS,
  buildSequence,
  createGameState,
  startRound,
  retryRound,
  startInputPhase,
  checkStep,
  registerMistake,
  advance,
  isRoundComplete,
  isGameComplete,
  hintCell,
  poolSizeFor,
  resolveText,
  formatText,
  createMemoryGame,
} from '../src/games/memory.js';
import { installDomStub, removeDomStub } from './helpers/dom-stub.js';

// LCG simples: mesmo seed → mesma partida, sem depender de Math.random.
function lcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const ITEMS = [
  { emoji: '📚', en: 'book', pt: 'livro', es: 'libro' },
  { emoji: '✏️', en: 'pencil', pt: 'lápis', es: 'lápiz' },
  { emoji: '🎒', en: 'backpack', pt: 'mochila', es: 'mochila' },
  { emoji: '🔎', en: 'magnifier', pt: 'lupa', es: 'lupa' },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitFor(predicate, timeoutMs = 2000) {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeoutMs) throw new Error('waitFor: timeout');
    await sleep(10);
  }
}

test('buildSequence é determinístico com rng injetado e sem vizinhos repetidos', () => {
  // rng sempre 0 → cada sorteio 0 vira 1 quando repete vizinho → padrão fixo
  const zero = () => 0;
  assert.deepEqual(buildSequence(zero, 4), [0, 1, 0, 1]);
  assert.deepEqual(buildSequence(zero, 4), buildSequence(zero, 4));

  // limites: índices dentro do pool e nenhum par adjacente igual (100 partidas)
  for (let seed = 1; seed <= 100; seed += 1) {
    const sequence = buildSequence(lcg(seed), 6, 4);
    assert.equal(sequence.length, 6);
    for (const index of sequence) assert.ok(index >= 0 && index < 4);
    for (let i = 1; i < sequence.length; i += 1) assert.ok(sequence[i] !== sequence[i - 1]);
  }

  // pool default = length (0→1 desloca o vizinho, depois 0 volta);
  // pool de 1 célula degrada para sempre 0 sem travar
  assert.deepEqual(buildSequence(zero, 3), [0, 1, 0]);
  assert.deepEqual(buildSequence(zero, 3, 1), [0, 0, 0]);

  assert.throws(() => buildSequence(undefined, 3), TypeError);
  assert.throws(() => buildSequence(zero, 0), TypeError);
  assert.throws(() => buildSequence(zero, 3, 0), TypeError);
});

test('progressão de rodadas: sequência cresce, pool clamp nos itens, vitória no fim', () => {
  const rng = lcg(7);
  const state = createGameState({ rounds: [2, 3, 6], itemCount: 4, rng });
  assert.equal(state.roundIndex, 0);
  assert.equal(state.status, 'watch');
  assert.deepEqual(state.rounds, [2, 3, 6]);
  assert.equal(state.sequence.length, 2);
  // rodada de 6 com 4 itens: pool inteiro, sequência completa do mesmo tamanho
  assert.equal(poolSizeFor(state), 2);

  // cada rodada: reprodução ('watch') → vez da criança ('input') → toques
  const playRound = (current) => {
    startInputPhase(current);
    for (const index of current.sequence) checkStep(current, index);
  };
  playRound(state);
  assert.ok(isRoundComplete(state));
  assert.ok(!isGameComplete(state));

  advance(state, rng);
  assert.equal(state.roundIndex, 1);
  assert.equal(state.sequence.length, 3);
  // erros da rodada zeram a cada começo de rodada; o total fica para o relatório
  assert.equal(state.mistakesThisRound, 0);

  playRound(state);
  advance(state, rng);
  assert.equal(state.roundIndex, 2);
  assert.equal(state.sequence.length, 6);
  assert.equal(poolSizeFor(state), 4); // clamp: só existem 4 itens

  playRound(state);
  advance(state, rng);
  assert.equal(state.status, 'won');
  assert.ok(isGameComplete(state));
});

test('checkStep aceita o índice esperado e rejeita qualquer outro', () => {
  const state = createGameState({ rounds: [3], itemCount: 4, rng: () => 0 });
  assert.equal(state.status, 'watch');
  // fora da fase de input nenhum toque conta (evita "erro" durante o Olhe!)
  assert.equal(checkStep(state, state.sequence[0]), null);

  startInputPhase(state);
  const wrong = (state.sequence[0] + 1) % 4;
  const miss = checkStep(state, wrong);
  assert.equal(miss.hit, false);
  const hit = checkStep(state, state.sequence[state.step]);
  assert.equal(hit.hit, true);
  assert.equal(hit.roundComplete, false);
  assert.equal(state.step, 1);
});

test('política amigável: erro não é game over — repete a rodada e dica no 2º erro', () => {
  assert.equal(HINT_AFTER_MISTAKES, 2);
  assert.equal(HINT_HIGHLIGHT_MS, 600);

  const state = createGameState({ rounds: [3], itemCount: 4, rng: () => 0 });
  const sequence = [...state.sequence];
  startInputPhase(state);

  const wrong = (sequence[0] + 1) % 4;
  const first = checkStep(state, wrong);
  assert.equal(first.hit, false);
  assert.equal(first.hint, false); // 1º erro ainda não dá dica
  assert.equal(hintCell(state), null);
  assert.equal(state.mistakesTotal, 1);
  assert.equal(state.status, 'input'); // nada de game over

  // retry repete a MESMA sequência, zera o passo, mantém os erros da rodada
  retryRound(state);
  assert.deepEqual(state.sequence, sequence);
  assert.equal(state.step, 0);
  assert.equal(state.status, 'watch');
  assert.equal(state.mistakesThisRound, 1);

  startInputPhase(state);
  const second = checkStep(state, wrong);
  assert.equal(second.hint, true); // 2º erro acende a dica
  assert.equal(hintCell(state), sequence[0]); // próxima célula correta
  assert.equal(state.mistakesTotal, 2);

  // 3º erro: dica continua (o objetivo é aprender, não punir)
  retryRound(state);
  startInputPhase(state);
  assert.equal(checkStep(state, wrong).hint, true);
  assert.equal(hintCell(state), sequence[0]);
});

test('registerMistake conta nos dois contadores e só vale na fase de input', () => {
  const state = createGameState({ rounds: [2], itemCount: 3, rng: lcg(3) });
  assert.equal(registerMistake(state), false); // status watch: ignora
  startInputPhase(state);
  assert.equal(registerMistake(state), true);
  assert.equal(state.mistakesThisRound, 1);
  assert.equal(state.mistakesTotal, 1);
});

test('vitória completa carrega a contagem de erros acumulada', () => {
  const rng = lcg(11);
  const state = createGameState({ rounds: [2, 2], itemCount: 4, rng });
  // rodada 1: um erro no meio
  startInputPhase(state);
  const wrong = (state.sequence[0] + 1) % 4;
  checkStep(state, wrong);
  retryRound(state);
  startInputPhase(state);
  for (const index of state.sequence) checkStep(state, index);
  advance(state, rng);
  // rodada 2: limpa
  startInputPhase(state);
  for (const index of state.sequence) checkStep(state, index);
  advance(state, rng);
  assert.ok(isGameComplete(state));
  assert.equal(state.mistakesTotal, 1);
  assert.equal(state.mistakesThisRound, 0);
});

test('startRound revalida o estado e rounds inválidos são recusados', () => {
  const state = createGameState({ rounds: [2], itemCount: 3, rng: lcg(5) });
  const before = [...state.sequence];
  startRound(state, lcg(5));
  assert.deepEqual(state.sequence, before); // mesmo seed → mesma sequência
  assert.equal(state.mistakesThisRound, 0);

  assert.throws(() => createGameState({ rounds: [], itemCount: 3 }), TypeError);
  assert.throws(() => createGameState({ rounds: [2, 0], itemCount: 3 }), TypeError);
  assert.throws(() => createGameState({ rounds: [2], itemCount: 1 }), TypeError);
});

test('textos default existem e não são vazios nas 3 línguas', () => {
  for (const key of Object.keys(DEFAULT_STRINGS)) {
    for (const language of ['pt', 'en', 'es']) {
      const value = resolveText(undefined, key, language);
      assert.equal(typeof value, 'string', `${key}/${language}`);
      assert.ok(value.length > 0, `${key}/${language} vazio`);
    }
  }
});

test('resolveText: override por string fixa, por objeto trilíngue e fallback pt', () => {
  assert.equal(resolveText({ title: 'Meu Jogo' }, 'title', 'en'), 'Meu Jogo');
  assert.equal(
    resolveText({ nice: { pt: 'Bom!', en: 'Good!', es: '¡Bien!' } }, 'nice', 'es'),
    '¡Bien!',
  );
  // override sem a língua ativa cai no pt antes do default
  assert.equal(resolveText({ win: { pt: 'Ganhaste!' } }, 'win', 'es'), 'Ganhaste!');
  // sem override nenhum, usa o default do idioma
  assert.ok(resolveText(undefined, 'watch', 'en').length > 0);
  assert.equal(formatText('Erros: {n}', { n: 3 }), 'Erros: 3');
});

test('smoke de render: cria, reproduz, a criança acerta e vence (stub de DOM)', async () => {
  installDomStub();
  try {
    const container = document.createElement('div');
    const wins = [];
    const feedback = [];
    const game = createMemoryGame({
      container,
      items: ITEMS,
      lang: 'en',
      rounds: [2],
      rng: () => 0, // sequência [0, 1] determinística
      timing: { titleMs: 5, litMs: 5, gapMs: 5, betweenMs: 5, hintMs: 5 },
      onWin: (report) => wins.push(report),
      onCellFeedback: (event) => feedback.push(event),
    });

    await waitFor(() => game.getState().phase === 'input');
    const root = container.children[0];
    const grid = root.children.find((child) => child.className === 'rpg-mem-grid');
    assert.equal(grid.children.length, 2); // rodada curta usa só as 2 primeiras células
    const byIndex = new Map(grid.children.map((button) => [Number(button.dataset.index), button]));
    assert.equal(byIndex.get(0).tagName, 'BUTTON');

    const snapshot = game.getState();
    for (const index of snapshot.sequence) byIndex.get(index).dispatchEvent({ type: 'click' });

    await waitFor(() => wins.length === 1);
    assert.equal(game.getState().phase, 'won');
    assert.equal(feedback.every((event) => event.kind === 'good'), true);
    assert.equal(wins[0].mistakes, 0);
    assert.equal(wins[0].rounds, 1);
    assert.equal(wins[0].lang, 'en');
    assert.deepEqual(wins[0].words.map((word) => word.en), ['book', 'pencil']);

    game.destroy();
    assert.equal(container.children.length, 0); // conteúdo removido
    // toque pós-destroy não pode quebrar nem ressuscitar nada
    byIndex.get(0).dispatchEvent({ type: 'click' });
    assert.equal(game.getState().phase, 'won');
  } finally {
    removeDomStub();
  }
});

test('smoke de render: erro repete a rodada e vence com a tentativa contada', async () => {
  installDomStub();
  try {
    const container = document.createElement('div');
    const wins = [];
    const feedback = [];
    const game = createMemoryGame({
      container,
      items: ITEMS,
      lang: 'pt',
      rounds: [2],
      rng: () => 0, // sequência [0, 1]
      timing: { titleMs: 5, litMs: 5, gapMs: 5, betweenMs: 5, hintMs: 5 },
      onWin: (report) => wins.push(report),
      onCellFeedback: (event) => feedback.push(event),
    });

    await waitFor(() => game.getState().phase === 'input');
    const grid = container.children[0].children.find((child) => child.className === 'rpg-mem-grid');
    const byIndex = new Map(grid.children.map((button) => [Number(button.dataset.index), button]));

    byIndex.get(1).dispatchEvent({ type: 'click' }); // errado: esperava 0
    assert.equal(feedback.at(-1).kind, 'bad');
    assert.equal(game.getState().phase, 'again');

    // a rodada repete: reprodução de novo e volta a vez da criança
    await waitFor(() => game.getState().phase === 'input');
    const snapshot = game.getState();
    assert.equal(snapshot.mistakesTotal, 1);
    for (const index of snapshot.sequence) byIndex.get(index).dispatchEvent({ type: 'click' });

    await waitFor(() => wins.length === 1);
    assert.equal(wins[0].mistakes, 1);
    game.destroy();
  } finally {
    removeDomStub();
  }
});

test('DEFAULT_ROUNDS é o crescimento 3-4-5-6', () => {
  assert.deepEqual(DEFAULT_ROUNDS, [3, 4, 5, 6]);
});
