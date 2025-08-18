<template>
  <div class="workflow-preview">
    <!-- 預覽標題 -->
    <div class="preview-header">
      <div class="header-left">
        <el-icon class="preview-icon"><View /></el-icon>
        <h3 class="preview-title">工作流預覽</h3>
        <el-tag
          :type="executionStatusType"
          size="small"
          effect="plain"
        >
          {{ executionStatusText }}
        </el-tag>
      </div>
      
      <div class="header-actions">
        <el-button
          v-if="!isExecuting"
          type="primary"
          size="small"
          :icon="VideoPlay"
          @click="startPreview"
        >
          開始預覽
        </el-button>
        
        <el-button
          v-else
          type="danger"
          size="small"
          :icon="VideoPause"
          @click="stopPreview"
        >
          停止預覽
        </el-button>
        
        <el-button
          size="small"
          :icon="Refresh"
          @click="resetPreview"
        >
          重置
        </el-button>
      </div>
    </div>

    <!-- 執行進度 -->
    <div v-if="isExecuting || executionHistory.length > 0" class="execution-progress">
      <el-progress
        :percentage="executionProgress"
        :status="executionProgressStatus"
        :stroke-width="8"
        :show-text="true"
      />
      
      <div class="progress-info">
        <span>已執行: {{ completedNodes.length }} / {{ totalNodes }}</span>
        <span v-if="currentExecutingNode">
          正在執行: {{ currentExecutingNode.label }}
        </span>
      </div>
    </div>

    <!-- 執行時間軸 -->
    <div class="execution-timeline">
      <el-timeline>
        <el-timeline-item
          v-for="(step, index) in executionHistory"
          :key="index"
          :timestamp="step.timestamp"
          :type="getTimelineItemType(step.status)"
          :icon="getTimelineItemIcon(step.status)"
          :color="getTimelineItemColor(step.status)"
        >
          <div class="timeline-content">
            <div class="step-header">
              <span class="step-title">{{ step.nodeName }}</span>
              <el-tag
                :type="getStepTagType(step.status)"
                size="small"
                effect="plain"
              >
                {{ getStepStatusText(step.status) }}
              </el-tag>
            </div>
            
            <div v-if="step.description" class="step-description">
              {{ step.description }}
            </div>
            
            <div v-if="step.duration" class="step-duration">
              執行時間: {{ step.duration }}ms
            </div>
            
            <!-- 執行結果 -->
            <div v-if="step.result" class="step-result">
              <el-collapse v-model="activeCollapses[index]" size="small">
                <el-collapse-item :name="`result-${index}`" title="執行結果">
                  <pre class="result-data">{{ formatResult(step.result) }}</pre>
                </el-collapse-item>
              </el-collapse>
            </div>
            
            <!-- 錯誤訊息 -->
            <div v-if="step.error" class="step-error">
              <el-alert
                :title="step.error.message"
                type="error"
                :description="step.error.details"
                show-icon
                :closable="false"
              />
            </div>
          </div>
        </el-timeline-item>
        
        <!-- 當前執行節點 -->
        <el-timeline-item
          v-if="currentExecutingNode"
          :timestamp="new Date().toLocaleTimeString()"
          type="primary"
          :icon="Loading"
          color="#409eff"
        >
          <div class="timeline-content executing">
            <div class="step-header">
              <span class="step-title">{{ currentExecutingNode.label }}</span>
              <el-tag type="primary" size="small" effect="plain">
                執行中
              </el-tag>
            </div>
            <div class="step-description">
              正在執行節點操作...
            </div>
            <el-progress
              :percentage="currentNodeProgress"
              :show-text="false"
              :stroke-width="4"
              status="success"
            />
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>

    <!-- 執行統計 -->
    <div v-if="executionStats" class="execution-stats">
      <div class="stats-title">
        <el-icon><DataAnalysis /></el-icon>
        執行統計
      </div>
      
      <el-row :gutter="16">
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-value">{{ executionStats.totalNodes }}</div>
            <div class="stat-label">總節點數</div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-item success">
            <div class="stat-value">{{ executionStats.successNodes }}</div>
            <div class="stat-label">成功執行</div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-item error">
            <div class="stat-value">{{ executionStats.errorNodes }}</div>
            <div class="stat-label">執行失敗</div>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="stat-item">
            <div class="stat-value">{{ executionStats.totalDuration }}ms</div>
            <div class="stat-label">總執行時間</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 空狀態 -->
    <div v-if="!isExecuting && executionHistory.length === 0" class="empty-state">
      <el-empty
        description="點擊「開始預覽」來模擬工作流執行"
        :image-size="120"
      >
        <template #image>
          <el-icon class="empty-icon"><VideoPlay /></el-icon>
        </template>
      </el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  View,
  VideoPlay,
  VideoPause,
  Refresh,
  Loading,
  DataAnalysis,
  CircleCheckFilled,
  CircleCloseFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { WorkflowNode, WorkflowConnection } from '@/types/workflow'

// ===== Props =====

interface Props {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  autoStart?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoStart: false
})

// ===== 執行步驟介面 =====

interface ExecutionStep {
  nodeId: string
  nodeName: string
  status: 'pending' | 'running' | 'success' | 'error' | 'skipped'
  timestamp: string
  description?: string
  duration?: number
  result?: any
  error?: {
    message: string
    details?: string
  }
}

interface ExecutionStats {
  totalNodes: number
  successNodes: number
  errorNodes: number
  skippedNodes: number
  totalDuration: number
}

// ===== 響應式資料 =====

const isExecuting = ref(false)
const executionHistory = ref<ExecutionStep[]>([])
const currentExecutingNode = ref<WorkflowNode | null>(null)
const currentNodeProgress = ref(0)
const activeCollapses = ref<Record<number, string[]>>({})

// ===== 計算屬性 =====

const totalNodes = computed(() => props.nodes.length)

const completedNodes = computed(() => 
  executionHistory.value.filter(step => 
    ['success', 'error', 'skipped'].includes(step.status)
  )
)

const executionProgress = computed(() => {
  if (totalNodes.value === 0) return 0
  return Math.round((completedNodes.value.length / totalNodes.value) * 100)
})

const executionProgressStatus = computed(() => {
  const hasError = executionHistory.value.some(step => step.status === 'error')
  if (hasError) return 'exception'
  if (executionProgress.value === 100) return 'success'
  return undefined
})

const executionStatusType = computed(() => {
  if (isExecuting.value) return 'primary'
  if (executionHistory.value.length === 0) return 'info'
  
  const hasError = executionHistory.value.some(step => step.status === 'error')
  if (hasError) return 'danger'
  
  return 'success'
})

const executionStatusText = computed(() => {
  if (isExecuting.value) return '執行中'
  if (executionHistory.value.length === 0) return '未執行'
  
  const hasError = executionHistory.value.some(step => step.status === 'error')
  if (hasError) return '執行失敗'
  
  return '執行完成'
})

const executionStats = computed((): ExecutionStats | null => {
  if (executionHistory.value.length === 0) return null
  
  const stats = {
    totalNodes: totalNodes.value,
    successNodes: 0,
    errorNodes: 0,
    skippedNodes: 0,
    totalDuration: 0
  }
  
  executionHistory.value.forEach(step => {
    switch (step.status) {
      case 'success':
        stats.successNodes++
        break
      case 'error':
        stats.errorNodes++
        break
      case 'skipped':
        stats.skippedNodes++
        break
    }
    
    if (step.duration) {
      stats.totalDuration += step.duration
    }
  })
  
  return stats
})

// ===== 方法 =====

const startPreview = async () => {
  if (props.nodes.length === 0) {
    ElMessage.warning('工作流中沒有節點')
    return
  }
  
  isExecuting.value = true
  executionHistory.value = []
  currentExecutingNode.value = null
  
  try {
    // 找到觸發節點
    const triggerNodes = props.nodes.filter(node => 
      ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
    )
    
    if (triggerNodes.length === 0) {
      throw new Error('工作流中沒有觸發節點')
    }
    
    // 從觸發節點開始執行
    for (const triggerNode of triggerNodes) {
      await executeNode(triggerNode)
    }
    
    ElMessage.success('工作流預覽執行完成')
  } catch (error) {
    ElMessage.error(`預覽執行失敗: ${error}`)
  } finally {
    isExecuting.value = false
    currentExecutingNode.value = null
  }
}

const stopPreview = () => {
  isExecuting.value = false
  currentExecutingNode.value = null
  ElMessage.info('預覽執行已停止')
}

const resetPreview = () => {
  isExecuting.value = false
  executionHistory.value = []
  currentExecutingNode.value = null
  currentNodeProgress.value = 0
  activeCollapses.value = {}
}

const executeNode = async (node: WorkflowNode): Promise<void> => {
  currentExecutingNode.value = node
  currentNodeProgress.value = 0
  
  const step: ExecutionStep = {
    nodeId: node.id,
    nodeName: node.label || node.type,
    status: 'running',
    timestamp: new Date().toLocaleTimeString(),
    description: getNodeDescription(node)
  }
  
  executionHistory.value.push(step)
  
  try {
    // 模擬節點執行
    const startTime = Date.now()
    
    // 模擬進度更新
    for (let i = 0; i <= 100; i += 20) {
      currentNodeProgress.value = i
      await new Promise(resolve => setTimeout(resolve, 100))
      
      if (!isExecuting.value) {
        step.status = 'skipped'
        return
      }
    }
    
    const duration = Date.now() - startTime
    
    // 模擬執行結果
    const result = await simulateNodeExecution(node)
    
    // 更新步驟狀態
    step.status = 'success'
    step.duration = duration
    step.result = result
    
    // 執行下一個節點
    const nextNodes = getNextNodes(node)
    for (const nextNode of nextNodes) {
      if (isExecuting.value) {
        await executeNode(nextNode)
      }
    }
    
  } catch (error) {
    step.status = 'error'
    step.error = {
      message: `節點執行失敗: ${error}`,
      details: error instanceof Error ? error.stack : undefined
    }
  }
}

const simulateNodeExecution = async (node: WorkflowNode): Promise<any> => {
  // 根據節點類型模擬不同的執行結果
  switch (node.type) {
    case 'manualTrigger':
      return { triggered: true, timestamp: new Date().toISOString() }
    
    case 'linePay':
      return {
        paymentId: 'LP' + Date.now(),
        amount: node.amount || 100,
        status: 'success',
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9)
      }
    
    case 'httpRequest':
      return {
        status: 200,
        data: { message: 'Request successful' },
        headers: { 'content-type': 'application/json' }
      }
    
    case 'dataTransform':
      return {
        transformed: true,
        outputFields: Object.keys(node.values || {}),
        recordCount: 1
      }
    
    default:
      return { executed: true, nodeType: node.type }
  }
}

const getNextNodes = (currentNode: WorkflowNode): WorkflowNode[] => {
  const nextNodeIds = props.connections
    .filter(conn => conn.source === currentNode.id)
    .map(conn => conn.target)
  
  return props.nodes.filter(node => nextNodeIds.includes(node.id))
}

const getNodeDescription = (node: WorkflowNode): string => {
  const descriptions: Record<string, string> = {
    'manualTrigger': '等待手動觸發',
    'webhookTrigger': '等待 Webhook 請求',
    'scheduleTrigger': '按排程觸發',
    'linePay': '處理 Line Pay 付款',
    'ecPay': '處理綠界科技付款',
    'httpRequest': '發送 HTTP 請求',
    'dataTransform': '轉換資料格式',
    'condition': '檢查條件',
    'email': '發送電子郵件',
    'lineNotify': '發送 Line 通知'
  }
  
  return descriptions[node.type] || '執行節點操作'
}

const getTimelineItemType = (status: string) => {
  const typeMap: Record<string, string> = {
    'success': 'success',
    'error': 'danger',
    'running': 'primary',
    'skipped': 'warning'
  }
  return typeMap[status] || 'info'
}

const getTimelineItemIcon = (status: string) => {
  const iconMap: Record<string, any> = {
    'success': CircleCheckFilled,
    'error': CircleCloseFilled,
    'running': Loading,
    'skipped': WarningFilled
  }
  return iconMap[status] || CircleCheckFilled
}

const getTimelineItemColor = (status: string) => {
  const colorMap: Record<string, string> = {
    'success': '#67c23a',
    'error': '#f56c6c',
    'running': '#409eff',
    'skipped': '#e6a23c'
  }
  return colorMap[status] || '#909399'
}

const getStepTagType = (status: string) => {
  const typeMap: Record<string, any> = {
    'success': 'success',
    'error': 'danger',
    'running': 'primary',
    'skipped': 'warning'
  }
  return typeMap[status] || 'info'
}

const getStepStatusText = (status: string) => {
  const textMap: Record<string, string> = {
    'success': '成功',
    'error': '失敗',
    'running': '執行中',
    'skipped': '跳過'
  }
  return textMap[status] || '未知'
}

const formatResult = (result: any): string => {
  return JSON.stringify(result, null, 2)
}

// ===== 監聽器 =====

watch(
  () => props.autoStart,
  (autoStart) => {
    if (autoStart && !isExecuting.value) {
      startPreview()
    }
  },
  { immediate: true }
)

// ===== 事件 =====

const emit = defineEmits<{
  'execution-start': []
  'execution-complete': [stats: ExecutionStats]
  'execution-error': [error: string]
}>()
</script>

<style scoped lang="scss">
.workflow-preview {
  background: $white;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  background: $bg-color-secondary;
  border-bottom: $border-width-thin solid $border-color;
  
  .header-left {
    display: flex;
    align-items: center;
    gap: $spacing-base;
    
    .preview-icon {
      font-size: 20px;
      color: $primary-color;
    }
    
    .preview-title {
      margin: 0;
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      color: $text-color;
    }
  }
  
  .header-actions {
    display: flex;
    gap: $spacing-sm;
  }
}

.execution-progress {
  padding: $spacing-lg;
  background: $bg-color-secondary;
  border-bottom: $border-width-thin solid $border-color;
  
  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-top: $spacing-sm;
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

.execution-timeline {
  padding: $spacing-lg;
  max-height: 400px;
  overflow-y: auto;
  
  .timeline-content {
    .step-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $spacing-xs;
      
      .step-title {
        font-weight: $font-weight-medium;
        color: $text-color;
      }
    }
    
    .step-description {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      margin-bottom: $spacing-xs;
    }
    
    .step-duration {
      font-size: $font-size-xs;
      color: $text-color-tertiary;
      margin-bottom: $spacing-sm;
    }
    
    .step-result {
      margin-top: $spacing-sm;
      
      .result-data {
        background: $bg-color-secondary;
        padding: $spacing-sm;
        border-radius: $border-radius-sm;
        font-size: $font-size-xs;
        max-height: 200px;
        overflow-y: auto;
      }
    }
    
    .step-error {
      margin-top: $spacing-sm;
    }
    
    &.executing {
      .step-title {
        color: $primary-color;
      }
    }
  }
}

.execution-stats {
  padding: $spacing-lg;
  background: $bg-color-secondary;
  border-top: $border-width-thin solid $border-color;
  
  .stats-title {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: $spacing-lg;
    font-weight: $font-weight-semibold;
    color: $text-color;
  }
  
  .stat-item {
    text-align: center;
    padding: $spacing-base;
    background: $white;
    border-radius: $border-radius-base;
    border: $border-width-thin solid $border-color;
    
    .stat-value {
      font-size: $font-size-xl;
      font-weight: $font-weight-bold;
      color: $text-color;
      margin-bottom: $spacing-xs;
    }
    
    .stat-label {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
    
    &.success {
      border-color: $success-color;
      
      .stat-value {
        color: $success-color;
      }
    }
    
    &.error {
      border-color: $error-color;
      
      .stat-value {
        color: $error-color;
      }
    }
  }
}

.empty-state {
  padding: $spacing-xl;
  text-align: center;
  
  .empty-icon {
    font-size: 80px;
    color: $text-color-tertiary;
  }
}

// 深色主題
[data-theme="dark"] {
  .workflow-preview {
    background: var(--bg-color-secondary);
  }
  
  .preview-header,
  .execution-progress,
  .execution-stats {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
  }
  
  .preview-title {
    color: var(--text-color);
  }
  
  .timeline-content {
    .step-header .step-title {
      color: var(--text-color);
    }
    
    .step-description {
      color: var(--text-color-secondary);
    }
    
    .step-result .result-data {
      background: var(--bg-color-secondary);
    }
  }
  
  .stat-item {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
    
    .stat-value {
      color: var(--text-color);
    }
    
    .stat-label {
      color: var(--text-color-secondary);
    }
  }
}
</style>
