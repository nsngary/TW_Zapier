建立完整的 SQLAlchemy 資料模型系統，包括：

1. **用戶認證相關模型**：
   - User 模型：使用 UUID 主鍵，符合前端認證系統需求
   - RefreshToken 模型：JWT Token 管理，自動過期檢查
   - UserProfile 模型：用戶詳細資料
   - UserPreferences 模型：用戶偏好設定

2. **工作流程相關模型**：
   - Workflow 模型：工作流核心功能
   - WorkflowVersion 模型：版本控制系統
   - WorkflowExecution 模型：執行記錄和監控
   - WorkflowTemplate 模型：工作流模板

3. **台灣特色資料模型**：
   - TaiwanPaymentConfig 模型：台灣金流服務配置
   - TaiwanPaymentTransaction 模型：交易記錄
   - TaiwanGovernmentData 模型：政府開放資料整合
   - TaiwanTransportData 模型：交通資料（高鐵、台鐵、桃機）

4. **技術要求**：
   - 使用 UUID 作為主鍵
   - 完整的關聯設計和外鍵約束
   - 時區感知的時間戳
   - 加密敏感資料儲存
   - 完整的索引策略

5. **資料庫遷移**：
   - 使用 Alembic 管理資料庫遷移
   - 自動生成遷移腳本
   - 支援開發和生產環境

6. **測試覆蓋**：
   - 所有模型的單元測試
   - 關聯測試
   - 資料完整性測試
   - 台灣特色功能測試

---

確保 SQLAlchemy 模型與前端認證系統完美對接：

1. **資料格式要求**：
   - UUID 格式：前端期望字串格式的 UUID
   - 時間戳格式：ISO 字串格式（前端 JavaScript Date 相容）
   - 欄位命名：name、email_verified 等符合前端期望
   - Token 結構：accessToken、refreshToken、expiresIn 格式

2. **Pydantic Schemas**：
   - 建立完整的請求/回應 Schema
   - 台灣手機號碼驗證（正則表達式）
   - 密碼強度驗證
   - 錯誤格式統一

3. **API 回應格式**：
   - 登入回應：{ user: User, token: TokenData }
   - 註冊回應：{ user: User, message: string }
   - 錯誤回應：統一的錯誤格式和類別

4. **驗證要求**：
   - 建立測試驗證前後端資料格式一致性
   - 確保所有 API 端點都有對應的 Schema
   - 測試資料序列化和反序列化
