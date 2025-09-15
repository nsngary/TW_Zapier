<template>
  <div class="register-page">
    <div class="register-container">
      <BaseCard class="register-card" variant="elevated" size="lg">
        <template #header>
          <div class="register-header">
            <div class="logo-section">
              <svg class="logo" width="120" height="32" viewBox="0 0 244 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- TW_Zapier Logo -->
                <path d="M57.1877 45.2253L57.1534 45.1166L78.809 25.2914V15.7391H44.0663V25.2914H64.8181L64.8524 25.3829L43.4084 45.2253V54.7775H79.1579V45.2253H57.1877Z" fill="#86735E"></path>
                <path d="M100.487 14.8297C96.4797 14.8297 93.2136 15.434 90.6892 16.6429C88.3376 17.6963 86.3568 19.4321 85.0036 21.6249C83.7091 23.8321 82.8962 26.2883 82.6184 28.832L93.1602 30.3135C93.5415 28.0674 94.3042 26.4754 95.4482 25.5373C96.7486 24.5562 98.3511 24.0605 99.9783 24.136C102.118 24.136 103.67 24.7079 104.634 25.8519C105.59 26.9959 106.076 28.5803 106.076 30.6681V31.7091H95.9401C90.7807 31.7091 87.0742 32.8531 84.8206 35.1411C82.5669 37.429 81.442 40.4492 81.4458 44.2014C81.4458 48.0452 82.5707 50.9052 84.8206 52.7813C87.0704 54.6574 89.8999 55.5897 93.3089 55.5783C97.5379 55.5783 100.791 54.1235 103.067 51.214C104.412 49.426 105.372 47.3793 105.887 45.2024H106.27L107.723 54.7546H117.275V30.5651C117.275 25.5659 115.958 21.6936 113.323 18.948C110.688 16.2024 106.409 14.8297 100.487 14.8297ZM103.828 44.6475C102.312 45.9116 100.327 46.5408 97.8562 46.5408C95.8199 46.5408 94.4052 46.1843 93.6121 45.4712C93.2256 45.1338 92.9182 44.7155 92.7116 44.246C92.505 43.7764 92.4043 43.2671 92.4166 42.7543C92.3941 42.2706 92.4702 41.7874 92.6403 41.3341C92.8104 40.8808 93.071 40.4668 93.4062 40.1174C93.7687 39.7774 94.1964 39.5145 94.6633 39.3444C95.1303 39.1743 95.6269 39.1006 96.1231 39.1278H106.093V39.7856C106.113 40.7154 105.919 41.6374 105.527 42.4804C105.134 43.3234 104.553 44.0649 103.828 44.6475Z" fill="#86735E"></path>
                <path d="M39.0441 45.2253H0V54.789H39.0441V45.2253Z" fill="#C2474A"></path>
              </svg>
            </div>
            <h1 class="register-title">建立新帳戶</h1>
            <p class="register-subtitle">加入 TW_Zapier，開始您的自動化之旅</p>
          </div>
        </template>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <BaseInput
                v-model="form.firstName"
                label="名字"
                type="text"
                placeholder="請輸入您的名字"
                required
                :error="errors.firstName"
                :disabled="isLoading"
                autocomplete="given-name"
                @blur="validateField('firstName')"
              />
            </div>
            
            <div class="form-group">
              <BaseInput
                v-model="form.lastName"
                label="姓氏"
                type="text"
                placeholder="請輸入您的姓氏"
                required
                :error="errors.lastName"
                :disabled="isLoading"
                autocomplete="family-name"
                @blur="validateField('lastName')"
              />
            </div>
          </div>

          <div class="form-group">
            <BaseInput
              v-model="form.email"
              label="電子郵件"
              type="email"
              placeholder="請輸入您的電子郵件"
              required
              :error="errors.email"
              :disabled="isLoading"
              autocomplete="email"
              @blur="validateField('email')"
            />
          </div>

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
              autocomplete="new-password"
              @blur="validateField('password')"
            />
            
            <!-- 密碼強度指示器 -->
            <div v-if="form.password" class="password-strength">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="`strength-${passwordStrength.level}`"
                  :style="{ width: `${passwordStrength.percentage}%` }"
                ></div>
              </div>
              <span class="strength-text" :class="`strength-${passwordStrength.level}`">
                {{ passwordStrength.text }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <BaseInput
              v-model="form.confirmPassword"
              label="確認密碼"
              type="password"
              placeholder="請再次輸入您的密碼"
              required
              :error="errors.confirmPassword"
              :disabled="isLoading"
              :show-password-toggle="true"
              autocomplete="new-password"
              @blur="validateField('confirmPassword')"
            />
          </div>

          <div class="form-group">
            <label class="terms-agreement">
              <input
                v-model="form.agreeToTerms"
                type="checkbox"
                required
                :disabled="isLoading"
              />
              <span class="checkmark"></span>
              我同意
              <a href="/terms" target="_blank" class="terms-link">服務條款</a>
              和
              <a href="/privacy" target="_blank" class="terms-link">隱私政策</a>
            </label>
          </div>

          <!-- 錯誤訊息顯示 -->
          <div v-if="errors.general" class="error-message">
            {{ errors.general }}
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
              建立帳戶
            </BaseButton>
          </div>

          <div class="form-footer">
            <p class="login-prompt">
              已經有帳戶了？
              <router-link to="/login" class="login-link">
                立即登入
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
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()

// 表單狀態
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  general: ''
})

const isLoading = ref(false)

// 密碼強度計算
const passwordStrength = computed(() => {
  const password = form.password
  if (!password) return { level: 'none', percentage: 0, text: '' }
  
  let score = 0
  let feedback = []
  
  // 長度檢查
  if (password.length >= 8) score += 25
  else feedback.push('至少8個字元')
  
  // 包含數字
  if (/\d/.test(password)) score += 25
  else feedback.push('包含數字')
  
  // 包含小寫字母
  if (/[a-z]/.test(password)) score += 25
  else feedback.push('包含小寫字母')
  
  // 包含大寫字母或特殊字元
  if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 25
  else feedback.push('包含大寫字母或特殊字元')
  
  let level = 'weak'
  let text = '弱'
  
  if (score >= 75) {
    level = 'strong'
    text = '強'
  } else if (score >= 50) {
    level = 'medium'
    text = '中等'
  } else if (score >= 25) {
    level = 'weak'
    text = '弱'
  }
  
  return { level, percentage: score, text }
})

// 表單驗證
const isFormValid = computed(() => {
  return form.firstName.trim() !== '' &&
         form.lastName.trim() !== '' &&
         form.email.trim() !== '' &&
         form.username.trim() !== '' &&
         form.password.trim() !== '' &&
         form.confirmPassword.trim() !== '' &&
         form.agreeToTerms &&
         !Object.values(errors).some(error => error !== '')
})

// 驗證函數
const validateField = (field: keyof typeof form) => {
  errors[field as keyof typeof errors] = ''
  
  switch (field) {
    case 'firstName':
      if (!form.firstName.trim()) {
        errors.firstName = '請輸入名字'
      }
      break
      
    case 'lastName':
      if (!form.lastName.trim()) {
        errors.lastName = '請輸入姓氏'
      }
      break
      
    case 'email':
      if (!form.email.trim()) {
        errors.email = '請輸入電子郵件'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = '請輸入有效的電子郵件格式'
      }
      break
      
    case 'username':
      if (!form.username.trim()) {
        errors.username = '請輸入帳號'
      } else if (form.username.length < 3) {
        errors.username = '帳號至少需要3個字元'
      } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
        errors.username = '帳號只能包含字母、數字和底線'
      }
      break
      
    case 'password':
      if (!form.password.trim()) {
        errors.password = '請輸入密碼'
      } else if (form.password.length < 6) {
        errors.password = '密碼至少需要6個字元'
      }
      // 重新驗證確認密碼
      if (form.confirmPassword) {
        validateField('confirmPassword')
      }
      break
      
    case 'confirmPassword':
      if (!form.confirmPassword.trim()) {
        errors.confirmPassword = '請確認密碼'
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = '密碼不一致'
      }
      break
  }
}

// 提交處理
const handleSubmit = async () => {
  // 清除之前的錯誤
  errors.general = ''

  // 驗證所有欄位
  Object.keys(form).forEach(field => {
    if (field !== 'agreeToTerms') {
      validateField(field as keyof typeof form)
    }
  })

  if (!isFormValid.value) {
    return
  }

  isLoading.value = true

  try {
    // 準備註冊數據，轉換為後端期望的格式
    const registerData = {
      email: form.email,
      password: form.password,
      full_name: `${form.firstName} ${form.lastName}`.trim()
    }

    console.log('發送註冊請求:', registerData)

    // 調用註冊 API
    const response = await fetch('http://localhost:8000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData)
    })

    const result = await response.json()

    if (response.ok) {
      console.log('註冊成功:', result)
      // 導向登入頁面
      router.push('/login?message=註冊成功，請登入您的帳戶')
    } else {
      // 處理錯誤回應
      console.error('註冊失敗:', result)
      errors.general = result.detail || result.message || '註冊失敗，請稍後再試'
    }
  } catch (error) {
    console.error('註冊請求錯誤:', error)
    errors.general = '網路錯誤，請檢查您的網路連線'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.register-container {
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 10;
}

.register-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.register-header {
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

.register-title {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #374151;
}

.register-subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

/* 密碼強度指示器 */
.password-strength {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.strength-weak {
  background: #ef4444;
}

.strength-fill.strength-medium {
  background: #f59e0b;
}

.strength-fill.strength-strong {
  background: #10b981;
}

.strength-text {
  font-size: 12px;
  font-weight: 500;
  min-width: 30px;
}

.strength-text.strength-weak {
  color: #ef4444;
}

.strength-text.strength-medium {
  color: #f59e0b;
}

.strength-text.strength-strong {
  color: #10b981;
}

/* 條款同意 */
.terms-agreement {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
}

.terms-agreement input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 3px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.terms-agreement input[type="checkbox"]:checked + .checkmark {
  background-color: #86735E;
  border-color: #86735E;
}

.terms-agreement input[type="checkbox"]:checked + .checkmark::after {
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

.terms-link {
  color: #86735E;
  text-decoration: none;
  transition: color 0.2s ease;
}

.terms-link:hover {
  color: #7a6654;
  text-decoration: underline;
}

/* 錯誤訊息 */
.error-message {
  padding: 12px 16px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 16px;
}

.form-actions {
  margin-top: 8px;
}

.form-footer {
  text-align: center;
  margin-top: 8px;
}

.login-prompt {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.login-link {
  color: #86735E;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.login-link:hover {
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
  .register-page {
    padding: 16px;
  }
  
  .register-container {
    max-width: 100%;
  }
  
  .register-title {
    font-size: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .password-strength {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .strength-bar {
    width: 100%;
  }
}

/* 無障礙設計 */
@media (prefers-reduced-motion: reduce) {
  .decoration-circle {
    animation: none;
  }
  
  .strength-fill {
    transition: none;
  }
}

/* 高對比模式 */
@media (prefers-contrast: high) {
  .register-card {
    background: white;
    border: 2px solid #000;
  }
  
  .checkmark {
    border-width: 3px;
  }
  
  .strength-bar {
    border: 1px solid #000;
  }
}
</style>
