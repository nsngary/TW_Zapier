/**
 * 認證相關類型定義
 */

// ===== 基礎認證類型 =====

/**
 * 認證類型
 */
export enum AuthType {
  API_KEY = 'api_key',
  HMAC = 'hmac',
  OAUTH2 = 'oauth2',
  BASIC = 'basic',
  BEARER = 'bearer',
  CUSTOM = 'custom'
}

/**
 * 認證狀態
 */
export enum AuthStatus {
  VALID = 'valid',
  INVALID = 'invalid',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
  PENDING = 'pending'
}

/**
 * 基礎認證配置
 */
export interface BaseAuthConfig {
  /** 認證類型 */
  type: AuthType;
  /** 是否為測試環境 */
  sandbox?: boolean;
  /** 認證有效期（秒） */
  expiresIn?: number;
  /** 自動重新整理 */
  autoRefresh?: boolean;
}

// ===== API Key 認證 =====

/**
 * API Key 認證配置
 */
export interface ApiKeyAuthConfig extends BaseAuthConfig {
  type: AuthType.API_KEY;
  /** API 金鑰 */
  apiKey: string;
  /** 金鑰參數名稱 */
  keyName?: string;
  /** 金鑰位置 */
  location: 'header' | 'query' | 'body';
  /** 前綴 */
  prefix?: string;
}

// ===== HMAC 認證 =====

/**
 * HMAC 演算法
 */
export enum HmacAlgorithm {
  SHA1 = 'sha1',
  SHA256 = 'sha256',
  SHA512 = 'sha512',
  MD5 = 'md5'
}

/**
 * HMAC 認證配置
 */
export interface HmacAuthConfig extends BaseAuthConfig {
  type: AuthType.HMAC;
  /** 金鑰 */
  key: string;
  /** 密鑰 */
  secret: string;
  /** 演算法 */
  algorithm: HmacAlgorithm;
  /** 簽名標頭名稱 */
  signatureHeader?: string;
  /** 時間戳標頭名稱 */
  timestampHeader?: string;
  /** Nonce 標頭名稱 */
  nonceHeader?: string;
  /** 簽名有效期（秒） */
  signatureValidityPeriod?: number;
}

// ===== OAuth2 認證 =====

/**
 * OAuth2 授權類型
 */
export enum OAuth2GrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  CLIENT_CREDENTIALS = 'client_credentials',
  REFRESH_TOKEN = 'refresh_token',
  PASSWORD = 'password'
}

/**
 * OAuth2 認證配置
 */
export interface OAuth2AuthConfig extends BaseAuthConfig {
  type: AuthType.OAUTH2;
  /** 客戶端 ID */
  clientId: string;
  /** 客戶端密鑰 */
  clientSecret: string;
  /** 授權 URL */
  authUrl: string;
  /** Token URL */
  tokenUrl: string;
  /** 重新導向 URI */
  redirectUri?: string;
  /** 授權範圍 */
  scope?: string[];
  /** 授權類型 */
  grantType: OAuth2GrantType;
  /** 狀態參數 */
  state?: string;
}

/**
 * OAuth2 Token 資訊
 */
export interface OAuth2Token {
  /** 存取 Token */
  accessToken: string;
  /** 重新整理 Token */
  refreshToken?: string;
  /** Token 類型 */
  tokenType: string;
  /** 有效期（秒） */
  expiresIn: number;
  /** 授權範圍 */
  scope?: string[];
  /** 取得時間 */
  obtainedAt: Date;
}

// ===== Basic 認證 =====

/**
 * Basic 認證配置
 */
export interface BasicAuthConfig extends BaseAuthConfig {
  type: AuthType.BASIC;
  /** 使用者名稱 */
  username: string;
  /** 密碼 */
  password: string;
}

// ===== Bearer Token 認證 =====

/**
 * Bearer Token 認證配置
 */
export interface BearerAuthConfig extends BaseAuthConfig {
  type: AuthType.BEARER;
  /** Token */
  token: string;
}

// ===== 自定義認證 =====

/**
 * 自定義認證配置
 */
export interface CustomAuthConfig extends BaseAuthConfig {
  type: AuthType.CUSTOM;
  /** 自定義標頭 */
  headers?: Record<string, string>;
  /** 自定義查詢參數 */
  queryParams?: Record<string, string>;
  /** 自定義請求體 */
  body?: Record<string, any>;
  /** 認證處理函數 */
  handler?: (config: CustomAuthConfig) => Promise<Record<string, string>>;
}

// ===== 聯合認證類型 =====

/**
 * 認證配置聯合類型
 */
export type AuthConfig = 
  | ApiKeyAuthConfig
  | HmacAuthConfig
  | OAuth2AuthConfig
  | BasicAuthConfig
  | BearerAuthConfig
  | CustomAuthConfig;

// ===== 認證結果 =====

/**
 * 認證結果
 */
export interface AuthResult {
  /** 是否成功 */
  success: boolean;
  /** 認證狀態 */
  status: AuthStatus;
  /** 認證標頭 */
  headers?: Record<string, string>;
  /** 查詢參數 */
  queryParams?: Record<string, string>;
  /** 請求體 */
  body?: Record<string, any>;
  /** 錯誤訊息 */
  error?: string;
  /** 過期時間 */
  expiresAt?: Date;
}

// ===== 認證管理 =====

/**
 * 認證提供者介面
 */
export interface AuthProvider {
  /** 認證類型 */
  readonly type: AuthType;
  
  /** 驗證認證配置 */
  validate(config: AuthConfig): Promise<boolean>;
  
  /** 執行認證 */
  authenticate(config: AuthConfig): Promise<AuthResult>;
  
  /** 重新整理認證 */
  refresh?(config: AuthConfig): Promise<AuthResult>;
  
  /** 撤銷認證 */
  revoke?(config: AuthConfig): Promise<boolean>;
}

/**
 * 認證快取項目
 */
export interface AuthCacheItem {
  /** 快取鍵 */
  key: string;
  /** 認證結果 */
  result: AuthResult;
  /** 建立時間 */
  createdAt: Date;
  /** 過期時間 */
  expiresAt: Date;
}

/**
 * 認證事件類型
 */
export enum AuthEventType {
  AUTHENTICATED = 'authenticated',
  AUTHENTICATION_FAILED = 'authentication_failed',
  TOKEN_REFRESHED = 'token_refreshed',
  TOKEN_EXPIRED = 'token_expired',
  TOKEN_REVOKED = 'token_revoked'
}

/**
 * 認證事件
 */
export interface AuthEvent {
  /** 事件類型 */
  type: AuthEventType;
  /** 認證類型 */
  authType: AuthType;
  /** 時間戳 */
  timestamp: Date;
  /** 事件資料 */
  data?: Record<string, any>;
  /** 錯誤資訊 */
  error?: string;
}

// ===== 台灣特有認證類型 =====

/**
 * Line Pay 認證配置
 */
export interface LinePayAuthConfig extends HmacAuthConfig {
  /** Channel ID */
  channelId: string;
  /** Channel Secret */
  channelSecret: string;
  /** 是否為沙盒環境 */
  sandbox: boolean;
}

/**
 * ECPay 認證配置
 */
export interface ECPayAuthConfig extends HmacAuthConfig {
  /** 商店代號 */
  merchantId: string;
  /** HashKey */
  hashKey: string;
  /** HashIV */
  hashIV: string;
  /** 是否為測試環境 */
  testMode: boolean;
}

/**
 * 政府開放資料認證配置
 */
export interface GovDataAuthConfig extends ApiKeyAuthConfig {
  /** 機關代碼 */
  agencyCode: string;
  /** API 金鑰 */
  apiKey: string;
  /** 資料集權限 */
  permissions?: string[];
}

/**
 * 台灣銀行 API 認證配置
 */
export interface TaiwanBankAuthConfig extends BaseAuthConfig {
  /** 銀行代碼 */
  bankCode: string;
  /** 客戶代號 */
  customerId: string;
  /** 憑證路徑 */
  certificatePath?: string;
  /** 私鑰路徑 */
  privateKeyPath?: string;
  /** 憑證密碼 */
  certificatePassword?: string;
}

/**
 * 台灣特有認證配置聯合類型
 */
export type TaiwanAuthConfig = 
  | LinePayAuthConfig
  | ECPayAuthConfig
  | GovDataAuthConfig
  | TaiwanBankAuthConfig;
