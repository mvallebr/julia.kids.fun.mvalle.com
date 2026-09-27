# Roadmap — RPG Welling

Status deste arquivo: **vivo**. Atualizado em 2026-09-27 depois da rodada 3
"câmera, oclusão e minigame de pênaltis" (live `?v=20260925h`, **374 testes**).

A rodada 3 não tinha roadmap: ela cresceu a partir do QA visual. Os itens 4.1 a
4.5 são os defeitos que esse QA expôs, com captura de tela de cada zona.

Este é o plano de evolução do jogo da Julia. Ele existe para que qualquer sessão
futura saiba o que já foi feito, o que está em andamento e o que é próximo —
sem depender de conversa anterior.

---

## 1. Onde o jogo estava antes desta rodada (diagnóstico de 2026-09-24)

Levantamento inicial, feito por leitura de código. Está aqui como linha de base
— os números de hoje estão nas tabelas das fases.

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
| 0.1 | Teste de fumaça de boot: as 5 zonas constroem sem lançar | M | **entregue** |
| 0.2 | Cache do service worker versionado pelo hash do bundle | P | **entregue (o que dá para fazer sem build no deploy)** — `sw.js` + `sw-cache-name.js` com namespace por `?v=`, nome ativo persistido em cache de metadados, rotação na navegação HTML, limpeza só depois de provar HTML + bundle da MESMA versão, fallback para reservas antigas completas, manifesto e fontes num cache compartilhado persistente, isolamento total dos outros jogos (network-only) e política de MIME/escopo para tudo que entra no cache. O `?v=` continua **manual** por escolha: `index.html` estático no GitHub Pages não roda build, então derivar o hash do bundle no deploy exigiria mudar o pipeline — ver "Sobre 0.2" |
| 0.3 | Quebrar `world.js` e `main.js` em módulos (destrava o paralelismo) | G | planejado — **mais urgente que em 09-24**: os dois arquivos cresceram para 3.596 e 2.728 linhas e nenhum módulo novo conseguiu entrar neles (câmera, oclusão e pênaltis nasceram fora). A Fase 4 depende disso para ser paralelizável |
| 0.4 | CI: `npm ci && npm run build && npm test` + grep de CJK | P | **entregue** — `.github/workflows/ci.yml`, Node 20.19.4, e `git diff --exit-code -- lib/bundle.js` |

Sobre 0.1: o teste roda em Node, onde não existe `document` nem canvas, com um
stub de DOM em `test/helpers/dom-stub.js` que **valida os argumentos** entregues
às APIs de canvas (é aí que o bug mora). São 8 casos: as 5 zonas constroem e,
em `highstreet`, o centro de cada saída fica dentro dos limites da zona de
origem e fora dos colisores segundo o mesmo predicado de produção.

Sobre 0.2: o service worker parou de apagar cache de origem inteira e parou de
promover respostas parciais, redirecionadas, de origem errada ou de tipo
errado. O namespace agora é derivado do `?v=` do bundle e persistido em um
cache de metadados, a rotação acontece na navegação HTML (não no `install`),
e a limpeza só roda depois de provar uma reserva completa: HTML cujo corpo
declara a mesma versão do namespace **e** o bundle correspondente, com resposta
armazenada válida. Offline, o worker entrega sempre um par coerente — nunca
HTML de uma versão com bundle de outra. Manifesto e fontes ficam num cache
compartilhado que sobrevive à limpeza, e os outros jogos do site continuam
network-only.

O que **não** foi entregue: derivar a versão do hash do bundle sem intervenção
humana. O `?v=` em `index.html` continua manual de propósito — derivá-lo no
deploy exigiria um passo de build no GitHub Pages, que hoje serve arquivos
estáticos já commitados. A regra de publication segue no README do RPG.

## 3. Fase 1 — Progressão e repetibilidade

O que faz a Julia querer voltar amanhã. Hoje o progresso é flags e peças de
mapa; depois do portão da mata, acabou.

| # | Item | Tamanho | Status |
|---|---|---|---|
| 1.1 | Missões roláveis a partir de tabelas (gerar objetivos, não lista fixa) | M-G | **entregue (base)** — `chapters.js` define o esquema de missão por tabela (giver/steps/flag/reward) consumido por um runner genérico em `main.js`; "rolável" (geração procedural) continua planejado |
| 1.2 | Glossário de 34 → 120–150 palavras por tema, trilingue | M | **entregue (parcial)** — 154 glosas em `GLOSSES`, ~95 alcançáveis; faltam as ainda não ancoradas no mundo |
| 1.3 | Capítulo 2 (e 3): um ramo de mapa + NPC + minigame por capítulo | G | **Capítulo 2 entregue** — "A Torre de Severndroog": 4 missões (lousa, memória, carta, duelo+ditado), 4 fragmentos de estrela, fim na torre com conquista `chapter-two`; Capítulo 3 planejado |
| 1.4 | 12–20 conquistas com painel próprio | M | **entregue** — 18 conquistas em `achievements.js`, painel "🏅 Conquistas" no relatório, toast em cadeia ao ganhar |

## 4. Fase 2 — Minigames

Cada um é um arquivo novo, sem tocar nos outros.

| # | Item | Tamanho | Status |
|---|---|---|---|
| 2.1 | Escutar e repetir (fala com pontuação por semelhança) | M | **entregue** — `games/listen.js`: 20 palavras em 5 zonas (sem sobrepor as de 2.4), âncora `listenSchool` no pátio do parquinho, 3 tentativas, pontuação por similaridade de Levenshtein (0,9/0,6/0,35 = 3/2/1 estrelas — a estrela decide se a rodada passou e quantos confetes são lançados, não aparece desenhada) e digitação como reserva quando o navegador não tem `SpeechRecognition`; a fala é reprovada em 0,2 se **qualquer** palavra da frase for negação ("I don't know swing", "não sei swing"), com uma única exceção documentada: um "no," inicial é marcador de discurso e é removido antes da varredura — reprovar quem disse a frase errada é melhor do que aprovar quem disse "não sei"; o acerto grava a palavra no diário e conta no histórico de estudo |
| 2.2 | Sequência / memória (4–6 itens) | M | **entregue** — `games/memory.js` na biblioteca da escola (âncora `memoryLibrary`), 4 rodadas 3→6 cartas, dica no 2º erro, erro repete a sequência |
| 2.3 | Ditado de campo (3 frases escondidas no mundo) | M | **entregue** — `games/dictation.js` no correio (High Street), placa do Green Chain e torre Severndroog (woods); flags `dictation1/2/3`, 1 deslize de digitação perdoado, revelação gentil após 3 tentativas |
| 2.4 | Vocabulário no cenário (toque no objeto oferece 4 palavras) | M | **entregue** — `games/words.js`: 5 âncoras (`wordsSchool`, `wordsWoods`, `wordsHighStreet`, `wordsClassroom`, `wordsAcademy`), 4 palavras por lugar, revelação por toque, áudio por `speechSynthesis` (quando há voz) e "Guardar no diário" que grava **só** o que a criança revelou; o painel só anuncia sucesso quando houve gravação real (`saved > 0`), senão diz "Nada novo para guardar" |
| 2.5 | Pênaltis (arraste + direção) | M | **entregue fora do plano** — `games/penalty.js` (538 linhas) nasceu da rodada 3, como jogo de futebol no pátio. Nunca entrou em tabela nenhuma: foi escrito direto no código e o roadmap ficou para trás. Ganhou o rótulo de minigame do dia; ver também 4.5, porque a câmera o expôs |

## 5. Fase 3 — Payload, performance e acesso

| # | Item | Tamanho | Status |
|---|---|---|---|
| 3.1 | Personagens sob demanda (só quem está na zona; cache em disco) | M-G | **entregue** — `CORE_MODEL_FILES` (Ivy, Oakley, coruja, NPC, criança animada — 22,8 MB) carrega no boot e `ZONE_MODEL_FILES` por zona, com `preloadZoneModels()` e painel de progresso dentro do véu da troca (`loadingZone` nos três idiomas); cada arquivo falha sozinho (`Promise.allSettled` + aviso) e os fallbacks procedurais (`makeKid`/`makeOwl`/`makeAdult`) seguram o jogo; o boot caiu de **65,6 MB para 24,9 MB na mata**; `kid.glb` saiu do preload (9,6 MB que o jogo nunca usava). Nota: ainda não há cache em disco — quem pede o arquivo duas vezes na sessão paga duas vezes |
| 3.2 | Instanciar vegetação (InstancedMesh, como a fachada) | M | **entregue** — árvores da escola e da mata, arbustos, sebes e copas em InstancedMesh por primitiva do GLB (~28 clones × 6 primitivas → 6 draw calls na mata) |
| 3.3 | Corrigir `disposeScene` (material + normal/roughness) | P | **entregue** — `stashZoneResources` no fim dos 5 builders: materiais, todas as maps e buffers de instância da zona anterior liberados na troca |
| 3.4 | Toque ≥44px, `Escape` fecha modal, focus trap, aria-labels i18n | P-M | **entregue** — (rodada 1: foco/Escape/aria/reduced-motion/contraste; os alvos de toque já estavam em 44px desde então — a nota de "X do diário pequeno" estava desatualizada) |
| 3.5 | Tela de opções (efeitos / ambiente / fala / idioma / tamanho de texto) | P | **entregue (parcial)** — `options.js` com tamanho de texto (normal/grande/gigante) e sons de ambiente; idioma e som geral já existiam no HUD; centralizar tudo num painel único ficou opcional |
| 3.6 | README e CREDITS desatualizados | P | **entregue** |

**Dívida conhecida (fora da lista, para não se perder):** `stashZoneResources`
roda dentro dos builders de zona, antes de o `main.js` adicionar os objetos da
zona nova, e pode alcançar recursos de GLB que o `createGlbCache` compartilha
entre zonas. Ninguém quebrou por causa disso ainda e mexer agora, com o 3.1
recém-entregue, arrisca trocar um bug raro por um crash de tela preta. Fica
marcado para quando os personagens da Ivy e do Oakley passarem a ser
instanciados de verdade em vez de cacheados.

Assets medidos em 2026-09-27: `assets/` = **72 MB**, 15 GLBs. Os sete rigs de
personagem somam **64,6 MB (90%)** — `ivy-rigged.glb` 10,9 MB, `oakley-rigged.glb`
9,7 MB, `willow-rigged.glb` 9,5 MB, `raven-rigged.glb` e `crumb-rigged.glb` 9,2 MB
cada, `finch-rigged.glb` 8,6 MB, `page-rigged.glb` 7,5 MB. O maior item de
props é `trees.glb` (1,9 MB). O 3.1 cortou o boot pela metade, mas o disco
continua crescendo: cada rig novo entra com ~9 MB.

## 5.1 Fase 4 — Visual e jogabilidade

Rodada nova, nascida do **QA visual com navegador**, e não de leitura de código.
Em 2026-09-27 o jogo foi aberto em Chrome headless via CDP, com o servidor local
de `jogar.sh`, e cada zona foi capturada depois do boot real. Os itens abaixo
foram vistos nas imagens, não deduzidos.

| # | Item | Tamanho | Status |
|---|---|---|---|
| 4.1 | Câmera não deixa a sebe tapar a personagem na mata | M | **entregue** — causa: não era o enquadramento, era a sebe ficar entre a câmera e a menina. Três filtros independentes a escondiam do fader, e qualquer um só já bastava: (1) `hedgeRow` é `InstancedMesh` e `main.js` pula InstancedMesh no montage de occluders; (2) as bolinhas têm raio 0,74 m, abaixo do `CAM_OCCLUDER_MIN_RADIUS = 1.6`; (3) o corte de camada só liga com pitch >= 0.9 ou câmera a >= 20 m, e o defeito aparecia no enquadramento de sempre. O conserto dá à barreira de borda uma identidade: `hedgeRow` marca a malha com `userData.boundaryHedge`, `main.js` aceita InstancedMesh marcado apesar dos dois filtros, e `occlusion.js` esmaece a barreira que cruzar o segmento câmera→menina no plano do chão — sem depender do raio acertar. A sebe é **moldura**, não obstáculo: quem trava a jogadora é `zone.bounds`. Medido: `fadedCount` 0 → 1 e a sebe norte (`centerZ 33.8`, 28 instâncias) some do enquadramento; a personagem passa a aparecer inteira. Vale nos DOIS pontos de entrada da mata — o spawn de debug em `[0,32]` e a entrada real da High Street em `[0,-14]`, onde a câmera a ~9,5 m atravessa a sebe sul em `z -20.8` |
| 4.2 | Faixa preta no topo e texto cortado na fachada da escola | P | **planejado** — na captura da zona `school` há uma faixa preta e outra bege ocupando a faixa superior do quadro, e o letreiro da fachada aparece truncado ("RD" e "GR" nas pontas). Ou é a camada de teto do diorama que não some inteira, ou é geometria de fachada atravessando o frustum. Diagnóstico: capturar `school` com o overlay de debug e ver o que ocupa essa faixa |
| 4.3 | Translúcido fantasma no lado direito da escola | P | **planejado** — um plano branco semitransparente cobre o terço direito da captura, com as janelas aparecendo através dele. Cheira a material com `opacity` baixo aplicado no lugar errado, ou plano de vidro do prédio sem `depthWrite`. **Confirmado também na sala de aula** (captura de 2026-09-27): a mesma folha translúcida aparece em frente ao quadro-negro, então não é caso isolado de uma zona |
| 4.4 | Cena da mata escura e sem contraste | P-M | **planejado** — a mata renderiza em verde muito escuro, com o riacho como um elipse azul chapado e um bloco marrom solto à direita. Legibilidade do chão é ruim para uma criança no tablet |
| 4.5 | Pênaltis e diorama expostos pela câmera | M | **parcial** — a rodada 3 já criou `occlusion.js` (esmaecer o que está entre a câmera e a jogadora) e o cone de 5 raios do diorama, mas o QA mostrou que a câmera ainda tem casos ruins. O botão dos pênaltis que "abre sempre" e a aterragem das árvores já foram corrigidos nos commits `89ad7f4` e `d539710`. **O 4.1 atacou exatamente esta classe** — e o que sobrou é o caso da parede de tijolos da escola, que também cobre a personagem e é estrutura de verdade (não entra na regra de barreira) |
| 4.6 | QA visual automatizado como verificação, não como ritual | M | **entregue** — `tools/qa-visual.mjs` no repo. Um comando abre as 5 zonas em Chrome headless (SwiftShader, para não depender de GPU), espera o boot em **tempo real**, mede posição da câmera/da jogadora, quantos fantasmas estão ativos, o que o raycast acertou e **o que está entre a câmera e a jogadora** (slabe de caixa envolvente, sem depender de `THREE`, que é bundlado e não está no escopo da página), e grava um PNG por zona. Sai JSON no stdout e as imagens em `qa-out/` (fora do git). `node tools/qa-visual.mjs [--zone woods] [--at x,z] [--out dir] [--settle ms] [--keep]`. Baseline de hoje: **5/5 zonas bootam, zero erro de console** |

O que o QA mostrou sobre o método: `--screenshot` puro não serve, porque
dispara no evento `load` e o boot do RPG só termina depois de baixar ~25 MB de
GLB — a primeira captura pegou a tela de loading em 100%, sem a cena. É
obrigatório **esperar em tempo real** (55 s bastaram para a escola) e só então
capturar. Vale registrar: teste de boot em Node não pega nada disso, porque
`world.js` renderiza certo e *parece* errado.

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
  **Revisto em 2026-09-27:** a regra valia porque só havia um Chrome e ele
  disputava a tela com o agente principal. Headless muda isso — o agente
  principal sobe o servidor e a sessão de QA visual, e um subagente pode fazer
  o mesmo em porta e `--user-data-dir` próprios, sem roubar a tela de ninguém.
  O que continua valendo: **um único agente principal por navegador de QA**, e
  ninguém mexe no Chrome que a pessoa está usando. A instância do
  `chrome-devtools-mcp` é do host e não deve ser disputada.

  **Conserto do `chrome-devtools-mcp` (2026-09-27).** Ele falhava em toda
  chamada com *"The browser is already running for
  `~/.cache/chrome-devtools-mcp/chrome-profile`"*. Não é falta de Chrome nem
  config: o puppeteer atrás dele acha um Chrome vivo segurando o perfil e
  recusa. O navegador órfão veio de uma chamada anterior que o MCP lançou e
  depois perdeu o controle. O conserto é matar **só o navegador**, sem tocar
  no servidor MCP:

  ```sh
  pkill -f "user-data-dir=.*chrome-devtools-[m]cp"   # [m] evita auto-match
  ```

  O `[m]` não é decoração: sem ele o `pkill -f` casa com a própria linha de
  comando e mata o shell. Com o navegador fora, a próxima chamada do MCP
  relança limpo. Vale mais que o driver CDP manual para QA: o MCP dá
  `evaluate_script` (o `window.__rpgWelling` do README), snapshot da árvore de
  acessibilidade, console e rede, tudo em chamada nativa.

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

1. `npm run verify` passa — ele já roda o grep PCRE de CJK, o build e os testes
   (texto CJK já corrompeu arquivos três vezes).
2. `npm run build` passa.
3. `npm test` passa (baseline hoje: **374**; eram 39 antes das rodadas 1-2, 141
   depois da rodada 2, 255 no meio da rodada 3).
4. Se tocou `world.js` ou qualquer builder: **teste de fumaça de boot** passa.
5. Se tocou em cor, luz, material, câmera ou geometria de zona: **captura de
   tela** da zona passa. O teste de boot não cobre isso — o `world.js` pode
   construir as 5 zonas sem lançar e ainda assim a imagem estar errada. Foi
   exatamente assim que 4.1 a 4.4 apareceram.
6. Se tocou `index.html`: bump de `?v=` no `<script src="lib/bundle.js?v=…">`.
   **E se tocou QUALQUER coisa em `src/`, o bump é obrigatório, não opcional.**
   Não é superstição: em 2026-09-27 o service worker serviu um bundle velho
   pro navegador mesmo depois de o arquivo no disco já estar novo — o
   `fetch` direto devolvia o texto com as chaves novas, mas o bundle
   executado era o antigo, e o `__rpgWelling` em tela não tinha
   `scene`/`fadedCount`. Diagnóstico: comparar o que `fetch` devolve com o que
   a página executou; o conserto é `caches.delete` + `unregister` e recarregar.
   Sem o bump, o sintoma é QA mentindo: o teste passa, a captura é da versão
   antiga.
7. Depois do push: conferir o `?v=` no ar e o **md5 do bundle live = local**.
