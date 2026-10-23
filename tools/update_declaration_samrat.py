import base64
import os

with open('docs/assets/team_credentials/samrat_signature.png', 'rb') as f:
    sig_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('docs/source/Official_Student_Team_Declaration_Filled.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace Samrat's row in table
old_row = """      <tr>
        <td style="text-align: center; font-weight: 700;">1</td>
        <td><strong>Samrat Dasgupta</strong><br><span style="font-size: 7.2pt; color: #475569;">(Team Lead)</span></td>
        <td>Tagore Government College of Education (TGCE), Port Blair<br><span style="font-size: 7pt; color: #475569;">Pondicherry Univ | AISHE: C-6574</span></td>
        <td>B.Ed (Teacher Trainee)<br>2nd Year</td>
        <td>__________________</td>
        <td>_____ / _____ yrs<br><span style="font-size: 6.8pt; color: #64748b;">(Eligible: 18–29 yrs)</span></td>
        <td>__________________</td>
        <td>Aadhaar No:<br>__________________</td>
      </tr>"""

new_row = f"""      <tr>
        <td style="text-align: center; font-weight: 700;">1</td>
        <td><strong>Samrat Das Gupta</strong><br><span style="font-size: 7.2pt; color: #475569;">(Team Lead / Project Concept)</span></td>
        <td>Tagore Government College of Education (TGCE), Port Blair<br><span style="font-size: 7pt; color: #475569;">Pondicherry Univ | AISHE: C-6574</span></td>
        <td>B.Sc.B.Ed. (Mathematics)<br>Session 2023–27</td>
        <td>Roll: 2382<br><span style="font-size: 6.8pt; color: #64748b;">(Adm: 3603)</span></td>
        <td>13/01/2004 (22 yrs)<br><span style="font-size: 6.8pt; color: #16a34a; font-weight: 600;">✓ Eligible (18–29)</span></td>
        <td>[Samrat's Email]</td>
        <td>Aadhaar No:<br><strong>7466 3849 9873</strong></td>
      </tr>"""

old_sig1 = """    <div class="sig-row">
      <div class="sig-num">1.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Samrat Dasgupta</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">23 / 10 / 2026</div>
    </div>"""

new_sig1 = f"""    <div class="sig-row">
      <div class="sig-num">1.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Samrat Das Gupta</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line" style="display: flex; align-items: flex-end;"><img src="data:image/png;base64,{sig_b64}" style="height: 34px; margin-bottom: -4px;"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">23 / 10 / 2026</div>
    </div>"""

old_lead_sig = """    <div style="margin-top: 30px;">
      <div style="font-weight: 600;">Signature of Team Lead: __________________________________________________</div>
    </div>"""

new_lead_sig = f"""    <div style="margin-top: 20px; display: flex; align-items: flex-end; gap: 14px;">
      <div style="font-weight: 600;">Signature of Team Lead:</div>
      <div style="border-bottom: 1px solid #1e293b; width: 220px; display: flex; align-items: flex-end;">
        <img src="data:image/png;base64,{sig_b64}" style="height: 38px; margin-bottom: -4px;">
      </div>
    </div>"""

if old_row in html:
    html = html.replace(old_row, new_row)
    print("Replaced Samrat row!")
else:
    print("WARNING: old_row not found!")

if old_sig1 in html:
    html = html.replace(old_sig1, new_sig1)
    print("Replaced Samrat member signature!")
else:
    print("WARNING: old_sig1 not found!")

if old_lead_sig in html:
    html = html.replace(old_lead_sig, new_lead_sig)
    print("Replaced Samrat lead signature!")
else:
    print("WARNING: old_lead_sig not found!")

html = html.replace("Samrat Dasgupta", "Samrat Das Gupta")

with open('docs/source/Official_Student_Team_Declaration_Filled.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("SUCCESS: HTML updated with Samrat's credentials and dual signatures!")
