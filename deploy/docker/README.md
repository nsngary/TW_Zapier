# Docker 部署指南

## 📋 概述

本專案提供完整的 Docker 容器化解決方案，支援開發和生產環境的部署需求。

## 🏗️ 架構組件

### 核心服務
- **PostgreSQL**: 主資料庫，儲存應用程式資料和 n8n 工作流資料
- **Redis**: 快取和任務佇列服務
- **n8n**: 工作流執行引擎
- **FastAPI Backend**: 後端 API 服務
- **Vue Frontend**: 前端使用者介面

### 監控服務 (可選)
- **Prometheus**: 指標收集和監控
- **Grafana**: 視覺化儀表板

## 🚀 快速開始

### 開發環境

1. **環境準備**
```bash
# 複製環境變數檔案
cp .env.example .env

# 編輯環境變數 (設定必要的 API 金鑰)
vim .env
```

2. **啟動開發環境**
```bash
# 使用管理腳本 (推薦)
./scripts/docker-dev.sh start

# 或直接使用 docker-compose
docker-compose up -d
```

3. **查看服務狀態**
```bash
./scripts/docker-dev.sh status
```

### 生產環境

1. **環境準備**
```bash
# 設定生產環境變數
cp .env.example .env.prod
vim .env.prod
```

2. **啟動生產環境**
```bash
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

## 📊 服務埠號

| 服務 | 開發環境 | 生產環境 | 說明 |
|------|----------|----------|------|
| 前端 | 3000 | 80/443 | Vue 應用程式 |
| 後端 API | 8000 | - | FastAPI 服務 |
| n8n | 5678 | - | 工作流編輯器 |
| PostgreSQL | 5432 | - | 資料庫 |
| Redis | 6379 | - | 快取服務 |
| Prometheus | 9090 | - | 監控服務 |
| Grafana | 3001 | - | 儀表板 |

## 🔧 管理命令

### 使用管理腳本

```bash
# 啟動開發環境
./scripts/docker-dev.sh start

# 啟動完整環境 (包含監控)
./scripts/docker-dev.sh full

# 查看服務狀態
./scripts/docker-dev.sh status

# 查看日誌
./scripts/docker-dev.sh logs [service_name]

# 進入容器
./scripts/docker-dev.sh shell [service_name]

# 停止服務
./scripts/docker-dev.sh stop

# 重啟服務
./scripts/docker-dev.sh restart

# 清理環境
./scripts/docker-dev.sh clean
```

### 直接使用 Docker Compose

```bash
# 啟動所有服務
docker-compose up -d

# 啟動特定服務
docker-compose up -d postgres redis n8n

# 查看日誌
docker-compose logs -f [service_name]

# 停止服務
docker-compose down

# 重建映像
docker-compose build [service_name]
```

## 💾 資料持久化

### 資料卷

- `tw-zapier-postgres-data`: PostgreSQL 資料
- `tw-zapier-redis-data`: Redis 資料
- `tw-zapier-n8n-data`: n8n 工作流和設定
- `tw-zapier-backend-logs`: 後端日誌
- `tw-zapier-prometheus-data`: Prometheus 監控資料
- `tw-zapier-grafana-data`: Grafana 設定和儀表板

### 備份和還原

```bash
# 備份資料庫
./scripts/backup-db.sh

# 手動備份特定資料卷
docker run --rm -v tw-zapier-postgres-data:/data -v $(pwd)/backups:/backup alpine tar czf /backup/postgres-backup.tar.gz -C /data .

# 還原資料卷
docker run --rm -v tw-zapier-postgres-data:/data -v $(pwd)/backups:/backup alpine tar xzf /backup/postgres-backup.tar.gz -C /data
```

## 🔍 故障排除

### 常見問題

1. **服務無法啟動**
```bash
# 檢查 Docker 服務狀態
docker info

# 檢查容器日誌
docker-compose logs [service_name]

# 檢查資源使用情況
docker stats
```

2. **資料庫連線問題**
```bash
# 檢查 PostgreSQL 容器狀態
docker-compose exec postgres pg_isready -U tw_zapier

# 進入資料庫容器
docker-compose exec postgres psql -U tw_zapier -d tw_zapier_db
```

3. **n8n 無法存取**
```bash
# 檢查 n8n 容器日誌
docker-compose logs n8n

# 確認認證設定
echo $N8N_BASIC_AUTH_USER
echo $N8N_BASIC_AUTH_PASSWORD
```

### 效能調優

1. **記憶體限制**
```yaml
# 在 docker-compose.yml 中設定
services:
  postgres:
    deploy:
      resources:
        limits:
          memory: 1G
        reservations:
          memory: 512M
```

2. **CPU 限制**
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
```

## 🔒 安全性考量

### 開發環境
- 使用預設密碼和設定
- 所有服務暴露到主機網路
- 啟用除錯模式

### 生產環境
- 強制使用環境變數設定密碼
- 僅必要服務暴露到外部
- 啟用 HTTPS 和安全標頭
- 使用非 root 使用者執行容器

## 📈 監控和日誌

### Prometheus 指標
- 應用程式效能指標
- 系統資源使用情況
- 工作流執行統計

### Grafana 儀表板
- 系統概覽
- 應用程式效能
- 工作流監控
- 錯誤追蹤

### 日誌管理
```bash
# 查看即時日誌
docker-compose logs -f

# 查看特定服務日誌
docker-compose logs -f backend

# 匯出日誌
docker-compose logs > logs/docker-compose.log
```

## 🔄 更新和維護

### 更新應用程式
```bash
# 拉取最新程式碼
git pull

# 重建映像
docker-compose build

# 重啟服務
docker-compose up -d
```

### 更新基礎映像
```bash
# 拉取最新映像
docker-compose pull

# 重啟服務
docker-compose up -d
```

### 定期維護
- 定期備份資料
- 清理未使用的映像和容器
- 監控磁碟空間使用情況
- 檢查安全性更新
