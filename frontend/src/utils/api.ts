/**
 * API 客戶端工具
 * 提供統一的 HTTP 請求介面
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// API 基礎配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const API_TIMEOUT = 30000

// 建立 Axios 實例
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加認證 token（如果存在）
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加請求時間戳
    config.metadata = { startTime: new Date() }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// 響應攔截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 計算請求時間
    const endTime = new Date()
    const startTime = response.config.metadata?.startTime
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0
    
    console.log(`✅ API Response: ${response.status} ${response.config.url} (${duration}ms)`)
    return response
  },
  (error) => {
    // 處理認證錯誤
    if (error.response?.status === 401) {
      console.warn('🔐 Authentication failed, redirecting to login...')
      localStorage.removeItem('auth_token')
      // 這裡可以添加重定向到登入頁面的邏輯
      // window.location.href = '/login'
    }
    
    // 處理網路錯誤
    if (!error.response) {
      console.error('🌐 Network Error:', error.message)
      error.message = '網路連線錯誤，請檢查您的網路連線'
    } else {
      console.error(`❌ API Error: ${error.response.status} ${error.response.config.url}`)
    }
    
    return Promise.reject(error)
  }
)

// 擴展 AxiosRequestConfig 以支援 metadata
declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date
    }
  }
}

// API 方法封裝
export const api = {
  // GET 請求
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get(url, config)
  },
  
  // POST 請求
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.post(url, data, config)
  },
  
  // PUT 請求
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.put(url, data, config)
  },
  
  // DELETE 請求
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.delete(url, config)
  },
  
  // PATCH 請求
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.patch(url, data, config)
  }
}

// 導出 apiClient 以保持向後相容性
export { apiClient }

// 導出預設實例
export default apiClient

// API 錯誤處理工具
export class ApiError extends Error {
  public status: number
  public data: any
  
  constructor(message: string, status: number, data?: any) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

// 處理 API 錯誤的工具函數
export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // 伺服器回應了錯誤狀態碼
    const { status, data } = error.response
    const message = data?.message || data?.detail || `HTTP ${status} Error`
    return new ApiError(message, status, data)
  } else if (error.request) {
    // 請求已發送但沒有收到回應
    return new ApiError('網路連線錯誤', 0)
  } else {
    // 其他錯誤
    return new ApiError(error.message || '未知錯誤', -1)
  }
}

// 檢查 API 連線狀態
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get('/health')
    return true
  } catch (error) {
    console.warn('API health check failed:', error)
    return false
  }
}

// 設定認證 token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('auth_token', token)
  apiClient.defaults.headers.Authorization = `Bearer ${token}`
}

// 清除認證 token
export const clearAuthToken = (): void => {
  localStorage.removeItem('auth_token')
  delete apiClient.defaults.headers.Authorization
}

// 獲取當前認證 token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token')
}
