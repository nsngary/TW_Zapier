<template>
  <div class="trigger-node-test">
    <h2>觸發節點測試</h2>
    
    <div class="test-section">
      <h3>手動觸發節點</h3>
      <TriggerNodeEditor
        v-model="manualTriggerData"
        @change="handleManualTriggerChange"
      />
      <div class="test-output">
        <h4>輸出資料：</h4>
        <pre>{{ JSON.stringify(manualTriggerData, null, 2) }}</pre>
      </div>
    </div>

    <div class="test-section">
      <h3>Webhook 觸發節點</h3>
      <TriggerNodeEditor
        v-model="webhookTriggerData"
        @change="handleWebhookTriggerChange"
      />
      <div class="test-output">
        <h4>輸出資料：</h4>
        <pre>{{ JSON.stringify(webhookTriggerData, null, 2) }}</pre>
      </div>
    </div>

    <div class="test-section">
      <h3>定時觸發節點</h3>
      <TriggerNodeEditor
        v-model="scheduleTriggerData"
        @change="handleScheduleTriggerChange"
      />
      <div class="test-output">
        <h4>輸出資料：</h4>
        <pre>{{ JSON.stringify(scheduleTriggerData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TriggerNodeEditor from './TriggerNodeEditor.vue'
import type { WorkflowNode } from '@/types/workflow'

// 測試資料
const manualTriggerData = ref<WorkflowNode>({
  id: 'test-manual',
  type: 'manualTrigger',
  label: '手動觸發測試',
  settings: {
    buttonText: '執行工作流程',
    requireConfirmation: false
  }
})

const webhookTriggerData = ref<WorkflowNode>({
  id: 'test-webhook',
  type: 'webhookTrigger',
  label: 'Webhook 觸發測試',
  settings: {
    path: '/webhook/test',
    method: 'POST',
    authentication: 'none',
    responseFormat: 'json'
  }
})

const scheduleTriggerData = ref<WorkflowNode>({
  id: 'test-schedule',
  type: 'scheduleTrigger',
  label: '定時觸發測試',
  settings: {
    mode: 'interval',
    intervalValue: 1,
    intervalUnit: 'hours',
    timezone: 'Asia/Taipei',
    enabled: true
  }
})

// 事件處理
const handleManualTriggerChange = (data: WorkflowNode) => {
  console.log('手動觸發節點變更:', data)
}

const handleWebhookTriggerChange = (data: WorkflowNode) => {
  console.log('Webhook 觸發節點變更:', data)
}

const handleScheduleTriggerChange = (data: WorkflowNode) => {
  console.log('定時觸發節點變更:', data)
}
</script>

<style scoped lang="scss">
.trigger-node-test {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h2 {
    color: #333;
    margin-bottom: 30px;
  }

  .test-section {
    margin-bottom: 40px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;

    h3 {
      color: #10b981;
      margin-bottom: 20px;
    }

    .test-output {
      margin-top: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 6px;

      h4 {
        margin-bottom: 10px;
        color: #6b7280;
        font-size: 14px;
      }

      pre {
        background: #1f2937;
        color: #f9fafb;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
        font-size: 12px;
        line-height: 1.4;
      }
    }
  }
}
</style>
