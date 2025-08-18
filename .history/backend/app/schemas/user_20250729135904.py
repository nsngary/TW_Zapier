"""
使用者相關的 Pydantic 模型 - 符合前端認證系統需求
"""

from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
import uuid
import re


class UserBase(BaseModel):
    """使用者基礎模型"""
    email: EmailStr = Field(..., description="電子郵件")
    full_name: str = Field(..., min_length=1, max_length=100, description="全名")
    is_active: bool = Field(default=True, description="是否啟用")
    is_superuser: bool = Field(default=False, description="是否為超級使用者")


class UserCreate(UserBase):
    """建立使用者模型"""
    password: str = Field(..., min_length=6, description="密碼")


class UserUpdate(BaseModel):
    """更新使用者模型"""
    email: Optional[EmailStr] = Field(None, description="電子郵件")
    full_name: Optional[str] = Field(None, min_length=1, max_length=100, description="全名")
    is_active: Optional[bool] = Field(None, description="是否啟用")
    is_superuser: Optional[bool] = Field(None, description="是否為超級使用者")


class UserResponse(UserBase):
    """使用者回應模型"""
    id: int = Field(..., description="使用者 ID")
    created_at: datetime = Field(..., description="建立時間")
    updated_at: datetime = Field(..., description="更新時間")
    
    model_config = {"from_attributes": True}


class UserInDB(UserBase):
    """資料庫中的使用者模型"""
    id: int
    hashed_password: str
    created_at: datetime
    updated_at: datetime
    
    model_config = {"from_attributes": True}


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
