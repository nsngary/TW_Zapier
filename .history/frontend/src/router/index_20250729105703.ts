import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 路由配置
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首頁'
    }
  },
  // 暫時註解掉不存在的路由
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/auth/LoginView.vue'),
  //   meta: {
  //     title: '登入',
  //     requiresAuth: false,
  //     hideForAuth: true
  //   }
  // },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('@/views/auth/RegisterView.vue'),
  //   meta: {
  //     title: '註冊',
  //     requiresAuth: false,
  //     hideForAuth: true
  //   }
  // },
  {
    path: '/workflows',
    name: 'workflows',
    component: () => import('@/views/workflow/WorkflowListView.vue'),
    meta: {
      title: '工作流程',
      requiresAuth: true
    }
  },
  {
    path: '/workflows/create',
    name: 'workflow-create',
    component: () => import('@/views/workflow/WorkflowEditorView.vue'),
    meta: {
      title: '建立工作流程',
      requiresAuth: true
    }
  },
  {
    path: '/workflows/:id',
    name: 'workflow-detail',
    component: () => import('@/views/workflow/WorkflowDetailView.vue'),
    meta: {
      title: '工作流程詳情',
      requiresAuth: true
    }
  },
  {
    path: '/workflows/:id/edit',
    name: 'workflow-edit',
    component: () => import('@/views/workflow/WorkflowEditorView.vue'),
    meta: {
      title: '編輯工作流程',
      requiresAuth: true
    }
  },
  {
    path: '/workflow-editor',
    name: 'workflow-editor-test',
    component: () => import('@/views/WorkflowEditorTest.vue'),
    meta: {
      title: '工作流編輯器測試'
    }
  },
  {
    path: '/executions',
    name: 'executions',
    component: () => import('@/views/execution/ExecutionListView.vue'),
    meta: {
      title: '執行記錄',
      requiresAuth: true
    }
  },
  {
    path: '/nodes',
    name: 'nodes',
    component: () => import('@/views/node/NodeListView.vue'),
    meta: {
      title: '節點管理',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/settings/SettingsView.vue'),
    meta: {
      title: '設定',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/user/ProfileView.vue'),
    meta: {
      title: '個人資料',
      requiresAuth: true
    }
  },
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

  // 檢查是否需要認證
  if (to.meta?.requiresAuth) {
    // 這裡可以添加認證檢查邏輯
    // const authStore = useAuthStore()
    // if (!authStore.isAuthenticated) {
    //   next({
    //     name: 'login',
    //     query: { redirect: to.fullPath }
    //   })
    //   return
    // }
  }

  // 如果已登入且訪問登入/註冊頁面，重導向到首頁
  if (to.meta?.hideForAuth) {
    // const authStore = useAuthStore()
    // if (authStore.isAuthenticated) {
    //   next({ name: 'home' })
    //   return
    // }
  }

  next()
})

export default router
