import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhTw from 'element-plus/es/locale/lang/zh-tw'

import App from './App.vue'
import router from './router'
import { pinia } from './stores'

// 導入樣式
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import '@vue-flow/minimap/dist/style.css'
import '@vue-flow/node-resizer/dist/style.css'
import './styles/index.scss'

// 建立 Vue 應用程式
const app = createApp(App)

// 註冊 Element Plus 圖示
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 安裝插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhTw,
  size: 'default'
})

// 全域錯誤處理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue 應用程式錯誤:', err)
  console.error('錯誤資訊:', info)

  // 在開發環境中顯示詳細錯誤
  if (import.meta.env.DEV) {
    console.error('Vue 實例:', vm)
  }

  // 這裡可以添加錯誤回報服務
  // errorReportingService.report(err, { vm, info })
}

// 全域警告處理
app.config.warnHandler = (msg, vm, trace) => {
  if (import.meta.env.DEV) {
    console.warn('Vue 警告:', msg)
    console.warn('追蹤:', trace)
  }
}

// 掛載應用程式
app.mount('#app')
