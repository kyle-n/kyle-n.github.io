import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    rollupOptions: {
      checks: {
        pluginTimings: false
      }
    }
  },
  server: {
    fs: {
      allow: ['./posts']
    },
    host: '0.0.0.0'
  }
});
