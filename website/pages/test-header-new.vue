<template>
  <div>
    <HeaderNavigationNew />
    <main id="main" class="p-8">
      <h1 class="text-3xl font-bold mb-4">測試重構後的 Header Navigation</h1>
      <p class="text-lg mb-4">這個頁面用於測試重構後的 HeaderNavigationNew.vue 組件。</p>
      
      <div class="space-y-4">
        <div class="p-4 bg-blue-50 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">測試項目：</h2>
          <ul class="list-disc list-inside space-y-1">
            <li>Logo 顯示正確</li>
            <li>桌面版導航選單</li>
            <li>下拉選單功能</li>
            <li>響應式設計</li>
            <li>手機版導航</li>
            <li>鍵盤導航支援</li>
          </ul>
        </div>
        
        <div class="p-4 bg-green-50 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">預期行為：</h2>
          <ul class="list-disc list-inside space-y-1">
            <li>點擊下拉選單應該顯示內容</li>
            <li>點擊其他下拉選單應該關閉當前開啟的選單</li>
            <li>點擊外部區域應該關閉所有下拉選單</li>
            <li>按 ESC 鍵應該關閉所有下拉選單</li>
            <li>在小螢幕上應該顯示漢堡選單</li>
          </ul>
        </div>
        
        <div class="p-4 bg-yellow-50 rounded-lg">
          <h2 class="text-xl font-semibold mb-2">當前狀態：</h2>
          <p>基礎結構已完成，正在添加下拉選單內容和樣式。</p>
        </div>
      </div>
      
      <!-- 測試內容區域 -->
      <div class="mt-8 space-y-4">
        <h2 class="text-2xl font-bold">測試內容</h2>
        <p>這裡是一些測試內容，用於確保頁面滾動和其他功能正常運作。</p>
        
        <div v-for="i in 10" :key="i" class="p-4 bg-gray-100 rounded">
          <h3 class="font-semibold">測試區塊 {{ i }}</h3>
          <p>這是第 {{ i }} 個測試區塊的內容。用於測試頁面滾動和導航固定位置。</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import HeaderNavigationNew from '~/components/layout/HeaderNavigationNew.vue'

// 設置頁面標題
useHead({
  title: '測試重構後的 Header Navigation - TW_Zapier',
  meta: [
    { name: 'description', content: '測試重構後的 HeaderNavigationNew.vue 組件功能和樣式' }
  ]
})
</script>

<style scoped>
/* 確保主內容不被固定的 header 遮擋 */
main {
  padding-top: 2rem;
}
</style>
