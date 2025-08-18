<template>
  <div class="notification-node-editor">
    <el-form
      :model="nodeData"
      label-position="top"
      size="default"
      @submit.prevent
    >
      <!-- Line 通知節點 -->
      <template v-if="nodeData.type === 'lineNotify'">
        <el-form-item label="通知訊息" required>
          <el-input
            v-model="nodeData.message"
            type="textarea"
            :rows="3"
            placeholder="輸入要發送的通知訊息"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="貼圖設定">
          <el-row :gutter="12">
            <el-col :span="12">
              <el-input
                v-model="nodeData.settings.stickerPackageId"
                placeholder="貼圖包 ID"
                @input="handleChange"
              />
            </el-col>
            <el-col :span="12">
              <el-input
                v-model="nodeData.settings.stickerId"
                placeholder="貼圖 ID"
                @input="handleChange"
              />
            </el-col>
          </el-row>
          <el-text size="small" type="info">
            留空則不發送貼圖
          </el-text>
        </el-form-item>

        <el-form-item label="圖片附件">
          <el-input
            v-model="nodeData.settings.imageUrl"
            placeholder="圖片 URL（可選）"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="通知時間">
          <el-radio-group
            v-model="nodeData.settings.sendTime"
            @change="handleChange"
          >
            <el-radio label="immediate">立即發送</el-radio>
            <el-radio label="scheduled">排程發送</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="nodeData.settings.sendTime === 'scheduled'"
          label="發送時間"
        >
          <el-date-picker
            v-model="nodeData.settings.scheduledTime"
            type="datetime"
            placeholder="選擇發送時間"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 電子郵件節點 -->
      <template v-else-if="nodeData.type === 'email'">
        <el-form-item label="收件人" required>
          <el-input
            v-model="nodeData.to"
            placeholder="email@example.com"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="副本收件人">
          <el-input
            v-model="nodeData.cc"
            placeholder="多個信箱用逗號分隔"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="密件副本">
          <el-input
            v-model="nodeData.bcc"
            placeholder="多個信箱用逗號分隔"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="郵件主旨" required>
          <el-input
            v-model="nodeData.subject"
            placeholder="輸入郵件主旨"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="郵件內容" required>
          <el-input
            v-model="nodeData.body"
            type="textarea"
            :rows="6"
            placeholder="輸入郵件內容"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="內容格式">
          <el-radio-group
            v-model="nodeData.settings.format"
            @change="handleChange"
          >
            <el-radio label="text">純文字</el-radio>
            <el-radio label="html">HTML</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="重要性">
          <el-select
            v-model="nodeData.settings.priority"
            placeholder="選擇重要性"
            @change="handleChange"
          >
            <el-option label="低" value="low" />
            <el-option label="一般" value="normal" />
            <el-option label="高" value="high" />
          </el-select>
        </el-form-item>

        <el-form-item label="附件">
          <div class="attachments-editor">
            <div
              v-for="(attachment, index) in nodeData.settings.attachments"
              :key="index"
              class="attachment-item"
            >
              <el-row :gutter="12">
                <el-col :span="10">
                  <el-input
                    v-model="attachment.name"
                    placeholder="檔案名稱"
                    @input="handleChange"
                  />
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="attachment.url"
                    placeholder="檔案 URL"
                    @input="handleChange"
                  />
                </el-col>
                <el-col :span="2">
                  <el-button
                    type="danger"
                    size="small"
                    :icon="Delete"
                    @click="removeAttachment(index)"
                  />
                </el-col>
              </el-row>
            </div>
            
            <el-button
              type="primary"
              plain
              size="small"
              :icon="Plus"
              @click="addAttachment"
            >
              新增附件
            </el-button>
          </div>
        </el-form-item>
      </template>

      <!-- 簡訊通知節點 -->
      <template v-else-if="nodeData.type === 'sms'">
        <el-form-item label="收件人手機" required>
          <el-input
            v-model="nodeData.to"
            placeholder="+886912345678"
            @input="handleChange"
          />
          <el-text size="small" type="info">
            請使用國際格式，例如：+886912345678
          </el-text>
        </el-form-item>

        <el-form-item label="簡訊內容" required>
          <el-input
            v-model="nodeData.message"
            type="textarea"
            :rows="3"
            :maxlength="160"
            show-word-limit
            placeholder="輸入簡訊內容（最多160字）"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="簡訊服務商">
          <el-select
            v-model="nodeData.settings.provider"
            placeholder="選擇服務商"
            @change="handleChange"
          >
            <el-option label="Twilio" value="twilio" />
            <el-option label="AWS SNS" value="aws-sns" />
            <el-option label="中華電信" value="cht" />
            <el-option label="台灣大哥大" value="twm" />
          </el-select>
        </el-form-item>

        <el-form-item label="發送時間">
          <el-radio-group
            v-model="nodeData.settings.sendTime"
            @change="handleChange"
          >
            <el-radio label="immediate">立即發送</el-radio>
            <el-radio label="scheduled">排程發送</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="nodeData.settings.sendTime === 'scheduled'"
          label="發送時間"
        >
          <el-date-picker
            v-model="nodeData.settings.scheduledTime"
            type="datetime"
            placeholder="選擇發送時間"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 通用通知提示 -->
      <template v-else>
        <el-alert
          title="通知節點"
          description="請選擇具體的通知類型來配置通知參數。"
          type="info"
          show-icon
          :closable="false"
        />
      </template>

      <!-- 台灣通知服務特色說明 -->
      <div class="taiwan-notification-info">
        <el-alert
          title="台灣通知服務整合"
          type="success"
          show-icon
          :closable="false"
        >
          <template #default>
            <p>針對台灣使用者優化的通知服務：</p>
            <ul>
              <li>✅ 支援 Line Notify 台灣熱門服務</li>
              <li>✅ 整合台灣電信業者簡訊服務</li>
              <li>✅ 符合台灣時區和語言習慣</li>
              <li>✅ 提供繁體中文錯誤訊息</li>
            </ul>
          </template>
        </el-alert>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// ===== Props =====

interface Props {
  modelValue: any
  nodeDefinition?: any
}

const props = defineProps<Props>()

// ===== 響應式資料 =====

const nodeData = ref<any>({ ...props.modelValue })

// ===== 方法 =====

const handleChange = () => {
  emit('update:modelValue', nodeData.value)
  emit('change', nodeData.value)
}

const addAttachment = () => {
  if (!nodeData.value.settings.attachments) {
    nodeData.value.settings.attachments = []
  }
  
  nodeData.value.settings.attachments.push({
    name: '',
    url: ''
  })
  
  handleChange()
}

const removeAttachment = (index: number) => {
  if (nodeData.value.settings.attachments) {
    nodeData.value.settings.attachments.splice(index, 1)
    handleChange()
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
  'update:modelValue': [value: any]
  'change': [value: any]
}>()
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.notification-node-editor {
  .attachments-editor {
    .attachment-item {
      margin-bottom: 16px;
      padding: 16px;
      background: $bg-color-secondary;
      border-radius: 4px;
      border: 1px solid $border-color;
    }
  }

  .taiwan-notification-info {
    margin-top: 24px;

    ul {
      margin: 8px 0 0 0;
      padding-left: 24px;

      li {
        margin-bottom: 4px;
        font-size: $font-size-sm;
      }
    }
  }
}

// 深色主題
[data-theme="dark"] {
  .notification-node-editor {
    .attachments-editor {
      .attachment-item {
        background: var(--bg-color-tertiary);
        border-color: var(--border-color);
      }
    }
  }
}
</style>
