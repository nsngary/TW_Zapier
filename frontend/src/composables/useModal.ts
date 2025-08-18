/**
 * 模態框組合式函數
 */

import { computed } from 'vue'
import { useUIStore } from '@/stores'

export const useModal = () => {
  const uiStore = useUIStore()

  // ===== 計算屬性 =====
  
  const modals = computed(() => uiStore.modals)
  const hasActiveModals = computed(() => uiStore.hasActiveModals)

  // ===== 方法 =====

  /**
   * 開啟模態框
   */
  const openModal = (modalId: string) => {
    uiStore.openModal(modalId)
  }

  /**
   * 關閉模態框
   */
  const closeModal = (modalId: string) => {
    uiStore.closeModal(modalId)
  }

  /**
   * 關閉所有模態框
   */
  const closeAllModals = () => {
    uiStore.closeAllModals()
  }

  /**
   * 檢查模態框是否開啟
   */
  const isModalOpen = (modalId: string): boolean => {
    return uiStore.isModalOpen(modalId)
  }

  /**
   * 切換模態框狀態
   */
  const toggleModal = (modalId: string) => {
    if (isModalOpen(modalId)) {
      closeModal(modalId)
    } else {
      openModal(modalId)
    }
  }

  return {
    // 狀態
    modals,
    hasActiveModals,

    // 方法
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    toggleModal
  }
}
