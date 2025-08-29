import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Node, Edge } from '@vue-flow/core'
import type { SimpleWorkflowData, WorkflowSaveData } from '@/types/workflow'

/**
 * 工作流管理 Composable
 * 提供工作流的儲存、載入、匯出、匯入和驗證功能
 */
export function useWorkflowManager() {
  // ===== 狀態管理 =====
  
  const isLoading = ref(false)
  const lastSavedAt = ref<Date | null>(null)
  const currentWorkflowName = ref<string>('')
  const hasUnsavedChanges = ref(false)
  
  // ===== 本地儲存相關 =====
  
  const STORAGE_KEY = 'tw-zapier-workflows'
  const AUTO_SAVE_KEY = 'tw-zapier-auto-save'
  
  /**
   * 獲取所有已儲存的工作流
   */
  const getSavedWorkflows = (): WorkflowSaveData[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('讀取已儲存工作流失敗:', error)
      return []
    }
  }
  
  /**
   * 儲存工作流到本地存儲
   */
  const saveWorkflowToLocal = async (
    name: string,
    nodes: Node[],
    edges: Edge[],
    viewport?: any
  ): Promise<boolean> => {
    try {
      isLoading.value = true
      
      const workflowData: WorkflowSaveData = {
        id: `workflow-${Date.now()}`,
        name: name.trim() || `工作流 ${new Date().toLocaleString()}`,
        description: `包含 ${nodes.length} 個節點和 ${edges.length} 個連線`,
        nodes,
        edges,
        viewport: viewport || { x: 0, y: 0, zoom: 1 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
      
      const savedWorkflows = getSavedWorkflows()
      
      // 檢查是否已存在同名工作流
      const existingIndex = savedWorkflows.findIndex(w => w.name === workflowData.name)
      
      if (existingIndex >= 0) {
        // 更新現有工作流
        workflowData.id = savedWorkflows[existingIndex].id
        workflowData.createdAt = savedWorkflows[existingIndex].createdAt
        savedWorkflows[existingIndex] = workflowData
      } else {
        // 新增工作流
        savedWorkflows.push(workflowData)
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWorkflows))
      
      currentWorkflowName.value = workflowData.name
      lastSavedAt.value = new Date()
      hasUnsavedChanges.value = false
      
      ElMessage.success(`工作流「${workflowData.name}」已儲存`)
      return true
      
    } catch (error) {
      console.error('儲存工作流失敗:', error)
      ElMessage.error('儲存工作流失敗，請稍後再試')
      return false
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 從本地存儲載入工作流
   */
  const loadWorkflowFromLocal = async (workflowId: string): Promise<SimpleWorkflowData | null> => {
    try {
      isLoading.value = true
      
      const savedWorkflows = getSavedWorkflows()
      const workflow = savedWorkflows.find(w => w.id === workflowId)
      
      if (!workflow) {
        ElMessage.error('找不到指定的工作流')
        return null
      }
      
      currentWorkflowName.value = workflow.name
      lastSavedAt.value = new Date(workflow.updatedAt)
      hasUnsavedChanges.value = false
      
      ElMessage.success(`已載入工作流「${workflow.name}」`)
      
      return {
        nodes: workflow.nodes,
        edges: workflow.edges,
        viewport: workflow.viewport
      }
      
    } catch (error) {
      console.error('載入工作流失敗:', error)
      ElMessage.error('載入工作流失敗，請稍後再試')
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * 刪除已儲存的工作流
   */
  const deleteWorkflowFromLocal = async (workflowId: string): Promise<boolean> => {
    try {
      const savedWorkflows = getSavedWorkflows()
      const workflowIndex = savedWorkflows.findIndex(w => w.id === workflowId)
      
      if (workflowIndex === -1) {
        ElMessage.error('找不到指定的工作流')
        return false
      }
      
      const workflowName = savedWorkflows[workflowIndex].name
      
      // 確認刪除
      await ElMessageBox.confirm(
        `確定要刪除工作流「${workflowName}」嗎？此操作無法復原。`,
        '確認刪除',
        {
          confirmButtonText: '刪除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
      
      savedWorkflows.splice(workflowIndex, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWorkflows))
      
      ElMessage.success(`已刪除工作流「${workflowName}」`)
      return true
      
    } catch (error) {
      if (error === 'cancel') {
        return false
      }
      console.error('刪除工作流失敗:', error)
      ElMessage.error('刪除工作流失敗，請稍後再試')
      return false
    }
  }
  
  // ===== 自動儲存功能 =====
  
  /**
   * 自動儲存工作流
   */
  const autoSaveWorkflow = (nodes: Node[], edges: Edge[], viewport?: any) => {
    try {
      const autoSaveData = {
        nodes,
        edges,
        viewport: viewport || { x: 0, y: 0, zoom: 1 },
        timestamp: new Date().toISOString()
      }
      
      localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(autoSaveData))
    } catch (error) {
      console.error('自動儲存失敗:', error)
    }
  }
  
  /**
   * 恢復自動儲存的工作流
   */
  const restoreAutoSave = (): SimpleWorkflowData | null => {
    try {
      const autoSaveData = localStorage.getItem(AUTO_SAVE_KEY)
      if (!autoSaveData) return null
      
      const data = JSON.parse(autoSaveData)
      const timestamp = new Date(data.timestamp)
      const now = new Date()
      const diffMinutes = (now.getTime() - timestamp.getTime()) / (1000 * 60)
      
      // 只恢復 30 分鐘內的自動儲存
      if (diffMinutes > 30) {
        localStorage.removeItem(AUTO_SAVE_KEY)
        return null
      }
      
      return {
        nodes: data.nodes || [],
        edges: data.edges || [],
        viewport: data.viewport || { x: 0, y: 0, zoom: 1 }
      }
    } catch (error) {
      console.error('恢復自動儲存失敗:', error)
      return null
    }
  }
  
  /**
   * 清除自動儲存
   */
  const clearAutoSave = () => {
    localStorage.removeItem(AUTO_SAVE_KEY)
  }
  
  // ===== 計算屬性 =====
  
  const savedWorkflows = computed(() => getSavedWorkflows())
  
  const canAutoRestore = computed(() => {
    const autoSaveData = localStorage.getItem(AUTO_SAVE_KEY)
    if (!autoSaveData) return false
    
    try {
      const data = JSON.parse(autoSaveData)
      const timestamp = new Date(data.timestamp)
      const now = new Date()
      const diffMinutes = (now.getTime() - timestamp.getTime()) / (1000 * 60)
      
      return diffMinutes <= 30 && (data.nodes?.length > 0 || data.edges?.length > 0)
    } catch {
      return false
    }
  })
  
  // ===== 返回 API =====
  
  return {
    // 狀態
    isLoading,
    lastSavedAt,
    currentWorkflowName,
    hasUnsavedChanges,
    savedWorkflows,
    canAutoRestore,
    
    // 本地儲存方法
    saveWorkflowToLocal,
    loadWorkflowFromLocal,
    deleteWorkflowFromLocal,
    getSavedWorkflows,
    
    // 自動儲存方法
    autoSaveWorkflow,
    restoreAutoSave,
    clearAutoSave
  }
}
