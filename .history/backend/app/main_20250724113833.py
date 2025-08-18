"""
台灣在地化流程自動化平台 - FastAPI 主應用程式
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

from app.core.config import settings
from app.core.logging import setup_logging
from app.core.database import init_db, close_db
from app.core.redis import init_redis, close_redis
from app.core.exceptions import (
    TaiwanZapierException,
    taiwan_zapier_exception_handler,
    http_exception_handler,
    validation_exception_handler,
    general_exception_handler
)
from app.core.middleware import (
    RequestLoggingMiddleware,
    RateLimitMiddleware,
    SecurityHeadersMiddleware,
    CacheControlMiddleware,
    DatabaseMiddleware
)
from app.api.v1.api import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    應用程式生命週期管理
    """
    # 啟動時執行
    setup_logging()
    logger = logging.getLogger("app.main")

    try:
        logger.info("正在初始化應用程式...")

        # 初始化資料庫
        await init_db()
        logger.info("資料庫初始化完成")

        # 初始化 Redis
        await init_redis()
        logger.info("Redis 初始化完成")

        logger.info("應用程式啟動完成")

    except Exception as e:
        logger.error(f"應用程式初始化失敗: {e}")
        raise

    yield

    # 關閉時執行
    try:
        logger.info("正在關閉應用程式...")

        # 關閉 Redis 連線
        await close_redis()
        logger.info("Redis 連線已關閉")

        # 關閉資料庫連線
        await close_db()
        logger.info("資料庫連線已關閉")

        logger.info("應用程式關閉完成")

    except Exception as e:
        logger.error(f"應用程式關閉時發生錯誤: {e}")


# 建立 FastAPI 應用程式實例
app = FastAPI(
    title=settings.APP_NAME,
    description="專為台灣情境設計的可視化低程式碼流程自動化平台，提供 Line Pay、綠界科技、桃機航班等在地化節點",
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
    lifespan=lifespan
)

# 註冊例外處理器
app.add_exception_handler(TaiwanZapierException, taiwan_zapier_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# 添加中介軟體（順序很重要）
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(CacheControlMiddleware)
app.add_middleware(DatabaseMiddleware)

# 速率限制中介軟體
if settings.ENABLE_RATE_LIMITING:
    app.add_middleware(
        RateLimitMiddleware,
        calls_per_minute=settings.RATE_LIMIT_PER_MINUTE
    )

# CORS 中介軟體設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含 API 路由
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """
    根路徑 - 系統狀態檢查
    """
    return JSONResponse(
        content={
            "message": "台灣在地化流程自動化平台 API",
            "version": settings.APP_VERSION,
            "status": "running",
            "environment": settings.ENVIRONMENT,
            "docs_url": "/docs" if settings.DEBUG else None,
            "features": [
                "Line Pay 金流整合",
                "綠界科技金流整合",
                "桃園機場航班資訊",
                "政府開放資料整合",
                "n8n 工作流引擎",
                "拖拉式工作流編輯器"
            ]
        }
    )


@app.get("/health")
async def basic_health():
    """
    基礎健康檢查端點
    """
    return JSONResponse(
        content={
            "status": "healthy",
            "timestamp": "2024-01-01T00:00:00Z",
            "service": "台灣在地化流程自動化平台",
            "version": settings.APP_VERSION
        }
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=settings.BACKEND_RELOAD,
        log_level=settings.LOG_LEVEL.lower(),
        access_log=True
    )
