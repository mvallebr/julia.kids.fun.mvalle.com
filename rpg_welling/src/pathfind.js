// ── busca de caminho (A*) sobre os AABBs de colisão da zona ──────────────────
// O clique no chão vira uma lista de waypoints: a grade é marcada com o mesmo
// círculo do jogador (0,35 m), o A* evita os obstáculos e o caminho passa por
// um "string pulling" que corta os pontos desnecessários quando há linha reta
// livre — assim a julia contorna a cerca em vez de empurrar e desistir.

const SQRT2 = Math.SQRT2;

// heap binário mínimo por fScore: (col,row) com custo estimado
class MinHeap {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
    let i = this.items.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.items[parent].f <= item.f) break;
      this.items[i] = this.items[parent];
      i = parent;
    }
    this.items[i] = item;
  }
  pop() {
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length) {
      let i = 0;
      while (true) {
        const left = i * 2 + 1;
        if (left >= this.items.length) break;
        const right = left + 1;
        const child = right < this.items.length && this.items[right].f < this.items[left].f ? right : left;
        if (this.items[child].f >= last.f) break;
        this.items[i] = this.items[child];
        i = child;
      }
      this.items[i] = last;
    }
    return top;
  }
  get size() {
    return this.items.length;
  }
}

function circleHits(x, z, box, radius) {
  const nx = Math.max(box.minX, Math.min(x, box.maxX));
  const nz = Math.max(box.minZ, Math.min(z, box.maxZ));
  const dx = x - nx;
  const dz = z - nz;
  return dx * dx + dz * dz < radius * radius;
}

// grade de navegação: uma célula = um ponto do chão que o jogador pode pisar
export function buildNavGrid(zone, { cell = 0.45, radius = 0.35 } = {}) {
  const bounds = zone.bounds;
  const cols = Math.max(1, Math.ceil((bounds.maxX - bounds.minX) / cell));
  const rows = Math.max(1, Math.ceil((bounds.maxZ - bounds.minZ) / cell));
  const blocked = new Uint8Array(cols * rows);
  const colliders = zone.colliders || [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = bounds.minX + (col + 0.5) * cell;
      const z = bounds.minZ + (row + 0.5) * cell;
      let solid = x < bounds.minX + radius || x > bounds.maxX - radius
        || z < bounds.minZ + radius || z > bounds.maxZ - radius;
      if (!solid) {
        for (const box of colliders) {
          if (circleHits(x, z, box, radius)) { solid = true; break; }
        }
      }
      if (solid) blocked[row * cols + col] = 1;
    }
  }
  return { minX: bounds.minX, minZ: bounds.minZ, maxX: bounds.maxX, maxZ: bounds.maxZ, cell, cols, rows, radius, blocked, colliders };
}

export function cellOf(grid, x, z) {
  const col = Math.max(0, Math.min(grid.cols - 1, Math.floor((x - grid.minX) / grid.cell)));
  const row = Math.max(0, Math.min(grid.rows - 1, Math.floor((z - grid.minZ) / grid.cell)));
  return { col, row, index: row * grid.cols + col };
}

export function centerOf(grid, col, row) {
  return { x: grid.minX + (col + 0.5) * grid.cell, z: grid.minZ + (row + 0.5) * grid.cell };
}

// ponto do chão livre? (mesma conta da colisão, sem a parte de deslize)
export function canStand(grid, x, z) {
  const r = grid.radius;
  if (x < grid.minX + r || x > grid.maxX - r) return false;
  if (z < grid.minZ + r || z > grid.maxZ - r) return false;
  for (const box of grid.colliders) if (circleHits(x, z, box, r)) return false;
  return true;
}

// célula livre mais próxima (clique em cima de um objeto, ou jogador preso)
export function nearestFreeIndex(grid, from, maxRings = 4) {
  if (!grid.blocked[from.index]) return from.index;
  for (let ring = 1; ring <= maxRings; ring += 1) {
    for (let dz = -ring; dz <= ring; dz += 1) {
      for (let dx = -ring; dx <= ring; dx += 1) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== ring) continue;
        const col = from.col + dx;
        const row = from.row + dz;
        if (col < 0 || row < 0 || col >= grid.cols || row >= grid.rows) continue;
        const index = row * grid.cols + col;
        if (!grid.blocked[index]) return index;
      }
    }
  }
  return -1;
}

// ponto válido mais próximo de (x,z) — usado para tirar a jogadora de dentro
// de um colisor (bounce de saída, objeto que empurrou) sem teleportar longe
export function nearestStandPoint(grid, x, z) {
  if (canStand(grid, x, z)) return { x, z };
  const free = nearestFreeIndex(grid, cellOf(grid, x, z), 6);
  if (free < 0) return null;
  return centerOf(grid, free % grid.cols, Math.floor(free / grid.cols));
}

// linha de visão: dá para andar reto de (ax,az) até (bx,bz) sem bater?
export function hasLineOfSight(grid, ax, az, bx, bz, step = 0.25) {
  const dist = Math.hypot(bx - ax, bz - az);
  const steps = Math.max(1, Math.ceil(dist / step));
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    if (!canStand(grid, ax + (bx - ax) * t, az + (bz - az) * t)) return false;
  }
  return true;
}

const NEIGHBORS = [
  [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
  [1, 1, SQRT2], [1, -1, SQRT2], [-1, 1, SQRT2], [-1, -1, SQRT2],
];

// A* em 8 direções. Sem corte de quina: a diagonal só passa se as duas
// ortogonais vizinhas estiverem livres, senão a julia "raspa" o canto.
export function findPath(grid, from, to, { maxExpansions = 30000 } = {}) {
  const start = nearestFreeIndex(grid, cellOf(grid, from.x, from.z));
  const goal = nearestFreeIndex(grid, cellOf(grid, to.x, to.z));
  if (start < 0 || goal < 0) return null;
  if (start === goal) {
    const goalPoint = centerOf(grid, goal % grid.cols, Math.floor(goal / grid.cols));
    return canStand(grid, to.x, to.z) ? [to] : [goalPoint];
  }

  const gx = goal % grid.cols;
  const gy = Math.floor(goal / grid.cols);
  const heuristic = (index) => {
    const dx = Math.abs((index % grid.cols) - gx);
    const dy = Math.abs(Math.floor(index / grid.cols) - gy);
    return (dx + dy) + (SQRT2 - 2) * Math.min(dx, dy);
  };

  const gScore = new Float64Array(grid.blocked.length).fill(Infinity);
  const cameFrom = new Int32Array(grid.blocked.length).fill(-1);
  const closed = new Uint8Array(grid.blocked.length);
  const open = new MinHeap();
  gScore[start] = 0;
  open.push({ index: start, f: heuristic(start) });

  let found = false;
  let expansions = 0;
  while (open.size) {
    const current = open.pop().index;
    if (closed[current]) continue;
    closed[current] = 1;
    if (current === goal) { found = true; break; }
    if (++expansions > maxExpansions) return null;

    const col = current % grid.cols;
    const row = Math.floor(current / grid.cols);
    for (const [dc, dr, cost] of NEIGHBORS) {
      const nCol = col + dc;
      const nRow = row + dr;
      if (nCol < 0 || nRow < 0 || nCol >= grid.cols || nRow >= grid.rows) continue;
      const next = nRow * grid.cols + nCol;
      if (grid.blocked[next] || closed[next]) continue;
      if (dc && dr && (grid.blocked[row * grid.cols + nCol] || grid.blocked[nRow * grid.cols + col])) continue;
      const tentative = gScore[current] + cost;
      if (tentative < gScore[next]) {
        gScore[next] = tentative;
        cameFrom[next] = current;
        open.push({ index: next, f: tentative + heuristic(next) });
      }
    }
  }
  if (!found) return null;

  const raw = [];
  for (let node = goal; node !== -1; node = cameFrom[node]) {
    raw.push(centerOf(grid, node % grid.cols, Math.floor(node / grid.cols)));
    if (node === start) break;
  }
  raw.reverse();
  raw[0] = { x: from.x, z: from.z };
  if (canStand(grid, to.x, to.z)) raw[raw.length - 1] = { x: to.x, z: to.z };
  return smoothPath(grid, raw);
}

// Rota para o destino ou, se ele estiver fechado (cerca, portão, meio de um
// prédio, quintal cercado), para o ponto alcançável mais próximo dele. A
// busca é uma flood a partir da jogadora: entre todos os lugares onde ela
// consegue chegar, escolhe o que fica mais perto do toque — assim ela sempre
// caminha na direção pedida em vez de avisar que não achou caminho.
export function findPathToNearest(grid, from, to, { maxExpansions = 30000 } = {}) {
  const direct = findPath(grid, from, to);
  if (direct) return direct;

  const start = nearestFreeIndex(grid, cellOf(grid, from.x, from.z));
  if (start < 0) return null;
  const gScore = new Float64Array(grid.blocked.length).fill(Infinity);
  const cameFrom = new Int32Array(grid.blocked.length).fill(-1);
  const closed = new Uint8Array(grid.blocked.length);
  const open = new MinHeap();
  gScore[start] = 0;
  open.push({ index: start, f: 0 });

  // melhor aproximação conhecida: mais perto do toque, desempate pelo custo
  // de caminhada (para na parede da frente, não dá a volta no prédio)
  let best = -1;
  let bestScore = Infinity;
  let expansions = 0;
  while (open.size) {
    const current = open.pop().index;
    if (closed[current]) continue;
    closed[current] = 1;
    if (++expansions > maxExpansions) break;

    const point = centerOf(grid, current % grid.cols, Math.floor(current / grid.cols));
    const score = Math.hypot(point.x - to.x, point.z - to.z) + 0.001 * gScore[current];
    if (score < bestScore) { bestScore = score; best = current; }

    const col = current % grid.cols;
    const row = Math.floor(current / grid.cols);
    for (const [dc, dr, cost] of NEIGHBORS) {
      const nCol = col + dc;
      const nRow = row + dr;
      if (nCol < 0 || nRow < 0 || nCol >= grid.cols || nRow >= grid.rows) continue;
      const next = nRow * grid.cols + nCol;
      if (grid.blocked[next] || closed[next]) continue;
      if (dc && dr && (grid.blocked[row * grid.cols + nCol] || grid.blocked[nRow * grid.cols + col])) continue;
      const tentative = gScore[current] + cost;
      if (tentative < gScore[next]) {
        gScore[next] = tentative;
        cameFrom[next] = current;
        open.push({ index: next, f: tentative });
      }
    }
  }
  if (best < 0) return null;

  const points = [];
  for (let node = best; node !== -1; node = cameFrom[node]) {
    points.push(centerOf(grid, node % grid.cols, Math.floor(node / grid.cols)));
    if (node === start) break;
  }
  points.reverse();
  points[0] = { x: from.x, z: from.z };
  return smoothPath(grid, points);
}

// string pulling: salta pontos intermediários quando dá para andar direto
function smoothPath(grid, points) {
  if (points.length < 3) return points;
  const out = [points[0]];
  let anchor = 0;
  while (anchor < points.length - 1) {
    let far = anchor + 1;
    for (let j = points.length - 1; j > anchor + 1; j -= 1) {
      if (hasLineOfSight(grid, points[anchor].x, points[anchor].z, points[j].x, points[j].z)) { far = j; break; }
    }
    out.push(points[far]);
    anchor = far;
  }
  return out;
}
