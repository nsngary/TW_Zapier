====================

# TW_Zapier – 測試與驗證策略 / Testing & Validation Strategy（rev B）

====================

> 適用範圍：website/（Nuxt 3 官網）與其互動/動畫模組。
> 目標：以工具化證據驗證「結構一致性、互動一致性、視覺還原度、效能與可及性」。

=====

## 0. 開始前的調用宣告（強制）

* 每次啟動測試任務，請在 PR 描述或 Issue 開頭附上：

```md
📋 調用Prompt:
- docs/prompts/website-prompt.md (官方網站開發)
- docs/prompts/website-testing-validation.md (對比與驗證)
```

* 並列出本次測試的對應區塊（Hero / Features / Pricing / Header Dropdown 等）。

=====

## 1. 測試環境與工具

### 1.1 環境

* 本地網站：[http://localhost:4000]（Nuxt nuxi dev -p 4000 或 nuxi preview）
* 參考網站：[https://zapier.com/]（以及三個互動參考站）

### 1.2 工具

**web-fetch**：抓取完整 HTML 與靜態資源索引（作為結構基準）。
**Playwright**：browser_navigate_Playwright / browser_snapshot_Playwright / browser_evaluate_Playwright。
**Lighthouse CI**：效能 / 最佳實踐 / SEO 指標。
**（選配）axe-core**：可及性規則檢查。
**瀏覽器矩陣**：Chromium（必測）、WebKit（選測）。裝置視窗：1920×1080、1366×768、390×844。

=====

## 2. 參考網站對照流程（強制）

### 2.1 zapier.com 首頁（主對照）

#### 靜態抓取：web-fetch [https://zapier.com/] --full --output zapier\_home.html

#### 互動快照

* `browser\_navigate\_Playwright "[https://zapier.com/]"`
* `browser\_snapshot\_Playwright`   # Hero / 功能導覽 / Pricing CTA / Footer / Header Dropdown
* `browser\_evaluate\_Playwright`   # 輸出 { domTree, cssUsed, listeners, aria, dataTestId }

#### 分析產物：將輸出保存到 `website/docs/reference/zapier/`

### 2.2 三個特效參考站（輔助對照）

對使用者指定網址依序執行 2.1 的流程，產出 `effects-\*.md`：

**注意**：如參考站使用第三方動畫庫，可在本地導入驗證與還原。允許多動畫庫並存，無單庫體積上限

=====

## 3. 本地實作驗證（強制）

### 3.1 本地抓取與快照

`web-fetch [http://localhost:4000](http://localhost:4000) --full --output local\_home.html`
`browser\_navigate\_Playwright "[http://localhost:4000]"`
`browser\_snapshot\_Playwright`
`browser\_evaluate\_Playwright`

所有輸出保存到 `website/docs/local/`。

### 3.2 結構對比（Structural Diff）

**比對項目**：`zapier\_home.html vs local\_home.html`

```html
<head>：title / meta / canonical / og:\* / preload / schema.org（如有）
<header>：主導航、下拉選單容器（寬度、定位、層級）
與其他html元素
```

**主要區塊**：Hero / Features / Integrations / Social Proof / Pricing CTA / Footer
**輸出**：website/docs/diff-report.md，並分類：
**❌ 差異**（必要修正）
**⚠️ 偏差**（可接受的差距與理由）
**✅ 一致**（驗證通過）

### 3.3 互動對比（Interaction Diff）

**來源**：兩邊的 browser\_evaluate\_Playwright JSON。
**比對**：事件監聽器數量/目標節點、Intersection 觸發條件、動畫 timeline（名稱與時序）
**要求**：本地的交互語意與節奏需與原站一致（時間可±10% 內差距）。

### 3.4 視覺回歸（Visual Regression）

**Playwright 的 toHaveScreenshot()**：對 Hero / Pricing CTA / Header Dropdown 建立黃金圖。
**容許差異**：≤ 0.1%（PNG 逐像素比對）。

=====

## 4. E2E 腳本規範（Playwright）

### 4.1 範例：Header 下拉選單（Zapier 風格，全寬）

```ts
import { test, expect } from '@playwright/test'

test.describe('Header dropdown - full width & layout', () => {
  test('opens and spans viewport width', async ({ page }) => {
    await page.goto('http://localhost:4000')
    // 開啟 Products
    await page.getByRole('button', { name: /products/i }).click()
    const panel = page.locator('.Submenu-module_root_BoW-D-ZP')
    await expect(panel).toBeVisible()
    const vw = await page.evaluate(() => window.innerWidth)
    const rect = await panel.boundingBox()
    expect(Math.round(rect!.width)).toBeGreaterThanOrEqual(vw - 2)
    expect(Math.round(rect!.x)).toBe(0)
  })
})
```

### 4.2 範例：Reduced motion 降級

```ts
import { test, expect } from '@playwright/test'

test('respects prefers-reduced-motion', async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: false,
    colorScheme: 'light',
    reducedMotion: 'reduce'
  })
  const page = await context.newPage()
  await page.goto('http://localhost:4000')
  // 內容可讀（Hero 標題立即可見）
  await expect(page.getByTestId('hero-title')).toBeVisible()
  // 不應有長時間動畫中的 class（例如 .is-animating）
  const anim = await page.locator('.is-animating').count()
  expect(anim).toBe(0)
})
```

### 4.3 範例：Effects Adapter（暫時依賴）

```ts
// 若臨時導入 Locomotive/Lenis，必須以 client-only plugin 封裝，並在此檢查存在性
import { test, expect } from '@playwright/test'

test('effects adapter is client-only and removable', async ({ page }) => {
  await page.goto('http://localhost:4000')
  const hasAdapter = await page.evaluate(() => !!window.__TWZ_EFFECTS__)
  expect(typeof hasAdapter).toBe('boolean')
})
```

=====

## 5. CI 與報表產物

**CI Job**：

1.Build & Preview（Nuxt）
2.Playwright：E2E + 視覺回歸（上傳快照差異）
3.Lighthouse CI：輸出 JSON 與 HTML 報告
4.工具紀錄：上傳 website/docs/reference/**、website/docs/local/**、website/docs/diff-report.md

**PR 模板需附**：

1.web-fetch / Playwright 的指令與輸出檔名
2.diff-report 重點（❌/⚠️/✅ 各 3 項內）
3.Lighthouse 指標摘要
4.（如有）暫時動畫庫的移除計畫（issue 連結）

=====

## 6. 驗收清單（Submitter 必填）

* [ ] 已執行 web-fetch + Playwright 對照（原站 / 本地）並提交 analysis / effects / diff 報告
* [ ] Header 下拉選單全寬覆蓋且可鍵盤操作（Tab/Enter/Space）
* [ ] prefers-reduced-motion 時內容即時可讀、無長動畫
* [ ] Lighthouse（Desktop）Perf ≥ 90 / A11y ≥ 90 / BP ≥ 90 / SEO ≥ 95
* [ ] 首屏 JS ≤ 180KB gzip；第三方動畫以 adapter + client-only 載入
* [ ] 關鍵區塊通過視覺回歸（≤ 0.1%）

====================

# END OF TESTING & VALIDATION STRATEGY (rev B)

====================
