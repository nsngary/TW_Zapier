#!/bin/bash

# 前端開發環境啟動腳本
# 確保前端在 3000 端口運行

set -e

echo "🚀 啟動前端開發環境..."

# 檢查是否有 Docker 前端容器在運行
if docker ps --format "table {{.Names}}" | grep -q "tw-zapier-frontend"; then
    echo "⚠️  發現 Docker 前端容器正在運行，將停止它以釋放 3000 端口..."
    docker stop tw-zapier-frontend
    echo "✅ Docker 前端容器已停止"
fi

# 檢查 3000 端口是否被佔用
if lsof -i :3000 >/dev/null 2>&1; then
    echo "❌ 端口 3000 仍被佔用，請手動檢查並關閉佔用的進程："
    echo "   使用命令: lsof -i :3000"
    echo "   然後使用: kill -9 <PID>"
    exit 1
fi

echo "✅ 端口 3000 可用"

# 進入前端目錄
cd "$(dirname "$0")/../frontend"

# 檢查 node_modules 是否存在
if [ ! -d "node_modules" ]; then
    echo "📦 安裝前端依賴..."
    npm install
fi

echo "🌐 啟動前端開發服務器 (端口 3000)..."
echo "   本地訪問: http://localhost:3000"
echo "   按 Ctrl+C 停止服務器"
echo ""

# 啟動開發服務器
npm run dev
