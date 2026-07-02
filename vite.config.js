import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // relative base — works from any GitHub Pages project URL (user.github.io/repo-name/)
  // without needing to hardcode the repo name here
  base: './',
  server: {
    host: true,
    port: 5173,
  },
})
