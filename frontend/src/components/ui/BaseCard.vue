<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 v-if="title" class="card-title">{{ title }}</h3>
      </slot>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </div>
    
    <div v-if="$slots.default" class="card-body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CardVariant = 'default' | 'bordered' | 'shadow' | 'elevated'
type CardSize = 'sm' | 'md' | 'lg'

interface Props {
  title?: string
  variant?: CardVariant
  size?: CardSize
  hoverable?: boolean
  clickable?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hoverable: false,
  clickable: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClasses = computed(() => [
  'base-card',
  `card-${props.variant}`,
  `card-${props.size}`,
  {
    'card-hoverable': props.hoverable,
    'card-clickable': props.clickable,
    'card-loading': props.loading
  }
])

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
}

.base-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
  z-index: 1;
}

.card-loading::before {
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 變體 */
.card-default {
  border: 1px solid #e5e7eb;
}

.card-bordered {
  border: 2px solid #e5e7eb;
}

.card-shadow {
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-elevated {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 尺寸 */
.card-sm {
  border-radius: 6px;
}

.card-sm .card-header,
.card-sm .card-body,
.card-sm .card-footer {
  padding: 12px;
}

.card-md .card-header,
.card-md .card-body,
.card-md .card-footer {
  padding: 16px;
}

.card-lg {
  border-radius: 12px;
}

.card-lg .card-header,
.card-lg .card-body,
.card-lg .card-footer {
  padding: 24px;
}

/* 互動狀態 */
.card-hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.card-clickable:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 卡片區域 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-body {
  position: relative;
  z-index: 2;
}

.card-footer {
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

/* 響應式 */
@media (max-width: 768px) {
  .card-lg .card-header,
  .card-lg .card-body,
  .card-lg .card-footer {
    padding: 16px;
  }
  
  .card-md .card-header,
  .card-md .card-body,
  .card-md .card-footer {
    padding: 12px;
  }
}

/* 無障礙 */
.card-clickable:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .base-card,
  .card-hoverable:hover,
  .card-clickable:hover,
  .card-clickable:active {
    transition: none;
    transform: none;
  }
  
  .card-loading::before {
    animation: none;
  }
}

/* 高對比模式 */
@media (prefers-contrast: high) {
  .card-default,
  .card-shadow {
    border-width: 2px;
    border-color: #000;
  }
  
  .card-header,
  .card-footer {
    background: #f0f0f0;
    border-color: #000;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .base-card {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .card-default,
  .card-bordered,
  .card-shadow {
    border-color: #374151;
  }
  
  .card-header,
  .card-footer {
    background: #111827;
    border-color: #374151;
  }
  
  .card-title {
    color: #f9fafb;
  }
}
</style>
