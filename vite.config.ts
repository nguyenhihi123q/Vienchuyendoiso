import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Vienchuyendoiso/', // GitHub repo: nguyenhihi123q/Vienchuyendoiso
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
