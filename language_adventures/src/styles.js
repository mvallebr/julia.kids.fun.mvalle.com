// Language Adventures — folha de estilos (injetada uma única vez).

const STYLE_ID = 'language-adventures-styles';

const CSS = `
#la { font-family: 'Fredoka','Segoe UI',system-ui,sans-serif; color: #1f2a24; }
.hidden { display: none !important; }

.la-screen { position: absolute; inset: 0; overflow: hidden; background-size: cover; background-position: center; }
.la-scroll { position: absolute; inset: 0; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; }

/* HUD */
.la-hud { position: absolute; top: 0; left: 0; right: 0; z-index: 40; display: flex; align-items: center; gap: 10px; padding: 14px 16px; }
.la-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px; font-weight: 800; font-size: 14px; background: #fff; border: 1.5px solid rgba(30,60,40,.18); color: #1f2a24; box-shadow: 0 3px 10px rgba(20,40,25,.12); }
.la-chip.clickable { cursor: pointer; border-color: #57c48f; color: #157347; }
.la-chip.clickable:hover { filter: brightness(1.06); }

/* painel central claro (estilo Duolingo, sem copiar) */
.la-panel {
  background: #fff; border-radius: 26px; border: 2px solid #e3ece5;
  box-shadow: 0 18px 44px rgba(25,50,30,.18);
  padding: 24px 26px; display: flex; flex-direction: column; align-items: center; gap: 14px;
}
.la-title { font: 400 clamp(26px, 5vw, 40px) 'Luckiest Guy','Fredoka',sans-serif; color: #157347; }
.la-subtitle { font-weight: 700; color: #4c6b58; }
.la-status { font-weight: 700; font-size: clamp(15px, 2.4vw, 18px); color: #234332; min-height: 1.5em; }

/* botões */
.la-btn {
  display: inline-block; border: 0; cursor: pointer; border-radius: 16px;
  padding: 14px 30px; font-weight: 800; font-size: clamp(15px, 2.4vw, 17px); color: #fff;
  background: #58cc72; box-shadow: 0 5px 0 #3fa055, 0 10px 22px rgba(40,120,60,.25);
  transition: transform .14s, filter .15s;
}
.la-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
.la-btn:disabled { opacity: .45; cursor: default; box-shadow: 0 5px 0 #9db8a4; }
.la-btn.ghost { background: #fff; color: #2c7a4b; border: 2px solid #cfe3d5; box-shadow: 0 3px 0 #cfe3d5; padding: 11px 22px; font-size: 14px; }

/* ── seletor de idioma ── */
.la-lang-grid { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%; }
.la-lang-card {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  width: min(220px, 80vw); padding: 20px; border-radius: 22px; cursor: pointer;
  background: #f6fbf7; border: 2.5px solid #dbeae0; color: #1f2a24;
  transition: transform .15s, border-color .2s, box-shadow .2s;
}
.la-lang-card:hover { transform: translateY(-4px); border-color: #58cc72; box-shadow: 0 14px 30px rgba(60,140,90,.2); }
.la-lang-flag { font-size: 44px; line-height: 1; }
.la-lang-name { font-weight: 800; font-size: 19px; }
.la-lang-sample { font-size: 13.5px; font-weight: 700; color: #157347; font-style: italic; }

/* ── caminho de lições (Duolingo-like, spec §4/§5) ── */
.la-path-wrap { display: flex; flex-direction: column; align-items: center; gap: 0; width: 100%; }
.la-section-head {
  margin: 18px 0 10px; padding: 10px 26px; border-radius: 999px;
  color: #fff; font-weight: 800; font-size: clamp(15px, 2.6vw, 18px);
  box-shadow: 0 6px 18px rgba(0,0,0,.18);
}
.la-node-row { display: flex; align-items: center; justify-content: center; height: 84px; position: relative; width: 100%; }
.la-node-row::before {
  content: ''; position: absolute; left: 50%; top: -6px; bottom: -6px; width: 8px;
  transform: translateX(-50%); border-radius: 4px; background: var(--line-color, #dfeee4);
}
.la-node-row:first-of-type::before, .la-node-row.last::before { display: none; }
.la-node {
  position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
  width: 190px; padding: 0; border: 0; background: transparent; cursor: pointer; color: #1f2a24;
}
.la-node-circle {
  display: grid; place-items: center; width: 62px; height: 62px; border-radius: 50%;
  font-size: 26px; color: #fff; border: 0; cursor: pointer;
  background: var(--node-color, #58cc72); box-shadow: 0 6px 0 var(--node-shadow, #3fa055), 0 10px 20px rgba(0,0,0,.15);
  transition: transform .14s, filter .15s;
}
.la-node:hover .la-node-circle:not(.locked) { transform: translateY(-3px); filter: brightness(1.06); }
.la-node-circle.locked { background: #b9c9bf; box-shadow: 0 6px 0 #93a89a; cursor: not-allowed; opacity: .75; }
.la-node-circle.done { box-shadow: 0 6px 0 var(--node-shadow, #3fa055), 0 0 0 4px rgba(88,204,114,.3); }
.la-node-label { font-weight: 800; font-size: 13.5px; background: #fff; border-radius: 10px; padding: 3px 10px; border: 1.5px solid #e3ece5; }
.la-node-stars { font-size: 11px; color: #b8860b; font-weight: 800; letter-spacing: .06em; }

/* ── lição ── */
.la-prompt { font-size: clamp(18px, 3.4vw, 24px); font-weight: 800; color: #234332; text-align: center; }
.la-target-word { font: 400 clamp(30px, 6vw, 44px) 'Luckiest Guy','Fredoka',sans-serif; color: #157347; text-align: center; }
.la-gloss { font-size: clamp(16px, 2.6vw, 19px); font-weight: 700; color: #4c6b58; }

.la-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
.la-option {
  padding: 15px 18px; border-radius: 16px; cursor: pointer; text-align: left;
  border: 2px solid #dbeae0; background: #f6fbf7; color: #1f2a24;
  font-size: clamp(15px, 2.4vw, 17px); font-weight: 700;
  transition: border-color .15s, background .15s, transform .12s;
}
.la-option:hover { border-color: #58cc72; transform: translateY(-2px); }
.la-option.wrong { border-color: #ff8fa3; background: #fff0f3; animation: laShake .45s ease; }
.la-option.right { border-color: #58cc72; background: #ebf9ee; }
.la-options.single { grid-template-columns: 1fr; }

.la-match-grid { display: flex; gap: 16px; width: 100%; justify-content: center; }
.la-match-col { display: flex; flex-direction: column; gap: 9px; flex: 1; }
.la-match-cell {
  padding: 11px 14px; border-radius: 13px; border: 2px solid #dbeae0; background: #f6fbf7;
  cursor: pointer; font-weight: 700; font-size: clamp(14px, 2.2vw, 16px); color: #1f2a24; text-align: center;
}
.la-match-cell.selected { border-color: #58cc72; background: #ebf9ee; }
.la-match-cell.locked { border-color: #7ad97a; background: #ebf9ee; cursor: default; opacity: .85; }
.la-match-cell.wrong { border-color: #ff8fa3; background: #fff0f3; animation: laShake .45s ease; }

.la-blank { display: inline-block; min-width: 84px; border-bottom: 3px dashed #58cc72; color: #157347; font-weight: 800; padding: 0 6px; }

/* pronúncia */
.la-mic {
  display: inline-flex; align-items: center; gap: 10px; border: 0; cursor: pointer;
  border-radius: 999px; padding: 14px 30px; font-weight: 800; font-size: 16px; color: #fff;
  background: #58cc72; box-shadow: 0 5px 0 #3fa055;
}
.la-mic.recording { background: #ff5e7e; box-shadow: 0 5px 0 #c23b5b; animation: laPulse 1s ease-in-out infinite; }
@keyframes laPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.la-pron-score { font-size: 44px; }
.la-feedback.good { color: #1f8f4a; } .la-feedback.yellow { color: #b8860b; } .la-feedback.red { color: #d64562; }

/* história */
.la-story-lines { display: flex; flex-direction: column; gap: 12px; }
.la-story-line { font-size: clamp(16px, 2.6vw, 19px); line-height: 1.6; color: #2b3d33; text-align: left; }
.la-story-line b, .la-story-line strong { color: #157347; font-weight: 800; }
.la-newword {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 14px 30px; border-radius: 18px; background: #ebf9ee; border: 2px dashed #58cc72;
}
.la-newword small { font-weight: 800; color: #4c6b58; letter-spacing: .06em; text-transform: uppercase; font-size: 11px; }
.la-newword .word { font: 400 30px 'Luckiest Guy','Fredoka',sans-serif; color: #157347; }

/* monstro */
.la-monster-box { display: grid; place-items: center; min-height: 150px; }
.la-monster { overflow: visible; }
.la-cosmetic-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; }
.la-cosmetic {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 10px 6px; border-radius: 16px; border: 2px solid #dbeae0; background: #f6fbf7;
  cursor: pointer; font-weight: 700; font-size: 13px; color: #1f2a24;
}
.la-cosmetic .emoji { font-size: 24px; }
.la-cosmetic.equipped { border-color: #58cc72; background: #ebf9ee; }
.la-cosmetic.locked { opacity: .45; cursor: not-allowed; filter: saturate(.4); }

/* estrelas / recompensa */
.la-stars-row { font-size: 38px; letter-spacing: .12em; color: #b8860b; }
.la-stars-row .dim { opacity: .25; filter: grayscale(1); }
.la-unlock-card {
  display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 26px;
  border-radius: 18px; background: #fff8e1; border: 2px solid #ffd166;
}
.la-unlock-card .emoji { font-size: 40px; }

/* toasts e efeitos */
.la-toast { position: fixed; top: 12%; left: 50%; transform: translateX(-50%) translateY(-8px); z-index: 96; padding: 12px 26px; border-radius: 999px; font-weight: 800; font-size: clamp(15px, 2.4vw, 19px); background: #fff; border: 2px solid #58cc72; color: #157347; box-shadow: 0 10px 26px rgba(30,60,40,.22); opacity: 0; transition: opacity .3s, transform .3s; pointer-events: none; }
.la-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.la-toast.retry { border-color: #ff8fa3; color: #d64562; }

.la-burst { position: fixed; z-index: 90; pointer-events: none; }
.la-burst i { position: absolute; width: 9px; height: 9px; border-radius: 3px; animation: laBurstFly .9s ease-out forwards; }
@keyframes laBurstFly { to { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; } }

.la-confetti-layer { position: fixed; inset: 0; z-index: 94; pointer-events: none; overflow: hidden; }
.la-confetti-layer span { position: absolute; top: -24px; width: 11px; height: 15px; border-radius: 3px; animation: laConfettiFall linear forwards; }
@keyframes laConfettiFall { to { transform: translateY(110vh) rotate(660deg); opacity: .85; } }

@keyframes laShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

@media (prefers-reduced-motion: reduce) {
  .la-mic.recording, .la-option.wrong, .la-match-cell.wrong, .la-confirm { animation: none !important; }
}
@media (max-width: 640px) {
  .la-panel { padding: 18px 14px; }
  .la-options { grid-template-columns: 1fr; }
  .la-cosmetic-grid { grid-template-columns: repeat(3, 1fr); }
  .la-node { width: 160px; }
  .la-node-label { font-size: 12px; }
}
`;

export function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
