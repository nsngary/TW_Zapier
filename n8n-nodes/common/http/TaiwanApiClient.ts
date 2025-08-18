/**
 * 台灣 API 客戶端
 */

import { IHttpRequestMethods, IRequestOptions } from 'n8n-workflow';
import { AuthConfig, AuthResult } from '../types/auth';
import { NodeConfiguration, LogLevel } from '../types/common';
import { AuthManager } from '../auth/AuthManager';
import { TaiwanLogger } from '../utils/logger';

/**
 * HTTP 方法類型
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * 請求配置
 */
export interface RequestConfig {
  /** 請求方法 */
  method: HttpMethod;
  /** 請求路徑 */
  path: string;
  /** 查詢參數 */
  params?: Record<string, any>;
  /** 請求標頭 */
  headers?: Record<string, string>;
  /** 請求體 */
  body?: any;
  /** 超時時間（毫秒） */
  timeout?: number;
  /** 是否重試 */
  retry?: boolean;
  /** 重試次數 */
  retryCount?: number;
  /** 重試延遲（毫秒） */
  retryDelay?: number;
}

/**
 * 回應資料
 */
export interface ApiResponse<T = any> {
  /** 狀態碼 */
  statusCode: number;
  /** 回應標頭 */
  headers: Record<string, string>;
  /** 回應資料 */
  data: T;
  /** 是否成功 */
  success: boolean;
  /** 錯誤訊息 */
  error?: string;
  /** 請求時間（毫秒） */
  duration: number;
}

/**
 * 台灣 API 客戶端配置
 */
export interface TaiwanApiClientConfig extends NodeConfiguration {
  /** 認證配置 */
  auth?: AuthConfig;
  /** 使用者代理 */
  userAgent?: string;
  /** 預設標頭 */
  defaultHeaders?: Record<string, string>;
  /** 請求攔截器 */
  requestInterceptor?: (config: RequestConfig) => Promise<RequestConfig>;
  /** 回應攔截器 */
  responseInterceptor?: <T>(response: ApiResponse<T>) => Promise<ApiResponse<T>>;
}

/**
 * 台灣 API 客戶端類別
 */
export class TaiwanApiClient {
  private config: TaiwanApiClientConfig;
  private authManager: AuthManager;
  private logger: TaiwanLogger;
  private httpRequestHelper: any; // n8n 的 HTTP 請求輔助工具

  constructor(config: TaiwanApiClientConfig, httpRequestHelper?: any) {
    this.config = {
      timeout: 30000,
      retryCount: 3,
      retryDelay: 1000,
      enableLogging: true,
      logLevel: LogLevel.INFO,
      ...config
    };
    
    this.authManager = new AuthManager();
    this.logger = new TaiwanLogger({
      nodeName: 'TaiwanApiClient',
      level: this.config.logLevel
    });
    
    this.httpRequestHelper = httpRequestHelper;
  }

  /**
   * 發送 GET 請求
   */
  async get<T = any>(path: string, params?: Record<string, any>, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      path,
      params,
      ...options
    });
  }

  /**
   * 發送 POST 請求
   */
  async post<T = any>(path: string, body?: any, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      path,
      body,
      ...options
    });
  }

  /**
   * 發送 PUT 請求
   */
  async put<T = any>(path: string, body?: any, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      path,
      body,
      ...options
    });
  }

  /**
   * 發送 PATCH 請求
   */
  async patch<T = any>(path: string, body?: any, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      path,
      body,
      ...options
    });
  }

  /**
   * 發送 DELETE 請求
   */
  async delete<T = any>(path: string, options?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      path,
      ...options
    });
  }

  /**
   * 發送通用請求
   */
  async request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    const startTime = Date.now();
    
    try {
      // 應用請求攔截器
      const processedConfig = await this.applyRequestInterceptor(config);
      
      // 建構完整 URL
      const url = this.buildUrl(processedConfig.path, processedConfig.params);
      
      // 準備請求選項
      const requestOptions = await this.prepareRequestOptions(processedConfig);
      
      this.logger.debug('發送 API 請求', {
        method: processedConfig.method,
        url,
        headers: requestOptions.headers
      });

      // 發送請求
      const response = await this.sendRequest(url, requestOptions);
      
      const duration = Date.now() - startTime;
      
      // 建構回應物件
      const apiResponse: ApiResponse<T> = {
        statusCode: response.statusCode || 200,
        headers: response.headers || {},
        data: response.body,
        success: this.isSuccessStatusCode(response.statusCode || 200),
        duration
      };

      // 應用回應攔截器
      const processedResponse = await this.applyResponseInterceptor(apiResponse);
      
      this.logger.debug('API 請求完成', {
        statusCode: processedResponse.statusCode,
        duration,
        success: processedResponse.success
      });

      return processedResponse;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.logger.error('API 請求失敗', {
        method: config.method,
        path: config.path,
        duration,
        error: error.message
      });

      // 如果啟用重試且符合重試條件
      if (this.shouldRetry(config, error)) {
        return this.retryRequest(config);
      }

      throw this.createApiError(error, config);
    }
  }

  /**
   * 應用請求攔截器
   */
  private async applyRequestInterceptor(config: RequestConfig): Promise<RequestConfig> {
    let processedConfig = { ...config };
    
    // 應用認證
    if (this.config.auth) {
      processedConfig = await this.applyAuthentication(processedConfig);
    }
    
    // 應用自定義攔截器
    if (this.config.requestInterceptor) {
      processedConfig = await this.config.requestInterceptor(processedConfig);
    }
    
    return processedConfig;
  }

  /**
   * 應用回應攔截器
   */
  private async applyResponseInterceptor<T>(response: ApiResponse<T>): Promise<ApiResponse<T>> {
    if (this.config.responseInterceptor) {
      return await this.config.responseInterceptor(response);
    }
    return response;
  }

  /**
   * 應用認證
   */
  private async applyAuthentication(config: RequestConfig): Promise<RequestConfig> {
    if (!this.config.auth) {
      return config;
    }

    try {
      const authResult = await this.authManager.authenticate(this.config.auth);
      
      if (!authResult.success) {
        throw new Error(`認證失敗: ${authResult.error}`);
      }

      // 合併認證標頭
      config.headers = {
        ...config.headers,
        ...authResult.headers
      };

      // 合併認證查詢參數
      if (authResult.queryParams) {
        config.params = {
          ...config.params,
          ...authResult.queryParams
        };
      }

      // 合併認證請求體
      if (authResult.body && config.method !== 'GET') {
        config.body = {
          ...config.body,
          ...authResult.body
        };
      }

      return config;
      
    } catch (error) {
      this.logger.error('認證處理失敗', { error: error.message });
      throw error;
    }
  }

  /**
   * 建構完整 URL
   */
  private buildUrl(path: string, params?: Record<string, any>): string {
    let url = path.startsWith('http') ? path : `${this.config.baseUrl}${path}`;
    
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      url += `?${searchParams.toString()}`;
    }
    
    return url;
  }

  /**
   * 準備請求選項
   */
  private async prepareRequestOptions(config: RequestConfig): Promise<IRequestOptions> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': this.config.userAgent || 'TaiwanApiClient/1.0',
      ...this.config.defaultHeaders,
      ...config.headers
    };

    const options: IRequestOptions = {
      method: config.method as IHttpRequestMethods,
      headers,
      timeout: config.timeout || this.config.timeout,
      json: config.body && config.method !== 'GET'
    };

    return options;
  }

  /**
   * 發送請求
   */
  private async sendRequest(url: string, options: IRequestOptions): Promise<any> {
    if (this.httpRequestHelper) {
      return await this.httpRequestHelper.request({ url, ...options });
    }
    
    // 如果沒有 n8n 的 HTTP 輔助工具，使用 fetch 或其他 HTTP 客戶端
    throw new Error('HTTP 請求輔助工具未初始化');
  }

  /**
   * 判斷是否為成功狀態碼
   */
  private isSuccessStatusCode(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
  }

  /**
   * 判斷是否應該重試
   */
  private shouldRetry(config: RequestConfig, error: any): boolean {
    if (config.retry === false) {
      return false;
    }

    // 網路錯誤或 5xx 錯誤才重試
    const isNetworkError = !error.response;
    const isServerError = error.response?.status >= 500;
    
    return isNetworkError || isServerError;
  }

  /**
   * 重試請求
   */
  private async retryRequest<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    const retryCount = config.retryCount || this.config.retryCount;
    const retryDelay = config.retryDelay || this.config.retryDelay;
    
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        this.logger.debug(`重試請求 (${attempt}/${retryCount})`, {
          method: config.method,
          path: config.path
        });
        
        // 等待重試延遲
        if (attempt > 1) {
          await this.sleep(retryDelay * attempt);
        }
        
        return await this.request<T>({ ...config, retry: false });
        
      } catch (error) {
        if (attempt === retryCount) {
          throw error;
        }
      }
    }
    
    throw new Error('重試次數已用盡');
  }

  /**
   * 建立 API 錯誤
   */
  private createApiError(error: any, config: RequestConfig): Error {
    const message = error.response?.data?.message || error.message || 'API 請求失敗';
    const apiError = new Error(message);
    
    // 附加額外資訊
    (apiError as any).statusCode = error.response?.status;
    (apiError as any).response = error.response;
    (apiError as any).config = config;
    
    return apiError;
  }

  /**
   * 睡眠函數
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
