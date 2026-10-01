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

## 20. Montagem é uma sequência de estados, não um véu

O T14 original usava uma única foto do robô pronto, e o véu só acendia regiões.
Isso não mostrava a caixa do passo 1 nem como as peças apareciam.

Para este tutorial, a ordem de produto é: corpo, cabeça, braços, pés, botões,
olhos/antenas e nome/trabalho. Cada quadro precisa mostrar o estado acumulado
depois daquele passo. A mão é importante quando a ação é cortar, dobrar ou colar
em um lugar preciso; para uma adição simples de peça, a mudança visível do
objeto já ensina. Não invente uma ordem diferente da spec para acomodar a arte.

| padrão | como funciona | quando usar |
|---|---|---|
| véu | revela partes de uma imagem pronta | mostrar o resultado, não a construção |
| quadros pintados | a mesma figura ganha tinta por etapas | a criança pinta |
| fotos por estágio | o objeto acumula uma peça por etapa | a criança monta |

## 21. Coerência vem da referência compartilhada e da máscara

Sete chamadas independentes de `txt2img` deram robôs diferentes. Repetir prompt
ou seed não trava identidade, proporção nem posição.

O fluxo que funcionou para o T14 e o T13:

1. Gere uma base coerente para a primeira etapa (ou escolha uma referência confiável), inteira no quadro e com as peças conferidas.
2. Edite a imagem anterior, uma peça por vez, sempre com o mesmo canvas.
3. Se o editor mudar outras áreas, use uma máscara para compor apenas a edição
   autorizada sobre a etapa anterior.
4. Salve em formato sem perdas e verifique que os pixels fora da máscara são
   idênticos; revise também a emenda e o conteúdo dentro dela.
5. Monte uma folha de contato e confira a ordem antes de escrever os passos.

No T13, tentar remover olhos, bico e asas de uma foto final não funcionou: o
editor manteve as peças. Gerar o tubo simples dobrado como primeira etapa deu
uma base consistente para acrescentar o restante. Não dependa de uma edição
reversa quando o primeiro estado puder ser gerado diretamente.


Na sequência local do robô, os sete quadros mantiveram o mesmo enquadramento e
cada transição alterou pixels só na região da peça nova. Os botões ficaram um
pouco brilhantes e as fotos não mostram uma mão em ação: coerência de imagem não
substitui revisão didática.

**ComfyUI/Qwen 2511.** O PNG final do T14 guarda o grafo que funcionou:
`TextEncodeQwenImageEditPlus` para as duas condicionais (a negativa vazia também
recebe a imagem-base), `VAEEncode` da mesma imagem como latent de entrada e
KSampler com 20 passos, CFG 4, `euler`/`simple`, `denoise=1`. Não troque a
imagem latente de entrada por um latent vazio: a edição pode deixar de seguir a
etapa anterior. A máscara local continua sendo a autoridade para proteger o
resto do quadro.

## 22. Foto com mão é opcional, e compô-la é pior que refazer

A spec pede "real hands may appear where they help explain an action" — pode,
não precisa. No T16 eu argumentei que o passo do corte só se ensina com tesoura
na mão, e gerei sete fotos de ação. São ótimas fotos e estão erradas para o
app: cada uma tem caixa, tamanho e câmera próprios, porque a mão do editor não
cabe no quadro anterior. Sete fotos bonitas de caixas diferentes violam a
lição nº 1.

As duas tentativas de unir as duas coisas falharam, e é o que vale guardar:

1. **Máscara retangular.** A mão entra, mas o fundo do editor traz um retângulo
   de parede mais clara. Com plumagem de 1,5 px a emenda aparece como um
   quadrado; com 26 px aparece um halo branco. A emenda não se resolve: ela
   aparece justamente onde a foto nova e a antiga discordam.
2. **Máscara de pele.** Segmentar a pele e compor só a mão resultou em pedaços
   de mão flutuando no meio do quadro, porque a mão da foto nova está em outra
   posição. A máscara seleciona onde a pele *está*, não onde ela *precisa
   estar*.

A regra que saiu disso: **ou a foto inteira é coerente com a sequência, ou ela
fica de fora.** A progressão do objeto (marcar → cortar → forrar → etiquetar →
decorar → divisória → lápis) é o que o app mostra; a foto de mão é um material
de apoio, não um quadro do passo.


## 23. Forma geométrica se desenha, não se edita

Bolinha de vidro, cronômetro e tampinhas de garrafa são círculos, retângulos e
gradientes. Editar com o modelo deu resultados que mudavam de tamanho a cada
tentativa; desenhar com PIL sobre a etapa anterior, com máscara e sombra de
contato, deu o resultado exato no primeiro intento. A regra do ladrilho
funciona: **o que a régua resolve, a régua resolve.**

E o inverso apareceu no mesmo lote: parede de labirinto desenhada por código
acima de uma edição que *já tinha* a parede resultou em duas paredes paralelas. Antes
de desenhar por cima, confira o que a etapa anterior já trouxe.

## 24. O editor não levanta peça: ele redesenha a região

No T07 o passo "cole as torres" e o passo "junte os muros e o portão" são a
mesma operação com difficulty diferente, e o modelo trata as duas igual: ele
reimagina a região mascarada. Some quem não está no prompt.

O que foi observado, em quatro tentativas no mesmo par:

1. Máscara grande pedindo as duas coisas de uma vez: o pátio sai bom e as
   torres **somem**.
2. Máscara grande pedindo só as torres, com texto que enumera o que continua
   deitado: as torres aparecem e o resto do desenho é reescrito.
3. Máscara em faixa, só na metade de baixo, pedindo o muro em pé: o editor
   redesenha a peça **deitada**, porque peça deitada é o que a faixa contém.
4. Desenhar o muro em pé por código: sai geometricamente certo e
   fotograficamente falso, com ameias que parecem blocos soltos.

Duas técnicas resolveram o que o prompt não resolveu:

- **Recolocar por cópia.** A torre é uma região fotográfica pronta do quadro
  anterior, e a câmera não se moveu: basta colar de volta aquele retângulo com
  a borda suavizada. Não é redesenho, é pixels verdadeiros, e a emenda
  desaparece porque a cena ao redor é a mesma.
- **Voltar um passo apagando o que o passo acrescentou.** Bandeirinha é
  geometria pura; para obter o quadro anterior ao das bandeiras, o caminho foi
  NÃO pedir remoção ao modelo (remoção é ainda mais frágil que acréscimo) e
  sim partir do quadro limpo e redesenhar só a bandeirinha.

A regra que vale para o bloco inteiro: **peça deitada, mostra o modelo
montando; peça em pé, monta por código ou copia do quadro anterior.** E nunca
aceite um quadro de montagem sem abrir e olhar: foi o que fez as torres
sumirem três vezes antes de aparecerem.


## 25. A base precisa de mesa vazia ao redor do trabalho

No T08 a caixa de giz encostava na folha do molde, e a máscara precisava cortar
a folha sem cortar a caixa. Todo recorte deixava um resto: uma lasca branca de
2 cm, uma coluna listrada, um retângulo claro. E "consertar" o resto na mesa foi
pior que o resto — três tentativas de remendo produziram um quadrado mais
evidente, um pedaço de coruja colado na mesa e uma segunda coruja fantasma.

Regra que resolveu, na base seguinte: **ferramenta na borda do quadro, trabalho
no meio.** Caixa de giz e bastão de cola meio fora de quadro, folha do molde
com 30 cm de madeira livre em volta, máscara em retângulo simples. Nenhum resto,
nenhum remendo.

E o modelo inventa apoio: quando a única coisa nova é um objeto em pé, ele
coloca uma folha branca atrás "para o objeto ficar". No T08 a coruja terminou
sobre um retângulo de papel com borda dura. Pedir "sem folha nenhuma" na segunda
tentativa deu folha de novo, em outra posição. O que fica é o quadro com a
folha: ela parece uma folha de papel em cima da mesa, e o passo ainda ensina
correto. Recusar é gastar meia hora para trocar um artefato menor.


## 26. Dobradura é geometria exata: o modelo não acerta, e não vale forçar

O T09 é uma sequência de triângulos: quadrado, dobra na diagonal, ponta para
cima, duas orelhas, vira, rosto. Cada passo é um polígono com vértice
exatamente no lugar, e o modelo devolve aproximações: o triângulo virou
trapézio (duas vezes, em duas sementes), as orelhas viraram dois retângulos
com um entalhe, e o "vire do outro lado" virou outra coisa só. O rosto, esse
sim, saiu certo — porque rosto é o que o modelo sabe fazer.

A saída lógica seria desenhar a dobradura por código, como os telhados e as
bandeirinhas do castelo. O obstáculo não é o polígono, é o fundo: cada dobra
descobre uma parte da mesa que estava coberta por papel, e a mesa da foto tem
gradiente de luz, veio e brilho. Tentei reconstruir a mesa a partir das faixas
limpas do mesmo quadro: saiu uma parede de madeira com emenda no meio, e
remendar por cima já tinha custado três tentativas no T08.

Decisão: **o T09 fica com o quadro único por enquanto**, e o registro fica
escrito. Entregar um trapézio onde o texto diz triângulo, para a criança
aprender a olhar errado, é pior que a foto só do resultado. Se a dobradura
voltar a entrar no app, o caminho não é insistir no prompt: é gerar a sequência
inteira em ilustração vetorial, num estilo que não finja ser foto, e aí as sete
etapas saem com a régua.


## 27. Biblioteca publicada é a que tem quadro próprio, e só ela

Depois de sair o T26, a biblioteca tinha 42 tutoriais: 22 com os sete quadros da
construção e 20 com a foto do objeto pronto e véu por região. Deixar os dois
lados misturados no ar é pior do que qualquer um deles sozinho — a criança
passa de um tutorial que mostra a montagem para outro que só mostra o
resultado, e o segundo parece o primeiro errado.

Então os 20 que ainda não têm quadro saíram da biblioteca, e saíram por marca,
não por delete: `draft: true` no tutorial e uma lista derivada,
`LIVE_TUTORIALS`, que é o que o app usa em todo lugar — contagem da home,
procura, chips de categoria, destaque, rota do passo, tela de parabéns e a
superfície de QA. O tutorial continua no repositório, continua passando por
todos os testes (chaves nos três idiomas, assets no disco, sem quadro órfão) e
volta à biblioteca quando os quadros existirem: é apagar uma linha.

Duas coisas que só apareceram depois de tirar:

1. **O link direto de um rascunho.** `#/t/clay-pinch-pot/0` agora cai na lista
   em vez de abrir o tutorial. Não é erro de verdadeiro — não existe tutorial
   com esse slug — e é o comportamento certo.
2. **Chip de categoria vazia.** "Massa e Modelagem", "Spin Art", "Design 2D" e
   "Modelagem 3D" passaram a ser botões que só levavam à tela de "nada
   encontrado". Agora o chip só aparece se existe tutorial publicado na
   categoria.

O teste que amarra a decisão está na seção 4 do `arts-crafts.test.js`:
**todo tutorial publicado tem `framePattern` e todos os passos têm `image`.**
Publicar com quadro único agora quebra o build, não só a conversa.





## 28. O modelo troca uma coisa e perde outras três

No T31 (Distintivo Pessoal) o passo 6 é "faça uma segunda versão com outras
cores". Duas gerações, dois defeitos, nenhum deles no prompt:

1. Pedindo "uma segunda versão ao lado da primeira" com a primeira descrita só
   como "a que já está", o modelo desenhou **duas corais**. A azul — que era a
   primeira, a que existia no quadro anterior — sumiu. Repetir o prompt com
   "esquerda é a azul, direita é a coral" resolveu.
2. No passo 7, pedindo "a escolhida sozinha, um pouco maior", o modelo redesenhou
   o distintivo **sem a borda de pontinhos, sem o anel amarelo e sem as faixas de
   nome**. Dois anos de_quadro para um "um pouco maior".

O padrão é o da lição 24 com outro nome: **o modelo redesenha a região, e o que
não está no texto do prompt não sobrevive.** Daí a regra prática que saiu daqui:
quando um passo adiciona uma peça e não mexe em nenhuma outra, o prompt tem que
**enumerar o que fica**, não só o que muda. "Mantém o anel amarelo, a fileira de
pontinhos, a estrela e as duas faixas em branco" custa uma frase e segura o
quadro.

E quando o passo é só *tirar* uma peça, o caminho curto não é pedir a remoção:
é **colar a peça que sobrou** a partir do quadro anterior, que tem o objeto já
certo e na posição certa.

## Proveniência da Corujinha Pintada

*A seção abaixo registra o caminho usado para as artes de pintura; não é o
pipeline do Robô de Papelão.*

Geração inicial: MiniMax `image-01`, via MCP
`mcp__minimax_media_text_to_image`. O MCP não expõe `subject_reference`; cada
chamada devolve uma coruja diferente. Por isso, para a pintura, a regra continua
sendo gerar uma figura e derivar dela os quadros.

## Proveniência do Robô de Papelão

A referência do robô foi criada localmente com Forge/SDXL. As edições de
referência usaram Qwen Image Edit 2511 local via ComfyUI-GGUF; as regiões
aprovadas foram compostas sobre a imagem anterior. Nenhuma foto de entrada foi
enviada a um serviço remoto. Os pesos ficam fora deste repositório.


## Proveniência das artes de sucata (T15 a T18)

Jardim de Flores, Organizador de Mesa, Mosaico de Tampinhas e Labirinto de
Papelão seguem o mesmo caminho do Robô de Papelão: a primeira etapa é uma
referência gerada na própria máquina com Qwen Image Edit 2511 via
ComfyUI-GGUF, cada etapa seguinte é uma edição mascarada da anterior com o
mesmo modelo, e as formas geométricas (tampinhas, bolinha, cronômetro, becos sem
saída) foram desenhadas por código sobre a etapa anterior, dentro da máscara. As
fotos de ação com mão foram geradas para apoio e não entraram no app; ver a
lição nº 22. Nenhuma foto de entrada foi enviada a um serviço remoto.


## Como refazer um tutorial de pintura

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

## Como escolher arte para pintar

Gere três candidatos e meça os três antes de olhar qualquer um deles. A taxa de
aprovação é de mais ou menos um em três: das seis figuras geradas para o Balão e
o Gato, quatro não fecharam — duas voltaram sem tinta nenhuma.

## Quando a criança monta: uma referência, mudanças locais

Este é o caminho para o Robô de Papelão e os outros tutoriais em que a criança
monta partes.

1. Releia a ordem dos passos na spec; não invente passos para combinar com uma
   imagem pronta.
2. Crie e confira uma referência final com o objeto inteiro dentro do quadro.
3. Edite uma peça por etapa, partindo da etapa anterior, com canvas e câmera
   fixos. Não use sete chamadas independentes de `txt2img` como sequência.
4. Quando o editor redesenhar o quadro inteiro, aplique só a máscara da peça
   nova à etapa anterior e confira que o exterior ficou pixel a pixel igual.
5. Foto com mão é opcional (a spec diz "may appear"). Se ela for gerada, use
   apenas quando a foto inteira continuar coerente com a sequência: mão
   recortada por máscara não fecha, porque a mão editada nasce em outra
   posição e em outro enquadramento. Fora desse caso, a progressão clara do
   objeto basta — desde que o texto e a imagem descrevam o mesmo passo.
6. Confira os sete quadros em uma folha de contato antes de instalar e remova os
   assets antigos que nenhum passo usa.
