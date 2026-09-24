// RPG Welling — conquistas e avaliação pura do progresso (sem DOM/three).
// Os ids são chaves permanentes do save: nunca renomear depois de publicar.

function localized(pt, en, es) {
  return Object.freeze({ pt, en, es });
}

function achievement(id, text, hint, tier, check) {
  return Object.freeze({
    id,
    text: localized(...text),
    hint: localized(...hint),
    tier,
    check,
  });
}

export const ACHIEVEMENTS = Object.freeze([
  achievement(
    'first-word',
    ['Primeira palavra', 'First word', 'Primera palabra'],
    ['Encontra uma palavra e escreve-a no teu diário.', 'Find a word and add it to your journal.', 'Encuentra una palabra y apúntala en tu diario.'],
    'bronze',
    (stats) => stats.words >= 1,
  ),
  achievement(
    'word-collector',
    ['Colecionadora de palavras', 'Word collector', 'Coleccionista de palabras'],
    ['Encontra 10 palavras diferentes no teu diário.', 'Find 10 different words in your journal.', 'Encuentra 10 palabras diferentes en tu diario.'],
    'bronze',
    (stats) => stats.words >= 10,
  ),
  achievement(
    'word-champion',
    ['Campeã de palavras', 'Word champion', 'Campeona de palabras'],
    ['Encontra 25 palavras diferentes no teu diário.', 'Find 25 different words in your journal.', 'Encuentra 25 palabras diferentes en tu diario.'],
    'silver',
    (stats) => stats.words >= 25,
  ),
  achievement(
    'word-legend',
    ['Lenda das palavras', 'Word legend', 'Leyenda de palabras'],
    ['Encontra 90 palavras diferentes no teu diário.', 'Find 90 different words in your journal.', 'Encuentra 90 palabras diferentes en tu diario.'],
    'gold',
    // Em 24/09/2026 havia 92 glosses únicas em content.js mais 6 da lição da
    // lousa, com 3 repetidas: máximo real de 95. Usamos 90 como margem para
    // conteúdo futuro; ao mudar o vocabulário, reconfirme o máximo alcançável.
    (stats) => stats.words >= 90,
  ),
  achievement(
    'word-master',
    ['Mestre das palavras', 'Word master', 'Maestro de palabras'],
    ['Acerta 10 palavras diferentes três vezes cada uma.', 'Answer 10 different words correctly three times each.', 'Acierta 10 palabras diferentes tres veces cada una.'],
    'silver',
    (stats) => stats.mastered >= 10,
  ),
  achievement(
    'first-clue',
    ['Primeira pista', 'First clue', 'Primera pista'],
    ['Encontra uma página de história escondida na escola, na High Street ou em Oxleas Wood.', 'Find a hidden story page at school, on the High Street or in Oxleas Wood.', 'Encuentra una página de historia escondida en la escuela, en la High Street o en Oxleas Wood.'],
    'bronze',
    (stats) => stats.clues >= 1,
  ),
  achievement(
    'clue-hunter',
    ['Caçadora de pistas', 'Clue hunter', 'Cazadora de pistas'],
    ['Encontra as 6 páginas de história escondidas.', 'Find all 6 hidden story pages.', 'Encuentra las 6 páginas de historia escondidas.'],
    'gold',
    (stats) => stats.clues >= 6,
  ),
  achievement(
    'puzzle-solver',
    ['Solucionadora de desafios', 'Puzzle solver', 'Solucionadora de retos'],
    ['Acerta 3 perguntas rápidas para personagens e lugares.', 'Answer 3 quick questions for characters and places.', 'Acierta 3 preguntas rápidas para personajes y lugares.'],
    'bronze',
    (stats) => stats.challenges >= 3,
  ),
  achievement(
    'map-maker',
    ['Montadora de mapas', 'Map maker', 'Constructora de mapas'],
    ['Junta as 4 partes: do Sr. Finch, da Sra. Page, da estante e do carrinho.', 'Find all 4 map pieces: from Mr Finch, Ms Page, the shelf and the book trolley.', 'Junta las 4 piezas: del Sr. Finch, de la Sra. Page, del estante y del carrito.'],
    'silver',
    (stats) => stats.mapPieces >= 4,
  ),
  achievement(
    'four-places',
    ['Quatro lugares', 'Four places', 'Cuatro lugares'],
    ['Entra em Oxleas Wood, na High Street, na Academia Owlburt e na sala de aula.', 'Step into Oxleas Wood, the High Street, Owlburt Academy and the classroom.', 'Entra en Oxleas Wood, en la High Street, en la Academia Owlburt y en el aula.'],
    'silver',
    (stats) => stats.zonesVisited >= 4,
  ),
  achievement(
    'first-duel',
    ['Primeiro duelo', 'First duel', 'Primer duelo'],
    ['Ganha um duelo de feitiços com a Prof. Raven acertando 2 de 3 perguntas.', 'Win a spell duel with Prof. Raven by getting 2 of 3 right.', 'Gana un duelo de hechizos con la Prof. Raven acertando 2 de 3 preguntas.'],
    'bronze',
    (stats) => stats.duelWins >= 1,
  ),
  achievement(
    'duel-trio',
    ['Trio de duelos', 'Duel trio', 'Trío de duelos'],
    ['Ganha 3 duelos de feitiços com a Prof. Raven.', 'Win 3 spell duels with Prof. Raven.', 'Gana 3 duelos de hechizos con la Prof. Raven.'],
    'silver',
    (stats) => stats.duelWins >= 3,
  ),
  achievement(
    'duel-champion',
    ['Campeã de duelos', 'Duel champion', 'Campeona de duelos'],
    ['Ganha 10 duelos de feitiços com a Prof. Raven.', 'Win 10 spell duels with Prof. Raven.', 'Gana 10 duelos de hechizos con la Prof. Raven.'],
    'gold',
    (stats) => stats.duelWins >= 10,
  ),
  achievement(
    'three-day-learner',
    ['Três dias de estudo', 'Three days strong', 'Tres días de estudio'],
    ['Pratica ou descobre uma palavra em 3 dias seguidos.', 'Practise or discover a word on 3 days in a row.', 'Practica o descubre una palabra 3 días seguidos.'],
    'silver',
    (stats) => stats.studyStreak >= 3,
  ),
  achievement(
    'week-learner',
    ['Semana de estudo', 'Week learner', 'Semana de estudio'],
    ['Pratica ou descobre uma palavra em 7 dias seguidos.', 'Practise or discover a word on 7 days in a row.', 'Practica o descubre una palabra 7 días seguidos.'],
    'gold',
    (stats) => stats.studyStreak >= 7,
  ),
  achievement(
    'five-right',
    ['Cinco dias de acertos', 'Five right days', 'Cinco días de aciertos'],
    ['Acerta pelo menos uma palavra em 5 dias diferentes.', 'Get at least one word right on 5 different days.', 'Acierta al menos una palabra en 5 días diferentes.'],
    'silver',
    (stats) => stats.correctDays >= 5,
  ),
  achievement(
    'chapter-one',
    ['Capítulo concluído', 'Chapter one', 'Capítulo completado'],
    ['Abre o portão secreto em Oxleas Wood e passa por ele para ver o final.', 'Open the secret gate in Oxleas Wood and step through to see the ending.', 'Abre el portón secreto en Oxleas Wood y pasa por él para ver el final.'],
    'gold',
    (stats) => stats.endingSeen,
  ),
  achievement(
    'kind-helper',
    ['Ajudante gentil', 'Kind helper', 'Ayudante amable'],
    ['Encontra o guarda-chuva roxo no parquinho e devolve-o à Sra. Page.', 'Find the purple umbrella in the playground and return it to Ms Page.', 'Encuentra el paraguas morado en el parque y devuélveselo a la Sra. Page.'],
    'bronze',
    (stats) => stats.helpedTeacher,
  ),
  achievement(
    'chapter-two',
    ['Estrela de Severndroog', 'Severndroog Star', 'Estrella de Severndroog'],
    ['Reúne os quatro fragmentos de estrela do Capítulo 2 e devolve a estrela ao topo da torre.', 'Gather the four star fragments of Chapter 2 and return the star to the top of the tower.', 'Reúne los cuatro fragmentos de estrella del Capítulo 2 y devuelve la estrella a la punta de la torre.'],
    'gold',
    (stats) => stats.chapterTwoDone,
  ),
]);

export const ACHIEVEMENT_IDS = Object.freeze(ACHIEVEMENTS.map((item) => item.id));

const NON_SCHOOL_ZONES = Object.freeze(['woods', 'highstreet', 'academy', 'classroom']);

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function nonNegativeInt(value) {
  return Number.isFinite(value) ? Math.max(0, Math.min(1e9, Math.floor(value))) : 0;
}

function uniqueStringCount(value) {
  if (!Array.isArray(value)) return 0;
  return new Set(value.filter((item) => typeof item === 'string' && item.length > 0)).size;
}

function dayKey(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function recentHistory(history, today) {
  const days = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
    days.push({ key: dayKey(date), entry: isRecord(history[dayKey(date)]) ? history[dayKey(date)] : null });
  }
  return days;
}

function correctDayCount(history) {
  return Object.values(history).filter((entry) => (
    isRecord(entry) && nonNegativeInt(entry.right) > 0
  )).length;
}

function currentStudyStreak(history, today) {
  let streak = 0;
  for (let offset = 0; ; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);
    const entry = isRecord(history[dayKey(date)]);
    if (entry) {
      streak += 1;
      continue;
    }
    if (offset === 0) continue;
    break;
  }
  return streak;
}

export function achievementStats(state) {
  const source = isRecord(state) ? state : {};
  const words = isRecord(source.words) ? source.words : {};
  const wordEntries = Object.values(words);
  const history = isRecord(source.history) ? source.history : {};
  const flags = isRecord(source.flags) ? source.flags : {};
  const challenges = isRecord(source.challenges) ? source.challenges : {};
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const recent = recentHistory(history, today);
  const historyStats = recent.reduce((sum, { entry }) => ({
    added: sum.added + nonNegativeInt(entry?.added),
    right: sum.right + nonNegativeInt(entry?.right),
    wrong: sum.wrong + nonNegativeInt(entry?.wrong),
  }), { added: 0, right: 0, wrong: 0 });
  const zonesVisited = NON_SCHOOL_ZONES.filter((zone) => Boolean(flags[`visited_${zone}`])).length;

  return {
    words: wordEntries.length,
    mastered: wordEntries.filter((word) => isRecord(word) && Number.isFinite(word.streak) && word.streak >= 3).length,
    due: wordEntries.filter((word) => isRecord(word) && Number.isFinite(word.due) && word.due <= now.getTime()).length,
    clues: uniqueStringCount(source.clues),
    mapPieces: uniqueStringCount(source.mapPieces),
    challenges: Object.values(challenges).filter(Boolean).length,
    duelWins: nonNegativeInt(source.duelWins),
    zonesVisited,
    history: historyStats,
    studyStreak: currentStudyStreak(history, today),
    daysPlayed: Object.values(history).filter(isRecord).length,
    correctDays: correctDayCount(history),
    endingSeen: Boolean(flags.endingSeen),
    helpedTeacher: Boolean(flags.umbrellaDone),
    chapterTwoDone: Boolean(flags.ch2Done),
  };
}

export function evaluateAchievements(earnedIds, state) {
  const earned = new Set(Array.isArray(earnedIds) ? earnedIds.filter((id) => typeof id === 'string') : []);
  const stats = achievementStats(state);
  return ACHIEVEMENTS
    .filter((item) => !earned.has(item.id) && item.check(stats))
    .map((item) => item.id);
}

export function achievementById(id) {
  return ACHIEVEMENTS.find((item) => item.id === id);
}
