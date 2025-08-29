/**
 * Playwright 自動化測試腳本
 * 用於深度分析工作流編輯器的兩個問題：
 * 1. 節點位置恢復失敗
 * 2. 離開確認彈窗需要雙擊
 */

const { chromium } = require('playwright');

async function testWorkflowIssues() {
  console.log('🚀 開始 Playwright 自動化測試...');
  
  const browser = await chromium.launch({ 
    headless: false, // 設為 false 以便觀察測試過程
    slowMo: 1000 // 減慢操作速度以便觀察
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 監聽網路請求
  const networkRequests = [];
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      networkRequests.push({
        url: request.url(),
        method: request.method(),
        postData: request.postData()
      });
    }
  });
  
  // 監聽網路回應
  const networkResponses = [];
  page.on('response', async response => {
    if (response.url().includes('/api/')) {
      try {
        const responseBody = await response.text();
        networkResponses.push({
          url: response.url(),
          status: response.status(),
          body: responseBody
        });
      } catch (error) {
        console.log('無法讀取回應內容:', error.message);
      }
    }
  });
  
  // 監聽控制台訊息
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: new Date().toISOString()
    });
  });
  
  try {
    // 步驟1: 導航到應用程式
    console.log('📍 步驟1: 導航到應用程式');
    await page.goto('http://localhost:3002/');
    await page.waitForLoadState('networkidle');
    
    // 步驟2: 登入
    console.log('📍 步驟2: 執行登入流程');
    const isLoginPage = await page.locator('input[type="email"], input[placeholder*="帳號"], input[placeholder*="email"]').isVisible();
    if (isLoginPage) {
      console.log('在登入頁面，輸入帳號密碼...');
      await page.fill('input[type="email"], input[placeholder*="帳號"], input[placeholder*="email"]', '001');
      await page.fill('input[type="password"], input[placeholder*="密碼"], input[placeholder*="password"]', '123');
      await page.click('button[type="submit"], button:has-text("登入"), .login-btn');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
    }

    // 步驟3: 導航到儀表板並找到「台灣金流整合工作流」
    console.log('📍 步驟3: 在儀表板中尋找「台灣金流整合工作流」');
    await page.goto('http://localhost:3002/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // 尋找並點擊「台灣金流整合工作流」
    const workflowCard = page.locator('text=台灣金流整合工作流').first();
    const workflowExists = await workflowCard.isVisible();

    if (workflowExists) {
      console.log('找到「台灣金流整合工作流」，點擊進入...');
      await workflowCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000); // 等待工作流編輯器載入
    } else {
      console.log('未找到「台灣金流整合工作流」，建立新的測試工作流...');
      await page.goto('http://localhost:3002/workflow/editor');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      await createTestWorkflow(page);
    }
    
    // 步驟5: 測試節點位置儲存和恢復
    console.log('📍 步驟5: 測試節點位置儲存和恢復');
    await testNodePositionSaveRestore(page, networkRequests, networkResponses);
    
    // 步驟6: 測試離開確認彈窗
    console.log('📍 步驟6: 測試離開確認彈窗');
    await testLeaveConfirmDialog(page);
    
    // 步驟7: 分析結果
    console.log('📍 步驟7: 分析測試結果');
    await analyzeResults(networkRequests, networkResponses, consoleMessages);
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

async function createTestWorkflow(page) {
  console.log('  🔧 建立測試工作流...');

  try {
    // 嘗試點擊新增節點按鈕（多種可能的選擇器）
    const addNodeSelectors = [
      '[data-testid="add-node-button"]',
      '.add-node-btn',
      'button:has-text("新增節點")',
      'button:has-text("添加節點")',
      '.toolbar button:first-child',
      '.node-toolbar button'
    ];

    let addButtonFound = false;
    for (const selector of addNodeSelectors) {
      const button = page.locator(selector).first();
      if (await button.isVisible()) {
        await button.click();
        addButtonFound = true;
        console.log(`  ✅ 使用選擇器 ${selector} 找到新增節點按鈕`);
        break;
      }
    }

    if (!addButtonFound) {
      console.log('  ⚠️ 未找到新增節點按鈕，跳過建立新節點');
      return;
    }

    await page.waitForTimeout(1000);

    // 嘗試選擇節點類型
    const nodeTypeSelectors = [
      '[data-node-type="trigger"]',
      '.node-type-trigger',
      'button:has-text("觸發")',
      '.node-palette .node-item:first-child'
    ];

    for (const selector of nodeTypeSelectors) {
      const nodeType = page.locator(selector).first();
      if (await nodeType.isVisible()) {
        await nodeType.click();
        console.log(`  ✅ 使用選擇器 ${selector} 選擇節點類型`);
        break;
      }
    }

    await page.waitForTimeout(1000);
  } catch (error) {
    console.log('  ⚠️ 建立測試工作流時發生錯誤:', error.message);
  }
}

async function testNodePositionSaveRestore(page, networkRequests, networkResponses) {
  console.log('  🎯 測試節點位置儲存和恢復...');
  
  // 記錄初始節點位置
  const initialPositions = await getNodePositions(page);
  console.log('  📊 初始節點位置:', initialPositions);
  
  // 拖動節點到新位置
  console.log('  🖱️ 拖動節點到新位置...');
  const nodes = await page.locator('.vue-flow__node').all();
  if (nodes.length > 0) {
    try {
      // 使用更簡單的拖動方法
      console.log(`  📍 找到 ${nodes.length} 個節點，嘗試拖動...`);

      // 拖動第一個節點
      const firstNode = nodes[0];
      const firstNodeBox = await firstNode.boundingBox();
      if (firstNodeBox) {
        await page.mouse.move(firstNodeBox.x + firstNodeBox.width / 2, firstNodeBox.y + firstNodeBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(firstNodeBox.x + 200, firstNodeBox.y + 100);
        await page.mouse.up();
        await page.waitForTimeout(1000);
        console.log('  ✅ 成功拖動第一個節點');
      }

      if (nodes.length > 1) {
        // 拖動第二個節點
        const secondNode = nodes[1];
        const secondNodeBox = await secondNode.boundingBox();
        if (secondNodeBox) {
          await page.mouse.move(secondNodeBox.x + secondNodeBox.width / 2, secondNodeBox.y + secondNodeBox.height / 2);
          await page.mouse.down();
          await page.mouse.move(secondNodeBox.x + 400, secondNodeBox.y + 200);
          await page.mouse.up();
          await page.waitForTimeout(1000);
          console.log('  ✅ 成功拖動第二個節點');
        }
      }
    } catch (error) {
      console.log('  ⚠️ 拖動節點時發生錯誤:', error.message);
      console.log('  ℹ️ 繼續測試其他功能...');
    }
  }
  
  // 記錄拖動後的位置
  const draggedPositions = await getNodePositions(page);
  console.log('  📊 拖動後節點位置:', draggedPositions);
  
  // 儲存工作流
  console.log('  💾 儲存工作流...');
  await page.keyboard.press('Control+S');
  await page.waitForTimeout(2000);
  
  // 檢查儲存請求中的 viewport 資料
  const saveRequests = networkRequests.filter(req => 
    req.method === 'POST' && req.url.includes('/workflow')
  );
  console.log('  📡 儲存請求數量:', saveRequests.length);
  
  // 重新載入頁面
  console.log('  🔄 重新載入頁面...');
  await page.reload();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // 等待工作流載入
  
  // 檢查載入後的節點位置
  const restoredPositions = await getNodePositions(page);
  console.log('  📊 載入後節點位置:', restoredPositions);
  
  // 比較位置是否正確恢復
  const positionRestored = comparePositions(draggedPositions, restoredPositions);
  console.log('  ✅ 節點位置是否正確恢復:', positionRestored);
  
  return { initialPositions, draggedPositions, restoredPositions, positionRestored };
}

async function testLeaveConfirmDialog(page) {
  console.log('  🚪 測試離開確認彈窗...');

  // 修改工作流（觸發未儲存狀態）
  console.log('  ✏️ 修改工作流觸發未儲存狀態...');

  // 嘗試多種方式來觸發未儲存狀態
  const triggerMethods = [
    async () => {
      // 方法1: 嘗試新增節點
      const addButton = page.locator('[data-testid="add-node-button"], .add-node-btn, button:has-text("新增節點")').first();
      if (await addButton.isVisible()) {
        await addButton.click();
        return true;
      }
      return false;
    },
    async () => {
      // 方法2: 嘗試拖動現有節點
      const nodes = await page.locator('.vue-flow__node').all();
      if (nodes.length > 0) {
        await nodes[0].dragTo(nodes[0], { targetPosition: { x: 50, y: 50 } });
        return true;
      }
      return false;
    },
    async () => {
      // 方法3: 嘗試修改節點資料
      const node = page.locator('.vue-flow__node').first();
      if (await node.isVisible()) {
        await node.dblclick();
        await page.waitForTimeout(500);
        return true;
      }
      return false;
    }
  ];

  let changeTriggered = false;
  for (const method of triggerMethods) {
    try {
      if (await method()) {
        changeTriggered = true;
        console.log('  ✅ 成功觸發工作流變更');
        break;
      }
    } catch (error) {
      console.log('  ⚠️ 觸發變更方法失敗:', error.message);
    }
  }

  if (!changeTriggered) {
    console.log('  ⚠️ 無法觸發工作流變更，直接測試離開');
  }

  await page.waitForTimeout(1000);

  // 嘗試離開到儀表板
  console.log('  🏠 嘗試導航到儀表板...');
  let clickCount = 0;
  let navigationSuccessful = false;

  // 嘗試多種離開方式
  const leaveSelectors = [
    'a[href="/dashboard"]',
    'a[href="/"]',
    '.logo',
    '[data-testid="dashboard-link"]',
    'button:has-text("儀表板")',
    '.header .nav-link:first-child'
  ];

  let leaveButtonFound = false;
  for (const selector of leaveSelectors) {
    const button = page.locator(selector).first();
    if (await button.isVisible()) {
      await button.click();
      leaveButtonFound = true;
      console.log(`  ✅ 使用選擇器 ${selector} 嘗試離開`);
      break;
    }
  }

  if (!leaveButtonFound) {
    // 直接導航
    await page.goto('http://localhost:3002/dashboard');
  }

  await page.waitForTimeout(1500);

  // 檢查是否出現離開確認對話框
  const dialogSelectors = [
    '.el-message-box',
    '.leave-confirm-dialog',
    '[role="dialog"]',
    '.el-overlay .el-message-box'
  ];

  let dialogVisible = false;
  for (const selector of dialogSelectors) {
    if (await page.locator(selector).isVisible()) {
      dialogVisible = true;
      console.log(`  💬 找到離開確認對話框: ${selector}`);
      break;
    }
  }

  console.log('  💬 離開確認對話框是否出現:', dialogVisible);

  if (dialogVisible) {
    // 點擊「直接離開」按鈕
    console.log('  🖱️ 尋找並點擊「直接離開」按鈕...');

    const leaveButtonSelectors = [
      'button:has-text("直接離開")',
      '.el-message-box__btns .el-button--default',
      '.el-message-box__btns button:last-child',
      'button[class*="cancel"]'
    ];

    let leaveButton = null;
    for (const selector of leaveButtonSelectors) {
      const button = page.locator(selector).first();
      if (await button.isVisible()) {
        leaveButton = button;
        console.log(`  ✅ 找到「直接離開」按鈕: ${selector}`);
        break;
      }
    }

    if (leaveButton) {
      // 記錄點擊次數
      while (!navigationSuccessful && clickCount < 3) {
        clickCount++;
        console.log(`  🔢 第 ${clickCount} 次點擊「直接離開」...`);

        await leaveButton.click();
        await page.waitForTimeout(1500);

        // 檢查是否成功導航到儀表板
        const currentUrl = page.url();
        navigationSuccessful = currentUrl.includes('/dashboard') || currentUrl === 'http://localhost:3002/';

        if (navigationSuccessful) {
          console.log('  ✅ 成功導航到儀表板');
          break;
        } else {
          console.log('  ⏳ 尚未成功導航，繼續嘗試...');
          // 檢查對話框是否還在
          const stillVisible = await page.locator('.el-message-box').isVisible();
          if (!stillVisible) {
            console.log('  ℹ️ 對話框已消失，但未成功導航');
            break;
          }
        }
      }
    } else {
      console.log('  ❌ 未找到「直接離開」按鈕');
    }
  }

  return { clickCount, navigationSuccessful, dialogVisible, changeTriggered };
}

async function getNodePositions(page) {
  return await page.evaluate(() => {
    const nodes = document.querySelectorAll('.vue-flow__node');
    const positions = [];
    
    nodes.forEach((node, index) => {
      const rect = node.getBoundingClientRect();
      const transform = node.style.transform;
      positions.push({
        index,
        id: node.getAttribute('data-id'),
        boundingRect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        transform,
        style: {
          left: node.style.left,
          top: node.style.top
        }
      });
    });
    
    return positions;
  });
}

function comparePositions(positions1, positions2) {
  if (positions1.length !== positions2.length) {
    return false;
  }
  
  for (let i = 0; i < positions1.length; i++) {
    const pos1 = positions1[i];
    const pos2 = positions2[i];
    
    // 比較位置（允許小幅度差異）
    const xDiff = Math.abs(pos1.boundingRect.x - pos2.boundingRect.x);
    const yDiff = Math.abs(pos1.boundingRect.y - pos2.boundingRect.y);
    
    if (xDiff > 10 || yDiff > 10) {
      console.log(`  ⚠️ 節點 ${i} 位置差異過大: x差異=${xDiff}, y差異=${yDiff}`);
      return false;
    }
  }
  
  return true;
}

async function analyzeResults(networkRequests, networkResponses, consoleMessages) {
  console.log('\n📋 === 測試結果分析 ===');
  
  // 分析網路請求
  console.log('\n🌐 網路請求分析:');
  console.log(`  總請求數: ${networkRequests.length}`);
  
  const saveRequests = networkRequests.filter(req => 
    req.method === 'POST' && req.url.includes('/workflow')
  );
  console.log(`  儲存請求數: ${saveRequests.length}`);
  
  saveRequests.forEach((req, index) => {
    console.log(`  儲存請求 ${index + 1}:`);
    console.log(`    URL: ${req.url}`);
    if (req.postData) {
      try {
        const data = JSON.parse(req.postData);
        console.log(`    包含 viewport: ${!!data.viewport}`);
        if (data.viewport) {
          console.log(`    viewport 資料:`, data.viewport);
        }
      } catch (e) {
        console.log(`    無法解析請求資料`);
      }
    }
  });
  
  // 分析控制台訊息
  console.log('\n📝 控制台訊息分析:');
  const errorMessages = consoleMessages.filter(msg => msg.type === 'error');
  const warningMessages = consoleMessages.filter(msg => msg.type === 'warning');
  const viewportMessages = consoleMessages.filter(msg => 
    msg.text.includes('viewport') || msg.text.includes('setViewport')
  );
  
  console.log(`  錯誤訊息數: ${errorMessages.length}`);
  console.log(`  警告訊息數: ${warningMessages.length}`);
  console.log(`  viewport 相關訊息數: ${viewportMessages.length}`);
  
  if (viewportMessages.length > 0) {
    console.log('  viewport 相關訊息:');
    viewportMessages.forEach(msg => {
      console.log(`    ${msg.timestamp}: ${msg.text}`);
    });
  }
  
  if (errorMessages.length > 0) {
    console.log('  錯誤訊息:');
    errorMessages.slice(0, 5).forEach(msg => {
      console.log(`    ${msg.timestamp}: ${msg.text}`);
    });
  }
}

// 執行測試
if (require.main === module) {
  testWorkflowIssues().catch(console.error);
}

module.exports = { testWorkflowIssues };
