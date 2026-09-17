// Quiz do The Word Quest: escolha → lock-in com suspense → revelação com
// explicação. Ferramentas: 50/50, Ask the Family/Owl, Clue e Swap.

import { el } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText } from '../i18n.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const GOOD = ['Correct!', 'Well done!', 'Brilliant!', 'Exactly!'];
const pick = (list) => list[Math.floor(Math.random() * list.length)];

export function showQuizQuestion(host, opts) {
  const { language } = opts;
  let answered = false;
  const answerOnce = (correct) => {
    if (answered) return;
    answered = true;
    opts.onAnswer(correct);
  };
  let question = opts.question;
  let lifelines = { ...opts.lifelines };
  let locked = false;
  let selectedText = null;
  let resolved = false;
  let destroyed = false;
  const timers = [];
  const schedule = (fn, delay) => {
    const id = setTimeout(() => {
      timers.splice(timers.indexOf(id), 1);
      if (destroyed) return;
      fn();
    }, delay);
    timers.push(id);
    return id;
  };
  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    while (timers.length) clearTimeout(timers.pop());
    overlay.remove();
  };
  const resolveOnce = (fn) => (...args) => {
    if (resolved || destroyed) return;
    resolved = true;
    fn(...args);
  };

  const overlay = el('div', 'wq-screen');
  if (question.bg) overlay.style.backgroundImage = `url('${question.bg}')`;

  const panel = el('div', 'wq-quiz wq-panel-dark');
  overlay.appendChild(panel);
  host.appendChild(overlay);

  // expose destroy to the caller so it can cancel timers when leaving the screen
  host._wqDestroyCurrent = destroy;

  const countLine = el('div', 'wq-q-count');
  const stakeLine = el('div', 'wq-stake');
  const promptLine = el('div', 'wq-question');
  const displayLine = el('div', 'wq-question-display');
  const optionsBox = el('div', 'wq-options');
  const lockButton = el('button', 'wq-lock', uiText(language, 'lockIn'));
  lockButton.type = 'button';
  const explainBox = el('div', 'wq-explain hidden');
  const resultLine = el('div', 'wq-result');
  const goldLine = el('div', 'wq-gold-line');
  const lifelinesBox = el('div', 'wq-lifelines');
  const messageBox = el('div', 'wq-explain hidden');

  function renderHeader() {
    countLine.textContent = `Question ${opts.index + 1} of ${opts.total}  ·  ${question.skillLabel}`;
    stakeLine.textContent = `💰 ${opts.stake.toLocaleString('en-GB')} gold`;
  }

  const optionNodes = new Map();
  let visible = [];

  function renderOptions() {
    optionsBox.innerHTML = '';
    optionNodes.clear();
    visible = question.options.map((option, index) => ({ ...option, letter: LETTERS[index] }));
    visible.forEach((option) => {
      const node = el('button', 'wq-option');
      node.type = 'button';
      node.innerHTML = `<span class="letter">${option.letter}</span><span>${option.text}</span>`;
      node.addEventListener('click', () => {
        if (locked) return;
        selectedText = option.text;
        optionNodes.forEach((n) => n.classList.remove('selected'));
        node.classList.add('selected');
        lockButton.disabled = false;
        sounds.tap();
      });
      optionNodes.set(option.text, node);
      optionsBox.appendChild(node);
    });
  }

  function renderBody() {
    renderHeader();
    promptLine.textContent = question.prompt;
    displayLine.textContent = question.display || '';
    displayLine.classList.toggle('hidden', !question.display);
    renderOptions();
  }

  lockButton.addEventListener('click', () => {
    if (locked || !selectedText || destroyed) return;
    locked = true;
    lockButton.textContent = uiText(language, 'locked');
    lockButton.classList.add('suspense');
    sounds.tap();
    schedule(() => {
      if (destroyed) return;
      lockButton.classList.remove('suspense');
      lockButton.disabled = true;
      const chosen = visible.find((option) => option.text === selectedText);
      const correct = Boolean(chosen?.correct);
      const chosenNode = optionNodes.get(selectedText);
      if (chosenNode) chosenNode.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) {
        const right = visible.find((option) => option.correct);
        if (right) optionNodes.get(right.text)?.classList.add('correct');
      }
      resultLine.className = 'wq-result ' + (correct ? 'ok' : 'no');
      resultLine.textContent = correct ? pick(GOOD) : uiText(language, 'wrong');
      goldLine.textContent = correct
        ? `💰 +${opts.stake.toLocaleString('en-GB')} gold`
        : `💛 ${opts.gold.toLocaleString('en-GB')} gold secured`;
      explainBox.textContent = '💡 ' + question.explanation;
      panel.insertBefore(resultLine, lifelinesBox);
      panel.insertBefore(goldLine, lifelinesBox);
      panel.insertBefore(explainBox, lifelinesBox);
      (correct ? sounds.correct : sounds.wrong)();
      schedule(() => answerOnce(correct), 3600);
    }, 1300);
  });

  // ── ferramentas ──
  function hideTwoWrong() {
    const wrongs = visible.filter((option) => !option.correct);
    const toHide = wrongs.sort(() => Math.random() - 0.5).slice(0, 2);
    toHide.forEach((option) => {
      const node = optionNodes.get(option.text);
      if (node) {
        node.classList.add('dim');
        visible = visible.filter((candidate) => candidate.text !== option.text);
      }
    });
  }

  function showMessage(message) {
    messageBox.textContent = message;
    messageBox.classList.remove('hidden');
  }

  const lifelineDefs = [
    ['fifty', '⚖️', () => uiText(language, 'fiftyFifty'), () => uiText(language, 'fiftyFiftyDesc'), () => {
      hideTwoWrong();
      return uiText(language, 'fiftyFifty') + ' — two answers removed';
    }],
    ['family', '👪', () => uiText(language, 'askFamily'), () => uiText(language, 'askFamilyDesc'), () => {
      // family mode: pausa para conversa; owl mode: dá uma dica
      const clue = opts.onClue ? opts.onClue() : question.hint;
      return opts.solo ? `🦉 ${clue}` : uiText(language, 'askFamilyPause');
    }],
    ['clue', '🗝️', () => uiText(language, 'giveClue'), () => uiText(language, 'giveClueDesc'), () => {
      const clue = opts.onClue ? opts.onClue() : question.hint;
      return '🗝️ ' + clue;
    }],
    ['swap', '🔄', () => uiText(language, 'swap'), () => uiText(language, 'swapDesc'), () => {
      const replacement = opts.onSwap ? opts.onSwap() : null;
      if (replacement) {
        question = replacement;
        selectedText = null;
        locked = false;
        lockButton.disabled = true;
        lockButton.textContent = uiText(language, 'lockIn');
        explainBox.classList.add('hidden');
        renderBody();
        return '🔄 ' + question.prompt;
      }
      return null;
    }],
  ];

  for (const [kind, icon, nameFn, descFn, effect] of lifelineDefs) {
    const node = el('button', 'wq-lifeline');
    node.type = 'button';
    node.innerHTML = `<span class="name">${icon} ${nameFn()}</span><span class="desc">${descFn()}</span><span class="count">× ${lifelines[kind] ?? 0}</span>`;
    node.addEventListener('click', () => {
      if (locked || (lifelines[kind] ?? 0) <= 0) return;
      const ok = opts.onLifeline ? !!opts.onLifeline(kind) : true;
      if (!ok) {
        sounds.wrong();
        return;
      }
      lifelines[kind] -= 1;
      node.querySelector('.count').textContent = `× ${lifelines[kind]}`;
      if (lifelines[kind] <= 0) {
        node.classList.add('spent');
        node.disabled = true;
      }
      const message = effect();
      if (message) showMessage(message);
      sounds.tap();
    });
    lifelinesBox.appendChild(node);
  }

  panel.appendChild(countLine);
  panel.appendChild(stakeLine);
  panel.appendChild(promptLine);
  panel.appendChild(displayLine);
  panel.appendChild(optionsBox);
  panel.appendChild(lockButton);
  panel.appendChild(lifelinesBox);
  panel.appendChild(messageBox);
  panel.appendChild(explainBox);

  renderBody();
}
