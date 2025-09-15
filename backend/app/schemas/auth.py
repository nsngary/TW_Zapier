"""
認證相關的 Pydantic 模型 - 簡化版
"""

from datetime import datetime
from pydantic import BaseModel, Field, validator
from typing import Optional, Union, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.user import UserResponse


class LoginRequest(BaseModel):
    """登入請求模型 - 支援 email 或 username"""
    username: str = Field(..., description="使用者名稱或電子郵件")
    password: str = Field(..., min_length=1, description="密碼")  # 測試時允許短密碼


class RegisterRequest(BaseModel):
    """註冊請求模型"""
    email: str = Field(..., description="電子郵件")
    password: str = Field(..., min_length=6, description="密碼")
    full_name: str = Field(..., min_length=1, max_length=100, description="全名")


class RegisterResponse(BaseModel):
    """註冊回應模型"""
    message: str = Field(..., description="回應訊息")
    user_id: str = Field(..., description="使用者 ID")


class LoginResponse(BaseModel):
    """登入回應模型"""
    access_token: str = Field(..., description="存取權杖")
    refresh_token: str = Field(..., description="重新整理權杖")
    token_type: str = Field(default="bearer", description="權杖類型")
    expires_in: int = Field(..., description="權杖過期時間（秒）")
    user: Optional[dict] = Field(None, description="使用者資訊")


class RefreshTokenRequest(BaseModel):
    """重新整理權杖請求模型"""
    refresh_token: str = Field(..., description="重新整理權杖")


class RefreshTokenResponse(BaseModel):
    """重新整理權杖回應模型"""
    access_token: str = Field(..., description="新的存取權杖")
    token_type: str = Field(default="bearer", description="權杖類型")
    expires_in: int = Field(..., description="權杖過期時間（秒）")


class PasswordResetRequest(BaseModel):
    """密碼重設請求模型"""
    email: str = Field(..., description="電子郵件")


class PasswordResetConfirm(BaseModel):
    """密碼重設確認模型"""
    token: str = Field(..., description="重設權杖")
    new_password: str = Field(..., min_length=6, description="新密碼")


class ChangePasswordRequest(BaseModel):
    """變更密碼請求模型"""
    current_password: str = Field(..., description="目前密碼")
    new_password: str = Field(..., min_length=6, description="新密碼")


class TokenPayload(BaseModel):
    """JWT 權杖負載模型"""
    sub: Optional[str] = None
    exp: Optional[datetime] = None
    iat: Optional[datetime] = None
    user_id: Optional[int] = None
    email: Optional[str] = None
    is_superuser: Optional[bool] = False
