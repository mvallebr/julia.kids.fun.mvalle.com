#!/usr/bin/env python3
"""Chroma key (fundo verde) para os sprites do Maths Adventures.

Flood-fill a partir das bordas: remove só o fundo conectado à moldura, então
objetos verdes no personagem (mochila do menino) sobrevivem. Feather no alpha
para evitar halo.
"""
import sys
import colorsys
from collections import deque
from PIL import Image, ImageFilter

def is_greenish(r, g, b, sat_min=0.06):
    """Verde em hue (65°–175°), independente do brilho — pega vinheta e brilho."""
    hue, light, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    return 0.18 <= hue <= 0.486 and sat >= sat_min

def key_out(src, dst, strong_sat=0.30, interior_sat=0.50):
    im = Image.open(src).convert('RGBA')
    w, h = im.size
    pixels = im.load()

    STRONG, WEAK, KEEP = 2, 1, 0
    label = [[KEEP] * w for _ in range(h)]
    queue = deque()
    visited = [[False] * w for _ in range(h)]

    # Sementes: borda + verde PURO de fundo em qualquer lugar (furos fechados,
    # ex. vão entre asa e corpo). Reflexo esverdeado no personagem tem saturação
    # menor e nunca semeia flood por dentro.
    seeds = [(x, y) for x in range(w) for y in (0, h - 1)]
    seeds += [(x, y) for y in range(h) for x in (0, w - 1)]
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b, _ = pixels[x, y]
            if is_greenish(r, g, b, interior_sat):
                seeds.append((x, y))

    for x, y in seeds:
        queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        r, g, b, _ = pixels[x, y]
        greenish = is_greenish(r, g, b)
        if not greenish:
            continue
        _, _, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        label[y][x] = STRONG if sat >= strong_sat else WEAK
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if label[y][x] == STRONG:
                pixels[x, y] = (0, 0, 0, 0)
            elif label[y][x] == WEAK:
                _, _, sat = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
                alpha = int(255 * min(1, sat / strong_sat)) if sat > 0 else 0
                pixels[x, y] = (r, g, b, min(a, alpha))

    # Erosão leve + blur para matar halo; depois mantém só o maior componente.
    alpha = im.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    im.putalpha(alpha)
    im = keep_largest_component(im)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save(dst)
    print(f'{dst}: {im.size}')

def keep_largest_component(im):
    """Mata ilhas soltas de alpha (faíscas do fundo que sobraram)."""
    w, h = im.size
    alpha = im.getchannel('A')
    data = alpha.load()
    seen = [[False] * w for _ in range(h)]
    best, best_size = None, 0
    components = []
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
                best_size = len(comp)
                best = comp
    if not best:
        return im
    keep = set(best)
    for comp in components:
        if comp is best:
            continue
        for x, y in comp:
            data[x, y] = 0
    im.putalpha(alpha)  # grava a máscara modificada de volta na imagem
    return im

if __name__ == '__main__':
    key_out(sys.argv[1], sys.argv[2])
