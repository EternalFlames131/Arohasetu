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
