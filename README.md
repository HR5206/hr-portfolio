# HR — Personal computer

My portfolio, built with Next.js and TypeScript. The homepage is a small desktop: an introduction in `about.txt`, a projects folder, a résumé, and an ivory taskbar. The [reading view](https://www.harishraghav.dev/overview/) puts the same content on a regular page.

[Website](https://www.harishraghav.dev/) · [GitHub](https://github.com/HR5206) · [Email](mailto:harishraghav256@gmail.com)

## Run locally

Use Node.js **22.13 or newer**. No API keys, database, or environment file are needed.

```sh
git clone https://github.com/HR5206/hr-portfolio.git
cd hr-portfolio
npm ci
npm run dev
```

Open the local address printed by Next.js. If you downloaded the source ZIP, extract it and run the npm commands from the folder containing `package.json` instead.

## Check a change

```sh
npm run verify
npm audit
```

`verify` runs ESLint, TypeScript, a production build, and four checks against the actual exported files. The export checks cover internal navigation and fragment targets, assets, résumé availability, page titles, canonical URLs, social metadata, structured data, and crawler files. `npm test` on its own expects an existing `out/` from `npm run build`.

GitHub Actions runs the same checks on Node 22 and 24 for pushes and pull requests. It also checks dependency advisories. Dependabot proposes npm and Actions updates; it does not merge them automatically.

Manual checks still matter: open and close each window, minimize and restore it, use the keyboard, inspect mobile scrolling, and download the résumé. Test a real phone before a release that changes safe-area or viewport CSS.

## How it works

- Next.js statically exports every route to `out/`. There is no application server in production.
- `HRDesktop` manages open, minimized, and closed windows. The title can be dragged with a pointer or moved with arrow keys; Shift uses larger steps. Focus returns to the launcher after closing a window.
- On narrow or touch screens the windows flow down the page. The taskbar stays at the bottom and accounts for the device safe area.
- Desktop shortcuts and homepage actions have ordinary URLs underneath their interactive behavior. Modified clicks and no-JavaScript visits can use the reading view.
- Project pages are generated from local data at build time. Their longer notes stay out of the interactive desktop bundle.
- Typography uses local system fonts. The signature and icons are SVGs. Animation is CSS-only and respects reduced motion.

## Where to edit

| File | Purpose |
| --- | --- |
| `src/data/hr-portfolio.ts` | Personal details, introduction, summaries, education, experience, and skills |
| `src/data/project-notes.ts` | Project explanations, examples, test evidence, limitations, and source references |
| `src/components/PortfolioContent.tsx` | Content shared by desktop windows and the reading view |
| `src/components/HRDesktop.tsx` | Window lifecycle, stacking order, launchers, and focus |
| `src/hooks/useHRWindowDrag.ts` | Pointer and keyboard movement with viewport bounds |
| `src/components/Taskbar.tsx` | Start menu and running windows |
| `src/app/globals.css` | Palette, responsive layouts, type, motion, focus, and print styles |
| `src/lib/metadata.ts` | Descriptions, canonical URLs, and share metadata |
| `src/components/ProfileSchema.tsx` | Person/profile structured data |
| `public/resume/Harish-Raghav-S-Resume.pdf` | One-page résumé with project and contact links |
| `public/social-card.svg` / `.png` | Editable source and 1200 × 630 share image |
| `tests/export.test.mjs` | Checks of the generated website |

The canonical origin is `https://www.harishraghav.dev`, matching the current apex-to-www redirect. Update `hrProfile.siteUrl` and the expected origin in the export test together if hosting changes. Re-export the social SVG as a 1200 × 630 PNG after changing its text.

Keep the PDF and HTML résumé in sync when dates, CGPA, experience, or project details change. Evidence links point at the reviewed commits; refresh them after checking later project revisions.

## Deploy on Vercel

Keep the existing Vercel project connected to this repository. Use its Next.js preset and `npm run build`; the static export remains `out/`. Review a branch preview before merging to the production branch. No hosting migration or new backend is required.

After deploying, check `/overview/`, the three `/projects/…/` routes, the PDF download, `/robots.txt`, `/sitemap.xml`, `/social-card.png`, and an unknown path. The last should show the custom 404. Submit the sitemap in the domain’s Google Search Console property if it has not already been submitted.

## Dependency notes

Next.js and its ESLint configuration are pinned together at 16.4.5. A narrow npm override gives `@typescript-eslint/typescript-estree` minimatch 11.0.1 to address [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249); remove it when the upstream range includes a patched release. The override was checked with lint, type checking, and a production build.

ESLint 9 is retained because the React, import, and JSX accessibility plugins currently declare support through 9. Move to ESLint 10 when the full plugin chain supports it, rather than forcing incompatible peers. See [the audit](docs/RECRUITER_AUDIT.md) for findings, validation, and remaining owner checks.
