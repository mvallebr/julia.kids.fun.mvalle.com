// RPG Welling — efeitos sonoros sintetizados (Web Audio, sem downloads).

let ctx = null;
let muted = false;

export function ensureAudio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setMuted(value) {
  muted = Boolean(value);
}

function now() {
  return ensureAudio().currentTime;
}

function blip(freq, at, duration, type = 'sine', gainValue = 0.15) {
  if (muted) return;
  const c = ensureAudio();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(gainValue, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain).connect(c.destination);
  osc.start(at);
  osc.stop(at + duration + 0.02);
}

function noise(at, duration, gainValue = 0.08) {
  if (muted) return;
  const c = ensureAudio();
  const frames = Math.floor(c.sampleRate * duration);
  const buffer = c.createBuffer(1, frames, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const source = c.createBufferSource();
  const gain = c.createGain();
  source.buffer = buffer;
  gain.gain.setValueAtTime(gainValue, at);
  source.connect(gain).connect(c.destination);
  source.start(at);
}

export const sounds = {
  tap() { blip(660, now(), 0.08); },
  pickup() {
    const t = now();
    blip(784, t, 0.09, 'triangle', 0.18);
    blip(1175, t + 0.08, 0.14, 'triangle', 0.18);
  },
  correct() {
    const t = now();
    blip(523.25, t, 0.12, 'triangle', 0.2);
    blip(659.25, t + 0.1, 0.12, 'triangle', 0.2);
    blip(783.99, t + 0.2, 0.22, 'triangle', 0.2);
  },
  wrong() {
    const t = now();
    blip(311, t, 0.16, 'sawtooth', 0.06);
    blip(233, t + 0.14, 0.2, 'sawtooth', 0.06);
  },
  hoot() {
    const t = now();
    blip(392, t, 0.16, 'sine', 0.22);
    blip(330, t + 0.18, 0.26, 'sine', 0.22);
  },
  magic() {
    const t = now();
    [523, 659, 784, 1047, 1319].forEach((freq, i) => blip(freq, t + i * 0.07, 0.3, 'sine', 0.14));
    noise(t, 0.5, 0.03);
  },
  door() {
    const t = now();
    blip(98, t, 0.3, 'sine', 0.3);
    noise(t + 0.05, 0.25, 0.05);
  },
  star() {
    const t = now();
    [784, 988, 1175, 1568].forEach((freq, index) => blip(freq, t + index * 0.09, 0.18, 'triangle', 0.18));
  },
  fanfare() {
    const t = now();
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, index) => blip(freq, t + index * 0.13, 0.32, 'triangle', 0.2));
  },
};
