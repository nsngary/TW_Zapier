<template>
  <div class="simple-workflow-editor">
    <!-- 工具列 -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <h2>🇹🇼 台灣工作流編輯器</h2>
      </div>
      <div class="toolbar-right">
        <el-button @click="addSampleNodes" type="primary" size="small">
          添加範例節點
        </el-button>
        <el-button @click="clearCanvas" type="danger" size="small">
          清空畫布
        </el-button>
        <el-button @click="exportWorkflow" type="success" size="small">
          匯出工作流
        </el-button>
      </div>
    </div>

    <!-- 主編輯區域 -->
    <div class="editor-main">
      <!-- 左側節點面板 -->
      <div class="node-panel">
        <h3>節點庫</h3>
        <div class="node-categories">
          <div class="node-category">
            <h4>🚀 觸發節點</h4>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'manualTrigger')"
            >
              手動觸發
            </div>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'scheduleTrigger')"
            >
              定時觸發
            </div>
          </div>

          <div class="node-category">
            <h4>💳 台灣金流</h4>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'linePay')"
            >
              Line Pay
            </div>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'ecPay')"
            >
              綠界科技
            </div>
          </div>

          <div class="node-category">
            <h4>🏛️ 台灣服務</h4>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'govOpenData')"
            >
              政府開放資料
            </div>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'taoyuanAirport')"
            >
              桃園機場
            </div>
          </div>

          <div class="node-category">
            <h4>📱 通知服務</h4>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'lineNotify')"
            >
              Line 通知
            </div>
            <div 
              class="node-item" 
              draggable="true"
              @dragstart="handleDragStart($event, 'email')"
            >
              電子郵件
            </div>
          </div>
        </div>
      </div>

      <!-- 中央畫布 -->
      <div class="canvas-container">
        <div 
          class="canvas"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
        >
          <div class="canvas-grid"></div>
          
          <!-- 渲染節點 -->
          <div
            v-for="node in nodes"
            :key="node.id"
            class="workflow-node"
            :style="{
              left: node.position.x + 'px',
              top: node.position.y + 'px'
            }"
            @mousedown="startDrag(node, $event)"
            @click="selectNode(node)"
            :class="{ selected: selectedNode?.id === node.id }"
          >
            <div class="node-header">
              <span class="node-icon">{{ getNodeIcon(node.type) }}</span>
              <span class="node-title">{{ node.label }}</span>
              <button 
                class="node-delete" 
                @click.stop="deleteNode(node)"
                title="刪除節點"
              >
                ×
              </button>
            </div>
            <div class="node-content">
              <div class="node-type">{{ getNodeTypeLabel(node.type) }}</div>
            </div>
            
            <!-- 連接點 -->
            <div class="connection-point input" v-if="!isSourceNode(node.type)"></div>
            <div class="connection-point output" v-if="!isTargetNode(node.type)"></div>
          </div>

          <!-- 渲染連線 -->
          <svg class="connections-layer" v-if="connections.length > 0">
            <path
              v-for="connection in connections"
              :key="connection.id"
              :d="getConnectionPath(connection)"
              class="connection-line"
              @click="selectConnection(connection)"
              :class="{ selected: selectedConnection?.id === connection.id }"
            />
          </svg>

          <!-- 畫布提示 -->
          <div v-if="nodes.length === 0" class="canvas-placeholder">
            <div class="placeholder-content">
              <h3>🎯 開始建立您的台灣工作流</h3>
              <p>從左側拖拉節點到這裡，或點擊「添加範例節點」開始</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側屬性面板 -->
      <div class="properties-panel">
        <h3>屬性設定</h3>
        <div v-if="selectedNode" class="node-properties">
          <h4>{{ selectedNode.label }}</h4>
          <div class="property-group">
            <label>節點名稱：</label>
            <el-input 
              v-model="selectedNode.label" 
              size="small"
              @input="updateNode"
            />
          </div>
          <div class="property-group">
            <label>節點類型：</label>
            <span class="property-value">{{ getNodeTypeLabel(selectedNode.type) }}</span>
          </div>
          <div class="property-group">
            <label>位置：</label>
            <span class="property-value">
              ({{ Math.round(selectedNode.position.x) }}, {{ Math.round(selectedNode.position.y) }})
            </span>
          </div>
        </div>
        <div v-else class="no-selection">
          <p>請選擇一個節點來編輯屬性</p>
        </div>
      </div>
    </div>

    <!-- 狀態列 -->
    <div class="status-bar">
      <div class="status-left">
        <span>節點: {{ nodes.length }}</span>
        <span>連線: {{ connections.length }}</span>
        <span v-if="selectedNode">已選擇: {{ selectedNode.label }}</span>
      </div>
      <div class="status-right">
        <span>台灣在地化工作流編輯器 v1.0</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 型別定義
interface WorkflowNode {
  id: string
  type: string
  label: string
  position: { x: number; y: number }
  data?: any
}

interface WorkflowConnection {
  id: string
  source: string
  target: string
}

// 響應式資料
const nodes = ref<WorkflowNode[]>([])
const connections = ref<WorkflowConnection[]>([])
const selectedNode = ref<WorkflowNode | null>(null)
const selectedConnection = ref<WorkflowConnection | null>(null)
const draggedNode = ref<WorkflowNode | null>(null)
const dragOffset = ref({ x: 0, y: 0 })

// 節點類型映射
const nodeTypeMap: Record<string, string> = {
  manualTrigger: '手動觸發',
  scheduleTrigger: '定時觸發',
  linePay: 'Line Pay',
  ecPay: '綠界科技',
  govOpenData: '政府開放資料',
  taoyuanAirport: '桃園機場',
  lineNotify: 'Line 通知',
  email: '電子郵件'
}

const nodeIconMap: Record<string, string> = {
  manualTrigger: '🚀',
  scheduleTrigger: '⏰',
  linePay: '💳',
  ecPay: '🏦',
  govOpenData: '🏛️',
  taoyuanAirport: '✈️',
  lineNotify: '📱',
  email: '📧'
}

// 方法
const getNodeTypeLabel = (type: string): string => {
  return nodeTypeMap[type] || type
}

const getNodeIcon = (type: string): string => {
  return nodeIconMap[type] || '📦'
}

const isSourceNode = (type: string): boolean => {
  return ['manualTrigger', 'scheduleTrigger'].includes(type)
}

const isTargetNode = (type: string): boolean => {
  return ['lineNotify', 'email'].includes(type)
}

const handleDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({
      type: 'new-node',
      nodeType
    }))
    event.dataTransfer.effectAllowed = 'copy'
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  
  if (!event.dataTransfer) return
  
  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    
    if (data.type === 'new-node') {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      const position = {
        x: event.clientX - rect.left - 75, // 節點寬度的一半
        y: event.clientY - rect.top - 40   // 節點高度的一半
      }
      
      addNode(data.nodeType, position)
    }
  } catch (error) {
    console.error('處理拖放失敗:', error)
  }
}

const addNode = (type: string, position: { x: number; y: number }) => {
  const newNode: WorkflowNode = {
    id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    label: getNodeTypeLabel(type),
    position,
    data: {}
  }
  
  nodes.value.push(newNode)
  selectedNode.value = newNode
  ElMessage.success(`已添加節點：${newNode.label}`)
}

const selectNode = (node: WorkflowNode) => {
  selectedNode.value = node
  selectedConnection.value = null
}

const selectConnection = (connection: WorkflowConnection) => {
  selectedConnection.value = connection
  selectedNode.value = null
}

const deleteNode = (node: WorkflowNode) => {
  // 刪除相關連線
  connections.value = connections.value.filter(
    conn => conn.source !== node.id && conn.target !== node.id
  )
  
  // 刪除節點
  nodes.value = nodes.value.filter(n => n.id !== node.id)
  
  if (selectedNode.value?.id === node.id) {
    selectedNode.value = null
  }
  
  ElMessage.success(`已刪除節點：${node.label}`)
}

const updateNode = () => {
  // 觸發響應式更新
  if (selectedNode.value) {
    const index = nodes.value.findIndex(n => n.id === selectedNode.value!.id)
    if (index !== -1) {
      nodes.value[index] = { ...selectedNode.value }
    }
  }
}

const startDrag = (node: WorkflowNode, event: MouseEvent) => {
  if (event.button !== 0) return // 只處理左鍵
  
  draggedNode.value = node
  dragOffset.value = {
    x: event.clientX - node.position.x,
    y: event.clientY - node.position.y
  }
  
  const handleMouseMove = (e: MouseEvent) => {
    if (draggedNode.value) {
      draggedNode.value.position.x = e.clientX - dragOffset.value.x
      draggedNode.value.position.y = e.clientY - dragOffset.value.y
    }
  }
  
  const handleMouseUp = () => {
    draggedNode.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const getConnectionPath = (connection: WorkflowConnection): string => {
  const sourceNode = nodes.value.find(n => n.id === connection.source)
  const targetNode = nodes.value.find(n => n.id === connection.target)
  
  if (!sourceNode || !targetNode) return ''
  
  const startX = sourceNode.position.x + 150 // 節點寬度
  const startY = sourceNode.position.y + 40  // 節點高度的一半
  const endX = targetNode.position.x
  const endY = targetNode.position.y + 40
  
  const midX = (startX + endX) / 2
  
  return `M ${startX} ${startY} C ${midX} ${startY} ${midX} ${endY} ${endX} ${endY}`
}

const addSampleNodes = () => {
  const sampleNodes: WorkflowNode[] = [
    {
      id: 'sample-trigger',
      type: 'manualTrigger',
      label: '手動觸發',
      position: { x: 50, y: 100 }
    },
    {
      id: 'sample-linepay',
      type: 'linePay',
      label: 'Line Pay 付款',
      position: { x: 300, y: 100 }
    },
    {
      id: 'sample-notify',
      type: 'lineNotify',
      label: 'Line 通知',
      position: { x: 550, y: 100 }
    }
  ]
  
  const sampleConnections: WorkflowConnection[] = [
    {
      id: 'conn-1',
      source: 'sample-trigger',
      target: 'sample-linepay'
    },
    {
      id: 'conn-2',
      source: 'sample-linepay',
      target: 'sample-notify'
    }
  ]
  
  nodes.value = sampleNodes
  connections.value = sampleConnections
  selectedNode.value = null
  
  ElMessage.success('已載入範例工作流')
}

const clearCanvas = () => {
  nodes.value = []
  connections.value = []
  selectedNode.value = null
  selectedConnection.value = null
  ElMessage.info('畫布已清空')
}

const exportWorkflow = () => {
  const workflow = {
    name: '台灣工作流',
    nodes: nodes.value,
    connections: connections.value,
    createdAt: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(workflow, null, 2)], {
    type: 'application/json'
  })
  
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `taiwan-workflow-${Date.now()}.json`
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
  ElMessage.success('工作流已匯出')
}

// 事件
const emit = defineEmits<{
  'workflow-change': [{ nodes: WorkflowNode[], connections: WorkflowConnection[] }]
  'node-select': [node: WorkflowNode | null]
}>()

// 監聽變化
const emitChanges = () => {
  emit('workflow-change', { nodes: nodes.value, connections: connections.value })
  emit('node-select', selectedNode.value)
}

// 監聽節點和連線變化
nodes.value && connections.value && emitChanges()
</script>

<style scoped lang="scss">
.simple-workflow-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $bg-color;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-base $spacing-lg;
  background: $white;
  border-bottom: $border-width-thin solid $border-color;
  box-shadow: $shadow-sm;
  
  .toolbar-left h2 {
    margin: 0;
    color: $text-color;
    font-size: $font-size-lg;
  }
  
  .toolbar-right {
    display: flex;
    gap: $spacing-sm;
  }
}

.editor-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.node-panel {
  width: 250px;
  background: $white;
  border-right: $border-width-thin solid $border-color;
  padding: $spacing-base;
  overflow-y: auto;
  
  h3 {
    margin: 0 0 $spacing-base 0;
    color: $text-color;
    font-size: $font-size-base;
  }
  
  .node-category {
    margin-bottom: $spacing-lg;
    
    h4 {
      margin: 0 0 $spacing-sm 0;
      color: $text-color-secondary;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
    }
    
    .node-item {
      padding: $spacing-sm;
      margin-bottom: $spacing-xs;
      background: $bg-color-secondary;
      border: $border-width-thin solid $border-color;
      border-radius: $border-radius-sm;
      cursor: grab;
      transition: all 0.2s ease;
      font-size: $font-size-sm;
      
      &:hover {
        background: $primary-color;
        color: $white;
        transform: translateY(-1px);
        box-shadow: $shadow-sm;
      }
      
      &:active {
        cursor: grabbing;
      }
    }
  }
}

.canvas-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: $bg-color-tertiary;
}

.canvas {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  
  .canvas-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle, $border-color-light 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }
  
  .canvas-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: $text-color-tertiary;
    
    .placeholder-content {
      padding: $spacing-xl;
      border: 2px dashed $border-color-light;
      border-radius: $border-radius-lg;
      background: rgba($white, 0.8);
      
      h3 {
        margin: 0 0 $spacing-base 0;
        font-size: $font-size-lg;
      }
      
      p {
        margin: 0;
        font-size: $font-size-base;
      }
    }
  }
}

.workflow-node {
  position: absolute;
  width: 150px;
  background: $white;
  border: 2px solid $border-color;
  border-radius: $border-radius-base;
  box-shadow: $shadow-base;
  cursor: move;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }
  
  &.selected {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
  }
  
  .node-header {
    display: flex;
    align-items: center;
    padding: $spacing-sm;
    background: $bg-color-secondary;
    border-bottom: $border-width-thin solid $border-color;
    border-radius: $border-radius-base $border-radius-base 0 0;
    
    .node-icon {
      margin-right: $spacing-xs;
      font-size: $font-size-base;
    }
    
    .node-title {
      flex: 1;
      font-size: $font-size-sm;
      font-weight: $font-weight-medium;
      color: $text-color;
    }
    
    .node-delete {
      width: 20px;
      height: 20px;
      border: none;
      background: transparent;
      color: $text-color-tertiary;
      cursor: pointer;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 1;
      
      &:hover {
        background: $error-color;
        color: $white;
      }
    }
  }
  
  .node-content {
    padding: $spacing-sm;
    
    .node-type {
      font-size: $font-size-xs;
      color: $text-color-secondary;
      text-align: center;
    }
  }
  
  .connection-point {
    position: absolute;
    width: 12px;
    height: 12px;
    background: $white;
    border: 2px solid $border-color-dark;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    
    &.input {
      left: -6px;
    }
    
    &.output {
      right: -6px;
    }
    
    &:hover {
      border-color: $primary-color;
      transform: translateY(-50%) scale(1.2);
    }
  }
}

.connections-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .connection-line {
    fill: none;
    stroke: $border-color-dark;
    stroke-width: 2;
    pointer-events: stroke;
    cursor: pointer;
    
    &:hover {
      stroke: $primary-color;
      stroke-width: 3;
    }
    
    &.selected {
      stroke: $primary-color;
      stroke-width: 3;
    }
  }
}

.properties-panel {
  width: 300px;
  background: $white;
  border-left: $border-width-thin solid $border-color;
  padding: $spacing-base;
  overflow-y: auto;
  
  h3 {
    margin: 0 0 $spacing-base 0;
    color: $text-color;
    font-size: $font-size-base;
  }
  
  .node-properties {
    h4 {
      margin: 0 0 $spacing-base 0;
      color: $text-color;
      font-size: $font-size-base;
    }
    
    .property-group {
      margin-bottom: $spacing-base;
      
      label {
        display: block;
        margin-bottom: $spacing-xs;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $text-color-secondary;
      }
      
      .property-value {
        font-size: $font-size-sm;
        color: $text-color;
      }
    }
  }
  
  .no-selection {
    text-align: center;
    color: $text-color-tertiary;
    font-style: italic;
    padding: $spacing-xl;
  }
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm $spacing-lg;
  background: $bg-color-secondary;
  border-top: $border-width-thin solid $border-color;
  font-size: $font-size-xs;
  color: $text-color-secondary;
  
  .status-left {
    display: flex;
    gap: $spacing-lg;
  }
}

// 深色主題
[data-theme="dark"] {
  .simple-workflow-editor {
    background: var(--bg-color);
  }
  
  .editor-toolbar,
  .node-panel,
  .properties-panel {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
  }
  
  .workflow-node {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
    
    .node-header {
      background: var(--bg-color-tertiary);
      border-color: var(--border-color);
    }
  }
  
  .status-bar {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
  }
}
</style>
