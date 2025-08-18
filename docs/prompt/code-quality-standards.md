============================

# TW_Zapier – 前端程式碼規範 / Code Quality Standards（rev B）

============================

適用範圍：website/（Nuxt 3）與 frontend/（Vue 3 + Vite）。本文件聚焦「可移植」、「高可維護」、「高效能」、「高易用性（a11y）」之標準。

===

## 1. 基本原則

* **Region‑agnostic / 可移植**：文案與組件不得硬碼台灣限定內容；透過內容配置（@nuxt/content / i18n）注入在地案例。
* **型別安全**：全面採用 TypeScript（"strict": true）。禁止 any，若需逃生請以 unknown + 縮窄。
* **Lint & Format**：ESLint（@antfu/eslint-config 或自管）、Prettier；CI 必跑 lint、typecheck、test。
* **Style 統一**：TailwindCSS 為基本樣式層；禁止在 .vue 內大段手寫 SCSS（除非封裝 tokens 或 utilities）。
* **A11y 優先**：語義化、鍵盤可用、對比合格（WCAG AA）、ARIA 合理（少即是多）。
* **測試性**：UI 互動需可由 Playwright/Testing Library 驗證；為關鍵節點加上 data-testid。

===

## 2. 檔案與命名

* **components/**：`BaseXxx.vue`（原子）、`AppXxx.vue`（專案級復用）、`FeatureXxx.vue`（領域功能）。
* **composables/**：`useXxx.ts`（單一職責，命名以動詞開頭）。
* **utils/**：純函式工具；DOM 相關請入 `utils/dom.ts`，網路相關 `utils/http.ts`。
* **styles/**：`tokens.css`（CSS variables）、`typography.css`、`utilities.css`。
* **assets/**：圖片與圖示（優先 SVG）。
* **命名規則**：kebab-case（檔名 / className）、camelCase（變數 / 函式）、PascalCase（元件 / 型別）。

===

## 3. 元件設計

* **單一責任**：每個元件只關心一件事；跨頁共享邏輯移入 composables。
* **Props 最小化**：避免多態 props；複雜視圖應拆分為多個子元件。
* **事件命名**：`update:modelValue` / `onXxx`（emit）。
* **插槽策略**：必要時提供 `#prefix`、`#suffix`、`#icon`、`#actions`，避免過度可配置導致 API 爆炸。
* **樣式隔離**：避免深層 selector；使用`:where([data-variant="..." ])` 控制外觀。
* **可測試性**：暴露最小的 DOM 標籤（`data-testid` 僅在測試下使用條件加載）。

===

## 4. 狀態與資料流

* 首選 Composition API + Pinia（必要時）。
* **全域狀態慎用**：偏好 props/emit 或 provide/inject；Pinia 只放「跨頁共享且持久化」的資料。
* **非同步請求**：以 `useQuery`（自行封裝）模式管理 loading/error/data；避免在同一元件內多處重複 fetch。
* **不可變更新**：避免直接 mutate 深層物件；以淺拷貝或 `structuredClone`。

===

## 5. 型別與 API 契約

* **後端契約**：以 Zod / Valibot 定義 schema，建立 `@/types/api.ts` 與 `@/types/entities.ts`。
* **輸入輸出**：對外輸出型別為 `Readonly<...>`；內部狀態以 `DeepReadonly` 管控。
** **錯誤物件**：建立 `AppError`（擴充 name/code/context），專案統一 throw/catch。

===

## 6. 網路與快取

* **HTTP client**：統一封裝於 `utils/http.ts`（fetch + retry/exponential backoff + timeout + abort）。
* **快取**：以 `stale-while-revalidate`（SWR）思路；以 IndexedDB 或 localStorage 降級；資料需有 `version`。
* **錯誤處理**：4xx（業務），5xx（系統）；提供 `retryAfter` 提示；上報到 Sentry。

===

## 7. 可及性（a11y）

* **語義標籤**：優先 `<button>`、`<nav>`、`<header>`、`<main>`、`<section>`、`<footer>`。
* **鍵盤**：`Tab` 次序正確；焦點可見（`focus:ring-2 ring-offset-2`）。
* **可朗讀**：提供 `aria-label` / `aria-labelledby`，避免冗餘 ARIA。
* **對比度**：字體/背景符合 AA；圖表附文字說明或 `sr-only` 註解。
* **動態效果**：尊重 `prefers-reduced-motion`，並提供 `data-reduced` 降級。

===

## 8. 效能與資產

* **拆分**：路由/元件層 lazy load；第三方庫以 `import()`。
* **資產**：圖片優先 AVIF/WEBP；SVG inline（可控制 fill/stroke）；`nuxt/image`。
* **JS 預算**：官網首屏 ≤ 180KB（gzip）；追蹤 bundlesize（rollup‑plugin‑visualizer）。
* **CSS**：Tailwind JIT；移除未使用 class（`content` 指向正確）。
* **Animation**：避免 layout thrashing；`will-change` 審慎使用；用 transform/opacity。

===

## 9. 國際化（i18n）

* **字串**：禁止硬碼；使用 `i18n.t('key')` 或 content 驅動。
* **格式**：日期、數字、貨幣以 `Intl.*`。
* **方向**：考慮 RTL（若有中東市場需求）。

===

## 10. 測試策略

* **單元測試**：Vitest + Testing Library；語句/分支/函式/行 ≥ 80%。
* **端對端**：Playwright；關鍵流程（登入/註冊/建立工作流/觸發 webhook）。
* **視覺回歸（可選）**：`@playwright/test` 截圖比對。
* **覆蓋報告**：CI 產生 HTML 報告（artifact 保留 14 天）。

===

## 11. 例外與降級

* **SSG/SSR**：任何 `window/document` 僅在 `process.client` 或 `onMounted`。
* **降級策略**：動畫/懸浮效果在低配裝置停用或簡化。
* **第三方失效**：提供 `fallback UI` 與重試提示。

===

## 12. PR 與文件

* **PR 模板**：需求背景、設計決策、風險與風險緩解、效能/可及性影響、截圖/GIF、待辦清單。
* **Changelog**：遵循 Conventional Commits；版本管理以 Changeset。
* **Docs**：以 `@nuxt/content` 生成開發文件；範例代碼需要 `// region <title> ... // endregion` 摘錄。

===

## 13. 動畫與互動（修正 rev B‑hotfix）

* **動畫函式庫**：允許多動畫庫並存（GSAP、AnimeJS、Lenis、Locomotive Scroll 等）——但必須以 **adapter** 封裝於 `plugins/anim/**` 或 `composables/useMotion*.ts`，且提供 **no‑JS fallback** 與 `prefers-reduced-motion` 降級。
* **PR 要求**：必附選型理由、可移除/替代方案、載入時機與 Lighthouse 影響截圖。

===

## 14. 範例片段

```ts
// utils/http.ts
export async function http<T>(input: RequestInfo, init: RequestInit & { timeout?: number } = {}): Promise<T> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), init.timeout ?? 12000)
  try {
    const res = await fetch(input, { ...init, signal: controller.signal, headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) } })
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw Object.assign(new Error('HTTP Error'), { name: 'HttpError', code: res.status, context: { text } })
    }
    return res.json() as Promise<T>
  } finally {
    clearTimeout(id)
  }
}
```

```ts
// composables/useQuery.ts
import { ref, onMounted } from 'vue'
export function useQuery<T>(key: string, fetcher: () => Promise<T>) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)
  const loading = ref<boolean>(false)
  onMounted(async () => {
    loading.value = true
    try {
      data.value = await fetcher()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })
  return { data, error, loading }
}
```

```ts
// components/hero/useHeroAnim.ts
import { gsap } from 'gsap'
export function useHeroAnim(el: HTMLElement) {
  const tl = gsap.timeline({ paused: true })
  tl.fromTo(el.querySelector('[data-hero-title]'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .36 })
  tl.fromTo(el.querySelectorAll('[data-hero-sub]'), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .28, stagger: .06 }, '<.1')
  return tl
}
```

============================

# END OF CODE QUALITY STANDARDS (rev B)

============================
