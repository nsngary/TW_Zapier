/**
 * 測試工作流執行功能
 * 驗證前後端整合是否正常工作
 */

const { chromium } = require('playwright');

async function testWorkflowExecution() {
  console.log('🧪 測試工作流執行功能...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 攔截 API 請求
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
    if (msg.text().includes('執行') || 
        msg.text().includes('工作流') ||
        msg.text().includes('🚀') ||
        msg.text().includes('✅') ||
        msg.text().includes('❌')) {
      console.log(`📝 ${msg.text()}`);
    }
  });
  
  try {
    // 登入
    await page.goto('http://localhost:3002/');
    await page.waitForLoadState('networkidle');
    
    const loginInput = page.locator('input[type="email"], input[placeholder*="帳號"]').first();
    if (await loginInput.isVisible()) {
      await loginInput.fill('001');
      await page.fill('input[type="password"], input[placeholder*="密碼"]', '123');
      await page.click('button[type="submit"], button:has-text("登入")');
      await page.waitForLoadState('networkidle');
    }
    
    // 進入 dashboard
    await page.goto('http://localhost:3002/dashboard');
    await page.waitForLoadState('networkidle');
    
    // 進入測試工作流
    const testWorkflow = page.locator('text=test').first();
    if (await testWorkflow.isVisible()) {
      console.log('🎯 點擊進入「test」工作流...');
      await testWorkflow.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
    }
    
    // 檢查工作流狀態
    console.log('\n📊 === 檢查工作流狀態 ===');
    
    const workflowInfo = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const executeBtn = document.querySelector('.btn-run');
      
      return {
        nodeCount: nodes.length,
        hasExecuteButton: !!executeBtn,
        executeButtonEnabled: executeBtn ? !executeBtn.disabled : false,
        executeButtonText: executeBtn ? executeBtn.textContent?.trim() : null
      };
    });
    
    console.log(`節點數量: ${workflowInfo.nodeCount}`);
    console.log(`執行按鈕存在: ${workflowInfo.hasExecuteButton}`);
    console.log(`執行按鈕啟用: ${workflowInfo.executeButtonEnabled}`);
    console.log(`執行按鈕文字: ${workflowInfo.executeButtonText}`);
    
    // 檢查是否有觸發節點
    const triggerNodeInfo = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      let triggerNodes = 0;
      
      nodes.forEach(node => {
        const nodeData = node.getAttribute('data-id');
        // 檢查節點內容是否包含觸發相關文字
        const nodeText = node.textContent || '';
        if (nodeText.includes('觸發') || nodeText.includes('手動') || nodeText.includes('trigger')) {
          triggerNodes++;
        }
      });
      
      return { triggerNodes };
    });
    
    console.log(`觸發節點數量: ${triggerNodeInfo.triggerNodes}`);
    
    // 嘗試執行工作流
    console.log('\n🚀 === 嘗試執行工作流 ===');
    
    if (workflowInfo.hasExecuteButton && workflowInfo.executeButtonEnabled) {
      console.log('點擊執行按鈕...');
      
      // 清空之前的 API 請求記錄
      apiRequests.length = 0;
      
      await page.click('.btn-run');
      await page.waitForTimeout(5000); // 等待執行完成
      
      // 檢查執行請求
      const executeRequests = apiRequests.filter(req => 
        req.url.includes('/execute') && req.method === 'POST'
      );
      
      console.log(`\n📤 執行請求數量: ${executeRequests.length}`);
      
      if (executeRequests.length > 0) {
        executeRequests.forEach((request, index) => {
          console.log(`\n執行請求 ${index + 1}:`);
          console.log(`URL: ${request.url}`);
          console.log(`時間: ${request.timestamp}`);
          
          if (request.postData) {
            try {
              const data = JSON.parse(request.postData);
              console.log(`觸發資料: ${JSON.stringify(data)}`);
            } catch (error) {
              console.log(`觸發資料: ${request.postData}`);
            }
          }
        });
      } else {
        console.log('❌ 沒有檢測到執行請求');
      }
      
      // 檢查執行歷史請求
      const historyRequests = apiRequests.filter(req => 
        req.url.includes('/executions') && req.method === 'GET'
      );
      
      console.log(`\n📋 執行歷史請求數量: ${historyRequests.length}`);
      
    } else {
      console.log('❌ 執行按鈕不可用或不存在');
      
      if (!workflowInfo.hasExecuteButton) {
        console.log('   原因: 執行按鈕不存在');
      } else if (!workflowInfo.executeButtonEnabled) {
        console.log('   原因: 執行按鈕被禁用');
      }
    }
    
    // 檢查後端連線狀態
    console.log('\n🔗 === 檢查後端連線狀態 ===');
    
    try {
      const response = await page.evaluate(async () => {
        const response = await fetch('/api/v1/health');
        return {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        };
      });
      
      console.log(`後端健康檢查: ${response.status} ${response.statusText}`);
      console.log(`後端連線狀態: ${response.ok ? '✅ 正常' : '❌ 異常'}`);
      
    } catch (error) {
      console.log(`❌ 後端連線失敗: ${error.message}`);
    }
    
    // 檢查所有 API 請求
    console.log('\n📊 === API 請求統計 ===');
    
    const requestStats = {
      total: apiRequests.length,
      get: apiRequests.filter(req => req.method === 'GET').length,
      post: apiRequests.filter(req => req.method === 'POST').length,
      put: apiRequests.filter(req => req.method === 'PUT').length,
      delete: apiRequests.filter(req => req.method === 'DELETE').length
    };
    
    console.log(`總請求數: ${requestStats.total}`);
    console.log(`GET 請求: ${requestStats.get}`);
    console.log(`POST 請求: ${requestStats.post}`);
    console.log(`PUT 請求: ${requestStats.put}`);
    console.log(`DELETE 請求: ${requestStats.delete}`);
    
    // 檢查工作流相關請求
    const workflowRequests = apiRequests.filter(req => 
      req.url.includes('/workflow')
    );
    
    console.log(`\n工作流相關請求: ${workflowRequests.length}`);
    workflowRequests.forEach(req => {
      console.log(`  ${req.method} ${req.url}`);
    });
    
    // 最終評估
    console.log('\n🏆 === 最終評估 ===');
    
    const hasNodes = workflowInfo.nodeCount > 0;
    const hasExecuteButton = workflowInfo.hasExecuteButton;
    const canExecute = workflowInfo.executeButtonEnabled;
    const hasApiRequests = apiRequests.length > 0;
    
    console.log(`工作流節點: ${hasNodes ? '✅' : '❌'} (${workflowInfo.nodeCount} 個)`);
    console.log(`執行按鈕: ${hasExecuteButton ? '✅' : '❌'}`);
    console.log(`可以執行: ${canExecute ? '✅' : '❌'}`);
    console.log(`API 通訊: ${hasApiRequests ? '✅' : '❌'} (${apiRequests.length} 個請求)`);
    
    const score = [hasNodes, hasExecuteButton, canExecute, hasApiRequests].filter(Boolean).length;
    const totalChecks = 4;
    const percentage = Math.round((score / totalChecks) * 100);
    
    console.log(`\n整體評分: ${score}/${totalChecks} (${percentage}%)`);
    
    if (percentage >= 75) {
      console.log('🎉 前後端整合狀態良好！');
    } else if (percentage >= 50) {
      console.log('⚠️ 前後端整合部分正常，需要檢查問題');
    } else {
      console.log('❌ 前後端整合有嚴重問題，需要修正');
    }
    
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
  testWorkflowExecution().catch(console.error);
}

module.exports = { testWorkflowExecution };
