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
