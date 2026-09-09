// Gera data/cities.json a partir do dump cities15000 do GeoNames.
// Seleciona as seis maiores cidades por população e sempre tenta incluir a capital.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const countries = JSON.parse(readFileSync(join(root, 'data/countries.json'), 'utf8'));
const lines = readFileSync(join(root, 'data/cities15000.txt'), 'utf8').split('\n');
const norm = (s) => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const byIso2 = new Map(countries.map((c) => [c.iso2, c]));
const groups = new Map();
for (const line of lines) {
  if (!line.trim() || line.startsWith('#')) continue;
  const p = line.split('\t');
  if (p.length < 15) continue;
  const [id, name, asciiName, alternates, lat, lon, featureClass, featureCode, iso2] = p;
  const population = Number(p[14]) || 0;
  const c = byIso2.get(iso2);
  if (!c || !name) continue;
  if (!groups.has(c.iso3)) groups.set(c.iso3, []);
  groups.get(c.iso3).push({ n: name, p: population, lat: Number(lat), lon: Number(lon) });
}

const output = {};
for (const c of countries) {
  const all = groups.get(c.iso3) || [];
  all.sort((a, b) => b.p - a.p);
  const selected = [];
  const seen = new Set();
  const add = (city) => {
    const key = norm(city.n);
    if (!key || seen.has(key)) return;
    seen.add(key);
    selected.push(city);
  };
  const capitalKey = norm(c.capital);
  const capital = all.find((city) => norm(city.n) === capitalKey);
  if (capital) add(capital);
  for (const city of all) {
    if (selected.length >= 6) break;
    add(city);
  }
  if (!selected.length && c.capital) add({ n: c.capital, p: 0 });
  output[c.iso3] = selected.map(({ n, p }) => ({ n, p }));
}

writeFileSync(join(root, 'data/cities.json'), JSON.stringify(output));
console.log(`cities.json: ${Object.keys(output).length} países`);
