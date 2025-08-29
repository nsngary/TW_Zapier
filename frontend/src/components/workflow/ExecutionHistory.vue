<template>
  <div class="execution-history">
    <div class="history-header">
      <h3 class="history-title">執行歷史</h3>
      <el-button 
        @click="refreshHistory" 
        :loading="loading"
        size="small"
        type="primary"
        plain
      >
        <el-icon><Refresh /></el-icon>
        重新整理
      </el-button>
    </div>

    <div class="history-content">
      <!-- 載入狀態 -->
      <div v-if="loading && executions.length === 0" class="loading-state">
        <el-skeleton :rows="3" animated />
      </div>

      <!-- 空狀態 -->
      <div v-else-if="executions.length === 0" class="empty-state">
        <el-empty description="尚無執行記錄">
          <el-button type="primary" @click="$emit('execute-workflow')">
            執行工作流
          </el-button>
        </el-empty>
      </div>

      <!-- 執行記錄列表 -->
      <div v-else class="execution-list">
        <div 
          v-for="execution in executions" 
          :key="execution.id"
          class="execution-item"
          :class="getExecutionClass(execution)"
          @click="selectExecution(execution)"
        >
          <div class="execution-main">
            <div class="execution-status">
              <el-icon class="status-icon">
                <Loading v-if="execution.status === 'RUNNING' || execution.status === 'PENDING'" />
                <CircleCheck v-else-if="execution.status === 'SUCCESS'" />
                <CircleClose v-else-if="execution.status === 'FAILED'" />
                <Clock v-else />
              </el-icon>
              <span class="status-text">{{ getStatusText(execution.status) }}</span>
            </div>

            <div class="execution-info">
              <div class="execution-id">{{ execution.id.slice(0, 8) }}...</div>
              <div class="execution-time">{{ formatTime(execution.started_at) }}</div>
              <div v-if="execution.duration" class="execution-duration">
                {{ formatDuration(execution.duration) }}
              </div>
            </div>
          </div>

          <!-- 展開的詳細信息 -->
          <div v-if="selectedExecution?.id === execution.id" class="execution-details">
            <ExecutionStatus :execution="execution" />
          </div>
        </div>
      </div>

      <!-- 分頁 -->
      <div v-if="total > limit" class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="limit"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { 
  Loading, 
  CircleCheck, 
  CircleClose, 
  Clock,
  Refresh 
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ExecutionStatus from './ExecutionStatus.vue'
import { useWorkflowDatabase } from '@/composables/useWorkflowDatabase'

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
  workflowId?: string
}

const props = withDefaults(defineProps<Props>(), {
  workflowId: ''
})

// Emits
const emit = defineEmits<{
  'execute-workflow': []
}>()

// 響應式數據
const loading = ref(false)
const executions = ref<WorkflowExecution[]>([])
const selectedExecution = ref<WorkflowExecution | null>(null)
const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)

// 使用 composable
const workflowDatabase = useWorkflowDatabase()

// 計算屬性
const targetWorkflowId = computed(() => 
  props.workflowId || workflowDatabase.currentWorkflowId.value
)

// 方法
const loadExecutions = async () => {
  if (!targetWorkflowId.value) {
    return
  }

  try {
    loading.value = true
    const skip = (currentPage.value - 1) * limit.value
    
    const result = await workflowDatabase.getWorkflowExecutions(targetWorkflowId.value)
    
    // 假設 API 返回的是數組，實際可能需要根據後端 API 調整
    executions.value = Array.isArray(result) ? result : result.items || []
    total.value = result.total || executions.value.length
    
  } catch (error: any) {
    console.error('載入執行歷史失敗:', error)
    ElMessage.error(error.message || '載入執行歷史失敗')
  } finally {
    loading.value = false
  }
}

const refreshHistory = () => {
  loadExecutions()
}

const selectExecution = (execution: WorkflowExecution) => {
  if (selectedExecution.value?.id === execution.id) {
    selectedExecution.value = null
  } else {
    selectedExecution.value = execution
  }
}

const getExecutionClass = (execution: WorkflowExecution) => {
  return {
    'execution-running': execution.status === 'RUNNING' || execution.status === 'PENDING',
    'execution-success': execution.status === 'SUCCESS',
    'execution-failed': execution.status === 'FAILED',
    'execution-selected': selectedExecution.value?.id === execution.id
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING': return '等待中'
    case 'RUNNING': return '執行中'
    case 'SUCCESS': return '成功'
    case 'FAILED': return '失敗'
    case 'CANCELLED': return '已取消'
    default: return '未知'
  }
}

const formatTime = (timeString: string) => {
  const date = new Date(timeString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 如果是今天
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString('zh-TW', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  // 如果是本週
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString('zh-TW', { 
      weekday: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
  
  // 其他情況
  return date.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDuration = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`
  } else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadExecutions()
}

const handleSizeChange = (size: number) => {
  limit.value = size
  currentPage.value = 1
  loadExecutions()
}

// 生命週期
onMounted(() => {
  if (targetWorkflowId.value) {
    loadExecutions()
  }
})

// 監聽工作流 ID 變化
watch(() => targetWorkflowId.value, (newId) => {
  if (newId) {
    currentPage.value = 1
    loadExecutions()
  } else {
    executions.value = []
    total.value = 0
  }
})
</script>

<style scoped>
.execution-history {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--el-border-color);
}

.history-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.history-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.loading-state,
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.execution-list {
  flex: 1;
  overflow-y: auto;
}

.execution-item {
  border-bottom: 1px solid var(--el-border-color-lighter);
  cursor: pointer;
  transition: background-color 0.2s;
}

.execution-item:hover {
  background-color: var(--el-fill-color-lighter);
}

.execution-item.execution-selected {
  background-color: var(--el-color-primary-light-9);
}

.execution-main {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}

.execution-status {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 80px;
}

.status-icon {
  font-size: 14px;
}

.execution-running .status-icon {
  color: var(--el-color-primary);
  animation: spin 1s linear infinite;
}

.execution-success .status-icon {
  color: var(--el-color-success);
}

.execution-failed .status-icon {
  color: var(--el-color-danger);
}

.status-text {
  font-size: 12px;
  font-weight: 500;
}

.execution-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.execution-id {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.execution-time {
  font-size: 11px;
  color: var(--el-text-color-secondary);
}

.execution-duration {
  font-size: 11px;
  color: var(--el-color-success);
  font-weight: 500;
}

.execution-details {
  border-top: 1px solid var(--el-border-color-lighter);
  background-color: var(--el-fill-color-extra-light);
}

.pagination {
  padding: 16px;
  border-top: 1px solid var(--el-border-color);
  display: flex;
  justify-content: center;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
