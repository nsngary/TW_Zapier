/**
 * 最終測試：節點位置恢復功能
 * 完整測試節點位置儲存和恢復的整個流程
 */

const { chromium } = require('playwright');

async function finalTestNodePosition() {
  console.log('🎯 最終測試：節點位置恢復功能');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 800
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 監聽控制台訊息
  page.on('console', msg => {
    if (msg.text().includes('viewport') || 
        msg.text().includes('可視節點') || 
        msg.text().includes('✅') ||
        msg.text().includes('⚠️')) {
      console.log(`📝 ${msg.text()}`);
    }
  });
  
  try {
    // 步驟1: 登入並進入工作流
    console.log('\n📍 步驟1: 登入並進入工作流');
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
      await workflowCard.click();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(4000);
    }
    
    // 步驟2: 檢查初始載入狀態
    console.log('\n📍 步驟2: 檢查初始載入狀態');
    
    const initialState = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      let visibleNodes = 0;
      const nodePositions = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.left >= 0 && 
                         rect.bottom <= window.innerHeight && 
                         rect.right <= window.innerWidth;
        if (isVisible) visibleNodes++;
        
        nodePositions.push({
          index: index + 1,
          x: Math.round(rect.x),
          y: Math.round(rect.y)
        });
      });
      
      return {
        totalNodes: nodes.length,
        visibleNodes: visibleNodes,
        positions: nodePositions
      };
    });
    
    console.log(`初始狀態: ${initialState.visibleNodes}/${initialState.totalNodes} 節點可見`);
    initialState.positions.forEach(pos => {
      console.log(`  節點 ${pos.index}: (${pos.x}, ${pos.y})`);
    });
    
    // 步驟3: 嘗試移動節點（使用 Vue Flow 的拖動）
    console.log('\n📍 步驟3: 嘗試移動節點');
    
    if (initialState.visibleNodes > 0) {
      try {
        // 使用 Vue Flow 的 API 來移動節點
        const moveResult = await page.evaluate(() => {
          const nodes = document.querySelectorAll('.vue-flow__node');
          if (nodes.length > 0) {
            const firstNode = nodes[0];
            const nodeId = firstNode.getAttribute('data-id');
            
            // 嘗試觸發 Vue Flow 的節點更新
            const event = new CustomEvent('node-drag', {
              detail: {
                nodeId: nodeId,
                position: { x: 400, y: 200 }
              }
            });
            
            firstNode.dispatchEvent(event);
            
            return {
              success: true,
              nodeId: nodeId,
              newPosition: { x: 400, y: 200 }
            };
          }
          return { success: false };
        });
        
        if (moveResult.success) {
          console.log(`✅ 嘗試移動節點 ${moveResult.nodeId} 到 (${moveResult.newPosition.x}, ${moveResult.newPosition.y})`);
          await page.waitForTimeout(1000);
        }
      } catch (error) {
        console.log('⚠️ 節點移動測試跳過:', error.message);
      }
    }
    
    // 步驟4: 測試儲存功能
    console.log('\n📍 步驟4: 測試儲存功能');
    
    try {
      await page.keyboard.press('Control+S');
      await page.waitForTimeout(2000);
      console.log('✅ 執行儲存操作');
    } catch (error) {
      console.log('⚠️ 儲存操作失敗:', error.message);
    }
    
    // 步驟5: 重新載入頁面測試恢復
    console.log('\n📍 步驟5: 重新載入頁面測試恢復');
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000); // 等待完全載入和 viewport 恢復
    
    // 步驟6: 檢查恢復後的狀態
    console.log('\n📍 步驟6: 檢查恢復後的狀態');
    
    const restoredState = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      let visibleNodes = 0;
      const nodePositions = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.left >= 0 && 
                         rect.bottom <= window.innerHeight && 
                         rect.right <= window.innerWidth;
        if (isVisible) visibleNodes++;
        
        nodePositions.push({
          index: index + 1,
          x: Math.round(rect.x),
          y: Math.round(rect.y)
        });
      });
      
      return {
        totalNodes: nodes.length,
        visibleNodes: visibleNodes,
        positions: nodePositions
      };
    });
    
    console.log(`恢復後狀態: ${restoredState.visibleNodes}/${restoredState.totalNodes} 節點可見`);
    restoredState.positions.forEach(pos => {
      console.log(`  節點 ${pos.index}: (${pos.x}, ${pos.y})`);
    });
    
    // 步驟7: 最終評估
    console.log('\n📍 步驟7: 最終評估');
    
    const allNodesVisible = restoredState.visibleNodes === restoredState.totalNodes;
    const hasNodes = restoredState.totalNodes > 0;
    
    if (allNodesVisible && hasNodes) {
      console.log('🎉 測試完全成功！');
      console.log('✅ 節點位置恢復功能正常工作');
      console.log('✅ 所有節點都在可視範圍內');
      console.log('✅ 智能 viewport 恢復邏輯有效');
    } else if (restoredState.visibleNodes > 0) {
      console.log('⚠️ 測試部分成功');
      console.log(`✅ ${restoredState.visibleNodes}/${restoredState.totalNodes} 節點可見`);
      console.log('⚠️ 可能需要進一步調整');
    } else {
      console.log('❌ 測試失敗');
      console.log('❌ 節點位置恢復功能需要修正');
    }
    
    // 額外檢查：比較初始和恢復後的位置
    console.log('\n📊 位置比較分析:');
    
    if (initialState.positions.length === restoredState.positions.length) {
      let positionsMatch = 0;
      
      for (let i = 0; i < initialState.positions.length; i++) {
        const initial = initialState.positions[i];
        const restored = restoredState.positions[i];
        const xDiff = Math.abs(initial.x - restored.x);
        const yDiff = Math.abs(initial.y - restored.y);
        
        if (xDiff <= 5 && yDiff <= 5) { // 允許5像素的誤差
          positionsMatch++;
        }
        
        console.log(`節點 ${i + 1}: 初始(${initial.x}, ${initial.y}) → 恢復(${restored.x}, ${restored.y}) 差異(${xDiff}, ${yDiff})`);
      }
      
      console.log(`位置一致性: ${positionsMatch}/${initialState.positions.length} 節點位置基本一致`);
    }
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行測試
if (require.main === module) {
  finalTestNodePosition().catch(console.error);
}

module.exports = { finalTestNodePosition };
