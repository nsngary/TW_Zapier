<template>
  <div 
    class="taiwan-node line-pay-node"
    :class="{ 
      'selected': selected,
      'has-error': hasError,
      'executing': isExecuting
    }"
  >
    <!-- 節點標頭 -->
    <div class="node-header">
      <div class="node-icon">
        <img src="/icons/line-pay.svg" alt="Line Pay" />
      </div>
      <div class="node-title">
        <div class="node-name">{{ data.label || 'Line Pay' }}</div>
        <div class="node-type">台灣行動支付</div>
      </div>
      <div class="node-status">
        <el-icon v-if="hasError" class="error-icon" color="#ef4444">
          <WarningFilled />
        </el-icon>
        <el-icon v-else-if="isExecuting" class="executing-icon" color="#3b82f6">
          <Loading />
        </el-icon>
        <el-icon v-else class="success-icon" color="#10b981">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </div>

    <!-- 節點內容 -->
    <div class="node-content">
      <div class="node-field">
        <div class="field-label">付款金額</div>
        <div class="field-value">
          {{ formatAmount(data.amount) || '未設定' }}
        </div>
      </div>
      
      <div class="node-field">
        <div class="field-label">商品名稱</div>
        <div class="field-value">
          {{ data.productName || '未設定' }}
        </div>
      </div>
      
      <div v-if="data.orderId" class="node-field">
        <div class="field-label">訂單編號</div>
        <div class="field-value">
          {{ data.orderId }}
        </div>
      </div>
    </div>

    <!-- 連接點 -->
    <Handle 
      type="target" 
      :position="Position.Left" 
      class="taiwan-handle input-handle"
      :style="{ background: '#06d6a0' }"
    />
    
    <Handle 
      type="source" 
      :position="Position.Right" 
      class="taiwan-handle output-handle"
      :style="{ background: '#06d6a0' }"
    />

    <!-- 執行進度指示器 -->
    <div v-if="isExecuting" class="execution-progress">
      <div class="progress-bar"></div>
    </div>

    <!-- 錯誤指示器 -->
    <div v-if="hasError" class="error-indicator">
      <el-tooltip :content="errorMessage" placement="top">
        <el-icon color="#ef4444">
          <WarningFilled />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { 
  WarningFilled, 
  CircleCheckFilled, 
  Loading 
} from '@element-plus/icons-vue'
import type { LinePayNodeData } from '@/types/workflow'

// Props
interface Props {
  id: string
  data: LinePayNodeData
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
  update: [id: string, data: Partial<LinePayNodeData>]
}>()

// 計算屬性
const nodeData = computed(() => props.data)

// 方法：格式化金額
function formatAmount(amount?: number): string {
  if (!amount) return ''
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0
  }).format(amount)
}

// 方法：處理雙擊編輯
function handleDoubleClick() {
  // 觸發屬性面板開啟
  emit('update', props.id, {})
}
</script>

<style scoped>
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
  border-color: var(--color-primary);
  box-shadow: 0 8px 25px -5px rgba(134, 115, 94, 0.2);
  transform: translateY(-2px);
}

.taiwan-node.selected {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.2);
}

.taiwan-node.has-error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.taiwan-node.executing {
  border-color: var(--color-info);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.node-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, var(--color-accent-orange) 0%, var(--color-primary) 100%);
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

.node-status {
  flex-shrink: 0;
}

.node-content {
  padding: 16px;
  background: var(--bg-color);
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
  color: var(--text-color-tertiary);
  font-weight: 500;
  flex-shrink: 0;
}

.field-value {
  font-size: 12px;
  color: var(--text-color);
  font-weight: 500;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

/* 連接點樣式 */
.taiwan-handle {
  width: 12px;
  height: 12px;
  border: 2px solid var(--bg-color);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.taiwan-handle:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(134, 115, 94, 0.3);
}

.input-handle {
  left: -6px;
}

.output-handle {
  right: -6px;
}

/* 執行進度指示器 */
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
  background: linear-gradient(90deg, #3b82f6, #06d6a0);
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

/* 錯誤指示器 */
.error-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 圖示動畫 */
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

/* 響應式設計 */
@media (max-width: 768px) {
  .taiwan-node {
    min-width: 160px;
  }
  
  .node-header {
    padding: 10px 12px;
  }
  
  .node-content {
    padding: 12px;
  }
  
  .node-field {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .field-value {
    text-align: left;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .taiwan-node {
    background: #1f2937;
    border-color: #374151;
  }
  
  .node-content {
    background: #1f2937;
  }
  
  .field-label {
    color: #9ca3af;
  }
  
  .field-value {
    color: #f3f4f6;
  }
}
</style>
