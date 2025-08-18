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