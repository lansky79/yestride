@echo off
echo ========================================
echo   Yestride 网站编辑器
echo ========================================
echo.
echo 正在启动编辑器...
echo.

REM 检查是否安装了依赖
if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    call npm install
    echo.
)

echo 启动服务器...
echo.
echo 请在浏览器中打开: http://localhost:3000/editor-v2.html
echo.
echo 按 Ctrl+C 可以停止服务器
echo.

call npm start

pause
