// RPG Welling — vocabulário com repetição espaçada (Leitner simplificado).
// Palavras aprendidas via glosas ✨ voltam pra revisão pela coruja: acertou,
// o intervalo dobra; errou, volta em 10 minutos.

const DAY = 24 * 60 * 60 * 1000;
const MAX_WORDS = 60;

// registra (ou atualiza) uma palavra vista numa glosa
export function registerWord(words, word, gloss) {
  if (!words || !word || !gloss) return;
  if (!words[word]) {
    if (Object.keys(words).length >= MAX_WORDS) return;
    words[word] = { pt: gloss.pt, streak: 0, due: Date.now() + DAY };
  }
}

// palavras com revisão vencida, mais vencida primeiro
export function dueWords(words, now = Date.now()) {
  return Object.entries(words || {})
    .filter(([, w]) => w.due <= now)
    .sort((a, b) => a[1].due - b[1].due);
}

// resposta correta? avança o streak e agenda daqui a 2^streak dias (cap 30)
export function answerCorrect(words, word, now = Date.now()) {
  const w = words[word];
  if (!w) return;
  w.streak = Math.min((w.streak || 0) + 1, 30);
  w.due = now + Math.min(2 ** w.streak, 30) * DAY;
}

// resposta errada? reseta e revisa em 10 minutos
export function answerWrong(words, word, now = Date.now()) {
  const w = words[word];
  if (!w) return;
  w.streak = 0;
  w.due = now + 10 * 60 * 1000;
}

// quiz de múltipla escolha: prompt em pt, 3 opções em en, 1 correta
export function buildQuiz(words, word) {
  const correct = words[word];
  if (!correct) return null;
  const distractors = Object.entries(words)
    .filter(([w]) => w !== word)
    .map(([, w]) => w.pt)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  while (distractors.length < 2) {
    distractors.push(['a tall wall', 'a small door', 'an old map', 'a red hat'][Math.floor(Math.random() * 4)]);
  }
  const options = [correct.pt, ...distractors]
    .map((text) => ({ text, correct: text === correct.pt }))
    .sort(() => Math.random() - 0.5);
  return { word, options };
}

// valida o mapa vindo do storage (normalizeState)
export function normalizeWords(value) {
  const source = value && typeof value === 'object' ? value : {};
  const out = {};
  for (const [word, w] of Object.entries(source).slice(0, MAX_WORDS)) {
    if (typeof word !== 'string' || word.length > 30 || !w || typeof w !== 'object') continue;
    if (typeof w.pt !== 'string' || w.pt.length > 120) continue;
    out[word] = {
      pt: w.pt,
      streak: Number.isFinite(w.streak) ? Math.max(0, Math.min(30, w.streak)) : 0,
      due: Number.isFinite(w.due) ? w.due : 0,
    };
  }
  return out;
}
