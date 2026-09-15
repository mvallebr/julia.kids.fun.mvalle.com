#!/usr/bin/env python3
"""Recorta os sprites de cena dos amigos.

- Fundo VERDE (chroma.py): bumble, glim, sunny, kaya, cog, bubble, flurry
  (bubble/flurry usam strong_sat=0.12: o fundo verde-claro do raw precisa
  ser removido como STRONG, senão fica um véu quase opaco)
- Fundo MAGENTA: zephyr, twinkle (personagens com verdes/azuis no corpo)
"""
import os
import sys
from collections import deque

sys.path.insert(0, '../../maths_adventure/assets/tools')
from chroma import key_out
from PIL import Image, ImageFilter

GREEN = {
    'bumble': ('raw/friend-bumble2.jpg', 0.30),
    'glim': ('raw/friend-glim2.jpg', 0.30),
    'sunny': ('raw/friend-sunny2.jpg', 0.30),
    'kaya': ('raw/friend-kaya2.jpg', 0.30),
    'cog': ('raw/friend-cog2.jpg', 0.30),
    'bubble': ('raw/friend-bubble4.jpg', 0.12),
    'flurry': ('raw/friend-flurry4.jpg', 0.12),
}
MAGENTA = {
    'zephyr': 'raw/friend-zephyr3.jpg',
    'twinkle': 'raw/friend-twinkle3.jpg',
}


def is_magenta(r, g, b):
    return r > g + 25 and b > g - 20


def keep_largest_component(im):
    w, h = im.size
    alpha = im.getchannel('A')
    data = alpha.load()
    seen = [[False] * w for _ in range(h)]
    best, best_size, components = None, 0, []
    for sy in range(h):
        for sx in range(w):
            if seen[sy][sx] or data[sx, sy] < 40:
                continue
            comp = []
            queue = deque([(sx, sy)])
            seen[sy][sx] = True
            while queue:
                x, y = queue.popleft()
                comp.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and data[nx, ny] >= 40:
                        seen[ny][nx] = True
                        queue.append((nx, ny))
            components.append(comp)
            if len(comp) > best_size:
                best_size, best = len(comp), comp
    if best:
        for comp in components:
            if comp is best:
                continue
            for x, y in comp:
                data[x, y] = 0
    im.putalpha(alpha)
    return im


def key_magenta(src, dst):
    im = Image.open(src).convert('RGBA')
    w, h = im.size
    pixels = im.load()
    queue = deque()
    visited = [[False] * w for _ in range(h)]
    seeds = [(x, y) for x in range(w) for y in (0, h - 1)]
    seeds += [(x, y) for y in range(h) for x in (0, w - 1)]
    queue.extend(seeds)
    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, _ = pixels[x, y]
        if not is_magenta(r, g, b):
            continue
        pixels[x, y] = (0, 0, 0, 0)
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    alpha = im.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    im.putalpha(alpha)
    im = keep_largest_component(im)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.thumbnail((460, 460), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=86, method=6)
    print(dst, im.size)


os.makedirs('img', exist_ok=True)
for name, (src, strong_sat) in GREEN.items():
    keyed = f'/tmp/fs-{name}.png'
    key_out(src, keyed, strong_sat=strong_sat, keep_largest=True)
    im = Image.open(keyed)
    im.thumbnail((460, 460), Image.LANCZOS)
    im.save(f'img/friend-scene-{name}.webp', 'WEBP', quality=86, method=6)
    print(f'img/friend-scene-{name}.webp', im.size)

for name, src in MAGENTA.items():
    key_magenta(src, f'img/friend-scene-{name}.webp')
