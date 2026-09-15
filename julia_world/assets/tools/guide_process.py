#!/usr/bin/env python3
"""Processa os retratos falantes do guia: divide as 2 poses primeiro e só
depois aplica chroma key em cada metade (o fundo fica todo conectado à
moldura da metade, então o flood-fill alcança 100% do fundo).

Cada guide-<nome>.jpg contém o personagem duas vezes: esquerda = boca
fechada, direita = boca aberta. Saiem guide/<nome>-closed.webp e
guide/<nome>-open.webp com fundo transparente.

Sapo, gato e borboleta são gerados sobre fundo MAGENTA (verde sobre verde
não separa; e o gato/borboleta deixaram resíduo no verde).
"""
import colorsys
import os
import sys
from collections import deque

from PIL import Image, ImageFilter

sys.path.insert(0, '../../maths_adventure/assets/tools')
from chroma import key_out as key_green  # flood-fill verde já validado

NAMES = ['unicorn', 'girl', 'boy', 'cat', 'dog', 'fox', 'panda', 'frog',
         'butterfly', 'star', 'rocket', 'flower']
MAGENTA_NAMES = {'frog', 'butterfly'}
BLUE_NAMES = {'cat'}  # gato laranja sobre azul-marinho separa sem comer o pelo


def is_blue(r, g, b):
    return b > r + 15 and b > g + 15


def is_magenta(r, g, b):
    # cobre também o rosa-claro de sombras suaves: vermelho domina o verde
    # e o azul acompanha
    return r > g + 25 and b > g - 20


def key_half(im, is_bg, strong_sat=None):
    if is_bg is None:  # fundo verde: pipeline validado do maths_adventure
        tmp = '/tmp/guide-half-green.png'
        im.convert('RGBA').save(tmp)
        key_green(tmp, tmp)
        return Image.open(tmp)

    im = im.convert('RGBA')
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
        if not is_bg(r, g, b):
            continue
        pixels[x, y] = (0, 0, 0, 0)
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    alpha = im.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    im.putalpha(alpha)
    im = keep_largest_component(im)
    bbox = im.getbbox()
    return im.crop(bbox) if bbox else im


def keep_largest_component(im):
    """Mata ilhas soltas de alpha (faíscas do fundo que sobraram)."""
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


os.makedirs('guide', exist_ok=True)
for name in NAMES:
    im = Image.open(f'raw/guide-{name}.jpg').convert('RGBA')
    w, h = im.size
    is_bg = is_magenta if name in MAGENTA_NAMES else (is_blue if name in BLUE_NAMES else None)
    for half, pose in ((0, 'closed'), (1, 'open')):
        half_im = im.crop((half * w // 2, 0, (half + 1) * w // 2, h))
        out = key_half(half_im, is_bg)
        out.thumbnail((260, 260), Image.LANCZOS)
        out.save(f'guide/{name}-{pose}.webp', 'WEBP', quality=86, method=6)
        print(f'guide/{name}-{pose}.webp', out.size)
