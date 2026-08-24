@echo off
title HIM-SAFE Frontend

cd /d "%~dp0HIM safe1"

echo Starting HIM-SAFE frontend...
call npm.cmd run dev

pause