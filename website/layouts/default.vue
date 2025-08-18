<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header 導航 -->
    <HeaderNavigation />
    
    <!-- 主要內容區域 -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer 頁腳 -->
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
// Nuxt 3 自動導入組件，無需手動 import
</script>
