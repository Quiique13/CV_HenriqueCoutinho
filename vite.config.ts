import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'github'
    ? process.env.VITE_BASE_PATH ?? '/CV_HenriqueCoutinho/'
    : '/',
  plugins: [react()],
}))
