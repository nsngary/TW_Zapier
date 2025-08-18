/**
 * 節點狀態管理
 */

import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { NodeDefinition, LoadingState, StandardError } from '@/types'

export const useNodeStore = defineStore('node', () => {
  // ===== 狀態 =====
  const nodeDefinitions = ref<NodeDefinition[]>([])
  const loading = ref<LoadingState>('idle')
  const error = ref<StandardError | null>(null)

  // ===== 計算屬性 =====
  const nodesByCategory = computed(() => {
    const categories: Record<string, NodeDefinition[]> = {}
    
    nodeDefinitions.value.forEach(node => {
      const category = node.category
      if (!categories[category]) {
        categories[category] = []
      }
      categories[category].push(node)
    })
    
    return categories
  })

  const totalNodes = computed(() => nodeDefinitions.value.length)

  // ===== 動作 =====

  /**
   * 設定節點定義列表
   */
  const setNodeDefinitions = (nodes: NodeDefinition[]) => {
    nodeDefinitions.value = nodes
  }

  /**
   * 根據類型取得節點定義
   */
  const getNodeDefinition = (type: string): NodeDefinition | undefined => {
    return nodeDefinitions.value.find(node => node.type === type)
  }

  /**
   * 根據分類取得節點
   */
  const getNodesByCategory = (category: string): NodeDefinition[] => {
    return nodeDefinitions.value.filter(node => node.category === category)
  }

  /**
   * 清除錯誤
   */
  const clearError = () => {
    error.value = null
    loading.value = 'idle'
  }

  return {
    // 狀態
    nodeDefinitions: readonly(nodeDefinitions),
    loading: readonly(loading),
    error: readonly(error),

    // 計算屬性
    nodesByCategory,
    totalNodes,

    // 動作
    setNodeDefinitions,
    getNodeDefinition,
    getNodesByCategory,
    clearError
  }
})
