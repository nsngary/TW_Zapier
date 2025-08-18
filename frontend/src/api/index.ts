/**
 * API 客戶端主要匯出
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type {
  ApiResponse,
  StandardApiResponse,
  ApiError,
  AuthToken
} from '@/types'
import { ErrorCategory, ErrorSeverity } from '@/types'

// ===== API 客戶端配置 =====

/**
 * 建立 Axios 實例
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // 請求攔截器
  client.interceptors.request.use(
    (config) => {
      // 添加認證 token
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // 添加請求 ID
      config.headers['X-Request-ID'] = generateRequestId()

      // 添加時間戳
      config.headers['X-Timestamp'] = Date.now().toString()

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 回應攔截器
  client.interceptors.response.use(
    (response: AxiosResponse<StandardApiResponse>) => {
      // 檢查業務邏輯錯誤
      if (response.data && !response.data.success) {
        const error: ApiError = {
          code: response.data.error?.code || 'API_ERROR',
          message: response.data.error?.message || response.data.message || 'API 請求失敗',
          category: response.data.error?.category || ErrorCategory.API,
          severity: response.data.error?.severity || ErrorSeverity.MEDIUM,
          status: response.status,
          statusText: response.statusText,
          url: response.config?.url,
          method: response.config?.method?.toUpperCase() as any
        }
        return Promise.reject(error)
      }

      return response
    },
    async (error) => {
      const originalRequest = error.config

      // 處理 401 未授權錯誤
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // 嘗試重新整理 token
          const refreshToken = localStorage.getItem('refresh_token')
          if (refreshToken) {
            const response = await refreshAuthToken(refreshToken)
            const { accessToken } = response.data

            // 更新 token
            localStorage.setItem('access_token', accessToken)
            originalRequest.headers.Authorization = `Bearer ${accessToken}`

            // 重新發送原始請求
            return client(originalRequest)
          }
        } catch (refreshError) {
          // 重新整理失敗，清除 token 並重導向到登入頁
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      // 建立標準化錯誤
      const apiError: ApiError = {
        code: error.code || 'NETWORK_ERROR',
        message: error.message || '網路請求失敗',
        category: ErrorCategory.NETWORK,
        severity: ErrorSeverity.HIGH,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase() as any
      }

      return Promise.reject(apiError)
    }
  )

  return client
}

// ===== 工具函數 =====

/**
 * 生成請求 ID
 */
const generateRequestId = (): string => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * 重新整理認證 token
 */
const refreshAuthToken = async (refreshToken: string): Promise<AxiosResponse<{ accessToken: string }>> => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
    refreshToken
  })
  return response
}

// ===== API 客戶端實例 =====

export const apiClient = createApiClient()

// ===== 通用 API 方法 =====

/**
 * GET 請求
 */
export const get = async <T = any>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.get<StandardApiResponse<T>>(url, config)
  return response.data.data as T
}

/**
 * POST 請求
 */
export const post = async <T = any>(
  url: string, 
  data?: any, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<StandardApiResponse<T>>(url, data, config)
  return response.data.data as T
}

/**
 * PUT 請求
 */
export const put = async <T = any>(
  url: string, 
  data?: any, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<StandardApiResponse<T>>(url, data, config)
  return response.data.data as T
}

/**
 * PATCH 請求
 */
export const patch = async <T = any>(
  url: string, 
  data?: any, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.patch<StandardApiResponse<T>>(url, data, config)
  return response.data.data as T
}

/**
 * DELETE 請求
 */
export const del = async <T = any>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.delete<StandardApiResponse<T>>(url, config)
  return response.data.data as T
}

/**
 * 檔案上傳
 */
export const upload = async <T = any>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<T> => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post<StandardApiResponse<T>>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(progress)
      }
    }
  })

  return response.data.data as T
}

/**
 * 檔案下載
 */
export const download = async (
  url: string,
  filename?: string,
  config?: AxiosRequestConfig
): Promise<void> => {
  const response = await apiClient.get(url, {
    ...config,
    responseType: 'blob'
  })

  // 建立下載連結
  const blob = new Blob([response.data])
  const downloadUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(downloadUrl)
}

// ===== 匯出 API 模組 =====

export * from './auth'
export * from './user'
// 暫時註解掉不存在的 API 模組
// export * from './workflow'
// export * from './node'
// export * from './taiwan'

// ===== 預設匯出 =====

export default {
  client: apiClient,
  get,
  post,
  put,
  patch,
  delete: del,
  upload,
  download
}
