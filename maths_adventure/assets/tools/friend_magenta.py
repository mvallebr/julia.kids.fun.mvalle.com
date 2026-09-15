#!/usr/bin/env python3
"""Processa os 4 amigos regenerados sobre fundo magenta."""
import os
import sys
from collections import deque

from PIL import Image, ImageFilter

FRIENDS = ['zephyr', 'bubble', 'flurry', 'twinkle']


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
for name in FRIENDS:
    key_magenta(f'raw/friend-{name}3.jpg', f'img/friend-scene-{name}.webp')
