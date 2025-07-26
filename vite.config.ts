import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5272
  },
  build: {
    outDir: 'D:/1_Data/Code_Project/VsCode_WorkPlace/KunPanServer/resources/web'
  },
  base: './',
})
