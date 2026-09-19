// RPG Welling — testes da lógica de missões (spec §6/§39: aprendizado no mundo).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { currentObjective, canAssembleMap, pieceCount, checkStone, STONE_ANSWER, hintKey, FRACTION_ANSWER, VOCAB_ANSWER, COMP_ANSWER } from '../src/quest.js';
import { emptyState, MAP_PIECES } from '../src/state.js';

function stateWith(changes) {
  return { ...emptyState(), ...changes, flags: { ...emptyState().flags, ...(changes.flags || {}) } };
}

test('objetivo começa em "fale com os adultos" e progride com cada parte', () => {
  const fresh = currentObjective(stateWith({}));
  assert.equal(fresh.id, 'talk');
  assert.equal(fresh.progress, 0);

  const metOne = currentObjective(stateWith({ flags: { finchMet: true } }));
  assert.equal(metOne.id, 'talk');
  assert.equal(metOne.progress, 1);

  const collecting = currentObjective(stateWith({ mapPieces: ['finch'], flags: { finchMet: true, pageMet: true } }));
  assert.equal(collecting.id, 'find');
  assert.equal(collecting.progress, 1);

  const allPieces = stateWith({ mapPieces: MAP_PIECES, flags: { finchMet: true, pageMet: true } });
  assert.equal(pieceCount(allPieces), 4);
  assert.ok(canAssembleMap(allPieces));
  assert.equal(currentObjective(allPieces).id, 'assemble');
});

test('montar o mapa abre a trilha; a mata pede travessia e depois o portão', () => {
  const assembled = stateWith({ mapPieces: MAP_PIECES, flags: { mapAssembled: true } });
  assert.equal(currentObjective(assembled).id, 'toWoods');

  const woods = stateWith({ zone: 'woods', mapPieces: MAP_PIECES, flags: { mapAssembled: true } });
  assert.equal(currentObjective(woods).id, 'cross');

  const crossed = stateWith({ zone: 'woods', mapPieces: MAP_PIECES, flags: { mapAssembled: true, stonesCrossed: true } });
  assert.equal(currentObjective(crossed).id, 'gate');

  const done = stateWith({ zone: 'woods', mapPieces: MAP_PIECES, flags: { mapAssembled: true, stonesCrossed: true, gateOpen: true } });
  assert.equal(currentObjective(done).id, 'done');
});

test('pedras do riacho: o padrão 2, 4, 6 pede o 8 (sequência, spec §7)', () => {
  assert.equal(STONE_ANSWER, 8);
  assert.ok(checkStone(8));
  for (const wrong of [2, 4, 6, 10]) assert.ok(!checkStone(wrong));
});

test('dica da coruja acompanha o objetivo sem entregar a resposta (spec §17)', () => {
  assert.equal(hintKey(stateWith({})), 'hintNoPieces');
  assert.equal(hintKey(stateWith({ mapPieces: ['finch'] })), 'hintFind');
  assert.equal(hintKey(stateWith({ mapPieces: MAP_PIECES })), 'hintAssemble');
  assert.equal(hintKey(stateWith({ zone: 'woods', flags: { mapAssembled: true } })), 'hintCross');
  assert.equal(hintKey(stateWith({ zone: 'woods', flags: { mapAssembled: true, stonesCrossed: true } })), 'hintGate');
});

test('respostas dos desafios embutidos (fração, vocabulário, compreensão)', () => {
  assert.equal(FRACTION_ANSWER, 'quarter');
  assert.equal(VOCAB_ANSWER, 'strange');
  assert.equal(COMP_ANSWER, 'courtyard');
});
