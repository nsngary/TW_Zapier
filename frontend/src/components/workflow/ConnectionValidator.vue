<template>
  <div class="connection-validator">
    <!-- 連線驗證狀態指示器 -->
    <div class="validation-indicator" :class="validationStatusClass">
      <el-icon class="status-icon">
        <component :is="validationIcon" />
      </el-icon>
      <span class="status-text">{{ validationStatusText }}</span>
    </div>

    <!-- 驗證結果詳情 -->
    <el-collapse v-if="showDetails" v-model="activeCollapse" class="validation-details">
      <!-- 錯誤訊息 -->
      <el-collapse-item v-if="validationResult.errors.length > 0" name="errors">
        <template #title>
          <div class="collapse-title error">
            <el-icon><WarningFilled /></el-icon>
            錯誤 ({{ validationResult.errors.length }})
          </div>
        </template>
        <div class="message-list">
          <div
            v-for="(error, index) in validationResult.errors"
            :key="index"
            class="message-item error"
          >
            <el-icon><CircleCloseFilled /></el-icon>
            {{ error }}
          </div>
        </div>
      </el-collapse-item>

      <!-- 警告訊息 -->
      <el-collapse-item v-if="validationResult.warnings.length > 0" name="warnings">
        <template #title>
          <div class="collapse-title warning">
            <el-icon><Warning /></el-icon>
            警告 ({{ validationResult.warnings.length }})
          </div>
        </template>
        <div class="message-list">
          <div
            v-for="(warning, index) in validationResult.warnings"
            :key="index"
            class="message-item warning"
          >
            <el-icon><WarningFilled /></el-icon>
            {{ warning }}
          </div>
        </div>
      </el-collapse-item>

      <!-- 建議訊息 -->
      <el-collapse-item v-if="validationResult.suggestions.length > 0" name="suggestions">
        <template #title>
          <div class="collapse-title suggestion">
            <el-icon><InfoFilled /></el-icon>
            建議 ({{ validationResult.suggestions.length }})
          </div>
        </template>
        <div class="message-list">
          <div
            v-for="(suggestion, index) in validationResult.suggestions"
            :key="index"
            class="message-item suggestion"
          >
            <el-icon><Lightbulb /></el-icon>
            {{ suggestion }}
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 連線預覽 -->
    <div v-if="previewConnection" class="connection-preview">
      <div class="preview-header">
        <el-icon><Connection /></el-icon>
        連線預覽
      </div>
      <div class="preview-content">
        <div class="node-info source">
          <div class="node-icon">
            <el-icon><component :is="getNodeIcon(previewConnection.sourceNode)" /></el-icon>
          </div>
          <div class="node-details">
            <div class="node-name">{{ previewConnection.sourceNode.label }}</div>
            <div class="node-type">{{ getNodeTypeLabel(previewConnection.sourceNode) }}</div>
          </div>
        </div>
        
        <div class="connection-arrow">
          <el-icon class="arrow-icon" :class="{ 'valid': validationResult.isValid, 'invalid': !validationResult.isValid }">
            <ArrowRight />
          </el-icon>
        </div>
        
        <div class="node-info target">
          <div class="node-icon">
            <el-icon><component :is="getNodeIcon(previewConnection.targetNode)" /></el-icon>
          </div>
          <div class="node-details">
            <div class="node-name">{{ previewConnection.targetNode.label }}</div>
            <div class="node-type">{{ getNodeTypeLabel(previewConnection.targetNode) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按鈕 -->
    <div v-if="showActions" class="validation-actions">
      <el-button
        v-if="validationResult.isValid"
        type="primary"
        :icon="Check"
        @click="handleConfirm"
      >
        確認連線
      </el-button>
      
      <el-button
        v-else
        type="danger"
        :icon="Close"
        @click="handleCancel"
      >
        取消連線
      </el-button>
      
      <el-button
        type="info"
        :icon="showDetails ? 'ArrowUp' : 'ArrowDown'"
        @click="toggleDetails"
      >
        {{ showDetails ? '隱藏' : '顯示' }}詳情
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Check,
  Close,
  Connection,
  ArrowRight,
  WarningFilled,
  Warning,
  InfoFilled,
  Lightbulb,
  CircleCloseFilled,
  CircleCheckFilled,
  VideoPlay,
  CreditCard,
  Service,
  Tools,
  Bell
} from '@element-plus/icons-vue'
import { validateConnection, validateWorkflowConnections } from '@/utils/connectionValidator'
import type { 
  WorkflowNode, 
  WorkflowConnection, 
  ConnectionValidationResult 
} from '@/types/workflow'

// ===== Props =====

interface Props {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  previewConnection?: {
    sourceNode: WorkflowNode
    targetNode: WorkflowNode
  }
  showActions?: boolean
  showDetails?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
  showDetails: false
})

// ===== 響應式資料 =====

const activeCollapse = ref<string[]>([])
const showDetails = ref(props.showDetails)

// ===== 計算屬性 =====

const validationResult = computed((): ConnectionValidationResult => {
  if (props.previewConnection) {
    // 驗證預覽連線
    return validateConnection(
      props.previewConnection.sourceNode,
      props.previewConnection.targetNode,
      props.connections
    )
  } else {
    // 驗證整個工作流
    return validateWorkflowConnections(props.nodes, props.connections)
  }
})

const validationStatusClass = computed(() => {
  if (validationResult.value.isValid) {
    return validationResult.value.warnings.length > 0 ? 'warning' : 'success'
  }
  return 'error'
})

const validationIcon = computed(() => {
  if (validationResult.value.isValid) {
    return validationResult.value.warnings.length > 0 ? Warning : CircleCheckFilled
  }
  return WarningFilled
})

const validationStatusText = computed(() => {
  if (validationResult.value.isValid) {
    if (validationResult.value.warnings.length > 0) {
      return `連線有效，但有 ${validationResult.value.warnings.length} 個警告`
    }
    return '連線有效'
  }
  return `連線無效，有 ${validationResult.value.errors.length} 個錯誤`
})

// ===== 方法 =====

const getNodeIcon = (node: WorkflowNode) => {
  const iconMap: Record<string, any> = {
    'manualTrigger': VideoPlay,
    'webhookTrigger': VideoPlay,
    'scheduleTrigger': VideoPlay,
    'linePay': CreditCard,
    'ecPay': CreditCard,
    'newebPay': CreditCard,
    'spgateway': CreditCard,
    'taoyuanAirport': Service,
    'govOpenData': Service,
    'weatherBureau': Service,
    'taiwanRailway': Service,
    'highSpeedRail': Service,
    'healthInsurance': Service,
    'httpRequest': Tools,
    'dataTransform': Tools,
    'condition': Tools,
    'delay': Tools,
    'lineNotify': Bell,
    'email': Bell,
    'sms': Bell
  }
  
  return iconMap[node.type] || Tools
}

const getNodeTypeLabel = (node: WorkflowNode): string => {
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
  
  return typeMap[node.type] || '未知節點'
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}

const handleConfirm = () => {
  emit('confirm', props.previewConnection)
}

const handleCancel = () => {
  emit('cancel')
}

// ===== 監聽器 =====

watch(
  () => validationResult.value,
  (newResult) => {
    // 自動展開有錯誤的項目
    if (newResult.errors.length > 0) {
      activeCollapse.value = ['errors']
    } else if (newResult.warnings.length > 0) {
      activeCollapse.value = ['warnings']
    }
  },
  { immediate: true }
)

// ===== 事件 =====

const emit = defineEmits<{
  confirm: [connection?: { sourceNode: WorkflowNode; targetNode: WorkflowNode }]
  cancel: []
}>()
</script>

<style scoped lang="scss">
.connection-validator {
  background: $white;
  border: $border-width-thin solid $border-color;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.validation-indicator {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-base $spacing-lg;
  font-weight: $font-weight-medium;
  
  &.success {
    background: rgba($success-color, 0.1);
    color: $success-color;
    border-left: 4px solid $success-color;
  }
  
  &.warning {
    background: rgba($warning-color, 0.1);
    color: $warning-color;
    border-left: 4px solid $warning-color;
  }
  
  &.error {
    background: rgba($error-color, 0.1);
    color: $error-color;
    border-left: 4px solid $error-color;
  }
  
  .status-icon {
    font-size: 18px;
  }
}

.validation-details {
  border-top: $border-width-thin solid $border-color;
  
  .collapse-title {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-weight: $font-weight-medium;
    
    &.error {
      color: $error-color;
    }
    
    &.warning {
      color: $warning-color;
    }
    
    &.suggestion {
      color: $info-color;
    }
  }
  
  .message-list {
    .message-item {
      display: flex;
      align-items: flex-start;
      gap: $spacing-sm;
      padding: $spacing-sm 0;
      font-size: $font-size-sm;
      line-height: 1.5;
      
      &:not(:last-child) {
        border-bottom: $border-width-thin solid $border-color-light;
      }
      
      .el-icon {
        margin-top: 2px;
        flex-shrink: 0;
      }
      
      &.error {
        color: $error-color;
      }
      
      &.warning {
        color: $warning-color;
      }
      
      &.suggestion {
        color: $info-color;
      }
    }
  }
}

.connection-preview {
  padding: $spacing-lg;
  border-top: $border-width-thin solid $border-color;
  background: $bg-color-secondary;
  
  .preview-header {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: $spacing-base;
    font-weight: $font-weight-semibold;
    color: $text-color;
  }
  
  .preview-content {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    
    .node-info {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      flex: 1;
      
      .node-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $white;
        border-radius: $border-radius-base;
        border: $border-width-thin solid $border-color;
        
        .el-icon {
          font-size: 16px;
          color: $primary-color;
        }
      }
      
      .node-details {
        .node-name {
          font-weight: $font-weight-medium;
          color: $text-color;
          margin-bottom: 2px;
        }
        
        .node-type {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
      }
    }
    
    .connection-arrow {
      .arrow-icon {
        font-size: 20px;
        transition: color 0.2s ease;
        
        &.valid {
          color: $success-color;
        }
        
        &.invalid {
          color: $error-color;
        }
      }
    }
  }
}

.validation-actions {
  display: flex;
  gap: $spacing-sm;
  padding: $spacing-lg;
  border-top: $border-width-thin solid $border-color;
  background: $bg-color-secondary;
}

// 深色主題
[data-theme="dark"] {
  .connection-validator {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
  }
  
  .validation-details {
    border-color: var(--border-color);
    
    .message-list {
      .message-item {
        &:not(:last-child) {
          border-color: var(--border-color);
        }
      }
    }
  }
  
  .connection-preview,
  .validation-actions {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
    
    .node-info {
      .node-icon {
        background: var(--bg-color-secondary);
        border-color: var(--border-color);
      }
      
      .node-name {
        color: var(--text-color);
      }
      
      .node-type {
        color: var(--text-color-secondary);
      }
    }
  }
}
</style>
