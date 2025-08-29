/**
 * 測試修正後的連線樣式和節點位置功能
 */

const { chromium } = require('playwright');

async function testFixes() {
  console.log('🧪 測試修正後的功能...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // 監聽控制台訊息
  page.on('console', msg => {
    if (msg.text().includes('可視節點') || 
        msg.text().includes('重疊節點') || 
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
      await page.waitForTimeout(5000); // 等待修正邏輯完成
    }
    
    // 測試1: 檢查連線樣式
    console.log('\n📊 === 測試1: 連線樣式檢查 ===');
    
    const edgeStyles = await page.evaluate(() => {
      const edges = document.querySelectorAll('.vue-flow__edge');
      const edgeData = [];
      
      edges.forEach((edge, index) => {
        const path = edge.querySelector('.vue-flow__edge-path');
        const style = window.getComputedStyle(path);
        
        // 檢查是否有動畫相關的 CSS 類別或屬性
        const hasAnimatedClass = edge.classList.contains('animated');
        const hasAnimation = style.animation !== 'none' && style.animation !== '';
        const hasStrokeDasharray = style.strokeDasharray !== 'none' && style.strokeDasharray !== '';
        
        edgeData.push({
          index: index + 1,
          id: edge.getAttribute('data-id'),
          hasAnimatedClass: hasAnimatedClass,
          hasAnimation: hasAnimation,
          hasStrokeDasharray: hasStrokeDasharray,
          isAnimated: hasAnimatedClass || hasAnimation || hasStrokeDasharray,
          strokeDasharray: style.strokeDasharray,
          animation: style.animation
        });
      });
      
      return edgeData;
    });
    
    console.log(`連線數量: ${edgeStyles.length}`);
    edgeStyles.forEach(edge => {
      const status = edge.isAnimated ? '✅ 有動畫' : '❌ 無動畫';
      console.log(`連線 ${edge.index}: ${status}`);
      console.log(`  動畫類別: ${edge.hasAnimatedClass}`);
      console.log(`  CSS動畫: ${edge.hasAnimation}`);
      console.log(`  虛線: ${edge.hasStrokeDasharray}`);
    });
    
    // 測試2: 檢查節點位置
    console.log('\n📊 === 測試2: 節點位置檢查 ===');
    
    const nodePositions = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        nodeData.push({
          index: index + 1,
          id: node.getAttribute('data-id'),
          position: { x: Math.round(rect.x), y: Math.round(rect.y) },
          size: { width: Math.round(rect.width), height: Math.round(rect.height) }
        });
      });
      
      // 檢查重疊
      let overlappingPairs = 0;
      for (let i = 0; i < nodeData.length; i++) {
        for (let j = i + 1; j < nodeData.length; j++) {
          const node1 = nodeData[i];
          const node2 = nodeData[j];
          const xDiff = Math.abs(node1.position.x - node2.position.x);
          const yDiff = Math.abs(node1.position.y - node2.position.y);
          
          if (xDiff < 50 && yDiff < 50) {
            overlappingPairs++;
          }
        }
      }
      
      return {
        nodes: nodeData,
        overlappingPairs: overlappingPairs
      };
    });
    
    console.log(`節點數量: ${nodePositions.nodes.length}`);
    console.log(`重疊對數: ${nodePositions.overlappingPairs}`);
    
    nodePositions.nodes.forEach(node => {
      console.log(`節點 ${node.index}: (${node.position.x}, ${node.position.y}) ${node.size.width}x${node.size.height}`);
    });
    
    // 測試3: 重新載入測試
    console.log('\n📊 === 測試3: 重新載入測試 ===');
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    
    // 檢查重新載入後的狀態
    const afterReload = await page.evaluate(() => {
      const edges = document.querySelectorAll('.vue-flow__edge');
      const nodes = document.querySelectorAll('.vue-flow__node');
      
      const edgeAnimated = Array.from(edges).map((edge, index) => {
        const path = edge.querySelector('.vue-flow__edge-path');
        const style = window.getComputedStyle(path);
        const hasAnimatedClass = edge.classList.contains('animated');
        const hasAnimation = style.animation !== 'none' && style.animation !== '';
        const hasStrokeDasharray = style.strokeDasharray !== 'none' && style.strokeDasharray !== '';
        
        return {
          index: index + 1,
          isAnimated: hasAnimatedClass || hasAnimation || hasStrokeDasharray
        };
      });
      
      const nodePositions = Array.from(nodes).map((node, index) => {
        const rect = node.getBoundingClientRect();
        return {
          index: index + 1,
          position: { x: Math.round(rect.x), y: Math.round(rect.y) }
        };
      });
      
      return {
        edges: edgeAnimated,
        nodes: nodePositions
      };
    });
    
    console.log('\n重新載入後結果:');
    console.log('連線動畫狀態:');
    afterReload.edges.forEach(edge => {
      console.log(`  連線 ${edge.index}: ${edge.isAnimated ? '✅ 有動畫' : '❌ 無動畫'}`);
    });
    
    console.log('節點位置:');
    afterReload.nodes.forEach(node => {
      console.log(`  節點 ${node.index}: (${node.position.x}, ${node.position.y})`);
    });
    
    // 最終評估
    console.log('\n🏆 === 最終評估 ===');
    
    const allEdgesAnimated = afterReload.edges.every(edge => edge.isAnimated);
    const nodesNotOverlapping = nodePositions.overlappingPairs === 0;
    
    console.log(`連線動畫: ${allEdgesAnimated ? '✅ 全部正常' : '❌ 部分異常'}`);
    console.log(`節點位置: ${nodesNotOverlapping ? '✅ 無重疊' : '❌ 有重疊'}`);
    
    if (allEdgesAnimated && nodesNotOverlapping) {
      console.log('🎉 所有問題都已修正！');
    } else {
      console.log('⚠️ 仍有問題需要進一步修正');
    }
    
  } catch (error) {
    console.error('❌ 測試過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行測試
if (require.main === module) {
  testFixes().catch(console.error);
}

module.exports = { testFixes };
