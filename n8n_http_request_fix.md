# 🔧 n8n HTTP Request 節點配置修復指南

## 🚨 **問題診斷**

根據您提供的截圖，問題出現在：
1. **JSON 格式錯誤**：JSON 欄位顯示紅色錯誤
2. **Headers 配置**：可能缺少必要的 Content-Type header
3. **資料格式**：變數引用可能有語法問題

## ✅ **解決方案：正確的 HTTP Request 節點配置**

### **方法 1：使用 Body Parameters（推薦）**

#### **基本設定**
- **Method**: `POST`
- **URL**: `http://host.docker.internal:8000/api/v1/demo/orders`

#### **Authentication**
- 選擇：`None`

#### **Send Query Parameters**
- 關閉（不需要）

#### **Send Headers**
- **啟用** Send Headers
- 點擊 "Add Header"
- **Name**: `Content-Type`
- **Value**: `application/json`

#### **Send Body**
- **啟用** Send Body
- **Body Content Type**: 選擇 `JSON`
- **Specify Body**: 選擇 `Using Fields Below`

#### **Body Parameters**
點擊 "Add Parameter" 並逐一添加：

1. **customer_name**
   - **Name**: `customer_name`
   - **Value**: `{{ $json.customer_name }}`

2. **customer_email**
   - **Name**: `customer_email`
   - **Value**: `demo@example.com`

3. **customer_phone**
   - **Name**: `customer_phone`
   - **Value**: `0912345678`

4. **total_amount**
   - **Name**: `total_amount`
   - **Value**: `{{ $json.total_amount }}`

5. **payment_method**（高額訂單節點）
   - **Name**: `payment_method`
   - **Value**: `ecPay`

5. **payment_method**（一般訂單節點）
   - **Name**: `payment_method`
   - **Value**: `linePay`

6. **items**
   - **Name**: `items`
   - **Value**: `[{"product_id": "DEMO001", "product_name": "示範商品", "quantity": 1, "unit_price": {{ $json.total_amount }}, "subtotal": {{ $json.total_amount }}}]`

### **方法 2：使用 Raw JSON**

如果您偏好使用 Raw JSON：

#### **Send Body 設定**
- **啟用** Send Body
- **Body Content Type**: 選擇 `JSON`
- **Specify Body**: 選擇 `JSON`

#### **JSON 內容**（高額訂單節點）
```json
{
  "customer_name": "{{ $json.customer_name }}",
  "customer_email": "demo@example.com",
  "customer_phone": "0912345678",
  "total_amount": {{ $json.total_amount }},
  "payment_method": "ecPay",
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

#### **JSON 內容**（一般訂單節點）
```json
{
  "customer_name": "{{ $json.customer_name }}",
  "customer_email": "demo@example.com",
  "customer_phone": "0912345678",
  "total_amount": {{ $json.total_amount }},
  "payment_method": "linePay",
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

## 🔍 **常見錯誤和修復**

### **錯誤 1：JSON parameter needs to be valid JSON**
**原因**：JSON 格式不正確或變數引用語法錯誤
**解決**：
- 確保所有字串值用雙引號包圍
- 數值不要用引號
- 檢查變數語法：`{{ $json.field_name }}`

### **錯誤 2：API 呼叫失敗**
**原因**：URL 不正確或服務未運行
**解決**：
- 確認 URL：`http://host.docker.internal:8000/api/v1/demo/orders`
- 檢查 FastAPI 服務狀態：`curl http://localhost:8000/health`

### **錯誤 3：Headers 問題**
**原因**：缺少 Content-Type header
**解決**：
- 確保添加 `Content-Type: application/json`

## 🧪 **測試步驟**

### **步驟 1：修復節點配置**
按照上述方法修復 HTTP Request 節點

### **步驟 2：測試單個節點**
1. 點擊 HTTP Request 節點
2. 點擊 "Execute Node"
3. 檢查輸出結果

### **步驟 3：測試完整工作流**
1. 點擊 Webhook 節點的 "Listen for test event"
2. 執行測試命令：

```bash
curl -X POST http://localhost:5678/webhook-test/taiwan-order-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "測試修復",
    "customer_email": "fix@example.com",
    "customer_phone": "0912345678",
    "total_amount": 75000
  }'
```

## 📋 **配置檢查清單**

### **HTTP Request 節點檢查**
- [ ] Method 設為 POST
- [ ] URL 正確：`http://host.docker.internal:8000/api/v1/demo/orders`
- [ ] Send Headers 已啟用
- [ ] Content-Type header 已添加
- [ ] Send Body 已啟用
- [ ] Body Content Type 設為 JSON
- [ ] 所有必要參數已添加
- [ ] 變數語法正確：`{{ $json.field_name }}`

### **通知節點配置**
同樣的原則適用於通知節點：
- **URL**: `http://host.docker.internal:8000/api/v1/demo/notifications`
- **Body Parameters**:
  - `message`: `訂單 {{ $json.order_id }} 已建立，客戶：{{ $json.customer_name }}`
  - `recipient`: `店家管理員`
  - `notification_type`: `order_created`

## 🎯 **預期結果**

修復後，您應該看到：
1. **HTTP Request 節點**成功執行
2. **回應資料**包含 order_id、payment_method 等
3. **通知節點**成功發送
4. **最終回應**包含完整的處理結果

## 🔧 **快速修復命令**

如果需要重新測試 FastAPI：
```bash
# 測試訂單 API
curl -X POST http://localhost:8000/api/v1/demo/orders \
  -H "Content-Type: application/json" \
  -d '{"customer_name":"測試","customer_email":"test@example.com","customer_phone":"0912345678","total_amount":50000,"payment_method":"linePay","items":[{"product_id":"DEMO001","product_name":"示範商品","quantity":1,"unit_price":50000,"subtotal":50000}]}'

# 測試通知 API
curl -X POST http://localhost:8000/api/v1/demo/notifications \
  -H "Content-Type: application/json" \
  -d '{"message":"測試通知","recipient":"管理員","notification_type":"test"}'
```

按照這個指南修復節點配置後，您的工作流應該能夠正常執行！
