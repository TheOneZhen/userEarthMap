import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 开发服务器选项
  server: {
    host: 'localhost',
    port: 3050,
    strictPort: true
  },
  resolve: {
    // 文件系统路径别名（声明此项后尽量使用绝对路径）
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
