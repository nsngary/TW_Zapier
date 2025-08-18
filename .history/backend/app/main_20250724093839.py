"""
台灣在地化流程自動化平台 - FastAPI 主應用程式
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings

# 建立 FastAPI 應用實例
app = FastAPI(
    title=settings.APP_NAME,
    description="專為台灣情境設計的可視化低程式碼流程自動化平台",
    version=settings.APP_VERSION,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# CORS 中介軟體設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """根路徑 - 系統狀態檢查"""
    return JSONResponse(
        content={
            "message": "台灣在地化流程自動化平台 API",
            "version": settings.APP_VERSION,
            "status": "running",
            "environment": settings.ENVIRONMENT,
        }
    )


@app.get("/health")
async def health_check():
    """健康檢查端點"""
    return JSONResponse(
        content={
            "status": "healthy",
            "timestamp": "2024-01-01T00:00:00Z",  # 實際應用中應使用真實時間戳
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host=settings.BACKEND_HOST,
        port=settings.BACKEND_PORT,
        reload=settings.BACKEND_RELOAD,
    )
