// Language Adventures — reconhecimento de fala (spec §8/§9).
// Web Speech API com pontuação tolerante; falar é sempre opcional (§8).

export function speechSupported() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Normaliza para comparação: minúsculas, sem pontuação, sem acentos.
export function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zà-ÿ0-9\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Similaridade 0..1 (distância de Levenshtein normalizada).
export function similarity(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return 0;
  if (na === nb) return 1;
  const m = na.length;
  const n = nb.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (na[i - 1] === nb[j - 1] ? 0 : 1),
      );
    }
  }
  return 1 - dp[m][n] / Math.max(m, n);
}

// Pontuação tolerante (spec §9): verde/vermelho/amarelo, nunca bloqueia.
export function gradePronunciation(transcript, expected) {
  if (!transcript || !normalize(transcript)) return 'red';
  const sim = similarity(transcript, expected);
  // reconhecimento exato OU contém a frase esperada → verde
  if (sim >= 0.85 || normalize(transcript).includes(normalize(expected))) return 'green';
  if (sim >= 0.55) return 'yellow';
  return 'red';
}

// Inicia o reconhecimento; onDone({ transcript, error }) — nunca rejeita.
export function listenOnce(locale, onDone) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) {
    onDone({ transcript: '', error: 'unsupported' });
    return () => {};
  }
  const recognition = new Recognition();
  recognition.lang = locale;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  let settled = false;
  const finish = (payload) => {
    if (settled) return;
    settled = true;
    onDone(payload);
  };
  recognition.onresult = (event) => {
    const alternatives = [];
    for (let i = 0; i < event.results[0].length; i += 1) {
      alternatives.push(event.results[0][i].transcript);
    }
    finish({ transcript: alternatives.join(' '), error: null });
  };
  recognition.onerror = (event) => finish({ transcript: '', error: event.error || 'error' });
  recognition.onend = () => finish({ transcript: '', error: 'no-speech' });
  try {
    recognition.start();
  } catch {
    finish({ transcript: '', error: 'start-failed' });
  }
  return () => {
    try { recognition.stop(); } catch { /* já parado */ }
  };
}
