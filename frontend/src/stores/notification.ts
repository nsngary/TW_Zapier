/**
 * 通知狀態管理
 */

import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { NotificationConfig, NotificationType } from '@/types'

interface NotificationItem extends NotificationConfig {
  id: string
  timestamp: Date
  read: boolean
}

export const useNotificationStore = defineStore('notification', () => {
  // ===== 狀態 =====
  const notifications = ref<NotificationItem[]>([])
  const maxVisible = ref(5)
  const defaultDuration = ref(4000)

  // ===== 計算屬性 =====
  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  const visibleNotifications = computed(() => 
    notifications.value.slice(0, maxVisible.value)
  )

  // ===== 動作 =====

  /**
   * 顯示通知
   */
  const notify = (config: Omit<NotificationConfig, 'id'>) => {
    const notification: NotificationItem = {
      id: generateId(),
      timestamp: new Date(),
      read: false,
      duration: defaultDuration.value,
      position: 'top-right',
      closable: true,
      showIcon: true,
      ...config
    }

    notifications.value.unshift(notification)

    // 自動移除通知
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        remove(notification.id)
      }, notification.duration)
    }

    return notification.id
  }

  /**
   * 顯示成功通知
   */
  const success = (message: string, title?: string) => {
    return notify({
      type: 'success',
      title,
      message
    })
  }

  /**
   * 顯示警告通知
   */
  const warning = (message: string, title?: string) => {
    return notify({
      type: 'warning',
      title,
      message
    })
  }

  /**
   * 顯示錯誤通知
   */
  const error = (message: string, title?: string) => {
    return notify({
      type: 'error',
      title,
      message,
      duration: 0 // 錯誤通知不自動消失
    })
  }

  /**
   * 顯示資訊通知
   */
  const info = (message: string, title?: string) => {
    return notify({
      type: 'info',
      title,
      message
    })
  }

  /**
   * 移除通知
   */
  const remove = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  /**
   * 標記為已讀
   */
  const markAsRead = (id: string) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  /**
   * 標記所有為已讀
   */
  const markAllAsRead = () => {
    notifications.value.forEach(n => {
      n.read = true
    })
  }

  /**
   * 清除所有通知
   */
  const clear = () => {
    notifications.value = []
  }

  /**
   * 清除已讀通知
   */
  const clearRead = () => {
    notifications.value = notifications.value.filter(n => !n.read)
  }

  /**
   * 生成 ID
   */
  const generateId = (): string => {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  return {
    // 狀態
    notifications: readonly(notifications),
    maxVisible: readonly(maxVisible),
    defaultDuration: readonly(defaultDuration),

    // 計算屬性
    unreadCount,
    visibleNotifications,

    // 動作
    notify,
    success,
    warning,
    error,
    info,
    remove,
    markAsRead,
    markAllAsRead,
    clear,
    clearRead
  }
})
