@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if errorlevel 1 goto try_python
py -3 -c "import sys; raise SystemExit(0 if sys.version_info >= (3, 8) else 1)" >nul 2>nul
if errorlevel 1 goto try_python
py -3 "scripts\start-local.py"
set "vlex_exit=%errorlevel%"
goto finished

:try_python
where python >nul 2>nul
if errorlevel 1 goto no_python
python -c "import sys; raise SystemExit(0 if sys.version_info >= (3, 8) else 1)" >nul 2>nul
if errorlevel 1 goto no_python
python "scripts\start-local.py"
set "vlex_exit=%errorlevel%"
goto finished

:no_python
echo Python 3.8 or newer is required.
echo Install Python 3 from https://www.python.org/downloads/windows/
echo Select "Add Python to PATH", then run start-local.bat again.
set "vlex_exit=1"

:finished
if "%vlex_exit%"=="0" goto done
echo.
echo The local site did not start. Read the message above.
pause
:done
exit /b %vlex_exit%
