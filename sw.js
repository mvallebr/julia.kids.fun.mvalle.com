// Service worker do site (raiz) — cache de runtime, sem pre-cache pesado.
// Navegação e bundles JS usam network-first; os demais estáticos usam
// cache-first. Os arquivos estáticos não são todos imutáveis: quando uma cópia
// já está no cache, uma alteração sem query pode ficar antiga para quem volta.
// ATENÇÃO: este worker NÃO valida releases. Um deploy ruim que responda 200
// será promovido para o cache, mesmo sem validação de conteúdo. A proteção
// contra esse cenário é a verificação de bundle fresco no CI somada ao smoke
// test, não este arquivo.
//
// O registro em /sw.js dá escopo / e, portanto, este worker controla o
// launcher, o RPG e qualquer outra página desta origem. Esse raio de ação é um
// risco aceito porque o caminho de registro pertence à raiz do repositório:
// mudar o arquivo para reduzir o escopo alteraria o registro do RPG. Para não
// trocar o worker no meio de abas abertas, também não usamos skipWaiting nem
// clients.claim; uma versão nova espera as abas atuais fecharem antes de
// assumir a próxima navegação.
const CACHE_PREFIX = 'julia-kids-runtime-';
const CACHE = `${CACHE_PREFIX}rpg-welling-v1`;

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Só removemos caches deste worker. Caches.keys() é do origin inteiro;
    // apagar qualquer chave fora deste prefixo destruiria o cache de outro app.
    for (const key of await caches.keys()) {
      if (key.startsWith(CACHE_PREFIX) && key !== CACHE) await caches.delete(key);
    }
  })());
});

function isBasicComplete(response) {
  // 206 pode ser uma resposta parcial e 200 não garante que o corpo seja o
  // artefato esperado. Exigir 200 completo evita substituir uma cópia boa por
  // uma resposta parcial ou por uma página de erro servida com status HTTP 200.
  return Boolean(response && response.ok && response.status === 200 && response.type === 'basic');
}

function contentTypeIs(response, pattern) {
  return pattern.test((response.headers.get('content-type') || '').toLowerCase());
}

function isJavaScript(response) {
  return isBasicComplete(response) && contentTypeIs(
    response,
    /^(text|application)\/(x-)?(java|ecma)script\b/,
  );
}

function isHtml(response) {
  return isBasicComplete(response) && contentTypeIs(response, /^text\/html\b/);
}

async function samePathFallback(request, { ignoreSearch = false } = {}) {
  const cache = await caches.open(CACHE);
  if (!ignoreSearch) return cache.match(request);

  // O launcher muda ?name, ?avatar, ?language e ?v. A reserva offline deve
  // ignorar esses parâmetros, mas nunca procurar uma página de outro caminho.
  const url = new URL(request.url);
  url.search = '';
  url.hash = '';
  const samePathRequest = new Request(url.toString(), { method: 'GET' });
  return cache.match(samePathRequest, { ignoreSearch: true });
}

async function putComplete(request, response) {
  try {
    const cache = await caches.open(CACHE);
    await cache.put(request, response);
  } catch {
    // Uma falha de Cache API não deve transformar uma resposta de rede em uma
    // tela de erro; a próxima navegação ainda poderá tentar a rede de novo.
  }
}

async function replaceByPath(request, response) {
  if (!isJavaScript(response)) return response;

  try {
    const cache = await caches.open(CACHE);
    // Coloca a resposta nova antes de remover variantes antigas. Se a gravação
    // falhar, a cópia anterior continua disponível para a reserva offline.
    await cache.put(request, response.clone());
    const pathname = new URL(request.url).pathname;
    for (const key of await cache.keys()) {
      const oldUrl = new URL(key.url);
      if (
        oldUrl.origin === self.location.origin
        && oldUrl.pathname === pathname
        && oldUrl.href !== request.url
      ) {
        await cache.delete(key);
      }
    }
  } catch {
    // Não apagamos a variante antiga quando a atualização do cache falhou.
  }
  return response;
}

async function networkFirst(request, { replaceByPathEntries = false, ignoreSearchFallback = false, contentType = null } = {}) {
  let fresh;
  try {
    fresh = await fetch(request);
  } catch {
    return (await samePathFallback(request, { ignoreSearch: ignoreSearchFallback })) || Response.error();
  }

  const cacheable = contentType === 'javascript'
    ? isJavaScript(fresh)
    : contentType === 'html'
      ? isHtml(fresh)
      : isBasicComplete(fresh);

  if (cacheable) {
    if (replaceByPathEntries) return await replaceByPath(request, fresh);
    await putComplete(request, fresh.clone());
    return fresh;
  }

  // HTTP de erro, resposta parcial ou tipo de conteúdo inesperado não pode
  // sobrescrever uma cópia boa. Se houver uma cópia do mesmo caminho, ela é a
  // reserva mais segura para uma criança que está offline ou vendo uma falha.
  return (await samePathFallback(request, { ignoreSearch: ignoreSearchFallback })) || fresh;
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  let fresh;
  try {
    fresh = await fetch(request);
  } catch {
    return Response.error();
  }
  if (isBasicComplete(fresh)) await putComplete(request, fresh.clone());
  return fresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // APIs de terceiros passam direto

  if (request.mode === 'navigate') {
    // HTML: rede primeiro; offline, somente o mesmo pathname, sem query.
    event.respondWith(networkFirst(request, { ignoreSearchFallback: true, contentType: 'html' }));
    return;
  }

  // JS é app shell mutável: tenta a rede primeiro e só aceita JavaScript
  // completo para substituir uma variante ?v= antiga do mesmo caminho.
  if (request.destination === 'script' || url.pathname.endsWith('.js')) {
    event.respondWith(networkFirst(request, {
      replaceByPathEntries: true,
      ignoreSearchFallback: true,
      contentType: 'javascript',
    }));
    return;
  }

  event.respondWith(cacheFirst(request));
});
