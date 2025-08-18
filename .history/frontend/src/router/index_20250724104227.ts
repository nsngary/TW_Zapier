import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/workflow-editor'
    },
    {
      path: '/workflow-editor',
      name: 'workflow-editor',
      component: () => import('@/views/WorkflowEditorTest.vue'),
      meta: {
        title: '工作流編輯器測試'
      }
    }
  ]
})

// 路由守衛
router.beforeEach((to, from, next) => {
  // 設定頁面標題
  if (to.meta?.title) {
    document.title = `${to.meta.title} - 台灣在地化流程自動化平台`
  } else {
    document.title = '台灣在地化流程自動化平台'
  }
  
  next()
})

export default router
