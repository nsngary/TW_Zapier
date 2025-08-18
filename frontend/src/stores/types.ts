/**
 * Store 相關類型定義
 */

import type { 
  User, 
  StandardWorkflow, 
  NodeDefinition, 
  ThemeConfig, 
  NotificationConfig,
  LoadingState,
  StandardError
} from '@/types'

// ===== 使用者 Store 類型 =====

export interface UserState {
  currentUser: User | null
  isAuthenticated: boolean
  permissions: string[]
  preferences: UserPreferences
  loading: LoadingState
  error: StandardError | null
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'zh-TW' | 'zh-CN' | 'en-US'
  timezone: string
  dateFormat: string
  autoSave: boolean
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
  }
}

// ===== 工作流 Store 類型 =====

export interface WorkflowState {
  workflows: StandardWorkflow[]
  currentWorkflow: StandardWorkflow | null
  loading: LoadingState
  error: StandardError | null
  filters: WorkflowFilters
  pagination: {
    page: number
    pageSize: number
    total: number
  }
}

export interface WorkflowFilters {
  search: string
  status: string[]
  tags: string[]
  createdBy: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
}

// ===== 節點 Store 類型 =====

export interface NodeState {
  nodeDefinitions: NodeDefinition[]
  paletteNodes: PaletteNodeGroup[]
  loading: LoadingState
  error: StandardError | null
}

export interface PaletteNodeGroup {
  category: string
  label: string
  nodes: PaletteNodeItem[]
  collapsed: boolean
}

export interface PaletteNodeItem {
  type: string
  label: string
  description: string
  icon: string
  defaultData: Record<string, any>
}

// ===== UI Store 類型 =====

export interface UIState {
  theme: ThemeConfig
  sidebar: SidebarState
  layout: LayoutState
  loading: Record<string, boolean>
  modals: ModalState[]
  breadcrumbs: BreadcrumbItem[]
}

export interface SidebarState {
  collapsed: boolean
  width: number
  activeMenu: string
}

export interface LayoutState {
  headerHeight: number
  footerHeight: number
  contentPadding: number
  showHeader: boolean
  showFooter: boolean
  showSidebar: boolean
}

export interface ModalState {
  id: string
  component: string
  props: Record<string, any>
  persistent: boolean
  fullscreen: boolean
}

export interface BreadcrumbItem {
  label: string
  to?: string
  disabled?: boolean
}

// ===== 認證 Store 類型 =====

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  tokenExpiry: number | null
  isAuthenticated: boolean
  loading: LoadingState
  error: StandardError | null
}

// ===== 通知 Store 類型 =====

export interface NotificationState {
  notifications: NotificationItem[]
  unreadCount: number
  settings: NotificationSettings
}

export interface NotificationItem extends NotificationConfig {
  id: string
  timestamp: string
  read: boolean
}

export interface NotificationSettings {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  duration: number
  maxVisible: number
  showProgress: boolean
  pauseOnHover: boolean
}
