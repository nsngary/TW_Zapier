/**
 * 共用基礎類型定義
 */

// ===== 基礎類型 =====

/**
 * 分頁參數
 */
export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

/**
 * 分頁結果
 */
export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

/**
 * 排序參數
 */
export interface SortParams {
  field: string
  order: 'asc' | 'desc'
}

/**
 * 篩選參數
 */
export interface FilterParams {
  [key: string]: any
}

// ===== 錯誤處理 =====

/**
 * 錯誤嚴重程度
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * 錯誤類別
 */
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  NETWORK = 'network',
  API = 'api',
  BUSINESS_LOGIC = 'business_logic',
  SYSTEM = 'system'
}

/**
 * 標準化錯誤
 */
export interface StandardError {
  code: string
  message: string
  category: ErrorCategory
  severity: ErrorSeverity
  details?: Record<string, any>
  suggestion?: string
  timestamp?: string
}

// ===== 狀態管理 =====

/**
 * 載入狀態
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

/**
 * 非同步狀態
 */
export interface AsyncState<T = any> {
  data: T | null
  loading: boolean
  error: StandardError | null
  lastUpdated?: string
}

// ===== 表單相關 =====

/**
 * 表單驗證規則
 */
export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any) => boolean | string
  message?: string
}

/**
 * 表單欄位
 */
export interface FormField {
  name: string
  label: string
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio'
  value?: any
  placeholder?: string
  options?: Array<{ label: string; value: any }>
  rules?: ValidationRule[]
  disabled?: boolean
  readonly?: boolean
}

/**
 * 表單狀態
 */
export interface FormState {
  values: Record<string, any>
  errors: Record<string, string>
  touched: Record<string, boolean>
  submitting: boolean
  valid: boolean
}

// ===== 選項類型 =====

/**
 * 選項項目
 */
export interface Option<T = any> {
  label: string
  value: T
  disabled?: boolean
  icon?: string
  description?: string
}

/**
 * 選項群組
 */
export interface OptionGroup<T = any> {
  label: string
  options: Option<T>[]
}

// ===== 時間相關 =====

/**
 * 時間範圍
 */
export interface TimeRange {
  start: string | Date
  end: string | Date
}

/**
 * 日期格式
 */
export enum DateFormat {
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYY_MM_DD_HH_MM = 'YYYY-MM-DD HH:mm',
  YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',
  MM_DD_YYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD/MM/YYYY'
}

// ===== 檔案相關 =====

/**
 * 檔案資訊
 */
export interface FileInfo {
  name: string
  size: number
  type: string
  lastModified: number
  url?: string
}

/**
 * 上傳狀態
 */
export enum UploadStatus {
  PENDING = 'pending',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * 上傳檔案
 */
export interface UploadFile extends FileInfo {
  id: string
  status: UploadStatus
  progress: number
  error?: string
}

// ===== 主題相關 =====

/**
 * 主題模式
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

/**
 * 主題配置
 */
export interface ThemeConfig {
  mode: ThemeMode
  primaryColor: string
  fontSize: 'small' | 'medium' | 'large'
  borderRadius: 'none' | 'small' | 'medium' | 'large'
}

// ===== 語言相關 =====

/**
 * 支援的語言
 */
export enum SupportedLocale {
  ZH_TW = 'zh-TW',
  ZH_CN = 'zh-CN',
  EN_US = 'en-US',
  JA_JP = 'ja-JP'
}

/**
 * 語言配置
 */
export interface LocaleConfig {
  locale: SupportedLocale
  fallback: SupportedLocale
  messages: Record<string, any>
}

// ===== 工具類型 =====

/**
 * 深度部分類型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * 必需屬性類型
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

/**
 * 可選屬性類型
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * 鍵值對類型
 */
export type KeyValuePair<T = any> = {
  key: string
  value: T
}

/**
 * 字典類型
 */
export type Dictionary<T = any> = Record<string, T>
