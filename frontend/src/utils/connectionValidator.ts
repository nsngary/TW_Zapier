/**
 * 工作流連線驗證工具
 * 驗證節點間連線的邏輯正確性
 */

import type { WorkflowNode, WorkflowConnection, NodeCategory } from '@/types/workflow'

// ===== 連線驗證結果 =====

export interface ConnectionValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
}

export interface ConnectionRule {
  sourceCategory: NodeCategory | 'any'
  targetCategory: NodeCategory | 'any'
  sourceType?: string
  targetType?: string
  isAllowed: boolean
  message?: string
}

// ===== 連線規則定義 =====

const connectionRules: ConnectionRule[] = [
  // 觸發節點規則
  {
    sourceCategory: NodeCategory.TRIGGER,
    targetCategory: 'any',
    isAllowed: true,
    message: '觸發節點可以連接到任何節點'
  },
  {
    sourceCategory: 'any',
    targetCategory: NodeCategory.TRIGGER,
    isAllowed: false,
    message: '觸發節點不能作為其他節點的目標'
  },
  
  // 金流節點規則
  {
    sourceCategory: NodeCategory.PAYMENT,
    targetCategory: NodeCategory.NOTIFICATION,
    isAllowed: true,
    message: '金流節點可以連接到通知節點'
  },
  {
    sourceCategory: NodeCategory.PAYMENT,
    targetCategory: NodeCategory.GENERAL,
    isAllowed: true,
    message: '金流節點可以連接到通用節點'
  },
  
  // 台灣服務節點規則
  {
    sourceCategory: NodeCategory.TAIWAN_SERVICE,
    targetCategory: 'any',
    isAllowed: true,
    message: '台灣服務節點可以連接到任何節點'
  },
  
  // 通用節點規則
  {
    sourceCategory: NodeCategory.GENERAL,
    targetCategory: 'any',
    isAllowed: true,
    message: '通用節點可以連接到任何節點'
  },
  
  // 通知節點規則
  {
    sourceCategory: NodeCategory.NOTIFICATION,
    targetCategory: NodeCategory.NOTIFICATION,
    isAllowed: true,
    message: '通知節點可以串聯'
  },
  {
    sourceCategory: NodeCategory.NOTIFICATION,
    targetCategory: NodeCategory.GENERAL,
    isAllowed: true,
    message: '通知節點可以連接到通用節點'
  }
]

// ===== 特殊連線規則 =====

const specialRules = {
  // 條件節點可以有多個輸出
  multipleOutputs: ['condition', 'switch'],
  
  // 合併節點可以有多個輸入
  multipleInputs: ['merge', 'join'],
  
  // 終端節點（不應該有輸出）
  terminalNodes: ['email', 'sms', 'lineNotify'],
  
  // 必須有輸入的節點
  requiresInput: ['dataTransform', 'condition', 'email', 'sms', 'lineNotify']
}

// ===== 主要驗證函數 =====

/**
 * 驗證單個連線
 */
export function validateConnection(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode,
  existingConnections: WorkflowConnection[] = []
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  // 1. 檢查基本規則
  const basicValidation = validateBasicRules(sourceNode, targetNode)
  if (!basicValidation.isValid) {
    result.isValid = false
    result.errors.push(...basicValidation.errors)
  }

  // 2. 檢查循環連線
  const cycleValidation = validateNoCycles(sourceNode, targetNode, existingConnections)
  if (!cycleValidation.isValid) {
    result.isValid = false
    result.errors.push(...cycleValidation.errors)
  }

  // 3. 檢查重複連線
  const duplicateValidation = validateNoDuplicates(sourceNode, targetNode, existingConnections)
  if (!duplicateValidation.isValid) {
    result.isValid = false
    result.errors.push(...duplicateValidation.errors)
  }

  // 4. 檢查特殊規則
  const specialValidation = validateSpecialRules(sourceNode, targetNode, existingConnections)
  result.warnings.push(...specialValidation.warnings)
  result.suggestions.push(...specialValidation.suggestions)

  // 5. 檢查資料類型相容性
  const dataTypeValidation = validateDataTypes(sourceNode, targetNode)
  result.warnings.push(...dataTypeValidation.warnings)
  result.suggestions.push(...dataTypeValidation.suggestions)

  return result
}

/**
 * 驗證基本連線規則
 */
function validateBasicRules(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  // 檢查節點不能連接到自己
  if (sourceNode.id === targetNode.id) {
    result.isValid = false
    result.errors.push('節點不能連接到自己')
    return result
  }

  // 查找適用的規則
  const applicableRule = connectionRules.find(rule => {
    const sourceMatch = rule.sourceCategory === 'any' || 
                       getNodeCategory(sourceNode) === rule.sourceCategory
    const targetMatch = rule.targetCategory === 'any' || 
                       getNodeCategory(targetNode) === rule.targetCategory
    
    const sourceTypeMatch = !rule.sourceType || sourceNode.type === rule.sourceType
    const targetTypeMatch = !rule.targetType || targetNode.type === rule.targetType
    
    return sourceMatch && targetMatch && sourceTypeMatch && targetTypeMatch
  })

  if (applicableRule && !applicableRule.isAllowed) {
    result.isValid = false
    result.errors.push(applicableRule.message || '不允許的連線類型')
  }

  return result
}

/**
 * 檢查循環連線
 */
function validateNoCycles(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode,
  existingConnections: WorkflowConnection[]
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  // 建立連線圖
  const graph = new Map<string, string[]>()
  
  // 添加現有連線
  existingConnections.forEach(conn => {
    if (!graph.has(conn.source)) {
      graph.set(conn.source, [])
    }
    graph.get(conn.source)!.push(conn.target)
  })

  // 添加新連線
  if (!graph.has(sourceNode.id)) {
    graph.set(sourceNode.id, [])
  }
  graph.get(sourceNode.id)!.push(targetNode.id)

  // 檢查是否形成循環
  if (hasCycle(graph, targetNode.id, sourceNode.id)) {
    result.isValid = false
    result.errors.push('此連線會形成循環，可能導致無限執行')
  }

  return result
}

/**
 * 檢查重複連線
 */
function validateNoDuplicates(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode,
  existingConnections: WorkflowConnection[]
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  const isDuplicate = existingConnections.some(conn => 
    conn.source === sourceNode.id && conn.target === targetNode.id
  )

  if (isDuplicate) {
    result.isValid = false
    result.errors.push('節點間已存在連線')
  }

  return result
}

/**
 * 檢查特殊規則
 */
function validateSpecialRules(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode,
  existingConnections: WorkflowConnection[]
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  // 檢查終端節點
  if (specialRules.terminalNodes.includes(sourceNode.type)) {
    result.warnings.push(`${sourceNode.label} 是終端節點，通常不需要輸出連線`)
  }

  // 檢查多輸出限制
  if (!specialRules.multipleOutputs.includes(sourceNode.type)) {
    const existingOutputs = existingConnections.filter(conn => conn.source === sourceNode.id)
    if (existingOutputs.length > 0) {
      result.warnings.push(`${sourceNode.label} 已有輸出連線，多個輸出可能導致並行執行`)
    }
  }

  // 檢查多輸入限制
  if (!specialRules.multipleInputs.includes(targetNode.type)) {
    const existingInputs = existingConnections.filter(conn => conn.target === targetNode.id)
    if (existingInputs.length > 0) {
      result.warnings.push(`${targetNode.label} 已有輸入連線，多個輸入可能導致資料覆蓋`)
    }
  }

  return result
}

/**
 * 檢查資料類型相容性
 */
function validateDataTypes(
  sourceNode: WorkflowNode,
  targetNode: WorkflowNode
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  // 金流節點輸出到通知節點的建議
  if (getNodeCategory(sourceNode) === NodeCategory.PAYMENT && 
      getNodeCategory(targetNode) === NodeCategory.NOTIFICATION) {
    result.suggestions.push('建議在金流節點和通知節點間添加資料轉換節點來格式化付款結果')
  }

  // 台灣服務節點輸出建議
  if (getNodeCategory(sourceNode) === NodeCategory.TAIWAN_SERVICE) {
    result.suggestions.push('台灣服務節點輸出的資料格式可能需要轉換才能被其他節點使用')
  }

  return result
}

// ===== 輔助函數 =====

/**
 * 獲取節點分類
 */
function getNodeCategory(node: WorkflowNode): NodeCategory {
  // 根據節點類型推斷分類
  const categoryMap: Record<string, NodeCategory> = {
    'manualTrigger': NodeCategory.TRIGGER,
    'webhookTrigger': NodeCategory.TRIGGER,
    'scheduleTrigger': NodeCategory.TRIGGER,
    'linePay': NodeCategory.PAYMENT,
    'ecPay': NodeCategory.PAYMENT,
    'newebPay': NodeCategory.PAYMENT,
    'spgateway': NodeCategory.PAYMENT,
    'taoyuanAirport': NodeCategory.TAIWAN_SERVICE,
    'govOpenData': NodeCategory.TAIWAN_SERVICE,
    'weatherBureau': NodeCategory.TAIWAN_SERVICE,
    'taiwanRailway': NodeCategory.TAIWAN_SERVICE,
    'highSpeedRail': NodeCategory.TAIWAN_SERVICE,
    'healthInsurance': NodeCategory.TAIWAN_SERVICE,
    'httpRequest': NodeCategory.GENERAL,
    'dataTransform': NodeCategory.GENERAL,
    'condition': NodeCategory.GENERAL,
    'delay': NodeCategory.GENERAL,
    'lineNotify': NodeCategory.NOTIFICATION,
    'email': NodeCategory.NOTIFICATION,
    'sms': NodeCategory.NOTIFICATION
  }

  return categoryMap[node.type] || NodeCategory.GENERAL
}

/**
 * 檢查圖中是否存在循環
 */
function hasCycle(graph: Map<string, string[]>, start: string, target: string): boolean {
  const visited = new Set<string>()
  const recursionStack = new Set<string>()

  function dfs(node: string): boolean {
    if (recursionStack.has(node)) {
      return true // 找到循環
    }
    
    if (visited.has(node)) {
      return false
    }

    visited.add(node)
    recursionStack.add(node)

    const neighbors = graph.get(node) || []
    for (const neighbor of neighbors) {
      if (dfs(neighbor)) {
        return true
      }
    }

    recursionStack.delete(node)
    return false
  }

  return dfs(start)
}

/**
 * 驗證整個工作流的連線
 */
export function validateWorkflowConnections(
  nodes: WorkflowNode[],
  connections: WorkflowConnection[]
): ConnectionValidationResult {
  const result: ConnectionValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    suggestions: []
  }

  // 檢查每個連線
  connections.forEach(conn => {
    const sourceNode = nodes.find(n => n.id === conn.source)
    const targetNode = nodes.find(n => n.id === conn.target)

    if (!sourceNode || !targetNode) {
      result.isValid = false
      result.errors.push(`連線 ${conn.id} 引用了不存在的節點`)
      return
    }

    const connValidation = validateConnection(sourceNode, targetNode, connections)
    if (!connValidation.isValid) {
      result.isValid = false
      result.errors.push(...connValidation.errors)
    }
    
    result.warnings.push(...connValidation.warnings)
    result.suggestions.push(...connValidation.suggestions)
  })

  // 檢查孤立節點
  const connectedNodes = new Set<string>()
  connections.forEach(conn => {
    connectedNodes.add(conn.source)
    connectedNodes.add(conn.target)
  })

  const isolatedNodes = nodes.filter(node => 
    !connectedNodes.has(node.id) && 
    getNodeCategory(node) !== NodeCategory.TRIGGER
  )

  if (isolatedNodes.length > 0) {
    result.warnings.push(`發現 ${isolatedNodes.length} 個孤立節點，它們不會被執行`)
  }

  // 檢查是否有觸發節點
  const triggerNodes = nodes.filter(node => getNodeCategory(node) === NodeCategory.TRIGGER)
  if (triggerNodes.length === 0) {
    result.isValid = false
    result.errors.push('工作流必須包含至少一個觸發節點')
  }

  return result
}
