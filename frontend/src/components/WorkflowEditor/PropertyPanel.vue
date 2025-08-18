<template>
  <div class="property-panel">
    <div class="panel-header">
      <h3>屬性設定</h3>
    </div>
    
    <div class="panel-content">
      <!-- 未選中任何元素 -->
      <div v-if="!selectedNode && !selectedEdge" class="empty-state">
        <el-icon size="48" color="#d1d5db">
          <Setting />
        </el-icon>
        <p>請選擇節點或連線來編輯屬性</p>
      </div>

      <!-- 節點屬性編輯 -->
      <div v-else-if="selectedNode" class="node-properties">
        <div class="property-section">
          <h4>基本設定</h4>
          
          <div class="property-field">
            <label>節點名稱</label>
            <el-input
              v-model="nodeData.label"
              placeholder="輸入節點名稱"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>節點描述</label>
            <el-input
              v-model="nodeData.description"
              type="textarea"
              :rows="2"
              placeholder="輸入節點描述（可選）"
              @blur="updateNode"
            />
          </div>
        </div>

        <!-- Line Pay 節點特定屬性 -->
        <div v-if="selectedNode.type === 'linePay'" class="property-section">
          <h4>Line Pay 設定</h4>
          
          <div class="property-field">
            <label>付款金額 <span class="required">*</span></label>
            <el-input-number
              v-model="nodeData.amount"
              :min="1"
              :max="999999"
              placeholder="輸入付款金額"
              @change="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>商品名稱 <span class="required">*</span></label>
            <el-input
              v-model="nodeData.productName"
              placeholder="輸入商品名稱"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>訂單編號</label>
            <el-input
              v-model="nodeData.orderId"
              placeholder="自動生成或手動輸入"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>確認頁面 URL</label>
            <el-input
              v-model="nodeData.confirmUrl"
              placeholder="付款成功後跳轉的頁面"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>取消頁面 URL</label>
            <el-input
              v-model="nodeData.cancelUrl"
              placeholder="付款取消後跳轉的頁面"
              @blur="updateNode"
            />
          </div>
        </div>

        <!-- 綠界節點特定屬性 -->
        <div v-else-if="selectedNode.type === 'ecPay'" class="property-section">
          <h4>綠界科技設定</h4>
          
          <div class="property-field">
            <label>交易金額 <span class="required">*</span></label>
            <el-input-number
              v-model="nodeData.totalAmount"
              :min="1"
              :max="999999"
              placeholder="輸入交易金額"
              @change="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>商店交易編號 <span class="required">*</span></label>
            <el-input
              v-model="nodeData.merchantTradeNo"
              placeholder="輸入商店交易編號"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>交易描述</label>
            <el-input
              v-model="nodeData.tradeDesc"
              placeholder="輸入交易描述"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>付款方式</label>
            <el-select
              v-model="nodeData.paymentType"
              placeholder="選擇付款方式"
              @change="updateNode"
            >
              <el-option label="全功能" value="aio" />
              <el-option label="信用卡" value="credit" />
              <el-option label="ATM" value="atm" />
              <el-option label="超商代碼" value="cvs" />
            </el-select>
          </div>
        </div>

        <!-- 桃機航班節點特定屬性 -->
        <div v-else-if="selectedNode.type === 'taoyuanAirport'" class="property-section">
          <h4>桃機航班設定</h4>
          
          <div class="property-field">
            <label>航班號碼</label>
            <el-input
              v-model="nodeData.flightNumber"
              placeholder="例如：CI123"
              @blur="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>查詢日期</label>
            <el-date-picker
              v-model="nodeData.date"
              type="date"
              placeholder="選擇查詢日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              @change="updateNode"
            />
          </div>
          
          <div class="property-field">
            <label>查詢類型</label>
            <el-select
              v-model="nodeData.operation"
              placeholder="選擇查詢類型"
              @change="updateNode"
            >
              <el-option label="航班資訊" value="getInfo" />
              <el-option label="延誤狀況" value="getDelay" />
              <el-option label="登機門" value="getGate" />
            </el-select>
          </div>
        </div>

        <!-- 節點操作 -->
        <div class="property-section">
          <h4>節點操作</h4>
          
          <div class="property-actions">
            <el-button 
              type="primary" 
              size="small"
              @click="testNode"
              :loading="isTesting"
            >
              測試節點
            </el-button>
            
            <el-button 
              type="danger" 
              size="small"
              @click="deleteNode"
            >
              刪除節點
            </el-button>
          </div>
        </div>

        <!-- 節點驗證結果 -->
        <div v-if="validationResult" class="property-section">
          <h4>驗證結果</h4>
          
          <div class="validation-result">
            <div v-if="validationResult.errors.length > 0" class="validation-errors">
              <div class="validation-title error">
                <el-icon><WarningFilled /></el-icon>
                錯誤 ({{ validationResult.errors.length }})
              </div>
              <ul>
                <li v-for="error in validationResult.errors" :key="error">
                  {{ error }}
                </li>
              </ul>
            </div>
            
            <div v-if="validationResult.warnings.length > 0" class="validation-warnings">
              <div class="validation-title warning">
                <el-icon><Warning /></el-icon>
                警告 ({{ validationResult.warnings.length }})
              </div>
              <ul>
                <li v-for="warning in validationResult.warnings" :key="warning">
                  {{ warning }}
                </li>
              </ul>
            </div>
            
            <div v-if="validationResult.isValid" class="validation-success">
              <div class="validation-title success">
                <el-icon><CircleCheckFilled /></el-icon>
                節點配置正確
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 邊線屬性編輯 -->
      <div v-else-if="selectedEdge" class="edge-properties">
        <div class="property-section">
          <h4>連線設定</h4>
          
          <div class="property-field">
            <label>連線標籤</label>
            <el-input
              v-model="edgeData.label"
              placeholder="輸入連線標籤（可選）"
              @blur="updateEdge"
            />
          </div>
          
          <div class="property-field">
            <label>動畫效果</label>
            <el-switch
              v-model="edgeData.animated"
              @change="updateEdge"
            />
          </div>
        </div>

        <div class="property-section">
          <h4>連線操作</h4>
          
          <div class="property-actions">
            <el-button 
              type="danger" 
              size="small"
              @click="deleteEdge"
            >
              刪除連線
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Setting,
  WarningFilled,
  Warning,
  CircleCheckFilled
} from '@element-plus/icons-vue'
import type { 
  TaiwanNode, 
  TaiwanEdge, 
  NodeValidationResult 
} from '@/types/workflow'

// Props
interface Props {
  selectedNode?: TaiwanNode | null
  selectedEdge?: TaiwanEdge | null
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  updateNode: [id: string, data: any]
  updateEdge: [id: string, data: any]
  deleteNode: []
  deleteEdge: []
}>()

// 本地狀態
const nodeData = ref<any>({})
const edgeData = ref<any>({})
const isTesting = ref(false)
const validationResult = ref<NodeValidationResult | null>(null)

// 監聽選中節點變化
watch(() => props.selectedNode, (newNode) => {
  if (newNode) {
    nodeData.value = { ...newNode.data }
    validateNode()
  } else {
    nodeData.value = {}
    validationResult.value = null
  }
}, { immediate: true })

// 監聽選中邊線變化
watch(() => props.selectedEdge, (newEdge) => {
  if (newEdge) {
    edgeData.value = { ...newEdge.data }
  } else {
    edgeData.value = {}
  }
}, { immediate: true })

// 方法：更新節點
function updateNode() {
  if (props.selectedNode) {
    emit('updateNode', props.selectedNode.id, nodeData.value)
    validateNode()
  }
}

// 方法：更新邊線
function updateEdge() {
  if (props.selectedEdge) {
    emit('updateEdge', props.selectedEdge.id, edgeData.value)
  }
}

// 方法：刪除節點
function deleteNode() {
  emit('deleteNode')
}

// 方法：刪除邊線
function deleteEdge() {
  emit('deleteEdge')
}

// 方法：測試節點
async function testNode() {
  if (!props.selectedNode) return
  
  isTesting.value = true
  
  try {
    // 模擬測試過程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('節點測試成功')
  } catch (error) {
    ElMessage.error('節點測試失敗')
  } finally {
    isTesting.value = false
  }
}

// 方法：驗證節點
function validateNode() {
  if (!props.selectedNode) {
    validationResult.value = null
    return
  }

  const errors: string[] = []
  const warnings: string[] = []
  const node = props.selectedNode

  // 基礎驗證
  if (!nodeData.value.label?.trim()) {
    errors.push('節點名稱不能為空')
  }

  // 根據節點類型進行特定驗證
  switch (node.type) {
    case 'linePay':
      if (!nodeData.value.amount || nodeData.value.amount <= 0) {
        errors.push('付款金額必須大於 0')
      }
      if (!nodeData.value.productName?.trim()) {
        errors.push('商品名稱不能為空')
      }
      if (!nodeData.value.confirmUrl?.trim()) {
        warnings.push('建議設定確認頁面 URL')
      }
      break

    case 'ecPay':
      if (!nodeData.value.totalAmount || nodeData.value.totalAmount <= 0) {
        errors.push('交易金額必須大於 0')
      }
      if (!nodeData.value.merchantTradeNo?.trim()) {
        errors.push('商店交易編號不能為空')
      }
      break

    case 'taoyuanAirport':
      if (!nodeData.value.flightNumber?.trim()) {
        warnings.push('建議設定航班號碼以獲得更準確的資訊')
      }
      break
  }

  validationResult.value = {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}
</script>

<style scoped>
.property-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-color);
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid var(--border-color-light);
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
  color: var(--text-color-tertiary);
}

.empty-state p {
  margin: 16px 0 0 0;
  font-size: 14px;
}

.property-section {
  margin-bottom: 24px;
}

.property-section h4 {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color-light);
}

.property-field {
  margin-bottom: 16px;
}

.property-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-color);
}

.required {
  color: var(--color-error);
}

.property-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.validation-result {
  font-size: 13px;
}

.validation-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  margin-bottom: 8px;
}

.validation-title.error {
  color: var(--color-error);
}

.validation-title.warning {
  color: var(--color-warning);
}

.validation-title.success {
  color: var(--color-success);
}

.validation-errors ul,
.validation-warnings ul {
  margin: 0;
  padding-left: 20px;
}

.validation-errors li,
.validation-warnings li {
  margin-bottom: 4px;
}

.validation-errors {
  color: var(--color-error);
}

.validation-warnings {
  color: var(--color-warning);
}

/* 滾動條樣式 */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: var(--bg-color-tertiary);
}

.panel-content::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--border-color-dark);
}
</style>
