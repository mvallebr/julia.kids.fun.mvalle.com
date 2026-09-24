// RPG Welling — Ditado de campo (roadmap 2.3): três frases curtas escondidas
// no mundo. Ao tocar no ponto (placa da trilha, caixa de correio, placa do
// "castelo"), abre o desafio: mostra o SENTIDO em português/espanhol e a
// criança DIGITA a frase em inglês.
//
// Aprender > punir (spec da rodada): 3 tentativas gentis; após a 2ª falha
// aparece a dica com a primeira letra de cada palavra; após a 3ª a frase é
// revelada para copiar e o desafio conta como concluído com helped: true.
//
// Este módulo é autocontido de propósito: a lógica pura (normalização,
// checagem, tentativas) não toca em DOM, e o render só usa
// document.createElement/addEventListener — nada de main.js ou three. Assim
// os testes rodam com o stub de DOM (test/helpers/dom-stub.js) e o host
// (main.js) só precisa de um container para montar o modal.
//
// Uso pelo host:
//   import { createDictation, DICTATION_PHRASES } from './games/dictation.js';
//   const ui = createDictation({
//     container: painelDoModal,
//     phrase: DICTATION_PHRASES[0],
//     lang: state.language || 'pt',
//     onSubmit: ({ result }) => result.ok && playHappySound(),
//     onDone: ({ phraseId, helped, attempts }) => { /* flag + recompensa */ },
//   });
//   // ao fechar o modal: ui.destroy();

// Política de tentativas: exatamente 3 por frase — poucas para não virar
// punição, suficientes para a criança tentar de verdade antes da dica.
export const MAX_ATTEMPTS = 3;

const APOSTROPHES = /[\u2018\u2019\u201A\u201B\u02BC`\u00B4]/g;
const DASHES = /[-\u2012\u2013\u2014\u2015]/g;

// Normaliza a resposta para comparar de forma gentil com uma criança de 6-8
// anos digitando num teclado virtual: caixa, espaços múltiplos, apóstrofos
// tipográficos (’), hífens e pontuação (final ou no meio, como vírgulas)
// deixam de importar — o que vale é a palavra em si.
export function normalizeAnswer(value) {
  if (typeof value !== 'string') return '';
  let text = value.toLowerCase().replace(APOSTROPHES, "'");
  // o hífen vira espaço ("well-known" = "well known") ANTES de tirar o resto
  // da pontuação — juntar as palavras ("wellknown") exigiria acertar o traço,
  // o que seria injusto no teclado virtual
  text = text.replace(DASHES, ' ');
  // \p{L}/\p{N} mantém letras/números de qualquer alfabeto e o apóstrofo reto
  // (it's); toda a pontuação restante sai (ponto final, vírgulas, aspas…)
  text = text.replace(/[^\p{L}\p{N}'\s]/gu, '');
  return text.replace(/\s+/g, ' ').trim();
}

// Um "deslize" = 1 edição numa palavra: trocar 1 letra, acrescentar 1, tirar 1
// OU inverter duas vizinhas (Damerau/OSA). A inversão entra porque dislexia e
// teclado virtual trocam letras de lugar o tempo todo ("quiet" → "quite") e o
// Levenshtein puro contaria isso como 2 — passando do teto de 1 deslize.
// Com teto em 1, paramos cedo: frases curtas, criança no tablet.
function withinOneSlide(a, b) {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let previousOfPrevious = null;
  let previous = [];
  for (let j = 0; j <= lb; j += 1) previous.push(j);
  for (let i = 1; i <= la; i += 1) {
    const current = [i];
    let rowMinimum = i;
    for (let j = 1; j <= lb; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let best = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      // transposição de vizinhas: a última letra de a casa com a penúltima de b
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        best = Math.min(best, previousOfPrevious[j - 2] + 1);
      }
      current.push(best);
      if (best < rowMinimum) rowMinimum = best;
    }
    if (rowMinimum > 1) return false; // já passou de 1 edição — nem continua
    previousOfPrevious = previous;
    previous = current;
  }
  return previous[lb] <= 1;
}

// checkAnswer(given, expected) → { ok, close }
//   ok    = idênticas depois de normalizar (a resposta exata);
//   close = não acertou, mas houve EXATAMENTE 1 deslize em UMA palavra —
//           regra gentil para dislexia/teclado virtual. Frase de 1 palavra
//           funciona pela mesma regra (a palavra única é a "uma palavra").
//   Palavras a mais ou a menos já não é deslize: muda a frase, não a letra.
export function checkAnswer(given, expected) {
  const normalizedGiven = normalizeAnswer(given);
  const normalizedExpected = normalizeAnswer(expected);
  if (!normalizedGiven || !normalizedExpected) return { ok: false, close: false };
  if (normalizedGiven === normalizedExpected) return { ok: true, close: false };

  const givenWords = normalizedGiven.split(' ');
  const expectedWords = normalizedExpected.split(' ');
  if (givenWords.length !== expectedWords.length) return { ok: false, close: false };

  let slips = 0;
  for (let i = 0; i < expectedWords.length; i += 1) {
    if (givenWords[i] === expectedWords[i]) continue;
    slips += 1;
    if (slips > 1 || !withinOneSlide(givenWords[i], expectedWords[i])) {
      return { ok: false, close: false };
    }
  }
  // slips === 0 com strings diferentes é impossível (mesmas palavras
  // normalizadas), então aqui sobra exatamente 1 deslize.
  return { ok: false, close: slips === 1 };
}

// Dica da coruja: a primeira letra de cada palavra, em caixa alta, separada
// por pontos — "The woods are quiet." → "T · W · A · Q". Não entrega a frase,
// só cutuca (spec §17: dica nunca entrega a resposta).
export function hintFor(sentence) {
  const words = normalizeAnswer(sentence).split(' ').filter(Boolean);
  return words.map((word) => (word[0] || '').toUpperCase()).join(' · ');
}

// Estado das tentativas (puro, sem DOM): política de 3 tentativas.
// record(true)  → encerra com helped: false (a criança conseguiu sozinha);
// record(false) → 1ª falha: só "quase"; 2ª: libera a dica; 3ª: revela a frase
//                 e encerra com helped: true. Depois de encerrado, record é
//                 idempotente (repetir submit não mexe na contagem).
export function createAttempts({ max = MAX_ATTEMPTS } = {}) {
  const limit = Math.max(1, Math.floor(Number(max) || MAX_ATTEMPTS));
  let used = 0;
  let settled = false;
  let last = null;
  return {
    get used() { return used; },
    get left() { return Math.max(0, limit - used); },
    get settled() { return settled; },
    record(correct) {
      if (settled) return last;
      used += 1;
      if (correct) {
        settled = true;
        last = { done: true, helped: false, attempts: used, hint: false, reveal: false, correct: true };
        return last;
      }
      if (used >= limit) {
        settled = true;
        last = { done: true, helped: true, attempts: used, hint: false, reveal: true, correct: false };
        return last;
      }
      last = { done: false, helped: false, attempts: used, hint: used >= limit - 1, reveal: false, correct: false };
      return last;
    },
  };
}

// Textos trilingues default embutidos. A chave `close` é o elogio para quem
// passou pertinho (1 deslize); `done` é a mensagem de conclusão com ajuda.
const DEFAULT_STRINGS = {
  pt: {
    title: '✏️ Ditado escondido',
    promptLabel: 'Digite a frase em inglês:',
    check: 'Verificar',
    close: 'Muito perto! Só uma letrinha escapou. 🔍',
    almost: 'Quase! Respire fundo e tenta de novo. 🌟',
    correct: 'Isso! Você escreveu em inglês! 🎉',
    hint: 'Dica: {hint}',
    hintButton: 'Ver dica',
    reveal: 'Era assim (pode copiar!):',
    revealButton: 'Mostrar resposta',
    done: 'Agora a frase é sua! 🌟',
    starsAria: 'Estrelas de tentativa: {n}',
  },
  en: {
    title: '✏️ Hidden dictation',
    promptLabel: 'Type the sentence in English:',
    check: 'Check',
    close: 'So close! Just one letter slipped away. 🔍',
    almost: 'Almost! Take a breath and try again. 🌟',
    correct: 'Yes! You wrote it in English! 🎉',
    hint: 'Hint: {hint}',
    hintButton: 'Show hint',
    reveal: 'It was this (you can copy it!):',
    revealButton: 'Show answer',
    done: 'Now the sentence is yours! 🌟',
    starsAria: 'Try stars left: {n}',
  },
  es: {
    title: '✏️ Dictado escondido',
    promptLabel: 'Escribe la frase en inglés:',
    check: 'Comprobar',
    close: '¡Casi! Solo se escapó una letrita. 🔍',
    almost: '¡Casi! Respira hondo e inténtalo otra vez. 🌟',
    correct: '¡Eso! ¡Lo escribiste en inglés! 🎉',
    hint: 'Pista: {hint}',
    hintButton: 'Ver pista',
    reveal: 'Era así (puedes copiarlo):',
    revealButton: 'Mostrar respuesta',
    done: '¡La frase ya es tuya! 🌟',
    starsAria: 'Estrellas de intento: {n}',
  },
};

// strings pode ser um mapa plano (overrides do idioma ativo) ou por idioma
// ({ pt: {...}, es: {...} }) — se tiver a chave do idioma, vale o submapa.
function resolveStrings(lang, strings) {
  const base = DEFAULT_STRINGS[lang] || DEFAULT_STRINGS.pt;
  if (!strings || typeof strings !== 'object') return { ...base };
  const perLang = strings[lang];
  const overrides = perLang && typeof perLang === 'object' && !Array.isArray(perLang)
    ? perLang
    : strings;
  return { ...base, ...overrides };
}

// Frases do mundo (3-5 palavras, palavras do Diário/GLOSSES sempre que
// possível — só sobram artigos e "are/i/a", que não são conteúdo):
//   1) placa do Green Chain Walk na mata (FLAVOR.greenChain);
//   2) caixa de correio da High Street — a carta da história! (FLAVOR.postOffice);
//   3) o "castelo" de Severndroog no fim da trilha (FLAVOR.severndroog).
// `journal` = palavra-chave que o host pode brindar no Diário de Palavras
// (todas já existem em GLOSSES em src/content.js).
export const DICTATION_PHRASES = [
  { id: 'dictWoods', en: 'The woods are quiet.', pt: 'A mata é quieta.', es: 'El bosque está callado.', journal: 'woods' },
  { id: 'dictLetter', en: 'I write a letter.', pt: 'Eu escrevo uma carta.', es: 'Escribo una carta.', journal: 'letter' },
  { id: 'dictCastle', en: 'The castle is tall.', pt: 'O castelo é alto.', es: 'El castillo es alto.', journal: 'castle' },
];

// Sugestão de encaixe no mundo: frase → flag do save (state.flags).
// O host marca flags.dictation1/2/3 = true no onDone e oferece a próxima.
export const DICTATION_FLAGS = {
  dictWoods: 'dictation1',
  dictLetter: 'dictation2',
  dictCastle: 'dictation3',
};

// Render do desafio (DOM, mas sem tocar em main.js/three). Cria a seção dentro
// de `container` e devolve { root, input, feedback, hintButton, revealButton,
// destroy }. Enter no campo envia; feedback fala por aria-live="polite"; o
// contador de tentativas é um rim de ⭐ (nunca a palavra "erro").
export function createDictation({ container, phrase, lang = 'pt', strings, onSubmit, onDone } = {}) {
  if (!container || typeof container.appendChild !== 'function') {
    throw new TypeError('createDictation: container precisa ser um elemento com appendChild');
  }
  if (!phrase || typeof phrase.en !== 'string' || !phrase.en.trim()) {
    throw new TypeError('createDictation: phrase precisa da frase em inglês (phrase.en)');
  }

  const ui = resolveStrings(lang, strings);
  const tracker = createAttempts();
  let destroyed = false;
  let settled = false; // vira true quando onDone já disparou (acerto ou revelação)

  const root = document.createElement('section');
  root.className = 'rpg-dictation';
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', ui.title);

  const title = document.createElement('h3');
  title.className = 'rpg-dictation-title';
  title.textContent = ui.title;

  // O sentido aparece na língua de apoio — NUNCA em inglês, senão a resposta
  // estaria escrita na tela (a resposta é exatamente o que se digita).
  const promptLang = lang === 'es' ? 'es' : 'pt';
  const prompt = document.createElement('p');
  prompt.className = 'rpg-dictation-prompt';
  prompt.setAttribute('lang', promptLang);
  prompt.textContent = phrase[promptLang] || phrase.pt || phrase.en;

  const stars = document.createElement('p');
  stars.className = 'rpg-dictation-stars';

  const inputId = `rpg-dictation-${phrase.id || 'input'}`;
  const label = document.createElement('label');
  label.className = 'rpg-dictation-label';
  label.setAttribute('for', inputId);
  label.textContent = ui.promptLabel;

  const input = document.createElement('input');
  input.className = 'rpg-dictation-input';
  input.id = inputId;
  input.type = 'text';
  // Teclado de criança no tablet: sem autocomplete, sem maiúscula automática e
  // a tecla Enter do teclado virtual já envia (enterkeyhint="done").
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autocapitalize', 'none');
  input.setAttribute('autocorrect', 'off');
  input.setAttribute('spellcheck', 'false');
  input.setAttribute('enterkeyhint', 'done');

  const feedback = document.createElement('p');
  feedback.className = 'rpg-dictation-feedback';
  // aria-live narra "quase/acertou/dica" sem roubar o foco do campo.
  feedback.setAttribute('aria-live', 'polite');

  const revealBox = document.createElement('p');
  revealBox.className = 'rpg-dictation-reveal';
  revealBox.hidden = true;

  const buttons = document.createElement('div');
  buttons.className = 'rpg-dictation-buttons';
  const makeButton = (text, variant) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `rpg-button ${variant} rpg-dictation-button`;
    button.textContent = text;
    return button;
  };
  const checkButton = makeButton(ui.check, 'primary');
  const hintButton = makeButton(ui.hintButton, 'ghost');
  const revealButton = makeButton(ui.revealButton, 'ghost');
  hintButton.hidden = true; // só aparece após a 2ª falha
  revealButton.hidden = true; // só aparece após a 3ª falha (com a frase revelada)
  buttons.appendChild(checkButton);
  buttons.appendChild(hintButton);
  buttons.appendChild(revealButton);

  root.appendChild(title);
  root.appendChild(prompt);
  root.appendChild(stars);
  root.appendChild(label);
  root.appendChild(input);
  root.appendChild(feedback);
  root.appendChild(revealBox);
  root.appendChild(buttons);
  container.appendChild(root);

  const setFeedback = (message, tone) => {
    feedback.textContent = message;
    feedback.className = `rpg-dictation-feedback${tone ? ` ${tone}` : ''}`;
  };

  const renderStars = (left) => {
    const safeLeft = Math.max(0, left);
    stars.textContent = '⭐'.repeat(safeLeft);
    stars.setAttribute('aria-label', ui.starsAria.replace('{n}', String(safeLeft)));
  };
  renderStars(tracker.left);

  function finish(outcome) {
    settled = true;
    if (outcome.helped) {
      // Com ajuda o campo continua ligado: copiar a frase e mandar ver rende
      // a festa do "correto" — aprender é a meta, não o placar.
      hintButton.hidden = true;
      revealButton.hidden = false;
      renderStars(0);
      return;
    }
    input.disabled = true;
    checkButton.disabled = true;
    hintButton.hidden = true;
    revealButton.hidden = true;
    stars.textContent = '🎉';
    stars.setAttribute('aria-label', ui.starsAria.replace('{n}', '0'));
  }

  function handleCheck() {
    if (destroyed) return;
    const given = input.value;
    // Enter acidental com o campo vazio não pode custar uma tentativa
    // (revelação após 3 toques = punição por algo que a criança não digitou)
    if (!given.trim()) return;
    const result = checkAnswer(given, phrase.en);
    // O host acompanha cada tentativa (sons, estatística) sem virar dono do fluxo.
    if (typeof onSubmit === 'function') onSubmit({ phraseId: phrase.id, given, result });

    if (settled) {
      // Depois de revelado, acertar de novo só merece elogio (sem mexer na contagem).
      if (result.ok) setFeedback(ui.correct, 'good');
      return;
    }

    if (result.ok) {
      const outcome = tracker.record(true);
      finish(outcome);
      setFeedback(ui.correct, 'good');
      if (typeof onDone === 'function') onDone({ phraseId: phrase.id, helped: false, attempts: outcome.attempts });
      return;
    }

    const outcome = tracker.record(false);
    if (outcome.done) {
      // Aprendeu > puniu: na 3ª falha a frase aparece para copiar e o desafio
      // já conta como concluído (helped: true).
      finish(outcome);
      revealBox.textContent = `${ui.reveal} ${phrase.en}`;
      revealBox.hidden = false;
      setFeedback(ui.done, 'good');
      if (typeof onDone === 'function') onDone({ phraseId: phrase.id, helped: true, attempts: outcome.attempts });
      return;
    }

    renderStars(tracker.left);
    if (outcome.hint) hintButton.hidden = false; // 2ª falha libera o botão da dica
    setFeedback(result.close ? ui.close : ui.almost, 'bad');
  }

  const onInputKey = (event) => {
    if (event && event.key === 'Enter') {
      if (typeof event.preventDefault === 'function') event.preventDefault();
      handleCheck();
    }
  };
  const onCheckClick = () => handleCheck();
  const onHintClick = () => {
    if (destroyed) return;
    // A dica não gasta estrela: reler as letras faz parte de aprender.
    setFeedback(ui.hint.replace('{hint}', hintFor(phrase.en)), 'info');
  };
  const onRevealClick = () => {
    if (destroyed) return;
    revealBox.textContent = `${ui.reveal} ${phrase.en}`;
    revealBox.hidden = false;
  };

  input.addEventListener('keydown', onInputKey);
  checkButton.addEventListener('click', onCheckClick);
  hintButton.addEventListener('click', onHintClick);
  revealButton.addEventListener('click', onRevealClick);

  // Foco no campo abre o teclado virtual do tablet na hora (o stub de teste
  // não tem focus — por isso o guard).
  if (typeof input.focus === 'function') input.focus();

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    input.removeEventListener('keydown', onInputKey);
    checkButton.removeEventListener('click', onCheckClick);
    hintButton.removeEventListener('click', onHintClick);
    revealButton.removeEventListener('click', onRevealClick);
    if (typeof root.remove === 'function') root.remove();
    else if (typeof container.removeChild === 'function') container.removeChild(root);
  }

  return { root, input, feedback, hintButton, revealButton, destroy };
}
