<template>
  <section class="mega-intro border-x border-[#ECEAE3]" role="region" aria-labelledby="mega-intro-heading">
    <!-- 容器與邊界線對齊原站：max-w-[1280px] + 內距 -->
    <!-- hero 區塊 -->
    <div class="section-shell section-bg-neutral">
      <div class="section-gutter bg-neutral-50"></div>
      <div class="section-content section-content-grid bg-primary-100 px-5 sm:px-10">
        <!-- Hero 文案列 -->
        <header class="self-center" :data-centered="false">
          <p class="tracking-wide text-sm text-neutral-500 flex items-center gap-2">
            <span class="inline-block w-4 h-1 bg-accent-ball"></span>
            讓Ｚａｐｉｅｒ
          </p>
          <h1 id="mega-intro-heading" class="tracking-wide font-medium leading-[0.9] text-[40px] sm:text-[56px] lg:text-[64px] text-neutral-900 text-balance leading-snug
">
            透過簡單的操作
            安排複雜的工作
          </h1>
          <p
            class="tracking-wide max-w-[400px] lg:max-w-[576px] text-[16px] lg:text-[18px] leading-[1.2] lg:leading-[1.2] letter-spacing-[-0.01em] mt-5 lg:mt-8 text-neutral-700 text-balance leading-snug">
            幾分鐘就能建置並上線 AI 工作流程——<br>沒有瓶頸、沒有複雜，只有成果。
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
            <a href="https://zapier.com/sign-up"
              class="h-11 lg:h-12 px-4 lg:px-6 bg-accent-ball border border-accent-ball text-white font-semibold text-sm lg:text-lg rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 hover:bg-accent-amber hover:border-accent-amber transition-all duration-250 inline-flex items-center justify-center"
              target="_blank" rel="noopener noreferrer">
              使用 Email 免費開始
            </a>
            <div class="bg-primary-100 rounded-lg">
              <a href="https://zapier.com/google-sso/start?scopes=basic&from=/&domain_capture_enabled=true"
                class="h-11 lg:h-12 px-4 bg-white border border-primary-500 text-primary-700 font-semibold text-sm lg:text-lg rounded hover:bg-primary-50 hover:border-primary-600 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-all duration-250 inline-flex items-center justify-center gap-2"
                target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true" class="inline-flex" style="line-height:0">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.2041 8.34882V12.3006H15.6958C15.4546 13.5715 14.731 14.6476 13.6456 15.3712L16.9573 17.9408C18.8868 16.1597 20 13.5437 20 10.4361C20 9.71257 19.9351 9.01677 19.8145 8.34892L10.2041 8.34882Z"
                      fill="#4285F4"></path>
                    <path
                      d="M4.48548 12.1463L3.73857 12.7181L1.09473 14.7774C2.77377 18.1077 6.21509 20.4083 10.2039 20.4083C12.959 20.4083 15.2688 19.4992 16.9572 17.9408L13.6455 15.3712C12.7364 15.9834 11.5768 16.3545 10.2039 16.3545C7.55088 16.3545 5.29677 14.5641 4.48966 12.1522L4.48548 12.1463Z"
                      fill="#34A853"></path>
                    <path
                      d="M1.09454 5.63083C0.398843 7.00369 0 8.55289 0 10.2041C0 11.8553 0.398843 13.4045 1.09454 14.7773C1.09454 14.7865 4.4898 12.1428 4.4898 12.1428C4.28571 11.5306 4.16509 10.8812 4.16509 10.204C4.16509 9.5267 4.28571 8.87739 4.4898 8.26514L1.09454 5.63083Z"
                      fill="#FBBC05"></path>
                    <path
                      d="M10.2042 4.0631C11.707 4.0631 13.0428 4.58257 14.1096 5.58444L17.0316 2.66238C15.2598 1.01119 12.9593 0 10.2042 0C6.2153 0 2.77377 2.29129 1.09473 5.63083L4.48987 8.26536C5.29688 5.85345 7.5511 4.0631 10.2042 4.0631Z"
                      fill="#EA4335"></path>
                  </svg>
                </span>
                <span>使用 Google 免費開始</span>
              </a>
            </div>

          </div>

        </header>

        <!-- 右側產品預覽（背景圖） -->
        <div class="relative grid items-center">
          <!-- <div class="rounded-lg overflow-hidden bg-center bg-cover min-h-[220px] sm:min-h-[300px] lg:min-h-[380px] max-w:100%"
            style="background-image:url('https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745602193/Homepage/hero-illo_orange_ilrzpu.png')">
          </div> -->
          <div class="overflow-hidden">
            <img src="../../public/images/hero-illo_orange_ilrzpu.png" alt="">
          </div>
        </div>
      </div>
      <div class="section-gutter bg-neutral-50"></div>
    </div>

    <!-- Tabs 水平導航列（置於容器邊界內） -->
    <div class="section-shell section-bg-neutral section-border-y">
      <div class="section-gutter bg-primary-100"></div>
      <div class="section-content-nopadding">
        <div class="flex items-center justify-center py-6 sm:py-7 lg:py-8">
          <h2 class="inline-flex items-center gap-2 text-[14px] lg:text-[16px] font-medium text-neutral-900">
            <span class="inline-block w-2 h-2 rounded-full bg-accent-red"></span>
            你的 AI 自動化完整工具組
          </h2>
        </div>
        <div
          class=" flex gap-0 overflow-x-auto scrollbar-hide justify-start lg:justify-center border-t border-primary-200"
          role="tablist" aria-label="產品導覽分頁">
          <button v-for="(t, i) in tabs" :key="t.id"
            class="tabTrigger flex-shrink-0 px-4 sm:px-5 py-3 text-sm lg:text-base font-medium text-accent-amber border-y-0 border-r border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-all duration-200 ease-in-out hover:bg-[#f5f3eb]"
            :class="[
              i === 0 ? 'border-l border-primary-200' : '',
              activeId === t.id ? 'tabTrigger--active text-accent-amber' : ''
            ]" :aria-selected="activeId === t.id" :id="`tab-${t.id}`" :tabindex="activeId === t.id ? 0 : -1"
            role="tab" :aria-controls="`panel-${t.id}`" @click="selectTab(t.id)" @keydown="onTabKeydown($event, i)">
            <span class="pb-[6px] ">
              {{ t.label }}
            </span>
          </button>
        </div>

        <!-- Panels：僅媒體區（背景圖由父層控制，媒體不覆蓋背景） -->
        <div
          class="relative flex justify-center items-center overflow-hidden h-[240px] sm:h-[300px] lg:h-[815px] p-4 md:p-6"
          style="background-image:url('https://res.cloudinary.com/zapier-media/image/upload/f_auto/q_auto/v1745435119/product-gallery-background_ed59bc.jpg');background-size:cover;background-position:center;">
          <img v-if="currentTab.media.type === 'image'" :src="currentTab.media.src" :alt="currentTab.media.alt"
            class="h-full w-auto max-w-full object-contain bg-transparent pointer-events-none select-none" />
          <video v-else :src="currentTab.media.src" title="Product preview" muted autoplay loop playsinline
            class="h-full w-auto max-w-full object-contain bg-transparent pointer-events-none select-none rounded-lg" />
        </div>
      </div>
      <div class="section-gutter bg-primary-100"></div>
    </div>

    <!-- Templates 橫向卡片列 -->
    <div class="section-shell section-bg-neutral">
      <div class="section-gutter bg-neutral-50"></div>
      <div class="section-content  bg-primary-100 px-5 sm:px-10 py-10 sm:py-12 lg:py-16">
        <!-- 面板文章（與模板同區塊） -->
        <div class="mb-8">
          <h3 class="text-xl lg:text-2xl font-semibold text-neutral-900">{{ currentTab.title }}</h3>
          <p class="text-neutral-700 mt-2 lg:mt-3 max-w-[640px]">{{ currentTab.desc }}</p>
          <div class="mt-4">
            <a :href="productHref(currentTab.id)" target="_blank" rel="noopener noreferrer"
              class="inline-flex h-11 lg:h-12 items-center justify-center px-4 lg:px-6 border border-primary-500 text-primary-700 font-semibold text-sm lg:text-lg rounded hover:bg-primary-50">探索
              {{ currentTab.cta }}</a>
          </div>
        </div>

        <h3 class="text-base lg:text-lg text-neutral-900 font-medium">使用預建範本快速上手</h3>
        <div class="mt-4 lg:mt-6 flex gap-5 overflow-x-auto scrollbar-hide" aria-label="熱門模板">
          <a v-for="tpl in templates" :key="tpl.id" :href="tpl.href" target="_blank" rel="noopener noreferrer"
            class="flex-1 min-w-[280px] sm:min-w-[360px] border border-primary-500 rounded-md p-5 hover:border-primary-500 transition-colors">
            <div class="text-neutral-900 font-semibold text-base lg:text-[18px]">{{ tpl.title }}</div>
            <div class="mt-3 flex gap-2">
              <div v-for="app in tpl.apps" :key="app"
                class="w-10 h-10 grid place-items-center border border-neutral-300 rounded">
                <img :src="app" alt="" class="max-w-full max-h-full" loading="lazy" />
              </div>
            </div>
          </a>
        </div>
        <div class="flex justify-end mt-4">
          <a href="https://zapier.com/templates" target="_blank" rel="noopener noreferrer"
            class="text-primary-700 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">查看更多範本
            →</a>
        </div>
      </div>
      <div class="section-gutter bg-neutral-50"></div>
    </div>

    <!-- Trusted by（無限 Marquee） -->
    <div class="section-shell section-bg-primary section-border-y">
      <div class="section-gutter bg-primary-100"></div>
      <div class="bg-neutral-50 section-content-nopadding">
        <div class="mx-auto max-w-[1280px] py-10 lg:py-16">
          <div class="w-fit mx-auto text-[12px] lg:text-[14px] text-neutral-600 bg-neutral-50 px-6 -mt-6 lg:-mt-8">獲 340
            萬家公司信任</div>
          <div class="relative overflow-hidden mt-6" aria-hidden="true">
            <div class="marquee flex items-center gap-10 lg:gap-20 py-8">
              <template v-for="n in 2">
                <img v-for="logo in logos" :key="logo.alt + n" class="h-6 sm:h-8 lg:h-10 opacity-80" :src="logo.src"
                  :alt="logo.alt" />
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="section-gutter bg-primary-100"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Media = { type: 'image' | 'video'; src: string; alt: string }
interface Tab { id: string; label: string; title: string; desc: string; cta: string; media: Media }

const tabs = ref<Tab[]>([
  { id: 'workflows', label: 'AI 工作流程', title: 'AI 工作流程', desc: '善用 Zapier 的完整建置能力，將進階流程自動化。', cta: 'AI 工作流程', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745864783/aiworkflowshomepage.mp4', alt: 'AI 工作流程' } },
  { id: 'agents', label: 'AI 代理人', title: 'AI 代理人', desc: '打造能跨整個技術堆疊運作的自訂 AI。', cta: 'AI 代理人', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745867693/AI%20LP%20-%204-29-25/Agents_ZapierHomepage_wnf7d5.mp4', alt: 'AI 代理人' } },
  { id: 'chatbots', label: 'AI 聊天機器人', title: 'AI 聊天機器人', desc: '即時回覆客戶問題。', cta: 'AI 聊天機器人', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745865033/Hero_yffypl.mp4', alt: 'AI 聊天機器人' } },
  { id: 'tables', label: 'Tables', title: 'Tables', desc: 'Zapier Tables 讓你的自動化資料集中在同一處。', cta: 'Tables', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745865096/Tables-linked-records-demo_b3qeda.mp4', alt: 'Tables' } },
  { id: 'interfaces', label: 'Interfaces', title: 'Interfaces', desc: 'Zapier Interfaces 為任一流程打造客製前端介面。', cta: 'Interfaces', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745865153/Bite-club-full-site_ekpq5d.mp4', alt: 'Interfaces' } },
  { id: 'canvas', label: 'Canvas', title: 'Canvas', desc: '用 AI 立即把你的想法轉成全自動化系統。', cta: 'Canvas', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best/f_auto/v1746044969/Homepage/Hero_xi7mte.webm', alt: 'Canvas' } },
  { id: 'enterprise', label: '企業版', title: '企業版', desc: '在全組織範圍安全擴展。', cta: '企業版', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745866077/250421_Zapier_Enterprise_Hero_v01_qessny.mp4', alt: 'Enterprise 企業版' } },
  { id: 'functions', label: 'Functions', title: 'Functions', desc: '在雲端 IDE 撰寫你的工作流程程式碼。', cta: 'Functions', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745865247/functions_test_deploy_okurwc.mp4', alt: 'Functions' } },
  { id: 'apps', label: '8,000 個應用程式', title: '8,000 個應用程式', desc: '把 300+ 種 AI 工具串接到近 8,000 個日常應用程式。', cta: '8,000 個應用程式', media: { type: 'video', src: 'https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745865345/Products/Zaps/app-picker-april29_sfmk8p.mp4', alt: '8,000 個應用程式' } },
])
const activeId = ref<Tab['id']>('workflows')
const currentTab = computed<Tab>(() => tabs.value.find(t => t.id === activeId.value) || tabs.value[0])

function selectTab(id: Tab['id']) { activeId.value = id }

function onTabKeydown(e: KeyboardEvent, index: number) {
  const max = tabs.value.length - 1
  if (e.key === 'ArrowRight') selectTab(tabs.value[index === max ? 0 : index + 1].id)
  else if (e.key === 'ArrowLeft') selectTab(tabs.value[index === 0 ? max : index - 1].id)
  else if (e.key === 'Home') selectTab(tabs.value[0].id)
  else if (e.key === 'End') selectTab(tabs.value[max].id)
}

function productHref(id: Tab['id']): string {
  const map: Record<string, string> = {
    workflows: 'https://zapier.com/workflows',
    agents: 'https://zapier.com/agents',
    chatbots: 'https://zapier.com/ai/chatbot',
    tables: 'https://zapier.com/tables',
    interfaces: 'https://zapier.com/interfaces',
    canvas: 'https://zapier.com/canvas',
    enterprise: 'https://zapier.com/enterprise',
    functions: 'https://zapier.com/functions',
    apps: 'https://zapier.com/apps',
  }
  return map[id] || 'https://zapier.com'
}

const templates = [
  {
    id: 't1', title: '讓 AI 處理你的 IT 支援工單', href: 'https://www.zapier.com/templates/details/it-helpdesk', apps: [
      'https://zapier-images.imgix.net/storage/services/07d11aa2eaa1dd2b35baa0c7ebe269bc.png?auto=format&ixlib=react-9.8.1&q=50&fit=crop&h=40&w=40',
      'https://zapier-images.imgix.net/storage/services/6cf3f5a461feadfba7abc93c4c395b33_2.png?auto=format,compress&ixlib=python-3.0.0&q=50',
      'https://zapier-images.imgix.net/storage/services/000c15b838d86d80869cff5938fa76f3.png?auto=format,compress&ixlib=python-3.0.0&q=50',
    ]
  },
  {
    id: 't2', title: '把銷售通話變成教練時刻', href: 'https://zapier.com/templates/details/call-coach-ai-sales-success-coaching', apps: [
      'https://zapier-images.imgix.net/storage/services/000c15b838d86d80869cff5938fa76f3.png?auto=format,compress&ixlib=python-3.0.0&q=50',
      'https://zapier-images.imgix.net/storage/services/6cf3f5a461feadfba7abc93c4c395b33_2.png?auto=format,compress&ixlib=python-3.0.0&q=50',
    ]
  },
  { id: 't3', title: '查看更多範本 →', href: 'https://zapier.com/templates', apps: [] },
]

const logos: Array<{ alt: string; src: string }> = [
  { alt: 'Disney', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/disney_zfpuci.png' },
  { alt: 'Thomson Reuters', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254335/thomson-reuters_hvfvdm.png' },
  { alt: 'Alphabet', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866526/Homepage/Ticker/alphabet-logo_ojj7s0.png' },
  { alt: 'Meta', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/meta_sa6fhf.png' },
  { alt: 'Okta', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866527/Homepage/Ticker/okta-w-circle_nb2lkv.png' },
  { alt: 'HP', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/hp_lhfrfl.png' },
  { alt: 'Samsung', src: 'https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1745254334/samsung_bvgxev.png' },
  { alt: "Lowe's", src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866526/Homepage/Ticker/lowes_jookhj.png' },
  { alt: 'P & G', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866525/Homepage/Ticker/p-and-g_o60hzm.png' },
  { alt: 'Alibaba', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745867083/Homepage/Ticker/alibaba-2_stdr10.png' },
  { alt: 'Hermes', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866524/Homepage/Ticker/hermes_mpn39n.png' },
  { alt: 'Siemens', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866524/Homepage/Ticker/siemens_zmbyn5.png' },
  { alt: 'Equifax', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866523/Homepage/Ticker/equifax_cmnhn3.png' },
  { alt: 'American Family', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866523/Homepage/Ticker/american-family_b0rj2q.png' },
  { alt: 'StoneX', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/stone-x_wyzrjl.png' },
  { alt: 'Opendoor', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/opendoor_ocwpe0.png' },
  { alt: 'Booking.com', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866522/Homepage/Ticker/booking_lwarz3.png' },
  { alt: 'Indeed', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/indeed_jakzfz.png' },
  { alt: 'Mastercard', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745867429/Homepage/Ticker/mastercard_g9zhda.png' },
  { alt: 'Allstate', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745867429/Homepage/Ticker/allstate_dqosx8.png' },
  { alt: 'Edward Jones', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/edward-jones_ejarvl.png' },
  { alt: 'Poshmark', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/poshmark_vjxmpp.png' },
  { alt: 'Flipkart', src: 'https://res.cloudinary.com/zapier-media/image/upload/v1745866521/Homepage/Ticker/flipkart_gag3du.png' },
]
</script>

<style scoped>
/***** tabs 下劃線與焦點 *****/
button[role="tab"] {
  outline: none;
}

/***** marquee *****/
.marquee {
  animation: marquee-x 30s linear infinite;
}

.marquee:hover {
  animation-play-state: paused;
}

@keyframes marquee-x {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-50% - 40px));
  }
}

/***** prefers-reduced-motion *****/
@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none !important;
  }
}

video {
  object-fit: contain;
  overflow-clip-margin: content-box;
  overflow: clip;
}

/* Tabs 視覺與互動效果 —— 參考 HeaderNavigation 下拉選單設計 */
.tabTrigger {
  display: flex;
  position: relative;
  align-items: center;
  font-family: Inter, var(--zds-typography-base, Helvetica), Helvetica, arial, sans-serif;
  color: #413735;
  /* 與 Header summary 顏色一致 */
}

/* Hover 與 Focus 與 Header 對齊 */
.tabTrigger:hover,
.tabTrigger:focus-visible {
  background-color: #f5f3eb;
}

/* 底線動畫（與 Header summary:after 同步） */
.tabTrigger::after {
  content: "";
  height: 4px;
  background-color: #b09a85;
  /* 與 Header 底線色對齊 */
  width: 0;
  position: absolute;
  left: 0;
  bottom: 0px;
  transition: width .25s ease-in-out;
}

/* Hover/Focus 時展開底線 */
.tabTrigger:hover::after,
.tabTrigger:focus-visible::after {
  width: 100%;
}


/* Active 狀態：顯示完整底線並強化字重 */
.tabTrigger--active {
  /* font-weight: 600; */
  transition: width 2s ease-in-out;
  color: #A86F4B;
}

.tabTrigger--active::after {
  width: 100%;
}
</style>
