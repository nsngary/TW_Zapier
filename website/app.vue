<template>
  <div id="app" class="min-h-screen">
    <!-- 全域載入指示器 -->
    <div v-if="pending" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>
    
    <!-- 主要內容 -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// 設定頁面 meta
useHead({
  htmlAttrs: {
    lang: 'zh-TW'
  },
  meta: [
    { name: 'format-detection', content: 'telephone=no' }
  ]
})

// 全域載入狀態
const pending = ref(false)

// 路由變化時的載入狀態
const router = useRouter()
router.beforeEach(() => {
  pending.value = true
})
router.afterEach(() => {
  pending.value = false
})
</script>

<style>
/* 全域樣式已在 main.css 中定義 */
</style>
