<template>
  <div class="key-value-editor">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="key-value-item"
    >
      <el-row :gutter="12">
        <el-col :span="10">
          <el-input
            v-model="item.key"
            :placeholder="placeholderKey"
            @input="handleChange"
          />
        </el-col>
        <el-col :span="12">
          <el-input
            v-model="item.value"
            :placeholder="placeholderValue"
            @input="handleChange"
          />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="removeItem(index)"
          />
        </el-col>
      </el-row>
    </div>
    
    <el-button
      type="primary"
      plain
      size="small"
      :icon="Plus"
      @click="addItem"
    >
      新增項目
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Delete, Plus } from '@element-plus/icons-vue'

// ===== Props =====

interface Props {
  modelValue: Record<string, any>
  placeholderKey?: string
  placeholderValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholderKey: '鍵',
  placeholderValue: '值'
})

// ===== 響應式資料 =====

interface KeyValueItem {
  key: string
  value: string
}

const items = ref<KeyValueItem[]>([])

// ===== 計算屬性 =====

const objectValue = computed(() => {
  const result: Record<string, any> = {}
  items.value.forEach(item => {
    if (item.key.trim()) {
      result[item.key] = item.value
    }
  })
  return result
})

// ===== 方法 =====

const addItem = () => {
  items.value.push({ key: '', value: '' })
}

const removeItem = (index: number) => {
  items.value.splice(index, 1)
  handleChange()
}

const handleChange = () => {
  emit('update:modelValue', objectValue.value)
  emit('change', objectValue.value)
}

const initializeItems = (obj: Record<string, any>) => {
  items.value = Object.entries(obj || {}).map(([key, value]) => ({
    key,
    value: String(value)
  }))
  
  // 確保至少有一個空項目
  if (items.value.length === 0) {
    addItem()
  }
}

// ===== 監聽器 =====

watch(
  () => props.modelValue,
  (newValue) => {
    initializeItems(newValue)
  },
  { immediate: true, deep: true }
)

// ===== 事件 =====

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  'change': [value: Record<string, any>]
}>()

// ===== 初始化 =====

initializeItems(props.modelValue)
</script>

<style scoped lang="scss">
.key-value-editor {
  .key-value-item {
    margin-bottom: $spacing-base;
  }
}
</style>
