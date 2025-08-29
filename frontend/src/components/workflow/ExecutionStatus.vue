<template>
  <div class="execution-status">
    <!-- 執行狀態指示器 -->
    <div class="status-indicator" :class="statusClass">
      <el-icon class="status-icon">
        <Loading v-if="isRunning" />
        <CircleCheck v-else-if="isSuccess" />
        <CircleClose v-else-if="isError" />
        <Clock v-else />
      </el-icon>
      <span class="status-text">{{ statusText }}</span>
    </div>

    <!-- 執行詳情 -->
    <div v-if="execution" class="execution-details">
      <div class="detail-item">
        <span class="label">執行ID:</span>
        <span class="value">{{ execution.id }}</span>
      </div>
      <div class="detail-item">
        <span class="label">開始時間:</span>
        <span class="value">{{ formatTime(execution.started_at) }}</span>
      </div>
      <div v-if="execution.finished_at" class="detail-item">
        <span class="label">完成時間:</span>
        <span class="value">{{ formatTime(execution.finished_at) }}</span>
      </div>
      <div v-if="execution.duration" class="detail-item">
        <span class="label">執行時間:</span>
        <span class="value">{{ formatDuration(execution.duration) }}</span>
      </div>
    </div>

    <!-- 執行結果 -->
    <div v-if="execution?.result_data" class="execution-result">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item name="result" title="執行結果">
          <pre class="result-content">{{ formatResult(execution.result_data) }}</pre>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- 錯誤信息 -->
    <div v-if="execution?.error_message" class="execution-error">
      <el-alert
        :title="execution.error_message"
        type="error"
        :description="execution.error_details"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { 
  Loading, 
  CircleCheck, 
  CircleClose, 
  Clock 
} from '@element-plus/icons-vue'

// 定義執行狀態類型
interface WorkflowExecution {
  id: string
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED'
  started_at: string
  finished_at?: string
  duration?: number
  result_data?: any
  error_message?: string
  error_details?: string
}

// Props
interface Props {
  execution?: WorkflowExecution | null
}

const props = withDefaults(defineProps<Props>(), {
  execution: null
})

// 響應式數據
const activeCollapse = ref<string[]>([])

// 計算屬性
const isRunning = computed(() => 
  props.execution?.status === 'RUNNING' || props.execution?.status === 'PENDING'
)

const isSuccess = computed(() => 
  props.execution?.status === 'SUCCESS'
)

const isError = computed(() => 
  props.execution?.status === 'FAILED'
)

const statusClass = computed(() => {
  if (isRunning.value) return 'running'
  if (isSuccess.value) return 'success'
  if (isError.value) return 'error'
  return 'idle'
})

const statusText = computed(() => {
  if (!props.execution) return '未執行'
  
  switch (props.execution.status) {
    case 'PENDING':
      return '等待執行'
    case 'RUNNING':
      return '執行中'
    case 'SUCCESS':
      return '執行成功'
    case 'FAILED':
      return '執行失敗'
    case 'CANCELLED':
      return '已取消'
    default:
      return '未知狀態'
  }
})

// 方法
const formatTime = (timeString: string): string => {
  return new Date(timeString).toLocaleString('zh-TW')
}

const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)} 秒`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes} 分 ${remainingSeconds.toFixed(1)} 秒`
  } else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours} 小時 ${minutes} 分`
  }
}

const formatResult = (result: any): string => {
  return JSON.stringify(result, null, 2)
}
</script>

<style scoped>
.execution-status {
  padding: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  background: var(--el-bg-color);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
}

.status-indicator.idle {
  background: var(--el-color-info-light-9);
  color: var(--el-color-info);
}

.status-indicator.running {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.status-indicator.success {
  background: var(--el-color-success-light-9);
  color: var(--el-color-success);
}

.status-indicator.error {
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.status-icon {
  font-size: 16px;
}

.execution-details {
  margin-bottom: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.value {
  color: var(--el-text-color-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
}

.execution-result {
  margin-bottom: 16px;
}

.result-content {
  background: var(--el-fill-color-lighter);
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.4;
  max-height: 300px;
  overflow-y: auto;
}

.execution-error {
  margin-top: 16px;
}

/* 動畫效果 */
.status-indicator.running .status-icon {
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
