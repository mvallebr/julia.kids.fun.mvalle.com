// RPG Welling — tela de opções (roadmap 3.5): tamanho do texto + sons do ambiente.
//
// Self-contained de propósito: NÃO importa nada de src/ (nem i18n, nem ui.js),
// porque este módulo precisa funcionar dentro do painel do principal e nos
// testes sem arrastar three.js/audio/main.js. Os textos trilíngues default
// vivem aqui e podem ser sobrescritos via `strings` (mesmo shape { pt, en, es }
// ou uma string já resolvida no idioma ativo).

// Ordem canônica dos níveis: é a ordem em que os botões aparecem no painel
// e a mesma ordem que o CSS de `data-text-scale` no index.html precisa cobrir.
export const TEXT_SCALES = Object.freeze(['normal', 'large', 'xlarge']);

const DEFAULTS = Object.freeze({
  textScale: 'normal',
  ambience: true,
  // som geral e idioma. O de som começa ligado; o idioma começa vazio
  // ('' = seguir o launcher/URL), que é o mesmo default de state.language.
  sound: true,
  language: '',
});

// Textos default: as chaves espelham o que o principal deve adicionar em
// src/i18n.js (ver relatório de integração), mas o painel NÃO depende do
// i18n global — assim ele já funciona antes da integração ficar completa.
const DEFAULT_STRINGS = Object.freeze({
  optionsTitle: { pt: '⚙️ Opções', en: '⚙️ Options', es: '⚙️ Opciones' },
  textSize: { pt: 'Tamanho do texto', en: 'Text size', es: 'Tamaño del texto' },
  textHint: {
    pt: 'Escolha o tamanho das letras do jogo.',
    en: 'Choose how big the letters look.',
    es: 'Elige el tamaño de las letras del juego.',
  },
  textNormal: { pt: 'Normal', en: 'Normal', es: 'Normal' },
  textLarge: { pt: 'Grande', en: 'Large', es: 'Grande' },
  textXlarge: { pt: 'Gigante', en: 'Giant', es: 'Gigante' },
  ambience: { pt: 'Sons do ambiente', en: 'Ambient sounds', es: 'Sonidos del ambiente' },
  ambienceHint: {
    pt: 'Vento, pássaros e o murmúrio da mata e da escola.',
    en: 'Wind, birds and the murmur of the woods and school.',
    es: 'Viento, pájaros y el murmullo del bosque y la escuela.',
  },
  ambienceOn: { pt: '🔊 Ligado', en: '🔊 On', es: '🔊 Activado' },
  ambienceOff: { pt: '🔇 Desligado', en: '🔇 Off', es: '🔇 Apagado' },
  sound: { pt: 'Som do jogo', en: 'Game sound', es: 'Sonido del juego' },
  soundHint: {
    pt: 'Palavras, enigmas e efeitos.',
    en: 'Words, puzzles and effects.',
    es: 'Palabras, puzles y efectos.',
  },
  soundOn: { pt: '🔊 Ligado', en: '🔊 On', es: '🔊 Activado' },
  soundOff: { pt: '🔇 Desligado', en: '🔇 Off', es: '🔇 Apagado' },
  language: { pt: 'Idioma', en: 'Language', es: 'Idioma' },
  languageHint: {
    pt: 'O jogo inteiro muda de idioma, inclusive a lição.',
    en: 'The whole game changes language, the lesson included.',
    es: 'Todo el juego cambia de idioma, incluida la lección.',
  },
  langPt: { pt: 'Português', en: 'Portuguese', es: 'Portugués' },
  langEn: { pt: 'Inglês', en: 'English', es: 'Inglés' },
  langEs: { pt: 'Espanhol', en: 'Spanish', es: 'Español' },
});

// Rótulo amigável por nível (nada de A/AA/AAA, que não significa nada para
// uma criança de 6 anos) + tamanho do preview "Aa" desenhado dentro do
// próprio botão: o comparativo lado a lado vale mais que qualquer descrição.
const LABEL_KEYS = Object.freeze({
  normal: 'textNormal',
  large: 'textLarge',
  xlarge: 'textXlarge',
});
const PREVIEW_SIZES = Object.freeze({ normal: '15px', large: '18px', xlarge: '21px' });

const LANGUAGES = Object.freeze(['pt', 'en', 'es']);

// Um painel por container: um segundo renderOptionsPanel no mesmo .rpg-panel
// destrói o corpo anterior em vez de empilhar seções duplicadas.
const liveBodies = new WeakMap();

function isObject(value) {
  return value !== null && typeof value === 'object';
}

// { pt, en, es } | string → texto no idioma ativo, com fallback pt → en → ''.
function pickText(value, language) {
  if (typeof value === 'string') return value;
  if (isObject(value)) return value[language] ?? value.pt ?? value.en ?? '';
  return '';
}

// Aceita lixo de qualquer tipo (null, strings, números, arrays…) sem lançar:
// o valor vem do localStorage e pode ter sido escrito por uma versão antiga
// ou corrompido. Regras:
//   - textScale: só um valor de TEXT_SCALES é válido; todo o resto → 'normal'.
//   - ambience: só booleano é confiável; todo o resto → true (default ligado).
// Round-trip estável por construção: a saída só contém valores válidos, então
// normalizeSettings(normalizeSettings(x)) é sempre igual a normalizeSettings(x).
export function normalizeSettings(input) {
  const source = isObject(input) ? input : {};
  const textScale = TEXT_SCALES.includes(source.textScale)
    ? source.textScale
    : DEFAULTS.textScale;
  const ambience = typeof source.ambience === 'boolean'
    ? source.ambience
    : DEFAULTS.ambience;
  // som e idioma moram no TOPO do state (state.sound / state.language), não em
  // state.settings — são anteriores ao painel. O painel os trata como mais dois
  // campos da visão e quem mapeia de volta é o main.js; duplicá-los em settings
  // criaria duas fontes de verdade para a mesma preferência.
  const sound = typeof source.sound === 'boolean' ? source.sound : DEFAULTS.sound;
  const language = LANGUAGES.includes(source.language) ? source.language : DEFAULTS.language;
  return { textScale, ambience, sound, language };
}

// Desenha o conteúdo de opções DENTRO de `container` (o principal fornece o
// .rpg-panel do modal; este módulo não cria backdrop nem mexe no HUD).
//
//   renderOptionsPanel({ container, settings, lang, strings?, onChange? })
//
// Estrutura criada:
//   .rpg-options
//     h2.rpg-options-title                    (optionsTitle)
//     section › h3 (textSize) + p + [role=radiogroup] com 3 [role=radio]
//     section › h3 (ambience) + [role=switch] + p (ambienceHint)
//
// Cada mudança chama onChange IMEDIATAMENTE com um partial de uma chave só:
//   onChange({ textScale: 'large' })  |  onChange({ ambience: false })
// O principal aplica, persiste e atualiza data-text-scale / áudio.
//
// Retorna { wrapper, update(nextSettings), destroy() }:
//   - update() sincroniza aria-checked/tabindex sem disparar onChange (para o
//     principal re-sincronizar o painel se o estado mudar por outro caminho);
//   - destroy() remove o corpo e invalida o registro do container.
// Um switch (role="switch") com rótulo, estado visível e dica. Fábrica
// interna porque as duas seções de som são o mesmo controle com texto
// diferente — e porque o teclado é delicado: o handler global do jogo cancela
// o espaço na janela, então o toggle precisa acontecer aqui, uma única vez.
function buildSwitch({ text, id, labelKey, onKey, offKey, hintKey, isOn, onToggle }) {
  const section = document.createElement('section');
  section.className = 'rpg-options-section';

  const heading = document.createElement('h3');
  heading.className = 'rpg-options-heading';
  heading.id = id;
  heading.textContent = text(labelKey);
  section.appendChild(heading);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'rpg-opt-switch';
  button.setAttribute('role', 'switch');
  button.setAttribute('aria-labelledby', heading.id);
  button.style.minWidth = '48px';
  button.style.minHeight = '48px';

  const label = document.createElement('span');
  label.className = 'rpg-opt-switch-label';
  label.textContent = text(labelKey);

  const state = document.createElement('span');
  state.className = 'rpg-opt-switch-state';
  button.appendChild(label);
  button.appendChild(state);

  const apply = (value) => {
    button.setAttribute('aria-checked', value ? 'true' : 'false');
    state.textContent = text(value ? onKey : offKey);
  };
  const toggle = () => { onToggle(!isOn()); apply(isOn()); };
  button.addEventListener('click', toggle);
  button.addEventListener('keydown', (event) => {
    if (event?.key === ' ') {
      event.preventDefault?.();
      event.stopPropagation?.();
      toggle();
    }
    // Enter: clique nativo do <button> alterna — não duplicar aqui.
  });

  const hint = document.createElement('p');
  hint.className = 'rpg-options-hint';
  hint.textContent = text(hintKey);

  section.appendChild(button);
  section.appendChild(hint);
  apply(isOn());
  return { section, apply };
}

export function renderOptionsPanel({ container, settings, lang = 'pt', strings, onChange } = {}) {
  if (!container || typeof container.appendChild !== 'function') {
    throw new TypeError('renderOptionsPanel requires a container element with appendChild');
  }
  const language = LANGUAGES.includes(lang) ? lang : 'pt';
  const overrides = isObject(strings) ? strings : {};
  const notify = typeof onChange === 'function' ? onChange : () => {};

  // `current` é local e mutável: as funções de estado abaixo leem daqui, então
  // update() e os cliques compartilham exatamente a mesma fonte de verdade.
  const current = normalizeSettings(settings);

  // Sobrescrita vazia ('' ou objeto sem o idioma cai no fallback) nunca
  // esvazia um texto: prefere o default embutido a mostrar chave crua.
  const text = (key) => {
    if (key in overrides) {
      const custom = pickText(overrides[key], language);
      if (custom) return custom;
    }
    return pickText(DEFAULT_STRINGS[key], language) || key;
  };

  const previous = liveBodies.get(container);
  if (previous) previous.destroy();

  const wrapper = document.createElement('div');
  wrapper.className = 'rpg-options';

  const title = document.createElement('h2');
  title.className = 'rpg-options-title';
  title.id = 'rpg-options-title';
  title.textContent = text('optionsTitle');
  wrapper.appendChild(title);

  // ── seção 1: tamanho do texto (radiogroup com roving tabindex) ──────────
  const sizeSection = document.createElement('section');
  sizeSection.className = 'rpg-options-section';

  const sizeHeading = document.createElement('h3');
  sizeHeading.className = 'rpg-options-heading';
  sizeHeading.id = 'rpg-options-text-heading';
  sizeHeading.textContent = text('textSize');
  sizeSection.appendChild(sizeHeading);

  const sizeHint = document.createElement('p');
  sizeHint.className = 'rpg-options-hint';
  sizeHint.textContent = text('textHint');
  sizeSection.appendChild(sizeHint);

  const group = document.createElement('div');
  group.className = 'rpg-options-radiogroup';
  group.setAttribute('role', 'radiogroup');
  group.setAttribute('aria-labelledby', sizeHeading.id);

  const radios = TEXT_SCALES.map((value) => {
    const radio = document.createElement('button');
    radio.type = 'button';
    radio.className = 'rpg-opt-radio';
    radio.setAttribute('role', 'radio');
    radio.dataset.scale = value;
    // ≥48px garantidos inline: o CSS do index.html é cortesia estética, mas o
    // alvo de toque é contrato de acessibilidade e não pode depender dele.
    radio.style.minWidth = '48px';
    radio.style.minHeight = '48px';

    const preview = document.createElement('span');
    preview.className = 'rpg-opt-radio-preview';
    preview.setAttribute('aria-hidden', 'true'); // o leitor de tela só precisa do rótulo
    preview.textContent = 'Aa';
    preview.style.fontSize = PREVIEW_SIZES[value];

    const label = document.createElement('span');
    label.className = 'rpg-opt-radio-label';
    label.textContent = text(LABEL_KEYS[value]);

    radio.appendChild(preview);
    radio.appendChild(label);
    group.appendChild(radio);
    return radio;
  });
  sizeSection.appendChild(group);

  let checkedIndex = TEXT_SCALES.indexOf(current.textScale);

  function applyRadioStates() {
    radios.forEach((radio, index) => {
      const checked = index === checkedIndex;
      radio.setAttribute('aria-checked', checked ? 'true' : 'false');
      // roving tabindex: só o rádio marcado entra na ordem de Tab; dentro do
      // grupo quem navega são as setas (padrão WAI-ARIA de radiogroup).
      radio.tabIndex = checked ? 0 : -1;
    });
  }

  function selectScale(index) {
    checkedIndex = ((index % radios.length) + radios.length) % radios.length;
    applyRadioStates();
    // seleção segue o foco: em touch não muda nada, no teclado evita o
    // "foco num rádio e o anúncio de outro" do leitor de tela
    radios[checkedIndex].focus?.();
    notify({ textScale: TEXT_SCALES[checkedIndex] });
  }

  radios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
      // clicar no rádio já marcado não é "mudança": não notifica de novo
      if (checkedIndex !== index) selectScale(index);
    });
    radio.addEventListener('keydown', (event) => {
      const key = event?.key;
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[key];
      if (step !== undefined) {
        event.preventDefault?.();
        event.stopPropagation?.(); // não vaza para as teclas de movimento do jogo
        selectScale(checkedIndex + step);
      } else if (key === 'Home') {
        event.preventDefault?.();
        event.stopPropagation?.();
        selectScale(0);
      } else if (key === 'End') {
        event.preventDefault?.();
        event.stopPropagation?.();
        selectScale(radios.length - 1);
      } else if (key === ' ') {
        // o handler global de teclado do jogo faz preventDefault do espaço na
        // janela, o que cancela o clique nativo do botão; selecionar aqui
        // devolve o atalho sem risco de toggle duplo (o clique nativo morre).
        event.preventDefault?.();
        event.stopPropagation?.();
        selectScale(index);
      }
      // Enter não é tratado aqui: o clique nativo do <button> já seleciona e
      // o jogo não cancela Enter no handler global.
    });
  });

  // ── seções 2 e 3: dois sons ───────────────────────────────────────────────
  const ambience = buildSwitch({
    text, id: 'rpg-options-ambience-heading',
    labelKey: 'ambience', onKey: 'ambienceOn', offKey: 'ambienceOff', hintKey: 'ambienceHint',
    isOn: () => current.ambience,
    onToggle: (value) => { current.ambience = value; notify({ ambience: value }); },
  });
  const sound = buildSwitch({
    text, id: 'rpg-options-sound-heading',
    labelKey: 'sound', onKey: 'soundOn', offKey: 'soundOff', hintKey: 'soundHint',
    isOn: () => current.sound,
    onToggle: (value) => { current.sound = value; notify({ sound: value }); },
  });

  // ── seção 4: idioma (radiogroup) ──────────────────────────────────────────
  const languageSection = document.createElement('section');
  languageSection.className = 'rpg-options-section';

  const languageHeading = document.createElement('h3');
  languageHeading.className = 'rpg-options-heading';
  languageHeading.id = 'rpg-options-language-heading';
  languageHeading.textContent = text('language');
  languageSection.appendChild(languageHeading);

  const languageHint = document.createElement('p');
  languageHint.className = 'rpg-options-hint';
  languageHint.textContent = text('languageHint');
  languageSection.appendChild(languageHint);

  const languageGroup = document.createElement('div');
  languageGroup.className = 'rpg-options-radiogroup';
  languageGroup.setAttribute('role', 'radiogroup');
  languageGroup.setAttribute('aria-labelledby', languageHeading.id);

  const LANG_KEYS = { pt: 'langPt', en: 'langEn', es: 'langEs' };
  const langRadios = LANGUAGES.map((value) => {
    const radio = document.createElement('button');
    radio.type = 'button';
    radio.className = 'rpg-opt-radio';
    radio.setAttribute('role', 'radio');
    radio.dataset.lang = value;
    radio.style.minWidth = '48px';
    radio.style.minHeight = '48px';
    const label = document.createElement('span');
    label.className = 'rpg-opt-radio-label';
    // mostra o nome do idioma no PRÓPRIO idioma: quem não lê português ainda
    // reconhece "English" e "Español" na primeira tela
    label.textContent = DEFAULT_STRINGS[LANG_KEYS[value]][value];
    radio.appendChild(label);
    languageGroup.appendChild(radio);
    return radio;
  });
  languageSection.appendChild(languageGroup);

  let langIndex = LANGUAGES.indexOf(current.language);

  function applyLangStates() {
    langRadios.forEach((radio, index) => {
      const checked = index === langIndex;
      radio.setAttribute('aria-checked', checked ? 'true' : 'false');
      radio.tabIndex = checked ? 0 : -1;
    });
  }

  function selectLang(index) {
    langIndex = ((index % langRadios.length) + langRadios.length) % langRadios.length;
    applyLangStates();
    langRadios[langIndex].focus?.();
    notify({ language: LANGUAGES[langIndex] });
  }

  langRadios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
      if (langIndex !== index) selectLang(index);
    });
    radio.addEventListener('keydown', (event) => {
      const key = event?.key;
      const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[key];
      if (step !== undefined) {
        event.preventDefault?.();
        event.stopPropagation?.();
        selectLang(langIndex + step);
      } else if (key === ' ') {
        event.preventDefault?.();
        event.stopPropagation?.();
        selectLang(index);
      }
    });
  });

  wrapper.appendChild(sizeSection);
  wrapper.appendChild(ambience.section);
  wrapper.appendChild(sound.section);
  wrapper.appendChild(languageSection);
  container.appendChild(wrapper);

  applyRadioStates();
  applyLangStates();

  const api = {
    wrapper,
    update(nextSettings) {
      const next = normalizeSettings(nextSettings);
      checkedIndex = TEXT_SCALES.indexOf(next.textScale);
      current.ambience = next.ambience;
      current.sound = next.sound;
      current.language = next.language;
      langIndex = LANGUAGES.indexOf(next.language);
      applyRadioStates();
      ambience.apply(current.ambience);
      sound.apply(current.sound);
      applyLangStates();
    },
    destroy() {
      if (typeof wrapper.remove === 'function') wrapper.remove();
      if (liveBodies.get(container) === api) liveBodies.delete(container);
    },
  };
  liveBodies.set(container, api);
  return api;
}
