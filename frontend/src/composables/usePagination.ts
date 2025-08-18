/**
 * 分頁組合式函數
 */

import { ref, computed, type Ref } from 'vue'

export interface UsePaginationOptions {
  defaultPage?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
}

export const usePagination = (
  totalItems: Ref<number>,
  options: UsePaginationOptions = {}
) => {
  const {
    defaultPage = 1,
    defaultPageSize = 10,
    pageSizeOptions = [10, 20, 50, 100]
  } = options

  // 分頁狀態
  const currentPage = ref(defaultPage)
  const pageSize = ref(defaultPageSize)

  // ===== 計算屬性 =====

  // 總頁數
  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / pageSize.value)
  })

  // 開始索引
  const startIndex = computed(() => {
    return (currentPage.value - 1) * pageSize.value
  })

  // 結束索引
  const endIndex = computed(() => {
    return Math.min(startIndex.value + pageSize.value, totalItems.value)
  })

  // 是否有上一頁
  const hasPrevious = computed(() => {
    return currentPage.value > 1
  })

  // 是否有下一頁
  const hasNext = computed(() => {
    return currentPage.value < totalPages.value
  })

  // 分頁資訊文字
  const paginationInfo = computed(() => {
    if (totalItems.value === 0) {
      return '沒有資料'
    }
    return `第 ${startIndex.value + 1}-${endIndex.value} 項，共 ${totalItems.value} 項`
  })

  // 頁碼列表（用於顯示頁碼按鈕）
  const pageNumbers = computed(() => {
    const pages: number[] = []
    const total = totalPages.value
    const current = currentPage.value
    
    if (total <= 7) {
      // 如果總頁數小於等於 7，顯示所有頁碼
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 總是顯示第一頁
      pages.push(1)
      
      if (current <= 4) {
        // 當前頁在前面
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push(-1) // 省略號
        pages.push(total)
      } else if (current >= total - 3) {
        // 當前頁在後面
        pages.push(-1) // 省略號
        for (let i = total - 4; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // 當前頁在中間
        pages.push(-1) // 省略號
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i)
        }
        pages.push(-1) // 省略號
        pages.push(total)
      }
    }
    
    return pages
  })

  // ===== 方法 =====

  /**
   * 跳到指定頁面
   */
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  /**
   * 上一頁
   */
  const previousPage = () => {
    if (hasPrevious.value) {
      currentPage.value--
    }
  }

  /**
   * 下一頁
   */
  const nextPage = () => {
    if (hasNext.value) {
      currentPage.value++
    }
  }

  /**
   * 第一頁
   */
  const firstPage = () => {
    currentPage.value = 1
  }

  /**
   * 最後一頁
   */
  const lastPage = () => {
    currentPage.value = totalPages.value
  }

  /**
   * 設定每頁筆數
   */
  const setPageSize = (size: number) => {
    pageSize.value = size
    // 重新計算當前頁面，確保不超出範圍
    const maxPage = Math.ceil(totalItems.value / size)
    if (currentPage.value > maxPage) {
      currentPage.value = Math.max(1, maxPage)
    }
  }

  /**
   * 重設分頁
   */
  const reset = () => {
    currentPage.value = defaultPage
    pageSize.value = defaultPageSize
  }

  /**
   * 取得分頁資料（用於陣列分頁）
   */
  const getPaginatedData = <T>(data: T[]): T[] => {
    return data.slice(startIndex.value, endIndex.value)
  }

  return {
    // 狀態
    currentPage,
    pageSize,
    pageSizeOptions,

    // 計算屬性
    totalPages,
    startIndex,
    endIndex,
    hasPrevious,
    hasNext,
    paginationInfo,
    pageNumbers,

    // 方法
    goToPage,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
    setPageSize,
    reset,
    getPaginatedData
  }
}
