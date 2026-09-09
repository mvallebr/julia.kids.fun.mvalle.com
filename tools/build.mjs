// Gera data/earth-data.js (dados embutidos: geometria enxuta + metadados + curiosidades PT-BR)
// Fonte: Natural Earth 110m (data/world.geojson) + dr5hn countries (data/countries.json) + tools/funfacts.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const NE = read('data/world.geojson');
const COUNTRIES = read('data/countries.json');
const CITIES = read('data/cities.json');
const FUN = read('tools/funfacts.json');
const FUN_TRANSLATIONS = read('tools/fact-translations.json');
const PLACES = read('tools/places.json');



const CONT_PT = {
  Africa: 'África',
  Antarctica: 'Antártida',
  Asia: 'Ásia',
  Europe: 'Europa',
  'North America': 'América do Norte',
  Oceania: 'Oceania',
  'South America': 'América do Sul',
  'Seven seas (open ocean)': 'Oceanos',
};
const SUB_PT = {
  'Eastern Africa': 'África Oriental', 'Middle Africa': 'África Central',
  'Northern Africa': 'África do Norte', 'Southern Africa': 'África Austral',
  'Western Africa': 'África Ocidental', Caribbean: 'Caribe',
  'Central America': 'América Central', 'South America': 'América do Sul',
  'Northern America': 'América do Norte', 'Central Asia': 'Ásia Central',
  'Eastern Asia': 'Ásia Oriental', 'South-Eastern Asia': 'Sudeste Asiático',
  'Southern Asia': 'Ásia do Sul', 'Western Asia': 'Ásia Ocidental',
  'Australia and New Zealand': 'Austrália e Nova Zelândia',
  Melanesia: 'Melanésia', Micronesia: 'Micronésia', Polynesia: 'Polinésia',
  'Northern Europe': 'Norte da Europa', 'Southern Europe': 'Europa do Sul',
  'Eastern Europe': 'Europa Oriental', 'Western Europe': 'Europa Ocidental',
};

// nomes especiais do Natural Earth que não são países "normais"
const SPECIAL = {
  Antarctica: { pt: 'Antártida', emoji: '🐧' },
  'N. Cyprus': { pt: 'Chipre do Norte', emoji: '🇨🇾' },
  Somaliland: { pt: 'Somalilândia', emoji: '🌍' },
  'W. Sahara': { pt: 'Saara Ocidental', emoji: '🌍' },
  'Fr. S. Antarctic Lands': { pt: 'Terras Austrais Francesas', emoji: '🌍' },
  'Falkland Is.': { pt: 'Ilhas Malvinas', emoji: '🌍' },
};

// índices de busca
const byIso3 = new Map();
const byIso2 = new Map();
const byName = new Map();
for (const c of COUNTRIES) {
  if (c.iso3) byIso3.set(c.iso3.toUpperCase(), c);
  if (c.iso2) byIso2.set(c.iso2.toUpperCase(), c);
  if (c.name) byName.set(c.name.toLowerCase().replace(/[^a-z0-9]/g, ''), c);
}
const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const trPt = (c) => c.translations?.['pt-BR'] || c.translations?.pt || c.name;

const numPt = (x) => {
  if (x == null) return null;
  if (x >= 1e9) return `${(x / 1e9).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} bilhões`;
  if (x >= 1e6) return `${(x / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} milhões`;
  if (x >= 1e3) return `${(x / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil`;
  return x.toLocaleString('pt-BR');
};
const areaPt = (a) => {
  if (a == null) return null;
  if (a >= 1e6) return `${(a / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} milhões de km²`;
  return `${a.toLocaleString('pt-BR')} km²`;
};

function factsFallback(country, contPt, subPt) {
  const facts = [];
  if (country?.population != null && country.population > 0)
    facts.push(
      country.population >= 1e6
        ? `Tem cerca de ${numPt(country.population)} de habitantes.`
        : `Tem cerca de ${numPt(country.population)} habitantes.`
    );
  if (country?.capital) facts.push(`A capital é ${country.capital}.`);
  if (country?.area_sq_km) facts.push(`O território tem ${areaPt(country.area_sq_km)}.`);
  const reg = subPt || contPt;
  if (reg && facts.length < 3) facts.push(`Fica na região ${reg}.`);
  if (!facts.length) facts.push('Explore este lugar no mapa!');
  return facts;
}

const features = [];
const unmatched = [];
let curatedCount = 0;

const genericFacts = (country, continent, lang) => {
  const cont = {
    en: { Africa: 'Africa', Antarctica: 'Antarctica', Asia: 'Asia', Europe: 'Europe', 'North America': 'North America', Oceania: 'Oceania', 'South America': 'South America' },
    es: { Africa: 'África', Antarctica: 'Antártida', Asia: 'Asia', Europe: 'Europa', 'North America': 'Norteamérica', Oceania: 'Oceanía', 'South America': 'Sudamérica' },
  }[lang]?.[continent] || continent;
  const population = country?.population > 0 ? new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-ES', { maximumFractionDigits: 0, notation: 'compact' }).format(country.population) : null;
  const facts = [];
  if (population) facts.push(lang === 'en' ? `About ${population} people live here.` : `Aquí viven aproximadamente ${population} personas.`);
  if (country?.capital) facts.push(lang === 'en' ? `The capital is ${country.capital}.` : `La capital es ${country.capital}.`);
  facts.push(lang === 'en' ? `It is in ${cont}.` : `Está en ${cont}.`);
  return facts;
};
for (const f of NE.features) {

  const p = f.properties || {};
  const iso3 = p.iso_a3 && !p.iso_a3.startsWith('-') ? p.iso_a3.toUpperCase() : null;
  const iso2 = p.iso_a2 && !p.iso_a2.startsWith('-') ? p.iso_a2.toUpperCase() : null;
  const sp = SPECIAL[p.name];
  let country = null;
  if (iso3) country = byIso3.get(iso3);
  if (!country && iso2) country = byIso2.get(iso2);
  if (!country) country = byName.get(norm(p.name)) || byName.get(norm(p.name_long)) || byName.get(norm(p.geounit));

  const ptName = sp?.pt || trPt(country) || p.name;
  const emoji = sp?.emoji || country?.emoji || '🌍';
  const contPt = CONT_PT[p.continent] || (country ? (country.region === 'Americas' ? (['South America'].includes(country.subregion) ? 'América do Sul' : 'América do Norte') : CONT_PT[country.region]) : null) || 'Mundo';
  const subPt = SUB_PT[p.subregion] || SUB_PT[country?.subregion] || null;

  // Lugares curados têm nomes mais interessantes; os demais usam as cidades
  // mais populosas do GeoNames, sempre tentando manter a capital na lista.
  const placeSource = PLACES[iso3] || CITIES[iso3] || [];
  const places = [];
  const seenPlaces = new Set();
  const addPlace = (place) => {
    const name = typeof place === 'string' ? place : place?.n;
    if (!name) return;
    const key = norm(name);
    if (seenPlaces.has(key)) return;
    seenPlaces.add(key);
    places.push({
      n: name,
      w: typeof place === 'string' ? name : (place.w || name),
    });
  };
  for (const place of placeSource) addPlace(place);
  if (country?.capital && !PLACES[iso3]) addPlace({ n: country.capital });
  const placesForCountry = places.slice(0, 7);
  const translatedFacts = {};
  if (FUN_TRANSLATIONS[iso3]?.en) translatedFacts.en = FUN_TRANSLATIONS[iso3].en;
  if (FUN_TRANSLATIONS[iso3]?.es) translatedFacts.es = FUN_TRANSLATIONS[iso3].es;
  const generic = {
    en: genericFacts(country, p.continent, 'en'),
    es: genericFacts(country, p.continent, 'es'),
  };
  const names = {
    pt: ptName,
    en: country?.name || p.name,
    es: country?.translations?.es || country?.name || p.name,
  };


  // curiosidades: banco curado (por iso3 ou nome), senão fatos automáticos
  const keyIso = iso3 || norm(p.name).toUpperCase();
  let facts = FUN[iso3] || FUN[p.name] || FUN[norm(p.name).toUpperCase()] || FUN[keyIso];
  if (!facts && p.name === 'Antarctica') facts = FUN.ATA; // Antártida entra por nome
  let via = 'curado';
  if (!facts) {
    facts = factsFallback(country, contPt, subPt);
    via = 'auto';
    if (!country) unmatched.push(`${p.name} (iso3=${p.iso3})`);
  } else curatedCount++;

  features.push({
    type: 'Feature',
    id: iso3 || norm(p.name),
    properties: {
      i: iso3 || norm(p.name),
      n: ptName,
      nm: names,
      en: p.name,
      e: emoji,
      c: contPt,
      s: subPt,
      cap: country?.capital || null,
      pop: country?.population ?? null,
      area: country?.area_sq_km ?? null,
      f: facts,
      t: translatedFacts,
      g: generic,
      l: placesForCountry,
    },
    geometry: f.geometry,
  });

}
const out = {
  name: 'mundo',
  built: new Date().toISOString().slice(0, 10),
  features,
};

mkdirSync(join(root, 'data'), { recursive: true });
writeFileSync(join(root, 'data', 'earth-data.js'), `window.__EARTH__=${JSON.stringify(out)};\n`);
const size = (readFileSync(join(root, 'data', 'earth-data.js')).length / 1024).toFixed(0);
console.log(`earth-data.js: ${features.length} países, ${curatedCount} com curiosidades curadas (${size} kB)`);
if (unmatched.length) console.log('SEM correspondência no dataset (fatos genéricos):\n - ' + unmatched.join('\n - '));
