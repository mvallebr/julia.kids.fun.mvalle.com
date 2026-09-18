// Language Adventures — construtor de conteúdo dos packs.
// Converte tabelas compactas de vocabulário em atividades completas
// (conteúdo estático e versionado — nada de LLM em runtime, spec §17).

// Cria um conjunto de atividades de uma lição a partir do vocabulário dela.
// difficulty: easy | medium | hard  (controla distratores e tamanho)
export function buildActivities(vocab, difficulty = 'easy') {
  const activities = [];
  const pick = (n) => vocab.slice(0, n);

  // 1) introdução de cada palavra (ouvir)
  for (const item of pick(difficulty === 'easy' ? 4 : 5)) {
    activities.push({ kind: 'intro', target: item.target, gloss: item.gloss });
  }

  // 2) escolher o significado (tradução)
  for (const item of pick(difficulty === 'easy' ? 3 : 4)) {
    const distractors = vocab
      .filter((v) => v !== item)
      .slice(0, difficulty === 'hard' ? 3 : 2)
      .map((v) => ({ text: v.gloss, correct: false }));
    activities.push({
      kind: 'meaning',
      prompt: item.target,
      speak: item.target,
      options: [{ text: item.gloss, correct: true }, ...distractors],
    });
  }

  // 3) toque no que você ouve (TTS fala o termo, criança escolhe o termo certo)
  for (const item of pick(difficulty === 'easy' ? 2 : 3)) {
    const distractors = vocab
      .filter((v) => v !== item)
      .slice(0, 2)
      .map((v) => ({ text: v.target, correct: false }));
    activities.push({
      kind: 'hear',
      speak: item.target,
      options: [{ text: item.target, correct: true }, ...distractors],
    });
  }

  // 4) pares (match) — médio/difícil
  if (difficulty !== 'easy') {
    activities.push({ kind: 'match', pairs: pick(4).map((v) => ({ target: v.target, gloss: v.gloss })) });
  }

  // 5) completar a frase — médio/difícil
  if (difficulty !== 'easy') {
    for (const phrase of pick(2)) {
      if (!phrase.blank) continue;
      activities.push({
        kind: 'complete',
        prompt: phrase.blank.prompt,
        speak: phrase.blank.speak,
        options: phrase.blank.options,
      });
    }
  }

  return activities;
}

// Validação de integridade: cada gloss precisa cobrir os idiomas-base.
export function validateVocab(vocab, baseLangs = ['pt', 'en', 'es']) {
  for (const item of vocab) {
    for (const lang of baseLangs) {
      if (!item.gloss || !item.gloss[lang]) return `gloss faltando (${lang}) em "${item.target}"`;
    }
  }
  return null;
}
