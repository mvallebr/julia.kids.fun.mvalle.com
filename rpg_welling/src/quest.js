// RPG Welling — lógica de missões e desafios embutidos (pura, sem DOM/three).
// Regra do spec §6: o aprendizado é parte do mundo, não quiz colado em cima.

import { MAP_PIECES } from './state.js';

export const STONE_SEQUENCE = [2, 4, 6]; // próximo = 8
export const STONE_ANSWER = 8;

export function pieceCount(state) {
  return state.mapPieces.length;
}

export function canAssembleMap(state) {
  return pieceCount(state) === MAP_PIECES.length;
}

export function isMapAssembled(state) {
  return Boolean(state.flags.mapAssembled);
}

// Fração do desafio da porta de heras: 1 peça de 4 = um quarto (spec §39).
export const FRACTION_ANSWER = 'quarter';

// Vocabulário 11+ (spec §9): peculiar = incomum.
export const VOCAB_ANSWER = 'strange';

// Compreensão (spec §10): a carta diz "ouvi asas sobre o pátio".
export const COMP_ANSWER = 'courtyard';

export function checkStone(number) {
  return number === STONE_ANSWER;
}

// Objetivo atual da missão, em ordem — alimenta o chip do HUD e as dicas.
export function currentObjective(state) {
  if (state.flags.gateOpen) return { id: 'done' };
  if (state.zone === 'woods') {
    if (!state.flags.stonesCrossed) return { id: 'cross' };
    return { id: 'gate' };
  }
  if (isMapAssembled(state)) return { id: 'toWoods' };
  if (canAssembleMap(state)) return { id: 'assemble' };
  if (pieceCount(state) === 0) {
    const met = Boolean(state.flags.finchMet) + Boolean(state.flags.pageMet);
    return { id: 'talk', progress: met };
  }
  return { id: 'find', progress: pieceCount(state) };
}

// Dica da coruja para o objetivo atual (spec §17: cutucar, nunca entregar).
export function hintKey(state) {
  const objective = currentObjective(state);
  if (objective.id === 'done') return 'hintDone';
  if (objective.id === 'gate') return 'hintGate';
  if (objective.id === 'cross') return 'hintCross';
  if (objective.id === 'assemble') return 'hintAssemble';
  if (objective.id === 'find') return 'hintFind';
  return 'hintNoPieces';
}

// Medalhas da Academia por duelos vencidos (pós-final: meta de longo prazo)
export const MEDAL_TIERS = [3, 6, 10];
export const MEDAL_EMOJI = [' ', '🥉', '🥈', '🥇'];

export function medalTier(wins) {
  let tier = 0;
  for (const needed of MEDAL_TIERS) if (wins >= needed) tier += 1;
  return tier;
}
// Segundas quests ativas — o chip 📜 continua mostrando só a principal,
// o Diário (journal) lista estas embaixo. fatos derivados chegam prontos:
//   wordCount → Object.keys(state.words).length
//   today     → new Date().toISOString().slice(0, 10)
export const ORDER_ITEMS = ['orderMint', 'orderBun', 'orderFeather'];

export function secondaryObjectives(state, { wordCount = 0, today = '' } = {}) {
  const flags = state.flags || {};
  const list = [];
  if (flags.orderStarted && !flags.orderDone) {
    list.push({ id: 'order', key: 'objOrder', progress: ORDER_ITEMS.filter((f) => flags[f]).length, total: ORDER_ITEMS.length });
  }
  if (wordCount >= 3 && !flags.duelWon) list.push({ id: 'duel', key: 'objDuel' });
  if (today && flags.chestDay !== today) list.push({ id: 'chest', key: 'objChest' });
  return list;
}
