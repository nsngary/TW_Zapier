# Vue Flow 拖拉式編輯器技術研究報告

## 📋 研究目標

研究並選擇適合的拖拉式編輯器套件，建立基礎的節點拖拉和連線功能原型，驗證技術可行性。

## 🔍 技術選型分析

### Vue Flow vs 其他方案

| 方案 | 優勢 | 劣勢 | 適用性 |
|------|------|------|--------|
| **Vue Flow** | Vue 3 原生支援、豐富功能、活躍社群 | 學習曲線中等 | ✅ 最適合 |
| **D3.js** | 高度客製化、效能優異 | 開發複雜度高、學習曲線陡峭 | ❌ 過於複雜 |
| **Konva.js** | 2D Canvas 效能好 | 缺乏現成的流程圖組件 | ❌ 需要大量開發 |
| **mxGraph** | 功能完整、企業級 | 商業授權、Vue 整合複雜 | ❌ 授權問題 |

### Vue Flow 核心特性

#### 1. 基礎功能
- ✅ 拖拉節點 (Draggable Nodes)
- ✅ 連線功能 (Connections)
- ✅ 縮放平移 (Zoom & Pan)
- ✅ 多選功能 (Multi-Selection)
- ✅ 鍵盤快捷鍵 (Keyboard Shortcuts)

#### 2. 自定義能力
- ✅ 自定義節點 (Custom Nodes)
- ✅ 自定義邊線 (Custom Edges)
- ✅ 自定義控制項 (Custom Controls)
- ✅ 主題客製化 (Theming)

#### 3. 進階功能
- ✅ 小地圖 (Minimap)
- ✅ 背景網格 (Background Grid)
- ✅ 節點工具列 (Node Toolbar)
- ✅ 節點調整大小 (Node Resizer)
- ✅ 動畫效果 (Animations)

## 🏗️ 台灣工作流編輯器架構設計

### 組件架構

```
WorkflowEditor/
├── components/
│   ├── FlowEditor.vue          # 主編輯器組件
│   ├── NodePalette.vue         # 節點面板
│   ├── PropertyPanel.vue       # 屬性面板
│   ├── Toolbar.vue             # 工具列
│   └── nodes/                  # 自定義節點
│       ├── TriggerNode.vue     # 觸發節點
│       ├── LinePayNode.vue     # Line Pay 節點
│       ├── ECPayNode.vue       # 綠界節點
│       ├── AirportNode.vue     # 桃機航班節點
│       └── ActionNode.vue      # 動作節點
├── composables/
│   ├── useWorkflow.ts          # 工作流狀態管理
│   ├── useNodeTypes.ts         # 節點類型管理
│   └── useFlowValidation.ts    # 流程驗證
└── types/
    ├── workflow.ts             # 工作流類型定義
    └── nodes.ts                # 節點類型定義
```

### 資料結構設計

#### 工作流資料模型
```typescript
interface TaiwanWorkflow {
  id: string
  name: string
  description?: string
  version: string
  nodes: TaiwanNode[]
  edges: TaiwanEdge[]
  viewport: Viewport
  settings: WorkflowSettings
  metadata: WorkflowMetadata
}

interface TaiwanNode {
  id: string
  type: TaiwanNodeType
  position: { x: number; y: number }
  data: NodeData
  style?: NodeStyle
  draggable?: boolean
  selectable?: boolean
  deletable?: boolean
}

interface TaiwanEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  type?: EdgeType
  animated?: boolean
  style?: EdgeStyle
  data?: EdgeData
}
```

#### 台灣節點類型
```typescript
enum TaiwanNodeType {
  // 觸發節點
  MANUAL_TRIGGER = 'manualTrigger',
  WEBHOOK_TRIGGER = 'webhookTrigger',
  SCHEDULE_TRIGGER = 'scheduleTrigger',
  
  // 台灣金流節點
  LINE_PAY = 'linePay',
  ECPAY = 'ecPay',
  
  // 台灣服務節點
  TAOYUAN_AIRPORT = 'taoyuanAirport',
  GOV_OPENDATA = 'govOpenData',
  
  // 通用節點
  HTTP_REQUEST = 'httpRequest',
  SET_DATA = 'setData',
  CONDITION = 'condition',
  LOOP = 'loop',
  
  // 通知節點
  LINE_NOTIFY = 'lineNotify',
  EMAIL = 'email',
  SLACK = 'slack'
}
```

## 🎨 UI/UX 設計原則

### 1. 中文化友善
- 所有節點名稱使用繁體中文
- 屬性面板支援中文輸入
- 錯誤訊息本地化

### 2. 台灣使用者習慣
- 從左到右的流程方向
- 符合台灣使用者的色彩偏好
- 支援常用的台灣服務圖示

### 3. 響應式設計
- 支援桌面和平板裝置
- 可調整的面板大小
- 適應不同螢幕解析度

## 🔧 技術實作細節

### 1. Vue Flow 整合

#### 基礎設定
```typescript
// composables/useWorkflow.ts
import { ref, computed } from 'vue'
import { useVueFlow } from '@vue-flow/core'

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
    getEdges
  } = useVueFlow()

  const selectedNode = ref(null)
  const isValidFlow = computed(() => validateWorkflow())

  function validateWorkflow() {
    // 驗證工作流邏輯
    return true
  }

  return {
    nodes,
    edges,
    selectedNode,
    isValidFlow,
    addNodes,
    addEdges,
    removeNodes,
    removeEdges,
    updateNode,
    updateEdge
  }
}
```

#### 自定義節點開發
```vue
<!-- components/nodes/LinePayNode.vue -->
<template>
  <div class="taiwan-node line-pay-node">
    <div class="node-header">
      <img src="/icons/line-pay.svg" alt="Line Pay" class="node-icon">
      <span class="node-title">Line Pay 付款</span>
    </div>
    
    <div class="node-content">
      <div class="node-field">
        <label>付款金額</label>
        <span>{{ data.amount || '未設定' }}</span>
      </div>
      <div class="node-field">
        <label>商品名稱</label>
        <span>{{ data.productName || '未設定' }}</span>
      </div>
    </div>

    <!-- 輸入控制點 -->
    <Handle 
      type="target" 
      :position="Position.Left" 
      class="taiwan-handle"
    />
    
    <!-- 輸出控制點 -->
    <Handle 
      type="source" 
      :position="Position.Right" 
      class="taiwan-handle"
    />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import type { NodeProps } from '@vue-flow/core'

interface LinePayNodeData {
  amount?: number
  productName?: string
  orderId?: string
  confirmUrl?: string
  cancelUrl?: string
}

const props = defineProps<NodeProps<LinePayNodeData>>()
</script>
```

### 2. 節點面板實作

```vue
<!-- components/NodePalette.vue -->
<template>
  <div class="node-palette">
    <div class="palette-header">
      <h3>節點庫</h3>
    </div>
    
    <div class="palette-content">
      <div class="node-category">
        <h4>觸發節點</h4>
        <div class="node-list">
          <div 
            v-for="node in triggerNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
          >
            <img :src="node.icon" :alt="node.label">
            <span>{{ node.label }}</span>
          </div>
        </div>
      </div>

      <div class="node-category">
        <h4>台灣金流</h4>
        <div class="node-list">
          <div 
            v-for="node in paymentNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
          >
            <img :src="node.icon" :alt="node.label">
            <span>{{ node.label }}</span>
          </div>
        </div>
      </div>

      <div class="node-category">
        <h4>台灣服務</h4>
        <div class="node-list">
          <div 
            v-for="node in taiwanServiceNodes" 
            :key="node.type"
            class="palette-node"
            draggable="true"
            @dragstart="onDragStart($event, node)"
          >
            <img :src="node.icon" :alt="node.label">
            <span>{{ node.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const triggerNodes = ref([
  { type: 'manualTrigger', label: '手動觸發', icon: '/icons/manual.svg' },
  { type: 'webhookTrigger', label: 'Webhook', icon: '/icons/webhook.svg' },
  { type: 'scheduleTrigger', label: '定時觸發', icon: '/icons/schedule.svg' }
])

const paymentNodes = ref([
  { type: 'linePay', label: 'Line Pay', icon: '/icons/line-pay.svg' },
  { type: 'ecPay', label: '綠界科技', icon: '/icons/ecpay.svg' }
])

const taiwanServiceNodes = ref([
  { type: 'taoyuanAirport', label: '桃機航班', icon: '/icons/airport.svg' },
  { type: 'govOpenData', label: '政府開放資料', icon: '/icons/gov-data.svg' }
])

function onDragStart(event: DragEvent, node: any) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/vueflow', JSON.stringify(node))
    event.dataTransfer.effectAllowed = 'move'
  }
}
</script>
```

## 🧪 技術驗證實驗

### 實驗 1: 基礎拖拉功能
- ✅ 節點拖拉移動
- ✅ 節點連線建立
- ✅ 連線刪除
- ✅ 多選操作

### 實驗 2: 自定義節點
- ✅ 台灣金流節點顯示
- ✅ 節點屬性編輯
- ✅ 節點驗證機制

### 實驗 3: 工作流序列化
- ✅ 工作流 JSON 匯出
- ✅ 工作流 JSON 匯入
- ✅ 與 n8n 格式相容性

## 📊 效能考量

### 1. 大型工作流處理
- 虛擬化渲染 (100+ 節點)
- 延遲載入節點內容
- 記憶體使用優化

### 2. 即時互動體驗
- 60fps 拖拉動畫
- 防抖動處理
- 快取計算結果

### 3. 行動裝置支援
- 觸控手勢支援
- 響應式佈局
- 效能降級策略

## 🔒 安全性考量

### 1. 輸入驗證
- 節點參數驗證
- XSS 防護
- 檔案上傳限制

### 2. 資料保護
- 敏感資料遮罩
- 本地儲存加密
- 傳輸加密

## 🎯 風險評估

### 高風險項目
1. **複雜工作流效能** - 大量節點時的渲染效能
2. **瀏覽器相容性** - 不同瀏覽器的拖拉行為差異
3. **觸控裝置支援** - 行動裝置的操作體驗

### 解決方案
1. **效能優化** - 虛擬化、延遲載入、記憶體管理
2. **相容性測試** - 多瀏覽器測試、Polyfill 支援
3. **響應式設計** - 觸控友善的 UI 設計

## 📝 結論

### 技術可行性: ✅ 高度可行
- Vue Flow 提供完整的拖拉式編輯功能
- 自定義節點開發機制成熟
- 與 Vue 3 生態系統完美整合

### 開發複雜度: ⚠️ 中等
- 需要深入理解 Vue Flow API
- 自定義節點設計需要 UI/UX 考量
- 效能優化需要額外工作

### 建議實作順序
1. **第一階段**: 基礎編輯器 + 簡單節點
2. **第二階段**: 台灣在地節點 + 屬性面板
3. **第三階段**: 進階功能 + 效能優化
4. **第四階段**: 行動裝置支援 + 無障礙功能
