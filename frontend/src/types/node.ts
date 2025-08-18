/**
 * 節點相關類型定義
 */

// ===== 節點基礎類型 =====

/**
 * 節點類型
 */
export enum NodeType {
  // 觸發節點
  MANUAL_TRIGGER = 'manualTrigger',
  WEBHOOK_TRIGGER = 'webhookTrigger',
  SCHEDULE_TRIGGER = 'scheduleTrigger',
  EMAIL_TRIGGER = 'emailTrigger',
  
  // 台灣金流節點
  LINE_PAY = 'linePay',
  ECPAY = 'ecPay',
  NEWEBPAY = 'newebPay',
  SPGATEWAY = 'spgateway',
  
  // 台灣政府服務節點
  TAOYUAN_AIRPORT = 'taoyuanAirport',
  GOV_OPENDATA = 'govOpenData',
  WEATHER_BUREAU = 'weatherBureau',
  HEALTH_INSURANCE = 'healthInsurance',
  
  // 台灣電商節點
  SHOPEE = 'shopee',
  MOMO = 'momo',
  PCHOME = 'pchome',
  YAHOO_SHOPPING = 'yahooShopping',
  
  // 通用節點
  HTTP_REQUEST = 'httpRequest',
  SET_DATA = 'setData',
  CONDITION = 'condition',
  LOOP = 'loop',
  MERGE = 'merge',
  SPLIT = 'split',
  
  // 通知節點
  LINE_NOTIFY = 'lineNotify',
  EMAIL = 'email',
  SLACK = 'slack',
  DISCORD = 'discord',
  
  // 資料處理節點
  JSON_PARSER = 'jsonParser',
  XML_PARSER = 'xmlParser',
  CSV_PARSER = 'csvParser',
  DATA_TRANSFORMER = 'dataTransformer',
  
  // 儲存節點
  DATABASE = 'database',
  FILE_STORAGE = 'fileStorage',
  GOOGLE_SHEETS = 'googleSheets',
  AIRTABLE = 'airtable'
}

/**
 * 節點狀態
 */
export enum NodeStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  DISABLED = 'disabled'
}

/**
 * 節點分類
 */
export enum NodeCategory {
  TRIGGER = 'trigger',
  PAYMENT = 'payment',
  TAIWAN_SERVICE = 'taiwanService',
  ECOMMERCE = 'ecommerce',
  GENERAL = 'general',
  NOTIFICATION = 'notification',
  DATA_PROCESSING = 'dataProcessing',
  STORAGE = 'storage'
}

/**
 * 節點定義
 */
export interface NodeDefinition {
  id: string
  type: NodeType
  name: string
  displayName: string
  description: string
  category: NodeCategory
  icon: string
  color: string
  version: string
  properties: NodeProperty[]
  credentials?: CredentialDefinition[]
  inputs: NodeInput[]
  outputs: NodeOutput[]
  documentation?: string
  examples?: NodeExample[]
}

/**
 * 節點屬性
 */
export interface NodeProperty {
  name: string
  displayName: string
  type: PropertyType
  required: boolean
  default?: any
  description?: string
  placeholder?: string
  options?: PropertyOption[]
  validation?: PropertyValidation
  displayOptions?: DisplayOptions
}

/**
 * 屬性類型
 */
export enum PropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  MULTI_SELECT = 'multiSelect',
  JSON = 'json',
  DATE = 'date',
  TIME = 'time',
  DATETIME = 'datetime',
  FILE = 'file',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  CODE = 'code',
  COLLECTION = 'collection'
}

/**
 * 屬性選項
 */
export interface PropertyOption {
  name: string
  value: any
  description?: string
}

/**
 * 屬性驗證
 */
export interface PropertyValidation {
  min?: number
  max?: number
  pattern?: string
  custom?: string
}

/**
 * 顯示選項
 */
export interface DisplayOptions {
  show?: Record<string, any[]>
  hide?: Record<string, any[]>
}

/**
 * 認證定義
 */
export interface CredentialDefinition {
  name: string
  displayName: string
  required: boolean
  properties: CredentialProperty[]
}

/**
 * 認證屬性
 */
export interface CredentialProperty {
  name: string
  displayName: string
  type: PropertyType
  required: boolean
  secret?: boolean
  description?: string
}

/**
 * 節點輸入
 */
export interface NodeInput {
  name: string
  displayName: string
  type: string
  required: boolean
  maxConnections?: number
}

/**
 * 節點輸出
 */
export interface NodeOutput {
  name: string
  displayName: string
  type: string
}

/**
 * 節點範例
 */
export interface NodeExample {
  name: string
  description: string
  workflow: any
}

// ===== 節點執行相關 =====

/**
 * 節點執行資料
 */
export interface NodeExecutionData {
  json: Record<string, any>
  binary?: Record<string, BinaryData>
  pairedItem?: PairedItem
}

/**
 * 二進位資料
 */
export interface BinaryData {
  data: string
  mimeType: string
  fileName?: string
  fileExtension?: string
  fileSize?: number
}

/**
 * 配對項目
 */
export interface PairedItem {
  item: number
  input?: number
}

/**
 * 節點執行上下文
 */
export interface NodeExecutionContext {
  nodeId: string
  nodeName: string
  nodeType: NodeType
  executionId: string
  workflowId: string
  userId: string
  inputData: NodeExecutionData[]
  parameters: Record<string, any>
  credentials: Record<string, any>
  settings: NodeExecutionSettings
}

/**
 * 節點執行設定
 */
export interface NodeExecutionSettings {
  continueOnFail: boolean
  retryOnFail: boolean
  maxRetries: number
  retryInterval: number
  timeout: number
}

/**
 * 節點執行結果
 */
export interface NodeExecutionResult {
  success: boolean
  data?: NodeExecutionData[]
  error?: NodeExecutionError
  executionTime: number
  metadata?: Record<string, any>
}

/**
 * 節點執行錯誤
 */
export interface NodeExecutionError {
  message: string
  description?: string
  cause?: string
  stack?: string
  httpCode?: number
  timestamp: string
}

// ===== 台灣特有節點資料 =====

/**
 * Line Pay 節點資料
 */
export interface LinePayNodeData {
  operation: 'request' | 'confirm' | 'refund' | 'check'
  channelId: string
  channelSecret: string
  amount?: number
  currency: 'TWD' | 'USD' | 'JPY'
  orderId: string
  productName?: string
  productImageUrl?: string
  confirmUrl?: string
  cancelUrl?: string
  sandbox: boolean
}

/**
 * ECPay 節點資料
 */
export interface ECPayNodeData {
  operation: 'payment' | 'query' | 'refund'
  merchantId: string
  hashKey: string
  hashIV: string
  merchantTradeNo: string
  totalAmount?: number
  tradeDesc?: string
  paymentType: 'aio' | 'credit' | 'atm' | 'cvs' | 'barcode'
  returnUrl?: string
  clientBackUrl?: string
  testMode: boolean
}

/**
 * 桃機航班節點資料
 */
export interface AirportNodeData {
  operation: 'departure' | 'arrival' | 'flight_info' | 'gate_info'
  flightNumber?: string
  airline?: string
  date?: string
  terminal?: string
  apiKey?: string
}

/**
 * 政府開放資料節點資料
 */
export interface GovOpenDataNodeData {
  operation: 'get_data' | 'search' | 'download'
  dataset: string
  resourceId?: string
  apiKey?: string
  format: 'json' | 'xml' | 'csv'
  limit?: number
  offset?: number
  filters?: Record<string, any>
}

// ===== 節點面板相關 =====

/**
 * 節點面板項目
 */
export interface PaletteNode {
  type: NodeType
  label: string
  description: string
  icon: string
  category: NodeCategory
  defaultData: Record<string, any>
  tags: string[]
}

/**
 * 節點面板分類
 */
export interface PaletteCategory {
  name: NodeCategory
  displayName: string
  description: string
  icon: string
  nodes: PaletteNode[]
  collapsed?: boolean
}

// ===== 節點驗證相關 =====

/**
 * 節點驗證結果
 */
export interface NodeValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

/**
 * 驗證錯誤
 */
export interface ValidationError {
  property: string
  message: string
  value?: any
}

/**
 * 驗證警告
 */
export interface ValidationWarning {
  property: string
  message: string
  value?: any
}
