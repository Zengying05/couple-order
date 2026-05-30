# Couple Order System - Stop Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Stopping Couple Order System..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Stop Node.js processes
Write-Host "Closing Node.js processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Done!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 2
