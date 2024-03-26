import pages from '@hono/vite-cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: { client: './src/index.tsx' },
          output: {
            entryFileNames: (c) => {
              if (c.name === 'serviceWorker') {
                return 'serviceworker.js';
              }
              return '[name].js';
            },
          },
          external: ['hono'],
        },
      },
      plugins: [nodePolyfills()],
    };
  }
});
