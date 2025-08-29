/**
 * 測試儲存功能
 * 簡化測試，專注於儲存功能
 */

const { chromium } = require('playwright');

async function testSaveFunction() {
  console.log('🧪 測試儲存功能...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 攔截所有 API 請求
  const apiRequests = [];
  
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      apiRequests.push({
        url: request.url(),
        method: request.method(),
        postData: request.postData(),
        timestamp: new Date().toISOString()
      });
      console.log(`📤 API 請求: ${request.method()} ${request.url()}`);
    }
  });
  
  // 監聽控制台訊息
  page.on('console', msg => {
    if (msg.text().includes('Ctrl+S') || 
        msg.text().includes('儲存') ||
        msg.text().includes('save') ||
        msg.text().includes('Save')) {
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
    
    // 進入 test 工作流
    const testWorkflow = page.locator('text=test').first();
    if (await testWorkflow.isVisible()) {
      console.log('🎯 點擊進入「test」工作流...');
      await testWorkflow.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
    }
    
    // 檢查當前工作流狀態
    const workflowState = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        return {
          currentWorkflowId: ctx.workflowDatabase?.currentWorkflowId?.value,
          isNewWorkflow: ctx.workflowDatabase?.isNewWorkflow?.value,
          hasUnsavedChanges: ctx.workflowDatabase?.hasUnsavedChanges?.value,
          nodeCount: ctx.nodes?.value?.length || 0
        };
      }
      return null;
    });
    
    console.log('\n📊 === 工作流狀態檢查 ===');
    if (workflowState) {
      console.log(`當前工作流ID: ${workflowState.currentWorkflowId}`);
      console.log(`是否為新工作流: ${workflowState.isNewWorkflow}`);
      console.log(`是否有未儲存變更: ${workflowState.hasUnsavedChanges}`);
      console.log(`節點數量: ${workflowState.nodeCount}`);
    }
    
    // 手動觸發一個小變更
    console.log('\n🖱️ === 手動觸發變更 ===');
    console.log('請手動拖動一個節點，然後等待 5 秒...');
    
    await page.waitForTimeout(5000);
    
    // 檢查變更後的狀態
    const afterChangeState = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        return {
          hasUnsavedChanges: ctx.workflowDatabase?.hasUnsavedChanges?.value,
          nodes: ctx.nodes?.value?.map(node => ({
            id: node.id,
            position: node.position
          })) || []
        };
      }
      return null;
    });
    
    if (afterChangeState) {
      console.log(`變更後未儲存狀態: ${afterChangeState.hasUnsavedChanges}`);
      console.log('節點位置:');
      afterChangeState.nodes.forEach((node, index) => {
        console.log(`  節點 ${index + 1}: ${JSON.stringify(node.position)}`);
      });
    }
    
    // 嘗試儲存
    console.log('\n💾 === 嘗試儲存 ===');
    console.log('按下 Ctrl+S...');
    
    // 清空之前的請求記錄
    apiRequests.length = 0;
    
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(5000); // 等待儲存完成
    
    // 檢查儲存請求
    const saveRequests = apiRequests.filter(req => 
      req.method === 'POST' && req.url.includes('/save')
    );
    
    console.log(`\n📤 儲存請求數量: ${saveRequests.length}`);
    
    if (saveRequests.length > 0) {
      saveRequests.forEach((request, index) => {
        console.log(`\n儲存請求 ${index + 1}:`);
        console.log(`URL: ${request.url}`);
        console.log(`時間: ${request.timestamp}`);
        
        if (request.postData) {
          try {
            const data = JSON.parse(request.postData);
            console.log(`節點數量: ${data.nodes?.length || 0}`);
            console.log(`連線數量: ${data.edges?.length || 0}`);
            console.log(`Viewport: ${JSON.stringify(data.viewport)}`);
            
            if (data.nodes) {
              console.log('節點位置:');
              data.nodes.forEach((node, nodeIndex) => {
                console.log(`  節點 ${nodeIndex + 1} (${node.id}): ${JSON.stringify(node.position)}`);
              });
            }
          } catch (error) {
            console.log(`無法解析儲存資料: ${error.message}`);
          }
        }
      });
    } else {
      console.log('❌ 沒有檢測到儲存請求');
      
      // 檢查是否有其他相關的 API 請求
      console.log('\n所有 API 請求:');
      apiRequests.forEach(req => {
        console.log(`  ${req.method} ${req.url}`);
      });
    }
    
    // 檢查儲存後的狀態
    const afterSaveState = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        return {
          hasUnsavedChanges: ctx.workflowDatabase?.hasUnsavedChanges?.value,
          saveStatus: ctx.saveStatus?.value
        };
      }
      return null;
    });
    
    if (afterSaveState) {
      console.log(`\n儲存後狀態:`);
      console.log(`  未儲存變更: ${afterSaveState.hasUnsavedChanges}`);
      console.log(`  儲存狀態: ${afterSaveState.saveStatus}`);
    }
    
    console.log('\n✅ 測試完成！');
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    console.log('\n🔍 瀏覽器保持開啟，您可以繼續檢查...');
    console.log('按 Ctrl+C 結束腳本');
    
    // 等待用戶手動結束
    await new Promise(() => {});
  }
}

// 執行測試
if (require.main === module) {
  testSaveFunction().catch(console.error);
}

module.exports = { testSaveFunction };
