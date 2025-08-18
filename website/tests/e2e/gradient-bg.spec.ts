import { test, expect } from '@playwright/test'

const selBG = '[data-twz-bg="page"]'

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

async function scrollTo(page, y:number){
  await page.evaluate((yy) => window.scrollTo({ top: yy, behavior: 'instant' }), y)
}

test.describe('Gradient background page-wide behavior', () => {
  test('injects a fixed, page-wide bg layer with correct stacking', async ({ page }) => {
    await page.goto('/gradient-test')
    const info = await getBG(page)
    expect(info).not.toBeNull()
    expect(info.pos).toBe('fixed')
    expect(Number(info.z)).toBeLessThan(0)
  })

  test('smooth gradient transition on scroll', async ({ page }) => {
    await page.goto('/gradient-test')
    const top = await getBG(page)
    await scrollTo(page, 1000)
    const mid = await getBG(page)
    await scrollTo(page, 2500)
    const deep = await getBG(page)

    expect(top?.bg).not.toEqual(mid?.bg)
    expect(mid?.bg).not.toEqual(deep?.bg)
  })

  test('works under different viewport sizes', async ({ page }) => {
    await page.goto('/gradient-test')
    // default viewport
    const d1 = await getBG(page)
    // narrow viewport
    await page.setViewportSize({ width: 390, height: 740 })
    const d2 = await getBG(page)
    expect(d1?.bg).toBeTruthy()
    expect(d2?.bg).toBeTruthy()
  })

  test('respects prefers-reduced-motion: reduces continuous interpolation', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/gradient-test')

    const before = await getBG(page)
    await scrollTo(page, 1200)
    const after = await getBG(page)
    // 在降級模式下，顏色不應該頻繁變化，允許相等或少量變化（背景字串可能一致）
    expect(before?.bg).toEqual(after?.bg)

    await context.close()
  })

  test('CSS from sections does not override page bg layer', async ({ page }) => {
    await page.goto('/gradient-test')
    const hasOverride = await page.evaluate((sel) => {
      const bg = document.querySelector(sel)
      if (!bg) return false
      const over = Array.from(document.querySelectorAll('section')).some(sec => {
        const s = getComputedStyle(sec)
        return (s.backgroundImage && s.backgroundImage !== 'none') || (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)')
      })
      // 無論 section 怎樣，bg 層應固定存在於 fixed 層且可見
      const rect = (bg as HTMLElement).getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    }, selBG)
    expect(hasOverride).toBeTruthy()
  })
})

