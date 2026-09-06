# V4 local acceptance

- `pnpm test`: 13 passing tests covering safe rendering, links, independent documents, and scroll visibility math.
- `pnpm build`: TypeScript and Vite production build pass; 9 HTML documents emitted.
- Browser checks at 320, 390, 768, 1024 and 1440 px: no horizontal overflow. Desktop profile remains at y=32 after scrolling; mobile profile is relative.
- Home to Work and Work to project detail navigations open distinct pages. All 9 documents returned HTTP 200 on the production preview.
- Real Fluid Text framebuffer samples contained colored pixels and returned WebGL error 0. Footer reported its first successful shader draw. No browser warnings or errors observed during effect and navigation checks.
- Reduced-motion change removed all canvases and kept module opacity at 1. With scripting disabled, static project content and native link destinations remained in the accessibility tree.
- Offscreen module opacity reached 0 while visible sections remained 1; offscreen effect roots unmounted. Independent review found no release-blocking issue.
- Main JS 6.32 kB (gzip 2.56), lazy effect chunk 64.71 kB (gzip 23.20), CSS 29.17 kB (gzip 7.16). These are bundle sizes, not a Lighthouse performance score.

Pending owner assets: X, Xiaohongshu and WeChat destinations and an explicitly public email address. Pending social icons stay noninteractive; no private contact or salary is published.
