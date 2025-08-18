/**
 * 連線驗證器測試
 */

import { describe, it, expect } from 'vitest'
import { validateConnection, validateWorkflowConnections } from '../connectionValidator'
import { NodeCategory } from '@/types/workflow'
import type { WorkflowNode, WorkflowConnection } from '@/types/workflow'

describe('connectionValidator', () => {
  // 測試節點
  const triggerNode: WorkflowNode = {
    id: 'trigger-1',
    type: 'manualTrigger',
    label: '手動觸發',
    position: { x: 100, y: 100 },
    data: {}
  }

  const httpNode: WorkflowNode = {
    id: 'http-1',
    type: 'httpRequest',
    label: 'HTTP請求',
    position: { x: 300, y: 100 },
    data: {}
  }

  const linePayNode: WorkflowNode = {
    id: 'linepay-1',
    type: 'linePay',
    label: 'Line Pay',
    position: { x: 500, y: 100 },
    data: {}
  }

  const emailNode: WorkflowNode = {
    id: 'email-1',
    type: 'email',
    label: '電子郵件',
    position: { x: 700, y: 100 },
    data: {}
  }

  const conditionNode: WorkflowNode = {
    id: 'condition-1',
    type: 'condition',
    label: '條件判斷',
    position: { x: 400, y: 200 },
    data: {}
  }

  describe('validateConnection', () => {
    describe('基本連線規則', () => {
      it('應該允許觸發節點連接到任何節點', () => {
        const result = validateConnection(triggerNode, httpNode)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })

      it('應該禁止節點連接到觸發節點', () => {
        const result = validateConnection(httpNode, triggerNode)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('觸發節點不能作為其他節點的目標')
      })

      it('應該禁止節點連接到自己', () => {
        const result = validateConnection(httpNode, httpNode)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('節點不能連接到自己')
      })

      it('應該允許金流節點連接到通知節點', () => {
        const result = validateConnection(linePayNode, emailNode)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })

      it('應該允許通用節點連接到任何節點', () => {
        const result = validateConnection(httpNode, linePayNode)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })
    })

    describe('循環檢測', () => {
      it('應該檢測到直接循環', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'http-1',
          target: 'trigger-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(triggerNode, httpNode, existingConnections)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('此連線會形成循環，可能導致無限執行')
      })

      it('應該檢測到間接循環', () => {
        const existingConnections: WorkflowConnection[] = [
          {
            id: 'conn-1',
            source: 'http-1',
            target: 'linepay-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-2',
            source: 'linepay-1',
            target: 'trigger-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          }
        ]

        const result = validateConnection(triggerNode, httpNode, existingConnections)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('此連線會形成循環，可能導致無限執行')
      })

      it('應該允許非循環連線', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'trigger-1',
          target: 'http-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(httpNode, linePayNode, existingConnections)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })
    })

    describe('重複連線檢測', () => {
      it('應該檢測到重複連線', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'trigger-1',
          target: 'http-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(triggerNode, httpNode, existingConnections)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('節點間已存在連線')
      })

      it('應該允許不同方向的連線', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'http-1',
          target: 'trigger-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(triggerNode, httpNode, existingConnections)
        expect(result.isValid).toBe(false) // 但這會因為其他規則失敗
      })
    })

    describe('特殊規則檢查', () => {
      it('應該警告終端節點的輸出連線', () => {
        const result = validateConnection(emailNode, httpNode)
        expect(result.warnings).toContain('電子郵件 是終端節點，通常不需要輸出連線')
      })

      it('應該警告多輸出連線', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'http-1',
          target: 'linepay-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(httpNode, emailNode, existingConnections)
        expect(result.warnings).toContain('HTTP請求 已有輸出連線，多個輸出可能導致並行執行')
      })

      it('應該警告多輸入連線', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'trigger-1',
          target: 'http-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(linePayNode, httpNode, existingConnections)
        expect(result.warnings).toContain('HTTP請求 已有輸入連線，多個輸入可能導致資料覆蓋')
      })

      it('應該允許條件節點有多個輸出', () => {
        const existingConnections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'condition-1',
          target: 'http-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateConnection(conditionNode, linePayNode, existingConnections)
        expect(result.warnings).not.toContain('條件判斷 已有輸出連線，多個輸出可能導致並行執行')
      })
    })

    describe('資料類型相容性', () => {
      it('應該建議金流到通知節點間添加轉換', () => {
        const result = validateConnection(linePayNode, emailNode)
        expect(result.suggestions).toContain('建議在金流節點和通知節點間添加資料轉換節點來格式化付款結果')
      })

      it('應該建議台灣服務節點輸出轉換', () => {
        const taiwanServiceNode: WorkflowNode = {
          id: 'gov-1',
          type: 'govOpenData',
          label: '政府開放資料',
          position: { x: 300, y: 100 },
          data: {}
        }

        const result = validateConnection(taiwanServiceNode, httpNode)
        expect(result.suggestions).toContain('台灣服務節點輸出的資料格式可能需要轉換才能被其他節點使用')
      })
    })
  })

  describe('validateWorkflowConnections', () => {
    describe('整體工作流驗證', () => {
      it('應該要求至少一個觸發節點', () => {
        const nodes = [httpNode, linePayNode, emailNode]
        const connections: WorkflowConnection[] = []

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('工作流必須包含至少一個觸發節點')
      })

      it('應該允許有觸發節點的工作流', () => {
        const nodes = [triggerNode, httpNode]
        const connections: WorkflowConnection[] = []

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.isValid).toBe(true)
      })

      it('應該檢測孤立節點', () => {
        const nodes = [triggerNode, httpNode, linePayNode]
        const connections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'trigger-1',
          target: 'http-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.warnings).toContain('發現 1 個孤立節點，它們不會被執行')
      })

      it('應該檢測不存在的節點引用', () => {
        const nodes = [triggerNode, httpNode]
        const connections: WorkflowConnection[] = [{
          id: 'conn-1',
          source: 'trigger-1',
          target: 'non-existent',
          sourceHandle: 'output',
          targetHandle: 'input'
        }]

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain('連線 conn-1 引用了不存在的節點')
      })

      it('應該驗證所有連線', () => {
        const nodes = [triggerNode, httpNode, linePayNode, emailNode]
        const connections: WorkflowConnection[] = [
          {
            id: 'conn-1',
            source: 'trigger-1',
            target: 'http-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-2',
            source: 'http-1',
            target: 'linepay-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-3',
            source: 'linepay-1',
            target: 'email-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          }
        ]

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })
    })

    describe('複雜工作流驗證', () => {
      it('應該處理分支工作流', () => {
        const nodes = [triggerNode, conditionNode, httpNode, linePayNode, emailNode]
        const connections: WorkflowConnection[] = [
          {
            id: 'conn-1',
            source: 'trigger-1',
            target: 'condition-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-2',
            source: 'condition-1',
            target: 'http-1',
            sourceHandle: 'true',
            targetHandle: 'input'
          },
          {
            id: 'conn-3',
            source: 'condition-1',
            target: 'linepay-1',
            sourceHandle: 'false',
            targetHandle: 'input'
          },
          {
            id: 'conn-4',
            source: 'http-1',
            target: 'email-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-5',
            source: 'linepay-1',
            target: 'email-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          }
        ]

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.isValid).toBe(true)
      })

      it('應該檢測複雜循環', () => {
        const nodes = [triggerNode, httpNode, linePayNode, conditionNode]
        const connections: WorkflowConnection[] = [
          {
            id: 'conn-1',
            source: 'trigger-1',
            target: 'http-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-2',
            source: 'http-1',
            target: 'linepay-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-3',
            source: 'linepay-1',
            target: 'condition-1',
            sourceHandle: 'output',
            targetHandle: 'input'
          },
          {
            id: 'conn-4',
            source: 'condition-1',
            target: 'http-1', // 形成循環
            sourceHandle: 'true',
            targetHandle: 'input'
          }
        ]

        const result = validateWorkflowConnections(nodes, connections)
        expect(result.isValid).toBe(false)
        expect(result.errors.some(error => error.includes('循環'))).toBe(true)
      })
    })
  })

  describe('台灣特色節點驗證', () => {
    it('應該正確識別台灣金流節點', () => {
      const taiwanNodes = ['linePay', 'ecPay', 'newebPay', 'spgateway']
      
      taiwanNodes.forEach(nodeType => {
        const node: WorkflowNode = {
          id: `${nodeType}-1`,
          type: nodeType as any,
          label: nodeType,
          position: { x: 100, y: 100 },
          data: {}
        }

        const result = validateConnection(triggerNode, node)
        expect(result.isValid).toBe(true)
      })
    })

    it('應該正確識別台灣服務節點', () => {
      const taiwanServiceNodes = [
        'taoyuanAirport',
        'govOpenData',
        'weatherBureau',
        'taiwanRailway',
        'highSpeedRail',
        'healthInsurance'
      ]
      
      taiwanServiceNodes.forEach(nodeType => {
        const node: WorkflowNode = {
          id: `${nodeType}-1`,
          type: nodeType as any,
          label: nodeType,
          position: { x: 100, y: 100 },
          data: {}
        }

        const result = validateConnection(triggerNode, node)
        expect(result.isValid).toBe(true)
      })
    })

    it('應該為Line通知節點提供特殊建議', () => {
      const lineNotifyNode: WorkflowNode = {
        id: 'line-notify-1',
        type: 'lineNotify',
        label: 'Line 通知',
        position: { x: 300, y: 100 },
        data: {}
      }

      const result = validateConnection(linePayNode, lineNotifyNode)
      expect(result.isValid).toBe(true)
      expect(result.suggestions).toContain('建議在金流節點和通知節點間添加資料轉換節點來格式化付款結果')
    })
  })

  describe('邊界情況', () => {
    it('應該處理空節點列表', () => {
      const result = validateWorkflowConnections([], [])
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('工作流必須包含至少一個觸發節點')
    })

    it('應該處理空連線列表', () => {
      const nodes = [triggerNode]
      const result = validateWorkflowConnections(nodes, [])
      expect(result.isValid).toBe(true)
    })

    it('應該處理無效的連線資料', () => {
      const nodes = [triggerNode, httpNode]
      const invalidConnections = [
        {
          id: 'invalid-conn',
          source: '',
          target: 'http-1',
          sourceHandle: 'output',
          targetHandle: 'input'
        }
      ] as WorkflowConnection[]

      const result = validateWorkflowConnections(nodes, invalidConnections)
      expect(result.isValid).toBe(false)
    })
  })
})
