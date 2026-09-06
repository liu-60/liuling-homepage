# Liu Ling · Portfolio V4

Static portfolio built with Vite, TypeScript and CSS, with lazy Preact islands for three Originkit effects.

## Run

`pnpm install` · `pnpm dev` · `pnpm test` · `pnpm build` · `pnpm preview`

## Content and assets

Edit `src/content.ts`. Content renders into HTML at build time. Navigation opens independent static pages; content and native links remain available without JavaScript.

- Portrait: approved illustrated avatar in two responsive WebP sizes, plus matching favicon.ico and apple-touch-icon.png. Set `profile.portrait` to another approved `/images/name.webp` to replace.
- Projects: replace `image` with an approved local file; set `url` only for a real public HTTPS case. Defaults remain generic SVG artwork, with role/challenge/solution details on individual project pages.
- Socials: add `{ label, icon, url }`. Icons: github, x, xiaohongshu, wechat. An explicitly requested platform with `pending:true` and an empty URL is a labelled, non-interactive icon. Set its real HTTPS URL and remove pending when supplied. Invalid URLs never become links. GitHub uses the resume's public liu-60 account.
- Contact: `contactEmail:null` until the owner confirms a public address. A valid address creates a fixed vertical email on large desktop and an inline link on smaller screens.
- Software and skills: official local marks live in `public/brands/`; provenance is recorded in `docs/brand-assets.md`.
- Metrics: add `{ value, label, suffix, source }` after confirmation. Empty metrics omit the entire section.

Keep salary, raw resumes and non-public work materials outside this directory. Publish contact information only with the owner's permission. Rebuild after content changes. No runtime data service or third-party analytics.

## Motion

Originkit Fluid Text, Beyond Horizon and Glitter Wrap use their original shader/particle implementations with bounded rendering budgets. Effects load lazily and unmount offscreen, when the page is hidden, or under reduced motion. Fluid text stops after pointer inactivity. Semantic text and a static footer gradient remain as fallbacks.

Desktop keeps the profile fixed; right-side modules fade at viewport edges. Touch layouts use a normal-flow profile. Hoverable items brighten and lift slightly. The custom cursor is restricted to fine pointers and yields to keyboard use and reduced motion. See `docs/originkit-integration.md` and `docs/acceptance-v4.md`.
