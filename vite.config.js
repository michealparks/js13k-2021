import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vitePluginString from 'vite-plugin-string'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'assets',
  server: {
    https: true,
    fs: {
      strict: true,
      allow: ['.'],
    },
  },
  plugins: [
    basicSsl(),
    svelte({
      compilerOptions: {
        cssHash: ({ hash, css }) => 'a'
      }
    }),
    vitePluginString.default({
      exclude: 'node_modules/**',
    }),
  ],
  build: {
    target: 'esnext',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined
      },
    },
  },
})
