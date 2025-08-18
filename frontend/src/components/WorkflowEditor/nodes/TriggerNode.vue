<template>
  <div 
    class="taiwan-node trigger-node"
    :class="{ 
      'selected': selected,
      'has-error': hasError,
      'executing': isExecuting
    }"
  >
    <!-- 節點標頭 -->
    <div class="node-header">
      <div class="node-icon">
        <el-icon>
          <VideoPlay v-if="data.type === 'manual'" />
          <Link v-else-if="data.type === 'webhook'" />
          <Timer v-else />
        </el-icon>
      </div>
      <div class="node-title">
        <div class="node-name">{{ data.label || '觸發節點' }}</div>
        <div class="node-type">{{ getNodeTypeLabel() }}</div>
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
      <div class="trigger-info">
        <div class="info-text">
          {{ getTriggerDescription() }}
        </div>
      </div>
    </div>

    <!-- 連接點 -->
    <Handle 
      type="source" 
      :position="Position.Right" 
      class="taiwan-handle output-handle"
      :style="{ background: '#10b981' }"
    />

    <!-- 執行進度指示器 -->
    <div v-if="isExecuting" class="execution-progress">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { 
  VideoPlay,
  Link,
  Timer,
  WarningFilled, 
  CircleCheckFilled, 
  Loading 
} from '@element-plus/icons-vue'

// Props
interface Props {
  id: string
  data: any
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
  update: [id: string, data: any]
}>()

// 方法：取得節點類型標籤
function getNodeTypeLabel(): string {
  const typeLabels: Record<string, string> = {
    manual: '手動觸發',
    webhook: 'Webhook 觸發',
    schedule: '定時觸發'
  }
  
  return typeLabels[props.data.type] || '觸發節點'
}

// 方法：取得觸發描述
function getTriggerDescription(): string {
  const descriptions: Record<string, string> = {
    manual: '點擊執行按鈕啟動工作流',
    webhook: '透過 HTTP 請求觸發工作流',
    schedule: '按照時間排程自動執行'
  }
  
  return descriptions[props.data.type] || '工作流起始點'
}
</script>

<style scoped>
.trigger-node {
  min-width: 180px;
}

.trigger-node .node-header {
  background: linear-gradient(135deg, var(--color-success) 0%, #059669 100%);
}

.trigger-info {
  padding: 8px 0;
}

.info-text {
  font-size: 12px;
  color: var(--text-color-tertiary);
  text-align: center;
  line-height: 1.4;
}

/* 其他樣式繼承自 LinePayNode.vue */
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

.taiwan-handle {
  width: 12px;
  height: 12px;
  border: 2px solid white;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.taiwan-handle:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3);
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
  background: linear-gradient(90deg, #3b82f6, #10b981);
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
