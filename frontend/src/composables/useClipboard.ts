/**
 * 剪貼簿組合式函數
 */

import { ref, type Ref } from 'vue'

export interface UseClipboardReturn {
  text: Ref<string>
  isSupported: Ref<boolean>
  copy: (text: string) => Promise<boolean>
  read: () => Promise<string>
}

/**
 * 剪貼簿組合式函數
 */
export function useClipboard(): UseClipboardReturn {
  const text = ref('')
  const isSupported = ref(
    typeof navigator !== 'undefined' && 'clipboard' in navigator
  )

  /**
   * 複製文字到剪貼簿
   */
  const copy = async (textToCopy: string): Promise<boolean> => {
    try {
      if (isSupported.value) {
        await navigator.clipboard.writeText(textToCopy)
        text.value = textToCopy
        return true
      } else {
        // 降級方案
        const textArea = document.createElement('textarea')
        textArea.value = textToCopy
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        const result = document.execCommand('copy')
        textArea.remove()
        
        if (result) {
          text.value = textToCopy
        }
        
        return result
      }
    } catch (error) {
      console.error('複製到剪貼簿失敗:', error)
      return false
    }
  }

  /**
   * 從剪貼簿讀取文字
   */
  const read = async (): Promise<string> => {
    try {
      if (isSupported.value) {
        const clipboardText = await navigator.clipboard.readText()
        text.value = clipboardText
        return clipboardText
      } else {
        console.warn('不支援從剪貼簿讀取')
        return ''
      }
    } catch (error) {
      console.error('從剪貼簿讀取失敗:', error)
      return ''
    }
  }

  return {
    text,
    isSupported,
    copy,
    read
  }
}
