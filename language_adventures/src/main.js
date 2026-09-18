// Language Adventures — engine principal (spec §3/§4/§7/§8/§13/§14).
// Entrada → seleção de idioma → caminho de lições → atividades → histórias
// com pronúncia opcional → recompensas → monstro companheiro.

import { el, clearContainer, burstAt, toast, confetti } from './ui.js';
import { ensureAudio, sounds, speak, setMuted, warmVoices } from './audio.js';
import { speechSupported, gradePronunciation, listenOnce, normalize } from './speech.js';
import { uiText, lang } from './i18n.js';
import { ensureStyles } from './styles.js';
import { loadState, saveState, completeLesson, totalStars, COSMETICS } from './state.js';
import { PACKS, packById, flattenLessons } from './packs/index.js';
import { monsterSVG } from './monster.js';

const root = document.getElementById('la');
const query = new URLSearchParams(location.search);
const launcherConfig = query.get('from') === 'launcher' ? query : null;

let player = (launcherConfig?.get('name') || '').trim() || 'student';
let language = (launcherConfig?.get('language') || 'pt').slice(0, 2);
let state = loadState(localStorage, player);
setMuted(!state.sound);
let screen = null;

function setState(mutate) {
  mutate(state);
  saveState(localStorage, player, state);
}

function swap(render) {
  clearContainer(root);
  screen?.destroy?.();
  screen = render() || null;
}

function exitToLauncher() {
  try { window.speechSynthesis?.cancel(); } catch { /* nada */ }
  location.href = '../index.html';
}

function currentPack() {
  return packById(state.targetLanguage) || null;
}

function hud(extraChips = []) {
  const hud = el('div', 'la-hud');
  const backChip = el('button', 'la-chip clickable', '⬅️');
  backChip.type = 'button';
  backChip.addEventListener('click', () => { sounds.tap(); exitToLauncher(); });
  hud.appendChild(backChip);
  for (const chip of extraChips) hud.appendChild(chip);
  const soundChip = el('button', 'la-chip clickable', state.sound ? '🔊' : '🔇');
  soundChip.type = 'button';
  soundChip.title = uiText(language, 'muteTitle');
  soundChip.addEventListener('click', () => {
    const next = !state.sound;
    setState((draft) => { draft.sound = next; });
    setMuted(!next);
    soundChip.textContent = next ? '🔊' : '🔇';
    sounds.tap();
  });
  hud.appendChild(soundChip);
  return hud;
}

// ── entrada: seleção do idioma-alvo (spec §3) ───────────────────────────────
function renderEntry() {
  swap(() => {
    const screenEl = el('div', 'la-screen');
    const scroll = el('div', 'la-scroll');
    scroll.style.display = 'grid';
    scroll.style.placeItems = 'center';
    screenEl.appendChild(scroll);

    const panel = el('div', 'la-panel');
    panel.style.width = 'min(680px, 94vw)';
    panel.appendChild(el('div', 'la-title', uiText(language, 'title')));
    panel.appendChild(el('div', 'la-status', uiText(language, 'entryPrompt')));

    const grid = el('div', 'la-lang-grid');
    for (const pack of PACKS) {
      const card = el('button', 'la-lang-card');
      card.type = 'button';
      card.appendChild(el('span', 'la-lang-flag', pack.flag));
      card.appendChild(el('span', 'la-lang-name', pack.name));
      card.appendChild(el('span', 'la-lang-sample', pack.sample));
      card.addEventListener('click', () => {
        sounds.fanfare();
        setState((draft) => { draft.targetLanguage = pack.id; });
        renderPath();
      });
      grid.appendChild(card);
    }
    panel.appendChild(grid);

    const exit = el('button', 'la-btn ghost', uiText(language, 'exitToLauncher'));
    exit.type = 'button';
    exit.style.marginTop = '4px';
    exit.addEventListener('click', exitToLauncher);
    panel.appendChild(exit);

    scroll.appendChild(panel);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── caminho de lições (spec §4/§5) ──────────────────────────────────────────
function renderPath() {
  const pack = currentPack();
  if (!pack) { renderEntry(); return; }
  warmVoices(pack.locale);

  swap(() => {
    const screenEl = el('div', 'la-screen');
    const scroll = el('div', 'la-scroll');
    screenEl.appendChild(scroll);
    scroll.appendChild(hud([
      el('span', 'la-chip', `${pack.flag} ${pack.name}`),
      el('span', 'la-chip', `⭐ ${totalStars(state)}`),
    ]));

    const wrap = el('div', 'la-path-wrap');
    wrap.style.padding = '76px 16px 30px';
    wrap.style.maxWidth = '560px';
    wrap.style.margin = '0 auto';

    const lessons = flattenLessons(pack);
    let lastSectionId = null;
    let unlockedBroken = false;

    lessons.forEach(({ section, lesson }, index) => {
      if (section.id !== lastSectionId) {
        lastSectionId = section.id;
        const head = el('div', 'la-section-head', lang(section.name, language));
        head.style.background = section.color;
        wrap.appendChild(head);
      }
      const stars = state.stars[lesson.id] || 0;
      const done = state.completedLessons.includes(lesson.id);
      const unlocked = index === 0 || state.completedLessons.includes(lessons[index - 1].lesson.id);
      if (!unlocked) unlockedBroken = true;

      const row = el('div', 'la-node-row' + (index === lessons.length - 1 ? ' last' : ''));
      row.style.setProperty('--line-color', index === 0 ? 'transparent' : `${section.color}55`);

      const node = el('button', 'la-node');
      node.type = 'button';
      const icon = lesson.kind === 'story' ? '📖' : lesson.kind === 'challenge' ? '🏆' : lesson.kind === 'pronunciation' ? '🎤' : '★';
      const circle = el('span', `la-node-circle${done ? ' done' : ''}${unlocked ? '' : ' locked'}`,
        unlocked ? icon : '🔒');
      circle.style.setProperty('--node-color', section.color);
      circle.style.setProperty('--node-shadow', shade(section.color, -28));
      node.appendChild(circle);
      node.appendChild(el('span', 'la-node-label', lang(lesson.title, language)));
      node.appendChild(el('span', 'la-node-stars', stars ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : (unlocked ? '▶' : '')));
      node.addEventListener('click', () => {
        if (!unlocked) { sounds.wrong(); toast(uiText(language, 'locked'), 'retry'); return; }
        sounds.tap();
        openLesson(section, lesson, index);
      });
      row.appendChild(node);
      wrap.appendChild(row);
    });
    void unlockedBroken;

    // monstro acompanha no rodapé do caminho
    const monsterBox = el('div', 'la-monster-box');
    monsterBox.innerHTML = monsterSVG(state.equippedCosmetics, 'happy', 120);
    wrap.appendChild(monsterBox);

    scroll.appendChild(wrap);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };
  });
}

// clareia/escurece uma cor hex
function shade(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// ── runner de lição (activities + história + pronúncia, spec §7/§8/§11) ────
function openLesson(section, lesson) {
  swap(() => {
    const screenEl = el('div', 'la-screen');
    const scroll = el('div', 'la-scroll');
    screenEl.appendChild(scroll);
    scroll.style.display = 'grid';
    scroll.style.placeItems = 'center';

    const panel = el('div', 'la-panel');
    panel.style.width = 'min(620px, 94vw)';
    panel.appendChild(el('div', 'la-status', uiText(language, 'lesson') + ' · ' + lang(lesson.title, language)));
    const body = el('div', 'la-body');
    body.style.display = 'flex';
    body.style.flexDirection = 'column';
    body.style.alignItems = 'center';
    body.style.gap = '14px';
    panel.appendChild(body);
    scroll.appendChild(panel);
    screenEl.appendChild(scroll);

    const pack = currentPack();
    const starsPerActivity = 3;
    let activityIndex = 0;
    let correctCount = 0;
    let totalGraded = 0;

    root.appendChild(screenEl);

    function mountStory() {
      body.innerHTML = '';
      const story = lesson;
      body.appendChild(el('div', 'la-title', `📖 ${lang(story.title, language)}`));
      const linesBox = el('div', 'la-story-lines');
      for (const line of story.lines) {
        const html = line[language] || line.pt;
        const p = el('p', 'la-story-line');
        p.innerHTML = html.replaceAll(/\*\*(.+?)\*\*/g, '<b>$1</b>');
        linesBox.appendChild(p);
      }
      body.appendChild(linesBox);

      // palavra nova de hoje (spec §7)
      const word = story.word;
      const card = el('div', 'la-newword');
      card.appendChild(el('small', null, uiText(language, 'newWord')));
      card.appendChild(el('span', 'word', word.target));
      card.appendChild(el('span', 'la-gloss', lang(word.gloss, language)));
      body.appendChild(card);

      const btnRow = el('div', 'la-controls');
      btnRow.style.display = 'flex';
      btnRow.style.gap = '10px';
      btnRow.style.flexWrap = 'wrap';
      btnRow.style.justifyContent = 'center';

      const hearBtn = el('button', 'la-btn', uiText(language, 'listen'));
      hearBtn.type = 'button';
      hearBtn.addEventListener('click', () => speak(word.phrase, pack.locale));
      btnRow.appendChild(hearBtn);

      if (speechSupported()) {
        const micBtn = el('button', 'la-mic', uiText(language, 'trySaying'));
        micBtn.type = 'button';
        micBtn.addEventListener('click', () => {
          if (micBtn.classList.contains('recording')) return;
          micBtn.classList.add('recording');
          micBtn.textContent = uiText(language, 'listening');
          speak(word.phrase, pack.locale);
          setTimeout(() => {
            const stop = listenOnce(pack.locale, ({ transcript, error }) => {
              micBtn.classList.remove('recording');
              micBtn.textContent = uiText(language, 'trySaying');
              const grade = error === 'no-speech' ? 'yellow' : gradePronunciation(transcript, word.phrase);
              showFeedback(grade);
            });
            // corta em 6s para não ficar preso
            setTimeout(() => stop(), 6000);
          }, 900);
        });
        btnRow.appendChild(micBtn);
      }

      const skipBtn = el('button', 'la-btn ghost', uiText(language, 'skip'));
      skipBtn.type = 'button';
      skipBtn.addEventListener('click', () => { sounds.tap(); activityIndex += 1; mountNext(); });
      btnRow.appendChild(skipBtn);

      const feedback = el('div', 'la-feedback');
      function showFeedback(grade) {
        feedback.className = `la-feedback ${grade}`;
        feedback.textContent = uiText(language, grade);
        if (grade === 'green') { sounds.correct(); burstAt(card, 18); }
        else if (grade === 'yellow') sounds.pop?.();
        else sounds.wrong();
        setTimeout(() => { activityIndex += 1; mountNext(); }, 1400);
      }
      body.appendChild(feedback);
      body.appendChild(btnRow);
    }

    function mountPronunciation() {
      body.innerHTML = '';
      const items = lesson.items;
      let itemIndex = 0;

      function mountItem() {
        body.innerHTML = '';
        const item = items[itemIndex];
        body.appendChild(el('div', 'la-prompt', `${uiText(language, 'sayIt')} ${item.phrase}`));
        body.appendChild(el('div', 'la-gloss', lang(item.gloss, language)));

        const btnRow = el('div', 'la-controls');
        btnRow.style.display = 'flex';
        btnRow.style.gap = '10px';
        btnRow.style.flexWrap = 'wrap';
        btnRow.style.justifyContent = 'center';

        const feedback = el('div', 'la-feedback');
        const scoreEl = el('div', 'la-pron-score');

        const hearBtn = el('button', 'la-btn ghost', uiText(language, 'listen'));
        hearBtn.type = 'button';
        hearBtn.addEventListener('click', () => speak(item.phrase, pack.locale));
        btnRow.appendChild(hearBtn);

        if (speechSupported()) {
          const micBtn = el('button', 'la-mic', uiText(language, 'trySaying'));
          micBtn.type = 'button';
          micBtn.addEventListener('click', () => {
            if (micBtn.classList.contains('recording')) return;
            micBtn.classList.add('recording');
            micBtn.textContent = uiText(language, 'listening');
            const attemptsKey = `${lesson.id}-${itemIndex}`;
            setState((draft) => {
              draft.pronunciationAttempts[attemptsKey] = (draft.pronunciationAttempts[attemptsKey] || 0) + 1;
            });
            const stop = listenOnce(pack.locale, ({ transcript, error }) => {
              micBtn.classList.remove('recording');
              micBtn.textContent = uiText(language, 'keepTrying');
              const grade = error ? 'red' : gradePronunciation(transcript, item.phrase);
              const face = grade === 'green' ? '😄' : grade === 'yellow' ? '🙂' : '🎧';
              scoreEl.textContent = face;
              feedback.className = `la-feedback ${grade}`;
              feedback.textContent = uiText(language, grade);
              if (grade === 'green') { sounds.correct(); burstAt(scoreEl, 16); setTimeout(next, 1300); }
              else sounds.wrong();
            });
            setTimeout(() => stop(), 6000);
          });
          btnRow.appendChild(micBtn);
        } else {
          body.appendChild(el('div', 'la-gloss', uiText(language, 'speakUnsupported')));
        }

        const skipBtn = el('button', 'la-btn ghost', uiText(language, 'skip'));
        skipBtn.type = 'button';
        skipBtn.addEventListener('click', () => next());
        btnRow.appendChild(skipBtn);

        function next() {
          itemIndex += 1;
          if (itemIndex >= items.length) { activityIndex += 1; mountNext(); return; }
          mountItem();
        }

        body.appendChild(scoreEl);
        body.appendChild(feedback);
        body.appendChild(btnRow);
      }
      mountItem();
    }

    function mountActivity(activity) {
      body.innerHTML = '';

      if (activity.kind === 'intro') {
        body.appendChild(el('div', 'la-target-word', activity.target));
        body.appendChild(el('div', 'la-gloss', lang(activity.gloss, language)));
        const btnRow = el('div', 'la-controls');
        btnRow.style.display = 'flex';
        btnRow.style.gap = '10px';
        btnRow.style.flexWrap = 'wrap';
        btnRow.style.justifyContent = 'center';
        const hearBtn = el('button', 'la-btn', uiText(language, 'listen'));
        hearBtn.type = 'button';
        hearBtn.addEventListener('click', () => speak(activity.target, pack.locale));
        btnRow.appendChild(hearBtn);
        const slowBtn = el('button', 'la-btn ghost', uiText(language, 'slow'));
        slowBtn.type = 'button';
        slowBtn.addEventListener('click', () => speak(activity.target, pack.locale, { rate: 0.55 }));
        btnRow.appendChild(slowBtn);
        const contBtn = el('button', 'la-btn', uiText(language, 'continueLabel'));
        contBtn.type = 'button';
        contBtn.addEventListener('click', () => { sounds.tap(); activityIndex += 1; mountNext(); });
        btnRow.appendChild(contBtn);
        body.appendChild(btnRow);
        speak(activity.target, pack.locale);
        return;
      }

      if (activity.kind === 'meaning' || activity.kind === 'hear' || activity.kind === 'complete') {
        const labels = {
          meaning: uiText(language, 'tapWord'),
          hear: uiText(language, 'tapHeard'),
          complete: uiText(language, 'completePhrase'),
        };
        body.appendChild(el('div', 'la-prompt', labels[activity.kind]));
        if (activity.kind === 'complete') {
          const promptEl = el('div', 'la-target-word');
          promptEl.innerHTML = activity.prompt.replaceAll('___', '<span class="la-blank">___</span>');
          body.appendChild(promptEl);
        } else if (activity.kind === 'meaning') {
          body.appendChild(el('div', 'la-target-word', activity.prompt));
        }

        const optionsRow = el('div', `la-options${activity.kind === 'hear' ? ' single' : ''}`);
        let answered = false;
        const shuffled = [...activity.options].sort(() => Math.random() - 0.5);
        for (const option of shuffled) {
          const button = el('button', 'la-option', lang(option.text, language));
          button.type = 'button';
          if (activity.kind === 'hear') button.style.textAlign = 'center';
          button.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            totalGraded += 1;
            if (option.correct) {
              button.classList.add('right');
              correctCount += 1;
              sounds.correct();
              burstAt(button, 14);
              if (activity.speak) speak(activity.speak, pack.locale);
              setTimeout(nextStep, 1100);
            } else {
              button.classList.add('wrong');
              sounds.wrong();
              toast(uiText(language, 'tryAgain'), 'retry');
              answered = false;
            }
          });
          optionsRow.appendChild(button);
        }
        body.appendChild(optionsRow);
        if (activity.speak && activity.kind !== 'meaning') speak(activity.speak, pack.locale);
        if (activity.kind === 'hear') {
          const replay = el('button', 'la-btn ghost', uiText(language, 'listen'));
          replay.type = 'button';
          replay.addEventListener('click', () => speak(activity.speak, pack.locale));
          body.appendChild(replay);
        }
        return;
      }

      if (activity.kind === 'match') {
        body.appendChild(el('div', 'la-prompt', uiText(language, 'playPairs')));
        const grid = el('div', 'la-match-grid');
        const leftCol = el('div', 'la-match-col');
        const rightCol = el('div', 'la-match-col');
        let selected = null;
        let matches = 0;

        const left = [...activity.pairs].sort(() => Math.random() - 0.5);
        const right = [...activity.pairs].sort(() => Math.random() - 0.5);
        left.forEach((pair) => {
          const cell = el('button', 'la-match-cell', pair.target);
          cell.type = 'button';
          cell.addEventListener('click', () => {
            if (cell.classList.contains('locked')) return;
            grid.querySelectorAll('.selected').forEach((c) => c.classList.remove('selected'));
            cell.classList.add('selected');
            cell._pair = pair;
            selected = cell;
            speak(pair.target, pack.locale);
          });
          leftCol.appendChild(cell);
        });
        right.forEach((pair) => {
          const cell = el('button', 'la-match-cell', pair.gloss[language] || pair.gloss.pt);
          cell.type = 'button';
          cell.addEventListener('click', () => {
            if (!selected || cell.classList.contains('locked')) return;
            totalGraded += 1;
            if (selected._pair === pair) {
              cell.classList.add('locked');
              selected.classList.add('locked');
              selected.classList.remove('selected');
              matches += 1;
              correctCount += 1;
              sounds.correct();
              if (matches >= activity.pairs.length) setTimeout(nextStep, 900);
            } else {
              cell.classList.add('wrong');
              sounds.wrong();
              setTimeout(() => cell.classList.remove('wrong'), 500);
            }
            selected = null;
          });
          rightCol.appendChild(cell);
        });
        grid.appendChild(leftCol);
        grid.appendChild(rightCol);
        body.appendChild(grid);
        return;
      }
    }

    function nextStep() {
      const kind = lesson.kind;
      if (kind === 'story') {
        // história tem um único "passo" (as linhas + palavra nova)
        if (activityIndex === 0) { mountStory(); return; }
        completeAndReward();
        return;
      }
      if (kind === 'pronunciation') {
        // mountPronunciation gerencia o próprio índice; só termina
        completeAndReward();
        return;
      }
      const acts = lesson.activities;
      if (activityIndex >= acts.length) { completeAndReward(); return; }
      mountActivity(acts[activityIndex]);
    }

    function mountNext() {
      const kind = lesson.kind;
      if (kind === 'story') {
        // a história tem um único passo: skip/fim conclui a lição
        if (activityIndex > 0) completeAndReward();
        else mountStory();
        return;
      }
      if (kind === 'pronunciation') { completeAndReward(); return; }
      const acts = lesson.activities;
      if (activityIndex >= acts.length) { completeAndReward(); return; }
      mountActivity(acts[activityIndex]);
    }

    function completeAndReward() {
      const stars = correctCount === 0 && totalGraded === 0 ? 3
        : totalGraded ? Math.max(1, Math.round((correctCount / Math.max(1, totalGraded)) * 3)) : 3;
      const { newCosmetic } = completeLesson(state, lesson.id, stars, COSMETICS.map((c) => c.id));
      setState(() => {});
      renderReward(section, lesson, stars, newCosmetic);
    }

    // início: história começa direto; pronúncia monta o fluxo; lição monta a 1ª atividade
    if (lesson.kind === 'story') mountStory();
    else if (lesson.kind === 'pronunciation') mountPronunciation();
    else mountActivity(lesson.activities[0]);

    return { destroy() { screenEl.remove(); } };
  });
}

// ── recompensa (spec §14) ────────────────────────────────────────────────────
function renderReward(section, lesson, stars, newCosmetic) {
  swap(() => {
    const screenEl = el('div', 'la-screen');
    const scroll = el('div', 'la-scroll');
    scroll.style.display = 'grid';
    scroll.style.placeItems = 'center';
    screenEl.appendChild(scroll);
    scroll.appendChild(hud());

    const panel = el('div', 'la-panel');
    panel.style.width = 'min(520px, 92vw)';
    panel.appendChild(el('div', 'la-title', `🏆 ${uiText(language, 'completed')}`));
    const starsRow = el('div', 'la-stars-row');
    starsRow.innerHTML = '★'.repeat(stars) + `<span class="dim">${'☆'.repeat(3 - stars)}</span>`;
    panel.appendChild(starsRow);
    panel.appendChild(el('div', 'la-status', lang(lesson.title, language)));

    if (newCosmetic) {
      const cosmetic = COSMETICS.find((c) => c.id === newCosmetic);
      const card = el('div', 'la-unlock-card');
      card.appendChild(el('span', 'emoji', cosmetic.emoji));
      card.appendChild(el('span', null, `${uiText(language, 'unlockedItem')} ${lang(cosmetic.name, language)}`));
      panel.appendChild(card);
      const preview = el('div', 'la-monster-box');
      preview.innerHTML = monsterSVG([newCosmetic], 'wow', 110);
      panel.appendChild(preview);
      sounds.fanfare();
      confetti(150, 3000);
    } else if (stars >= 2) {
      confetti(80, 2000);
      sounds.star();
    }

    const continueBtn = el('button', 'la-btn', uiText(language, 'continueLabel'));
    continueBtn.type = 'button';
    continueBtn.addEventListener('click', () => { sounds.tap(); renderPath(); });
    panel.appendChild(continueBtn);

    const closetBtn = el('button', 'la-btn ghost', `👕 ${uiText(language, 'closet')}`);
    closetBtn.type = 'button';
    closetBtn.style.marginLeft = '10px';
    closetBtn.addEventListener('click', () => { sounds.tap(); renderCloset(); });
    panel.appendChild(closetBtn);

    scroll.appendChild(panel);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── guarda-roupa do monstro (spec §13) ──────────────────────────────────────
function renderCloset() {
  swap(() => {
    const screenEl = el('div', 'la-screen');
    const scroll = el('div', 'la-scroll');
    screenEl.appendChild(scroll);
    scroll.style.display = 'grid';
    scroll.style.placeItems = 'center';
    scroll.appendChild(hud([
      el('span', 'la-chip', `⭐ ${totalStars(state)}`),
      el('span', 'la-chip', `✅ ${state.completedLessons.length} ${uiText(language, 'lessonsDone')}`),
    ]));

    const panel = el('div', 'la-panel');
    panel.style.width = 'min(560px, 94vw)';
    panel.appendChild(el('div', 'la-title', `👕 ${uiText(language, 'closet')}`));

    const monsterBox = el('div', 'la-monster-box');
    monsterBox.innerHTML = monsterSVG(state.equippedCosmetics, 'happy', 140);
    panel.appendChild(monsterBox);

    const grid = el('div', 'la-cosmetic-grid');
    for (const cosmetic of COSMETICS) {
      const unlocked = state.unlockedCosmetics.includes(cosmetic.id);
      const equipped = state.equippedCosmetics.includes(cosmetic.id);
      const button = el('button', `la-cosmetic${equipped ? ' equipped' : ''}${unlocked ? '' : ' locked'}`);
      button.type = 'button';
      button.appendChild(el('span', 'emoji', cosmetic.emoji));
      button.appendChild(el('span', null, lang(cosmetic.name, language)));
      button.appendChild(el('span', null, unlocked
        ? (equipped ? `✓ ${uiText(language, 'unequip')}` : uiText(language, 'equip'))
        : '🔒'));
      button.addEventListener('click', () => {
        if (!unlocked) { sounds.wrong(); return; }
        sounds.tap();
        setState((draft) => {
          draft.equippedCosmetics = equipped
            ? draft.equippedCosmetics.filter((id) => id !== cosmetic.id)
            : [...draft.equippedCosmetics, cosmetic.id];
        });
        monsterBox.innerHTML = monsterSVG(state.equippedCosmetics, 'wow', 140);
        renderClosetRefresh(grid, monsterBox);
      });
      grid.appendChild(button);
    }
    panel.appendChild(grid);

    const row = el('div', 'la-controls');
    row.style.display = 'flex';
    row.style.gap = '10px';
    const pathBtn = el('button', 'la-btn', uiText(language, 'back'));
    pathBtn.type = 'button';
    pathBtn.addEventListener('click', () => { sounds.tap(); renderPath(); });
    row.appendChild(pathBtn);
    const targetBtn = el('button', 'la-btn ghost', `🌍 ${uiText(language, 'changeTarget')}`);
    targetBtn.type = 'button';
    targetBtn.addEventListener('click', () => { sounds.tap(); renderEntry(); });
    row.appendChild(targetBtn);
    panel.appendChild(row);

    scroll.appendChild(panel);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };

    function renderClosetRefresh() {
      renderCloset();
    }
  });
}

// ── boot ─────────────────────────────────────────────────────────────────────
try {
  ensureStyles();
  if (state.targetLanguage && packById(state.targetLanguage)) renderPath();
  else renderEntry();
} catch (error) {
  const fatal = document.getElementById('fatal');
  if (fatal) {
    fatal.textContent = uiText(language, 'errorFatal');
    fatal.classList.add('show');
  }
  throw error;
}
