import fs from 'node:fs';
import path from 'node:path';

import { pnpmWorkspaceRoot as findWorkspaceDir } from '@node-kit/pnpm-workspace-root';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import findPackageDir from 'pkg-dir';
import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const WORKSPACE_DIR = (await findWorkspaceDir(process.cwd()))!;

  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  const SEED_IMAGE_DIR = path.resolve(WORKSPACE_DIR, './workspaces/server/seeds/images');
  const IMAGE_PATH_LIST = fs.readdirSync(SEED_IMAGE_DIR).map((file) => `/images/${file}`);

  return [
    {
      bundle: true,
      clean: true,
      entry: {
        client: path.resolve(PACKAGE_DIR, './src/index.tsx'),
        serviceworker: path.resolve(PACKAGE_DIR, './src/serviceworker/index.ts'),
      },
      env: {
        API_URL: '',
        NODE_ENV: process.env['NODE_ENV'] || 'development',
        PATH_LIST: IMAGE_PATH_LIST.join(',') || '',
      },
      esbuildOptions(options) {
        options.define = {
          ...options.define,
          global: 'globalThis',
        };
        options.publicPath = '/';
      },
      esbuildPlugins: [
        polyfillNode({
          globals: {
            process: true,
          },
          polyfills: {
            events: true,
            fs: true,
            path: true,
          },
        }),
      ],
      format: 'iife',
      loader: {
        '.json?file': 'file',
        '.wasm': 'binary',
      },
      terserOptions: {
        parse: {
          // ecma 8をパースすることができます。これは最新の機能をサポートするために有用です。
          ecma: 2020,
        },
        compress: {
          // ecma 8を出力することができます。
          ecma: 2020,
          unused: true, // 未使用の変数や関数を削除
          dead_code: true, // 到達不可能なコードを削除
          comparisons: false, // いくつかの比較を安全ではない方法で最適化するのを避ける
          drop_console: true, // コンソールを削除
          drop_debugger: true, // debuggerを削除
          pure_funcs: ['console.log', 'console.info'], // 指定された関数の呼び出しを削除します
        },
        mangle: {
          // 圧縮されたファイル内の変数や関数の名前を短縮します。
          safari10: true,
          module: true,
        },
        output: {
          ecma: 2020, // ECMAScriptバージョンを指定
          comments: false, // コメントを削除
          ascii_only: true, // ASCII文字のみ出力
        },
        toplevel: true, // トップレベルの変数や関数を圧縮・短縮します
        module: true, // ES6+ モジュールの圧縮を有効にします
      },
      metafile: true,
      minify: 'terser',
      outDir: OUTPUT_DIR,
      platform: 'browser',
      shims: true,
      sourcemap: 'inline',
      splitting: false,
      target: ['chrome123'],
      treeshake: false,
    },
  ];
});
