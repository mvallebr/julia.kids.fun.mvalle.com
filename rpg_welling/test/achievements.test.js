// RPG Welling — conquistas: contrato público, limites e avaliação defensiva.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_IDS,
  achievementById,
  achievementStats,
  evaluateAchievements,
} from '../src/achievements.js';

const DAY = 24 * 60 * 60 * 1000;

function localKey(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function daysAgo(count) {
  const now = new Date();
  return localKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - count));
}

function makeWords(count, streak = 0) {
  return Object.fromEntries(Array.from({ length: count }, (_, index) => [
    `word${index}`,
    { pt: `palavra ${index}`, streak, due: Date.now() + DAY },
  ]));
}

function makeHistory(count, entry = { added: 1, right: 0, wrong: 0 }) {
  return Object.fromEntries(Array.from({ length: count }, (_, offset) => [
    daysAgo(count - 1 - offset), entry,
  ]));
}

function emptyFixture() {
  return {
    words: {}, clues: [], mapPieces: [], challenges: {}, duelWins: 0,
    flags: {}, history: {},
  };
}

function hasNewAchievement(id, field, value) {
  return evaluateAchievements([], { ...emptyFixture(), [field]: value }).includes(id);
}

function makeCompleteState() {
  return {
    words: makeWords(90, 3),
    clues: ['one', 'two', 'three', 'four', 'five', 'six'],
    mapPieces: ['finch', 'page', 'shelf', 'trolley'],
    challenges: { vocabFinch: true, compPage: true, fractionMap: true, hidden: false },
    duelWins: 10,
    flags: {
      visited_woods: true,
      visited_highstreet: true,
      visited_academy: true,
      visited_classroom: true,
      endingSeen: true,
      umbrellaDone: true,
      ch2Done: true,
    },
    history: makeHistory(7, { added: 0, right: 5, wrong: 0 }),
  };
}

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

test('catálogo tem 19 conquistas com conteúdo trilíngue válido', () => {
  assert.equal(ACHIEVEMENTS.length, 19);
  assert.equal(new Set(ACHIEVEMENT_IDS).size, ACHIEVEMENTS.length);
  for (const item of ACHIEVEMENTS) {
    assert.match(item.id, /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);
    assert.ok(['bronze', 'silver', 'gold'].includes(item.tier));
    assert.equal(typeof item.check, 'function');
    for (const field of [item.text, item.hint]) {
      for (const language of ['pt', 'en', 'es']) {
        assert.equal(typeof field[language], 'string');
        assert.ok(field[language].trim().length > 0);
      }
    }
    const titleWords = item.text.en.trim().split(/\s+/).length;
    assert.ok(titleWords >= 2 && titleWords <= 4, `${item.id} tem título curto`);
  }
  assert.equal(achievementById('first-word').text.pt, 'Primeira palavra');
  assert.equal(achievementById('first-word').text.en, 'First word');
  assert.equal(achievementById('first-word').text.es, 'Primera palabra');
});

test('ids e níveis formam a lista pública estável', () => {
  assert.deepEqual(ACHIEVEMENTS.map(({ id, tier }) => [id, tier]), [
    ['first-word', 'bronze'],
    ['word-collector', 'bronze'],
    ['word-champion', 'silver'],
    ['word-legend', 'gold'],
    ['word-master', 'silver'],
    ['first-clue', 'bronze'],
    ['clue-hunter', 'gold'],
    ['puzzle-solver', 'bronze'],
    ['map-maker', 'silver'],
    ['four-places', 'silver'],
    ['first-duel', 'bronze'],
    ['duel-trio', 'silver'],
    ['duel-champion', 'gold'],
    ['three-day-learner', 'silver'],
    ['week-learner', 'gold'],
    ['five-right', 'silver'],
    ['chapter-one', 'gold'],
    ['kind-helper', 'bronze'],
    ['chapter-two', 'gold'],
  ]);
});

test('achievementById encontra definições e rejeita ids desconhecidos', () => {
  assert.equal(achievementById('first-word')?.id, 'first-word');
  assert.equal(achievementById('not-shipped'), undefined);
  assert.equal(achievementById({ toString: () => 'first-word' }), undefined);
});

test('textos de cinco acertos e mestria explicam exatamente a regra', () => {
  const fiveRight = achievementById('five-right');
  assert.match(fiveRight.hint.en, /at least one word right.+5 different days/i);
  assert.match(fiveRight.hint.pt, /pelo menos uma palavra.+5 dias diferentes/i);
  assert.match(fiveRight.hint.es, /al menos una palabra.+5 días diferentes/i);

  const wordMaster = achievementById('word-master');
  assert.match(wordMaster.hint.en, /(ten|10) different words.+three times each/i);
  assert.match(wordMaster.hint.pt, /(dez|10) palavras diferentes.+três vezes cada uma/i);
  assert.match(wordMaster.hint.es, /(diez|10) palabras diferentes.+tres veces cada una/i);
});

test('contagens de palavras ativam exatamente 1, 10, 25 e 90', () => {
  for (const [id, threshold] of [
    ['first-word', 1],
    ['word-collector', 10],
    ['word-champion', 25],
    ['word-legend', 90],
  ]) {
    assert.equal(hasNewAchievement(id, 'words', makeWords(threshold - 1)), false, `${id} antes de ${threshold}`);
    assert.equal(hasNewAchievement(id, 'words', makeWords(threshold)), true, `${id} em ${threshold}`);
    assert.equal(hasNewAchievement(id, 'words', makeWords(threshold + 1)), true, `${id} depois de ${threshold}`);
  }
});

test('pistas ativam exatamente 1 e 6', () => {
  const words = (count) => Array.from({ length: count }, (_, index) => `page${index}`);
  assert.equal(hasNewAchievement('first-clue', 'clues', words(0)), false);
  assert.equal(hasNewAchievement('first-clue', 'clues', words(1)), true);
  assert.equal(hasNewAchievement('clue-hunter', 'clues', words(5)), false);
  assert.equal(hasNewAchievement('clue-hunter', 'clues', words(6)), true);
  assert.equal(hasNewAchievement('clue-hunter', 'clues', words(7)), true);
});

test('peças do mapa e desafios ativam nos seus limites exatos', () => {
  const pieces = (count) => ['finch', 'page', 'shelf', 'trolley'].slice(0, count);
  assert.equal(hasNewAchievement('map-maker', 'mapPieces', pieces(3)), false);
  assert.equal(hasNewAchievement('map-maker', 'mapPieces', pieces(4)), true);

  const challenges = (count) => Object.fromEntries(
    Array.from({ length: count }, (_, index) => [`challenge${index}`, true]),
  );
  assert.equal(hasNewAchievement('puzzle-solver', 'challenges', challenges(2)), false);
  assert.equal(hasNewAchievement('puzzle-solver', 'challenges', challenges(3)), true);
  assert.equal(hasNewAchievement('puzzle-solver', 'challenges', challenges(4)), true);
});

test('quatro lugares exige as quatro zonas permitidas e ignora school e flags falsas', () => {
  const flags = (...zones) => Object.fromEntries(zones.map((zone) => [`visited_${zone}`, true]));
  const evaluateZones = (value) => evaluateAchievements([], { ...emptyFixture(), flags: value }).includes('four-places');

  assert.equal(evaluateZones(flags('school', 'woods', 'highstreet', 'academy')), false);
  assert.equal(evaluateZones(flags('woods', 'highstreet', 'academy', 'classroom')), true);
  assert.equal(evaluateZones(flags('school', 'woods', 'highstreet', 'academy', 'fake')), false);
});

test('vitórias em duelos ativam exatamente 1, 3 e 10', () => {
  for (const [id, threshold] of [
    ['first-duel', 1],
    ['duel-trio', 3],
    ['duel-champion', 10],
  ]) {
    assert.equal(hasNewAchievement(id, 'duelWins', threshold - 1), false, `${id} antes de ${threshold}`);
    assert.equal(hasNewAchievement(id, 'duelWins', threshold), true, `${id} em ${threshold}`);
    assert.equal(hasNewAchievement(id, 'duelWins', threshold + 1), true, `${id} depois de ${threshold}`);
  }
});

test('sequências de dias de estudo ativam exatamente 3 e 7', () => {
  assert.equal(hasNewAchievement('three-day-learner', 'history', makeHistory(2)), false);
  assert.equal(hasNewAchievement('three-day-learner', 'history', makeHistory(3)), true);
  assert.equal(hasNewAchievement('three-day-learner', 'history', makeHistory(4)), true);
  assert.equal(hasNewAchievement('week-learner', 'history', makeHistory(6)), false);
  assert.equal(hasNewAchievement('week-learner', 'history', makeHistory(7)), true);
  assert.equal(hasNewAchievement('week-learner', 'history', makeHistory(8)), true);
});

test('cinco acertos exige acertos em cinco dias diferentes', () => {
  const rightOnDays = (count) => makeHistory(count, { added: 0, right: 1, wrong: 0 });
  assert.equal(hasNewAchievement('five-right', 'history', rightOnDays(4)), false);
  assert.equal(hasNewAchievement('five-right', 'history', rightOnDays(5)), true);
  assert.equal(hasNewAchievement('five-right', 'history', rightOnDays(6)), true);
  assert.equal(hasNewAchievement('five-right', 'history', {
    [daysAgo(0)]: { added: 0, right: 1, wrong: 0 },
  }), false);
  assert.equal(hasNewAchievement('five-right', 'history', {
    [daysAgo(0)]: { added: 0, right: 10, wrong: 0 },
  }), false);
});

test('palavras dominadas ativam exatamente 10 entradas distintas com três acertos', () => {
  assert.equal(hasNewAchievement('word-master', 'words', makeWords(9, 3)), false);
  assert.equal(hasNewAchievement('word-master', 'words', makeWords(10, 3)), true);
  assert.equal(hasNewAchievement('word-master', 'words', makeWords(11, 3)), true);
  assert.equal(hasNewAchievement('word-master', 'words', makeWords(10, 2)), false);
});

test('flags finais usam exatamente o progresso que a aventura grava', () => {
  assert.equal(hasNewAchievement('chapter-one', 'flags', { endingSeen: true }), true);
  assert.equal(hasNewAchievement('chapter-one', 'flags', { endingSeen: false }), false);
  assert.equal(hasNewAchievement('kind-helper', 'flags', { umbrellaDone: true }), true);
  assert.equal(hasNewAchievement('kind-helper', 'flags', { umbrellaDone: false }), false);
});

test('achievementStats resume contadores, flags, dias e dias com acertos', () => {
  const stats = achievementStats({
    words: {
      easy: { streak: 3, due: 0 },
      hard: { streak: 2, due: Date.now() + DAY },
    },
    clues: ['a', 'b'],
    mapPieces: ['finch', 'page'],
    challenges: { one: true, two: 0, three: true },
    duelWins: 4.9,
    flags: {
      visited_woods: true,
      visited_academy: 0,
      visited_highstreet: 1,
      visited_school: true,
      visited_fake: true,
      endingSeen: true,
      umbrellaDone: false,
    },
    history: {
      [daysAgo(1)]: { added: 2, right: 3, wrong: 0 },
      [daysAgo(0)]: { added: 0, right: 6, wrong: 1 },
    },
  });

  assert.equal(stats.words, 2);
  assert.equal(stats.mastered, 1);
  assert.equal(stats.due, 1);
  assert.equal(stats.clues, 2);
  assert.equal(stats.mapPieces, 2);
  assert.equal(stats.challenges, 2);
  assert.equal(stats.duelWins, 4);
  assert.equal(stats.zonesVisited, 2);
  assert.deepEqual(stats.history, { added: 2, right: 9, wrong: 1 });
  assert.equal(stats.studyStreak, 2);
  assert.equal(stats.daysPlayed, 2);
  assert.equal(stats.correctDays, 2);
  assert.equal(stats.endingSeen, true);
  assert.equal(stats.helpedTeacher, false);
});

test('histórico corrompido vira zeros sem lançar', () => {
  for (const value of [null, undefined, 42, [], { words: [], flags: 'bad', history: 7 }]) {
    const stats = achievementStats(value);
    assert.equal(stats.words, 0);
    assert.equal(stats.mastered, 0);
    assert.equal(stats.due, 0);
    assert.equal(stats.challenges, 0);
    assert.equal(stats.zonesVisited, 0);
    assert.equal(stats.correctDays, 0);
    assert.deepEqual(stats.history, { added: 0, right: 0, wrong: 0 });
    assert.deepEqual(evaluateAchievements(['lixo', null, 3], value), []);
  }
});

test('estado vazio não registra conquistas e estado completo segue ordem estável', () => {
  assert.deepEqual(evaluateAchievements([], emptyFixture()), []);
  const expected = [...ACHIEVEMENT_IDS];
  assert.deepEqual(evaluateAchievements([], makeCompleteState()), expected);
  assert.deepEqual(evaluateAchievements([], makeCompleteState()), expected);
});

test('avaliação só devolve conquistas novas e ignora ids corrompidos', () => {
  const earned = ['first-word', 'first-word', 'missing-save-id', 42, null, 'clue-hunter'];
  const result = evaluateAchievements(earned, makeCompleteState());

  assert.equal(result.includes('first-word'), false);
  assert.equal(result.includes('clue-hunter'), false);
  assert.equal(result.includes('missing-save-id'), false);
  assert.equal(result.length, 17);
});

test('avaliação não muta estado nem lista de conquistas, mesmo deeply frozen', () => {
  const state = deepFreeze(makeCompleteState());
  const earnedIds = deepFreeze(['first-word']);
  const before = JSON.stringify(state);

  assert.doesNotThrow(() => evaluateAchievements(earnedIds, state));
  assert.equal(JSON.stringify(state), before);
  assert.deepEqual(earnedIds, ['first-word']);
});
