/**
 * 節點相關組合式函數
 */

import { computed } from 'vue'
import { useNodeStore } from '@/stores'
import type { NodeDefinition } from '@/types'

export const useNode = () => {
  const nodeStore = useNodeStore()

  // ===== 計算屬性 =====
  
  const nodeDefinitions = computed(() => nodeStore.nodeDefinitions)
  const nodesByCategory = computed(() => nodeStore.nodesByCategory)
  const totalNodes = computed(() => nodeStore.totalNodes)
  const isLoading = computed(() => nodeStore.loading === 'loading')
  const error = computed(() => nodeStore.error)

  // ===== 方法 =====

  /**
   * 根據類型取得節點定義
   */
  const getNodeDefinition = (type: string): NodeDefinition | undefined => {
    return nodeStore.getNodeDefinition(type)
  }

  /**
   * 根據分類取得節點
   */
  const getNodesByCategory = (category: string): NodeDefinition[] => {
    return nodeStore.getNodesByCategory(category)
  }

  /**
   * 搜尋節點
   */
  const searchNodes = (query: string): NodeDefinition[] => {
    const lowerQuery = query.toLowerCase()
    return nodeDefinitions.value.filter(node => 
      node.name.toLowerCase().includes(lowerQuery) ||
      node.displayName.toLowerCase().includes(lowerQuery) ||
      node.description.toLowerCase().includes(lowerQuery)
    )
  }

  /**
   * 根據標籤篩選節點
   */
  const getNodesByTag = (tag: string): NodeDefinition[] => {
    return nodeDefinitions.value.filter(node => 
      // 假設節點定義有 tags 屬性
      (node as any).tags?.includes(tag)
    )
  }

  /**
   * 檢查節點是否為台灣特有節點
   */
  const isTaiwanNode = (nodeType: string): boolean => {
    const taiwanNodeTypes = [
      'linePay',
      'ecPay',
      'newebPay',
      'spgateway',
      'taoyuanAirport',
      'govOpenData',
      'weatherBureau',
      'healthInsurance',
      'shopee',
      'momo',
      'pchome',
      'yahooShopping'
    ]
    return taiwanNodeTypes.includes(nodeType)
  }

  /**
   * 取得節點圖示
   */
  const getNodeIcon = (nodeType: string): string => {
    const node = getNodeDefinition(nodeType)
    return node?.icon || 'Setting'
  }

  /**
   * 取得節點顏色
   */
  const getNodeColor = (nodeType: string): string => {
    const node = getNodeDefinition(nodeType)
    return node?.color || '#1890ff'
  }

  /**
   * 清除錯誤
   */
  const clearError = () => {
    nodeStore.clearError()
  }

  return {
    // 狀態
    nodeDefinitions,
    nodesByCategory,
    totalNodes,
    isLoading,
    error,

    // 方法
    getNodeDefinition,
    getNodesByCategory,
    searchNodes,
    getNodesByTag,
    isTaiwanNode,
    getNodeIcon,
    getNodeColor,
    clearError
  }
}
