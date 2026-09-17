// Widget unificado de questões do English Adventures.
// Suporta: choice (A–E, uma correta), multi (duas corretas), fork (placas de
// palavras), keys (grafia nas chaves), stones (ordenar palavras),
// match (ligar palavra ↔ sinônimo). Sempre mostra a explicação ao resolver.

import { el, burstAt } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';

const GOOD = ['Correct!', 'Well done!', 'Brilliant!', 'Exactly!'];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function showQuiz(host, challenge, language, { onSolved, onWrong }) {
  const overlay = el('div', 'ma-enc-overlay');
  const panel = el('div', 'ma-enc ma-quiz');

  const timers = [];
  let destroyed = false;
  const schedule = (fn, delay) => {
    const id = setTimeout(() => {
      const idx = timers.indexOf(id);
      if (idx >= 0) timers.splice(idx, 1);
      if (destroyed) return;
      fn();
    }, delay);
    timers.push(id);
    return id;
  };
  const safeSolved = () => { if (!destroyed) onSolved(); };
  const safeWrong = () => { if (!destroyed) onWrong?.(); };

  // expose cleanup so the parent screen can cancel timers when the user leaves
  host._eaDestroyQuiz = () => {
    if (destroyed) return;
    destroyed = true;
    while (timers.length) clearTimeout(timers.pop());
    overlay.remove();
  };

  if (challenge.passage) {
    const ref = el('button', 'ma-passage-ref', '📖 Re-read the text');
    ref.type = 'button';
    ref.addEventListener('click', () => {
      challenge.onReopenPassage?.();
    });
    panel.appendChild(ref);
  }

  panel.appendChild(el('div', 'ma-enc-prompt', challenge.prompt));
  if (challenge.display && challenge.kind !== 'stones' && challenge.kind !== 'match' && challenge.kind !== 'keys') {
    panel.appendChild(el('div', 'ma-enc-display', challenge.display));
  }

  const attempts = { value: 0 };
  const solved = { value: false };

  function succeed(node) {
    solved.value = true;
    if (node) node.classList.add('right');
    sounds.correct();
    burstAt(panel, 30);
    panel.appendChild(el('div', 'ma-enc-success', uiText(language, pick(GOOD))));
    panel.appendChild(el('div', 'ma-explain', `💡 ${challenge.explanation}`));
    schedule(() => { overlay.remove(); safeSolved(); }, 2600);
  }

  function fail(node, correctTexts) {
    sounds.wrong();
    attempts.value += 1;
    if (node) node.classList.add('wrong');
    const message = challenge.answer != null && attempts.value >= 2
      ? uiText(language, 'keepTrying')
      : uiText(language, 'tryAgain');
    if (challenge.kind === 'choice' || challenge.kind === 'multi') {
      // Quest-style: mostrar a explicação após 2 erros para ensinar
      if (attempts.value >= 2) panel.appendChild(el('div', 'ma-explain', `💡 ${challenge.explanation}`));
    }
    void correctTexts;
  }

  const markWrong = (node) => {
    if (!node) return;
    node.classList.add('wrong');
    schedule(() => node.classList.remove('wrong'), 650);
  };

  // ── escolha A–E (uma ou duas corretas) ──
  if (challenge.kind === 'choice' || challenge.kind === 'multi') {
    const options = challenge.options;
    const letters = ['A', 'B', 'C', 'D', 'E'];
    options.forEach((option, index) => { option.letter = option.letter || letters[index]; });
    const multi = challenge.kind === 'multi';
    const selected = new Set();
    const row = el('div', multi ? 'ma-quiz-grid' : 'ma-enc-orbs');
    options.forEach((option) => {
      const orb = el('button', 'ma-orb ma-quiz-orb');
      orb.type = 'button';
      orb.innerHTML = `<span class="ma-quiz-letter">${option.letter}</span><span class="ma-quiz-text">${option.text}</span>`;
      orb.addEventListener('click', () => {
        if (solved.value) return;
        attempts.value += 1;
        if (multi) {
          orb.classList.toggle('picked');
          if (orb.classList.contains('picked')) selected.add(option);
          else selected.delete(option);
          const pickedCount = selected.size;
          if (pickedCount === 2) {
            const allCorrect = [...selected].every((candidate) => candidate.correct);
            if (allCorrect) {
              solved.value = true;
              row.classList.add('right');
              celebrate(panel, language, () => { overlay.remove(); safeSolved(); });
            } else {
              markWrong(row);
              selected.clear();
              options.forEach((o) => o.letter && void o);
              row.querySelectorAll('.picked').forEach((n) => n.classList.remove('picked'));
              onWrong?.();
            }
          }
          return;
        }
        if (option.correct) {
          solved.value = true;
          orb.classList.add('right');
          celebrate(panel, language, () => { overlay.remove(); safeSolved(); });
        } else {
          orb.classList.add('wrong');
          schedule(() => orb.classList.remove('wrong'), 650);
          onWrong?.();
        }
      });
      row.appendChild(orb);
    });
    panel.appendChild(row);
  }

  // ── fork: placas de palavras ──
  if (challenge.kind === 'fork') {
    const branches = el('div', 'ma-fork-branches');
    challenge.options.forEach((option) => {
      const branch = el('button', 'ma-fork-branch');
      branch.type = 'button';
      branch.innerHTML = `<span class="ma-fork-glow"></span><span class="ma-fork-sign">${option.text}</span>`;
      branch.addEventListener('click', () => {
        if (solved.value) return;
        attempts.value += 1;
        if (option.correct) {
          solved.value = true;
          branch.classList.add('right');
          overlay.classList.add('solved');
          celebrate(branch, language, safeSolved);
        } else {
          branch.classList.add('wrong');
          schedule(() => branch.classList.remove('wrong'), 700);
          onWrong?.();
        }
      });
      branches.appendChild(branch);
    });
    overlay.classList.add('ma-fork-host');
    panel.appendChild(branches);
  }

  // ── keys: grafia nas chaves ──
  if (challenge.kind === 'keys') {
    const keysRow = el('div', 'ma-keys');
    const lock = el('div', 'ma-lock', challenge.lockLabel || '?');
    panel.appendChild(lock);
    challenge.options.forEach((option) => {
      const key = el('button', 'ma-key');
      key.type = 'button';
      key.innerHTML = `<span class="ma-key-icon">🔑</span><span class="ma-key-expr">${option.text}</span>`;
      key.addEventListener('click', () => {
        if (solved.value) return;
        attempts.value += 1;
        if (option.correct) {
          solved.value = true;
          key.classList.add('right');
          lock.classList.add('open');
          celebrate(panel, language, onSolved);
        } else {
          key.classList.add('wrong');
          schedule(() => key.classList.remove('wrong'), 650);
          onWrong?.();
        }
      });
      keysRow.appendChild(key);
    });
    panel.appendChild(keysRow);
  }

  // ── stones: ordenar palavras da frase ──
  if (challenge.kind === 'stones') {
    const words = [...challenge.order];
    for (let i = words.length - 1; i > 0; i -= 1) {
      const swap = Math.floor(Math.random() * (i + 1));
      [words[i], words[swap]] = [words[swap], words[i]];
    }
    const row = el('div', 'ma-stones');
    let nextIndex = 0;
    let localSolved = false;
    words.forEach((word) => {
      const stone = el('button', 'ma-stone', word);
      stone.type = 'button';
      stone.addEventListener('click', () => {
        if (localSolved || stone.disabled) return;
        if (word === challenge.order[nextIndex]) {
          stone.disabled = true;
          stone.classList.add('locked');
          nextIndex += 1;
          sounds.tap();
          burstAt(stone, 8);
          if (nextIndex >= challenge.order.length) {
            localSolved = true;
            celebrate(panel, language, onSolved);
          }
        } else {
          stone.classList.add('wrong');
          schedule(() => stone.classList.remove('wrong'), 650);
          onWrong?.();
        }
      });
      row.appendChild(stone);
    });
    panel.appendChild(row);
  }

  // ── match: palavra ↔ sinônimo ──
  if (challenge.kind === 'match') {
    const pairs = challenge.pairs;
    const board = el('div', 'ma-match');
    const leftCol = el('div', 'ma-match-col');
    const rightCol = el('div', 'ma-match-col');
    let selected = null;
    let matches = 0;
    pairs.forEach((pair, index) => {
      const left = el('button', 'ma-match-card', pair.left);
      left.type = 'button';
      left.addEventListener('click', () => {
        if (left.classList.contains('locked')) return;
        if (selected) selected.node.classList.remove('selected');
        left.classList.add('selected');
        selected = { index, node: left };
        sounds.tap();
      });
      leftCol.appendChild(left);

      const right = el('button', 'ma-match-card', pair.right);
      right.type = 'button';
      right.addEventListener('click', () => {
        if (!selected || right.classList.contains('locked')) return;
        attempts.value += 1;
        if (index === selected.index) {
          right.classList.add('locked');
          selected.node.classList.remove('selected');
          selected.node.classList.add('locked');
          matches += 1;
          selected = null;
          sounds.tap();
          burstAt(right, 8);
          if (matches >= pairs.length && !solved.value) {
            solved.value = true;
            celebrate(panel, language, onSolved);
          }
        } else {
          right.classList.add('wrong');
          schedule(() => right.classList.remove('wrong'), 650);
          onWrong?.();
        }
      });
      rightCol.appendChild(right);
    });
    board.appendChild(leftCol);
    board.appendChild(rightCol);
    panel.appendChild(board);
  }

  overlay.appendChild(panel);
  host.appendChild(overlay);
  return overlay;
}

function celebrate(panel, language, onSolved) {
  void language;
  sounds.correct();
  burstAt(panel, 30);
  panel.appendChild(el('div', 'ma-enc-success', uiText('en', pick(['correct', 'wellDone', 'awesome']))));
  schedule(safeSolved, 1400);
}
