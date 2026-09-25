// Regras puras da câmera: distância de enquadramento e zoom. Ficam fora do
// main.js de propósito — são contações determinísticas e o Raycaster depende
// do three.js, então só assim dá para testar os limites do zoom sem navegador.
// O que era "corte do braço" (safeArmDistance) morreu: hoje a parede no caminho
// é ESMAECIDA (src/occlusion.js) e a câmera vai sempre à posição desejada.

export const CAM_ASPECT_REF = 16 / 9;
export const CAM_FIT_MAX = 2.1;
// teto do afastamento total (enquadramento × zoom): sem ele, uma tela bem
// estreita somava 3× a distância base e a menina virava um pixel
export const CAM_DIST_PRODUCT_MAX = 2.6;
// piso do mesmo produto: antes o zoom chegava só até fit×0.55 (~6 m no celular)
// e indoor o corte do braço entregava ~1.6 m de qualquer jeito. Com o fade,
// o zoom passa a valer de verdade — e o piso garante que "bem perto" fique
// ~3 m em QUALQUER tela (11.2 × 0.27 ≈ 3.0 m), não colado na nuca.
export const CAM_DIST_PRODUCT_MIN = 0.27;

// Enquadramento por aspecto: com FOV vertical fixo, a tela estreita do celular
// em pé mostra só ~24° de campo horizontal (o desktop mostra ~76°) — a câmera
// volta a ficar "colada" na menina e nenhuma pinça parece funcionar. Puxar a
// câmera para trás proporcional à falta de largura devolve a visão horizontal
// sem esticar a perspectiva (o FOV não muda). A raiz (sqrt) é um meio-termo:
// no celular dá ~2× mais distância, sem virar a menina num ponto.
export function cameraFit(aspect, { aspectRef = CAM_ASPECT_REF, max = CAM_FIT_MAX } = {}) {
  if (!Number.isFinite(aspect) || aspect <= 0) return 1;
  return Math.min(max, Math.max(1, Math.sqrt(aspectRef / aspect)));
}

export function cameraDistance(base, fit, zoom, {
  maxProduct = CAM_DIST_PRODUCT_MAX,
  minProduct = CAM_DIST_PRODUCT_MIN,
} = {}) {
  if (!Number.isFinite(base) || !Number.isFinite(fit) || !Number.isFinite(zoom)) {
    throw new TypeError('base, fit e zoom precisam ser números finitos');
  }
  if (base <= 0 || fit <= 0 || zoom <= 0) throw new RangeError('base, fit e zoom precisam ser positivos');
  if (maxProduct <= 0) throw new RangeError('maxProduct precisa ser positivo');
  if (minProduct <= 0) throw new RangeError('minProduct precisa ser positivo');
  // o piso vem antes do teto: sem essa ordem, um minProduct maior que o
  // maxProduct vazaria o piso por cima do teto (o teto sempre manda).
  return base * Math.min(maxProduct, Math.max(minProduct, fit * zoom));
}
