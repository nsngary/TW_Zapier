/**
 * 節點庫配置 - 台灣在地化工作流節點定義
 */

import type { PaletteNode, NodeCategory, TaiwanNodeType } from '@/types/workflow'

// ===== 觸發節點 =====

export const triggerNodes: PaletteNode[] = [
  {
    type: 'manualTrigger' as TaiwanNodeType,
    label: '手動觸發',
    description: '手動啟動工作流程',
    icon: 'VideoPlay',
    category: NodeCategory.TRIGGER,
    defaultData: {
      label: '手動觸發',
      type: 'manual',
      settings: {}
    }
  },
  {
    type: 'webhookTrigger' as TaiwanNodeType,
    label: 'Webhook 觸發',
    description: '透過 HTTP 請求觸發工作流程',
    icon: 'Link',
    category: NodeCategory.TRIGGER,
    defaultData: {
      label: 'Webhook 觸發',
      type: 'webhook',
      settings: {
        path: '/webhook',
        method: 'POST'
      }
    }
  },
  {
    type: 'scheduleTrigger' as TaiwanNodeType,
    label: '定時觸發',
    description: '按照時間排程觸發工作流程',
    icon: 'Timer',
    category: NodeCategory.TRIGGER,
    defaultData: {
      label: '定時觸發',
      type: 'schedule',
      settings: {
        interval: '0 0 * * *',
        timezone: 'Asia/Taipei'
      }
    }
  }
]

// ===== 台灣金流節點 =====

export const paymentNodes: PaletteNode[] = [
  {
    type: 'linePay' as TaiwanNodeType,
    label: 'Line Pay',
    description: 'Line Pay 台灣行動支付服務',
    icon: '/icons/line-pay.svg',
    category: NodeCategory.PAYMENT,
    defaultData: {
      label: 'Line Pay',
      amount: 0,
      currency: 'TWD',
      productName: '',
      orderId: '',
      settings: {
        sandbox: true,
        confirmUrl: '',
        cancelUrl: ''
      }
    }
  },
  {
    type: 'ecPay' as TaiwanNodeType,
    label: '綠界科技',
    description: '綠界科技 ECPay 金流服務',
    icon: '/icons/ecpay.svg',
    category: NodeCategory.PAYMENT,
    defaultData: {
      label: '綠界科技',
      amount: 0,
      currency: 'TWD',
      productName: '',
      orderId: '',
      settings: {
        sandbox: true,
        paymentType: 'aio',
        choosePayment: 'ALL'
      }
    }
  },
  {
    type: 'newebPay' as TaiwanNodeType,
    label: '藍新金流',
    description: '藍新金流 NewebPay 支付服務',
    icon: '/icons/newebpay.svg',
    category: NodeCategory.PAYMENT,
    defaultData: {
      label: '藍新金流',
      amount: 0,
      currency: 'TWD',
      productName: '',
      orderId: '',
      settings: {
        sandbox: true,
        paymentType: 'CREDIT',
        version: '2.0'
      }
    }
  },
  {
    type: 'spgateway' as TaiwanNodeType,
    label: '智付通',
    description: '智付通 Spgateway 金流服務',
    icon: '/icons/spgateway.svg',
    category: NodeCategory.PAYMENT,
    defaultData: {
      label: '智付通',
      amount: 0,
      currency: 'TWD',
      productName: '',
      orderId: '',
      settings: {
        sandbox: true,
        paymentType: 'CREDIT'
      }
    }
  }
]

// ===== 台灣在地服務節點 =====

export const taiwanServiceNodes: PaletteNode[] = [
  {
    type: 'taoyuanAirport' as TaiwanNodeType,
    label: '桃園機場',
    description: '桃園機場航班資訊查詢',
    icon: '/icons/taoyuan-airport.svg',
    category: NodeCategory.TAIWAN_SERVICE,
    defaultData: {
      label: '桃園機場',
      operation: 'flightInfo',
      settings: {
        terminal: 'all',
        type: 'departure',
        language: 'zh-TW'
      }
    }
  },
  {
    type: 'govOpenData' as TaiwanNodeType,
    label: '政府開放資料',
    description: '政府資料開放平臺資料查詢',
    icon: '/icons/gov-opendata.svg',
    category: NodeCategory.TAIWAN_SERVICE,
    defaultData: {
      label: '政府開放資料',
      operation: 'query',
      settings: {
        format: 'json',
        limit: 100,
        language: 'zh-TW'
      }
    }
  },
  {
    type: 'weatherBureau' as TaiwanNodeType,
    label: '中央氣象署',
    description: '中央氣象署天氣資料查詢',
    icon: '/icons/weather-bureau.svg',
    category: NodeCategory.TAIWAN_SERVICE,
    defaultData: {
      label: '中央氣象署',
      operation: 'currentWeather',
      settings: {
        location: '臺北市',
        language: 'zh-TW'
      }
    }
  },
  {
    type: 'taiwanRailway' as TaiwanNodeType,
    label: '台鐵資訊',
    description: '台灣鐵路局列車資訊查詢',
    icon: '/icons/taiwan-railway.svg',
    category: NodeCategory.TAIWAN_SERVICE,
    defaultData: {
      label: '台鐵資訊',
      operation: 'schedule',
      settings: {
        from: '',
        to: '',
        date: '',
        language: 'zh-TW'
      }
    }
  },
  {
    type: 'highSpeedRail' as TaiwanNodeType,
    label: '台灣高鐵',
    description: '台灣高鐵列車資訊查詢',
    icon: '/icons/high-speed-rail.svg',
    category: NodeCategory.TAIWAN_SERVICE,
    defaultData: {
      label: '台灣高鐵',
      operation: 'schedule',
      settings: {
        from: '',
        to: '',
        date: '',
        language: 'zh-TW'
      }
    }
  },
  {
    type: 'healthInsurance' as TaiwanNodeType,
    label: '健保署',
    description: '中央健康保險署資料查詢',
    icon: '/icons/health-insurance.svg',
    category: NodeCategory.TAIWAN_SERVICE,
    defaultData: {
      label: '健保署',
      operation: 'query',
      settings: {
        type: 'hospital',
        location: '',
        language: 'zh-TW'
      }
    }
  }
]

// ===== 通用節點 =====

export const generalNodes: PaletteNode[] = [
  {
    type: 'httpRequest' as TaiwanNodeType,
    label: 'HTTP 請求',
    description: '發送 HTTP 請求到指定 URL',
    icon: 'Connection',
    category: NodeCategory.GENERAL,
    defaultData: {
      label: 'HTTP 請求',
      method: 'GET',
      url: '',
      headers: {},
      body: '',
      settings: {
        timeout: 30000,
        followRedirects: true
      }
    }
  },
  {
    type: 'dataTransform' as TaiwanNodeType,
    label: '資料轉換',
    description: '轉換和處理資料格式',
    icon: 'Sort',
    category: NodeCategory.GENERAL,
    defaultData: {
      label: '資料轉換',
      operation: 'set',
      values: {},
      settings: {
        keepOnlySet: false
      }
    }
  },
  {
    type: 'condition' as TaiwanNodeType,
    label: '條件判斷',
    description: '根據條件分支執行不同路徑',
    icon: 'Switch',
    category: NodeCategory.GENERAL,
    defaultData: {
      label: '條件判斷',
      conditions: [],
      settings: {
        combineOperation: 'AND'
      }
    }
  },
  {
    type: 'delay' as TaiwanNodeType,
    label: '延遲等待',
    description: '暫停工作流程執行指定時間',
    icon: 'Clock',
    category: NodeCategory.GENERAL,
    defaultData: {
      label: '延遲等待',
      amount: 1,
      unit: 'seconds',
      settings: {}
    }
  }
]

// ===== 通知節點 =====

export const notificationNodes: PaletteNode[] = [
  {
    type: 'lineNotify' as TaiwanNodeType,
    label: 'Line 通知',
    description: 'Line Notify 訊息推送服務',
    icon: '/icons/line-notify.svg',
    category: NodeCategory.NOTIFICATION,
    defaultData: {
      label: 'Line 通知',
      message: '',
      settings: {
        stickerPackageId: null,
        stickerId: null
      }
    }
  },
  {
    type: 'email' as TaiwanNodeType,
    label: '電子郵件',
    description: '發送電子郵件通知',
    icon: 'Message',
    category: NodeCategory.NOTIFICATION,
    defaultData: {
      label: '電子郵件',
      to: '',
      subject: '',
      body: '',
      settings: {
        format: 'text',
        attachments: []
      }
    }
  },
  {
    type: 'sms' as TaiwanNodeType,
    label: '簡訊通知',
    description: '發送 SMS 簡訊通知',
    icon: 'ChatDotRound',
    category: NodeCategory.NOTIFICATION,
    defaultData: {
      label: '簡訊通知',
      to: '',
      message: '',
      settings: {
        provider: 'twilio'
      }
    }
  }
]

// ===== 完整節點庫 =====

export const nodeLibrary: Record<NodeCategory, PaletteNode[]> = {
  [NodeCategory.TRIGGER]: triggerNodes,
  [NodeCategory.PAYMENT]: paymentNodes,
  [NodeCategory.TAIWAN_SERVICE]: taiwanServiceNodes,
  [NodeCategory.GENERAL]: generalNodes,
  [NodeCategory.NOTIFICATION]: notificationNodes
}

// ===== 節點查找工具函數 =====

/**
 * 根據類型查找節點定義
 */
export const findNodeDefinition = (nodeType: TaiwanNodeType): PaletteNode | undefined => {
  for (const category of Object.values(nodeLibrary)) {
    const node = category.find(n => n.type === nodeType)
    if (node) return node
  }
  return undefined
}

/**
 * 獲取所有節點定義
 */
export const getAllNodes = (): PaletteNode[] => {
  return Object.values(nodeLibrary).flat()
}

/**
 * 根據分類獲取節點
 */
export const getNodesByCategory = (category: NodeCategory): PaletteNode[] => {
  return nodeLibrary[category] || []
}

/**
 * 搜尋節點
 */
export const searchNodes = (query: string): PaletteNode[] => {
  const lowercaseQuery = query.toLowerCase()
  return getAllNodes().filter(node => 
    node.label.toLowerCase().includes(lowercaseQuery) ||
    node.description.toLowerCase().includes(lowercaseQuery)
  )
}

/**
 * 獲取台灣特色節點
 */
export const getTaiwanNodes = (): PaletteNode[] => {
  return [
    ...paymentNodes,
    ...taiwanServiceNodes,
    ...notificationNodes.filter(n => n.type === 'lineNotify')
  ]
}
