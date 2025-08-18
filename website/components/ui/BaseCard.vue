<template>
  <div :class="cardClasses">
    <!-- 卡片標題區 -->
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-neutral-900">
          {{ title }}
        </h3>
      </slot>
    </div>

    <!-- 卡片內容區 -->
    <div :class="contentClasses">
      <slot />
    </div>

    <!-- 卡片底部區 -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'elevated' | 'flat' | 'interactive'
  size?: 'sm' | 'base' | 'lg'
  title?: string
  padding?: boolean
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'base',
  padding: true,
  hover: false
})

const cardClasses = computed(() => {
  const baseClasses = [
    'bg-white',
    'rounded-xl',
    'transition-all',
    'duration-200'
  ]

  // 變體樣式
  const variantClasses = {
    default: [
      'shadow-sm',
      'border',
      'border-neutral-200',
      'hover:shadow-md'
    ],
    elevated: [
      'shadow-lg',
      'hover:shadow-xl'
    ],
    flat: [
      'shadow-none',
      'border-2',
      'border-neutral-200'
    ],
    interactive: [
      'shadow-sm',
      'border',
      'border-neutral-200',
      'cursor-pointer',
      'hover:scale-105',
      'hover:shadow-lg'
    ]
  }

  // 懸停效果
  const hoverClasses = props.hover ? ['hover:shadow-lg', 'hover:-translate-y-1'] : []

  return [
    ...baseClasses,
    ...variantClasses[props.variant],
    ...hoverClasses
  ]
})

const contentClasses = computed(() => {
  if (!props.padding) return []

  const sizeClasses = {
    sm: ['p-4'],
    base: ['p-6'],
    lg: ['p-8']
  }

  return sizeClasses[props.size]
})
</script>

<style scoped>
.card-header {
  @apply border-b border-neutral-200 px-6 py-4;
}

.card-footer {
  @apply border-t border-neutral-200 px-6 py-4;
}

.card-header + .card-content {
  @apply pt-0;
}

.card-content + .card-footer {
  @apply pb-0;
}
</style>
