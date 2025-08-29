<template>
  <div class="dashboard-page">
    <!-- 頁面標題 -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">儀表板</h1>
          <p class="page-subtitle">歡迎回來，{{ username }}！管理您的自動化工作流程</p>
        </div>
        
        <div class="header-actions">
          <BaseButton
            variant="ghost"
            size="sm"
            @click="handleLogout"
            class="logout-btn"
          >
            登出
          </BaseButton>
          <BaseButton
            variant="primary"
            @click="navigateToEditor"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/>
            </svg>
            建立工作流
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- 統計卡片區域 -->
    <div class="stats-section">
      <div class="stats-grid">
        <BaseCard
          v-for="stat in stats"
          :key="stat.id"
          class="stat-card"
          variant="shadow"
          hoverable
        >
          <div class="stat-content">
            <div class="stat-icon" :class="`stat-${stat.type}`">
              <component :is="stat.icon" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-change" :class="stat.changeType">
                <component :is="stat.changeIcon" />
                {{ stat.change }}
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="main-content">
      <div class="content-grid">
        <!-- 已儲存的工作流 -->
        <BaseCard class="recent-workflows" variant="shadow" title="已儲存的工作流">
          <template #actions>
            <BaseButton variant="ghost" size="sm" @click="loadUserWorkflows" :disabled="isLoadingWorkflows">
              {{ isLoadingWorkflows ? '載入中...' : '重新整理' }}
            </BaseButton>
          </template>

          <!-- 載入狀態 -->
          <div v-if="isLoadingWorkflows" class="loading-state">
            <div class="loading-spinner"></div>
            <p>載入工作流中...</p>
          </div>

          <!-- 錯誤狀態 -->
          <div v-else-if="workflowsError" class="error-state">
            <div class="error-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="error-text">
              <h3>載入失敗</h3>
              <p>{{ workflowsError }}</p>
              <BaseButton variant="primary" @click="loadUserWorkflows">
                重試
              </BaseButton>
            </div>
          </div>

          <!-- 工作流列表 -->
          <div v-else class="workflows-list">
            <div
              v-for="workflow in recentWorkflows"
              :key="workflow.id"
              class="workflow-item"
            >
              <div class="workflow-icon">
                <component :is="workflow.icon" />
              </div>
              <div class="workflow-info" @click="openWorkflow(workflow)">
                <div class="workflow-name">{{ workflow.name }}</div>
                <div class="workflow-description">{{ workflow.description }}</div>
                <div class="workflow-meta">
                  <span class="workflow-status" :class="`status-${workflow.status}`">
                    {{ getStatusText(workflow.status) }}
                  </span>
                  <span class="workflow-nodes">{{ workflow.nodeCount || 0 }} 個節點</span>
                  <span class="workflow-date">{{ formatDate(workflow.updatedAt) }}</span>
                </div>
              </div>
              <div class="workflow-actions">
                <el-dropdown @command="handleWorkflowAction" trigger="click">
                  <el-button type="text" class="workflow-menu-btn">
                    <el-icon><MoreFilled /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="{action: 'edit', workflow}">
                        <el-icon><Edit /></el-icon>
                        編輯
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'rename', workflow}">
                        <el-icon><EditPen /></el-icon>
                        重新命名
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'duplicate', workflow}">
                        <el-icon><CopyDocument /></el-icon>
                        複製
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'toggle', workflow}">
                        <el-icon v-if="workflow.status === 'active'"><VideoPause /></el-icon>
                        <el-icon v-else><VideoPlay /></el-icon>
                        {{ workflow.status === 'active' ? '暫停' : '啟用' }}
                      </el-dropdown-item>
                      <el-dropdown-item :command="{action: 'delete', workflow}" divided>
                        <el-icon><Delete /></el-icon>
                        刪除
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            
            <div v-if="recentWorkflows.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="empty-text">
                <h3>還沒有工作流</h3>
                <p>建立您的第一個自動化工作流</p>
                <BaseButton variant="primary" @click="navigateToEditor">
                  建立第一個工作流
                </BaseButton>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- 活動圖表 -->
        <BaseCard class="activity-chart" variant="shadow" title="執行活動">
          <template #actions>
            <select v-model="chartPeriod" class="period-select">
              <option value="7d">過去 7 天</option>
              <option value="30d">過去 30 天</option>
              <option value="90d">過去 90 天</option>
            </select>
          </template>
          
          <div class="chart-container">
            <div class="chart-placeholder">
              <div class="chart-bars">
                <div
                  v-for="(value, index) in chartData"
                  :key="index"
                  class="chart-bar"
                  :style="{ height: `${value}%` }"
                ></div>
              </div>
              <div class="chart-labels">
                <span v-for="label in chartLabels" :key="label" class="chart-label">
                  {{ label }}
                </span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>

    <!-- 快捷操作區域 -->
    <div class="quick-actions">
      <BaseCard variant="shadow" title="快捷操作">
        <div class="actions-grid">
          <button
            v-for="action in quickActions"
            :key="action.id"
            class="action-item"
            @click="action.handler"
          >
            <div class="action-icon">
              <component :is="action.icon" />
            </div>
            <div class="action-info">
              <div class="action-title">{{ action.title }}</div>
              <div class="action-description">{{ action.description }}</div>
            </div>
          </button>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  MoreFilled,
  Edit,
  EditPen,
  CopyDocument,
  VideoPause,
  VideoPlay,
  Delete
} from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'
import { useWorkflowDatabase } from '@/composables/useWorkflowDatabase'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const workflowDatabase = useWorkflowDatabase()

// 用戶資訊
const username = computed(() => {
  return localStorage.getItem('username') || '用戶'
})

// 統計數據
const stats = ref([
  {
    id: 1,
    type: 'workflows',
    label: '總工作流',
    value: '12',
    change: '+2 本月',
    changeType: 'positive',
    icon: 'WorkflowIcon',
    changeIcon: 'TrendUpIcon'
  },
  {
    id: 2,
    type: 'executions',
    label: '本月執行',
    value: '1,234',
    change: '+15.3%',
    changeType: 'positive',
    icon: 'PlayIcon',
    changeIcon: 'TrendUpIcon'
  },
  {
    id: 3,
    type: 'success',
    label: '成功率',
    value: '98.5%',
    change: '+0.2%',
    changeType: 'positive',
    icon: 'CheckIcon',
    changeIcon: 'TrendUpIcon'
  },
  {
    id: 4,
    type: 'savings',
    label: '節省時間',
    value: '24.5h',
    change: '+3.2h',
    changeType: 'positive',
    icon: 'ClockIcon',
    changeIcon: 'TrendUpIcon'
  }
])

// 最近的工作流
const recentWorkflows = ref([
  {
    id: 1,
    name: 'Line 通知自動化',
    description: '當有新訂單時自動發送 Line 通知',
    status: 'active',
    icon: 'BellIcon',
    updatedAt: new Date('2024-01-15'),
    executions: 45
  },
  {
    id: 2,
    name: '電子郵件行銷',
    description: '定期發送產品推廣郵件給客戶',
    status: 'paused',
    icon: 'MailIcon',
    updatedAt: new Date('2024-01-14'),
    executions: 128
  },
  {
    id: 3,
    name: '資料同步',
    description: '同步 CRM 和會計系統的客戶資料',
    status: 'active',
    icon: 'RefreshIcon',
    updatedAt: new Date('2024-01-13'),
    executions: 67
  }
])

// 圖表數據
const chartPeriod = ref('7d')
const chartData = ref([65, 78, 45, 89, 67, 56, 78])
const chartLabels = computed(() => {
  const labels = []
  const days = chartPeriod.value === '7d' ? 7 : chartPeriod.value === '30d' ? 30 : 90
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    if (days === 7) {
      labels.push(date.toLocaleDateString('zh-TW', { weekday: 'short' }))
    } else {
      labels.push(date.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' }))
    }
  }
  
  return labels
})

// 快捷操作
const quickActions = ref([
  {
    id: 1,
    title: '建立工作流',
    description: '從頭開始建立新的自動化流程',
    icon: 'PlusIcon',
    handler: () => navigateToEditor()
  },
  {
    id: 2,
    title: '匯入範本',
    description: '使用預設範本快速開始',
    icon: 'TemplateIcon',
    handler: () => console.log('匯入範本')
  },
  {
    id: 3,
    title: '查看文檔',
    description: '學習如何使用 TW_Zapier',
    icon: 'BookIcon',
    handler: () => window.open('/docs', '_blank')
  },
  {
    id: 4,
    title: '聯絡支援',
    description: '獲得專業技術支援',
    icon: 'SupportIcon',
    handler: () => console.log('聯絡支援')
  }
])

// 方法
const navigateToEditor = () => {
  router.push('/editor')
}

const handleLogout = async () => {
  try {
    // 清除 auth store 狀態（這會清除 token）
    await authStore.logout()
  } catch (error) {
    // 即使 API 失敗也要繼續登出流程
    console.warn('登出 API 失敗，但繼續本地登出:', error)
  }

  // 清除其他本地存儲
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('username')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('rememberMe')

  // 導向登入頁面
  router.push('/login')
}

const viewAllWorkflows = () => {
  router.push('/workflows')
}

const openWorkflow = async (workflow: any) => {
  await handleWorkflowClick(workflow.id)
}

const toggleWorkflow = (workflow: any) => {
  workflow.status = workflow.status === 'active' ? 'paused' : 'active'
  // 這裡應該調用 API 更新狀態
}

// 工作流管理功能
const handleWorkflowAction = async (command: { action: string, workflow: any }) => {
  const { action, workflow } = command

  switch (action) {
    case 'edit':
      // 編輯工作流 - 導向編輯器
      await handleWorkflowClick(workflow.id)
      break

    case 'rename':
      // 重新命名工作流
      await handleRenameWorkflow(workflow)
      break

    case 'duplicate':
      // 複製工作流
      await handleDuplicateWorkflow(workflow)
      break

    case 'toggle':
      // 切換工作流狀態
      await handleToggleWorkflow(workflow)
      break

    case 'delete':
      // 刪除工作流
      await handleDeleteWorkflow(workflow)
      break
  }
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    active: '運行中',
    paused: '已暫停',
    error: '錯誤',
    draft: '草稿'
  }
  return statusMap[status] || status
}

// 重新命名工作流
const handleRenameWorkflow = async (workflow: any) => {
  try {
    const { value: newName } = await ElMessageBox.prompt(
      '請輸入新的工作流名稱',
      '重新命名工作流',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputValue: workflow.name,
        inputValidator: (value) => {
          if (!value || !value.trim()) {
            return '請輸入工作流名稱'
          }
          return true
        }
      }
    )

    // 調用 API 更新工作流名稱
    await workflowDatabase.updateWorkflow(workflow.id, { name: newName })

    // 重新載入工作流列表
    await loadUserWorkflows()

    ElMessage.success('工作流重新命名成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('重新命名失敗:', error)
      ElMessage.error('重新命名失敗')
    }
  }
}

// 複製工作流
const handleDuplicateWorkflow = async (workflow: any) => {
  try {
    const { value: newName } = await ElMessageBox.prompt(
      '請輸入複製工作流的名稱',
      '複製工作流',
      {
        confirmButtonText: '複製',
        cancelButtonText: '取消',
        inputValue: `${workflow.name} - 副本`,
        inputValidator: (value) => {
          if (!value || !value.trim()) {
            return '請輸入工作流名稱'
          }
          return true
        }
      }
    )

    // 調用 API 複製工作流
    await workflowDatabase.duplicateWorkflow(workflow.id, newName)

    // 重新載入工作流列表
    await loadUserWorkflows()

    ElMessage.success('工作流複製成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('複製失敗:', error)
      ElMessage.error('複製失敗')
    }
  }
}

// 切換工作流狀態
const handleToggleWorkflow = async (workflow: any) => {
  try {
    const newStatus = workflow.status === 'active' ? 'inactive' : 'active'
    const statusText = newStatus === 'active' ? '啟用' : '暫停'

    await workflowDatabase.updateWorkflow(workflow.id, { status: newStatus })

    // 重新載入工作流列表
    await loadUserWorkflows()

    ElMessage.success(`工作流已${statusText}`)
  } catch (error) {
    console.error('切換狀態失敗:', error)
    ElMessage.error('切換狀態失敗')
  }
}

// 刪除工作流
const handleDeleteWorkflow = async (workflow: any) => {
  try {
    await ElMessageBox.confirm(
      `確定要刪除工作流「${workflow.name}」嗎？此操作無法復原。`,
      '刪除確認',
      {
        confirmButtonText: '刪除',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    )

    // 調用 API 刪除工作流
    await workflowDatabase.deleteWorkflow(workflow.id)

    // 重新載入工作流列表
    await loadUserWorkflows()

    ElMessage.success('工作流刪除成功')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('刪除失敗:', error)
      ElMessage.error('刪除失敗')
    }
  }
}

const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  if (isNaN(dateObj.getTime())) {
    return '未知時間'
  }
  return dateObj.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 載入用戶工作流
const loadUserWorkflows = async () => {
  try {
    isLoadingWorkflows.value = true
    workflowsError.value = null

    const userWorkflows = await workflowDatabase.loadUserWorkflows()

    // 更新工作流列表，轉換為現有格式
    recentWorkflows.value = userWorkflows.map((workflow: any) => ({
      id: workflow.id,
      name: workflow.name,
      description: workflow.description || '無描述',
      status: workflow.status === 'active' ? 'active' : workflow.status === 'draft' ? 'paused' : 'active',
      icon: 'WorkflowIcon',
      updatedAt: new Date(workflow.updated_at),
      executions: workflow.execution_count || 0,
      nodeCount: workflow.nodes?.length || 0
    }))

    // 更新統計數據
    stats.value[0].value = userWorkflows.length.toString()

  } catch (error: any) {
    workflowsError.value = error.message || '載入工作流失敗'
    console.error('載入工作流失敗:', error)
  } finally {
    isLoadingWorkflows.value = false
  }
}

// 點擊工作流項目，導向編輯器並載入工作流
const handleWorkflowClick = async (workflowId: string) => {
  try {
    // 導向編輯器頁面，並傳遞工作流 ID
    await router.push({
      path: '/editor',
      query: { workflowId }
    })
  } catch (error) {
    console.error('導向編輯器失敗:', error)
  }
}

// 工作流列表狀態
const isLoadingWorkflows = ref(false)
const workflowsError = ref<string | null>(null)

// 生命週期
onMounted(async () => {
  // 檢查登入狀態
  if (!localStorage.getItem('isAuthenticated')) {
    router.push('/login')
    return
  }

  // 載入用戶工作流
  await loadUserWorkflows()
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 24px;
}

/* 頁面標題 */
.dashboard-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logout-btn {
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.logout-btn:hover {
  color: #C2474A;
  border-color: #C2474A;
  background: rgba(194, 71, 74, 0.05);
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  color: #374151;
}

.page-subtitle {
  margin: 0;
  font-size: 16px;
  color: #6b7280;
}

/* 統計卡片 */
.stats-section {
  margin-bottom: 32px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  transition: transform 0.2s ease;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.stat-workflows {
  background: rgba(134, 115, 94, 0.1);
  color: #86735E;
}

.stat-icon.stat-executions {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-icon.stat-success {
  background: rgba(102, 117, 57, 0.1);
  color: #667539;
}

.stat-icon.stat-savings {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

/* 主要內容 */
.main-content {
  margin-bottom: 32px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 工作流列表 */
.workflows-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.workflow-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.workflow-item:hover {
  border-color: #86735E;
  background: #f9fafb;
}

.workflow-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(134, 115, 94, 0.1);
  color: #86735E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.workflow-info {
  flex: 1;
}

.workflow-name {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.workflow-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.workflow-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.workflow-status {
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.workflow-status.status-active {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.workflow-status.status-paused {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.workflow-date {
  color: #9ca3af;
}

/* 圖表 */
.period-select {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  background: white;
}

.chart-container {
  height: 200px;
  margin-top: 16px;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-bars {
  flex: 1;
  display: flex;
  align-items: end;
  gap: 8px;
  padding: 16px 0;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #86735E, rgba(134, 115, 94, 0.6));
  border-radius: 4px 4px 0 0;
  min-height: 20px;
  transition: all 0.3s ease;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid #e5e7eb;
}

.chart-label {
  font-size: 12px;
  color: #6b7280;
}

/* 快捷操作 */
.quick-actions {
  max-width: 1200px;
  margin: 0 auto;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.action-item:hover {
  border-color: #86735E;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(134, 115, 94, 0.1);
  color: #86735E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.action-description {
  font-size: 14px;
  color: #6b7280;
}

/* 空狀態 */
.empty-state {
  text-align: center;
  padding: 48px 24px;
}

.empty-icon {
  margin-bottom: 16px;
  color: #9ca3af;
}

.empty-text h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
}

.empty-text p {
  font-size: 14px;
  margin-bottom: 20px;
  color: #6b7280;
}

/* 載入狀態 */
.loading-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #86735E;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.loading-state p {
  font-size: 14px;
}

/* 錯誤狀態 */
.error-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.error-icon {
  margin-bottom: 16px;
  color: #C2474A;
}

.error-text h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
}

.error-text p {
  font-size: 14px;
  margin-bottom: 20px;
  color: #6b7280;
}

/* 工作流節點數量 */
.workflow-nodes {
  color: #667539;
  font-weight: 500;
}

/* 載入動畫 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 工作流管理按鈕 */
.workflow-menu-btn {
  padding: 4px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.workflow-menu-btn:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.workflow-menu-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(134, 115, 94, 0.2);
}

/* 工作流項目懸停效果 */
.workflow-item:hover .workflow-menu-btn {
  opacity: 1;
}

.workflow-menu-btn {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .workflow-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .workflow-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
}
</style>
