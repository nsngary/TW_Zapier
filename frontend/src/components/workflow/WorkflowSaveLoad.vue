<template>
  <div class="workflow-save-load">
    <!-- 工具列 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button
          type="primary"
          :icon="DocumentAdd"
          @click="handleNew"
        >
          新建
        </el-button>
        
        <el-button
          :icon="FolderOpened"
          @click="showLoadDialog = true"
        >
          載入
        </el-button>
        
        <el-button
          :icon="Document"
          :disabled="!hasChanges"
          @click="handleSave"
        >
          儲存
        </el-button>
        
        <el-button
          :icon="DocumentCopy"
          @click="handleSaveAs"
        >
          另存為
        </el-button>
      </div>
      
      <div class="toolbar-right">
        <el-button
          :icon="Upload"
          @click="handleImport"
        >
          匯入
        </el-button>
        
        <el-button
          :icon="Download"
          :disabled="!currentWorkflow"
          @click="handleExport"
        >
          匯出
        </el-button>
        
        <el-dropdown @command="handleMenuCommand">
          <el-button :icon="More">
            更多
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="duplicate" :disabled="!currentWorkflow">
                <el-icon><DocumentCopy /></el-icon>
                複製工作流
              </el-dropdown-item>
              <el-dropdown-item command="template" :disabled="!currentWorkflow">
                <el-icon><Star /></el-icon>
                儲存為模板
              </el-dropdown-item>
              <el-dropdown-item command="versions" :disabled="!currentWorkflow">
                <el-icon><Clock /></el-icon>
                版本管理
              </el-dropdown-item>
              <el-dropdown-item command="delete" :disabled="!currentWorkflow" divided>
                <el-icon><Delete /></el-icon>
                刪除工作流
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <!-- 當前工作流資訊 -->
    <div v-if="currentWorkflow" class="current-workflow-info">
      <div class="workflow-meta">
        <div class="workflow-name">
          <el-icon><Document /></el-icon>
          {{ currentWorkflow.name }}
        </div>
        
        <div class="workflow-status">
          <el-tag
            v-if="hasChanges"
            type="warning"
            size="small"
            effect="plain"
          >
            未儲存
          </el-tag>
          
          <el-tag
            v-if="currentWorkflow.isActive"
            type="success"
            size="small"
            effect="plain"
          >
            已啟用
          </el-tag>
          
          <span class="last-saved">
            最後儲存: {{ formatTime(currentWorkflow.updatedAt) }}
          </span>
        </div>
      </div>
      
      <div class="workflow-actions">
        <el-button
          v-if="!currentWorkflow.isActive"
          type="success"
          size="small"
          :icon="VideoPlay"
          @click="handleActivate"
        >
          啟用
        </el-button>
        
        <el-button
          v-else
          type="warning"
          size="small"
          :icon="VideoPause"
          @click="handleDeactivate"
        >
          停用
        </el-button>
      </div>
    </div>

    <!-- 草稿提示 -->
    <div v-if="hasDraft && !currentWorkflow" class="draft-notice">
      <el-alert
        title="發現未儲存的草稿"
        type="info"
        show-icon
        :closable="false"
      >
        <template #default>
          <p>您有一個未儲存的工作流草稿，是否要載入？</p>
          <div class="draft-actions">
            <el-button type="primary" size="small" @click="loadDraft">
              載入草稿
            </el-button>
            <el-button size="small" @click="clearDraft">
              忽略草稿
            </el-button>
          </div>
        </template>
      </el-alert>
    </div>

    <!-- 載入工作流對話框 -->
    <el-dialog
      v-model="showLoadDialog"
      title="載入工作流"
      width="800px"
      :close-on-click-modal="false"
    >
      <div class="load-dialog-content">
        <!-- 搜尋和篩選 -->
        <div class="search-filters">
          <el-input
            v-model="searchQuery"
            placeholder="搜尋工作流..."
            prefix-icon="Search"
            clearable
            @input="handleSearch"
          />
          
          <el-select
            v-model="categoryFilter"
            placeholder="選擇分類"
            clearable
            @change="handleCategoryFilter"
          >
            <el-option label="全部" value="" />
            <el-option label="金流支付" value="payment" />
            <el-option label="資料處理" value="data" />
            <el-option label="通知推送" value="notification" />
            <el-option label="台灣服務" value="taiwan" />
          </el-select>
        </div>

        <!-- 工作流列表 -->
        <div class="workflow-list">
          <el-table
            :data="filteredWorkflows"
            @row-click="selectWorkflow"
            highlight-current-row
          >
            <el-table-column prop="name" label="名稱" min-width="200">
              <template #default="{ row }">
                <div class="workflow-name-cell">
                  <el-icon><Document /></el-icon>
                  {{ row.name }}
                  <el-tag
                    v-if="row.isActive"
                    type="success"
                    size="small"
                    effect="plain"
                  >
                    啟用中
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            
            <el-table-column prop="description" label="描述" show-overflow-tooltip />
            
            <el-table-column prop="category" label="分類" width="100">
              <template #default="{ row }">
                <el-tag size="small" effect="plain">
                  {{ getCategoryLabel(row.category) }}
                </el-tag>
              </template>
            </el-table-column>
            
            <el-table-column prop="updatedAt" label="更新時間" width="150">
              <template #default="{ row }">
                {{ formatTime(row.updatedAt) }}
              </template>
            </el-table-column>
            
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  @click.stop="loadWorkflow(row)"
                >
                  載入
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="showLoadDialog = false">取消</el-button>
      </template>
    </el-dialog>

    <!-- 另存為對話框 -->
    <el-dialog
      v-model="showSaveAsDialog"
      title="另存為"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form :model="saveAsForm" label-width="80px">
        <el-form-item label="名稱" required>
          <el-input
            v-model="saveAsForm.name"
            placeholder="輸入工作流名稱"
          />
        </el-form-item>
        
        <el-form-item label="描述">
          <el-input
            v-model="saveAsForm.description"
            type="textarea"
            :rows="3"
            placeholder="輸入工作流描述（可選）"
          />
        </el-form-item>
        
        <el-form-item label="分類">
          <el-select
            v-model="saveAsForm.category"
            placeholder="選擇分類"
          >
            <el-option label="金流支付" value="payment" />
            <el-option label="資料處理" value="data" />
            <el-option label="通知推送" value="notification" />
            <el-option label="台灣服務" value="taiwan" />
          </el-select>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="showSaveAsDialog = false">取消</el-button>
        <el-button
          type="primary"
          :loading="saving"
          @click="confirmSaveAs"
        >
          儲存
        </el-button>
      </template>
    </el-dialog>

    <!-- 隱藏的檔案輸入 -->
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleFileSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  DocumentAdd,
  FolderOpened,
  Document,
  DocumentCopy,
  Upload,
  Download,
  More,
  ArrowDown,
  Star,
  Clock,
  Delete,
  VideoPlay,
  VideoPause
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  duplicateWorkflow,
  activateWorkflow,
  deactivateWorkflow,
  saveWorkflowDraft,
  loadWorkflowDraft,
  clearWorkflowDraft,
  hasDraftWorkflow,
  exportWorkflowAsJSON,
  importWorkflowFromJSON,
  validateWorkflowData
} from '@/services/workflowService'
import type { WorkflowData, WorkflowNode, WorkflowConnection } from '@/types/workflow'

// ===== Props =====

interface Props {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  hasChanges: boolean
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const currentWorkflow = ref<WorkflowData | null>(null)
const workflows = ref<WorkflowData[]>([])
const showLoadDialog = ref(false)
const showSaveAsDialog = ref(false)
const saving = ref(false)
const loading = ref(false)

const searchQuery = ref('')
const categoryFilter = ref('')

const saveAsForm = ref({
  name: '',
  description: '',
  category: ''
})

const fileInput = ref<HTMLInputElement>()

// ===== 計算屬性 =====

const hasDraft = computed(() => hasDraftWorkflow())

const filteredWorkflows = computed(() => {
  let filtered = workflows.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(w => 
      w.name.toLowerCase().includes(query) ||
      (w.description && w.description.toLowerCase().includes(query))
    )
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(w => w.category === categoryFilter.value)
  }

  return filtered
})

// ===== 方法 =====

const handleNew = async () => {
  if (props.hasChanges) {
    try {
      await ElMessageBox.confirm(
        '當前工作流有未儲存的變更，是否要先儲存？',
        '確認新建',
        {
          confirmButtonText: '儲存並新建',
          cancelButtonText: '直接新建',
          distinguishCancelAndClose: true,
          type: 'warning'
        }
      )
      
      await handleSave()
    } catch (action) {
      if (action === 'close') return
    }
  }
  
  currentWorkflow.value = null
  emit('new-workflow')
  ElMessage.success('已建立新工作流')
}

const handleSave = async () => {
  if (!currentWorkflow.value) {
    handleSaveAs()
    return
  }
  
  try {
    saving.value = true
    
    const updatedWorkflow = await updateWorkflow(currentWorkflow.value.id, {
      nodes: props.nodes,
      connections: props.connections,
      updatedAt: new Date().toISOString()
    })
    
    currentWorkflow.value = updatedWorkflow
    emit('workflow-saved', updatedWorkflow)
    ElMessage.success('工作流已儲存')
  } catch (error) {
    ElMessage.error(`儲存失敗: ${error}`)
  } finally {
    saving.value = false
  }
}

const handleSaveAs = () => {
  saveAsForm.value = {
    name: currentWorkflow.value ? `${currentWorkflow.value.name} - 副本` : '新工作流',
    description: currentWorkflow.value?.description || '',
    category: currentWorkflow.value?.category || ''
  }
  showSaveAsDialog.value = true
}

const confirmSaveAs = async () => {
  if (!saveAsForm.value.name.trim()) {
    ElMessage.warning('請輸入工作流名稱')
    return
  }
  
  try {
    saving.value = true
    
    const newWorkflow = await createWorkflow({
      name: saveAsForm.value.name,
      description: saveAsForm.value.description,
      category: saveAsForm.value.category,
      nodes: props.nodes,
      connections: props.connections
    })
    
    currentWorkflow.value = newWorkflow
    showSaveAsDialog.value = false
    emit('workflow-saved', newWorkflow)
    ElMessage.success('工作流已儲存')
  } catch (error) {
    ElMessage.error(`儲存失敗: ${error}`)
  } finally {
    saving.value = false
  }
}

const loadWorkflows = async () => {
  try {
    loading.value = true
    const response = await getWorkflows()
    workflows.value = response.workflows
  } catch (error) {
    ElMessage.error(`載入工作流列表失敗: ${error}`)
  } finally {
    loading.value = false
  }
}

const loadWorkflow = async (workflow: WorkflowData) => {
  try {
    if (props.hasChanges) {
      await ElMessageBox.confirm(
        '當前工作流有未儲存的變更，載入新工作流將會丟失這些變更。',
        '確認載入',
        {
          confirmButtonText: '確定載入',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
    }
    
    currentWorkflow.value = workflow
    showLoadDialog.value = false
    emit('workflow-loaded', workflow)
    ElMessage.success(`已載入工作流: ${workflow.name}`)
  } catch {
    // 用戶取消載入
  }
}

const handleImport = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  try {
    const workflowData = await importWorkflowFromJSON(file)
    
    // 驗證工作流資料
    const validation = validateWorkflowData(workflowData)
    if (!validation.isValid) {
      ElMessage.error(`匯入失敗: ${validation.errors.join(', ')}`)
      return
    }
    
    if (validation.warnings.length > 0) {
      ElMessage.warning(`匯入成功，但有警告: ${validation.warnings.join(', ')}`)
    }
    
    emit('workflow-imported', workflowData)
    ElMessage.success('工作流匯入成功')
  } catch (error) {
    ElMessage.error(`匯入失敗: ${error}`)
  }
  
  // 清除檔案輸入
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleExport = () => {
  if (!currentWorkflow.value) return
  
  try {
    exportWorkflowAsJSON({
      ...currentWorkflow.value,
      nodes: props.nodes,
      connections: props.connections
    })
    ElMessage.success('工作流匯出成功')
  } catch (error) {
    ElMessage.error(`匯出失敗: ${error}`)
  }
}

const loadDraft = () => {
  const draft = loadWorkflowDraft()
  if (draft) {
    emit('draft-loaded', draft)
    ElMessage.success('草稿已載入')
  }
}

const clearDraft = () => {
  clearWorkflowDraft()
  ElMessage.info('草稿已清除')
}

const handleActivate = async () => {
  if (!currentWorkflow.value) return
  
  try {
    await activateWorkflow(currentWorkflow.value.id)
    currentWorkflow.value.isActive = true
    ElMessage.success('工作流已啟用')
  } catch (error) {
    ElMessage.error(`啟用失敗: ${error}`)
  }
}

const handleDeactivate = async () => {
  if (!currentWorkflow.value) return
  
  try {
    await deactivateWorkflow(currentWorkflow.value.id)
    currentWorkflow.value.isActive = false
    ElMessage.success('工作流已停用')
  } catch (error) {
    ElMessage.error(`停用失敗: ${error}`)
  }
}

const handleMenuCommand = async (command: string) => {
  if (!currentWorkflow.value) return
  
  switch (command) {
    case 'duplicate':
      try {
        const duplicated = await duplicateWorkflow(currentWorkflow.value.id)
        ElMessage.success(`已複製工作流: ${duplicated.name}`)
      } catch (error) {
        ElMessage.error(`複製失敗: ${error}`)
      }
      break
      
    case 'template':
      ElMessage.info('儲存為模板功能開發中')
      break
      
    case 'versions':
      ElMessage.info('版本管理功能開發中')
      break
      
    case 'delete':
      try {
        await ElMessageBox.confirm(
          `確定要刪除工作流「${currentWorkflow.value.name}」嗎？此操作無法復原。`,
          '確認刪除',
          {
            confirmButtonText: '確定刪除',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        
        await deleteWorkflow(currentWorkflow.value.id)
        currentWorkflow.value = null
        emit('workflow-deleted')
        ElMessage.success('工作流已刪除')
      } catch {
        // 用戶取消刪除
      }
      break
  }
}

const handleSearch = () => {
  // 搜尋邏輯已在計算屬性中處理
}

const handleCategoryFilter = () => {
  // 篩選邏輯已在計算屬性中處理
}

const selectWorkflow = (workflow: WorkflowData) => {
  // 點擊行選擇工作流
}

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'payment': '金流',
    'data': '資料',
    'notification': '通知',
    'taiwan': '台灣'
  }
  return labels[category] || category
}

const formatTime = (timeString: string): string => {
  return new Date(timeString).toLocaleString('zh-TW')
}

// ===== 生命週期 =====

onMounted(() => {
  loadWorkflows()
})

// ===== 事件 =====

const emit = defineEmits<{
  'new-workflow': []
  'workflow-loaded': [workflow: WorkflowData]
  'workflow-saved': [workflow: WorkflowData]
  'workflow-deleted': []
  'workflow-imported': [workflow: any]
  'draft-loaded': [draft: any]
}>()

// ===== 自動儲存草稿 =====

const saveDraftPeriodically = () => {
  if (props.nodes.length > 0 || props.connections.length > 0) {
    saveWorkflowDraft({
      name: currentWorkflow.value?.name || '未命名工作流',
      description: currentWorkflow.value?.description,
      nodes: props.nodes,
      connections: props.connections,
      settings: currentWorkflow.value?.settings
    })
  }
}

// 每30秒自動儲存草稿
setInterval(saveDraftPeriodically, 30000)
</script>

<style scoped lang="scss">
.workflow-save-load {
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-base $spacing-lg;
    background: $bg-color-secondary;
    border-bottom: $border-width-thin solid $border-color;
    
    .toolbar-left,
    .toolbar-right {
      display: flex;
      gap: $spacing-sm;
    }
  }
  
  .current-workflow-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-base $spacing-lg;
    background: $white;
    border-bottom: $border-width-thin solid $border-color;
    
    .workflow-meta {
      display: flex;
      align-items: center;
      gap: $spacing-lg;
      
      .workflow-name {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        font-weight: $font-weight-semibold;
        color: $text-color;
      }
      
      .workflow-status {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        
        .last-saved {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
      }
    }
  }
  
  .draft-notice {
    padding: $spacing-lg;
    
    .draft-actions {
      margin-top: $spacing-base;
      display: flex;
      gap: $spacing-sm;
    }
  }
  
  .load-dialog-content {
    .search-filters {
      display: flex;
      gap: $spacing-base;
      margin-bottom: $spacing-lg;
      
      .el-input {
        flex: 1;
      }
      
      .el-select {
        width: 150px;
      }
    }
    
    .workflow-list {
      max-height: 400px;
      overflow-y: auto;
      
      .workflow-name-cell {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
      }
    }
  }
}

// 深色主題
[data-theme="dark"] {
  .workflow-save-load {
    .toolbar {
      background: var(--bg-color-tertiary);
      border-color: var(--border-color);
    }
    
    .current-workflow-info {
      background: var(--bg-color-secondary);
      border-color: var(--border-color);
      
      .workflow-name {
        color: var(--text-color);
      }
      
      .last-saved {
        color: var(--text-color-secondary);
      }
    }
  }
}
</style>
