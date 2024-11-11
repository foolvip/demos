import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // 入口文件将包含可以由你的包的用户导入的导出
      entry: resolve(__dirname, "src/index.ts"),
      name: "mthBusinessCom",
      fileName: (format) => `index.${format}.js`,
    },
  }
})
