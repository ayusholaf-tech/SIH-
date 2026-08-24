@echo off
title HIM-SAFE Prototype Launcher
echo ===================================================
echo   HIM-SAFE: Himalayan Environmental Monitoring
echo   Starting Both Backend and Frontend Services...
echo ===================================================
echo.

start "HIM-SAFE Backend (FastAPI)" cmd /k "%~dp0run_backend.bat"
timeout /t 3 /nobreak >nul
start "HIM-SAFE Frontend (Vite)" cmd /k "%~dp0run_frontend.bat"

echo [SUCCESS] Both services launched in separate windows!
echo Backend:  http://127.0.0.1:8000 (API Docs: http://127.0.0.1:8000/docs)
echo Frontend: http://localhost:5173
echo.
pause
