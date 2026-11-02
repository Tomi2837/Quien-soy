# Recorta cada render al mueble (con aire) en formato 4:5 y lo deja en 720x900.
import glob, numpy as np
from PIL import Image
for f in sorted(glob.glob('renders/*-raw.png')):
    im = Image.open(f).convert('RGB'); a = np.asarray(im).astype(int)
    g = a.mean(axis=2)
    ys, xs = np.where(g < 185)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2 + (y1 - y0) * 0.03
    w, h = (x1 - x0) * 1.42, (y1 - y0) * 1.42
    if w / h > 0.8: h = w / 0.8
    else: w = h * 0.8
    W, H = im.size
    w = min(w, W); h = min(h, H)
    if w / h > 0.8: w = h * 0.8
    else: h = w / 0.8
    L = min(max(cx - w / 2, 0), W - w); T = min(max(cy - h / 2, 0), H - h)
    out = im.crop((int(L), int(T), int(L + w), int(T + h))).resize((720, 900), Image.LANCZOS)
    out.save(f.replace('-raw.png', '.jpg'), quality=90)
    print(f, (x0, y0, x1, y1), 'crop', int(w), int(h))
