import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/views': resolve(__dirname, 'src/views'),
      '@/stores': resolve(__dirname, 'src/stores'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/composables': resolve(__dirname, 'src/composables'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/api': resolve(__dirname, 'src/api'),
      '@/styles': resolve(__dirname, 'src/styles')
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixins.scss";
        `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.VITE_DEV_PORT || '3000'),
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/n8n': {
        target: 'http://localhost:5678',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/n8n/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['element-plus', '@element-plus/icons-vue'],
          utils: ['axios', 'dayjs', 'lodash-es'],
          vueflow: ['@vue-flow/core', '@vue-flow/controls', '@vue-flow/minimap', '@vue-flow/background', '@vue-flow/node-resizer']
        }
      }
    }
  }
})
