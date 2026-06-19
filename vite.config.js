import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages sirve en /ScapeRoom/. En dev usamos '/'.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ScapeRoom/' : '/',
  plugins: [react()],
}))
