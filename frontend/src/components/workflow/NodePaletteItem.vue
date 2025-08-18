<template>
  <div
    class="node-palette-item"
    :class="{
      'is-taiwan': isTaiwan,
      'is-dragging': isDragging
    }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    @click="handleClick"
  >
    <!-- 台灣特色標記 -->
    <div v-if="isTaiwan" class="taiwan-badge">
      <img src="/icons/taiwan-flag.svg" alt="台灣" class="taiwan-flag" />
    </div>

    <!-- 節點圖示 -->
    <div class="node-icon">
      <img
        v-if="node.icon && node.icon.startsWith('/')"
        :src="node.icon"
        :alt="node.label"
        class="icon-image"
        @error="handleIconError"
      />
      <el-icon v-else class="icon-element">
        <component :is="getIconComponent()" />
      </el-icon>
    </div>

    <!-- 節點資訊 -->
    <div class="node-info">
      <div class="node-label">{{ node.label }}</div>
      <div class="node-description">{{ node.description }}</div>
    </div>

    <!-- 分類標籤 -->
    <div class="node-category">
      <el-tag
        :type="getCategoryTagType()"
        size="small"
        effect="plain"
      >
        {{ getCategoryLabel() }}
      </el-tag>
    </div>

    <!-- 拖拽提示 -->
    <div class="drag-hint">
      <el-icon><Rank /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  VideoPlay, 
  CreditCard, 
  Service, 
  Tools, 
  Bell, 
  Grid,
  Rank,
  Connection,
  Sort,
  Switch,
  Clock,
  Message,
  ChatDotRound,
  Timer,
  Link
} from '@element-plus/icons-vue'
import { NodeCategory } from '@/types/workflow'
import type { PaletteNode } from '@/types/workflow'

// ===== Props =====

interface Props {
  node: PaletteNode
  isTaiwan?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isTaiwan: false
})

// ===== 響應式資料 =====

const isDragging = ref(false)
const iconError = ref(false)

// ===== 計算屬性 =====

const getCategoryTagType = computed(() => {
  const typeMap = {
    [NodeCategory.TRIGGER]: 'warning',
    [NodeCategory.PAYMENT]: 'success',
    [NodeCategory.TAIWAN_SERVICE]: 'primary',
    [NodeCategory.GENERAL]: 'info',
    [NodeCategory.NOTIFICATION]: 'danger'
  }
  return typeMap[props.node.category] || 'info'
})

const getCategoryLabel = computed(() => {
  const labelMap = {
    [NodeCategory.TRIGGER]: '觸發',
    [NodeCategory.PAYMENT]: '金流',
    [NodeCategory.TAIWAN_SERVICE]: '台灣',
    [NodeCategory.GENERAL]: '通用',
    [NodeCategory.NOTIFICATION]: '通知'
  }
  return labelMap[props.node.category] || '其他'
})

// ===== 方法 =====

const getIconComponent = () => {
  if (iconError.value) return Grid
  
  const iconMap: Record<string, any> = {
    'VideoPlay': VideoPlay,
    'CreditCard': CreditCard,
    'Service': Service,
    'Tools': Tools,
    'Bell': Bell,
    'Grid': Grid,
    'Connection': Connection,
    'Sort': Sort,
    'Switch': Switch,
    'Clock': Clock,
    'Message': Message,
    'ChatDotRound': ChatDotRound,
    'Timer': Timer,
    'Link': Link
  }
  
  return iconMap[props.node.icon as string] || Grid
}

const handleIconError = () => {
  iconError.value = true
}

const handleDragStart = (event: DragEvent) => {
  isDragging.value = true
  emit('drag-start', props.node, event)
}

const handleDragEnd = () => {
  isDragging.value = false
}

const handleClick = () => {
  emit('click', props.node)
}

// ===== 事件 =====

const emit = defineEmits<{
  'drag-start': [node: PaletteNode, event: DragEvent]
  'click': [node: PaletteNode]
}>()
</script>

<style scoped lang="scss">
.node-palette-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-base;
  background: $white;
  border: $border-width-thin solid $border-color;
  border-radius: $border-radius-lg;
  cursor: grab;
  transition: all 0.2s ease;
  user-select: none;
  
  &:hover {
    border-color: $primary-color;
    box-shadow: $shadow-base;
    transform: translateY(-2px);
    
    .drag-hint {
      opacity: 1;
    }
  }
  
  &:active {
    cursor: grabbing;
  }
  
  &.is-dragging {
    opacity: 0.5;
    transform: rotate(5deg);
    cursor: grabbing;
  }
  
  // 台灣特色節點樣式
  &.is-taiwan {
    border: 2px solid transparent;
    background: linear-gradient($white, $white) padding-box,
                linear-gradient(135deg, $taiwan-red 0%, $taiwan-blue 50%, $taiwan-green 100%) border-box;
    
    &:hover {
      box-shadow: 0 8px 25px -5px rgba($taiwan-red, 0.3);
    }
    
    .node-label {
      color: $taiwan-red;
      font-weight: $font-weight-semibold;
    }
  }
}

.taiwan-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  background: $white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow-sm;
  z-index: 1;
  
  .taiwan-flag {
    width: 14px;
    height: 10px;
    object-fit: cover;
    border-radius: 1px;
  }
}

.node-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: $spacing-sm;
  
  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .icon-element {
    font-size: 24px;
    color: $primary-color;
  }
}

.node-info {
  text-align: center;
  margin-bottom: $spacing-sm;
  
  .node-label {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $text-color;
    margin-bottom: 2px;
    line-height: 1.2;
  }
  
  .node-description {
    font-size: $font-size-xs;
    color: $text-color-secondary;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.node-category {
  margin-bottom: $spacing-xs;
  
  .el-tag {
    font-size: $font-size-xs;
    height: 20px;
    line-height: 18px;
  }
}

.drag-hint {
  position: absolute;
  bottom: 4px;
  right: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: $text-color-tertiary;
  
  .el-icon {
    font-size: 12px;
  }
}

// 特定節點類型的圖示顏色
.node-palette-item {
  // 觸發節點
  &[data-category="trigger"] .icon-element {
    color: $warning-color;
  }
  
  // 金流節點
  &[data-category="payment"] .icon-element {
    color: $success-color;
  }
  
  // 台灣服務節點
  &[data-category="taiwan-service"] .icon-element {
    color: $primary-color;
  }
  
  // 通用節點
  &[data-category="general"] .icon-element {
    color: $info-color;
  }
  
  // 通知節點
  &[data-category="notification"] .icon-element {
    color: $error-color;
  }
}

// 響應式設計
@media (max-width: 768px) {
  .node-palette-item {
    padding: $spacing-sm;
    
    .node-icon {
      width: 32px;
      height: 32px;
      margin-bottom: $spacing-xs;
      
      .icon-element {
        font-size: 20px;
      }
    }
    
    .node-info {
      .node-label {
        font-size: $font-size-xs;
      }
      
      .node-description {
        font-size: 10px;
        -webkit-line-clamp: 1;
      }
    }
  }
  
  .taiwan-badge {
    width: 16px;
    height: 16px;
    
    .taiwan-flag {
      width: 12px;
      height: 8px;
    }
  }
}

// 深色主題
[data-theme="dark"] {
  .node-palette-item {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
    
    &:hover {
      border-color: var(--primary-color);
    }
    
    &.is-taiwan {
      background: linear-gradient(var(--bg-color-secondary), var(--bg-color-secondary)) padding-box,
                  linear-gradient(135deg, $taiwan-red 0%, $taiwan-blue 50%, $taiwan-green 100%) border-box;
    }
    
    .node-label {
      color: var(--text-color);
    }
    
    .node-description {
      color: var(--text-color-secondary);
    }
  }
  
  .taiwan-badge {
    background: var(--bg-color-tertiary);
  }
}

// 拖拽動畫
@keyframes dragPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.node-palette-item.is-dragging {
  animation: dragPulse 0.5s ease-in-out infinite;
}
</style>
