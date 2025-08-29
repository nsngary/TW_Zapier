<template>
  <div class="status-indicator" :class="statusClass">
    <div class="status-icon">
      <!-- 載入中圖標 -->
      <svg 
        v-if="status === 'loading'" 
        class="loading-icon" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="31.416" stroke-dashoffset="31.416">
          <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
        </circle>
      </svg>
      
      <!-- 成功圖標 -->
      <svg 
        v-else-if="status === 'success'" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      <!-- 錯誤圖標 -->
      <svg 
        v-else-if="status === 'error'" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
      </svg>
      
      <!-- 警告圖標 -->
      <svg 
        v-else-if="status === 'warning'" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="17" r="1" fill="currentColor"/>
      </svg>
      
      <!-- 資訊圖標 -->
      <svg 
        v-else-if="status === 'info'" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="12" cy="8" r="1" fill="currentColor"/>
      </svg>
      
      <!-- 離線圖標 -->
      <svg 
        v-else-if="status === 'offline'" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" stroke-width="2"/>
      </svg>
      
      <!-- 連線圖標 -->
      <svg 
        v-else-if="status === 'connected'" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.5 14.5L15.5 7.5M15 8H16C17.1046 8 18 8.89543 18 10V14C18 15.1046 17.1046 16 16 16H8C6.89543 16 6 15.1046 6 14V10C6 8.89543 6.89543 8 8 8H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
      <!-- 自定義圖標 -->
      <component v-else-if="customIcon" :is="customIcon" />
      
      <!-- 預設圓點 -->
      <div v-else class="status-dot"></div>
    </div>
    
    <span v-if="text" class="status-text">{{ text }}</span>
    
    <!-- 進度條 -->
    <div v-if="showProgress && progress !== undefined" class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type StatusType = 'loading' | 'success' | 'error' | 'warning' | 'info' | 'offline' | 'connected' | 'idle'

interface Props {
  status: StatusType
  text?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'minimal' | 'badge'
  customIcon?: any
  showProgress?: boolean
  progress?: number
  pulse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'idle',
  text: '',
  size: 'medium',
  variant: 'default',
  showProgress: false,
  pulse: false
})

const statusClass = computed(() => {
  return [
    'status-indicator',
    `status-${props.status}`,
    `size-${props.size}`,
    `variant-${props.variant}`,
    {
      'with-text': props.text,
      'pulse': props.pulse && (props.status === 'loading' || props.status === 'warning')
    }
  ]
})
</script>

<style scoped>
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: Inter, sans-serif;
}

/* 尺寸變化 */
.status-indicator.size-small {
  font-size: 11px;
}

.status-indicator.size-small .status-icon {
  width: 12px;
  height: 12px;
}

.status-indicator.size-medium {
  font-size: 12px;
}

.status-indicator.size-medium .status-icon {
  width: 16px;
  height: 16px;
}

.status-indicator.size-large {
  font-size: 14px;
}

.status-indicator.size-large .status-icon {
  width: 20px;
  height: 20px;
}

/* 變體樣式 */
.status-indicator.variant-default {
  padding: 4px 8px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
}

.status-indicator.variant-minimal {
  padding: 0;
  background: none;
}

.status-indicator.variant-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 狀態顏色 */
.status-indicator.status-loading {
  color: #86735E;
}

.status-indicator.variant-default.status-loading {
  background: rgba(134, 115, 94, 0.1);
}

.status-indicator.variant-badge.status-loading {
  background: rgba(134, 115, 94, 0.1);
  color: #86735E;
}

.status-indicator.status-success {
  color: #667539;
}

.status-indicator.variant-default.status-success {
  background: rgba(102, 117, 57, 0.1);
}

.status-indicator.variant-badge.status-success {
  background: rgba(102, 117, 57, 0.1);
  color: #667539;
}

.status-indicator.status-error {
  color: #C2474A;
}

.status-indicator.variant-default.status-error {
  background: rgba(194, 71, 74, 0.1);
}

.status-indicator.variant-badge.status-error {
  background: rgba(194, 71, 74, 0.1);
  color: #C2474A;
}

.status-indicator.status-warning {
  color: #f59e0b;
}

.status-indicator.variant-default.status-warning {
  background: rgba(245, 158, 11, 0.1);
}

.status-indicator.variant-badge.status-warning {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-indicator.status-info {
  color: #3b82f6;
}

.status-indicator.variant-default.status-info {
  background: rgba(59, 130, 246, 0.1);
}

.status-indicator.variant-badge.status-info {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.status-indicator.status-offline {
  color: #6b7280;
}

.status-indicator.variant-default.status-offline {
  background: rgba(107, 114, 128, 0.1);
}

.status-indicator.variant-badge.status-offline {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.status-indicator.status-connected {
  color: #667539;
}

.status-indicator.variant-default.status-connected {
  background: rgba(102, 117, 57, 0.1);
}

.status-indicator.variant-badge.status-connected {
  background: rgba(102, 117, 57, 0.1);
  color: #667539;
}

.status-indicator.status-idle {
  color: #9ca3af;
}

.status-indicator.variant-default.status-idle {
  background: rgba(156, 163, 175, 0.1);
}

.status-indicator.variant-badge.status-idle {
  background: rgba(156, 163, 175, 0.1);
  color: #9ca3af;
}

/* 圖標容器 */
.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

/* 載入動畫 */
.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 脈衝動畫 */
.status-indicator.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 文字 */
.status-text {
  font-weight: 500;
  white-space: nowrap;
}

/* 進度條 */
.progress-bar {
  width: 60px;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: currentColor;
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
