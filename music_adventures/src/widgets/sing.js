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
  screen.style.backgroundPosition = 'center 30%';
  screen.appendChild(el('div', 'mu-veil'));

  const hud = el('div', 'mu-hud');
  const backChip = el('button', 'mu-chip clickable', '⬅️');
  backChip.type = 'button';
  backChip.addEventListener('click', () => { sounds.tap(); cleanup(); onBack(); });
  hud.appendChild(backChip);
  hud.appendChild(el('div', 'mu-chip', `🎶 ${song.name}`));
  screen.appendChild(hud);

  const panel = el('div', 'mu-panel');
  // painel ancorado embaixo: a arte (menina no palco) continua visível
  panel.style.top = '60%';
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
  function width() { return canvas.clientWidth || 600; }
  function height() { return canvas.clientHeight || 240; }
  function px(time) {
    return 8 + (time / totalSeconds) * (width() - 16);
  }
  function py(midi) {
    // escala: dó4 (grau 0) embaixo, sol4 no topo — janela confortável
    const bottom = degreeToMidi(0, baseOctave) - 2; // lá3
    const top = degreeToMidi(7, baseOctave) + 2;    // mi5
    const h = height();
    return h - 10 - ((midi - bottom) / (top - bottom)) * (h - 20);
  }

  const RESULT_FACES = { good: '😄', ok: '🙂', off: '😵', miss: '👂' };

  function drawResult(grades, actualMidis = []) {
    resizeCanvas();
    const w = width();
    const h = height();
    ctx.clearRect(0, 0, w, h);
    const colors = {
      good: '#7ad97a',
      ok: '#ffd166',
      off: '#ff8fa3',
      miss: '#6b5a78', // lilás-acinzentado — visível no canvas escuro (era .22 de branco)
    };
    targets.forEach((midi, index) => {
      const x = px(starts[index]);
      const bw = Math.max(20, px(starts[index] + song.beats[index] * beatSeconds) - x - 6);
      const y = py(midi);
      const grade = grades[index] || 'miss';
      // bloco na altura esperada, colorido pelo resultado
      ctx.fillStyle = colors[grade] || colors.miss;
      roundRect(x, y - 15, bw, 30, 9);
      // carinha grande dentro do bloco: leitura instantânea para criança
      ctx.font = '700 17px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(RESULT_FACES[grade] || RESULT_FACES.miss, x + bw / 2, y + 6);
      // nota esperada, pequena, acima do bloco
      ctx.fillStyle = 'rgba(255,247,234,.85)';
      ctx.font = '700 10px Fredoka, sans-serif';
      ctx.fillText(midiSolfege(midi), x + bw / 2, y - 20);
      // marcador da nota REAL cantada, na altura real
      const actual = actualMidis[index];
      if (actual != null) {
        const ay = py(actual);
        const cx = x + bw / 2;
        ctx.strokeStyle = 'rgba(107,214,255,.7)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, y + (actual > midi ? 15 : -15));
        ctx.lineTo(cx, ay + (actual > midi ? -14 : 14));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#6bd6ff';
        ctx.beginPath();
        ctx.arc(cx, ay, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#10203a';
        ctx.font = '800 10px Fredoka, sans-serif';
        ctx.fillText(midiSolfege(actual), cx, ay + 3.5);
        if (Math.abs(actual - midi) >= 12) {
          ctx.fillStyle = '#6bd6ff';
          ctx.font = '800 11px Fredoka, sans-serif';
          ctx.fillText(actual > midi ? '8↑' : '8↓', cx + 16, ay + 4);
        }
      }
    });
  }

  function drawLive(recorderTime, hz) {
    resizeCanvas();
    const w = width();
    const h = height();
    ctx.clearRect(0, 0, w, h);
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
    if (!recording) return;
    // trilha da voz até agora
    ctx.strokeStyle = '#6bd6ff';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
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
      const last = liveTrace[liveTrace.length - 1];
      if (last && Number.isFinite(last[1])) {
        ctx.fillStyle = '#6bd6ff';
        ctx.beginPath();
        ctx.arc(px(last[0]), py(hzToMidiLocal(last[1])), 7, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (liveTrace.length > 3) {
      // está gravando mas não captou nenhuma voz ainda: feedback visível
      const pulse = 1 + 0.12 * Math.sin(recorderTime * 4);
      ctx.font = `${Math.round(54 * pulse)}px 'Fredoka',sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(107,214,255,.78)';
      ctx.fillText('🎤', w / 2, h / 2 + 18);
      ctx.font = '700 12px Fredoka, sans-serif';
      ctx.fillStyle = 'rgba(255,247,234,.7)';
      ctx.fillText('estou ouvindo…', w / 2, h / 2 + 50);
    }
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
    const singButton = el('button', 'mu-btn mu-sing', uiText(language, 'startSinging'));
    singButton.type = 'button';
    singButton.addEventListener('click', () => {
      if (phase !== 'ready') return;
      startRecording(singButton);
    });
    controls.appendChild(singButton);
  }

  let liveTrace = [];
  let hzSamples = targets.map(() => []);
  // Contagem de entrada: a criança aperta o botão e precisa de tempo para
  // começar a cantar — sem isso a primeira nota sempre virava "perdida".
  const LEAD_IN_BEATS = 2;
  const leadIn = LEAD_IN_BEATS * beatSeconds;

  function startRecording(button) {
    recording = true;
    liveTrace = [];
    samples.forEach((list) => { list.length = 0; });
    hzSamples.forEach((list) => { list.length = 0; });
    button.classList.add('recording');
    button.textContent = `🎤 ${uiText(language, 'listening')}`;
    phase = 'singing';
    const startedAt = performance.now();
    let lastSample = 0;
    let lastCount = null;
    const loop = () => {
      if (destroyed || !recording) return;
      // tempo da MÚSICA: 0 é o início da primeira nota (a entrada fica antes)
      const elapsed = (performance.now() - startedAt) / 1000 - leadIn;
      const { hz } = detectPitch();

      // contagem regressiva: número GRANDE no canvas + status
      if (elapsed < 0) {
        const count = Math.ceil(-elapsed / beatSeconds);
        if (count !== lastCount) {
          lastCount = count;
          statusLine.textContent = `${count}…`;
          drawCountdown(count);
        }
      } else if (lastCount !== 0) {
        lastCount = 0;
        statusLine.textContent = uiText(language, 'nowSing');
      }

      if (elapsed >= 0) {
        liveTrace.push([elapsed, hz]);
        // amostra por nota: só pega o miolo do bloco (pula bordas)
        targets.forEach((midi, index) => {
          const noteStart = starts[index];
          const noteEnd = noteStart + song.beats[index] * beatSeconds;
          const innerStart = noteStart + (noteEnd - noteStart) * 0.2;
          const innerEnd = noteEnd - (noteEnd - noteStart) * 0.15;
          if (elapsed >= innerStart && elapsed <= innerEnd && Number.isFinite(hz)) {
            samples[index].push(centsOff(hz, midi));
            hzSamples[index].push(hz);
          }
        });
        drawLive(elapsed, hz);
      }
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
    singTimer = setTimeout(() => stopRecording(), (leadIn + totalSeconds + 0.6) * 1000);
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
    // nota REAL cantada em cada bloco: mediana das frequências → nota mais próxima
    const actualMidis = hzSamples.map((list, index) => {
      if (!list.length) return null;
      const sorted = [...list].sort((a, b) => a - b);
      const medianHz = sorted[Math.floor(sorted.length / 2)];
      return nearestMidi(medianHz);
    });
    drawResult(grades, actualMidis);
    const stars = gradeSong(grades);
    finish(grades, actualMidis, stars);
  }

  function drawCountdown(count) {
    resizeCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
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
    ctx.fillStyle = '#ffe08a';
    ctx.font = "400 96px 'Luckiest Guy','Fredoka',sans-serif";
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,.55)';
    ctx.shadowBlur = 14;
    ctx.fillText(String(count), width / 2, height / 2 + 34);
    ctx.shadowBlur = 0;
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

  function finish(grades, actualMidis, stars) {
    // grava as estrelas no instante da conclusão (não no clique de sair)
    onSave?.(stars);
    const good = grades.filter((g) => g === 'good').length;
    const ok = grades.filter((g) => g === 'ok').length;
    const miss = grades.filter((g) => g === 'miss').length;
    const noVoice = actualMidis.every((m) => m == null);
    burstAt(panel, 40 + stars * 20);
    let retryLabel;
    if (stars >= 3) {
      sounds.fanfare();
      confetti(80 * stars, 1800);
      statusLine.textContent = `🎉 ${uiText(language, 'greatEar')} (${good} 😄)`;
      retryLabel = uiText(language, 'replay');
    } else if (stars === 2) {
      sounds.star();
      confetti(60 * stars, 1800);
      statusLine.textContent = `😊 ${good} boas · ${ok} quase`;
      retryLabel = uiText(language, 'replay');
    } else if (noVoice) {
      // microfone não ouviu nada: não fingir acerto
      sounds.wrong();
      statusLine.textContent = '🎤 Não te ouvi. Aperta 🎤 Cantar e canta junto.';
      retryLabel = uiText(language, 'replay');
    } else {
      sounds.wrong();
      statusLine.textContent = `👂 ${miss} nota${miss === 1 ? '' : 's'} perdida${miss === 1 ? '' : 's'} · tenta de novo`;
      retryLabel = uiText(language, 'replay');
    }
    controls.innerHTML = '';
    const againButton = el('button', 'mu-btn primary', retryLabel);
    againButton.type = 'button';
    againButton.addEventListener('click', () => { sounds.tap(); cleanup(); onFinish(stars, level); });
    controls.appendChild(againButton);
    if (stars >= 2 && level < 999) {
      const nextButton = el('button', 'mu-btn ghost', uiText(language, 'nextLevel'));
      nextButton.type = 'button';
      nextButton.addEventListener('click', () => { sounds.tap(); cleanup(); onFinish(stars, level + 1); });
      controls.appendChild(nextButton);
    }
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
