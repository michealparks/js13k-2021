import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vitePluginString from 'vite-plugin-string'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
    fs: {
      strict: true,
      allow: ['.'],
    }
  },
  plugins: [
    svelte(),
    vitePluginString.default({
      exclude: 'node_modules/**',
    }),
  ],
  build: {
    terserOptions: {
      ecma: '2021',
      parse: {
        html5_comments: false
      },
      compress: {
        arguments: true,
        booleans_as_integers: true, // !
        drop_console: true,
        keep_fargs: false, // !
        keep_infinity: true,
        module: true,
        passes: 10,
        toplevel: true,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        eval: true,
        module: true,
        toplevel: true
      },
      format: {
        comments: false,
      }
    }
  }
})
