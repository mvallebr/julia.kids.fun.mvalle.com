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
  já aponta para esse caminho. O JS é buscado da rede quando disponível,
  então o `?v=` do HTML não precisa ser editado para a atualização do bundle;
  o cache só é usado como reserva. O worker não valida releases: um deploy
  ruim com resposta 200 pode ser promovido para o cache. A checagem de bundle
  fresco no CI e o smoke test são as proteções contra esse incidente.
- **Estáticos e atualização**: CSS, fontes, manifesto e imagens de painel não
  são todos versionados ou content-hashed. Eles usam cache-first; portanto,
  uma cópia já visitada pode ficar desatualizada para uma criança que retorna
  até a próxima limpeza/evicção do cache. Para um asset não cacheado, uma
  resposta HTTP de erro, parcial ou de tipo inesperado não substitui uma cópia
  boa. O `sw.js` também não força a troca do worker em abas abertas: uma nova
  versão espera as abas atuais fecharem antes de assumir a próxima navegação.
- **Save**: `localStorage`, slot com geração (`v1.g<N>`) — o restart
  incrementa a geração, então abas velhas não ressuscitam save apagado.

Deploy: push em `main` → GitHub Pages publica automaticamente em
julia.kids.fun.mvalle.com (HTTPS, domínio próprio).
