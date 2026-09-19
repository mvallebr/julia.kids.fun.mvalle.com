// RPG Welling — utilidades de DOM: elementos, toasts, confete, história e fade.

export function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function toast(root, message, { duration = 2600 } = {}) {
  const chip = el('div', 'rpg-toast', message);
  root.appendChild(chip);
  requestAnimationFrame(() => chip.classList.add('show'));
  setTimeout(() => {
    chip.classList.remove('show');
    setTimeout(() => chip.remove(), 400);
  }, duration);
}

export function confetti(root, count = 70, duration = 1600) {
  const colors = ['#ffd166', '#ff5e7e', '#4ecdc4', '#7a4ecf', '#58cc72', '#fff'];
  const layer = el('div', 'rpg-confetti');
  for (let i = 0; i < count; i += 1) {
    const bit = el('span');
    bit.style.left = `${Math.random() * 100}%`;
    bit.style.background = colors[i % colors.length];
    bit.style.animationDelay = `${Math.random() * 0.35}s`;
    bit.style.animationDuration = `${0.9 + Math.random() * 0.9}s`;
    const size = 7 + Math.random() * 7;
    bit.style.width = `${size}px`;
    bit.style.height = `${size * 0.6}px`;
    layer.appendChild(bit);
  }
  root.appendChild(layer);
  setTimeout(() => layer.remove(), duration + 800);
}

export function fade(root, { toBlack = true, duration = 450 } = {}) {
  const veil = el('div', 'rpg-fade');
  root.appendChild(veil);
  requestAnimationFrame(() => veil.classList.add(toBlack ? 'on' : 'off'));
  return {
    cover: () => new Promise((resolve) => setTimeout(resolve, duration)),
    remove: () => veil.remove(),
  };
}

// Livro de abertura: painéis com as artes de conceito (botão pular sempre).
export function storybook(root, panels, { next, skip, done, onDone }) {
  const overlay = el('div', 'rpg-story');
  const image = el('img', 'rpg-story-art');
  const caption = el('p', 'rpg-story-text');
  const buttons = el('div', 'rpg-story-buttons');
  const skipButton = el('button', 'rpg-button ghost', skip);
  skipButton.type = 'button';
  const nextButton = el('button', 'rpg-button primary', next);
  nextButton.type = 'button';
  buttons.append(skipButton, nextButton);
  overlay.append(image, caption, buttons);
  root.appendChild(overlay);

  let index = 0;
  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    overlay.remove();
    onDone?.();
  }
  function show() {
    image.src = panels[index].image;
    image.alt = '';
    caption.textContent = panels[index].text;
    nextButton.textContent = index === panels.length - 1 ? done : next;
  }
  nextButton.addEventListener('click', () => {
    if (index >= panels.length - 1) {
      finish();
    } else {
      index += 1;
      show();
    }
  });
  skipButton.addEventListener('click', finish);
  show();
  return overlay;
}
