// Golden Palace (spec §20/§46): chegada, festa com os amigos descobertos,
// coroação de Rei/Rainha e teaser da próxima história. O payoff da Jornada 1.

import { el, confetti, burst } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { asset } from '../assets.js';
import { FRIENDS, WORLDS } from '../story.js';
import { completeStory } from '../state.js';

export function openPalaceFinale(root, context) {
  const { getState, setState, language, onFinish } = context;
  const state = getState();

  const screen = el('div', 'ma-finale');
  const bg = el('div', 'ma-world-bg');
  bg.style.backgroundImage = `url('${asset('bg-palace')}')`;
  screen.appendChild(bg);
  const character = el('div', `ma-character ${state.character || 'girl'} walking`);
  const sprite = el('img', 'ma-sprite');
  sprite.src = asset(`sprite-${state.character || 'girl'}`);
  sprite.alt = '';
  character.appendChild(sprite);
  screen.appendChild(character);
  const caption = el('div', 'ma-finale-caption', `🏰 ${uiText(language, 'worldIntro')} ${lang(WORLDS ? { pt: 'Palácio Dourado', en: 'Golden Palace' } : {}, language)}…`);
  screen.appendChild(caption);
  root.appendChild(screen);

  const timers = [];
  const later = (fn, delay) => timers.push(setTimeout(fn, delay));

  // 1) Caminhada espetacular até o portão (3s), depois a festa dentro.
  later(() => {
    character.style.left = '78%';
  }, 60);
  later(() => {
    bg.style.backgroundImage = `url('${asset('bg-hall')}')`;
    character.classList.add('hidden');
    caption.remove();
    celebrateInside();
  }, 4200);

  function celebrateInside() {
    confetti(240, 3200);
    sounds.mega();
    const hall = el('div', 'ma-hall');
    const title = el('h1', 'ma-hall-title', `👑 ${uiText(language, 'friendsCame')}`);
    hall.appendChild(title);

    // 2) Desfile dos amigos descobertos (spec §15: aparecem na celebração).
    const parade = el('div', 'ma-parade');
    const discovered = Object.values(FRIENDS).filter((friend) => state.friends.includes(friend.id));
    discovered.forEach((friend, index) => {
      const chip = el('div', 'ma-parade-friend');
      const image = el('img');
      image.src = friend.id === 'maria' ? asset('sprite-maria') : asset(friend.asset);
      image.alt = lang(friend.name, language);
      chip.appendChild(image);
      chip.appendChild(el('div', 'ma-parade-name', lang(friend.name, language)));
      parade.appendChild(chip);
      later(() => {
        chip.classList.add('arrived');
        sounds.path();
      }, 500 + index * 420);
    });
    hall.appendChild(parade);
    screen.appendChild(hall);

    // 3) Coroação (spec §20): Rei ou Rainha conforme o personagem.
    later(() => {
      sounds.fanfare();
      confetti(200, 2800);
      const isQueen = (getState().character || 'girl') === 'girl';
      const crown = el('div', 'ma-crowning');
      const crownArt = el('img', 'ma-crown-art');
      crownArt.src = asset('sticker-crown');
      crownArt.alt = uiText(language, isQueen ? 'queenTitle' : 'kingTitle');
      const crownTitle = el('div', 'ma-crown-title',
        `${uiText(language, isQueen ? 'queenTitle' : 'kingTitle')} ${uiText(language, 'crowned')}`);
      const crownText = el('p', 'ma-crown-text', uiText(language, 'crowningText'));
      crown.appendChild(crownArt);
      crown.appendChild(crownTitle);
      crown.appendChild(crownText);

      // Badge de fim de história (uma vez só, spec §41).
      setState((draft) => {
        completeStory(draft);
      });

      // 4) Teaser da próxima história (spec §46 finale) + fim.
      const teaser = el('p', 'ma-teaser', `✨ ${uiText(language, 'nextStoryTease')}`);
      const end = el('div', 'ma-the-end', `🌟 ${uiText(language, 'theEnd')} 🌟`);
      const done = el('button', 'ma-continue', uiText(language, 'playAgain'));
      done.type = 'button';
      done.addEventListener('click', (event) => {
        sounds.tap();
        const rect = done.getBoundingClientRect();
        burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 24);
        setState((draft) => { draft.celebrationViewed = true; });
        screen.remove();
        timers.forEach(clearTimeout);
        onFinish();
      });
      crown.appendChild(teaser);
      crown.appendChild(end);
      crown.appendChild(done);
      hall.appendChild(crown);
      done.focus();
    }, 500 + discovered.length * 420 + 900);
  }

  return {
    destroy() {
      timers.forEach(clearTimeout);
      screen.remove();
    },
  };
}
