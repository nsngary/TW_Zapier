import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LinePayApi implements ICredentialType {
	name = 'linePayApi';
	displayName = 'Line Pay API';
	documentationUrl = 'https://pay.line.me/tw/developers/apis/onlineApis';
	properties: INodeProperties[] = [
		{
			displayName: 'Channel ID',
			name: 'channelId',
			type: 'string',
			default: '',
			required: true,
			description: 'Line Pay Channel ID',
		},
		{
			displayName: 'Channel Secret',
			name: 'channelSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Line Pay Channel Secret',
		},
		{
			displayName: '沙盒模式',
			name: 'sandbox',
			type: 'boolean',
			default: true,
			description: '是否使用沙盒環境進行測試',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-LINE-ChannelId': '={{$credentials.channelId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.sandbox ? "https://sandbox-api-pay.line.me" : "https://api-pay.line.me"}}',
			url: '/v3/payments/authorizations',
			method: 'GET',
		},
	};
}
