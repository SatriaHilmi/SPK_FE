import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ],
    }
  },
  preview: {
    host: true, // Mengizinkan akses dari luar
    port: 4173, // Atau port sesuai kebutuhan
    allowedHosts: [
      'sistem-pendukung-keputusan2-production.up.railway.app'
    ]
  },
})
