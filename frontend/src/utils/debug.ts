/**
 * 除錯工具函數
 */

/**
 * 除錯等級
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

/**
 * 除錯器類別
 */
export class Logger {
  private level: LogLevel
  private prefix: string

  constructor(prefix = 'TW-Automation', level = LogLevel.INFO) {
    this.prefix = prefix
    this.level = level
  }

  /**
   * 設定除錯等級
   */
  setLevel(level: LogLevel): void {
    this.level = level
  }

  /**
   * 取得格式化的時間戳
   */
  private getTimestamp(): string {
    return new Date().toISOString()
  }

  /**
   * 格式化訊息
   */
  private formatMessage(level: string, message: string): string {
    return `[${this.getTimestamp()}] [${this.prefix}] [${level}] ${message}`
  }

  /**
   * 除錯訊息
   */
  debug(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.DEBUG && import.meta.env.DEV) {
      console.debug(this.formatMessage('DEBUG', message), ...args)
    }
  }

  /**
   * 資訊訊息
   */
  info(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message), ...args)
    }
  }

  /**
   * 警告訊息
   */
  warn(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message), ...args)
    }
  }

  /**
   * 錯誤訊息
   */
  error(message: string, ...args: any[]): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message), ...args)
    }
  }

  /**
   * 群組開始
   */
  group(label: string): void {
    if (import.meta.env.DEV) {
      console.group(this.formatMessage('GROUP', label))
    }
  }

  /**
   * 群組結束
   */
  groupEnd(): void {
    if (import.meta.env.DEV) {
      console.groupEnd()
    }
  }

  /**
   * 計時開始
   */
  time(label: string): void {
    if (import.meta.env.DEV) {
      console.time(`${this.prefix}-${label}`)
    }
  }

  /**
   * 計時結束
   */
  timeEnd(label: string): void {
    if (import.meta.env.DEV) {
      console.timeEnd(`${this.prefix}-${label}`)
    }
  }

  /**
   * 表格顯示
   */
  table(data: any): void {
    if (import.meta.env.DEV) {
      console.table(data)
    }
  }
}

/**
 * 預設的除錯器實例
 */
export const logger = new Logger()

/**
 * 效能監控器
 */
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()

  /**
   * 標記開始時間
   */
  mark(name: string): void {
    this.marks.set(name, performance.now())
  }

  /**
   * 測量時間差
   */
  measure(name: string, startMark?: string): number {
    const endTime = performance.now()
    const startTime = startMark ? this.marks.get(startMark) : this.marks.get(name)
    
    if (startTime === undefined) {
      logger.warn(`Performance mark "${startMark || name}" not found`)
      return 0
    }

    const duration = endTime - startTime
    logger.debug(`Performance: ${name} took ${duration.toFixed(2)}ms`)
    
    return duration
  }

  /**
   * 清除標記
   */
  clearMark(name: string): void {
    this.marks.delete(name)
  }

  /**
   * 清除所有標記
   */
  clearAllMarks(): void {
    this.marks.clear()
  }

  /**
   * 取得記憶體使用情況
   */
  getMemoryUsage(): any {
    if ('memory' in performance) {
      return (performance as any).memory
    }
    return null
  }
}

/**
 * 預設的效能監控器實例
 */
export const perfMonitor = new PerformanceMonitor()

/**
 * 除錯工具函數
 */
export const debugUtils = {
  /**
   * 檢查是否為開發環境
   */
  isDev(): boolean {
    return import.meta.env.DEV
  },

  /**
   * 檢查是否為生產環境
   */
  isProd(): boolean {
    return import.meta.env.PROD
  },

  /**
   * 取得環境變數
   */
  getEnv(key: string): string | undefined {
    return import.meta.env[key]
  },

  /**
   * 取得所有環境變數
   */
  getAllEnv(): Record<string, any> {
    return import.meta.env
  },

  /**
   * 取得瀏覽器資訊
   */
  getBrowserInfo(): {
    userAgent: string
    language: string
    platform: string
    cookieEnabled: boolean
    onLine: boolean
  } {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine
    }
  },

  /**
   * 取得螢幕資訊
   */
  getScreenInfo(): {
    width: number
    height: number
    availWidth: number
    availHeight: number
    colorDepth: number
    pixelDepth: number
  } {
    return {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth
    }
  },

  /**
   * 取得視窗資訊
   */
  getWindowInfo(): {
    innerWidth: number
    innerHeight: number
    outerWidth: number
    outerHeight: number
    scrollX: number
    scrollY: number
  } {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY
    }
  },

  /**
   * 序列化物件為 JSON（處理循環引用）
   */
  safeStringify(obj: any, space?: number): string {
    const seen = new WeakSet()
    
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular Reference]'
        }
        seen.add(value)
      }
      return value
    }, space)
  },

  /**
   * 深度複製物件（用於除錯）
   */
  deepClone<T>(obj: T): T {
    return JSON.parse(this.safeStringify(obj))
  }
}

/**
 * 條件除錯裝飾器
 */
export function debugIf(condition: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!condition || !import.meta.env.DEV) {
      return descriptor
    }

    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      logger.debug(`Calling ${propertyKey} with args:`, args)
      const result = originalMethod.apply(this, args)
      logger.debug(`${propertyKey} returned:`, result)
      return result
    }

    return descriptor
  }
}
