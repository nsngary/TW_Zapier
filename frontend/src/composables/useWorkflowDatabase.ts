import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { Node, Edge } from '@vue-flow/core'
import { workflowApi, type WorkflowResponse, type WorkflowSaveRequest, type WorkflowCreateRequest } from '@/services/workflowApi'

/**
 * 工作流資料庫操作 Composable
 * 提供與後端資料庫的工作流 CRUD 操作
 */
export function useWorkflowDatabase() {
  // ===== 狀態管理 =====
  
  const isLoading = ref(false)
  const currentWorkflow = ref<WorkflowResponse | null>(null)
  const userWorkflows = ref<WorkflowResponse[]>([])
  const lastSavedAt = ref<Date | null>(null)
  const hasUnsavedChanges = ref(false)
  
  // ===== 計算屬性 =====
  
  const currentWorkflowId = computed(() => currentWorkflow.value?.id)
  const currentWorkflowName = computed(() => currentWorkflow.value?.name || '未命名工作流')
  const isNewWorkflow = computed(() => !currentWorkflow.value?.id)
  
  // ===== 工作流 CRUD 操作 =====
  
  /**
   * 建立新工作流
   */
  const createWorkflow = async (
    name: string,
    description?: string,
    nodes: Node[] = [],
    edges: Edge[] = [],
    viewport?: { x: number; y: number; zoom: number }
  ): Promise<WorkflowResponse> => {
    try {
      isLoading.value = true
      
      const workflowData: WorkflowCreateRequest = {
        name: name.trim() || `工作流 ${new Date().toLocaleString()}`,
        description,
        category: '自動化',
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type || 'default',
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        })),
        settings: viewport ? { viewport } : {}
      }
      
      const workflow = await workflowApi.createWorkflow(workflowData)
      currentWorkflow.value = workflow
      hasUnsavedChanges.value = false
      lastSavedAt.value = new Date()
      
      ElMessage.success('工作流建立成功')
      return workflow
      
    } catch (error: any) {
      ElMessage.error(error.message || '建立工作流失敗')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 儲存工作流
   */
  const saveWorkflow = async (
    workflowId: string,
    nodes: Node[],
    edges: Edge[],
    name?: string,
    description?: string,
    viewport?: { x: number; y: number; zoom: number }
  ): Promise<WorkflowResponse> => {
    try {
      isLoading.value = true
      
      const saveData: WorkflowSaveRequest = {
        name,
        description,
        nodes: nodes.map(node => ({
          id: node.id,
          type: node.type || 'default',
          position: node.position,
          data: node.data
        })),
        edges: edges.map(edge => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle
        })),
        settings: {},
        viewport: viewport || { x: 0, y: 0, zoom: 1 }
      }
      
      const workflow = await workflowApi.saveWorkflow(workflowId, saveData)
      currentWorkflow.value = workflow
      hasUnsavedChanges.value = false
      lastSavedAt.value = new Date()
      
      ElMessage.success('工作流儲存成功')
      return workflow
      
    } catch (error: any) {
      ElMessage.error(error.message || '儲存工作流失敗')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 載入工作流
   */
  const loadWorkflow = async (workflowId: string): Promise<WorkflowResponse> => {
    try {
      isLoading.value = true
      
      const workflow = await workflowApi.getWorkflow(workflowId)
      currentWorkflow.value = workflow
      hasUnsavedChanges.value = false
      
      return workflow
      
    } catch (error: any) {
      ElMessage.error(error.message || '載入工作流失敗')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 取得用戶的工作流列表
   */
  const loadUserWorkflows = async (params?: {
    skip?: number
    limit?: number
    category?: string
    search?: string
  }): Promise<WorkflowResponse[]> => {
    try {
      isLoading.value = true
      
      const response = await workflowApi.getUserWorkflows(params)
      userWorkflows.value = response.workflows
      
      return response.workflows
      
    } catch (error: any) {
      ElMessage.error(error.message || '載入工作流列表失敗')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 更新工作流
   */
  const updateWorkflow = async (workflowId: string, updates: Partial<WorkflowResponse>): Promise<WorkflowResponse> => {
    try {
      isLoading.value = true

      const updatedWorkflow = await workflowApi.updateWorkflow(workflowId, updates)

      // 更新本地列表中的工作流
      const index = userWorkflows.value.findIndex(w => w.id === workflowId)
      if (index !== -1) {
        userWorkflows.value[index] = updatedWorkflow
      }

      // 如果更新的是當前工作流，也更新當前狀態
      if (currentWorkflow.value?.id === workflowId) {
        currentWorkflow.value = updatedWorkflow
      }

      return updatedWorkflow

    } catch (error: any) {
      console.error('更新工作流失敗:', error)
      throw new Error(error.message || '更新工作流失敗')
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 刪除工作流
   */
  const deleteWorkflow = async (workflowId: string): Promise<void> => {
    try {
      isLoading.value = true
      
      await workflowApi.deleteWorkflow(workflowId)
      
      // 從列表中移除
      userWorkflows.value = userWorkflows.value.filter(w => w.id !== workflowId)
      
      // 如果刪除的是當前工作流，清除當前狀態
      if (currentWorkflow.value?.id === workflowId) {
        currentWorkflow.value = null
        hasUnsavedChanges.value = false
      }
      
      ElMessage.success('工作流刪除成功')
      
    } catch (error: any) {
      ElMessage.error(error.message || '刪除工作流失敗')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 複製工作流
   */
  const duplicateWorkflow = async (workflowId: string, newName?: string): Promise<WorkflowResponse> => {
    try {
      isLoading.value = true
      
      const workflow = await workflowApi.duplicateWorkflow(workflowId, newName)
      userWorkflows.value.unshift(workflow) // 添加到列表開頭
      
      ElMessage.success('工作流複製成功')
      return workflow
      
    } catch (error: any) {
      ElMessage.error(error.message || '複製工作流失敗')
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 建立新的空白工作流
   */
  const createNewWorkflow = async (name?: string): Promise<WorkflowResponse> => {
    const workflowName = name || `新工作流 ${new Date().toLocaleString()}`
    return await createWorkflow(workflowName, '新建立的工作流', [], [])
  }
  
  /**
   * 自動儲存工作流
   */
  const autoSaveWorkflow = async (
    nodes: Node[],
    edges: Edge[],
    viewport?: { x: number; y: number; zoom: number }
  ): Promise<void> => {
    if (!currentWorkflow.value?.id || !hasUnsavedChanges.value) {
      return
    }

    try {
      await saveWorkflow(
        currentWorkflow.value.id,
        nodes,
        edges,
        currentWorkflow.value.name,
        currentWorkflow.value.description,
        viewport
      )
    } catch (error) {
      console.warn('自動儲存失敗:', error)
    }
  }
  
  /**
   * 標記為有未儲存的變更
   */
  const markAsChanged = () => {
    hasUnsavedChanges.value = true
  }
  
  /**
   * 重設狀態
   */
  const resetState = () => {
    currentWorkflow.value = null
    hasUnsavedChanges.value = false
    lastSavedAt.value = null
  }

  /**
   * 執行工作流
   */
  const executeWorkflow = async (triggerData?: any) => {
    if (!currentWorkflowId.value) {
      throw new Error('沒有可執行的工作流')
    }

    try {
      console.log('🚀 開始執行工作流:', currentWorkflowId.value)

      const result = await workflowApi.executeWorkflow(currentWorkflowId.value, triggerData)

      console.log('✅ 工作流執行成功:', result)
      ElMessage.success('工作流執行成功')
      return result
    } catch (error: any) {
      console.error('❌ 工作流執行失敗:', error)
      ElMessage.error(error.message || '工作流執行失敗')
      throw error
    }
  }

  /**
   * 取得工作流執行歷史
   */
  const getWorkflowExecutions = async (workflowId?: string) => {
    const targetWorkflowId = workflowId || currentWorkflowId.value
    if (!targetWorkflowId) {
      throw new Error('沒有指定的工作流ID')
    }

    try {
      const executions = await workflowApi.getWorkflowExecutions(targetWorkflowId)
      return executions
    } catch (error: any) {
      console.error('❌ 取得執行歷史失敗:', error)
      ElMessage.error(error.message || '取得執行歷史失敗')
      throw error
    }
  }

  return {
    // 狀態
    isLoading,
    currentWorkflow,
    userWorkflows,
    lastSavedAt,
    hasUnsavedChanges,
    
    // 計算屬性
    currentWorkflowId,
    currentWorkflowName,
    isNewWorkflow,
    
    // 方法
    createWorkflow,
    createNewWorkflow,
    saveWorkflow,
    loadWorkflow,
    loadUserWorkflows,
    updateWorkflow,
    deleteWorkflow,
    duplicateWorkflow,
    autoSaveWorkflow,
    markAsChanged,
    resetState,
    executeWorkflow,
    getWorkflowExecutions
  }
}
