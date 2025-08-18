/**
 * 日期時間工具函數
 */

import dayjs from 'dayjs'
import 'dayjs/locale/zh-tw'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// 設定 dayjs 插件
dayjs.extend(relativeTime)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.locale('zh-tw')

/**
 * 格式化日期
 */
export const formatDate = (
  date: string | Date | dayjs.Dayjs,
  format = 'YYYY-MM-DD'
): string => {
  return dayjs(date).format(format)
}

/**
 * 格式化日期時間
 */
export const formatDateTime = (
  date: string | Date | dayjs.Dayjs,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => {
  return dayjs(date).format(format)
}

/**
 * 格式化相對時間
 */
export const formatRelativeTime = (date: string | Date | dayjs.Dayjs): string => {
  return dayjs(date).fromNow()
}

/**
 * 轉換為台灣時區
 */
export const toTaiwanTime = (date: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).tz('Asia/Taipei')
}

/**
 * 取得今天的開始時間
 */
export const getStartOfDay = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).startOf('day')
}

/**
 * 取得今天的結束時間
 */
export const getEndOfDay = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).endOf('day')
}

/**
 * 取得本週的開始時間
 */
export const getStartOfWeek = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).startOf('week')
}

/**
 * 取得本週的結束時間
 */
export const getEndOfWeek = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).endOf('week')
}

/**
 * 取得本月的開始時間
 */
export const getStartOfMonth = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).startOf('month')
}

/**
 * 取得本月的結束時間
 */
export const getEndOfMonth = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).endOf('month')
}

/**
 * 計算兩個日期之間的差異
 */
export const getDiffInDays = (
  date1: string | Date | dayjs.Dayjs,
  date2: string | Date | dayjs.Dayjs
): number => {
  return dayjs(date1).diff(dayjs(date2), 'day')
}

/**
 * 計算兩個日期之間的差異（小時）
 */
export const getDiffInHours = (
  date1: string | Date | dayjs.Dayjs,
  date2: string | Date | dayjs.Dayjs
): number => {
  return dayjs(date1).diff(dayjs(date2), 'hour')
}

/**
 * 計算兩個日期之間的差異（分鐘）
 */
export const getDiffInMinutes = (
  date1: string | Date | dayjs.Dayjs,
  date2: string | Date | dayjs.Dayjs
): number => {
  return dayjs(date1).diff(dayjs(date2), 'minute')
}

/**
 * 檢查是否為今天
 */
export const isToday = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 檢查是否為昨天
 */
export const isYesterday = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

/**
 * 檢查是否為本週
 */
export const isThisWeek = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'week')
}

/**
 * 檢查是否為本月
 */
export const isThisMonth = (date: string | Date | dayjs.Dayjs): boolean => {
  return dayjs(date).isSame(dayjs(), 'month')
}

/**
 * 檢查是否為工作日
 */
export const isWeekday = (date: string | Date | dayjs.Dayjs): boolean => {
  const day = dayjs(date).day()
  return day >= 1 && day <= 5
}

/**
 * 檢查是否為週末
 */
export const isWeekend = (date: string | Date | dayjs.Dayjs): boolean => {
  const day = dayjs(date).day()
  return day === 0 || day === 6
}

/**
 * 取得下一個工作日
 */
export const getNextWeekday = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  let nextDay = dayjs(date).add(1, 'day')
  
  while (!isWeekday(nextDay)) {
    nextDay = nextDay.add(1, 'day')
  }
  
  return nextDay
}

/**
 * 取得上一個工作日
 */
export const getPreviousWeekday = (date?: string | Date | dayjs.Dayjs): dayjs.Dayjs => {
  let prevDay = dayjs(date).subtract(1, 'day')
  
  while (!isWeekday(prevDay)) {
    prevDay = prevDay.subtract(1, 'day')
  }
  
  return prevDay
}

/**
 * 格式化時間範圍
 */
export const formatTimeRange = (
  startDate: string | Date | dayjs.Dayjs,
  endDate: string | Date | dayjs.Dayjs
): string => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  
  if (start.isSame(end, 'day')) {
    return `${start.format('YYYY-MM-DD')} ${start.format('HH:mm')} - ${end.format('HH:mm')}`
  } else {
    return `${start.format('YYYY-MM-DD HH:mm')} - ${end.format('YYYY-MM-DD HH:mm')}`
  }
}
