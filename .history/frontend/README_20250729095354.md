# 台灣在地化流程自動化平台 - 前端

這是台灣在地化流程自動化平台的前端應用程式，使用 Vue 3 + TypeScript + Vite 建構。

## 🚀 技術棧

- **框架**: Vue 3 (Composition API)
- **語言**: TypeScript
- **建構工具**: Vite
- **UI 框架**: Element Plus
- **狀態管理**: Pinia
- **路由**: Vue Router 4
- **樣式**: SCSS
- **工作流編輯器**: Vue Flow
- **HTTP 客戶端**: Axios
- **日期處理**: Day.js
- **工具函數**: Lodash-ES

## 📁 專案結構

```
src/
├── api/                 # API 客戶端
│   ├── auth.ts         # 認證 API
│   ├── user.ts         # 使用者 API
│   └── index.ts        # API 主要匯出
├── assets/             # 靜態資源
├── components/         # 可重用元件
├── composables/        # Vue 組合式函數
│   ├── useAuth.ts      # 認證相關
│   ├── useAsync.ts     # 非同步處理
│   └── index.ts        # 組合式函數匯出
├── router/             # 路由配置
│   └── index.ts        # 路由定義
├── stores/             # Pinia 狀態管理
│   ├── auth.ts         # 認證狀態
│   ├── user.ts         # 使用者狀態
│   ├── workflow.ts     # 工作流狀態
│   ├── node.ts         # 節點狀態
│   ├── ui.ts           # UI 狀態
│   ├── notification.ts # 通知狀態
│   └── index.ts        # Store 匯出
├── styles/             # 樣式檔案
│   ├── variables.scss  # SCSS 變數
│   ├── mixins.scss     # SCSS 混合
│   ├── base.scss       # 基礎樣式
│   ├── layout.scss     # 佈局樣式
│   ├── components.scss # 元件樣式
│   ├── utilities.scss  # 工具類別
│   ├── taiwan.scss     # 台灣特有樣式
│   ├── responsive.scss # 響應式設計
│   ├── themes.scss     # 主題樣式
│   └── index.scss      # 樣式主要匯出
├── types/              # TypeScript 類型定義
│   ├── common.ts       # 共用類型
│   ├── api.ts          # API 相關類型
│   ├── user.ts         # 使用者類型
│   ├── workflow.ts     # 工作流類型
│   ├── node.ts         # 節點類型
│   ├── taiwan.ts       # 台灣特有類型
│   ├── ui.ts           # UI 相關類型
│   └── index.ts        # 類型匯出
├── utils/              # 工具函數
│   ├── common.ts       # 通用工具
│   ├── taiwan.ts       # 台灣特有工具
│   ├── format.ts       # 格式化工具
│   ├── validation.ts   # 驗證工具
│   └── index.ts        # 工具函數匯出
├── views/              # 頁面元件
│   ├── auth/           # 認證相關頁面
│   ├── workflow/       # 工作流頁面
│   ├── node/           # 節點管理頁面
│   ├── user/           # 使用者頁面
│   ├── settings/       # 設定頁面
│   ├── error/          # 錯誤頁面
│   └── HomeView.vue    # 首頁
├── App.vue             # 根元件
└── main.ts             # 應用程式入口
```

## 🛠️ 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 類型檢查
npm run type-check

# 程式碼檢查
npm run lint

# 程式碼格式化
npm run format
```

## 🌟 主要功能

### 🔐 認證系統
- JWT Token 認證
- 自動 Token 重新整理
- 權限管理
- 使用者個人資料管理

### 📊 工作流管理
- 視覺化工作流編輯器
- 拖拽式節點操作
- 工作流執行監控
- 執行歷史記錄

### 🧩 節點系統
- 台灣在地服務節點
- 節點分類管理
- 動態節點載入
- 節點參數配置

### 🎨 UI/UX
- 響應式設計
- 深色/淺色主題
- 台灣在地化樣式
- 無障礙支援

### 🇹🇼 台灣特色
- 繁體中文介面
- 台灣時區處理
- 新台幣格式化
- 台灣身分證/統編驗證
- 台灣地址格式化

## 🔧 配置

### 環境變數

在專案根目錄建立 `.env.local` 檔案：

```env
# 應用程式配置
VITE_APP_TITLE=台灣在地化流程自動化平台
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development

# API 端點
VITE_API_BASE_URL=http://localhost:8000
VITE_N8N_BASE_URL=http://localhost:5678

# 開發工具
VITE_ENABLE_MOCK=false
VITE_ENABLE_DEVTOOLS=true
```

### 代理設定

開發環境下，Vite 會自動代理 API 請求：

- `/api/*` → `http://localhost:8000/*`
- `/n8n/*` → `http://localhost:5678/*`

## 📱 響應式設計

支援以下斷點：

- **xs**: < 576px (手機)
- **sm**: ≥ 576px (大手機)
- **md**: ≥ 768px (平板)
- **lg**: ≥ 992px (桌面)
- **xl**: ≥ 1200px (大桌面)
- **2xl**: ≥ 1600px (超大桌面)

## 🎨 主題系統

支援三種主題模式：

- **light**: 淺色主題
- **dark**: 深色主題
- **auto**: 跟隨系統設定

## 🧪 測試

```bash
# 執行單元測試
npm run test

# 執行測試並產生覆蓋率報告
npm run test:coverage

# 執行 E2E 測試
npm run test:e2e
```

## 📦 建構部署

```bash
# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

建構後的檔案會輸出到 `dist/` 目錄。

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權條款。
