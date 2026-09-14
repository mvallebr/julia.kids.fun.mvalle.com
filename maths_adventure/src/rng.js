// RNG determinístico (spec §25/§31): cada encontro é semeado por
// jogador + id do encontro, para que a pergunta não mude ao recarregar a página.

// mulberry32 — gerador rápido e de qualidade suficiente para o jogo.
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// FNV-1a — hash estável de string para semente numérica.
export function hashSeed(text) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function seededRandom(seedText) {
  return mulberry32(hashSeed(String(seedText)));
}

// Utilidades sorteadas usadas pelos geradores de desafios.
export function intBetween(next, min, max) {
  return min + Math.floor(next() * (max - min + 1));
}

export function pickOne(next, list) {
  return list[Math.floor(next() * list.length)];
}

export function shuffled(next, list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}
