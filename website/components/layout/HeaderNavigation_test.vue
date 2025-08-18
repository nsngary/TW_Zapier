<template>
  <div class="header-wrapper">
    <!-- 頂部公告橫幅 (模仿 Zapier 的 ZapConnect 2025 橫幅) -->
    <div v-if="showBanner"
      class="bg-gradient-to-r from-primary-500 to-accent-red text-white text-center py-3 px-4 relative">
      <div class="flex items-center justify-center gap-2 text-sm font-medium">
        <span class="text-lg">⚡️</span>
        <span>從構想到實現—看看 AI 在 TW_Connect 2025 能做什麼。</span>
        <NuxtLink to="/tw-connect" class="underline hover:no-underline font-semibold ml-2">
          立即報名
        </NuxtLink>
      </div>
      <button @click="closeBanner"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
        aria-label="關閉橫幅">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 主要 Header -->
    <header class="bg-white sticky top-0 z-50 border-b border-neutral-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- 左側：Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center gap-3 group mr-8" aria-label="TW_Zapier 首頁">
              <!-- Logo SVG -->
              <svg class="w-8 h-8 text-primary-500 group-hover:text-primary-600 transition-colors" viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M8 4h16v4H12v8h12v4H8V4z" />
                <path d="M24 28H8v-4h12v-8H8v-4h16v16z" />
                <circle cx="16" cy="16" r="2" />
              </svg>
              <span class="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                TW_Zapier
              </span>
            </NuxtLink>
          </div>

          <!-- 中間：主導航選單 (桌面版) - 使用 Zapier 官方 ul/li 架構 -->
          <div class="hidden lg:block">
            <nav role="navigation">
              <ul class="flex items-center space-x-8">
                <!-- Products 下拉選單 -->
                <li class="relative">
                  <a href="#"
                    class="flex items-center gap-1 text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2">
                    <span>產品功能</span>
                  </a>
                  <details class="nav-dropdown" data-testid="nav-dropdown">
                    <summary class="absolute inset-0 opacity-0 cursor-pointer list-none">產品功能</summary>
                    <!-- 修復後的全寬度下拉選單 - 基於 Playwright 分析結果 -->
                    <div
                      class="submenu-root fixed top-16 left-0 w-full max-w-screen-xl bg-white shadow-xl border border-neutral-200 z-50">
                      <div class="submenu-main flex">
                        <!-- 主要內容區 -->
                        <div class="submenu-main-content flex-1 p-8">
                          <div class="mb-6">
                            <h3 class="text-lg font-semibold text-neutral-900 mb-2">TW_Zapier 自動化平台</h3>
                            <p class="text-sm text-neutral-600">無程式碼自動化，整合 7,000+ 應用程式</p>
                          </div>

                          <!-- 產品區塊 -->
                          <div class="mb-8">
                            <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">產品</h4>
                            <div class="grid grid-cols-2 gap-4">
                              <NuxtLink to="/workflows"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 256 256">
                                    <path
                                      d="M245.66,85.66l-32,32a8,8,0,0,1-11.32-11.32L220.69,88H208c-38.67,0-46.59,19-56.62,43.08C141.05,155.88,129.33,184,80,184H79a32,32,0,1,1,0-16h1c38.67,0,46.59-19,56.62-43.08C147,100.12,158.67,72,208,72h12.69L202.34,53.66a8,8,0,0,1,11.32-11.32l32,32A8,8,0,0,1,245.66,85.66Z">
                                    </path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">工作流程</h5>
                                  <p class="text-sm text-neutral-600">DIY 自動化工作流程</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/tables"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.9978H21.0022V7.49897H12V2.9978Z"></path>
                                    <path d="M12 7.49897L2.99756 7.4989V12.0001H11.9997L12 7.49897Z"></path>
                                    <path d="M11.9997 12.0001L21.0022 12V16.5012H12L11.9997 12.0001Z"></path>
                                    <path d="M2.99756 16.5011L12 16.5012L11.9997 21.0023H2.99756V16.5011Z"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">資料表</h5>
                                  <p class="text-sm text-neutral-600">為工作流程設計的資料庫</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/interfaces"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                      d="M7.49989 7.50049V16.5001L16.4999 16.5001V21H3.00022L3 3H20.9999V16.5001L16.4999 16.5001L16.5 7.50049L7.49989 7.50049Z">
                                    </path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">介面</h5>
                                  <p class="text-sm text-neutral-600">自訂頁面驅動您的工作流程</p>
                                </div>
                              </NuxtLink>
                            </div>
                          </div>

                          <!-- 功能區塊 -->
                          <div class="mb-6">
                            <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">功能</h4>
                            <div class="grid grid-cols-2 gap-4">
                              <NuxtLink to="/apps"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                                    <path d="M2 17L12 22L22 17"></path>
                                    <path d="M2 12L12 17L22 12"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">應用程式整合</h5>
                                  <p class="text-sm text-neutral-600">探索 7,000+ 應用程式連接</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/ai"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span class="text-lg">🪄</span>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">AI 自動化</h5>
                                  <p class="text-sm text-neutral-600">尖端 AI 升級您的工作流程</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/security-compliance"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z">
                                    </path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">安全性</h5>
                                  <p class="text-sm text-neutral-600">企業級安全保障</p>
                                </div>
                              </NuxtLink>
                            </div>
                          </div>

                          <!-- 底部連結 -->
                          <div class="flex gap-6 text-sm">
                            <NuxtLink to="/templates" class="text-primary-500 hover:text-primary-600 font-medium">探索範本
                            </NuxtLink>
                            <NuxtLink to="/use-cases" class="text-primary-500 hover:text-primary-600 font-medium">探索使用案例
                            </NuxtLink>
                            <NuxtLink to="/early-access" class="text-primary-500 hover:text-primary-600 font-medium">
                              加入搶先體驗</NuxtLink>
                          </div>
                        </div>

                        <!-- 右側邊欄 -->
                        <div class="w-80 bg-neutral-50 p-8">
                          <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">最新功能</h4>
                          <div class="space-y-4">
                            <NuxtLink to="/canvas"
                              class="group-item block p-3 rounded-lg hover:bg-white transition-colors">
                              <div class="flex items-center gap-2 mb-1">
                                <h5 class="font-medium text-neutral-900 transition-colors">Canvas</h5>
                                <span class="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">Beta</span>
                              </div>
                              <p class="text-sm text-neutral-600">使用 AI 規劃和映射您的工作流程</p>
                            </NuxtLink>

                            <NuxtLink to="/ai/chatbot"
                              class="group-item block p-3 rounded-lg hover:bg-white transition-colors">
                              <div class="flex items-center gap-2 mb-1">
                                <h5 class="font-medium text-neutral-900 transition-colors">聊天機器人</h5>
                                <span class="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">Beta</span>
                              </div>
                              <p class="text-sm text-neutral-600">使用 AI 聊天機器人回答客戶問題</p>
                            </NuxtLink>

                            <NuxtLink to="/agents"
                              class="group-item block p-3 rounded-lg hover:bg-white transition-colors">
                              <div class="flex items-center gap-2 mb-1">
                                <h5 class="font-medium text-neutral-900 transition-colors">AI 代理</h5>
                                <span class="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">Beta</span>
                              </div>
                              <p class="text-sm text-neutral-600">為任何任務創建您自己的 AI 助手</p>
                            </NuxtLink>

                            <NuxtLink to="/functions"
                              class="group-item block p-3 rounded-lg hover:bg-white transition-colors">
                              <div class="flex items-center gap-2 mb-1">
                                <h5 class="font-medium text-neutral-900 transition-colors">函數</h5>
                                <span class="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">Beta</span>
                              </div>
                              <p class="text-sm text-neutral-600">在網頁 IDE 中編寫您的工作流程</p>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <!-- Solutions 下拉選單 -->
                <li class="relative">
                  <a href="#"
                    class="flex items-center gap-1 text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2">
                    <span>解決方案</span>
                  </a>
                  <details class="nav-dropdown" data-testid="nav-dropdown">
                    <summary class="absolute inset-0 opacity-0 cursor-pointer list-none">解決方案</summary>
                    <!-- 修復後的全寬度下拉選單 -->
                    <div
                      class="submenu-root fixed top-16 left-0 w-full max-w-screen-xl bg-white shadow-xl border border-neutral-200 z-50">
                      <div class="submenu-main flex">
                        <!-- 主要內容區 -->
                        <div class="submenu-main-content flex-1 p-8">
                          <!-- By Team 區塊 -->
                          <div class="mb-8">
                            <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">依團隊分類</h4>
                            <div class="grid grid-cols-2 gap-4">
                              <NuxtLink to="/solutions/marketing"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">行銷團隊</h5>
                                  <p class="text-sm text-neutral-600">提升行銷活動效果和 ROI</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/sales"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                      d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L20.29 9.12L22 10.83V6H16Z">
                                    </path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">業務團隊</h5>
                                  <p class="text-sm text-neutral-600">成交更多交易</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/it"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                      d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16Z">
                                    </path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">IT 團隊</h5>
                                  <p class="text-sm text-neutral-600">透過自動化更好地管理系統</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/hr"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <div
                                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                      d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12S12 10.2 12 8S13.8 4 16 4ZM16 14C20.4 14 24 15.8 24 18V20H8V18C8 15.8 11.6 14 16 14ZM12.5 11.5C12.8 11.8 13.1 12 13.5 12.1C12.6 12.8 12 13.9 12 15.1V16H2V15C2 13.3 4.7 12 8 12C9.5 12 10.9 12.3 12 12.9C12.2 12.4 12.6 11.9 12.5 11.5ZM8 4C9.7 4 11 5.3 11 7S9.7 10 8 10S5 8.7 5 7S6.3 4 8 4Z">
                                    </path>
                                  </svg>
                                </div>
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">人資團隊</h5>
                                  <p class="text-sm text-neutral-600">簡化招聘和員工管理流程</p>
                                </div>
                              </NuxtLink>
                            </div>
                          </div>

                          <!-- By App 區塊 -->
                          <div class="mb-6">
                            <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">依應用程式分類</h4>
                            <div class="grid grid-cols-3 gap-4">
                              <NuxtLink to="/solutions/salesforce"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <img src="/images/salesforce_logo.avif" alt="Salesforce"
                                  class="w-6 h-6 object-contain flex-shrink-0 mt-1">
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">Salesforce</h5>
                                  <p class="text-sm text-neutral-600">自動化您的 CRM 工作流程</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/hubspot"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <img src="/images/hubspot_logo.png" alt="HubSpot"
                                  class="w-6 h-6 object-contain flex-shrink-0 mt-1">
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">HubSpot</h5>
                                  <p class="text-sm text-neutral-600">整合行銷和銷售流程</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/slack"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <img src="/images/slack_logo.png" alt="Slack"
                                  class="w-6 h-6 object-contain flex-shrink-0 mt-1">
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">Slack</h5>
                                  <p class="text-sm text-neutral-600">自動化團隊溝通</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/microsoft-teams"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <img src="/images/microsoft-teams_logo.avif" alt="Microsoft Teams"
                                  class="w-6 h-6 object-contain flex-shrink-0 mt-1">
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">Microsoft Teams</h5>
                                  <p class="text-sm text-neutral-600">提升協作效率</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/jira"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <img src="/images/jira_logo.png" alt="Jira"
                                  class="w-6 h-6 object-contain flex-shrink-0 mt-1">
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">Jira</h5>
                                  <p class="text-sm text-neutral-600">自動化專案管理</p>
                                </div>
                              </NuxtLink>

                              <NuxtLink to="/solutions/zendesk"
                                class="group-item flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                                <img src="/images/zendesk_logo.png" alt="Zendesk"
                                  class="w-6 h-6 object-contain flex-shrink-0 mt-1">
                                <div>
                                  <h5 class="font-medium text-neutral-900 transition-colors">Zendesk</h5>
                                  <p class="text-sm text-neutral-600">優化客戶服務</p>
                                </div>
                              </NuxtLink>
                            </div>
                          </div>

                          <!-- 底部連結 -->
                          <div class="flex gap-6 text-sm">
                            <NuxtLink to="/solutions" class="text-primary-500 hover:text-primary-600 font-medium">
                              查看所有解決方案</NuxtLink>
                            <NuxtLink to="/case-studies" class="text-primary-500 hover:text-primary-600 font-medium">
                              客戶案例</NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <!-- Resources 下拉選單 -->
                <li class="relative">
                  <a href="#"
                    class="flex items-center gap-1 text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2">
                    <span>資源中心</span>
                  </a>
                  <details class="nav-dropdown" data-testid="nav-dropdown">
                    <summary class="absolute inset-0 opacity-0 cursor-pointer list-none">資源中心</summary>
                    <!-- 修復後的全寬度下拉選單 -->
                    <div
                      class="submenu-root fixed top-16 left-0 w-full max-w-screen-lg bg-white shadow-xl border border-neutral-200 z-50">
                      <div class="submenu-main p-8">
                        <div class="grid grid-cols-3 gap-8">
                          <!-- 學習資源 -->
                          <div>
                            <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">學習資源</h4>
                            <div class="space-y-3">
                              <NuxtLink to="/blog"
                                class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                                <h5 class="font-medium text-neutral-900 transition-colors">部落格</h5>
                                <p class="text-sm text-neutral-600">閱讀應用程式和自動化相關文章</p>
                              </NuxtLink>
                              <NuxtLink to="/templates"
                                class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                                <h5 class="font-medium text-neutral-900 transition-colors">範本庫</h5>
                                <p class="text-sm text-neutral-600">快速開始的預建範本</p>
                              </NuxtLink>
                              <NuxtLink to="/webinars"
                                class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                                <h5 class="font-medium text-neutral-900 transition-colors">網路研討會</h5>
                                <p class="text-sm text-neutral-600">參加即時和錄製的研討會</p>
                              </NuxtLink>
                            </div>
                          </div>
                        </div>
                        <!-- 支援 -->
                        <div>
                          <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">支援</h4>
                          <div class="space-y-3">
                            <NuxtLink to="/help"
                              class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                              <h5 class="font-medium text-neutral-900 transition-colors">說明中心</h5>
                              <p class="text-sm text-neutral-600">尋找問題的答案</p>
                            </NuxtLink>
                            <NuxtLink to="/community"
                              class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                              <h5 class="font-medium text-neutral-900 transition-colors">社群論壇</h5>
                              <p class="text-sm text-neutral-600">與其他用戶交流經驗</p>
                            </NuxtLink>
                            <NuxtLink to="/contact"
                              class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                              <h5 class="font-medium text-neutral-900 transition-colors">聯絡我們</h5>
                              <p class="text-sm text-neutral-600">獲得專業支援</p>
                            </NuxtLink>
                          </div>
                        </div>

                        <!-- 公司 -->
                        <div>
                          <h4 class="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wide">公司</h4>
                          <div class="space-y-3">
                            <NuxtLink to="/about"
                              class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                              <h5 class="font-medium text-neutral-900 transition-colors">關於我們</h5>
                              <p class="text-sm text-neutral-600">了解 TW_Zapier 的故事</p>
                            </NuxtLink>
                            <NuxtLink to="/careers"
                              class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                              <h5 class="font-medium text-neutral-900 transition-colors">職涯機會</h5>
                              <p class="text-sm text-neutral-600">加入我們的團隊</p>
                            </NuxtLink>
                            <NuxtLink to="/press"
                              class="group-item block p-2 rounded-lg hover:bg-neutral-50 transition-colors">
                              <h5 class="font-medium text-neutral-900 transition-colors">媒體中心</h5>
                              <p class="text-sm text-neutral-600">最新新聞和資源</p>
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>
                </li>

                <!-- 企業版 -->
                <li>
                  <NuxtLink to="/enterprise"
                    class="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2">
                    <span>企業版</span>
                  </NuxtLink>
                </li>

                <!-- 定價方案 -->
                <li>
                  <NuxtLink to="/pricing"
                    class="text-neutral-700 hover:text-primary-500 font-medium transition-colors py-2">
                    <span>定價方案</span>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>

          <!-- 右側：CTA 按鈕 -->
          <div class="flex items-center gap-4">
            <div class="hidden lg:flex items-center gap-4">
              <NuxtLink to="/apps" class="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
                探索應用程式
              </NuxtLink>
              <NuxtLink to="/contact-sales"
                class="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
                聯絡銷售
              </NuxtLink>
              <NuxtLink to="/login" class="text-neutral-700 hover:text-primary-500 font-medium transition-colors">
                登入
              </NuxtLink>
              <NuxtLink to="/sign-up"
                class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                免費註冊
              </NuxtLink>
            </div>

            <!-- 行動版選單按鈕 -->
            <button @click="toggleMobileMenu"
              class="lg:hidden p-2 text-neutral-700 hover:text-primary-500 transition-colors" aria-label="開啟選單">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 響應式狀態
const showBanner = ref(true)
const mobileMenuOpen = ref(false)

// 事件處理函數
const closeBanner = () => {
  showBanner.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 點擊外部關閉選單
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.group') && !target.closest('[data-mobile-menu]')) {
    mobileMenuOpen.value = false
  }
}

// 鍵盤導航支援
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    mobileMenuOpen.value = false
  }
}

// 生命週期
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Details/Summary 下拉選單樣式 - 基於 Zapier 官方實現和 Playwright 分析 */

/* 移除 summary 的預設樣式 */
.nav-dropdown summary {
  list-style: none;
}

.nav-dropdown summary::-webkit-details-marker {
  display: none;
}

/* 下拉選單根容器 - 基於 Playwright 分析的 Zapier 定位策略 */
.submenu-root {
  /* 預設隱藏 */
  display: none;
  /* 基於分析：Zapier 使用 position: absolute, top: 56px, left: 0px */
  position: fixed;
  top: 64px;
  /* header 高度 */
  left: 0;
  width: 100vw;
  max-width: 1280px;
  /* 與 Zapier 一致 */
  margin: 0 auto;
  /* 居中對齊 */
  left: 50%;
  transform: translateX(-50%);
}

/* 當 details 開啟時顯示下拉選單 */
.nav-dropdown[open] .submenu-root {
  display: block;
  animation: slideDown 0.2s ease-out;
}

/* 下拉動畫 - 移除 translateX 避免衝突 */
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

/* 響應式設計 - 基於 Playwright 分析優化 */
@media (min-width: 1280px) {
  .submenu-root {
    max-width: 1280px;
    /* 與 Zapier 一致 */
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .submenu-root {
    max-width: 1024px;
  }
}

/* 小螢幕：隱藏下拉選單，使用行動版選單 */
@media (max-width: 1023px) {
  .nav-dropdown .submenu-root {
    display: none !important;
  }
}

/* ul/li 架構樣式 */
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav li {
  position: relative;
}

/* 確保下拉選單在最上層 */
.submenu-root {
  z-index: 50;
}

/* 主要內容區域樣式 - 模仿 Zapier 的結構 */
/* .submenu-main 和 .submenu-main-content 類名保留供未來擴展使用 */

/* 無障礙設計：鍵盤導航支援 */
.nav-dropdown summary:focus {
  outline: 2px solid #86735E;
  outline-offset: 2px;
}

/* 平滑的懸停過渡效果 */
.nav-dropdown summary {
  transition: color 0.2s ease-in-out;
}

/* 點擊區域優化 */
.nav-dropdown summary {
  cursor: pointer;
  user-select: none;
}

/* 防止文字選取 */
.nav-dropdown summary * {
  pointer-events: none;
}

.nav-dropdown summary {
  pointer-events: auto;
}
</style>
