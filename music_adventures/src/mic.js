// Music Adventures — captura de microfone e detecção de afinação.
// Autocorrelação normalizada (método ACF2+): robusta para voz infantil,
// barata o suficiente para rodar em tempo real em qualquer laptop/tablet.

import { ensureAudio } from './audio.js';

let stream = null;
let sourceNode = null;
let analyser = null;
let timeBuffer = null;

export function micActive() {
  return Boolean(stream);
}

// Pede acesso ao microfone. Resolve { ok } — nunca rejeita (a negativa é um
// estado normal que a tela trata com carinho).
export async function requestMic() {
  if (stream) return { ok: true };
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    const ctx = ensureAudio();
    sourceNode = ctx.createMediaStreamSource(stream);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.2;
    sourceNode.connect(analyser); // análise apenas — não devolve ao alto-falante
    timeBuffer = new Float32Array(analyser.fftSize);
    return { ok: true };
  } catch (error) {
    stream = null;
    analyser = null;
    return { ok: false, error: error?.name || 'error' };
  }
}

export function stopMic() {
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  sourceNode = null;
  analyser = null;
}

// Correlação normalizada no domínio do tempo (ACF2+).
// Retorna { hz, clarity } — hz=NaN quando não há tom claro (silêncio/ruído).
export function detectPitch() {
  if (!analyser) return { hz: NaN, clarity: 0 };
  analyser.getFloatTimeDomainData(timeBuffer);
  return detectPitchFromBuffer(timeBuffer, ensureAudio().sampleRate);
}

// Versão pura (testável): buffer + sampleRate → { hz, clarity }.
export function detectPitchFromBuffer(buffer, sampleRate) {
  const size = buffer.length;
  let rms = 0;
  for (let i = 0; i < size; i += 1) rms += buffer[i] * buffer[i];
  rms = Math.sqrt(rms / size);
  if (rms < 0.008) return { hz: NaN, clarity: 0 }; // silêncio

  const minLag = Math.floor(sampleRate / 1100); // ~1100 Hz teto
  const maxLag = Math.floor(sampleRate / 75);   // ~75 Hz piso
  const windowSize = size - maxLag;

  // 1ª passada: correlação normalizada por atraso + máximo global.
  const correlations = new Float32Array(maxLag + 1);
  let globalMax = 0;
  for (let lag = minLag; lag <= maxLag; lag += 1) {
    let corr = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < windowSize; i += 1) {
      const a = buffer[i];
      const b = buffer[i + lag];
      corr += a * b;
      normA += a * a;
      normB += b * b;
    }
    const normalized = corr / (Math.sqrt(normA * normB) || 1e-9);
    correlations[lag] = normalized;
    if (normalized > globalMax) globalMax = normalized;
  }
  if (globalMax < 0.85) return { hz: NaN, clarity: globalMax };

  // 2ª passada: o FUNDAMENTAL é o primeiro pico local que chega perto do
  // máximo global — lags múltiplos do período têm correlação quase igual e
  // derrubariam a detecção uma oitava abaixo.
  const threshold = globalMax * 0.9;
  for (let lag = minLag + 1; lag < maxLag; lag += 1) {
    if (correlations[lag] >= threshold
      && correlations[lag] >= correlations[lag - 1]
      && correlations[lag] >= correlations[lag + 1]) {
      return { hz: sampleRate / lag, clarity: correlations[lag] };
    }
  }
  return { hz: NaN, clarity: globalMax };
}
