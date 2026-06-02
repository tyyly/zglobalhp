#!/usr/bin/env python3
"""ZGlobal HP 画像最適化スクリプト（ファイル名・拡張子を変えない安全な in-place 最適化）。
- JPEG: 最大辺 > MAX_DIM なら縮小、quality=80・progressive で再圧縮。元より小さい時だけ上書き。
- PNG : 最大辺 > MAX_DIM なら縮小、optimize=True。写真PNGは pngquant 相当の量子化は行わず可逆最適化のみ。
結果が元より小さくならなければ touch しない（無駄な差分を出さない）。
"""
import os, sys, time
from PIL import Image

def safe_replace(src, dst, attempts=8):
    for i in range(attempts):
        try:
            os.replace(src, dst)
            return True
        except PermissionError:
            time.sleep(0.4)  # transient AV/indexer handle on Windows
    return False

ROOT = sys.argv[1] if len(sys.argv) > 1 else "site/images"
MAX_DIM = int(sys.argv[2]) if len(sys.argv) > 2 else 1920  # これ以上の長辺は縮小
JPEG_Q = int(sys.argv[3]) if len(sys.argv) > 3 else 80
MIN_BYTES = 50 * 1024   # 50KB 未満は対象外（効果が薄い小アイコン等）

total_before = total_after = saved_files = 0

for dirpath, _, files in os.walk(ROOT):
    for fn in files:
        ext = fn.lower().rsplit(".", 1)[-1] if "." in fn else ""
        if ext not in ("jpg", "jpeg", "png"):
            continue
        path = os.path.join(dirpath, fn)
        orig = os.path.getsize(path)
        if orig < MIN_BYTES:
            continue
        try:
            with Image.open(path) as im0:
                im0.load()
                im = im0.copy()   # detach from file handle (Windows os.replace safety)
        except Exception as e:
            print(f"  skip (open fail): {path} {e}")
            continue

        w, h = im.size
        changed_dim = False
        if max(w, h) > MAX_DIM:
            scale = MAX_DIM / max(w, h)
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
            changed_dim = True

        tmp = path + ".opt"
        try:
            if ext in ("jpg", "jpeg"):
                rgb = im.convert("RGB")
                rgb.save(tmp, "JPEG", quality=JPEG_Q, optimize=True, progressive=True)
            else:  # png
                im.save(tmp, "PNG", optimize=True)
        except Exception as e:
            print(f"  skip (save fail): {path} {e}")
            if os.path.exists(tmp):
                os.remove(tmp)
            continue

        new = os.path.getsize(tmp)
        if new < orig:
            if not safe_replace(tmp, path):
                print(f"  LOCKED (left .opt): {path}")
                continue
            total_before += orig
            total_after += new
            saved_files += 1
            dim_note = f" [resized {w}x{h}->{im.size[0]}x{im.size[1]}]" if changed_dim else ""
            print(f"  {orig//1024:>5}KB -> {new//1024:>5}KB  {os.path.relpath(path, ROOT)}{dim_note}")
        else:
            os.remove(tmp)

print(f"\n=== {ROOT}: {saved_files} files optimized, "
      f"{total_before//1024}KB -> {total_after//1024}KB "
      f"(saved {(total_before-total_after)//1024}KB) ===")
