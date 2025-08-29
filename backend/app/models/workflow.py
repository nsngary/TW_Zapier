"""
工作流相關的 SQLAlchemy 模型
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Float, Enum, TypeDecorator
from sqlalchemy.dialects.postgresql import UUID, JSONB, ARRAY
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
import enum
import json

from app.core.database import Base


class FormattedJSONB(TypeDecorator):
    """
    自定義 JSONB 類型，支援格式化儲存
    """
    impl = JSONB
    cache_ok = True

    def process_bind_param(self, value, dialect):
        """儲存時格式化 JSON"""
        if value is not None:
            # 將 Python 物件轉換為格式化的 JSON 字串，然後再轉回物件
            # 這樣可以確保儲存的 JSON 是格式化的
            formatted_json = json.dumps(value, indent=2, ensure_ascii=False)
            return json.loads(formatted_json)
        return value

    def process_result_value(self, value, dialect):
        """讀取時保持原樣"""
        return value


class WorkflowStatus(enum.Enum):
    """工作流狀態枚舉"""
    DRAFT = "draft"
    ACTIVE = "active"
    INACTIVE = "inactive"
    ARCHIVED = "archived"


class ExecutionStatus(enum.Enum):
    """執行狀態枚舉"""
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"
    TIMEOUT = "timeout"


class Workflow(Base):
    """
    工作流模型
    """
    __tablename__ = "workflows"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    # 基本資訊
    name = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    status = Column(Enum(WorkflowStatus), default=WorkflowStatus.DRAFT, nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    
    # 分類和標籤
    category = Column(String(50), nullable=True, index=True)
    tags = Column(ARRAY(String), nullable=True)
    
    # 工作流定義（使用格式化 JSONB）
    nodes = Column(FormattedJSONB, nullable=False, default=list)
    edges = Column(FormattedJSONB, nullable=False, default=list)
    settings = Column(FormattedJSONB, nullable=True, default=dict)
    
    # 版本控制
    version = Column(Integer, default=1, nullable=False)
    
    # 執行統計
    execution_count = Column(Integer, default=0, nullable=False)
    success_count = Column(Integer, default=0, nullable=False)
    failure_count = Column(Integer, default=0, nullable=False)
    average_duration = Column(Float, nullable=True)
    
    # n8n 整合
    n8n_workflow_id = Column(String(100), nullable=True, unique=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    last_executed_at = Column(DateTime(timezone=True), nullable=True, index=True)
    
    # 關聯
    user = relationship("User", back_populates="workflows")
    versions = relationship("WorkflowVersion", back_populates="workflow", cascade="all, delete-orphan")
    executions = relationship("WorkflowExecution", back_populates="workflow", cascade="all, delete-orphan")
    webhook_endpoints = relationship("WebhookEndpoint", back_populates="workflow", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Workflow(id={self.id}, name='{self.name}', status='{self.status.value}')>"


class WorkflowVersion(Base):
    """
    工作流版本模型
    """
    __tablename__ = "workflow_versions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflows.id"), nullable=False, index=True)
    
    # 版本資訊
    version_number = Column(Integer, nullable=False)
    version_name = Column(String(100), nullable=True)
    changelog = Column(Text, nullable=True)
    
    # 版本內容（使用格式化 JSONB）
    nodes = Column(FormattedJSONB, nullable=False)
    edges = Column(FormattedJSONB, nullable=False)
    settings = Column(FormattedJSONB, nullable=True)
    
    # 版本狀態
    is_current = Column(Boolean, default=False, nullable=False)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    
    # 關聯
    workflow = relationship("Workflow", back_populates="versions")
    creator = relationship("User")

    def __repr__(self):
        return f"<WorkflowVersion(id={self.id}, workflow_id={self.workflow_id}, version={self.version_number})>"


class WorkflowExecution(Base):
    """
    工作流執行記錄模型
    """
    __tablename__ = "workflow_executions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflows.id"), nullable=False, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    
    # 執行資訊
    execution_id = Column(String(36), default=lambda: str(uuid.uuid4()), unique=True, nullable=False, index=True)
    status = Column(Enum(ExecutionStatus), default=ExecutionStatus.PENDING, nullable=False, index=True)
    
    # 觸發資訊
    trigger_type = Column(String(50), nullable=True, index=True)  # manual, webhook, schedule, api
    trigger_data = Column(JSONB, nullable=True)
    
    # 執行結果
    result_data = Column(JSONB, nullable=True)
    error_message = Column(Text, nullable=True)
    error_details = Column(JSONB, nullable=True)
    
    # 執行統計
    nodes_executed = Column(Integer, default=0, nullable=False)
    nodes_successful = Column(Integer, default=0, nullable=False)
    nodes_failed = Column(Integer, default=0, nullable=False)
    
    # 時間統計
    started_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    finished_at = Column(DateTime(timezone=True), nullable=True, index=True)
    duration = Column(Float, nullable=True)  # 執行時長（秒）
    
    # n8n 整合
    n8n_execution_id = Column(String(100), nullable=True)
    
    # 關聯
    workflow = relationship("Workflow", back_populates="executions")
    user = relationship("User", back_populates="workflow_executions")
    payment_records = relationship("PaymentRecord", back_populates="execution", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<WorkflowExecution(id={self.id}, workflow_id={self.workflow_id}, status='{self.status.value}')>"


class WorkflowTemplate(Base):
    """
    工作流模板模型
    """
    __tablename__ = "workflow_templates"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # 基本資訊
    name = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False, index=True)
    tags = Column(ARRAY(String), nullable=True)
    
    # 模板內容（使用格式化 JSONB）
    thumbnail_url = Column(String(500), nullable=True)
    nodes = Column(FormattedJSONB, nullable=False)
    edges = Column(FormattedJSONB, nullable=False)
    settings = Column(FormattedJSONB, nullable=True, default=dict)
    
    # 模板元資料
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    is_official = Column(Boolean, default=False, nullable=False)
    is_public = Column(Boolean, default=True, nullable=False)
    
    # 統計資訊
    usage_count = Column(Integer, default=0, nullable=False)
    rating = Column(Float, default=0.0, nullable=False)
    rating_count = Column(Integer, default=0, nullable=False)
    
    # 版本資訊
    version = Column(String(20), default="1.0.0", nullable=False)
    min_platform_version = Column(String(20), nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    author = relationship("User")

    def __repr__(self):
        return f"<WorkflowTemplate(id={self.id}, name='{self.name}', category='{self.category}')>"


class WebhookEndpoint(Base):
    """
    Webhook 端點模型
    """
    __tablename__ = "webhook_endpoints"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    workflow_id = Column(UUID(as_uuid=True), ForeignKey("workflows.id"), nullable=False, index=True)
    
    # 端點資訊
    endpoint_id = Column(String(36), default=lambda: str(uuid.uuid4()), unique=True, nullable=False, index=True)
    endpoint_url = Column(String(500), nullable=False, unique=True)
    secret_key = Column(String(255), nullable=True)
    
    # 設定
    method = Column(String(10), default="POST", nullable=False)  # GET, POST, PUT, DELETE
    content_type = Column(String(100), default="application/json", nullable=False)
    
    # 狀態
    is_active = Column(Boolean, default=True, nullable=False)
    
    # 統計
    trigger_count = Column(Integer, default=0, nullable=False)
    last_triggered_at = Column(DateTime(timezone=True), nullable=True)
    last_trigger_ip = Column(String(45), nullable=True)
    
    # 時間戳
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    # 關聯
    user = relationship("User", back_populates="webhook_endpoints")
    workflow = relationship("Workflow", back_populates="webhook_endpoints")

    def __repr__(self):
        return f"<WebhookEndpoint(id={self.id}, workflow_id={self.workflow_id}, endpoint_id='{self.endpoint_id}')>"
