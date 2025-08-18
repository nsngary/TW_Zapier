#!/bin/bash

# 台灣在地化流程自動化平台 - Docker 開發環境管理腳本

set -e

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 輔助函數
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 檢查 Docker 和 Docker Compose
check_docker() {
    log_info "檢查 Docker 環境..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安裝，請先安裝 Docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose 未安裝，請先安裝 Docker Compose"
        exit 1
    fi
    
    if ! docker info &> /dev/null; then
        log_error "Docker 服務未啟動，請先啟動 Docker"
        exit 1
    fi
    
    log_success "Docker 環境檢查完成"
}

# 建立環境變數檔案
setup_env() {
    log_info "設定環境變數..."
    
    if [ ! -f .env ]; then
        cp .env.example .env
        log_success "已建立 .env 檔案"
        log_warning "請編輯 .env 檔案，設定必要的 API 金鑰"
    else
        log_info ".env 檔案已存在"
    fi
}

# 啟動開發環境
start_dev() {
    log_info "啟動開發環境..."
    
    # 建立必要的目錄
    mkdir -p logs database/backups
    
    # 啟動核心服務
    docker-compose up -d postgres redis n8n
    
    log_info "等待資料庫服務啟動..."
    sleep 10
    
    # 啟動應用服務
    docker-compose up -d backend frontend
    
    log_success "開發環境啟動完成！"
    echo ""
    echo "🌐 服務位址："
    echo "   - 前端應用: http://localhost:3000"
    echo "   - 後端 API: http://localhost:8000"
    echo "   - API 文件: http://localhost:8000/docs"
    echo "   - n8n 編輯器: http://localhost:5678 (admin/admin123)"
    echo ""
}

# 啟動包含監控的完整環境
start_full() {
    log_info "啟動完整開發環境 (包含監控)..."
    
    setup_env
    
    # 啟動所有服務，包含監控
    docker-compose --profile monitoring up -d
    
    log_success "完整開發環境啟動完成！"
    echo ""
    echo "🌐 服務位址："
    echo "   - 前端應用: http://localhost:3000"
    echo "   - 後端 API: http://localhost:8000"
    echo "   - API 文件: http://localhost:8000/docs"
    echo "   - n8n 編輯器: http://localhost:5678 (admin/admin123)"
    echo "   - Prometheus: http://localhost:9090"
    echo "   - Grafana: http://localhost:3001 (admin/admin123)"
    echo ""
}

# 停止服務
stop() {
    log_info "停止開發環境..."
    docker-compose down
    log_success "開發環境已停止"
}

# 重啟服務
restart() {
    log_info "重啟開發環境..."
    docker-compose restart
    log_success "開發環境已重啟"
}

# 查看日誌
logs() {
    local service=$1
    if [ -z "$service" ]; then
        docker-compose logs -f
    else
        docker-compose logs -f "$service"
    fi
}

# 清理環境
clean() {
    log_warning "這將刪除所有容器、映像和資料卷！"
    read -p "確定要繼續嗎？ (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "清理 Docker 環境..."
        docker-compose down -v --rmi all --remove-orphans
        docker system prune -f
        log_success "環境清理完成"
    else
        log_info "取消清理操作"
    fi
}

# 顯示狀態
status() {
    log_info "Docker 服務狀態："
    docker-compose ps
}

# 進入容器
shell() {
    local service=$1
    if [ -z "$service" ]; then
        log_error "請指定服務名稱: backend, frontend, postgres, redis, n8n"
        exit 1
    fi
    
    log_info "進入 $service 容器..."
    docker-compose exec "$service" /bin/bash || docker-compose exec "$service" /bin/sh
}

# 顯示幫助
show_help() {
    echo "台灣在地化流程自動化平台 - Docker 開發環境管理"
    echo ""
    echo "使用方式: $0 [命令]"
    echo ""
    echo "命令："
    echo "  start     啟動開發環境 (核心服務)"
    echo "  full      啟動完整環境 (包含監控)"
    echo "  stop      停止所有服務"
    echo "  restart   重啟所有服務"
    echo "  status    顯示服務狀態"
    echo "  logs      顯示日誌 (可指定服務名稱)"
    echo "  shell     進入容器 (需指定服務名稱)"
    echo "  clean     清理所有 Docker 資源"
    echo "  help      顯示此幫助訊息"
    echo ""
    echo "範例："
    echo "  $0 start              # 啟動開發環境"
    echo "  $0 logs backend       # 查看後端日誌"
    echo "  $0 shell postgres     # 進入資料庫容器"
    echo ""
}

# 主要邏輯
case "${1:-help}" in
    start)
        check_docker
        setup_env
        start_dev
        ;;
    full)
        check_docker
        start_full
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    logs)
        logs "$2"
        ;;
    shell)
        shell "$2"
        ;;
    clean)
        clean
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        log_error "未知命令: $1"
        show_help
        exit 1
        ;;
esac
