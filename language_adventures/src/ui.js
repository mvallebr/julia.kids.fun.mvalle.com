// Language Adventures — auxiliares de UI.

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

export function clearContainer(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function burstAt(node, count = 22) {
  const rect = node.getBoundingClientRect();
  const layer = el('div', 'la-burst');
  for (let index = 0; index < count; index += 1) {
    const bit = el('i');
    const angle = (Math.PI * 2 * index) / count + Math.random() * 0.6;
    const distance = 50 + Math.random() * 110;
    bit.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    bit.style.setProperty('--dy', `${Math.sin(angle) * distance - 26}px`);
    bit.style.setProperty('--rot', `${(Math.random() - 0.5) * 640}deg`);
    bit.style.background = ['#58cc72', '#ffd166', '#ff9a3d', '#6ca6ff', '#ff5e7e'][index % 5];
    bit.style.animationDuration = `${0.8 + Math.random() * 0.7}s`;
    layer.appendChild(bit);
  }
  layer.style.left = `${rect.left + rect.width / 2}px`;
  layer.style.top = `${rect.top + rect.height / 2}px`;
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1700);
}

export function toast(message, tone = 'good') {
  const existing = document.querySelector('.la-toast');
  if (existing) existing.remove();
  const node = el('div', `la-toast la-toast-${tone}`, message);
  document.body.appendChild(node);
  requestAnimationFrame(() => node.classList.add('show'));
  setTimeout(() => {
    node.classList.remove('show');
    setTimeout(() => node.remove(), 380);
  }, 1800);
}

export function confetti(count = 130, duration = 2600) {
  const colors = ['#58cc72', '#ffd166', '#ff9a3d', '#6ca6ff', '#ff5e7e', '#c7a6ff'];
  const layer = el('div', 'la-confetti-layer');
  for (let index = 0; index < count; index += 1) {
    const piece = el('span');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * (duration / 1000) * 0.4}s`;
    piece.style.animationDuration = `${duration / 1000 + Math.random() * 1.1}s`;
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), duration + 2000);
}
