// The Word Quest — 7 capítulos da jornada ao Castle of a Million Words.
// Cada capítulo: história curta → 3 questões → evento → (documento de
// compreensão nos capítulos de leitura) → próximo capítulo.
// Questões são geradas por nextQuestion() com seleção adaptativa.

export const CHAPTERS = [
  {
    id: 'whispering-forest',
    name: 'Whispering Forest',
    emoji: '🌲',
    bg: 'loc-forest',
    band: 'easy',
    story: [
      'The journey begins at the edge of the Whispering Forest. The trees murmur old words, and golden eyes blink between the roots.',
      'An owl lands on a mossy post and tilts its head. “The forest tests every traveller with words. Answer, and the path will open.”',
    ],
    questions: 3,
    skills: ['synonyms', 'antonyms', 'vocabulary context'],
    special: { type: 'chest' },
    milestone: null,
  },
  {
    id: 'misty-bridge',
    name: 'The Misty Bridge',
    emoji: '🌉',
    bg: 'loc-bridge',
    band: 'easy',
    story: [
      'A grand stone bridge appears between two cliffs, hidden by silver mist. Lanterns hang along its railing, unlit.',
      'The owl swoops beside you. “The mist hides the way. Answer, and each lantern will light your path.”',
    ],
    questions: 3,
    skills: ['vocabulary context', 'synonyms', 'analogies'],
    special: null,
    milestone: { name: 'The Misty Bridge crossed', gold: 500 },
  },
  {
    id: 'ravenmoor',
    name: 'Ravenmoor Village',
    emoji: '🏘️',
    bg: 'loc-village',
    band: 'medium',
    story: [
      'Ravenmoor Village sleeps under a blanket of stars. Lantern light glows in the inn windows, and a notice board creaks in the square.',
      'One notice, newer than the rest, is sealed with a purple raven. The village elder guards its words carefully…',
    ],
    questions: 5,
    doc: {
      title: 'Ravenmoor Village Notice',
      frame: 'A notice pinned to the village board, written in careful handwriting:',
      text: `NOTICE TO ALL TRAVELLERS

The Harvest Fair will open on Saturday at the village square, beginning at midday. This year, for the first time, visitors may enter the Great Riddle Tent.

Please remember: the old bridge across the moor was damaged in the spring storms. Travellers heading east must use the mill road until repairs are finished. The mill road is longer, but it is safe for carts and walkers alike.

Ravenmoor's market opens at sunrise on market days. Farmers who wish to sell wool or honey should speak to the reeve before Friday evening. Late entries cannot be accepted, as the stalls are counted on Thursday.`,
      questions: [
        { q: 'When does the Harvest Fair open?', o: ['Saturday at midday', 'Friday evening', 'Sunrise on Saturday', 'Sunday morning'], a: 0, why: 'The notice says the fair opens on Saturday at midday.', skill: 'explicit retrieval' },
        { q: 'Why must travellers heading east use the mill road?', o: ['The old bridge was damaged by storms', 'The mill road is shorter', 'The bridge is closed on Saturdays', 'Trolls guard the old bridge'], a: 0, why: 'The old bridge was damaged in the spring storms.', skill: 'explicit retrieval' },
        { q: 'What does the notice say about the mill road?', o: ['It is shorter but muddy', 'It is longer but safe', 'It is closed to carts', 'It opens at sunrise'], a: 1, why: 'It is longer, but safe for carts and walkers alike.', skill: 'explicit retrieval' },
        { q: 'Who should speak to the reeve before Friday evening?', o: ['Visitors entering the riddle tent', 'Farmers selling wool or honey', 'Travellers going east', 'Anyone staying at the inn'], a: 1, why: 'Farmers selling wool or honey must speak to the reeve before Friday evening.', skill: 'explicit retrieval' },
        { q: 'Why can late market entries not be accepted?', o: ['The stalls are counted on Thursday', 'The reeve leaves on Friday', 'The fair closes on Friday', 'Farmers arrive on Saturday'], a: 0, why: 'The stalls are counted on Thursday, so late entries cannot be included.', skill: 'inference' },
      ],
    },
    milestone: { name: 'Ravenmoor Village', gold: 2000 },
  },
  {
    id: 'crystal-caves',
    name: 'The Crystal Caves',
    emoji: '💎',
    bg: 'loc-caves',
    band: 'medium',
    story: [
      'Blue crystals light the caves like frozen starlight. Somewhere deep inside, a wandering wizard taps his staff on the stone.',
      '“Words unlock crystals,” the wizard says. “Choose wisely, traveller.”',
    ],
    questions: 3,
    skills: ['word relationships', 'analogies', 'verbal logic'],
    special: { type: 'wizard', gold: 500 },
    milestone: null,
  },
  {
    id: 'forgotten-library',
    name: 'The Forgotten Library',
    emoji: '📚',
    bg: 'loc-library',
    band: 'hard',
    story: [
      'The Forgotten Library has waited a hundred years for a reader. Moonlight falls through the broken dome, and on a desk lies an explorer’s diary, its pages whispering to be opened.',
      'The door out of the library is sealed with seven glowing symbols. Each answer lights one of them…',
    ],
    questions: 7,
    doc: {
      title: 'The Explorer’s Diary — final page',
      frame: 'An open diary, its last page written in shaky but careful letters:',
      text: `Day 41. I finally reached the library that the map promised, and I confess my hands were shaking — not from fear, but from hope.

The scholars who built this place believed that words were worth more than gold. They carved it above the door: "Gold can be stolen; what you learn cannot." I used to laugh at such sayings. I don't any more.

I have spent three days among these shelves. The books taught me how to read the stars, how to find water, and how the castle gates open for those who can prove they are ready. I have copied everything into this diary, because paper remembers what people forget.

Tomorrow I leave for the castle. I will leave this diary behind, in case another traveller needs what I needed: proof that the path is real, and that reading — patient, stubborn reading — is the key that opens every door here.

— E. Vane, explorer`,
      questions: [
        { q: 'Why were the explorer’s hands shaking?', o: ['From fear of the library', 'From hope and excitement', 'Because it was cold', 'From carrying books'], a: 1, why: 'She confesses her hands shook “not from fear, but from hope”.', skill: 'inference' },
        { q: 'What is carved above the library door?', o: ['“Reading is the key”', '“Gold can be stolen; what you learn cannot.”', '“Welcome, traveller.”', 'The explorer’s name'], a: 1, why: 'The scholars carved that saying above the door.', skill: 'explicit retrieval' },
        { q: 'How did the explorer’s view of sayings change?', o: ['She never trusted sayings', 'She used to laugh at them, but stopped', 'She collected sayings', 'She wrote her own sayings'], a: 1, why: 'She admits she used to laugh at such sayings — she doesn’t any more.', skill: 'inference' },
        { q: 'Why did the explorer copy everything into her diary?', o: ['To sell the books later', 'Because “paper remembers what people forget”', 'To give the diary to the scholars', 'Because her map was destroyed'], a: 1, why: 'She copies it down so the knowledge is not forgotten.', skill: 'explicit retrieval' },
        { q: 'What does “stubborn reading” suggest about how she succeeded?', o: ['She read quickly', 'She refused to give up on difficult texts', 'She had many books', 'She only read easy pages'], a: 1, why: '“Patient, stubborn reading” suggests refusing to give up on hard texts.', skill: 'vocabulary in context' },
        { q: 'Why did she leave the diary behind?', o: ['She had finished writing it and hoped to help the next traveller', 'The scholars ordered her to', 'It belonged to the library', 'She lost it by accident'], a: 0, why: 'She leaves it “in case another traveller needs what I needed”.', skill: 'inference' },
        { q: 'Which sentence best describes the diary’s main idea?', o: ['Libraries are dangerous places', 'The castle gates never open', 'Learning is a treasure that opens every door', 'Explorers should travel alone'], a: 2, why: 'The diary’s central message is that patient learning is the real key to the journey.', skill: 'main idea' },
      ],
    },
    milestone: { name: 'The Forgotten Library', gold: 10000 },
  },
  {
    id: 'dragons-peak',
    name: 'Dragon’s Peak',
    emoji: '🐉',
    bg: 'loc-peak',
    band: 'very hard',
    story: [
      'Dragon’s Peak burns against the stars. A dragon circles the summit, wings like glowing embers, guarding the last stretch of the road.',
      'It lands before you, curious rather than cruel. “Answer three of my riddles,” it rumbles, “and I will bow to a braver mind than mine.”',
    ],
    questions: 3,
    skills: ['vocabulary context', 'verbal logic', 'inference'],
    special: { type: 'dragon', hearts: 3 },
    milestone: { name: 'Dragon’s Peak', gold: 50000 },
  },
  {
    id: 'castle',
    name: 'The Castle of a Million Words',
    emoji: '🏰',
    bg: 'loc-castle',
    band: 'very very hard',
    story: [
      'The Castle of a Million Words opens its gates. Golden banners ripple, and the final challenge waits inside the Great Hall, carved into the stone archway:',
      '“Only a true Champion of Words may pass. Read. Think. Choose the answer that is best supported — and the castle is yours.”',
    ],
    questions: 6,
    doc: {
      title: 'The Gateway Inscription',
      frame: 'Carved into the castle archway, the words every visitor must understand:',
      text: `As the last coach disappeared beyond the hill, Norah remained perfectly still on the platform of her family's busy station. For twenty years she had swept its floors, sold its tickets and memorised its timetables, and for twenty years the travellers had called her "our Norah", as if she belonged to the railway itself.

Her sister wrote every week from the capital, urging her to come and live in a house with carpets and a garden, where no whistles broke the morning silence.

At last the letter she had been waiting for arrived: the station was to be closed, and Norah was free.

Free. She read the word four times, folded the letter in half, and went to sweep the platform.`,
      questions: [
        { q: 'What was the station to Norah?', o: ['A place she disliked', 'Her whole life and identity', 'A recent arrival', 'A small part of her days'], a: 1, why: 'Sweeping, selling and memorising for twenty years — “as if she belonged to the railway itself”.', skill: 'inference' },
        { q: 'What did her sister’s letters urge her to do?', o: ['Work harder at the station', 'Leave and live with her in the capital', 'Buy a house near the station', 'Learn to whistle'], a: 1, why: 'Her sister urged her to come and live in a house with carpets and a garden.', skill: 'explicit retrieval' },
        { q: 'What does the word "free" most nearly mean here?', o: ['Not costing anything', 'Released from work she loved', 'No longer employed at the station', 'Able to travel anywhere'], a: 2, why: 'The station was closing, so she would no longer work there.', skill: 'vocabulary in context' },
        { q: 'Why does the narrator say she read the word four times?', o: ['She could not read well', 'The news was difficult to take in', 'The letter was badly written', 'She was checking for mistakes'], a: 1, why: 'Reading it four times suggests the news overwhelmed her.', skill: 'inference' },
        { q: 'What does "went to sweep the platform" reveal about Norah?', o: ['She had forgotten the letter', 'She could not imagine a life away from the station', 'The station needed one last clean', 'She was angry at her sister'], a: 1, why: 'Her immediate return to her routine shows the station is her whole life.', skill: 'inference' },
        { q: 'Which statement is BEST supported by the inscription?', o: ['Norah was unhappy at the station', 'Norah’s freedom felt more like a loss', 'Norah’s sister disliked the railway', 'The station closed because of Norah'], a: 1, why: '“Free” folded away and the sweeping that follows suggest the “freedom” feels like losing her identity.', skill: 'inference' },
      ],
    },
    milestone: { name: 'The Castle of a Million Words', gold: 1000000 },
  },
];
