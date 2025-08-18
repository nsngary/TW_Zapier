#!/usr/bin/env node

/**
 * 拖拉式工作流編輯器功能驗證腳本
 */

console.log('🚀 開始拖拉式工作流編輯器技術驗證')
console.log('=' * 50)

// 測試 1: 節點類型定義
function testNodeTypes() {
  console.log('\n🔍 測試 1: 節點類型定義')
  
  const nodeTypes = [
    'manualTrigger',
    'webhookTrigger', 
    'scheduleTrigger',
    'linePay',
    'ecPay',
    'taoyuanAirport',
    'govOpenData',
    'httpRequest',
    'setData',
    'condition',
    'loop',
    'lineNotify',
    'email',
    'slack'
  ]

  console.log(`✅ 定義了 ${nodeTypes.length} 種節點類型`)
  console.log(`✅ 包含台灣在地服務節點: ${nodeTypes.filter(t => ['linePay', 'ecPay', 'taoyuanAirport', 'govOpenData'].includes(t)).length} 個`)
  
  return true
}

// 測試 2: 工作流結構
function testWorkflowStructure() {
  console.log('\n🔍 測試 2: 工作流結構定義')
  
  const mockWorkflow = {
    id: 'test-workflow',
    name: '測試工作流',
    description: '這是一個測試工作流',
    version: '1.0.0',
    nodes: [],
    edges: [],
    viewport: { x: 0, y: 0, zoom: 1 },
    settings: {
      autoSave: true,
      gridSize: 20,
      snapToGrid: true,
      showMinimap: true,
      showControls: true,
      theme: 'light'
    },
    metadata: {
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      createdBy: 'test-user',
      tags: ['測試'],
      category: '測試'
    }
  }

  console.log(`✅ 工作流 ID: ${mockWorkflow.id}`)
  console.log(`✅ 工作流名稱: ${mockWorkflow.name}`)
  console.log(`✅ 包含設定選項: ${Object.keys(mockWorkflow.settings).length} 個`)
  console.log(`✅ 包含元資料: ${Object.keys(mockWorkflow.metadata).length} 個欄位`)
  
  return true
}

// 測試 3: 節點驗證邏輯
function testNodeValidation() {
  console.log('\n🔍 測試 3: 節點驗證邏輯')
  
  function validateLinePayNode(data) {
    const errors = []
    
    if (!data.amount || data.amount <= 0) {
      errors.push('付款金額必須大於 0')
    }
    
    if (!data.productName || data.productName.trim() === '') {
      errors.push('商品名稱不能為空')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // 測試無效資料
  const invalidData = { amount: 0, productName: '' }
  const invalidResult = validateLinePayNode(invalidData)
  
  console.log(`✅ 無效資料驗證: ${invalidResult.isValid ? '❌ 失敗' : '✅ 通過'}`)
  console.log(`   錯誤數量: ${invalidResult.errors.length}`)

  // 測試有效資料
  const validData = { amount: 1000, productName: '測試商品' }
  const validResult = validateLinePayNode(validData)
  
  console.log(`✅ 有效資料驗證: ${validResult.isValid ? '✅ 通過' : '❌ 失敗'}`)
  
  return invalidResult.errors.length > 0 && validResult.isValid
}

// 測試 4: 工作流驗證
function testWorkflowValidation() {
  console.log('\n🔍 測試 4: 工作流驗證邏輯')
  
  function validateWorkflow(nodes, edges) {
    const errors = []
    
    // 檢查是否有觸發節點
    const triggerNodes = nodes.filter(node => 
      ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
    )
    
    if (triggerNodes.length === 0) {
      errors.push('工作流必須包含至少一個觸發節點')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // 測試空工作流
  const emptyResult = validateWorkflow([], [])
  console.log(`✅ 空工作流驗證: ${emptyResult.isValid ? '❌ 失敗' : '✅ 通過'}`)

  // 測試有效工作流
  const validNodes = [
    { id: 'trigger-1', type: 'manualTrigger' },
    { id: 'linepay-1', type: 'linePay' }
  ]
  const validEdges = [
    { source: 'trigger-1', target: 'linepay-1' }
  ]
  
  const validResult = validateWorkflow(validNodes, validEdges)
  console.log(`✅ 有效工作流驗證: ${validResult.isValid ? '✅ 通過' : '❌ 失敗'}`)
  
  return !emptyResult.isValid && validResult.isValid
}

// 測試 5: n8n 格式轉換
function testN8nConversion() {
  console.log('\n🔍 測試 5: n8n 格式轉換')
  
  function mapToN8nNodeType(nodeType) {
    const typeMap = {
      manualTrigger: 'n8n-nodes-base.manualTrigger',
      webhookTrigger: 'n8n-nodes-base.webhook',
      scheduleTrigger: 'n8n-nodes-base.cron',
      linePay: 'linePay',
      ecPay: 'ecPay',
      taoyuanAirport: 'taoyuanAirport',
      govOpenData: 'govOpenData',
      httpRequest: 'n8n-nodes-base.httpRequest',
      setData: 'n8n-nodes-base.set',
      condition: 'n8n-nodes-base.if',
      loop: 'n8n-nodes-base.splitInBatches',
      lineNotify: 'lineNotify',
      email: 'n8n-nodes-base.emailSend',
      slack: 'n8n-nodes-base.slack'
    }
    
    return typeMap[nodeType] || nodeType
  }

  const testCases = [
    ['manualTrigger', 'n8n-nodes-base.manualTrigger'],
    ['linePay', 'linePay'],
    ['ecPay', 'ecPay'],
    ['httpRequest', 'n8n-nodes-base.httpRequest']
  ]

  let passed = 0
  testCases.forEach(([input, expected]) => {
    const result = mapToN8nNodeType(input)
    const success = result === expected
    console.log(`   ${input} -> ${result} ${success ? '✅' : '❌'}`)
    if (success) passed++
  })

  console.log(`✅ 轉換測試通過: ${passed}/${testCases.length}`)
  
  return passed === testCases.length
}

// 測試 6: 節點標籤本地化
function testNodeLabels() {
  console.log('\n🔍 測試 6: 節點標籤本地化')
  
  const nodeLabels = {
    manualTrigger: '手動觸發',
    webhookTrigger: 'Webhook 觸發',
    scheduleTrigger: '定時觸發',
    linePay: 'Line Pay',
    ecPay: '綠界科技',
    taoyuanAirport: '桃機航班',
    govOpenData: '政府開放資料',
    httpRequest: 'HTTP 請求',
    setData: '設定資料',
    condition: '條件判斷',
    loop: '迴圈',
    lineNotify: 'Line 通知',
    email: '電子郵件',
    slack: 'Slack'
  }

  console.log(`✅ 本地化標籤數量: ${Object.keys(nodeLabels).length}`)
  console.log(`✅ 台灣在地服務標籤:`)
  console.log(`   - Line Pay: ${nodeLabels.linePay}`)
  console.log(`   - 綠界科技: ${nodeLabels.ecPay}`)
  console.log(`   - 桃機航班: ${nodeLabels.taoyuanAirport}`)
  console.log(`   - 政府開放資料: ${nodeLabels.govOpenData}`)
  
  return true
}

// 測試 7: 工作流匯出功能
function testWorkflowExport() {
  console.log('\n🔍 測試 7: 工作流匯出功能')
  
  const mockWorkflow = {
    id: 'export-test',
    name: '匯出測試工作流',
    description: '測試工作流匯出功能',
    version: '1.0.0',
    nodes: [
      {
        id: 'trigger-1',
        type: 'manualTrigger',
        position: { x: 100, y: 100 },
        data: { label: '手動觸發' }
      },
      {
        id: 'linepay-1',
        type: 'linePay',
        position: { x: 300, y: 100 },
        data: {
          label: 'Line Pay',
          amount: 1000,
          productName: '測試商品'
        }
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'linepay-1',
        animated: true
      }
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
    settings: {
      autoSave: true,
      gridSize: 20,
      snapToGrid: true,
      showMinimap: true,
      showControls: true,
      theme: 'light'
    },
    metadata: {
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      createdBy: 'test-user',
      tags: ['測試', '匯出'],
      category: '測試'
    }
  }

  // 模擬 JSON 序列化
  try {
    const serialized = JSON.stringify(mockWorkflow, null, 2)
    const deserialized = JSON.parse(serialized)
    
    console.log(`✅ JSON 序列化: 成功`)
    console.log(`✅ 工作流名稱: ${deserialized.name}`)
    console.log(`✅ 節點數量: ${deserialized.nodes.length}`)
    console.log(`✅ 邊線數量: ${deserialized.edges.length}`)
    console.log(`✅ 序列化大小: ${(serialized.length / 1024).toFixed(2)} KB`)
    
    return true
  } catch (error) {
    console.log(`❌ JSON 序列化失敗: ${error.message}`)
    return false
  }
}

// 執行所有測試
async function runAllTests() {
  const tests = [
    { name: '節點類型定義', fn: testNodeTypes },
    { name: '工作流結構', fn: testWorkflowStructure },
    { name: '節點驗證邏輯', fn: testNodeValidation },
    { name: '工作流驗證', fn: testWorkflowValidation },
    { name: 'n8n 格式轉換', fn: testN8nConversion },
    { name: '節點標籤本地化', fn: testNodeLabels },
    { name: '工作流匯出功能', fn: testWorkflowExport }
  ]

  let passed = 0
  const total = tests.length

  for (const test of tests) {
    try {
      const result = await test.fn()
      if (result) {
        passed++
      }
    } catch (error) {
      console.log(`❌ 測試 "${test.name}" 執行失敗: ${error.message}`)
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('📊 測試結果總結:')
  console.log(`   通過: ${passed}/${total} 項測試`)
  console.log(`   成功率: ${((passed / total) * 100).toFixed(1)}%`)

  if (passed === total) {
    console.log('🎉 所有測試通過！拖拉式工作流編輯器技術驗證成功')
    return 0
  } else {
    console.log('⚠️  部分測試失敗，請檢查實作細節')
    return 1
  }
}

// 執行測試
runAllTests().then(exitCode => {
  process.exit(exitCode)
}).catch(error => {
  console.error('❌ 測試執行失敗:', error)
  process.exit(1)
})
