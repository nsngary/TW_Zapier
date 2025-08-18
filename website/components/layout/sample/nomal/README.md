# 🎭 浮動動畫修復方案

## 問題描述

您的 `div class="js-float-item"` 元素的 `transform: translate3d` 沒有持續變化，這是因為缺少了控制動畫的JavaScript依賴。

## 解決方案

我已經為您創建了一個完整的本地浮動動畫解決方案，包含以下檔案：

### 📁 檔案結構
```
website/components/layout/sample/nomal/
├── nomal_index.html          # 主要HTML檔案（已修復並添加本地腳本引用）
├── js/
│   └── float-animation.js    # 浮動動畫JavaScript邏輯
├── css/
│   └── float-animation.css   # 動畫相關樣式
├── test-float-animation.html # 測試頁面
└── README.md                 # 說明文件（本檔案）
```

## 🚀 使用方法

### 1. 測試動畫效果
打開 `test-float-animation.html` 來測試動畫是否正常工作：
```bash
# 在瀏覽器中打開
open test-float-animation.html
```

### 2. 在主頁面中使用
主頁面 `nomal_index.html` 已經自動引入了必要的腳本和樣式：
```html
<!-- CSS -->
<link rel="stylesheet" href="css/float-animation.css" type="text/css" media="all">

<!-- JavaScript -->
<script src="js/float-animation.js"></script>
```

## ⚙️ 動畫特性

### 動畫參數
每個 `js-float-item` 元素都有獨立的動畫參數：
- **X軸移動**：15-25px 幅度的水平浮動
- **Y軸移動**：20-35px 幅度的垂直浮動  
- **旋轉**：0.3-0.7度的輕微旋轉
- **縮放**：1.02-1.05倍的微小縮放變化
- **相位偏移**：每個元素都有不同的動畫相位

### 性能優化
- 使用 `requestAnimationFrame` 確保流暢動畫
- 啟用硬體加速 (`transform: translate3d`)
- 支援頁面可見性API，隱藏時自動暫停動畫
- 響應 `prefers-reduced-motion` 媒體查詢

## 🎮 控制功能

### JavaScript API
```javascript
// 全域動畫實例
window.floatAnimation

// 控制方法
window.floatAnimation.stopAnimation()    // 停止動畫
window.floatAnimation.startAnimation()   // 開始動畫
window.floatAnimation.restart()          // 重新開始動畫
window.floatAnimation.toggle()           // 切換動畫狀態
```

### 測試頁面控制
測試頁面提供了以下控制按鈕：
- ⏯️ **暫停/恢復動畫**：切換動畫播放狀態
- 🔄 **重新開始動畫**：重置並重新開始動畫
- 🐛 **調試模式**：顯示元素邊界，方便調試

## 🔧 自定義配置

### 修改動畫參數
在 `js/float-animation.js` 中可以調整以下參數：
```javascript
// 動畫幅度
amplitudeX: 15 + Math.random() * 10,     // X軸移動幅度
amplitudeY: 20 + Math.random() * 15,     // Y軸移動幅度
amplitudeRotation: 0.3 + Math.random() * 0.4,  // 旋轉幅度
amplitudeScale: 0.02 + Math.random() * 0.03,    // 縮放幅度

// 動畫速度
speedX: 0.5 + Math.random() * 0.5,       // X軸速度
speedY: 0.3 + Math.random() * 0.4,       // Y軸速度
speedRotation: 0.1 + Math.random() * 0.2, // 旋轉速度
speedScale: 0.2 + Math.random() * 0.3,    // 縮放速度
```

### CSS樣式自定義
在 `css/float-animation.css` 中可以調整：
- 動畫過渡效果
- 響應式行為
- 無障礙設計支援
- 調試模式樣式

## 🐛 故障排除

### 動畫不工作？
1. **檢查控制台錯誤**：打開瀏覽器開發者工具查看是否有JavaScript錯誤
2. **確認檔案路徑**：確保 `js/float-animation.js` 和 `css/float-animation.css` 路徑正確
3. **測試頁面**：先在 `test-float-animation.html` 中測試動畫是否正常

### 動畫太快或太慢？
調整 `js/float-animation.js` 中的 `speed*` 參數：
- 數值越大 = 動畫越快
- 數值越小 = 動畫越慢

### 動畫幅度太大或太小？
調整 `js/float-animation.js` 中的 `amplitude*` 參數：
- 數值越大 = 移動幅度越大
- 數值越小 = 移動幅度越小

## 📱 響應式支援

動畫會自動適應不同螢幕尺寸：
- **桌面**：完整動畫效果
- **平板**：正常動畫效果
- **手機**：可選擇性減少動畫（在CSS中配置）
- **無障礙**：支援 `prefers-reduced-motion` 設定

## 🔄 更新日誌

- **v1.0.0** - 初始版本，包含基本浮動動畫功能
- 修復了原始HTML中的 `loading=""lazy""` 語法錯誤
- 添加了完整的本地動畫解決方案
- 提供了測試頁面和詳細文檔

## 💡 提示

1. 建議先在測試頁面中驗證動畫效果
2. 可以根據設計需求調整動畫參數
3. 在生產環境中可以考慮添加動畫開關選項
4. 定期檢查瀏覽器相容性
