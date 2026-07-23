import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Veterinary Hospital Dashboard',
        short_name: 'VetDash',
        description: 'Hospital management dashboard',
        theme_color: '#059669',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/keita-dashboard/',
        start_url: '/keita-dashboard/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23059669" width="192" height="192"/><text x="96" y="110" font-size="80" fill="white" text-anchor="middle" font-weight="bold">V</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23059669" width="192" height="192" rx="45"/><text x="96" y="110" font-size="80" fill="white" text-anchor="middle" font-weight="bold">V</text></svg>',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  base: '/keita-dashboard/',
  server: {
    port: 5173
  }
})
