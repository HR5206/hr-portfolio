import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hrFiles } from "@/data/hr-portfolio";
import type { HRAppId, HRFile } from "@/data/hr-portfolio";

export type WindowStatus = "closed" | "open" | "minimized";

type TaskbarProps = {
  activeId: HRAppId | null;
  states: Record<HRAppId, WindowStatus>;
  onOpen: (id: HRAppId) => void;
  onToggle: (id: HRAppId) => void;
};

const taskIcons = {
  start: <><rect x="3" y="3" width="14" height="11" rx="1" /><path d="M7 17h6M10 14v3" /><path className="icon-accent" d="m7 7 2 2-2 2m4 0h2" /></>,
  about: <><path d="M5 2.5h7l3 3V17H5Z" /><path d="M12 2.5V6h3" /><path className="icon-accent" d="M8 10h4m-4 3h4" /></>,
  projects: <><path d="M2.5 5h6l2 2h7v10h-15Z" /><path className="icon-accent" d="m11 10-2 4" /></>,
  resume: <><path d="M5 2.5h7l3 3V17H5Z" /><path d="M12 2.5V6h3M8 14h4" /><path className="icon-accent" d="M10 8v4m-2-2 2 2 2-2" /></>,
  skills: <><path d="m6 5-4 5 4 5m8-10 4 5-4 5" /><path className="icon-accent" d="m12 3-4 14" /></>,
  contact: <><rect x="2.5" y="4.5" width="15" height="11" rx="1" /><path className="icon-accent" d="m3 5 7 6 7-6" /></>,
  overview: <><rect x="3" y="3" width="14" height="14" rx="1" /><path d="M8 3v14" /><path className="icon-accent" d="M11 7h3m-3 3h3m-3 3h2" /></>,
};

function TaskIcon({ name }: { name: keyof typeof taskIcons }) {
  return (
    <svg className="task-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {taskIcons[name]}
    </svg>
  );
}

export default function Taskbar({ activeId, states, onOpen, onToggle }: TaskbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const launcher = useRef<HTMLDivElement>(null);
  const firstItem = useRef<HTMLButtonElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const running = hrFiles.filter((file) => states[file.id] !== "closed");

  useEffect(() => {
    if (!menuOpen) return;
    firstItem.current?.focus({ preventScroll: true });
    function dismiss(event: Event) {
      if (event.target instanceof Node && !launcher.current?.contains(event.target)) setMenuOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("focusin", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("focusin", dismiss);
    };
  }, [menuOpen]);

  function launch(file: HRFile) {
    setMenuOpen(false);
    onOpen(file.id);
  }

  return (
    <footer className="hr-taskbar" aria-label="Desktop taskbar">
      <div className="taskbar-row">
        <div className="start-area" ref={launcher} onKeyDown={(event) => {
          if (menuOpen && event.key === "Escape") {
            event.preventDefault();
            setMenuOpen(false);
            startButton.current?.focus();
          }
        }}>
          <button type="button" id="hr-start" ref={startButton} className="start-button"
            aria-controls="start-menu" aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}>
            <TaskIcon name="start" /> Start
          </button>
          <nav className="start-menu" id="start-menu" aria-label="Start menu" hidden={!menuOpen}>
            <div className="menu-heading"><b>HR</b> Personal computer</div>
            {hrFiles.map((file, index) => (
              <button key={file.id} type="button" ref={index === 0 ? firstItem : undefined} onClick={() => launch(file)}>
                <TaskIcon name={file.id} /><span><strong>{file.label}</strong><small>{file.hint}</small></span>
              </button>
            ))}
            <Link href="/overview/" className="menu-overview">Read as a page <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
        <div className="task-list" role="group" aria-label="Running windows">
          {running.map((file) => (
            <button type="button" key={file.id} id={"hr-task-" + file.id} className="task-button"
              aria-controls={"hr-window-" + file.id} aria-expanded={states[file.id] === "open"}
              aria-pressed={file.id === activeId}
              title={(file.id === activeId ? "Minimize " : "Show ") + file.label}
              onClick={() => onToggle(file.id)}>
              <TaskIcon name={file.id} /><span>{file.label}</span>
            </button>
          ))}
        </div>
        <span className="task-motto">a small corner of the web</span>
        <Link className="overview-shortcut" href="/overview/"><TaskIcon name="overview" />Overview <span aria-hidden="true">↗</span></Link>
      </div>
    </footer>
  );
}
