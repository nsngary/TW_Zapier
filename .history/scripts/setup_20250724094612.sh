#!/bin/bash

# 台灣在地化流程自動化平台 - 開發環境設置腳本

set -e  # 遇到錯誤立即退出

echo "🚀 開始設置 TW Zapier 開發環境..."

# 檢查必要工具
check_requirements() {
    echo "📋 檢查系統需求..."
    
    # 檢查 Node.js
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安裝，請先安裝 Node.js 18+"
        exit 1
    fi
    
    # 檢查 Python
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python 3 未安裝，請先安裝 Python 3.9+"
        exit 1
    fi
    
    # 檢查 Docker
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker 未安裝，請先安裝 Docker"
        exit 1
    fi
    
    # 檢查 Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose 未安裝，請先安裝 Docker Compose"
        exit 1
    fi
    
    echo "✅ 系統需求檢查完成"
}

# 設置環境變數
setup_env() {
    echo "🔧 設置環境變數..."
    
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ 已建立 .env 檔案，請根據需要修改配置"
    else
        echo "ℹ️  .env 檔案已存在，跳過建立"
    fi
}

# 設置前端環境
setup_frontend() {
    echo "🎨 設置前端環境..."
    
    cd frontend
    
    # 安裝依賴
    if [ -f package-lock.json ]; then
        npm ci
    else
        npm install
    fi
    
    echo "✅ 前端依賴安裝完成"
    cd ..
}

# 設置後端環境
setup_backend() {
    echo "⚙️  設置後端環境..."
    
    cd backend
    
    # 建立虛擬環境
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        echo "✅ Python 虛擬環境建立完成"
    fi
    
    # 啟動虛擬環境並安裝依賴
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    
    echo "✅ 後端依賴安裝完成"
    cd ..
}

# 啟動 Docker 服務
start_docker_services() {
    echo "🐳 啟動 Docker 服務..."

    # 檢查 docker-compose.yml 是否存在
    if [ ! -f docker-compose.yml ]; then
        echo "⚠️  docker-compose.yml 不存在，跳過 Docker 服務啟動"
        echo "   請先完成 Docker 開發環境設定任務"
        return
    fi

    # 啟動核心服務
    echo "   啟動資料庫服務..."
    docker-compose up -d postgres redis

    echo "   等待資料庫服務就緒..."
    sleep 15

    echo "   啟動 n8n 工作流引擎..."
    docker-compose up -d n8n

    echo "   等待 n8n 服務就緒..."
    sleep 10

    echo "✅ Docker 服務啟動完成"
    echo "   - PostgreSQL: localhost:5432"
    echo "   - Redis: localhost:6379"
    echo "   - n8n: http://localhost:5678 (admin/admin123)"
    echo ""
    echo "💡 提示："
    echo "   - 使用 './scripts/docker-dev.sh start' 啟動完整開發環境"
    echo "   - 使用 './scripts/docker-dev.sh status' 查看服務狀態"
}

# 建立必要目錄
create_directories() {
    echo "📁 建立必要目錄..."
    
    mkdir -p logs
    mkdir -p database/backups
    mkdir -p monitoring/data
    
    echo "✅ 目錄建立完成"
}

# 主要執行流程
main() {
    echo "🎯 台灣在地化流程自動化平台 - 開發環境設置"
    echo "================================================"
    
    check_requirements
    setup_env
    create_directories
    setup_frontend
    setup_backend
    start_docker_services
    
    echo ""
    echo "🎉 開發環境設置完成！"
    echo ""
    echo "📝 下一步："
    echo "   1. 編輯 .env 檔案，設定必要的 API 金鑰"
    echo "   2. 啟動前端開發伺服器: cd frontend && npm run dev"
    echo "   3. 啟動後端開發伺服器: cd backend && source venv/bin/activate && python app/main.py"
    echo ""
    echo "🌐 服務位址："
    echo "   - 前端: http://localhost:3000"
    echo "   - 後端 API: http://localhost:8000"
    echo "   - API 文件: http://localhost:8000/docs"
    echo "   - n8n 編輯器: http://localhost:5678"
    echo ""
}

# 執行主程式
main "$@"
