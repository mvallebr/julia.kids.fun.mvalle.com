// Lógica pura do versionamento do cache do RPG, em script clássico.
// Este arquivo é importado pelo worker com importScripts; não é um módulo ESM,
// porque sw.js também é um service worker clássico. O pequeno adaptador UMD
// permite que o Node carregue exatamente este arquivo para os testes.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.JuliaKidsSwCacheName = api;
  }
}(typeof self !== 'undefined' ? self : globalThis, function () {
  const CACHE_PREFIX = 'julia-kids-runtime-';
  const APP_CACHE_PREFIX = `${CACHE_PREFIX}rpg-welling-`;
  const APP_PATH_PREFIX = '/rpg_welling/';
  const BUNDLE_PATH = '/rpg_welling/lib/bundle.js';
  const SHARED_RESOURCE_PATHS = Object.freeze([
    '/manifest.webmanifest',
    '/julia_world/fonts/fonts.css',
    '/julia_world/fonts/fredoka-latin.woff2',
    '/julia_world/fonts/luckiest-guy-latin.woff2',
  ]);
  const SHARED_RESOURCE_SET = new Set(SHARED_RESOURCE_PATHS);
  const SHARED_CACHE_NAME = `${APP_CACHE_PREFIX}shared`;
  const FALLBACK_VERSION = 'v1';
  const FALLBACK_CACHE_NAME = `${APP_CACHE_PREFIX}${FALLBACK_VERSION}`;
  const META_CACHE_NAME = `${APP_CACHE_PREFIX}meta`;

  function fallbackCacheName() {
    return {
      version: FALLBACK_VERSION,
      cacheName: FALLBACK_CACHE_NAME,
    };
  }

  // O caminho do RPG é explícito porque o registro do service worker cobre a
  // origem inteira. Estas quatro dependências são compartilhadas pelo RPG, mas
  // não pertencem a nenhum outro jogo e não podem girar o namespace sozinhas.
  function isAppPathname(pathname) {
    return typeof pathname === 'string'
      && (pathname === APP_PATH_PREFIX.slice(0, -1) || pathname.startsWith(APP_PATH_PREFIX));
  }

  function isSharedResourcePath(pathname) {
    return typeof pathname === 'string' && SHARED_RESOURCE_SET.has(pathname);
  }

  function isScopedResourcePath(pathname) {
    return isAppPathname(pathname) || isSharedResourcePath(pathname);
  }

  function urlOf(entry) {
    try {
      return new URL(entry, 'https://julia-kids.invalid');
    } catch {
      return null;
    }
  }

  function pathnameOf(entry) {
    const url = urlOf(entry);
    return url ? url.pathname : null;
  }

  function versionOfCacheName(cacheName) {
    return isNomeAtivoValido(cacheName)
      ? cacheName.slice(APP_CACHE_PREFIX.length)
      : null;
  }

  function bundleVersionOfEntry(entry) {
    const url = urlOf(entry);
    if (!url || url.pathname !== BUNDLE_PATH) return null;
    return url.searchParams.get('v') || null;
  }

  // Um cache só é reserva completa quando seu HTML e seu bundle principal
  // pertencem ao mesmo namespace. Um JavaScript auxiliar não substitui o
  // bundle principal, e uma query ?v= divergente também não completa a prova.
  function temReservaRpg(entries, versaoAtiva) {
    if (!Array.isArray(entries) || typeof versaoAtiva !== 'string' || !versaoAtiva) {
      return false;
    }

    const paths = entries.map(pathnameOf);
    const temHtml = paths.some((pathname) => (
      isAppPathname(pathname)
      && (pathname === APP_PATH_PREFIX || pathname.endsWith('.html')
        || !pathname.slice(pathname.lastIndexOf('/') + 1).includes('.'))
    ));
    const temBundle = entries.some((entry) => (
      bundleVersionOfEntry(entry) === versaoAtiva
    ));
    return temHtml && temBundle;
  }

  // O valor persistido precisa apontar para um cache deste app, mas nunca para
  // o próprio cache onde essa referência é gravada.
  function isNomeAtivoValido(cacheName) {
    return typeof cacheName === 'string'
      && cacheName.startsWith(APP_CACHE_PREFIX)
      && cacheName !== META_CACHE_NAME
      && cacheName !== SHARED_CACHE_NAME;
  }

  // Sem metadados, somente um único cache de runtime com HTML e JavaScript
  // permite saber qual reserva era a boa. O cache fixo é apenas destino seguro,
  // não um candidato que prove uma versão ativa; ambiguidade também precisa ser
  // conservadora para não apagar uma reserva possível.
  function reconstruirAtivo(chaves, reservasPorCache = {}, versoesPorCache = {}) {
    const candidatos = Array.isArray(chaves)
      ? chaves.filter((key) => (
        isNomeAtivoValido(key)
        && key !== FALLBACK_CACHE_NAME
        && temReservaRpg(reservasPorCache[key], versoesPorCache[key] || versionOfCacheName(key))
      ))
      : [];

    if (candidatos.length === 1) {
      return {
        cacheName: candidatos[0],
        known: true,
        source: 'keys',
      };
    }

    return {
      cacheName: FALLBACK_CACHE_NAME,
      known: false,
      source: 'fallback',
    };
  }

  // Só uma resposta HTML completa, da própria origem e sem redirect pode
  // definir o namespace. O objeto simples mantém essa decisão testável sem
  // depender de Response no Node.
  function isUsableHtmlResponse(meta) {
    if (!meta || typeof meta !== 'object') return false;
    return meta.ok === true
      && meta.status === 200
      && meta.type === 'basic'
      && meta.redirected === false
      && typeof meta.contentType === 'string'
      && /^text\/html(?:\s*;|$)/i.test(meta.contentType.trim());
  }

  const STATIC_MIME_RULES = Object.freeze({
    '.html': /^text\/html(?:\s*;|$)/i,
    '.js': /^(?:text|application)\/(?:x-)?(?:java|ecma)script(?:\s*;|$)/i,
    '.css': /^text\/css(?:\s*;|$)/i,
    '.glb': /^model\/gltf-binary(?:\s*;|$)/i,
    '.png': /^image\/png(?:\s*;|$)/i,
    '.jpg': /^image\/jpeg(?:\s*;|$)/i,
    '.jpeg': /^image\/jpeg(?:\s*;|$)/i,
    '.webmanifest': /^application\/manifest\+json(?:\s*;|$)/i,
    '.woff2': /^font\/woff2(?:\s*;|$)/i,
    '.wasm': /^application\/wasm(?:\s*;|$)/i,
    '.map': /^application\/json(?:\s*;|$)/i,
    '.json': /^application\/json(?:\s*;|$)/i,
  });

  function isExpectedContentType(pathname, contentType, { navigation = false } = {}) {
    if (typeof pathname !== 'string' || typeof contentType !== 'string') return false;
    const normalized = pathname.toLowerCase();
    const lastSegment = normalized.slice(normalized.lastIndexOf('/') + 1);
    const extensionStart = lastSegment.lastIndexOf('.');
    const extension = extensionStart === -1 ? '' : lastSegment.slice(extensionStart);
    const isRoot = normalized === APP_PATH_PREFIX.slice(0, -1)
      || normalized === APP_PATH_PREFIX;
    const isUntypedNavigationPath = isAppPathname(normalized)
      && (isRoot || extension === '' || extension === '.html');
    if (navigation && isUntypedNavigationPath) {
      return /^text\/html(?:\s*;|$)/i.test(contentType.trim());
    }
    if (isRoot) return false;
    const rule = STATIC_MIME_RULES[extension];
    return Boolean(rule && rule.test(contentType.trim()));
  }

  // Mantido como alias para os chamadores antigos; o worker também usa a
  // função acima para JavaScript e todos os demais tipos mapeados.
  function isExpectedStaticContentType(pathname, contentType, options) {
    return isExpectedContentType(pathname, contentType, options);
  }

  // O caminho é propositalmente exato: um bundle em outro diretório não deve
  // trocar o cache deste RPG por engano. O grupo aceita os caracteres usuais de
  // versões geradas (data, sufixos e separadores) e exige ?v= não vazio.
  function deriveVersionedCacheName(html) {
    if (typeof html !== 'string') return null;
    const pattern = /<script\b[^>]*\ssrc\s*=\s*(["'])lib\/bundle\.js\?v=([A-Za-z0-9._-]+)\1/ig;
    const versions = new Set();
    let match;
    while ((match = pattern.exec(html)) !== null) versions.add(match[2]);
    if (versions.size !== 1) return null;
    return `${APP_CACHE_PREFIX}${[...versions][0]}`;
  }

  function deriveCacheName(html) {
    const cacheName = deriveVersionedCacheName(html);
    if (!cacheName) return fallbackCacheName();

    return {
      version: cacheName.slice(APP_CACHE_PREFIX.length),
      cacheName,
    };
  }

  // A função de rede fica fora da função pura: assim o fallback de fetch
  // quebrado pode ser verificado no Node sem simular uma janela ou Cache API.
  // Os metadados são validados antes de ler o corpo; assim uma resposta 206,
  // opaca, redirecionada ou de outro tipo nem precisa ser interpretada.
  async function resolveCacheName(loadHtml, resposta) {
    try {
      if (!isUsableHtmlResponse(resposta)) return fallbackCacheName();
      return deriveCacheName(await loadHtml());
    } catch {
      return fallbackCacheName();
    }
  }

  // Caches.keys() pertence à origem inteira. Mesmo dentro do prefixo geral,
  // só o namespace deste app pode ser removido, preservando outros RPGs da origem.
  function qualCacheApagar(chaves, cacheAtivo, cacheMeta = META_CACHE_NAME) {
    if (!Array.isArray(chaves) || !isNomeAtivoValido(cacheAtivo)) return [];
    return chaves.filter((key) => (
      typeof key === 'string'
      && key.startsWith(APP_CACHE_PREFIX)
      && key !== cacheAtivo
      && key !== cacheMeta
      && key !== SHARED_CACHE_NAME
    ));
  }

  // O plano é pura: abrir/gravar o cache novo e persistir os metadados ainda
  // ficam no worker, mas a lista de caches sob risco de remoção é decidida
  // somente depois de validar destino, ativo e namespace.
  function planejarRotacao(cacheDerivado, cacheAtivo, chaves, cacheMeta = META_CACHE_NAME) {
    const semRotacao = {
      shouldRotate: false,
      cacheToOpen: null,
      cacheNamesToDelete: [],
    };
    if (!isNomeAtivoValido(cacheDerivado) || !isNomeAtivoValido(cacheAtivo)) {
      return semRotacao;
    }
    if (cacheDerivado === cacheAtivo) return semRotacao;

    return {
      shouldRotate: true,
      cacheToOpen: cacheDerivado,
      cacheNamesToDelete: qualCacheApagar(chaves, cacheDerivado, cacheMeta),
    };
  }

  // A limpeza pós-rotação só é autorizada quando o cache ativo já comprova
  // HTML e JavaScript do RPG na mesma versão. Uma rotação interrompida
  // preserva uma reserva anterior, enquanto uma reserva completa remove
  // versões antigas.
  function planejarLimpezaPosRotacao(
    chaves,
    cacheAtivo,
    { reservaCompleta = false, cacheMeta = META_CACHE_NAME } = {},
  ) {
    if (!reservaCompleta || !isNomeAtivoValido(cacheAtivo)) {
      return {
        canClean: false,
        cacheNamesToDelete: [],
      };
    }

    return {
      canClean: true,
      cacheNamesToDelete: qualCacheApagar(chaves, cacheAtivo, cacheMeta),
    };
  }

  // O activate é fail-closed: sem uma prova explícita de reserva completa,
  // não apaga nenhum cache, mesmo quando o nome ativo é conhecido.
  function decidirLimpezaAtivacao(
    chaves,
    estadoAtivo,
    cacheMeta = META_CACHE_NAME,
    { reservaCompleta = false } = {},
  ) {
    if (!estadoAtivo || estadoAtivo.known !== true
      || !isNomeAtivoValido(estadoAtivo.cacheName)) {
      return {
        canClean: false,
        cacheNamesToDelete: [],
      };
    }

    return planejarLimpezaPosRotacao(chaves, estadoAtivo.cacheName, {
      reservaCompleta,
      cacheMeta,
    });
  }

  return Object.freeze({
    CACHE_PREFIX,
    APP_CACHE_PREFIX,
    APP_PATH_PREFIX,
    BUNDLE_PATH,
    SHARED_RESOURCE_PATHS,
    SHARED_CACHE_NAME,
    FALLBACK_CACHE_NAME,
    META_CACHE_NAME,
    isAppPathname,
    isSharedResourcePath,
    isScopedResourcePath,
    versionOfCacheName,
    bundleVersionOfEntry,
    isNomeAtivoValido,
    temReservaRpg,
    reconstruirAtivo,
    decidirLimpezaAtivacao,
    planejarLimpezaPosRotacao,
    isUsableHtmlResponse,
    isExpectedContentType,
    isExpectedStaticContentType,
    deriveCacheName,
    deriveVersionedCacheName,
    resolveCacheName,
    planejarRotacao,
    qualCacheApagar,
  });
}));
