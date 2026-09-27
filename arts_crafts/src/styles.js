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
.map {
  position: relative; overflow: hidden;
  aspect-ratio: 16/10; min-height: 320px;
  border: 3px solid var(--line); border-radius: var(--radius);
  background:
    radial-gradient(ellipse 60% 34% at 22% 82%, var(--map-path, #f2e3c6) 0 60%, transparent 61%),
    radial-gradient(ellipse 52% 30% at 74% 74%, var(--map-path, #f2e3c6) 0 60%, transparent 61%),
    linear-gradient(to bottom, var(--map-sky, #dff1ff) 0 34%, var(--map-horizon, #eaf7e4) 34% 42%, var(--map-ground, #a9d98a) 42% 100%);
}
.map::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(circle at 14% 26%, var(--map-accent, #f7b7cf) 0 2.5%, transparent 3%),
              radial-gradient(circle at 88% 20%, var(--map-accent, #f7b7cf) 0 2%, transparent 2.6%),
              radial-gradient(circle at 62% 88%, var(--map-accent, #f7b7cf) 0 1.8%, transparent 2.4%);
  opacity: .7;
}
.map .ground { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.dests { position: absolute; inset: 0; }
.dest {
  position: absolute; transform: translate(-50%, -50%);
  min-height: 44px; padding: 7px 13px; cursor: pointer;
  border: 2.5px solid rgba(255, 255, 255, .9); border-radius: 999px;
  background: rgba(255, 255, 255, .92); color: var(--ink);
  font: 600 14.5px 'Fredoka', sans-serif; white-space: nowrap;
  box-shadow: 0 5px 14px rgba(60, 40, 20, .22);
}
.dest:hover { background: #fff; }

/* --- modal --- */
.backdrop { position: fixed; inset: 0; z-index: 50; display: grid; place-items: center; padding: 18px; background: rgba(63, 50, 38, .5); }
.backdrop[hidden] { display: none; }
.sheet { width: min(480px, 100%); padding: 24px; border: 3px solid var(--line); border-radius: var(--radius); background: #fffaf0; }
.sheet h2 { margin-bottom: 8px; }
.sheet .actions { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }

@media (max-width: 560px) {
  #app { padding: 14px 14px 44px; }
  .topbar { margin: -14px -14px 16px; padding: 10px 14px; }
  .hero { width: calc(100% + 28px); margin: -14px -14px 18px; }
  .nav-row { flex-direction: column; }
  .dest { font-size: 13px; padding: 6px 10px; }
}
@media print {
  .topbar, .nav-row, .side { display: none; }
  .stage { border: 0; }
  body { background: #fff; }
}
`;
