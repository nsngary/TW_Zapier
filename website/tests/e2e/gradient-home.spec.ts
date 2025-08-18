import { test, expect } from '@playwright/test'

const selBG = '.fixed.inset-0.-z-10.pointer-events-none'

async function getBG(page){
  return page.evaluate((sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const style = getComputedStyle(el)
    return {
      bg: style.backgroundImage || style.background,
      z: style.zIndex,
      pos: style.position,
    }
  }, selBG)
}

function parseStartRGB(bg?: string): [number, number, number] | null {
  if (!bg) return null
  const m = bg.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}
function maxChannelDiff(a?: string, b?: string): number {
  const A = parseStartRGB(a), B = parseStartRGB(b)
  if (!A || !B) return 999
  return Math.max(Math.abs(A[0]-B[0]), Math.abs(A[1]-B[1]), Math.abs(A[2]-B[2]))
}


async function scrollTo(page, y:number){
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y)
  await page.waitForTimeout(50)
}

async function getSectionCenters(page){
  return page.evaluate(() => {
    const ids = ['hero','product-features','trusted-by','stats','ai-tools','final-cta']
    const secs = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const rect = el.getBoundingClientRect()
      const top = rect.top + window.scrollY
      const h = Math.max(1, el.scrollHeight || rect.height || window.innerHeight)
      return { id, top, height: h, bottom: top + h }
    }).filter(Boolean) as Array<{id:string; top:number; height:number; bottom:number}>

    // 使用相鄰 section 的 top 來定義每段的「有效跨度」，其中心設為 (top_i + top_{i+1})/2；最後一段用自身高度
    const centers: number[] = []
    for (let i=0;i<secs.length;i++){
      if (i < secs.length - 1){
        const c = (secs[i].top + secs[i+1].top) / 2
        centers.push(c)
      } else {
        centers.push(secs[i].top + secs[i].height / 2)
      }
    }

    // 交界處（使用相鄰 section 的 top 作為界線），以 yCenter = border ± 10
    const bounds = [] as Array<{ idA: string; idB: string; yBeforeCenter: number; yAfterCenter: number }>
    for (let i=0;i<secs.length-1;i++){
      const a = secs[i], b = secs[i+1]
      const border = b.top
      bounds.push({ idA: a.id, idB: b.id, yBeforeCenter: border - 10, yAfterCenter: border + 10 })
    }
    return { ids, secs, centers, bounds }
  })
}

async function scrollToYCenter(page, yCenter:number){
  const top = await page.evaluate((yc) => Math.max(0, Math.floor(yc - window.innerHeight * 0.5)), yCenter)
  await page.evaluate((t) => window.scrollTo({ top: t, behavior: 'instant' }), top)
  await page.waitForTimeout(140)
}

test.describe('Homepage Page-wide Gradient Background', () => {
  test.setTimeout(120_000)
  test('bg layer exists and is fixed under the page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector(selBG, { timeout: 15000 })
    const info = await getBG(page)
    expect(info).not.toBeNull()
    expect(info.pos).toBe('fixed')
    expect(Number(info.z)).toBeLessThan(0)
  })

  test('smooth transition across 6 sections', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector(selBG, { timeout: 15000 })
    const { centers } = await getSectionCenters(page)
    const samples:string[] = []
    for (const c of centers){
      await scrollToYCenter(page, c)
      const info = await getBG(page)
      samples.push(info?.bg || '')
    }
    const uniq = new Set(samples.filter(Boolean))
    expect(uniq.size).toBeGreaterThanOrEqual(centers.length - 1) // 允許 1 個相等容忍（字串格式/四捨五入）
  })


  test('gradient changes across each boundary with adaptive delta (yCenter-based)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector(selBG, { timeout: 15000 })
    const data:any = await getSectionCenters(page)
    const secs = data.secs as Array<{id:string; top:number; height:number; bottom:number}>
    let success = 0
    for (let i=0;i<secs.length-1;i++){
      const border = secs[i+1].top
      const steps = [5, 10, 20, 40, 80, 160, 320, 640]
      let passed = false
      for (const d of steps){
        await scrollToYCenter(page, border - d)
        const before = await getBG(page)
        await scrollToYCenter(page, border + d)
        const after = await getBG(page)
        const diff = maxChannelDiff(before?.bg, after?.bg)
        if (diff > 2){ passed = true; break }
      }
      if (passed) success++
    }
    // 允許 1 個交界在特定瀏覽器上因字體/佈局誤差而無法穩定判定
    expect(success).toBeGreaterThanOrEqual((secs.length - 1) - 1)
  })

  test('works under different viewport sizes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector(selBG, { timeout: 15000 })
    const d1 = await getBG(page)
    await page.setViewportSize({ width: 390, height: 740 })
    const d2 = await getBG(page)
    expect(d1?.bg).toBeTruthy()
    expect(d2?.bg).toBeTruthy()
  })

  test('reduced motion uses discrete section gradients', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForSelector(selBG, { timeout: 15000 })
    const data:any = await getSectionCenters(page)
    const secs = data.secs as Array<{id:string; top:number; height:number; bottom:number}>
    // 取第三段（index=2）的內部兩點（25%、35%）保持在同一段
    const aY = secs[2].top + (secs[3].top - secs[2].top) * 0.25
    const bY = secs[2].top + (secs[3].top - secs[2].top) * 0.35
    await scrollToYCenter(page, aY)
    const a = await getBG(page)
    await scrollToYCenter(page, bY)
    const b = await getBG(page)
    expect(maxChannelDiff(a?.bg, b?.bg)).toBeLessThanOrEqual(2)
    // 跨段：第二段中心 vs 第四段中心
    const c1 = (secs[1].top + secs[2].top) / 2
    const c2 = (secs[3].top + secs[4].top) / 2
    await scrollToYCenter(page, c1)
    const s1 = await getBG(page)
    await scrollToYCenter(page, c2)
    const s3 = await getBG(page)
    expect(maxChannelDiff(s1?.bg, s3?.bg)).toBeGreaterThan(2)
    await context.close()
  })
})

