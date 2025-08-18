<template>
  <div
    class="node-button-container"
    :class="{
      'selected': selected,
      'hovered': isHovered
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 節點操作按鈕組 (懸停時顯示) -->
    <div class="node-actions" :style="{
      opacity: 0,
      visibility: 'visible'
    }">
          <!-- 第一個執行按鈕 -->
          <button
            class="action-btn execute-btn"
            @click.stop="handleExecute"
            title="執行節點"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          </button>

          <!-- 第二個執行按鈕 (測試執行) -->
          <button
            class="action-btn test-execute-btn"
            @click.stop="handleTestExecute"
            title="測試執行節點"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
          </button>

          <!-- 停用按鈕 -->
          <button
            class="action-btn disable-btn"
            @click.stop="handleToggleDisable"
            :title="data.disabled ? '啟用節點' : '停用節點'"
            :class="{ active: data.disabled }"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
          </button>

          <!-- 刪除按鈕 -->
          <button
            class="action-btn delete-btn"
            @click.stop="handleDelete"
            title="刪除節點"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3,6 5,6 21,6"/>
              <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2-2v2"/>
            </svg>
          </button>

          <!-- 其他選項按鈕 -->
          <button
            class="action-btn more-btn"
            @click.stop="handleMore"
            title="更多選項"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>
        </div>

    <!-- 節點主體容器 -->
    <div
      class="taiwan-flow-node"
      :class="{
        'has-error': hasError,
        'executing': isExecuting,
        [`node-type-${nodeCategory}`]: true
      }"
      @click="handleClick"
      @dblclick="handleDoubleClick"
    >
      <div class="node-container">
        <!-- 節點頭部 -->
        <div class="node-header">
          <div class="node-icon" v-html="data.icon || '📦'">
          </div>
          <div class="node-info">
            <div class="node-title">{{ data.label || '未命名節點' }}</div>
            <div class="node-subtitle" v-if="getNodeDescription()">
              {{ getNodeDescription() }}
            </div>
          </div>
        </div>

        <!-- 節點內容區域 -->
        <div class="node-content" v-if="hasNodeContent">
          <div class="node-fields">
            <div
              v-for="field in displayFields"
              :key="field.key"
              class="node-field"
            >
              <span class="field-label">{{ field.label }}:</span>
              <span class="field-value">{{ field.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue Flow 連接點 -->
      <!-- 左側輸入端口 (除了觸發節點) -->
      <Handle
        v-if="!isSourceNode"
        type="target"
        :position="Position.Left"
        class="node-handle input-handle"
        :style="{
          background: getHandleColor(),
          borderColor: getHandleBorderColor()
        }"
      />

      <!-- 右側輸出端口 (除了最終節點) -->
      <Handle
        v-if="!isTargetNode"
        type="source"
        :position="Position.Right"
        class="node-handle output-handle"
        :style="{
          background: getHandleColor(),
          borderColor: getHandleBorderColor()
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { ElMessageBox } from 'element-plus'

// Props
interface Props {
  id: string
  data: any
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

// 響應式資料
const hasError = ref(false)
const isExecuting = ref(false)
const isHovered = ref(false)

// 計算屬性
const nodeCategory = computed(() => {
  const type = props.data.nodeType
  if (['manualTrigger', 'scheduleTrigger', 'webhookTrigger'].includes(type)) {
    return 'trigger'
  } else if (['linePay', 'ecPay', 'newebPay', 'spgateway'].includes(type)) {
    return 'payment'
  } else if (['govOpenData', 'taoyuanAirport', 'weatherBureau', 'taiwanRailway'].includes(type)) {
    return 'taiwan-service'
  } else if (['lineNotify', 'email', 'sms'].includes(type)) {
    return 'notification'
  }
  return 'general'
})

// 移除未使用的 shouldShowActions 計算屬性

const isSourceNode = computed(() => {
  // 觸發節點通常是源節點
  return ['manualTrigger', 'scheduleTrigger', 'webhookTrigger'].includes(props.data.nodeType)
})

const isTargetNode = computed(() => {
  // 通知節點通常是目標節點
  return ['lineNotify', 'email', 'sms'].includes(props.data.nodeType)
})

// 新增計算屬性
const hasNodeContent = computed(() => {
  return displayFields.value.length > 0
})

const displayFields = computed(() => {
  const fields = []

  // 根據節點類型顯示關鍵欄位
  switch (props.data.nodeType) {
    case 'linePay':
    case 'ecPay':
      if (props.data.amount) {
        fields.push({
          key: 'amount',
          label: '金額',
          value: `NT$ ${props.data.amount}`
        })
      }
      if (props.data.productName) {
        fields.push({
          key: 'product',
          label: '商品',
          value: props.data.productName.length > 15 ?
            props.data.productName.substring(0, 15) + '...' :
            props.data.productName
        })
      }
      break

    case 'lineNotify':
      if (props.data.message) {
        fields.push({
          key: 'message',
          label: '訊息',
          value: props.data.message.length > 20 ?
            props.data.message.substring(0, 20) + '...' :
            props.data.message
        })
      }
      break

    case 'scheduleTrigger':
      if (props.data.schedule) {
        fields.push({
          key: 'schedule',
          label: '排程',
          value: props.data.schedule
        })
      }
      break
  }

  return fields.slice(0, 2) // 最多顯示2個欄位
})

const nodeFields = computed(() => {
  const fields = []
  
  // 根據節點類型顯示關鍵欄位
  switch (props.data.nodeType) {
    case 'linePay':
    case 'ecPay':
    case 'newebPay':
    case 'spgateway':
      if (props.data.amount) {
        fields.push({
          key: 'amount',
          label: '金額',
          value: `NT$ ${props.data.amount}`
        })
      }
      if (props.data.productName) {
        fields.push({
          key: 'product',
          label: '商品',
          value: props.data.productName
        })
      }
      break
      
    case 'httpRequest':
      if (props.data.method) {
        fields.push({
          key: 'method',
          label: '方法',
          value: props.data.method
        })
      }
      if (props.data.url) {
        fields.push({
          key: 'url',
          label: 'URL',
          value: props.data.url.length > 25 ? props.data.url.substring(0, 25) + '...' : props.data.url
        })
      }
      break
      
    case 'email':
      if (props.data.to) {
        fields.push({
          key: 'to',
          label: '收件人',
          value: props.data.to
        })
      }
      if (props.data.subject) {
        fields.push({
          key: 'subject',
          label: '主旨',
          value: props.data.subject.length > 20 ? props.data.subject.substring(0, 20) + '...' : props.data.subject
        })
      }
      break
      
    case 'lineNotify':
      if (props.data.message) {
        fields.push({
          key: 'message',
          label: '訊息',
          value: props.data.message.length > 25 ? props.data.message.substring(0, 25) + '...' : props.data.message
        })
      }
      break
      
    case 'scheduleTrigger':
      if (props.data.schedule) {
        fields.push({
          key: 'schedule',
          label: '排程',
          value: props.data.schedule
        })
      }
      break
  }
  
  return fields.slice(0, 2) // 最多顯示2個欄位
})

// 方法
const getNodeTypeLabel = (): string => {
  const typeMap: Record<string, string> = {
    'manualTrigger': '手動觸發',
    'webhookTrigger': 'Webhook觸發',
    'scheduleTrigger': '定時觸發',
    'linePay': 'Line Pay',
    'ecPay': '綠界科技',
    'newebPay': '藍新金流',
    'spgateway': '智付通',
    'taoyuanAirport': '桃園機場',
    'govOpenData': '政府開放資料',
    'weatherBureau': '中央氣象署',
    'taiwanRailway': '台鐵資訊',
    'highSpeedRail': '台灣高鐵',
    'healthInsurance': '健保署',
    'httpRequest': 'HTTP請求',
    'dataTransform': '資料轉換',
    'condition': '條件判斷',
    'delay': '延遲等待',
    'lineNotify': 'Line通知',
    'email': '電子郵件',
    'sms': '簡訊通知'
  }

  return typeMap[props.data.nodeType] || '未知節點'
}

const getNodeDescription = (): string => {
  const descriptionMap: Record<string, string> = {
    'manualTrigger': '手動啟動工作流程',
    'webhookTrigger': '接收 HTTP 請求觸發',
    'scheduleTrigger': '定時自動執行',
    'linePay': 'LINE Pay 線上付款',
    'ecPay': '綠界科技金流服務',
    'newebPay': '藍新金流付款',
    'spgateway': '智付通金流',
    'taoyuanAirport': '桃園機場航班資訊',
    'govOpenData': '政府開放資料查詢',
    'weatherBureau': '氣象資料查詢',
    'taiwanRailway': '台鐵時刻表查詢',
    'highSpeedRail': '高鐵時刻表查詢',
    'healthInsurance': '健保資料查詢',
    'httpRequest': '發送 HTTP 請求',
    'dataTransform': '資料格式轉換',
    'condition': '條件邏輯判斷',
    'delay': '延遲執行',
    'lineNotify': 'LINE 訊息通知',
    'email': '電子郵件發送',
    'sms': '簡訊發送'
  }

  return descriptionMap[props.data.nodeType] || ''
}

const getHandleColor = (): string => {
  const colorMap: Record<string, string> = {
    'trigger': '$success-color',
    'payment': '$info-color',
    'taiwan-service': '$accent-crimson',
    'notification': '$accent-orange',
    'general': '$neutral-500'
  }
  return colorMap[nodeCategory.value] || '$neutral-500'
}

const getHandleBorderColor = (): string => {
  return '$neutral-700' // 深灰色邊框
}

const handleClick = (_event: MouseEvent) => {
  // 不阻止事件冒泡，讓 VueFlow 的 @node-click 能正常觸發
  // 移除 event.stopPropagation() 讓事件能正常冒泡到 VueFlow
  emit('select', props.id)
}

const handleDoubleClick = (event: MouseEvent) => {
  event.stopPropagation()
  emit('edit', props.id)
}

const handleDelete = async (event: MouseEvent) => {
  event.stopPropagation()

  try {
    await ElMessageBox.confirm(
      `確定要刪除節點「${props.data.label}」嗎？`,
      '確認刪除',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    emit('delete', props.id)
  } catch {
    // 用戶取消刪除
  }
}

// 新增的操作方法
const handleExecute = (event: MouseEvent) => {
  event.stopPropagation()
  emit('execute', props.id)
}

const handleTestExecute = (event: MouseEvent) => {
  event.stopPropagation()
  emit('test-execute', props.id)
}

const handleToggleDisable = (event: MouseEvent) => {
  event.stopPropagation()
  emit('toggle-disable', props.id)
}

const handleMore = (event: MouseEvent) => {
  event.stopPropagation()
  emit('more-options', props.id)
}

// 懸停事件處理
const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

// 事件
const emit = defineEmits<{
  select: [nodeId: string]
  edit: [nodeId: string]
  delete: [nodeId: string]
  update: [nodeData: any]
  execute: [nodeId: string]
  'test-execute': [nodeId: string]
  'toggle-disable': [nodeId: string]
  'more-options': [nodeId: string]
}>()

// 組件名稱
defineOptions({
  name: 'TaiwanFlowNode'
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.node-button-container {
  position: relative;
  display: inline-block;
}

.taiwan-flow-node {
  min-width: 220px;
  max-width: 300px;
  position: relative;
  cursor: pointer;

  .node-container {
    background: $white;
    border: 1px solid $neutral-300;
    border-radius: 16px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease-in-out;
    overflow: hidden;
  }

  // 懸停效果
  &:hover .node-container {
    border-color: $neutral-400;
    // box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    // transform: translateY(-2px);
  }

  // 選中狀態
  &.selected .node-container {
    border-color: $primary-500;
    box-shadow: 0 0 0 3px rgba($primary-500, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  // 錯誤狀態
  &.has-error .node-container {
    border-color: $error-color;
    box-shadow: 0 0 0 3px rgba($error-color, 0.2);
  }

  // 執行中狀態
  &.executing .node-container {
    border-color: $success-color;
    box-shadow: 0 0 0 3px rgba($success-color, 0.2);

    .node-header {
      animation: pulse 2s ease-in-out infinite;
    }
  }
}

.node-header {
  display: flex;
  align-items: center;
  padding: 20px 16px 16px 16px;
  gap: 12px;
  position: relative;

  .node-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background: $neutral-100;
    border: 1px solid $neutral-300;
    border-radius: 6px;
    color: $neutral-500;
  }

  .node-info {
    flex: 1;
    min-width: 0;

    .node-title {
      font-weight: 600;
      font-size: 15px;
      color: $neutral-900;
      line-height: 1.4;
      margin-bottom: 4px;
      word-wrap: break-word;
    }

    .node-subtitle {
      font-size: 13px;
      color: $neutral-500;
      line-height: 1.3;
      word-wrap: break-word;
    }
  }
}
// ===== 節點按鈕容器樣式 =====
// 新的HTML結構：.node-button-container > .node-actions + .taiwan-flow-node

// n8n 風格的操作按鈕組 (位於 .node-button-container 內)
.node-actions {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  padding: 6px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;  // 默認隱藏，懸停時顯示
  visibility: visible;
  transition: all 0.2s ease-in-out;
  z-index: 9999;
  pointer-events: auto;
}

// 操作按鈕基礎樣式
.node-actions .action-btn {
  width: 32px;
  height: 32px;
  // border: 3px solid $neutral-800;
  background: $neutral-50;
  color: $neutral-800;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 18px;
  position: relative;
  // box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}

  .node-actions .action-btn::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    z-index: -1;
    opacity: 1;
    transition: opacity 0.2s ease;
  }

// 按鈕懸停和交互效果
.node-actions .action-btn:hover {
  color: $white;
  background: $primary-500;
  border-color: $primary-500;
  transform: scale(1.15);
  box-shadow: 0 8px 16px rgba($primary-500, 0.4);
}

.node-actions .action-btn:hover::before {
  opacity: 1;
}

.node-actions .action-btn:active {
  transform: scale(0.95);
}

.node-actions .action-btn.active {
  color: $error-color;
}

.node-actions .action-btn.active::before {
  background: rgba($error-color, 0.1);
  opacity: 1;
}

// SVG 圖標樣式 - 確保正確顯示
.node-actions .action-btn svg {
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

// 特定按鈕類型的懸停效果
.node-actions .execute-btn:hover {
  color: $success-color;
  background: $white;
  border-color: $success-color;
}

.node-actions .execute-btn:hover::before {
  background: rgba($success-color, 0.1);
}

.node-actions .test-execute-btn:hover {
  color: $info-color;
  background: $white;
  border-color: $info-color;
}

.node-actions .test-execute-btn:hover::before {
  background: rgba($info-color, 0.1);
}

.node-actions .disable-btn:hover {
  color: $warning-color;
  background: $white;
  border-color: $warning-color;
}

.node-actions .disable-btn:hover::before {
  background: rgba($warning-color, 0.1);
}

.node-actions .delete-btn:hover {
  color: $error-color;
  background: $white;
  border-color: $error-color;
}

.node-actions .delete-btn:hover::before {
  background: rgba($error-color, 0.1);
}

.node-actions .more-btn:hover {
  color: $accent-crimson;
  background: $white;
  border-color: $accent-crimson;
}

.node-actions .more-btn:hover::before {
  background: rgba($accent-crimson, 0.1);
}

// ===== 懸停顯示邏輯 =====
// 當懸停在 .node-button-container 上時，顯示 .node-actions
// 這是新HTML結構的核心懸停邏輯

.node-button-container:hover .node-actions,
.node-button-container.hovered .node-actions,
.node-button-container.selected .node-actions {
  opacity: 1 !important;
  visibility: visible !important;
}


.node-content {
  border-top: 1px solid $neutral-300;
  padding: 12px 16px;
  background: $neutral-50;

  .node-fields {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .node-field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;

      .field-label {
        color: $neutral-500;
        font-weight: 500;
      }

      .field-value {
        color: $neutral-900;
        font-weight: 600;
        text-align: right;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

// 選中時顯示刪除按鈕
.selected .node-delete-btn {
  opacity: 1;
}

.node-content {
  padding: $spacing-sm $spacing-base;
  
  .node-fields {
    .node-field {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: $spacing-xs;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      label {
        font-size: $font-size-xs;
        color: $text-color-secondary;
        font-weight: $font-weight-medium;
        margin-right: $spacing-xs;
        flex-shrink: 0;
      }
      
      span {
        font-size: $font-size-xs;
        color: $text-color;
        font-weight: $font-weight-medium;
        text-align: right;
        word-break: break-all;
        line-height: 1.3;
        
        &.field-empty {
          color: $text-color-tertiary;
          font-style: italic;
        }
      }
    }
  }
  
  .node-placeholder {
    text-align: center;
    color: $text-color-tertiary;
    font-size: $font-size-xs;
    font-style: italic;
    padding: $spacing-sm 0;
  }
}

.node-handle {
  width: 14px;
  height: 14px;
  border: 2px solid $white;
  border-radius: 50%;
  background: $neutral-400;
  transition: all 0.2s ease-in-out;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px rgba($primary-500, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    background: $primary-500;
    border-color: $white;
  }

  &.input-handle {
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
  }

  &.output-handle {
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
  }

  // 連接時的樣式
  &.vue-flow__handle-connecting {
    background: $primary-500;
    border-color: $white;
    transform: scale(1.3);
  }

  // 有效連接目標的樣式
  &.vue-flow__handle-valid {
    background: $success-color;
    border-color: $white;
  }
}

// 不同節點類型的特殊樣式
.node-type-trigger {
  .node-icon {
    background: rgba($success-color, 0.1);
    border-color: rgba($success-color, 0.2);
    color: $success-color;
  }

  &.selected .node-container {
    border-color: $success-color;
    box-shadow: 0 0 0 2px rgba($success-color, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

.node-type-payment {
  .node-icon {
    background: rgba($info-color, 0.1);
    border-color: rgba($info-color, 0.2);
    color: $info-color;
  }

  &.selected .node-container {
    border-color: $info-color;
    box-shadow: 0 0 0 2px rgba($info-color, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

.node-type-taiwan-service {
  .node-icon {
    background: rgba($accent-crimson, 0.1);
    border-color: rgba($accent-crimson, 0.2);
    color: $accent-crimson;
  }

  &.selected .node-container {
    border-color: $accent-crimson;
    box-shadow: 0 0 0 2px rgba($accent-crimson, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

.node-type-notification {
  .node-icon {
    background: rgba($accent-orange, 0.1);
    border-color: rgba($accent-orange, 0.2);
    color: $accent-orange;
  }

  &.selected .node-container {
    border-color: $accent-orange;
    box-shadow: 0 0 0 2px rgba($accent-orange, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

.node-type-general {
  .node-icon {
    background: rgba($neutral-500, 0.1);
    border-color: rgba($neutral-500, 0.2);
    color: $neutral-500;
  }
}

// 動畫
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

// 深色主題
[data-theme="dark"] {
  .taiwan-flow-node {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
    
    .node-header {
      background: var(--bg-color-tertiary);
      border-color: var(--border-color);
      
      .node-name {
        color: var(--text-color);
      }
      
      .node-type {
        color: var(--text-color-secondary);
      }
    }
    
    .node-content {
      .node-field {
        label {
          color: var(--text-color-secondary);
        }
        
        span {
          color: var(--text-color);
        }
      }
      
      .node-placeholder {
        color: var(--text-color-tertiary);
      }
    }
  }
}
</style>
