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
| 🏪 **High Street** | Padaria do Sr. Crumb, bookshop, correio, tea room, postes, bancos — saída para a Academia |
| 🏰 **Academia Owlburt** | Escola rival: duelo de feitiços melhor-de-3 contra a Prof. Raven |
| 🪑 **Sala de Aula** | Prof. Willow e a lousa interativa: lição emoji → palavra em inglês |

## O loop de aprendizado

1. **Ganhe palavras**: converse com os NPCs (glosas ✨), toque na lousa da
   sala de aula, abra o baú diário na mata.
2. **Revise com a coruja**: o botão 🦉 mostra um badge vermelho quando há
   revisões vencidas — quiz "Como se diz X?" com 3 alternativas.
3. **Repetição espaçada** (Leitner): acertou, o intervalo dobra (até 30
   dias); errou, volta em 10 minutos. Dominar = 3 acertos seguidos.
4. **Use o que sabe**: o Duelo de Feitiços da Academia sortea 3 palavras
   do SEU diário — quanto maior o vocabulário, mais forte o duelo.

## Personagens

Todos os 6 personagens principais são gerados por IA **localmente** na
RTX 4060, com esqueleto e animações (idle/walk/run):

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

Props do Sketchfab sob CC-BY: ver `assets/CREDITS.md` e o botão ℹ️ no jogo.

## Controles

- **Joystick virtual** (canto inferior esquerdo) ou setas/WASD: andar.
  Joystick no máximo = **correr** (×1.55).
- **Botão flutuante** (canto inferior direito): interagir com o que estiver
  no círculo amarelo.
- HUD: 🏠 menu · ℹ️ créditos · 🔄 reiniciar (à prova de abas duplicadas) ·
  🦉 dica/revisão · 📖 diário de palavras · 📊 progresso · 🔊 som.

## Desenvolvimento

```bash
npm run build   # bundle via esbuild (lib/bundle.js, commitado)
npm test        # 16 testes (state + vocab)
npm run dev     # esbuild --watch
```

- **Fontes**: `src/` — main.js (loop/HUD/quests), world.js (zonas 3D),
  content.js (história/diálogos), vocab.js (repetição espaçada),
  state.js (save com gerações à prova de abas), audio.js (sfx ambiente
  100% sintetizados), i18n.js (pt/en/es).
- **QA**: `?zone=woods|highstreet|academy|classroom` pula direto pra zona;
  `window.__rpgWelling.setPos(x, z)` teleporta; `kids()` lista estados.
- **Save**: `localStorage`, slot com geração (`v1.g<N>`) — o restart
  incrementa a geração, então abas velhas não ressuscitam save apagado.

Deploy: push em `main` → GitHub Pages publica automaticamente em
julia.kids.fun.mvalle.com (HTTPS, domínio próprio).
