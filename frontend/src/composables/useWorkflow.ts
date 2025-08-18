/**
 * 工作流狀態管理 Composable
 */

import { ref, computed, nextTick } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import type { 
  TaiwanWorkflow, 
  TaiwanNode, 
  TaiwanEdge, 
  EditorState,
  WorkflowValidationResult,
  NodeValidationResult,
  TaiwanNodeType
} from '@/types/workflow'

export function useWorkflow() {
  const { 
    nodes, 
    edges, 
    addNodes, 
    addEdges, 
    removeNodes, 
    removeEdges,
    updateNode,
    updateEdge,
    getNodes,
    getEdges,
    viewport,
    setViewport,
    fitView,
    project,
    vueFlowRef
  } = useVueFlow()

  // 編輯器狀態
  const editorState = ref<EditorState>({
    selectedNodeId: undefined,
    selectedEdgeId: undefined,
    isConnecting: false,
    isDragging: false,
    clipboard: undefined
  })

  // 當前工作流
  const currentWorkflow = ref<TaiwanWorkflow | null>(null)

  // 是否有未儲存的變更
  const hasUnsavedChanges = ref(false)

  // 計算屬性
  const selectedNode = computed(() => {
    if (!editorState.value.selectedNodeId) return null
    return nodes.value.find(node => node.id === editorState.value.selectedNodeId) as TaiwanNode | undefined
  })

  const selectedEdge = computed(() => {
    if (!editorState.value.selectedEdgeId) return null
    return edges.value.find(edge => edge.id === editorState.value.selectedEdgeId) as TaiwanEdge | undefined
  })

  const nodeCount = computed(() => nodes.value.length)
  const edgeCount = computed(() => edges.value.length)

  // 工作流驗證
  const isValidWorkflow = computed(() => {
    const validation = validateWorkflow()
    return validation.isValid
  })

  // 方法：建立新節點
  function createNode(type: TaiwanNodeType, position: { x: number; y: number }, data: any = {}): TaiwanNode {
    const nodeId = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    return {
      id: nodeId,
      type,
      position,
      data: {
        label: getNodeLabel(type),
        ...data
      },
      draggable: true,
      selectable: true,
      deletable: true
    }
  }

  // 方法：新增節點
  function addNode(type: TaiwanNodeType, position: { x: number; y: number }, data: any = {}) {
    const newNode = createNode(type, position, data)
    addNodes([newNode])
    hasUnsavedChanges.value = true
    return newNode
  }

  // 方法：刪除選中的節點
  function deleteSelectedNode() {
    if (selectedNode.value) {
      removeNodes([selectedNode.value.id])
      editorState.value.selectedNodeId = undefined
      hasUnsavedChanges.value = true
    }
  }

  // 方法：刪除選中的邊線
  function deleteSelectedEdge() {
    if (selectedEdge.value) {
      removeEdges([selectedEdge.value.id])
      editorState.value.selectedEdgeId = undefined
      hasUnsavedChanges.value = true
    }
  }

  // 方法：複製節點
  function copySelectedNode() {
    if (selectedNode.value) {
      editorState.value.clipboard = {
        nodes: [selectedNode.value],
        edges: []
      }
    }
  }

  // 方法：貼上節點
  function pasteNode() {
    if (editorState.value.clipboard?.nodes.length) {
      const nodeToPaste = editorState.value.clipboard.nodes[0]
      const newPosition = {
        x: nodeToPaste.position.x + 50,
        y: nodeToPaste.position.y + 50
      }
      
      const newNode = createNode(
        nodeToPaste.type as TaiwanNodeType,
        newPosition,
        { ...nodeToPaste.data }
      )
      
      addNodes([newNode])
      hasUnsavedChanges.value = true
    }
  }

  // 方法：選中節點
  function selectNode(nodeId: string) {
    editorState.value.selectedNodeId = nodeId
    editorState.value.selectedEdgeId = undefined
  }

  // 方法：選中邊線
  function selectEdge(edgeId: string) {
    editorState.value.selectedEdgeId = edgeId
    editorState.value.selectedNodeId = undefined
  }

  // 方法：清除選擇
  function clearSelection() {
    editorState.value.selectedNodeId = undefined
    editorState.value.selectedEdgeId = undefined
  }

  // 方法：更新節點資料
  function updateNodeData(nodeId: string, newData: any) {
    const node = nodes.value.find(n => n.id === nodeId)
    if (node) {
      updateNode(nodeId, {
        data: {
          ...node.data,
          ...newData
        }
      })
      hasUnsavedChanges.value = true
    }
  }

  // 方法：驗證工作流
  function validateWorkflow(): WorkflowValidationResult {
    const nodeValidations: Record<string, NodeValidationResult> = {}
    const globalErrors: string[] = []
    const globalWarnings: string[] = []

    // 驗證每個節點
    nodes.value.forEach(node => {
      nodeValidations[node.id] = validateNode(node as TaiwanNode)
    })

    // 檢查是否有觸發節點
    const triggerNodes = nodes.value.filter(node => 
      ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
    )
    
    if (triggerNodes.length === 0) {
      globalErrors.push('工作流必須包含至少一個觸發節點')
    }

    // 檢查是否有孤立節點
    const connectedNodeIds = new Set<string>()
    edges.value.forEach(edge => {
      connectedNodeIds.add(edge.source)
      connectedNodeIds.add(edge.target)
    })

    const isolatedNodes = nodes.value.filter(node => 
      !connectedNodeIds.has(node.id) && !['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
    )

    if (isolatedNodes.length > 0) {
      globalWarnings.push(`發現 ${isolatedNodes.length} 個未連接的節點`)
    }

    const hasErrors = globalErrors.length > 0 || 
      Object.values(nodeValidations).some(validation => !validation.isValid)

    return {
      isValid: !hasErrors,
      nodeValidations,
      globalErrors,
      globalWarnings
    }
  }

  // 方法：驗證單個節點
  function validateNode(node: TaiwanNode): NodeValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 基礎驗證
    if (!node.data.label || node.data.label.trim() === '') {
      errors.push('節點名稱不能為空')
    }

    // 根據節點類型進行特定驗證
    switch (node.type) {
      case 'linePay':
        if (!node.data.amount || node.data.amount <= 0) {
          errors.push('付款金額必須大於 0')
        }
        if (!node.data.productName) {
          errors.push('商品名稱不能為空')
        }
        break

      case 'ecPay':
        if (!node.data.totalAmount || node.data.totalAmount <= 0) {
          errors.push('交易金額必須大於 0')
        }
        if (!node.data.merchantTradeNo) {
          errors.push('商店交易編號不能為空')
        }
        break

      case 'taoyuanAirport':
        if (!node.data.flightNumber) {
          warnings.push('建議設定航班號碼以獲得更準確的資訊')
        }
        break
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  // 方法：載入工作流
  function loadWorkflow(workflow: TaiwanWorkflow) {
    currentWorkflow.value = workflow
    
    // 清除現有節點和邊線
    removeNodes(nodes.value.map(n => n.id))
    removeEdges(edges.value.map(e => e.id))
    
    // 載入新的節點和邊線
    addNodes(workflow.nodes)
    addEdges(workflow.edges)
    
    // 設定視窗
    nextTick(() => {
      setViewport(workflow.viewport)
      hasUnsavedChanges.value = false
    })
  }

  // 方法：匯出工作流
  function exportWorkflow(): TaiwanWorkflow | null {
    if (!currentWorkflow.value) return null

    return {
      ...currentWorkflow.value,
      nodes: nodes.value as TaiwanNode[],
      edges: edges.value as TaiwanEdge[],
      viewport: viewport.value,
      metadata: {
        ...currentWorkflow.value.metadata,
        updatedAt: new Date().toISOString()
      }
    }
  }

  // 方法：重置工作流
  function resetWorkflow() {
    removeNodes(nodes.value.map(n => n.id))
    removeEdges(edges.value.map(e => e.id))
    clearSelection()
    hasUnsavedChanges.value = false
    currentWorkflow.value = null
  }

  // 方法：自動佈局
  function autoLayout() {
    // 簡單的自動佈局算法
    const nodeSpacing = 200
    const levelHeight = 150
    
    // 找到所有觸發節點作為起始點
    const triggerNodes = nodes.value.filter(node => 
      ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
    )

    if (triggerNodes.length === 0) return

    // 簡單的層級佈局
    let currentLevel = 0
    const processedNodes = new Set<string>()
    let currentLevelNodes = [...triggerNodes]

    while (currentLevelNodes.length > 0) {
      const nextLevelNodes: any[] = []
      
      currentLevelNodes.forEach((node, index) => {
        if (processedNodes.has(node.id)) return
        
        // 更新節點位置
        updateNode(node.id, {
          position: {
            x: index * nodeSpacing,
            y: currentLevel * levelHeight
          }
        })
        
        processedNodes.add(node.id)
        
        // 找到下一層節點
        const connectedEdges = edges.value.filter(edge => edge.source === node.id)
        connectedEdges.forEach(edge => {
          const targetNode = nodes.value.find(n => n.id === edge.target)
          if (targetNode && !processedNodes.has(targetNode.id)) {
            nextLevelNodes.push(targetNode)
          }
        })
      })
      
      currentLevelNodes = nextLevelNodes
      currentLevel++
    }

    hasUnsavedChanges.value = true
    
    // 自動調整視窗
    nextTick(() => {
      fitView({ padding: 50 })
    })
  }

  // 輔助函數：取得節點標籤
  function getNodeLabel(type: TaiwanNodeType): string {
    const labels: Record<TaiwanNodeType, string> = {
      [TaiwanNodeType.MANUAL_TRIGGER]: '手動觸發',
      [TaiwanNodeType.WEBHOOK_TRIGGER]: 'Webhook 觸發',
      [TaiwanNodeType.SCHEDULE_TRIGGER]: '定時觸發',
      [TaiwanNodeType.LINE_PAY]: 'Line Pay',
      [TaiwanNodeType.ECPAY]: '綠界科技',
      [TaiwanNodeType.TAOYUAN_AIRPORT]: '桃機航班',
      [TaiwanNodeType.GOV_OPENDATA]: '政府開放資料',
      [TaiwanNodeType.HTTP_REQUEST]: 'HTTP 請求',
      [TaiwanNodeType.SET_DATA]: '設定資料',
      [TaiwanNodeType.CONDITION]: '條件判斷',
      [TaiwanNodeType.LOOP]: '迴圈',
      [TaiwanNodeType.LINE_NOTIFY]: 'Line 通知',
      [TaiwanNodeType.EMAIL]: '電子郵件',
      [TaiwanNodeType.SLACK]: 'Slack'
    }
    
    return labels[type] || type
  }

  return {
    // 狀態
    nodes,
    edges,
    viewport,
    editorState,
    currentWorkflow,
    hasUnsavedChanges,
    
    // 計算屬性
    selectedNode,
    selectedEdge,
    nodeCount,
    edgeCount,
    isValidWorkflow,
    
    // 方法
    addNode,
    deleteSelectedNode,
    deleteSelectedEdge,
    copySelectedNode,
    pasteNode,
    selectNode,
    selectEdge,
    clearSelection,
    updateNodeData,
    validateWorkflow,
    validateNode,
    loadWorkflow,
    exportWorkflow,
    resetWorkflow,
    autoLayout,
    fitView,
    
    // Vue Flow 原生方法
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    updateNode,
    updateEdge,
    getNodes,
    getEdges,
    setViewport,
    project,
    vueFlowRef
  }
}
