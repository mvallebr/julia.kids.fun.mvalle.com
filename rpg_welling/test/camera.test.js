// Testes das regras puras de enquadramento e distância da câmera. O corte do
// braço (safeArmDistance) foi removido do módulo: hoje o que está na frente da
// câmera é esmaecido (src/occlusion.js), e a câmera vai sempre à distância
// pedida — limitada só pelo piso e pelo teto do produto fit×zoom, testados aqui.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CAM_ASPECT_REF,
  CAM_DIST_PRODUCT_MAX,
  CAM_DIST_PRODUCT_MIN,
  CAM_FIT_MAX,
  cameraDistance,
  cameraFit,
} from '../src/camera.js';

test('cameraFit mantém telas largas em 1 e limita o afastamento das telas estreitas', () => {
  for (const aspect of [CAM_ASPECT_REF, 21 / 9, 32 / 9]) {
    assert.equal(cameraFit(aspect), 1);
  }

  assert.ok(cameraFit(390 / 844) > 1.8);
  assert.ok(cameraFit(320 / 568) <= CAM_FIT_MAX);
  assert.equal(cameraFit(320 / 900), CAM_FIT_MAX);

  // Um aspecto inutilizável não pode aumentar nem reduzir a distância.
  for (const aspect of [0, -1, NaN]) {
    assert.equal(cameraFit(aspect), 1);
  }
});

test('cameraDistance compõe fit e zoom sem ultrapassar o teto do afastamento', () => {
  const base = 11.2;
  const ceiling = base * CAM_DIST_PRODUCT_MAX;
  const desktopDistance = cameraDistance(base, cameraFit(16 / 9), 1);
  assert.ok(Math.abs(desktopDistance - 11.2) < 1e-12);

  const phoneFit = cameraFit(390 / 844);
  const phoneDistance = cameraDistance(base, phoneFit, 1.8);
  assert.ok(phoneDistance > desktopDistance);
  assert.ok(phoneDistance <= ceiling);

  const standardPhoneDistance = cameraDistance(base, cameraFit(320 / 568), 1.8);
  const tallPhoneDistance = cameraDistance(base, cameraFit(320 / 900), 1.8);
  assert.ok(tallPhoneDistance > 0);
  assert.ok(tallPhoneDistance >= standardPhoneDistance);
  assert.ok(tallPhoneDistance <= ceiling);

  // Combinações claramente saturadas precisam parar no teto, não em zero.
  for (const [fit, zoom] of [[10, 10], [CAM_FIT_MAX, 1.8], [2, 2]]) {
    assert.ok(Math.abs(cameraDistance(base, fit, zoom) - ceiling) < 1e-12);
  }
});

test('cameraDistance tem piso: o zoom máximo de perto fica em ~3 m em qualquer tela', () => {
  const base = 11.2;
  const floor = base * CAM_DIST_PRODUCT_MIN;

  // Desktop (fit = 1): 0.14 < 0.27 → o piso segura a distância mínima.
  assert.ok(Math.abs(cameraDistance(base, 1, 0.14) - floor) < 1e-12);

  // Celular em pé: fit ~1.77–1.96 × 0.14 fica ABAIXO do piso — é exatamente
  // para esse caso que ele existe ("bem perto" não pode voltar a colar na nuca).
  assert.ok(cameraDistance(base, cameraFit(320 / 568), 0.14) === floor);
  assert.ok(cameraDistance(base, cameraFit(390 / 844), 0.14) > floor);

  // Zoom confortável nunca é afetado pelo piso (só o teto manda lá em cima).
  assert.ok(Math.abs(cameraDistance(base, 1, 1) - base) < 1e-12);
});

test('cameraDistance valida base, fit, zoom, maxProduct e minProduct', () => {
  for (const invalid of [NaN, Infinity, -Infinity]) {
    assert.throws(() => cameraDistance(invalid, 1, 1), TypeError);
    assert.throws(() => cameraDistance(11.2, invalid, 1), TypeError);
    assert.throws(() => cameraDistance(11.2, 1, invalid), TypeError);
  }

  for (const invalid of [0, -1]) {
    assert.throws(() => cameraDistance(invalid, 1, 1), RangeError);
    assert.throws(() => cameraDistance(11.2, invalid, 1), RangeError);
    assert.throws(() => cameraDistance(11.2, 1, invalid), RangeError);
  }
  for (const maxProduct of [0, -1]) {
    assert.throws(() => cameraDistance(11.2, 1, 1, { maxProduct }), RangeError);
  }
  for (const minProduct of [0, -1]) {
    assert.throws(() => cameraDistance(11.2, 1, 1, { minProduct }), RangeError);
  }

  // Piso e teto customizados: o piso segura produto abaixo dele e o teto
  // sempre manda quando os dois limites se cruzam.
  assert.ok(Math.abs(cameraDistance(10, 1, 1, { minProduct: 0.5 }) - 10) < 1e-12);
  assert.ok(Math.abs(cameraDistance(10, 0.4, 1, { minProduct: 0.5 }) - 5) < 1e-12);
  assert.ok(Math.abs(cameraDistance(10, 10, 1, { minProduct: 0.5, maxProduct: 2 }) - 20) < 1e-12);
});
