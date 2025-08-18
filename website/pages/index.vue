<template>
  <div class="homepage">
    <!-- 11-section main structure -->
    <main class="site-main">
      <!-- 1. Mega Intro（Hero + Product Tabs + Templates + Trusted） -->
      <MegaIntro />

      <!-- 2. Customer Stories -->
      <CustomerStories />

      <!-- 3. Scale AI the easy way -->
      <ScaleAI />

      <!-- 4. Feedback / Read story -->
      <FeedbackStrip />

      <!-- 5. Explore Zapier's AI tools -->
      <ExploreAITools />

      <!-- 6. AI use cases -->
      <AIUseCases />

      <!-- 7. AI + automation -->
      <AIPlusAutomation />

      <!-- 8. Move fast, stay in control -->
      <MoveFast />

      <!-- 9. Want AI automation IT and innovators agree on? -->
      <BeforeAfter />

      <!-- 10. Security -->
      <SecuritySection />

      <!-- 11. Enterprise CTA -->
      <EnterpriseCTA />
    </main>
  </div>
</template>

<script setup lang="ts">
// 首頁邏輯
// 所有功能已模組化至各個 section 組件中
</script>

<style scoped>
/* 首頁樣式 */
.homepage {
  min-height: 100vh;
}

.site-main {
  width: 100%;
}
</style>