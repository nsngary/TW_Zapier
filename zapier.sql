-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2025 年 08 月 20 日 08:00
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `zapier`
--

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL COMMENT '使用者ID',
  `email` varchar(255) NOT NULL COMMENT '電子郵件',
  `password` varchar(255) NOT NULL COMMENT '密碼雜湊',
  `name` varchar(100) NOT NULL COMMENT '使用者姓名',
  `avatar` varchar(255) DEFAULT NULL COMMENT '頭像檔案路徑',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '帳號狀態 1:啟用 0:停用',
  `email_verified` tinyint(1) NOT NULL DEFAULT 0 COMMENT '信箱驗證狀態',
  `last_login` timestamp NULL DEFAULT NULL COMMENT '最後登入時間',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立時間',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `app_categories`
--

CREATE TABLE `app_categories` (
  `id` int(11) NOT NULL COMMENT '分類ID',
  `name` varchar(100) NOT NULL COMMENT '分類名稱',
  `slug` varchar(100) NOT NULL COMMENT '分類代碼',
  `description` text DEFAULT NULL COMMENT '分類描述',
  `icon` varchar(255) DEFAULT NULL COMMENT '分類圖示',
  `color` varchar(7) DEFAULT '#007bff' COMMENT '分類顏色',
  `sort_order` int(11) NOT NULL DEFAULT 0 COMMENT '排序順序',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否啟用',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `apps`
--

CREATE TABLE `apps` (
  `id` int(11) NOT NULL COMMENT '應用程式ID',
  `name` varchar(100) NOT NULL COMMENT '應用程式名稱',
  `slug` varchar(100) NOT NULL COMMENT '應用程式代碼',
  `description` text DEFAULT NULL COMMENT '應用程式描述',
  `short_description` varchar(255) DEFAULT NULL COMMENT '簡短描述',
  `logo` varchar(255) DEFAULT NULL COMMENT 'Logo檔案路徑',
  `website_url` varchar(255) DEFAULT NULL COMMENT '官方網站',
  `category_id` int(11) DEFAULT NULL COMMENT '分類ID',
  `is_featured` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否為精選應用',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否啟用',
  `rating` decimal(3,2) NOT NULL DEFAULT 0.00 COMMENT '評分 0.00-5.00',
  `total_integrations` int(11) NOT NULL DEFAULT 0 COMMENT '總整合數量',
  `total_users` int(11) NOT NULL DEFAULT 0 COMMENT '使用者數量',
  `pricing_type` enum('free','freemium','paid') NOT NULL DEFAULT 'freemium' COMMENT '定價類型',
  `tags` text DEFAULT NULL COMMENT '標籤 JSON格式',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立時間',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user_workflows`
--

CREATE TABLE `user_workflows` (
  `id` int(11) NOT NULL COMMENT '工作流程ID',
  `user_id` int(11) NOT NULL COMMENT '使用者ID',
  `name` varchar(255) NOT NULL COMMENT '工作流程名稱',
  `description` text DEFAULT NULL COMMENT '工作流程描述',
  `trigger_app_id` int(11) DEFAULT NULL COMMENT '觸發應用ID',
  `action_app_id` int(11) DEFAULT NULL COMMENT '動作應用ID',
  `config_data` text DEFAULT NULL COMMENT '配置資料 JSON格式',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否啟用',
  `last_run` timestamp NULL DEFAULT NULL COMMENT '最後執行時間',
  `run_count` int(11) NOT NULL DEFAULT 0 COMMENT '執行次數',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立時間',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user_app_connections`
--

CREATE TABLE `user_app_connections` (
  `id` int(11) NOT NULL COMMENT '連接ID',
  `user_id` int(11) NOT NULL COMMENT '使用者ID',
  `app_id` int(11) NOT NULL COMMENT '應用程式ID',
  `connection_name` varchar(255) NOT NULL COMMENT '連接名稱',
  `auth_data` text DEFAULT NULL COMMENT '認證資料 加密JSON格式',
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否啟用',
  `last_used` timestamp NULL DEFAULT NULL COMMENT '最後使用時間',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立時間',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `avatar`, `status`, `email_verified`, `last_login`) VALUES
(1, 'admin@twzapier.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'TW_Zapier 管理員', NULL, 1, 1, '2025-08-20 08:00:00'),
(2, 'demo@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '示範使用者', NULL, 1, 1, '2025-08-20 07:30:00');

--
-- 傾印資料表的資料 `app_categories`
--

INSERT INTO `app_categories` (`id`, `name`, `slug`, `description`, `icon`, `color`, `sort_order`, `is_active`) VALUES
(1, '生產力工具', 'productivity', '提升工作效率的應用程式', 'fas fa-tasks', '#28a745', 1, 1),
(2, '電子商務', 'ecommerce', '線上商店和銷售相關應用', 'fas fa-shopping-cart', '#007bff', 2, 1),
(3, '社群媒體', 'social-media', '社交網路和內容分享平台', 'fas fa-share-alt', '#e83e8c', 3, 1),
(4, '客戶關係管理', 'crm', '客戶管理和銷售追蹤工具', 'fas fa-users', '#fd7e14', 4, 1),
(5, '行銷工具', 'marketing', '數位行銷和廣告管理工具', 'fas fa-bullhorn', '#6f42c1', 5, 1),
(6, '財務管理', 'finance', '會計、發票和財務管理工具', 'fas fa-dollar-sign', '#20c997', 6, 1),
(7, '通訊協作', 'communication', '團隊溝通和協作平台', 'fas fa-comments', '#17a2b8', 7, 1),
(8, '台灣在地服務', 'taiwan-local', '台灣本土化服務和政府資料', 'fas fa-map-marker-alt', '#dc3545', 8, 1);

--
-- 傾印資料表的資料 `apps`
--

INSERT INTO `apps` (`id`, `name`, `slug`, `description`, `short_description`, `logo`, `website_url`, `category_id`, `is_featured`, `is_active`, `rating`, `total_integrations`, `total_users`, `pricing_type`, `tags`) VALUES
(1, 'Gmail', 'gmail', 'Google 的免費電子郵件服務，提供強大的搜尋功能和大容量儲存空間。', '全球最受歡迎的電子郵件服務', 'logos/gmail.png', 'https://gmail.com', 7, 1, 1, 4.80, 15420, 1800000000, 'freemium', '["email", "google", "communication"]'),
(2, 'Slack', 'slack', '團隊協作和即時通訊平台，整合各種工作工具提升團隊效率。', '現代團隊的數位總部', 'logos/slack.png', 'https://slack.com', 7, 1, 1, 4.60, 8930, 12000000, 'freemium', '["team", "chat", "collaboration"]'),
(3, 'Trello', 'trello', '視覺化專案管理工具，使用看板方式組織任務和專案進度。', '簡單易用的專案管理工具', 'logos/trello.png', 'https://trello.com', 1, 1, 1, 4.50, 6780, 50000000, 'freemium', '["project-management", "kanban", "productivity"]'),
(4, 'Google Sheets', 'google-sheets', 'Google 的線上試算表工具，支援即時協作和強大的資料分析功能。', '雲端協作試算表', 'logos/google-sheets.png', 'https://sheets.google.com', 1, 1, 1, 4.70, 12340, 1000000000, 'freemium', '["spreadsheet", "data", "collaboration"]'),
(5, 'Shopify', 'shopify', '全球領先的電子商務平台，幫助企業建立和管理線上商店。', '打造您的線上商店', 'logos/shopify.png', 'https://shopify.com', 2, 1, 1, 4.40, 4560, 1700000, 'paid', '["ecommerce", "online-store", "sales"]'),
(6, 'Facebook', 'facebook', '全球最大的社交網路平台，連接世界各地的人們。', '連接全世界的社交平台', 'logos/facebook.png', 'https://facebook.com', 3, 1, 1, 4.20, 9870, 2900000000, 'free', '["social", "networking", "advertising"]'),
(7, 'HubSpot', 'hubspot', '全方位的客戶關係管理和行銷自動化平台。', 'CRM 和行銷自動化領導者', 'logos/hubspot.png', 'https://hubspot.com', 4, 1, 1, 4.50, 3450, 100000, 'freemium', '["crm", "marketing", "sales"]'),
(8, 'Mailchimp', 'mailchimp', '電子郵件行銷和自動化平台，幫助企業與客戶保持聯繫。', '電子郵件行銷專家', 'logos/mailchimp.png', 'https://mailchimp.com', 5, 1, 1, 4.30, 5670, 12000000, 'freemium', '["email-marketing", "automation", "newsletters"]'),
(9, 'QuickBooks', 'quickbooks', '小型企業會計和財務管理軟體，簡化記帳和報稅流程。', '小企業會計解決方案', 'logos/quickbooks.png', 'https://quickbooks.intuit.com', 6, 0, 1, 4.10, 2340, 4500000, 'paid', '["accounting", "finance", "invoicing"]'),
(10, 'LINE Pay', 'line-pay', 'LINE 推出的行動支付服務，在台灣廣泛使用的數位錢包。', '台灣熱門行動支付', 'logos/line-pay.png', 'https://pay.line.me', 8, 1, 1, 4.60, 890, 8000000, 'free', '["payment", "taiwan", "mobile-payment"]'),
(11, '綠界科技 ECPay', 'ecpay', '台灣領先的第三方支付服務商，提供多元化金流解決方案。', '台灣金流服務領導品牌', 'logos/ecpay.png', 'https://www.ecpay.com.tw', 8, 1, 1, 4.40, 1230, 150000, 'paid', '["payment", "taiwan", "fintech"]'),
(12, '政府資料開放平臺', 'gov-open-data', '中華民國政府資料開放平臺，提供各部會開放資料集。', '台灣政府開放資料', 'logos/gov-data.png', 'https://data.gov.tw', 8, 0, 1, 4.00, 450, 50000, 'free', '["government", "open-data", "taiwan"]');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_email_verified` (`email_verified`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- 資料表索引 `app_categories`
--
ALTER TABLE `app_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_sort_order` (`sort_order`),
  ADD KEY `idx_is_active` (`is_active`);

--
-- 資料表索引 `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `fk_apps_category` (`category_id`),
  ADD KEY `idx_is_featured` (`is_featured`),
  ADD KEY `idx_is_active` (`is_active`),
  ADD KEY `idx_rating` (`rating`),
  ADD KEY `idx_pricing_type` (`pricing_type`);

--
-- 資料表索引 `user_workflows`
--
ALTER TABLE `user_workflows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_workflows_user` (`user_id`),
  ADD KEY `fk_workflows_trigger_app` (`trigger_app_id`),
  ADD KEY `fk_workflows_action_app` (`action_app_id`),
  ADD KEY `idx_is_active` (`is_active`);

--
-- 資料表索引 `user_app_connections`
--
ALTER TABLE `user_app_connections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_connections_user` (`user_id`),
  ADD KEY `fk_connections_app` (`app_id`),
  ADD KEY `idx_is_active` (`is_active`),
  ADD UNIQUE KEY `unique_user_app_connection` (`user_id`, `app_id`, `connection_name`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `app_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `apps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

ALTER TABLE `user_workflows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_app_connections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `apps`
--
ALTER TABLE `apps`
  ADD CONSTRAINT `fk_apps_category` FOREIGN KEY (`category_id`) REFERENCES `app_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- 資料表的限制式 `user_workflows`
--
ALTER TABLE `user_workflows`
  ADD CONSTRAINT `fk_workflows_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_workflows_trigger_app` FOREIGN KEY (`trigger_app_id`) REFERENCES `apps` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_workflows_action_app` FOREIGN KEY (`action_app_id`) REFERENCES `apps` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- 資料表的限制式 `user_app_connections`
--
ALTER TABLE `user_app_connections`
  ADD CONSTRAINT `fk_connections_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_connections_app` FOREIGN KEY (`app_id`) REFERENCES `apps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
