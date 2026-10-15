@echo off
REM Arohasetu - Stop YOLO Edge Sentinel
echo Stopping Arohasetu YOLO Sentinel on port 5050...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5050" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Process %%a terminated.
)
echo Arohasetu YOLO Sentinel is stopped.
