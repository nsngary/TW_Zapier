-- 台灣在地化流程自動化平台種子資料
-- 插入初始資料和範例資料

-- 插入系統設定
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('app_name', '台灣在地化流程自動化平台', 'string', '應用程式名稱', 'general', true),
('app_version', '1.0.0', 'string', '應用程式版本', 'general', true),
('max_workflows_per_user', '50', 'integer', '每個使用者最大工作流數量', 'limits', false),
('max_executions_per_day', '1000', 'integer', '每日最大執行次數', 'limits', false),
('enable_user_registration', 'true', 'boolean', '是否允許使用者註冊', 'auth', true),
('default_timezone', 'Asia/Taipei', 'string', '預設時區', 'general', true),
('default_language', 'zh-TW', 'string', '預設語言', 'general', true),
('maintenance_mode', 'false', 'boolean', '維護模式', 'system', true),
('support_email', 'support@taiwan-zapier.com', 'string', '支援電子郵件', 'contact', true),
('webhook_timeout', '30', 'integer', 'Webhook 超時時間（秒）', 'webhook', false);

-- 插入節點類型
INSERT INTO node_types (name, display_name, category, description, icon_url, color, is_taiwan_service, service_provider, supports_webhook, supports_polling) VALUES
-- 觸發節點
('manualTrigger', '手動觸發', 'trigger', '手動啟動工作流', '/icons/manual-trigger.svg', '#10b981', false, null, false, false),
('webhookTrigger', 'Webhook 觸發', 'trigger', '透過 HTTP 請求觸發工作流', '/icons/webhook.svg', '#3b82f6', false, null, true, false),
('scheduleTrigger', '定時觸發', 'trigger', '按照時間排程自動執行工作流', '/icons/schedule.svg', '#8b5cf6', false, null, false, true),

-- 台灣金流服務
('linePay', 'Line Pay', 'payment', 'Line Pay 金流整合服務', '/icons/line-pay.svg', '#00c300', true, 'Line', true, false),
('ecPay', '綠界科技', 'payment', '綠界科技金流整合服務', '/icons/ecpay.svg', '#f59e0b', true, '綠界科技', true, false),
('newebPay', '藍新金流', 'payment', '藍新金流整合服務', '/icons/newebpay.svg', '#1e40af', true, '藍新金流', true, false),

-- 台灣在地服務
('taoyuanAirport', '桃機航班', 'transport', '桃園機場航班資訊查詢', '/icons/airport.svg', '#0ea5e9', true, '桃園機場', false, true),
('govOpenData', '政府開放資料', 'data', '台灣政府開放資料平台整合', '/icons/gov-data.svg', '#dc2626', true, '政府資料開放平臺', false, true),
('taiwanRailway', '台鐵資訊', 'transport', '台灣鐵路局列車資訊', '/icons/railway.svg', '#059669', true, '台灣鐵路局', false, true),
('highSpeedRail', '高鐵資訊', 'transport', '台灣高鐵列車資訊', '/icons/hsr.svg', '#ea580c', true, '台灣高鐵', false, true),

-- 通用服務節點
('httpRequest', 'HTTP 請求', 'service', '發送 HTTP 請求到指定端點', '/icons/http.svg', '#6b7280', false, null, false, false),
('setData', '設定資料', 'data', '設定或轉換資料', '/icons/set-data.svg', '#84cc16', false, null, false, false),
('condition', '條件判斷', 'logic', '根據條件分支執行', '/icons/condition.svg', '#f97316', false, null, false, false),
('loop', '迴圈', 'logic', '重複執行指定操作', '/icons/loop.svg', '#8b5cf6', false, null, false, false),

-- 通知服務
('lineNotify', 'Line 通知', 'notification', 'Line Notify 訊息推送', '/icons/line-notify.svg', '#00c300', true, 'Line', false, false),
('email', '電子郵件', 'notification', '發送電子郵件通知', '/icons/email.svg', '#3b82f6', false, null, false, false),
('slack', 'Slack', 'notification', 'Slack 訊息推送', '/icons/slack.svg', '#4a154b', false, 'Slack', true, false),
('discord', 'Discord', 'notification', 'Discord 訊息推送', '/icons/discord.svg', '#5865f2', false, 'Discord', true, false);

-- 插入台灣在地服務配置
INSERT INTO taiwan_services (service_name, service_type, display_name, provider, api_endpoint, auth_type, is_sandbox, configuration) VALUES
('linePay', 'payment', 'Line Pay', 'Line', 'https://sandbox-api-pay.line.me', 'api_key', true, '{"currency": "TWD", "country": "TW"}'),
('ecPay', 'payment', '綠界科技', '綠界科技', 'https://payment-stage.ecpay.com.tw', 'api_key', true, '{"currency": "TWD", "country": "TW"}'),
('newebPay', 'payment', '藍新金流', '藍新金流', 'https://ccore.newebpay.com', 'api_key', true, '{"currency": "TWD", "country": "TW"}'),
('taoyuanAirport', 'transport', '桃機航班', '桃園機場', 'https://www.taoyuan-airport.com/api', 'none', false, '{"language": "zh-TW"}'),
('govOpenData', 'data', '政府開放資料', '政府資料開放平臺', 'https://data.gov.tw/api', 'none', false, '{"language": "zh-TW"}'),
('taiwanRailway', 'transport', '台鐵資訊', '台灣鐵路局', 'https://ptx.transportdata.tw/MOTC/v2/Rail/TRA', 'api_key', false, '{"language": "zh-TW"}'),
('highSpeedRail', 'transport', '高鐵資訊', '台灣高鐵', 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR', 'api_key', false, '{"language": "zh-TW"}'),
('lineNotify', 'notification', 'Line 通知', 'Line', 'https://notify-api.line.me/api', 'oauth2', false, '{"scope": "notify"}');

-- 插入工作流模板
INSERT INTO workflow_templates (name, description, category, tags, nodes, edges, settings, is_official, usage_count, rating) VALUES
('台灣電商金流模板', '整合 Line Pay 和綠界科技的完整電商金流處理工作流', '電商', ARRAY['金流', '電商', '台灣'], 
'[
  {
    "id": "trigger-1",
    "type": "webhookTrigger",
    "position": {"x": 100, "y": 100},
    "data": {"label": "訂單 Webhook"}
  },
  {
    "id": "condition-1", 
    "type": "condition",
    "position": {"x": 300, "y": 100},
    "data": {"label": "選擇金流"}
  },
  {
    "id": "linepay-1",
    "type": "linePay", 
    "position": {"x": 500, "y": 50},
    "data": {"label": "Line Pay 付款"}
  },
  {
    "id": "ecpay-1",
    "type": "ecPay",
    "position": {"x": 500, "y": 150}, 
    "data": {"label": "綠界科技付款"}
  },
  {
    "id": "notify-1",
    "type": "lineNotify",
    "position": {"x": 700, "y": 100},
    "data": {"label": "付款通知"}
  }
]',
'[
  {"id": "e1", "source": "trigger-1", "target": "condition-1"},
  {"id": "e2", "source": "condition-1", "target": "linepay-1"},
  {"id": "e3", "source": "condition-1", "target": "ecpay-1"},
  {"id": "e4", "source": "linepay-1", "target": "notify-1"},
  {"id": "e5", "source": "ecpay-1", "target": "notify-1"}
]',
'{"autoSave": true, "gridSize": 20}', true, 25, 4.5),

('桃機航班通知模板', '定時查詢桃園機場航班資訊並透過 Line 通知', '交通', ARRAY['航班', '通知', '桃園機場'],
'[
  {
    "id": "schedule-1",
    "type": "scheduleTrigger",
    "position": {"x": 100, "y": 100},
    "data": {"label": "每小時查詢"}
  },
  {
    "id": "airport-1",
    "type": "taoyuanAirport",
    "position": {"x": 300, "y": 100},
    "data": {"label": "查詢航班"}
  },
  {
    "id": "condition-1",
    "type": "condition", 
    "position": {"x": 500, "y": 100},
    "data": {"label": "檢查延誤"}
  },
  {
    "id": "notify-1",
    "type": "lineNotify",
    "position": {"x": 700, "y": 100},
    "data": {"label": "延誤通知"}
  }
]',
'[
  {"id": "e1", "source": "schedule-1", "target": "airport-1"},
  {"id": "e2", "source": "airport-1", "target": "condition-1"},
  {"id": "e3", "source": "condition-1", "target": "notify-1"}
]',
'{"autoSave": true, "gridSize": 20}', true, 18, 4.2),

('政府資料監控模板', '監控政府開放資料更新並發送通知', '資料', ARRAY['政府資料', '監控', '通知'],
'[
  {
    "id": "schedule-1",
    "type": "scheduleTrigger",
    "position": {"x": 100, "y": 100},
    "data": {"label": "每日檢查"}
  },
  {
    "id": "govdata-1",
    "type": "govOpenData",
    "position": {"x": 300, "y": 100},
    "data": {"label": "查詢資料"}
  },
  {
    "id": "condition-1",
    "type": "condition",
    "position": {"x": 500, "y": 100},
    "data": {"label": "檢查更新"}
  },
  {
    "id": "email-1",
    "type": "email",
    "position": {"x": 700, "y": 100},
    "data": {"label": "更新通知"}
  }
]',
'[
  {"id": "e1", "source": "schedule-1", "target": "govdata-1"},
  {"id": "e2", "source": "govdata-1", "target": "condition-1"},
  {"id": "e3", "source": "condition-1", "target": "email-1"}
]',
'{"autoSave": true, "gridSize": 20}', true, 12, 4.0);

-- 建立預設管理員使用者（密碼: admin123）
INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser) VALUES
('admin@taiwan-zapier.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5u', '系統管理員', true, true);

-- 為管理員建立個人檔案
INSERT INTO user_profiles (user_id, bio, location, timezone, language) VALUES
(1, '台灣在地化流程自動化平台系統管理員', '台北市', 'Asia/Taipei', 'zh-TW');

-- 為管理員建立偏好設定
INSERT INTO user_preferences (user_id, theme, email_notifications, workflow_notifications) VALUES
(1, 'light', true, true);

-- 建立範例使用者（密碼: user123）
INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser) VALUES
('user@example.com', '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '範例使用者', true, false);

-- 為範例使用者建立個人檔案
INSERT INTO user_profiles (user_id, bio, location, timezone, language, workflow_count) VALUES
(2, '我是一個工作流自動化愛好者，專注於台灣在地服務整合', '台中市', 'Asia/Taipei', 'zh-TW', 0);

-- 為範例使用者建立偏好設定
INSERT INTO user_preferences (user_id, theme, email_notifications, workflow_notifications, execution_notifications) VALUES
(2, 'light', true, true, false);

-- 建立範例工作流
INSERT INTO workflows (user_id, name, description, status, category, tags, nodes, edges, settings) VALUES
(2, '我的第一個工作流', '這是一個簡單的 Line Pay 付款工作流範例', 'draft', '金流', ARRAY['Line Pay', '測試'], 
'[
  {
    "id": "trigger-1",
    "type": "manualTrigger",
    "position": {"x": 100, "y": 100},
    "data": {"label": "手動觸發"}
  },
  {
    "id": "linepay-1", 
    "type": "linePay",
    "position": {"x": 300, "y": 100},
    "data": {"label": "Line Pay", "amount": 1000, "productName": "測試商品"}
  }
]',
'[
  {"id": "edge-1", "source": "trigger-1", "target": "linepay-1", "animated": true}
]',
'{"autoSave": true, "gridSize": 20, "snapToGrid": true}');

-- 更新統計資訊
UPDATE user_profiles SET workflow_count = 1 WHERE user_id = 2;
