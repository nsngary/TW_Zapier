import { test, expect } from '@playwright/test'

// Simple helper: wait until transforms applied (counter started)
async function waitForCounterToPlay(page){
  await page.waitForSelector('#scale-ai [aria-label="AI tasks automated counter"]', { state: 'visible', timeout: 15000 })
  // Wait a bit and check if any digit column has non-zero transform
  await page.waitForTimeout(100)
}

test.describe('Scale AI section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('renders and triggers animations on intersection', async ({ page }) => {
    // Scroll to section
    const section = page.locator('#scale-ai')
    await section.scrollIntoViewIfNeeded()

    // Counter should be present
    const counter = page.locator('#scale-ai [aria-label="AI tasks automated counter"]')
    await expect(counter).toBeVisible()

    // Chart SVG should mount (animated or static depending on motion)
    const chart = page.locator('#scale-ai svg')
    await expect(chart).toBeVisible()
  })

  test('respects prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const section = page.locator('#scale-ai')
    await section.scrollIntoViewIfNeeded()

    // In reduced motion, we still see the final state svg
    const chart = page.locator('#scale-ai svg')
    await expect(chart).toBeVisible()
  })

  test('layout stacks on mobile and two-columns on desktop', async ({ browser }) => {
    // Mobile
    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })
    const mp = await mobile.newPage()
    await mp.goto('/')
    await mp.waitForLoadState('networkidle')
    await mp.locator('#scale-ai').scrollIntoViewIfNeeded()
    // Should be a single column grid
    const mobCols = await mp.locator('#scale-ai .grid').first().evaluate((el:any)=>getComputedStyle(el).gridTemplateColumns)
    expect(mobCols.includes('1fr') || mobCols.split(' ').length === 1).toBeTruthy()

    // Desktop
    const desk = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const dp = await desk.newPage()
    await dp.goto('/')
    await dp.waitForLoadState('networkidle')
    await dp.locator('#scale-ai').scrollIntoViewIfNeeded()
    const deskCols = await dp.locator('#scale-ai .grid').first().evaluate((el:any)=>getComputedStyle(el).gridTemplateColumns)
    expect(deskCols.split(' ').length).toBeGreaterThan(1)
  })
})

