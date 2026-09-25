// Contrato do fluxo diálogo → interação (bug do botão "⚽ Chutar os pênaltis"
// que às vezes não abria o jogo, reproduzido 6/10 em produção).
//
// O main.js não é importável em Node: o boot() no topo do módulo exige DOM de
// verdade (getElementById, canvas, áudio, rede de GLBs). Então este teste
// trava o CONTRATO do conserto direto no fonte: o flag global dialogAborted
// não pode voltar a existir como código, o abort tem de ser por conversa, o
// interact tem de ter guarda de reentrância e o branch field tem de ser
// idempotente. Não é um teste comportamental — é um trava de regressão do
// wiring exato que fechou o bug (o comportamento segue coberto pelo playtest
// manual e pela instrumentação ao vivo do coordenador).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const mainPath = fileURLToPath(new URL('../src/main.js', import.meta.url));
const source = readFileSync(mainPath, 'utf8');

function codeLines() {
  return source.split('\n').map((line, i) => ({ line, i: i + 1 }));
}

test('o flag global dialogAborted não existe mais como código', () => {
  // Toda menção restante precisa estar DENTRO de comentário de linha (o
  // histórico do bug ficou documentado junto ao ✕). Identifier em código
  // vazava o abort de uma conversa para a seguinte.
  for (const { line, i } of codeLines()) {
    if (!line.includes('dialogAborted')) continue;
    const commentAt = line.indexOf('//');
    const tokenAt = line.indexOf('dialogAborted');
    assert.ok(commentAt !== -1 && commentAt < tokenAt,
      `main.js:${i}: dialogAborted só pode aparecer em comentário`);
  }
});

test('runConversation sinaliza o abort por conversa e limpa no finally', () => {
  assert.match(source, /const session = \{ aborted: false \};/,
    'cada conversa precisa da própria sessão de abort');
  assert.match(source, /if \(session\.aborted\) break;/,
    'o loop precisa checar a sessão desta conversa, não um flag de módulo');
  assert.match(source, /return \{ aborted: session\.aborted \};/,
    'runConversation deve devolver { aborted } para o chamador decidir');
  assert.match(source, /if \(activeConversation === session\) activeConversation = null;/,
    'a sessão ativa só pode ser limpa por quem a criou');
});

test('o ✕ aborta exatamente a conversa ativa', () => {
  assert.match(source, /activeConversation\?\.abort\(\);/,
    'o handler do ✕ deve sinalizar a conversa ativa');
  assert.doesNotMatch(source, /dialogAborted = true;/,
    'o ✕ não pode setar flag global de abort');
});

test('interact tem guarda de reentrância e libera no finally', () => {
  assert.match(source, /if \(interactInFlight\) return;/,
    'interact novo durante interact em curso deve ser ignorado');
  assert.match(source, /runInteract\(id\)\.finally\(\(\) => \{\s*interactInFlight = false;\s*\}\)/,
    'a guarda precisa ser liberada mesmo se o fluxo lançar');
  // alias interno não pode passar pelo wrapper (entraria na própria guarda)
  assert.match(source, /id === 'duel'\) return void runInteract\('raven'\);/,
    'o alias do anel de duelo deve chamar runInteract direto');
});

test('o branch field decide pelo abort da própria conversa e é idempotente', () => {
  assert.match(source, /const \{ aborted \} = await runConversation\(\[\{ who: 'owl', text: FLAVOR\.field \}/,
    'field deve consumir o retorno de runConversation');
  assert.match(source, /if \(aborted\) return;\s*closeGame\(\);\s*openGameModal\(\);/,
    'só abre o jogo quando a conversa NÃO foi abortada');
  // createPenalty LANÇA em entrada inválida (não devolve null): sem o catch
  // sobra modal aberto com corpo vazio + rejeição sem tratamento.
  assert.match(source, /try \{\s*penaltyGame = createPenalty\(/,
    'a montagem do jogo precisa de catch (a fábrica lança em vez de devolver null)');
  assert.match(source, /\} catch \(error\) \{\s*closeGame\(\);\s*throw error;\s*\}/,
    'o catch deve fechar o modal antes de repassar o erro');
  assert.match(source, /if \(!penaltyGame\) closeGame\(\);/,
    'retorno falso (defensivo) também fecha o modal em vez de deixar tela morta');
});

test('a escolha da quadra roda dentro do runConversation (nada de askChoice solto)', () => {
  // O único askChoice fora do runConversation deixava o #dialog hidden
  // (askChoice não abre overlay): escolha invisível com a promise pendendo
  // para sempre — e, com a guarda de reentrância do interact, soft-lock
  // TOTAL das interações até recarregar.
  const uses = [...source.matchAll(/\baskChoice\(/g)].length;
  assert.equal(uses, 2,
    'askChoice só pode existir na definição e no consumo canônico dentro do runConversation');
  assert.doesNotMatch(source, /const ok = await askChoice/,
    'escolha solta de volta = hang eterno do interact');
  assert.match(source, /challengeId: 'sportsChoice'/,
    'o desafio da quadra deve marcar via node.choice.challengeId (markChallenge)');
  const usesState = [...source.matchAll(/state\.challenges\.sportsChoice/g)].length;
  assert.ok(usesState >= 2,
    'o branch deve derivar o acerto do estado gravado pelo markChallenge');
});
