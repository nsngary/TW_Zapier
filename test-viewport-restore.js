/**
 * Viewport 恢復測試腳本
 * 專門測試 viewport 恢復功能
 */

const { chromium } = require('playwright');

async function testViewportRestore() {
  console.log('🎯 開始測試 Viewport 恢復功能...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 監聽控制台訊息
  const consoleMessages = [];
  page.on('console', msg => {
    const message = {
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    };
    consoleMessages.push(message);
    
    // 即時顯示 viewport 相關訊息
    if (msg.text().includes('viewport') || msg.text().includes('setViewport') || msg.text().includes('恢復')) {
      console.log(`📝 [${msg.type()}] ${msg.text()}`);
    }
  });
  
  try {
    // 登入並進入工作流
    await page.goto('http://localhost:3002/');
    await page.waitForLoadState('networkidle');
    
    const loginInput = page.locator('input[type="email"], input[placeholder*="帳號"]').first();
    if (await loginInput.isVisible()) {
      await loginInput.fill('001');
      await page.fill('input[type="password"], input[placeholder*="密碼"]', '123');
      await page.click('button[type="submit"], button:has-text("登入")');
      await page.waitForLoadState('networkidle');
    }
    
    await page.goto('http://localhost:3002/dashboard');
    await page.waitForLoadState('networkidle');
    
    const workflowCard = page.locator('text=台灣金流整合工作流').first();
    if (await workflowCard.isVisible()) {
      console.log('🎯 點擊進入「台灣金流整合工作流」...');
      await workflowCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(5000); // 等待更長時間確保完全載入
    }
    
    // 檢查載入後的狀態
    console.log('\n📊 === 載入後狀態檢查 ===');
    
    // 1. 檢查 Vue Flow 是否存在
    const vueFlowExists = await page.locator('.vue-flow').isVisible();
    console.log(`Vue Flow 存在: ${vueFlowExists}`);
    
    // 2. 檢查節點數量和位置
    const nodeInfo = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        nodeData.push({
          index,
          id: node.getAttribute('data-id'),
          position: {
            x: rect.x,
            y: rect.y
          },
          transform: node.style.transform,
          computedTransform: style.transform
        });
      });
      
      return {
        nodeCount: nodes.length,
        nodes: nodeData
      };
    });
    
    console.log(`節點數量: ${nodeInfo.nodeCount}`);
    nodeInfo.nodes.forEach((node, index) => {
      console.log(`節點 ${index + 1}: 位置(${node.position.x}, ${node.position.y}), transform: ${node.transform || '無'}`);
    });
    
    // 3. 檢查 Vue Flow viewport 狀態
    const viewportInfo = await page.evaluate(() => {
      const vueFlow = document.querySelector('.vue-flow');
      const viewport = document.querySelector('.vue-flow__viewport');
      
      if (!vueFlow || !viewport) {
        return { error: 'Vue Flow 或 viewport 元素不存在' };
      }
      
      const vueFlowStyle = window.getComputedStyle(vueFlow);
      const viewportStyle = window.getComputedStyle(viewport);
      
      return {
        vueFlow: {
          transform: vueFlow.style.transform,
          computedTransform: vueFlowStyle.transform
        },
        viewport: {
          transform: viewport.style.transform,
          computedTransform: viewportStyle.transform
        }
      };
    });
    
    console.log('\nViewport 狀態:');
    console.log(JSON.stringify(viewportInfo, null, 2));
    
    // 4. 嘗試手動調用 setViewport
    console.log('\n🔧 === 手動測試 setViewport ===');
    
    const setViewportResult = await page.evaluate(() => {
      // 嘗試獲取 Vue 實例並調用 setViewport
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        try {
          // 嘗試從 Vue 實例中獲取 setViewport 函數
          const instance = vueFlowElement.__vueParentComponent;
          console.log('找到 Vue 實例:', instance);
          
          // 手動設置 viewport
          const testViewport = { x: 100, y: 100, zoom: 1.5 };
          console.log('嘗試設置 viewport:', testViewport);
          
          // 直接修改 viewport 元素的 transform
          const viewport = document.querySelector('.vue-flow__viewport');
          if (viewport) {
            viewport.style.transform = `translate(${testViewport.x}px, ${testViewport.y}px) scale(${testViewport.zoom})`;
            return { success: true, applied: testViewport };
          }
          
          return { success: false, error: 'viewport 元素不存在' };
        } catch (error) {
          return { success: false, error: error.message };
        }
      }
      return { success: false, error: 'Vue 實例不存在' };
    });
    
    console.log('手動 setViewport 結果:', setViewportResult);
    
    await page.waitForTimeout(2000);
    
    // 5. 檢查手動設置後的效果
    const afterManualSet = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodePositions = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        nodePositions.push({
          index,
          position: { x: rect.x, y: rect.y }
        });
      });
      
      return nodePositions;
    });
    
    console.log('\n手動設置後節點位置:');
    afterManualSet.forEach(node => {
      console.log(`節點 ${node.index + 1}: (${node.position.x}, ${node.position.y})`);
    });
    
    // 6. 分析控制台訊息
    console.log('\n📝 === 控制台訊息分析 ===');
    const viewportMessages = consoleMessages.filter(msg => 
      msg.text.includes('viewport') || 
      msg.text.includes('setViewport') || 
      msg.text.includes('恢復') ||
      msg.text.includes('fitView')
    );
    
    console.log(`Viewport 相關訊息數量: ${viewportMessages.length}`);
    viewportMessages.forEach(msg => {
      console.log(`[${msg.type}] ${msg.timestamp}: ${msg.text}`);
    });
    
    const errorMessages = consoleMessages.filter(msg => msg.type === 'error');
    if (errorMessages.length > 0) {
      console.log(`\n錯誤訊息數量: ${errorMessages.length}`);
      errorMessages.slice(0, 3).forEach(msg => {
        console.log(`[ERROR] ${msg.text}`);
      });
    }
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行測試
if (require.main === module) {
  testViewportRestore().catch(console.error);
}

module.exports = { testViewportRestore };
