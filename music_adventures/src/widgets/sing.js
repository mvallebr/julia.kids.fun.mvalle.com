// Cante a Canção: ouve o trecho, canta de volta segurando o botão do
// microfone. A trilha da voz é desenhada em tempo real sobre os blocos das
// notas-alvo; cada bloco é avaliado pela mediana do desvio em cents.

import { el, burstAt, confetti } from '../ui.js';
import { sounds, playMelody } from '../audio.js';
import { requestMic, detectPitch } from '../mic.js';
import { uiText } from '../i18n.js';
import {
  DEGREE_COLORS, degreeToMidi, midiSolfege, midiName, centsOff, nearestMidi,
  gradeNote, gradeSong,
} from '../notes.js';

const BEAT = 480; // visual: 1 tempo = 96px no canvas

export function openSingLevel(host, { level, song, tempo, language, micReady, onFinish, onSave, onBack, onMicGranted }) {
  const baseOctave = 4;
  const targets = song.notes.map((degree) => degreeToMidi(degree, baseOctave));
  const beatSeconds = 60 / tempo;

  // timeline: acumula segundos por nota (para mapear voz → bloco)
  const starts = [];
  let cursor = 0;
  for (const beats of song.beats) {
    starts.push(cursor);
    cursor += beats * beatSeconds;
  }
  const totalSeconds = cursor;

  let phase = 'intro'; // intro → mic → listen → ready → singing → done
  let destroyed = false;
  let recording = false;
  let singTimer = null;
  let raf = null;
  const samples = targets.map(() => []); // centsOff por nota

  const screen = el('div', 'mu-screen');
  screen.style.backgroundImage = "url('assets/img/bg-sing.webp')";
  screen.appendChild(el('div', 'mu-veil'));

  const hud = el('div', 'mu-hud');
  const backChip = el('button', 'mu-chip clickable', '⬅️');
  backChip.type = 'button';
  backChip.addEventListener('click', () => { sounds.tap(); cleanup(); onBack(); });
  hud.appendChild(backChip);
  hud.appendChild(el('div', 'mu-chip', `🎶 ${song.name}`));
  screen.appendChild(hud);

  const panel = el('div', 'mu-panel');
  panel.appendChild(el('div', 'mu-title', uiText(language, 'sing')));

  const statusLine = el('div', 'mu-status', uiText(language, 'listenFirst'));
  panel.appendChild(statusLine);

  // ── canvas: blocos-alvo + trilha da voz ──
  const canvas = el('canvas', 'mu-pitch-canvas');
  const ctx = canvas.getContext('2d');
  panel.appendChild(canvas);

  // legenda do eixo (nomes das notas)
  const axisRow = el('div', 'mu-axis-row');
  const axisMidis = [degreeToMidi(0), degreeToMidi(2), degreeToMidi(4), degreeToMidi(5), degreeToMidi(7)];
  for (const midi of axisMidis) {
    axisRow.appendChild(el('span', 'mu-axis-note', `${midiSolfege(midi)} ${midiName(midi)}`));
  }
  panel.appendChild(axisRow);

  const controls = el('div', 'mu-controls');
  panel.appendChild(controls);

  screen.appendChild(panel);
  host.appendChild(screen);

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 260;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  requestAnimationFrame(resizeCanvas);

  // mapeia (segundo, hz) → pixel do canvas
  function px(time) {
    return 8 + (time / totalSeconds) * (canvas.clientWidth - 16);
  }
  function py(midi) {
    // escala: dó4 (grau 0) embaixo, sol4 no topo — janela confortável
    const bottom = degreeToMidi(0, baseOctave) - 2; // lá3
    const top = degreeToMidi(7, baseOctave) + 2;    // mi5
    const height = canvas.clientHeight;
    return height - 10 - ((midi - bottom) / (top - bottom)) * (height - 20);
  }

  function drawResult(grades) {
    resizeCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    const colors = { good: '#7ad97a', ok: '#ffd166', off: '#ff8fa3', miss: 'rgba(255,255,255,.25)' };
    targets.forEach((midi, index) => {
      const x = px(starts[index]);
      const w = px(starts[index] + song.beats[index] * beatSeconds) - x - 6;
      const y = py(midi);
      ctx.fillStyle = colors[grades[index]] || colors.miss;
      roundRect(x, y - 14, Math.max(18, w), 28, 8);
    });
  }

  function drawLive(recorderTime, hz) {
    resizeCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    // blocos-alvo
    targets.forEach((midi, index) => {
      const x = px(starts[index]);
      const w = px(starts[index] + song.beats[index] * beatSeconds) - x - 6;
      ctx.fillStyle = 'rgba(255,255,255,.16)';
      roundRect(x, py(midi) - 14, Math.max(18, w), 28, 8);
      ctx.fillStyle = 'rgba(255,247,234,.85)';
      ctx.font = '700 11px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(midiSolfege(midi), x + Math.max(18, w) / 2, py(midi) + 4);
    });
    // trilha da voz até agora
    if (!recording) return;
    ctx.strokeStyle = '#6bd6ff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    let started = false;
    for (const [time, hzValue] of liveTrace) {
      if (!Number.isFinite(hzValue)) { started = false; continue; }
      const x = px(time);
      const y = py(hzToMidiLocal(hzValue));
      if (!started) { ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    if (started) {
      ctx.stroke();
      // ponto brilhante na cabeça da trilha
      const last = liveTrace[liveTrace.length - 1];
      if (last && Number.isFinite(last[1])) {
        ctx.fillStyle = '#6bd6ff';
        ctx.beginPath();
        ctx.arc(px(last[0]), py(hzToMidiLocal(last[1])), 7, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    void height; void recorderTime; // usado via liveTrace
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.fill();
  }

  function hzToMidiLocal(hz) {
    return nearestMidi(hz) + (hz > 0 ? (hzToMidiFraction(hz)) : 0);
  }
  function hzToMidiFraction(hz) {
    return 69 + 12 * Math.log2(hz / 440);
  }

  // ── fluxo ──
  function buildMicGate() {
    controls.innerHTML = '';
    if (micReady) {
      startFlow();
      return;
    }
    statusLine.textContent = uiText(language, 'micIntro');
    const allow = el('button', 'mu-btn', uiText(language, 'micAllow'));
    allow.type = 'button';
    allow.addEventListener('click', async () => {
      allow.disabled = true;
      const result = await requestMic();
      if (destroyed) return;
      if (result.ok) {
        onMicGranted?.();
        sounds.micOn();
        startFlow();
      } else {
        statusLine.textContent = uiText(language, 'micDenied');
        allow.remove();
        const goListen = el('button', 'mu-btn ghost', `🎧 ${uiText(language, 'listen')}`);
        goListen.type = 'button';
        goListen.addEventListener('click', () => { sounds.tap(); cleanup(); onBack('listen'); });
        controls.appendChild(goListen);
      }
    });
    controls.appendChild(allow);
  }

  function startFlow() {
    statusLine.textContent = uiText(language, 'micReady');
    playTargetThenArm();
  }

  function playTargetThenArm() {
    phase = 'listen';
    statusLine.textContent = uiText(language, 'listenFirst');
    controls.innerHTML = '';
    const total = playMelody(song.notes, tempo, baseOctave, (index) => {
      highlightBlock(index);
    });
    setTimeout(() => {
      if (destroyed) return;
      phase = 'ready';
      statusLine.textContent = uiText(language, 'nowSing');
      buildSingButton();
    }, total + 250);
  }

  function buildSingButton(retry = false) {
    controls.innerHTML = '';
    if (retry) {
      const replay = el('button', 'mu-btn ghost', uiText(language, 'listenAgain'));
      replay.type = 'button';
      replay.addEventListener('click', () => { sounds.tap(); playTargetThenArm(); });
      controls.appendChild(replay);
    }
    const singButton = el('button', 'mu-btn mu-sing', `🎤 ${uiText(language, 'holdToSing')}`);
    singButton.type = 'button';
    const start = (event) => {
      event.preventDefault();
      if (phase !== 'ready') return;
      startRecording(singButton);
    };
    const stop = () => {
      if (recording) stopRecording();
    };
    singButton.addEventListener('pointerdown', start);
    singButton.addEventListener('pointerup', stop);
    singButton.addEventListener('pointerleave', stop);
    singButton.addEventListener('pointercancel', stop);
    controls.appendChild(singButton);
  }

  let liveTrace = [];
  function startRecording(button) {
    recording = true;
    liveTrace = [];
    samples.forEach((list) => { list.length = 0; });
    button.classList.add('recording');
    button.textContent = `🎤 ${uiText(language, 'listening')}`;
    phase = 'singing';
    const startedAt = performance.now();
    let lastSample = 0;
    const loop = () => {
      if (destroyed || !recording) return;
      const elapsed = (performance.now() - startedAt) / 1000;
      const { hz } = detectPitch();
      liveTrace.push([elapsed, hz]);
      // amostra por nota: só pega o miolo do bloco (pula 20% das bordas)
      targets.forEach((midi, index) => {
        const noteStart = starts[index];
        const noteEnd = noteStart + song.beats[index] * beatSeconds;
        const innerStart = noteStart + (noteEnd - noteStart) * 0.2;
        const innerEnd = noteEnd - (noteEnd - noteStart) * 0.15;
        if (elapsed >= innerStart && elapsed <= innerEnd && Number.isFinite(hz)) {
          samples[index].push(centsOff(hz, midi));
        }
      });
      drawLive(elapsed, hz);
      if (elapsed >= totalSeconds + 0.4) {
        stopRecording();
        return;
      }
      // throttle ~30fps já é suficiente; rAF gira a ~60
      if (performance.now() - lastSample < 30) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastSample = performance.now();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    singTimer = setTimeout(() => stopRecording(), (totalSeconds + 0.6) * 1000);
  }

  function stopRecording() {
    if (!recording) return;
    recording = false;
    clearTimeout(singTimer);
    cancelAnimationFrame(raf);
    phase = 'done';
    const button = controls.querySelector('.mu-sing');
    button?.classList.remove('recording');
    const grades = samples.map((list) => gradeNote(list));
    drawResult(grades);
    const stars = gradeSong(grades);
    finish(grades, stars);
  }

  function highlightBlock(index) {
    drawIdle();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    targets.forEach((midi, target) => {
      const x = px(starts[target]);
      const w = px(starts[target] + song.beats[target] * beatSeconds) - x - 6;
      ctx.fillStyle = target === index ? DEGREE_COLORS[song.notes[target]] : 'rgba(255,255,255,.16)';
      roundRect(x, py(midi) - 14, Math.max(18, w), 28, 8);
      ctx.fillStyle = 'rgba(255,247,234,.9)';
      ctx.font = '700 11px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(midiSolfege(midi), x + Math.max(18, w) / 2, py(midi) + 4);
    });
  }

  function drawIdle() {
    // placeholder vazio: highlightBlock desenha tudo
  }

  function finish(grades, stars) {
    // grava as estrelas no instante da conclusão (não no clique de sair)
    onSave?.(stars);
    burstAt(panel, 40 + stars * 20);
    if (stars >= 2) { sounds.star(); confetti(60 * stars, 1800); }
    else sounds.correct();
    const good = grades.filter((g) => g === 'good').length;
    const ok = grades.filter((g) => g === 'ok').length;
    statusLine.textContent = uiText(language, 'score', { good, ok });
    controls.innerHTML = '';
    const nextButton = el('button', 'mu-btn', uiText(language, 'nextLevel'));
    nextButton.type = 'button';
    nextButton.addEventListener('click', () => { sounds.tap(); cleanup(); onFinish(stars, level + 1); });
    controls.appendChild(nextButton);
    const againButton = el('button', 'mu-btn ghost', uiText(language, 'replay'));
    againButton.type = 'button';
    againButton.style.marginLeft = '10px';
    againButton.addEventListener('click', () => { sounds.tap(); cleanup(); onFinish(stars, level); });
    controls.appendChild(againButton);
  }

  function cleanup() {
    destroyed = true;
    recording = false;
    clearTimeout(singTimer);
    cancelAnimationFrame(raf);
  }

  buildMicGate();
  return {
    destroy() {
      cleanup();
      screen.remove();
    },
  };
}
