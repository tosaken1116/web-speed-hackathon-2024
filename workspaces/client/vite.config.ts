import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: { client: './src/client.tsx', admin: './src/admin.tsx' },
          output: {
            entryFileNames: (c) => {
              if (c.name === 'client') {
                return 'client.js';
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
