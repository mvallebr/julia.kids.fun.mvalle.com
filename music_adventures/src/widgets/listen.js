// Detetive de Ouvir: toca uma melodinha e a criança reconstrói a sequência
// tocando os botões de nota (dó ré mi…). Erros sacodem; acertos brilham.

import { el, burstAt, toast, confetti } from '../ui.js';
import { sounds, playMelody, playDegree } from '../audio.js';
import { uiText } from '../i18n.js';
import {
  SCALE_DEGREES, DEGREE_COLORS, midiSolfege, degreeToMidi, midiName,
  generateListenMelody, listenOptions, gradeListen,
} from '../notes.js';

const BEAT = 480; // ms por nota na reprodução (analogamente ao tempo de escuta)

export function openListenLevel(host, { level, config, language, onFinish, onSave, onBack }) {
  const melody = generateListenMelody(config.length, config.noteChoices);
  const options = listenOptions(config.noteChoices);

  let mistakes = 0;
  let phase = 'listen'; // listen → answer → solved
  let destroyed = false;
  let inputIndex = 0;
  const answer = [];

  const screen = el('div', 'mu-screen');
  screen.style.backgroundImage = "url('assets/img/bg-listen.webp')";
  screen.style.backgroundPosition = 'center 18%';
  screen.appendChild(el('div', 'mu-veil'));

  // ── HUD ──
  const hud = el('div', 'mu-hud');
  const backChip = el('button', 'mu-chip clickable', '⬅️');
  backChip.type = 'button';
  backChip.addEventListener('click', () => { sounds.tap(); onBack(); });
  hud.appendChild(backChip);
  hud.appendChild(el('div', 'mu-chip', `🎧 ${uiText(language, 'level', { n: level })}`));
  screen.appendChild(hud);

  const panel = el('div', 'mu-panel');
  // painel ancorado embaixo: a coruja detetive (parte de cima da arte) fica visível
  panel.style.top = '62%';
  panel.appendChild(el('div', 'mu-title', uiText(language, 'listen')));

  const statusLine = el('div', 'mu-status', uiText(language, 'listenFirst'));
  panel.appendChild(statusLine);

  // partitura da resposta: bolinhas preenchidas conforme a criança responde
  const targetRow = el('div', 'mu-score-row');
  for (let index = 0; index < melody.length; index += 1) {
    const dot = el('span', 'mu-note-dot', '?');
    dot.style.borderColor = 'rgba(255,255,255,.5)';
    targetRow.appendChild(dot);
  }
  panel.appendChild(targetRow);

  // Sem modos: tocar nota = ouvir (nunca penaliza). A nota ouvida aparece
  // como fantasma na bolinha; um botão GRANDE ✓ confirma a escolha.
  let ghost = null; // grau selecionado, aguardando confirmação

  const confirmButton = el('button', 'mu-btn mu-confirm hidden');
  confirmButton.type = 'button';
  confirmButton.addEventListener('click', () => {
    if (phase !== 'answer' || ghost == null) return;
    sounds.tap();
    const chosen = ghost;
    ghost = null;
    confirmButton.classList.add('hidden');
    gradeInput(chosen, noteButtons.get(chosen));
  });
  panel.appendChild(confirmButton);

  function setGhost(degree) {
    ghost = degree;
    const midi = degreeToMidi(degree);
    // fantasma na próxima bolinha vazia
    const dot = targetRow.children[inputIndex];
    if (dot) {
      dot.style.background = DEGREE_COLORS[degree];
      dot.style.opacity = '0.45';
      dot.textContent = '♪';
    }
    confirmButton.textContent = `✓ ${uiText(language, 'placeNote')}: ${midiSolfege(midi)}`;
    confirmButton.classList.remove('hidden');
  }

  function clearGhost() {
    ghost = null;
    confirmButton.classList.add('hidden');
    const dot = targetRow.children[inputIndex];
    if (dot) {
      dot.style.background = 'transparent';
      dot.style.opacity = '1';
      dot.textContent = '?';
    }
  }

  const noteRow = el('div', 'mu-note-row');
  const noteButtons = new Map();
  for (const degree of options) {
    const button = el('button', 'mu-note-btn');
    button.type = 'button';
    button.style.setProperty('--note-color', DEGREE_COLORS[degree]);
    const midi = degreeToMidi(degree);
    button.innerHTML = `<span class="mu-note-sol">${midiSolfege(midi)}</span><span class="mu-note-name">${midiName(midi)}</span>`;
    button.addEventListener('click', () => {
      if (phase === 'solved') return;
      playDegree(degree, 0.4);
      button.classList.add('playing');
      setTimeout(() => button.classList.remove('playing'), 380);
      if (phase !== 'answer') return;
      if (ghost === degree) {
        // segundo toque na mesma nota = confirma
        ghost = null;
        confirmButton.classList.add('hidden');
        gradeInput(degree, button);
      } else {
        setGhost(degree);
      }
    });
    noteButtons.set(degree, button);
    noteRow.appendChild(button);
  }
  panel.appendChild(noteRow);

  const actionRow = el('div', 'mu-action-row');
  const replayButton = el('button', 'mu-btn ghost', uiText(language, 'listenAgain'));
  replayButton.type = 'button';
  replayButton.addEventListener('click', () => {
    if (phase === 'solved') return;
    sounds.tap();
    playTarget();
  });
  actionRow.appendChild(replayButton);

  // toca todas as notas disponíveis em ordem crescente (escala de opções)
  const playAllButton = el('button', 'mu-btn ghost', uiText(language, 'playAllNotes'));
  playAllButton.type = 'button';
  playAllButton.addEventListener('click', () => {
    if (phase === 'solved') return;
    sounds.tap();
    options.forEach((degree, index) => {
      setTimeout(() => {
        if (destroyed) return;
        playDegree(degree, 0.42);
        const button = noteButtons.get(degree);
        button.classList.add('playing');
        setTimeout(() => button.classList.remove('playing'), 380);
      }, index * 480);
    });
  });
  actionRow.appendChild(playAllButton);
  panel.appendChild(actionRow);

  screen.appendChild(panel);
  host.appendChild(screen);

  function highlight(dot, color) {
    dot.style.background = color;
    dot.style.borderColor = color;
    dot.textContent = '♪';
  }

  function resetDots() {
    for (let index = 0; index < melody.length; index += 1) {
      const dot = targetRow.children[index];
      dot.style.background = 'transparent';
      dot.style.opacity = '1';
      dot.style.borderColor = 'rgba(255,255,255,.5)';
      dot.textContent = '?';
    }
  }

  function gradeInput(degree, button) {
    const expected = melody[inputIndex];
    const dot = targetRow.children[inputIndex];
    if (degree === expected) {
      highlight(dot, DEGREE_COLORS[expected]);
      burstAt(dot, 10);
      inputIndex += 1;
      if (inputIndex >= melody.length) {
        phase = 'solved';
        setTimeout(() => { if (!destroyed) finish(); }, 650);
      }
    } else {
      // Erro = treino de memória musical: limpa o progresso e repete a
      // MELODIA COMPLETA (as notas esperadas não mudam).
      mistakes += 1;
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 500);
      sounds.wrong();
      toast(uiText(language, 'tryAgain'), 'retry');
      inputIndex = 0;
      phase = 'listen'; // bloqueia registro durante o intervalo
      resetDots();
      setTimeout(() => { if (phase === 'listen' && !destroyed) playTarget(); }, 1000);
    }
  }

  function playTarget() {
    phase = 'listen';
    statusLine.textContent = uiText(language, 'listenFirst');
    const total = playMelody(melody, 108, 4, (index, degree) => {
      const dot = targetRow.children[index];
      // pisca o fundo na nota tocada, preservando borda e as já acertadas
      dot.textContent = '♪';
      dot.style.background = 'rgba(255,255,255,.3)';
      setTimeout(() => {
        dot.style.background = index < inputIndex ? DEGREE_COLORS[melody[index]] : 'transparent';
        if (index < inputIndex) dot.textContent = '♪';
        else dot.textContent = '?';
      }, 340);
    });
    setTimeout(() => {
      if (destroyed) return;
      if (phase === 'listen') {
        phase = 'answer';
        statusLine.textContent = uiText(language, 'tapToHear');
        // repinta as já acertadas
        for (let index = 0; index < inputIndex; index += 1) {
          highlight(targetRow.children[index], DEGREE_COLORS[melody[index]]);
        }
      }
    }, total);
  }

  function finish() {
    const stars = gradeListen(mistakes, melody.length);
    // grava as estrelas no instante da conclusão (não no clique de sair)
    onSave?.(stars);
    sounds.star();
    confetti(60 * stars, 1800);
    phase = 'solved';
    statusLine.textContent = stars >= 3 ? uiText(language, 'greatEar') : uiText(language, 'correct');
    clearGhost();
    confirmButton.remove();
    const nextButton = el('button', 'mu-btn', uiText(language, 'nextLevel'));
    nextButton.type = 'button';
    nextButton.addEventListener('click', () => { sounds.tap(); onFinish(stars, level + 1); });
    panel.appendChild(nextButton);
    const againButton = el('button', 'mu-btn ghost', uiText(language, 'replay'));
    againButton.type = 'button';
    againButton.style.marginLeft = '10px';
    againButton.addEventListener('click', () => { sounds.tap(); onFinish(stars, level); });
    panel.appendChild(againButton);
  }

  playTarget();
  return {
      destroy() {
        destroyed = true;
        screen.remove();
      },
    };
}

// reexporta para uso no main (contador de opções por nível)
export { SCALE_DEGREES };
