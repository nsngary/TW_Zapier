/**
 * 台灣服務節點使用範例
 * 
 * 這個範例展示如何使用台灣在地服務節點 SDK 來建立一個新的節點
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeTypeDescription,
  INodePropertyOptions,
  ILoadOptionsFunctions,
} from 'n8n-workflow';

import {
  BaseNode,
  TaiwanApiClient,
  TaiwanValidator,
  TaiwanUtils,
  AuthManager,
  HmacAuth,
  TaiwanNodeConfig,
  ExecutionContext,
  AuthConfig,
  AuthType,
  HmacAlgorithm,
  TaiwanPaymentMethod,
  TWDAmount
} from '../index';

/**
 * 範例台灣服務節點
 * 
 * 這個節點展示如何整合台灣的線上支付服務
 */
export class ExampleTaiwanPaymentNode extends BaseNode {
  
  constructor() {
    const config: TaiwanNodeConfig = {
      name: 'exampleTaiwanPayment',
      displayName: '範例台灣支付',
      description: '台灣線上支付服務整合範例',
      version: 1,
      category: 'payment',
      provider: '範例支付公司',
      icon: 'file:taiwan-payment.svg',
      color: '#FF6B6B'
    };
    
    super(config);
  }

  description: INodeTypeDescription = {
    displayName: '範例台灣支付',
    name: 'exampleTaiwanPayment',
    icon: 'file:taiwan-payment.svg',
    group: ['taiwan', 'payment'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["paymentMethod"]}}',
    description: '台灣線上支付服務整合範例節點',
    defaults: {
      name: '範例台灣支付',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'taiwanPaymentApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: '操作',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: '建立付款',
            value: 'createPayment',
            description: '建立新的付款請求',
            action: '建立付款請求',
          },
          {
            name: '查詢付款狀態',
            value: 'queryPayment',
            description: '查詢付款交易狀態',
            action: '查詢付款狀態',
          },
          {
            name: '申請退款',
            value: 'refundPayment',
            description: '申請交易退款',
            action: '申請退款',
          },
        ],
        default: 'createPayment',
      },
      {
        displayName: '付款方式',
        name: 'paymentMethod',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['createPayment'],
          },
        },
        options: [
          {
            name: 'LINE Pay',
            value: TaiwanPaymentMethod.LINE_PAY,
          },
          {
            name: '信用卡',
            value: TaiwanPaymentMethod.CREDIT_CARD,
          },
          {
            name: 'ATM 轉帳',
            value: TaiwanPaymentMethod.ATM,
          },
          {
            name: '超商代碼',
            value: TaiwanPaymentMethod.CONVENIENCE_STORE,
          },
        ],
        default: TaiwanPaymentMethod.LINE_PAY,
      },
      {
        displayName: '訂單編號',
        name: 'orderId',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            operation: ['createPayment', 'queryPayment', 'refundPayment'],
          },
        },
        default: '',
        description: '商店訂單編號',
        placeholder: '例如：ORDER20240101001',
      },
      {
        displayName: '付款金額',
        name: 'amount',
        type: 'number',
        required: true,
        displayOptions: {
          show: {
            operation: ['createPayment'],
          },
        },
        default: 0,
        description: '付款金額（新台幣元）',
        typeOptions: {
          minValue: 1,
          maxValue: 1000000,
        },
      },
      {
        displayName: '商品描述',
        name: 'productDescription',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            operation: ['createPayment'],
          },
        },
        default: '',
        description: '商品或服務描述',
        placeholder: '例如：台灣高山茶葉禮盒',
      },
      {
        displayName: '客戶姓名',
        name: 'customerName',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createPayment'],
          },
        },
        default: '',
        description: '付款客戶姓名',
        placeholder: '例如：王小明',
      },
      {
        displayName: '客戶電話',
        name: 'customerPhone',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createPayment'],
          },
        },
        default: '',
        description: '客戶手機號碼',
        placeholder: '例如：0912345678',
      },
      {
        displayName: '客戶電子郵件',
        name: 'customerEmail',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createPayment'],
          },
        },
        default: '',
        description: '客戶電子郵件地址',
        placeholder: '例如：customer@example.com',
      },
      {
        displayName: '交易 ID',
        name: 'transactionId',
        type: 'string',
        required: true,
        displayOptions: {
          show: {
            operation: ['queryPayment', 'refundPayment'],
          },
        },
        default: '',
        description: '支付服務商提供的交易識別碼',
      },
      {
        displayName: '退款金額',
        name: 'refundAmount',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['refundPayment'],
          },
        },
        default: 0,
        description: '退款金額（新台幣元，留空表示全額退款）',
        typeOptions: {
          minValue: 0,
        },
      },
    ],
  };

  /**
   * 建構認證配置
   */
  protected buildAuthConfig(credentials: any): AuthConfig {
    return {
      type: AuthType.HMAC,
      key: credentials.apiKey,
      secret: credentials.apiSecret,
      algorithm: HmacAlgorithm.SHA256,
      signatureHeader: 'X-Payment-Signature',
      timestampHeader: 'X-Payment-Timestamp',
      nonceHeader: 'X-Payment-Nonce',
      signatureValidityPeriod: 300
    };
  }

  /**
   * 取得必要參數列表
   */
  protected getRequiredParameters(): string[] {
    return ['operation', 'orderId'];
  }

  /**
   * 執行節點邏輯
   */
  protected async executeNode(
    context: IExecuteFunctions,
    executionContext: ExecutionContext
  ): Promise<INodeExecutionData[][]> {
    
    // 取得認證配置
    const authConfig = await this.getAuthConfig(context);
    
    // 建立 API 客戶端
    const apiClient = new TaiwanApiClient({
      baseUrl: 'https://api.example-taiwan-payment.com',
      auth: authConfig,
      environment: 'production',
      timeout: 30000,
      retryCount: 3,
      retryDelay: 1000,
      enableLogging: true,
      logLevel: 'info'
    }, context.helpers.request);

    // 處理所有輸入項目
    return await this.processItems(context, async (item, index) => {
      const operation = context.getNodeParameter('operation', index) as string;
      
      let result: any;
      
      switch (operation) {
        case 'createPayment':
          result = await this.createPayment(context, apiClient, index);
          break;
        case 'queryPayment':
          result = await this.queryPayment(context, apiClient, index);
          break;
        case 'refundPayment':
          result = await this.refundPayment(context, apiClient, index);
          break;
        default:
          throw new Error(`不支援的操作: ${operation}`);
      }

      return {
        json: result,
        pairedItem: { item: index }
      };
    });
  }

  /**
   * 建立付款
   */
  private async createPayment(
    context: IExecuteFunctions,
    apiClient: TaiwanApiClient,
    index: number
  ): Promise<any> {
    
    // 取得參數
    const orderId = context.getNodeParameter('orderId', index) as string;
    const amount = context.getNodeParameter('amount', index) as number;
    const paymentMethod = context.getNodeParameter('paymentMethod', index) as TaiwanPaymentMethod;
    const productDescription = context.getNodeParameter('productDescription', index) as string;
    const customerName = context.getNodeParameter('customerName', index, '') as string;
    const customerPhone = context.getNodeParameter('customerPhone', index, '') as string;
    const customerEmail = context.getNodeParameter('customerEmail', index, '') as string;

    // 驗證參數
    await this.validatePaymentParameters({
      orderId,
      amount,
      productDescription,
      customerName,
      customerPhone,
      customerEmail
    });

    // 轉換金額為分
    const amountInCents: TWDAmount = amount * 100;

    // 建構請求資料
    const paymentData = {
      orderId,
      amount: amountInCents,
      currency: 'TWD',
      paymentMethod,
      productDescription,
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail
      },
      callbackUrl: 'https://your-domain.com/payment/callback',
      returnUrl: 'https://your-domain.com/payment/return',
      notifyUrl: 'https://your-domain.com/payment/notify'
    };

    // 發送 API 請求
    const response = await apiClient.post('/v1/payments', paymentData);

    if (!response.success) {
      throw new Error(`付款建立失敗: ${response.error}`);
    }

    // 格式化回應
    return {
      success: true,
      orderId,
      transactionId: response.data.transactionId,
      paymentUrl: response.data.paymentUrl,
      amount: TaiwanUtils.formatTWDAmount(amountInCents),
      paymentMethod: TaiwanUtils.getPaymentMethodDisplayName(paymentMethod),
      status: response.data.status,
      createdAt: TaiwanUtils.formatTaiwanDateTime(new Date()),
      expiresAt: response.data.expiresAt
    };
  }

  /**
   * 查詢付款狀態
   */
  private async queryPayment(
    context: IExecuteFunctions,
    apiClient: TaiwanApiClient,
    index: number
  ): Promise<any> {
    
    const orderId = context.getNodeParameter('orderId', index) as string;
    const transactionId = context.getNodeParameter('transactionId', index) as string;

    const response = await apiClient.get(`/v1/payments/${transactionId}`, {
      orderId
    });

    if (!response.success) {
      throw new Error(`付款查詢失敗: ${response.error}`);
    }

    return {
      success: true,
      orderId,
      transactionId,
      status: response.data.status,
      amount: TaiwanUtils.formatTWDAmount(response.data.amount),
      paidAt: response.data.paidAt ? TaiwanUtils.formatTaiwanDateTime(new Date(response.data.paidAt)) : null,
      paymentMethod: response.data.paymentMethod
    };
  }

  /**
   * 申請退款
   */
  private async refundPayment(
    context: IExecuteFunctions,
    apiClient: TaiwanApiClient,
    index: number
  ): Promise<any> {
    
    const orderId = context.getNodeParameter('orderId', index) as string;
    const transactionId = context.getNodeParameter('transactionId', index) as string;
    const refundAmount = context.getNodeParameter('refundAmount', index, 0) as number;

    const refundData: any = {
      orderId,
      transactionId
    };

    if (refundAmount > 0) {
      refundData.amount = refundAmount * 100; // 轉換為分
    }

    const response = await apiClient.post('/v1/refunds', refundData);

    if (!response.success) {
      throw new Error(`退款申請失敗: ${response.error}`);
    }

    return {
      success: true,
      orderId,
      transactionId,
      refundId: response.data.refundId,
      refundAmount: refundAmount > 0 ? TaiwanUtils.formatTWDAmount(refundAmount * 100) : '全額退款',
      status: response.data.status,
      refundedAt: TaiwanUtils.formatTaiwanDateTime(new Date())
    };
  }

  /**
   * 驗證付款參數
   */
  private async validatePaymentParameters(params: {
    orderId: string;
    amount: number;
    productDescription: string;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
  }): Promise<void> {
    
    const validator = new TaiwanValidator();
    const errors: string[] = [];

    // 驗證訂單編號
    if (!params.orderId || params.orderId.length < 3) {
      errors.push('訂單編號至少需要 3 個字元');
    }

    // 驗證金額
    const amountResult = validator.validateTWDAmount(params.amount * 100);
    if (!amountResult.isValid) {
      errors.push(...amountResult.errors);
    }

    // 驗證商品描述
    if (!params.productDescription || params.productDescription.length < 2) {
      errors.push('商品描述至少需要 2 個字元');
    }

    // 驗證客戶手機（如果提供）
    if (params.customerPhone) {
      const phoneResult = validator.validateMobileNumber(params.customerPhone);
      if (!phoneResult.isValid) {
        errors.push(...phoneResult.errors);
      }
    }

    // 驗證客戶電子郵件（如果提供）
    if (params.customerEmail) {
      const emailResult = validator.validateEmail(params.customerEmail);
      if (!emailResult.isValid) {
        errors.push(...emailResult.errors);
      }
    }

    if (errors.length > 0) {
      throw new Error(`參數驗證失敗: ${errors.join(', ')}`);
    }
  }

  /**
   * 載入動態選項
   */
  async loadOptions(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
    const resource = this.getCurrentNodeParameter('resource') as string;
    
    if (resource === 'paymentMethods') {
      return Object.values(TaiwanPaymentMethod).map(method => ({
        name: TaiwanUtils.getPaymentMethodDisplayName(method),
        value: method
      }));
    }

    return [];
  }
}
