import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PropertyEditor from '../PropertyEditor.vue'

describe('PropertyEditor', () => {
  let wrapper: any

  const mockFields = [
    {
      key: 'name',
      label: '名稱',
      type: 'text' as const,
      placeholder: '輸入名稱',
      required: true
    },
    {
      key: 'age',
      label: '年齡',
      type: 'number' as const,
      min: 0,
      max: 120
    },
    {
      key: 'description',
      label: '描述',
      type: 'textarea' as const,
      rows: 3
    },
    {
      key: 'category',
      label: '分類',
      type: 'select' as const,
      options: [
        { label: '選項 1', value: 'option1' },
        { label: '選項 2', value: 'option2' }
      ]
    },
    {
      key: 'enabled',
      label: '啟用',
      type: 'switch' as const,
      switchLabel: '啟用功能'
    }
  ]

  const mockModelValue = {
    name: 'Test Name',
    age: 25,
    description: 'Test Description',
    category: 'option1',
    enabled: true
  }

  beforeEach(() => {
    wrapper = mount(PropertyEditor, {
      props: {
        title: '測試屬性',
        fields: mockFields,
        modelValue: mockModelValue,
        errors: {},
        collapsible: true,
        defaultCollapsed: false
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('基本渲染', () => {
    it('應該正確渲染標題', () => {
      expect(wrapper.find('.property-title').text()).toBe('測試屬性')
    })

    it('應該渲染所有欄位', () => {
      expect(wrapper.findAll('.property-group')).toHaveLength(mockFields.length)
    })

    it('應該顯示摺疊按鈕當 collapsible 為 true', () => {
      expect(wrapper.find('.collapse-btn').exists()).toBe(true)
    })

    it('應該不顯示摺疊按鈕當 collapsible 為 false', async () => {
      await wrapper.setProps({ collapsible: false })
      expect(wrapper.find('.collapse-btn').exists()).toBe(false)
    })
  })

  describe('欄位類型渲染', () => {
    it('應該正確渲染文字輸入欄位', () => {
      const textInput = wrapper.find('input[type="text"]')
      expect(textInput.exists()).toBe(true)
      expect(textInput.element.value).toBe('Test Name')
    })

    it('應該正確渲染數字輸入欄位', () => {
      const numberInput = wrapper.find('input[type="number"]')
      expect(numberInput.exists()).toBe(true)
      expect(numberInput.element.value).toBe('25')
    })

    it('應該正確渲染文字區域欄位', () => {
      const textarea = wrapper.find('textarea')
      expect(textarea.exists()).toBe(true)
      expect(textarea.element.value).toBe('Test Description')
    })

    it('應該正確渲染選擇框欄位', () => {
      const select = wrapper.find('select')
      expect(select.exists()).toBe(true)
      expect(select.element.value).toBe('option1')
    })

    it('應該正確渲染開關欄位', () => {
      const switchInput = wrapper.find('.switch-input')
      expect(switchInput.exists()).toBe(true)
      expect(switchInput.element.checked).toBe(true)
    })
  })

  describe('必填欄位標示', () => {
    it('應該顯示必填標示', () => {
      const requiredIndicator = wrapper.find('.required-indicator')
      expect(requiredIndicator.exists()).toBe(true)
      expect(requiredIndicator.text()).toBe('*')
    })
  })

  describe('錯誤訊息顯示', () => {
    it('應該顯示錯誤訊息', async () => {
      await wrapper.setProps({
        errors: { name: '名稱不能為空' }
      })
      
      const errorMessage = wrapper.find('.property-error')
      expect(errorMessage.exists()).toBe(true)
      expect(errorMessage.text()).toBe('名稱不能為空')
    })
  })

  describe('事件處理', () => {
    it('應該觸發 update:modelValue 事件當輸入變更', async () => {
      const textInput = wrapper.find('input[type="text"]')
      await textInput.setValue('New Name')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('field-change')).toBeTruthy()
    })

    it('應該觸發 field-change 事件', async () => {
      const textInput = wrapper.find('input[type="text"]')
      await textInput.setValue('New Name')
      
      const fieldChangeEvents = wrapper.emitted('field-change')
      expect(fieldChangeEvents).toBeTruthy()
      expect(fieldChangeEvents[0]).toEqual(['name', 'New Name'])
    })
  })

  describe('摺疊功能', () => {
    it('應該切換摺疊狀態', async () => {
      const collapseBtn = wrapper.find('.collapse-btn')
      await collapseBtn.trigger('click')
      
      expect(wrapper.vm.isCollapsed).toBe(true)
      expect(wrapper.find('.property-content').isVisible()).toBe(false)
    })

    it('應該根據 defaultCollapsed 設定初始狀態', async () => {
      const collapsedWrapper = mount(PropertyEditor, {
        props: {
          ...wrapper.props(),
          defaultCollapsed: true
        }
      })
      
      expect(collapsedWrapper.vm.isCollapsed).toBe(true)
      collapsedWrapper.unmount()
    })
  })

  describe('檔案上傳', () => {
    it('應該正確渲染檔案輸入欄位', async () => {
      const fileField = {
        key: 'file',
        label: '檔案',
        type: 'file' as const,
        accept: '.jpg,.png'
      }

      await wrapper.setProps({
        fields: [...mockFields, fileField]
      })

      const fileInput = wrapper.find('input[type="file"]')
      expect(fileInput.exists()).toBe(true)
      expect(fileInput.attributes('accept')).toBe('.jpg,.png')
    })
  })

  describe('顏色選擇器', () => {
    it('應該正確渲染顏色選擇器', async () => {
      const colorField = {
        key: 'color',
        label: '顏色',
        type: 'color' as const
      }
      
      await wrapper.setProps({
        fields: [...mockFields, colorField],
        modelValue: { ...mockModelValue, color: '#ff0000' }
      })
      
      const colorInput = wrapper.find('input[type="color"]')
      expect(colorInput.exists()).toBe(true)
      expect(colorInput.element.value).toBe('#ff0000')
    })
  })

  describe('禁用狀態', () => {
    it('應該正確處理禁用狀態', async () => {
      const disabledFields = mockFields.map(field => ({
        ...field,
        disabled: true
      }))
      
      await wrapper.setProps({ fields: disabledFields })
      
      const textInput = wrapper.find('input[type="text"]')
      const numberInput = wrapper.find('input[type="number"]')
      const textarea = wrapper.find('textarea')
      const select = wrapper.find('select')
      
      expect(textInput.element.disabled).toBe(true)
      expect(numberInput.element.disabled).toBe(true)
      expect(textarea.element.disabled).toBe(true)
      expect(select.element.disabled).toBe(true)
    })
  })

  describe('說明文字', () => {
    it('應該顯示說明文字', async () => {
      const fieldsWithDescription = mockFields.map(field => ({
        ...field,
        description: `${field.label}的說明文字`
      }))
      
      await wrapper.setProps({ fields: fieldsWithDescription })
      
      const descriptions = wrapper.findAll('.property-description')
      expect(descriptions).toHaveLength(mockFields.length)
      expect(descriptions[0].text()).toBe('名稱的說明文字')
    })
  })

  describe('數字欄位限制', () => {
    it('應該設定數字欄位的最小值和最大值', () => {
      const numberInput = wrapper.find('input[type="number"]')
      expect(numberInput.element.min).toBe('0')
      expect(numberInput.element.max).toBe('120')
    })
  })

  describe('選擇框選項', () => {
    it('應該正確渲染選擇框選項', () => {
      const select = wrapper.find('select')
      const options = select.findAll('option')
      
      // 包含 placeholder 選項
      expect(options).toHaveLength(2)
      expect(options[0].text()).toBe('選項 1')
      expect(options[1].text()).toBe('選項 2')
    })
  })
})
