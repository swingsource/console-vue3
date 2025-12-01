import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer' // 分析打包体积

const shouldAnalyze = process.env.ANALYZE === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        shouldAnalyze && visualizer({
          filename: 'dist/bundle-report.html', // 报告输出位置
          gzipSize: true,                      // 显示 gzip 后大小
          brotliSize: true,                    // 显示 brotli 后大小
          open: true,                          // 构建完自动打开报告
        }),
      ],
    },
  },
})
