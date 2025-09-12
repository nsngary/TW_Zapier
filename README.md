# 台灣在地化流程自動化平台 (TW Zapier)

> 專為台灣情境量身訂做的可視化低程式碼流程自動化平台

## 📋 專案概述

本專案旨在打造一個專為台灣企業設計的流程自動化平台，整合台灣在地金流服務（Line Pay、綠界ECPay）、政府開放資料、航班資訊等常用API，讓非技術背景的使用者也能透過拖拉式介面快速建立自動化工作流程。

### 🎯 核心特色

- **🇹🇼 台灣在地化** - 深度整合Line Pay、綠界、桃機航班等台灣常用服務
- **🎨 拖拉式介面** - 零程式背景也能10分鐘內建立自動化流程
- **🔒 私有化部署** - 支援Docker和Kubernetes，確保資料主權
- **📊 即時監控** - 完整的執行狀態追蹤和視覺化儀表板
- **🔧 易於擴展** - 模組化節點架構，30分鐘內可開發新節點

## 🏗️ 技術架構

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Vue 3 前端    │    │  FastAPI 後端   │    │  PostgreSQL DB  │
│   拖拉式編輯器    │◄──►│    工作流管理     │◄──►│   資料持久化    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 ▼
                    ┌─────────────────┐
                    │    n8n 引擎      │
                    │    工作流執行     │
                    └─────────────────┘
```

### 技術選型

- **前端**: Vue 3 + TypeScript + Vite + Element Plus
- **後端**: FastAPI + SQLAlchemy + PostgreSQL
- **工作流引擎**: n8n (自定義節點)
- **容器化**: Docker + Docker Compose
- **監控**: Prometheus + Grafana
- **部署**: Kubernetes + Helm

## 📁 專案結構

```
TW_Zapier/
├── frontend/                 # Vue 3 前端應用
│   ├── src/
│   │   ├── components/      # 可重用組件
│   │   ├── views/          # 頁面組件
│   │   ├── stores/         # Pinia 狀態管理
│   │   ├── router/         # Vue Router 路由
│   │   └── utils/          # 工具函數
│   ├── public/             # 靜態資源
│   └── package.json
├── backend/                  # FastAPI 後端服務
│   ├── app/
│   │   ├── api/            # API 路由
│   │   ├── models/         # SQLAlchemy 模型
│   │   ├── schemas/        # Pydantic 模式
│   │   ├── services/       # 業務邏輯
│   │   └── core/           # 核心配置
│   ├── alembic/            # 資料庫遷移
│   └── requirements.txt
├── database/                 # 資料庫相關
│   ├── init/               # 初始化腳本
│   └── migrations/         # 遷移檔案
├── n8n-nodes/               # 自定義 n8n 節點
│   ├── taiwan-nodes/       # 台灣在地服務節點
│   │   ├── LinePay/        # Line Pay 節點
│   │   ├── ECPay/          # 綠界科技節點
│   │   ├── TaoyuanAirport/ # 桃機航班節點
│   │   └── GovOpenData/    # 政府開放資料節點
│   └── common/             # 共用節點 SDK
├── deploy/                   # 部署配置
│   ├── docker/             # Docker 配置
│   ├── kubernetes/         # K8s 部署檔案
│   └── monitoring/         # 監控配置
├── docs/                     # 專案文件
│   ├── api/                # API 文件
│   ├── deployment/         # 部署指南
│   └── user-guide/         # 使用者手冊
├── tests/                    # 測試檔案
│   ├── frontend/           # 前端測試
│   ├── backend/            # 後端測試
│   └── integration/        # 整合測試
├── scripts/                  # 工具腳本
│   ├── setup.sh            # 環境設置
│   └── deploy.sh           # 部署腳本
├── .env.example             # 環境變數範例
├── .gitignore              # Git 忽略檔案
├── docker-compose.yml      # Docker Compose 配置
└── README.md               # 專案說明
```

## 🚀 快速開始

### 環境需求

- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 14+

### 本地開發環境設置

1. **克隆專案**
```bash
git clone <repository-url>
cd TW_Zapier
```

2. **環境變數設置**
```bash
cp .env.example .env
# 編輯 .env 檔案，填入必要的配置
```

3. **啟動開發環境**
```bash
# 使用 Docker Compose 一鍵啟動所有服務
docker-compose up -d

# 或分別啟動各服務
./scripts/setup.sh
```

4. **訪問應用**
- 前端應用: http://localhost:3000
- 後端API: http://localhost:8000
- n8n編輯器: http://localhost:5678
- 監控面板: http://localhost:3001

## 📦 核心功能模組

### 🎨 拖拉式工作流編輯器
- 直觀的節點拖拉介面
- 即時連線驗證
- 節點屬性配置
- 工作流預覽和測試

### 🇹🇼 台灣在地服務節點
- **Line Pay**: 付款請求、狀態查詢、Webhook處理
- **綠界ECPay**: 信用卡、ATM、超商付款
- **桃機航班**: 即時航班資訊、延誤通知
- **政府開放資料**: 常用公共資訊API整合

### 📊 監控與管理
- 工作流執行狀態追蹤
- 效能指標監控
- 錯誤日誌管理
- 自動告警通知

## 🔧 開發指南

### 新增自定義節點

1. 在 `n8n-nodes/taiwan-nodes/` 建立新節點資料夾
2. 實作節點邏輯，繼承共用SDK
3. 註冊節點到n8n系統
4. 編寫單元測試

詳細開發指南請參考 [docs/development/](docs/development/)

