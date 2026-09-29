import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// Inline Phosphor icons into the HTML at build time: {{icon:phone}} -> <svg ...>
const phosphor = () => ({
  name: 'phosphor-inline',
  transformIndexHtml: (html) =>
    html.replace(/\{\{icon:([a-z-]+)\}\}/g, (_, name) =>
      readFileSync(`node_modules/@phosphor-icons/core/assets/regular/${name}.svg`, 'utf8')
        .trim()
        .replace('<svg ', '<svg class="icon" aria-hidden="true" focusable="false" ')
    ),
});

// Preload the Latin Archivo subset (hashed by Vite) so the hero title paints in its real face.
const fontPreload = (base) => ({
  name: 'font-preload',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      const file = ctx.bundle && Object.keys(ctx.bundle).find((k) => /archivo-latin-wdth-normal.*\.woff2$/.test(k));
      return file
        ? html.replace('</title>', `</title>\n  <link rel="preload" as="font" type="font/woff2" href="${base}${file}" crossorigin>`)
        : html;
    },
  },
});

const base = '/frankl-servis/';

export default defineConfig({
  base,
  plugins: [phosphor(), fontPreload(base)],
  build: { target: 'es2020', cssMinify: true, assetsInlineLimit: 0 },
});
