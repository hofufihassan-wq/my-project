@echo off
setlocal
chcp 65001 > nul
title VueLexicon Pro - التشغيل المحلي على Windows

echo ======================================================
echo    VueLexicon Pro - Local Server
echo    مرحبا بك في قاموس ومحاكي VueLexicon Pro
echo ======================================================
echo.

set PORT=5173

REM Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Node.js is available.
    echo [i] Starting server on port %PORT%...
    start "" "http://127.0.0.1:%PORT%/"
    node "%~dp0scripts\serve-local.cjs"
    goto finish
)

REM Check for Python
where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Python is available.
    echo [i] Starting Python server on port %PORT%...
    start "" "http://127.0.0.1:%PORT%/"
    python -m http.server %PORT% --bind 127.0.0.1
    goto finish
)

echo [ERROR] Neither Node.js nor Python was found.
echo Please install Node.js from https://nodejs.org/
echo.
pause

:finish
endlocal
