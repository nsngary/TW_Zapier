/**
 * 台灣在地服務節點基礎類別
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
  ILoadOptionsFunctions,
  INodePropertyOptions,
} from 'n8n-workflow';

import { 
  TaiwanNodeConfig, 
  ExecutionContext, 
  NodeExecutionResult,
  LogLevel,
  ErrorCategory,
  ErrorSeverity,
  StandardError
} from '../types/common';
import { AuthConfig, AuthResult } from '../types/auth';
import { TaiwanLogger } from '../utils/logger';
import { TaiwanValidator } from '../validators/TaiwanValidator';

/**
 * 台灣在地服務節點基礎抽象類別
 */
export abstract class BaseNode implements INodeType {
  /** 節點描述 */
  abstract description: INodeTypeDescription;
  
  /** 節點配置 */
  protected config: TaiwanNodeConfig;
  
  /** 日誌記錄器 */
  protected logger: TaiwanLogger;
  
  /** 驗證器 */
  protected validator: TaiwanValidator;

  constructor(config: TaiwanNodeConfig) {
    this.config = config;
    this.logger = new TaiwanLogger({
      nodeName: config.name,
      level: LogLevel.INFO
    });
    this.validator = new TaiwanValidator();
  }

  /**
   * 執行節點邏輯
   */
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const startTime = Date.now();
    const context = this.createExecutionContext();
    
    try {
      this.logger.info('節點開始執行', { context });
      
      // 驗證輸入資料
      await this.validateInput(this);
      
      // 執行節點邏輯
      const result = await this.executeNode(this, context);
      
      const duration = Date.now() - startTime;
      this.logger.info('節點執行完成', { 
        context, 
        duration,
        itemCount: result[0]?.length || 0
      });
      
      return result;
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const standardError = this.handleError(error, context);
      
      this.logger.error('節點執行失敗', { 
        context, 
        duration,
        error: standardError
      });
      
      throw new NodeOperationError(
        this.getNode(),
        standardError.message,
        {
          description: standardError.details?.description,
          cause: standardError.details?.cause,
          httpCode: standardError.details?.httpCode
        }
      );
    }
  }

  /**
   * 抽象方法：執行節點具體邏輯
   */
  protected abstract executeNode(
    context: IExecuteFunctions,
    executionContext: ExecutionContext
  ): Promise<INodeExecutionData[][]>;

  /**
   * 驗證輸入資料
   */
  protected async validateInput(context: IExecuteFunctions): Promise<void> {
    const items = context.getInputData();
    
    if (!items || items.length === 0) {
      throw new Error('沒有輸入資料');
    }

    // 驗證必要參數
    await this.validateRequiredParameters(context);
    
    // 驗證認證資訊
    await this.validateCredentials(context);
  }

  /**
   * 驗證必要參數
   */
  protected async validateRequiredParameters(context: IExecuteFunctions): Promise<void> {
    const requiredParams = this.getRequiredParameters();
    
    for (const param of requiredParams) {
      try {
        const value = context.getNodeParameter(param, 0);
        if (value === undefined || value === null || value === '') {
          throw new Error(`必要參數 "${param}" 不能為空`);
        }
      } catch (error) {
        throw new Error(`缺少必要參數: ${param}`);
      }
    }
  }

  /**
   * 驗證認證資訊
   */
  protected async validateCredentials(context: IExecuteFunctions): Promise<void> {
    const credentialTypes = this.getCredentialTypes();
    
    for (const credType of credentialTypes) {
      try {
        const credentials = await context.getCredentials(credType);
        if (!credentials) {
          throw new Error(`缺少認證資訊: ${credType}`);
        }
        
        // 驗證認證資訊格式
        await this.validateCredentialFormat(credentials, credType);
        
      } catch (error) {
        throw new Error(`認證驗證失敗: ${error.message}`);
      }
    }
  }

  /**
   * 驗證認證資訊格式
   */
  protected async validateCredentialFormat(
    credentials: any, 
    credentialType: string
  ): Promise<void> {
    // 子類別可以覆寫此方法來實作特定的認證驗證邏輯
  }

  /**
   * 處理多個項目
   */
  protected async processItems(
    context: IExecuteFunctions,
    processor: (item: INodeExecutionData, index: number) => Promise<INodeExecutionData>
  ): Promise<INodeExecutionData[][]> {
    const items = context.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const result = await processor(items[i], i);
        returnData.push(result);
        
      } catch (error) {
        if (context.continueOnFail()) {
          returnData.push({
            json: {
              error: error.message,
              item: items[i].json
            },
            pairedItem: { item: i }
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }

  /**
   * 取得認證配置
   */
  protected async getAuthConfig(context: IExecuteFunctions): Promise<AuthConfig> {
    const credentialTypes = this.getCredentialTypes();
    
    if (credentialTypes.length === 0) {
      throw new Error('節點未配置認證類型');
    }

    const credentials = await context.getCredentials(credentialTypes[0]);
    return this.buildAuthConfig(credentials);
  }

  /**
   * 建構認證配置
   */
  protected abstract buildAuthConfig(credentials: any): AuthConfig;

  /**
   * 建立執行上下文
   */
  protected createExecutionContext(): ExecutionContext {
    return {
      executionId: this.getExecutionId(),
      workflowId: this.getWorkflowId(),
      nodeName: this.config.name,
      executionTime: new Date()
    };
  }

  /**
   * 處理錯誤
   */
  protected handleError(error: any, context: ExecutionContext): StandardError {
    let category = ErrorCategory.SYSTEM;
    let severity = ErrorSeverity.MEDIUM;
    let suggestion = '請檢查節點配置和輸入資料';

    // 根據錯誤類型分類
    if (error.message?.includes('認證') || error.message?.includes('授權')) {
      category = ErrorCategory.AUTHENTICATION;
      severity = ErrorSeverity.HIGH;
      suggestion = '請檢查認證資訊是否正確';
    } else if (error.message?.includes('參數') || error.message?.includes('驗證')) {
      category = ErrorCategory.VALIDATION;
      severity = ErrorSeverity.MEDIUM;
      suggestion = '請檢查輸入參數是否符合要求';
    } else if (error.message?.includes('網路') || error.message?.includes('連線')) {
      category = ErrorCategory.NETWORK;
      severity = ErrorSeverity.HIGH;
      suggestion = '請檢查網路連線和 API 端點';
    }

    return {
      code: `${this.config.name.toUpperCase()}_ERROR`,
      message: error.message || '未知錯誤',
      category,
      severity,
      details: {
        nodeName: this.config.name,
        executionId: context.executionId,
        timestamp: context.executionTime,
        originalError: error
      },
      suggestion
    };
  }

  /**
   * 取得必要參數列表
   */
  protected getRequiredParameters(): string[] {
    return [];
  }

  /**
   * 取得認證類型列表
   */
  protected getCredentialTypes(): string[] {
    return this.description.credentials?.map(cred => cred.name) || [];
  }

  /**
   * 取得執行 ID
   */
  protected getExecutionId(): string {
    // 這裡需要從 n8n 上下文中取得實際的執行 ID
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 取得工作流 ID
   */
  protected getWorkflowId(): string {
    // 這裡需要從 n8n 上下文中取得實際的工作流 ID
    return `workflow_${Date.now()}`;
  }

  /**
   * 取得節點資訊
   */
  protected getNode(): any {
    return {
      name: this.config.name,
      type: this.description.name,
      typeVersion: this.description.version
    };
  }

  /**
   * 載入選項（用於動態下拉選單）
   */
  async loadOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    // 子類別可以覆寫此方法來提供動態選項
    return [];
  }

  /**
   * 格式化金額（新台幣）
   */
  protected formatTWDAmount(amount: number): string {
    return new Intl.NumberFormat('zh-TW', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0
    }).format(amount);
  }

  /**
   * 格式化日期（台灣時區）
   */
  protected formatTaiwanDate(date: Date, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return new Intl.DateTimeFormat('zh-TW', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date);
  }
}
