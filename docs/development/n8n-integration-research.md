# n8n 整合研究與驗證報告

## 📋 研究目標

深入研究 n8n API 和自定義節點開發機制，建立與 n8n 的通訊接口，驗證基礎工作流執行功能的可行性。

## 🔍 n8n 架構分析

### 核心組件
1. **n8n Editor**: 工作流視覺化編輯器
2. **n8n Core**: 工作流執行引擎
3. **n8n Nodes**: 內建和自定義節點
4. **n8n API**: RESTful API 接口
5. **Database**: 工作流和執行記錄儲存

### 技術棧
- **後端**: Node.js + TypeScript
- **前端**: Vue.js
- **資料庫**: PostgreSQL / SQLite / MySQL
- **API**: Express.js RESTful API

## 🛠️ n8n API 研究

### 主要 API 端點

#### 1. 工作流管理
```typescript
// 取得所有工作流
GET /api/v1/workflows

// 建立新工作流
POST /api/v1/workflows
{
  "name": "My Workflow",
  "nodes": [...],
  "connections": {...}
}

// 更新工作流
PUT /api/v1/workflows/{id}

// 刪除工作流
DELETE /api/v1/workflows/{id}

// 執行工作流
POST /api/v1/workflows/{id}/execute
```

#### 2. 執行管理
```typescript
// 取得執行記錄
GET /api/v1/executions

// 取得特定執行詳情
GET /api/v1/executions/{id}

// 停止執行
POST /api/v1/executions/{id}/stop
```

#### 3. 節點管理
```typescript
// 取得可用節點類型
GET /api/v1/node-types

// 取得節點參數定義
GET /api/v1/node-parameter-options
```

### API 認證機制
n8n 支援多種認證方式：
1. **Basic Auth**: 基本 HTTP 認證
2. **API Key**: 透過 Header 傳遞
3. **JWT Token**: JSON Web Token

## 🔧 自定義節點開發

### 節點開發方式

#### 1. 聲明式節點 (Declarative Style)
```typescript
export class TaiwanPaymentNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Taiwan Payment',
    name: 'taiwanPayment',
    group: ['transform'],
    version: 1,
    description: '台灣金流服務整合節點',
    defaults: {
      name: 'Taiwan Payment',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: '服務提供商',
        name: 'provider',
        type: 'options',
        options: [
          {
            name: 'Line Pay',
            value: 'linepay',
          },
          {
            name: '綠界科技',
            value: 'ecpay',
          },
        ],
        default: 'linepay',
      },
    ],
  };
}
```

#### 2. 程式化節點 (Programmatic Style)
```typescript
export class TaiwanPaymentNode implements INodeType {
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const provider = this.getNodeParameter('provider', i) as string;
      
      // 根據提供商執行不同邏輯
      let result;
      switch (provider) {
        case 'linepay':
          result = await this.executeLinePay(items[i]);
          break;
        case 'ecpay':
          result = await this.executeECPay(items[i]);
          break;
      }

      returnData.push({
        json: result,
      });
    }

    return [returnData];
  }
}
```

### 節點檔案結構
```
taiwan-payment-node/
├── package.json
├── nodes/
│   ├── TaiwanPayment/
│   │   ├── TaiwanPayment.node.ts
│   │   └── taiwan-payment.svg
├── credentials/
│   ├── LinePayApi.credentials.ts
│   └── ECPayApi.credentials.ts
└── dist/
```

## 🔌 n8n 通訊接口設計

### FastAPI 與 n8n 整合架構

```python
# backend/app/services/n8n_service.py
import httpx
from typing import Dict, Any, List

class N8nService:
    def __init__(self, base_url: str, auth_user: str, auth_password: str):
        self.base_url = base_url
        self.auth = (auth_user, auth_password)
        self.client = httpx.AsyncClient()

    async def create_workflow(self, workflow_data: Dict[str, Any]) -> Dict[str, Any]:
        """建立新的工作流"""
        response = await self.client.post(
            f"{self.base_url}/api/v1/workflows",
            json=workflow_data,
            auth=self.auth
        )
        return response.json()

    async def execute_workflow(self, workflow_id: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """執行工作流"""
        response = await self.client.post(
            f"{self.base_url}/api/v1/workflows/{workflow_id}/execute",
            json={"inputData": input_data},
            auth=self.auth
        )
        return response.json()

    async def get_execution_status(self, execution_id: str) -> Dict[str, Any]:
        """取得執行狀態"""
        response = await self.client.get(
            f"{self.base_url}/api/v1/executions/{execution_id}",
            auth=self.auth
        )
        return response.json()
```

### 工作流 JSON 結構
```json
{
  "name": "台灣金流處理流程",
  "nodes": [
    {
      "id": "start",
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "position": [240, 300],
      "parameters": {}
    },
    {
      "id": "taiwan-payment",
      "name": "Taiwan Payment",
      "type": "taiwan-payment",
      "position": [460, 300],
      "parameters": {
        "provider": "linepay",
        "amount": "={{ $json.amount }}",
        "currency": "TWD"
      }
    }
  ],
  "connections": {
    "Start": {
      "main": [
        [
          {
            "node": "Taiwan Payment",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## 🧪 技術驗證實驗

### 實驗 1: n8n API 連線測試
```python
async def test_n8n_connection():
    """測試 n8n API 連線"""
    n8n = N8nService(
        base_url="http://localhost:5678",
        auth_user="admin",
        auth_password="admin123"
    )
    
    # 測試取得工作流列表
    workflows = await n8n.get_workflows()
    print(f"找到 {len(workflows)} 個工作流")
    
    return workflows
```

### 實驗 2: 簡單工作流建立與執行
```python
async def test_simple_workflow():
    """測試建立和執行簡單工作流"""
    workflow_data = {
        "name": "測試工作流",
        "nodes": [
            {
                "id": "start",
                "name": "Start",
                "type": "n8n-nodes-base.manualTrigger",
                "position": [240, 300],
                "parameters": {}
            },
            {
                "id": "set-data",
                "name": "Set Data",
                "type": "n8n-nodes-base.set",
                "position": [460, 300],
                "parameters": {
                    "values": {
                        "string": [
                            {
                                "name": "message",
                                "value": "Hello from Taiwan!"
                            }
                        ]
                    }
                }
            }
        ],
        "connections": {
            "Start": {
                "main": [
                    [
                        {
                            "node": "Set Data",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            }
        }
    }
    
    # 建立工作流
    workflow = await n8n.create_workflow(workflow_data)
    print(f"工作流已建立: {workflow['id']}")
    
    # 執行工作流
    execution = await n8n.execute_workflow(workflow['id'], {})
    print(f"執行 ID: {execution['id']}")
    
    return workflow, execution
```

## 📊 風險評估與解決方案

### 高風險項目

#### 1. n8n 版本相容性
**風險**: n8n API 在不同版本間可能有變化
**解決方案**: 
- 鎖定特定 n8n 版本
- 建立版本檢查機制
- 提供多版本支援

#### 2. 自定義節點部署複雜度
**風險**: 自定義節點的安裝和更新可能複雜
**解決方案**:
- 使用 Docker 容器化部署
- 建立自動化安裝腳本
- 提供節點管理介面

#### 3. 工作流執行穩定性
**風險**: 長時間運行的工作流可能失敗
**解決方案**:
- 實作重試機制
- 建立執行監控
- 提供錯誤恢復功能

### 中風險項目

#### 1. 效能瓶頸
**風險**: 大量工作流同時執行可能影響效能
**解決方案**:
- 實作佇列管理
- 設定執行限制
- 監控系統資源

#### 2. 資料同步問題
**風險**: FastAPI 和 n8n 間的資料可能不同步
**解決方案**:
- 建立資料同步機制
- 使用事件驅動架構
- 定期資料校驗

## 🎯 驗證結論

### 技術可行性: ✅ 高度可行
1. n8n 提供完整的 RESTful API
2. 自定義節點開發機制成熟
3. 支援多種認證方式
4. 社群活躍，文件完整

### 整合複雜度: ⚠️ 中等
1. 需要深入理解 n8n 內部機制
2. 自定義節點開發需要 TypeScript 知識
3. 工作流 JSON 結構相對複雜

### 建議實作順序
1. **第一階段**: 建立基礎 API 通訊
2. **第二階段**: 開發簡單的自定義節點
3. **第三階段**: 實作完整的台灣在地服務節點
4. **第四階段**: 建立監控和管理機制

## 📝 下一步行動

1. 建立 n8n 開發環境
2. 實作基礎的 API 通訊類別
3. 開發第一個台灣在地服務節點原型
4. 測試工作流建立和執行流程
5. 建立節點管理和部署機制
