/**
 * 表格組合式函數
 */

import { ref, computed, reactive, type Ref } from 'vue'

export interface TableColumn {
  key: string
  label: string
  width?: string | number
  sortable?: boolean
  filterable?: boolean
  formatter?: (value: any, row: any) => string
}

export interface TableSort {
  key: string
  order: 'asc' | 'desc'
}

export interface TableFilter {
  key: string
  value: any
}

export interface UseTableOptions {
  defaultSort?: TableSort
  defaultPageSize?: number
}

export const useTable = <T extends Record<string, any>>(
  data: Ref<T[]>,
  columns: TableColumn[],
  options: UseTableOptions = {}
) => {
  const {
    defaultSort,
    defaultPageSize = 10
  } = options

  // 表格狀態
  const loading = ref(false)
  const selectedRows = ref<T[]>([])
  const currentPage = ref(1)
  const pageSize = ref(defaultPageSize)
  const sort = reactive<TableSort | null>(defaultSort || null)
  const filters = reactive<TableFilter[]>([])
  const searchQuery = ref('')

  // ===== 計算屬性 =====

  // 篩選後的資料
  const filteredData = computed(() => {
    let result = data.value

    // 搜尋篩選
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(row => {
        return columns.some(col => {
          const value = row[col.key]
          return value && value.toString().toLowerCase().includes(query)
        })
      })
    }

    // 欄位篩選
    filters.forEach(filter => {
      if (filter.value !== null && filter.value !== undefined && filter.value !== '') {
        result = result.filter(row => {
          const value = row[filter.key]
          if (Array.isArray(filter.value)) {
            return filter.value.includes(value)
          }
          return value === filter.value
        })
      }
    })

    return result
  })

  // 排序後的資料
  const sortedData = computed(() => {
    if (!sort.key) {
      return filteredData.value
    }

    return [...filteredData.value].sort((a, b) => {
      const aValue = a[sort.key]
      const bValue = b[sort.key]

      let result = 0
      if (aValue < bValue) result = -1
      else if (aValue > bValue) result = 1

      return sort.order === 'desc' ? -result : result
    })
  })

  // 分頁後的資料
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return sortedData.value.slice(start, end)
  })

  // 總頁數
  const totalPages = computed(() => {
    return Math.ceil(sortedData.value.length / pageSize.value)
  })

  // 總筆數
  const totalItems = computed(() => {
    return sortedData.value.length
  })

  // 是否有選取的行
  const hasSelection = computed(() => {
    return selectedRows.value.length > 0
  })

  // 是否全選
  const isAllSelected = computed(() => {
    return paginatedData.value.length > 0 && 
           selectedRows.value.length === paginatedData.value.length
  })

  // 是否部分選取
  const isIndeterminate = computed(() => {
    return selectedRows.value.length > 0 && 
           selectedRows.value.length < paginatedData.value.length
  })

  // ===== 方法 =====

  /**
   * 設定排序
   */
  const setSort = (key: string, order: 'asc' | 'desc') => {
    sort.key = key
    sort.order = order
    currentPage.value = 1 // 重設到第一頁
  }

  /**
   * 切換排序
   */
  const toggleSort = (key: string) => {
    if (sort.key === key) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc'
    } else {
      sort.key = key
      sort.order = 'asc'
    }
    currentPage.value = 1
  }

  /**
   * 清除排序
   */
  const clearSort = () => {
    sort.key = ''
    sort.order = 'asc'
  }

  /**
   * 設定篩選
   */
  const setFilter = (key: string, value: any) => {
    const existingFilter = filters.find(f => f.key === key)
    if (existingFilter) {
      existingFilter.value = value
    } else {
      filters.push({ key, value })
    }
    currentPage.value = 1
  }

  /**
   * 清除篩選
   */
  const clearFilter = (key: string) => {
    const index = filters.findIndex(f => f.key === key)
    if (index > -1) {
      filters.splice(index, 1)
    }
  }

  /**
   * 清除所有篩選
   */
  const clearAllFilters = () => {
    filters.splice(0, filters.length)
    searchQuery.value = ''
    currentPage.value = 1
  }

  /**
   * 設定搜尋查詢
   */
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1
  }

  /**
   * 選取行
   */
  const selectRow = (row: T) => {
    const index = selectedRows.value.findIndex(r => r === row)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(row)
    }
  }

  /**
   * 全選/取消全選
   */
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedRows.value = []
    } else {
      selectedRows.value = [...paginatedData.value]
    }
  }

  /**
   * 清除選取
   */
  const clearSelection = () => {
    selectedRows.value = []
  }

  /**
   * 檢查行是否被選取
   */
  const isRowSelected = (row: T): boolean => {
    return selectedRows.value.includes(row)
  }

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
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  /**
   * 下一頁
   */
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  /**
   * 設定每頁筆數
   */
  const setPageSize = (size: number) => {
    pageSize.value = size
    currentPage.value = 1
  }

  return {
    // 狀態
    loading,
    selectedRows,
    currentPage,
    pageSize,
    sort,
    filters,
    searchQuery,

    // 計算屬性
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    totalItems,
    hasSelection,
    isAllSelected,
    isIndeterminate,

    // 方法
    setSort,
    toggleSort,
    clearSort,
    setFilter,
    clearFilter,
    clearAllFilters,
    setSearchQuery,
    selectRow,
    toggleSelectAll,
    clearSelection,
    isRowSelected,
    goToPage,
    previousPage,
    nextPage,
    setPageSize
  }
}
