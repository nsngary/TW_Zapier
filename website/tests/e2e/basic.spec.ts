import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Website Basic Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page loads
    await expect(page).toHaveTitle(/TW_Zapier/i)
    
    // Check for basic elements
    await expect(page.locator('body')).toBeVisible()
  })

  test('homepage has no critical accessibility violations', async ({ page }) => {
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

  test('respects prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce'
    })
    const page = await context.newPage()
    
    await page.goto('/')
    
    // Check that content is immediately visible (no long animations)
    await expect(page.locator('body')).toBeVisible()
    
    // Check that no elements have long-running animation classes
    const animatingElements = await page.locator('.is-animating').count()
    expect(animatingElements).toBe(0)
    
    await context.close()
  })

  test('header navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/')
    
    // Focus on the first navigation item
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus')
    await expect(focusedElement).toBeVisible()
  })
})
