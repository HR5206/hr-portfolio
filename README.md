# HR Personal Computer

Harish Raghav’s Next.js and TypeScript portfolio. A text file introduces Harish, a folder holds three engineering projects, and the résumé shortcut opens his experience and a downloadable PDF.

## Run it in VS Code

1. Extract the ZIP. Open the inner `hr-portfolio` folder in VS Code. You should see `package.json` next to this README.
2. Use Node.js 22.13 or newer. Check with `node -v`.
3. Open the VS Code terminal in that folder and run these commands.

```bash
npm ci
npm run dev
```

Open the local address printed in the terminal, usually `http://localhost:3000`. Press Ctrl+C in the terminal to stop the server.

## Try the desktop

- Open **projects** and expand **Read build notes** on Fault Lab or Checkpoint. The Helpdesk entry also links to its repository.
- Open **resume.pdf** and choose **Download résumé** for the one-page PDF.
- **Start** lists all five files, including **skills.txt** and **contact.txt**. Escape closes the menu.
- Click a running task to bring its window forward. Click the active task to minimize it, then click it again to restore.
- Drag a title on a large screen, or focus the title and press the arrow keys. Shift moves the window in larger steps.
- **Overview** opens a single reading page at `/overview/`. On small screens, windows stack and the taskbar stays at the bottom.

## Where to edit

| File | Contents |
| --- | --- |
| `src/data/hr-portfolio.ts` | Contact links, education, experience, skills, certifications and project notes |
| `src/components/PortfolioContent.tsx` | Homepage copy, the two-line typed name, and the contents of each window |
| `src/components/HRDesktop.tsx` | Desktop shortcuts, window order, focus and open/minimize/close behavior |
| `src/components/Taskbar.tsx` | Start menu, running tasks and reading-view shortcut |
| `src/app/globals.css` | Four-color palette, layout, typing speed and transitions |
| `public/signature.svg` | Hand-drawn hrv signature |
| `public/resume/Harish-Raghav-S-Resume.pdf` | Downloadable résumé |

The name types one line at a time and settles on a red underscore. Reduced-motion mode shows the full name and signature immediately. To change the name animation speed, adjust `--length` and `--start` on `.name-line` in the stylesheet.

## Production build

```bash
npm run lint
npm run typecheck
npm run build
```

The production export is generated in `out/`. To update your existing Vercel portfolio, test this folder first. Then bring its `src`, `public`, dependency files, and framework configuration into a branch of the repository connected to your Vercel project. Deploy that branch through your usual Vercel workflow.
