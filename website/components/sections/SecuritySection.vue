<template>
  <section id="security" class="security section-padding bg-white" role="region" aria-labelledby="security-heading">
    <div class="container-custom">
      <header class="max-w-3xl mb-10">
        <p class="uppercase tracking-wide text-sm text-neutral-500 flex items-center gap-2">
          <span class="inline-block w-4 h-1 bg-accent-red"></span>
          資安
        </p>
        <h2 id="security-heading" class="text-3xl md:text-5xl font-bold text-neutral-900">
          Zapier 是真正落地的安全自動化
        </h2>
        <p class="text-neutral-600 mt-4 max-w-3xl">具備企業級資安、合規與治理能力，Zapier 讓你在不失控的前提下輕鬆擴大量化自動化。</p>
      </header>

      <!-- 標章列 -->
      <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <li class="badge"><img src="/images/badge-soc_z7iwmg.avif" alt="SOC 2 / SOC 3" /></li>
        <li class="badge"><img src="/images/security-gdpr_tymvwg.png" alt="GDPR" /></li>
        <li class="badge"><img src="/images/security-ccpa_nun8iu.png" alt="CCPA" /></li>
        <li class="badge"><img src="/images/badge-gdpr-uk_cl8az9.png" alt="GDPR UK" /></li>
      </ul>

      <!-- 功能列 -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article class="feature">
          <h3 class="feature__title">細粒度權限與 SSO</h3>
          <p class="feature__desc">以 SAML/SCIM 與角色權限控管，精準管理團隊與應用存取。</p>
        </article>
        <article class="feature">
          <h3 class="feature__title">端到端可觀測性</h3>
          <p class="feature__desc">審計日誌、分析報表與即時告警，讓資料流向一目了然。</p>
        </article>
        <article class="feature">
          <h3 class="feature__title">錯誤處理與復原</h3>
          <p class="feature__desc">自動重試、智能告警、AI 排錯，保持任務穩定可靠。</p>
        </article>
        <article class="feature">
          <h3 class="feature__title">99.99% 可用性與 SLA</h3>
          <p class="feature__desc">企業級可用性保證，確保關鍵任務不中斷。</p>
        </article>
        <article class="feature">
          <h3 class="feature__title">GDPR / CCPA 合規</h3>
          <p class="feature__desc">資料隱私與控制權優先，滿足國際法規要求。</p>
        </article>
        <article class="feature">
          <h3 class="feature__title">安全設計優先</h3>
          <p class="feature__desc">從基礎架構到產品流程，以安全為核心設計。</p>
        </article>
      </div>

      <!-- CTA -->
      <div class="mt-12">
        <a href="https://zapier.com/security-compliance" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center h-12 px-6 rounded border border-primary-600 bg-primary-600 text-white font-semibold hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">開始使用安全的 AI 自動化</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// TODO: 若未來需由 CMS/Content 注入，可轉為 props 或 content driven
</script>

<style scoped>
.badge img { @apply h-10 md:h-12 object-contain mx-auto; }
.feature { @apply p-6 border border-neutral-200 rounded-lg bg-white hover:shadow-md transition; }
.feature__title { @apply text-lg font-semibold text-neutral-900; }
.feature__desc { @apply text-neutral-600 mt-1; }
@media (prefers-reduced-motion: reduce) {
  .feature { transition: none; }
}
</style>

