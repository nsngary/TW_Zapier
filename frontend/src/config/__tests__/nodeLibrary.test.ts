/**
 * 節點庫測試
 */

import { describe, it, expect } from 'vitest'
import {
  nodeLibrary,
  findNodeDefinition,
  getAllNodes,
  getNodesByCategory,
  searchNodes,
  getTaiwanNodes,
  triggerNodes,
  paymentNodes,
  taiwanServiceNodes,
  generalNodes,
  notificationNodes
} from '../nodeLibrary'
import { NodeCategory } from '@/types/workflow'

describe('nodeLibrary', () => {
  describe('節點庫結構', () => {
    it('應該包含所有節點分類', () => {
      const categories = Object.keys(nodeLibrary)
      expect(categories).toContain(NodeCategory.TRIGGER)
      expect(categories).toContain(NodeCategory.PAYMENT)
      expect(categories).toContain(NodeCategory.TAIWAN_SERVICE)
      expect(categories).toContain(NodeCategory.GENERAL)
      expect(categories).toContain(NodeCategory.NOTIFICATION)
    })

    it('每個分類都應該有節點', () => {
      Object.values(nodeLibrary).forEach(categoryNodes => {
        expect(categoryNodes.length).toBeGreaterThan(0)
      })
    })

    it('所有節點都應該有必要的屬性', () => {
      getAllNodes().forEach(node => {
        expect(node).toHaveProperty('type')
        expect(node).toHaveProperty('label')
        expect(node).toHaveProperty('description')
        expect(node).toHaveProperty('icon')
        expect(node).toHaveProperty('category')
        expect(node).toHaveProperty('defaultData')
        
        expect(typeof node.type).toBe('string')
        expect(typeof node.label).toBe('string')
        expect(typeof node.description).toBe('string')
        expect(typeof node.icon).toBe('string')
        expect(typeof node.category).toBe('string')
        expect(typeof node.defaultData).toBe('object')
      })
    })
  })

  describe('觸發節點', () => {
    it('應該包含基本觸發節點', () => {
      const triggerTypes = triggerNodes.map(node => node.type)
      expect(triggerTypes).toContain('manualTrigger')
      expect(triggerTypes).toContain('webhookTrigger')
      expect(triggerTypes).toContain('scheduleTrigger')
    })

    it('手動觸發節點應該有正確的配置', () => {
      const manualTrigger = findNodeDefinition('manualTrigger')
      expect(manualTrigger).toBeDefined()
      expect(manualTrigger?.label).toBe('手動觸發')
      expect(manualTrigger?.category).toBe(NodeCategory.TRIGGER)
      expect(manualTrigger?.defaultData.type).toBe('manual')
    })

    it('Webhook觸發節點應該有正確的配置', () => {
      const webhookTrigger = findNodeDefinition('webhookTrigger')
      expect(webhookTrigger).toBeDefined()
      expect(webhookTrigger?.label).toBe('Webhook 觸發')
      expect(webhookTrigger?.defaultData.settings.path).toBe('/webhook')
      expect(webhookTrigger?.defaultData.settings.method).toBe('POST')
    })

    it('定時觸發節點應該有正確的配置', () => {
      const scheduleTrigger = findNodeDefinition('scheduleTrigger')
      expect(scheduleTrigger).toBeDefined()
      expect(scheduleTrigger?.label).toBe('定時觸發')
      expect(scheduleTrigger?.defaultData.settings.timezone).toBe('Asia/Taipei')
    })
  })

  describe('台灣金流節點', () => {
    it('應該包含主要台灣金流服務', () => {
      const paymentTypes = paymentNodes.map(node => node.type)
      expect(paymentTypes).toContain('linePay')
      expect(paymentTypes).toContain('ecPay')
      expect(paymentTypes).toContain('newebPay')
      expect(paymentTypes).toContain('spgateway')
    })

    it('Line Pay節點應該有正確的配置', () => {
      const linePay = findNodeDefinition('linePay')
      expect(linePay).toBeDefined()
      expect(linePay?.label).toBe('Line Pay')
      expect(linePay?.category).toBe(NodeCategory.PAYMENT)
      expect(linePay?.defaultData.currency).toBe('TWD')
      expect(linePay?.defaultData.settings.sandbox).toBe(true)
    })

    it('綠界科技節點應該有正確的配置', () => {
      const ecPay = findNodeDefinition('ecPay')
      expect(ecPay).toBeDefined()
      expect(ecPay?.label).toBe('綠界科技')
      expect(ecPay?.defaultData.currency).toBe('TWD')
      expect(ecPay?.defaultData.settings.paymentType).toBe('aio')
    })

    it('所有金流節點都應該支援新台幣', () => {
      paymentNodes.forEach(node => {
        expect(node.defaultData.currency).toBe('TWD')
      })
    })

    it('所有金流節點都應該有沙盒模式', () => {
      paymentNodes.forEach(node => {
        expect(node.defaultData.settings.sandbox).toBe(true)
      })
    })
  })

  describe('台灣在地服務節點', () => {
    it('應該包含主要台灣服務', () => {
      const serviceTypes = taiwanServiceNodes.map(node => node.type)
      expect(serviceTypes).toContain('taoyuanAirport')
      expect(serviceTypes).toContain('govOpenData')
      expect(serviceTypes).toContain('weatherBureau')
      expect(serviceTypes).toContain('taiwanRailway')
      expect(serviceTypes).toContain('highSpeedRail')
      expect(serviceTypes).toContain('healthInsurance')
    })

    it('桃園機場節點應該有正確的配置', () => {
      const airport = findNodeDefinition('taoyuanAirport')
      expect(airport).toBeDefined()
      expect(airport?.label).toBe('桃園機場')
      expect(airport?.category).toBe(NodeCategory.TAIWAN_SERVICE)
      expect(airport?.defaultData.settings.language).toBe('zh-TW')
    })

    it('政府開放資料節點應該有正確的配置', () => {
      const govData = findNodeDefinition('govOpenData')
      expect(govData).toBeDefined()
      expect(govData?.label).toBe('政府開放資料')
      expect(govData?.defaultData.settings.format).toBe('json')
      expect(govData?.defaultData.settings.limit).toBe(100)
    })

    it('中央氣象署節點應該有正確的配置', () => {
      const weather = findNodeDefinition('weatherBureau')
      expect(weather).toBeDefined()
      expect(weather?.label).toBe('中央氣象署')
      expect(weather?.defaultData.settings.location).toBe('臺北市')
    })

    it('所有台灣服務節點都應該支援繁體中文', () => {
      taiwanServiceNodes.forEach(node => {
        expect(node.defaultData.settings.language).toBe('zh-TW')
      })
    })
  })

  describe('通用節點', () => {
    it('應該包含基本通用節點', () => {
      const generalTypes = generalNodes.map(node => node.type)
      expect(generalTypes).toContain('httpRequest')
      expect(generalTypes).toContain('dataTransform')
      expect(generalTypes).toContain('condition')
      expect(generalTypes).toContain('delay')
    })

    it('HTTP請求節點應該有正確的配置', () => {
      const httpRequest = findNodeDefinition('httpRequest')
      expect(httpRequest).toBeDefined()
      expect(httpRequest?.label).toBe('HTTP 請求')
      expect(httpRequest?.category).toBe(NodeCategory.GENERAL)
      expect(httpRequest?.defaultData.method).toBe('GET')
      expect(httpRequest?.defaultData.settings.timeout).toBe(30000)
    })

    it('資料轉換節點應該有正確的配置', () => {
      const dataTransform = findNodeDefinition('dataTransform')
      expect(dataTransform).toBeDefined()
      expect(dataTransform?.label).toBe('資料轉換')
      expect(dataTransform?.defaultData.operation).toBe('set')
    })

    it('條件判斷節點應該有正確的配置', () => {
      const condition = findNodeDefinition('condition')
      expect(condition).toBeDefined()
      expect(condition?.label).toBe('條件判斷')
      expect(condition?.defaultData.settings.combineOperation).toBe('AND')
    })
  })

  describe('通知節點', () => {
    it('應該包含基本通知節點', () => {
      const notificationTypes = notificationNodes.map(node => node.type)
      expect(notificationTypes).toContain('lineNotify')
      expect(notificationTypes).toContain('email')
      expect(notificationTypes).toContain('sms')
    })

    it('Line通知節點應該有正確的配置', () => {
      const lineNotify = findNodeDefinition('lineNotify')
      expect(lineNotify).toBeDefined()
      expect(lineNotify?.label).toBe('Line 通知')
      expect(lineNotify?.category).toBe(NodeCategory.NOTIFICATION)
    })

    it('電子郵件節點應該有正確的配置', () => {
      const email = findNodeDefinition('email')
      expect(email).toBeDefined()
      expect(email?.label).toBe('電子郵件')
      expect(email?.defaultData.settings.format).toBe('text')
    })

    it('簡訊節點應該有正確的配置', () => {
      const sms = findNodeDefinition('sms')
      expect(sms).toBeDefined()
      expect(sms?.label).toBe('簡訊通知')
      expect(sms?.defaultData.settings.provider).toBe('twilio')
    })
  })

  describe('工具函數', () => {
    it('findNodeDefinition 應該能找到存在的節點', () => {
      const node = findNodeDefinition('manualTrigger')
      expect(node).toBeDefined()
      expect(node?.type).toBe('manualTrigger')
    })

    it('findNodeDefinition 對不存在的節點應該返回 undefined', () => {
      const node = findNodeDefinition('nonExistentNode' as any)
      expect(node).toBeUndefined()
    })

    it('getAllNodes 應該返回所有節點', () => {
      const allNodes = getAllNodes()
      const totalNodes = Object.values(nodeLibrary)
        .reduce((sum, categoryNodes) => sum + categoryNodes.length, 0)
      
      expect(allNodes.length).toBe(totalNodes)
    })

    it('getNodesByCategory 應該返回指定分類的節點', () => {
      const triggerNodesFromFunction = getNodesByCategory(NodeCategory.TRIGGER)
      expect(triggerNodesFromFunction).toEqual(triggerNodes)
      
      const paymentNodesFromFunction = getNodesByCategory(NodeCategory.PAYMENT)
      expect(paymentNodesFromFunction).toEqual(paymentNodes)
    })

    it('searchNodes 應該能搜尋節點', () => {
      const results = searchNodes('Line')
      expect(results.length).toBeGreaterThan(0)
      
      const lineNodes = results.filter(node => 
        node.label.includes('Line') || node.description.includes('Line')
      )
      expect(lineNodes.length).toBeGreaterThan(0)
    })

    it('searchNodes 應該不區分大小寫', () => {
      const upperResults = searchNodes('LINE')
      const lowerResults = searchNodes('line')
      expect(upperResults.length).toBe(lowerResults.length)
    })

    it('getTaiwanNodes 應該返回台灣特色節點', () => {
      const taiwanNodes = getTaiwanNodes()
      
      // 應該包含所有金流節點
      paymentNodes.forEach(node => {
        expect(taiwanNodes).toContainEqual(node)
      })
      
      // 應該包含所有台灣服務節點
      taiwanServiceNodes.forEach(node => {
        expect(taiwanNodes).toContainEqual(node)
      })
      
      // 應該包含Line通知節點
      const lineNotify = notificationNodes.find(n => n.type === 'lineNotify')
      expect(taiwanNodes).toContainEqual(lineNotify)
    })
  })

  describe('節點唯一性', () => {
    it('所有節點類型應該是唯一的', () => {
      const allNodes = getAllNodes()
      const nodeTypes = allNodes.map(node => node.type)
      const uniqueTypes = [...new Set(nodeTypes)]
      
      expect(nodeTypes.length).toBe(uniqueTypes.length)
    })

    it('每個分類內的節點類型應該是唯一的', () => {
      Object.values(nodeLibrary).forEach(categoryNodes => {
        const types = categoryNodes.map(node => node.type)
        const uniqueTypes = [...new Set(types)]
        expect(types.length).toBe(uniqueTypes.length)
      })
    })
  })

  describe('節點資料完整性', () => {
    it('所有節點的 defaultData 應該包含 label', () => {
      getAllNodes().forEach(node => {
        expect(node.defaultData).toHaveProperty('label')
        expect(typeof node.defaultData.label).toBe('string')
        expect(node.defaultData.label.length).toBeGreaterThan(0)
      })
    })

    it('所有節點的 defaultData 應該包含 settings', () => {
      getAllNodes().forEach(node => {
        expect(node.defaultData).toHaveProperty('settings')
        expect(typeof node.defaultData.settings).toBe('object')
      })
    })

    it('所有節點的描述應該是有意義的', () => {
      getAllNodes().forEach(node => {
        expect(node.description.length).toBeGreaterThan(5)
        expect(node.description).not.toBe(node.label)
      })
    })
  })

  describe('台灣在地化特性', () => {
    it('台灣金流節點應該使用新台幣', () => {
      const taiwanPaymentNodes = getNodesByCategory(NodeCategory.PAYMENT)
      taiwanPaymentNodes.forEach(node => {
        expect(node.defaultData.currency).toBe('TWD')
      })
    })

    it('台灣服務節點應該使用台北時區', () => {
      const scheduleNode = findNodeDefinition('scheduleTrigger')
      expect(scheduleNode?.defaultData.settings.timezone).toBe('Asia/Taipei')
    })

    it('台灣服務節點應該預設繁體中文', () => {
      const taiwanServices = getNodesByCategory(NodeCategory.TAIWAN_SERVICE)
      taiwanServices.forEach(node => {
        expect(node.defaultData.settings.language).toBe('zh-TW')
      })
    })

    it('應該有足夠的台灣特色節點', () => {
      const taiwanNodes = getTaiwanNodes()
      expect(taiwanNodes.length).toBeGreaterThanOrEqual(10)
    })
  })
})
