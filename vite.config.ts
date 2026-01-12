import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Substitua pelo nome do seu repositório
const repoName = '/WeatherNow/'

export default defineConfig({
  plugins: [react()],
  base: repoName, // IMPORTANTE para GitHub Pages
})
