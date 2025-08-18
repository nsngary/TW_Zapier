<template>
  <div class="workflow-editor-test">
    <div class="test-header">
      <h1>🇹🇼 拖拉式工作流編輯器測試</h1>
      <div class="test-controls">
        <el-button @click="loadSampleWorkflow" type="primary">
          載入範例工作流
        </el-button>
        <el-button @click="exportWorkflow" type="success">
          匯出工作流
        </el-button>
        <el-button @click="clearWorkflow" type="danger">
          清空工作流
        </el-button>
      </div>
    </div>

    <div class="editor-container">
      <WorkflowEditor
        :initial-nodes="currentNodes"
        :initial-connections="currentConnections"
        :readonly="false"
        @workflow-change="handleWorkflowChange"
        @node-select="handleNodeSelect"
      />
    </div>

    <!-- 匯出結果對話框 -->
    <el-dialog
      v-model="showExportDialog"
      title="工作流匯出結果"
      width="80%"
      :close-on-click-modal="false"
    >
      <div class="export-content">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="JSON 格式" name="json">
            <pre class="json-output">{{ formattedJson }}</pre>
          </el-tab-pane>
          <el-tab-pane label="n8n 格式" name="n8n">
            <pre class="json-output">{{ formattedN8nJson }}</pre>
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <template #footer>
        <el-button @click="copyToClipboard" type="primary">
          複製到剪貼簿
        </el-button>
        <el-button @click="downloadJson" type="success">
          下載 JSON
        </el-button>
        <el-button @click="showExportDialog = false">
          關閉
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import WorkflowEditor from '@/components/workflow/WorkflowEditor.vue'
import type { WorkflowNode, WorkflowConnection, TaiwanNodeTypeString } from '@/types/workflow'

// 本地狀態
const currentNodes = ref<WorkflowNode[]>([])
const currentConnections = ref<WorkflowConnection[]>([])
const selectedNode = ref<WorkflowNode | null>(null)
const showExportDialog = ref(false)
const activeTab = ref('json')
const exportedWorkflow = ref<any>(null)

// 計算屬性
const formattedJson = computed(() => {
  if (!exportedWorkflow.value) return ''
  return JSON.stringify(exportedWorkflow.value, null, 2)
})

const formattedN8nJson = computed(() => {
  if (!exportedWorkflow.value) return ''
  
  // 轉換為 n8n 格式
  const n8nWorkflow = {
    name: exportedWorkflow.value.name,
    nodes: exportedWorkflow.value.nodes.map(node => ({
      id: node.id,
      name: node.data.label,
      type: mapToN8nNodeType(node.type),
      position: [node.position.x, node.position.y],
      parameters: mapToN8nParameters(node.type, node.data)
    })),
    connections: convertToN8nConnections(exportedWorkflow.value.edges),
    active: false,
    settings: {},
    tags: []
  }
  
  return JSON.stringify(n8nWorkflow, null, 2)
})

// 新增的方法
function handleWorkflowChange({ nodes, connections }: {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
}) {
  currentNodes.value = nodes
  currentConnections.value = connections
}

function handleNodeSelect(node: WorkflowNode | null) {
  selectedNode.value = node
}

// 方法：載入範例工作流
function loadSampleWorkflow() {
  const sampleNodes: WorkflowNode[] = [
    {
      id: 'trigger-1',
      type: 'manualTrigger',
      label: '手動觸發',
      position: { x: 100, y: 100 },
      data: {
        label: '手動觸發',
        type: 'manual',
        settings: {}
      }
    },
    {
      id: 'linepay-1',
      type: 'linePay',
      label: 'Line Pay 付款',
      position: { x: 400, y: 100 },
      data: {
        label: 'Line Pay 付款',
        amount: 1000,
        currency: 'TWD',
        productName: '測試商品',
        orderId: 'TEST001',
        settings: {
          sandbox: true
        }
      }
    }
  ]

  const sampleConnections: WorkflowConnection[] = [
    {
      id: 'conn-1',
      source: 'trigger-1',
      target: 'linepay-1',
      sourceHandle: 'output',
      targetHandle: 'input'
    }
  ]

  currentNodes.value = sampleNodes
  currentConnections.value = sampleConnections
  ElMessage.success('範例工作流已載入')
}

// 方法：匯出工作流
function exportWorkflow() {
  // 這裡應該從編輯器獲取當前工作流
  // 暫時使用模擬資料
  const mockWorkflow: TaiwanWorkflow = {
    id: 'test-workflow',
    name: '台灣金流測試工作流',
    description: '這是一個測試用的台灣金流工作流',
    version: '1.0.0',
    nodes: [
      {
        id: 'trigger-1',
        type: 'manualTrigger' as TaiwanNodeType,
        position: { x: 100, y: 100 },
        data: {
          label: '手動觸發'
        },
        draggable: true,
        selectable: true,
        deletable: true
      },
      {
        id: 'linepay-1',
        type: 'linePay' as TaiwanNodeType,
        position: { x: 300, y: 100 },
        data: {
          label: 'Line Pay 付款',
          amount: 1000,
          productName: '測試商品',
          currency: 'TWD'
        },
        draggable: true,
        selectable: true,
        deletable: true
      }
    ],
    edges: [
      {
        id: 'edge-1',
        source: 'trigger-1',
        target: 'linepay-1',
        animated: true
      }
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
    settings: {
      autoSave: true,
      gridSize: 20,
      snapToGrid: true,
      showMinimap: true,
      showControls: true,
      theme: 'light'
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'test-user',
      tags: ['測試', '金流'],
      category: '金融服務'
    }
  }
  
  exportedWorkflow.value = mockWorkflow
  showExportDialog.value = true
}

// 方法：清空工作流
function clearWorkflow() {
  ElMessageBox.confirm(
    '確定要清空當前工作流嗎？此操作無法復原。',
    '確認清空',
    {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 清空工作流邏輯
    ElMessage.success('工作流已清空')
  }).catch(() => {
    // 取消操作
  })
}

// 方法：複製到剪貼簿
async function copyToClipboard() {
  try {
    const textToCopy = activeTab.value === 'json' ? formattedJson.value : formattedN8nJson.value
    await navigator.clipboard.writeText(textToCopy)
    ElMessage.success('已複製到剪貼簿')
  } catch (error) {
    ElMessage.error('複製失敗')
  }
}

// 方法：下載 JSON
function downloadJson() {
  const textToDownload = activeTab.value === 'json' ? formattedJson.value : formattedN8nJson.value
  const filename = activeTab.value === 'json' ? 'workflow.json' : 'workflow-n8n.json'
  
  const blob = new Blob([textToDownload], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
  ElMessage.success('檔案已下載')
}

// 輔助方法：映射到 n8n 節點類型
function mapToN8nNodeType(nodeType: TaiwanNodeType): string {
  const typeMap: Record<TaiwanNodeType, string> = {
    manualTrigger: 'n8n-nodes-base.manualTrigger',
    webhookTrigger: 'n8n-nodes-base.webhook',
    scheduleTrigger: 'n8n-nodes-base.cron',
    linePay: 'linePay',
    ecPay: 'ecPay',
    taoyuanAirport: 'taoyuanAirport',
    govOpenData: 'govOpenData',
    httpRequest: 'n8n-nodes-base.httpRequest',
    setData: 'n8n-nodes-base.set',
    condition: 'n8n-nodes-base.if',
    loop: 'n8n-nodes-base.splitInBatches',
    lineNotify: 'lineNotify',
    email: 'n8n-nodes-base.emailSend',
    slack: 'n8n-nodes-base.slack'
  }
  
  return typeMap[nodeType] || nodeType
}

// 輔助方法：映射到 n8n 參數
function mapToN8nParameters(nodeType: TaiwanNodeType, data: any): any {
  switch (nodeType) {
    case 'linePay':
      return {
        resource: 'payment',
        operation: 'create',
        amount: data.amount,
        productName: data.productName,
        orderId: data.orderId,
        confirmUrl: data.confirmUrl,
        cancelUrl: data.cancelUrl
      }
    
    case 'ecPay':
      return {
        resource: 'payment',
        operation: 'create',
        totalAmount: data.totalAmount,
        merchantTradeNo: data.merchantTradeNo,
        tradeDesc: data.tradeDesc,
        paymentType: data.paymentType
      }
    
    default:
      return data
  }
}

// 輔助方法：轉換連線格式
function convertToN8nConnections(edges: any[]): any {
  const connections: any = {}
  
  edges.forEach(edge => {
    const sourceNode = exportedWorkflow.value?.nodes.find(n => n.id === edge.source)
    if (sourceNode) {
      const sourceName = sourceNode.data.label
      if (!connections[sourceName]) {
        connections[sourceName] = { main: [[]] }
      }
      
      const targetNode = exportedWorkflow.value?.nodes.find(n => n.id === edge.target)
      if (targetNode) {
        connections[sourceName].main[0].push({
          node: targetNode.data.label,
          type: 'main',
          index: 0
        })
      }
    }
  })
  
  return connections
}
</script>

<style scoped>
.workflow-editor-test {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.test-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #374151;
}

.test-controls {
  display: flex;
  gap: 12px;
}

.editor-container {
  flex: 1;
  overflow: hidden;
}

.export-content {
  max-height: 60vh;
  overflow: hidden;
}

.json-output {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  overflow: auto;
  max-height: 50vh;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .workflow-editor-test {
    background: #111827;
  }
  
  .test-header {
    background: #1f2937;
    border-color: #374151;
  }
  
  .test-header h1 {
    color: #f3f4f6;
  }
  
  .json-output {
    background: #1f2937;
    border-color: #374151;
    color: #f3f4f6;
  }
}
</style>
