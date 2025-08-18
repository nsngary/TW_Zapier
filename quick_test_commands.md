# 🚀 n8n Webhook 快速測試命令

## 📋 **測試前準備**

### **確認服務狀態**
```bash
# 檢查 FastAPI 服務
curl -s http://localhost:8000/health

# 檢查 n8n 服務
curl -s http://localhost:5678

# 檢查 Demo API 端點
curl -s http://localhost:8000/api/v1/demo/payment-methods
```

## 🧪 **開發測試命令**

> ⚠️  **使用前請先在 n8n 中點擊 "Listen for test event" 按鈕**

### **測試 1：小額訂單 (Line Pay)**
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
        "product_name": "台灣高山茶",
        "quantity": 1,
        "unit_price": 50000,
        "subtotal": 50000
      }
    ]
  }'
```

### **測試 2：高額訂單 (綠界科技)**
```bash
curl -X POST http://localhost:5678/webhook-test/taiwan-order-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "李大華",
    "customer_email": "li@example.com",
    "customer_phone": "0987654321",
    "total_amount": 150000,
    "items": [
      {
        "product_id": "TEST002",
        "product_name": "台灣精品禮盒",
        "quantity": 1,
        "unit_price": 150000,
        "subtotal": 150000
      }
    ]
  }'
```

### **測試 3：邊界值測試 (1000元整)**
```bash
curl -X POST http://localhost:5678/webhook-test/taiwan-order-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "陳美玲",
    "customer_email": "chen@example.com",
    "customer_phone": "0923456789",
    "total_amount": 100000,
    "items": [
      {
        "product_id": "TEST003",
        "product_name": "邊界值測試商品",
        "quantity": 1,
        "unit_price": 100000,
        "subtotal": 100000
      }
    ]
  }'
```

## 🚀 **正式運行測試命令**

> ⚠️  **使用前請確保工作流已啟用（Active 狀態）**

### **正式環境測試**
```bash
curl -X POST http://localhost:5678/webhook/taiwan-order-demo \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "正式測試客戶",
    "customer_email": "prod@example.com",
    "customer_phone": "0900000000",
    "total_amount": 88000,
    "payment_method": "linePay",
    "items": [
      {
        "product_id": "PROD001",
        "product_name": "正式環境測試商品",
        "quantity": 1,
        "unit_price": 88000,
        "subtotal": 88000
      }
    ],
    "notes": "正式環境完整流程測試"
  }'
```

## 🔍 **預期回應格式**

### **成功回應範例**
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

### **金流選擇邏輯驗證**
- **total_amount < 100000** (< 1000元) → `payment_method: "linePay"`
- **total_amount >= 100000** (≥ 1000元) → `payment_method: "ecPay"`

## 🛠️ **互動式測試工具**

### **使用 Python 測試腳本**
```bash
python webhook_test.py
```

### **功能特色**
- 🎯 互動式選單
- 🧪 開發測試模式
- 🚀 正式運行模式
- 🛠️ 自訂測試資料
- 📊 詳細結果分析

## 📊 **測試檢查清單**

### **開發測試階段**
- [ ] 點擊 "Listen for test event" 按鈕
- [ ] 執行小額訂單測試
- [ ] 執行高額訂單測試
- [ ] 檢查每個節點的執行結果
- [ ] 驗證金流選擇邏輯
- [ ] 確認 API 呼叫成功
- [ ] 檢查通知發送功能

### **正式運行階段**
- [ ] 確認工作流已啟用（Active）
- [ ] 執行正式環境測試
- [ ] 檢查 Executions 頁面記錄
- [ ] 驗證完整的端到端流程
- [ ] 確認回應格式正確

## 🚨 **故障排除快速指令**

### **檢查服務狀態**
```bash
# 檢查 Docker 容器狀態
docker-compose ps

# 檢查 FastAPI 日誌
docker-compose logs backend

# 檢查 n8n 日誌
docker-compose logs n8n
```

### **重啟服務**
```bash
# 重啟 n8n
docker-compose restart n8n

# 重啟 FastAPI
docker-compose restart backend

# 重啟所有服務
docker-compose restart
```

## 🎯 **成功指標**

當測試成功時，您應該看到：

1. **HTTP 200 狀態碼**
2. **完整的 JSON 回應**
3. **正確的 order_id 格式** (TW + 日期 + 隨機碼)
4. **適當的 payment_method 選擇**
5. **notification_sent: true**
6. **有效的 processed_at 時間戳**

## 📝 **測試記錄範本**

```
測試日期: ____________________
測試者: ______________________

開發測試結果:
□ 小額訂單測試 - 通過/失敗
□ 高額訂單測試 - 通過/失敗
□ 邊界值測試 - 通過/失敗

正式運行測試結果:
□ 完整流程測試 - 通過/失敗

問題記錄:
_________________________________
_________________________________

解決方案:
_________________________________
_________________________________
```
