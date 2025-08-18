#!/bin/bash

# 台灣在地化流程自動化平台 - 資料庫備份腳本

set -e

# 載入環境變數
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# 預設值
DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}
DB_NAME=${DATABASE_NAME:-tw_zapier_db}
DB_USER=${DATABASE_USER:-tw_zapier}
BACKUP_DIR="database/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 顏色定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 建立備份目錄
mkdir -p "$BACKUP_DIR"

# 備份主資料庫
backup_main_db() {
    log_info "備份主資料庫: $DB_NAME"
    
    local backup_file="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql"
    
    if docker-compose ps postgres | grep -q "Up"; then
        # 使用 Docker 容器備份
        docker-compose exec -T postgres pg_dump -U "$DB_USER" -d "$DB_NAME" > "$backup_file"
    else
        # 直接連線備份
        PGPASSWORD="$DATABASE_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" > "$backup_file"
    fi
    
    if [ $? -eq 0 ]; then
        # 壓縮備份檔案
        gzip "$backup_file"
        log_success "主資料庫備份完成: ${backup_file}.gz"
    else
        log_error "主資料庫備份失敗"
        return 1
    fi
}

# 備份 n8n 資料庫
backup_n8n_db() {
    log_info "備份 n8n 資料庫"
    
    local backup_file="$BACKUP_DIR/n8n_db_${TIMESTAMP}.sql"
    
    if docker-compose ps postgres | grep -q "Up"; then
        # 使用 Docker 容器備份
        docker-compose exec -T postgres pg_dump -U "$DB_USER" -d "n8n_db" > "$backup_file"
    else
        # 直接連線備份
        PGPASSWORD="$DATABASE_PASSWORD" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "n8n_db" > "$backup_file"
    fi
    
    if [ $? -eq 0 ]; then
        # 壓縮備份檔案
        gzip "$backup_file"
        log_success "n8n 資料庫備份完成: ${backup_file}.gz"
    else
        log_error "n8n 資料庫備份失敗"
        return 1
    fi
}

# 備份 n8n 資料目錄
backup_n8n_data() {
    log_info "備份 n8n 資料目錄"
    
    local backup_file="$BACKUP_DIR/n8n_data_${TIMESTAMP}.tar.gz"
    
    if docker volume ls | grep -q "tw-zapier-n8n-data"; then
        # 備份 Docker 資料卷
        docker run --rm -v tw-zapier-n8n-data:/data -v "$(pwd)/$BACKUP_DIR":/backup alpine tar czf "/backup/n8n_data_${TIMESTAMP}.tar.gz" -C /data .
        log_success "n8n 資料目錄備份完成: $backup_file"
    else
        log_info "n8n Docker 資料卷不存在，跳過資料目錄備份"
    fi
}

# 清理舊備份 (保留最近 7 天)
cleanup_old_backups() {
    log_info "清理 7 天前的舊備份檔案"
    
    find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete
    find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete
    
    log_success "舊備份檔案清理完成"
}

# 顯示備份檔案資訊
show_backup_info() {
    log_info "備份檔案清單:"
    ls -lh "$BACKUP_DIR"/*${TIMESTAMP}* 2>/dev/null || echo "沒有找到備份檔案"
}

# 主要執行流程
main() {
    echo "🗄️  台灣在地化流程自動化平台 - 資料庫備份"
    echo "================================================"
    
    backup_main_db
    backup_n8n_db
    backup_n8n_data
    cleanup_old_backups
    show_backup_info
    
    log_success "資料庫備份作業完成！"
}

# 執行主程式
main "$@"
