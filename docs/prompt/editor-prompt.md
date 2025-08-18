====================

# TW_Zapier – Editor 開發輔助 Prompt / Editor Dev Assist Prompt（rev A）

====================

> 適用範圍：`frontend/`（Vue 3 + Vite + Element Plus + Pinia + Vue Flow）。
> 目標：讓 Augment 依「**最小風險變更** + **可驗證輸出**」協助我們迭代 **工作流程編輯器（Editor）**。

=====

## 0. 任務啟動宣告（強制）

每次在 PR / Issue / 任務卡片啟動 Editor 開發時，請在描述開頭貼：

```md
📋 調用Prompt:
- docs/prompts/initial-project-core.md（專案核心）
- docs/prompts/code-quality-standards.md（程式碼品質 rev B）
- docs/prompts/frontend-auth-system.md（前端認證）
- docs/prompts/sqlalchemy-data-models.md（資料模型）
- docs/prompts/docker-dev-environment.md（Docker）
- docs/prompts/website-testing-validation.md（官網測試 rev B）
- docs/prompts/editor-testing-validation.md（Editor 測試 rev A）
- docs/prompts/editor-dev-augment-prompt.md（本檔）
```

=====

## 1. 專案上下文（你必須知道）

* **Editor 技術棧**：Vue 3 + Vite + TypeScript + Element Plus + Pinia + Vue Flow。
* **資料契約**：節點、邊與流程皆以 **UUID** 為主鍵，時間戳 **ISO-8601**；節點 `data` 持有 **可序列化 JSON**，且必備 `schemaVersion`。
* **連線樣式**：Vue Flow `connectionLineType = SmoothStep`（以 enum，非字串）。
* **狀態管理**：`stores/editorStore.ts`（或等價檔名）集中握有：畫布狀態、選取、歷史（undo/redo）、匯入/匯出。
* **國際化與在地化**：台灣場景優先；UI 文案採 zh-TW，允許英文 fallback。
* **動線原則**：所有互動皆需有鍵盤/螢幕閱讀器可達，遵守 `prefers-reduced-motion` 降級策略。

=====

## 2. 你的任務流程（Augment 必遵循）

1. **差異分析**：列出將變更的檔案與原因（1\~2 句/檔）。
2. **最小變更方案**：優先不破壞 public API；若需新模組，命名與路徑請依現有慣例。
3. **實作**：提供 **每個檔案** 的完整內容（非片段），格式：

   * `// FILE: <相對路徑>` 置頂
   * 接著是該檔完整程式碼（可新建/修改）。
4. **測試**：同步產出對應 **Vitest** 與 **Playwright** 測試（含 axe 可及性檢查）。
5. **驗收腳本**：在回覆末段提供 `pnpm` / `docker compose` 的最短驗收步驟與預期結果。

=====

## 3. 輸出格式規範（嚴格）

* 所有程式碼區塊使用三個反引號並標註語言：`ts`、`vue`、`json`、`bash`。
* 每個檔案以 `// FILE: <path>` 開頭；避免省略號與「略」。
* **禁止** 引入未列於 `package.json` 的依賴；若必須，引導以 **單獨 PR** 處理並附動機。
* **型別必嚴格**：不得使用 `any`；若不可避免，以 `TODO:` 註明緩解計畫。

=====

## 4. Editor 功能邊界（目前階段）

* 已有：拖拉節點、邊連線、節點 `data`（JSON）可編輯、工作區整體風格。
* 未有：工作流執行引擎、API 串接、節點 SDK、映射（mapping）與表達式引擎。
* 因此本階段目標：

  * A 穩固 **畫布核心**：選取/多選、對齊/吸附、縮放、撤銷/重做、群組/鎖定、快捷鍵。
  * B 建立 **資料契約** 與 **I/O 介面**：定義 Node/Edge/Workflow 型別、驗證器（Zod）、匯入/匯出。
  * C 打通 **假執行/模擬**：提供 step-by-step 模擬（無後端），可在右側面板檢視上一節點的 `payload`。

=====

## 5. 檔案/模組結構建議

```md
frontend/
  src/
    components/editor/
      Canvas.vue
      NodeCard.vue
      MiniMap.vue
    stores/
      editorStore.ts
      historyStore.ts
    types/
      workflow.ts        # Node/Edge/Port/Workflow 型別 + Zod schema
    lib/
      graph/runtime.mock.ts   # 本地模擬執行（純前端）
      graph/validation.ts     # 圖合法性、拓撲排序、孤島檢查
      io/importExport.ts      # JSON 匯入/匯出、schemaVersion 升級
      a11y/keyboard.ts        # 鍵盤捷徑、焦點管理
    tests/
      e2e/editor.spec.ts      # Playwright 互動 + axe 檢查
      unit/graph.spec.ts      # 拓撲排序、合法性單元測試
```

=====

## 6. 介面契約（最低集）

```ts
// FILE: src/types/workflow.ts
export type UUID = string;

export interface TWZPortDef {
  id: UUID;
  name: string;              // 顯示名
  schema: unknown;           // Zod schema（編譯後型別）
  optional?: boolean;
}

export interface TWZNodeData {
  schemaVersion: number;
  config: Record<string, unknown>; // 節點設定（表單值）
  meta?: Record<string, unknown>;   // UI 用註記
}

export interface TWZNode {
  id: UUID;
  type: string;              // e.g. http.request / logic.if / data.map
  label: string;
  position: { x: number; y: number };
  inputs: TWZPortDef[];
  outputs: TWZPortDef[];
  data: TWZNodeData;
}

export interface TWZEdge {
  id: UUID;
  source: UUID;              // node id
  target: UUID;              // node id
  sourceHandle?: string;     // port id
  targetHandle?: string;     // port id
}

export interface TWZWorkflow {
  id: UUID;
  name: string;
  version: number;
  nodes: TWZNode[];
  edges: TWZEdge[];
  createdAt: string;         // ISO-8601
  updatedAt: string;         // ISO-8601
}
```

=====

## 7. 任務樣板（Augment 回覆需照此）

> 將下列 `<TASK>` 替換為實際需求（例如：「新增群組/鎖定功能與鍵盤捷徑」）。

### 任務目標

* <TASK>

### 差異與方案

* 將修改：A 檔、B 檔；新增：C 檔（原因：……）

### 變更清單（檔案逐一給完整內容）

// FILE: src/.../Canvas.vue

```vue
<完整程式碼>
```

// FILE: src/.../editor.spec.ts

```ts
<完整程式碼>
```

### 驗收與測試

```bash
pnpm i
pnpm test
pnpm test:e2e   # 需自動開啟瀏覽器並跑 axe 檢查
```

**預期**：

* 互動錄製：可拖拉節點、群組/鎖定成功、快捷鍵運作；axe 無嚴重違規；Lighthouse A11y ≥ 90。

=====

## 8. 編碼與可及性規範（重點）

* **型別**：TS `strict`；禁止 `any`；Zod 於 I/O 邊界驗證。
* **可及性**：焦點可見、可鍵盤操作；對拖拉操作提供等效按鍵；支援 `prefers-reduced-motion`；ARIA 標示節點/群組/邊。
* **樣式**：Tailwind 為主；避免行內樣式；深淺色模式相容。
* **Vue Flow**：`connectionLineType` 使用 enum；自訂 handle id 與 port 對齊型別。
* **Undo/Redo**：所有改動寫入 `historyStore`；提供 time-travel 檢視。

=====

## 9. 模擬執行（前端）指引

* 提供 `lib/graph/runtime.mock.ts`：
* 以拓撲排序執行節點；
* 每步產出 `{ stepId, input, output, logs[] }`；
* 允許在節點設定中填寫「公式」（先占位，**不得在前端 eval**，以字串保存）。
* 右側面板可切換至「模擬模式」檢視每步輸入/輸出。

=====

## 10. 你需要主動詢問我的事項（若未提供）

* 目前 `src/` 的實際結構與檔名（若與建議不同）。
* 是否已有 `historyStore`、熱鍵清單、最小 L10n 機制。
* Node/Edge 的現行 JSON 例子（便於對齊 schema）。
* 是否先接 **n8n API** 還是先做 **前端模擬**（可並行）。

=====

## 11. 回覆語氣與限制

* 回覆請使用：**繁體中文**。
* 只產出必要變更；避免過度重構；所有新增檔案先放在建議路徑下。
* 若偵測到需要後端 API 或新依賴，請在回覆「最上方」提出風險與拆分計畫。

=====

## 12. 範例任務（示意）

> 範例：為 Editor 新增「群組/鎖定/對齊線」與快捷鍵，並提供 e2e 測試。

* 產出：`NodeCard.vue` 可被群組；`Canvas.vue` 支援框選→群組；`G`=群組、`U`=解鎖、`⌘G`=成組、`⌘⇧G`=解組；Playwright 跑通。
* 檔案：如 §5 結構；測試：`editor.spec.ts`。

=====

> **備註**：此 Prompt 僅針對「Editor（前端）」；關於執行引擎／後端請改用 `initial-project-core.md` 與未來的 `orchestrator-design.md`。

====================

# END OF PROMPT (rev A)

====================
