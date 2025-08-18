"""
n8n 工作流引擎整合服務
"""

import httpx
import json
import asyncio
from typing import Dict, Any, List, Optional
from datetime import datetime
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class N8nService:
    """n8n 工作流引擎服務類別"""
    
    def __init__(self):
        self.base_url = f"{settings.N8N_PROTOCOL}://{settings.N8N_HOST}:{settings.N8N_PORT}"
        self.auth = None
        if settings.N8N_BASIC_AUTH_ACTIVE:
            self.auth = (settings.N8N_BASIC_AUTH_USER, settings.N8N_BASIC_AUTH_PASSWORD)
        
        # 設定 HTTP 客戶端
        self.client = httpx.AsyncClient(
            timeout=30.0,
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        )
    
    async def __aenter__(self):
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()
    
    async def health_check(self) -> bool:
        """檢查 n8n 服務健康狀態"""
        try:
            response = await self.client.get(
                f"{self.base_url}/healthz",
                auth=self.auth
            )
            return response.status_code == 200
        except Exception as e:
            logger.error(f"n8n 健康檢查失敗: {e}")
            return False
    
    # 工作流管理
    async def get_workflows(self) -> List[Dict[str, Any]]:
        """取得所有工作流"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/workflows",
                auth=self.auth
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"取得工作流失敗: {e}")
            raise
    
    async def get_workflow(self, workflow_id: str) -> Dict[str, Any]:
        """取得特定工作流"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/workflows/{workflow_id}",
                auth=self.auth
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"取得工作流 {workflow_id} 失敗: {e}")
            raise
    
    async def create_workflow(self, workflow_data: Dict[str, Any]) -> Dict[str, Any]:
        """建立新的工作流"""
        try:
            response = await self.client.post(
                f"{self.base_url}/api/v1/workflows",
                json=workflow_data,
                auth=self.auth
            )
            response.raise_for_status()
            result = response.json()
            logger.info(f"工作流已建立: {result.get('id')}")
            return result
        except Exception as e:
            logger.error(f"建立工作流失敗: {e}")
            raise
    
    async def update_workflow(self, workflow_id: str, workflow_data: Dict[str, Any]) -> Dict[str, Any]:
        """更新工作流"""
        try:
            response = await self.client.put(
                f"{self.base_url}/api/v1/workflows/{workflow_id}",
                json=workflow_data,
                auth=self.auth
            )
            response.raise_for_status()
            result = response.json()
            logger.info(f"工作流已更新: {workflow_id}")
            return result
        except Exception as e:
            logger.error(f"更新工作流 {workflow_id} 失敗: {e}")
            raise
    
    async def delete_workflow(self, workflow_id: str) -> bool:
        """刪除工作流"""
        try:
            response = await self.client.delete(
                f"{self.base_url}/api/v1/workflows/{workflow_id}",
                auth=self.auth
            )
            response.raise_for_status()
            logger.info(f"工作流已刪除: {workflow_id}")
            return True
        except Exception as e:
            logger.error(f"刪除工作流 {workflow_id} 失敗: {e}")
            raise
    
    async def activate_workflow(self, workflow_id: str, active: bool = True) -> Dict[str, Any]:
        """啟用或停用工作流"""
        try:
            response = await self.client.patch(
                f"{self.base_url}/api/v1/workflows/{workflow_id}",
                json={"active": active},
                auth=self.auth
            )
            response.raise_for_status()
            result = response.json()
            status = "啟用" if active else "停用"
            logger.info(f"工作流已{status}: {workflow_id}")
            return result
        except Exception as e:
            logger.error(f"{'啟用' if active else '停用'}工作流 {workflow_id} 失敗: {e}")
            raise
    
    # 工作流執行
    async def execute_workflow(self, workflow_id: str, input_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """執行工作流"""
        try:
            payload = {}
            if input_data:
                payload["inputData"] = input_data
            
            response = await self.client.post(
                f"{self.base_url}/api/v1/workflows/{workflow_id}/execute",
                json=payload,
                auth=self.auth
            )
            response.raise_for_status()
            result = response.json()
            logger.info(f"工作流執行已啟動: {workflow_id}, 執行ID: {result.get('id')}")
            return result
        except Exception as e:
            logger.error(f"執行工作流 {workflow_id} 失敗: {e}")
            raise
    
    async def execute_workflow_sync(self, workflow_id: str, input_data: Optional[Dict[str, Any]] = None, timeout: int = 60) -> Dict[str, Any]:
        """同步執行工作流（等待完成）"""
        execution = await self.execute_workflow(workflow_id, input_data)
        execution_id = execution.get("id")
        
        if not execution_id:
            raise ValueError("無法取得執行 ID")
        
        # 等待執行完成
        start_time = datetime.now()
        while (datetime.now() - start_time).seconds < timeout:
            execution_status = await self.get_execution(execution_id)
            
            if execution_status.get("finished"):
                return execution_status
            
            await asyncio.sleep(1)  # 等待 1 秒後再檢查
        
        raise TimeoutError(f"工作流執行超時: {execution_id}")

    async def stop_execution(self, execution_id: str) -> bool:
        """停止工作流執行"""
        try:
            response = await self.client.post(
                f"{self.base_url}/api/v1/executions/{execution_id}/stop",
                auth=self.auth
            )
            response.raise_for_status()
            logger.info(f"工作流執行已停止: {execution_id}")
            return True
        except Exception as e:
            logger.error(f"停止工作流執行 {execution_id} 失敗: {e}")
            raise
    
    # 執行記錄管理
    async def get_executions(self, limit: int = 20, offset: int = 0) -> List[Dict[str, Any]]:
        """取得執行記錄"""
        try:
            params = {
                "limit": limit,
                "offset": offset
            }
            response = await self.client.get(
                f"{self.base_url}/api/v1/executions",
                params=params,
                auth=self.auth
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"取得執行記錄失敗: {e}")
            raise
    
    async def get_execution(self, execution_id: str) -> Dict[str, Any]:
        """取得特定執行記錄"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/executions/{execution_id}",
                auth=self.auth
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"取得執行記錄 {execution_id} 失敗: {e}")
            raise
    
    async def stop_execution(self, execution_id: str) -> bool:
        """停止執行"""
        try:
            response = await self.client.post(
                f"{self.base_url}/api/v1/executions/{execution_id}/stop",
                auth=self.auth
            )
            response.raise_for_status()
            logger.info(f"執行已停止: {execution_id}")
            return True
        except Exception as e:
            logger.error(f"停止執行 {execution_id} 失敗: {e}")
            raise
    
    # 節點管理
    async def get_node_types(self) -> List[Dict[str, Any]]:
        """取得可用的節點類型"""
        try:
            response = await self.client.get(
                f"{self.base_url}/api/v1/node-types",
                auth=self.auth
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"取得節點類型失敗: {e}")
            raise
    
    # 工作流建構輔助方法
    def create_workflow_json(self, name: str, nodes: List[Dict[str, Any]], connections: Dict[str, Any]) -> Dict[str, Any]:
        """建立工作流 JSON 結構"""
        return {
            "name": name,
            "nodes": nodes,
            "connections": connections,
            "active": False,
            "settings": {},
            "tags": []
        }
    
    def create_node(self, node_id: str, node_name: str, node_type: str, position: List[int], parameters: Dict[str, Any]) -> Dict[str, Any]:
        """建立節點 JSON 結構"""
        return {
            "id": node_id,
            "name": node_name,
            "type": node_type,
            "position": position,
            "parameters": parameters
        }
    
    def create_connection(self, source_node: str, target_node: str, source_index: int = 0, target_index: int = 0) -> Dict[str, Any]:
        """建立連線 JSON 結構"""
        return {
            "node": target_node,
            "type": "main",
            "index": target_index
        }


# 全域 n8n 服務實例
n8n_service = N8nService()
