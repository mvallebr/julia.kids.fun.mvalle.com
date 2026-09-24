# Roadmap — RPG Welling

Status deste arquivo: **vivo**. Atualizado em 2026-09-24, logo após a rodada da
fachada da escola real (commit `76d66ad`, live `?v=20260924k`).

Este é o plano de evolução do jogo da Julia. Ele existe para que qualquer sessão
futura saiba o que já foi feito, o que está em andamento e o que é próximo —
sem depender de conversa anterior.

---

## 1. Onde o jogo está hoje (diagnóstico de 2026-09-24)

Levantamento feito por leitura de código, sem modificar nada.

**Conteúdo**

| Item | Estado real |
|---|---|
| Zonas jogáveis | 5: school, woods, highstreet, academy, classroom |
| NPCs | 5 (Finch, Page, Crumb, Raven, Willow) |
| Conversações | 6 registros em `content.js`; Baker, Raven e Willow têm texto inline em `main.js` |
| Minigames | 3: quiz de 3 opções, duelo de 3 perguntas, lousa com 6 palavras (+ enigma das pedras 2-4-6-8) |
| Missão principal | Termina no portão da mata com "continua no próximo capítulo" (`main.js:1072-1113`) — **não há capítulo 2** |
| Missões secundárias | 2: encomenda da Sra. Page (3 itens, 3 zonas) e guarda-chuva |
| Pistas ocultas | 6 |
| Glossário | **34 palavras**, todas trilingues. Teto `MAX_WORDS = 60` em `vocab.js:4` |
| Progressão | Flags, peças de mapa, `duelWins`, 3 faixas de medalha (3/6/10). **Sem XP, sem níveis, sem conquistas** |
| Recompensa diária | Baú com 3 palavras, 1× por dia |
| Relatório para os pais | Total, dominadas, devidas, pistas, challenges, medalhas, zonas, últimos 7 dias, streak |

**Técnico**

| Item | Estado real |
|---|---|
| `world.js` | 2.931 linhas, 60 funções — asset loading, texturas procedurais, personagens, **5 builders de zona**, colisores |
| `main.js` | 1.830 linhas, 59 funções — boot, input, rotas, diálogo, missões, quiz, HUD, autosave |
| Concentração | Os dois arquivos = **74% do código** (4.761 de 6.446 linhas) |
| Testes | 39 testes cobrindo 4 módulos (`pathfind`, `vocab`, `state`, `quest`) = **10% das linhas**. `world.js` e `main.js` **sem nenhum teste** |
| CI | Nenhum workflow, nenhum lint, nenhum typecheck |
| Service worker | `julia-kids-v1` **fixo**, sem hash; a "versão" é o `?v=` digitado à mão no `index.html` |
| Assets | 15 GLBs = **70 MB**. Sete personagens rigged = 64,5 MB (88%), **todos precarregados no boot** |
| Draw calls | woods: ~71 clones de `trees.glb` → até 426 draw calls. school: 114 esferas de sebe. Fachada usa `InstancedMesh` (padrão correto) |
| Vazamento | `disposeScene` libera geometria e `material.map`, mas **não** o material nem as texturas normal/roughness |
| Acessibilidade | Alvos de toque abaixo de 44px (X do diário = 26×26), `Escape` não fecha modal, sem focus trap, vários `aria-label` fixos em português |
| Documentação | README diz "24 testes" e "33 MB de modelos" (real: 39 e 70 MB); `CREDITS.md` afirma que books/chest/bush ainda não foram integrados |

**O incidente que motivou a Fase 0.** O commit `e0045be` passou a cor da névoa
da zona (um número, `0x8fc9e8`) direto para `g.addColorStop()`. O Chrome
rejeita número como cor, a promise de boot morre e **nenhuma zona carrega**. O
jogo ficou quebrado no ar entre `?v=20260924j` e o fix. Os dois arquivos que
podiam conter esse bug são exatamente os que não têm teste.

---

## 2. Fase 0 — Fundação

Pré-requisito de quase todo o resto: sem teste de boot e sem cache versionado,
qualquer item de conteúdo é uma roleta de regressão silenciosa.

| # | Item | Tamanho | Status |
|---|---|---|---|
| 0.1 | Teste de fumaça de boot: as 5 zonas constroem sem lançar | M | em andamento |
| 0.2 | Cache do service worker versionado pelo hash do bundle | P | em andamento |
| 0.3 | Quebrar `world.js` e `main.js` em módulos (destrava o paralelismo) | G | planejado |
| 0.4 | CI: `npm ci && npm run build && npm test` + grep de CJK | P | em andamento |

Sobre 0.1: o teste precisa rodar em Node, onde não existe `document` nem canvas.
A estratégia é um stub mínimo de DOM que **valida** os argumentos que o código
entrega às APIs de canvas (é aí que o bug mora) e deixar o `three` de verdade
cuidar de geometria e materiais.

## 3. Fase 1 — Progressão e repetibilidade

O que faz a Julia querer voltar amanhã. Hoje o progresso é flags e peças de
mapa; depois do portão da mata, acabou.

| # | Item | Tamanho | Status |
|---|---|---|---|
| 1.1 | Missões roláveis a partir de tabelas (gerar objetivos, não lista fixa) | M-G | planejado |
| 1.2 | Glossário de 34 → 120–150 palavras por tema, trilingue | M | em andamento |
| 1.3 | Capítulo 2 (e 3): um ramo de mapa + NPC + minigame por capítulo | G | planejado |
| 1.4 | 12–20 conquistas com painel próprio | M | em andamento |

## 4. Fase 2 — Minigames

Cada um é um arquivo novo, sem tocar nos outros.

| # | Item | Tamanho | Status |
|---|---|---|---|
| 2.1 | Escutar e repetir (fala com pontuação por semelhança) | M | planejado |
| 2.2 | Sequência / memória (4–6 itens) | M | planejado |
| 2.3 | Ditado de campo (3 frases escondidas no mundo) | M | planejado |
| 2.4 | Vocabulário no cenário (tocar no objeto oferece 4 palavras) | M | planejado |

## 5. Fase 3 — Payload, performance e acesso

| # | Item | Tamanho | Status |
|---|---|---|---|
| 3.1 | Personagens sob demanda (só quem está na zona; cache em disco) | M-G | planejado |
| 3.2 | Instanciar vegetação (InstancedMesh, como a fachada) | M | planejado |
| 3.3 | Corrigir `disposeScene` (material + normal/roughness) | P | planejado |
| 3.4 | Toque ≥44px, `Escape` fecha modal, focus trap, aria-labels i18n | P-M | em andamento |
| 3.5 | Tela de opções (efeitos / ambiente / fala / idioma / tamanho de texto) | P | planejado |
| 3.6 | README e CREDITS desatualizados | P | em andamento |

---

## 6. Ordem recomendada

1. **0.1** teste de fumaça — pequeno, impede o próximo item de conteúdo de
   quebrar o jogo sem ninguém perceber.
2. **1.2** glossário grande — maior ganho pedagógico, não toca em 3D, sai em
   lotes de 30 palavras.
3. **1.4** conquistas + **3.5** tela de opções — baratos, e o par que mais
   devolve "quero jogar de novo".
4. **3.1** personagens sob demanda — muda a experiência nos primeiros 30
   segundos no celular.
5. **1.3** capítulo 2 — só depois dos minigames e da progressão, para não ser
   mais um mapa igual.

## 7. O que pode correr em paralelo

**Regra:** tudo que não tocar `world.js` e `main.js` ao mesmo tempo é
paralelizável. Depois de 0.3, cada trilha tem dono de arquivo.

| Trilha | Arquivos | Paralela com |
|---|---|---|
| A — Narrativa/capítulos | `content.js`, `i18n.js`, `chapters.js` | B, D, E |
| B — Progressão/pedagogia | `vocab.js`, `quest.js`, `state.js`, `test/` | A, D, E |
| C — Minigames | `game/minigames/*` + uma tabela de registro | A, B, D |
| D — Payload/performance | `world/shared.js`, `assets/`, `sw.js` | A, B, E |
| E — Acessibilidade/UX | `index.html`, CSS, chaves novas de i18n | A, B, D |

**Não paralelizáveis:** duas alterações no mesmo builder de zona; qualquer
mudança no formato de `state.js` (B precisa coordenar com A, porque capítulos
gravam flags novas).

### Regras de isolamento para agentes que trabalham neste repo

O repositório é um diretório de trabalho **compartilhado** e um único branch.
Para que vários agentes trabalhando em paralelo não se atropelem:

- **Nenhum agente roda git.** `add`/`commit`/`checkout`/`stash`/`branch` são do
  agente principal, sempre. Checkout paralelo destrói o trabalho do vizinho.
- **Nenhum agente usa navegador.** Só existe uma instância do Chrome, e QA de
  navegador é feito uma vez, no fim, pelo agente principal.
- **Nenhum agente sobe servidor.** Nenhuma porta compartilhada.
- **Nenhum agente roda `npm install`** nem mexe em `node_modules`/`package-lock.json`.
- **Nenhum agente roda `npm run build`** nem edita `lib/bundle.js` — é artefato
  compartilhado. O build é feito uma vez, pelo principal.
- **Dono exclusivo de arquivo:** cada agente só edita os arquivos listados no
  próprio prompt. Se precisar de um arquivo de outro, anota no relatório em vez
  de editar.
- Testes podem ser rodados com `node --test <arquivo>` (não escreve nada
  compartilhado).

## 8. Portão de qualidade de cada entrega

Antes de qualquer commit:

1. `grep -rn "[一-龥]" src/*.js` não devolve nada (texto CJK já corrompeu
   arquivos três vezes).
2. `npm run build` passa.
3. `npm test` passa (baseline hoje: 39).
4. Se tocou `world.js` ou qualquer builder: **teste de fumaça de boot** passa.
5. Se tocou `index.html`: bump de `?v=` no `<script src="lib/bundle.js?v=…">`.
6. Depois do push: conferir o `?v=` no ar e o **md5 do bundle live = local**.
