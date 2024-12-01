import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/insure-api": {
        target: "https://test-insure-admin.meditrustbroker.com/",
        changeOrigin: true,
      },
    },
  },
});
