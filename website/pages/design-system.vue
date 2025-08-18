<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- 頁面標題 -->
    <div class="bg-white border-b border-neutral-200">
      <div class="container-custom py-8">
        <h1 class="text-4xl font-bold text-neutral-900 mb-2">TW_Zapier 設計系統</h1>
        <p class="text-lg text-neutral-600">台灣在地化流程自動化平台的設計規範與組件庫</p>
      </div>
    </div>

    <div class="container-custom py-12">
      <!-- 色彩系統 -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-8">色彩系統</h2>
        
        <!-- 主色調 -->
        <div class="mb-8">
          <h3 class="text-xl font-medium mb-4">主色調 (Primary)</h3>
          <div class="grid grid-cols-5 md:grid-cols-10 gap-2">
            <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]" :key="shade" 
                 :class="`bg-primary-${shade}`" 
                 class="h-16 rounded-lg flex items-end p-2">
              <span :class="shade >= 500 ? 'text-white' : 'text-neutral-900'" class="text-xs font-mono">
                {{ shade }}
              </span>
            </div>
          </div>
        </div>

        <!-- 輔助色 -->
        <div class="mb-8">
          <h3 class="text-xl font-medium mb-4">輔助色 (Accent)</h3>
          <div class="grid grid-cols-3 md:grid-cols-9 gap-4">
            <div v-for="color in accentColors" :key="color.name" class="text-center">
              <div :style="`background-color: ${color.value}`" class="h-16 rounded-lg mb-2"></div>
              <span class="text-sm font-medium">{{ color.name }}</span>
              <div class="text-xs text-neutral-500 font-mono">{{ color.value }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 按鈕系統 -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-8">按鈕系統</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <!-- 按鈕樣式 -->
          <div>
            <h3 class="text-xl font-medium mb-4">按鈕樣式</h3>
            <div class="space-y-4">
              <div class="flex flex-wrap gap-4">
                <button class="btn-primary">主要按鈕</button>
                <button class="btn-secondary">次要按鈕</button>
                <button class="btn-outline">輪廓按鈕</button>
              </div>
              <div class="flex flex-wrap gap-4">
                <button class="btn-danger">危險按鈕</button>
                <button class="btn-success">成功按鈕</button>
                <button class="btn-primary btn-disabled">禁用按鈕</button>
              </div>
            </div>
          </div>

          <!-- 按鈕尺寸 -->
          <div>
            <h3 class="text-xl font-medium mb-4">按鈕尺寸</h3>
            <div class="space-y-4">
              <div class="flex flex-wrap items-center gap-4">
                <button class="btn-primary btn-sm">小按鈕</button>
                <button class="btn-primary">標準按鈕</button>
                <button class="btn-primary btn-lg">大按鈕</button>
                <button class="btn-primary btn-xl">超大按鈕</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 卡片系統 -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-8">卡片系統</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="card">
            <h3 class="text-lg font-semibold mb-2">基礎卡片</h3>
            <p class="text-neutral-600">這是一個基礎的卡片組件，具有標準的陰影和邊框。</p>
          </div>
          
          <div class="card card-elevated">
            <h3 class="text-lg font-semibold mb-2">提升卡片</h3>
            <p class="text-neutral-600">這是一個具有更強陰影效果的卡片組件。</p>
          </div>
          
          <div class="card card-interactive">
            <h3 class="text-lg font-semibold mb-2">互動卡片</h3>
            <p class="text-neutral-600">這是一個可互動的卡片，懸停時會有縮放效果。</p>
          </div>
        </div>
      </section>

      <!-- 字體系統 -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-8">字體系統</h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-medium mb-4">標題階層</h3>
            <div class="space-y-2">
              <h1 class="text-6xl font-bold">H1 標題 - 超大標題</h1>
              <h2 class="text-5xl font-bold">H2 標題 - 大標題</h2>
              <h3 class="text-4xl font-semibold">H3 標題 - 中標題</h3>
              <h4 class="text-3xl font-semibold">H4 標題 - 小標題</h4>
              <h5 class="text-2xl font-medium">H5 標題 - 次標題</h5>
              <h6 class="text-xl font-medium">H6 標題 - 最小標題</h6>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-medium mb-4">文字樣式</h3>
            <div class="space-y-2">
              <p class="text-lg">大段落文字 - 適用於重要內容</p>
              <p class="text-base">標準段落文字 - 適用於一般內容</p>
              <p class="text-sm">小段落文字 - 適用於說明文字</p>
              <p class="text-xs">極小文字 - 適用於標籤和註釋</p>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-medium mb-4">文字效果</h3>
            <div class="space-y-2">
              <p class="text-gradient text-2xl font-bold">漸層文字效果</p>
              <p class="text-gradient-warm text-2xl font-bold">溫暖漸層文字</p>
              <p class="text-primary-600 font-semibold">主色調文字</p>
              <p class="text-accent-red font-medium">強調色文字</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 輸入框系統 -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-8">輸入框系統</h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">標準輸入框</label>
              <input type="text" class="input-base" placeholder="請輸入內容...">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">錯誤狀態</label>
              <input type="text" class="input-base input-error" placeholder="錯誤狀態輸入框">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">成功狀態</label>
              <input type="text" class="input-base input-success" placeholder="成功狀態輸入框">
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">文字區域</label>
              <textarea class="input-base h-32" placeholder="請輸入多行內容..."></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- 背景系統 -->
      <section class="mb-16">
        <h2 class="text-3xl font-semibold mb-8">背景系統</h2>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="gradient-bg text-white p-8 rounded-xl">
            <h3 class="text-xl font-semibold mb-2">主漸層背景</h3>
            <p>適用於主要區塊和 CTA 區域</p>
          </div>
          
          <div class="gradient-bg-warm text-white p-8 rounded-xl">
            <h3 class="text-xl font-semibold mb-2">溫暖漸層</h3>
            <p>適用於友善和溫馨的內容區域</p>
          </div>
          
          <div class="gradient-bg-cool text-white p-8 rounded-xl">
            <h3 class="text-xl font-semibold mb-2">冷色漸層</h3>
            <p>適用於專業和技術性內容</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// 設定頁面 meta
useHead({
  title: 'TW_Zapier 設計系統',
  meta: [
    { name: 'description', content: 'TW_Zapier 設計系統展示頁面' }
  ]
})

// 輔助色數據
const accentColors = [
  { name: 'Red', value: '#C2474A' },
  { name: 'Orange', value: '#C07F56' },
  { name: 'Crimson', value: '#C23928' },
  { name: 'Tan', value: '#D19872' },
  { name: 'Pink', value: '#EC7687' },
  { name: 'Brown', value: '#662D10' },
  { name: 'Olive', value: '#644F29' },
  { name: 'Gray', value: '#6C604D' },
  { name: 'Amber', value: '#A86F4B' }
]
</script>
