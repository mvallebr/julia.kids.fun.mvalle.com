// Tela de título + escolha de personagem + introdução da história (spec §8/§32).

import { el, clearContainer, typewriter } from '../ui.js';
import { sounds } from '../audio.js';
import { uiText, lang } from '../i18n.js';
import { asset, preload } from '../assets.js';

export function openTitleScreen(root, context) {
  const { getState, setState, language, onPlay, onExit } = context;
  const state = getState();
  const screen = el('div', 'ma-title-screen');
  screen.style.backgroundImage = `url('${asset('bg-title')}')`;

  const card = el('div', 'ma-title-card');
  card.appendChild(el('h1', 'ma-title-logo', `✨ ${uiText(language, 'title')}`));
  card.appendChild(el('p', 'ma-title-subtitle', uiText(language, 'subtitle')));

  const buttons = el('div', 'ma-title-buttons');
  const hasJourney = Boolean(state.character);

  const playButton = el('button', 'ma-title-play', hasJourney ? `▶ ${uiText(language, 'continueJourney')}` : `▶ ${uiText(language, 'play')}`);
  playButton.type = 'button';
  playButton.addEventListener('click', () => {
    sounds.tap();
    if (hasJourney) onPlay();
    else showCharacterSelect();
  });
  buttons.appendChild(playButton);

  if (hasJourney) {
    const restart = el('button', 'ma-title-restart', uiText(language, 'newJourney'));
    restart.type = 'button';
    restart.addEventListener('click', () => {
      sounds.tap();
      setState((draft) => {
        // Recomeça a jornada mantendo som e idioma.
        draft.character = '';
        draft.worldId = '';
        draft.nodeIndex = 0;
        draft.worldStatus = {};
        draft.solved = {};
        draft.friends = [];
        draft.stickers = {};
        draft.badges = {};
        draft.collectibles = {};
        draft.presents = {};
        draft.storyCompleted = false;
        draft.celebrationViewed = false;
      });
      showCharacterSelect();
    });
    buttons.appendChild(restart);
  }

  const exit = el('button', 'ma-title-exit', uiText(language, 'exitToLauncher'));
  exit.type = 'button';
  exit.addEventListener('click', () => {
    sounds.tap();
    onExit();
  });
  buttons.appendChild(exit);
  card.appendChild(buttons);
  screen.appendChild(card);

  function showCharacterSelect() {
    clearContainer(screen);
    const select = el('div', 'ma-select');
    select.appendChild(el('h2', 'ma-select-title', uiText(language, 'chooseHero')));
    const options = el('div', 'ma-select-options');
    for (const hero of ['girl', 'boy']) {
      const option = el('button', `ma-select-hero ${hero}`);
      option.type = 'button';
      const image = el('img');
      image.src = asset(`sprite-${hero}`);
      image.alt = uiText(language, hero === 'girl' ? 'heroGirl' : 'heroBoy');
      option.appendChild(image);
      option.appendChild(el('span', null, uiText(language, hero === 'girl' ? 'heroGirl' : 'heroBoy')));
      option.addEventListener('click', () => {
        sounds.badge();
        setState((draft) => {
          draft.character = hero;
          draft.worldId = draft.worldId || '';
          draft.nodeIndex = draft.nodeIndex || 0;
        });
        showStoryIntro();
      });
      options.appendChild(option);
    }
    select.appendChild(options);
    screen.appendChild(select);
  }

  function showStoryIntro() {
    clearContainer(screen);
    preload(['bg-palace']);
    const intro = el('div', 'ma-story-intro');
    intro.appendChild(el('h2', 'ma-story-title', `🏰 ${uiText(language, 'storyIntroTitle')}`));
    const lines = ['storyIntro1', 'storyIntro2', 'storyIntro3'].map((key) => uiText(language, key));
    const paragraph = el('p', 'ma-story-line');
    intro.appendChild(paragraph);
    const begin = el('button', 'ma-continue hidden', `🚶 ${uiText(language, 'beginWalk')}`);
    begin.type = 'button';
    begin.addEventListener('click', () => {
      sounds.fanfare();
      onPlay();
    });
    intro.appendChild(begin);
    screen.appendChild(intro);

    let index = 0;
    let typer = null;
    const nextLine = () => {
      if (index >= lines.length) {
        paragraph.classList.add('done');
        begin.classList.remove('hidden');
        begin.focus();
        return;
      }
      typer = typewriter(paragraph, lines[index], 22);
      index += 1;
    };
    intro.addEventListener('click', () => {
      if (typer && !typer.finished) {
        typer.finish();
        return;
      }
      if (index >= lines.length) return;
      sounds.tap();
      nextLine();
    });
    nextLine();
  }

  root.appendChild(screen);
  return {
    destroy() {
      screen.remove();
    },
  };
}
