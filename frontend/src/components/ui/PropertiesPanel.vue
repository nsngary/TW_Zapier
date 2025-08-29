<template>
  <div class="properties-panel" :class="{ 'expanded': isExpanded, 'pinned': isPinned }">
    <!-- 面板觸發器 -->
    <div class="panel-trigger" @mouseenter="expandPanel" @mouseleave="collapsePanel">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2573 9.77251 19.9887C9.5799 19.7201 9.31074 19.5176 9 19.41C8.69838 19.2769 8.36381 19.2372 8.03941 19.296C7.71502 19.3548 7.41568 19.5095 7.18 19.74L7.12 19.8C6.93425 19.986 6.71368 20.1335 6.47088 20.2341C6.22808 20.3348 5.96783 20.3866 5.705 20.3866C5.44217 20.3866 5.18192 20.3348 4.93912 20.2341C4.69632 20.1335 4.47575 19.986 4.29 19.8C4.10405 19.6143 3.95653 19.3937 3.85588 19.1509C3.75523 18.9081 3.70343 18.6478 3.70343 18.385C3.70343 18.1222 3.75523 17.8619 3.85588 17.6191C3.95653 17.3763 4.10405 17.1557 4.29 16.97L4.35 16.91C4.58054 16.6743 4.73519 16.375 4.794 16.0506C4.85282 15.7262 4.81312 15.3916 4.68 15.09C4.55324 14.7942 4.34276 14.542 4.07447 14.3643C3.80618 14.1866 3.49179 14.0913 3.17 14.09H3C2.46957 14.09 1.96086 13.8793 1.58579 13.5042C1.21071 13.1291 1 12.6204 1 12.09C1 11.5596 1.21071 11.0509 1.58579 10.6758C1.96086 10.3007 2.46957 10.09 3 10.09H3.09C3.42099 10.0823 3.742 9.97512 4.01062 9.78251C4.27925 9.5899 4.48167 9.32074 4.59 9.01C4.72312 8.70838 4.76282 8.37381 4.704 8.04941C4.64519 7.72502 4.49054 7.42568 4.26 7.19L4.2 7.13C4.01405 6.94425 3.86653 6.72368 3.76588 6.48088C3.66523 6.23808 3.61343 5.97783 3.61343 5.715C3.61343 5.45217 3.66523 5.19192 3.76588 4.94912C3.86653 4.70632 4.01405 4.48575 4.2 4.3C4.38575 4.11405 4.60632 3.96653 4.84912 3.86588C5.09192 3.76523 5.35217 3.71343 5.615 3.71343C5.87783 3.71343 6.13808 3.76523 6.38088 3.86588C6.62368 3.96653 6.84425 4.11405 7.03 4.3L7.09 4.36C7.32568 4.59054 7.62502 4.74519 7.94941 4.804C8.27381 4.86282 8.60838 4.82312 8.91 4.69H9C9.29577 4.56324 9.54802 4.35276 9.72569 4.08447C9.90337 3.81618 9.99872 3.50179 10 3.18V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <!-- 面板內容 -->
    <div class="panel-content">
      <!-- 面板標題列 -->
      <div class="panel-header">
        <h3 class="panel-title">屬性設定</h3>
        <div class="panel-controls">
          <button 
            @click="togglePin" 
            class="control-btn"
            :class="{ 'active': isPinned }"
            title="固定面板"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4V2C16 1.44772 15.5523 1 15 1H9C8.44772 1 8 1.44772 8 2V4H5C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6H6V7C6 8.10457 6.89543 9 8 9H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V9H16C17.1046 9 18 8.10457 18 7V6H19C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4H16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button 
            @click="validateWorkflow" 
            class="control-btn validate-btn"
            :class="{ 'btn-warning': hasValidationErrors, 'btn-success': isValidated && !hasValidationErrors }"
            title="驗證工作流"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 驗證結果區域 -->
      <div v-if="validationResults.length > 0" class="validation-section">
        <div class="validation-header" @click="toggleValidationCollapse">
          <h4 class="validation-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="17" r="1" fill="currentColor"/>
            </svg>
            驗證結果
          </h4>
          <div class="validation-summary">
            <span v-if="errorCount > 0" class="error-count">{{ errorCount }} 錯誤</span>
            <span v-if="warningCount > 0" class="warning-count">{{ warningCount }} 警告</span>
          </div>
          <button class="collapse-btn" :class="{ 'collapsed': isValidationCollapsed }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="validation-content" v-show="!isValidationCollapsed">
          <div 
            v-for="result in validationResults" 
            :key="result.id"
            class="validation-item"
            :class="`validation-${result.severity}`"
            @click="highlightNode(result.nodeId)"
          >
            <div class="validation-icon">
              <svg v-if="result.severity === 'error'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
                <circle cx="12" cy="17" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div class="validation-content-text">
              <div class="validation-message">{{ result.message }}</div>
              <div v-if="result.nodeId" class="validation-location">
                節點: {{ getNodeLabel(result.nodeId) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 屬性編輯區域 -->
      <div class="properties-content">
        <!-- 無選擇狀態 -->
        <div v-if="!selectedNode && !selectedEdge" class="empty-selection">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2"/>
          </svg>
          <p>選擇節點或連線以編輯屬性</p>
        </div>

        <!-- 節點屬性編輯 -->
        <div v-else-if="selectedNode" class="node-properties">
          <div class="property-section-header">
            <div class="node-info">
              <div class="node-icon">
                <component v-if="selectedNode.data?.icon" :is="selectedNode.data.icon" />
                <div v-else class="default-icon"></div>
              </div>
              <div class="node-details">
                <h4 class="node-name">{{ selectedNode.data?.label || selectedNode.id }}</h4>
                <span class="node-type">{{ getNodeTypeLabel(selectedNode.data?.nodeType) }}</span>
              </div>
            </div>
          </div>

          <!-- 使用 PropertyEditor 組件 -->
          <PropertyEditor
            v-if="nodePropertyFields.length > 0"
            :fields="nodePropertyFields"
            v-model="nodeProperties"
            :errors="nodePropertyErrors"
            @field-change="handleNodePropertyChange"
            @file-upload="handleFileUpload"
          />
        </div>

        <!-- 連線屬性編輯 -->
        <div v-else-if="selectedEdge" class="edge-properties">
          <div class="property-section-header">
            <h4>連線屬性</h4>
          </div>

          <PropertyEditor
            v-if="edgePropertyFields.length > 0"
            :fields="edgePropertyFields"
            v-model="edgeProperties"
            :errors="edgePropertyErrors"
            @field-change="handleEdgePropertyChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import PropertyEditor from './PropertyEditor.vue'

interface ValidationResult {
  id: string
  severity: 'error' | 'warning'
  message: string
  nodeId?: string
}

interface PropertyField {
  key: string
  label: string
  type: 'text' | 'number' | 'textarea' | 'select' | 'switch' | 'color' | 'file'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  description?: string
  options?: Array<{ label: string; value: any }>
  min?: number
  max?: number
  step?: number
  rows?: number
  switchLabel?: string
  accept?: string
}

interface Props {
  selectedNode?: any
  selectedEdge?: any
  validationResults?: ValidationResult[]
  hasValidationErrors?: boolean
  isValidated?: boolean
  defaultExpanded?: boolean
  defaultPinned?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  validationResults: () => [],
  hasValidationErrors: false,
  isValidated: false,
  defaultExpanded: false,
  defaultPinned: false
})

const emit = defineEmits<{
  'validate-workflow': []
  'node-property-change': [nodeId: string, key: string, value: any]
  'edge-property-change': [edgeId: string, key: string, value: any]
  'highlight-node': [nodeId: string]
  'file-upload': [nodeId: string, key: string, file: File]
  'panel-toggle': [expanded: boolean]
  'panel-pin': [pinned: boolean]
}>()

// 狀態管理
const isExpanded = ref(props.defaultExpanded)
const isPinned = ref(props.defaultPinned)
const isValidationCollapsed = ref(false)
const nodeProperties = ref<Record<string, any>>({})
const edgeProperties = ref<Record<string, any>>({})
const nodePropertyErrors = ref<Record<string, string>>({})
const edgePropertyErrors = ref<Record<string, string>>({})

// 計算屬性
const errorCount = computed(() => 
  props.validationResults.filter(r => r.severity === 'error').length
)

const warningCount = computed(() => 
  props.validationResults.filter(r => r.severity === 'warning').length
)

const nodePropertyFields = computed((): PropertyField[] => {
  if (!props.selectedNode) return []
  
  const nodeType = props.selectedNode.data?.nodeType
  const baseFields: PropertyField[] = [
    {
      key: 'label',
      label: '節點名稱',
      type: 'text',
      placeholder: '輸入節點名稱',
      required: true
    }
  ]
  
  // 根據節點類型添加特定欄位
  const typeSpecificFields = getNodeTypeFields(nodeType)
  
  return [...baseFields, ...typeSpecificFields]
})

const edgePropertyFields = computed((): PropertyField[] => {
  if (!props.selectedEdge) return []
  
  return [
    {
      key: 'label',
      label: '連線標籤',
      type: 'text',
      placeholder: '輸入連線標籤'
    },
    {
      key: 'animated',
      label: '動畫效果',
      type: 'switch',
      switchLabel: '啟用動畫'
    }
  ]
})

// 方法
const expandPanel = () => {
  if (!isPinned.value) {
    isExpanded.value = true
    emit('panel-toggle', true)
  }
}

const collapsePanel = () => {
  if (!isPinned.value) {
    isExpanded.value = false
    emit('panel-toggle', false)
  }
}

const togglePin = () => {
  isPinned.value = !isPinned.value
  if (isPinned.value) {
    isExpanded.value = true
  }
  emit('panel-pin', isPinned.value)
}

const validateWorkflow = () => {
  emit('validate-workflow')
}

const toggleValidationCollapse = () => {
  isValidationCollapsed.value = !isValidationCollapsed.value
}

const highlightNode = (nodeId?: string) => {
  if (nodeId) {
    emit('highlight-node', nodeId)
  }
}

const handleNodePropertyChange = (key: string, value: any) => {
  if (props.selectedNode) {
    emit('node-property-change', props.selectedNode.id, key, value)
  }
}

const handleEdgePropertyChange = (key: string, value: any) => {
  if (props.selectedEdge) {
    emit('edge-property-change', props.selectedEdge.id, key, value)
  }
}

const handleFileUpload = (key: string, file: File) => {
  if (props.selectedNode) {
    emit('file-upload', props.selectedNode.id, key, file)
  }
}

const getNodeLabel = (nodeId: string): string => {
  // 這裡應該從父組件獲取節點標籤
  return nodeId
}

const getNodeTypeLabel = (nodeType?: string): string => {
  const typeLabels: Record<string, string> = {
    'manualTrigger': '手動觸發',
    'scheduleTrigger': '排程觸發',
    'webhookTrigger': 'Webhook 觸發',
    'lineNotification': 'Line 通知',
    'emailNotification': '電子郵件',
    'smsNotification': '簡訊通知',
    'linePay': 'Line Pay',
    'ecpay': '綠界金流'
  }
  return typeLabels[nodeType || ''] || nodeType || '未知類型'
}

const getNodeTypeFields = (nodeType?: string): PropertyField[] => {
  const fieldMap: Record<string, PropertyField[]> = {
    'lineNotification': [
      {
        key: 'message',
        label: '通知訊息',
        type: 'textarea',
        placeholder: '輸入要發送的訊息',
        required: true,
        rows: 3
      },
      {
        key: 'token',
        label: 'Line Token',
        type: 'text',
        placeholder: '輸入 Line Notify Token',
        required: true
      }
    ],
    'emailNotification': [
      {
        key: 'to',
        label: '收件人',
        type: 'text',
        placeholder: '輸入收件人信箱',
        required: true
      },
      {
        key: 'subject',
        label: '主旨',
        type: 'text',
        placeholder: '輸入郵件主旨',
        required: true
      },
      {
        key: 'body',
        label: '內容',
        type: 'textarea',
        placeholder: '輸入郵件內容',
        required: true,
        rows: 5
      }
    ],
    'linePay': [
      {
        key: 'amount',
        label: '金額',
        type: 'number',
        placeholder: '輸入金額',
        required: true,
        min: 1
      },
      {
        key: 'productName',
        label: '商品名稱',
        type: 'text',
        placeholder: '輸入商品名稱',
        required: true
      },
      {
        key: 'currency',
        label: '幣別',
        type: 'select',
        options: [
          { label: '新台幣 (TWD)', value: 'TWD' },
          { label: '美元 (USD)', value: 'USD' },
          { label: '日圓 (JPY)', value: 'JPY' }
        ],
        required: true
      }
    ]
  }
  
  return fieldMap[nodeType || ''] || []
}

// 監聽器
watch(() => props.selectedNode, (newNode) => {
  if (newNode) {
    nodeProperties.value = { ...newNode.data }
    nodePropertyErrors.value = {}
  }
})

watch(() => props.selectedEdge, (newEdge) => {
  if (newEdge) {
    edgeProperties.value = { ...newEdge.data }
    edgePropertyErrors.value = {}
  }
})
</script>

<style scoped>
.properties-panel {
  position: fixed;
  top: 56px; /* Header 高度 */
  right: 0;
  width: 48px;
  height: calc(100vh - 56px);
  background: white;
  border-left: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  z-index: 200;
  overflow: hidden;
}

.properties-panel.expanded {
  width: 320px;
}

.properties-panel.pinned {
  position: relative;
  top: 0;
  height: 100%;
}

/* 面板觸發器 */
.panel-trigger {
  position: absolute;
  top: 50%;
  left: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #86735E;
  color: white;
  cursor: pointer;
  transform: translateY(-50%);
  border-radius: 8px 0 0 8px;
  transition: all 0.2s ease;
  z-index: 10;
}

.panel-trigger:hover {
  background: #7a6654;
  transform: translateY(-50%) translateX(-2px);
}

.properties-panel.expanded .panel-trigger {
  display: none;
}

/* 面板內容 */
.panel-content {
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.properties-panel.expanded .panel-content {
  opacity: 1;
}

/* 面板標題列 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  min-height: 48px;
}

.panel-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.panel-controls {
  display: flex;
  gap: 4px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.control-btn.active {
  background: #86735E;
  color: white;
}

.validate-btn.btn-warning {
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
}

.validate-btn.btn-success {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

/* 驗證結果區域 */
.validation-section {
  border-bottom: 1px solid #e5e7eb;
  background: #fefefe;
}

.validation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.validation-header:hover {
  background: #f9fafb;
}

.validation-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #f59e0b;
}

.validation-summary {
  display: flex;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
}

.error-count {
  color: #ef4444;
}

.warning-count {
  color: #f59e0b;
}

.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.collapse-btn.collapsed {
  transform: rotate(-90deg);
}

.validation-content {
  max-height: 200px;
  overflow-y: auto;
}

.validation-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.validation-item:hover {
  background: #f9fafb;
}

.validation-item:last-child {
  border-bottom: none;
}

.validation-item.validation-error {
  background: rgba(239, 68, 68, 0.05);
}

.validation-item.validation-warning {
  background: rgba(245, 158, 11, 0.05);
}

.validation-icon {
  margin-top: 2px;
  flex-shrink: 0;
}

.validation-item.validation-error .validation-icon {
  color: #ef4444;
}

.validation-item.validation-warning .validation-icon {
  color: #f59e0b;
}

.validation-content-text {
  flex: 1;
  min-width: 0;
}

.validation-message {
  font-size: 12px;
  color: #374151;
  line-height: 1.4;
  margin-bottom: 2px;
}

.validation-location {
  font-size: 11px;
  color: #6b7280;
}

/* 屬性編輯區域 */
.properties-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 空選擇狀態 */
.empty-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: #9ca3af;
}

.empty-selection svg {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-selection p {
  margin: 0;
  font-size: 14px;
}

/* 節點屬性編輯 */
.node-properties,
.edge-properties {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.property-section-header {
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.node-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #86735E;
  flex-shrink: 0;
}

.default-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: currentColor;
}

.node-details {
  flex: 1;
  min-width: 0;
}

.node-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-type {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .properties-panel {
    position: fixed;
    top: 56px;
    right: -320px;
    width: 320px;
    height: calc(100vh - 56px);
    box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  }

  .properties-panel.expanded {
    right: 0;
  }

  .panel-trigger {
    left: -48px;
    border-radius: 8px 0 0 8px;
  }
}

@media (max-width: 768px) {
  .properties-panel.expanded {
    width: 100vw;
    right: 0;
  }

  .panel-content {
    width: 100%;
  }
}

/* 滾動條樣式 */
.validation-content::-webkit-scrollbar,
.properties-content::-webkit-scrollbar {
  width: 6px;
}

.validation-content::-webkit-scrollbar-track,
.properties-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.validation-content::-webkit-scrollbar-thumb,
.properties-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.validation-content::-webkit-scrollbar-thumb:hover,
.properties-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
