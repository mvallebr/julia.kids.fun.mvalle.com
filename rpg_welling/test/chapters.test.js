// RPG Welling — consistência do Capítulo 2 (src/chapters.js).
// O teste importa os dados de VERDADE (chapters.js + content.js + state.js +
// games/dictation.js): trilinguismo completo, flags únicas e sem colisão com
// o capítulo 1, recompensas existentes em GLOSSES e NPCs/zonas reais. As
// únicas listas embutidas aqui são de referência do cap. 1, com a origem
// anotada em cada linha.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CHAPTER2,
  CHAPTERS,
  chapterById,
  chapterFlags,
  chapterProgress,
  isQuestComplete,
  nextQuest,
  nextStep,
  questProgress,
} from '../src/chapters.js';
import { GLOSSES, NPCS } from '../src/content.js';
import { ZONES } from '../src/state.js';
import { DICTATION_FLAGS } from '../src/games/dictation.js';

const VALID_SPEAKERS = new Set([...Object.keys(NPCS), 'owl']);

// ── listas de referência do capítulo 1 (embutidas com origem) ────────────────
// Flags conhecidas ANTES do capítulo 2 — grep por `flags.` e `flag:` em
// src/main.js, src/quest.js, src/achievements.js e src/games/*.js (24/09/2026).
const CHAPTER1_FLAGS = [
  'introSeen', 'mapAssembled',            // main.js: livro de abertura, porta de heras
  'finchMet', 'pageMet',                  // main.js: `${id}Met` ao falar com os adultos
  'visited_woods', 'visited_highstreet', 'visited_academy', 'visited_classroom', 'visited_school', // main.js: gotoZone grava visited_<zona>
  'stonesCrossed', 'gateOpen', 'endingSeen', // main.js: pedras do riacho, portão e fim do cap. 1
  'umbrellaAsked', 'umbrellaFound', 'umbrellaDone', // main.js: guarda-chuva da Sra. Page
  'chestOpened', 'chestDay',              // main.js: baú diário da mata
  'orderStarted', 'orderDone', 'orderMint', 'orderBun', 'orderFeather', // main.js: encomenda
  'duelWon',                              // main.js (runDuel): duelo vencido
  'memoryDone',                           // games/memory.js: minigame da biblioteca (contrato do módulo)
  'dictation1', 'dictation2', 'dictation3', // games/dictation.js (DICTATION_FLAGS)
];

// O capítulo 2 pode OBSERVAR (nunca criar) flags que já são contrato de um
// sistema integrado: o passo fica pronto quando o dono da flag grava. Tudo
// que for realmente NOVO do capítulo precisa do prefixo ch2.
const REUSABLE_FLAGS = new Set(['duelWon', 'memoryDone', 'dictation1', 'dictation2', 'dictation3']);

// Alvos de passo → zona real do interactable. Compilado dos addInteract() de
// src/world.js (a zona de cada builder é o bloco onde o addInteract aparece).
// 'memoryLibrary' é a ancoragem combinada para o minigame da biblioteca, que
// fica na ZONA school (a biblioteca já existe lá) — o interactable físico é
// PEDIDO AO PRINCIPAL (nenhuma geometria é inventada pelo capítulo).
const TARGET_ZONES = {
  blackboard: 'classroom',
  duel: 'academy',
  greenChain: 'woods',
  postOffice: 'highstreet',
  severndroog: 'woods',
  memoryLibrary: 'school',
};

// Ditado: par (alvo, frase) combinado na integração — o comentário de
// DICTATION_PHRASES em games/dictation.js fixa os pontos: placa do Green
// Chain (mata), caixa de correio (High Street) e o "castelo" de Severndroog.
const TARGET_DICTATION_PHRASES = {
  greenChain: 'dictWoods',
  postOffice: 'dictLetter',
  severndroog: 'dictCastle',
};

// Percorre a árvore toda e devolve cada bloco trilíngue com o caminho onde
// estava — um objeto que tem pt OU en OU es é tratado como bloco fechado.
function collectLocalized(node, out = [], path = 'chapter2') {
  if (Array.isArray(node)) {
    node.forEach((item, index) => collectLocalized(item, out, `${path}[${index}]`));
    return out;
  }
  if (node && typeof node === 'object') {
    if (typeof node.pt === 'string' || typeof node.en === 'string' || typeof node.es === 'string') {
      out.push([path, node]);
      return out; // bloco trilíngue não é percorrido mais a fundo
    }
    for (const [key, value] of Object.entries(node)) collectLocalized(value, out, `${path}.${key}`);
  }
  return out;
}

// Todos os nós de fala ({ who, ... }) e de glosa ({ gloss }) das listas de
// diálogo do capítulo (intro, offer de cada quest e ending.lines).
function dialogueNodes(chapter) {
  const nodes = [...chapter.intro, ...chapter.ending.lines];
  for (const quest of chapter.quests) nodes.push(...(quest.offer || []));
  return nodes;
}

test('o capítulo 2 existe com id, gatilho e título trilíngue', () => {
  assert.equal(CHAPTER2.id, 'chapter2');
  assert.equal(CHAPTER2.requiresFlag, 'endingSeen');
  assert.ok(CHAPTER1_FLAGS.includes(CHAPTER2.requiresFlag), 'requiresFlag precisa ser flag conhecida do cap. 1');
  assert.ok(CHAPTER2.quests.length >= 4, 'a lenda promete 4 fragmentos → 4 missões');
});

test('todo texto do capítulo tem pt, en e es não vazios', () => {
  const blocks = collectLocalized(CHAPTER2);
  assert.ok(blocks.length >= 10, 'o capítulo tem título, falas, offers e hints — muitas strings');
  for (const [path, block] of blocks) {
    for (const lang of ['pt', 'en', 'es']) {
      const text = block[lang];
      assert.equal(typeof text, 'string', `${path}.${lang} deve ser string`);
      assert.ok(text.trim().length > 0, `${path}.${lang} não pode ser vazio`);
    }
  }
});

test('cada nó de diálogo é fala (who) ou glosa (gloss), nunca os dois', () => {
  for (const node of dialogueNodes(CHAPTER2)) {
    const isLine = typeof node.who === 'string';
    const isGloss = typeof node.gloss === 'string';
    assert.ok(isLine !== isGloss, `nó de diálogo precisa de exatamente um de who/gloss: ${JSON.stringify(node)}`);
  }
});

test('falas só falam quem existe (NPCS de content.js ou a coruja)', () => {
  for (const node of dialogueNodes(CHAPTER2)) {
    if (typeof node.who !== 'string') continue; // nó de glosa — coberto no teste acima
    assert.ok(VALID_SPEAKERS.has(node.who), `falante "${node.who}" não existe (use ids de NPCS ou 'owl')`);
  }
});

test('glosas citadas nas falas existem em GLOSSES (content.js)', () => {
  for (const node of dialogueNodes(CHAPTER2)) {
    if (node.gloss) assert.ok(GLOSSES[node.gloss], `gloss "${node.gloss}" não existe em GLOSSES`);
  }
});

test('flags do capítulo são únicas entre si', () => {
  const flags = chapterFlags(CHAPTER2);
  assert.equal(new Set(flags).size, flags.length, `flags duplicadas: ${flags.join(', ')}`);
  assert.ok(flags.includes(CHAPTER2.startFlag));
  assert.ok(flags.includes(CHAPTER2.ending.flag));
});

test('flags novas têm prefixo ch2 e não colidem com as do capítulo 1', () => {
  const flags = chapterFlags(CHAPTER2);
  const fresh = flags.filter((flag) => !REUSABLE_FLAGS.has(flag));
  for (const flag of fresh) {
    assert.ok(flag.startsWith('ch2'), `flag "${flag}" é nova do cap. 2 e precisa do prefixo ch2`);
    assert.ok(!CHAPTER1_FLAGS.includes(flag), `flag "${flag}" já existe no capítulo 1`);
  }
  // as reutilizadas precisam MESMO ser as canônicas dos donos (proteção contra
  // trocar o nome de mão: dictation.js grava exatamente dictation1/2/3)
  const dictationFlags = Object.values(DICTATION_FLAGS);
  for (const flag of flags) {
    if (dictationFlags.includes(flag)) assert.ok(REUSABLE_FLAGS.has(flag), `flag de ditado "${flag}" fora da allowlist`);
  }
});

test('ids de missões, passos e recompensas são únicos e estáveis', () => {
  const questIds = CHAPTER2.quests.map((quest) => quest.id);
  const stepIds = CHAPTER2.quests.flatMap((quest) => quest.steps.map((step) => step.id));
  const challengeIds = CHAPTER2.quests.map((quest) => quest.reward.challenge);
  assert.equal(new Set(questIds).size, questIds.length);
  assert.equal(new Set(stepIds).size, stepIds.length);
  assert.equal(new Set(challengeIds).size, challengeIds.length, 'um challenge por fragmento, sem duplicata');
  for (const id of challengeIds) {
    assert.ok(id.startsWith('ch2'), `challenge "${id}" deve nascer do capítulo 2 (prefixo ch2)`);
  }
});

test('cada palavra de recompensa existe em GLOSSES e cada giver é um NPC', () => {
  for (const quest of CHAPTER2.quests) {
    assert.ok(VALID_SPEAKERS.has(quest.giver), `giver "${quest.giver}" não é um NPC de content.js`);
    assert.ok(Array.isArray(quest.reward.words) && quest.reward.words.length > 0, `${quest.id}: reward.words vazio`);
    for (const word of quest.reward.words) {
      assert.ok(GLOSSES[word], `${quest.id}: palavra de recompensa "${word}" não existe em GLOSSES`);
    }
  }
});

test('zonas dos passos existem e são coerentes com a missão e o alvo', () => {
  for (const quest of CHAPTER2.quests) {
    assert.ok(ZONES.includes(quest.zone), `${quest.id}: zona principal "${quest.zone}" não existe`);
    const stepZones = quest.steps.map((step) => step.zone);
    for (const zone of stepZones) {
      assert.ok(ZONES.includes(zone), `${quest.id}: zona "${zone}" não existe (use as 5 canônicas)`);
    }
    assert.ok(stepZones.includes(quest.zone), `${quest.id}: a zona principal deve aparecer nos passos`);
    for (const step of quest.steps) {
      assert.ok(step.flag, `${step.id}: passo sem flag não é recuperável`);
      if (step.type === 'talk') {
        assert.ok(VALID_SPEAKERS.has(step.npcId), `${step.id}: npcId "${step.npcId}" não existe`);
      } else {
        assert.ok(step.target, `${step.id}: passo ${step.type} precisa de target`);
        if (TARGET_ZONES[step.target]) {
          assert.equal(step.zone, TARGET_ZONES[step.target],
            `${step.id}: alvo "${step.target}" fica na zona ${TARGET_ZONES[step.target]}, não em ${step.zone}`);
        }
      }
    }
  }
  // o fim também mora no mundo que já existe
  assert.ok(ZONES.includes(CHAPTER2.ending.zone), 'ending.zone não existe');
  assert.equal(TARGET_ZONES[CHAPTER2.ending.target], CHAPTER2.ending.zone,
    'o alvo do fim precisa ficar na zona do fim');
});

test('passos de ditado usam a frase e a flag canônicas de games/dictation.js', () => {
  for (const quest of CHAPTER2.quests) {
    for (const step of quest.steps) {
      if (!TARGET_DICTATION_PHRASES[step.target]) continue;
      const phraseId = TARGET_DICTATION_PHRASES[step.target];
      assert.equal(DICTATION_FLAGS[phraseId], step.flag,
        `${step.id}: o ditado de "${step.target}" (${phraseId}) grava a flag ${DICTATION_FLAGS[phraseId]}, não ${step.flag}`);
    }
  }
  // o passo final da torre é o 3º ditado (a frase do "castelo")
  assert.equal(DICTATION_FLAGS[TARGET_DICTATION_PHRASES[CHAPTER2.ending.step.target]], CHAPTER2.ending.step.flag,
    'o passo final da torre deve ser o ditado do castelo (dictation3)');
});

test('cada missão tem oferta falada cujo quem é o próprio giver', () => {
  for (const quest of CHAPTER2.quests) {
    assert.ok(Array.isArray(quest.offer) && quest.offer.length > 0, `${quest.id}: sem oferta ao giver`);
    const first = quest.offer[0];
    assert.equal(first.who, quest.giver, `${quest.id}: a oferta deve vir do giver`);
    // o 1º passo talk é o que a oferta completa
    assert.equal(quest.steps[0].type, 'talk', `${quest.id}: o 1º passo deve ser o talk com o giver`);
    assert.equal(quest.steps[0].npcId, quest.giver, `${quest.id}: o talk inicial é com o giver`);
  }
});

test('helpers de progresso derivam tudo das flags (recomeço no meio não quebra)', () => {
  const flags = {};
  const empty = chapterProgress(CHAPTER2, flags);
  assert.deepEqual(
    { questsDone: empty.questsDone, fragments: empty.fragments, endingReady: empty.endingReady, complete: empty.complete },
    { questsDone: 0, fragments: 0, endingReady: false, complete: false },
  );
  assert.equal(nextQuest(CHAPTER2, flags).id, CHAPTER2.quests[0].id);
  assert.equal(nextStep(CHAPTER2.quests[0], flags).id, 'ch2q1s1');

  // metade do caminho: flag de passo isolada já conta, em qualquer ordem
  flags.ch2Q1Board = true; // 2º passo feito antes do 1º — fora de ordem de propósito
  assert.equal(questProgress(CHAPTER2.quests[0], flags).done, 1);
  assert.equal(isQuestComplete(CHAPTER2.quests[0], flags), false);
  assert.equal(nextStep(CHAPTER2.quests[0], flags).id, 'ch2q1s1');

  // todas as missões fecham o capítulo, mas o fim só com a flag do ending
  for (const flag of chapterFlags(CHAPTER2)) flags[flag] = true;
  delete flags[CHAPTER2.ending.flag];
  const ready = chapterProgress(CHAPTER2, flags);
  assert.equal(ready.fragments, CHAPTER2.quests.length);
  assert.equal(ready.endingReady, true);
  assert.equal(ready.complete, false);
  assert.equal(nextQuest(CHAPTER2, flags), null, 'sem quests pendentes, o runner aponta para a torre');

  flags[CHAPTER2.ending.flag] = true;
  assert.equal(chapterProgress(CHAPTER2, flags).complete, true);
});

test('CHAPTERS expõe o capítulo para o runner genérico e chapterById acha', () => {
  assert.ok(CHAPTERS.includes(CHAPTER2));
  assert.equal(chapterById('chapter2'), CHAPTER2);
  assert.equal(chapterById('chapter1'), null, 'o cap. 1 vive no main.js, não aqui');
});
