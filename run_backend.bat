@echo off
title HIM-SAFE Backend Server (FastAPI + OpenCV)
echo ===================================================
echo   HIM-SAFE: Himalayan Environmental Monitoring
echo   FastAPI + OpenCV Computer Vision Backend Server
echo ===================================================
echo.

cd /d "%~dp0backend"

IF NOT EXIST ".venv\Scripts\python.exe" (
    echo [INFO] Initializing Python Virtual Environment with uv...
    uv venv .venv
    echo [INFO] Installing requirements...
    uv pip install -r requirements.txt
)

echo [INFO] Starting FastAPI server on http://127.0.0.1:8000 ...
.\.venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause
