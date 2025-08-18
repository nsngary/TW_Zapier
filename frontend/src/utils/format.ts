/**
 * 格式化工具函數
 */

/**
 * 格式化數字為千分位
 */
export const formatNumber = (num: number, locale = 'zh-TW'): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * 格式化百分比
 */
export const formatPercentage = (num: number, decimals = 1): string => {
  return `${(num * 100).toFixed(decimals)}%`
}

/**
 * 格式化檔案大小
 */
export const formatFileSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 格式化時間持續
 */
export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}天 ${hours % 24}小時`
  } else if (hours > 0) {
    return `${hours}小時 ${minutes % 60}分鐘`
  } else if (minutes > 0) {
    return `${minutes}分鐘 ${seconds % 60}秒`
  } else {
    return `${seconds}秒`
  }
}

/**
 * 格式化相對時間
 */
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date()
  const target = new Date(date)
  const diff = now.getTime() - target.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小時前`
  } else if (minutes > 0) {
    return `${minutes}分鐘前`
  } else {
    return '剛剛'
  }
}
