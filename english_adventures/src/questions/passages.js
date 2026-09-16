// Compreensão de leitura — 15 passagens originais (ficção e não-ficção),
// uma por mundo, com 7 questões Quest-style cada (recuperação → inferência
// → intenção autoral, conforme a faixa de dificuldade).
// Formato da questão: { q, o (opções), a (índice correto), why, skill }

export const PASSAGES = [
  // ── 1. Storybook Meadow (Easy) ──
  {
    tier: 1, title: 'The Lighthouse Kitten', kind: 'fiction',
    text: `Misty the kitten lived with Old Tom in the lighthouse on Cormorant Rock. Every evening, while Tom climbed the winding stairs to light the great lamp, Misty sat on the windowsill and watched the waves.
One stormy night, the wind blew the lighthouse door open. Misty slipped out onto the rocky ledge. Below her, the sea crashed and hissed. She was just about to jump when Old Tom's warm hand scooped her up.
"Silly kitten," he chuckled. "The lamp needs you here, keeping me company." From that night on, Misty watched the storm from the windowsill, safe and warm.`,
    questions: [
      { q: 'Where did Misty live?', o: ['In a fishing boat', 'In a lighthouse', 'In a castle', 'In a barn'], a: 1, why: 'The passage says Misty lived with Old Tom in the lighthouse.', skill: 'retrieval' },
      { q: 'What did Old Tom do every evening?', o: ['Fished for cod', 'Lit the great lamp', 'Fixed the boats', 'Fed the gulls'], a: 1, why: 'The text says he climbed the stairs to light the great lamp.', skill: 'retrieval' },
      { q: 'What was the weather like on the stormy night?', o: ['Snowy and still', 'Sunny and calm', 'Windy and wild', 'Foggy and quiet'], a: 2, why: 'The wind blew the door open and the sea crashed — it was windy and wild.', skill: 'retrieval' },
      { q: 'Who stopped Misty from jumping?', o: ['A fisherman', 'Another kitten', 'Old Tom', 'Nobody'], a: 2, why: 'Old Tom’s warm hand scooped her up just in time.', skill: 'retrieval' },
      { q: 'What does "scooped" suggest about how Tom picked Misty up?', o: ['Slowly and carefully', 'Quickly, in one movement', 'Roughly, by the tail', 'With a rope'], a: 1, why: 'To scoop is to lift quickly in one curved movement of the hand.', skill: 'vocabulary in context' },
      { q: 'Where did Misty sit to watch the waves?', o: ['On the lamp', 'On the windowsill', 'On the rocks', 'On the roof'], a: 1, why: 'The passage says Misty sat on the windowsill every evening.', skill: 'retrieval' },
      { q: 'How did Misty feel at the end of the story?', o: ['Safe and warm', 'Lost and alone', 'Angry with Tom', 'Still outside'], a: 0, why: 'The last line says she watched from the windowsill, safe and warm.', skill: 'retrieval' },
    ],
  },
  // ── 2. Rhyme River (Easy) ──
  {
    tier: 1, title: 'Robins in Winter', kind: 'non-fiction',
    text: `Robins are easy to spot in winter. Their red chests stand out against the snow. But life is hard for a small bird when the days are short and the ground is hard.
Robins must eat almost all day to stay warm. They hunt for worms, seeds and berries. A robin can lose a tenth of its body weight in one cold night, so every berry counts.
In winter, robins often follow gardeners. When a spade turns the soil, it uncovers worms — an easy meal! That is why the robin is known as the gardener's friend.`,
    questions: [
      { q: 'What stands out against the snow?', o: ['The robin’s red chest', 'A yellow flower', 'The gardener’s spade', 'A berry bush'], a: 0, why: 'The passage says robins’ red chests stand out against the snow.', skill: 'retrieval' },
      { q: 'Why is winter hard for robins?', o: ['Days are short and food is hard to find', 'Other birds chase them away', 'They cannot fly in cold air', 'Their feathers turn white'], a: 0, why: 'The days are short and the ground is hard, so food is difficult to find.', skill: 'retrieval' },
      { q: 'What do robins eat?', o: ['Only berries', 'Worms, seeds and berries', 'Bread from gardens', 'Small fish'], a: 1, why: 'They hunt for worms, seeds and berries.', skill: 'retrieval' },
      { q: 'How much weight can a robin lose in one cold night?', o: ['None at all', 'A tenth of its body weight', 'Half of its body weight', 'All of its feathers'], a: 1, why: 'The passage says a robin can lose a tenth of its body weight overnight.', skill: 'retrieval' },
      { q: 'Why do robins follow gardeners?', o: ['They like the spade’s colour', 'Digging uncovers worms', 'Gardeners sing to them', 'Gardens are warmer'], a: 1, why: 'A spade turning the soil uncovers worms — an easy meal.', skill: 'retrieval' },
      { q: 'What does the robin’s nickname tell us?', o: ['It sleeps in gardens', 'It helps gardeners by finding pests', 'It is afraid of people', 'It only lives in winter'], a: 1, why: 'It is called the gardener’s friend because it feeds where gardeners dig.', skill: 'inference' },
      { q: 'Which sentence is TRUE?', o: ['Robins hibernate all winter', 'Robins only eat in the morning', 'Robins must eat almost all day to stay warm', 'Robins fly south every autumn'], a: 2, why: 'The passage says robins must eat almost all day to stay warm.', skill: 'retrieval' },
    ],
  },
  // ── 3. Lantern Library (Easy) ──
  {
    tier: 1, title: 'The Sandcastle Contest', kind: 'fiction',
    text: `Every summer, the little town of Sandsend held a sandcastle contest. Priya had been building castles since she was three, and this year she wanted to win the golden spade.
She arrived early and chose a spot near the rock pools. First she packed wet sand into tall towers. Next she carved a wide moat around them. Then, from a shell, she made a tiny flag for the top.
Just before judging, a wave slipped past the rocks and filled her moat. Priya held her breath — but the water only made her towers shine. The judges gave her the golden spade for "the strongest castle on the beach."`,
    questions: [
      { q: 'What was the prize for the contest?', o: ['A golden spade', 'A silver bucket', 'A trip to the rock pools', 'A new towel'], a: 0, why: 'Priya wanted to win the golden spade.', skill: 'retrieval' },
      { q: 'Where did Priya build her castle?', o: ['Near the ice-cream shop', 'Near the rock pools', 'In the middle of the town', 'On the harbour wall'], a: 1, why: 'She chose a spot near the rock pools.', skill: 'retrieval' },
      { q: 'Which of these did Priya do FIRST?', o: ['Carved a moat', 'Made a shell flag', 'Packed sand towers', 'Called the judges'], a: 2, why: 'First she packed wet sand into tall towers.', skill: 'retrieval' },
      { q: 'What did the wave do?', o: ['Knocked the towers down', 'Filled her moat', 'Washed her flag away', 'Wet the judges'], a: 1, why: 'A wave slipped past the rocks and filled her moat.', skill: 'retrieval' },
      { q: 'Why did Priya hold her breath?', o: ['She was tired', 'She was worried about her castle', 'She was underwater', 'She was laughing'], a: 1, why: 'She worried the wave had ruined her castle.', skill: 'inference' },
      { q: 'Why did the water make her towers shine instead of fall?', o: ['She had packed the sand tightly', 'The wave was very small', 'The judges helped her', 'The shell protected them'], a: 0, why: 'Wet, tightly packed sand holds together — the towers only glistened.', skill: 'inference' },
      { q: 'What does "judging" mean here?', o: ['Tidying the beach', 'Deciding the winner', 'Building the castles', 'Selling ice cream'], a: 1, why: 'The judges decide which castle wins the contest.', skill: 'vocabulary in context' },
    ],
  },
  // ── 4. Whispering Woods (Medium) ──
  {
    tier: 4, title: 'The Night Mail Boat', kind: 'fiction',
    text: `The mail boat left the harbour at midnight, when the tourists were asleep. Eilidh's grandfather steered it, and twice a month she was allowed to go with him.
The islanders never saw the boat arrive, but every morning there were signs of it: a bundle of newspapers on the shop step, a parcel of wool at the knitting shed, a brown envelope pushed deep through the surgery letterbox.
"Delivering post is like sowing seeds," her grandfather said. "You drop it quietly and let it grow into good news, or bad, when the sun comes up."
Eilidh loved the way the island woke to surprises. She started leaving her own signs too: a drawn picture taped to a door, a ribbon on a gate. Nobody knew who left them. She never told, not even her grandfather.`,
    questions: [
      { q: 'Why did the mail boat leave at midnight?', o: ['The sea is calmer at night', 'The tourists were asleep', 'The engine only worked at night', 'Grandfather liked the dark'], a: 1, why: 'It left at midnight, when the tourists were asleep.', skill: 'retrieval' },
      { q: 'How often was Eilidh allowed on the boat?', o: ['Every night', 'Once a year', 'Twice a month', 'Only in summer'], a: 2, why: 'Twice a month she was allowed to go with him.', skill: 'retrieval' },
      { q: 'What did the islanders find in the mornings?', o: ['Nothing at all', 'Signs the mail had come', 'Fish on their doorsteps', 'The boat at the harbour'], a: 1, why: 'Newspapers, parcels and envelopes appeared each morning.', skill: 'inference' },
      { q: 'What did Eilidh’s grandfather compare delivering post to?', o: ['Sowing seeds', 'Sailing a race', 'Lighting lamps', 'Telling stories'], a: 0, why: 'He said delivering post is like sowing seeds.', skill: 'retrieval' },
      { q: 'What did he mean by "let it grow into good news, or bad"?', o: ['The post was planted in gardens', 'Letters can carry happy or sad news', 'Seeds grew inside the envelopes', 'News grew on the island’s trees'], a: 1, why: 'He meant letters — like seeds — bring news that people discover later, happy or sad.', skill: 'inference' },
      { q: 'Why did Eilidh leave her own signs secretly?', o: ['She was afraid of her grandfather', 'She enjoyed giving surprises no one could trace', 'She was not allowed on the island', 'She wanted to be a postwoman'], a: 1, why: 'She liked the island waking to surprises, and kept her part secret even from him.', skill: 'inference' },
      { q: 'Which word best describes the mood of the passage?', o: ['Frightening', 'Gentle and warm', 'Noisy and busy', 'Sad and grey'], a: 1, why: 'The quiet night, kind grandfather and secret gifts create a gentle, warm mood.', skill: 'mood' },
    ],
  },
  // ── 5. Grammar Gardens (Medium) ──
  {
    tier: 5, title: 'Honey Bees at School', kind: 'non-fiction',
    text: `At just twelve days old, a worker bee is given one of the most important jobs in the hive: guard duty. She stands at the entrance and checks every bee that lands. If a stranger tries to slip in, she pushes it out.
Guard duty does not last long. After a few days, the young bee moves on to finding food. She visits up to two hundred flowers on a single trip, drinking nectar and gathering pollen in baskets on her back legs.
Bees tell each other where the best flowers are by dancing. A bee that has found a good patch wiggles in a figure of eight, and the angle of the dance points the others towards it. Scientists call it the waggle dance — a map drawn in movement.`,
    questions: [
      { q: 'What is a twelve-day-old worker bee’s job?', o: ['Finding food', 'Guard duty', 'Making honey', 'Dancing'], a: 1, why: 'At twelve days old she is given guard duty at the entrance.', skill: 'retrieval' },
      { q: 'How does a guard bee treat strangers?', o: ['She feeds them nectar', 'She pushes them out', 'She leads them to flowers', 'She ignores them'], a: 1, why: 'If a stranger tries to slip in, she pushes it out.', skill: 'retrieval' },
      { q: 'How many flowers can a bee visit on one trip?', o: ['About twelve', 'About fifty', 'Up to two hundred', 'Exactly two'], a: 2, why: 'She visits up to two hundred flowers on a single trip.', skill: 'retrieval' },
      { q: 'What do bees carry on their back legs?', o: ['Water droplets', 'Pollen in baskets', 'Pieces of honeycomb', 'Tiny maps'], a: 1, why: 'She gathers pollen in baskets on her back legs.', skill: 'retrieval' },
      { q: 'What does the waggle dance tell the other bees?', o: ['That danger is near', 'Where the best flowers are', 'That the queen has hatched', 'How much honey to make'], a: 1, why: 'The dance points the others towards the best flowers.', skill: 'retrieval' },
      { q: 'Why is the waggle dance called "a map drawn in movement"?', o: ['The bee walks in a straight line only', 'The dance shows direction through the way the bee moves', 'The bee draws with honey', 'The dance shows a picture of a flower'], a: 1, why: 'The angle of the dance acts like a map, pointing the others to the flowers.', skill: 'inference' },
      { q: 'The jobs of a worker bee seem to happen in a certain order. What does the passage suggest about this order?', o: ['The hardest job comes first', 'Bees choose any job at random', 'Bees move from jobs inside the hive to jobs outside', 'Bees keep the same job for life'], a: 2, why: 'Guard duty is inside the hive; after a few days she moves on to finding food outside — inside jobs come first.', skill: 'inference' },
    ],
  },
  // ── 6. Riddle Reef (Medium) ──
  {
    tier: 6, title: 'The Map in the Attic', kind: 'fiction',
    text: `The map had been hidden in the attic for longer than Grandmother could remember. Its edges were brown and crumbly, and someone had drawn a lighthouse in the corner with a date beneath it: 1912.
"That lighthouse fell into the sea before your mother was born," Grandmother said. "Whatever it is marking, it is marking something that is no longer there."
But Sam could not let it go. He copied the map carefully into his notebook and rowed out the next calm morning. Where the lighthouse had stood, there was only a grey stump of rock — and, on the rock, carved deep and clear, the same date: 1912. Beneath it, someone had added new words, painted in white:
THE LIGHT MOVED. FOLLOW THE NEW LIGHT.
Sam looked back at the shore. Above the village, on the cliff, stood a lighthouse he had never once thought about — its lamp flashing patiently, as it had every night of his life.`,
    questions: [
      { q: 'Where had the map been hidden?', o: ['In a notebook', 'In the attic', 'Under the sea', 'In the lighthouse'], a: 1, why: 'The map had been hidden in the attic.', skill: 'retrieval' },
      { q: 'What was drawn in the corner of the map?', o: ['A village', 'A ship', 'A lighthouse with a date', 'A cliff'], a: 2, why: 'Someone had drawn a lighthouse with the date 1912 beneath it.', skill: 'retrieval' },
      { q: 'What did Grandmother believe about the map’s markings?', o: ['They showed buried gold', 'They marked something that no longer existed', 'They were drawn last year', 'They were written in code'], a: 1, why: 'She said the map was marking something no longer there.', skill: 'retrieval' },
      { q: 'What did Sam find on the grey stump of rock?', o: ['A new lighthouse', 'The date 1912 and painted words', 'An old boat', 'Nothing at all'], a: 1, why: 'The same date was carved there, with new painted words beneath.', skill: 'retrieval' },
      { q: 'What do the painted words ask Sam to do?', o: ['Row back home', 'Follow the working lighthouse on the cliff', 'Dig beneath the rock', 'Repair the old lighthouse'], a: 1, why: '"The light moved" — he should follow the new light on the cliff.', skill: 'inference' },
      { q: 'Why had Sam "never once thought about" the cliff lighthouse?', o: ['It was hidden by trees', 'It was too far away to see', 'It was such a familiar part of daily life he ignored it', 'His family told him to avoid it'], a: 2, why: 'Its lamp flashed every night of his life — so familiar he never noticed it.', skill: 'inference' },
      { q: 'Which sentence best sums up the surprise in the last paragraph?', o: ['The treasure was under the sea all along', 'The answer to the old map was glowing in plain sight', 'The map was drawn by Sam’s grandmother', 'The rock stump was older than 1912'], a: 1, why: 'The "new light" was the everyday lighthouse he had always seen but never considered.', skill: 'inference' },
    ],
  },
  // ── 7. Punctuation Palace (Hard) ──
  {
    tier: 7, title: 'The Kelpie of Corriewater', kind: 'fiction',
    text: `They say a kelpie lives in Corriewater: a water horse, beautiful and black, with a mane that tangles like storm-wrack. It waits on the bank for children who wander too close, and it is gentle — until they touch it. The moment a hand brushes its mane, the kelpie plunges deep, and the child goes with it.
Tam was the only child in the glen who had seen it twice and lived to tell of it. "How?" the others asked. Tam only smiled.
The truth was stranger than any story he could have told. The kelpie had reached for him, and Tam — who had fallen in the corrie and broken his arm the summer before — could not have touched its mane if he had wanted to. The kelpie had studied him a long moment, nostrils wide, then turned away, as if it only ever wanted those who could be caught.`,
    questions: [
      { q: 'What does a kelpie look like?', o: ['A black water horse', 'A golden fish', 'A grey heron', 'A white stag'], a: 0, why: 'It is described as a beautiful, black water horse.', skill: 'retrieval' },
      { q: 'When is the kelpie dangerous to children?', o: ['When they swim in the water', 'When they touch its mane', 'When they ride it', 'When they run along the bank'], a: 1, why: 'The moment a hand brushes its mane, the kelpie plunges deep.', skill: 'retrieval' },
      { q: 'What does "storm-wrack" suggest about the mane?', o: ['It is neat and brushed', 'It is tangled like seaweed after a storm', 'It changes colour', 'It is made of clouds'], a: 1, why: 'Wrack is seaweed; the comparison suggests it is tangled like storm-torn seaweed.', skill: 'vocabulary in context' },
      { q: 'Why could Tam not have touched the kelpie’s mane?', o: ['He was too frightened to move', 'His broken arm could not reach', 'The kelpie swam away first', 'His friends held him back'], a: 1, why: 'He had broken his arm the summer before and could not reach out.', skill: 'inference' },
      { q: 'What did the kelpie seem to want, according to the last line?', o: ['Children who could be caught', 'Tam’s broken arm', 'To live on the bank', 'To be washed'], a: 0, why: 'It turned away "as if it only ever wanted those who could be caught."', skill: 'inference' },
      { q: 'Why did Tam smile when the others asked how he survived?', o: ['He knew a secret he kept to himself', 'He did not remember the kelpie', 'He was proud of his scar', 'He planned to return'], a: 0, why: 'He knew the strange truth — the kelpie had refused him — but kept it to himself.', skill: 'inference' },
      { q: 'What does the story suggest about the kelpie’s "gentleness" before a child touches it?', o: ['It is a trick that hides danger', 'It genuinely loves children', 'It is asleep and harmless', 'It is afraid of children'], a: 0, why: 'Its gentleness is the lure: it waits and seems gentle until the fatal touch.', skill: 'inference' },
    ],
  },
  // ── 8. Metaphor Mountains (Hard) ──
  {
    tier: 8, title: 'The Girl Who Counted Stars', kind: 'non-fiction',
    text: `When Caroline Herschel was a girl in eighteenth-century Germany, her mother decided she would be a house servant and nothing more. Her brother William had other ideas, and smuggled her to England, where she sang — and then, quietly, began to help him with his astronomy.
Astronomy in those days meant long, freezing nights. Caroline recorded whatever William shouted from his great telescope, hour after hour, her ink freezing in the pot. But she did not stop at recording. She began hunting the sky herself, sweeping it with her own small telescope, and she found things no one had thought to look for: comets, whole clusters of stars, nebulae that glowed like breath on glass.
In her whole life she discovered eight comets, and was paid — the first woman in England to be paid for science. Near the end of her long life, she counted. She had catalogued two thousand five hundred nebulae, and said, without pride, that she had done nothing but "scratch the sky."`,
    questions: [
      { q: 'What did Caroline’s mother plan for her?', o: ['To sing in England', 'To be a house servant', 'To study astronomy', 'To marry a scientist'], a: 1, why: 'Her mother decided she would be a house servant and nothing more.', skill: 'retrieval' },
      { q: 'What does her "ink freezing in the pot" tell the reader?', o: ['She was a careless writer', 'The observing nights were extremely cold', 'The ink was poor quality', 'She worked only in winter'], a: 1, why: 'Astronomy meant long, freezing nights — the ink froze as she recorded.', skill: 'inference' },
      { q: 'What does "nebulae that glowed like breath on glass" compare nebulae to?', o: ['Bright points of fire', 'The soft cloudiness of misted glass', 'Falling snow', 'Polished mirrors'], a: 1, why: 'The simile compares nebulae to the cloudy mark made by breath on cold glass.', skill: 'language effects' },
      { q: 'What was remarkable about Caroline’s payment?', o: ['It was the largest wage in England', 'She was the first woman in England paid for science', 'She was paid in telescopes', 'She refused the money'], a: 1, why: 'She was the first woman in England to be paid for science.', skill: 'retrieval' },
      { q: 'What does her phrase "scratch the sky" suggest about how she saw her work?', o: ['She believed she had only touched the surface of what could be found', 'Her telescope had scratched the sky', 'She was proud and boastful', 'She preferred writing to observing'], a: 0, why: 'Calling it a "scratch" shows humility — she felt she had barely begun to explore.', skill: 'authorial intent' },
      { q: 'Why does the writer mention that the work was done "quietly"?', o: ['To suggest her contribution was hidden as well as devoted', 'Because she could not speak', 'Because William was unkind', 'To show the telescope was silent'], a: 0, why: 'Quietly suggests her devotion went largely unrecognised at first.', skill: 'authorial intent' },
      { q: 'Which word best describes the way the passage presents Caroline?', o: ['Lucky', 'Determined', 'Frightened', 'Boastful'], a: 1, why: 'She endured freezing nights and decades of work — the portrait is of determination.', skill: 'inference' },
    ],
  },
  // ── 9. Puzzle Peak (Hard) ──
  {
    tier: 9, title: 'The Signal', kind: 'fiction',
    text: `The lorry had gone off the road on Thursday. That was the last thing the police knew for certain.
By Saturday, the searchers had found the tyre marks, a snapped fence, and — half-buried in the gorse — a lunchbox with the name D. Ferro printed on the lid. There was no sign of the driver.
On Sunday, Dev spotted it from the ridge: three plumes of smoke rising from the valley below, thin and steady, like chimney smoke but wrong somehow — too evenly spaced. He remembered what his grandmother said about lost shepherds: one fire for warmth, two for cooking, three for calling.
He raised his arms and waved his bright jacket until the helicopter turned.`,
    questions: [
      { q: 'When did the lorry leave the road?', o: ['Sunday', 'Thursday', 'Saturday', 'The text does not say'], a: 1, why: 'Thursday was the last thing the police knew for certain.', skill: 'retrieval' },
      { q: 'What did the searchers find half-buried in the gorse?', o: ['A tyre', 'A lunchbox', 'A jacket', 'A phone'], a: 1, why: 'A lunchbox with the name D. Ferro was half-buried in the gorse.', skill: 'retrieval' },
      { q: 'Why did Dev think the smoke was "wrong somehow"?', o: ['It was black and thick', 'It was too evenly spaced', 'There was too much of it', 'It was the wrong colour'], a: 1, why: 'The plumes were thin, steady and too evenly spaced.', skill: 'retrieval' },
      { q: 'According to Dev’s grandmother, what did three fires mean?', o: ['Warmth', 'Cooking', 'Calling for help', 'A celebration'], a: 2, why: 'One for warmth, two for cooking, three for calling.', skill: 'retrieval' },
      { q: 'Why did Dev wave his "bright" jacket?', o: ['To warn other cars', 'To be seen from the helicopter', 'To scare away animals', 'Because he was cold'], a: 1, why: 'He waved the bright jacket so the helicopter would spot him.', skill: 'inference' },
      { q: 'What does the passage suggest about D. Ferro?', o: ['The driver had survived and was signalling', 'The driver had driven away', 'D. Ferro was not in the lorry', 'The police had found the driver'], a: 0, why: 'The evenly spaced smoke suggests someone is signalling — implying the driver survived.', skill: 'inference' },
      { q: 'Why does the writer mention the grandmother’s saying about shepherds?', o: ['To explain how Dev understood the smoke', 'To show the family was poor', 'To fill in Dev’s background', 'To suggest Dev wanted to be a shepherd'], a: 0, why: 'The saying is the knowledge that lets Dev read the three fires as a call for help.', skill: 'authorial intent' },
    ],
  },
  // ── 10. Inkwell Isles (Very Hard) ──
  {
    tier: 10, title: 'The Ant and the Glacier', kind: 'fiction',
    text: `The glacier moved the way an important thought moves through a tired mind — slowly, and with great weight. Below it, an ant dragged a crumb three times her size towards a nest that the ice, in its own time, was steadily approaching.
"Move aside," rumbled the ice, in a voice like a continent turning over. "In a hundred years, everything you are building will be under me."
"Perhaps," said the ant, and kept pulling.
"In a hundred years, your tunnel, your crumb, your children and their children — all of it, under me."
"Perhaps," said the ant, "but I am not building for your hundred years. I am building for Tuesday."
The glacier considered this for a very long time — which, for a glacier, is the only way to consider anything — and found, somewhere in its ancient cold, the first crack of a second opinion.`,
    questions: [
      { q: 'How does the writer describe the glacier’s movement?', o: ['Fast and violent', 'Slow and weighty, like a thought in a tired mind', 'Dancing and light', 'Silent and invisible'], a: 1, why: 'The opening compares it to an important thought moving through a tired mind — slowly, with great weight.', skill: 'language effects' },
      { q: 'What does the ant mean by "I am building for Tuesday"?', o: ['She works on Tuesdays only', 'She cares about today’s needs, not far-off futures', 'Her nest will be finished on Tuesday', 'Tuesday is the glacier’s deadline'], a: 1, why: 'She builds for immediate needs, not the glacier’s hundred-year scale.', skill: 'inference' },
      { q: 'What is "the first crack of a second opinion"?', o: ['The glacier splitting open', 'The ice beginning to doubt its own view', 'A second glacier arriving', 'The ant falling through the ice'], a: 1, why: 'A "crack of a second opinion" suggests the glacier begins to doubt itself.', skill: 'inference' },
      { q: 'What does the glacier’s long "considering" time imply about it?', o: ['It thinks quickly for a mountain', 'It is careless', 'Everything about it happens on a vast timescale', 'It is easily offended'], a: 2, why: 'The joke is that for a glacier, long consideration is the only kind possible.', skill: 'inference' },
      { q: 'Whose view of time does the passage present as wiser?', o: ['The glacier’s', 'The ant’s', 'Neither', 'Both are equally wise'], a: 1, why: 'The ending favours the ant: the glacier itself begins to doubt its certainty.', skill: 'authorial intent' },
      { q: 'Why might the writer have chosen an ANT rather than a larger animal?', o: ['Ants live near glaciers', 'The contrast in size makes the argument about time sharper', 'Ants carry crumbs', 'Ants are the glacier’s food'], a: 1, why: 'The extreme size difference sharpens the clash between the two timescales.', skill: 'authorial intent' },
      { q: 'The ant says "perhaps" twice. What does the repetition show about her?', o: ['She agrees with the glacier', 'She is unsure of herself', 'She is unshaken by the glacier’s threats', 'She cannot hear the glacier'], a: 2, why: 'The calm repetition shows she is unbothered by the glacier’s power.', skill: 'language effects' },
    ],
  },
  // ── 11. Synopsis Springs (Very Hard) ──
  {
    tier: 11, title: 'The Matchgirls', kind: 'non-fiction',
    text: `In the summer of 1888, about fourteen hundred women and girls walked out of the Bryant & May match factory in London's East End. They worked fourteen hours a day for little money, and the phosphorus in the matches was eating away their jaws — a sickness called "phossy jaw".
The strike began because the factory sacked a worker who had spoken about the sickness. The matchgirls, some as young as thirteen, marched on Parliament. Newspapers that had ignored them for years suddenly found them newsworthy.
Within two weeks, the factory gave in on every point. It was the biggest strike of the century, won by the poorest workers in the city — girls whom polite society had believed incapable of organising anything. Historians now see it as the beginning of modern trade unionism among women. Yet none of the matchgirls are named in the old schoolbooks; history, which had watched them work fourteen hours a day, somehow could not find the space to watch them win.`,
    questions: [
      { q: 'What illness did the phosphorus cause?', o: ['Phossy jaw', 'London fever', 'Match lung', 'Bone shivers'], a: 0, why: 'The phosphorus ate away their jaws — a sickness called "phossy jaw".', skill: 'retrieval' },
      { q: 'Why did the strike begin?', o: ['Wages were cut', 'A worker was sacked for speaking about the sickness', 'The factory closed', 'Parliament ordered it'], a: 1, why: 'The factory sacked a worker who had spoken about the sickness.', skill: 'retrieval' },
      { q: 'How does the phrase "polite society had believed them incapable of organising anything" affect the reader?', o: ['It shows the strikers were well educated', 'It highlights the prejudice the matchgirls defeated', 'It explains the factory’s rules', 'It suggests the strike was unexpected but small'], a: 1, why: 'It exposes the class prejudice their success disproved.', skill: 'language effects' },
      { q: 'What do historians now believe about the strike?', o: ['It failed to change anything', 'It began modern trade unionism among women', 'It was caused by Parliament', 'It lasted two months'], a: 1, why: 'Historians see it as the beginning of modern trade unionism among women.', skill: 'retrieval' },
      { q: 'What is the effect of the final sentence — "history… could not find the space to watch them win"?', o: ['It praises history books for their detail', 'It criticises history for recording their work but not their victory', 'It suggests the strike never happened', 'It explains why the schoolbooks were lost'], a: 1, why: 'The irony criticises history-writing that observed their suffering but ignored their triumph.', skill: 'authorial intent' },
      { q: 'The writer calls the workers "girls whom polite society had believed incapable". What is the most likely reason for choosing the word "girls"?', o: ['To show all the workers were under thirteen', 'To stress how young they were and how little society expected of them', 'Because "women" was not used in 1888', 'To make the strike seem smaller'], a: 1, why: 'The word emphasises both their youth and society’s low expectations.', skill: 'language effects' },
      { q: 'Which statement is BEST supported by the passage?', o: ['The strike was the first strike in London', 'The matchgirls won because Parliament supported them', 'The strike succeeded quickly despite the workers’ poverty', 'The factory closed down after the strike'], a: 2, why: 'Within two weeks the factory gave in on every point — won by the city’s poorest workers. Parliament was marched on, not supported by.', skill: 'inference' },
    ],
  },
  // ── 12. Logic Lagoon (Very Hard) ──
  {
    tier: 12, title: 'The Cartographer’s Apprentice', kind: 'fiction',
    text: `The old cartographer was famous for two things: maps so accurate that sailors paid double for them, and never once saying "sorry".
His apprentice, Nell, understood the second reputation long before the first. When the great storm map of 1871 turned out to have drawn the sandbar a mile too far east — and three ships had lined up, one after another, to test the error — the old man simply re-inked the coastline and pinned a new chart over the old one, without a word.
Nell thought about those three ships every time she drew. So when she became a cartographer herself, she did something no one in the trade had done: she printed her mistakes on the map itself, in small red letters, under the words "so that no one else finds them the hard way."
Sailors, it turned out, trusted her charts above all others. Not because they were free of errors — no map is — but because she was the only mapmaker who told you exactly where the edge of her knowledge was.`,
    questions: [
      { q: 'What was the old cartographer famous for?', o: ['Accurate maps and never apologising', 'Fast ships and long voyages', 'Painting portraits of harbours', 'Training many apprentices'], a: 0, why: 'Famous for very accurate maps and never once saying "sorry".', skill: 'retrieval' },
      { q: 'What happened as a result of the storm map error?', o: ['Nothing, it was corrected at once', 'Three ships tested the wrong sandbar position', 'The old man was sacked', 'The map was never printed'], a: 1, why: 'Three ships lined up, one after another, to test the error.', skill: 'retrieval' },
      { q: 'What does Nell’s red lettering on her maps show about her?', o: ['She made more errors than her teacher', 'She chose honesty over appearing perfect', 'She wanted sailors to test her maps', 'She was proud of her teacher'], a: 1, why: 'Printing her own mistakes showed she valued honesty over an image of perfection.', skill: 'inference' },
      { q: 'Why did sailors trust Nell’s charts "above all others"?', o: ['They were free of errors', 'She marked exactly where her knowledge ended', 'They were cheaper', 'Her teacher recommended them'], a: 1, why: 'She was the only mapmaker who told you where the edge of her knowledge was.', skill: 'retrieval' },
      { q: 'The old man "re-inked the coastline and pinned a new chart over the old one." What does this suggest about him?', o: ['He corrected errors openly', 'He hid his mistakes rather than admit them', 'He was too poor for new paper', 'He loved red ink'], a: 1, why: 'Covering the old chart mirrors covering the mistake — no apology, no admission.', skill: 'inference' },
      { q: 'What is the significance of the phrase "no map is" free of errors?', o: ['It excuses careless mapmakers', 'It sets up why honesty, not perfection, earns trust', 'It suggests Nell was a poor mapmaker', 'It means sailors preferred older maps'], a: 1, why: 'Since all maps have errors, the mapmaker who admits them is the only one worth trusting.', skill: 'authorial intent' },
      { q: 'Which sentence best describes the lesson of the passage?', o: ['Never travel without a map', 'Admitting the limits of your knowledge builds more trust than claiming perfection', 'Apprentices should question their teachers', 'Storms make mapmaking dangerous'], a: 1, why: 'The passage praises Nell for showing "the edge of her knowledge" — honesty over perfection.', skill: 'inference' },
    ],
  },
  // ── 13. Bard's Bay (Very Very Hard) ──
  {
    tier: 13, title: 'The Retired Lighthouse', kind: 'fiction',
    text: `They closed the lighthouse in April, with a notice on the door and a new automatic light on a steel pole further out — a light with no rooms, no stairs, no one to keep it company.
The old keeper came back in May, out of habit more than hope, and stood in the empty lantern room. The great lens was still there, turning its slow, patient circle, though there was nothing behind it now but weather. Below, the new light blinked its small, efficient blink.
"They could have left me the stairs," he said to the room, or to the sea, or to no one. "The light was never the work. The work was being awake."
For sixty years, someone had been awake on this rock so that strangers could be asleep. He wondered, without bitterness, whether the ships knew the difference — whether a coast with one watchful soul on it is a different coast at all. Then he went home, and that night the sea looked after itself, as it always had.`,
    questions: [
      { q: 'What replaced the old lighthouse?', o: ['A younger keeper', 'An automatic light on a steel pole', 'A larger lamp in the same room', 'A row of buoys'], a: 1, why: 'A new automatic light on a steel pole further out replaced it.', skill: 'retrieval' },
      { q: 'What does the keeper mean by "The light was never the work"?', o: ['The lamp was broken anyway', 'The real job was the constant human vigilance, not the lamp', 'He never cleaned the lamp', 'Another keeper did the lighting'], a: 1, why: 'The work, he says, "was being awake" — the human watch, not the mechanism.', skill: 'inference' },
      { q: 'Who is the keeper speaking to when he addresses "the room, or the sea, or no one"?', o: ['A new colleague', 'The automatic light', 'He is unsure anyone is listening at all', 'His family on the shore'], a: 2, why: 'The options collapse into no one — the room is empty and the sea does not answer.', skill: 'inference' },
      { q: 'What does "whether the ships knew the difference" ask the reader to consider?', o: ['Whether ships could tell the time', 'Whether automated and human care are the same thing', 'Whether the ships changed course', 'Whether the keeper owned a boat'], a: 1, why: 'It asks whether a coast watched by a person differs from one watched by a machine.', skill: 'inference' },
      { q: 'What does the final line — "the sea looked after itself, as it always had" — imply?', o: ['The keeper’s work had been unnecessary all along', 'The sea had never needed his help to be safe', 'The new light was failing', 'The keeper would return'], a: 1, why: 'It is his wry, half-sad thought that the sea manages alone — quietly questioning, not stating, his life’s value.', skill: 'authorial intent' },
      { q: 'Why does the writer describe the new light as "small, efficient" and "blinking"?', o: ['To show it was better than the old lamp', 'To contrast cold efficiency with the warm, human old light', 'To suggest the new light was broken', 'Because the lens was still turning'], a: 1, why: 'The adjectives set the machine’s plainness against the human "slow, patient" old lamp.', skill: 'language effects' },
      { q: 'The phrase "out of habit more than hope" suggests the keeper returned because…', o: ['He expected his job back', 'Sixty years of habit pulled him there, though he knew it was over', 'He had left something in the lantern room', 'The notice asked him to come'], a: 1, why: 'Habit brought him; "more than hope" tells us he did not expect anything to change.', skill: 'inference' },
    ],
  },
  // ── 14. Runic Ridge (Very Very Hard) ──
  {
    tier: 14, title: 'The Beekeeper’s Daughters', kind: 'fiction',
    text: `The beekeeper's two daughters were as different as the two halves of the hive. The elder, Marta, worked the smoke and the frames, unafraid, reading the mood of the colony the way sailors read weather. The younger, Iris, never opened the hives at all. She sat instead at the kitchen window with a notebook, and her records — sown dates, rain, blooms, temper of the bees — were so exact that the county agricultural office wrote to her, twice, believing she must be a man of science.
The sisters argued about the bees for thirty years. Marta said you learn bees with your hands; Iris said you learn them with your years. Each was certain the other's method was the lucky one, and neither would admit that her own hives thrived, all that time, because both sisters were tending them.
It was only when the beekeeper died and the sisters finally divided the colonies — Marta taking the north meadow, Iris the south — that both hives began to fail, in the same season, for the first time in living memory. The bees, it turned out, had not been choosing sides. They had simply been tended, all along, by the whole of one family.`,
    questions: [
      { q: 'How were the sisters’ methods different?', o: ['Marta used smoke and hands; Iris observed and recorded', 'Marta kept records; Iris opened hives', 'Marta worked at night; Iris worked at noon', 'They kept different insects'], a: 0, why: 'Marta worked the hives directly; Iris observed and kept exact records.', skill: 'retrieval' },
      { q: 'Why did the agricultural office write to Iris?', o: ['To buy her honey', 'Her records were so exact they assumed a man of science kept them', 'To warn her about the bees', 'To sell her new hives'], a: 1, why: 'The records were so exact the office believed she must be a man of science.', skill: 'retrieval' },
      { q: 'What did each sister believe about the other’s method?', o: ['That it was cruel to the bees', 'That it was the lucky one', 'That it was the only true way', 'That it came from a book'], a: 1, why: 'Each was certain the other’s method was the lucky one.', skill: 'retrieval' },
      { q: 'What happened when the colonies were divided?', o: ['Both sets of hives failed in the same season', 'The hives produced more honey than ever', 'The bees chose Marta’s meadow', 'Nothing changed'], a: 0, why: 'Both hives began to fail in the same season, for the first time in living memory.', skill: 'retrieval' },
      { q: 'What does the failure of BOTH hives reveal?', o: ['That the bees preferred Iris’s records', 'That each sister’s method alone had never been enough', 'That the bees could not fly between meadows', 'That the season was to blame'], a: 1, why: 'Only when tended by the whole family did the hives thrive — each had secretly relied on the other.', skill: 'inference' },
      { q: 'The bees "had not been choosing sides." What does this suggest about the sisters’ long argument?', o: ['The bees had settled it fairly', 'The argument was pointless: the bees needed both sisters', 'Marta had been right all along', 'The bees sided with whoever fed them'], a: 1, why: 'The hives thrived only under both sisters’ care, proving neither method alone was the secret.', skill: 'inference' },
      { q: 'Why does the writer describe the sisters as "the two halves of the hive"?', o: ['They each kept half a hive', 'To show that, like a hive, they only functioned as one whole', 'They dressed like bees', 'To compare them to the queen and workers'], a: 1, why: 'The metaphor prepares the ending: the hive only thrives when both halves work together.', skill: 'language effects' },
    ],
  },
  // ── 15. Scholar's Summit (Very Very Hard) ──
  {
    tier: 15, title: 'The Cartographer’s Apology', kind: 'fiction',
    text: `My grandfather drew coastlines for a living, and he lied in every one of them.
Not in the way you would notice. The bays were the right depth, the cliffs the right colour of stubborn grey. But along every coast he drew, always, a small cove with a shingle beach — a place, he said, where a tired boat could rest. My grandmother found eleven such coves in his atlas and challenged him, one by one. He admitted that nine did not exist.
"Then why draw them?" she asked.
"Because a chart is a promise," he said, "and every navigator deserves at least one place of shelter, even if he has to imagine it."
I tell this story not because I am proud of it, but because I have become my grandfather. I write reports for a shipping company, and in every one, alongside the honest figures, I have buried one small cove — a sentence that says the risk is manageable, that the plan is sound. My auditors are my grandmother now. They have found the first of my eleven coves. I find, reviewing my life, that I am sorry for the sailors more than for myself: it is one thing to invent a beach, and another to promise a safe passage and let the reader steer by it.`,
    questions: [
      { q: 'What "lie" did the grandfather’s maps contain?', o: ['Wrong water depths', 'Imaginary shelter coves that did not exist', 'Missing cliffs', 'Invented sea monsters'], a: 1, why: 'Along every coast he drew a small cove with a shingle beach, whether or not it existed.', skill: 'retrieval' },
      { q: 'How many of the coves did the grandfather admit were not real?', o: ['One', 'Nine of the eleven', 'All of them', 'None'], a: 1, why: 'He admitted that nine of the eleven coves did not exist.', skill: 'retrieval' },
      { q: 'What does "a chart is a promise" reveal about how the grandfather saw his work?', o: ['Charts were legally binding documents', 'A map carries a duty of care to the people who use it', 'Charts should never change', 'He considered mapmaking a religion'], a: 1, why: 'He believed a chart promises shelter to every navigator who trusts it.', skill: 'inference' },
      { q: 'What is the narrator’s "small cove" in his reports?', o: ['A holiday destination', 'A reassuring sentence that the risk is manageable', 'A hidden company account', 'A drawing in the margin'], a: 1, why: 'He buries a sentence saying the risk is manageable and the plan is sound.', skill: 'retrieval' },
      { q: 'Why does the narrator say he is "sorry for the sailors more than for himself"?', o: ['The sailors could not swim', 'His comforting lie might cause real harm to people steering by it', 'He envied the sailors’ freedom', 'The sailors had complained about him'], a: 1, why: 'Inventing a beach is harmless; a false assurance that people steer by can cost them dearly.', skill: 'inference' },
      { q: 'The narrator says he tells the story "not because I am proud of it." What does this suggest about his attitude towards his own coves?', o: ['He believes his coves are harmless', 'He recognises that his comforting falsehoods are a form of the same dishonesty', 'He plans to stop writing reports', 'He is proud of his grandfather'], a: 1, why: 'He sees that his "coves" repeat the grandfather’s behaviour — and recognises the wrong in it.', skill: 'inference' },
      { q: 'How does the structure of the passage — grandfather’s story, then the narrator’s confession — shape its meaning?', o: ['It compares two careers in mapmaking', 'It shows an inherited habit of comforting falsehood, and forces the narrator (and reader) to judge it', 'It proves the grandfather was a better artist', 'It delays the mention of the auditors'], a: 1, why: 'The parallel structure makes the reader weigh the charm of the grandfather’s coves against the real risk of the narrator’s.', skill: 'authorial intent' },
    ],
  },
];
