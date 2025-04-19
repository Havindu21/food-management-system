import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/food-management-system/',
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-leaflet',
      'leaflet'
    ],
  },
})

