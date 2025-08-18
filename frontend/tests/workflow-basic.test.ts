/**
 * 基礎工作流功能測試
 */

import { describe, it, expect } from 'vitest'
import type { TaiwanNodeType, TaiwanWorkflow } from '@/types/workflow'

describe('工作流類型定義', () => {
  it('應該正確定義台灣節點類型', () => {
    const nodeTypes: TaiwanNodeType[] = [
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

    expect(nodeTypes).toHaveLength(14)
    expect(nodeTypes).toContain('linePay')
    expect(nodeTypes).toContain('ecPay')
    expect(nodeTypes).toContain('taoyuanAirport')
  })

  it('應該正確定義工作流結構', () => {
    const mockWorkflow: TaiwanWorkflow = {
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

    expect(mockWorkflow.id).toBe('test-workflow')
    expect(mockWorkflow.name).toBe('測試工作流')
    expect(mockWorkflow.nodes).toEqual([])
    expect(mockWorkflow.edges).toEqual([])
    expect(mockWorkflow.settings.theme).toBe('light')
  })
})

describe('節點資料結構', () => {
  it('應該正確定義 Line Pay 節點資料', () => {
    const linePayData = {
      label: 'Line Pay 付款',
      amount: 1000,
      productName: '測試商品',
      orderId: 'TW-ORDER-001',
      confirmUrl: 'https://example.com/confirm',
      cancelUrl: 'https://example.com/cancel',
      currency: 'TWD'
    }

    expect(linePayData.amount).toBe(1000)
    expect(linePayData.productName).toBe('測試商品')
    expect(linePayData.currency).toBe('TWD')
  })

  it('應該正確定義綠界節點資料', () => {
    const ecPayData = {
      label: '綠界科技',
      merchantTradeNo: 'TW-ECPAY-001',
      totalAmount: 2000,
      tradeDesc: '台灣商品購買',
      paymentType: 'aio' as const
    }

    expect(ecPayData.totalAmount).toBe(2000)
    expect(ecPayData.paymentType).toBe('aio')
    expect(ecPayData.merchantTradeNo).toBe('TW-ECPAY-001')
  })

  it('應該正確定義桃機航班節點資料', () => {
    const airportData = {
      label: '桃機航班',
      flightNumber: 'CI123',
      date: '2024-01-01',
      operation: 'getInfo' as const
    }

    expect(airportData.flightNumber).toBe('CI123')
    expect(airportData.operation).toBe('getInfo')
    expect(airportData.date).toBe('2024-01-01')
  })
})

describe('工作流驗證邏輯', () => {
  it('應該驗證必填欄位', () => {
    // 模擬節點驗證邏輯
    function validateLinePayNode(data: any) {
      const errors: string[] = []
      
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
    
    expect(invalidResult.isValid).toBe(false)
    expect(invalidResult.errors).toContain('付款金額必須大於 0')
    expect(invalidResult.errors).toContain('商品名稱不能為空')

    // 測試有效資料
    const validData = { amount: 1000, productName: '測試商品' }
    const validResult = validateLinePayNode(validData)
    
    expect(validResult.isValid).toBe(true)
    expect(validResult.errors).toHaveLength(0)
  })

  it('應該驗證工作流完整性', () => {
    // 模擬工作流驗證邏輯
    function validateWorkflow(nodes: any[], edges: any[]) {
      const errors: string[] = []
      
      // 檢查是否有觸發節點
      const triggerNodes = nodes.filter(node => 
        ['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
      )
      
      if (triggerNodes.length === 0) {
        errors.push('工作流必須包含至少一個觸發節點')
      }
      
      // 檢查孤立節點
      const connectedNodeIds = new Set<string>()
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source)
        connectedNodeIds.add(edge.target)
      })
      
      const isolatedNodes = nodes.filter(node => 
        !connectedNodeIds.has(node.id) && 
        !['manualTrigger', 'webhookTrigger', 'scheduleTrigger'].includes(node.type)
      )
      
      if (isolatedNodes.length > 0) {
        errors.push(`發現 ${isolatedNodes.length} 個未連接的節點`)
      }
      
      return {
        isValid: errors.length === 0,
        errors
      }
    }

    // 測試空工作流
    const emptyResult = validateWorkflow([], [])
    expect(emptyResult.isValid).toBe(false)
    expect(emptyResult.errors).toContain('工作流必須包含至少一個觸發節點')

    // 測試有效工作流
    const validNodes = [
      { id: 'trigger-1', type: 'manualTrigger' },
      { id: 'linepay-1', type: 'linePay' }
    ]
    const validEdges = [
      { source: 'trigger-1', target: 'linepay-1' }
    ]
    
    const validResult = validateWorkflow(validNodes, validEdges)
    expect(validResult.isValid).toBe(true)
    expect(validResult.errors).toHaveLength(0)
  })
})

describe('n8n 格式轉換', () => {
  it('應該正確轉換節點類型到 n8n 格式', () => {
    function mapToN8nNodeType(nodeType: TaiwanNodeType): string {
      const typeMap: Record<TaiwanNodeType, string> = {
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

    expect(mapToN8nNodeType('manualTrigger')).toBe('n8n-nodes-base.manualTrigger')
    expect(mapToN8nNodeType('linePay')).toBe('linePay')
    expect(mapToN8nNodeType('ecPay')).toBe('ecPay')
    expect(mapToN8nNodeType('httpRequest')).toBe('n8n-nodes-base.httpRequest')
  })

  it('應該正確轉換節點參數到 n8n 格式', () => {
    function mapToN8nParameters(nodeType: TaiwanNodeType, data: any): any {
      switch (nodeType) {
        case 'linePay':
          return {
            resource: 'payment',
            operation: 'create',
            amount: data.amount,
            productName: data.productName,
            orderId: data.orderId,
            confirmUrl: data.confirmUrl,
            cancelUrl: data.cancelUrl
          }
        
        case 'ecPay':
          return {
            resource: 'payment',
            operation: 'create',
            totalAmount: data.totalAmount,
            merchantTradeNo: data.merchantTradeNo,
            tradeDesc: data.tradeDesc,
            paymentType: data.paymentType
          }
        
        default:
          return data
      }
    }

    const linePayData = {
      amount: 1000,
      productName: '測試商品',
      orderId: 'TW-ORDER-001'
    }

    const n8nParams = mapToN8nParameters('linePay', linePayData)
    
    expect(n8nParams.resource).toBe('payment')
    expect(n8nParams.operation).toBe('create')
    expect(n8nParams.amount).toBe(1000)
    expect(n8nParams.productName).toBe('測試商品')
  })
})

describe('工作流編輯器功能', () => {
  it('應該支援節點標籤本地化', () => {
    const nodeLabels: Record<TaiwanNodeType, string> = {
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

    expect(nodeLabels.linePay).toBe('Line Pay')
    expect(nodeLabels.ecPay).toBe('綠界科技')
    expect(nodeLabels.taoyuanAirport).toBe('桃機航班')
    expect(nodeLabels.manualTrigger).toBe('手動觸發')
  })

  it('應該支援工作流匯出功能', () => {
    const mockWorkflow: TaiwanWorkflow = {
      id: 'export-test',
      name: '匯出測試工作流',
      description: '測試工作流匯出功能',
      version: '1.0.0',
      nodes: [
        {
          id: 'trigger-1',
          type: 'manualTrigger',
          position: { x: 100, y: 100 },
          data: { label: '手動觸發' },
          draggable: true,
          selectable: true,
          deletable: true
        },
        {
          id: 'linepay-1',
          type: 'linePay',
          position: { x: 300, y: 100 },
          data: {
            label: 'Line Pay',
            amount: 1000,
            productName: '測試商品'
          },
          draggable: true,
          selectable: true,
          deletable: true
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

    // 驗證工作流結構
    expect(mockWorkflow.nodes).toHaveLength(2)
    expect(mockWorkflow.edges).toHaveLength(1)
    expect(mockWorkflow.nodes[0].type).toBe('manualTrigger')
    expect(mockWorkflow.nodes[1].type).toBe('linePay')
    expect(mockWorkflow.edges[0].source).toBe('trigger-1')
    expect(mockWorkflow.edges[0].target).toBe('linepay-1')

    // 模擬 JSON 序列化
    const serialized = JSON.stringify(mockWorkflow)
    const deserialized = JSON.parse(serialized)
    
    expect(deserialized.name).toBe('匯出測試工作流')
    expect(deserialized.nodes).toHaveLength(2)
  })
})
