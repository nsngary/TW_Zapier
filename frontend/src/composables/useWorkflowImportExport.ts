import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Node, Edge } from '@vue-flow/core'
import type { SimpleWorkflowData, WorkflowExportFormat } from '@/types/workflow'

/**
 * 工作流匯入匯出 Composable
 * 提供工作流的 JSON 匯出和匯入功能
 */
export function useWorkflowImportExport() {
  // ===== 狀態管理 =====
  
  const isExporting = ref(false)
  const isImporting = ref(false)
  
  // ===== 匯出功能 =====
  
  /**
   * 匯出工作流為 JSON 檔案
   */
  const exportWorkflowToJSON = async (
    name: string,
    nodes: Node[],
    edges: Edge[],
    viewport?: any
  ): Promise<boolean> => {
    try {
      isExporting.value = true
      
      const exportData: WorkflowExportFormat = {
        metadata: {
          name: name.trim() || `工作流 ${new Date().toLocaleString()}`,
          description: `包含 ${nodes.length} 個節點和 ${edges.length} 個連線`,
          version: '1.0.0',
          exportedAt: new Date().toISOString(),
          platform: 'TW_Zapier',
          nodeCount: nodes.length,
          edgeCount: edges.length
        },
        workflow: {
          nodes,
          edges,
          viewport: viewport || { x: 0, y: 0, zoom: 1 }
        }
      }
      
      // 創建 JSON 字串
      const jsonString = JSON.stringify(exportData, null, 2)
      
      // 創建 Blob 和下載連結
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      // 生成檔案名稱
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
      const fileName = `${exportData.metadata.name.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '_')}_${timestamp}.json`
      
      // 創建下載連結並觸發下載
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      link.style.display = 'none'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 清理 URL
      URL.revokeObjectURL(url)
      
      ElMessage.success(`工作流已匯出為 ${fileName}`)
      return true
      
    } catch (error) {
      console.error('匯出工作流失敗:', error)
      ElMessage.error('匯出工作流失敗，請稍後再試')
      return false
    } finally {
      isExporting.value = false
    }
  }
  
  // ===== 匯入功能 =====
  
  /**
   * 從 JSON 檔案匯入工作流
   */
  const importWorkflowFromJSON = async (file: File): Promise<SimpleWorkflowData | null> => {
    try {
      isImporting.value = true
      
      // 檢查檔案類型
      if (!file.name.toLowerCase().endsWith('.json')) {
        ElMessage.error('請選擇 JSON 格式的工作流檔案')
        return null
      }
      
      // 檢查檔案大小 (限制 10MB)
      if (file.size > 10 * 1024 * 1024) {
        ElMessage.error('檔案大小不能超過 10MB')
        return null
      }
      
      // 讀取檔案內容
      const fileContent = await readFileAsText(file)
      
      // 解析 JSON
      let importData: any
      try {
        importData = JSON.parse(fileContent)
      } catch (parseError) {
        ElMessage.error('檔案格式錯誤，請確認是有效的 JSON 檔案')
        return null
      }
      
      // 驗證檔案格式
      const validationResult = validateImportData(importData)
      if (!validationResult.isValid) {
        ElMessage.error(`檔案格式不正確: ${validationResult.error}`)
        return null
      }
      
      // 提取工作流資料
      const workflowData: SimpleWorkflowData = {
        nodes: importData.workflow?.nodes || importData.nodes || [],
        edges: importData.workflow?.edges || importData.edges || [],
        viewport: importData.workflow?.viewport || importData.viewport || { x: 0, y: 0, zoom: 1 }
      }
      
      // 顯示匯入資訊
      const metadata = importData.metadata
      if (metadata) {
        ElMessage.success(
          `已匯入工作流「${metadata.name}」，包含 ${metadata.nodeCount || workflowData.nodes.length} 個節點`
        )
      } else {
        ElMessage.success(
          `已匯入工作流，包含 ${workflowData.nodes.length} 個節點和 ${workflowData.edges.length} 個連線`
        )
      }
      
      return workflowData
      
    } catch (error) {
      console.error('匯入工作流失敗:', error)
      ElMessage.error('匯入工作流失敗，請檢查檔案格式')
      return null
    } finally {
      isImporting.value = false
    }
  }
  
  /**
   * 透過檔案選擇器匯入工作流
   */
  const importWorkflowFromFile = (): Promise<SimpleWorkflowData | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.style.display = 'none'
      
      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
          const result = await importWorkflowFromJSON(file)
          resolve(result)
        } else {
          resolve(null)
        }
        document.body.removeChild(input)
      }
      
      input.oncancel = () => {
        document.body.removeChild(input)
        resolve(null)
      }
      
      document.body.appendChild(input)
      input.click()
    })
  }
  
  /**
   * 處理拖拉檔案匯入
   */
  const handleFileDrop = async (event: DragEvent): Promise<SimpleWorkflowData | null> => {
    event.preventDefault()
    
    const files = event.dataTransfer?.files
    if (!files || files.length === 0) {
      return null
    }
    
    const file = files[0]
    return await importWorkflowFromJSON(file)
  }
  
  // ===== 輔助函數 =====
  
  /**
   * 讀取檔案為文字
   */
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file, 'UTF-8')
    })
  }
  
  /**
   * 驗證匯入資料格式
   */
  const validateImportData = (data: any): { isValid: boolean; error?: string } => {
    if (!data || typeof data !== 'object') {
      return { isValid: false, error: '檔案內容不是有效的 JSON 物件' }
    }
    
    // 檢查是否有工作流資料
    const workflow = data.workflow || data
    
    if (!workflow.nodes && !workflow.edges) {
      return { isValid: false, error: '檔案中找不到工作流節點或連線資料' }
    }
    
    // 檢查節點格式
    if (workflow.nodes && !Array.isArray(workflow.nodes)) {
      return { isValid: false, error: '節點資料格式不正確' }
    }
    
    // 檢查連線格式
    if (workflow.edges && !Array.isArray(workflow.edges)) {
      return { isValid: false, error: '連線資料格式不正確' }
    }
    
    // 檢查節點必要欄位
    if (workflow.nodes) {
      for (const node of workflow.nodes) {
        if (!node.id || !node.type || !node.position) {
          return { isValid: false, error: '節點資料缺少必要欄位 (id, type, position)' }
        }
      }
    }
    
    // 檢查連線必要欄位
    if (workflow.edges) {
      for (const edge of workflow.edges) {
        if (!edge.id || !edge.source || !edge.target) {
          return { isValid: false, error: '連線資料缺少必要欄位 (id, source, target)' }
        }
      }
    }
    
    return { isValid: true }
  }
  
  /**
   * 建立拖拉區域事件處理器
   */
  const createDropZoneHandlers = (onDrop: (data: SimpleWorkflowData) => void) => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault()
      event.dataTransfer!.dropEffect = 'copy'
    }
    
    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault()
    }
    
    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault()
    }
    
    const handleDrop = async (event: DragEvent) => {
      const workflowData = await handleFileDrop(event)
      if (workflowData) {
        onDrop(workflowData)
      }
    }
    
    return {
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      handleDrop
    }
  }
  
  // ===== 返回 API =====
  
  return {
    // 狀態
    isExporting,
    isImporting,
    
    // 匯出方法
    exportWorkflowToJSON,
    
    // 匯入方法
    importWorkflowFromJSON,
    importWorkflowFromFile,
    handleFileDrop,
    
    // 輔助方法
    createDropZoneHandlers,
    validateImportData
  }
}
