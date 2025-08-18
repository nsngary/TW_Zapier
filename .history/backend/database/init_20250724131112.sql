-- 台灣在地化流程自動化平台資料庫初始化腳本
-- PostgreSQL 14+ 版本

-- 建立資料庫（如果不存在）
-- CREATE DATABASE taiwan_zapier_db;

-- 連接到資料庫
-- \c taiwan_zapier_db;

-- 啟用必要的擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- 建立自定義類型
DO $$ BEGIN
    CREATE TYPE workflow_status AS ENUM ('draft', 'active', 'inactive', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE execution_status AS ENUM ('pending', 'running', 'success', 'failed', 'cancelled', 'timeout');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 使用者表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_superuser BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE
);

-- 使用者詳細檔案表
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    avatar_url VARCHAR(500),
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(500),
    phone VARCHAR(20),
    timezone VARCHAR(50) DEFAULT 'Asia/Taipei' NOT NULL,
    language VARCHAR(10) DEFAULT 'zh-TW' NOT NULL,
    workflow_count INTEGER DEFAULT 0 NOT NULL,
    execution_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 使用者偏好設定表
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'light' NOT NULL,
    sidebar_collapsed BOOLEAN DEFAULT FALSE NOT NULL,
    email_notifications BOOLEAN DEFAULT TRUE NOT NULL,
    workflow_notifications BOOLEAN DEFAULT TRUE NOT NULL,
    execution_notifications BOOLEAN DEFAULT FALSE NOT NULL,
    marketing_emails BOOLEAN DEFAULT FALSE NOT NULL,
    auto_save_workflows BOOLEAN DEFAULT TRUE NOT NULL,
    default_workflow_privacy VARCHAR(20) DEFAULT 'private' NOT NULL,
    additional_settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 工作流表
CREATE TABLE IF NOT EXISTS workflows (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status workflow_status DEFAULT 'draft' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    category VARCHAR(50),
    tags TEXT[],
    nodes JSONB DEFAULT '[]' NOT NULL,
    edges JSONB DEFAULT '[]' NOT NULL,
    settings JSONB DEFAULT '{}',
    version INTEGER DEFAULT 1 NOT NULL,
    execution_count INTEGER DEFAULT 0 NOT NULL,
    success_count INTEGER DEFAULT 0 NOT NULL,
    failure_count INTEGER DEFAULT 0 NOT NULL,
    average_duration REAL,
    n8n_workflow_id VARCHAR(100) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    last_executed_at TIMESTAMP WITH TIME ZONE
);

-- 工作流版本表
CREATE TABLE IF NOT EXISTS workflow_versions (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    version_name VARCHAR(100),
    changelog TEXT,
    nodes JSONB NOT NULL,
    edges JSONB NOT NULL,
    settings JSONB,
    is_current BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    created_by INTEGER NOT NULL REFERENCES users(id)
);

-- 工作流執行記錄表
CREATE TABLE IF NOT EXISTS workflow_executions (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    execution_id VARCHAR(36) UNIQUE DEFAULT uuid_generate_v4() NOT NULL,
    status execution_status DEFAULT 'pending' NOT NULL,
    trigger_type VARCHAR(50),
    trigger_data JSONB,
    result_data JSONB,
    error_message TEXT,
    error_details JSONB,
    nodes_executed INTEGER DEFAULT 0 NOT NULL,
    nodes_successful INTEGER DEFAULT 0 NOT NULL,
    nodes_failed INTEGER DEFAULT 0 NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    finished_at TIMESTAMP WITH TIME ZONE,
    duration REAL,
    n8n_execution_id VARCHAR(100)
);

-- 工作流模板表
CREATE TABLE IF NOT EXISTS workflow_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    tags TEXT[],
    thumbnail_url VARCHAR(500),
    nodes JSONB NOT NULL,
    edges JSONB NOT NULL,
    settings JSONB DEFAULT '{}',
    author_id INTEGER REFERENCES users(id),
    is_official BOOLEAN DEFAULT FALSE NOT NULL,
    is_public BOOLEAN DEFAULT TRUE NOT NULL,
    usage_count INTEGER DEFAULT 0 NOT NULL,
    rating REAL DEFAULT 0.0 NOT NULL,
    rating_count INTEGER DEFAULT 0 NOT NULL,
    version VARCHAR(20) DEFAULT '1.0.0' NOT NULL,
    min_platform_version VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 節點類型表
CREATE TABLE IF NOT EXISTS node_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    documentation_url VARCHAR(500),
    icon_url VARCHAR(500),
    color VARCHAR(7),
    version VARCHAR(20) DEFAULT '1.0.0' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_beta BOOLEAN DEFAULT FALSE NOT NULL,
    input_schema JSONB,
    output_schema JSONB,
    settings_schema JSONB,
    supports_webhook BOOLEAN DEFAULT FALSE NOT NULL,
    supports_polling BOOLEAN DEFAULT FALSE NOT NULL,
    supports_batch BOOLEAN DEFAULT FALSE NOT NULL,
    is_taiwan_service BOOLEAN DEFAULT FALSE NOT NULL,
    service_provider VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 節點實例表
CREATE TABLE IF NOT EXISTS nodes (
    id SERIAL PRIMARY KEY,
    workflow_id INTEGER NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    node_type_id INTEGER NOT NULL REFERENCES node_types(id),
    node_key VARCHAR(100) NOT NULL,
    node_name VARCHAR(100),
    position_x REAL DEFAULT 0 NOT NULL,
    position_y REAL DEFAULT 0 NOT NULL,
    configuration JSONB DEFAULT '{}',
    input_data JSONB DEFAULT '{}',
    is_disabled BOOLEAN DEFAULT FALSE NOT NULL,
    execution_count INTEGER DEFAULT 0 NOT NULL,
    success_count INTEGER DEFAULT 0 NOT NULL,
    failure_count INTEGER DEFAULT 0 NOT NULL,
    average_duration REAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 台灣在地服務表
CREATE TABLE IF NOT EXISTS taiwan_services (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) UNIQUE NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    api_endpoint VARCHAR(500) NOT NULL,
    api_version VARCHAR(20),
    api_key_encrypted TEXT,
    auth_type VARCHAR(50) DEFAULT 'api_key' NOT NULL,
    auth_config JSONB,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_sandbox BOOLEAN DEFAULT FALSE NOT NULL,
    configuration JSONB DEFAULT '{}',
    rate_limit INTEGER,
    health_check_url VARCHAR(500),
    last_health_check TIMESTAMP WITH TIME ZONE,
    is_healthy BOOLEAN DEFAULT TRUE NOT NULL,
    usage_count INTEGER DEFAULT 0 NOT NULL,
    error_count INTEGER DEFAULT 0 NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 金流記錄表
CREATE TABLE IF NOT EXISTS payment_records (
    id SERIAL PRIMARY KEY,
    workflow_execution_id INTEGER NOT NULL REFERENCES workflow_executions(id) ON DELETE CASCADE,
    service_type VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    merchant_order_id VARCHAR(100),
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'TWD' NOT NULL,
    product_name VARCHAR(200),
    product_description TEXT,
    status VARCHAR(50) NOT NULL,
    external_transaction_id VARCHAR(100),
    external_status VARCHAR(50),
    external_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE
);

-- API 金鑰表
CREATE TABLE IF NOT EXISTS api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key_name VARCHAR(100) NOT NULL,
    key_hash VARCHAR(255) UNIQUE NOT NULL,
    key_prefix VARCHAR(10) NOT NULL,
    permissions JSONB,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    usage_count INTEGER DEFAULT 0 NOT NULL,
    last_used_at TIMESTAMP WITH TIME ZONE,
    last_used_ip VARCHAR(45),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Webhook 端點表
CREATE TABLE IF NOT EXISTS webhook_endpoints (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    workflow_id INTEGER NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    endpoint_id VARCHAR(36) UNIQUE DEFAULT uuid_generate_v4() NOT NULL,
    endpoint_url VARCHAR(500) UNIQUE NOT NULL,
    secret_key VARCHAR(255),
    method VARCHAR(10) DEFAULT 'POST' NOT NULL,
    content_type VARCHAR(100) DEFAULT 'application/json' NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    trigger_count INTEGER DEFAULT 0 NOT NULL,
    last_triggered_at TIMESTAMP WITH TIME ZONE,
    last_trigger_ip VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 審計日誌表
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(50),
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_id VARCHAR(36),
    success BOOLEAN DEFAULT TRUE NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 系統設定表
CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string' NOT NULL,
    description TEXT,
    category VARCHAR(50),
    is_public BOOLEAN DEFAULT FALSE NOT NULL,
    is_readonly BOOLEAN DEFAULT FALSE NOT NULL,
    validation_rule JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_by INTEGER REFERENCES users(id)
);

-- 建立索引以優化查詢效能

-- 使用者相關索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- 工作流相關索引
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_status ON workflows(status);
CREATE INDEX IF NOT EXISTS idx_workflows_is_active ON workflows(is_active);
CREATE INDEX IF NOT EXISTS idx_workflows_category ON workflows(category);
CREATE INDEX IF NOT EXISTS idx_workflows_created_at ON workflows(created_at);
CREATE INDEX IF NOT EXISTS idx_workflows_last_executed_at ON workflows(last_executed_at);
CREATE INDEX IF NOT EXISTS idx_workflows_name_trgm ON workflows USING gin(name gin_trgm_ops);

-- 工作流版本索引
CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow_id ON workflow_versions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_versions_created_at ON workflow_versions(created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_workflow_versions_unique_current
    ON workflow_versions(workflow_id) WHERE is_current = true;

-- 工作流執行記錄索引
CREATE INDEX IF NOT EXISTS idx_workflow_executions_workflow_id ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_user_id ON workflow_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_started_at ON workflow_executions(started_at);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_finished_at ON workflow_executions(finished_at);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_execution_id ON workflow_executions(execution_id);
CREATE INDEX IF NOT EXISTS idx_workflow_executions_trigger_type ON workflow_executions(trigger_type);

-- 工作流模板索引
CREATE INDEX IF NOT EXISTS idx_workflow_templates_category ON workflow_templates(category);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_is_public ON workflow_templates(is_public);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_rating ON workflow_templates(rating DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_usage_count ON workflow_templates(usage_count DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_templates_created_at ON workflow_templates(created_at);

-- 節點類型索引
CREATE INDEX IF NOT EXISTS idx_node_types_name ON node_types(name);
CREATE INDEX IF NOT EXISTS idx_node_types_category ON node_types(category);
CREATE INDEX IF NOT EXISTS idx_node_types_is_active ON node_types(is_active);
CREATE INDEX IF NOT EXISTS idx_node_types_is_taiwan_service ON node_types(is_taiwan_service);

-- 節點實例索引
CREATE INDEX IF NOT EXISTS idx_nodes_workflow_id ON nodes(workflow_id);
CREATE INDEX IF NOT EXISTS idx_nodes_node_type_id ON nodes(node_type_id);
CREATE INDEX IF NOT EXISTS idx_nodes_node_key ON nodes(node_key);
CREATE UNIQUE INDEX IF NOT EXISTS idx_nodes_workflow_key ON nodes(workflow_id, node_key);

-- 台灣服務索引
CREATE INDEX IF NOT EXISTS idx_taiwan_services_service_name ON taiwan_services(service_name);
CREATE INDEX IF NOT EXISTS idx_taiwan_services_service_type ON taiwan_services(service_type);
CREATE INDEX IF NOT EXISTS idx_taiwan_services_is_active ON taiwan_services(is_active);

-- 金流記錄索引
CREATE INDEX IF NOT EXISTS idx_payment_records_workflow_execution_id ON payment_records(workflow_execution_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_service_type ON payment_records(service_type);
CREATE INDEX IF NOT EXISTS idx_payment_records_transaction_id ON payment_records(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_status ON payment_records(status);
CREATE INDEX IF NOT EXISTS idx_payment_records_created_at ON payment_records(created_at);
CREATE INDEX IF NOT EXISTS idx_payment_records_external_transaction_id ON payment_records(external_transaction_id);

-- API 金鑰索引
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);
CREATE INDEX IF NOT EXISTS idx_api_keys_expires_at ON api_keys(expires_at);

-- Webhook 端點索引
CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_user_id ON webhook_endpoints(user_id);
CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_workflow_id ON webhook_endpoints(workflow_id);
CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_endpoint_id ON webhook_endpoints(endpoint_id);
CREATE INDEX IF NOT EXISTS idx_webhook_endpoints_is_active ON webhook_endpoints(is_active);

-- 審計日誌索引
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_request_id ON audit_logs(request_id);

-- 系統設定索引
CREATE INDEX IF NOT EXISTS idx_system_settings_setting_key ON system_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);
CREATE INDEX IF NOT EXISTS idx_system_settings_is_public ON system_settings(is_public);

-- 複合索引
CREATE INDEX IF NOT EXISTS idx_workflows_user_status ON workflows(user_id, status);
CREATE INDEX IF NOT EXISTS idx_workflows_user_active ON workflows(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_executions_workflow_status ON workflow_executions(workflow_id, status);
CREATE INDEX IF NOT EXISTS idx_executions_user_started ON workflow_executions(user_id, started_at);
CREATE INDEX IF NOT EXISTS idx_payment_records_service_status ON payment_records(service_type, status);

-- 建立約束條件

-- 使用者偏好設定約束
ALTER TABLE user_preferences
ADD CONSTRAINT chk_theme CHECK (theme IN ('light', 'dark', 'auto'));

ALTER TABLE user_preferences
ADD CONSTRAINT chk_default_workflow_privacy CHECK (default_workflow_privacy IN ('private', 'public', 'team'));

-- 工作流約束
ALTER TABLE workflows
ADD CONSTRAINT chk_version CHECK (version > 0);

-- 工作流版本約束
ALTER TABLE workflow_versions
ADD CONSTRAINT chk_version_number CHECK (version_number > 0);

-- 金流記錄約束
ALTER TABLE payment_records
ADD CONSTRAINT chk_amount CHECK (amount > 0);

ALTER TABLE payment_records
ADD CONSTRAINT chk_currency CHECK (currency IN ('TWD', 'USD', 'EUR', 'JPY', 'CNY'));

ALTER TABLE payment_records
ADD CONSTRAINT chk_status CHECK (status IN ('pending', 'success', 'failed', 'cancelled', 'refunded'));

-- Webhook 端點約束
ALTER TABLE webhook_endpoints
ADD CONSTRAINT chk_method CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH'));

-- 系統設定約束
ALTER TABLE system_settings
ADD CONSTRAINT chk_setting_type CHECK (setting_type IN ('string', 'integer', 'boolean', 'json', 'float'));

-- 建立觸發器函數

-- 更新 updated_at 欄位的觸發器函數
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 為需要的表格建立 updated_at 觸發器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nodes_updated_at BEFORE UPDATE ON nodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_taiwan_services_updated_at BEFORE UPDATE ON taiwan_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_records_updated_at BEFORE UPDATE ON payment_records
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_endpoints_updated_at BEFORE UPDATE ON webhook_endpoints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_templates_updated_at BEFORE UPDATE ON workflow_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 統計更新觸發器函數
CREATE OR REPLACE FUNCTION update_workflow_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- 更新工作流執行統計
        UPDATE workflows
        SET execution_count = execution_count + 1,
            last_executed_at = NEW.started_at
        WHERE id = NEW.workflow_id;

        -- 更新使用者統計
        UPDATE user_profiles
        SET execution_count = execution_count + 1
        WHERE user_id = NEW.user_id;

        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- 當執行狀態更新時，更新成功/失敗統計
        IF OLD.status != NEW.status AND NEW.status IN ('success', 'failed') THEN
            IF NEW.status = 'success' THEN
                UPDATE workflows
                SET success_count = success_count + 1
                WHERE id = NEW.workflow_id;
            ELSIF NEW.status = 'failed' THEN
                UPDATE workflows
                SET failure_count = failure_count + 1
                WHERE id = NEW.workflow_id;
            END IF;
        END IF;

        RETURN NEW;
    END IF;

    RETURN NULL;
END;
$$ language 'plpgsql';

-- 建立工作流統計觸發器
CREATE TRIGGER update_workflow_execution_stats
    AFTER INSERT OR UPDATE ON workflow_executions
    FOR EACH ROW EXECUTE FUNCTION update_workflow_stats();
