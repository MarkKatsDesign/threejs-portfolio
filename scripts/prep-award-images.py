# Usage: python scripts/prep-award-images.py <award.jpg> <portrait.jpg> <outDir>
# Setup (once): python -m venv .venv
#               .venv/Scripts/pip install -r scripts/requirements.txt   (macOS/Linux: .venv/bin/pip)
# Cuts the award badge out of its white background, measures its scalloped
# outline (for src/components/awardOutline.js) and resizes the About portrait.
import json, math, sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

award_src, portrait_src, out_dir = sys.argv[1:4]

# --- Award: remove the white background by flood-filling from the border ---
img = Image.open(award_src).convert('RGB')
a = np.asarray(img).astype(np.int16)
h, w, _ = a.shape
whiteness = a.min(axis=2)            # high only when all channels are high
spread = a.max(axis=2) - a.min(axis=2)
is_bg_color = (whiteness > 225) & (spread < 30)
bg = np.zeros((h, w), bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if is_bg_color[y, x] and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if is_bg_color[y, x] and not bg[y, x]:
            bg[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not bg[ny, nx] and is_bg_color[ny, nx]:
            bg[ny, nx] = True; q.append((ny, nx))

alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8))
# Soften the cut edge slightly (anti-aliasing) without eating into the badge.
alpha = alpha.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.0))

ys, xs = np.where(~bg)
cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
half = max(xs.max() - xs.min(), ys.max() - ys.min()) / 2 + 2
left, top, right, bottom = (int(round(v)) for v in (cx - half, cy - half, cx + half, cy + half))
box = (left, top, right, bottom)
rgba = img.convert('RGBA'); rgba.putalpha(alpha)
badge = rgba.crop(box).resize((1024, 1024), Image.Resampling.LANCZOS)
badge.save(f'{out_dir}/hackathon-award.png', optimize=True)
badge.save(f'{out_dir}/hackathon-award.webp', quality=90, method=6)

# Outline profile: outer radius of the badge (normalised to the crop's half-size) per angle.
mask = np.asarray(badge.getchannel('A')) > 128
N = 360
c = 511.5
prof = []
for i in range(N):
    t = 2 * math.pi * i / N
    r = 511.0
    while r > 0:
        x, y = int(round(c + r * math.cos(t))), int(round(c - r * math.sin(t)))  # y up
        if mask[y, x]:
            break
        r -= 0.5
    prof.append(round(r / 512, 4))
k = 3
prof = [round(sum(prof[(i + j) % N] for j in range(-k, k + 1)) / (2 * k + 1), 4) for i in range(N)]
json.dump(prof, open(f'{out_dir}/award-profile.json', 'w'))
print('crop box', box, 'radius min/max', min(prof), max(prof))

# --- Portrait: resize for the About card ---
p = Image.open(portrait_src).convert('RGB')
p.thumbnail((900, 1200), Image.Resampling.LANCZOS)
p.save(f'{out_dir}/portrait.jpg', quality=84, optimize=True, progressive=True)
p.save(f'{out_dir}/portrait.webp', quality=82, method=6)
print('portrait', p.size)
