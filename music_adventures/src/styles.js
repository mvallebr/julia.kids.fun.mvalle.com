// Music Adventures — folha de estilos (injetada uma única vez).

const STYLE_ID = 'music-adventures-styles';

const CSS = `
#mu { font-family: 'Fredoka','Segoe UI',system-ui,sans-serif; color: #fff7ea; }
.hidden { display: none !important; }

.mu-screen { position: absolute; inset: 0; overflow: hidden; background-size: cover; background-position: center; }
.mu-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(28,16,48,.42), rgba(28,16,48,.12) 40%, rgba(20,10,38,.55)); pointer-events: none; }

/* HUD */
.mu-hud { position: absolute; top: 0; left: 0; right: 0; z-index: 40; display: flex; align-items: center; gap: 10px; padding: 14px 16px; }
.mu-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px; font-weight: 800; font-size: 14px; background: rgba(24,14,44,.72); border: 1.5px solid rgba(255,255,255,.22); }
.mu-chip.clickable { cursor: pointer; border-color: rgba(255,209,102,.5); color: #ffe9b8; }
.mu-chip.clickable:hover { filter: brightness(1.15); }

/* painel central */
.mu-panel {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: min(720px, 94vw); max-height: calc(100dvh - 88px); overflow-y: auto; overflow-x: hidden;
  display: flex; flex-direction: column; align-items: center; gap: 14px;
  padding: 26px 28px 22px; border-radius: 30px; text-align: center;
  background: linear-gradient(165deg, rgba(52,30,92,.94), rgba(32,18,60,.96));
  border: 3px solid #ffd166; box-shadow: 0 24px 60px rgba(0,0,0,.55), 0 0 40px rgba(255,209,102,.22);
  z-index: 20;
}
.mu-title { font: 400 clamp(24px, 4.6vw, 36px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; text-shadow: 0 3px 0 rgba(120,60,0,.45); }
.mu-status { font-weight: 700; font-size: clamp(15px, 2.4vw, 18px); color: #ffe9b8; min-height: 1.5em; }

/* botões */
.mu-btn {
  display: inline-block; border: 0; cursor: pointer; border-radius: 999px;
  padding: 14px 34px; font-weight: 800; font-size: clamp(15px, 2.4vw, 18px); color: #3d2c10;
  background: linear-gradient(180deg, #ffe08a, #e0b04c);
  box-shadow: 0 6px 0 #9a7420, 0 14px 30px rgba(0,0,0,.45);
  transition: transform .15s, filter .2s;
}
.mu-btn:hover { transform: translateY(-2px); filter: brightness(1.06); }
.mu-btn.ghost { background: rgba(30,18,54,.7); color: #ffe9b8; border: 1.5px solid rgba(255,209,102,.5); box-shadow: none; padding: 11px 24px; font-size: 14px; }

/* ── hub ── */
.mu-hub-cards { display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; width: 100%; }
.mu-hub-card {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  width: min(300px, 86vw); padding: 22px 20px; border-radius: 24px; cursor: pointer;
  background: rgba(24,14,44,.78); border: 2.5px solid rgba(255,209,102,.4); color: #fff7ea;
  transition: transform .16s, border-color .2s, box-shadow .2s;
}
.mu-hub-card:hover:not(.locked) { transform: translateY(-4px); border-color: #ffd166; box-shadow: 0 16px 40px rgba(255,209,102,.25); }
.mu-hub-card .mu-hub-emoji { font-size: 44px; line-height: 1; }
.mu-hub-card .mu-hub-name { font-weight: 800; font-size: 20px; }
.mu-hub-card .mu-hub-desc { font-size: 13.5px; font-weight: 600; color: rgba(255,247,234,.78); line-height: 1.45; }
.mu-hub-card .mu-hub-stars { font-size: 15px; color: #ffd166; letter-spacing: .08em; }
.mu-hub-card.locked { opacity: .5; cursor: not-allowed; filter: saturate(.4); }

/* seletor de nível */
.mu-levels { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; width: 100%; }
.mu-level-btn {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 10px 4px; border-radius: 16px; cursor: pointer;
  background: rgba(24,14,44,.8); border: 2px solid rgba(255,209,102,.35); color: #fff7ea;
  font-weight: 800; font-size: 15px; transition: transform .14s, border-color .2s;
}
.mu-level-btn:hover:not(.locked) { transform: translateY(-3px); border-color: #ffd166; }
.mu-level-btn .stars { font-size: 11px; color: #ffd166; letter-spacing: .05em; }
.mu-level-btn.locked { opacity: .42; cursor: not-allowed; filter: saturate(.35); }
.mu-level-btn.done { border-color: #7ad97a; }

/* ── detetive de ouvir ── */
.mu-score-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.mu-note-dot {
  display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%;
  border: 2.5px dashed rgba(255,255,255,.5); font-size: 20px; font-weight: 800; color: #fff;
  background: transparent; transition: background .2s, border-color .2s;
}
.mu-note-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; width: 100%; }
.mu-action-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.mu-note-btn {
  --note-color: #ffd166;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  width: 76px; padding: 12px 6px 9px; border-radius: 18px; cursor: pointer;
  background: linear-gradient(180deg, color-mix(in srgb, var(--note-color) 88%, #fff 0%), color-mix(in srgb, var(--note-color) 70%, #000 12%));
  border: 0; box-shadow: 0 5px 0 rgba(0,0,0,.35), 0 10px 22px rgba(0,0,0,.3);
  color: #241430; transition: transform .12s, filter .15s;
}
.mu-note-btn:hover { transform: translateY(-3px); filter: brightness(1.08); }
.mu-note-btn:active { transform: translateY(1px); box-shadow: 0 2px 0 rgba(0,0,0,.35); }
.mu-note-sol { font-size: 20px; font-weight: 800; text-transform: capitalize; }
.mu-note-name { font-size: 11.5px; font-weight: 700; opacity: .8; }
.mu-note-btn.playing { transform: translateY(-4px) scale(1.06); filter: brightness(1.18); box-shadow: 0 0 24px color-mix(in srgb, var(--note-color) 70%, #fff); }
.mu-confirm { background: linear-gradient(180deg, #9fe8a8, #57c46a) !important; color: #143314 !important; box-shadow: 0 6px 0 #2c7a44, 0 14px 30px rgba(0,0,0,.45) !important; animation: muConfirmPulse 1.2s ease-in-out infinite; }
@keyframes muConfirmPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.shake { animation: muShake .5s ease; }
.wiggle { animation: muShake .5s ease; }
@keyframes muShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }

/* ── cante a canção ── */
.mu-pitch-canvas {
  width: 100%; height: 240px; border-radius: 18px;
  background: rgba(16,10,32,.6); border: 1.5px solid rgba(255,209,102,.35);
  touch-action: none;
}
.mu-axis-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; font-size: 12px; font-weight: 700; color: rgba(255,247,234,.75); }
.mu-axis-note { padding: 3px 9px; border-radius: 999px; background: rgba(255,255,255,.09); }

.mu-controls { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center; }
.mu-sing { min-width: 220px; }
.mu-sing.recording { background: linear-gradient(180deg, #ff8fa3, #e0506b); color: #fff; box-shadow: 0 6px 0 #8a2740, 0 0 30px rgba(255,110,140,.6); animation: muPulse 1s ease-in-out infinite; }
@keyframes muPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }

/* resultados em estrelas */
.mu-stars { font-size: 34px; letter-spacing: .12em; color: #ffd166; text-shadow: 0 3px 0 rgba(120,60,0,.4); }
.mu-stars .dim { opacity: .28; filter: grayscale(1); }

/* toasts / efeitos */
.mu-toast {
  position: fixed; top: 14%; left: 50%; transform: translateX(-50%) translateY(-8px); z-index: 96;
  padding: 12px 26px; border-radius: 999px; font-weight: 800; font-size: clamp(15px, 2.4vw, 20px);
  background: linear-gradient(135deg, rgba(58,40,110,.95), rgba(34,24,74,.95));
  border: 1.5px solid rgba(255,209,102,.55); color: #ffe9b8; box-shadow: 0 10px 30px rgba(0,0,0,.5);
  opacity: 0; transition: opacity .3s, transform .3s; pointer-events: none;
}
.mu-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.mu-toast-retry { border-color: rgba(255,143,163,.6); color: #ffc9d4; }

.mu-burst { position: fixed; z-index: 90; pointer-events: none; }
.mu-burst i { position: absolute; width: 9px; height: 9px; border-radius: 3px; animation: muBurstFly .9s ease-out forwards; }
@keyframes muBurstFly { to { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; } }

.mu-confetti-layer { position: fixed; inset: 0; z-index: 94; pointer-events: none; overflow: hidden; }
.mu-confetti-layer span { position: absolute; top: -24px; width: 11px; height: 15px; border-radius: 3px; animation: muConfettiFall linear forwards; }
@keyframes muConfettiFall { to { transform: translateY(110vh) rotate(660deg); opacity: .85; } }

@media (prefers-reduced-motion: reduce) {
  .mu-sing.recording, .shake, .wiggle { animation: none !important; }
}
@media (max-width: 640px) {
  .mu-panel { padding: 18px 14px 16px; max-height: calc(100dvh - 76px); }
  .mu-note-dot { width: 36px; height: 36px; font-size: 15px; }
  .mu-note-btn { width: 62px; padding: 9px 4px 7px; }
  .mu-note-sol { font-size: 16px; }
  .mu-note-name { font-size: 10px; }
  .mu-pitch-canvas { height: 200px; }
  .mu-sing { min-width: 180px; }
  .mu-levels { grid-template-columns: repeat(4, 1fr); }
}
`;

export function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
