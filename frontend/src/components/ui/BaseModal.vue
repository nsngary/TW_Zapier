<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div
        v-if="modelValue"
        class="modal-overlay"
        :class="overlayClasses"
        @click="handleOverlayClick"
        @keydown.esc="handleEscape"
        tabindex="-1"
        role="dialog"
        :aria-labelledby="titleId"
        :aria-describedby="contentId"
        aria-modal="true"
      >
        <div
          class="modal-container"
          :class="containerClasses"
          @click.stop
          ref="modalRef"
        >
          <div v-if="$slots.header || title || showClose" class="modal-header">
            <div class="modal-title-section">
              <slot name="header">
                <h2 v-if="title" :id="titleId" class="modal-title">{{ title }}</h2>
              </slot>
            </div>
            
            <button
              v-if="showClose"
              type="button"
              class="modal-close"
              @click="close"
              :aria-label="closeLabel"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          
          <div :id="contentId" class="modal-body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface Props {
  modelValue: boolean
  title?: string
  size?: ModalSize
  persistent?: boolean
  showClose?: boolean
  closeLabel?: string
  overlayClose?: boolean
  escapeClose?: boolean
  centered?: boolean
  scrollable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  persistent: false,
  showClose: true,
  closeLabel: '關閉',
  overlayClose: true,
  escapeClose: true,
  centered: true,
  scrollable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'opened': []
  'closed': []
}>()

const modalRef = ref<HTMLElement>()
const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
const contentId = `modal-content-${Math.random().toString(36).substr(2, 9)}`
const previousActiveElement = ref<HTMLElement | null>(null)

const overlayClasses = computed(() => [
  'modal-overlay',
  {
    'modal-centered': props.centered,
    'modal-scrollable': props.scrollable
  }
])

const containerClasses = computed(() => [
  'modal-container',
  `modal-${props.size}`
])

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleOverlayClick = () => {
  if (props.overlayClose) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (props.escapeClose && event.key === 'Escape') {
    close()
  }
}

const trapFocus = (event: KeyboardEvent) => {
  if (!modalRef.value || event.key !== 'Tab') return
  
  const focusableElements = modalRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  if (event.shiftKey) {
    if (document.activeElement === firstElement) {
      lastElement.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastElement) {
      firstElement.focus()
      event.preventDefault()
    }
  }
}

// 監聽模態框開關
watch(() => props.modelValue, async (isOpen) => {
  if (isOpen) {
    // 保存當前焦點元素
    previousActiveElement.value = document.activeElement as HTMLElement
    
    // 禁用背景滾動
    document.body.style.overflow = 'hidden'
    
    // 等待 DOM 更新後設置焦點
    await nextTick()
    
    // 設置焦點到模態框
    const firstFocusable = modalRef.value?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement
    
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      modalRef.value?.focus()
    }
    
    // 添加鍵盤事件監聽
    document.addEventListener('keydown', trapFocus)
    
    emit('opened')
  } else {
    // 恢復背景滾動
    document.body.style.overflow = ''
    
    // 移除鍵盤事件監聽
    document.removeEventListener('keydown', trapFocus)
    
    // 恢復之前的焦點
    if (previousActiveElement.value) {
      previousActiveElement.value.focus()
    }
    
    emit('closed')
  }
})

// 組件卸載時清理
onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', trapFocus)
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
  overflow-y: auto;
}

.modal-centered {
  align-items: center;
}

.modal-scrollable {
  align-items: flex-start;
  padding-top: 5vh;
  padding-bottom: 5vh;
}

.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: auto 0;
}

/* 尺寸 */
.modal-sm {
  width: 100%;
  max-width: 400px;
}

.modal-md {
  width: 100%;
  max-width: 500px;
}

.modal-lg {
  width: 100%;
  max-width: 700px;
}

.modal-xl {
  width: 100%;
  max-width: 900px;
}

.modal-full {
  width: 100%;
  max-width: 95vw;
  max-height: 95vh;
}

/* 模態框區域 */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 6px;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-close:focus {
  outline: none;
  background: #f3f4f6;
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.2);
}

.modal-body {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-shrink: 0;
}

/* 動畫 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

/* 響應式 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 8px;
  }
  
  .modal-container {
    border-radius: 8px;
    max-height: 95vh;
  }
  
  .modal-sm,
  .modal-md,
  .modal-lg,
  .modal-xl {
    max-width: 100%;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-body {
    padding: 16px;
  }
  
  .modal-footer {
    padding: 12px 16px;
  }
  
  .modal-title {
    font-size: 16px;
  }
}

/* 無障礙 */
@media (prefers-reduced-motion: reduce) {
  .modal-enter-active,
  .modal-leave-active,
  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: none;
  }
  
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: none;
  }
}

/* 高對比模式 */
@media (prefers-contrast: high) {
  .modal-container {
    border: 2px solid #000;
  }
  
  .modal-header,
  .modal-footer {
    border-color: #000;
  }
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .modal-overlay {
    background: rgba(0, 0, 0, 0.7);
  }
  
  .modal-container {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .modal-header,
  .modal-footer {
    border-color: #374151;
    background: #111827;
  }
  
  .modal-title {
    color: #f9fafb;
  }
  
  .modal-close:hover,
  .modal-close:focus {
    background: #374151;
    color: #f9fafb;
  }
}
</style>
