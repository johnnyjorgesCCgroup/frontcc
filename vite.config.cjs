import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Incluir dependencias grandes aquí
  },
  build: {
    sourcemap: true, // Opcional: útil para la depuración en desarrollo
  }
})