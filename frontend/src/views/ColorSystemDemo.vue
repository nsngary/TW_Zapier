<template>
  <div class="color-system-demo">
    <div class="demo-header">
      <h1>TW Zapier 統一設計系統配色展示</h1>
      <p>展示前端 workflow 工作區與 website 統一後的配色方案</p>
    </div>

    <!-- 主要顏色 -->
    <section class="color-section">
      <h2>主要顏色 (Primary Colors)</h2>
      <div class="color-grid">
        <div class="color-card primary-50">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Primary 50</div>
            <div class="color-value">#f7f5f3</div>
          </div>
        </div>
        <div class="color-card primary-500">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Primary 500</div>
            <div class="color-value">#86735E</div>
          </div>
        </div>
        <div class="color-card primary-600">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Primary 600</div>
            <div class="color-value">#7a6654</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 強調色 -->
    <section class="color-section">
      <h2>強調色 (Accent Colors)</h2>
      <div class="color-grid">
        <div class="color-card accent-orange">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Accent Orange</div>
            <div class="color-value">#C07F56</div>
          </div>
        </div>
        <div class="color-card accent-red">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Accent Red</div>
            <div class="color-value">#C2474A</div>
          </div>
        </div>
        <div class="color-card accent-tan">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Accent Tan</div>
            <div class="color-value">#D19872</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 中性色 -->
    <section class="color-section">
      <h2>中性色 (Neutral Colors)</h2>
      <div class="color-grid">
        <div class="color-card neutral-50">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Neutral 50</div>
            <div class="color-value">#fafaf9</div>
          </div>
        </div>
        <div class="color-card neutral-200">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Neutral 200</div>
            <div class="color-value">#e7e5e4</div>
          </div>
        </div>
        <div class="color-card neutral-600">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Neutral 600</div>
            <div class="color-value">#57534e</div>
          </div>
        </div>
        <div class="color-card neutral-800">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Neutral 800</div>
            <div class="color-value">#292524</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能色 -->
    <section class="color-section">
      <h2>功能色 (Semantic Colors)</h2>
      <div class="color-grid">
        <div class="color-card success">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Success</div>
            <div class="color-value">#667539</div>
          </div>
        </div>
        <div class="color-card warning">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Warning</div>
            <div class="color-value">#B89C5C</div>
          </div>
        </div>
        <div class="color-card error">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Error</div>
            <div class="color-value">#981207</div>
          </div>
        </div>
        <div class="color-card info">
          <div class="color-swatch"></div>
          <div class="color-info">
            <div class="color-name">Info</div>
            <div class="color-value">#5ba5c5ff</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 按鈕展示 -->
    <section class="demo-section">
      <h2>按鈕樣式展示</h2>
      <div class="button-demo">
        <el-button type="primary">主要按鈕</el-button>
        <el-button type="success">成功按鈕</el-button>
        <el-button type="warning">警告按鈕</el-button>
        <el-button type="danger">危險按鈕</el-button>
        <el-button type="info">資訊按鈕</el-button>
      </div>
    </section>

    <!-- 工作流編輯器預覽 -->
    <section class="demo-section">
      <h2>工作流編輯器配色預覽</h2>
      <div class="workflow-preview">
        <div class="mock-toolbar">
          <div class="toolbar-title">工作流編輯器</div>
          <div class="toolbar-actions">
            <el-button size="small" type="primary">儲存</el-button>
            <el-button size="small" type="success">執行</el-button>
          </div>
        </div>
        <div class="mock-editor">
          <div class="mock-palette">
            <div class="palette-title">節點面板</div>
            <div class="mock-node-item">
              <div class="node-icon primary"></div>
              <span>觸發節點</span>
            </div>
            <div class="mock-node-item">
              <div class="node-icon accent"></div>
              <span>Line Pay</span>
            </div>
            <div class="mock-node-item">
              <div class="node-icon warning"></div>
              <span>EC Pay</span>
            </div>
          </div>
          <div class="mock-canvas">
            <div class="canvas-bg">工作流畫布區域</div>
          </div>
          <div class="mock-properties">
            <div class="properties-title">屬性面板</div>
            <div class="mock-property">
              <label>節點名稱</label>
              <div class="mock-input"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 配色展示頁面
</script>

<style scoped>
.color-system-demo {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--bg-color);
  min-height: 100vh;
}

.demo-header {
  text-align: center;
  margin-bottom: 48px;
}

.demo-header h1 {
  color: var(--text-color);
  font-size: 2rem;
  margin-bottom: 12px;
}

.demo-header p {
  color: var(--text-color-secondary);
  font-size: 1.1rem;
}

.color-section {
  margin-bottom: 48px;
}

.color-section h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 8px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.color-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.color-swatch {
  width: 100%;
  height: 80px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.color-info {
  text-align: center;
}

.color-name {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.color-value {
  font-family: monospace;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

/* 顏色樣式 */
.primary-50 .color-swatch { background: #f7f5f3; }
.primary-500 .color-swatch { background: #86735E; }
.primary-600 .color-swatch { background: #7a6654; }
.accent-orange .color-swatch { background: #C07F56; }
.accent-red .color-swatch { background: #C2474A; }
.accent-tan .color-swatch { background: #D19872; }
.neutral-50 .color-swatch { background: #fafaf9; }
.neutral-200 .color-swatch { background: #e7e5e4; }
.neutral-600 .color-swatch { background: #57534e; }
.neutral-800 .color-swatch { background: #292524; }
.success .color-swatch { background: #667539; }
.warning .color-swatch { background: #B89C5C; }
.error .color-swatch { background: #981207; }
.info .color-swatch { background: #5ba5c5ff; }

.demo-section {
  margin-bottom: 48px;
}

.demo-section h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 8px;
}

.button-demo {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.workflow-preview {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-color-secondary);
}

.mock-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color-light);
}

.toolbar-title {
  font-weight: 600;
  color: var(--text-color);
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.mock-editor {
  display: flex;
  height: 400px;
}

.mock-palette {
  width: 200px;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color-light);
  padding: 16px;
}

.palette-title {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.mock-node-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: var(--bg-color-tertiary);
  font-size: 0.9rem;
  color: var(--text-color);
}

.node-icon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.node-icon.primary { background: var(--color-primary); }
.node-icon.accent { background: var(--color-accent-orange); }
.node-icon.warning { background: var(--color-warning); }

.mock-canvas {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color-secondary);
}

.canvas-bg {
  color: var(--text-color-tertiary);
  font-size: 1.2rem;
}

.mock-properties {
  width: 200px;
  background: var(--bg-color);
  border-left: 1px solid var(--border-color-light);
  padding: 16px;
}

.properties-title {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 16px;
}

.mock-property {
  margin-bottom: 12px;
}

.mock-property label {
  display: block;
  font-size: 0.9rem;
  color: var(--text-color);
  margin-bottom: 4px;
}

.mock-input {
  height: 32px;
  background: var(--bg-color-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
</style>
