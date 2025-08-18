#!/bin/bash
set -e

# 建立多個資料庫的初始化腳本

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- 建立 n8n 資料庫
    CREATE DATABASE n8n_db;
    GRANT ALL PRIVILEGES ON DATABASE n8n_db TO $POSTGRES_USER;
    
    -- 建立測試資料庫
    CREATE DATABASE tw_zapier_test_db;
    GRANT ALL PRIVILEGES ON DATABASE tw_zapier_test_db TO $POSTGRES_USER;
    
    -- 顯示建立的資料庫
    \l
EOSQL

echo "✅ 多個資料庫建立完成"
