import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sirve en /Expediente217/. En dev usamos '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Expediente217/' : '/',
  plugins: [react()],
}))
