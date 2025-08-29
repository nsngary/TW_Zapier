import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useWorkflowManager } from '../useWorkflowManager'
import type { Node, Edge } from '@vue-flow/core'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock ElMessage
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn()
  },
  ElMessageBox: {
    confirm: vi.fn(),
    prompt: vi.fn()
  }
}))

describe('useWorkflowManager', () => {
  let workflowManager: ReturnType<typeof useWorkflowManager>
  let mockNodes: Node[]
  let mockEdges: Edge[]

  beforeEach(() => {
    vi.clearAllMocks()
    workflowManager = useWorkflowManager()
    
    mockNodes = [
      {
        id: 'node-1',
        type: 'taiwanNode',
        position: { x: 100, y: 100 },
        data: {
          label: '測試節點',
          nodeType: 'manualTrigger'
        }
      }
    ]
    
    mockEdges = [
      {
        id: 'edge-1',
        source: 'node-1',
        target: 'node-2'
      }
    ]
  })

  afterEach(() => {
    localStorageMock.clear()
  })

  describe('本地儲存功能', () => {
    it('應該能夠儲存工作流到本地存儲', async () => {
      localStorageMock.getItem.mockReturnValue('[]')
      
      const result = await workflowManager.saveWorkflowToLocal(
        '測試工作流',
        mockNodes,
        mockEdges,
        { x: 0, y: 0, zoom: 1 }
      )
      
      expect(result).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'tw-zapier-workflows',
        expect.stringContaining('測試工作流')
      )
    })

    it('應該能夠從本地存儲載入工作流', async () => {
      const mockSavedWorkflow = {
        id: 'workflow-1',
        name: '測試工作流',
        nodes: mockNodes,
        edges: mockEdges,
        viewport: { x: 0, y: 0, zoom: 1 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0'
      }
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify([mockSavedWorkflow]))
      
      const result = await workflowManager.loadWorkflowFromLocal('workflow-1')
      
      expect(result).toEqual({
        nodes: mockNodes,
        edges: mockEdges,
        viewport: { x: 0, y: 0, zoom: 1 }
      })
    })

    it('應該能夠獲取所有已儲存的工作流', () => {
      const mockSavedWorkflows = [
        {
          id: 'workflow-1',
          name: '工作流 1',
          nodes: [],
          edges: [],
          viewport: { x: 0, y: 0, zoom: 1 },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: '1.0.0'
        }
      ]
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockSavedWorkflows))
      
      const result = workflowManager.getSavedWorkflows()
      
      expect(result).toEqual(mockSavedWorkflows)
    })

    it('當本地存儲為空時應該返回空陣列', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      const result = workflowManager.getSavedWorkflows()
      
      expect(result).toEqual([])
    })

    it('當本地存儲資料損壞時應該返回空陣列', () => {
      localStorageMock.getItem.mockReturnValue('invalid json')
      
      const result = workflowManager.getSavedWorkflows()
      
      expect(result).toEqual([])
    })
  })

  describe('自動儲存功能', () => {
    it('應該能夠自動儲存工作流', () => {
      workflowManager.autoSaveWorkflow(
        mockNodes,
        mockEdges,
        { x: 0, y: 0, zoom: 1 }
      )
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'tw-zapier-auto-save',
        expect.stringContaining('timestamp')
      )
    })

    it('應該能夠恢復自動儲存的工作流', () => {
      const mockAutoSave = {
        nodes: mockNodes,
        edges: mockEdges,
        viewport: { x: 0, y: 0, zoom: 1 },
        timestamp: new Date().toISOString()
      }
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAutoSave))
      
      const result = workflowManager.restoreAutoSave()
      
      expect(result).toEqual({
        nodes: mockNodes,
        edges: mockEdges,
        viewport: { x: 0, y: 0, zoom: 1 }
      })
    })

    it('應該忽略過期的自動儲存', () => {
      const oldTimestamp = new Date(Date.now() - 40 * 60 * 1000).toISOString() // 40分鐘前
      const mockAutoSave = {
        nodes: mockNodes,
        edges: mockEdges,
        viewport: { x: 0, y: 0, zoom: 1 },
        timestamp: oldTimestamp
      }
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockAutoSave))
      
      const result = workflowManager.restoreAutoSave()
      
      expect(result).toBeNull()
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('tw-zapier-auto-save')
    })

    it('應該能夠清除自動儲存', () => {
      workflowManager.clearAutoSave()
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('tw-zapier-auto-save')
    })
  })

  describe('狀態管理', () => {
    it('應該正確追蹤載入狀態', async () => {
      localStorageMock.getItem.mockReturnValue('[]')
      
      expect(workflowManager.isLoading.value).toBe(false)
      
      const savePromise = workflowManager.saveWorkflowToLocal(
        '測試工作流',
        mockNodes,
        mockEdges
      )
      
      // 在非同步操作期間，載入狀態應該為 true
      // 但由於操作很快完成，我們主要測試最終狀態
      await savePromise
      
      expect(workflowManager.isLoading.value).toBe(false)
    })

    it('應該正確更新當前工作流名稱', async () => {
      localStorageMock.getItem.mockReturnValue('[]')
      
      await workflowManager.saveWorkflowToLocal(
        '新工作流名稱',
        mockNodes,
        mockEdges
      )
      
      expect(workflowManager.currentWorkflowName.value).toBe('新工作流名稱')
    })

    it('應該正確追蹤未儲存變更狀態', async () => {
      localStorageMock.getItem.mockReturnValue('[]')
      
      // 儲存後應該沒有未儲存變更
      await workflowManager.saveWorkflowToLocal(
        '測試工作流',
        mockNodes,
        mockEdges
      )
      
      expect(workflowManager.hasUnsavedChanges.value).toBe(false)
    })
  })

  describe('錯誤處理', () => {
    it('當儲存失敗時應該返回 false', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })
      
      const result = await workflowManager.saveWorkflowToLocal(
        '測試工作流',
        mockNodes,
        mockEdges
      )
      
      expect(result).toBe(false)
    })

    it('當載入不存在的工作流時應該返回 null', async () => {
      localStorageMock.getItem.mockReturnValue('[]')
      
      const result = await workflowManager.loadWorkflowFromLocal('non-existent-id')
      
      expect(result).toBeNull()
    })
  })
})
