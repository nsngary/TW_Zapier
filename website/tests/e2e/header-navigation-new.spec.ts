import { test, expect } from '@playwright/test'

test.describe('HeaderNavigationNew Component', () => {
  test.beforeEach(async ({ page }) => {
    // 導航到測試頁面
    await page.goto('/test-header-new')
    
    // 等待頁面完全載入
    await page.waitForLoadState('networkidle')
    
    // 等待 header 元素出現
    await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
  })

  test.describe('基礎結構測試', () => {
    test('應該正確渲染 header 元素', async ({ page }) => {
      const header = page.locator('[data-testid="header"]')
      await expect(header).toBeVisible()
      await expect(header).toHaveClass(/sticky/)
      await expect(header).toHaveClass(/top-0/)
    })

    test('應該正確渲染 Logo', async ({ page }) => {
      const logo = page.locator('a[aria-label="Zapier"] svg')
      await expect(logo).toBeVisible()
      await expect(logo).toHaveAttribute('width', '104')
      await expect(logo).toHaveAttribute('height', '28')
    })

    test('應該正確渲染 Skip to content 連結', async ({ page }) => {
      const skipLink = page.locator('[data-testid="skip-link"]')
      await expect(skipLink).toBeInViewport()
      await expect(skipLink).toHaveText('Skip to content')
    })
  })

  test.describe('桌面版導航測試', () => {
    test('應該在桌面版顯示主導航', async ({ page }) => {
      // 設置桌面版視窗大小
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const desktopNav = page.locator('nav[aria-label="Main site navigation"]')
      await expect(desktopNav).toBeVisible()
      
      // 檢查三個主要下拉選單
      const dropdowns = page.locator('[data-testid="nav-dropdown"]')
      await expect(dropdowns).toHaveCount(3)
      
      // 檢查下拉選單標題
      await expect(page.locator('text=產品')).toBeVisible()
      await expect(page.locator('text=實現')).toBeVisible()
      await expect(page.locator('text=資源')).toBeVisible()
    })

    test('應該正確顯示次要導航', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const secondaryNav = page.locator('nav[aria-label="Secondary site navigation"]')
      await expect(secondaryNav).toBeVisible()
      
      // 檢查次要導航連結
      await expect(page.locator('text=工作區')).toBeVisible()
      await expect(page.locator('text=探索')).toBeVisible()
      await expect(page.locator('text=聯絡銷售')).toBeVisible()
    })

    test('應該正確顯示認證連結', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const authLinks = page.locator('[data-testid="auth-links"]')
      await expect(authLinks).toBeVisible()
      
      await expect(page.locator('text=登入')).toBeVisible()
      await expect(page.locator('text=註冊')).toBeVisible()
    })
  })

  test.describe('下拉選單互動測試', () => {
    test('應該能夠開啟和關閉產品下拉選單', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      const productSummary = productDropdown.locator('[data-testid="nav-dropdown-summary"]')
      
      // 點擊開啟下拉選單
      await productSummary.click()
      await expect(productDropdown).toHaveAttribute('open')
      
      // 檢查下拉選單內容是否顯示
      await expect(page.locator('text=Zapier 自動化平台')).toBeVisible()
      await expect(page.locator('text=工作流程')).toBeVisible()
      
      // 點擊外部關閉下拉選單
      await page.click('body', { position: { x: 100, y: 100 } })
      await expect(productDropdown).not.toHaveAttribute('open')
    })

    test('應該實現互斥下拉選單功能', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const dropdowns = page.locator('[data-testid="nav-dropdown"]')
      const productDropdown = dropdowns.nth(0)
      const implementDropdown = dropdowns.nth(1)
      
      // 開啟產品下拉選單
      await productDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      await expect(productDropdown).toHaveAttribute('open')
      
      // 開啟實現下拉選單，應該關閉產品下拉選單
      await implementDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      await expect(implementDropdown).toHaveAttribute('open')
      await expect(productDropdown).not.toHaveAttribute('open')
    })

    test('應該支援 ESC 鍵關閉下拉選單', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      
      // 開啟下拉選單
      await productDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      await expect(productDropdown).toHaveAttribute('open')
      
      // 按 ESC 鍵關閉
      await page.keyboard.press('Escape')
      await expect(productDropdown).not.toHaveAttribute('open')
    })
  })

  test.describe('手機版導航測試', () => {
    test('應該在手機版顯示漢堡選單', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileNavSummary = page.locator('[data-testid="mobile-nav-summary"]')
      await expect(mobileNavSummary).toBeVisible()
      
      // 桌面版導航應該隱藏
      const desktopNav = page.locator('nav[aria-label="Main site navigation"]')
      await expect(desktopNav).toBeHidden()
    })

    test('應該能夠開啟手機版導航面板', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      const mobileNavRoot = page.locator('.mobile-nav-root')
      const mobileNavSummary = page.locator('[data-testid="mobile-nav-summary"]')
      
      // 點擊漢堡選單
      await mobileNavSummary.click()
      await expect(mobileNavRoot).toHaveAttribute('open')
      
      // 檢查手機版導航內容
      await expect(page.locator('text=產品')).toBeVisible()
      await expect(page.locator('text=實現')).toBeVisible()
      await expect(page.locator('text=資源')).toBeVisible()
    })
  })

  test.describe('響應式設計測試', () => {
    test('應該在不同螢幕尺寸正確切換', async ({ page }) => {
      // 桌面版
      await page.setViewportSize({ width: 1280, height: 720 })
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeVisible()
      await expect(page.locator('[data-testid="mobile-nav-summary"]')).toBeHidden()
      
      // 手機版
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeHidden()
      await expect(page.locator('[data-testid="mobile-nav-summary"]')).toBeVisible()
      
      // 平板版（邊界測試）
      await page.setViewportSize({ width: 1070, height: 768 })
      await expect(page.locator('[data-testid="mobile-nav-summary"]')).toBeVisible()
      
      await page.setViewportSize({ width: 1072, height: 768 })
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeVisible()
    })
  })

  test.describe('無障礙性測試', () => {
    test('應該具備正確的 ARIA 屬性', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 檢查導航的 aria-label
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeVisible()
      await expect(page.locator('nav[aria-label="Secondary site navigation"]')).toBeVisible()
      
      // 檢查 Logo 的 aria-label
      await expect(page.locator('a[aria-label="Zapier"]')).toBeVisible()
      
      // 檢查下拉選單的 aria-labelledby
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      await productDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      
      await expect(page.locator('[aria-labelledby="products-submenu-heading-products"]')).toBeVisible()
    })

    test('應該支援鍵盤導航', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // Tab 到第一個下拉選單
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab') // Skip to content -> Logo -> First dropdown
      await page.keyboard.press('Tab')
      
      // Enter 開啟下拉選單
      await page.keyboard.press('Enter')
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      await expect(productDropdown).toHaveAttribute('open')
      
      // ESC 關閉下拉選單
      await page.keyboard.press('Escape')
      await expect(productDropdown).not.toHaveAttribute('open')
    })
  })
})
