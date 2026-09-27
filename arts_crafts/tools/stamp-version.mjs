// Grava no index.html a versão do bundle, derivada do CONTEÚDO dele.
//
// Mesma lição do RPG (roadmap 0.2): sem isso, quem abre a página pode estar
// executando o bundle anterior — o teste passa, a tela é da versão velha, e o
// QA mente. A versão é o sha256 do arquivo que o GitHub Pages serve, não a data,
// porque uma data viraria todo dia mesmo sem o bundle mudar.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const bundlePath = join(appRoot, 'lib', 'bundle.js');
const htmlPath = join(appRoot, 'index.html');

const hash = createHash('sha256').update(readFileSync(bundlePath)).digest('hex').slice(0, 12);
const html = readFileSync(htmlPath, 'utf8');
const stamp = `lib/bundle.js?v=${hash}`;
const replaced = html.replace(/lib\/bundle\.js\?v=[A-Za-z0-9._-]*/, stamp);

if (replaced === html && !html.includes(stamp)) {
  console.error('não achei lib/bundle.js?v= no index.html — nada foi carimbado');
  process.exit(1);
}
if (replaced === html) {
  console.log(`?v= já é o hash do bundle: ${hash}`);
} else {
  writeFileSync(htmlPath, replaced);
  console.log(`?v= gravado: ${hash}`);
}
