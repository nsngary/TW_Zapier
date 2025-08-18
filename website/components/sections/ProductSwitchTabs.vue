<template>
  <section id="product-features" class="product-switch section-padding bg-white" role="region" aria-labelledby="features-heading">
    <div class="container-custom">
      <div class="text-center mb-12">
        <h2 id="features-heading" class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          為台灣企業量身打造的自動化解決方案
        </h2>
        <p class="text-xl text-neutral-600 max-w-4xl mx-auto">
          深度整合本土服務，從金流處理到政府資料串接，讓您的業務流程更加智能高效
        </p>
      </div>

      <div class="flex flex-wrap justify-center mb-8 border-b border-neutral-200" role="tablist" aria-label="功能切換">
        <button v-for="tab in tabs" :key="tab.id"
                class="px-6 py-4 text-lg font-medium border-b-2 transition-all duration-200"
                :class="activeId===tab.id? 'border-primary-500 text-primary-600' : 'border-transparent text-neutral-600 hover:text-primary-600'"
                role="tab"
                :aria-selected="activeId===tab.id"
                :aria-controls="`${tab.id}-panel`"
                @click="activeId=tab.id">
          {{ tab.label }}
        </button>
      </div>

      <div class="mt-8">
        <!-- AI 工作流程（示例） -->
        <div v-if="activeId==='workflows'" :id="'workflows-panel'" class="grid lg:grid-cols-2 gap-10 items-center" role="tabpanel">
          <div class="space-y-6">
            <h3 class="text-3xl font-bold text-neutral-900">拖拉即用的 AI 工作流程建構器</h3>
            <p class="text-lg text-neutral-600">無需程式設計，透過視覺化介面建立複雜自動化流程。</p>
            <ul class="space-y-3">
              <li class="flex items-start gap-3" v-for="f in features" :key="f">
                <svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                <span class="text-neutral-700">{{ f }}</span>
              </li>
            </ul>
            <div class="flex gap-4 pt-2">
              <BaseButton variant="primary" size="lg">開始建立工作流程</BaseButton>
              <BaseButton variant="outline" size="lg">查看範本庫</BaseButton>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-primary-50 to-accent-tan/10 rounded-2xl p-8 shadow-xl">
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-primary-500 rounded-lg grid place-items-center text-white">✉️</div>
                  <div class="flex-1 h-2 bg-primary-200 rounded-full"><div class="h-full w-3/4 bg-primary-500 rounded-full"/></div>
                  <div class="w-12 h-12 bg-accent-red rounded-lg grid place-items-center text-white">📅</div>
                </div>
                <div class="text-center text-sm text-neutral-600">電子郵件 → 資料處理 → 行事曆排程</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16" :id="`${activeId}-panel`" role="tabpanel">
          <h3 class="text-2xl font-bold text-neutral-900 mb-3">{{ currentTab?.label }}</h3>
          <p class="text-neutral-600">內容開發中…</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Tab { id: string; label: string }
const tabs: Tab[] = [
  { id: 'workflows', label: 'AI 工作流程' },
  { id: 'integrations', label: '台灣整合服務' },
  { id: 'automation', label: '智能自動化' },
  { id: 'analytics', label: '數據分析' },
]
const activeId = ref<Tab['id']>('workflows')
const currentTab = computed(() => tabs.find(t => t.id === activeId.value))
const features = [
  '支援 500+ 台灣常用應用程式整合',
  'AI 智能建議最佳化流程設計',
  '即時監控與錯誤處理機制',
]
</script>

<style scoped>
/* ARIA 與 Reduced Motion 降級 */
@media (prefers-reduced-motion: reduce) {
  .section-padding * { transition: none !important; animation: none !important; }
}
</style>

