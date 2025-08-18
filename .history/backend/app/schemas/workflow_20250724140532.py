"""
工作流相關的 Pydantic 模型
"""

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional


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


class WorkflowResponse(WorkflowBase):
    """工作流回應模型"""
    id: int = Field(..., description="工作流 ID")
    user_id: int = Field(..., description="使用者 ID")
    status: str = Field(..., description="狀態")
    version: int = Field(..., description="版本")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Dict[str, Any] = Field(..., description="設定")
    execution_count: int = Field(..., description="執行次數")
    success_count: int = Field(..., description="成功次數")
    failure_count: int = Field(..., description="失敗次數")
    created_at: datetime = Field(..., description="建立時間")
    updated_at: datetime = Field(..., description="更新時間")
    last_executed_at: Optional[datetime] = Field(None, description="最後執行時間")

    model_config = {"from_attributes": True}


class WorkflowExecutionBase(BaseModel):
    """工作流執行基礎模型"""
    trigger_type: Optional[str] = Field(None, description="觸發類型")
    trigger_data: Optional[Dict[str, Any]] = Field(None, description="觸發資料")


class WorkflowExecutionCreate(WorkflowExecutionBase):
    """建立工作流執行模型"""
    workflow_id: int = Field(..., description="工作流 ID")


class WorkflowExecutionResponse(WorkflowExecutionBase):
    """工作流執行回應模型"""
    id: int = Field(..., description="執行 ID")
    workflow_id: int = Field(..., description="工作流 ID")
    user_id: int = Field(..., description="使用者 ID")
    execution_id: str = Field(..., description="執行識別碼")
    status: str = Field(..., description="執行狀態")
    result_data: Optional[Dict[str, Any]] = Field(None, description="執行結果")
    error_message: Optional[str] = Field(None, description="錯誤訊息")
    nodes_executed: int = Field(..., description="已執行節點數")
    nodes_successful: int = Field(..., description="成功節點數")
    nodes_failed: int = Field(..., description="失敗節點數")
    started_at: datetime = Field(..., description="開始時間")
    finished_at: Optional[datetime] = Field(None, description="結束時間")
    duration: Optional[float] = Field(None, description="執行時長（秒）")

    model_config = {"from_attributes": True}