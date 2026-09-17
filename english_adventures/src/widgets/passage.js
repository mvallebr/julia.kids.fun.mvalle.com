// Leitor de passagem de compreensão: o texto em cartão rolável, depois as
// 7 questões Quest-style uma a uma (com o texto sempre acessível).

import { el } from '../ui.js';
import { sounds } from '../audio.js';
import { lang } from '../i18n.js';
import { showQuiz } from './quiz.js';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export function showPassageSet(host, passage, language, onDone) {
  const overlay = el('div', 'ma-enc-overlay ma-passage-overlay');
  const panel = el('div', 'ma-enc ma-passage');

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
  // expose cleanup to the world screen so it can cancel the post-answer delay
  // when the user leaves the world mid-passage.
  host._eaDestroyPassage = () => {
    if (destroyed) return;
    destroyed = true;
    while (timers.length) clearTimeout(timers.pop());
    overlay.remove();
  };

  const title = el('div', 'ma-enc-prompt', `📖 ${lang(passage.title, language)}`);
  panel.appendChild(title);

  const textCard = el('div', 'ma-passage-text', passage.text);
  panel.appendChild(textCard);

  const toggle = el('button', 'ma-hint-button', '📖 Hide the text');
  toggle.type = 'button';
  toggle.addEventListener('click', () => {
    textCard.classList.toggle('collapsed');
    toggle.textContent = textCard.classList.contains('collapsed') ? '📖 Show the text' : '📖 Hide the text';
  });
  panel.appendChild(toggle);

  const progress = el('div', 'ma-passage-progress');
  panel.appendChild(progress);

  overlay.appendChild(panel);
  host.appendChild(overlay);

  let index = 0;
  let quizNode = null;

  function renderProgress() {
    progress.textContent = `Question ${index + 1} of ${passage.questions.length}`;
  }

  function renderQuestion() {
    if (quizNode) quizNode.remove();
    const question = passage.questions[index];
    quizNode = el('div', 'ma-passage-question');
    quizNode.appendChild(el('div', 'ma-enc-prompt', question.q));
    const optionsRow = el('div', 'ma-quiz-options');
    question.o.forEach((option, optionIndex) => {
      const orb = el('button', 'ma-orb ma-quiz-orb');
      orb.type = 'button';
      orb.innerHTML = `<span class="ma-quiz-letter">${LETTERS[optionIndex]}</span><span class="ma-quiz-text">${option}</span>`;
      const answered = { value: false };
      orb.addEventListener('click', () => {
        if (answered.value || destroyed) return;
        answered.value = true;
        const correct = optionIndex === question.a;
        if (correct) {
          orb.classList.add('right');
          sounds.correct();
        } else {
          orb.classList.add('wrong');
          sounds.wrong();
        }
        // revela a correta e a explicação (ensinar, spec feedback)
        quizNode.querySelectorAll('.ma-quiz-orb')[question.a]?.classList.add('right');
        quizNode.appendChild(el('div', 'ma-explain', `💡 ${question.why}`));
        schedule(() => {
          if (destroyed) return;
          index += 1;
          if (index >= passage.questions.length) {
            overlay.remove();
            onDone({ finished: true });
          } else {
            renderProgress();
            renderQuestion();
          }
        }, 1900);
      });
      optionsRow.appendChild(orb);
    });
    quizNode.appendChild(optionsRow);
    panel.appendChild(quizNode);
    renderProgress();
    sounds.tap();
  }

  renderQuestion();
  return {
    destroy() {
      destroyed = true;
      while (timers.length) clearTimeout(timers.pop());
      overlay.remove();
    },
  };
}
