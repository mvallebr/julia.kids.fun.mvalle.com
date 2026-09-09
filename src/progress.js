const STORAGE_KEY = 'mundo-atlas.progress.v1';

export const CONTINENTS = Object.freeze([
  { id: 'africa', data: 'África', labelKey: 'continentAfrica', icon: '🌍' },
  { id: 'north-america', data: 'América do Norte', labelKey: 'continentNorthAmerica', icon: '🌎' },
  { id: 'south-america', data: 'América do Sul', labelKey: 'continentSouthAmerica', icon: '🌎' },
  { id: 'asia', data: 'Ásia', labelKey: 'continentAsia', icon: '🌏' },
  { id: 'europe', data: 'Europa', labelKey: 'continentEurope', icon: '🌍' },
  { id: 'oceania', data: 'Oceania', labelKey: 'continentOceania', icon: '🌊' },
  { id: 'antarctica', data: 'Antártida', labelKey: 'continentAntarctica', icon: '🧊' },
]);

export const EXPLORER_BADGES = Object.freeze([
  { id: 'mini-explorer', icon: '🧭', labelKey: 'badgeMini', places: 5 },
  { id: 'silver-explorer', icon: '🥈', labelKey: 'badgeSilver', places: 25 },
  { id: 'gold-explorer', icon: '🥇', labelKey: 'badgeGold', places: 75 },
]);

function cleanName(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, 32) : '';
}

function uniqueStrings(value) {
  return [...new Set(Array.isArray(value) ? value.filter((item) => typeof item === 'string' && item) : [])];
}

function normalizeProfile(value) {
  const name = cleanName(value?.name);
  if (!name) return null;
  return {
    name,
    visitedCountries: uniqueStrings(value?.visitedCountries),
    visitedPlaces: uniqueStrings(value?.visitedPlaces),
  };
}

export function emptyProgress() {
  return { players: [] };
}

export function normalizeProgress(value = {}) {
  const players = [];
  const seen = new Set();
  for (const candidate of Array.isArray(value?.players) ? value.players : []) {
    const profile = normalizeProfile(candidate);
    if (!profile) continue;
    const key = profile.name.toLocaleLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    players.push(profile);
  }
  return { players };
}

export function loadProgress(storage = window.localStorage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return normalizeProgress(raw ? JSON.parse(raw) : emptyProgress());
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress, storage = window.localStorage) {
  const normalized = normalizeProgress(progress);
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // A sessão pode continuar mesmo quando o armazenamento estiver bloqueado.
  }
  progress.players = normalized.players;
  return progress;
}

export function profileKey(name) {
  return cleanName(name).toLocaleLowerCase();
}

export function ensurePlayer(progress, name) {
  const clean = cleanName(name);
  if (!clean) return null;
  const key = profileKey(clean);
  let profile = progress.players.find((candidate) => profileKey(candidate.name) === key);
  if (!profile) {
    profile = { name: clean, visitedCountries: [], visitedPlaces: [] };
    progress.players.push(profile);
  } else {
    profile.name = clean;
  }
  return profile;
}

export function visitCountry(progress, name, countryId) {
  const profile = ensurePlayer(progress, name);
  const id = countryId == null ? '' : String(countryId);
  if (!profile || !id || profile.visitedCountries.includes(id)) return false;
  profile.visitedCountries.push(id);
  return true;
}

export function placeKey(countryId, place) {
  const country = countryId == null ? '' : String(countryId);
  const name = place?.w || place?.n || '';
  return name ? `${country}:${name}` : '';
}

export function visitPlace(progress, name, countryId, place) {
  const profile = ensurePlayer(progress, name);
  const key = placeKey(countryId, place);
  if (!profile || !key || profile.visitedPlaces.includes(key)) return false;
  profile.visitedPlaces.push(key);
  return true;
}

function countryIdForFeature(feature) {
  return String(feature.properties?.i ?? feature.properties?.n ?? '');
}

function continentData(features) {
  return CONTINENTS.map((continent) => {
    const countries = features.filter((feature) => feature.properties?.c === continent.data);
    return {
      ...continent,
      ids: countries.map(countryIdForFeature).filter(Boolean),
      placeKeys: countries.flatMap((feature) => (feature.properties?.l || []).map((place) => placeKey(countryIdForFeature(feature), place))),
    };
  });
}

export function continentProgress(profile, features) {
  const visitedCountries = new Set(profile?.visitedCountries || []);
  const visitedPlaces = new Set(profile?.visitedPlaces || []);
  return continentData(features).map((continent) => {
    const total = continent.ids.length;
    const visited = continent.ids.reduce((sum, id) => sum + (visitedCountries.has(id) ? 1 : 0), 0);
    const placesTotal = continent.placeKeys.length;
    const placesVisited = continent.placeKeys.reduce((sum, key) => sum + (visitedPlaces.has(key) ? 1 : 0), 0);
    return {
      ...continent,
      visited,
      total,
      placesVisited,
      placesTotal,
      complete: total > 0 && visited === total,
    };
  });
}

export function badgesFor(profile, features) {
  if (!profile) return [];
  const badges = [];
  for (const continent of continentProgress(profile, features)) {
    if (continent.complete) {
      badges.push({
        id: `continent-${continent.id}`,
        type: 'continent',
        icon: continent.icon,
        labelKey: 'badgeContinent',
        continentId: continent.id,
        continentLabelKey: continent.labelKey,
      });
    }
  }
  for (const badge of EXPLORER_BADGES) {
    if (profile.visitedPlaces.length >= badge.places) badges.push({ ...badge, type: 'explorer' });
  }
  const allCountries = continentData(features).flatMap((continent) => continent.ids);
  const visited = new Set(profile.visitedCountries);
  if (allCountries.length > 0 && allCountries.every((id) => visited.has(id))) {
    badges.push({ id: 'super-explorer', type: 'explorer', icon: '🌍', labelKey: 'badgeSuper' });
  }
  return badges;
}

export function stickerStats(profile) {
  const places = new Set(profile?.visitedPlaces || []).size;
  const bonus = (places >= 10 ? 5 : 0) + (places >= 50 ? 20 : 0);
  return {
    places,
    bonus,
    total: places + bonus,
  };
}

export function profileStats(profile, features) {
  const countries = new Set(profile?.visitedCountries || []).size;
  const places = new Set(profile?.visitedPlaces || []).size;
  const badges = badgesFor(profile, features);
  return {
    name: profile?.name || '',
    countries,
    places,
    badges,
    stickers: stickerStats(profile),
    continents: continentProgress(profile, features),
    score: places * 3 + badges.length * 100,
  };
}

export function rankingFor(progress, features) {
  return progress.players
    .map((profile) => profileStats(profile, features))
    .sort((a, b) => b.score - a.score || b.countries - a.countries || b.places - a.places || a.name.localeCompare(b.name));
}

export { STORAGE_KEY };
