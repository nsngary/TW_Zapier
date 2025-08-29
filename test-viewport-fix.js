/**
 * 測試 Viewport 修正功能
 * 驗證節點位置恢復是否正常工作
 */

const { chromium } = require('playwright');

async function testViewportFix() {
  console.log('🧪 測試 Viewport 修正功能...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 監聽控制台訊息
  page.on('console', msg => {
    if (msg.text().includes('viewport') || 
        msg.text().includes('可視節點') || 
        msg.text().includes('fitView') ||
        msg.text().includes('✅') ||
        msg.text().includes('⚠️')) {
      console.log(`📝 ${msg.text()}`);
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
      await page.waitForTimeout(6000); // 等待修正邏輯完成
    }
    
    // 檢查修正後的狀態
    console.log('\n📊 === 修正後狀態檢查 ===');
    
    const nodeStatus = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      let visibleNodes = 0;
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.left >= 0 && 
                           rect.bottom <= window.innerHeight && 
                           rect.right <= window.innerWidth;
        
        if (isInViewport) visibleNodes++;
        
        nodeData.push({
          index: index + 1,
          position: { x: Math.round(rect.x), y: Math.round(rect.y) },
          size: { width: Math.round(rect.width), height: Math.round(rect.height) },
          isVisible: isInViewport
        });
      });
      
      return {
        totalNodes: nodes.length,
        visibleNodes: visibleNodes,
        nodes: nodeData,
        windowSize: { width: window.innerWidth, height: window.innerHeight }
      };
    });
    
    console.log(`總節點數: ${nodeStatus.totalNodes}`);
    console.log(`可見節點數: ${nodeStatus.visibleNodes}`);
    console.log(`視窗大小: ${nodeStatus.windowSize.width}x${nodeStatus.windowSize.height}`);
    
    nodeStatus.nodes.forEach(node => {
      const status = node.isVisible ? '✅ 可見' : '❌ 不可見';
      console.log(`節點 ${node.index}: (${node.position.x}, ${node.position.y}) ${node.size.width}x${node.size.height} ${status}`);
    });
    
    // 檢查 viewport 狀態
    const viewportInfo = await page.evaluate(() => {
      const viewport = document.querySelector('.vue-flow__viewport');
      if (!viewport) return { error: 'viewport 不存在' };
      
      return {
        transform: viewport.style.transform,
        computedTransform: window.getComputedStyle(viewport).transform
      };
    });
    
    console.log('\nViewport 狀態:');
    console.log(`Transform: ${viewportInfo.transform}`);
    console.log(`Computed: ${viewportInfo.computedTransform}`);
    
    // 測試結果評估
    console.log('\n🎯 === 測試結果評估 ===');
    
    if (nodeStatus.visibleNodes === nodeStatus.totalNodes) {
      console.log('✅ 成功：所有節點都在可視範圍內');
    } else if (nodeStatus.visibleNodes > 0) {
      console.log(`⚠️ 部分成功：${nodeStatus.visibleNodes}/${nodeStatus.totalNodes} 節點可見`);
    } else {
      console.log('❌ 失敗：沒有節點在可視範圍內');
    }
    
    // 測試拖動功能
    console.log('\n🖱️ === 測試拖動功能 ===');
    
    if (nodeStatus.visibleNodes > 0) {
      try {
        const firstVisibleNode = page.locator('.vue-flow__node').first();
        const nodeBox = await firstVisibleNode.boundingBox();
        
        if (nodeBox) {
          console.log('嘗試拖動第一個可見節點...');
          
          // 記錄拖動前位置
          const beforeDrag = await page.evaluate(() => {
            const node = document.querySelector('.vue-flow__node');
            const rect = node.getBoundingClientRect();
            return { x: Math.round(rect.x), y: Math.round(rect.y) };
          });
          
          // 執行拖動
          await page.mouse.move(nodeBox.x + nodeBox.width / 2, nodeBox.y + nodeBox.height / 2);
          await page.mouse.down();
          await page.mouse.move(nodeBox.x + 100, nodeBox.y + 50);
          await page.mouse.up();
          await page.waitForTimeout(1000);
          
          // 記錄拖動後位置
          const afterDrag = await page.evaluate(() => {
            const node = document.querySelector('.vue-flow__node');
            const rect = node.getBoundingClientRect();
            return { x: Math.round(rect.x), y: Math.round(rect.y) };
          });
          
          console.log(`拖動前位置: (${beforeDrag.x}, ${beforeDrag.y})`);
          console.log(`拖動後位置: (${afterDrag.x}, ${afterDrag.y})`);
          
          const moved = beforeDrag.x !== afterDrag.x || beforeDrag.y !== afterDrag.y;
          console.log(moved ? '✅ 拖動功能正常' : '❌ 拖動功能異常');
        }
      } catch (error) {
        console.log('❌ 拖動測試失敗:', error.message);
      }
    } else {
      console.log('⚠️ 沒有可見節點，跳過拖動測試');
    }
    
    // 最終評估
    console.log('\n🏆 === 最終評估 ===');
    
    const success = nodeStatus.visibleNodes === nodeStatus.totalNodes;
    const partial = nodeStatus.visibleNodes > 0 && nodeStatus.visibleNodes < nodeStatus.totalNodes;
    
    if (success) {
      console.log('🎉 測試通過：節點位置恢復功能正常工作');
    } else if (partial) {
      console.log('⚠️ 測試部分通過：需要進一步調整');
    } else {
      console.log('❌ 測試失敗：節點位置恢復功能需要修正');
    }
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行測試
if (require.main === module) {
  testViewportFix().catch(console.error);
}

module.exports = { testViewportFix };
