/**
 * 認證系統測試
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/api/auth'
import type { LoginRequest, RegisterRequest } from '@/types'

// Mock API
vi.mock('@/api/auth', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refreshToken: vi.fn(),
    forgotPassword: vi.fn(),
    resetPassword: vi.fn(),
    verifyEmail: vi.fn(),
    validateToken: vi.fn()
  }
}))

describe('認證系統測試', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('AuthStore', () => {
    it('應該正確初始化狀態', () => {
      const authStore = useAuthStore()
      
      expect(authStore.accessToken).toBeNull()
      expect(authStore.refreshToken).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.loading).toBe('idle')
      expect(authStore.error).toBeNull()
    })

    it('應該正確處理登入成功', async () => {
      const authStore = useAuthStore()
      const mockResponse = {
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          emailVerified: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        token: {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          tokenType: 'Bearer',
          expiresIn: 3600,
          issuedAt: Date.now()
        }
      }

      vi.mocked(authApi.login).mockResolvedValue(mockResponse)

      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      }

      const result = await authStore.login(credentials)

      expect(authApi.login).toHaveBeenCalledWith(credentials)
      expect(result).toEqual(mockResponse)
      expect(authStore.accessToken).toBe('mock-access-token')
      expect(authStore.refreshToken).toBe('mock-refresh-token')
      expect(authStore.isAuthenticated).toBe(true)
      expect(authStore.loading).toBe('success')
    })

    it('應該正確處理登入失敗', async () => {
      const authStore = useAuthStore()
      const mockError = new Error('登入失敗')

      vi.mocked(authApi.login).mockRejectedValue(mockError)

      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'wrong-password'
      }

      await expect(authStore.login(credentials)).rejects.toThrow('登入失敗')
      
      expect(authStore.accessToken).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
      expect(authStore.loading).toBe('error')
      expect(authStore.error).toBeTruthy()
    })

    it('應該正確處理註冊成功', async () => {
      const authStore = useAuthStore()
      const mockResponse = {
        user: {
          id: '1',
          name: 'New User',
          email: 'newuser@example.com',
          emailVerified: false,
          createdAt: '2024-01-01T00:00:00Z'
        },
        message: '註冊成功，請檢查您的電子郵件以驗證帳戶'
      }

      vi.mocked(authApi.register).mockResolvedValue(mockResponse)

      const userData: RegisterRequest = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123'
      }

      const result = await authStore.register(userData)

      expect(authApi.register).toHaveBeenCalledWith(userData)
      expect(result).toEqual(mockResponse)
      expect(authStore.loading).toBe('success')
    })

    it('應該正確處理登出', async () => {
      const authStore = useAuthStore()
      
      // 先設置一些 token
      authStore.setTokens('access-token', 'refresh-token', 3600)
      expect(authStore.isAuthenticated).toBe(true)

      vi.mocked(authApi.logout).mockResolvedValue()

      await authStore.logout()

      expect(authApi.logout).toHaveBeenCalledWith('refresh-token')
      expect(authStore.accessToken).toBeNull()
      expect(authStore.refreshToken).toBeNull()
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('應該正確處理 Token 刷新', async () => {
      const authStore = useAuthStore()
      const mockResponse = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        expiresIn: 3600
      }

      // 先設置一些 token
      authStore.setTokens('old-access-token', 'old-refresh-token', 3600)

      vi.mocked(authApi.refreshToken).mockResolvedValue(mockResponse)

      const newToken = await authStore.refreshTokens()

      expect(authApi.refreshToken).toHaveBeenCalledWith('old-refresh-token')
      expect(newToken).toBe('new-access-token')
      expect(authStore.accessToken).toBe('new-access-token')
      expect(authStore.refreshToken).toBe('new-refresh-token')
    })

    it('應該正確檢查 Token 過期', () => {
      const authStore = useAuthStore()
      
      // 設置已過期的 token
      const expiredTime = Date.now() - 1000 // 1秒前過期
      authStore.setTokens('access-token', 'refresh-token', -1)
      
      expect(authStore.isTokenExpired).toBe(true)
      expect(authStore.isAuthenticated).toBe(false)
    })

    it('應該正確清除錯誤', async () => {
      const authStore = useAuthStore()

      // 手動設置錯誤狀態（通過內部方法）
      vi.mocked(authApi.login).mockRejectedValue(new Error('Test error'))

      try {
        await authStore.login({ email: 'invalid', password: 'invalid' })
      } catch {
        // 預期會失敗，這會設置錯誤狀態
      }

      expect(authStore.error).toBeTruthy()
      expect(authStore.loading).toBe('error')

      authStore.clearError()

      expect(authStore.error).toBeNull()
      expect(authStore.loading).toBe('idle')
    })
  })

  describe('Token 管理', () => {
    it('應該正確儲存和讀取 Token', () => {
      const authStore = useAuthStore()
      
      authStore.setTokens('access-token', 'refresh-token', 3600)

      expect(localStorage.getItem('access_token')).toBe('access-token')
      expect(localStorage.getItem('refresh_token')).toBe('refresh-token')
      expect(localStorage.getItem('token_expiry')).toBeTruthy()
    })

    it('應該正確清除 Token', () => {
      const authStore = useAuthStore()
      
      // 先設置 token
      authStore.setTokens('access-token', 'refresh-token', 3600)
      
      // 然後清除
      authStore.clearTokens()

      expect(authStore.accessToken).toBeNull()
      expect(authStore.refreshToken).toBeNull()
      expect(localStorage.getItem('access_token')).toBeNull()
      expect(localStorage.getItem('refresh_token')).toBeNull()
      expect(localStorage.getItem('token_expiry')).toBeNull()
    })
  })
})
