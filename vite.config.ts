import { defineConfig } from 'vite';
import { renderPage } from './src/render.ts';
import { pageDocument, pagePaths } from './src/pages.ts';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
export default defineConfig({
  base: process.env.PAGES_BASE_PATH || '/',
  resolve: { alias: [{find:/^react$/,replacement:'preact/compat'}, {find:/^react\/jsx-runtime$/,replacement:'preact/jsx-runtime'}] },
  plugins: [{
    name: 'static-portfolio-content',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use(async (req,res,next) => {
        const path = (req.url ?? '').split('?')[0];
        if (!pagePaths.includes(path)) return next();
        try {
          const template = readFileSync(resolve(server.config.root,'index.html'),'utf8');
          const html = await server.transformIndexHtml('/',template);
          res.setHeader('Content-Type','text/html; charset=utf-8');
          res.end(pageDocument(html,path));
        } catch(error) { next(error); }
      });
    },
    transformIndexHtml: { order: 'pre', handler(html) {
      const blocks = renderPage();
      return html.replace(/<!-- BLOCK:([A-Z_]+) -->/g, (_, key: string) => blocks[key] ?? '');
    } },
    handleHotUpdate({ file, server }) {
      if (/src\/(content|render|icons)\.ts$/.test(file.replace(/\\/g, '/'))) server.restart();
    },
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') throw new Error('Missing built HTML');
      const html = String(index.source);
      for (const path of pagePaths) this.emitFile({type:'asset',fileName:path.slice(1),source:pageDocument(html,path)});
    },
  }],
  server: { host: '127.0.0.1', port: 5178, strictPort: true },
  preview: { host: '127.0.0.1', port: 4178, strictPort: true },
});
