"""
工作流管理 API 端點 - 支援UUID格式和完整CRUD操作
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import logging
import uuid

from app.core.database import get_db
from app.core.security import get_current_user, security, verify_token
from app.core.exceptions import (
    ResourceNotFoundError,
    AuthorizationError,
    WorkflowExecutionError
)
from app.schemas.workflow import (
    WorkflowCreate,
    WorkflowUpdate,
    WorkflowSave,
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


async def get_current_user_from_token(
    credentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    從Token取得當前使用者
    """
    from app.core.exceptions import AuthenticationError

    try:
        # 驗證權杖
        user_id = verify_token(credentials.credentials)
        if not user_id:
            raise AuthenticationError("無效的權杖")

        # 查詢使用者
        user_uuid = uuid.UUID(user_id)
        user = db.query(User).filter(User.id == user_uuid).first()

        if not user:
            raise AuthenticationError("使用者不存在")

        if not user.is_active:
            raise AuthenticationError("帳號已被停用")

        return user

    except AuthenticationError:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"認證失敗: {str(e)}"
        )


# ==================== 工作流 CRUD API ====================

@router.get("/", response_model=List[WorkflowResponse])
async def get_workflows(
    skip: int = Query(0, ge=0, description="跳過的記錄數"),
    limit: int = Query(100, ge=1, le=1000, description="返回的記錄數"),
    category: Optional[str] = Query(None, description="分類篩選"),
    is_active: Optional[bool] = Query(None, description="是否啟用篩選"),
    current_user: User = Depends(get_current_user_from_token),
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
    current_user: User = Depends(get_current_user_from_token),
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
    current_user: User = Depends(get_current_user_from_token),
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
    current_user: User = Depends(get_current_user_from_token),
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


@router.post("/{workflow_id}/save", response_model=WorkflowResponse)
async def save_workflow(
    workflow_id: str,
    workflow_data: WorkflowSave,
    current_user: User = Depends(get_current_user_from_token),
    db: Session = Depends(get_db)
):
    """
    儲存工作流（專門用於編輯器儲存）
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
        workflow = await workflow_service.save_workflow(
            workflow_id=workflow_id,
            user_id=str(current_user.id),
            workflow_data=workflow_data
        )

        logger.info(f"工作流儲存成功: workflow_id={workflow_id}, user_id={current_user.id}")
        return WorkflowResponse.from_orm(workflow)

    except ResourceNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="工作流不存在"
        )
    except AuthorizationError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="沒有權限儲存此工作流"
        )
    except Exception as e:
        logger.error(f"儲存工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="儲存工作流失敗"
        )


@router.delete("/{workflow_id}")
async def delete_workflow(
    workflow_id: str,
    current_user: User = Depends(get_current_user_from_token),
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
    current_user: User = Depends(get_current_user_from_token),
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


@router.get("/{workflow_id}/executions", response_model=List[WorkflowExecutionResponse])
async def get_workflow_executions(
    workflow_id: str,
    skip: int = Query(0, ge=0, description="跳過的記錄數"),
    limit: int = Query(50, ge=1, le=500, description="返回的記錄數"),
    current_user: User = Depends(get_current_user_from_token),
    db: Session = Depends(get_db)
):
    """
    取得工作流執行歷史
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

        # 檢查權限：只能查看自己的工作流執行記錄
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能查看自己的工作流執行記錄")

        executions = await workflow_service.get_workflow_executions(
            workflow_id=workflow_id,
            skip=skip,
            limit=limit
        )

        return [WorkflowExecutionResponse.from_orm(execution) for execution in executions]

    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"取得工作流執行歷史失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得工作流執行歷史失敗"
        )


@router.post("/{workflow_id}/activate")
async def activate_workflow(
    workflow_id: str,
    current_user: User = Depends(get_current_user_from_token),
    db: Session = Depends(get_db)
):
    """
    啟用工作流
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

        # 檢查權限：只能啟用自己的工作流
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能啟用自己的工作流")

        await workflow_service.activate_workflow(workflow_id)

        logger.info(f"工作流啟用成功: workflow_id={workflow_id}, user_id={current_user.id}")
        return {"message": "工作流已啟用", "workflow_id": workflow_id}

    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"啟用工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="啟用工作流失敗"
        )


@router.post("/{workflow_id}/deactivate")
async def deactivate_workflow(
    workflow_id: str,
    current_user: User = Depends(get_current_user_from_token),
    db: Session = Depends(get_db)
):
    """
    停用工作流
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

        # 檢查權限：只能停用自己的工作流
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能停用自己的工作流")

        await workflow_service.deactivate_workflow(workflow_id)

        logger.info(f"工作流停用成功: workflow_id={workflow_id}, user_id={current_user.id}")
        return {"message": "工作流已停用", "workflow_id": workflow_id}

    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"停用工作流失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="停用工作流失敗"
        )


# ==================== 工作流統計和模板 API ====================

@router.get("/{workflow_id}/stats", response_model=WorkflowStatsResponse)
async def get_workflow_stats(
    workflow_id: str,
    current_user: User = Depends(get_current_user_from_token),
    db: Session = Depends(get_db)
):
    """
    取得工作流統計資訊
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

        # 檢查權限：只能查看自己的工作流統計
        if workflow.user_id != current_user.id:
            raise AuthorizationError("只能查看自己的工作流統計")

        stats = await workflow_service.get_workflow_stats(workflow_id)

        return WorkflowStatsResponse(**stats)

    except (ResourceNotFoundError, AuthorizationError):
        raise
    except Exception as e:
        logger.error(f"取得工作流統計失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得工作流統計失敗"
        )


@router.get("/templates/", response_model=List[WorkflowTemplateResponse])
async def get_workflow_templates(
    skip: int = Query(0, ge=0, description="跳過的記錄數"),
    limit: int = Query(50, ge=1, le=200, description="返回的記錄數"),
    category: Optional[str] = Query(None, description="分類篩選"),
    taiwan_featured: Optional[bool] = Query(None, description="是否只顯示台灣特色模板"),
    db: Session = Depends(get_db)
):
    """
    取得工作流模板列表（公開API，不需要認證）
    """
    try:
        workflow_service = WorkflowService(db)
        templates = await workflow_service.get_workflow_templates(
            skip=skip,
            limit=limit,
            category=category,
            taiwan_featured=taiwan_featured
        )

        return [WorkflowTemplateResponse.from_orm(template) for template in templates]

    except Exception as e:
        logger.error(f"取得工作流模板失敗: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="取得工作流模板失敗"
        )
