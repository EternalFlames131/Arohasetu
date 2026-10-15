# enable_system_startup.ps1 — Enable Arohasetu (YOLO + Web Server + AutoSave) on Windows boot
$sh = New-Object -ComObject WScript.Shell
$startup = [System.Environment]::GetFolderPath('Startup')
$root = Split-Path -Parent $PSScriptRoot

# Clean up any legacy or obsolete shortcuts
@("Arohasetu YOLO Sentinel.lnk", "ReJivan AutoSave.lnk", "ReJivan System Autostart.lnk") | ForEach-Object {
    $legacy = Join-Path $startup $_
    if (Test-Path $legacy) { Remove-Item $legacy -Force }
}

# 1. Full System Autostart (Silent YOLO + Web Server)
$sysLnkPath = Join-Path $startup "Arohasetu System Autostart.lnk"
$vbsPath = Join-Path $root "tools\start_all_silent.vbs"
$lnk = $sh.CreateShortcut($sysLnkPath)
$lnk.TargetPath = "wscript.exe"
$lnk.Arguments = "`"$vbsPath`""
$lnk.WorkingDirectory = $root
$lnk.Description = "Arohasetu Full System (Silent Background YOLO + Web Server)"
$lnk.Save()

# 2. AutoSave Watcher
$pwshExe = (Get-Command pwsh -ErrorAction SilentlyContinue).Source
if (-not $pwshExe) { $pwshExe = "pwsh.exe" }
$autoSaveLnkPath = Join-Path $startup "Arohasetu AutoSave.lnk"
$autoSaverPs1 = Join-Path $root "tools\autosaver.ps1"
$asLnk = $sh.CreateShortcut($autoSaveLnkPath)
$asLnk.TargetPath = $pwshExe
$asLnk.Arguments = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$autoSaverPs1`""
$asLnk.WorkingDirectory = $root
$asLnk.Description = "Arohasetu AutoSave (Background Watcher)"
$asLnk.Save()

Write-Host "Arohasetu System Autostart & AutoSave enabled in Startup folder." -ForegroundColor Green
Write-Host "  * YOLO (5050) + Web (8080) will start silently on boot." -ForegroundColor Green
Write-Host "  * AutoSave watcher configured for Arohasetu." -ForegroundColor Green
