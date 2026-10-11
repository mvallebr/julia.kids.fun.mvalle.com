// Folha de estilo do Arts & Crafts. Papel de artesanato: base creme, cantos
// redondos, letra grande, e nada de letreiro de escola (spec §6.1).

export const CSS = `
:root {
  --paper: #fdf6e8;
  --paper-deep: #f6e9d2;
  --ink: #3f3226;
  --ink-soft: #7a6a57;
  --line: #e6d6ba;
  --accent: #f0913a;
  --accent-2: #58b7a8;
  --accent-3: #e4657f;
  --radius: 26px;
  --veil: rgba(253, 246, 232, .88);
}

* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  background-image: radial-gradient(circle at 12% 8%, rgba(240, 145, 58, .12), transparent 42%),
                    radial-gradient(circle at 88% 14%, rgba(88, 183, 168, .12), transparent 40%),
                    radial-gradient(circle at 50% 96%, rgba(228, 101, 127, .10), transparent 46%);
  font-family: 'Fredoka', 'Segoe UI', system-ui, sans-serif;
  font-size: 17px;
  line-height: 1.45;
}

#app { max-width: 940px; margin: 0 auto; padding: 18px 18px 56px; }

.topbar {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; gap: 12px;
  margin: -18px -18px 20px; padding: 12px 18px;
  background: rgba(253, 246, 232, .94); backdrop-filter: blur(6px);
  border-bottom: 2px solid var(--line);
}
.identity { display: flex; align-items: center; gap: 10px; font-weight: 600; }
.identity .avatar {
  display: grid; place-items: center;
  width: 44px; height: 44px; border-radius: 50%;
  background: #fff; border: 2.5px solid var(--accent); font-size: 24px;
}
.identity .greet { font-size: 19px; }
.topbar .spacer { flex: 1; }
.icon-btn {
  min-width: 44px; min-height: 44px; padding: 8px 14px;
  border: 2.5px solid var(--line); border-radius: 999px;
  background: #fff; color: var(--ink);
  font: 600 15px 'Fredoka', sans-serif; cursor: pointer;
}
.icon-btn:hover { border-color: var(--accent); }

h1 { margin: 0 0 6px; font-size: clamp(28px, 6vw, 40px); line-height: 1.15; }
h2 { margin: 0 0 12px; font-size: clamp(22px, 4.4vw, 28px); }
.sub { margin: 0 0 22px; color: var(--ink-soft); }

/* --- home --- */
.hero {
  display: block; width: calc(100% + 36px); margin: -18px -18px 22px;
  height: clamp(150px, 26vw, 240px);
  object-fit: cover; object-position: center 62%;
  border-bottom: 3px solid var(--line);
}
.cards { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.card-btn {
  display: grid; gap: 6px; padding: 22px 20px; text-align: left; cursor: pointer;
  border: 3px solid var(--line); border-radius: var(--radius); background: #fff;
  box-shadow: 0 10px 24px rgba(120, 90, 40, .10);
  font: inherit; color: inherit;
  transition: transform .15s, box-shadow .2s, border-color .2s;
}
.card-btn:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: 0 14px 30px rgba(120, 90, 40, .16); }
.card-btn .emoji { font-size: 34px; line-height: 1; }
.card-btn .title { font-size: 21px; font-weight: 600; }
.card-btn .sub { margin: 0; font-size: 15px; }
.card-btn.tutorials { border-color: #f3c78a; }
.card-btn.games { border-color: #8fd0c6; }
.card-btn.gallery { border-color: #f2a9ba; }

/* --- tutorial browse --- */
.filters { display: grid; gap: 12px; margin-bottom: 18px; }
.search {
  width: 100%; padding: 13px 18px; font: 600 16px 'Fredoka', sans-serif;
  color: var(--ink); background: #fff; border: 2.5px solid var(--line); border-radius: 999px; outline: none;
}
.search:focus { border-color: var(--accent); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  min-height: 44px; padding: 8px 15px; cursor: pointer;
  border: 2.5px solid var(--line); border-radius: 999px; background: #fff;
  font: 600 15px 'Fredoka', sans-serif; color: var(--ink-soft);
}
.chip[aria-pressed='true'] { border-color: var(--accent); background: #fdecd6; color: var(--ink); }
.section-label { margin: 22px 0 10px; color: var(--ink-soft); font-size: 14px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.tut-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); }
.tut-card { padding: 0; overflow: hidden; text-align: left; cursor: pointer; border: 3px solid var(--line); border-radius: var(--radius); background: #fff; font: inherit; color: inherit; }
.tut-card img { display: block; width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.tut-card .body { padding: 12px 14px 16px; display: grid; gap: 6px; }
.tut-card .name { font-size: 17px; font-weight: 600; }
.tut-card .meta { display: flex; flex-wrap: wrap; gap: 6px; color: var(--ink-soft); font-size: 13.5px; }
.badge { padding: 2px 9px; border-radius: 999px; background: var(--paper-deep); color: var(--ink-soft); font-size: 12.5px; font-weight: 700; }
.badge.done { background: #dff0e4; color: #2f6b47; }
.badge.print { background: #e6eff7; color: #2f5470; }
.empty { padding: 30px; text-align: center; color: var(--ink-soft); border: 3px dashed var(--line); border-radius: var(--radius); }

/* --- tutorial detail --- */
.viewer { display: grid; gap: 18px; }
@media (min-width: 800px) { .viewer { grid-template-columns: minmax(0, 1.25fr) minmax(240px, .75fr); align-items: start; } }

.stage { position: relative; border: 3px solid var(--line); border-radius: var(--radius); overflow: hidden; background: #fff; }
.stage .art { display: block; width: 100%; height: auto; aspect-ratio: 4/3; object-fit: cover; }
.stage .veil { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.stage .hole { position: absolute; border: 4px solid var(--accent); border-radius: 16px; animation: pulse 1.9s ease-in-out infinite; }
.stage .hole.circle { border-radius: 50%; }
.step-count { text-align: center; color: var(--ink-soft); font-size: 15px; font-weight: 600; }
.dots { display: flex; justify-content: center; gap: 7px; }
.dots i { width: 11px; height: 11px; border-radius: 50%; background: var(--line); }
.dots i.on { background: var(--accent); }
.dots i.done { background: var(--accent-2); }
@keyframes pulse { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .stage .hole::after { animation: none; opacity: .8; } }

.side { display: grid; gap: 14px; }
.panel { padding: 16px 18px; border: 3px solid var(--line); border-radius: var(--radius); background: #fff; }
.panel h3 { margin: 0 0 8px; font-size: 16px; }
.panel ul { margin: 0; padding-left: 20px; color: var(--ink-soft); }
.tip { border-color: #f0c98d; background: #fdf2df; }
.safety { border-color: #f2a9ba; background: #fdeef1; }
.instruction { font-size: 20px; font-weight: 600; }
.swatches { display: flex; gap: 10px; }
.swatches span { width: 40px; height: 40px; border-radius: 50%; border: 2.5px solid var(--line); }
.swatches span:nth-child(1) { background: #c88b4a; }
.swatches span:nth-child(2) { background: #f2e6cf; }
.swatches span:nth-child(3) { background: #2f2a26; }

.nav-row { display: flex; gap: 12px; margin-top: 20px; }
.btn {
  flex: 1; min-height: 52px; padding: 12px 20px; cursor: pointer;
  border: 3px solid var(--line); border-radius: 999px; background: #fff;
  font: 600 17px 'Fredoka', sans-serif; color: var(--ink);
}
.btn:hover { border-color: var(--accent); }
.btn.primary { border-color: var(--accent); background: var(--accent); color: #fff; }
.btn.primary:hover { filter: brightness(1.05); }
.btn:disabled { opacity: .45; cursor: default; }
.btn.print { flex: 0 0 auto; background: #eef5fa; border-color: #b9d3e6; }

/* --- games map --- */
.seasons { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
/* A caixa NÃO tem proporção arbitrária: o coverRect do JS mede a caixa real e
   compensa qualquer corte, de modo que a âncora é sempre a mesma casa da arte,
   de um celular a uma tela grande. */
/* A proporção da caixa é a da ARTE, e não uma escolhida no olho. Com a caixa
   mais alta que a arte, o cover comia ~12% de cada lado: as duas casas das
   pontas saíam da tela, e a da esquerda caía em x=-2. Como a caixa é da mesma
   proporção, o cover não corta nada e o coverRect vira a identidade. */
.map {
  position: relative; overflow: hidden;
  aspect-ratio: 16/9;
  border: 3px solid var(--line); border-radius: var(--radius);
  background:
    radial-gradient(ellipse 60% 34% at 22% 82%, var(--map-path, #f2e3c6) 0 60%, transparent 61%),
    radial-gradient(ellipse 52% 30% at 74% 74%, var(--map-path, #f2e3c6) 0 60%, transparent 61%),
    linear-gradient(to bottom, var(--map-sky, #dff1ff) 0 34%, var(--map-horizon, #eaf7e4) 34% 42%, var(--map-ground, #a9d98a) 42% 100%);
}
.map .ground { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* A arte de estação: mesma imagem, mesma caixa, mesmo cover. Precisa entrar
   logo depois da arte e na mesma base de empilhamento, senão a copa repintada
   sai de registro da copa de baixo e o telhado perde a capa de neve. */
.season-art {
  position: absolute; inset: 0; width: 100%; height: 100%;
  pointer-events: none;
}

/* Véu de estação: uma cor sobre a arte, e ABAIXO dos rótulos.
   O ::after é sempre o último filho da caixa, então sem z-index ele pintava por
   cima dos nomes: no verão o "Art Studio" ficava amarelo sobre amarelo. A
   ordem explícita é arte (0) < véu (1) < camada dos destinos (2). */
.map::after {
  content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: var(--map-veil, transparent);
  transition: background .4s ease;
}

/* Camada do tamanho da arte, por cima do véu. left/top podem sair negativos: é
   o corte do cover compensado, e é por isso que uma âncora medida na arte cai
   na casa que ela nomeia. */
.map-layer { position: absolute; z-index: 2; pointer-events: none; }
.map-layer > * { pointer-events: auto; }
.map-overlay { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
/* A linha fica discreta no repouso e acende quando a casa apontada é vista de
   perto ou focada. A versão anterior ficava visível o tempo todo e lia como
   risco atravessando a arte — seis linhas brancas cortando a vila. */
.map-overlay .leader {
  stroke: rgba(255, 255, 255, .55); stroke-width: 2.5; stroke-linecap: round;
  filter: drop-shadow(0 1px 2px rgba(60, 40, 20, .3));
  opacity: .45; transition: opacity .25s ease, stroke-width .25s ease;
}
.leader.lit { opacity: 1; stroke-width: 5; }

/* O botão é a CASA: um alvo redondo do tamanho de toque, e nada mais.
   A versão anterior punha um disco branco semitransparente no meio do prédio
   — tapava justamente a construção que ele deveria apontar, e lia como adesivo
   colado por cima da arte. Agora o repouso é um aro fino e quente, quase
   invisível sobre a telha, e o nome é que carrega o peso visual. */
.dests { position: absolute; inset: 0; }
.dest {
  position: absolute; transform: translate(-50%, -50%);
  width: 76px; height: 76px; padding: 0; cursor: pointer;
  border: 0; border-radius: 50%; background: transparent; color: inherit;
}
.dest::before {
  content: ''; position: absolute; inset: 26px; border-radius: 50%;
  border: 3px solid var(--accent);
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, .8), 0 2px 8px rgba(60, 40, 20, .25);
  transition: transform .18s ease, background .18s ease;
}
.dest:hover::before, .dest:focus-visible::before, .dest.lit::before {
  transform: scale(1.3); background: var(--accent);
}
.dest:focus-visible { outline: 3px dashed var(--ink); outline-offset: 2px; }

/* O nome vai longe da casa, ligado por linha. Sem o offset o texto cobre a
   construção que ele nomeia — era o defeito do mapa antigo. */
.dest-label {
  position: absolute; transform: translate(-50%, -50%);
  min-height: 30px; padding: 5px 12px; pointer-events: none;
  border: 2.5px solid rgba(255, 255, 255, .95); border-radius: 999px;
  background: rgba(255, 255, 255, .94); color: var(--ink);
  font: 600 14px 'Fredoka', sans-serif; white-space: nowrap;
  box-shadow: 0 5px 14px rgba(60, 40, 20, .25);
  transition: transform .18s ease, background .18s ease;
}
.dest-label.lit { background: #fff; transform: translate(-50%, -50%) scale(1.06); }

/* Clima. O SVG das partículas fica na camada da arte, com o mesmo
   preserveAspectRatio do viewBox 0 0 100 100 do mapa. */
.weather { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.weather .flake { fill: #fff; animation: fall var(--dur, 7s) linear infinite; animation-delay: var(--delay, 0s); opacity: .85; }
.weather.sun .flake { fill: #ffd166; animation: none; opacity: .5; }
.weather.leaves .flake { fill: #e2703a; animation: fall var(--dur, 7s) linear infinite; animation-delay: var(--delay, 0s); }
.weather.petals .flake { fill: #f7b7cf; animation: fall var(--dur, 7s) linear infinite; animation-delay: var(--delay, 0s); }

/* Neve nos telhados: um véu branco no alto da arte, que só aparece no inverno
   (snow: 1 põe a opacidade). Cobre telhado sem cobrir a casa inteira, e fica
   entre a arte e a camada dos destinos para não lavar o nome da casa. */
.snow-cap {
  position: absolute; inset: 0 0 auto; height: 62%; z-index: 1; pointer-events: none;
  opacity: var(--map-snow, 0);
  background: linear-gradient(to bottom, rgba(255, 255, 255, .95) 0 12%, rgba(255, 255, 255, .55) 34%, transparent 78%);
  transition: opacity .5s ease;
  -webkit-mask-image: linear-gradient(to bottom, #000 0 46%, transparent 84%);
  mask-image: linear-gradient(to bottom, #000 0 46%, transparent 84%);
}
@keyframes fall {
  0%   { transform: translate(0, -12%); opacity: 0; }
  12%  { opacity: .9; }
  88%  { opacity: .9; }
  100% { transform: translate(var(--drift, 0px), 112%); opacity: 0; }
}

/* --- spin art lab --- */
.spin-game { display: grid; gap: 16px; justify-items: center; }
.spin-stage {
  display: grid; place-items: center;
  width: 100%; padding: 14px;
  border: 3px solid var(--line); border-radius: var(--radius);
  background: linear-gradient(160deg, #efe6d6, #f7efe0);
}
.spin-wrap { position: relative; width: min(100%, 560px); aspect-ratio: 1; touch-action: none; }
.spin-sheet {
  display: block; width: 100%; height: 100%;
  /* O que gira é um PRATO, não uma folha quadrada. O canvas continua quadrado
     por uma razão só: toda a matemática do jogo — raio, ângulo, a receita que
     vira miniatura na galeria — é normalizada pela meia-largura, e trocar o
     canvas por um disco de verdade mudaria o referencial de tudo. O recorte é
     só de aparência: um círculo em volta do mesmo desenho. */
  border-radius: 50%;
  box-shadow:
    0 0 0 10px #d8c6a4,
    0 0 0 14px #b49a72,
    0 18px 34px rgba(90, 66, 34, .34);
  /* O giro é um transform no canvas, escrito a cada quadro pelo jogo. A origem
     tem de ser o centro, senão o prato fica girando em torno do canto. */
  transform-origin: 50% 50%;
  will-change: transform;
  cursor: crosshair;
}
/* O pincel. Vive FORA do canvas que gira: ele é a mão, e a mão não gira com o
   papel. Cada modo tem uma forma, para a criança ver o que vai acontecer antes
   de acontecer. */
.brush {
  position: absolute; width: 46px; height: 46px;
  transform: translate(-50%, -50%); pointer-events: none;
  border-radius: 50%; opacity: 0; transition: opacity .18s ease;
}
.brush.painting, .spin-wrap:hover .brush { opacity: 1; }
.brush::before, .brush::after {
  content: ''; position: absolute; inset: 0; border-radius: 50%;
}
.brush::before {
  border: 3px solid rgba(255, 255, 255, .95);
  box-shadow: 0 0 0 2px rgba(43, 37, 64, .55), 0 3px 10px rgba(60, 40, 20, .35);
}
/* Fixo: um anel fechado, do tamanho exato do traço. */
.brush.ring::after { inset: 17px; background: var(--accent); }
/* Dedo: uma mira, porque quem aponta quer saber onde está apontando. */
.brush.cross::before { border-radius: 6px; }
.brush.cross::after {
  inset: 21px; background: transparent;
  border: 3px solid var(--accent); border-radius: 50%;
}
/* Ondulante: o anel ondula. O desenho é a forma do pincel. */
.brush.wave::before { border-style: dashed; }
.brush.wave::after {
  inset: 11px; background: transparent;
  border: 3px dotted var(--accent); border-radius: 50%;
}
/* Espiral: duas voltas abertas, como o traço vai sair. */
.brush.spiral::after {
  inset: 7px; background: transparent;
  border: 3px solid var(--accent); border-radius: 50%;
  border-top-color: transparent; border-left-color: transparent;
  transform: rotate(35deg);
}
.brush.spiral::before { border-style: dotted; }
/* Órbita: dois anéis, porque o pincel dá a volta em volta de si. */
.brush.orbit::after {
  inset: 9px; background: transparent;
  border: 3px solid var(--accent); border-radius: 50%;
  border-bottom-color: transparent;
}
/* Saltitante: pontilhado, porque o traço salta. */
.brush.flicker::before { border-style: dotted; border-width: 5px; }
.brush.flicker::after { inset: 18px; background: var(--accent); }
/* Gêmeo: dois pingos, porque são dois raios. */
.brush.twin::after {
  inset: 8px; background: transparent;
  border: 3px solid var(--accent); border-radius: 50%;
}
.brush.twin::before { border-style: dashed; }

.spin-bar { display: grid; gap: 10px; width: 100%; justify-items: center; }
.spin-row { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
.spin-row.inks { gap: 6px; }
.spin-btn {
  min-height: 42px; padding: 8px 14px; cursor: pointer;
  border: 2.5px solid var(--line); border-radius: 999px; background: #fff;
  font: 600 14px 'Fredoka', sans-serif; color: var(--ink);
  transition: border-color .15s, background .15s;
}
.spin-btn:hover { border-color: var(--accent); }
.spin-btn.on { border-color: var(--accent); background: #fdecd6; }
.spin-btn.wide { background: var(--accent-2); border-color: var(--accent-2); color: #fff; }
.spin-ink {
  width: 42px; height: 42px; cursor: pointer; border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, .9); background: var(--ink);
  box-shadow: 0 2px 8px rgba(60, 40, 20, .25);
  transition: transform .15s;
}
.spin-ink.on { transform: scale(1.18); border-color: var(--ink); }
.spin-paper { padding: 3px; cursor: pointer; border: 3px solid var(--line); border-radius: 12px; background: #fff; line-height: 0; }
.spin-paper.on { border-color: var(--accent); }
.swatch-canvas { width: 58px; height: 58px; border-radius: 8px; }
.spin-label { color: var(--ink-soft); font-size: 14px; font-weight: 700; }
.spin-speed { width: 170px; accent-color: var(--accent); }
.spin-speed-value { min-width: 34px; color: var(--ink-soft); font-weight: 700; }

/* --- galeria --- */
.gallery-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
.gallery-item { margin: 0; padding: 0; overflow: hidden; border: 3px solid var(--line); border-radius: var(--radius); background: #fff; }
.gallery-thumb { display: block; width: 100%; height: auto; aspect-ratio: 1; }
.gallery-item figcaption { padding: 9px 12px; color: var(--ink-soft); font-size: 13.5px; font-weight: 600; }

/* --- modal --- */
.backdrop { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; padding: 18px; background: rgba(63, 50, 38, .5); }
.backdrop[hidden] { display: none; }
.sheet { width: min(480px, 100%); padding: 24px; border: 3px solid var(--line); border-radius: var(--radius); background: #fffaf0; }
.sheet h2 { margin-bottom: 8px; }
.sheet .actions { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }

/* A lista de destinos só existe na tela estreita. Escondida com display, e
   não com visibility: fora da árvore de acessibilidade e fora da ordem do
   tab, para o mesmo destino não ser anunciado duas vezes. Precisa vir ANTES
   da media query: depois, com a mesma especificidade, o display:none daqui
   venceria o display:grid de lá e a lista nunca apareceria. */
.dest-list { display: none; gap: 8px; margin-top: 14px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
.dest-item {
  min-height: 48px; padding: 10px 14px; text-align: left; cursor: pointer;
  border: 2.5px solid var(--line); border-radius: 16px; background: #fff;
  font: 600 15px 'Fredoka', sans-serif; color: var(--ink);
}
.dest-item:hover { border-color: var(--accent); }

@media (max-width: 560px) {
  #app { padding: 14px 14px 44px; }
  .topbar { margin: -14px -14px 16px; padding: 10px 14px; }
  .nav-row { flex-direction: column; }
  /* Os rótulos deitados saem da borda e se cruzam nessa largura: o "Creative
     Challenges" era cortado em "...ive Challenges" e o "Spin Art Lab" ficava
     por cima dele. A lista assume o nome de cada casa e os rótulos saem de
     cena; as casas continuam nos mesmos lugares medidos. */
  .dest-label, .map-overlay { display: none; }
  .dest-list { display: grid; }
  .dest { width: 58px; height: 58px; }
  .dest::before { inset: 16px; }
}
@media print {
  .topbar, .nav-row, .side { display: none; }
  .stage { border: 0; }
  body { background: #fff; }
}
`;
