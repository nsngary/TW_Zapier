/**
 * 節點渲染問題診斷腳本
 * 專門診斷節點在主畫布不可見但在 minimap 可見的問題
 */

const { chromium } = require('playwright');

async function diagnoseNodeRendering() {
  console.log('🔍 開始診斷節點渲染問題...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 監聽控制台訊息
  page.on('console', msg => {
    if (msg.text().includes('viewport') || msg.text().includes('恢復') || msg.text().includes('設置')) {
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
      await page.waitForTimeout(5000); // 等待完全載入
    }
    
    // 詳細診斷
    console.log('\n🔍 === 詳細診斷開始 ===');
    
    // 1. 檢查 Vue Flow 結構
    const vueFlowStructure = await page.evaluate(() => {
      const vueFlow = document.querySelector('.vue-flow');
      const viewport = document.querySelector('.vue-flow__viewport');
      const nodesContainer = document.querySelector('.vue-flow__nodes');
      const edgesContainer = document.querySelector('.vue-flow__edges');
      const minimap = document.querySelector('.vue-flow__minimap');
      
      return {
        vueFlowExists: !!vueFlow,
        viewportExists: !!viewport,
        nodesContainerExists: !!nodesContainer,
        edgesContainerExists: !!edgesContainer,
        minimapExists: !!minimap,
        vueFlowRect: vueFlow ? vueFlow.getBoundingClientRect() : null,
        viewportRect: viewport ? viewport.getBoundingClientRect() : null
      };
    });
    
    console.log('Vue Flow 結構:', JSON.stringify(vueFlowStructure, null, 2));
    
    // 2. 檢查節點詳細資訊
    const nodeDetails = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        const parentRect = node.parentElement ? node.parentElement.getBoundingClientRect() : null;
        
        nodeData.push({
          index,
          id: node.getAttribute('data-id'),
          className: node.className,
          rect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right
          },
          style: {
            transform: node.style.transform,
            position: style.position,
            left: style.left,
            top: style.top,
            zIndex: style.zIndex,
            visibility: style.visibility,
            display: style.display,
            opacity: style.opacity
          },
          parentRect: parentRect,
          isVisible: rect.width > 0 && rect.height > 0,
          isInViewport: rect.top >= 0 && rect.left >= 0 && 
                       rect.bottom <= window.innerHeight && 
                       rect.right <= window.innerWidth
        });
      });
      
      return {
        nodeCount: nodes.length,
        nodes: nodeData,
        windowSize: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };
    });
    
    console.log(`\n📊 節點詳細資訊 (共 ${nodeDetails.nodeCount} 個):`);
    console.log(`視窗大小: ${nodeDetails.windowSize.width}x${nodeDetails.windowSize.height}`);
    
    nodeDetails.nodes.forEach((node, index) => {
      console.log(`\n節點 ${index + 1} (${node.id}):`);
      console.log(`  位置: (${node.rect.x}, ${node.rect.y})`);
      console.log(`  大小: ${node.rect.width}x${node.rect.height}`);
      console.log(`  可見: ${node.isVisible}`);
      console.log(`  在視窗內: ${node.isInViewport}`);
      console.log(`  Transform: ${node.style.transform || '無'}`);
      console.log(`  Position: ${node.style.position}`);
      console.log(`  Display: ${node.style.display}`);
      console.log(`  Visibility: ${node.style.visibility}`);
      console.log(`  Opacity: ${node.style.opacity}`);
    });
    
    // 3. 檢查 viewport 狀態
    const viewportState = await page.evaluate(() => {
      const viewport = document.querySelector('.vue-flow__viewport');
      if (!viewport) return { error: 'viewport 不存在' };
      
      const style = window.getComputedStyle(viewport);
      const rect = viewport.getBoundingClientRect();
      
      return {
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        style: {
          transform: viewport.style.transform,
          computedTransform: style.transform,
          position: style.position,
          overflow: style.overflow
        }
      };
    });
    
    console.log('\n🖼️ Viewport 狀態:');
    console.log(JSON.stringify(viewportState, null, 2));
    
    // 4. 檢查 minimap 中的節點
    const minimapNodes = await page.evaluate(() => {
      const minimapNodes = document.querySelectorAll('.vue-flow__minimap .vue-flow__minimap-node');
      const minimapData = [];
      
      minimapNodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        minimapData.push({
          index,
          rect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          },
          isVisible: rect.width > 0 && rect.height > 0
        });
      });
      
      return {
        count: minimapNodes.length,
        nodes: minimapData
      };
    });
    
    console.log(`\n🗺️ Minimap 節點 (共 ${minimapNodes.count} 個):`);
    minimapNodes.nodes.forEach((node, index) => {
      console.log(`  Minimap 節點 ${index + 1}: (${node.rect.x}, ${node.rect.y}) ${node.rect.width}x${node.rect.height} 可見:${node.isVisible}`);
    });
    
    // 5. 嘗試修正 - 使用 fitView
    console.log('\n🔧 === 嘗試修正 ===');
    console.log('嘗試使用 fitView...');
    
    await page.evaluate(() => {
      // 嘗試觸發 fitView
      const event = new KeyboardEvent('keydown', {
        key: 'f',
        code: 'KeyF',
        ctrlKey: true
      });
      document.dispatchEvent(event);
    });
    
    await page.waitForTimeout(2000);
    
    // 檢查 fitView 後的狀態
    const afterFitView = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        nodeData.push({
          index,
          rect: { x: rect.x, y: rect.y },
          isInViewport: rect.top >= 0 && rect.left >= 0 && 
                       rect.bottom <= window.innerHeight && 
                       rect.right <= window.innerWidth
        });
      });
      
      return nodeData;
    });
    
    console.log('\nfitView 後節點位置:');
    afterFitView.forEach((node, index) => {
      console.log(`  節點 ${index + 1}: (${node.rect.x}, ${node.rect.y}) 在視窗內:${node.isInViewport}`);
    });
    
    // 6. 嘗試手動重置 viewport
    console.log('\n嘗試手動重置 viewport...');
    
    const manualReset = await page.evaluate(() => {
      const viewport = document.querySelector('.vue-flow__viewport');
      if (viewport) {
        // 重置 transform
        viewport.style.transform = 'translate(0px, 0px) scale(1)';
        return { success: true, transform: viewport.style.transform };
      }
      return { success: false };
    });
    
    console.log('手動重置結果:', manualReset);
    
    await page.waitForTimeout(2000);
    
    // 檢查重置後的狀態
    const afterReset = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        nodeData.push({
          index,
          rect: { x: rect.x, y: rect.y },
          isInViewport: rect.top >= 0 && rect.left >= 0 && 
                       rect.bottom <= window.innerHeight && 
                       rect.right <= window.innerWidth
        });
      });
      
      return nodeData;
    });
    
    console.log('\n手動重置後節點位置:');
    afterReset.forEach((node, index) => {
      console.log(`  節點 ${index + 1}: (${node.rect.x}, ${node.rect.y}) 在視窗內:${node.isInViewport}`);
    });
    
  } catch (error) {
    console.error('❌ 診斷過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行診斷
if (require.main === module) {
  diagnoseNodeRendering().catch(console.error);
}

module.exports = { diagnoseNodeRendering };
