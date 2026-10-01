# build_pdf.ps1
# Regenerates the canonical ReJivan System Functioning & Architecture PDF.
# Run:   pwsh -File tools\build_pdf.ps1   (from anywhere; script finds its own folder)
# Needs: Microsoft Edge (headless) + Python (pypdf). Works on any Windows PC.

$ErrorActionPreference = "Stop"

$script = Join-Path $PSScriptRoot "build_functioning_pdf.ps1"
if (-not (Test-Path -LiteralPath $script)) {
    Write-Error "Missing build script: $script"
    exit 1
}

& pwsh -ExecutionPolicy Bypass -File "$script"