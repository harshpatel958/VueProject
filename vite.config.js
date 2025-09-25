import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
    alias: {
      'motion': 'motion-vue'
    }
  },
  plugins: [vue()],
  server: {
    port: 3001
  }
})