/**
 * 台灣格式化組合式函數
 */

import { formatTaiwanCurrency, formatTaiwanDate, formatTaiwanPhone } from '@/utils/taiwan'

export const useTaiwanFormat = () => {
  /**
   * 格式化台灣貨幣
   */
  const formatCurrency = (amount: number, options?: { 
    showSymbol?: boolean
    showUnit?: boolean 
  }): string => {
    return formatTaiwanCurrency(amount, options)
  }

  /**
   * 格式化台灣日期
   */
  const formatDate = (date: string | Date, options?: {
    format?: string
    useRepublicYear?: boolean
  }): string => {
    return formatTaiwanDate(date, options)
  }

  /**
   * 格式化台灣電話號碼
   */
  const formatPhone = (phone: string, type?: 'mobile' | 'landline'): string => {
    return formatTaiwanPhone(phone, type)
  }

  /**
   * 格式化身分證字號
   */
  const formatIdNumber = (id: string): string => {
    if (!id) return ''
    
    // 移除所有非英數字元
    const cleaned = id.replace(/[^A-Z0-9]/gi, '').toUpperCase()
    
    // 格式化為 A123456789
    if (cleaned.length <= 1) return cleaned
    if (cleaned.length <= 10) return cleaned
    
    return cleaned.substring(0, 10)
  }

  /**
   * 格式化統一編號
   */
  const formatBusinessNumber = (businessNumber: string): string => {
    if (!businessNumber) return ''
    
    // 移除所有非數字
    const cleaned = businessNumber.replace(/\D/g, '')
    
    // 限制為8位數字
    return cleaned.substring(0, 8)
  }

  /**
   * 格式化手機號碼
   */
  const formatMobile = (mobile: string): string => {
    if (!mobile) return ''
    
    // 移除所有非數字
    const cleaned = mobile.replace(/\D/g, '')
    
    // 格式化為 0912-345-678
    if (cleaned.length <= 4) return cleaned
    if (cleaned.length <= 7) return `${cleaned.substring(0, 4)}-${cleaned.substring(4)}`
    if (cleaned.length <= 10) return `${cleaned.substring(0, 4)}-${cleaned.substring(4, 7)}-${cleaned.substring(7)}`
    
    return `${cleaned.substring(0, 4)}-${cleaned.substring(4, 7)}-${cleaned.substring(7, 10)}`
  }

  /**
   * 格式化市話號碼
   */
  const formatLandline = (landline: string): string => {
    if (!landline) return ''
    
    // 移除所有非數字
    const cleaned = landline.replace(/\D/g, '')
    
    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 3) return cleaned
    
    // 判斷區碼長度（2位或3位）
    const areaCodeLength = cleaned.startsWith('02') ? 2 : 3
    const areaCode = cleaned.substring(0, areaCodeLength)
    const number = cleaned.substring(areaCodeLength)
    
    if (number.length === 0) return areaCode
    
    return `${areaCode}-${number}`
  }

  /**
   * 格式化郵遞區號
   */
  const formatPostalCode = (postalCode: string): string => {
    if (!postalCode) return ''
    
    // 移除所有非數字
    const cleaned = postalCode.replace(/\D/g, '')
    
    // 限制為5位數字
    return cleaned.substring(0, 5)
  }

  /**
   * 格式化銀行帳號
   */
  const formatBankAccount = (accountNumber: string): string => {
    if (!accountNumber) return ''
    
    // 移除所有非數字
    const cleaned = accountNumber.replace(/\D/g, '')
    
    // 每4位數字加一個空格
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  /**
   * 格式化車牌號碼
   */
  const formatLicensePlate = (licensePlate: string): string => {
    if (!licensePlate) return ''
    
    // 移除所有非英數字元並轉大寫
    const cleaned = licensePlate.replace(/[^A-Z0-9]/gi, '').toUpperCase()
    
    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 6) {
      // 判斷是字母在前還是數字在前
      if (/^[A-Z]/.test(cleaned)) {
        // 字母在前：XX-1234 或 XXX-1234
        const letters = cleaned.match(/^[A-Z]+/)?.[0] || ''
        const numbers = cleaned.substring(letters.length)
        return numbers ? `${letters}-${numbers}` : letters
      } else {
        // 數字在前：1234-XX 或 1234-XXX
        const numbers = cleaned.match(/^\d+/)?.[0] || ''
        const letters = cleaned.substring(numbers.length)
        return letters ? `${numbers}-${letters}` : numbers
      }
    }
    
    return cleaned
  }

  /**
   * 格式化護照號碼
   */
  const formatPassport = (passport: string): string => {
    if (!passport) return ''
    
    // 移除所有非英數字元並轉大寫
    const cleaned = passport.replace(/[^A-Z0-9]/gi, '').toUpperCase()
    
    // 限制為9位（1個字母+8個數字）
    return cleaned.substring(0, 9)
  }

  /**
   * 格式化地址
   */
  const formatAddress = (address: string): string => {
    if (!address) return ''
    
    // 基本清理，移除多餘空格
    return address.trim().replace(/\s+/g, ' ')
  }

  /**
   * 格式化公司名稱
   */
  const formatCompanyName = (companyName: string): string => {
    if (!companyName) return ''
    
    // 基本清理
    let formatted = companyName.trim()
    
    // 常見的公司類型縮寫標準化
    const companyTypes = {
      '股份有限公司': '股份有限公司',
      '股份有限': '股份有限公司',
      '股公司': '股份有限公司',
      '有限公司': '有限公司',
      '有限': '有限公司',
      '企業社': '企業社',
      '工作室': '工作室',
      '事務所': '事務所'
    }
    
    Object.entries(companyTypes).forEach(([pattern, replacement]) => {
      if (formatted.endsWith(pattern)) {
        formatted = formatted.replace(new RegExp(pattern + '$'), replacement)
      }
    })
    
    return formatted
  }

  return {
    formatCurrency,
    formatDate,
    formatPhone,
    formatIdNumber,
    formatBusinessNumber,
    formatMobile,
    formatLandline,
    formatPostalCode,
    formatBankAccount,
    formatLicensePlate,
    formatPassport,
    formatAddress,
    formatCompanyName
  }
}
