"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AboutContent, ContactContent, FileGlyph, PortfolioHeader, ProjectsContent, ResumeContent, SkillsContent } from "@/components/PortfolioContent";
import Taskbar from "@/components/Taskbar";
import type { WindowStatus } from "@/components/Taskbar";
import { hrFiles } from "@/data/hr-portfolio";
import type { HRAppId, HRFile } from "@/data/hr-portfolio";
import { useHRWindowDrag } from "@/hooks/useHRWindowDrag";

type WindowProps = {
  file: HRFile;
  status: WindowStatus;
  active: boolean;
  layer: number;
  offset: number;
  onActivate: () => void;
  onMinimize: () => void;
  onClose: () => void;
  children: ReactNode;
};

function PortfolioWindow({ file, status, active, layer, offset, onActivate, onMinimize, onClose, children }: WindowProps) {
  const { windowRef, position, startDrag, moveDrag, stopDrag, moveWithKeyboard } = useHRWindowDrag();
  const open = status === "open";
  const style = { "--cascade": offset + "px", left: position?.x, top: position?.y, zIndex: layer } as CSSProperties;
  return (
    <section ref={windowRef} id={"hr-window-" + file.id} className="hr-window" style={style}
      data-active={active} aria-labelledby={"hr-title-" + file.id} hidden={!open} inert={!open}
      onPointerDownCapture={onActivate} onFocusCapture={onActivate}>
      <header className="hr-titlebar">
        <button id={"hr-handle-" + file.id} type="button" className="hr-handle" aria-describedby="hr-move-help"
          onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag}
          onPointerCancel={stopDrag} onLostPointerCapture={stopDrag} onKeyDown={moveWithKeyboard}>
          <span id={"hr-title-" + file.id}>{file.label}</span>
        </button>
        <button type="button" className="window-control" aria-label={"Minimize " + file.label}
          title="Minimize" onClick={onMinimize}><span className="control-mark minimize" aria-hidden="true" /></button>
        <button type="button" className="window-control" aria-label={"Close " + file.label}
          title="Close" onClick={onClose}><span className="control-mark close" aria-hidden="true" /></button>
      </header>
      <div className="hr-path">{file.path}</div>
      <div className="hr-window-body" tabIndex={0} role="region" aria-label={file.label + " contents"}>
        {children}
      </div>
      <footer className="hr-window-status"><span>{file.status}</span><span>Personal edition</span></footer>
    </section>
  );
}

const contents: Record<HRAppId, ReactNode> = {
  about: <AboutContent />, projects: <ProjectsContent />, resume: <ResumeContent />,
  skills: <SkillsContent />, contact: <ContactContent />,
};

const desktopFiles = hrFiles.slice(0, 3);

export default function HRDesktop() {
  const [states, setStates] = useState<Record<HRAppId, WindowStatus>>({
    about: "open", projects: "closed", resume: "closed", skills: "closed", contact: "closed",
  });
  const [order, setOrder] = useState<HRAppId[]>(["about"]);
  // A fresh open after Close starts at the original position. Restore keeps its position.
  const [launches, setLaunches] = useState<Partial<Record<HRAppId, number>>>({});
  const pendingFocus = useRef<string | null>(null);

  useEffect(() => {
    const id = pendingFocus.current;
    pendingFocus.current = null;
    if (!id) return;
    const target = document.getElementById(id);
    target?.focus({ preventScroll: true });
    const panel = target?.closest<HTMLElement>(".hr-window");
    if (panel && getComputedStyle(panel).position !== "absolute") {
      panel.scrollIntoView({ block: "start", behavior: "instant" });
    } else if (target?.matches(".task-button, .hr-icon")) {
      target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    }
  }, [states]);

  const activeId = order.filter((id) => states[id] === "open").at(-1) ?? null;

  function bringToFront(id: HRAppId) {
    setOrder((current) => current.at(-1) === id ? current : [...current.filter((item) => item !== id), id]);
  }

  function openWindow(id: HRAppId) {
    pendingFocus.current = "hr-handle-" + id;
    if (states[id] === "closed") {
      setLaunches((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
    }
    setStates((current) => ({ ...current, [id]: "open" }));
    bringToFront(id);
  }

  function hideWindow(id: HRAppId, status: "minimized" | "closed") {
    if (status === "minimized") {
      pendingFocus.current = "hr-task-" + id;
    } else {
      pendingFocus.current = desktopFiles.some((file) => file.id === id) ? "hr-icon-" + id : "hr-start";
    }
    setStates((current) => ({ ...current, [id]: status }));
  }

  return (
    <div className="hr-desktop">
      <PortfolioHeader />
      <main id="main-content" className="hr-workspace" tabIndex={-1}>
        <p id="hr-move-help" className="visually-hidden">
          On a desktop, drag a title or use its arrow keys to move the window. Hold Shift for larger steps.
        </p>
        <nav className="hr-icons" aria-label="Desktop files">
          {desktopFiles.map((file) => (
            <button id={"hr-icon-" + file.id} key={file.id} type="button" className="hr-icon"
              aria-controls={"hr-window-" + file.id} aria-expanded={states[file.id] === "open"}
              data-selected={activeId === file.id} onClick={() => openWindow(file.id)}>
              <FileGlyph file={file} /><span className="hr-icon-label">{file.label}</span>
            </button>
          ))}
        </nav>
        <div className="hr-window-stack">
          {hrFiles.map((file, index) => (
            <PortfolioWindow key={file.id + "-" + (launches[file.id] ?? 0)} file={file}
              status={states[file.id]} active={activeId === file.id}
              layer={order.indexOf(file.id) + 2} offset={index * 14}
              onActivate={() => bringToFront(file.id)}
              onMinimize={() => hideWindow(file.id, "minimized")}
              onClose={() => hideWindow(file.id, "closed")}>
              {contents[file.id]}
            </PortfolioWindow>
          ))}
        </div>
        <aside className="hr-note" aria-label="Note to self">
          <p>note to self:</p>
          <blockquote>Keep the experiments.<br />They’re part of the work.</blockquote>
        </aside>
      </main>
      <Taskbar activeId={activeId} states={states} onOpen={openWindow}
        onToggle={(id) => { if (id === activeId) hideWindow(id, "minimized"); else openWindow(id); }} />
    </div>
  );
}
