/**
 * 使用者狀態管理
 */

import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User, LoadingState, StandardError } from '@/types'
import type { UserState, UserPreferences } from './types'
import { userApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // ===== 狀態 =====
  const currentUser = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const permissions = ref<string[]>([])
  const preferences = ref<UserPreferences>({
    theme: 'auto',
    language: 'zh-TW',
    timezone: 'Asia/Taipei',
    dateFormat: 'YYYY-MM-DD',
    autoSave: true,
    notifications: {
      email: true,
      push: true,
      inApp: true
    }
  })
  const loading = ref<LoadingState>('idle')
  const error = ref<StandardError | null>(null)

  // ===== 計算屬性 =====
  const userDisplayName = computed(() => {
    return currentUser.value?.displayName || currentUser.value?.username || '未知使用者'
  })

  const userAvatar = computed(() => {
    return currentUser.value?.avatar || '/default-avatar.png'
  })

  const isAdmin = computed(() => {
    return currentUser.value?.role === 'admin'
  })

  const hasPermission = computed(() => {
    return (permission: string) => permissions.value.includes(permission)
  })

  // ===== 動作 =====

  /**
   * 設定當前使用者
   */
  const setCurrentUser = (user: User | null) => {
    currentUser.value = user
    isAuthenticated.value = !!user
    
    if (user) {
      // 合併使用者偏好設定
      if (user.preferences) {
        preferences.value = {
          ...preferences.value,
          ...user.preferences
        }
      }
    }
  }

  /**
   * 設定使用者權限
   */
  const setPermissions = (userPermissions: string[]) => {
    permissions.value = userPermissions
  }

  /**
   * 更新使用者偏好設定
   */
  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    try {
      loading.value = 'loading'
      error.value = null

      // 更新本地狀態
      preferences.value = {
        ...preferences.value,
        ...newPreferences
      }

      // 如果使用者已登入，同步到伺服器
      if (currentUser.value) {
        await userApi.updatePreferences(newPreferences)
        
        // 更新使用者物件中的偏好設定
        currentUser.value = {
          ...currentUser.value,
          preferences: {
            ...currentUser.value.preferences,
            ...newPreferences
          }
        }
      }

      loading.value = 'success'
    } catch (err: any) {
      error.value = {
        code: 'UPDATE_PREFERENCES_FAILED',
        message: err.message || '更新偏好設定失敗',
        category: 'api',
        severity: 'medium'
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 更新使用者個人資料
   */
  const updateProfile = async (profileData: Partial<User>) => {
    try {
      loading.value = 'loading'
      error.value = null

      const updatedUser = await userApi.updateProfile(profileData)
      setCurrentUser(updatedUser)

      loading.value = 'success'
      return updatedUser
    } catch (err: any) {
      error.value = {
        code: 'UPDATE_PROFILE_FAILED',
        message: err.message || '更新個人資料失敗',
        category: 'api',
        severity: 'medium'
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 變更密碼
   */
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      loading.value = 'loading'
      error.value = null

      await userApi.changePassword({
        currentPassword,
        newPassword,
        confirmPassword: newPassword
      })

      loading.value = 'success'
    } catch (err: any) {
      error.value = {
        code: 'CHANGE_PASSWORD_FAILED',
        message: err.message || '變更密碼失敗',
        category: 'api',
        severity: 'high'
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 上傳頭像
   */
  const uploadAvatar = async (file: File) => {
    try {
      loading.value = 'loading'
      error.value = null

      const avatarUrl = await userApi.uploadAvatar(file)
      
      if (currentUser.value) {
        currentUser.value = {
          ...currentUser.value,
          avatar: avatarUrl
        }
      }

      loading.value = 'success'
      return avatarUrl
    } catch (err: any) {
      error.value = {
        code: 'UPLOAD_AVATAR_FAILED',
        message: err.message || '上傳頭像失敗',
        category: 'api',
        severity: 'medium'
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 取得使用者統計資料
   */
  const getUserStats = async () => {
    try {
      loading.value = 'loading'
      error.value = null

      const stats = await userApi.getUserStats()
      loading.value = 'success'
      return stats
    } catch (err: any) {
      error.value = {
        code: 'GET_USER_STATS_FAILED',
        message: err.message || '取得使用者統計失敗',
        category: 'api',
        severity: 'low'
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 清除使用者狀態
   */
  const clearUser = () => {
    currentUser.value = null
    isAuthenticated.value = false
    permissions.value = []
    error.value = null
    loading.value = 'idle'
  }

  /**
   * 重設錯誤狀態
   */
  const clearError = () => {
    error.value = null
    loading.value = 'idle'
  }

  /**
   * 檢查權限
   */
  const checkPermission = (permission: string): boolean => {
    return permissions.value.includes(permission)
  }

  /**
   * 檢查多個權限（需要全部擁有）
   */
  const checkPermissions = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.every(permission => 
      permissions.value.includes(permission)
    )
  }

  /**
   * 檢查任一權限（只需擁有其中一個）
   */
  const checkAnyPermission = (requiredPermissions: string[]): boolean => {
    return requiredPermissions.some(permission => 
      permissions.value.includes(permission)
    )
  }

  return {
    // 狀態
    currentUser: readonly(currentUser),
    isAuthenticated: readonly(isAuthenticated),
    permissions: readonly(permissions),
    preferences: readonly(preferences),
    loading: readonly(loading),
    error: readonly(error),

    // 計算屬性
    userDisplayName,
    userAvatar,
    isAdmin,
    hasPermission,

    // 動作
    setCurrentUser,
    setPermissions,
    updatePreferences,
    updateProfile,
    changePassword,
    uploadAvatar,
    getUserStats,
    clearUser,
    clearError,
    checkPermission,
    checkPermissions,
    checkAnyPermission
  }
}, {
  persist: {
    key: 'user-store',
    paths: ['currentUser', 'isAuthenticated', 'permissions', 'preferences']
  }
})
