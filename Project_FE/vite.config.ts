import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // API_Admin — https://localhost:7178
      '/api-admin': {
        target: 'https://localhost:7178',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-admin/, '/api'),
      },
      // API_NhanVien — https://localhost:7204
      '/api-nhanvien': {
        target: 'https://localhost:7204',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-nhanvien/, '/api'),
      },
      // API_KhachHang — https://localhost:7181 (default /api/*)
      '/api': {
        target: 'https://localhost:7181',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
