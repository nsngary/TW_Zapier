/**
 * 拖拉式工作流編輯器測試
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ref } from 'vue'
import { useWorkflow } from '@/composables/useWorkflow'
import type { TaiwanNodeType } from '@/types/workflow'

// Mock Vue Flow
vi.mock('@vue-flow/core', () => ({
  useVueFlow: () => ({
    nodes: ref([]),
    edges: ref([]),
    addNodes: vi.fn(),
    addEdges: vi.fn(),
    removeNodes: vi.fn(),
    removeEdges: vi.fn(),
    updateNode: vi.fn(),
    updateEdge: vi.fn(),
    getNodes: vi.fn(() => []),
    getEdges: vi.fn(() => []),
    viewport: ref({ x: 0, y: 0, zoom: 1 }),
    setViewport: vi.fn(),
    fitView: vi.fn(),
    project: vi.fn(),
    vueFlowRef: ref(null)
  }),
  VueFlow: {
    name: 'VueFlow',
    template: '<div class="vue-flow"><slot /></div>'
  },
  Handle: {
    name: 'Handle',
    template: '<div class="handle"></div>',
    props: ['type', 'position']
  },
  Position: {
    Left: 'left',
    Right: 'right',
    Top: 'top',
    Bottom: 'bottom'
  },
  Background: {
    name: 'Background',
    template: '<div class="background"></div>'
  },
  Controls: {
    name: 'Controls',
    template: '<div class="controls"></div>'
  },
  MiniMap: {
    name: 'MiniMap',
    template: '<div class="minimap"></div>'
  }
}))

describe('useWorkflow Composable', () => {
  let workflow: ReturnType<typeof useWorkflow>

  beforeEach(() => {
    workflow = useWorkflow()
  })

  describe('節點管理', () => {
    it('應該能夠建立新節點', () => {
      const nodeType: TaiwanNodeType = 'linePay'
      const position = { x: 100, y: 200 }
      const data = { amount: 1000, productName: '測試商品' }

      const node = workflow.createNode(nodeType, position, data)

      expect(node.type).toBe(nodeType)
      expect(node.position).toEqual(position)
      expect(node.data.label).toBe('Line Pay')
      expect(node.data.amount).toBe(1000)
      expect(node.data.productName).toBe('測試商品')
      expect(node.id).toMatch(/^linePay-\d+-[a-z0-9]+$/)
    })

    it('應該能夠新增節點到工作流', () => {
      const nodeType: TaiwanNodeType = 'manualTrigger'
      const position = { x: 0, y: 0 }

      const node = workflow.addNode(nodeType, position)

      expect(workflow.nodeCount.value).toBe(1)
      expect(workflow.hasUnsavedChanges.value).toBe(true)
      expect(node.type).toBe(nodeType)
    })

    it('應該能夠更新節點資料', () => {
      const node = workflow.addNode('linePay', { x: 0, y: 0 })
      const newData = { amount: 2000, productName: '更新商品' }

      workflow.updateNodeData(node.id, newData)

      expect(workflow.hasUnsavedChanges.value).toBe(true)
    })

    it('應該能夠選中和取消選中節點', () => {
      const node = workflow.addNode('linePay', { x: 0, y: 0 })

      workflow.selectNode(node.id)
      expect(workflow.selectedNode.value?.id).toBe(node.id)

      workflow.clearSelection()
      expect(workflow.selectedNode.value).toBeUndefined()
    })
  })

  describe('工作流驗證', () => {
    it('應該驗證空工作流為無效', () => {
      const validation = workflow.validateWorkflow()

      expect(validation.isValid).toBe(false)
      expect(validation.globalErrors).toContain('工作流必須包含至少一個觸發節點')
    })

    it('應該驗證包含觸發節點的工作流為有效', () => {
      workflow.addNode('manualTrigger', { x: 0, y: 0 })

      const validation = workflow.validateWorkflow()

      expect(validation.isValid).toBe(true)
      expect(validation.globalErrors).toHaveLength(0)
    })

    it('應該驗證 Line Pay 節點參數', () => {
      const node = workflow.addNode('linePay', { x: 0, y: 0 }, {
        label: 'Line Pay',
        amount: 0, // 無效金額
        productName: '' // 空商品名稱
      })

      const validation = workflow.validateNode(node)

      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('付款金額必須大於 0')
      expect(validation.errors).toContain('商品名稱不能為空')
    })

    it('應該驗證有效的 Line Pay 節點', () => {
      const node = workflow.addNode('linePay', { x: 0, y: 0 }, {
        label: 'Line Pay',
        amount: 1000,
        productName: '測試商品'
      })

      const validation = workflow.validateNode(node)

      expect(validation.isValid).toBe(true)
      expect(validation.errors).toHaveLength(0)
    })
  })

  describe('工作流匯出和載入', () => {
    it('應該能夠匯出工作流', () => {
      // 建立測試工作流
      workflow.addNode('manualTrigger', { x: 0, y: 0 })
      workflow.addNode('linePay', { x: 200, y: 0 })

      // 設定當前工作流
      workflow.currentWorkflow.value = {
        id: 'test-workflow',
        name: '測試工作流',
        description: '測試用工作流',
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

      const exported = workflow.exportWorkflow()

      expect(exported).toBeDefined()
      expect(exported?.name).toBe('測試工作流')
      expect(exported?.nodes).toHaveLength(2)
    })

    it('應該能夠重置工作流', () => {
      workflow.addNode('manualTrigger', { x: 0, y: 0 })
      workflow.addNode('linePay', { x: 200, y: 0 })

      expect(workflow.nodeCount.value).toBe(2)

      workflow.resetWorkflow()

      expect(workflow.nodeCount.value).toBe(0)
      expect(workflow.hasUnsavedChanges.value).toBe(false)
      expect(workflow.currentWorkflow.value).toBeNull()
    })
  })

  describe('自動佈局', () => {
    it('應該能夠自動排列節點', () => {
      const trigger = workflow.addNode('manualTrigger', { x: 0, y: 0 })
      const linePay = workflow.addNode('linePay', { x: 0, y: 0 })

      // 模擬邊線
      workflow.addEdges([{
        id: 'edge-1',
        source: trigger.id,
        target: linePay.id
      }])

      workflow.autoLayout()

      expect(workflow.hasUnsavedChanges.value).toBe(true)
    })
  })
})

describe('節點類型標籤', () => {
  let workflow: ReturnType<typeof useWorkflow>

  beforeEach(() => {
    workflow = useWorkflow()
  })

  it('應該為不同節點類型返回正確的中文標籤', () => {
    const testCases: Array<[TaiwanNodeType, string]> = [
      ['manualTrigger', '手動觸發'],
      ['webhookTrigger', 'Webhook 觸發'],
      ['scheduleTrigger', '定時觸發'],
      ['linePay', 'Line Pay'],
      ['ecPay', '綠界科技'],
      ['taoyuanAirport', '桃機航班'],
      ['govOpenData', '政府開放資料'],
      ['httpRequest', 'HTTP 請求'],
      ['setData', '設定資料'],
      ['condition', '條件判斷'],
      ['loop', '迴圈'],
      ['lineNotify', 'Line 通知'],
      ['email', '電子郵件'],
      ['slack', 'Slack']
    ]

    testCases.forEach(([nodeType, expectedLabel]) => {
      const node = workflow.createNode(nodeType, { x: 0, y: 0 })
      expect(node.data.label).toBe(expectedLabel)
    })
  })
})

describe('工作流編輯器整合測試', () => {
  it('應該能夠建立完整的台灣金流工作流', () => {
    const workflow = useWorkflow()

    // 建立觸發節點
    const trigger = workflow.addNode('manualTrigger', { x: 100, y: 100 })

    // 建立 Line Pay 節點
    const linePay = workflow.addNode('linePay', { x: 300, y: 100 }, {
      amount: 1000,
      productName: '台灣特產',
      orderId: 'TW-ORDER-001',
      confirmUrl: 'https://example.com/confirm',
      cancelUrl: 'https://example.com/cancel'
    })

    // 建立通知節點
    const notify = workflow.addNode('lineNotify', { x: 500, y: 100 }, {
      message: '付款處理完成'
    })

    // 建立連線
    workflow.addEdges([
      {
        id: 'edge-1',
        source: trigger.id,
        target: linePay.id,
        animated: true
      },
      {
        id: 'edge-2',
        source: linePay.id,
        target: notify.id,
        animated: true
      }
    ])

    // 驗證工作流
    const validation = workflow.validateWorkflow()

    expect(validation.isValid).toBe(true)
    expect(workflow.nodeCount.value).toBe(3)
    expect(workflow.edgeCount.value).toBe(2)

    // 驗證節點配置
    expect(linePay.data.amount).toBe(1000)
    expect(linePay.data.productName).toBe('台灣特產')
    expect(notify.data.message).toBe('付款處理完成')
  })
})
