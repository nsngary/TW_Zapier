<template>
  <div class="base-input-wrapper" :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    
    <div class="input-container" :class="containerClasses">
      <span v-if="prefixIcon" class="input-prefix">
        <component :is="prefixIcon" />
      </span>
      
      <input
        :id="inputId"
        ref="inputRef"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
      />
      
      <span v-if="suffixIcon || showPasswordToggle" class="input-suffix">
        <button
          v-if="showPasswordToggle"
          type="button"
          class="password-toggle"
          @click="togglePasswordVisibility"
          :aria-label="type === 'password' ? '顯示密碼' : '隱藏密碼'"
        >
          <svg v-if="type === 'password'" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12A16.16 16.16 0 0 1 6.06 6.06L17.94 17.94Z" stroke="currentColor" stroke-width="2"/>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 12 23 12A16.16 16.16 0 0 0 19.36 8.64L9.9 4.24Z" stroke="currentColor" stroke-width="2"/>
            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <component v-else-if="suffixIcon" :is="suffixIcon" />
      </span>
    </div>
    
    <div v-if="error || hint" class="input-message">
      <span v-if="error" class="error-message">{{ error }}</span>
      <span v-else-if="hint" class="hint-message">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

type InputSize = 'sm' | 'md' | 'lg'
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

interface Props {
  modelValue?: string | number
  type?: InputType
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  size?: InputSize
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  autocomplete?: string
  prefixIcon?: any
  suffixIcon?: any
  showPasswordToggle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  showPasswordToggle: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
  'keydown': [event: KeyboardEvent]
}>()

const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const inputId = `input-${Math.random().toString(36).substr(2, 9)}`

const wrapperClasses = computed(() => [
  'base-input-wrapper',
  `input-size-${props.size}`,
  {
    'input-disabled': props.disabled,
    'input-readonly': props.readonly,
    'input-error': props.error,
    'input-focused': isFocused.value
  }
])

const containerClasses = computed(() => [
  'input-container',
  {
    'has-prefix': props.prefixIcon,
    'has-suffix': props.suffixIcon || props.showPasswordToggle
  }
])

const inputClasses = computed(() => [
  'base-input'
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const togglePasswordVisibility = () => {
  if (props.type === 'password') {
    inputRef.value!.type = 'text'
  } else {
    inputRef.value!.type = 'password'
  }
}

const focus = () => {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

defineExpose({
  focus,
  inputRef
})
</script>

<style scoped>
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 4px;
}

.required-indicator {
  color: #C2474A;
  font-size: 16px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.base-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s ease;
}

.base-input:focus {
  outline: none;
  border-color: #86735E;
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.1);
}

.base-input:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.base-input:readonly {
  background-color: #f9fafb;
  cursor: default;
}

.base-input::placeholder {
  color: #9ca3af;
}

/* 尺寸 */
.input-size-sm .base-input {
  padding: 6px 12px;
  font-size: 13px;
  min-height: 32px;
}

.input-size-md .base-input {
  padding: 8px 12px;
  font-size: 14px;
  min-height: 40px;
}

.input-size-lg .base-input {
  padding: 12px 16px;
  font-size: 16px;
  min-height: 48px;
}

/* 前綴和後綴 */
.input-prefix,
.input-suffix {
  position: absolute;
  display: flex;
  align-items: center;
  color: #9ca3af;
  pointer-events: none;
}

.input-prefix {
  left: 12px;
}

.input-suffix {
  right: 12px;
}

.has-prefix .base-input {
  padding-left: 40px;
}

.has-suffix .base-input {
  padding-right: 40px;
}

.input-prefix svg,
.input-suffix svg {
  width: 16px;
  height: 16px;
}

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 2px;
  border-radius: 4px;
  transition: color 0.2s ease;
  pointer-events: auto;
}

.password-toggle:hover {
  color: #6b7280;
}

.password-toggle:focus {
  outline: none;
  color: #86735E;
}

/* 訊息 */
.input-message {
  font-size: 12px;
  line-height: 1.4;
}

.error-message {
  color: #C2474A;
}

.hint-message {
  color: #6b7280;
}

/* 狀態 */
.input-error .base-input {
  border-color: #C2474A;
}

.input-error .base-input:focus {
  border-color: #C2474A;
  box-shadow: 0 0 0 3px rgba(194, 71, 74, 0.1);
}

.input-focused .input-label {
  color: #86735E;
}

/* 響應式 */
@media (max-width: 768px) {
  .input-size-lg .base-input {
    padding: 10px 14px;
    font-size: 16px; /* 防止 iOS 縮放 */
    min-height: 44px;
  }
}

/* 無障礙 */
@media (prefers-reduced-motion: reduce) {
  .base-input {
    transition: none;
  }
}

/* 高對比模式 */
@media (prefers-contrast: high) {
  .base-input {
    border-width: 2px;
  }
  
  .base-input:focus {
    border-width: 3px;
  }
}
</style>
