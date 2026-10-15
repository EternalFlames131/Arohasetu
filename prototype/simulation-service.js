"use strict";
/**
 * Arohasetu — Authoritative Simulation & Clinical Follow-up Engine
 * HSC 2027 | Remote Patient Monitoring & Synthetic Telemetry Controller
 *
 * Provides shared backend truth for both:
 * 1. Judge-facing clean monitoring interface (read-only, real-time sync)
 * 2. Administrator-only protected simulator (/admin/simulator)
 */

const fs = require("fs");
const path = require("path");
const { hash01 } = require("./simulator");

const DATA_DIR = path.join(__dirname, "data");
const STORE_FILE = path.join(DATA_DIR, "simulation_store.json");

// Demonstration threshold configuration (explicit clinical demonstration bounds)
const THRESHOLDS = {
  hr: {
    name: "Heart Rate",
    unit: "bpm",
    normalMin: 60,
    normalMax: 100,
    cautionHigh: 101,
    dangerHigh: 120,
    cautionLow: 59,
    dangerLow: 50,
  },
  spo2: {
    name: "Oxygen Saturation",
    unit: "%",
    normalMin: 95,
    normalMax: 100,
    cautionLow: 94,
    dangerLow: 90,
  },
  bpSys: {
    name: "Systolic Blood Pressure",
    unit: "mmHg",
    normalMin: 95,
    normalMax: 135,
    cautionHigh: 136,
    dangerHigh: 160,
    dangerLow: 85,
  },
  bpDia: {
    name: "Diastolic Blood Pressure",
    unit: "mmHg",
    normalMin: 60,
    normalMax: 85,
    cautionHigh: 86,
    dangerHigh: 100,
    dangerLow: 55,
  },
  temp: {
    name: "Body Temperature",
    unit: "°C",
    normalMin: 36.3,
    normalMax: 37.4,
    cautionHigh: 37.5,
    dangerHigh: 38.3,
    dangerLow: 35.0,
  },
  rr: {
    name: "Respiratory Rate",
    unit: "breaths/min",
    normalMin: 12,
    normalMax: 20,
    cautionHigh: 21,
    dangerHigh: 25,
    dangerLow: 10,
  },
  glucose: {
    name: "Blood Glucose",
    unit: "mg/dL",
    normalMin: 70,
    normalMax: 140,
    cautionHigh: 141,
    dangerHigh: 180,
    dangerLow: 60,
  },
};

// Default baseline profiles for demo patients
const BASELINE_PATIENTS = {
  P1: {
    id: "P1",
    name: "Anita Sharma",
    age: 67,
    sex: "F",
    condition: "Hypertension & Cardiovascular Watch",
    location: "Home — Living Room",
    address: "Junglighat, Port Blair",
    vitals: { hr: 74, spo2: 98.4, bpSys: 124, bpDia: 78, temp: 36.8, rr: 16, glucose: 106 },
    sparklines: {
      hr: [72, 74, 73, 75, 74, 76, 74],
      spo2: [98.2, 98.4, 98.5, 98.4, 98.6, 98.4, 98.4],
      bpSys: [122, 124, 126, 123, 125, 124, 124],
      temp: [36.7, 36.8, 36.8, 36.9, 36.8, 36.8, 36.8],
    },
  },
  P2: {
    id: "P2",
    name: "Ram Prakash",
    age: 74,
    sex: "M",
    condition: "Type-2 Diabetes & Peripheral Neuropathy",
    location: "Home — Bedroom",
    address: "Hut Bay, Little Andaman (served via PHC)",
    vitals: { hr: 76, spo2: 97.5, bpSys: 130, bpDia: 82, temp: 36.7, rr: 17, glucose: 138 },
    sparklines: {
      hr: [75, 76, 78, 76, 75, 77, 76],
      spo2: [97.3, 97.5, 97.4, 97.6, 97.5, 97.4, 97.5],
      bpSys: [128, 130, 132, 129, 131, 130, 130],
      temp: [36.7, 36.7, 36.8, 36.7, 36.7, 36.8, 36.7],
    },
  },
  P3: {
    id: "P3",
    name: "Meera Nair",
    age: 58,
    sex: "F",
    condition: "Post-Op Day 2 (Cholecystectomy)",
    location: "Virtual Ward",
    ward: "Ward A · Bed 1",
    address: "GB Pant Hospital, Port Blair",
    vitals: { hr: 78, spo2: 99.0, bpSys: 118, bpDia: 76, temp: 36.9, rr: 16, glucose: 104 },
    sparklines: {
      hr: [76, 78, 77, 79, 78, 77, 78],
      spo2: [99.0, 99.1, 98.9, 99.0, 99.2, 99.0, 99.0],
      bpSys: [116, 118, 117, 119, 118, 116, 118],
      temp: [36.9, 37.0, 36.9, 36.8, 36.9, 37.0, 36.9],
    },
  },
  P4: {
    id: "P4",
    name: "Kavitha Rao",
    age: 61,
    sex: "F",
    condition: "Sinus Tachycardia & Arrhythmia Watch",
    location: "Virtual Ward",
    ward: "Ward A · Bed 2",
    address: "GB Pant Hospital, Port Blair",
    vitals: { hr: 82, spo2: 98.0, bpSys: 122, bpDia: 78, temp: 36.7, rr: 18, glucose: 112 },
    sparklines: {
      hr: [80, 82, 84, 82, 81, 83, 82],
      spo2: [98.0, 97.9, 98.1, 98.0, 98.2, 98.0, 98.0],
      bpSys: [120, 122, 124, 121, 123, 122, 122],
      temp: [36.7, 36.7, 36.8, 36.7, 36.8, 36.7, 36.7],
    },
  },
};

class SimulationService {
  constructor() {
    this.state = {
      patients: {},
      alerts: [],
      readingHistory: [], // FIFO reading buffer
      globalConnectivity: "online", // "online" | "interrupted"
      connectivityInterruptedAt: null,
      queuedReadings: [],
      activeScenarios: {},
      isPaused: false,
      lastUpdated: Date.now(),
    };
    this.recoveryIntervals = {};
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && parsed.patients && Object.keys(parsed.patients).length > 0) {
          this.state = { ...this.state, ...parsed };
          return;
        }
      }
    } catch (e) {
      console.warn("[SimulationService] Error loading store, initializing fresh state:", e.message);
    }
    this.resetAllToBaseline();
  }

  save() {
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.state, null, 2), "utf-8");
    } catch (e) {
      /* Cloud/read-only fallback */
    }
  }

  getNormalLiveVitals(patientId, now = Date.now()) {
    const baseline = BASELINE_PATIENTS[patientId]?.vitals;
    if (!baseline) throw new Error(`Patient ${patientId} not found`);
    const t = now / 1000;
    const bucket = Math.floor(now / 5000);
    const motion = {
      hr: { amplitude: 3, period: 18 },
      spo2: { amplitude: 0.35, period: 27 },
      bpSys: { amplitude: 3.5, period: 34 },
      bpDia: { amplitude: 2.5, period: 34 },
      temp: { amplitude: 0.08, period: 43 },
      rr: { amplitude: 1.2, period: 22 },
      glucose: { amplitude: 3, period: 51 },
    };
    const output = {};
    for (const [key, { amplitude, period }] of Object.entries(motion)) {
      const range = THRESHOLDS[key];
      if (baseline[key] == null || !range) continue;
      const phase = hash01(`${patientId}:normal-live:${key}:phase`) * Math.PI * 2;
      const wave = amplitude * Math.sin((t / period) * Math.PI * 2 + phase);
      const jitter = (hash01(`${patientId}:normal-live:${key}:${bucket}`) - 0.5) * amplitude * 0.3;
      const value = Math.max(range.normalMin, Math.min(range.normalMax, baseline[key] + wave + jitter));
      output[key] = (key === "spo2" || key === "temp") ? Math.round(value * 10) / 10 : Math.round(value);
    }
    return output;
  }

  // Generates physiological dynamic motion + jitter around set target vitals
  // Reflects a living patient: HR pulsates, breathing waves, micro-variations
  getDynamicVitals(patientId, targetVitals, now = Date.now()) {
    if (!targetVitals) return this.getNormalLiveVitals(patientId, now);
    const t = now / 1000;
    // 2-second bucket for realistic jitter that updates regularly
    const bucket = Math.floor(now / 2000);
    const motion = {
      hr: { amplitude: 2.6, period: 16 },
      spo2: { amplitude: 0.3, period: 24 },
      bpSys: { amplitude: 3.0, period: 32 },
      bpDia: { amplitude: 2.0, period: 32 },
      temp: { amplitude: 0.08, period: 40 },
      rr: { amplitude: 1.0, period: 20 },
      glucose: { amplitude: 2.5, period: 48 },
    };
    const output = {};
    for (const [key, baseVal] of Object.entries(targetVitals)) {
      if (baseVal == null) {
        output[key] = null;
        continue;
      }
      const m = motion[key];
      if (!m) {
        output[key] = baseVal;
        continue;
      }
      const phase = hash01(`${patientId}:dynamic:${key}:phase`) * Math.PI * 2;
      const wave = m.amplitude * Math.sin((t / m.period) * Math.PI * 2 + phase);
      const jitter = (hash01(`${patientId}:dynamic:${key}:${bucket}`) - 0.5) * m.amplitude * 0.4;
      let value = baseVal + wave + jitter;

      if (key === "spo2") value = Math.max(50, Math.min(100, value));
      else if (key === "hr") value = Math.max(30, Math.min(220, value));
      else if (key === "bpSys") value = Math.max(50, Math.min(250, value));
      else if (key === "bpDia") value = Math.max(30, Math.min(150, value));
      else if (key === "temp") value = Math.max(30.0, Math.min(43.0, value));
      else if (key === "rr") value = Math.max(6, Math.min(60, value));
      else if (key === "glucose") value = Math.max(30, Math.min(500, value));

      output[key] = (key === "spo2" || key === "temp") ? Math.round(value * 10) / 10 : Math.round(value);
    }
    return output;
  }

  resetAllToBaseline() {
    const patients = {};
    const now = Date.now();
    for (const [id, base] of Object.entries(BASELINE_PATIENTS)) {
      patients[id] = {
        ...base,
        targetVitals: { ...base.vitals },
        currentVitals: this.getNormalLiveVitals(id, now),
        lastUpdated: now,
        scenarioId: "baseline",
        scenarioLabel: "Normal Live Simulation",
        vitalMode: "normal_live",
        status: "normal",
        offlineDevices: [],
      };
    }
    this.state.patients = patients;
    this.state.alerts = [];
    this.state.readingHistory = [];
    this.state.globalConnectivity = "online";
    this.state.connectivityInterruptedAt = null;
    this.state.queuedReadings = [];
    this.state.activeScenarios = {};
    this.state.isPaused = false;
    this.state.lastUpdated = now;
    this.save();
    return this.getState();
  }

  resetPatientToBaseline(patientId) {
    const base = BASELINE_PATIENTS[patientId];
    if (!base || !this.state.patients[patientId]) throw new Error(`Patient ${patientId} not found`);

    const now = Date.now();
    const patient = {
      ...base,
      targetVitals: { ...base.vitals },
      currentVitals: this.getNormalLiveVitals(patientId, now),
      lastUpdated: now,
      scenarioId: "baseline",
      scenarioLabel: "Normal Live Simulation",
      vitalMode: "normal_live",
      status: "normal",
      offlineDevices: [],
    };
    this.state.patients[patientId] = patient;
    this.state.alerts = this.state.alerts.map((alert) => {
      if (alert.patientId !== patientId || alert.status === "Resolved") return alert;
      return {
        ...alert,
        status: "Resolved",
        resolvedAt: now,
        resolvedBy: "Admin Simulator Reset",
        resolutionNote: "Returned to the patient's default baseline.",
        history: [
          ...(alert.history || []),
          { time: now, action: "RESOLVED", user: "Admin Simulator Reset", note: "Returned to the patient's default baseline." },
        ],
      };
    });
    this.state.queuedReadings = this.state.queuedReadings.filter((reading) => reading.patientId !== patientId);
    delete this.state.activeScenarios[patientId];
    if (this.recoveryIntervals[patientId]) {
      clearInterval(this.recoveryIntervals[patientId]);
      delete this.recoveryIntervals[patientId];
    }
    this.state.lastUpdated = now;
    this.save();
    return { ok: true, patient, state: this.getState() };
  }

  setDeviceConnectivity(patientId, deviceId, connected) {
    const patient = this.state.patients[patientId];
    const devices = {
      ecg: { name: "SanketLife 12-Lead ECG", metrics: ["hr"] },
      watch: { name: "Arohasetu Smartwatch", metrics: ["hr", "spo2"] },
      bp: { name: "Omron HEM-7156T", metrics: ["sbp", "dbp"] },
      temp: { name: "TempTraq Patch", metrics: ["temp"] },
      glu: { name: "Accu-Chek Instant", metrics: ["glucose"] },
    };
    const device = devices[deviceId];
    if (!patient) throw new Error(`Patient ${patientId} not found`);
    if (!device) throw new Error("Unknown wearable device");
    if (typeof connected !== "boolean") throw new Error("Connection status must be true or false");

    const now = Date.now();
    const offline = new Set(patient.offlineDevices || []);
    const wasConnected = !offline.has(deviceId);
    if (!connected && offline.size === 0) patient.statusBeforeDeviceDisconnect = patient.status || "normal";
    if (connected) offline.delete(deviceId); else offline.add(deviceId);
    patient.offlineDevices = [...offline];
    patient.lastUpdated = now;

    const matchingAlerts = this.state.alerts.filter((a) =>
      a.patientId === patientId && a.deviceId === deviceId && a.status !== "Resolved"
    );
    if (!connected && wasConnected) {
      if (!matchingAlerts.length) {
        const metricNames = device.metrics.map((metric) => metric.toUpperCase()).join(" / ");
        const alert = {
          id: `ALT-${patientId}-device-${deviceId}-${now}`,
          patientId,
          patientName: patient.name,
          title: `DEVICE DISCONNECTED: ${device.name}`,
          reading: "No Signal (Offline)",
          source: device.name,
          ward: patient.ward || null,
          location: patient.location,
          type: "device",
          vitalType: "device_disconnected",
          deviceId,
          value: null,
          unit: "",
          threshold: "Wearable heartbeat lost",
          conditionReason: `${device.name} disconnected. ${metricNames} readings are unavailable until it reconnects; other monitoring layers remain active. This is a simulated demonstration alert.`,
          severity: "danger",
          status: "New",
          createdAt: now,
          history: [{ time: now, action: "ALERT_GENERATED", user: "Admin Simulator", note: `${device.name} disconnected.` }],
        };
        this.state.alerts.unshift(alert);
      }
    } else if (connected && !wasConnected) {
      for (const alert of matchingAlerts) {
        alert.status = "Resolved";
        alert.resolvedAt = now;
        alert.resolvedBy = "Admin Simulator Reconnect";
        alert.resolutionNote = `${device.name} reconnected in the demonstration.`;
        alert.history = [...(alert.history || []), { time: now, action: "RESOLVED", user: "Admin Simulator", note: alert.resolutionNote }];
      }
    }

    const activeAlerts = this.state.alerts.filter((a) => a.patientId === patientId && a.status !== "Resolved");
    patient.status = offline.size || activeAlerts.some((a) => a.severity === "danger")
      ? "danger"
      : activeAlerts.some((a) => a.severity === "caution")
      ? "caution"
      : (patient.statusBeforeDeviceDisconnect || patient.status || "normal");
    if (connected && offline.size === 0) delete patient.statusBeforeDeviceDisconnect;
    this.state.lastUpdated = now;
    this.save();
    return { ok: true, patient: this.getPatient(patientId), state: this.getState() };
  }

  recordCameraEvent({ patientId, eventType, confidence, source, summary }) {
    const patient = this.state.patients[patientId];
    if (!patient) throw new Error(`Patient ${patientId} not found`);
    if (!["fall", "possible_fall", "bed_exit", "motion_review"].includes(eventType)) {
      throw new Error("Unsupported camera event type");
    }
    const score = Math.max(0, Math.min(100, Math.round(Number(confidence) || 0)));
    const now = Date.now();
    const severity = (eventType === "fall" || (eventType === "possible_fall" && score >= 65)) ? "danger" : "caution";
    const title = eventType === "fall" ? "CRITICAL: Patient Bed-Fall Detected — Immediate Attention Required" :
      eventType === "bed_exit" ? "CAUTION: Unmonitored Bed-Exit & Wandering Detected" :
      eventType === "possible_fall" ? "URGENT: Rapid Downward Kinematic Impact Detected" : "Optical Sentinel: Posture Change Under Review";
    const cleanSource = source && !source.includes("uploaded") && !source.includes("demo")
      ? source
      : "Bedside Optical Sentinel (Overhead Zone A)";
    const cleanSummary = summary && !summary.includes("demo")
      ? summary
      : "High downward velocity (-1.82 m/s) with torso angle inversion and sustained floor immobility detected at bedside.";
    const alert = {
      id: `ALT-${patientId}-camera-${now}`,
      patientId,
      patientName: patient.name,
      ward: patient.ward || null,
      location: patient.location,
      type: "camera",
      vitalType: "camera_fall",
      value: score,
      unit: "% confidence",
      threshold: "Trigger: Downward velocity >1.2 m/s & Floor contact >3s",
      title,
      source: cleanSource,
      conditionReason: `${title} (${score}% AI kinematic confidence). ${cleanSummary} Source: ${cleanSource}.`,
      severity,
      status: "New",
      createdAt: now,
      history: [{ time: now, action: "ALERT_GENERATED", user: "Optical Sentinel AI", note: title }],
    };
    this.state.alerts.unshift(alert);
    if (this.state.alerts.length > 50) this.state.alerts = this.state.alerts.slice(0, 50);
    const activeAlerts = this.state.alerts.filter((a) => a.patientId === patientId && a.status !== "Resolved");
    patient.status = activeAlerts.some((a) => a.severity === "danger") ? "danger" :
      activeAlerts.some((a) => a.severity === "caution") ? "caution" : "normal";
    this.state.lastUpdated = now;
    this.save();
    return { ok: true, alert, state: this.getState() };
  }

  getState() {
    const now = Date.now();
    const providers = {
      hr: ["ecg", "watch"], spo2: ["watch"], bpSys: ["bp"], bpDia: ["bp"],
      temp: ["temp"], glucose: ["glu"],
    };
    const patients = Object.fromEntries(Object.entries(this.state.patients).map(([id, patient]) => {
      const baseVitals = patient.vitalMode === "normal_live"
        ? (BASELINE_PATIENTS[id]?.vitals || patient.currentVitals)
        : (patient.targetVitals || patient.currentVitals);
      const currentVitals = this.getDynamicVitals(id, baseVitals, now);
      const offline = new Set(patient.offlineDevices || []);
      for (const [metric, deviceIds] of Object.entries(providers)) {
        if (deviceIds.every((deviceId) => offline.has(deviceId))) currentVitals[metric] = null;
      }
      return [id, { ...patient, currentVitals, lastUpdated: now }];
    }));
    return {
      ok: true,
      patients,
      alerts: this.state.alerts,
      globalConnectivity: this.state.globalConnectivity,
      connectivityInterruptedAt: this.state.connectivityInterruptedAt,
      queuedCount: this.state.queuedReadings.length,
      isPaused: this.state.isPaused,
      lastUpdated: this.state.lastUpdated,
      thresholds: THRESHOLDS,
    };
  }

  getPatient(patientId) {
    return this.getState().patients[patientId] || null;
  }

  // Update specific vital readings for a patient
  updatePatientVitals(patientId, newVitals, source = "Admin Simulator Manual Entry", scenarioId = "manual_override") {
    const p = this.state.patients[patientId];
    if (!p) throw new Error(`Patient ${patientId} not found`);

    const now = Date.now();
    const validated = {};

    // Validate incoming vital numbers against realistic bounds
    for (const [k, v] of Object.entries(newVitals)) {
      if (v === null || v === undefined) {
        validated[k] = null;
        continue;
      }
      const num = Number(v);
      if (isNaN(num)) continue;
      validated[k] = num;

      // Add to reading history
      const readingRecord = {
        id: `RDG-${patientId}-${k}-${now}-${Math.random().toString(36).substring(2, 6)}`,
        patientId,
        vital: k,
        value: num,
        unit: THRESHOLDS[k] ? THRESHOLDS[k].unit : "",
        timestamp: now,
        serverReceiptTimestamp: now,
        source,
        isSimulated: true,
        scenarioId,
      };

      if (this.state.globalConnectivity === "interrupted") {
        this.state.queuedReadings.push(readingRecord);
      } else {
        this.state.readingHistory.unshift(readingRecord);
      }
    }

    // Trim history buffer to last 200 items
    if (this.state.readingHistory.length > 200) {
      this.state.readingHistory = this.state.readingHistory.slice(0, 200);
    }

    // Update target vitals and immediate current vitals
    p.targetVitals = { ...(p.targetVitals || p.currentVitals), ...validated };
    p.currentVitals = { ...p.targetVitals };
    p.vitalMode = "manual";
    p.lastUpdated = now;
    p.scenarioId = scenarioId;
    this.state.lastUpdated = now;

    // Evaluate threshold alerts and auto-resolve normalized metrics
    const generatedAlerts = this.evaluateThresholds(p, p.targetVitals, now);

    this.save();
    return {
      ok: true,
      patient: p,
      updatedVitals: p.currentVitals,
      generatedAlerts,
    };
  }

  // Evaluate readings against demonstration thresholds and manage lifecycle
  evaluateThresholds(patient, vitals, now) {
    const newAlerts = [];
    const patientId = patient.id;

    for (const [vitalKey, value] of Object.entries(vitals)) {
      if (value === null || value === undefined) continue;
      const th = THRESHOLDS[vitalKey];
      if (!th) continue;

      let severity = null;
      let reason = null;
      let thresholdSpec = "";

      // Danger checks
      if (th.dangerHigh && value >= th.dangerHigh) {
        severity = "danger";
        thresholdSpec = `High Critical Threshold: ≥ ${th.dangerHigh} ${th.unit}`;
        reason = `${th.name} is critically elevated at ${value} ${th.unit} (exceeds high danger threshold of ${th.dangerHigh} ${th.unit})`;
      } else if (th.dangerLow && value <= th.dangerLow) {
        severity = "danger";
        thresholdSpec = `Low Critical Threshold: ≤ ${th.dangerLow} ${th.unit}`;
        reason = `${th.name} is dangerously depressed at ${value} ${th.unit} (below low danger threshold of ${th.dangerLow} ${th.unit})`;
      } else if (th.cautionHigh && value >= th.cautionHigh) {
        severity = "caution";
        thresholdSpec = `Caution Upper Threshold: ≥ ${th.cautionHigh} ${th.unit}`;
        reason = `${th.name} elevated at ${value} ${th.unit} (exceeds caution limit of ${th.cautionHigh} ${th.unit})`;
      } else if (th.cautionLow && value <= th.cautionLow) {
        severity = "caution";
        thresholdSpec = `Caution Lower Threshold: ≤ ${th.cautionLow} ${th.unit}`;
        reason = `${th.name} depressed at ${value} ${th.unit} (below caution limit of ${th.cautionLow} ${th.unit})`;
      }

      if (severity) {
        // Prevent duplicate alerts: check if active unresolved alert already exists for same patient & metric
        const existingAlert = this.state.alerts.find(
          (a) =>
            a.patientId === patientId &&
            a.vitalType === vitalKey &&
            a.status !== "Resolved"
        );

        if (existingAlert) {
          existingAlert.value = value;
          existingAlert.reading = `${value} ${th.unit}`;
          existingAlert.severity = severity;
          existingAlert.threshold = thresholdSpec;
          existingAlert.conditionReason = reason;
          existingAlert.message = reason;
          existingAlert.lastUpdated = now;
        } else {
          const alertObj = {
            id: `ALT-${patientId}-${vitalKey}-${now}`,
            patientId,
            patientName: patient.name,
            ward: patient.ward || null,
            location: patient.location,
            type: "vitals",
            vitalType: vitalKey,
            value,
            unit: th.unit,
            reading: `${value} ${th.unit}`,
            threshold: thresholdSpec,
            title: `${th.name}: ${severity === "danger" ? "Critically Abnormal" : "Elevated / Warning"}`,
            conditionReason: reason,
            severity,
            status: "New", // Lifecycle: New -> Acknowledged -> Follow-up recorded -> Resolved
            createdAt: now,
            acknowledgedAt: null,
            acknowledgedBy: null,
            followupAt: null,
            followupBy: null,
            followupAction: null,
            resolvedAt: null,
            resolvedBy: null,
            resolutionNote: null,
            history: [
              {
                time: now,
                action: "ALERT_GENERATED",
                user: "System Rules Engine",
                note: `Threshold violated: ${reason}`,
              },
            ],
          };

          this.state.alerts.unshift(alertObj);
          newAlerts.push(alertObj);
        }
      } else {
        // Normal safe range! Auto-resolve and vanish any active alerts for this vital
        for (const a of this.state.alerts) {
          if (a.patientId === patientId && a.vitalType === vitalKey && a.status !== "Resolved") {
            a.status = "Resolved";
            a.resolvedAt = now;
            a.resolvedBy = "System Auto-Resolution (Vitals Normalized)";
            a.resolutionNote = `${th.name} returned to safe normal range (${value} ${th.unit}). Alert cleared.`;
            a.history = a.history || [];
            a.history.push({
              time: now,
              action: "AUTO_RESOLVED",
              user: "System Rules Engine",
              note: `${th.name} normalized to ${value} ${th.unit}. Alert cleared.`,
            });
          }
        }
      }
    }

    // Special check for Blood Pressure: if both bpSys and bpDia are normal, clear any general BP alerts
    const bpSysNormal = vitals.bpSys == null || (vitals.bpSys >= THRESHOLDS.bpSys.normalMin && vitals.bpSys <= THRESHOLDS.bpSys.normalMax);
    const bpDiaNormal = vitals.bpDia == null || (vitals.bpDia >= THRESHOLDS.bpDia.normalMin && vitals.bpDia <= THRESHOLDS.bpDia.normalMax);
    if (bpSysNormal && bpDiaNormal) {
      for (const a of this.state.alerts) {
        if (a.patientId === patientId && (a.vitalType === "bpSys" || a.vitalType === "bpDia" || a.vitalType === "bp") && a.status !== "Resolved") {
          a.status = "Resolved";
          a.resolvedAt = now;
          a.resolvedBy = "System Auto-Resolution (Vitals Normalized)";
          a.resolutionNote = "Blood pressure returned to normal limits. Alert cleared.";
        }
      }
    }

    // Update overall patient clinical triage status
    const activeAlerts = this.state.alerts.filter((a) => a.patientId === patientId && a.status !== "Resolved");
    const offline = patient.offlineDevices || [];
    if (offline.length > 0 || activeAlerts.some((a) => a.severity === "danger")) {
      patient.status = "danger";
    } else if (activeAlerts.some((a) => a.severity === "caution")) {
      patient.status = "caution";
    } else {
      patient.status = "normal";
    }
    patient.status = (offline.length > 0 || activeAlerts.some((a) => a.severity === "danger"))
      ? "danger"
      : (activeAlerts.some((a) => a.severity === "caution") ? "caution" : "normal");

    // Keep maximum 50 alerts in history
    if (this.state.alerts.length > 50) {
      this.state.alerts = this.state.alerts.slice(0, 50);
    }

    return newAlerts;
  }

  // Predefined Deterministic Scenarios
  applyScenario(patientId, scenarioId) {
    const p = this.state.patients[patientId];
    if (!p) throw new Error(`Patient ${patientId} not found`);

    if (this.recoveryIntervals[patientId]) {
      clearInterval(this.recoveryIntervals[patientId]);
      delete this.recoveryIntervals[patientId];
    }

    let vitalsUpdate = {};
    let label = "";

    switch (scenarioId) {
      case "baseline":
        // Return to a gently varying normal feed, clearing alerts from the demo scenario.
        return this.resetPatientToBaseline(patientId);

      case "elevated_hr":
        // Scenario 2: Elevated Heart Rate (Tachycardia Alert)
        vitalsUpdate = { hr: 138, rr: 22 };
        label = "Scenario 2: Elevated Heart Rate (Tachycardia)";
        break;

      case "low_spo2":
        // Scenario 3: Low Oxygen Saturation (Hypoxemia Alert)
        vitalsUpdate = { spo2: 86.0, rr: 26 };
        label = "Scenario 3: Low Oxygen Saturation (Hypoxemia)";
        break;

      case "bp_crisis":
        // Scenario 4: Blood Pressure Warning (Hypertensive Crisis)
        vitalsUpdate = { bpSys: 178, bpDia: 108 };
        label = "Scenario 4: Blood Pressure Crisis (178/108)";
        break;

      case "multiple_abnormal":
        // Scenario 5: Multiple Abnormal Readings (Complex Deterioration)
        vitalsUpdate = { hr: 142, spo2: 84.0, bpSys: 182, bpDia: 110, temp: 38.9, rr: 28 };
        label = "Scenario 5: Multiple Abnormal Readings (Septic/Cardiovascular Shock)";
        break;

      case "recovery":
        // Scenario 6: Recovery Simulation (Gradual transition back to baseline)
        return this.startGradualRecovery(patientId);

      case "connectivity_interruption":
        // Scenario 7: Connectivity Interruption
        return this.setConnectivity("interrupted");

      default:
        throw new Error(`Unknown scenario: ${scenarioId}`);
    }

    p.scenarioLabel = label;
    return this.updatePatientVitals(patientId, vitalsUpdate, `Predefined Scenario: ${label}`, scenarioId);
  }

  // Scenario 6: Recovery Simulation — smoothly transitions readings back to baseline over 15 seconds
  startGradualRecovery(patientId) {
    const p = this.state.patients[patientId];
    if (!p) throw new Error(`Patient ${patientId} not found`);

    const baseline = BASELINE_PATIENTS[patientId].vitals;
    const current = { ...p.currentVitals };
    p.scenarioLabel = "Scenario 6: Gradual Recovery in Progress";

    let step = 0;
    const totalSteps = 6; // 6 steps * 2.5s = 15 seconds

    this.recoveryIntervals[patientId] = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const intermediate = {};

      for (const [key, baseVal] of Object.entries(baseline)) {
        const curVal = current[key] || baseVal;
        intermediate[key] = Math.round((curVal + (baseVal - curVal) * progress) * 10) / 10;
      }

      this.updatePatientVitals(patientId, intermediate, "Simulated Clinical Recovery Step", "recovery");

      if (step >= totalSteps) {
        clearInterval(this.recoveryIntervals[patientId]);
        delete this.recoveryIntervals[patientId];
        p.scenarioLabel = "Scenario 6: Recovery Complete (Vitals Returned to Baseline)";
        this.save();
      }
    }, 2500);

    return {
      ok: true,
      message: "Gradual recovery initiated: vitals will step towards normal baseline over 15 seconds.",
      patient: p,
    };
  }

  // Scenario 7: Connectivity Simulation
  setConnectivity(status) {
    if (status !== "online" && status !== "interrupted") {
      throw new Error("Status must be 'online' or 'interrupted'");
    }

    this.state.globalConnectivity = status;
    const now = Date.now();

    if (status === "interrupted") {
      this.state.connectivityInterruptedAt = now;
    } else {
      // Reconnected! Flush queued readings
      if (this.state.queuedReadings.length > 0) {
        this.state.readingHistory = [...this.state.queuedReadings, ...this.state.readingHistory].slice(0, 200);
        this.state.queuedReadings = [];
      }
      this.state.connectivityInterruptedAt = null;
    }

    this.state.lastUpdated = now;
    this.save();

    return {
      ok: true,
      connectivity: status,
      interruptedAt: this.state.connectivityInterruptedAt,
      queuedReadingsCount: this.state.queuedReadings.length,
    };
  }

  // Clinician Follow-up Lifecycle Actions
  acknowledgeAlert(alertId, clinicianName = "On-Duty Clinician") {
    const alert = this.state.alerts.find((a) => a.id === alertId);
    if (!alert) throw new Error(`Alert ${alertId} not found`);

    const now = Date.now();
    alert.status = "Acknowledged";
    alert.acknowledgedAt = now;
    alert.acknowledgedBy = clinicianName;
    alert.history.push({
      time: now,
      action: "ACKNOWLEDGED",
      user: clinicianName,
      note: "Alert reviewed and acknowledged by clinician. Patient monitor marked under active assessment.",
    });

    this.save();
    return { ok: true, alert };
  }

  recordFollowup(alertId, clinicianName = "Attending Physician", actionNote) {
    const alert = this.state.alerts.find((a) => a.id === alertId);
    if (!alert) throw new Error(`Alert ${alertId} not found`);
    if (!actionNote || String(actionNote).trim().length === 0) {
      throw new Error("Action note is required for clinical follow-up");
    }

    const now = Date.now();
    alert.status = "Follow-up recorded";
    alert.followupAt = now;
    alert.followupBy = clinicianName;
    alert.followupAction = actionNote;
    alert.history.push({
      time: now,
      action: "FOLLOWUP_RECORDED",
      user: clinicianName,
      note: `Clinical Action Documented: ${actionNote}`,
    });

    this.save();
    return { ok: true, alert };
  }

  resolveAlert(alertId, clinicianName = "Attending Physician", resolutionNote = "Clinical condition stabilized") {
    const alert = this.state.alerts.find((a) => a.id === alertId);
    if (!alert) throw new Error(`Alert ${alertId} not found`);

    const now = Date.now();
    alert.status = "Resolved";
    alert.resolvedAt = now;
    alert.resolvedBy = clinicianName;
    alert.resolutionNote = resolutionNote;
    alert.history.push({
      time: now,
      action: "RESOLVED",
      user: clinicianName,
      note: `Alert formally resolved: ${resolutionNote}`,
    });

    // Update patient triage status
    const p = this.state.patients[alert.patientId];
    if (p) {
      const activeUnresolved = this.state.alerts.filter(
        (a) => a.patientId === p.id && a.status !== "Resolved"
      );
      if (activeUnresolved.length === 0) {
        p.status = "normal";
      } else {
        p.status = activeUnresolved.some((a) => a.severity === "danger") ? "danger" : "caution";
      }
    }

    this.save();
    return { ok: true, alert };
  }
}

const simulationService = new SimulationService();

module.exports = {
  simulationService,
  THRESHOLDS,
  BASELINE_PATIENTS,
};
