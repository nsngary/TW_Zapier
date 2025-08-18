<template>
  <section id="customer-stories" class="customer-stories section-padding bg-neutral-50" role="region" aria-labelledby="stories-heading">
    <div class="container-custom">
      <header class="max-w-3xl mb-10">
        <p class="uppercase tracking-wide text-sm text-neutral-500 flex items-center gap-2">
          <span class="inline-block w-4 h-1 bg-accent-ball"></span>
          客戶故事
        </p>
        <h2 id="stories-heading" class="text-3xl md:text-5xl font-bold text-neutral-900">
          從《財星 500 大》<br>到首次創業者都在用
        </h2>
        <p class="text-neutral-600 mt-4">不論是董事會會議室、家中工作室，只要 AI 能帶來投報，團隊就用 Zapier。</p>
      </header>

      <!-- Customer stories：雙欄分頁輪播（對齊 Zapier 行為） -->
      <div class="relative" role="group" aria-roledescription="carousel" aria-label="Customer stories" tabindex="0" @keydown.left.prevent="prev" @keydown.right.prevent="next">
        <div ref="containerEl" class="overflow-hidden">
          <div ref="trackEl" class="flex transition-[transform,opacity] duration-[1000ms,1500ms] ease-[cubic-bezier(0,0,0.01,1)]"
               :style="{ transform: `translateX(-${offsetPx}px)` }">
            <div v-for="(page, pi) in pages" :key="pi" class="w-full flex-shrink-0" :data-page-index="pi">
              <div class="grid gap-6">
                <article v-for="story in page" :key="story.id" class="border border-[#C5C0B1] bg-[#F8F4F0] flex flex-col">
                  <div class="lg:grid lg:grid-cols-2 lg:items-stretch">
                    <!-- 左欄：Logo、引言、作者、KPI、CTA（手機僅顯示此欄） -->
                    <div class="flex flex-col border-b lg:border-b-0 border-[#C5C0B1]">
                      <header class="px-5 py-5 lg:px-10 lg:py-8 border-b border-[#C5C0B1]" data-role="head" :style="maxHeights.head ? { minHeight: maxHeights.head + 'px' } : {}">
                        <img :src="story.logo" :alt="story.company + ' logo'" class="h-[18px] lg:h-[24px] w-auto" loading="lazy" />
                      </header>

                      <div class="px-5 py-6 lg:px-10 lg:py-10 border-t border-[#C5C0B1] flex flex-col gap-6 lg:gap-10" data-role="body" :style="maxHeights.body ? { minHeight: maxHeights.body + 'px' } : {}">
                        <div class="flex items-start gap-3">
                          <span aria-hidden="true" class="mt-1 inline-flex" style="line-height:0">
                            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2229 0H19.2L15.168 8.09256H19.2V16H10.9989V8.09256L15.2229 0ZM4.19657 0H8.20114L4.14171 8.09256H8.20114V16H0V8.09256L4.19657 0Z" fill="#36342E"></path></svg>
                          </span>
                          <p class="text-neutral-900 font-[300] [font-family:'GT_Alpina','Noto_Sans_TC',system-ui,sans-serif] text-[clamp(24px,4vw,40px)] leading-[1.08] tracking-[-0.04em]">{{ story.quote }}</p>
                        </div>
                        <div class="text-neutral-700 text-sm lg:text-base">{{ story.author }}</div>
                      </div>

                      <div class="flex gap-8 lg:gap-24 px-5 py-6 lg:px-10 lg:py-8 border-t border-[#C5C0B1]" data-role="kpis" :style="maxHeights.kpis ? { minHeight: maxHeights.kpis + 'px' } : {}">
                        <div class="flex flex-col gap-1 max-w-[192px]">
                          <div class="text-accent-ball text-3xl sm:text-4xl lg:text-5xl font-medium whitespace-nowrap">{{ story.kpis[0].value }}</div>
                          <div class="text-neutral-600 text-xs sm:text-sm leading-tight">{{ story.kpis[0].label }}</div>
                        </div>
                        <div class="flex flex-col gap-1 max-w-[192px]">
                          <div class="text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-medium whitespace-nowrap">{{ story.kpis[1].value }}</div>
                          <div class="text-neutral-600 text-xs sm:text-sm leading-tight">{{ story.kpis[1].label }}</div>
                        </div>
                      </div>

                      <div class="px-5 py-4 lg:px-10 lg:py-5 border-t border-[#C5C0B1]" data-role="cta" :style="maxHeights.cta ? { minHeight: maxHeights.cta + 'px' } : {}">
                        <a :href="story.href" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:underline hover:text-accent-ball">
                          閱讀完整故事
                          <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
                        </a>
                      </div>
                    </div>

                    <!-- 右欄：客戶圖片（僅桌面顯示） -->
                    <div class="hidden lg:block">
                      <div class="relative lg:h-full overflow-hidden border-l border-[#C5C0B1]" data-role="figure" :style="maxHeights.figure ? { minHeight: maxHeights.figure + 'px' } : {}">
                        <img :src="story.image" :alt="story.company + ' customer spotlight'" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <!-- 控制器 -->
        <div class="mt-6 flex items-center justify-center gap-4">
            <button type="button" class="btn-outline btn-sm" @click="prev" aria-label="Previous slide">上一頁</button>
            <div class="flex items-center gap-2" aria-label="Slides">
              <button
              v-for="(p, i) in pages"
              :key="i"
              type="button"
              class="w-2.5 h-2.5 rounded-full"
              :class="i === pageIndex ? 'bg-neutral-800' : 'bg-neutral-300 hover:bg-neutral-400'"
              :aria-label="`Go to slide ${i+1}`"
              :aria-current="i === pageIndex ? 'true' : 'false'"
              @click="go(i)"
              />
            </div>
            <button type="button" class="btn-outline btn-sm" @click="next" aria-label="Next slide">下一頁</button>
        </div>

        <div class="mt-8 text-end">
          <a href="https://zapier.com/customer-stories" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-neutral-900 font-medium hover:underline hover:text-accent-ball">
            查看更多客戶故事
            <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

interface StoryKPI { value: string; label: string }
interface StoryCard {
  id: string
  company: string
  logo: string
  image: string
  quote: string
  author: string
  href: string
  kpis: [StoryKPI, StoryKPI]
}

const cards: StoryCard[] = [
  {
    id: 'okta', company: 'Okta',
    logo: 'https://res.cloudinary.com/zapier-media/image/upload/v1745864890/Homepage/okta-logo-cs_vtw6tr.png',
    image: 'https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745609249/Homepage/CS_-_Okta_ndccco.jpg',
    quote: 'Zapier 讓我們用幾小時就能建立並測試自動化，而不是耗上一整個工程衝刺',
    author: '— Korey Marciniak, 客服策略與營運資深經理',
    href: 'https://zapier.com/customer-stories/okta',
    kpis: [
      { value: '13%', label: '客服升級案件 \n 以 Zapier 完全自動化' },
      { value: '10 min', label: '每個升級案件節省時間' },
    ],
  },
  {
    id: 'vendasta', company: 'Vendasta',
    logo: 'https://res.cloudinary.com/zapier-media/image/upload/v1745864891/Homepage/vendasta-logo-cs_nijgw3.png',
    image: 'https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745609255/Homepage/CS_-_Vendasta_qe1hio.jpg',
    quote: '我最喜歡 Zapier 的地方，是能證明看似不可能的事其實做得到',
    author: '— Jacob Sirrs, 行銷營運專員',
    href: 'https://zapier.com/customer-stories/vendasta',
    kpis: [
      { value: '$1M', label: '透過自動化挽回的銷售管道價值' },
      { value: '282', label: '每年消除的手動工時（天）' },
    ],
  },
  {
    id: 'arden', company: 'Arden',
    logo: 'https://res.cloudinary.com/zapier-media/image/upload/v1745864891/Homepage/arden-logo-cs_i0a9iv.png',
    image: 'https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745609250/Homepage/CS_-_Arden_wfdpk3.jpg',
    quote: '每年為我們帶來約 50 萬美元以上的間接成本節省',
    author: '— Tyler Diogo, Arden 保險服務營運經理',
    href: 'https://zapier.com/customer-stories/arden-insurance-services',
    kpis: [
      { value: '34,000+', label: '實現自動化的工時' },
      { value: '$150m', label: '每年協助收款金額' },
    ],
  },
  {
    id: 'contractor', company: 'Contractor Appointments',
    logo: 'https://res.cloudinary.com/zapier-media/image/upload/v1748992915/Homepage/contractor-appointments_slfmo2.png',
    image: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1748992152/Homepage/CS_-_Contractor_Appointments_ejrqid.jpg',
    quote: '"在自動化的幫助下，我們的客戶回報營收已超過 1.34 億美元"',
    author: '— Ben Leone, CTO',
    href: 'https://zapier.com/customer-stories/contractor-appointments',
    kpis: [
      { value: '$300k', label: '因自動化帶來的年度營收成長' },
      { value: '80-90%', label: ' 頂端資訊自動處理比例' },
    ],
  },
  {
    id: 'pretto', company: 'Pretto',
    logo: 'https://res.cloudinary.com/zapier-media/image/upload/v1745864891/Homepage/pretto-logo-cs_bnhrk7.png',
    image: 'https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745609250/Homepage/CS_-_Pretto_hyljtq.jpg',
    quote: '  越多事情能不寫程式就更好。我們已自動化許多業務，而不必再聘工程師',
    author: '— Etienne Batisse, 工程經理',
    href: 'https://zapier.com/customer-stories/pretto',
    kpis: [
      { value: '$10,000', label: '管理回饋所節省的年成本' },
      { value: '2,000', label: '一年節省的小時數' },
    ],
  },
  {
    id: 'laudable', company: 'Laudable',
    logo: 'https://res.cloudinary.com/zapier-media/image/upload/v1745864890/Homepage/laudable-logo-cs_muvfx9.png',
    image: 'https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745609252/Homepage/CS_-_Laudable_hjkhui.jpg',
    quote: '我們用很少的資源做更多事，可能性無窮',
    author: '— Angela Ferrante, 創辦人暨執行長',
    href: 'https://zapier.com/customer-stories/laudable',
    kpis: [
      { value: '$240k', label: '節省的工程成本' },
      { value: '200+ Zaps', label: '用於自動化營運' },
    ],
  },
]

// 重構：桌面版與手機版都是每頁 1 張卡，但內部佈局不同
const perView = ref(1) // 固定每頁 1 張
const mqLg = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)') : null
function updatePerView(){ perView.value = 1 } // 固定為 1
function clampPageIndex(){ if (pages.value.length === 0) { pageIndex.value = 0; return } if (pageIndex.value > pages.value.length - 1) pageIndex.value = pages.value.length - 1 }

const pages = computed(() => {
  const out: StoryCard[][] = []
  // 每頁固定 1 張卡
  for (let i = 0; i < cards.length; i++) out.push([cards[i]])
  return out
})

const pageIndex = ref(0)
const containerEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const offsetPx = ref(0)

// 需求 1：同頁 5 區塊高度一致（以每頁的最大高度設定 min-height）
const maxHeights = ref<{ head:number; figure:number; body:number; kpis:number; cta:number } | Record<string, number>>({ head:0, figure:0, body:0, kpis:0, cta:0 })

function measureHeights(){
  const host = containerEl.value
  if (!host) return
  const pageEl = host.querySelector(`[data-page-index="${pageIndex.value}"]`) as HTMLElement | null
  if (!pageEl) return
  const roles = ['head','figure','body','kpis','cta'] as const
  const acc = { head:0, figure:0, body:0, kpis:0, cta:0 }
  roles.forEach(role => {
    const nodes = Array.from(pageEl.querySelectorAll(`[data-role="${role}"]`)) as HTMLElement[]
    nodes.forEach(n => { acc[role] = Math.max(acc[role], n.offsetHeight) })
  })
  maxHeights.value = acc
}

function go(i: number){ pageIndex.value = (i + pages.value.length) % pages.value.length; syncOffset(); requestAnimationFrame(measureHeights) }
function prev(){ go(pageIndex.value - 1) }
function next(){ go(pageIndex.value + 1) }

function syncOffset(){
  const container = containerEl.value
  if (!container) return
  offsetPx.value = container.clientWidth * pageIndex.value
}

// 需求 2：左右滑動換頁（touch 手勢）
let touchStartX = 0
let touchStartY = 0
let isSwiping = false
function onTouchStart(e: TouchEvent){
  const t = e.touches[0]
  touchStartX = t.clientX
  touchStartY = t.clientY
  isSwiping = false
}
function onTouchMove(e: TouchEvent){
  const t = e.touches[0]
  const dx = t.clientX - touchStartX
  const dy = t.clientY - touchStartY
  if (!isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10){ isSwiping = true; e.preventDefault() }
}
function onTouchEnd(e: TouchEvent){
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStartX
  if (Math.abs(dx) > 50){ dx < 0 ? next() : prev() }
  isSwiping = false
}

onMounted(() => {
  const el = containerEl.value
  if (!el) return
  updatePerView()
  measureHeights()
  window.addEventListener('resize', () => { updatePerView(); clampPageIndex(); syncOffset(); measureHeights() })
  el.addEventListener('touchstart', onTouchStart, { passive: true })
  el.addEventListener('touchmove', onTouchMove, { passive: false })
  el.addEventListener('touchend', onTouchEnd, { passive: true })
  mqLg?.addEventListener?.('change', () => { updatePerView(); clampPageIndex(); syncOffset(); measureHeights() })
})
onBeforeUnmount(() => {
  const el = containerEl.value
  if (el){
    el.removeEventListener('touchstart', onTouchStart as any)
    el.removeEventListener('touchmove', onTouchMove as any)
    el.removeEventListener('touchend', onTouchEnd as any)
  }
  window.removeEventListener('resize', measureHeights)
})
</script>

<style scoped>
/* 依 Zapier 視覺採用實體 class，避免 @apply 警告；主要樣式都在模板中以原子 class 寫法完成 */
</style>

