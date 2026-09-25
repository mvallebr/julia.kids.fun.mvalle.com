// Testes das regras puras de enquadramento, distância e braço da câmera.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CAM_ASPECT_REF,
  CAM_DIST_PRODUCT_MAX,
  CAM_FIT_MAX,
  CAMERA_ARM_MARGIN,
  CAMERA_ARM_MIN,
  CAMERA_ARM_TINY,
  cameraDistance,
  cameraFit,
  safeArmDistance,
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
  const phoneDistance = cameraDistance(base, phoneFit, 1.45);
  assert.ok(phoneDistance > desktopDistance);
  assert.ok(phoneDistance <= ceiling);

  const standardPhoneDistance = cameraDistance(base, cameraFit(320 / 568), 1.45);
  const tallPhoneDistance = cameraDistance(base, cameraFit(320 / 900), 1.45);
  assert.ok(tallPhoneDistance > 0);
  assert.ok(tallPhoneDistance >= standardPhoneDistance);
  assert.ok(tallPhoneDistance <= ceiling);

  // Combinações claramente saturadas precisam parar no teto, não em zero.
  for (const [fit, zoom] of [[10, 10], [CAM_FIT_MAX, 1.45], [2, 2]]) {
    assert.ok(Math.abs(cameraDistance(base, fit, zoom) - ceiling) < 1e-12);
  }
});

test('cameraDistance valida base, fit, zoom e maxProduct', () => {
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
});

test('safeArmDistance aproveita espaço e bloqueia paredes coladas sem atravessá-las', () => {
  // Quando há espaço legítimo, o braço usa exatamente a folga da parede.
  for (const hitDistance of [2, 6]) {
    const result = safeArmDistance(hitDistance);
    assert.equal(result.roomy, true);
    assert.equal(result.dist, hitDistance - CAMERA_ARM_MARGIN);
  }
  assert.equal(safeArmDistance(2).dist, CAMERA_ARM_MIN);

  // Regressão do P1: uma parede próxima precisa zerar o braço, sem devolver
  // uma distância que colocaria a câmera do outro lado da superfície.
  for (const hitDistance of [0.1, 0.4, 0.65]) {
    const result = safeArmDistance(hitDistance);
    assert.equal(result.blocked, true);
    assert.equal(result.dist, 0);
    assert.ok(result.dist <= hitDistance);
  }
});

test('safeArmDistance respeita o limite exato e nunca passa da superfície', () => {
  const limit = CAMERA_ARM_MARGIN + CAMERA_ARM_TINY;
  const atLimit = safeArmDistance(limit);
  assert.equal(atLimit.blocked, true);
  assert.equal(atLimit.dist, 0);

  const aboveLimit = safeArmDistance(limit + 0.01);
  assert.equal(aboveLimit.blocked, false);
  assert.ok(aboveLimit.dist <= limit + 0.01);

  // Varredura determinística de toda a faixa sensível, de 0 a 5 m.
  for (let step = 0; step <= 100; step += 1) {
    const hitDistance = step * 0.05;
    assert.ok(safeArmDistance(hitDistance).dist <= hitDistance, `hit ${hitDistance}`);
  }

  assert.throws(() => safeArmDistance(-0.01), RangeError);
  assert.throws(() => safeArmDistance(NaN), RangeError);
});
