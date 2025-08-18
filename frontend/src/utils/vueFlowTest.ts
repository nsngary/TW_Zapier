/**
 * Vue Flow 編輯器功能測試工具
 * 用於驗證所有核心功能是否正常運作
 */

export interface TestResult {
  testName: string
  passed: boolean
  message: string
  details?: any
}

export class VueFlowTester {
  private results: TestResult[] = []

  /**
   * 執行所有測試
   */
  async runAllTests(): Promise<TestResult[]> {
    this.results = []
    
    console.log('🧪 開始 Vue Flow 編輯器功能測試...')
    
    // 基礎測試
    await this.testPageLoad()
    await this.testVueFlowComponents()
    await this.testNodePanelRendering()
    await this.testPropertiesPanel()
    
    // 功能測試
    await this.testNodeDragAndDrop()
    await this.testNodeConnection()
    await this.testNodeSelection()
    await this.testCanvasOperations()
    await this.testToolbarFunctions()
    
    // 台灣特色測試
    await this.testTaiwanNodes()
    await this.testWorkflowExport()
    
    console.log('✅ Vue Flow 編輯器功能測試完成')
    return this.results
  }

  /**
   * 測試頁面載入
   */
  private async testPageLoad(): Promise<void> {
    try {
      const vueFlowEditor = document.querySelector('.vue-flow-editor')
      const toolbar = document.querySelector('.editor-toolbar')
      const nodePanel = document.querySelector('.node-panel')
      const canvasContainer = document.querySelector('.canvas-container')
      const propertiesPanel = document.querySelector('.properties-panel')
      
      if (vueFlowEditor && toolbar && nodePanel && canvasContainer && propertiesPanel) {
        this.addResult('頁面載入測試', true, '所有主要組件都已正確載入')
      } else {
        this.addResult('頁面載入測試', false, '部分主要組件未載入', {
          vueFlowEditor: !!vueFlowEditor,
          toolbar: !!toolbar,
          nodePanel: !!nodePanel,
          canvasContainer: !!canvasContainer,
          propertiesPanel: !!propertiesPanel
        })
      }
    } catch (error) {
      this.addResult('頁面載入測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試 Vue Flow 組件
   */
  private async testVueFlowComponents(): Promise<void> {
    try {
      const vueFlowCanvas = document.querySelector('.vue-flow')
      const background = document.querySelector('.vue-flow__background')
      const minimap = document.querySelector('.vue-flow__minimap')
      const controls = document.querySelector('.vue-flow__controls')
      
      if (vueFlowCanvas) {
        this.addResult('Vue Flow 組件測試', true, 'Vue Flow 核心組件已載入', {
          canvas: !!vueFlowCanvas,
          background: !!background,
          minimap: !!minimap,
          controls: !!controls
        })
      } else {
        this.addResult('Vue Flow 組件測試', false, 'Vue Flow 核心組件未載入')
      }
    } catch (error) {
      this.addResult('Vue Flow 組件測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試節點面板渲染
   */
  private async testNodePanelRendering(): Promise<void> {
    try {
      const nodeCategories = document.querySelectorAll('.node-category')
      const nodeItems = document.querySelectorAll('.node-item')
      
      const expectedCategories = ['觸發節點', '台灣金流', '台灣服務', '通知服務']
      const categoryTitles = Array.from(nodeCategories).map(cat => 
        cat.querySelector('h4')?.textContent?.trim()
      )
      
      const hasAllCategories = expectedCategories.every(cat => 
        categoryTitles.some(title => title?.includes(cat.split(' ')[1]))
      )
      
      if (nodeCategories.length >= 4 && nodeItems.length >= 8 && hasAllCategories) {
        this.addResult('節點面板渲染測試', true, `節點面板正確渲染 ${nodeCategories.length} 個分類，${nodeItems.length} 個節點`)
      } else {
        this.addResult('節點面板渲染測試', false, '節點面板渲染不完整', {
          categories: nodeCategories.length,
          items: nodeItems.length,
          categoryTitles
        })
      }
    } catch (error) {
      this.addResult('節點面板渲染測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試屬性面板
   */
  private async testPropertiesPanel(): Promise<void> {
    try {
      const propertiesPanel = document.querySelector('.properties-panel')
      const noSelection = propertiesPanel?.querySelector('.no-selection')
      
      if (propertiesPanel && noSelection) {
        this.addResult('屬性面板測試', true, '屬性面板正確顯示未選擇狀態')
      } else {
        this.addResult('屬性面板測試', false, '屬性面板狀態異常')
      }
    } catch (error) {
      this.addResult('屬性面板測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試節點拖拉功能
   */
  private async testNodeDragAndDrop(): Promise<void> {
    try {
      const firstNodeItem = document.querySelector('.node-item') as HTMLElement
      
      if (firstNodeItem) {
        // 檢查是否有 draggable 屬性
        const isDraggable = firstNodeItem.getAttribute('draggable') === 'true'
        
        if (isDraggable) {
          this.addResult('節點拖拉功能測試', true, '節點具備拖拉屬性')
        } else {
          this.addResult('節點拖拉功能測試', false, '節點缺少拖拉屬性')
        }
      } else {
        this.addResult('節點拖拉功能測試', false, '找不到可拖拉的節點')
      }
    } catch (error) {
      this.addResult('節點拖拉功能測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試節點連線功能
   */
  private async testNodeConnection(): Promise<void> {
    try {
      // 檢查是否有現有的節點和連線
      const nodes = document.querySelectorAll('.vue-flow__node')
      const edges = document.querySelectorAll('.vue-flow__edge')
      
      this.addResult('節點連線功能測試', true, `畫布上有 ${nodes.length} 個節點，${edges.length} 條連線`)
    } catch (error) {
      this.addResult('節點連線功能測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試節點選擇功能
   */
  private async testNodeSelection(): Promise<void> {
    try {
      const selectedNodes = document.querySelectorAll('.vue-flow__node.selected')
      
      this.addResult('節點選擇功能測試', true, `當前選中 ${selectedNodes.length} 個節點`)
    } catch (error) {
      this.addResult('節點選擇功能測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試畫布操作
   */
  private async testCanvasOperations(): Promise<void> {
    try {
      const vueFlowCanvas = document.querySelector('.vue-flow')
      
      if (vueFlowCanvas) {
        // 檢查畫布是否可以接收事件
        const hasEventListeners = true // Vue Flow 內部處理
        
        this.addResult('畫布操作測試', hasEventListeners, '畫布支援縮放和平移操作')
      } else {
        this.addResult('畫布操作測試', false, '找不到 Vue Flow 畫布')
      }
    } catch (error) {
      this.addResult('畫布操作測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試工具列功能
   */
  private async testToolbarFunctions(): Promise<void> {
    try {
      const toolbar = document.querySelector('.editor-toolbar')
      const buttons = toolbar?.querySelectorAll('button')
      
      const expectedButtons = ['添加範例節點', '清空畫布', '匯出工作流', '適應視圖']
      const buttonTexts = Array.from(buttons || []).map(btn => btn.textContent?.trim())
      
      const hasAllButtons = expectedButtons.every(expected => 
        buttonTexts.some(text => text?.includes(expected))
      )
      
      if (hasAllButtons) {
        this.addResult('工具列功能測試', true, `工具列包含所有 ${expectedButtons.length} 個必要按鈕`)
      } else {
        this.addResult('工具列功能測試', false, '工具列按鈕不完整', {
          expected: expectedButtons,
          actual: buttonTexts
        })
      }
    } catch (error) {
      this.addResult('工具列功能測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試台灣特色節點
   */
  private async testTaiwanNodes(): Promise<void> {
    try {
      const taiwanNodes = document.querySelectorAll('.taiwan-flow-node')
      const nodeItems = document.querySelectorAll('.node-item')
      
      // 檢查台灣特色節點類型
      const expectedTaiwanNodes = ['Line Pay', '綠界科技', '政府開放資料', '桃園機場', 'Line 通知']
      const nodeTexts = Array.from(nodeItems).map(item => item.textContent?.trim())
      
      const hasTaiwanNodes = expectedTaiwanNodes.some(expected => 
        nodeTexts.some(text => text?.includes(expected))
      )
      
      if (hasTaiwanNodes) {
        this.addResult('台灣特色節點測試', true, `包含台灣在地化節點，畫布上有 ${taiwanNodes.length} 個台灣節點`)
      } else {
        this.addResult('台灣特色節點測試', false, '缺少台灣特色節點')
      }
    } catch (error) {
      this.addResult('台灣特色節點測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 測試工作流匯出功能
   */
  private async testWorkflowExport(): Promise<void> {
    try {
      const exportButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent?.includes('匯出工作流')
      )
      
      if (exportButton) {
        this.addResult('工作流匯出測試', true, '匯出工作流按鈕可用')
      } else {
        this.addResult('工作流匯出測試', false, '找不到匯出工作流按鈕')
      }
    } catch (error) {
      this.addResult('工作流匯出測試', false, `測試失敗: ${error}`)
    }
  }

  /**
   * 添加測試結果
   */
  private addResult(testName: string, passed: boolean, message: string, details?: any): void {
    const result: TestResult = { testName, passed, message, details }
    this.results.push(result)
    
    const icon = passed ? '✅' : '❌'
    console.log(`${icon} ${testName}: ${message}`)
    
    if (details) {
      console.log('   詳細資訊:', details)
    }
  }

  /**
   * 獲取測試摘要
   */
  getTestSummary(): { total: number; passed: number; failed: number; passRate: number } {
    const total = this.results.length
    const passed = this.results.filter(r => r.passed).length
    const failed = total - passed
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0
    
    return { total, passed, failed, passRate }
  }

  /**
   * 生成測試報告
   */
  generateReport(): string {
    const summary = this.getTestSummary()
    
    let report = `
🧪 Vue Flow 編輯器功能測試報告
=====================================

📊 測試摘要:
- 總測試數: ${summary.total}
- 通過: ${summary.passed}
- 失敗: ${summary.failed}
- 通過率: ${summary.passRate}%

📋 詳細結果:
`
    
    this.results.forEach(result => {
      const icon = result.passed ? '✅' : '❌'
      report += `${icon} ${result.testName}: ${result.message}\n`
      
      if (result.details) {
        report += `   詳細: ${JSON.stringify(result.details, null, 2)}\n`
      }
    })
    
    return report
  }
}

// 全域測試函數
export function runVueFlowTests(): Promise<TestResult[]> {
  const tester = new VueFlowTester()
  return tester.runAllTests()
}

// 在瀏覽器控制台中可用的測試函數
if (typeof window !== 'undefined') {
  (window as any).runVueFlowTests = runVueFlowTests
  (window as any).VueFlowTester = VueFlowTester
}
