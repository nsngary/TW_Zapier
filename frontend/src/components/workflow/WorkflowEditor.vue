<template>
  <div class="workflow-editor">
    <!-- 工具列 -->
    <WorkflowSaveLoad
      :nodes="nodes"
      :connections="connections"
      :has-changes="hasChanges"
      @new-workflow="handleNewWorkflow"
      @workflow-loaded="handleWorkflowLoaded"
      @workflow-saved="handleWorkflowSaved"
      @workflow-deleted="handleWorkflowDeleted"
      @workflow-imported="handleWorkflowImported"
      @draft-loaded="handleDraftLoaded"
    />

    <!-- 主編輯區域 -->
    <el-container class="editor-container">
      <!-- 節點面板 -->
      <el-aside width="300px" class="node-panel">
        <NodePalette @node-drag-start="handleNodeDragStart" />
      </el-aside>

      <!-- 中央編輯區 -->
      <el-main class="editor-main">
        <div
          class="vue-flow-container"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
        >
          <VueFlow
            v-model:nodes="vueFlowNodes"
            v-model:edges="vueFlowEdges"
            :default-viewport="{ zoom: 1 }"
            :min-zoom="0.2"
            :max-zoom="4"
            :snap-to-grid="true"
            :snap-grid="[15, 15]"
            @nodes-change="handleNodesChange"
            @edges-change="handleEdgesChange"
            @connect="handleConnect"
            @node-click="handleNodeClick"
            @edge-click="handleEdgeClick"
            @pane-click="handlePaneClick"
          >
            <Background pattern-color="#aaa" :gap="16" />
            <MiniMap />
            <Controls />
            
            <!-- 自定義節點 -->
            <template #node-taiwanNode="{ data, id }">
              <TaiwanNode
                :id="id"
                :data="data"
                :selected="selectedNodeId === id"
                @update="handleNodeUpdate"
                @delete="handleNodeDelete"
              />
            </template>
          </VueFlow>
        </div>

        <!-- 連線驗證提示 -->
        <div v-if="connectionPreview" class="connection-preview-overlay">
          <ConnectionValidator
            :nodes="nodes"
            :connections="connections"
            :preview-connection="connectionPreview"
            @confirm="handleConnectionConfirm"
            @cancel="handleConnectionCancel"
          />
        </div>
      </el-main>

      <!-- 屬性面板 -->
      <el-aside width="350px" class="properties-panel">
        <NodePropertiesPanel
          :selected-node="selectedNode"
          @node-update="handleNodeUpdate"
          @node-delete="handleNodeDelete"
        />
        
        <!-- 工作流預覽 -->
        <div class="preview-section">
          <WorkflowPreview
            :nodes="nodes"
            :connections="connections"
            :auto-start="false"
          />
        </div>
      </el-aside>
    </el-container>

    <!-- 狀態列 -->
    <div class="status-bar">
      <div class="status-left">
        <span class="node-count">節點: {{ nodes.length }}</span>
        <span class="connection-count">連線: {{ connections.length }}</span>
        <span v-if="hasChanges" class="unsaved-indicator">● 未儲存</span>
      </div>
      
      <div class="status-right">
        <span class="zoom-level">縮放: {{ Math.round(viewport.zoom * 100) }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { VueFlow, useVueFlow, Background, MiniMap, Controls } from '@vue-flow/core'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'

// 組件導入
import WorkflowSaveLoad from './WorkflowSaveLoad.vue'
import NodePalette from './NodePalette.vue'
import NodePropertiesPanel from './NodePropertiesPanel.vue'
import WorkflowPreview from './WorkflowPreview.vue'
import ConnectionValidator from './ConnectionValidator.vue'
import TaiwanNode from './TaiwanNode.vue'

// 工具導入
import { findNodeDefinition } from '@/config/nodeLibrary'
import { validateConnection } from '@/utils/connectionValidator'
import type { 
  WorkflowNode, 
  WorkflowConnection, 
  WorkflowData,
  PaletteNode 
} from '@/types/workflow'

// ===== Props =====

interface Props {
  initialNodes?: WorkflowNode[]
  initialConnections?: WorkflowConnection[]
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialNodes: () => [],
  initialConnections: () => [],
  readonly: false
})

// ===== Vue Flow 設置 =====

const { viewport, onConnect, addNodes, addEdges, removeNodes, removeEdges } = useVueFlow()

// ===== 響應式資料 =====

const nodes = ref<WorkflowNode[]>([...props.initialNodes])
const connections = ref<WorkflowConnection[]>([...props.initialConnections])
const selectedNodeId = ref<string | null>(null)
const hasChanges = ref(false)
const connectionPreview = ref<{
  sourceNode: WorkflowNode
  targetNode: WorkflowNode
} | null>(null)

// ===== 計算屬性 =====

const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return nodes.value.find(node => node.id === selectedNodeId.value) || null
})

const vueFlowNodes = computed({
  get: () => nodes.value.map(node => ({
    id: node.id,
    type: 'taiwanNode',
    position: node.position,
    data: {
      ...node.data,
      label: node.label,
      nodeType: node.type
    }
  })),
  set: (newNodes) => {
    // 處理節點位置更新
    newNodes.forEach(vueFlowNode => {
      const node = nodes.value.find(n => n.id === vueFlowNode.id)
      if (node) {
        node.position = vueFlowNode.position
      }
    })
    hasChanges.value = true
  }
})

const vueFlowEdges = computed({
  get: () => connections.value.map(conn => ({
    id: conn.id,
    source: conn.source,
    target: conn.target,
    sourceHandle: conn.sourceHandle,
    targetHandle: conn.targetHandle,
    type: 'default',
    animated: false
  })),
  set: (newEdges) => {
    // 處理連線更新
    connections.value = newEdges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle || undefined,
      targetHandle: edge.targetHandle || undefined
    }))
    hasChanges.value = true
  }
})

// ===== 方法 =====

const handleNodeDragStart = (node: PaletteNode, event: DragEvent) => {
  if (!event.dataTransfer) return
  
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'palette-node',
    nodeType: node.type,
    nodeData: node.defaultData
  }))
  
  event.dataTransfer.effectAllowed = 'copy'
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

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  
  if (!event.dataTransfer) return
  
  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    
    if (data.type === 'palette-node') {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
      const position = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
      
      await addNode({
        id: uuidv4(),
        type: data.nodeType,
        label: data.nodeData.label,
        position,
        data: data.nodeData
      })
    }
  } catch (error) {
    console.error('處理拖放失敗:', error)
    ElMessage.error('添加節點失敗')
  }
}

const addNode = async (node: WorkflowNode) => {
  const nodeDefinition = findNodeDefinition(node.type as any)
  if (!nodeDefinition) {
    ElMessage.warning(`不支援的節點類型: ${node.type}`)
    return
  }
  
  // 檢查ID是否重複
  if (nodes.value.some(n => n.id === node.id)) {
    ElMessage.error(`節點ID已存在: ${node.id}`)
    return
  }
  
  nodes.value.push(node)
  hasChanges.value = true
  
  await nextTick()
  ElMessage.success(`已添加節點: ${node.label}`)
}

const handleNodeUpdate = (updatedNode: WorkflowNode) => {
  const index = nodes.value.findIndex(n => n.id === updatedNode.id)
  if (index !== -1) {
    nodes.value[index] = { ...updatedNode }
    hasChanges.value = true
  }
}

const handleNodeDelete = async (node: WorkflowNode) => {
  // 刪除相關連線
  connections.value = connections.value.filter(
    conn => conn.source !== node.id && conn.target !== node.id
  )
  
  // 刪除節點
  nodes.value = nodes.value.filter(n => n.id !== node.id)
  
  // 清除選擇
  if (selectedNodeId.value === node.id) {
    selectedNodeId.value = null
  }
  
  hasChanges.value = true
  ElMessage.success(`已刪除節點: ${node.label}`)
}

const handleConnect = (params: any) => {
  const sourceNode = nodes.value.find(n => n.id === params.source)
  const targetNode = nodes.value.find(n => n.id === params.target)
  
  if (!sourceNode || !targetNode) return
  
  // 顯示連線預覽
  connectionPreview.value = { sourceNode, targetNode }
}

const handleConnectionConfirm = () => {
  if (!connectionPreview.value) return
  
  const { sourceNode, targetNode } = connectionPreview.value
  
  const newConnection: WorkflowConnection = {
    id: uuidv4(),
    source: sourceNode.id,
    target: targetNode.id,
    sourceHandle: 'output',
    targetHandle: 'input'
  }
  
  connections.value.push(newConnection)
  connectionPreview.value = null
  hasChanges.value = true
  
  ElMessage.success('連線已建立')
}

const handleConnectionCancel = () => {
  connectionPreview.value = null
}

const handleNodeClick = (event: any) => {
  selectedNodeId.value = event.node.id
}

const handleEdgeClick = (event: any) => {
  // 處理連線點擊
}

const handlePaneClick = () => {
  selectedNodeId.value = null
}

const handleNodesChange = (changes: any[]) => {
  // 處理節點變更
  hasChanges.value = true
}

const handleEdgesChange = (changes: any[]) => {
  // 處理連線變更
  hasChanges.value = true
}

// 工作流管理方法
const handleNewWorkflow = () => {
  nodes.value = []
  connections.value = []
  selectedNodeId.value = null
  hasChanges.value = false
}

const handleWorkflowLoaded = (workflow: WorkflowData) => {
  nodes.value = [...workflow.nodes]
  connections.value = [...workflow.connections]
  selectedNodeId.value = null
  hasChanges.value = false
}

const handleWorkflowSaved = (workflow: WorkflowData) => {
  hasChanges.value = false
}

const handleWorkflowDeleted = () => {
  handleNewWorkflow()
}

const handleWorkflowImported = (workflowData: any) => {
  nodes.value = [...workflowData.nodes]
  connections.value = [...workflowData.connections]
  selectedNodeId.value = null
  hasChanges.value = false
}

const handleDraftLoaded = (draft: any) => {
  nodes.value = [...draft.nodes]
  connections.value = [...draft.connections]
  selectedNodeId.value = null
  hasChanges.value = false
}

// ===== 監聽器 =====

watch([nodes, connections], () => {
  hasChanges.value = true
}, { deep: true })

// ===== 事件 =====

const emit = defineEmits<{
  'workflow-change': [{ nodes: WorkflowNode[], connections: WorkflowConnection[] }]
  'node-select': [node: WorkflowNode | null]
}>()

watch(selectedNode, (node) => {
  emit('node-select', node)
})

watch([nodes, connections], ([newNodes, newConnections]) => {
  emit('workflow-change', { nodes: newNodes, connections: newConnections })
}, { deep: true })
</script>

<style scoped lang="scss">
.workflow-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: $bg-color;
}

.editor-container {
  flex: 1;
  height: calc(100vh - 120px);
}

.node-panel {
  background: $white;
  border-right: $border-width-thin solid $border-color;
  overflow: hidden;
}

.editor-main {
  padding: 0;
  position: relative;
  overflow: hidden;
}

.vue-flow-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.properties-panel {
  background: $white;
  border-left: $border-width-thin solid $border-color;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .preview-section {
    flex: 1;
    margin-top: $spacing-base;
    border-top: $border-width-thin solid $border-color;
  }
}

.connection-preview-overlay {
  position: absolute;
  top: $spacing-lg;
  right: $spacing-lg;
  z-index: 1000;
  max-width: 400px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm $spacing-lg;
  background: $bg-color-secondary;
  border-top: $border-width-thin solid $border-color;
  font-size: $font-size-sm;
  color: $text-color-secondary;
  
  .status-left {
    display: flex;
    gap: $spacing-lg;
    
    .unsaved-indicator {
      color: $warning-color;
      font-weight: $font-weight-medium;
    }
  }
}

// 深色主題
[data-theme="dark"] {
  .workflow-editor {
    background: var(--bg-color);
  }
  
  .node-panel,
  .properties-panel {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
  }
  
  .status-bar {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
    color: var(--text-color-secondary);
  }
}
</style>
