# Originkit integration

Retrieved using the requested Originkit CLI (0.2.23): `npx --yes originkit@latest add <component> --prompt --no-deps`, for `fluid-text`, `beyond-horizon`, and `glitterwrap`. Authentication used a temporary shell environment variable; no key is stored in this project or its build.

The original TSX implementations are in `src/components/originkit/ui/`. React hooks run through Preact compatibility aliases. The downloaded components use inline styles, so no Tailwind dependency was required.

- Fluid Text: original fluid solver and text mask, adapted to transparent overlays over real HTML text. Resolution and DPR are bounded, pressure iterations reduced to 12, simulation capped at 30 fps and stopped after 2.2 seconds without interaction. Hover or pointer interaction restarts it.
- Beyond Horizon: original shader with warm palette, 500,000-pixel budget and 30 fps cap. Static gradient stays visible until a successful render. GPU failure retains readable content.
- Glitter Wrap: original canvas particle renderer, 60 particles on small screens and 120 on desktop, capped DPR and 30 fps. Fixed behind content.
- Effects mount only when visible and the document is active. Reduced motion unmounts all canvases. WebGL resources are released on unmount. Large text remains accessible HTML; decorative overlays are aria-hidden.
- No scroll hijacking. Module fading uses one pending requestAnimationFrame per scroll event batch; focused modules stay fully visible. Desktop profile is fixed, mobile profile remains in normal flow.

Independent static pages are generated at build time and also served by the development middleware. Only the accessibility skip link uses a hash; module and project links open their own pages.
