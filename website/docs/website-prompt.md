############################
#  TW_Zapier – 官方網站製作 Prompt
############################

【PROJECT CONTEXT】
  •  目標：打造與 zapier.com 首頁結構／互動 100% 對齊、符合台灣在地化品牌（TW_Zapier Design System）的行銷官網  
  •  技術棧：Nuxt 3 + TailwindCSS + TypeScript + @nuxt/content + GSAP（已配置）
  •  域名規劃：官網 → https://www.twzapier.com / 開發預設 http://localhost:4000  
  •  設計資源：TW_Zapier Design Tokens（色票、字體、Spacing、Radii）、在地化元件庫 @twzapier/ui  
  •  檔案結構：  
     ├─ website/           （本任務目錄，已建立）  
     ├─ frontend/          (既有工作區 Vue 3)  
     └─ shared/            (@tw-zapier/shared, 共用元件)  

================================================================
🟢【PHASE 1　開發前分析】  
================================================================
  1. **抓取目標 HTML**  
     - 使用 `web-fetch`：`web-fetch https://zapier.com/ --full --output zapier_home.html`  
  2. **Playwright 深度分析**  
     - `browser_navigate_Playwright "https://zapier.com/"`  
     - `browser_snapshot_Playwright`（截取關鍵區塊：Hero、Features、Pricing CTA）  
     - `browser_evaluate_Playwright`：輸出 `{html, css, js}` 節點樹，並記錄 `data-testid`／ARIA 屬性  
  3. **再次靜態分析**  
     - `web HTML CSS JavaScript structure analysis view-source zapier_home.html`  
     - 重點：  
       · HTML：語意標籤、區塊分層、Schema.org 標記  
       · CSS：BEM / Utility class 佈局、RWD 斷點、Container Query 使用  
       · JS：Lottie / GSAP / IntersectionObserver 行為  
  4. **產出〈analysis-report.md〉**  
     - 梳理 DOM 架構、元件切片、互動流程  
     - 設為後續實作的對照基準  

================================================================
🟡【PHASE 2　開發執行】  
================================================================
  1. **專案已建立 (website/)**  
     - ✅ Nuxt 3 專案已初始化  
     - ✅ Tailwind、@nuxt/content 已安裝  
     - ✅ TW_Zapier 色彩系統已配置  
  2. **100 % 結構還原**  
     - 依〈analysis-report.md〉切 Hero / Feature / CTA / Footer 元件  
     - **實作檔 (components/*)** 與 **測試檔 (tests/unit/*)** 嚴格分離  
  3. **在地化整合**  
     - 套用 TW_Zapier 配色／字體 token（已配置基礎）  
     - 文字、日期、幣值 → zh-TW、TWD  
  4. **CI / Lint / Test**  
     - ESLint、Vitest 覆蓋率 80 %+  
  5. **Docker 環境啟動**  
     - `docker-compose --profile website up -d`  
     - 或直接 `npm run dev` 在 website/ 目錄  

================================================================
🔵【PHASE 3　完成後驗證】  
================================================================
  1. **再次使用工具對比**  
     - `web-fetch http://localhost:4000 --full --output local_home.html`  
     - `browser_navigate_Playwright "http://localhost:4000"` → snapshot + evaluate  
  2. **差異比對**  
     - 比較 `zapier_home.html` vs `local_home.html`：結構、class、meta tag  
     - 互動：Playwright evaluate → 比對關鍵 JS 事件、動畫觸發點  
  3. **產出〈diff-report.md〉**  
     - 條列結構落差、視覺偏差 (px / color delta)、功能漏失  
     - 打勾 ✅ / 待修 🛠️  
  4. **迭代修正直至無重大差異**  

================================================================
🛎️【交付物】  
================================================================
  1. `analysis-report.md` （原站解析）  
  2. `marketing-site` Nuxt 3 專案源碼 + 單元測試  
  3. `diff-report.md` （原站 vs 本地結果）  
  4. Deploy 指令／腳本（Cloudflare Pages 或 Vercel Free Plan）  

############################
#   END OF PROMPT
############################
