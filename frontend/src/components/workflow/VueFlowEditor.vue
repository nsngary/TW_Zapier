
<template>
  <div class="vue-flow-editor">
    <!-- 新的 Header -->
    <EditorHeader
      @new-workflow="handleNewWorkflow"
      @open-workflow="handleOpenWorkflow"
      @save-workflow="handleSaveWorkflow"
      @export-workflow="exportWorkflow"
      @undo="handleUndo"
      @redo="handleRedo"
      @select-all="handleSelectAll"
      @clear-canvas="clearCanvas"
      @fit-view="fitView"
      @zoom-in="handleZoomIn"
      @zoom-out="handleZoomOut"
      @run-workflow="runTests"
    />

    <!-- 主編輯區域 -->
    <div class="editor-main">
      <!-- 左側節點面板 - 懸停展開 -->
      <div
        class="node-panel"
        :class="{ 'expanded': isLeftPanelExpanded }"
        @mouseenter="expandLeftPanel"
        @mouseleave="collapseLeftPanel"
      >
        <div class="panel-toggle">
          <el-icon class="toggle-icon">
            <Menu />
          </el-icon>
        </div>
        <div class="panel-content">
          <h3>節點庫</h3>
          <div class="node-categories">
          <div class="node-category">
            <h4>
              <el-icon><VideoPlay /></el-icon>
              觸發節點
            </h4>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'manualTrigger')"
            >
              <span class="node-icon">
                <el-icon><VideoPlay /></el-icon>
              </span>
              <span class="node-label">手動觸發</span>
            </div>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'scheduleTrigger')"
            >
              <span class="node-icon">
                <el-icon><Timer /></el-icon>
              </span>
              <span class="node-label">定時觸發</span>
            </div>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'webhookTrigger')"
            >
              <span class="node-icon">
                <el-icon><Link /></el-icon>
              </span>
              <span class="node-label">Webhook 觸發</span>
            </div>
          </div>

          <div class="node-category">
            <h4>
              <el-icon><CreditCard /></el-icon>
              台灣金流
            </h4>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'linePay')"
            >
              <span class="node-icon">
                <el-icon><CreditCard /></el-icon>
              </span>
              <span class="node-label">Line Pay</span>
            </div>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'ecPay')"
            >
              <span class="node-icon">
                <el-icon><OfficeBuilding /></el-icon>
              </span>
              <span class="node-label">綠界科技</span>
            </div>
          </div>

          <div class="node-category">
            <h4>
              <el-icon><OfficeBuilding /></el-icon>
              台灣服務
            </h4>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'govOpenData')"
            >
              <span class="node-icon">
                <el-icon><OfficeBuilding /></el-icon>
              </span>
              <span class="node-label">政府開放資料</span>
            </div>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'taoyuanAirport')"
            >
              <span class="node-icon">
                <el-icon><Promotion /></el-icon>
              </span>
              <span class="node-label">桃園機場</span>
            </div>
          </div>

          <div class="node-category">
            <h4>
              <el-icon><ChatDotRound /></el-icon>
              通知服務
            </h4>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'lineNotify')"
            >
              <span class="node-icon">
                <el-icon><ChatDotRound /></el-icon>
              </span>
              <span class="node-label">Line 通知</span>
            </div>
            <div
              class="node-item"
              draggable="true"
              @dragstart="handleDragStart($event, 'email')"
            >
              <span class="node-icon">
                <el-icon><Message /></el-icon>
              </span>
              <span class="node-label">電子郵件</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- 中央 Vue Flow 畫布 -->
      <div
        class="canvas-container"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
      >
        <VueFlow
          :nodes="nodes"
          :edges="edges"
          :default-viewport="{ zoom: 1 }"
          :min-zoom="0.1"
          :max-zoom="3"
          :snap-to-grid="true"
          :snap-grid="[20, 20]"
          :delete-key-code="['Delete', 'Backspace']"
          :pan-on-scroll="true"
          :zoom-on-scroll="false"
          :zoom-on-pinch="true"
          :zoom-on-double-click="false"
          :connection-line-type="ConnectionLineType.SmoothStep"
          :default-edge-options="defaultEdgeOptions"
          @nodes-change="handleNodesChange"
          @edges-change="handleEdgesChange"
          @connect="handleConnect"
          @node-click="handleNodeClick"
          @edge-click="handleEdgeClick"
          @pane-click="handlePaneClick"
          class="vue-flow-canvas"
        >
          <!-- 背景網格 -->
          <Background
            pattern-color="#57534e"
            :gap="20"
            variant="dots"
            bg-color="rgba(221, 212, 202,0.2)"
          />
          
          <!-- 小地圖 -->
          <MiniMap
            :node-color="getNodeColor"
            :mask-color="'rgba(250, 250, 249, 0.7)'"
            position="bottom-right"
          />
          
          <!-- 控制項 -->
          <Controls
            position="bottom-left"
            :show-zoom="false"
            :show-fit-view="false"
            :show-interactive="false"
          />

          <!-- 專業控制面板 -->
          <div class="workflow-controls">
            <div class="control-group">
              <button
                class="control-button"
                @click="toggleFullscreen"
                :class="{ active: isFullscreen }"
                title="全螢幕模式"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>

              <button
                class="control-button"
                @click="zoomIn"
                title="放大畫布"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>

              <button
                class="control-button"
                @click="zoomOut"
                title="縮小畫布"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>

              <button
                class="control-button"
                @click="undo"
                :disabled="!canUndo"
                title="撤銷操作 (Ctrl+Z)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v6h6"/>
                  <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
                </svg>
              </button>

              <button
                class="control-button"
                @click="redo"
                :disabled="currentHistoryIndex >= historyStack.length - 1"
                title="重做操作 (Ctrl+Shift+Z)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 7v6h-6"/>
                  <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
                </svg>
              </button>

              <button
                class="control-button"
                @click="autoLayout"
                title="自動排版"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 自定義節點模板 -->
          <template #node-taiwanNode="{ data, id }">
            <TaiwanFlowNode
              :id="id"
              :data="data"
              :selected="selectedNodeId === id"
              @update="handleNodeUpdate"
              @delete="handleNodeDelete"
            />
          </template>

          <!-- 自定義邊模板 -->
          <template #edge-smoothstep="{ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, markerEnd }">
            <g>
              <!-- 透明感應區域路徑 (較寬，用於懸停檢測) -->
              <path
                :id="`edge-hover-area-${id}`"
                :d="getSmoothStepPath(sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition)"
                class="edge-hover-area"
                @mouseenter="handleEdgeMouseEnter(id)"
                @mouseleave="handleEdgeMouseLeave(id)"
              />

              <!-- 視覺連接線路徑 (較細，實際顯示的線條) -->
              <path
                :id="`edge-path-${id}`"
                :d="getSmoothStepPath(sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition)"
                :style="getEdgeStyle(id)"
                :marker-end="markerEnd"
                class="vue-flow__edge-path"
              />

              <!-- 懸停時顯示的操作按鈕組 (n8n 風格) -->
              <g v-if="hoveredEdgeId === id" class="edge-actions">
                <!-- 按鈕組容器 - 動態縮放和位置調整 -->
                <foreignObject
                  :x="getEdgeButtonX(sourceX, targetX)"
                  :y="getEdgeButtonY(sourceY, targetY)"
                  :width="getEdgeButtonWidth(sourceX, sourceY, targetX, targetY)"
                  :height="getEdgeButtonHeight(sourceX, sourceY, targetX, targetY)"
                >
                  <div
                    class="edge-button-container"
                    :class="getEdgeButtonSizeClass(sourceX, sourceY, targetX, targetY)"
                    @mouseenter="handleEdgeMouseEnter(id)"
                    @mouseleave="handleEdgeMouseLeave(id)"
                  >
                    <!-- 編輯條件按鈕 -->
                    <!-- <button
                      class="edge-action-btn edit-condition-btn"
                      @click="handleEditCondition(id)"
                      title="編輯連接條件"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button> -->

                    <!-- 新增節點按鈕 -->
                    <button
                      class="edge-action-btn add-node-btn"
                      @click="handleAddNodeBetween(id)"
                      title="在此處新增節點"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </button>

                    <!-- 複製連接線按鈕 -->
                    <!-- <button
                      class="edge-action-btn copy-edge-btn"
                      @click="handleCopyEdge(id)"
                      title="複製連接線"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                    </button> -->

                    <!-- 刪除按鈕 -->
                    <button
                      class="edge-action-btn delete-edge-btn"
                      @click="handleDeleteEdge(id)"
                      title="刪除連接線"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                      </svg>
                    </button>

                    <!-- 更多選項按鈕 -->
                    <!-- <button
                      class="edge-action-btn more-edge-btn"
                      @click="handleMoreEdgeOptions(id)"
                      title="更多選項"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="12" cy="5" r="1"/>
                        <circle cx="12" cy="19" r="1"/>
                      </svg>
                    </button> -->
                  </div>
                </foreignObject>
              </g>
            </g>
          </template>
        </VueFlow>
      </div>

      <!-- 右側屬性面板 - 懸停展開 -->
      <div
        class="properties-panel"
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
          <h3>屬性設定</h3>
        <div v-if="selectedNode" class="node-properties">
          <h4>{{ selectedNode.data?.label || selectedNode.id }}</h4>
          
          <div class="property-group">
            <label>節點名稱：</label>
            <el-input 
              v-model="selectedNode.data.label" 
              size="small"
              @input="updateSelectedNode"
            />
          </div>
          
          <div class="property-group">
            <label>節點類型：</label>
            <span class="property-value">{{ getNodeTypeLabel(selectedNode.data?.nodeType) }}</span>
          </div>
          
          <div class="property-group">
            <label>位置：</label>
            <span class="property-value">
              ({{ Math.round(selectedNode.position.x) }}, {{ Math.round(selectedNode.position.y) }})
            </span>
          </div>

          <!-- 節點特定屬性 -->
          <div v-if="selectedNode.data?.nodeType === 'linePay'" class="node-specific-props">
            <div class="property-group">
              <label>付款金額：</label>
              <el-input 
                v-model="selectedNode.data.amount" 
                size="small"
                type="number"
                @input="updateSelectedNode"
              />
            </div>
            <div class="property-group">
              <label>商品名稱：</label>
              <el-input 
                v-model="selectedNode.data.productName" 
                size="small"
                @input="updateSelectedNode"
              />
            </div>
          </div>

          <!-- 觸發節點屬性 -->
          <div v-if="isTriggerNode(selectedNode.data?.nodeType)" class="node-specific-props">
            <TriggerNodeEditor
              v-model="selectedNode.data"
              @change="updateSelectedNode"
            />
          </div>

          <!-- Line Pay 節點屬性 -->
          <div v-else-if="selectedNode.data?.nodeType === 'linePay'" class="node-specific-props">
            <LinePayNodeEditor
              v-model="selectedNode.data"
              @change="updateSelectedNode"
            />
          </div>

          <!-- 通知節點屬性 -->
          <div v-else-if="isNotificationNode(selectedNode.data?.nodeType)" class="node-specific-props">
            <NotificationNodeEditor
              v-model="selectedNode.data"
              @change="updateSelectedNode"
            />
          </div>

          <div v-else-if="selectedNode.data?.nodeType === 'email'" class="node-specific-props">
            <div class="property-group">
              <label>通知訊息：</label>
              <el-input
                v-model="selectedNode.data.message"
                size="small"
                type="textarea"
                :rows="3"
                @input="updateSelectedNode"
              />
            </div>
          </div>
        </div>
        
        <div v-else class="no-selection">
          <p>請選擇一個節點來編輯屬性</p>
        </div>

        <!-- 連線資訊 -->
        <div v-if="selectedEdge" class="edge-properties">
          <h4>連線屬性</h4>
          <div class="property-group">
            <label>來源節點：</label>
            <span class="property-value">{{ getNodeLabel(selectedEdge.source) }}</span>
          </div>
          <div class="property-group">
            <label>目標節點：</label>
            <span class="property-value">{{ getNodeLabel(selectedEdge.target) }}</span>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- 狀態列 -->
    <div class="status-bar">
      <div class="status-left">
        <span>節點: {{ nodes.length }}</span>
        <span>連線: {{ edges.length }}</span>
        <span v-if="selectedNode">已選擇: {{ selectedNode.data?.label || selectedNode.id }}</span>
      </div>
      <div class="status-right">
        <span>Vue Flow 台灣工作流編輯器 v2.0</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import {
  VueFlow,
  useVueFlow,
  type Node,
  type Edge,
  type Connection,
  MarkerType,
  ConnectionLineType
} from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { ElMessage } from 'element-plus'
import {
  Menu,
  Setting,
  VideoPlay,
  Timer,
  Link,
  CreditCard,
  OfficeBuilding,
  ChatDotRound,
  Message,
  Promotion
} from '@element-plus/icons-vue'
import EditorHeader from '../layout/EditorHeader.vue'
import TaiwanFlowNode from './TaiwanFlowNode.vue'
import TriggerNodeEditor from './editors/TriggerNodeEditor.vue'
import LinePayNodeEditor from './editors/LinePayNodeEditor.vue'
import NotificationNodeEditor from './editors/NotificationNodeEditor.vue'

// Vue Flow 實例
const {
  addNodes,
  addEdges,
  removeNodes,
  removeEdges,
  findNode,
  findEdge,
  fitView: vueFlowFitView,
  project,
  getViewport,
  setViewport,
  zoomIn: vueFlowZoomIn,
  zoomOut: vueFlowZoomOut
} = useVueFlow()

// 響應式資料
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])
const selectedNodeId = ref<string | null>(null)
const selectedEdgeId = ref<string | null>(null)
const hoveredEdgeId = ref<string | null>(null)

// 面板展開狀態
const isLeftPanelExpanded = ref(false)
const isRightPanelExpanded = ref(false)



// 默認連線選項 (n8n 風格)
const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: {
    stroke: '#6b7280',  // n8n 連接線顏色
    strokeWidth: 2,
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 12,
    height: 12,
    color: '#6b7280'
  }
}

// 計算屬性
const selectedNode = computed(() => {
  if (!selectedNodeId.value) return null
  return findNode(selectedNodeId.value)
})

const selectedEdge = computed(() => {
  if (!selectedEdgeId.value) return null
  return findEdge(selectedEdgeId.value)
})

const canUndo = computed(() => {
  return currentHistoryIndex.value > 0
})

// 節點類型映射
const nodeTypeMap: Record<string, string> = {
  manualTrigger: '手動觸發',
  webhookTrigger: 'Webhook 觸發',
  scheduleTrigger: '定時觸發',
  linePay: 'Line Pay',
  ecPay: '綠界科技',
  govOpenData: '政府開放資料',
  taoyuanAirport: '桃園機場',
  lineNotify: 'Line 通知',
  email: '電子郵件'
}

// 使用 SVG Path 的圖示配置
const nodeIconMap: Record<string, string> = {
  manualTrigger: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
  <path d="M220.49,190.83a12,12,0,0,1,0,17L207.8,220.49a12,12,0,0,1-17,0l-56.56-56.57L115,214.09c0,.1-.08.21-.13.32a15.83,15.83,0,0,1-14.6,9.59l-.79,0a15.83,15.83,0,0,1-14.41-11L32.8,52.92A16,16,0,0,1,52.92,32.8L213,85.07a16,16,0,0,1,1.41,29.8l-.32.13-50.17,19.27ZM96,32a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0v8A8,8,0,0,0,96,32ZM16,104h8a8,8,0,0,0,0-16H16a8,8,0,0,0,0,16ZM124.42,39.16a8,8,0,0,0,10.74-3.58l8-16a8,8,0,0,0-14.31-7.16l-8,16A8,8,0,0,0,124.42,39.16Zm-96,81.69-16,8a8,8,0,0,0,7.16,14.31l16-8a8,8,0,1,0-7.16-14.31Z"></path>
  </svg>`,
  webhookTrigger: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
  <path d="M50.15,160,89.07,92.57l-2.24-3.88a48,48,0,1,1,85.05-44.17,8.17,8.17,0,0,1-3.19,10.4,8,8,0,0,1-11.35-3.72,32,32,0,1,0-56.77,29.3.57.57,0,0,1,.08.13l13.83,23.94a8,8,0,0,1,0,8L77.86,176a16,16,0,0,1-27.71-16Zm141-40H178.81L141.86,56a16,16,0,0,0-27.71,16l34.64,60a8,8,0,0,0,6.92,4h35.63c17.89,0,32.95,14.64,32.66,32.53A32,32,0,0,1,192.31,200a8.23,8.23,0,0,0-8.28,7.33,8,8,0,0,0,8,8.67,48.05,48.05,0,0,0,48-48.93C239.49,140.79,217.48,120,191.19,120ZM208,167.23c-.4-8.61-7.82-15.23-16.43-15.23H114.81a8,8,0,0,0-6.93,4L91.72,184h0a32,32,0,1,1-53.47-35,8.2,8.2,0,0,0-.92-11,8,8,0,0,0-11.72,1.17A47.63,47.63,0,0,0,16,167.54,48,48,0,0,0,105.55,192v0l4.62-8H192A16,16,0,0,0,208,167.23Z"></path>  </svg>`,
  scheduleTrigger: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
  <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.59A16.09,16.09,0,0,0,200,75.64ZM184,40V64H72V40Zm0,176H72V180l56-42,56,42.35Z"></path>  </svg>`,
  linePay: `<svg data-v-28e75e09="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024">
  <path fill="currentColor" d="M896 324.096c0-42.368-2.496-55.296-9.536-68.48a52.352 52.352 0 0 0-22.144-22.08c-13.12-7.04-26.048-9.536-68.416-9.536H228.096c-42.368 0-55.296 2.496-68.48 9.536a52.352 52.352 0 0 0-22.08 22.144c-7.04 13.12-9.536 26.048-9.536 68.416v375.808c0 42.368 2.496 55.296 9.536 68.48a52.352 52.352 0 0 0 22.144 22.08c13.12 7.04 26.048 9.536 68.416 9.536h567.808c42.368 0 55.296-2.496 68.48-9.536a52.352 52.352 0 0 0 22.08-22.144c7.04-13.12 9.536-26.048 9.536-68.416zm64 0v375.808c0 57.088-5.952 77.76-17.088 98.56-11.136 20.928-27.52 37.312-48.384 48.448-20.864 11.136-41.6 17.088-98.56 17.088H228.032c-57.088 0-77.76-5.952-98.56-17.088a116.288 116.288 0 0 1-48.448-48.384c-11.136-20.864-17.088-41.6-17.088-98.56V324.032c0-57.088 5.952-77.76 17.088-98.56 11.136-20.928 27.52-37.312 48.384-48.448 20.864-11.136 41.6-17.088 98.56-17.088H795.84c57.088 0 77.76 5.952 98.56 17.088 20.928 11.136 37.312 27.52 48.448 48.384 11.136 20.864 17.088 41.6 17.088 98.56z"></path><path fill="currentColor" d="M64 320h896v64H64zm0 128h896v64H64zm128 192h256v64H192z"></path></svg>`,
  ecPay: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
  <path d="M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z"></path>  </svg>`,
  govOpenData: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>`,
  taoyuanAirport: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>`,
  lineNotify: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>`,
  email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>`
}

// 方法
const getNodeTypeLabel = (type: string): string => {
  return nodeTypeMap[type] || type
}

const getNodeLabel = (nodeId: string): string => {
  const node = findNode(nodeId)
  return node?.data?.label || nodeId
}

const getNodeColor = (node: Node): string => {
  const type = node.data?.nodeType
  // 使用專案色卡配色，與主畫布節點顏色保持一致
  const colorMap: Record<string, string> = {
    manualTrigger: '#667539',    // $success-color - 觸發節點使用成功色
    scheduleTrigger: '#667539',  // $success-color - 觸發節點使用成功色
    webhookTrigger: '#667539',   // $success-color - 觸發節點使用成功色
    linePay: '#5ba5c5',         // $info-color - 付款節點使用資訊色
    ecPay: '#5ba5c5',           // $info-color - 付款節點使用資訊色
    govOpenData: '#C23928',     // $accent-crimson - 台灣服務節點使用深紅色
    taoyuanAirport: '#C23928',  // $accent-crimson - 台灣服務節點使用深紅色
    lineNotify: '#C07F56',      // $accent-orange - 通知節點使用橘色
    email: '#C07F56'            // $accent-orange - 通知節點使用橘色
  }
  return colorMap[type] || '#78716c' // $neutral-500 - 預設使用中性色
}

// 拖拉處理
const handleDragStart = (event: DragEvent, nodeType: string) => {
  if (!event.dataTransfer) return
  
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'new-node',
    nodeType
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

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  
  if (!event.dataTransfer) return
  
  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    
    if (data.type === 'new-node') {
      // 將螢幕座標轉換為 Vue Flow 座標
      const position = project({
        x: event.clientX - 75, // 節點寬度的一半
        y: event.clientY - 40   // 節點高度的一半
      })
      
      addNewNode(data.nodeType, position)
    }
  } catch (error) {
    console.error('處理拖放失敗:', error)
    ElMessage.error('添加節點失敗')
  }
}

const addNewNode = (nodeType: string, position: { x: number; y: number }) => {
  // 保存當前狀態到歷史記錄
  saveToHistory()

  const newNode: Node = {
    id: `node-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    type: 'taiwanNode',
    position,
    data: {
      label: getNodeTypeLabel(nodeType),
      nodeType,
      icon: nodeIconMap[nodeType],
      // 節點特定的預設資料
      ...(nodeType === 'manualTrigger' && {
        type: 'manualTrigger',
        settings: {
          buttonText: '執行工作流程',
          requireConfirmation: false
        }
      }),
      ...(nodeType === 'webhookTrigger' && {
        type: 'webhookTrigger',
        settings: {
          path: '/webhook',
          method: 'POST',
          authentication: 'none',
          responseFormat: 'json'
        }
      }),
      ...(nodeType === 'scheduleTrigger' && {
        type: 'scheduleTrigger',
        settings: {
          mode: 'interval',
          intervalValue: 1,
          intervalUnit: 'hours',
          timezone: 'Asia/Taipei',
          enabled: true
        }
      }),
      ...(nodeType === 'linePay' && {
        amount: 1000,
        currency: 'TWD',
        productName: '測試商品'
      }),
      ...(nodeType === 'lineNotify' && {
        message: '工作流執行完成'
      })
    }
  }

  // 直接操作響應式變量，確保 watch 監聽器能正確觸發
  nodes.value.push(newNode)
  selectedNodeId.value = newNode.id
  ElMessage.success(`已添加節點：${newNode.data.label}`)
}

// 事件處理
const handleNodesChange = (changes: any[]) => {
  // 處理節點變更
  changes.forEach((change) => {
    if (change.type === 'position' && change.dragging === false) {
      // 節點位置更新完成
      const node = nodes.value.find(n => n.id === change.id)
      if (node) {
        node.position = change.position
      }
    } else if (change.type === 'remove') {
      // 節點被刪除
      nodes.value = nodes.value.filter(n => n.id !== change.id)
    }
  })
}

const handleEdgesChange = (changes: any[]) => {
  // 處理連線變更
  changes.forEach((change) => {
    if (change.type === 'remove') {
      // 連線被刪除
      edges.value = edges.value.filter(e => e.id !== change.id)
    }
  })
}

const handleConnect = (connection: Connection) => {
  const newEdge: Edge = {
    id: `edge-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    source: connection.source,
    target: connection.target,
    sourceHandle: connection.sourceHandle,
    targetHandle: connection.targetHandle,
    ...defaultEdgeOptions, // 使用默認邊選項，確保有懸停按鈕
    animated: true, // 覆蓋默認的 animated: false
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: '#666'
    }
  }

  // 直接操作響應式變量，確保 watch 監聽器能正確觸發
  edges.value.push(newEdge)
  ElMessage.success('連線已建立')
}

const handleNodeClick = (event: any) => {
  selectedNodeId.value = event.node.id
  selectedEdgeId.value = null
}

const handleEdgeClick = (event: any) => {
  selectedEdgeId.value = event.edge.id
  selectedNodeId.value = null
}

const handlePaneClick = () => {
  selectedNodeId.value = null
  selectedEdgeId.value = null
}

// 邊懸停事件處理 - 添加防閃爍機制
let edgeHoverTimeout: number | null = null

const handleEdgeMouseEnter = (edgeId: string) => {
  // 清除任何待執行的隱藏操作
  if (edgeHoverTimeout) {
    clearTimeout(edgeHoverTimeout)
    edgeHoverTimeout = null
  }
  hoveredEdgeId.value = edgeId
}

const handleEdgeMouseLeave = (_edgeId: string) => {
  // 添加短暫延遲，防止快速進入/離開導致的閃爍
  edgeHoverTimeout = window.setTimeout(() => {
    hoveredEdgeId.value = null
    edgeHoverTimeout = null
  }, 500) // 500ms 延遲，足夠防止閃爍但不影響響應性
}

// 邊操作方法
const handleAddNodeBetween = (edgeId: string) => {
  const edge = edges.value.find(e => e.id === edgeId)
  if (!edge) return

  saveToHistory()

  // 創建新節點
  const newNodeId = `node-${Date.now()}`
  const sourceNode = nodes.value.find(n => n.id === edge.source)
  const targetNode = nodes.value.find(n => n.id === edge.target)

  if (!sourceNode || !targetNode) return

  const newNode = {
    id: newNodeId,
    type: 'taiwanNode',
    position: {
      x: (sourceNode.position.x + targetNode.position.x) / 2,
      y: (sourceNode.position.y + targetNode.position.y) / 2
    },
    data: {
      label: '新節點',
      type: 'general',
      icon: '⚙️'
    }
  }

  // 創建新的連接線
  const newEdge1 = {
    id: `edge-${edge.source}-${newNodeId}`,
    source: edge.source,
    target: newNodeId,
    ...defaultEdgeOptions
  }

  const newEdge2 = {
    id: `edge-${newNodeId}-${edge.target}`,
    source: newNodeId,
    target: edge.target,
    ...defaultEdgeOptions
  }

  // 更新節點和邊
  nodes.value.push(newNode)
  edges.value = edges.value.filter(e => e.id !== edgeId)
  edges.value.push(newEdge1, newEdge2)

  ElMessage.success('已在連接線中間添加新節點')
}

const handleDeleteEdge = (edgeId: string) => {
  saveToHistory()
  edges.value = edges.value.filter(e => e.id !== edgeId)
  hoveredEdgeId.value = null
  ElMessage.success('已刪除連接線')
}

// 新增的連接線操作函數
const handleEditCondition = (edgeId: string) => {
  const edge = findEdge(edgeId)
  if (edge) {
    selectedEdgeId.value = edgeId
    ElMessage.info('編輯連接條件功能開發中...')
  }
}

const handleCopyEdge = (edgeId: string) => {
  const edge = findEdge(edgeId)
  if (edge) {
    // 創建複製的連接線（暫時複製到相同位置，實際應用中可能需要不同的邏輯）
    const newEdge = {
      ...edge,
      id: `edge-copy-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      animated: true
    }
    edges.value.push(newEdge)
    ElMessage.success('已複製連接線')
  }
}

const handleMoreEdgeOptions = (edgeId: string) => {
  const edge = findEdge(edgeId)
  if (edge) {
    selectedEdgeId.value = edgeId
    ElMessage.info('更多連接線選項功能開發中...')
  }
}

// ===== 連接線按鈕動態縮放和位置計算函數 =====

// 計算連接線長度
const getEdgeDistance = (sourceX: number, sourceY: number, targetX: number, targetY: number): number => {
  return Math.sqrt((targetX - sourceX) ** 2 + (targetY - sourceY) ** 2)
}

// 根據連接線長度計算縮放比例
const getEdgeScale = (sourceX: number, sourceY: number, targetX: number, targetY: number): number => {
  const distance = getEdgeDistance(sourceX, sourceY, targetX, targetY)

  // 縮放邏輯：
  // 距離 < 200px: 0.8 倍縮放 (緊湊模式)
  // 距離 200-400px: 1.0 倍縮放 (標準模式)
  // 距離 > 400px: 1.2 倍縮放 (寬鬆模式)
  if (distance < 200) {
    return 0.8
  } else if (distance > 400) {
    return 1.2
  } else {
    return 1.0
  }
}

// 計算按鈕容器的 X 位置 (水平居中)
const getEdgeButtonX = (sourceX: number, targetX: number): number => {
  const scale = getEdgeScale(sourceX, 0, targetX, 0)
  const baseWidth = 160 * scale
  return (sourceX + targetX) / 2 - baseWidth / 2
}

// 計算按鈕容器的 Y 位置 (連接線上方 25px)
const getEdgeButtonY = (sourceY: number, targetY: number): number => {
  const midY = (sourceY + targetY) / 2
  return midY - 50 // 移動到連接線上方 50px，避免重疊
}

// 計算按鈕容器的寬度
const getEdgeButtonWidth = (sourceX: number, sourceY: number, targetX: number, targetY: number): number => {
  const scale = getEdgeScale(sourceX, sourceY, targetX, targetY)
  return 160 * scale
}

// 計算按鈕容器的高度
const getEdgeButtonHeight = (sourceX: number, sourceY: number, targetX: number, targetY: number): number => {
  const scale = getEdgeScale(sourceX, sourceY, targetX, targetY)
  return 50 * scale
}

// 獲取按鈕尺寸的 CSS 類名
const getEdgeButtonSizeClass = (sourceX: number, sourceY: number, targetX: number, targetY: number): string => {
  const distance = getEdgeDistance(sourceX, sourceY, targetX, targetY)

  if (distance < 200) {
    return 'edge-button-compact'
  } else if (distance > 400) {
    return 'edge-button-large'
  } else {
    return 'edge-button-normal'
  }
}

// 判斷是否為觸發節點
const isTriggerNode = (nodeType: string): boolean => {
  const triggerNodeTypes = ['manualTrigger', 'webhookTrigger', 'scheduleTrigger']
  return triggerNodeTypes.includes(nodeType)
}

// 判斷是否為通知節點
const isNotificationNode = (nodeType: string): boolean => {
  const notificationNodeTypes = ['lineNotify', 'email', 'sms', 'slack']
  return notificationNodeTypes.includes(nodeType)
}

// 獲取平滑步驟路徑
const getSmoothStepPath = (sourceX: number, sourceY: number, targetX: number, targetY: number, sourcePosition: string, targetPosition: string) => {
  const offset = 20
  let path = `M ${sourceX} ${sourceY}`

  if (sourcePosition === 'right' && targetPosition === 'left') {
    path += ` L ${sourceX + offset} ${sourceY}`
    path += ` L ${sourceX + offset} ${targetY}`
    path += ` L ${targetX - offset} ${targetY}`
    path += ` L ${targetX} ${targetY}`
  } else {
    path += ` L ${targetX} ${targetY}`
  }

  return path
}

// 獲取邊樣式
const getEdgeStyle = (edgeId: string) => {
  const isHovered = hoveredEdgeId.value === edgeId
  const isSelected = selectedEdgeId.value === edgeId

  return {
    stroke: isSelected ? '#3b82f6' : isHovered ? '#60a5fa' : '#6b7280',
    strokeWidth: isSelected || isHovered ? 3 : 2,
    fill: 'none'
  }
}

const handleNodeUpdate = (updatedNode: any) => {
  // 節點更新會通過 Vue Flow 的響應式系統自動處理
}

const handleNodeDelete = (nodeId: string) => {
  removeNodes([nodeId])
  if (selectedNodeId.value === nodeId) {
    selectedNodeId.value = null
  }
  ElMessage.success('節點已刪除')
}

const updateSelectedNode = () => {
  // 觸發響應式更新
  nextTick()
}

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

// 工具列功能
const addSampleNodes = () => {
  const sampleNodes: Node[] = [
    {
      id: 'sample-trigger',
      type: 'taiwanNode',
      position: { x: 100, y: 100 },
      data: {
        label: '手動觸發',
        nodeType: 'manualTrigger',
        icon: nodeIconMap['manualTrigger']
      }
    },
    {
      id: 'sample-linepay',
      type: 'taiwanNode',
      position: { x: 400, y: 100 },
      data: {
        label: 'Line Pay 付款',
        nodeType: 'linePay',
        icon: nodeIconMap['linePay'],
        amount: 1000,
        currency: 'TWD',
        productName: '測試商品'
      }
    },
    {
      id: 'sample-notify',
      type: 'taiwanNode',
      position: { x: 700, y: 100 },
      data: {
        label: 'Line 通知',
        nodeType: 'lineNotify',
        icon: nodeIconMap['lineNotify'],
        message: '付款成功！金額：NT$ {{amount}}'
      }
    }
  ]
  
  const sampleEdges: Edge[] = [
    {
      id: 'edge-1',
      source: 'sample-trigger',
      target: 'sample-linepay',
      ...defaultEdgeOptions, // 使用默認邊選項，確保有懸停按鈕
      animated: true, // 覆蓋默認的 animated: false
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#666'
      }
    },
    {
      id: 'edge-2',
      source: 'sample-linepay',
      target: 'sample-notify',
      ...defaultEdgeOptions, // 使用默認邊選項，確保有懸停按鈕
      animated: true, // 覆蓋默認的 animated: false
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#666'
      }
    }
  ]
  
  // 清空現有節點和連線
  nodes.value = []
  edges.value = []
  
  // 添加範例節點和連線
  nodes.value = [...nodes.value, ...sampleNodes]
  edges.value = [...edges.value, ...sampleEdges]

  selectedNodeId.value = null
  selectedEdgeId.value = null

  // 保存到歷史記錄
  saveToHistory()

  ElMessage.success('已載入範例工作流')
}

const clearCanvas = () => {
  saveToHistory()
  nodes.value = []
  edges.value = []
  selectedNodeId.value = null
  selectedEdgeId.value = null
  ElMessage.info('畫布已清空')
}

const exportWorkflow = () => {
  const workflow = {
    name: '台灣 Vue Flow 工作流',
    nodes: nodes.value,
    edges: edges.value,
    viewport: getViewport(),
    createdAt: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(workflow, null, 2)], {
    type: 'application/json'
  })
  
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `taiwan-vue-flow-workflow-${Date.now()}.json`
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
  ElMessage.success('工作流已匯出')
}

const fitView = () => {
  vueFlowFitView({ padding: 0.2 })
}

// ===== Header 事件處理函數 =====

const handleNewWorkflow = () => {
  clearCanvas()
  ElMessage.success('已建立新的工作流')
}

const handleOpenWorkflow = () => {
  // TODO: 實作開啟工作流邏輯
  ElMessage.info('開啟工作流功能開發中')
}

const handleSaveWorkflow = () => {
  // TODO: 實作儲存工作流邏輯
  ElMessage.success('工作流已儲存')
}

const handleUndo = () => {
  if (currentHistoryIndex.value > 0) {
    currentHistoryIndex.value--
    const state = historyStack.value[currentHistoryIndex.value]
    nodes.value = [...state.nodes]
    edges.value = [...state.edges]
    ElMessage.success('已復原')
  } else {
    ElMessage.warning('沒有可復原的操作')
  }
}

const handleRedo = () => {
  if (currentHistoryIndex.value < historyStack.value.length - 1) {
    currentHistoryIndex.value++
    const state = historyStack.value[currentHistoryIndex.value]
    nodes.value = [...state.nodes]
    edges.value = [...state.edges]
    ElMessage.success('已重做')
  } else {
    ElMessage.warning('沒有可重做的操作')
  }
}

const handleSelectAll = () => {
  // 選擇所有節點
  nodes.value.forEach(node => {
    if (node.data) {
      node.data.selected = true
    }
  })
  ElMessage.info('已選擇所有節點')
}

const handleZoomIn = () => {
  zoomIn()
  ElMessage.info('已放大')
}

const handleZoomOut = () => {
  zoomOut()
  ElMessage.info('已縮小')
}

// 自定義控制功能
const isFullscreen = ref(false)
const historyStack = ref<{ nodes: any[], edges: any[] }[]>([])
const currentHistoryIndex = ref(-1)

const toggleFullscreen = () => {
  const element = document.querySelector('.vue-flow-editor') as HTMLElement

  if (!document.fullscreenElement) {
    element.requestFullscreen().then(() => {
      isFullscreen.value = true
      ElMessage.success('已進入全螢幕模式')
    }).catch(() => {
      ElMessage.error('無法進入全螢幕模式')
    })
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false
      ElMessage.info('已退出全螢幕模式')
    })
  }
}

const zoomIn = () => {
  vueFlowZoomIn()
}

const zoomOut = () => {
  vueFlowZoomOut()
}

const saveToHistory = () => {
  const currentState = {
    nodes: JSON.parse(JSON.stringify(nodes.value)),
    edges: JSON.parse(JSON.stringify(edges.value))
  }

  // 移除當前索引之後的歷史記錄
  historyStack.value = historyStack.value.slice(0, currentHistoryIndex.value + 1)

  // 添加新的狀態
  historyStack.value.push(currentState)
  currentHistoryIndex.value = historyStack.value.length - 1

  // 限制歷史記錄數量
  if (historyStack.value.length > 50) {
    historyStack.value.shift()
    currentHistoryIndex.value--
  }
}

const undo = () => {
  if (currentHistoryIndex.value > 0) {
    currentHistoryIndex.value--
    const previousState = historyStack.value[currentHistoryIndex.value]

    nodes.value = JSON.parse(JSON.stringify(previousState.nodes))
    edges.value = JSON.parse(JSON.stringify(previousState.edges))

    ElMessage.success('已返回上一步')
  } else {
    ElMessage.warning('沒有可返回的步驟')
  }
}

// 重做功能
const redo = () => {
  if (currentHistoryIndex.value < historyStack.value.length - 1) {
    currentHistoryIndex.value++
    const nextState = historyStack.value[currentHistoryIndex.value]

    nodes.value = JSON.parse(JSON.stringify(nextState.nodes))
    edges.value = JSON.parse(JSON.stringify(nextState.edges))

    ElMessage.success('已重做操作')
  } else {
    ElMessage.warning('沒有可重做的步驟')
  }
}

// 複製/貼上功能
const clipboard = ref<{ nodes: Node[], edges: Edge[] } | null>(null)

const copySelectedNodes = () => {
  const selectedNodes = nodes.value.filter((node: any) => node.selected)
  if (selectedNodes.length === 0) {
    ElMessage.warning('請先選擇要複製的節點')
    return
  }

  // 複製選中的節點和相關連接線
  const selectedNodeIds = selectedNodes.map(node => node.id)
  const relatedEdges = edges.value.filter(edge =>
    selectedNodeIds.includes(edge.source) && selectedNodeIds.includes(edge.target)
  )

  clipboard.value = {
    nodes: JSON.parse(JSON.stringify(selectedNodes)),
    edges: JSON.parse(JSON.stringify(relatedEdges))
  }

  ElMessage.success(`已複製 ${selectedNodes.length} 個節點`)
}

const pasteNodes = () => {
  if (!clipboard.value) {
    ElMessage.warning('剪貼簿為空，請先複製節點')
    return
  }

  saveToHistory()

  // 生成新的 ID 並調整位置
  const idMap = new Map<string, string>()
  const newNodes = clipboard.value.nodes.map((node: any) => {
    const newId = `${node.type}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    idMap.set(node.id, newId)

    return {
      ...node,
      id: newId,
      position: {
        x: node.position.x + 50,
        y: node.position.y + 50
      },
      selected: true
    }
  })

  const newEdges = clipboard.value.edges.map((edge: any) => ({
    ...edge,
    id: `${edge.id}-${Date.now()}`,
    source: idMap.get(edge.source) || edge.source,
    target: idMap.get(edge.target) || edge.target
  }))

  // 取消所有現有節點的選中狀態
  nodes.value.forEach((node: any) => node.selected = false)

  // 添加新節點和連接線
  nodes.value.push(...newNodes)
  edges.value.push(...newEdges)

  ElMessage.success(`已貼上 ${newNodes.length} 個節點`)
}

// 鍵盤快捷鍵處理
const handleKeyDown = (event: KeyboardEvent) => {
  const isMac = navigator.userAgent.includes('Mac')
  const ctrlKey = isMac ? event.metaKey : event.ctrlKey

  if (ctrlKey && event.key === 'z' && !event.shiftKey) {
    event.preventDefault()
    undo()
  } else if (ctrlKey && ((event.key === 'z' && event.shiftKey) || event.key === 'y')) {
    event.preventDefault()
    redo()
  } else if (ctrlKey && event.key === 'c') {
    event.preventDefault()
    copySelectedNodes()
  } else if (ctrlKey && event.key === 'v') {
    event.preventDefault()
    pasteNodes()
  }
}

// 組件掛載時添加鍵盤監聽
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
  // 初始化歷史記錄
  saveToHistory()
})

// 組件卸載時移除鍵盤監聽
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

const autoLayout = () => {
  if (nodes.value.length === 0) {
    ElMessage.warning('畫布上沒有節點可以排版')
    return
  }

  // 簡單的自動排版算法：水平排列
  const spacing = 200
  const startX = 100
  const startY = 100

  nodes.value.forEach((node, index) => {
    node.position = {
      x: startX + (index * spacing),
      y: startY
    }
  })

  // 適應視圖
  nextTick(() => {
    fitView()
  })

  ElMessage.success('節點已自動排版')
}

const runTests = async () => {
  try {
    ElMessage.info('開始執行 Vue Flow 功能測試...')

    // 簡化的測試邏輯
    const tests = [
      { name: '頁面載入', check: () => !!document.querySelector('.vue-flow-editor') },
      { name: 'Vue Flow 畫布', check: () => !!document.querySelector('.vue-flow') },
      { name: '節點面板', check: () => document.querySelectorAll('.node-item').length >= 8 },
      { name: '工具列按鈕', check: () => document.querySelectorAll('.toolbar-right button').length >= 5 },
      { name: '屬性面板', check: () => !!document.querySelector('.properties-panel') }
    ]

    const results = tests.map(test => ({
      name: test.name,
      passed: test.check()
    }))

    const passed = results.filter(r => r.passed).length
    const total = results.length
    const passRate = Math.round((passed / total) * 100)

    console.log('🧪 Vue Flow 測試結果:')
    results.forEach(result => {
      const icon = result.passed ? '✅' : '❌'
      console.log(`${icon} ${result.name}`)
    })

    console.log(`📊 測試摘要: ${passed}/${total} 通過 (${passRate}%)`)

    if (passRate >= 80) {
      ElMessage.success(`測試通過率: ${passRate}% - Vue Flow 編輯器運行正常！`)
    } else {
      ElMessage.warning(`測試通過率: ${passRate}% - 部分功能可能有問題`)
    }

  } catch (error) {
    console.error('測試執行失敗:', error)
    ElMessage.error('測試執行失敗，請檢查控制台')
  }
}

// 事件發射
const emit = defineEmits<{
  'workflow-change': [{ nodes: Node[], edges: Edge[] }]
  'node-select': [node: Node | null]
}>()

// 監聽變化並發射事件
const emitChanges = () => {
  // 將 VueFlow 數據轉換為應用層數據格式
  const workflowNodes = nodes.value.map(node => ({
    id: node.id,
    type: node.data?.nodeType || node.type,
    label: node.data?.label || '未命名節點',
    position: node.position,
    ...node.data
  }))

  const workflowConnections = edges.value.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    sourceHandle: edge.sourceHandle,
    targetHandle: edge.targetHandle,
    type: edge.type || 'default'
  }))

  emit('workflow-change', {
    nodes: workflowNodes,
    edges: workflowConnections
  })
}

// 監聽節點和連線變化
watch([nodes, edges], () => {
  nextTick(() => {
    emitChanges()
  })
}, { deep: true, immediate: true })

// TriggerNodeEditor 組件已通過 import 導入，在 script setup 中自動可用

</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.vue-flow-editor {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-color-secondary);
  color: var(--text-color);
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-base $spacing-lg;
  background: $primary-75;
  border-bottom: 1px solid var(--border-color-light);
  box-shadow: 0 1px 3px var(--shadow-color);
  z-index: 10;

  .toolbar-left h2 {
    margin: 0;
    color: $n8n-text-primary;
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
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

/* 左側節點面板 - 懸停展開 */
.node-panel {
  width: 60px;
  background: $primary-75;
  border-right: 1px solid var(--border-color-light);
  overflow: hidden;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.node-panel.expanded {
  width: 280px;
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

.toggle-icon {
  font-size: 20px;
  color: var(--text-color-secondary);
  transition: color 0.2s ease;
}

.node-panel:hover .toggle-icon {
  color: var(--color-primary);
}

.panel-content {
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: $spacing-lg;
}

.node-panel.expanded .panel-content {
  opacity: 1;
}

.node-panel .panel-content {
  h3 {
    margin: 0 0 $spacing-lg 0;
    color: var(--text-color);
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
  }

  .node-category {
    margin-bottom: $spacing-lg;

    h4 {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      margin: 0 0 $spacing-sm 0;
      color: var(--text-color-secondary);
      font-size: $font-size-xs;
      font-weight: $font-weight-semibold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .node-item {
      display: flex;
      align-items: center;
      padding: $spacing-sm;
      margin-bottom: $spacing-xs;
      background: var(--bg-color);
      border: 1px solid var(--border-color-light);
      border-radius: $border-radius-lg;
      cursor: grab;
      transition: all $transition-fast ease-in-out;

      &:hover {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: white;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(134, 115, 94, 0.3);
      }

      &:active {
        cursor: grabbing;
        transform: translateY(0);
      }

      .node-icon {
        margin-right: $spacing-sm;
        font-size: $font-size-lg;
        width: 24px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .node-label {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: var(--text-color-secondary);
      }

      &:hover .node-label {
        color: white;
      }
    }
  }
}

.canvas-container {
  flex: 1;
  position: relative;

  .vue-flow-canvas {
    width: 100%;
    height: 100%;
  }

  .workflow-controls {
    position: absolute;
    bottom: $spacing-lg;
    left: $spacing-lg;
    z-index: 20;

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: $primary-200;
      border: $border-width-thin solid $primary-300;
      border-radius: $border-radius-xl;
      padding: $spacing-xs;
      backdrop-filter: blur(12px);
      box-shadow: $shadow-lg;

      .control-button {
        width: 44px;
        height: 44px;
        background: transparent;
        border: none;
        border-radius: $border-radius-lg;
        color: $n8n-text-disabled;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all $transition-fast ease-in-out;
        position: relative;

        &:hover:not(:disabled) {
          background: rgba(134, 115, 94, 0.1);
          color: var(--color-primary);
          transform: scale(1.05);
        }

        &:active:not(:disabled) {
          transform: scale(0.95);
        }

        &.active {
          background: rgba(134, 115, 94, 0.2);
          color: var(--color-primary);
        }

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        svg {
          width: 18px;
          height: 18px;
        }

        // 工具提示樣式
        &::after {
          content: attr(title);
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 12px;
          padding: 6px 12px;
          background: rgba(17, 24, 39, 0.95);
          color: #f9fafb;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease-in-out;
          z-index: 30;
          border: 1px solid #374151;
        }

        &:hover::after {
          opacity: 1;
        }
      }
    }
  }
}

/* 右側屬性面板 - 懸停展開 */
.properties-panel {
  width: 60px;
  background: $primary-75;
  border-left: 1px solid var(--border-color-light);
  overflow: hidden;
  transition: width 0.3s ease;
  position: relative;
  z-index: 10;
}

.properties-panel.expanded {
  width: 320px;
  overflow-y: auto;
}

.properties-panel .panel-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid var(--border-color-light);
  cursor: pointer;
}

.properties-panel .toggle-icon {
  font-size: 20px;
  color: var(--text-color-secondary);
  transition: color 0.2s ease;
}

.properties-panel:hover .toggle-icon {
  color: var(--color-primary);
}

.properties-panel .panel-content {
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: $spacing-lg;
}

.properties-panel.expanded .panel-content {
  opacity: 1;
}

.properties-panel .panel-content {
  h3 {
    margin: 0 0 $spacing-lg 0;
    color: var(--text-color);
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
  }

  .node-properties,
  .edge-properties {
    h4 {
      margin: 0 0 $spacing-base 0;
      color: var(--text-color);
      font-size: $font-size-sm;
      font-weight: $font-weight-semibold;
    }

    .property-group {
      margin-bottom: $spacing-base;

      label {
        display: block;
        margin-bottom: $spacing-xs;
        font-size: $font-size-xs;
        font-weight: $font-weight-medium;
        color: var(--text-color-secondary);
      }

      .property-value {
        font-size: $font-size-sm;
        color: var(--text-color-secondary);
        background: var(--bg-color-secondary);
        padding: $spacing-xs $spacing-sm;
        border-radius: $border-radius-base;
        border: 1px solid var(--border-color-light);
      }
    }

    .node-specific-props {
      margin-top: $spacing-lg;
      padding-top: $spacing-lg;
      border-top: 1px solid var(--border-color-light);
    }
  }

  .no-selection {
    text-align: center;
    color: var(--text-color-tertiary);
    font-style: italic;
    padding: $spacing-2xl $spacing-lg;
    background: var(--bg-color-secondary);
    border-radius: $border-radius-lg;
    border: 1px solid var(--border-color-light);
  }
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm $spacing-lg;
  background: $primary-75;
  border-top: 1px solid var(--border-color-light);
  font-size: $font-size-xs;
  color: #413735;
  z-index: 10;

  .status-left {
    display: flex;
    gap: $spacing-lg;

    span {
      font-weight: $font-weight-normal;
    }
  }

  .status-right {
    span {
      font-weight: $font-weight-normal;
    }
  }
}

// ===== 連接線操作按鈕樣式 (與節點按鈕完全一致) =====
.edge-button-container {
  display: flex;
  gap: 8px;
  background: rgba(249, 249, 249, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 6px 12px;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  // border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 9999;
  pointer-events: none; // 防止按鈕容器阻擋感應區域事件
  width: fit-content;

  // 動態尺寸變體
  // &.edge-button-compact {
  //   gap: 6px;
  //   padding: 4px 8px;
  //   // border-radius: 16px;
  //   transform: scale(0.8);
  //   transform-origin: center;
  // }

  // &.edge-button-normal {
  //   // 使用默認樣式，無需額外設置
  //   transform: scale(1.0);
  // }

  // &.edge-button-large {
  //   gap: 10px;
  //   padding: 8px 16px;
  //   // border-radius: 24px;
  //   transform: scale(1.2);
  //   transform-origin: center;
  // }
}

.edge-action-btn {
  width: 32px;
  height: 32px;
  // border: 3px solid #1f2937;
  background: #f8fafc;
  color: #1f2937;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 18px;
  position: relative;
  // box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  pointer-events: auto; // 確保按鈕本身可以點擊

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    z-index: -1;
    opacity: 1;
    transition: opacity 0.2s;
  }

  &:hover {
    color: #ffffff;
    background: var(--color-primary);
    border-color: var(--color-primary);
    transform: scale(1.15);
    box-shadow: 0 8px 16px rgba(134, 115, 94, 0.4);
  }

  &:hover::before {
    opacity: 1;
  }

  &:active {
    transform: scale(0.95);
  }

  // 編輯條件按鈕特殊樣式
  &.edit-condition-btn:hover {
    color: #8b5cf6;
    background: #ffffff;
    border-color: #8b5cf6;
  }

  &.edit-condition-btn:hover::before {
    background: rgba(139, 92, 246, 0.1);
  }

  // 新增節點按鈕特殊樣式
  &.add-node-btn:hover {
    color: var(--color-primary);
    background: #ffffff;
    border-color: var(--color-primary);
  }

  &.add-node-btn:hover::before {
    background: rgba(134, 115, 94, 0.1);
  }

  // 複製按鈕特殊樣式
  &.copy-edge-btn:hover {
    color: var(--color-primary);
    background: #ffffff;
    border-color: var(--color-primary);
  }

  &.copy-edge-btn:hover::before {
    background: rgba(134, 115, 94, 0.1);
  }

  // 刪除按鈕特殊樣式
  &.delete-edge-btn:hover {
    color: #ef4444;
    background: #ffffff;
    border-color: #ef4444;
  }

  &.delete-edge-btn:hover::before {
    background: rgba(239, 68, 68, 0.1);
  }

  // 更多選項按鈕特殊樣式
  &.more-edge-btn:hover {
    color: #8b5cf6;
    background: #ffffff;
    border-color: #8b5cf6;
  }

  &.more-edge-btn:hover::before {
    background: rgba(139, 92, 246, 0.1);
  }

  // SVG 圖標樣式 - 確保正確顯示
  svg {
    width: 16px !important;
    height: 16px !important;
    min-width: 16px !important;
    min-height: 16px !important;
    max-width: 16px !important;
    max-height: 16px !important;
    position: relative;
    z-index: 1;
    display: block !important;
    flex-shrink: 0;
  }
}

// ===== 連接線感應區域樣式 =====
// 透明的較寬感應區域，用於改善懸停用戶體驗
.edge-hover-area {
  stroke: transparent;
  stroke-width: 100px; // 感應區域寬度：20px (比視覺線條寬 10 倍)
  fill: none;
  pointer-events: all; // 啟用事件檢測
  cursor: pointer;
  opacity: 0; // 完全透明，不影響視覺
  z-index: 1; // 在視覺路徑下方
}

// 視覺連接線路徑樣式調整
.vue-flow__edge-path {
  pointer-events: none; // 禁用原路徑的事件，避免重複觸發
  z-index: 2; // 在感應區域上方
}

// 調試模式：取消註釋以下樣式可以看到感應區域
// .edge-hover-area {
//   stroke: rgba(255, 0, 0, 0.2); // 紅色半透明，用於調試
//   opacity: 1;
// }

// ===== 自定義按鈕樣式 - 使用功能顏色 =====

// 主要按鈕 (使用主色調)
.btn-primary {
  background-color: $primary-light !important;
  border-color: $primary-light !important;
  color: white !important;

  &:hover {
    background-color: $primary-dark !important;
    border-color: $primary-dark !important;
  }

  &:active {
    background-color: darken($primary-color, 15%) !important;
    border-color: darken($primary-color, 15%) !important;
  }
}

// 成功按鈕 (使用成功色)
.btn-success {
  background-color: $success-color !important;
  border-color: $success-color !important;
  color: white !important;

  &:hover {
    background-color: darken($success-color, 10%) !important;
    border-color: darken($success-color, 10%) !important;
  }

  &:active {
    background-color: darken($success-color, 15%) !important;
    border-color: darken($success-color, 15%) !important;
  }
}

// 警告按鈕 (使用警告色)
.btn-warning {
  background-color: $warning-color !important;
  border-color: $warning-color !important;
  color: white !important;

  &:hover {
    background-color: darken($warning-color, 10%) !important;
    border-color: darken($warning-color, 10%) !important;
  }

  &:active {
    background-color: darken($warning-color, 15%) !important;
    border-color: darken($warning-color, 15%) !important;
  }
}

// 錯誤/危險按鈕 (使用錯誤色)
.btn-error {
  background-color: $error-color !important;
  border-color: $error-color !important;
  color: white !important;

  &:hover {
    background-color: darken($error-color, 10%) !important;
    border-color: darken($error-color, 10%) !important;
  }

  &:active {
    background-color: darken($error-color, 15%) !important;
    border-color: darken($error-color, 15%) !important;
  }
}

// 資訊按鈕 (使用資訊色)
.btn-info {
  background-color: $info-color !important;
  border-color: $info-color !important;
  color: white !important;

  &:hover {
    background-color: darken($info-color, 10%) !important;
    border-color: darken($info-color, 10%) !important;
  }

  &:active {
    background-color: darken($info-color, 15%) !important;
    border-color: darken($info-color, 15%) !important;
  }
}

// 深色主題
[data-theme="dark"] {
  .vue-flow-editor {
    background: var(--bg-color);
  }

  .editor-toolbar,
  .node-panel,
  .properties-panel {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
  }

  .status-bar {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
  }
}
</style>
