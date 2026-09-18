// Language Adventures — monstro companheiro (SVG puro, spec §13)
// + guarda-roupa de cosméticos (6 itens, spec §22).

// Cosméticos desenhados em SVG, aplicados como camadas no monstro.
export const COSMETIC_DRAWERS = {
  crown: (color) => `<g class="la-cos la-crown"><path d="M -22 -66 L -22 -90 L -11 -76 L 0 -94 L 11 -76 L 22 -90 L 22 -66 Z" fill="#ffd166" stroke="#b8860b" stroke-width="2.5"/></g>`,
  hat: (color) => `<g class="la-cos la-hat"><path d="M -30 -62 L 0 -100 L 30 -62 Z" fill="${color}" stroke="rgba(0,0,0,.25)" stroke-width="2"/><circle cx="0" cy="-88" r="5" fill="#fff" opacity=".85"/></g>`,
  glasses: () => `<g class="la-cos la-glasses" stroke="#33254e" stroke-width="3" fill="rgba(120,200,255,.35)"><circle cx="-14" cy="-34" r="10"/><circle cx="14" cy="-34" r="10"/><line x1="-4" y1="-34" x2="4" y2="-34"/></g>`,
  cape: (color) => `<g class="la-cos la-cape"><path d="M -34 -30 L -44 46 L -20 38 L 0 50 L 20 38 L 44 46 L 34 -30 Z" fill="${color}" opacity=".92"/></g>`,
  scarf: (color) => `<g class="la-cos la-scarf"><rect x="-26" y="-22" width="52" height="14" rx="7" fill="${color}"/><path d="M 14 -10 L 20 22 L 8 22 L 4 -8 Z" fill="${color}"/></g>`,
  badge: (color) => `<g class="la-cos la-badge"><circle cx="24" cy="18" r="11" fill="#ffd166" stroke="#b8860b" stroke-width="2"/><text x="24" y="23" text-anchor="middle" font-size="13" font-weight="800" fill="#7a4a00">★</text></g>`,
};

// cosméticos → cores/folhas
const COSMETIC_COLORS = {
  crown: '#ffd166',
  hat: '#ff5e7e',
  glasses: '#33254e',
  cape: '#6ca6ff',
  scarf: '#ff8fa3',
  badge: '#ffd166',
};

// O monstro: um blob simpático e arredondado com olhos grandes.
// equipped: array de ids de cosméticos.
export function monsterSVG(equipped = [], mood = 'happy', size = 150) {
  const eye = mood === 'happy'
    ? `<circle cx="-13" cy="-36" r="6" fill="#241a3e"/><circle cx="13" cy="-36" r="6" fill="#241a3e"/><circle cx="-11" cy="-38" r="2" fill="#fff"/><circle cx="15" cy="-38" r="2" fill="#fff"/>`
    : mood === 'wow'
      ? `<circle cx="-13" cy="-36" r="9" fill="#fff"/><circle cx="13" cy="-36" r="9" fill="#fff"/><circle cx="-13" cy="-35" r="4" fill="#241a3e"/><circle cx="13" cy="-35" r="4" fill="#241a3e"/>`
      : `<path d="M -20 -32 Q -13 -26 -6 -32" stroke="#241a3e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M 6 -32 Q 13 -26 20 -32" stroke="#241a3e" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const mouth = mood === 'happy'
    ? '<path d="M -14 -14 Q 0 -2 14 -14" stroke="#241a3e" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
    : mood === 'wow'
      ? '<ellipse cx="0" cy="-10" rx="8" ry="10" fill="#241a3e"/>'
      : '<line x1="-9" y1="-10" x2="9" y2="-10" stroke="#241a3e" stroke-width="3" stroke-linecap="round"/>';
  const layers = [];
  // capa atrás do corpo
  if (equipped.includes('cape')) layers.push(COSMETIC_DRAWERS.cape(COSMETIC_COLORS.cape));
  layers.push(`<ellipse cx="0" cy="-52" rx="38" ry="14" fill="#8fd3a8"/><g><path d="M -38 -40 C -42 10 -30 42 0 44 C 30 42 42 10 38 -40 C 30 -52 -30 -52 -38 -40 Z" fill="url(#laBody)"/></g>`);
  layers.push(`${eye}${mouth}`);
  if (equipped.includes('scarf')) layers.push(COSMETIC_DRAWERS.scarf(COSMETIC_COLORS.scarf));
  if (equipped.includes('glasses')) layers.push(COSMETIC_DRAWERS.glasses());
  if (equipped.includes('hat')) layers.push(COSMETIC_DRAWERS.hat(COSMETIC_COLORS.hat));
  if (equipped.includes('crown')) layers.push(COSMETIC_DRAWERS.crown(COSMETIC_COLORS.crown));
  if (equipped.includes('badge')) layers.push(COSMETIC_DRAWERS.badge(COSMETIC_COLORS.badge));

  return `<svg viewBox="-50 -105 100 155" width="${size}" height="${size * 1.55}" class="la-monster" aria-hidden="true">
    <defs><radialGradient id="laBody" cx="35%" cy="30%"><stop offset="0%" stop-color="#9fe8b8"/><stop offset="100%" stop-color="#57c48f"/></radialGradient></defs>
    ${layers.join('\n')}
  </svg>`;
}
