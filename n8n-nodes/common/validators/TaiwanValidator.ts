/**
 * 台灣資料驗證器
 */

import { 
  TaiwanIdNumber, 
  TaiwanBusinessNumber, 
  TaiwanMobileNumber, 
  TaiwanPhoneNumber,
  TaiwanPostalCode,
  TaiwanCity,
  TWDAmount
} from '../types/taiwan';
import { ValidationResult, ValidationRule } from '../types/common';

/**
 * 台灣資料驗證器類別
 */
export class TaiwanValidator {
  
  /**
   * 驗證台灣身分證字號
   */
  validateIdNumber(idNumber: string): ValidationResult {
    const errors: string[] = [];
    
    if (!idNumber) {
      errors.push('身分證字號不能為空');
      return { isValid: false, errors };
    }

    // 移除空格並轉為大寫
    const cleanId = idNumber.replace(/\s/g, '').toUpperCase();
    
    // 檢查格式：1個英文字母 + 9個數字
    if (!/^[A-Z][0-9]{9}$/.test(cleanId)) {
      errors.push('身分證字號格式錯誤，應為1個英文字母加9個數字');
      return { isValid: false, errors };
    }

    // 檢查檢查碼
    if (!this.validateIdChecksum(cleanId)) {
      errors.push('身分證字號檢查碼錯誤');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證台灣統一編號
   */
  validateBusinessNumber(businessNumber: string): ValidationResult {
    const errors: string[] = [];
    
    if (!businessNumber) {
      errors.push('統一編號不能為空');
      return { isValid: false, errors };
    }

    // 移除空格
    const cleanNumber = businessNumber.replace(/\s/g, '');
    
    // 檢查格式：8個數字
    if (!/^[0-9]{8}$/.test(cleanNumber)) {
      errors.push('統一編號格式錯誤，應為8個數字');
      return { isValid: false, errors };
    }

    // 檢查檢查碼
    if (!this.validateBusinessNumberChecksum(cleanNumber)) {
      errors.push('統一編號檢查碼錯誤');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證台灣手機號碼
   */
  validateMobileNumber(mobile: string): ValidationResult {
    const errors: string[] = [];
    
    if (!mobile) {
      errors.push('手機號碼不能為空');
      return { isValid: false, errors };
    }

    // 移除空格和連字號
    const cleanMobile = mobile.replace(/[\s-]/g, '');
    
    // 檢查格式：09開頭的10位數字
    if (!/^09[0-9]{8}$/.test(cleanMobile)) {
      errors.push('手機號碼格式錯誤，應為09開頭的10位數字');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證台灣市話號碼
   */
  validatePhoneNumber(phone: string): ValidationResult {
    const errors: string[] = [];
    
    if (!phone) {
      errors.push('電話號碼不能為空');
      return { isValid: false, errors };
    }

    // 移除空格、連字號和括號
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    
    // 檢查格式：區碼(2-3位) + 號碼(6-8位)
    if (!/^0[2-9][0-9]{6,8}$/.test(cleanPhone)) {
      errors.push('電話號碼格式錯誤');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證台灣郵遞區號
   */
  validatePostalCode(postalCode: string): ValidationResult {
    const errors: string[] = [];
    
    if (!postalCode) {
      errors.push('郵遞區號不能為空');
      return { isValid: false, errors };
    }

    // 檢查格式：3位或5位數字
    if (!/^[0-9]{3}([0-9]{2})?$/.test(postalCode)) {
      errors.push('郵遞區號格式錯誤，應為3位或5位數字');
      return { isValid: false, errors };
    }

    // 檢查是否為有效的郵遞區號範圍
    const code = parseInt(postalCode.substring(0, 3));
    if (code < 100 || code > 983) {
      errors.push('郵遞區號範圍錯誤');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證新台幣金額
   */
  validateTWDAmount(amount: number): ValidationResult {
    const errors: string[] = [];
    
    if (amount === undefined || amount === null) {
      errors.push('金額不能為空');
      return { isValid: false, errors };
    }

    if (typeof amount !== 'number') {
      errors.push('金額必須為數字');
      return { isValid: false, errors };
    }

    if (amount < 0) {
      errors.push('金額不能為負數');
      return { isValid: false, errors };
    }

    if (!Number.isInteger(amount)) {
      errors.push('金額必須為整數（以分為單位）');
      return { isValid: false, errors };
    }

    // 檢查金額上限（1億新台幣 = 10,000,000,000分）
    if (amount > 10000000000) {
      errors.push('金額超過上限（1億新台幣）');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證電子郵件地址
   */
  validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('電子郵件地址不能為空');
      return { isValid: false, errors };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('電子郵件地址格式錯誤');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 驗證台灣縣市
   */
  validateCity(city: string): ValidationResult {
    const errors: string[] = [];
    
    if (!city) {
      errors.push('縣市不能為空');
      return { isValid: false, errors };
    }

    const validCities = Object.values(TaiwanCity);
    if (!validCities.includes(city as TaiwanCity)) {
      errors.push('無效的縣市名稱');
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  /**
   * 批次驗證
   */
  validateBatch(data: Record<string, any>, rules: Record<string, ValidationRule[]>): ValidationResult {
    const allErrors: string[] = [];
    
    Object.entries(rules).forEach(([field, fieldRules]) => {
      const value = data[field];
      
      fieldRules.forEach(rule => {
        if (!rule.validator(value)) {
          allErrors.push(`${field}: ${rule.message}`);
        }
      });
    });

    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }

  /**
   * 建立驗證規則
   */
  createRule(name: string, validator: (value: any) => boolean, message: string): ValidationRule {
    return { name, validator, message };
  }

  /**
   * 常用驗證規則
   */
  get commonRules() {
    return {
      required: this.createRule(
        'required',
        (value: any) => value !== undefined && value !== null && value !== '',
        '此欄位為必填'
      ),
      
      idNumber: this.createRule(
        'idNumber',
        (value: string) => this.validateIdNumber(value).isValid,
        '身分證字號格式錯誤'
      ),
      
      businessNumber: this.createRule(
        'businessNumber',
        (value: string) => this.validateBusinessNumber(value).isValid,
        '統一編號格式錯誤'
      ),
      
      mobile: this.createRule(
        'mobile',
        (value: string) => this.validateMobileNumber(value).isValid,
        '手機號碼格式錯誤'
      ),
      
      phone: this.createRule(
        'phone',
        (value: string) => this.validatePhoneNumber(value).isValid,
        '電話號碼格式錯誤'
      ),
      
      email: this.createRule(
        'email',
        (value: string) => this.validateEmail(value).isValid,
        '電子郵件地址格式錯誤'
      ),
      
      postalCode: this.createRule(
        'postalCode',
        (value: string) => this.validatePostalCode(value).isValid,
        '郵遞區號格式錯誤'
      ),
      
      twdAmount: this.createRule(
        'twdAmount',
        (value: number) => this.validateTWDAmount(value).isValid,
        '金額格式錯誤'
      )
    };
  }

  /**
   * 驗證身分證字號檢查碼
   */
  private validateIdChecksum(idNumber: string): boolean {
    const letterValues: Record<string, number> = {
      'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17,
      'I': 34, 'J': 18, 'K': 19, 'L': 20, 'M': 21, 'N': 22, 'O': 35, 'P': 23,
      'Q': 24, 'R': 25, 'S': 26, 'T': 27, 'U': 28, 'V': 29, 'W': 32, 'X': 30,
      'Y': 31, 'Z': 33
    };

    const firstLetter = idNumber[0];
    const letterValue = letterValues[firstLetter];
    
    if (!letterValue) return false;

    let sum = Math.floor(letterValue / 10) + (letterValue % 10) * 9;
    
    for (let i = 1; i < 9; i++) {
      sum += parseInt(idNumber[i]) * (9 - i);
    }
    
    const checkDigit = parseInt(idNumber[9]);
    return (sum + checkDigit) % 10 === 0;
  }

  /**
   * 驗證統一編號檢查碼
   */
  private validateBusinessNumberChecksum(businessNumber: string): boolean {
    const weights = [1, 2, 1, 2, 1, 2, 4, 1];
    let sum = 0;
    
    for (let i = 0; i < 8; i++) {
      let product = parseInt(businessNumber[i]) * weights[i];
      sum += Math.floor(product / 10) + (product % 10);
    }
    
    return sum % 10 === 0 || (businessNumber[6] === '7' && (sum + 1) % 10 === 0);
  }
}
