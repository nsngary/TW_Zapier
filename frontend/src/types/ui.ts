/**
 * UI 相關類型定義
 */

// ===== 基礎 UI 類型 =====

/**
 * 尺寸類型
 */
export type Size = 'small' | 'medium' | 'large'

/**
 * 顏色類型
 */
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

/**
 * 位置類型
 */
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'center'

/**
 * 對齊方式
 */
export type Alignment = 'left' | 'center' | 'right' | 'justify'

/**
 * 方向類型
 */
export type Direction = 'horizontal' | 'vertical'

// ===== 佈局相關 =====

/**
 * 響應式斷點
 */
export enum Breakpoint {
  XS = 'xs',    // < 576px
  SM = 'sm',    // >= 576px
  MD = 'md',    // >= 768px
  LG = 'lg',    // >= 992px
  XL = 'xl',    // >= 1200px
  XXL = 'xxl'   // >= 1400px
}

/**
 * 網格配置
 */
export interface GridConfig {
  columns: number
  gap: number
  responsive: Partial<Record<Breakpoint, Partial<GridConfig>>>
}

/**
 * 間距配置
 */
export interface SpacingConfig {
  margin?: string | number
  padding?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number
  paddingTop?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number
}

// ===== 主題相關 =====

/**
 * 主題模式
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

/**
 * 主題顏色
 */
export interface ThemeColors {
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  divider: string
}

/**
 * 主題配置
 */
export interface ThemeConfig {
  mode: ThemeMode
  colors: ThemeColors
  typography: TypographyConfig
  spacing: number
  borderRadius: number
  shadows: string[]
  transitions: TransitionConfig
}

/**
 * 字體配置
 */
export interface TypographyConfig {
  fontFamily: string
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  fontWeight: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

/**
 * 過渡動畫配置
 */
export interface TransitionConfig {
  duration: {
    fast: string
    normal: string
    slow: string
  }
  easing: {
    ease: string
    easeIn: string
    easeOut: string
    easeInOut: string
  }
}

// ===== 元件狀態 =====

/**
 * 載入狀態
 */
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

/**
 * 元件狀態
 */
export interface ComponentState {
  loading: boolean
  disabled: boolean
  readonly: boolean
  error: boolean
  focused: boolean
  hovered: boolean
  active: boolean
}

// ===== 表單相關 =====

/**
 * 表單欄位狀態
 */
export interface FieldState {
  value: any
  error: string | null
  touched: boolean
  dirty: boolean
  valid: boolean
}

/**
 * 表單驗證規則
 */
export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  url?: boolean
  custom?: (value: any) => boolean | string
  message?: string
}

/**
 * 表單配置
 */
export interface FormConfig {
  validateOnChange: boolean
  validateOnBlur: boolean
  validateOnSubmit: boolean
  showErrorMessages: boolean
  resetOnSubmit: boolean
}

// ===== 通知相關 =====

/**
 * 通知類型
 */
export enum NotificationType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}

/**
 * 通知位置
 */
export enum NotificationPosition {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right'
}

/**
 * 通知配置
 */
export interface NotificationConfig {
  type: NotificationType
  title?: string
  message: string
  duration?: number
  position?: NotificationPosition
  closable?: boolean
  showIcon?: boolean
  actions?: NotificationAction[]
}

/**
 * 通知動作
 */
export interface NotificationAction {
  label: string
  action: () => void
  type?: 'primary' | 'secondary'
}

// ===== 對話框相關 =====

/**
 * 對話框類型
 */
export enum DialogType {
  ALERT = 'alert',
  CONFIRM = 'confirm',
  PROMPT = 'prompt',
  CUSTOM = 'custom'
}

/**
 * 對話框配置
 */
export interface DialogConfig {
  type: DialogType
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  showClose?: boolean
  persistent?: boolean
  fullscreen?: boolean
  maxWidth?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void
}

// ===== 選單相關 =====

/**
 * 選單項目
 */
export interface MenuItem {
  id: string
  label: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  children?: MenuItem[]
  action?: () => void
  route?: string
  external?: boolean
}

/**
 * 選單配置
 */
export interface MenuConfig {
  items: MenuItem[]
  collapsed?: boolean
  accordion?: boolean
  showIcons?: boolean
  showLabels?: boolean
}

// ===== 表格相關 =====

/**
 * 表格欄位
 */
export interface TableColumn {
  key: string
  label: string
  width?: string | number
  minWidth?: string | number
  sortable?: boolean
  filterable?: boolean
  resizable?: boolean
  align?: Alignment
  fixed?: 'left' | 'right'
  render?: (value: any, row: any, index: number) => any
}

/**
 * 表格配置
 */
export interface TableConfig {
  columns: TableColumn[]
  data: any[]
  loading?: boolean
  pagination?: PaginationConfig
  selection?: SelectionConfig
  sorting?: SortingConfig
  filtering?: FilteringConfig
  rowKey?: string
  showHeader?: boolean
  showFooter?: boolean
  bordered?: boolean
  striped?: boolean
  hoverable?: boolean
}

/**
 * 分頁配置
 */
export interface PaginationConfig {
  page: number
  pageSize: number
  total: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  pageSizes?: number[]
}

/**
 * 選擇配置
 */
export interface SelectionConfig {
  type: 'single' | 'multiple'
  selectedKeys: string[]
  onSelectionChange: (keys: string[]) => void
}

/**
 * 排序配置
 */
export interface SortingConfig {
  field?: string
  order?: 'asc' | 'desc'
  onSortChange: (field: string, order: 'asc' | 'desc') => void
}

/**
 * 篩選配置
 */
export interface FilteringConfig {
  filters: Record<string, any>
  onFilterChange: (filters: Record<string, any>) => void
}

// ===== 圖表相關 =====

/**
 * 圖表類型
 */
export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  DOUGHNUT = 'doughnut',
  AREA = 'area',
  SCATTER = 'scatter'
}

/**
 * 圖表配置
 */
export interface ChartConfig {
  type: ChartType
  data: ChartData
  options?: ChartOptions
  responsive?: boolean
  maintainAspectRatio?: boolean
}

/**
 * 圖表資料
 */
export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

/**
 * 圖表資料集
 */
export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  fill?: boolean
}

/**
 * 圖表選項
 */
export interface ChartOptions {
  plugins?: {
    legend?: {
      display?: boolean
      position?: Position
    }
    tooltip?: {
      enabled?: boolean
    }
  }
  scales?: {
    x?: {
      display?: boolean
      title?: {
        display?: boolean
        text?: string
      }
    }
    y?: {
      display?: boolean
      title?: {
        display?: boolean
        text?: string
      }
    }
  }
}

// ===== 拖拽相關 =====

/**
 * 拖拽事件
 */
export interface DragEvent {
  type: 'start' | 'move' | 'end'
  source: DragSource
  target?: DragTarget
  position: { x: number; y: number }
  data: any
}

/**
 * 拖拽來源
 */
export interface DragSource {
  id: string
  type: string
  element: HTMLElement
  data: any
}

/**
 * 拖拽目標
 */
export interface DragTarget {
  id: string
  type: string
  element: HTMLElement
  accept: string[]
}

// ===== 快捷鍵相關 =====

/**
 * 快捷鍵配置
 */
export interface KeyboardShortcut {
  key: string
  modifiers?: ('ctrl' | 'alt' | 'shift' | 'meta')[]
  description?: string
  action: () => void
  global?: boolean
}
