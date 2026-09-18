// Language Adventures — testes: integridade dos packs + pontuação de fala.
import test from 'node:test';
import assert from 'node:assert/strict';
import { PACKS, packById, flattenLessons } from '../src/packs/index.js';
import { validateVocab } from '../src/packs/builder.js';
import { normalize, similarity, gradePronunciation } from '../src/speech.js';
import { COSMETICS, normalizeState, completeLesson, emptyState } from '../src/state.js';

const BASE_LANGS = ['pt', 'en', 'es'];

test('cada pack tem 3 seções × 5 lições (spec §22 fase 1)', () => {
  for (const pack of PACKS) {
    assert.equal(pack.sections.length, 3, `${pack.id}: 3 seções`);
    for (const section of pack.sections) {
      assert.equal(section.lessons.length, 5, `${pack.id}/${section.id}: 5 lições`);
      // tipos cobrem história + pronúncia + desafio + lições
      const kinds = section.lessons.map((l) => l.kind);
      assert.ok(kinds.includes('story'), `${pack.id}/${section.id}: tem história`);
      assert.ok(kinds.includes('pronunciation'), `${pack.id}/${section.id}: tem pronúncia`);
      assert.ok(kinds.includes('challenge'), `${pack.id}/${section.id}: tem desafio`);
    }
  }
});

test('seções seguem a sequência de cores vermelho → laranja → amarelo (spec §5)', () => {
  const expected = ['#ff5e7e', '#ff9a3d', '#ffd166'];
  for (const pack of PACKS) {
    assert.deepEqual(pack.sections.map((s) => s.color), expected, pack.id);
  }
});

test('vocabulário completo: gloss em pt/en/es para todos os termos', () => {
  for (const pack of PACKS) {
    for (const section of pack.sections) {
      for (const lesson of section.lessons) {
        if (lesson.kind === 'story') {
          const error = validateVocab([lesson.word], BASE_LANGS);
          assert.equal(error, null, `${pack.id}/${lesson.id}: ${error}`);
        }
        if (lesson.kind === 'lesson' || lesson.kind === 'challenge') {
          for (const activity of lesson.activities) {
            if (activity.kind === 'match') {
              for (const pair of activity.pairs) {
                const error = validateVocab([pair], BASE_LANGS);
                assert.equal(error, null, `${pack.id}/${lesson.id}: ${error}`);
              }
            }
          }
        }
      }
    }
  }
});

test('lições com atividades têm conteúdo suficiente (≥4 passos)', () => {
  for (const pack of PACKS) {
    for (const section of pack.sections) {
      for (const lesson of section.lessons) {
        if (lesson.kind === 'lesson' || lesson.kind === 'challenge') {
          assert.ok(lesson.activities.length >= 4, `${pack.id}/${lesson.id}: ${lesson.activities.length} atividades`);
        }
      }
    }
  }
});

test('flattenLessons retorna todas as lições em ordem', () => {
  const pack = PACKS[0];
  const flat = flattenLessons(pack);
  assert.equal(flat.length, 15);
  assert.equal(flat[0].section.id, 's1');
  assert.equal(flat[14].section.id, 's3');
});

test('packById encontra por id', () => {
  assert.equal(packById('fr').name, 'Français');
  assert.equal(packById('es').flag, '🇪🇸');
  assert.equal(packById('xx'), null);
});

// ── pontuação de pronúncia (spec §9) ───────────────────────────────────────
test('normalize remove acentos, pontuação e espaços extras', () => {
  assert.equal(normalize('Bonjour !'), 'bonjour');
  assert.equal(normalize('  Je m’appelle…  '), 'je mappelle');
  assert.equal(normalize(''), '');
});

test('similarity: 1 idêntico, 0 vazio, intermediário parecido', () => {
  assert.equal(similarity('bonjour', 'Bonjour!'), 1);
  assert.equal(similarity('', 'bonjour'), 0);
  assert.ok(similarity('bonjor', 'bonjour') > 0.8);
  assert.ok(similarity('ciao', 'bonjour') < 0.4);
});

test('gradePronunciation: verde exato/contém, amarelo parecido, vermelho diferente', () => {
  assert.equal(gradePronunciation('Bonjour!', 'Bonjour !'), 'green');
  assert.equal(gradePronunciation('bonjour', 'Bonjour'), 'green');
  assert.equal(gradePronunciation('bonjr', 'bonjour'), 'yellow');
  assert.equal(gradePronunciation('ciao ciao', 'bonjour'), 'red');
  assert.equal(gradePronunciation('', 'bonjour'), 'red');
});

// ── progresso (spec §15) ───────────────────────────────────────────────────
test('completeLesson registra estrelas e desbloqueia cosmético a cada 2 lições', () => {
  const order = COSMETICS.map((c) => c.id);
  const state = emptyState();
  let unlocked = [];
  for (let i = 0; i < 4; i += 1) {
    const lessonId = `l${i}`;
    const result = completeLesson(state, lessonId, 3, order);
    if (result.newCosmetic) unlocked.push(result.newCosmetic);
  }
  assert.equal(state.completedLessons.length, 4);
  assert.equal(state.unlockedCosmetics.length, 2); // 4 lições / 2 = 2 cosméticos
  assert.equal(unlocked.length, 2);
  // repetir a mesma lição não duplica
  completeLesson(state, 'l0', 2, order);
  assert.equal(state.completedLessons.length, 4);
});

test('normalizeState sanitiza save corrompido', () => {
  const state = normalizeState({
    targetLanguage: 'frenchxxxx',
    completedLessons: [1, 'ok', null],
    stars: { l1: 9, l2: -3, l3: 'x' },
    unlockedCosmetics: ['crown', 'fake'],
    equippedCosmetics: ['glasses'], // não desbloqueado → descartado
    pronunciationAttempts: { a: 5, b: -2 },
    sound: false,
  });
  assert.equal(state.targetLanguage, 'frenchxxxx'.slice(0, 8));
  assert.deepEqual(state.completedLessons, ['ok']);
  assert.deepEqual(state.stars, { l1: 3 });
  assert.deepEqual(state.unlockedCosmetics, ['crown']);
  assert.deepEqual(state.equippedCosmetics, []);
  assert.equal(state.pronunciationAttempts.a, 5);
  assert.equal(state.sound, false);
});
