/**
 * API 請求分析腳本
 * 專門用於分析工作流儲存和載入時的 viewport 資料傳輸
 */

const { chromium } = require('playwright');

async function analyzeApiRequests() {
  console.log('🔍 開始分析 API 請求...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 攔截所有網路請求和回應
  const apiRequests = [];
  const apiResponses = [];
  
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      const requestData = {
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        timestamp: new Date().toISOString()
      };
      apiRequests.push(requestData);
      console.log(`📤 API 請求: ${request.method()} ${request.url()}`);
    }
  });
  
  page.on('response', async response => {
    if (response.url().includes('/api/')) {
      try {
        const responseBody = await response.text();
        const responseData = {
          url: response.url(),
          status: response.status(),
          headers: response.headers(),
          body: responseBody,
          timestamp: new Date().toISOString()
        };
        apiResponses.push(responseData);
        console.log(`📥 API 回應: ${response.status()} ${response.url()}`);
        
        // 如果是工作流相關的回應，立即分析
        if (response.url().includes('/workflow')) {
          analyzeWorkflowResponse(responseData);
        }
      } catch (error) {
        console.log(`⚠️ 無法讀取回應內容: ${error.message}`);
      }
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
    
    // 進入工作流
    await page.goto('http://localhost:3002/dashboard');
    await page.waitForLoadState('networkidle');
    
    const workflowCard = page.locator('text=台灣金流整合工作流').first();
    if (await workflowCard.isVisible()) {
      console.log('🎯 點擊進入「台灣金流整合工作流」...');
      await workflowCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000);
    }
    
    // 分析載入時的請求
    console.log('\n📊 === 載入工作流時的 API 分析 ===');
    analyzeLoadRequests(apiRequests, apiResponses);
    
    // 嘗試儲存工作流
    console.log('\n💾 嘗試儲存工作流...');
    await page.keyboard.press('Control+S');
    await page.waitForTimeout(3000);
    
    // 分析儲存時的請求
    console.log('\n📊 === 儲存工作流時的 API 分析 ===');
    analyzeSaveRequests(apiRequests, apiResponses);
    
    // 檢查當前 viewport 狀態
    console.log('\n🖼️ === 當前 Viewport 狀態 ===');
    const viewportInfo = await page.evaluate(() => {
      // 嘗試獲取 Vue Flow 的 viewport 資訊
      const vueFlowElement = document.querySelector('.vue-flow');
      if (vueFlowElement) {
        const transform = vueFlowElement.style.transform;
        const viewportElement = document.querySelector('.vue-flow__viewport');
        const viewportTransform = viewportElement ? viewportElement.style.transform : null;
        
        return {
          vueFlowTransform: transform,
          viewportTransform: viewportTransform,
          vueFlowExists: true,
          viewportExists: !!viewportElement
        };
      }
      return { vueFlowExists: false };
    });
    
    console.log('Viewport 資訊:', JSON.stringify(viewportInfo, null, 2));
    
  } catch (error) {
    console.error('❌ 分析過程中發生錯誤:', error);
  } finally {
    // 最終分析報告
    console.log('\n📋 === 最終分析報告 ===');
    generateFinalReport(apiRequests, apiResponses);
    
    await browser.close();
  }
}

function analyzeWorkflowResponse(responseData) {
  try {
    const data = JSON.parse(responseData.body);
    if (data && data.settings) {
      console.log(`  🔍 工作流回應包含 settings: ${!!data.settings}`);
      if (data.settings.viewport) {
        console.log(`  📍 Viewport 資料:`, data.settings.viewport);
      } else {
        console.log(`  ⚠️ Settings 中沒有 viewport 資料`);
        console.log(`  📄 Settings 內容:`, data.settings);
      }
    }
  } catch (error) {
    console.log(`  ❌ 無法解析工作流回應: ${error.message}`);
  }
}

function analyzeLoadRequests(requests, responses) {
  const loadRequests = requests.filter(req => 
    req.method === 'GET' && req.url.includes('/workflow')
  );
  
  console.log(`載入請求數量: ${loadRequests.length}`);
  
  loadRequests.forEach((req, index) => {
    console.log(`\n載入請求 ${index + 1}:`);
    console.log(`  URL: ${req.url}`);
    console.log(`  時間: ${req.timestamp}`);
    
    // 找到對應的回應
    const response = responses.find(res => res.url === req.url);
    if (response) {
      try {
        const data = JSON.parse(response.body);
        console.log(`  回應狀態: ${response.status}`);
        console.log(`  包含 settings: ${!!(data && data.settings)}`);
        if (data && data.settings && data.settings.viewport) {
          console.log(`  Viewport 資料: ${JSON.stringify(data.settings.viewport)}`);
        }
      } catch (error) {
        console.log(`  無法解析回應資料`);
      }
    }
  });
}

function analyzeSaveRequests(requests, responses) {
  const saveRequests = requests.filter(req => 
    req.method === 'POST' && req.url.includes('/workflow')
  );
  
  console.log(`儲存請求數量: ${saveRequests.length}`);
  
  saveRequests.forEach((req, index) => {
    console.log(`\n儲存請求 ${index + 1}:`);
    console.log(`  URL: ${req.url}`);
    console.log(`  時間: ${req.timestamp}`);
    
    if (req.postData) {
      try {
        const data = JSON.parse(req.postData);
        console.log(`  包含 viewport: ${!!data.viewport}`);
        console.log(`  包含 settings: ${!!data.settings}`);
        
        if (data.viewport) {
          console.log(`  Viewport 資料: ${JSON.stringify(data.viewport)}`);
        }
        
        if (data.settings) {
          console.log(`  Settings 資料: ${JSON.stringify(data.settings)}`);
        }
        
        if (data.nodes) {
          console.log(`  節點數量: ${data.nodes.length}`);
          if (data.nodes.length > 0) {
            console.log(`  第一個節點位置: ${JSON.stringify(data.nodes[0].position)}`);
          }
        }
      } catch (error) {
        console.log(`  無法解析請求資料: ${error.message}`);
      }
    }
    
    // 找到對應的回應
    const response = responses.find(res => res.url === req.url);
    if (response) {
      console.log(`  回應狀態: ${response.status}`);
    }
  });
}

function generateFinalReport(requests, responses) {
  console.log(`\n總 API 請求數: ${requests.length}`);
  console.log(`總 API 回應數: ${responses.length}`);
  
  const workflowRequests = requests.filter(req => req.url.includes('/workflow'));
  console.log(`工作流相關請求數: ${workflowRequests.length}`);
  
  const getRequests = workflowRequests.filter(req => req.method === 'GET');
  const postRequests = workflowRequests.filter(req => req.method === 'POST');
  const putRequests = workflowRequests.filter(req => req.method === 'PUT');
  
  console.log(`  GET 請求 (載入): ${getRequests.length}`);
  console.log(`  POST 請求 (建立): ${postRequests.length}`);
  console.log(`  PUT 請求 (更新): ${putRequests.length}`);
  
  // 檢查是否有 viewport 資料傳輸
  let viewportInRequests = 0;
  let viewportInResponses = 0;
  
  requests.forEach(req => {
    if (req.postData) {
      try {
        const data = JSON.parse(req.postData);
        if (data.viewport || (data.settings && data.settings.viewport)) {
          viewportInRequests++;
        }
      } catch (e) {}
    }
  });
  
  responses.forEach(res => {
    try {
      const data = JSON.parse(res.body);
      if (data && data.settings && data.settings.viewport) {
        viewportInResponses++;
      }
    } catch (e) {}
  });
  
  console.log(`\n包含 viewport 的請求數: ${viewportInRequests}`);
  console.log(`包含 viewport 的回應數: ${viewportInResponses}`);
  
  if (viewportInRequests === 0) {
    console.log('⚠️ 警告: 沒有發現包含 viewport 資料的請求');
  }
  
  if (viewportInResponses === 0) {
    console.log('⚠️ 警告: 沒有發現包含 viewport 資料的回應');
  }
}

// 執行分析
if (require.main === module) {
  analyzeApiRequests().catch(console.error);
}

module.exports = { analyzeApiRequests };
