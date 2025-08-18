<template>
  <div class="register-container">
    <div class="register-card">
      <!-- 標題區域 -->
      <div class="register-header">
        <div class="logo">
          <el-icon :size="32" color="#409EFF">
            <Setting />
          </el-icon>
        </div>
        <h1 class="title">建立新帳戶</h1>
        <p class="subtitle">加入台灣在地化流程自動化平台</p>
      </div>

      <!-- 註冊表單 -->
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
        size="large"
        @submit.prevent="handleRegister"
      >
        <el-form-item prop="name">
          <el-input
            v-model="registerForm.name"
            placeholder="請輸入姓名"
            prefix-icon="User"
            :disabled="loading"
          />
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            type="email"
            placeholder="請輸入電子郵件"
            prefix-icon="Message"
            :disabled="loading"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="請輸入密碼"
            prefix-icon="Lock"
            :disabled="loading"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="請確認密碼"
            prefix-icon="Lock"
            :disabled="loading"
            show-password
            @keyup.enter="handleRegister"
          />
        </el-form-item>

        <el-form-item prop="phone">
          <el-input
            v-model="registerForm.phone"
            placeholder="請輸入手機號碼（選填）"
            prefix-icon="Phone"
            :disabled="loading"
          />
        </el-form-item>

        <el-form-item prop="agreeTerms">
          <el-checkbox v-model="registerForm.agreeTerms" :disabled="loading">
            我已閱讀並同意
            <el-link type="primary" :underline="false" @click="showTerms">
              服務條款
            </el-link>
            和
            <el-link type="primary" :underline="false" @click="showPrivacy">
              隱私政策
            </el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="register-button"
            :loading="loading"
            @click="handleRegister"
          >
            {{ loading ? '註冊中...' : '建立帳戶' }}
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 登入連結 -->
      <div class="login-link">
        <span>已經有帳戶了？</span>
        <el-link type="primary" :underline="false" @click="goToLogin">
          立即登入
        </el-link>
      </div>

      <!-- 社交註冊 -->
      <div class="social-register">
        <el-divider>或使用以下方式註冊</el-divider>
        <div class="social-buttons">
          <el-button class="social-button google" @click="handleSocialRegister('google')">
            <span class="social-icon">G</span>
            Google
          </el-button>
          <el-button class="social-button line" @click="handleSocialRegister('line')">
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
const { register, loading } = useAuth()

// 表單引用
const registerFormRef = ref<FormInstance>()

// 註冊表單數據
const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  agreeTerms: false
})

// 確認密碼驗證器
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('請確認密碼'))
  } else if (value !== registerForm.password) {
    callback(new Error('兩次輸入的密碼不一致'))
  } else {
    callback()
  }
}

// 表單驗證規則
const registerRules: FormRules = {
  name: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
    { min: 2, max: 20, message: '姓名長度應在2-20個字符之間', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '請輸入電子郵件', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的電子郵件格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, max: 20, message: '密碼長度應在6-20個字符之間', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密碼應包含大小寫字母和數字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ],
  phone: [
    { pattern: /^09\d{8}$/, message: '請輸入正確的台灣手機號碼格式', trigger: 'blur' }
  ],
  agreeTerms: [
    { 
      validator: (rule: any, value: boolean, callback: any) => {
        if (!value) {
          callback(new Error('請同意服務條款和隱私政策'))
        } else {
          callback()
        }
      }, 
      trigger: 'change' 
    }
  ]
}

// 處理註冊
const handleRegister = async () => {
  if (!registerFormRef.value) return

  try {
    await registerFormRef.value.validate()
    
    const success = await register({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
      phone: registerForm.phone || undefined
    })

    if (success) {
      ElMessage.success('註冊成功！請檢查您的電子郵件以驗證帳戶')
      // 註冊成功後跳轉到登入頁面
      router.push('/login')
    }
  } catch (error) {
    console.error('註冊失敗:', error)
  }
}

// 前往登入頁面
const goToLogin = () => {
  router.push('/login')
}

// 顯示服務條款
const showTerms = () => {
  ElMessageBox.alert(
    '這裡是服務條款的內容...',
    '服務條款',
    {
      confirmButtonText: '我知道了',
      type: 'info'
    }
  )
}

// 顯示隱私政策
const showPrivacy = () => {
  ElMessageBox.alert(
    '這裡是隱私政策的內容...',
    '隱私政策',
    {
      confirmButtonText: '我知道了',
      type: 'info'
    }
  )
}

// 處理社交註冊
const handleSocialRegister = (provider: string) => {
  ElMessage.info(`${provider} 註冊功能開發中...`)
  // TODO: 實作社交註冊
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px 32px;
  backdrop-filter: blur(10px);
}

.register-header {
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

.register-form {
  .register-button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    font-weight: 500;
  }
}

.login-link {
  text-align: center;
  margin-top: 24px;
  color: $text-color-secondary;
  font-size: 14px;

  .el-link {
    margin-left: 4px;
  }
}

.social-register {
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
  .register-container {
    padding: 16px;
  }

  .register-card {
    padding: 32px 24px;
  }

  .register-header .title {
    font-size: 20px;
  }
}
</style>
