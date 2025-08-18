/**
 * 台灣驗證組合式函數
 */

import { validateIdNumber, validateBusinessNumber, validateMobile } from '@/utils/validation'

export const useTaiwanValidation = () => {
  /**
   * 驗證台灣身分證字號
   */
  const validateTaiwanId = (id: string): { isValid: boolean; message?: string } => {
    if (!id) {
      return { isValid: false, message: '請輸入身分證字號' }
    }

    if (!/^[A-Z]\d{9}$/.test(id)) {
      return { isValid: false, message: '身分證字號格式不正確（應為1個英文字母+9個數字）' }
    }

    if (!validateIdNumber(id)) {
      return { isValid: false, message: '身分證字號檢核碼不正確' }
    }

    return { isValid: true }
  }

  /**
   * 驗證統一編號
   */
  const validateTaiwanBusinessNumber = (businessNumber: string): { isValid: boolean; message?: string } => {
    if (!businessNumber) {
      return { isValid: false, message: '請輸入統一編號' }
    }

    if (!/^\d{8}$/.test(businessNumber)) {
      return { isValid: false, message: '統一編號格式不正確（應為8個數字）' }
    }

    if (!validateBusinessNumber(businessNumber)) {
      return { isValid: false, message: '統一編號檢核碼不正確' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣手機號碼
   */
  const validateTaiwanMobile = (mobile: string): { isValid: boolean; message?: string } => {
    if (!mobile) {
      return { isValid: false, message: '請輸入手機號碼' }
    }

    if (!/^09\d{8}$/.test(mobile)) {
      return { isValid: false, message: '手機號碼格式不正確（應為09開頭的10位數字）' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣市話號碼
   */
  const validateTaiwanLandline = (landline: string): { isValid: boolean; message?: string } => {
    if (!landline) {
      return { isValid: false, message: '請輸入市話號碼' }
    }

    // 台灣市話格式：區碼(2-3位) + 號碼(6-8位)
    if (!/^0\d{1,2}-?\d{6,8}$/.test(landline)) {
      return { isValid: false, message: '市話號碼格式不正確' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣郵遞區號
   */
  const validateTaiwanPostalCode = (postalCode: string): { isValid: boolean; message?: string } => {
    if (!postalCode) {
      return { isValid: false, message: '請輸入郵遞區號' }
    }

    // 台灣郵遞區號為3位數字或5位數字
    if (!/^\d{3}(\d{2})?$/.test(postalCode)) {
      return { isValid: false, message: '郵遞區號格式不正確（應為3位或5位數字）' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣銀行帳號
   */
  const validateTaiwanBankAccount = (bankCode: string, accountNumber: string): { isValid: boolean; message?: string } => {
    if (!bankCode) {
      return { isValid: false, message: '請輸入銀行代碼' }
    }

    if (!/^\d{3}$/.test(bankCode)) {
      return { isValid: false, message: '銀行代碼格式不正確（應為3位數字）' }
    }

    if (!accountNumber) {
      return { isValid: false, message: '請輸入帳號' }
    }

    // 台灣銀行帳號通常為10-16位數字
    if (!/^\d{10,16}$/.test(accountNumber)) {
      return { isValid: false, message: '帳號格式不正確（應為10-16位數字）' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣車牌號碼
   */
  const validateTaiwanLicensePlate = (licensePlate: string): { isValid: boolean; message?: string } => {
    if (!licensePlate) {
      return { isValid: false, message: '請輸入車牌號碼' }
    }

    // 台灣車牌格式：
    // 舊格式：XX-1234 或 1234-XX
    // 新格式：XXX-1234 或 1234-XXX
    const oldFormat = /^[A-Z]{2}-\d{4}$|^\d{4}-[A-Z]{2}$/
    const newFormat = /^[A-Z]{3}-\d{4}$|^\d{4}-[A-Z]{3}$/
    
    if (!oldFormat.test(licensePlate) && !newFormat.test(licensePlate)) {
      return { isValid: false, message: '車牌號碼格式不正確' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣護照號碼
   */
  const validateTaiwanPassport = (passport: string): { isValid: boolean; message?: string } => {
    if (!passport) {
      return { isValid: false, message: '請輸入護照號碼' }
    }

    // 台灣護照號碼格式：1個英文字母 + 8個數字
    if (!/^[A-Z]\d{8}$/.test(passport)) {
      return { isValid: false, message: '護照號碼格式不正確（應為1個英文字母+8個數字）' }
    }

    return { isValid: true }
  }

  /**
   * 驗證台灣健保卡號
   */
  const validateTaiwanHealthCard = (healthCard: string): { isValid: boolean; message?: string } => {
    if (!healthCard) {
      return { isValid: false, message: '請輸入健保卡號' }
    }

    // 健保卡號格式通常與身分證字號相同
    return validateTaiwanId(healthCard)
  }

  return {
    validateTaiwanId,
    validateTaiwanBusinessNumber,
    validateTaiwanMobile,
    validateTaiwanLandline,
    validateTaiwanPostalCode,
    validateTaiwanBankAccount,
    validateTaiwanLicensePlate,
    validateTaiwanPassport,
    validateTaiwanHealthCard
  }
}
