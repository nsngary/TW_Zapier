<template>
  <div class="node-library-panel" :class="{ 'collapsed': isCollapsed, 'pinned': isPinned }">
    <!-- 面板標題列 -->
    <div class="panel-header">
      <h3 class="panel-title">節點庫</h3>
      <div class="panel-controls">
        <button 
          @click="togglePin" 
          class="control-btn"
          :class="{ 'active': isPinned }"
          title="固定面板"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4V2C16 1.44772 15.5523 1 15 1H9C8.44772 1 8 1.44772 8 2V4H5C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6H6V7C6 8.10457 6.89543 9 8 9H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V9H16C17.1046 9 18 8.10457 18 7V6H19C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4H16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button 
          @click="toggleCollapse" 
          class="control-btn"
          title="摺疊面板"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 面板內容 -->
    <div class="panel-content" v-show="!isCollapsed">
      <!-- 搜尋框 -->
      <div class="search-section">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜尋節點..."
            class="search-input"
          />
          <button 
            v-if="searchQuery" 
            @click="clearSearch"
            class="clear-search-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- 分類篩選 -->
      <div class="category-filter" v-if="categories.length > 1">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="setActiveCategory(category.id)"
          class="category-btn"
          :class="{ 'active': activeCategory === category.id }"
        >
          <component v-if="category.icon" :is="category.icon" class="category-icon" />
          <span>{{ category.name }}</span>
          <span class="category-count">({{ category.count }})</span>
        </button>
      </div>

      <!-- 節點列表 -->
      <div class="nodes-container">
        <div 
          v-for="category in filteredCategories" 
          :key="category.id"
          class="node-category"
          :class="{ 'collapsed': collapsedCategories.includes(category.id) }"
        >
          <div class="category-header" @click="toggleCategory(category.id)">
            <div class="category-info">
              <component v-if="category.icon" :is="category.icon" class="category-icon" />
              <h4 class="category-title">{{ category.name }}</h4>
              <span class="category-count">({{ category.nodes.length }})</span>
            </div>
            <button class="category-toggle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="category-nodes" v-show="!collapsedCategories.includes(category.id)">
            <div
              v-for="node in category.nodes"
              :key="node.id"
              class="node-item"
              :class="{ 'dragging': draggingNode === node.id }"
              draggable="true"
              @dragstart="handleDragStart($event, node)"
              @dragend="handleDragEnd"
              @click="showNodePreview(node)"
            >
              <div class="node-icon">
                <component v-if="node.icon" :is="node.icon" />
                <div v-else class="default-icon"></div>
              </div>
              <div class="node-info">
                <div class="node-name">{{ node.name }}</div>
                <div class="node-description">{{ node.description }}</div>
              </div>
              <div class="node-badge" v-if="node.badge">
                {{ node.badge }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-if="filteredCategories.length === 0" class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>找不到符合條件的節點</p>
        <button @click="clearSearch" class="clear-filters-btn">清除篩選</button>
      </div>
    </div>

    <!-- 節點預覽彈窗 -->
    <div v-if="previewNode" class="node-preview-overlay" @click="closePreview">
      <div class="node-preview" @click.stop>
        <div class="preview-header">
          <div class="preview-title">
            <component v-if="previewNode.icon" :is="previewNode.icon" class="preview-icon" />
            <h3>{{ previewNode.name }}</h3>
          </div>
          <button @click="closePreview" class="close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="preview-content">
          <p class="preview-description">{{ previewNode.description }}</p>
          <div class="preview-details" v-if="previewNode.details">
            <h4>功能說明</h4>
            <ul>
              <li v-for="detail in previewNode.details" :key="detail">{{ detail }}</li>
            </ul>
          </div>
          <div class="preview-example" v-if="previewNode.example">
            <h4>使用範例</h4>
            <pre><code>{{ previewNode.example }}</code></pre>
          </div>
        </div>
        <div class="preview-actions">
          <button @click="addNodeToCanvas(previewNode)" class="add-node-btn">
            添加到畫布
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface NodeItem {
  id: string
  name: string
  description: string
  icon?: any
  badge?: string
  category: string
  details?: string[]
  example?: string
  data?: any
}

interface NodeCategory {
  id: string
  name: string
  icon?: any
  nodes: NodeItem[]
  count: number
}

interface Props {
  nodes: NodeItem[]
  defaultCollapsed?: boolean
  defaultPinned?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultCollapsed: false,
  defaultPinned: false
})

const emit = defineEmits<{
  'node-drag-start': [node: NodeItem, event: DragEvent]
  'node-add': [node: NodeItem]
  'panel-toggle': [collapsed: boolean]
  'panel-pin': [pinned: boolean]
}>()

// 狀態管理
const isCollapsed = ref(props.defaultCollapsed)
const isPinned = ref(props.defaultPinned)
const searchQuery = ref('')
const activeCategory = ref('all')
const collapsedCategories = ref<string[]>([])
const draggingNode = ref<string | null>(null)
const previewNode = ref<NodeItem | null>(null)

// 計算屬性
const categories = computed(() => {
  const categoryMap = new Map<string, NodeItem[]>()
  
  props.nodes.forEach(node => {
    if (!categoryMap.has(node.category)) {
      categoryMap.set(node.category, [])
    }
    categoryMap.get(node.category)!.push(node)
  })
  
  const result: NodeCategory[] = [
    {
      id: 'all',
      name: '全部',
      nodes: props.nodes,
      count: props.nodes.length
    }
  ]
  
  categoryMap.forEach((nodes, categoryId) => {
    result.push({
      id: categoryId,
      name: getCategoryName(categoryId),
      icon: getCategoryIcon(categoryId),
      nodes,
      count: nodes.length
    })
  })
  
  return result
})

const filteredCategories = computed(() => {
  let filtered = categories.value
  
  // 分類篩選
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(cat => cat.id === activeCategory.value)
  }
  
  // 搜尋篩選
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.map(category => ({
      ...category,
      nodes: category.nodes.filter(node => 
        node.name.toLowerCase().includes(query) ||
        node.description.toLowerCase().includes(query)
      )
    })).filter(category => category.nodes.length > 0)
  }
  
  return filtered
})

// 方法
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('panel-toggle', isCollapsed.value)
}

const togglePin = () => {
  isPinned.value = !isPinned.value
  emit('panel-pin', isPinned.value)
}

const clearSearch = () => {
  searchQuery.value = ''
}

const setActiveCategory = (categoryId: string) => {
  activeCategory.value = categoryId
}

const toggleCategory = (categoryId: string) => {
  const index = collapsedCategories.value.indexOf(categoryId)
  if (index > -1) {
    collapsedCategories.value.splice(index, 1)
  } else {
    collapsedCategories.value.push(categoryId)
  }
}

const handleDragStart = (event: DragEvent, node: NodeItem) => {
  draggingNode.value = node.id
  emit('node-drag-start', node, event)
}

const handleDragEnd = () => {
  draggingNode.value = null
}

const showNodePreview = (node: NodeItem) => {
  previewNode.value = node
}

const closePreview = () => {
  previewNode.value = null
}

const addNodeToCanvas = (node: NodeItem) => {
  emit('node-add', node)
  closePreview()
}

// 輔助函數
const getCategoryName = (categoryId: string): string => {
  const categoryNames: Record<string, string> = {
    'trigger': '觸發器',
    'action': '動作',
    'condition': '條件',
    'transform': '轉換',
    'taiwan': '台灣服務',
    'notification': '通知',
    'payment': '金流',
    'data': '資料處理'
  }
  return categoryNames[categoryId] || categoryId
}

const getCategoryIcon = (categoryId: string) => {
  // 這裡可以返回對應的圖標組件
  return null
}

// 監聽器
watch(() => props.defaultCollapsed, (newValue) => {
  isCollapsed.value = newValue
})

watch(() => props.defaultPinned, (newValue) => {
  isPinned.value = newValue
})
</script>

<style scoped>
.node-library-panel {
  width: 280px;
  height: 100%;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;
}

.node-library-panel.collapsed {
  width: 48px;
}

.node-library-panel.pinned {
  position: sticky;
  top: 0;
}

/* 面板標題列 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  min-height: 48px;
}

.panel-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.panel-controls {
  display: flex;
  gap: 4px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  border-radius: 4px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.control-btn.active {
  background: #86735E;
  color: white;
}

/* 面板內容 */
.panel-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 搜尋區域 */
.search-section {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 8px;
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 32px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #86735E;
  box-shadow: 0 0 0 3px rgba(134, 115, 94, 0.1);
}

.clear-search-btn {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  border-radius: 50%;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-search-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

/* 分類篩選 */
.category-filter {
  padding: 8px 16px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  font-size: 11px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-btn:hover {
  border-color: #86735E;
  color: #86735E;
}

.category-btn.active {
  background: #86735E;
  border-color: #86735E;
  color: white;
}

.category-icon {
  width: 12px;
  height: 12px;
}

.category-count {
  font-size: 10px;
  opacity: 0.7;
}

/* 節點容器 */
.nodes-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

/* 節點分類 */
.node-category {
  margin-bottom: 8px;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.category-header:hover {
  background: #f9fafb;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-title {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.category-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.node-category.collapsed .category-toggle {
  transform: rotate(-90deg);
}

/* 節點項目 */
.category-nodes {
  padding: 0 8px;
}

.node-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  margin: 2px 0;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.2s ease;
  position: relative;
}

.node-item:hover {
  background: #f3f4f6;
  transform: translateX(2px);
}

.node-item.dragging {
  opacity: 0.5;
  transform: rotate(2deg);
  cursor: grabbing;
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #f3f4f6;
  color: #86735E;
  flex-shrink: 0;
}

.default-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: currentColor;
}

.node-info {
  flex: 1;
  min-width: 0;
}

.node-name {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-description {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-badge {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 8px;
  background: #86735E;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 空狀態 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  color: #9ca3af;
}

.empty-state svg {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0 0 16px 0;
  font-size: 14px;
}

.clear-filters-btn {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  border-color: #86735E;
  color: #86735E;
}

/* 節點預覽彈窗 */
.node-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.node-preview {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
}

.preview-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.preview-title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
}

.preview-icon {
  width: 24px;
  height: 24px;
  color: #86735E;
}

.close-btn {
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

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.preview-content {
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.preview-description {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.preview-details h4,
.preview-example h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.preview-details ul {
  margin: 0;
  padding-left: 16px;
  color: #6b7280;
  font-size: 13px;
}

.preview-details li {
  margin-bottom: 4px;
}

.preview-example pre {
  background: #f3f4f6;
  border-radius: 6px;
  padding: 12px;
  margin: 0;
  font-size: 12px;
  overflow-x: auto;
}

.preview-actions {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.add-node-btn {
  padding: 8px 16px;
  background: #86735E;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-node-btn:hover {
  background: #7a6654;
  transform: translateY(-1px);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .node-library-panel {
    width: 100%;
    max-width: 320px;
  }

  .node-preview {
    margin: 16px;
    max-width: calc(100vw - 32px);
  }
}
</style>
