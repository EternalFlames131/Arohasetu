// prototype/public/src/components/SensorDemoPanel.jsx
// Sensors & Wearables Judge-Demo Panel: hardware disconnect layering + manual smartwatch vital feed

const REJIVAN_DEMO_DEVICES = [
  { id: "ecg", name: "SanketLife 12-Lead ECG", role: "Heart Rhythm + HR Telemetry", feeds: ["hr"], icon: Heart },
  { id: "watch", name: "ReJivan Smartwatch", role: "HR + SpO2 (PPG) Wearable", feeds: ["hr", "spo2"], icon: Smartphone },
  { id: "bp", name: "Omron HEM-7156T", role: "Blood Pressure (NIBP Cuff)", feeds: ["bpSys", "bpDia"], icon: Activity },
  { id: "temp", name: "TempTraq Patch", role: "Continuous Core Temperature", feeds: ["temp"], icon: Thermometer },
  { id: "glu", name: "Accu-Chek Instant", role: "Capillary Blood Glucose", feeds: ["glucose"], icon: Droplets },
];

const DEMO_MANUAL_FIELDS = [
  { key: "hr", label: "Heart Rate", unit: "bpm", min: 30, max: 180, step: 1 },
  { key: "spo2", label: "SpO2", unit: "%", min: 70, max: 100, step: 0.1 },
  { key: "bpSys", label: "BP Systolic", unit: "mmHg", min: 60, max: 220, step: 1 },
  { key: "bpDia", label: "BP Diastolic", unit: "mmHg", min: 40, max: 140, step: 1 },
  { key: "temp", label: "Temperature", unit: "°C", min: 34, max: 41, step: 0.1 },
  { key: "glucose", label: "Glucose", unit: "mg/dL", min: 40, max: 320, step: 1 },
];

const DEMO_MANUAL_PRESETS = [
  { label: "Stable", value: { hr: 84, spo2: 97.5, bpSys: 128, bpDia: 82, temp: 36.9, glucose: 118 } },
  { label: "BP Crisis", value: { hr: 96, spo2: 96.8, bpSys: 176, bpDia: 108, temp: 37.1, glucose: 124 } },
  { label: "Hypoxemia", value: { hr: 112, spo2: 88.5, bpSys: 134, bpDia: 86, temp: 37.2, glucose: 120 } },
  { label: "Bradycardia", value: { hr: 46, spo2: 97.8, bpSys: 102, bpDia: 62, temp: 36.5, glucose: 104 } },
];

const SensorDemoPanel = ({ disconnectedDevices = {}, onToggleDevice, feedOverride, onPushReading, onClearFeed }) => {
  const [manual, setManual] = React.useState({ hr: 84, spo2: 97.5, bpSys: 128, bpDia: 82, temp: 36.9, glucose: 118 });

  const disconnectedCount = REJIVAN_DEMO_DEVICES.filter((d) => disconnectedDevices[d.id]).length;
  const feedActive = !!feedOverride;

  const setField = (key, value) => setManual((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Sensors &amp; Wearables — Live Judge Demo
            </h3>
            <p className="text-[11px] text-slate-500">
              Hardware disconnect layering + manual smartwatch vital feed (judge-facing controls)
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono hidden sm:inline">
          DEMO
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* --- Section 1: Wearable Disconnect Demo (Feature A) --- */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1 · Disconnect a Wearable → Watch the Layers
            </h4>
            <span className="text-[10px] font-mono text-slate-400">
              {disconnectedCount}/{REJIVAN_DEMO_DEVICES.length} offline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {REJIVAN_DEMO_DEVICES.map((dev) => {
              const Icon = dev.icon;
              const isOff = !!disconnectedDevices[dev.id];
              return (
                <div
                  key={dev.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isOff
                      ? "border-rose-300 bg-rose-50/50"
                      : "border-slate-200/80 bg-slate-50/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOff ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-700"}`}>
                        <Icon className={`w-4 h-4 ${isOff ? "text-rose-500" : "text-emerald-600"}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{dev.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{dev.role}</div>
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          Feeds: {dev.feeds.map((f) => f.toUpperCase()).join(" + ")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isOff
                        ? "bg-rose-100 text-rose-700 border border-rose-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOff ? "bg-rose-500" : "bg-emerald-500 animate-pulse"}`} />
                      <span>{isOff ? "Disconnected (Heartbeat Lost)" : "Connected & Streaming"}</span>
                    </span>
                    <button
                      onClick={() => onToggleDevice(dev.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                        isOff
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      }`}
                    >
                      {isOff ? "Reconnect" : "Disconnect"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* YOLO layering banner — the whole point of the demo */}
          <div
            className={`p-3 rounded-xl border text-[11px] leading-snug ${
              disconnectedCount > 0
                ? "bg-blue-50/80 border-blue-200 text-blue-900"
                : "bg-slate-50 border-slate-200/80 text-slate-600"
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-0.5">
              <span className={`w-2 h-2 rounded-full ${disconnectedCount > 0 ? "bg-blue-500 animate-ping" : "bg-emerald-500"}`} />
              <span>Edge Vision Layer (Camera / YOLO Contour Network)</span>
            </div>
            {disconnectedCount > 0 ? (
              <>
                <p className="opacity-90">
                  Exactly what happens at home: the wearable below lost its heartbeat, but the privacy-first overhead
                  camera is <strong>STILL ACTIVE</strong>. Fall, out-of-bed and low-activity alerts continue without
                  interruption. No single point of failure — vitals degrade gracefully while posture safety keeps
                  watching.
                </p>
                <p className="mt-1 font-mono text-[10px] text-blue-700">
                  → Check "Recent Alerts": severity raised to critical for the disconnected device.
                </p>
              </>
            ) : (
              <p className="opacity-80">
                All wearables healthy. Disconnect any device to see the reliability safeguards engage
                (sensor heartbeat watchdog #4 + graceful degradation #7).
              </p>
            )}
          </div>
        </div>

        {/* --- Section 2: Manual Smartwatch Vital Feed (Feature B) --- */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2 · Manual Smartwatch Vital Feed
            </h4>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              feedActive
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "bg-slate-100 text-slate-500 border border-slate-200"
            }`}>
              {feedActive ? "MANUAL FEED ACTIVE" : "AUTO HARDWARE STREAM"}
            </span>
          </div>

          {/* Smartwatch shell */}
          <div className={`p-3 rounded-2xl border-2 transition-all ${
            feedActive ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-slate-50/60"
          }`}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/70 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-emerald-300 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">ReJivan Smartwatch (PPG · BLE)</div>
                <div className="text-[10px] text-slate-500">
                  {feedActive
                    ? "Streaming manually-pushed readings — triage re-run per packet"
                    : "Idle — push a reading to feed vitals into the live telemetry stream"}
                </div>
              </div>
            </div>

            {/* One-tap presets */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {DEMO_MANUAL_PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setManual(p.value)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    p.label === "BP Crisis"
                      ? "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                      : p.label === "Hypoxemia"
                      ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      : p.label === "Bradycardia"
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                      : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Sliders */}
            <div className="space-y-2">
              {DEMO_MANUAL_FIELDS.map((f) => (
                <div key={f.key} className="flex items-center gap-2.5">
                  <span className="w-28 shrink-0 text-[11px] font-medium text-slate-600 truncate">{f.label}</span>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={manual[f.key]}
                    onChange={(e) => setField(f.key, Number(e.target.value))}
                    className="flex-1 min-w-0"
                  />
                  <span className="w-16 shrink-0 text-right text-xs font-mono font-bold text-slate-900 tabular-nums">
                    {manual[f.key]}
                    <span className="text-[10px] font-sans font-medium text-slate-400"> {f.unit}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => onPushReading(manual, "Manual Smartwatch Feed")}
                className="flex-1 px-3 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                Push Reading →
              </button>
              {feedActive && (
                <button
                  onClick={onClearFeed}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Clear (Auto again)
                </button>
              )}
            </div>
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60">
              <span className="text-[10px] text-slate-400">
                Pushed packets are evaluated by the clinical triage + escalation engine in real time.
              </span>
              <span className={`text-[10px] font-mono font-bold ${feedActive ? "text-emerald-600" : "text-slate-400"}`}>
                {feedActive ? "● LIVE FEED" : "○ AWAITING PUSH"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};