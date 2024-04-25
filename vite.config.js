import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: true,
    fs: {
      strict: false // Permite el acceso a cualquier archivo en el sistema de archivos
    }
  }
})
