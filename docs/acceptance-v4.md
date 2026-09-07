# V4 local acceptance

## Latest shape and border pass

The footer now has a CSS fallback deformation that starts when the module enters the viewport, so the initial state is visible before the desktop pointer enters. Beyond Horizon still mounts on desktop pointer entry and unmounts on leave. A restrained orange border transitions from transparent on hover; the same border transition is applied to Work, experience, skill and qualification cards. The heading link remains transparent on hover.

Browser checks: footer `is-in-view` and `horizon-deform` were observed at desktop and 375 px content width; effect width matched the viewport with no horizontal overflow. Work hover reached `border-color: rgba(255, 113, 61, .5)` and `translateY(-3px)`. Footer hover reached `border-color: rgba(255, 113, 61, .75)` and mounted a ready shader canvas. 18 tests and the production build pass.

## Full-width sunrise and hover refinement

- Navigation and its glyph keep transform `none` on hover. Work cards transition background and transform over 240 ms.
- Modules slide up/down by up to 44 px as they leave the viewport; midpoint exit offset is regression-tested in both directions.
- Glitter particle size increases from 7 to 10.5 (+50%); brightness increases from 65 to 90 and layer opacity from .48 to .7.
- Sunrise spans the actual viewport width (desktop 1425 px and mobile-width 375 px verified, left 0, no horizontal overflow). Profile card stays above it at z-index 3.
- Fine-pointer devices mount the sunrise on region entry and unmount it on leave: zero canvas before entry, successful shader frame after entry, zero after leave verified. Coarse-pointer devices use viewport entry instead of requiring hover.
- Xiaohongshu uses a readable Chinese wordmark in the existing social color. Console has no warnings/errors. 15 tests and production build pass.

## Latest owner-requested interaction refinement

Motion is now always enabled, as explicitly requested; the earlier switch and system/storage preference are superseded. Hidden-page and offscreen rendering limits still apply. Link hovering keeps the original arrow cursor. Section headings remain transparent on hover.

All 12 skill/software marks now use self-contained SVG background tiles combining the white rounded square with the original local brand image. `node scripts/build-skill-tiles.mjs` regenerates them. The card moves as one unit; separate icon rotation/scale animations are removed. Cards receive consistent internal padding and gaps; small screens use one skill column. 15 regression tests pass, including complete tile assets and removal of the motion switch/link cursor morph.

## Motion visibility fix

The acceptance browser reported `prefers-reduced-motion: reduce`, so the original global guard correctly but invisibly disabled all effects (zero canvases, no runtime errors). A visible Motion On/Off control now shares one effective preference across JS and CSS. System preference remains the default; explicit site choices persist across pages and reloads. Storage failures fall back to an in-memory choice. No browser or OS preference is modified.

Regression coverage: 16 tests pass, including system default changes, explicit override persistence, and storage failures. In the actual reduced-motion browser, enabling effects created visible canvases; Fluid Text returned changing nonzero pixel samples with WebGL error 0; Glitter Wrap produced four distinct pixel sums across nine sampled frames; module opacity changed while scrolling; Beyond Horizon reached its first successful frame. Turning effects off removed all canvases.

- `pnpm test`: 13 passing tests covering safe rendering, links, independent documents, and scroll visibility math.
- `pnpm build`: TypeScript and Vite production build pass; 9 HTML documents emitted.
- Browser checks at 320, 390, 768, 1024 and 1440 px: no horizontal overflow. Desktop profile remains at y=32 after scrolling; mobile profile is relative.
- Home to Work and Work to project detail navigations open distinct pages. All 9 documents returned HTTP 200 on the production preview.
- Real Fluid Text framebuffer samples contained colored pixels and returned WebGL error 0. Footer reported its first successful shader draw. No browser warnings or errors observed during effect and navigation checks.
- Reduced-motion change removed all canvases and kept module opacity at 1. With scripting disabled, static project content and native link destinations remained in the accessibility tree.
- Offscreen module opacity reached 0 while visible sections remained 1; offscreen effect roots unmounted. Independent review found no release-blocking issue.
- Main JS 6.32 kB (gzip 2.56), lazy effect chunk 64.71 kB (gzip 23.20), CSS 29.17 kB (gzip 7.16). These are bundle sizes, not a Lighthouse performance score.

Pending owner assets: X, Xiaohongshu and WeChat destinations and an explicitly public email address. Pending social icons stay noninteractive; no private contact or salary is published.
