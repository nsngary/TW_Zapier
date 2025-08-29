/**
 * 調試節點資料結構
 * 檢查儲存和載入的節點位置資料
 */

const { chromium } = require('playwright');

async function debugNodeData() {
  console.log('🔍 調試節點資料結構...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 攔截網路請求
  const apiRequests = [];
  const apiResponses = [];
  
  page.on('request', request => {
    if (request.url().includes('/api/') && request.url().includes('workflow')) {
      apiRequests.push({
        url: request.url(),
        method: request.method(),
        postData: request.postData(),
        timestamp: new Date().toISOString()
      });
    }
  });
  
  page.on('response', async response => {
    if (response.url().includes('/api/') && response.url().includes('workflow')) {
      try {
        const responseBody = await response.text();
        apiResponses.push({
          url: response.url(),
          status: response.status(),
          body: responseBody,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.log('無法讀取回應內容:', error.message);
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
    
    const workflowCard = page.locator('text=台灣金流整合工作流').first();
    if (await workflowCard.isVisible()) {
      console.log('🎯 點擊進入「台灣金流整合工作流」...');
      await workflowCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(4000);
    }
    
    // 分析載入的資料
    console.log('\n📊 === 分析載入的節點資料 ===');
    
    const loadResponses = apiResponses.filter(res => 
      res.url.includes('/workflow') && res.status === 200
    );
    
    loadResponses.forEach((response, index) => {
      console.log(`\n載入回應 ${index + 1}:`);
      console.log(`URL: ${response.url}`);
      
      try {
        const data = JSON.parse(response.body);
        if (data.nodes) {
          console.log(`節點數量: ${data.nodes.length}`);
          data.nodes.forEach((node, nodeIndex) => {
            console.log(`  節點 ${nodeIndex + 1} (${node.id}):`);
            console.log(`    類型: ${node.type}`);
            console.log(`    位置: ${JSON.stringify(node.position)}`);
            console.log(`    資料: ${JSON.stringify(node.data).substring(0, 100)}...`);
          });
        }
        
        if (data.edges) {
          console.log(`連線數量: ${data.edges.length}`);
          data.edges.forEach((edge, edgeIndex) => {
            console.log(`  連線 ${edgeIndex + 1} (${edge.id}):`);
            console.log(`    來源: ${edge.source} → 目標: ${edge.target}`);
            console.log(`    動畫: ${edge.animated}`);
            console.log(`    樣式: ${JSON.stringify(edge.style || {})}`);
          });
        }
        
        if (data.settings && data.settings.viewport) {
          console.log(`Viewport: ${JSON.stringify(data.settings.viewport)}`);
        }
      } catch (error) {
        console.log(`無法解析回應資料: ${error.message}`);
      }
    });
    
    // 檢查當前 Vue 實例中的節點資料
    console.log('\n📊 === 檢查 Vue 實例中的節點資料 ===');
    
    const vueNodeData = await page.evaluate(() => {
      // 嘗試從 Vue 實例中獲取節點資料
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        
        // 嘗試獲取 nodes 和 edges 的響應式資料
        const ctx = instance.ctx;
        if (ctx && ctx.nodes && ctx.edges) {
          return {
            nodes: ctx.nodes.value || ctx.nodes,
            edges: ctx.edges.value || ctx.edges
          };
        }
      }
      
      return { error: '無法獲取 Vue 實例資料' };
    });
    
    if (vueNodeData.nodes) {
      console.log(`Vue 實例節點數量: ${vueNodeData.nodes.length}`);
      vueNodeData.nodes.forEach((node, index) => {
        console.log(`  Vue 節點 ${index + 1} (${node.id}):`);
        console.log(`    位置: ${JSON.stringify(node.position)}`);
        console.log(`    類型: ${node.type}`);
      });
    } else {
      console.log('Vue 實例資料:', vueNodeData);
    }
    
    // 嘗試手動分散節點
    console.log('\n🔧 === 嘗試手動分散節點 ===');
    
    const manualSpread = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const results = [];
      
      nodes.forEach((node, index) => {
        const beforeRect = node.getBoundingClientRect();
        
        // 嘗試手動設置不同的位置
        const newX = 200 + (index * 300);
        const newY = 200 + (index * 150);
        
        // 直接修改節點的 transform
        node.style.transform = `translate(${newX}px, ${newY}px)`;
        
        const afterRect = node.getBoundingClientRect();
        
        results.push({
          index: index + 1,
          id: node.getAttribute('data-id'),
          before: { x: beforeRect.x, y: beforeRect.y },
          after: { x: afterRect.x, y: afterRect.y },
          targetPosition: { x: newX, y: newY }
        });
      });
      
      return results;
    });
    
    console.log('手動分散結果:');
    manualSpread.forEach(result => {
      console.log(`節點 ${result.index}:`);
      console.log(`  目標位置: (${result.targetPosition.x}, ${result.targetPosition.y})`);
      console.log(`  實際位置: (${result.after.x}, ${result.after.y})`);
      console.log(`  是否成功: ${Math.abs(result.after.x - result.before.x) > 10 ? '✅' : '❌'}`);
    });
    
    await page.waitForTimeout(2000);
    
    // 嘗試儲存手動分散的位置
    console.log('\n💾 === 嘗試儲存手動分散的位置 ===');
    
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(3000);
    
    // 分析儲存請求
    const saveRequests = apiRequests.filter(req => 
      req.method === 'PUT' && req.url.includes('/workflow')
    );
    
    saveRequests.forEach((request, index) => {
      console.log(`\n儲存請求 ${index + 1}:`);
      console.log(`URL: ${request.url}`);
      
      if (request.postData) {
        try {
          const data = JSON.parse(request.postData);
          if (data.nodes) {
            console.log(`儲存的節點數量: ${data.nodes.length}`);
            data.nodes.forEach((node, nodeIndex) => {
              console.log(`  儲存節點 ${nodeIndex + 1} (${node.id}):`);
              console.log(`    位置: ${JSON.stringify(node.position)}`);
            });
          }
          
          if (data.viewport) {
            console.log(`儲存的 Viewport: ${JSON.stringify(data.viewport)}`);
          }
        } catch (error) {
          console.log(`無法解析儲存資料: ${error.message}`);
        }
      }
    });
    
  } catch (error) {
    console.error('❌ 調試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行調試
if (require.main === module) {
  debugNodeData().catch(console.error);
}

module.exports = { debugNodeData };
