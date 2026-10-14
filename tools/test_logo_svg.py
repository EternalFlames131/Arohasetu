import os
from PIL import Image

# Path to the user uploaded image
USER_IMG_PATH = r"C:/Users/samra/.gemini/antigravity/brain/793fb21f-7558-493b-bf5c-40ef0bc33629/.user_uploaded/media_1791916665737_740ec453.png"

# SVG with exact proportions matching the user's icon
# User icon: Rounded square #E8F6F5, Navy #103663 stroke
# Heart with ECG pulse line in middle
SVG_TEMPLATE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="{size}" height="{size}">
  {bg_rect}
  <g fill="none" stroke="#103663" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <!-- Heart outline -->
    <path d="M 50,78 C 36,66 22,53 22,38 C 22,25.5 31.5,18 41.5,18 C 45.8,18 48.5,20.2 50,22.2 C 51.5,20.2 54.2,18 58.5,18 C 68.5,18 78,25.5 78,38 C 78,53 64,66 50,78 Z" />
    <!-- Horizontal pulse line with ECG spike -->
    <path d="M 22,48 L 41,48 L 45.5,55 L 52.5,33 L 57.5,58 L 62,48 L 78,48" />
  </g>
</svg>"""

def get_svg(size=100, with_bg=True, rx=24):
    bg_rect = f'<rect width="100" height="100" rx="{rx}" fill="#E8F6F5"/>' if with_bg else ''
    return SVG_TEMPLATE.format(size=size, bg_rect=bg_rect)

print("SVG Generated successfully")
