import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {ManifestOptions, VitePWA} from "vite-plugin-pwa";
import visualizer from "rollup-plugin-visualizer";

const manifest: Partial<ManifestOptions> = {
   name: 'Music app',
   theme_color: 'rgba(101,58,255,0.83)',
   icons: [{
      src: '/img/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
   }]
}

export default defineConfig({
   plugins: [
      vue(),
      vueJsx(),
      VitePWA({
         registerType: 'autoUpdate',
         devOptions: {
            enabled: true,
         },
         manifest,
         workbox: {
            globPatterns: ['**/*.{svg,png,jpg,html,css,js}']
         }
      }),
      visualizer({
         open: true,
         gzipSize: true,
      }),
   ],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
      }
   }
})
