<template>
  <section id="scale-ai" class="section-padding bg-white border-x border-primary-500" role="region" aria-labelledby="scale-ai-heading">
    <div class="container-custom">
      <!-- Header -->
      <header class="max-w-3xl mb-10">
        <p class="uppercase tracking-wide text-sm text-neutral-400 flex items-center gap-2">
          <span class="inline-block w-4 h-1 bg-accent-ball"></span>
          擴充 AI 應用
        </p>
        <h2 id="stories-heading" class="text-3xl md:text-5xl font-bold text-neutral-300">
          沒有炒作，只有結果
        </h2>
        <p class="text-neutral-400 mt-4">不論是董事會會議室、家中工作室，只要 AI 能帶來投報，團隊就用 Zapier。</p>
      </header>

      <!-- Body: mobile stacked, desktop two columns -->
      <div ref="sectionEl" class="mt-8 grid gap-10 items-start lg:grid-cols-2">
        <!-- Left: Counter, copy, highlights -->
        <div>
          <!-- Counter -->
          <div class="flex items-end gap-1 select-none" role="group" aria-label="AI 自動化任務計數器" aria-live="polite">
            <template v-for="(t, i) in tokens">
              <!-- Digit wheel -->
              <div v-if="t.type==='digit'" :key="'d-'+i" class="overflow-hidden" :style="digitBoxStyle">
                <div class="flex flex-col will-change-transform" :style="digitColStyle(i)">
                  <div v-for="d in DIGITS" :key="d" ref="digitCellRef" class="h-[48px] sm:h-[56px] flex items-center justify-center font-semibold text-4xl md:text-5xl leading-none" :class="getDigitColorClass(i)">{{ d }}</div>
                </div>
              </div>
              <!-- Comma -->
              <div v-else :key="'c-'+i" class="flex items-center justify-center font-semibold text-4xl md:text-5xl leading-none" :class="getCommaColorClass(i)" :style="digitBoxStyle" aria-hidden="true">,</div>
            </template>
          </div>
          <div class="text-neutral-600 mt-2 text-sm">在 Zapier 上已自動化的 AI 任務（持續增加中）</div>

          <!-- Description -->
          <p class="mt-6 text-neutral-700 max-w-prose">創新者在 Zapier 讓 AI 真正上工。把 AI 直接接入你的工作流程、打造自訂代理人，確實兌現你的 AI 策略。</p>

          <!-- Highlights -->
          <div class="mt-6 grid sm:grid-cols-2 gap-4">
            <div class="flex items-start gap-3">
              <span class="inline-flex w-10 h-10 rounded border border-neutral-300 items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="32" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:inherit"><path d="M11 12H7.74996L13 5.75V12H16.25L11 18.25V16H8.99996V23.75L20.54 10H15V0.25L3.45996 14H11V12Z" fill="#d6d3d1"></path></svg>
              </span>
              <p class="text-neutral-500">將 300+ 種 AI 工具串接到近 8,000 個日常應用</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="inline-flex w-10 h-10 rounded border border-neutral-300 items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="32" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:inherit"><path d="M11 12H7.74996L13 5.75V12H16.25L11 18.25V16H8.99996V23.75L20.54 10H15V0.25L3.45996 14H11V12Z" fill="#d6d3d1"></path></svg>
              </span>
              <p class="text-neutral-500">打造你睡覺時也在運作的 AI 代理人</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="inline-flex w-10 h-10 rounded border border-neutral-300 items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="32" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:inherit"><path d="M11 12H7.74996L13 5.75V12H16.25L11 18.25V16H8.99996V23.75L20.54 10H15V0.25L3.45996 14H11V12Z" fill="#d6d3d1"></path></svg>
              </span>
              <p class="text-neutral-500">部署能自動解決客戶問題的聊天機器人</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="inline-flex w-10 h-10 rounded border border-neutral-300 items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="32" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="--color:inherit"><path d="M11 12H7.74996L13 5.75V12H16.25L11 18.25V16H8.99996V23.75L20.54 10H15V0.25L3.45996 14H11V12Z" fill="#d6d3d1"></path></svg>
              </span>
              <p class="text-neutral-500">用內建 AI 助理在數分鐘內建立工作流程</p>
            </div>
          </div>
        </div>

        <!-- Right: Chart -->
        <div>
          <div v-if="svgActive && !reducedMotion" v-html="animatedSvg" aria-hidden="true" class="w-full"></div>
          <div v-else v-html="staticSvg" aria-hidden="true" class="w-full"></div>
          <div class="flex justify-between text-neutral-600 text-xs mt-2">
            <span>2023 年 1 月</span>
            <span>今天</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/* Props */
const props = withDefaults(defineProps<{ initialNumber?: number; durationMs?: number }>(), {
  initialNumber: 326584131, // 初始計數值
  durationMs: 1400, // 1.4s between 1.2–1.6s
})

/* Constants */
const DIGITS = [0,1,2,3,4,5,6,7,8,9]
const EASE = 'cubic-bezier(0.25,1,0.5,1)'

/* State */
const sectionEl = ref<HTMLElement | null>(null)
const digitCellRef = ref<HTMLDivElement[] | null>(null)
const digitHeight = ref(56) // default fallback for SSR
const playing = ref(false)
const svgActive = ref(false)
const reducedMotion = ref(false)

// 動態計數器狀態
const currentNumber = ref(props.initialNumber)
let incrementTimer: number | null = null

/* 格式化數字為千分位字串 */
function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/* Parse number string into tokens */
function parseTokens(input: string): Array<{type:'digit'; value:number} | {type:'comma'}> {
  const out: Array<{type:'digit'; value:number} | {type:'comma'}> = []
  for (const ch of input) {
    if (ch === ',') out.push({ type: 'comma' })
    else if (/^[0-9]$/.test(ch)) out.push({ type: 'digit', value: Number(ch) })
  }
  return out
}

const formattedNumber = computed(() => formatNumber(currentNumber.value))
const tokens = computed(() => parseTokens(formattedNumber.value))

/* Styles */
const digitBoxStyle = computed(() => ({ width: '32px', height: `${digitHeight.value}px` }))
/* 隨機增長機制 */
function startRandomIncrement() {
  if (incrementTimer) return // 避免重複啟動

  function scheduleNextIncrement() {
    // 隨機間隔：2-5 秒
    const randomDelay = Math.random() * 3000 + 2000

    incrementTimer = window.setTimeout(() => {
      // 隨機增加 1-6 個數字
      const randomIncrement = Math.floor(Math.random() * 6) + 1
      currentNumber.value += randomIncrement

      // 安排下一次增長
      scheduleNextIncrement()
    }, randomDelay)
  }

  scheduleNextIncrement()
}

function stopRandomIncrement() {
  if (incrementTimer) {
    clearTimeout(incrementTimer)
    incrementTimer = null
  }
}

function digitColStyle(i: number) {
  const t = tokens.value[i]
  const y = t && (t as any).type === 'digit' ? (t as any).value * digitHeight.value : 0
  return {
    transform: `translateY(-${playing.value ? y : 0}px)`,
    transition: reducedMotion.value || !playing.value ? 'none' : `transform ${props.durationMs}ms ${EASE}`,
  }
}

/* 數字顏色類別函數 - 基於位置分配不同顏色 */
function getDigitColorClass(index: number): string {
  // 326,584,131 的結構：
  // 索引 0,1,2 = "326" → text-neutral-50
  // 索引 4,5,6 = "584" → text-neutral-200
  // 索引 8,9,10 = "131" → text-neutral-400
  if (index <= 2) return 'text-neutral-50'      // 326
  if (index >= 4 && index <= 6) return 'text-neutral-200'  // 584
  if (index >= 8 && index <= 10) return 'text-neutral-400' // 131
  return 'text-neutral-50' // 預設值
}

function getCommaColorClass(index: number): string {
  // 逗號的顏色跟隨後面的數字段
  if (index === 3) return 'text-neutral-200'  // 第一個逗號，後面是 584
  if (index === 7) return 'text-neutral-400'  // 第二個逗號，後面是 131
  return 'text-neutral-50' // 預設值
}

/* SVG chart variants */
const animatedSvg = computed(() => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 164 104" class="w-full">
    <defs>
      <pattern id=":R2ecotb5om:" width="2.5" height="2.5" patternUnits="userSpaceOnUse"><circle cx="1.25" cy="1.25" r="0.25" fill="#939084" opacity="1"></circle></pattern>
      <path id=":R2ecotb5omH1:" d="M0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0" fill="none" stroke="none"></path>
      <linearGradient id=":R2ecotb5omH2:" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="white"></stop><stop offset="50%" stop-color="white"></stop><stop offset="100%" stop-color="black"></stop></linearGradient>
      <mask id=":R2ecotb5omH3:"><rect width="100%" height="100%" fill="url(#:R2ecotb5omH2:)"></rect></mask>
    </defs>
    <path d="M0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0" fill="none" stroke="none"></path>
    <polyline points="0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0" fill="none" stroke="#FFFEFB" stroke-width="1" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"><animate attributeName="stroke-dashoffset" from="1" to="0" dur="2.5s" begin="0s" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.45, 0, 0.55, 1"></animate></polyline>
    <path d="M0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0 L160,100 L0,100 Z" fill="url(#:R2ecotb5om:)" opacity="0" mask="url(#:R2ecotb5omH3:)"><animate attributeName="opacity" from="0" to="1" dur="2.5s" begin="0s" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.32, 0, 0.67, 0"></animate></path>
    <circle r="2" fill="#A86F4B"><animateMotion dur="2.5s" fill="freeze" calcMode="spline" keyTimes="0; 1" keySplines="0.45, 0, 0.55, 1"><mpath href="#:R2ecotb5omH1:"></mpath></animateMotion></circle>
  </svg>`
})

const staticSvg = computed(() => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 164 104" class="w-full">
    <defs>
      <pattern id=":R2ecotb5om:" width="2.5" height="2.5" patternUnits="userSpaceOnUse"><circle cx="1.25" cy="1.25" r="0.25" fill="#939084" opacity="1"></circle></pattern>
      <path id=":R2ecotb5omH1:" d="M0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0" fill="none" stroke="none"></path>
      <linearGradient id=":R2ecotb5omH2:" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="white"></stop><stop offset="50%" stop-color="white"></stop><stop offset="100%" stop-color="black"></stop></linearGradient>
      <mask id=":R2ecotb5omH3:"><rect width="100%" height="100%" fill="url(#:R2ecotb5omH2:)"></rect></mask>
    </defs>
    <polyline points="0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0" fill="none" stroke="#FFFEFB" stroke-width="1"></polyline>
    <path d="M0,100 13.333333333333334,96.66666666666667 26.666666666666668,93.33333333333333 40,90 53.333333333333336,86.66666666666667 66.66666666666667,90 80,83.33333333333334 93.33333333333334,75 106.66666666666667,66.66666666666667 120,50 133.33333333333334,33.333333333333336 146.66666666666669,25 160,0 L160,100 L0,100 Z" fill="url(#:R2ecotb5om:)" opacity="1" mask="url(#:R2ecotb5omH3:)"></path>
    <circle r="2" fill="#A86F4B" />
  </svg>`
})

/* IO + measures */
let io: IntersectionObserver | null = null
function measure() {
  const anyCell = (digitCellRef.value || [])[0]
  if (anyCell && anyCell.offsetHeight) {
    digitHeight.value = anyCell.offsetHeight
  }
}

onMounted(() => {
  reducedMotion.value = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  measure()

  // 啟動隨機增長機制
  startRandomIncrement()

  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        svgActive.value = true
        requestAnimationFrame(() => { playing.value = true })
        if (io) { io.disconnect(); io = null }
      }
    })
  }, { threshold: 0.25 })
  if (sectionEl.value) io.observe(sectionEl.value)
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  if (io) io.disconnect()
  window.removeEventListener('resize', measure)

  // 清理定時器，避免記憶體洩漏
  stopRandomIncrement()
})
</script>

<style scoped>
/* 此區以原子類別為主，必要時再增補 */
#scale-ai {
  background-color: #201515;
    background-image: radial-gradient(#36342E 1px, transparent 1px);
    -webkit-background-size: 8px 8px;
    background-size: 8px 8px;
}
</style>
