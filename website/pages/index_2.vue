<template>
  <div class="homepage">
    <BackgroundTest />
    <!-- Hero Section -->
    <section id="hero" class="hero-section relative overflow-hidden"
      role="banner">
      <!-- 背景粒子容器 -->
      <div class="absolute inset-0 pointer-events-none"></div>

      <div class="container-custom relative z-10">
        <div class="text-center max-w-5xl mx-auto pt-20 pb-32">
          <!-- 主標題 -->
          <h1 class="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-8 leading-tight">
            TW_Zapier 台灣流程自動化平台
          </h1>

          <!-- 副標題 -->
          <p
            class="hero-subtitle text-xl md:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto text-pretty leading-relaxed">
            專為台灣企業量身打造的智能自動化解決方案，深度整合台灣金流服務、政府開放資料、交通資訊等在地化服務，讓您的業務流程更加高效智能。
          </p>
          <!-- CTA 按鈕組 -->
          <div class="flex flex-col gap-6 justify-center items-center mb-16">
            <!-- 主要 CTA -->
            <div class="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
              <!-- 電子郵件註冊 -->
              <div
                class="cta-button flex flex-col sm:flex-row gap-2 bg-white rounded-xl p-2 shadow-lg border border-neutral-200 hover-lift flex-1">
                <input type="email" placeholder="輸入您的電子郵件地址"
                  class="px-4 py-3 text-base border-0 rounded-lg focus:outline-none focus:ring-0 flex-1 min-w-0"
                  aria-label="電子郵件地址" />
                <BaseButton variant="primary" size="lg" class="cta-button whitespace-nowrap animate-pulse-soft">
                  免費開始使用
                </BaseButton>
              </div>
            </div>

            <!-- 次要 CTA 選項 -->
            <div class="flex flex-col sm:flex-row gap-4 items-center">
              <div class="text-neutral-500 text-sm">或選擇其他方式</div>
              <div class="flex gap-3">
                <!-- Google 登入 -->
                <BaseButton variant="secondary" size="base" class="cta-button flex items-center gap-2 hover-grow">
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </BaseButton>
                <!-- 企業方案諮詢 -->
                <BaseButton variant="outline" size="base" class="cta-button hover-grow">
                  企業方案諮詢
                </BaseButton>
              </div>
            </div>
          </div>

          <!-- 信任指標 -->
          <div class="text-center">
            <p class="trust-indicator text-sm text-neutral-500 mb-4">
              受到超過 <span class="font-semibold text-primary-600">1,000+</span> 家台灣企業信賴
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 opacity-70">
              <div class="trust-indicator flex items-center gap-2 text-xs text-neutral-400">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                14 天免費試用
              </div>
              <div class="trust-indicator flex items-center gap-2 text-xs text-neutral-400">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                無需信用卡
              </div>
              <div class="trust-indicator flex items-center gap-2 text-xs text-neutral-400">
                <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                台灣在地支援
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 背景裝飾 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- 主要背景光暈 -->
        <div
          class="hero-decoration absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl animate-gpu">
        </div>
        <div
          class="hero-decoration absolute -bottom-40 -left-40 w-80 h-80 bg-accent-tan/20 rounded-full blur-3xl animate-gpu">
        </div>

        <!-- 台灣特色裝飾元素 -->
        <div class="absolute top-20 left-20 w-32 h-32 opacity-10">
          <!-- 台灣島嶼輪廓裝飾 -->
          <svg viewBox="0 0 100 100" class="w-full h-full text-primary-300">
            <path fill="currentColor" d="M50 10 C70 15, 85 35, 80 55 C75 75, 55 85, 45 80 C25 75, 15 55, 20 35 C25 15, 45 10, 50 10 Z" opacity="1"/>
          </svg>
        </div>

        <div class="absolute bottom-32 right-32 w-24 h-24 opacity-10">
          <!-- 齒輪裝飾 (代表自動化) -->
          <svg viewBox="0 0 100 100" class="w-full h-full text-accent-red animate-spin-slow">
            <path fill="currentColor" d="M50 20 L60 30 L70 25 L75 35 L85 40 L80 50 L85 60 L75 65 L70 75 L60 70 L50 80 L40 70 L30 75 L25 65 L15 60 L20 50 L15 40 L25 35 L30 25 L40 30 Z" opacity="0.2"/>
            <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>

        <!-- 連接線裝飾 (代表流程連接) -->
        <div class="absolute top-1/2 left-1/4 w-48 h-1 bg-gradient-to-r from-primary-200/30 to-transparent transform -rotate-12"></div>
        <div class="absolute top-1/3 right-1/4 w-32 h-1 bg-gradient-to-l from-accent-red/30 to-transparent transform rotate-45"></div>
      </div>

      <!-- 滾動進度指示器 -->
      <div ref="scrollProgress" class="scroll-progress"></div>
    </section>

    <!-- 產品功能 Tab 展示區 -->
    <section id="product-features" class="section-padding" role="region" aria-labelledby="features-heading">
      <div class="container-custom">
        <!-- 區塊標題 -->
        <div class="text-center mb-16">
          <h2 id="features-heading" class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            為台灣企業量身打造的自動化解決方案
          </h2>
          <p class="text-xl text-neutral-600 max-w-4xl mx-auto text-pretty leading-relaxed">
            深度整合台灣本土服務，從金流處理到政府資料串接，讓您的業務流程更加智能高效
          </p>
        </div>

        <!-- Tab 導航 -->
        <div class="flex flex-wrap justify-center mb-12 border-b border-neutral-200">
          <button
            class="tab-button active px-6 py-4 text-lg font-medium border-b-2 border-primary-500 text-primary-600 transition-all duration-200"
            data-tab="workflows" role="tab" aria-selected="true" aria-controls="workflows-panel">
            AI 工作流程
          </button>
          <button
            class="tab-button px-6 py-4 text-lg font-medium border-b-2 border-transparent text-neutral-600 hover:text-primary-600 transition-all duration-200"
            data-tab="integrations" role="tab" aria-selected="false" aria-controls="integrations-panel">
            台灣整合服務
          </button>
          <button
            class="tab-button px-6 py-4 text-lg font-medium border-b-2 border-transparent text-neutral-600 hover:text-primary-600 transition-all duration-200"
            data-tab="automation" role="tab" aria-selected="false" aria-controls="automation-panel">
            智能自動化
          </button>
          <button
            class="tab-button px-6 py-4 text-lg font-medium border-b-2 border-transparent text-neutral-600 hover:text-primary-600 transition-all duration-200"
            data-tab="analytics" role="tab" aria-selected="false" aria-controls="analytics-panel">
            數據分析
          </button>
        </div>

        <!-- Tab 內容 -->
        <div class="tab-content">
          <!-- AI 工作流程 -->
          <div id="workflows-panel" class="tab-panel active" role="tabpanel" aria-labelledby="workflows-tab">
            <div class="css-2190rt">
              <button aria-label="Pause" class="css-m923gu">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="16"
                  class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false"
                  data-pointer-events="true" data-animate-fill="true" style="--color:currentColor">
                  <path d="M10 5H7V19H10V5Z" fill="currentColor"></path>
                  <path d="M17 5H14V19H17V5Z" fill="currentColor"></path>
                </svg>
              </button>
              <video
                src="https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745864783/aiworkflowshomepage.mp4"
                title="AI Workflows" preload="auto" muted loop playsinline disablepictureinpicture disableremoteplayback
                style="opacity: 1; visibility:visible;" class="css-1v86flm"></video>
            </div>
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <h3 class="text-3xl font-bold text-neutral-900">
                  拖拉即用的 AI 工作流程建構器
                </h3>
                <p class="text-lg text-neutral-600 leading-relaxed">
                  無需程式設計背景，透過直觀的視覺化介面建立複雜的自動化流程。整合台灣常用的商業工具，讓您的團隊專注於更有價值的工作。
                </p>
                <ul class="space-y-3">
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="text-neutral-700">支援 500+ 台灣常用應用程式整合</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="text-neutral-700">AI 智能建議最佳化流程設計</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="text-neutral-700">即時監控與錯誤處理機制</span>
                  </li>
                </ul>
                <div class="flex gap-4 pt-4">
                  <BaseButton variant="primary" size="lg">
                    開始建立工作流程
                  </BaseButton>
                  <BaseButton variant="outline" size="lg">
                    查看範本庫
                  </BaseButton>
                </div>
              </div>

              <!-- 功能展示圖 -->
              <div class="relative">
                <div class="bg-gradient-to-br from-primary-50 to-accent-tan/10 rounded-2xl p-8 shadow-xl">
                  <div class="space-y-4">
                    <!-- 模擬工作流程節點 -->
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div class="flex-1 h-2 bg-primary-200 rounded-full">
                        <div class="h-full w-3/4 bg-primary-500 rounded-full"></div>
                      </div>
                      <div class="w-12 h-12 bg-accent-red rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="text-center text-sm text-neutral-600">
                      電子郵件 → 資料處理 → 行事曆排程
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 其他 Tab 面板 (暫時隱藏) -->
          <div id="integrations-panel" class="tab-panel hidden" role="tabpanel">
            <div class="text-center py-20">
              <h3 class="text-2xl font-bold text-neutral-900 mb-4">台灣整合服務</h3>
              <p class="text-neutral-600">整合內容開發中...</p>
            </div>
          </div>

          <div id="automation-panel" class="tab-panel hidden" role="tabpanel">
            <div class="text-center py-20">
              <h3 class="text-2xl font-bold text-neutral-900 mb-4">智能自動化</h3>
              <p class="text-neutral-600">自動化內容開發中...</p>
            </div>
          </div>

          <div id="analytics-panel" class="tab-panel hidden" role="tabpanel">
            <div class="text-center py-20">
              <h3 class="text-2xl font-bold text-neutral-900 mb-4">數據分析</h3>
              <p class="text-neutral-600">分析內容開發中...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客戶信賴區塊 -->
    <section id="trusted-by" class="section-padding" role="region" aria-labelledby="trusted-heading">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 id="trusted-heading" class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            受到 1,000+ 家台灣企業信賴
          </h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            從新創公司到大型企業，各行各業都在使用 TW_Zapier 提升營運效率
          </p>
        </div>

        <!-- 客戶 Logo 輪播區 -->
        <div class="relative overflow-hidden">
          <div class="flex animate-scroll-x space-x-12 items-center">
            <!-- 第一組 Logo -->
            <div class="flex space-x-12 items-center flex-shrink-0">
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">台積電</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">中華電信</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">富邦金控</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">統一企業</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">鴻海科技</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">玉山銀行</span>
              </div>
            </div>
            <!-- 重複的 Logo 組用於無縫輪播 -->
            <div class="flex space-x-12 items-center flex-shrink-0">
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">台積電</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">中華電信</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">富邦金控</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">統一企業</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">鴻海科技</span>
              </div>
              <div
                class="w-32 h-16 bg-neutral-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <span class="text-neutral-500 font-medium text-sm">玉山銀行</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 動態統計數據區 -->
    <section id="stats" class="section-padding" role="region" aria-labelledby="stats-heading">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 id="stats-heading" class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            AI 驅動的自動化成果
          </h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            即時數據展示 TW_Zapier 如何幫助台灣企業提升效率
          </p>
        </div>

        <!-- 統計數字網格 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-4" data-counter="1000">
              1,000+
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">企業客戶</h3>
            <p class="text-neutral-600">信賴我們的自動化解決方案</p>
          </div>

          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-4" data-counter="50000">
              50,000+
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">工作流程</h3>
            <p class="text-neutral-600">每月執行的自動化任務</p>
          </div>

          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-4" data-counter="95">
              95%
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">效率提升</h3>
            <p class="text-neutral-600">平均節省的人工處理時間</p>
          </div>

          <div class="text-center">
            <div class="text-5xl md:text-6xl font-bold text-gradient mb-4" data-counter="24">
              24/7
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">全天候運行</h3>
            <p class="text-neutral-600">不間斷的自動化服務</p>
          </div>
        </div>

        <!-- 時間軸展示 -->
        <div class="bg-gradient-to-r from-primary-50 to-accent-tan/10 rounded-2xl p-8 md:p-12">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              成長軌跡
            </h3>
            <p class="text-neutral-600">
              從 2023 年 1 月至今的平台發展歷程
            </p>
          </div>

          <div class="relative">
            <!-- 時間軸線 -->
            <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>

            <!-- 時間軸節點 -->
            <div class="space-y-12">
              <div class="flex items-center">
                <div class="flex-1 text-right pr-8">
                  <h4 class="font-semibold text-neutral-900">平台上線</h4>
                  <p class="text-sm text-neutral-600">2023年1月</p>
                </div>
                <div class="w-4 h-4 bg-primary-500 rounded-full relative z-10"></div>
                <div class="flex-1 pl-8">
                  <p class="text-neutral-700">首批 100 家企業加入</p>
                </div>
              </div>

              <div class="flex items-center">
                <div class="flex-1 text-right pr-8">
                  <p class="text-neutral-700">台灣金流整合完成</p>
                </div>
                <div class="w-4 h-4 bg-primary-500 rounded-full relative z-10"></div>
                <div class="flex-1 pl-8">
                  <h4 class="font-semibold text-neutral-900">重大更新</h4>
                  <p class="text-sm text-neutral-600">2023年6月</p>
                </div>
              </div>

              <div class="flex items-center">
                <div class="flex-1 text-right pr-8">
                  <h4 class="font-semibold text-neutral-900">AI 功能發布</h4>
                  <p class="text-sm text-neutral-600">2024年1月</p>
                </div>
                <div class="w-4 h-4 bg-accent-red rounded-full relative z-10"></div>
                <div class="flex-1 pl-8">
                  <p class="text-neutral-700">智能工作流程建議上線</p>
                </div>
              </div>

              <div class="flex items-center">
                <div class="flex-1 text-right pr-8">
                  <p class="text-neutral-700">突破 1,000 家企業客戶</p>
                </div>
                <div class="w-4 h-4 bg-green-500 rounded-full relative z-10"></div>
                <div class="flex-1 pl-8">
                  <h4 class="font-semibold text-neutral-900">里程碑達成</h4>
                  <p class="text-sm text-neutral-600">2024年8月</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI 工具展示網格 -->
    <section id="ai-tools" class="section-padding" role="region" aria-labelledby="tools-heading">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 id="tools-heading" class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            強大的 AI 工具生態系統
          </h2>
          <p class="text-lg text-neutral-600 max-w-4xl mx-auto">
            從資料處理到客戶服務，我們提供完整的 AI 工具套件，讓您的業務流程更加智能
          </p>
        </div>

        <!-- 4x2 工具網格 -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <!-- AI 聊天機器人 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">AI 聊天機器人</h3>
            <p class="text-neutral-600 text-sm mb-4">24/7 智能客服，支援繁體中文對話</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 文件處理 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">智能文件處理</h3>
            <p class="text-neutral-600 text-sm mb-4">自動化發票、合約等文件處理</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 數據分析 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">AI 數據分析</h3>
            <p class="text-neutral-600 text-sm mb-4">智能報表生成與趨勢預測</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 電子郵件自動化 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">郵件自動化</h3>
            <p class="text-neutral-600 text-sm mb-4">個人化郵件行銷與客戶關懷</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 社群媒體管理 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">社群媒體管理</h3>
            <p class="text-neutral-600 text-sm mb-4">自動發文與互動回覆</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 庫存管理 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM6 12a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">智能庫存管理</h3>
            <p class="text-neutral-600 text-sm mb-4">自動補貨與庫存預警</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 財務自動化 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fill-rule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">財務自動化</h3>
            <p class="text-neutral-600 text-sm mb-4">發票處理與帳務對帳</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>

          <!-- 人力資源 -->
          <div class="card card-interactive group">
            <div
              class="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 mb-2">人力資源管理</h3>
            <p class="text-neutral-600 text-sm mb-4">員工入職與績效追蹤</p>
            <BaseButton variant="outline" size="sm" class="w-full">
              探索功能
            </BaseButton>
          </div>
        </div>

        <!-- 查看所有工具 -->
        <div class="text-center">
          <BaseButton variant="primary" size="lg" class="px-12">
            查看所有 AI 工具
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- 最終 CTA 區塊 -->
    <section id="final-cta" class="text-white section-padding" role="region" aria-labelledby="cta-heading">
      <div class="container-custom text-center">
        <h2 id="cta-heading" class="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
          準備好轉變企業 AI 使用方式？
        </h2>
        <p class="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
          立即加入 1,000+ 家台灣企業的行列，體驗專為台灣市場設計的流程自動化平台
        </p>

        <!-- CTA 按鈕組 -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <BaseButton variant="secondary" size="xl"
            class="bg-white text-primary-600 hover:bg-neutral-50 px-12 py-5 text-xl font-semibold">
            免費開始使用
          </BaseButton>
          <BaseButton variant="outline" size="xl"
            class="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-12 py-5 text-xl font-semibold">
            聯絡銷售團隊
          </BaseButton>
        </div>

        <!-- 信任指標 -->
        <div class="flex flex-col sm:flex-row justify-center items-center gap-8 text-white/80">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
            <span>免費試用 14 天</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
            <span>無需信用卡</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
            <span>隨時可取消</span>
          </div>
        </div>
      </div>

      <!-- 背景裝飾 -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 基本頁面邏輯
// SEO 和動畫功能將在後續完善

// 基本的頁面邏輯
// 動畫功能將在確認基本頁面正常後啟用
</script>

<style scoped>
/* Hero Section 樣式 */
.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
}

/* Hero 動畫效果 */
.hero-title {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.hero-subtitle {
  animation: fadeInUp 1s ease-out 0.6s both;
}

.cta-button {
  animation: fadeInUp 1s ease-out 0.9s both;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.trust-indicator {
  animation: fadeInUp 1s ease-out 1.2s both;
}

/* 背景裝飾動畫 */
.hero-decoration {
  animation: float 6s ease-in-out infinite;
}

.hero-decoration:nth-child(2) {
  animation-delay: -3s;
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

/* 動畫關鍵幀 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Tab 系統樣式 */
.tab-button.active {
  border-color: #86735E;
  color: #86735E;
}

.tab-panel {
  transition: all 0.3s ease-in-out;
}

.tab-panel.hidden {
  opacity: 0;
  pointer-events: none;
}

/* 客戶 Logo 輪播動畫 */
@keyframes scroll-x {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll-x {
  animation: scroll-x 30s linear infinite;
}

.animate-scroll-x:hover {
  animation-play-state: paused;
}

/* 統計數字樣式 */
[data-counter] {
  transition: all 0.3s;
}

/* 卡片懸停效果 */
.card-interactive {
  transform: translateZ(0);
  transition: all 0.3s ease-out;
}

.card-interactive:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 響應式調整 */
@media (max-width: 768px) {
  .hero-section {
    min-height: 80vh;
    padding: 1rem 0;
  }

  .hero-title {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }

  .cta-button {
    width: 100%;
  }

  .trust-indicator {
    font-size: 0.875rem;
  }

  .tab-button {
    font-size: 1rem;
    padding: 0.75rem 1rem;
  }

  /* 隱藏複雜的背景裝飾以提升性能 */
  .hero-decoration svg {
    display: none;
  }
}

/* 無障礙設計 */
@media (prefers-reduced-motion: reduce) {
  /* 禁用所有動畫 */
  .hero-title,
  .hero-subtitle,
  .cta-button,
  .trust-indicator,
  .hero-decoration,
  .animate-spin-slow {
    animation: none !important;
  }

  .cta-button:hover {
    transform: none;
  }

  .animate-scroll-x {
    animation: none;
  }

  .card-interactive:hover {
    transform: none;
  }

  [data-counter] {
    transition: none;
  }
}

/* 高對比度模式支援 */
@media (prefers-contrast: high) {
  .tab-button {
    border-width: 2px;
  }

  .card {
    border-width: 2px;
  }
}
</style>
