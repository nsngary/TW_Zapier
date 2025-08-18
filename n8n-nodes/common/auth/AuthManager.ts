/**
 * 認證管理器
 */

import { 
  AuthType, 
  AuthConfig, 
  AuthResult, 
  AuthProvider,
  AuthCacheItem,
  AuthEvent,
  AuthEventType,
  AuthStatus
} from '../types/auth';
import { LogLevel } from '../types/common';
import { TaiwanLogger } from '../utils/logger';

/**
 * 認證管理器類別
 */
export class AuthManager {
  private providers: Map<AuthType, AuthProvider> = new Map();
  private cache: Map<string, AuthCacheItem> = new Map();
  private logger: TaiwanLogger;
  private eventListeners: Map<AuthEventType, Function[]> = new Map();

  constructor() {
    this.logger = new TaiwanLogger({
      nodeName: 'AuthManager',
      level: LogLevel.INFO
    });
    
    // 初始化事件監聽器
    Object.values(AuthEventType).forEach(eventType => {
      this.eventListeners.set(eventType, []);
    });
  }

  /**
   * 註冊認證提供者
   */
  register(type: AuthType, provider: AuthProvider): void {
    this.providers.set(type, provider);
    this.logger.debug(`認證提供者已註冊: ${type}`);
  }

  /**
   * 取得認證提供者
   */
  getProvider(type: AuthType): AuthProvider | undefined {
    return this.providers.get(type);
  }

  /**
   * 執行認證
   */
  async authenticate(config: AuthConfig): Promise<AuthResult> {
    const startTime = Date.now();
    
    try {
      // 檢查快取
      const cachedResult = this.getCachedAuth(config);
      if (cachedResult && this.isAuthValid(cachedResult)) {
        this.logger.debug('使用快取認證', { type: config.type });
        return cachedResult.result;
      }

      // 取得認證提供者
      const provider = this.getProvider(config.type);
      if (!provider) {
        throw new Error(`不支援的認證類型: ${config.type}`);
      }

      // 驗證配置
      const isValidConfig = await provider.validate(config);
      if (!isValidConfig) {
        throw new Error('認證配置無效');
      }

      // 執行認證
      const result = await provider.authenticate(config);
      
      const duration = Date.now() - startTime;
      
      if (result.success) {
        // 快取認證結果
        this.cacheAuthResult(config, result);
        
        // 發送認證成功事件
        this.emitEvent({
          type: AuthEventType.AUTHENTICATED,
          authType: config.type,
          timestamp: new Date(),
          data: { duration }
        });
        
        this.logger.info('認證成功', { 
          type: config.type, 
          duration,
          expiresAt: result.expiresAt
        });
      } else {
        // 發送認證失敗事件
        this.emitEvent({
          type: AuthEventType.AUTHENTICATION_FAILED,
          authType: config.type,
          timestamp: new Date(),
          error: result.error
        });
        
        this.logger.warn('認證失敗', { 
          type: config.type, 
          error: result.error 
        });
      }

      return result;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.logger.error('認證處理錯誤', { 
        type: config.type, 
        duration,
        error: error.message 
      });

      // 發送認證失敗事件
      this.emitEvent({
        type: AuthEventType.AUTHENTICATION_FAILED,
        authType: config.type,
        timestamp: new Date(),
        error: error.message
      });

      return {
        success: false,
        status: AuthStatus.INVALID,
        error: error.message
      };
    }
  }

  /**
   * 重新整理認證
   */
  async refresh(config: AuthConfig): Promise<AuthResult> {
    try {
      const provider = this.getProvider(config.type);
      if (!provider || !provider.refresh) {
        throw new Error(`認證類型 ${config.type} 不支援重新整理`);
      }

      const result = await provider.refresh(config);
      
      if (result.success) {
        // 更新快取
        this.cacheAuthResult(config, result);
        
        // 發送 Token 重新整理事件
        this.emitEvent({
          type: AuthEventType.TOKEN_REFRESHED,
          authType: config.type,
          timestamp: new Date()
        });
        
        this.logger.info('認證重新整理成功', { type: config.type });
      }

      return result;
      
    } catch (error) {
      this.logger.error('認證重新整理失敗', { 
        type: config.type, 
        error: error.message 
      });

      return {
        success: false,
        status: AuthStatus.INVALID,
        error: error.message
      };
    }
  }

  /**
   * 撤銷認證
   */
  async revoke(config: AuthConfig): Promise<boolean> {
    try {
      const provider = this.getProvider(config.type);
      if (!provider || !provider.revoke) {
        this.logger.warn(`認證類型 ${config.type} 不支援撤銷`);
        return false;
      }

      const success = await provider.revoke(config);
      
      if (success) {
        // 清除快取
        this.clearAuthCache(config);
        
        // 發送 Token 撤銷事件
        this.emitEvent({
          type: AuthEventType.TOKEN_REVOKED,
          authType: config.type,
          timestamp: new Date()
        });
        
        this.logger.info('認證撤銷成功', { type: config.type });
      }

      return success;
      
    } catch (error) {
      this.logger.error('認證撤銷失敗', { 
        type: config.type, 
        error: error.message 
      });
      return false;
    }
  }

  /**
   * 清除所有快取
   */
  clearAllCache(): void {
    this.cache.clear();
    this.logger.info('所有認證快取已清除');
  }

  /**
   * 清除過期快取
   */
  clearExpiredCache(): void {
    const now = new Date();
    const expiredKeys: string[] = [];

    this.cache.forEach((item, key) => {
      if (item.expiresAt <= now) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => {
      this.cache.delete(key);
    });

    if (expiredKeys.length > 0) {
      this.logger.debug(`清除 ${expiredKeys.length} 個過期認證快取`);
    }
  }

  /**
   * 添加事件監聽器
   */
  addEventListener(eventType: AuthEventType, listener: (event: AuthEvent) => void): void {
    const listeners = this.eventListeners.get(eventType) || [];
    listeners.push(listener);
    this.eventListeners.set(eventType, listeners);
  }

  /**
   * 移除事件監聽器
   */
  removeEventListener(eventType: AuthEventType, listener: Function): void {
    const listeners = this.eventListeners.get(eventType) || [];
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * 取得快取的認證結果
   */
  private getCachedAuth(config: AuthConfig): AuthCacheItem | undefined {
    const cacheKey = this.generateCacheKey(config);
    return this.cache.get(cacheKey);
  }

  /**
   * 快取認證結果
   */
  private cacheAuthResult(config: AuthConfig, result: AuthResult): void {
    if (!result.success || !result.expiresAt) {
      return;
    }

    const cacheKey = this.generateCacheKey(config);
    const cacheItem: AuthCacheItem = {
      key: cacheKey,
      result,
      createdAt: new Date(),
      expiresAt: result.expiresAt
    };

    this.cache.set(cacheKey, cacheItem);
    this.logger.debug('認證結果已快取', { 
      key: cacheKey, 
      expiresAt: result.expiresAt 
    });
  }

  /**
   * 清除特定認證的快取
   */
  private clearAuthCache(config: AuthConfig): void {
    const cacheKey = this.generateCacheKey(config);
    this.cache.delete(cacheKey);
    this.logger.debug('認證快取已清除', { key: cacheKey });
  }

  /**
   * 生成快取鍵
   */
  private generateCacheKey(config: AuthConfig): string {
    // 根據認證類型和關鍵參數生成唯一鍵
    const keyParts = [config.type];
    
    switch (config.type) {
      case AuthType.API_KEY:
        keyParts.push((config as any).apiKey?.substring(0, 8));
        break;
      case AuthType.HMAC:
        keyParts.push((config as any).key);
        break;
      case AuthType.OAUTH2:
        keyParts.push((config as any).clientId);
        break;
      case AuthType.BASIC:
        keyParts.push((config as any).username);
        break;
      case AuthType.BEARER:
        keyParts.push((config as any).token?.substring(0, 8));
        break;
    }
    
    return keyParts.join(':');
  }

  /**
   * 檢查認證是否有效
   */
  private isAuthValid(cacheItem: AuthCacheItem): boolean {
    const now = new Date();
    
    // 檢查是否過期
    if (cacheItem.expiresAt <= now) {
      // 發送 Token 過期事件
      this.emitEvent({
        type: AuthEventType.TOKEN_EXPIRED,
        authType: cacheItem.result.status as any,
        timestamp: new Date()
      });
      return false;
    }
    
    return cacheItem.result.success;
  }

  /**
   * 發送事件
   */
  private emitEvent(event: AuthEvent): void {
    const listeners = this.eventListeners.get(event.type) || [];
    listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        this.logger.error('事件監聽器執行錯誤', { 
          eventType: event.type, 
          error: error.message 
        });
      }
    });
  }
}
