import pages from '@hono/vite-cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './src/index.tsx',
          output: {
            entryFileNames: 'client.global.js',
          },
          external: ['hono'],
        },
      },
      plugins: [nodePolyfills()],
    };
  }
});
