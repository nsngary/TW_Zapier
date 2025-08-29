<template>
  <div class="login-page">
    <div class="login-container">
      <BaseCard class="login-card" variant="elevated" size="lg">
        <template #header>
          <div class="login-header">
            <div class="logo-section">
              <svg class="logo" width="120" height="32" viewBox="0 0 244 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- TW_Zapier Logo -->
                <path d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z" fill="#86735E"></path>
                <path d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 93.071 40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z" fill="#86735E"></path>
                <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#C2474A"></path>
              </svg>
            </div>
            <h1 class="login-title">歡迎回來</h1>
            <p class="login-subtitle">登入您的帳戶以繼續使用 TW_Zapier</p>
          </div>
        </template>

        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <BaseInput
              v-model="form.username"
              label="帳號"
              type="text"
              placeholder="請輸入您的帳號"
              required
              :error="errors.username"
              :disabled="isLoading"
              autocomplete="username"
              @blur="validateField('username')"
            />
          </div>

          <div class="form-group">
            <BaseInput
              v-model="form.password"
              label="密碼"
              type="password"
              placeholder="請輸入您的密碼"
              required
              :error="errors.password"
              :disabled="isLoading"
              :show-password-toggle="true"
              autocomplete="current-password"
              @blur="validateField('password')"
            />
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input
                v-model="form.rememberMe"
                type="checkbox"
                :disabled="isLoading"
              />
              <span class="checkmark"></span>
              記住我
            </label>
            
            <router-link to="/forgot-password" class="forgot-password">
              忘記密碼？
            </router-link>
          </div>

          <div class="form-actions">
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              block
              :loading="isLoading"
              :disabled="!isFormValid"
            >
              登入
            </BaseButton>
          </div>

          <div v-if="errors.general" class="error-message-container">
            <p class="error-message">{{ errors.general }}</p>
          </div>

          <div class="form-footer">
            <p class="signup-prompt">
              還沒有帳戶？
              <router-link to="/register" class="signup-link">
                立即註冊
              </router-link>
            </p>
          </div>
        </form>
      </BaseCard>
    </div>

    <!-- 背景裝飾 -->
    <div class="background-decoration">
      <div class="decoration-circle decoration-1"></div>
      <div class="decoration-circle decoration-2"></div>
      <div class="decoration-circle decoration-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

// 表單狀態
const form = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: '',
  general: ''
})

const isLoading = ref(false)

// 計算屬性
const isFormValid = computed(() => {
  return form.username.trim() !== '' && 
         form.password.trim() !== '' && 
         !errors.username && 
         !errors.password
})

// 驗證函數
const validateField = (field: keyof typeof form) => {
  errors[field as keyof typeof errors] = ''
  
  switch (field) {
    case 'username':
      if (!form.username.trim()) {
        errors.username = '請輸入帳號'
      } else if (form.username.length < 3) {
        errors.username = '帳號至少需要3個字元'
      }
      break
      
    case 'password':
      if (!form.password.trim()) {
        errors.password = '請輸入密碼'
      } else if (form.password.length < 3) {
        errors.password = '密碼至少需要3個字元'
      }
      break
  }
}

// 提交處理
const handleSubmit = async () => {
  // 清除之前的錯誤
  errors.general = ''

  // 驗證所有欄位
  validateField('username')
  validateField('password')

  if (!isFormValid.value) {
    return
  }

  isLoading.value = true

  try {
    // 調用後端 API
    const response = await fetch('http://localhost:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    })

    if (response.ok) {
      const data = await response.json()

      // 登入成功
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', data.user.name)
      localStorage.setItem('userEmail', data.user.email)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem('token_expiry', (Date.now() + data.expires_in * 1000).toString())

      if (form.rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      }

      // 使用 auth store 設定真實 token
      authStore.setTokens(data.access_token, data.refresh_token, data.expires_in)

      // 導向儀表板
      const redirect = router.currentRoute.value.query.redirect as string
      router.push(redirect || '/dashboard')
    } else {
      const errorData = await response.json()
      errors.general = errorData.detail || '帳號或密碼錯誤'
    }
  } catch (error) {
    console.error('登入錯誤:', error)
    errors.general = '登入失敗，請檢查網路連線'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
}

.login-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.login-header {
  text-align: center;
  margin-bottom: 8px;
}

.logo-section {
  margin-bottom: 24px;
}

.logo {
  display: block;
  margin: 0 auto;
}

.login-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #374151;
}

.login-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -8px 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  user-select: none;
}

.remember-me input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 3px;
  position: relative;
  transition: all 0.2s ease;
}

.remember-me input[type="checkbox"]:checked + .checkmark {
  background-color: #86735E;
  border-color: #86735E;
}

.remember-me input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-password {
  font-size: 14px;
  color: #86735E;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password:hover {
  color: #7a6654;
  text-decoration: underline;
}

.form-actions {
  margin-top: 8px;
}

.error-message-container {
  margin-top: 16px;
  padding: 12px;
  background: rgba(194, 71, 74, 0.1);
  border: 1px solid rgba(194, 71, 74, 0.3);
  border-radius: 6px;
}

.error-message-container .error-message {
  margin: 0;
  color: #C2474A;
  font-size: 14px;
  text-align: center;
}

.form-footer {
  text-align: center;
  margin-top: 8px;
}

.signup-prompt {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.signup-link {
  color: #86735E;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.signup-link:hover {
  color: #7a6654;
  text-decoration: underline;
}

/* 背景裝飾 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(134, 115, 94, 0.1), rgba(194, 71, 74, 0.1));
  animation: float 6s ease-in-out infinite;
}

.decoration-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.decoration-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: -5%;
  animation-delay: 2s;
}

.decoration-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  .login-page {
    padding: 16px;
  }
  
  .login-container {
    max-width: 100%;
  }
  
  .login-title {
    font-size: 20px;
  }
  
  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

/* 無障礙設計 */
@media (prefers-reduced-motion: reduce) {
  .decoration-circle {
    animation: none;
  }
}

/* 高對比模式 */
@media (prefers-contrast: high) {
  .login-card {
    background: white;
    border: 2px solid #000;
  }
  
  .checkmark {
    border-width: 3px;
  }
}
</style>
