<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- 載入圖示 -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- 左側圖示 -->
    <slot name="icon-left" />

    <!-- 按鈕內容 -->
    <slot />

    <!-- 右側圖示 -->
    <slot name="icon-right" />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'base' | 'lg' | 'xl'
  tag?: 'button' | 'a' | 'nuxt-link'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'base',
  tag: 'button',
  disabled: false,
  loading: false,
  block: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none'
  ]

  // 變體樣式
  const variantClasses = {
    primary: [
      'bg-primary-500',
      'hover:bg-primary-600',
      'active:bg-primary-700',
      'text-white',
      'shadow-sm',
      'hover:shadow-md',
      'focus:ring-primary-500'
    ],
    secondary: [
      'bg-white',
      'hover:bg-neutral-50',
      'active:bg-neutral-100',
      'text-primary-600',
      'border',
      'border-primary-200',
      'hover:border-primary-300',
      'focus:ring-primary-500'
    ],
    outline: [
      'bg-transparent',
      'hover:bg-primary-50',
      'active:bg-primary-100',
      'text-primary-600',
      'border',
      'border-primary-300',
      'hover:border-primary-400',
      'focus:ring-primary-500'
    ],
    danger: [
      'bg-accent-red',
      'hover:bg-red-600',
      'active:bg-red-700',
      'text-white',
      'shadow-sm',
      'hover:shadow-md',
      'focus:ring-accent-red'
    ],
    success: [
      'bg-green-500',
      'hover:bg-green-600',
      'active:bg-green-700',
      'text-white',
      'shadow-sm',
      'hover:shadow-md',
      'focus:ring-green-500'
    ]
  }

  // 尺寸樣式
  const sizeClasses = {
    sm: ['px-4', 'py-2', 'text-sm'],
    base: ['px-6', 'py-3', 'text-base'],
    lg: ['px-8', 'py-4', 'text-lg'],
    xl: ['px-10', 'py-5', 'text-xl']
  }

  // 區塊樣式
  const blockClasses = props.block ? ['w-full'] : []

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    ...sizeClasses[props.size],
    ...blockClasses
  ]
})

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
