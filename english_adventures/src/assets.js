// Manifesto de assets do English Adventures + preload preguiçoso.
// Fundos, amigos e stickers são arte nova (identidade visual própria);
// os ciclos de caminhada do herói são a mesma personagem do site.

const url = (file) => `assets/img/${file}`;

export const ASSETS = {
  'bg-meadow': url('bg-meadow.webp'),
  'bg-rhyme': url('bg-rhyme.webp'),
  'bg-lantern': url('bg-lantern.webp'),
  'bg-whisper': url('bg-whisper.webp'),
  'bg-gardens': url('bg-gardens.webp'),
  'bg-reef': url('bg-reef.webp'),
  'bg-palace-punc': url('bg-palace-punc.webp'),
  'bg-metaphor': url('bg-metaphor.webp'),
  'bg-peak': url('bg-peak.webp'),
  'bg-inkwell': url('bg-inkwell.webp'),
  'bg-springs': url('bg-springs.webp'),
  'bg-lagoon': url('bg-lagoon.webp'),
  'bg-bards': url('bg-bards.webp'),
  'bg-runic': url('bg-runic.webp'),
  'bg-summit': url('bg-summit.webp'),
  'bg-academy': url('bg-academy.webp'),
  'bg-title-ea': url('bg-title-ea.webp'),
  'bg-kingdom-map': url('map-kingdom.webp'),
  'sprite-girl': url('sprite-girl.webp'),
  'sprite-boy': url('sprite-boy.webp'),
  // sprites de cena dos amigos + aliases de retrato
  ...Object.fromEntries(
    ['poppy','ribbit','bramble','whisper','rosetta','coral','sir','misty','riddlin','squill','fawn','puzzle','lyric','rune','alma']
      .flatMap((id) => [
        [`friend-scene-${id}`, url(`friend-scene-${id}.webp`)],
        [`friend-${id}`, url(`friend-scene-${id}.webp`)],
      ]),
  ),
  // ciclos de caminhada (7 frames da menina, 5 do menino)
  ...Object.fromEntries([
    ...Array.from({ length: 7 }, (_, i) => [`walk-girl-${i + 1}`, url(`walk-girl-${i + 1}.webp`)]),
    ...Array.from({ length: 5 }, (_, i) => [`walk-boy-${i + 1}`, url(`walk-boy-${i + 1}.webp`)]),
  ]),
  // stickers por faixa de dificuldade
  'sticker-easy': url('sticker-easy.webp'),
  'sticker-medium': url('sticker-medium.webp'),
  'sticker-hard': url('sticker-hard.webp'),
  'sticker-very-hard': url('sticker-very-hard.webp'),
  'sticker-vvh': url('sticker-vvh.webp'),
};

// Sticker de cada mundo, conforme a faixa de dificuldade
export const WORLD_STICKER = {
  meadow: 'sticker-easy',
  rhyme: 'sticker-easy',
  lantern: 'sticker-easy',
  whisper: 'sticker-medium',
  gardens: 'sticker-medium',
  reef: 'sticker-medium',
  'palace-punc': 'sticker-hard',
  metaphor: 'sticker-hard',
  peak: 'sticker-hard',
  inkwell: 'sticker-very-hard',
  springs: 'sticker-very-hard',
  lagoon: 'sticker-very-hard',
  bards: 'sticker-vvh',
  runic: 'sticker-vvh',
  summit: 'sticker-vvh',
};

const cache = new Map();

export function asset(id) {
  return ASSETS[id] || '';
}

export function preload(ids) {
  return Promise.all(ids.map((id) => new Promise((resolve) => {
    if (cache.has(id)) return resolve();
    const image = new Image();
    image.onload = () => { cache.set(id, true); resolve(); };
    image.onerror = () => resolve();
    image.src = asset(id);
  })));
}
