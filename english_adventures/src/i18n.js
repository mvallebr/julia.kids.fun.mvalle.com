// Textos de interface do English Adventures.
// O jogo ensina inglês: a interface é sempre no idioma-alvo (inglês),
// mantendo a mesma assinatura de API do site (uiText/language).

const COPY = {
  title: 'English Adventures',
  subtitle: 'A reading adventure along the Golden Path ✨',
  play: 'Play',
  continueJourney: 'Continue adventure',
  newJourney: 'Start over',
  chooseHero: 'Who will live this adventure?',
  heroGirl: 'Adventuress',
  heroBoy: 'Adventurer',
  map: 'Kingdom map',
  friends: 'Friends',
  back: 'Back',
  backToMap: 'Back to map',
  locked: 'Locked',
  completed: 'Complete!',
  tapToContinue: 'tap to continue',
  walkHint: ' 🔍 tap to explore',
  continuePath: 'Follow the path',
  collectTapped: 'Collected',
  correct: 'Correct!',
  wellDone: 'Well done!',
  awesome: 'Brilliant!',
  tryAgain: 'Almost! Try again.',
  keepTrying: 'Good try — look again.',
  superClose: 'You were so close!',
  worldComplete: 'World complete!',
  nextWorld: 'Next world',
  continueLater: 'Continue later',
  galleryTitle: ' friends gallery',
  galleryLocked: '???',
  galleryHintLocked: 'Keep adventuring to meet',
  kingTitle: 'King',
  queenTitle: 'Queen',
  crowned: 'of the Adventure',
  crowningText: 'You were brave, read widely and solved every challenge. The whole Academy celebrates you!',
  friendsCame: 'Your friends came from every world to celebrate!',
  nextStoryTease: 'Far away, a new path begins to shine… A new story awaits you.',
  theEnd: 'End of Story 1',
  playAgain: 'Back to map',
  worldIntro: 'The',
  storyBadge: 'Hero of the Golden Path',
  scoring: 'Challenges solved',
  rewardBadge: 'New badge!',
  muteTitle: 'Toggle sounds',
  exitToLauncher: 'Menu',
  storyIntroTitle: '🏰 The Tale of the Golden Academy',
  storyIntro1: 'Far away, the Golden Academy is preparing the greatest celebration of all…',
  storyIntro2: 'They say only careful readers and brave word-hunters may enter.',
  storyIntro3: 'A path of golden sparkles appears at your feet. Where will it take you?',
  beginWalk: 'Follow the golden path!',
  errorFatal: 'Oops! Something went wrong. Reload the page to continue your adventure.',
  questSolved: 'Solve {n} challenges',
  questMeet: 'Meet {n} friends',
  questPresents: 'Open {n} presents',
  questCollect: 'Collect {n} {item}',
  storyBadge: 'Hero of the Golden Path',
  loading: 'Loading the adventure…',
};

export function uiText(_language, key, vars = {}) {
  let value = COPY[key] ?? key;
  for (const [name, replacement] of Object.entries(vars)) {
    value = value.replaceAll(`{${name}}`, replacement);
  }
  return value;
}

export function lang(value) {
  if (value && typeof value === 'object') return value.en ?? value.pt ?? '';
  return value ?? '';
}

export const LANGUAGES = ['en'];
