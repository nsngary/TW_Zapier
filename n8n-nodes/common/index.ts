/**
 * 台灣在地服務節點 SDK 主要匯出
 */

// ===== 核心類別 =====
export { BaseNode } from './core/BaseNode';

// ===== 類型定義 =====
export * from './types/common';
export * from './types/taiwan';
export * from './types/auth';

// ===== HTTP 客戶端 =====
export { TaiwanApiClient } from './http/TaiwanApiClient';
export type { RequestConfig, ApiResponse, TaiwanApiClientConfig } from './http/TaiwanApiClient';

// ===== 認證管理 =====
export { AuthManager } from './auth/AuthManager';

// ===== 驗證器 =====
export { TaiwanValidator } from './validators/TaiwanValidator';

// ===== 工具函數 =====
export { TaiwanUtils } from './utils/taiwan';
export { TaiwanLogger } from './utils/logger';
export type { LoggerConfig, LogOutput } from './utils/logger';

// ===== 常用常數 =====
export const SDK_VERSION = '1.0.0';
export const SDK_NAME = 'Taiwan n8n Node SDK';

/**
 * SDK 資訊
 */
export const SDK_INFO = {
  name: SDK_NAME,
  version: SDK_VERSION,
  description: '專為台灣在地服務設計的 n8n 節點開發 SDK',
  author: 'Taiwan Zapier Team',
  license: 'MIT',
  repository: 'https://github.com/taiwan-zapier/n8n-nodes-taiwan',
  documentation: 'https://docs.taiwan-zapier.com/sdk'
};

/**
 * 支援的台灣服務類型
 */
export const SUPPORTED_TAIWAN_SERVICES = {
  PAYMENT: {
    LINE_PAY: 'Line Pay',
    ECPAY: '綠界科技',
    NEWEBPAY: '藍新金流',
    SPGATEWAY: '智付通'
  },
  GOVERNMENT: {
    GOV_OPEN_DATA: '政府開放資料平台',
    TAOYUAN_AIRPORT: '桃園機場',
    CENTRAL_WEATHER_BUREAU: '中央氣象局',
    NATIONAL_HEALTH_INSURANCE: '健保署'
  },
  ECOMMERCE: {
    SHOPEE: '蝦皮購物',
    MOMO: 'momo購物網',
    PCHOME: 'PChome線上購物',
    YAHOO_SHOPPING: 'Yahoo購物中心'
  },
  LOGISTICS: {
    CHUNGHWA_POST: '中華郵政',
    BLACK_CAT: '黑貓宅急便',
    HSINCHU_LOGISTICS: '新竹物流',
    KERRY_TJ: '嘉里大榮'
  }
};

/**
 * 預設配置
 */
export const DEFAULT_CONFIG = {
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  LOG_LEVEL: 'info',
  TAIWAN_TIMEZONE: 'Asia/Taipei',
  DEFAULT_CURRENCY: 'TWD',
  DEFAULT_LOCALE: 'zh-TW'
};

/**
 * 錯誤代碼
 */
export const ERROR_CODES = {
  // 認證錯誤
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // 驗證錯誤
  VALIDATION_REQUIRED_FIELD: 'VALIDATION_REQUIRED_FIELD',
  VALIDATION_INVALID_FORMAT: 'VALIDATION_INVALID_FORMAT',
  VALIDATION_OUT_OF_RANGE: 'VALIDATION_OUT_OF_RANGE',
  
  // 網路錯誤
  NETWORK_CONNECTION_FAILED: 'NETWORK_CONNECTION_FAILED',
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_DNS_ERROR: 'NETWORK_DNS_ERROR',
  
  // API 錯誤
  API_RATE_LIMIT_EXCEEDED: 'API_RATE_LIMIT_EXCEEDED',
  API_SERVICE_UNAVAILABLE: 'API_SERVICE_UNAVAILABLE',
  API_INVALID_RESPONSE: 'API_INVALID_RESPONSE',
  
  // 業務邏輯錯誤
  BUSINESS_INSUFFICIENT_BALANCE: 'BUSINESS_INSUFFICIENT_BALANCE',
  BUSINESS_ORDER_NOT_FOUND: 'BUSINESS_ORDER_NOT_FOUND',
  BUSINESS_PAYMENT_FAILED: 'BUSINESS_PAYMENT_FAILED',
  
  // 系統錯誤
  SYSTEM_INTERNAL_ERROR: 'SYSTEM_INTERNAL_ERROR',
  SYSTEM_CONFIGURATION_ERROR: 'SYSTEM_CONFIGURATION_ERROR',
  SYSTEM_RESOURCE_EXHAUSTED: 'SYSTEM_RESOURCE_EXHAUSTED'
};

/**
 * 台灣特有常數
 */
export const TAIWAN_CONSTANTS = {
  // 身分證字號字母對應數值
  ID_LETTER_VALUES: {
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17,
    'I': 34, 'J': 18, 'K': 19, 'L': 20, 'M': 21, 'N': 22, 'O': 35, 'P': 23,
    'Q': 24, 'R': 25, 'S': 26, 'T': 27, 'U': 28, 'V': 29, 'W': 32, 'X': 30,
    'Y': 31, 'Z': 33
  },
  
  // 統一編號檢查權重
  BUSINESS_NUMBER_WEIGHTS: [1, 2, 1, 2, 1, 2, 4, 1],
  
  // 台灣銀行營業時間
  BANK_BUSINESS_HOURS: {
    WEEKDAY: { start: '09:00', end: '15:30' },
    SATURDAY: { start: '09:00', end: '12:00' },
    SUNDAY: null
  },
  
  // 台灣假日（需要定期更新）
  NATIONAL_HOLIDAYS: [
    '2024-01-01', // 元旦
    '2024-02-08', // 農曆除夕
    '2024-02-09', // 農曆新年
    '2024-02-10', // 農曆新年
    '2024-02-11', // 農曆新年
    '2024-02-12', // 農曆新年
    '2024-02-13', // 農曆新年
    '2024-02-14', // 農曆新年
    '2024-04-04', // 兒童節
    '2024-04-05', // 清明節
    '2024-05-01', // 勞動節
    '2024-06-10', // 端午節
    '2024-09-17', // 中秋節
    '2024-10-10', // 國慶日
  ],
  
  // 常用正規表達式
  REGEX: {
    ID_NUMBER: /^[A-Z][0-9]{9}$/,
    BUSINESS_NUMBER: /^[0-9]{8}$/,
    MOBILE_NUMBER: /^09[0-9]{8}$/,
    PHONE_NUMBER: /^0[2-9][0-9]{6,8}$/,
    POSTAL_CODE: /^[0-9]{3}([0-9]{2})?$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};

/**
 * 工具函數
 */
export const utils = {
  /**
   * 檢查是否為開發環境
   */
  isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  },
  
  /**
   * 檢查是否為生產環境
   */
  isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  },
  
  /**
   * 取得環境變數
   */
  getEnv(key: string, defaultValue?: string): string | undefined {
    return process.env[key] || defaultValue;
  },
  
  /**
   * 延遲執行
   */
  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  /**
   * 深度複製物件
   */
  deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  },
  
  /**
   * 合併物件
   */
  mergeObjects<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
    return Object.assign({}, target, ...sources);
  },
  
  /**
   * 檢查物件是否為空
   */
  isEmpty(obj: any): boolean {
    if (obj === null || obj === undefined) return true;
    if (typeof obj === 'string' || Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
  },
  
  /**
   * 產生 UUID
   */
  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  
  /**
   * 格式化檔案大小
   */
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
};

/**
 * 版本資訊
 */
export function getSDKVersion(): string {
  return SDK_VERSION;
}

/**
 * 取得支援的服務列表
 */
export function getSupportedServices(): typeof SUPPORTED_TAIWAN_SERVICES {
  return SUPPORTED_TAIWAN_SERVICES;
}

/**
 * 檢查服務是否支援
 */
export function isServiceSupported(category: string, service: string): boolean {
  const services = SUPPORTED_TAIWAN_SERVICES as any;
  return services[category] && services[category][service];
}

/**
 * 初始化 SDK
 */
export function initializeSDK(config?: Partial<typeof DEFAULT_CONFIG>): void {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  // 設定全域配置
  (global as any).__TAIWAN_SDK_CONFIG__ = finalConfig;
  
  console.log(`🇹🇼 ${SDK_NAME} v${SDK_VERSION} 初始化完成`);
  console.log('支援的台灣服務:', Object.keys(SUPPORTED_TAIWAN_SERVICES).join(', '));
}
