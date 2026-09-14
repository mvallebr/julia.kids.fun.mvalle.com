// Presente surpresa (spec §14): aparece, a criança toca várias vezes, abre com
// animação e revela sticker/colecionável. A surpresa é parte da diversão.

import { el, burstAt, confetti } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { asset } from '../assets.js';

const REQUIRED_TAPS = 5;

// contents: [{ kind: 'sticker'|'collectible'|'badge', id, assetId?, emoji?, name? }]
export function openPresentFlow(host, language, contents, onClose) {
  const overlay = el('div', 'ma-present-overlay');
  const stage = el('div', 'ma-present-stage');
  const hint = el('div', 'ma-present-hint', uiText(language, 'tapPresent'));
  const present = el('button', 'ma-present');
  present.type = 'button';
  present.setAttribute('aria-label', uiText(language, 'tapPresent'));
  present.textContent = '🎁';
  stage.appendChild(present);
  stage.appendChild(hint);
  overlay.appendChild(stage);
  host.appendChild(overlay);

  let taps = 0;
  let opened = false;
  present.addEventListener('click', () => {
    if (opened) return;
    taps += 1;
    sounds.tap();
    present.classList.remove('shake');
    void present.offsetWidth;
    present.classList.add('shake');
    if (taps < REQUIRED_TAPS) {
      hint.textContent = `${uiText(language, 'keepTapping')} (${taps}/${REQUIRED_TAPS})`;
      return;
    }
    opened = true;
    present.classList.add('grow');
    reveal();
  });

  function reveal() {
    sounds.open();
    confetti(90, 1800);
    burstAt(present, 40);
    stage.innerHTML = '';
    const card = el('div', 'ma-reveal');
    card.appendChild(el('div', 'ma-reveal-title', uiText(language, 'presentFrom')));
    for (const content of contents) {
      const item = el('div', 'ma-reveal-item');
      if (content.assetId) {
        const image = el('img', 'ma-reveal-art');
        image.src = asset(content.assetId);
        image.alt = lang(content.name, language) || '';
        item.appendChild(image);
      } else {
        item.appendChild(el('span', 'ma-reveal-emoji', content.emoji || '✨'));
      }
      const label = el('div', 'ma-reveal-label');
      label.textContent = content.kind === 'sticker'
        ? `${uiText(language, 'rewardSticker')} ${lang(content.name, language)}`.trim()
        : lang(content.name, language) || uiText(language, 'rewardCollectible');
      item.appendChild(label);
      card.appendChild(item);
      if (content.kind === 'sticker') sounds.badge();
    }
    const done = el('button', 'ma-continue', uiText(language, 'continueJourney'));
    done.type = 'button';
    done.addEventListener('click', () => {
      sounds.tap();
      overlay.remove();
      onClose();
    });
    card.appendChild(done);
    stage.appendChild(card);
    done.focus();
  }
  return overlay;
}
