"""
資料庫連線和 SQLAlchemy 設定
"""

from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

# 建立資料庫引擎
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=10,
    max_overflow=20,
    echo=settings.DEBUG,  # 在除錯模式下顯示 SQL 查詢
)

# 建立 SessionLocal 類別
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 建立 Base 類別
Base = declarative_base()

# 設定 metadata 命名慣例
metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s"
    }
)
Base.metadata = metadata


def get_db():
    """
    取得資料庫 session 的依賴注入函數
    """
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"資料庫操作錯誤: {e}")
        db.rollback()
        raise
    finally:
        db.close()


async def init_db():
    """
    初始化資料庫
    """
    try:
        # 建立所有表格
        Base.metadata.create_all(bind=engine)
        logger.info("資料庫初始化完成")
    except Exception as e:
        logger.error(f"資料庫初始化失敗: {e}")
        raise


async def close_db():
    """
    關閉資料庫連線
    """
    try:
        engine.dispose()
        logger.info("資料庫連線已關閉")
    except Exception as e:
        logger.error(f"關閉資料庫連線時發生錯誤: {e}")


def check_db_connection():
    """
    檢查資料庫連線狀態
    """
    try:
        with engine.connect() as connection:
            connection.execute("SELECT 1")
        return True
    except Exception as e:
        logger.error(f"資料庫連線檢查失敗: {e}")
        return False
