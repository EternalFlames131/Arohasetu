import os
import subprocess
import time
import shutil
import pypdf

src = os.path.abspath('docs/source/Official_Student_Team_Declaration_Filled.html')
out = os.path.abspath('docs/Arohasetu_Student_Declaration_Form_Filled.pdf')
downloads_out = r'C:\Users\samra\Dropbox\PC\Downloads\Arohasetu_Student_Declaration_Form_Filled.pdf'

edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if not os.path.exists(edge):
    edge = r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'

if os.path.exists(out):
    os.remove(out)

src_url = 'file:///' + src.replace('\\', '/')
cmd = [
    edge,
    '--headless=new',
    '--run-all-compositor-stages-before-draw',
    '--no-pdf-header-footer',
    f'--print-to-pdf={out}',
    src_url
]
subprocess.run(cmd, check=True)
time.sleep(2)

size = os.path.getsize(out)
print(f'Generated PDF size: {size} bytes')

shutil.copy(out, downloads_out)
print('Copied to Downloads folder!')

reader = pypdf.PdfReader(out)
print('Num pages:', len(reader.pages))
print('Page 1 has Aadhaar:', '2767 5330 6157' in reader.pages[0].extract_text())
print('Page 2 has Hriday signature / date:', '23 / 10 / 2026' in reader.pages[1].extract_text())
