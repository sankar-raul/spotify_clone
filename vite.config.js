import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false
  },
  server: {
    proxy: {
      '/api/lyrics': {
          target: 'https://test-0k.onrender.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: true,
          agent: new https.Agent({ rejectUnauthorized: true }),
      },
  },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Add this:
  base: "/",
  define: {
    "process.env": {},
  }
})
