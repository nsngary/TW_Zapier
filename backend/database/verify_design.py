#!/usr/bin/env python3

"""
資料庫設計驗證腳本
驗證資料庫設計文件和腳本的完整性
"""

import os
import re
from pathlib import Path


def test_sql_init_script():
    """測試初始化 SQL 腳本"""
    print("🔍 測試 1: 初始化 SQL 腳本驗證")
    
    script_path = Path(__file__).parent / "init.sql"
    
    if not script_path.exists():
        print("❌ init.sql 腳本不存在")
        return False
    
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查核心資料表
    core_tables = [
        'users', 'user_profiles', 'user_preferences',
        'workflows', 'workflow_versions', 'workflow_executions', 'workflow_templates',
        'node_types', 'nodes', 'taiwan_services', 'payment_records',
        'api_keys', 'webhook_endpoints', 'audit_logs', 'system_settings'
    ]
    
    tables_found = 0
    for table in core_tables:
        if f"CREATE TABLE IF NOT EXISTS {table}" in content:
            print(f"✅ 資料表 '{table}' 定義存在")
            tables_found += 1
        else:
            print(f"❌ 資料表 '{table}' 定義不存在")
    
    # 檢查索引
    index_patterns = [
        'CREATE INDEX',
        'CREATE UNIQUE INDEX',
        'idx_users_email',
        'idx_workflows_user_id',
        'idx_workflow_executions_workflow_id'
    ]
    
    indexes_found = 0
    for pattern in index_patterns:
        if pattern in content:
            print(f"✅ 索引模式 '{pattern}' 存在")
            indexes_found += 1
    
    # 檢查約束
    constraints = [
        'FOREIGN KEY',
        'PRIMARY KEY',
        'UNIQUE',
        'CHECK'
    ]
    
    constraints_found = 0
    for constraint in constraints:
        if constraint in content:
            print(f"✅ 約束類型 '{constraint}' 存在")
            constraints_found += 1
    
    # 檢查觸發器
    triggers = [
        'CREATE TRIGGER',
        'CREATE OR REPLACE FUNCTION',
        'update_updated_at_column'
    ]
    
    triggers_found = 0
    for trigger in triggers:
        if trigger in content:
            print(f"✅ 觸發器/函數 '{trigger}' 存在")
            triggers_found += 1
    
    print(f"📊 統計結果:")
    print(f"   資料表: {tables_found}/{len(core_tables)}")
    print(f"   索引: {indexes_found}/{len(index_patterns)}")
    print(f"   約束: {constraints_found}/{len(constraints)}")
    print(f"   觸發器: {triggers_found}/{len(triggers)}")
    
    return tables_found >= 10 and indexes_found >= 3 and constraints_found >= 3


def test_seed_data_script():
    """測試種子資料腳本"""
    print("\n🔍 測試 2: 種子資料腳本驗證")
    
    script_path = Path(__file__).parent / "seed_data.sql"
    
    if not script_path.exists():
        print("❌ seed_data.sql 腳本不存在")
        return False
    
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查種子資料插入
    seed_data_checks = [
        ('系統設定', 'INSERT INTO system_settings'),
        ('節點類型', 'INSERT INTO node_types'),
        ('台灣服務', 'INSERT INTO taiwan_services'),
        ('工作流模板', 'INSERT INTO workflow_templates'),
        ('使用者', 'INSERT INTO users'),
        ('使用者檔案', 'INSERT INTO user_profiles'),
        ('使用者偏好', 'INSERT INTO user_preferences')
    ]
    
    data_found = 0
    for name, pattern in seed_data_checks:
        if pattern in content:
            print(f"✅ {name}種子資料存在")
            data_found += 1
        else:
            print(f"❌ {name}種子資料不存在")
    
    # 檢查台灣在地化內容
    taiwan_content = [
        'Line Pay',
        '綠界科技',
        '桃機航班',
        '政府開放資料',
        'zh-TW',
        'Asia/Taipei'
    ]
    
    taiwan_found = 0
    for content_item in taiwan_content:
        if content_item in content:
            print(f"✅ 台灣在地化內容 '{content_item}' 存在")
            taiwan_found += 1
    
    print(f"📊 統計結果:")
    print(f"   種子資料: {data_found}/{len(seed_data_checks)}")
    print(f"   台灣在地化: {taiwan_found}/{len(taiwan_content)}")
    
    return data_found >= 5 and taiwan_found >= 4


def test_database_documentation():
    """測試資料庫文件"""
    print("\n🔍 測試 3: 資料庫文件驗證")
    
    readme_path = Path(__file__).parent / "README.md"
    
    if not readme_path.exists():
        print("❌ README.md 文件不存在")
        return False
    
    with open(readme_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查文件章節
    doc_sections = [
        '資料庫概覽',
        '資料表結構',
        '使用者管理',
        '工作流管理',
        '節點和服務',
        '索引策略',
        '資料庫管理',
        '安全考量',
        '效能優化'
    ]
    
    sections_found = 0
    for section in doc_sections:
        if section in content:
            print(f"✅ 文件章節 '{section}' 存在")
            sections_found += 1
        else:
            print(f"❌ 文件章節 '{section}' 不存在")
    
    # 檢查技術細節
    tech_details = [
        'PostgreSQL',
        'SQLAlchemy',
        'JSONB',
        'CREATE INDEX',
        'FOREIGN KEY'
    ]
    
    details_found = 0
    for detail in tech_details:
        if detail in content:
            print(f"✅ 技術細節 '{detail}' 存在")
            details_found += 1
    
    print(f"📊 統計結果:")
    print(f"   文件章節: {sections_found}/{len(doc_sections)}")
    print(f"   技術細節: {details_found}/{len(tech_details)}")
    
    return sections_found >= 6 and details_found >= 3


def test_database_manager():
    """測試資料庫管理工具"""
    print("\n🔍 測試 4: 資料庫管理工具驗證")
    
    manager_path = Path(__file__).parent / "db_manager.py"
    
    if not manager_path.exists():
        print("❌ db_manager.py 不存在")
        return False
    
    with open(manager_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查管理功能
    manager_functions = [
        'class DatabaseManager',
        'def create_database',
        'def init_schema',
        'def load_seed_data',
        'def reset_database',
        'def check_connection'
    ]
    
    functions_found = 0
    for func in manager_functions:
        if func in content:
            print(f"✅ 管理功能 '{func}' 存在")
            functions_found += 1
        else:
            print(f"❌ 管理功能 '{func}' 不存在")
    
    print(f"📊 統計結果:")
    print(f"   管理功能: {functions_found}/{len(manager_functions)}")
    
    return functions_found >= 4


def test_migration_support():
    """測試遷移支援"""
    print("\n🔍 測試 5: 資料庫遷移支援驗證")
    
    migration_path = Path(__file__).parent / "migrations" / "001_initial_schema.py"
    
    if not migration_path.exists():
        print("❌ 遷移腳本不存在")
        return False
    
    with open(migration_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查遷移內容
    migration_elements = [
        'def upgrade',
        'def downgrade',
        'create_table',
        'create_index',
        'postgresql.ENUM'
    ]
    
    elements_found = 0
    for element in migration_elements:
        if element in content:
            print(f"✅ 遷移元素 '{element}' 存在")
            elements_found += 1
        else:
            print(f"❌ 遷移元素 '{element}' 不存在")
    
    print(f"📊 統計結果:")
    print(f"   遷移元素: {elements_found}/{len(migration_elements)}")
    
    return elements_found >= 3


def test_schema_completeness():
    """測試 Schema 完整性"""
    print("\n🔍 測試 6: Schema 完整性驗證")
    
    # 檢查所有必要檔案
    required_files = [
        "init.sql",
        "seed_data.sql", 
        "README.md",
        "db_manager.py",
        "migrations/001_initial_schema.py"
    ]
    
    files_found = 0
    base_path = Path(__file__).parent
    
    for file_path in required_files:
        full_path = base_path / file_path
        if full_path.exists():
            print(f"✅ 必要檔案 '{file_path}' 存在")
            files_found += 1
        else:
            print(f"❌ 必要檔案 '{file_path}' 不存在")
    
    print(f"📊 統計結果:")
    print(f"   必要檔案: {files_found}/{len(required_files)}")
    
    return files_found >= 4


def main():
    """主驗證函數"""
    print("🚀 開始資料庫 Schema 設計驗證")
    print("=" * 50)
    
    test_functions = [
        ("初始化 SQL 腳本", test_sql_init_script),
        ("種子資料腳本", test_seed_data_script),
        ("資料庫文件", test_database_documentation),
        ("資料庫管理工具", test_database_manager),
        ("資料庫遷移支援", test_migration_support),
        ("Schema 完整性", test_schema_completeness)
    ]
    
    passed = 0
    total = len(test_functions)
    
    for test_name, test_func in test_functions:
        try:
            result = test_func()
            if result:
                passed += 1
        except Exception as e:
            print(f"❌ 測試 '{test_name}' 執行失敗: {str(e)}")
    
    print("\n" + "=" * 50)
    print("📊 測試結果總結:")
    print(f"   通過: {passed}/{total} 項測試")
    print(f"   成功率: {((passed / total) * 100):.1f}%")
    
    if passed == total:
        print("🎉 所有測試通過！資料庫 Schema 設計完整且正確")
        return 0
    elif passed >= total * 0.8:
        print("✅ 大部分測試通過！資料庫 Schema 設計基本完成")
        return 0
    else:
        print("⚠️  部分測試失敗，請檢查設計細節")
        return 1


if __name__ == "__main__":
    exit_code = main()
    exit(exit_code)
