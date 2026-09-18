// Music Adventures — núcleo puro de teoria e progressão (sem DOM/áudio).
// Tudo que envolve Hz ↔ MIDI ↔ solfejo, melodias das atividades, níveis e
// pontuação vive aqui para ser testável em Node.

// ── notas e afinação ────────────────────────────────────────────────────────
// Uma oitava amigável para voz infantil: C4 (dó) … C5 (dó).
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const SOLFEGE = ['dó', 'dó♯', 'ré', 'ré♯', 'mi', 'fá', 'fá♯', 'sol', 'sol♯', 'lá', 'lá♯', 'si'];

// Graus da escala maior de dó (semitons a partir de C).
export const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11, 12];

// Notas brancas do dó4 ao dó5, como botões de atividade (índice = grau).
export const SCALE_DEGREES = 8; // dó ré mi fá sol lá si dó

export function degreeToMidi(degree, baseOctave = 4) {
  // degree 0..7 dentro da oitava; dó4 = MIDI 60.
  return 12 * (baseOctave + 1) + MAJOR_SCALE[Math.max(0, Math.min(7, degree))];
}

export function midiToHz(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function hzToMidi(hz) {
  return 69 + 12 * Math.log2(hz / 440);
}

export function midiName(midi) {
  const name = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${name}${octave}`;
}

export function midiSolfege(midi) {
  return SOLFEGE[((midi % 12) + 12) % 12];
}

// Desvio em cents entre a voz (hz) e o MIDI alvo (sinal: positivo = cantou agudo).
export function centsOff(hz, targetMidi) {
  const targetHz = midiToHz(targetMidi);
  return 1200 * Math.log2(hz / targetHz);
}

// Nota mais próxima (MIDI inteiro) de uma frequência.
export function nearestMidi(hz) {
  return Math.round(hzToMidi(hz));
}

// ── cores por grau (identidade visual dos botões/notas) ─────────────────────
export const DEGREE_COLORS = ['#ff5e7e', '#ff9a3d', '#ffd166', '#a8e05f', '#4ecdc4', '#6ca6ff', '#c7a6ff', '#ff6bd6'];

// ── melodias públicas (graus da escala, 0 = dó) ─────────────────────────────
// Trechos curtos e familiares, domínio público, todos cabem em dó–dó.
export const SING_SONGS = [
  { id: 'twinkle', name: 'Twinkle Twinkle', notes: [0, 0, 4, 4, 5, 5, 4], beats: [1, 1, 1, 1, 1, 1, 2] },
  { id: 'mary', name: 'Mary Had a Little Lamb', notes: [2, 1, 0, 1, 2, 2, 2], beats: [1, 1, 1, 1, 1, 1, 2] },
  { id: 'ode', name: 'Ode to Joy', notes: [0, 0, 1, 2, 2, 1, 0], beats: [1, 1, 1, 1, 1, 1, 2] },
  { id: 'row', name: 'Row Your Boat', notes: [0, 0, 0, 1, 2, 2, 1], beats: [1, 1, 1.5, 0.5, 1, 1, 2] },
  { id: 'jingle', name: 'Jingle Bells', notes: [4, 4, 4, 0, 1, 2, 2], beats: [1, 1, 2, 1, 1, 1, 2] },
  { id: 'birthday', name: 'Happy Birthday', notes: [4, 4, 5, 4, 6, 5], beats: [0.75, 0.25, 1, 1, 1, 2] },
  { id: 'rainbow', name: 'Somewhere Over the Rainbow', notes: [0, 4, 7, 4, 7, 6, 5], beats: [1, 1.5, 1, 0.5, 1, 1, 2] },
  { id: 'frere', name: 'Frère Jacques', notes: [0, 1, 2, 0, 0, 1, 2, 0], beats: [1, 1, 1, 1, 1, 1, 1, 1] },
];

// ── níveis do Detetive de Ouvir ─────────────────────────────────────────────
// Cada nível: quantas notas toca, quantas opções aparecem, tolerância.
export const LISTEN_LEVELS = [
  { level: 1, length: 2, noteChoices: 3 },
  { level: 2, length: 2, noteChoices: 4 },
  { level: 3, length: 3, noteChoices: 4 },
  { level: 4, length: 3, noteChoices: 5 },
  { level: 5, length: 4, noteChoices: 5 },
  { level: 6, length: 4, noteChoices: 6 },
  { level: 7, length: 5, noteChoices: 6 },
  { level: 8, length: 5, noteChoices: 8 },
  { level: 9, length: 6, noteChoices: 8 },
  { level: 10, length: 7, noteChoices: 8 },
];

// Notas candidatas de cada nível: sempre começa em dó e sobe pela escala
// (sem salto cromático) — ouvido infantil aprende melhor assim.
export function listenOptions(noteChoices) {
  return Array.from({ length: noteChoices }, (_, index) => index);
}

// Gera a melodia de um nível do Detetive: graus aleatórios mas cantáveis
// (sem repetir a nota anterior; máximo de 4 graus de salto).
export function generateListenMelody(length, noteChoices, rng = Math.random) {
  const options = listenOptions(noteChoices);
  const notes = [];
  for (let index = 0; index < length; index += 1) {
    let candidates = options.filter((degree) => degree !== notes[index - 1]);
    if (notes.length) {
      candidates = candidates.filter((degree) => Math.abs(degree - notes[index - 1]) <= 4);
    }
    notes.push(candidates[Math.floor(rng() * candidates.length)]);
  }
  return notes;
}

// ── pontuação de canto (puramente matemática) ───────────────────────────────
// Tolerância gentil para voz infantil: ±60 cents é "afinado", ±100 "quase".
export const TOLERANCE_GOOD = 60;
export const TOLERANCE_OK = 100;

// Crianças often cantar a nota certa em outra oitava — isso NÃO é erro de
// afinação. Normaliza o desvio para [-600, +600) antes de avaliar.
export function normalizeOctaveCents(cents) {
  return (((cents + 600) % 1200) + 1200) % 1200 - 600;
}

export function gradeNote(deviations) {
  // deviations: lista de centsOff medidos durante a nota (ignora silêncio).
  const valid = deviations.filter((cents) => Number.isFinite(cents)).map(normalizeOctaveCents);
  if (!valid.length) return 'miss';
  // Mediana: imune a picos de ruído/consoantes.
  const sorted = [...valid].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const abs = Math.abs(median);
  if (abs <= TOLERANCE_GOOD) return 'good';
  if (abs <= TOLERANCE_OK) return 'ok';
  return 'off';
}

export function gradeSong(noteGrades) {
  const score = noteGrades.reduce((sum, grade) => sum + (grade === 'good' ? 1 : grade === 'ok' ? 0.6 : 0), 0);
  const ratio = noteGrades.length ? score / noteGrades.length : 0;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.65) return 2;
  return 1;
}

export function gradeListen(mistakes, length) {
  // Detetive: estrelas por erros cometidos ao reconstruir a melodia.
  if (mistakes === 0) return 3;
  if (mistakes <= Math.max(1, Math.floor(length / 3))) return 2;
  return 1;
}

// ── progressão ──────────────────────────────────────────────────────────────
export const SING_LEVELS = SING_SONGS.map((song, index) => ({ level: index + 1, songId: song.id, tempo: Math.max(84, 132 - index * 6) }));

export function nextLockedLevel(levels, stars, activity) {
  for (const entry of levels) {
    if (!stars[activity]?.[entry.level]) return entry.level;
  }
  return null; // tudo destravado
}

export function totalStars(stars) {
  let sum = 0;
  for (const activity of Object.keys(stars || {})) {
    for (const value of Object.values(stars[activity])) sum += value;
  }
  return sum;
}
