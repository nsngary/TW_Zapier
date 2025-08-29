-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2025 年 08 月 20 日 06:44
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
-- 資料庫： `pharmacy`
--

-- --------------------------------------------------------

--
-- 資料表結構 `addbook`
--

CREATE TABLE `addbook` (
  `addressid` int(10) NOT NULL COMMENT '地址ID',
  `setdefault` tinyint(1) NOT NULL DEFAULT 0 COMMENT '預設收件人',
  `emailid` int(10) NOT NULL COMMENT '會員編號',
  `cname` varchar(30) NOT NULL COMMENT '收件者姓名',
  `mobile` varchar(20) NOT NULL COMMENT '收件者電話',
  `myZip` varchar(10) DEFAULT NULL COMMENT '郵遞區號',
  `address` varchar(200) NOT NULL COMMENT '收件地址',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `addbook`
--

INSERT INTO `addbook` (`addressid`, `setdefault`, `emailid`, `cname`, `mobile`, `myZip`, `address`, `create_date`) VALUES
(3, 1, 9, '林小強', '0912345678', '407', '工業區一路100號', '2021-04-22 02:39:50'),
(4, 0, 10, '李小明', '0934567891', '105', '中正路1號', '2021-04-22 02:41:48'),
(8, 0, 10, '陳小信', '0934567891', '223', '中正路1號', '2021-04-22 02:41:48'),
(9, 0, 10, '曹小成', '0934567891', '290', '中正路1號', '2021-04-22 02:41:48'),
(10, 1, 10, '張山山', '0934567891', '407', '工業區一路100號', '2021-04-23 12:00:59');

-- --------------------------------------------------------

--
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `account` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `username` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`account`, `password`, `username`) VALUES
('001', '123', '零零壹'),
('002', '123', '零零貳'),
('003', '123', '零零參'),
('004', '123', '零零肆'),
('005', '123', '零零伍'),
('006', '123', '零零陸'),
('007', '123', '零零柒'),
('008', '123', '零零捌'),
('009', '123', '零零玖'),
('admin', '123', '管理員'),
('admin_Chuck', '123', 'Chuck'),
('admin_Howard', '123', 'Howard'),
('admin_Jimmy', '123', 'Jimmy'),
('admin_Kim', '123', 'Kim'),
('admin_Mike', '123', 'Mike'),
('admin_Nacho', '123', 'Nacho'),
('admin_Samansha', '123', 'Samansha');

-- --------------------------------------------------------

--
-- 資料表結構 `carousel`
--

CREATE TABLE `carousel` (
  `caro_id` int(3) NOT NULL COMMENT '輪播編號',
  `caro_title` varchar(50) DEFAULT NULL COMMENT '輪播標題',
  `caro_content` varchar(100) DEFAULT NULL COMMENT '輪播內容介紹',
  `caro_online` tinyint(1) NOT NULL DEFAULT 1 COMMENT '上下架',
  `caro_sort` int(3) NOT NULL COMMENT '輪播排序',
  `caro_pic` varchar(50) NOT NULL COMMENT '輪播圖檔名稱',
  `p_id` int(10) NOT NULL COMMENT '產品編號',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `carousel`
--

INSERT INTO `carousel` (`caro_id`, `caro_title`, `caro_content`, `caro_online`, `caro_sort`, `caro_pic`, `p_id`, `create_date`) VALUES
(1, '雙11正式開跑 SOFINA全館5折起 - SOFINA 限時特惠', 'SOFINA iP限定組合下殺39折起，加碼再送『iP美容液30g』，全館滿額再享現金回饋。[雙11正式開跑]SOFINA 全年最低價，全館最低5折起。', 1, 1, 'pic0.jpg', 13, '2021-03-18 03:59:55'),
(2, '建康養生的好幫手', '華陀扶元堂養生飲品系列3折優惠，歡迎選購', 1, 2, 'pic2.jpg', 49, '2021-03-18 03:59:55'),
(3, '頂級保濕面膜，臉部滋養的好幫手', 'My Beauty Diary熱銷7款面膜特價優惠，歡迎選購', 1, 3, 'pic3.jpg', 50, '2021-03-18 03:59:55'),
(4, '慶祝媽媽節特惠方案', '為感恩全天下辛苦的母親節特別推出一系列優惠專案', 1, 4, 'pic1.jpg', 51, '2021-03-18 03:59:55');

-- --------------------------------------------------------

--
-- 資料表結構 `cart`
--

CREATE TABLE `cart` (
  `cartid` int(10) NOT NULL COMMENT '購物車編號',
  `emailid` int(10) DEFAULT NULL COMMENT '會員編號',
  `p_id` int(10) NOT NULL COMMENT '產品編號',
  `qty` int(3) NOT NULL COMMENT '產品數量',
  `orderid` varchar(30) DEFAULT NULL COMMENT '訂單編號',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '訂單處理狀態',
  `ip` varchar(200) NOT NULL COMMENT '訂購者的IP',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '加入購物車時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `cart`
--

INSERT INTO `cart` (`cartid`, `emailid`, `p_id`, `qty`, `orderid`, `status`, `ip`, `create_date`) VALUES
(66, 10, 42, 3, '1619161669175448', 1, '::1', '2021-04-23 07:06:48'),
(67, 10, 43, 3, '1619161669175448', 1, '::1', '2021-04-23 07:06:54'),
(68, 10, 15, 13, '1619161669175448', 1, '::1', '2021-04-23 07:07:03'),
(69, 10, 27, 2, '1619161669175448', 1, '::1', '2021-04-23 07:07:15'),
(70, 10, 51, 1, '1619161734581887', 1, '::1', '2021-04-23 07:08:16'),
(71, 10, 47, 1, '1619161734581887', 1, '::1', '2021-04-23 07:08:20'),
(72, 10, 46, 1, '1619161734581887', 1, '::1', '2021-04-23 07:08:24'),
(74, 10, 27, 1, '1619181180278775', 1, '::1', '2021-04-23 07:22:31'),
(76, 10, 26, 1, '1619181180278775', 1, '::1', '2021-04-23 07:22:38'),
(78, 10, 51, 1, '1619260500232495', 1, '::1', '2021-04-23 12:39:53'),
(79, 10, 28, 2, '1619260500232495', 1, '::1', '2021-04-23 12:39:56'),
(80, 10, 25, 3, '1619260500232495', 1, '::1', '2021-04-23 12:39:59'),
(81, 10, 21, 1, '1619260500232495', 1, '::1', '2021-04-23 12:40:03'),
(82, 10, 48, 1, '1619261102143533', 1, '::1', '2021-04-24 10:43:59'),
(83, 10, 47, 1, '1619261102143533', 1, '::1', '2021-04-24 10:44:02'),
(84, 10, 46, 1, '1619261102143533', 1, '::1', '2021-04-24 10:44:04'),
(86, 10, 45, 1, '1619261102143533', 1, '::1', '2021-04-24 10:44:12'),
(87, 10, 20, 1, '1619261102143533', 1, '::1', '2021-04-24 10:44:20'),
(88, 10, 19, 1, '1619261102143533', 1, '::1', '2021-04-24 10:44:25'),
(89, 10, 50, 1, '1619261151557635', 1, '::1', '2021-04-24 10:45:29');

-- --------------------------------------------------------

--
-- 資料表結構 `city`
--

CREATE TABLE `city` (
  `AutoNo` int(10) NOT NULL COMMENT '城市編號',
  `Name` varchar(150) NOT NULL COMMENT '城市名稱',
  `cityOrder` tinyint(2) NOT NULL COMMENT '標記',
  `State` smallint(6) NOT NULL COMMENT '狀態'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `city`
--

INSERT INTO `city` (`AutoNo`, `Name`, `cityOrder`, `State`) VALUES
(1, '臺北市', 0, 0),
(2, '基隆市', 0, 0),
(3, '新北市', 0, 0),
(4, '宜蘭縣', 0, 0),
(5, '新竹市', 0, 0),
(6, '新竹縣', 0, 0),
(7, '桃園市', 0, 0),
(8, '苗栗縣', 0, 0),
(9, '台中市', 0, 0),
(10, '彰化縣', 0, 0),
(11, '南投縣', 0, 0),
(12, '雲林縣', 0, 0),
(13, '嘉義市', 0, 0),
(14, '嘉義縣', 0, 0),
(15, '台南市', 0, 0),
(16, '高雄市', 0, 0),
(17, '南海諸島', 0, 0),
(18, '澎湖縣', 0, 0),
(19, '屏東縣', 0, 0),
(20, '台東縣', 0, 0),
(21, '花蓮縣', 0, 0),
(22, '金門縣', 0, 0),
(23, '連江縣', 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `hot`
--

CREATE TABLE `hot` (
  `h_id` int(3) NOT NULL COMMENT '熱銷商品流水號',
  `p_id` int(10) NOT NULL COMMENT '產品編號',
  `h_sort` int(3) DEFAULT NULL COMMENT '熱銷商品排名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `hot`
--

INSERT INTO `hot` (`h_id`, `p_id`, `h_sort`) VALUES
(1, 13, 1),
(2, 14, 2),
(3, 15, 3);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `emailid` int(11) NOT NULL COMMENT 'email流水號',
  `email` varchar(100) NOT NULL COMMENT 'email帳號',
  `pw1` varchar(50) NOT NULL COMMENT '密碼',
  `active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否啟動',
  `cname` varchar(30) NOT NULL COMMENT '中文姓名',
  `tssn` varchar(20) NOT NULL COMMENT '身份證字號',
  `birthday` date NOT NULL COMMENT '生日',
  `imgname` text DEFAULT NULL COMMENT '相片檔名',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`emailid`, `email`, `pw1`, `active`, `cname`, `tssn`, `birthday`, `imgname`, `create_date`) VALUES
(9, 'test@gmail.com', '123456', 1, '林小強', 'A123456789', '2021-04-01', '', '2021-04-22 02:39:50'),
(10, 'te@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, '李小明', 'A223456789', '2021-04-01', '', '2021-04-22 02:41:48');

-- --------------------------------------------------------

--
-- 資料表結構 `mright`
--

CREATE TABLE `mright` (
  `account` varchar(10) NOT NULL,
  `sid` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `mright`
--

INSERT INTO `mright` (`account`, `sid`) VALUES
('001', 's01'),
('002', 's02'),
('003', 's01'),
('003', 's02'),
('003', 's03'),
('004', 's02'),
('admin', 's00'),
('admin', 's01'),
('admin', 's02'),
('admin', 's03');

-- --------------------------------------------------------

--
-- 資料表結構 `multiselect`
--

CREATE TABLE `multiselect` (
  `msid` int(5) NOT NULL COMMENT '多功能選擇ID',
  `mslevel` int(2) NOT NULL COMMENT '多功能選擇層級',
  `msuplink` int(4) NOT NULL COMMENT '上層連結',
  `opcode` varchar(10) DEFAULT NULL COMMENT '外掛參數',
  `msname` varchar(50) NOT NULL COMMENT '多功能選擇名稱',
  `msort` int(11) DEFAULT NULL COMMENT '各功能列表排序',
  `url1` varchar(200) DEFAULT NULL COMMENT '外掛網址1',
  `url2` varchar(200) DEFAULT NULL COMMENT '外掛網址2',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立日期',
  `update_date` varchar(50) DEFAULT NULL COMMENT '修改日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `multiselect`
--

INSERT INTO `multiselect` (`msid`, `mslevel`, `msuplink`, `opcode`, `msname`, `msort`, `url1`, `url2`, `create_date`, `update_date`) VALUES
(1, 1, 0, NULL, '付款方式', 0, NULL, NULL, '2023-08-11 09:46:53', '2023-08-17 03:42:28'),
(2, 1, 0, NULL, '訂單處理狀態', 0, NULL, NULL, '2023-08-11 09:52:29', '2023-08-17 03:42:41'),
(3, 2, 1, NULL, '貨到付款', 1, NULL, NULL, '2023-08-11 09:55:45', '2023-08-17 03:43:37'),
(4, 2, 1, NULL, '信用卡付款', 2, NULL, NULL, '2023-08-11 09:55:45', '2023-08-17 03:43:54'),
(5, 2, 1, NULL, '銀行轉帳', 3, NULL, NULL, '2023-08-11 09:55:45', '2023-08-17 03:44:37'),
(6, 2, 1, NULL, '電子支付', 4, NULL, NULL, '2023-08-11 09:55:45', '2023-08-17 03:44:51'),
(7, 2, 2, NULL, '處理中', 1, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 03:45:03'),
(8, 2, 2, NULL, '待出貨', 2, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 03:45:32'),
(9, 2, 2, NULL, '運送中', 3, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 03:45:45'),
(10, 2, 2, NULL, '收貨完成', 4, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 03:46:10'),
(11, 2, 2, NULL, '退貨中', 5, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 03:46:24'),
(12, 2, 2, NULL, '已關閉訂單', 6, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 03:46:35'),
(13, 2, 2, NULL, '無效訂單', 7, NULL, NULL, '2023-08-11 10:06:42', '2023-08-17 05:39:26'),
(14, 2, 2, NULL, '訂單確認', 8, NULL, NULL, '2023-08-18 06:13:47', '2023-10-23 12:37:36'),
(15, 2, 2, NULL, '平台出貨', 9, NULL, NULL, '2023-08-18 06:13:47', '2023-10-25 08:29:31'),
(34, 1, 0, NULL, '付款處理狀態', 0, NULL, NULL, '2023-08-11 09:52:29', '2023-08-17 03:42:41'),
(35, 2, 34, NULL, '侍貨到付款', 1, NULL, NULL, '2023-08-11 09:55:45', '2023-10-25 08:39:12'),
(36, 2, 34, NULL, '完成付款', 2, NULL, NULL, '2023-08-11 09:55:45', '2023-10-25 08:39:12'),
(37, 2, 34, NULL, '未完成付款', 3, NULL, NULL, '2023-08-11 09:55:45', '2023-10-25 08:39:12'),
(38, 2, 34, NULL, '貨到付款已完成', 4, NULL, NULL, '2023-08-11 09:55:45', '2023-10-25 08:39:12');

-- --------------------------------------------------------

--
-- 資料表結構 `product`
--

CREATE TABLE `product` (
  `p_id` int(10) NOT NULL COMMENT '產品編號',
  `classid` int(3) NOT NULL COMMENT '產品類別',
  `p_name` varchar(200) NOT NULL COMMENT '產品名稱',
  `p_intro` varchar(200) DEFAULT NULL COMMENT '產品簡介',
  `p_price` int(11) DEFAULT NULL COMMENT '產品單價',
  `p_open` tinyint(1) NOT NULL DEFAULT 1 COMMENT '上架',
  `p_content` text DEFAULT NULL COMMENT '產品詳細規格',
  `p_date` timestamp NULL DEFAULT current_timestamp() COMMENT '產品輸入日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `product`
--

INSERT INTO `product` (`p_id`, `classid`, `p_name`, `p_intro`, `p_price`, `p_open`, `p_content`, `p_date`) VALUES
(13, 117, 'SOFINA蘇菲娜漾緁控油瓷效妝前隔離乳進化版25ml', '防止泛油光、黏膩脫妝的長效控油持妝配方\r\n添加隔離皮脂定妝成分(Zinc OxidePerfluorohexylethoxy Dimethicone)\r\n修飾膚色不均呈現明亮勻透好膚質\r\n可當作妝前打底使用\r\n添加保濕成分(玻尿酸)\r\n無香料\r\nSPA16PA++\r\n衛部粧輸字第 025861 號', 350, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"蘇菲娜漾緁控油瓷效妝前隔離乳進化版25ml，除了SOFINA等推薦品牌，屈臣氏提供多種熱銷隔離霜/飾底乳商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>防止泛油光、黏膩脫妝的長效控油持妝配方<br>添加隔離皮脂定妝成分(Zinc OxidePerfluorohexylethoxy Dimethicone)<br>修飾膚色不均呈現明亮勻透好膚質<br>可當作妝前打底使用<br>添加保濕成分(玻尿酸)<br>無香料<br>SPA16PA++<br>衛部粧輸字第 025861 號</p></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">自信透亮不脫妝、控油持妝經典再強化高效控油效果可延緩出油及提升持妝度</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">SOFINA</td></tr><tr><td class=\"td1\">原產地</td><td class=\"td2\">日本</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">3.5x2.7x10cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">48 g</td></tr><tr><td class=\"td1\">容量</td><td class=\"td2\">25 ml</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>JP</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>10</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>2.7</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>3.5</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00'),
(14, 21, 'Touch in SOL\r\nTouch in SOL光之瀅 蜂蜜保濕隔離凝露32g', '\r\n高保濕乾性肌膚推薦 蜂蜜般絲滑質地打底同時護理肌膚 滋潤肌膚體驗從肌膚深處散發出的緊緻光彩', 590, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"Touch in SOL光之瀅 蜂蜜保濕隔離凝露32g，除了Touch in SOL等推薦品牌，屈臣氏提供多種熱銷隔離乳/霜商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>此為廠商直送商品 預計出貨日2-5天</p><p>&nbsp;<img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/200147/20201207154239003560.jpg\"></p></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">高保濕乾性肌膚推薦 蜂蜜般絲滑質地打底同時護理肌膚 滋潤肌膚體驗從肌膚深處散發出的緊緻光彩</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">Touch in SOL</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">32g</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">N</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>南韓</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00'),
(15, 21, 'Darphin 朵法 全效舒緩輕透組[精華液50mlX2+隔離霜30ml]', 'Darphin 朵法 全效舒緩輕透組[精華液50mlX2+隔離霜30ml]，除了Darphin 朵法等推薦品牌，屈臣氏提供多種熱銷精華液 /霜商品選擇，全面符合您的需求。', 6899, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"Darphin 朵法 全效舒緩輕透組[精華液50mlX2+隔離霜30ml]，除了Darphin 朵法等推薦品牌，屈臣氏提供多種熱銷精華液 /霜商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>此為廠商直送商品 預計出貨日2-5天</p><p>中文品名Darphin 朵法 全效舒緩輕透組[精華液50mlX2+隔離霜30ml]<br>規格<br>Darphin 朵法 全效舒緩精華液(50ml)X2<br>Darphin 朵法 全效舒緩輕透防護隔離霜SPF50(30ml)</p><p>使用方式一般使用方法。<br>保存方法請置於陰涼處請勿直接陽光照射以免變質。&nbsp;<br>溫馨提醒&nbsp;<br>本產品屬於私人消耗性產品已拆封或使用過、無法恢復原狀、商品外盒損壞等均恕無法辦理退換貨。&nbsp;<br>使用後若有過敏請即刻停止使用並請教醫生。&nbsp;<br>退貨時務必附回原完整商品、贈品、包裝外盒均齊全。&nbsp;<br>商品建議下訂前先實際試色、試用後再購買若因顏色不符或皮膚不適等症狀恕不接受退換。&nbsp;<br>個人電腦螢幕差異、照片拍攝關係造成色差請以實際商品為準。</p></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">公司貨 母親節必敗組合 專櫃熱銷商品 網路優惠價</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">Darphin 朵法</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">N</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>FR</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2021-03-10 07:15:16'),
(16, 21, 'L\'OREAL PARIS 巴黎萊雅完美UV全效防護隔離乳-紫色30ml SPF50+ PA++++', '完美UV 全效防護隔離乳 SPF50+ PA++++ 紫色\r\n\r\n修飾暗黃 美肌防曬\r\n\r\n特級專利 抵禦3重紫外線\r\n\r\n獨特麥素寧濾光環MEXORYL®SX+ XL防曬科技高效專利濾劑形成終極防護網\r\n\r\n抵禦3重紫外線<深層長波UVA / UVA / UVB>有效降低曬黑深入防止長波紫外線造成的斑點、老化', 490, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"巴黎萊雅完美UV全效防護隔離乳-紫色30ml SPF50+ PA++++，除了L\'OREAL PARIS 巴黎萊雅等推薦品牌，屈臣氏提供多種熱銷防曬乳/噴霧商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p><strong>完美</strong><strong>UV </strong><strong>全效防護隔離乳</strong><strong> SPF50+ PA++++ </strong><strong>紫色</strong></p>    <p>修飾暗黃 美肌防曬</p>    <p><u>特級專利</u> <u>抵禦</u><u>3</u><u>重紫外線</u></p>    <p>獨特麥素寧濾光環MEXORYL®SX+ XL防曬科技高效專利濾劑形成終極防護網</p>    <p>抵禦3重紫外線&lt;深層長波UVA / UVA / UVB&gt;有效降低曬黑深入防止長波紫外線造成的斑點、老化</p>    <p>&nbsp;</p>    <p><u>防禦修護</u> <u>全面抗黑抗老</u></p>    <p>Detoxyl 隔離防護因子提升肌膚對環境傷害之保護力</p>    <p>Activa-Cell酵素精華有效預防鬆弛、細紋</p>    <p>維生素CG與維生素E美白肌膚提亮膚色</p>    <p>&nbsp;</p>    <p><u>修飾暗黃</u> <u>明亮膚色</u></p>    <p>紫色配方修飾偏黃膚色遮蓋暗沉瑕疵提亮肌膚</p>    <p>與肌膚自然融合展現無瑕美肌</p>    <p>&nbsp;</p>    <p>單擦、妝前隔離飾底皆適宜</p>    <p>極細緻輕盈質地快速吸收無黏膩感無泛白</p>    <p>&nbsp;</p>    <p>一般到敏感膚質適用。具極高抗汗性適合戶外運動</p>    <p>為避免肌膚曬傷達有效UV防護建議每2小時補擦一次</p></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">修飾暗黃 美肌防曬</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">L`OREAL PARIS 巴黎萊雅</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">7.8x1.8x18cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">30 g</td></tr><tr><td class=\"td1\">容量</td><td class=\"td2\">30 ml</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><p class=\"ecTitle\">廠商資訊</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">製造商名稱</td><td class=\"td2\">台灣萊雅股份有限公司</td></tr><tr><td class=\"td1\">製造商電話</td><td class=\"td2\">87225690</td></tr><tr><td class=\"td1\">製造商地址</td><td class=\"td2\">台北市信義區信義路5段7號22樓</td></tr><tr><td class=\"td1\">製造商服務專線</td><td class=\"td2\">800044888</td></tr><tr><td class=\"td1\">製造商服務時間</td><td class=\"td2\">9:30~17:30</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>ID</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>18</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>1.8</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>7.8</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2021-03-10 07:18:41'),
(17, 21, 'Biore 蜜妮淨嫩沐浴乳 浪漫櫻花香 水采保濕型 1000g', '全新升級 礦物來源溫和潔淨配方讓你在香氛輕舞中實現淨亮柔嫩，柔和浪漫的櫻花香氛沉浸如春日裡瀰漫的愉悅舒心解放一天疲憊身心舒放無負擔', 125, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<p class=\"ecTitle\">全新升級 礦物來源溫和潔淨配方</p>\n<div class=\"longDesc\">\n<p>讓你在香氛輕舞中實現淨亮柔嫩<br />&bull; 柔和浪漫的櫻花香氛沉浸如春日裡瀰漫的愉悅舒心解放一天疲憊身心舒放無負擔<br />&bull; 添加玻尿酸保濕精華洗後肌膚水嫩細緻綻放水亮光采<br />&bull; 全新升級日本淨膚鎖水技術並添加源自天然保濕因子(NMF)*補給水分並快速鎖住關鍵水提升肌膚保水力 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<br />&bull; 日本創新研發礦物來源溫和潔淨配方超細緻保水泡泡溫柔洗淨皮脂與污垢乾淨清爽不黏膩一沖即淨不易殘留<br />*Sodium PCA</p>\n<p>*此商品有新舊包裝請以實際收到商品為主</p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">全新升級 礦物來源溫和潔淨配方 添加玻尿酸保濕精華洗後肌膚水嫩細緻綻放水亮光采</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Biore 蜜妮</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">1000ml</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">8.5x9.6x24.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">1000 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">1000 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>24.5</p>\n<h4>Width</h4>\n<p>9.6</p>\n<h4>Depth</h4>\n<p>8.5</p>\n</div>', '2021-03-10 07:18:41'),
(18, 21, 'NARUKO 牛爾親研NARUKO森玫瑰雪姬女神素顏霜SPF30+++25g', '妝亮白心機神器打造超犯規勻淨素顏立現光透無瑕女神肌，高效防護修飾膚色水潤嫩白', 549, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">妝亮白心機神器打造超犯規勻淨素顏立現光透無瑕女神肌</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">NARUKO 牛爾親研</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">25g</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">6.9x6.9x6.7cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">109 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">三年</td>\n</tr>\n<tr>\n<td class=\"td1\">注意事項</td>\n<td class=\"td2\">敏感肌膚小心使用。</td>\n</tr>\n<tr>\n<td class=\"td1\">目的功效</td>\n<td class=\"td2\">高效防護修飾膚色水潤嫩白</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>6.7</p>\n<h4>Width</h4>\n<p>6.9</p>\n<h4>Depth</h4>\n<p>6.9</p>\n</div>', '2021-03-10 07:18:41'),
(19, 21, '曼秀雷敦SUNPLAY柔光美肌防曬乳液35g', '晴空藍色調防曬 最強美肌飾底防曬!', 172, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"曼秀雷敦SUNPLAY柔光美肌防曬乳液35g，除了曼秀雷敦等推薦品牌，屈臣氏提供多種熱銷身體防曬商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/194327/20200412191611069008.jpg\"></p><br></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">晴空藍色調防曬 最強美肌飾底防曬!</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">曼秀雷敦</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">30g</td></tr><tr><td class=\"td1\">原產地</td><td class=\"td2\">越南</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">2.5x8.2x17.9cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">30 g</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>VN</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>17.9</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>8.2</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>2.5</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2021-03-10 07:18:41'),
(20, 21, 'L\'OREAL PARIS 巴黎萊雅青春密碼注入式酵素精華面膜獨家5入組 (33gx5)', '巴黎萊雅青春密碼注入式酵素精華面膜 5入組 (33g x 5)一片蘊含一整瓶98%高純度酵母精華含豐富的胺基酸、維他命B並添加專櫃級精華成份從肌底喚活年輕\r\n獨特純淨海藻面膜紙可乘載30g 以上精華液', 499, 1, '<div class=\"drop-box\">\n<p><iframe id=\"806192243\" style=\"width: 958px;\" src=\"https://www.youtube.com/embed/8KfMQ72aeBo?enablejsapi=1&amp;origin=https%3A%2F%2Fwww.watsons.com.tw\" width=\"640\" height=\"360\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" data-gtm-yt-inspected-1471862_269=\"true\" data-gtm-yt-inspected-1_25=\"true\"></iframe></p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><strong>巴黎萊雅青春密碼注入式酵素精華面膜 5入組 (33g x 5)</strong></p>\n<p>一片蘊含一整瓶98%高純度酵母精華含豐富的胺基酸、維他命B並添加專櫃級精華成份從肌底喚活年輕</p>\n<p>獨特純淨海藻面膜紙可乘載30g 以上精華液</p>\n<p><img src=\"https://s.yimg.com/mm/Files/01933221c3a1ef66c45bb1a9db2cb32ac8b88fbb_1000x1000.jpg\" alt=\"\" width=\"1000\" height=\"1000\" /></p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">一片蘊含一整瓶98%高純度酵母精華含豐富的胺基酸、維他命B並添加專櫃級精華成份從肌底喚活年輕</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">L`OREAL PARIS 巴黎萊雅</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">3x16.5x17.1cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">165 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">165 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>17.1</p>\n<h4>Width</h4>\n<p>16.5</p>\n<h4>Depth</h4>\n<p>3</p>\n</div>', '2021-03-10 07:18:41'),
(21, 21, 'Biore 蜜妮 Biore A極效防曬噴霧 50g', '全新A極效防曬系列 防曬噴霧\r\nSPF50+ PA++++最高等級防曬噴霧\r\nBiore 獨特研發 密著薄透 耐久防禦層\r\n容易噴附高效密著\r\n輕薄且均勻地包覆全身\r\n極效耐磨擦、耐汗水(極效耐久技術)\r\n針對防曬難以塗抹的部位: 頭部、背部周圍、大腿、小腿背面、腳尖\r\n密著透明噴霧 清涼滑順膚觸\r\n肥皂即可洗淨\r\n無香料\r\n無白色殘留', 109, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"Biore A極效防曬噴霧 50g，除了Biore 蜜妮等推薦品牌，屈臣氏提供多種熱銷身體防曬商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>全新A極效防曬系列 防曬噴霧<br>SPF50+ PA++++最高等級防曬噴霧<br>Biore&nbsp;獨特研發 密著薄透 耐久防禦層<br>容易噴附高效密著<br>輕薄且均勻地包覆全身<br>極效耐磨擦、耐汗水(極效耐久技術)<br>針對防曬難以塗抹的部位: 頭部、背部周圍、大腿、小腿背面、腳尖<br>密著透明噴霧 清涼滑順膚觸<br>肥皂即可洗淨<br>無香料<br>無白色殘留<br>極效防水(防水測試80分鐘)<br>在汗濕沾水肌膚上也能高效附著<br>倒著噴也OK<br>上粧也可補防曬<br>可當粧前隔離霜<br>不易致粉刺配方 (經粉刺測試通過*)<br>所有測試者皆通過施行上述試驗但並非表示所有人都不會有粉刺生成</p></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">SPF50+最高等級防曬獨特研發耐久防禦層不只防水耐汗還能耐磨擦嚴苛環境下依然超防曬</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">Biore 蜜妮</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">50g</td></tr><tr><td class=\"td1\">原產地</td><td class=\"td2\">日本</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">8.5x3.5x17.2cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">50 g</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>日本</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>17.2</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>3.5</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>8.5</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2021-03-10 07:18:41'),
(22, 21, 'ALLIE EX UV高效防曬水凝乳N 90g', '抗摩擦 x 防水清爽肌至上防曬新水感', 850, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><img style=\"height: 650px; width: 650px;\" src=\"https://pii.tradevan.com.tw/APIIP/mspPic//164/164509//202103/20210303141930524136.jpg\" alt=\"\" /></p>\n<p><img style=\"height: 650px; width: 650px;\" src=\"https://pii.tradevan.com.tw/APIIP/mspPic//164/164509//202103/20210303141950649137.jpg\" alt=\"\" /></p>\n<p>&nbsp;</p>\n<p><img src=\"https://img.watsons.com.tw/ecftp/193516/20210128154137290901.jpg\" alt=\"\" /></p>\n<p>&nbsp;</p>\n<p><img src=\"https://img.watsons.com.tw/ecftp/193516/20210128154151522902.jpg\" alt=\"\" /></p>\n<p>&nbsp;</p>\n<p><img style=\"height: 650px; width: 650px;\" src=\"https://pii.tradevan.com.tw/APIIP/mspPic//164/164509//202103/20210303142018789138.jpg\" alt=\"\" /></p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">抗摩擦 x 防水清爽肌至上防曬新水感</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">ALLIE</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">90g</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">日本</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">4x9x19.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">114 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>Height</h4>\n<p>19.5</p>\n<h4>Width</h4>\n<p>9</p>\n<h4>Depth</h4>\n<p>4</p>\n</div>', '2021-03-10 07:18:41'),
(23, 21, 'SOFINA透美顏混合肌適用飽水控油雙效日間防護乳 30ml', '<無油膩SC高保濕成分配合>嚴選植物菁華與植物來源成分。<高保濕Ceramide成分配合1>守護肌膚不受紫外線或是空調等日間乾燥的影響一整天持續水潤透亮2 。高保濕Ceramide配方守護補充Ceramide的作用給予肌膚滋潤的保養，黃柏(關黃柏樹皮)菁華尤加利菁華月下香多醣體甘油', 450, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>&lt;無油膩SC高保濕成分配合&gt;<br /><br />嚴選植物菁華與植物來源成分。<br /><br />&lt;高保濕Ceramide成分配合1&gt;<br /><br />守護肌膚不受紫外線或是空調等日間乾燥的影響一整天持續水潤透亮2 。<br /><br />高保濕Ceramide配方守護補充Ceramide的作用給予肌膚滋潤的保養<br /><br />黃柏(關黃柏樹皮)菁華尤加利菁華月下香多醣體甘油<br /><br />1保濕成分: Cetyl-PG Hydroxyethyl Palmitamide<br /><br />2 從早上使用後至晚上卸妝後</p>\n<br /><br />\n<p>輕盈不黏膩實現水潤且具有透明感的肌膚<br /><br />30年以上皮膚科學研究清爽不黏膩卻能深層滋潤肌膚的技術<br /><br />‧確實防禦UV-A與UV-B<br /><br />‧可長時間防止肌膚黏膩感<br /><br />‧清爽好吸收自然與肌膚融合可作為隔離霜、妝前修飾乳使用。<br /><br />‧淡雅花果香氛<br /><br />‧無油膩配方<br /><br />‧不易生成青春痘配方<br /><br />‧無著色</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">無油膩SC高保濕成分配合 輕盈不黏膩實現水潤且具有透明感的肌膚</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">SOFINA</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">日本</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">4.2x2.6x9.9cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">59 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">30 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">花王(台灣)股份有限公</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">86651987</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">新北市新店區北新路段號樓</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>JP</p>\n<h4>Height</h4>\n<p>9.9</p>\n<h4>Width</h4>\n<p>2.6</p>\n<h4>Depth</h4>\n<p>4.2</p>\n</div>', '2017-08-06 16:00:00'),
(24, 21, 'NIVEA 妮維雅全護清爽防曬隔離乳-敏感肌專用SPF50+ 50ml', '1.全面防護:德國專業防曬科技 2.敏感肌專用 3.好推好吸收 4.保濕補水', 329, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><img style=\"height: 650px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/196690/20200311173426752889.jpg\" alt=\"\" /></p>\n<br /><br />\n<p><img style=\"height: 650px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/196690/20200311173723178917.jpg\" alt=\"\" /></p>\n<br /><br />\n<p><img style=\"height: 650px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/196690/20200311173839174926.jpg\" alt=\"\" /></p>\n<p><img src=\"https://img.watsons.com.tw/ecftp/196690/20200205144907803186.jpg\" alt=\"\" /></p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">1.全面防護:德國專業防曬科技 2.敏感肌專用 3.好推好吸收 4.保濕補水</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">NIVEA 妮維雅</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">德國</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">2x9x19.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">50 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">50 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">30個月</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>DE</p>\n<h4>Height</h4>\n<p>19.5</p>\n<h4>Width</h4>\n<p>9</p>\n<h4>Depth</h4>\n<p>2</p>\n</div>', '2017-08-06 16:00:00'),
(25, 21, '肌研極潤完美多效清透凝露UV(50g)', '肌研濃極潤系列  完美一瓶 5效合一極致潤澤、高效美白、緊緻彈力全系列保養滿足肌膚各種需求讓肌膚美得更有效率輕鬆擁有光澤Q彈的青春美肌，肌研極潤完美多效清透凝露UV-5效合一最強防曬', 380, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><span style=\"font-size: 14px;\"><strong>肌研濃極潤系列 &nbsp;完美一瓶 5效合一</strong></span></p>\n<div style=\"margin: 0px; padding: 0px;\">\n<div style=\"margin: 0px; padding: 0px;\"><br />\n<div style=\"margin: 0px; padding: 0px;\"><span style=\"font-size: 14px;\">極致潤澤、高效美白、緊緻彈力全系列保養滿足肌膚各種需求</span></div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px;\"><span style=\"font-size: 14px;\">讓肌膚美得更有效率輕鬆擁有光澤Q彈的青春美肌</span></div>\n<br />\n<div style=\"margin: 0px; padding: 0px;\">&nbsp;</div>\n<br />\n<div style=\"margin: 0px; padding: 0px;\"><span style=\"font-size: 14px;\"><strong>肌研極潤完美多效清透凝露UV-5效合一最強防曬</strong></span></div>\n<br />\n<div style=\"margin: 0px; padding: 0px;\"><br />\n<table style=\"width: 500px;\" border=\"1\" cellspacing=\"1\" cellpadding=\"1\">\n<tbody>\n<tr>\n<td style=\"border: 1px solid gray; height: 30px; line-height: 30px;\"><span style=\"font-size: 14px;\">弱酸性</span></td>\n<td style=\"border: 1px solid gray; height: 30px; line-height: 30px;\"><span style=\"font-size: 14px;\">低刺激性</span></td>\n<td style=\"border: 1px solid gray; height: 30px; line-height: 30px;\"><span style=\"font-size: 14px;\">無添加香料、色素、礦物油</span></td>\n</tr>\n</tbody>\n</table>\n<br />\n<p>一瓶取代化粧水、精華液、乳液、防曬、粧前乳擁有肌研最高防曬係數 SPF50+ PA++++能阻隔UVA時間長達16倍。嚴選3重玻尿酸全天候長效保濕清爽水感凝露質地粧前使用粧感服貼更持久。每日早晨保養、防曬一瓶完成</p>\n</div>\n<div style=\"margin: 0px; padding: 0px;\">&nbsp;</div>\n<div style=\"margin: 0px; padding: 0px;\"><span style=\"font-size: 14px;\"><span style=\"background-color: #afeeee;\">玻尿酸</span> &nbsp; <span style=\"background-color: #afeeee;\">高效玻尿酸</span> &nbsp; &nbsp;<span style=\"background-color: #afeeee;\">水解玻尿酸</span></span></div>\n<br />\n<div style=\"margin: 0px; padding: 0px;\">&nbsp;</div>\n</div>\n</div>\n<div style=\"font-size: 12pt; margin: 0px; padding: 0px;\"><span style=\"font-size: 14px;\"><strong>規格</strong></span></div>\n<br /><br />\n<div style=\"font-size: 12pt; margin: 0px; padding: 0px;\"><span style=\"font-size: 14px;\">50g</span></div>\n<br /><br />\n<div style=\"font-size: 12pt; margin: 0px; padding: 0px;\"><br /><br /><span style=\"font-size: 14px;\"><strong>使用方式:</strong></span></div>\n<br /><br />\n<div style=\"font-size: 12pt; margin: 0px; padding: 0px;\"><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 14px; line-height: 17.234px; background-color: rgb(253 255 255);\"><br />\n<div style=\"margin: 0px; padding: 0px; line-height: 17.234px;\"><span style=\"font-size: 14px;\">1. 取適量均勻塗抹於肌膚</span></div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; line-height: 17.234px;\"><span style=\"font-size: 14px;\">2. 為達最佳效果流汗後請以毛巾擦乾後再次塗抹</span></div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; line-height: 17.234px;\"><span style=\"font-size: 14px;\">3. 清潔時使用一般潔顏產品即可卸除</span></div>\n</div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 16.3636px; line-height: 17.7455px; background-color: rgb(253 255 255);\">&nbsp;</div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 16.3636px; line-height: 17.7455px; background-color: rgb(253 255 255);\">&nbsp;</div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 16.3636px; line-height: 17.7455px; background-color: rgb(253 255 255);\"><span style=\"font-size: 14px;\"><strong>廠商服務專線</strong><br /><br />0800-231-149</span></div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 16.3636px; line-height: 17.7455px; background-color: rgb(253 255 255);\">&nbsp;</div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 16.3636px; line-height: 17.7455px; background-color: rgb(253 255 255);\"><span style=\"font-size: 14px;\"><strong>產地國</strong><br /><br />日本</span></div>\n<br /><br />\n<div style=\"margin: 0px; padding: 0px; color: rgb(51 51 51); font-family: Arial; font-size: 16.3636px; line-height: 17.7455px; background-color: rgb(253 255 255);\"><br />\n<div>&nbsp;</div>\n</div>\n</div>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">All in One清爽水感凝露誕生早晨洗臉後只要一瓶保養、防曬一次完成</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">肌研</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">50g</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">日本</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">3.1x8.5x18.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">50 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">4年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>JP</p>\n<h4>Height</h4>\n<p>18.5</p>\n<h4>Width</h4>\n<p>8.5</p>\n<h4>Depth</h4>\n<p>3.1</p>\n</div>', '2017-08-06 16:00:00'),
(26, 21, '露得清 Neutrogena露得清細白隔離防曬乳30ml SPF30 PA+++', '露得清細白隔離防曬乳30ml SPF30 PA+++【日常防曬】產品請以實際商品為主，有疑問請聯繫消費者諮詢專線0800-011678', 449, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>露得清細白隔離防曬乳30ml SPF30 PA+++【日常防曬】</p>\n<br />\n<p><span style=\"background-color: rgb(255 255 255); color: rgb(76 76 76); font-family: robotostheitiverdanaarialmicrosoft jhenghei微軟正黑體黑體-繁新細明體sans-serif; font-size: 15px;\">產品請以實際商品為主<br /><br />有疑問請聯繫消費者諮詢專線0800-011678</span></p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\" style=\"border-style: solid; border-color: black;\">\n<tbody>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">商品簡述</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">質地輕透作為日常防曬能有效提亮暗沉不均的膚色與化妝品搭配使用效果良好。皮膚科醫師實測</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">品牌</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">露得清 Neutrogena</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">規格</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">30ml</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">原產地</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">南韓</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">深、寬、高</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">3.8x4.5x19.4cm</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">淨重</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">64 g</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">容量</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">30 ml</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">保存環境</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\" style=\"border: 1px solid black;\">是否可門市/超商取貨</td>\n<td class=\"td2\" style=\"border: 1px solid black;\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\" border=\"1\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n<tr>\n<td class=\"td1\">注意事項</td>\n<td class=\"td2\">避免陽光直射只供外用。避免接觸眼睛。</td>\n</tr>\n<tr>\n<td class=\"td1\">目的功效</td>\n<td class=\"td2\">有效提亮暗沉不均的膚色立即展現光滑亮麗的肌膚。肌膚煥發容光亮白</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>KR</p>\n<h4>Height</h4>\n<p>19.4</p>\n<h4>Width</h4>\n<p>4.5</p>\n<h4>Depth</h4>\n<p>3.8</p>\n</div>', '2017-08-06 16:00:00'),
(27, 21, 'Biore蜜妮 高防曬明亮隔離乳液 30ml', '全面美顏防曬肌膚明亮有光澤SPF50+/PA++++專為臉部設計高係數防曬長效隔離紫外線保護肌膚不曬傷變黑。透明UV隔離配方透明不泛白。', 289, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<p class=\"ecTitle\"><img src=\"https://img.watsons.com.tw/ecftp/209398/20220622143045532033.jpg\" alt=\"\" /></p>\n<div class=\"longDesc\">\n<p>全面美顏防曬肌膚明亮有光澤<br />SPF50+/PA++++專為臉部設計高係數防曬長效隔離紫外線保護肌膚不曬傷變黑。<br />透明UV隔離配方透明不泛白。<br />添加光感補正柔粉修飾毛孔凹凸與暗沉膚色。淡淡櫻花液色使肌膚薄透亮澤。<br />含細緻清爽柔粉即使流汗也能維持清爽不黏膩。<br />可當粧前隔離霜上粧前為暗沉膚色打底妝感更薄透動人。無香料配方。<br />臉部用</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">全面美顏防曬肌膚明亮有光澤 SPF50+/PA++++專為臉部設計高係數防曬長效隔離紫外線保護</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Biore 蜜妮</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">日本</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">3x8.4x18.3cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">58 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">30 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>日本</p>\n<h4>Height</h4>\n<p>18.3</p>\n<h4>Width</h4>\n<p>8.4</p>\n<h4>Depth</h4>\n<p>3</p>\n</div>', '2017-08-06 16:00:00'),
(28, 21, 'SHISEIDO 資生堂ELIXIR怡麗絲爾奢潤進化晶亮防護露SPF50+ PA++++ 30ml', '日間終極防護 全天綻放晶亮水玉光守護熟齡肌的3種效果Point 1 : 防禦多重防禦技術守護乾燥、紫外線、灰塵等外部傷害Point 2 : 粧前效果預防因汗水、乾燥引起的脫粧Point 3 : 提亮效果多重提亮配方讓暗沉變明亮', 1000, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"ELIXIR怡麗絲爾奢潤進化晶亮防護露SPF50+ PA++++ 30ml，除了SHISEIDO 資生堂等推薦品牌，屈臣氏提供多種熱銷隔離乳/霜商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p><span style=\"font-size:16px\"><strong>產品特長</strong></span><br><span style=\"font-size:14px\"><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\">日間終極防護 全天綻放晶亮水玉光守護熟齡肌的3種效果</span><br><br><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\"><strong><u>Point 1 : 防禦</u></strong></span><br><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\">多重防禦技術守護乾燥、紫外線、灰塵等外部傷害</span><br><br><strong><u><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\">Point 2 : 粧前效果</span></u></strong><br><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\">預防因汗水、乾燥引起的脫粧</span><br><br><strong><u><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\">Point 3 : 提亮效果</span></u></strong><br><span style=\"color:rgb(0 0 0); font-family:oxygen微軟正黑體microsoft jhenghei儷黑 prolihei prosans-serif\">多重提亮配方讓暗沉變明亮</span></span></p></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">防禦X粧前X提亮日間終極防護熟齡肌</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">SHISEIDO 資生堂</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">30ml</td></tr><tr><td class=\"td1\">原產地</td><td class=\"td2\">日本</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">2.9x3.9x8.2cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">30 g</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">有效期限</td><td class=\"td2\">3年</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>JP</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>8.2</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>3.9</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>2.9</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00'),
(29, 111, 'DHC 維他命B群(90日份)', 'DHC維他命B群是以均衡比例添加維他命B1、B2、B6、B12、葉酸、泛酸、菸鹼酸、生物素、肌醇等9種營養素有助於維持能量正常代謝增進肌膚、神經系統、黏膜及消化系統的健康每日攝取可常保充沛活力讓您天天神采奕奕。', 419, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"DHC 維他命B群(90日份)，除了DHC等推薦品牌，屈臣氏提供多種熱銷基礎營養其他商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>DHC維他命B群是以均衡比例添加維他命B1、B2、B6、B12、葉酸、泛酸、菸鹼酸、生物素、肌醇等9種營養素有助於維持能量正常代謝增進肌膚、神經系統、黏膜及消化系統的健康每日攝取可常保充沛活力讓您天天神采奕奕。</p><br><br><p>維他命B群是協助胺基酸等營養素代謝的必要成分每種營養素都分別具有不同的特性及功能彼此間的作用相輔相成缺一不可因此建議最好能均衡攝取。</p><br><br><p>需特別留意的是維他命B群屬於人體無法自行合成的水溶性維他命不僅無法儲存在體內也容易隨著汗水或尿液而流失所以需要每天積極補充。</p><br><br><p>食物來源</p><br><br><p>五榖雜糧、瘦肉、肝臟、蛋黃、乳酪、牛奶等。</p><br><br><p>各營養素的主要生理功能</p><br><br><p>維他命B1-----能幫助維持肌膚、心臟及神經系統的正常功能</p><br><br><p>維他命B2-----有助於維持能量正常代謝及維持肌膚健康</p><br><br><p>維他命B6-----可維持胺基酸正常代謝及維持紅血球正常型態</p><br><br><p>維他命B12---有助於紅血球的形成及增進神經系統的健康</p><br><br><p>葉酸-----------有助於核酸、核蛋白及紅血球的形成是維持胎兒正常生長發育的必備營養素</p><br><br><p>泛酸-----------有助於體脂肪、膽固醇的合成及胺基酸的代謝</p><br><br><p>菸鹼素--------可增進肌膚、神經系統、黏膜及消化系統的健康</p><br><br><p>生物素--------有助於脂肪與肝醣的合成增進皮膚和黏膜健康</p><br></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">常保充沛活力天天神采奕奕</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">DHC</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">90日份180粒</td></tr><tr><td class=\"td1\">原產地</td><td class=\"td2\">台灣</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">1x12x17cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">44.1 g</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">內容物名稱</td><td class=\"td2\">菸鹼醯胺、預糊化澱粉、維生素B6</td></tr><tr><td class=\"td1\">食品添加物名稱</td><td class=\"td2\">微結晶纖維素、肌醇、泛酸鈣、維生素B1 、維生素B2、葉酸維生素B12</td></tr><tr><td class=\"td1\">營養成份</td><td class=\"td2\">依照產品說明</td></tr><tr><td class=\"td1\">製造日期</td><td class=\"td2\">依外包裝顯示</td></tr><tr><td class=\"td1\">有效日期</td><td class=\"td2\">3年</td></tr><tr><td class=\"td1\">包裝份量</td><td class=\"td2\">90日份</td></tr><tr><td class=\"td1\">內容量</td><td class=\"td2\">180粒</td></tr><tr><td class=\"td1\">投保產品責任險</td><td class=\"td2\">第17AML0000693號</td></tr><tr><td class=\"td1\">注意事項</td><td class=\"td2\">請依照每日建議量食用多食無益。請置於陰涼乾燥處避免陽光直射。</td></tr><tr><td class=\"td1\">其他</td><td class=\"td2\">每日2粒早晚搭配開水分次食用</td></tr><tr><td class=\"td1\">食品業者登錄字號</td><td class=\"td2\">A-189403744-00000-7</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>TW</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>17</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>12</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>1</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00'),
(30, 111, '【GNC健安喜】孕養調理 葉酸800食品錠 100錠', '-為水溶性維他命B群中的成員之一。\r\n-每顆含有800微克的葉酸成分。\r\n-參與紅血球的形成也參與核酸及核蛋白的形成。\r\n-為輔酶組成成分之一。\r\n-適合準媽媽的營養需求有助胎兒的正常發育與生長也讓寶寶更聰明健康。\r\n-適合一般成年男女維持好氣色。\r\n-顆粒小易於食用沒有吞嚥問題。', 520, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p><strong><span style=\"color: #ee82ee;\">產品特色及說明</span></strong></p>\n<p>-為水溶性維他命B群中的成員之一。<br /><br />-每顆含有800微克的葉酸成分。<br /><br />-參與紅血球的形成也參與核酸及核蛋白的形成。<br /><br />-為輔酶組成成分之一。<br /><br />-適合準媽媽的營養需求有助胎兒的正常發育與生長也讓寶寶更聰明健康。<br /><br />-適合一般成年男女維持好氣色。<br /><br />-顆粒小易於食用沒有吞嚥問題。</p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">孕媽咪養胎必備</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">GNC 健安喜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">100錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">已投保</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">依商品外包裝標示為主</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">100錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">A-127952240-00000-9</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">新加坡商傲旎開發股份</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>US</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(31, 111, '船井生醫burner倍熱夜孅胺基酸EX PLUS 40顆入', '1.促進基礎代謝2.三效舒眠成分超激代謝配方', 849, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">1.促進基礎代謝2.三效舒眠成分超激代謝配方</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">船井生醫</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">40顆入/盒</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">9.5x3.5x14.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">20 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">投保富邦產品責任險新台幣5000萬元整</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">如外盒標示保存期限為3年</td>\n</tr>\n<tr>\n<td class=\"td1\">注意事項</td>\n<td class=\"td2\">1.不建議孕婦、授乳者及嬰幼兒食用。 2.全素可食。</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">40顆/盒</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">F-180457830-00000-8</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">船井生醫股份有限公司</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">04-22526600</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">台中市西屯區市政北一路號樓之</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>14.5</p>\n<h4>Width</h4>\n<p>3.5</p>\n<h4>Depth</h4>\n<p>9.5</p>\n</div>', '2017-08-06 16:00:00'),
(32, 111, 'Golden Health 【赫而司】婦淨康益生菌(60顆/罐)', '調整體質改變細菌叢生態捍衛女性私密健康衛生全程冷藏配送', 1100, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">調整體質改變細菌叢生態捍衛女性私密健康衛生全程冷藏配送</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Golden Health 赫而司</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">60顆/罐</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">冷藏</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">華南產品責任險保單號碼1400-032050074</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">有效日期以消費者收受日起算至少距有效日期一年以上</td>\n</tr>\n<tr>\n<td class=\"td1\">注意事項</td>\n<td class=\"td2\">詳見產品介紹內容標示。</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">60顆/罐(植物膠囊) 奶素食品</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">A-116305859-00000-5</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">台灣赫而司有限公司</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">26333810</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">台北市內湖區成功路五段460號15樓</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務專線</td>\n<td class=\"td2\">02-2633-6117</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務時間</td>\n<td class=\"td2\">週一~週五上午9點到晚上6點</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>Height</h4>\n<p>10</p>\n<h4>Width</h4>\n<p>5</p>\n<h4>Depth</h4>\n<p>5</p>\n</div>', '2017-08-06 16:00:00'),
(33, 111, 'SUNTORY三得利 蜂王乳 芝麻明E 30日份 120錠', 'Suntory 三得利 蜂王乳 芝麻明E 30日份 120錠，除了SUNTORY等推薦品牌，屈臣氏提供多種熱銷維他命D/維他命E商品選擇，全面符合您的需求。', 2000, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"Suntory 三得利 蜂王乳 芝麻明E 30日份 120錠，除了SUNTORY等推薦品牌，屈臣氏提供多種熱銷維他命D/維他命E商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>此為廠商直送商品 預計出貨日2-5天</p><p>商品注意事項<br><br>請參考每日建議攝取量食用。一日請勿超過4錠。<br><br>請配合開水一同食用無需咀嚼多食無益。<br><br>請置於乾燥及避免高溫、陽光直射處。 開封後請確實密封置於涼爽陰暗處。<br><br>食用前請先確認原料如擔心產生食物過敏症狀請避免食用。 依個人體質或身體狀況不同如食用後產生不適例發癢、起疹、腸胃不適等請立即停止食用。<br><br>懷孕、哺乳期間以及兒童請避免食用。<br><br>服用藥物或正在接受診療的患者食用前請先洽詢醫師。 如有氣喘病史的消費者請勿食用。&nbsp;<br><br>本產品含有牛奶、蛋。<br><br>飲食生活請以主食、主菜、副菜為基礎請注意飲食均衡。</p><br><br><p><br><br>購買注意事項<br><br>1、顏色因電腦螢幕設定差異會略有不同以實際商品顏色為準。<br><br>2、此為私人消耗品除商品本身有瑕疵方可辦理退換貨。<br><br>3、商品一經拆封使用或損毀將影響退貨權限退貨必須保留紙箱及商品組合之齊全及完整性。勿因消費者個人不當拆卸使用之人為因素造成商品之故障、毀損、磨損、包裝破損不完整。若商品經拆封使用恕無法退換貨。</p><br></div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">Suntory 三得利 蜂王乳 芝麻明E 30日份 120錠</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">SUNTORY</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">30日份120錠</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">N</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">投保產品責任險</td><td class=\"td2\">依商品外包裝標示為主</td></tr><tr><td class=\"td1\">製造日期</td><td class=\"td2\">依商品外包裝標示為主</td></tr><tr><td class=\"td1\">包裝份量</td><td class=\"td2\">1</td></tr><tr><td class=\"td1\">食品業者登錄字號</td><td class=\"td2\">A-124738556-00000-8</td></tr></tbody></table><p class=\"ecTitle\">廠商資訊</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">製造商名稱</td><td class=\"td2\">萬物達國際有限公司</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>JP</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>10</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>6</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>5</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00');
INSERT INTO `product` (`p_id`, `classid`, `p_name`, `p_intro`, `p_price`, `p_open`, `p_content`, `p_date`) VALUES
(34, 111, 'NOW健而婷 高效能鋅配方 (100顆/瓶)', '鋅(Zn)是人體必需微量元素，有助於能量代謝外，亦有助維持生殖機能等作用。', 1300, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品， 預計出貨日2-5天</p>\n<p><span style=\"font-size: 16px;\"><span style=\"font-family: arial，helvetica，sans-serif;\"><span style=\"color: #ff0000;\"><strong>鋅(Zn)</strong></span><br />是人體必需微量元素，<strong>有助於能量代謝外，亦有助維持生殖機能等作用</strong>。美國營養學期刊證實「鋅」是維持男性健康不可或缺的營養成份。然而，因為「鋅」在體內吸收率很低，且易受茶、纖維質的影響而降低吸收率，大多數的人都有缺鋅的問題。根據統計，全世界有三分之一的男性缺乏「鋅」！<br /><br /><span style=\"color: #008000;\"><strong>很多男性朋友皆透過下列方式補充鋅的不足：</strong></span><br />1、吃生蠔、蚵仔。但現今海洋污染嚴重，補充時需注意到其安全性，並且每日需補充蚵仔52顆、生蠔10顆，才足夠一天所需。<br />2、購買蠔蜆精、蠔蜆錠來補充。但內含鈉及普林成份，長期攝取恐引起負擔。<br />3、透過一般的綜合維他命補充。但是內含鋅劑量太低，根本達不到每日建議所需的量。<br />4、世界吸收率第一的「專利高效能鋅」，是世界唯一胺基酸螯合專利鋅(單甲硫胺酸鋅)，並唯一經美國FDA安全認證，高吸收、高安全，市售最高單位，一天一粒，省錢有力，是最聰明的選擇。</span></span></p>\n<p>商品名稱：高效能鋅配方植物膠囊食品&nbsp;<br />內容量：100顆(植物硬膠囊)&nbsp;<br />主成份：每次用量(1顆)含-鋅-30 毫克、銅-300 微克 。<br />食品添加物：如商品標示所示。<br />用法用量：1次1顆、1天1次、餐後以開水食用。1日請勿超過1粒 ，多食無益。&nbsp;<br />保存方式：開封後，請將瓶蓋押緊，避免日光直射、高溫及潮濕。&nbsp;</p>\n<p>原產地：美國<br />有效年限：3年6個月(以消費者收受日起算，至少距有效日期前334日以上)<br />負責廠商：台灣健而婷生化科技(股)公司<br />負責廠商電話：04-23113199<br />負責廠商地址：40743台中市西屯區甘肅路二段25號2樓<br />食品業者登錄字號：B-180466009-00000-2</p>\n<p>注意事項<br />．本品來源天然，顆粒色澤會有深淺不同之自然變化，請安心食用。&nbsp;<br />．本公司產品，一律投保1000萬產品責任險。<br />&nbsp;</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">世界專利胺基酸螯合鋅★全台最高單位30毫克★添加銅，加強滋補</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">NOW 健而婷</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">100顆/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">1403第082050001號</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">依包裝標示為主</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">100顆/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">B-180466009-00000-2</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">美國NOW FOODS</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">1-888-669-3663</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">396S.Glen Ellyn Rd，Bloomungdale，IL60108，USA.</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務專線</td>\n<td class=\"td2\">04-23113199</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務時間</td>\n<td class=\"td2\">9:00~18:00</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>美國</p>\n<h4>Height</h4>\n<p>10.6</p>\n<h4>Width</h4>\n<p>4.6</p>\n<h4>Depth</h4>\n<p>4.6</p>\n</div>', '2017-08-06 16:00:00'),
(35, 111, 'Sundown日落恩賜 高單位葉酸800mcg錠(100錠/瓶)', '孕前3個月補充純葉酸, 高純度單方葉酸800微克, 每日只需一粒、經濟實惠, 三個月食用量、不浪費, 維持胎兒的正常生長與發育', 480, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">孕前3個月補充純葉酸</span></span></p>\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">高純度單方葉酸800微克</span></span></p>\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">每日只需一粒、經濟實惠</span></span></p>\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">三個月食用量、不浪費</span></span></p>\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">維持胎兒的正常生長與發育</span></span></p>\n<p style=\"text-align: center;\"><img style=\"height: 1681px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/133021/20181126150734245812.jpg\" alt=\"\" /></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">孕前3個月補充純葉酸</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Sundown 日落恩賜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">100錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">華南產物保險(1403第082050275號)</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">瓶身標示為有效日期 / 保存期限4年</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">100錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">其他</td>\n<td class=\"td2\">圖片為美國提供之商品形象圖</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">B-153304397-00000-3</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">cGMP美國Rexall Sundown INC.</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">1-888-848-2435</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">901 Broken Sound Parkway NW Boca Raton FL 33487 USA.</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>美國</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(36, 111, '【GNC健安喜】經典熱銷 鎂250食品錠 90錠', '-每顆含有250毫克鎂補足每日所需-喚醒體內原本代謝力加速擺脫沉重的負擔-舒緩因繁忙造成的緊繃約束讓自己休息時間達到最佳休眠狀態', 360, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p><strong><span style=\"color: #ee82ee;\">產品特色及說明</span></strong></p>\n<p>-每顆含有250毫克鎂補足每日所需<br />-喚醒體內原本代謝力加速擺脫沉重的負擔<br />-舒緩因繁忙造成的緊繃約束讓自己休息時間達到最佳休眠狀態<br />-顆粒小好吞嚥<br />-素食者可以食用</p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">喚醒代謝力 緩和深層約束</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">GNC 健安喜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">90錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">已投保</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">依商品外包裝標示為主</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">90錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">A-127952240-00000-9</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">新加坡商傲旎開發股份</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>美國</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(37, 111, 'Boiron金盞花全效乳膏30g', '舒緩因敏感刺激、表淺傷口、昆蟲叮咬造成的肌膚不適', 300, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"Boiron金盞花全效乳膏30g，除了BOIRON金盞花等推薦品牌，屈臣氏提供多種熱銷基礎營養其他商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>法國版的小護士</p>  <p>家庭必備的萬用皮膚護理品</p>  <p>天然不刺激溫和呵護全家人肌膚</p> </div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">舒緩因敏感刺激、表淺傷口、昆蟲叮咬造成的肌膚不適</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">BOIRON金盞花</td></tr><tr><td class=\"td1\">原產地</td><td class=\"td2\">法國</td></tr><tr><td class=\"td1\">深、寬、高</td><td class=\"td2\">15.7x3.4x3.1cm</td></tr><tr><td class=\"td1\">淨重</td><td class=\"td2\">30 g</td></tr><tr><td class=\"td1\">容量</td><td class=\"td2\">30 ml</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">Y</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>法國</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>3.1</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>3.4</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>15.7</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00'),
(38, 111, 'Sundown日落恩賜 緩釋型超級B群+C錠(B12加強配方)(100錠/瓶)', '完整綜合B群+維生素C，B12有效劑量調高至250微克，長效Time-Release製程、不浪費，國際級實驗室檢測8小時有效吸收', 990, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">原裝進口、第二代強效新配方</span></span></p>\n<br /><br />\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">完整綜合B群+維生素C</span></span></p>\n<br /><br />\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">B12有效劑量調高至250微克</span></span></p>\n<br /><br />\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">長效Time-Release製程、不浪費</span></span></p>\n<br /><br />\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">國際級實驗室檢測8小時有效吸收</span></span></p>\n<br /><br />\n<p style=\"text-align: center;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"font-size: 16px;\">亞洲市場專屬最佳配方比例</span></span></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><img src=\"https://img.watsons.com.tw/ecftp/102662/20201104144640719802.jpg\" alt=\"\" /></p>\n<br /><br />\n<p style=\"text-align: center;\"><img style=\"height: 641px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/102662/20201104144649598803.jpg\" alt=\"\" /></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><img style=\"height: 641px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/102662/20201104144806662807.jpg\" alt=\"\" /></p>\n<br /><br />\n<p style=\"text-align: center;\"><img style=\"height: 641px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/102662/20201104144815067808.jpg\" alt=\"\" /></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n<p style=\"text-align: center;\"><img style=\"height: 1681px; width: 650px;\" src=\"https://img.watsons.com.tw/ecftp/102662/20181119165406511986.jpg\" alt=\"\" /></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">完整9大必需營養素 增強體力</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Sundown 日落恩賜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">100錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">華南產物保險(1403第092050266號)</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">瓶身標示為有效日期 EXP-月底/年(西元) / 保存期限3年</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">100錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">其他</td>\n<td class=\"td2\">圖片為美國提供之商品形象圖</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">B-153304397-00000-3</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">cGMP美國Rexall Sundown INC.</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">1-888-848-2435</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">901 Broken Sound Parkway NW Boca Raton FL 33487 USA.</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>US</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(39, 111, 'Jarrow賈羅公式 非活性維生素D3軟膠囊(100粒/瓶)', '高純度非活性D3，快速補充陽光維生素，原裝進口每粒含D3 400 I.U.，嚴選配方添加頂級橄欖油', 479, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p style=\"text-align: left;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-size: 16px;\">高純度非活性D3</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-size: 16px;\">快速補充陽光維生素</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-size: 16px;\">原裝進口每粒含D3 400 I.U.</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-size: 16px;\">嚴選配方添加頂級橄欖油</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-family: verdanagenevasans-serif;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-size: 16px;\">室內工作族、成年女性必備品 </span></span></span></p>\n<p style=\"text-align: center;\">&nbsp;</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">少曬太陽、室內工作族、成年女性必備品</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Jarrow 賈羅公式</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">100粒/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">華南產物保險(1403第082050352號)</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">瓶身標示為有效日期 / 保存期限2年</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">100粒/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">其他</td>\n<td class=\"td2\">圖片為美國提供之商品形象圖</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">B-124605866-00000-6</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">JARROW INDUSTRIES INC.</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">04-22370215</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">12246 HAWKINS STREET SANTA FE SPRINGS CA 90670</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務專線</td>\n<td class=\"td2\">04-22370215(0800-370215)</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務時間</td>\n<td class=\"td2\">9:00~18:00</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>美國</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(40, 111, '【GNC健安喜】型男保健 美佳男複方維他命食品錠 90錠', '-專為男性設計強化鋅、維他命B群等男性所需的綜合營養素。-添加南瓜子油、蕃茄紅素等天然防護精華滿足成年男性營養需求。-天然蔬果複合精華滿足現代人營養需求。-緩效型錠劑補足您一整天的營養活力。', 1160, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p><span style=\"color: #dda0dd;\"><strong>產品特色及說明</strong></span></p>\n<p>-GNC銷售第一名的男性綜合維他命。<br /><br />-專為男性設計強化鋅、維他命B群等男性所需的綜合營養素。<br /><br />-添加南瓜子油、蕃茄紅素等天然防護精華滿足成年男性營養需求。<br /><br />-天然蔬果複合精華滿足現代人營養需求。<br /><br />-緩效型錠劑補足您一整天的營養活力。</p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">型男必備 活力滿格</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">GNC 健安喜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">90錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">已投保</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">依商品外包裝標示為主</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">90錠/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">A-127952240-00000-9</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">新加坡商傲旎開發股份</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>US</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(41, 111, 'citynoble都會新貴嚴選-苦瓜胜肽膠囊60粒/盒', '專利定序苦瓜萃取(含胜肽)幫助健康維持', 2800, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">專利定序苦瓜萃取(含胜肽)幫助健康維持</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">citynoble都會新貴</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">570mg</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">5.1x10x14.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">570 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">已投保產品責任險</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">如包裝所示</td>\n</tr>\n<tr>\n<td class=\"td1\">注意事項</td>\n<td class=\"td2\">勿讓孩童誤食</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">60粒/盒</td>\n</tr>\n<tr>\n<td class=\"td1\">其他</td>\n<td class=\"td2\">無</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">A152621655-00000-0</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">祥閎股份有限公司</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">06-2980000</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">臺南市安平區健康三街482巷15號2樓</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務專線</td>\n<td class=\"td2\">06-2980000</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務時間</td>\n<td class=\"td2\">1000-1800</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>14.5</p>\n<h4>Width</h4>\n<p>10</p>\n<h4>Depth</h4>\n<p>5.1</p>\n</div>', '2017-08-06 16:00:00'),
(42, 111, 'Sundown日落恩賜 超級蔓越莓plus維生素D3軟膠囊(150粒x3盒)組', 'Super蔓越莓50倍濃縮萃取，改變細菌叢生態、調整體質，高單位陽光維生素D3 500 IU，針對上班族、缺少日曬的女性', 2390, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p style=\"text-align: left;\"><span style=\"font-size: 16px;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-family: arialhelveticasans-serif;\">Super蔓越莓50倍濃縮萃取</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-size: 16px;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-family: arialhelveticasans-serif;\">改變細菌叢生態、調整體質</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-size: 16px;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-family: arialhelveticasans-serif;\">高單位陽光維生素D3 500 IU</span></span></span></p>\n<p style=\"text-align: left;\"><span style=\"font-size: 16px;\"><span style=\"color: rgb(0 0 0);\"><span style=\"font-family: arialhelveticasans-serif;\">針對上班族、缺少日曬的女性</span></span></span></p>\n<p style=\"text-align: left;\">商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">上班族與缺少日曬的女性必備</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Sundown 日落恩賜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">150粒x3盒</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">華南產物保險(1403第092050266號)</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">瓶身標示為有效日期 EXP-月底/年(西元) / 保存期限2年</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">150粒x3盒</td>\n</tr>\n<tr>\n<td class=\"td1\">其他</td>\n<td class=\"td2\">圖片為美國提供之商品形象圖</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">B-153304397-00000-3</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">cGMP美國Rexall Sundown INC.</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">1-888-848-2435</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">901 Broken Sound Parkway NW Boca Raton FL 33487 USA.</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>美國</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(43, 111, '【GNC健安喜】型男保健 南瓜籽油膠囊食品1000mg 100顆', '-每顆提供1000mg的南瓜籽油-保養中年男子的私密問題、調節男性生理機能。-鋅維持生殖機能-富含多元不飽和脂肪酸維護循環健康-南瓜子氨酸解決私密困擾', 840, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p><strong><span style=\"color: #ee82ee;\">產品特色及說明</span></strong></p>\n<img src=\"https://img1.momoshop.com.tw/expertimg/0012/216/284/mobile/12.jpg\" alt=\"\" /><br /><br />\n<p>-每顆提供1000mg的南瓜籽油<br /><br />-保養中年男子的私密問題、調節男性生理機能。-鋅維持生殖機能<br /><br />-富含多元不飽和脂肪酸維護循環健康<br /><br />-南瓜子氨酸解決私密困擾<br /><br />-植物固醇調整體質<br /><br />-維生素 B群提高代謝力<br /><br />-維生素 E調節生理機能</p>\n<p>&nbsp;</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">守護前線 告別男言之隱</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">GNC 健安喜</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">100顆/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">已投保</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">依商品外包裝標示為主</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">100顆/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">A-127952240-00000-9</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">新加坡商傲旎開發股份</td>\n</tr>\n</tbody>\n</table>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>1</p>\n<h4>Width</h4>\n<p>1</p>\n<h4>Depth</h4>\n<p>1</p>\n</div>', '2017-08-06 16:00:00'),
(44, 111, '【美國BestVite】必賜力天然高濃縮蜂王乳膠囊1瓶 (60顆)', '3倍濃縮=新鮮蜂王漿1500毫克每顆含6天然珍貴成分王漿酸10-HDA美國原廠原裝進口', 918, 1, '<div class=\"drop-box\">\r\n			\r\n				<meta itemprop=\"description\" content=\"【美國BestVite】必賜力天然高濃縮蜂王乳膠囊1瓶 (60顆)，除了Bestvite 必賜力等推薦品牌，屈臣氏提供多種熱銷基礎營養其他商品選擇，全面符合您的需求。\">\r\n				<p></p><p class=\"ecTitle\">詳細介紹</p><div class=\"longDesc\"><p>此為廠商直送商品 預計出貨日2-5天</p><p><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/104258/20171026123122443428.jpg\" style=\"height:591px; width:650px\"><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/104258/20171026123143862429.jpg\" style=\"height:434px; width:650px\"><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/104258/20171026123157618430.jpg\" style=\"height:556px; width:650px\"><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/104258/20171026123205009431.jpg\" style=\"height:351px; width:650px\"><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/104258/20171026123211633432.jpg\" style=\"height:578px; width:650px\"><img alt=\"\" src=\"https://img.watsons.com.tw/ecftp/104258/20171026123217471433.jpg\" style=\"height:501px; width:650px\"></p>  <table align=\"center\" border=\"1\" cellpadding=\"3\" cellspacing=\"5\" id=\"yui_3_12_0_1_1416969815722_177\" style=\"width:622px\"> 	<tbody> 		<tr> 			<td style=\"border:1px solid gray;height:30px;line-height:30px\"> 			<table align=\"center\" border=\"1\" cellpadding=\"3\" cellspacing=\"5\" id=\"yui_3_12_0_1_1416969815722_177\" style=\"width:622px\"> 				<tbody> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">品名</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">【美國Bestvite】必賜力天然高濃縮蜂王乳膠囊1瓶</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">內容物成份</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">新鮮3:1濃縮蜂王乳500毫克 (相當於新鮮蜂王乳1500毫克)</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\" colspan=\"2\">營養標示</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">內容量</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">每份0.6公克本包裝含60份</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">熱量</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">每份含2.4大卡</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">每份營養成份</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">新鮮3:1濃縮蜂王乳500毫克 (相當於新鮮蜂王乳1500毫克)</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">食品添加物名稱</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">明膠</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">食用方式</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">每天1至2顆飯後以開水食用</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">保存方式</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">置於陰涼乾燥處保存避免日光直射</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">產地</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">美國原裝進口</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">進口商名稱</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">特德寶有限公司</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">進口商電話號碼</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">03-3116516</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">進口商地址</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">桃園市蘆竹區安中街1號</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">保存期限</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">3年</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">製造 / 有效日期</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">如瓶身所示</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">投保責任險</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">國泰產物產品責任險新台幣4000萬元保障</td> 					</tr> 					<tr> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">注意事項</td> 						<td style=\"border:1px solid gray;height:30px;line-height:30px\">對蜜蜂製品過敏或氣喘者請勿食用</td> 					</tr> 				</tbody> 			</table> 			</td> 		</tr> 	</tbody> </table> </div><p class=\"ecTitle\">商品規格</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">商品簡述</td><td class=\"td2\">3倍濃縮=新鮮蜂王漿1500毫克每顆含6天然珍貴成分王漿酸10-HDA美國原廠原裝進口</td></tr><tr><td class=\"td1\">品牌</td><td class=\"td2\">Bestvite 必賜力</td></tr><tr><td class=\"td1\">規格</td><td class=\"td2\">60顆*1 PC</td></tr><tr><td class=\"td1\">保存環境</td><td class=\"td2\">室溫</td></tr><tr><td class=\"td1\">是否可門市/超商取貨</td><td class=\"td2\">N</td></tr></tbody></table><p class=\"ecTitle\">商品屬性</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">投保產品責任險</td><td class=\"td2\">國泰產物產品責任險新台幣4000萬元</td></tr><tr><td class=\"td1\">製造日期</td><td class=\"td2\">如瓶身所示</td></tr><tr><td class=\"td1\">注意事項</td><td class=\"td2\">對蜜蜂製品過敏或氣喘者請勿食用懷孕及哺乳期婦女請向醫師諮詢</td></tr><tr><td class=\"td1\">包裝份量</td><td class=\"td2\">本包裝共含60份</td></tr><tr><td class=\"td1\">其他</td><td class=\"td2\">置於陰涼乾燥處保存並遠離孩童</td></tr><tr><td class=\"td1\">食品業者登錄字號</td><td class=\"td2\">A-124772076-00000-3</td></tr></tbody></table><p class=\"ecTitle\">廠商資訊</p><table class=\"ecTable\"><tbody><tr><td class=\"td1\">製造商名稱</td><td class=\"td2\">Bestvite</td></tr><tr><td class=\"td1\">製造商電話</td><td class=\"td2\"> (818) 767-5700</td></tr><tr><td class=\"td1\">製造商地址</td><td class=\"td2\">Inc. 8010 Wheatland Ave. Ste. #I Sun Valley CA 91352</td></tr></tbody></table><style>.ecTable{width:100%;border:1px solid gray;}.ecTable td{border:1px solid gray;font-size:14px}.ecTable .td1{width:30%;height:25px;padding:5px;line-height:25px;background-color:#eeeeee;text-align:center;font-weight:bold}.ecTable .td2{padding:5px;letter-spacing:1px;color:#4c4c4c}.ecTitle{font-size:18px;font-weight:bold;color:#009f9f;margin:5px 0 5px 0;} .longDesc p{margin-bottom:16px}</style><p></p>\r\n			\r\n			\r\n				<h4>產地</h4>\r\n				<p>美國</p>\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n			\r\n				<h4>Height</h4>\r\n				<p>11</p>\r\n			\r\n			\r\n				<h4>Width</h4>\r\n				<p>17</p>\r\n			\r\n			\r\n				<h4>Depth</h4>\r\n				<p>26</p>\r\n			\r\n			\r\n			\r\n			\r\n			<br>\r\n		</div>', '2017-08-06 16:00:00'),
(45, 22, '曼秀雷敦 Acnes 抗痘BB霜30g', '-潤色自然修飾膚色 打造宛若天生的清透裸妝感-遮瑕能遮蓋痘疤 修飾臉部偏紅處與瑕疵 呈現完美膚質-抗痘含Isopropyl Methylphenol抗菌成分 有效抗痘', 360, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-潤色</span></strong><span style=\"color: #0066cc;\">自然修飾膚色 打造宛若天生的清透裸妝感</span></span></p>\n<p><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-遮瑕</span></strong><span style=\"color: #0066cc;\">能遮蓋痘疤 修飾臉部偏紅處與瑕疵 呈現完美膚質</span></span></p>\n<p><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-抗痘</span></strong><span style=\"color: #0066cc;\">含Isopropyl Methylphenol抗菌成分 有效抗痘</span></span></p>\n<p><br /><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-舒緩</span></strong><span style=\"color: #0066cc;\">能幫助舒緩痘痘肌膚的不適 預防青春痘變大</span></span><br /><br /></p>\n<p><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-防曬</span></strong><span style=\"color: #0066cc;\">SPF20 能阻隔每日紫外線的傷害 預防青春痘惡化</span></span><br /><br /></p>\n<p><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-保濕</span></strong><span style=\"color: #0066cc;\">含保濕成分 維持肌膚水感潤澤</span></span><br /><br /></p>\n<p><span style=\"font-size: 14px;\"><strong><span style=\"color: #ff6699;\">-修護</span></strong><span style=\"color: #0066cc;\">添加琉璃苣油及多種植物萃取物 能修護肌膚 維持肌膚柔嫩彈性</span></span></p>\n<p><strong><span style=\"color: #ff6699;\">-臉部專用 打造長效裸妝感</span></strong></p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">潤色、遮瑕、抗痘、舒緩、防曬、保濕、修護　~7效合1~</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">曼秀雷敦</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">30g</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">南韓</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">3.2x3.8x12.2cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">30 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>KR</p>\n<h4>Height</h4>\n<p>12.2</p>\n<h4>Width</h4>\n<p>3.8</p>\n<h4>Depth</h4>\n<p>3.2</p>\n</div>', '2017-08-06 16:00:00'),
(46, 22, 'Divinia 蒂芬妮亞 3D水感柔焦CC霜(SPF50) 50g', '智慧型調色、3秒柔焦、瞬間隱形、智慧控油', 360, 1, '<div class=\"drop-box\">\n<p><iframe id=\"753625490\" style=\"width: 958px;\" src=\"https://www.youtube.com/embed/yVMYtRD2giA?enablejsapi=1&amp;origin=https%3A%2F%2Fwww.watsons.com.tw\" width=\"640\" height=\"360\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\" data-gtm-yt-inspected-1_25=\"true\" data-gtm-yt-inspected-1471862_269=\"true\"></iframe></p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><img src=\"http://dm.watsons.com.tw/ES0987/Product/247262-2.jpg\" alt=\"\" /></p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">智慧型調色、3秒柔焦、瞬間隱形、智慧控油</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Divinia 蒂芬妮亞</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">50g</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">3.5x6x11.7cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">150 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">1095天</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">儷妍實業股份有限公司</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">04-2537-5858</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">台中市潭子區祥和路35巷12號</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務專線</td>\n<td class=\"td2\">04-2537-5858</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務時間</td>\n<td class=\"td2\">星期一~五</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>11.7</p>\n<h4>Width</h4>\n<p>6</p>\n<h4>Depth</h4>\n<p>3.5</p>\n</div>', '2017-08-06 16:00:00'),
(47, 22, 'KOSE 高絲 雪肌精 潤白保濕BB霜 --02自然膚色 30g', 'KOSE 高絲 雪肌精 潤白保濕BB霜 --02自然膚色 30g', 710, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p>SPF40/PA+++</p>\n<p>&lt;&lt;商品介紹請參考品牌官網&gt;&gt;<br /><br />注意事項<br />1、由於個人膚質不同建議第一次使用前先行塗抹少量在手臂內側或耳後若無任何過敏不適反應即可放心使用。<br />2、只供外用使用後如有發生紅、腫、刺激感等不適情況請立即停用並尋求專業醫師的協助。<br />3、避免讓產品接觸眼睛如不慎入眼請立即以大量清水沖洗。<br />4、勿讓兒童接觸/不可進食。<br />5、置於陰涼處並保持乾燥勿受陽光直接照射以免商品變質。<br />6、顏色因電腦螢幕設定差異會略有不同以實際商品顏色為準。<br />7、此為私人消耗品除商品本身有瑕疵方可辦理退換貨。<br />8、商品一經拆封使用或損毀將影響退貨權限退貨必須保留紙箱及商品組合之齊全及完整性。勿因消費者個人不當拆卸使用之人為因素造成商品之故障、毀損、磨損、包裝破損不完整。若商品經拆封使用恕無法退換貨。</p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">KOSE 高絲 雪肌精 潤白保濕BB霜 --02自然膚色 30g</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">KOSE 高絲</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">30g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">1年以上3年以下</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>日本</p>\n<h4>Height</h4>\n<p>5</p>\n<h4>Width</h4>\n<p>4</p>\n<h4>Depth</h4>\n<p>12</p>\n</div>', '2017-08-06 16:00:00'),
(48, 22, 'Maybelline 媚比琳純淨礦物極效幻膚BB凝露 升級版 SPF 50/PA++++ 01白皙色', '	極致薄透的彈力延展性一抹密著融合肌膚即使是鼻翼周圍也完美無隙不露粉痕零粉感一抹立現透亮無瑕肌', 710, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p><strong>媚比琳 純淨礦物極效幻膚BB凝露 SPF 50/PA++++ 升級版&nbsp;&nbsp;01白皙色</strong></p>\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">極致薄透的彈力延展性一抹密著融合肌膚即使是鼻翼周圍也完美無隙不露粉痕零粉感一抹立現透亮無瑕肌</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Maybelline 媚比琳</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">中國</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">12.3x4.1x2.1cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">30 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">30 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>Height</h4>\n<p>2.1</p>\n<h4>Width</h4>\n<p>4.1</p>\n<h4>Depth</h4>\n<p>12.3</p>\n</div>', '2017-08-06 16:00:00'),
(49, 116, 'HUATUO 華陀扶元堂古傳滴雞精7入裝', '華陀扶元堂古傳滴雞精7入裝，有尿酸症或腎功能不全患者飲用前請諮詢醫師，明台產物產品責任保險0804第09PDT00040號', 999, 1, '<div class=\"drop-box\">\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">華陀扶元堂古傳滴雞精7入裝</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">HUATUO 華陀扶元堂</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">4.5x29x18.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">680 g</td>\n</tr>\n<tr>\n<td class=\"td1\">容量</td>\n<td class=\"td2\">455 ml</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">投保產品責任險</td>\n<td class=\"td2\">明台產物產品責任保險0804第09PDT00040號</td>\n</tr>\n<tr>\n<td class=\"td1\">製造日期</td>\n<td class=\"td2\">2019/11/01</td>\n</tr>\n<tr>\n<td class=\"td1\">注意事項</td>\n<td class=\"td2\">保存期限2年</td>\n</tr>\n<tr>\n<td class=\"td1\">包裝份量</td>\n<td class=\"td2\">65ML*7入</td>\n</tr>\n<tr>\n<td class=\"td1\">其他</td>\n<td class=\"td2\">有尿酸症或腎功能不全患者飲用前請諮詢醫師</td>\n</tr>\n<tr>\n<td class=\"td1\">食品業者登錄字號</td>\n<td class=\"td2\">E-170412201-00000-9</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">廠商資訊</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">製造商名稱</td>\n<td class=\"td2\">華陀養生殿股份有限公司食品廠</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商電話</td>\n<td class=\"td2\">07-6196685</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商地址</td>\n<td class=\"td2\">高雄市彌陀區產業路156-2號</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務專線</td>\n<td class=\"td2\">0800093689</td>\n</tr>\n<tr>\n<td class=\"td1\">製造商服務時間</td>\n<td class=\"td2\">周一到週五 早上9點到晚上6點</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>18.5</p>\n<h4>Width</h4>\n<p>29</p>\n<h4>Depth</h4>\n<p>4.5</p>\n</div>', '2017-08-06 16:00:00'),
(50, 25, 'My Scheming 我的心機-玻尿酸鎖水保濕面膜10入', '	添加玻尿酸納及小黃瓜並搭配傳明酸、熊果素在保濕的同時可以減少黑色素生成讓肌膚明亮、勻嫩。', 999, 1, '<div class=\"drop-box\">\n<p>&nbsp;</p>\n<p class=\"ecTitle\">詳細介紹</p>\n<div class=\"longDesc\">\n<p>商品規格</p>\n</div>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">添加玻尿酸納及小黃瓜並搭配傳明酸、熊果素在保濕的同時可以減少黑色素生成讓肌膚明亮、勻嫩。</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">My Scheming 我的心機</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">10片</td>\n</tr>\n<tr>\n<td class=\"td1\">原產地</td>\n<td class=\"td2\">台灣</td>\n</tr>\n<tr>\n<td class=\"td1\">深、寬、高</td>\n<td class=\"td2\">5x10x15.5cm</td>\n</tr>\n<tr>\n<td class=\"td1\">淨重</td>\n<td class=\"td2\">347 g</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">Y</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>15.5</p>\n<h4>Width</h4>\n<p>10</p>\n<h4>Depth</h4>\n<p>5</p>\n</div>', '2017-08-06 16:00:00'),
(51, 21, 'Little butterfly倫敦小蝴蝶 春蕊淨白媽媽日霜50ml', '有如春蕊綻放淡淡芳香的極致保濕植物萃取日霜完整導入植物的維他命精華有效優化媽媽肌膚的活力和亮白讓皮膚有如絲絨般的光澤與花瓣般的亮麗。', 999, 1, '<p>詳細介紹</p>\n<div class=\"longDesc\">\n<p>此為廠商直送商品 預計出貨日2-5天</p>\n<p><strong>Little Butterfly London 倫敦小蝴蝶 春蕊淨白媽媽日霜50ml&nbsp;</strong></p>\n<p>有如春蕊綻放淡淡芳香的極致保濕植物萃取日霜完整導入植物的維他命精華有效優化媽媽肌膚的活力和亮白讓皮膚有如絲絨般的光澤與花瓣般的亮麗。</p>\n<p>皮膚科醫生認可低敏感適用於媽媽、孕期女性不經動物試驗與動物原料 。&nbsp;</p>\n<p>&bull;總成分中99.5%源於天然材料&nbsp; &bull;植物成分中96.1%來自有機作物</p>\n<p>&bull;適用肌膚各種肌膚皆適用 &nbsp;&bull;使用方法每天按摩於臉部和頸部皮膚。</p>\n<p><img style=\"width: 100%;\" src=\"https://img.watsons.com.tw/ecftp/186053/20190916182242711018.jpg\" alt=\"\" /></p>\n<p><img src=\"https://www.botanicgarden.com.tw/upload/userfiles/image/%E5%B0%8F%E8%9D%B4%E8%9D%B6/007.jpg\" alt=\"\" /></p>\n<p><img style=\"width: 100%;\" src=\"https://img.watsons.com.tw/ecftp/186053/20190916182228716984.jpg\" alt=\"\" /></p>\n</div>\n<p class=\"ecTitle\">商品規格</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">商品簡述</td>\n<td class=\"td2\">英國原裝溫和配方溫柔呵護孕媽咪嬌嫩肌膚</td>\n</tr>\n<tr>\n<td class=\"td1\">品牌</td>\n<td class=\"td2\">Little butterfly</td>\n</tr>\n<tr>\n<td class=\"td1\">規格</td>\n<td class=\"td2\">50ml/瓶</td>\n</tr>\n<tr>\n<td class=\"td1\">保存環境</td>\n<td class=\"td2\">室溫</td>\n</tr>\n<tr>\n<td class=\"td1\">是否可門市/超商取貨</td>\n<td class=\"td2\">N</td>\n</tr>\n</tbody>\n</table>\n<p class=\"ecTitle\">商品屬性</p>\n<table class=\"ecTable\">\n<tbody>\n<tr>\n<td class=\"td1\">有效期限</td>\n<td class=\"td2\">3年</td>\n</tr>\n</tbody>\n</table>\n<p>&nbsp;</p>\n<h4>產地</h4>\n<p>TW</p>\n<h4>Height</h4>\n<p>5.5</p>\n<h4>Width</h4>\n<p>6.5</p>\n<h4>Depth</h4>\n<p>6.5</p>', '2017-08-06 16:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `product_img`
--

CREATE TABLE `product_img` (
  `img_id` int(11) NOT NULL COMMENT '圖檔編號',
  `p_id` int(10) NOT NULL COMMENT '產品編號',
  `img_file` varchar(100) NOT NULL COMMENT '圖檔名稱',
  `sort` int(2) NOT NULL COMMENT '圖片順序',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '建立日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `product_img`
--

INSERT INTO `product_img` (`img_id`, `p_id`, `img_file`, `sort`, `create_date`) VALUES
(4, 13, 'zoom-back-175065.webp', 1, '2021-03-10 06:36:26'),
(5, 13, 'zoom-front-175065.webp', 2, '2021-03-10 06:36:26'),
(6, 13, 'zoom-side-175065.webp', 3, '2021-03-10 06:37:23'),
(7, 14, '-Touch-in-SOL-32g-2001472.webp', 2, '2021-03-10 06:37:23'),
(8, 14, '-Touch-in-SOL-32g-2001471.webp', 1, '2021-03-10 06:37:23'),
(9, 14, '-Touch-in-SOL-32g-2001473.webp', 3, '2021-03-10 06:37:23'),
(10, 15, 'zoom-front-202291.webp', 1, '2021-03-10 07:16:13'),
(11, 15, 'zoom-front-202292.webp', 2, '2021-03-10 07:16:13'),
(12, 16, '-UV-30ml-SPF50-PA-177591.webp', 1, '2021-03-10 07:20:07'),
(13, 16, '-UV-30ml-SPF50-PA-177592.webp', 2, '2021-03-10 07:20:07'),
(14, 17, 'zoom2555551.webp', 1, '2021-03-10 07:20:07'),
(15, 17, 'zoom2555552.webp', 2, '2021-03-10 07:20:07'),
(16, 17, 'zoom2555553.webp', 3, '2021-03-10 07:20:07'),
(18, 18, 'NARUKO-SPF3025g-1777891.jpg', 1, '2021-03-17 03:06:03'),
(19, 18, 'NARUKO-SPF3025g-1777892.jpg', 2, '2021-03-17 03:06:03'),
(20, 18, 'NARUKO-SPF3025g-177789.webp', 3, '2021-03-17 03:06:03'),
(21, 19, '-SUNPLAY-35g-1943271.webp', 1, '2021-03-17 03:09:50'),
(22, 19, '-SUNPLAY-35g-1943272.webp', 2, '2021-03-17 03:09:50'),
(23, 20, 'zoom-front-2076081.webp', 1, '2021-03-17 03:16:12'),
(24, 20, 'zoom-back-2076082.webp', 2, '2021-03-17 03:16:12'),
(25, 20, 'zoom-swatch-2076083.webp', 3, '2021-03-17 03:16:12'),
(26, 21, 'zoom-front-2021801.webp', 1, '2021-03-17 03:33:26'),
(27, 21, 'zoom-side-2021802.webp', 2, '2021-03-17 03:33:26'),
(28, 21, 'zoom-back-2021803.webp', 3, '2021-03-17 03:33:26'),
(29, 22, 'zoom-front-1935161.webp', 1, '2021-03-17 03:37:56'),
(30, 22, 'zoom-side-1935162.webp', 2, '2021-03-17 03:37:56'),
(31, 22, 'zoom-back-1935163.webp', 3, '2021-03-17 03:37:56'),
(32, 22, 'zoom-swatch-1935164.webp', 4, '2021-03-17 03:37:56'),
(33, 23, 'zoom-front-1390401.webp', 1, '2021-03-17 03:43:06'),
(34, 23, 'zoom-side-1390402.webp', 2, '2021-03-17 03:43:06'),
(35, 23, 'zoom-back-1390403.webp', 3, '2021-03-17 03:43:06'),
(36, 24, '-SPF50-50ml-196690.webp', 1, '2021-03-17 03:46:20'),
(37, 24, '-SPF50-50ml-1966902.webp', 2, '2021-03-17 03:46:20'),
(38, 25, 'zoom-front-2221811.webp', 1, '2021-03-17 03:51:23'),
(39, 25, 'zoom-side-2221812.webp', 2, '2021-03-17 03:51:23'),
(40, 25, 'zoom-back-222183.webp', 3, '2021-03-17 03:51:23'),
(41, 26, 'zoom-front-5737981.webp', 1, '2021-03-17 03:54:24'),
(42, 26, 'zoom-side-5737982.webp', 2, '2021-03-17 03:54:24'),
(43, 26, 'zoom-back-5737983.webp', 3, '2021-03-17 03:54:24'),
(44, 27, 'zoom-front-2093981.webp', 1, '2021-03-17 03:57:51'),
(45, 27, 'zoom-side-2093982.webp', 2, '2021-03-17 03:57:51'),
(46, 27, 'zoom-side-2093983.webp', 3, '2021-03-17 03:57:51'),
(47, 28, 'zoom-front-2077811.webp', 1, '2021-03-17 06:16:58'),
(48, 28, 'zoom-back-2077812.webp', 2, '2021-03-17 06:16:58'),
(49, 29, 'DHC-B-90-1492921.webp', 1, '2021-03-17 06:31:25'),
(50, 29, 'DHC-B-90-1492922.webp', 2, '2021-03-17 06:31:25'),
(51, 30, 'zoom-front-1821751.webp', 1, '2021-03-17 06:37:21'),
(52, 30, 'zoom-side-1821752.webp', 2, '2021-03-17 06:37:21'),
(53, 30, 'zoom-back-1821753.webp', 3, '2021-03-17 06:37:21'),
(54, 31, 'burner-EX-PLUS-40-1977821.webp', 1, '2021-03-17 06:40:31'),
(55, 31, 'burner-EX-PLUS-40-1977822.webp', 2, '2021-03-17 06:40:31'),
(56, 32, '-VAGI-Guard-X5-60-1282971.webp', 1, '2021-03-17 07:18:43'),
(57, 32, 'prd-back-1282972.webp', 2, '2021-03-17 07:18:43'),
(58, 33, 'zoom-front-1658561.webp', 1, '2021-03-17 07:23:13'),
(59, 33, 'zoom-back-1658562.webp', 2, '2021-03-17 07:23:13'),
(60, 34, 'NOW-100-9555351.webp', 1, '2021-03-17 07:27:12'),
(61, 34, '-100-9555352.webp', 2, '2021-03-17 07:27:12'),
(62, 34, 'NOW-100-9555353.webp', 3, '2021-03-17 07:27:12'),
(63, 34, '-100-9555354.jpg', 4, '2021-03-17 07:27:12'),
(64, 35, 'Sundown-800mcg-100-1330211.webp', 1, '2021-03-17 07:29:45'),
(65, 35, 'Sundown-800mcg-100-1330212.webp', 2, '2021-03-17 07:29:45'),
(66, 36, 'zoom-front-1821471.webp', 1, '2021-03-17 07:32:38'),
(67, 36, 'zoom-side-1821472.webp', 2, '2021-03-17 07:32:38'),
(68, 36, 'zoom-back-1821473.webp', 3, '2021-03-17 07:32:38'),
(69, 37, 'zoom-front-1882881.webp', 1, '2021-03-17 07:35:19'),
(70, 37, 'zoom-back-1882882.webp', 2, '2021-03-17 07:35:19'),
(71, 38, 'zoom-front-1026621.webp', 1, '2021-03-17 07:40:00'),
(72, 38, 'zoom-front-1026621.webp', 2, '2021-03-17 07:40:00'),
(73, 38, 'zoom-back-1026623.webp', 3, '2021-03-17 07:40:00'),
(74, 39, 'zoom-front-1630531.webp', 1, '2021-03-17 07:51:51'),
(75, 39, 'zoom-back-1630532.webp', 2, '2021-03-17 07:51:51'),
(76, 40, 'zoom-front-1821491.webp', 1, '2021-03-17 07:55:25'),
(77, 40, 'zoom-side-1821492.webp', 2, '2021-03-17 07:55:25'),
(78, 40, 'zoom-back-1821493.webp', 3, '2021-03-17 07:55:25'),
(79, 41, 'zoom-front-2013591.webp', 1, '2021-03-17 07:58:31'),
(80, 41, '202005290952594629052.webp', 2, '2021-03-17 07:58:31'),
(81, 42, 'zoom-front-1400311.webp', 1, '2021-03-17 08:02:39'),
(82, 42, 'zoom-back-1400312.webp', 2, '2021-03-17 08:02:39'),
(83, 43, 'zoom-front-1821591.webp', 1, '2021-03-17 08:06:00'),
(84, 43, 'zoom-side-1821592.webp', 2, '2021-03-17 08:06:00'),
(85, 43, 'zoom-back-1821593.webp', 3, '2021-03-17 08:06:00'),
(86, 44, '201710261231438624291.webp', 3, '2021-03-17 08:15:22'),
(87, 44, '-BestVite-1-60-1042581.webp', 1, '2021-03-17 08:17:40'),
(88, 44, '-BestVite-1-60-1042582.webp', 2, '2021-03-17 08:17:40'),
(89, 45, '-Acnes-BB-30g-5337271.webp', 1, '2021-03-17 08:27:09'),
(90, 45, '-Acnes-BB-30g-533727.webp', 2, '2021-03-17 08:27:09'),
(91, 46, 'divinia-3D-CC-SPF50-50g-247262.webp', 1, '2021-03-17 08:38:37'),
(92, 46, '247262-2.jpg', 2, '2021-03-17 08:38:37'),
(93, 47, 'zoom-back-159935.webp', 1, '2021-03-17 08:42:31'),
(94, 47, 'zoom-back-159935.webp', 2, '2021-03-17 08:42:31'),
(95, 48, 'zoom-front-174388.webp', 1, '2021-03-17 08:50:05'),
(96, 48, 'zoom-side-174388.webp', 2, '2021-03-17 08:50:05'),
(97, 48, 'zoom-swatch-174388.webp', 3, '2021-03-17 08:50:05'),
(98, 49, 'zoom-front-171339.webp', 1, '2021-03-18 03:21:43'),
(99, 49, 'zoom-back-171339.webp', 2, '2021-03-18 03:21:43'),
(100, 50, '-10-182065.webp', 1, '2021-03-18 03:29:09'),
(101, 50, '-10-1820652.webp', 2, '2021-03-18 03:29:09'),
(102, 51, 'zoom-front-186053.webp', 1, '2021-03-18 03:35:17'),
(103, 51, 'zoom-back-186053.jpg', 2, '2021-03-18 03:35:17');

-- --------------------------------------------------------

--
-- 資料表結構 `programs`
--

CREATE TABLE `programs` (
  `sid` varchar(10) NOT NULL,
  `sname` varchar(20) NOT NULL,
  `program` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `programs`
--

INSERT INTO `programs` (`sid`, `sname`, `program`) VALUES
('s01', '帳號管理', 'admin'),
('s03', '產品資料維護', 'attractions'),
('s00', '權限管理', 'permissions'),
('s02', '產品管理', 'product');

-- --------------------------------------------------------

--
-- 資料表結構 `pyclass`
--

CREATE TABLE `pyclass` (
  `classid` int(3) NOT NULL COMMENT '產品類別',
  `level` int(2) NOT NULL COMMENT '所在層級',
  `fonticon` varchar(30) NOT NULL COMMENT '字型圖示',
  `cname` varchar(30) NOT NULL COMMENT '類別名稱',
  `sort` int(3) NOT NULL COMMENT '列表排序',
  `uplink` int(3) NOT NULL COMMENT '上層連結',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT '建立時間與更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 傾印資料表的資料 `pyclass`
--

INSERT INTO `pyclass` (`classid`, `level`, `fonticon`, `cname`, `sort`, `uplink`, `create_date`) VALUES
(1, 1, 'fa-paw', '彩妝專區', 1, 0, '2021-03-10 03:24:20'),
(2, 1, 'fa-user', '臉部保養', 2, 0, '2021-03-10 03:24:36'),
(3, 1, 'fa-desktop', '美膚保養', 3, 0, '2021-03-10 03:25:13'),
(21, 2, 'fa-file', '隔離/防曬/飾底乳', 1, 1, '2021-03-10 03:23:46'),
(22, 2, 'fa-file', 'BB霜/CC霜', 2, 1, '2021-03-10 03:23:46'),
(23, 2, 'fa-file', '粉餅(蕊)/蜜粉/蜜粉/海綿', 3, 1, '2021-03-10 03:23:46'),
(24, 2, 'fa-file', '遮瑕/毛孔/打亮', 4, 1, '2021-03-10 03:23:46'),
(25, 2, 'fa-file', '天然成分調理專區', 1, 2, '2021-03-10 03:23:46'),
(26, 2, 'fa-file', '婦嬰,敏感受損調理', 2, 2, '2021-03-10 03:23:46'),
(27, 2, 'fa-file', 'Neogen', 3, 2, '2021-03-10 03:23:46'),
(28, 2, 'fa-file', '萊雅', 4, 2, '2021-03-10 03:23:46'),
(29, 2, 'fa-file', '肌研', 5, 2, '2021-03-10 03:23:46'),
(110, 2, 'fa-file', '露得清', 6, 2, '2021-03-10 03:23:46'),
(111, 2, 'fa-file', '基礎保養／芝麻素', 1, 3, '2021-03-17 06:27:31'),
(112, 2, 'fa-file', '益生菌／乳酸菌', 2, 3, '2021-03-10 03:23:46'),
(113, 2, 'fa-file', '鐵／葉酸／孕期補充', 3, 3, '2021-03-10 03:23:46'),
(114, 2, 'fa-file', '蔓越莓／女性保養', 4, 3, '2021-03-10 03:23:46'),
(115, 2, 'fa-file', '男性健康補充', 5, 3, '2021-03-10 03:23:46'),
(116, 2, 'fa-file', '銀髮健康補充', 6, 3, '2021-03-10 03:23:46'),
(117, 2, 'fa-file', '成人特殊營養品', 7, 3, '2021-03-10 03:23:46'),
(118, 1, 'fa-desktop', '化妝品', 4, 0, '2025-07-28 06:01:04');

-- --------------------------------------------------------

--
-- 資料表結構 `town`
--

CREATE TABLE `town` (
  `townNo` bigint(20) NOT NULL COMMENT '鄕鎮市編號',
  `Name` varchar(150) NOT NULL COMMENT '鄕鎮市名稱',
  `Post` varchar(10) NOT NULL COMMENT '郵遞區號',
  `State` smallint(6) NOT NULL COMMENT '狀態',
  `AutoNo` int(10) NOT NULL COMMENT '上層城市編號連結'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `town`
--

INSERT INTO `town` (`townNo`, `Name`, `Post`, `State`, `AutoNo`) VALUES
(1, '中正區', '100', 0, 1),
(2, '大同區', '103', 0, 1),
(3, '中山區', '104', 0, 1),
(4, '松山區', '105', 0, 1),
(5, '大安區', '106', 0, 1),
(6, '萬華區', '108', 0, 1),
(7, '信義區', '110', 0, 1),
(8, '士林區', '111', 0, 1),
(9, '北投區', '112', 0, 1),
(10, '內湖區', '114', 0, 1),
(11, '南港區', '115', 0, 1),
(12, '文山區', '116', 0, 1),
(13, '仁愛區', '200', 0, 2),
(14, '信義區', '201', 0, 2),
(15, '中正區', '202', 0, 2),
(16, '中山區', '203', 0, 2),
(17, '安樂區', '204', 0, 2),
(18, '暖暖區', '205', 0, 2),
(19, '七堵區', '206', 0, 2),
(20, '萬里區', '207', 0, 3),
(21, '金山區', '208', 0, 3),
(22, '板橋區', '220', 0, 3),
(23, '汐止區', '221', 0, 3),
(24, '深坑區', '222', 0, 3),
(25, '石碇區', '223', 0, 3),
(26, '瑞芳區', '224', 0, 3),
(27, '平溪區', '226', 0, 3),
(28, '雙溪區', '227', 0, 3),
(29, '貢寮區', '228', 0, 3),
(30, '新店區', '231', 0, 3),
(31, '坪林區', '232', 0, 3),
(32, '烏來區', '233', 0, 3),
(33, '永和區', '234', 0, 3),
(34, '中和區', '235', 0, 3),
(35, '土城區', '236', 0, 3),
(36, '三峽區', '237', 0, 3),
(37, '樹林區', '238', 0, 3),
(38, '鶯歌區', '239', 0, 3),
(39, '三重區', '241', 0, 3),
(40, '新莊區', '242', 0, 3),
(41, '泰山區', '243', 0, 3),
(42, '林口區', '244', 0, 3),
(43, '蘆洲區', '247', 0, 3),
(44, '五股區', '248', 0, 3),
(45, '八里區', '249', 0, 3),
(46, '淡水區', '251', 0, 3),
(47, '三芝區', '252', 0, 3),
(48, '石門區', '253', 0, 3),
(49, '宜蘭市', '260', 0, 4),
(50, '頭城鎮', '261', 0, 4),
(51, '礁溪鄉', '262', 0, 4),
(52, '壯圍鄉', '263', 0, 4),
(53, '員山鄉', '264', 0, 4),
(54, '羅東鎮', '265', 0, 4),
(55, '三星鄉', '266', 0, 4),
(56, '大同鄉', '267', 0, 4),
(57, '五結鄉', '268', 0, 4),
(58, '冬山鄉', '269', 0, 4),
(59, '蘇澳鎮', '270', 0, 4),
(60, '南澳鄉', '272', 0, 4),
(61, '釣魚台列嶼', '290', 0, 4),
(62, '新竹市(東區)', '300', 0, 5),
(63, '竹北市', '302', 0, 6),
(64, '湖口鄉', '303', 0, 6),
(65, '新豐鄉', '304', 0, 6),
(66, '新埔鎮', '305', 0, 6),
(67, '關西鎮', '306', 0, 6),
(68, '芎林鄉', '307', 0, 6),
(69, '寶山鄉', '308', 0, 6),
(70, '竹東鎮', '310', 0, 6),
(71, '五峰鄉', '311', 0, 6),
(72, '橫山鄉', '312', 0, 6),
(73, '尖石鄉', '313', 0, 6),
(74, '北埔鄉', '314', 0, 6),
(75, '峨眉鄉', '315', 0, 6),
(76, '中壢區', '320', 0, 7),
(77, '平鎮區', '324', 0, 7),
(78, '龍潭區', '325', 0, 7),
(79, '楊梅區', '326', 0, 7),
(80, '新屋區', '327', 0, 7),
(81, '觀音區', '328', 0, 7),
(82, '桃園區', '330', 0, 7),
(83, '龜山區', '333', 0, 7),
(84, '八德區', '334', 0, 7),
(85, '大溪區', '335', 0, 7),
(86, '復興區', '336', 0, 7),
(87, '大園區', '337', 0, 7),
(88, '蘆竹區', '338', 0, 7),
(89, '竹南鎮', '350', 0, 8),
(90, '頭份市', '351', 0, 8),
(91, '三灣鄉', '352', 0, 8),
(92, '南庄鄉', '353', 0, 8),
(93, '獅潭鄉', '354', 0, 8),
(94, '後龍鎮', '356', 0, 8),
(95, '通霄鎮', '357', 0, 8),
(96, '苑裡鎮', '358', 0, 8),
(97, '苗栗市', '360', 0, 8),
(98, '造橋鄉', '361', 0, 8),
(99, '頭屋鄉', '362', 0, 8),
(100, '公館鄉', '363', 0, 8),
(101, '大湖鄉', '364', 0, 8),
(102, '泰安鄉', '365', 0, 8),
(103, '銅鑼鄉', '366', 0, 8),
(104, '三義鄉', '367', 0, 8),
(105, '西湖鄉', '368', 0, 8),
(106, '卓蘭鎮', '369', 0, 8),
(107, '中區', '400', 0, 9),
(108, '東區', '401', 0, 9),
(109, '南區', '402', 0, 9),
(110, '西區', '403', 0, 9),
(111, '北區', '404', 0, 9),
(112, '北屯區', '406', 0, 9),
(113, '西屯區', '407', 0, 9),
(114, '南屯區', '408', 0, 9),
(115, '太平區', '411', 0, 9),
(116, '大里區', '412', 0, 9),
(117, '霧峰區', '413', 0, 9),
(118, '烏日區', '414', 0, 9),
(119, '豐原區', '420', 0, 9),
(120, '后里區', '421', 0, 9),
(121, '石岡區', '422', 0, 9),
(122, '東勢區', '423', 0, 9),
(123, '和平區', '424', 0, 9),
(124, '新社區', '426', 0, 9),
(125, '潭子區', '427', 0, 9),
(126, '大雅區', '428', 0, 9),
(127, '神岡區', '429', 0, 9),
(128, '大肚區', '432', 0, 9),
(129, '沙鹿區', '433', 0, 9),
(130, '龍井區', '434', 0, 9),
(131, '梧棲區', '435', 0, 9),
(132, '清水區', '436', 0, 9),
(133, '大甲區', '437', 0, 9),
(134, '外埔區', '438', 0, 9),
(135, '大安區', '439', 0, 9),
(136, '彰化市', '500', 0, 10),
(137, '芬園鄉', '502', 0, 10),
(138, '花壇鄉', '503', 0, 10),
(139, '秀水鄉', '504', 0, 10),
(140, '鹿港鎮', '505', 0, 10),
(141, '福興鄉', '506', 0, 10),
(142, '線西鄉', '507', 0, 10),
(143, '和美鎮', '508', 0, 10),
(144, '伸港鄉', '509', 0, 10),
(145, '員林市', '510', 0, 10),
(146, '社頭鄉', '511', 0, 10),
(147, '永靖鄉', '512', 0, 10),
(148, '埔心鄉', '513', 0, 10),
(149, '溪湖鎮', '514', 0, 10),
(150, '大村鄉', '515', 0, 10),
(151, '埔鹽鄉', '516', 0, 10),
(152, '田中鎮', '520', 0, 10),
(153, '北斗鎮', '521', 0, 10),
(154, '田尾鄉', '522', 0, 10),
(155, '埤頭鄉', '523', 0, 10),
(156, '溪州鄉', '524', 0, 10),
(157, '竹塘鄉', '525', 0, 10),
(158, '二林鎮', '526', 0, 10),
(159, '大城鄉', '527', 0, 10),
(160, '芳苑鄉', '528', 0, 10),
(161, '二水鄉', '530', 0, 10),
(162, '南投市', '540', 0, 11),
(163, '中寮鄉', '541', 0, 11),
(164, '草屯鎮', '542', 0, 11),
(165, '國姓鄉', '544', 0, 11),
(166, '埔里鎮', '545', 0, 11),
(167, '仁愛鄉', '546', 0, 11),
(168, '名間鄉', '551', 0, 11),
(169, '集集鎮', '552', 0, 11),
(170, '水里鄉', '553', 0, 11),
(171, '魚池鄉', '555', 0, 11),
(172, '信義鄉', '556', 0, 11),
(173, '竹山鎮', '557', 0, 11),
(174, '鹿谷鄉', '558', 0, 11),
(175, '斗南鎮', '630', 0, 12),
(176, '大埤鄉', '631', 0, 12),
(177, '虎尾鎮', '632', 0, 12),
(178, '土庫鎮', '633', 0, 12),
(179, '褒忠鄉', '634', 0, 12),
(180, '東勢鄉', '635', 0, 12),
(181, '臺西鄉', '636', 0, 12),
(182, '崙背鄉', '637', 0, 12),
(183, '麥寮鄉', '638', 0, 12),
(184, '斗六市', '640', 0, 12),
(185, '林內鄉', '643', 0, 12),
(186, '古坑鄉', '646', 0, 12),
(187, '莿桐鄉', '647', 0, 12),
(188, '西螺鎮', '648', 0, 12),
(189, '二崙鄉', '649', 0, 12),
(190, '北港鎮', '651', 0, 12),
(191, '水林鄉', '652', 0, 12),
(192, '口湖鄉', '653', 0, 12),
(193, '四湖鄉', '654', 0, 12),
(194, '元長鄉', '655', 0, 12),
(195, '嘉義市(東區)', '600', 0, 13),
(196, '番路鄉', '602', 0, 14),
(197, '梅山鄉', '603', 0, 14),
(198, '竹崎鄉', '604', 0, 14),
(199, '阿里山鄉', '605', 0, 14),
(200, '中埔鄉', '606', 0, 14),
(201, '大埔鄉', '607', 0, 14),
(202, '水上鄉', '608', 0, 14),
(203, '鹿草鄉', '611', 0, 14),
(204, '太保市', '612', 0, 14),
(205, '朴子市', '613', 0, 14),
(206, '東石鄉', '614', 0, 14),
(207, '六腳鄉', '615', 0, 14),
(208, '新港鄉', '616', 0, 14),
(209, '民雄鄉', '621', 0, 14),
(210, '大林鎮', '622', 0, 14),
(211, '溪口鄉', '623', 0, 14),
(212, '義竹鄉', '624', 0, 14),
(213, '布袋鎮', '625', 0, 14),
(214, '中西區', '700', 0, 15),
(215, '東區', '701', 0, 15),
(216, '南區', '702', 0, 15),
(217, '北區', '704', 0, 15),
(218, '安平區', '708', 0, 15),
(219, '安南區', '709', 0, 15),
(220, '永康區', '710', 0, 15),
(221, '歸仁區', '711', 0, 15),
(222, '新化區', '712', 0, 15),
(223, '左鎮區', '713', 0, 15),
(224, '玉井區', '714', 0, 15),
(225, '楠西區', '715', 0, 15),
(226, '南化區', '716', 0, 15),
(227, '仁德區', '717', 0, 15),
(228, '關廟區', '718', 0, 15),
(229, '龍崎區', '719', 0, 15),
(230, '官田區', '720', 0, 15),
(231, '麻豆區', '721', 0, 15),
(232, '佳里區', '722', 0, 15),
(233, '西港區', '723', 0, 15),
(234, '七股區', '724', 0, 15),
(235, '將軍區', '725', 0, 15),
(236, '學甲區', '726', 0, 15),
(237, '北門區', '727', 0, 15),
(238, '新營區', '730', 0, 15),
(239, '後壁區', '731', 0, 15),
(240, '白河區', '732', 0, 15),
(241, '東山區', '733', 0, 15),
(242, '六甲區', '734', 0, 15),
(243, '下營區', '735', 0, 15),
(244, '柳營區', '736', 0, 15),
(245, '鹽水區', '737', 0, 15),
(246, '善化區', '741', 0, 15),
(247, '大內區', '742', 0, 15),
(248, '山上區', '743', 0, 15),
(249, '新市區', '744', 0, 15),
(250, '安定區', '745', 0, 15),
(251, '新興區', '800', 0, 16),
(252, '前金區', '801', 0, 16),
(253, '苓雅區', '802', 0, 16),
(254, '鹽埕區', '803', 0, 16),
(255, '鼓山區', '804', 0, 16),
(256, '旗津區', '805', 0, 16),
(257, '前鎮區', '806', 0, 16),
(258, '三民區', '807', 0, 16),
(259, '楠梓區', '811', 0, 16),
(260, '小港區', '812', 0, 16),
(261, '左營區', '813', 0, 16),
(262, '仁武區', '814', 0, 16),
(263, '大社區', '815', 0, 16),
(264, '岡山區', '820', 0, 16),
(265, '路竹區', '821', 0, 16),
(266, '阿蓮區', '822', 0, 16),
(267, '田寮區', '823', 0, 16),
(268, '燕巢區', '824', 0, 16),
(269, '橋頭區', '825', 0, 16),
(270, '梓官區', '826', 0, 16),
(271, '彌陀區', '827', 0, 16),
(272, '永安區', '828', 0, 16),
(273, '湖內區', '829', 0, 16),
(274, '鳳山區', '830', 0, 16),
(275, '大寮區', '831', 0, 16),
(276, '林園區', '832', 0, 16),
(277, '鳥松區', '833', 0, 16),
(278, '大樹區', '840', 0, 16),
(279, '旗山區', '842', 0, 16),
(280, '美濃區', '843', 0, 16),
(281, '六龜區', '844', 0, 16),
(282, '內門區', '845', 0, 16),
(283, '杉林區', '846', 0, 16),
(284, '甲仙區', '847', 0, 16),
(285, '桃源區', '848', 0, 16),
(286, '那瑪夏區', '849', 0, 16),
(287, '茂林區', '851', 0, 16),
(288, '茄萣區', '852', 0, 16),
(289, '東沙', '817', 0, 17),
(290, '南沙', '819', 0, 17),
(291, '馬公市', '880', 0, 18),
(292, '西嶼鄉', '881', 0, 18),
(293, '望安鄉', '882', 0, 18),
(294, '七美鄉', '883', 0, 18),
(295, '白沙鄉', '884', 0, 18),
(296, '湖西鄉', '885', 0, 18),
(297, '屏東市', '900', 0, 19),
(298, '三地門鄉', '901', 0, 19),
(299, '霧臺鄉', '902', 0, 19),
(300, '瑪家鄉', '903', 0, 19),
(301, '九如鄉', '904', 0, 19),
(302, '里港鄉', '905', 0, 19),
(303, '高樹鄉', '906', 0, 19),
(304, '鹽埔鄉', '907', 0, 19),
(305, '長治鄉', '908', 0, 19),
(306, '麟洛鄉', '909', 0, 19),
(307, '竹田鄉', '911', 0, 19),
(308, '內埔鄉', '912', 0, 19),
(309, '萬丹鄉', '913', 0, 19),
(310, '潮州鎮', '920', 0, 19),
(311, '泰武鄉', '921', 0, 19),
(312, '來義鄉', '922', 0, 19),
(313, '萬巒鄉', '923', 0, 19),
(314, '崁頂鄉', '924', 0, 19),
(315, '新埤鄉', '925', 0, 19),
(316, '南州鄉', '926', 0, 19),
(317, '林邊鄉', '927', 0, 19),
(318, '東港鄉', '928', 0, 19),
(319, '琉球鄉', '929', 0, 19),
(320, '佳冬鄉', '931', 0, 19),
(321, '新園鄉', '932', 0, 19),
(322, '枋寮鄉', '940', 0, 19),
(323, '枋山鄉', '941', 0, 19),
(324, '春日鄉', '942', 0, 19),
(325, '獅子鄉', '943', 0, 19),
(326, '車城鄉', '944', 0, 19),
(327, '牡丹鄉', '945', 0, 19),
(328, '恆春鎮', '946', 0, 19),
(329, '滿州鄉', '947', 0, 19),
(330, '臺東市', '950', 0, 20),
(331, '綠島鄉', '951', 0, 20),
(332, '蘭嶼鄉', '952', 0, 20),
(333, '延平鄉', '953', 0, 20),
(334, '卑南鄉', '954', 0, 20),
(335, '鹿野鄉', '955', 0, 20),
(336, '關山鎮', '956', 0, 20),
(337, '海端鄉', '957', 0, 20),
(338, '池上鄉', '958', 0, 20),
(339, '東河鄉', '959', 0, 20),
(340, '成功鎮', '961', 0, 20),
(341, '長濱鄉', '962', 0, 20),
(342, '太麻里鄉', '963', 0, 20),
(343, '金峰鄉', '964', 0, 20),
(344, '大武鄉', '965', 0, 20),
(345, '達仁鄉', '966', 0, 20),
(346, '花蓮市', '970', 0, 21),
(347, '新城鄉', '971', 0, 21),
(348, '秀林鄉', '972', 0, 21),
(349, '吉安鄉', '973', 0, 21),
(350, '壽豐鄉', '974', 0, 21),
(351, '鳳林鎮', '975', 0, 21),
(352, '光復鄉', '976', 0, 21),
(353, '豐濱鄉', '977', 0, 21),
(354, '瑞穗鄉', '978', 0, 21),
(355, '萬榮鄉', '979', 0, 21),
(356, '玉里鎮', '981', 0, 21),
(357, '卓溪鄉', '982', 0, 21),
(358, '富里鄉', '983', 0, 21),
(359, '金沙鎮', '890', 0, 22),
(360, '金湖鎮', '891', 0, 22),
(361, '金寧鄉', '892', 0, 22),
(362, '金城鎮', '893', 0, 22),
(363, '烈嶼鄉', '894', 0, 22),
(364, '烏坵鄉', '896', 0, 22),
(365, '南竿鄉', '209', 0, 23),
(366, '北竿鄉', '210', 0, 23),
(367, '莒光鄉', '211', 0, 23),
(368, '東引鄉', '212', 0, 23),
(371, '新竹市(北區)', '300', 0, 5),
(372, '新竹市(香山區)', '300', 0, 5),
(373, '嘉義市(西區)', '600', 0, 13);

-- --------------------------------------------------------

--
-- 資料表結構 `uorder`
--

CREATE TABLE `uorder` (
  `orderid` varchar(30) NOT NULL COMMENT '訂單編號',
  `emailid` int(10) NOT NULL COMMENT '會員編號',
  `addressid` int(10) NOT NULL COMMENT '收件人編號',
  `howpay` tinyint(4) NOT NULL DEFAULT 1 COMMENT '如何付款',
  `paystatus` int(5) DEFAULT NULL COMMENT '付款狀態',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '訂單處理狀態',
  `remark` varchar(200) DEFAULT NULL COMMENT '備註',
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT '訂單時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- 傾印資料表的資料 `uorder`
--

INSERT INTO `uorder` (`orderid`, `emailid`, `addressid`, `howpay`, `paystatus`, `status`, `remark`, `create_date`) VALUES
('1619161669175448', 10, 4, 3, 35, 7, NULL, '2021-04-23 07:07:49'),
('1619161734581887', 10, 4, 3, 35, 7, NULL, '2021-04-23 07:08:54'),
('1619181180278775', 10, 9, 3, 35, 7, NULL, '2021-04-23 12:33:00'),
('1619260500232495', 10, 4, 3, 35, 7, NULL, '2021-04-24 10:35:00'),
('1619261102143533', 10, 4, 3, 35, 7, NULL, '2021-04-24 10:45:02'),
('1619261151557635', 10, 10, 3, 35, 7, NULL, '2021-04-24 10:45:51'),
('1662031788775169', 10, 11, 3, 35, 7, NULL, '2022-09-01 11:29:48');

-- --------------------------------------------------------

--
-- 資料表結構 `username`
--

CREATE TABLE `username` (
  `account` varchar(10) NOT NULL,
  `username` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `username`
--

INSERT INTO `username` (`account`, `username`) VALUES
('001', '零零壹'),
('002', '零零貳'),
('003', '零零參'),
('004', '零零肆'),
('admin', '管理員');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `addbook`
--
ALTER TABLE `addbook`
  ADD PRIMARY KEY (`addressid`);

--
-- 資料表索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`account`);

--
-- 資料表索引 `carousel`
--
ALTER TABLE `carousel`
  ADD PRIMARY KEY (`caro_id`);

--
-- 資料表索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartid`);

--
-- 資料表索引 `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`AutoNo`);

--
-- 資料表索引 `hot`
--
ALTER TABLE `hot`
  ADD PRIMARY KEY (`h_id`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`emailid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 資料表索引 `mright`
--
ALTER TABLE `mright`
  ADD PRIMARY KEY (`account`,`sid`),
  ADD KEY `aid` (`account`,`sid`);

--
-- 資料表索引 `multiselect`
--
ALTER TABLE `multiselect`
  ADD PRIMARY KEY (`msid`);

--
-- 資料表索引 `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`p_id`);

--
-- 資料表索引 `product_img`
--
ALTER TABLE `product_img`
  ADD PRIMARY KEY (`img_id`);

--
-- 資料表索引 `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`program`);

--
-- 資料表索引 `pyclass`
--
ALTER TABLE `pyclass`
  ADD PRIMARY KEY (`classid`);

--
-- 資料表索引 `town`
--
ALTER TABLE `town`
  ADD PRIMARY KEY (`townNo`);

--
-- 資料表索引 `uorder`
--
ALTER TABLE `uorder`
  ADD PRIMARY KEY (`orderid`);

--
-- 資料表索引 `username`
--
ALTER TABLE `username`
  ADD PRIMARY KEY (`account`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `addbook`
--
ALTER TABLE `addbook`
  MODIFY `addressid` int(10) NOT NULL AUTO_INCREMENT COMMENT '地址ID', AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `carousel`
--
ALTER TABLE `carousel`
  MODIFY `caro_id` int(3) NOT NULL AUTO_INCREMENT COMMENT '輪播編號', AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cart`
--
ALTER TABLE `cart`
  MODIFY `cartid` int(10) NOT NULL AUTO_INCREMENT COMMENT '購物車編號', AUTO_INCREMENT=90;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `city`
--
ALTER TABLE `city`
  MODIFY `AutoNo` int(10) NOT NULL AUTO_INCREMENT COMMENT '城市編號', AUTO_INCREMENT=24;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `hot`
--
ALTER TABLE `hot`
  MODIFY `h_id` int(3) NOT NULL AUTO_INCREMENT COMMENT '熱銷商品流水號', AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `emailid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'email流水號', AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `multiselect`
--
ALTER TABLE `multiselect`
  MODIFY `msid` int(5) NOT NULL AUTO_INCREMENT COMMENT '多功能選擇ID', AUTO_INCREMENT=39;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product`
--
ALTER TABLE `product`
  MODIFY `p_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '產品編號', AUTO_INCREMENT=52;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `product_img`
--
ALTER TABLE `product_img`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '圖檔編號', AUTO_INCREMENT=104;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `pyclass`
--
ALTER TABLE `pyclass`
  MODIFY `classid` int(3) NOT NULL AUTO_INCREMENT COMMENT '產品類別', AUTO_INCREMENT=119;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `town`
--
ALTER TABLE `town`
  MODIFY `townNo` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '鄕鎮市編號', AUTO_INCREMENT=374;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `mright`
--
ALTER TABLE `mright`
  ADD CONSTRAINT `mright_ibfk_1` FOREIGN KEY (`account`) REFERENCES `admin` (`account`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
