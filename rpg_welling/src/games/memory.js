// RPG Welling — minigame de sequência/memória da biblioteca (roadmap 2.2).
// A criança vê células acenderem (emoji + palavra em inglês) e repete a ordem
// tocando. A sequência cresce a cada rodada (3, 4, 5, 6 itens) e ERRAR NUNCA é
// game over: a rodada repete; com 2 erros na mesma rodada a coruja dá uma dica
// destacando a próxima célula correta.
//
// A lógica é pura (DOM-free) e testável com node --test. O módulo importa
// apenas src/a11y.js — sem main.js e sem three — para não criar acoplamento
// com a cena 3D; o host (main.js) cria o modal e hospeda o container.

import { shouldReduceMotion } from '../a11y.js';

// Rodadas padrão: o tamanho da sequência cresce a cada rodada vencida. Uma
// sessão curta (4 rodadas) cabe na atenção de uma criança de 6-8 anos.
export const DEFAULT_ROUNDS = [3, 4, 5, 6];

// Política amigável: no 2º erro da MESMA rodada a dica aparece (e continua
// aparecendo se houver mais erros). O objetivo é aprender, não punir — os
// erros não zeram o progresso, só contam para o relatório do onWin.
export const HINT_AFTER_MISTAKES = 2;

// Spec: a dica destaca a próxima célula correta por 600ms.
export const HINT_HIGHLIGHT_MS = 600;

// Tempos de cena (ms). Injetáveis via `timing` para testes rápidos sem relógio
// falso; em produção os defaults são calibrados para leitura em tablet.
export const DEFAULT_TIMING = {
  titleMs: 1100, // título fica na tela antes do primeiro "Olhe!"
  litMs: 620, // quanto tempo cada célula fica acesa na reprodução
  gapMs: 260, // pausa entre células da reprodução
  betweenMs: 950, // pausa do "Isso!"/"Quase!" entre fases
  hintMs: HINT_HIGHLIGHT_MS,
};

// Com movimento reduzido a célula não pulsa: o destaque é estático e fica
// aceso mais tempo, dando o mesmo tempo de leitura sem animação.
const REDUCED_MOTION_EXTRA_LIT_MS = 350;

const LANGUAGES = ['pt', 'en', 'es'];

// Textos trilingues default. O host pode sobrepor qualquer chave via `strings`
// (string fixa ou { pt, en, es }). A palavra na célula é sempre `en` — o alvo
// de aprendizado é inglês — então estes textos são só a interface ao redor.
export const DEFAULT_STRINGS = {
  title: {
    pt: '🧠 Memória da Biblioteca',
    en: '🧠 Library Memory',
    es: '🧠 Memoria de la Biblioteca',
  },
  watch: {
    pt: '👀 Olhe!',
    en: '👀 Watch!',
    es: '👀 ¡Mira!',
  },
  yourTurn: {
    pt: '✋ Sua vez!',
    en: '✋ Your turn!',
    es: '✋ ¡Tu turno!',
  },
  nice: {
    pt: '🎉 Isso! Próxima rodada…',
    en: '🎉 Nice! Next round…',
    es: '🎉 ¡Eso! Ronda siguiente…',
  },
  again: {
    pt: '🐣 Quase! Veja de novo.',
    en: '🐣 Almost! Watch again.',
    es: '🐣 ¡Casi! Mira otra vez.',
  },
  hint: {
    pt: '🦉 Dica: esta vem agora…',
    en: '🦉 Hint: this one is next…',
    es: '🦉 Pista: esta viene ahora…',
  },
  win: {
    pt: '🏆 Você venceu! A coruja está orgulhosa.',
    en: '🏆 You win! The owl is proud.',
    es: '🏆 ¡Ganaste! El búho está orgulloso.',
  },
  mistakes: {
    pt: 'Tentativas: {n}',
    en: 'Mistakes: {n}',
    es: 'Intentos: {n}',
  },
};

// `strings[key]` pode ser string fixa (ignora idioma) ou { pt, en, es }.
// Sem override, cai no default do idioma; sem tradução do idioma, cai no pt.
export function resolveText(strings, key, language) {
  const override = strings?.[key];
  if (typeof override === 'string' && override) return override;
  if (override && typeof override === 'object') {
    const picked = override[language] ?? override.pt ?? override.en;
    if (picked) return picked;
  }
  const fallback = DEFAULT_STRINGS[key];
  if (typeof fallback === 'string') return fallback;
  return fallback?.[language] ?? fallback?.pt ?? key;
}

// Mesmo esquema de variáveis do src/i18n.js: "{n}" → valor.
export function formatText(template, vars = {}) {
  let out = template ?? '';
  for (const [name, value] of Object.entries(vars)) {
    out = out.replaceAll(`{${name}}`, String(value));
  }
  return out;
}

// ── Lógica pura (DOM-free) ────────────────────────────────────────────────────
// `rng` devolve um float em [0, 1) — mesma interface de Math.random — para que
// os testes injetem um gerador determinístico.

// Sequência de índices em [0, poolSize) sem vizinhos repetidos: célula igual
// acendendo duas vezes seguidas confunde "duas células" com "uma só". O
// deslocamento simples (+1) enviesa levemente a distribuição, mas simplicidade
// e determinismo valem mais aqui do que sorteio perfeito.
export function buildSequence(rng, length, poolSize = length) {
  if (typeof rng !== 'function') throw new TypeError('buildSequence requires an rng function');
  if (!Number.isInteger(length) || length < 1) throw new TypeError('buildSequence requires length >= 1');
  if (!Number.isInteger(poolSize) || poolSize < 1) throw new TypeError('buildSequence requires poolSize >= 1');
  const sequence = [];
  for (let i = 0; i < length; i += 1) {
    let pick = Math.floor(rng() * poolSize);
    if (pick === sequence[i - 1]) pick = (pick + 1) % poolSize;
    sequence.push(pick);
  }
  return sequence;
}

// Estado explícito e serializável: o render só lê/escreve via estas funções.
// status: 'watch' (reproduzindo) → 'input' (vez da criança) →
//         'complete' (rodada certa) → 'watch'… → 'won' (fim).
export function createGameState({ rounds = DEFAULT_ROUNDS, itemCount, rng = Math.random } = {}) {
  if (!Array.isArray(rounds) || rounds.length < 1 || !rounds.every((n) => Number.isInteger(n) && n >= 1)) {
    throw new TypeError('createGameState requires rounds to be a non-empty array of integers >= 1');
  }
  if (!Number.isInteger(itemCount) || itemCount < 2) {
    throw new TypeError('createGameState requires itemCount >= 2');
  }
  const state = {
    rounds: [...rounds],
    roundIndex: 0,
    itemCount,
    sequence: [],
    step: 0,
    mistakesThisRound: 0,
    mistakesTotal: 0,
    status: 'watch',
  };
  startRound(state, rng);
  return state;
}

// Células usadas na rodada = os primeiros itens do pool. Rodadas curtas usam
// menos células (grade cresce junto com a dificuldade); se o host mandou menos
// itens que o tamanho da rodada, o pool inteiro é usado e a sequência repete
// índices (sem vizinhos iguais, ver buildSequence).
export function poolSizeFor(state) {
  const length = state?.rounds?.[state?.roundIndex] ?? 0;
  return Math.min(length, state?.itemCount ?? 0);
}

// Rodada NOVA: nova sequência, zera o passo e os erros da rodada (o total fica).
export function startRound(state, rng = Math.random) {
  const poolSize = poolSizeFor(state);
  state.sequence = buildSequence(rng, state.rounds[state.roundIndex], poolSize);
  state.step = 0;
  state.mistakesThisRound = 0;
  state.status = 'watch';
  return state;
}

// ERROU não é game over: a MESMA sequência volta a ser reproduzida. Os erros
// da rodada NÃO zeram — é deles que nasce a dica no 2º erro.
export function retryRound(state) {
  state.step = 0;
  state.status = 'watch';
  return state;
}

// Fim da reprodução: células viram botões ativos.
export function startInputPhase(state) {
  if (!state || state.status !== 'watch') return false;
  state.status = 'input';
  return true;
}

// Registra o erro e mantém os contadores num lugar só (o render pode chamar
// direto em variantes futuras do jogo; checkStep já chama por você).
export function registerMistake(state) {
  if (!state || state.status !== 'input') return false;
  state.mistakesThisRound += 1;
  state.mistakesTotal += 1;
  return true;
}

// Um toque da criança. Hit avança o passo; erro conta e a rodada será repetida
// pelo render via retryRound. Retorna null quando o toque não faz sentido
// (fora da fase de input) — o render ignora sem quebrar.
export function checkStep(state, index) {
  if (!state || state.status !== 'input') return null;
  const expected = state.sequence[state.step];
  if (index === expected) {
    state.step += 1;
    const roundComplete = state.step >= state.sequence.length;
    if (roundComplete) state.status = 'complete';
    return { hit: true, roundComplete };
  }
  registerMistake(state);
  return { hit: false, hint: state.mistakesThisRound >= HINT_AFTER_MISTAKES };
}

// Dica: depois de 2 erros na mesma rodada, a próxima célula correta é
// destacada. null = sem dica agora.
export function hintCell(state) {
  if (!state || state.status !== 'input') return null;
  if (state.mistakesThisRound < HINT_AFTER_MISTAKES) return null;
  return state.sequence[state.step] ?? null;
}

export function isRoundComplete(state) {
  return Boolean(state?.sequence?.length) && state.step >= state.sequence.length;
}

export function isGameComplete(state) {
  return state?.status === 'won' || state.roundIndex >= state.rounds.length;
}

// Avança para a próxima rodada (ou sela a vitória). Precisa do rng para
// sortear a nova sequência.
export function advance(state, rng = Math.random) {
  state.roundIndex += 1;
  if (state.roundIndex >= state.rounds.length) {
    state.status = 'won';
  } else {
    startRound(state, rng);
  }
  return state;
}

// ── Render ───────────────────────────────────────────────────────────────────
// Cria o jogo dentro de `container`. O host é dono do modal (trapFocus,
// openModalStack); aqui só existe o tabuleiro e seus botões.

export function createMemoryGame({
  container,
  items,
  lang: language = 'pt',
  strings,
  onWin,
  onCellFeedback,
  rng = Math.random,
  rounds = DEFAULT_ROUNDS,
  timing,
  reduceMotion,
}) {
  if (!container || typeof container.appendChild !== 'function') {
    throw new TypeError('createMemoryGame requires a container element');
  }
  if (!Array.isArray(items) || items.length < 2) {
    throw new TypeError('createMemoryGame requires at least 2 items ({ emoji, en, pt, es })');
  }
  for (const item of items) {
    if (!item || typeof item.emoji !== 'string' || typeof item.en !== 'string') {
      throw new TypeError('createMemoryGame requires every item to have emoji and en strings');
    }
  }

  const lang0 = LANGUAGES.includes(language) ? language : 'pt';
  const pace = { ...DEFAULT_TIMING, ...(timing || {}) };
  // reduceMotion injetável só para testes; no app a fonte de verdade é a mídia
  // query de acessibilidade do navegador.
  const calm = reduceMotion ?? shouldReduceMotion();
  const litMs = calm ? pace.litMs + REDUCED_MOTION_EXTRA_LIT_MS : pace.litMs;

  const state = createGameState({ rounds, itemCount: items.length, rng });
  const usedIndices = new Set(); // alimenta as palavras do relatório do onWin
  const timers = new Set();
  let cells = [];
  let phase = 'title';
  let destroyed = false;

  const text = (key) => resolveText(strings, key, lang0);

  // Todo setTimeout passa por aqui: destroy limpa de uma vez e callbacks
  // órfãos checam `destroyed` — nada acende célula depois do fechamento.
  function later(fn, ms) {
    const id = setTimeout(() => {
      timers.delete(id);
      if (!destroyed) fn();
    }, ms);
    timers.add(id);
    return id;
  }

  const sleep = (ms) => new Promise((resolve) => later(resolve, ms));

  const statusEl = document.createElement('p');
  statusEl.className = 'rpg-mem-status';
  // aria-live anuncia "Olhe!", "Sua vez!", "Isso!" sem mover o foco — a
  // criança acompanha por audição durante a reprodução.
  statusEl.setAttribute('role', 'status');
  statusEl.setAttribute('aria-live', 'polite');

  const grid = document.createElement('div');
  grid.className = 'rpg-mem-grid';
  grid.setAttribute('role', 'group');

  const mistakesEl = document.createElement('p');
  mistakesEl.className = 'rpg-mem-mistakes';

  const root = document.createElement('div');
  root.className = 'rpg-mem-root';
  if (calm) root.classList.add('rpg-mem-calm');
  root.appendChild(statusEl);
  root.appendChild(grid);
  root.appendChild(mistakesEl);
  container.appendChild(root);

  const setStatus = (value) => {
    statusEl.textContent = value;
  };

  const updateMistakes = () => {
    mistakesEl.textContent = state.mistakesTotal > 0
      ? formatText(text('mistakes'), { n: state.mistakesTotal })
      : '';
  };

  const setButtonsDisabled = (disabled) => {
    for (const cell of cells) cell.button.disabled = disabled;
  };

  // Grade reconstruída por rodada: o pool cresce com a dificuldade e os
  // listeners antigos saem junto (nada de botões órfãos após o advance).
  function rebuildGrid(poolSize) {
    for (const cell of cells) cell.button.removeEventListener('click', cell.handler);
    cells = [];
    while (grid.children.length) grid.removeChild(grid.children[grid.children.length - 1]);
    for (let i = 0; i < poolSize; i += 1) {
      const item = items[i];
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'rpg-mem-cell';
      button.dataset.index = String(i);
      button.setAttribute('aria-label', item.en);
      const emoji = document.createElement('span');
      emoji.className = 'rpg-mem-emoji';
      emoji.textContent = item.emoji;
      const word = document.createElement('span');
      word.className = 'rpg-mem-word';
      word.textContent = item.en; // a palavra exibida é sempre o inglês (alvo)
      button.appendChild(emoji);
      button.appendChild(word);
      const handler = () => handleTap(i);
      button.addEventListener('click', handler);
      grid.appendChild(button);
      cells.push({ itemIndex: i, button, handler });
    }
  }

  function enterInput() {
    startInputPhase(state);
    phase = 'input';
    setButtonsDisabled(false);
    const hintIndex = hintCell(state);
    setStatus(hintIndex != null ? `${text('yourTurn')} ${text('hint')}` : text('yourTurn'));
    if (hintIndex != null) {
      const cell = cells.find((candidate) => candidate.itemIndex === hintIndex);
      cell?.button.classList.add('hint');
      later(() => cell?.button.classList.remove('hint'), pace.hintMs);
    }
  }

  // Reproduz a sequência acendendo células. Durante a reprodução os botões
  // ficam desabilitados — tocar fora da vez não pode virar "erro".
  async function playRound() {
    phase = 'watch';
    setButtonsDisabled(true);
    for (const cell of cells) cell.button.classList.remove('good', 'bad');
    setStatus(text('watch'));
    await sleep(pace.gapMs);
    if (destroyed) return;
    for (const itemIndex of state.sequence) {
      const cell = cells.find((candidate) => candidate.itemIndex === itemIndex);
      usedIndices.add(itemIndex);
      cell?.button.classList.add('lit');
      await sleep(litMs);
      cell?.button.classList.remove('lit');
      if (destroyed) return;
      await sleep(pace.gapMs);
      if (destroyed) return;
    }
    enterInput();
  }

  function roundFinished() {
    advance(state, rng);
    if (isGameComplete(state)) {
      win();
      return;
    }
    rebuildGrid(poolSizeFor(state));
    playRound();
  }

  function handleTap(itemIndex) {
    if (destroyed || phase !== 'input') return;
    const result = checkStep(state, itemIndex);
    if (!result) return;
    const cell = cells.find((candidate) => candidate.itemIndex === itemIndex);
    onCellFeedback?.({ index: itemIndex, kind: result.hit ? 'good' : 'bad' });
    if (result.hit) {
      // 'good' fica aceso até o fim da rodada: a criança vê o quanto andou.
      cell?.button.classList.add('good');
      if (result.roundComplete) {
        phase = 'nice';
        setButtonsDisabled(true);
        setStatus(text('nice'));
        later(roundFinished, pace.betweenMs);
      }
    } else {
      phase = 'again';
      setButtonsDisabled(true);
      cell?.button.classList.add('bad');
      const wrongCell = cell;
      later(() => wrongCell?.button.classList.remove('bad'), pace.gapMs);
      setStatus(text('again'));
      updateMistakes();
      // A mesma sequência volta — memorizar é rever, não recomeçar do zero.
      later(() => {
        retryRound(state);
        playRound();
      }, pace.betweenMs);
    }
  }

  function win() {
    phase = 'won';
    setButtonsDisabled(true);
    setStatus(text('win'));
    updateMistakes();
    // O host registra palavras/flag no save; aqui só entregamos o relatório.
    onWin?.({
      mistakes: state.mistakesTotal,
      rounds: state.rounds.length,
      lang: lang0,
      words: [...usedIndices].map((index) => items[index]),
    });
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    for (const id of timers) clearTimeout(id);
    timers.clear();
    for (const cell of cells) cell.button.removeEventListener('click', cell.handler);
    cells = [];
    try {
      container.removeChild(root);
    } catch {
      // O host já removeu o container da árvore — nada a fazer.
    }
  }

  // Snapshot para testes e depuração do host (cópias — sem expor o estado vivo).
  function getState() {
    return {
      phase,
      status: state.status,
      roundIndex: state.roundIndex,
      rounds: [...state.rounds],
      sequence: [...state.sequence],
      step: state.step,
      mistakesTotal: state.mistakesTotal,
      mistakesThisRound: state.mistakesThisRound,
    };
  }

  rebuildGrid(poolSizeFor(state));
  setStatus(text('title'));
  later(playRound, pace.titleMs);

  return { destroy, getState };
}
