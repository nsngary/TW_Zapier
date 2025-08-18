<template>
  <div
    class="taiwan-node"
    :class="{
      'selected': selected,
      'has-error': hasError,
      'executing': isExecuting,
      'disabled': !enabled,
      [`${nodeCategory}-node`]: true
    }"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <!-- 台灣特色頂部裝飾條 -->
    <div class="taiwan-decoration" />

    <!-- 節點標題 -->
    <div class="node-header">
      <div class="node-icon">
        <img
          v-if="nodeIcon && nodeIcon.startsWith('/')"
          :src="nodeIcon"
          :alt="data.label"
          class="icon-image"
          @error="handleIconError"
        />
        <el-icon v-else class="icon-element">
          <component :is="getIconComponent()" />
        </el-icon>
      </div>
      
      <div class="node-title">
        <div class="node-name">{{ data.label || '未命名節點' }}</div>
        <div class="node-type">{{ getNodeTypeLabel() }}</div>
      </div>
      
      <div class="node-status">
        <el-icon v-if="hasError" class="error-icon">
          <CircleCloseFilled />
        </el-icon>
        <el-icon v-else-if="isExecuting" class="executing-icon">
          <Loading />
        </el-icon>
        <el-icon v-else-if="isSuccess" class="success-icon">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </div>

    <!-- 節點內容 -->
    <div class="node-content">
      <div v-if="nodeFields.length > 0" class="node-fields">
        <div
          v-for="field in nodeFields"
          :key="field.key"
          class="node-field"
        >
          <label>{{ field.label }}:</label>
          <span :class="{ 'field-empty': !field.value }">
            {{ field.value || '未設定' }}
          </span>
        </div>
      </div>
      
      <div v-else class="node-placeholder">
        點擊編輯節點屬性
      </div>
    </div>

    <!-- 節點底部 -->
    <div class="node-footer">
      <div class="node-actions">
        <el-button
          type="text"
          size="small"
          class="action-btn"
          @click.stop="handleEdit"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
        
        <el-button
          type="text"
          size="small"
          class="action-btn"
          @click.stop="handleCopy"
        >
          <el-icon><DocumentCopy /></el-icon>
        </el-button>
        
        <el-button
          type="text"
          size="small"
          class="action-btn delete-btn"
          @click.stop="handleDelete"
        >
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>
      
      <div class="node-info">
        <span v-if="executionTime">{{ executionTime }}ms</span>
      </div>
    </div>

    <!-- 連接點 -->
    <Handle
      v-if="!isSourceNode"
      type="target"
      position="left"
      class="node-handle input-handle"
    />
    
    <Handle
      v-if="!isTargetNode"
      type="source"
      position="right"
      class="node-handle output-handle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Handle } from '@vue-flow/core'
import {
  Edit,
  Delete,
  DocumentCopy,
  CircleCloseFilled,
  CircleCheckFilled,
  Loading,
  VideoPlay,
  CreditCard,
  Service,
  Tools,
  Bell,
  Grid
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { findNodeDefinition } from '@/config/nodeLibrary'
import { NodeCategory } from '@/types/workflow'
import type { WorkflowNode } from '@/types/workflow'

// ===== Props =====

interface Props {
  id: string
  data: any
  selected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

// ===== 響應式資料 =====

const iconError = ref(false)
const hasError = ref(false)
const isExecuting = ref(false)
const isSuccess = ref(false)
const executionTime = ref<number | null>(null)

// ===== 計算屬性 =====

const nodeDefinition = computed(() => {
  return findNodeDefinition(props.data.nodeType)
})

const nodeIcon = computed(() => {
  return nodeDefinition.value?.icon
})

const nodeCategory = computed(() => {
  if (!nodeDefinition.value) return 'general'
  
  const categoryMap: Record<string, string> = {
    [NodeCategory.TRIGGER]: 'trigger',
    [NodeCategory.PAYMENT]: 'payment',
    [NodeCategory.TAIWAN_SERVICE]: 'taiwan-service',
    [NodeCategory.GENERAL]: 'general',
    [NodeCategory.NOTIFICATION]: 'notification'
  }
  
  return categoryMap[nodeDefinition.value.category] || 'general'
})

const enabled = computed(() => {
  return props.data.enabled !== false
})

const isSourceNode = computed(() => {
  // 觸發節點通常是源節點
  return ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(props.data.nodeType)
})

const isTargetNode = computed(() => {
  // 通知節點通常是目標節點
  return ['email', 'sms', 'lineNotify'].includes(props.data.nodeType)
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
          value: props.data.url.length > 30 ? props.data.url.substring(0, 30) + '...' : props.data.url
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
          value: props.data.message.length > 30 ? props.data.message.substring(0, 30) + '...' : props.data.message
        })
      }
      break
      
    case 'condition':
      if (props.data.conditions && props.data.conditions.length > 0) {
        fields.push({
          key: 'conditions',
          label: '條件',
          value: `${props.data.conditions.length} 個條件`
        })
      }
      break
      
    case 'delay':
      if (props.data.amount && props.data.unit) {
        fields.push({
          key: 'delay',
          label: '延遲',
          value: `${props.data.amount} ${getUnitLabel(props.data.unit)}`
        })
      }
      break
  }
  
  return fields.slice(0, 3) // 最多顯示3個欄位
})

// ===== 方法 =====

const getIconComponent = () => {
  if (iconError.value) return Grid
  
  const iconMap: Record<string, any> = {
    'VideoPlay': VideoPlay,
    'CreditCard': CreditCard,
    'Service': Service,
    'Tools': Tools,
    'Bell': Bell,
    'Grid': Grid
  }
  
  return iconMap[nodeIcon.value as string] || Grid
}

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

const getUnitLabel = (unit: string): string => {
  const unitMap: Record<string, string> = {
    'seconds': '秒',
    'minutes': '分鐘',
    'hours': '小時',
    'days': '天'
  }
  
  return unitMap[unit] || unit
}

const handleIconError = () => {
  iconError.value = true
}

const handleClick = () => {
  emit('select', props.id)
}

const handleDoubleClick = () => {
  emit('edit', props.id)
}

const handleEdit = () => {
  emit('edit', props.id)
}

const handleCopy = () => {
  emit('copy', props.id)
  ElMessage.success('節點已複製')
}

const handleDelete = async () => {
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

// ===== 事件 =====

const emit = defineEmits<{
  select: [nodeId: string]
  edit: [nodeId: string]
  copy: [nodeId: string]
  delete: [nodeId: string]
  update: [node: WorkflowNode]
}>()
</script>

<style scoped lang="scss">
.taiwan-node {
  min-width: 200px;
  max-width: 300px;
  background: $white;
  border: 2px solid $border-color;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-base;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  // 台灣特色頂部裝飾條
  .taiwan-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff0000 0%, #0000ff 50%, #00ff00 100%);
  }
  
  // 懸停效果
  &:hover {
    border-color: $primary-color;
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }
  
  // 選中狀態
  &.selected {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
  }
  
  // 錯誤狀態
  &.has-error {
    border-color: $error-color;
    box-shadow: 0 0 0 3px rgba($error-color, 0.2);
    
    .taiwan-decoration {
      background: $error-color;
    }
  }
  
  // 執行中狀態
  &.executing {
    border-color: $info-color;
    box-shadow: 0 0 0 3px rgba($info-color, 0.2);
    
    .taiwan-decoration {
      background: linear-gradient(90deg, $info-color 0%, #66b3ff 50%, $info-color 100%);
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  // 停用狀態
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: $shadow-base;
    }
  }
}

.node-header {
  display: flex;
  align-items: center;
  padding: $spacing-base $spacing-lg;
  background: $bg-color-secondary;
  border-bottom: $border-width-thin solid $border-color;
  
  .node-icon {
    width: 24px;
    height: 24px;
    margin-right: $spacing-base;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .icon-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    .icon-element {
      font-size: 18px;
    }
  }
  
  .node-title {
    flex: 1;
    
    .node-name {
      font-weight: $font-weight-semibold;
      font-size: $font-size-base;
      color: $text-color;
      margin-bottom: 2px;
    }
    
    .node-type {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }
  
  .node-status {
    .error-icon {
      color: $error-color;
    }
    
    .executing-icon {
      color: $info-color;
      animation: spin 1s linear infinite;
    }
    
    .success-icon {
      color: $success-color;
    }
  }
}

.node-content {
  padding: $spacing-lg;
  
  .node-fields {
    .node-field {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $spacing-base;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      label {
        font-size: $font-size-sm;
        color: $text-color-secondary;
        font-weight: $font-weight-medium;
      }
      
      span {
        font-size: $font-size-sm;
        color: $text-color;
        font-weight: $font-weight-medium;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
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
    font-size: $font-size-sm;
    font-style: italic;
  }
}

.node-footer {
  padding: $spacing-base $spacing-lg;
  background: $bg-color-secondary;
  border-top: $border-width-thin solid $border-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .node-actions {
    display: flex;
    gap: $spacing-xs;
    
    .action-btn {
      padding: $spacing-xs;
      border: none;
      background: transparent;
      border-radius: $border-radius-sm;
      cursor: pointer;
      color: $text-color-secondary;
      transition: all 0.2s ease;
      
      &:hover {
        background: $bg-color-tertiary;
        color: $text-color;
      }
      
      &.delete-btn:hover {
        color: $error-color;
      }
      
      .el-icon {
        font-size: 14px;
      }
    }
  }
  
  .node-info {
    font-size: $font-size-xs;
    color: $text-color-tertiary;
  }
}

.node-handle {
  width: 12px;
  height: 12px;
  background: $white;
  border: 2px solid $border-color-dark;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: $primary-color;
    transform: scale(1.2);
  }
  
  &.input-handle {
    left: -6px;
  }
  
  &.output-handle {
    right: -6px;
  }
}

// 特定節點類型樣式
.payment-node {
  .node-header {
    background: linear-gradient(135deg, #06d6a0 0%, #00b894 100%);
    color: $white;
    
    .node-type {
      color: rgba($white, 0.8);
    }
  }
}

.trigger-node {
  .node-header {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: $white;
    
    .node-type {
      color: rgba($white, 0.8);
    }
  }
}

.taiwan-service-node {
  .node-header {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: $white;
    
    .node-type {
      color: rgba($white, 0.8);
    }
  }
}

.notification-node {
  .node-header {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: $white;
    
    .node-type {
      color: rgba($white, 0.8);
    }
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

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 深色主題
[data-theme="dark"] {
  .taiwan-node {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
    
    .node-header,
    .node-footer {
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
