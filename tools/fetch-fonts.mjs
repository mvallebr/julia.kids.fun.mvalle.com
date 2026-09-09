// Baixa fontes "divertidas" (Fredoka + Luckiest Guy) do Google Fonts, apenas subset latin,
// e escreve fonts/fonts.css + arquivos .woff2 — app fica 100% offline.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontsDir = join(root, 'fonts');
mkdirSync(fontsDir, { recursive: true });

const UA_CHROME =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const families = [
  { css: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap', file: 'fredoka-latin.woff2', cssFamily: "'Fredoka'", cssWeight: '300 700' },
  { css: 'https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap', file: 'luckiest-guy-latin.woff2', cssFamily: "'Luckiest Guy'", cssWeight: '400' },
];

const cssRules = [];
for (const fam of families) {
  const res = await fetch(fam.css, { headers: { 'user-agent': UA_CHROME } });
  if (!res.ok) throw new Error(`css2 ${res.status} para ${fam.css}`);
  const css = await res.text();
  // cada @font-face com unicode-range latin (U+0000-00FF) é um subset
  const blocks = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
  const latin = blocks.filter((b) => /unicode-range:\s*U\+0000-00FF/.test(b));
  if (!latin.length) throw new Error(`nenhum subset latin em ${fam.css}`);
  const src = latin[0].match(/url\((https:[^)]+\.woff2)\)/);
  if (!src) throw new Error(`url woff2 não encontrada em ${fam.css}`);
  const buf = Buffer.from(await (await fetch(src[1])).arrayBuffer());
  writeFileSync(join(fontsDir, fam.file), buf);
  console.log(`OK ${fam.file} (${(buf.length / 1024).toFixed(0)} kB)`);
  cssRules.push(`@font-face{font-family:${fam.cssFamily};font-style:normal;font-weight:${fam.cssWeight};font-display:swap;src:url('${fam.file}') format('woff2');}`);
}
writeFileSync(join(fontsDir, 'fonts.css'), cssRules.join('\n') + '\n');
console.log('fonts/fonts.css escrito');
