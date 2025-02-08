import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // 打包分析插件
      open: false,
      filename: 'bundle-analysis.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
      // 可以添加更多常用路径别名
      '@components': resolve('./src/components'),
      '@utils': resolve('./src/utils'),
    },
  },
});
