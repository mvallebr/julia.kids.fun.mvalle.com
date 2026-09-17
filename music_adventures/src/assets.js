// Manifesto de assets do Music Adventures (fundos temáticos de música).

const url = (file) => `assets/img/${file}`;

export const ASSETS = {
  'bg-title': url('bg-title.webp'),
  'bg-hub': url('bg-hub.webp'),
  'bg-listen': url('bg-listen.webp'),
  'bg-sing': url('bg-sing.webp'),
};

const cache = new Map();

export function asset(id) {
  const found = ASSETS[id];
  if (!found) throw new Error(`asset desconhecido: ${id}`);
  return found;
}

// Pré-carrega imagens; falhas são ignoradas (o gradiente do body cobre).
export function preload(ids) {
  for (const id of ids) {
    if (cache.has(id)) continue;
    cache.set(id, true);
    const image = new Image();
    image.src = asset(id);
  }
}
