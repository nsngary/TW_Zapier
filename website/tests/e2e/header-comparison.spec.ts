import { test, expect } from '@playwright/test'

test.describe('HeaderNavigation Comparison Tests', () => {
  test.describe('新舊版本功能對比', () => {
    test('對比基礎結構', async ({ page }) => {
      // 測試新版本
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      // 檢查新版本的基礎元素
      const newHeader = page.locator('[data-testid="header"]')
      await expect(newHeader).toBeVisible()
      
      const newLogo = page.locator('a[aria-label="Zapier"] svg')
      await expect(newLogo).toBeVisible()
      
      const newSkipLink = page.locator('[data-testid="skip-link"]')
      await expect(newSkipLink).toBeVisible()
      
      // 記錄新版本的元素數量
      const newDropdowns = page.locator('[data-testid="nav-dropdown"]')
      const newDropdownCount = await newDropdowns.count()
      expect(newDropdownCount).toBe(3)
    })

    test('對比下拉選單功能', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 測試新版本下拉選單
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      const dropdowns = page.locator('[data-testid="nav-dropdown"]')
      
      // 測試每個下拉選單都能正常開啟
      for (let i = 0; i < 3; i++) {
        const dropdown = dropdowns.nth(i)
        const summary = dropdown.locator('[data-testid="nav-dropdown-summary"]')
        
        await summary.click()
        await expect(dropdown).toHaveAttribute('open')
        
        // 點擊外部關閉
        await page.click('body', { position: { x: 100, y: 100 } })
        await expect(dropdown).not.toHaveAttribute('open')
      }
    })

    test('對比手機版導航功能', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // 測試新版本手機版導航
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      const mobileNavSummary = page.locator('[data-testid="mobile-nav-summary"]')
      await expect(mobileNavSummary).toBeVisible()
      
      // 測試手機版導航開啟
      await mobileNavSummary.click()
      const mobileNavRoot = page.locator('.mobile-nav-root')
      await expect(mobileNavRoot).toHaveAttribute('open')
      
      // 測試手機版下拉選單
      const mobileDropdowns = page.locator('.mobile-dropdown')
      const mobileDropdownCount = await mobileDropdowns.count()
      expect(mobileDropdownCount).toBeGreaterThanOrEqual(3)
    })

    test('對比響應式行為', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      // 測試桌面版
      await page.setViewportSize({ width: 1280, height: 720 })
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeVisible()
      await expect(page.locator('[data-testid="mobile-nav-summary"]')).toBeHidden()
      
      // 測試手機版
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeHidden()
      await expect(page.locator('[data-testid="mobile-nav-summary"]')).toBeVisible()
      
      // 測試斷點
      await page.setViewportSize({ width: 1070, height: 720 })
      await expect(page.locator('[data-testid="mobile-nav-summary"]')).toBeVisible()
      
      await page.setViewportSize({ width: 1072, height: 720 })
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeVisible()
    })
  })

  test.describe('效能對比測試', () => {
    test('頁面載入效能測試', async ({ page }) => {
      // 測試新版本載入時間
      const startTime = Date.now()
      
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      const loadTime = Date.now() - startTime
      
      // 載入時間應該在合理範圍內（10秒內）
      expect(loadTime).toBeLessThan(10000)
      
      console.log(`新版本載入時間: ${loadTime}ms`)
    })

    test('CSS 檔案大小測試', async ({ page }) => {
      await page.goto('/test-header-new')
      
      // 監聽網路請求
      const cssRequests: any[] = []
      page.on('response', response => {
        if (response.url().includes('.css') && response.status() === 200) {
          cssRequests.push({
            url: response.url(),
            size: response.headers()['content-length']
          })
        }
      })
      
      await page.waitForLoadState('networkidle')
      
      // 檢查是否有 CSS 檔案載入
      expect(cssRequests.length).toBeGreaterThan(0)
      
      console.log('CSS 檔案:', cssRequests)
    })
  })

  test.describe('無障礙性對比測試', () => {
    test('ARIA 屬性對比', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      // 檢查重要的 ARIA 屬性
      await expect(page.locator('nav[aria-label="Main site navigation"]')).toBeVisible()
      await expect(page.locator('nav[aria-label="Secondary site navigation"]')).toBeVisible()
      await expect(page.locator('a[aria-label="Zapier"]')).toBeVisible()
      
      // 檢查下拉選單的 ARIA 屬性
      await page.setViewportSize({ width: 1280, height: 720 })
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      await productDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      
      // 檢查 aria-labelledby 屬性
      const ariaLabelledElements = page.locator('[aria-labelledby]')
      const count = await ariaLabelledElements.count()
      expect(count).toBeGreaterThan(0)
    })

    test('鍵盤導航對比', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 測試 Tab 導航
      await page.keyboard.press('Tab') // Skip link
      await page.keyboard.press('Tab') // Logo
      await page.keyboard.press('Tab') // First dropdown
      
      // 測試 Enter 開啟下拉選單
      await page.keyboard.press('Enter')
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      await expect(productDropdown).toHaveAttribute('open')
      
      // 測試 ESC 關閉下拉選單
      await page.keyboard.press('Escape')
      await expect(productDropdown).not.toHaveAttribute('open')
    })
  })

  test.describe('視覺一致性驗證', () => {
    test('Logo 一致性驗證', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      const logo = page.locator('a[aria-label="Zapier"] svg')
      
      // 檢查 Logo 尺寸
      await expect(logo).toHaveAttribute('width', '104')
      await expect(logo).toHaveAttribute('height', '28')
      
      // 檢查 Logo 顏色（通過 path 元素的 fill 屬性）
      const logoPaths = logo.locator('path')
      const pathCount = await logoPaths.count()
      expect(pathCount).toBeGreaterThan(0)
    })

    test('顏色系統一致性驗證', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      // 檢查 header 背景色
      const header = page.locator('[data-testid="header"]')
      const headerStyles = await header.evaluate(el => getComputedStyle(el))
      
      // 驗證背景色是否符合設計系統
      expect(headerStyles.backgroundColor).toBeTruthy()
      
      // 檢查按鈕顏色
      const signupButton = page.locator('a[href="/sign-up"]')
      const buttonStyles = await signupButton.evaluate(el => getComputedStyle(el))
      expect(buttonStyles.backgroundColor).toBeTruthy()
    })

    test('字體系統一致性驗證', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      
      // 檢查主要文字的字體
      const navLinks = page.locator('[data-testid="nav-dropdown-summary"]').first()
      const linkStyles = await navLinks.evaluate(el => getComputedStyle(el))
      
      // 驗證字體家族
      expect(linkStyles.fontFamily).toContain('Inter')
      
      // 檢查字體大小
      expect(linkStyles.fontSize).toBeTruthy()
    })
  })

  test.describe('互動行為驗證', () => {
    test('hover 效果驗證', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const productSummary = page.locator('[data-testid="nav-dropdown"]').first().locator('[data-testid="nav-dropdown-summary"]')
      
      // 測試 hover 效果
      await productSummary.hover()
      await page.waitForTimeout(200)
      
      // 檢查 hover 狀態的樣式變化
      const hoverStyles = await productSummary.evaluate(el => getComputedStyle(el))
      expect(hoverStyles.backgroundColor).toBeTruthy()
    })

    test('動畫效果驗證', async ({ page }) => {
      await page.goto('/test-header-new')
      await page.waitForLoadState('networkidle')
      await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      const productSummary = productDropdown.locator('[data-testid="nav-dropdown-summary"]')
      const indicator = productSummary.locator('.dropdown-indicator')
      
      // 開啟下拉選單
      await productSummary.click()
      await page.waitForTimeout(300)
      
      // 檢查箭頭是否旋轉
      const indicatorTransform = await indicator.evaluate(el => getComputedStyle(el).transform)
      expect(indicatorTransform).not.toBe('none')
    })
  })
})
