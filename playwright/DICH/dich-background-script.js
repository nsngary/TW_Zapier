// 基於 scroll + requestAnimationFrame 的平滑背景漸變
// 需求：於各段落之間以 RGB 線性插值做平滑過渡；reduced‑motion 時改為瞬時切換。

const layer = document.createElement('div')
layer.className = 'bg-layer'
document.body.appendChild(layer)

// 品牌色序列：對應 .panel 順序
const COLOR_STOPS = [
  '#FFDFC4', // Section 1 (soft)
  '#C2474A', // Section 2 (accent)
  '#667539', // Section 3 (support)
  '#86735E', // Section 4 (primary)
]

// 對應各段落的輔助端色（帶透明度）
const AUX_ENDS = [
  'rgba(255, 168, 112, 0.20)', // Section 1 → 淡橘
  'rgba(145, 28, 32, 0.25)',   // Section 2 → 深紅
  'rgba(47, 93, 47, 0.22)',    // Section 3 → 深綠
  'rgba(90, 71, 56, 0.22)',    // Section 4 → 深棕
]

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 工具：顏色換算與插值
function hexToRgb(hex){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return { r: 0, g: 0, b: 0 }
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
}
function rgbToCss({ r, g, b }){ return `rgb(${r|0}, ${g|0}, ${b|0})` }
function lerp(a, b, t){ return a + (b - a) * t }
function mixColor(c1, c2, t){
  const A = hexToRgb(c1), B = hexToRgb(c2)
  return {
    r: Math.round(lerp(A.r, B.r, t)),
    g: Math.round(lerp(A.g, B.g, t)),
    b: Math.round(lerp(A.b, B.b, t)),
  }
}

// 取得段落與其頂部座標（文件座標系）
let sections = []
function computeSections(){
  sections = Array.from(document.querySelectorAll('.panel')).map((el, idx) => {
    const rect = el.getBoundingClientRect()
    const top = rect.top + window.scrollY
    const height = Math.max(1, el.offsetHeight || rect.height || window.innerHeight)
    return { el, idx, top, bottom: top + height, height }
  })
}

function findSpan(yCenter){
  // 找到使得 yCenter 落在 [start.bottom, end.top] 區間的相鄰段落
  for (let i = 0; i < sections.length - 1; i++){
    const a = sections[i], b = sections[i+1]
    if (yCenter >= a.top && yCenter <= b.top){
      const span = Math.max(1, b.top - a.top)
      const t = (yCenter - a.top) / span
      return { i, t }
    }
  }
  // 上/下邊界處理
  if (sections.length){
    if (yCenter < sections[0].top) return { i: 0, t: 0 }
    return { i: sections.length - 2, t: 1 }
  }
  return { i: 0, t: 0 }
}

// 主更新：根據 yCenter 計算顏色
function updateBackground(){
  if (!sections.length) return
  const yCenter = window.scrollY + window.innerHeight * 0.5
  if (prefersReduced){
    // 降級：對齊至最接近的段落顏色，不做連續插值
    let nearest = 0
    let minD = Infinity
    for (let i=0;i<sections.length;i++){
      const mid = (sections[i].top + sections[i].bottom) * 0.5
      const d = Math.abs(yCenter - mid)
      if (d < minD){ minD = d; nearest = i }
    }
    const idx = Math.min(nearest, COLOR_STOPS.length - 1)
    const start = COLOR_STOPS[idx]
    const end = AUX_ENDS[idx] || 'rgba(0,0,0,0.15)'
    layer.style.background = `linear-gradient(135deg, ${start} 0%, ${end} 70%)`
    return
  }

  const { i, t } = findSpan(yCenter)
  const c1 = COLOR_STOPS[Math.max(0, Math.min(i, COLOR_STOPS.length - 1))]
  const c2 = COLOR_STOPS[Math.max(0, Math.min(i + 1, COLOR_STOPS.length - 1))]
  const mix = mixColor(c1, c2, Math.max(0, Math.min(1, t)))

  // 決定對應段落的輔助端色：以靠近的段落端色為主，亦可插值端色（此處採靠近策略）
  const auxStartIdx = (t < 0.5) ? i : Math.min(i + 1, AUX_ENDS.length - 1)
  const aux = AUX_ENDS[auxStartIdx] || 'rgba(0,0,0,0.15)'

  // 以 Tailwind 類似的對角線漸層（to-br ≈ 135deg）
  const startCss = rgbToCss(mix)
  layer.style.background = `linear-gradient(135deg, ${startCss} 0%, ${aux} 70%)`
}

// rAF 節流 scroll/resize
let ticking = false
function onScroll(){
  if (!ticking){
    ticking = true
    requestAnimationFrame(() => { ticking = false; updateBackground() })
  }
}
function onResize(){
  computeSections()
  updateBackground()
}

computeSections()
updateBackground()
window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', onResize)

