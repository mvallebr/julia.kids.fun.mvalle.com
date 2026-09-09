# Julia's World 🌍

Atlas 3D interativo do mundo (globe.gl + three.js) feito para a Julia explorar
países, cidades e seus projetos.

**No ar em:** <https://julia.kids.fun.mvalle.com>

## Estrutura

- `index.html` — página única (HTML + CSS + JS, sem framework)
- `src/` — código-fonte do app (empacotado com esbuild)
- `lib/` — bundle gerado (`app.bundle.js`), commitado pois o Pages serve direto da branch
- `data/` — dados geográficos (`earth-data.js` gerado por `tools/build.mjs`)
- `fonts/` — fontes self-hosted (Fredoka, Luckiest Guy)
- `tools/` — scripts de build e dados de origem (fun facts, lugares, cidades)

## Desenvolvimento

```sh
npm install
npm run build      # regenera data/earth-data.js e lib/app.bundle.js
npx serve .        # ou abra o index.html diretamente
```

## Deploy

GitHub Pages serve a branch `main` na raiz do repositório (sem CI — o bundle
vai commitado). Push em `main` = site atualizado.

- Domínio custom: arquivo `CNAME` na raiz.
- DNS: registro CNAME gerenciado em `~/git/human_cdk` (`HumanDnsStack`).
