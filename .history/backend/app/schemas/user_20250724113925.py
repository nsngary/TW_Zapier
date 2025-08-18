"""
使用者相關的 Pydantic 模型
"""

from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserBase(BaseModel):
    """
    使用者基礎模型
    """
    email: EmailStr = Field(..., description="電子郵件")
    full_name: str = Field(..., min_length=1, max_length=100, description="全名")
    is_active: bool = Field(default=True, description="是否啟用")
    is_superuser: bool = Field(default=False, description="是否為超級使用者")


class UserCreate(UserBase):
    """
    建立使用者模型
    """
    password: str = Field(..., min_length=6, description="密碼")
    
    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "full_name": "使用者",
                "password": "password123",
                "is_active": True,
                "is_superuser": False
            }
        }


class UserUpdate(BaseModel):
    """
    更新使用者模型
    """
    email: Optional[EmailStr] = Field(None, description="電子郵件")
    full_name: Optional[str] = Field(None, min_length=1, max_length=100, description="全名")
    is_active: Optional[bool] = Field(None, description="是否啟用")
    is_superuser: Optional[bool] = Field(None, description="是否為超級使用者")
    
    class Config:
        schema_extra = {
            "example": {
                "full_name": "更新後的使用者名稱",
                "is_active": True
            }
        }


class UserResponse(UserBase):
    """
    使用者回應模型
    """
    id: int = Field(..., description="使用者 ID")
    created_at: datetime = Field(..., description="建立時間")
    updated_at: datetime = Field(..., description="更新時間")
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "email": "user@example.com",
                "full_name": "使用者",
                "is_active": True,
                "is_superuser": False,
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z"
            }
        }


class UserInDB(UserBase):
    """
    資料庫中的使用者模型
    """
    id: int
    hashed_password: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True


class UserProfile(BaseModel):
    """
    使用者個人檔案模型
    """
    id: int = Field(..., description="使用者 ID")
    email: EmailStr = Field(..., description="電子郵件")
    full_name: str = Field(..., description="全名")
    avatar_url: Optional[str] = Field(None, description="頭像 URL")
    bio: Optional[str] = Field(None, max_length=500, description="個人簡介")
    location: Optional[str] = Field(None, max_length=100, description="所在地")
    website: Optional[str] = Field(None, description="個人網站")
    created_at: datetime = Field(..., description="建立時間")
    updated_at: datetime = Field(..., description="更新時間")
    
    # 統計資訊
    workflow_count: int = Field(default=0, description="工作流數量")
    execution_count: int = Field(default=0, description="執行次數")
    
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "email": "user@example.com",
                "full_name": "使用者",
                "avatar_url": "https://example.com/avatar.jpg",
                "bio": "我是一個工作流自動化愛好者",
                "location": "台北市",
                "website": "https://example.com",
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z",
                "workflow_count": 5,
                "execution_count": 100
            }
        }


class UserStats(BaseModel):
    """
    使用者統計資訊模型
    """
    user_id: int = Field(..., description="使用者 ID")
    workflow_count: int = Field(..., description="工作流總數")
    active_workflow_count: int = Field(..., description="啟用的工作流數")
    execution_count: int = Field(..., description="總執行次數")
    successful_execution_count: int = Field(..., description="成功執行次數")
    failed_execution_count: int = Field(..., description="失敗執行次數")
    last_execution_at: Optional[datetime] = Field(None, description="最後執行時間")
    
    class Config:
        schema_extra = {
            "example": {
                "user_id": 1,
                "workflow_count": 10,
                "active_workflow_count": 8,
                "execution_count": 500,
                "successful_execution_count": 450,
                "failed_execution_count": 50,
                "last_execution_at": "2024-01-01T12:00:00Z"
            }
        }


class UserPreferences(BaseModel):
    """
    使用者偏好設定模型
    """
    user_id: int = Field(..., description="使用者 ID")
    language: str = Field(default="zh-TW", description="語言設定")
    timezone: str = Field(default="Asia/Taipei", description="時區設定")
    theme: str = Field(default="light", description="主題設定")
    email_notifications: bool = Field(default=True, description="是否接收電子郵件通知")
    workflow_notifications: bool = Field(default=True, description="是否接收工作流通知")
    
    class Config:
        schema_extra = {
            "example": {
                "user_id": 1,
                "language": "zh-TW",
                "timezone": "Asia/Taipei",
                "theme": "light",
                "email_notifications": True,
                "workflow_notifications": True
            }
        }
