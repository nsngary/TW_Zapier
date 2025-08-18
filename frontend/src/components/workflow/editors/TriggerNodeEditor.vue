<template>
  <div class="trigger-node-editor">
    <el-form
      :model="nodeData"
      label-position="top"
      size="default"
      @submit.prevent
    >
      <!-- 手動觸發節點 -->
      <template v-if="nodeData.type === 'manualTrigger'">
        <el-alert
          title="手動觸發"
          description="此節點將等待手動執行來啟動工作流程。"
          type="info"
          show-icon
          :closable="false"
        />
        
        <el-form-item label="觸發按鈕文字">
          <el-input
            v-model="nodeData.settings.buttonText"
            placeholder="執行工作流程"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="確認執行">
          <el-switch
            v-model="nodeData.settings.requireConfirmation"
            active-text="需要確認"
            inactive-text="直接執行"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- Webhook 觸發節點 -->
      <template v-else-if="nodeData.type === 'webhookTrigger'">
        <el-form-item label="Webhook 路徑" required>
          <el-input
            v-model="nodeData.settings.path"
            placeholder="/webhook/my-workflow"
            @input="handleChange"
          >
            <template #prepend>
              <span>{{ baseUrl }}</span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="HTTP 方法">
          <el-select
            v-model="nodeData.settings.method"
            placeholder="選擇 HTTP 方法"
            @change="handleChange"
          >
            <el-option label="POST" value="POST" />
            <el-option label="GET" value="GET" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
          </el-select>
        </el-form-item>

        <el-form-item label="認證方式">
          <el-select
            v-model="nodeData.settings.authentication"
            placeholder="選擇認證方式"
            @change="handleChange"
          >
            <el-option label="無認證" value="none" />
            <el-option label="API 金鑰" value="apiKey" />
            <el-option label="基本認證" value="basic" />
            <el-option label="Bearer Token" value="bearer" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="nodeData.settings.authentication === 'apiKey'"
          label="API 金鑰參數名稱"
        >
          <el-input
            v-model="nodeData.settings.apiKeyName"
            placeholder="X-API-Key"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="回應格式">
          <el-radio-group
            v-model="nodeData.settings.responseFormat"
            @change="handleChange"
          >
            <el-radio label="json">JSON</el-radio>
            <el-radio label="text">純文字</el-radio>
            <el-radio label="xml">XML</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="完整 Webhook URL">
          <el-input
            :model-value="fullWebhookUrl"
            readonly
            @click="copyWebhookUrl"
          >
            <template #append>
              <el-button :icon="CopyDocument" @click="copyWebhookUrl">
                複製
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </template>

      <!-- 定時觸發節點 -->
      <template v-else-if="nodeData.type === 'scheduleTrigger'">
        <el-form-item label="觸發模式">
          <el-radio-group
            v-model="nodeData.settings.mode"
            @change="handleScheduleModeChange"
          >
            <el-radio label="interval">間隔執行</el-radio>
            <el-radio label="cron">Cron 表達式</el-radio>
            <el-radio label="specific">特定時間</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 間隔執行 -->
        <template v-if="nodeData.settings.mode === 'interval'">
          <el-form-item label="執行間隔">
            <el-row :gutter="12">
              <el-col :span="12">
                <el-input-number
                  v-model="nodeData.settings.intervalValue"
                  :min="1"
                  placeholder="間隔時間"
                  @change="handleChange"
                />
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="nodeData.settings.intervalUnit"
                  placeholder="時間單位"
                  @change="handleChange"
                >
                  <el-option label="分鐘" value="minutes" />
                  <el-option label="小時" value="hours" />
                  <el-option label="天" value="days" />
                  <el-option label="週" value="weeks" />
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
        </template>

        <!-- Cron 表達式 -->
        <template v-else-if="nodeData.settings.mode === 'cron'">
          <el-form-item label="Cron 表達式">
            <el-input
              v-model="nodeData.settings.cronExpression"
              placeholder="0 0 * * *"
              @input="handleChange"
            />
            <div class="cron-help">
              <el-text size="small" type="info">
                格式：分 時 日 月 週 (例如：0 9 * * 1-5 表示週一到週五早上9點)
              </el-text>
            </div>
          </el-form-item>

          <el-form-item label="常用 Cron 模板">
            <el-select
              placeholder="選擇常用模板"
              @change="applyCronTemplate"
            >
              <el-option label="每天午夜" value="0 0 * * *" />
              <el-option label="每天早上9點" value="0 9 * * *" />
              <el-option label="工作日早上9點" value="0 9 * * 1-5" />
              <el-option label="每小時" value="0 * * * *" />
              <el-option label="每30分鐘" value="*/30 * * * *" />
              <el-option label="每週一早上9點" value="0 9 * * 1" />
            </el-select>
          </el-form-item>
        </template>

        <!-- 特定時間 -->
        <template v-else-if="nodeData.settings.mode === 'specific'">
          <el-form-item label="執行日期">
            <el-date-picker
              v-model="nodeData.settings.specificDate"
              type="datetime"
              placeholder="選擇執行時間"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="handleChange"
            />
          </el-form-item>
        </template>

        <el-form-item label="時區">
          <el-select
            v-model="nodeData.settings.timezone"
            placeholder="選擇時區"
            @change="handleChange"
          >
            <el-option label="台北時間 (UTC+8)" value="Asia/Taipei" />
            <el-option label="UTC 時間" value="UTC" />
            <el-option label="東京時間 (UTC+9)" value="Asia/Tokyo" />
            <el-option label="香港時間 (UTC+8)" value="Asia/Hong_Kong" />
          </el-select>
        </el-form-item>

        <el-form-item label="啟用排程">
          <el-switch
            v-model="nodeData.settings.enabled"
            active-text="啟用"
            inactive-text="停用"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 通用觸發提示 -->
      <template v-else>
        <el-alert
          title="觸發節點"
          description="請選擇具體的觸發類型來配置觸發條件。"
          type="info"
          show-icon
          :closable="false"
        />
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { WorkflowNode, PaletteNode } from '@/types/workflow'

// ===== Props =====

interface Props {
  modelValue: WorkflowNode
  nodeDefinition?: PaletteNode
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const nodeData = ref<WorkflowNode>({ ...props.modelValue })
const baseUrl = ref('https://your-domain.com/api/webhooks')

// ===== 計算屬性 =====

const fullWebhookUrl = computed(() => {
  const path = nodeData.value.settings?.path || '/webhook'
  return `${baseUrl.value}${path}`
})

// ===== 方法 =====

const handleChange = () => {
  emit('update:modelValue', nodeData.value)
  emit('change', nodeData.value)
}

const handleScheduleModeChange = () => {
  // 重置相關設定
  if (nodeData.value.settings.mode === 'interval') {
    nodeData.value.settings.intervalValue = 1
    nodeData.value.settings.intervalUnit = 'hours'
  } else if (nodeData.value.settings.mode === 'cron') {
    nodeData.value.settings.cronExpression = '0 0 * * *'
  } else if (nodeData.value.settings.mode === 'specific') {
    nodeData.value.settings.specificDate = ''
  }
  
  handleChange()
}

const applyCronTemplate = (template: string) => {
  nodeData.value.settings.cronExpression = template
  handleChange()
}

const copyWebhookUrl = async () => {
  try {
    await navigator.clipboard.writeText(fullWebhookUrl.value)
    ElMessage.success('Webhook URL 已複製到剪貼簿')
  } catch (error) {
    ElMessage.error('複製失敗，請手動複製')
  }
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
.trigger-node-editor {
  .cron-help {
    margin-top: $spacing-xs;
  }
}
</style>
