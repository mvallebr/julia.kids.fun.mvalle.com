# Atribuições CC-BY — Modelos 3D externos

Os modelos 3D abaixo foram baixados do [Sketchfab](https://sketchfab.com)
via Blender MCP e integrados ao RPG Welling. Todos estão sob licenças
Creative Commons que requerem atribuição ao autor original.

As atribuições também são exibidas no jogo na tela "Créditos" (HUD ℹ️).

> **Ivy e Oakley (personagens principais atuais)**: gerados por IA
> **localmente** na máquina do autor — concept art via Minimax
> text-to-image, malha via Tencent **Hunyuan3D-2mini** (open source),
> textura via **Hunyuan3D-2 paint** (open source), rig e animações
> feitas em **Blender** via script (`ai/hp3d-rig.py`). Sem assets de
> terceiros — créditos de modelos externos abaixo referem-se aos GLBs
> legados ainda em `assets/`.

---

## Corujas (Pip + Marlow) — `owl.glb`

Baseada no modelo **"Cute Ghost"** de **Sketchfab**.
UID: `2c8c03bb0e5049529e653f9011a8fc90`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/cute-ghost-2c8c03bb0e5049529e653f9011a8fc90>

> Modificada: cor original (branco/cinza) → marrom-coruja; adicionados
> dois olhos pretos como esferas. Demais formas do "ghost" mantidas
> (asas/bumbps que viraram "orelhas" estilizadas da coruja).

---

## NPCs adultos (Sr. Finch, Sra. Page) — `npc.glb`

Modelo **"Business Man - Low Polygon game character"** de **Sketchfab**.
UID: `b6f6740f883b4749abac47af0045a9dd`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/business-man-low-polygon-game-character-b6f6740f883b4749abac47af0045a9dd>

---

## Bosque (pack de árvores) — `trees.glb`

Modelo **"Low Poly Forest Tree Pack"** de **Sketchfab**.
UID: `5ff5a51e74324845a4e4905f182dfb2b`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/low-poly-forest-tree-pack-5ff5a51e74324845a4e4905f182dfb2b>

> Usado em `buildWoods()` com rotação/scale aleatórios por instância para
> dar variedade ao bosque. Inclui também pedras decorativas que podem
> ser usadas como props.

---

## Livros da biblioteca — `books.glb`

Modelo **"Antique Book Set"** de **Sketchfab**.
UID: `a7e1164cca004a65ab53ce0e8553586c`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/antique-book-set-a7e1164cca004a65ab53ce0e8553586c>

> *(pré-carregado; integração visual com `makeBookSet` ainda pendente.)*

---

## Baú do tesouro — `chest.glb`

Modelo **"Stylized Treasure Chest"** de **Sketchfab**.
UID: `dbeae8db89eb433f832d0ef48f12480e`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/stylized-treasure-chest-dbeae8db89eb433f832d0ef48f12480e>

> *(pré-carregado; integração visual com `makeChest` ainda pendente.)*

---

## Arbustos — `bush.glb`

Modelo **"Stylized Bush"** de **Sketchfab**.
UID: `9d9ce79d3ae040619e96d5b22c7de1a6`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/stylized-bush-9d9ce79d3ae040619e96d5b22c7de1a6>

> *(pré-carregado; integração visual com `makeBush` ainda pendente.)*

---

## Kid (personagem principal animado) — `kid-animated.glb`

Modelo **"Mini Chibi Kid (Free Demo)"** de **joaobaltieri** (Sketchfab).
UID: `6feb5bd7ade54b5fac25a0e1e5fbe729`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/mini-chibi-kid-free-demo-6feb5bd7ade54b5fac25a0e1e5fbe729>

> Usado como personagem principal (Ivy/Oakley) com **18 animações**
> rigadas no esqueleto (walk, run, idle, jump, sitting, blinking,
> turning). No jogo: idle ↔ walk com fade via AnimationMixer; Oakley
> recebe o boné tingido de azul pra diferenciar da Ivy.

## Kid (reservado para uso futuro) — `kid.glb`

Modelo **"The Noble Craftsman"** de **Sketchfab**.
UID: `0e8ff87ffaa24731b2474badebca870d`
Licença: **CC Attribution** (`by`)
URL: <https://sketchfab.com/3d-models/the-noble-craftsman-0e8ff87ffaa24731b2474badebca870d>

> *(pré-carregado; kid procedural ainda em uso — personagem principal
> tem animação de andar + piscadinha que o GLB não tem. Possível
> migração futura quando tivermos animação rig no GLB.)*

---

## Resumo das licenças

| Modelo | Licença | URL autor |
|---|---|---|
| kid-animated (Mini Chibi Kid) | CC-BY | <https://sketchfab.com/3d-models/mini-chibi-kid-free-demo-6feb5bd7ade54b5fac25a0e1e5fbe729> |
| owl (base: Cute Ghost) | CC-BY | <https://sketchfab.com/3d-models/cute-ghost-2c8c03bb0e5049529e653f9011a8fc90> |
| npc (Business Man) | CC-BY | <https://sketchfab.com/3d-models/business-man-low-polygon-game-character-b6f6740f883b4749abac47af0045a9dd> |
| trees (Forest Tree Pack) | CC-BY | <https://sketchfab.com/3d-models/low-poly-forest-tree-pack-5ff5a51e74324845a4e4905f182dfb2b> |
| books (Antique Book Set) | CC-BY | <https://sketchfab.com/3d-models/antique-book-set-a7e1164cca004a65ab53ce0e8553586c> |
| chest (Treasure Chest) | CC-BY | <https://sketchfab.com/3d-models/stylized-treasure-chest-dbeae8db89eb433f832d0ef48f12480e> |
| bush (Stylized Bush) | CC-BY | <https://sketchfab.com/3d-models/stylized-bush-9d9ce79d3ae040619e96d5b22c7de1a6> |
| kid (Noble Craftsman) | CC-BY | <https://sketchfab.com/3d-models/the-noble-craftsman-0e8ff87ffaa24731b2474badebca870d> |

**Atribuição combinada (formato curto, útil pra tela de créditos):**
> Modelos 3D por autores do Sketchfab, sob CC-BY.
> Owl baseado em "Cute Ghost"; NPCs em "Business Man - Low Polygon
> game character"; árvores em "Low Poly Forest Tree Pack"; livros em
> "Antique Book Set"; baú em "Stylized Treasure Chest"; arbustos em
> "Stylized Bush"; kid alternativo em "The Noble Craftsman".

---

## Fundo real de Oxleas Wood — `oxleas-backdrop.jpg`

Fotografia do próprio **Oxleas Wood** (Welling, Royal Borough of Greenwich),
tirada pelo autor do jogo e usada como panorama do horizonte da fase da mata.
Sem licença de terceiros: a imagem é do autor do projeto.
