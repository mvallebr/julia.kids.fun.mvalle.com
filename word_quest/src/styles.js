// The Word Quest — estilos cinematográficos: noite azul-dourada, painéis de
// pergaminho, tipografia premium. Injetados uma única vez.

const STYLE_ID = 'word-quest-styles';

const CSS = `
#wq { position: fixed; inset: 0; overflow: hidden; font-family: 'Fredoka','Segoe UI',system-ui,sans-serif; color: #f3ead5; }
.hidden { display: none !important; }
button { font-family: inherit; }

.wq-screen { position: absolute; inset: 0; overflow: hidden; background-size: cover; background-position: center; }
.wq-veil { position: absolute; inset: 0; background: radial-gradient(1200px 700px at 50% 30%, rgba(10,12,30,.1), rgba(8,10,24,.55)); pointer-events: none; }

/* painéis */
.wq-parchment {
  background: linear-gradient(165deg, #f8efdb, #f0dfb8);
  border: 2px solid #caa54c; border-radius: 6px 22px 22px 22px;
  box-shadow: 0 18px 50px rgba(0,0,0,.55), inset 0 0 0 3px rgba(202,165,76,.35);
  color: #3d2c10;
}
.wq-panel-dark {
  background: linear-gradient(165deg, rgba(24,22,44,.94), rgba(14,13,30,.96));
  border: 2px solid #b99548; border-radius: 22px;
  box-shadow: 0 18px 50px rgba(0,0,0,.6), 0 0 34px rgba(255,209,102,.14);
  color: #f3ead5;
}

/* topo */
.wq-top {
  position: absolute; top: 0; left: 0; right: 0; z-index: 40;
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 18px;
  background: linear-gradient(180deg, rgba(8,10,24,.88), rgba(8,10,24,0));
}
.wq-logo { font: 400 clamp(20px, 3.2vw, 30px) 'Luckiest Guy','Fredoka',sans-serif; color: #f2d488; letter-spacing: .04em; text-shadow: 0 2px 0 #7a5a12, 0 6px 18px rgba(0,0,0,.6); line-height: 1.05; }
.wq-logo small { display: block; font: 700 9px 'Fredoka',sans-serif; letter-spacing: .38em; color: #cbb27a; text-transform: uppercase; }
.wq-hud { display: flex; gap: 12px; align-items: center; }
.wq-chip {
  display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px;
  border-radius: 14px; border: 1.5px solid rgba(255,209,102,.4);
  background: rgba(10,12,26,.78); backdrop-filter: blur(6px);
  font-weight: 800; font-size: 15px; color: #ffe9b8; font-variant-numeric: tabular-nums;
}
.wq-chip.clickable { cursor: pointer; transition: transform .15s, border-color .2s; }
.wq-chip.clickable:hover { transform: translateY(-2px); border-color: #ffd166; }

/* mapa */
.wq-map-locations { position: absolute; inset: 0; }
.wq-loc {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 10px 16px; border-radius: 18px; cursor: pointer;
  border: 2px solid rgba(255,224,130,.5); background: rgba(12,14,30,.78);
  color: #f3ead5; backdrop-filter: blur(4px);
  transition: transform .16s, box-shadow .2s, border-color .2s;
  text-align: center; min-width: 130px;
}
.wq-loc-name { font-weight: 800; font-size: clamp(12px, 1.7vw, 15px); text-shadow: 0 2px 6px rgba(0,0,0,.55); }
.wq-loc-emoji { font-size: clamp(22px, 3.4vw, 30px); line-height: 1; }
.wq-loc-status { font-size: 11px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
.wq-loc.done { border-color: rgba(122,217,122,.75); }
.wq-loc.done .wq-loc-status { color: #9fe8a8; }
.wq-loc.current { border-color: #ffd166; box-shadow: 0 0 0 4px rgba(255,209,102,.22), 0 0 36px rgba(255,209,102,.5); animation: wqPulse 1.6s ease-in-out infinite; }
.wq-loc.locked { opacity: .55; filter: saturate(.35); cursor: not-allowed; }
.wq-loc:not(.locked):hover { transform: translate(-50%, -50%) scale(1.06); }
@keyframes wqPulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.05); } }
.wq-route { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }

/* história */
.wq-story {
  position: absolute; left: 50%; bottom: 8%; transform: translateX(-50%);
  width: min(680px, 92vw); padding: 22px 26px; z-index: 30; text-align: center;
}
.wq-story-line { margin: 10px 0 0; font-size: clamp(15px, 2.4vw, 19px); font-weight: 600; line-height: 1.55; color: #3d2c10; min-height: 2.6em; }
.wq-story .wq-btn { margin-top: 16px; }
.wq-story-art { width: min(420px, 80vw); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,.6); display: block; margin: 0 auto 14px; }

/* botões */
.wq-btn {
  display: inline-block; border: 0; cursor: pointer; border-radius: 999px;
  padding: 14px 34px; font-weight: 800; font-size: clamp(15px, 2.4vw, 18px); color: #3d2c10;
  background: linear-gradient(180deg, #ffe08a, #e0b04c);
  box-shadow: 0 6px 0 #9a7420, 0 14px 30px rgba(0,0,0,.45);
  transition: transform .15s, box-shadow .15s, filter .2s;
  letter-spacing: .02em;
}
.wq-btn:hover { transform: translateY(-2px); filter: brightness(1.06); }
.wq-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #9a7420, 0 8px 18px rgba(0,0,0,.4); }
.wq-btn.ghost { background: rgba(30,26,54,.7); color: #ffe9b8; border: 1.5px solid rgba(255,209,102,.5); box-shadow: none; padding: 11px 24px; font-size: 14px; }

/* quiz */
.wq-quiz {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: min(760px, 94vw); max-height: 92vh; overflow-y: auto;
  padding: 26px 30px 24px; z-index: 30; text-align: center;
}
.wq-q-count { font-weight: 800; letter-spacing: .1em; font-size: 12px; color: #cbb27a; text-transform: uppercase; }
.wq-stake { margin-top: 4px; font: 800 clamp(17px, 2.6vw, 22px) 'Fredoka',sans-serif; color: #ffd166; }
.wq-question { margin: 16px 0 4px; font-size: clamp(17px, 2.8vw, 23px); font-weight: 800; line-height: 1.4; }
.wq-question-display { font-size: clamp(24px, 4.4vw, 36px); font-weight: 800; color: #ffe08a; margin: 10px 0 0; }
.wq-question-doc { font-size: clamp(14.5px, 2.2vw, 16.5px); font-weight: 500; line-height: 1.6; color: #f3ead5; text-align: left; white-space: pre-line; background: rgba(255,224,130,.07); border: 1.5px solid rgba(255,224,130,.3); border-radius: 14px; padding: 14px 16px; max-height: 30vh; overflow-y: auto; }
.wq-options { display: flex; flex-direction: column; gap: 11px; margin-top: 18px; }
.wq-option {
  display: flex; align-items: center; gap: 12px; width: 100%;
  padding: 13px 16px; border-radius: 14px; cursor: pointer; text-align: left;
  border: 2px solid rgba(255,224,130,.4); background: rgba(20,18,40,.85);
  color: #f3ead5; font-size: clamp(15px, 2.2vw, 17.5px); font-weight: 600;
  transition: border-color .15s, background .15s, transform .12s;
}
.wq-option:hover { border-color: #ffe08a; transform: translateX(4px); }
.wq-option .letter {
  flex: 0 0 auto; display: grid; place-items: center; width: 34px; height: 34px;
  border-radius: 50%; background: rgba(255,224,130,.16); font-weight: 800;
}
.wq-option.selected { border-color: #ffe08a; background: rgba(255,209,102,.16); box-shadow: 0 0 20px rgba(255,209,102,.3); }
.wq-option.correct { border-color: #7ad97a; background: rgba(122,217,122,.18); }
.wq-option.correct .letter { background: #7ad97a; color: #143314; }
.wq-option.wrong { border-color: #ff8fa3; background: rgba(255,143,163,.14); }
.wq-option.dim { opacity: .3; pointer-events: none; }
.wq-lock {
  margin-top: 16px; width: 100%; padding: 15px; border-radius: 16px; border: 0;
  cursor: pointer; font-weight: 800; font-size: 16px; color: #143314;
  background: linear-gradient(180deg, #9fe8a8, #57c46a); letter-spacing: .04em;
  box-shadow: 0 5px 0 #2c7a44, 0 12px 26px rgba(0,0,0,.4);
  transition: transform .12s, opacity .2s, filter .2s;
}
.wq-lock:hover { transform: translateY(-1px); }
.wq-lock:disabled { opacity: .4; cursor: default; }
.wq-lock.suspense { animation: wqSuspense .3s ease-in-out infinite; }
@keyframes wqSuspense { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.6); } }
.wq-explain {
  margin-top: 14px; padding: 12px 16px; border-radius: 14px; text-align: left;
  background: rgba(255,224,130,.1); border: 1.5px dashed rgba(255,224,130,.45);
  color: #ffe9b8; font-size: 14.5px; font-weight: 600; line-height: 1.5;
}
.wq-explain.hidden { display: none; }
.wq-result { font: 400 clamp(26px, 5vw, 40px) 'Luckiest Guy','Fredoka',sans-serif; margin: 8px 0; }
.wq-result.ok { color: #9fe8a8; }
.wq-result.no { color: #ff9fae; }
.wq-gold-line { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 6px; font-weight: 800; color: #ffd166; }

/* lifelines */
.wq-lifelines { display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; justify-content: center; }
.wq-lifeline {
  flex: 1 1 130px; max-width: 170px; padding: 10px 12px; border-radius: 14px;
  border: 1.5px solid rgba(255,209,102,.45); background: rgba(20,18,40,.8);
  color: #f3ead5; cursor: pointer; text-align: center;
  transition: border-color .15s, background .15s;
}
.wq-lifeline:hover { background: rgba(255,209,102,.14); }
.wq-lifeline .name { display: block; font-weight: 800; font-size: 13px; }
.wq-lifeline .desc { display: block; font-size: 10.5px; font-weight: 600; color: rgba(243,234,213,.75); margin: 3px 0 5px; line-height: 1.3; }
.wq-lifeline .count { font-weight: 800; color: #ffd166; font-size: 13px; }
.wq-lifeline.spent { opacity: .35; cursor: default; }

/* journal */
.wq-journal { width: min(760px, 94vw); max-height: 88vh; overflow-y: auto; padding: 26px 28px; }
.wq-journal-title { margin: 0 0 14px; font: 400 clamp(22px, 4vw, 32px) 'Luckiest Guy','Fredoka',sans-serif; color: #8a5a12; text-align: center; }
.wq-word-card { padding: 16px 18px; margin-bottom: 12px; border-radius: 14px; background: rgba(255,255,255,.45); border: 1.5px solid #d9c9a3; }
.wq-word-card h3 { margin: 0; font-size: 20px; color: #3d2c10; }
.wq-word-card .def { margin: 4px 0 6px; font-weight: 600; color: #5a4a24; }
.wq-word-card .ex { font-style: italic; color: #6b5a34; font-size: 13.5px; }
.wq-mastery {
  display: inline-block; margin-top: 6px; padding: 4px 12px; border-radius: 999px;
  font-size: 11px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
}
.wq-mastery.new { background: #e8e2d0; color: #6b5a34; }
.wq-mastery.seen { background: #dbe7f5; color: #33567a; }
.wq-mastery.learning { background: #fdeec8; color: #8a5a12; }
.wq-mastery.strong { background: #d8f0d8; color: #2c7a44; }
.wq-mastery.mastered { background: linear-gradient(135deg, #ffd166, #e0b04c); color: #5a3b00; }
.wq-journal-empty { text-align: center; color: #8a5a12; font-weight: 700; padding: 30px 0; }

/* especiais */
.wq-special-art { width: min(420px, 80vw); border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,.6); display: block; margin: 0 auto 14px; }
.wq-hearts { font-size: clamp(26px, 4.4vw, 36px); letter-spacing: 8px; }
.wq-hearts .lost { filter: grayscale(1) brightness(.6); }
.wq-chests { display: flex; gap: 16px; justify-content: center; }
.wq-chest { font-size: clamp(60px, 10vw, 90px); background: none; border: 0; cursor: pointer; transition: transform .15s; filter: drop-shadow(0 10px 20px rgba(0,0,0,.5)); }
.wq-chest:hover { transform: translateY(-6px) scale(1.06); }
.wq-chest.opened { opacity: .4; cursor: default; transform: none; }

/* corujinha flutuante no canto do mapa */
.wq-owl { position: absolute; left: 6%; bottom: 12%; width: clamp(90px, 12vw, 140px); border-radius: 50%; border: 3px solid rgba(255,209,102,.5); box-shadow: 0 0 30px rgba(255,209,102,.35); animation: wqOwlBob 3s ease-in-out infinite; }
@keyframes wqOwlBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

/* resumo */
.wq-summary-row { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 700; margin: 8px 0; color: #3d2c10; justify-content: center; }
.wq-summary-row .mark { color: #2c7a44; font-weight: 800; }

/* fade caminhada final */
.wq-fade-out { animation: wqFadeOut 1.4s ease forwards; }
@keyframes wqFadeOut { to { opacity: 0; } }

/* toast/confete */
.wq-toast { position: fixed; top: 14%; left: 50%; transform: translateX(-50%); z-index: 96; padding: 12px 26px; border-radius: 999px; font-weight: 800; font-size: clamp(15px, 2.4vw, 20px); background: linear-gradient(135deg, rgba(58,64,110,.95), rgba(34,36,74,.95)); border: 1.5px solid rgba(255,209,102,.55); color: #ffe9b8; box-shadow: 0 10px 30px rgba(0,0,0,.5); }
.wq-confetti { position: fixed; inset: 0; z-index: 94; pointer-events: none; overflow: hidden; }
.wq-confetti span { position: absolute; top: -20px; width: 10px; height: 15px; border-radius: 3px; animation: wqConfFall linear forwards; }
@keyframes wqConfFall { to { transform: translateY(115vh) rotate(680deg); } }

@media (prefers-reduced-motion: reduce) {
  .wq-loc.current, .wq-lock.suspense, .wq-owl { animation: none !important; }
}
@media (max-width: 640px) {
  .wq-loc { min-width: 84px; padding: 7px 10px; }
  .wq-loc-name { font-size: 10px; }
  .wq-quiz { padding: 20px 18px; }
  .wq-owl { width: 70px; }
}
`;

export function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
