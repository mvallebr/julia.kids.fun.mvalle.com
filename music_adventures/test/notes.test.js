// Testes do núcleo do Music Adventures: teoria de notas, geração de melodias,
// pontuação de canto/ouvido e progressão.
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  degreeToMidi, midiToHz, hzToMidi, midiName, midiSolfege, centsOff, nearestMidi,
  generateListenMelody, listenOptions, gradeNote, gradeSong, gradeListen, normalizeOctaveCents,
  LISTEN_LEVELS, SING_LEVELS, SING_SONGS, nextLockedLevel, totalStars,
} from '../src/notes.js';

test('graus da escala mapeiam para MIDI esperado (dó4 = 60)', () => {
  assert.equal(degreeToMidi(0), 60); // dó
  assert.equal(degreeToMidi(2), 64); // mi
  assert.equal(degreeToMidi(4), 67); // sol
  assert.equal(degreeToMidi(7), 72); // dó5
});

test('MIDI ↔ Hz ↔ MIDI é consistente', () => {
  for (let midi = 55; midi <= 79; midi += 1) {
    const hz = midiToHz(midi);
    assert.ok(Math.abs(hzToMidi(hz) - midi) < 1e-9, `midi ${midi}`);
  }
  assert.equal(midiToHz(69), 440);
});

test('nomes de nota e solfejo', () => {
  assert.equal(midiName(60), 'C4');
  assert.equal(midiName(69), 'A4');
  assert.equal(midiSolfege(60), 'dó');
  assert.equal(midiSolfege(64), 'mi');
  assert.equal(midiSolfege(67), 'sol');
});

test('centsOff: voz afinada perto de zero, agudo positivo', () => {
  assert.equal(Math.round(centsOff(440, 69)), 0);
  // meio tom acima = +100 cents
  assert.equal(Math.round(centsOff(midiToHz(70), 69)), 100);
  // meio tom abaixo = -100 cents
  assert.equal(Math.round(centsOff(midiToHz(68), 69)), -100);
});

test('nearestMidi arredonda para a nota mais próxima', () => {
  assert.equal(nearestMidi(435), 69); // levemente abaixo de lá4 → 69
  assert.equal(nearestMidi(450), 69);
  assert.equal(nearestMidi(466.16), 70); // lá#4
});

test('gerador de melodia: tamanho, notas no conjunto e sem salto excessivo', () => {
  const melody = generateListenMelody(7, 8);
  assert.equal(melody.length, 7);
  const allowed = listenOptions(8);
  for (let i = 0; i < melody.length; i += 1) {
    assert.ok(allowed.includes(melody[i]), `nota ${melody[i]} fora do conjunto`);
    if (i > 0) {
      assert.notEqual(melody[i], melody[i - 1], 'nota repetida em sequência');
      assert.ok(Math.abs(melody[i] - melody[i - 1]) <= 4, 'salto maior que 4 graus');
    }
  }
});

test('gradeNote classifica por mediana (robusto a picos)', () => {
  assert.equal(gradeNote([]), 'miss');
  assert.equal(gradeNote([NaN]), 'miss');
  // afinado com um pico isolado de 300 cents — a mediana ignora
  assert.equal(gradeNote([10, 20, 15, 300, 12]), 'good');
  assert.equal(gradeNote([75, 80, 70]), 'ok');
  assert.equal(gradeNote([150, 160, 140]), 'off');
});

test('gradeSong: 3 estrelas ≥90%, 2 estrelas ≥65%, senão 1', () => {
  assert.equal(gradeSong(['good', 'good', 'good']), 3);
  assert.equal(gradeSong(['good', 'good', 'ok']), 2);   // (1+1+.6)/3 ≈ .87 → 2
  assert.equal(gradeSong(['ok', 'ok', 'ok']), 1);       // .6 < .65 → 1
  assert.equal(gradeSong(['off', 'off', 'off']), 1);
  assert.equal(gradeSong([]), 1);
  // longa: 9 de 10 boas = .9 → 3
  assert.equal(gradeSong(['good', 'good', 'good', 'good', 'good', 'good', 'good', 'good', 'good', 'off']), 3);
});

test('oitava não conta como erro (criança canta agudo/grave)', () => {
  assert.equal(normalizeOctaveCents(1200), 0);
  assert.equal(normalizeOctaveCents(-1200), 0);
  assert.equal(normalizeOctaveCents(1200 + 30), 30);
  assert.equal(normalizeOctaveCents(-1200 - 40), -40);
  // nota certa em oitava diferente = afinada
  assert.equal(gradeNote([1200, 1195, 1205]), 'good');
  assert.equal(gradeNote([-1200, -1190]), 'good');
});

test('gradeListen: sem erro = 3 estrelas; margem generosa = 2', () => {
  assert.equal(gradeListen(0, 5), 3);
  assert.equal(gradeListen(1, 5), 2);
  assert.equal(gradeListen(3, 5), 1);
});

test('níveis do detetive são progressivos e coerentes', () => {
  assert.equal(LISTEN_LEVELS.length, 10);
  for (let i = 1; i < LISTEN_LEVELS.length; i += 1) {
    const previous = LISTEN_LEVELS[i - 1];
    const current = LISTEN_LEVELS[i];
    assert.ok(current.length >= previous.length, 'comprimento deve crescer ou manter');
    assert.ok(current.noteChoices >= previous.noteChoices, 'opções devem crescer ou manter');
  }
});

test('canções de canto: notas dentro da oitava e batidas positivas', () => {
  assert.equal(SING_LEVELS.length, SING_SONGS.length);
  for (const song of SING_SONGS) {
    assert.equal(song.notes.length, song.beats.length, `${song.id}: notas e batidas batem`);
    assert.ok(song.notes.length >= 5 && song.notes.length <= 10, `${song.id}: tamanho razoável`);
    for (const degree of song.notes) {
      assert.ok(degree >= 0 && degree <= 7, `${song.id}: grau ${degree} fora da oitava`);
    }
    for (const beat of song.beats) assert.ok(beat > 0);
  }
});

test('progressão: próximo nível trancado e total de estrelas', () => {
  const stars = { listen: { 1: 3, 2: 2 }, sing: { 1: 1 } };
  assert.equal(nextLockedLevel(LISTEN_LEVELS, stars, 'listen'), 3);
  assert.equal(nextLockedLevel(SING_LEVELS, stars, 'sing'), 2);
  assert.equal(totalStars(stars), 6);
  // tudo completo → null
  const complete = { listen: Object.fromEntries(LISTEN_LEVELS.map((l) => [l.level, 3])), sing: {} };
  assert.equal(nextLockedLevel(LISTEN_LEVELS, complete, 'listen'), null);
  assert.equal(totalStars(complete), 30);
});
