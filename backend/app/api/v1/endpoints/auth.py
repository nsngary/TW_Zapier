"""
認證 API 端點
"""

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
import logging

from app.core.database import get_db
from app.core.security import (
    security, 
    create_access_token, 
    create_refresh_token,
    verify_token,
    verify_refresh_token,
    verify_password,
    get_password_hash
)
from app.core.exceptions import AuthenticationError, ValidationError
from app.schemas.auth import (
    LoginRequest, 
    LoginResponse, 
    RegisterRequest, 
    RegisterResponse,
    RefreshTokenRequest,
    RefreshTokenResponse
)
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService

router = APIRouter()
logger = logging.getLogger("app.api.auth")


@router.post("/login", response_model=LoginResponse)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    使用者登入
    """
    try:
        user_service = UserService(db)
        
        # 驗證使用者憑證
        user = await user_service.authenticate_user(
            login_data.username,
            login_data.password
        )
        
        if not user:
            raise AuthenticationError("電子郵件或密碼錯誤")
        
        # 檢查使用者是否啟用
        if not user.is_active:
            raise AuthenticationError("帳號已被停用")
        
        # 建立權杖
        access_token = create_access_token(subject=user.id)
        refresh_token = create_refresh_token(subject=user.id)
        
        logger.info(f"使用者登入成功: {user.email}")
        
        # 手動構建用戶響應以處理日期轉換
        user_data = {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "avatar": user.avatar,
            "email_verified": user.email_verified,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat()
        }

        return LoginResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            expires_in=3600,  # 1 小時
            user=user_data
        )
        
    except AuthenticationError:
        raise
    except Exception as e:
        logger.error(f"登入過程發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="登入過程發生錯誤"
        )


@router.post("/register", response_model=RegisterResponse)
async def register(
    register_data: RegisterRequest,
    db: Session = Depends(get_db)
):
    """
    使用者註冊
    """
    try:
        user_service = UserService(db)
        
        # 檢查電子郵件是否已存在
        existing_user = await user_service.get_user_by_email(register_data.email)
        if existing_user:
            raise ValidationError("此電子郵件已被註冊", field="email")
        
        # 建立新使用者
        user_create = UserCreate(
            email=register_data.email,
            password=register_data.password,
            name=register_data.full_name
        )
        
        user = await user_service.create_user(user_create)
        
        # 建立權杖
        access_token = create_access_token(subject=user.id)
        refresh_token = create_refresh_token(subject=user.id)
        
        logger.info(f"新使用者註冊成功: {user.email}")

        # 手動構建用戶響應以處理日期轉換
        user_data = {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "avatar": user.avatar,
            "email_verified": user.email_verified,
            "created_at": user.created_at.isoformat(),
            "updated_at": user.updated_at.isoformat()
        }

        return RegisterResponse(
            message="註冊成功",
            user_id=str(user.id)
        )
        
    except (ValidationError, AuthenticationError):
        raise
    except Exception as e:
        logger.error(f"註冊過程發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="註冊過程發生錯誤"
        )


@router.post("/refresh", response_model=RefreshTokenResponse)
async def refresh_token(
    refresh_data: RefreshTokenRequest,
    db: Session = Depends(get_db)
):
    """
    重新整理權杖
    """
    try:
        # 驗證重新整理權杖
        user_id = verify_refresh_token(refresh_data.refresh_token)
        if not user_id:
            raise AuthenticationError("無效的重新整理權杖")
        
        user_service = UserService(db)
        user = await user_service.get_user_by_id(int(user_id))
        
        if not user or not user.is_active:
            raise AuthenticationError("使用者不存在或已被停用")
        
        # 建立新的存取權杖
        access_token = create_access_token(subject=user.id)
        
        return RefreshTokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=3600
        )
        
    except AuthenticationError:
        raise
    except Exception as e:
        logger.error(f"權杖重新整理過程發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="權杖重新整理失敗"
        )


@router.post("/logout")
async def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    使用者登出
    """
    try:
        # 驗證權杖
        user_id = verify_token(credentials.credentials)
        if not user_id:
            raise AuthenticationError("無效的權杖")
        
        # 在實際應用中，這裡應該將權杖加入黑名單
        # 或者從 Redis 中移除權杖
        
        logger.info(f"使用者登出: user_id={user_id}")
        
        return {
            "message": "登出成功",
            "timestamp": "2024-01-01T00:00:00Z"
        }
        
    except AuthenticationError:
        raise
    except Exception as e:
        logger.error(f"登出過程發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="登出過程發生錯誤"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    """
    取得當前使用者資訊
    """
    try:
        # 驗證權杖
        user_id = verify_token(credentials.credentials)
        if not user_id:
            raise AuthenticationError("無效的權杖")
        
        user_service = UserService(db)
        user = await user_service.get_user_by_id(int(user_id))
        
        if not user:
            raise AuthenticationError("使用者不存在")
        
        return UserResponse.from_orm(user)
        
    except AuthenticationError:
        raise
    except Exception as e:
        logger.error(f"取得使用者資訊過程發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得使用者資訊失敗"
        )
