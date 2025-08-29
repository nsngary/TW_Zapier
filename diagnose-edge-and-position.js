/**
 * 診斷連線樣式和節點位置問題
 * 分析連線樣式不一致和節點位置恢復問題
 */

const { chromium } = require('playwright');

async function diagnoseEdgeAndPosition() {
  console.log('🔍 診斷連線樣式和節點位置問題...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
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
    
    // 分析1: 檢查連線樣式
    console.log('\n📊 === 連線樣式分析 ===');
    
    const edgeAnalysis = await page.evaluate(() => {
      const edges = document.querySelectorAll('.vue-flow__edge');
      const edgeData = [];
      
      edges.forEach((edge, index) => {
        const path = edge.querySelector('.vue-flow__edge-path');
        const style = window.getComputedStyle(path);
        
        edgeData.push({
          index: index + 1,
          id: edge.getAttribute('data-id'),
          className: edge.className,
          pathStyle: {
            stroke: style.stroke,
            strokeWidth: style.strokeWidth,
            strokeDasharray: style.strokeDasharray,
            animation: style.animation,
            animationName: style.animationName
          },
          isAnimated: edge.classList.contains('animated') || 
                     style.animation !== 'none' ||
                     style.strokeDasharray !== 'none'
        });
      });
      
      return {
        totalEdges: edges.length,
        edges: edgeData
      };
    });
    
    console.log(`總連線數: ${edgeAnalysis.totalEdges}`);
    edgeAnalysis.edges.forEach(edge => {
      console.log(`\n連線 ${edge.index} (${edge.id}):`);
      console.log(`  類別: ${edge.className}`);
      console.log(`  動畫: ${edge.isAnimated ? '✅ 有動畫' : '❌ 無動畫'}`);
      console.log(`  筆觸: ${edge.pathStyle.stroke}`);
      console.log(`  寬度: ${edge.pathStyle.strokeWidth}`);
      console.log(`  虛線: ${edge.pathStyle.strokeDasharray}`);
      console.log(`  動畫名稱: ${edge.pathStyle.animationName}`);
    });
    
    // 分析2: 檢查節點位置詳細資訊
    console.log('\n📊 === 節點位置詳細分析 ===');
    
    const nodeAnalysis = await page.evaluate(() => {
      const nodes = document.querySelectorAll('.vue-flow__node');
      const nodeData = [];
      
      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        const transform = node.style.transform;
        
        // 嘗試解析 transform 中的 translate 值
        let translateX = 0, translateY = 0;
        if (transform) {
          const translateMatch = transform.match(/translate\(([^,]+),\s*([^)]+)\)/);
          if (translateMatch) {
            translateX = parseFloat(translateMatch[1]);
            translateY = parseFloat(translateMatch[2]);
          }
        }
        
        nodeData.push({
          index: index + 1,
          id: node.getAttribute('data-id'),
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          },
          style: {
            position: style.position,
            left: style.left,
            top: style.top,
            transform: transform
          },
          parsedTransform: {
            translateX: translateX,
            translateY: translateY
          },
          isOverlapping: false // 稍後計算
        });
      });
      
      // 檢查節點重疊
      for (let i = 0; i < nodeData.length; i++) {
        for (let j = i + 1; j < nodeData.length; j++) {
          const node1 = nodeData[i];
          const node2 = nodeData[j];
          
          const xOverlap = Math.abs(node1.rect.x - node2.rect.x) < 50;
          const yOverlap = Math.abs(node1.rect.y - node2.rect.y) < 50;
          
          if (xOverlap && yOverlap) {
            node1.isOverlapping = true;
            node2.isOverlapping = true;
          }
        }
      }
      
      return {
        totalNodes: nodes.length,
        nodes: nodeData,
        overlappingCount: nodeData.filter(n => n.isOverlapping).length
      };
    });
    
    console.log(`總節點數: ${nodeAnalysis.totalNodes}`);
    console.log(`重疊節點數: ${nodeAnalysis.overlappingCount}`);
    
    nodeAnalysis.nodes.forEach(node => {
      console.log(`\n節點 ${node.index} (${node.id}):`);
      console.log(`  位置: (${node.rect.x}, ${node.rect.y})`);
      console.log(`  大小: ${node.rect.width}x${node.rect.height}`);
      console.log(`  Transform: ${node.style.transform || '無'}`);
      console.log(`  解析位移: (${node.parsedTransform.translateX}, ${node.parsedTransform.translateY})`);
      console.log(`  重疊: ${node.isOverlapping ? '❌ 是' : '✅ 否'}`);
    });
    
    // 測試3: 嘗試移動節點並檢查位置變化
    console.log('\n🖱️ === 節點移動測試 ===');
    
    if (nodeAnalysis.totalNodes > 0) {
      const firstNode = page.locator('.vue-flow__node').first();
      const nodeBox = await firstNode.boundingBox();
      
      if (nodeBox) {
        // 記錄移動前的詳細狀態
        const beforeMove = await page.evaluate(() => {
          const node = document.querySelector('.vue-flow__node');
          const rect = node.getBoundingClientRect();
          const transform = node.style.transform;
          
          return {
            rect: { x: rect.x, y: rect.y },
            transform: transform,
            computedStyle: {
              left: window.getComputedStyle(node).left,
              top: window.getComputedStyle(node).top
            }
          };
        });
        
        console.log('移動前狀態:');
        console.log(`  位置: (${beforeMove.rect.x}, ${beforeMove.rect.y})`);
        console.log(`  Transform: ${beforeMove.transform}`);
        console.log(`  Computed left/top: ${beforeMove.computedStyle.left}, ${beforeMove.computedStyle.top}`);
        
        // 執行拖動
        console.log('執行拖動操作...');
        await page.mouse.move(nodeBox.x + nodeBox.width / 2, nodeBox.y + nodeBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(nodeBox.x + 150, nodeBox.y + 100);
        await page.mouse.up();
        await page.waitForTimeout(1000);
        
        // 記錄移動後的詳細狀態
        const afterMove = await page.evaluate(() => {
          const node = document.querySelector('.vue-flow__node');
          const rect = node.getBoundingClientRect();
          const transform = node.style.transform;
          
          return {
            rect: { x: rect.x, y: rect.y },
            transform: transform,
            computedStyle: {
              left: window.getComputedStyle(node).left,
              top: window.getComputedStyle(node).top
            }
          };
        });
        
        console.log('移動後狀態:');
        console.log(`  位置: (${afterMove.rect.x}, ${afterMove.rect.y})`);
        console.log(`  Transform: ${afterMove.transform}`);
        console.log(`  Computed left/top: ${afterMove.computedStyle.left}, ${afterMove.computedStyle.top}`);
        
        const xDiff = afterMove.rect.x - beforeMove.rect.x;
        const yDiff = afterMove.rect.y - beforeMove.rect.y;
        console.log(`位置變化: (${xDiff}, ${yDiff})`);
        
        // 儲存並重新載入測試
        console.log('\n💾 === 儲存並重新載入測試 ===');
        
        await page.keyboard.press('Control+S');
        await page.waitForTimeout(2000);
        console.log('已儲存工作流');
        
        await page.reload();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(4000);
        console.log('已重新載入頁面');
        
        // 檢查重新載入後的狀態
        const afterReload = await page.evaluate(() => {
          const node = document.querySelector('.vue-flow__node');
          if (!node) return null;
          
          const rect = node.getBoundingClientRect();
          const transform = node.style.transform;
          
          return {
            rect: { x: rect.x, y: rect.y },
            transform: transform,
            computedStyle: {
              left: window.getComputedStyle(node).left,
              top: window.getComputedStyle(node).top
            }
          };
        });
        
        if (afterReload) {
          console.log('重新載入後狀態:');
          console.log(`  位置: (${afterReload.rect.x}, ${afterReload.rect.y})`);
          console.log(`  Transform: ${afterReload.transform}`);
          console.log(`  Computed left/top: ${afterReload.computedStyle.left}, ${afterReload.computedStyle.top}`);
          
          const reloadXDiff = afterReload.rect.x - afterMove.rect.x;
          const reloadYDiff = afterReload.rect.y - afterMove.rect.y;
          console.log(`重新載入位置變化: (${reloadXDiff}, ${reloadYDiff})`);
          
          if (Math.abs(reloadXDiff) < 10 && Math.abs(reloadYDiff) < 10) {
            console.log('✅ 節點位置恢復正常');
          } else {
            console.log('❌ 節點位置恢復異常');
          }
        }
      }
    }
    
    // 最終檢查連線樣式
    console.log('\n📊 === 重新載入後連線樣式檢查 ===');
    
    const finalEdgeAnalysis = await page.evaluate(() => {
      const edges = document.querySelectorAll('.vue-flow__edge');
      const edgeData = [];
      
      edges.forEach((edge, index) => {
        const path = edge.querySelector('.vue-flow__edge-path');
        const style = window.getComputedStyle(path);
        
        edgeData.push({
          index: index + 1,
          isAnimated: edge.classList.contains('animated') || 
                     style.animation !== 'none' ||
                     style.strokeDasharray !== 'none',
          strokeDasharray: style.strokeDasharray,
          animation: style.animation
        });
      });
      
      return edgeData;
    });
    
    finalEdgeAnalysis.forEach(edge => {
      console.log(`連線 ${edge.index}: 動畫=${edge.isAnimated ? '✅' : '❌'} 虛線=${edge.strokeDasharray} 動畫=${edge.animation}`);
    });
    
  } catch (error) {
    console.error('❌ 診斷過程中發生錯誤:', error);
  } finally {
    await browser.close();
  }
}

// 執行診斷
if (require.main === module) {
  diagnoseEdgeAndPosition().catch(console.error);
}

module.exports = { diagnoseEdgeAndPosition };
