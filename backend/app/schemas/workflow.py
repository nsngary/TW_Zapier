"""
工作流相關的 Pydantic 模型 - 符合前端認證系統需求
"""

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field, validator
from typing import Any, Dict, List, Optional
import uuid


class WorkflowStatus(str, Enum):
    """工作流狀態枚舉"""
    DRAFT = "draft"
    ACTIVE = "active"
    INACTIVE = "inactive"
    ARCHIVED = "archived"


class ExecutionStatus(str, Enum):
    """執行狀態枚舉"""
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"
    TIMEOUT = "timeout"


class WorkflowBase(BaseModel):
    """工作流基礎模型"""
    name: str = Field(..., min_length=1, max_length=200, description="工作流名稱")
    description: Optional[str] = Field(None, description="工作流描述")
    category: Optional[str] = Field(None, description="分類")
    tags: Optional[List[str]] = Field(default=[], description="標籤")
    is_active: bool = Field(default=True, description="是否啟用")


class WorkflowCreate(WorkflowBase):
    """建立工作流模型"""
    nodes: List[Dict[str, Any]] = Field(default=[], description="節點列表")
    edges: List[Dict[str, Any]] = Field(default=[], description="連線列表")
    settings: Optional[Dict[str, Any]] = Field(default={}, description="設定")


class WorkflowUpdate(BaseModel):
    """更新工作流模型"""
    name: Optional[str] = Field(None, min_length=1, max_length=200, description="工作流名稱")
    description: Optional[str] = Field(None, description="工作流描述")
    category: Optional[str] = Field(None, description="分類")
    tags: Optional[List[str]] = Field(None, description="標籤")
    nodes: Optional[List[Dict[str, Any]]] = Field(None, description="節點列表")
    edges: Optional[List[Dict[str, Any]]] = Field(None, description="連線列表")
    settings: Optional[Dict[str, Any]] = Field(None, description="設定")
    is_active: Optional[bool] = Field(None, description="是否啟用")


class WorkflowSave(BaseModel):
    """儲存工作流模型"""
    name: Optional[str] = Field(None, min_length=1, max_length=200, description="工作流名稱")
    description: Optional[str] = Field(None, description="工作流描述")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Optional[Dict[str, Any]] = Field(default={}, description="設定")
    viewport: Optional[Dict[str, Any]] = Field(None, description="視窗狀態")


class WorkflowResponse(WorkflowBase):
    """工作流回應模型 - 使用UUID格式符合前端需求"""
    id: str = Field(..., description="工作流 ID (UUID字串格式)")
    user_id: str = Field(..., description="使用者 ID (UUID字串格式)")
    status: str = Field(..., description="狀態")
    version: int = Field(..., description="版本")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Dict[str, Any] = Field(..., description="設定")
    execution_count: int = Field(..., description="執行次數")
    success_count: int = Field(..., description="成功次數")
    failure_count: int = Field(..., description="失敗次數")
    created_at: str = Field(..., description="建立時間 (ISO字串格式)")
    updated_at: str = Field(..., description="更新時間 (ISO字串格式)")
    last_executed_at: Optional[str] = Field(None, description="最後執行時間 (ISO字串格式)")

    model_config = {"from_attributes": True}

    @validator('id', 'user_id', pre=True)
    def convert_uuid_to_string(cls, v):
        """將UUID轉換為字串格式"""
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    @validator('created_at', 'updated_at', 'last_executed_at', pre=True)
    def convert_datetime_to_iso_string(cls, v):
        """將datetime轉換為ISO字串格式"""
        if isinstance(v, datetime):
            return v.isoformat() + "Z"
        return v


class WorkflowExecutionBase(BaseModel):
    """工作流執行基礎模型"""
    trigger_type: Optional[str] = Field(None, description="觸發類型")
    trigger_data: Optional[Dict[str, Any]] = Field(None, description="觸發資料")


class WorkflowExecutionCreate(WorkflowExecutionBase):
    """建立工作流執行模型"""
    workflow_id: str = Field(..., description="工作流 ID (UUID字串格式)")


class WorkflowExecutionResponse(WorkflowExecutionBase):
    """工作流執行回應模型 - 使用UUID格式符合前端需求"""
    id: str = Field(..., description="執行 ID (UUID字串格式)")
    workflow_id: str = Field(..., description="工作流 ID (UUID字串格式)")
    user_id: str = Field(..., description="使用者 ID (UUID字串格式)")
    execution_id: str = Field(..., description="執行識別碼")
    status: str = Field(..., description="執行狀態")
    result_data: Optional[Dict[str, Any]] = Field(None, description="執行結果")
    error_message: Optional[str] = Field(None, description="錯誤訊息")
    nodes_executed: int = Field(..., description="已執行節點數")
    nodes_successful: int = Field(..., description="成功節點數")
    nodes_failed: int = Field(..., description="失敗節點數")
    started_at: str = Field(..., description="開始時間 (ISO字串格式)")
    finished_at: Optional[str] = Field(None, description="結束時間 (ISO字串格式)")
    duration: Optional[float] = Field(None, description="執行時長（秒）")

    model_config = {"from_attributes": True}

    @validator('id', 'workflow_id', 'user_id', pre=True)
    def convert_uuid_to_string(cls, v):
        """將UUID轉換為字串格式"""
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    @validator('started_at', 'finished_at', pre=True)
    def convert_datetime_to_iso_string(cls, v):
        """將datetime轉換為ISO字串格式"""
        if isinstance(v, datetime):
            return v.isoformat() + "Z"
        return v


# 工作流版本管理相關schemas
class WorkflowVersionCreate(BaseModel):
    """建立工作流版本模型"""
    workflow_id: str = Field(..., description="工作流 ID (UUID字串格式)")
    version_name: Optional[str] = Field(None, description="版本名稱")
    description: Optional[str] = Field(None, description="版本描述")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Optional[Dict[str, Any]] = Field(default={}, description="設定")


class WorkflowVersionResponse(BaseModel):
    """工作流版本回應模型"""
    id: str = Field(..., description="版本 ID (UUID字串格式)")
    workflow_id: str = Field(..., description="工作流 ID (UUID字串格式)")
    version_number: int = Field(..., description="版本號")
    version_name: Optional[str] = Field(None, description="版本名稱")
    description: Optional[str] = Field(None, description="版本描述")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Dict[str, Any] = Field(..., description="設定")
    is_published: bool = Field(..., description="是否已發布")
    created_at: str = Field(..., description="建立時間 (ISO字串格式)")
    created_by: str = Field(..., description="建立者 ID (UUID字串格式)")

    model_config = {"from_attributes": True}

    @validator('id', 'workflow_id', 'created_by', pre=True)
    def convert_uuid_to_string(cls, v):
        """將UUID轉換為字串格式"""
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    @validator('created_at', pre=True)
    def convert_datetime_to_iso_string(cls, v):
        """將datetime轉換為ISO字串格式"""
        if isinstance(v, datetime):
            return v.isoformat() + "Z"
        return v


# 工作流模板相關schemas
class WorkflowTemplateResponse(BaseModel):
    """工作流模板回應模型"""
    id: str = Field(..., description="模板 ID (UUID字串格式)")
    name: str = Field(..., description="模板名稱")
    description: str = Field(..., description="模板描述")
    category: str = Field(..., description="模板分類")
    tags: List[str] = Field(..., description="標籤")
    thumbnail_url: Optional[str] = Field(None, description="縮圖 URL")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Dict[str, Any] = Field(..., description="設定")
    usage_count: int = Field(default=0, description="使用次數")
    rating: float = Field(default=0.0, description="評分")
    is_taiwan_featured: bool = Field(default=False, description="是否為台灣特色模板")
    created_at: str = Field(..., description="建立時間 (ISO字串格式)")

    model_config = {"from_attributes": True}

    @validator('id', pre=True)
    def convert_uuid_to_string(cls, v):
        """將UUID轉換為字串格式"""
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    @validator('created_at', pre=True)
    def convert_datetime_to_iso_string(cls, v):
        """將datetime轉換為ISO字串格式"""
        if isinstance(v, datetime):
            return v.isoformat() + "Z"
        return v


# 工作流統計相關schemas
class WorkflowStatsResponse(BaseModel):
    """工作流統計回應模型"""
    workflow_id: str = Field(..., description="工作流 ID (UUID字串格式)")
    total_executions: int = Field(..., description="總執行次數")
    successful_executions: int = Field(..., description="成功執行次數")
    failed_executions: int = Field(..., description="失敗執行次數")
    average_duration: Optional[float] = Field(None, description="平均執行時長（秒）")
    last_execution_at: Optional[str] = Field(None, description="最後執行時間 (ISO字串格式)")
    success_rate: float = Field(..., description="成功率（百分比）")

    @validator('workflow_id', pre=True)
    def convert_uuid_to_string(cls, v):
        """將UUID轉換為字串格式"""
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    @validator('last_execution_at', pre=True)
    def convert_datetime_to_iso_string(cls, v):
        """將datetime轉換為ISO字串格式"""
        if isinstance(v, datetime):
            return v.isoformat() + "Z"
        return v