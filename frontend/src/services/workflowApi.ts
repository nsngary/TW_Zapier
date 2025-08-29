/**
 * 工作流 API 服務
 */

export interface WorkflowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: any
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

export interface WorkflowSaveRequest {
  name?: string
  description?: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  settings?: Record<string, any>
  viewport?: {
    x: number
    y: number
    zoom: number
  }
}

export interface WorkflowCreateRequest {
  name: string
  description?: string
  category?: string
  tags?: string[]
  nodes?: WorkflowNode[]
  edges?: WorkflowEdge[]
  settings?: Record<string, any>
}

export interface WorkflowResponse {
  id: string
  user_id: string
  name: string
  description?: string
  status: string
  category?: string
  tags?: string[]
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  settings: Record<string, any>
  version: number
  execution_count: number
  success_count: number
  failure_count: number
  created_at: string
  updated_at: string
  last_executed_at?: string
}

export interface WorkflowListResponse {
  workflows: WorkflowResponse[]
  total: number
}

class WorkflowApiService {
  private baseUrl = 'http://localhost:8000/api/v1/workflows'

  private getAuthHeaders() {
    const token = localStorage.getItem('access_token')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  /**
   * 建立新工作流
   */
  async createWorkflow(data: WorkflowCreateRequest): Promise<WorkflowResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '建立工作流失敗')
    }

    return response.json()
  }

  /**
   * 取得用戶的工作流列表
   */
  async getUserWorkflows(params?: {
    skip?: number
    limit?: number
    category?: string
    search?: string
  }): Promise<WorkflowListResponse> {
    const searchParams = new URLSearchParams()
    if (params?.skip) searchParams.append('skip', params.skip.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.category) searchParams.append('category', params.category)
    if (params?.search) searchParams.append('search', params.search)

    const url = `${this.baseUrl}?${searchParams.toString()}`
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '取得工作流列表失敗')
    }

    const data = await response.json()

    // 後端直接返回工作流陣列，需要包裝成 WorkflowListResponse 格式
    if (Array.isArray(data)) {
      return {
        workflows: data,
        total: data.length
      }
    }

    // 如果已經是正確格式，直接返回
    return data
  }

  /**
   * 取得特定工作流
   */
  async getWorkflow(workflowId: string): Promise<WorkflowResponse> {
    const response = await fetch(`${this.baseUrl}/${workflowId}`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '取得工作流失敗')
    }

    return response.json()
  }

  /**
   * 儲存工作流
   */
  async saveWorkflow(workflowId: string, data: WorkflowSaveRequest): Promise<WorkflowResponse> {
    const response = await fetch(`${this.baseUrl}/${workflowId}/save`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '儲存工作流失敗')
    }

    return response.json()
  }

  /**
   * 更新工作流
   */
  async updateWorkflow(workflowId: string, data: Partial<WorkflowCreateRequest>): Promise<WorkflowResponse> {
    const response = await fetch(`${this.baseUrl}/${workflowId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '更新工作流失敗')
    }

    return response.json()
  }

  /**
   * 刪除工作流
   */
  async deleteWorkflow(workflowId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${workflowId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '刪除工作流失敗')
    }
  }

  /**
   * 複製工作流
   */
  async duplicateWorkflow(workflowId: string, newName?: string): Promise<WorkflowResponse> {
    const response = await fetch(`${this.baseUrl}/${workflowId}/duplicate`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ new_name: newName })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '複製工作流失敗')
    }

    return response.json()
  }

  /**
   * 執行工作流
   */
  async executeWorkflow(workflowId: string, triggerData?: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${workflowId}/execute`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ trigger_data: triggerData })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '執行工作流失敗')
    }

    return response.json()
  }

  /**
   * 取得工作流執行歷史
   */
  async getWorkflowExecutions(workflowId: string, params?: {
    skip?: number
    limit?: number
  }): Promise<any[]> {
    const searchParams = new URLSearchParams()
    if (params?.skip) searchParams.append('skip', params.skip.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    const url = `${this.baseUrl}/${workflowId}/executions?${searchParams.toString()}`
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '取得執行歷史失敗')
    }

    return response.json()
  }

  /**
   * 取得工作流統計
   */
  async getWorkflowStats(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/stats`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '取得統計資料失敗')
    }

    return response.json()
  }
}

export const workflowApi = new WorkflowApiService()
export default workflowApi
