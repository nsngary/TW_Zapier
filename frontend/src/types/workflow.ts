/**
 * 台灣在地化工作流類型定義
 */

import type { Node, Viewport } from '@vue-flow/core'
import type { User } from './user'

// ===== 工作流基礎類型 =====

/**
 * 工作流狀態
 */
export enum WorkflowStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

/**
 * 工作流觸發類型
 */
export enum WorkflowTriggerType {
  MANUAL = 'manual',
  WEBHOOK = 'webhook',
  SCHEDULE = 'schedule',
  EVENT = 'event'
}

/**
 * 標準工作流定義
 */
export interface StandardWorkflow {
  id: string
  name: string
  description?: string
  status: WorkflowStatus
  triggerType: WorkflowTriggerType
  version: number
  tags: string[]
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  isPublic: boolean
  settings: StandardWorkflowSettings
  statistics: WorkflowStatistics
}

// 台灣節點類型枚舉
export enum TaiwanNodeType {
  // 觸發節點
  MANUAL_TRIGGER = 'manualTrigger',
  WEBHOOK_TRIGGER = 'webhookTrigger',
  SCHEDULE_TRIGGER = 'scheduleTrigger',

  // 台灣金流節點
  LINE_PAY = 'linePay',
  ECPAY = 'ecPay',
  NEWEB_PAY = 'newebPay',
  SPGATEWAY = 'spgateway',

  // 台灣服務節點
  TAOYUAN_AIRPORT = 'taoyuanAirport',
  GOV_OPENDATA = 'govOpenData',
  WEATHER_BUREAU = 'weatherBureau',
  TAIWAN_RAILWAY = 'taiwanRailway',
  HIGH_SPEED_RAIL = 'highSpeedRail',
  HEALTH_INSURANCE = 'healthInsurance',

  // 通用節點
  HTTP_REQUEST = 'httpRequest',
  DATA_TRANSFORM = 'dataTransform',
  CONDITION = 'condition',
  DELAY = 'delay',

  // 通知節點
  LINE_NOTIFY = 'lineNotify',
  EMAIL = 'email',
  SMS = 'sms'
}

// 台灣節點類型聯合類型
export type TaiwanNodeTypeString =
  | 'manualTrigger' | 'webhookTrigger' | 'scheduleTrigger'
  | 'linePay' | 'ecPay' | 'newebPay' | 'spgateway'
  | 'taoyuanAirport' | 'govOpenData' | 'weatherBureau' | 'taiwanRailway' | 'highSpeedRail' | 'healthInsurance'
  | 'httpRequest' | 'dataTransform' | 'condition' | 'delay'
  | 'lineNotify' | 'email' | 'sms'

// 節點資料介面
export interface NodeData {
  label: string
  description?: string
  [key: string]: any
}

// Line Pay 節點資料
export interface LinePayNodeData extends NodeData {
  amount?: number
  productName?: string
  orderId?: string
  confirmUrl?: string
  cancelUrl?: string
  currency?: string
}

// 綠界節點資料
export interface ECPayNodeData extends NodeData {
  merchantTradeNo?: string
  totalAmount?: number
  tradeDesc?: string
  paymentType?: 'aio' | 'credit' | 'atm' | 'cvs'
  returnUrl?: string
  clientBackUrl?: string
}

// 桃機航班節點資料
export interface AirportNodeData extends NodeData {
  flightNumber?: string
  date?: string
  operation?: 'getInfo' | 'getDelay' | 'getGate'
}

// 政府開放資料節點資料
export interface GovOpenDataNodeData extends NodeData {
  dataset?: string
  apiKey?: string
  filters?: Record<string, any>
}

// 台灣節點定義
export interface TaiwanNode extends Node {
  type: TaiwanNodeType
  data: NodeData
}

// 台灣邊線定義
export interface TaiwanEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string | null
  targetHandle?: string | null
  type?: string
  animated?: boolean
  style?: Record<string, any>
  label?: string
  labelStyle?: Record<string, any>
  labelShowBg?: boolean
  labelBgStyle?: Record<string, any>
  labelBgPadding?: [number, number]
  labelBgBorderRadius?: number
  markerStart?: string
  markerEnd?: string
  data?: Record<string, any>
}

// 工作流節點（別名）
export type WorkflowNode = TaiwanNode

// 工作流連線（別名）
export type WorkflowConnection = TaiwanEdge

// 工作流設定
export interface WorkflowSettings {
  autoSave?: boolean
  gridSize?: number
  snapToGrid?: boolean
  showMinimap?: boolean
  showControls?: boolean
  theme?: 'light' | 'dark'
}

// 工作流元資料
export interface WorkflowMetadata {
  createdAt: string
  updatedAt: string
  createdBy: string
  tags?: string[]
  category?: string
}

// 台灣工作流定義
export interface TaiwanWorkflow {
  id: string
  name: string
  description?: string
  version: string
  nodes: TaiwanNode[]
  edges: TaiwanEdge[]
  viewport: Viewport
  settings: WorkflowSettings
  metadata: WorkflowMetadata
}

// 節點面板項目
export interface PaletteNode {
  type: TaiwanNodeType
  label: string
  description: string
  icon: string
  category: NodeCategory
  defaultData: NodeData
}

// 節點分類
export enum NodeCategory {
  TRIGGER = 'trigger',
  PAYMENT = 'payment',
  TAIWAN_SERVICE = 'taiwan-service',
  GENERAL = 'general',
  NOTIFICATION = 'notification'
}

// 工作流資料介面
export interface WorkflowData {
  id: string
  name: string
  description?: string
  category?: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  settings?: Record<string, any>
  isActive?: boolean
  createdAt: string
  updatedAt: string
  createdBy?: string
}

// 標準工作流設定
export interface StandardWorkflowSettings {
  timeout?: number
  retryCount?: number
  errorHandling?: 'stop' | 'continue' | 'retry'
  notifications?: {
    onSuccess?: boolean
    onError?: boolean
    channels?: string[]
  }
}

// 工作流統計
export interface WorkflowStatistics {
  totalExecutions: number
  successfulExecutions: number
  failedExecutions: number
  averageExecutionTime: number
  lastExecutionTime?: string
}

// 節點驗證結果
export interface NodeValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// 工作流驗證結果
export interface WorkflowValidationResult {
  isValid: boolean
  nodeValidations: Record<string, NodeValidationResult>
  globalErrors: string[]
  globalWarnings: string[]
}

// 編輯器狀態
export interface EditorState {
  selectedNodeId?: string
  selectedEdgeId?: string
  isConnecting: boolean
  isDragging: boolean
  clipboard?: {
    nodes: TaiwanNode[]
    edges: TaiwanEdge[]
  }
}

// 編輯器配置
export interface EditorConfig {
  readonly: boolean
  showGrid: boolean
  snapToGrid: boolean
  gridSize: number
  minZoom: number
  maxZoom: number
  defaultZoom: number
}

// 工作流執行狀態
export enum WorkflowExecutionStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  SUCCESS = 'success',
  ERROR = 'error',
  CANCELLED = 'cancelled'
}

// 工作流執行結果
export interface WorkflowExecution {
  id: string
  workflowId: string
  status: WorkflowExecutionStatus
  startTime: string
  endTime?: string
  duration?: number
  nodeExecutions: NodeExecution[]
  error?: string
}

// 節點執行結果
export interface NodeExecution {
  nodeId: string
  status: WorkflowExecutionStatus
  startTime: string
  endTime?: string
  duration?: number
  inputData?: any
  outputData?: any
  error?: string
}

// 匯出/匯入格式
export interface WorkflowExportData {
  workflow: TaiwanWorkflow
  exportedAt: string
  exportedBy: string
  version: string
}

// 模板定義
export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  thumbnail?: string
  workflow: Omit<TaiwanWorkflow, 'id' | 'metadata'>
  usage: {
    downloads: number
    rating: number
    reviews: number
  }
}

// API 回應格式
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 分頁資料
export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 搜尋參數
export interface SearchParams {
  query?: string
  category?: string
  tags?: string[]
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'usage'
  sortOrder?: 'asc' | 'desc'
  page?: number
  pageSize?: number
}

// ===== 工作流基本操作相關類型 =====

// 簡化的工作流資料介面（用於編輯器）
export interface SimpleWorkflowData {
  nodes: Node[]
  edges: any[]
  viewport?: {
    x: number
    y: number
    zoom: number
  }
}

// 工作流儲存資料介面
export interface WorkflowSaveData extends SimpleWorkflowData {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  version: string
}

// 工作流匯出資料介面（重新定義以避免衝突）
export interface WorkflowExportFormat {
  metadata: {
    name: string
    description: string
    version: string
    exportedAt: string
    platform: string
    nodeCount: number
    edgeCount: number
  }
  workflow: SimpleWorkflowData
}

// 驗證錯誤介面
export interface ValidationError {
  id: string
  type: 'structure' | 'node' | 'node-config' | 'connection' | 'logic' | 'taiwan-specific' | 'system'
  severity: 'error' | 'warning'
  message: string
  nodeId?: string
  edgeId?: string
}

// 工作流驗證結果介面（重新定義以避免衝突）
export interface DetailedWorkflowValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
  criticalErrors: ValidationError[]
  nodeCount: number
  edgeCount: number
  validatedAt: string
}
