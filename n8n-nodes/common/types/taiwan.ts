/**
 * 台灣特有類型定義
 */

// ===== 基礎台灣資料類型 =====

/**
 * 台灣身分證字號
 */
export type TaiwanIdNumber = string;

/**
 * 台灣統一編號
 */
export type TaiwanBusinessNumber = string;

/**
 * 台灣手機號碼
 */
export type TaiwanMobileNumber = string;

/**
 * 台灣市話號碼
 */
export type TaiwanPhoneNumber = string;

/**
 * 台灣郵遞區號
 */
export type TaiwanPostalCode = string;

/**
 * 新台幣金額（以分為單位）
 */
export type TWDAmount = number;

// ===== 地址相關類型 =====

/**
 * 台灣縣市
 */
export enum TaiwanCity {
  TAIPEI = '台北市',
  NEW_TAIPEI = '新北市',
  TAOYUAN = '桃園市',
  TAICHUNG = '台中市',
  TAINAN = '台南市',
  KAOHSIUNG = '高雄市',
  KEELUNG = '基隆市',
  HSINCHU_CITY = '新竹市',
  CHIAYI_CITY = '嘉義市',
  HSINCHU_COUNTY = '新竹縣',
  MIAOLI = '苗栗縣',
  CHANGHUA = '彰化縣',
  NANTOU = '南投縣',
  YUNLIN = '雲林縣',
  CHIAYI_COUNTY = '嘉義縣',
  PINGTUNG = '屏東縣',
  YILAN = '宜蘭縣',
  HUALIEN = '花蓮縣',
  TAITUNG = '台東縣',
  PENGHU = '澎湖縣',
  KINMEN = '金門縣',
  LIENCHIANG = '連江縣'
}

/**
 * 台灣地址
 */
export interface TaiwanAddress {
  /** 縣市 */
  city: TaiwanCity;
  /** 區域 */
  district: string;
  /** 郵遞區號 */
  postalCode: TaiwanPostalCode;
  /** 詳細地址 */
  address: string;
  /** 完整地址 */
  fullAddress?: string;
}

// ===== 金流相關類型 =====

/**
 * 台灣支付方式
 */
export enum TaiwanPaymentMethod {
  CREDIT_CARD = 'credit_card',
  ATM = 'atm',
  CONVENIENCE_STORE = 'convenience_store',
  LINE_PAY = 'line_pay',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  JKOPAY = 'jkopay',
  EASY_WALLET = 'easy_wallet',
  BANK_TRANSFER = 'bank_transfer'
}

/**
 * 台灣銀行代碼
 */
export enum TaiwanBankCode {
  BOT = '004',      // 台灣銀行
  LAND_BANK = '005', // 土地銀行
  COOPERATIVE = '006', // 合作金庫
  FIRST = '007',    // 第一銀行
  HUANAN = '008',   // 華南銀行
  CHANG_HWA = '009', // 彰化銀行
  SHANGHAI = '011', // 上海銀行
  TAIPEI_FUBON = '012', // 台北富邦
  CATHAY = '013',   // 國泰世華
  CTBC = '822',     // 中信銀行
  ESUN = '808',     // 玉山銀行
  TAISHIN = '812',  // 台新銀行
  SINOPAC = '816'   // 永豐銀行
}

/**
 * 台灣超商代碼
 */
export enum TaiwanConvenienceStore {
  SEVEN_ELEVEN = '7-11',
  FAMILY_MART = 'FamilyMart',
  HI_LIFE = 'Hi-Life',
  OK_MART = 'OK超商'
}

/**
 * 付款資訊
 */
export interface TaiwanPaymentInfo {
  /** 付款方式 */
  method: TaiwanPaymentMethod;
  /** 金額（新台幣分） */
  amount: TWDAmount;
  /** 貨幣代碼 */
  currency: 'TWD';
  /** 訂單編號 */
  orderId: string;
  /** 商品描述 */
  description: string;
  /** 付款人資訊 */
  payer?: TaiwanPersonInfo;
  /** 收款人資訊 */
  payee?: TaiwanBusinessInfo;
  /** 付款期限 */
  expireAt?: Date;
}

// ===== 個人/企業資訊類型 =====

/**
 * 台灣個人資訊
 */
export interface TaiwanPersonInfo {
  /** 姓名 */
  name: string;
  /** 身分證字號 */
  idNumber?: TaiwanIdNumber;
  /** 手機號碼 */
  mobile?: TaiwanMobileNumber;
  /** 電話號碼 */
  phone?: TaiwanPhoneNumber;
  /** 電子郵件 */
  email?: string;
  /** 地址 */
  address?: TaiwanAddress;
  /** 生日 */
  birthday?: Date;
}

/**
 * 台灣企業資訊
 */
export interface TaiwanBusinessInfo {
  /** 公司名稱 */
  name: string;
  /** 統一編號 */
  businessNumber: TaiwanBusinessNumber;
  /** 負責人姓名 */
  representative?: string;
  /** 公司電話 */
  phone?: TaiwanPhoneNumber;
  /** 公司地址 */
  address?: TaiwanAddress;
  /** 電子郵件 */
  email?: string;
  /** 公司網站 */
  website?: string;
}

// ===== 政府服務相關類型 =====

/**
 * 政府機關代碼
 */
export enum TaiwanGovernmentAgency {
  EXECUTIVE_YUAN = 'executive_yuan',
  MINISTRY_OF_INTERIOR = 'ministry_of_interior',
  MINISTRY_OF_FINANCE = 'ministry_of_finance',
  MINISTRY_OF_ECONOMIC_AFFAIRS = 'ministry_of_economic_affairs',
  MINISTRY_OF_TRANSPORTATION = 'ministry_of_transportation',
  MINISTRY_OF_HEALTH = 'ministry_of_health',
  CENTRAL_WEATHER_BUREAU = 'central_weather_bureau',
  TAOYUAN_AIRPORT = 'taoyuan_airport'
}

/**
 * 政府開放資料請求
 */
export interface TaiwanGovDataRequest {
  /** 機關代碼 */
  agency: TaiwanGovernmentAgency;
  /** 資料集 ID */
  datasetId: string;
  /** 資源 ID */
  resourceId?: string;
  /** 查詢參數 */
  params?: Record<string, any>;
  /** API 金鑰 */
  apiKey?: string;
}

// ===== 電商相關類型 =====

/**
 * 台灣電商平台
 */
export enum TaiwanEcommercePlatform {
  SHOPEE = 'shopee',
  MOMO = 'momo',
  PCHOME = 'pchome',
  YAHOO_SHOPPING = 'yahoo_shopping',
  BOOKS_COM_TW = 'books_com_tw',
  FRIDAY_SHOPPING = 'friday_shopping'
}

/**
 * 商品資訊
 */
export interface TaiwanProductInfo {
  /** 商品 ID */
  id: string;
  /** 商品名稱 */
  name: string;
  /** 商品描述 */
  description?: string;
  /** 價格（新台幣分） */
  price: TWDAmount;
  /** 庫存數量 */
  stock?: number;
  /** 商品分類 */
  category?: string;
  /** 商品圖片 */
  images?: string[];
  /** 商品規格 */
  specifications?: Record<string, any>;
}

// ===== 物流相關類型 =====

/**
 * 台灣物流業者
 */
export enum TaiwanLogisticsProvider {
  CHUNGHWA_POST = 'chunghwa_post',
  BLACK_CAT = 'black_cat',
  HSINCHU_LOGISTICS = 'hsinchu_logistics',
  KERRY_TJ = 'kerry_tj',
  SEVEN_ELEVEN_LOGISTICS = 'seven_eleven_logistics',
  FAMILY_MART_LOGISTICS = 'family_mart_logistics'
}

/**
 * 物流資訊
 */
export interface TaiwanShippingInfo {
  /** 物流業者 */
  provider: TaiwanLogisticsProvider;
  /** 追蹤號碼 */
  trackingNumber: string;
  /** 寄件地址 */
  senderAddress: TaiwanAddress;
  /** 收件地址 */
  receiverAddress: TaiwanAddress;
  /** 寄件人資訊 */
  sender: TaiwanPersonInfo;
  /** 收件人資訊 */
  receiver: TaiwanPersonInfo;
  /** 運費（新台幣分） */
  shippingFee?: TWDAmount;
  /** 預計送達時間 */
  estimatedDelivery?: Date;
}

// ===== 時間相關類型 =====

/**
 * 台灣時區
 */
export const TAIWAN_TIMEZONE = 'Asia/Taipei';

/**
 * 台灣日期格式
 */
export enum TaiwanDateFormat {
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYY_MM_DD_HH_MM = 'YYYY-MM-DD HH:mm',
  YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',
  MM_DD_YYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD/MM/YYYY'
}

// ===== 驗證規則類型 =====

/**
 * 台灣資料驗證規則
 */
export interface TaiwanValidationRules {
  /** 身分證字號驗證 */
  idNumber: boolean;
  /** 統一編號驗證 */
  businessNumber: boolean;
  /** 手機號碼驗證 */
  mobile: boolean;
  /** 電話號碼驗證 */
  phone: boolean;
  /** 郵遞區號驗證 */
  postalCode: boolean;
  /** 地址驗證 */
  address: boolean;
}
