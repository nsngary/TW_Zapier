/**
 * 工作流編輯器測試
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ElMessage } from 'element-plus'
import WorkflowEditor from '../WorkflowEditor.vue'
import { nodeLibrary } from '@/config/nodeLibrary'
import { validateConnection } from '@/utils/connectionValidator'
import type { WorkflowNode, WorkflowConnection } from '@/types/workflow'

// Mock Element Plus
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn()
  }
}))

// Mock Vue Flow
vi.mock('@vue-flow/core', () => ({
  VueFlow: {
    name: 'VueFlow',
    template: '<div class="vue-flow-mock"><slot /></div>'
  },
  useVueFlow: () => ({
    addNodes: vi.fn(),
    addEdges: vi.fn(),
    removeNodes: vi.fn(),
    removeEdges: vi.fn(),
    getNodes: vi.fn(() => []),
    getEdges: vi.fn(() => []),
    onConnect: vi.fn(),
    onNodeDragStop: vi.fn(),
    onEdgeClick: vi.fn(),
    viewport: { value: { x: 0, y: 0, zoom: 1 } }
  }),
  Background: { name: 'Background' },
  MiniMap: { name: 'MiniMap' },
  Controls: { name: 'Controls' },
  Handle: { name: 'Handle' }
}))

describe('WorkflowEditor', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(WorkflowEditor, {
      props: {
        initialNodes: [],
        initialConnections: [],
        readonly: false
      },
      global: {
        stubs: {
          'el-container': true,
          'el-aside': true,
          'el-main': true,
          'el-button': true,
          'el-icon': true,
          'NodePalette': true,
          'NodePropertiesPanel': true,
          'WorkflowPreview': true,
          'ConnectionValidator': true
        }
      }
    })
  })

  describe('初始化', () => {
    it('應該正確渲染編輯器', () => {
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.workflow-editor').exists()).toBe(true)
    })

    it('應該載入節點庫', () => {
      expect(Object.keys(nodeLibrary).length).toBeGreaterThan(0)
    })

    it('應該初始化空的節點和連線', () => {
      const vm = wrapper.vm
      expect(vm.nodes).toEqual([])
      expect(vm.connections).toEqual([])
    })
  })

  describe('節點操作', () => {
    it('應該能夠添加節點', async () => {
      const vm = wrapper.vm
      const mockNode: WorkflowNode = {
        id: 'test-node-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {
          label: '手動觸發',
          type: 'manual',
          settings: {}
        }
      }

      await vm.addNode(mockNode)
      expect(vm.nodes).toHaveLength(1)
      expect(vm.nodes[0].id).toBe('test-node-1')
    })

    it('應該能夠刪除節點', async () => {
      const vm = wrapper.vm
      const mockNode: WorkflowNode = {
        id: 'test-node-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {}
      }

      vm.nodes = [mockNode]
      await vm.removeNode('test-node-1')
      expect(vm.nodes).toHaveLength(0)
    })

    it('應該能夠更新節點屬性', async () => {
      const vm = wrapper.vm
      const mockNode: WorkflowNode = {
        id: 'test-node-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: { label: '原始標籤' }
      }

      vm.nodes = [mockNode]
      
      const updatedNode = {
        ...mockNode,
        label: '更新後的標籤',
        data: { label: '更新後的標籤' }
      }

      await vm.updateNode(updatedNode)
      expect(vm.nodes[0].label).toBe('更新後的標籤')
    })

    it('應該能夠選擇節點', async () => {
      const vm = wrapper.vm
      const mockNode: WorkflowNode = {
        id: 'test-node-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {}
      }

      vm.nodes = [mockNode]
      await vm.selectNode('test-node-1')
      expect(vm.selectedNodeId).toBe('test-node-1')
    })
  })

  describe('連線操作', () => {
    it('應該能夠添加連線', async () => {
      const vm = wrapper.vm
      const sourceNode: WorkflowNode = {
        id: 'source-node',
        type: 'manualTrigger',
        label: '觸發節點',
        position: { x: 100, y: 100 },
        data: {}
      }
      
      const targetNode: WorkflowNode = {
        id: 'target-node',
        type: 'httpRequest',
        label: 'HTTP請求',
        position: { x: 300, y: 100 },
        data: {}
      }

      vm.nodes = [sourceNode, targetNode]

      const mockConnection: WorkflowConnection = {
        id: 'test-connection-1',
        source: 'source-node',
        target: 'target-node',
        sourceHandle: 'output',
        targetHandle: 'input'
      }

      await vm.addConnection(mockConnection)
      expect(vm.connections).toHaveLength(1)
      expect(vm.connections[0].source).toBe('source-node')
      expect(vm.connections[0].target).toBe('target-node')
    })

    it('應該能夠刪除連線', async () => {
      const vm = wrapper.vm
      const mockConnection: WorkflowConnection = {
        id: 'test-connection-1',
        source: 'source-node',
        target: 'target-node',
        sourceHandle: 'output',
        targetHandle: 'input'
      }

      vm.connections = [mockConnection]
      await vm.removeConnection('test-connection-1')
      expect(vm.connections).toHaveLength(0)
    })

    it('應該驗證連線的有效性', () => {
      const sourceNode: WorkflowNode = {
        id: 'source-node',
        type: 'manualTrigger',
        label: '觸發節點',
        position: { x: 100, y: 100 },
        data: {}
      }
      
      const targetNode: WorkflowNode = {
        id: 'target-node',
        type: 'httpRequest',
        label: 'HTTP請求',
        position: { x: 300, y: 100 },
        data: {}
      }

      const validation = validateConnection(sourceNode, targetNode, [])
      expect(validation.isValid).toBe(true)
    })

    it('應該阻止無效的連線', () => {
      const sourceNode: WorkflowNode = {
        id: 'source-node',
        type: 'httpRequest',
        label: 'HTTP請求',
        position: { x: 100, y: 100 },
        data: {}
      }
      
      const targetNode: WorkflowNode = {
        id: 'target-node',
        type: 'manualTrigger',
        label: '觸發節點',
        position: { x: 300, y: 100 },
        data: {}
      }

      const validation = validateConnection(sourceNode, targetNode, [])
      expect(validation.isValid).toBe(false)
      expect(validation.errors.length).toBeGreaterThan(0)
    })
  })

  describe('拖拉操作', () => {
    it('應該處理節點拖拉', async () => {
      const vm = wrapper.vm
      const mockPaletteNode = {
        type: 'manualTrigger',
        label: '手動觸發',
        description: '手動啟動工作流程',
        icon: 'VideoPlay',
        category: 'trigger',
        defaultData: {
          label: '手動觸發',
          type: 'manual',
          settings: {}
        }
      }

      const mockDropEvent = {
        preventDefault: vi.fn(),
        dataTransfer: {
          getData: vi.fn().mockReturnValue(JSON.stringify({
            type: 'palette-node',
            nodeType: 'manualTrigger',
            nodeData: mockPaletteNode.defaultData
          }))
        },
        clientX: 200,
        clientY: 150
      }

      await vm.handleDrop(mockDropEvent)
      expect(vm.nodes).toHaveLength(1)
      expect(vm.nodes[0].type).toBe('manualTrigger')
    })

    it('應該處理節點位置更新', async () => {
      const vm = wrapper.vm
      const mockNode: WorkflowNode = {
        id: 'test-node-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {}
      }

      vm.nodes = [mockNode]

      const newPosition = { x: 200, y: 200 }
      await vm.updateNodePosition('test-node-1', newPosition)
      
      expect(vm.nodes[0].position).toEqual(newPosition)
    })
  })

  describe('工作流驗證', () => {
    it('應該驗證工作流完整性', () => {
      const vm = wrapper.vm
      
      // 空工作流應該無效
      let validation = vm.validateWorkflow()
      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('工作流必須包含至少一個觸發節點')

      // 添加觸發節點
      const triggerNode: WorkflowNode = {
        id: 'trigger-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {}
      }

      vm.nodes = [triggerNode]
      validation = vm.validateWorkflow()
      expect(validation.isValid).toBe(true)
    })

    it('應該檢測孤立節點', () => {
      const vm = wrapper.vm
      
      const triggerNode: WorkflowNode = {
        id: 'trigger-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {}
      }

      const isolatedNode: WorkflowNode = {
        id: 'isolated-1',
        type: 'httpRequest',
        label: 'HTTP請求',
        position: { x: 300, y: 100 },
        data: {}
      }

      vm.nodes = [triggerNode, isolatedNode]
      vm.connections = []

      const validation = vm.validateWorkflow()
      expect(validation.warnings).toContain('發現 1 個孤立節點，它們不會被執行')
    })
  })

  describe('儲存和載入', () => {
    it('應該能夠匯出工作流資料', () => {
      const vm = wrapper.vm
      const mockNode: WorkflowNode = {
        id: 'test-node-1',
        type: 'manualTrigger',
        label: '手動觸發',
        position: { x: 100, y: 100 },
        data: {}
      }

      vm.nodes = [mockNode]
      vm.connections = []

      const exportData = vm.exportWorkflowData()
      expect(exportData.nodes).toHaveLength(1)
      expect(exportData.connections).toHaveLength(0)
      expect(exportData.nodes[0].id).toBe('test-node-1')
    })

    it('應該能夠載入工作流資料', async () => {
      const vm = wrapper.vm
      const mockWorkflowData = {
        name: '測試工作流',
        description: '測試描述',
        nodes: [{
          id: 'test-node-1',
          type: 'manualTrigger',
          label: '手動觸發',
          position: { x: 100, y: 100 },
          data: {}
        }],
        connections: []
      }

      await vm.loadWorkflowData(mockWorkflowData)
      expect(vm.nodes).toHaveLength(1)
      expect(vm.nodes[0].id).toBe('test-node-1')
    })
  })

  describe('台灣特色功能', () => {
    it('應該支援台灣金流節點', () => {
      const taiwanPaymentNodes = ['linePay', 'ecPay', 'newebPay', 'spgateway']
      
      taiwanPaymentNodes.forEach(nodeType => {
        const nodeExists = Object.values(nodeLibrary)
          .flat()
          .some(node => node.type === nodeType)
        expect(nodeExists).toBe(true)
      })
    })

    it('應該支援台灣服務節點', () => {
      const taiwanServiceNodes = [
        'taoyuanAirport',
        'govOpenData', 
        'weatherBureau',
        'taiwanRailway',
        'highSpeedRail'
      ]
      
      taiwanServiceNodes.forEach(nodeType => {
        const nodeExists = Object.values(nodeLibrary)
          .flat()
          .some(node => node.type === nodeType)
        expect(nodeExists).toBe(true)
      })
    })

    it('應該支援Line通知節點', () => {
      const lineNotifyExists = Object.values(nodeLibrary)
        .flat()
        .some(node => node.type === 'lineNotify')
      expect(lineNotifyExists).toBe(true)
    })
  })

  describe('錯誤處理', () => {
    it('應該處理無效的節點類型', async () => {
      const vm = wrapper.vm
      const invalidNode = {
        id: 'invalid-node',
        type: 'invalidType',
        label: '無效節點',
        position: { x: 100, y: 100 },
        data: {}
      }

      await vm.addNode(invalidNode)
      expect(ElMessage.warning).toHaveBeenCalledWith('不支援的節點類型: invalidType')
    })

    it('應該處理重複的節點ID', async () => {
      const vm = wrapper.vm
      const node1: WorkflowNode = {
        id: 'duplicate-id',
        type: 'manualTrigger',
        label: '節點1',
        position: { x: 100, y: 100 },
        data: {}
      }

      const node2: WorkflowNode = {
        id: 'duplicate-id',
        type: 'httpRequest',
        label: '節點2',
        position: { x: 200, y: 100 },
        data: {}
      }

      await vm.addNode(node1)
      await vm.addNode(node2)
      
      expect(ElMessage.error).toHaveBeenCalledWith('節點ID已存在: duplicate-id')
      expect(vm.nodes).toHaveLength(1)
    })

    it('應該處理循環連線', () => {
      const node1: WorkflowNode = {
        id: 'node-1',
        type: 'manualTrigger',
        label: '節點1',
        position: { x: 100, y: 100 },
        data: {}
      }

      const node2: WorkflowNode = {
        id: 'node-2',
        type: 'httpRequest',
        label: '節點2',
        position: { x: 200, y: 100 },
        data: {}
      }

      const existingConnections: WorkflowConnection[] = [{
        id: 'conn-1',
        source: 'node-2',
        target: 'node-1',
        sourceHandle: 'output',
        targetHandle: 'input'
      }]

      const validation = validateConnection(node1, node2, existingConnections)
      expect(validation.isValid).toBe(false)
      expect(validation.errors).toContain('此連線會形成循環，可能導致無限執行')
    })
  })
})
