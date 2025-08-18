"""
API v1 路由集合
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, health, workflows, users

api_router = APIRouter()

# 健康檢查路由
api_router.include_router(
    health.router,
    prefix="/health",
    tags=["健康檢查"]
)

# 認證路由
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["認證"]
)

# 使用者路由
api_router.include_router(
    users.router,
    prefix="/users",
    tags=["使用者管理"]
)

# 工作流路由
api_router.include_router(
    workflows.router,
    prefix="/workflows",
    tags=["工作流管理"]
)
