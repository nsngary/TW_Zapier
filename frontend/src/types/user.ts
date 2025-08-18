/**
 * 使用者相關類型定義
 */

// ===== 使用者基礎類型 =====

/**
 * 使用者角色
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer'
}

/**
 * 使用者狀態
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

/**
 * 使用者資訊
 */
export interface User {
  id: string
  username: string
  email: string
  displayName: string
  avatar?: string
  role: UserRole
  status: UserStatus
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  emailVerified: boolean
  phoneNumber?: string
  phoneVerified: boolean
  preferences: UserPreferences
  profile: UserProfile
}

/**
 * 使用者偏好設定
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'zh-TW' | 'zh-CN' | 'en-US'
  timezone: string
  dateFormat: string
  notifications: NotificationPreferences
  dashboard: DashboardPreferences
}

/**
 * 通知偏好設定
 */
export interface NotificationPreferences {
  email: {
    workflowSuccess: boolean
    workflowFailure: boolean
    systemUpdates: boolean
    securityAlerts: boolean
  }
  push: {
    workflowSuccess: boolean
    workflowFailure: boolean
    systemUpdates: boolean
  }
  inApp: {
    workflowSuccess: boolean
    workflowFailure: boolean
    systemUpdates: boolean
  }
}

/**
 * 儀表板偏好設定
 */
export interface DashboardPreferences {
  layout: 'grid' | 'list'
  itemsPerPage: number
  defaultView: 'workflows' | 'executions' | 'analytics'
  widgets: string[]
}

/**
 * 使用者個人資料
 */
export interface UserProfile {
  firstName?: string
  lastName?: string
  company?: string
  jobTitle?: string
  bio?: string
  website?: string
  location?: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

// ===== 認證相關 =====

/**
 * 登入請求
 */
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

/**
 * 登入回應
 */
export interface LoginResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

/**
 * 註冊請求
 */
export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
  displayName: string
  acceptTerms: boolean
  captcha?: string
}

/**
 * 註冊回應
 */
export interface RegisterResponse {
  user: Omit<User, 'preferences' | 'profile'>
  message: string
  requiresEmailVerification: boolean
}

/**
 * 密碼重設請求
 */
export interface PasswordResetRequest {
  email: string
  captcha?: string
}

/**
 * 密碼重設確認請求
 */
export interface PasswordResetConfirmRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

/**
 * 變更密碼請求
 */
export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// ===== 使用者管理 =====

/**
 * 使用者查詢參數
 */
export interface UserQueryParams {
  search?: string
  role?: UserRole
  status?: UserStatus
  createdAfter?: string
  createdBefore?: string
  lastLoginAfter?: string
  lastLoginBefore?: string
  sortBy?: 'createdAt' | 'lastLoginAt' | 'username' | 'email'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/**
 * 使用者建立請求
 */
export interface CreateUserRequest {
  username: string
  email: string
  password: string
  displayName: string
  role: UserRole
  sendWelcomeEmail?: boolean
}

/**
 * 使用者更新請求
 */
export interface UpdateUserRequest {
  displayName?: string
  email?: string
  role?: UserRole
  status?: UserStatus
  phoneNumber?: string
  preferences?: Partial<UserPreferences>
  profile?: Partial<UserProfile>
}

// ===== 權限相關 =====

/**
 * 權限
 */
export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

/**
 * 角色權限
 */
export interface RolePermissions {
  role: UserRole
  permissions: Permission[]
}

/**
 * 使用者權限檢查
 */
export interface PermissionCheck {
  resource: string
  action: string
  allowed: boolean
  reason?: string
}

// ===== 會話管理 =====

/**
 * 使用者會話
 */
export interface UserSession {
  id: string
  userId: string
  deviceInfo: DeviceInfo
  ipAddress: string
  userAgent: string
  createdAt: string
  lastActiveAt: string
  expiresAt: string
  isActive: boolean
}

/**
 * 裝置資訊
 */
export interface DeviceInfo {
  type: 'desktop' | 'mobile' | 'tablet'
  os: string
  browser: string
  location?: {
    country: string
    city: string
  }
}

// ===== 使用者活動 =====

/**
 * 活動類型
 */
export enum ActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',
  PROFILE_UPDATE = 'profile_update',
  WORKFLOW_CREATE = 'workflow_create',
  WORKFLOW_UPDATE = 'workflow_update',
  WORKFLOW_DELETE = 'workflow_delete',
  WORKFLOW_EXECUTE = 'workflow_execute'
}

/**
 * 使用者活動
 */
export interface UserActivity {
  id: string
  userId: string
  type: ActivityType
  description: string
  metadata: Record<string, any>
  ipAddress: string
  userAgent: string
  createdAt: string
}

// ===== 使用者統計 =====

/**
 * 使用者統計
 */
export interface UserStats {
  totalWorkflows: number
  totalExecutions: number
  successfulExecutions: number
  failedExecutions: number
  averageExecutionTime: number
  lastActivityAt: string
  accountAge: number // 天數
  storageUsed: number // 位元組
  storageLimit: number // 位元組
}

// ===== 團隊相關 =====

/**
 * 團隊
 */
export interface Team {
  id: string
  name: string
  description?: string
  ownerId: string
  members: TeamMember[]
  createdAt: string
  updatedAt: string
}

/**
 * 團隊成員
 */
export interface TeamMember {
  userId: string
  user: Pick<User, 'id' | 'username' | 'displayName' | 'email' | 'avatar'>
  role: 'owner' | 'admin' | 'member'
  joinedAt: string
}

/**
 * 團隊邀請
 */
export interface TeamInvitation {
  id: string
  teamId: string
  email: string
  role: 'admin' | 'member'
  invitedBy: string
  createdAt: string
  expiresAt: string
  status: 'pending' | 'accepted' | 'declined' | 'expired'
}
