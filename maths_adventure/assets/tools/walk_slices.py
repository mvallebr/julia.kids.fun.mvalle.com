#!/usr/bin/env python3
"""Fati a folha de ciclo de caminhada em frames individuais.

1. chroma key da folha inteira (flood-fill verde de chroma.py)
2. detecta cada personagem por componentes conectados de alpha
3. ordena por linha (y) e coluna (x), descarta fragmentos pequenos
4. normaliza todos os frames para a mesma altura com a base alinhada
5. exporta walk-<quem>-N.webp
"""
import sys
from collections import deque

sys.path.insert(0, '../../maths_adventure/assets/tools')
from chroma import key_out as key_single
from PIL import Image


def slice_sheet(src, prefix, out_dir='img', min_area=2500):
    keyed = f'/tmp/walk-keyed-{prefix}.png'
    key_single(src, keyed, keep_largest=False)
    im = Image.open(keyed).convert('RGBA')
    w, h = im.size
    alpha = im.getchannel('A').load()

    seen = [[False] * w for _ in range(h)]
    boxes = []
    for sy in range(0, h, 4):
        for sx in range(0, w, 4):
            if seen[sy][sx] or alpha[sx, sy] < 40:
                continue
            queue = deque([(sx, sy)])
            seen[sy][sx] = True
            minx, miny, maxx, maxy, count = sx, sy, sx, sy, 0
            while queue:
                x, y = queue.popleft()
                count += 1
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)
                for nx, ny in ((x + 2, y), (x - 2, y), (x, y + 2), (x, y - 2)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and alpha[nx, ny] >= 40:
                        seen[ny][nx] = True
                        queue.append((nx, ny))
            if count * 16 >= min_area and (maxx - minx) > 60 and (maxy - miny) > 120:
                boxes.append((miny, minx, maxx, maxy))

    # ordena por linha (agrupamento de y) e depois por x
    boxes.sort(key=lambda b: (b[0] // (h // 3), b[1]))
    frames = []
    for (miny, minx, maxx, maxy) in boxes:
        pad = 6
        frame = im.crop((max(0, minx - pad), max(0, miny - pad),
                         min(w, maxx + pad), min(h, maxy + pad)))
        frames.append(frame)

    max_h = max(f.height for f in frames)
    max_w = max(f.width for f in frames)
    for index, frame in enumerate(frames, 1):
        canvas = Image.new('RGBA', (max_w, max_h), (0, 0, 0, 0))
        canvas.alpha_composite(frame, ((max_w - frame.width) // 2, max_h - frame.height))
        canvas.thumbnail((460, 460), Image.LANCZOS)
        out = f'{out_dir}/walk-{prefix}-{index}.webp'
        canvas.save(out, 'WEBP', quality=86, method=6)
        print(out, canvas.size)
    print(f'{prefix}: {len(frames)} frames')


if __name__ == '__main__':
    slice_sheet('raw/sheet-girl.jpg', 'girl')
    slice_sheet('raw/sheet-boy.jpg', 'boy')
