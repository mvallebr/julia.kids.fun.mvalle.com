// SPaG — gramática, pontuação e estrutura de frases.
// Par de frases [correta, corrompida]: a questão pede a frase correta e os
// distratores são versões corrompidas por regras reais (não erros bobos).

export const SPAG_PAIRS = [
  // its / it's — tier 1
  { tier: 1, skill: 'punctuation', rule: "it's = it is",
    correct: "It's raining, so the picnic is inside.",
    wrong: ["Its raining, so the picnic is inside.", "It's raining, so the picnic is inside it's basket.", "Its' raining, so the picnic is inside."] },
  // there / their / they're — tier 1
  { tier: 1, skill: 'grammar', rule: 'there / their / they’re',
    correct: 'They left their coats over there.',
    wrong: ['They left there coats over they’re.', 'They left they’re coats over their.', 'They left their coats over they’re.'] },
  // capital + full stop — tier 1
  { tier: 1, skill: 'punctuation', rule: 'capital letter and full stop',
    correct: 'The owl woke at midnight.',
    wrong: ['the owl woke at midnight', 'The owl woke at midnight', 'the Owl woke at Midnight.'] },
  // was/were — tier 2
  { tier: 2, skill: 'grammar', rule: 'was / were agreement',
    correct: 'The dragons were dozing on the warm rocks.',
    wrong: ['The dragons was dozing on the warm rocks.', 'The dragons were dozing on the warm rock it shared.', 'A dragons were dozing on the warm rocks.'] },
  // question mark — tier 2
  { tier: 2, skill: 'punctuation', rule: 'question mark',
    correct: 'Why did the knight climb the tower?',
    wrong: ['Why did the knight climb the tower.', 'Why did the knight climb the tower!', 'why did the knight climb the tower?'] },
  // comma in a list — tier 3
  { tier: 3, skill: 'punctuation', rule: 'commas in a list',
    correct: 'We packed apples, pears, plums and grapes.',
    wrong: ['We packed apples pears plums and grapes.', 'We packed, apples pears, plums and grapes.', 'We packed apples, pears, plums, and, grapes.'] },
  // past tense consistency — tier 3
  { tier: 3, skill: 'grammar', rule: 'tense agreement',
    correct: 'Maya found the key and opened the door.',
    wrong: ['Maya found the key and opens the door.', 'Maya finds the key and opened the door.', 'Maya found the key and will open the door.'] },
  // apostrophe of possession — tier 4
  { tier: 4, skill: 'punctuation', rule: 'apostrophe for possession',
    correct: "The fox's cubs slept in a hollow log.",
    wrong: ['The foxs cubs slept in a hollow log.', "The foxes cub's slept in a hollow log.", 'The fox cubs slept in a hollow log.'] },
  // pronoun agreement — tier 4
  { tier: 4, skill: 'grammar', rule: 'pronoun agreement',
    correct: 'Every dragon guarded its own hoard.',
    wrong: ['Every dragon guarded their own hoard.', 'Every dragon guarded they own hoard.', 'Every dragons guarded its own hoard.'] },
  // fronted adverbial comma — tier 5
  { tier: 5, skill: 'punctuation', rule: 'comma after a fronted adverbial',
    correct: 'Without a sound, the cat slipped through the gate.',
    wrong: ['Without a sound the cat slipped through the gate.', 'Without a sound, The cat slipped through the gate.', 'Without, a sound the cat slipped through the gate.'] },
  // subject–verb agreement — tier 5
  { tier: 5, skill: 'grammar', rule: 'subject–verb agreement',
    correct: 'A flock of starlings was wheeling over the field.',
    wrong: ['A flock of starlings were wheeling over the field.', 'A flock of starlings is wheeling over the fields yesterday.', 'A flock of starling was wheeling over the field.'] },
  // sentence boundary (fragment) — tier 6
  { tier: 6, skill: 'sentence structure', rule: 'complete sentence',
    correct: 'Because the bridge had washed away, we took the long path.',
    wrong: ['Because the bridge had washed away.', 'We took the long path, because the bridge.', 'The bridge had washed away, we took the long path.'] },
  // who/whom style choice — tier 6
  { tier: 6, skill: 'grammar', rule: 'who / whom',
    correct: 'To whom should I address the letter?',
    wrong: ['To who should I address the letter?', 'To whom should I address the letter', 'To whom should I addressed the letter?'] },
  // semicolon join — tier 7
  { tier: 7, skill: 'punctuation', rule: 'semicolon between clauses',
    correct: 'The storm passed at dawn; the harbour was littered with wreckage.',
    wrong: ['The storm passed at dawn, the harbour was littered with wreckage.', 'The storm passed at dawn; and the harbour was littered with wreckage.', 'The storm passed at dawn; the harbour, was littered with wreckage.'] },
  // passive vs active — tier 7
  { tier: 7, skill: 'grammar', rule: 'passive voice',
    correct: 'The trophies were engraved by the harbourmaster.',
    wrong: ['The trophies was engraved by the harbourmaster.', 'The trophies engraved by the harbourmaster were trophies.', 'The harbourmaster were engraved by the trophies.'] },
  // misplaced modifier — tier 8
  { tier: 8, skill: 'sentence structure', rule: 'misplaced modifier',
    correct: 'We watched the dolphins from the clifftop with great excitement.',
    wrong: ['We watched from the clifftop the dolphins with the dolphins.', 'We, watching the dolphins from the clifftop, great excitement.', 'We watched the clifftop from the dolphins with excitement.'] },
  // subjunctive — tier 9
  { tier: 9, skill: 'grammar', rule: 'subjunctive “were”',
    correct: 'If the tide were lower, we could cross to the island.',
    wrong: ['If the tide was lower, we could cross to the island.', 'If the tide be lower, we could have cross to the island.', 'If the tide would been lower, we could cross to the island.'] },
  // dash for afterthought — tier 10
  { tier: 10, skill: 'punctuation', rule: 'dash for an afterthought',
    correct: 'The map was useless — every landmark it showed had vanished.',
    wrong: ['The map was useless, every landmark it showed had vanished.', 'The map was useless; every landmark it showed had vanished it.', 'The map was useless -; every landmark it showed had vanished.'] },
  // contraction vs possession — tier 11
  { tier: 11, skill: 'punctuation', rule: 'contraction vs possession',
    correct: "The crew's decision couldn't be undone.",
    wrong: ["The crews' decision couldn't of been undone.", "The crew's decision could'nt be undone.", "The crews decision's couldn't be undone."] },
  // clauses — tier 12
  { tier: 12, skill: 'sentence structure', rule: 'subordinate clause placement',
    correct: 'The expedition, exhausted but triumphant, finally reached the ridge.',
    wrong: ['The expedition exhausted, but triumphant finally reached the, ridge.', 'The expedition, exhausted but triumphant finally, reached the ridge.', 'The expedition exhausted but, triumphant, finally reached the ridge.'] },
];

// perguntas de SPaG estilo Quest: "Qual frase está escrita corretamente?"
export function spagQuestion(tier, rng) {
  const bandSize = 3;
  const near = SPAG_PAIRS.filter((pair) => Math.abs(pair.tier - tier) <= bandSize);
  const list = near.length ? near : SPAG_PAIRS;
  const pair = list[Math.floor(rng() * list.length)];
  const options = [];
  const correctIndex = Math.floor(rng() * 4);
  let wrongIndex = 0;
  for (let index = 0; index < 4; index += 1) {
    if (index === correctIndex) options.push({ text: pair.correct, correct: true });
    else options.push({ text: pair.wrong[wrongIndex++ % pair.wrong.length], correct: false });
  }
  const letters = ['A', 'B', 'C', 'D'];
  options.forEach((option, index) => { option.letter = letters[index]; });
  return {
    skill: pair.skill,
    tier,
    band: tier <= 3 ? 'easy' : tier <= 6 ? 'medium' : tier <= 9 ? 'hard' : tier <= 12 ? 'very hard' : 'very very hard',
    kind: 'choice',
    prompt: `Choose the sentence that is written correctly. (${pair.rule})`,
    display: null,
    options,
    explanation: `Rule — ${pair.rule}: "${pair.correct}"`,
    source: 'generated',
  };
}
