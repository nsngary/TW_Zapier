import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class LinePay implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Line Pay',
		name: 'linePay',
		icon: 'file:linepay.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Line Pay 台灣行動支付服務整合',
		defaults: {
			name: 'Line Pay',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'linePayApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: '資源',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: '付款',
						value: 'payment',
					},
					{
						name: '退款',
						value: 'refund',
					},
					{
						name: '查詢',
						value: 'inquiry',
					},
				],
				default: 'payment',
			},
			{
				displayName: '操作',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['payment'],
					},
				},
				options: [
					{
						name: '建立付款請求',
						value: 'create',
						description: '建立新的付款請求',
						action: '建立付款請求',
					},
					{
						name: '確認付款',
						value: 'confirm',
						description: '確認付款交易',
						action: '確認付款',
					},
					{
						name: '取消付款',
						value: 'cancel',
						description: '取消付款交易',
						action: '取消付款',
					},
				],
				default: 'create',
			},
			{
				displayName: '操作',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['refund'],
					},
				},
				options: [
					{
						name: '申請退款',
						value: 'create',
						description: '申請交易退款',
						action: '申請退款',
					},
				],
				default: 'create',
			},
			{
				displayName: '操作',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['inquiry'],
					},
				},
				options: [
					{
						name: '查詢付款狀態',
						value: 'payment',
						description: '查詢付款交易狀態',
						action: '查詢付款狀態',
					},
					{
						name: '查詢退款狀態',
						value: 'refund',
						description: '查詢退款交易狀態',
						action: '查詢退款狀態',
					},
				],
				default: 'payment',
			},
			// 付款建立參數
			{
				displayName: '訂單編號',
				name: 'orderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['create'],
					},
				},
				default: '',
				description: '商店訂單編號',
			},
			{
				displayName: '付款金額',
				name: 'amount',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['create'],
					},
				},
				default: 0,
				description: '付款金額（新台幣）',
			},
			{
				displayName: '商品名稱',
				name: 'productName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['create'],
					},
				},
				default: '',
				description: '商品或服務名稱',
			},
			{
				displayName: '確認 URL',
				name: 'confirmUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['create'],
					},
				},
				default: '',
				description: '付款完成後的確認頁面 URL',
			},
			{
				displayName: '取消 URL',
				name: 'cancelUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['create'],
					},
				},
				default: '',
				description: '付款取消後的返回頁面 URL',
			},
			// 交易 ID 參數
			{
				displayName: '交易 ID',
				name: 'transactionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['payment'],
						operation: ['confirm', 'cancel'],
					},
				},
				default: '',
				description: 'Line Pay 交易識別碼',
			},
			{
				displayName: '交易 ID',
				name: 'transactionId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['inquiry'],
						operation: ['payment'],
					},
				},
				default: '',
				description: 'Line Pay 交易識別碼',
			},
			// 退款參數
			{
				displayName: '退款金額',
				name: 'refundAmount',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['refund'],
						operation: ['create'],
					},
				},
				default: 0,
				description: '退款金額（留空表示全額退款）',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// 取得認證資訊
		const credentials = await this.getCredentials('linePayApi');
		const channelId = credentials.channelId as string;
		const channelSecret = credentials.channelSecret as string;
		const isSandbox = credentials.sandbox as boolean;

		// 設定 API 基礎 URL
		const baseUrl = isSandbox 
			? 'https://sandbox-api-pay.line.me' 
			: 'https://api-pay.line.me';

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'payment') {
					if (operation === 'create') {
						responseData = await this.createPayment(
							baseUrl,
							channelId,
							channelSecret,
							i
						);
					} else if (operation === 'confirm') {
						responseData = await this.confirmPayment(
							baseUrl,
							channelId,
							channelSecret,
							i
						);
					} else if (operation === 'cancel') {
						responseData = await this.cancelPayment(
							baseUrl,
							channelId,
							channelSecret,
							i
						);
					}
				} else if (resource === 'refund') {
					if (operation === 'create') {
						responseData = await this.createRefund(
							baseUrl,
							channelId,
							channelSecret,
							i
						);
					}
				} else if (resource === 'inquiry') {
					if (operation === 'payment') {
						responseData = await this.inquirePayment(
							baseUrl,
							channelId,
							channelSecret,
							i
						);
					}
				}

				returnData.push({
					json: responseData,
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}

	private async createPayment(
		baseUrl: string,
		channelId: string,
		channelSecret: string,
		itemIndex: number
	): Promise<any> {
		const orderId = this.getNodeParameter('orderId', itemIndex) as string;
		const amount = this.getNodeParameter('amount', itemIndex) as number;
		const productName = this.getNodeParameter('productName', itemIndex) as string;
		const confirmUrl = this.getNodeParameter('confirmUrl', itemIndex) as string;
		const cancelUrl = this.getNodeParameter('cancelUrl', itemIndex) as string;

		const requestBody = {
			amount,
			currency: 'TWD',
			orderId,
			packages: [
				{
					id: orderId,
					amount,
					name: productName,
					products: [
						{
							id: orderId,
							name: productName,
							quantity: 1,
							price: amount,
						},
					],
				},
			],
			redirectUrls: {
				confirmUrl,
				cancelUrl,
			},
		};

		// 生成簽名和發送請求的邏輯
		// 這裡需要實作 Line Pay API 的 HMAC 簽名機制
		const response = await this.makeLinePayRequest(
			'POST',
			`${baseUrl}/v3/payments/request`,
			channelId,
			channelSecret,
			requestBody
		);

		return response;
	}

	private async makeLinePayRequest(
		method: string,
		url: string,
		channelId: string,
		channelSecret: string,
		body?: any
	): Promise<any> {
		// 實作 Line Pay API 請求邏輯
		// 包含 HMAC 簽名生成和 HTTP 請求
		// 這是簡化版本，實際需要完整的簽名機制
		
		const options = {
			method,
			url,
			headers: {
				'Content-Type': 'application/json',
				'X-LINE-ChannelId': channelId,
				// 'X-LINE-Authorization': signature, // 需要實作簽名
			},
			json: body,
		};

		return await this.helpers.request(options);
	}

	// 其他方法的實作...
	private async confirmPayment(baseUrl: string, channelId: string, channelSecret: string, itemIndex: number): Promise<any> {
		// 實作付款確認邏輯
		return {};
	}

	private async cancelPayment(baseUrl: string, channelId: string, channelSecret: string, itemIndex: number): Promise<any> {
		// 實作付款取消邏輯
		return {};
	}

	private async createRefund(baseUrl: string, channelId: string, channelSecret: string, itemIndex: number): Promise<any> {
		// 實作退款申請邏輯
		return {};
	}

	private async inquirePayment(baseUrl: string, channelId: string, channelSecret: string, itemIndex: number): Promise<any> {
		// 實作付款查詢邏輯
		return {};
	}
}
