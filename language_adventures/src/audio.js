// Language Adventures — áudio: TTS do idioma-alvo + efeitos de interface.

let ctx = null;
let muted = false;

export function ensureAudio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setMuted(value) {
  muted = Boolean(value);
}

function now() {
  return ensureAudio().currentTime;
}

function blip(freq, at, duration, type = 'sine', gainValue = 0.15) {
  if (muted) return;
  const c = ensureAudio();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(gainValue, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(gain).connect(c.destination);
  osc.start(at);
  osc.stop(at + duration + 0.02);
}

export const sounds = {
  tap() { blip(660, now(), 0.08); },
  correct() {
    const t = now();
    blip(523.25, t, 0.12, 'triangle', 0.2);
    blip(659.25, t + 0.1, 0.12, 'triangle', 0.2);
    blip(783.99, t + 0.2, 0.22, 'triangle', 0.2);
  },
  wrong() {
    const t = now();
    blip(311, t, 0.16, 'sawtooth', 0.07);
    blip(233, t + 0.14, 0.2, 'sawtooth', 0.07);
  },
  star() {
    const t = now();
    [784, 988, 1175, 1568].forEach((freq, index) => blip(freq, t + index * 0.09, 0.18, 'triangle', 0.18));
  },
  fanfare() {
    const t = now();
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => blip(freq, t + index * 0.13, 0.3, 'triangle', 0.2));
  },
};

// ── TTS do idioma-alvo (spec §10: MVP = voz do navegador) ───────────────────
let cachedVoice = null;
let voicesListenerAdded = false;

function pickVoice(locale) {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  if (!voices.length) return null;
  const base = locale.split('-')[0]; // 'fr-FR' → 'fr'
  // prefere voz nativa do locale exato, depois qualquer voz do idioma
  return voices.find((v) => v.lang.replace('_', '-') === locale)
    || voices.find((v) => v.lang.replace('_', '-').startsWith(base))
    || null;
}

export function speak(text, locale, { rate = 0.95 } = {}) {
  if (muted || !text) return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = locale;
  if (!cachedVoice || cachedVoiceLocale !== locale) {
    cachedVoice = pickVoice(locale);
    cachedVoiceLocale = locale;
  }
  if (cachedVoice) utter.voice = cachedVoice;
  utter.rate = rate;
  utter.pitch = 1.05;
  synth.speak(utter);
}

let cachedVoiceLocale = null;

// vozes carregam async em alguns navegadores: aquece o cache
export function warmVoices(locale) {
  if (!window.speechSynthesis) return;
  cachedVoice = pickVoice(locale);
  cachedVoiceLocale = locale;
  if (!voicesListenerAdded && !window.speechSynthesis.getVoices().length) {
    voicesListenerAdded = true;
    window.speechSynthesis.addEventListener?.('voiceschanged', () => {
      cachedVoice = pickVoice(locale);
    });
  }
}
