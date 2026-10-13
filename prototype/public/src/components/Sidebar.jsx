// prototype/public/src/components/Sidebar.jsx
// Left Navigation Sidebar (Collapsible, Enterprise Clinical Grade)

const Sidebar = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  alertCount = 3,
  mobileOpen,
  setMobileOpen,
  user,
}) => {
  const isNurse = user?.role === "nurse" || user?.email === "wardnurse@demo.in";

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "medicines", label: "Medicines", icon: Pill },
    { id: "camera", label: "Camera Zones", icon: Video, badge: "Live CCTV" },
    ...(isNurse ? [{ id: "ward", label: "Virtual Ward", icon: Building2, badge: "Hospital" }] : []),
    { id: "alerts", label: "Alerts", icon: Bell, count: alertCount },
    { id: "devices", label: "Medical Devices", icon: Smartphone },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200/80 flex flex-col transition-all duration-200 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3 min-w-0">
            {/* ReJivan Brand Logo Mark with Heart + ECG motif */}
            <div className="w-9 h-9 rounded-xl bg-[#103663] text-[#08A6A6] flex items-center justify-center shrink-0 shadow-xs border border-[#08A6A6]/30">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M7 12h2.5l1.5-3 2 6 1.5-3H17" stroke="#08A6A6" strokeWidth="2" />
              </svg>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-[#103663] tracking-tight">
                    ReJivan
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#08A6A6] bg-[#08A6A6]/10 border border-[#08A6A6]/30 px-1 py-0.2 rounded">
                    Care
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate leading-tight mt-0.5">
                  Connected care. Earlier action.
                </p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setMobileOpen) setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                } ${collapsed ? "justify-center" : ""}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r" />
                )}
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-blue-600 stroke-[2]"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                {!collapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!collapsed && item.count !== undefined && (
                  <span className="px-1.5 py-0.2 text-[11px] font-bold font-mono rounded-full bg-rose-50 text-rose-700 border border-rose-200/90">
                    {item.count}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Status Chip */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/50">
          {!collapsed ? (
            <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                <span className="text-xs font-semibold text-slate-800">
                  Simulation Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Simulated for demonstration purposes.
              </p>
            </div>
          ) : (
            <div
              className="w-full flex justify-center py-2 text-amber-600"
              title="Simulation Demo - Simulated for demonstration purposes"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
