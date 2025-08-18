import { chromium } from '@playwright/test';
import fs from 'fs';

async function analyzeZapierDropdown() {
  console.log('🚀 啟動 Playwright 分析 Zapier 官方網站...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // 訪問 Zapier 官方網站
    console.log('📡 正在訪問 Zapier 官方網站...');
    await page.goto('https://zapier.com', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // 等待頁面完全載入
    await page.waitForTimeout(5000);
    
    // 分析 Products 下拉選單的結構
    console.log('🔍 分析 Products 下拉選單結構...');
    
    // 找到 Products 按鈕
    const productsButton = await page.locator('[data-testid="nav-dropdown-summary"]').first();
    
    if (await productsButton.isVisible()) {
      console.log('✅ 找到 Products 按鈕');
      
      // 獲取按鈕的位置和尺寸
      const buttonBox = await productsButton.boundingBox();
      console.log('📏 Products 按鈕位置:', buttonBox);
      
      // 點擊打開下拉選單
      await productsButton.click();
      await page.waitForTimeout(1000);
      
      // 分析下拉選單的位置
      const dropdown = await page.locator('.Submenu-module_root_BoW-D-ZP').first();
      
      if (await dropdown.isVisible()) {
        const dropdownBox = await dropdown.boundingBox();
        console.log('📏 下拉選單位置:', dropdownBox);
        
        // 計算相對位置
        const relativePosition = {
          offsetX: dropdownBox.x - buttonBox.x,
          offsetY: dropdownBox.y - (buttonBox.y + buttonBox.height),
          width: dropdownBox.width,
          height: dropdownBox.height
        };
        console.log('📐 相對位置計算:', relativePosition);
        
        // 分析 HTML 結構
        const htmlStructure = await page.locator('nav').first().innerHTML();
        console.log('🏗️ HTML 結構分析完成');
        
        // 截圖記錄
        await page.screenshot({
          path: 'public/zapier-dropdown-analysis.png',
          fullPage: true
        });
        console.log('📸 截圖已保存到 public/zapier-dropdown-analysis.png');
        
        // 分析 CSS 樣式
        const dropdownStyles = await dropdown.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            top: styles.top,
            left: styles.left,
            transform: styles.transform,
            width: styles.width,
            maxWidth: styles.maxWidth,
            zIndex: styles.zIndex
          };
        });
        console.log('🎨 下拉選單 CSS 樣式:', dropdownStyles);
        
        // 分析父容器的樣式
        const navContainer = await page.locator('nav').first();
        const navStyles = await navContainer.evaluate((el) => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            width: styles.width,
            maxWidth: styles.maxWidth,
            margin: styles.margin,
            padding: styles.padding
          };
        });
        console.log('🏗️ 導航容器 CSS 樣式:', navStyles);
        
        // 生成分析報告
        const report = {
          timestamp: new Date().toISOString(),
          buttonPosition: buttonBox,
          dropdownPosition: dropdownBox,
          relativePosition: relativePosition,
          dropdownStyles: dropdownStyles,
          navStyles: navStyles,
          recommendations: [
            '使用 position: absolute 定位下拉選單',
            '設置 left: 50%; transform: translateX(-50%) 實現居中對齊',
            '使用 max-width 限制下拉選單寬度',
            '確保 z-index 足夠高以覆蓋其他元素'
          ]
        };
        
        // 保存分析報告
        fs.writeFileSync(
          'public/zapier-analysis-report.json',
          JSON.stringify(report, null, 2)
        );
        console.log('📊 分析報告已保存到 public/zapier-analysis-report.json');
        
      } else {
        console.log('❌ 未找到下拉選單');
      }
    } else {
      console.log('❌ 未找到 Products 按鈕');
    }
    
  } catch (error) {
    console.error('❌ 分析過程中發生錯誤:', error);
  } finally {
    await browser.close();
    console.log('✅ Playwright 分析完成');
  }
}

// 執行分析
analyzeZapierDropdown().catch(console.error);
