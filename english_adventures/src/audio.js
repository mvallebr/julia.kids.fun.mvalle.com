// Sons curtos sintetizados via WebAudio — mesma postura do atlas (sem assets,
// sem autoplay; só tocam em resposta a gestos). Mute persiste no estado.

let ctx = null;
let muted = false;

export function setMuted(value) {
  muted = Boolean(value);
}

function context() {
  if (muted) return null;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq, start, duration, type = 'sine', gain = 0.05) {
  const ac = context();
  if (!ac) return;
  const oscillator = ac.createOscillator();
  const volume = ac.createGain();
  oscillator.type = type;
  oscillator.frequency.value = freq;
  volume.gain.setValueAtTime(gain, ac.currentTime + start);
  volume.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + duration);
  oscillator.connect(volume).connect(ac.destination);
  oscillator.start(ac.currentTime + start);
  oscillator.stop(ac.currentTime + start + duration + 0.02);
}

// Glissando rápido para cima — "o mundo respondeu".
function sparkle(start = 0, base = 880) {
  [0, 4, 7, 12].forEach((semi, index) => {
    tone(base * Math.pow(2, semi / 12), start + index * 0.05, 0.18, 'triangle', 0.045);
  });
}

export const sounds = {
  tap: () => tone(480, 0, 0.06, 'square', 0.03),
  step: () => tone(320 + Math.random() * 40, 0, 0.04, 'sine', 0.012),
  correct: () => {
    sparkle(0, 780);
    tone(1568, 0.22, 0.3, 'sine', 0.05);
  },
  wrong: () => {
    // Suave e curto, sem assustar (spec §12/§28).
    tone(330, 0, 0.12, 'sine', 0.04);
    tone(294, 0.12, 0.16, 'sine', 0.035);
  },
  open: () => {
    tone(523, 0, 0.12);
    tone(659, 0.09, 0.12);
    tone(784, 0.18, 0.22);
  },
  badge: () => {
    [659, 784, 988, 1319].forEach((freq, index) => tone(freq, index * 0.09, 0.24, 'triangle', 0.055));
  },
  fanfare: () => {
    [523, 659, 784, 1047].forEach((freq, index) => tone(freq, index * 0.12, 0.26, 'triangle', 0.06));
  },
  mega: () => {
    [392, 523, 659, 784, 1047, 1319, 1568].forEach((freq, index) => tone(freq, index * 0.1, 0.34, 'triangle', 0.06));
    sparkle(0.35, 1047);
  },
  path: () => sparkle(0, 1175),
};
