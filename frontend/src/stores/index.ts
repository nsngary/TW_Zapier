/**
 * Pinia 狀態管理匯出
 */

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

// 建立 Pinia 實例
export const pinia = createPinia()

// 添加持久化插件
pinia.use(createPersistedState({
  storage: localStorage,
  serializer: {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }
}))

// 匯出所有 stores
export { useUserStore } from './user'
export { useWorkflowStore } from './workflow'
export { useNodeStore } from './node'
export { useUIStore } from './ui'
export { useAuthStore } from './auth'
export { useNotificationStore } from './notification'

// 匯出類型
export type * from './types'
