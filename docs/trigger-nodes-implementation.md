# 觸發節點組件實現文檔

## 📋 實現概述

觸發節點組件是台灣在地化流程自動化平台的核心組件之一，負責啟動工作流程的執行。本文檔詳細說明了觸發節點的完整實現。

## 🎯 功能特色

### 支援的觸發節點類型

1. **手動觸發節點 (Manual Trigger)**
   - 🚀 圖標：火箭
   - 功能：手動點擊執行按鈕啟動工作流
   - 配置選項：
     - 觸發按鈕文字
     - 是否需要確認執行

2. **Webhook 觸發節點 (Webhook Trigger)**
   - 🔗 圖標：連結
   - 功能：透過 HTTP 請求觸發工作流
   - 配置選項：
     - Webhook 路徑
     - HTTP 方法 (GET/POST/PUT/DELETE)
     - 認證方式 (無認證/API金鑰/基本認證/Bearer Token)
     - 回應格式 (JSON/純文字/XML)
     - 完整 Webhook URL 複製功能

3. **定時觸發節點 (Schedule Trigger)**
   - ⏰ 圖標：時鐘
   - 功能：按照時間排程自動執行工作流
   - 配置選項：
     - 觸發模式：間隔執行/Cron表達式/特定時間
     - 間隔設定：數值 + 時間單位 (分鐘/小時/天/週)
     - Cron 表達式：支援標準 Cron 語法
     - 常用 Cron 模板：每天午夜、工作日早上9點等
     - 特定時間：日期時間選擇器
     - 時區設定：預設台北時間 (UTC+8)
     - 啟用/停用開關

## 🏗️ 技術架構

### 核心組件

1. **TriggerNodeEditor.vue**
   - 位置：`frontend/src/components/workflow/editors/TriggerNodeEditor.vue`
   - 功能：觸發節點的屬性編輯器
   - 支援：v-model 雙向綁定、change 事件

2. **TriggerNode.vue**
   - 位置：`frontend/src/components/WorkflowEditor/nodes/TriggerNode.vue`
   - 功能：觸發節點的視覺化組件
   - 特色：動態圖標、執行狀態指示器

3. **節點庫整合**
   - 位置：`frontend/src/components/workflow/VueFlowEditor.vue`
   - 功能：拖拉式節點庫，包含所有觸發節點

### 資料結構

```typescript
interface TriggerNodeData {
  id: string
  type: 'manualTrigger' | 'webhookTrigger' | 'scheduleTrigger'
  label: string
  settings: {
    // 手動觸發
    buttonText?: string
    requireConfirmation?: boolean
    
    // Webhook 觸發
    path?: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    authentication?: 'none' | 'apiKey' | 'basic' | 'bearer'
    apiKeyName?: string
    responseFormat?: 'json' | 'text' | 'xml'
    
    // 定時觸發
    mode?: 'interval' | 'cron' | 'specific'
    intervalValue?: number
    intervalUnit?: 'minutes' | 'hours' | 'days' | 'weeks'
    cronExpression?: string
    specificDate?: string
    timezone?: string
    enabled?: boolean
  }
}
```

## 🎨 使用者介面

### 節點庫面板
- 位於工作流編輯器左側
- 🚀 觸發節點分類
- 支援拖拉到畫布創建節點

### 屬性編輯面板
- 位於工作流編輯器右側
- 動態表單，根據節點類型顯示對應配置選項
- 即時驗證和錯誤提示

### 視覺化節點
- 圓角矩形設計，符合 n8n 風格
- 動態圖標和顏色
- 執行狀態指示器（執行中/成功/錯誤）
- 懸停效果和選中狀態

## 🔧 整合方式

### 1. 節點類型註冊
```javascript
const nodeTypeMap = {
  manualTrigger: '手動觸發',
  webhookTrigger: 'Webhook 觸發',
  scheduleTrigger: '定時觸發'
}

const nodeIconMap = {
  manualTrigger: '🚀',
  webhookTrigger: '🔗',
  scheduleTrigger: '⏰'
}
```

### 2. 拖拉處理
```javascript
const handleDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'new-node',
    nodeType
  }))
}
```

### 3. 屬性編輯整合
```vue
<TriggerNodeEditor
  v-if="isTriggerNode(selectedNode.data?.nodeType)"
  v-model="selectedNode.data"
  @change="updateSelectedNode"
/>
```

## 🧪 測試功能

### 測試頁面
- 路由：`/trigger-node-test`
- 組件：`TriggerNodeTest.vue`
- 功能：獨立測試所有觸發節點類型

### 測試內容
1. 手動觸發節點配置測試
2. Webhook 觸發節點配置測試
3. 定時觸發節點配置測試
4. 資料綁定和事件處理測試

## 🌟 台灣在地化特色

1. **時區支援**：預設台北時間 (Asia/Taipei)
2. **繁體中文介面**：所有文字和提示都使用繁體中文
3. **本地化時間格式**：YYYY-MM-DD HH:mm:ss
4. **常用排程模板**：符合台灣工作習慣的時間設定

## 📈 未來擴展

1. **更多觸發類型**：
   - 檔案監控觸發
   - 資料庫變更觸發
   - 電子郵件觸發

2. **進階功能**：
   - 觸發條件邏輯
   - 批次觸發處理
   - 觸發歷史記錄

3. **整合服務**：
   - Line Bot 觸發
   - 台灣政府開放資料觸發
   - 金流服務觸發

## ✅ 完成狀態

- [x] 手動觸發節點實現
- [x] Webhook 觸發節點實現  
- [x] 定時觸發節點實現
- [x] 節點庫整合
- [x] 屬性編輯器整合
- [x] 拖拉功能實現
- [x] 視覺化組件實現
- [x] 測試頁面建立
- [x] 台灣在地化配置

觸發節點組件已完全實現並整合到工作流編輯器中，支援完整的拖拉、配置和執行功能。
