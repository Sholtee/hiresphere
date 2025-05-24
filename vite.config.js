/*
 * File: vite.config.js
 * Project: job-ad
 *
 * Author: Denes Solti
 */
import {resolve} from 'path';

import browserslistToEsbuild from 'browserslist-to-esbuild';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

import pugPlugin from './scripts/pug-plugin';

export default defineConfig(({mode}) => ({
  plugins: [
    vue(),
    pugPlugin({
      index: '@/index.pug'
    })
  ],
  build: {
    sourcemap: mode.includes('production') ? 'inline' : false,
    target: browserslistToEsbuild(null, {
      path: resolve('.', '.browserslist.rc')
    }),
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // put Vue in a separate JS
          vue: ['vue']
        }
      }
    },
    chunkSizeWarningLimit: 800
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern',
        silenceDeprecations: ['mixed-decls']
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('.', 'src'),
      '~': resolve('.', 'node_modules'),
      '^': resolve('.')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1986',
        changeOrigin: true
      }
    }
  }
}));