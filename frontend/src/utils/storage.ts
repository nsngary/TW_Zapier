/**
 * 本地儲存工具函數
 */

/**
 * 本地儲存管理器
 */
export class StorageManager {
  private prefix: string

  constructor(prefix = 'taiwan-automation-') {
    this.prefix = prefix
  }

  /**
   * 取得完整的鍵名
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  /**
   * 設定項目到 localStorage
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(this.getKey(key), serializedValue)
    } catch (error) {
      console.error('Failed to set localStorage item:', error)
    }
  }

  /**
   * 從 localStorage 取得項目
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      if (item === null) {
        return defaultValue || null
      }
      return JSON.parse(item)
    } catch (error) {
      console.error('Failed to get localStorage item:', error)
      return defaultValue || null
    }
  }

  /**
   * 從 localStorage 移除項目
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error('Failed to remove localStorage item:', error)
    }
  }

  /**
   * 清除所有帶前綴的項目
   */
  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }

  /**
   * 檢查項目是否存在
   */
  hasItem(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null
  }

  /**
   * 取得所有帶前綴的鍵
   */
  getAllKeys(): string[] {
    try {
      const keys = Object.keys(localStorage)
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''))
    } catch (error) {
      console.error('Failed to get localStorage keys:', error)
      return []
    }
  }
}

/**
 * 預設的儲存管理器實例
 */
export const storage = new StorageManager()

/**
 * SessionStorage 管理器
 */
export class SessionStorageManager {
  private prefix: string

  constructor(prefix = 'taiwan-automation-session-') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value)
      sessionStorage.setItem(this.getKey(key), serializedValue)
    } catch (error) {
      console.error('Failed to set sessionStorage item:', error)
    }
  }

  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = sessionStorage.getItem(this.getKey(key))
      if (item === null) {
        return defaultValue || null
      }
      return JSON.parse(item)
    } catch (error) {
      console.error('Failed to get sessionStorage item:', error)
      return defaultValue || null
    }
  }

  removeItem(key: string): void {
    try {
      sessionStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error('Failed to remove sessionStorage item:', error)
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error)
    }
  }

  hasItem(key: string): boolean {
    return sessionStorage.getItem(this.getKey(key)) !== null
  }
}

/**
 * 預設的 session 儲存管理器實例
 */
export const sessionStorage = new SessionStorageManager()

/**
 * Cookie 管理器
 */
export class CookieManager {
  /**
   * 設定 Cookie
   */
  setCookie(
    name: string,
    value: string,
    options: {
      expires?: number | Date
      path?: string
      domain?: string
      secure?: boolean
      sameSite?: 'strict' | 'lax' | 'none'
    } = {}
  ): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date()
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000)
        cookieString += `; expires=${date.toUTCString()}`
      } else {
        cookieString += `; expires=${options.expires.toUTCString()}`
      }
    }

    if (options.path) {
      cookieString += `; path=${options.path}`
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }

    if (options.secure) {
      cookieString += '; secure'
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    document.cookie = cookieString
  }

  /**
   * 取得 Cookie
   */
  getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '='
    const cookies = document.cookie.split(';')

    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length))
      }
    }

    return null
  }

  /**
   * 刪除 Cookie
   */
  deleteCookie(name: string, path?: string, domain?: string): void {
    this.setCookie(name, '', {
      expires: new Date(0),
      path,
      domain
    })
  }

  /**
   * 檢查 Cookie 是否存在
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null
  }
}

/**
 * 預設的 Cookie 管理器實例
 */
export const cookies = new CookieManager()
