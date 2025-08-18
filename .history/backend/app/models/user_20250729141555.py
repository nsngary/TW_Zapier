"""
使用者相關的 SQLAlchemy 模型
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from datetime import datetime, timedelta
import datetime as dt

from app.core.database import Base


class User(Base):
    """
    使用者模型 - 符合前端認證系統需求
    """
    __tablename__ = "users"

    # 使用 UUID 作為主鍵，符合前端期望
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)

    # 基本資訊
    name = Column(String(100), nullable=False)  # 對應前端的 name 欄位
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)  # 重新命名以更清楚
    phone = Column(String(20), nullable=True)  # 台灣手機號碼
    avatar = Column(String(500), nullable=True)  # 頭像 URL

    # 狀態欄位
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    email_verified = Column(Boolean, default=False, nullable=False)  # 對應前端的 emailVerified

    # 時間戳 - 符合前端 ISO 字串格式需求
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    
    # 關聯
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    preferences = relationship("UserPreferences", back_populates="user", uselist=False, cascade="all, delete-orphan")
    workflows = relationship("Workflow", back_populates="user", cascade="all, delete-orphan")
    workflow_executions = relationship("WorkflowExecution", back_populates="user", cascade="all, delete-orphan")
    api_keys = relationship("ApiKey", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")
    webhook_endpoints = relationship("WebhookEndpoint", back_populates="user", cascade="all, delete-orphan")
    refresh_tokens = relationship("RefreshToken", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', name='{self.name}')>"


class RefreshToken(Base):
    """
    JWT Refresh Token 模型 - 用於前端認證系統
    """
    __tablename__ = "refresh_tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)

    # Token 資訊
    token = Column(String(255), unique=True, nullable=False, index=True)
    expires_at = Column(DateTime(timezone=True), nullable=False)

    # 安全資訊
    is_revoked = Column(Boolean, default=False, nullable=False)
    created_ip = Column(String(45), nullable=True)  # IPv6 支援
    user_agent = Column(Text, nullable=True)

    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    revoked_at = Column(DateTime(timezone=True), nullable=True)

    # 關聯
    user = relationship("User", back_populates="refresh_tokens")

    def __repr__(self):
        return f"<RefreshToken(id={self.id}, user_id={self.user_id}, expires_at={self.expires_at})>"

    @property
    def is_expired(self):
        """檢查 token 是否已過期"""
        return datetime.now(dt.timezone.utc) > self.expires_at

    @property
    def is_valid(self):
        """檢查 token 是否有效（未過期且未撤銷）"""
        return not self.is_expired and not self.is_revoked


class UserProfile(Base):
    """
    使用者詳細檔案模型
    """
    __tablename__ = "user_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True)
    
    # 個人資訊
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    location = Column(String(100), nullable=True)
    website = Column(String(500), nullable=True)
    phone = Column(String(20), nullable=True)
    
    # 地區設定
    timezone = Column(String(50), default="Asia/Taipei", nullable=False)
    language = Column(String(10), default="zh-TW", nullable=False)
    
    # 統計資訊
    workflow_count = Column(Integer, default=0, nullable=False)
    execution_count = Column(Integer, default=0, nullable=False)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    user = relationship("User", back_populates="profile")

    def __repr__(self):
        return f"<UserProfile(user_id={self.user_id}, location='{self.location}')>"


class UserPreferences(Base):
    """
    使用者偏好設定模型
    """
    __tablename__ = "user_preferences"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True)
    
    # 介面設定
    theme = Column(String(20), default="light", nullable=False)  # light, dark, auto
    sidebar_collapsed = Column(Boolean, default=False, nullable=False)
    
    # 通知設定
    email_notifications = Column(Boolean, default=True, nullable=False)
    workflow_notifications = Column(Boolean, default=True, nullable=False)
    execution_notifications = Column(Boolean, default=False, nullable=False)
    marketing_emails = Column(Boolean, default=False, nullable=False)
    
    # 工作流設定
    auto_save_workflows = Column(Boolean, default=True, nullable=False)
    default_workflow_privacy = Column(String(20), default="private", nullable=False)  # private, public, team
    
    # 其他設定
    additional_settings = Column(JSONB, nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    user = relationship("User", back_populates="preferences")

    def __repr__(self):
        return f"<UserPreferences(user_id={self.user_id}, theme='{self.theme}')>"


class ApiKey(Base):
    """
    API 金鑰模型
    """
    __tablename__ = "api_keys"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # 金鑰資訊
    key_name = Column(String(100), nullable=False)
    key_hash = Column(String(255), nullable=False, unique=True)
    key_prefix = Column(String(10), nullable=False)  # 顯示用的前綴
    
    # 權限和狀態
    permissions = Column(JSONB, nullable=True)  # 權限列表
    is_active = Column(Boolean, default=True, nullable=False)
    
    # 使用統計
    usage_count = Column(Integer, default=0, nullable=False)
    last_used_at = Column(DateTime(timezone=True), nullable=True)
    last_used_ip = Column(String(45), nullable=True)  # IPv6 支援
    
    # 時間管理
    expires_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    user = relationship("User", back_populates="api_keys")

    def __repr__(self):
        return f"<ApiKey(id={self.id}, user_id={self.user_id}, name='{self.key_name}')>"


class AuditLog(Base):
    """
    審計日誌模型
    """
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)  # 可能是系統操作
    
    # 操作資訊
    action = Column(String(50), nullable=False, index=True)  # CREATE, UPDATE, DELETE, LOGIN, etc.
    resource_type = Column(String(50), nullable=False, index=True)  # User, Workflow, etc.
    resource_id = Column(String(50), nullable=True, index=True)
    
    # 變更資訊
    old_values = Column(JSONB, nullable=True)
    new_values = Column(JSONB, nullable=True)
    
    # 請求資訊
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    request_id = Column(String(36), nullable=True, index=True)
    
    # 結果資訊
    success = Column(Boolean, default=True, nullable=False)
    error_message = Column(Text, nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    
    # 關聯
    user = relationship("User", back_populates="audit_logs")

    def __repr__(self):
        return f"<AuditLog(id={self.id}, action='{self.action}', resource_type='{self.resource_type}')>"
