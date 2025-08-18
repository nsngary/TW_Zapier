<template>
  <div class="line-pay-node-editor">
    <el-form
      :model="nodeData"
      label-position="top"
      size="default"
      @submit.prevent
    >
      <!-- 基本資訊 -->
      <div class="editor-section">
        <h4 class="section-title">💳 Line Pay 付款設定</h4>
        
        <el-form-item label="付款金額" required>
          <el-input-number
            v-model="nodeData.amount"
            :min="1"
            :max="999999"
            :precision="0"
            placeholder="輸入付款金額"
            @change="handleChange"
          />
          <span class="currency-label">TWD (新台幣)</span>
        </el-form-item>

        <el-form-item label="商品名稱" required>
          <el-input
            v-model="nodeData.productName"
            placeholder="輸入商品名稱"
            maxlength="100"
            show-word-limit
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input
            v-model="nodeData.productDescription"
            type="textarea"
            :rows="2"
            placeholder="輸入商品描述（選填）"
            maxlength="200"
            show-word-limit
            @input="handleChange"
          />
        </el-form-item>
      </div>

      <!-- 訂單設定 -->
      <div class="editor-section">
        <h4 class="section-title">📋 訂單設定</h4>
        
        <el-form-item label="訂單編號">
          <div class="order-id-input">
            <el-input
              v-model="nodeData.orderId"
              placeholder="自動產生或手動輸入"
              @input="handleChange"
            />
            <el-button
              type="primary"
              plain
              size="small"
              @click="generateOrderId"
            >
              自動產生
            </el-button>
          </div>
          <div class="field-hint">
            訂單編號必須唯一，建議使用自動產生功能
          </div>
        </el-form-item>
      </div>

      <!-- URL 設定 -->
      <div class="editor-section">
        <h4 class="section-title">🔗 回調 URL 設定</h4>
        
        <el-form-item label="確認付款 URL" required>
          <el-input
            v-model="nodeData.confirmUrl"
            placeholder="https://your-site.com/confirm"
            @input="handleChange"
          />
          <div class="field-hint">
            付款成功後用戶將被重定向到此 URL
          </div>
        </el-form-item>

        <el-form-item label="取消付款 URL" required>
          <el-input
            v-model="nodeData.cancelUrl"
            placeholder="https://your-site.com/cancel"
            @input="handleChange"
          />
          <div class="field-hint">
            付款取消後用戶將被重定向到此 URL
          </div>
        </el-form-item>
      </div>

      <!-- 進階設定 -->
      <div class="editor-section">
        <h4 class="section-title">⚙️ 進階設定</h4>
        
        <el-form-item label="沙盒模式">
          <el-switch
            v-model="nodeData.sandbox"
            active-text="測試環境"
            inactive-text="正式環境"
            @change="handleChange"
          />
          <div class="field-hint">
            測試環境用於開發和測試，不會產生實際交易
          </div>
        </el-form-item>

        <el-form-item label="貨幣">
          <el-select
            v-model="nodeData.currency"
            placeholder="選擇貨幣"
            @change="handleChange"
          >
            <el-option label="新台幣 (TWD)" value="TWD" />
            <el-option label="美元 (USD)" value="USD" />
            <el-option label="日圓 (JPY)" value="JPY" />
          </el-select>
        </el-form-item>
      </div>

      <!-- Line Pay 特色提示 -->
      <div class="line-pay-info">
        <el-alert
          title="Line Pay 台灣整合"
          type="success"
          show-icon
          :closable="false"
        >
          <template #default>
            <p>此節點已針對台灣 Line Pay 環境優化：</p>
            <ul>
              <li>✅ 支援新台幣 (TWD) 計價</li>
              <li>✅ 整合 Line Pay API v3</li>
              <li>✅ 支援沙盒測試環境</li>
              <li>✅ 符合台灣金融法規</li>
              <li>✅ 自動處理 HMAC 簽名驗證</li>
            </ul>
          </template>
        </el-alert>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { WorkflowNode } from '@/types/workflow'

// ===== Props =====

interface Props {
  modelValue: WorkflowNode
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const nodeData = ref<WorkflowNode>({ 
  ...props.modelValue,
  // 設定預設值
  amount: props.modelValue.amount || 1000,
  currency: props.modelValue.currency || 'TWD',
  productName: props.modelValue.productName || '',
  productDescription: props.modelValue.productDescription || '',
  orderId: props.modelValue.orderId || '',
  confirmUrl: props.modelValue.confirmUrl || '',
  cancelUrl: props.modelValue.cancelUrl || '',
  sandbox: props.modelValue.sandbox !== undefined ? props.modelValue.sandbox : true
})

// ===== 方法 =====

const handleChange = () => {
  emit('update:modelValue', nodeData.value)
  emit('change', nodeData.value)
}

const generateOrderId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  nodeData.value.orderId = `LP${timestamp}${random}`
  handleChange()
}

// ===== 監聽器 =====

watch(
  () => props.modelValue,
  (newValue) => {
    nodeData.value = { ...newValue }
  },
  { deep: true }
)

// ===== 事件 =====

const emit = defineEmits<{
  'update:modelValue': [value: WorkflowNode]
  'change': [value: WorkflowNode]
}>()
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.line-pay-node-editor {
  .editor-section {
    margin-bottom: 24px;

    .section-title {
      color: $primary-color;
      font-size: $font-size-base;
      font-weight: 600;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid $border-color-light;
    }
  }

  .currency-label {
    margin-left: 8px;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    font-weight: 500;
  }

  .order-id-input {
    display: flex;
    gap: 8px;
    align-items: center;

    .el-input {
      flex: 1;
    }
  }

  .field-hint {
    font-size: 12px;
    color: $text-color-secondary;
    margin-top: 4px;
    line-height: 1.4;
  }

  .line-pay-info {
    margin-top: 24px;

    ul {
      margin: 8px 0 0 0;
      padding-left: 24px;

      li {
        margin-bottom: 4px;
        font-size: $font-size-sm;
        line-height: 1.4;
      }
    }
  }

  // Element Plus 組件樣式調整
  :deep(.el-form-item__label) {
    font-weight: 500;
    color: $text-color;
  }

  :deep(.el-input-number) {
    width: 100%;
  }

  :deep(.el-switch) {
    .el-switch__label {
      font-size: $font-size-sm;
    }
  }
}
</style>
