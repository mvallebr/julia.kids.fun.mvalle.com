// Music Adventures — motor de áudio (Web Audio API, sem assets de som).
// Sintetizador para tocar as melodias-alvo + efeitos de interface.

import { degreeToMidi, midiToHz } from './notes.js';

let context = null;
let muted = false;

export function ensureAudio() {
  if (!context) context = new (window.AudioContext || window.webkitAudioContext)();
  if (context.state === 'suspended') context.resume();
  return context;
}

export function setMuted(value) {
  muted = Boolean(value);
}

function now() {
  return ensureAudio().currentTime;
}

// Um tom de "flauta suave": triangle + envelope ADSR curto, leve vibrato.
function playTone(freq, startAt, duration, gainValue = 0.22) {
  if (muted) return;
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  // envelope: ataque rápido, sustain suave, release sem clique
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(gainValue, startAt + 0.03);
  gain.gain.setValueAtTime(gainValue, startAt + Math.max(0.06, duration - 0.08));
  gain.gain.linearRampToValueAtTime(0.0001, startAt + duration);

  osc.connect(gain).connect(ctx.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

// Toca uma sequência de graus da escala; retorna a duração total em segundos.
export function playMelody(degrees, tempo = 108, baseOctave = 4, onNote) {
  const beat = 60 / tempo;
  let cursor = now() + 0.08;
  let index = 0;
  for (const degree of degrees) {
    const midi = degreeToMidi(degree, baseOctave);
    const hz = midiToHz(midi);
    const duration = beat * 0.92;
    playTone(hz, cursor, duration);
    if (onNote) {
      const at = (cursor - now()) * 1000;
      setTimeout(() => onNote(index, degree), Math.max(0, at));
    }
    cursor += beat;
    index += 1;
  }
  return (cursor - now()) * 1000;
}

export function playDegree(degree, duration = 0.55, baseOctave = 4) {
  const hz = midiToHz(degreeToMidi(degree, baseOctave));
  playTone(hz, now() + 0.02, duration, 0.25);
}

export function playHzFeedback(hz) {
  // Tom curto na frequência que a criança cantou (espelho sonoro).
  if (!Number.isFinite(hz) || hz < 60 || hz > 1400) return;
  playTone(hz, now() + 0.01, 0.28, 0.14);
}

// ── efeitos de interface ────────────────────────────────────────────────────
function blip(freq, at, duration, type = 'sine', gainValue = 0.16) {
  if (muted) return;
  const ctx = ensureAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(gainValue, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + duration + 0.02);
}

export const sounds = {
  tap() { blip(660, now(), 0.08); },
  pop() { blip(880, now(), 0.1, 'triangle'); },
  correct() {
    const t = now();
    blip(523.25, t, 0.12, 'triangle', 0.2);
    blip(659.25, t + 0.1, 0.12, 'triangle', 0.2);
    blip(783.99, t + 0.2, 0.22, 'triangle', 0.2);
  },
  wrong() {
    const t = now();
    blip(311, t, 0.16, 'sawtooth', 0.08);
    blip(233, t + 0.14, 0.22, 'sawtooth', 0.08);
  },
  star() {
    const t = now();
    [784, 988, 1175, 1568].forEach((freq, index) => blip(freq, t + index * 0.09, 0.18, 'triangle', 0.18));
  },
  fanfare() {
    const t = now();
    const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, index) => blip(freq, t + index * 0.13, index === notes.length - 1 ? 0.5 : 0.14, 'triangle', 0.2));
  },
  micOn() {
    const t = now();
    blip(440, t, 0.1);
    blip(880, t + 0.1, 0.16);
  },
};
