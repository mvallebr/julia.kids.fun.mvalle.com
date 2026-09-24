// RPG Welling — testes do save por jogadora (spec §37, sem contas online).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyState, normalizeState, loadState, saveState, recordHistory, historyWeek, studyStreak, STORAGE_KEY, MAP_PIECES } from '../src/state.js';
import { ACHIEVEMENT_IDS } from '../src/achievements.js';

function fakeStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
  };
}

test('normalizeState limpa lixo sem quebrar (defesa contra save corrompido)', () => {
  const dirty = normalizeState({
    character: 'dragão', zone: 'castelo', position: ['x', Infinity],
    mapPieces: ['finch', 'finch', 'hacker'], flags: { mapAssembled: 'sim', __proto__: {} },
    clues: [42, { a: 1 }, 'oak'], challenges: { vocabFinch: 'yes' }, sound: 0,
  });
  assert.equal(dirty.character, '');
  assert.equal(dirty.zone, 'school');
  assert.deepEqual(dirty.position, [0, 0]);
  assert.deepEqual(dirty.mapPieces, ['finch']); // sem duplicatas, ordem canônica
  assert.deepEqual(dirty.flags, { mapAssembled: true });
  assert.deepEqual(dirty.clues, ['oak']);
  assert.deepEqual(dirty.challenges, { vocabFinch: true });
  assert.equal(dirty.sound, false);
});

test('save vem vazio e sadio quando não há nada salvo', () => {
  const storage = fakeStorage();
  assert.deepEqual(loadState(storage, 'julia'), emptyState());
  assert.deepEqual(loadState(storage, ''), emptyState());
  storage.setItem(STORAGE_KEY, 'não-json{{{');
  assert.deepEqual(loadState(storage, 'julia'), emptyState());
});

test('cada jogadora tem seu próprio progresso isolado', () => {
  const storage = fakeStorage();
  const julia = normalizeState({ character: 'ivy', mapPieces: ['finch', 'page'] });
  const alex = normalizeState({ character: 'oakley', mapPieces: [] });
  saveState(storage, 'Julia', julia);
  saveState(storage, '  julia ', { character: 'ivy', mapPieces: MAP_PIECES, flags: { mapAssembled: true } });
  saveState(storage, 'Alex', alex);

  const reloaded = loadState(storage, 'julia'); // chave ignora caixa/espaços
  assert.deepEqual(reloaded.mapPieces, MAP_PIECES);
  assert.equal(reloaded.flags.mapAssembled, true);

  const alexReloaded = loadState(storage, 'Alex');
  assert.deepEqual(alexReloaded.mapPieces, []);
  assert.equal(alexReloaded.character, 'oakley');
});

test('saveState só grava estado normalizado', () => {
  const storage = fakeStorage();
  saveState(storage, 'julia', { character: 'ivy', zone: 'woods', position: [999, -999], mapPieces: MAP_PIECES });
  const raw = JSON.parse(storage.getItem(STORAGE_KEY)).julia;
  assert.deepEqual(raw.position, [60, -60]); // clampado aos limites
  assert.deepEqual(raw.mapPieces, MAP_PIECES);
});

test('recordHistory acumula os contadores do dia de hoje', () => {
  const state = emptyState();
  recordHistory(state, 'added');
  recordHistory(state, 'right', 3);
  recordHistory(state, 'wrong');
  recordHistory(state, 'right', 2);
  const week = historyWeek(state.history, new Date());
  assert.equal(week.added, 1);
  assert.equal(week.right, 5);
  assert.equal(week.wrong, 1);
  assert.equal(week.active, 1);
});

test('historyWeek soma só os 7 dias recentes e studyStreak conta seguidos', () => {
  const now = new Date(2026, 8, 22, 12); // 22/09/2026, meio-dia local
  const history = {
    '2026-09-22': { added: 2, right: 5, wrong: 1 },
    '2026-09-21': { added: 1, right: 3, wrong: 0 },
    '2026-09-15': { added: 4, right: 2, wrong: 2 }, // exatamente 8 dias atrás: fora
    '2026-09-10': { added: 9, right: 9, wrong: 9 },
  };
  const week = historyWeek(history, now);
  assert.deepEqual(week, { added: 3, right: 8, wrong: 1, active: 2 });
  assert.equal(studyStreak(history, now), 2); //22 + 21

  // hoje ainda sem registro não quebra a sequência (jogou ontem)
  assert.equal(studyStreak({ '2026-09-21': { added: 1, right: 1, wrong: 0 } }, now), 1);
  // buraco quebra
  assert.equal(studyStreak({ '2026-09-19': { added: 1, right: 1, wrong: 0 } }, now), 0);
  assert.equal(studyStreak({}, now), 0);
});

test('normalizeState limpa histórico malformado e corta em 60 dias', () => {
  const dirty = normalizeState({
    history: {
      'não-data': { added: 5 },
      '2026-09-20': 'não é objeto',
      '2026-09-21': { added: -3, right: 'x', wrong: 2.7 },
      ...Object.fromEntries(Array.from({ length: 70 }, (_, i) => {
        const d = String(100 + i); // chaves sintéticas fora do padrão → descartadas
        return [`x${d}`, { added: 1 }];
      })),
    },
  });
  assert.deepEqual(Object.keys(dirty.history), ['2026-09-21']);
  assert.deepEqual(dirty.history['2026-09-21'], { added: 0, right: 0, wrong: 2 });
});

test('emptyState começa sem conquistas', () => {
  assert.deepEqual(emptyState().achievements, []);
});

test('normalizeState aceita apenas ids conhecidos, sem repetição', () => {
  const dirty = normalizeState({
    achievements: [
      'first-word', 'id-desconhecido', 42, null, 'first-word',
      ...ACHIEVEMENT_IDS, ...ACHIEVEMENT_IDS,
    ],
  });
  assert.deepEqual(dirty.achievements, [...ACHIEVEMENT_IDS]);
  assert.equal(dirty.achievements.length, ACHIEVEMENT_IDS.length);
  assert.equal(normalizeState({ achievements: 'first-word' }).achievements.length, 0);
});
