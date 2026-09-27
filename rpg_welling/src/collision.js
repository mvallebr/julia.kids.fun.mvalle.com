// RPG Welling — colisão da jogadora com as caixas da zona.
//
// Extraído do main.js na rodada 6 (roadmap 0.3, fatia 3). O motivo não foi só
// tamanho: `moveWithCollision` fechava no `zone` do módulo, e por isso não
// tinha NENHUM teste — era uma das duas razoes pelas quais o main.js figurava
// como "sem nenhum teste" no diagnóstico da fase 0. A zona virou parâmetro, e
// agora a colisão é pura e testável, que é o que sempre deveria ter sido.
//
// A zona chega como { colliders, bounds }: é o subconjunto de que a função
// precisa, e não a zona inteira. Se alguém perguntar "o que mais essa função
// muta?", a resposta é: nada — ela é pura de verdade.

export const PLAYER_RADIUS = 0.35;

// Círculo (a jogadora) contra uma caixa alinhada aos eixos. `box` usa o mesmo
// formato de collider do estado: { minX, maxX, minZ, maxZ }.
export function circleHits(x, z, box, radius = PLAYER_RADIUS) {
  const nx = Math.max(box.minX, Math.min(x, box.maxX));
  const nz = Math.max(box.minZ, Math.min(z, box.maxZ));
  const dx = x - nx;
  const dz = z - nz;
  return dx * dx + dz * dz < radius * radius;
}

// Desloca a jogadora resolvendo POR EIXO: o eixo que bate é cancelado e o
// outro passa. É o que faz a menina deslizar nos cantos em vez de travar.
// No fim, o resultado é preso aos bounds da zona — a barreira invisível que a
// camera pode atravessar mas a jogadora não.
export function moveWithCollision(zone, fromX, fromZ, dx, dz) {
  const colliders = zone?.colliders ?? [];
  const bounds = zone?.bounds;
  let x = fromX + dx;
  if (colliders.some((box) => circleHits(x, fromZ, box))) x = fromX;
  let z = fromZ + dz;
  if (colliders.some((box) => circleHits(x, z, box))) z = fromZ;
  if (bounds) {
    x = Math.max(bounds.minX, Math.min(x, bounds.maxX));
    z = Math.max(bounds.minZ, Math.min(z, bounds.maxZ));
  }
  return [x, z];
}
