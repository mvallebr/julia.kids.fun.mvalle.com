// Auxiliares de UI: criação de elementos, sparkles, toast, digitação.
// O mundo domina a tela; UI é camada fina por cima (spec §7.2).

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// Explosão de glitter dourado num ponto da tela (feedback de acerto, spec §13).
export function burst(x, y, count = 26, colors = ['#ffd166', '#ffe27a', '#fff6d8', '#c7a6ff', '#ff9fbd']) {
  const layer = el('div', 'ma-burst');
  for (let index = 0; index < count; index += 1) {
    const bit = el('i');
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.6;
    const distance = 50 + Math.random() * 130;
    bit.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    bit.style.setProperty('--dy', `${Math.sin(angle) * distance - 30}px`);
    bit.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
    bit.style.background = colors[index % colors.length];
    bit.style.animationDuration = `${0.9 + Math.random() * 0.8}s`;
    layer.appendChild(bit);
  }
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1900);
}

export function burstAt(node, count) {
  const rect = node.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
}

// Mensagem flutuante carinhosa (feedback de erro/acerto).
export function toast(message, tone = 'good') {
  const existing = document.querySelector('.ma-toast');
  if (existing) existing.remove();
  const node = el('div', `ma-toast ma-toast-${tone}`, message);
  document.body.appendChild(node);
  requestAnimationFrame(() => node.classList.add('show'));
  setTimeout(() => {
    node.classList.remove('show');
    setTimeout(() => node.remove(), 400);
  }, 1900);
}

// Efeito máquina de escrever para falas; retorna { finish, finished }.
export function typewriter(node, text, speed = 18) {
  node.textContent = '';
  let index = 0;
  let finished = false;
  const timer = setInterval(() => {
    if (finished) return;
    index += 1;
    node.textContent = text.slice(0, index);
    if (index >= text.length) {
      finished = true;
      clearInterval(timer);
    }
  }, speed);
  return {
    get finished() {
      return finished;
    },
    finish() {
      finished = true;
      clearInterval(timer);
      node.textContent = text;
    },
  };
}

// Confete em tela cheia (celebrações).
export function confetti(count = 140, duration = 2600) {
  const colors = ['#ffd166', '#ff6b9d', '#4ecdc4', '#a8e05f', '#6ca6ff', '#ffab5e', '#c7a6ff'];
  const layer = el('div', 'ma-confetti-layer');
  for (let index = 0; index < count; index += 1) {
    const piece = el('span');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDuration = `${duration / 1000 + Math.random()}s`;
    piece.style.animationDelay = `${Math.random() * 0.7}s`;
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), duration + 2200);
}

export function clearContainer(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
