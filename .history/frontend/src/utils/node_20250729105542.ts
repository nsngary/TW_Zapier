/**
 * 節點工具函數
 */

import type { NodeDefinition, WorkflowNode, NodeParameter } from '@/types'

/**
 * 建立新的工作流節點
 */
export const createWorkflowNode = (
  nodeDefinition: NodeDefinition,
  position: { x: number; y: number },
  id?: string
): WorkflowNode => {
  return {
    id: id || `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: nodeDefinition.type,
    position,
    data: {
      label: nodeDefinition.displayName,
      parameters: getDefaultParameters(nodeDefinition)
    }
  }
}

/**
 * 取得節點的預設參數
 */
export const getDefaultParameters = (nodeDefinition: NodeDefinition): Record<string, any> => {
  const defaultParams: Record<string, any> = {}

  nodeDefinition.parameters.forEach(param => {
    defaultParams[param.name] = param.defaultValue
  })

  return defaultParams
}

/**
 * 驗證節點參數
 */
export const validateNodeParameters = (
  node: WorkflowNode,
  nodeDefinition: NodeDefinition
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  const parameters = node.data.parameters || {}

  nodeDefinition.parameters.forEach(paramDef => {
    const value = parameters[paramDef.name]

    // 檢查必填參數
    if (paramDef.required && (value === undefined || value === null || value === '')) {
      errors.push(`參數 "${paramDef.displayName}" 為必填`)
      return
    }

    // 如果值為空且非必填，跳過其他驗證
    if (value === undefined || value === null || value === '') {
      return
    }

    // 類型驗證
    switch (paramDef.type) {
      case 'string':
        if (typeof value !== 'string') {
          errors.push(`參數 "${paramDef.displayName}" 必須為字串`)
        } else if (paramDef.minLength && value.length < paramDef.minLength) {
          errors.push(`參數 "${paramDef.displayName}" 長度不能少於 ${paramDef.minLength} 個字元`)
        } else if (paramDef.maxLength && value.length > paramDef.maxLength) {
          errors.push(`參數 "${paramDef.displayName}" 長度不能超過 ${paramDef.maxLength} 個字元`)
        }
        break

      case 'number':
        if (typeof value !== 'number' || isNaN(value)) {
          errors.push(`參數 "${paramDef.displayName}" 必須為數字`)
        } else if (paramDef.min !== undefined && value < paramDef.min) {
          errors.push(`參數 "${paramDef.displayName}" 不能小於 ${paramDef.min}`)
        } else if (paramDef.max !== undefined && value > paramDef.max) {
          errors.push(`參數 "${paramDef.displayName}" 不能大於 ${paramDef.max}`)
        }
        break

      case 'boolean':
        if (typeof value !== 'boolean') {
          errors.push(`參數 "${paramDef.displayName}" 必須為布林值`)
        }
        break

      case 'array':
        if (!Array.isArray(value)) {
          errors.push(`參數 "${paramDef.displayName}" 必須為陣列`)
        }
        break

      case 'object':
        if (typeof value !== 'object' || Array.isArray(value)) {
          errors.push(`參數 "${paramDef.displayName}" 必須為物件`)
        }
        break

      case 'select':
        if (paramDef.options && !paramDef.options.some(option => option.value === value)) {
          errors.push(`參數 "${paramDef.displayName}" 的值不在允許的選項中`)
        }
        break
    }

    // 正則表達式驗證
    if (paramDef.pattern && typeof value === 'string') {
      const regex = new RegExp(paramDef.pattern)
      if (!regex.test(value)) {
        errors.push(`參數 "${paramDef.displayName}" 格式不正確`)
      }
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * 取得節點的輸入埠
 */
export const getNodeInputPorts = (nodeDefinition: NodeDefinition): string[] => {
  return nodeDefinition.inputs || ['main']
}

/**
 * 取得節點的輸出埠
 */
export const getNodeOutputPorts = (nodeDefinition: NodeDefinition): string[] => {
  return nodeDefinition.outputs || ['main']
}

/**
 * 檢查節點是否為觸發節點
 */
export const isTriggerNode = (nodeDefinition: NodeDefinition): boolean => {
  return nodeDefinition.category === 'trigger'
}

/**
 * 檢查節點是否為台灣特有節點
 */
export const isTaiwanNode = (nodeDefinition: NodeDefinition): boolean => {
  const taiwanNodeTypes = [
    'linePay',
    'ecPay',
    'newebPay',
    'spgateway',
    'taoyuanAirport',
    'govOpenData',
    'weatherBureau',
    'healthInsurance',
    'shopee',
    'momo',
    'pchome',
    'yahooShopping'
  ]
  
  return taiwanNodeTypes.includes(nodeDefinition.type) || 
         nodeDefinition.tags?.includes('taiwan') ||
         false
}

/**
 * 取得節點的圖示
 */
export const getNodeIcon = (nodeDefinition: NodeDefinition): string => {
  // 根據節點類型返回對應的圖示
  const iconMap: Record<string, string> = {
    // 觸發節點
    webhook: 'Link',
    schedule: 'Timer',
    manual: 'User',
    
    // 台灣金流
    linePay: 'CreditCard',
    ecPay: 'CreditCard',
    newebPay: 'CreditCard',
    
    // 政府服務
    govOpenData: 'Document',
    taoyuanAirport: 'Airplane',
    weatherBureau: 'Sunny',
    
    // 電商平台
    shopee: 'ShoppingCart',
    momo: 'ShoppingCart',
    pchome: 'ShoppingCart',
    
    // 通用節點
    http: 'Globe',
    email: 'Message',
    database: 'Database',
    file: 'Folder',
    transform: 'Operation',
    condition: 'Switch',
    loop: 'Refresh'
  }

  return nodeDefinition.icon || iconMap[nodeDefinition.type] || 'Setting'
}

/**
 * 取得節點的顏色
 */
export const getNodeColor = (nodeDefinition: NodeDefinition): string => {
  // 根據節點分類返回對應的顏色
  const colorMap: Record<string, string> = {
    trigger: '#52c41a',
    action: '#1890ff',
    condition: '#faad14',
    transform: '#722ed1',
    output: '#f5222d',
    taiwan: '#ff7a45'
  }

  if (isTaiwanNode(nodeDefinition)) {
    return colorMap.taiwan
  }

  return nodeDefinition.color || colorMap[nodeDefinition.category] || '#1890ff'
}

/**
 * 格式化節點參數值
 */
export const formatParameterValue = (value: any, parameter: NodeParameter): string => {
  if (value === undefined || value === null) {
    return ''
  }

  switch (parameter.type) {
    case 'boolean':
      return value ? '是' : '否'
    
    case 'array':
      return Array.isArray(value) ? `[${value.length} 項目]` : ''
    
    case 'object':
      return typeof value === 'object' ? '[物件]' : ''
    
    case 'select': {
      const option = parameter.options?.find(opt => opt.value === value)
      return option ? option.label : String(value)
    }
    
    case 'password':
      return '••••••••'
    
    default:
      return String(value)
  }
}

/**
 * 取得節點的描述文字
 */
export const getNodeDescription = (node: WorkflowNode, nodeDefinition: NodeDefinition): string => {
  const parameters = node.data.parameters || {}
  
  // 根據節點類型生成描述
  switch (nodeDefinition.type) {
    case 'webhook': {
      const path = parameters.path || 'webhook'
      return `接收 Webhook: /${path}`
    }

    case 'http': {
      const method = parameters.method || 'GET'
      const url = parameters.url || ''
      return `${method} ${url}`
    }

    case 'email': {
      const to = parameters.to || ''
      return `發送郵件到: ${to}`
    }

    case 'linePay': {
      const amount = parameters.amount || 0
      return `Line Pay 付款: NT$ ${amount}`
    }
    
    default:
      return nodeDefinition.description || nodeDefinition.displayName
  }
}

/**
 * 複製節點
 */
export const cloneNode = (node: WorkflowNode, offsetX = 50, offsetY = 50): WorkflowNode => {
  return {
    ...JSON.parse(JSON.stringify(node)),
    id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    position: {
      x: node.position.x + offsetX,
      y: node.position.y + offsetY
    }
  }
}
