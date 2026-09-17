// The Word Quest — manifest de assets cinematográficos.

const url = (file) => `assets/img/${file}`;

export const ASSETS = {
  'keyart': url('keyart.webp'),
  'map-hero': url('map-hero.webp'),
  'loc-forest': url('loc-forest.webp'),
  'loc-bridge': url('loc-bridge.webp'),
  'loc-village': url('loc-village.webp'),
  'loc-caves': url('loc-caves.webp'),
  'loc-library': url('loc-library.webp'),
  'loc-peak': url('loc-peak.webp'),
  'loc-castle': url('loc-castle.webp'),
  'owl': url('owl.webp'),
  'dragon': url('dragon.webp'),
  'treasure': url('treasure.webp'),
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
