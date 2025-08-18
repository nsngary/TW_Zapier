/**
 * 工作流狀態管理
 */

import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { StandardWorkflow, LoadingState, StandardError } from '@/types'

export const useWorkflowStore = defineStore('workflow', () => {
  // ===== 狀態 =====
  const workflows = ref<StandardWorkflow[]>([])
  const currentWorkflow = ref<StandardWorkflow | null>(null)
  const loading = ref<LoadingState>('idle')
  const error = ref<StandardError | null>(null)

  // ===== 計算屬性 =====
  const activeWorkflows = computed(() => 
    workflows.value.filter(w => w.status === 'active')
  )

  const totalWorkflows = computed(() => workflows.value.length)

  // ===== 動作 =====

  /**
   * 設定工作流列表
   */
  const setWorkflows = (workflowList: StandardWorkflow[]) => {
    workflows.value = workflowList
  }

  /**
   * 設定當前工作流
   */
  const setCurrentWorkflow = (workflow: StandardWorkflow | null) => {
    currentWorkflow.value = workflow
  }

  /**
   * 添加工作流
   */
  const addWorkflow = (workflow: StandardWorkflow) => {
    workflows.value.push(workflow)
  }

  /**
   * 更新工作流
   */
  const updateWorkflow = (id: string, updates: Partial<StandardWorkflow>) => {
    const index = workflows.value.findIndex(w => w.id === id)
    if (index !== -1) {
      workflows.value[index] = { ...workflows.value[index], ...updates }
    }
  }

  /**
   * 刪除工作流
   */
  const removeWorkflow = (id: string) => {
    const index = workflows.value.findIndex(w => w.id === id)
    if (index !== -1) {
      workflows.value.splice(index, 1)
    }
  }

  /**
   * 清除錯誤
   */
  const clearError = () => {
    error.value = null
    loading.value = 'idle'
  }

  return {
    // 狀態
    workflows: readonly(workflows),
    currentWorkflow: readonly(currentWorkflow),
    loading: readonly(loading),
    error: readonly(error),

    // 計算屬性
    activeWorkflows,
    totalWorkflows,

    // 動作
    setWorkflows,
    setCurrentWorkflow,
    addWorkflow,
    updateWorkflow,
    removeWorkflow,
    clearError
  }
})
