/**
 * API 相關類型定義
 */

import type { PaginatedResult, StandardError } from './common'

// ===== HTTP 相關 =====

/**
 * HTTP 方法
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'

/**
 * HTTP 狀態碼
 */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}

// ===== 請求/回應類型 =====

/**
 * API 請求配置
 */
export interface ApiRequestConfig {
  method?: HttpMethod
  url: string
  params?: Record<string, any>
  data?: any
  headers?: Record<string, string>
  timeout?: number
  withCredentials?: boolean
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer'
}

/**
 * API 回應
 */
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: ApiRequestConfig
}

/**
 * 標準 API 回應格式
 */
export interface StandardApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: StandardError
  timestamp: string
  requestId?: string
}

/**
 * 分頁 API 回應
 */
export interface PaginatedApiResponse<T = any> extends StandardApiResponse<PaginatedResult<T>> {}

// ===== 錯誤處理 =====

/**
 * API 錯誤
 */
export interface ApiError extends StandardError {
  status?: number
  statusText?: string
  url?: string
  method?: HttpMethod
  requestId?: string
}

/**
 * 網路錯誤
 */
export interface NetworkError extends ApiError {
  timeout?: boolean
  offline?: boolean
}

// ===== 認證相關 =====

/**
 * 認證 Token
 */
export interface AuthToken {
  accessToken: string
  refreshToken?: string
  tokenType: string
  expiresIn: number
  scope?: string[]
  issuedAt: number
}

/**
 * 登入請求
 */
export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

/**
 * 註冊請求
 */
export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
}

/**
 * 登入回應
 */
export interface LoginResponse {
  user: {
    id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    emailVerified: boolean
    createdAt: string
    updatedAt: string
  }
  token: AuthToken
}

/**
 * 註冊回應
 */
export interface RegisterResponse {
  user: {
    id: string
    name: string
    email: string
    phone?: string
    emailVerified: boolean
    createdAt: string
  }
  message: string
}

/**
 * 密碼重設請求
 */
export interface PasswordResetRequest {
  email: string
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
 * 認證標頭
 */
export interface AuthHeaders {
  Authorization?: string
  'X-API-Key'?: string
  'X-Client-ID'?: string
  'X-Timestamp'?: string
  'X-Signature'?: string
}

// ===== 上傳相關 =====

/**
 * 檔案上傳進度
 */
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

/**
 * 檔案上傳回應
 */
export interface UploadResponse {
  fileId: string
  fileName: string
  fileSize: number
  fileType: string
  url: string
  thumbnailUrl?: string
}

// ===== 批次操作 =====

/**
 * 批次請求項目
 */
export interface BatchRequestItem {
  id: string
  method: HttpMethod
  url: string
  data?: any
  headers?: Record<string, string>
}

/**
 * 批次回應項目
 */
export interface BatchResponseItem {
  id: string
  status: number
  data?: any
  error?: ApiError
}

/**
 * 批次操作回應
 */
export interface BatchResponse {
  results: BatchResponseItem[]
  summary: {
    total: number
    success: number
    failed: number
  }
}

// ===== WebSocket 相關 =====

/**
 * WebSocket 訊息類型
 */
export enum WebSocketMessageType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  DATA = 'data',
  ERROR = 'error',
  PING = 'ping',
  PONG = 'pong'
}

/**
 * WebSocket 訊息
 */
export interface WebSocketMessage<T = any> {
  type: WebSocketMessageType
  id?: string
  channel?: string
  data?: T
  timestamp: number
}

/**
 * WebSocket 連線狀態
 */
export enum WebSocketState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTING = 'disconnecting',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}

// ===== 快取相關 =====

/**
 * 快取策略
 */
export enum CacheStrategy {
  NO_CACHE = 'no-cache',
  CACHE_FIRST = 'cache-first',
  NETWORK_FIRST = 'network-first',
  CACHE_ONLY = 'cache-only',
  NETWORK_ONLY = 'network-only'
}

/**
 * 快取配置
 */
export interface CacheConfig {
  strategy: CacheStrategy
  ttl?: number // 存活時間（秒）
  key?: string // 自定義快取鍵
  tags?: string[] // 快取標籤
}

/**
 * 快取項目
 */
export interface CacheItem<T = any> {
  key: string
  data: T
  timestamp: number
  ttl: number
  tags: string[]
}

// ===== 重試機制 =====

/**
 * 重試配置
 */
export interface RetryConfig {
  enabled: boolean
  maxAttempts: number
  delay: number // 延遲時間（毫秒）
  backoff: 'linear' | 'exponential' // 退避策略
  retryCondition?: (error: ApiError) => boolean
}

// ===== 請求攔截器 =====

/**
 * 請求攔截器
 */
export type RequestInterceptor = (config: ApiRequestConfig) => ApiRequestConfig | Promise<ApiRequestConfig>

/**
 * 回應攔截器
 */
export type ResponseInterceptor<T = any> = (response: ApiResponse<T>) => ApiResponse<T> | Promise<ApiResponse<T>>

/**
 * 錯誤攔截器
 */
export type ErrorInterceptor = (error: ApiError) => Promise<ApiError | never>

// ===== API 客戶端配置 =====

/**
 * API 客戶端配置
 */
export interface ApiClientConfig {
  baseURL: string
  timeout: number
  headers: Record<string, string>
  withCredentials: boolean
  cache: CacheConfig
  retry: RetryConfig
  requestInterceptors: RequestInterceptor[]
  responseInterceptors: ResponseInterceptor[]
  errorInterceptors: ErrorInterceptor[]
}
