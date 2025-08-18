=====================

# TW_Zapier – Editor（主應用前端）測試與驗證策略 / Editor Testing & Validation Strategy（rev A）

=====================

> 適用範圍：`frontend/`（Vue 3 + Vite + Element Plus + Pinia + Vue Flow）。
> 目標：以「**可重現、可自動化**」的方式驗證**工作流程編輯器**與其關鍵互動、狀態管理、資料對接、可及性與效能穩定性。

===

## 0. 任務啟動宣告（強制）

每次啟動 Editor 測試任務，需在 PR 或 Issue 開頭貼：

```md
📋 調用Prompt:
 - docs/prompts/editor-testing-validation.md (Editor 測試)
 - docs/prompts/code-quality-standards.md (程式碼品質)
```

並列出本次測試涵蓋：節點庫、畫布互動、邊線、表單面板、匯入/匯出、儲存/復原等模組。

===

## 1. 測試分層與工具

* **單元測試（Unit）**：Vitest + vue-test-utils（邏輯/Composable/Store）。
* **元件測試（Component）**：Vue Testing Library（以使用者情境操作 DOM）。
* **端對端（E2E）**：Playwright（畫布互動、拖曳、連線、縮放、快捷鍵、模態流程）。
* **可及性（A11y）**：axe-core（`@axe-core/playwright` 或 `jest-axe` 搭配 VTL）。
* **視覺回歸（Visual Regression）**：Playwright `toHaveScreenshot()`（主要針對畫布、屬性面板與檔案對話框）。

===

## 2. 覆蓋率與閾值

* **Coverage（最低門檻）**：語句/分支/函式/行 **≥ 80%**。
* **視覺回歸**：允許差異 **≤ 0.2%**（工作流程畫布允許少量抗鋸齒差異）。
* **互動穩定度**：同一 E2E 測試連跑 5 次，成功率 **≥ 98%**。

===

## 3. 關鍵模組測試清單

### 3.1 畫布與節點（Vue Flow）

* 節點新增/刪除/複製/拖曳/吸附（grid-snapping）。
* 邊線新增/刪除/重接（reconnect）/自動佈線（若有）。
* **連線樣式規範**：驗證 `:connection-line-type="ConnectionLineType.SmoothStep"`（不可使用字串）。
* 畫布縮放/平移與邊界鎖定（min/max zoom、pan 範圍）。
* 多選（框選/Shift 點選）與批次操作（刪除/對齊/分組）。

### 3.2 側邊屬性面板（Element Plus + 表單）

* 表單驗證：必填、格式（Email、URL、手機）與 **區域設定**（如手機號碼規則依 Region 切換）。
* 即時同步：屬性更動 → 觸發 Pinia 狀態變更 → 反映到畫布（雙向綁定）。
* 欄位依賴：條件顯示/禁用；重置/撤銷/重做。

### 3.3 狀態管理（Pinia）

* Store 初始狀態、動作（actions）與派生（getters）。
* **時間旅行（time-travel）**：撤銷/重做堆疊正確性；跨模組同步一致。
* 大型工作流程（1k+ 節點）下的操作延時（見第 6 節）。

### 3.4 檔案流（Import / Export / Draft）

* 匯入格式驗證（schema 驗證 + 版本相容）。
* 匯出內容完整性（包含節點參數、連線、版面）。
* 草稿自動儲存與恢復；跨分頁恢復一致性。

### 3.5 與後端對接（FastAPI 模擬）

* 以 MSW（Mock Service Worker）攔截：節點庫、驗證、儲存、執行預檢。
* 失敗重試、取消請求（AbortController）、超時 UI。
* 後端錯誤碼 → 前端提示（國際化/區域化訊息）。

### 3.6 可及性（A11y）

* 畫布與節點**可鍵盤操作**（Tab/Shift+Tab、方向鍵微移、Delete、Enter、Space）。
* 焦點可見（`focus-visible` 樣式與 Tailwind `ring-2 ring-offset-2`）
* **Reduced motion**：`prefers-reduced-motion: reduce` 時，拖曳/轉場退化為無動畫或極短動畫（≤120ms）。

===

## 4. 範例：Unit / Component / E2E 測試

### 4.1 Unit（Pinia Store）

```ts
import { setActivePinia, createPinia } from 'pinia'
import { useFlowStore } from '@/stores/flow'
import { describe, it, expect, beforeEach } from 'vitest'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('flow store', () => {
  it('adds a node and creates undo checkpoint', () => {
    const s = useFlowStore()
    const id = s.addNode({ type: 'http', position: { x: 100, y: 50 } })
    expect(s.nodes.byId[id]).toBeTruthy()
    expect(s.history.undo.length).toBe(1)
  })
})
```

### 4.2 Component（屬性面板）

```ts
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import NodePanel from '@/components/panel/NodePanel.vue'
import { createTestingPinia } from '@pinia/testing'

it('updates node title and reflects on canvas', async () => {
  const user = userEvent.setup()
  render(NodePanel, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })]
    },
    props: { nodeId: 'n1' }
  })
  await user.type(await screen.findByLabelText(/title/i), 'Fetch Orders')
  expect(screen.getByDisplayValue('Fetch Orders')).toBeInTheDocument()
  // 可額外 spy store action 或觸發畫布事件 bus
})
```

### 4.3 E2E（畫布拖曳 + 連線 + 驗證連線樣式）

```ts
import { test, expect } from '@playwright/test'

test.describe('workflow canvas', () => {
  test('drag, connect and ensure SmoothStep line type', async ({ page }) => {
    await page.goto('http://localhost:5173')

    // 新增兩個節點（依 UI 實作，可能是按鈕或 palette 拖入）
    await page.getByRole('button', { name: /add http node/i }).click()
    await page.getByRole('button', { name: /add transform node/i }).click()

    // 取得兩個節點的 handle 並連線
    const src = page.locator('[data-node-id="n1"] .handle.source').first()
    const tgt = page.locator('[data-node-id="n2"] .handle.target').first()
    const sbox = await src.boundingBox()
    const tbox = await tgt.boundingBox()
    await page.mouse.move(sbox!.x + sbox!.width / 2, sbox!.y + sbox!.height / 2)
    await page.mouse.down()
    await page.mouse.move(tbox!.x + tbox!.width / 2, tbox!.y + tbox!.height / 2)
    await page.mouse.up()

    // 驗證連線型別（DOM 屬性或 store 狀態）
    const lineType = await page.evaluate(() => {
      // 依你的實作：可能寫在 window 或 store；此處示意
      // @ts-ignore
      return window.__FLOW__.edges[0].connectionLineType
    })
    expect(lineType).toBe('SmoothStep')
  })
})
```

### 4.4 A11y（axe-playwright）

```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('canvas screen has no critical a11y violations', async ({ page }) => {
  await page.goto('http://localhost:5173')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0)
})
```

===

## 5. 大型工作流程壓力測試（Performance）

* 目標：**1,000 個節點 / 2,000 條邊** 下仍可操作。
* 指標：

  * 初次載入（冷啟） < **3.5s**（本地開發，模擬 6x CPU throttle）；
  * 畫布平移/縮放掉幀 < **5%**；
  * 批次刪除 100 節點 < **200ms**；
  * 撤銷/重做 單步 < **150ms**。
* 方法：以腳本產生巨量 JSON（fixtures），E2E 自動載入並量測 `performance.now()` 差值。

===

## 6. 測試資料與 Mock 策略

* **Fixtures**：`tests/fixtures/flows/*.json`（小/中/大/異常）。
* **MSW**：對 `/api/nodes` `/api/validate` `/api/flows` 等路由給定可配置回應（延遲/錯誤率）。
* **時間相關**：使用 `vi.useFakeTimers()` 模擬排程、去抖與節流。

===

## 7. CI 與報表產物

* **CI Job**：

  1. TypeCheck（TS 严格模式）
  2. Lint（ESLint + Stylelint，如有）
  3. Unit/Component（Vitest）— 輸出 coverage badge
  4. E2E（Playwright）— 上傳測試錄影、trace、視覺快照
  5. A11y（axe）— 上傳違規摘要 JSON
* **PR 模板**需附：

  * 本次測試類型與覆蓋範圍
  * 新/變動依賴（若有）用途說明
  * 視覺回歸差異摘要（若有）

===

## 8. 驗收清單（Submitter 必填）

* [ ] 畫布可拖曳/縮放/平移；節點與邊操作皆可 E2E 重放。
* [ ] 連線型別為 `ConnectionLineType.SmoothStep`（非字串）。
* [ ] 表單驗證通過並與 Pinia 同步；撤銷/重做可用。
* [ ] 匯入/匯出/草稿 通通可復現；API 錯誤能友善提示。
* [ ] A11y 基線達標（axe 無 critical）；Reduced motion 降級可用。
* [ ] 大型工作流程壓測指標達標。

=====================

# END OF EDITOR TESTING & VALIDATION STRATEGY (rev A)

=====================
