// Manifesto de assets + preload preguiçoso (spec §29: não carregar todo mundo
// no startup; pré-carregar a cena imediata).

const url = (file) => `assets/img/${file}`;

export const ASSETS = {
  'bg-forest': url('bg-forest.webp'),
  'bg-candy': url('bg-candy.webp'),
  'bg-clouds': url('bg-clouds.webp'),
  'bg-crystals': url('bg-crystals.webp'),
  'bg-golden': url('bg-golden.webp'),
  'bg-ocean': url('bg-ocean.webp'),
  'bg-lostcity': url('bg-lostcity.webp'),
  'bg-clockwork': url('bg-clockwork.webp'),
  'bg-winter': url('bg-winter.webp'),
  'bg-stars': url('bg-stars.webp'),
  'bg-palace': url('bg-palace.webp'),
  'bg-hall': url('bg-hall.webp'),
  'bg-title': url('bg-title.webp'),
  'sprite-girl': url('sprite-girl.webp'),
  'sprite-boy': url('sprite-boy.webp'),
  'sprite-maria': url('sprite-maria.webp'),
  'friend-bumble': url('friend-bumble.webp'),
  'friend-zephyr': url('friend-zephyr.webp'),
  'friend-glim': url('friend-glim.webp'),
  'friend-sunny': url('friend-sunny.webp'),
  'friend-bubble': url('friend-bubble.webp'),
  'friend-kaya': url('friend-kaya.webp'),
  'friend-cog': url('friend-cog.webp'),
  'friend-flurry': url('friend-flurry.webp'),
  'friend-twinkle': url('friend-twinkle.webp'),
  'sticker-mushroom': url('sticker-mushroom.webp'),
  'sticker-lollipop': url('sticker-lollipop.webp'),
  'sticker-cloud': url('sticker-cloud.webp'),
  'sticker-crystal': url('sticker-crystal.webp'),
  'sticker-coin': url('sticker-coin.webp'),
  'sticker-pearl': url('sticker-pearl.webp'),
  'sticker-token': url('sticker-token.webp'),
  'sticker-gear': url('sticker-gear.webp'),
  'sticker-snowflake': url('sticker-snowflake.webp'),
  'sticker-star': url('sticker-star.webp'),
  'sticker-crown': url('sticker-crown.webp'),
};

// Sticker de cada mundo ( coleção visual por tema, spec §14.2/§18 ).
export const WORLD_STICKER = {
  forest: 'sticker-mushroom',
  candy: 'sticker-lollipop',
  clouds: 'sticker-cloud',
  crystals: 'sticker-crystal',
  golden: 'sticker-coin',
  ocean: 'sticker-pearl',
  lostcity: 'sticker-token',
  clockwork: 'sticker-gear',
  winter: 'sticker-snowflake',
  stars: 'sticker-star',
};

const cache = new Map();

export function asset(id) {
  return ASSETS[id] || '';
}

// Pré-carrega imagens e resolve quando todas terminam (com falha tolerada).
export function preload(ids) {
  return Promise.all(ids.map((id) => new Promise((resolve) => {
    if (cache.has(id)) return resolve();
    const image = new Image();
    image.onload = () => { cache.set(id, true); resolve(); };
    image.onerror = () => resolve();
    image.src = asset(id);
  })));
}
