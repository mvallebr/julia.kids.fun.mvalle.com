# RPG Welling 🦉

RPG 3D de aprendizado de inglês para a Julia — leve, roda no browser e no
tablet, sem contas e sem custo. Estilo Hogwarts com personagens chibi.

**Jogar:** abra https://julia.kids.fun.mvalle.com — ou `./jogar.sh` na raiz
do repo (sobe um servidor local, necessário porque `file://` bloqueia o
download dos modelos 3D).

## Zonas (mundo semi-aberto)

Ande até as bordas/portalões para trocar de zona — sem telas de loading
longas, só uma cortina rápida.

| Zona | O que tem |
|---|---|
| 🏫 **Welling School** | Sala, biblioteca com livros e pista, mural, Sr. Finch (zelador) e Sra. Page (bibliotecária), porta oeste para a sala de aula |
| 🌳 **Oxleas Woods** | Riacho com pedras numeradas (puzzle de frações), árvores e arbustos, cogumelos, baú do tesouro diário, marco de pedra, portão para a High Street |
| 🏪 **High Street** | Padaria do Sr. Crumb, bookshop, correio e tea room interativos (glosas story/letter/tea), postes, bancos com página escondida — saída para a Academia |
| 🏰 **Academia Owlburt** | Escola rival: duelo de feitiços melhor-de-3 contra a Prof. Raven, pergaminho escondido e medalhas 🥉🥈🥇 por vitórias |
| 🪑 **Sala de Aula** | Prof. Willow e a lousa interativa: lição emoji → palavra em inglês, priorizando o que a criança ainda não sabe |

## O loop de aprendizado

1. **Ganhe palavras**: converse com os NPCs (glosas ✨), toque na lousa da
   sala de aula, abra o baú diário na mata.
2. **Revise com a coruja**: o botão 🦉 mostra um badge vermelho quando há
   revisões vencidas — quiz "Como se diz X?" com 3 alternativas.
3. **Repetição espaçada** (Leitner): acertou, o intervalo dobra (até 30
   dias); errou, volta em 10 minutos. Dominar = 3 acertos seguidos.
4. **Use o que sabe**: o Duelo de Feitiços da Academia sortea as 3 palavras
   mais fracas do SEU diário — quanto maior o vocabulário, mais forte o duelo.
5. **Escute primeiro**: a revisão da coruja é modo escuta — a palavra é falada
   (speechSynthesis) e a criança escolhe o significado; o 🔊 repete a fala.
6. **Meta pós-final**: medalhas da Academia (3/6/10 duelos → 🥉🥈🥇),
   relatório dos pais com histórico de 7 dias e dias seguidos de estudo.

As segundas quests ativas (encomenda da Sra. Page, duelo, baú do dia) aparecem
no Diário da missão (chip 📜), embaixo do objetivo principal.

## Personagens

O jogo usa **sete modelos de personagens** gerados por IA localmente: Ivy,
Oakley e os cinco NPCs. A tabela agrupa Ivy e Oakley em um único papel, então
ela tem seis linhas; isso não reduz o total de sete modelos. Todos têm
esqueleto e animações (idle/walk/run):

| Personagem | Papel |
|---|---|
| Ivy & Oakley | Jogadora e irmão acompanhante (com Pip e Marlow, as corujas) |
| Sr. Finch | Zelador: primeira peça do mapa + vocabulário |
| Sra. Page | Bibliotecária: segunda peça + encomenda multi-zona |
| Prof. Raven | Academia: duelo de feitiços |
| Sr. Crumb | Padaria da High Street |
| Prof. Willow | Sala de aula: lição da lousa |

Pipeline: concept art (Minimax) → malha (Hunyuan3D-2mini) → textura
(Hunyuan3D-2 paint, multiview) → rig + animações (Blender via
`~/ai/hp3d-rig.py`) → GLB otimizado (gltf-transform, texturas 1024 WebP).
Os GLBs de personagens são gerados localmente, sem licença de modelo de
terceiros. Props e fallbacks externos sob CC-BY: ver `assets/CREDITS.md` e o
botão ℹ️ no jogo.

Os 15 GLBs distribuídos somam aproximadamente 70 MB. O plano de evolução
vivo do jogo está em `ROADMAP.md`.

## Controles

- **Toque/clique no chão** (click-to-move): a personagem anda até o ponto
  marcado com um anel verde — longe ela **corre**, chegando perto ela caminha.
- **Setas/WASD** (teclado): andar; teclas no máximo = **correr** (×1.55).
- **Arrastar a tela**: girar a câmera (horizontal) e mudar o ângulo
  (vertical) — arrastar pra cima abaixa a câmera e mostra os rostos;
  arrastar pra baixo sobe pra uma visão de cima.
- **Scroll do mouse / pinça de dois dedos**: zoom in e zoom out.
- **Botão flutuante** (canto inferior direito): interagir com o que estiver
  no círculo amarelo.
- O teclado é relativo à câmera: "pra cima" sempre anda pra longe dela.
- HUD: 🏠 menu · ℹ️ créditos · 🔄 reiniciar (à prova de abas duplicadas) ·
  🦉 dica/revisão · 📖 diário de palavras · 📊 progresso · 🔊 som ·
  🌐 idioma (pt/en/es, persiste por jogadora).

## Desenvolvimento

```bash
npm run build   # bundle via esbuild (lib/bundle.js, commitado)
npm test        # executa a suíte de testes do jogo
npm run dev     # esbuild --watch
```

- **Fontes**: `src/` — main.js (loop/HUD/quests), world.js (zonas 3D),
  content.js (história/diálogos), vocab.js (repetição espaçada),
  state.js (save com gerações à prova de abas), audio.js (sfx ambiente
  100% sintetizados), i18n.js (pt/en/es).
- **QA**: `?zone=woods|highstreet|academy|classroom` pula direto pra zona;
  `window.__rpgWelling.setPos(x, z)` teleporta; `kids()` lista estados;
  `debug()` mostra overlay/cooldown/saídas da zona atual.
- **Spec**: os comentários `spec §N` vêm das notas de design da sessão de
  planejamento — o documento não está no repositório (histórico, inofensivo).
- **PWA**: `manifest.webmanifest` + `sw.js` na raiz — cache por runtime
  (navegação e JS network-first, demais estáticos cache-first), instalável
  na tela inicial do tablet. O cache é criado conforme a criança visita:
  uma navegação anterior do mesmo caminho pode ser reaberta offline mesmo
  quando a URL atual tem outro `?name`, `?avatar`, `?language` ou `?v`. Isso
  não garante uma cópia offline para todo destino ou para toda consulta que
  ainda não foi visitada. O `sw.js` é registrado na raiz e seu escopo `/`
  controla também o launcher; esse risco é aceito porque o registro do RPG
  já aponta para esse caminho. O `?v=` ainda precisa ser mudado a cada deploy.
  A rotação do namespace acontece na próxima navegação com rede bem-sucedida,
  somente dentro de `/rpg_welling/`, quando um HTML completo, local e sem
  redirect contém uma única versão do marcador esperado; ela não depende de
  uma nova execução do `install`. Os outros jogos da origem usam o mesmo
  formato `lib/bundle.js?v=`, mas não giram este namespace; eles são
  deliberadamente network-only, sem leitura, escrita ou reserva offline pelo
  worker do RPG. Isso não afeta o launcher nem o RPG em `/rpg_welling/`.
  JavaScript e estáticos redirecionados para fora do RPG também são rejeitados
  para gravação. O nome ativo fica
  persistido em um cache de metadados e só é considerado provado quando o cache
  correspondente existe, então sobrevive ao worker ser encerrado. A prova da
  reserva verifica o HTML e a resposta armazenada do bundle principal: status
  200, resposta `basic`, sem redirect, JavaScript esperado e query `?v=`
  compatível com a versão do namespace. Uma chave de bundle sem uma resposta
  armazenada válida não completa a reserva. A política de tipo é compartilhada
  pelo helper puro: aceita apenas o tipo base e parâmetros como `charset`;
  sufixos como `application/javascript+json` e `application/javascript-patch`
  são rejeitados. A resposta de metadados é validada antes de ler o corpo:
  precisa ser 200 `basic`, não redirecionada e `text/plain`; a leitura pela
  chave exata do Request no Cache Storage garante o endpoint interno no
  escopo. A leitura inicial de `cacheFirst()` também é
  serializada com a rotação, evitando reabrir um cache removido durante uma
  limpeza. A leitura inicial do `cacheFirst()` é fail-open para a rede quando
  `caches.open()` ou `caches.match()` falham; isso inclui a primeira abertura
  do cache ativo depois da resolução do estado, e falhas de escrita e limpeza
  continuam fail-closed. A reconstrução também trata `caches.has()` como
  prova não comprovada e segue para o próximo candidato, em vez de rejeitar a
  resolução inteira. Navegações dentro do RPG aceitam `text/html` somente na
  raiz, em caminhos `.html` e em caminhos sem extensão, como
  `/rpg_welling/capitulo/1`. Uma navegação para `.js`, `.css`, `.glb`, `.png`,
  `.webmanifest`, `.woff2` ou qualquer outro caminho tipado nunca aceita HTML,
  não grava HTML na chave do recurso e não rotaciona o namespace. A política
  por extensão continua valendo para requisições que não são navegação. A
  validação dos metadados usa a chave exata do Request no Cache Storage, não
  `response.url`, porque `new Response()` não possui URL e `Cache.put()` não
  a preenche; uma resposta válida com URL vazia na chave sintética continua
  válida, enquanto uma entrada em outra chave é ignorada. `fetch()` da raiz
  `/rpg_welling` ou `/rpg_welling/` sem `mode: 'navigate'` não aceita nem
  grava HTML. Qualquer resposta lida do cache, inclusive HTML, JavaScript,
  estáticos e dependências compartilhadas, precisa ser 200 `basic`, sem
  redirect, estar no escopo final e ter o MIME esperado do caminho. Uma
  entrada inválida é tratada como ausente: não serve, não completa reserva e
  não autoriza limpeza; se existir uma reserva antiga completa, ela é usada.
  Se a abertura do ativo ou de um candidato intermediário falhar, somente
  esse candidato é descartado e a busca continua nas reservas seguintes. Com
  rede, HTML e JS são buscados primeiro na rede; sem rede, a última cópia
  do mesmo caminho é usada. HTML servido do cache precisa declarar no corpo a
  mesma versão do namespace ativo e fazer par com um bundle válido daquela
  versão; um HTML divergente não é servido offline nem pode ser gravado por
  uma requisição que não seja navegação. Se o caminho pedido não for o HTML
  canônico da reserva, o worker procura uma reserva completa cuja versão
  coincida com o corpo daquele HTML; sem uma reserva coerente, usa a resposta
  de rede ou `Response.error()`. Assim HTML e JavaScript de versões diferentes
  nunca são misturados.

  Uma navegação offline nunca escolhe HTML de uma reserva incompleta: ela
  recupera o HTML de uma reserva antiga completa e, em seguida, entrega o
  bundle cuja query `?v=` é a mesma do HTML recuperado. HTML e JavaScript de
  versões diferentes nunca são misturados. Em estado ambíguo, o worker pode
  cair no cache fixo e servir uma cópia antiga em silêncio. A reconstrução só
  promove um cache cuja resposta armazenada do bundle foi validada; múltiplas
  versões no HTML também não são promovidas.

  Os metadados persistidos são aceitos mesmo quando apontam para uma reserva
  ainda incompleta, desde que o cache exista, tenha nome válido e contenha um
  HTML local, sem redirect, cujo corpo seja coerente com o próprio namespace.
  Isso permite que um bundle atrasado complete a reserva após reinício do
  worker. Metadados que apontam para cache inexistente, nome inválido ou cache
  sem HTML coerente usam a reconstrução segura. A limpeza só é autorizada
  depois que a reserva fica completa, e o fallback offline é serializado na
  mesma fila de rotação para não reabrir um cache recém-removido. Um bundle
  atrasado pode responder ao chamador, mas não é gravado no ativo depois de
  outra rotação e não autoriza a limpeza de reservas antigas.

  A matriz de estáticos inclui JPEG e WASM com MIME esperado; respostas 206,
  opacas ou redirecionadas não substituem uma cópia boa, inclusive nos recursos
  compartilhados. O worker não valida releases: HTML de erro servido com status
  200 e o marcador esperado ainda pode ser promovido. A checagem de bundle
  fresco no CI e o smoke test são as proteções contra esse incidente.
- **Dependências compartilhadas do RPG**: `/manifest.webmanifest`,
  `/julia_world/fonts/fonts.css`,
  `/julia_world/fonts/fredoka-latin.woff2` e
  `/julia_world/fonts/luckiest-guy-latin.woff2` são cache-first em um cache
  persistente próprio, `julia-kids-runtime-rpg-welling-shared`. Esse cache
  fica fora da rotação e é preservado por `qualCacheApagar()` e pelo activate;
  ele não é apagado junto com as versões antigas do RPG. Os demais jogos e o
  launcher continuam network-only.

- **Estáticos e atualização**: CSS, fontes, manifesto, GLBs e imagens de painel
  não são todos versionados ou content-hashed; eles usam cache-first, portanto
  uma cópia já visitada pode ficar desatualizada até a próxima limpeza/evicção
  do cache. Antes de gravar, o worker exige MIME esperado para HTML,
  JavaScript, CSS, GLB, PNG, JPEG, manifesto, WOFF2, WASM, JSON e mapas de
  origem, ignorando apenas
  parâmetros como `charset`. HTTP 206, redirect, tipo inesperado e resposta não
  basic não substituem uma cópia boa. O `sw.js` também não força a troca do
  worker em abas abertas: uma nova versão espera as abas atuais fecharem
  antes de assumir a próxima navegação.
- **Save**: `localStorage`, slot com geração (`v1.g<N>`) — o restart
  incrementa a geração, então abas velhas não ressuscitam save apagado.

Deploy: push em `main` → GitHub Pages publica automaticamente em
julia.kids.fun.mvalle.com (HTTPS, domínio próprio).
