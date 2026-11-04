import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FileGlyph } from "@/components/PortfolioContent";
import { hrFiles } from "@/data/hr-portfolio";
import type { HRAppId, HRFile } from "@/data/hr-portfolio";

export type WindowStatus = "closed" | "open" | "minimized";

type TaskbarProps = {
  activeId: HRAppId | null;
  states: Record<HRAppId, WindowStatus>;
  onOpen: (id: HRAppId) => void;
  onToggle: (id: HRAppId) => void;
};

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
            <span className="start-mark" aria-hidden="true"><i /><i /><i /><i /></span> Start
          </button>
          <nav className="start-menu" id="start-menu" aria-label="Start menu" hidden={!menuOpen}>
            <div className="menu-heading"><b>HR</b> Personal computer</div>
            {hrFiles.map((file, index) => (
              <button key={file.id} type="button" ref={index === 0 ? firstItem : undefined} onClick={() => launch(file)}>
                <FileGlyph file={file} /><span><strong>{file.label}</strong><small>{file.hint}</small></span>
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
              <span className="task-indicator" aria-hidden="true" />{file.label}
            </button>
          ))}
        </div>
        <span className="task-motto">a small corner of the web</span>
        <Link className="overview-shortcut" href="/overview/">Overview <span aria-hidden="true">↗</span></Link>
      </div>
    </footer>
  );
}
