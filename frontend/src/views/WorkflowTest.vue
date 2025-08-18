<template>
  <div class="workflow-editor">
    <!-- 直接使用 VueFlowEditor，移除重複的 header -->
    <VueFlowEditor
      @workflow-change="handleWorkflowChange"
      @node-select="handleNodeSelect"
    />


  </div>
</template>

<script setup lang="ts">
import VueFlowEditor from '@/components/workflow/VueFlowEditor.vue'

// 型別定義
interface WorkflowNode {
  id: string
  type: string
  label: string
  position: { x: number; y: number }
  data?: any
}

interface WorkflowConnection {
  id: string
  source: string
  target: string
}

// ===== 事件處理 =====

function handleWorkflowChange({ nodes, edges }: {
  nodes: WorkflowNode[]
  edges: WorkflowConnection[]
}) {
  // VueFlowEditor 內部已處理工作流變更
  console.log('工作流已變更:', { nodes: nodes?.length, edges: edges?.length })
}

function handleNodeSelect(node: WorkflowNode | null) {
  // VueFlowEditor 內部已處理節點選擇
  console.log('節點已選擇:', node?.label)
}


</script>

<style scoped lang="scss">
.workflow-editor {
  height: 100vh;
  width: 100vw;
}


</style>
