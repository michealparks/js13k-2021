import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    https: true,
  },
  build: {
    terserOptions: {
      ecma: '2021',
      module: true,
      parse: {
        html5_comments: false
      },
      compress: {
        arguments: true,
        drop_console: true,
        ecma: '2021',
        keep_infinity: true,
        module: true,
        passes: 10,
        toplevel: true,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
      },
      mangle: {
        module: true,
        toplevel: true
      },
      format: {
        comments: false,
        ecma: '2021'
      }
    }
  }
})
