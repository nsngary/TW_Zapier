<template>
  <div class="property-editor">
    <div class="property-header" v-if="title">
      <h4 class="property-title">{{ title }}</h4>
      <button 
        v-if="collapsible" 
        @click="toggleCollapse"
        class="collapse-btn"
        :class="{ 'collapsed': isCollapsed }"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <div class="property-content" v-show="!isCollapsed">
      <div class="property-group" v-for="field in fields" :key="field.key">
        <label class="property-label" :for="field.key">
          {{ field.label }}
          <span v-if="field.required" class="required-indicator">*</span>
        </label>
        
        <!-- 文字輸入 -->
        <input
          v-if="field.type === 'text'"
          :id="field.key"
          v-model="modelValue[field.key]"
          type="text"
          class="property-input"
          :placeholder="field.placeholder"
          :disabled="field.disabled"
          @input="handleInput(field.key, $event.target.value)"
        />
        
        <!-- 數字輸入 -->
        <input
          v-else-if="field.type === 'number'"
          :id="field.key"
          v-model.number="modelValue[field.key]"
          type="number"
          class="property-input"
          :placeholder="field.placeholder"
          :min="field.min"
          :max="field.max"
          :step="field.step"
          :disabled="field.disabled"
          @input="handleInput(field.key, $event.target.value)"
        />
        
        <!-- 文字區域 -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="field.key"
          v-model="modelValue[field.key]"
          class="property-textarea"
          :placeholder="field.placeholder"
          :rows="field.rows || 3"
          :disabled="field.disabled"
          @input="handleInput(field.key, $event.target.value)"
        ></textarea>
        
        <!-- 選擇框 -->
        <select
          v-else-if="field.type === 'select'"
          :id="field.key"
          v-model="modelValue[field.key]"
          class="property-select"
          :disabled="field.disabled"
          @change="handleInput(field.key, $event.target.value)"
        >
          <option value="" v-if="field.placeholder">{{ field.placeholder }}</option>
          <option 
            v-for="option in field.options" 
            :key="option.value" 
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        
        <!-- 開關 -->
        <label
          v-else-if="field.type === 'switch'"
          class="property-switch"
        >
          <input
            :id="field.key"
            v-model="modelValue[field.key]"
            type="checkbox"
            class="switch-input"
            :disabled="field.disabled"
            @change="handleInput(field.key, $event.target.checked)"
          />
          <span class="switch-slider"></span>
          <span class="switch-label">{{ field.switchLabel || '啟用' }}</span>
        </label>
        
        <!-- 顏色選擇器 -->
        <input
          v-else-if="field.type === 'color'"
          :id="field.key"
          v-model="modelValue[field.key]"
          type="color"
          class="property-color"
          :disabled="field.disabled"
          @input="handleInput(field.key, $event.target.value)"
        />
        
        <!-- 檔案上傳 -->
        <input
          v-else-if="field.type === 'file'"
          :id="field.key"
          type="file"
          class="property-file"
          :accept="field.accept"
          :disabled="field.disabled"
          @change="handleFileInput(field.key, $event)"
        />
        
        <!-- 驗證錯誤訊息 -->
        <div v-if="errors[field.key]" class="property-error">
          {{ errors[field.key] }}
        </div>
        
        <!-- 說明文字 -->
        <div v-if="field.description" class="property-description">
          {{ field.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface PropertyField {
  key: string
  label: string
  type: 'text' | 'number' | 'textarea' | 'select' | 'switch' | 'color' | 'file'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  description?: string
  // 數字類型專用
  min?: number
  max?: number
  step?: number
  // 文字區域專用
  rows?: number
  // 選擇框專用
  options?: Array<{ label: string; value: any }>
  // 開關專用
  switchLabel?: string
  // 檔案專用
  accept?: string
}

interface Props {
  title?: string
  fields: PropertyField[]
  modelValue: Record<string, any>
  errors?: Record<string, string>
  collapsible?: boolean
  defaultCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  errors: () => ({}),
  collapsible: false,
  defaultCollapsed: false
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  'field-change': [key: string, value: any]
  'file-upload': [key: string, file: File]
}>()

const isCollapsed = ref(props.defaultCollapsed)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleInput = (key: string, value: any) => {
  const newValue = { ...props.modelValue, [key]: value }
  emit('update:modelValue', newValue)
  emit('field-change', key, value)
}

const handleFileInput = (key: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('file-upload', key, file)
  }
}

// 監聽 defaultCollapsed 變化
watch(() => props.defaultCollapsed, (newValue) => {
  isCollapsed.value = newValue
})
</script>

<style scoped>
.property-editor {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.property-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.property-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  color: #6b7280;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.collapse-btn.collapsed {
  transform: rotate(-90deg);
}

.property-content {
  padding: 16px;
}

.property-group {
  margin-bottom: 16px;
}

.property-group:last-child {
  margin-bottom: 0;
}

.property-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.required-indicator {
  color: #ef4444;
  margin-left: 2px;
}

.property-input,
.property-textarea,
.property-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  background: white;
}

.property-input:focus,
.property-textarea:focus,
.property-select:focus {
  outline: none;
  border-color: #86735E;
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.1);
}

.property-input:disabled,
.property-textarea:disabled,
.property-select:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.property-textarea {
  resize: vertical;
  min-height: 60px;
}

.property-switch {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.switch-input {
  display: none;
}

.switch-slider {
  position: relative;
  width: 44px;
  height: 24px;
  background: #d1d5db;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.switch-slider::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.switch-input:checked + .switch-slider {
  background: #86735E;
}

.switch-input:checked + .switch-slider::before {
  transform: translateX(20px);
}

.switch-label {
  font-size: 13px;
  color: #374151;
}

.property-color {
  width: 60px;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.property-file {
  width: 100%;
  padding: 8px;
  border: 1px dashed #d1d5db;
  border-radius: 6px;
  background: #f9fafb;
  cursor: pointer;
}

.property-error {
  margin-top: 4px;
  font-size: 12px;
  color: #ef4444;
}

.property-description {
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
}
</style>
