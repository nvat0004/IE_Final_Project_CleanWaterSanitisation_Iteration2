import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ✅ Vite config with Vue + API proxying to backend at port 8080
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 🔁 Your Express backend
        changeOrigin: true,
        secure: false,
      }
    }
  },
  css: {
    preprocessorOptions: {
      // Optional: keep this for future SCSS/PostCSS support
    }
  }
})
