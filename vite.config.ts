import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  // Relative assets + hash routing: works at / and /<github-repo>/ on GitHub Pages.
  base: './',
  build: { cssCodeSplit: true, rollupOptions: { output: {
    manualChunks(id) {
      if (id.includes('highlight.js')) return 'highlight'
      if (id.includes('markdown-it')) return 'markdown'
      if (id.includes('node_modules')) return 'vendor'
    }
  } } }
})
