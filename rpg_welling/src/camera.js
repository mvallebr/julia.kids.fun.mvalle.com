// Regras puras da câmera: distância de enquadramento, zoom e corte do braço.
// Ficam fora do main.js de propósito — são contações determinísticas e o
// Raycaster depende do three.js, então só assim dá para testar o clamp do
// braço (incluindo o caso "parede colada na MENINA") sem abrir navegador.

export const CAM_ASPECT_REF = 16 / 9;
export const CAM_FIT_MAX = 2.1;
// teto do afastamento total (enquadramento × zoom): sem ele, uma tela bem
// estreita somava 3× a distância base e a menina virava um pixel
export const CAM_DIST_PRODUCT_MAX = 2.6;
export const CAMERA_ARM_MARGIN = 0.4; // folga depois da superfície atingida (m)
export const CAMERA_ARM_MIN = 1.6; // distância preferida quando há espaço para ela
// Abaixo disto a cabeça da jogadora já está colada (ou dentro) da parede: não
// existe posição válida entre a menina e a superfície, então o braço não anda.
export const CAMERA_ARM_TINY = 0.25;

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

export function cameraDistance(base, fit, zoom, { maxProduct = CAM_DIST_PRODUCT_MAX } = {}) {
  if (!Number.isFinite(base) || !Number.isFinite(fit) || !Number.isFinite(zoom)) {
    throw new TypeError('base, fit e zoom precisam ser números finitos');
  }
  if (base <= 0 || fit <= 0 || zoom <= 0) throw new RangeError('base, fit e zoom precisam ser positivos');
  if (maxProduct <= 0) throw new RangeError('maxProduct precisa ser positivo');
  return base * Math.min(maxProduct, fit * zoom);
}

// Onde o braço da câmera pode parar sem ATRAPASSAR a primeira superfície.
// A regra que importa: dist nunca passa de `front` (hit − folga). Antes esta
// função devolvia Math.max(0.4, front), que com uma parede a menos de 0.8 m
// colocava a câmera do outro lado dela. Se nem `front` sobra, devolvemos
// blocked: true e quem chama congela a câmera no lugar, em vez de inventar uma
// posição que atravessa parede.
export function safeArmDistance(hitDistance, {
  margin = CAMERA_ARM_MARGIN,
  preferred = CAMERA_ARM_MIN,
  tiny = CAMERA_ARM_TINY,
} = {}) {
  if (!Number.isFinite(hitDistance) || hitDistance < 0) {
    throw new RangeError('hitDistance precisa ser um número >= 0');
  }
  const front = hitDistance - margin;
  if (front <= tiny) return { dist: 0, blocked: true, front, roomy: false };
  return { dist: front, blocked: false, front, roomy: front >= preferred };
}
