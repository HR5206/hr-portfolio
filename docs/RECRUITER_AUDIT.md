# Portfolio recruiter and engineering audit

Reviewed on **6 November 2026** against `HR5206/hr-portfolio` at commit `681a6cf126b9b1ee15b638a46752f652f1f158e8`. Changes are on the local `codex/recruiter-polish` branch. They have not been pushed or deployed: this session has public read access but no authenticated GitHub write access.

## Hiring-manager assessment

The retro desktop is memorable and coherent. Keep it. The main hiring weakness was how difficult it was to verify the work after noticing the design: two project entries had no source links, the introduction did not state the graduation timeline or internship goal, and the technical explanations stopped at short implementation summaries.

For a student SWE portfolio, the strongest next impression is a small, inspectable body of work. Fault Lab and Checkpoint now lead because a reviewer can reproduce their behavior quickly without a cloud account. Helpdesk remains visible with its hackathon context and an explicit distinction between a simulated workflow and model evaluation.

This is a stronger internship portfolio after the changes. A hiring decision still depends on whether Harish can explain, debug, and extend the work and accurately describe his own contribution. Test counts and a polished interface do not establish that on their own.

## Findings and changes

| Priority | Finding in the original | Change |
| --- | --- | --- |
| High | The hero said only that Harish was learning software; role fit and graduation timing were buried. | Added July 2028 graduation, backend/developer-tool interests, and SWE internship intent in plain first-person copy. |
| High | Fault Lab and Checkpoint had `repository: null`. | Verified both public repositories, linked all three projects, and added source references to reviewed commits. |
| High | A recruiter had to open the résumé window before downloading the PDF. | Added a direct homepage download and immediate résumé/email/GitHub actions in Overview. |
| High | Project summaries did not explain enough decisions, evidence, or scope. | Added three static, shareable project pages with problem, implementation, verification, run instructions/workflow, and tradeoffs. |
| High | The lockfile audit reported 17 affected packages: one critical, six high, nine moderate, one low. | Updated Next.js and its config to 16.4.5, refreshed compatible transitive dependencies, and scoped a minimatch security override. The final npm audit reported zero known vulnerabilities on the review date. |
| Medium | Homepage shortcuts and actions depended on JavaScript. | Added native reading-view destinations while retaining normal-click desktop behavior and modifier-click navigation. |
| Medium | Mobile taskbar positioning used a 36px fallback and a negative bottom calculation. | Anchored it at bottom zero, used the actual safe-area inset, and reserved clearance inside the slate workspace. Enlarged mobile taskbar targets. |
| Medium | New recruiter copy would require an internal scroll on a 1024 × 560 desktop. | Adjusted only the short-desktop rules; the introduction and actions fit without internal overflow at that size. |
| Medium | Small navy text on the slate background had about 4.44:1 contrast before the wallpaper. | Reused the darker headline ink for desktop labels and reading navigation, with a solid slate backing. The main four-color theme remains intact. |
| Medium | No canonical origin, sitemap, robots file, profile schema, or social image. | Added per-page canonical/social metadata, Person/ProfilePage JSON-LD, static crawler files, and a matching 1200 × 630 share card. |
| Medium | Apex domain redirects to www, but metadata did not establish that origin. | Set canonical URLs to `https://www.harishraghav.dev`, matching the observed live redirect. |
| Medium | The PDF omitted source links for two projects and a portfolio link. | Added visible repository links for Fault Lab and Checkpoint and the website in its header, retaining the one-page layout. |
| Medium | Helpdesk wording could imply measured resolution time. | Described its actual step-based SLA and composite grading in the website and PDF. No training-uplift claim was added. |
| Medium | No automated build-output checks or CI. | Added export tests, Node 22/24 GitHub Actions, and dependency-update configuration. |
| Low | README was written around extracting a ZIP; course certificates were labelled broadly as certifications. | Rewrote setup/architecture/deployment guidance and labelled the HTML section “Course certificates.” |
| Low | Reading pages were not prepared for printing. | Added a paper-friendly print stylesheet without altering the normal screen design. |

## Design and implementation review

The HR mark, slate dotted wallpaper, cream `#F2EEE3` taskbar, navy frame, red folder and caret, square window proportions, handwritten `hrv`, typing animation, and taped note remain. There are no new hero photographs, skill percentage bars, testimonials, artificial metrics, loading intros, or required contact forms.

The existing code already had useful foundations: strict TypeScript, a small component structure, static export, a skip link, named window regions, hidden/inert closed windows, keyboard movement, focus restoration, and reduced-motion rules. Those were retained. Overview and the new project pages expose content as ordinary HTML, without requiring a visitor to learn the desktop controls.

There are no added runtime services, trackers, analytics SDKs, remote fonts, or paid APIs. Contact details remain the same. The share card is a local asset. Project descriptions do not claim production users, benchmarks, awards, or independent authorship that the repository cannot establish.

## Evidence checked

| Project | Reviewed commit | Local verification |
| --- | --- | --- |
| [Fault Lab](https://github.com/HR5206/fault-lab) | `f399ca191e20c808eb62c4fa15aa475a064e48cb` | Type check, 11 automated tests, monitor/retry demo passed on Node 24.22.1. |
| [Checkpoint](https://github.com/HR5206/checkpoint-cli) | `15d8583e79839bc0d2fb777cd698374052c1aab9` | 12 end-to-end tests and temporary-folder recovery demo passed on Node 24.22.1. |
| [HelpdeskEnv](https://github.com/HR5206/HelpdeskEnv) | `2767950c01e1304f6400f47bd12cb10b59a461eb` | 43 integration checks passed using the heuristic path, with API credentials unset. No paid model calls or training runs were made. |

Fault Lab reserves response steps before waiting, preserves pending requests across resets, cancels disconnected timers, and bounds its journal. Checkpoint hashes and verifies objects, rejects unsafe paths, and refuses existing restore destinations. The website explains these concrete decisions rather than describing either as a production-grade platform.

Helpdesk’s README mentions a 150-step training run and a +5.3% improvement. The checked-in training log inspected here ends at step 50; that alone does not establish the README’s separate evaluation claim. Its plotting code also has simulated-data fallbacks when evidence files are absent. Reconcile the original training/evaluation artifacts before using the improvement number in recruiting. The claimed comparison was not reproduced in this review.

## Website validation

- Baseline and updated production builds, ESLint, and TypeScript checks passed locally.
- Four export checks passed, covering all five public content routes, generated local assets and fragments, distinct titles, canonical/social metadata, profile identity links, crawler files, and résumé presence.
- A fresh dependency installation succeeded. `npm audit` reported zero known vulnerabilities after the update; this is a dated package-advisory result, not a guarantee that software is defect-free.
- Desktop checks verified opening Projects, keyboard arrow movement, minimize/restore position retention, close/focus restoration, Start-menu focus, and Escape dismissal.
- Responsive checks covered a 1363 × 936 desktop and 320 × 740, 390 × 780, and 1024 × 560 embedded viewports. At 320px there was no horizontal page overflow. At 390px the taskbar bottom matched the viewport and slate continued behind it at the end of the page. At 1024 × 560 the entire homepage body fit without scrolling.
- An iframe with scripts disabled successfully followed “View projects” to the full reading view. Project details, contact information, and résumé links are present in the exported HTML.
- The PDF was text-extracted and rendered for visual inspection. Its seven link annotations include email, GitHub, LinkedIn, the website, and all three repositories.

Browser checks used Chromium viewport frames, not physical iOS/Android devices. They do not validate browser-toolbar collapse, real safe-area hardware, VoiceOver/TalkBack, or every browser. Reduced-motion CSS was reviewed, but OS-level reduced-motion and print-dialog rendering were not emulated. No Lighthouse score or field Core Web Vitals result is claimed. CI is configured but cannot run on GitHub until the branch is uploaded.

## Owner decisions before using this widely

1. **Confirm current facts.** The PDF/data say CGPA 8.41, expected July 2028 graduation, Team 1nf1n1ty from October 2024 to Present, and Google Student Ambassador from August 2025 to January 2026. The ambassador role remains dated experience; it was not silently made current. Confirm the “one of three” statement too.
2. **Be precise about contribution.** Be ready to distinguish your work, collaborators, templates, and AI assistance. If you are still learning generated portions, practice modifying and explaining them before presenting them as evidence of your skills. The website cannot certify your understanding.
3. **Reconcile Helpdesk’s training claims in its own repository.** Keep a reproducible evaluation command, commit/model version, dataset split, and raw results together before quoting uplift. The portfolio describes the verified environment and heuristic checks.
4. **Review the first-person copy.** Backend/developer-tool interests and the desire for SWE internships follow the stated career direction. Add exact availability, internship duration, or location preferences only after confirming them; none were invented.
5. **Deploy and verify the real host.** Upload this branch, review the Vercel preview, and merge through the usual workflow. Check the PDF, deep links, 404, crawler files, and social image on the live domain. Test browser chrome expanded and collapsed on your actual phone.
6. **Maintain a consistent identity.** Use the same name and domain on GitHub, LinkedIn, and the résumé; submit the sitemap in Search Console. Search indexing and rankings are external outcomes, not guaranteed by metadata changes.

## Maintenance watch item

ESLint 9 is end-of-life, but the installed React, JSX accessibility, and import plugins declare peer support through ESLint 9. Lint is functional and the advisory scan is clean. Keep the working toolchain until those plugins support ESLint 10; do not suppress peer checks with `--force` or `--legacy-peer-deps`. The minimatch override is limited to the TypeScript ESLint parser’s dependency and should be removed after its upstream range is patched.

## References

- [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js sitemap convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Next.js ImageResponse advisory](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j)
- [Minimatch advisory and patched version](https://github.com/advisories/GHSA-g3hv-75wg-m249)
- [ESLint version support](https://eslint.org/version-support/)
