"""
使用者相關的 Pydantic 模型 - 符合前端認證系統需求
"""

from datetime import datetime
from pydantic import BaseModel, Field, validator
from typing import Optional, List
import uuid
import re


class UserBase(BaseModel):
    """使用者基礎模型 - 符合前端需求"""
    name: str = Field(..., min_length=2, max_length=100, description="使用者姓名")
    email: str = Field(..., description="電子郵件地址")
    phone: Optional[str] = Field(None, description="手機號碼")

    @validator('phone')
    def validate_phone(cls, v):
        """驗證台灣手機號碼格式"""
        if v is not None:
            if not re.match(r'^09\d{8}$', v):
                raise ValueError('請輸入正確的台灣手機號碼格式（09xxxxxxxx）')
        return v


class UserCreate(UserBase):
    """建立使用者模型"""
    password: str = Field(..., min_length=6, max_length=100, description="密碼")

    @validator('password')
    def validate_password(cls, v):
        """驗證密碼強度"""
        if not re.search(r'[a-z]', v):
            raise ValueError('密碼必須包含小寫字母')
        if not re.search(r'[A-Z]', v):
            raise ValueError('密碼必須包含大寫字母')
        if not re.search(r'\d', v):
            raise ValueError('密碼必須包含數字')
        return v


class UserUpdate(BaseModel):
    """更新使用者模型"""
    email: Optional[str] = Field(None, description="電子郵件")
    full_name: Optional[str] = Field(None, min_length=1, max_length=100, description="全名")
    is_active: Optional[bool] = Field(None, description="是否啟用")
    is_superuser: Optional[bool] = Field(None, description="是否為超級使用者")


class UserResponse(UserBase):
    """使用者回應模型 - 符合前端期望格式"""
    id: str = Field(..., description="使用者 UUID")  # 前端期望字串格式的 UUID
    avatar: Optional[str] = Field(None, description="頭像 URL")
    email_verified: bool = Field(default=False, description="郵件是否已驗證")
    created_at: str = Field(..., description="建立時間 ISO 字串")  # 前端期望 ISO 字串
    updated_at: str = Field(..., description="更新時間 ISO 字串")

    model_config = {"from_attributes": True}


class UserInDB(UserBase):
    """資料庫中的使用者模型"""
    id: int
    hashed_password: str
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}


# ===== 認證相關 Schemas =====

class LoginRequest(BaseModel):
    """登入請求 schema - 符合前端格式"""
    email: str = Field(..., description="電子郵件地址")
    password: str = Field(..., min_length=1, description="密碼")


class RegisterRequest(UserCreate):
    """註冊請求 schema - 符合前端格式"""
    pass


class TokenData(BaseModel):
    """Token 資料 schema - 符合前端期望"""
    access_token: str = Field(..., alias="accessToken")
    refresh_token: Optional[str] = Field(None, alias="refreshToken")
    token_type: str = Field(default="Bearer", alias="tokenType")
    expires_in: int = Field(..., alias="expiresIn")
    issued_at: int = Field(..., alias="issuedAt")
    scope: Optional[List[str]] = None

    class Config:
        populate_by_name = True


class LoginResponse(BaseModel):
    """登入回應 schema - 符合前端期望格式"""
    user: UserResponse
    token: TokenData


class RegisterResponse(BaseModel):
    """註冊回應 schema"""
    user: UserResponse
    message: str = "註冊成功，請檢查您的電子郵件以驗證帳戶"


class RefreshTokenRequest(BaseModel):
    """刷新 Token 請求 schema"""
    refresh_token: str


class RefreshTokenResponse(BaseModel):
    """刷新 Token 回應 schema"""
    access_token: str = Field(..., alias="accessToken")
    refresh_token: Optional[str] = Field(None, alias="refreshToken")
    expires_in: int = Field(..., alias="expiresIn")

    class Config:
        populate_by_name = True


class UserProfile(BaseModel):
    """使用者檔案模型"""
    avatar_url: Optional[str] = Field(None, description="頭像 URL")
    bio: Optional[str] = Field(None, description="個人簡介")
    location: Optional[str] = Field(None, description="所在地")
    website: Optional[str] = Field(None, description="個人網站")
    phone: Optional[str] = Field(None, description="電話號碼")
    timezone: str = Field(default="Asia/Taipei", description="時區")
    language: str = Field(default="zh-TW", description="語言")


class UserPreferences(BaseModel):
    """使用者偏好設定模型"""
    theme: str = Field(default="light", description="主題")
    sidebar_collapsed: bool = Field(default=False, description="側邊欄是否收合")
    email_notifications: bool = Field(default=True, description="電子郵件通知")
    workflow_notifications: bool = Field(default=True, description="工作流通知")
    execution_notifications: bool = Field(default=False, description="執行通知")
    marketing_emails: bool = Field(default=False, description="行銷郵件")
    auto_save_workflows: bool = Field(default=True, description="自動儲存工作流")
    default_workflow_privacy: str = Field(default="private", description="預設工作流隱私設定")


class UserStats(BaseModel):
    """使用者統計模型"""
    workflow_count: int = Field(default=0, description="工作流數量")
    execution_count: int = Field(default=0, description="執行次數")
    success_rate: float = Field(default=0.0, description="成功率")
    last_active: Optional[datetime] = Field(None, description="最後活動時間")


class UserListResponse(BaseModel):
    """使用者列表回應模型"""
    users: list[UserResponse] = Field(..., description="使用者列表")
    total: int = Field(..., description="總數")
    page: int = Field(..., description="頁碼")
    size: int = Field(..., description="每頁大小")
    pages: int = Field(..., description="總頁數")
