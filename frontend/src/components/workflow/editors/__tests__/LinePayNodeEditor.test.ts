import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ElForm, ElFormItem, ElInputNumber, ElInput, ElSelect, ElSwitch, ElButton, ElAlert } from 'element-plus'
import LinePayNodeEditor from '../LinePayNodeEditor.vue'
import type { WorkflowNode } from '@/types/workflow'

// Mock Element Plus 組件
const mockComponents = {
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElInput,
  ElSelect,
  ElSwitch,
  ElButton,
  ElAlert
}

describe('LinePayNodeEditor', () => {
  let wrapper: any
  let mockNode: WorkflowNode

  beforeEach(() => {
    mockNode = {
      id: 'test-linepay-node',
      type: 'taiwanNode',
      position: { x: 0, y: 0 },
      data: {
        label: 'Line Pay 測試',
        nodeType: 'linePay',
        amount: 1000,
        currency: 'TWD',
        productName: '測試商品',
        productDescription: '這是一個測試商品',
        orderId: 'LP123456789',
        confirmUrl: 'https://example.com/confirm',
        cancelUrl: 'https://example.com/cancel',
        sandbox: true
      }
    }
  })

  it('應該正確渲染 Line Pay 節點編輯器', () => {
    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: mockNode
      },
      global: {
        components: mockComponents
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.line-pay-node-editor').exists()).toBe(true)
  })

  it('應該顯示正確的節點資料', () => {
    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: mockNode
      },
      global: {
        components: mockComponents
      }
    })

    // 檢查表單是否存在
    expect(wrapper.findComponent(ElForm).exists()).toBe(true)
    
    // 檢查各個表單項目
    const formItems = wrapper.findAllComponents(ElFormItem)
    expect(formItems.length).toBeGreaterThan(0)
  })

  it('應該正確處理金額變更', async () => {
    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: mockNode
      },
      global: {
        components: mockComponents
      }
    })

    // 模擬金額變更
    const inputNumber = wrapper.findComponent(ElInputNumber)
    if (inputNumber.exists()) {
      await inputNumber.setValue(2000)
      
      // 檢查是否發出更新事件
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('應該能夠生成訂單編號', async () => {
    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: { ...mockNode, data: { ...mockNode.data, orderId: '' } }
      },
      global: {
        components: mockComponents
      }
    })

    // 查找自動產生按鈕
    const generateButton = wrapper.find('button')
    if (generateButton.exists()) {
      await generateButton.trigger('click')
      
      // 檢查是否發出更新事件
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('應該顯示 Line Pay 特色資訊', () => {
    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: mockNode
      },
      global: {
        components: mockComponents
      }
    })

    // 檢查是否有 Line Pay 資訊區塊
    expect(wrapper.find('.line-pay-info').exists()).toBe(true)
    
    // 檢查是否有 Alert 組件
    expect(wrapper.findComponent(ElAlert).exists()).toBe(true)
  })

  it('應該正確設定預設值', () => {
    const nodeWithoutDefaults: WorkflowNode = {
      id: 'test-node',
      type: 'taiwanNode',
      position: { x: 0, y: 0 },
      data: {
        label: 'Line Pay',
        nodeType: 'linePay'
      }
    }

    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: nodeWithoutDefaults
      },
      global: {
        components: mockComponents
      }
    })

    // 檢查組件是否正確設定了預設值
    expect(wrapper.vm.nodeData.amount).toBe(1000)
    expect(wrapper.vm.nodeData.currency).toBe('TWD')
    expect(wrapper.vm.nodeData.sandbox).toBe(true)
  })

  it('應該正確處理 props 變更', async () => {
    wrapper = mount(LinePayNodeEditor, {
      props: {
        modelValue: mockNode
      },
      global: {
        components: mockComponents
      }
    })

    // 更新 props
    const updatedNode = {
      ...mockNode,
      data: {
        ...mockNode.data,
        amount: 5000,
        productName: '更新的商品'
      }
    }

    await wrapper.setProps({ modelValue: updatedNode })

    // 檢查內部資料是否更新
    expect(wrapper.vm.nodeData.amount).toBe(5000)
    expect(wrapper.vm.nodeData.productName).toBe('更新的商品')
  })
})
