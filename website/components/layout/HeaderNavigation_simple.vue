<template>
  <div class="bg-white">
    <header class="border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- 左側：Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center gap-2">
              <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">TW</span>
              </div>
              <span class="text-xl font-bold text-neutral-900">TW Zapier</span>
            </NuxtLink>
          </div>

          <!-- 中間：主導航選單 (桌面版) -->
          <nav class="hidden lg:flex items-center space-x-8" role="navigation">
            <!-- Products 下拉選單 - 使用 details/summary 方法 -->
            <div class="relative">
              <details class="nav-dropdown" data-testid="nav-dropdown">
                <summary class="flex items-center gap-1 text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2 cursor-pointer list-none">
                  產品功能
                  <svg class="w-4 h-4 transition-transform details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <!-- 簡化的下拉選單 -->
                <div class="submenu-root absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-7xl bg-white shadow-xl border border-neutral-200 z-50">
                  <div class="submenu-main flex">
                    <div class="submenu-main-content flex-1 p-8">
                      <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">核心功能</h4>
                      <div class="space-y-3">
                        <NuxtLink to="/workflows" class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                          <h5 class="font-medium text-neutral-900 transition-colors">工作流程自動化</h5>
                          <p class="text-sm text-neutral-600">建立智能化的業務流程</p>
                        </NuxtLink>
                        <NuxtLink to="/integrations" class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                          <h5 class="font-medium text-neutral-900 transition-colors">台灣服務整合</h5>
                          <p class="text-sm text-neutral-600">連接本土化應用程式</p>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>

            <!-- Solutions 下拉選單 -->
            <div class="relative">
              <details class="nav-dropdown" data-testid="nav-dropdown">
                <summary class="flex items-center gap-1 text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2 cursor-pointer list-none">
                  解決方案
                  <svg class="w-4 h-4 transition-transform details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div class="submenu-root absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-7xl bg-white shadow-xl border border-neutral-200 z-50">
                  <div class="submenu-main flex">
                    <div class="submenu-main-content flex-1 p-8">
                      <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">行業解決方案</h4>
                      <div class="space-y-3">
                        <NuxtLink to="/ecommerce" class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                          <h5 class="font-medium text-neutral-900 transition-colors">電商自動化</h5>
                          <p class="text-sm text-neutral-600">整合台灣電商平台</p>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>

            <!-- Resources 下拉選單 -->
            <div class="relative">
              <details class="nav-dropdown" data-testid="nav-dropdown">
                <summary class="flex items-center gap-1 text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2 cursor-pointer list-none">
                  資源中心
                  <svg class="w-4 h-4 transition-transform details-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div class="submenu-root absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-5xl bg-white shadow-xl border border-neutral-200 z-50">
                  <div class="submenu-main p-8">
                    <div class="grid grid-cols-3 gap-8">
                      <div>
                        <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">學習資源</h4>
                        <div class="space-y-3">
                          <NuxtLink to="/docs" class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                            <h5 class="font-medium text-neutral-900 transition-colors">開發文件</h5>
                            <p class="text-sm text-neutral-600">完整的 API 文件</p>
                          </NuxtLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>

            <!-- 企業版 -->
            <NuxtLink to="/enterprise" class="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
              企業版
            </NuxtLink>

            <!-- 定價方案 -->
            <NuxtLink to="/pricing" class="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
              定價方案
            </NuxtLink>
          </nav>

          <!-- 右側：CTA 按鈕 -->
          <div class="flex items-center gap-4">
            <NuxtLink to="/login" class="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
              登入
            </NuxtLink>
            <NuxtLink to="/signup" class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              免費註冊
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
// 簡化版本，專注於修復 HTML 結構
</script>

<style scoped>
/* Details/Summary 下拉選單樣式 - 基於 Zapier 官方實現 */

/* 移除 summary 的預設樣式 */
.nav-dropdown summary {
  list-style: none;
}

.nav-dropdown summary::-webkit-details-marker {
  display: none;
}

/* 下拉選單根容器 */
.submenu-root {
  display: none;
}

/* 當 details 開啟時顯示下拉選單 */
.nav-dropdown[open] .submenu-root {
  display: block;
  animation: slideDown 0.2s ease-out;
}

/* 下拉動畫 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* 箭頭旋轉動畫 */
.nav-dropdown[open] summary svg {
  transform: rotate(180deg);
}

.nav-dropdown summary svg {
  transition: transform 0.2s ease-in-out;
}

/* 修復懸停效果 */
.group-item:hover h5 {
  color: #86735E;
}

/* 響應式設計 */
@media (max-width: 1023px) {
  .nav-dropdown .submenu-root {
    display: none !important;
  }
}

/* 無障礙設計 */
.nav-dropdown summary:focus {
  outline: 2px solid #86735E;
  outline-offset: 2px;
}

.nav-dropdown summary {
  transition: color 0.2s ease-in-out;
  cursor: pointer;
  user-select: none;
}
</style>
