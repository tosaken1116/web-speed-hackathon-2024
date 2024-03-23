import path from 'node:path';

import findPackageDir from 'pkg-dir';
import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  return [
    {
      clean: true,
      entry: {
        server: path.resolve(PACKAGE_DIR, 'src/server.tsx'),
      },
      env: {
        API_URL: process.env['KOYEB_PUBLIC_DOMAIN']
          ? `https://${process.env['KOYEB_PUBLIC_DOMAIN']}`
          : 'http://localhost:8000',
        NODE_ENV: process.env['NODE_ENV'] || 'development',
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
      format: 'cjs',
      metafile: true,
      minify: 'terser',
      noExternal: [/@wsh-2024\/.*/],
      outDir: OUTPUT_DIR,
      shims: true,
      sourcemap: true,
      splitting: true,
      target: 'chrome123',
      treeshake: true,
    },
  ];
});
