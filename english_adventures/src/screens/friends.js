// Galeria de amigos (spec §15): descobertos com retrato; não descobertos como
// silhuetas de mistério, com o mundo de origem.

import { el } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { asset } from '../assets.js';
import { FRIENDS, WORLDS } from '../story.js';

export function openFriendsGallery(root, context) {
  const { getState, language, onClose } = context;
  const state = getState();
  const overlay = el('div', 'ma-gallery');
  const panel = el('div', 'ma-gallery-panel');
  panel.appendChild(el('h2', 'ma-gallery-title', `🤝 ${uiText(language, 'friends')}${uiText(language, 'galleryTitle')}`));

  const grid = el('div', 'ma-gallery-grid');
  for (const friend of Object.values(FRIENDS)) {
    const discovered = state.friends.includes(friend.id);
    const world = WORLDS[friend.world];
    const card = el('div', `ma-gallery-card${discovered ? '' : ' mystery'}`);
    if (discovered) {
      const image = el('img');
      image.src = friend.id === 'maria' ? asset('sprite-maria') : asset(friend.asset);
      image.alt = lang(friend.name, language);
      card.appendChild(image);
      card.appendChild(el('div', 'ma-gallery-name', lang(friend.name, language)));
    } else {
      card.appendChild(el('div', 'ma-gallery-silhouette', '❓'));
      card.appendChild(el('div', 'ma-gallery-name', uiText(language, 'galleryLocked')));
    }
    card.appendChild(el('div', 'ma-gallery-world', `${world.emoji} ${lang(world.title, language)}`));
    card.addEventListener('click', () => {
      if (!discovered) return;
      sounds.tap();
      card.classList.toggle('flipped');
    });
    grid.appendChild(card);
  }
  panel.appendChild(grid);
  const close = el('button', 'ma-continue', uiText(language, 'back'));
  close.type = 'button';
  close.addEventListener('click', () => {
    sounds.tap();
    overlay.remove();
    onClose();
  });
  panel.appendChild(close);
  overlay.appendChild(panel);
  root.appendChild(overlay);
  return {
    destroy() {
      overlay.remove();
    },
  };
}
