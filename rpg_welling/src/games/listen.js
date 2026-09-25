// RPG Welling — minigame de ouvir e repetir (roadmap 2.1).
// A comparação e a escolha de alvos são puras; o DOM, a fala e o Recognition
// ficam isolados nesta fábrica para que o mundo apenas abra e feche o painel.

import { shouldReduceMotion } from '../a11y.js';

const LANGUAGES = ['pt', 'en', 'es'];
const DEFAULT_RECOGNITION_TIMEOUT = 5000;
let listenInputSequence = 0;

function targetEntry(word, pt, en, es) {
  return Object.freeze({ word, gloss: Object.freeze({ pt, en, es }) });
}

// A tabela não repete o vocabulario do minigame 2.4 e privilegia palavras
// curtas, frequentes e adequadas para leitura em voz alta por crianças.
export const LISTEN_SPOTS = Object.freeze([
  Object.freeze({
    id: 'school',
    targets: Object.freeze([
      targetEntry('sun', 'sol', 'sun', 'sol'),
      targetEntry('book', 'livro', 'book', 'libro'),
      targetEntry('ball', 'bola', 'ball', 'pelota'),
      targetEntry('duck', 'pato', 'duck', 'pato'),
    ]),
  }),
  Object.freeze({
    id: 'woods',
    targets: Object.freeze([
      targetEntry('leaf', 'folha', 'leaf', 'hoja'),
      targetEntry('tree', 'árvore', 'tree', 'árbol'),
      targetEntry('bird', 'pássaro', 'bird', 'pájaro'),
      targetEntry('nest', 'ninho', 'nest', 'nido'),
    ]),
  }),
  Object.freeze({
    id: 'highstreet',
    targets: Object.freeze([
      targetEntry('cake', 'bolo', 'cake', 'pastel'),
      targetEntry('hat', 'chapéu', 'hat', 'sombrero'),
      targetEntry('bike', 'bicicleta', 'bike', 'bicicleta'),
      targetEntry('map', 'mapa', 'map', 'mapa'),
    ]),
  }),
  Object.freeze({
    id: 'classroom',
    targets: Object.freeze([
      targetEntry('pen', 'caneta', 'pen', 'bolígrafo'),
      targetEntry('desk', 'carteira', 'desk', 'escritorio'),
      targetEntry('song', 'canção', 'song', 'canción'),
      targetEntry('bell', 'sino', 'bell', 'campana'),
    ]),
  }),
  Object.freeze({
    id: 'academy',
    targets: Object.freeze([
      targetEntry('moon', 'lua', 'moon', 'luna'),
      targetEntry('cloud', 'nuvem', 'cloud', 'nube'),
      targetEntry('key', 'chave', 'key', 'llave'),
      targetEntry('crown', 'coroa', 'crown', 'corona'),
    ]),
  }),
]);

const SPOTS_BY_ID = new Map(LISTEN_SPOTS.map((spot) => [spot.id, spot]));

function languageOrDefault(language) {
  return LANGUAGES.includes(language) ? language : 'pt';
}

function randomIndex(rng, length) {
  let value;
  try {
    value = typeof rng === 'function' ? rng() : Math.random();
  } catch {
    value = Math.random();
  }
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(length - 1, Math.max(0, Math.floor(number * length)));
}

export function getListenTarget(zone, language = 'pt', rng = Math.random) {
  const spot = SPOTS_BY_ID.get(zone);
  if (!spot) return null;
  const target = spot.targets[randomIndex(rng, spot.targets.length)];
  return Object.freeze({ word: target.word, gloss: target.gloss[languageOrDefault(language)] });
}

export const DEFAULT_STRINGS = {
  panelTitle: {
    pt: 'Ouvir e repetir',
    en: 'Listen and repeat',
    es: 'Escuchar y repetir',
  },
  instructions: {
    pt: 'Toque em Ouvir, depois diga a palavra em inglês.',
    en: 'Tap Listen, then say the word in English.',
    es: 'Toca Escuchar y después di la palabra en inglés.',
  },
  // Caminho com o campo ABERTO: o módulo entrou em fallback e o que falta é o
  // MICROFONE, não o som. Vale com ou sem áudio: numa configuração comum
  // (voz TTS inglesa instalada, sem SpeechRecognition) o botão Ouvir aparece e
  // funciona, e mesmo assim a criança não tem como falar. Por isso o texto fala
  // de microfone e não de áudio.
  instructionsType: {
    pt: 'Sem microfone, escreva a palavra em inglês no campo abaixo.',
    en: 'With no microphone, type the English word in the box below.',
    es: 'Sin micrófono, escribe la palabra en inglés en el recuadro de abajo.',
  },
  // Caminho com o campo FECHADO e sem voz inglesa: o botão Ouvir some e sobra
  // o microfone. O texto repete o rótulo de `repeat` do mesmo jeito que
  // `instructions` repete o de `listen`: um hospedeiro que renomear um botão
  // precisa renomear a instrução junto.
  instructionsSpeak: {
    pt: 'Toque em Repetir e diga a palavra em inglês.',
    en: 'Tap Repeat and say the word in English.',
    es: 'Toca Repetir y di la palabra en inglés.',
  },
  listen: {
    pt: 'Ouvir',
    en: 'Listen',
    es: 'Escuchar',
  },
  repeat: {
    pt: 'Repetir',
    en: 'Repeat',
    es: 'Repetir',
  },
  typePlaceholder: {
    pt: 'Digite a palavra aqui',
    en: 'Type the word here',
    es: 'Escribe la palabra aquí',
  },
  // O aviso aparece exatamente quando o campo abre, ou seja, quando falta o
  // MICROFONE. "A fala não está disponível" mentia na configuração mais comum
  // em desktop, em que a voz TTS existe e funciona e quem falta é o
  // reconhecimento. Mesmo eixo da instrução acima: entrada, não saída.
  fallbackNotice: {
    pt: 'O microfone não está disponível. Você pode escrever a palavra.',
    en: 'The microphone is not available. You can write the word.',
    es: 'El micrófono no está disponible. Puedes escribir la palabra.',
  },
  listening: {
    pt: 'Estou ouvindo sua voz.',
    en: 'I am listening to your voice.',
    es: 'Estoy escuchando tu voz.',
  },
  emptyInput: {
    pt: 'Escreva uma palavra para tentar.',
    en: 'Write a word to try.',
    es: 'Escribe una palabra para intentar.',
  },
  tryAgain: {
    pt: 'Quase! Você disse {heard}. Tente mais uma vez.',
    en: 'Almost! You said {heard}. Try once more.',
    es: '¡Casi! Dijiste {heard}. Inténtalo una vez más.',
  },
  notHeard: {
    pt: 'Quase! Não consegui ouvir desta vez. Tente falar de novo.',
    en: 'Almost! I could not hear this time. Try speaking again.',
    es: '¡Casi! No pude escuchar esta vez. Intenta hablar de nuevo.',
  },
  success: {
    pt: 'Muito bem! A palavra é {word}.',
    en: 'Well done! The word is {word}.',
    es: '¡Muy bien! La palabra es {word}.',
  },
  reveal: {
    pt: 'Vamos ver juntos: {word} significa {gloss}.',
    en: "Let's see it together: {word} means {gloss}.",
    es: 'Miremos juntos: {word} significa {gloss}.',
  },
  close: {
    pt: 'Fechar',
    en: 'Close',
    es: 'Cerrar',
  },
};

// Aceita as duas formas usadas pelos outros minigames. Uma sobrescrita vazia
// volta ao texto padrão para nunca deixar um comando sem nome na interface.
export function resolveText(strings, key, language = 'pt') {
  const active = languageOrDefault(language);
  const supplied = strings?.[active] && typeof strings[active] === 'object' ? strings[active] : strings;
  const override = supplied?.[key];
  if (typeof override === 'string' && override) return override;
  if (override && typeof override === 'object') {
    const picked = override[active] || override.pt || override.en || override.es;
    if (typeof picked === 'string' && picked) return picked;
  }
  const fallback = DEFAULT_STRINGS[key];
  if (typeof fallback === 'string' && fallback) return fallback;
  return fallback?.[active] || fallback?.pt || fallback?.en || fallback?.es || '';
}

export function normalizeSpeech(text) {
  return String(text ?? '')
    // Contrações como don't e can't precisam sobreviver à remoção de pontuação.
    .replace(/([A-Za-z]+)['’]t\b/gi, '$1t')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function levenshteinDistance(left, right) {
  const a = Array.from(String(left ?? ''));
  const b = Array.from(String(right ?? ''));
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let row = 1; row <= a.length; row += 1) {
    const current = [row];
    for (let column = 1; column <= b.length; column += 1) {
      const substitution = previous[column - 1] + (a[row - 1] === b[column - 1] ? 0 : 1);
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        substitution,
      );
    }
    previous = current;
  }
  return previous[b.length];
}

function ratio(left, right) {
  const longest = Math.max(left.length, right.length);
  return longest ? 1 - levenshteinDistance(left, right) / longest : 0;
}

// Reconhecedores reais às vezes devolvem "the word is swing". Esse formato
// recebe a pontuação máxima, mas qualquer marcador de recusa, dúvida,
// ausência ou incapacidade no enunciado inteiro reprova a tentativa.
//
// A lista é por PALAVRA INTEIRA, nunca por sufixo nem por radical. A rodada 4
// usava `token.endsWith('nt')` e tratava `do` como marcador, e as duas regras
// reprovavam criança que acertou: o sufixo pegava "want", "went" e "plant", e
// "do" é verbo afirmativo comum ("I do swing", "can you do swing"). Por isso as
// contrações normalizadas, que perdem o apóstrofo, estão escritas uma a uma.
const REFUSAL_MARKERS = new Set([
  // inglês: negação, ausência, dúvida e incapacidade
  'no', 'not', 'never', 'none', 'nobody', 'nothing', 'without',
  'unsure', 'unknown', 'maybe', 'perhaps', 'unable', 'incapable',
  // inglês: contrações normalizadas, como don't -> dont
  'cannot', 'cant', 'dont', 'wont', 'doesnt', 'didnt', 'isnt', 'arent', 'werent',
  'wasnt', 'shouldnt', 'wouldnt', 'couldnt', 'mightnt', 'mustnt', 'hasnt',
  'havent', 'hadnt', 'aint', 'shant', 'neednt', 'oughtnt', 'maynt', 'darent',
  // português: negação, ausência, dúvida e incapacidade
  'nao', 'nunca', 'jamais', 'nada', 'nenhum', 'nenhuma', 'ninguem', 'ningun',
  'ninguna', 'ninguno', 'tampoco', 'sem', 'duvida', 'duvido', 'talvez',
  'incapaz', 'desconheco',
  // espanhol: negação, ausência, dúvida e incapacidade
  'no', 'sin', 'nadie', 'nada', 'ningun', 'ninguna', 'ninguno', 'nunca',
  'jamas', 'tampoco', 'duda', 'dudo', 'quizas', 'incapaz', 'desconozco',
]);

// Troca deliberada de produto: "the bird is not red and the swing is blue" e
// "I have never seen a swing" passam a reprovar. São frases que uma criança não
// fala ao repetir uma palavra. Reprovar a criança que errou a frase é melhor
// do que aprovar quem disse "não sei". Não tente criar exceções por assunto:
// isso reabriria o ciclo de listas e janelas que esta regra veio substituir.
function deniesAttempt(tokens) {
  return tokens.some((token) => REFUSAL_MARKERS.has(token));
}

function withoutInitialDiscourseNegator(text) {
  // Esta é a única exceção à regra geral. Um "no," ou "não," inicial seguido
  // de vírgula, ponto e vírgula ou dois pontos é pausa retórica, não negação do
  // alvo. A peça inicial é removida ANTES da varredura; qualquer negação que
  // aparecer depois continua válida, como em "não, eu não sei swing".
  return String(text ?? '').replace(/^\s*(?:n[ãa]o|no)\s*[,;:]\s*/iu, '');
}

export function similarity(target, heard) {
  const expected = normalizeSpeech(target);
  const spoken = normalizeSpeech(withoutInitialDiscourseNegator(heard));
  if (!expected || !spoken) return 0;
  if (deniesAttempt(spoken.split(' '))) return 0.2;
  if (expected === spoken) return 1;

  const direct = ratio(expected, spoken);
  const expectedTokens = expected.split(' ');
  const spokenTokens = spoken.split(' ');
  if (expectedTokens.length !== 1 || spokenTokens.length < 2) return direct;

  const index = spokenTokens.indexOf(expected);
  if (index < 0) return direct;
  const prefix = spokenTokens.slice(0, index).join(' ');
  const suffix = spokenTokens.slice(index + 1).join(' ');
  if (prefix === 'the word is' && !suffix) return 1;
  // Uma fala contida em uma frase tem o teto de 0,85, mesmo quando o
  // reconhecimento devolve a palavra exata.
  return 0.85;
}

export function starsFromSimilarity(value) {
  const score = Number(value);
  if (!Number.isFinite(score) || score <= 0) return 0;
  if (score >= 0.9) return 3;
  if (score >= 0.6) return 2;
  if (score >= 0.35) return 1;
  return 0;
}

function hasMethod(value, method) {
  try {
    return typeof value?.[method] === 'function';
  } catch {
    return false;
  }
}

function voicesFrom(speech) {
  if (!hasMethod(speech, 'speak') || !hasMethod(speech, 'getVoices')) return [];
  try {
    const voices = speech.getVoices();
    return Array.isArray(voices) ? voices : [];
  } catch {
    return [];
  }
}

function voiceLanguage(voice) {
  return String(voice?.lang || '').replace('_', '-').toLowerCase();
}

function englishVoice(speech) {
  const voices = voicesFrom(speech);
  return voices.find((voice) => voiceLanguage(voice) === 'en-gb')
    || voices.find((voice) => voiceLanguage(voice).startsWith('en'))
    || null;
}

function cleanTranscript(text) {
  return String(text ?? '')
    .replace(/^[\p{P}\p{S}\s]+|[\p{P}\p{S}\s]+$/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function resultTranscript(event) {
  const results = event?.results;
  if (!results || typeof results.length !== 'number') return '';
  for (let index = 0; index < results.length; index += 1) {
    const result = results[index];
    if (result?.isFinal === false) continue;
    const transcript = result?.[0]?.transcript;
    if (transcript) return cleanTranscript(transcript);
  }
  return '';
}

function validRecognizer(recognizer) {
  return recognizer
    && hasMethod(recognizer, 'start')
    && hasMethod(recognizer, 'addEventListener')
    && hasMethod(recognizer, 'removeEventListener');
}

function setButtonSize(button) {
  button.style.minWidth = '44px';
  button.style.minHeight = '44px';
}

function validTarget(target) {
  return Boolean(
    target
    && typeof target === 'object'
    && typeof target.word === 'string'
    && target.word.trim()
    && typeof target.gloss === 'string'
    && target.gloss.trim(),
  );
}

function timeoutDuration(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : DEFAULT_RECOGNITION_TIMEOUT;
}

// Entradas estruturalmente invalidas retornam null antes de criar DOM, ouvir
// uma voz ou consumir a fabrica de Recognition injetada pelo hospedeiro.
export function createListen({
  container,
  lang: language = 'pt',
  target,
  strings,
  onDone,
  onClose,
  reduceMotion,
  speech = globalThis.speechSynthesis,
  createRecognizer,
  recognitionTimeout = DEFAULT_RECOGNITION_TIMEOUT,
  setTimeout: schedule = globalThis.setTimeout,
  clearTimeout: cancel = globalThis.clearTimeout,
  rng,
} = {}) {
  if (!container || typeof container.appendChild !== 'function' || typeof container.removeChild !== 'function') {
    return null;
  }
  if (!validTarget(target)) return null;

  const activeLanguage = languageOrDefault(language);
  const calm = reduceMotion ?? shouldReduceMotion();
  const text = (key) => resolveText(strings, key, activeLanguage);

  function appendFeedbackText(parent, value) {
    if (typeof document.createTextNode === 'function') {
      parent.appendChild(document.createTextNode(String(value)));
      return;
    }
    const span = document.createElement('span');
    span.textContent = String(value);
    parent.appendChild(span);
  }

  function renderFeedback(templateKey, values) {
    const template = String(text(templateKey) ?? '');
    const fragment = typeof document.createDocumentFragment === 'function'
      ? document.createDocumentFragment()
      : document.createElement('span');
    const parts = template.split(/(\{(?:word|gloss|heard)\})/g);
    let renderedText = '';
    for (const part of parts) {
      if (!part) continue;
      const match = part.match(/^\{(word|gloss|heard)\}$/);
      if (!match) {
        renderedText += part;
        appendFeedbackText(fragment, part);
        continue;
      }
      const name = match[1];
      const value = String(values[name] ?? '');
      renderedText += value;
      const element = document.createElement('span');
      // Regra única: conteúdo em inglês é marcado como inglês. A palavra alvo e
      // a fala ouvida são ambas em inglês e precisam de `lang="en"` para a
      // tecnologia assistiva usar a fonética correta, mesmo com a interface em
      // português ou espanhol. Só a glosa traduzida fica no idioma ativo.
      element.setAttribute('lang', name === 'gloss' ? activeLanguage : 'en');
      element.textContent = value;
      fragment.appendChild(element);
    }
    if (typeof feedback.replaceChildren === 'function') {
      feedback.replaceChildren(fragment);
      return;
    }
    const hasNativeTextContent = 'textContent' in Object.getPrototypeOf(feedback);
    feedback.textContent = '';
    feedback.appendChild(fragment);
    // O stub de testes não implementa textContent de forma nativa; manter a
    // leitura textual sem apagar os nós que carregam o idioma da palavra.
    if (!hasNativeTextContent) feedback.textContent = renderedText;
  }

  const glossText = target.gloss;
  const recognitionTimeoutMs = timeoutDuration(recognitionTimeout);
  // setTimeout e clearTimeout formam um par indivisível: um id só pode ser
  // cancelado pelo limpador do mesmo agendador. Se o hospedeiro injetou só um
  // dos dois, o par nativo é usado para os dois. Misturar um agendador injetado
  // com o limpador global deixa um temporizador órfão, e esse temporizador
  // órfão é o que dispara a tentativa fantasma que a rodada 4 viu escapar.
  const nativeSchedule = globalThis.setTimeout;
  const nativeCancel = globalThis.clearTimeout;
  const injectedSchedule = schedule !== nativeSchedule;
  const injectedCancel = cancel !== nativeCancel;
  const useInjectedPair = injectedSchedule && injectedCancel;
  const scheduleTimer = useInjectedPair ? schedule : nativeSchedule;
  const cancelTimer = useInjectedPair ? cancel : nativeCancel;

  function cancelRecognitionTimer(timer) {
    if (timer == null) return;
    try {
      cancelTimer(timer);
    } catch {
      // A limpeza não pode depender de o limpador injetado tolerar falhas.
    }
  }

  let destroyed = false;
  let completed = false;
  let speechStarted = false;
  let attempts = 0;
  let best = 0;
  let bestHeard = '';
  let recognizerUnavailable = typeof createRecognizer !== 'function';
  let nextRecognizer = null;
  let activeRecognizer = null;
  let activeSession = null;
  let recognitionHandlers = null;
  let listening = false;
  let processingResult = false;

  const root = document.createElement('section');
  root.className = `rpg-listen-root${calm ? ' rpg-listen-calm' : ''}`;
  root.setAttribute('role', 'group');
  root.setAttribute('lang', activeLanguage);
  root.setAttribute('aria-label', text('panelTitle'));

  const heading = document.createElement('h3');
  heading.className = 'rpg-listen-title';
  heading.setAttribute('lang', activeLanguage);
  heading.textContent = text('panelTitle');

  const card = document.createElement('div');
  card.className = 'rpg-listen-card';
  card.setAttribute('lang', 'en');

  const word = document.createElement('strong');
  word.className = 'rpg-listen-word';
  word.tabIndex = -1;
  word.textContent = target.word;

  const gloss = document.createElement('p');
  gloss.className = 'rpg-listen-gloss';
  gloss.setAttribute('lang', activeLanguage);
  gloss.textContent = glossText;

  const instructions = document.createElement('p');
  instructions.className = 'rpg-listen-instructions';
  instructions.setAttribute('lang', activeLanguage);
  instructions.textContent = text('instructions');

  const feedback = document.createElement('p');
  feedback.className = 'rpg-listen-feedback';
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  feedback.setAttribute('lang', activeLanguage);

  const audio = document.createElement('button');
  audio.type = 'button';
  audio.className = 'rpg-button rpg-listen-audio';
  audio.setAttribute('lang', activeLanguage);
  audio.textContent = text('listen');
  audio.setAttribute('aria-label', text('listen'));
  setButtonSize(audio);

  const repeat = document.createElement('button');
  repeat.type = 'button';
  repeat.className = 'rpg-button rpg-listen-repeat';
  repeat.setAttribute('lang', activeLanguage);
  repeat.textContent = text('repeat');
  repeat.setAttribute('aria-label', text('repeat'));
  repeat.setAttribute('aria-pressed', 'false');
  setButtonSize(repeat);

  const inputId = `rpg-listen-input-${++listenInputSequence}`;
  const inputLabel = document.createElement('label');
  inputLabel.className = 'rpg-listen-label';
  inputLabel.setAttribute('lang', activeLanguage);
  inputLabel.setAttribute('for', inputId);
  inputLabel.textContent = text('typePlaceholder');
  inputLabel.hidden = true;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'rpg-listen-input';
  input.setAttribute('id', inputId);
  // O campo recebe a palavra inglesa. A orientação traduzida fica no rótulo
  // visível associado, para não ser lida com a fonética do conteúdo inglês.
  input.setAttribute('lang', 'en');
  input.autocomplete = 'off';

  const fallbackNotice = document.createElement('p');
  fallbackNotice.className = 'rpg-listen-fallback-notice';
  fallbackNotice.setAttribute('role', 'note');
  fallbackNotice.setAttribute('lang', activeLanguage);
  fallbackNotice.textContent = text('fallbackNotice');

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'rpg-button rpg-listen-close';
  close.setAttribute('lang', activeLanguage);
  close.textContent = text('close');
  close.setAttribute('aria-label', text('close'));
  setButtonSize(close);

  function voiceAvailable() {
    return Boolean(englishVoice(speech));
  }

  // A instrução precisa descrever a ação que EXISTE na tela, e quem decide o
  // que a criança pode fazer é o CAMPO, não o áudio. `input.hidden` é falso
  // só quando o módulo abriu a digitação (`recognizerUnavailable`), e nesse
  // estado o botão Repetir entrega o texto em vez de abrir o microfone. Ter
  // voz inglesa na máquina não devolve a fala: numa configuração comum (voz TTS
  // instalada, sem SpeechRecognition) mandar falar seria mentira, e o aviso de
  // fallback logo abaixo diria o contrário. Por isso o campo vem primeiro:
  // campo aberto manda escrever, com ou sem áudio; campo fechado com áudio
  // manda ouvir; campo fechado sem áudio manda falar pelo microfone.
  function resolveInstruction() {
    if (input.hidden) return audio.hidden ? text('instructionsSpeak') : text('instructions');
    return text('instructionsType');
  }

  // Não reescreve o DOM quando o texto já é o certo: updateAudioButton roda a
  // cada voiceschanged e setFallback roda nos dois caminhos de abertura. O
  // elemento já existe quando estas funções rodam; só o texto muda.
  function updateInstruction() {
    const next = resolveInstruction();
    if (instructions.textContent === next) return;
    instructions.textContent = next;
  }

  function updateAudioButton() {
    const available = voiceAvailable();
    audio.hidden = !available;
    audio.disabled = !available || destroyed || completed;
    updateInstruction();
  }

  function speak() {
    if (destroyed || completed || !voiceAvailable()) return false;
    const utteranceType = globalThis.SpeechSynthesisUtterance;
    const utterance = typeof utteranceType === 'function' ? new utteranceType(target.word) : { text: target.word };
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    const voice = englishVoice(speech);
    if (voice) utterance.voice = voice;
    try {
      speech.cancel?.();
      speech.speak(utterance);
      speechStarted = true;
      return true;
    } catch {
      return false;
    }
  }

  function setFallback(visible) {
    recognizerUnavailable = visible;
    inputLabel.hidden = !visible;
    input.hidden = !visible;
    fallbackNotice.hidden = !visible;
    if (visible) repeat.disabled = destroyed || completed;
    // Abrir ou fechar o campo muda a ação descrita pela instrução, então ela
    // acompanha a digitação tanto quanto acompanha a voz.
    updateInstruction();
  }

  function isCurrentSession(session) {
    return Boolean(
      !destroyed
      && activeSession
      && activeSession.valid
      && activeSession === session
      && activeRecognizer === session.recognizer,
    );
  }

  function detachRecognition(recognizer, handlers) {
    if (!recognizer || !handlers) return;
    for (const [type, handler] of Object.entries(handlers)) {
      try {
        recognizer.removeEventListener(type, handler);
      } catch {
        // Um Recognition com limpeza defeituosa ainda pode ser descartado.
      }
    }
  }

  function cleanupRecognition(abort = false) {
    const session = activeSession;
    const recognizer = activeRecognizer;
    const handlers = recognitionHandlers;

    // Invalida a sessão antes de abortar: eventos enfileirados pelo navegador
    // serão descartados mesmo que abort() produza onerror e onend síncronos.
    if (session) session.valid = false;
    activeSession = null;
    activeRecognizer = null;
    recognitionHandlers = null;
    listening = false;
    repeat.disabled = destroyed || completed;
    repeat.setAttribute('aria-pressed', 'false');
    if (session?.timer != null) cancelRecognitionTimer(session.timer);
    detachRecognition(recognizer, handlers);
    if (!recognizer) return;
    try {
      if (abort && hasMethod(recognizer, 'abort')) recognizer.abort();
      else if (hasMethod(recognizer, 'stop')) recognizer.stop();
    } catch {
      // A limpeza do minigame não depende do estado interno do navegador.
    }
  }

  function activateFallback() {
    if (destroyed) return;
    cleanupRecognition(true);
    nextRecognizer = null;
    setFallback(true);
    if (!destroyed && !completed) input.focus?.();
  }

  function finish() {
    if (destroyed || completed) return;
    completed = true;
    processingResult = false;
    cleanupRecognition();
    repeat.disabled = true;
    input.disabled = true;
    close.focus?.();
    const stars = starsFromSimilarity(best);
    const result = {
      attempts,
      best,
      stars,
      heard: bestHeard,
      passed: stars >= 1,
    };
    renderFeedback(
      result.passed ? 'success' : 'reveal',
      { word: target.word, gloss: glossText, heard: bestHeard },
    );
    // O cartão verde de `.rpg-listen-celebrating` é o sinal de aprovação da
    // rodada. Sem esta condição ele entrava também na rodada perdida e a criança
    // recebia a animação de festa logo depois de errar três vezes.
    if (result.passed) root.classList.add('rpg-listen-celebrating');
    try {
      if (typeof onDone === 'function') onDone(result);
    } catch {
      // O relatório pertence ao hospedeiro; a criança ainda pode fechar o painel.
    }
  }

  function recordAttempt(rawHeard) {
    if (destroyed || completed || processingResult) return;
    processingResult = true;
    const heard = cleanTranscript(rawHeard);
    const score = similarity(target.word, heard);
    attempts += 1;
    if (score > best || attempts === 1) {
      best = score;
      bestHeard = heard;
    }
    const stars = starsFromSimilarity(score);
    if (stars >= 1 || attempts >= 3) {
      finish();
      return;
    }
    processingResult = false;
    if (heard) renderFeedback('tryAgain', { heard });
    else feedback.textContent = text('notHeard');
    repeat.disabled = false;
    input.disabled = false;
  }

  function handleRecognitionResult(session, event) {
    if (!isCurrentSession(session) || processingResult) return;
    const transcript = resultTranscript(event);
    if (!transcript) return;
    cleanupRecognition();
    recordAttempt(transcript);
  }

  function handleRecognitionError(session, event) {
    if (!isCurrentSession(session)) return;
    const reason = String(event?.error || '');
    const unavailable = ['not-allowed', 'service-not-allowed', 'language-not-supported', 'audio-capture'];
    if (unavailable.includes(reason)) {
      activateFallback();
      return;
    }
    cleanupRecognition();
    // no-speech, aborted e erros de rede contam uma tentativa recuperável;
    // o próximo clique pode tentar novamente sem deixar o painel travado.
    recordAttempt('');
  }

  function handleRecognitionEnd(session) {
    if (!isCurrentSession(session)) return;
    // Sem resultado final, onend encerra esta tentativa vazia. Assim o
    // limite de três continua válido mesmo quando o navegador encerra cedo.
    cleanupRecognition();
    recordAttempt('');
  }

  function attachRecognition(recognizer, session) {
    const handlers = {
      result: (event) => handleRecognitionResult(session, event),
      error: (event) => handleRecognitionError(session, event),
      end: () => handleRecognitionEnd(session),
    };
    recognitionHandlers = handlers;
    for (const [type, handler] of Object.entries(handlers)) {
      recognizer.addEventListener(type, handler);
    }
  }

  function startRecognition() {
    if (destroyed || completed || attempts >= 3) return;
    if (recognizerUnavailable) {
      submitTyped();
      return;
    }
    if (listening) return;
    if (!validRecognizer(nextRecognizer)) {
      try {
        nextRecognizer = createRecognizer();
      } catch {
        nextRecognizer = null;
      }
    }
    if (!validRecognizer(nextRecognizer)) {
      activateFallback();
      return;
    }

    const recognizer = nextRecognizer;
    nextRecognizer = null;
    const session = {
      recognizer,
      valid: true,
      timer: null,
    };
    activeRecognizer = recognizer;
    activeSession = session;
    try {
      recognizer.lang = 'en-GB';
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.maxAlternatives = 1;
      attachRecognition(recognizer, session);
      const timerId = scheduleTimer(() => {
        if (!isCurrentSession(session)) return;
        cleanupRecognition();
        recordAttempt('');
      }, recognitionTimeoutMs);
      // Um agendador injetado pode executar o callback dentro da própria
      // chamada. Nesse caso a sessão já foi invalidada e cleanupRecognition não
      // viu este id, porque session.timer ainda era null. O id devolvido é
      // cancelado aqui e o Recognition não começa depois do fim da sessão.
      if (!session.valid) {
        if (timerId != null) cancelRecognitionTimer(timerId);
        return;
      }
      session.timer = timerId;
      recognizer.start();
      if (!session.valid) return;
      listening = true;
      repeat.disabled = true;
      repeat.setAttribute('aria-pressed', 'true');
      feedback.textContent = text('listening');
    } catch {
      activateFallback();
    }
  }

  function submitTyped() {
    if (destroyed || completed || attempts >= 3) return;
    const value = cleanTranscript(input.value);
    if (!value) {
      feedback.textContent = text('emptyInput');
      input.focus?.();
      return;
    }
    recordAttempt(value);
  }

  if (typeof createRecognizer === 'function') {
    try {
      nextRecognizer = createRecognizer();
    } catch {
      nextRecognizer = null;
    }
    if (!validRecognizer(nextRecognizer)) {
      nextRecognizer = null;
      setFallback(true);
    }
  }
  setFallback(recognizerUnavailable);

  const audioHandler = () => speak();
  const repeatHandler = () => (recognizerUnavailable ? submitTyped() : startRecognition());
  const inputHandler = (event) => {
    if (event?.type === 'keydown' && event.key === 'Enter') submitTyped();
  };
  const closeHandler = () => {
    if (destroyed) return;
    if (typeof onClose === 'function') {
      try {
        onClose();
      } catch {
        // Uma falha do hospedeiro não pode deixar o painel preso no mundo.
        destroy();
      }
      return;
    }
    destroy();
  };
  audio.addEventListener('click', audioHandler);
  repeat.addEventListener('click', repeatHandler);
  input.addEventListener('keydown', inputHandler);
  close.addEventListener('click', closeHandler);

  const listeningForVoices = hasMethod(speech, 'addEventListener');
  const canRemoveVoiceListener = hasMethod(speech, 'removeEventListener');
  const voicesChanged = () => {
    if (!destroyed) updateAudioButton();
  };
  if (listeningForVoices) {
    try {
      speech.addEventListener('voiceschanged', voicesChanged);
    } catch {
      // A audição continua disponivel mesmo sem atualizacao de vozes.
    }
  }

  card.appendChild(word);
  card.appendChild(gloss);
  root.appendChild(heading);
  root.appendChild(instructions);
  root.appendChild(card);
  root.appendChild(audio);
  root.appendChild(fallbackNotice);
  root.appendChild(inputLabel);
  root.appendChild(input);
  root.appendChild(repeat);
  root.appendChild(feedback);
  root.appendChild(close);
  container.appendChild(root);
  updateAudioButton();
  (recognizerUnavailable ? input : word).focus?.();

  function getState() {
    return {
      target: { word: target.word, gloss: glossText },
      attempts,
      best,
      stars: starsFromSimilarity(best),
      heard: bestHeard,
      done: completed,
    };
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    audio.removeEventListener('click', audioHandler);
    repeat.removeEventListener('click', repeatHandler);
    input.removeEventListener('keydown', inputHandler);
    close.removeEventListener('click', closeHandler);
    cleanupRecognition(true);
    nextRecognizer = null;
    if (listeningForVoices && canRemoveVoiceListener) {
      try {
        speech.removeEventListener('voiceschanged', voicesChanged);
      } catch {
        // Uma falha ao remover o listener nao impede a remocao do painel.
      }
    }
    if (speechStarted) {
      try {
        speech?.cancel?.();
      } catch {
        // Uma falha ao cancelar nao deve impedir a remocao do painel.
      }
    }
    try {
      container.removeChild(root);
    } catch {
      // O host pode ter removido o modal inteiro antes de destroy().
    }
  }

  return { destroy, getState, repeat: () => (recognizerUnavailable ? submitTyped() : startRecognition()) };
}
