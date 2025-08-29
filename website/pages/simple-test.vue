<template>
  <div>
    <h1 class="text-3xl font-bold p-8">簡單測試頁面</h1>
    <p class="p-8">這是一個簡單的測試頁面，用來驗證 Nuxt 和 Tailwind 是否正常運作。</p>
    
    <div class="p-8 space-y-4">
      <div class="bg-blue-100 p-4 rounded">
        <h2 class="text-xl font-semibold">Tailwind CSS 測試</h2>
        <p>如果您看到這個藍色背景，表示 Tailwind CSS 正常運作。</p>
      </div>
      
      <div class="bg-green-100 p-4 rounded">
        <h2 class="text-xl font-semibold">自訂顏色測試</h2>
        <div class="bg-primary-500 text-white p-2 rounded">主色調測試</div>
        <div class="bg-header-bg border border-header-border p-2 rounded mt-2">Header 背景色測試</div>
      </div>
      
      <div class="bg-yellow-100 p-4 rounded">
        <h2 class="text-xl font-semibold">動畫測試</h2>
        <div class="transition-all duration-250 hover:bg-yellow-200 p-2 rounded cursor-pointer">
          滑鼠懸停測試 (duration-250)
        </div>
      </div>
      
      <div class="bg-purple-100 p-4 rounded">
        <h2 class="text-xl font-semibold">響應式測試</h2>
        <div class="block desktop:hidden">手機版顯示 (< 1071px)</div>
        <div class="hidden desktop:block">桌面版顯示 (>= 1071px)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: '簡單測試頁面 - TW_Zapier',
  meta: [
    { name: 'description', content: '測試 Nuxt 和 Tailwind CSS 基本功能' }
  ]
})
</script>
