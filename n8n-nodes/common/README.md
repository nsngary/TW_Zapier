# 台灣在地服務節點 SDK

## 📦 概述

這是專為台灣在地服務設計的 n8n 節點開發 SDK，提供統一的基礎架構和工具，簡化台灣在地服務節點的開發流程。

## 🏗️ 架構設計

### 核心組件

```
common/
├── core/                   # 核心基礎類別
│   ├── BaseNode.ts        # 節點基礎類別
│   ├── BaseTriggerNode.ts # 觸發節點基礎類別
│   └── NodeRegistry.ts    # 節點註冊管理
├── auth/                   # 認證機制
│   ├── AuthManager.ts     # 認證管理器
│   ├── HmacAuth.ts        # HMAC 認證
│   ├── OAuth2Auth.ts      # OAuth2 認證
│   └── ApiKeyAuth.ts      # API Key 認證
├── http/                   # HTTP 客戶端
│   ├── TaiwanApiClient.ts # 台灣 API 客戶端
│   ├── RequestBuilder.ts  # 請求建構器
│   └── ResponseHandler.ts # 回應處理器
├── utils/                  # 工具函數
│   ├── taiwan.ts          # 台灣特有工具
│   ├── datetime.ts        # 時間處理
│   ├── currency.ts        # 貨幣處理
│   └── logger.ts          # 日誌記錄
├── types/                  # 類型定義
│   ├── common.ts          # 共用類型
│   ├── auth.ts            # 認證類型
│   ├── api.ts             # API 類型
│   └── taiwan.ts          # 台灣特有類型
├── validators/             # 驗證器
│   ├── TaiwanValidator.ts # 台灣資料驗證
│   ├── ParameterValidator.ts # 參數驗證
│   └── SchemaValidator.ts # Schema 驗證
├── testing/                # 測試工具
│   ├── MockClient.ts      # 模擬客戶端
│   ├── TestHelper.ts      # 測試輔助
│   └── fixtures/          # 測試資料
└── index.ts               # 主要匯出
```

## 🎯 設計原則

### 1. 台灣在地化優先
- 繁體中文介面支援
- 台灣時區自動處理
- 新台幣貨幣格式
- 台灣特有資料格式驗證

### 2. 統一的開發體驗
- 一致的 API 設計
- 標準化的錯誤處理
- 統一的日誌格式
- 共用的測試工具

### 3. 高度可擴展
- 模組化架構設計
- 插件式認證機制
- 可配置的 HTTP 客戶端
- 靈活的驗證器系統

## 🚀 快速開始

### 建立新節點

```typescript
import { BaseNode, TaiwanApiClient } from '../common';

export class MyTaiwanServiceNode extends BaseNode {
  description = {
    displayName: '我的台灣服務',
    name: 'myTaiwanService',
    group: ['taiwan'],
    version: 1,
    description: '台灣在地服務整合',
    // ... 其他配置
  };

  async execute(context: IExecuteFunctions) {
    const client = new TaiwanApiClient({
      baseUrl: 'https://api.example.tw',
      auth: this.getAuthConfig(context)
    });

    // 實作節點邏輯
    return await this.processItems(context, async (item, index) => {
      const result = await client.post('/api/endpoint', item.json);
      return { json: result };
    });
  }
}
```

### 使用認證管理

```typescript
import { AuthManager, HmacAuth } from '../common/auth';

const authManager = new AuthManager();
authManager.register('hmac', new HmacAuth());

const auth = authManager.create('hmac', {
  key: 'your-secret-key',
  algorithm: 'sha256'
});
```

## 📋 支援的服務類型

### 金流服務
- Line Pay
- 綠界科技 (ECPay)
- 藍新金流
- 智付通

### 政府服務
- 政府開放資料平台
- 桃園機場航班資訊
- 中央氣象局
- 健保署 API

### 電商服務
- 91APP
- SHOPLINE
- Cyberbiz
- EasyStore

## 🧪 測試支援

SDK 提供完整的測試工具：

```typescript
import { TestHelper, MockClient } from '../common/testing';

describe('MyTaiwanServiceNode', () => {
  let testHelper: TestHelper;
  let mockClient: MockClient;

  beforeEach(() => {
    testHelper = new TestHelper();
    mockClient = new MockClient();
  });

  it('should process payment correctly', async () => {
    mockClient.mockResponse('/api/payment', { success: true });
    
    const result = await testHelper.executeNode(MyTaiwanServiceNode, {
      parameters: { amount: 1000 },
      credentials: { apiKey: 'test-key' }
    });

    expect(result[0].json.success).toBe(true);
  });
});
```

## 📚 文件

- [節點開發指南](./docs/node-development.md)
- [認證機制說明](./docs/authentication.md)
- [API 客戶端使用](./docs/api-client.md)
- [測試最佳實務](./docs/testing.md)
- [台灣在地化功能](./docs/taiwan-features.md)

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支
3. 撰寫測試
4. 提交 Pull Request

## 📄 授權

MIT License
