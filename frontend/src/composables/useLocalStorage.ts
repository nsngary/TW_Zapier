/**
 * LocalStorage 組合式函數
 */

import { ref, watch, type Ref } from 'vue'

export interface UseLocalStorageOptions<T> {
  serializer?: {
    read: (value: string) => T
    write: (value: T) => string
  }
  onError?: (error: Error) => void
}

/**
 * LocalStorage 組合式函數
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {}
): [Ref<T>, (value: T) => void, () => void] {
  const {
    serializer = {
      read: JSON.parse,
      write: JSON.stringify
    },
    onError = (error) => console.error('useLocalStorage error:', error)
  } = options

  // 讀取初始值
  const read = (): T => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue
      }
      return serializer.read(item)
    } catch (error) {
      onError(error as Error)
      return defaultValue
    }
  }

  // 寫入值
  const write = (value: T): void => {
    try {
      localStorage.setItem(key, serializer.write(value))
    } catch (error) {
      onError(error as Error)
    }
  }

  // 移除值
  const remove = (): void => {
    try {
      localStorage.removeItem(key)
      storedValue.value = defaultValue
    } catch (error) {
      onError(error as Error)
    }
  }

  // 建立響應式引用
  const storedValue = ref<T>(read())

  // 監聽值的變化並同步到 localStorage
  watch(
    storedValue,
    (newValue) => {
      write(newValue)
    },
    { deep: true }
  )

  // 監聽 storage 事件（其他標籤頁的變化）
  window.addEventListener('storage', (e) => {
    if (e.key === key && e.newValue !== null) {
      try {
        storedValue.value = serializer.read(e.newValue)
      } catch (error) {
        onError(error as Error)
      }
    }
  })

  // 設定值的函數
  const setValue = (value: T) => {
    storedValue.value = value
  }

  return [storedValue, setValue, remove]
}
