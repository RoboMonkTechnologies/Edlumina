import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react'
          }
        },
      },
    },
  },
})
