/**
 * 工作流服務 - 處理工作流的儲存、載入和管理
 */

import { apiClient } from '@/utils/api'
import type { 
  WorkflowNode, 
  WorkflowConnection, 
  WorkflowData,
  WorkflowExecution,
  WorkflowTemplate 
} from '@/types/workflow'

// ===== 工作流 CRUD 操作 =====

/**
 * 獲取工作流列表
 */
export async function getWorkflows(params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
}): Promise<{
  workflows: WorkflowData[]
  total: number
  page: number
  limit: number
}> {
  const response = await apiClient.get('/workflows/', { params })
  return response.data
}

/**
 * 獲取單個工作流
 */
export async function getWorkflow(workflowId: string): Promise<WorkflowData> {
  const response = await apiClient.get(`/workflows/${workflowId}`)
  return response.data
}

/**
 * 建立新工作流
 */
export async function createWorkflow(workflowData: {
  name: string
  description?: string
  category?: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  settings?: Record<string, any>
}): Promise<WorkflowData> {
  const response = await apiClient.post('/workflows/', workflowData)
  return response.data
}

/**
 * 更新工作流
 */
export async function updateWorkflow(
  workflowId: string, 
  workflowData: Partial<WorkflowData>
): Promise<WorkflowData> {
  const response = await apiClient.put(`/workflows/${workflowId}`, workflowData)
  return response.data
}

/**
 * 刪除工作流
 */
export async function deleteWorkflow(workflowId: string): Promise<void> {
  await apiClient.delete(`/workflows/${workflowId}`)
}

/**
 * 複製工作流
 */
export async function duplicateWorkflow(
  workflowId: string,
  newName?: string
): Promise<WorkflowData> {
  const response = await apiClient.post(`/workflows/${workflowId}/duplicate`, {
    name: newName
  })
  return response.data
}

// ===== 工作流執行操作 =====

/**
 * 執行工作流
 */
export async function executeWorkflow(
  workflowId: string,
  inputData?: Record<string, any>
): Promise<{
  executionId: string
  status: string
  message: string
}> {
  const response = await apiClient.post(`/workflows/${workflowId}/execute`, {
    inputData
  })
  return response.data
}

/**
 * 停止工作流執行
 */
export async function stopWorkflowExecution(
  workflowId: string,
  executionId: string
): Promise<void> {
  await apiClient.post(`/workflows/${workflowId}/executions/${executionId}/stop`)
}

/**
 * 獲取工作流執行歷史
 */
export async function getWorkflowExecutions(
  workflowId: string,
  params?: {
    page?: number
    limit?: number
    status?: string
  }
): Promise<{
  executions: WorkflowExecution[]
  total: number
  page: number
  limit: number
}> {
  const response = await apiClient.get(`/workflows/${workflowId}/executions`, { params })
  return response.data
}

/**
 * 獲取執行詳情
 */
export async function getExecutionDetails(
  workflowId: string,
  executionId: string
): Promise<WorkflowExecution> {
  const response = await apiClient.get(`/workflows/${workflowId}/executions/${executionId}`)
  return response.data
}

// ===== 工作流狀態管理 =====

/**
 * 啟用工作流
 */
export async function activateWorkflow(workflowId: string): Promise<void> {
  await apiClient.post(`/workflows/${workflowId}/activate`)
}

/**
 * 停用工作流
 */
export async function deactivateWorkflow(workflowId: string): Promise<void> {
  await apiClient.post(`/workflows/${workflowId}/deactivate`)
}

/**
 * 獲取工作流統計
 */
export async function getWorkflowStats(workflowId: string): Promise<{
  totalExecutions: number
  successfulExecutions: number
  failedExecutions: number
  averageExecutionTime: number
  lastExecutionTime: string
  isActive: boolean
}> {
  const response = await apiClient.get(`/workflows/${workflowId}/stats`)
  return response.data
}

// ===== 工作流模板操作 =====

/**
 * 獲取工作流模板列表
 */
export async function getWorkflowTemplates(params?: {
  category?: string
  featured?: boolean
  taiwan?: boolean
}): Promise<WorkflowTemplate[]> {
  const response = await apiClient.get('/workflows/templates/', { params })
  return response.data
}

/**
 * 從模板建立工作流
 */
export async function createWorkflowFromTemplate(
  templateId: string,
  workflowName: string
): Promise<WorkflowData> {
  const response = await apiClient.post(`/workflows/templates/${templateId}/use`, {
    name: workflowName
  })
  return response.data
}

// ===== 工作流版本管理 =====

/**
 * 獲取工作流版本列表
 */
export async function getWorkflowVersions(workflowId: string): Promise<{
  versions: Array<{
    id: string
    version: string
    description: string
    createdAt: string
    isPublished: boolean
  }>
}> {
  const response = await apiClient.get(`/workflows/${workflowId}/versions`)
  return response.data
}

/**
 * 建立新版本
 */
export async function createWorkflowVersion(
  workflowId: string,
  versionData: {
    description?: string
    nodes: WorkflowNode[]
    connections: WorkflowConnection[]
  }
): Promise<{
  versionId: string
  version: string
}> {
  const response = await apiClient.post(`/workflows/${workflowId}/versions`, versionData)
  return response.data
}

/**
 * 發布版本
 */
export async function publishWorkflowVersion(
  workflowId: string,
  versionId: string
): Promise<void> {
  await apiClient.post(`/workflows/${workflowId}/versions/${versionId}/publish`)
}

/**
 * 版本回滾
 */
export async function rollbackWorkflowVersion(
  workflowId: string,
  versionId: string
): Promise<void> {
  await apiClient.post(`/workflows/${workflowId}/versions/${versionId}/rollback`)
}

// ===== 本地儲存工具函數 =====

const STORAGE_KEY = 'tw_zapier_workflows'
const DRAFT_KEY = 'tw_zapier_workflow_draft'

/**
 * 儲存工作流草稿到本地
 */
export function saveWorkflowDraft(workflowData: {
  name: string
  description?: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  settings?: Record<string, any>
}): void {
  try {
    const draftData = {
      ...workflowData,
      savedAt: new Date().toISOString(),
      version: '1.0.0'
    }
    
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData))
    console.log('✅ 工作流草稿已儲存到本地')
  } catch (error) {
    console.error('❌ 儲存工作流草稿失敗:', error)
    throw new Error('儲存草稿失敗')
  }
}

/**
 * 從本地載入工作流草稿
 */
export function loadWorkflowDraft(): {
  name: string
  description?: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  settings?: Record<string, any>
  savedAt: string
  version: string
} | null {
  try {
    const draftData = localStorage.getItem(DRAFT_KEY)
    if (!draftData) return null
    
    const parsed = JSON.parse(draftData)
    console.log('✅ 工作流草稿已從本地載入')
    return parsed
  } catch (error) {
    console.error('❌ 載入工作流草稿失敗:', error)
    return null
  }
}

/**
 * 清除本地工作流草稿
 */
export function clearWorkflowDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY)
    console.log('✅ 工作流草稿已清除')
  } catch (error) {
    console.error('❌ 清除工作流草稿失敗:', error)
  }
}

/**
 * 檢查是否有本地草稿
 */
export function hasDraftWorkflow(): boolean {
  return localStorage.getItem(DRAFT_KEY) !== null
}

/**
 * 匯出工作流為 JSON 檔案
 */
export function exportWorkflowAsJSON(workflowData: WorkflowData): void {
  try {
    const exportData = {
      ...workflowData,
      exportedAt: new Date().toISOString(),
      exportVersion: '1.0.0',
      platform: 'TW_Zapier'
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${workflowData.name || 'workflow'}_${Date.now()}.json`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    URL.revokeObjectURL(url)
    console.log('✅ 工作流已匯出為 JSON 檔案')
  } catch (error) {
    console.error('❌ 匯出工作流失敗:', error)
    throw new Error('匯出工作流失敗')
  }
}

/**
 * 從 JSON 檔案匯入工作流
 */
export function importWorkflowFromJSON(file: File): Promise<WorkflowData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const workflowData = JSON.parse(content)
        
        // 驗證工作流資料格式
        if (!workflowData.name || !Array.isArray(workflowData.nodes)) {
          throw new Error('無效的工作流檔案格式')
        }
        
        console.log('✅ 工作流已從 JSON 檔案匯入')
        resolve(workflowData)
      } catch (error) {
        console.error('❌ 匯入工作流失敗:', error)
        reject(new Error('匯入工作流失敗：檔案格式錯誤'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('讀取檔案失敗'))
    }
    
    reader.readAsText(file)
  })
}

/**
 * 驗證工作流資料完整性
 */
export function validateWorkflowData(workflowData: any): {
  isValid: boolean
  errors: string[]
  warnings: string[]
} {
  const result = {
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[]
  }
  
  // 檢查必要欄位
  if (!workflowData.name || typeof workflowData.name !== 'string') {
    result.isValid = false
    result.errors.push('工作流名稱是必要的')
  }
  
  if (!Array.isArray(workflowData.nodes)) {
    result.isValid = false
    result.errors.push('節點資料格式錯誤')
  }
  
  if (!Array.isArray(workflowData.connections)) {
    result.isValid = false
    result.errors.push('連線資料格式錯誤')
  }
  
  // 檢查節點完整性
  if (workflowData.nodes) {
    workflowData.nodes.forEach((node: any, index: number) => {
      if (!node.id || !node.type) {
        result.isValid = false
        result.errors.push(`節點 ${index + 1} 缺少必要資訊`)
      }
    })
  }
  
  // 檢查連線完整性
  if (workflowData.connections) {
    workflowData.connections.forEach((conn: any, index: number) => {
      if (!conn.source || !conn.target) {
        result.isValid = false
        result.errors.push(`連線 ${index + 1} 缺少來源或目標`)
      }
    })
  }
  
  // 檢查是否有觸發節點
  if (workflowData.nodes) {
    const hasTrigger = workflowData.nodes.some((node: any) => 
      ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
    )
    
    if (!hasTrigger) {
      result.warnings.push('工作流沒有觸發節點')
    }
  }
  
  return result
}
