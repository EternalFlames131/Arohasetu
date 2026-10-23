import base64
import subprocess
import os

with open('docs/assets/team_credentials/hriday_signature.png', 'rb') as f:
    sig_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('docs/source/Official_Student_Team_Declaration_Filled.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Hriday's row
old_row = """      <tr>
        <td style="text-align: center; font-weight: 700;">2</td>
        <td><strong>Hriday Das</strong><br><span style="font-size: 7.2pt; color: #475569;">(Main Coder)</span></td>
        <td>________________________<br><span style="font-size: 7pt; color: #475569;">AISHE Code: ____________</span></td>
        <td>__________________</td>
        <td>__________________</td>
        <td>_____ / _____ yrs<br><span style="font-size: 6.8pt; color: #64748b;">(Eligible: 18–29 yrs)</span></td>
        <td>__________________</td>
        <td>Aadhaar No:<br>__________________</td>
      </tr>"""

new_row = f"""      <tr>
        <td style="text-align: center; font-weight: 700;">2</td>
        <td><strong>Hriday Das</strong><br><span style="font-size: 7.2pt; color: #475569;">(Main Developer / Coder)</span></td>
        <td>Tagore Government College of Education (TGCE), Port Blair<br><span style="font-size: 7pt; color: #475569;">Pondicherry Univ | AISHE: C-6574</span></td>
        <td>B.Sc B.Ed (Computer Science)<br>Session 2023–27</td>
        <td>Roll: 2206<br><span style="font-size: 6.8pt; color: #64748b;">(Adm: 3578)</span></td>
        <td>06/06/2006 (20 yrs)<br><span style="font-size: 6.8pt; color: #16a34a; font-weight: 600;">✓ Eligible (18–29)</span></td>
        <td>[Hriday's Email]</td>
        <td>Aadhaar No:<br><strong>2767 5330 6157</strong></td>
      </tr>"""

old_sig = """    <div class="sig-row">
      <div class="sig-num">2.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Hriday Das</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">21 / 10 / 2026</div>
    </div>"""

new_sig = f"""    <div class="sig-row">
      <div class="sig-num">2.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Hriday Das</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line" style="display: flex; align-items: flex-end;"><img src="data:image/png;base64,{sig_b64}" style="height: 32px; margin-bottom: -4px;"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">23 / 10 / 2026</div>
    </div>"""

if old_row in html and old_sig in html:
    html = html.replace(old_row, new_row).replace(old_sig, new_sig)
    html = html.replace("21 / 10 / 2026", "23 / 10 / 2026")
    with open('docs/source/Official_Student_Team_Declaration_Filled.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: HTML updated with Hriday's details and signature!")
else:
    print("WARNING: Pattern mismatch, checking substrings...")
