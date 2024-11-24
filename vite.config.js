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
          target: 'https://api.textyl.co',
          changeOrigin: true,
          secure: false,
          agent: new https.Agent({ rejectUnauthorized: false }),
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
