<template>
  <div class="node-palette">
    <div class="palette-header">
      <h3>節點庫</h3>
      <el-input
        v-model="searchQuery"
        placeholder="搜尋節點..."
        :prefix-icon="Search"
        size="small"
        clearable
      />
    </div>
    
    <div class="palette-content">
      <!-- 觸發節點 -->
      <div class="node-category">
        <div class="category-header" @click="toggleCategory('trigger')">
          <el-icon>
            <ArrowRight v-if="!expandedCategories.trigger" />
            <ArrowDown v-else />
          </el-icon>
          <span>觸發節點</span>
        </div>
        
        <div v-show="expandedCategories.trigger" class="node-list">
          <div 
            v-for="node in filteredTriggerNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
            @click="addNodeToCenter(node.type)"
          >
            <div class="node-icon">
              <el-icon :color="node.color">
                <component :is="node.icon" />
              </el-icon>
            </div>
            <div class="node-info">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-description">{{ node.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 台灣金流節點 -->
      <div class="node-category">
        <div class="category-header" @click="toggleCategory('payment')">
          <el-icon>
            <ArrowRight v-if="!expandedCategories.payment" />
            <ArrowDown v-else />
          </el-icon>
          <span>台灣金流</span>
        </div>
        
        <div v-show="expandedCategories.payment" class="node-list">
          <div 
            v-for="node in filteredPaymentNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
            @click="addNodeToCenter(node.type)"
          >
            <div class="node-icon">
              <img :src="node.iconUrl" :alt="node.label" />
            </div>
            <div class="node-info">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-description">{{ node.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 台灣服務節點 -->
      <div class="node-category">
        <div class="category-header" @click="toggleCategory('taiwanService')">
          <el-icon>
            <ArrowRight v-if="!expandedCategories.taiwanService" />
            <ArrowDown v-else />
          </el-icon>
          <span>台灣服務</span>
        </div>
        
        <div v-show="expandedCategories.taiwanService" class="node-list">
          <div 
            v-for="node in filteredTaiwanServiceNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
            @click="addNodeToCenter(node.type)"
          >
            <div class="node-icon">
              <el-icon :color="node.color">
                <component :is="node.icon" />
              </el-icon>
            </div>
            <div class="node-info">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-description">{{ node.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 通用節點 -->
      <div class="node-category">
        <div class="category-header" @click="toggleCategory('general')">
          <el-icon>
            <ArrowRight v-if="!expandedCategories.general" />
            <ArrowDown v-else />
          </el-icon>
          <span>通用節點</span>
        </div>
        
        <div v-show="expandedCategories.general" class="node-list">
          <div 
            v-for="node in filteredGeneralNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
            @click="addNodeToCenter(node.type)"
          >
            <div class="node-icon">
              <el-icon :color="node.color">
                <component :is="node.icon" />
              </el-icon>
            </div>
            <div class="node-info">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-description">{{ node.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 通知節點 -->
      <div class="node-category">
        <div class="category-header" @click="toggleCategory('notification')">
          <el-icon>
            <ArrowRight v-if="!expandedCategories.notification" />
            <ArrowDown v-else />
          </el-icon>
          <span>通知節點</span>
        </div>
        
        <div v-show="expandedCategories.notification" class="node-list">
          <div 
            v-for="node in filteredNotificationNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
            @click="addNodeToCenter(node.type)"
          >
            <div class="node-icon">
              <el-icon :color="node.color">
                <component :is="node.icon" />
              </el-icon>
            </div>
            <div class="node-info">
              <div class="node-label">{{ node.label }}</div>
              <div class="node-description">{{ node.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Search,
  ArrowRight, 
  ArrowDown,
  VideoPlay,
  Link,
  Timer,
  Connection,
  Setting,
  Operation,
  Refresh,
  ChatDotRound,
  Message,
  Position
} from '@element-plus/icons-vue'
import type { TaiwanNodeType, PaletteNode } from '@/types/workflow'

// Emits
const emit = defineEmits<{
  addNode: [type: TaiwanNodeType, position: { x: number; y: number }]
}>()

// 本地狀態
const searchQuery = ref('')
const expandedCategories = ref({
  trigger: true,
  payment: true,
  taiwanService: true,
  general: false,
  notification: false
})

// 節點定義
const triggerNodes: PaletteNode[] = [
  {
    type: 'manualTrigger' as TaiwanNodeType,
    label: '手動觸發',
    description: '手動啟動工作流',
    icon: VideoPlay,
    color: '#10b981',
    category: 'trigger' as any,
    defaultData: { label: '手動觸發' }
  },
  {
    type: 'webhookTrigger' as TaiwanNodeType,
    label: 'Webhook 觸發',
    description: '透過 HTTP 請求觸發',
    icon: Link,
    color: '#3b82f6',
    category: 'trigger' as any,
    defaultData: { label: 'Webhook 觸發' }
  },
  {
    type: 'scheduleTrigger' as TaiwanNodeType,
    label: '定時觸發',
    description: '按照時間排程執行',
    icon: Timer,
    color: '#f59e0b',
    category: 'trigger' as any,
    defaultData: { label: '定時觸發' }
  }
]

const paymentNodes: PaletteNode[] = [
  {
    type: 'linePay' as TaiwanNodeType,
    label: 'Line Pay',
    description: 'Line Pay 行動支付',
    iconUrl: '/icons/line-pay.svg',
    color: '#06d6a0',
    category: 'payment' as any,
    defaultData: { 
      label: 'Line Pay',
      currency: 'TWD'
    }
  },
  {
    type: 'ecPay' as TaiwanNodeType,
    label: '綠界科技',
    description: '綠界 ECPay 金流服務',
    iconUrl: '/icons/ecpay.svg',
    color: '#f59e0b',
    category: 'payment' as any,
    defaultData: { 
      label: '綠界科技',
      paymentType: 'aio'
    }
  }
]

const taiwanServiceNodes: PaletteNode[] = [
  {
    type: 'taoyuanAirport' as TaiwanNodeType,
    label: '桃機航班',
    description: '桃園機場航班資訊',
    icon: Position,
    color: '#8b5cf6',
    category: 'taiwanService' as any,
    defaultData: { label: '桃機航班' }
  },
  {
    type: 'govOpenData' as TaiwanNodeType,
    label: '政府開放資料',
    description: '政府資料開放平台',
    icon: Connection,
    color: '#ef4444',
    category: 'taiwanService' as any,
    defaultData: { label: '政府開放資料' }
  }
]

const generalNodes: PaletteNode[] = [
  {
    type: 'httpRequest' as TaiwanNodeType,
    label: 'HTTP 請求',
    description: '發送 HTTP 請求',
    icon: Link,
    color: '#6b7280',
    category: 'general' as any,
    defaultData: { label: 'HTTP 請求' }
  },
  {
    type: 'setData' as TaiwanNodeType,
    label: '設定資料',
    description: '設定或轉換資料',
    icon: Setting,
    color: '#6b7280',
    category: 'general' as any,
    defaultData: { label: '設定資料' }
  },
  {
    type: 'condition' as TaiwanNodeType,
    label: '條件判斷',
    description: '根據條件分支執行',
    icon: Operation,
    color: '#6b7280',
    category: 'general' as any,
    defaultData: { label: '條件判斷' }
  },
  {
    type: 'loop' as TaiwanNodeType,
    label: '迴圈',
    description: '重複執行操作',
    icon: Refresh,
    color: '#6b7280',
    category: 'general' as any,
    defaultData: { label: '迴圈' }
  }
]

const notificationNodes: PaletteNode[] = [
  {
    type: 'lineNotify' as TaiwanNodeType,
    label: 'Line 通知',
    description: '發送 Line 通知訊息',
    icon: ChatDotRound,
    color: '#06d6a0',
    category: 'notification' as any,
    defaultData: { label: 'Line 通知' }
  },
  {
    type: 'email' as TaiwanNodeType,
    label: '電子郵件',
    description: '發送電子郵件',
    icon: Message,
    color: '#3b82f6',
    category: 'notification' as any,
    defaultData: { label: '電子郵件' }
  },
  {
    type: 'slack' as TaiwanNodeType,
    label: 'Slack',
    description: '發送 Slack 訊息',
    icon: ChatDotRound,
    color: '#4a154b',
    category: 'notification' as any,
    defaultData: { label: 'Slack' }
  }
]

// 計算屬性：過濾節點
const filteredTriggerNodes = computed(() => 
  filterNodes(triggerNodes, searchQuery.value)
)

const filteredPaymentNodes = computed(() => 
  filterNodes(paymentNodes, searchQuery.value)
)

const filteredTaiwanServiceNodes = computed(() => 
  filterNodes(taiwanServiceNodes, searchQuery.value)
)

const filteredGeneralNodes = computed(() => 
  filterNodes(generalNodes, searchQuery.value)
)

const filteredNotificationNodes = computed(() => 
  filterNodes(notificationNodes, searchQuery.value)
)

// 方法：過濾節點
function filterNodes(nodes: PaletteNode[], query: string): PaletteNode[] {
  if (!query.trim()) return nodes
  
  const lowerQuery = query.toLowerCase()
  return nodes.filter(node => 
    node.label.toLowerCase().includes(lowerQuery) ||
    node.description.toLowerCase().includes(lowerQuery)
  )
}

// 方法：切換分類展開狀態
function toggleCategory(category: keyof typeof expandedCategories.value) {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

// 方法：拖拉開始
function onDragStart(event: DragEvent, node: PaletteNode) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', JSON.stringify({
      type: node.type,
      label: node.label,
      defaultData: node.defaultData
    }))
    event.dataTransfer.effectAllowed = 'move'
  }
}

// 方法：新增節點到中心位置
function addNodeToCenter(nodeType: TaiwanNodeType) {
  // 在畫布中心新增節點
  const centerPosition = { x: 400, y: 300 }
  emit('addNode', nodeType, centerPosition)
}
</script>

<style scoped>
.node-palette {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-color);
}

.palette-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color-light);
}

.palette-header h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.palette-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.node-category {
  margin-bottom: 8px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 500;
  color: var(--text-color);
  transition: background-color 0.2s;
}

.category-header:hover {
  background: var(--bg-color-tertiary);
}

.node-list {
  padding: 0 8px;
}

.palette-node {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 4px 0;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.palette-node:hover {
  background: var(--bg-color-secondary);
  border-color: var(--border-color);
  transform: translateX(4px);
}

.palette-node:active {
  cursor: grabbing;
  transform: scale(0.98);
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: var(--bg-color-tertiary);
  flex-shrink: 0;
}

.node-icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.node-info {
  flex: 1;
  min-width: 0;
}

.node-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 2px;
}

.node-description {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}

/* 拖拉時的樣式 */
.palette-node.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

/* 滾動條樣式 */
.palette-content::-webkit-scrollbar {
  width: 6px;
}

.palette-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.palette-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.palette-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
