/**
 * 台灣特有工具函數
 */

import { 
  TaiwanCity, 
  TaiwanAddress, 
  TWDAmount, 
  TaiwanDateFormat,
  TAIWAN_TIMEZONE,
  TaiwanPaymentMethod,
  TaiwanBankCode,
  TaiwanConvenienceStore
} from '../types/taiwan';

/**
 * 台灣工具類別
 */
export class TaiwanUtils {
  
  /**
   * 格式化新台幣金額
   */
  static formatTWDAmount(amount: TWDAmount, options?: {
    showCurrency?: boolean;
    showDecimals?: boolean;
    locale?: string;
  }): string {
    const opts = {
      showCurrency: true,
      showDecimals: false,
      locale: 'zh-TW',
      ...options
    };

    // 將分轉換為元
    const amountInDollars = amount / 100;
    
    const formatter = new Intl.NumberFormat(opts.locale, {
      style: opts.showCurrency ? 'currency' : 'decimal',
      currency: 'TWD',
      minimumFractionDigits: opts.showDecimals ? 2 : 0,
      maximumFractionDigits: opts.showDecimals ? 2 : 0
    });

    return formatter.format(amountInDollars);
  }

  /**
   * 解析新台幣金額字串為分
   */
  static parseTWDAmount(amountString: string): TWDAmount {
    // 移除貨幣符號、逗號和空格
    const cleanAmount = amountString
      .replace(/[NT$\$,\s]/g, '')
      .replace(/元/g, '');
    
    const amount = parseFloat(cleanAmount);
    
    if (isNaN(amount)) {
      throw new Error(`無效的金額格式: ${amountString}`);
    }
    
    // 轉換為分
    return Math.round(amount * 100);
  }

  /**
   * 格式化台灣日期時間
   */
  static formatTaiwanDateTime(
    date: Date, 
    format: TaiwanDateFormat = TaiwanDateFormat.YYYY_MM_DD_HH_MM_SS,
    options?: {
      useRepublicYear?: boolean;
      showWeekday?: boolean;
    }
  ): string {
    const opts = {
      useRepublicYear: false,
      showWeekday: false,
      ...options
    };

    // 轉換為台灣時區
    const taiwanDate = new Date(date.toLocaleString('en-US', { timeZone: TAIWAN_TIMEZONE }));
    
    let year = taiwanDate.getFullYear();
    const month = taiwanDate.getMonth() + 1;
    const day = taiwanDate.getDate();
    const hour = taiwanDate.getHours();
    const minute = taiwanDate.getMinutes();
    const second = taiwanDate.getSeconds();

    // 民國年轉換
    if (opts.useRepublicYear) {
      year = year - 1911;
    }

    const pad = (num: number, length: number = 2): string => 
      num.toString().padStart(length, '0');

    let formatted = '';
    
    switch (format) {
      case TaiwanDateFormat.YYYY_MM_DD:
        formatted = `${year}-${pad(month)}-${pad(day)}`;
        break;
      case TaiwanDateFormat.YYYY_MM_DD_HH_MM:
        formatted = `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}`;
        break;
      case TaiwanDateFormat.YYYY_MM_DD_HH_MM_SS:
        formatted = `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
        break;
      case TaiwanDateFormat.MM_DD_YYYY:
        formatted = `${pad(month)}/${pad(day)}/${year}`;
        break;
      case TaiwanDateFormat.DD_MM_YYYY:
        formatted = `${pad(day)}/${pad(month)}/${year}`;
        break;
      default:
        formatted = taiwanDate.toISOString();
    }

    // 添加星期
    if (opts.showWeekday) {
      const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
      const weekday = weekdays[taiwanDate.getDay()];
      formatted += ` (${weekday})`;
    }

    return formatted;
  }

  /**
   * 解析台灣日期字串
   */
  static parseTaiwanDate(dateString: string, isRepublicYear: boolean = false): Date {
    // 移除星期資訊
    const cleanDateString = dateString.replace(/\s*\([日一二三四五六]\)\s*$/, '');
    
    let parsedDate: Date;
    
    if (isRepublicYear) {
      // 處理民國年
      const republicYearMatch = cleanDateString.match(/^(\d{2,3})-(\d{1,2})-(\d{1,2})/);
      if (republicYearMatch) {
        const republicYear = parseInt(republicYearMatch[1]);
        const month = parseInt(republicYearMatch[2]);
        const day = parseInt(republicYearMatch[3]);
        const westernYear = republicYear + 1911;
        
        parsedDate = new Date(westernYear, month - 1, day);
      } else {
        throw new Error(`無效的民國年日期格式: ${dateString}`);
      }
    } else {
      parsedDate = new Date(cleanDateString);
    }
    
    if (isNaN(parsedDate.getTime())) {
      throw new Error(`無效的日期格式: ${dateString}`);
    }
    
    return parsedDate;
  }

  /**
   * 格式化台灣地址
   */
  static formatTaiwanAddress(address: TaiwanAddress): string {
    return `${address.postalCode} ${address.city}${address.district}${address.address}`;
  }

  /**
   * 解析台灣地址
   */
  static parseTaiwanAddress(addressString: string): Partial<TaiwanAddress> {
    // 簡單的地址解析邏輯
    const postalCodeMatch = addressString.match(/^(\d{3,5})\s*/);
    const postalCode = postalCodeMatch ? postalCodeMatch[1] : '';
    
    const remainingAddress = addressString.replace(/^\d{3,5}\s*/, '');
    
    // 尋找縣市
    let city: TaiwanCity | undefined;
    let district = '';
    let address = remainingAddress;
    
    for (const taiwanCity of Object.values(TaiwanCity)) {
      if (remainingAddress.startsWith(taiwanCity)) {
        city = taiwanCity;
        const afterCity = remainingAddress.substring(taiwanCity.length);
        
        // 尋找區域
        const districtMatch = afterCity.match(/^([^0-9]+)/);
        if (districtMatch) {
          district = districtMatch[1];
          address = afterCity.substring(district.length);
        }
        break;
      }
    }
    
    return {
      postalCode,
      city,
      district,
      address: address.trim(),
      fullAddress: addressString
    };
  }

  /**
   * 格式化身分證字號
   */
  static formatIdNumber(idNumber: string): string {
    const clean = idNumber.replace(/\s/g, '').toUpperCase();
    if (clean.length === 10) {
      return `${clean.substring(0, 1)}${clean.substring(1, 3)} ${clean.substring(3, 6)} ${clean.substring(6, 10)}`;
    }
    return clean;
  }

  /**
   * 格式化統一編號
   */
  static formatBusinessNumber(businessNumber: string): string {
    const clean = businessNumber.replace(/\s/g, '');
    if (clean.length === 8) {
      return `${clean.substring(0, 2)}-${clean.substring(2, 8)}`;
    }
    return clean;
  }

  /**
   * 格式化手機號碼
   */
  static formatMobileNumber(mobile: string): string {
    const clean = mobile.replace(/[\s-]/g, '');
    if (clean.length === 10 && clean.startsWith('09')) {
      return `${clean.substring(0, 4)}-${clean.substring(4, 7)}-${clean.substring(7, 10)}`;
    }
    return clean;
  }

  /**
   * 格式化市話號碼
   */
  static formatPhoneNumber(phone: string): string {
    const clean = phone.replace(/[\s\-()]/g, '');
    
    if (clean.length >= 8) {
      // 台北、高雄等直轄市 (02, 07)
      if (clean.startsWith('02') || clean.startsWith('07')) {
        return `(${clean.substring(0, 2)}) ${clean.substring(2, 6)}-${clean.substring(6)}`;
      }
      // 其他縣市 (03, 04, 05, 06, 08, 089)
      else if (clean.startsWith('0')) {
        const areaCode = clean.startsWith('089') ? '089' : clean.substring(0, 3);
        const number = clean.substring(areaCode.length);
        const numberPart1 = number.substring(0, 3);
        const numberPart2 = number.substring(3);
        return `(${areaCode}) ${numberPart1}-${numberPart2}`;
      }
    }
    
    return clean;
  }

  /**
   * 取得支付方式顯示名稱
   */
  static getPaymentMethodDisplayName(method: TaiwanPaymentMethod): string {
    const displayNames: Record<TaiwanPaymentMethod, string> = {
      [TaiwanPaymentMethod.CREDIT_CARD]: '信用卡',
      [TaiwanPaymentMethod.ATM]: 'ATM轉帳',
      [TaiwanPaymentMethod.CONVENIENCE_STORE]: '超商代碼',
      [TaiwanPaymentMethod.LINE_PAY]: 'LINE Pay',
      [TaiwanPaymentMethod.APPLE_PAY]: 'Apple Pay',
      [TaiwanPaymentMethod.GOOGLE_PAY]: 'Google Pay',
      [TaiwanPaymentMethod.JKOPAY]: '街口支付',
      [TaiwanPaymentMethod.EASY_WALLET]: '悠遊付',
      [TaiwanPaymentMethod.BANK_TRANSFER]: '銀行轉帳'
    };
    
    return displayNames[method] || method;
  }

  /**
   * 取得銀行名稱
   */
  static getBankName(bankCode: TaiwanBankCode): string {
    const bankNames: Record<TaiwanBankCode, string> = {
      [TaiwanBankCode.BOT]: '臺灣銀行',
      [TaiwanBankCode.LAND_BANK]: '臺灣土地銀行',
      [TaiwanBankCode.COOPERATIVE]: '合作金庫商業銀行',
      [TaiwanBankCode.FIRST]: '第一商業銀行',
      [TaiwanBankCode.HUANAN]: '華南商業銀行',
      [TaiwanBankCode.CHANG_HWA]: '彰化商業銀行',
      [TaiwanBankCode.SHANGHAI]: '上海商業儲蓄銀行',
      [TaiwanBankCode.TAIPEI_FUBON]: '台北富邦銀行',
      [TaiwanBankCode.CATHAY]: '國泰世華銀行',
      [TaiwanBankCode.CTBC]: '中國信託商業銀行',
      [TaiwanBankCode.ESUN]: '玉山商業銀行',
      [TaiwanBankCode.TAISHIN]: '台新國際商業銀行',
      [TaiwanBankCode.SINOPAC]: '永豐商業銀行'
    };
    
    return bankNames[bankCode] || bankCode;
  }

  /**
   * 取得超商名稱
   */
  static getConvenienceStoreName(store: TaiwanConvenienceStore): string {
    const storeNames: Record<TaiwanConvenienceStore, string> = {
      [TaiwanConvenienceStore.SEVEN_ELEVEN]: '7-ELEVEN',
      [TaiwanConvenienceStore.FAMILY_MART]: '全家便利商店',
      [TaiwanConvenienceStore.HI_LIFE]: '萊爾富',
      [TaiwanConvenienceStore.OK_MART]: 'OK超商'
    };
    
    return storeNames[store] || store;
  }

  /**
   * 產生台灣時間戳
   */
  static generateTaiwanTimestamp(): string {
    return this.formatTaiwanDateTime(new Date(), TaiwanDateFormat.YYYY_MM_DD_HH_MM_SS);
  }

  /**
   * 產生隨機訂單編號
   */
  static generateOrderId(prefix: string = 'TW'): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  }

  /**
   * 檢查是否為台灣工作日
   */
  static isTaiwanWorkingDay(date: Date): boolean {
    const taiwanDate = new Date(date.toLocaleString('en-US', { timeZone: TAIWAN_TIMEZONE }));
    const dayOfWeek = taiwanDate.getDay();
    
    // 0 = 星期日, 6 = 星期六
    return dayOfWeek >= 1 && dayOfWeek <= 5;
  }

  /**
   * 取得下一個台灣工作日
   */
  static getNextTaiwanWorkingDay(date: Date): Date {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    while (!this.isTaiwanWorkingDay(nextDay)) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    
    return nextDay;
  }

  /**
   * 計算台灣工作日差異
   */
  static calculateTaiwanWorkingDays(startDate: Date, endDate: Date): number {
    let workingDays = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      if (this.isTaiwanWorkingDay(currentDate)) {
        workingDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return workingDays;
  }
}
