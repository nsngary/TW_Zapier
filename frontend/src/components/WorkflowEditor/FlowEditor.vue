<template>
  <div class="workflow-editor">
    <!-- 工具列 -->
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <el-button-group>
          <el-button @click="resetWorkflow" :icon="Delete" size="small">
            清空
          </el-button>
          <el-button @click="autoLayout" :icon="Sort" size="small">
            自動排列
          </el-button>
          <el-button @click="fitView" :icon="FullScreen" size="small">
            適應視窗
          </el-button>
        </el-button-group>
      </div>
      
      <div class="toolbar-center">
        <span class="workflow-title">{{ workflowName }}</span>
        <el-tag v-if="hasUnsavedChanges" type="warning" size="small">
          未儲存
        </el-tag>
      </div>
      
      <div class="toolbar-right">
        <el-button-group>
          <el-button @click="saveWorkflow" :icon="DocumentAdd" type="primary" size="small">
            儲存
          </el-button>
          <el-button @click="executeWorkflow" :icon="VideoPlay" type="success" size="small">
            執行
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 主編輯區域 -->
    <div class="editor-main">
      <!-- 節點面板 - 懸停展開 -->
      <div
        class="node-palette"
        :class="{ 'expanded': isLeftPanelExpanded }"
        @mouseenter="expandLeftPanel"
        @mouseleave="collapseLeftPanel"
      >
        <div class="palette-toggle">
          <el-icon class="toggle-icon">
            <Menu />
          </el-icon>
        </div>
        <div class="palette-content">
          <div class="palette-placeholder">
            <p>節點面板</p>
            <p>拖拽節點到畫布</p>
          </div>
        </div>
      </div>

      <!-- 流程編輯器 -->
      <div class="flow-container" :class="{ 'expanded': !isLeftPanelExpanded && !isRightPanelExpanded }">
        <VueFlow
          ref="vueFlowRef"
          v-model:nodes="nodes"
          v-model:edges="edges"
          class="taiwan-flow"
          :default-viewport="{ zoom: 1 }"
          :min-zoom="0.2"
          :max-zoom="4"
          :snap-to-grid="true"
          :snap-grid="[20, 20]"
          @nodes-change="onNodesChange"
          @edges-change="onEdgesChange"
          @node-click="onNodeClick"
          @edge-click="onEdgeClick"
          @pane-click="onPaneClick"
          @drop="onDrop"
          @dragover="onDragOver"
        >
          <!-- 背景 -->
          <Background 
            pattern-color="#e5e7eb" 
            :gap="20" 
            variant="dots" 
          />

          <!-- 控制項 -->
          <Controls 
            :show-zoom="true"
            :show-fit-view="true"
            :show-interactive="true"
          />

          <!-- 小地圖 -->
          <MiniMap 
            v-if="showMinimap"
            :node-color="getNodeColor"
            :mask-color="'rgba(0, 0, 0, 0.1)'"
            position="bottom-right"
          />

          <!-- 自定義節點模板 -->
          <template #node-linePay="{ data, id }">
            <LinePayNode 
              :data="data" 
              :id="id"
              :selected="selectedNode?.id === id"
              @update="updateNodeData"
            />
          </template>

          <template #node-ecPay="{ data, id }">
            <ECPayNode 
              :data="data" 
              :id="id"
              :selected="selectedNode?.id === id"
              @update="updateNodeData"
            />
          </template>

          <template #node-manualTrigger="{ data, id }">
            <TriggerNode 
              :data="data" 
              :id="id"
              :selected="selectedNode?.id === id"
              @update="updateNodeData"
            />
          </template>
        </VueFlow>
      </div>

      <!-- 屬性面板 - 懸停展開 -->
      <div
        class="property-panel"
        :class="{ 'expanded': isRightPanelExpanded }"
        @mouseenter="expandRightPanel"
        @mouseleave="collapseRightPanel"
      >
        <div class="panel-toggle">
          <el-icon class="toggle-icon">
            <Setting />
          </el-icon>
        </div>
        <div class="panel-content">
          <div class="panel-placeholder">
            <p>屬性面板</p>
            <p>選擇節點查看屬性</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 狀態列 -->
    <div class="editor-status">
      <div class="status-left">
        <span>節點: {{ nodeCount }}</span>
        <span>連線: {{ edgeCount }}</span>
      </div>
      
      <div class="status-right">
        <el-tag 
          :type="isValidWorkflow ? 'success' : 'danger'" 
          size="small"
        >
          {{ isValidWorkflow ? '工作流有效' : '工作流無效' }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import {
  Delete,
  Sort,
  FullScreen,
  DocumentAdd,
  VideoPlay,
  Menu,
  Setting
} from '@element-plus/icons-vue'

// 暫時移除有問題的導入，使用基本功能
// import { useWorkflow } from '@/composables/useWorkflow'
// import type { TaiwanNodeType } from '@/types/workflow'

// import NodePalette from './NodePalette.vue'
// import PropertyPanel from './PropertyPanel.vue'
// import LinePayNode from './nodes/LinePayNode.vue'
// import ECPayNode from './nodes/ECPayNode.vue'
// import TriggerNode from './nodes/TriggerNode.vue'

// Props
interface Props {
  workflowId?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
})

// Emits
const emit = defineEmits<{
  save: [workflow: any]
  execute: [workflowId: string]
}>()

// 基本響應式狀態（簡化版本）
const nodes = ref([])
const edges = ref([])
const selectedNode = ref(null)
const selectedEdge = ref(null)
const vueFlowRef = ref()
const hasUnsavedChanges = ref(false)

// 基本方法（簡化版本）
const addNode = (type: string, position: any) => {
  console.log('添加節點:', type, position)
}

const fitView = () => {
  console.log('適應視圖')
}

// 本地狀態
const workflowName = ref('新工作流')
const showMinimap = ref(true)

// 面板展開狀態
const isLeftPanelExpanded = ref(false)
const isRightPanelExpanded = ref(false)

// 計算屬性
const isDragOver = ref(false)

// 面板控制方法
const expandLeftPanel = () => {
  isLeftPanelExpanded.value = true
}

const collapseLeftPanel = () => {
  isLeftPanelExpanded.value = false
}

const expandRightPanel = () => {
  isRightPanelExpanded.value = true
}

const collapseRightPanel = () => {
  isRightPanelExpanded.value = false
}

// 方法：處理新增節點
function handleAddNode(nodeType: string, position: { x: number; y: number }) {
  addNode(nodeType, position)
}

// 方法：處理拖放
function onDrop(event: DragEvent) {
  event.preventDefault()
  
  if (!event.dataTransfer) return
  
  const nodeData = event.dataTransfer.getData('application/vueflow')
  if (!nodeData) return
  
  try {
    const { type } = JSON.parse(nodeData)
    const position = vueFlowRef.value?.project({
      x: event.clientX,
      y: event.clientY
    })
    
    if (position) {
      addNode(type, position)
    }
  } catch (error) {
    console.error('拖放節點失敗:', error)
  }
  
  isDragOver.value = false
}

// 方法：處理拖放懸停
function onDragOver(event: DragEvent) {
  event.preventDefault()
  event.dataTransfer!.dropEffect = 'move'
  isDragOver.value = true
}

// 方法：節點變更處理
function onNodesChange(changes: any[]) {
  // 處理節點變更
  console.log('Nodes changed:', changes)
}

// 方法：邊線變更處理
function onEdgesChange(changes: any[]) {
  // 處理邊線變更
  console.log('Edges changed:', changes)
}

// 方法：節點點擊處理
function onNodeClick(event: any) {
  selectedNode.value = event.node
  console.log('選中節點:', event.node.id)
}

// 方法：邊線點擊處理
function onEdgeClick(event: any) {
  selectedEdge.value = event.edge
  console.log('選中邊線:', event.edge.id)
}

// 方法：畫布點擊處理
function onPaneClick() {
  selectedNode.value = null
  selectedEdge.value = null
  console.log('清除選擇')
}

// 方法：取得節點顏色（用於小地圖）
function getNodeColor(node: any): string {
  const colorMap: Record<string, string> = {
    manualTrigger: '#10b981',
    webhookTrigger: '#3b82f6',
    linePay: '#06d6a0',
    ecPay: '#f59e0b',
    taoyuanAirport: '#8b5cf6',
    govOpenData: '#ef4444'
  }
  
  return colorMap[node.type] || '#6b7280'
}

// 方法：儲存工作流
function saveWorkflow() {
  const workflow = { nodes: nodes.value, edges: edges.value }
  emit('save', workflow)
  console.log('儲存工作流')
}

// 方法：執行工作流
function executeWorkflow() {
  if (props.workflowId) {
    emit('execute', props.workflowId)
  }
}

// 生命週期
onMounted(() => {
  // 初始化編輯器
  fitView()
})
</script>

<style scoped>
.workflow-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-color-secondary);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color-light);
  box-shadow: 0 1px 3px var(--shadow-color);
}

.toolbar-center {
  display: flex;
  align-items: center;
  gap: 12px;
}

.workflow-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.editor-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左側節點面板 - 懸停展開 */
.node-palette {
  width: 60px;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color-light);
  overflow: hidden;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.node-palette.expanded {
  width: 280px;
  overflow-y: auto;
}

.palette-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid var(--border-color-light);
  cursor: pointer;
}

.toggle-icon {
  font-size: 20px;
  color: var(--text-color-secondary);
  transition: color 0.2s ease;
}

.node-palette:hover .toggle-icon {
  color: var(--color-primary);
}

.palette-content {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.node-palette.expanded .palette-content {
  opacity: 1;
}

/* 流程編輯器 - 動態調整 */
.flow-container {
  flex: 1;
  position: relative;
  transition: margin 0.3s ease;
}

.flow-container.expanded {
  margin-left: 0;
  margin-right: 0;
}

.taiwan-flow {
  background: var(--bg-color-secondary);
}

/* 右側屬性面板 - 懸停展開 */
.property-panel {
  width: 60px;
  background: var(--bg-color);
  border-left: 1px solid var(--border-color-light);
  overflow: hidden;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.property-panel.expanded {
  width: 320px;
  overflow-y: auto;
}

.panel-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid var(--border-color-light);
  cursor: pointer;
}

.property-panel .toggle-icon {
  font-size: 20px;
  color: var(--text-color-secondary);
  transition: color 0.2s ease;
}

.property-panel:hover .toggle-icon {
  color: var(--color-primary);
}

.panel-content {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.property-panel.expanded .panel-content {
  opacity: 1;
}

/* 面板佔位符樣式 */
.palette-placeholder,
.panel-placeholder {
  padding: 20px;
  text-align: center;
  color: var(--text-color-tertiary);
}

.palette-placeholder p,
.panel-placeholder p {
  margin: 8px 0;
  font-size: 14px;
}

.palette-placeholder p:first-child,
.panel-placeholder p:first-child {
  font-weight: 600;
  color: var(--text-color-secondary);
}

.editor-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: white;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #6b7280;
}

.status-left {
  display: flex;
  gap: 16px;
}

/* Vue Flow 樣式覆蓋 */
:deep(.vue-flow__background) {
  background-color: #f8fafc;
}

:deep(.vue-flow__controls) {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:deep(.vue-flow__controls button) {
  background: white;
  border: none;
  color: #374151;
}

:deep(.vue-flow__controls button:hover) {
  background: #f3f4f6;
}

:deep(.vue-flow__minimap) {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
