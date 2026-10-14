// prototype/public/src/components/Modals.jsx
// Enterprise Clinical Modals (Call Caregiver, Clinical Export, Add Medication - Account Aware)

const CallCaregiverModal = ({ isOpen, onClose, currentUser, activePatient }) => {
  const [callingState, setCallingState] = React.useState(null);

  if (!isOpen) return null;

  const handleDial = (target) => {
    setCallingState(`Dialing ${target}... Voice telemetry link established.`);
    setTimeout(() => {
      setCallingState(`Connected to ${target}. Two-way intercom channel open.`);
    }, 1800);
  };

  const patientName = activePatient?.name || "Anita Sharma";
  const patientLocation = activePatient?.location || "Junglighat, Port Blair";
  const isNurse = currentUser?.role === "nurse" || currentUser?.email === "wardnurse@demo.in";
  const isRam = currentUser?.email === "rprakash@demo.in" || currentUser?.name?.includes("Prakash");

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Care Team &amp; Emergency Dispatch
              </h3>
              <p className="text-[11px] text-slate-400">
                Patient: {patientName} • {patientLocation.split("→")[1]?.trim() || patientLocation}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCallingState(null);
              onClose();
            }}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {callingState && (
          <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{callingState}</span>
          </div>
        )}

        <div className="my-4 space-y-2.5">
          {isNurse ? (
            <>
              <button
                onClick={() => handleDial(activePatient?.attendingDoc || "Attending Physician")}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    {activePatient?.attendingDoc || "Dr. A. Sen, MD (Cardiology)"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Assigned Attending Physician • On-Call Ext. 104
                  </div>
                </div>
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              </button>

              {activePatient?.primaryContact && (
                <button
                  onClick={() => handleDial(activePatient.primaryContact)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                      {activePatient.primaryContact}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Primary Family Contact • Bedside Emergency Authorized
                    </div>
                  </div>
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                </button>
              )}

              <button
                onClick={() => handleDial("Nurse Anjali (Shift B Handover Desk)")}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Nurse Anjali (Shift B Desk)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Ward A Station Intercom • Ext. 402
                  </div>
                </div>
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              </button>

              <button
                onClick={() => handleDial("Code Blue / ICU Outreach Team (Ext. 222)")}
                className="w-full text-left p-3 rounded-xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-rose-900">
                    Code Blue / ICU Resuscitation
                  </div>
                  <div className="text-[11px] text-rose-700">
                    Hospital Crash Team Speed Dial • Ext. 222
                  </div>
                </div>
                <Activity className="w-4 h-4 text-rose-600 shrink-0" />
              </button>
            </>
          ) : isRam ? (
            <>
              <button
                onClick={() => handleDial("Dr. K. Nair, MD (Endocrinology)")}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Dr. K. Nair, MD (Endocrinology)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Consulting Diabetologist • Telehealth Link
                  </div>
                </div>
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              </button>

              <button
                onClick={() => handleDial("Rajesh Prakash (Son)")}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Rajesh Prakash (Son)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Primary Family Caregiver • +91 94742 19203 (Hut Bay)
                  </div>
                </div>
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              </button>

              <button
                onClick={() => handleDial("Little Andaman PHC & Marine Ambulance (108)")}
                className="w-full text-left p-3 rounded-xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-rose-900">
                    Little Andaman 108 Marine Ambulance
                  </div>
                  <div className="text-[11px] text-rose-700">
                    Hut Bay Wharf Jetty Emergency Station
                  </div>
                </div>
                <Activity className="w-4 h-4 text-rose-600 shrink-0" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleDial("Dr. A. Sen (GB Pant Hospital)")}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Dr. A. Sen (GB Pant Hospital)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Primary Physician • Cardiology Referral
                  </div>
                </div>
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              </button>

              <button
                onClick={() => handleDial("Priya Sharma (Daughter)")}
                className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    Priya Sharma (Daughter)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Primary Family Caregiver • +91 94342 81101
                  </div>
                </div>
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
              </button>

              <button
                onClick={() => handleDial("108 / 112 Emergency Ambulance Dispatch")}
                className="w-full text-left p-3 rounded-xl border border-rose-200/80 bg-rose-50/40 hover:bg-rose-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-rose-900">
                    108 / 112 Emergency Dispatch
                  </div>
                  <div className="text-[11px] text-rose-700">
                    Direct Ambulance with GPS &amp; Vitals Packet
                  </div>
                </div>
                <Activity className="w-4 h-4 text-rose-600 shrink-0" />
              </button>
            </>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              setCallingState(null);
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ClinicalExportModal = ({ isOpen, onClose, vitalsData, currentUser, activePatient }) => {
  if (!isOpen) return null;

  const patient = activePatient || {
    id: "REJ-8042",
    name: "Anita Sharma",
    age: 67,
    gender: "Female",
    location: "Home → Living Room, Junglighat, Port Blair",
    condition: "Essential Hypertension / Post-Stroke Watch",
  };

  const handleDownload = () => {
    const reportData = {
      patient: patient.name,
      patientId: patient.id,
      age: patient.age,
      gender: patient.gender,
      location: patient.location,
      condition: patient.condition,
      exportedAt: new Date().toISOString(),
      vitals: vitalsData || {
        hr: 85,
        spo2: 97.7,
        bp: "149/97",
        temp: 37.0,
        glucose: 112,
      },
      auditTrailConfidence: "98% (High Clinical Confidence)",
      devices:
        patient.hardwareDevices?.map((d) => `${d.model} (${d.type})`) ||
        (patient.id === "REJ-9120" || patient.patientId === "REJ-9120"
          ? ["FreeStyle Libre 3 CGM", "Accu-Chek Instant", "Beurer BM 57 BP", "Cellular Gateway #AP-4109"]
          : patient.id === "WARD-STA-01" || patient.patientId === "WARD-STA-01"
          ? ["GB Pant Ward Gateway #GW-8042", "Philips IntelliVue MP50", "Masimo Rad-97"]
          : ["Omron HEM-7156T (BP Monitor)", "TempTraq Continuous (Temp Sensor)", "SanketLife 12-Lead (ECG)"]),
      compliance: "DPDP Act 2023 • Ayushman Bharat Digital Mission (ABDM) Compatible",
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${patient.name.replace(/\s+/g, "_")}_Clinical_Telemetry_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Clinical Telemetry Data Export
              </h3>
              <p className="text-[11px] text-slate-400">
                Standardized EHR / Telehealth Interoperability Format
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 space-y-3 text-xs text-slate-600">
          <p>
            Exporting a verifiable cryptographic summary of {patient.name}'s continuous telemetry, vital signs, medication adherence logs, and sensor diagnostics.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 space-y-1">
            <div>• Patient: {patient.name} (ID: {patient.id})</div>
            <div>• Location: {patient.location}</div>
            <div>• Vitals: HR {vitalsData?.hr || 85} bpm | SpO2 {vitalsData?.spo2 || 97.7}% | BP {vitalsData?.bpSys || 149}/{vitalsData?.bpDia || 97} mmHg</div>
            <div>• Compliance: DPDP Act 2023 • ABDM HL7/FHIR Ready</div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Developer-only emergency signal modal: fired when a vital-signs wearable loses its heartbeat.
// Informs the emergency escalation chain (caregiver -> backup -> 108/112 or ward Code Blue/MET).
const EmergencySignalModal = ({ isOpen, onClose, signal, activePatient, currentUser, onDispatch }) => {
  if (!isOpen || !signal) return null;

  const patientName = activePatient?.name || "Patient";
  const location = (activePatient?.location || "").split("→")[1]?.trim() || activePatient?.location || "—";
  const family = activePatient?.primaryContact || "Primary caregiver";
  const backup = activePatient?.backupPhone || "Backup contact";
  const hub = activePatient?.emergencyHub || "Emergency services (108 / 112)";
  const isNurse = currentUser?.role === "nurse" || currentUser?.email === "wardnurse@demo.in";

  const ladder = isNurse
    ? [
        { label: "Ward A Nurse Station", detail: "Bedside + station console alarm · Ext. 402", state: "notified" },
        { label: activePatient?.attendingDoc || "Attending Physician", detail: "On-call escalation · Ext. 104", state: "dialing" },
        { label: "Code Blue / MET Team", detail: "Hospital crash team standby · Ext. 222", state: "queued" },
      ]
    : [
        { label: family, detail: "Primary caregiver · SMS + voice call", state: "notified" },
        { label: backup, detail: "Backup contact · voice call", state: "dialing" },
        { label: hub, detail: "108 / 112 dispatch with GPS + last vitals packet", state: "queued" },
      ];

  const badge = (state) =>
    state === "notified"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : state === "dialing"
      ? "bg-amber-100 text-amber-800 border-amber-200"
      : "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="fixed inset-0 z-[60] bg-rose-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-rose-300 rounded-2xl p-6 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-start justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-rose-900 tracking-tight">
                  EMERGENCY SIGNAL — Vital Monitor Lost
                </h3>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              </div>
              <p className="text-[11px] text-slate-500">
                {patientName} • {location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            title="Dismiss (escalation continues in background)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 leading-snug">
          <div className="font-bold mb-1">
            Wearable disconnected: {signal.device}
          </div>
          <p className="opacity-90">
            Heartbeat lost for {signal.feeds.map((f) => f.toUpperCase()).join(" + ")} telemetry. The patient is now
            not being actively monitored on these vitals, so the system treats this as an emergency condition and
            initiates the emergency escalation chain below. The overhead YOLO / edge-vision camera keeps watching for
            falls, out-of-bed and low activity meanwhile.
          </p>
        </div>

        <div className="my-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Emergency Escalation Chain (auto-initiated)
          </div>
          <div className="space-y-2">
            {ladder.map((step, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    step.state === "notified" ? "bg-emerald-500 text-white" : step.state === "dialing" ? "bg-amber-500 text-white" : "bg-slate-300 text-white"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{step.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{step.detail}</div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${badge(step.state)}`}>
                  {step.state === "notified" ? "NOTIFIED" : step.state === "dialing" ? "DIALING…" : "QUEUED"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Acknowledge (keep alarm armed)
          </button>
          <button
            onClick={onDispatch}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Open Live Dispatch Console</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddMedicationModal = ({ isOpen, onClose, activePatient }) => {
  const [drugName, setDrugName] = React.useState("");
  const [dosage, setDosage] = React.useState("");
  const [times, setTimes] = React.useState("08:00 AM");
  const [success, setSuccess] = React.useState(false);

  if (!isOpen) return null;

  const patientName = activePatient?.name || "Anita Sharma";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Add Prescribed Medication
              </h3>
              <p className="text-[11px] text-slate-400">
                Patient: {patientName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-semibold text-emerald-800">
            Medication added successfully to active schedule for {patientName}.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="my-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Drug Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Metformin / Telmisartan"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 500 mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Scheduled Time
              </label>
              <input
                type="text"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
              >
                Save Medication
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Interactive Clinical Escalation Review & Emergency Dispatch Decision Modal
const ReviewEscalationModal = ({
  isOpen,
  onClose,
  alert,
  vitals = {},
  activePatient,
  currentUser,
  onsetTimestamp,
  onAcknowledge,
  onNavigateToAlerts,
}) => {
  const [decision, setDecision] = React.useState(null); // null | 'dispatched' | 'caregiver' | 'observation'
  const [observationSeconds, setObservationSeconds] = React.useState(30);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);

  // Live timer for elapsed deviation duration and observation countdown
  React.useEffect(() => {
    if (!isOpen) {
      setDecision(null);
      setObservationSeconds(30);
      return;
    }

    const interval = setInterval(() => {
      if (onsetTimestamp) {
        setElapsedSeconds(Math.max(1, Math.floor((Date.now() - onsetTimestamp) / 1000)));
      } else {
        setElapsedSeconds((prev) => prev + 1);
      }

      setObservationSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onsetTimestamp]);

  if (!isOpen) return null;

  const patientName = alert?.patientName || activePatient?.name || "Anita Sharma";
  const patientLocation = (activePatient?.location || "Living Room, Junglighat, Port Blair").split("→")[1]?.trim() || activePatient?.location || "Junglighat, Port Blair";
  const isNurse = currentUser?.role === "nurse" || currentUser?.email === "wardnurse@demo.in";

  // Determine anomaly details based on alert and current vitals
  let metricLabel = "Physiological Vitals";
  let abnormalReading = alert?.reading || "Abnormal Value";
  let baselineRange = "Normal Safe Range";
  let deviationDesc = "Physiological reading exceeded early warning threshold.";
  let clinicalRisk = "High (NEWS2 Score: 7)";

  const titleLower = (alert?.title || "").toLowerCase();
  const readingLower = (alert?.reading || "").toLowerCase();

  if (titleLower.includes("heart") || readingLower.includes("bpm") || alert?.vitalType === "hr") {
    metricLabel = "Heart Rate (Pulse)";
    abnormalReading = vitals.hr ? `${vitals.hr} bpm` : (alert?.reading || "130 bpm");
    baselineRange = "60 – 100 bpm";
    deviationDesc = "Acute sinus tachycardia sustained for >30 seconds. Elevated cardiac stress.";
    clinicalRisk = "High Risk (Tachycardia Score 3)";
  } else if (titleLower.includes("pressure") || readingLower.includes("mmhg") || alert?.vitalType === "bp" || alert?.vitalType === "bpSys") {
    metricLabel = "Blood Pressure (NIBP)";
    abnormalReading = vitals.bpSys ? `${vitals.bpSys}/${vitals.bpDia} mmHg` : (alert?.reading || "178/104 mmHg");
    baselineRange = "< 136 / < 86 mmHg";
    deviationDesc = "Stage 2 / Hypertensive Crisis threshold exceeded. Increased cerebrovascular risk.";
    clinicalRisk = "Urgent Risk (Hypertension Score 3)";
  } else if (titleLower.includes("oxygen") || titleLower.includes("spo2") || readingLower.includes("%") || alert?.vitalType === "spo2") {
    metricLabel = "Oxygen Saturation (SpO2)";
    abnormalReading = vitals.spo2 ? `${vitals.spo2}%` : (alert?.reading || "88%");
    baselineRange = "95% – 100%";
    deviationDesc = "Acute nocturnal hypoxemia. Immediate airway & oxygenation check recommended.";
    clinicalRisk = "Critical Risk (Hypoxia Score 3)";
  } else if (titleLower.includes("temp") || readingLower.includes("°c") || alert?.vitalType === "temp") {
    metricLabel = "Body Temperature";
    abnormalReading = vitals.temp ? `${vitals.temp} °C` : (alert?.reading || "39.2 °C");
    baselineRange = "36.3°C – 37.4°C";
    deviationDesc = "High pyrexia / hyperthermic spike. Infection/sepsis early warning triggered.";
    clinicalRisk = "Moderate-High Risk";
  } else if (titleLower.includes("fall")) {
    metricLabel = "Motion & Skeletal Posture";
    abnormalReading = "Impact + Post-Fall Immobility";
    baselineRange = "Upright / Stable";
    deviationDesc = "Bedside optical AI sentinel detected rapid vertical collapse followed by prolonged immobility.";
    clinicalRisk = "High Physical Trauma Risk";
  }

  const effectiveElapsed = elapsedSeconds > 0 ? elapsedSeconds : 48;
  const elapsedFormatted = effectiveElapsed >= 60
    ? `${Math.floor(effectiveElapsed / 60)}m ${effectiveElapsed % 60}s`
    : `${effectiveElapsed}s`;

  const onsetTimeStr = onsetTimestamp
    ? new Date(onsetTimestamp).toLocaleTimeString()
    : new Date(Date.now() - effectiveElapsed * 1000).toLocaleTimeString();

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border-2 border-rose-300 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl animate-in zoom-in-95 my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Clinical Escalation Review
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
                  Level 3 Escalation
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                Patient: <strong className="text-slate-800">{patientName}</strong> • {patientLocation}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Close review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. When the Escalation & Changes Began (Timeline & Onset Breakdown) */}
        <div className="mt-4 p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80">
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-rose-200/50">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
              <Clock className="w-4 h-4 text-rose-600" />
              <span>When Did Changes Begin?</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-rose-700 border border-rose-200 shadow-2xs">
              Onset: {onsetTimeStr} ({elapsedFormatted} ago)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2.5">
            <div className="bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Parameter</div>
              <div className="text-xs font-bold text-slate-900 truncate mt-0.5">{metricLabel}</div>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-rose-200 shadow-2xs">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-rose-500">Current Reading</div>
              <div className="text-sm font-black font-mono text-rose-700 truncate mt-0.5">{abnormalReading}</div>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-rose-100 shadow-2xs col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Baseline Target</div>
              <div className="text-xs font-semibold text-slate-700 truncate mt-0.5">{baselineRange}</div>
            </div>
          </div>

          <p className="text-xs text-rose-800 leading-relaxed mt-2.5 font-medium">
            <strong>Clinical Trigger:</strong> {deviationDesc} <span className="opacity-90">Overall Early Warning Score: <strong>{clinicalRisk}</strong>.</span>
          </p>
        </div>

        {/* 2. Emergency Services Decision Prompt: "Should the system call the emergency services or not?" */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-800">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Should Arohasetu dispatch Emergency Services (108 / 112)?
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            Autonomous decision support recommends emergency escalation for sustained vital deviations. Choose an immediate protocol action:
          </p>

          {/* Interactive Decision Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5">
            <button
              onClick={() => setDecision("dispatched")}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                decision === "dispatched"
                  ? "bg-rose-600 text-white border-rose-400 shadow-lg ring-2 ring-white/40"
                  : "bg-rose-950/60 border-rose-700/70 text-rose-100 hover:bg-rose-900/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center gap-1.5">
                  <span>🚨 YES — Dispatch 108/112</span>
                </span>
                {decision === "dispatched" && <span className="text-[10px] font-bold bg-white text-rose-700 px-1.5 py-0.2 rounded">CONFIRMED</span>}
              </div>
              <p className="text-[10px] text-rose-200 mt-1 opacity-90 leading-tight">
                Authorizes immediate ambulance dispatch with live GPS & vital telemetry packet to GB Pant Hospital.
              </p>
            </button>

            <button
              onClick={() => setDecision("caregiver")}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                decision === "caregiver"
                  ? "bg-blue-600 text-white border-blue-400 shadow-lg ring-2 ring-white/40"
                  : "bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-750"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs flex items-center gap-1.5">
                  <span>👨‍⚕️ NO — Notify Family Only</span>
                </span>
                {decision === "caregiver" && <span className="text-[10px] font-bold bg-white text-blue-700 px-1.5 py-0.2 rounded">NOTIFIED</span>}
              </div>
              <p className="text-[10px] text-slate-300 mt-1 opacity-90 leading-tight">
                Alerts primary caregiver Priya Sharma (+91 94342 81101) & clinician. Holds 108 ambulance on standby.
              </p>
            </button>
          </div>

          <div className="mt-2.5">
            <button
              onClick={() => setDecision("observation")}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                decision === "observation"
                  ? "bg-amber-500 text-slate-950 border-amber-300 font-bold"
                  : "bg-slate-800/80 text-amber-300 border-amber-500/30 hover:bg-slate-800"
              }`}
            >
              <span>⏱️ HOLD — 30-Second Active Observation Window</span>
              {decision === "observation" && <span>({observationSeconds}s left)</span>}
            </button>
          </div>
        </div>

        {/* 3. Real-Time Action Feedback Result */}
        {decision === "dispatched" && (
          <div className="mt-3.5 p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span>🚑 Emergency Ambulance Dispatched (Unit PB-04)</span>
            </div>
            <div className="mt-1 text-xs text-emerald-800 space-y-0.5">
              <p>• <strong>Destination:</strong> {patientLocation} (Referral: GB Pant Hospital Emergency)</p>
              <p>• <strong>Estimated Arrival (ETA):</strong> ~6 to 8 minutes</p>
              <p>• <strong>Telemetry:</strong> Real-time ECG, SpO2, and ABHA Health Record transmitted to 108 Dispatch Hub.</p>
            </div>
          </div>
        )}

        {decision === "caregiver" && (
          <div className="mt-3.5 p-3.5 bg-blue-50 border border-blue-300 rounded-2xl animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>📞 Family Caregiver & On-Call Clinician Notified</span>
            </div>
            <div className="mt-1 text-xs text-blue-800 space-y-0.5">
              <p>• <strong>Contact:</strong> Priya Sharma (+91 94342 81101) alerted via high-priority audio chime.</p>
              <p>• <strong>Protocol:</strong> Caregiver instructed to assess patient comfort and offer oral fluids.</p>
              <p>• <strong>Emergency 108 Services:</strong> Kept on active standby.</p>
            </div>
          </div>
        )}

        {decision === "observation" && (
          <div className="mt-3.5 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              <span>⏱️ Active 30-Second Observation Period Active ({observationSeconds}s remaining)</span>
            </div>
            <p className="mt-1 text-xs text-amber-800 leading-snug">
              Continuous 1 Hz telemetry monitoring is actively watching for vital sign stabilization. If values return to baseline, the alert will auto-clear.
            </p>
          </div>
        )}

        {/* 4. 3-Tier Emergency Call Ladder Status */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            3-Tier Emergency Call Ladder Status
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span className="font-semibold text-slate-800">Family Caregiver: Priya Sharma</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Connected · 2-way Link
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span className="font-semibold text-slate-800">Backup Physician: Dr. A. Sen (On-Call)</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                {decision === "caregiver" ? "Paging Active" : "Armed · Standby"}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold ${
                  decision === "dispatched" ? "bg-rose-600 animate-pulse" : "bg-slate-400"
                }`}>3</span>
                <span className="font-semibold text-slate-800">108 Emergency Ambulance (Port Blair)</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                decision === "dispatched"
                  ? "bg-rose-100 text-rose-800 border border-rose-300 font-black animate-pulse"
                  : "bg-slate-100 text-slate-600"
              }`}>
                {decision === "dispatched" ? "DISPATCHED (ETA 7m)" : "Armed (Standby)"}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <button
            onClick={() => {
              if (onNavigateToAlerts) onNavigateToAlerts();
              onClose();
            }}
            className="w-full sm:w-auto text-xs font-semibold text-blue-600 hover:text-blue-800 py-1.5 px-2 cursor-pointer flex items-center justify-center gap-1"
          >
            <span>View Complete Alerts Queue</span>
            <span>→</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onAcknowledge && alert?.id && (
              <button
                onClick={() => {
                  onAcknowledge(alert.id);
                  onClose();
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Acknowledge Alert
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

