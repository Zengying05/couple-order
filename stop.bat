@echo off
echo ========================================
echo    Stopping Couple Order System...
echo ========================================

echo.
echo Closing Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo.
echo ========================================
echo    Done!
echo ========================================
timeout /t 2 /nobreak >nul
