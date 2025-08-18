/**
 * 工作流工具函數
 */

import type { StandardWorkflow, WorkflowNode, WorkflowConnection } from '@/types'

/**
 * 生成唯一的節點 ID
 */
export const generateNodeId = (): string => {
  return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 生成唯一的連線 ID
 */
export const generateConnectionId = (): string => {
  return `connection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 生成唯一的工作流 ID
 */
export const generateWorkflowId = (): string => {
  return `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 驗證工作流結構
 */
export const validateWorkflow = (workflow: StandardWorkflow): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  // 檢查基本屬性
  if (!workflow.name || workflow.name.trim() === '') {
    errors.push('工作流名稱不能為空')
  }

  if (!workflow.nodes || workflow.nodes.length === 0) {
    errors.push('工作流必須包含至少一個節點')
  }

  // 檢查節點
  const nodeIds = new Set<string>()
  workflow.nodes.forEach((node, index) => {
    if (!node.id) {
      errors.push(`節點 ${index + 1} 缺少 ID`)
    } else if (nodeIds.has(node.id)) {
      errors.push(`節點 ID "${node.id}" 重複`)
    } else {
      nodeIds.add(node.id)
    }

    if (!node.type) {
      errors.push(`節點 "${node.id}" 缺少類型`)
    }

    if (node.position && (typeof node.position.x !== 'number' || typeof node.position.y !== 'number')) {
      errors.push(`節點 "${node.id}" 位置格式不正確`)
    }
  })

  // 檢查連線
  workflow.connections.forEach((connection, index) => {
    if (!connection.id) {
      errors.push(`連線 ${index + 1} 缺少 ID`)
    }

    if (!connection.sourceNodeId || !nodeIds.has(connection.sourceNodeId)) {
      errors.push(`連線 "${connection.id}" 的來源節點不存在`)
    }

    if (!connection.targetNodeId || !nodeIds.has(connection.targetNodeId)) {
      errors.push(`連線 "${connection.id}" 的目標節點不存在`)
    }

    if (connection.sourceNodeId === connection.targetNodeId) {
      errors.push(`連線 "${connection.id}" 不能連接到自己`)
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * 檢查工作流是否有循環依賴
 */
export const hasCircularDependency = (workflow: StandardWorkflow): boolean => {
  const graph = new Map<string, string[]>()
  
  // 建立鄰接表
  workflow.nodes.forEach(node => {
    graph.set(node.id, [])
  })

  workflow.connections.forEach(connection => {
    const targets = graph.get(connection.sourceNodeId) || []
    targets.push(connection.targetNodeId)
    graph.set(connection.sourceNodeId, targets)
  })

  // DFS 檢查循環
  const visited = new Set<string>()
  const recursionStack = new Set<string>()

  const hasCycle = (nodeId: string): boolean => {
    visited.add(nodeId)
    recursionStack.add(nodeId)

    const neighbors = graph.get(nodeId) || []
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true
        }
      } else if (recursionStack.has(neighbor)) {
        return true
      }
    }

    recursionStack.delete(nodeId)
    return false
  }

  for (const nodeId of graph.keys()) {
    if (!visited.has(nodeId)) {
      if (hasCycle(nodeId)) {
        return true
      }
    }
  }

  return false
}

/**
 * 取得工作流的執行順序
 */
export const getExecutionOrder = (workflow: StandardWorkflow): string[] => {
  const graph = new Map<string, string[]>()
  const inDegree = new Map<string, number>()

  // 初始化
  workflow.nodes.forEach(node => {
    graph.set(node.id, [])
    inDegree.set(node.id, 0)
  })

  // 建立圖和計算入度
  workflow.connections.forEach(connection => {
    const targets = graph.get(connection.sourceNodeId) || []
    targets.push(connection.targetNodeId)
    graph.set(connection.sourceNodeId, targets)

    const currentInDegree = inDegree.get(connection.targetNodeId) || 0
    inDegree.set(connection.targetNodeId, currentInDegree + 1)
  })

  // 拓撲排序
  const queue: string[] = []
  const result: string[] = []

  // 找到所有入度為 0 的節點
  for (const [nodeId, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(nodeId)
    }
  }

  while (queue.length > 0) {
    const currentNode = queue.shift()!
    result.push(currentNode)

    const neighbors = graph.get(currentNode) || []
    for (const neighbor of neighbors) {
      const newInDegree = (inDegree.get(neighbor) || 0) - 1
      inDegree.set(neighbor, newInDegree)

      if (newInDegree === 0) {
        queue.push(neighbor)
      }
    }
  }

  return result
}

/**
 * 複製工作流
 */
export const cloneWorkflow = (workflow: StandardWorkflow): StandardWorkflow => {
  return JSON.parse(JSON.stringify(workflow))
}

/**
 * 合併工作流
 */
export const mergeWorkflows = (
  workflow1: StandardWorkflow,
  workflow2: StandardWorkflow,
  offsetX = 0,
  offsetY = 0
): StandardWorkflow => {
  const merged = cloneWorkflow(workflow1)

  // 生成新的節點 ID 映射
  const nodeIdMap = new Map<string, string>()
  workflow2.nodes.forEach(node => {
    const newId = generateNodeId()
    nodeIdMap.set(node.id, newId)
  })

  // 添加節點
  workflow2.nodes.forEach(node => {
    const newNode = {
      ...node,
      id: nodeIdMap.get(node.id)!,
      position: {
        x: node.position.x + offsetX,
        y: node.position.y + offsetY
      }
    }
    merged.nodes.push(newNode)
  })

  // 添加連線
  workflow2.connections.forEach(connection => {
    const newConnection = {
      ...connection,
      id: generateConnectionId(),
      sourceNodeId: nodeIdMap.get(connection.sourceNodeId)!,
      targetNodeId: nodeIdMap.get(connection.targetNodeId)!
    }
    merged.connections.push(newConnection)
  })

  return merged
}

/**
 * 取得節點的輸入連線
 */
export const getNodeInputs = (nodeId: string, workflow: StandardWorkflow): WorkflowConnection[] => {
  return workflow.connections.filter(connection => connection.targetNodeId === nodeId)
}

/**
 * 取得節點的輸出連線
 */
export const getNodeOutputs = (nodeId: string, workflow: StandardWorkflow): WorkflowConnection[] => {
  return workflow.connections.filter(connection => connection.sourceNodeId === nodeId)
}

/**
 * 檢查節點是否為起始節點
 */
export const isStartNode = (nodeId: string, workflow: StandardWorkflow): boolean => {
  return getNodeInputs(nodeId, workflow).length === 0
}

/**
 * 檢查節點是否為結束節點
 */
export const isEndNode = (nodeId: string, workflow: StandardWorkflow): boolean => {
  return getNodeOutputs(nodeId, workflow).length === 0
}

/**
 * 取得工作流統計資訊
 */
export const getWorkflowStats = (workflow: StandardWorkflow) => {
  const nodeTypes = new Map<string, number>()
  
  workflow.nodes.forEach(node => {
    const count = nodeTypes.get(node.type) || 0
    nodeTypes.set(node.type, count + 1)
  })

  const startNodes = workflow.nodes.filter(node => isStartNode(node.id, workflow))
  const endNodes = workflow.nodes.filter(node => isEndNode(node.id, workflow))

  return {
    totalNodes: workflow.nodes.length,
    totalConnections: workflow.connections.length,
    nodeTypes: Object.fromEntries(nodeTypes),
    startNodes: startNodes.length,
    endNodes: endNodes.length,
    hasCircularDependency: hasCircularDependency(workflow),
    executionOrder: getExecutionOrder(workflow)
  }
}
