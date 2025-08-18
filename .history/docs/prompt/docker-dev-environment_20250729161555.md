建立完整的 Docker 開發環境，包括：

1. **核心服務容器**：
   - PostgreSQL：主資料庫，支援 tw_zapier_db 和 n8n_db
   - Redis：快取和任務佇列服務
   - n8n：工作流執行引擎，台灣時區和中文設定
   - FastAPI Backend：後端 API 服務，開發模式
   - Vue Frontend：前端服務，熱重載支援

2. **監控服務（可選）**：
   - Prometheus：指標收集和監控
   - Grafana：視覺化儀表板

3. **資料庫管理工具**：
   - Adminer：Web 資料庫管理介面，端口 8080

4. **網路和資料卷配置**：
   - 統一的 Docker 網路：tw-zapier-network
   - 資料持久化：postgres_data、redis_data、n8n_data
   - 日誌管理：backend_logs

5. **健康檢查**：
   - 所有服務的健康檢查配置
   - 服務依賴關係管理
   - 自動重啟策略

6. **環境變數管理**：
   - 開發和生產環境分離
   - 敏感資料環境變數化
   - 台灣時區設定（Asia/Taipei）

7. **管理腳本**：
   - docker-dev.sh：一鍵啟動開發環境
   - 服務狀態檢查和日誌查看
   - 資料庫備份和還原功能
