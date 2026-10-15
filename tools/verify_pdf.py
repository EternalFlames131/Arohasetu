# verify_pdf.py
# Prints page count and checks key content of the Arohasetu concept PDF.
# Usage: python -X utf8 tools\verify_pdf.py path\file.pdf
import sys
from pypdf import PdfReader

path = sys.argv[1] if len(sys.argv) > 1 else "docs/Arohasetu_Features_And_Recommended_Fixes.pdf"
r = PdfReader(path)
text = "".join(p.extract_text() for p in r.pages)
low = text.lower()

print("pages:", len(r.pages))
checks = ["AROHASETU", "Virtual Ward", "camera", "15 October 2026", "privacy"]
failed = False
for kw in checks:
    ok = kw.lower() in low
    print(("OK   " if ok else "MISS "), kw)
    if not ok:
        failed = True

sys.exit(1 if failed else 0)