<template>
  <section class="ai-use-cases section-padding bg-white" role="region" aria-labelledby="ai-use-cases-heading">
    <div class="container-custom">
      <!-- 區塊標題 -->
      <div class="flex flex-col mb-12 gap-4">
        <p class="uppercase tracking-wide text-sm text-neutral-500 flex items-center gap-2">
          <span class="inline-block w-4 h-1 bg-accent-ball"></span>
          AI 應用案例
        </p>
        <h2 id="ai-use-cases-heading" class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
          真實團隊，真實 AI 工作流程，真實成果
        </h2>
        <p class="text-xl text-neutral-600 max-w-4xl">
          不確定從哪裡開始使用 AI 和智能代理？這些團隊已經讓 AI 處理真正的工作。您也可以做到。
        </p>
      </div>

      <!-- 標籤頁導航 -->
      <div class="flex justify-center mb-8">
        <div class="flex bg-neutral-100 rounded-lg p-1 gap-4" role="tablist" aria-label="AI 應用案例切換">
          <button v-for="(item, index) in useCases" :key="item.id" :class="[
            'px-6 py-3 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === item.id
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-neutral-600 hover:text-primary-600 hover:bg-white/50'
          ]" role="tab" :aria-selected="activeTab === item.id" :aria-controls="`${item.id}-panel`"
            :tabindex="activeTab === item.id ? 0 : -1" @click="setActiveTab(item.id)"
            @keydown="handleTabKeydown($event, index)">
            {{ item.title }}
          </button>
        </div>
      </div>

      <!-- 內容區域 -->
      <div class="relative">
        <div v-for="item in useCases" :key="item.id" :id="`${item.id}-panel`" :class="[
          'transition-all duration-300',
          activeTab === item.id ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
        ]" role="tabpanel" :aria-labelledby="`${item.id}-tab`">
          <div class="grid lg:grid-cols-[7fr,2fr] items-center">
            <!-- 左側內容 -->
            <div class="space-y-6 w-full">
              <h3 class="text-3xl font-bold text-neutral-900">
                {{ item.header }}
              </h3>
              <p class="text-lg text-neutral-600 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
              <!-- CTA 按鈕 -->
              <div class="flex flex-col sm:flex-row p-4">
                <BaseButton variant="primary" size="base" :tag="item.link.startsWith('http') ? 'a' : 'nuxt-link'"
                  :href="item.link.startsWith('http') ? item.link : undefined"
                  :to="!item.link.startsWith('http') ? item.link : undefined" target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center gap-2">
                  使用此模板
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </BaseButton>
              </div>
            

          </div>
            <!-- 下方視覺內容 -->
            <div class="relative p-12 mt-6" style="background-image: url('https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745434986/use-case-gallery-background_rgabez.png'); background-size: cover; background-position: center;">
              <!-- 暫停/播放控制 -->
              <div class="absolute top-4 right-4 z-10">
                <button :class="[
                  'w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm',
                  'flex items-center justify-center text-white',
                  'hover:bg-black/30 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-white/50'
                ]" :aria-label="isVideoPaused ? '播放視頻' : '暫停視頻'" @click="toggleVideo">
                  <svg v-if="isVideoPaused" class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                </button>
              </div>

              <!-- 影片容器 -->
              <div
                class="relative bg-gradient-to-br from-primary-50 to-accent-tan/10 rounded-2xl overflow-hidden shadow-xl">
                <div class="aspect-video">
                  <video v-if="item.video" :ref="(el) => setVideoRef(item.id, el)" class="w-full h-full object-cover"
                    :src="item.video" muted loop playsinline :autoplay="activeTab === item.id && !isVideoPaused" />
                  <div v-else
                    class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                    <div class="text-center">
                      <div class="w-16 h-16 mx-auto mb-4 bg-primary-500 rounded-full flex items-center justify-center">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p class="text-primary-700 font-medium">{{ item.header }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue'

interface UseCase {
  id: string
  title: string
  header: string
  description: string
  link: string
  video?: string
}

// 台灣在地化的 AI 應用案例
const useCases: UseCase[] = [
  {
    id: 'it-helpdesk',
    title: 'IT 服務台',
    header: '讓 AI 自動回應工單',
    description: 'Remote.com 的 3 人 IT 團隊透過 AI 自動處理 28% 的公司請求，大幅提升服務效率。',
    link: '/templates/it-helpdesk',
    video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1745703803/Homepage/IT_helpdesk_qkcvxr.mp4'
  },
  {
    id: 'enrich-leads',
    title: '潛客開發',
    header: '透過 AI 深度挖掘潛在客戶',
    description: '將多個來源的潛在客戶集中到一個地方，並讓 AI 進行深度研究和分析。',
    link: '/templates/lead-enrichment',
    video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1745704067/Homepage/Unified_lead_capture_bq1rff.mp4'
  },
  {
    id: 'sales-ops',
    title: '銷售營運',
    header: '運用 AI 優勢提升銷售表現',
    description: '獲得 AI 驅動的銷售指導，提升您的技能以成交更多交易。',
    link: '/templates/sales-coaching',
    video: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1745704065/Homepage/Sales_Call_Coach_f0zycp.mp4'
  }
]

// 響應式狀態
const activeTab = ref<string>(useCases[0].id)
const isVideoPaused = ref<boolean>(false)
const videoRefs = ref<Record<string, HTMLVideoElement | null>>({})

// 類型安全的 ref 設置函數
const setVideoRef = (id: string, el: Element | ComponentPublicInstance | null) => {
  if (el && 'tagName' in el && (el as Element).tagName === 'VIDEO') {
    videoRefs.value[id] = el as HTMLVideoElement
  } else {
    videoRefs.value[id] = null
  }
}

// 設置活動標籤頁
const setActiveTab = (tabId: string) => {
  activeTab.value = tabId

  // 暫停所有視頻，然後播放當前標籤頁的視頻
  Object.values(videoRefs.value).forEach(video => {
    if (video) {
      video.pause()
    }
  })

  nextTick(() => {
    const currentVideo = videoRefs.value[tabId]
    if (currentVideo && !isVideoPaused.value) {
      currentVideo.play().catch(() => {
        // 忽略自動播放失敗
      })
    }
  })
}

// 鍵盤導航處理
const handleTabKeydown = (event: KeyboardEvent, index: number) => {
  const { key } = event

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault()

    let newIndex = index
    if (key === 'ArrowLeft') {
      newIndex = index > 0 ? index - 1 : useCases.length - 1
    } else {
      newIndex = index < useCases.length - 1 ? index + 1 : 0
    }

    setActiveTab(useCases[newIndex].id)

    // 聚焦到新的標籤頁
    nextTick(() => {
      const newButton = document.querySelector(`[aria-controls="${useCases[newIndex].id}-panel"]`) as HTMLButtonElement
      if (newButton) {
        newButton.focus()
      }
    })
  }
}

// 視頻播放/暫停控制
const toggleVideo = () => {
  isVideoPaused.value = !isVideoPaused.value

  const currentVideo = videoRefs.value[activeTab.value]
  if (currentVideo) {
    if (isVideoPaused.value) {
      currentVideo.pause()
    } else {
      currentVideo.play().catch(() => {
        // 忽略播放失敗
      })
    }
  }
}

// 生命週期管理
onMounted(() => {
  // 初始化第一個視頻
  nextTick(() => {
    const firstVideo = videoRefs.value[activeTab.value]
    if (firstVideo && !isVideoPaused.value) {
      firstVideo.play().catch(() => {
        // 忽略自動播放失敗
      })
    }
  })
})

onUnmounted(() => {
  // 清理所有視頻
  Object.values(videoRefs.value).forEach(video => {
    if (video) {
      video.pause()
    }
  })
})
</script>
