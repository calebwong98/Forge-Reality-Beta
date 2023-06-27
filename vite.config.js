import htmlPurge from 'vite-plugin-purgecss';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [htmlPurge()],
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, 'templates/home.html'),
        about: resolve(__dirname, 'templates/about.html'),
        store: resolve(__dirname, 'templates/store.html'),
        404: resolve(__dirname, 'templates/404.html'),
      },
    },
  },
});
