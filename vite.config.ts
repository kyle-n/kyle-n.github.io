import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['./posts']
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts']
  }
});
