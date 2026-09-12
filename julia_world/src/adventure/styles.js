// Estilos do sistema de aventuras (painel de tarefas + celebrações).
// Injetados uma única vez para manter a feature autossuficiente.
const STYLE_ID = 'adventure-styles';

const CSS = `
#adventurePanel {
  position: fixed; top: 92px; left: 18px; z-index: 15;
  width: min(320px, calc(100vw - 36px));
  color: #293354; background: rgba(255,250,240,.96);
  border: 2px solid rgba(255,255,255,.7); border-radius: 20px;
  box-shadow: 0 16px 36px rgba(0,0,0,.38);
  backdrop-filter: blur(10px); overflow: hidden;
}
#adventurePanel[hidden] { display: none !important; }
#adventureToggle {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 12px 14px; border: 0; background: none; cursor: pointer;
  font: 700 15px 'Fredoka', 'Segoe UI', sans-serif; color: #1f2c66; text-align: left;
}
#adventureToggle .adv-chevron { margin-left: auto; transition: transform .2s; }
#adventurePanel.collapsed .adv-chevron { transform: rotate(-90deg); }
#adventurePanel.collapsed #adventureTasks { display: none; }
#adventureTasks { display: flex; flex-direction: column; gap: 11px; padding: 2px 14px 14px; }
.adv-task { display: flex; flex-direction: column; gap: 5px; }
.adv-task-head { display: flex; align-items: baseline; gap: 6px; font-size: 13px; font-weight: 600; color: #33406b; }
.adv-task-head .adv-icon { font-size: 15px; }
.adv-task-count { margin-left: auto; font-weight: 700; font-size: 12px; color: #77809a; font-variant-numeric: tabular-nums; }
.adv-task.done .adv-task-head { color: #2e7d32; }
.adv-bar { display: flex; gap: 3px; height: 12px; }
.adv-seg { flex: 1 1 0; border-radius: 4px; background: rgba(42,49,80,.14); overflow: hidden; }
.adv-seg-fill { height: 100%; width: 0; border-radius: 4px; transition: width .45s ease; }
.adv-celebration { position: fixed; inset: 0; z-index: 130; pointer-events: none; overflow: hidden; }
.adv-confetti {
  position: absolute; top: -24px; width: 10px; height: 15px; border-radius: 2px;
  animation: advFall linear forwards;
}
.adv-balloon {
  position: absolute; bottom: -110px; width: 46px; height: 58px;
  border-radius: 50% 50% 46% 46%; border: 0; cursor: pointer; pointer-events: auto;
  box-shadow: inset -5px -7px 0 rgba(0,0,0,.14); animation: advFloat linear forwards;
}
.adv-balloon::after {
  content: ''; position: absolute; top: 100%; left: 50%;
  width: 2px; height: 64px; background: rgba(255,255,255,.55);
}
.adv-balloon.pop { animation: advPop .3s ease-out forwards; }
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
@keyframes advPop { 40% { transform: scale(1.3); opacity: 1; } 100% { transform: scale(1.7); opacity: 0; } }
@keyframes advShake { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-7deg) scale(1.04); } 75% { transform: rotate(7deg) scale(1.04); } }
@keyframes advPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.07); } }
@media (prefers-reduced-motion: reduce) {
  .adv-confetti, .adv-balloon, .adv-instruction, .adv-present.shake { animation: none; }
  .adv-balloon { bottom: 12vh; }
  .adv-seg-fill { transition: none; }
}
`;

export function ensureAdventureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
