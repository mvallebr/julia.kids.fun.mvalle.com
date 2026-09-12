import { ensureAdventureStyles } from './styles.js';

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
      showReveal(stage);
    };
    present.addEventListener('click', () => {
      taps += 1;
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
    continueButton.focus();
  }

  return finish;
}
