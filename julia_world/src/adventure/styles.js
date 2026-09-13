// Estilos do sistema de aventuras (painel de tarefas + celebrações).
// Injetados uma única vez para manter a feature autossuficiente.
const STYLE_ID = 'adventure-styles';

const CSS = `
#adventurePanel {
  position: fixed; top: 92px; left: 18px; z-index: 15;
  width: min(330px, calc(100vw - 36px));
  color: #293354; background: rgba(255,250,240,.97);
  border: 2px solid rgba(255,255,255,.7); border-radius: 22px;
  box-shadow: 0 18px 40px rgba(0,0,0,.4);
  backdrop-filter: blur(10px); overflow: hidden;
}
#adventurePanel[hidden] { display: none !important; }
#adventureToggle {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 13px 16px; border: 0; background: none; cursor: pointer;
  font: 800 15px 'Fredoka', 'Segoe UI', sans-serif; color: #1f2c66; text-align: left;
}
#adventureToggle .adv-target {
  display: grid; place-items: center; width: 30px; height: 30px; border-radius: 10px;
  background: linear-gradient(135deg, #ffd166, #ff9a3d); font-size: 16px;
  box-shadow: 0 4px 10px rgba(255,154,61,.4);
}
#adventurePanelCount {
  padding: 3px 9px; border-radius: 999px;
  background: rgba(42,49,80,.1); color: #596580;
  font: 800 11.5px 'Fredoka', sans-serif; font-variant-numeric: tabular-nums;
}
#adventureToggle .adv-chevron { margin-left: auto; transition: transform .2s; color: #77809a; }
#adventurePanel.collapsed .adv-chevron { transform: rotate(-90deg); }
#adventurePanel.collapsed #adventureTasks { display: none; }
#adventureTasks { display: flex; flex-direction: column; gap: 9px; padding: 2px 12px 14px; }
.adv-task {
  display: flex; flex-direction: column; gap: 7px;
  padding: 10px 12px; border-radius: 16px;
  background: rgba(42, 49, 80, .055);
  border: 1.5px solid rgba(42, 49, 80, .07);
}
.adv-task.done { background: #e9f7ea; border-color: #bfe5c2; }
.adv-task-head { display: flex; align-items: center; gap: 9px; }
.adv-task-head .adv-icon {
  display: grid; place-items: center; flex: 0 0 auto;
  width: 28px; height: 28px; border-radius: 9px; font-size: 15px;
  background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,.12);
}
.adv-task-title { flex: 1; font-size: 12.5px; font-weight: 700; line-height: 1.25; color: #33406b; }
.adv-task.done .adv-task-title { color: #2e7d32; }
.adv-task-count {
  padding: 3px 9px; border-radius: 999px; white-space: nowrap;
  background: rgba(42,49,80,.1); color: #596580;
  font: 800 11px 'Fredoka', sans-serif; font-variant-numeric: tabular-nums;
}
.adv-task.done .adv-task-count { background: #cdeacd; color: #2e7d32; }
.adv-bar { display: flex; gap: 4px; height: 14px; }
.adv-seg { flex: 1 1 0; border-radius: 6px; background: rgba(42,49,80,.1); overflow: hidden; }
.adv-seg-fill { height: 100%; width: 0; border-radius: 6px; transition: width .45s ease; box-shadow: inset 0 -3px 0 rgba(0,0,0,.14), inset 0 2px 2px rgba(255,255,255,.45); }
.adv-celebration { position: fixed; inset: 0; z-index: 130; pointer-events: none; overflow: hidden; }
.adv-confetti {
  position: absolute; top: -24px; width: 10px; height: 15px; border-radius: 2px;
  animation: advFall linear forwards;
}
.adv-balloon {
  position: absolute; bottom: 18vh; width: 46px; height: 58px;
  border-radius: 50% 50% 46% 46%; border: 0; cursor: pointer; pointer-events: auto;
  box-shadow: inset -5px -7px 0 rgba(0,0,0,.14); animation: advBob ease-in-out infinite;
}
.adv-balloon::after {
  content: ''; position: absolute; top: 100%; left: 50%;
  width: 2px; height: 64px; background: rgba(255,255,255,.55);
}
.adv-balloon.pop { animation: advPop .3s ease-out forwards; }
.adv-burst { position: absolute; width: 0; height: 0; z-index: 2; pointer-events: none; }
.adv-burst i {
  position: absolute; width: 12px; height: 16px; border-radius: 3px;
  animation: advBurstFall ease-in forwards;
}
.adv-pop-hint {
  position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
  padding: 10px 20px; border-radius: 999px; white-space: nowrap;
  color: #fff; background: rgba(20, 26, 66, .8); border: 1px solid rgba(255,255,255,.3);
  font: 800 16px 'Fredoka', sans-serif; text-shadow: 0 2px 6px rgba(0,0,0,.4);
}
.adv-stage { position: fixed; inset: 0; z-index: 131; display: grid; place-items: center; background: rgba(6,8,30,.68); pointer-events: auto; }
.adv-present-wrap { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 20px; }
.adv-present {
  font-size: clamp(110px, 24vw, 170px); line-height: 1; border: 0; background: none; cursor: pointer;
  filter: drop-shadow(0 12px 26px rgba(255,209,102,.5)); transition: transform .12s;
}
.adv-present:active { transform: scale(.96); }
.adv-present.shake { animation: advShake .28s ease-in-out; }
.adv-present.grow { transform: scale(1.12); }
.adv-instruction {
  color: #ffd166; font: 800 22px 'Fredoka', sans-serif; text-align: center;
  text-shadow: 0 3px 10px rgba(0,0,0,.5); animation: advPulse 1s ease-in-out infinite;
}
.adv-reveal {
  width: min(440px, 92vw); padding: 26px 28px; text-align: center;
  color: #293354; background: #fffaf0; border: 3px solid #ffd166; border-radius: 24px;
  box-shadow: 0 24px 60px rgba(0,0,0,.5);
}
.adv-reveal h3 { margin: 4px 0 2px; font: 400 26px 'Luckiest Guy', 'Fredoka', sans-serif; color: #d1495b; letter-spacing: .02em; }
.adv-reveal .adv-task-line { margin: 10px 0 2px; font-weight: 700; color: #1f2c66; font-size: 17px; }
.adv-reveal .adv-cert-name { margin: 2px 0 0; font-size: 13px; color: #77809a; }
.adv-rewards { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 16px 0 4px; }
.adv-chip { padding: 8px 14px; border-radius: 999px; background: #fff0ca; color: #6b5627; font-weight: 800; font-size: 13px; }
.adv-continue {
  margin-top: 16px; padding: 12px 30px; border: 0; border-radius: 999px; cursor: pointer;
  background: linear-gradient(135deg, #ff9a3d, #ff5e7e); color: #fff; font: 800 16px 'Fredoka', sans-serif;
  box-shadow: 0 10px 24px rgba(255,94,126,.4);
}
.adv-continue:hover { filter: brightness(1.06); transform: translateY(-1px); }
.adv-milestone-banner {
  color: #fff; background: linear-gradient(135deg, #8a5bdb, #526fff);
  font: 800 14px 'Fredoka', sans-serif; padding: 8px 18px; border-radius: 999px; margin-bottom: 6px;
}
@keyframes advFall { to { transform: translateY(116vh) rotate(680deg); } }
@keyframes advFloat { to { transform: translateY(-118vh) rotate(9deg); } }
@keyframes advBob { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-16px) rotate(3deg); } }
@keyframes advPop { 40% { transform: scale(1.3); opacity: 1; } 100% { transform: scale(1.7); opacity: 0; } }
@keyframes advBurstFall {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
  14% { transform: translate(calc(var(--dx) * .45), calc(var(--up) * .45)) rotate(130deg) scale(1.05); opacity: 1; }
  100% { transform: translate(var(--dx), 108vh) rotate(var(--spin)); opacity: .85; }
}
@keyframes advShake { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-7deg) scale(1.04); } 75% { transform: rotate(7deg) scale(1.04); } }
@keyframes advPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.07); } }
@media (prefers-reduced-motion: reduce) {
  .adv-confetti, .adv-instruction, .adv-present.shake, .adv-balloon { animation: none; }
  .adv-burst { display: none; }
  .adv-seg-fill { transition: none; }
}

/* ── Final da World Adventure (spec §21-25) ── */
.adv-final-hint {
  color: #fff; font: 800 20px 'Fredoka', sans-serif; text-align: center;
  text-shadow: 0 3px 10px rgba(0,0,0,.5); margin-bottom: 10px;
}
.adv-seq { display: flex; gap: 10px; margin-bottom: 14px; }
.adv-seq-dot {
  width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center;
  background: rgba(255,255,255,.14); color: rgba(255,255,255,.55);
  font: 800 15px 'Fredoka', sans-serif;
}
.adv-seq-dot.current { background: #ffd166; color: #5a3b00; box-shadow: 0 0 18px rgba(255,209,102,.85); }
.adv-seq-dot.done { background: #7ad97a; color: #123c12; }
.adv-prize { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.adv-prize-icon {
  border: 0; background: none; cursor: pointer; line-height: 1;
  font-size: clamp(110px, 24vw, 170px);
  filter: drop-shadow(0 12px 26px rgba(255,209,102,.55));
  transition: transform .12s;
}
.adv-prize-icon.rainbow {
  background: linear-gradient(135deg, #ff5a5a, #ff9a3d, #ffd166, #7ad97a, #4ecdc4, #6ca6ff, #b9a4f5);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 22px rgba(255,209,102,.75));
}
.adv-chest { position: relative; width: clamp(140px, 26vw, 190px); height: 118px; border: 0; background: none; cursor: pointer; perspective: 500px; }
.adv-chest .adv-chest-lid {
  position: absolute; top: 0; left: 0; right: 0; height: 44px;
  border-radius: 16px 16px 4px 4px; background: linear-gradient(180deg, #ffe08a, #d4a017);
  box-shadow: inset 0 -4px 0 rgba(0,0,0,.18); transform-origin: top center;
  transition: transform .5s ease; z-index: 2;
}
.adv-chest .adv-chest-body {
  position: absolute; bottom: 0; left: 5px; right: 5px; height: 66px; border-radius: 10px;
  background: linear-gradient(180deg, #f4c542, #b8860b); box-shadow: inset 0 6px 0 rgba(255,255,255,.28);
}
.adv-chest .adv-chest-lock {
  position: absolute; top: 34px; left: 50%; transform: translateX(-50%);
  width: 26px; height: 32px; border-radius: 6px; background: #7a5901; z-index: 3;
}
.adv-chest.open .adv-chest-lid { transform: rotateX(105deg) translateY(-16px); }
.adv-chest.glow { filter: drop-shadow(0 0 30px rgba(255,209,102,.9)); }
.adv-world-title {
  position: relative; display: block; text-align: center;
  font: 400 clamp(30px, 6.4vw, 58px) 'Luckiest Guy', 'Fredoka', sans-serif;
  text-shadow: 0 4px 18px rgba(0,0,0,.25); margin: 0 0 6px; line-height: 1.15;
}
.adv-world-title .adv-word { display: inline-block; white-space: nowrap; margin: 0 .18em; }
.adv-sparkle { position: absolute; font-size: 24px; animation: advTwinkle 1.5s ease-in-out infinite; pointer-events: none; }
.adv-final-stats { color: #596580; font: 600 15px 'Fredoka', sans-serif; margin: 12px 0 4px; }
.adv-return {
  margin-top: 16px; padding: 13px 32px; border: 0; border-radius: 999px; cursor: pointer;
  background: linear-gradient(135deg, #8a5bdb, #526fff); color: #fff;
  font: 800 16px 'Fredoka', sans-serif; box-shadow: 0 10px 24px rgba(82,111,255,.4);
}
.adv-return:hover { filter: brightness(1.08); transform: translateY(-1px); }
@keyframes advTwinkle { 0%,100% { opacity: .15; transform: scale(.6) rotate(0deg); } 50% { opacity: 1; transform: scale(1.2) rotate(20deg); } }
@media (prefers-reduced-motion: reduce) { .adv-sparkle { animation: none; } }
`;

export function ensureAdventureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
