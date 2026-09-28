#!/usr/bin/env python3
"""Deriva os quadros de um tutorial de colorir a partir de UM desenho a lápis.

Este é o general do que foi feito na Corujinha Pintada. A regra que ele guarda
está em docs/LESSONS.md: a lição tem de ser UMA figura, e os N passos saem
dela. A arte é gerada uma vez e todo o resto é derivado.

    python3 tools/derive-frames.py arte.jpg spec.json saida/

O spec.json diz o que é cada parte. Duas coisas importantes:

  * A caixa (`box`) serve só para DESCUBRIR a qual parte uma região pertence.
    A área pintada é sempre a região que a própria tinta fechou, nunca a caixa.
    É por isso que a forma pintada é a forma desenhada — pintar por caixa de
    posição devolvia um retângulo no meio do personagem.

  * O script ABORTA se o contorno não fechar. Mede antes de pintar, como
    tools/check-closed.py. Ninguém descobre isso no olho depois de uma hora
    pintando.
"""

import json
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

MIN_ENCLOSED = 2.0      # % do quadro
MIN_LARGEST = 3.0       # % do quadro, a maior região


def load(path):
    return np.asarray(Image.open(path).convert("RGB")).astype(np.float32)


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


def pockets(mask, min_px=120):
    """Cada área cercada vira uma região, com tamanho e centro."""
    h, w = mask.shape
    seen = np.zeros_like(mask)
    found = []
    for sy in range(h):
        for sx in range(w):
            if not mask[sy, sx] or seen[sy, sx]:
                continue
            seen[sy, sx] = True
            blob = np.zeros_like(mask)
            blob[sy, sx] = True
            dq = deque([(sy, sx)])
            sxs = sys_ = 0
            n = 0
            while dq:
                y, x = dq.popleft()
                sxs += x
                sys_ += y
                n += 1
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        blob[ny, nx] = True
                        dq.append((ny, nx))
            if n >= min_px:
                found.append({"mask": blob, "n": n,
                              "cx": sxs / n / w, "cy": sys_ / n / h})
    return found


def assign(areas, regions, fallback_name):
    """Casa cada região com uma parte, pela caixa. A CAIXA só nomeia.

    A primeira caixa que pega vence, e a região é atribuída UMA vez só. Sem
    isso, uma área que caísse em duas caixas entraria nas duas partes e
    apareceria pintada por cima da outra. Por isso a ordem do spec importa:
    do mais específico (orelha) para o mais largo (corpo).
    """
    names = {r["name"]: None for r in regions}
    for a in areas:
        for r in regions:
            x0, y0, x1, y1 = r["box"]
            if x0 <= a["cx"] <= x1 and y0 <= a["cy"] <= y1:
                m = names[r["name"]]
                names[r["name"]] = a["mask"] if m is None else (m | a["mask"])
                break
    out = {k: v for k, v in names.items() if v is not None and v.any()}
    if fallback_name:
        taken = np.zeros_like(areas[0]["mask"], dtype=bool) if areas else None
        if taken is not None:
            for v in out.values():
                taken |= v
            rest = ~taken
            for a in areas:
                if rest[a["mask"]].any():
                    out[fallback_name] = a["mask"] if fallback_name not in out else (
                        out[fallback_name] | a["mask"])
    return {k: v for k, v in out.items() if v is not None and v.any()}


def render(names, colours, painted, h, w, paper):
    frame = np.repeat(np.array(paper, dtype=np.float32)[None, None, :],
                      h, 0).repeat(w, 1)
    shade = np.linspace(1.06, 0.92, h)[:, None, None]
    for key in painted:
        m = names.get(key)
        if m is None or not m.any():
            continue
        col = np.array(colours[key], dtype=np.float32)
        tint = np.broadcast_to(col[None, None, :] * shade, (h, w, 3))
        frame[m] = np.clip(tint, 0, 255)[m]
    return np.clip(frame, 0, 255).astype(np.uint8)


def compose(art, frame, line):
    """O lápis por cima, sempre. A criança pinta por cima do próprio lápis."""
    a = line.astype(np.float32)[..., None] * 0.92
    return np.clip(frame * (1 - a) + art * a, 0, 255).astype(np.uint8)


def pots(frame):
    """Os potes de tinta, no passo em que a criança escolhe as cores."""
    im = Image.fromarray(frame)
    d = ImageDraw.Draw(im)
    W, H = im.size
    for cx, col in ((0.13, (92, 100, 60)), (0.29, (247, 241, 228)),
                    (0.45, (46, 40, 36))):
        x, y = W * cx, H * 0.90
        rx, ry = W * 0.035, H * 0.045
        d.ellipse([x - rx, y - ry, x + rx, y + ry], fill=col,
                  outline=(96, 76, 60), width=4)
    return np.asarray(im)


def signature(frame):
    """O rabisco no canto: a arte é dela, e ela assina."""
    im = Image.fromarray(frame)
    d = ImageDraw.Draw(im)
    W, H = im.size
    x0, y0, x1, y1 = W * 0.06, H * 0.88, W * 0.38, H * 0.955
    d.rounded_rectangle([x0, y0, x1, y1], radius=12, fill=(255, 255, 255),
                        outline=(150, 140, 130), width=3)
    pts = [(x0 + 24, y1 - 16), (x0 + 80, y0 + 20), (x0 + 140, y1 - 18),
           (x0 + 196, y0 + 22), (x0 + 250, y1 - 14)]
    d.line(pts, fill=(70, 60, 55), width=5, joint="curve")
    return np.asarray(im)


def main():
    if len(sys.argv) != 4:
        print(__doc__)
        return 2
    art_path, spec_path, out_dir = map(Path, sys.argv[1:])
    spec = json.loads(spec_path.read_text(encoding="utf-8"))
    out_dir.mkdir(parents=True, exist_ok=True)

    art = load(art_path)
    h, w = art.shape[:2]
    line = line_mask(art)
    fillable = enclosed(line)
    pct = fillable.mean() * 100
    areas = pockets(fillable)
    biggest = (max(a["n"] for a in areas) / (h * w) * 100) if areas else 0.0

    print(f"{art_path.name}  {w}x{h}")
    print(f"  lápis {line.mean()*100:.2f}%  pintado {pct:.2f}%  maior {biggest:.2f}%")

    if line.mean() > 0.9:
        print("ERRO: quase tudo conta como lápis; a polaridade está invertida.",
              file=sys.stderr)
        return 1
    if pct < MIN_ENCLOSED or biggest < MIN_LARGEST:
        print(f"ERRO: o contorno não fecha o bastante (pintado {pct:.2f}%, "
              f"maior {biggest:.2f}%). Gere outro desenho.", file=sys.stderr)
        return 1

    colours = spec["colours"]
    names = assign(areas, spec["regions"], spec.get("fallback"))
    paper = spec.get("paper", [247, 243, 234])

    total = sum(m.sum() for m in names.values())
    print(f"  {len(areas)} áreas fechadas")
    for k, v in sorted(names.items(), key=lambda kv: -kv[1].mean()):
        print(f"    {k:16s} {v.mean()*100:5.2f}%")
    if total == 0:
        print("ERRO: nenhuma região casou com as caixas do spec. As caixas "
              "estão no lugar errado?", file=sys.stderr)
        return 1
    unassigned = (fillable.sum() - total) / (h * w) * 100
    if unassigned > 4.0:
        print(f"AVISO: {unassigned:.1f}% do desenho não caiu em nenhuma parte. "
              "A Regionião existe mas o spec não a nomeou — ela fica sem tinta.")

    painted = set()
    for step in spec["steps"]:
        name = step[0]
        # O passo é [nome, [regiões]]; achata, porque uma lista dentro de
        # outra não pode virar nome de região.
        add = []
        for r in (step[1] if len(step) > 1 else []):
            add.extend(r) if isinstance(r, list) else add.append(r)
        painted |= set(add)
        frame = render(names, colours, painted, h, w, paper)
        if name == spec.get("potsStep"):
            frame = pots(frame)
        if name == spec.get("signStep"):
            frame = signature(frame)
        out = compose(art, frame, line)
        Image.fromarray(out).save(out_dir / f"{name}.png")
        print(f"  {name}.png  (+{', '.join(add) or 'nada'})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
