/**
 * 手動拖動測試腳本
 * 等待用戶手動拖動節點後檢查位置變化
 */

const { chromium } = require('playwright');

async function debugManualDrag() {
  console.log('🔍 手動拖動測試...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
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
        console.log('📤 檢測到儲存請求!');
      }
    }
  });
  
  // 監聽控制台訊息
  page.on('console', msg => {
    if (msg.text().includes('更新節點') || 
        msg.text().includes('拖動完成') || 
        msg.text().includes('Ctrl+S') ||
        msg.text().includes('儲存')) {
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
      await page.waitForTimeout(2000);
    }
    
    console.log('\n⏰ 等待 5 秒讓頁面完全載入...');
    await page.waitForTimeout(5000);
    
    // 檢查初始位置
    console.log('\n📊 === 初始節點位置 ===');
    
    const initialPositions = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.nodes) {
          const nodes = ctx.nodes.value || ctx.nodes;
          return nodes.map(node => ({
            id: node.id,
            position: node.position,
            data: { label: node.data?.label, nodeType: node.data?.nodeType }
          }));
        }
      }
      return null;
    });
    
    if (initialPositions) {
      console.log('初始 Vue 實例位置:');
      initialPositions.forEach((node, index) => {
        console.log(`  節點 ${index + 1} (${node.data.label || node.data.nodeType}): ${JSON.stringify(node.position)}`);
      });
    }
    
    // 等待用戶手動拖動
    console.log('\n🖱️ === 請手動拖動節點 ===');
    console.log('請在瀏覽器中手動拖動一個或多個節點到新位置');
    console.log('拖動完成後，請等待 10 秒，腳本會自動檢查位置變化...');
    
    await page.waitForTimeout(10000); // 等待 10 秒讓用戶拖動
    
    // 檢查拖動後的位置
    console.log('\n📊 === 拖動後節點位置 ===');
    
    const afterDragPositions = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.nodes) {
          const nodes = ctx.nodes.value || ctx.nodes;
          return nodes.map(node => ({
            id: node.id,
            position: node.position,
            data: { label: node.data?.label, nodeType: node.data?.nodeType }
          }));
        }
      }
      return null;
    });
    
    if (afterDragPositions && initialPositions) {
      console.log('拖動後 Vue 實例位置:');
      let changedNodes = 0;
      
      afterDragPositions.forEach((node, index) => {
        const initial = initialPositions[index];
        const positionChanged = JSON.stringify(initial.position) !== JSON.stringify(node.position);
        
        if (positionChanged) changedNodes++;
        
        console.log(`  節點 ${index + 1} (${node.data.label || node.data.nodeType}): ${JSON.stringify(node.position)} ${positionChanged ? '✅ 已變更' : '⚪ 未變更'}`);
      });
      
      console.log(`\n位置變更統計: ${changedNodes}/${afterDragPositions.length} 個節點位置已變更`);
    }
    
    // 檢查是否有未儲存變更
    const hasUnsavedChanges = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.workflowDatabase) {
          return ctx.workflowDatabase.hasUnsavedChanges?.value || false;
        }
      }
      return false;
    });
    
    console.log(`\n未儲存變更狀態: ${hasUnsavedChanges ? '✅ 有未儲存變更' : '❌ 無未儲存變更'}`);
    
    // 嘗試儲存
    console.log('\n💾 === 嘗試儲存工作流 ===');
    console.log('按下 Ctrl+S 儲存...');
    
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(3000);
    
    // 檢查儲存請求
    if (saveRequests.length > 0) {
      console.log(`\n📤 儲存請求數量: ${saveRequests.length}`);
      
      saveRequests.forEach((request, index) => {
        console.log(`\n儲存請求 ${index + 1}:`);
        console.log(`時間: ${request.timestamp}`);
        
        try {
          const data = JSON.parse(request.data);
          
          if (data.nodes) {
            console.log(`儲存的節點數量: ${data.nodes.length}`);
            data.nodes.forEach((node, nodeIndex) => {
              console.log(`  儲存節點 ${nodeIndex + 1}:`);
              console.log(`    ID: ${node.id}`);
              console.log(`    位置: ${JSON.stringify(node.position)}`);
              console.log(`    類型: ${node.type}`);
            });
          }
          
          if (data.viewport) {
            console.log(`儲存的 Viewport: ${JSON.stringify(data.viewport)}`);
          }
          
        } catch (error) {
          console.log(`無法解析儲存資料: ${error.message}`);
        }
      });
    } else {
      console.log('❌ 沒有檢測到儲存請求');
    }
    
    // 最終檢查儲存後的狀態
    const finalHasUnsavedChanges = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.workflowDatabase) {
          return ctx.workflowDatabase.hasUnsavedChanges?.value || false;
        }
      }
      return false;
    });
    
    console.log(`\n儲存後未儲存變更狀態: ${finalHasUnsavedChanges ? '❌ 仍有未儲存變更' : '✅ 已儲存'}`);
    
    // 測試重新載入
    console.log('\n🔄 === 測試重新載入 ===');
    console.log('重新載入頁面測試位置恢復...');
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // 檢查重新載入後的位置
    const reloadedPositions = await page.evaluate(() => {
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement && vueFlowElement.__vueParentComponent) {
        const instance = vueFlowElement.__vueParentComponent;
        const ctx = instance.ctx;
        
        if (ctx && ctx.nodes) {
          const nodes = ctx.nodes.value || ctx.nodes;
          return nodes.map(node => ({
            id: node.id,
            position: node.position,
            data: { label: node.data?.label, nodeType: node.data?.nodeType }
          }));
        }
      }
      return null;
    });
    
    if (reloadedPositions && afterDragPositions) {
      console.log('\n重新載入後位置:');
      let positionsMatched = 0;
      
      reloadedPositions.forEach((node, index) => {
        const afterDrag = afterDragPositions[index];
        const positionsMatch = JSON.stringify(afterDrag.position) === JSON.stringify(node.position);
        
        if (positionsMatch) positionsMatched++;
        
        console.log(`  節點 ${index + 1} (${node.data.label || node.data.nodeType}): ${JSON.stringify(node.position)} ${positionsMatch ? '✅ 位置一致' : '❌ 位置不一致'}`);
      });
      
      console.log(`\n位置恢復統計: ${positionsMatched}/${reloadedPositions.length} 個節點位置正確恢復`);
      
      if (positionsMatched === reloadedPositions.length) {
        console.log('🎉 所有節點位置都正確恢復！');
      } else {
        console.log('⚠️ 部分節點位置恢復有問題');
      }
    }
    
    console.log('\n✅ 測試完成！請檢查上述結果。');
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    // 不要自動關閉瀏覽器，讓用戶可以繼續檢查
    console.log('\n🔍 瀏覽器保持開啟，您可以繼續檢查...');
    console.log('按 Ctrl+C 結束腳本並關閉瀏覽器');
    
    // 等待用戶手動結束
    await new Promise(() => {});
  }
}

// 執行測試
if (require.main === module) {
  debugManualDrag().catch(console.error);
}

module.exports = { debugManualDrag };
