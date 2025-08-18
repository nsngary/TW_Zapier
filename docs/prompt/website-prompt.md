====================

# TW_Zapier – 官方網站製作 Prompt（rev A）

====================

> 適用範圍：`website/`（Nuxt 3 + TypeScript + Tailwind + @nuxt/content + GSAP(允許多個動畫函式庫)）。
> 目標：參考 zapier.com 的資訊架構（IA），完成官網：「首頁 / 產品 / 方案與定價 / 客戶案例 / Blog / 關於我們」。建議`sandbox/`資料夾集中測試用檔案。

================================================================

## 1.　開發前分析（強制）

> 目的：建立「原站 → 我方還原」的一致性基準與可驗證證據。

### 1.1 抓取 zapier.com 首頁 HTML（必做）

* `web-fetch https://zapier.com/ --full --output zapier_home.html`

### 1.2 Playwright 深度分析（必做）

* `browser_navigate_Playwright "https://zapier.com/"`
* `browser_snapshot_Playwright`：截 Hero / 功能導覽 / Pricing CTA / Footer / Global Header Dropdown 等元素
* `browser_evaluate_Playwright`：輸出 `{ domTree, cssUsed, listeners, aria, dataTestId }`

### 1.3 再次靜態分析（必做）

* `web HTML CSS JavaScript structure analysis view-source zapier_home.html`
* 重點：
  · HTML：語意標籤、區塊分層、Schema.org（Breadcrumb、FAQ/HowTo 如有）
  · CSS：容器寬度、Grid/Stack 模式、RWD 斷點、Container Query 使用與否
  · JS：動畫庫、IntersectionObserver 觸發點、按鈕/表單互動事件

### 1.4 產出《analysis-report.md》（提交至 `website/docs/`）

* DOM 架構樹（節點對應我方 Nuxt 元件）
* 區塊切片：Hero / Product Features / Integrations Grid / Social Proof / Pricing CTA / Footer
* 互動流程：Hover、Scroll Reveal、數字增長、Carousel 等
* 可重用型版（section schema）與版面度量（max-w、gutter、column）

===========================

## 2.　網站設計參考與互動特效（強制）

> 目的：在不違背品牌與可用性的前提下，以精緻互動建立「先進、前驅」形象。

### 2.1 參考站清單（必須實際分析並附證據）

**使用者指定參考網站時**：請根據 `playwright/playwright-prompt.md` 中的指示明確對目標網站、目標動畫進行模仿、分析、復刻。

### 2.2 導入規範

* **動畫函式庫**：建議優先 **GSAP** + IntersectionObserver，**不限制只用單一庫**。可依區塊需求使用（如 Lenis／Locomotive Scroll／Swiper／SplitType／Webflow runtime 等），須以 **adapter** 封裝於 `plugins/anim/**` 或 `composables/useMotion*.ts`，採 **動態 import**、**code‑split**、**tree‑shaking**，僅在 **client** 啟用，並遵循授權條款與 SSR 安全（`if (process.client)`）。**先不限制特效體積**，但需於 PR 說明選型理由與後續維運計畫。
* 顏色限制：主色 **#86735E**、強調 **#C2474A**、輔助 **#667539**；其它色須由中性色推導（透明度／明度變化）。
* website 設計規範：`website/tailwind.config.js`
* **可移植性**：所有特效皆須可移植：封裝為 `composables/useMotion*.ts` 或 `plugins/anim/**` 的 **adapter**，避免全域 side‑effects；提供 **no‑JS fallback**、SSR 安全守門（`if (process.client)`）、與失效時優雅降級。

================================

## 3.　實作（100% 結構模仿 + 區塊對齊）

### 3.1 元件切片（依`analysis-report.md`）

* `components/hero/HeroZapierLike.vue`
* `components/sections/FeaturesGrid.vue`
* `components/sections/IntegrationsWall.vue`
* `components/sections/PricingCTA.vue`
* `components/common/SiteHeader.vue`（summary/details 下拉 + 全寬 Submenu）
* `components/common/SiteFooter.vue`

### 3.2 頁面與內容

* `pages/index.vue`：Hero / Features / Social Proof / Integrations / CTA
* `content/`：Markdown 資料源（客戶案例、常見問題、Integrations 文案）

### 3.3 實作檔與測試檔分離（強制）

* 實作：`components/**`、`pages/**`
* 測試：`tests/unit/**`、`tests/e2e/**`（Playwright）
* 任何除錯**不得**直接覆寫實作檔；請複製到 `sandbox/` 進行實驗。

### 3,4 互動規格

* 滾動進場：`data-anim="reveal"` 的節點以 `observer.ts` 觸發 GSAP timeline
* Hover：Button/Icon 採 150–200ms ease-out、陰影/位移不超過 `translate-y-0.5`
* 數字計數：Intersection 首次進入才啟動、離開不重播；保證 SSR 初始值可讀

=======================

## 4.　完成後驗證（強制對比）

### 4.1 本地抓取

* `web-fetch http://localhost:4000 --full --output local_home.html`
* `browser_navigate_Playwright "http://localhost:4000"` → snapshot + evaluate

### 4.2 差異比對

* 結構：`zapier_home.html` vs `local_home.html`（head/meta、主要 DOM 區塊、class pattern）
* 互動：事件數量/觸發條件/動畫時序（以 evaluate 的 JSON log 比對）
* 產出《diff-report.md》：列出 ❌ 差異（必要改）／⚠️ 偏差（可接受）／✅ 一致（已通過）

### 4.3 品質門檻

* Lighthouse：Performance ≥ 90、Accessibility ≥ 90、Best Practices ≥ 90、SEO ≥ 95（桌機）
* JavaScript 體積：首屏 ≤ 180KB（gzip 後），圖片皆為 `next-gen formats`（AVIF/WEBP）

=======================

## 5. 交付物 / Deliverables

* `analysis-report.md`（zapier.com 原站解析）
* `effects-*.md`（三個參考站的互動實作分析）
* Nuxt 原始碼 + 單元/端對端測試
* `diff-report.md`（原站 vs 本地）
* 簡易 Deploy 指引（Cloudflare Pages / Vercel Free Plan 任一）

=======================

# #執行要求 / 調用宣告

* 每次開始新的區塊開發，先輸出：

```md
📋 調用Prompt:
- docs/prompts/website-prompt.md (官方網站開發)
- docs/prompts/website-testing-validation.md (對比與驗證)
```

* 然後附上：
* `web-fetch` 與 Playwright 的操作紀錄（指令與輸出檔名）
* 參考站的對應區塊來源（網址 + 截圖代號）
* 對應的 Nuxt 元件檔路徑

====================

# END OF PROMPT (rev A)

====================
