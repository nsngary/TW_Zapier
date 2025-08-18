<template>
  <div class="node-palette">
    <!-- 搜尋欄 -->
    <div class="palette-header">
      <el-input
        v-model="searchQuery"
        placeholder="搜尋節點..."
        prefix-icon="Search"
        clearable
        class="search-input"
        @input="handleSearch"
      />
      
      <!-- 分類篩選 -->
      <div class="category-tabs">
        <el-button
          v-for="category in categories"
          :key="category.value"
          :type="activeCategory === category.value ? 'primary' : ''"
          :plain="activeCategory !== category.value"
          size="small"
          @click="setActiveCategory(category.value)"
        >
          <el-icon><component :is="category.icon" /></el-icon>
          {{ category.label }}
        </el-button>
      </div>
    </div>

    <!-- 節點列表 -->
    <div class="palette-content">
      <el-scrollbar height="100%">
        <!-- 搜尋結果 -->
        <div v-if="searchQuery" class="search-results">
          <div class="section-title">
            <el-icon><Search /></el-icon>
            搜尋結果 ({{ filteredNodes.length }})
          </div>
          <div class="node-grid">
            <NodePaletteItem
              v-for="node in filteredNodes"
              :key="node.type"
              :node="node"
              @drag-start="handleDragStart"
            />
          </div>
        </div>

        <!-- 分類節點 -->
        <div v-else class="category-sections">
          <!-- 台灣特色節點（特別顯示） -->
          <div v-if="showTaiwanSection" class="taiwan-section">
            <div class="section-title taiwan-featured">
              <img src="/icons/taiwan-flag.svg" alt="台灣" class="taiwan-flag" />
              台灣在地化節點
              <el-tag type="success" size="small">Taiwan Featured</el-tag>
            </div>
            <div class="node-grid">
              <NodePaletteItem
                v-for="node in taiwanNodes"
                :key="node.type"
                :node="node"
                :is-taiwan="true"
                @drag-start="handleDragStart"
              />
            </div>
          </div>

          <!-- 一般分類節點 -->
          <div
            v-for="category in visibleCategories"
            :key="category"
            class="category-section"
          >
            <div class="section-title">
              <el-icon><component :is="getCategoryIcon(category)" /></el-icon>
              {{ getCategoryLabel(category) }}
              <el-badge :value="getNodesByCategory(category).length" class="node-count" />
            </div>
            <div class="node-grid">
              <NodePaletteItem
                v-for="node in getNodesByCategory(category)"
                :key="node.type"
                :node="node"
                @drag-start="handleDragStart"
              />
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 底部統計 -->
    <div class="palette-footer">
      <div class="stats">
        <span>總計 {{ totalNodes }} 個節點</span>
        <span>台灣特色 {{ taiwanNodes.length }} 個</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, VideoPlay, CreditCard, Service, Tools, Bell } from '@element-plus/icons-vue'
import NodePaletteItem from './NodePaletteItem.vue'
import { 
  nodeLibrary, 
  getAllNodes, 
  getNodesByCategory, 
  searchNodes, 
  getTaiwanNodes 
} from '@/config/nodeLibrary'
import { NodeCategory } from '@/types/workflow'
import type { PaletteNode } from '@/types/workflow'

// ===== 響應式資料 =====

const searchQuery = ref('')
const activeCategory = ref<NodeCategory | 'all'>('all')

// ===== 分類配置 =====

const categories = [
  { value: 'all', label: '全部', icon: 'Grid' },
  { value: NodeCategory.TRIGGER, label: '觸發', icon: 'VideoPlay' },
  { value: NodeCategory.PAYMENT, label: '金流', icon: 'CreditCard' },
  { value: NodeCategory.TAIWAN_SERVICE, label: '台灣服務', icon: 'Service' },
  { value: NodeCategory.GENERAL, label: '通用', icon: 'Tools' },
  { value: NodeCategory.NOTIFICATION, label: '通知', icon: 'Bell' }
]

// ===== 計算屬性 =====

const allNodes = computed(() => getAllNodes())
const taiwanNodes = computed(() => getTaiwanNodes())
const totalNodes = computed(() => allNodes.value.length)

const filteredNodes = computed(() => {
  if (!searchQuery.value) return []
  return searchNodes(searchQuery.value)
})

const visibleCategories = computed(() => {
  if (activeCategory.value === 'all') {
    return Object.values(NodeCategory)
  }
  return [activeCategory.value as NodeCategory]
})

const showTaiwanSection = computed(() => {
  return activeCategory.value === 'all' && !searchQuery.value
})

// ===== 方法 =====

const setActiveCategory = (category: NodeCategory | 'all') => {
  activeCategory.value = category
  searchQuery.value = ''
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const getCategoryLabel = (category: NodeCategory): string => {
  const categoryMap = {
    [NodeCategory.TRIGGER]: '觸發節點',
    [NodeCategory.PAYMENT]: '金流支付',
    [NodeCategory.TAIWAN_SERVICE]: '台灣服務',
    [NodeCategory.GENERAL]: '通用工具',
    [NodeCategory.NOTIFICATION]: '通知推送'
  }
  return categoryMap[category] || category
}

const getCategoryIcon = (category: NodeCategory): string => {
  const iconMap = {
    [NodeCategory.TRIGGER]: 'VideoPlay',
    [NodeCategory.PAYMENT]: 'CreditCard',
    [NodeCategory.TAIWAN_SERVICE]: 'Service',
    [NodeCategory.GENERAL]: 'Tools',
    [NodeCategory.NOTIFICATION]: 'Bell'
  }
  return iconMap[category] || 'Grid'
}

const handleDragStart = (node: PaletteNode, event: DragEvent) => {
  if (!event.dataTransfer) return
  
  // 設置拖拽資料
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'palette-node',
    nodeType: node.type,
    nodeData: node.defaultData
  }))
  
  event.dataTransfer.effectAllowed = 'copy'
  
  // 發送事件給父組件
  emit('node-drag-start', node, event)
}

// ===== 事件 =====

const emit = defineEmits<{
  'node-drag-start': [node: PaletteNode, event: DragEvent]
}>()

// ===== 生命週期 =====

onMounted(() => {
  console.log('🎨 節點面板已載入', {
    totalNodes: totalNodes.value,
    taiwanNodes: taiwanNodes.value.length,
    categories: Object.keys(nodeLibrary).length
  })
})
</script>

<style scoped lang="scss">
.node-palette {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: $white;
  border-right: $border-width-thin solid $border-color;
}

.palette-header {
  padding: $spacing-lg;
  border-bottom: $border-width-thin solid $border-color;
  background: $bg-color-secondary;
  
  .search-input {
    margin-bottom: $spacing-base;
  }
  
  .category-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
    
    .el-button {
      flex: 1;
      min-width: auto;
      
      .el-icon {
        margin-right: $spacing-xs;
      }
    }
  }
}

.palette-content {
  flex: 1;
  overflow: hidden;
}

.search-results,
.category-sections {
  padding: $spacing-base;
}

.section-title {
  display: flex;
  align-items: center;
  gap: $spacing-xs;
  margin-bottom: $spacing-base;
  font-weight: $font-weight-semibold;
  color: $text-color;
  
  .el-icon {
    font-size: 16px;
  }
  
  &.taiwan-featured {
    color: $taiwan-red;
    background: linear-gradient(135deg, rgba($taiwan-red, 0.1) 0%, rgba($taiwan-blue, 0.1) 100%);
    padding: $spacing-sm $spacing-base;
    border-radius: $border-radius-base;
    border: $border-width-thin solid rgba($taiwan-red, 0.2);
    
    .taiwan-flag {
      width: 20px;
      height: 14px;
      object-fit: cover;
      border-radius: 2px;
    }
  }
}

.node-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: $spacing-base;
  margin-bottom: $spacing-xl;
}

.category-section {
  margin-bottom: $spacing-lg;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.taiwan-section {
  margin-bottom: $spacing-xl;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid rgba($taiwan-red, 0.1);
}

.palette-footer {
  padding: $spacing-base $spacing-lg;
  border-top: $border-width-thin solid $border-color;
  background: $bg-color-secondary;
  
  .stats {
    display: flex;
    justify-content: space-between;
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

.node-count {
  margin-left: auto;
}

// 響應式設計
@media (max-width: 768px) {
  .palette-header {
    padding: $spacing-base;
    
    .category-tabs {
      .el-button {
        font-size: $font-size-xs;
        padding: $spacing-xs;
        
        .el-icon {
          margin-right: 2px;
        }
      }
    }
  }
  
  .node-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: $spacing-sm;
  }
}

// 深色主題
[data-theme="dark"] {
  .node-palette {
    background: var(--bg-color-secondary);
    border-color: var(--border-color);
  }
  
  .palette-header,
  .palette-footer {
    background: var(--bg-color-tertiary);
    border-color: var(--border-color);
  }
  
  .section-title {
    color: var(--text-color);
    
    &.taiwan-featured {
      background: linear-gradient(135deg, rgba($taiwan-red, 0.2) 0%, rgba($taiwan-blue, 0.2) 100%);
      border-color: rgba($taiwan-red, 0.3);
    }
  }
}
</style>
