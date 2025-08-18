<template>
  <section
    class="explore-ai-tools py-16 md:py-20 lg:py-24 relative"
    role="region"
    aria-labelledby="ai-tools-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[1fr,3fr] border-t border-l border-r border-[#36342E]">
        <header class="max-w-3xl my-2 mx-10 p-1 md:p-2">
          <p class="uppercase tracking-wide text-sm text-neutral-400 flex items-center gap-2">
            <span class="inline-block w-4 h-1 bg-accent-ball"></span>
            擴充 AI 應用
          </p>
          <!-- <h2 id="stories-heading" class="text-3xl md:text-5xl font-bold text-neutral-300 mb-10">
            沒有炒作，只有結果
          </h2>
          <p class="text-neutral-400 mt-4">不論是董事會會議室、家中工作室，只要 AI 能帶來投報，團隊就用 Zapier。</p> -->
        </header>
        <div class="svg border-l border-[#36342E]">

        </div>
      </div>

      <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#36342E] border border-[#36342E]">
        <article
          v-for="tool in aiTools"
          :key="tool.id"
          class="ai-tool-card group bg-[#201515] p-6 hover:border-accent-ball hover:shadow-lg transition-all duration-1000 items-stretch"
        >
          <div class="flex flex-col items-center text-center space-y-4 justify-between h-full">
            <!-- 原版 SVG 圖標 -->
            <div class="w-16 h-16 flex items-center justify-center">
              <div
                class="w-12 h-12 text-accent-ball group-hover:scale-200 transition-transform duration-500"
                v-html="tool.svgIcon"
                aria-hidden="true"
              />
            </div>

            <!-- 標題 -->
            <h3 class="text-xl font-semibold text-neutral-400 group-hover:text-accent-ball transition-colors duration-750">
              {{ tool.title }}
            </h3>

            <!-- 描述 -->
            <p class="text-neutral-600 text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-750">
              {{ tool.description }}
            </p>

            <!-- CTA 連結 -->
            <NuxtLink
              :to="tool.link"
              class="inline-flex items-center gap-2 text-accent-ball hover:text-primary font-medium text-sm transition-colors duration-1000 group/link"
              :aria-label="`探索 ${tool.title}`"
            >
              <span>探索</span>
              <svg
                class="w-4 h-4 transition-transform duration-1000 group-hover/link:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M5 12h14"/>
                <path d="M13 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
// AI Tools data with original zapier.com SVG icons and Chinese translations
const aiTools = [
  {
    id: 'ai-workflows',
    title: 'AI 工作流程',
    description: '將 AI 與您的日常應用程式結合',
    link: '/workflows',
    svgIcon: `<svg width="64" height="64" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:#ff4f00"><path d="M8.99996 23.66L20.54 9.90997H15V0.159973L3.45996 13.91H8.99996V23.66Z" fill="currentColor"></path></svg>`
  },
  {
    id: 'ai-agents',
    title: 'AI 代理',
    description: '製作可在您整個技術堆疊中運作的自訂 AI',
    link: '/agents',
    svgIcon: `<svg width="64" height="64" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:#ff4f00"><g clip-path="url(#clip0_36933_10681)"><rect x="3" y="3" width="4.5" height="4.5" fill="currentColor"></rect><rect x="16.5" y="3" width="4.5" height="4.5" fill="currentColor"></rect><rect x="16.5" y="16.5001" width="4.5" height="4.5" fill="currentColor"></rect><rect x="3" y="16.5001" width="4.5" height="4.5" fill="currentColor"></rect><rect x="7.50049" y="7.49988" width="9" height="9" fill="currentColor"></rect></g><defs><clipPath id="clip0_36933_10681"><rect width="18" height="18" fill="white" transform="translate(3 3)"></rect></clipPath></defs></svg>`
  },
  {
    id: 'ai-chatbots',
    title: 'AI 聊天機器人',
    description: '即時回答客戶問題',
    link: '/ai/chatbot',
    svgIcon: `<svg width="64" height="64" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:#ff4f00"><path d="M6.99999 2H2V6.99999H6.99999V2Z" fill="currentColor"></path><path d="M21.9997 12H2.00049V17H21.9997V12Z" fill="currentColor"></path><path d="M21.9997 12L7 12L6.99999 6.99999L12 7V2H22L21.9997 12Z" fill="currentColor"></path><path d="M6.99951 22V17H11.9995L6.99951 22Z" fill="currentColor"></path></svg>`
  },
  {
    id: 'canvas',
    title: 'Canvas',
    description: '使用 AI 立即將您的想法轉化為完全自動化的系統',
    link: '/canvas',
    svgIcon: `<svg width="64" height="64" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:#ff4f00"><path d="M21 3H3V7.5H16.5V21H21V3Z" fill="currentColor"></path><path d="M14.2498 11.9999C14.2498 13.2426 13.2424 14.25 11.9998 14.25C10.7572 14.25 9.74981 13.2426 9.74981 11.9999C9.74981 10.7573 10.7572 9.74993 11.9998 9.74993C13.2424 9.74993 14.2498 10.7573 14.2498 11.9999Z" fill="currentColor"></path><path d="M9.74981 16.5001C9.74981 17.7427 8.74245 18.7501 7.49981 18.7501C6.25717 18.7501 5.24981 17.7427 5.24981 16.5001C5.24981 15.2574 6.25717 14.2501 7.49981 14.2501C8.74245 14.2501 9.74981 15.2574 9.74981 16.5001Z" fill="currentColor"></path></svg>`
  }
]
</script>

<style scoped>
/* 主區塊背景樣式 - 與 FeedbackStrip.vue 相同 */
.explore-ai-tools {
  background-color: #201515;
  /* background-image: radial-gradient(#36342E 1px, transparent 1px); */
  background-size: 5px 5px;
  position: relative;
}

.svg {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Cpath d='M-4.5,4.5 l9,-9 M0,18 l18,-18 M13.5,22.5 l9,-9' stroke='%2336342E' stroke-width='1' fill='none'/%3E%3C/svg%3E");

}

/* 網格背景圖案 - 根據您的要求 */
.explore-ai-tools::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18'%3E%3Cpath d='M-4.5,4.5 l9,-9 M0,18 l18,-18 M13.5,22.5 l9,-9' stroke='%2336342E' stroke-width='1' fill='none'/%3E%3C/svg%3E"); */
  opacity: 0.3;
  pointer-events: none;
}

/* 標題樣式調整 */
#ai-tools-heading {
  color: #F8F4F0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 卡片樣式 */
.ai-tool-card {
  backdrop-filter: blur(10px);
  /* border: 1px solid rgba(147, 144, 132, 0.3); */
  transition: all 0.75s ease;
}

.ai-tool-card:hover {
  /* border-color: #bd743a; */
  /* transform: scale(0.95); */
  border: none;
  box-shadow: 0 8px 25px rgba(189, 116, 58, 0.15);
  background: #000;
  /* background-image: radial-gradient(#36342E 1px, transparent 1px); */
  background-size: 5px 5px;
  position: relative;
}

/* SVG 圖標樣式 */
.ai-tool-card svg {
  filter: drop-shadow(0 2px 4px rgba(189, 116, 58, 0.2));
}

/* CTA 連結樣式 */
.ai-tool-card a {
  font-weight: 600;
  letter-spacing: 0.025em;
}

.ai-tool-card a:hover {
  text-shadow: 0 1px 2px rgba(134, 115, 94, 0.3);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .explore-ai-tools {
    background-size: 3px 3px;
  }

  #ai-tools-heading {
    font-size: 1.75rem;
  }
}

/* 可及性改進 */
@media (prefers-reduced-motion: reduce) {
  .ai-tool-card,
  .ai-tool-card svg {
    transition: none;
  }

  .ai-tool-card:hover {
    transform: none;
  }
}

/* Focus 狀態 */
.ai-tool-card:focus-within {
  outline: 2px solid #bd743a;
  outline-offset: 4px;
}
</style>

