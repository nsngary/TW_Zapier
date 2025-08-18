"""
工作流相關的 Pydantic 模型 - 簡化版
"""

from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


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


class NodeTypeBase(BaseModel):
    """節點類型基礎模型"""
    name: str = Field(..., description="節點類型名稱")
    display_name: str = Field(..., description="顯示名稱")
    category: str = Field(..., description="分類")
    description: Optional[str] = Field(None, description="描述")
    icon_url: Optional[str] = Field(None, description="圖示 URL")
    is_taiwan_service: bool = Field(default=False, description="是否為台灣在地服務")


class NodeTypeResponse(NodeTypeBase):
    """節點類型回應模型"""
    id: int = Field(..., description="節點類型 ID")
    version: str = Field(..., description="版本")
    is_active: bool = Field(..., description="是否啟用")
    supports_webhook: bool = Field(..., description="是否支援 Webhook")
    supports_polling: bool = Field(..., description="是否支援輪詢")
    service_provider: Optional[str] = Field(None, description="服務提供者")
    
    model_config = {"from_attributes": True}


class WorkflowTemplateBase(BaseModel):
    """工作流模板基礎模型"""
    name: str = Field(..., description="模板名稱")
    description: str = Field(..., description="模板描述")
    category: str = Field(..., description="分類")
    tags: Optional[List[str]] = Field(default=[], description="標籤")


class WorkflowTemplateResponse(WorkflowTemplateBase):
    """工作流模板回應模型"""
    id: int = Field(..., description="模板 ID")
    thumbnail_url: Optional[str] = Field(None, description="縮圖 URL")
    nodes: List[Dict[str, Any]] = Field(..., description="節點列表")
    edges: List[Dict[str, Any]] = Field(..., description="連線列表")
    settings: Dict[str, Any] = Field(..., description="設定")
    is_official: bool = Field(..., description="是否為官方模板")
    is_public: bool = Field(..., description="是否公開")
    usage_count: int = Field(..., description="使用次數")
    rating: float = Field(..., description="評分")
    version: str = Field(..., description="版本")
    created_at: datetime = Field(..., description="建立時間")
    
    model_config = {"from_attributes": True}


class WorkflowListResponse(BaseModel):
    """工作流列表回應模型"""
    workflows: List[WorkflowResponse] = Field(..., description="工作流列表")
    total: int = Field(..., description="總數")
    page: int = Field(..., description="頁碼")
    size: int = Field(..., description="每頁大小")
    pages: int = Field(..., description="總頁數")


class ExecutionListResponse(BaseModel):
    """執行列表回應模型"""
    executions: List[WorkflowExecutionResponse] = Field(..., description="執行列表")
    total: int = Field(..., description="總數")
    page: int = Field(..., description="頁碼")
    size: int = Field(..., description="每頁大小")
    pages: int = Field(..., description="總頁數")
