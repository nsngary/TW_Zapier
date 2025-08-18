/**
 * 台灣在地服務節點日誌記錄器
 */

import { LogLevel, LogEntry, ExecutionContext } from '../types/common';
import { TaiwanUtils } from './taiwan';

/**
 * 日誌配置
 */
export interface LoggerConfig {
  /** 節點名稱 */
  nodeName: string;
  /** 日誌等級 */
  level: LogLevel;
  /** 是否啟用控制台輸出 */
  enableConsole?: boolean;
  /** 是否啟用檔案輸出 */
  enableFile?: boolean;
  /** 日誌檔案路徑 */
  filePath?: string;
  /** 是否包含時間戳 */
  includeTimestamp?: boolean;
  /** 是否包含執行上下文 */
  includeContext?: boolean;
  /** 自定義格式化函數 */
  formatter?: (entry: LogEntry) => string;
}

/**
 * 日誌輸出介面
 */
export interface LogOutput {
  write(entry: LogEntry): Promise<void>;
}

/**
 * 控制台日誌輸出
 */
export class ConsoleLogOutput implements LogOutput {
  async write(entry: LogEntry): Promise<void> {
    const message = this.formatMessage(entry);
    
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message);
        break;
      case LogLevel.INFO:
        console.info(message);
        break;
      case LogLevel.WARN:
        console.warn(message);
        break;
      case LogLevel.ERROR:
        console.error(message);
        break;
    }
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = TaiwanUtils.formatTaiwanDateTime(entry.timestamp);
    const level = entry.level.toUpperCase().padEnd(5);
    const context = entry.context ? `[${entry.context.nodeName}]` : '';
    
    let message = `${timestamp} ${level} ${context} ${entry.message}`;
    
    if (entry.data && Object.keys(entry.data).length > 0) {
      message += ` | ${JSON.stringify(entry.data)}`;
    }
    
    if (entry.error) {
      message += ` | Error: ${entry.error.message}`;
      if (entry.error.stack) {
        message += `\nStack: ${entry.error.stack}`;
      }
    }
    
    return message;
  }
}

/**
 * 檔案日誌輸出
 */
export class FileLogOutput implements LogOutput {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async write(entry: LogEntry): Promise<void> {
    // 這裡需要實作檔案寫入邏輯
    // 在 n8n 環境中可能需要使用不同的檔案系統 API
    const message = this.formatMessage(entry);
    
    try {
      // 使用 Node.js fs 模組寫入檔案
      const fs = require('fs').promises;
      await fs.appendFile(this.filePath, message + '\n', 'utf8');
    } catch (error) {
      console.error('寫入日誌檔案失敗:', error);
    }
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const level = entry.level.toUpperCase();
    const context = entry.context ? entry.context.nodeName : 'unknown';
    
    const logObject = {
      timestamp,
      level,
      context,
      message: entry.message,
      data: entry.data,
      error: entry.error ? {
        message: entry.error.message,
        stack: entry.error.stack
      } : undefined
    };
    
    return JSON.stringify(logObject);
  }
}

/**
 * 台灣日誌記錄器
 */
export class TaiwanLogger {
  private config: LoggerConfig;
  private outputs: LogOutput[] = [];
  private context?: ExecutionContext;

  constructor(config: LoggerConfig) {
    this.config = {
      enableConsole: true,
      enableFile: false,
      includeTimestamp: true,
      includeContext: true,
      ...config
    };

    this.initializeOutputs();
  }

  /**
   * 設定執行上下文
   */
  setContext(context: ExecutionContext): void {
    this.context = context;
  }

  /**
   * 記錄 DEBUG 等級日誌
   */
  debug(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * 記錄 INFO 等級日誌
   */
  info(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * 記錄 WARN 等級日誌
   */
  warn(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * 記錄 ERROR 等級日誌
   */
  error(message: string, data?: Record<string, any>, error?: Error): void {
    this.log(LogLevel.ERROR, message, data, error);
  }

  /**
   * 記錄日誌
   */
  private log(level: LogLevel, message: string, data?: Record<string, any>, error?: Error): void {
    // 檢查日誌等級
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      context: this.config.includeContext ? this.context : undefined,
      data,
      error
    };

    // 輸出到所有配置的輸出目標
    this.outputs.forEach(output => {
      output.write(entry).catch(err => {
        console.error('日誌輸出失敗:', err);
      });
    });
  }

  /**
   * 檢查是否應該記錄此等級的日誌
   */
  private shouldLog(level: LogLevel): boolean {
    const levelOrder = {
      [LogLevel.DEBUG]: 0,
      [LogLevel.INFO]: 1,
      [LogLevel.WARN]: 2,
      [LogLevel.ERROR]: 3
    };

    return levelOrder[level] >= levelOrder[this.config.level];
  }

  /**
   * 初始化輸出目標
   */
  private initializeOutputs(): void {
    if (this.config.enableConsole) {
      this.outputs.push(new ConsoleLogOutput());
    }

    if (this.config.enableFile && this.config.filePath) {
      this.outputs.push(new FileLogOutput(this.config.filePath));
    }
  }

  /**
   * 添加自定義輸出目標
   */
  addOutput(output: LogOutput): void {
    this.outputs.push(output);
  }

  /**
   * 移除輸出目標
   */
  removeOutput(output: LogOutput): void {
    const index = this.outputs.indexOf(output);
    if (index > -1) {
      this.outputs.splice(index, 1);
    }
  }

  /**
   * 建立子日誌記錄器
   */
  createChild(childName: string): TaiwanLogger {
    const childConfig = {
      ...this.config,
      nodeName: `${this.config.nodeName}.${childName}`
    };

    const childLogger = new TaiwanLogger(childConfig);
    childLogger.setContext(this.context);
    
    return childLogger;
  }

  /**
   * 記錄效能指標
   */
  logPerformance(operation: string, startTime: number, data?: Record<string, any>): void {
    const duration = Date.now() - startTime;
    
    this.info(`效能指標: ${operation}`, {
      operation,
      duration,
      ...data
    });
  }

  /**
   * 記錄 API 請求
   */
  logApiRequest(method: string, url: string, statusCode?: number, duration?: number): void {
    const level = statusCode && statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;
    
    this.log(level, `API 請求: ${method} ${url}`, {
      method,
      url,
      statusCode,
      duration
    });
  }

  /**
   * 記錄認證事件
   */
  logAuthEvent(event: string, authType: string, success: boolean, error?: string): void {
    const level = success ? LogLevel.INFO : LogLevel.WARN;
    
    this.log(level, `認證事件: ${event}`, {
      event,
      authType,
      success,
      error
    });
  }

  /**
   * 記錄驗證錯誤
   */
  logValidationError(field: string, value: any, error: string): void {
    this.warn(`驗證錯誤: ${field}`, {
      field,
      value,
      error
    });
  }

  /**
   * 記錄節點執行開始
   */
  logNodeExecutionStart(nodeName: string, itemCount: number): void {
    this.info(`節點執行開始: ${nodeName}`, {
      nodeName,
      itemCount,
      startTime: new Date()
    });
  }

  /**
   * 記錄節點執行完成
   */
  logNodeExecutionComplete(nodeName: string, itemCount: number, duration: number, success: boolean): void {
    const level = success ? LogLevel.INFO : LogLevel.ERROR;
    
    this.log(level, `節點執行${success ? '完成' : '失敗'}: ${nodeName}`, {
      nodeName,
      itemCount,
      duration,
      success,
      endTime: new Date()
    });
  }

  /**
   * 記錄台灣特有事件
   */
  logTaiwanEvent(event: string, data?: Record<string, any>): void {
    this.info(`台灣事件: ${event}`, {
      event,
      timestamp: TaiwanUtils.generateTaiwanTimestamp(),
      ...data
    });
  }

  /**
   * 格式化日誌訊息（支援台灣在地化）
   */
  private formatTaiwanMessage(message: string, data?: Record<string, any>): string {
    let formattedMessage = message;
    
    // 替換常見的台灣術語
    const taiwanTerms: Record<string, string> = {
      'payment': '付款',
      'order': '訂單',
      'customer': '客戶',
      'amount': '金額',
      'success': '成功',
      'failed': '失敗',
      'error': '錯誤',
      'warning': '警告'
    };
    
    Object.entries(taiwanTerms).forEach(([en, zh]) => {
      formattedMessage = formattedMessage.replace(new RegExp(en, 'gi'), zh);
    });
    
    return formattedMessage;
  }
}
