# Couple Order System - Start Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Starting Couple Order System..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "[1/2] Starting Backend Server (port 3001)..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/k", "cd /d D:\workspace\couple-order\backend && node server.js" -WindowStyle Normal

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "[2/2] Starting Frontend Dev Server (port 5173)..." -ForegroundColor Yellow
Start-Process -FilePath "cmd" -ArgumentList "/k", "cd /d D:\workspace\couple-order && npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Done!" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 3
