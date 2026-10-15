# disable_system_startup.ps1 — Disable Arohasetu from launching on Windows boot
$startup = [System.Environment]::GetFolderPath('Startup')
$lnkPath = Join-Path $startup "Arohasetu System Autostart.lnk"
$oldLnk = Join-Path $startup "Arohasetu YOLO Sentinel.lnk"

if (Test-Path $lnkPath) {
    Remove-Item $lnkPath -Force
    Write-Host "Arohasetu System Autostart shortcut removed from Startup folder." -ForegroundColor Yellow
}
if (Test-Path $oldLnk) {
    Remove-Item $oldLnk -Force
}
