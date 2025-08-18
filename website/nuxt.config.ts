// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-08-05',

  // 模組配置
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/content'
  ],

  // 組件自動導入配置
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],

  // CSS 配置
  css: [
    '~/assets/css/main.css',
    '~/assets/css/animations.css'
  ],

  // TypeScript 配置
  typescript: {
    strict: false,
    typeCheck: false
  },

  // 運行時配置
  runtimeConfig: {
    // 私有配置 (僅在伺服器端可用)
    apiSecret: process.env.API_SECRET,
    
    // 公開配置 (客戶端也可用)
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      siteName: 'TW_Zapier',
      siteDescription: '台灣在地化流程自動化平台'
    }
  },

  // 應用程式配置
  app: {
    head: {
      title: 'TW_Zapier - 台灣在地化流程自動化平台',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '專為台灣企業打造的流程自動化平台，整合台灣金流、政府開放資料、交通資訊等在地化服務' },
        { name: 'keywords', content: '流程自動化,台灣,金流,政府開放資料,工作流程,自動化平台' },
        { property: 'og:title', content: 'TW_Zapier - 台灣在地化流程自動化平台' },
        { property: 'og:description', content: '專為台灣企業打造的流程自動化平台' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap' }
      ]
    }
  },

  // 開發伺服器配置
  devServer: {
    host: '0.0.0.0',
    port: 4000
  },

  // Tailwind CSS 配置
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  },

  // Content 模組配置
  content: {
    documentDriven: false,
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // 別名配置
  alias: {
    '@shared': '../shared'
  },

  // Vite 配置
  vite: {
    resolve: {
      alias: {
        '@shared': '../shared'
      }
    }
  }
})
