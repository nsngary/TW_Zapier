const { test, expect } = require('@playwright/test');

test.describe('Header Navigation Analysis', () => {
  test('分析下拉選單的 HTML 結構和位置', async ({ page }) => {
    // 前往測試頁面
    await page.goto('http://localhost:3000/test-header');
    
    // 等待頁面載入
    await page.waitForLoadState('networkidle');
    
    console.log('=== 開始分析 Header Navigation 結構 ===');
    
    // 1. 分析主要容器結構
    const headerContainer = await page.locator('header .max-w-7xl').first();
    const headerBounds = await headerContainer.boundingBox();
    console.log('Header 容器邊界:', headerBounds);
    
    // 2. 分析導航選單項目
    const navItems = await page.locator('nav .relative.group');
    const navCount = await navItems.count();
    console.log(`找到 ${navCount} 個導航項目`);
    
    for (let i = 0; i < navCount; i++) {
      const navItem = navItems.nth(i);
      const buttonText = await navItem.locator('button').textContent();
      const navBounds = await navItem.boundingBox();
      console.log(`導航項目 ${i + 1}: "${buttonText.trim()}"`, navBounds);
    }
    
    // 3. 懸停並分析第一個下拉選單（產品功能）
    console.log('\n=== 分析「產品功能」下拉選單 ===');
    const productsNav = navItems.first();
    
    // 懸停觸發下拉選單
    await productsNav.hover();
    await page.waitForTimeout(300); // 等待動畫完成
    
    // 檢查下拉選單是否顯示
    const dropdown = productsNav.locator('.absolute.top-full');
    const isVisible = await dropdown.isVisible();
    console.log('下拉選單是否可見:', isVisible);
    
    if (isVisible) {
      const dropdownBounds = await dropdown.boundingBox();
      console.log('下拉選單邊界:', dropdownBounds);
      
      // 分析定位屬性
      const dropdownClasses = await dropdown.getAttribute('class');
      console.log('下拉選單 CSS 類名:', dropdownClasses);
      
      // 檢查是否超出視窗邊界
      const viewportSize = page.viewportSize();
      console.log('視窗大小:', viewportSize);
      
      if (dropdownBounds) {
        const rightEdge = dropdownBounds.x + dropdownBounds.width;
        const isOverflowing = rightEdge > viewportSize.width;
        console.log('是否溢出右邊界:', isOverflowing);
        console.log('右邊緣位置:', rightEdge, '視窗寬度:', viewportSize.width);
        
        // 檢查與 header 容器的對齊
        if (headerBounds) {
          const headerRightEdge = headerBounds.x + headerBounds.width;
          const alignmentDiff = Math.abs(rightEdge - headerRightEdge);
          console.log('與 header 容器的對齊差異:', alignmentDiff, 'px');
        }
      }
      
      // 分析內部結構
      const mainContent = dropdown.locator('.flex-1');
      const sidebar = dropdown.locator('.w-80');
      
      const mainContentBounds = await mainContent.boundingBox();
      const sidebarBounds = await sidebar.boundingBox();
      
      console.log('主要內容區邊界:', mainContentBounds);
      console.log('側邊欄邊界:', sidebarBounds);
    }
    
    // 4. 分析第二個下拉選單（解決方案）
    console.log('\n=== 分析「解決方案」下拉選單 ===');
    const solutionsNav = navItems.nth(1);
    
    // 先移開滑鼠，然後懸停到解決方案
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    await solutionsNav.hover();
    await page.waitForTimeout(300);
    
    const solutionsDropdown = solutionsNav.locator('.absolute.top-full');
    const solutionsVisible = await solutionsDropdown.isVisible();
    console.log('解決方案下拉選單是否可見:', solutionsVisible);
    
    if (solutionsVisible) {
      const solutionsDropdownBounds = await solutionsDropdown.boundingBox();
      console.log('解決方案下拉選單邊界:', solutionsDropdownBounds);
      
      const solutionsClasses = await solutionsDropdown.getAttribute('class');
      console.log('解決方案下拉選單 CSS 類名:', solutionsClasses);
    }
    
    // 5. 分析第三個下拉選單（資源中心）
    console.log('\n=== 分析「資源中心」下拉選單 ===');
    const resourcesNav = navItems.nth(2);
    
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    await resourcesNav.hover();
    await page.waitForTimeout(300);
    
    const resourcesDropdown = resourcesNav.locator('.absolute.top-full');
    const resourcesVisible = await resourcesDropdown.isVisible();
    console.log('資源中心下拉選單是否可見:', resourcesVisible);
    
    if (resourcesVisible) {
      const resourcesDropdownBounds = await resourcesDropdown.boundingBox();
      console.log('資源中心下拉選單邊界:', resourcesDropdownBounds);
      
      const resourcesClasses = await resourcesDropdown.getAttribute('class');
      console.log('資源中心下拉選單 CSS 類名:', resourcesClasses);
    }
    
    // 6. 測試懸停效果
    console.log('\n=== 測試懸停效果 ===');
    await productsNav.hover();
    await page.waitForTimeout(300);
    
    const groupItems = await page.locator('.group-item').all();
    console.log(`找到 ${groupItems.length} 個可懸停項目`);
    
    if (groupItems.length > 0) {
      const firstItem = groupItems[0];
      const h5Before = await firstItem.locator('h5').evaluate(el => getComputedStyle(el).color);
      console.log('懸停前 h5 顏色:', h5Before);
      
      await firstItem.hover();
      await page.waitForTimeout(100);
      
      const h5After = await firstItem.locator('h5').evaluate(el => getComputedStyle(el).color);
      console.log('懸停後 h5 顏色:', h5After);
      
      const colorChanged = h5Before !== h5After;
      console.log('顏色是否改變:', colorChanged);
    }
    
    console.log('\n=== 分析完成 ===');
  });
  
  test('截圖記錄下拉選單狀態', async ({ page }) => {
    await page.goto('http://localhost:3000/test-header');
    await page.waitForLoadState('networkidle');
    
    // 截圖：初始狀態
    await page.screenshot({ path: 'tests/screenshots/header-initial.png', fullPage: true });
    
    // 截圖：產品功能下拉選單
    const productsNav = page.locator('nav .relative.group').first();
    await productsNav.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/header-products-dropdown.png', fullPage: true });
    
    // 截圖：解決方案下拉選單
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    const solutionsNav = page.locator('nav .relative.group').nth(1);
    await solutionsNav.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/header-solutions-dropdown.png', fullPage: true });
    
    // 截圖：資源中心下拉選單
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);
    const resourcesNav = page.locator('nav .relative.group').nth(2);
    await resourcesNav.hover();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/header-resources-dropdown.png', fullPage: true });
    
    console.log('截圖已保存到 tests/screenshots/ 目錄');
  });
});
