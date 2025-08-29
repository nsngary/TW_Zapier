import { ref, computed } from 'vue'
import type { Node, Edge } from '@vue-flow/core'
import type { DetailedWorkflowValidationResult, ValidationError, WorkflowNode } from '@/types/workflow'

/**
 * 工作流驗證 Composable
 * 提供工作流的邏輯驗證和錯誤檢查功能
 */
export function useWorkflowValidation() {
  // ===== 狀態管理 =====
  
  const validationErrors = ref<ValidationError[]>([])
  const isValidating = ref(false)
  const lastValidationTime = ref<Date | null>(null)
  
  // ===== 驗證規則 =====
  
  /**
   * 驗證整個工作流
   */
  const validateWorkflow = async (nodes: Node[], edges: Edge[]): Promise<DetailedWorkflowValidationResult> => {
    try {
      isValidating.value = true
      validationErrors.value = []
      
      const errors: ValidationError[] = []
      
      // 1. 基本結構驗證
      errors.push(...validateBasicStructure(nodes, edges))
      
      // 2. 節點驗證
      errors.push(...validateNodes(nodes))
      
      // 3. 連線驗證
      errors.push(...validateEdges(nodes, edges))
      
      // 4. 邏輯流程驗證
      errors.push(...validateWorkflowLogic(nodes, edges))
      
      // 5. 台灣特色節點驗證
      errors.push(...validateTaiwanNodes(nodes))
      
      validationErrors.value = errors
      lastValidationTime.value = new Date()
      
      const result: DetailedWorkflowValidationResult = {
        isValid: errors.length === 0,
        errors,
        warnings: errors.filter(e => e.severity === 'warning'),
        criticalErrors: errors.filter(e => e.severity === 'error'),
        nodeCount: nodes.length,
        edgeCount: edges.length,
        validatedAt: new Date().toISOString()
      }
      
      return result
      
    } catch (error) {
      console.error('工作流驗證失敗:', error)
      return {
        isValid: false,
        errors: [{
          id: 'validation-error',
          type: 'system',
          severity: 'error',
          message: '驗證過程發生錯誤',
          nodeId: undefined,
          edgeId: undefined
        }],
        warnings: [],
        criticalErrors: [],
        nodeCount: nodes.length,
        edgeCount: edges.length,
        validatedAt: new Date().toISOString()
      }
    } finally {
      isValidating.value = false
    }
  }
  
  /**
   * 驗證基本結構
   */
  const validateBasicStructure = (nodes: Node[], edges: Edge[]): ValidationError[] => {
    const errors: ValidationError[] = []
    
    // 檢查是否有節點
    if (nodes.length === 0) {
      errors.push({
        id: 'no-nodes',
        type: 'structure',
        severity: 'warning',
        message: '工作流中沒有任何節點',
        nodeId: undefined,
        edgeId: undefined
      })
    }
    
    // 檢查是否有觸發節點
    const triggerNodes = nodes.filter(node => 
      ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.data?.nodeType)
    )
    
    if (triggerNodes.length === 0 && nodes.length > 0) {
      errors.push({
        id: 'no-trigger',
        type: 'structure',
        severity: 'error',
        message: '工作流必須包含至少一個觸發節點',
        nodeId: undefined,
        edgeId: undefined
      })
    }
    
    // 檢查是否有多個觸發節點
    if (triggerNodes.length > 1) {
      errors.push({
        id: 'multiple-triggers',
        type: 'structure',
        severity: 'warning',
        message: '工作流包含多個觸發節點，可能會造成執行衝突',
        nodeId: undefined,
        edgeId: undefined
      })
    }
    
    return errors
  }
  
  /**
   * 驗證節點
   */
  const validateNodes = (nodes: Node[]): ValidationError[] => {
    const errors: ValidationError[] = []
    
    for (const node of nodes) {
      // 檢查節點基本資料
      if (!node.id) {
        errors.push({
          id: `node-no-id-${Math.random()}`,
          type: 'node',
          severity: 'error',
          message: '節點缺少 ID',
          nodeId: node.id,
          edgeId: undefined
        })
      }
      
      if (!node.data?.nodeType) {
        errors.push({
          id: `node-no-type-${node.id}`,
          type: 'node',
          severity: 'error',
          message: '節點缺少類型定義',
          nodeId: node.id,
          edgeId: undefined
        })
        continue
      }
      
      // 驗證特定節點類型
      errors.push(...validateSpecificNode(node))
    }
    
    return errors
  }
  
  /**
   * 驗證特定節點類型
   */
  const validateSpecificNode = (node: Node): ValidationError[] => {
    const errors: ValidationError[] = []
    const nodeData = node.data as WorkflowNode
    
    switch (nodeData.nodeType) {
      case 'lineNotify':
        if (!nodeData.message?.trim()) {
          errors.push({
            id: `line-notify-no-message-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: 'Line 通知節點缺少通知訊息',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        break
        
      case 'email':
        if (!nodeData.to?.trim()) {
          errors.push({
            id: `email-no-recipient-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: '電子郵件節點缺少收件人',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        if (!nodeData.subject?.trim()) {
          errors.push({
            id: `email-no-subject-${node.id}`,
            type: 'node-config',
            severity: 'warning',
            message: '電子郵件節點缺少主旨',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        break
        
      case 'sms':
        if (!nodeData.to?.trim()) {
          errors.push({
            id: `sms-no-recipient-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: '簡訊節點缺少收件人手機號碼',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        if (!nodeData.message?.trim()) {
          errors.push({
            id: `sms-no-message-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: '簡訊節點缺少訊息內容',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        break
        
      case 'linePay':
        if (!nodeData.amount || nodeData.amount <= 0) {
          errors.push({
            id: `line-pay-invalid-amount-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: 'Line Pay 節點金額必須大於 0',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        if (!nodeData.productName?.trim()) {
          errors.push({
            id: `line-pay-no-product-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: 'Line Pay 節點缺少商品名稱',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        break
        
      case 'webhookTrigger':
        // Webhook 觸發器的特殊驗證可以在這裡添加
        break
        
      case 'scheduleTrigger':
        if (!nodeData.schedule?.trim()) {
          errors.push({
            id: `schedule-no-cron-${node.id}`,
            type: 'node-config',
            severity: 'error',
            message: '排程觸發器缺少 Cron 表達式',
            nodeId: node.id,
            edgeId: undefined
          })
        }
        break
    }
    
    return errors
  }
  
  /**
   * 驗證連線
   */
  const validateEdges = (nodes: Node[], edges: Edge[]): ValidationError[] => {
    const errors: ValidationError[] = []
    const nodeIds = new Set(nodes.map(n => n.id))
    
    for (const edge of edges) {
      // 檢查連線的來源和目標節點是否存在
      if (!nodeIds.has(edge.source)) {
        errors.push({
          id: `edge-invalid-source-${edge.id}`,
          type: 'connection',
          severity: 'error',
          message: `連線的來源節點 ${edge.source} 不存在`,
          nodeId: edge.source,
          edgeId: edge.id
        })
      }
      
      if (!nodeIds.has(edge.target)) {
        errors.push({
          id: `edge-invalid-target-${edge.id}`,
          type: 'connection',
          severity: 'error',
          message: `連線的目標節點 ${edge.target} 不存在`,
          nodeId: edge.target,
          edgeId: edge.id
        })
      }
      
      // 檢查自我連線
      if (edge.source === edge.target) {
        errors.push({
          id: `edge-self-connection-${edge.id}`,
          type: 'connection',
          severity: 'warning',
          message: '節點不應該連接到自己',
          nodeId: edge.source,
          edgeId: edge.id
        })
      }
    }
    
    return errors
  }
  
  /**
   * 驗證工作流邏輯
   */
  const validateWorkflowLogic = (nodes: Node[], edges: Edge[]): ValidationError[] => {
    const errors: ValidationError[] = []
    
    // 檢查孤立節點
    const connectedNodes = new Set<string>()
    edges.forEach(edge => {
      connectedNodes.add(edge.source)
      connectedNodes.add(edge.target)
    })
    
    const isolatedNodes = nodes.filter(node => 
      !connectedNodes.has(node.id) && 
      !['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.data?.nodeType)
    )
    
    isolatedNodes.forEach(node => {
      errors.push({
        id: `isolated-node-${node.id}`,
        type: 'logic',
        severity: 'warning',
        message: `節點「${node.data?.label || node.id}」沒有連接到工作流中`,
        nodeId: node.id,
        edgeId: undefined
      })
    })
    
    // 檢查循環依賴
    const cycles = detectCycles(nodes, edges)
    cycles.forEach((cycle, index) => {
      errors.push({
        id: `cycle-detected-${index}`,
        type: 'logic',
        severity: 'error',
        message: `檢測到循環依賴: ${cycle.join(' → ')}`,
        nodeId: undefined,
        edgeId: undefined
      })
    })
    
    return errors
  }
  
  /**
   * 驗證台灣特色節點
   */
  const validateTaiwanNodes = (nodes: Node[]): ValidationError[] => {
    const errors: ValidationError[] = []
    
    // 檢查台灣手機號碼格式
    const smsNodes = nodes.filter(node => node.data?.nodeType === 'sms')
    smsNodes.forEach(node => {
      const phoneNumber = node.data?.to
      if (phoneNumber && !isValidTaiwanPhoneNumber(phoneNumber)) {
        errors.push({
          id: `invalid-taiwan-phone-${node.id}`,
          type: 'taiwan-specific',
          severity: 'warning',
          message: '手機號碼格式不符合台灣格式 (+886 或 09xx-xxx-xxx)',
          nodeId: node.id,
          edgeId: undefined
        })
      }
    })
    
    return errors
  }
  
  // ===== 輔助函數 =====
  
  /**
   * 檢測循環依賴
   */
  const detectCycles = (nodes: Node[], edges: Edge[]): string[][] => {
    const graph = new Map<string, string[]>()
    const cycles: string[][] = []
    
    // 建立鄰接表
    nodes.forEach(node => graph.set(node.id, []))
    edges.forEach(edge => {
      const neighbors = graph.get(edge.source) || []
      neighbors.push(edge.target)
      graph.set(edge.source, neighbors)
    })
    
    // DFS 檢測循環
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const path: string[] = []
    
    const dfs = (nodeId: string): boolean => {
      visited.add(nodeId)
      recursionStack.add(nodeId)
      path.push(nodeId)
      
      const neighbors = graph.get(nodeId) || []
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          if (dfs(neighbor)) return true
        } else if (recursionStack.has(neighbor)) {
          // 找到循環
          const cycleStart = path.indexOf(neighbor)
          cycles.push([...path.slice(cycleStart), neighbor])
          return true
        }
      }
      
      recursionStack.delete(nodeId)
      path.pop()
      return false
    }
    
    for (const node of nodes) {
      if (!visited.has(node.id)) {
        dfs(node.id)
      }
    }
    
    return cycles
  }
  
  /**
   * 驗證台灣手機號碼格式
   */
  const isValidTaiwanPhoneNumber = (phoneNumber: string): boolean => {
    const patterns = [
      /^\+886[0-9]{9}$/,           // +886xxxxxxxxx
      /^09[0-9]{8}$/,              // 09xxxxxxxx
      /^09[0-9]{2}-[0-9]{3}-[0-9]{3}$/, // 09xx-xxx-xxx
      /^09[0-9]{2} [0-9]{3} [0-9]{3}$/  // 09xx xxx xxx
    ]
    
    return patterns.some(pattern => pattern.test(phoneNumber.trim()))
  }
  
  // ===== 計算屬性 =====
  
  const hasErrors = computed(() => validationErrors.value.some(e => e.severity === 'error'))
  const hasWarnings = computed(() => validationErrors.value.some(e => e.severity === 'warning'))
  const errorCount = computed(() => validationErrors.value.filter(e => e.severity === 'error').length)
  const warningCount = computed(() => validationErrors.value.filter(e => e.severity === 'warning').length)
  const isValidated = computed(() => lastValidationTime.value !== null)
  
  // ===== 返回 API =====
  
  return {
    // 狀態
    validationErrors,
    isValidating,
    lastValidationTime,
    hasErrors,
    hasWarnings,
    errorCount,
    warningCount,
    isValidated,
    
    // 驗證方法
    validateWorkflow,
    validateNodes,
    validateEdges,
    validateSpecificNode,
    
    // 輔助方法
    isValidTaiwanPhoneNumber
  }
}
