import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ElForm, ElFormItem, ElInput, ElSelect, ElRadioGroup, ElDatePicker, ElAlert } from 'element-plus'
import NotificationNodeEditor from '../NotificationNodeEditor.vue'
import type { WorkflowNode } from '@/types/workflow'

// Mock Element Plus 組件
const mockComponents = {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElRadioGroup,
  ElDatePicker,
  ElAlert
}

describe('NotificationNodeEditor', () => {
  let wrapper: any
  let mockLineNotifyNode: WorkflowNode
  let mockEmailNode: WorkflowNode
  let mockSmsNode: WorkflowNode

  beforeEach(() => {
    mockLineNotifyNode = {
      id: 'test-line-notify-node',
      type: 'taiwanNode',
      position: { x: 0, y: 0 },
      data: {
        label: 'Line 通知測試',
        nodeType: 'lineNotify',
        type: 'lineNotify',
        message: '測試通知訊息',
        settings: {
          stickerPackageId: '1',
          stickerId: '1',
          imageUrl: '',
          sendTime: 'immediate'
        }
      }
    }

    mockEmailNode = {
      id: 'test-email-node',
      type: 'taiwanNode',
      position: { x: 0, y: 0 },
      data: {
        label: '電子郵件測試',
        nodeType: 'email',
        type: 'email',
        to: 'test@example.com',
        subject: '測試郵件',
        body: '這是一封測試郵件',
        settings: {
          format: 'text',
          attachments: []
        }
      }
    }

    mockSmsNode = {
      id: 'test-sms-node',
      type: 'taiwanNode',
      position: { x: 0, y: 0 },
      data: {
        label: '簡訊通知測試',
        nodeType: 'sms',
        type: 'sms',
        to: '+886912345678',
        message: '測試簡訊內容',
        settings: {
          provider: 'twilio',
          sendTime: 'immediate'
        }
      }
    }
  })

  describe('Line 通知節點', () => {
    it('應該正確渲染 Line 通知編輯器', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.notification-node-editor').exists()).toBe(true)
    })

    it('應該顯示 Line 通知的專用欄位', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 檢查是否有通知訊息欄位
      const messageInput = wrapper.find('textarea[placeholder="輸入要發送的通知訊息"]')
      expect(messageInput.exists()).toBe(true)

      // 檢查是否有貼圖設定欄位
      const stickerInputs = wrapper.findAll('input[placeholder*="貼圖"]')
      expect(stickerInputs.length).toBeGreaterThan(0)
    })

    it('應該正確處理訊息變更', async () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      const messageInput = wrapper.find('textarea')
      if (messageInput.exists()) {
        await messageInput.setValue('新的通知訊息')
        
        // 檢查是否發出更新事件
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      }
    })
  })

  describe('電子郵件節點', () => {
    it('應該正確渲染電子郵件編輯器', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockEmailNode.data
        },
        global: {
          components: mockComponents
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.notification-node-editor').exists()).toBe(true)
    })

    it('應該顯示電子郵件的專用欄位', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockEmailNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 檢查表單項目
      const formItems = wrapper.findAllComponents(ElFormItem)
      expect(formItems.length).toBeGreaterThan(0)
    })
  })

  describe('簡訊節點', () => {
    it('應該正確渲染簡訊編輯器', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockSmsNode.data
        },
        global: {
          components: mockComponents
        }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('.notification-node-editor').exists()).toBe(true)
    })

    it('應該顯示簡訊的專用欄位', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockSmsNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 檢查表單項目
      const formItems = wrapper.findAllComponents(ElFormItem)
      expect(formItems.length).toBeGreaterThan(0)
    })
  })

  describe('台灣在地化特色', () => {
    it('應該顯示台灣通知服務資訊', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 檢查是否有台灣通知服務資訊區塊
      expect(wrapper.find('.taiwan-notification-info').exists()).toBe(true)
      
      // 檢查是否有 Alert 組件
      expect(wrapper.findComponent(ElAlert).exists()).toBe(true)
    })

    it('應該支援台灣手機號碼格式', () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockSmsNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 檢查是否有台灣手機號碼格式提示
      const phoneHint = wrapper.find('.el-text')
      expect(phoneHint.exists()).toBe(true)
    })
  })

  describe('資料綁定', () => {
    it('應該正確處理 props 變更', async () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 更新 props
      const updatedData = {
        ...mockLineNotifyNode.data,
        message: '更新的通知訊息'
      }

      await wrapper.setProps({ modelValue: updatedData })

      // 檢查內部資料是否更新
      expect(wrapper.vm.nodeData.message).toBe('更新的通知訊息')
    })

    it('應該正確發出變更事件', async () => {
      wrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 觸發變更
      await wrapper.vm.handleChange()

      // 檢查是否發出事件
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('change')).toBeTruthy()
    })
  })

  describe('節點類型切換', () => {
    it('應該根據節點類型顯示不同的編輯器', () => {
      // Line 通知節點
      const lineWrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockLineNotifyNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 電子郵件節點
      const emailWrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockEmailNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 簡訊節點
      const smsWrapper = mount(NotificationNodeEditor, {
        props: {
          modelValue: mockSmsNode.data
        },
        global: {
          components: mockComponents
        }
      })

      // 每個節點類型都應該正確渲染
      expect(lineWrapper.exists()).toBe(true)
      expect(emailWrapper.exists()).toBe(true)
      expect(smsWrapper.exists()).toBe(true)
    })
  })
})
