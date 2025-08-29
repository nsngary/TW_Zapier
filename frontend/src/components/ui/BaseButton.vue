<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :to="tag === 'router-link' ? to : undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="btn-loading">
      <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="31.416" stroke-dashoffset="31.416">
          <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
        </circle>
      </svg>
    </span>
    
    <span v-if="icon && !loading" class="btn-icon" :class="{ 'btn-icon-only': !$slots.default }">
      <component :is="icon" />
    </span>
    
    <span v-if="$slots.default" class="btn-content">
      <slot />
    </span>
    
    <span v-if="iconRight && !loading" class="btn-icon btn-icon-right">
      <component :is="iconRight" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ButtonTag = 'button' | 'a' | 'router-link'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  tag?: ButtonTag
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  rounded?: boolean
  icon?: any
  iconRight?: any
  href?: string
  to?: string | object
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
  rounded: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const buttonClasses = computed(() => [
  'base-button',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    'btn-block': props.block,
    'btn-rounded': props.rounded,
    'btn-loading': props.loading,
    'btn-disabled': props.disabled,
    'btn-icon-only': props.icon && !props.$slots.default
  }
])

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  vertical-align: middle;
}

.base-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.2);
}

.base-button:disabled,
.base-button.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* 尺寸 */
.btn-xs {
  padding: 4px 8px;
  font-size: 11px;
  border-radius: 4px;
  min-height: 24px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  min-height: 32px;
}

.btn-md {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  min-height: 40px;
}

.btn-lg {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  min-height: 48px;
}

.btn-xl {
  padding: 16px 24px;
  font-size: 18px;
  border-radius: 8px;
  min-height: 56px;
}

/* 變體 */
.btn-primary {
  background-color: #86735E;
  color: white;
  border-color: #86735E;
}

.btn-primary:hover:not(:disabled) {
  background-color: #7a6654;
  border-color: #7a6654;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(134, 115, 94, 0.3);
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
  border-color: #9ca3af;
}

.btn-success {
  background-color: #667539;
  color: white;
  border-color: #667539;
}

.btn-success:hover:not(:disabled) {
  background-color: #5a6632;
  border-color: #5a6632;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(102, 117, 57, 0.3);
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.btn-warning:hover:not(:disabled) {
  background-color: #d97706;
  border-color: #d97706;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
}

.btn-danger {
  background-color: #C2474A;
  color: white;
  border-color: #C2474A;
}

.btn-danger:hover:not(:disabled) {
  background-color: #b23e41;
  border-color: #b23e41;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(194, 71, 74, 0.3);
}

.btn-ghost {
  background-color: transparent;
  color: #86735E;
  border-color: #86735E;
}

.btn-ghost:hover:not(:disabled) {
  background-color: rgba(134, 115, 94, 0.1);
  color: #7a6654;
  border-color: #7a6654;
}

.btn-link {
  background-color: transparent;
  color: #86735E;
  border-color: transparent;
  text-decoration: underline;
  padding: 0;
  min-height: auto;
}

.btn-link:hover:not(:disabled) {
  color: #7a6654;
  text-decoration: none;
}

/* 修飾符 */
.btn-block {
  width: 100%;
}

.btn-rounded {
  border-radius: 50px;
}

.btn-icon-only {
  padding: 8px;
  aspect-ratio: 1;
}

.btn-icon-only.btn-xs { padding: 4px; }
.btn-icon-only.btn-sm { padding: 6px; }
.btn-icon-only.btn-lg { padding: 12px; }
.btn-icon-only.btn-xl { padding: 16px; }

/* 圖標 */
.btn-icon svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.btn-xs .btn-icon svg { width: 12px; height: 12px; }
.btn-sm .btn-icon svg { width: 14px; height: 14px; }
.btn-lg .btn-icon svg { width: 18px; height: 18px; }
.btn-xl .btn-icon svg { width: 20px; height: 20px; }

/* 載入狀態 */
.btn-loading .btn-content {
  opacity: 0.7;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 響應式 */
@media (max-width: 768px) {
  .btn-lg {
    padding: 10px 16px;
    font-size: 14px;
    min-height: 44px;
  }
  
  .btn-xl {
    padding: 12px 20px;
    font-size: 16px;
    min-height: 48px;
  }
}
</style>
