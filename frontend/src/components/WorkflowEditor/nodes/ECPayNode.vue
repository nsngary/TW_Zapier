<template>
  <div 
    class="taiwan-node ecpay-node"
    :class="{ 
      'selected': selected,
      'has-error': hasError,
      'executing': isExecuting
    }"
  >
    <!-- 節點標頭 -->
    <div class="node-header">
      <div class="node-icon">
        <img src="/icons/ecpay.svg" alt="ECPay" />
      </div>
      <div class="node-title">
        <div class="node-name">{{ data.label || '綠界科技' }}</div>
        <div class="node-type">台灣金流服務</div>
      </div>
      <div class="node-status">
        <el-icon v-if="hasError" class="error-icon" color="#ef4444">
          <WarningFilled />
        </el-icon>
        <el-icon v-else-if="isExecuting" class="executing-icon" color="#3b82f6">
          <Loading />
        </el-icon>
        <el-icon v-else class="success-icon" color="#f59e0b">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </div>

    <!-- 節點內容 -->
    <div class="node-content">
      <div class="node-field">
        <div class="field-label">交易金額</div>
        <div class="field-value">
          {{ formatAmount(data.totalAmount) || '未設定' }}
        </div>
      </div>
      
      <div class="node-field">
        <div class="field-label">交易編號</div>
        <div class="field-value">
          {{ data.merchantTradeNo || '未設定' }}
        </div>
      </div>
      
      <div class="node-field">
        <div class="field-label">付款方式</div>
        <div class="field-value">
          {{ getPaymentTypeLabel(data.paymentType) }}
        </div>
      </div>
    </div>

    <!-- 連接點 -->
    <Handle 
      type="target" 
      :position="Position.Left" 
      class="taiwan-handle input-handle"
      :style="{ background: '#f59e0b' }"
    />
    
    <Handle 
      type="source" 
      :position="Position.Right" 
      class="taiwan-handle output-handle"
      :style="{ background: '#f59e0b' }"
    />

    <!-- 執行進度指示器 -->
    <div v-if="isExecuting" class="execution-progress">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { 
  WarningFilled, 
  CircleCheckFilled, 
  Loading 
} from '@element-plus/icons-vue'
import type { ECPayNodeData } from '@/types/workflow'

// Props
interface Props {
  id: string
  data: ECPayNodeData
  selected?: boolean
  isExecuting?: boolean
  hasError?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  isExecuting: false,
  hasError: false,
  errorMessage: ''
})

// Emits
const emit = defineEmits<{
  update: [id: string, data: Partial<ECPayNodeData>]
}>()

// 方法：格式化金額
function formatAmount(amount?: number): string {
  if (!amount) return ''
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0
  }).format(amount)
}

// 方法：取得付款方式標籤
function getPaymentTypeLabel(type?: string): string {
  const labels: Record<string, string> = {
    aio: '全功能',
    credit: '信用卡',
    atm: 'ATM',
    cvs: '超商代碼'
  }
  
  return labels[type || 'aio'] || '全功能'
}
</script>

<style scoped>
.ecpay-node {
  min-width: 200px;
}

.ecpay-node .node-header {
  background: linear-gradient(135deg, var(--color-warning) 0%, #d97706 100%);
}

.ecpay-node:hover {
  border-color: var(--color-warning);
  box-shadow: 0 8px 25px -5px rgba(245, 158, 11, 0.2);
}

.ecpay-node.selected {
  border-color: var(--color-warning);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
}

/* 其他樣式繼承自基礎節點樣式 */
.taiwan-node {
  min-width: 200px;
  background: var(--bg-color);
  border: 2px solid var(--border-color-light);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px var(--shadow-color);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.taiwan-node:hover {
  transform: translateY(-2px);
}

.node-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: white;
}

.node-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  flex-shrink: 0;
}

.node-icon img {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

.node-title {
  flex: 1;
  min-width: 0;
}

.node-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-type {
  font-size: 11px;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-content {
  padding: 16px;
  background: white;
}

.node-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  gap: 12px;
}

.node-field:last-child {
  margin-bottom: 0;
}

.field-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  flex-shrink: 0;
}

.field-value {
  font-size: 12px;
  color: #374151;
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.taiwan-handle {
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.taiwan-handle:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.3);
}

.input-handle {
  left: -6px;
}

.output-handle {
  right: -6px;
}

.execution-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #e5e7eb;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #d97706);
  animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.executing-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
