<template>
  <section class="before-after section-padding bg-neutral-50" role="region" aria-labelledby="before-after-heading">
    <div class="container-custom">
      <header class="text-center max-w-3xl mx-auto mb-8">
        <h2 id="before-after-heading" class="text-3xl md:text-5xl font-bold text-neutral-900">想要 IT 與創新團隊都點頭的 AI 自動化嗎？</h2>
        <p class="mt-3 text-neutral-700">你有兩種選擇。</p>
      </header>
      <div class="rounded-xl border border-neutral-200 overflow-hidden">
        <div class="flex">
          <button class="flex-1 py-3 text-center font-medium border-r border-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" :class="mode==='before'?'bg-white text-neutral-900':'bg-neutral-100 text-neutral-600'" @click="mode='before'" :aria-pressed="mode==='before'">導入前</button>
          <button class="flex-1 py-3 text-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" :class="mode==='after'?'bg-white text-neutral-900':'bg-neutral-100 text-neutral-600'" @click="mode='after'" :aria-pressed="mode==='after'">導入後</button>
        </div>
        <div class="p-6 lg:p-10 bg-white">
          <div v-if="mode==='before'" class="space-y-3 text-neutral-800">
            <p>忍受瓶頸</p>
          </div>
          <div v-else class="space-y-3 text-neutral-800">
            <p>或是改用 Zapier</p>
            <div class="grid sm:grid-cols-3 gap-3 text-left">
              <p>① 有個想法</p>
              <p>② IT 核准</p>
              <p>③ 你立即開做</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const mode = ref<'before'|'after'>('after')
</script>

