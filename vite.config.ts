import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import { peerDependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: Object.keys(peerDependencies)
    }
  },
  plugins: [react(), dts({ include: ['lib'] })],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
})
