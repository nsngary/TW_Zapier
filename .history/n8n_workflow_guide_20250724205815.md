# 🔧 n8n 台灣電商 Demo 工作流建立指南

## 📋 **前置準備**

1. **確認服務運行**：
   - n8n: http://localhost:5678 ✅
   - FastAPI: http://localhost:8000 ✅
   - PostgreSQL: localhost:5432 ✅
   - Redis: localhost:6379 ✅

2. **登入 n8n**：
   - 開啟瀏覽器前往 http://localhost:5678
   - 使用帳號密碼登入

## 🚀 **建立工作流步驟**

### **步驟 1：建立新工作流**
1. 點擊 "New Workflow" 或 "+" 按鈕
2. 工作流名稱：`台灣電商訂單處理 Demo`

### **步驟 2：添加 Webhook 觸發器**
1. 點擊 "Add first step"
2. 搜尋並選擇 "Webhook"
3. 設定參數：
   - **HTTP Method**: POST
   - **Path**: `taiwan-order-demo`
   - **Response Mode**: Using 'Respond to Webhook' Node
   - **Authentication**: None

### **步驟 3：添加資料處理節點**
1. 點擊 Webhook 節點右側的 "+" 
2. 搜尋並選擇 "Set"
3. 節點名稱：`處理訂單資料`
4. 設定 Values：
   ```
   customer_name: {{ $json.customer_name || '測試客戶' }}
   total_amount: {{ $json.total_amount || 50000 }}
   payment_method: {{ $json.total_amount > 100000 ? 'ecPay' : 'linePay' }}
   order_timestamp: {{ new Date().toISOString() }}
   ```

### **步驟 4：添加 HTTP 請求節點（訂單處理）**
1. 點擊 Set 節點右側的 "+"
2. 搜尋並選擇 "HTTP Request"
3. 節點名稱：`呼叫訂單 API`
4. 設定參數：
   - **Method**: POST
   - **URL**: `http://host.docker.internal:8000/api/v1/demo/orders`
   - **Send Headers**: 啟用
     - Name: `Content-Type`
     - Value: `application/json`
   - **Send Body**: 啟用
   - **Body Content Type**: JSON
   - **JSON**: 
     ```json
     {
       "customer_name": "{{ $json.customer_name }}",
       "customer_email": "demo@example.com",
       "customer_phone": "0912345678",
       "total_amount": {{ $json.total_amount }},
       "payment_method": "{{ $json.payment_method }}",
       "items": [
         {
           "product_id": "DEMO001",
           "product_name": "示範商品",
           "quantity": 1,
           "unit_price": {{ $json.total_amount }},
           "subtotal": {{ $json.total_amount }}
         }
       ]
     }
     ```

### **步驟 5：添加通知節點**
1. 點擊 HTTP Request 節點右側的 "+"
2. 搜尋並選擇 "HTTP Request"
3. 節點名稱：`發送通知`
4. 設定參數：
   - **Method**: POST
   - **URL**: `http://host.docker.internal:8000/api/v1/demo/notifications`
   - **Send Headers**: 啟用
     - Name: `Content-Type`
     - Value: `application/json`
   - **Send Body**: 啟用
   - **Body Content Type**: JSON
   - **JSON**:
     ```json
     {
       "message": "訂單 {{ $json.order_id }} 已建立，客戶：{{ $json.customer_name }}，金額：NT${{ Math.round($json.total_amount / 100) }}，付款方式：{{ $json.payment_method }}",
       "recipient": "店家管理員",
       "notification_type": "order_created"
     }
     ```

### **步驟 6：添加回應節點**
1. 點擊通知節點右側的 "+"
2. 搜尋並選擇 "Respond to Webhook"
3. 節點名稱：`回傳結果`
4. 設定參數：
   - **Respond With**: JSON
   - **Response Body**:
     ```json
     {
       "success": true,
       "message": "台灣電商訂單處理完成",
       "order_id": "{{ $json.order_id }}",
       "customer_name": "{{ $json.customer_name }}",
       "payment_method": "{{ $json.payment_method }}",
       "notification_sent": true,
       "processed_at": "{{ new Date().toISOString() }}"
     }
     ```

### **步驟 7：啟用工作流**
1. 點擊右上角的 "Inactive" 開關，變成 "Active"
2. 點擊 "Save" 儲存工作流
3. 記下 Webhook URL（通常是 `http://localhost:5678/webhook/taiwan-order-demo`）

## 🧪 **測試工作流**

### **方法 1：開發測試（推薦用於初次驗證）**

#### **步驟 1：啟動測試監聽**
1. 在 n8n 工作流編輯器中，點擊 Webhook 節點
2. 點擊 "Listen for test event" 按鈕
3. 系統會顯示 "Waiting for test webhook call..."

#### **步驟 2：執行測試命令**
```bash
curl -X POST http://localhost:5678/webhook-test/taiwan-order-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "王小明",
    "customer_email": "wang@example.com",
    "customer_phone": "0912345678",
    "total_amount": 50000,
    "items": [
      {
        "product_id": "TEST001",
        "product_name": "測試商品",
        "quantity": 1,
        "unit_price": 50000,
        "subtotal": 50000
      }
    ]
  }'
```

#### **步驟 3：查看測試結果**
- n8n 會自動執行工作流並顯示每個節點的執行結果
- 可以檢查每個節點的輸入/輸出資料
- 如有錯誤，會顯示詳細的錯誤訊息

### **方法 2：正式運行測試**

#### **前提條件**
- 工作流必須已儲存並啟用（Active 狀態）

#### **測試命令**
```bash
curl -X POST http://localhost:5678/webhook/taiwan-order-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "李大華",
    "customer_email": "li@example.com",
    "customer_phone": "0987654321",
    "total_amount": 150000,
    "items": [
      {
        "product_id": "PROD001",
        "product_name": "台灣精品",
        "quantity": 1,
        "unit_price": 150000,
        "subtotal": 150000
      }
    ]
  }'
```

### **預期回應**
```json
{
  "success": true,
  "message": "台灣電商訂單處理完成",
  "order_id": "TW20250724XXXXXXXX",
  "customer_name": "王小明",
  "payment_method": "linePay",
  "notification_sent": true,
  "processed_at": "2025-07-24T16:30:00.000Z"
}
```

## 🎯 **驗證重點**

### **台灣在地化功能**
- ✅ **金額判斷**: 小額使用 Line Pay，高額使用綠界科技
- ✅ **台灣時區**: Asia/Taipei
- ✅ **繁體中文**: 訊息和回應都使用繁體中文
- ✅ **台灣金流**: 支援 Line Pay、綠界科技、藍新金流

### **工作流功能**
- ✅ **Webhook 觸發**: 接收 HTTP POST 請求
- ✅ **資料處理**: 驗證和轉換訂單資料
- ✅ **API 整合**: 呼叫 FastAPI 後端服務
- ✅ **通知系統**: 發送訂單確認通知
- ✅ **回應處理**: 回傳結構化的 JSON 回應

## 🔧 **測試流程詳解**

### **開發測試流程**
1. **準備階段**：
   - 確保工作流已建立並儲存
   - 不需要啟用（Active）工作流

2. **啟動測試監聽**：
   - 點擊 Webhook 節點
   - 點擊 "Listen for test event" 按鈕
   - 看到 "Waiting for test webhook call..." 訊息

3. **執行測試**：
   - 使用 `webhook-test` URL
   - 執行 curl 命令或使用測試腳本
   - n8n 會即時顯示執行過程

4. **查看結果**：
   - 每個節點會顯示執行狀態
   - 可以檢查輸入/輸出資料
   - 錯誤會有詳細說明

### **正式運行流程**
1. **準備階段**：
   - 工作流必須已儲存
   - 必須啟用（Active）工作流

2. **直接測試**：
   - 使用 `webhook` URL
   - 無需手動啟動監聽
   - 工作流會自動執行

3. **查看結果**：
   - 在 "Executions" 頁面查看執行記錄
   - 可以查看詳細的執行日誌

### **互動式測試工具**
使用提供的測試腳本：
```bash
python webhook_test.py
```

### **故障排除**

#### **常見問題**
1. **開發測試無回應**：
   - 確認已點擊 "Listen for test event"
   - 檢查是否使用正確的 `webhook-test` URL
   - 確認測試監聽狀態未超時

2. **正式運行無回應**：
   - 確認工作流已啟用（Active）
   - 檢查是否使用正確的 `webhook` URL
   - 確認工作流沒有語法錯誤

3. **API 呼叫失敗**：
   - 確認 FastAPI 服務正在運行 (http://localhost:8000)
   - 檢查 URL 是否使用 `host.docker.internal`
   - 驗證 JSON 格式是否正確

4. **資料格式錯誤**：
   - 檢查變數引用語法 `{{ $json.field_name }}`
   - 確認 JSON 結構符合預期
   - 使用 n8n 的資料檢視功能除錯

#### **除錯技巧**
- **開發階段**：使用 "Listen for test event" 即時除錯
- **正式運行**：查看 "Executions" 頁面的執行記錄
- **資料檢查**：點擊節點查看輸入/輸出資料
- **日誌分析**：查看 n8n 和 FastAPI 的日誌

## 📊 **成功指標**

當您完成工作流建立後，應該能夠：
1. ✅ 成功觸發 Webhook
2. ✅ 處理不同金額的訂單
3. ✅ 自動選擇適當的台灣金流服務
4. ✅ 發送通知訊息
5. ✅ 回傳完整的處理結果

完成後，請執行測試命令驗證功能！
