// Language Adventures — estado por jogadora (spec §15).

export const STORAGE_KEY = 'mundo-da-julia.languageadventures.v1';

export const COSMETICS = [
  { id: 'crown', name: { pt: 'Coroa', en: 'Crown', es: 'Corona' }, emoji: '👑' },
  { id: 'hat', name: { pt: 'Chapéu de festa', en: 'Party hat', es: 'Sombrero de fiesta' }, emoji: '🎩' },
  { id: 'glasses', name: { pt: 'Óculos', en: 'Glasses', es: 'Gafas' }, emoji: '👓' },
  { id: 'cape', name: { pt: 'Capa', en: 'Cape', es: 'Capa' }, emoji: '🦸' },
  { id: 'scarf', name: { pt: 'Cachecol', en: 'Scarf', es: 'Bufanda' }, emoji: '🧣' },
  { id: 'badge', name: { pt: 'Medalha', en: 'Badge', es: 'Medalla' }, emoji: '🏅' },
];

export function emptyState() {
  return {
    version: 1,
    targetLanguage: '',
    completedLessons: [], // ids de lições concluídas
    stars: {}, // lessonId → 1..3
    unlockedCosmetics: [], // ids na ordem de desbloqueio
    equippedCosmetics: [],
    pronunciationAttempts: {}, // itemId → tentativas
    sound: true,
  };
}

export function normalizeState(value = {}) {
  const source = value && typeof value === 'object' ? value : {};
  const state = emptyState();
  state.targetLanguage = typeof source.targetLanguage === 'string' ? source.targetLanguage.slice(0, 8) : '';
  state.completedLessons = (Array.isArray(source.completedLessons) ? source.completedLessons : [])
    .filter((id) => typeof id === 'string').slice(0, 500);
  if (source.stars && typeof source.stars === 'object') {
    for (const [id, stars] of Object.entries(source.stars)) {
      const value = Math.max(0, Math.min(3, Math.floor(stars) || 0));
      if (value > 0) state.stars[id] = value;
    }
  }
  state.unlockedCosmetics = (Array.isArray(source.unlockedCosmetics) ? source.unlockedCosmetics : [])
    .filter((id) => COSMETICS.some((c) => c.id === id));
  state.equippedCosmetics = (Array.isArray(source.equippedCosmetics) ? source.equippedCosmetics : [])
    .filter((id) => state.unlockedCosmetics.includes(id));
  if (source.pronunciationAttempts && typeof source.pronunciationAttempts === 'object') {
    for (const [id, attempts] of Object.entries(source.pronunciationAttempts)) {
      state.pronunciationAttempts[id] = Math.max(0, Math.min(999, Math.floor(attempts) || 0));
    }
  }
  state.sound = source.sound !== false;
  return state;
}

function profileKey(name) {
  return String(name || '').trim().toLowerCase().slice(0, 32);
}

export function loadState(storage, player) {
  const key = profileKey(player);
  if (!key) return normalizeState();
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    return normalizeState(all[key]);
  } catch {
    return normalizeState();
  }
}

export function saveState(storage, player, state) {
  const key = profileKey(player);
  if (!key) return state;
  try {
    const all = JSON.parse(storage.getItem(STORAGE_KEY) || '{}') || {};
    all[key] = normalizeState(state);
    storage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // armazenamento bloqueado: segue em sessão
  }
  return state;
}

// Conclui uma lição: registra estrelas, desbloqueia cosmético por progresso.
// Retorna { newCosmetic } quando algo desbloqueia (spec §14).
export function completeLesson(state, lessonId, stars, cosmeticsOrder) {
  if (!state.stars[lessonId] || state.stars[lessonId] < stars) state.stars[lessonId] = stars;
  if (!state.completedLessons.includes(lessonId)) state.completedLessons.push(lessonId);

  let newCosmetic = null;
  const doneCount = state.completedLessons.length;
  // 1 cosmético a cada 2 lições concluídas (6 itens em ~12 lições)
  const shouldHaveUnlocked = Math.min(cosmeticsOrder.length, Math.floor(doneCount / 2));
  while (state.unlockedCosmetics.length < shouldHaveUnlocked) {
    const nextId = cosmeticsOrder[state.unlockedCosmetics.length];
    if (!nextId || state.unlockedCosmetics.includes(nextId)) break;
    state.unlockedCosmetics.push(nextId);
    newCosmetic = nextId;
  }
  return { newCosmetic };
}

export function totalStars(state) {
  return Object.values(state.stars || {}).reduce((sum, value) => sum + value, 0);
}
