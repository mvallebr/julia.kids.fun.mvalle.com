// The Word Quest — engine principal: mapa → capítulo (história → quiz →
// evento/recompensa) → próximo, com ouro, marcos, ferramentas, journal e
// repetição espaçada.

import { el, clearContainer } from './ui.js';
import { sounds, setMuted } from './audio.js';
import { uiText, lang } from './i18n.js';
import { asset, preload } from './assets.js';
import { ensureStyles } from './styles.js';
import {
  loadState, saveState, emptyState, normalizeState,
  stakeFor, isMilestone, secureMilestone, awardGold, failQuestion,
  useLifeline, touchWord, wordCorrect, wordWrong, recordSkill,
} from './state.js';
import { nextQuestion } from './questions.js';
import { showQuizQuestion } from './widgets/quiz.js';
import { CHAPTERS } from './chapters.js';

const root = document.getElementById('wq');
const query = new URLSearchParams(location.search);
const launcherConfig = query.get('from') === 'launcher' ? query : null;

let player = (launcherConfig?.get('name') || '').trim() || 'explorer';
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
  location.href = '../index.html';
}

// ── título ───────────────────────────────────────────────────────────────────
function renderTitle() {
  swap(() => {
    const screenEl = el('div', 'wq-screen');
    screenEl.style.backgroundImage = `url('${asset('keyart')}')`;
    screenEl.style.backgroundPosition = 'center 30%';
    const panel = el('div', 'wq-story wq-panel-dark');
    panel.style.bottom = '14%';
    const logo = el('div', 'wq-logo', uiText('en', 'title'));
    logo.appendChild(el('small', null, uiText('en', 'tagline')));
    panel.appendChild(logo);
    const hasRun = state.questionIndex > 0 || state.chapter > 0;
    const play = el('button', 'wq-btn', hasRun ? uiText('en', 'continueJourney') : uiText('en', 'play'));
    play.type = 'button';
    play.addEventListener('click', () => { sounds.tap(); renderMap(); });
    panel.appendChild(play);
    if (hasRun) {
      const restart = el('button', 'wq-btn ghost', uiText('en', 'newRun'));
      restart.type = 'button';
      restart.style.marginLeft = '10px';
      restart.addEventListener('click', () => {
        setState((draft) => {
          Object.assign(draft, emptyState(), { character: draft.character, sound: draft.sound });
        });
        renderTitle();
      });
      panel.appendChild(restart);
    }
    const exit = el('button', 'wq-btn ghost', uiText('en', 'exitToLauncher'));
    exit.type = 'button';
    exit.style.marginLeft = '10px';
    exit.addEventListener('click', exitToLauncher);
    panel.appendChild(exit);
    screenEl.appendChild(panel);
    root.appendChild(screenEl);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── mapa ─────────────────────────────────────────────────────────────────────
const NODE_POSITIONS = [
  { x: 9, y: 76 }, { x: 22, y: 58 }, { x: 34, y: 74 }, { x: 46, y: 52 },
  { x: 58, y: 70 }, { x: 68, y: 48 }, { x: 80, y: 66 }, { x: 90, y: 46 },
];

function renderMap() {
  swap(() => {
    const screenEl = el('div', 'wq-screen');
    screenEl.style.backgroundImage = `url('${asset('map-hero')}')`;
    screenEl.appendChild(el('div', 'wq-veil'));
    const top = el('div', 'wq-top');
    const logo = el('div', 'wq-logo', uiText('en', 'title'));
    logo.appendChild(el('small', null, uiText('en', 'tagline')));
    top.appendChild(logo);
    const hud = el('div', 'wq-hud');
    hud.appendChild(el('div', 'wq-chip', `💰 ${state.gold.toLocaleString('en-GB')} gold`));
    hud.appendChild(el('div', 'wq-chip', `📖 ${Object.keys(state.journal).length}`));
    const journalChip = el('button', 'wq-chip clickable', `✒️ ${uiText('en', 'journal')}`);
    journalChip.type = 'button';
    journalChip.addEventListener('click', () => { sounds.tap(); renderJournal(); });
    hud.appendChild(journalChip);
    const soundChip = el('button', 'wq-chip clickable', state.sound ? '🔊' : '🔇');
    soundChip.type = 'button';
    soundChip.title = uiText('en', 'muteTitle');
    soundChip.addEventListener('click', () => {
      const next = !state.sound;
      setState((draft) => { draft.sound = next; });
      setMuted(!next);
      soundChip.textContent = next ? '🔊' : '🔇';
      sounds.tap();
    });
    hud.appendChild(soundChip);
    const menuChip = el('button', 'wq-chip clickable', uiText('en', 'exitToLauncher'));
    menuChip.type = 'button';
    menuChip.addEventListener('click', exitToLauncher);
    hud.appendChild(menuChip);
    top.appendChild(hud);
    screenEl.appendChild(top);

    const locations = el('div', 'wq-map-locations');
    CHAPTERS.forEach((chapter, index) => {
      const done = state.chapterDone.includes(chapter.id);
      const current = index === state.chapter && !done;
      const locked = index > state.chapter;
      const pos = NODE_POSITIONS[index];
      const node = el('button', `wq-loc ${done ? 'done' : current ? 'current' : 'locked'}`);
      node.type = 'button';
      node.style.left = `${pos.x}%`;
      node.style.top = `${pos.y}%`;
      node.appendChild(el('span', 'wq-loc-emoji', chapter.emoji));
      node.appendChild(el('span', 'wq-loc-name', lang(chapter.name)));
      node.appendChild(el('span', 'wq-loc-status',
        done ? `✓ ${uiText('en', 'completed')}` : current ? `▶ ${uiText('en', 'enter')}` : '🔒'));
      node.addEventListener('click', () => {
        if (locked) {
          sounds.wrong();
          return;
        }
        sounds.tap();
        enterChapter(index);
      });
      locations.appendChild(node);
    });
    screenEl.appendChild(locations);

    const owl = el('img', 'wq-owl');
    owl.src = asset('owl');
    owl.alt = uiText('en', 'askOwl');
    screenEl.appendChild(owl);

    root.appendChild(screenEl);
    preload(CHAPTERS.map((chapter) => chapter.bg));
    return { destroy() { screenEl.remove(); } };
  });
}

// ── entrada de capítulo: história (e documento, se houver) ───────────────────
function enterChapter(chapterIndex) {
  const chapter = CHAPTERS[chapterIndex];
  swap(() => {
    const screenEl = el('div', 'wq-screen');
    screenEl.style.backgroundImage = `url('${asset(chapter.bg)}')`;
    screenEl.appendChild(el('div', 'wq-veil'));
    const topBar = el('div', 'wq-top');
    const topHud = el('div', 'wq-hud');
    topHud.appendChild(el('div', 'wq-chip', `💰 ${state.gold.toLocaleString('en-GB')}`));
    const backChip = el('button', 'wq-chip clickable', '🗺️');
    backChip.type = 'button';
    backChip.title = uiText('en', 'backToMap');
    backChip.addEventListener('click', () => { sounds.tap(); renderMap(); });
    topHud.appendChild(backChip);
    const soundChip = el('button', 'wq-chip clickable', state.sound ? '🔊' : '🔇');
    soundChip.type = 'button';
    soundChip.title = uiText('en', 'muteTitle');
    soundChip.addEventListener('click', () => {
      const next = !state.sound;
      setState((draft) => { draft.sound = next; });
      setMuted(!next);
      soundChip.textContent = next ? '🔊' : '🔇';
      sounds.tap();
    });
    topHud.appendChild(soundChip);
    const exitChip = el('button', 'wq-chip clickable', '🏠');
    exitChip.type = 'button';
    exitChip.title = uiText('en', 'exitToLauncher');
    exitChip.addEventListener('click', () => { sounds.tap(); exitToLauncher(); });
    topHud.appendChild(exitChip);
    topBar.appendChild(topHud);
    screenEl.appendChild(topBar);
    const story = el('div', 'wq-story wq-parchment');
    chapter.story.forEach((line) => story.appendChild(el('p', 'wq-story-line', typeof line === 'string' ? line : (line.en || ''))));
    if (chapter.doc) {
      story.appendChild(el('div', 'wq-story-line', chapter.doc.frame));
      const docCard = el('div', 'wq-doc-card', chapter.doc.text);
      story.appendChild(docCard);
    }
    const begin = el('button', 'wq-btn', uiText('en', 'beginChallenge'));
    begin.type = 'button';
    begin.addEventListener('click', () => { sounds.tap(); runChapterQuiz(chapterIndex); });
    story.appendChild(begin);
    screenEl.appendChild(story);
    root.appendChild(screenEl);
    preload([chapter.bg]);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── quiz do capítulo ─────────────────────────────────────────────────────────
function runChapterQuiz(chapterIndex) {
  swap(() => {
    const chapter = CHAPTERS[chapterIndex];
    const screenEl = el('div', 'wq-screen');
    screenEl.style.backgroundImage = `url('${asset(chapter.bg)}')`;
    screenEl.appendChild(el('div', 'wq-veil'));

    const topBar = el('div', 'wq-top');
    const topHud = el('div', 'wq-hud');
    topHud.appendChild(el('div', 'wq-chip', `💰 ${state.gold.toLocaleString('en-GB')}`));
    const backChip = el('button', 'wq-chip clickable', '🗺️');
    backChip.type = 'button';
    backChip.title = uiText('en', 'backToMap');
    backChip.addEventListener('click', () => { sounds.tap(); renderMap(); });
    topHud.appendChild(backChip);
    const soundChipQuiz = el('button', 'wq-chip clickable', state.sound ? '🔊' : '🔇');
    soundChipQuiz.type = 'button';
    soundChipQuiz.title = uiText('en', 'muteTitle');
    soundChipQuiz.addEventListener('click', () => {
      const next = !state.sound;
      setState((draft) => { draft.sound = next; });
      setMuted(!next);
      soundChipQuiz.textContent = next ? '🔊' : '🔇';
      sounds.tap();
    });
    topHud.appendChild(soundChipQuiz);
    const exitChip = el('button', 'wq-chip clickable', '🏠');
    exitChip.type = 'button';
    exitChip.title = uiText('en', 'exitToLauncher');
    exitChip.addEventListener('click', () => { sounds.tap(); exitToLauncher(); });
    topHud.appendChild(exitChip);
    topBar.appendChild(topHud);
    screenEl.appendChild(topBar);

    root.appendChild(screenEl);

    const quizHost = el('div');
    screenEl.appendChild(quizHost);

    const isDragon = chapter.special?.type === 'dragon';
    let hearts = chapter.special?.hearts ?? 0;
    let heartsRow = null;
    if (isDragon) {
      heartsRow = el('div', 'wq-hearts');
      for (let heart = 0; heart < chapter.special.hearts; heart += 1) {
        heartsRow.appendChild(el('span', null, '❤️'));
      }
      screenEl.appendChild(heartsRow);
    }

    let localIndex = 0;

    function showCurrent(avoidPrompt = '') {
      // cancel any pending timers from the previous quiz overlay (lock-in suspense
      // and the 3.6s post-reveal delay) so they cannot fire onAnswer after we move on.
      if (quizHost._wqDestroyCurrent) {
        quizHost._wqDestroyCurrent();
        quizHost._wqDestroyCurrent = null;
      }
      clearContainer(quizHost);
      const globalIndex = state.questionIndex;
      const question = nextQuestion({
        chapterIndex,
        questionSeed: globalIndex * 31 + chapterIndex * 7 + (avoidPrompt ? 1 : 0),
        state,
        avoidPrompt,
      });
      question.bg = chapter.bg;
      showQuizQuestion(quizHost, {
        question,
        stake: stakeFor(state.questionIndex),
        gold: state.gold,
        index: localIndex,
        total: chapter.questions,
        lifelines: state.lifelines,
        solo: true,
        language: 'en',
        onClue: () => question.hint || 'Read every option carefully before choosing.',
        onSwap: () => nextQuestion({
          chapterIndex,
          questionSeed: Date.now() % 99991,
          state,
          avoidPrompt: question.prompt,
        }),
        onAnswer: (correct) => handleAnswer(chapter, correct, question),
        onLifeline: (kind) => {
          let consumed = false;
          setState((draft) => { consumed = useLifeline(draft, kind); });
          return consumed ? true : false;
        },
      });
    }

    function handleAnswer(chapterRef, correct, question) {
      setState((draft) => {
        draft.runStats.answered += 1;
        recordSkill(draft, question.skill, correct);
        if (correct) {
          draft.runStats.correct += 1;
          awardGold(draft, stakeFor(draft.questionIndex));
          for (const word of question.targetWords || []) {
            touchWord(draft, word, { def: question.explanation.slice(0, 90) });
            wordCorrect(draft, word);
          }
        } else {
          failQuestion(draft);
          for (const word of question.targetWords || []) {
            touchWord(draft, word, { def: question.explanation.slice(0, 90) });
            wordWrong(draft, word);
          }
        }
        draft.questionIndex += 1;
      });

      if (isDragon) {
        // Dragon Challenge: errors cost hearts, correct answers keep them.
        // If the player loses all hearts the dragon drains their gold.
        hearts = Math.max(0, hearts - (correct ? 0 : 1));
        if (heartsRow) {
          [...heartsRow.children].forEach((heart, index) => {
            heart.classList.toggle('lost', index >= hearts);
          });
        }
        if (hearts === 0) {
          sounds.wrong();
          setState((draft) => { failQuestion(draft); });
        }
      }

      const milestone = chapterRef.milestone;
      if (isMilestone(state.questionIndex) && milestone) {
        setState((draft) => secureMilestone(draft));
        showToast(`🏛️ ${milestone.name} — ${uiText('en', 'milestoneSecured')}`);
        confettiBurst(90);
      }

      localIndex += 1;
      if (localIndex >= chapterRef.questions) {
        finishChapter(chapterRef);
        return;
      }
      showCurrent();
    }

    function finishChapter(chapterRef) {
      // handleAnswer already called secureMilestone when the milestone question
      // was answered. Skip the duplicate here so we don't fire two back-to-back
      // "milestone secured" toasts.
      setState((draft) => {
        if (!draft.chapterDone.includes(chapterRef.id)) draft.chapterDone.push(chapterRef.id);
        draft.chapter = Math.min(CHAPTERS.length - 1, WORLD_ORDER_INDEX(chapterRef.id) + 1);
      });
      confettiBurst(110);
      sounds.mega();
      showToast(`🏆 ${lang(chapterRef.name)} — ${uiText('en', 'worldComplete')}`);
      setTimeout(() => renderSummary(chapterRef), 1600);
    }

    showCurrent();

    return {
      destroy() {
        // Cancel any pending quiz timers (lock-in suspense + reveal delay) so they
        // can't call onAnswer after the user has already left for the map/menu.
        if (quizHost._wqDestroyCurrent) {
          quizHost._wqDestroyCurrent();
          quizHost._wqDestroyCurrent = null;
        }
        screenEl.remove();
      },
    };
  });
}

function WORLD_ORDER_INDEX(chapterId) {
  return CHAPTERS.findIndex((chapter) => chapter.id === chapterId);
}

// ── pós-capítulo: resumo da sessão + próximo destino ─────────────────────────
function renderSummary(chapterRef) {
  const nextId = CHAPTERS[WORLD_ORDER_INDEX(chapterRef.id) + 1]?.id ?? null;
  const nextChapter = nextId ? CHAPTERS.find((chapter) => chapter.id === nextId) : null;
  const reachedCastle = !nextChapter;

  swap(() => {
    const screenEl = el('div', 'wq-screen');
    screenEl.style.backgroundImage = `url('${asset(reachedCastle ? 'loc-castle' : 'map-hero')}')`;
    screenEl.appendChild(el('div', 'wq-veil'));
    const panel = el('div', 'wq-story wq-parchment');
    panel.appendChild(el('div', 'wq-journal-title', `✨ ${uiText('en', 'runSummary')}`));
    const run = state.runStats;
    const row = (text, mark = '✓') => {
      const node = el('div', 'wq-summary-row');
      node.appendChild(el('span', 'mark', mark));
      node.appendChild(el('span', null, text));
      panel.appendChild(node);
    };
    row(`${run.answered} ${uiText('en', 'questionsAnswered')}`);
    row(`${run.correct} ${uiText('en', 'correctCount')}`);
    row(`${run.discovered} ${uiText('en', 'wordsDiscovered')}`, '📖');
    row(`${state.gold.toLocaleString('en-GB')} ${uiText('en', 'goldEarned')}`, '💰');
    if (reachedCastle) {
      setState((draft) => { draft.castleReached = true; });
      panel.appendChild(el('div', 'wq-story-line', `👑 ${uiText('en', 'castleReached')}`));
    } else {
      panel.appendChild(el('div', 'wq-story-line', `🗺️ ${lang(nextChapter.name)} ${uiText('en', 'unlocked')}`));
    }
    const keep = el('button', 'wq-btn', reachedCastle ? uiText('en', 'playAgain') : uiText('en', 'keepGoing'));
    keep.type = 'button';
    keep.addEventListener('click', () => {
      setState((draft) => {
        draft.runStats = { answered: 0, correct: 0, discovered: 0, goldEarned: 0 };
        draft.chapter = reachedCastle ? 0 : WORLD_ORDER_INDEX(nextId);
        if (reachedCastle) draft.worldId = CHAPTERS[0].id;
        else draft.worldId = nextId;
        draft.nodeIndex = 0;
      });
      sounds.tap();
      if (reachedCastle) renderMap();
      else enterChapter(WORLD_ORDER_INDEX(nextId));
    });
    panel.appendChild(keep);
    const menu = el('button', 'wq-btn ghost', uiText('en', 'exitToLauncher'));
    menu.type = 'button';
    menu.style.marginLeft = '10px';
    menu.addEventListener('click', exitToLauncher);
    panel.appendChild(menu);
    screenEl.appendChild(panel);
    root.appendChild(screenEl);
    preload(nextChapter ? [nextChapter.bg] : []);
    return { destroy() { screenEl.remove(); } };
  });
}

// ── journal ──────────────────────────────────────────────────────────────────
function renderJournal() {
  const overlay = el('div', 'wq-screen');
  overlay.style.backgroundImage = `url('${asset('map-hero')}')`;
  overlay.appendChild(el('div', 'wq-veil'));
  const panel = el('div', 'wq-journal wq-parchment');
  panel.appendChild(el('h2', 'wq-journal-title', `✒️ ${uiText('en', 'journalTitle')}`));
  const entries = Object.entries(state.journal).sort((a, b) => b[1].lastAt - a[1].lastAt);
  if (!entries.length) {
    panel.appendChild(el('div', 'wq-journal-empty', 'Your journal is waiting for its first word…'));
  }
  for (const [word, entry] of entries) {
    const card = el('div', 'wq-word-card');
    card.appendChild(el('h3', null, word));
    if (entry.def) card.appendChild(el('div', 'def', entry.def));
    if (entry.example) card.appendChild(el('div', 'ex', `“${entry.example}”`));
    const masteryKey = `mastery${entry.status.charAt(0).toUpperCase()}${entry.status.slice(1)}`;
    card.appendChild(el('span', `wq-mastery ${entry.status}`, uiText('en', masteryKey)));
    panel.appendChild(card);
  }
  const close = el('button', 'wq-btn', uiText('en', 'close'));
  close.type = 'button';
  close.addEventListener('click', () => overlay.remove());
  panel.appendChild(close);
  overlay.appendChild(panel);
  root.appendChild(overlay);
}

// ── efeitos ──────────────────────────────────────────────────────────────────
function showToast(message) {
  const node = el('div', 'wq-toast', message);
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}

function confettiBurst(count = 120) {
  const colors = ['#ffd166', '#ff9fae', '#9fe8ff', '#c7a6ff', '#a8e05f'];
  const layer = el('div', 'wq-confetti');
  for (let index = 0; index < count; index += 1) {
    const piece = el('span');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 4600);
}

// ── boot ─────────────────────────────────────────────────────────────────────
document.addEventListener('pointerdown', () => sounds.tap(), { once: true });
ensureStyles();
renderTitle();

window.__wqDebug = {
  state: () => state,
  goto: (chapterIndex) => enterChapter(chapterIndex),
  map: () => renderMap(),
  addGold: (n) => setState((draft) => { draft.gold += n; }),
};
