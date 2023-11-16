import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ssr } from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({
      // Permanent redirections (HTTP status code 301)
      redirects: {
        '/*': '/index.html'
      }
    })
  ],
})
