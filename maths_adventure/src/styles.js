// Estilos do Maths Adventures, injetados uma única vez (padrão do atlas).
// O mundo domina a tela; a UI é uma camada fina e quente por cima (spec §7.2).

const STYLE_ID = 'maths-adventure-styles';

const CSS = `
#app { position: fixed; inset: 0; overflow: hidden; font-family: 'Fredoka','Segoe UI',system-ui,sans-serif; color:#fff; }
#app button { font-family: inherit; }
.hidden { display: none !important; }
.ma-hidden.hidden { display: none !important; }

/* ── Telas de fundo cheio ── */
.ma-title-screen, .ma-map-screen, .ma-world-screen, .ma-finale {
  position: absolute; inset: 0; overflow: hidden;
  background-size: cover; background-position: center 62%;
}
.ma-title-screen { display: grid; place-items: center; }
.ma-title-screen::after, .ma-map-screen::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, rgba(20,12,50,.55), rgba(20,12,50,.06) 40%, rgba(15,8,40,.5));
}
.ma-title-card, .ma-select, .ma-story-intro { position: relative; z-index: 2; text-align: center; padding: 26px; max-width: min(560px, 94vw); }
.ma-title-logo {
  margin: 0 0 6px; font: 400 clamp(30px, 6.4vw, 54px) 'Luckiest Guy','Fredoka',sans-serif;
  color: #ffe27a; letter-spacing: .02em;
  text-shadow: 0 3px 0 #b8860b, 0 8px 24px rgba(0,0,0,.55);
}
.ma-title-subtitle { margin: 0 0 22px; font-size: clamp(14px, 2.2vw, 18px); font-weight: 600; color: #fff3d6; text-shadow: 0 2px 8px rgba(0,0,0,.6); }
.ma-title-buttons { display: flex; flex-direction: column; gap: 12px; align-items: center; }
.ma-title-play, .ma-title-restart, .ma-title-exit, .ma-continue {
  border: 0; cursor: pointer; border-radius: 999px; font-weight: 800;
  padding: 14px 34px; font-size: clamp(15px, 2.4vw, 19px); color: #fff;
  background: linear-gradient(135deg, #ffb347, #ff9a3d, #ff5e7e);
  box-shadow: 0 10px 26px rgba(255,154,61,.45), inset 0 2px 0 rgba(255,255,255,.4);
  transition: transform .15s, filter .2s;
}
.ma-title-play:hover, .ma-continue:hover { transform: translateY(-2px) scale(1.02); filter: brightness(1.06); }
.ma-title-restart { background: rgba(255,255,255,.14); border: 1.5px solid rgba(255,255,255,.35); box-shadow: none; }
.ma-title-exit { background: rgba(20,26,66,.55); border: 1.5px solid rgba(255,255,255,.25); box-shadow: none; padding: 10px 24px; font-size: 14px; }

/* ── Escolha de personagem ── */
.ma-select { display: grid; place-items: center; gap: 20px; }
.ma-select-title { margin: 0; font: 400 clamp(24px, 4.6vw, 40px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; text-shadow: 0 3px 0 #b8860b, 0 8px 22px rgba(0,0,0,.55); }
.ma-select-options { display: flex; gap: clamp(16px, 4vw, 42px); }
.ma-select-hero {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 18px 22px 14px; border: 3px solid rgba(255,255,255,.35); border-radius: 28px;
  background: rgba(30,20,70,.55); backdrop-filter: blur(6px);
  color: #fff3d6; font-weight: 800; font-size: clamp(15px, 2.4vw, 19px);
  cursor: pointer; transition: transform .18s, border-color .2s, box-shadow .2s;
}
.ma-select-hero img { width: auto; height: clamp(150px, 24vw, 210px); object-fit: contain; filter: drop-shadow(0 12px 18px rgba(0,0,0,.45)); }
.ma-select-hero:hover { transform: translateY(-6px) scale(1.04); border-color: #ffd166; box-shadow: 0 18px 44px rgba(255,209,102,.35); }

/* ── Introdução da história ── */
.ma-story-intro { display: grid; justify-items: center; gap: 18px; background: rgba(24,14,60,.72); border: 1.5px solid rgba(255,255,255,.2); border-radius: 30px; backdrop-filter: blur(8px); padding: 30px 34px; }
.ma-story-title { margin: 0; font: 400 clamp(22px, 4vw, 34px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; text-shadow: 0 3px 0 #b8860b; }
.ma-story-line { margin: 0; min-height: 3.2em; font-size: clamp(15px, 2.4vw, 19px); font-weight: 600; line-height: 1.5; color: #fff3d6; }
.ma-story-line.done { min-height: 0; }
.ma-story-hint { margin-top: -6px; font-size: 13px; font-weight: 700; color: rgba(255,243,214,.7); animation: maPulse 1.4s ease-in-out infinite; }
.ma-story-hint.hidden { display: none; }

/* ── Mapa do reino ── */
.ma-map-sky { position: absolute; inset: 0; background:
  radial-gradient(1000px 600px at 70% -10%, rgba(120,84,220,.5), transparent 60%),
  radial-gradient(800px 500px at 10% 110%, rgba(255,154,61,.25), transparent 55%),
  linear-gradient(165deg, #141037, #241457 55%, #3a1c6e); }
.ma-map-title { position: relative; z-index: 2; margin: 18px 0 4px; text-align: center; font: 400 clamp(22px, 4.2vw, 36px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; text-shadow: 0 3px 0 #b8860b, 0 8px 20px rgba(0,0,0,.5); }
.ma-map { position: absolute; inset: 64px 20px 92px; z-index: 1; }
.ma-map-path { position: absolute; inset: 0; width: 100%; height: 100%; filter: drop-shadow(0 0 6px rgba(255,209,102,.55)); }
.ma-map-path-ghost { opacity: .3; }
.ma-map-path-lit { opacity: 1; filter: drop-shadow(0 0 8px rgba(255,209,102,.9)); }
.ma-map-node {
  position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 2px;
  padding: 10px 14px; border-radius: 20px; cursor: pointer; min-width: 96px;
  border: 2.5px solid rgba(255,255,255,.4); background: rgba(30,20,70,.72); color: #fff;
  backdrop-filter: blur(4px); transition: transform .16s, box-shadow .2s, border-color .2s;
}
.ma-map-node-emoji { font-size: clamp(24px, 4.4vw, 36px); line-height: 1; }
.ma-map-node-name { font-size: clamp(10px, 1.6vw, 13px); font-weight: 800; white-space: nowrap; }
.ma-map-node-status { font-size: 10px; font-weight: 700; color: rgba(255,255,255,.75); white-space: nowrap; }
.ma-map-node.current { border-color: #ffd166; box-shadow: 0 0 0 4px rgba(255,209,102,.28), 0 10px 26px rgba(255,209,102,.4); animation: maPulse 1.6s ease-in-out infinite; }
.ma-map-node.done { border-color: #7ad97a; background: rgba(20,70,40,.72); }
.ma-map-node.locked { opacity: .55; filter: saturate(.4); cursor: not-allowed; }
.ma-map-node:not(.locked):hover { transform: translate(-50%, -50%) scale(1.07); }
.ma-map-palace {
  position: absolute; transform: translate(-50%, -50%); font-size: clamp(40px, 7vw, 64px);
  background: none; border: 0; cursor: pointer; line-height: 1;
  filter: drop-shadow(0 0 16px rgba(255,209,102,.8)); transition: transform .18s;
}
.ma-map-palace.ready { animation: maPulse 1.8s ease-in-out infinite; }
.ma-map-palace:hover { transform: translate(-50%, -50%) scale(1.1); }
.ma-map-footer { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px; flex-wrap: wrap; }
.ma-map-stats { padding: 9px 16px; border-radius: 999px; background: rgba(20,26,66,.7); border: 1px solid rgba(255,255,255,.22); font-size: 13px; font-weight: 800; color: #ffe9b8; }
.ma-map-friends, .ma-map-back {
  border: 0; cursor: pointer; border-radius: 999px; padding: 10px 20px;
  font-weight: 800; font-size: 14px; color: #fff;
  background: linear-gradient(135deg, #4ecdc4, #526fff); box-shadow: 0 8px 20px rgba(78,205,196,.35);
}
.ma-map-back { background: rgba(20,26,66,.7); border: 1px solid rgba(255,255,255,.22); box-shadow: none; }

/* ── Cena do mundo ── */
/* Camada 16:9 do tamanho da imagem de fundo (cover): os waypoints dos
   personagens são % da IMAGEM, então ficam alinhados ao caminho pintado
   em qualquer proporção de tela (o excesso sangra fora, cortado). */
.ma-scene {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: max(100vw, calc(100vh * (16 / 9)));
  height: max(100vh, calc(100vw * (9 / 16)));
}
.ma-world-bg { position: absolute; inset: 0; background-size: 100% 100%; background-position: center; }
.ma-path { position: absolute; left: 0; right: 0; bottom: 4%; height: 34%; pointer-events: none; opacity: .9; }
.ma-path svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.ma-path-dash { animation: maDash 3.2s linear infinite; }
@keyframes maDash { to { stroke-dashoffset: -16; } }
.ma-path-spark { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: #fff6d8; box-shadow: 0 0 10px 3px rgba(255,224,130,.85); animation: maSpark 2.6s ease-in-out infinite; }
@keyframes maSpark { 0%, 100% { opacity: 0; transform: scale(.4); } 50% { opacity: 1; transform: scale(1.25); } }
.ma-character {
  position: absolute; z-index: 5;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 6px 8px rgba(0,0,0,.28));
}
.ma-character img { width: 100%; display: block; }
.ma-char-shadow {
  position: absolute; z-index: 4; transform: translate(-50%, -50%);
  border-radius: 50%; pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(20,14,4,.55), rgba(20,14,4,0) 68%);
  filter: blur(2px);
}
.ma-world-friend.hidden { opacity: 0; pointer-events: none; }
.ma-world-friend {
  position: absolute; z-index: 4;
  transform-origin: 50% 100%;
  filter: drop-shadow(0 8px 10px rgba(0,0,0,.32));
}
.ma-world-friend img { width: 100%; display: block; animation: maFriendBob 2.8s ease-in-out infinite; }
@keyframes maFriendBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
.ma-friend-tag {
  position: absolute; left: 50%; top: -14px; transform: translateX(-50%);
  padding: 4px 12px; border-radius: 999px; white-space: nowrap;
  background: linear-gradient(135deg, #ffd166, #ffb347); color: #5a3b00;
  font: 800 12px 'Fredoka', sans-serif;
  box-shadow: 0 4px 10px rgba(255,209,102,.5);
  opacity: 0; transition: opacity .4s;
}
.ma-friend-tag::before {
  content: '✨ '; 
}
.ma-friend-tag.show { opacity: 1; }

/* ── HUD do mundo ── */
.ma-hud { position: absolute; top: 12px; left: 12px; right: 12px; z-index: 20; display: flex; align-items: flex-start; gap: 10px; pointer-events: none; }
.ma-hud-chip {
  pointer-events: auto; display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 14px; border-radius: 999px; border: 1.5px solid rgba(255,255,255,.3);
  background: rgba(20,26,66,.66); color: #fff; font-weight: 800; font-size: 15px;
  cursor: pointer; backdrop-filter: blur(6px); transition: transform .15s;
}
.ma-hud-chip:hover { transform: translateY(-2px); }
.ma-quests { pointer-events: auto; display: flex; flex-direction: column; gap: 6px; margin-left: auto; }
.ma-quest { display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 14px; background: rgba(20,26,66,.66); border: 1.5px solid rgba(255,255,255,.25); backdrop-filter: blur(6px); font-size: 12.5px; font-weight: 700; }
.ma-quest.done { border-color: #7ad97a; background: rgba(20,70,40,.7); }
.ma-quest-count { margin-left: auto; font-variant-numeric: tabular-nums; color: #ffe9b8; }

/* ── Banner / diálogos ── */
.ma-banner {
  position: absolute; top: 74px; left: 50%; transform: translateX(-50%); z-index: 18;
  max-width: min(560px, 92vw); padding: 10px 22px; border-radius: 999px;
  background: rgba(20,26,66,.78); border: 1.5px solid rgba(255,255,255,.28);
  font-weight: 800; font-size: clamp(14px, 2.2vw, 17px); text-align: center;
  transition: opacity .4s; backdrop-filter: blur(6px);
}
.ma-banner.hidden { opacity: 0; pointer-events: none; }
.ma-stage { position: absolute; inset: 0; z-index: 25; }
.ma-stage.exploring { cursor: pointer; }
.ma-dialogue {
  position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%);
  width: min(680px, 94vw); display: flex; gap: 14px; align-items: flex-end;
  background: linear-gradient(160deg, rgba(38,24,80,.94), rgba(24,16,56,.94));
  border: 2.5px solid #ffd166; border-radius: 26px; padding: 14px 18px;
  box-shadow: 0 18px 50px rgba(0,0,0,.5); cursor: pointer;
  animation: maRise .3s ease;
}
@keyframes maRise { from { transform: translateX(-50%) translateY(24px); opacity: 0; } }
.ma-dialogue-portrait { flex: 0 0 auto; width: clamp(72px, 11vw, 108px); height: clamp(72px, 11vw, 108px); border-radius: 50%; overflow: hidden; border: 3px solid #ffd166; box-shadow: 0 0 18px rgba(255,209,102,.6); background: rgba(255,255,255,.08); display: grid; place-items: center; font-size: 34px; }
.ma-dialogue-portrait img { width: 100%; height: 100%; object-fit: cover; }
.ma-dialogue-portrait.narrator img { object-fit: contain; padding: 8px; }
.ma-dialogue-body { flex: 1; min-width: 0; }
.ma-dialogue-name { font-weight: 800; color: #ffe27a; font-size: 15px; margin-bottom: 4px; }
.ma-dialogue-text { font-size: clamp(14.5px, 2.2vw, 17px); font-weight: 600; line-height: 1.45; min-height: 3em; }
.ma-dialogue-advance { margin-top: 4px; font-size: 11.5px; font-weight: 700; color: rgba(255,255,255,.65); text-align: right; animation: maPulse 1.4s ease-in-out infinite; }

/* ── Exploração ── */
.ma-spot {
  position: absolute; transform: translate(-50%, -50%); width: clamp(52px, 8vw, 72px); height: clamp(52px, 8vw, 72px);
  border: 2.5px dashed rgba(255,224,130,.9); border-radius: 50%;
  background: radial-gradient(circle, rgba(255,209,102,.3), rgba(255,209,102,.08));
  cursor: pointer; display: grid; place-items: center; z-index: 6;
  animation: maSpotGlow 1.6s ease-in-out infinite; transition: transform .15s;
}
.ma-spot:hover { transform: translate(-50%, -50%) scale(1.12); }
.ma-spot.found { opacity: .25; pointer-events: none; animation: none; }
.ma-spot-icon { font-size: clamp(22px, 3.6vw, 32px); filter: drop-shadow(0 3px 5px rgba(0,0,0,.4)); }
@keyframes maSpotGlow { 0%, 100% { box-shadow: 0 0 8px 2px rgba(255,224,130,.4); } 50% { box-shadow: 0 0 22px 8px rgba(255,224,130,.65); } }
.ma-explore-continue { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); z-index: 8; }
.ma-explore-continue.glow { animation: maPulse 1s ease-in-out infinite; }

/* ── Encontros: placa mágica ── */
.ma-enc-overlay { position: absolute; inset: 0; z-index: 30; display: grid; place-items: center; background: rgba(10,8,30,.35); backdrop-filter: blur(1.5px); }
.ma-enc {
  width: min(560px, 93vw); max-height: 86vh; overflow-y: auto;
  display: flex; flex-direction: column; gap: 14px; align-items: center; text-align: center;
  padding: 22px 24px 20px; border-radius: 30px;
  background: linear-gradient(165deg, rgba(48,30,100,.94), rgba(28,18,66,.96));
  border: 3px solid #ffd166; box-shadow: 0 24px 60px rgba(0,0,0,.55), 0 0 40px rgba(255,209,102,.25);
  animation: maRise2 .3s ease;
}
@keyframes maRise2 { from { transform: translateY(30px) scale(.96); opacity: 0; } }
.ma-enc-prompt { font-size: clamp(16px, 2.6vw, 20px); font-weight: 800; color: #fff3d6; line-height: 1.4; }
.ma-enc-display { font-size: clamp(30px, 6vw, 46px); font-weight: 800; color: #ffe27a; text-shadow: 0 3px 0 rgba(120,60,0,.5); letter-spacing: .04em; }
.ma-enc-screen { min-width: 150px; padding: 8px 20px; border-radius: 16px; background: rgba(255,255,255,.12); border: 2px solid rgba(255,209,102,.5); font-size: 34px; font-weight: 800; color: #ffe27a; font-variant-numeric: tabular-nums; }
.ma-enc-screen.empty { color: rgba(255,255,255,.4); }
.ma-enc-screen.shake { animation: maShake .5s ease; }
.ma-enc-success { font: 400 clamp(26px, 5vw, 40px) 'Luckiest Guy','Fredoka',sans-serif; color: #7ad97a; text-shadow: 0 3px 0 rgba(0,60,0,.5); animation: maPop .4s ease; }
@keyframes maPop { from { transform: scale(.4); opacity: 0; } }

/* Orbes de resposta */
.ma-enc-orbs { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.ma-orb {
  min-width: clamp(64px, 11vw, 88px); height: clamp(64px, 11vw, 88px); border-radius: 50%;
  border: 3px solid rgba(255,224,130,.85); cursor: pointer;
  background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.5), rgba(255,209,102,.25) 45%, rgba(90,60,180,.35));
  color: #fff; font-size: clamp(20px, 3.6vw, 28px); font-weight: 800;
  text-shadow: 0 2px 6px rgba(0,0,0,.5); box-shadow: 0 10px 24px rgba(0,0,0,.4);
  transition: transform .14s, box-shadow .2s, border-color .2s;
}
.ma-orb:hover { transform: translateY(-4px) scale(1.06); box-shadow: 0 16px 30px rgba(255,209,102,.35); }
.ma-orb.right { border-color: #7ad97a; background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.6), rgba(122,217,122,.5) 50%, rgba(20,120,60,.6)); animation: maPop .45s ease; }
.ma-orb.wrong { animation: maShake .5s ease; border-color: #ff8fa3; }

/* Teclado numérico */
.ma-pad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: min(300px, 80vw); }
.ma-pad-key {
  padding: 12px 0; border-radius: 14px; border: 2px solid rgba(255,255,255,.28);
  background: rgba(255,255,255,.1); color: #fff; font-size: 21px; font-weight: 800; cursor: pointer;
  transition: background .15s, transform .1s;
}
.ma-pad-key:hover { background: rgba(255,255,255,.2); }
.ma-pad-key:active { transform: scale(.95); }
.ma-pad-wide { grid-column: span 1; font-size: 15px; padding: 12px 6px; }
.ma-pad-check { grid-column: span 2; background: linear-gradient(135deg, #7ad97a, #38a169); border-color: rgba(122,217,122,.7); }
.ma-pad-check.right { animation: maPop .4s ease; }

/* Lojinha */
.ma-shop { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.ma-shop-item { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 12px 16px; border-radius: 20px; background: rgba(255,255,255,.1); border: 2px solid rgba(255,224,130,.5); }
.ma-shop-emoji { font-size: 38px; line-height: 1; }
.ma-shop-name { font-size: 13px; font-weight: 800; }
.ma-shop-price { font-size: 13px; font-weight: 700; color: #ffe9b8; }

/* Encruzilhada */
.ma-fork { position: absolute; inset: 0; z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; background: rgba(10,8,30,.25); }
.ma-fork-title { padding: 10px 24px; border-radius: 999px; background: rgba(20,26,66,.8); border: 1.5px solid rgba(255,255,255,.3); font-weight: 800; font-size: clamp(15px, 2.4vw, 19px); }
.ma-fork-target {
  width: clamp(96px, 16vw, 132px); height: clamp(96px, 16vw, 132px); border-radius: 50%;
  display: grid; place-items: center; font-size: clamp(38px, 7vw, 58px); font-weight: 800; color: #5a3b00;
  background: radial-gradient(circle at 32% 28%, #fff8dc, #ffd166 55%, #ffb347);
  border: 5px solid #fff; box-shadow: 0 0 0 8px rgba(255,209,102,.35), 0 0 60px rgba(255,209,102,.8);
  text-shadow: 0 2px 0 rgba(255,255,255,.5); animation: maTargetPulse 1.6s ease-in-out infinite;
}
@keyframes maTargetPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.07); } }
.ma-fork-branches { display: flex; gap: clamp(24px, 6vw, 72px); }
.ma-fork-branch { position: relative; border: 0; background: none; cursor: pointer; padding: 0; }
.ma-fork-glow { position: absolute; inset: -14px; border-radius: 26px; background: linear-gradient(180deg, rgba(255,224,130,.25), rgba(255,209,102,.05)); filter: blur(2px); }
.ma-fork-sign {
  position: relative; display: grid; place-items: center; min-width: clamp(110px, 20vw, 170px); padding: 20px 18px;
  border-radius: 22px; border: 3px solid rgba(255,224,130,.9);
  background: linear-gradient(165deg, rgba(70,44,10,.92), rgba(48,28,6,.94));
  color: #ffe27a; font-size: clamp(24px, 4.6vw, 38px); font-weight: 800; letter-spacing: .03em;
  box-shadow: 0 14px 34px rgba(0,0,0,.5); transition: transform .15s, box-shadow .2s;
}
.ma-fork-branch:hover .ma-fork-sign { transform: translateY(-4px) scale(1.04); box-shadow: 0 20px 40px rgba(255,209,102,.35); }
.ma-fork-branch.right .ma-fork-sign { border-color: #7ad97a; color: #c8f5c8; box-shadow: 0 0 50px rgba(122,217,122,.7); }
.ma-fork-branch.wrong .ma-fork-sign { animation: maShake .55s ease; border-color: #ff8fa3; opacity: .75; }
.ma-fork.solved .ma-fork-branch:not(.right) { opacity: .25; }

/* Chaves */
.ma-lock {
  width: clamp(84px, 14vw, 110px); height: clamp(84px, 14vw, 110px); border-radius: 24px;
  display: grid; place-items: center; font-size: clamp(30px, 5.4vw, 44px); font-weight: 800; color: #fff3d6;
  background: linear-gradient(165deg, #6b4a12, #3d2a06); border: 3px solid #ffd166;
  box-shadow: inset 0 4px 10px rgba(0,0,0,.5), 0 0 26px rgba(255,209,102,.4); transition: transform .3s;
}
.ma-lock.open { transform: rotate(8deg) scale(1.1); border-color: #7ad97a; box-shadow: 0 0 40px rgba(122,217,122,.7); }
.ma-keys { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.ma-key {
  display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 18px;
  border-radius: 20px; border: 2.5px solid rgba(255,224,130,.8); cursor: pointer;
  background: rgba(255,255,255,.08); transition: transform .15s, border-color .2s;
}
.ma-key:hover { transform: translateY(-4px) rotate(-3deg); }
.ma-key-icon { font-size: 34px; line-height: 1; }
.ma-key-expr { font-size: 19px; font-weight: 800; color: #ffe27a; }
.ma-key.right { border-color: #7ad97a; animation: maPop .45s ease; }
.ma-key.wrong { animation: maShake .5s ease; border-color: #ff8fa3; }

/* Pedras de ordenação */
.ma-order-instruction { font-size: clamp(14px, 2.2vw, 17px); font-weight: 800; color: #ffe9b8; padding: 8px 16px; border-radius: 999px; background: rgba(255,209,102,.14); border: 1.5px dashed rgba(255,209,102,.5); }
.ma-stones { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.ma-stone {
  min-width: clamp(56px, 9vw, 74px); height: clamp(56px, 9vw, 74px); border-radius: 50% 50% 46% 46%;
  border: 3px solid rgba(255,224,130,.85); cursor: pointer; font-size: clamp(20px, 3.4vw, 26px); font-weight: 800; color: #fff;
  background: radial-gradient(circle at 32% 26%, rgba(255,255,255,.4), rgba(120,90,220,.5) 55%, rgba(50,30,110,.7));
  box-shadow: 0 10px 20px rgba(0,0,0,.4); transition: transform .14s;
}
.ma-stone:hover { transform: translateY(-4px); }
.ma-stone.locked { border-color: #7ad97a; background: radial-gradient(circle at 32% 26%, rgba(255,255,255,.4), rgba(122,217,122,.55) 55%, rgba(20,100,50,.75)); cursor: default; }
.ma-stone.wrong { animation: maShake .5s ease; border-color: #ff8fa3; }

/* Pares (matching) */
.ma-match { display: flex; gap: 16px; justify-content: center; }
.ma-match-col { display: flex; flex-direction: column; gap: 10px; }
.ma-match-card {
  min-width: clamp(96px, 16vw, 140px); padding: 13px 16px; border-radius: 18px;
  border: 2.5px solid rgba(255,224,130,.75); background: rgba(255,255,255,.09);
  color: #fff; font-size: clamp(17px, 2.8vw, 22px); font-weight: 800; cursor: pointer; transition: transform .13s, border-color .15s;
}
.ma-match-card:hover { transform: translateY(-2px); }
.ma-match-card.selected { border-color: #ffe27a; background: rgba(255,209,102,.25); box-shadow: 0 0 18px rgba(255,209,102,.5); }
.ma-match-card.locked { border-color: #7ad97a; background: rgba(122,217,122,.22); cursor: default; opacity: .85; }
.ma-match-card.wrong { animation: maShake .5s ease; border-color: #ff8fa3; }

/* Dicas */
.ma-hint-button {
  border: 0; cursor: pointer; border-radius: 999px; padding: 9px 18px;
  background: rgba(255,209,102,.18); border: 1.5px solid rgba(255,209,102,.6);
  color: #ffe9b8; font-weight: 800; font-size: 14px; transition: background .2s;
}
.ma-hint-button:hover { background: rgba(255,209,102,.32); }
.ma-hint { max-width: 100%; padding: 10px 16px; border-radius: 16px; background: rgba(255,209,102,.16); border: 1.5px dashed rgba(255,209,102,.55); color: #fff3d6; font-size: 14.5px; font-weight: 700; line-height: 1.4; }
.ma-hint.hidden { display: none; }

/* ── Presente ── */
.ma-present-overlay, .ma-gallery { position: absolute; inset: 0; z-index: 60; display: grid; place-items: center; background: rgba(8,6,26,.7); backdrop-filter: blur(3px); }
.ma-present-stage { display: flex; flex-direction: column; align-items: center; gap: 20px; padding: 20px; }
.ma-present-hint { font-weight: 800; font-size: clamp(17px, 2.8vw, 22px); color: #ffe27a; text-shadow: 0 3px 10px rgba(0,0,0,.6); animation: maPulse 1.1s ease-in-out infinite; }
.ma-present { font-size: clamp(110px, 22vw, 170px); line-height: 1; border: 0; background: none; cursor: pointer; filter: drop-shadow(0 14px 30px rgba(255,209,102,.5)); }
.ma-present.shake { animation: maShake .3s ease-in-out; }
.ma-present.grow { transform: scale(1.15); transition: transform .25s; }
.ma-reveal {
  display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 26px 30px;
  border-radius: 28px; background: linear-gradient(165deg, #fffaf0, #ffedc2); color: #293354;
  border: 3px solid #ffd166; box-shadow: 0 24px 60px rgba(0,0,0,.5); animation: maPop .45s ease;
  max-width: min(460px, 92vw);
}
.ma-reveal-title { font: 400 clamp(20px, 3.4vw, 28px) 'Luckiest Guy','Fredoka',sans-serif; color: #d1495b; }
.ma-reveal-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.ma-reveal-art { width: clamp(110px, 18vw, 150px); border-radius: 22px; box-shadow: 0 10px 26px rgba(0,0,0,.25); transform: rotate(-4deg); }
.ma-reveal-emoji { font-size: 64px; line-height: 1; }
.ma-reveal-label { font-weight: 800; font-size: 16px; color: #6b5627; }
.ma-reveal .ma-continue { margin-top: 8px; }

/* ── Fim de mundo ── */
.ma-world-complete {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
  padding: 26px 30px; border-radius: 30px; max-width: min(520px, 92vw);
  background: linear-gradient(165deg, rgba(48,30,100,.95), rgba(28,18,66,.97));
  border: 3px solid #7ad97a; box-shadow: 0 24px 60px rgba(0,0,0,.55); animation: maRise2 .4s ease;
  z-index: 40;
}
.ma-world-complete-title { font: 400 clamp(24px, 4.4vw, 36px) 'Luckiest Guy','Fredoka',sans-serif; color: #7ad97a; }
.ma-world-complete-name { font-size: clamp(18px, 3vw, 24px); font-weight: 800; color: #ffe27a; }
.ma-world-complete-stats { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; font-size: 14.5px; font-weight: 700; color: #fff3d6; }
.ma-world-complete-badge { margin-top: 2px; padding: 8px 18px; border-radius: 999px; background: rgba(255,209,102,.2); border: 1.5px solid rgba(255,209,102,.6); font-weight: 800; font-size: 14px; color: #ffe9b8; }
.ma-world-complete .ma-continue { margin-top: 10px; }
.ma-secondary {
  border: 1.5px solid rgba(255,255,255,.35); cursor: pointer; border-radius: 999px;
  padding: 11px 26px; background: rgba(255,255,255,.12);
  color: #fff3d6; font-weight: 800; font-size: 14.5px;
  transition: background .2s, transform .15s;
}
.ma-secondary:hover { background: rgba(255,255,255,.22); transform: translateY(-1px); }

/* ── Galeria de amigos ── */
.ma-gallery-panel {
  width: min(680px, 94vw); max-height: 88vh; overflow-y: auto; text-align: center;
  padding: 24px; border-radius: 30px; background: linear-gradient(165deg, rgba(48,30,100,.96), rgba(28,18,66,.98));
  border: 3px solid #ffd166; box-shadow: 0 24px 60px rgba(0,0,0,.55);
}
.ma-gallery-title { margin: 0 0 16px; font: 400 clamp(20px, 3.6vw, 30px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; }
.ma-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr)); gap: 12px; margin-bottom: 18px; }
.ma-gallery-card { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px; border-radius: 20px; background: rgba(255,255,255,.07); border: 2px solid rgba(255,255,255,.16); }
.ma-gallery-card img { width: 84px; height: 84px; object-fit: cover; border-radius: 50%; border: 3px solid #ffd166; }
.ma-gallery-card.mystery { opacity: .6; }
.ma-gallery-silhouette { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; font-size: 34px; background: rgba(0,0,0,.35); border: 3px dashed rgba(255,255,255,.3); }
.ma-gallery-name { font-weight: 800; font-size: 14px; }
.ma-gallery-world { font-size: 11px; font-weight: 700; color: rgba(255,255,255,.7); }

/* ── Golden Palace ── */
.ma-finale-caption { position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%); z-index: 8; padding: 12px 26px; border-radius: 999px; background: rgba(20,26,66,.78); border: 1.5px solid rgba(255,255,255,.3); font-weight: 800; font-size: clamp(15px, 2.4vw, 19px); white-space: nowrap; }
.ma-hall { position: absolute; inset: 0; z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; padding: 20px; background: radial-gradient(900px 500px at 50% 10%, rgba(255,209,102,.16), transparent 60%); }
.ma-hall-title { margin: 0; font: 400 clamp(20px, 4vw, 34px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; text-align: center; text-shadow: 0 3px 0 #b8860b, 0 8px 22px rgba(0,0,0,.5); }
.ma-parade { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; max-width: min(860px, 94vw); }
.ma-parade-friend { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px; border-radius: 22px; background: rgba(30,20,70,.6); border: 2px solid rgba(255,224,130,.6); opacity: 0; transform: translateY(30px) scale(.8); transition: all .55s cubic-bezier(.2, 1.4, .4, 1); }
.ma-parade-friend.arrived { opacity: 1; transform: translateY(0) scale(1); }
.ma-parade-friend img { width: clamp(58px, 8vw, 76px); height: clamp(58px, 8vw, 76px); object-fit: cover; border-radius: 50%; border: 3px solid #ffd166; }
.ma-parade-name { font-size: 12.5px; font-weight: 800; color: #fff3d6; }
.ma-crowning { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; padding: 24px 28px; border-radius: 30px; background: linear-gradient(165deg, rgba(60,40,10,.88), rgba(40,26,8,.92)); border: 3px solid #ffd166; box-shadow: 0 0 60px rgba(255,209,102,.4); animation: maRise2 .5s ease; max-width: min(560px, 94vw); }
.ma-crown-art { width: clamp(90px, 14vw, 130px); border-radius: 22px; background: #fff; padding: 8px; transform: rotate(-4deg); box-shadow: 0 10px 26px rgba(0,0,0,.35); animation: maCrownFloat 2.4s ease-in-out infinite; }
@keyframes maCrownFloat { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-10px) rotate(3deg); } }
.ma-crown-title { font: 400 clamp(24px, 4.6vw, 40px) 'Luckiest Guy','Fredoka',sans-serif; color: #ffe27a; text-shadow: 0 3px 0 #b8860b; }
.ma-crown-text { margin: 0; font-size: clamp(14px, 2.2vw, 17px); font-weight: 600; color: #fff3d6; line-height: 1.5; }
.ma-teaser { margin: 6px 0 0; font-style: italic; font-size: 14px; color: rgba(255,243,214,.85); }
.ma-the-end { font: 400 clamp(18px, 3vw, 26px) 'Luckiest Guy','Fredoka',sans-serif; color: #7ad97a; }

/* ── Efeitos globais ── */
.ma-burst { position: fixed; z-index: 90; width: 0; height: 0; pointer-events: none; }
.ma-burst i { position: absolute; width: 10px; height: 13px; border-radius: 3px; animation: maBurstFly ease-out forwards; }
@keyframes maBurstFly {
  0% { transform: translate(0, 0) rotate(0); opacity: 1; }
  100% { transform: translate(var(--dx), calc(var(--dy) + 30px)) rotate(var(--rot)); opacity: 0; }
}
.ma-toast { position: fixed; top: 18%; left: 50%; transform: translateX(-50%) translateY(-12px); z-index: 95; padding: 12px 26px; border-radius: 999px; font-weight: 800; font-size: clamp(16px, 2.6vw, 21px); opacity: 0; transition: opacity .3s, transform .3s; pointer-events: none; }
.ma-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.ma-toast-good { background: linear-gradient(135deg, rgba(58,160,90,.95), rgba(34,120,70,.95)); color: #fff; border: 2px solid rgba(122,217,122,.8); box-shadow: 0 10px 30px rgba(0,0,0,.4); }
.ma-toast-retry { background: linear-gradient(135deg, rgba(255,170,80,.95), rgba(240,130,90,.95)); color: #fff; border: 2px solid rgba(255,209,140,.85); box-shadow: 0 10px 30px rgba(0,0,0,.4); }
.ma-confetti-layer { position: fixed; inset: 0; z-index: 92; pointer-events: none; overflow: hidden; }
.ma-confetti-layer span { position: absolute; top: -20px; width: 10px; height: 15px; border-radius: 3px; animation: maConfettiFall linear forwards; }
@keyframes maConfettiFall { to { transform: translateY(115vh) rotate(680deg); } }
.ma-shake, .shake { animation: maShake .5s ease; }
@keyframes maShake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px) rotate(-2deg); } 50% { transform: translateX(8px) rotate(2deg); } 80% { transform: translateX(-5px); } }
.ma-glow { box-shadow: 0 0 30px rgba(255,209,102,.9) !important; }
@keyframes maPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.06); } }

/* Reduz movimento (spec §28) */
@media (prefers-reduced-motion: reduce) {
  .ma-world-friend img, .ma-path-spark,
  .ma-present.shake, .ma-map-node.current, .ma-map-palace.ready, .ma-fork-target,
  .ma-spot, .ma-hint, .ma-crown-art { animation: none !important; }
  .ma-burst { display: none; }
}

/* Telas pequenas: mundo continua jogável, mapa empilha menos denso (spec §26) */
@media (max-width: 640px) {
  .ma-map-node { min-width: 72px; padding: 7px 9px; }
  .ma-map-node-name { font-size: 9px; }
  .ma-quest { font-size: 11px; }
  .ma-quests { max-width: 46vw; }
  .ma-dialogue { flex-direction: row; padding: 11px 13px; }
  .ma-dialogue-portrait { width: 58px; height: 58px; }
  .ma-character { width: 88px; }
  .ma-match { flex-direction: column; }
  .ma-match-col { flex-direction: row; flex-wrap: wrap; justify-content: center; }
}
`;

export function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
