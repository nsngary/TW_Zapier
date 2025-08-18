/**
 * UI 狀態管理
 */

import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { ThemeMode } from '@/types'

export const useUIStore = defineStore('ui', () => {
  // ===== 狀態 =====
  const theme = ref<ThemeMode>('light')
  const sidebarCollapsed = ref(false)
  const sidebarWidth = ref(256)
  const loading = ref<Record<string, boolean>>({})
  const modals = ref<string[]>([])

  // ===== 計算屬性 =====
  const isDarkMode = computed(() => theme.value === 'dark')
  const isLightMode = computed(() => theme.value === 'light')
  const isAutoMode = computed(() => theme.value === 'auto')

  const actualSidebarWidth = computed(() => 
    sidebarCollapsed.value ? 64 : sidebarWidth.value
  )

  const hasActiveModals = computed(() => modals.value.length > 0)

  // ===== 動作 =====

  /**
   * 設定主題
   */
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme
    
    // 應用主題到 HTML 元素
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    
    if (newTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      html.classList.add(prefersDark ? 'dark' : 'light')
    } else {
      html.classList.add(newTheme)
    }
  }

  /**
   * 切換主題
   */
  const toggleTheme = () => {
    const themes: ThemeMode[] = ['light', 'dark', 'auto']
    const currentIndex = themes.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  /**
   * 切換側邊欄
   */
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  /**
   * 設定側邊欄狀態
   */
  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed
  }

  /**
   * 設定側邊欄寬度
   */
  const setSidebarWidth = (width: number) => {
    sidebarWidth.value = width
  }

  /**
   * 設定載入狀態
   */
  const setLoading = (key: string, isLoading: boolean) => {
    if (isLoading) {
      loading.value[key] = true
    } else {
      delete loading.value[key]
    }
  }

  /**
   * 檢查是否正在載入
   */
  const isLoading = (key: string): boolean => {
    return !!loading.value[key]
  }

  /**
   * 開啟模態框
   */
  const openModal = (modalId: string) => {
    if (!modals.value.includes(modalId)) {
      modals.value.push(modalId)
    }
  }

  /**
   * 關閉模態框
   */
  const closeModal = (modalId: string) => {
    const index = modals.value.indexOf(modalId)
    if (index > -1) {
      modals.value.splice(index, 1)
    }
  }

  /**
   * 關閉所有模態框
   */
  const closeAllModals = () => {
    modals.value = []
  }

  /**
   * 檢查模態框是否開啟
   */
  const isModalOpen = (modalId: string): boolean => {
    return modals.value.includes(modalId)
  }

  return {
    // 狀態
    theme: readonly(theme),
    sidebarCollapsed: readonly(sidebarCollapsed),
    sidebarWidth: readonly(sidebarWidth),
    loading: readonly(loading),
    modals: readonly(modals),

    // 計算屬性
    isDarkMode,
    isLightMode,
    isAutoMode,
    actualSidebarWidth,
    hasActiveModals,

    // 動作
    setTheme,
    toggleTheme,
    toggleSidebar,
    setSidebarCollapsed,
    setSidebarWidth,
    setLoading,
    isLoading,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen
  }
}, {
  persist: {
    key: 'ui-store',
    paths: ['theme', 'sidebarCollapsed', 'sidebarWidth']
  }
})
