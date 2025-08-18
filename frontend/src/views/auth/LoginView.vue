<template>
  <div class="login-container">
    <div class="login-card">
      <!-- 標題區域 -->
      <div class="login-header">
        <div class="logo">
          <el-icon :size="32" color="#409EFF">
            <Setting />
          </el-icon>
        </div>
        <h1 class="title">台灣在地化流程自動化平台</h1>
        <p class="subtitle">歡迎回來，請登入您的帳戶</p>
      </div>

      <!-- 登入表單 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        size="large"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            type="email"
            placeholder="請輸入電子郵件"
            prefix-icon="Message"
            :disabled="loading"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="請輸入密碼"
            prefix-icon="Lock"
            :disabled="loading"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <div class="form-options">
            <el-checkbox v-model="loginForm.rememberMe" :disabled="loading">
              記住我
            </el-checkbox>
            <el-link type="primary" :underline="false" @click="handleForgotPassword">
              忘記密碼？
            </el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            {{ loading ? '登入中...' : '登入' }}
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 註冊連結 -->
      <div class="register-link">
        <span>還沒有帳戶？</span>
        <el-link type="primary" :underline="false" @click="goToRegister">
          立即註冊
        </el-link>
      </div>

      <!-- 社交登入 -->
      <div class="social-login">
        <el-divider>或使用以下方式登入</el-divider>
        <div class="social-buttons">
          <el-button class="social-button google" @click="handleSocialLogin('google')">
            <span class="social-icon">G</span>
            Google
          </el-button>
          <el-button class="social-button line" @click="handleSocialLogin('line')">
            <span class="social-icon">L</span>
            LINE
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { useAuth } from '@/composables/useAuth'

// 路由
const router = useRouter()

// 認證邏輯
const { login, loading } = useAuth()

// 表單引用
const loginFormRef = ref<FormInstance>()

// 登入表單數據
const loginForm = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// 表單驗證規則
const loginRules: FormRules = {
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的電子郵件格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼長度至少6個字符', trigger: 'blur' }
  ]
}

// 處理登入
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    
    const success = await login({
      email: loginForm.email,
      password: loginForm.password,
      rememberMe: loginForm.rememberMe
    })

    if (success) {
      ElMessage.success('登入成功！')
      // 登入成功後跳轉到首頁或之前的頁面
      const redirect = router.currentRoute.value.query.redirect as string
      router.push(redirect || '/')
    }
  } catch (error) {
    console.error('登入失敗:', error)
  }
}

// 前往註冊頁面
const goToRegister = () => {
  router.push('/register')
}

// 處理忘記密碼
const handleForgotPassword = () => {
  ElMessageBox.prompt('請輸入您的電子郵件地址', '重設密碼', {
    confirmButtonText: '發送重設連結',
    cancelButtonText: '取消',
    inputPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    inputErrorMessage: '請輸入正確的電子郵件格式'
  }).then(({ value }) => {
    ElMessage.success(`重設密碼連結已發送至 ${value}`)
    // TODO: 實作忘記密碼 API 呼叫
  }).catch(() => {
    // 用戶取消操作
  })
}

// 處理社交登入
const handleSocialLogin = (provider: string) => {
  ElMessage.info(`${provider} 登入功能開發中...`)
  // TODO: 實作社交登入
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px 32px;
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .logo {
    margin-bottom: 16px;
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    color: $text-color;
    margin: 0 0 8px 0;
  }

  .subtitle {
    color: $text-color-secondary;
    margin: 0;
    font-size: 14px;
  }
}

.login-form {
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .login-button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
}

.register-link {
  text-align: center;
  margin-top: 24px;
  color: $text-color-secondary;
  font-size: 14px;

  .el-link {
    margin-left: 4px;
  }
}

.social-login {
  margin-top: 24px;

  .social-buttons {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .social-button {
    flex: 1;
    height: 40px;
    border: 1px solid $border-color-light;
    background: white;
    color: $text-color-secondary;

    .social-icon {
      margin-right: 8px;
      font-weight: bold;
    }

    &.google:hover {
      border-color: #db4437;
      color: #db4437;
    }

    &.line:hover {
      border-color: #00c300;
      color: #00c300;
    }
  }
}

// 響應式設計
@media (max-width: 480px) {
  .login-container {
    padding: 16px;
  }

  .login-card {
    padding: 32px 24px;
  }

  .login-header .title {
    font-size: 20px;
  }
}
</style>
