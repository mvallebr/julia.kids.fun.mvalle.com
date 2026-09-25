// Testes da parte pura do versionamento do cache do service worker.
// O helper é um script clássico para poder ser carregado por importScripts no
// navegador e, ao mesmo tempo, carregado diretamente pelo Node sem DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  CACHE_PREFIX,
  APP_CACHE_PREFIX,
  FALLBACK_CACHE_NAME,
  META_CACHE_NAME,
  APP_PATH_PREFIX,
  SHARED_RESOURCE_PATHS,
  SHARED_CACHE_NAME,
  isAppPathname,
  isScopedResourcePath,
  isSharedResourcePath,
  versionOfCacheName,
  bundleVersionOfEntry,
  temReservaRpg,
  deriveCacheName,
  deriveVersionedCacheName,
  isNomeAtivoValido,
  isUsableHtmlResponse,
  isExpectedContentType,
  isExpectedStaticContentType,
  resolveCacheName,
  reconstruirAtivo,
  decidirLimpezaAtivacao,
  planejarLimpezaPosRotacao,
  planejarRotacao,
  qualCacheApagar,
} = require('../../sw-cache-name.js');

test('delimita o escopo de pathname do RPG', () => {
  assert.equal(APP_PATH_PREFIX, '/rpg_welling/');
  assert.equal(isAppPathname('/rpg_welling/index.html'), true);
  assert.equal(isAppPathname('/rpg_welling/'), true);
  assert.equal(isAppPathname('/rpg_welling'), true);
  assert.equal(isAppPathname('/maths_adventure/index.html'), false);
  assert.equal(isAppPathname('/rpg_welling-other/index.html'), false);
});

test('reconstrói somente com HTML e JavaScript comprováveis', () => {
  const cacheEsperado = `${APP_CACHE_PREFIX}release-42`;

  assert.equal(temReservaRpg([
    '/rpg_welling/index.html',
    '/rpg_welling/lib/bundle.js?v=release-42',
  ], 'release-42'), true);
  assert.equal(temReservaRpg(['/rpg_welling/index.html'], 'release-42'), false);
  assert.deepEqual(reconstruirAtivo([cacheEsperado]), {
    cacheName: FALLBACK_CACHE_NAME,
    known: false,
    source: 'fallback',
  });
  assert.deepEqual(reconstruirAtivo([cacheEsperado], {
    [cacheEsperado]: [
      '/rpg_welling/index.html',
      '/rpg_welling/lib/bundle.js?v=release-42',
    ],
  }), {
    cacheName: cacheEsperado,
    known: true,
    source: 'keys',
  });
});

test('a reserva exige bundle principal com a versão do HTML', () => {
  const html = '/rpg_welling/index.html';
  const bundle42 = '/rpg_welling/lib/bundle.js?v=release-42';
  const bundle41 = '/rpg_welling/lib/bundle.js?v=release-41';
  const auxiliar = '/rpg_welling/lib/auxiliar.js?v=release-42';

  assert.equal(temReservaRpg([html, bundle41], 'release-42'), false);
  assert.equal(temReservaRpg([html, auxiliar], 'release-42'), false);
  assert.equal(temReservaRpg([html, bundle42], 'release-42'), true);
  assert.equal(temReservaRpg(['/rpg_welling/capitulo/1', bundle42], 'release-42'), true);
  assert.equal(bundleVersionOfEntry(bundle42), 'release-42');
  assert.equal(versionOfCacheName(`${APP_CACHE_PREFIX}release-42`), 'release-42');
});

test('as dependências compartilhadas do RPG são explícitas e não abrem escopo de rotação', () => {
  assert.deepEqual(SHARED_RESOURCE_PATHS, [
    '/manifest.webmanifest',
    '/julia_world/fonts/fonts.css',
    '/julia_world/fonts/fredoka-latin.woff2',
    '/julia_world/fonts/luckiest-guy-latin.woff2',
  ]);
  assert.equal(isSharedResourcePath('/manifest.webmanifest'), true);
  assert.equal(isSharedResourcePath('/maths_adventure/manifest.webmanifest'), false);
  assert.equal(isScopedResourcePath('/julia_world/fonts/fonts.css'), true);
  assert.equal(isScopedResourcePath('/maths_adventure/index.html'), false);
});

test('política de MIME ignora parâmetros e rejeita tipos inesperados', () => {
  const aceitos = [
    ['/rpg_welling/assets/scene.glb', 'model/gltf-binary; charset=binary'],
    ['/rpg_welling/assets/panel.png', 'image/png'],
    ['/rpg_welling/lib/bundle.js', 'application/javascript; charset=utf-8'],
    ['/manifest.webmanifest', 'application/manifest+json; charset=utf-8'],
    ['/julia_world/fonts/fonts.css', 'text/css; charset=utf-8'],
    ['/julia_world/fonts/fredoka-latin.woff2', 'font/woff2'],
    ['/rpg_welling/assets/module.wasm', 'application/wasm'],
    ['/rpg_welling/assets/module.wasm.map', 'application/json'],
    ['/rpg_welling/data/config.json', 'application/json; charset=utf-8'],
  ];
  for (const [pathname, contentType] of aceitos) {
    assert.equal(isExpectedStaticContentType(pathname, contentType), true, pathname);
  }
  for (const [pathname, contentType] of [
    ['/rpg_welling/assets/scene.glb', 'text/html'],
    ['/rpg_welling/assets/panel.png', 'text/plain'],
    ['/rpg_welling/lib/bundle.js', 'application/javascript+json'],
    ['/rpg_welling/lib/bundle.js', 'application/javascript-patch'],
    ['/manifest.webmanifest', 'text/html'],
    ['/julia_world/fonts/fonts.css', 'text/plain'],
    ['/julia_world/fonts/fredoka-latin.woff2', 'text/plain'],
  ]) {
    assert.equal(isExpectedContentType(pathname, contentType), false, `${pathname}: ${contentType}`);
    assert.equal(isExpectedStaticContentType(pathname, contentType), false, `${pathname}: ${contentType}`);
  }

  assert.equal(
    isExpectedContentType(
      '/rpg_welling/lib/bundle.js',
      'application/javascript; charset=utf-8',
    ),
    true,
  );
  assert.equal(
    isExpectedContentType('/rpg_welling/capitulo/1', 'text/html', { navigation: true }),
    true,
  );
  assert.equal(
    isExpectedContentType('/rpg_welling/capitulo/1', 'text/plain', { navigation: true }),
    false,
  );
  assert.equal(
    isExpectedContentType('/rpg_welling/capitulo/1', 'text/html'),
    false,
  );

  for (const pathname of [
    '/rpg_welling/lib/bundle.js',
    '/rpg_welling/assets/scene.glb',
    '/rpg_welling/assets/panel.png',
    '/rpg_welling/assets/panel.css',
    '/manifest.webmanifest',
    '/julia_world/fonts/fredoka-latin.woff2',
    '/rpg_welling/assets/module.wasm',
    '/rpg_welling/assets/module.wasm.map',
    '/rpg_welling/data/config.json',
  ]) {
    assert.equal(
      isExpectedContentType(pathname, 'text/html', { navigation: true }),
      false,
      `${pathname}: HTML não pode substituir recurso tipado`,
    );
  }
  assert.equal(isExpectedContentType('/rpg_welling', 'text/html'), false);
  assert.equal(isExpectedContentType('/rpg_welling/', 'text/html'), false);
  assert.equal(isExpectedContentType('/rpg_welling', 'text/html', { navigation: true }), true);
  assert.equal(isExpectedContentType('/rpg_welling/', 'text/html', { navigation: true }), true);
  assert.equal(isExpectedContentType('/rpg_welling/capitulo/1', 'text/html', { navigation: true }), true);
});

test('o cache compartilhado é persistente e nunca é candidato de limpeza', () => {
  assert.equal(SHARED_CACHE_NAME, `${APP_CACHE_PREFIX}shared`);
  assert.equal(isNomeAtivoValido(SHARED_CACHE_NAME), false);
  const active = `${APP_CACHE_PREFIX}release-42`;
  assert.deepEqual(qualCacheApagar([SHARED_CACHE_NAME, active, META_CACHE_NAME], active), []);
});

test('extrai a versão do bundle e deriva o cache do RPG', () => {
  const html = '<script defer src="lib/bundle.js?v=20260925.a_b-c"></script>';

  assert.deepEqual(deriveCacheName(html), {
    version: '20260925.a_b-c',
    cacheName: 'julia-kids-runtime-rpg-welling-20260925.a_b-c',
  });
});

test('não escolhe uma versão quando o HTML tem marcadores distintos', () => {
  const html = [
    '<!-- <script src="lib/bundle.js?v=antigo"></script> -->',
    '<script src="lib/bundle.js?v=atual"></script>',
  ].join('\n');

  assert.equal(deriveVersionedCacheName(html), null);
  assert.deepEqual(deriveCacheName(html), {
    version: 'v1',
    cacheName: FALLBACK_CACHE_NAME,
  });
});

test('aceita nos metadados apenas um cache do app diferente do cache de metadados', () => {
  const cacheVersionado = `${APP_CACHE_PREFIX}release-42`;

  assert.equal(META_CACHE_NAME, `${APP_CACHE_PREFIX}meta`);
  assert.equal(isNomeAtivoValido(cacheVersionado), true);
  assert.equal(isNomeAtivoValido(FALLBACK_CACHE_NAME), true);
  assert.equal(isNomeAtivoValido(META_CACHE_NAME), false);
  assert.equal(isNomeAtivoValido('julia-kids-runtime-outro-app-v9'), false);
  assert.equal(isNomeAtivoValido(null), false);
});

test('reconstrói um ativo persistente quando há exatamente um cache candidato', () => {
  const cacheEsperado = `${APP_CACHE_PREFIX}release-42`;

  assert.deepEqual(reconstruirAtivo([
    cacheEsperado,
    FALLBACK_CACHE_NAME,
    META_CACHE_NAME,
    'julia-kids-runtime-outro-app-v9',
  ], {
    [cacheEsperado]: [
      '/rpg_welling/index.html',
      '/rpg_welling/lib/bundle.js?v=release-42',
    ],
  }), {
    cacheName: cacheEsperado,
    known: true,
    source: 'keys',
  });
});

test('mantém o ativo desconhecido quando a reconstrução não encontra candidato', () => {
  assert.deepEqual(reconstruirAtivo([
    FALLBACK_CACHE_NAME,
    META_CACHE_NAME,
    'julia-kids-runtime-outro-app-v9',
  ]), {
    cacheName: FALLBACK_CACHE_NAME,
    known: false,
    source: 'fallback',
  });
});

test('mantém o ativo desconhecido quando a reconstrução é ambígua', () => {
  assert.deepEqual(reconstruirAtivo([
    `${APP_CACHE_PREFIX}release-42`,
    `${APP_CACHE_PREFIX}release-43`,
    META_CACHE_NAME,
  ]), {
    cacheName: FALLBACK_CACHE_NAME,
    known: false,
    source: 'fallback',
  });
});

test('aceita uma resposta HTML basic completa, local e sem redirect', () => {
  assert.equal(isUsableHtmlResponse({
    ok: true,
    status: 200,
    type: 'basic',
    redirected: false,
    contentType: 'text/html; charset=utf-8',
  }), true);
});

test('rejeita respostas HTML incompletas, opacas, redirecionadas ou de outro tipo', () => {
  const respostaValida = {
    ok: true,
    status: 200,
    type: 'basic',
    redirected: false,
    contentType: 'text/html',
  };
  const rejeicoes = [
    { ...respostaValida, status: 201 },
    { ...respostaValida, status: 203 },
    { ...respostaValida, status: 206 },
    { ...respostaValida, ok: false, status: 304 },
    { ...respostaValida, ok: false, status: 500 },
    { ...respostaValida, type: 'opaque' },
    { ...respostaValida, type: 'opaqueredirect' },
    { ...respostaValida, redirected: true },
    { ...respostaValida, contentType: undefined },
    { ...respostaValida, contentType: 'application/json' },
  ];

  for (const resposta of rejeicoes) {
    assert.equal(isUsableHtmlResponse(resposta), false);
  }
});

test('usa o nome fixo quando o marcador não existe', () => {
  const resultado = deriveCacheName('<script src="lib/outro.js"></script>');

  assert.equal(resultado.version, 'v1');
  assert.equal(resultado.cacheName, FALLBACK_CACHE_NAME);
});

test('usa o nome fixo quando a versão do marcador está vazia', () => {
  const resultado = deriveCacheName('<script src="lib/bundle.js?v="></script>');

  assert.equal(resultado.version, 'v1');
  assert.equal(resultado.cacheName, FALLBACK_CACHE_NAME);
});

test('usa o nome fixo quando o caminho do bundle é inesperado', () => {
  const resultado = deriveCacheName('<script src="/outro-lugar/lib/bundle.js?v=123"></script>');

  assert.equal(resultado.version, 'v1');
  assert.equal(resultado.cacheName, FALLBACK_CACHE_NAME);
});

test('a resposta inválida impede a leitura do corpo e mantém o cache fixo', async () => {
  let corpoFoiLido = false;
  const resultado = await resolveCacheName(async () => {
    corpoFoiLido = true;
    return '<script src="lib/bundle.js?v=release-42"></script>';
  }, {
    ok: true,
    status: 206,
    type: 'basic',
    redirected: false,
    contentType: 'text/html',
  });

  assert.equal(corpoFoiLido, false);
  assert.deepEqual(resultado, {
    version: 'v1',
    cacheName: FALLBACK_CACHE_NAME,
  });
});

test('usa o nome fixo quando a versão do marcador contém caracteres inválidos', () => {
  const resultado = deriveCacheName('<script src="lib/bundle.js?v=release/42"></script>');

  assert.equal(resultado.version, 'v1');
  assert.equal(resultado.cacheName, FALLBACK_CACHE_NAME);
});

test('usa o nome fixo quando não é possível buscar o HTML', async () => {
  const resultado = await resolveCacheName(async () => {
    throw new Error('indisponível');
  });

  assert.deepEqual(resultado, {
    version: 'v1',
    cacheName: FALLBACK_CACHE_NAME,
  });
});

test('não planeja rotação quando a versão derivada é igual ao ativo', () => {
  const cacheAtivo = `${APP_CACHE_PREFIX}release-42`;

  assert.deepEqual(planejarRotacao(cacheAtivo, cacheAtivo, [
    cacheAtivo,
    FALLBACK_CACHE_NAME,
    META_CACHE_NAME,
  ]), {
    shouldRotate: false,
    cacheToOpen: null,
    cacheNamesToDelete: [],
  });
});

test('planeja abrir o novo cache e só depois limpar os caches antigos', () => {
  const cacheAtivo = `${APP_CACHE_PREFIX}release-42`;
  const cacheNovo = `${APP_CACHE_PREFIX}release-43`;

  assert.deepEqual(planejarRotacao(cacheNovo, cacheAtivo, [
    cacheAtivo,
    FALLBACK_CACHE_NAME,
    META_CACHE_NAME,
    'julia-kids-runtime-outro-app-v9',
  ]), {
    shouldRotate: true,
    cacheToOpen: cacheNovo,
    cacheNamesToDelete: [cacheAtivo, FALLBACK_CACHE_NAME],
  });
});

test('uma rotação inválida não abre cache nem autoriza apagamento', () => {
  const cacheAtivo = `${APP_CACHE_PREFIX}release-42`;

  assert.equal(deriveVersionedCacheName('<script src="lib/bundle.js?v=release/inválido"></script>'), null);
  assert.deepEqual(planejarRotacao('julia-kids-runtime-outro-app-v9', cacheAtivo, [
    cacheAtivo,
    META_CACHE_NAME,
  ]), {
    shouldRotate: false,
    cacheToOpen: null,
    cacheNamesToDelete: [],
  });
});

test('o cache derivado fica no namespace exato do RPG e usa a versão esperada', () => {
  const versaoEsperada = 'release-42';
  const { cacheName } = deriveCacheName(`<script src="lib/bundle.js?v=${versaoEsperada}"></script>`);

  assert.equal(CACHE_PREFIX, 'julia-kids-runtime-');
  assert.equal(APP_CACHE_PREFIX, `${CACHE_PREFIX}rpg-welling-`);
  assert.equal(cacheName, `${APP_CACHE_PREFIX}${versaoEsperada}`);
});

test('a limpeza pós-rotação espera uma reserva HTML e JavaScript completa', () => {
  const cacheAtivo = `${APP_CACHE_PREFIX}release-42`;
  const chaves = [cacheAtivo, `${APP_CACHE_PREFIX}release-41`, META_CACHE_NAME];

  assert.deepEqual(planejarLimpezaPosRotacao(chaves, cacheAtivo, {
    reservaCompleta: false,
  }), {
    canClean: false,
    cacheNamesToDelete: [],
  });
  assert.deepEqual(planejarLimpezaPosRotacao(chaves, cacheAtivo, {
    reservaCompleta: true,
  }), {
    canClean: true,
    cacheNamesToDelete: [`${APP_CACHE_PREFIX}release-41`],
  });
});

test('uma falha de install não altera o ativo nem autoriza limpeza', () => {
  const cacheVersionado = `${APP_CACHE_PREFIX}release-42`;
  const chaves = [cacheVersionado, META_CACHE_NAME, FALLBACK_CACHE_NAME];

  // O install de sw.js só garante META_CACHE; esta decisão é o contrato que
  // impede activate de apagar uma reserva quando o ativo não pôde ser provado.
  assert.deepEqual(decidirLimpezaAtivacao(chaves, {
    cacheName: FALLBACK_CACHE_NAME,
    known: false,
    source: 'fallback',
  }), {
    canClean: false,
    cacheNamesToDelete: [],
  });
  assert.deepEqual(decidirLimpezaAtivacao(chaves, {
    cacheName: cacheVersionado,
    known: true,
    source: 'metadata',
  }), {
    canClean: false,
    cacheNamesToDelete: [],
  });
  assert.deepEqual(decidirLimpezaAtivacao(chaves, {
    cacheName: cacheVersionado,
    known: true,
    source: 'metadata',
  }, META_CACHE_NAME, { reservaCompleta: true }), {
    canClean: true,
    cacheNamesToDelete: [FALLBACK_CACHE_NAME],
  });
});

test('a limpeza apaga versões antigas deste worker, mas preserva outros apps', () => {
  const cacheAtivo = 'julia-kids-runtime-rpg-welling-release-42';
  const chaves = [
    cacheAtivo,
    META_CACHE_NAME,
    'julia-kids-runtime-rpg-welling-v1',
    'julia-kids-runtime-outro-app-v9',
    'cache-sem-o-prefixo-deste-worker',
  ];

  assert.deepEqual(qualCacheApagar(chaves, cacheAtivo), [
    'julia-kids-runtime-rpg-welling-v1',
  ]);
});
