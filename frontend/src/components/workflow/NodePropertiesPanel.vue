<template>
  <div class="node-properties-panel">
    <!-- 面板標題 -->
    <div class="panel-header">
      <div class="node-info">
        <div class="node-icon">
          <img
            v-if="nodeDefinition?.icon && nodeDefinition.icon.startsWith('/')"
            :src="nodeDefinition.icon"
            :alt="selectedNode?.label"
            class="icon-image"
          />
          <el-icon v-else class="icon-element">
            <component :is="getIconComponent()" />
          </el-icon>
        </div>
        <div class="node-details">
          <h3 class="node-title">{{ selectedNode?.label || '選擇節點' }}</h3>
          <p class="node-type">{{ nodeDefinition?.description || '請選擇一個節點來編輯屬性' }}</p>
        </div>
      </div>
      
      <div v-if="selectedNode" class="node-actions">
        <el-button
          type="danger"
          size="small"
          :icon="Delete"
          @click="handleDeleteNode"
        >
          刪除
        </el-button>
      </div>
    </div>

    <!-- 屬性編輯區域 -->
    <div v-if="selectedNode" class="panel-content">
      <el-scrollbar height="100%">
        <!-- 基本設定 -->
        <div class="property-section">
          <div class="section-title">
            <el-icon><Setting /></el-icon>
            基本設定
          </div>
          
          <el-form
            :model="nodeData"
            label-position="top"
            size="default"
            @submit.prevent
          >
            <!-- 節點名稱 -->
            <el-form-item label="節點名稱" required>
              <el-input
                v-model="nodeData.label"
                placeholder="輸入節點名稱"
                @input="handlePropertyChange"
              />
            </el-form-item>

            <!-- 節點描述 -->
            <el-form-item label="節點描述">
              <el-input
                v-model="nodeData.description"
                type="textarea"
                :rows="2"
                placeholder="輸入節點描述（可選）"
                @input="handlePropertyChange"
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 動態屬性編輯 -->
        <div class="property-section">
          <div class="section-title">
            <el-icon><Tools /></el-icon>
            節點配置
          </div>
          
          <!-- 根據節點類型動態渲染屬性編輯器 -->
          <component
            :is="getPropertyEditor()"
            v-model="nodeData"
            :node-definition="nodeDefinition"
            @change="handlePropertyChange"
          />
        </div>

        <!-- 進階設定 -->
        <div class="property-section">
          <div class="section-title">
            <el-icon><Operation /></el-icon>
            進階設定
          </div>
          
          <el-form
            :model="nodeData.settings"
            label-position="top"
            size="default"
          >
            <!-- 錯誤處理 -->
            <el-form-item label="錯誤處理">
              <el-select
                v-model="nodeData.settings.onError"
                placeholder="選擇錯誤處理方式"
                @change="handlePropertyChange"
              >
                <el-option label="停止執行" value="stop" />
                <el-option label="繼續執行" value="continue" />
                <el-option label="重試" value="retry" />
              </el-select>
            </el-form-item>

            <!-- 重試次數 -->
            <el-form-item
              v-if="nodeData.settings.onError === 'retry'"
              label="重試次數"
            >
              <el-input-number
                v-model="nodeData.settings.retryCount"
                :min="1"
                :max="10"
                @change="handlePropertyChange"
              />
            </el-form-item>

            <!-- 超時設定 -->
            <el-form-item label="超時時間（秒）">
              <el-input-number
                v-model="nodeData.settings.timeout"
                :min="1"
                :max="300"
                @change="handlePropertyChange"
              />
            </el-form-item>

            <!-- 是否啟用 -->
            <el-form-item label="節點狀態">
              <el-switch
                v-model="nodeData.enabled"
                active-text="啟用"
                inactive-text="停用"
                @change="handlePropertyChange"
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 測試區域 -->
        <div class="property-section">
          <div class="section-title">
            <el-icon><Cpu /></el-icon>
            測試執行
          </div>
          
          <div class="test-actions">
            <el-button
              type="primary"
              :loading="isTesting"
              @click="handleTestNode"
            >
              <el-icon><VideoPlay /></el-icon>
              測試節點
            </el-button>
            
            <el-button
              v-if="testResult"
              type="success"
              plain
              @click="showTestResult = true"
            >
              <el-icon><View /></el-icon>
              查看結果
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 空狀態 -->
    <div v-else class="empty-state">
      <el-empty
        description="請選擇一個節點來編輯屬性"
        :image-size="120"
      >
        <template #image>
          <el-icon class="empty-icon"><Setting /></el-icon>
        </template>
      </el-empty>
    </div>

    <!-- 測試結果對話框 -->
    <el-dialog
      v-model="showTestResult"
      title="節點測試結果"
      width="600px"
      :close-on-click-modal="false"
    >
      <div class="test-result">
        <el-alert
          :type="testResult?.success ? 'success' : 'error'"
          :title="testResult?.success ? '測試成功' : '測試失敗'"
          :description="testResult?.message"
          show-icon
          :closable="false"
        />
        
        <div v-if="testResult?.data" class="result-data">
          <h4>輸出資料：</h4>
          <el-input
            :model-value="JSON.stringify(testResult.data, null, 2)"
            type="textarea"
            :rows="10"
            readonly
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Delete, 
  Setting, 
  Tools, 
  Operation, 
  Cpu, 
  VideoPlay, 
  View,
  Grid
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { findNodeDefinition } from '@/config/nodeLibrary'
import type { WorkflowNode, PaletteNode } from '@/types/workflow'

// 動態導入屬性編輯器組件
import TriggerNodeEditor from './editors/TriggerNodeEditor.vue'
import PaymentNodeEditor from './editors/PaymentNodeEditor.vue'
import TaiwanServiceNodeEditor from './editors/TaiwanServiceNodeEditor.vue'
import GeneralNodeEditor from './editors/GeneralNodeEditor.vue'
import NotificationNodeEditor from './editors/NotificationNodeEditor.vue'

// ===== Props =====

interface Props {
  selectedNode?: WorkflowNode
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const nodeData = ref<WorkflowNode>({} as WorkflowNode)
const isTesting = ref(false)
const showTestResult = ref(false)
const testResult = ref<{
  success: boolean
  message: string
  data?: any
} | null>(null)

// ===== 計算屬性 =====

const nodeDefinition = computed(() => {
  if (!props.selectedNode) return null
  return findNodeDefinition(props.selectedNode.type)
})

// ===== 方法 =====

const getIconComponent = () => {
  if (!nodeDefinition.value?.icon || nodeDefinition.value.icon.startsWith('/')) {
    return Grid
  }
  // 這裡可以根據需要添加更多圖示映射
  return Grid
}

const getPropertyEditor = () => {
  if (!nodeDefinition.value) return 'div'
  
  const editorMap = {
    'trigger': TriggerNodeEditor,
    'payment': PaymentNodeEditor,
    'taiwan-service': TaiwanServiceNodeEditor,
    'general': GeneralNodeEditor,
    'notification': NotificationNodeEditor
  }
  
  return editorMap[nodeDefinition.value.category] || GeneralNodeEditor
}

const handlePropertyChange = () => {
  emit('node-update', nodeData.value)
}

const handleDeleteNode = async () => {
  try {
    await ElMessageBox.confirm(
      '確定要刪除這個節點嗎？此操作無法復原。',
      '確認刪除',
      {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    emit('node-delete', props.selectedNode!)
    ElMessage.success('節點已刪除')
  } catch {
    // 用戶取消刪除
  }
}

const handleTestNode = async () => {
  if (!props.selectedNode) return
  
  isTesting.value = true
  testResult.value = null
  
  try {
    // 模擬節點測試
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 這裡應該調用實際的節點測試 API
    testResult.value = {
      success: true,
      message: '節點測試成功',
      data: {
        output: '測試輸出資料',
        executionTime: '1.2s',
        status: 'success'
      }
    }
    
    ElMessage.success('節點測試完成')
    showTestResult.value = true
  } catch (error) {
    testResult.value = {
      success: false,
      message: `測試失敗: ${error}`,
    }
    ElMessage.error('節點測試失敗')
  } finally {
    isTesting.value = false
  }
}

// ===== 監聽器 =====

watch(
  () => props.selectedNode,
  (newNode) => {
    if (newNode) {
      nodeData.value = { ...newNode }
    }
  },
  { immediate: true, deep: true }
)

// ===== 事件 =====

const emit = defineEmits<{
  'node-update': [node: WorkflowNode]
  'node-delete': [node: WorkflowNode]
}>()
</script>

<style scoped lang="scss">
.node-properties-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border-left: $border-width-thin solid $border-color;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  border-bottom: $border-width-thin solid $border-color;
  background: $bg-color-secondary;
  
  .node-info {
    display: flex;
    align-items: center;
    gap: $spacing-base;
    
    .node-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $white;
      border-radius: $border-radius-base;
      border: $border-width-thin solid $border-color;
      
      .icon-image {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }
      
      .icon-element {
        font-size: 20px;
        color: $primary-color;
      }
    }
    
    .node-details {
      .node-title {
        margin: 0 0 4px 0;
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: $text-color;
      }
      
      .node-type {
        margin: 0;
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }
  }
}

.panel-content {
  flex: 1;
  overflow: hidden;
}

.property-section {
  padding: $spacing-lg;
  border-bottom: $border-width-thin solid $border-color;
  
  &:last-child {
    border-bottom: none;
  }
  
  .section-title {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    margin-bottom: $spacing-lg;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $text-color;
    
    .el-icon {
      font-size: 16px;
      color: $primary-color;
    }
  }
}

.test-actions {
  display: flex;
  gap: $spacing-base;
  
  .el-button {
    flex: 1;
  }
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .empty-icon {
    font-size: 80px;
    color: $text-color-tertiary;
  }
}

.test-result {
  .result-data {
    margin-top: $spacing-lg;
    
    h4 {
      margin: 0 0 $spacing-base 0;
      font-size: $font-size-base;
      color: $text-color;
    }
  }
}

// 響應式設計
@media (max-width: 768px) {
  .panel-header {
    padding: $spacing-base;
    
    .node-info {
      gap: $spacing-sm;
      
      .node-icon {
        width: 32px;
        height: 32px;
        
        .icon-image {
          width: 20px;
          height: 20px;
        }
        
        .icon-element {
          font-size: 16px;
        }
      }
      
      .node-details {
        .node-title {
          font-size: $font-size-base;
        }
        
        .node-type {
          font-size: $font-size-xs;
        }
      }
    }
  }
  
  .property-section {
    padding: $spacing-base;
  }
}

// 深色主題
[data-theme="dark"] {
  .node-properties-panel {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
  }
  
  .panel-header {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
    
    .node-icon {
      background: var(--bg-color-secondary);
      border-color: var(--border-color);
    }
    
    .node-title {
      color: var(--text-color);
    }
    
    .node-type {
      color: var(--text-color-secondary);
    }
  }
  
  .property-section {
    border-color: var(--border-color);
    
    .section-title {
      color: var(--text-color);
    }
  }
}
</style>
