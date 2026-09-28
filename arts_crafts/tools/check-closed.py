#!/usr/bin/env python3
"""Mede quanto de um desenho a lápis dá para pintar.

Uma figura para colorir só funciona se o traço FECHAR: a tinta entra por
inundação, e o que a tinta cerca é a área a pintar. Se o contorno tiver uma
fura de 1 pixel, a água entra e não sobra área nenhuma — o quadro inteiro
devolve 0,00%.

Este script existe para não descobrir isso tarde. Rode depois de gerar a arte e
antes de pintar.

    python3 tools/check-closed.py caminho/da/arte.jpg

Sai com código 1 quando o desenho não serve, para travar a etapa seguinte.
"""

import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

# Abaixo disso não há o que pintar: o contorno não fechou.
MIN_ENCLOSED = 2.0
# A área maior tem que ser do tamanho de um corpo de coruja. A soma engana:
# um desenho com o traço todo esfarelado fecha dezenas de pedacinhos de 0,9% e
# soma vários por cento, mas não tem uma única área pintável de verdade.
MIN_LARGEST = 3.0


def line_mask(art, th=0.5):
    """Só a tinta escura é o lápis. O branco é o papel, e não tinta."""
    lum = (0.299 * art[:, :, 0] + 0.587 * art[:, :, 1]
           + 0.114 * art[:, :, 2]) / 255.0
    return lum < th


def enclosed(line):
    """Tudo que a tinta cerca. Começa na borda: o que a água alcança é papel."""
    h, w = line.shape
    free = ~line
    seen = np.zeros_like(free)
    dq = deque()
    for x in range(w):
        for y in (0, h - 1):
            if free[y, x] and not seen[y, x]:
                seen[y, x] = True
                dq.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if free[y, x] and not seen[y, x]:
                seen[y, x] = True
                dq.append((y, x))
    while dq:
        y, x = dq.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and free[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                dq.append((ny, nx))
    return free & ~seen


def regions(mask, min_px=120):
    h, w = mask.shape
    seen = np.zeros_like(mask)
    out = []
    for sy in range(h):
        for sx in range(w):
            if not mask[sy, sx] or seen[sy, sx]:
                continue
            seen[sy, sx] = True
            blob = np.zeros_like(mask)
            blob[sy, sx] = True
            dq = deque([(sy, sx)])
            n = 0
            while dq:
                y, x = dq.popleft()
                n += 1
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        blob[ny, nx] = True
                        dq.append((ny, nx))
            if n >= min_px:
                out.append(n)
    return sorted(out, reverse=True)


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    path = Path(sys.argv[1])
    if not path.exists():
        print(f"não achei {path}", file=sys.stderr)
        return 2

    art = np.asarray(Image.open(path).convert("RGB")).astype(np.float32)
    h, w = art.shape[:2]
    line = line_mask(art)
    fillable = enclosed(line)
    pct = fillable.mean() * 100
    sizes = regions(fillable)

    print(f"{path.name}  {w}x{h}")
    print(f"  lápis  {line.mean() * 100:5.2f}% do quadro")
    print(f"  pintado {pct:5.2f}% do quadro  <- o que dá para colorir")
    biggest = (sizes[0] / (h * w) * 100) if sizes else 0.0
    print(f"  {len(sizes)} áreas fechadas, maior {biggest:.2f}%")

    # O teste precisa discriminar: 100% de lápis é a pista de que a polaridade
    # está invertida e o branco está sendo contado como traço.
    if line.mean() > 0.9:
        print("ERRO: 100% do quadro conta como lápis. A polaridade está "
              "invertida — o branco está sendo lido como tinta.", file=sys.stderr)
        return 1

    if pct < MIN_ENCLOSED:
        print(f"ERRO: só {pct:.2f}% do quadro ficou cercado, abaixo de "
              f"{MIN_ENCLOSED:.0f}%. O contorno NÃO fecha, não há o que pintar.\n"
              "Gere de novo pedindo: traço grosso, formas fechadas, sem hachura.",
              file=sys.stderr)
        return 1

    if biggest < MIN_LARGEST:
        print(f"ERRO: a maior área fechada tem só {biggest:.2f}% do quadro, "
              f"abaixo de {MIN_LARGEST:.0f}%.\n"
              f"As {len(sizes)} áreas somam bastante, mas nenhuma é do tamanho "
              "de um corpo: o traço está esfarelado e fechou pedacinhos, "
              "não a figura.", file=sys.stderr)
        return 1

    print("OK: dá para pintar por inundação.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
