# Liu Ling · Portfolio V2

Lightweight static portfolio built with Vite, TypeScript and CSS.

## Run

`pnpm install` · `pnpm dev` · `pnpm test` · `pnpm build` · `pnpm preview`

## Content and assets

Edit `src/content.ts`. Content renders into HTML at build time; reading, anchors and case disclosures work without JavaScript.

- Portrait: place the approved image in `public/images/`, set `profile.portrait` to `/images/name.webp`. Default: LL monogram.
- Projects: replace `image` with an approved local file; set `url` only for a real public HTTPS case. Default: generic SVG artwork and inline role/challenge/solution details.
- Socials: add `{ label, icon, url }`. Icons: github, linkedin, video; globe is the generic fallback. Empty or invalid URLs are omitted. No account is guessed.
- Metrics: add `{ value, label, suffix, source }` after confirmation. `source` records the basis in source only. Empty metrics omit the whole section.

Keep contacts, salary, raw resumes and non-public work materials outside this directory. Rebuild after content changes. No runtime data service or third-party analytics.
