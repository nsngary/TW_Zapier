-- 台灣在地化流程自動化平台 - 資料庫初始化腳本

-- 建立 n8n 資料庫 (n8n 需要獨立的資料庫)
CREATE DATABASE n8n_db;

-- 建立測試資料庫
CREATE DATABASE tw_zapier_test_db;

-- 為主資料庫設定註解
COMMENT ON DATABASE tw_zapier_db IS '台灣在地化流程自動化平台主資料庫';
COMMENT ON DATABASE n8n_db IS 'n8n 工作流引擎資料庫';
COMMENT ON DATABASE tw_zapier_test_db IS '測試環境資料庫';

-- 確保使用者對所有資料庫都有權限
GRANT ALL PRIVILEGES ON DATABASE tw_zapier_db TO tw_zapier;
GRANT ALL PRIVILEGES ON DATABASE n8n_db TO tw_zapier;
GRANT ALL PRIVILEGES ON DATABASE tw_zapier_test_db TO tw_zapier;

-- 連線到主資料庫進行初始設定
\c tw_zapier_db;

-- 啟用必要的擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 建立基本的 schema
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS audit;

-- 設定時區為台北時間
SET timezone = 'Asia/Taipei';

-- 建立審計日誌表 (用於追蹤資料變更)
CREATE TABLE IF NOT EXISTS audit.activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    user_id UUID,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET
);

-- 建立審計日誌索引
CREATE INDEX IF NOT EXISTS idx_activity_log_table_name ON audit.activity_log(table_name);
CREATE INDEX IF NOT EXISTS idx_activity_log_timestamp ON audit.activity_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON audit.activity_log(user_id);

-- 建立審計觸發器函數
CREATE OR REPLACE FUNCTION audit.log_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit.activity_log (table_name, operation, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit.activity_log (table_name, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit.activity_log (table_name, operation, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 輸出初始化完成訊息
DO $$
BEGIN
    RAISE NOTICE '台灣在地化流程自動化平台資料庫初始化完成';
    RAISE NOTICE '主資料庫: tw_zapier_db';
    RAISE NOTICE 'n8n資料庫: n8n_db';
    RAISE NOTICE '測試資料庫: tw_zapier_test_db';
    RAISE NOTICE '時區設定: Asia/Taipei';
END $$;
