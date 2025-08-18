"""
FastAPI 中介軟體
"""

import time
import uuid
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
import logging

from app.core.security import check_rate_limit
from app.core.exceptions import RateLimitExceededError

logger = logging.getLogger("app.core.middleware")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    請求日誌中介軟體
    """
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        # 產生請求 ID
        request_id = str(uuid.uuid4())
        
        # 記錄請求開始時間
        start_time = time.time()
        
        # 取得客戶端 IP
        client_ip = request.client.host if request.client else "unknown"
        
        # 記錄請求資訊
        logger.info(
            f"請求開始: {request.method} {request.url.path}",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "query_params": str(request.query_params),
                "client_ip": client_ip,
                "user_agent": request.headers.get("user-agent", "unknown")
            }
        )
        
        # 將請求 ID 添加到請求狀態
        request.state.request_id = request_id
        
        try:
            # 處理請求
            response = await call_next(request)
            
            # 計算處理時間
            process_time = time.time() - start_time
            
            # 記錄回應資訊
            logger.info(
                f"請求完成: {request.method} {request.url.path} - "
                f"狀態碼: {response.status_code}, 處理時間: {process_time:.3f}s",
                extra={
                    "request_id": request_id,
                    "status_code": response.status_code,
                    "process_time": process_time
                }
            )
            
            # 添加回應標頭
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time"] = str(process_time)
            
            return response
            
        except Exception as e:
            # 計算處理時間
            process_time = time.time() - start_time
            
            # 記錄錯誤
            logger.error(
                f"請求失敗: {request.method} {request.url.path} - "
                f"錯誤: {str(e)}, 處理時間: {process_time:.3f}s",
                exc_info=True,
                extra={
                    "request_id": request_id,
                    "process_time": process_time
                }
            )
            
            # 重新拋出例外
            raise


class RateLimitMiddleware(BaseHTTPMiddleware):
    """
    速率限制中介軟體
    """
    
    def __init__(self, app, calls_per_minute: int = 60):
        super().__init__(app)
        self.calls_per_minute = calls_per_minute
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        # 取得客戶端識別
        client_ip = request.client.host if request.client else "unknown"
        
        # 檢查是否為健康檢查或文件端點（跳過速率限制）
        if request.url.path in ["/health", "/docs", "/redoc", "/openapi.json"]:
            return await call_next(request)
        
        # 檢查速率限制
        if not check_rate_limit(client_ip, self.calls_per_minute):
            logger.warning(
                f"速率限制觸發: IP {client_ip} 超過每分鐘 {self.calls_per_minute} 次請求限制",
                extra={
                    "client_ip": client_ip,
                    "path": request.url.path,
                    "method": request.method
                }
            )
            raise RateLimitExceededError(self.calls_per_minute)
        
        return await call_next(request)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    安全標頭中介軟體
    """
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        response = await call_next(request)
        
        # 添加安全標頭
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = (
            "geolocation=(), microphone=(), camera=(), "
            "payment=(), usb=(), magnetometer=(), gyroscope=(), "
            "accelerometer=(), ambient-light-sensor=()"
        )
        
        # 在生產環境中添加 HSTS
        if request.url.scheme == "https":
            response.headers["Strict-Transport-Security"] = (
                "max-age=31536000; includeSubDomains; preload"
            )
        
        return response


class CacheControlMiddleware(BaseHTTPMiddleware):
    """
    快取控制中介軟體
    """
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        response = await call_next(request)
        
        # 根據路徑設定快取策略
        path = request.url.path
        
        if path.startswith("/api/"):
            # API 端點不快取
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        elif path in ["/health", "/docs", "/redoc"]:
            # 健康檢查和文件端點短時間快取
            response.headers["Cache-Control"] = "public, max-age=300"
        elif path.startswith("/static/"):
            # 靜態資源長時間快取
            response.headers["Cache-Control"] = "public, max-age=31536000"
        
        return response


class CompressionMiddleware(BaseHTTPMiddleware):
    """
    回應壓縮中介軟體（簡化版）
    """
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        response = await call_next(request)
        
        # 檢查客戶端是否支援 gzip
        accept_encoding = request.headers.get("accept-encoding", "")
        
        if "gzip" in accept_encoding.lower():
            # 對於大於 1KB 的 JSON 回應啟用壓縮提示
            content_type = response.headers.get("content-type", "")
            if "application/json" in content_type:
                response.headers["Vary"] = "Accept-Encoding"
        
        return response


class DatabaseMiddleware(BaseHTTPMiddleware):
    """
    資料庫連線中介軟體
    """
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        # 在請求處理前可以進行資料庫連線檢查
        # 這裡可以添加資料庫健康檢查邏輯
        
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            # 在發生資料庫相關錯誤時進行特殊處理
            logger.error(f"資料庫中介軟體捕獲錯誤: {str(e)}", exc_info=True)
            raise


class HealthCheckMiddleware(BaseHTTPMiddleware):
    """
    健康檢查中介軟體
    """
    
    async def dispatch(
        self, 
        request: Request, 
        call_next: RequestResponseEndpoint
    ) -> Response:
        # 對健康檢查端點進行特殊處理
        if request.url.path == "/health":
            # 可以在這裡添加額外的健康檢查邏輯
            pass
        
        return await call_next(request)
