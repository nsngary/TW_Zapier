"""
健康檢查 API 端點
"""

from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import logging

from app.core.database import get_db, check_db_connection
from app.core.redis import check_redis_connection
from app.services.n8n_service import N8nService

router = APIRouter()
logger = logging.getLogger("app.api.health")


@router.get("/")
async def basic_health_check():
    """
    基礎健康檢查
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "service": "台灣在地化流程自動化平台",
        "version": "1.0.0"
    }


@router.get("/detailed")
async def detailed_health_check(db: Session = Depends(get_db)):
    """
    詳細健康檢查，包含所有依賴服務
    """
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "service": "台灣在地化流程自動化平台",
        "version": "1.0.0",
        "checks": {}
    }
    
    overall_healthy = True
    
    # 檢查資料庫連線
    try:
        db_healthy = check_db_connection()
        health_status["checks"]["database"] = {
            "status": "healthy" if db_healthy else "unhealthy",
            "message": "資料庫連線正常" if db_healthy else "資料庫連線失敗"
        }
        if not db_healthy:
            overall_healthy = False
    except Exception as e:
        health_status["checks"]["database"] = {
            "status": "unhealthy",
            "message": f"資料庫檢查失敗: {str(e)}"
        }
        overall_healthy = False
    
    # 檢查 Redis 連線
    try:
        redis_healthy = await check_redis_connection()
        health_status["checks"]["redis"] = {
            "status": "healthy" if redis_healthy else "unhealthy",
            "message": "Redis 連線正常" if redis_healthy else "Redis 連線失敗"
        }
        if not redis_healthy:
            overall_healthy = False
    except Exception as e:
        health_status["checks"]["redis"] = {
            "status": "unhealthy",
            "message": f"Redis 檢查失敗: {str(e)}"
        }
        overall_healthy = False
    
    # 檢查 n8n 服務
    try:
        n8n_service = N8nService()
        n8n_healthy = await n8n_service.health_check()
        health_status["checks"]["n8n"] = {
            "status": "healthy" if n8n_healthy else "unhealthy",
            "message": "n8n 服務正常" if n8n_healthy else "n8n 服務無法連線"
        }
        if not n8n_healthy:
            overall_healthy = False
    except Exception as e:
        health_status["checks"]["n8n"] = {
            "status": "unhealthy",
            "message": f"n8n 檢查失敗: {str(e)}"
        }
        overall_healthy = False
    
    # 設定整體狀態
    health_status["status"] = "healthy" if overall_healthy else "unhealthy"
    
    # 如果有服務不健康，返回 503 狀態碼
    if not overall_healthy:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=health_status
        )
    
    return health_status


@router.get("/readiness")
async def readiness_check():
    """
    就緒檢查 - 檢查服務是否準備好接收請求
    """
    try:
        # 檢查關鍵依賴
        db_ready = check_db_connection()
        redis_ready = await check_redis_connection()
        
        if db_ready and redis_ready:
            return {
                "status": "ready",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "message": "服務已準備就緒"
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail={
                    "status": "not_ready",
                    "timestamp": datetime.utcnow().isoformat() + "Z",
                    "message": "服務尚未準備就緒",
                    "database": db_ready,
                    "redis": redis_ready
                }
            )
    except Exception as e:
        logger.error(f"就緒檢查失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "not_ready",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "message": f"就緒檢查失敗: {str(e)}"
            }
        )


@router.get("/liveness")
async def liveness_check():
    """
    存活檢查 - 檢查服務是否仍在運行
    """
    return {
        "status": "alive",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "message": "服務正在運行"
    }
