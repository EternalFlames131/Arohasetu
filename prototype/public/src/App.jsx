// prototype/public/src/App.jsx
// Enterprise Clinical Telemetry Dashboard (Epic / Teladoc Grade)

const ACCOUNT_PROFILES = {
  "asharma@demo.in": {
    name: "Anita Sharma",
    role: "caregiver",
    email: "asharma@demo.in",
    patientId: "ARO-8042",
    age: 67,
    gender: "Female",
    location: "Home → Living Room, Junglighat, Port Blair",
    condition: "Essential Hypertension / Post-Stroke Watch",
    attendingDoc: "Dr. A. Sen, MD (Cardiology, GB Pant Hospital)",
    primaryContact: "Priya Sharma (Daughter, +91 94342 81101)",
    caregiverPhone: "+91 94342 81101",
    backupPhone: "+91 94342 81102",
    emergencyHub: "GB Pant Hospital Ambulance Station (108)",
    hardwareSource: "BLE Telemetry Gateway (Tier 1 Certified)",
    defaultVitals: {
      hr: 85,
      spo2: 97.7,
      bpSys: 149,
      bpDia: 97,
      temp: 37.0,
      glucose: 112,
      sparkHr: [82, 84, 83, 85, 84, 86, 85, 84, 85],
      sparkSpo2: [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7, 97.8, 97.7],
      sparkBp: [142, 144, 146, 145, 148, 147, 150, 148, 149],
      sparkTemp: [36.9, 37.0, 37.1, 37.0, 36.9, 37.0, 37.0, 37.1, 37.0],
      sparkGlucose: [115, 112, 114, 110, 113, 111, 114, 112, 112],
    },
  },
  "rprakash@demo.in": {
    name: "Ram Prakash",
    role: "caregiver",
    email: "rprakash@demo.in",
    patientId: "REJ-9120",
    age: 72,
    gender: "Male",
    location: "Remote Cottage → Hut Bay, Little Andaman",
    condition: "Type-2 Diabetes Mellitus / Neuropathy Watch",
    attendingDoc: "Dr. K. Nair, MD (Endocrinology)",
    primaryContact: "Rajesh Prakash (Son, +91 94742 19203)",
    caregiverPhone: "+91 94742 19203",
    backupPhone: "+91 94742 19204",
    emergencyHub: "Little Andaman Marine Ambulance & 108 PHC Station",
    hardwareSource: "Cellular RPM Gateway #AP-4109 (Little Andaman)",
    defaultVitals: {
      hr: 74,
      spo2: 98.2,
      bpSys: 122,
      bpDia: 80,
      temp: 36.8,
      glucose: 142,
      sparkHr: [73, 75, 74, 76, 74, 75, 74, 73, 74],
      sparkSpo2: [98.1, 98.3, 98.2, 98.0, 98.2, 98.3, 98.2, 98.1, 98.2],
      sparkBp: [120, 122, 124, 121, 123, 122, 125, 122, 122],
      sparkTemp: [36.8, 36.9, 36.8, 36.7, 36.8, 36.9, 36.8, 36.8, 36.8],
      sparkGlucose: [138, 142, 145, 140, 144, 142, 146, 142, 142],
    },
  },
  "wardnurse@demo.in": {
    name: "GB Pant Ward Nurse",
    role: "nurse",
    email: "wardnurse@demo.in",
    patientId: "WARD-STA-01",
    age: "Shift A Lead",
    gender: "Staff",
    location: "GB Pant Hospital, Male/Female Ward A, Port Blair",
    condition: "Multi-Bed Inpatient Clinical Ward Watch (4 Active Beds)",
    attendingDoc: "Dr. A. Sen, MD & Dr. V. Rao, MS",
    primaryContact: "Ward Nurse Station (Ext. 402)",
    caregiverPhone: "Ext. 402 (Station Desk)",
    backupPhone: "Ext. 104 (Duty Doctor)",
    emergencyHub: "GB Pant Hospital Crash Team & Code Blue",
    hardwareSource: "GB Pant Hospital Central Gateway #GW-8042",
    defaultVitals: {
      hr: 82,
      spo2: 98.0,
      bpSys: 128,
      bpDia: 84,
      temp: 36.9,
      glucose: 115,
      sparkHr: [80, 82, 81, 83, 82, 84, 82, 81, 82],
      sparkSpo2: [98.0, 98.2, 98.1, 97.9, 98.0, 98.1, 98.0, 98.2, 98.0],
      sparkBp: [125, 128, 130, 126, 129, 127, 130, 128, 128],
      sparkTemp: [36.9, 37.0, 36.9, 36.8, 36.9, 37.0, 36.9, 36.9, 36.9],
      sparkGlucose: [112, 115, 118, 114, 116, 115, 117, 115, 115],
    },
  },
};

const HOSPITAL_INPATIENT_BEDS = {
  "bed-101": {
    id: "bed-101",
    bedNumber: "Bed 101",
    name: "Anita Sharma",
    patientId: "REJ-8042",
    age: 67,
    gender: "Female",
    location: "GB Pant Hospital → Ward A, Bed 101 (Port Blair)",
    condition: "Essential Hypertension / Post-Stroke Watch",
    attendingDoc: "Dr. A. Sen, MD (Cardiology, GB Pant Hospital)",
    primaryContact: "Priya Sharma (Daughter, +91 94342 81101)",
    caregiverPhone: "+91 94342 81101",
    backupPhone: "+91 94342 81102",
    emergencyHub: "GB Pant Hospital Crash Team & Code Blue (108)",
    hardwareSource: "Philips IntelliVue MP50 & Central BLE Gateway",
    admissionDate: "2026-09-14 (Cardiovascular Observation)",
    status: "caution",
    statusLabel: "Caution (Hypertensive Review)",
    news2Score: 3,
    defaultVitals: {
      hr: 85,
      spo2: 97.7,
      bpSys: 149,
      bpDia: 97,
      temp: 37.0,
      glucose: 112,
      sparkHr: [82, 84, 83, 85, 84, 86, 85, 84, 85],
      sparkSpo2: [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7, 97.8, 97.7],
      sparkBp: [142, 144, 146, 145, 148, 147, 150, 148, 149],
      sparkTemp: [36.9, 37.0, 37.1, 37.0, 36.9, 37.0, 37.0, 37.1, 37.0],
      sparkGlucose: [115, 112, 114, 110, 113, 111, 114, 112, 112],
    },
    hardwareDevices: [
      {
        model: "Philips IntelliVue MP50",
        type: "Bedside Telemetry Hub",
        status: "Connected",
        battery: 100,
        protocol: "Hospital WLAN",
      },
      {
        model: "Omron HEM-7156T",
        type: "Continuous NIBP Monitor",
        status: "Connected",
        battery: 92,
        protocol: "BLE 5.2",
      },
      {
        model: "TempTraq Continuous",
        type: "Axillary Temp Sensor",
        status: "Connected",
        battery: 84,
        protocol: "Patch Sensor",
      },
    ],
    medications: [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "m-101-1",
            name: "Amlodipine Besylate",
            dose: "5 mg",
            purpose: "Antihypertensive (Calcium Channel Blocker)",
            status: "Taken",
            takenAt: "08:05 AM",
          },
        ],
      },
      {
        slot: "Afternoon (01:00 PM)",
        timeCode: "13:00",
        drugs: [
          {
            id: "m-101-2",
            name: "Aspirin (Ecosprin)",
            dose: "75 mg",
            purpose: "Antiplatelet / Stroke Prophylaxis",
            status: "Taken",
            takenAt: "01:15 PM",
          },
        ],
      },
      {
        slot: "Evening (08:00 PM)",
        timeCode: "20:00",
        drugs: [
          {
            id: "m-101-3",
            name: "Atorvastatin",
            dose: "20 mg",
            purpose: "Statin / Lipid Reduction",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-101-1",
        title: "Bed 101 (Anita Sharma): Elevated Systolic BP",
        reading: "154/97 mmHg",
        time: "6m ago",
        severity: "caution",
        message: "Systolic threshold >140 exceeded. Automated re-check scheduled in 15m.",
        source: "Bedside NIBP Monitor",
      },
      {
        id: "alt-101-2",
        title: "Bed 101: Optical Sentinel Active",
        reading: "In Bed (Stable)",
        time: "25m ago",
        severity: "info",
        message: "Zero fall events detected. Patient resting comfortably.",
        source: "Room Camera Zone",
      },
    ],
    timeline: [
      {
        id: "tl-101-1",
        time: "11:30 AM",
        title: "Automated NIBP Cycle",
        desc: "BP recorded at 149/97 mmHg. Mean arterial pressure within target.",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "tl-101-2",
        time: "10:15 AM",
        title: "Cardiology Ward Round",
        desc: "Dr. A. Sen reviewed ECG trace. Amlodipine regimen maintained.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-101-3",
        time: "08:05 AM",
        title: "Morning Medication Administered",
        desc: "Amlodipine 5mg verified and signed off by Shift A Nurse.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
  "bed-102": {
    id: "bed-102",
    bedNumber: "Bed 102",
    name: "Ram Prakash",
    patientId: "REJ-9120",
    age: 72,
    gender: "Male",
    location: "GB Pant Hospital → Ward A, Bed 102 (Little Andaman Link)",
    condition: "Type-2 Diabetes Mellitus / Diabetic Neuropathy",
    attendingDoc: "Dr. K. Nair, MD (Endocrinology)",
    primaryContact: "Rajesh Prakash (Son, +91 94742 19203)",
    caregiverPhone: "+91 94742 19203",
    backupPhone: "+91 94742 19204",
    emergencyHub: "GB Pant Hospital Emergency & Crash Team (108)",
    hardwareSource: "Cellular RPM Gateway #AP-4109 & FreeStyle Libre 3",
    admissionDate: "2026-09-12 (Glycemic Control & Foot Care)",
    status: "normal",
    statusLabel: "Stable (Glycemic Watch)",
    news2Score: 0,
    defaultVitals: {
      hr: 74,
      spo2: 98.2,
      bpSys: 122,
      bpDia: 80,
      temp: 36.8,
      glucose: 142,
      sparkHr: [73, 75, 74, 76, 74, 75, 74, 73, 74],
      sparkSpo2: [98.1, 98.3, 98.2, 98.0, 98.2, 98.3, 98.2, 98.1, 98.2],
      sparkBp: [120, 122, 124, 121, 123, 122, 125, 122, 122],
      sparkTemp: [36.8, 36.9, 36.8, 36.7, 36.8, 36.9, 36.8, 36.8, 36.8],
      sparkGlucose: [138, 142, 145, 140, 144, 142, 146, 142, 142],
    },
    hardwareDevices: [
      {
        model: "FreeStyle Libre 3",
        type: "Continuous Glucose Monitor",
        status: "Connected",
        battery: 99,
        protocol: "NFC/BLE Stream",
      },
      {
        model: "Accu-Chek Instant",
        type: "Capillary Glucometer",
        status: "Synchronized",
        battery: 88,
        protocol: "BLE 5.0",
      },
      {
        model: "Beurer BM 57",
        type: "Upper Arm NIBP",
        status: "Connected",
        battery: 91,
        protocol: "BLE Mesh",
      },
    ],
    medications: [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "m-102-1",
            name: "Metformin HCl",
            dose: "500 mg",
            purpose: "Type-2 Diabetes / Glycemic Control",
            status: "Taken",
            takenAt: "08:12 AM",
          },
          {
            id: "m-102-2",
            name: "Glimepiride",
            dose: "1 mg",
            purpose: "Beta-Cell Secretagogue",
            status: "Taken",
            takenAt: "08:12 AM",
          },
        ],
      },
      {
        slot: "Noon (12:00 PM)",
        timeCode: "12:00",
        drugs: [
          {
            id: "m-102-3",
            name: "Alpha Lipoic Acid",
            dose: "300 mg",
            purpose: "Diabetic Neuropathy Support",
            status: "Taken",
            takenAt: "12:30 PM",
          },
        ],
      },
      {
        slot: "Night (08:00 PM)",
        timeCode: "20:00",
        drugs: [
          {
            id: "m-102-4",
            name: "Atorvastatin",
            dose: "20 mg",
            purpose: "Cardiovascular Risk Reduction",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-102-1",
        title: "Bed 102 (Ram Prakash): CGM Telemetry Synced",
        reading: "142 mg/dL",
        time: "12m ago",
        severity: "info",
        message: "Glucose levels steady in target range (110-160 mg/dL).",
        source: "FreeStyle Libre 3 CGM",
      },
      {
        id: "alt-102-2",
        title: "Bed 102: Little Andaman Telemetry Uplink Nominal",
        reading: "4G LTE Active (-68 dBm)",
        time: "38m ago",
        severity: "info",
        message: "Satellite relay stable across Hut Bay link.",
        source: "Gateway #AP-4109",
      },
    ],
    timeline: [
      {
        id: "tl-102-1",
        time: "11:45 AM",
        title: "CGM Telemetry Packet Upload",
        desc: "Automated packet upload via Hut Bay gateway. Glucose 142 mg/dL.",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "tl-102-2",
        time: "09:30 AM",
        title: "Endocrinology Assessment",
        desc: "Dr. K. Nair noted stable glycemic trend. HbA1c trajectory on track.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-102-3",
        time: "08:12 AM",
        title: "Morning Medication Administered",
        desc: "Metformin 500mg and Glimepiride 1mg taken post-breakfast.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
  "bed-103": {
    id: "bed-103",
    bedNumber: "Bed 103",
    name: "Meera Nair",
    patientId: "REJ-6319",
    age: 58,
    gender: "Female",
    location: "GB Pant Hospital → Ward A, Bed 103 (Surgical Recovery B)",
    condition: "Post-Op Day 2 (Laparoscopic Cholecystectomy)",
    attendingDoc: "Dr. V. Rao, MS (General Surgery)",
    primaryContact: "Suresh Nair (Husband, +91 94342 55210)",
    caregiverPhone: "+91 94342 55210",
    backupPhone: "+91 94342 55211",
    emergencyHub: "GB Pant Hospital Surgical ICU Crash Team",
    hardwareSource: "Bedside Monitor #BM-2041 & Mindray Gateway",
    admissionDate: "2026-09-16 (Post-Surgical Inpatient)",
    status: "normal",
    statusLabel: "Stable (Post-Surgical Recovery)",
    news2Score: 0,
    defaultVitals: {
      hr: 78,
      spo2: 99.0,
      bpSys: 118,
      bpDia: 76,
      temp: 36.9,
      glucose: 104,
      sparkHr: [76, 78, 77, 79, 78, 77, 78, 79, 78],
      sparkSpo2: [99.0, 99.1, 98.9, 99.0, 99.2, 99.0, 98.9, 99.1, 99.0],
      sparkBp: [116, 118, 117, 119, 118, 116, 120, 118, 118],
      sparkTemp: [36.9, 37.0, 36.9, 36.8, 36.9, 37.0, 36.9, 36.9, 36.9],
      sparkGlucose: [102, 105, 104, 106, 103, 104, 105, 104, 104],
    },
    hardwareDevices: [
      {
        model: "Mindray BeneView T8",
        type: "Bedside Multi-Parameter",
        status: "Connected",
        battery: 100,
        protocol: "Hospital LAN",
      },
      {
        model: "Welch Allyn Connex",
        type: "Spot Vitals Monitor",
        status: "Connected",
        battery: 94,
        protocol: "Hospital WLAN",
      },
      {
        model: "Alaris Infusion Pump",
        type: "IV Fluid Controller",
        status: "Infusing",
        battery: 100,
        protocol: "SmartPump Link",
      },
    ],
    medications: [
      {
        slot: "Morning (09:00 AM)",
        timeCode: "09:00",
        drugs: [
          {
            id: "m-103-1",
            name: "Cefuroxime (IV)",
            dose: "500 mg",
            purpose: "Post-Op Surgical Prophylaxis",
            status: "Taken",
            takenAt: "09:05 AM",
          },
        ],
      },
      {
        slot: "SOS (As Needed)",
        timeCode: "12:00",
        drugs: [
          {
            id: "m-103-2",
            name: "Paracetamol (IV)",
            dose: "650 mg",
            purpose: "Analgesic / Fever Management",
            status: "Taken",
            takenAt: "12:10 PM",
          },
        ],
      },
      {
        slot: "Evening (07:00 PM)",
        timeCode: "19:00",
        drugs: [
          {
            id: "m-103-3",
            name: "Pantoprazole",
            dose: "40 mg",
            purpose: "Gastroprotection (PPI)",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-103-1",
        title: "Bed 103 (Meera Nair): Surgical Site Inspection Normal",
        reading: "Clean Dressing",
        time: "1h ago",
        severity: "info",
        message: "Laparoscopic port sites dry and intact. No erythema.",
        source: "Surgical Round",
      },
      {
        id: "alt-103-2",
        title: "Bed 103: Post-Op Ambulation Successful",
        reading: "Assisted Walk 15m",
        time: "2h ago",
        severity: "info",
        message: "Patient tolerated bedside ambulation with nursing staff.",
        source: "Mobility Log",
      },
    ],
    timeline: [
      {
        id: "tl-103-1",
        time: "11:15 AM",
        title: "Surgical Dressing Check",
        desc: "Dr. V. Rao inspected laparoscopic incisions. Healing normally.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-103-2",
        time: "09:05 AM",
        title: "IV Antibiotic Administered",
        desc: "Cefuroxime 500mg IV piggyback infused over 30 minutes.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "tl-103-3",
        time: "07:30 AM",
        title: "Morning Vitals Check",
        desc: "SpO2 99%, HR 78 bpm, Temp 36.9°C. NEWS2 score: 0 (Normal).",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
    ],
  },
  "bed-104": {
    id: "bed-104",
    bedNumber: "Bed 104",
    name: "Kavitha Raman",
    patientId: "REJ-4981",
    age: 64,
    gender: "Female",
    location: "GB Pant Hospital → Ward A, Bed 104 (Cardiology Unit)",
    condition: "Sinus Tachycardia / Arrhythmia Holter Watch",
    attendingDoc: "Dr. A. Sen, MD (Cardiology)",
    primaryContact: "Ramesh Raman (Son, +91 94742 77190)",
    caregiverPhone: "+91 94742 77190",
    backupPhone: "+91 94742 77191",
    emergencyHub: "GB Pant Hospital Code Blue & MET Team",
    hardwareSource: "Holter Wireless Telemetry #CW-9012 & Masimo Rad-97",
    admissionDate: "2026-09-15 (Telemetry Arrhythmia Evaluation)",
    status: "caution",
    statusLabel: "Caution (Sinus Tachycardia Watch)",
    news2Score: 2,
    defaultVitals: {
      hr: 94,
      spo2: 96.5,
      bpSys: 138,
      bpDia: 88,
      temp: 37.1,
      glucose: 110,
      sparkHr: [92, 95, 93, 96, 94, 93, 97, 94, 94],
      sparkSpo2: [96.4, 96.6, 96.5, 96.3, 96.5, 96.7, 96.5, 96.4, 96.5],
      sparkBp: [136, 139, 138, 137, 140, 138, 136, 139, 138],
      sparkTemp: [37.1, 37.2, 37.0, 37.1, 37.2, 37.1, 37.0, 37.1, 37.1],
      sparkGlucose: [108, 111, 110, 112, 109, 110, 111, 110, 110],
    },
    hardwareDevices: [
      {
        model: "Holter Wireless Telemetry #CW-9012",
        type: "3-Lead Continuous ECG",
        status: "Connected",
        battery: 89,
        protocol: "Continuous RF",
      },
      {
        model: "Masimo Rad-97",
        type: "Pulse CO-Oximeter",
        status: "Connected",
        battery: 94,
        protocol: "Continuous BLE",
      },
      {
        model: "SanketLife 12-Lead",
        type: "Spot Diagnostic ECG",
        status: "Standby",
        battery: 82,
        protocol: "CDSCO Cleared",
      },
    ],
    medications: [
      {
        slot: "Morning (08:00 AM)",
        timeCode: "08:00",
        drugs: [
          {
            id: "m-104-1",
            name: "Metoprolol Succinate",
            dose: "25 mg",
            purpose: "Beta-1 Selective Adrenoceptor Blocker",
            status: "Taken",
            takenAt: "08:15 AM",
          },
        ],
      },
      {
        slot: "Afternoon (01:00 PM)",
        timeCode: "13:00",
        drugs: [
          {
            id: "m-104-2",
            name: "Ecosprin (Aspirin)",
            dose: "75 mg",
            purpose: "Antiplatelet / Thromboembolism Prophylaxis",
            status: "Taken",
            takenAt: "01:20 PM",
          },
        ],
      },
      {
        slot: "Evening (08:00 PM)",
        timeCode: "20:00",
        drugs: [
          {
            id: "m-104-3",
            name: "Atorvastatin",
            dose: "10 mg",
            purpose: "Cardiovascular Risk Reduction",
            status: "Upcoming",
            takenAt: null,
          },
        ],
      },
    ],
    alerts: [
      {
        id: "alt-104-1",
        title: "Bed 104 (Kavitha Raman): Sinus Tachycardia Observation",
        reading: "94 bpm (Transient peak 97)",
        time: "18m ago",
        severity: "caution",
        message: "Mild pulse elevation noted. Shift B nursing lead alerted for telemetry check.",
        source: "Holter Telemetry CW-9012",
      },
      {
        id: "alt-104-2",
        title: "Bed 104: Continuous Pulse Oximetry Nominal",
        reading: "96.5% SpO2",
        time: "32m ago",
        severity: "info",
        message: "Oxygen saturation steady on room air.",
        source: "Masimo Rad-97",
      },
    ],
    timeline: [
      {
        id: "tl-104-1",
        time: "11:50 AM",
        title: "Rhythm Strip Captured",
        desc: "Sinus tachycardia at 94 bpm with normal QRS morphology. No ectopics.",
        type: "telemetry",
        icon: RefreshCw,
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "tl-104-2",
        time: "10:00 AM",
        title: "Cardiology Review",
        desc: "Dr. A. Sen ordered Metoprolol continuation; scheduled repeat 12-lead.",
        type: "clinical",
        icon: FileText,
        iconColor: "text-purple-600 bg-purple-50",
      },
      {
        id: "tl-104-3",
        time: "08:15 AM",
        title: "Morning Medication Administered",
        desc: "Metoprolol Succinate 25mg taken with water.",
        type: "medication",
        icon: CheckCircle2,
        iconColor: "text-emerald-600 bg-emerald-50",
      },
    ],
  },
};

// --- Judge-demo helpers (Sensors & Wearables panel) ---
// FIFO historical sparkline buffer (shared by drift engine + manual feed pushes)
const pushFifo = (arr, val, max = 12) => {
  const next = [...(arr || []), val];
  return next.length > max ? next.slice(next.length - max) : next;
};

// Subtle emergency alarm (demo-only). Guarded by try/catch to avoid blocking the UI.
const playEmergencyAlarm = () => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const schedule = (f, t, gain) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.setValueAtTime(f, t);
      o.type = "sawtooth";
      g.gain.setValueAtTime(gain, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      o.start(t);
      o.stop(t + 0.25);
    };
    schedule(880, ctx.currentTime, 0.4);
    schedule(660, ctx.currentTime + 0.3, 0.35);
    setTimeout(() => ctx.close(), 800);
  } catch (e) {
    return;
  }
};

// Clinical triage classifier for manually-fed smartwatch readings (mirrors VitalSignsTable thresholds)
const classifyReading = (r) => {
  if (
    r.spo2 < 92 || r.hr < 60 || r.hr > 100 ||
    r.bpSys >= 160 || r.bpDia >= 100 ||
    r.temp >= 38.0 || r.temp < 35.5 ||
    r.glucose > 180 || r.glucose < 70
  ) {
    let reason = `Manual demo feed — ${r.hr} bpm · ${r.spo2}% · ${r.bpSys}/${r.bpDia} · ${r.temp}°C · ${r.glucose} mg/dL`;
    if (r.spo2 < 92) reason = `Acute Hypoxemia — SpO2 ${r.spo2}%`;
    else if (r.hr < 60) reason = `Bradycardia — HR ${r.hr} bpm`;
    else if (r.hr > 100) reason = `Tachycardia — HR ${r.hr} bpm`;
    else if (r.bpSys >= 160 || r.bpDia >= 100) reason = `Stage 2 BP Crisis — ${r.bpSys}/${r.bpDia} mmHg`;
    else if (r.temp >= 38.0) reason = `Pyrexia — Temp ${r.temp}°C`;
    else if (r.temp < 35.5) reason = `Hypothermia — Temp ${r.temp}°C`;
    else reason = `Extreme Glucose — ${r.glucose} mg/dL`;
    return { severity: "danger", label: reason };
  }
  if (
    r.bpSys >= 140 || r.bpDia >= 90 || r.spo2 < 95 ||
    r.glucose > 140 || r.temp >= 37.5
  ) {
    let reason = `Borderline reading — ${r.hr} bpm · ${r.spo2}% · ${r.bpSys}/${r.bpDia}`;
    if (r.bpSys >= 140 || r.bpDia >= 90) reason = `Elevated BP — ${r.bpSys}/${r.bpDia} mmHg`;
    else if (r.spo2 < 95) reason = `Borderline SpO2 — ${r.spo2}%`;
    else if (r.glucose > 140) reason = `Elevated Glucose — ${r.glucose} mg/dL`;
    else reason = `Low-Grade Fever — ${r.temp}°C`;
    return { severity: "caution", label: reason };
  }
  return { severity: "info", label: "All vitals within normal range" };
};

const App = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [curLang, setCurLang] = React.useState(() => {
    try {
      const saved = localStorage.getItem("rejivan_lang");
      return ["en", "hi", "bn", "ta", "te"].includes(saved) ? saved : "en";
    } catch (e) {
      return "en";
    }
  });
  const [translationDictionary, setTranslationDictionary] = React.useState(null);
  const translatedTextOriginals = React.useRef(new WeakMap());
  const translatedAttributeOriginals = React.useRef(new WeakMap());
  const [user, setUser] = React.useState(ACCOUNT_PROFILES["asharma@demo.in"]);
  const [token, setToken] = React.useState(localStorage.getItem("rejivan_token") || "");

  React.useEffect(() => {
    if (!token) {
      fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "asharma@demo.in", password: "demo123" }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.token) {
            setToken(data.token);
            try { localStorage.setItem("rejivan_token", data.token); } catch (e) {}
          }
        })
        .catch(() => {});
    }
  }, []);

  // Load the bundled dictionary and apply translations to rendered UI text. The
  // observer also covers labels added later as dashboard panels refresh or change.
  React.useEffect(() => {
    let cancelled = false;
    fetch("/lang.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) throw new Error("Translation dictionary unavailable");
        return response.json();
      })
      .then((dictionary) => {
        if (!cancelled && dictionary?.en) setTranslationDictionary(dictionary);
      })
      .catch((error) => console.warn("Arohasetu translations could not be loaded:", error.message));
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    try { localStorage.setItem("rejivan_lang", curLang); } catch (e) {}
    document.documentElement.lang = curLang;
    const root = document.getElementById("root");
    if (!root || !translationDictionary?.en) return undefined;

    const keyByEnglish = new Map();
    const englishByLocalized = new Map();
    for (const [key, english] of Object.entries(translationDictionary.en)) {
      if (typeof english !== "string") continue;
      keyByEnglish.set(english, key);
      englishByLocalized.set(english, english);
      for (const locale of Object.values(translationDictionary)) {
        const localized = locale && locale[key];
        if (typeof localized === "string") englishByLocalized.set(localized, english);
      }
    }

    const localizedText = (english) => {
      const key = keyByEnglish.get(english);
      const value = translationDictionary[curLang]?.[key];
      return typeof value === "string" ? value : english;
    };

    const applyText = (node) => {
      const raw = node.nodeValue || "";
      const match = raw.match(/^(\s*)([\s\S]*?\S)(\s*)$/);
      if (!match) return;
      const visible = match[2];
      const remembered = translatedTextOriginals.current.get(node);
      const english = keyByEnglish.has(visible)
        ? visible
        : englishByLocalized.get(visible) || remembered;
      if (!english || !keyByEnglish.has(english)) return;
      translatedTextOriginals.current.set(node, english);
      const next = `${match[1]}${localizedText(english)}${match[3]}`;
      if (next !== raw) node.nodeValue = next;
    };

    const applyAttribute = (element, name) => {
      const raw = element.getAttribute(name);
      if (!raw) return;
      let originals = translatedAttributeOriginals.current.get(element);
      if (!originals) {
        originals = new Map();
        translatedAttributeOriginals.current.set(element, originals);
      }
      const visible = raw.trim();
      const english = keyByEnglish.has(visible)
        ? visible
        : englishByLocalized.get(visible) || originals.get(name);
      if (!english || !keyByEnglish.has(english)) return;
      originals.set(name, english);
      const translated = localizedText(english);
      if (translated !== visible) element.setAttribute(name, raw.replace(visible, translated));
    };

    const applyTree = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        applyText(node);
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.tagName)) return;
      for (const name of ["aria-label", "placeholder", "title"]) applyAttribute(node, name);
      for (const child of node.childNodes) applyTree(child);
    };

    applyTree(root);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData") applyText(record.target);
        else if (record.type === "attributes") applyAttribute(record.target, record.attributeName);
        else for (const node of record.addedNodes) applyTree(node);
      }
    });
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "placeholder", "title"],
    });
    return () => observer.disconnect();
  }, [curLang, translationDictionary]);

  // Modal States
  const [callModalOpen, setCallModalOpen] = React.useState(false);
  const [exportModalOpen, setExportModalOpen] = React.useState(false);
  const [addMedModalOpen, setAddMedModalOpen] = React.useState(false);
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const [checkinModalOpen, setCheckinModalOpen] = React.useState(false);
  const [checkinScenario, setCheckinScenario] = React.useState("trip_fall");

  const handleOpenCheckin = (scenario) => {
    setCheckinScenario(scenario || "trip_fall");
    setCheckinModalOpen(true);
  };

  // Physiological Drift & Clinical Simulation Engine
  const [simMode, setSimMode] = React.useState("baseline"); // "baseline" | "bp_crisis" | "hypoxemia" | "bradycardia"
  const [isStreaming, setIsStreaming] = React.useState(true);
  const [secondsAgo, setSecondsAgo] = React.useState(0);
  const [packetCount, setPacketCount] = React.useState(4821);
  const [lastPacketFlash, setLastPacketFlash] = React.useState(false);

  // Judge-demo state: wearable disconnect layering + manual smartwatch vital feed
  const [disconnectedDevices, setDisconnectedDevices] = React.useState({}); // { deviceId: true } when heartbeat lost
  const [feedOverride, setFeedOverride] = React.useState(null); // { hr, spo2, bpSys, bpDia, temp, glucose, label }
  const [demoAlerts, setDemoAlerts] = React.useState([]); // judge-demo alert entries prepended to Recent Alerts
  const bluetoothHrRef = React.useRef(null);
  const bluetoothAlertAtRef = React.useRef(0);

  // A vital is offline only when every wearable that supplies it is disconnected.
  const isVitalOffline = (vitalKey) => {
    const feeders = REJIVAN_DEMO_DEVICES.filter((device) => device.feeds.includes(vitalKey));
    return feeders.length > 0 && feeders.every((device) => disconnectedDevices[device.id]);
  };

  // Emergency signal state (fired when a vital monitor loses its heartbeat)
  const [emergencySignal, setEmergencySignal] = React.useState(null); // { device, feeds, at }
  const [emergencyModalOpen, setEmergencyModalOpen] = React.useState(false);

  // Vitals & Telemetry State
  const [vitals, setVitals] = React.useState({
    hr: 85,
    spo2: 97.7,
    bpSys: 149,
    bpDia: 97,
    temp: 37.0,
    glucose: 112,
    lastSync: "Just now",
    hardwareSource: "BLE Telemetry Gateway (Tier 1 Certified)",
    sparkHr: [82, 84, 83, 85, 84, 86, 85, 84, 85],
    sparkSpo2: [97.8, 97.6, 97.9, 97.7, 97.8, 97.6, 97.7, 97.8, 97.7],
    sparkBp: [142, 144, 146, 145, 148, 147, 150, 148, 149],
    sparkTemp: [36.9, 37.0, 37.1, 37.0, 36.9, 37.0, 37.0, 37.1, 37.0],
    sparkGlucose: [115, 112, 114, 110, 113, 111, 114, 112, 112],
  });

  // Inpatient Bed Selector State (for Hospital Nurse logins)
  const [selectedWardBed, setSelectedWardBed] = React.useState("bed-101"); // "bed-101" | "bed-102" | "bed-103" | "bed-104" | "all"
  const [serverConnectivity, setServerConnectivity] = React.useState("online");
  const [serverAlerts, setServerAlerts] = React.useState([]);
  const [serverOfflineDevices, setServerOfflineDevices] = React.useState([]);

  const isNurse = user?.role === "nurse" || user?.email === "wardnurse@demo.in";

  const activePatient = React.useMemo(() => {
    if (isNurse) {
      if (selectedWardBed && selectedWardBed !== "all" && HOSPITAL_INPATIENT_BEDS[selectedWardBed]) {
        return HOSPITAL_INPATIENT_BEDS[selectedWardBed];
      }
      return {
        ...ACCOUNT_PROFILES["wardnurse@demo.in"],
        name: "GB Pant Hospital · Ward A (All Beds)",
        patientId: "WARD-A-ALL",
        condition: "Inpatient Ward Overview (4 Monitored Beds)",
      };
    }
    return ACCOUNT_PROFILES[user?.email] || ACCOUNT_PROFILES["asharma@demo.in"];
  }, [user?.email, isNurse, selectedWardBed]);

  const handleSelectWardBed = (bedId) => {
    setSelectedWardBed(bedId);
    if (bedId !== "all" && HOSPITAL_INPATIENT_BEDS[bedId]) {
      const targetBed = HOSPITAL_INPATIENT_BEDS[bedId];
      setVitals({
        ...targetBed.defaultVitals,
        lastSync: "Just now",
        hardwareSource: targetBed.hardwareSource,
      });
      setSimMode("baseline");
    }
    // Reset judge-demo controls when switching patients
    setDisconnectedDevices({});
    setFeedOverride(null);
    setDemoAlerts([]);
    setEmergencySignal(null);
    setEmergencyModalOpen(false);
  };

  // --- Judge-demo handlers (Sensors & Wearables panel) ---

  // Feature A: toggle a wearable's connection. Disconnect -> vitals go stale + danger alert; camera layer stays on.
  const handleToggleDevice = (deviceId) => {
    const dev = REJIVAN_DEMO_DEVICES.find((d) => d.id === deviceId);
    if (!dev) return;
    const nowOff = !disconnectedDevices[deviceId];
    setDisconnectedDevices((prev) => ({ ...prev, [deviceId]: nowOff }));

    const base = activePatient?.defaultVitals || ACCOUNT_PROFILES["asharma@demo.in"].defaultVitals;
    setVitals((prev) => {
      const next = { ...prev };
      dev.feeds.forEach((f) => {
        next[f] = nowOff ? null : base[f];
      });
      return next;
    });

    if (nowOff) {
      setEmergencySignal({ device: dev.name, feeds: dev.feeds, at: Date.now() });
      setEmergencyModalOpen(true);
      playEmergencyAlarm();
      setDemoAlerts((a) =>
        [
          {
            id: `demo-disc-${deviceId}-${Date.now()}`,
            title: `DEMO: DEVICE DISCONNECTED — ${dev.name}`,
            reading: "Telemetry interrupted",
            time: "Just now",
            severity: "danger",
            message: `${dev.name} simulated heartbeat lost. ${dev.feeds.map((f) => f.toUpperCase()).join(" + ")} are marked unavailable. The camera layer remains available. This demo shows the alert/escalation flow; no real emergency message or call is sent.`,
            source: dev.name,
          },
          ...a,
        ].slice(0, 6)
      );
    } else {
      setEmergencySignal((sig) => (sig && sig.device === dev.name ? null : sig));
      setEmergencyModalOpen(false);
      setDemoAlerts((a) =>
        [
          {
            id: `demo-rec-${deviceId}-${Date.now()}`,
            title: `DEMO: ${dev.name} — Telemetry Restored`,
            reading: "Reconnected",
            time: "Just now",
            severity: "info",
            message: `Simulated heartbeat restored. ${dev.feeds.map((f) => f.toUpperCase()).join(" + ")} are available again.`,
            source: dev.name,
          },
          ...a,
        ].slice(0, 6)
      );
    }
  };

  // Feature B: push a manual smartwatch reading into the live stream and re-run clinical triage.
  const handlePushReading = (reading, sourceLabel = "Manual Smartwatch Feed") => {
    setFeedOverride({ ...reading });
    setVitals((prev) => ({
      ...prev,
      hr: reading.hr,
      spo2: reading.spo2,
      bpSys: reading.bpSys,
      bpDia: reading.bpDia,
      temp: reading.temp,
      glucose: reading.glucose,
      lastSync: "Just now",
      hardwareSource: `Arohasetu Smartwatch · ${sourceLabel}`,
      sparkHr: pushFifo(prev.sparkHr, reading.hr),
      sparkSpo2: pushFifo(prev.sparkSpo2, reading.spo2),
      sparkBp: pushFifo(prev.sparkBp, reading.bpSys),
      sparkTemp: pushFifo(prev.sparkTemp, reading.temp),
      sparkGlucose: pushFifo(prev.sparkGlucose, reading.glucose),
    }));

    const { severity, label } = classifyReading(reading);
    setDemoAlerts((a) =>
      [
        {
          id: `demo-feed-${Date.now()}`,
          title: severity === "danger" ? "DEMO SMARTWATCH ALERT — " + label : `DEMO: ${label}`,
          reading: `${reading.hr} bpm · ${reading.spo2}% · ${reading.bpSys}/${reading.bpDia} · ${reading.temp}°C · ${reading.glucose} mg/dL`,
          time: "Just now",
          severity,
          message:
            severity === "danger"
               ? `${label}. The prototype escalation flow is shown for demonstration; no real caregiver or emergency-service message is sent.`
               : severity === "caution"
               ? `${label}. The prototype schedules a demonstration re-check; external notifications are simulated.`
               : "Simulated manual demo feed accepted. The prototype triage rules found no alert threshold crossed.",
          source: `Arohasetu Smartwatch (${sourceLabel})`,
        },
        ...a,
      ].slice(0, 6)
    );

    setPacketCount((p) => p + 1);
    setSecondsAgo(0);
  };

  const handleBluetoothHeartRate = (heartRate, deviceName = "Bluetooth heart-rate device") => {
    bluetoothHrRef.current = Number.isFinite(heartRate) ? heartRate : null;
    if (!Number.isFinite(heartRate)) {
      setVitals((prev) => ({
        ...prev,
        hardwareSource: feedOverride ? "Arohasetu Smartwatch · Manual Demo Feed" : (activePatient?.hardwareSource || ACCOUNT_PROFILES["asharma@demo.in"].hardwareSource),
      }));
      return;
    }
    setVitals((prev) => ({
      ...prev,
      hr: heartRate,
      lastSync: "Just now",
      hardwareSource: `${deviceName} · REAL Bluetooth HR`,
      sparkHr: pushFifo(prev.sparkHr, heartRate),
    }));
    const now = Date.now();
    const severity = heartRate >= 130 || heartRate < 45 ? "danger" : (heartRate > 100 || heartRate < 60 ? "caution" : "info");
    const label = severity === "info" ? "Bluetooth heart rate is within the demo range" : `Heart rate ${severity === "danger" ? "danger" : "needs review"} at ${heartRate} bpm`;
    if (severity !== "info" && now - bluetoothAlertAtRef.current > 30000) {
      bluetoothAlertAtRef.current = now;
      setDemoAlerts((alerts) => [{
        id: `bluetooth-hr-${now}`,
        title: `BLUETOOTH HEART-RATE ${severity.toUpperCase()} — ${label}`,
        reading: `${heartRate} bpm · real Bluetooth heart-rate packet`,
        time: "Just now",
        severity,
        message: `${label}. Prototype alert from a real Bluetooth heart-rate reading; emergency delivery is simulated.`,
        source: deviceName,
      }, ...alerts].slice(0, 6));
    }
    setSecondsAgo(0);
  };

  // Feature B: stop the manual feed, return vitals to the hardware/sim stream.
  const handleClearFeed = () => {
    setFeedOverride(null);
    setVitals((prev) => ({
      ...prev,
      hardwareSource: activePatient?.hardwareSource || ACCOUNT_PROFILES["asharma@demo.in"].hardwareSource,
    }));
    const base = activePatient?.defaultVitals || ACCOUNT_PROFILES["asharma@demo.in"].defaultVitals;
    setVitals((prev) => ({
      ...prev,
      hr: base.hr,
      spo2: base.spo2,
      bpSys: base.bpSys,
      bpDia: base.bpDia,
      temp: base.temp,
      glucose: base.glucose,
    }));
  };

  // Live seconds ticker
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Judge-demo: is a given vital completely offline because ALL of its feeding wearables disconnected?
  // Authoritative Backend Polling for Separate-Window Real-Time Sync (HSC 2027)
  React.useEffect(() => {
    let isMounted = true;

    const syncWithBackend = async () => {
      try {
        const tokenStr = token || localStorage.getItem("rejivan_token");
        const authHeader = tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {};

        // Fetch vitals from authoritative shared server
        const vitalsRes = await fetch("/api/vitals", { headers: authHeader });
        if (vitalsRes.ok) {
          const vData = await vitalsRes.json();
          if (isMounted) {
            if (vData.connectivity) {
              setServerConnectivity(vData.connectivity);
            }
            if (vData.patients && vData.patients.length > 0) {
              const mapBedToId = {
                "bed-101": "P1",
                "bed-102": "P2",
                "bed-103": "P3",
                "bed-104": "P4",
                "REJ-8042": "P1",
                "REJ-9120": "P2",
                "P1": "P1",
                "P2": "P2",
                "P3": "P3",
                "P4": "P4",
              };
              const targetId = mapBedToId[activePatient?.id] || mapBedToId[activePatient?.patientId] || activePatient?.id || "P1";
              const matching = vData.patients.find((p) => p.id === targetId || p.id === activePatient?.id || p.id === activePatient?.patientId);

              if (matching && matching.vitals && vData.connectivity !== "interrupted") {
                const sv = matching.vitals;
                const offlineList = matching.offlineDevices || [];
                setServerOfflineDevices(offlineList);
                const offlineMap = {};
                offlineList.forEach((dId) => { offlineMap[dId] = true; });
                setDisconnectedDevices(offlineMap);

                const metricFeeders = {
                  hr: ["ecg", "watch"],
                  spo2: ["watch"],
                  bpSys: ["bp"],
                  bpDia: ["bp"],
                  temp: ["temp"],
                  glucose: ["glu"],
                };
                const offlineSet = new Set(offlineList);
                const isMetricOffline = (m) => metricFeeders[m] && metricFeeders[m].every((d) => offlineSet.has(d));

                const effHr = isMetricOffline("hr") ? null : (bluetoothHrRef.current ?? (sv.hr !== undefined ? sv.hr : prev => prev.hr));
                const effSpo2 = isMetricOffline("spo2") ? null : (sv.spo2 !== undefined ? sv.spo2 : null);
                const effBpSys = isMetricOffline("bpSys") ? null : (sv.bpSys !== undefined ? sv.bpSys : null);
                const effBpDia = isMetricOffline("bpDia") ? null : (sv.bpDia !== undefined ? sv.bpDia : null);
                const effTemp = isMetricOffline("temp") ? null : (sv.temp !== undefined ? sv.temp : null);
                const effGlucose = isMetricOffline("glucose") ? null : (sv.glucose !== undefined ? sv.glucose : null);

                setVitals((prev) => ({
                  ...prev,
                  hr: isMetricOffline("hr") ? null : (bluetoothHrRef.current ?? (sv.hr !== undefined ? sv.hr : prev.hr)),
                  spo2: isMetricOffline("spo2") ? null : (sv.spo2 !== undefined ? sv.spo2 : prev.spo2),
                  bpSys: isMetricOffline("bpSys") ? null : (sv.bpSys !== undefined ? sv.bpSys : prev.bpSys),
                  bpDia: isMetricOffline("bpDia") ? null : (sv.bpDia !== undefined ? sv.bpDia : prev.bpDia),
                  temp: isMetricOffline("temp") ? null : (sv.temp !== undefined ? sv.temp : prev.temp),
                  glucose: isMetricOffline("glucose") ? null : (sv.glucose !== undefined ? sv.glucose : prev.glucose),
                  sparkHr: bluetoothHrRef.current != null ? prev.sparkHr : (sv.hr != null ? pushFifo(prev.sparkHr, sv.hr) : prev.sparkHr),
                  sparkSpo2: sv.spo2 != null ? pushFifo(prev.sparkSpo2, sv.spo2) : prev.sparkSpo2,
                  sparkBp: sv.bpSys != null ? pushFifo(prev.sparkBp, sv.bpSys) : prev.sparkBp,
                  sparkTemp: sv.temp != null ? pushFifo(prev.sparkTemp, sv.temp) : prev.sparkTemp,
                  sparkGlucose: sv.glucose != null ? pushFifo(prev.sparkGlucose, sv.glucose) : prev.sparkGlucose,
                  lastSync: "Just now",
                }));
                setSecondsAgo(0);
                setPacketCount((p) => p + 1);
                setLastPacketFlash(true);
                setTimeout(() => {
                  if (isMounted) setLastPacketFlash(false);
                }, 300);
              }
            }
          }
        }

        // Fetch authoritative alerts from server
        const alertsRes = await fetch("/api/alerts", { headers: authHeader });
        if (alertsRes.ok) {
          const aData = await alertsRes.json();
          if (isMounted && aData.alerts) {
            setServerAlerts(aData.alerts);
          }
        }
      } catch (e) {
        // Transient network or serverless restart
      }
    };

    syncWithBackend();
    const pollTimer = setInterval(syncWithBackend, 1800);
    return () => {
      isMounted = false;
      clearInterval(pollTimer);
    };
  }, [token, activePatient.id]);

  // Clinician Action Handlers (Acknowledge, Follow-up, Resolve)
  const handleAcknowledgeAlert = async (alertId) => {
    try {
      const tokenStr = token || localStorage.getItem("rejivan_token");
      await fetch(`/api/alerts/${alertId}/acknowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {}),
        },
        body: JSON.stringify({ clinicianName: user?.name || "On-Duty Clinician" }),
      });
      const res = await fetch("/api/alerts", { headers: tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {} });
      if (res.ok) {
        const data = await res.json();
        setServerAlerts(data.alerts || []);
      }
    } catch (e) {
      console.error("Acknowledge alert error:", e);
    }
  };

  const handleRecordFollowup = async (alertId, actionNote) => {
    try {
      const tokenStr = token || localStorage.getItem("rejivan_token");
      await fetch(`/api/alerts/${alertId}/followup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {}),
        },
        body: JSON.stringify({ clinicianName: user?.name || "Attending Clinician", actionNote }),
      });
      const res = await fetch("/api/alerts", { headers: tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {} });
      if (res.ok) {
        const data = await res.json();
        setServerAlerts(data.alerts || []);
      }
    } catch (e) {
      console.error("Record follow-up error:", e);
    }
  };

  const handleResolveAlert = async (alertId, resolutionNote) => {
    try {
      const tokenStr = token || localStorage.getItem("rejivan_token");
      await fetch(`/api/alerts/${alertId}/resolve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {}),
        },
        body: JSON.stringify({ clinicianName: user?.name || "Attending Clinician", resolutionNote }),
      });
      const res = await fetch("/api/alerts", { headers: tokenStr ? { Authorization: `Bearer ${tokenStr}` } : {} });
      if (res.ok) {
        const data = await res.json();
        setServerAlerts(data.alerts || []);
      }
    } catch (e) {
      console.error("Resolve alert error:", e);
    }
  };

  // Continuous physiological drift & sparkline streaming interval (every 1.5 seconds)
  React.useEffect(() => {
    // Authenticated dashboards read the shared simulator store; do not let the
    // local drift loop overwrite those authoritative readings between polls.
    if (!isStreaming || token) return;

    const streamInterval = setInterval(() => {
      setVitals((prev) => {
        const baseVitals = activePatient?.defaultVitals || ACCOUNT_PROFILES["asharma@demo.in"].defaultVitals;
        // Manual smartwatch feed (Feature B) overrides sim/base targets while active
        let targetHr = feedOverride ? feedOverride.hr : baseVitals.hr;
        let targetSpo2 = feedOverride ? feedOverride.spo2 : baseVitals.spo2;
        let targetBpSys = feedOverride ? feedOverride.bpSys : baseVitals.bpSys;
        let targetBpDia = feedOverride ? feedOverride.bpDia : baseVitals.bpDia;
        let targetTemp = feedOverride ? feedOverride.temp : baseVitals.temp;
        let targetGlucose = feedOverride ? feedOverride.glucose : baseVitals.glucose;

        if (simMode === "bp_crisis") {
          targetHr = 95;
          targetSpo2 = 97.1;
          targetBpSys = 172;
          targetBpDia = 106;
          targetTemp = 37.2;
          targetGlucose = 126;
        } else if (simMode === "hypoxemia") {
          targetHr = 114;
          targetSpo2 = 89.4;
          targetBpSys = 138;
          targetBpDia = 88;
          targetTemp = 37.3;
          targetGlucose = 118;
        } else if (simMode === "bradycardia") {
          targetHr = 50;
          targetSpo2 = 98.2;
          targetBpSys = 104;
          targetBpDia = 64;
          targetTemp = 36.6;
          targetGlucose = 102;
        }

        // Physiological drift equation with mean reversion and natural jitter
        const drift = (curr, target, step, noise) => {
          const delta = (target - curr) * step;
          const jitter = (Math.random() * 2 - 1) * noise;
          return curr + delta + jitter;
        };

        // Feature A: vitals whose wearable(s) lost their heartbeat stay null (stale, no drift)
        const hrOff = isVitalOffline("hr");
        const spo2Off = isVitalOffline("spo2");
        const bpOff = isVitalOffline("bpSys") || isVitalOffline("bpDia");
        const tempOff = isVitalOffline("temp");
        const gluOff = isVitalOffline("glucose");

        const nextHr = hrOff ? null : (bluetoothHrRef.current ?? Math.round(drift(prev.hr ?? baseVitals.hr, targetHr, 0.35, 1.2)));
        const nextSpo2 = spo2Off ? null : Math.round(drift(prev.spo2 ?? baseVitals.spo2, targetSpo2, 0.3, 0.15) * 10) / 10;
        const nextBpSys = bpOff ? null : Math.round(drift(prev.bpSys ?? baseVitals.bpSys, targetBpSys, 0.35, 1.5));
        const nextBpDia = bpOff ? null : Math.round(drift(prev.bpDia ?? baseVitals.bpDia, targetBpDia, 0.35, 1.2));
        const nextTemp = tempOff ? null : Math.round(drift(prev.temp ?? baseVitals.temp, targetTemp, 0.2, 0.05) * 10) / 10;
        const nextGlucose = gluOff ? null : Math.round(drift(prev.glucose ?? baseVitals.glucose, targetGlucose, 0.25, 1.0));

        return {
          ...prev,
          hr: nextHr,
          spo2: nextSpo2,
          bpSys: nextBpSys,
          bpDia: nextBpDia,
          temp: nextTemp,
          glucose: nextGlucose,
          lastSync: "Just now",
          hardwareSource: bluetoothHrRef.current != null
            ? "Bluetooth Heart Rate · REAL"
            : feedOverride ? "Arohasetu Smartwatch · Manual Demo Feed" : prev.hardwareSource,
          sparkHr: hrOff ? prev.sparkHr : pushFifo(prev.sparkHr, nextHr),
          sparkSpo2: spo2Off ? prev.sparkSpo2 : pushFifo(prev.sparkSpo2, nextSpo2),
          sparkBp: bpOff ? prev.sparkBp : pushFifo(prev.sparkBp, nextBpSys),
          sparkTemp: tempOff ? prev.sparkTemp : pushFifo(prev.sparkTemp, nextTemp),
          sparkGlucose: gluOff ? prev.sparkGlucose : pushFifo(prev.sparkGlucose, nextGlucose),
        };
      });

      setSecondsAgo(0);
      setPacketCount((p) => p + 1);
      setLastPacketFlash(true);
      setTimeout(() => setLastPacketFlash(false), 300);
    }, 1500);

    return () => clearInterval(streamInterval);
  }, [isStreaming, simMode, activePatient, feedOverride, disconnectedDevices, token]);

  // Evaluates live patient vitals against clinical thresholds with zero fake alerts
  const evaluateVitalsStatus = (v) => {
    if (!v) return { severity: "normal", text: "Vitals within normal limits", abnormalMetrics: [] };
    const abnormal = [];

    // Danger / Critical checks
    if (v.hr != null && v.hr >= 120) abnormal.push({ metric: "hr", severity: "danger", text: `Critical Tachycardia: HR ${v.hr} bpm` });
    else if (v.hr != null && v.hr <= 50) abnormal.push({ metric: "hr", severity: "danger", text: `Severe Bradycardia: HR ${v.hr} bpm` });

    if (v.spo2 != null && v.spo2 <= 90) abnormal.push({ metric: "spo2", severity: "danger", text: `Acute Hypoxemia: SpO2 ${v.spo2}%` });

    if (v.bpSys != null && v.bpSys >= 160) abnormal.push({ metric: "bpSys", severity: "danger", text: `Severe Hypertension: BP ${v.bpSys}/${v.bpDia || "--"} mmHg` });
    else if (v.bpSys != null && v.bpSys <= 85) abnormal.push({ metric: "bpSys", severity: "danger", text: `Hypotensive Shock: BP ${v.bpSys}/${v.bpDia || "--"} mmHg` });

    if (v.bpDia != null && v.bpDia >= 100) abnormal.push({ metric: "bpDia", severity: "danger", text: `Critical Diastolic BP: ${v.bpDia} mmHg` });

    if (v.temp != null && v.temp >= 38.3) abnormal.push({ metric: "temp", severity: "danger", text: `High Pyrexia: Temp ${v.temp}°C` });
    else if (v.temp != null && v.temp <= 35.0) abnormal.push({ metric: "temp", severity: "danger", text: `Hypothermia: Temp ${v.temp}°C` });

    if (v.rr != null && v.rr >= 25) abnormal.push({ metric: "rr", severity: "danger", text: `Severe Tachypnea: RR ${v.rr} breaths/min` });
    else if (v.rr != null && v.rr <= 10) abnormal.push({ metric: "rr", severity: "danger", text: `Respiratory Depression: RR ${v.rr} breaths/min` });

    if (v.glucose != null && v.glucose >= 180) abnormal.push({ metric: "glucose", severity: "danger", text: `Critical Hyperglycemia: ${v.glucose} mg/dL` });
    else if (v.glucose != null && v.glucose <= 60) abnormal.push({ metric: "glucose", severity: "danger", text: `Critical Hypoglycemia: ${v.glucose} mg/dL` });

    // Caution checks (only if no danger for that metric)
    if (v.hr != null && v.hr > 100 && v.hr < 120) abnormal.push({ metric: "hr", severity: "caution", text: `Elevated Heart Rate: ${v.hr} bpm` });
    else if (v.hr != null && v.hr >= 51 && v.hr <= 59) abnormal.push({ metric: "hr", severity: "caution", text: `Low Heart Rate: ${v.hr} bpm` });

    if (v.spo2 != null && v.spo2 > 90 && v.spo2 < 95) abnormal.push({ metric: "spo2", severity: "caution", text: `Borderline SpO2: ${v.spo2}%` });

    if (v.bpSys != null && v.bpSys >= 136 && v.bpSys < 160) abnormal.push({ metric: "bpSys", severity: "caution", text: `Elevated Blood Pressure: ${v.bpSys}/${v.bpDia || "--"} mmHg` });
    if (v.bpDia != null && v.bpDia >= 86 && v.bpDia < 100) abnormal.push({ metric: "bpDia", severity: "caution", text: `Elevated Diastolic BP: ${v.bpDia} mmHg` });

    if (v.temp != null && v.temp >= 37.5 && v.temp < 38.3) abnormal.push({ metric: "temp", severity: "caution", text: `Low-grade Fever: ${v.temp}°C` });
    if (v.rr != null && v.rr >= 21 && v.rr < 25) abnormal.push({ metric: "rr", severity: "caution", text: `Elevated RR: ${v.rr} breaths/min` });
    if (v.glucose != null && v.glucose >= 141 && v.glucose < 180) abnormal.push({ metric: "glucose", severity: "caution", text: `Elevated Glucose: ${v.glucose} mg/dL` });

    const dangerList = abnormal.filter((a) => a.severity === "danger");
    if (dangerList.length > 0) {
      return {
        severity: "danger",
        text: dangerList.map((a) => a.text).join(" • "),
        primary: dangerList[0],
        abnormalMetrics: abnormal,
      };
    }
    const cautionList = abnormal.filter((a) => a.severity === "caution");
    if (cautionList.length > 0) {
      return {
        severity: "caution",
        text: cautionList.map((a) => a.text).join(" • "),
        primary: cautionList[0],
        abnormalMetrics: abnormal,
      };
    }
    return { severity: "normal", text: "Vitals within normal limits", abnormalMetrics: [] };
  };

  // Dynamic Triage Metrics Calculator
  const getTriageMetrics = () => {
    if (isNurse && selectedWardBed === "all") {
      return {
        patientsCount: 4,
        normalCount: 2,
        cautionCount: 2,
        dangerCount: 0,
        cautionText: "Bed 101 (Elevated BP) • Bed 104 (Tachycardia)",
        dangerText: "Zero active emergency alerts",
      };
    }
    // Feature A: any disconnection raises triage to danger (camera layer still covers safety)
    const offlineCount = Object.values(disconnectedDevices).filter(Boolean).length;
    if (offlineCount > 0) {
      return {
        patientsCount: 1,
        normalCount: 0,
        cautionCount: 0,
        dangerCount: 1,
        cautionText: "Vitals partially degraded — camera layer still active",
        dangerText: `Wearable telemetry degraded (${offlineCount} device(s) offline) — YOLO falls/activity watch continues`,
      };
    }

    const vStatus = evaluateVitalsStatus(vitals);
    if (vStatus.severity === "danger") {
      return {
        patientsCount: 1,
        normalCount: 0,
        cautionCount: 0,
        dangerCount: 1,
        cautionText: "Prior check nominal",
        dangerText: vStatus.text,
      };
    }
    if (vStatus.severity === "caution") {
      return {
        patientsCount: 1,
        normalCount: 0,
        cautionCount: 1,
        dangerCount: 0,
        cautionText: vStatus.text,
        dangerText: "Zero active emergencies",
      };
    }
    return {
      patientsCount: 1,
      normalCount: 1,
      cautionCount: 0,
      dangerCount: 0,
      cautionText: "Zero active cautions",
      dangerText: "Zero active emergencies",
    };
  };

  const triage = getTriageMetrics();
  const familyAlerts = [...demoAlerts, ...serverAlerts];
  const unresolvedFamilyAlerts = familyAlerts.filter((alert) => alert.status !== "Resolved");
  const familyMonitorStatus = triage.dangerCount > 0 || unresolvedFamilyAlerts.some((alert) => alert.severity === "danger")
    ? "danger"
    : triage.cautionCount > 0 || unresolvedFamilyAlerts.some((alert) => alert.severity === "caution")
    ? "caution"
    : "normal";

  // Mobile / Phone View Alert Jump State & Escalation Review
  const [jumpAlert, setJumpAlert] = React.useState(null);
  const [jumpDismissed, setJumpDismissed] = React.useState(false);
  const [isScrolledDown, setIsScrolledDown] = React.useState(false);
  const [reviewEscalationModalOpen, setReviewEscalationModalOpen] = React.useState(false);
  const [escalationOnsetTimestamp, setEscalationOnsetTimestamp] = React.useState(null);
  const [selectedEscalationAlert, setSelectedEscalationAlert] = React.useState(null);
  const lastAlertIdRef = React.useRef(null);

  // Monitor scroll position to show floating jump-to-alert pill on phone view
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(typeof window !== "undefined" && window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When an alert comes in on phone/mobile, jump upwards automatically so viewer sees the issue first!
  // When vitals revert back to normal, automatically clear and dismiss the alert!
  React.useEffect(() => {
    // 1. Filter out resolved alerts or alerts belonging to other patients
    const activeAlerts = unresolvedFamilyAlerts.filter((a) => {
      if (a.status === "Resolved") return false;
      if (a.patientId && activePatient?.id && a.patientId !== activePatient.id && !isNurse) return false;

      // Clinical validity check: if this alert is for a vital that is currently in normal safe range, auto-dismiss it!
      if (a.vitalType === "hr" && vitals.hr != null && vitals.hr >= 60 && vitals.hr <= 100) return false;
      if ((a.vitalType === "bpSys" || a.vitalType === "bpDia" || a.vitalType === "bp") && vitals.bpSys != null && vitals.bpSys < 136 && vitals.bpDia < 86) return false;
      if (a.vitalType === "spo2" && vitals.spo2 != null && vitals.spo2 >= 95) return false;
      if (a.vitalType === "temp" && vitals.temp != null && vitals.temp >= 36.3 && vitals.temp <= 37.4) return false;
      if (a.vitalType === "rr" && vitals.rr != null && vitals.rr >= 12 && vitals.rr <= 20) return false;
      if (a.vitalType === "glucose" && vitals.glucose != null && vitals.glucose >= 70 && vitals.glucose <= 140) return false;
      return true;
    });

    let urgentAlert = activeAlerts.find((a) => a.severity === "danger" || a.severity === "critical");
    if (!urgentAlert) {
      urgentAlert = activeAlerts.find((a) => a.severity === "caution");
    }

    // 2. Also check real-time live vitals directly for immediate zero-lag responsiveness
    if (!urgentAlert && Object.values(disconnectedDevices).filter(Boolean).length === 0) {
      const vStatus = evaluateVitalsStatus(vitals);
      if (vStatus.severity === "danger" || vStatus.severity === "caution") {
        const prim = vStatus.primary;
        const readingVal = prim.metric === "hr" ? `${vitals.hr} bpm`
          : (prim.metric === "spo2" ? `${vitals.spo2}%`
          : (prim.metric === "bpSys" || prim.metric === "bpDia" ? `${vitals.bpSys}/${vitals.bpDia} mmHg`
          : (prim.metric === "temp" ? `${vitals.temp} °C`
          : (prim.metric === "rr" ? `${vitals.rr} breaths/min` : `${vitals.glucose} mg/dL`))));
        urgentAlert = {
          id: `live-${prim.metric}-${Math.floor(Date.now() / 15000)}`,
          patientName: activePatient?.name || "Patient",
          title: `CRITICAL ALERT: ${prim.text}`,
          reading: readingVal,
          source: "Continuous Bio-Telemetry",
          conditionReason: `${prim.text} detected. Immediate clinical assessment advised.`,
          message: `${prim.text} detected during continuous bio-telemetry streaming.`,
          severity: vStatus.severity,
          time: "Live telemetry",
        };
      }
    }

    if (urgentAlert) {
      if (lastAlertIdRef.current !== urgentAlert.id) {
        lastAlertIdRef.current = urgentAlert.id;
        setJumpAlert(urgentAlert);
        setJumpDismissed(false);
        setEscalationOnsetTimestamp((prev) => prev || Date.now());

        // Auto jump upwards smoothly so viewer spots the issue instantly
        const triggerJumpUpwards = () => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            const anchor = document.getElementById("mobile-urgent-alert-anchor");
            if (anchor) {
              anchor.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        };

        triggerJumpUpwards();
        const t1 = setTimeout(triggerJumpUpwards, 80);
        const t2 = setTimeout(triggerJumpUpwards, 260);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    } else {
      if (jumpAlert) {
        setJumpAlert(null);
        setJumpDismissed(false);
      }
      setEscalationOnsetTimestamp(null);
      lastAlertIdRef.current = null;
    }
  }, [unresolvedFamilyAlerts, vitals, disconnectedDevices]);

  // Auth Handlers
  const handleLogin = async (email, password) => {
    const profile = ACCOUNT_PROFILES[email] || ACCOUNT_PROFILES["asharma@demo.in"];
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser({ ...profile, ...(data.user || {}) });
        localStorage.setItem("rejivan_token", data.token);
        setVitals({
          ...profile.defaultVitals,
          lastSync: "Just now",
          hardwareSource: profile.hardwareSource,
        });
        setSimMode("baseline");
        if (profile.role === "nurse") {
          setSelectedWardBed("bed-101");
          const targetBed = HOSPITAL_INPATIENT_BEDS["bed-101"];
          setVitals({
            ...targetBed.defaultVitals,
            lastSync: "Just now",
            hardwareSource: targetBed.hardwareSource,
          });
          setActiveTab("ward");
        } else {
          setSelectedWardBed("bed-101");
          setVitals({
            ...profile.defaultVitals,
            lastSync: "Just now",
            hardwareSource: profile.hardwareSource,
          });
          setActiveTab("dashboard");
        }
        return;
      }
    } catch (e) {
      // Offline fallback
    }

    // Client-side fallback
    setUser(profile);
    setSimMode("baseline");
    if (profile.role === "nurse") {
      setSelectedWardBed("bed-101");
      const targetBed = HOSPITAL_INPATIENT_BEDS["bed-101"];
      setVitals({
        ...targetBed.defaultVitals,
        lastSync: "Just now",
        hardwareSource: targetBed.hardwareSource,
      });
      setActiveTab("ward");
    } else {
      setSelectedWardBed("bed-101");
      setVitals({
        ...profile.defaultVitals,
        lastSync: "Just now",
        hardwareSource: profile.hardwareSource,
      });
      setActiveTab("dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rejivan_token");
    setToken("");
    setLoginModalOpen(true);
  };

  // Local demo dashboards need a real read-only session to receive simulator
  // updates and alerts. The visible Anita profile is the documented demo user.
  React.useEffect(() => {
    if (token || !["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
    let cancelled = false;
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "asharma@demo.in", password: "demo123" }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data?.token) return;
        localStorage.setItem("rejivan_token", data.token);
        setToken(data.token);
        setUser({ ...ACCOUNT_PROFILES["asharma@demo.in"], ...(data.user || {}) });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [token]);

  // Route Protection: Virtual Ward is strictly restricted to hospital staff / nurse logins
  React.useEffect(() => {
    const isNurse = user?.role === "nurse" || user?.email === "wardnurse@demo.in";
    if (!isNurse && activeTab === "ward") {
      setActiveTab("dashboard");
    }
    if (isNurse && activeTab === "family-monitor") {
      setActiveTab("dashboard");
    }
  }, [user, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex">
      {/* 1. Left Navigation Sidebar (Collapsible) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        alertCount={3}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        user={user}
      />

      {/* Main Content Area Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* 2. Top Application Bar */}
        <TopBar
          activeTab={activeTab}
          user={user}
          onLogout={handleLogout}
          onSwitchUser={(email, pw) => handleLogin(email, pw)}
          curLang={curLang}
          setCurLang={setCurLang}
          notificationCount={3}
          setMobileOpen={setMobileOpen}
        />

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {/* Mobile Alert Jump Target Anchor */}
          <div id="mobile-urgent-alert-anchor" />

          {/* Top Priority Urgent Alert Jump Banner (Renders across mobile/all viewports when active alert fires) */}
          {jumpAlert && !jumpDismissed && (
            <div
              className={`mb-6 rounded-2xl p-4 sm:p-5 text-white shadow-xl transition-all duration-300 relative overflow-hidden ${
                jumpAlert.severity === "danger" || jumpAlert.severity === "critical"
                  ? "bg-gradient-to-r from-rose-700 via-rose-600 to-red-700 border-2 border-rose-300 ring-4 ring-rose-400/40"
                  : "bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 border-2 border-amber-300 ring-4 ring-amber-400/40"
              } animate-in slide-in-from-top-6`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 animate-bounce mt-0.5 shadow-xs">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white text-rose-700 shadow-2xs">
                        {jumpAlert.severity === "danger" || jumpAlert.severity === "critical"
                          ? "🚨 EMERGENCY ALERT · IMMEDIATE ACTION"
                          : "⚠️ CLINICAL WARNING"}
                      </span>
                      <span className="text-xs text-white/90 font-medium">
                        {jumpAlert.time || "Just now"}
                      </span>
                      {jumpAlert.source && (
                        <span className="text-xs text-white/80 font-mono">
                          via {jumpAlert.source}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-white mt-1 leading-tight">
                      {jumpAlert.title || jumpAlert.conditionReason || "Critical Clinical Threshold Exceeded"}
                    </h2>
                    {jumpAlert.reading && (
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className="inline-block bg-black/30 backdrop-blur-xs px-2.5 py-0.5 rounded-md font-mono text-xs font-bold text-white border border-white/20">
                          Reading: {jumpAlert.reading}
                        </span>
                        <span className="text-xs text-white/90">
                          Patient: <strong>{jumpAlert.patientName || activePatient?.name || "Patient"}</strong>
                        </span>
                      </div>
                    )}
                    {jumpAlert.message && (
                      <p className="text-xs text-white/95 mt-1.5 leading-relaxed max-w-3xl">
                        {jumpAlert.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center sm:flex-col gap-2 shrink-0 self-end sm:self-center mt-2 sm:mt-0">
                  <button
                    onClick={() => {
                      setSelectedEscalationAlert(jumpAlert);
                      setReviewEscalationModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-rose-800 text-xs font-bold hover:bg-rose-50 shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <span>Review Escalation</span>
                    <span>→</span>
                  </button>
                  {jumpAlert.id && (
                    <button
                      onClick={() => {
                        handleAcknowledgeAlert(jumpAlert.id);
                        setJumpDismissed(true);
                      }}
                      className="px-3.5 py-1 rounded-xl bg-black/25 text-white text-[11px] font-semibold hover:bg-black/35 cursor-pointer transition-all"
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    onClick={() => setJumpDismissed(true)}
                    className="px-2 py-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 text-[11px] transition-all cursor-pointer"
                    title="Dismiss Banner"
                  >
                    Dismiss ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="animate-in fade-in duration-150">
              {/* Hospital Inpatient Bed Selector Bar (Active Census & Bed Toggle) */}
              {isNurse && (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs border border-blue-100">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">
                            GB Pant Hospital · Inpatient Ward A Telemetry
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                            4 Active Inpatient Beds
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Toggle between specific inpatient beds below to inspect live vitals, MAR, and telemetry, or choose <strong>All Beds (Ward Grid)</strong> to see all patients.
                        </p>
                      </div>
                    </div>

                    {/* Bed Switching Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handleSelectWardBed("all")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          selectedWardBed === "all"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>All Beds (Ward Grid)</span>
                      </button>
                      <span className="text-slate-300 hidden sm:inline">|</span>
                      {Object.values(HOSPITAL_INPATIENT_BEDS).map((bed) => {
                        const isSelected = selectedWardBed === bed.id;
                        return (
                          <button
                            key={bed.id}
                            onClick={() => handleSelectWardBed(bed.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-blue-600 text-white shadow-xs font-bold"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium"
                            }`}
                          >
                            <span>🛏️ {bed.bedNumber}: {bed.name.split(" ")[0]}</span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                bed.status === "danger"
                                  ? "bg-rose-500"
                                  : bed.status === "caution"
                                  ? isSelected ? "bg-amber-300" : "bg-amber-500"
                                  : isSelected ? "bg-emerald-300" : "bg-emerald-500"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dynamic subtext banner */}
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-600 bg-slate-50/90 px-3.5 py-2 rounded-xl border border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="font-semibold text-slate-800">
                        {selectedWardBed === "all"
                          ? "Showing Combined Ward Census (All 4 Inpatients)"
                          : `Active Bed: ${activePatient.bedNumber} · ${activePatient.name} (${activePatient.age} ${activePatient.gender}) — ${activePatient.condition}`}
                      </span>
                    </div>
                    <span className="text-[11px] text-indigo-700 font-medium">
                      Attending: {activePatient.attendingDoc || "Dr. A. Sen, MD & Dr. V. Rao, MS"}
                    </span>
                  </div>
                </div>
              )}

              {/* 3. Global Triage Metric Strip (Top of Dashboard) */}
              <TriageMetricStrip
                patientsCount={triage.patientsCount}
                normalCount={triage.normalCount}
                cautionCount={triage.cautionCount}
                dangerCount={triage.dangerCount}
                cautionText={triage.cautionText}
                dangerText={triage.dangerText}
              />

              {/* Clinical Bio-Telemetry & Remote Synchronisation Status Bar (Judge-Facing Mode) */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${serverConnectivity === 'interrupted' ? 'bg-rose-500 animate-ping' : (isStreaming ? 'bg-emerald-500 animate-ping' : 'bg-slate-300')}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Continuous Bio-Telemetry Stream
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold transition-colors ${
                        serverConnectivity === 'interrupted'
                          ? "bg-rose-100 text-rose-800 border border-rose-200 font-bold"
                          : lastPacketFlash ? "bg-emerald-200 text-emerald-900 font-bold" : "bg-slate-100 text-slate-600"
                      }`}>
                        {serverConnectivity === 'interrupted' ? "GATEWAY INTERRUPTED (STALE)" : `Packet #${packetCount} · LIVE SYNC`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {serverConnectivity === 'interrupted' ? (
                        <span className="text-rose-700 font-semibold">⚠️ Offline Safeguard Active: Remote gateway packet interrupted. Retaining last validated reading.</span>
                      ) : (
                        <span>Last packet received: <span className="font-mono font-medium text-slate-700">{secondsAgo === 0 ? "Just now" : `${secondsAgo}s ago`}</span> · Gateway: Authoritative Server Sync · Sampling: 1.0 Hz</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md">
                    Judge Demo · Admin-synced synthetic telemetry
                  </span>
                </div>
              </div>

              {/* 4. Main Content Area (2-Column Grid: 70% Left, 30% Right) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Column (Primary Telemetry & Patient Detail - 70%) */}
                <div className="xl:col-span-8 space-y-6">
                  {/* Simulated signal banner (fired when demo wearable loses heartbeat) */}
                  {emergencySignal && (
                    <div className="rounded-2xl border-2 border-rose-400 bg-rose-600 text-white p-4 shadow-lg animate-pulse flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                        <div>
                          <h4 className="text-sm font-bold tracking-tight">
                            DEMO ALERT: Wearable connection lost
                          </h4>
                          <p className="text-[11px] mt-0.5 opacity-95">
                            {emergencySignal.device} is marked disconnected for this demonstration. {emergencySignal.feeds.map((f) => f.toUpperCase()).join(" + ")} readings are unavailable. The alert flow is simulated; no real emergency call or message is sent.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-stretch sm:self-center">
                        <button
                          onClick={() => setEmergencyModalOpen(true)}
                          className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/30 backdrop-blur-xs"
                        >
                          View Demo Alert
                        </button>
                        <button
                          onClick={() => {
                            setEmergencySignal(null);
                            setEmergencyModalOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white text-rose-700 text-xs font-bold hover:bg-white/90"
                        >
                          Acknowledge &amp; Clear
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Either All Beds Grid OR Focused Patient Overview Card */}
                  {selectedWardBed === "all" && isNurse ? (
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs mb-6">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <h3 className="text-sm font-bold text-slate-900">
                            Ward A Inpatient Telemetry Matrix (4 Active Beds)
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">
                          Click any bed to focus full telemetry
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.values(HOSPITAL_INPATIENT_BEDS).map((bed) => {
                          const isCaution = bed.status === "caution";
                          const isDanger = bed.status === "danger";
                          return (
                            <div
                              key={bed.id}
                              className={`p-4 rounded-xl border transition-all ${
                                isDanger
                                  ? "border-rose-300 bg-rose-50/20"
                                  : isCaution
                                  ? "border-amber-300 bg-amber-50/20"
                                  : "border-slate-200/80 bg-slate-50/40 hover:border-blue-300"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                                      🛏️ {bed.bedNumber}
                                    </span>
                                    <h4 className="text-sm font-bold text-slate-900">
                                      {bed.name}
                                    </h4>
                                    <span className="text-xs text-slate-500">
                                      ({bed.age}{bed.gender === "Female" ? "F" : "M"})
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-600 font-medium mt-1 truncate">
                                    {bed.condition}
                                  </p>
                                  <p className="text-[11px] text-slate-400 mt-0.5">
                                    {bed.attendingDoc}
                                  </p>
                                </div>
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                    isDanger
                                      ? "bg-rose-100 text-rose-800 border border-rose-200"
                                      : isCaution
                                      ? "bg-amber-100 text-amber-800 border border-amber-200"
                                      : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  }`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isDanger
                                        ? "bg-rose-500 animate-ping"
                                        : isCaution
                                        ? "bg-amber-500 animate-pulse"
                                        : "bg-emerald-500"
                                    }`}
                                  />
                                  <span>{isDanger ? "Critical" : isCaution ? "Caution" : "Stable"}</span>
                                </span>
                              </div>

                              {/* Vitals Strip */}
                              <div className="grid grid-cols-5 gap-1.5 mt-3 p-2 bg-white rounded-lg border border-slate-200/60 text-center">
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-slate-400">HR</div>
                                  <div className="text-xs font-bold font-mono text-slate-800">{bed.defaultVitals.hr}</div>
                                </div>
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-slate-400">SpO2</div>
                                  <div className="text-xs font-bold font-mono text-slate-800">{bed.defaultVitals.spo2}%</div>
                                </div>
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-slate-400">BP</div>
                                  <div className="text-xs font-bold font-mono text-slate-800">{bed.defaultVitals.bpSys}/{bed.defaultVitals.bpDia}</div>
                                </div>
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-slate-400">Temp</div>
                                  <div className="text-xs font-bold font-mono text-slate-800">{bed.defaultVitals.temp}°C</div>
                                </div>
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-slate-400">Glu</div>
                                  <div className="text-xs font-bold font-mono text-slate-800">{bed.defaultVitals.glucose}</div>
                                </div>
                              </div>

                              {/* Action */}
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ID: {bed.patientId}
                                </span>
                                <button
                                  onClick={() => handleSelectWardBed(bed.id)}
                                  className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Focus Bed Telemetry</span>
                                  <span>→</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <PatientOverviewCard
                      patient={{
                        name: activePatient.name,
                        bedNumber: activePatient.bedNumber,
                        age: activePatient.age,
                        gender: activePatient.gender,
                        location: activePatient.location,
                        patientId: activePatient.patientId,
                        condition: activePatient.condition,
                        attendingDoc: activePatient.attendingDoc,
                        status:
                          triage.dangerCount > 0
                            ? "Critical Alert"
                            : triage.cautionCount > 0
                            ? "Caution / Review"
                            : "Monitoring Nominal",
                        lastUpdated: secondsAgo === 0 ? "Just now (Live BLE)" : `${secondsAgo}s ago`,
                      }}
                      onCallCaregiver={() => setCallModalOpen(true)}
                      onClinicalExport={() => setExportModalOpen(true)}
                    />
                  )}

                  {/* Comprehensive Vital Signs Table */}
                  <VitalSignsTable vitalsData={vitals} />

                </div>

                {/* Right Column (Alerts & Care Coordination Panel - 30%) */}
                <div className="xl:col-span-4 space-y-6">
                  {/* Recent Alerts Card */}
                  <RecentAlerts currentUser={user} activePatient={activePatient} alerts={serverAlerts} prependAlerts={demoAlerts} />

                  {/* Medication Schedule Card */}
                  <MedicationScheduleCard
                    onOpenAddModal={() => setAddMedModalOpen(true)}
                    currentUser={user}
                    activePatient={activePatient}
                  />

                  {/* Patient Timeline Feed */}
                  <PatientTimeline currentUser={user} activePatient={activePatient} />
                </div>
              </div>

              {/* 5. Multimodal Incident Reconstruction & Kinematics Panel */}
              <div className="mt-6">
                <IncidentReconstructionPanel
                  onTriggerVerification={handleOpenCheckin}
                  currentVitals={vitals}
                />
              </div>
            </div>
          )}

          {activeTab === "family-monitor" && !isNurse && (
            <FamilyMonitorView
              patient={activePatient}
              vitals={vitals}
              alerts={familyAlerts}
              connectivity={serverConnectivity}
              secondsAgo={secondsAgo}
              status={familyMonitorStatus}
              onViewAlerts={() => setActiveTab("alerts")}
            />
          )}

          {/* Dedicated "Camera Zones" Route */}
          {activeTab === "camera" && (
            <CameraZonesView
              onTriggerAlert={(alertOrActive) => {
                if (typeof alertOrActive === "object" && alertOrActive !== null) {
                  setDemoAlerts((prev) => [alertOrActive, ...prev.slice(0, 7)]);
                  setVitals((prev) => ({ ...prev, bpSys: 154 }));
                } else if (alertOrActive) {
                  setVitals((prev) => ({ ...prev, bpSys: 154 }));
                } else {
                  setVitals((prev) => ({ ...prev, bpSys: 149 }));
                }
              }}
              onTriggerVerification={handleOpenCheckin}
              currentUser={user}
              activePatient={activePatient}
            />
          )}

          {/* Virtual Ward Route (Restricted strictly to Hospital Staff & Nurses) */}
          {activeTab === "ward" && (user?.role === "nurse" || user?.email === "wardnurse@demo.in") && (
            <VirtualWardView
              currentVitals={vitals}
              simMode={simMode}
              isStreaming={isStreaming}
              secondsAgo={secondsAgo}
              onPageDoctor={() => setCallModalOpen(true)}
              onExportTelemetry={() => setExportModalOpen(true)}
              currentUser={user}
              activePatient={activePatient}
            />
          )}

          {/* Medicines MAR Route */}
          {activeTab === "medicines" && (
            <MedicinesView
              onOpenAddModal={() => setAddMedModalOpen(true)}
              currentUser={user}
            />
          )}

          {/* Alerts Escalation Route */}
          {activeTab === "alerts" && (
            <AlertsView
              currentUser={user}
              activePatient={activePatient}
              liveAlerts={serverAlerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onRecordFollowup={handleRecordFollowup}
              onResolveAlert={handleResolveAlert}
            />
          )}

          {/* Medical Devices Fleet Route */}
          {activeTab === "devices" && (
            <MedicalDevicesView currentUser={user} activePatient={activePatient} />
          )}
        </main>

        {/* Global Clinical Modals */}
        <EmergencySignalModal
          isOpen={emergencyModalOpen}
          onClose={() => setEmergencyModalOpen(false)}
          signal={emergencySignal}
          activePatient={activePatient}
          currentUser={user}
          onDispatch={() => {
            setEmergencyModalOpen(false);
            setCallModalOpen(true);
          }}
        />
        <CallCaregiverModal
          isOpen={callModalOpen}
          onClose={() => setCallModalOpen(false)}
          currentUser={user}
          activePatient={activePatient}
        />
        <ClinicalExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          vitalsData={vitals}
          currentUser={user}
          activePatient={activePatient}
        />
        <AddMedicationModal
          isOpen={addMedModalOpen}
          onClose={() => setAddMedModalOpen(false)}
          currentUser={user}
          activePatient={activePatient}
        />
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLogin={handleLogin}
        />
        <ResidentCheckinModal
          isOpen={checkinModalOpen}
          onClose={() => setCheckinModalOpen(false)}
          scenario={checkinScenario}
          activePatient={activePatient}
          onEmergencyConfirmed={() => {
            setVitals((prev) => ({ ...prev, bpSys: 178, hr: 124 }));
          }}
        />
        <ReviewEscalationModal
          isOpen={reviewEscalationModalOpen}
          onClose={() => setReviewEscalationModalOpen(false)}
          alert={selectedEscalationAlert || jumpAlert}
          vitals={vitals}
          activePatient={activePatient}
          currentUser={user}
          onsetTimestamp={escalationOnsetTimestamp}
          onAcknowledge={(alertId) => {
            handleAcknowledgeAlert(alertId);
            setJumpDismissed(true);
          }}
          onNavigateToAlerts={() => {
            setActiveTab("alerts");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Floating Mobile Jump-to-Alert Pill (visible when scrolled down on phone view while alert is active) */}
        {jumpAlert && !jumpDismissed && isScrolledDown && (
          <div className="fixed bottom-6 right-4 sm:right-6 z-50 animate-bounce flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedEscalationAlert(jumpAlert);
                setReviewEscalationModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-rose-600 text-white font-black text-xs shadow-2xl border-2 border-white hover:bg-rose-700 transition-all cursor-pointer ring-4 ring-rose-400/50"
              title="Review Active Escalation"
            >
              <span className="text-sm leading-none">🚨</span>
              <span>Review Escalation</span>
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  const anchor = document.getElementById("mobile-urgent-alert-anchor");
                  if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-lg border border-white hover:bg-slate-800 transition-all cursor-pointer"
              title="Jump to Top"
            >
              ⬆️
            </button>
          </div>
        )}

        {/* Clinical Software Compliance Footer */}
        <footer className="border-t border-slate-200/80 py-4 px-6 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Arohasetu Clinical Suite</span>
            <span>•</span>
            <span>Enterprise Telehealth &amp; Remote Patient Monitoring (RPM)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
            <span>Andaman &amp; Nicobar Islands (UT)</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">System Nominal</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
