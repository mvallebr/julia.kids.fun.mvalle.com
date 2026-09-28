# Lições das Artes & Crafts

Este documento registra **por que** as artes foram feitas do jeito que foram.
Ele existe porque quase todo o tempo gasto nesta app não foi escrever código:
foi descobrir que a arte estava errada, e errar de novo antes de acertar.

As regras abaixo valem para qualquer tutorial novo desta pasta.

---

## 1. A lição precisa ser UMA figura, não sete artes

O que estava no ar antes: sete fotos de crafts diferentes, cada uma gerada por
IA. Passo 1 pedia "passe o contorno da coruja no papel", e a folha impressa era
outra coruja. A criança imprimia uma coisa e pintava outra.

Isso não é um detalhe de arte, é um defeito de produto: a lição inteira não faz
sentido junto.

**Regra.** Escolha a figura **primeiro**, e derive dela todos os quadros. A
folha impressa, o primeiro quadro e o último quadro têm de ser a mesma figura.
Se você está gerando uma arte nova por passo, o caminho está errado.

## 2. "Figura para colorir" é um gênero específico

O erro que deu origem a tudo: o passo 1 era uma **silhueta** — só o contorno
externo. A lógica por trás ("pinta por cima do contorno") parece boa e está
errada.

Uma figura para colorir tem **contorno interno denso**: fileiras de penas, cada
pena desenhada, barbas da asa, tufo da orelha, escamas do rosto, cada dedo com
sua garra. Sem isso a criança não tem nenhuma decisão a tomar: basta pintar
dentro de uma mancha. E na folha impressa não tem o que colorir.

**Regra.** Peça "colouring book page", nunca "outline" nem "silhouette". Olhe o
resultado e conte as linhas internas: se tem menos que uns trinta traços
dentro da figura, não é uma figura para colorir.

## 3. A forma pintada tem que ser a forma desenhada

Aqui está a lição que mais custou, e ela é técnica, não de gosto.

Tentamos preencher a coruja **recortando por caixa de posição** — elipse para o
rosto, retângulo para o corpo, faixa para o pé. O resultado tinha um retângulo
marrom no meio da coruja, uma elipse branca e uma faixa laranja. É visivelmente
errado e não há como disfarçar.

A segunda tentativa foi **inundação**: o branco é o papel, a tinta é o traço, e
o que a tinta cerca é uma área a pintar. A forma pintada passa a ser
exatamente a forma desenhada, sem contorno, sem serrilhado, sem máscara.

Só que a inundação **exige que o contorno feche**. E o desenho gerado com
traço fino **não fecha**: tem furas de 1 pixel onde o traço afinou, e uma
fura só já deixa a água entrar e esvaziar a figura inteira por dentro.

**Regra.** Pinte por inundação, nunca por caixa de posição. E **meça** o
fechamento antes de pintar, em vez de assumir:

```sh
python3 tools/check-closed.py <desenho.jpg>
```

O script imprime quanto do quadro ficou de fato cercado, e o **tamanho da maior
área** — que é o número que decide. A soma engana: um traço esfarelado fecha
dezenas de pedacinhos e soma vários por cento, sem ter uma única área
pintável. Abaixo de 2% do quadro, ou sem nenhuma área do tamanho de um corpo,
o desenho tem de ser gerado de novo.

Os números que decidiram a Corujinha Pintada:

| desenho | total cercado | maior área | veredito |
|---|---|---|---|
| traço fino (candidato inicial) | 3,59% | 0,89% | reprovado — 25 migalhas, nenhuma área de corpo |
| traço grosso, formas fechadas | 26,49% | 12,11% | aprovado — 14 áreas, o corpo inteiro |

O prompt que resolveu, além de "colouring book", pede explicitamente
**VERY BOLD THICK black outlines**, **EVERY shape is a COMPLETELY CLOSED
outline** e **no hatching, no crosshatching, no scribbles**. Traço grosso não
é só estética: é o que fecha a forma.

## 4. A tinta entra depois do preenchimento, e por cima dele

A camada de cor precisa ser **abaixo** do traço. A criança pinta por cima do
próprio lápis, então o desenho tem de continuar visível depois de pintado.
Se a linha some, a figura deixou de ser uma figura para colorir e virou uma
coruja pintada com borda — que era justamente o defeito da versão com foto.

## 5. Não existe camada quando a arte é o próprio molde

Com foto de craft pronto existe uma "camada" que se recorta. Aqui isso não
existe, e o motivo é bom: **o fundo do desenho é papel branco desde o
começo**. Não há nada atrás para vazar. A figura já é a coisa a ser pintada.

Foi por isso que a tentativa de "recortar a foto da pelúcia e pintar por
dentro" não podia dar certo: o objeto real tem fundo, e o recorte sempre
mostra.

## 6. Meça a polaridade antes de confiar no número

Perdi tempo medindo "0,00% da figura cercado" em desenho que fechava. O
erro: o traço é o pixel **escuro**, e o teste pegava o pixel **claro**. O
resultado dava 100% de linha numa folha em branco, e zero áreas.

**Regra.** Antes de acreditar num número de imagem, confirme que ele
discrimina: um teste bom dá 0% e 100% em casos que você conhece.

## 7. A dica não pode contradizer o que a lição entrega

O passo 1 dizia: *"Sem impressora? Desenhe uma coruja simples numa folha e
copie o formato."* A lição entrega o molde pronto, com o interno todo. A dica
pedia para a criança fazer a versão sem forma, que é pior que o que ela já
tem na mão.

**Regra.** Releia as dicas depois de definir a arte. Se a dica oferece um
caminho pior que o que a lição dá, ela vai embora.

## 8. Os passos têm que existir de verdade

O texto tinha um passo "pinte as orelhas primeiro" e dois quadros de arquivos
"orelhas". Ao medir as regiões do desenho, **não existe região de orelha**: o
tufo faz parte de uma única região com a cabeça. Se o passo ficasse, teríamos
dois quadros consecutivos idênticos, e a criança leria isso como bug.

**Regra.** Os passos saem das regiões que o desenho tem. Derive os nomes dos
passos do arte e não do que seria bonito escrever. Se o texto promete uma
região que não existe, ou o desenho muda ou o passo some — nunca os dois.

---

## 9. Véu ou inundação? Decide o verbo, não o gosto

Quando estas regras se aplicam é uma pergunta, e a resposta é curta:

- a criança **monta, recorta, cola, molda** → **véu**. Uma imagem base, revelada
  aos poucos. O objeto aparece conforme as partes ficam prontas.
- a criança **pinta** → **inundação**. Só ela consegue mostrar um corpo
  ficando marrom.

O véu escurece e clareia; ele não sabe mostrar uma figura meio pintada, e o
"fantasma" dos outros tutoriais é a arte final lavada de cinza. Numa lição de
colorir isso é mentira, e a inundação é a única que ensina.

Hoje são três tutoriais de pintura por inundação — Corujinha Pintada, Balão
Colorido e Gato Pintado — e 35 de véu. Os três são os únicos em que a criança
pinta de verdade.

## 10. O medidor é a herança; o pincel é o detalhe

O que vale guardar da Corujinha Pintada não foi o desenho. Foi `check-closed.py`
responder "isto é pintável?" em um segundo sobre qualquer imagem.

Gerei seis candidatos para duas figuras e **quatro não passaram** (dois voltaram
sem tinta nenhuma, dois com o contorno aberto). Isso não é azar da primeira
tentativa: é a taxa normal. O medidor é o que transforma isso de "horas de
tentativa" em "um segundo por candidato".

## 11. A caixa nomeia, e às vezes também junta

A caixa de região tem duas funções, e a segunda só apareceu fazendo o gato.

1. **Nomear** cada parte — a tinta sempre preenche a área que o lápis fechou.
2. **Juntar** partes que o desenho fragmentou.

No gato, as listras cruzam o rabo e o dividem em dezenas de lasquinhas de menos
de 0,2% cada. Nenhuma delas é a "região do rabo". Mas uma caixa que pega o
rabo inteiro junta todas e pinta de uma cor só. Sem isso o rabo ficaria branco
e o gato pareceria inacabado.

Regra de mão: se uma parte visível não aparece na lista de regiões, ela está
fragmentada, e provavelmente precisa de uma caixa maior.

## 12. Meça o centróide, não o palpite

As caixas do balão saíram de um palpite — "sete painéis iguais entre 0.22 e
0.80" — e duas não pegaram em nada. A mediu: os painéis estão em cx
0.294 / 0.339 / 0.408 / 0.497 / 0.582 / 0.647 / 0.695, e a trama de baixo se
separa por **y**, não por x.

Para ver isso, imprima as regiões com centroide e tamanho antes de escrever o
spec. Custa um segundo e evita um spec inventado.

## 13. A primeira caixa que pega vence

Uma região que caísse em duas caixas entrava nas duas e era pintada duas vezes.
Agora a atribuição é **primeira casa vence**, e por isso a ordem do spec importa:
do mais específico (a orelha) para o mais largo (o corpo).

## 14. Quadros próprios também passam pelo validador

A coruja escapou das regras porque usa `framePattern` em vez de véu, e ninguém
avisou. O que evita a próxima:

- `contentProblems` roda sobre a lista inteira, e a suíte confere que **cada
  quadro existe em disco** e que o molde existe.
- A regra do primeiro passo (não mostrar o objeto pronto antes de começar)
  vale para os dois sistemas: nos quadros próprios o primeiro é a linha a lápis.

Ainda falta uma regra: nenhum teste impede que um `printable` seja de outra
figura que não a dos quadros. Foi o defeito original da coruja e ele não
voltou sozinho — voltou porque ninguém estava olhando.


## 15. Figura grande e centrada fecha; diagrama espalhado não fecha

Esta regra é sobre o **assunto**, não sobre a técnica.

Todos os aprovados são uma figura grande no meio da folha: coruja, balão,
gato, caçadora, chapéu, peixe, gato astronauta. Sete de sete.

Todos os **diagramas** falharam:

| assunto | candidatos | aprovados |
|---|---|---|
| sistema solar | 6 | 0 |
| anatomia da planta | 3 | 0 |
| anatomia da abelha | 3 | 0 |

Doze de doze. A falha é sempre a mesma: o medidor devolve áreas de menos de
3%, porque um diagrama espalha a figura em muitas peças pequenas e nenhuma
delas chega a ter o tamanho de um corpo.

**Regra.** Tutorial de colorir quer uma FIGURA. Se a ideia é um diagrama com
muitas peças pequenas, a técnica não é a inundação — é o véu, como o resto do
app. Não force.

## 16. O prompt fica mais forte quando pede MENOS coisa

A bruxa falhou 3 de 3 pedindo onze peças de uma vez: chapéu, aba, rosto, olhos,
boca, cabelo, ombros, capa, gola, mãos e vassoura. Pedindo de novo com quatro
peças, passou.

**Regra.** Peça de três a seis peças grandes. Quando a taxa de aprovação cai, a
primeira coisa a cortar é a lista de elementos, não a ênfase no traço.

## 17. O ensino mora na tinta, não no texto

O jeito que funciona não é uma explicação fora da imagem: é **cada parte
pintada ter uma função que o texto conta naquele passo**.

- Peixe: pinta a cauda → "é o que empurra o peixe para a frente".
- Astronauta: pinta o capacete → "existe porque no espaço não tem ar".
- Astronauta: pinta a mochila → "é onde fica o ar".

A criança aprende a figura pintando a figura, e a explicação não vira uma
caixinha de texto fora do caminho.

## 18. Caixa estreita demais pega o vizinho

Três erros em quatro figuras, todos da mesma família:

- **Peixe:** a caixa da "bolha" pegava a barbatana dorsal, e o peixe saía com
  a barbatana azul.
- **Caçadora:** a caixa das "luvas" engolia o torso, e a jaqueta saía creme
  em vez de roxa.
- **Bruxa:** a caixa da "fivela" pegava o trecho esquerdo da fita, e a fita
  saía meio dourada.

Nenhum aparece no número: todas as caixas estavam "corretas" e o resultado saiu
errado. **A caixa só se acerta no olho, depois de derivada.** A cor errada é o
aviso mais rápido de que uma caixa está larga demais.

## 19. Personagem original, não a marca

O pedido veio com Harry Potter, Hello Kitty e KPop Demon Hunters. São registro
de terceiros, e o gerador não produz personagem de terceiro com direito: no
melhor caso sai algo genérico e sem direito.

O que entrou foram as **ideias** com personagens originais: bruxa, heroína
guerreira, gato no espaço, peixe. É a mesma coisa que a criança gosta, e é
legítimo.

## 20. Montar é um terceiro padrão, e a mão é a professora

O Robô de Papelão era o pior tutorial do app e o defeito não era o texto: era
que ele nunca mostrava a construção. Uma foto só, o robô pronto, e sete passos
que só acendiam partes dele. A criança era mandada "marcar a altura na caixa"
diante de uma foto de robô — a caixa nunca aparecia.

O que resolve mostra o que nenhuma foto de objeto mostra: **a mão, dentro do
quadro, fazendo a ação**. O dedo apontando a borda, a mão com a cola em cima da
junta. Nenhum texto diz *onde* e *como* do jeito que uma mão diz.

São três padrões:

| | como funciona | serve para |
|---|---|---|
| véu | 1 foto revelada aos poucos | mostrar o resultado, e só isso |
| quadros pintados | 1 desenho, pintado | a criança pinta |
| **fotos por passo** | **1 foto por passo, mão no quadro** | **qualquer montagem** |

E vale o que as fotos de referência têm e o gerador não entrega de graça: o
trabalho é **imperfeito**. Tinta uneven, cola aparecendo, nome torto. Isso diz
"dá para fazer assim". Objeto perfeito e profissional assusta criança de 7 anos.

## 21. A folha de instruções resolve a coerência sem imagem de referência

Sete chamadas ao gerador dão sete robôs diferentes, porque o MCP não expõe
`subject_reference`. Era o dilema: uma imagem mantém a coerência e não mostra
a construção; sete imagens mostram a construção e perdem a coerência.

A saída é **gerar uma folha com os 8 painéis de uma vez e recortar**. É
literalmente a mesma figura nas oito fotos, porque é a mesma imagem.

E é preciso **conferir a ordem antes de instalar**. De quatro folhas geradas,
duas saíram com a ordem trocada: uma tinha o robô já com rosto no quarto quadro
de oito, e duas das oito etapas pedidas nem apareciam. A boa só apareceu na
segunda tentativa, e foi aí que a ordem fechou: papelão, marcar, cortar,
recortar, olhos, fita e botões, montado, pronto.

**Regra.** Recorte e olhe a sequência ANTES de escrever o texto. E escreva o
texto pela ordem que saiu na imagem, não pela que você tinha planejado — foi o
que aconteceu aqui, e o texto antigo descrevia etapas que as fotos não
mostravam.

## Onde a arte vem de

- **Geração:** MiniMax `image-01`, via MCP `mcp__minimax_media_text_to_image`.
  O MCP **não expõe `subject_reference`**, então gerar a mesma figura várias
  vezes não é confiável: cada chamada devolve uma coruja diferente. Por isso a
  regra 1 — gerar **uma** vez e derivar.
- **O que o MCP resolve:** a arte é gerada, não desenhada à mão, então as sete
  cenas da mesma figura saem baratas e consistentes.
- **O que ele não resolve:** a consistência entre si. Várias chamadas = várias
  figuras. Derive de uma só.

## Como refazer um tutorial

1. Escolha a figura e escreva a intenção em uma frase.
2. Gere **uma** arte, com prompt de figura para colorir: traço grosso, formas
   fechadas, sem hachura.
3. `python3 tools/check-closed.py arte.jpg` — abaixo de 2% do quadro, ou sem
   nenhuma área do tamanho de um corpo, gere de novo.
4. Imprima as regiões com centroide e tamanho. Escreva o spec a partir do
   número, não do palpite.
5. `python3 tools/derive-frames.py arte.jpg spec.json saida/` — ele aborta se
   o contorno não fechar, então não dá para pintar errado sem perceber.
6. **Olhe o quadro final.** Se uma parte visível ficou branca, ela está
   fragmentada: alargue a caixa dela.
7. Escreva os passos **a partir das regiões que existem**.
8. Recorte a figura pela tinta, monte o molde e confira o primeiro quadro, o
   último e a folha impressa: é a mesma figura?

## Como escolher a arte

Gere três candidatos e meça os três antes de olhar qualquer um deles. A taxa de
aprovação é de mais ou menos um em três: das seis figuras geradas para o Balão e
o Gato, quatro não fecharam — duas voltaram sem tinta nenhuma.

## Quando a criança monta, não de Coleção

Este é outro caminho, e é o do Robô de Papelão, do Organizador de Mesa, do
Labirinto: os 35 tutoriais em que a criança **monta** e não pinta.

1. Gere **uma folha de 8 painéis** com a mão em cada quadro (regra 20).
2. Recorte e **olhe a ordem** antes de instalar (regra 21).
3. Escreva o texto pela ordem que saiu, não pela planejada.
4. Ponha na lista de materiais o que aparece na foto: tesoura, caneta, fita.
   A lista antiga falava em cola e não em tesoura, e a foto antiga também.
