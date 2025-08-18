<template>
  <div class="home-view">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <div class="logo">
            <el-icon size="32" color="#1890ff">
              <Setting />
            </el-icon>
            <h1>台灣在地化流程自動化平台</h1>
          </div>
          <div class="header-actions">
            <el-button @click="navigateToLogin">
              登入
            </el-button>
            <el-button type="primary" @click="navigateToRegister">
              註冊
            </el-button>
            <el-button type="primary" @click="navigateToWorkflows">
              <el-icon><Plus /></el-icon>
              建立工作流程
            </el-button>
            <el-button type="success" @click="navigateToColorSystem">
              <el-icon><Brush /></el-icon>
              配色系統
            </el-button>
          </div>
        </div>
      </el-header>

      <el-main class="main-content">
        <div class="welcome-section">
          <div class="welcome-card">
            <el-card shadow="hover">
              <template #header>
                <div class="card-header">
                  <span>歡迎使用台灣在地化流程自動化平台</span>
                </div>
              </template>
              <div class="welcome-content">
                <p>這是專為台灣在地服務設計的流程自動化平台，整合了：</p>
                <ul class="space-y-3">
                  <li class="flex items-center gap-3">
                    <el-icon class="text-primary-500"><CreditCard /></el-icon>
                    台灣金流服務（Line Pay、綠界科技、藍新金流等）
                  </li>
                  <li class="flex items-center gap-3">
                    <el-icon class="text-primary-500"><OfficeBuilding /></el-icon>
                    政府開放資料（桃機航班、氣象局、健保署等）
                  </li>
                  <li class="flex items-center gap-3">
                    <el-icon class="text-primary-500"><ShoppingCart /></el-icon>
                    電商平台（蝦皮、momo、PChome等）
                  </li>
                  <li class="flex items-center gap-3">
                    <el-icon class="text-primary-500"><Box /></el-icon>
                    物流服務（黑貓宅急便、新竹物流等）
                  </li>
                </ul>
              </div>
            </el-card>
          </div>
        </div>

        <div class="stats-section">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon">
                    <el-icon size="24" color="#52c41a">
                      <Document />
                    </el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-number">{{ stats.totalWorkflows }}</div>
                    <div class="stat-label">工作流程</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon">
                    <el-icon size="24" color="#1890ff">
                      <Operation />
                    </el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-number">{{ stats.totalExecutions }}</div>
                    <div class="stat-label">執行次數</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon">
                    <el-icon size="24" color="#faad14">
                      <Timer />
                    </el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-number">{{ stats.avgExecutionTime }}ms</div>
                    <div class="stat-label">平均執行時間</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card class="stat-card">
                <div class="stat-content">
                  <div class="stat-icon">
                    <el-icon size="24" color="#722ed1">
                      <Connection />
                    </el-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-number">{{ stats.activeNodes }}</div>
                    <div class="stat-label">活躍節點</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div class="quick-actions">
          <h2>快速開始</h2>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-card class="action-card" @click="navigateToWorkflows">
                <div class="action-content">
                  <el-icon size="48" color="#1890ff">
                    <Document />
                  </el-icon>
                  <h3>管理工作流程</h3>
                  <p>查看、編輯和管理您的自動化工作流程</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="action-card" @click="navigateToNodes">
                <div class="action-content">
                  <el-icon size="48" color="#52c41a">
                    <Grid />
                  </el-icon>
                  <h3>瀏覽節點</h3>
                  <p>探索可用的台灣在地服務節點</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="action-card" @click="navigateToExecutions">
                <div class="action-content">
                  <el-icon size="48" color="#faad14">
                    <DataAnalysis />
                  </el-icon>
                  <h3>執行記錄</h3>
                  <p>查看工作流程的執行歷史和結果</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Setting,
  Plus,
  Document,
  Operation,
  Timer,
  Connection,
  Grid,
  DataAnalysis,
  Brush,
  CreditCard,
  OfficeBuilding,
  ShoppingCart,
  Box
} from '@element-plus/icons-vue'

const router = useRouter()

// 統計資料
const stats = ref({
  totalWorkflows: 0,
  totalExecutions: 0,
  avgExecutionTime: 0,
  activeNodes: 0
})

// 導航方法
const navigateToLogin = () => {
  router.push('/login')
}

const navigateToRegister = () => {
  router.push('/register')
}

const navigateToWorkflows = () => {
  router.push('/editor')
}

const navigateToColorSystem = () => {
  router.push('/color-system')
}

const navigateToNodes = () => {
  router.push('/nodes')
}

const navigateToExecutions = () => {
  router.push('/executions')
}

// 載入統計資料
const loadStats = async () => {
  // 模擬資料，實際應該從 API 取得
  stats.value = {
    totalWorkflows: 12,
    totalExecutions: 1847,
    avgExecutionTime: 245,
    activeNodes: 8
  }
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 0;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;

      h1 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #262626;
      }
    }
  }
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.welcome-section {
  margin-bottom: 32px;

  .welcome-card {
    .card-header {
      font-size: 18px;
      font-weight: 600;
    }

    .welcome-content {
      p {
        font-size: 16px;
        margin-bottom: 16px;
        color: #595959;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 8px 0;
          font-size: 14px;
          color: #595959;
        }
      }
    }
  }
}

.stats-section {
  margin-bottom: 32px;

  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;

      .stat-info {
        .stat-number {
          font-size: 24px;
          font-weight: 600;
          color: #262626;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          color: #8c8c8c;
        }
      }
    }
  }
}

.quick-actions {
  h2 {
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 600;
    color: #262626;
  }

  .action-card {
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    .action-content {
      text-align: center;
      padding: 24px;

      h3 {
        margin: 16px 0 8px 0;
        font-size: 18px;
        font-weight: 600;
        color: #262626;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #8c8c8c;
        line-height: 1.5;
      }
    }
  }
}
</style>
