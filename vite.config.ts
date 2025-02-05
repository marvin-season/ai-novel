import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({  // 打包分析插件
      open: true,
      filename: 'bundle-analysis.html',
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      // 可以添加更多常用路径别名
      '@components': resolve('./src/components'),
      '@utils': resolve('./src/utils')
    },
  },
  build: {
    chunkSizeWarningLimit: 1500, // 调整 chunk 大小警告阈值 (单位 KB)
    sourcemap: false, // 生产环境建议关闭 sourcemap
    minify: 'terser', // 使用 terser 进行更高效的压缩
    cssCodeSplit: true, // 启用 CSS 代码分割
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 将大依赖单独拆包
            if (id.includes('react')) {
              return 'vendor-react' // React 相关单独打包
            }
            if (id.includes('lodash') || id.includes('lodash-es')) {
              return 'vendor-lodash'
            }
            if (id.includes('antd') || id.includes('@ant-design')) {
              return 'vendor-antd'
            }
            if (id.includes('echarts')) {
              return 'vendor-echarts'
            }
            
            // 其他依赖按模块名称分组
            const match = id.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)
            return match ? `vendor-${match[1]}` : 'vendor-other'
          }

          // 将本地公共代码单独打包
          if (
            id.includes('src/common') || 
            id.includes('src/utils') ||
            id.includes('src/hooks')
          ) {
            return 'common'
          }
        },
        chunkFileNames: 'js/[name]-[hash].js', // 更简洁的文件名格式
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        // 优化哈希策略
        hashCharacters: 'hex',
        compact: true,
        minifyInternalExports: true
      }
    },
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true // 移除 debugger
      },
      format: {
        comments: false // 移除注释
      }
    }
  }
})