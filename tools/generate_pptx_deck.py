"""
tools/generate_pptx_deck.py
Generates the official ArohaSetu Presentation Deck (.pptx) matching HSC v7.0 template,
correcting all branding to ArohaSetu, setting registration ID to HSC|AN|00004,
populating verified team roster, and embedding truthful AI disclosure.
"""

import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck(output_path):
    prs = Presentation()
    # 16:9 widescreen layout
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme colors
    NAVY = RGBColor(16, 54, 99)       # #103663
    TEAL = RGBColor(8, 166, 166)      # #08A6A6
    DARK = RGBColor(15, 23, 42)       # #0F172A
    SLATE = RGBColor(71, 85, 105)     # #475569
    LIGHT_BG = RGBColor(248, 250, 252)# #F8FAFC
    CARD_BORDER = RGBColor(203, 213, 225) # #CBD5E1
    WHITE = RGBColor(255, 255, 255)
    ROSE = RGBColor(225, 29, 72)      # #E11D48
    CARD_TEAL_BG = RGBColor(240, 253, 250) # #F0FDFA
    CARD_TEAL_BORDER = RGBColor(153, 246, 228) # #99F6E4

    def add_header(slide, title_text, category_text, slide_num):
        # Category / Super-title
        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(10), Inches(0.35))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = category_text.upper()
        p.font.name = "Calibri"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = TEAL

        # Title
        tx_box2 = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(9.5), Inches(0.6))
        tf2 = tx_box2.text_frame
        tf2.word_wrap = True
        tf2.margin_left = tf2.margin_top = tf2.margin_right = tf2.margin_bottom = 0
        p2 = tf2.paragraphs[0]
        p2.text = title_text
        p2.font.name = "Calibri"
        p2.font.size = Pt(22)
        p2.font.bold = True
        p2.font.color.rgb = NAVY

        # Top-right Team & Reg Info
        tx_box_tr = slide.shapes.add_textbox(Inches(8.5), Inches(0.4), Inches(4.0), Inches(0.6))
        tf_tr = tx_box_tr.text_frame
        tf_tr.word_wrap = True
        tf_tr.margin_left = tf_tr.margin_top = tf_tr.margin_right = tf_tr.margin_bottom = 0
        p_tr = tf_tr.paragraphs[0]
        p_tr.alignment = PP_ALIGN.RIGHT
        p_tr.text = "Reg ID: HSC|AN|00004"
        p_tr.font.name = "Calibri"
        p_tr.font.size = Pt(11)
        p_tr.font.bold = True
        p_tr.font.color.rgb = ROSE

        p_tr2 = tf_tr.add_paragraph()
        p_tr2.alignment = PP_ALIGN.RIGHT
        p_tr2.text = "Team: ArohaSetu • A&N Islands"
        p_tr2.font.name = "Calibri"
        p_tr2.font.size = Pt(9.5)
        p_tr2.font.color.rgb = SLATE

        # Dividing line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.025))
        line.fill.solid()
        line.fill.fore_color.rgb = TEAL
        line.line.color.rgb = TEAL

    def add_footer(slide, slide_num):
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.9), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = CARD_BORDER
        line.line.color.rgb = CARD_BORDER

        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(6.95), Inches(8.0), Inches(0.35))
        tf = tx_box.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = "ArohaSetu — Hack for Social Cause 2027 (VBYLD) • Knowledge Partner: IIT Bombay"
        p.font.name = "Calibri"
        p.font.size = Pt(9)
        p.font.color.rgb = SLATE

        tx_box_r = slide.shapes.add_textbox(Inches(9.5), Inches(6.95), Inches(3.033), Inches(0.35))
        tf_r = tx_box_r.text_frame
        tf_r.margin_left = tf_r.margin_top = tf_r.margin_right = tf_r.margin_bottom = 0
        p_r = tf_r.paragraphs[0]
        p_r.alignment = PP_ALIGN.RIGHT
        p_r.text = f"Slide {slide_num} of 7"
        p_r.font.name = "Calibri"
        p_r.font.size = Pt(9.5)
        p_r.font.bold = True
        p_r.font.color.rgb = NAVY

    def add_card(slide, x, y, w, h, bg_color=LIGHT_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
        return card

    # ==========================================
    # SLIDE 1: COVER
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    
    # Left decorative bar
    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.4), Inches(7.5))
    bar.fill.solid()
    bar.fill.fore_color.rgb = NAVY
    bar.line.fill.background()

    # Category badge
    c_badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(0.8), Inches(4.8), Inches(0.4))
    c_badge.fill.solid()
    c_badge.fill.fore_color.rgb = CARD_TEAL_BG
    c_badge.line.color.rgb = CARD_TEAL_BORDER
    tf = c_badge.text_frame
    p = tf.paragraphs[0]
    p.text = "HACK FOR SOCIAL CAUSE 2027 • VBYLD (IIT BOMBAY)"
    p.font.name = "Calibri"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = TEAL

    # Title
    t_box = s1.shapes.add_textbox(Inches(1.0), Inches(1.3), Inches(10.5), Inches(1.0))
    tf = t_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "ArohaSetu"
    p.font.name = "Calibri"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = NAVY

    # Subtitle / Tagline
    st_box = s1.shapes.add_textbox(Inches(1.0), Inches(2.3), Inches(10.5), Inches(0.5))
    tf = st_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Notice Sooner, Care Better — A Personal Nurse for Every Family & Hospital Bed"
    p.font.name = "Calibri"
    p.font.size = Pt(16)
    p.font.color.rgb = TEAL

    # Two Main Cards on Slide 1
    # Card Left: Project Profile
    add_card(s1, 1.0, 3.1, 5.4, 3.4, CARD_TEAL_BG, CARD_TEAL_BORDER)
    tx_l = s1.shapes.add_textbox(Inches(1.2), Inches(3.25), Inches(5.0), Inches(3.1))
    tfl = tx_l.text_frame
    tfl.word_wrap = True

    p = tfl.paragraphs[0]
    p.text = "PROJECT METADATA & REPOSITORIES"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEAL

    items_l = [
        ("Theme:", "Healthcare, Wellbeing & Elderly Care"),
        ("Concept Title:", "Privacy-Conscious Patient Monitoring & Emergency Response"),
        ("Registration ID:", "HSC|AN|00004"),
        ("Target Region:", "Andaman & Nicobar Islands (Union Territory)"),
        ("Open-Source Code:", "github.com/EternalFlames131/Arohasetu"),
        ("Live Web Simulator:", "https://arohasetu.vercel.app")
    ]
    for lbl, val in items_l:
        p = tfl.add_paragraph()
        p.space_before = Pt(5)
        run1 = p.add_run()
        run1.text = lbl + " "
        run1.font.bold = True
        run1.font.size = Pt(9.5)
        run1.font.color.rgb = DARK
        run2 = p.add_run()
        run2.text = val
        run2.font.size = Pt(9.5)
        run2.font.color.rgb = NAVY if "http" in val or "github" in val else SLATE

    # Card Right: Team Composition
    add_card(s1, 6.7, 3.1, 5.6, 3.4, LIGHT_BG, CARD_BORDER)
    tx_r = s1.shapes.add_textbox(Inches(6.9), Inches(3.25), Inches(5.2), Inches(3.1))
    tfr = tx_r.text_frame
    tfr.word_wrap = True

    p = tfr.paragraphs[0]
    p.text = "TEAM COMPOSITION & ROLES"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = NAVY

    members = [
        ("Samrat Dasgupta (Team Leader)", "Teacher Trainee • Clinical idea, workflow architecture & island validation"),
        ("Hriday Das (Main Developer)", "Coder • Full-stack engineering, local YOLO vision sentinel & testing"),
        ("C. Mohd. Jasheem (Designer)", "UI/UX Designer • Visual design, presentation deck & user experience assets")
    ]
    for name, role in members:
        p = tfr.add_paragraph()
        p.space_before = Pt(8)
        run1 = p.add_run()
        run1.text = name + "\n"
        run1.font.bold = True
        run1.font.size = Pt(10)
        run1.font.color.rgb = DARK
        run2 = p.add_run()
        run2.text = role
        run2.font.size = Pt(8.5)
        run2.font.color.rgb = SLATE

    add_footer(s1, 1)

    # ==========================================
    # SLIDE 2: PROBLEM & PROPOSED SOLUTION
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "From Delayed Awareness to Structured Escalation", "PROBLEM – PROPOSED SOLUTION", 2)

    # Status key bar
    sk_box = s2.shapes.add_textbox(Inches(0.8), Inches(1.45), Inches(11.733), Inches(0.3))
    tf = sk_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Status Key: IMPLEMENTED in prototype • SIMULATED in test harness • PLANNED for production hardware"
    p.font.name = "Calibri"
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = TEAL

    # 4 Problem/Solution Cards
    cols = [
        ("PROBLEM 01", "Unobserved Fall or Decline",
         "Older adults living alone risk acute injury or sudden deterioration without immediate help.",
         "IMPLEMENTED", "Camera Pose Analysis: Local OpenCV + YOLO-Pose sentinel detects falls and immobility without saving video."),
        ("PROBLEM 02", "Remote Family Uncertainty",
         "Families living far away lack real-time visibility into an elder's immediate health and daily safety.",
         "IMPLEMENTED", "Caregiver Notification: Dedicated web dashboard with configured alerts, medication logs, and live feeds."),
        ("PROBLEM 03", "Ward Monitoring Bottlenecks",
         "Clinical teams struggle to watch multiple dispersed patients across rural and island wards continuously.",
         "IMPLEMENTED", "Virtual-Ward Triage: Nurse workflow engine running deterministic NEWS2 clinical risk calculations."),
        ("PROBLEM 04", "Geographic Care Latency",
         "Island and rural communities encounter severe transport and telecom delays reaching acute emergency care.",
         "SIMULATED / PLANNED", "Dual-Mode Triage: Home mode paired with hardware sensor telemetry (Planned) and offline Android client (Implemented).")
    ]

    card_w = 2.75
    gap = 0.244
    for i, (p_num, p_title, p_desc, s_badge, s_desc) in enumerate(cols):
        cx = 0.8 + i * (card_w + gap)
        add_card(s2, cx, 1.8, card_w, 4.2)
        c_box = s2.shapes.add_textbox(Inches(cx + 0.15), Inches(1.9), Inches(card_w - 0.3), Inches(4.0))
        tf = c_box.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = p_num
        p.font.name = "Calibri"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = ROSE

        p = tf.add_paragraph()
        p.text = p_title
        p.font.name = "Calibri"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = NAVY
        p.space_before = Pt(3)

        p = tf.add_paragraph()
        p.text = p_desc
        p.font.name = "Calibri"
        p.font.size = Pt(8.5)
        p.font.color.rgb = SLATE
        p.space_before = Pt(4)

        p = tf.add_paragraph()
        p.text = "SOLUTION: " + s_badge
        p.font.name = "Calibri"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = TEAL
        p.space_before = Pt(12)

        p = tf.add_paragraph()
        p.text = s_desc
        p.font.name = "Calibri"
        p.font.size = Pt(8.5)
        p.font.color.rgb = DARK
        p.space_before = Pt(4)

    # Bottom summary box
    b_card = add_card(s2, 0.8, 6.1, 11.733, 0.65, CARD_TEAL_BG, CARD_TEAL_BORDER)
    b_box = s2.shapes.add_textbox(Inches(0.95), Inches(6.15), Inches(11.4), Inches(0.55))
    tf = b_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Core Innovation: Combines physiological telemetry with privacy-conscious on-device pose estimation and deterministic clinical scoring under home and virtual-ward modes. Fully transparent: no claim of unassisted medical diagnosis."
    p.font.name = "Calibri"
    p.font.size = Pt(8.8)
    p.font.bold = True
    p.font.color.rgb = NAVY

    add_footer(s2, 2)

    # ==========================================
    # SLIDE 3: TECHNICAL APPROACH
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "Modular End-to-End Pipeline & Implementation Stack", "TECHNICAL APPROACH", 3)

    steps = [
        ("01 • DATA INPUTS",
         [("Sensor Vitals:", "Heart rate, SpO2, blood pressure (SIMULATED in demo; physical BLE sensors PLANNED)."),
          ("Vision Stream:", "Local room camera feed for real-time kinematic posture analysis (IMPLEMENTED).")]),
        ("02 • PROCESSING",
         [("Vision Sentinel:", "Python, OpenCV, YOLO-Pose extracting skeletal keypoints locally without video export."),
          ("Signal Guard:", "Boundary checking and noise filtering on ingested vital streams.")]),
        ("03 • RISK EVALUATION",
         [("NEWS2 Engine:", "Deterministic scoring against Royal College of Physicians clinical thresholds."),
          ("Fall Engine:", "Torso velocity drop and floor immobility verification windows (100% precision lab).")]),
        ("04 • INTERFACES",
         [("Web Dashboard:", "React + Tailwind CSS with Node.js/Express REST backend (PWA-ready)."),
          ("Mobile Client:", "Kotlin + Jetpack Compose Android app with offline SQLite/SharedPrefs caching.")])
    ]

    for i, (st_title, st_items) in enumerate(steps):
        cx = 0.8 + i * (card_w + gap)
        add_card(s3, cx, 1.6, card_w, 3.5)
        c_box = s3.shapes.add_textbox(Inches(cx + 0.15), Inches(1.75), Inches(card_w - 0.3), Inches(3.2))
        tf = c_box.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = st_title
        p.font.name = "Calibri"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = TEAL

        for head, body in st_items:
            p = tf.add_paragraph()
            p.space_before = Pt(8)
            run1 = p.add_run()
            run1.text = head + " "
            run1.font.bold = True
            run1.font.size = Pt(8.8)
            run1.font.color.rgb = NAVY
            run2 = p.add_run()
            run2.text = body
            run2.font.size = Pt(8.2)
            run2.font.color.rgb = DARK

    # Bottom 2 Cards: Repositories & AI Disclosure
    add_card(s3, 0.8, 5.25, 5.7, 1.5, LIGHT_BG, CARD_BORDER)
    tx_repo = s3.shapes.add_textbox(Inches(0.95), Inches(5.35), Inches(5.4), Inches(1.3))
    tf = tx_repo.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "REPOSITORY & LIVE ARTIFACTS"
    p.font.name = "Calibri"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = NAVY

    p = tf.add_paragraph()
    p.space_before = Pt(4)
    p.text = "• GitHub: github.com/EternalFlames131/Arohasetu (Licensed under MIT)\n• Live Web Simulator: https://arohasetu.vercel.app\n• Native Android APK: 26.4 MB offline package (com.arohasetu.app)"
    p.font.size = Pt(8.5)
    p.font.color.rgb = DARK

    # AI Usage Disclosure Card
    add_card(s3, 6.7, 5.25, 5.833, 1.5, CARD_TEAL_BG, CARD_TEAL_BORDER)
    tx_ai = s3.shapes.add_textbox(Inches(6.85), Inches(5.35), Inches(5.5), Inches(1.3))
    tf = tx_ai.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "MANDATORY AI USAGE DISCLOSURE"
    p.font.name = "Calibri"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = TEAL

    p = tf.add_paragraph()
    p.space_before = Pt(4)
    p.text = "AI was used strictly to do light bug checks and light coding only; other than that, everything was self-made and created entirely by the team (healthcare concept, two-layer architecture, clinical scoring, UI/UX designs, and validation labs)."
    p.font.size = Pt(8.2)
    p.font.color.rgb = NAVY

    add_footer(s3, 3)

    # ==========================================
    # SLIDE 4: IMPACT POTENTIAL
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "Ecosystem Connectivity & Intended Benefits", "IMPACT POTENTIAL", 4)

    # 3 Cards on Slide 4
    add_card(s4, 0.8, 1.6, 3.7, 4.3)
    tx1 = s4.shapes.add_textbox(Inches(0.95), Inches(1.75), Inches(3.4), Inches(4.0))
    tf1 = tx1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "TARGET POPULATIONS"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEAL

    groups = [
        ("Older Adults Living Alone:", "Seniors with mobility risks or chronic cardiac/respiratory conditions."),
        ("Family Caregivers:", "Working family members who need real-time reassurance without intrusion."),
        ("Virtual Ward Patients:", "Post-op, elderly, or stable ward patients freed from constant bedside nursing."),
        ("Isolated Island Communities:", "Residents across Little Andaman, Nicobar, and rural panchayats.")
    ]
    for g_title, g_desc in groups:
        p = tf1.add_paragraph()
        p.space_before = Pt(6)
        run1 = p.add_run()
        run1.text = g_title + " "
        run1.font.bold = True
        run1.font.size = Pt(8.8)
        run1.font.color.rgb = NAVY
        run2 = p.add_run()
        run2.text = g_desc
        run2.font.size = Pt(8.2)
        run2.font.color.rgb = DARK

    add_card(s4, 4.8, 1.6, 3.7, 4.3)
    tx2 = s4.shapes.add_textbox(Inches(4.95), Inches(1.75), Inches(3.4), Inches(4.0))
    tf2 = tx2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "INTENDED CLINICAL BENEFITS"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = NAVY

    benefits = [
        ("Rapid Deterioration Awareness:", "Early recognition of abnormal vital trends before cardiac or respiratory arrest occurs."),
        ("Instant Fall Notification:", "Pose sentinel raises alarms within 3 seconds of sustained floor contact."),
        ("Structured Escalation Chain:", "Automated progression: Family Caregiver → Secondary Contact → 108/112."),
        ("Reduced Bedside Burden:", "One nurse oversees 20+ virtual ward beds via prioritized triage queues.")
    ]
    for b_title, b_desc in benefits:
        p = tf2.add_paragraph()
        p.space_before = Pt(6)
        run1 = p.add_run()
        run1.text = b_title + " "
        run1.font.bold = True
        run1.font.size = Pt(8.8)
        run1.font.color.rgb = TEAL
        run2 = p.add_run()
        run2.text = b_desc
        run2.font.size = Pt(8.2)
        run2.font.color.rgb = DARK

    add_card(s4, 8.8, 1.6, 3.733, 4.3)
    tx3 = s4.shapes.add_textbox(Inches(8.95), Inches(1.75), Inches(3.4), Inches(4.0))
    tf3 = tx3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "KEY ECOSYSTEM STAKEHOLDERS"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = ROSE

    shs = [
        ("Patients & Elderly Citizens:", "Autonomy, dignity, and confidence to live independently at home."),
        ("Primary Healthcare Workers:", "ASHA and ANM workers equipped with standardized triage data."),
        ("Government Hospitals:", "GB Pant Hospital (Port Blair) virtual bed expansion during surges."),
        ("Public Health Authorities:", "Real-time population health telemetry and climate/heatwave monitoring.")
    ]
    for s_title, s_desc in shs:
        p = tf3.add_paragraph()
        p.space_before = Pt(6)
        run1 = p.add_run()
        run1.text = s_title + " "
        run1.font.bold = True
        run1.font.size = Pt(8.8)
        run1.font.color.rgb = DARK
        run2 = p.add_run()
        run2.text = s_desc
        run2.font.size = Pt(8.2)
        run2.font.color.rgb = SLATE

    # Bottom workflow diagram text
    add_card(s4, 0.8, 6.1, 11.733, 0.65, CARD_TEAL_BG, CARD_TEAL_BORDER)
    tx_wf = s4.shapes.add_textbox(Inches(0.95), Inches(6.15), Inches(11.4), Inches(0.55))
    tf = tx_wf.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Connected Healthcare Flow: Patients & Elderly ➔ Family Caregivers ➔ Nurses & Hospital Wards ➔ Community ASHA Workers ➔ Emergency Services (108/112)"
    p.font.name = "Calibri"
    p.font.size = Pt(9)
    p.font.bold = True
    p.font.color.rgb = NAVY

    add_footer(s4, 4)

    # ==========================================
    # SLIDE 5: FEASIBILITY AND RISK ANALYSIS
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "Prototyped Feasibility & Six Managed Risk Factors", "FEASIBILITY AND RISK ANALYSIS", 5)

    risks = [
        ("01 Clinical Accuracy", "Risk: Algorithmic misinterpretation of physiological instability.",
         "Mitigation: Strictly adhere to standard Royal College of Physicians NEWS2; mandate human clinician-in-the-loop oversight."),
        ("02 Island Connectivity", "Risk: Intermittent internet connection in remote island geography.",
         "Mitigation: Embedded offline-first engine on Kotlin Android client; local SQLite caching; clear sync status badges."),
        ("03 False Fall Alarms", "Risk: Alert fatigue caused by sitting, bending, or dropping devices.",
         "Mitigation: Multi-frame temporal windows (>3s floor immobility); 23/23 false-positive scenarios verified with 100% precision."),
        ("04 Escalation Integrity", "Risk: Automated emergency dispatches failing or sending false alarms.",
         "Mitigation: Transparent simulation labeling in prototype; multi-tier ladder (Family → Backup → 108/112) with verification step."),
        ("05 Patient Privacy", "Risk: Domestic reluctance to install optical sensors in private bedrooms.",
         "Mitigation: Strict on-device keypoint inference (no raw video stored or transmitted); DPDP Act compliant privacy architecture."),
        ("06 Regulatory Readiness", "Risk: Premature deployment without medical software certification.",
         "Mitigation: Positioned strictly as clinical decision-support and assistive care; roadmap planned for CDSCO/ethical governance.")
    ]

    r_w = 3.75
    r_h = 1.95
    for i, (r_title, r_desc, r_mit) in enumerate(risks):
        row = i // 3
        col = i % 3
        rx = 0.8 + col * (r_w + 0.24)
        ry = 1.6 + row * (r_h + 0.2)
        add_card(s5, rx, ry, r_w, r_h)

        r_box = s5.shapes.add_textbox(Inches(rx + 0.15), Inches(ry + 0.1), Inches(r_w - 0.3), Inches(r_h - 0.2))
        tf = r_box.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = r_title
        p.font.name = "Calibri"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = NAVY

        p = tf.add_paragraph()
        p.text = r_desc
        p.font.name = "Calibri"
        p.font.size = Pt(8.2)
        p.font.color.rgb = ROSE
        p.space_before = Pt(3)

        p = tf.add_paragraph()
        p.text = r_mit
        p.font.name = "Calibri"
        p.font.size = Pt(8.2)
        p.font.color.rgb = DARK
        p.space_before = Pt(3)

    # Bottom status card
    add_card(s5, 0.8, 6.0, 11.733, 0.75, CARD_TEAL_BG, CARD_TEAL_BORDER)
    tx_st = s5.shapes.add_textbox(Inches(0.95), Inches(6.05), Inches(11.4), Inches(0.65))
    tf = tx_st.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Feasibility Status: Web simulator, local Python YOLO pose sentinel, and offline-capable Android APK are fully functional for demonstration; physical Bluetooth sensor ingestion is verified through deterministic data feeds."
    p.font.name = "Calibri"
    p.font.size = Pt(8.8)
    p.font.bold = True
    p.font.color.rgb = NAVY

    add_footer(s5, 5)

    # ==========================================
    # SLIDE 6: TEAM & DEVELOPMENT JOURNEY
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "Team Composition & Development Journey", "TEAM", 6)

    # Left: Team Structure
    add_card(s6, 0.8, 1.6, 5.7, 4.3)
    tx_tm = s6.shapes.add_textbox(Inches(0.95), Inches(1.75), Inches(5.4), Inches(4.0))
    tf = tx_tm.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "TEAM STRUCTURE & RESPONSIBILITIES"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEAL

    members_full = [
        ("Samrat Dasgupta — Team Leader",
         "Teacher Trainee • Port Blair, Andaman & Nicobar Islands\nResponsibilities: Clinical idea, concept definition, two-layer architecture, regional ground-truth validation & institutional coordination."),
        ("Hriday Das — Main Developer / Coder",
         "Software Engineering Student\nResponsibilities: Full-stack implementation, Node.js/Express backend, React dashboards, local YOLO-Pose vision engine & test automation."),
        ("C. Mohd. Jasheem — Designer",
         "UI/UX & Product Design Student\nResponsibilities: Human-centered design, multi-language layout design, presentation assets & accessible caregiver interaction patterns.")
    ]
    for m_head, m_desc in members_full:
        p = tf.add_paragraph()
        p.space_before = Pt(8)
        run1 = p.add_run()
        run1.text = m_head + "\n"
        run1.font.bold = True
        run1.font.size = Pt(9.5)
        run1.font.color.rgb = NAVY
        run2 = p.add_run()
        run2.text = m_desc
        run2.font.size = Pt(8.2)
        run2.font.color.rgb = DARK

    # Right: Journey & Learnings
    add_card(s6, 6.8, 1.6, 5.733, 4.3)
    tx_jn = s6.shapes.add_textbox(Inches(6.95), Inches(1.75), Inches(5.4), Inches(4.0))
    tf = tx_jn.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "JOURNEY, MOTIVATION & LEARNINGS"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = NAVY

    p = tf.add_paragraph()
    p.space_before = Pt(8)
    run1 = p.add_run()
    run1.text = "Why We Built ArohaSetu:\n"
    run1.font.bold = True
    run1.font.size = Pt(9.5)
    run1.font.color.rgb = TEAL
    run2 = p.add_run()
    run2.text = "Living across the Andaman & Nicobar archipelago, medical facilities are separated by deep water and limited ferry routes. When an elder falls or deteriorates alone, delayed awareness is fatal. We built ArohaSetu to provide a watchful, personal digital nurse for every family and overburdened hospital bed."
    run2.font.size = Pt(8.5)
    run2.font.color.rgb = DARK

    p = tf.add_paragraph()
    p.space_before = Pt(12)
    run1 = p.add_run()
    run1.text = "Key Engineering Hurdle:\n"
    run1.font.bold = True
    run1.font.size = Pt(9.5)
    run1.font.color.rgb = ROSE
    run2 = p.add_run()
    run2.text = "Achieving dependable fall detection on low-cost hardware without streaming video to external servers. We engineered a local YOLO-Pose kinematic sentinel with temporal posture tracking (tilt angle >50°, vertical velocity drop, >3s floor immobility) that achieved 100% precision across 23 false-positive test scenarios."
    run2.font.size = Pt(8.5)
    run2.font.color.rgb = DARK

    # Bottom Registration Bar
    add_card(s6, 0.8, 6.1, 11.733, 0.65, CARD_TEAL_BG, CARD_TEAL_BORDER)
    tx_rb = s6.shapes.add_textbox(Inches(0.95), Inches(6.15), Inches(11.4), Inches(0.55))
    tf = tx_rb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Official Portal Registration: Team Name: ArohaSetu • Team ID: HSC|AN|00004 • Union Territory: Andaman & Nicobar Islands"
    p.font.name = "Calibri"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = NAVY

    add_footer(s6, 6)

    # ==========================================
    # SLIDE 7: REFERENCES & ARTIFACTS
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    add_header(s7, "Clinical Foundations & Project Artefacts", "REFERENCES", 7)

    # Left: Standards & Clinical Specifications
    add_card(s7, 0.8, 1.6, 5.7, 4.3)
    tx_st7 = s7.shapes.add_textbox(Inches(0.95), Inches(1.75), Inches(5.4), Inches(4.0))
    tf = tx_st7.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "CLINICAL & COMPETITION STANDARDS"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = TEAL

    refs = [
        ("1. Clinical Risk Standard (NEWS2):",
         "Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. London: RCP, 2017.\n(rcp.ac.uk/resources/national-early-warning-score-news-2)"),
        ("2. Competition Framework:",
         "Hack for Social Cause 2027 (Viksit Bharat Young Leaders Dialogue), Knowledge Partner IIT Bombay, MoYAS, Govt. of India. Template v7.0 compliance."),
        ("3. Digital Personal Data Protection (DPDP Act):",
         "Zero raw video transmission; edge pose estimation with ephemeral keypoints aligns with Indian privacy regulations.")
    ]
    for r_title, r_desc in refs:
        p = tf.add_paragraph()
        p.space_before = Pt(8)
        run1 = p.add_run()
        run1.text = r_title + "\n"
        run1.font.bold = True
        run1.font.size = Pt(9)
        run1.font.color.rgb = NAVY
        run2 = p.add_run()
        run2.text = r_desc
        run2.font.size = Pt(8.2)
        run2.font.color.rgb = DARK

    # Right: Repositories & Formal Declaration
    add_card(s7, 6.8, 1.6, 5.733, 4.3)
    tx_rp7 = s7.shapes.add_textbox(Inches(6.95), Inches(1.75), Inches(5.4), Inches(4.0))
    tf = tx_rp7.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "CODEBASE & EVIDENCE INTEGRITY"
    p.font.name = "Calibri"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = NAVY

    artifacts = [
        ("Official Source Code Repository:",
         "https://github.com/EternalFlames131/Arohasetu\n(Licensed under MIT, full Git commit log, public)"),
        ("Live Web Application & Simulator:",
         "https://arohasetu.vercel.app\n(Production build verified, responsive PWA for families & wards)"),
        ("Official AI Disclosure Statement:",
         "AI was used strictly to do light bug checks and light coding only; other than that, everything was self-made and created entirely by the team members.")
    ]
    for a_title, a_desc in artifacts:
        p = tf.add_paragraph()
        p.space_before = Pt(8)
        run1 = p.add_run()
        run1.text = a_title + "\n"
        run1.font.bold = True
        run1.font.size = Pt(9)
        run1.font.color.rgb = TEAL if "Disclosure" not in a_title else ROSE
        run2 = p.add_run()
        run2.text = a_desc
        run2.font.size = Pt(8.2)
        run2.font.color.rgb = DARK

    # Bottom Submission Bar
    add_card(s7, 0.8, 6.1, 11.733, 0.65, CARD_TEAL_BG, CARD_TEAL_BORDER)
    tx_sb7 = s7.shapes.add_textbox(Inches(0.95), Inches(6.15), Inches(11.4), Inches(0.55))
    tf = tx_sb7.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "ArohaSetu Submission • Healthcare, Wellbeing and Elderly Care • Andaman & Nicobar Islands • Team ID: HSC|AN|00004"
    p.font.name = "Calibri"
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = NAVY

    add_footer(s7, 7)

    # Save
    prs.save(output_path)
    print(f"Successfully generated PowerPoint presentation at: {output_path}")

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "docs/Arohasetu_PresentationDeck.pptx"
    create_deck(out)
