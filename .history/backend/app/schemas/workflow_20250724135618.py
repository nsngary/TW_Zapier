"""
工作流相關的 Pydantic 模型
"""

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
from typing import Any, Dict, List, Optional


class WorkflowStatus(str, Enum):
    """
    工作流狀態枚舉
    """
    DRAFT = "draft"
    ACTIVE = "active"
    INACTIVE = "inactive"
    ARCHIVED = "archived"


class ExecutionStatus(str, Enum):
    """
    執行狀態枚舉
    """
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    CANCELLED = "cancelled"
    TIMEOUT = "timeout"


class WorkflowBase(BaseModel):
    """
    工作流基礎模型
    """
    name: str = Field(..., min_length=1, max_length=200, description="工作流名稱")
    description: Optional[str] = Field(None, max_length=1000, description="工作流描述")
    is_active: bool = Field(default=True, description="是否啟用")
    tags: List[str] = Field(default=[], description="標籤")


class WorkflowCreate(WorkflowBase):
    """
    建立工作流模型
    """
    nodes: List[Dict[str, Any]] = Field(..., description="節點資料")
    edges: List[Dict[str, Any]] = Field(..., description="邊線資料")
    settings: Dict[str, Any] = Field(default={}, description="工作流設定")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "name": "台灣金流處理工作流",
                "description": "整合 Line Pay 和綠界科技的金流處理流程",
                "is_active": True,
                "tags": ["金流", "台灣", "自動化"],
                "nodes": [
                    {
                        "id": "trigger-1",
                        "type": "manualTrigger",
                        "position": {"x": 100, "y": 100},
                        "data": {"label": "手動觸發"}
                    },
                    {
                        "id": "linepay-1",
                        "type": "linePay",
                        "position": {"x": 300, "y": 100},
                        "data": {
                            "label": "Line Pay",
                            "amount": 1000,
                            "productName": "測試商品"
                        }
                    }
                ],
                "edges": [
                    {
                        "id": "edge-1",
                        "source": "trigger-1",
                        "target": "linepay-1"
                    }
                ],
                "settings": {
                    "autoSave": True,
                    "gridSize": 20
                }
            }
        }


class WorkflowUpdate(BaseModel):
    """
    更新工作流模型
    """
    name: Optional[str] = Field(None, min_length=1, max_length=200, description="工作流名稱")
    description: Optional[str] = Field(None, max_length=1000, description="工作流描述")
    is_active: Optional[bool] = Field(None, description="是否啟用")
    tags: Optional[List[str]] = Field(None, description="標籤")
    nodes: Optional[List[Dict[str, Any]]] = Field(None, description="節點資料")
    edges: Optional[List[Dict[str, Any]]] = Field(None, description="邊線資料")
    settings: Optional[Dict[str, Any]] = Field(None, description="工作流設定")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "name": "更新後的工作流名稱",
                "description": "更新後的描述",
                "is_active": False,
                "tags": ["更新", "測試"]
            }
        }


class WorkflowResponse(WorkflowBase):
    """
    工作流回應模型
    """
    id: int = Field(..., description="工作流 ID")
    user_id: int = Field(..., description="使用者 ID")
    status: WorkflowStatus = Field(..., description="工作流狀態")
    nodes: List[Dict[str, Any]] = Field(..., description="節點資料")
    edges: List[Dict[str, Any]] = Field(..., description="邊線資料")
    settings: Dict[str, Any] = Field(..., description="工作流設定")
    created_at: datetime = Field(..., description="建立時間")
    updated_at: datetime = Field(..., description="更新時間")
    last_executed_at: Optional[datetime] = Field(None, description="最後執行時間")
    execution_count: int = Field(default=0, description="執行次數")
    
    model_config = {

    
    }        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "user_id": 1,
                "name": "台灣金流處理工作流",
                "description": "整合 Line Pay 和綠界科技的金流處理流程",
                "status": "active",
                "is_active": True,
                "tags": ["金流", "台灣", "自動化"],
                "nodes": [],
                "edges": [],
                "settings": {},
                "created_at": "2024-01-01T00:00:00Z",
                "updated_at": "2024-01-01T00:00:00Z",
                "last_executed_at": "2024-01-01T12:00:00Z",
                "execution_count": 10
            }
        }


class WorkflowExecutionCreate(BaseModel):
    """
    建立工作流執行模型
    """
    workflow_id: int = Field(..., description="工作流 ID")
    trigger_data: Optional[Dict[str, Any]] = Field(None, description="觸發資料")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "workflow_id": 1,
                "trigger_data": {
                    "manual": True,
                    "user_input": "測試執行"
                }
            }
        }


class WorkflowExecutionResponse(BaseModel):
    """
    工作流執行回應模型
    """
    id: int = Field(..., description="執行 ID")
    workflow_id: int = Field(..., description="工作流 ID")
    user_id: int = Field(..., description="使用者 ID")
    status: ExecutionStatus = Field(..., description="執行狀態")
    trigger_data: Optional[Dict[str, Any]] = Field(None, description="觸發資料")
    result_data: Optional[Dict[str, Any]] = Field(None, description="執行結果")
    error_message: Optional[str] = Field(None, description="錯誤訊息")
    started_at: datetime = Field(..., description="開始時間")
    finished_at: Optional[datetime] = Field(None, description="結束時間")
    duration: Optional[float] = Field(None, description="執行時長（秒）")
    
    model_config = {

    
    }        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "workflow_id": 1,
                "user_id": 1,
                "status": "success",
                "trigger_data": {"manual": True},
                "result_data": {"success": True, "message": "執行成功"},
                "error_message": None,
                "started_at": "2024-01-01T12:00:00Z",
                "finished_at": "2024-01-01T12:00:30Z",
                "duration": 30.5
            }
        }


class WorkflowStats(BaseModel):
    """
    工作流統計模型
    """
    workflow_id: int = Field(..., description="工作流 ID")
    total_executions: int = Field(..., description="總執行次數")
    successful_executions: int = Field(..., description="成功執行次數")
    failed_executions: int = Field(..., description="失敗執行次數")
    average_duration: Optional[float] = Field(None, description="平均執行時長（秒）")
    last_execution_at: Optional[datetime] = Field(None, description="最後執行時間")
    success_rate: float = Field(..., description="成功率")
    
    model_config = {

    
    }        schema_extra = {
            "example": {
                "workflow_id": 1,
                "total_executions": 100,
                "successful_executions": 95,
                "failed_executions": 5,
                "average_duration": 25.5,
                "last_execution_at": "2024-01-01T12:00:00Z",
                "success_rate": 0.95
            }
        }


class WorkflowTemplate(BaseModel):
    """
    工作流模板模型
    """
    id: int = Field(..., description="模板 ID")
    name: str = Field(..., description="模板名稱")
    description: str = Field(..., description="模板描述")
    category: str = Field(..., description="模板分類")
    tags: List[str] = Field(..., description="標籤")
    thumbnail_url: Optional[str] = Field(None, description="縮圖 URL")
    nodes: List[Dict[str, Any]] = Field(..., description="節點資料")
    edges: List[Dict[str, Any]] = Field(..., description="邊線資料")
    settings: Dict[str, Any] = Field(..., description="設定")
    usage_count: int = Field(default=0, description="使用次數")
    rating: float = Field(default=0.0, description="評分")
    created_at: datetime = Field(..., description="建立時間")
    
    model_config = {

    
    }        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "name": "台灣電商金流模板",
                "description": "整合多種台灣金流服務的電商工作流模板",
                "category": "電商",
                "tags": ["金流", "電商", "台灣"],
                "thumbnail_url": "https://example.com/template.jpg",
                "nodes": [],
                "edges": [],
                "settings": {},
                "usage_count": 50,
                "rating": 4.5,
                "created_at": "2024-01-01T00:00:00Z"
            }
        }
