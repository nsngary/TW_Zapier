/**
 * 使用者相關 API
 */

import { get, post, put, patch, del, upload } from './index'
import type { 
  User, 
  UserQueryParams,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  UserStats,
  PaginatedResult
} from '@/types'

/**
 * 使用者 API 類別
 */
export class UserApi {
  /**
   * 取得當前使用者資訊
   */
  async getCurrentUser(): Promise<User> {
    return get<User>('/user/me')
  }

  /**
   * 更新使用者個人資料
   */
  async updateProfile(data: Partial<UpdateUserRequest>): Promise<User> {
    return patch<User>('/user/me', data)
  }

  /**
   * 更新使用者偏好設定
   */
  async updatePreferences(preferences: any): Promise<User> {
    return patch<User>('/user/me/preferences', { preferences })
  }

  /**
   * 變更密碼
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    return post<void>('/user/me/password', data)
  }

  /**
   * 上傳頭像
   */
  async uploadAvatar(file: File): Promise<string> {
    const result = await upload<{ url: string }>('/user/me/avatar', file)
    return result.url
  }

  /**
   * 取得使用者統計資料
   */
  async getUserStats(): Promise<UserStats> {
    return get<UserStats>('/user/me/stats')
  }

  /**
   * 取得使用者列表（管理員功能）
   */
  async getUsers(params?: UserQueryParams): Promise<PaginatedResult<User>> {
    return get<PaginatedResult<User>>('/users', { params })
  }

  /**
   * 取得特定使用者資訊（管理員功能）
   */
  async getUser(userId: string): Promise<User> {
    return get<User>(`/users/${userId}`)
  }

  /**
   * 建立使用者（管理員功能）
   */
  async createUser(data: CreateUserRequest): Promise<User> {
    return post<User>('/users', data)
  }

  /**
   * 更新使用者（管理員功能）
   */
  async updateUser(userId: string, data: UpdateUserRequest): Promise<User> {
    return put<User>(`/users/${userId}`, data)
  }

  /**
   * 刪除使用者（管理員功能）
   */
  async deleteUser(userId: string): Promise<void> {
    return del<void>(`/users/${userId}`)
  }

  /**
   * 啟用/停用使用者（管理員功能）
   */
  async toggleUserStatus(userId: string, active: boolean): Promise<User> {
    return patch<User>(`/users/${userId}/status`, { active })
  }

  /**
   * 重設使用者密碼（管理員功能）
   */
  async resetUserPassword(userId: string): Promise<{ temporaryPassword: string }> {
    return post<{ temporaryPassword: string }>(`/users/${userId}/reset-password`)
  }
}

// 建立實例
export const userApi = new UserApi()
