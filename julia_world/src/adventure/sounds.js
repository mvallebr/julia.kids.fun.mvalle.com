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
    // Estouro real: estalo de ruído + corpo grave decaindo (sintetizado).
    const ac = context();
    if (!ac) return;
    const t = ac.currentTime;
    const length = Math.floor(ac.sampleRate * 0.08);
    const noiseBuffer = ac.createBuffer(1, length, ac.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / length, 2.2);
    }
    const noise = ac.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ac.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 600;
    const snap = ac.createGain();
    snap.gain.setValueAtTime(0.35, t);
    snap.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    noise.connect(filter).connect(snap).connect(ac.destination);
    noise.start(t);
    const thump = ac.createOscillator();
    const thumpGain = ac.createGain();
    thump.type = 'sine';
    thump.frequency.setValueAtTime(180, t);
    thump.frequency.exponentialRampToValueAtTime(60, t + 0.12);
    thumpGain.gain.setValueAtTime(0.25, t);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    thump.connect(thumpGain).connect(ac.destination);
    thump.start(t);
    thump.stop(t + 0.16);
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
