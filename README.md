# Liu Ling · Portfolio V3

Lightweight static portfolio built with Vite, TypeScript and CSS.

## Run

`pnpm install` · `pnpm dev` · `pnpm test` · `pnpm build` · `pnpm preview`

## Content and assets

Edit `src/content.ts`. Content renders into HTML at build time; reading, anchors and case disclosures work without JavaScript.

- Portrait: approved illustrated avatar in two responsive WebP sizes, plus matching favicon.ico and apple-touch-icon.png. Set `profile.portrait` to another approved `/images/name.webp` to replace.
- Projects: replace `image` with an approved local file; set `url` only for a real public HTTPS case. Defaults remain generic SVG artwork and inline role/challenge/solution details.
- Socials: add `{ label, icon, url }`. Icons: github, x, xiaohongshu, wechat. An explicitly requested platform with `pending:true` and an empty URL is a labelled, non-interactive icon. Set its real HTTPS URL and remove pending when supplied. Invalid URLs never become links. GitHub uses the resume's public liu-60 account.
- Contact: `contactEmail:null` until the owner confirms a public address. A valid address creates a fixed vertical email on large desktop and an inline link on smaller screens.
- Software and skills: official local marks live in `public/brands/`; provenance is recorded in `docs/brand-assets.md`.
- Metrics: add `{ value, label, suffix, source }` after confirmation. Empty metrics omit the entire section.

Keep salary, raw resumes and non-public work materials outside this directory. Publish contact information only with the owner's permission. Rebuild after content changes. No runtime data service or third-party analytics.

## Motion

CSS + IntersectionObserver + Web Animations, no animation library. Content remains visible without JavaScript. Entries run once within the V2 timing budget; skill icons receive a small additional entrance. The custom arrow changes to a lime action ring over links. It is limited to a fine mouse pointer, disabled on keyboard use, touch and reduced-motion preference, and schedules no frames at rest. Scroll progress uses passive events and one pending frame. Reduced-motion removes transitions and smooth scrolling; native links and project disclosures remain usable.
