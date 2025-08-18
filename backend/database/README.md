# 台灣在地化流程自動化平台 - 資料庫設計文件

## 📊 資料庫概覽

本專案使用 **PostgreSQL 14+** 作為主要資料庫，設計了完整的資料結構來支援台灣在地化流程自動化平台的所有功能。

### 🎯 設計目標

- **可擴展性**: 支援大量使用者和工作流
- **效能優化**: 合理的索引策略和查詢優化
- **資料完整性**: 完整的約束條件和外鍵關聯
- **台灣在地化**: 支援繁體中文和台灣特有服務
- **審計追蹤**: 完整的操作記錄和變更追蹤

## 🏗️ 資料表結構

### 👥 使用者管理

#### `users` - 使用者基本資訊
- **主鍵**: `id` (SERIAL)
- **唯一鍵**: `email`
- **核心欄位**: email, hashed_password, full_name, is_active, is_superuser
- **時間戳**: created_at, updated_at, last_login_at

#### `user_profiles` - 使用者詳細檔案
- **外鍵**: `user_id` → users.id
- **個人資訊**: avatar_url, bio, location, website, phone
- **地區設定**: timezone, language
- **統計資訊**: workflow_count, execution_count

#### `user_preferences` - 使用者偏好設定
- **外鍵**: `user_id` → users.id
- **介面設定**: theme, sidebar_collapsed
- **通知設定**: email_notifications, workflow_notifications, execution_notifications
- **工作流設定**: auto_save_workflows, default_workflow_privacy

### 🔄 工作流管理

#### `workflows` - 工作流定義
- **主鍵**: `id` (SERIAL)
- **外鍵**: `user_id` → users.id
- **基本資訊**: name, description, status, is_active, category, tags
- **工作流定義**: nodes (JSONB), edges (JSONB), settings (JSONB)
- **版本控制**: version
- **執行統計**: execution_count, success_count, failure_count, average_duration
- **n8n 整合**: n8n_workflow_id

#### `workflow_versions` - 工作流版本控制
- **主鍵**: `id` (SERIAL)
- **外鍵**: `workflow_id` → workflows.id, `created_by` → users.id
- **版本資訊**: version_number, version_name, changelog
- **版本內容**: nodes (JSONB), edges (JSONB), settings (JSONB)

#### `workflow_executions` - 工作流執行記錄
- **主鍵**: `id` (SERIAL)
- **外鍵**: `workflow_id` → workflows.id, `user_id` → users.id
- **執行資訊**: execution_id (UUID), status, trigger_type
- **執行資料**: trigger_data (JSONB), result_data (JSONB), error_message
- **執行統計**: nodes_executed, nodes_successful, nodes_failed
- **時間統計**: started_at, finished_at, duration

#### `workflow_templates` - 工作流模板
- **主鍵**: `id` (SERIAL)
- **外鍵**: `author_id` → users.id
- **基本資訊**: name, description, category, tags
- **模板內容**: thumbnail_url, nodes (JSONB), edges (JSONB), settings (JSONB)
- **統計資訊**: usage_count, rating, rating_count

### 🔧 節點和服務

#### `node_types` - 節點類型定義
- **主鍵**: `id` (SERIAL)
- **唯一鍵**: `name`
- **基本資訊**: name, display_name, category, description
- **視覺化**: icon_url, color
- **配置 Schema**: input_schema (JSONB), output_schema (JSONB), settings_schema (JSONB)
- **功能特性**: supports_webhook, supports_polling, supports_batch
- **台灣在地化**: is_taiwan_service, service_provider

#### `nodes` - 節點實例
- **主鍵**: `id` (SERIAL)
- **外鍵**: `workflow_id` → workflows.id, `node_type_id` → node_types.id
- **節點識別**: node_key, node_name
- **位置資訊**: position_x, position_y
- **節點配置**: configuration (JSONB), input_data (JSONB)
- **執行統計**: execution_count, success_count, failure_count, average_duration

#### `taiwan_services` - 台灣在地服務配置
- **主鍵**: `id` (SERIAL)
- **唯一鍵**: `service_name`
- **服務資訊**: service_name, service_type, display_name, provider
- **API 配置**: api_endpoint, api_version, api_key_encrypted, auth_type, auth_config (JSONB)
- **服務狀態**: is_active, is_sandbox, is_healthy
- **監控資訊**: health_check_url, last_health_check
- **統計資訊**: usage_count, error_count, last_used_at

### 💰 金流和支付

#### `payment_records` - 金流記錄
- **主鍵**: `id` (SERIAL)
- **外鍵**: `workflow_execution_id` → workflow_executions.id
- **金流資訊**: service_type, transaction_id, merchant_order_id
- **金額資訊**: amount (以分為單位), currency
- **商品資訊**: product_name, product_description
- **交易狀態**: status, external_transaction_id, external_status, external_response (JSONB)

### 🔐 安全和管理

#### `api_keys` - API 金鑰管理
- **主鍵**: `id` (SERIAL)
- **外鍵**: `user_id` → users.id
- **金鑰資訊**: key_name, key_hash, key_prefix
- **權限管理**: permissions (JSONB), is_active
- **使用統計**: usage_count, last_used_at, last_used_ip
- **過期管理**: expires_at

#### `webhook_endpoints` - Webhook 端點
- **主鍵**: `id` (SERIAL)
- **外鍵**: `user_id` → users.id, `workflow_id` → workflows.id
- **端點資訊**: endpoint_id (UUID), endpoint_url, secret_key
- **設定**: method, content_type, is_active
- **統計**: trigger_count, last_triggered_at, last_trigger_ip

#### `audit_logs` - 審計日誌
- **主鍵**: `id` (SERIAL)
- **外鍵**: `user_id` → users.id
- **操作資訊**: action, resource_type, resource_id
- **變更資訊**: old_values (JSONB), new_values (JSONB)
- **請求資訊**: ip_address, user_agent, request_id
- **結果資訊**: success, error_message

#### `system_settings` - 系統設定
- **主鍵**: `id` (SERIAL)
- **唯一鍵**: `setting_key`
- **設定資訊**: setting_key, setting_value, setting_type, description
- **權限**: is_public, is_readonly
- **驗證**: validation_rule (JSONB)

## 📈 索引策略

### 主要索引
- **使用者相關**: email, is_active, created_at
- **工作流相關**: user_id, status, is_active, category, created_at, last_executed_at
- **執行記錄**: workflow_id, user_id, status, started_at, finished_at, execution_id
- **審計日誌**: user_id, action, resource_type, created_at, request_id

### 複合索引
- `workflows(user_id, status)` - 使用者工作流狀態查詢
- `workflow_executions(workflow_id, status)` - 工作流執行狀態查詢
- `payment_records(service_type, status)` - 金流服務狀態查詢

### 全文搜索索引
- `workflows.name` - 使用 GIN 索引支援模糊搜索

## 🔧 資料庫管理

### 初始化資料庫
```bash
# 建立資料庫
python database/db_manager.py create

# 初始化 Schema
python database/db_manager.py init

# 載入種子資料
python database/db_manager.py seed
```

### 重置資料庫
```bash
# 完全重置資料庫
python database/db_manager.py reset
```

### 檢查資料庫狀態
```bash
# 檢查連線
python database/db_manager.py check

# 查看資料表資訊
python database/db_manager.py info
```

## 🛡️ 安全考量

### 資料加密
- **密碼**: 使用 bcrypt 雜湊
- **API 金鑰**: 加密儲存敏感資訊
- **第三方憑證**: 加密儲存 API 金鑰和認證資訊

### 存取控制
- **行級安全**: 使用者只能存取自己的資料
- **角色權限**: 超級使用者和一般使用者權限分離
- **API 金鑰**: 細粒度權限控制

### 審計追蹤
- **操作記錄**: 所有重要操作都有審計日誌
- **變更追蹤**: 記錄資料變更前後的值
- **請求追蹤**: 記錄 IP 位址和使用者代理

## 📊 效能優化

### 查詢優化
- **索引策略**: 針對常用查詢建立適當索引
- **分頁查詢**: 使用 LIMIT 和 OFFSET 進行分頁
- **JSONB 查詢**: 針對 JSONB 欄位建立 GIN 索引

### 資料分割
- **時間分割**: 考慮對大型日誌表進行時間分割
- **使用者分割**: 可考慮按使用者 ID 進行分割

### 連線管理
- **連線池**: 使用 SQLAlchemy 連線池
- **連線限制**: 設定適當的最大連線數

## 🔄 備份和恢復

### 定期備份
```bash
# 完整備份
pg_dump taiwan_zapier_db > backup_$(date +%Y%m%d_%H%M%S).sql

# 僅資料備份
pg_dump --data-only taiwan_zapier_db > data_backup_$(date +%Y%m%d_%H%M%S).sql
```

### 恢復資料
```bash
# 恢復完整備份
psql taiwan_zapier_db < backup_20240101_120000.sql

# 恢復僅資料
psql taiwan_zapier_db < data_backup_20240101_120000.sql
```
