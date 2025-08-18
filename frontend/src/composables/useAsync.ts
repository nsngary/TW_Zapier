/**
 * 非同步操作組合式函數
 */

import { ref, computed, type Ref } from 'vue'
import type { LoadingState, StandardError } from '@/types'

export interface UseAsyncOptions<T> {
  immediate?: boolean
  initialData?: T
  onSuccess?: (data: T) => void
  onError?: (error: StandardError) => void
}

export interface UseAsyncReturn<T> {
  data: Ref<T | null>
  loading: Ref<LoadingState>
  error: Ref<StandardError | null>
  isLoading: Ref<boolean>
  isSuccess: Ref<boolean>
  isError: Ref<boolean>
  execute: (...args: any[]) => Promise<T>
  reset: () => void
}

/**
 * 非同步操作組合式函數
 */
export function useAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T> {
  const {
    immediate = false,
    initialData = null,
    onSuccess,
    onError
  } = options

  // 狀態
  const data = ref<T | null>(initialData)
  const loading = ref<LoadingState>('idle')
  const error = ref<StandardError | null>(null)

  // 計算屬性
  const isLoading = computed(() => loading.value === 'loading')
  const isSuccess = computed(() => loading.value === 'success')
  const isError = computed(() => loading.value === 'error')

  // 執行非同步函數
  const execute = async (...args: any[]): Promise<T> => {
    try {
      loading.value = 'loading'
      error.value = null

      const result = await asyncFunction(...args)
      
      data.value = result
      loading.value = 'success'
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return result
    } catch (err: any) {
      const standardError: StandardError = {
        code: err.code || 'ASYNC_ERROR',
        message: err.message || '非同步操作失敗',
        category: err.category || 'api',
        severity: err.severity || 'medium',
        details: err.details,
        timestamp: new Date().toISOString()
      }
      
      error.value = standardError
      loading.value = 'error'
      
      if (onError) {
        onError(standardError)
      }
      
      throw standardError
    }
  }

  // 重設狀態
  const reset = () => {
    data.value = initialData
    loading.value = 'idle'
    error.value = null
  }

  // 立即執行
  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    isLoading,
    isSuccess,
    isError,
    execute,
    reset
  }
}
