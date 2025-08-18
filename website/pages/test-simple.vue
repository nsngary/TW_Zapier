<template>
  <div>
    <!-- 使用簡化版的 Header Navigation -->
    <HeaderNavigationSimple />
    
    <!-- 測試內容 -->
    <main class="min-h-screen bg-neutral-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-neutral-900 mb-8">
            簡化版 Header Navigation 測試
          </h1>
          
          <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-semibold text-neutral-900 mb-4">測試項目</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-neutral-900">✅ 基本功能測試</h3>
                <ul class="space-y-2 text-neutral-600">
                  <li>• 點擊「產品功能」下拉選單</li>
                  <li>• 點擊「解決方案」下拉選單</li>
                  <li>• 點擊「資源中心」下拉選單</li>
                  <li>• 檢查下拉選單寬度對齊</li>
                </ul>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-lg font-medium text-neutral-900">🎯 視覺效果測試</h3>
                <ul class="space-y-2 text-neutral-600">
                  <li>• 懸停時 h5 標籤變色為 #86735E</li>
                  <li>• 箭頭旋轉動畫效果</li>
                  <li>• 下拉選單滑動動畫</li>
                  <li>• 響應式設計適配</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 class="text-lg font-medium text-blue-900 mb-2">
              🔍 與 Zapier 官方對比
            </h3>
            <p class="text-blue-700">
              這個簡化版本基於 Zapier 官方的 HTML 結構實現，使用 details/summary 標籤替代 CSS hover，
              提供更穩定的交互體驗和更好的無障礙支援。
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 測試頁面配置
useHead({
  title: '簡化版 Header Navigation 測試 - TW Zapier',
  meta: [
    { name: 'description', content: '測試基於 Zapier 官方結構的簡化版 Header Navigation 組件' }
  ]
})
</script>
