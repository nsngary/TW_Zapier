/**
 * 認證相關組合式函數
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAuthStore } from '@/stores'
import type { LoginRequest, RegisterRequest } from '@/types'

export const useAuth = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const authStore = useAuthStore()

  // ===== 計算屬性 =====
  
  const isAuthenticated = computed(() => userStore.isAuthenticated)
  const currentUser = computed(() => userStore.currentUser)
  const loading = computed(() => authStore.loading === 'loading')
  const error = computed(() => authStore.error)

  // ===== 方法 =====

  /**
   * 登入
   */
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const result = await authStore.login(credentials)
      userStore.setCurrentUser(result.user)

      return true
    } catch (error) {
      throw error
    }
  }

  /**
   * 註冊
   */
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      await authStore.register(userData)

      return true
    } catch (error) {
      throw error
    }
  }

  /**
   * 登出
   */
  const logout = async () => {
    try {
      await authStore.logout()
      userStore.clearUser()
      await router.push('/login')
    } catch (error) {
      // 即使登出失敗也要清除本地狀態
      userStore.clearUser()
      await router.push('/login')
      throw error
    }
  }

  /**
   * 重新整理 Token
   */
  const refreshToken = async () => {
    try {
      return await authStore.refreshTokens()
    } catch (error) {
      // Token 重新整理失敗，強制登出
      await logout()
      throw error
    }
  }

  /**
   * 忘記密碼
   */
  const forgotPassword = async (email: string) => {
    try {
      return await authStore.forgotPassword(email)
    } catch (error) {
      throw error
    }
  }

  /**
   * 重設密碼
   */
  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const result = await authStore.resetPassword(token, newPassword)
      await router.push('/login')
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * 驗證郵件
   */
  const verifyEmail = async (token: string) => {
    try {
      const result = await authStore.verifyEmail(token)
      await router.push('/login')
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * 檢查是否已認證
   */
  const requireAuth = () => {
    if (!isAuthenticated.value) {
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.value.fullPath }
      })
      return false
    }
    return true
  }

  /**
   * 檢查權限
   */
  const hasPermission = (permission: string): boolean => {
    return userStore.checkPermission(permission)
  }

  /**
   * 檢查多個權限
   */
  const hasPermissions = (permissions: string[]): boolean => {
    return userStore.checkPermissions(permissions)
  }

  /**
   * 檢查任一權限
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    return userStore.checkAnyPermission(permissions)
  }

  /**
   * 檢查角色
   */
  const hasRole = (role: string): boolean => {
    return currentUser.value?.role === role
  }

  /**
   * 是否為管理員
   */
  const isAdmin = computed(() => hasRole('admin'))

  /**
   * 清除錯誤
   */
  const clearError = () => {
    authStore.clearError()
  }

  return {
    // 狀態
    isAuthenticated,
    currentUser,
    loading,
    error,
    isAdmin,

    // 方法
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
    requireAuth,
    hasPermission,
    hasPermissions,
    hasAnyPermission,
    hasRole,
    clearError
  }
}
