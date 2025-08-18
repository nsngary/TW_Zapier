<template>
  <div class="not-found-view">
    <div class="not-found-content">
      <div class="error-illustration">
        <el-icon size="120" color="#d9d9d9">
          <Warning />
        </el-icon>
      </div>
      
      <div class="error-info">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">頁面不存在</h2>
        <p class="error-description">
          抱歉，您訪問的頁面不存在或已被移除。
        </p>
        
        <div class="error-actions">
          <el-button type="primary" @click="goHome">
            <el-icon><House /></el-icon>
            回到首頁
          </el-button>
          <el-button @click="goBack">
            <el-icon><Back /></el-icon>
            返回上頁
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Warning, House, Back } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped lang="scss">
.not-found-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  padding: 48px 24px;
}

.error-illustration {
  margin-bottom: 32px;
}

.error-info {
  .error-code {
    font-size: 72px;
    font-weight: 700;
    color: #d9d9d9;
    margin: 0 0 16px 0;
    line-height: 1;
  }

  .error-title {
    font-size: 24px;
    font-weight: 600;
    color: #262626;
    margin: 0 0 16px 0;
  }

  .error-description {
    font-size: 16px;
    color: #8c8c8c;
    margin: 0 0 32px 0;
    line-height: 1.5;
  }

  .error-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
