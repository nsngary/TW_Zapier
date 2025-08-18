<template>
  <section class="ai-plus-automation section-padding bg-neutral-50" role="region"
    aria-labelledby="ai-plus-automation-heading">
    <div class="container-custom">
      <!-- 第一區塊 ：header + 圖片 -->
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <header class="flex flex-col mb-12 gap-4">
          <p class="uppercase tracking-wide text-sm text-neutral-500 flex items-center gap-2">
            <span class="inline-block w-4 h-1 bg-accent-ball"></span>
            AI × 自動化
          </p>
          <h2 id="ai-use-cases-heading"
            class="tracking-wide leading-[0.9] text-4xl md:text-5xl font-bold text-neutral-900 mb-4 text-balance leading-relaxed">
            AI × 自動化，<br>集中在同一平台
          </h2>
          <p class="text-xl text-neutral-600 max-w-4xl  leading-relaxed">
            Zapier 將工作流程、介面、資料與 AI 集中到同一處，讓你專注在打造成果。
          </p>
          <p class="text-xl text-neutral-600 max-w-4xl text-balance leading-relaxed">
            不必切換工具，就能建立自己的 IT 服務台、到職流程與名單分派。
          </p>
        </header>
        <img src="../../public/images/hp-ai-automation_orange_il5u6h.png" alt="">
      </div>
      <!-- 第二區塊：產品功能卡片 -->
      <div class="grid md:grid-cols-2 mb-16 mt-16">
        <!-- Workflows 卡片 -->
        <NuxtLink
          to="/workflows"
          class="group bg-white p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex flex-col h-full">
            <!-- 圖標 -->
            <div class="mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="color:#bd743a"><path d="M8.99996 23.66L20.54 9.90997H15V0.159973L3.45996 13.91H8.99996V23.66Z" fill="currentColor"></path></svg>
            </div>

            <!-- 內容 -->
            <div class="flex-1 mb-6">
              <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                設計具有邏輯分支和 AI 處理的多步驟工作流程
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                TW_Zapier 工作流程讓最複雜的自動化變得簡單易用
              </p>
            </div>

            <!-- CTA -->
            <div class="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
              <span>探索工作流程</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Tables 卡片 -->
        <NuxtLink
          to="/tables"
          class="group bg-white p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex flex-col h-full">
            <!-- 圖標 -->
            <div class="mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="color:#bd743a"><path d="M12 2.9978H21.0022V7.49897H12V2.9978Z" fill="currentColor"></path><path d="M12 7.49897L2.99756 7.4989V12.0001H11.9997L12 7.49897Z" fill="currentColor"></path><path d="M11.9997 12.0001L21.0022 12V16.5012H12L11.9997 12.0001Z" fill="currentColor"></path><path d="M2.99756 16.5011L12 16.5012L11.9997 21.0023H2.99756V16.5011Z" fill="currentColor"></path></svg>
            </div>

            <!-- 內容 -->
            <div class="flex-1 mb-6">
              <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                儲存和管理驅動自動化的數據
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                TW_Zapier 表格將所有自動化數據集中在一個地方
              </p>
            </div>

            <!-- CTA -->
            <div class="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
              <span>探索表格</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Interfaces 卡片 -->
        <NuxtLink
          to="/interfaces"
          class="group bg-white p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex flex-col h-full">
            <!-- 圖標 -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="color:#bd743a"><path d="M7.49989 7.50049V16.5001L16.4999 16.5001V21H3.00022L3 3H20.9999V16.5001L16.4999 16.5001L16.5 7.50049L7.49989 7.50049Z" fill="currentColor"></path></svg>

            <!-- 內容 -->
            <div class="flex-1 mb-6">
              <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                創建任何人都可以使用的自定義界面—無需編程
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                TW_Zapier 界面為任何工作流程提供自定義前端
              </p>
            </div>

            <!-- CTA -->
            <div class="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
              <span>探索界面</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <!-- Templates 卡片 -->
        <NuxtLink
          to="/templates"
          class="group bg-white p-8 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
        >
          <div class="flex flex-col h-full">
            <!-- 圖標 -->
            <div class="mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" size="24" class="zapier-zinnia-icons__icon__8f1EW1A1" aria-hidden="false" role="img" data-block="false" data-pointer-events="true" data-animate-fill="true" style="color:#bd743a"><path d="M6 2H18V4H6V2Z" fill="currentColor"></path><path d="M4 6H20V8H4V6Z" fill="currentColor"></path><path d="M3 10V18H5V12H19V20H3V22H21V10H3Z" fill="currentColor"></path></svg>
            </div>

            <!-- 內容 -->
            <div class="flex-1 mb-6">
              <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                從個人生產力擴展到公司級工作流程
              </h3>
              <p class="text-neutral-600 leading-relaxed">
                使用我們預建的模板來啟發您的下一個系統
              </p>
            </div>

            <!-- CTA -->
            <div class="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-200">
              <span>探索模板</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- 第三區塊 ：客戶分享 -->
      <div></div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
