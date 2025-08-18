"""
工作流管理 API 端點 - 支援UUID格式和完整CRUD操作
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import logging
import uuid

from app.core.database import get_db
from app.core.security import get_current_user
from app.core.exceptions import (
    ResourceNotFoundError,
    AuthorizationError,
    WorkflowExecutionError
)
from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate,
    WorkflowResponse,
    WorkflowExecutionCreate,
    WorkflowExecutionResponse,
    WorkflowVersionCreate,
    WorkflowVersionResponse,
    WorkflowTemplateResponse,
    WorkflowStatsResponse
)
from app.services.workflow_service import WorkflowService
from app.models.user import User

router = APIRouter()
logger = logging.getLogger("app.api.workflows")


# ==================== 工作流 CRUD API ====================

@router.get("/", response_model=List[WorkflowResponse])
async def get_workflows(
    skip: int = Query(0, ge=0, description="跳過的記錄數"),
    limit: int = Query(100, ge=1, le=1000, description="返回的記錄數"),
    category: Optional[str] = Query(None, description="分類篩選"),
    is_active: Optional[bool] = Query(None, description="是否啟用篩選"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    取得使用者的工作流列表
    """
    try:
        workflow_service = WorkflowService(db)
        workflows = await workflow_service.get_user_workflows(
            user_id=current_user.id,
            skip=skip,
            limit=limit,
            category=category,
            is_active=is_active
        )
        
        return [WorkflowResponse.from_orm(workflow) for workflow in workflows]
        
    except Exception as e:
        logger.error(f"取得工作流列表失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得工作流列表失敗"
        )


@router.post("/", response_model=WorkflowResponse)
async def create_workflow(
    workflow_data: WorkflowCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    建立新工作流
    """
    try:
        workflow_service = WorkflowService(db)
        workflow = await workflow_service.create_workflow(
            workflow_data=workflow_data,
            user_id=current_user.id
        )
        
        logger.info(f"工作流建立成功: workflow_id={workflow.id}, user_id={current_user.id}")
        return WorkflowResponse.from_orm(workflow)
        
    except Exception as e:
        logger.error(f"建立工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="建立工作流失敗"
        )


@router.get("/{workflow_id}", response_model=WorkflowResponse)
async def get_workflow(
    workflow_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    取得指定工作流詳細資訊
    """
    try:
        # 驗證UUID格式
        try:
            uuid.UUID(workflow_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="無效的工作流ID格式"
            )
        
        workflow_service = WorkflowService(db)
        workflow = await workflow_service.get_workflow_by_id(workflow_id)
        
        if not workflow:
            raise ResourceNotFoundError("工作流", workflow_id)
        
        # 檢查權限：只能查看自己的工作流
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能查看自己的工作流")
        
        return WorkflowResponse.from_orm(workflow)
        
    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"取得工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得工作流失敗"
        )


@router.put("/{workflow_id}", response_model=WorkflowResponse)
async def update_workflow(
    workflow_id: str,
    workflow_data: WorkflowUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    更新工作流
    """
    try:
        # 驗證UUID格式
        try:
            uuid.UUID(workflow_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="無效的工作流ID格式"
            )
        
        workflow_service = WorkflowService(db)
        workflow = await workflow_service.get_workflow_by_id(workflow_id)
        
        if not workflow:
            raise ResourceNotFoundError("工作流", workflow_id)
        
        # 檢查權限：只能更新自己的工作流
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能更新自己的工作流")
        
        updated_workflow = await workflow_service.update_workflow(
            workflow_id=workflow_id,
            workflow_data=workflow_data
        )
        
        logger.info(f"工作流更新成功: workflow_id={workflow_id}, user_id={current_user.id}")
        return WorkflowResponse.from_orm(updated_workflow)
        
    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"更新工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="更新工作流失敗"
        )


@router.delete("/{workflow_id}")
async def delete_workflow(
    workflow_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    刪除工作流
    """
    try:
        # 驗證UUID格式
        try:
            uuid.UUID(workflow_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="無效的工作流ID格式"
            )
        
        workflow_service = WorkflowService(db)
        workflow = await workflow_service.get_workflow_by_id(workflow_id)
        
        if not workflow:
            raise ResourceNotFoundError("工作流", workflow_id)
        
        # 檢查權限：只能刪除自己的工作流
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能刪除自己的工作流")
        
        await workflow_service.delete_workflow(workflow_id)
        
        logger.info(f"工作流刪除成功: workflow_id={workflow_id}, user_id={current_user.id}")
        return {"message": "工作流刪除成功", "workflow_id": workflow_id}
        
    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"刪除工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="刪除工作流失敗"
        )


# ==================== 工作流執行 API ====================

@router.post("/{workflow_id}/execute", response_model=WorkflowExecutionResponse)
async def execute_workflow(
    workflow_id: str,
    execution_data: Optional[WorkflowExecutionCreate] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    執行工作流
    """
    try:
        # 驗證UUID格式
        try:
            uuid.UUID(workflow_id)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="無效的工作流ID格式"
            )
        
        workflow_service = WorkflowService(db)
        workflow = await workflow_service.get_workflow_by_id(workflow_id)
        
        if not workflow:
            raise ResourceNotFoundError("工作流", workflow_id)
        
        # 檢查權限：只能執行自己的工作流
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能執行自己的工作流")
        
        # 檢查工作流是否啟用
        if not workflow.is_active:
            raise WorkflowExecutionError(
                workflow_id=workflow_id,
                message="工作流已停用，無法執行"
            )
        
        # 執行工作流
        execution = await workflow_service.execute_workflow(
            workflow_id=workflow_id,
            trigger_data=execution_data.trigger_data if execution_data else None,
            user_id=current_user.id
        )
        
        logger.info(f"工作流執行成功: workflow_id={workflow_id}, execution_id={execution.id}")
        return WorkflowExecutionResponse.from_orm(execution)
        
    except (ResourceNotFoundError, AuthorizationError, WorkflowExecutionError):
        raise
    except Exception as e:
        logger.error(f"執行工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="執行工作流失敗"
        )
