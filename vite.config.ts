import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, join } from 'path'
import { writeFileSync } from 'fs'
import { OutputChunk } from 'rollup'

const MicroAppName = 'userEarthMap'

// https://vitejs.dev/config/
export default defineConfig({
  base: `${process.env.NODE_ENV === 'production' ? '' : ''}/${MicroAppName}/`,
  plugins: [
    vue(),
    ,
    // 自定义插件，将引入的资源地址补全
    (function () {
      let basePath = ''
      return {
        name: MicroAppName,
        apply: 'build',
        configResolved (config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle (options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName] as OutputChunk
              if (chunk.fileName && chunk.fileName.endsWith('.ts')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3: string) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        }
      }
    })()
  ],
  // 开发服务器选项
  server: {
    host: 'localhost',
    port: 3050,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost/3050/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    // 文件系统路径别名（声明此项后尽量使用绝对路径）
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
