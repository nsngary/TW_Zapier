<template>
  <div class="payment-node-editor">
    <el-form
      :model="nodeData"
      label-position="top"
      size="default"
      @submit.prevent
    >
      <!-- Line Pay 節點 -->
      <template v-if="nodeData.type === 'linePay'">
        <el-form-item label="付款金額" required>
          <el-input-number
            v-model="nodeData.amount"
            :min="1"
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
            @input="handleChange"
          />
        </el-form-item>

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
        </el-form-item>

        <el-form-item label="確認付款 URL">
          <el-input
            v-model="nodeData.settings.confirmUrl"
            placeholder="https://your-site.com/confirm"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="取消付款 URL">
          <el-input
            v-model="nodeData.settings.cancelUrl"
            placeholder="https://your-site.com/cancel"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="沙盒模式">
          <el-switch
            v-model="nodeData.settings.sandbox"
            active-text="測試環境"
            inactive-text="正式環境"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- ECPay 節點 -->
      <template v-else-if="nodeData.type === 'ecPay'">
        <el-form-item label="付款金額" required>
          <el-input-number
            v-model="nodeData.amount"
            :min="1"
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
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="訂單編號">
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
        </el-form-item>

        <el-form-item label="付款方式">
          <el-select
            v-model="nodeData.settings.choosePayment"
            placeholder="選擇付款方式"
            @change="handleChange"
          >
            <el-option label="不指定付款方式" value="ALL" />
            <el-option label="信用卡" value="Credit" />
            <el-option label="ATM 轉帳" value="ATM" />
            <el-option label="超商代碼" value="CVS" />
            <el-option label="超商條碼" value="BARCODE" />
          </el-select>
        </el-form-item>

        <el-form-item label="付款類型">
          <el-radio-group
            v-model="nodeData.settings.paymentType"
            @change="handleChange"
          >
            <el-radio label="aio">一次付清</el-radio>
            <el-radio label="period">定期定額</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="沙盒模式">
          <el-switch
            v-model="nodeData.settings.sandbox"
            active-text="測試環境"
            inactive-text="正式環境"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 藍新金流節點 -->
      <template v-else-if="nodeData.type === 'newebPay'">
        <el-form-item label="付款金額" required>
          <el-input-number
            v-model="nodeData.amount"
            :min="1"
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
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="訂單編號">
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
        </el-form-item>

        <el-form-item label="付款方式">
          <el-select
            v-model="nodeData.settings.paymentType"
            placeholder="選擇付款方式"
            @change="handleChange"
          >
            <el-option label="信用卡" value="CREDIT" />
            <el-option label="ATM 轉帳" value="VACC" />
            <el-option label="超商代碼" value="CVS" />
            <el-option label="超商條碼" value="BARCODE" />
          </el-select>
        </el-form-item>

        <el-form-item label="API 版本">
          <el-select
            v-model="nodeData.settings.version"
            @change="handleChange"
          >
            <el-option label="2.0" value="2.0" />
            <el-option label="1.6" value="1.6" />
          </el-select>
        </el-form-item>

        <el-form-item label="沙盒模式">
          <el-switch
            v-model="nodeData.settings.sandbox"
            active-text="測試環境"
            inactive-text="正式環境"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 智付通節點 -->
      <template v-else-if="nodeData.type === 'spgateway'">
        <el-form-item label="付款金額" required>
          <el-input-number
            v-model="nodeData.amount"
            :min="1"
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
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="訂單編號">
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
        </el-form-item>

        <el-form-item label="付款方式">
          <el-select
            v-model="nodeData.settings.paymentType"
            placeholder="選擇付款方式"
            @change="handleChange"
          >
            <el-option label="信用卡" value="CREDIT" />
            <el-option label="ATM 轉帳" value="VACC" />
            <el-option label="超商代碼" value="CVS" />
          </el-select>
        </el-form-item>

        <el-form-item label="沙盒模式">
          <el-switch
            v-model="nodeData.settings.sandbox"
            active-text="測試環境"
            inactive-text="正式環境"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 通用金流提示 -->
      <template v-else>
        <el-alert
          title="金流節點"
          description="請選擇具體的金流服務提供商來配置付款參數。"
          type="info"
          show-icon
          :closable="false"
        />
      </template>

      <!-- 台灣金流特色提示 -->
      <div class="taiwan-payment-info">
        <el-alert
          title="台灣金流整合"
          type="success"
          show-icon
          :closable="false"
        >
          <template #default>
            <p>此節點已針對台灣金流環境優化：</p>
            <ul>
              <li>✅ 支援新台幣 (TWD) 計價</li>
              <li>✅ 整合台灣主要金流服務商</li>
              <li>✅ 符合台灣金融法規要求</li>
              <li>✅ 提供測試環境支援</li>
            </ul>
          </template>
        </el-alert>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { WorkflowNode, PaletteNode } from '@/types/workflow'

// ===== Props =====

interface Props {
  modelValue: WorkflowNode
  nodeDefinition?: PaletteNode
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const nodeData = ref<WorkflowNode>({ ...props.modelValue })

// ===== 方法 =====

const handleChange = () => {
  emit('update:modelValue', nodeData.value)
  emit('change', nodeData.value)
}

const generateOrderId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  nodeData.value.orderId = `TW${timestamp}${random}`
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
.payment-node-editor {
  .currency-label {
    margin-left: $spacing-sm;
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }

  .order-id-input {
    display: flex;
    gap: $spacing-sm;
    align-items: center;

    .el-input {
      flex: 1;
    }
  }

  .taiwan-payment-info {
    margin-top: $spacing-lg;

    ul {
      margin: $spacing-sm 0 0 0;
      padding-left: $spacing-lg;

      li {
        margin-bottom: $spacing-xs;
        font-size: $font-size-sm;
      }
    }
  }
}
</style>
