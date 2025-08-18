"""
使用者管理 API 端點
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import logging

from app.core.database import get_db
from app.core.security import security, verify_token
from app.core.exceptions import AuthenticationError, AuthorizationError, ResourceNotFoundError
from app.schemas.user import UserResponse, UserUpdate, UserCreate
from app.services.user_service import UserService

router = APIRouter()
logger = logging.getLogger("app.api.users")


async def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> int:
    """
    取得當前使用者 ID 的依賴注入函數
    """
    user_id = verify_token(credentials.credentials)
    if not user_id:
        raise AuthenticationError("無效的權杖")
    return int(user_id)


@router.get("/", response_model=List[UserResponse])
async def get_users(
    skip: int = Query(0, ge=0, description="跳過的記錄數"),
    limit: int = Query(100, ge=1, le=1000, description="返回的記錄數"),
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    取得使用者列表（需要管理員權限）
    """
    try:
        user_service = UserService(db)
        
        # 檢查當前使用者是否為管理員
        current_user = await user_service.get_user_by_id(current_user_id)
        if not current_user or not current_user.is_superuser:
            raise AuthorizationError("需要管理員權限")
        
        users = await user_service.get_users(skip=skip, limit=limit)
        return [UserResponse.from_orm(user) for user in users]
        
    except (AuthenticationError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"取得使用者列表失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得使用者列表失敗"
        )


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    取得指定使用者資訊
    """
    try:
        user_service = UserService(db)
        
        # 檢查權限：只能查看自己的資訊或管理員可以查看所有人
        current_user = await user_service.get_user_by_id(current_user_id)
        if not current_user:
            raise AuthenticationError("使用者不存在")
        
        if user_id != current_user_id and not current_user.is_superuser:
            raise AuthorizationError("只能查看自己的使用者資訊")
        
        user = await user_service.get_user_by_id(user_id)
        if not user:
            raise ResourceNotFoundError("使用者", str(user_id))
        
        return UserResponse.from_orm(user)
        
    except (AuthenticationError, AuthorizationError, ResourceNotFoundError):
        raise
    except Exception as e:
        logger.error(f"取得使用者資訊失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得使用者資訊失敗"
        )


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    更新使用者資訊
    """
    try:
        user_service = UserService(db)
        
        # 檢查權限：只能更新自己的資訊或管理員可以更新所有人
        current_user = await user_service.get_user_by_id(current_user_id)
        if not current_user:
            raise AuthenticationError("使用者不存在")
        
        if user_id != current_user_id and not current_user.is_superuser:
            raise AuthorizationError("只能更新自己的使用者資訊")
        
        # 檢查目標使用者是否存在
        target_user = await user_service.get_user_by_id(user_id)
        if not target_user:
            raise ResourceNotFoundError("使用者", str(user_id))
        
        # 更新使用者
        updated_user = await user_service.update_user(user_id, user_update)
        
        logger.info(f"使用者資訊更新成功: user_id={user_id}")
        return UserResponse.from_orm(updated_user)
        
    except (AuthenticationError, AuthorizationError, ResourceNotFoundError):
        raise
    except Exception as e:
        logger.error(f"更新使用者資訊失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="更新使用者資訊失敗"
        )


@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    刪除使用者（需要管理員權限）
    """
    try:
        user_service = UserService(db)
        
        # 檢查當前使用者是否為管理員
        current_user = await user_service.get_user_by_id(current_user_id)
        if not current_user or not current_user.is_superuser:
            raise AuthorizationError("需要管理員權限")
        
        # 不能刪除自己
        if user_id == current_user_id:
            raise AuthorizationError("不能刪除自己的帳號")
        
        # 檢查目標使用者是否存在
        target_user = await user_service.get_user_by_id(user_id)
        if not target_user:
            raise ResourceNotFoundError("使用者", str(user_id))
        
        # 刪除使用者
        await user_service.delete_user(user_id)
        
        logger.info(f"使用者刪除成功: user_id={user_id}")
        return {
            "message": "使用者刪除成功",
            "user_id": user_id,
            "timestamp": "2024-01-01T00:00:00Z"
        }
        
    except (AuthenticationError, AuthorizationError, ResourceNotFoundError):
        raise
    except Exception as e:
        logger.error(f"刪除使用者失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="刪除使用者失敗"
        )


@router.post("/{user_id}/activate")
async def activate_user(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    啟用使用者（需要管理員權限）
    """
    try:
        user_service = UserService(db)
        
        # 檢查當前使用者是否為管理員
        current_user = await user_service.get_user_by_id(current_user_id)
        if not current_user or not current_user.is_superuser:
            raise AuthorizationError("需要管理員權限")
        
        # 檢查目標使用者是否存在
        target_user = await user_service.get_user_by_id(user_id)
        if not target_user:
            raise ResourceNotFoundError("使用者", str(user_id))
        
        # 啟用使用者
        await user_service.activate_user(user_id)
        
        logger.info(f"使用者啟用成功: user_id={user_id}")
        return {
            "message": "使用者啟用成功",
            "user_id": user_id,
            "timestamp": "2024-01-01T00:00:00Z"
        }
        
    except (AuthenticationError, AuthorizationError, ResourceNotFoundError):
        raise
    except Exception as e:
        logger.error(f"啟用使用者失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="啟用使用者失敗"
        )


@router.post("/{user_id}/deactivate")
async def deactivate_user(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """
    停用使用者（需要管理員權限）
    """
    try:
        user_service = UserService(db)
        
        # 檢查當前使用者是否為管理員
        current_user = await user_service.get_user_by_id(current_user_id)
        if not current_user or not current_user.is_superuser:
            raise AuthorizationError("需要管理員權限")
        
        # 不能停用自己
        if user_id == current_user_id:
            raise AuthorizationError("不能停用自己的帳號")
        
        # 檢查目標使用者是否存在
        target_user = await user_service.get_user_by_id(user_id)
        if not target_user:
            raise ResourceNotFoundError("使用者", str(user_id))
        
        # 停用使用者
        await user_service.deactivate_user(user_id)
        
        logger.info(f"使用者停用成功: user_id={user_id}")
        return {
            "message": "使用者停用成功",
            "user_id": user_id,
            "timestamp": "2024-01-01T00:00:00Z"
        }
        
    except (AuthenticationError, AuthorizationError, ResourceNotFoundError):
        raise
    except Exception as e:
        logger.error(f"停用使用者失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="停用使用者失敗"
        )
