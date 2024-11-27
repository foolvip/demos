import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    lib: {
      // 入口文件将包含可以由你的包的用户导入的导出
      entry: resolve(__dirname, "src/index.ts"),
      name: "mthBusinessCom",
      fileName: (format) => `index.${format}.js`,
    },
    target: 'es2015',
    // sourcemap: true,
    // minify: false,
     // 关闭terser压缩
    //  terserOptions: false,
  },
  resolve: {
    alias: {
        '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server: {
    proxy: {
        '/api': {
            // target: 'http://localhost:6002',
            target: 'https://test-web-log-admin.meditrusthealth.com/',
            changeOrigin: true
        },
        '/insure-api': {
            target: 'https://test-insure-admin.meditrustbroker.com/',
            changeOrigin: true
        },
    }
  }
})
