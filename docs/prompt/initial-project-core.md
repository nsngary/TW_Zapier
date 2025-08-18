開發一個台灣在地化的流程自動化平台 TW_Zapier，需要具備以下核心功能：

1. **當地App整合**：
   - 支援台灣主要金流服務（Line Pay、綠界、藍新等）
   - 整合政府開放資料平台
   - 支援台灣交通資訊（高鐵、台鐵、桃機等）
   - 台灣手機號碼格式驗證（09xxxxxxxx）

2. **技術架構要求**：
   - 前端：Vue 3 + TypeScript + Element Plus
   - 後端：FastAPI + SQLAlchemy + PostgreSQL
   - 工作流引擎：n8n 整合
   - 容器化：Docker + Docker Compose

3. **核心功能模組**：
   - 使用者認證系統（JWT Token 管理）
   - 工作流視覺化編輯器
   - 台灣在地化節點庫
   - 執行監控和日誌系統

4. **開發規範**：
   - 繁體中文介面
   - 響應式設計
   - 完整的 TypeScript 支援
   - 單元測試覆蓋
