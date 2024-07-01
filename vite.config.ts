import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import tailwindcss from 'tailwindcss'
import { peerDependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: Object.keys(peerDependencies)
    }
  },
  plugins: [
    react(),
    dts({ include: ['lib'] }),
    nodePolyfills({
      globals: {
        Buffer: true
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  define: {
    'process.env.NODE_DEBUG': false
  }
})
