"""
自定義例外類別和例外處理器
"""

from typing import Any, Dict, Optional
from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import logging

logger = logging.getLogger("app.core.exceptions")


class TaiwanZapierException(Exception):
    """
    台灣 Zapier 基礎例外類別
    """
    
    def __init__(
        self,
        message: str,
        error_code: str = "GENERAL_ERROR",
        details: Optional[Dict[str, Any]] = None
    ):
        self.message = message
        self.error_code = error_code
        self.details = details or {}
        super().__init__(self.message)


class ValidationError(TaiwanZapierException):
    """
    資料驗證錯誤
    """
    
    def __init__(self, message: str, field: str = None, details: Dict[str, Any] = None):
        super().__init__(
            message=message,
            error_code="VALIDATION_ERROR",
            details=details or {}
        )
        if field:
            self.details["field"] = field


class AuthenticationError(TaiwanZapierException):
    """
    認證錯誤
    """
    
    def __init__(self, message: str = "認證失敗", details: Dict[str, Any] = None):
        super().__init__(
            message=message,
            error_code="AUTHENTICATION_ERROR",
            details=details or {}
        )


class AuthorizationError(TaiwanZapierException):
    """
    授權錯誤
    """
    
    def __init__(self, message: str = "權限不足", details: Dict[str, Any] = None):
        super().__init__(
            message=message,
            error_code="AUTHORIZATION_ERROR",
            details=details or {}
        )


class ResourceNotFoundError(TaiwanZapierException):
    """
    資源未找到錯誤
    """
    
    def __init__(self, resource: str, resource_id: str = None):
        message = f"{resource}未找到"
        if resource_id:
            message += f" (ID: {resource_id})"
        
        super().__init__(
            message=message,
            error_code="RESOURCE_NOT_FOUND",
            details={"resource": resource, "resource_id": resource_id}
        )


class ResourceConflictError(TaiwanZapierException):
    """
    資源衝突錯誤
    """
    
    def __init__(self, message: str, resource: str = None):
        super().__init__(
            message=message,
            error_code="RESOURCE_CONFLICT",
            details={"resource": resource} if resource else {}
        )


class ExternalServiceError(TaiwanZapierException):
    """
    外部服務錯誤
    """
    
    def __init__(self, service: str, message: str, status_code: int = None):
        super().__init__(
            message=f"{service}服務錯誤: {message}",
            error_code="EXTERNAL_SERVICE_ERROR",
            details={"service": service, "status_code": status_code}
        )


class WorkflowExecutionError(TaiwanZapierException):
    """
    工作流執行錯誤
    """
    
    def __init__(self, workflow_id: str, message: str, node_id: str = None):
        super().__init__(
            message=f"工作流執行失敗: {message}",
            error_code="WORKFLOW_EXECUTION_ERROR",
            details={"workflow_id": workflow_id, "node_id": node_id}
        )


class RateLimitExceededError(TaiwanZapierException):
    """
    速率限制超過錯誤
    """
    
    def __init__(self, limit: int, window: int = 60):
        super().__init__(
            message=f"請求頻率過高，每{window}秒最多{limit}次請求",
            error_code="RATE_LIMIT_EXCEEDED",
            details={"limit": limit, "window": window}
        )


class DatabaseError(TaiwanZapierException):
    """
    資料庫錯誤
    """
    
    def __init__(self, message: str, operation: str = None):
        super().__init__(
            message=f"資料庫操作失敗: {message}",
            error_code="DATABASE_ERROR",
            details={"operation": operation} if operation else {}
        )


# 例外處理器
async def taiwan_zapier_exception_handler(
    request: Request, 
    exc: TaiwanZapierException
) -> JSONResponse:
    """
    處理自定義例外
    """
    logger.error(
        f"TaiwanZapierException: {exc.error_code} - {exc.message}",
        extra={
            "error_code": exc.error_code,
            "details": exc.details,
            "path": request.url.path,
            "method": request.method
        }
    )
    
    # 根據例外類型決定 HTTP 狀態碼
    status_code_map = {
        "VALIDATION_ERROR": status.HTTP_422_UNPROCESSABLE_ENTITY,
        "AUTHENTICATION_ERROR": status.HTTP_401_UNAUTHORIZED,
        "AUTHORIZATION_ERROR": status.HTTP_403_FORBIDDEN,
        "RESOURCE_NOT_FOUND": status.HTTP_404_NOT_FOUND,
        "RESOURCE_CONFLICT": status.HTTP_409_CONFLICT,
        "EXTERNAL_SERVICE_ERROR": status.HTTP_502_BAD_GATEWAY,
        "WORKFLOW_EXECUTION_ERROR": status.HTTP_500_INTERNAL_SERVER_ERROR,
        "RATE_LIMIT_EXCEEDED": status.HTTP_429_TOO_MANY_REQUESTS,
        "DATABASE_ERROR": status.HTTP_500_INTERNAL_SERVER_ERROR,
    }
    
    status_code = status_code_map.get(exc.error_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "error": {
                "code": exc.error_code,
                "message": exc.message,
                "details": exc.details
            },
            "timestamp": "2024-01-01T00:00:00Z"  # 實際應用中應使用真實時間戳
        }
    )


async def http_exception_handler(
    request: Request, 
    exc: StarletteHTTPException
) -> JSONResponse:
    """
    處理 HTTP 例外
    """
    logger.warning(
        f"HTTP Exception: {exc.status_code} - {exc.detail}",
        extra={
            "status_code": exc.status_code,
            "path": request.url.path,
            "method": request.method
        }
    )
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": "HTTP_ERROR",
                "message": exc.detail,
                "details": {"status_code": exc.status_code}
            },
            "timestamp": "2024-01-01T00:00:00Z"
        }
    )


async def validation_exception_handler(
    request: Request, 
    exc: RequestValidationError
) -> JSONResponse:
    """
    處理請求驗證例外
    """
    logger.warning(
        f"Validation Error: {exc.errors()}",
        extra={
            "errors": exc.errors(),
            "path": request.url.path,
            "method": request.method
        }
    )
    
    # 格式化驗證錯誤
    formatted_errors = []
    for error in exc.errors():
        formatted_errors.append({
            "field": ".".join(str(loc) for loc in error["loc"]),
            "message": error["msg"],
            "type": error["type"]
        })
    
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "請求資料驗證失敗",
                "details": {"errors": formatted_errors}
            },
            "timestamp": "2024-01-01T00:00:00Z"
        }
    )


async def general_exception_handler(
    request: Request, 
    exc: Exception
) -> JSONResponse:
    """
    處理一般例外
    """
    logger.error(
        f"Unhandled Exception: {type(exc).__name__} - {str(exc)}",
        exc_info=True,
        extra={
            "path": request.url.path,
            "method": request.method
        }
    )
    
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "伺服器內部錯誤",
                "details": {}
            },
            "timestamp": "2024-01-01T00:00:00Z"
        }
    )
