/**
 * 節流組合式函數
 */

import { ref, watch, type Ref } from 'vue'

/**
 * 節流組合式函數
 */
export function useThrottle<T>(
  value: Ref<T>,
  delay: number = 300
): Ref<T> {
  const throttledValue = ref<T>(value.value)
  let lastExecution = 0

  watch(
    value,
    (newValue) => {
      const now = Date.now()
      
      if (now - lastExecution >= delay) {
        throttledValue.value = newValue
        lastExecution = now
      }
    },
    { immediate: true }
  )

  return throttledValue
}

/**
 * 節流函數組合式函數
 */
export function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): T {
  let lastExecution = 0

  return ((...args: Parameters<T>) => {
    const now = Date.now()
    
    if (now - lastExecution >= delay) {
      fn(...args)
      lastExecution = now
    }
  }) as T
}
