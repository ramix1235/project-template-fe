/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { qrcode } from 'vite-plugin-qrcode';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// Optionally, use SWC instead of Babel: https://github.com/vitejs/vite-plugin-react-swc

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    server: {
      port: 4200,
      host: true,
      open: '/',
    },
    preview: {
      port: 4300,
      host: true,
      open: '/',
    },
    plugins: [
      react(),
      svgr(),
      qrcode(),
      tsconfigPaths(),
      isDev
        ? checker({
            overlay: { initialIsOpen: false },
            typescript: true,
            eslint: {
              lintCommand:
                'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
            },
            stylelint: {
              lintCommand: 'stylelint "**/*.{css,scss}"',
            },
          })
        : undefined,
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/styles/injected.scss";',
        },
      },
    },
    esbuild: {
      drop: isDev ? undefined : ['console', 'debugger'],
    },
    envDir: 'env',
    test: {
      globals: true,
      restoreMocks: true,
      mockReset: true,
      environment: 'jsdom',
      setupFiles: ['src/tests/tests.setup.ts'],
    },
  };
});
