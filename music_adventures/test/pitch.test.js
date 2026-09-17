// Testes do detector de pitch: gera ondas senoidais sintéticas e verifica se
// a autocorrelação recupera a frequência certa (e trata silêncio).
import test from 'node:test';
import assert from 'node:assert/strict';
import { detectPitchFromBuffer } from '../src/mic.js';

const SAMPLE_RATE = 44100;

function sineWave(hz, seconds = 0.25, amplitude = 0.4) {
  const size = Math.floor(SAMPLE_RATE * seconds);
  const buffer = new Float32Array(size);
  for (let i = 0; i < size; i += 1) {
    buffer[i] = amplitude * Math.sin((2 * Math.PI * hz * i) / SAMPLE_RATE);
  }
  return buffer;
}

test('silêncio retorna hz inválido e clarity 0', () => {
  const buffer = new Float32Array(4096);
  const { hz, clarity } = detectPitchFromBuffer(buffer, SAMPLE_RATE);
  assert.equal(Number.isFinite(hz), false);
  assert.equal(clarity, 0);
});

test('detecta dó4 (261.63 Hz) com precisão de ±1%', () => {
  const { hz, clarity } = detectPitchFromBuffer(sineWave(261.63), SAMPLE_RATE);
  assert.ok(Number.isFinite(hz), 'deveria detectar tom');
  assert.ok(Math.abs(hz - 261.63) / 261.63 < 0.01, `hz=${hz}`);
  assert.ok(clarity >= 0.9, `clarity=${clarity}`);
});

test('detecta lá4 (440 Hz) e sol4 (392 Hz)', () => {
  for (const [target, label] of [[440, 'A4'], [392, 'G4']]) {
    const { hz } = detectPitchFromBuffer(sineWave(target), SAMPLE_RATE);
    assert.ok(Math.abs(hz - target) / target < 0.01, `${label}: hz=${hz}`);
  }
});

test('detecta dó5 (523.25 Hz) — topo da faixa vocal infantil', () => {
  const { hz } = detectPitchFromBuffer(sineWave(523.25), SAMPLE_RATE);
  assert.ok(Math.abs(hz - 523.25) / 523.25 < 0.01, `hz=${hz}`);
});

test('ruído fraco abaixo do limiar de RMS é tratado como silêncio', () => {
  const buffer = new Float32Array(4096);
  for (let i = 0; i < buffer.length; i += 1) buffer[i] = (Math.random() - 0.5) * 0.005;
  const { hz } = detectPitchFromBuffer(buffer, SAMPLE_RATE);
  assert.equal(Number.isFinite(hz), false);
});
