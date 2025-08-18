<template>
  <div class="base-input">
    <!-- 標籤 -->
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="text-accent-red ml-1">*</span>
    </label>

    <!-- 輸入框容器 -->
    <div class="relative">
      <!-- 左側圖示 -->
      <div v-if="$slots['icon-left']" class="input-icon-left">
        <slot name="icon-left" />
      </div>

      <!-- 輸入框 -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- 右側圖示 -->
      <div v-if="$slots['icon-right']" class="input-icon-right">
        <slot name="icon-right" />
      </div>
    </div>

    <!-- 幫助文字或錯誤訊息 -->
    <div v-if="helpText || errorMessage" class="input-help">
      <p v-if="errorMessage" class="text-accent-red text-sm">
        {{ errorMessage }}
      </p>
      <p v-else-if="helpText" class="text-neutral-500 text-sm">
        {{ helpText }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: 'sm' | 'base' | 'lg'
  state?: 'default' | 'error' | 'success'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  size: 'base',
  state: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// 生成唯一 ID
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full',
    'border',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-0',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-neutral-50'
  ]

  // 尺寸樣式
  const sizeClasses = {
    sm: ['px-3', 'py-2', 'text-sm'],
    base: ['px-4', 'py-3', 'text-base'],
    lg: ['px-5', 'py-4', 'text-lg']
  }

  // 狀態樣式
  const stateClasses = {
    default: [
      'border-neutral-300',
      'focus:border-transparent',
      'focus:ring-primary-500'
    ],
    error: [
      'border-accent-red',
      'focus:border-transparent',
      'focus:ring-accent-red'
    ],
    success: [
      'border-green-500',
      'focus:border-transparent',
      'focus:ring-green-500'
    ]
  }

  // 根據 errorMessage 自動設定狀態
  const currentState = props.errorMessage ? 'error' : props.state

  // 圖示間距
  const iconClasses = []
  if (props.$slots?.['icon-left']) {
    iconClasses.push('pl-10')
  }
  if (props.$slots?.['icon-right']) {
    iconClasses.push('pr-10')
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...stateClasses[currentState],
    ...iconClasses
  ]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

<style scoped>
.input-label {
  @apply block text-sm font-medium text-neutral-700 mb-2;
}

.input-icon-left {
  @apply absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400;
}

.input-icon-right {
  @apply absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-400;
}

.input-help {
  @apply mt-2;
}
</style>
