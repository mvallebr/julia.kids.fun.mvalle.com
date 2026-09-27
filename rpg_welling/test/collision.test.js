// Testes da colisão da jogadora (src/collision.js).
//
// Estes testes não existiam antes da rodada 6: a função vivia dentro do
// main.js, fechava no `zone` do módulo e por isso era uma das duas razões de o
// main.js aparecer como "sem nenhum teste" no diagnóstico da fase 0. Com a
// zona virando parâmetro, a lógica de deslizar no canto — que é a que faz a
// menina não travar em cada esquina — finalmente pode ser conferida sem
// navegador.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PLAYER_RADIUS, circleHits, moveWithCollision } from '../src/collision.js';

const box = (minX, maxX, minZ, maxZ) => ({ minX, maxX, minZ, maxZ });
const zone = (colliders, bounds) => ({ colliders, bounds });

test('o raio da jogadora é o que o resto do jogo assume', () => {
  // buildNavGrid e o clamp do click-to-move usam este número; se ele mudar
  // aqui e não lá, a navegação e a colisão discordam do mesmo raio
  assert.equal(PLAYER_RADIUS, 0.35);
});

test('círculo fora da caixa não bate; dentro, bate', () => {
  const wall = box(2, 4, 0, 10);
  assert.equal(circleHits(0, 5, wall), false, 'longe demais');
  assert.equal(circleHits(5, 5, wall), false, 'do outro lado');
  assert.equal(circleHits(3, 5, wall), true, 'dentro da parede');
  // Tangente é do lado de FORA da caixa, a exatamente um raio da borda. Um
  // ponto a 2 + raio já está DENTRO da caixa (ela vai de 2 a 4), então ali a
  // colisão é óbvia e o teste não diria nada deolvido.
  assert.equal(circleHits(2 - PLAYER_RADIUS, 5, wall), false, 'tangente por fora não bate');
  assert.equal(circleHits(2 - PLAYER_RADIUS - 0.01, 5, wall), false, 'passou do raio');
  assert.equal(circleHits(2 - PLAYER_RADIUS + 0.01, 5, wall), true, 'um centímetro dentro do raio bate');
});

test('o canto é o ponto que a jogadora não pode atravessar', () => {
  //diagonal: o canto (4,10) é alcançável por dx e por dz, mas não pelos dois
  const corner = box(2, 4, 0, 10);
  assert.equal(circleHits(3.5, 9.5, corner), true, 'dentro do canto bate');
  // 0,2 + 0,2 dá distância 0,28 do canto, que é MENOR que o raio: ainda
  // colide. Para sair do raio é preciso mais de 0,35 de distância nos dois eixos.
  assert.equal(circleHits(4.2, 10.2, corner), true, 'ainda dentro do raio do canto');
  assert.equal(circleHits(4.5, 10.5, corner), false, '0,5 do canto em cada eixo: passou');
});

test('movimento livre quando não há colisor nem bounds', () => {
  const livre = zone([], null);
  assert.deepEqual(moveWithCollision(livre, 1, 1, 0.5, -0.5), [1.5, 0.5]);
});

test('eixo que bate é cancelado, o outro passa (desliza no canto)', () => {
  // parede vertical em x = 2; a jogadora empurra para +x e -z ao mesmo tempo
  const cenario = zone([box(2, 3, -10, 10)], null);
  const [x, z] = moveWithCollision(cenario, 1.5, 0, 1, -1);
  assert.equal(x, 1.5, 'x cancelado: bateu na parede');
  assert.equal(z, -1, 'z passou: não havia nada no caminho');
});

test('uma parede por eixo: cada eixo é julgado pela sua parede', () => {
  // parede no x (2..3) e outra no z (0..1), formando um canto
  const cenario = zone([box(2, 3, -10, 10), box(-10, 10, 0, 1)], null);
  assert.deepEqual(moveWithCollision(cenario, 1.5, 0, 1, 1), [1.5, 0], 'os dois eixos bateram, nada se move');
  // tirando a parede de z, o eixo z volta a passar
  const semZ = zone([box(2, 3, -10, 10)], null);
  assert.deepEqual(moveWithCollision(semZ, 1.5, 0, 1, 1), [1.5, 1], 'sem parede de z, z passa');
});

test('os bounds da zona prendem a jogadora mesmo sem colisor', () => {
  // é a barreira invisível: a câmera atravessa a sebe, a jogadora não
  const limites = zone([], box(-5, 5, -5, 5));
  assert.deepEqual(moveWithCollision(limites, 0, 0, 99, 99), [5, 5]);
  assert.deepEqual(moveWithCollision(limites, 0, 0, -99, -99), [-5, -5]);
  // e o clamp vence o pedido: de dentro para dentro não mexe
  assert.deepEqual(moveWithCollision(limites, 1, 1, 0.2, 0.2), [1.2, 1.2]);
});

test('colisor e bounds juntos: nenhum dos dois é ignorado', () => {
  const cenario = zone([box(2, 3, -10, 10)], box(-5, 5, -5, 5));
  // bate na parede de x e no limite de z ao mesmo tempo
  assert.deepEqual(moveWithCollision(cenario, 1.5, -4.5, 1, -1), [1.5, -5]);
});

test('lista de colliders ausente não derruba o jogo', () => {
  // zone undefined ou vazio aparece quando um teste chama antes do boot
  assert.deepEqual(moveWithCollision({}, 0, 0, 1, 1), [1, 1]);
  assert.deepEqual(moveWithCollision(null, 0, 0, 1, 1), [1, 1]);
});

test('a colisão é pura: chamar duas vezes dá o mesmo resultado', () => {
  const cenario = zone([box(2, 3, -10, 10)], box(-5, 5, -5, 5));
  const a = moveWithCollision(cenario, 1.5, 0, 1, -1);
  const b = moveWithCollision(cenario, 1.5, 0, 1, -1);
  assert.deepEqual(a, b);
  assert.deepEqual(cenario.colliders, [box(2, 3, -10, 10)], 'a zona não foi mutada');
  assert.deepEqual(cenario.bounds, box(-5, 5, -5, 5), 'os bounds não foram mutados');
});
