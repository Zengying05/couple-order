@echo off
echo ========================================
echo    Starting Couple Order System...
echo ========================================

echo.
echo [1/2] Starting Backend Server (port 3001)...
start "Backend" cmd /k "cd /d D:\workspace\couple-order\backend && node server.js"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend Dev Server (port 5173)...
start "Frontend" cmd /k "cd /d D:\workspace\couple-order && npm run dev"

echo.
echo ========================================
echo    Done!
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:3001
echo ========================================
timeout /t 3 /nobreak >nul
