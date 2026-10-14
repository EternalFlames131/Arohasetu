import os
import shutil
import subprocess
from PIL import Image, ImageDraw

USER_IMG_PATH = r"C:/Users/samra/.gemini/antigravity/brain/793fb21f-7558-493b-bf5c-40ef0bc33629/.user_uploaded/media_1791916665737_740ec453.png"

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "prototype", "public")
ASSETS_DIR = os.path.join(PUBLIC_DIR, "assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

# 1. Master SVG Definitions
SVG_FULL = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <rect width="100" height="100" rx="24" fill="#E8F6F5" />
  <g fill="none" stroke="#103663" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50,78 C 34,65 20,53 20,38 C 20,25 30.5,17 41.5,17 C 46.5,17 48.8,19.5 50,22 C 51.2,19.5 53.5,17 58.5,17 C 69.5,17 80,25 80,38 C 80,53 66,65 50,78 Z" />
    <path d="M 20,50 L 41,50 L 45,61 L 52.5,33 L 57.5,50 L 80,50" />
  </g>
</svg>"""

SVG_ROUND = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="49" fill="#E8F6F5" />
  <g fill="none" stroke="#103663" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50,78 C 34,65 20,53 20,38 C 20,25 30.5,17 41.5,17 C 46.5,17 48.8,19.5 50,22 C 51.2,19.5 53.5,17 58.5,17 C 69.5,17 80,25 80,38 C 80,53 66,65 50,78 Z" />
    <path d="M 20,50 L 41,50 L 45,61 L 52.5,33 L 57.5,50 L 80,50" />
  </g>
</svg>"""

SVG_FOREGROUND = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="100%" height="100%">
  <g transform="translate(18.9, 18.9) scale(0.65)" fill="none" stroke="#103663" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 50,78 C 34,65 20,53 20,38 C 20,25 30.5,17 41.5,17 C 46.5,17 48.8,19.5 50,22 C 51.2,19.5 53.5,17 58.5,17 C 69.5,17 80,25 80,38 C 80,53 66,65 50,78 Z" />
    <path d="M 20,50 L 41,50 L 45,61 L 52.5,33 L 57.5,50 L 80,50" />
  </g>
</svg>"""

SVG_FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="16" fill="#E8F6F5" />
  <g fill="none" stroke="#103663" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M 32,50 C 21.8,41.6 12.8,33.9 12.8,24.3 C 12.8,16 19.5,10.9 26.6,10.9 C 29.8,10.9 31.2,12.5 32,14.1 C 32.8,12.5 34.2,10.9 37.4,10.9 C 44.5,10.9 51.2,16 51.2,24.3 C 51.2,33.9 42.2,41.6 32,50 Z" />
    <path d="M 12.8,32 L 26.2,32 L 28.8,39 L 33.6,21.1 L 36.8,32 L 51.2,32" />
  </g>
</svg>"""

def save_text(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Saved: {path}")

# Write SVG assets
save_text(os.path.join(ASSETS_DIR, "logo.svg"), SVG_FULL)
save_text(os.path.join(PUBLIC_DIR, "favicon.svg"), SVG_FAVICON)

# Copy raw uploaded image for reference
if os.path.exists(USER_IMG_PATH):
    shutil.copy2(USER_IMG_PATH, os.path.join(ASSETS_DIR, "logo_user_uploaded.png"))

def find_edge():
    candidates = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return "msedge.exe"

EDGE_BIN = find_edge()

def render_svg_to_png(svg_content, out_png_path, width, height):
    """Render SVG to PNG using Edge Headless with exact pixel dimensions."""
    os.makedirs(os.path.dirname(out_png_path), exist_ok=True)
    tmp_svg = out_png_path + ".tmp.svg"
    tmp_html = out_png_path + ".tmp.html"
    
    with open(tmp_svg, "w", encoding="utf-8") as f:
        f.write(svg_content)
        
    html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  html, body {{ width: {width}px; height: {height}px; background: transparent; overflow: hidden; }}
  img {{ width: {width}px; height: {height}px; display: block; }}
</style>
</head>
<body>
  <img src="{os.path.basename(tmp_svg)}" />
</body>
</html>"""
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html)
        
    cmd = [
        EDGE_BIN,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        f"--window-size={width},{height}",
        f"--screenshot={out_png_path}",
        f"file:///{os.path.abspath(tmp_html).replace(chr(92), '/')}"
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # Crop or ensure exact dimensions if Edge added window chrome
        img = Image.open(out_png_path)
        if img.size != (width, height):
            img = img.crop((0, 0, width, height))
            img.save(out_png_path)
        print(f"Rendered PNG ({width}x{height}): {out_png_path}")
    except Exception as e:
        print(f"Failed rendering {out_png_path} via Edge: {e}")
    finally:
        if os.path.exists(tmp_svg): os.remove(tmp_svg)
        if os.path.exists(tmp_html): os.remove(tmp_html)

# Generate Web Assets
render_svg_to_png(SVG_FULL, os.path.join(ASSETS_DIR, "logo-512.png"), 512, 512)
render_svg_to_png(SVG_FULL, os.path.join(ASSETS_DIR, "logo.png"), 512, 512)
render_svg_to_png(SVG_FULL, os.path.join(ASSETS_DIR, "logo-192.png"), 192, 192)
render_svg_to_png(SVG_FULL, os.path.join(PUBLIC_DIR, "favicon.png"), 64, 64)

# Create multi-size favicon.ico
fav64 = Image.open(os.path.join(PUBLIC_DIR, "favicon.png"))
fav32 = fav64.resize((32, 32), Image.Resampling.LANCZOS)
fav16 = fav64.resize((16, 16), Image.Resampling.LANCZOS)
fav32.save(os.path.join(PUBLIC_DIR, "favicon.ico"), sizes=[(16, 16), (32, 32), (64, 64)])
print(f"Saved favicon.ico")

# Generate Android App Launcher Icons (app-android and prototype/android)
densities = {
    "mdpi": (48, 108),
    "hdpi": (72, 162),
    "xhdpi": (96, 216),
    "xxhdpi": (144, 324),
    "xxxhdpi": (192, 432),
}

android_res_roots = [
    os.path.join(PROJECT_ROOT, "app-android", "app", "src", "main", "res"),
    os.path.join(PROJECT_ROOT, "prototype", "android", "app", "src", "main", "res")
]

for res_root in android_res_roots:
    if not os.path.exists(res_root):
        continue
    for d, (sz, fsz) in densities.items():
        dir_path = os.path.join(res_root, f"mipmap-{d}")
        os.makedirs(dir_path, exist_ok=True)
        # Standard icon (squircle / rounded square)
        render_svg_to_png(SVG_FULL, os.path.join(dir_path, "ic_launcher.png"), sz, sz)
        # Round icon (circle)
        render_svg_to_png(SVG_ROUND, os.path.join(dir_path, "ic_launcher_round.png"), sz, sz)
        # Foreground for adaptive icon
        render_svg_to_png(SVG_FOREGROUND, os.path.join(dir_path, "ic_launcher_foreground.png"), fsz, fsz)

print("All logo assets generated successfully!")
