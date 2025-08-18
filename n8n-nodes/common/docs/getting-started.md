# 台灣在地服務節點 SDK 快速開始指南

## 📋 概述

台灣在地服務節點 SDK 是專為台灣情境設計的 n8n 節點開發框架，提供統一的基礎架構和工具，簡化台灣在地服務節點的開發流程。

## 🚀 快速開始

### 1. 安裝依賴

```bash
cd n8n-nodes
npm install
```

### 2. 建立新節點

```typescript
import { BaseNode, TaiwanNodeConfig } from '../common';

export class MyTaiwanServiceNode extends BaseNode {
  constructor() {
    const config: TaiwanNodeConfig = {
      name: 'myTaiwanService',
      displayName: '我的台灣服務',
      description: '台灣在地服務整合',
      version: 1,
      category: 'payment',
      provider: '服務提供商'
    };
    
    super(config);
  }

  // 實作節點邏輯...
}
```

### 3. 配置節點描述

```typescript
description: INodeTypeDescription = {
  displayName: '我的台灣服務',
  name: 'myTaiwanService',
  group: ['taiwan'],
  version: 1,
  description: '台灣在地服務整合節點',
  defaults: {
    name: '我的台灣服務',
  },
  inputs: ['main'],
  outputs: ['main'],
  credentials: [
    {
      name: 'myTaiwanServiceApi',
      required: true,
    },
  ],
  properties: [
    // 節點參數定義...
  ],
};
```

### 4. 實作執行邏輯

```typescript
protected async executeNode(
  context: IExecuteFunctions,
  executionContext: ExecutionContext
): Promise<INodeExecutionData[][]> {
  
  // 取得認證配置
  const authConfig = await this.getAuthConfig(context);
  
  // 建立 API 客戶端
  const apiClient = new TaiwanApiClient({
    baseUrl: 'https://api.example.tw',
    auth: authConfig
  }, context.helpers.request);

  // 處理輸入項目
  return await this.processItems(context, async (item, index) => {
    const result = await apiClient.post('/api/endpoint', item.json);
    return { json: result.data };
  });
}
```

## 🔧 核心功能

### 認證管理

SDK 支援多種認證方式：

```typescript
// HMAC 認證
const hmacAuth: HmacAuthConfig = {
  type: AuthType.HMAC,
  key: 'your-api-key',
  secret: 'your-secret',
  algorithm: HmacAlgorithm.SHA256
};

// API Key 認證
const apiKeyAuth: ApiKeyAuthConfig = {
  type: AuthType.API_KEY,
  apiKey: 'your-api-key',
  location: 'header'
};
```

### 資料驗證

使用台灣驗證器驗證本地資料：

```typescript
const validator = new TaiwanValidator();

// 驗證身分證字號
const idResult = validator.validateIdNumber('A123456789');

// 驗證統一編號
const businessResult = validator.validateBusinessNumber('12345678');

// 驗證手機號碼
const mobileResult = validator.validateMobileNumber('0912345678');
```

### 台灣工具函數

使用台灣工具函數處理本地化資料：

```typescript
// 格式化新台幣金額
const formattedAmount = TaiwanUtils.formatTWDAmount(150000); // "NT$1,500"

// 格式化台灣日期
const formattedDate = TaiwanUtils.formatTaiwanDateTime(
  new Date(), 
  TaiwanDateFormat.YYYY_MM_DD_HH_MM_SS
);

// 格式化身分證字號
const formattedId = TaiwanUtils.formatIdNumber('A123456789'); // "A12 345 6789"
```

### 日誌記錄

使用台灣日誌記錄器：

```typescript
const logger = new TaiwanLogger({
  nodeName: 'MyTaiwanService',
  level: LogLevel.INFO
});

logger.info('節點執行開始', { itemCount: 5 });
logger.error('API 請求失敗', { error: 'Network timeout' });
```

## 📚 進階功能

### 自定義認證提供者

```typescript
class CustomAuth implements AuthProvider {
  readonly type = AuthType.CUSTOM;
  
  async validate(config: AuthConfig): Promise<boolean> {
    // 驗證邏輯
    return true;
  }
  
  async authenticate(config: AuthConfig): Promise<AuthResult> {
    // 認證邏輯
    return {
      success: true,
      status: AuthStatus.VALID,
      headers: { 'Authorization': 'Bearer token' }
    };
  }
}

// 註冊自定義認證提供者
const authManager = new AuthManager();
authManager.register(AuthType.CUSTOM, new CustomAuth());
```

### 批次驗證

```typescript
const validator = new TaiwanValidator();

const validationRules = {
  customerName: [validator.commonRules.required],
  customerPhone: [validator.commonRules.mobile],
  customerEmail: [validator.commonRules.email],
  amount: [validator.commonRules.twdAmount]
};

const result = validator.validateBatch(inputData, validationRules);
if (!result.isValid) {
  throw new Error(`驗證失敗: ${result.errors.join(', ')}`);
}
```

### 錯誤處理

```typescript
try {
  const result = await apiClient.post('/api/payment', paymentData);
} catch (error) {
  const standardError = this.handleError(error, executionContext);
  
  this.logger.error('付款處理失敗', {
    error: standardError,
    orderId: paymentData.orderId
  });
  
  throw new NodeOperationError(this.getNode(), standardError.message);
}
```

## 🧪 測試

### 單元測試

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
    mockClient.mockResponse('/api/payment', { 
      success: true, 
      transactionId: 'TXN123' 
    });
    
    const result = await testHelper.executeNode(MyTaiwanServiceNode, {
      parameters: { 
        operation: 'createPayment',
        amount: 1000 
      },
      credentials: { 
        apiKey: 'test-key',
        apiSecret: 'test-secret'
      }
    });

    expect(result[0].json.success).toBe(true);
    expect(result[0].json.transactionId).toBe('TXN123');
  });
});
```

## 📖 最佳實務

### 1. 節點命名

- 使用描述性的節點名稱
- 遵循 camelCase 命名規範
- 包含服務提供商名稱

### 2. 參數設計

- 提供清楚的參數描述
- 使用適當的參數類型
- 設定合理的預設值

### 3. 錯誤處理

- 提供有意義的錯誤訊息
- 使用標準化的錯誤格式
- 記錄詳細的錯誤資訊

### 4. 日誌記錄

- 記錄關鍵操作
- 使用適當的日誌等級
- 包含相關的上下文資訊

### 5. 資料驗證

- 驗證所有輸入參數
- 使用台灣特有的驗證規則
- 提供清楚的驗證錯誤訊息

## 🔗 相關資源

- [API 客戶端使用指南](./api-client.md)
- [認證機制說明](./authentication.md)
- [測試最佳實務](./testing.md)
- [台灣在地化功能](./taiwan-features.md)
- [節點開發指南](./node-development.md)

## 🤝 貢獻

歡迎貢獻代碼、回報問題或提出建議：

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](../LICENSE) 檔案。
