// Widgets de encontros de matemática (spec §10): desafios diegéticos, nunca
// "modal de quiz branco". Resposta errada = feedback carinhoso + tentar de novo
// (sem vidas, sem game over, spec §12); dicas progressivas (spec §11).

import { el, toast, burstAt } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';

const FEEDBACK_GOOD = ['correct', 'wellDone', 'awesome'];
const FEEDBACK_RETRY = ['tryAgain', 'keepTrying'];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ── Dicas progressivas (spec §11) ────────────────────────────────────────────
// 1 erro: botão de dica aparece. 3 e 5 erros: dica vem sozinha. Nunca entrega
// a resposta de uma vez.
function attachHints(panel, challenge, language, attemptsRef) {
  if (!challenge.hints.length) return null;
  let revealed = 0;
  const chip = el('div', 'ma-hint hidden');
  const button = el('button', 'ma-hint-button', uiText(language, 'showHint'));
  button.type = 'button';
  const showNext = () => {
    if (revealed >= challenge.hints.length) return;
    chip.textContent = `💡 ${lang(challenge.hints[revealed], language)}`;
    chip.classList.remove('hidden');
    revealed += 1;
    sounds.path();
    if (revealed >= challenge.hints.length) button.hidden = true;
  };
  button.addEventListener('click', () => {
    sounds.tap();
    showNext();
  });
  const maybeAuto = () => {
    if (attemptsRef.value === 3 || attemptsRef.value === 5) showNext();
  };
  panel.appendChild(button);
  panel.appendChild(chip);
  return { maybeAuto };
}

function gentleWrong(language, attemptsRef, hintHelper, answer, attempt) {
  sounds.wrong();
  const message = (attempt != null && Math.abs(attempt - answer) === 1)
    ? uiText(language, 'superClose')
    : uiText(language, pick(FEEDBACK_RETRY));
  toast(message, 'retry');
  if (hintHelper) hintHelper.maybeAuto();
}

// Painel base do encontro: placa mágica flutuante sobre a cena.
function basePanel() {
  const overlay = el('div', 'ma-enc-overlay');
  const panel = el('div', 'ma-enc');
  overlay.appendChild(panel);
  return { overlay, panel };
}

// Acerto: brilho + som + mensagem; resolve depois (spec §13).
function celebrate(panel, language, onSolved) {
  sounds.correct();
  burstAt(panel, 34);
  panel.appendChild(el('div', 'ma-enc-success', uiText(language, pick(FEEDBACK_GOOD))));
  setTimeout(onSolved, 1400);
}

function withOrbs(panel, challenge, language, attemptsRef, hintHelper, onSolved) {
  const answer = Number(challenge.answer);
  const row = el('div', 'ma-enc-orbs');
  let solved = false;
  for (const choice of challenge.choices.map(Number)) {
    const orb = el('button', 'ma-orb', String(choice));
    orb.type = 'button';
    orb.addEventListener('click', () => {
      if (solved) return;
      attemptsRef.value += 1;
      if (choice === answer) {
        solved = true;
        orb.classList.add('right');
        celebrate(panel, language, onSolved);
      } else {
        orb.classList.add('wrong');
        setTimeout(() => orb.classList.remove('wrong'), 650);
        gentleWrong(language, attemptsRef, hintHelper, answer, choice);
      }
    });
    row.appendChild(orb);
  }
  panel.appendChild(row);
}

// ── 1. Encruzilhada dourada (path_choice, spec §10.1/§34) ────────────────────
export function showPathChoice(host, world, encounter, challenge, language, onSolved) {
  const attemptsRef = { value: 0 };
  const overlay = el('div', 'ma-fork');
  overlay.appendChild(el('div', 'ma-fork-title', challenge.prompt ? lang(challenge.prompt, language) : uiText(language, 'forkTitle')));
  overlay.appendChild(el('div', 'ma-fork-target', String(challenge.answer)));
  const branches = el('div', 'ma-fork-branches');
  const answer = Number(challenge.answer);
  const options = challenge.context?.expressions || [];
  const hintHelper = attachHints(overlay, challenge, language, attemptsRef);
  let solved = false;
  for (const option of options) {
    const branch = el('button', 'ma-fork-branch');
    branch.type = 'button';
    branch.innerHTML = `<span class="ma-fork-glow"></span><span class="ma-fork-sign">${option.label}</span>`;
    branch.addEventListener('click', () => {
      if (solved) return;
      attemptsRef.value += 1;
      if (Number(option.value) === answer) {
        solved = true;
        branch.classList.add('right');
        overlay.classList.add('solved');
        sounds.path();
        celebrate(branch, language, onSolved);
      } else {
        branch.classList.add('wrong');
        setTimeout(() => branch.classList.remove('wrong'), 700);
        gentleWrong(language, attemptsRef, hintHelper, answer);
      }
    });
    branches.appendChild(branch);
  }
  overlay.appendChild(branches);
  host.appendChild(overlay);
  return overlay;
}

// ── 2. Escolha múltipla em orbes ─────────────────────────────────────────────
export function showChoice(host, world, encounter, challenge, language, onSolved) {
  const attemptsRef = { value: 0 };
  const { overlay, panel } = basePanel();
  panel.classList.add('ma-enc-choice');
  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt ? lang(challenge.prompt, language) : uiText(language, 'forkTitle')));
  panel.appendChild(el('div', 'ma-enc-display', challenge.display));
  const hintHelper = attachHints(panel, challenge, language, attemptsRef);
  withOrbs(panel, challenge, language, attemptsRef, hintHelper, onSolved);
  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

// ── 3. Entrada numérica (portas, baús, totais) ───────────────────────────────
export function showNumeric(host, world, encounter, challenge, language, onSolved) {
  const attemptsRef = { value: 0 };
  const { overlay, panel } = basePanel();
  panel.classList.add('ma-enc-numeric');
  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt ? lang(challenge.prompt, language) : ''));
  if (challenge.display) panel.appendChild(el('div', 'ma-enc-display', challenge.display));
  const screen = el('div', 'ma-enc-screen empty');
  panel.appendChild(screen);
  let current = '';
  const render = () => {
    screen.textContent = current || '…';
    screen.classList.toggle('empty', !current);
  };
  const pad = el('div', 'ma-pad');
  const hintHelper = attachHints(panel, challenge, language, attemptsRef);
  let solved = false;
  const press = (digit) => {
    if (solved) return;
    sounds.tap();
    if (current.replace('−', '-').replace('-', '').length < 4) current += digit;
    render();
  };
  for (const digit of ['1', '2', '3', '4', '5', '6', '7', '8', '9', '−', '0']) {
    const key = el('button', 'ma-pad-key', digit);
    key.type = 'button';
    key.addEventListener('click', () => press(digit));
    pad.appendChild(key);
  }
  const clear = el('button', 'ma-pad-key ma-pad-wide', uiText(language, 'clear'));
  clear.type = 'button';
  clear.addEventListener('click', () => { current = ''; render(); });
  const check = el('button', 'ma-pad-key ma-pad-check ma-pad-wide', uiText(language, 'checkAnswer'));
  check.type = 'button';
  check.addEventListener('click', () => {
    if (solved || !current) return;
    attemptsRef.value += 1;
    const attempt = Number(current.replace('−', '-'));
    if (attempt === Number(challenge.answer)) {
      solved = true;
      check.classList.add('right');
      celebrate(panel, language, onSolved);
    } else {
      screen.classList.add('shake');
      setTimeout(() => screen.classList.remove('shake'), 600);
      gentleWrong(language, attemptsRef, hintHelper, Number(challenge.answer), attempt);
    }
  });
  pad.appendChild(clear);
  pad.appendChild(check);
  panel.appendChild(pad);
  render();
  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

// ── 4. Lojinha (compras, troco, spec §10.3/§10.4) ────────────────────────────
export function showShop(host, world, encounter, challenge, language, onSolved) {
  const context = challenge.context || {};
  const currency = context.currency || { emoji: '🪙', pt: 'moedas', en: 'coins' };
  const attemptsRef = { value: 0 };
  const { overlay, panel } = basePanel();
  panel.classList.add('ma-enc-shop');
  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt ? lang(challenge.prompt, language) : ''));
  const shelf = el('div', 'ma-shop');
  const items = context.items || [{
    emoji: context.item?.emoji || '🎁',
    name: context.item || { pt: 'item', en: 'item' },
    price: Number(challenge.display.split('×')[0]) || 1,
    qty: Number(challenge.display.split('×')[1]) || 1,
  }];
  for (const item of items) {
    const card = el('div', 'ma-shop-item');
    card.appendChild(el('div', 'ma-shop-emoji', item.emoji || '🎁'));
    card.appendChild(el('div', 'ma-shop-name', lang(item.name, language)));
    card.appendChild(el('div', 'ma-shop-price', `${item.price} ${currency.emoji} × ${item.qty}`));
    shelf.appendChild(card);
  }
  panel.appendChild(shelf);
  panel.appendChild(el('div', 'ma-enc-display', challenge.display));
  const hintHelper = attachHints(panel, challenge, language, attemptsRef);
  withOrbs(panel, challenge, language, attemptsRef, hintHelper, onSolved);
  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

// ── 5. Chaves e fechadura (spec §10.6) ───────────────────────────────────────
export function showKeys(host, world, encounter, challenge, language, onSolved) {
  const attemptsRef = { value: 0 };
  const { overlay, panel } = basePanel();
  panel.classList.add('ma-enc-keys');
  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt ? lang(challenge.prompt, language) : uiText(language, 'keyPick')));
  const lock = el('div', 'ma-lock', String(challenge.answer));
  panel.appendChild(lock);
  const keysRow = el('div', 'ma-keys');
  const hintHelper = attachHints(panel, challenge, language, attemptsRef);
  const answer = Number(challenge.answer);
  const wrongs = challenge.choices.map(Number).filter((value) => value !== answer).slice(0, 2);
  const keyDefs = [
    { value: answer, expr: challenge.display },
    ...wrongs.map((value) => ({ value, expr: `${value - 1} + 1` })),
  ];
  for (let index = keyDefs.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [keyDefs[index], keyDefs[swap]] = [keyDefs[swap], keyDefs[index]];
  }
  let solved = false;
  for (const keyDef of keyDefs) {
    const key = el('button', 'ma-key');
    key.type = 'button';
    key.innerHTML = `<span class="ma-key-icon">🔑</span><span class="ma-key-expr">${keyDef.expr}</span>`;
    key.addEventListener('click', () => {
      if (solved) return;
      attemptsRef.value += 1;
      if (Number(keyDef.value) === answer) {
        solved = true;
        key.classList.add('right');
        lock.classList.add('open');
        celebrate(panel, language, onSolved);
      } else {
        key.classList.add('wrong');
        setTimeout(() => key.classList.remove('wrong'), 650);
        gentleWrong(language, attemptsRef, hintHelper, answer, Number(keyDef.value));
      }
    });
    keysRow.appendChild(key);
  }
  panel.appendChild(keysRow);
  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

// ── 6. Ordenar (sequência em pedras mágicas) ─────────────────────────────────
export function showOrdering(host, world, encounter, challenge, language, onSolved) {
  const attemptsRef = { value: 0 };
  const { overlay, panel } = basePanel();
  panel.classList.add('ma-enc-ordering');
  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt ? lang(challenge.prompt, language) : uiText(language, 'orderTitle')));
  panel.appendChild(el('div', 'ma-enc-display', challenge.display));
  const row = el('div', 'ma-stones');
  const hintHelper = attachHints(panel, challenge, language, attemptsRef);
  const values = (challenge.context?.sequence || []).concat(Number(challenge.answer));
  const stones = values.map((value, index) => ({ value, id: index }));
  for (let index = stones.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [stones[index], stones[swap]] = [stones[swap], stones[index]];
  }
  let nextIndex = 0;
  let solved = false;
  for (const stone of stones) {
    const node = el('button', 'ma-stone', String(stone.value));
    node.type = 'button';
    node.addEventListener('click', () => {
      if (solved || node.disabled) return;
      attemptsRef.value += 1;
      if (stone.value === values[nextIndex]) {
        node.disabled = true;
        node.classList.add('locked');
        nextIndex += 1;
        sounds.tap();
        burstAt(node, 8);
        if (nextIndex >= values.length) {
          solved = true;
          celebrate(panel, language, onSolved);
        }
      } else {
        node.classList.add('wrong');
        setTimeout(() => node.classList.remove('wrong'), 650);
        gentleWrong(language, attemptsRef, hintHelper, values[nextIndex], stone.value);
      }
    });
    row.appendChild(node);
  }
  panel.appendChild(row);
  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

// ── 7. Ligar pares expressão ↔ valor (matching) ──────────────────────────────
export function showMatching(host, world, encounter, challenge, language, onSolved) {
  const attemptsRef = { value: 0 };
  const { overlay, panel } = basePanel();
  panel.classList.add('ma-enc-matching');
  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt ? lang(challenge.prompt, language) : uiText(language, 'matchTitle')));
  const answer = Number(challenge.answer);
  // Pares: o desafio principal + 2 vizinhos plausíveis (a + b = valor).
  const neighbours = challenge.choices.map(Number).filter((value) => value !== answer).slice(0, 2);
  const pairs = [
    { expr: challenge.display, value: answer },
    ...neighbours.map((value) => {
      const a = Math.max(1, Math.ceil(value / 2));
      return { expr: `${a} + ${value - a}`, value };
    }),
  ];
  const leftOrder = pairs.map((_, index) => index);
  const rightOrder = pairs.map((_, index) => index);
  for (let index = leftOrder.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [leftOrder[index], leftOrder[swap]] = [leftOrder[swap], leftOrder[index]];
    [rightOrder[index], rightOrder[swap]] = [rightOrder[swap], rightOrder[index]];
  }
  const board = el('div', 'ma-match');
  const leftCol = el('div', 'ma-match-col');
  const rightCol = el('div', 'ma-match-col');
  const hintHelper = attachHints(panel, challenge, language, attemptsRef);
  let selected = null;
  let solvedPairs = 0;
  let solved = false;
  for (const index of leftOrder) {
    const node = el('button', 'ma-match-card', pairs[index].expr);
    node.type = 'button';
    node.addEventListener('click', () => {
      if (solved || node.classList.contains('locked')) return;
      sounds.tap();
      if (selected) selected.node.classList.remove('selected');
      node.classList.add('selected');
      selected = { index, node };
    });
    leftCol.appendChild(node);
  }
  for (const index of rightOrder) {
    const node = el('button', 'ma-match-card', String(pairs[index].value));
    node.type = 'button';
    node.addEventListener('click', () => {
      if (solved || node.classList.contains('locked') || !selected) return;
      attemptsRef.value += 1;
      if (index === selected.index) {
        node.classList.add('locked');
        selected.node.classList.remove('selected');
        selected.node.classList.add('locked');
        solvedPairs += 1;
        sounds.tap();
        burstAt(node, 8);
        selected = null;
        if (solvedPairs >= pairs.length) {
          solved = true;
          celebrate(panel, language, onSolved);
        }
      } else {
        node.classList.add('wrong');
        selected.node.classList.remove('selected');
        selected = null;
        setTimeout(() => node.classList.remove('wrong'), 650);
        gentleWrong(language, attemptsRef, hintHelper, answer);
      }
    });
    rightCol.appendChild(node);
  }
  board.appendChild(leftCol);
  board.appendChild(rightCol);
  panel.appendChild(board);
  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

// Fábrica: widget certo para o encontro.
export function showEncounter(host, world, encounter, challenge, language, onSolved) {
  switch (encounter.widget) {
    case 'pathChoice': return showPathChoice(host, world, encounter, challenge, language, onSolved);
    case 'choice': return showChoice(host, world, encounter, challenge, language, onSolved);
    case 'shop': return showShop(host, world, encounter, challenge, language, onSolved);
    case 'keys': return showKeys(host, world, encounter, challenge, language, onSolved);
    case 'ordering': return showOrdering(host, world, encounter, challenge, language, onSolved);
    case 'matching': return showMatching(host, world, encounter, challenge, language, onSolved);
    case 'numeric':
    default: return showNumeric(host, world, encounter, challenge, language, onSolved);
  }
}
