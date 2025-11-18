@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Yestride 网站编辑器 - 模块配置版
echo ========================================
echo.
echo 正在启动编辑器...
echo.

start http://localhost:3000/editor-v3.html

node server.js

pause
