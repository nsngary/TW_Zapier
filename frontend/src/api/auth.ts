/**
 * 認證相關 API
 */

import { post } from './index'
import type { 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  RegisterResponse,
  PasswordResetRequest,
  PasswordResetConfirmRequest
} from '@/types'

/**
 * 認證 API 類別
 */
export class AuthApi {
  /**
   * 使用者登入
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return post<LoginResponse>('/auth/login', credentials)
  }

  /**
   * 使用者註冊
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return post<RegisterResponse>('/auth/register', userData)
  }

  /**
   * 使用者登出
   */
  async logout(refreshToken: string): Promise<void> {
    return post<void>('/auth/logout', { refreshToken })
  }

  /**
   * 重新整理 Token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    return post<{ accessToken: string; refreshToken: string; expiresIn: number }>('/auth/refresh', { refreshToken })
  }

  /**
   * 忘記密碼
   */
  async forgotPassword(email: string): Promise<void> {
    return post<void>('/auth/forgot-password', { email })
  }

  /**
   * 重設密碼
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    return post<void>('/auth/reset-password', { 
      token, 
      newPassword,
      confirmPassword: newPassword
    })
  }

  /**
   * 驗證郵件
   */
  async verifyEmail(token: string): Promise<void> {
    return post<void>('/auth/verify-email', { token })
  }

  /**
   * 重新發送驗證郵件
   */
  async resendVerificationEmail(email: string): Promise<void> {
    return post<void>('/auth/resend-verification', { email })
  }

  /**
   * 檢查 Token 有效性
   */
  async validateToken(token: string): Promise<{ valid: boolean; user?: any }> {
    return post<{ valid: boolean; user?: any }>('/auth/validate-token', { token })
  }
}

// 建立實例
export const authApi = new AuthApi()
