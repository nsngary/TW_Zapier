<template>
  <!-- 渲染一個覆蓋整個首頁的背景區塊 -->
  <div
    ref="bgElement"
    class="fixed inset-0 -z-10 pointer-events-none"
    :style="{ background: bgStyle }"
  />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const bgElement = ref<HTMLElement | null>(null)

// 直接掃描首頁六個區塊 ID
const SECTION_IDS = ['hero','product-features','trusted-by','stats','ai-tools','final-cta']


// 六段對應顏色（每段中心主要色）
const COLOR_STOPS = [
  '#f7f5f3',   // hero: primary-50
  '#C2474A',   // product-features: accent red
  '#667539',   // trusted-by: support green
  '#86735E',   // stats: primary 500
  '#C07F56',   // ai-tools: accent orange
  '#54463d',   // final-cta: primary 800 深棕
]
// 六段對應的漸層結束端色（透明輔助色）
const AUX_ENDS = [
  'rgba(209,152,114,0.10)', // hero: accent-tan/10
  'rgba(145,28,32,0.25)',   // product-features 深紅
  'rgba(47,93,47,0.22)',    // trusted-by 深綠
  'rgba(90,71,56,0.22)',    // stats 深棕
  'rgba(192,127,86,0.20)',  // ai-tools 橘
  'rgba(70,58,51,0.22)',    // final-cta 更深棕（#463a33）
]

// 響應式背景樣式
const bgStyle = ref('linear-gradient(135deg, #f7f5f3 0%, rgba(209,152,114,0.10) 70%)')

// 檢查是否偏好減少動畫（需要在客戶端檢查）
let prefersReduced = false

function hexToRgb(hex:string){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return { r:0,g:0,b:0 }
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) }
}
function rgbToCss({r,g,b}:{r:number;g:number;b:number}){ return `rgb(${r|0}, ${g|0}, ${b|0})` }
function lerp(a:number,b:number,t:number){ return a + (b-a)*t }
function smoothStep(t:number){ return t * t * (3 - 2 * t) } // 平滑插值函數，消除斷層
function mixColor(c1:string,c2:string,t:number){
  const A=hexToRgb(c1), B=hexToRgb(c2)
  return { r:Math.round(lerp(A.r,B.r,t)), g:Math.round(lerp(A.g,B.g,t)), b:Math.round(lerp(A.b,B.b,t)) }
}

let sectionsPos: Array<{top:number; bottom:number; id:string}> = []
function computeSections(){
  const els = SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
  sectionsPos = els.map((el, idx, arr) => {
    const rect = el.getBoundingClientRect()
    const top = rect.top + window.scrollY
    // 對於非最後一段，以下一段 top 作為過渡終點能使交界處插值更精準
    const next = arr[idx+1]
    const bottom = next ? (next.getBoundingClientRect().top + window.scrollY) : (top + Math.max(1, el.scrollHeight || rect.height || window.innerHeight))
    return { top, bottom, id: el.id }
  })
}

function findSpan(yCenter:number){
  for (let i=0;i<sectionsPos.length-1;i++){
    const a=sectionsPos[i], b=sectionsPos[i+1]
    if (yCenter >= a.top && yCenter <= b.top){
      const span = Math.max(1, b.top - a.top)
      const t = (yCenter - a.top)/span
      return { i, t }
    }
  }
  if (sectionsPos.length){
    if (yCenter < sectionsPos[0].top) return { i:0, t:0 }
    return { i: sectionsPos.length-2, t:1 }
  }
  return { i:0, t:0 }
}

function updateBackground(){
  if (typeof window === 'undefined' || !sectionsPos.length) return
  const yCenter = window.scrollY + window.innerHeight*0.5
  if (prefersReduced){
    let nearest = 0, minD = Infinity
    for (let i=0;i<sectionsPos.length;i++){
      const mid = (sectionsPos[i].top + sectionsPos[i].bottom)/2
      const d = Math.abs(yCenter - mid)
      if (d < minD){ minD=d; nearest=i }
    }
    const start = COLOR_STOPS[Math.min(nearest, COLOR_STOPS.length-1)]
    const end = AUX_ENDS[Math.min(nearest, AUX_ENDS.length-1)]
    const bgStr = `linear-gradient(135deg, ${start} 0%, ${end} 70%)`
    bgStyle.value = bgStr
    return
  }
  const { i, t } = findSpan(yCenter)
  const c1 = COLOR_STOPS[Math.max(0, Math.min(i, COLOR_STOPS.length-1))]
  const c2 = COLOR_STOPS[Math.max(0, Math.min(i+1, COLOR_STOPS.length-1))]

  // 使用平滑插值來消除交界處的斷層感
  const smoothT = smoothStep(Math.max(0, Math.min(1, t)))
  const mix = mixColor(c1, c2, smoothT)

  // 輔助色也使用平滑過渡
  const auxIdx = (smoothT < 0.5) ? i : Math.min(i+1, AUX_ENDS.length-1)
  const aux = AUX_ENDS[auxIdx]
  const startCss = rgbToCss(mix)
  const bgStr = `linear-gradient(135deg, ${startCss} 0%, ${aux} 70%)`
  bgStyle.value = bgStr
}

let ticking = false
function onScroll(){
  if (!ticking){
    ticking = true
    requestAnimationFrame(() => { ticking=false; updateBackground() })
  }
}
function onResize(){ computeSections(); updateBackground() }

onMounted(() => {
  if (typeof window === 'undefined') return

  // 移除 body 的白色背景，讓背景層可見
  document.body.style.backgroundColor = 'transparent'

  // 檢查是否偏好減少動畫
  prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  computeSections()
  updateBackground()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.prose { max-width: 60ch }
</style>

