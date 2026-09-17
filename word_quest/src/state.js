// The Word Quest — estado por jogadora: ouro, ferramentas, journal de
// vocabulário com domínio (mastery), habilidades e progresso de capítulos.
// Persistido em localStorage, isolado dos outros apps (spec §46).


export const STORAGE_KEY = 'mundo-da-julia.wordquest.v1';

export const LADDER = [100, 200, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
// capítulos: 3 questões cada; o índice global da questão define o degrau
export const MILESTONE_AFTER = [3, 9, 12, 18]; // fim dos capítulos 2, 4, 5, 6

export function emptyState() {
  return {
    version: 1,
    character: '',
    chapter: 0, // índice do capítulo atual (0..6)
    questionIndex: 0, // índice global da questão na run (0..20)
    gold: 0,
    secured: 0, // ouro garantido em marcos
    lifelines: { fifty: 1, family: 1, clue: 1, swap: 1 },
    crystals: 0,
    chapterDone: [], // ids de capítulos completos
    journal: {}, // word → { status, c, w, seen, lastAt, def, example }
    skills: {}, // skill → { c, w }
    runStats: { answered: 0, correct: 0, discovered: 0, goldEarned: 0 },
    storySeen: [],
    castleReached: false,
    sound: true,
  };
}

function cleanIdMap(source) {
  const result = {};
  if (!source || typeof source !== 'object') return result;
  for (const [key, value] of Object.entries(source)) {
    if (typeof key === 'string' && key) result[key] = value;
  }
  return result;
}

const MASTERIES = ['new', 'seen', 'learning', 'strong', 'mastered'];

export function normalizeState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const state = emptyState();
  state.character = source.character === 'boy' ? 'boy' : source.character === 'girl' ? 'girl' : '';
  state.chapter = Math.max(0, Math.min(6, Math.floor(source.chapter) || 0));
  state.questionIndex = Math.max(0, Math.floor(source.questionIndex) || 0);
  state.gold = Math.max(0, Math.floor(source.gold) || 0);
  state.secured = Math.max(0, Math.floor(source.secured) || 0);
  const lifelines = source.lifelines && typeof source.lifelines === 'object' ? source.lifelines : {};
  for (const key of Object.keys(state.lifelines)) {
    state.lifelines[key] = Math.max(0, Math.min(9, Math.floor(lifelines[key]) || 0));
  }
  state.crystals = Math.max(0, Math.floor(source.crystals) || 0);
  state.chapterDone = (Array.isArray(source.chapterDone) ? source.chapterDone : [])
    .filter((id) => typeof id === 'string');
  state.journal = cleanIdMap(source.journal);
  for (const [word, record] of Object.entries(state.journal)) {
    state.journal[word] = {
      status: MASTERIES.includes(record?.status) ? record.status : 'seen',
      c: Math.max(0, Math.floor(record?.c) || 0),
      w: Math.max(0, Math.floor(record?.w) || 0),
      seen: Math.max(1, Math.floor(record?.seen) || 1),
      lastAt: Math.floor(record?.lastAt) || 0,
      def: typeof record?.def === 'string' ? record.def : '',
      example: typeof record?.example === 'string' ? record.example : '',
    };
  }
  state.skills = cleanIdMap(source.skills);
  for (const [key, record] of Object.entries(state.skills)) {
    state.skills[key] = { c: Math.max(0, Math.floor(record?.c) || 0), w: Math.max(0, Math.floor(record?.w) || 0) };
  }
  const run = source.runStats && typeof source.runStats === 'object' ? source.runStats : {};
  state.runStats = {
    answered: Math.max(0, Math.floor(run.answered) || 0),
    correct: Math.max(0, Math.floor(run.correct) || 0),
    discovered: Math.max(0, Math.floor(run.discovered) || 0),
    goldEarned: Math.max(0, Math.floor(run.goldEarned) || 0),
  };
  state.storySeen = (Array.isArray(source.storySeen) ? source.storySeen : []).filter((id) => typeof id === 'string');
  state.castleReached = Boolean(source.castleReached);
  state.sound = source.sound !== false;
  return state;
}

function profileKey(name) {
  return String(name || '').trim().toLowerCase().slice(0, 32);
}

export function loadState(storage, player) {
  const key = profileKey(player);
  if (!key) return normalizeState();
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    return normalizeState(all[key]);
  } catch {
    return normalizeState();
  }
}

export function saveState(storage, player, state) {
  const key = profileKey(player);
  if (!key) return state;
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    all[key] = normalizeState(state);
    storage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // armazenamento bloqueado: segue em sessão
  }
  return state;
}

// ── domínio de vocabulário (spec §17/§18) ────────────────────────────────────
// status: new → seen → learning → strong → mastered (nunca pula degraus).

export function masteryUp(status) {
  const index = MASTERIES.indexOf(status);
  return MASTERIES[Math.min(MASTERIES.length - 1, index + 1)];
}

export function masteryDown(status) {
  const index = MASTERIES.indexOf(status);
  return MASTERIES[Math.max(1, index - 1)]; // não volta para 'new'
}

export function touchWord(state, word, data = {}) {
  if (state.journal[word]) {
    state.journal[word].seen += 1;
    state.journal[word].lastAt = Date.now();
    if (data.def && !state.journal[word].def) state.journal[word].def = data.def;
    if (data.example && !state.journal[word].example) state.journal[word].example = data.example;
    return false; // já existia
  }
  state.journal[word] = {
    status: 'new',
    c: 0,
    w: 0,
    seen: 1,
    lastAt: Date.now(),
    def: data.def || '',
    example: data.example || '',
  };
  state.runStats.discovered += 1;
  return true; // nova descoberta
}

// acerto: sobe um degrau de domínio (não pula para mastered de uma vez)
export function wordCorrect(state, word) {
  const entry = state.journal[word];
  if (!entry) return;
  entry.c += 1;
  entry.lastAt = Date.now();
  entry.status = masteryUp(entry.status);
}

// erro: desce um degrau (a palavra volta depois, em outro contexto)
export function wordWrong(state, word) {
  const entry = state.journal[word];
  if (!entry) return;
  entry.w += 1;
  entry.lastAt = Date.now();
  entry.status = masteryDown(entry.status);
}

// ── repetição espaçada leve (spec §18) ───────────────────────────────────────
// prioridade: palavras erradas recentes > em aprendizado > dominadas vencidas
export function dueWords(state, now = Date.now()) {
  const entries = Object.entries(state.journal);
  const scored = entries
    .map(([word, entry]) => {
      const ageDays = (now - entry.lastAt) / 86400000;
      let priority;
      if (entry.status === 'learning') priority = 100 + ageDays;
      else if (entry.status === 'strong') priority = 40 + ageDays * 2;
      else if (entry.status === 'mastered') priority = 10 + ageDays * 3;
      else priority = 70 + ageDays; // new/seen
      return { word, priority, status: entry.status };
    })
    .filter((entry) => entry.status !== 'new' || entry.seen === 1);
  scored.sort((a, b) => b.priority - a.priority);
  return scored;
}

// habilidade: contagem de acertos/erros por família (seleção adaptativa)
export function recordSkill(state, skill, correct) {
  if (!skill) return;
  const record = state.skills[skill] || { c: 0, w: 0 };
  if (correct) record.c += 1;
  else record.w += 1;
  state.skills[skill] = record;
}

// ── ouro e marcos ────────────────────────────────────────────────────────────
export function stakeFor(questionIndex) {
  return LADDER[Math.min(questionIndex, LADDER.length - 1)];
}

export function isMilestone(questionIndex) {
  return MILESTONE_AFTER.includes(questionIndex);
}

export function secureMilestone(state) {
  state.secured = state.gold;
  return state.secured;
}

export function failQuestion(state) {
  // errar custa o degrau atual: cai para o ouro garantido no último marco
  state.gold = state.secured;
}

export function awardGold(state, amount) {
  state.gold += amount;
  state.runStats.goldEarned += amount;
}

// ── ferramentas ──────────────────────────────────────────────────────────────
export function useLifeline(state, key) {
  if (!state.lifelines[key] || state.lifelines[key] <= 0) return false;
  state.lifelines[key] -= 1;
  return true;
}

export function useCrystal(state) {
  if (state.crystals <= 0) return false;
  state.crystals -= 1;
  return true;
}

export function grantCrystal(state) {
  state.crystals += 1;
}

// 50/50 nunca remove a correta
export function fiftyFifty(options) {
  const wrong = options.filter((option) => !option.correct);
  // embaralha localmente (sem dependência do rng do jogo)
  const pool = [...wrong];
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swap]] = [pool[swap], pool[index]];
  }
  const remove = new Set(pool.slice(0, 2).map((option) => option.text));
  return options.map((option) => ({ ...option, hidden: remove.has(option.text) }));
}

