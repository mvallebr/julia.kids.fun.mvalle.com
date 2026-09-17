// English Adventures — Story 1 data (15 worlds, Easy → Very Very Hard).
// Same architecture as Maths Adventures: node sequences per world
// (walk / arrive / dialogue / friend / encounter / reward / explore /
// passage / finale), plus painted-path waypoints per background.

export const WORLD_ORDER = [
  'meadow', 'rhyme', 'lantern', 'whisper', 'gardens', 'reef', 'palace-punc',
  'metaphor', 'peak', 'inkwell', 'springs', 'lagoon', 'bards', 'runic', 'summit',
];

export const WORLDS = {
  meadow: {
    id: 'meadow', emoji: '🌼', title: { en: 'Storybook Meadow' }, tier: 1,
    asset: 'bg-meadow',
    collectible: { id: 'daisy', emoji: '🌼', name: { en: 'pressed daisies' } },
    palette: { deep: '#14321e', glow: '#ffd166' },
  },
  rhyme: {
    id: 'rhyme', emoji: '🌊', title: { en: 'Rhyme River' }, tier: 2,
    asset: 'bg-rhyme',
    collectible: { id: 'pebble', emoji: '🪨', name: { en: 'rhyming pebbles' } },
    palette: { deep: '#0e2c3e', glow: '#8fd8ff' },
  },
  lantern: {
    id: 'lantern', emoji: '🏮', title: { en: 'Lantern Library' }, tier: 3,
    asset: 'bg-lantern',
    collectible: { id: 'bookmark', emoji: '🔖', name: { en: 'golden bookmarks' } },
    palette: { deep: '#33230e', glow: '#ffcf70' },
  },
  whisper: {
    id: 'whisper', emoji: '🌲', title: { en: 'Whispering Woods' }, tier: 4,
    asset: 'bg-whisper',
    collectible: { id: 'feather', emoji: '🪶', name: { en: 'whisper feathers' } },
    palette: { deep: '#12281c', glow: '#a8e0c0' },
  },
  gardens: {
    id: 'gardens', emoji: '🌸', title: { en: 'Grammar Gardens' }, tier: 5,
    asset: 'bg-gardens',
    collectible: { id: 'blossom', emoji: '🌸', name: { en: 'grammar blossoms' } },
    palette: { deep: '#3a1030', glow: '#ff9fbd' },
  },
  reef: {
    id: 'reef', emoji: '🪸', title: { en: 'Riddle Reef' }, tier: 6,
    asset: 'bg-reef',
    collectible: { id: 'shell', emoji: '🐚', name: { en: 'riddle shells' } },
    palette: { deep: '#06333d', glow: '#7fe8d8' },
  },
  'palace-punc': {
    id: 'palace-punc', emoji: '🏰', title: { en: 'Punctuation Palace' }, tier: 7,
    asset: 'bg-palace-punc',
    collectible: { id: 'quill', emoji: '🪶', name: { en: 'royal quills' } },
    palette: { deep: '#2a1440', glow: '#c7a6ff' },
  },
  metaphor: {
    id: 'metaphor', emoji: '⛰️', title: { en: 'Metaphor Mountains' }, tier: 8,
    asset: 'bg-metaphor',
    collectible: { id: 'crystal', emoji: '💠', name: { en: 'mountain crystals' } },
    palette: { deep: '#1c2440', glow: '#9fc0ff' },
  },
  peak: {
    id: 'peak', emoji: '🧩', title: { en: 'Puzzle Peak' }, tier: 9,
    asset: 'bg-peak',
    collectible: { id: 'knot', emoji: '🪢', name: { en: 'puzzle knots' } },
    palette: { deep: '#301a10', glow: '#ffb36b' },
  },
  inkwell: {
    id: 'inkwell', emoji: '🖋️', title: { en: 'Inkwell Isles' }, tier: 10,
    asset: 'bg-inkwell',
    collectible: { id: 'inkdrop', emoji: '💧', name: { en: 'midnight inkdrops' } },
    palette: { deep: '#101329', glow: '#8f9fff' },
  },
  springs: {
    id: 'springs', emoji: '⛲', title: { en: 'Synopsis Springs' }, tier: 11,
    asset: 'bg-springs',
    collectible: { id: 'pearl', emoji: '🫧', name: { en: 'spring pearls' } },
    palette: { deep: '#0c3038', glow: '#9fe8e0' },
  },
  lagoon: {
    id: 'lagoon', emoji: '🪷', title: { en: 'Logic Lagoon' }, tier: 12,
    asset: 'bg-lagoon',
    collectible: { id: 'lily', emoji: '🪷', name: { en: 'logic lilies' } },
    palette: { deep: '#123428', glow: '#b0f0c8' },
  },
  bards: {
    id: 'bards', emoji: '🎻', title: { en: 'Bard’s Bay' }, tier: 13,
    asset: 'bg-bards',
    collectible: { id: 'lyre', emoji: '🎼', name: { en: 'bard’s notes' } },
    palette: { deep: '#2c1030', glow: '#e0a6ff' },
  },
  runic: {
    id: 'runic', emoji: '🗿', title: { en: 'Runic Ridge' }, tier: 14,
    asset: 'bg-runic',
    collectible: { id: 'rune', emoji: '🗿', name: { en: 'runic stones' } },
    palette: { deep: '#1a1c30', glow: '#a0b8ff' },
  },
  summit: {
    id: 'summit', emoji: '🏔️', title: { en: 'Scholar’s Summit' }, tier: 15,
    asset: 'bg-summit',
    collectible: { id: 'laurel', emoji: '🏅', name: { en: 'summit laurels' } },
    palette: { deep: '#0e1a2c', glow: '#ffe27a' },
  },
};

// ── Amigos (moradores de cada mundo) ──
export const FRIENDS = {
  poppy: { id: 'poppy', emoji: '🦔', name: { en: 'Poppy' }, world: 'meadow', asset: 'friend-poppy',
    intro: { en: 'Hi! I’m Poppy! I’m collecting perfect words — will you help me find one?' } },
  ribbit: { id: 'ribbit', emoji: '🐸', name: { en: 'Ribbit' }, world: 'rhyme', asset: 'friend-ribbit',
    intro: { en: 'Ribbit! I’m Ribbit, the river poet. My best rhyme swam away — help me catch it?' } },
  bramble: { id: 'bramble', emoji: '🦉', name: { en: 'Bramble' }, world: 'lantern', asset: 'friend-bramble',
    intro: { en: 'Whooo goes there? I’m Bramble, keeper of the Lantern Library.' } },
  whisper: { id: 'whisper', emoji: '🦊', name: { en: 'Whisper' }, world: 'whisper', asset: 'friend-whisper',
    intro: { en: 'Psst… I’m Whisper. The woods only speak to careful readers.' } },
  rosetta: { id: 'rosetta', emoji: '🧚', name: { en: 'Rosetta' }, world: 'gardens', asset: 'friend-rosetta',
    intro: { en: 'Welcome! I’m Rosetta. Every flower here grows one perfect sentence.' } },
  coral: { id: 'coral', emoji: '🐠', name: { en: 'Coral' }, world: 'reef', asset: 'friend-coral',
    intro: { en: 'Glub! I’m Coral. Every shell on this reef hides a riddle.' } },
  sir: { id: 'sir', emoji: '🛡️', name: { en: 'Sir Comma' }, world: 'palace-punc', asset: 'friend-sir',
    intro: { en: 'Halt! Sir Comma, at your service. Pause — then proceed!' } },
  misty: { id: 'misty', emoji: '🦅', name: { en: 'Misty' }, world: 'metaphor', asset: 'friend-misty',
    intro: { en: 'I am Misty. Up here, every cloud is really something else.' } },
  riddlin: { id: 'riddlin', emoji: '🦡', name: { en: 'Riddlin' }, world: 'peak', asset: 'friend-riddlin',
    intro: { en: 'Ah, a climber! I’m Riddlin. My riddles are the mountain’s locks.' } },
  squill: { id: 'squill', emoji: '🐙', name: { en: 'Squill' }, world: 'inkwell', asset: 'friend-squill',
    intro: { en: 'Eight arms, infinite ink! I’m Squill, the isles’ writer.' } },
  fawn: { id: 'fawn', emoji: '🦌', name: { en: 'Fawn' }, world: 'springs', asset: 'friend-fawn',
    intro: { en: 'Hello! I’m Fawn. The spring shows two words — only one is true.' } },
  puzzle: { id: 'puzzle', emoji: '🐢', name: { en: 'Puzzle' }, world: 'lagoon', asset: 'friend-puzzle',
    intro: { en: 'Slow down, think clearly. I’m Puzzle. The lagoon rewards patient minds.' } },
  lyric: { id: 'lyric', emoji: '🦭', name: { en: 'Lyric' }, world: 'bards', asset: 'friend-lyric',
    intro: { en: 'Listen to the waves — each one is a sentence waiting to be sung!' } },
  rune: { id: 'rune', emoji: '🐦‍⬛', name: { en: 'Rune' }, world: 'runic', asset: 'friend-rune',
    intro: { en: 'Caw! I’m Rune. These stones only glow for careful spellers.' } },
  alma: { id: 'alma', emoji: '🐾', name: { en: 'Alma' }, world: 'summit', asset: 'friend-alma',
    intro: { en: 'You reached the Summit! I’m Alma. One last climb — the hardest of all.' } },
};

export const FRIENDS_BY_WORLD = Object.fromEntries(Object.values(FRIENDS).map((f) => [f.world, f]));

export const WORLD_CONTEXT = {};

// ── caminhos pintados (waypoints x%, y%) — calibrados por fundo ──
export const PATHS = {
  // Waypoints calibrados sobre as trilhas PINTADAS de cada fundo (y = pés).
  meadow: [[38, 102], [41, 88], [48, 78], [52, 70], [49, 62], [55, 54], [62, 48]],
  rhyme: [[8, 104], [17, 80], [33, 73], [49, 66], [63, 60], [75, 54], [83, 46], [89, 34]],
  lantern: [[28, 104], [45, 88], [58, 79], [65, 71], [72, 66], [78, 58]],
  whisper: [[54, 104], [58, 88], [55, 78], [60, 70], [66, 63], [72, 56], [76, 50]],
  gardens: [[70, 104], [62, 89], [53, 79], [47, 73], [50, 66], [60, 61], [68, 58]],
  reef: [[18, 104], [33, 90], [46, 81], [57, 74], [66, 69], [75, 63]],
  'palace-punc': [[40, 104], [48, 90], [54, 81], [60, 74], [64, 68], [66, 62]],
  metaphor: [[22, 106], [38, 94], [50, 87], [58, 82], [64, 77], [70, 72]],
  peak: [[62, 104], [50, 92], [40, 85], [33, 78], [37, 70], [46, 62], [55, 55], [59, 51]],
  inkwell: [[8, 62], [18, 69], [30, 74], [43, 78], [55, 80], [67, 77], [78, 71], [86, 62]],
  springs: [[76, 104], [68, 90], [63, 79], [66, 70], [75, 62], [77, 55], [72, 49]],
  lagoon: [[27, 96], [40, 87], [47, 79], [55, 72], [63, 66], [67, 59], [62, 52], [58, 50]],
  bards: [[50, 104], [58, 90], [66, 80], [74, 73], [81, 68], [86, 60]],
  runic: [[30, 108], [40, 97], [48, 91], [56, 85], [64, 80], [72, 75], [80, 70]],
  summit: [[45, 106], [55, 92], [63, 83], [68, 77], [65, 71], [60, 66], [64, 59], [67, 53]],
};

// ── sequência de nós ──
// Descobertas de exploração (surpresas sem desafios — spec §35).
export const EXPLORE_SECRETS = {
  meadow: [
    { en: 'A butterfly lands on your finger and flaps "thank you".' },
    { en: 'A tiny door in the oak tree… somebody very small lives here!' },
    { en: 'The daisies turn to follow you as you walk.' },
  ],
  rhyme: [
    { en: 'The river whispers a rhyme about your name!' },
    { en: 'A pebble skips seven times — a new record!' },
    { en: 'You catch a falling rhyme in your pocket.' },
  ],
  lantern: [
    { en: 'A sleepy book yawns and settles deeper into its shelf.' },
    { en: 'The lanterns flicker a welcome just for you.' },
    { en: 'You find a reading nook lit by firefly jars.' },
  ],
  whisper: [
    { en: 'The trees whisper your name back to you.' },
    { en: 'Fox prints appear — then vanish.' },
    { en: 'Something golden falls from the canopy. It sparkles!' },
  ],
  gardens: [
    { en: 'A rose blooms in fast-forward as you approach.' },
    { en: 'The apostrophe fountain twinkles.' },
    { en: 'Bees buzz the sweetest sentence you have ever heard.' },
  ],
  reef: [
    { en: 'A seahorse lends you its crown for a moment.' },
    { en: 'The coral chimes like tiny bells.' },
    { en: 'A shoal of fish draws a heart around you!' },
  ],
  'palace-punc': [
    { en: 'A sign straightens its own apostrophe as you walk by.' },
    { en: 'The palace flags spell out a secret word.' },
    { en: 'A comma cart rolls past, delivering pauses.' },
  ],
  metaphor: [
    { en: 'A cloud looks exactly like your favourite animal.' },
    { en: 'The mountain echo answers your hello in song.' },
    { en: 'You spot a peak shaped like a sleeping giant.' },
  ],
  peak: [
    { en: 'A puzzle piece falls from your pocket — it fits a rock perfectly.' },
    { en: 'The wind carries a riddle up the slope.' },
    { en: 'You find a mountain goat’s lost sock. Cosy!' },
  ],
  inkwell: [
    { en: 'An inkdrop falls upward. Nobody knows how.' },
    { en: 'A quill feather writes your initial in the sand.' },
    { en: 'The tide draws a story in the shoreline.' },
  ],
  springs: [
    { en: 'The spring shows you a glimpse of a faraway shore.' },
    { en: 'Two pools — one shows yesterday, one shows tomorrow.' },
    { en: 'A water droplet rings like a tiny bell.' },
  ],
  lagoon: [
    { en: 'A lily pad spins and bows to you.' },
    { en: 'The lagoon reflects a sky with your face in the clouds.' },
    { en: 'A frog solves a riddle before you do. Show-off!' },
  ],
  bards: [
    { en: 'A wave hums the melody of an old sea song.' },
    { en: 'You find a message in a bottle — a poem with no name.' },
    { en: 'The bay echoes your laugh back as music.' },
  ],
  runic: [
    { en: 'A rune glows as you pass — it says "well done" in an ancient tongue.' },
    { en: 'A raven lands beside you and nods politely.' },
    { en: 'The stones hum an ancient lullaby.' },
  ],
  summit: [
    { en: 'You are higher than the clouds. The stars say hello.' },
    { en: 'A mountain breeze carries the sound of distant bells.' },
    { en: 'The summit stone glows at your touch.' },
  ],
};

// ── sequência de nós ──
export const WORLD_ARRIVE = {
  meadow: { en: '🌼 Welcome to Storybook Meadow! Follow the golden path, reader.' },
  rhyme: { en: '🌊 Welcome to Rhyme River! Listen — the water is counting syllables.' },
  lantern: { en: '🏮 Welcome to the Lantern Library! Every book here is awake.' },
  whisper: { en: '🌲 Welcome to the Whispering Woods. Read carefully, and they will speak.' },
  gardens: { en: '🌸 Welcome to the Grammar Gardens! Mind the thorns — and the apostrophes.' },
  reef: { en: '🪸 Welcome to Riddle Reef! Every shell here hides a question.' },
  'palace-punc': { en: '🏰 Welcome to Punctuation Palace! Mind your commas, traveller.' },
  metaphor: { en: '⛰️ Welcome to the Metaphor Mountains — where nothing is quite what it seems.' },
  peak: { en: '🧩 Welcome to Puzzle Peak! The locks up here only open for thinkers.' },
  inkwell: { en: '🖋️ Welcome to the Inkwell Isles! Watch your step — the ink is still wet.' },
  springs: { en: '⛲ Welcome to Synopsis Springs! Two words wait in every pool.' },
  lagoon: { en: '🪷 Welcome to Logic Lagoon! The water is calm. Your mind must be too.' },
  bards: { en: '🎻 Welcome to Bard’s Bay! The waves here speak in sentences.' },
  runic: { en: '🗿 Welcome to Runic Ridge! Spell the words right and the stones will glow.' },
  summit: { en: '🏔️ Welcome to Scholar’s Summit! The hardest climb of all begins here.' },
};

const SPECIAL_BY_INDEX = [
  { widget: 'keys', skill: 'spelling' },
  { widget: 'stones', skill: 'verbal logic' },
  { widget: 'match', skill: 'synonyms' },
];

function worldNodes(worldId) {
  const friend = FRIENDS_BY_WORLD[worldId];
  const worldIndex = WORLD_ORDER.indexOf(worldId);
  const special = SPECIAL_BY_INDEX[worldIndex % SPECIAL_BY_INDEX.length];
  const nodes = [];

  nodes.push({ type: 'walk', to: 0.1 });
  nodes.push({ type: 'arrive', place: 'gate' });
  nodes.push({ type: 'dialogue', speaker: 'narrator', lines: [WORLD_ARRIVE[worldId]] });

  nodes.push({ type: 'walk', to: 0.3 });
  nodes.push({ type: 'arrive', place: 'friend' });
  nodes.push({ type: 'friend', id: friend.id });
  nodes.push({ type: 'dialogue', speaker: friend.id, lines: [friend.intro] });

  nodes.push({ type: 'encounter', id: `${worldId}-help-friend`, widget: 'choice', slot: 'help',
    skill: worldIndex % 2 === 0 ? 'synonyms' : 'vocabulary in context' });
  nodes.push({ type: 'dialogue', speaker: friend.id,
    lines: [{ en: 'You found it! Wonderful — thank you, thank you! 🎉' }] });
  nodes.push({ type: 'reward', id: `${worldId}-present-1`, hint: 'friend' });

  nodes.push({ type: 'passage', id: `${worldId}-reading` });
  nodes.push({ type: 'reward', id: `${worldId}-present-reading`, hint: 'friend' });

  nodes.push({ type: 'walk', to: 0.5 });
  nodes.push({ type: 'arrive', place: 'crossing' });
  nodes.push({ type: 'encounter', id: `${worldId}-fork-1`, widget: 'fork', slot: 'fork',
    skill: worldIndex % 3 === 0 ? 'antonyms' : 'analogies' });

  nodes.push({ type: 'walk', to: 0.64 });
  nodes.push({ type: 'arrive', place: 'shop' });
  nodes.push({ type: 'encounter', id: `${worldId}-shop-1`, widget: 'choice', slot: 'shop', skill: 'vocabulary in context' });
  nodes.push({ type: 'reward', id: `${worldId}-present-2`, hint: 'path' });

  nodes.push({ type: 'walk', to: 0.78 });
  nodes.push({ type: 'arrive', place: 'bridge' });
  nodes.push({ type: 'encounter', id: `${worldId}-bridge-1`, widget: 'choice', slot: 'bridge',
    skill: worldIndex % 2 === 0 ? 'grammar' : 'punctuation' });

  nodes.push({ type: 'walk', to: 0.92 });
  nodes.push({ type: 'arrive', place: 'stones' });
  nodes.push({ type: 'encounter', id: `${worldId}-special-1`, widget: special.widget, slot: 'special', skill: special.skill });
  nodes.push({ type: 'reward', id: `${worldId}-present-3`, hint: 'path' });

  nodes.push({
    type: 'dialogue', speaker: friend.id, bye: true,
    lines: [{ en: 'You solved every challenge! I will come with you to the Grand Academy!' }],
  });
  nodes.push({ type: 'walk', to: 1, fade: true });
  nodes.push({ type: 'arrive', place: 'gate-exit' });
  nodes.push({ type: 'finale' });
  return nodes;
}

export const WORLD_NODES = Object.fromEntries(WORLD_ORDER.map((worldId) => [worldId, worldNodes(worldId)]));

export function nodesFor(worldId) {
  return WORLD_NODES[worldId] || [];
}

export function encountersFor(worldId) {
  return nodesFor(worldId).filter((node) => node.type === 'encounter');
}

export const STORY_1 = {
  id: 'story-1',
  title: { en: 'English Adventures — The Grand Academy' },
  finale: { asset: 'bg-academy', title: { en: 'The Grand Academy' } },
};

export function nextWorld(worldId) {
  const index = WORLD_ORDER.indexOf(worldId);
  if (index < 0 || index >= WORLD_ORDER.length - 1) return null;
  return WORLD_ORDER[index + 1];
}
