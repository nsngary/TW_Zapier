/**
 * 驗證工具函數
 */

/**
 * 驗證 Email 格式
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 驗證手機號碼格式
 */
export const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^09\d{8}$/
  return mobileRegex.test(mobile)
}

/**
 * 驗證台灣身分證字號
 */
export const validateIdNumber = (idNumber: string): boolean => {
  if (!/^[A-Z]\d{9}$/.test(idNumber)) {
    return false
  }

  const letterMap: Record<string, number> = {
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34, J: 18,
    K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25, S: 26, T: 27,
    U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33
  }

  const firstLetter = idNumber.charAt(0)
  const letterValue = letterMap[firstLetter]
  
  if (!letterValue) return false

  const digits = idNumber.substring(1).split('').map(Number)
  const checksum = Math.floor(letterValue / 10) + 
                  (letterValue % 10) * 9 +
                  digits[0] * 8 + digits[1] * 7 + digits[2] * 6 + 
                  digits[3] * 5 + digits[4] * 4 + digits[5] * 3 + 
                  digits[6] * 2 + digits[7] * 1 + digits[8]

  return checksum % 10 === 0
}

/**
 * 驗證統一編號
 */
export const validateBusinessNumber = (businessNumber: string): boolean => {
  if (!/^\d{8}$/.test(businessNumber)) {
    return false
  }

  const weights = [1, 2, 1, 2, 1, 2, 4, 1]
  const digits = businessNumber.split('').map(Number)
  
  let sum = 0
  for (let i = 0; i < 8; i++) {
    const product = digits[i] * weights[i]
    sum += Math.floor(product / 10) + (product % 10)
  }

  return sum % 10 === 0 || (digits[6] === 7 && (sum + 1) % 10 === 0)
}

/**
 * 驗證密碼強度
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} => {
  const feedback: string[] = []
  let score = 0

  if (password.length < 8) {
    feedback.push('密碼長度至少需要 8 個字元')
  } else {
    score += 1
  }

  if (!/[a-z]/.test(password)) {
    feedback.push('密碼需要包含小寫字母')
  } else {
    score += 1
  }

  if (!/[A-Z]/.test(password)) {
    feedback.push('密碼需要包含大寫字母')
  } else {
    score += 1
  }

  if (!/\d/.test(password)) {
    feedback.push('密碼需要包含數字')
  } else {
    score += 1
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    feedback.push('密碼需要包含特殊字元')
  } else {
    score += 1
  }

  return {
    isValid: score >= 3,
    score,
    feedback
  }
}

/**
 * 驗證 URL 格式
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 驗證 IP 地址
 */
export const validateIpAddress = (ip: string): boolean => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ip)
}

/**
 * 驗證信用卡號碼（Luhn 算法）
 */
export const validateCreditCard = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\s/g, '')
  
  if (!/^\d+$/.test(cleanNumber)) {
    return false
  }

  let sum = 0
  let isEven = false

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i))

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}
