// Efeitos sonoros curtos sintetizados via WebAudio — sem assets, sem autoplay:
// só tocam em resposta a gestos do jogador (spec §34).
let ctx = null;

function context() {
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

export const sounds = {
  tap: () => tone(480, 0, 0.07, 'square', 0.035),
  pop: () => {
    tone(720, 0, 0.05, 'square', 0.045);
    tone(240, 0.02, 0.09, 'sawtooth', 0.035);
  },
  open: () => {
    tone(523, 0, 0.12);
    tone(659, 0.09, 0.12);
    tone(784, 0.18, 0.22);
  },
  fanfare: () => {
    [523, 659, 784, 1047].forEach((freq, index) => tone(freq, index * 0.12, 0.26, 'triangle', 0.06));
  },
  mega: () => {
    [392, 523, 659, 784, 1047, 1319].forEach((freq, index) => tone(freq, index * 0.1, 0.32, 'triangle', 0.06));
  },
};
