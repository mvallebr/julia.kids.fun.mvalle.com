# Créditos e atribuições

Este arquivo separa os **sete modelos de personagens atuais**, gerados
localmente, dos assets externos CC-BY e dos fallbacks. A lista de carregamento
em `src/world.js` confirma que os sete modelos dedicados têm precedência
sobre os fallbacks.

## Modelos de personagens atuais (locais)

Os sete modelos abaixo foram gerados localmente com **Hunyuan3D** e depois
rigados e animados em **Blender**. Eles são assets locais do projeto, não
foram baixados do Sketchfab e não têm atribuição de modelo de terceiro:

- `ivy-rigged.glb` — Ivy, jogadora.
- `oakley-rigged.glb` — Oakley, irmão acompanhante.
- `finch-rigged.glb` — Sr. Finch.
- `page-rigged.glb` — Sra. Page.
- `crumb-rigged.glb` — Sr. Crumb.
- `raven-rigged.glb` — Prof. Raven.
- `willow-rigged.glb` — Prof. Willow.

O pipeline registrado é concept art local → malha e textura Hunyuan3D →
rig e animações no Blender. A seleção em `src/world.js` usa primeiro o
modelo dedicado correspondente; se ele não estiver disponível ou não tiver
as animações esperadas, entra o fallback externo descrito abaixo.

## Assets 3D externos realmente usados

Os assets abaixo permanecem no repositório sob licença CC-BY. A lista de
`preloadModels()` em `src/world.js` confirma que todos eles são carregados
pelo jogo; os fallbacks só são selecionados quando o modelo dedicado não
pode ser usado.

### Corujas (Pip e Marlow) — `owl.glb`

Baseado no modelo **"Cute Ghost"** de **Sketchfab**.

- UID: `2c8c03bb0e5049529e653f9011a8fc90`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/cute-ghost-2c8c03bb0e5049529e653f9011a8fc90>

Modificação local: a cor original (branco/cinza) virou marrom de coruja e
foram adicionados dois olhos pretos como esferas. As formas principais do
modelo, incluindo asas e bumbps que parecem orelhas, foram mantidas.

### Bosque — `trees.glb`

Modelo **"Low Poly Forest Tree Pack"** de **Sketchfab**.

- UID: `5ff5a51e74324845a4e4905f182dfb2b`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/low-poly-forest-tree-pack-5ff5a51e74324845a4e4905f182dfb2b>

Usado em `buildWoods()` com rotações e escalas variadas por instância. O
arquivo também contém pedras decorativas usadas como props.

### Livros da biblioteca — `books.glb`

Modelo **"Antique Book Set"** de **Sketchfab**.

- UID: `a7e1164cca004a65ab53ce0e8553586c`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/antique-book-set-a7e1164cca004a65ab53ce0e8553586c>

Usado em `makeBookSet()` para os livros interativos da biblioteca.

### Baú do tesouro — `chest.glb`

Modelo **"Stylized Treasure Chest"** de **Sketchfab**.

- UID: `dbeae8db89eb433f832d0ef48f12480e`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/stylized-treasure-chest-dbeae8db89eb433f832d0ef48f12480e>

Usado em `makeChest()` para o baú do tesouro diário na mata.

### Arbustos — `bush.glb`

Modelo **"Stylized Bush"** de **Sketchfab**.

- UID: `9d9ce79d3ae040619e96d5b22c7de1a6`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/stylized-bush-9d9ce79d3ae040619e96d5b22c7de1a6>

Usado em `makeBush()` para os arbustos da zona da mata.

## Fallbacks 3D externos

Os dois assets abaixo não são os modelos atuais de Ivy/Oakley ou dos NPCs.
São fallbacks, e por isso continuam exigindo atribuição CC-BY.

### Kid animado — `kid-animated.glb`

Modelo **"Mini Chibi Kid (Free Demo)"** de **joaobaltieri** (Sketchfab).

- UID: `6feb5bd7ade54b5fac25a0e1e5fbe729`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/mini-chibi-kid-free-demo-6feb5bd7ade54b5fac25a0e1e5fbe729>

`makeKid()` só o usa se `ivy-rigged.glb` ou `oakley-rigged.glb` não puder
fornecer o modelo com animações. Não é o modelo principal atual de Ivy ou
Oakley.

### NPC adulto — `npc.glb`

Modelo **"Business Man - Low Polygon game character"** de **Sketchfab**.

- UID: `b6f6740f883b4749abac47af0045a9dd`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/business-man-low-polygon-game-character-b6f6740f883b4749abac47af0045a9dd>

`makeAdult()` só o usa quando o `*-rigged.glb` dedicado do NPC não está
disponível. O modelo é um fallback genérico, não a origem dos cinco NPCs
atuais.

### Kid reservado — `kid.glb`

Modelo **"The Noble Craftsman"** de **Sketchfab**.

- UID: `0e8ff87ffaa24731b2474badebca870d`
- Licença: **CC Attribution** (`CC-BY`)
- URL: <https://sketchfab.com/3d-models/the-noble-craftsman-0e8ff87ffaa24731b2474badebca870d>

O arquivo está no preload, mas `src/world.js` não o seleciona atualmente.
É uma reserva para uma futura migração, não o personagem jogável atual.

## Imagens locais do projeto

- `panel-gate.jpg`, `panel-sign.jpg`, `panel-street.jpg`, `panel-pillar.jpg`
  e `panel-woods.jpg` — painéis das cenas de `content.js`; arquivos locais do
  projeto, sem atribuição externa registrada.
- `oxleas-backdrop.jpg` — fotografia do próprio Oxleas Wood, tirada pelo autor
  do jogo e usada em `photoBand()` na mata. Sem licença de terceiros.

## Resumo das licenças

| Arquivo | Origem | Papel no jogo | Licença |
|---|---|---|---|
| `ivy-rigged.glb` | Hunyuan3D + rig local | Ivy, modelo atual | local, sem licença de terceiro |
| `oakley-rigged.glb` | Hunyuan3D + rig local | Oakley, modelo atual | local, sem licença de terceiro |
| `finch-rigged.glb` | Hunyuan3D + rig local | Sr. Finch, modelo atual | local, sem licença de terceiro |
| `page-rigged.glb` | Hunyuan3D + rig local | Sra. Page, modelo atual | local, sem licença de terceiro |
| `crumb-rigged.glb` | Hunyuan3D + rig local | Sr. Crumb, modelo atual | local, sem licença de terceiro |
| `raven-rigged.glb` | Hunyuan3D + rig local | Prof. Raven, modelo atual | local, sem licença de terceiro |
| `willow-rigged.glb` | Hunyuan3D + rig local | Prof. Willow, modelo atual | local, sem licença de terceiro |
| `owl.glb` | Cute Ghost, Sketchfab | Pip e Marlow | CC-BY |
| `trees.glb` | Low Poly Forest Tree Pack, Sketchfab | Bosque | CC-BY |
| `books.glb` | Antique Book Set, Sketchfab | Livros | CC-BY |
| `chest.glb` | Stylized Treasure Chest, Sketchfab | Baú | CC-BY |
| `bush.glb` | Stylized Bush, Sketchfab | Arbustos | CC-BY |
| `kid-animated.glb` | Mini Chibi Kid, Sketchfab | Fallback de personagem | CC-BY |
| `npc.glb` | Business Man - Low Polygon, Sketchfab | Fallback de NPC | CC-BY |
| `kid.glb` | The Noble Craftsman, Sketchfab | Reserva, não selecionado atualmente | CC-BY |

**Atribuição combinada (formato curto, útil para a tela de créditos):**
> Personagens atuais gerados localmente com Hunyuan3D e rigados no Blender.
> Corujas baseadas em "Cute Ghost"; árvores em "Low Poly Forest Tree Pack";
> livros em "Antique Book Set"; baú em "Stylized Treasure Chest"; arbustos em
> "Stylized Bush". "Mini Chibi Kid", "Business Man - Low Polygon game
> character" e "The Noble Craftsman" são fallbacks CC-BY do Sketchfab.
