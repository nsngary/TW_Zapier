<template>
  <footer class="bg-neutral-900 text-white">
    <div class="container-custom py-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 公司資訊 -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">TW</span>
            </div>
            <span class="text-xl font-bold">TW_Zapier</span>
          </div>
          <p class="text-neutral-400 mb-4">
            專為台灣企業打造的流程自動化平台，讓您的業務流程更加高效。
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" class="text-neutral-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 產品 -->
        <div>
          <h3 class="font-semibold mb-4">產品</h3>
          <ul class="space-y-2">
            <li><a href="https://zapier.com/workflows" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">工作流程</a></li>
            <li><a href="https://zapier.com/apps" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">整合服務</a></li>
            <li><a href="https://zapier.com/templates" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">範本庫</a></li>
            <li><a href="https://zapier.com/ai" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">AI 工具</a></li>
          </ul>
        </div>

        <!-- 解決方案 -->
        <div>
          <h3 class="font-semibold mb-4">解決方案</h3>
          <ul class="space-y-2">
            <li><a href="https://zapier.com/solutions/ecommerce" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">電商自動化</a></li>
            <li><a href="https://zapier.com/solutions/finance" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">金融服務</a></li>
            <li><a href="https://zapier.com/solutions/government" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">政府機關</a></li>
            <li><a href="https://zapier.com/solutions/logistics" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">物流配送</a></li>
          </ul>
        </div>

        <!-- 支援 -->
        <div>
          <h3 class="font-semibold mb-4">支援</h3>
          <ul class="space-y-2">
            <li><a href="https://help.zapier.com/hc/en-us" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">說明中心</a></li>
            <li><a href="https://zapier.com/developer-platform" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">開發文檔</a></li>
            <li><a href="https://community.zapier.com/" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">社群論壇</a></li>
            <li><a href="https://zapier.com/l/contact-sales" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white transition-colors">聯絡我們</a></li>
          </ul>
        </div>
      </div>

      <!-- 底部版權 -->
      <div class="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-neutral-400 text-sm">
          © 2025 TW_Zapier. 版權所有。
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="https://zapier.com/privacy" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white text-sm transition-colors">隱私政策</a>
          <a href="https://zapier.com/terms" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white text-sm transition-colors">服務條款</a>
          <a href="https://zapier.com/cookies" target="_blank" rel="noopener noreferrer" class="text-neutral-400 hover:text-white text-sm transition-colors">Cookie 政策</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 組件邏輯
</script>
