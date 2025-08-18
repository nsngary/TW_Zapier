<template>
  <div>
    <HeaderNavigationTest />
    <main class="min-h-screen bg-gray-50 pt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-center text-neutral-900 mb-8">
          Header Navigation 測試頁面
        </h1>
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-semibold mb-4">測試項目：</h2>
          <ul class="space-y-2 text-neutral-700">
            <li>✅ 下拉選單寬度對齊修復</li>
            <li>✅ 懸停效果修復</li>
            <li>✅ 位置偏移修復</li>
            <li>✅ 響應式設計</li>
          </ul>
          
          <div class="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 class="font-semibold text-blue-900 mb-2">測試說明：</h3>
            <p class="text-blue-800">
              請懸停在上方導航選單的「產品功能」、「解決方案」、「資源中心」來測試下拉選單的顯示效果。
              檢查寬度對齊、位置偏移和懸停效果是否正常工作。
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 測試頁面的 meta 設定
useHead({
  title: 'Header Navigation 測試 - TW_Zapier',
  meta: [
    { name: 'description', content: '測試 Header Navigation 組件的下拉選單功能' }
  ]
})
</script>
