import os
import base64
import subprocess
import time
import shutil
import pypdf

def get_b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

samrat_sig = get_b64('docs/assets/team_credentials/samrat_signature.png')
hriday_sig = get_b64('docs/assets/team_credentials/hriday_signature.png')
jasheem_sig = get_b64('docs/assets/team_credentials/jasheem_signature.png')

samrat_id = get_b64('docs/assets/team_credentials/samrat_student_id.jpg')
samrat_adh = get_b64('docs/assets/team_credentials/samrat_aadhaar.jpg')

hriday_id = get_b64('docs/assets/team_credentials/hriday_student_id.jpg')
hriday_adh = get_b64('docs/assets/team_credentials/hriday_aadhaar.jpg')

jasheem_id = get_b64('docs/assets/team_credentials/jasheem_student_id.jpg')
jasheem_adh = get_b64('docs/assets/team_credentials/jasheem_aadhaar.jpg')

html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Student Team Details, Self-Certification & Declaration Form — ArohaSetu</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 18mm 16mm 18mm 16mm;
  }}
  * {{
    box-sizing: border-box;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  body {{
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    font-size: 9.5pt;
    line-height: 1.4;
    color: #111827;
    margin: 0;
    padding: 0;
  }}
  
  .page {{
    page-break-after: always;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }}
  .page:last-child {{
    page-break-after: avoid;
  }}

  .form-title {{
    text-align: center;
    font-size: 13pt;
    font-weight: 700;
    margin-bottom: 4px;
    color: #0f172a;
    letter-spacing: -0.2px;
  }}
  .form-subtitle {{
    text-align: center;
    font-size: 8.2pt;
    color: #475569;
    margin-bottom: 16px;
    line-height: 1.35;
    padding: 0 10px;
  }}

  .section-heading {{
    font-size: 10.5pt;
    font-weight: 700;
    color: #0f172a;
    margin-top: 10px;
    margin-bottom: 6px;
    border-bottom: 1.5px solid #cbd5e1;
    padding-bottom: 3px;
  }}

  .info-group {{
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }}
  .info-row {{
    display: flex;
    font-size: 9pt;
    align-items: baseline;
  }}
  .info-label {{
    font-weight: 700;
    width: 220px;
    color: #1e293b;
    flex-shrink: 0;
  }}
  .info-value {{
    flex: 1;
    border-bottom: 1px dotted #64748b;
    padding-bottom: 2px;
    color: #0f172a;
    font-weight: 600;
  }}

  table.member-table {{
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
    margin-bottom: 6px;
    font-size: 7.8pt;
  }}
  table.member-table th, table.member-table td {{
    border: 1px solid #475569;
    padding: 5px 4px;
    vertical-align: middle;
    text-align: left;
  }}
  table.member-table th {{
    background-color: #f1f5f9;
    font-weight: 700;
    color: #0f172a;
    text-align: center;
  }}

  .attach-note {{
    font-size: 8pt;
    font-style: italic;
    font-weight: 600;
    color: #475569;
    margin-top: 4px;
    margin-bottom: 10px;
    background-color: #f8fafc;
    padding: 4px 8px;
    border-left: 3px solid #3b82f6;
  }}

  .declaration-intro {{
    font-size: 8.8pt;
    margin-bottom: 6px;
    font-weight: 600;
  }}
  ol.declaration-list {{
    margin: 0;
    padding-left: 18px;
    font-size: 8.5pt;
    color: #1e293b;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }}
  ol.declaration-list li {{
    line-height: 1.35;
    text-align: justify;
  }}

  .sig-block {{
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }}
  .sig-row {{
    display: flex;
    align-items: center;
    font-size: 8.8pt;
    gap: 6px;
  }}
  .sig-num {{
    font-weight: 700;
    width: 18px;
  }}
  .sig-name-label {{
    font-weight: 600;
    width: 42px;
  }}
  .sig-name-val {{
    width: 175px;
    border-bottom: 1px dotted #475569;
    font-weight: 600;
    padding-bottom: 1px;
  }}
  .sig-label {{
    font-weight: 600;
    width: 65px;
    margin-left: 8px;
  }}
  .sig-line {{
    width: 170px;
    border-bottom: 1px solid #1e293b;
    height: 32px;
    display: flex;
    align-items: flex-end;
  }}
  .sig-date-label {{
    font-weight: 600;
    width: 38px;
    margin-left: 8px;
  }}
  .sig-date-val {{
    width: 85px;
    border-bottom: 1px dotted #475569;
    font-weight: 600;
    padding-bottom: 1px;
  }}

  .lead-cert-block {{
    margin-top: 14px;
    font-size: 8.8pt;
    line-height: 1.45;
  }}
  .lead-cert-text {{
    margin-bottom: 14px;
    text-align: justify;
  }}
  .lead-name-fill {{
    font-weight: 700;
    border-bottom: 1px dotted #1e293b;
    padding: 0 6px;
  }}

  .lead-bottom-row {{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 8.8pt;
  }}

  /* ATTACHMENT PAGES */
  .attach-header {{
    border-bottom: 2px solid #0f172a;
    padding-bottom: 8px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }}
  .attach-title {{
    font-size: 12pt;
    font-weight: 700;
    color: #0f172a;
  }}
  .attach-sub {{
    font-size: 8.5pt;
    color: #475569;
    font-weight: 600;
  }}
  .card-container {{
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    margin-top: 10px;
  }}
  .card-box {{
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 10px;
    background: #f8fafc;
    width: 100%;
    max-width: 540px;
    text-align: center;
    position: relative;
  }}
  .card-label {{
    font-size: 8.5pt;
    font-weight: 700;
    color: #334155;
    margin-bottom: 6px;
    text-align: left;
  }}
  .card-img {{
    max-width: 100%;
    max-height: 250px;
    border-radius: 4px;
    border: 1px solid #94a3b8;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }}
  .attest-badge {{
    margin-top: 14px;
    border: 2px dashed #0284c7;
    background: #f0f9ff;
    padding: 8px 16px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 540px;
  }}
  .attest-text {{
    font-size: 8.5pt;
    font-weight: 700;
    color: #0369a1;
  }}
</style>
</head>
<body>

<!-- PAGE 1: TEAM INFO, TABLE, CERTIFICATION 1 & 2 -->
<div class="page">
  <div class="form-title">Student Team Details, Self-Certification & Declaration Form</div>
  <div class="form-subtitle">
    (To be completed by all team members and uploaded by the Team Lead on the MY Bharat Portal - as part of the Hack for Social Cause Submission, together with a self-attested copy of each member's Student ID Card and details of government-issued photo ID - Aadhaar / Voter ID / Passport / Driving License.)
  </div>

  <div class="section-heading">A. Team Information</div>
  <div class="info-group">
    <div class="info-row">
      <div class="info-label">Team ID:</div>
      <div class="info-value">HSC|AN|00004</div>
    </div>
    <div class="info-row">
      <div class="info-label">Team Name:</div>
      <div class="info-value">ArohaSetu</div>
    </div>
    <div class="info-row">
      <div class="info-label">State/UT:</div>
      <div class="info-value">Andaman & Nicobar Islands (UT)</div>
    </div>
    <div class="info-row">
      <div class="info-label">Thematic Area / Problem Statement:</div>
      <div class="info-value">Healthcare, Wellbeing & Service Delivery / Elderly Care & Healthy Ageing</div>
    </div>
  </div>

  <div class="section-heading">B. Team Member Details</div>
  <table class="member-table">
    <thead>
      <tr>
        <th style="width: 4%;">S.No</th>
        <th style="width: 13%;">Full Name</th>
        <th style="width: 20%;">Institution Details:<br>(Name, Affiliation & AISHE Code)</th>
        <th style="width: 13%;">Course/Program & Year</th>
        <th style="width: 9%;">Student ID No.</th>
        <th style="width: 11%;">Date of Birth/Age<br>(as of 24th Aug 2026)</th>
        <th style="width: 16%;">Email ID</th>
        <th style="width: 14%;">Government ID:<br>Type & No</th>
      </tr>
    </thead>
    <tbody>
      <!-- SAMRAT -->
      <tr>
        <td style="text-align: center; font-weight: 700;">1</td>
        <td><strong>Samrat Das Gupta</strong><br><span style="font-size: 7pt; color: #475569;">(Team Lead / Concept)</span></td>
        <td>Tagore Government College of Education (TGCE), Port Blair<br><span style="font-size: 6.8pt; color: #475569;">Pondicherry Univ | AISHE: C-6574</span></td>
        <td>B.Sc.B.Ed. (Mathematics)<br>Session 2023–27</td>
        <td>Adm No: 3603</td>
        <td>13/01/2004 (22 yrs)<br><span style="font-size: 6.8pt; color: #16a34a; font-weight: 600;">✓ Eligible (18–29)</span></td>
        <td style="font-size: 6.5pt; white-space: nowrap;">samrat1312004@gmail.com</td>
        <td>Aadhaar No:<br><strong>7466 3849 9873</strong></td>
      </tr>
      <!-- HRIDAY -->
      <tr>
        <td style="text-align: center; font-weight: 700;">2</td>
        <td><strong>Hriday Das</strong><br><span style="font-size: 7pt; color: #475569;">(Main Developer / Coder)</span></td>
        <td>Tagore Government College of Education (TGCE), Port Blair<br><span style="font-size: 6.8pt; color: #475569;">Pondicherry Univ | AISHE: C-6574</span></td>
        <td>B.Sc B.Ed (Computer Science)<br>Session 2023–27</td>
        <td>Adm No: 3578</td>
        <td>06/06/2006 (20 yrs)<br><span style="font-size: 6.8pt; color: #16a34a; font-weight: 600;">✓ Eligible (18–29)</span></td>
        <td style="font-size: 6.5pt; white-space: nowrap;">thehrixx@gmail.com</td>
        <td>Aadhaar No:<br><strong>2767 5330 6157</strong></td>
      </tr>
      <!-- JASHEEM -->
      <tr>
        <td style="text-align: center; font-weight: 700;">3</td>
        <td><strong>Mohd Jasheem C</strong><br><span style="font-size: 7pt; color: #475569;">(Designer)</span></td>
        <td>Tagore Government College of Education (TGCE), Port Blair<br><span style="font-size: 6.8pt; color: #475569;">Pondicherry Univ | AISHE: C-6574</span></td>
        <td>B.Sc.B.Ed (Computer Sci.)<br>Session 2023–27</td>
        <td>Adm No: 3661</td>
        <td>24/01/2005 (21 yrs)<br><span style="font-size: 6.8pt; color: #16a34a; font-weight: 600;">✓ Eligible (18–29)</span></td>
        <td style="font-size: 6.5pt; white-space: nowrap;">cmohdjasheem24@gmail.com</td>
        <td>Aadhaar No:<br><strong>6777 7409 5316</strong></td>
      </tr>
    </tbody>
  </table>
  <div class="attach-note">
    Attach: Self-attested copy of Student ID Card for each member listed above (Appended on Pages 3, 4, and 5 of this document).
  </div>

  <div class="section-heading">C. Self-Certification</div>
  <div class="declaration-intro">We, the undersigned team members, hereby declare that:</div>
  <ol class="declaration-list" start="1">
    <li>The solution submitted is an original work created by us and does not infringe upon any third-party intellectual property rights.</li>
    <li>The submission is free from plagiarism and has not been copied from any other source without due credit.</li>
  </ol>
</div>

<!-- PAGE 2: CERTIFICATION 3-6 & SIGNATURES -->
<div class="page">
  <ol class="declaration-list" start="3" style="margin-top: 10px;">
    <li>All information provided in this form, including our identity, contact, and institutional details, is true and accurate to the best of our knowledge.</li>
    <li>We accept full responsibility for participating in the State-level and subsequent stages of the Hack for Social Cause competition under VBYLD 2027, if our team is selected, and for complying with all applicable guidelines, rules, and instructions, as well as cooperating with any post-award verification.</li>
    <li>We consent to our names, project details, and submitted materials being used by MoYAS and IIT Bombay for educational, promotional, and public-service purposes, as outlined in these Guidelines.</li>
    <li>We understand that any false declaration, misrepresentation, or submission of invalid ID proof may lead to disqualification at any stage, including after an award has been announced.</li>
  </ol>

  <div style="font-weight: 700; margin-top: 22px; margin-bottom: 8px; font-size: 9.2pt; color: #0f172a;">
    Signatures of Team Members:
  </div>

  <div class="sig-block">
    <!-- SAMRAT SIG -->
    <div class="sig-row">
      <div class="sig-num">1.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Samrat Das Gupta</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line"><img src="data:image/png;base64,{samrat_sig}" style="height: 32px; margin-bottom: -3px;"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">23 / 10 / 2026</div>
    </div>

    <!-- HRIDAY SIG -->
    <div class="sig-row">
      <div class="sig-num">2.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Hriday Das</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line"><img src="data:image/png;base64,{hriday_sig}" style="height: 32px; margin-bottom: -3px;"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">23 / 10 / 2026</div>
    </div>

    <!-- JASHEEM SIG -->
    <div class="sig-row">
      <div class="sig-num">3.</div>
      <div class="sig-name-label">Name:</div>
      <div class="sig-name-val">Mohd Jasheem C</div>
      <div class="sig-label">Signature:</div>
      <div class="sig-line"><img src="data:image/png;base64,{jasheem_sig}" style="height: 32px; margin-bottom: -3px;"></div>
      <div class="sig-date-label">Date:</div>
      <div class="sig-date-val">23 / 10 / 2026</div>
    </div>
  </div>

  <div class="section-heading" style="margin-top: 26px;">D. Team Lead Certification</div>
  <div class="lead-cert-block">
    <div class="lead-cert-text">
      I, <span class="lead-name-fill">Samrat Das Gupta</span> (Name of Team Lead), hereby certify, on behalf of the team, that the above information is complete and accurate, and accept responsibility for the submission of this entry.
    </div>

    <div style="margin-top: 16px; display: flex; align-items: flex-end; gap: 12px;">
      <div style="font-weight: 600;">Signature of Team Lead:</div>
      <div style="border-bottom: 1px solid #1e293b; width: 220px; display: flex; align-items: flex-end;">
        <img src="data:image/png;base64,{samrat_sig}" style="height: 36px; margin-bottom: -3px;">
      </div>
    </div>

    <div class="lead-bottom-row">
      <div><strong>Place:</strong> Port Blair, Andaman & Nicobar Islands</div>
      <div><strong>Date:</strong> 23 / 10 / 2026</div>
    </div>
  </div>
</div>

<!-- PAGE 3: ATTACHMENT 1 - SAMRAT DAS GUPTA -->
<div class="page">
  <div class="attach-header">
    <div>
      <div class="attach-title">Attachment 1: Student Identity & Government Proof</div>
      <div class="attach-sub">Team Lead: Samrat Das Gupta | Team ID: HSC|AN|00004</div>
    </div>
    <div style="font-size: 8pt; color: #64748b;">Page 3 of 5</div>
  </div>

  <div class="card-container">
    <div class="card-box">
      <div class="card-label">1. Official Student Identity Card (TGCE Port Blair — Adm No: 3603)</div>
      <img src="data:image/jpeg;base64,{samrat_id}" class="card-img" style="max-height: 260px;">
    </div>

    <div class="card-box">
      <div class="card-label">2. Government Photo Identity Proof (Aadhaar Card: 7466 3849 9873)</div>
      <img src="data:image/jpeg;base64,{samrat_adh}" class="card-img" style="max-height: 240px;">
    </div>

    <div class="attest-badge">
      <div class="attest-text">
        <span>✓ Self-Attested True Copy</span><br>
        <span style="font-size: 7.5pt; font-weight: 500; color: #475569;">Verified by Samrat Das Gupta • Date: 23/10/2026</span>
      </div>
      <div>
        <img src="data:image/png;base64,{samrat_sig}" style="height: 30px;">
      </div>
    </div>
  </div>
</div>

<!-- PAGE 4: ATTACHMENT 2 - HRIDAY DAS -->
<div class="page">
  <div class="attach-header">
    <div>
      <div class="attach-title">Attachment 2: Student Identity & Government Proof</div>
      <div class="attach-sub">Main Developer / Coder: Hriday Das | Team ID: HSC|AN|00004</div>
    </div>
    <div style="font-size: 8pt; color: #64748b;">Page 4 of 5</div>
  </div>

  <div class="card-container">
    <div class="card-box">
      <div class="card-label">1. Official Student Identity Card (TGCE Port Blair — Adm No: 3578)</div>
      <img src="data:image/jpeg;base64,{hriday_id}" class="card-img" style="max-height: 260px;">
    </div>

    <div class="card-box">
      <div class="card-label">2. Government Photo Identity Proof (Aadhaar Card: 2767 5330 6157)</div>
      <img src="data:image/jpeg;base64,{hriday_adh}" class="card-img" style="max-height: 240px;">
    </div>

    <div class="attest-badge">
      <div class="attest-text">
        <span>✓ Self-Attested True Copy</span><br>
        <span style="font-size: 7.5pt; font-weight: 500; color: #475569;">Verified by Hriday Das • Date: 23/10/2026</span>
      </div>
      <div>
        <img src="data:image/png;base64,{hriday_sig}" style="height: 30px;">
      </div>
    </div>
  </div>
</div>

<!-- PAGE 5: ATTACHMENT 3 - MOHD JASHEEM C -->
<div class="page">
  <div class="attach-header">
    <div>
      <div class="attach-title">Attachment 3: Student Identity & Government Proof</div>
      <div class="attach-sub">Designer: Mohd Jasheem C | Team ID: HSC|AN|00004</div>
    </div>
    <div style="font-size: 8pt; color: #64748b;">Page 5 of 5</div>
  </div>

  <div class="card-container">
    <div class="card-box">
      <div class="card-label">1. Official Student Identity Card (TGCE Port Blair — Adm No: 3661)</div>
      <img src="data:image/jpeg;base64,{jasheem_id}" class="card-img" style="max-height: 260px;">
    </div>

    <div class="card-box">
      <div class="card-label">2. Government Photo Identity Proof (Aadhaar Card: 6777 7409 5316)</div>
      <img src="data:image/jpeg;base64,{jasheem_adh}" class="card-img" style="max-height: 240px;">
    </div>

    <div class="attest-badge">
      <div class="attest-text">
        <span>✓ Self-Attested True Copy</span><br>
        <span style="font-size: 7.5pt; font-weight: 500; color: #475569;">Verified by Mohd Jasheem C • Date: 23/10/2026</span>
      </div>
      <div>
        <img src="data:image/png;base64,{jasheem_sig}" style="height: 30px;">
      </div>
    </div>
  </div>
</div>

</body>
</html>
'''

with open('docs/source/Official_Student_Team_Declaration_Filled.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("HTML generated successfully! Now compiling 5-page submission package via Edge headless...")
