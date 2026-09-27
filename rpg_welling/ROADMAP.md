# Roadmap — RPG Welling

Status deste arquivo: **vivo**. Atualizado em 2026-09-27 depois da rodada 6
"muro, glosas órfãs, modularização, recompensas roláveis e opções" (live
`?v=20260927m`, **386 testes**).

A rodada 4 nasceu do `tools/qa-visual.mjs` (4.6) e andar sobre ele. Tudo o que
ela mediu virou item: o chão que não alcançava a câmera (4.7), o telhado que
tarpava a tela (4.2) e a mata escura (4.4). A rodada 5 fechou o que restava
dela (4.5), resolveu o 1.2 de verdade — as 45 glosas que o diário prometia e
o mundo não entregava — e deu a primeira fatia do 0.3. A rodada 6 deu a
segunda fatia do 0.3 (céu fora do world.js), o 1.1 rolável de verdade e o
3.5 com som e idioma no painel.

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
| 0.3 | Quebrar `world.js` e `main.js` em módulos (destrava o paralelismo) | G | **parcial (2 de 3 fatias)** — `world.js` saiu de 3.747 para **3.079 linhas**. Fatia 1, `src/textures.js` (500 linhas): os 26 geradores de textura, materiais e primitivas de cena — a única que é folha de verdade, sem estado e sem conhecer zona. Fatia 2, `src/sky.js` (244 linhas): `skyDome`, `skyGlow`, `photoBand` e `lightShaft` — era o candidato mais difícil, porque `skyDome` e `photoBand` leem `zone.fog` e montam nuvem e skyline; continuam como funções puras que recebem a zona, só deixaram de dividir módulo com as 3.079 linhas de construção de cena. **Duas armadilhas que o teste de fumaça pegou e que valem mais que o código:** (a) `mat()` não era folha como parecia, fechava em `matCache` declarado 450 linhas *depois*, dentro do `makeKid` — no mesmo módulo funcionava, separados os dois não se falam, e o erro é **silencioso**: nenhum teste falha, a cena só fica mais lenta. (b) `skyDome` usa `cssColor`, que foi parar no módulo anterior na fatia 1. **Falta a fatia 3:** `main.js` (2.728 linhas), intocado de propósito — é o arquivo de maior risco da lista e precisa de sessão com gente olhando |
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
| 1.1 | Missões roláveis a partir de tabelas (gerar objetivos, não lista fixa) | M-G | **entregue** — a base por tabela já vinha da rodada 2, e o que faltava era a rolagem de verdade. Decisão de escopo: os **OBJETIVOS continuam fixos**, porque estão amarrados a conteúdo que existe no mundo (não dá para sortear "fale com a Sra. Page" num passo onde ela não está). O que rola é a **RECOMPENSA**: cada fragmento de estrela pagava sempre as mesmas 12 palavras, então refazer o capítulo entregava conteúdo idêntico. Agora cada fragmento sorteia 3 palavras do **seu pool temático** — misturar "dragon" com "socks" numa recompensa de biblioteca estragaria o sentido do que ela está aprendendo ali. Determinístico de propósito: a semente mora no save (`state.chapter2Seed`), então a recompensa não muda entre recargas nem entre abas. `Math.random()` no menu daria palavra diferente a cada abertura e a menina acharia que o jogo esqueceu o que premiou. 7 testes novos cobrem os três partes do contrato: semente nova dá recompensa nova, semente igual dá recompensa igual, e 25 leituras seguidas não mudam nada (a HUD, o menu de oferta e o fim de capítulo leem a lista em lugares diferentes). Validado no navegador: semente `17938875` sobreviveu ao reload |
| 1.2 | Glossário de 34 → 120–150 palavras por tema, trilingue | M | **entregue** — o número de glosas já estava bom desde a rodada anterior (171 entradas, todas com pt/en/es). O que faltava era o **caminho**: um rastreio palavra por palavra no conteúdo mostrou que só 126 das 171 apareciam em algum lugar por onde a menina passa. As 45 órfãs não eram avulsas, eram temas inteiros sem uma única palavra ancorada — comida, roupa, cor, transporte, emoção, verbo, adjetivo. O diário prometia uma coisa que o mundo não entregava. **12 âncoras novas** do minigame de vocabulário no cenário cobrem as 45 sem repetir nenhuma (montra da padaria, em frente à estação, mural de avisos, meio da rua, cacifo, objeto perdido, quadro-negro, fim da aula, beira do riacho, fundo do bosque, arena do duelo, o gol do campo), todas perto de uma âncora já existente da mesma zona, que se sabe alcançável, para nenhuma cair dentro de colisor. Validei em runtime, não só em teste: abri as âncoras da High Street, toquei e salvei, e cheese/milk/egg/rice entraram no diário com a glosa. Rastreio final: **0 órfãs** |
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
| 3.5 | Tela de opções (efeitos / ambiente / fala / idioma / tamanho de texto) | P | **entregue** — o painel tinha só tamanho de texto e som do ambiente; idioma e som geral viviam soltos no HUD, e para uma criança de 6 anos procurar som num botão e idioma noutro é Davies. Agora as quatro coisas estão no mesmo lugar: texto, ambiente, som, idioma. Três decisões que valem registro: (1) os dois switches viraram uma **fábrica** (`buildSwitch`) em vez de código copiado — são o mesmo controle com texto diferente, e o teclado é delicado, porque o handler global do jogo cancela o espaço na janela e o toggle precisa acontecer dentro do painel, uma única vez; (2) `sound` e `language` **continuam no topo do state**, não foram para `settings` — são anteriores ao painel, e duplicá-los criaria duas fontes de verdade para a mesma preferência, então o painel os trata como campos da visão e o `main.js` mapeia de volta; (3) cada idioma aparece escrito **no próprio idioma** (Português / English / Español), porque quem ainda não lê português reconhece o nome na primeira tela. O `main.js` ganhou `applySound` e `applyLanguage` extraídos dos handlers do HUD, para o botão e o painel passarem pelo mesmo caminho — dois lugares com a mesma linha divergem na primeira vez que um esquecer o outro |
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
| 4.2 | Faixa preta no topo e texto cortado na fachada da escola | P | **entregue (com uma ressalva registrada)** — a faixa preta **não** era a silhueta da cidade, que foi a primeira hipótese e estava errada: a cor dela mudou para `#93b3c9` e a faixa continuou. Era a **laje do telhado**: `BoxGeometry` de 14,6 m em `y` 4,3-4,5, a 11,8 m da câmera, que fica ACIMA do telhado enquanto o corte de camada não roda nesse enquadramento (pitch 0,51 contra o piso de 0,9). Conserto: ardósia média (`FACADE_ROOF` → `0x8f96a2`) e cor própria para a silhueta da escola; a faixa foi de `#363228` para `#a09881`. **Duas decisões tomadas em 27/09, ambas reversíveis em uma linha:** (a) o corte de camada **continua** com o piso de pitch 0,9 — a faixa já foi resolvida pela cor, e baixar o piso transformaria toda zona interna em casa de boneca no enquadramento padrão, que é troca maior que o defeito; (b) o letreiro "RD"/"GR" **não** é texto cortado: é uma placa parcialmente atrás de uma coluna, na borda do quadro. Cosmético e dependente da câmera, deixado como está |
| 4.4 | Cena da mata escura e sem contraste | P-M | **entregue** — a suspeita inicial (sol fraco) estava errada: o sol já era 1,75. O que apagava a cena era a cor **de baixo** do hemisférico, `0x24401f`, praticamente preta, que pinta de sombra tudo que a luz direcional não pega — num bosque fechado, quase o chão inteiro. E como é quente-escura, não só escurecia: tirava a separação de valor entre grama, caminho de terra e água, e o riacho virava a mesma mancha do resto. Cor de baixo para `0x40643f`, hemisférico 1,0 → 1,25, sol 1,95. A atmosfera de bosque continua, o chão ficou legível |
| 4.5 | Pênaltis e diorama expostos pela câmera | M | **entregue** — o que restava era o muro de tijolos da frente da escola tapando a menina da cintura para baixo, e a causa também não era o fader: ela está no **vão do portão** (x −1 a 1), então os raios passam por dentro do vão e nunca acertam o muro. Geometria pura. A conta fecha: a câmera abre 9,51 m atrás do spawn e o muro está 6,11 m à frente dela; com 2,2 m o topo do muro cai a 31,3° de elevação, ACIMA dos pés da menina (31,9°), e a 1,6 m cai para 35,2°, abaixo. Baixado para 1,6 m — plausível para muro frontal de escola primária UK, e abre o pátio inteiro. O colisor sai do *footprint* no helper `wall()`, não da altura, então **não abriu passagem**. Medido com câmera e jogadora nas mesmas coordenadas dos dois lados, então a comparação é limpa |
| 4.6 | QA visual automatizado como verificação, não como ritual | M | **entregue** — `tools/qa-visual.mjs` no repo. Um comando abre as 5 zonas em Chrome headless (SwiftShader, para não depender de GPU), espera o boot em **tempo real**, mede posição da câmera/da jogadora, quantos fantasmas estão ativos, o que o raycast acertou e **o que está entre a câmera e a jogadora** (slabe de caixa envolvente, sem depender de `THREE`, que é bundlado e não está no escopo da página), e grava um PNG por zona. Sai JSON no stdout e as imagens em `qa-out/` (fora do git). `node tools/qa-visual.mjs [--zone woods] [--at x,z] [--out dir] [--settle ms] [--keep]`. O relatório completo vai para `qa-out/report.json` e o stdout é só o resumo — com as 5 zonas e os três diagnósticos o JSON passa de 60 KB, e canalizar isso por pipe é frágil (o pipe trunca e o `JSON.parse` do consumidor estoura, com a mensagem apontando para o parser em vez do QA).
| 4.7 | O chão não alcança a câmera (o mundo acaba no meio do quadro) | M | **entregue (4 zonas)** — a classe de defeito mais widespread que o QA encontrou, e invisível para o teste de fumaça: as 5 zonas construíam sem lançar e mesmo assim o terço de baixo do quadro era a cor da névoa ou o fundo da zona. A causa é sempre a mesma e é geométrica, não de material: **a câmera abre ~10 m atrás do jogador e o chão é um plano finito que termina antes dela.** Medido: sala de aula terminava em `z +9` com a câmera em `~16`; Academia, `z +14` com a câmera em `~19,5`; High Street, calçada `z +17` e pista `z +18` com a câmera em `~22,4`; escola, gramado `z +4,5` com a câmera em `~10,6`. O conserto em todas: o chão avança bem além da câmera, e o **repeat da textura acompanha o tamanho novo** (senão a pedra/grama estica no pedaço acrescentado) — 4 × 9 na sala, 4 × 10 no pátio, 13 × 20 na calçada, 4 × 19 na pista, 8 × 17 no gramado. Onde havia parede que acompanhava o chão, ela foi estendida também, com o colisor cobrindo só a área jogável. A High Street ganhou largura (40 m) porque com 22 m as bordas do quadro ainda mostravam a aresta dura da calçada — o defeito é a aresta, não o vazio. No que sobrou nos cantos da High Street é **céu** (`horizon #cfe3ee`), confirmado por medição |

  São três diagnósticos, e a ordem em que foram escritos é a lição: **`between`** (o que está entre a câmera e a menina), **`SCREEN`** (que malhas cobrem a faixa de cima e a de baixo do quadro, por projeção NDC) e **`PICK`** (o que está NA FRENTE num ponto NDC, por raycast). O SCREEN sozinho não resolveu o 4.2: ele diz quais malhas *cobrem* a faixa, não qual está na frente, e foi por isso que a primeira tentativa no 4.2 mudou a silhueta errada. O PICK precisa de `debug().camera()` — a câmera não é filha da cena no three.js — e de ignorar malha que contém a câmera, senão a cúpula do céu dá `t = 0` em toda mira e esconde o resto. Baseline de hoje: **5/5 zonas bootam, zero erro de console** |

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
