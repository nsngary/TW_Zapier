import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores'

// 路由配置
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: '登入',
      requiresAuth: false,
      hideForAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterPage.vue'),
    meta: {
      title: '註冊',
      requiresAuth: false,
      hideForAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: {
      title: '儀表板',
      requiresAuth: true
    }
  },
  // 暫時註解掉不存在的工作流路由
  // {
  //   path: '/workflows',
  //   name: 'workflows',
  //   component: () => import('@/views/workflow/WorkflowListView.vue'),
  //   meta: {
  //     title: '工作流程',
  //     requiresAuth: true
  //   }
  // },
  // ===== Editor 工作流編輯器 =====
  {
    path: '/editor',
    name: 'workflow-editor',
    component: () => import('@/views/WorkflowTest.vue'),
    meta: {
      title: 'TW_Zapier 工作流編輯器',
      requiresAuth: true
    }
  },

  // ===== Website 展示頁面 =====
  {
    path: '/color-system',
    name: 'color-system-demo',
    component: () => import('@/views/ColorSystemDemo.vue'),
    meta: {
      title: '配色系統展示'
    }
  },

  // ===== 舊版路由（向後相容） =====
  {
    path: '/workflow-editor',
    redirect: '/editor'
  },
  {
    path: '/flow-editor',
    redirect: '/editor'
  },
  {
    path: '/trigger-node-test',
    name: 'trigger-node-test',
    component: () => import('@/components/workflow/editors/TriggerNodeTest.vue'),
    meta: {
      title: '觸發節點測試'
    }
  },
  // 暫時註解掉不存在的路由
  // {
  //   path: '/executions',
  //   name: 'executions',
  //   component: () => import('@/views/execution/ExecutionListView.vue'),
  //   meta: {
  //     title: '執行記錄',
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('@/views/error/NotFoundView.vue'),
    meta: {
      title: '頁面不存在'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守衛
router.beforeEach(async (to, from, next) => {
  // 設定頁面標題
  if (to.meta?.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_TITLE}`
  } else {
    document.title = import.meta.env.VITE_APP_TITLE
  }

  const authStore = useAuthStore()

  // 檢查是否需要認證
  if (to.meta?.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  // 如果已登入且訪問登入/註冊頁面，重導向到儀表板
  if (to.meta?.hideForAuth) {
    if (authStore.isAuthenticated) {
      next({ name: 'dashboard' })
      return
    }
  }

  next()
})

export default router
