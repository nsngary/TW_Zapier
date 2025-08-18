/**
 * HMAC 認證提供者
 */

import * as crypto from 'crypto';
import { 
  AuthProvider, 
  AuthType, 
  AuthConfig, 
  AuthResult, 
  AuthStatus,
  HmacAuthConfig,
  HmacAlgorithm 
} from '../types/auth';
import { TaiwanLogger } from '../utils/logger';
import { LogLevel } from '../types/common';

/**
 * HMAC 認證提供者類別
 */
export class HmacAuth implements AuthProvider {
  readonly type = AuthType.HMAC;
  private logger: TaiwanLogger;

  constructor() {
    this.logger = new TaiwanLogger({
      nodeName: 'HmacAuth',
      level: LogLevel.INFO
    });
  }

  /**
   * 驗證認證配置
   */
  async validate(config: AuthConfig): Promise<boolean> {
    if (config.type !== AuthType.HMAC) {
      return false;
    }

    const hmacConfig = config as HmacAuthConfig;

    // 檢查必要欄位
    if (!hmacConfig.key || !hmacConfig.secret) {
      this.logger.warn('HMAC 認證配置缺少必要欄位', {
        hasKey: !!hmacConfig.key,
        hasSecret: !!hmacConfig.secret
      });
      return false;
    }

    // 檢查演算法是否支援
    const supportedAlgorithms = Object.values(HmacAlgorithm);
    if (!supportedAlgorithms.includes(hmacConfig.algorithm)) {
      this.logger.warn('不支援的 HMAC 演算法', {
        algorithm: hmacConfig.algorithm,
        supported: supportedAlgorithms
      });
      return false;
    }

    return true;
  }

  /**
   * 執行認證
   */
  async authenticate(config: AuthConfig): Promise<AuthResult> {
    const hmacConfig = config as HmacAuthConfig;

    try {
      // 生成時間戳
      const timestamp = Math.floor(Date.now() / 1000).toString();
      
      // 生成 Nonce
      const nonce = this.generateNonce();
      
      // 建構簽名字串
      const signatureString = this.buildSignatureString(hmacConfig, timestamp, nonce);
      
      // 計算 HMAC 簽名
      const signature = this.calculateHmac(signatureString, hmacConfig.secret, hmacConfig.algorithm);
      
      // 建構認證標頭
      const headers = this.buildAuthHeaders(hmacConfig, signature, timestamp, nonce);
      
      this.logger.debug('HMAC 認證成功', {
        key: hmacConfig.key,
        algorithm: hmacConfig.algorithm,
        timestamp,
        nonce: nonce.substring(0, 8) + '...'
      });

      return {
        success: true,
        status: AuthStatus.VALID,
        headers,
        expiresAt: this.calculateExpirationTime(hmacConfig)
      };

    } catch (error) {
      this.logger.error('HMAC 認證失敗', {
        key: hmacConfig.key,
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
   * 建構簽名字串
   */
  private buildSignatureString(
    config: HmacAuthConfig, 
    timestamp: string, 
    nonce: string,
    method: string = 'POST',
    path: string = '',
    body: string = ''
  ): string {
    // 標準的 HMAC 簽名字串格式
    const parts = [
      method.toUpperCase(),
      path,
      config.key,
      timestamp,
      nonce,
      body
    ];

    return parts.join('\n');
  }

  /**
   * 計算 HMAC 簽名
   */
  private calculateHmac(data: string, secret: string, algorithm: HmacAlgorithm): string {
    const hmac = crypto.createHmac(algorithm, secret);
    hmac.update(data, 'utf8');
    return hmac.digest('base64');
  }

  /**
   * 生成 Nonce
   */
  private generateNonce(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * 建構認證標頭
   */
  private buildAuthHeaders(
    config: HmacAuthConfig, 
    signature: string, 
    timestamp: string, 
    nonce: string
  ): Record<string, string> {
    const headers: Record<string, string> = {};

    // 設定簽名標頭
    const signatureHeader = config.signatureHeader || 'X-Signature';
    headers[signatureHeader] = signature;

    // 設定時間戳標頭
    const timestampHeader = config.timestampHeader || 'X-Timestamp';
    headers[timestampHeader] = timestamp;

    // 設定 Nonce 標頭
    const nonceHeader = config.nonceHeader || 'X-Nonce';
    headers[nonceHeader] = nonce;

    // 設定金鑰標頭
    headers['X-API-Key'] = config.key;

    return headers;
  }

  /**
   * 計算過期時間
   */
  private calculateExpirationTime(config: HmacAuthConfig): Date {
    const validityPeriod = config.signatureValidityPeriod || 300; // 預設 5 分鐘
    return new Date(Date.now() + validityPeriod * 1000);
  }
}

/**
 * Line Pay HMAC 認證提供者
 */
export class LinePayHmacAuth extends HmacAuth {
  /**
   * 建構 Line Pay 特有的簽名字串
   */
  protected buildLinePaySignatureString(
    channelSecret: string,
    uri: string,
    requestBody: string,
    nonce: string
  ): string {
    return channelSecret + uri + requestBody + nonce;
  }

  /**
   * 執行 Line Pay 認證
   */
  async authenticate(config: AuthConfig): Promise<AuthResult> {
    const hmacConfig = config as any; // Line Pay 特有配置

    try {
      const nonce = this.generateNonce();
      const uri = '/v3/payments/request'; // 預設 URI
      const requestBody = ''; // 需要從請求中取得
      
      // 建構 Line Pay 簽名字串
      const signatureString = this.buildLinePaySignatureString(
        hmacConfig.channelSecret,
        uri,
        requestBody,
        nonce
      );
      
      // 計算簽名
      const signature = crypto
        .createHmac('sha256', hmacConfig.channelSecret)
        .update(signatureString)
        .digest('base64');

      const headers = {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': hmacConfig.channelId,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Authorization': signature
      };

      this.logger.debug('Line Pay HMAC 認證成功', {
        channelId: hmacConfig.channelId,
        nonce: nonce.substring(0, 8) + '...'
      });

      return {
        success: true,
        status: AuthStatus.VALID,
        headers,
        expiresAt: new Date(Date.now() + 300000) // 5 分鐘
      };

    } catch (error) {
      this.logger.error('Line Pay HMAC 認證失敗', {
        channelId: hmacConfig.channelId,
        error: error.message
      });

      return {
        success: false,
        status: AuthStatus.INVALID,
        error: error.message
      };
    }
  }
}

/**
 * ECPay HMAC 認證提供者
 */
export class ECPayHmacAuth extends HmacAuth {
  /**
   * 建構 ECPay 特有的檢查碼
   */
  private buildECPayCheckMacValue(
    parameters: Record<string, any>,
    hashKey: string,
    hashIV: string
  ): string {
    // 排序參數
    const sortedParams = Object.keys(parameters)
      .sort()
      .reduce((result, key) => {
        if (key !== 'CheckMacValue') {
          result[key] = parameters[key];
        }
        return result;
      }, {} as Record<string, any>);

    // 建構查詢字串
    const queryString = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // 加上 HashKey 和 HashIV
    const rawString = `HashKey=${hashKey}&${queryString}&HashIV=${hashIV}`;

    // URL 編碼
    const encodedString = encodeURIComponent(rawString)
      .replace(/%20/g, '+')
      .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

    // 轉小寫並計算 SHA256
    const lowerString = encodedString.toLowerCase();
    const hash = crypto.createHash('sha256').update(lowerString).digest('hex');

    return hash.toUpperCase();
  }

  /**
   * 執行 ECPay 認證
   */
  async authenticate(config: AuthConfig): Promise<AuthResult> {
    const ecpayConfig = config as any; // ECPay 特有配置

    try {
      // ECPay 使用表單資料而非標頭認證
      const body = {
        MerchantID: ecpayConfig.merchantId,
        // 其他 ECPay 參數...
      };

      // 計算檢查碼
      const checkMacValue = this.buildECPayCheckMacValue(
        body,
        ecpayConfig.hashKey,
        ecpayConfig.hashIV
      );

      body.CheckMacValue = checkMacValue;

      this.logger.debug('ECPay HMAC 認證成功', {
        merchantId: ecpayConfig.merchantId
      });

      return {
        success: true,
        status: AuthStatus.VALID,
        body,
        expiresAt: new Date(Date.now() + 3600000) // 1 小時
      };

    } catch (error) {
      this.logger.error('ECPay HMAC 認證失敗', {
        merchantId: ecpayConfig.merchantId,
        error: error.message
      });

      return {
        success: false,
        status: AuthStatus.INVALID,
        error: error.message
      };
    }
  }
}
