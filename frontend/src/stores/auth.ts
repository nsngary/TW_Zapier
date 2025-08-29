/**
 * 認證狀態管理
 */

import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  LoadingState,
  StandardError
} from '@/types'
import { ErrorCategory, ErrorSeverity } from '@/types'
import { authApi } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  // ===== 狀態 =====
  const accessToken = ref<string | null>(localStorage.getItem('access_token'))
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'))
  const tokenExpiry = ref<number | null>(
    localStorage.getItem('token_expiry') ? parseInt(localStorage.getItem('token_expiry')!) : null
  )
  const loading = ref<LoadingState>('idle')
  const error = ref<StandardError | null>(null)

  // ===== 計算屬性 =====
  const isAuthenticated = computed(() => {
    return !!accessToken.value && !isTokenExpired.value
  })

  const isTokenExpired = computed(() => {
    if (!tokenExpiry.value) return false
    return Date.now() >= tokenExpiry.value
  })

  // ===== 動作 =====

  /**
   * 登入
   */
  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      loading.value = 'loading'
      error.value = null

      const response = await authApi.login(credentials)

      // 儲存 token
      setTokens(response.token.accessToken, response.token.refreshToken || '', response.token.expiresIn)

      loading.value = 'success'
      return response
    } catch (err: any) {
      error.value = {
        code: 'LOGIN_FAILED',
        message: err.message || '登入失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.HIGH
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 簡單登入（用於測試）
   */
  const simpleLogin = (username: string): void => {
    // 創建一個假的 token（使用 base64 編碼避免中文字符問題）
    const encodedUsername = btoa(encodeURIComponent(username))
    const fakeToken = `fake-token-${encodedUsername}-${Date.now()}`
    const expiresIn = 24 * 60 * 60 // 24 小時

    setTokens(fakeToken, fakeToken, expiresIn)
    loading.value = 'success'
    error.value = null
  }

  /**
   * 註冊
   */
  const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
      loading.value = 'loading'
      error.value = null

      const response = await authApi.register(userData)

      loading.value = 'success'
      return response
    } catch (err: any) {
      error.value = {
        code: 'REGISTER_FAILED',
        message: err.message || '註冊失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.HIGH
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 登出
   */
  const logout = async (): Promise<void> => {
    try {
      loading.value = 'loading'
      error.value = null

      // 呼叫登出 API
      if (refreshToken.value) {
        await authApi.logout(refreshToken.value)
      }

      // 清除本地 token
      clearTokens()

      loading.value = 'success'
    } catch (err: any) {
      // 即使 API 失敗也要清除本地 token
      clearTokens()
      
      error.value = {
        code: 'LOGOUT_FAILED',
        message: err.message || '登出失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.MEDIUM
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 重新整理 Token
   */
  const refreshTokens = async (): Promise<string> => {
    try {
      if (!refreshToken.value) {
        throw new Error('沒有重新整理 Token')
      }

      loading.value = 'loading'
      error.value = null

      const response = await authApi.refreshToken(refreshToken.value)
      
      // 更新 token
      setTokens(response.accessToken, response.refreshToken, response.expiresIn)

      loading.value = 'success'
      return response.accessToken
    } catch (err: any) {
      // Token 重新整理失敗，清除所有 token
      clearTokens()
      
      error.value = {
        code: 'REFRESH_TOKEN_FAILED',
        message: err.message || 'Token 重新整理失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.HIGH
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 忘記密碼
   */
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      loading.value = 'loading'
      error.value = null

      await authApi.forgotPassword(email)

      loading.value = 'success'
    } catch (err: any) {
      error.value = {
        code: 'FORGOT_PASSWORD_FAILED',
        message: err.message || '發送重設密碼郵件失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.MEDIUM
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 重設密碼
   */
  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      loading.value = 'loading'
      error.value = null

      await authApi.resetPassword(token, newPassword)

      loading.value = 'success'
    } catch (err: any) {
      error.value = {
        code: 'RESET_PASSWORD_FAILED',
        message: err.message || '重設密碼失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.HIGH
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 驗證郵件
   */
  const verifyEmail = async (token: string): Promise<void> => {
    try {
      loading.value = 'loading'
      error.value = null

      await authApi.verifyEmail(token)

      loading.value = 'success'
    } catch (err: any) {
      error.value = {
        code: 'VERIFY_EMAIL_FAILED',
        message: err.message || '郵件驗證失敗',
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.MEDIUM
      }
      loading.value = 'error'
      throw err
    }
  }

  /**
   * 設定 Token
   */
  const setTokens = (access: string, refresh: string, expiresIn: number) => {
    accessToken.value = access
    refreshToken.value = refresh
    tokenExpiry.value = Date.now() + (expiresIn * 1000)

    // 儲存到 localStorage
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    localStorage.setItem('token_expiry', tokenExpiry.value.toString())
  }

  /**
   * 清除 Token
   */
  const clearTokens = () => {
    accessToken.value = null
    refreshToken.value = null
    tokenExpiry.value = null

    // 清除 localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_expiry')
  }

  /**
   * 清除錯誤
   */
  const clearError = () => {
    error.value = null
    loading.value = 'idle'
  }

  /**
   * 初始化（從 localStorage 恢復狀態）
   */
  const initialize = () => {
    const storedExpiry = localStorage.getItem('token_expiry')
    if (storedExpiry) {
      tokenExpiry.value = parseInt(storedExpiry)
    }

    // 檢查 token 是否過期
    if (isTokenExpired.value) {
      clearTokens()
    }
  }

  // 初始化
  initialize()

  return {
    // 狀態
    accessToken: readonly(accessToken),
    refreshToken: readonly(refreshToken),
    tokenExpiry: readonly(tokenExpiry),
    loading: readonly(loading),
    error: readonly(error),

    // 計算屬性
    isAuthenticated,
    isTokenExpired,

    // 動作
    login,
    simpleLogin,
    register,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail,
    setTokens,
    clearTokens,
    clearError,
    initialize
  }
}, {
  persist: {
    key: 'auth-store',
    paths: ['accessToken', 'refreshToken', 'tokenExpiry']
  }
})
