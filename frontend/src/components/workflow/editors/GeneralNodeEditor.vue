<template>
  <div class="general-node-editor">
    <el-form
      :model="nodeData"
      label-position="top"
      size="default"
      @submit.prevent
    >
      <!-- HTTP 請求節點 -->
      <template v-if="nodeData.type === 'httpRequest'">
        <el-form-item label="請求方法" required>
          <el-select
            v-model="nodeData.method"
            placeholder="選擇請求方法"
            @change="handleChange"
          >
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
            <el-option label="PATCH" value="PATCH" />
          </el-select>
        </el-form-item>

        <el-form-item label="請求 URL" required>
          <el-input
            v-model="nodeData.url"
            placeholder="https://api.example.com/endpoint"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="請求標頭">
          <KeyValueEditor
            v-model="nodeData.headers"
            placeholder-key="標頭名稱"
            placeholder-value="標頭值"
            @change="handleChange"
          />
        </el-form-item>

        <el-form-item
          v-if="['POST', 'PUT', 'PATCH'].includes(nodeData.method)"
          label="請求內容"
        >
          <el-input
            v-model="nodeData.body"
            type="textarea"
            :rows="4"
            placeholder="JSON 格式的請求內容"
            @input="handleChange"
          />
        </el-form-item>

        <el-form-item label="超時時間（秒）">
          <el-input-number
            v-model="nodeData.settings.timeout"
            :min="1"
            :max="300"
            @change="handleChange"
          />
        </el-form-item>

        <el-form-item label="跟隨重定向">
          <el-switch
            v-model="nodeData.settings.followRedirects"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 資料轉換節點 -->
      <template v-else-if="nodeData.type === 'dataTransform'">
        <el-form-item label="轉換操作" required>
          <el-select
            v-model="nodeData.operation"
            placeholder="選擇轉換操作"
            @change="handleChange"
          >
            <el-option label="設定值" value="set" />
            <el-option label="移除欄位" value="remove" />
            <el-option label="重新命名" value="rename" />
            <el-option label="合併資料" value="merge" />
          </el-select>
        </el-form-item>

        <el-form-item
          v-if="nodeData.operation === 'set'"
          label="設定值"
        >
          <KeyValueEditor
            v-model="nodeData.values"
            placeholder-key="欄位名稱"
            placeholder-value="欄位值"
            @change="handleChange"
          />
        </el-form-item>

        <el-form-item label="只保留設定的欄位">
          <el-switch
            v-model="nodeData.settings.keepOnlySet"
            @change="handleChange"
          />
        </el-form-item>
      </template>

      <!-- 條件判斷節點 -->
      <template v-else-if="nodeData.type === 'condition'">
        <el-form-item label="組合操作">
          <el-radio-group
            v-model="nodeData.settings.combineOperation"
            @change="handleChange"
          >
            <el-radio label="AND">全部條件成立</el-radio>
            <el-radio label="OR">任一條件成立</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="條件設定">
          <div class="conditions-editor">
            <div
              v-for="(condition, index) in nodeData.conditions"
              :key="index"
              class="condition-item"
            >
              <el-row :gutter="12">
                <el-col :span="8">
                  <el-input
                    v-model="condition.field"
                    placeholder="欄位名稱"
                    @input="handleChange"
                  />
                </el-col>
                <el-col :span="6">
                  <el-select
                    v-model="condition.operator"
                    placeholder="操作符"
                    @change="handleChange"
                  >
                    <el-option label="等於" value="equals" />
                    <el-option label="不等於" value="notEquals" />
                    <el-option label="包含" value="contains" />
                    <el-option label="大於" value="greaterThan" />
                    <el-option label="小於" value="lessThan" />
                  </el-select>
                </el-col>
                <el-col :span="8">
                  <el-input
                    v-model="condition.value"
                    placeholder="比較值"
                    @input="handleChange"
                  />
                </el-col>
                <el-col :span="2">
                  <el-button
                    type="danger"
                    size="small"
                    :icon="Delete"
                    @click="removeCondition(index)"
                  />
                </el-col>
              </el-row>
            </div>
            
            <el-button
              type="primary"
              plain
              size="small"
              :icon="Plus"
              @click="addCondition"
            >
              新增條件
            </el-button>
          </div>
        </el-form-item>
      </template>

      <!-- 延遲等待節點 -->
      <template v-else-if="nodeData.type === 'delay'">
        <el-form-item label="延遲時間" required>
          <el-row :gutter="12">
            <el-col :span="12">
              <el-input-number
                v-model="nodeData.amount"
                :min="1"
                placeholder="時間長度"
                @change="handleChange"
              />
            </el-col>
            <el-col :span="12">
              <el-select
                v-model="nodeData.unit"
                placeholder="時間單位"
                @change="handleChange"
              >
                <el-option label="秒" value="seconds" />
                <el-option label="分鐘" value="minutes" />
                <el-option label="小時" value="hours" />
                <el-option label="天" value="days" />
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
      </template>

      <!-- 通用設定提示 -->
      <template v-else>
        <el-alert
          title="通用節點"
          description="此節點類型暫無特殊配置選項，請使用基本設定和進階設定。"
          type="info"
          show-icon
          :closable="false"
        />
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'
import KeyValueEditor from './KeyValueEditor.vue'
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

const addCondition = () => {
  if (!nodeData.value.conditions) {
    nodeData.value.conditions = []
  }
  
  nodeData.value.conditions.push({
    field: '',
    operator: 'equals',
    value: ''
  })
  
  handleChange()
}

const removeCondition = (index: number) => {
  if (nodeData.value.conditions) {
    nodeData.value.conditions.splice(index, 1)
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
  'update:modelValue': [value: WorkflowNode]
  'change': [value: WorkflowNode]
}>()
</script>

<style scoped lang="scss">
.general-node-editor {
  .conditions-editor {
    .condition-item {
      margin-bottom: $spacing-base;
      padding: $spacing-base;
      background: $bg-color-secondary;
      border-radius: $border-radius-base;
      border: $border-width-thin solid $border-color;
    }
  }
}

// 深色主題
[data-theme="dark"] {
  .general-node-editor {
    .conditions-editor {
      .condition-item {
        background: var(--bg-color-tertiary);
        border-color: var(--border-color);
      }
    }
  }
}
</style>
