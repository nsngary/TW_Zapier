import { test, expect } from '@playwright/test'

test.describe('HeaderNavigationNew Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 導航到測試頁面
    await page.goto('/test-header-new')
    
    // 等待頁面完全載入
    await page.waitForLoadState('networkidle')
    
    // 等待 header 元素出現
    await page.waitForSelector('[data-testid="header"]', { timeout: 10000 })
    
    // 等待字體載入
    await page.waitForTimeout(1000)
  })

  test.describe('桌面版視覺測試', () => {
    test('桌面版初始狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 截取 header 區域
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('desktop-header-initial.png')
    })

    test('產品下拉選單開啟狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 開啟產品下拉選單
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      await productDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      
      // 等待動畫完成
      await page.waitForTimeout(300)
      
      // 截取整個頁面（包含下拉選單）
      await expect(page).toHaveScreenshot('desktop-products-dropdown.png')
    })

    test('實現下拉選單開啟狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 開啟實現下拉選單
      const implementDropdown = page.locator('[data-testid="nav-dropdown"]').nth(1)
      await implementDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      
      // 等待動畫完成
      await page.waitForTimeout(300)
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('desktop-implement-dropdown.png')
    })

    test('資源下拉選單開啟狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 開啟資源下拉選單
      const resourcesDropdown = page.locator('[data-testid="nav-dropdown"]').nth(2)
      await resourcesDropdown.locator('[data-testid="nav-dropdown-summary"]').click()
      
      // 等待動畫完成
      await page.waitForTimeout(300)
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('desktop-resources-dropdown.png')
    })

    test('hover 狀態測試', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // hover 到產品下拉選單
      const productSummary = page.locator('[data-testid="nav-dropdown"]').first().locator('[data-testid="nav-dropdown-summary"]')
      await productSummary.hover()
      
      // 等待 hover 效果
      await page.waitForTimeout(200)
      
      // 截取 header
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('desktop-header-hover.png')
    })
  })

  test.describe('手機版視覺測試', () => {
    test('手機版初始狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // 截取 header 區域
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('mobile-header-initial.png')
    })

    test('手機版導航面板開啟狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // 開啟手機版導航
      const mobileNavSummary = page.locator('[data-testid="mobile-nav-summary"]')
      await mobileNavSummary.click()
      
      // 等待滑出動畫完成
      await page.waitForTimeout(400)
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('mobile-nav-panel-open.png')
    })

    test('手機版下拉選單展開狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // 開啟手機版導航
      const mobileNavSummary = page.locator('[data-testid="mobile-nav-summary"]')
      await mobileNavSummary.click()
      await page.waitForTimeout(400)
      
      // 展開產品下拉選單
      const mobileProductDropdown = page.locator('.mobile-dropdown').first()
      await mobileProductDropdown.locator('.mobile-dropdown-summary').click()
      await page.waitForTimeout(200)
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('mobile-dropdown-expanded.png')
    })
  })

  test.describe('平板版視覺測試', () => {
    test('平板版初始狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      
      // 截取 header 區域
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('tablet-header-initial.png')
    })

    test('平板版導航面板開啟狀態截圖', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      
      // 開啟導航面板
      const mobileNavSummary = page.locator('[data-testid="mobile-nav-summary"]')
      await mobileNavSummary.click()
      await page.waitForTimeout(400)
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('tablet-nav-panel-open.png')
    })
  })

  test.describe('響應式斷點測試', () => {
    test('1071px 斷點測試（手機版）', async ({ page }) => {
      await page.setViewportSize({ width: 1070, height: 720 })
      
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('breakpoint-1070-mobile.png')
    })

    test('1072px 斷點測試（桌面版）', async ({ page }) => {
      await page.setViewportSize({ width: 1072, height: 720 })
      
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('breakpoint-1072-desktop.png')
    })

    test('中等螢幕文字隱藏測試', async ({ page }) => {
      // 測試 1071px 到 1280px 之間的文字隱藏功能
      await page.setViewportSize({ width: 1150, height: 720 })
      
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('medium-screen-text-hidden.png')
    })
  })

  test.describe('動畫狀態測試', () => {
    test('箭頭旋轉動畫測試', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      const productSummary = productDropdown.locator('[data-testid="nav-dropdown-summary"]')
      
      // 開啟下拉選單
      await productSummary.click()
      
      // 等待動畫完成
      await page.waitForTimeout(300)
      
      // 截取箭頭旋轉後的狀態
      await expect(productSummary).toHaveScreenshot('arrow-rotated.png')
    })

    test('底部指示線動畫測試', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      const productDropdown = page.locator('[data-testid="nav-dropdown"]').first()
      const productSummary = productDropdown.locator('[data-testid="nav-dropdown-summary"]')
      
      // 開啟下拉選單
      await productSummary.click()
      
      // 等待動畫完成
      await page.waitForTimeout(300)
      
      // 截取底部指示線
      await expect(productSummary).toHaveScreenshot('bottom-indicator.png')
    })
  })

  test.describe('主題和顏色測試', () => {
    test('預設主題顏色測試', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 截取完整 header 以驗證顏色
      const header = page.locator('[data-testid="header"]')
      await expect(header).toHaveScreenshot('default-theme-colors.png')
    })

    test('按鈕樣式測試', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 截取認證區域的按鈕
      const authLinks = page.locator('[data-testid="auth-links"]')
      await expect(authLinks).toHaveScreenshot('auth-buttons.png')
    })

    test('按鈕 hover 狀態測試', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // hover 到註冊按鈕
      const signupButton = page.locator('a[href="/sign-up"]')
      await signupButton.hover()
      await page.waitForTimeout(200)
      
      // 截取 hover 狀態
      const authLinks = page.locator('[data-testid="auth-links"]')
      await expect(authLinks).toHaveScreenshot('signup-button-hover.png')
    })
  })

  test.describe('完整頁面截圖', () => {
    test('完整桌面版頁面截圖', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('full-desktop-page.png', { fullPage: true })
    })

    test('完整手機版頁面截圖', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      
      // 截取整個頁面
      await expect(page).toHaveScreenshot('full-mobile-page.png', { fullPage: true })
    })
  })
})
