import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Editor Application Tests', () => {
  test('editor loads successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page loads
    await expect(page).toHaveTitle(/TW_Zapier/i)
    
    // Check for basic elements
    await expect(page.locator('body')).toBeVisible()
  })

  test('editor has no critical accessibility violations', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    
    // Filter for critical violations only
    const criticalViolations = accessibilityScanResults.violations.filter(
      violation => violation.impact === 'critical'
    )
    
    expect(criticalViolations).toHaveLength(0)
  })

  test('canvas is keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    // Focus on the canvas area
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })

  test('respects prefers-reduced-motion for canvas interactions', async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce'
    })
    const page = await context.newPage()
    
    await page.goto('/')
    
    // Check that content is immediately visible (no long animations)
    await expect(page.locator('body')).toBeVisible()
    
    // Check that drag/transition animations are reduced or disabled
    const longAnimations = await page.evaluate(() => {
      const elements = document.querySelectorAll('*')
      let hasLongAnimations = false
      
      elements.forEach(el => {
        const styles = window.getComputedStyle(el)
        const animationDuration = parseFloat(styles.animationDuration || '0')
        const transitionDuration = parseFloat(styles.transitionDuration || '0')
        
        // Check if any animation/transition is longer than 120ms (reduced motion threshold)
        if (animationDuration > 0.12 || transitionDuration > 0.12) {
          hasLongAnimations = true
        }
      })
      
      return hasLongAnimations
    })
    
    expect(longAnimations).toBe(false)
    
    await context.close()
  })
})
