// i18n do The Word Quest: interface em inglês (idioma-alvo do Bexley).

const COPY = {
  title: 'The Word Quest',
  tagline: 'Knowledge opens new worlds',
  play: 'Begin the Quest',
  continueJourney: 'Continue Your Quest',
  newRun: 'New Run',
  journal: 'Word Journal',
  exitToLauncher: 'Menu',
  beginChallenge: 'Begin Challenge',
  lockIn: 'Lock in this answer',
  locked: 'Answer locked…',
  correct: 'Correct!',
  wellDone: 'Well done!',
  brilliant: 'Brilliant!',
  exactly: 'Exactly!',
  wrong: 'Not this time.',
  fiftyFifty: '50/50',
  fiftyFiftyDesc: 'Remove two wrong answers',
  askFamily: 'Ask the Family',
  askFamilyDesc: 'Get a suggestion from someone at home',
  askOwl: 'Ask the Owl',
  askOwlDesc: 'Hoots a helpful clue',
  giveClue: 'Give Me a Clue',
  giveClueDesc: 'A hint about the word or context',
  swap: 'Swap Question',
  swapDesc: 'Try a different question (same value)',
  close: 'Close',
  askFamilyPause: 'Pause here and ask someone playing with you what they think. Then choose your final answer!',
  owlIntro: 'The owl hoots softly: ',
  milestoneSecured: 'Milestone secured',
  journalTitle: 'My Word Journal',
  masteryNew: 'New',
  masterySeen: 'Seen',
  masteryLearning: 'Learning',
  masteryStrong: 'Strong',
  masteryMastered: 'Mastered',
  dragonChallenge: 'Dragon Challenge',
  dragonDesc: 'Answer three questions to send the dragon soaring!',
  treasureTitle: 'A treasure! Choose one chest',
  merchantTitle: 'A wandering wizard',
  merchantOffer: 'For {n} gold, I will reveal a clue about the next challenge.',
  accept: 'Accept',
  keepGold: 'Keep my gold',
  clueReceived: 'Clue received',
  worldComplete: 'World complete!',
  nextWorld: 'Next world',
  continueLater: 'Continue later',
  scoring: 'Challenges solved',
  rewardBadge: 'New badge!',
  runSummary: 'Today’s Adventure',
  questionsAnswered: 'questions answered',
  correctCount: 'correct',
  wordsDiscovered: 'new words discovered',
  goldEarned: 'gold earned',
  castleReached: 'You reached the Castle of a Million Words!',
  castleText: 'Every answer, every word and every brave decision brought you here. The Castle of a Million Words crowns you its Champion of Words!',
  champion: 'Champion of Words',
  playAgain: 'Play again',
  keepGoing: 'Keep Going',
  unlocked: 'unlocked',
  errorFatal: 'Oops! Something went wrong. Reload the page to continue the quest.',
};

export function uiText(_lang, key, vars = {}) {
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
