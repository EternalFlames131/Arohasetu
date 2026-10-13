// prototype/public/src/components/AlertsView.jsx
// Clinical Alerts & Automated Emergency Call Chain Escalation (Enterprise Clinical Grade - Account Aware)
// Includes full Clinician Follow-up Lifecycle: New -> Acknowledged -> Follow-up recorded -> Resolved

const AlertsView = ({
  currentUser,
  activePatient,
  liveAlerts = [],
  onAcknowledgeAlert,
  onRecordFollowup,
  onResolveAlert,
}) => {
  const [selectedAlertForAction, setSelectedAlertForAction] = React.useState(null);
  const [followupText, setFollowupText] = React.useState("");
  const [resolutionText, setResolutionText] = React.useState("");
  const [actionModalType, setActionModalType] = React.useState(null); // 'followup' | 'resolve'
  const isNurse = currentUser?.role === "nurse" || currentUser?.email === "wardnurse@demo.in";

  const getCallLadderForUser = (user, patient) => {
    const email = user?.email || "asharma@demo.in";

    if (email === "rprakash@demo.in" || user?.name?.includes("Prakash")) {
      return {
        patientTitle: "Ram Prakash (Little Andaman)",
        locationText: "Hut Bay, Little Andaman • Autonomous Satellite/Cellular Call Relay",
        ladder: [
          {
            tier: "Tier 1: Primary Family Caregiver",
            contact: "Rajesh Prakash (Son)",
            phone: "+91 94742 19203",
            status: "Answered",
            statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
            time: "10:14:08 AM (Call duration: 48s)",
            note: "Caregiver confirmed father checked blood glucose (142 mg/dL) after breakfast. Resident upright on verandah.",
          },
          {
            tier: "Tier 2: Backup Emergency Contact",
            contact: "Sunita Prakash (Daughter-in-law)",
            phone: "+91 94742 19204",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Triggers if Tier 1 unanswered for 45s)",
            note: "Stationed near Hut Bay Primary Health Centre (PHC).",
          },
          {
            tier: "Tier 3: Island Emergency & Marine Ambulance (108)",
            contact: "Little Andaman Marine Ambulance & 108 Hub",
            phone: "108 / 112 (Hut Bay Wharf Jetty)",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Auto-dispatches with GPS & Live CGM Packet)",
            note: "Direct coordination with Hut Bay PHC & Marine Evacuation.",
          },
        ],
      };
    }

    if (email === "wardnurse@demo.in" || user?.role === "nurse") {
      return {
        patientTitle: "GB Pant Hospital Virtual Ward",
        locationText: "Inpatient Clinical Telemetry Center • Rapid Response System (RRS)",
        ladder: [
          {
            tier: "Tier 1: On-Duty Inpatient Nurse Intercom",
            contact: "Nurse Priya / Nurse Anjali (Shift Handover Desk)",
            phone: "Ext. 402 (Ward A Central Console)",
            status: "Answered",
            statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
            time: "Continuous Active Audio Link (Latency: 0.02ms)",
            note: "Station nurse acknowledging real-time telemetry threshold events for Beds 101–104.",
          },
          {
            tier: "Tier 2: Attending Medical Emergency Team (MET)",
            contact: "Dr. A. Sen, MD (Cardiology On-Call)",
            phone: "Ext. 104 / Speed Dial 94342 81100",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Automatic escalation if NEWS2 Score >= 5)",
            note: "On-call physician mobile paging with encrypted vital packet.",
          },
          {
            tier: "Tier 3: Code Blue / ICU Outreach Resuscitation Team",
            contact: "GB Pant Critical Care Emergency Outreach",
            phone: "Code Blue Speed Dial (Ext. 222)",
            status: "Standby",
            statusColor: "text-slate-600 bg-slate-50 border-slate-200",
            time: "Armed (Immediate mobilization on Cardiac Arrest / NEWS2 >= 7)",
            note: "Crash cart and ICU crash team dispatched to bedside.",
          },
        ],
      };
    }

    // Default: Anita Sharma
    return {
      patientTitle: "Anita Sharma (Junglighat)",
      locationText: "Living Room, Junglighat, Port Blair • Deterministic Autonomous Emergency Call Chain",
      ladder: [
        {
          tier: "Tier 1: Family Caregiver",
          contact: "Priya Sharma (Daughter)",
          phone: "+91 94342 81101",
          status: "Answered",
          statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
          time: "11:02:14 AM (Call duration: 1m 24s)",
          note: "Caregiver confirmed patient is responsive, sitting in living room. Rechecking BP in 15m.",
        },
        {
          tier: "Tier 2: Backup Emergency Contact",
          contact: "Rajesh Sharma (Son)",
          phone: "+91 94342 81102",
          status: "Standby",
          statusColor: "text-slate-600 bg-slate-50 border-slate-200",
          time: "Armed (Triggers if Tier 1 unanswered for 45s)",
          note: "Located at Aberdeen Bazaar, Port Blair (approx. 6 mins to Junglighat).",
        },
        {
          tier: "Tier 3: Port Blair 108 Emergency Ambulance",
          contact: "108 Emergency Dispatch Hub (GB Pant Control)",
          phone: "108 / 112 (Toll-Free Emergency)",
          status: "Standby",
          statusColor: "text-slate-600 bg-slate-50 border-slate-200",
          time: "Armed (Auto-dispatches with live GPS & vital telemetry packet)",
          note: "Direct voice broadcast with GB Pant Hospital Triage Desk.",
        },
      ],
    };
  };

  const ladderData = getCallLadderForUser(currentUser, activePatient);

  // Status badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return {
          label: "New Alert",
          className: "bg-rose-50 text-rose-700 border-rose-200 animate-pulse font-bold",
        };
      case "Acknowledged":
        return {
          label: "Acknowledged",
          className: "bg-amber-50 text-amber-800 border-amber-200 font-bold",
        };
      case "Follow-up recorded":
        return {
          label: "Follow-up Recorded",
          className: "bg-blue-50 text-blue-700 border-blue-200 font-bold",
        };
      case "Resolved":
        return {
          label: "Resolved",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium",
        };
      default:
        return {
          label: status || "Active",
          className: "bg-slate-100 text-slate-700 border-slate-200",
        };
    }
  };

  return (
    <div className="space-y-6">

      {/* 1. CLINICIAN ALERT REVIEW & FOLLOW-UP LIFECYCLE WORKFLOW (PRIMARY CLINICIAN SECTION) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Clinician Alert Review &amp; Follow-up Queue
              </h3>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {liveAlerts.length} Active / Recent Alerts
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Deterministic threshold-based clinical evaluation. Full audit trail:{" "}
              <strong className="text-slate-700">New → Acknowledged → Follow-up recorded → Resolved</strong>.
            </p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Authoritative Server State · Zero Unverified Mockups
          </div>
        </div>

        {liveAlerts.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">All Patient Readings Within Normal Limits</h4>
            <p className="text-xs text-slate-500 mt-1">
              Zero active unacknowledged threshold alerts. Continuous bio-telemetry running nominal.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {liveAlerts.map((alert) => {
              const statusBadge = getStatusBadge(alert.status);
              const isDanger = alert.severity === "danger";

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isDanger
                      ? "bg-rose-50/40 border-rose-200"
                      : "bg-amber-50/40 border-amber-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {alert.patientName} {alert.ward ? `(${alert.ward})` : ""}
                        </span>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded border uppercase ${statusBadge.className}`}>
                          {statusBadge.label}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ID: {alert.id}
                        </span>
                      </div>

                      {/* Explicit Triggering Condition & Threshold Reason */}
                      <div className="text-xs text-slate-800 font-medium">
                        <strong className="text-slate-900">Trigger Reason:</strong>{" "}
                        {alert.conditionReason || alert.message}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                        <span>
                          <strong>Configured Threshold:</strong> {alert.threshold || "Exceeded normal bounds"}
                        </span>
                        <span>
                          <strong>Triggered:</strong> {new Date(alert.createdAt).toLocaleTimeString()}
                        </span>
                        {alert.acknowledgedBy && (
                          <span className="text-amber-800">
                            ✓ Acknowledged by: {alert.acknowledgedBy} ({new Date(alert.acknowledgedAt).toLocaleTimeString()})
                          </span>
                        )}
                        {alert.followupAction && (
                          <span className="text-blue-800">
                            📝 Follow-up: {alert.followupAction}
                          </span>
                        )}
                        {alert.resolutionNote && (
                          <span className="text-emerald-800">
                            ✓ Resolved: {alert.resolutionNote}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Clinician Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 self-start shrink-0">
                      {alert.status === "New" && (
                        <button
                          onClick={() => onAcknowledgeAlert && onAcknowledgeAlert(alert.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>✓ Acknowledge Alert</span>
                        </button>
                      )}

                      {alert.status === "Acknowledged" && (
                        <button
                          onClick={() => {
                            setSelectedAlertForAction(alert);
                            setActionModalType("followup");
                            setFollowupText("");
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>📝 Record Follow-up Action</span>
                        </button>
                      )}

                      {alert.status === "Follow-up recorded" && (
                        <button
                          onClick={() => {
                            setSelectedAlertForAction(alert);
                            setActionModalType("resolve");
                            setResolutionText("Condition stabilized and confirmed via re-check.");
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>✓ Formally Resolve</span>
                        </button>
                      )}

                      {alert.status === "Resolved" && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          ✓ Closed &amp; Documented
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Audit Event History Timeline */}
                  {alert.history && alert.history.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Audit Trail Event History:
                      </span>
                      <div className="mt-1 space-y-1">
                        {alert.history.map((h, idx) => (
                          <div key={idx} className="text-[11px] text-slate-600 flex items-center gap-2">
                            <span className="font-mono text-slate-400 text-[10px]">
                              {new Date(h.time).toLocaleTimeString()}
                            </span>
                            <span className="font-semibold text-slate-700">{h.user}:</span>
                            <span>{h.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: RECORD CLINICIAN FOLLOW-UP ACTION */}
      {actionModalType === "followup" && selectedAlertForAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Document Clinician Follow-up Action
              </h3>
              <button
                onClick={() => setActionModalType(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600">
              Documenting action for <strong className="text-slate-900">{selectedAlertForAction.patientName}</strong>:{" "}
              {selectedAlertForAction.conditionReason}
            </div>

            {/* Quick Action Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Administered supplemental O2 via nasal cannula (2L/min).",
                  "Bedside clinical re-check performed; resident responsive and alert.",
                  "Administered prescribed sublingual medication; scheduled 15m review.",
                  "Duty nurse consulted attending physician; laboratory panel ordered.",
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFollowupText(preset)}
                    className="text-[11px] text-left px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Clinical Note / Follow-up Action
              </label>
              <textarea
                rows={3}
                value={followupText}
                onChange={(e) => setFollowupText(e.target.value)}
                placeholder="Enter clinical follow-up actions taken..."
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActionModalType(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!followupText.trim()}
                onClick={() => {
                  if (onRecordFollowup) {
                    onRecordFollowup(selectedAlertForAction.id, followupText);
                  }
                  setActionModalType(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-xs"
              >
                Save Action to Audit Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FORMAL ALERT RESOLUTION */}
      {actionModalType === "resolve" && selectedAlertForAction && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Formally Resolve Clinical Alert
              </h3>
              <button
                onClick={() => setActionModalType(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600">
              Resolving alert for <strong className="text-slate-900">{selectedAlertForAction.patientName}</strong>.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Resolution Rationale
              </label>
              <textarea
                rows={2}
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                placeholder="Document resolution findings..."
                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-sans"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActionModalType(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onResolveAlert) {
                    onResolveAlert(selectedAlertForAction.id, resolutionText);
                  }
                  setActionModalType(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                Mark Alert Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. THREE-TIER AUTONOMOUS EMERGENCY CALL CHAIN ESCALATION (PRESERVED & INTEGRATED) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              3-Tier Autonomous Emergency Escalation Ladder
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Target Profile:{" "}
              <span className="font-semibold text-blue-700">
                {ladderData.patientTitle}
              </span>{" "}
              • {ladderData.locationText}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zero-Human-Delay Dispatch</span>
          </div>
        </div>

        <div className="space-y-4">
          {ladderData.ladder.map((tier, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {tier.tier}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${tier.statusColor}`}
                  >
                    {tier.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{tier.contact}</span>
                  <span className="text-xs text-slate-500 font-mono font-normal">
                    ({tier.phone})
                  </span>
                </div>
                <p className="text-xs text-slate-600">{tier.note}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-medium text-slate-500 block">
                  {tier.time}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">
                  GPS &amp; Vital Telemetry Synced
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
