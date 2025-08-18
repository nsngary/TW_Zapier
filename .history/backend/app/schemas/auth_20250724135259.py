"""
認證相關的 Pydantic 模型
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional

from app.schemas.user import UserResponse


class LoginRequest(BaseModel):
    """
    登入請求模型
    """
    email: EmailStr = Field(..., description="電子郵件")
    password: str = Field(..., min_length=6, description="密碼")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "password123"
            }
        }


class LoginResponse(BaseModel):
    """
    登入回應模型
    """
    access_token: str = Field(..., description="存取權杖")
    refresh_token: str = Field(..., description="重新整理權杖")
    token_type: str = Field(default="bearer", description="權杖類型")
    expires_in: int = Field(..., description="權杖過期時間（秒）")
    user: UserResponse = Field(..., description="使用者資訊")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 3600,
                "user": {
                    "id": 1,
                    "email": "user@example.com",
                    "full_name": "使用者",
                    "is_active": True,
                    "is_superuser": False,
                    "created_at": "2024-01-01T00:00:00Z",
                    "updated_at": "2024-01-01T00:00:00Z"
                }
            }
        }


class RegisterRequest(BaseModel):
    """
    註冊請求模型
    """
    email: EmailStr = Field(..., description="電子郵件")
    password: str = Field(..., min_length=6, description="密碼")
    full_name: str = Field(..., min_length=1, max_length=100, description="全名")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "email": "newuser@example.com",
                "password": "password123",
                "full_name": "新使用者"
            }
        }


class RegisterResponse(BaseModel):
    """
    註冊回應模型
    """
    access_token: str = Field(..., description="存取權杖")
    refresh_token: str = Field(..., description="重新整理權杖")
    token_type: str = Field(default="bearer", description="權杖類型")
    expires_in: int = Field(..., description="權杖過期時間（秒）")
    user: UserResponse = Field(..., description="使用者資訊")
    message: str = Field(..., description="註冊結果訊息")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 3600,
                "user": {
                    "id": 1,
                    "email": "newuser@example.com",
                    "full_name": "新使用者",
                    "is_active": True,
                    "is_superuser": False,
                    "created_at": "2024-01-01T00:00:00Z",
                    "updated_at": "2024-01-01T00:00:00Z"
                },
                "message": "註冊成功"
            }
        }


class RefreshTokenRequest(BaseModel):
    """
    重新整理權杖請求模型
    """
    refresh_token: str = Field(..., description="重新整理權杖")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }


class RefreshTokenResponse(BaseModel):
    """
    重新整理權杖回應模型
    """
    access_token: str = Field(..., description="新的存取權杖")
    token_type: str = Field(default="bearer", description="權杖類型")
    expires_in: int = Field(..., description="權杖過期時間（秒）")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 3600
            }
        }


class PasswordResetRequest(BaseModel):
    """
    密碼重設請求模型
    """
    email: EmailStr = Field(..., description="電子郵件")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "email": "user@example.com"
            }
        }


class PasswordResetConfirm(BaseModel):
    """
    密碼重設確認模型
    """
    token: str = Field(..., description="重設權杖")
    new_password: str = Field(..., min_length=6, description="新密碼")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "new_password": "newpassword123"
            }
        }


class ChangePasswordRequest(BaseModel):
    """
    變更密碼請求模型
    """
    current_password: str = Field(..., description="目前密碼")
    new_password: str = Field(..., min_length=6, description="新密碼")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "current_password": "oldpassword123",
                "new_password": "newpassword123"
            }
        }
