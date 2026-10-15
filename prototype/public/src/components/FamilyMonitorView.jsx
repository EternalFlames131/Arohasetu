// Remote family view and Prajñā AI readings-grounded care assistant.
const FamilyMonitorView = ({ patient, vitals, alerts = [], connectivity, secondsAgo = 0, status = "normal", onViewAlerts }) => {
  const [question, setQuestion] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [isThinking, setIsThinking] = React.useState(false);
  const [geminiKey, setGeminiKey] = React.useState(() => {
    try {
      return localStorage.getItem("arohasetu_gemini_key") || "";
    } catch (e) {
      return "";
    }
  });
  const [showKeyInput, setShowKeyInput] = React.useState(false);

  const activeAlerts = alerts.filter((alert) => alert.status !== "Resolved");
  const groupedAlerts = Array.from(activeAlerts.reduce((groups, alert) => {
    const message = alert.conditionReason || alert.message || alert.title || "Patient alert";
    const key = `${alert.status || "Open"}:${alert.severity || "caution"}:${message}`;
    const existing = groups.get(key);
    if (existing) existing.count += 1;
    else groups.set(key, { ...alert, summary: message, count: 1 });
    return groups;
  }, new Map()).values());

  React.useEffect(() => {
    setMessages([{
      role: "assistant",
      text: `Hello! I am Prajñā, your AI care assistant connected to ${patient?.name || "the patient"}'s live physiological telemetry. I can provide real-time updates on their vitals, active alerts, and wellness status. What would you like to know?`,
    }]);
  }, [patient?.patientId, patient?.id]);

  const handleSaveGeminiKey = (newKey) => {
    const trimmed = newKey.trim();
    setGeminiKey(trimmed);
    try {
      if (trimmed) localStorage.setItem("arohasetu_gemini_key", trimmed);
      else localStorage.removeItem("arohasetu_gemini_key");
    } catch (e) {}
    setShowKeyInput(false);
  };

  const getVitalStatus = (key, val) => {
    if (val == null) return "offline";
    const num = Number(val);
    if (key === "hr") return (num < 55 || num > 115) ? "danger" : (num < 60 || num > 100) ? "caution" : "normal";
    if (key === "spo2") return num < 92 ? "danger" : num < 95 ? "caution" : "normal";
    if (key === "temp") return (num < 35.5 || num >= 38.2) ? "danger" : num >= 37.5 ? "caution" : "normal";
    if (key === "glucose") return (num < 70 || num > 180) ? "danger" : num > 140 ? "caution" : "normal";
    return "normal";
  };

  const getBpStatus = (sys, dia) => {
    if (sys == null || dia == null) return "offline";
    const s = Number(sys);
    const d = Number(dia);
    if (s >= 160 || d >= 100) return "danger";
    if (s >= 135 || d >= 85) return "caution";
    return "normal";
  };

  const readings = [
    { label: "Heart rate", value: vitals?.hr, unit: "bpm", status: getVitalStatus("hr", vitals?.hr) },
    { label: "Oxygen (SpO2)", value: vitals?.spo2, unit: "%", status: getVitalStatus("spo2", vitals?.spo2) },
    {
      label: "Blood pressure",
      value: vitals?.bpSys != null && vitals?.bpDia != null ? `${vitals.bpSys}/${vitals.bpDia}` : null,
      unit: "mmHg",
      status: getBpStatus(vitals?.bpSys, vitals?.bpDia),
    },
    { label: "Temperature", value: vitals?.temp, unit: "°C", status: getVitalStatus("temp", vitals?.temp) },
    { label: "Glucose", value: vitals?.glucose, unit: "mg/dL", status: getVitalStatus("glucose", vitals?.glucose) },
  ];

  const answerQuestion = async (rawQuestion) => {
    const q = rawQuestion.trim();
    if (!q || isThinking) return;

    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuestion("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          patient: {
            name: patient.name,
            patientId: patient.patientId || patient.id,
            condition: patient.condition,
            location: patient.location,
          },
          vitals,
          alerts: groupedAlerts,
          connectivity,
          secondsAgo,
          apiKey: geminiKey || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: data.reply || "Telemetry analysis complete.",
            source: data.source || "prajna",
          },
        ]);
      } else {
        throw new Error("Assistant service returned " + res.status);
      }
    } catch (err) {
      // Graceful offline fallback
      const urgent = status === "danger" || activeAlerts.some((a) => a.severity === "danger");
      let fallbackText = `${patient.name} is currently being monitored. Readings: HR ${vitals?.hr ?? "—"} bpm, SpO2 ${vitals?.spo2 ?? "—"}%, BP ${vitals?.bpSys ?? "—"}/${vitals?.bpDia ?? "—"} mmHg.`;
      if (urgent) {
        fallbackText += " A danger-level alert is active; please contact the clinical care team or 108/112 promptly.";
      } else {
        fallbackText += " All active readings are being evaluated against continuous clinical thresholds.";
      }
      setMessages((prev) => [...prev, { role: "assistant", text: fallbackText }]);
    } finally {
      setIsThinking(false);
    }
  };

  const statusLabel = status === "danger" ? "Needs prompt review" : status === "caution" ? "Review readings" : "No active warning";
  const connected = connectivity !== "interrupted" && secondsAgo <= 20;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* 1. REMOTE PATIENT SNAPSHOT CARD */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Family Remote Monitor · Real-Time</p>
            </div>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">{patient.name}</h2>
            <p className="mt-1 text-sm text-slate-600">{patient.location} · Patient ID {patient.patientId || patient.id}</p>
            <p className="mt-1 text-xs text-slate-500">Care focus: {patient.condition}</p>
          </div>
          <div className={`rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${connected ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
            <span className="mr-2">{connected ? "●" : "●"}</span>{connected ? "Remote feed connected" : "Connection interrupted · readings may be stale"}
            <div className="mt-1 text-xs font-normal">Last update: {secondsAgo === 0 ? "just now" : `${secondsAgo}s ago`}</div>
          </div>
        </div>

        <div className={`mt-5 rounded-xl p-3 text-sm font-semibold transition-colors ${status === "danger" ? "bg-rose-50 text-rose-800 border border-rose-200" : status === "caution" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-emerald-50 text-emerald-800 border border-emerald-200"}`}>
          Current monitoring status: {statusLabel}
          <span className="ml-2 text-xs font-normal">Synchronized live with the central clinical dashboard every 1.8 seconds.</span>
        </div>

        {/* 2. LIVE VITALS GRID */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {readings.map((item) => {
            const isDanger = item.status === "danger";
            const isCaution = item.status === "caution";
            const isOffline = item.status === "offline";

            return (
              <div
                key={item.label}
                className={`rounded-xl border p-3 transition-all ${
                  isDanger
                    ? "border-rose-300 bg-rose-50/70"
                    : isCaution
                    ? "border-amber-300 bg-amber-50/60"
                    : isOffline
                    ? "border-slate-200 bg-slate-100/80"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{item.label}</span>
                  {isOffline ? (
                    <span className="text-[9px] font-bold text-rose-600 bg-rose-100 px-1 py-0.2 rounded">OFFLINE</span>
                  ) : isDanger ? (
                    <span className="text-[9px] font-bold text-rose-700 bg-rose-100 px-1 py-0.2 rounded">CRITICAL</span>
                  ) : isCaution ? (
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1 py-0.2 rounded">ELEVATED</span>
                  ) : (
                    <span className="text-[9px] font-semibold text-emerald-700">NORMAL</span>
                  )}
                </div>
                <div className="mt-1 font-mono text-lg font-bold text-slate-900">
                  {item.value == null ? (
                    <span className="text-xs text-rose-700 font-sans font-semibold">No Signal (Offline)</span>
                  ) : (
                    <>
                      {item.value}
                      <span className="ml-1 text-xs font-medium text-slate-500 font-sans">{item.unit}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">Live synthetic physiological simulation (HSC 2027 Demonstration). Camera sentinel operates with strict privacy guarantees.</p>
      </section>

      {/* 3. RECENT PATIENT ALERTS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent patient alerts</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">What needs attention</h3>
          </div>
          {onViewAlerts && (
            <button onClick={onViewAlerts} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              Open alerts
            </button>
          )}
        </div>
        {groupedAlerts.length === 0 ? (
          <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 border border-emerald-100">
            No unresolved alerts are currently shown. All monitored thresholds are nominal.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {groupedAlerts.slice(0, 4).map((alert, index) => (
              <div
                key={alert.id || `${alert.createdAt}-${index}`}
                className={`rounded-xl border p-3 ${
                  alert.severity === "danger"
                    ? "border-rose-200 bg-rose-50/80 text-rose-950"
                    : "border-amber-200 bg-amber-50/70 text-amber-950"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-xs font-bold ${alert.severity === "danger" ? "text-rose-800" : "text-amber-800"}`}>
                    {alert.title || alert.summary}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-white/80 border border-slate-200 text-slate-700">
                    {alert.status || "Open"}
                  </span>
                </div>
                {alert.conditionReason && alert.conditionReason !== alert.summary && (
                  <p className="mt-1 text-xs text-slate-700 leading-snug">{alert.conditionReason}</p>
                )}
                {alert.count > 1 && <p className="mt-1 text-[10px] text-slate-500">Seen in {alert.count} recent checks</p>}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. PRAJÑĀ AI CLINICAL CARE ASSISTANT */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="border-b border-slate-100 p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">Prajñā AI Care Assistant</p>
              {geminiKey ? (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  ✨ Gemini 1.5 Powered
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  ⚡ Clinical NLP Engine
                </span>
              )}
            </div>
            <h3 className="mt-1 text-lg font-bold text-slate-900">Ask about {patient.name}&apos;s current health</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Grounded in live biometric telemetry, threshold alarms, and medication timing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            {geminiKey ? "⚙️ Gemini API Key (Configured)" : "⚙️ Add Gemini API Key"}
          </button>
        </div>

        {/* Optional Gemini Key Input Drawer */}
        {showKeyInput && (
          <div className="p-4 bg-purple-50/50 border-b border-purple-100 text-xs">
            <p className="font-semibold text-purple-900 mb-1">Optional: Connect Personal Google Gemini API Key</p>
            <p className="text-purple-700 mb-2">
              If left empty, Prajñā uses the built-in clinical intelligence engine. If entered, questions route directly to Gemini 1.5 Flash.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                defaultValue={geminiKey}
                id="geminiKeyInput"
                className="flex-1 px-3 py-1.5 rounded-lg border border-purple-200 bg-white font-mono text-xs outline-none focus:border-purple-500"
              />
              <button
                type="button"
                onClick={() => {
                  const val = document.getElementById("geminiKeyInput")?.value || "";
                  handleSaveGeminiKey(val);
                }}
                className="px-3 py-1.5 rounded-lg bg-purple-700 text-white font-bold text-xs hover:bg-purple-800"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Log */}
        <div className="max-h-88 min-h-48 space-y-3 overflow-y-auto bg-slate-50/60 p-4" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${index}-${message.role}`}
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed shadow-2xs ${
                message.role === "user"
                  ? "ml-auto bg-[#103663] text-white"
                  : "border border-slate-200 bg-white text-slate-800"
              }`}
            >
              <div className="mb-1 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider opacity-70">
                <span>{message.role === "user" ? "You" : "Prajñā Care Assistant"}</span>
                {message.source === "gemini" && <span>✨ Gemini</span>}
              </div>
              <div className="whitespace-pre-wrap">{message.text}</div>
            </div>
          ))}

          {isThinking && (
            <div className="max-w-[80%] rounded-xl px-4 py-3 text-sm border border-slate-200 bg-white text-slate-600 shadow-2xs">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-teal-700">Prajñā Care Assistant</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                <span className="text-xs font-medium text-slate-500">Analyzing live biometric telemetry &amp; trends...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex flex-col gap-2 border-t border-slate-100 p-4 sm:flex-row">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isThinking) answerQuestion(question);
            }}
            placeholder="Ask Prajñā: How are Anita's readings today? Any elevated vitals?"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            aria-label="Ask about the patient's current status"
            disabled={isThinking}
          />
          <button
            onClick={() => answerQuestion(question)}
            disabled={isThinking || !question.trim()}
            className="rounded-lg bg-[#103663] px-5 py-2 text-sm font-semibold text-white hover:bg-[#174b83] disabled:opacity-50 transition-colors shadow-xs"
          >
            {isThinking ? "Thinking..." : "Ask"}
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {[
            "Summarize the current situation",
            "Are there any active clinical alerts?",
            "How is the patient's blood pressure?",
            "Is the remote feed connected and healthy?",
          ].map((prompt) => (
            <button
              key={prompt}
              disabled={isThinking}
              onClick={() => answerQuestion(prompt)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-teal-500 hover:text-teal-800 transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
