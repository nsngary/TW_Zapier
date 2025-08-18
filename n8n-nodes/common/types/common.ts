/**
 * 共用類型定義
 */

import { INodeExecutionData, INodeParameters } from 'n8n-workflow';

// ===== 基礎類型 =====

/**
 * 台灣在地服務節點配置
 */
export interface TaiwanNodeConfig {
  /** 節點名稱 */
  name: string;
  /** 顯示名稱 */
  displayName: string;
  /** 節點描述 */
  description: string;
  /** 節點版本 */
  version: number;
  /** 節點分類 */
  category: 'payment' | 'government' | 'ecommerce' | 'notification' | 'data' | 'other';
  /** 服務提供商 */
  provider: string;
  /** 是否為測試環境 */
  isSandbox?: boolean;
  /** 節點圖示 */
  icon?: string;
  /** 節點顏色 */
  color?: string;
}

/**
 * 執行上下文資訊
 */
export interface ExecutionContext {
  /** 執行 ID */
  executionId: string;
  /** 工作流 ID */
  workflowId: string;
  /** 節點名稱 */
  nodeName: string;
  /** 執行時間 */
  executionTime: Date;
  /** 使用者 ID */
  userId?: string;
}

/**
 * 節點執行結果
 */
export interface NodeExecutionResult {
  /** 是否成功 */
  success: boolean;
  /** 結果資料 */
  data?: any;
  /** 錯誤訊息 */
  error?: string;
  /** 執行時間（毫秒） */
  duration?: number;
  /** 額外資訊 */
  metadata?: Record<string, any>;
}

/**
 * 分頁參數
 */
export interface PaginationParams {
  /** 頁碼（從 1 開始） */
  page?: number;
  /** 每頁筆數 */
  limit?: number;
  /** 偏移量 */
  offset?: number;
}

/**
 * 分頁結果
 */
export interface PaginatedResult<T> {
  /** 資料列表 */
  data: T[];
  /** 總筆數 */
  total: number;
  /** 當前頁碼 */
  page: number;
  /** 每頁筆數 */
  limit: number;
  /** 總頁數 */
  totalPages: number;
  /** 是否有下一頁 */
  hasNext: boolean;
  /** 是否有上一頁 */
  hasPrev: boolean;
}

// ===== 錯誤類型 =====

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
  CONFIGURATION = 'configuration',
  BUSINESS_LOGIC = 'business_logic',
  SYSTEM = 'system'
}

/**
 * 標準化錯誤資訊
 */
export interface StandardError {
  /** 錯誤代碼 */
  code: string;
  /** 錯誤訊息 */
  message: string;
  /** 錯誤類別 */
  category: ErrorCategory;
  /** 嚴重程度 */
  severity: ErrorSeverity;
  /** 詳細資訊 */
  details?: Record<string, any>;
  /** 建議解決方案 */
  suggestion?: string;
  /** 相關文件連結 */
  documentationUrl?: string;
}

// ===== 日誌類型 =====

/**
 * 日誌等級
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * 日誌項目
 */
export interface LogEntry {
  /** 時間戳 */
  timestamp: Date;
  /** 日誌等級 */
  level: LogLevel;
  /** 訊息 */
  message: string;
  /** 執行上下文 */
  context?: ExecutionContext;
  /** 額外資料 */
  data?: Record<string, any>;
  /** 錯誤資訊 */
  error?: Error;
}

// ===== 配置類型 =====

/**
 * 環境類型
 */
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production'
}

/**
 * 節點配置
 */
export interface NodeConfiguration {
  /** 環境 */
  environment: Environment;
  /** API 基礎 URL */
  baseUrl: string;
  /** 超時時間（毫秒） */
  timeout: number;
  /** 重試次數 */
  retryCount: number;
  /** 重試延遲（毫秒） */
  retryDelay: number;
  /** 是否啟用日誌 */
  enableLogging: boolean;
  /** 日誌等級 */
  logLevel: LogLevel;
  /** 自定義標頭 */
  customHeaders?: Record<string, string>;
}

// ===== 驗證類型 =====

/**
 * 驗證規則
 */
export interface ValidationRule {
  /** 規則名稱 */
  name: string;
  /** 驗證函數 */
  validator: (value: any) => boolean;
  /** 錯誤訊息 */
  message: string;
}

/**
 * 驗證結果
 */
export interface ValidationResult {
  /** 是否通過驗證 */
  isValid: boolean;
  /** 錯誤訊息列表 */
  errors: string[];
  /** 警告訊息列表 */
  warnings?: string[];
}

// ===== 快取類型 =====

/**
 * 快取配置
 */
export interface CacheConfig {
  /** 是否啟用快取 */
  enabled: boolean;
  /** 快取時間（秒） */
  ttl: number;
  /** 快取鍵前綴 */
  keyPrefix: string;
  /** 最大快取項目數 */
  maxItems?: number;
}

/**
 * 快取項目
 */
export interface CacheItem<T> {
  /** 快取鍵 */
  key: string;
  /** 快取值 */
  value: T;
  /** 過期時間 */
  expiresAt: Date;
  /** 建立時間 */
  createdAt: Date;
}

// ===== 監控類型 =====

/**
 * 效能指標
 */
export interface PerformanceMetrics {
  /** 執行時間（毫秒） */
  executionTime: number;
  /** 記憶體使用量（MB） */
  memoryUsage: number;
  /** CPU 使用率（%） */
  cpuUsage: number;
  /** 網路請求數 */
  networkRequests: number;
  /** 快取命中率（%） */
  cacheHitRate?: number;
}

/**
 * 健康檢查結果
 */
export interface HealthCheckResult {
  /** 是否健康 */
  healthy: boolean;
  /** 檢查時間 */
  timestamp: Date;
  /** 回應時間（毫秒） */
  responseTime: number;
  /** 詳細資訊 */
  details?: Record<string, any>;
  /** 錯誤訊息 */
  error?: string;
}

// ===== 工具類型 =====

/**
 * 深度部分類型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 必需屬性類型
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 可選屬性類型
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
