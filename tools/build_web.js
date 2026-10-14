// tools/build_web.js
// Concatenates modular React components into prototype/public/bundle.jsx and generates index.html

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "prototype", "public", "src");
const compDir = path.join(srcDir, "components");
const pubDir = path.join(root, "prototype", "public");

const files = [
  path.join(root, "prototype", "movement-engine.js"),
  path.join(srcDir, "icons.jsx"),
  path.join(compDir, "Sparkline.jsx"),
  path.join(compDir, "Sidebar.jsx"),
  path.join(compDir, "TopBar.jsx"),
  path.join(compDir, "FamilyMonitorView.jsx"),
  path.join(compDir, "TriageMetricStrip.jsx"),
  path.join(compDir, "PatientOverviewCard.jsx"),
  path.join(compDir, "VitalSignsTable.jsx"),
  path.join(compDir, "HardwareDiagnosticsBar.jsx"),
  path.join(compDir, "RecentAlerts.jsx"),
  path.join(compDir, "MedicationScheduleCard.jsx"),
  path.join(compDir, "PatientTimeline.jsx"),
  path.join(compDir, "IncidentReconstructionPanel.jsx"),
  path.join(compDir, "ResidentCheckinModal.jsx"),
  path.join(compDir, "CameraZonesView.jsx"),
  path.join(compDir, "VirtualWardView.jsx"),
  path.join(compDir, "MedicinesView.jsx"),
  path.join(compDir, "AlertsView.jsx"),
  path.join(compDir, "MedicalDevicesView.jsx"),
  path.join(compDir, "SensorDemoPanel.jsx"),
  path.join(compDir, "Modals.jsx"),
  path.join(compDir, "LoginModal.jsx"),
  path.join(srcDir, "App.jsx"),
];

let bundleContent = "// ReJivan Clinical Suite - Enterprise Telemetry React Dashboard\n";
bundleContent += "// Production-grade bundle generated from modular components in prototype/public/src/\n\n";

files.forEach((file) => {
  if (fs.existsSync(file)) {
    bundleContent += `// --- START: ${path.relative(root, file)} ---\n`;
    bundleContent += fs.readFileSync(file, "utf8");
    bundleContent += `\n// --- END: ${path.relative(root, file)} ---\n\n`;
  } else {
    console.warn(`File not found: ${file}`);
  }
});

bundleContent += `
// Mount React application
const rootElement = document.getElementById("root");
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    window.ReactMounted = true;
  } catch (err) {
    console.error("Critical React Mount Error:", err);
  }
}
`;

const bundlePath = path.join(pubDir, "bundle.jsx");
fs.writeFileSync(bundlePath, bundleContent, "utf8");
console.log(`Bundle generated successfully at ${bundlePath} (${bundleContent.length} bytes)`);

// Precompile bundle.jsx to bundle.js for instant 0ms execution without browser Babel lag
const vm = require("vm");
const babelCode = fs.readFileSync(path.join(pubDir, "vendor", "babel.min.js"), "utf8");
const vmCtx = { window: {}, console: console };
vm.createContext(vmCtx);
vm.runInContext(babelCode, vmCtx);
const transpiled = vmCtx.Babel.transform(bundleContent, { presets: [["react", { runtime: "classic" }]] }).code;
const compiledBundlePath = path.join(pubDir, "bundle.js");
fs.writeFileSync(compiledBundlePath, transpiled, "utf8");
console.log(`Precompiled bundle.js successfully written to ${compiledBundlePath} (${transpiled.length} bytes)`);

// Generate production index.html
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en" class="h-full bg-slate-50">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#0F172A" />
  <title>ReJivan — Enterprise Clinical Monitoring Portal</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="alternate icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/assets/logo-192.png" />
  <link rel="manifest" href="/manifest.json" />

  <!-- Typography: Inter, Plus Jakarta Sans, JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <!-- Production Vendor Libraries (Local offline-first) -->
  <script src="/vendor/react.min.js"></script>
  <script src="/vendor/react-dom.min.js"></script>
  <script src="/vendor/tailwindcss.js"></script>

  <!-- Tailwind Configuration matching Epic/Teladoc clinical design system -->
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
          },
          colors: {
            slate: {
              50: '#F8FAFC',
              100: '#F1F5F9',
              200: '#E2E8F0',
              300: '#CBD5E1',
              400: '#94A3B8',
              500: '#64748B',
              600: '#475569',
              700: '#334155',
              800: '#1E293B',
              900: '#0F172A',
              950: '#020617',
            },
            amber: {
              50: '#FFFBEB',
              100: '#FEF3C7',
              200: '#FDE68A',
              600: '#D97706',
              700: '#B45309',
              800: '#92400E',
              900: '#78350F',
            },
            rose: {
              50: '#FFF1F2',
              100: '#FFE4E6',
              200: '#FECDD3',
              600: '#E11D48',
              700: '#BE123C',
              800: '#9F1239',
              900: '#881337',
            },
            emerald: {
              50: '#ECFDF5',
              100: '#D1FAE5',
              200: '#A7F3D0',
              500: '#10B981',
              600: '#059669',
              700: '#047857',
              800: '#065F46',
            }
          },
          boxShadow: {
            '2xs': '0 1px 2px 0 rgba(15, 23, 42, 0.03)',
            'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
            'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
          }
        }
      }
    };
  </script>

  <style>
    /* Clinical typography refinements */
    body {
      font-family: 'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #F8FAFC;
      color: #0F172A;
      -webkit-font-smoothing: antialiased;
    }
    .tabular-nums {
      font-variant-numeric: tabular-nums;
    }
  </style>
</head>
<body class="h-full bg-slate-50 text-slate-900">
  <!-- React App Root Container -->
  <div id="root">
    <!-- Initial Clinical Splash State -->
    <div class="min-h-screen flex items-center justify-center bg-slate-50">
      <div class="text-center p-8">
        <div class="w-12 h-12 rounded-xl bg-[#103663] text-[#08A6A6] flex items-center justify-center mx-auto mb-3 shadow-md animate-pulse">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h2 class="text-base font-bold text-slate-900">ReJivan Clinical Portal</h2>
        <p class="text-xs text-slate-500 mt-1">Initializing Real-time Telemetry Engine...</p>
      </div>
    </div>
  </div>

  <!-- Clinical error trap to prevent silent white screens -->
  <script>
    window.addEventListener('error', function(e) {
      console.error('Captured Runtime Error:', e.error || e.message);
      var box = document.getElementById('runtime-error-box') || document.createElement('div');
      box.id = 'runtime-error-box';
      box.style = 'position:fixed;bottom:20px;left:20px;right:20px;z-index:99999;background:#fff1f2;border:2px solid #e11d48;padding:16px;border-radius:12px;color:#9f1239;font-family:monospace;font-size:13px;box-shadow:0 10px 25px rgba(0,0,0,0.15);';
      box.innerHTML = '<strong>ReJivan UI Runtime Diagnostic:</strong><br/>' + (e.error ? (e.error.stack || e.error.message) : e.message);
      document.body.appendChild(box);
    });
  </script>

  <!-- ReJivan Precompiled Production Bundle (Instant startup, 0ms latency) -->
  <script src="/bundle.js"></script>

</body>
</html>
`;


const indexPath = path.join(pubDir, "index.html");
fs.writeFileSync(indexPath, indexHtmlContent, "utf8");
console.log(`Generated production index.html at ${indexPath}`);
