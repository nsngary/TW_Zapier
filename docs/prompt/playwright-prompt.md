====================

# TW_Zapier – Playwright 模仿／分析／復刻 **通用提示詞**

====================

> 目的：給 Augment（含 Playwright MCP）一份**可自適應不同網站、不同動畫函式庫、不同目標動畫**的標準化指令腳本。填入最少必要資訊後，自動完成 **進站 → 互動觸發 → 動畫內省 → 滾動取樣 → 資源偵測 → 降級驗證 → 結果輸出 → 復刻碼生成**。
>
> 適用工具（至少其一）：`browser_navigate_Playwright` / `browser_snapshot_Playwright` / `browser_evaluate_Playwright`（若環境提供 `browser_click_*/waitForSelector_*/getText_*`，則優先使用；否則以 evaluate Fallback）。

---

## 0. 使用方式（使用者先提供的輸入）

把下列 **INPUT JSON** 填好後丟給 Augment；未填者用預設值與自動推斷。

```json
{
  "url": "<必填：目標網址>",
  "viewport": { "width": 1440, "height": 900 },
  "device": "Desktop",
  "locale": "zh-TW",
  "timezone": "Asia/Taipei",
  "colorScheme": "light",
  "reducedMotion": "no-preference",  
  "entry": {
    "delayMs": 0,                  
    "waitForSelectors": ["header, main, footer"],
    "click": { "selector": null, "text": null, "timeoutMs": 12000 }
  },
  "targets": [
    {
      "name": "main-animation",
      "selector": "<必填或留空由系統自動推測>",
      "altSelectors": [],
      "anchorSelector": "body",
      "group": true
    }
  ],
  "flows": [
    { "type": "scroll", "from": 0, "to": 4000, "step": 80, "pauseMs": 0 },
    { "type": "hover", "selector": null },
    { "type": "click", "selector": null, "waitFor": null },
    { "type": "back" }
  ],
  "capture": {
    "trace": true, "har": true,
    "screens": ["initial", "after-entry", "after-sampling", "reduced-motion"]
  },
  "output": {
    "slug": "site-anim",
    "analysisPath": "./analysis/{{slug}}.json",
    "rawJson": true,
    "generate": ["gsap", "css-keyframes", "waapi"],
    "reproPath": "./repro/{{slug}}.ts"
  }
}
```

> **填寫建議**：
>
> * **url**：必填。
> * **targets.selector**：若不確定，先留空；系統會以 `data-*`、語義角色、與關鍵字（`texture|noise|grid|dot|bg|hero|reveal|scroll`）自動推測候選。
> * **entry.click**：例如首屏需要點「DISCOVER」才能進主畫面：`{"selector":".button-circle-texture","text":"DISCOVER","timeoutMs":12000}`。
> * **flows.scroll**：`to` 可先給 4000～6000，系統將以文件高度裁切。

---

## 1. 工具箱（Playwright MCP 指令一覽）

> 你的環境若**沒有**下列某些工具，流程會自動改用 `browser_evaluate_Playwright` Fallback。

| 指令                                                | 用途                                                     |
| ------------------------------------------------- | ------------------------------------------------------ |
| `browser_navigate_Playwright "<url>"`             | 導航至網址，等待 `load`/`networkidle`（若無此行為則由腳本內自行 `waitFor`）。 |
| `browser_waitForSelector_Playwright "<selector>"` | 等待元素出現。若無 → 以 evaluate 的輪詢 Fallback。                   |
| `browser_snapshot_Playwright`                     | 截圖（全窗）。搭配 `scrollIntoView()` 精準鎖定。                     |
| `browser_evaluate_Playwright "(…script…)"`        | 在頁面上下文執行 JS；**核心動作、取樣、內省都靠它**。                         |
| `browser_click_Playwright "<selector>"`           | 點擊（若無 → evaluate: `querySelector(...).click()`）。       |
| `browser_getText_Playwright "<selector>"`         | 取元素文字（若無 → evaluate Fallback）。                         |
| `browser_type_Playwright "<selector>" "<text>"`   | 輸入文字（若無 → evaluate 派發 `input`/`change`）。               |
| `browser_scroll_Playwright "<x> <y>"`             | 捲動（若無 → `window.scrollTo`）。                            |

> **若支援 Context / Viewport / Emulation 指令**（不同環境可能命名不同，如 `browser_setViewport_*` / `browser_emulateDevice_*`），請先設置；否則用 evaluate 補救（不影響主要量測）。

---

## 2. 執行計畫（Augment 請依序執行）

### A. 進站與基線

1. `browser_navigate_Playwright "{{url}}"`
2. 若 `entry.delayMs > 0` → `browser_evaluate_Playwright`：`await new Promise(r=>setTimeout(r, entry.delayMs))`。
3. 若 `entry.click.selector` 存在 → 嘗試 `browser_click_Playwright`；失敗則 evaluate：

```js
(()=>new Promise(async r=>{const q=s=>document.querySelector(s);for(let i=0;i<60;i++){const el=q("{{entry.click.selector}}");if(el){el.click();break;}await new Promise(x=>setTimeout(x,200));}r('ok')}))()
```

4. 依 `entry.waitForSelectors[]` 逐一 `browser_waitForSelector_Playwright`（或 evaluate 輪詢）。

5. `browser_snapshot_Playwright`（儲存 `initial`）。

### B. 目標元素解析（自動推測 + 校準）

* 若 `targets[].selector` 未填：

* evaluate 搜索候選：`[data-*]` / aria / 以及 `.texture|.dot|.grid|.noise|.bg|.hero|.reveal` 關鍵字 class。
* 按 **面積/可視度/樣式變化**排序，挑前 N 個作為候選，寫回臨時清單。
* 對每個 target：`scrollIntoView({block:'center'})` → `browser_snapshot_Playwright`（記錄錨點畫面）。

### C. 動畫內省（CSS/WAAPI/GSAP/Intersection/MO）

以 `browser_evaluate_Playwright` 注入並回傳：

```js
(()=>{
  const waapi=(document.getAnimations?.()||[]).map(a=>{const t=a.effect?.getTiming?.()||{};const el=a.effect?.target;return {target:el?.id||el?.className||el?.tagName,duration:t.duration,delay:t.delay,easing:t.easing,dir:t.direction||'normal',fill:t.fill||null,iter:t.iterations||1,playRate:a.playbackRate}});
  let gsap=[];try{if(window.gsap?.globalTimeline){gsap=window.gsap.globalTimeline.getChildren(true,true,true).map(t=>({id:t.vars?.id||null,dur:t.duration(),ease:t.vars?.ease||null,stagger:t.vars?.stagger||null,scrollTrigger:!!t.vars?.scrollTrigger}))}}catch(e){}
  // Hook IntersectionObserver / MutationObserver 以記錄觸發點與動態 class 變化
  const iolog=[];const moLog=[];
  try{
    const IO=window.IntersectionObserver;window.IntersectionObserver=function(cb,opt){const inst=new IO((entries,obs)=>{entries.forEach(en=>iolog.push({t:performance.now(),isIntersecting:en.isIntersecting,ratio:en.intersectionRatio,sel:en.target?.className||en.target?.id})) ;cb(entries,obs)} ,opt);return inst}
  }catch(e){}
  try{
    const mo=new MutationObserver(ms=>{ms.forEach(m=>{if(m.type==='attributes'){moLog.push({t:performance.now(),attr:m.attributeName,sel:m.target?.className||m.target?.id,val:getComputedStyle(m.target)[m.attributeName]||null})}})});
    mo.observe(document.documentElement,{attributes:true,subtree:true});
  }catch(e){}
  window.__animProbe={waapi,gsap,iolog,moLog,samples:[]};
  return {waapi,gsap,hooked:true}
})()
```

### D. 滾動取樣（還原曲線）

針對 `targets` 逐格量測（transform/opacity/filter/mix-blend + rect + CSS 變數）：

```js
(()=>new Promise(async resolve=>{
  const T={{json targets or will be injected by runner}}; // 由執行器注入；或在頁面上以先前推測結果替代
  const props=['opacity','filter','mixBlendMode','transform','backgroundColor','backgroundImage'];
  const getVars=(el)=>{const s=getComputedStyle(el);const v={};for(let i=0;i<s.length;i++){const p=s[i];if(p.startsWith('--'))v[p]=s.getPropertyValue(p).trim()}return v};
  const doc=document.scrollingElement||document.documentElement;const H=Math.max(doc.scrollHeight,document.body.scrollHeight);
  const from={{flows.scroll.from||0}};const to=Math.min(H-1, {{flows.scroll.to||4000}});const step={{flows.scroll.step||80}};
  const out=[];for(let y=from;y<=to;y+=step){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>requestAnimationFrame(r));const t=performance.now();
    const sample=T.map((sel,idx)=>{const el=document.querySelector(sel);if(!el) return {i:idx,missing:true,sel}; const s=getComputedStyle(el);const r=el.getBoundingClientRect();const data={i:idx,sel,top:r.top,left:r.left,width:r.width,height:r.height};props.forEach(p=>data[p]=s[p]);data.cssVars=getVars(el);return data});
    out.push({y,t,sample})}
  if(window.__animProbe) window.__animProbe.samples=out; resolve({frames:out.length,targets:T.length})
}))()
```

> **flows** 其他步驟：若有 `hover/click/back`，分別以 `dispatchEvent('mouseover')` / `click()` / `history.back()` 觸發與等待。

### E. Reduced‑motion 降級驗證

```js
(() => { const s=document.createElement('style'); s.id='force-reduced-motion'; s.textContent='*{animation-duration:0.001ms!important;animation-iteration-count:1!important;transition-duration:0.001ms!important;scroll-behavior:auto!important;}'; document.head.appendChild(s); return 'reduced_motion_forced'; })()
```

`browser_snapshot_Playwright`（儲存 `reduced-motion` 畫面）→ 移除樣式：

```js
(() => { const s=document.getElementById('force-reduced-motion'); if(s) s.remove(); return 'reduced_motion_reset'; })()
```

### F. 外部資源偵測（動畫庫/字體/大檔）

```js
(()=>performance.getEntriesByType('resource')
  .filter(r=>/gsap|anime|lottie|webflow|three|scroll|lenis|locomotive/i.test(r.name))
  .map(r=>({name:r.name,type:r.initiatorType,duration:r.duration,transferSize:r.transferSize||null})))()
```

### G. 匯總輸出

```js
(()=>{
  const probe=window.__animProbe||{}; const info={
    ua:navigator.userAgent,
    viewport:{w:innerWidth,h:innerHeight},
    domCount:document.querySelectorAll('*').length,
    stylesheets:[...document.styleSheets].length,
  };
  return {info, probe}
})()
```

> 若同時啟用 Filesystem MCP：請將上述結果寫入 `output.analysisPath`；否則直接把 JSON 回傳對話。

---

## 3. 復刻碼生成規則（GSAP / CSS Keyframes / WAAPI）

> Augment 請根據 `probe.samples` 的 `y → transform/opacity` 變化，擬合曲線與觸發點，輸出 **三種版本**：(1) GSAP（含 `ScrollTrigger` 若需要）、(2) CSS `@keyframes` + `position-sticky`/`scroll-timeline`（若可行）、(3) 原生 WAAPI。

**共同規則**：

1. 若偵測到目標站使用 GSAP → 優先輸出 **GSAP 版本**；否則輸出 WAAPI 與 CSS 版本並行。
2. 產出時請：

   * 把取樣點正規化為 0–1 範圍（依視窗高度與滾動距離自動換算）。
   * 盡量保留原始 `easing`（WAAPI/GSAP 讀到者直接套用；讀不到則以 cubic-bezier 擬合）。
   * 提供 **Reduced Motion** 降級：改為一步到位或漸淡，移除繁複位移。
3. 請輸出：

   * `repro/{{slug}}.ts`（GSAP 或 WAAPI 初始化碼，TypeScript）
   * `repro/{{slug}}.css`（CSS keyframes 與掛載樣式）
   * README 片段：安裝、初始化步驟、用在 Nuxt 3 / Vue 3 的掛載示例。

> **GSAP 範例骨架（生成時請以量測結果自動替換）：**

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function mountTextureAnim(root: HTMLElement){
  const targets = root.querySelectorAll('[data-repro-target]')
  targets.forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: true }
    })
  })
}
```

> **CSS Keyframes 範例骨架（生成時自動帶入採樣關鍵幀）**

```css
@keyframes repro-fade-move { /* 採樣點自動插入 0%, 25%, 50%, 75%, 100% */ }
[data-repro-target]{ animation: repro-fade-move 1.2s both ease; }
@media (prefers-reduced-motion: reduce){ [data-repro-target]{ animation: none; opacity:1; transform:none; } }
```

> **WAAPI 範例骨架（生成時自動擬合 offsets/easing）**

```ts
export function mountWAAPI(el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions){
  return (el as HTMLElement).animate(keyframes, options)
}
```

---

## 4. 視覺回歸與驗證（可選但建議）

1. 以 `browser_snapshot_Playwright` 於關鍵節點截圖（`screens[]`）。
2. 若 Playwright MCP 支援斷言：`expect(page).toHaveScreenshot('hero.png',{maxDiffPixelRatio:0.001})`；否則僅保留金圖供人工比對。
3. 以 `Reduced‑motion` 再跑一輪（若 `capture.screens` 含 `reduced-motion`）。

---

## 5. Fallback 規則（請嚴格遵循）

* **沒有** `browser_click_/waitForSelector_/getText_` → 一律使用 `browser_evaluate_Playwright` + `querySelector()`/派發事件替代。
* `browser_snapshot_Playwright` 無 selector 版本 → 先 `scrollIntoView()` 再全窗截圖。
* 未偵測到 GSAP/WAAPI → 仍輸出 CSS keyframes 版本（以取樣值擬合）。
* 事件監聽 wrapper 只能抓「掛載後」的 listener；需要在進站初期就注入。

---

## 6. 產出物與檔案路徑（若 Filesystem MCP 可用）

* `analysisPath`：完整 JSON（內含 `probe`、`samples`、`resources`、`meta`）。
* `reproPath`：GSAP/WAAPI TypeScript 初始化檔。
* `repro/{{slug}}.css`：CSS keyframes 版本。
* `README-snippet.md`：如何接入 Nuxt 3 / Vue 3（`onMounted` 掛載、`client-only` 指令）。

若無 Filesystem MCP，請將所有檔案以**代碼區塊**形式回傳於對話。

---

## 7. 最小指令序（Augment 可直接展開為完整流程）

> Augment 請根據 INPUT 自動補全下列序列與腳本內容。

1. `browser_navigate_Playwright "{{url}}"`
2. `browser_evaluate_Playwright`（entry delay / click / waitFor 輪詢）
3. `browser_snapshot_Playwright` → `initial`
4. `browser_evaluate_Playwright`（自動推測/校準 targets）
5. `browser_snapshot_Playwright`（每個 target 就位截圖）
6. `browser_evaluate_Playwright`（動畫內省 hook）
7. `browser_evaluate_Playwright`（滾動取樣）
8. `browser_snapshot_Playwright` → `after-sampling`
9. `browser_evaluate_Playwright`（資源偵測 / 匯總輸出）
10. `browser_evaluate_Playwright`（Reduced‑motion 注入 → 截圖 → 移除）
11. **輸出** `analysisPath` JSON 與 **生成** GSAP / CSS / WAAPI 復刻碼（寫檔或直接回傳）

---

### 備註

* 所有腳本均需考慮 SPA 路由、Lazy 內容與 Webflow/Lenis/Locomotive 類滾動控制；取樣時請改用 `requestAnimationFrame` 保障準確性。
* 對於「點狀/噪聲/格紋」背景變色動畫，請特別記錄：`background-color`、`background-image`（含 `linear-gradient`/`radial-gradient`/自訂 CSS 變數）與 `mix-blend-mode`；若使用 CSS 變數控制色階，復刻碼需於根節點設置同名 `--vars` 並更新於滾動事件/ScrollTrigger 中。

====================

# END OF PROMPT

====================
