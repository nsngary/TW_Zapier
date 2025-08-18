/**
 * 通知相關組合式函數
 */

import { computed } from 'vue'
import { useNotificationStore } from '@/stores'
import type { NotificationConfig } from '@/types'

export const useNotification = () => {
  const notificationStore = useNotificationStore()

  // ===== 計算屬性 =====
  
  const notifications = computed(() => notificationStore.notifications)
  const unreadCount = computed(() => notificationStore.unreadCount)
  const visibleNotifications = computed(() => notificationStore.visibleNotifications)

  // ===== 方法 =====

  /**
   * 顯示通知
   */
  const notify = (config: Omit<NotificationConfig, 'id'>) => {
    return notificationStore.notify(config)
  }

  /**
   * 顯示成功通知
   */
  const success = (message: string, title?: string) => {
    return notificationStore.success(message, title)
  }

  /**
   * 顯示警告通知
   */
  const warning = (message: string, title?: string) => {
    return notificationStore.warning(message, title)
  }

  /**
   * 顯示錯誤通知
   */
  const error = (message: string, title?: string) => {
    return notificationStore.error(message, title)
  }

  /**
   * 顯示資訊通知
   */
  const info = (message: string, title?: string) => {
    return notificationStore.info(message, title)
  }

  /**
   * 移除通知
   */
  const remove = (id: string) => {
    notificationStore.remove(id)
  }

  /**
   * 標記為已讀
   */
  const markAsRead = (id: string) => {
    notificationStore.markAsRead(id)
  }

  /**
   * 標記所有為已讀
   */
  const markAllAsRead = () => {
    notificationStore.markAllAsRead()
  }

  /**
   * 清除所有通知
   */
  const clear = () => {
    notificationStore.clear()
  }

  /**
   * 清除已讀通知
   */
  const clearRead = () => {
    notificationStore.clearRead()
  }

  return {
    // 狀態
    notifications,
    unreadCount,
    visibleNotifications,

    // 方法
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
}
