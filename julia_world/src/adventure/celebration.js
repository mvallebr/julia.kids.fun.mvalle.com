import { ensureAdventureStyles } from './styles.js';
import { sounds } from './sounds.js';

const CONFETTI_COLORS = ['#ffd166', '#ff6b9d', '#4ecdc4', '#a8e05f', '#6ca6ff', '#ffab5e'];
const BALLOON_COLORS = ['#ff5e7e', '#ffd166', '#4ecdc4', '#8fdc6a', '#6ca6ff', '#b9a4f5', '#ff9a3d'];
const REQUIRED_TAPS = 6;

// Máquina de estados da celebração (spec §41):
// confetti → balloons → rewardOverlay → tapPresent → presentOpening → rewardReveal → retorno.
export function runCelebration({
  language,
  text,
  title,
  reward,
  milestone,
  explorerName,
  onDone,
}) {
  ensureAdventureStyles();
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const locale = language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'pt-BR';
  const timeouts = [];
  const layers = [];
  const later = (fn, delay) => timeouts.push(setTimeout(fn, delay));

  const finish = () => {
    timeouts.forEach(clearTimeout);
    layers.forEach((layer) => layer.remove());
    if (onDone) onDone();
  };

  const layer = (className) => {
    const element = document.createElement('div');
    element.className = className;
    document.body.appendChild(element);
    layers.push(element);
    return element;
  };

  // 1. Confetti + balões (festa) — apresentação apenas, some sozinha.
  if (!reducedMotion) {
    const party = layer('adv-celebration');
    const confettiCount = milestone ? 120 : 70;
    for (let index = 0; index < confettiCount; index += 1) {
      const piece = document.createElement('span');
      piece.className = 'adv-confetti';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.background = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
      const duration = 2.4 + Math.random() * 1.8;
      piece.style.animationDuration = `${duration}s`;
      piece.style.animationDelay = `${Math.random() * 0.9}s`;
      party.appendChild(piece);
    }
    const balloonCount = milestone ? 16 : 10;
    for (let index = 0; index < balloonCount; index += 1) {
      const balloon = document.createElement('button');
      balloon.type = 'button';
      balloon.className = 'adv-balloon';
      balloon.setAttribute('aria-label', text(language, 'close'));
      balloon.style.left = `${4 + Math.random() * 88}%`;
      balloon.style.background = BALLOON_COLORS[index % BALLOON_COLORS.length];
      balloon.style.animationDuration = `${5 + Math.random() * 4}s`;
      balloon.style.animationDelay = `${Math.random() * 1.6}s`;
      balloon.addEventListener('click', () => {
        balloon.classList.add('pop');
        balloon.disabled = true;
        sounds.pop();
        later(() => balloon.remove(), 350);
      });
      party.appendChild(balloon);
    }
    later(() => party.remove(), 5200);
  }

  // 2. Overlay escuro + presente com vários toques (spec §14).
  later(() => {
    const stage = layer('adv-stage');
    const wrap = document.createElement('div');
    wrap.className = 'adv-present-wrap';
    if (milestone) {
      const banner = document.createElement('div');
      banner.className = 'adv-milestone-banner';
      banner.textContent = text(language, 'advMilestoneTitle');
      wrap.appendChild(banner);
    }
    const instruction = document.createElement('div');
    instruction.className = 'adv-instruction';
    instruction.textContent = text(language, 'advTapPresent');
    const present = document.createElement('button');
    present.type = 'button';
    present.className = 'adv-present';
    present.textContent = '🎁';
    present.setAttribute('aria-label', text(language, 'advTapPresent'));
    wrap.appendChild(present);
    wrap.appendChild(instruction);
    stage.appendChild(wrap);

    let taps = 0;
    const openPresent = () => {
      present.disabled = true;
      present.classList.remove('shake', 'grow');
      present.classList.add('grow');
      sounds.open();
      showReveal(stage);
    };
    present.addEventListener('click', () => {
      taps += 1;
      sounds.tap();
      present.classList.remove('shake');
      void present.offsetWidth;
      present.classList.add('shake');
      if (taps >= REQUIRED_TAPS) openPresent();
    });
    present.focus();
  }, reducedMotion ? 250 : 1500);

  // 3. Revelação: certificado + recompensas (spec §15/§16).
  function showReveal(stage) {
    stage.innerHTML = '';
    const reveal = document.createElement('div');
    reveal.className = 'adv-reveal';
    const heading = document.createElement('h3');
    heading.textContent = text(language, 'advCertificate');
    const congrats = document.createElement('div');
    congrats.textContent = text(language, 'advCongrats');
    const taskLine = document.createElement('div');
    taskLine.className = 'adv-task-line';
    taskLine.textContent = `${text(language, 'advCertFor', { name: explorerName })}: ${title}`;
    const dateLine = document.createElement('p');
    dateLine.className = 'adv-cert-name';
    dateLine.textContent = new Date().toLocaleDateString(locale);
    const rewards = document.createElement('div');
    rewards.className = 'adv-rewards';
    const stickerChip = document.createElement('span');
    stickerChip.className = 'adv-chip';
    stickerChip.textContent = text(language, 'advRewardStickers', { n: reward.stickers || 0 });
    rewards.appendChild(stickerChip);
    if (reward.badges > 0) {
      const badgeChip = document.createElement('span');
      badgeChip.className = 'adv-chip';
      badgeChip.textContent = `🏅 ${text(language, 'advRewardBadge', { n: reward.badges })}`;
      rewards.appendChild(badgeChip);
    }
    if (milestone) {
      const milestoneChip = document.createElement('span');
      milestoneChip.className = 'adv-chip';
      milestoneChip.textContent = `🎖️ ${text(language, 'advMilestoneBadge', { n: milestone })}`;
      rewards.appendChild(milestoneChip);
    }
    const continueButton = document.createElement('button');
    continueButton.type = 'button';
    continueButton.className = 'adv-continue';
    continueButton.textContent = text(language, 'advContinue');
    continueButton.addEventListener('click', finish);
    reveal.appendChild(heading);
    reveal.appendChild(congrats);
    reveal.appendChild(taskLine);
    reveal.appendChild(dateLine);
    reveal.appendChild(rewards);
    reveal.appendChild(continueButton);
    stage.appendChild(reveal);
    sounds.fanfare();
    continueButton.focus();
  }

  return finish;
}

// ── Final da World Adventure (spec §21-25) ───────────────────────────────────
const RAINBOW = ['#ff5a5a', '#ff9a3d', '#ffd166', '#7ad97a', '#4ecdc4', '#6ca6ff', '#b9a4f5'];
const FINAL_STEPS = [
  { icon: '🎁', taps: 6, scale: 1 },
  { icon: '🎁', taps: 7, scale: 1.15, sparkle: true },
  { icon: '🎁', taps: 8, scale: 1.3, rainbow: true },
  { chest: true, taps: 10, scale: 1.1 },
];

export function runWorldFinale({ language, text, explorerName, tasksCompleted, onReturnToMenu }) {
  ensureAdventureStyles();
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const timeouts = [];
  const layers = [];
  const later = (fn, delay) => timeouts.push(setTimeout(fn, delay));
  let finished = false;

  const layer = (className) => {
    const element = document.createElement('div');
    element.className = className;
    document.body.appendChild(element);
    layers.push(element);
    return element;
  };

  const finish = (returnToMenu) => {
    if (finished) return;
    finished = true;
    timeouts.forEach(clearTimeout);
    layers.forEach((layer) => layer.remove());
    if (returnToMenu && onReturnToMenu) onReturnToMenu();
  };

  // 1. Mega festa.
  const party = layer('adv-celebration');
  if (!reducedMotion) {
    for (let wave = 0; wave < 3; wave += 1) {
      later(() => {
        for (let index = 0; index < 80; index += 1) {
          const piece = document.createElement('span');
          piece.className = 'adv-confetti';
          piece.style.left = `${Math.random() * 100}%`;
          piece.style.background = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
          piece.style.animationDuration = `${2.2 + Math.random() * 2}s`;
          piece.style.animationDelay = `${Math.random() * 0.7}s`;
          party.appendChild(piece);
        }
      }, wave * 900);
    }
    for (let index = 0; index < 26; index += 1) {
      const balloon = document.createElement('button');
      balloon.type = 'button';
      balloon.className = 'adv-balloon';
      balloon.setAttribute('aria-label', text(language, 'close'));
      balloon.style.left = `${2 + Math.random() * 92}%`;
      balloon.style.background = BALLOON_COLORS[index % BALLOON_COLORS.length];
      balloon.style.animationDuration = `${6 + Math.random() * 5}s`;
      balloon.style.animationDelay = `${Math.random() * 2.4}s`;
      balloon.addEventListener('click', () => {
        balloon.classList.add('pop');
        balloon.disabled = true;
        sounds.pop();
        later(() => balloon.remove(), 350);
      });
      party.appendChild(balloon);
    }
    later(() => party.remove(), 9000);
  }
  sounds.mega();

  // 2. Presentes em ordem guiada, baú dourado por último (spec §23-24).
  later(() => {
    const stage = layer('adv-stage');
    const wrap = document.createElement('div');
    wrap.className = 'adv-present-wrap';
    const hint = document.createElement('div');
    hint.className = 'adv-final-hint';
    hint.textContent = text(language, 'advFinalHint');
    const sequence = document.createElement('div');
    sequence.className = 'adv-seq';
    const dots = FINAL_STEPS.map((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'adv-seq-dot';
      dot.textContent = String(index + 1);
      sequence.appendChild(dot);
      return dot;
    });
    const prizeWrap = document.createElement('div');
    wrap.appendChild(hint);
    wrap.appendChild(sequence);
    wrap.appendChild(prizeWrap);
    stage.appendChild(wrap);

    const renderStep = (stepIndex) => {
      const step = FINAL_STEPS[stepIndex];
      dots.forEach((dot, index) => {
        dot.className = `adv-seq-dot${index < stepIndex ? ' done' : index === stepIndex ? ' current' : ''}`;
      });
      prizeWrap.replaceChildren();
      const isChest = Boolean(step.chest);
      const prize = document.createElement('button');
      prize.type = 'button';
      prize.className = isChest ? 'adv-chest glow' : 'adv-prize-icon';
      if (isChest) {
        prize.innerHTML = '<span class="adv-chest-lid"></span><span class="adv-chest-body"></span><span class="adv-chest-lock"></span>';
        prize.setAttribute('aria-label', text(language, 'advTapChest'));
      } else {
        prize.textContent = step.icon;
        prize.style.transform = `scale(${step.scale})`;
        if (step.rainbow) prize.classList.add('rainbow');
        prize.setAttribute('aria-label', text(language, 'advTapPresent'));
      }
      const instruction = document.createElement('div');
      instruction.className = 'adv-instruction';
      instruction.textContent = text(language, isChest ? 'advTapChest' : 'advPresentN', { n: stepIndex + 1, total: FINAL_STEPS.length });
      prizeWrap.appendChild(prize);
      prizeWrap.appendChild(instruction);

      let taps = 0;
      prize.addEventListener('click', () => {
        taps += 1;
        sounds.tap();
        prize.classList.remove('shake');
        void prize.offsetWidth;
        prize.classList.add('shake');
        if (taps < step.taps) return;
        prize.disabled = true;
        if (isChest) {
          prize.classList.add('open');
          sounds.mega();
          later(() => showCompletion(stage), 1200);
        } else {
          sounds.open();
          later(() => renderStep(stepIndex + 1), 900);
        }
      });
      prize.focus();
    };
    renderStep(0);
  }, reducedMotion ? 400 : 3000);

  // 3. Tela final: título arco-íris com sparkles + Return to Menu (spec §21).
  function showCompletion(stage) {
    stage.innerHTML = '';
    const box = document.createElement('div');
    box.className = 'adv-reveal';
    box.style.width = 'min(680px, 94vw)';
    const title = document.createElement('h2');
    title.className = 'adv-world-title';
    let letterIndex = 0;
    text(language, 'advWorldTitle').split(' ').forEach((word, wordIndex, words) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'adv-word';
      [...word].forEach((char) => {
        const letter = document.createElement('span');
        letter.textContent = char;
        letter.style.color = RAINBOW[letterIndex % RAINBOW.length];
        letterIndex += 1;
        wordSpan.appendChild(letter);
      });
      title.appendChild(wordSpan);
      if (wordIndex < words.length - 1) title.appendChild(document.createTextNode(' '));
    });
    for (let index = 0; index < 10; index += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'adv-sparkle';
      sparkle.textContent = '✨';
      sparkle.style.left = `${4 + Math.random() * 90}%`;
      sparkle.style.top = `${4 + Math.random() * 84}%`;
      sparkle.style.animationDelay = `${Math.random() * 1.5}s`;
      box.appendChild(sparkle);
    }
    const stats = document.createElement('p');
    stats.className = 'adv-final-stats';
    stats.textContent = `${explorerName} · ${text(language, 'advTasksCompleted', { n: tasksCompleted })}`;
    const returnButton = document.createElement('button');
    returnButton.type = 'button';
    returnButton.className = 'adv-return';
    returnButton.textContent = text(language, 'advReturnToMenu');
    returnButton.addEventListener('click', () => finish(true));
    box.appendChild(title);
    box.appendChild(stats);
    box.appendChild(returnButton);
    stage.appendChild(box);
    sounds.mega();
    returnButton.focus();
  }
}
