#!/usr/bin/env python3

"""
資料庫管理工具
提供資料庫初始化、遷移、種子資料等功能
"""

import os
import sys
import asyncio
import subprocess
from pathlib import Path
from typing import Optional

# 添加 app 目錄到 Python 路徑
sys.path.insert(0, str(Path(__file__).parent.parent / "app"))

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import logging

from app.core.config import settings
from app.core.database import Base, engine
from app.models import user, workflow, node  # 匯入所有模型

logger = logging.getLogger(__name__)


class DatabaseManager:
    """
    資料庫管理器
    """
    
    def __init__(self):
        self.engine = engine
        self.db_url = settings.DATABASE_URL
        self.script_dir = Path(__file__).parent
    
    def create_database(self, db_name: Optional[str] = None):
        """
        建立資料庫
        """
        if db_name is None:
            # 從 DATABASE_URL 提取資料庫名稱
            db_name = self.db_url.split('/')[-1]
        
        # 連接到 postgres 資料庫來建立新資料庫
        admin_url = self.db_url.rsplit('/', 1)[0] + '/postgres'
        admin_engine = create_engine(admin_url)
        
        try:
            with admin_engine.connect() as conn:
                # 設定自動提交模式
                conn.execute(text("COMMIT"))
                
                # 檢查資料庫是否已存在
                result = conn.execute(
                    text("SELECT 1 FROM pg_database WHERE datname = :db_name"),
                    {"db_name": db_name}
                )
                
                if not result.fetchone():
                    # 建立資料庫
                    conn.execute(text(f"CREATE DATABASE {db_name}"))
                    print(f"✅ 資料庫 '{db_name}' 建立成功")
                else:
                    print(f"ℹ️  資料庫 '{db_name}' 已存在")
                    
        except Exception as e:
            print(f"❌ 建立資料庫失敗: {e}")
            raise
        finally:
            admin_engine.dispose()
    
    def drop_database(self, db_name: Optional[str] = None):
        """
        刪除資料庫
        """
        if db_name is None:
            db_name = self.db_url.split('/')[-1]
        
        admin_url = self.db_url.rsplit('/', 1)[0] + '/postgres'
        admin_engine = create_engine(admin_url)
        
        try:
            with admin_engine.connect() as conn:
                conn.execute(text("COMMIT"))
                
                # 終止所有連線
                conn.execute(text(f"""
                    SELECT pg_terminate_backend(pid)
                    FROM pg_stat_activity
                    WHERE datname = '{db_name}' AND pid <> pg_backend_pid()
                """))
                
                # 刪除資料庫
                conn.execute(text(f"DROP DATABASE IF EXISTS {db_name}"))
                print(f"✅ 資料庫 '{db_name}' 刪除成功")
                
        except Exception as e:
            print(f"❌ 刪除資料庫失敗: {e}")
            raise
        finally:
            admin_engine.dispose()
    
    def init_schema(self):
        """
        初始化資料庫 Schema
        """
        try:
            print("🔧 正在初始化資料庫 Schema...")
            
            # 使用 SQLAlchemy 建立所有表格
            Base.metadata.create_all(bind=self.engine)
            
            print("✅ 資料庫 Schema 初始化成功")
            
        except Exception as e:
            print(f"❌ 初始化 Schema 失敗: {e}")
            raise
    
    def run_sql_script(self, script_path: str):
        """
        執行 SQL 腳本
        """
        script_file = self.script_dir / script_path
        
        if not script_file.exists():
            raise FileNotFoundError(f"SQL 腳本不存在: {script_file}")
        
        try:
            print(f"📜 正在執行 SQL 腳本: {script_path}")
            
            with open(script_file, 'r', encoding='utf-8') as f:
                sql_content = f.read()
            
            # 分割 SQL 語句並執行
            with self.engine.connect() as conn:
                # 開始事務
                trans = conn.begin()
                try:
                    # 執行 SQL 內容
                    conn.execute(text(sql_content))
                    trans.commit()
                    print(f"✅ SQL 腳本執行成功: {script_path}")
                except Exception as e:
                    trans.rollback()
                    raise e
                    
        except Exception as e:
            print(f"❌ 執行 SQL 腳本失敗: {e}")
            raise
    
    def load_seed_data(self):
        """
        載入種子資料
        """
        try:
            print("🌱 正在載入種子資料...")
            self.run_sql_script("seed_data.sql")
            print("✅ 種子資料載入成功")
            
        except Exception as e:
            print(f"❌ 載入種子資料失敗: {e}")
            raise
    
    def reset_database(self):
        """
        重置資料庫（刪除並重新建立）
        """
        try:
            print("🔄 正在重置資料庫...")
            
            # 刪除所有表格
            Base.metadata.drop_all(bind=self.engine)
            print("🗑️  已刪除所有表格")
            
            # 重新建立 Schema
            self.init_schema()
            
            # 載入種子資料
            self.load_seed_data()
            
            print("✅ 資料庫重置完成")
            
        except Exception as e:
            print(f"❌ 重置資料庫失敗: {e}")
            raise
    
    def check_connection(self):
        """
        檢查資料庫連線
        """
        try:
            with self.engine.connect() as conn:
                result = conn.execute(text("SELECT version()"))
                version = result.fetchone()[0]
                print(f"✅ 資料庫連線成功")
                print(f"📊 PostgreSQL 版本: {version}")
                return True
                
        except Exception as e:
            print(f"❌ 資料庫連線失敗: {e}")
            return False
    
    def get_table_info(self):
        """
        取得資料表資訊
        """
        try:
            with self.engine.connect() as conn:
                # 查詢所有表格
                result = conn.execute(text("""
                    SELECT table_name, 
                           (SELECT COUNT(*) FROM information_schema.columns 
                            WHERE table_name = t.table_name) as column_count
                    FROM information_schema.tables t
                    WHERE table_schema = 'public'
                    ORDER BY table_name
                """))
                
                tables = result.fetchall()
                
                print("📋 資料表資訊:")
                print("-" * 40)
                for table_name, column_count in tables:
                    print(f"  {table_name}: {column_count} 個欄位")
                
                return tables
                
        except Exception as e:
            print(f"❌ 取得資料表資訊失敗: {e}")
            return []


def main():
    """
    主函數 - 命令列介面
    """
    import argparse
    
    parser = argparse.ArgumentParser(description="資料庫管理工具")
    parser.add_argument("command", choices=[
        "create", "drop", "init", "seed", "reset", "check", "info"
    ], help="要執行的命令")
    parser.add_argument("--db-name", help="資料庫名稱")
    
    args = parser.parse_args()
    
    # 設定日誌
    logging.basicConfig(level=logging.INFO)
    
    # 建立資料庫管理器
    db_manager = DatabaseManager()
    
    try:
        if args.command == "create":
            db_manager.create_database(args.db_name)
        elif args.command == "drop":
            db_manager.drop_database(args.db_name)
        elif args.command == "init":
            db_manager.init_schema()
        elif args.command == "seed":
            db_manager.load_seed_data()
        elif args.command == "reset":
            db_manager.reset_database()
        elif args.command == "check":
            db_manager.check_connection()
        elif args.command == "info":
            db_manager.get_table_info()
            
    except Exception as e:
        print(f"❌ 命令執行失敗: {e}")
        sys.exit(1)
    
    print("🎉 命令執行完成")


if __name__ == "__main__":
    main()
