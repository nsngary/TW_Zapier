#!/usr/bin/env python3

"""
資料庫 Schema 驗證腳本
驗證 SQLAlchemy 模型定義和資料庫設計
"""

import sys
import os
from pathlib import Path

# 添加 app 目錄到 Python 路徑
sys.path.insert(0, str(Path(__file__).parent.parent / "app"))

import logging

# 設定日誌
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def test_model_imports():
    """測試模型匯入"""
    print("🔍 測試 1: SQLAlchemy 模型匯入測試")
    
    try:
        # 測試使用者模型
        from app.models.user import User, UserProfile, UserPreferences, ApiKey, AuditLog
        print("✅ 使用者相關模型匯入成功")
        
        # 測試工作流模型
        from app.models.workflow import (
            Workflow, WorkflowVersion, WorkflowExecution, 
            WorkflowTemplate, WebhookEndpoint, WorkflowStatus, ExecutionStatus
        )
        print("✅ 工作流相關模型匯入成功")
        
        # 測試節點模型
        from app.models.node import (
            NodeType, Node, TaiwanService, PaymentRecord, SystemSetting
        )
        print("✅ 節點和服務相關模型匯入成功")
        
        return True
        
    except ImportError as e:
        print(f"❌ 模型匯入失敗: {e}")
        return False
    except Exception as e:
        print(f"❌ 未預期的錯誤: {e}")
        return False


def test_model_relationships():
    """測試模型關聯"""
    print("\n🔍 測試 2: 模型關聯測試")
    
    try:
        from app.models.user import User
        from app.models.workflow import Workflow
        
        # 檢查 User 模型的關聯
        user_relationships = [
            'profile', 'preferences', 'workflows', 
            'workflow_executions', 'api_keys', 'audit_logs', 'webhook_endpoints'
        ]
        
        for rel in user_relationships:
            if hasattr(User, rel):
                print(f"✅ User.{rel} 關聯存在")
            else:
                print(f"❌ User.{rel} 關聯不存在")
                return False
        
        # 檢查 Workflow 模型的關聯
        workflow_relationships = [
            'user', 'versions', 'executions', 'webhook_endpoints'
        ]
        
        for rel in workflow_relationships:
            if hasattr(Workflow, rel):
                print(f"✅ Workflow.{rel} 關聯存在")
            else:
                print(f"❌ Workflow.{rel} 關聯不存在")
                return False
        
        return True
        
    except Exception as e:
        print(f"❌ 模型關聯測試失敗: {e}")
        return False


def test_model_attributes():
    """測試模型屬性"""
    print("\n🔍 測試 3: 模型屬性測試")
    
    try:
        from app.models.user import User
        from app.models.workflow import Workflow
        from app.models.node import NodeType
        
        # 檢查 User 模型的核心屬性
        user_attributes = [
            'id', 'email', 'hashed_password', 'full_name', 
            'is_active', 'is_superuser', 'created_at', 'updated_at'
        ]
        
        for attr in user_attributes:
            if hasattr(User, attr):
                print(f"✅ User.{attr} 屬性存在")
            else:
                print(f"❌ User.{attr} 屬性不存在")
                return False
        
        # 檢查 Workflow 模型的核心屬性
        workflow_attributes = [
            'id', 'user_id', 'name', 'description', 'status', 
            'nodes', 'edges', 'settings', 'created_at', 'updated_at'
        ]
        
        for attr in workflow_attributes:
            if hasattr(Workflow, attr):
                print(f"✅ Workflow.{attr} 屬性存在")
            else:
                print(f"❌ Workflow.{attr} 屬性不存在")
                return False
        
        # 檢查 NodeType 模型的核心屬性
        nodetype_attributes = [
            'id', 'name', 'display_name', 'category', 
            'is_taiwan_service', 'service_provider'
        ]
        
        for attr in nodetype_attributes:
            if hasattr(NodeType, attr):
                print(f"✅ NodeType.{attr} 屬性存在")
            else:
                print(f"❌ NodeType.{attr} 屬性不存在")
                return False
        
        return True
        
    except Exception as e:
        print(f"❌ 模型屬性測試失敗: {e}")
        return False


def test_enum_definitions():
    """測試枚舉定義"""
    print("\n🔍 測試 4: 枚舉定義測試")
    
    try:
        from app.models.workflow import WorkflowStatus, ExecutionStatus
        
        # 檢查 WorkflowStatus 枚舉
        expected_workflow_statuses = ['DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED']
        for status in expected_workflow_statuses:
            if hasattr(WorkflowStatus, status):
                print(f"✅ WorkflowStatus.{status} 存在")
            else:
                print(f"❌ WorkflowStatus.{status} 不存在")
                return False
        
        # 檢查 ExecutionStatus 枚舉
        expected_execution_statuses = ['PENDING', 'RUNNING', 'SUCCESS', 'FAILED', 'CANCELLED', 'TIMEOUT']
        for status in expected_execution_statuses:
            if hasattr(ExecutionStatus, status):
                print(f"✅ ExecutionStatus.{status} 存在")
            else:
                print(f"❌ ExecutionStatus.{status} 不存在")
                return False
        
        return True
        
    except Exception as e:
        print(f"❌ 枚舉定義測試失敗: {e}")
        return False


def test_database_base():
    """測試資料庫基礎設定"""
    print("\n🔍 測試 5: 資料庫基礎設定測試")
    
    try:
        from app.core.database import Base, get_db
        
        # 檢查 Base 類別
        if Base:
            print("✅ SQLAlchemy Base 類別存在")
        else:
            print("❌ SQLAlchemy Base 類別不存在")
            return False
        
        # 檢查 get_db 函數
        if callable(get_db):
            print("✅ get_db 依賴注入函數存在")
        else:
            print("❌ get_db 依賴注入函數不存在")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ 資料庫基礎設定測試失敗: {e}")
        return False


def test_sql_scripts():
    """測試 SQL 腳本"""
    print("\n🔍 測試 6: SQL 腳本測試")
    
    try:
        script_dir = Path(__file__).parent
        
        # 檢查初始化腳本
        init_script = script_dir / "init.sql"
        if init_script.exists():
            print("✅ init.sql 腳本存在")
            
            # 檢查腳本內容
            with open(init_script, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if 'CREATE TABLE' in content:
                print("✅ init.sql 包含 CREATE TABLE 語句")
            else:
                print("❌ init.sql 不包含 CREATE TABLE 語句")
                return False
                
            if 'CREATE INDEX' in content:
                print("✅ init.sql 包含 CREATE INDEX 語句")
            else:
                print("⚠️  init.sql 不包含 CREATE INDEX 語句")
        else:
            print("❌ init.sql 腳本不存在")
            return False
        
        # 檢查種子資料腳本
        seed_script = script_dir / "seed_data.sql"
        if seed_script.exists():
            print("✅ seed_data.sql 腳本存在")
            
            with open(seed_script, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if 'INSERT INTO' in content:
                print("✅ seed_data.sql 包含 INSERT INTO 語句")
            else:
                print("❌ seed_data.sql 不包含 INSERT INTO 語句")
                return False
        else:
            print("❌ seed_data.sql 腳本不存在")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ SQL 腳本測試失敗: {e}")
        return False


def test_database_manager():
    """測試資料庫管理工具"""
    print("\n🔍 測試 7: 資料庫管理工具測試")
    
    try:
        script_dir = Path(__file__).parent
        
        # 檢查資料庫管理器
        db_manager_script = script_dir / "db_manager.py"
        if db_manager_script.exists():
            print("✅ db_manager.py 存在")
        else:
            print("❌ db_manager.py 不存在")
            return False
        
        # 檢查 README 文件
        readme_file = script_dir / "README.md"
        if readme_file.exists():
            print("✅ README.md 文件存在")
            
            with open(readme_file, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if '資料庫設計文件' in content:
                print("✅ README.md 包含資料庫設計文件")
            else:
                print("❌ README.md 不包含資料庫設計文件")
                return False
        else:
            print("❌ README.md 文件不存在")
            return False
        
        return True
        
    except Exception as e:
        print(f"❌ 資料庫管理工具測試失敗: {e}")
        return False


async def main():
    """主測試函數"""
    print("🚀 開始資料庫 Schema 設計驗證")
    print("=" * 50)
    
    test_functions = [
        ("SQLAlchemy 模型匯入", test_model_imports),
        ("模型關聯", test_model_relationships),
        ("模型屬性", test_model_attributes),
        ("枚舉定義", test_enum_definitions),
        ("資料庫基礎設定", test_database_base),
        ("SQL 腳本", test_sql_scripts),
        ("資料庫管理工具", test_database_manager)
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
        print("🎉 所有測試通過！資料庫 Schema 設計驗證成功")
        return 0
    else:
        print("⚠️  部分測試失敗，但核心設計已完成")
        return 1


if __name__ == "__main__":
    import asyncio
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
