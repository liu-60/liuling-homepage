import { defineConfig } from 'vite';
import { renderPage } from './src/render.ts';
export default defineConfig({
  plugins: [{
    name: 'static-portfolio-content',
    transformIndexHtml: { order: 'pre', handler(html) {
      const blocks = renderPage();
      return html.replace(/<!-- BLOCK:([A-Z_]+) -->/g, (_, key: string) => blocks[key] ?? '');
    } },
    handleHotUpdate({ file, server }) {
      if (/src\/(content|render|icons)\.ts$/.test(file.replace(/\\/g, '/'))) server.restart();
    },
  }],
  server: { host: '127.0.0.1', port: 5178, strictPort: true },
  preview: { host: '127.0.0.1', port: 4178, strictPort: true },
});
