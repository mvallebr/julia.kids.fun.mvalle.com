// Service worker do site (raiz) — cache de runtime, sem pre-cache pesado.
// Navegação e bundles JS usam network-first; os demais estáticos usam
// cache-first. Os arquivos estáticos não são todos imutáveis: quando uma cópia
// já está no cache, uma alteração sem query pode ficar antiga para quem volta.
// ATENÇÃO: este worker NÃO valida releases. Uma resposta HTML 200 completa,
// local, sem redirect e com o marcador esperado ainda pode promover um deploy
// ruim para o cache. A proteção contra esse cenário é a verificação de bundle
// fresco no CI somada ao smoke test, não este arquivo.
//
// O registro em /sw.js dá escopo / e, portanto, este worker controla o
// launcher, o RPG e qualquer outra página desta origem. Esse raio de ação é um
// risco aceito porque o caminho de registro pertence à raiz do repositório:
// mudar o arquivo para reduzir o escopo alteraria o registro do RPG. Para não
// trocar o worker no meio de abas abertas, também não usamos skipWaiting nem
// clients.claim; uma versão nova espera as abas atuais fecharem antes de
// assumir a próxima navegação.

// sw.js é um script clássico; importScripts preserva esse contrato e o caminho
// é relativo à raiz onde este worker mora. O helper fica fora do RPG para não
// ser interpretado como módulo ESM pelo package.json local.
importScripts('./sw-cache-name.js');

const helpers = self.JuliaKidsSwCacheName;
const META_CACHE = helpers.META_CACHE_NAME;
const SHARED_CACHE = helpers.SHARED_CACHE_NAME;
const META_REQUEST = new Request(
  new URL('/__julia-kids-active-cache__', self.location.origin).toString(),
);

// O nome ativo fica em um cache separado porque globais de service worker são
// descartados quando o worker é encerrado. Esta promessa também evita que cada
// request releia metadados e reabra uma decisão concorrente.
let activeCachePromise = null;
let rotationChain = Promise.resolve();

async function inspectCoherentHtml(cacheName) {
  if (!helpers.isNomeAtivoValido(cacheName)) return null;
  try {
    if (!await caches.has(cacheName)) return null;
    const cache = await caches.open(cacheName);
    const entries = await cache.keys();
    const htmlRequests = entries.filter((entry) => {
      const pathname = new URL(entry.url).pathname;
      return helpers.isAppPathname(pathname)
        && (pathname === '/rpg_welling/' || pathname.endsWith('.html')
          || !pathname.slice(pathname.lastIndexOf('/') + 1).includes('.'));
    });
    for (const entry of htmlRequests) {
      const htmlRequest = new Request(entry.url, { method: 'GET', mode: 'navigate' });
      const htmlResponse = await cache.match(htmlRequest.url);
      if (!htmlResponse || !isCacheableResponse(htmlResponse, htmlRequest, 'html')) {
        continue;
      }
      const derivedCacheName = helpers.deriveVersionedCacheName(
        await htmlResponse.clone().text(),
      );
      if (derivedCacheName !== cacheName) continue;
      return {
        cacheName,
        version: helpers.versionOfCacheName(cacheName),
        entries: entries.map((entry) => entry.url),
      };
    }
  } catch {
    // Um cache ilegível não prova nem uma rotação em andamento.
  }
  return null;
}

async function inspectCompleteReserve(cacheName) {
  const coherent = await inspectCoherentHtml(cacheName);
  if (!coherent) return null;
  const { cacheName: coherentCacheName, version, entries } = coherent;
  if (!helpers.temReservaRpg(entries, version)) return null;

  const bundleEntry = entries.find((entry) => (
    helpers.bundleVersionOfEntry(entry) === version
  ));
  if (!bundleEntry) return null;
  try {
    const cache = await caches.open(coherentCacheName);
    const bundleResponse = await cache.match(bundleEntry);
    if (!bundleResponse) return null;
    const bundleRequest = new Request(bundleEntry, { method: 'GET' });
    if (!isCacheableResponse(bundleResponse, bundleRequest, 'javascript')) return null;
    if (!responseMatchesActiveVersion(bundleResponse, coherentCacheName)) return null;
    return coherent;
  } catch {
    // Uma reserva parcialmente legível não autoriza escolher outra versão.
    return null;
  }
}

async function resolveActiveState() {
  try {
    const metadataCache = await caches.open(META_CACHE);
    // A chave do Request é a fonte da verdade do Cache Storage. O construtor
    // Response deixa response.url vazio, e Cache.put() não preenche esse campo.
    const stored = await metadataCache.match(META_REQUEST);
    if (isUsableMetadataResponse(stored)) {
      const cacheName = await stored.text();
      if (helpers.isNomeAtivoValido(cacheName) && await caches.has(cacheName)) {
        const htmlCoherente = await inspectCoherentHtml(cacheName);
        if (htmlCoherente) {
          return {
            cacheName,
            known: true,
            source: 'metadata',
          };
        }
      }
    }
  } catch {
    // Metadados ausentes ou ilegíveis apenas acionam a reconstrução abaixo.
  }

  let keys = [];
  try {
    keys = await caches.keys();
  } catch {
    // Sem uma lista confiável, o estado fica desconhecido e o fallback é seguro.
  }

  const reservasPorCache = {};
  const versoesPorCache = {};
  for (const key of keys) {
    if (!helpers.isNomeAtivoValido(key) || key === META_CACHE) continue;
    const reserva = await inspectCompleteReserve(key);
    if (reserva) {
      reservasPorCache[key] = reserva.entries;
      versoesPorCache[key] = reserva.version;
    }
  }

  // Em estado ambíguo o runtime cai no fixo e pode servir uma cópia antiga em
  // silêncio; preservar os caches é preferível a escolher um namespace errado.
  return helpers.reconstruirAtivo(keys, reservasPorCache, versoesPorCache);
}

function getActiveState() {
  if (!activeCachePromise) activeCachePromise = resolveActiveState();
  return activeCachePromise;
}

async function getActiveCacheName() {
  const state = await getActiveState();
  return state.cacheName;
}

async function persistActiveName(cacheName) {
  if (!helpers.isNomeAtivoValido(cacheName)) throw new Error('nome de cache inválido');
  const metadataCache = await caches.open(META_CACHE);
  await metadataCache.put(
    META_REQUEST,
    new Response(cacheName, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }),
  );
}

self.addEventListener('install', (event) => {
  // O install é deliberadamente não destrutivo: só garante o cache de
  // metadados. Uma falha de instalação não escolhe um ativo nem limpa reservas.
  event.waitUntil(caches.open(META_CACHE));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // activate nunca escolhe um namespace. A limpeza só acontece quando a
    // resolução lazy provou um ativo; um estado desconhecido preserva tudo.
    const state = await getActiveState();
    const keys = await caches.keys();
    const reservaCompleta = await cacheHasCompleteReserve(state.cacheName);
    const decision = helpers.decidirLimpezaAtivacao(
      keys,
      state,
      META_CACHE,
      { reservaCompleta },
    );
    if (!decision.canClean) return;

    for (const key of decision.cacheNamesToDelete) await caches.delete(key);
  })());
});

function isBasicComplete(response) {
  // 206 pode ser uma resposta parcial e 200 não garante que o corpo seja o
  // artefato esperado. Exigir 200 completo evita substituir uma cópia boa por
  // uma resposta parcial ou por uma página de erro servida com status HTTP 200.
  return Boolean(response && response.ok && response.status === 200 && response.type === 'basic');
}

function isAppRequest(request) {
  try {
    return helpers.isScopedResourcePath(new URL(request.url).pathname);
  } catch {
    return false;
  }
}

function responseMeta(response) {
  return {
    ok: response.ok,
    status: response.status,
    type: response.type,
    redirected: response.redirected,
    contentType: response.headers.get('content-type'),
  };
}

function isUsableMetadataResponse(response) {
  if (!response || response.ok !== true || response.status !== 200
    || response.type !== 'basic' || response.redirected !== false) return false;
  return /^text\/plain(?:\s*;|$)/i.test(
    (response.headers.get('content-type') || '').trim(),
  );
}

function responseBelongsToApp(response, request) {
  if (!isAppRequest(request) || !response || response.redirected !== false
    || !isBasicComplete(response)) return false;
  try {
    const responseUrl = new URL(response.url);
    return responseUrl.origin === self.location.origin
      && helpers.isScopedResourcePath(responseUrl.pathname);
  } catch {
    return false;
  }
}

function isCacheableResponse(response, request, contentType = null) {
  // Uma única política de tipo vem do helper compartilhado. O sufixo do tipo
  // base é obrigatório: `+json` e `-patch` não são JavaScript válido para o
  // cache, mesmo começando com `application/javascript`.
  if (!responseBelongsToApp(response, request)) return false;
  const pathname = new URL(request.url).pathname;
  const expected = helpers.isExpectedContentType(
    pathname,
    response.headers.get('content-type'),
    { navigation: request.mode === 'navigate' && helpers.isAppPathname(pathname) },
  );
  if (contentType === 'html') {
    return expected && helpers.isUsableHtmlResponse(responseMeta(response));
  }
  return expected;
}

async function cacheHasCompleteReserve(cacheName) {
  const reserve = await inspectCompleteReserve(cacheName);
  return reserve !== null;
}

function isHtml(response, request) {
  return isCacheableResponse(response, request, 'html');
}

function isUsableCachedResponse(response, request) {
  return isCacheableResponse(response, request, isHtmlRequest(request) ? 'html' : null);
}

function requestMatchesReserveVersion(request, cacheName) {
  const url = new URL(request.url);
  if (url.pathname !== helpers.BUNDLE_PATH) return true;
  return url.searchParams.get('v') === helpers.versionOfCacheName(cacheName);
}

async function findCompleteReserveMatch(request, ignoreSearch) {
  let activeName;
  try {
    activeName = await getActiveCacheName();
  } catch {
    return undefined;
  }
  let keys;
  try {
    keys = await caches.keys();
  } catch {
    return undefined;
  }
  for (const cacheName of keys) {
    if (cacheName === activeName || !helpers.isNomeAtivoValido(cacheName)
      || cacheName === META_CACHE || !requestMatchesReserveVersion(request, cacheName)) {
      continue;
    }
    try {
      const reserve = await inspectCompleteReserve(cacheName);
      if (!reserve) continue;
      const cache = await caches.open(cacheName);
      const url = new URL(request.url);
      url.search = '';
      url.hash = '';
      const samePathRequest = new Request(url.toString(), { method: 'GET' });
      const match = await cache.match(ignoreSearch ? samePathRequest : request, {
        ignoreSearch,
      });
      if (match && isUsableCachedResponse(match, request)
        && (!isHtmlRequest(request)
          || await htmlResponseMatchesReserve(match, request, cacheName))) {
        return match;
      }
    } catch {
      // Uma falha de Cache API torna somente este candidato indisponível.
    }
  }
  return undefined;
}

function isHtmlRequest(request) {
  try {
    const pathname = new URL(request.url).pathname;
    return request.mode === 'navigate'
      || (helpers.isAppPathname(pathname) && pathname.endsWith('.html'));
  } catch {
    return false;
  }
}

async function htmlResponseMatchesReserve(response, request, cacheName) {
  if (!isHtmlRequest(request) || !isHtml(response, request)) return false;
  const derivedCacheName = helpers.deriveVersionedCacheName(
    await response.clone().text(),
  );
  return derivedCacheName === cacheName;
}

async function performSamePathFallback(request, { ignoreSearch = false } = {}) {
  // Fora do RPG a rede é não-cacheada; não abrir o ativo aqui evita criar um
  // cache vazio e impede que uma reserva de outro jogo toque no namespace.
  if (!isAppRequest(request)) return undefined;
  let activeName;
  try {
    activeName = await getActiveCacheName();
  } catch {
    // A resolução do ativo pode falhar; ainda tentamos as reservas antigas.
    activeName = undefined;
  }
  const precisaReservaCompleta = isHtmlRequest(request);
  let activeReservaCompleta = false;
  if (activeName && requestMatchesReserveVersion(request, activeName)) {
    try {
      activeReservaCompleta = !precisaReservaCompleta
        || await cacheHasCompleteReserve(activeName);
    } catch {
      activeReservaCompleta = false;
    }
  }
  if (activeName && activeReservaCompleta) {
    try {
      const cache = await caches.open(activeName);
      const url = new URL(request.url);
      url.search = '';
      url.hash = '';
      const samePathRequest = new Request(url.toString(), { method: 'GET' });
      const match = await cache.match(ignoreSearch ? samePathRequest : request, {
        ignoreSearch,
      });
      if (match && isUsableCachedResponse(match, request)
        && (!precisaReservaCompleta
          || await htmlResponseMatchesReserve(match, request, activeName))) {
        return match;
      }
    } catch {
      // O ativo pode estar indisponível; tenta uma reserva antiga abaixo.
    }
  }

  // A rotação pode deixar o ativo apenas com HTML. Uma reserva antiga só é
  // usada quando prova HTML e bundle da mesma versão, nunca HTML misturado.
  const reserva = await findCompleteReserveMatch(request, ignoreSearch);
  if (reserva) return reserva;
  return undefined;
}

function samePathFallback(request, options = {}) {
  // A leitura do ativo, a prova da reserva e a abertura do cache ficam na mesma
  // fila da rotação. Assim uma limpeza concorrente não pode apagar o namespace
  // entre a decisão e caches.open(), evitando recriar um cache órfão.
  const operation = rotationChain.then(
    () => performSamePathFallback(request, options),
    () => performSamePathFallback(request, options),
  );
  rotationChain = operation.catch(() => {});
  return operation;
}

async function putComplete(request, response) {
  // Sink de rede: o chamador deve ter aprovado isCacheableResponse() antes
  // de chegar aqui; recursos compartilhados usam o sink persistente abaixo.
  try {
    const pathname = new URL(request.url).pathname;
    if (helpers.isSharedResourcePath(pathname)) {
      await caches.open(SHARED_CACHE).then((cache) => cache.put(request, response));
    } else {
      if (!helpers.isAppPathname(pathname)) return;
      const cache = await caches.open(await getActiveCacheName());
      await cache.put(request, response);
    }
  } catch {
    // Uma falha de Cache API não deve transformar uma resposta de rede em uma
    // tela de erro; a próxima navegação ainda poderá tentar a rede de novo.
  }
}

async function performPutHtmlIfActive(request, response) {
  if (!isCacheableResponse(response, request, 'html')) return;
  try {
    const state = await getActiveState();
    const derivedName = helpers.deriveVersionedCacheName(await response.clone().text());
    if (derivedName !== state.cacheName) return;
    const cache = await caches.open(state.cacheName);
    await cache.put(request, response.clone());
  } catch {
    // Uma falha de Cache API preserva a resposta de rede sem apagar uma cópia.
  }
}

function putHtmlIfActive(request, response) {
  const operation = rotationChain.then(
    () => performPutHtmlIfActive(request, response),
    () => performPutHtmlIfActive(request, response),
  );
  rotationChain = operation.catch(() => {});
  return operation;
}

function responseMatchesActiveVersion(response, cacheName) {
  const url = new URL(response.url);
  if (url.pathname !== helpers.BUNDLE_PATH) return true;
  return url.searchParams.get('v') === helpers.versionOfCacheName(cacheName);
}

async function performReplaceByPath(request, response) {
  if (!isCacheableResponse(response, request, 'javascript')) return response;

  try {
    // A leitura e o put acontecem dentro da mesma cadeia de rotação. Releio o
    // ativo imediatamente antes do put para impedir que um bundle atrasado
    // seja gravado depois de outra navegação ter trocado a versão.
    const state = await getActiveState();
    const activeName = state.cacheName;
    if (!responseMatchesActiveVersion(response, activeName)) return response;
    const cache = await caches.open(activeName);
    if (!responseMatchesActiveVersion(response, activeName)) return response;

    // Este sink exige que a resposta já tenha passado por
    // isCacheableResponse(); a gravação nunca substitui uma resposta inválida.
    await cache.put(request, response.clone());
    const reserve = await inspectCompleteReserve(activeName);
    const keys = await caches.keys();
    const cleanup = helpers.planejarLimpezaPosRotacao(
      keys,
      activeName,
      { reservaCompleta: reserve !== null },
    );
    if (cleanup.canClean) {
      for (const key of cleanup.cacheNamesToDelete) await caches.delete(key);
    }

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

function replaceByPath(request, response) {
  // JS, verificação de reserva e limpeza compartilham a fila de rotação;
  // assim não há janela entre trocar o ativo e gravar o bundle.
  const operation = rotationChain.then(
    () => performReplaceByPath(request, response),
    () => performReplaceByPath(request, response),
  );
  rotationChain = operation.catch(() => {});
  return operation;
}

async function performHtmlRotation(request, response) {
  try {
    // O clone é lido somente depois de a resposta de HTML ter sido aceita.
    // A resposta original continua disponível para a navegação e para a
    // gravação no destino correto, sem contaminar a reserva antiga.
    const derivedName = helpers.deriveVersionedCacheName(await response.clone().text());
    if (!derivedName) return;
    try {
      if (!helpers.isAppPathname(new URL(request.url).pathname)) return;
    } catch {
      return;
    }
    try {
      if (!helpers.isAppPathname(new URL(response.url).pathname)) return;
    } catch {
      return;
    }

    const state = await getActiveState();
    const keys = await caches.keys();
    const plan = helpers.planejarRotacao(derivedName, state.cacheName, keys, META_CACHE);
    if (!plan.shouldRotate) {
      // Sem troca de namespace, o HTML pode atualizar o cache ativo. Quando
      // há rotação, o HTML só é gravado no destino novo para não contaminar a
      // reserva antiga que ainda será usada offline.
      if (derivedName === state.cacheName) {
        const activeCache = await caches.open(state.cacheName);
        await activeCache.put(request, response);
      }
      return;
    }

    // A nova reserva é gravada e persistida antes da troca de namespace. A
    // limpeza dos caches antigos fica adiada até o bundle ser gravado com
    // sucesso no cache ativo; assim uma navegação de JS offline ainda tem
    // uma reserva antiga disponível.
    const nextCache = await caches.open(plan.cacheToOpen);
    await nextCache.put(request, response);
    await persistActiveName(plan.cacheToOpen);
    activeCachePromise = Promise.resolve({
      cacheName: plan.cacheToOpen,
      known: true,
      source: 'metadata',
    });
  } catch {
    // Falha ao ler, abrir, gravar ou persistir não atualiza o ativo nem apaga
    // caches antigos. A próxima navegação poderá tentar a rotação novamente.
  }
}

function rotateHtmlCache(request, response) {
  // A cadeia serializa navegações simultâneas: cada decisão só começa depois
  // que a rotação anterior terminou de persistir o novo namespace.
  const operation = rotationChain.then(
    () => performHtmlRotation(request, response),
    () => performHtmlRotation(request, response),
  );
  rotationChain = operation.catch(() => {});
  return operation;
}

async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch {
    return Response.error();
  }
}

async function networkFirst(request, { replaceByPathEntries = false, ignoreSearchFallback = false, contentType = null } = {}) {
  // A política escolhida para os demais jogos é network-only: eles não leem,
  // não escrevem e não ativam o namespace do RPG.
  if (!isAppRequest(request)) return networkOnly(request);

  let fresh;
  try {
    fresh = await fetch(request);
  } catch {
    return (await samePathFallback(request, { ignoreSearch: ignoreSearchFallback })) || Response.error();
  }

  const cacheable = isCacheableResponse(fresh, request, contentType);

  if (cacheable) {
    if (contentType === 'html') {
      // O HTML é gravado no destino correto pela rotação serializada. Não o
      // pré-gravamos no ativo, para não misturar a versão nova com a reserva
      // antiga enquanto o bundle ainda não foi comprovado.
      await rotateHtmlCache(request, fresh.clone());
      return fresh;
    }
    if (replaceByPathEntries) return await replaceByPath(request, fresh);
    await putComplete(request, fresh.clone());
    return fresh;
  }

  // HTTP de erro, resposta parcial, redirect ou tipo de conteúdo inesperado
  // não pode sobrescrever uma cópia boa. Se houver uma cópia do mesmo caminho,
  // ela é a reserva mais segura para uma criança que está offline.
  return (await samePathFallback(request, { ignoreSearch: ignoreSearchFallback })) || fresh;
}

async function performCacheFirstLookup(request, shared) {
  const lookup = async () => {
    try {
      if (shared) {
        const cache = await caches.open(SHARED_CACHE);
        const cached = await cache.match(request);
        return {
          activeName: null,
          cache,
          cached: cached && isUsableCachedResponse(cached, request)
            ? cached : undefined,
        };
      }

      const activeName = await getActiveCacheName();
      const cache = await caches.open(activeName);
      let cached = await cache.match(request);
      if (cached && !isUsableCachedResponse(cached, request)) {
        cached = undefined;
      }
      if (cached && isHtmlRequest(request)
        && (!await cacheHasCompleteReserve(activeName)
          || !await htmlResponseMatchesReserve(cached, request, activeName))) {
        cached = undefined;
      }
      return { activeName, cache, cached };
    } catch {
      // Falha de leitura do Cache Storage não pode impedir uma tentativa de
      // rede. A escrita continua fail-closed nos sinks de cache.
      return { activeName: null, cache: null, cached: undefined };
    }
  };
  const operation = rotationChain.then(lookup, lookup);
  rotationChain = operation.catch(() => {});
  return operation;
}

async function cacheFirst(request) {
  if (!isAppRequest(request)) return networkOnly(request);

  const pathname = new URL(request.url).pathname;
  const shared = helpers.isSharedResourcePath(pathname);
  const { cache, cached } = await performCacheFirstLookup(request, shared);
  if (cached) return cached;

  let fresh;
  try {
    fresh = await fetch(request);
  } catch {
    if (shared) return Response.error();
    return (await samePathFallback(request)) || Response.error();
  }
  if (isCacheableResponse(fresh, request)) {
    if (isHtmlRequest(request)) await putHtmlIfActive(request, fresh.clone());
    else await putComplete(request, fresh.clone());
    return fresh;
  }
  if (shared) return fresh;
  return (await samePathFallback(request)) || fresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // APIs de terceiros passam direto
  if (!isAppRequest(request)) return; // outros jogos são deliberadamente network-only

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
