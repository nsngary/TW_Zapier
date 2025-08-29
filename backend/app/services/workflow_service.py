"""
工作流服務層 - 支援UUID格式和完整功能
"""

from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from datetime import datetime
import logging
import uuid

from app.core.exceptions import ResourceNotFoundError, WorkflowExecutionError
from app.models.workflow import Workflow, WorkflowExecution, WorkflowTemplate
from app.models.user import User
from app.schemas.workflow import WorkflowCreate, WorkflowUpdate, WorkflowSave, ExecutionStatus
from app.services.n8n_service import N8nService

logger = logging.getLogger("app.services.workflow")


class WorkflowService:
    """
    工作流服務類別 - 支援UUID格式和完整CRUD操作
    """
    
    def __init__(self, db: Session):
        self.db = db
        self.n8n_service = N8nService()
    
    # ==================== 基本CRUD操作 ====================
    
    async def get_workflow_by_id(self, workflow_id: str) -> Optional[Workflow]:
        """
        根據 UUID 取得工作流
        """
        try:
            # 驗證UUID格式
            uuid_obj = uuid.UUID(workflow_id)
            return self.db.query(Workflow).filter(Workflow.id == uuid_obj).first()
        except (ValueError, Exception) as e:
            logger.error(f"取得工作流失敗 (ID: {workflow_id}): {str(e)}")
            return None
    
    async def get_user_workflows(
        self, 
        user_id: uuid.UUID, 
        skip: int = 0, 
        limit: int = 100,
        category: Optional[str] = None,
        is_active: Optional[bool] = None
    ) -> List[Workflow]:
        """
        取得使用者的工作流列表
        """
        try:
            query = self.db.query(Workflow).filter(Workflow.user_id == user_id)
            
            if category:
                query = query.filter(Workflow.category == category)
            
            if is_active is not None:
                query = query.filter(Workflow.is_active == is_active)
            
            return query.order_by(Workflow.updated_at.desc()).offset(skip).limit(limit).all()
        except Exception as e:
            logger.error(f"取得使用者工作流列表失敗: {str(e)}")
            return []
    
    async def create_workflow(self, workflow_data: WorkflowCreate, user_id: uuid.UUID) -> Workflow:
        """
        建立新工作流
        """
        try:
            # 建立工作流記錄
            db_workflow = Workflow(
                name=workflow_data.name,
                description=workflow_data.description,
                category=workflow_data.category,
                user_id=user_id,
                is_active=workflow_data.is_active,
                tags=workflow_data.tags or [],
                nodes=workflow_data.nodes or [],
                edges=workflow_data.edges or [],
                settings=workflow_data.settings or {}
            )
            
            self.db.add(db_workflow)
            self.db.commit()
            self.db.refresh(db_workflow)
            
            # 同步到 n8n
            try:
                await self.n8n_service.create_workflow({
                    "id": str(db_workflow.id),
                    "name": db_workflow.name,
                    "nodes": db_workflow.nodes,
                    "connections": self._convert_edges_to_connections(db_workflow.edges),
                    "active": db_workflow.is_active
                })
            except Exception as e:
                logger.warning(f"同步工作流到 n8n 失敗: {str(e)}")
            
            logger.info(f"工作流建立成功: workflow_id={db_workflow.id}, user_id={user_id}")
            return db_workflow
            
        except Exception as e:
            self.db.rollback()
            logger.error(f"建立工作流失敗: {str(e)}")
            raise
    
    async def update_workflow(self, workflow_id: str, workflow_data: WorkflowUpdate) -> Workflow:
        """
        更新工作流
        """
        try:
            db_workflow = await self.get_workflow_by_id(workflow_id)
            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)
            
            # 更新工作流資訊
            update_data = workflow_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_workflow, field, value)
            
            db_workflow.updated_at = datetime.utcnow()
            self.db.commit()
            self.db.refresh(db_workflow)
            
            # 同步到 n8n
            try:
                await self.n8n_service.update_workflow(workflow_id, {
                    "name": db_workflow.name,
                    "nodes": db_workflow.nodes,
                    "connections": self._convert_edges_to_connections(db_workflow.edges),
                    "active": db_workflow.is_active
                })
            except Exception as e:
                logger.warning(f"同步工作流更新到 n8n 失敗: {str(e)}")
            
            logger.info(f"工作流更新成功: workflow_id={workflow_id}")
            return db_workflow
            
        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"更新工作流失敗: {str(e)}")
            raise

    async def save_workflow(self, workflow_id: str, user_id: str, workflow_data: WorkflowSave) -> Workflow:
        """
        儲存工作流（專門用於編輯器儲存）
        """
        try:
            # 驗證用戶權限
            uuid_workflow_id = uuid.UUID(workflow_id)
            uuid_user_id = uuid.UUID(user_id)

            db_workflow = self.db.query(Workflow).filter(
                Workflow.id == uuid_workflow_id,
                Workflow.user_id == uuid_user_id
            ).first()

            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)

            # 更新工作流內容
            db_workflow.nodes = workflow_data.nodes
            db_workflow.edges = workflow_data.edges

            # 更新設定，包含 viewport
            settings = workflow_data.settings or {}
            if workflow_data.viewport:
                settings['viewport'] = workflow_data.viewport
            db_workflow.settings = settings

            if workflow_data.name:
                db_workflow.name = workflow_data.name
            if workflow_data.description:
                db_workflow.description = workflow_data.description

            # 如果是第一次儲存且有內容，將狀態改為 ACTIVE
            if (db_workflow.status == "draft" and
                (workflow_data.nodes or workflow_data.edges)):
                db_workflow.status = "active"

            db_workflow.updated_at = datetime.utcnow()
            self.db.commit()
            self.db.refresh(db_workflow)

            logger.info(f"儲存工作流成功: {workflow_id}, 節點數: {len(workflow_data.nodes)}, 連線數: {len(workflow_data.edges)}")
            return db_workflow

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"儲存工作流失敗: {str(e)}")
            raise

    async def delete_workflow(self, workflow_id: str) -> bool:
        """
        刪除工作流
        """
        try:
            db_workflow = await self.get_workflow_by_id(workflow_id)
            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)
            
            # 從 n8n 刪除
            try:
                await self.n8n_service.delete_workflow(workflow_id)
            except Exception as e:
                logger.warning(f"從 n8n 刪除工作流失敗: {str(e)}")
            
            # 刪除相關的執行記錄
            uuid_obj = uuid.UUID(workflow_id)
            self.db.query(WorkflowExecution).filter(
                WorkflowExecution.workflow_id == uuid_obj
            ).delete()
            
            # 刪除工作流
            self.db.delete(db_workflow)
            self.db.commit()
            
            logger.info(f"工作流刪除成功: workflow_id={workflow_id}")
            return True
            
        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"刪除工作流失敗: {str(e)}")
            raise
    
    # ==================== 工作流執行相關 ====================
    
    async def execute_workflow(
        self, 
        workflow_id: str, 
        trigger_data: Optional[Dict[str, Any]] = None,
        user_id: Optional[uuid.UUID] = None
    ) -> WorkflowExecution:
        """
        執行工作流
        """
        try:
            db_workflow = await self.get_workflow_by_id(workflow_id)
            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)
            
            if not db_workflow.is_active:
                raise WorkflowExecutionError(
                    workflow_id=workflow_id,
                    message="工作流已停用"
                )
            
            # 建立執行記錄
            execution = WorkflowExecution(
                workflow_id=uuid.UUID(workflow_id),
                user_id=user_id or db_workflow.user_id,
                status=ExecutionStatus.PENDING,
                trigger_data=trigger_data,
                started_at=datetime.utcnow()
            )
            
            self.db.add(execution)
            self.db.commit()
            self.db.refresh(execution)
            
            # 透過 n8n 執行工作流
            try:
                execution.status = ExecutionStatus.RUNNING
                self.db.commit()
                
                result = await self.n8n_service.execute_workflow(workflow_id, trigger_data)
                
                execution.status = ExecutionStatus.SUCCESS
                execution.result_data = result
                execution.finished_at = datetime.utcnow()
                execution.duration = (execution.finished_at - execution.started_at).total_seconds()
                
                # 更新工作流統計
                db_workflow.execution_count += 1
                db_workflow.success_count += 1
                db_workflow.last_executed_at = execution.finished_at
                
                # 更新平均執行時間
                if db_workflow.average_duration:
                    db_workflow.average_duration = (
                        db_workflow.average_duration * (db_workflow.execution_count - 1) + 
                        execution.duration
                    ) / db_workflow.execution_count
                else:
                    db_workflow.average_duration = execution.duration
                
            except Exception as e:
                execution.status = ExecutionStatus.FAILED
                execution.error_message = str(e)
                execution.finished_at = datetime.utcnow()
                execution.duration = (execution.finished_at - execution.started_at).total_seconds()
                
                # 更新失敗統計
                db_workflow.execution_count += 1
                db_workflow.failure_count += 1
                
                logger.error(f"工作流執行失敗: workflow_id={workflow_id}, error={str(e)}")
            
            self.db.commit()
            self.db.refresh(execution)
            
            logger.info(f"工作流執行完成: workflow_id={workflow_id}, execution_id={execution.id}, status={execution.status}")
            return execution
            
        except (ResourceNotFoundError, WorkflowExecutionError):
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"執行工作流失敗: {str(e)}")
            raise
    
    async def get_workflow_executions(
        self, 
        workflow_id: str, 
        skip: int = 0, 
        limit: int = 50
    ) -> List[WorkflowExecution]:
        """
        取得工作流執行歷史
        """
        try:
            uuid_obj = uuid.UUID(workflow_id)
            return self.db.query(WorkflowExecution).filter(
                WorkflowExecution.workflow_id == uuid_obj
            ).order_by(WorkflowExecution.started_at.desc()).offset(skip).limit(limit).all()
        except Exception as e:
            logger.error(f"取得工作流執行歷史失敗: {str(e)}")
            return []
    
    async def stop_workflow_execution(self, execution_id: str) -> bool:
        """
        停止工作流執行
        """
        try:
            uuid_obj = uuid.UUID(execution_id)
            execution = self.db.query(WorkflowExecution).filter(
                WorkflowExecution.id == uuid_obj
            ).first()
            
            if not execution:
                raise ResourceNotFoundError("執行記錄", execution_id)
            
            if execution.status not in [ExecutionStatus.PENDING, ExecutionStatus.RUNNING]:
                return False  # 已經完成或失敗，無法停止
            
            # 在 n8n 中停止執行
            try:
                await self.n8n_service.stop_execution(execution.execution_id)
            except Exception as e:
                logger.warning(f"在 n8n 中停止執行失敗: {str(e)}")
            
            # 更新執行狀態
            execution.status = ExecutionStatus.CANCELLED
            execution.finished_at = datetime.utcnow()
            execution.duration = (execution.finished_at - execution.started_at).total_seconds()
            
            self.db.commit()
            
            logger.info(f"工作流執行停止成功: execution_id={execution_id}")
            return True

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"停止工作流執行失敗: {str(e)}")
            raise

    # ==================== 工作流狀態管理 ====================

    async def activate_workflow(self, workflow_id: str) -> bool:
        """
        啟用工作流
        """
        try:
            db_workflow = await self.get_workflow_by_id(workflow_id)
            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)

            db_workflow.is_active = True
            self.db.commit()

            # 同步到 n8n
            try:
                await self.n8n_service.activate_workflow(workflow_id)
            except Exception as e:
                logger.warning(f"在 n8n 中啟用工作流失敗: {str(e)}")

            logger.info(f"工作流啟用成功: workflow_id={workflow_id}")
            return True

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"啟用工作流失敗: {str(e)}")
            raise

    async def deactivate_workflow(self, workflow_id: str) -> bool:
        """
        停用工作流
        """
        try:
            db_workflow = await self.get_workflow_by_id(workflow_id)
            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)

            db_workflow.is_active = False
            self.db.commit()

            # 同步到 n8n
            try:
                await self.n8n_service.deactivate_workflow(workflow_id)
            except Exception as e:
                logger.warning(f"在 n8n 中停用工作流失敗: {str(e)}")

            logger.info(f"工作流停用成功: workflow_id={workflow_id}")
            return True

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"停用工作流失敗: {str(e)}")
            raise

    # ==================== 工作流統計 ====================

    async def get_workflow_stats(self, workflow_id: str) -> Dict[str, Any]:
        """
        取得工作流統計資訊
        """
        try:
            db_workflow = await self.get_workflow_by_id(workflow_id)
            if not db_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)

            # 計算成功率
            success_rate = 0.0
            if db_workflow.execution_count > 0:
                success_rate = (db_workflow.success_count / db_workflow.execution_count) * 100

            return {
                "workflow_id": str(db_workflow.id),
                "total_executions": db_workflow.execution_count,
                "successful_executions": db_workflow.success_count,
                "failed_executions": db_workflow.failure_count,
                "average_duration": db_workflow.average_duration,
                "last_execution_at": db_workflow.last_executed_at,
                "success_rate": success_rate
            }

        except ResourceNotFoundError:
            raise
        except Exception as e:
            logger.error(f"取得工作流統計失敗: {str(e)}")
            raise

    # ==================== 工作流模板相關 ====================

    async def get_workflow_templates(
        self,
        skip: int = 0,
        limit: int = 50,
        category: Optional[str] = None,
        taiwan_featured: Optional[bool] = None
    ) -> List[WorkflowTemplate]:
        """
        取得工作流模板列表
        """
        try:
            query = self.db.query(WorkflowTemplate).filter(WorkflowTemplate.is_active == True)

            if category:
                query = query.filter(WorkflowTemplate.category == category)

            if taiwan_featured is not None:
                query = query.filter(WorkflowTemplate.is_taiwan_featured == taiwan_featured)

            return query.order_by(WorkflowTemplate.usage_count.desc()).offset(skip).limit(limit).all()

        except Exception as e:
            logger.error(f"取得工作流模板失敗: {str(e)}")
            return []

    async def create_workflow_from_template(
        self,
        template_id: str,
        user_id: uuid.UUID,
        workflow_name: Optional[str] = None
    ) -> Workflow:
        """
        從模板建立工作流
        """
        try:
            # 取得模板
            template_uuid = uuid.UUID(template_id)
            template = self.db.query(WorkflowTemplate).filter(
                WorkflowTemplate.id == template_uuid
            ).first()

            if not template:
                raise ResourceNotFoundError("工作流模板", template_id)

            # 建立工作流
            workflow_data = WorkflowCreate(
                name=workflow_name or f"{template.name} - 副本",
                description=template.description,
                category=template.category,
                tags=template.tags,
                nodes=template.nodes,
                edges=template.edges,
                settings=template.settings,
                is_active=False  # 預設為停用，讓使用者手動啟用
            )

            workflow = await self.create_workflow(workflow_data, user_id)

            # 更新模板使用次數
            template.usage_count += 1
            self.db.commit()

            logger.info(f"從模板建立工作流成功: template_id={template_id}, workflow_id={workflow.id}")
            return workflow

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"從模板建立工作流失敗: {str(e)}")
            raise

    # ==================== 工作流複製和分享 ====================

    async def duplicate_workflow(
        self,
        workflow_id: str,
        new_name: Optional[str] = None,
        user_id: Optional[uuid.UUID] = None
    ) -> Workflow:
        """
        複製工作流
        """
        try:
            original_workflow = await self.get_workflow_by_id(workflow_id)
            if not original_workflow:
                raise ResourceNotFoundError("工作流", workflow_id)

            # 建立複製的工作流
            workflow_data = WorkflowCreate(
                name=new_name or f"{original_workflow.name} - 副本",
                description=original_workflow.description,
                category=original_workflow.category,
                tags=original_workflow.tags,
                nodes=original_workflow.nodes,
                edges=original_workflow.edges,
                settings=original_workflow.settings,
                is_active=False  # 預設為停用
            )

            duplicated_workflow = await self.create_workflow(
                workflow_data,
                user_id or original_workflow.user_id
            )

            logger.info(f"工作流複製成功: original_id={workflow_id}, new_id={duplicated_workflow.id}")
            return duplicated_workflow

        except ResourceNotFoundError:
            raise
        except Exception as e:
            logger.error(f"複製工作流失敗: {str(e)}")
            raise

    # ==================== 輔助方法 ====================

    def _convert_edges_to_connections(self, edges: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        將邊線格式轉換為 n8n 連接格式
        """
        connections = {}

        for edge in edges:
            source = edge.get("source")
            target = edge.get("target")
            source_handle = edge.get("sourceHandle", "main")
            target_handle = edge.get("targetHandle", "main")

            if source and target:
                if source not in connections:
                    connections[source] = {}

                if source_handle not in connections[source]:
                    connections[source][source_handle] = []

                connections[source][source_handle].append({
                    "node": target,
                    "type": target_handle,
                    "index": 0
                })

        return connections

    # ==================== 工作流版本管理 ====================

    async def get_workflow_versions(
        self,
        workflow_id: str,
        skip: int = 0,
        limit: int = 20
    ) -> List:
        """
        取得工作流版本列表
        """
        try:
            from app.models.workflow import WorkflowVersion
            uuid_obj = uuid.UUID(workflow_id)
            return self.db.query(WorkflowVersion).filter(
                WorkflowVersion.workflow_id == uuid_obj
            ).order_by(WorkflowVersion.version_number.desc()).offset(skip).limit(limit).all()
        except Exception as e:
            logger.error(f"取得工作流版本列表失敗: {str(e)}")
            return []

    async def create_workflow_version(
        self,
        workflow_id: str,
        version_data,
        created_by: uuid.UUID
    ):
        """
        建立工作流新版本
        """
        try:
            from app.models.workflow import WorkflowVersion

            # 取得當前最大版本號
            uuid_obj = uuid.UUID(workflow_id)
            max_version = self.db.query(WorkflowVersion).filter(
                WorkflowVersion.workflow_id == uuid_obj
            ).order_by(WorkflowVersion.version_number.desc()).first()

            next_version = (max_version.version_number + 1) if max_version else 1

            # 建立新版本
            version = WorkflowVersion(
                workflow_id=uuid_obj,
                version_number=next_version,
                version_name=version_data.version_name,
                description=version_data.description,
                nodes=version_data.nodes,
                edges=version_data.edges,
                settings=version_data.settings or {},
                created_by=created_by
            )

            self.db.add(version)
            self.db.commit()
            self.db.refresh(version)

            logger.info(f"工作流版本建立成功: workflow_id={workflow_id}, version={next_version}")
            return version

        except Exception as e:
            self.db.rollback()
            logger.error(f"建立工作流版本失敗: {str(e)}")
            raise

    async def publish_workflow_version(self, version_id: str) -> bool:
        """
        發布工作流版本
        """
        try:
            from app.models.workflow import WorkflowVersion

            uuid_obj = uuid.UUID(version_id)
            version = self.db.query(WorkflowVersion).filter(
                WorkflowVersion.id == uuid_obj
            ).first()

            if not version:
                raise ResourceNotFoundError("工作流版本", version_id)

            version.is_published = True
            self.db.commit()

            logger.info(f"工作流版本發布成功: version_id={version_id}")
            return True

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"發布工作流版本失敗: {str(e)}")
            raise

    async def rollback_to_version(self, workflow_id: str, version_id: str):
        """
        回滾到指定工作流版本
        """
        try:
            from app.models.workflow import WorkflowVersion

            # 取得指定版本
            version_uuid = uuid.UUID(version_id)
            version = self.db.query(WorkflowVersion).filter(
                WorkflowVersion.id == version_uuid
            ).first()

            if not version:
                raise ResourceNotFoundError("工作流版本", version_id)

            # 取得工作流
            workflow = await self.get_workflow_by_id(workflow_id)
            if not workflow:
                raise ResourceNotFoundError("工作流", workflow_id)

            # 更新工作流為指定版本的內容
            workflow.nodes = version.nodes
            workflow.edges = version.edges
            workflow.settings = version.settings
            workflow.updated_at = datetime.utcnow()

            self.db.commit()
            self.db.refresh(workflow)

            logger.info(f"工作流版本回滾成功: workflow_id={workflow_id}, version_id={version_id}")
            return workflow

        except ResourceNotFoundError:
            raise
        except Exception as e:
            self.db.rollback()
            logger.error(f"回滾工作流版本失敗: {str(e)}")
            raise
