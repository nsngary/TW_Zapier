/**
 * 調試節點位置儲存問題
 * 檢查為什麼節點位置沒有被正確儲存
 */

const { chromium } = require('playwright');

async function debugPositionSave() {
  console.log('🔍 調試節點位置儲存問題...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 攔截儲存請求
  const saveRequests = [];
  
  page.on('request', request => {
    if (request.method() === 'PUT' && request.url().includes('/workflow')) {
      const postData = request.postData();
      if (postData) {
        saveRequests.push({
          url: request.url(),
          data: postData,
          timestamp: new Date().toISOString()
        });
      }
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
    
    // 進入 test 工作流
    const testWorkflow = page.locator('text=test').first();
    if (await testWorkflow.isVisible()) {
      console.log('🎯 點擊進入「test」工作流...');
      await testWorkflow.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(4000);
    }
    
    // 檢查當前節點位置
    console.log('\n📊 === 檢查當前節點位置 ===');
    
    const currentPositions = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const id = node.getAttribute('data-id');
        
        nodeData.push({
          index: index + 1,
          id: id,
          domPosition: { x: Math.round(rect.x), y: Math.round(rect.y) },
          transform: node.style.transform
        });
      });
      
      return nodeData;
    });
    
    console.log('DOM 中的節點位置:');
    currentPositions.forEach(node => {
      console.log(`  節點 ${node.index} (${node.id}): DOM位置(${node.domPosition.x}, ${node.domPosition.y}), Transform: ${node.transform}`);
    });
    
    // 檢查 Vue 實例中的節點位置
    const vuePositions = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.nodes) {
          const nodes = ctx.nodes.value || ctx.nodes;
          return nodes.map(node => ({
            id: node.id,
            position: node.position,
            type: node.type
          }));
        }
      }
      
      return null;
    });
    
    if (vuePositions) {
      console.log('\nVue 實例中的節點位置:');
      vuePositions.forEach((node, index) => {
        console.log(`  節點 ${index + 1} (${node.id}): Vue位置${JSON.stringify(node.position)}, 類型: ${node.type}`);
      });
    }
    
    // 嘗試拖動第一個節點
    console.log('\n🖱️ === 嘗試拖動第一個節點 ===');
    
    const firstNode = page.locator('.vue-flow__node').first();
    const nodeBox = await firstNode.boundingBox();
    
    if (nodeBox) {
      console.log('拖動前檢查...');
      
      // 記錄拖動前的 Vue 位置
      const beforeDragVue = await page.evaluate(() => {
        const vueFlowElement = document.querySelector('.vue-flow');
        if (vueFlowElement && vueFlowElement.__vueParentComponent) {
          const instance = vueFlowElement.__vueParentComponent;
          const ctx = instance.ctx;
          
          if (ctx && ctx.nodes) {
            const nodes = ctx.nodes.value || ctx.nodes;
            return nodes[0] ? nodes[0].position : null;
          }
        }
        return null;
      });
      
      console.log(`拖動前 Vue 位置: ${JSON.stringify(beforeDragVue)}`);
      
      // 執行拖動
      console.log('執行拖動操作...');
      await page.mouse.move(nodeBox.x + nodeBox.width / 2, nodeBox.y + nodeBox.height / 2);
      await page.mouse.down();
      await page.mouse.move(nodeBox.x + 200, nodeBox.y + 100);
      await page.mouse.up();
      await page.waitForTimeout(2000); // 等待位置更新
      
      // 記錄拖動後的 Vue 位置
      const afterDragVue = await page.evaluate(() => {
        const vueFlowElement = document.querySelector('.vue-flow');
        if (vueFlowElement && vueFlowElement.__vueParentComponent) {
          const instance = vueFlowElement.__vueParentComponent;
          const ctx = instance.ctx;
          
          if (ctx && ctx.nodes) {
            const nodes = ctx.nodes.value || ctx.nodes;
            return nodes[0] ? nodes[0].position : null;
          }
        }
        return null;
      });
      
      console.log(`拖動後 Vue 位置: ${JSON.stringify(afterDragVue)}`);
      
      const positionChanged = JSON.stringify(beforeDragVue) !== JSON.stringify(afterDragVue);
      console.log(`位置是否改變: ${positionChanged ? '✅ 是' : '❌ 否'}`);
    }
    
    // 嘗試儲存
    console.log('\n💾 === 嘗試儲存工作流 ===');
    
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(3000);
    
    // 分析儲存請求
    if (saveRequests.length > 0) {
      console.log(`\n📤 儲存請求數量: ${saveRequests.length}`);
      
      saveRequests.forEach((request, index) => {
        console.log(`\n儲存請求 ${index + 1}:`);
        console.log(`時間: ${request.timestamp}`);
        
        try {
          const data = JSON.parse(request.data);
          
          if (data.nodes) {
            console.log(`節點數量: ${data.nodes.length}`);
            data.nodes.forEach((node, nodeIndex) => {
              console.log(`  儲存節點 ${nodeIndex + 1} (${node.id}):`);
              console.log(`    位置: ${JSON.stringify(node.position)}`);
              console.log(`    類型: ${node.type}`);
            });
          }
          
          if (data.viewport) {
            console.log(`Viewport: ${JSON.stringify(data.viewport)}`);
          }
          
        } catch (error) {
          console.log(`無法解析儲存資料: ${error.message}`);
        }
      });
    } else {
      console.log('❌ 沒有檢測到儲存請求');
    }
    
    // 最終檢查
    console.log('\n🔍 === 最終檢查 ===');
    
    const finalVuePositions = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.nodes) {
          const nodes = ctx.nodes.value || ctx.nodes;
          return nodes.map(node => ({
            id: node.id,
            position: node.position
          }));
        }
      }
      return null;
    });
    
    if (finalVuePositions) {
      console.log('最終 Vue 實例位置:');
      finalVuePositions.forEach((node, index) => {
        const hasValidPosition = node.position && 
                                node.position.x !== undefined && 
                                node.position.y !== undefined &&
                                (node.position.x !== 0 || node.position.y !== 0);
        
        console.log(`  節點 ${index + 1} (${node.id}): ${JSON.stringify(node.position)} ${hasValidPosition ? '✅' : '❌'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ 調試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行調試
if (require.main === module) {
  debugPositionSave().catch(console.error);
}

module.exports = { debugPositionSave };
